import { collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore'
import type { Firestore } from 'firebase/firestore'
import type { Auth, User } from 'firebase/auth'
import type { DeviceFingerprint } from '~/utils/device-fingerprint'
import type { NetworkInfo } from '~~/server/api/device-info.get'
import {
  type ProgressStorage,
  type UserProgress,
  coerceProgress,
} from '~/utils/progress-storage'

/**
 * Document layout, all of it private to the account that owns it:
 *
 *   users/{uid}                     profile: email, name, photo, providers
 *   users/{uid}/progress/learner     the single learner progress record
 *   users/{uid}/devices/{deviceId}   one row per browser the account is used from
 *
 * Course and reference content is not here. Lessons ship in the bundle and are
 * never written to the database; only the learner's own results are.
 */

export const PROFILE_DOC = 'profile'

export interface DeviceRecord {
  deviceId: string
  deviceName: string
  osName: string
  browserName: string
  userAgent: string
  language: string
  timeZone: string
  screen: string
  touch: boolean
  city?: string
  region?: string
  country?: string
  countryCode?: string
  timezone?: string
  isp?: string
  organisation?: string
  firstSeenAt?: string
  lastSeenAt?: string
  currentSession?: boolean
}

function services(access: { auth: Auth | null; db: Firestore | null }) {
  const uid = access.auth?.currentUser?.uid ?? null
  if (!uid || !access.db) return null
  return { uid, db: access.db }
}

/**
 * Firestore is the account's copy of the learner's progress. It does nothing at
 * all while signed out, which is what makes the app work with no account: the
 * local provider is then the only one in play.
 */
export class FirestoreProgressStorage implements ProgressStorage {
  readonly name = 'firestore'

  constructor(private readonly access: () => { auth: Auth | null; db: Firestore | null }) {}

  async load(): Promise<UserProgress | null> {
    const ctx = services(this.access())
    if (!ctx) return null
    try {
      const snapshot = await getDoc(doc(ctx.db, 'users', ctx.uid, 'progress', 'learner'))
      if (!snapshot.exists()) return null
      return coerceProgress(snapshot.data().progress)
    } catch {
      return null
    }
  }

  async save(progress: UserProgress): Promise<void> {
    const ctx = services(this.access())
    if (!ctx) return
    await setDoc(
      doc(ctx.db, 'users', ctx.uid, 'progress', 'learner'),
      { progress, updatedAt: serverTimestamp() },
      { merge: true },
    )
  }

  async clear(): Promise<void> {
    const ctx = services(this.access())
    if (!ctx) return
    await setDoc(doc(ctx.db, 'users', ctx.uid, 'progress', 'learner'), { progress: null })
  }
}

/** Create or refresh the profile row for a signed-in user. */
export async function writeUserProfile(
  access: { auth: Auth | null; db: Firestore | null },
  user: User,
): Promise<void> {
  const ctx = services(access)
  if (!ctx) return
  const providers = new Set<string>()
  if (user.providerData.length === 0) providers.add('password')
  for (const entry of user.providerData) providers.add(entry.providerId)

  await setDoc(
    doc(ctx.db, 'users', ctx.uid),
    {
      uid: ctx.uid,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      emailVerified: user.emailVerified,
      providers: [...providers],
      lastSignInAt: serverTimestamp(),
    },
    { merge: true },
  )
}

/**
 * One row per browser, keyed by a locally stored id, so returning to the same
 * laptop updates its row instead of adding another one.
 */
export async function writeDeviceRecord(
  access: { auth: Auth | null; db: Firestore | null },
  device: DeviceFingerprint,
  network: NetworkInfo | null,
): Promise<void> {
  const ctx = services(access)
  if (!ctx) return

  const reference = doc(ctx.db, 'users', ctx.uid, 'devices', device.deviceId)
  const existing = await getDoc(reference)

  const now = new Date().toISOString()
  const firstSeen = existing.exists() ? existing.data().firstSeenAt : undefined

  const row: DeviceRecord = {
    deviceId: device.deviceId,
    deviceName: device.deviceName,
    osName: device.osName,
    browserName: device.browserName,
    userAgent: device.userAgent,
    language: device.language,
    timeZone: device.timeZone,
    screen: device.screen,
    touch: device.touch,
    city: network?.city,
    region: network?.region,
    country: network?.country,
    countryCode: network?.countryCode,
    timezone: network?.timezone,
    isp: network?.isp,
    organisation: network?.organisation,
    // ISO strings rather than serverTimestamp, so a stored row reads back with
    // the same type it was written with and can be sorted in the client.
    firstSeenAt: typeof firstSeen === 'string' ? firstSeen : now,
    lastSeenAt: now,
    currentSession: true,
  }

  await setDoc(reference, row, { merge: true })
}

/** Mark every other device of this account as no longer the active session. */
export async function clearOtherDeviceSessions(
  access: { auth: Auth | null; db: Firestore | null },
  keepDeviceId: string,
): Promise<void> {
  const ctx = services(access)
  if (!ctx) return
  try {
    const snapshot = await getDocs(collection(ctx.db, 'users', ctx.uid, 'devices'))
    await Promise.all(
      snapshot.docs
        .filter((entry) => entry.id !== keepDeviceId && entry.data().currentSession === true)
        .map((entry) =>
          setDoc(entry.ref, { currentSession: false }, { merge: true }),
        ),
    )
  } catch {
    /* the sign-in itself already succeeded; a stale flag is not worth surfacing */
  }
}

export async function listDeviceRecords(
  access: { auth: Auth | null; db: Firestore | null },
): Promise<DeviceRecord[]> {
  const ctx = services(access)
  if (!ctx) return []
  try {
    const snapshot = await getDocs(collection(ctx.db, 'users', ctx.uid, 'devices'))
    return snapshot.docs.map((entry) => entry.data() as DeviceRecord)
  } catch {
    return []
  }
}

export interface AdminDeviceRow extends DeviceRecord {
  userId: string
  userEmail: string | null
  userName: string | null
}

export async function listAllDevices(db: Firestore): Promise<AdminDeviceRow[]> {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'))
    const rows: AdminDeviceRow[] = []
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data() as { email?: string | null; displayName?: string | null }
      const devicesSnapshot = await getDocs(collection(db, 'users', userDoc.id, 'devices'))
      for (const deviceDoc of devicesSnapshot.docs) {
        const data = deviceDoc.data() as DeviceRecord
        rows.push({
          ...data,
          userId: userDoc.id,
          userEmail: userData.email ?? null,
          userName: userData.displayName ?? null,
        })
      }
    }
    return rows
  } catch {
    return []
  }
}

export async function getAllUserCount(db: Firestore): Promise<number> {
  try {
    const snapshot = await getDocs(collection(db, 'users'))
    return snapshot.size
  } catch {
    return 0
  }
}