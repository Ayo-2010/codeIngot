import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from 'firebase/auth'
import type { ConfirmationResult, User } from 'firebase/auth'
import { readDeviceFingerprint } from '~/utils/device-fingerprint'
import { clearOtherDeviceSessions, writeDeviceRecord, writeUserProfile } from '~/utils/firebase-store'
import type { NetworkInfo } from '~~/server/api/device-info.get'

/**
 * One auth session shared by the whole app.
 *
 * Nothing here gates the site: an unauthenticated learner is a supported state
 * with a full working experience, and only the sync half of the app switches on
 * once Firebase reports a signed-in user.
 */
const user = ref<User | null>(null)
const ready = ref(false)
const busy = ref(false)
const errorMessage = ref<string | null>(null)
const phoneConfirmation = ref<ConfirmationResult | null>(null)
const syncState = ref<'idle' | 'syncing' | 'synced' | 'error'>('idle')

let bound = false
let unsubscribe: (() => void) | null = null
let verifier: RecaptchaVerifier | null = null

/** Firebase error codes are stable, so they are translated once, here. */
function explain(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : ''
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address does not look right.'
    case 'auth/missing-password':
      return 'Enter a password.'
    case 'auth/weak-password':
      return 'Choose a password with at least six characters.'
    case 'auth/email-already-in-use':
      return 'An account already exists for that email. Try signing in.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'That email and password do not match an account.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a moment and try again.'
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return 'The sign-in window closed before finishing.'
    case 'auth/popup-blocked':
      return 'Your browser blocked the sign-in window. Allow pop-ups for this site.'
    case 'auth/unauthorized-domain':
      return 'This site is not authorised for sign-in yet. Add its domain in Firebase console → Authentication → Settings.'
    case 'auth/invalid-phone-number':
      return 'That phone number is not valid. Include the country code, e.g. +14155552671.'
    case 'auth/billing-not-enabled':
      return 'Text-message sign-in is not available on this project yet. SMS sending needs the Blaze plan, which requires a billing account. Use email or Google for now.'
    case 'auth/quota-exceeded':
      return 'The daily SMS quota for this project is used up. Try again later, or use email or Google.'
    case 'auth/missing-phone-number':
      return 'Enter a phone number.'
    case 'auth/invalid-verification-code':
      return 'That code is not right. Check it and try again.'
    case 'auth/code-expired':
      return 'That code expired. Send a new one.'
    case 'auth/operation-not-allowed':
      return 'That sign-in method is not enabled for this project yet.'
    case 'auth/network-request-failed':
      return 'Network problem. Check your connection and try again.'
    default:
      return error instanceof Error && error.message ? error.message : 'Something went wrong. Try again.'
  }
}

async function recordThisDevice() {
  const { auth, db } = useFirebaseAccess()
  if (!auth || !db) return
  const device = readDeviceFingerprint()

  let network: NetworkInfo | null = null
  try {
    network = await $fetch<NetworkInfo>('/api/device-info')
  } catch {
    // The device row is still worth writing without the network half.
  }

  try {
    await writeDeviceRecord({ auth, db }, device, network)
    await clearOtherDeviceSessions({ auth, db }, device.deviceId)
  } catch {
    /* device history is supporting detail, never a reason to fail a sign-in */
  }
}

/** Called once per authenticated user, so a sign-in pulls the account's copy in. */
async function onSignedIn(next: User) {
  const { auth, db } = useFirebaseAccess()
  if (!auth || !db) return

  syncState.value = 'syncing'
  try {
    await writeUserProfile({ auth, db }, next)
    // Guest progress is merged into the account rather than replacing it.
    await useLearningProgress().refreshFromStorage()
    syncState.value = 'synced'
  } catch {
    syncState.value = 'error'
  }

  await recordThisDevice()
}

function bindListener() {
  if (bound) return
  const services = useFirebase()
  if (!services) {
    // No Firebase: the learner stays anonymous and the app stays local-only.
    ready.value = true
    bound = true
    return
  }
  bound = true
  unsubscribe = onAuthStateChanged(services.auth, async (next) => {
    const previousUid = user.value?.uid
    user.value = next
    if (next && next.uid !== previousUid) {
      await onSignedIn(next)
    }
    ready.value = true
  })
}

export function useAuth() {
  bindListener()

  const isSignedIn = computed(() => user.value !== null)
  const displayName = computed(
    () => user.value?.displayName?.trim() || user.value?.email?.split('@')[0] || 'Learner',
  )
  const providerLabel = computed(() => {
    const provider = user.value?.providerData?.[0]?.providerId
    if (provider === 'google.com') return 'Google'
    if (provider === 'phone') return 'Phone'
    if (provider === 'password') return 'Email'
    return 'Account'
  })

  async function run<T>(task: () => Promise<T>): Promise<T | undefined> {
    busy.value = true
    errorMessage.value = null
    try {
      return await task()
    } catch (error) {
      errorMessage.value = explain(error)
      return undefined
    } finally {
      busy.value = false
    }
  }

  function signUpWithEmail(email: string, password: string, display: string) {
    return run(async () => {
      const services = useFirebase()
      if (!services) throw new Error('Sign-in is unavailable on this build.')
      const credential = await createUserWithEmailAndPassword(services.auth, email, password)
      if (display.trim()) {
        await updateProfile(credential.user, { displayName: display.trim() })
      }
      return credential.user
    })
  }

  function signInWithEmail(email: string, password: string) {
    return run(async () => {
      const services = useFirebase()
      if (!services) throw new Error('Sign-in is unavailable on this build.')
      const credential = await signInWithEmailAndPassword(services.auth, email, password)
      return credential.user
    })
  }

  function signInWithGoogle() {
    return run(async () => {
      const services = useFirebase()
      if (!services) throw new Error('Sign-in is unavailable on this build.')
      const credential = await signInWithPopup(services.auth, new GoogleAuthProvider())
      return credential.user
    })
  }

  /**
   * Phone sign-in needs a reCAPTCHA anchor to exist before the SDK will render
   * it, so the container is given a tick to appear in the dialog first.
   */
  async function sendPhoneCode(phone: string) {
    return run(async () => {
      const services = useFirebase()
      if (!services) throw new Error('Sign-in is unavailable on this build.')
      await nextTick()
      if (!document.getElementById('recaptcha-container')) {
        throw new Error('The sign-in form is not ready yet. Try again.')
      }
      verifier = new RecaptchaVerifier(services.auth, 'recaptcha-container', {
        size: 'invisible',
      })
      phoneConfirmation.value = await signInWithPhoneNumber(
        services.auth,
        phone.trim(),
        verifier,
      )
      return true
    })
  }

  function confirmPhoneCode(code: string) {
    return run(async () => {
      if (!phoneConfirmation.value) throw new Error('Send a code first.')
      const credential = await phoneConfirmation.value.confirm(code.trim())
      phoneConfirmation.value = null
      return credential.user
    })
  }

  function cancelPhoneCode() {
    phoneConfirmation.value = null
    verifier = null
    errorMessage.value = null
  }

  async function signOut() {
    phoneConfirmation.value = null
    await firebaseSignOut(useFirebase()!.auth).catch(() => {
      /* already signed out */
    })
  }

  return {
    user,
    ready,
    busy,
    error: errorMessage,
    syncState,
    isSignedIn,
    displayName,
    providerLabel,
    phoneConfirmation,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    sendPhoneCode,
    confirmPhoneCode,
    cancelPhoneCode,
    signOut,
    clearError: () => {
      errorMessage.value = null
    },
  }
}