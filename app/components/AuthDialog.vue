<template>
  <div
    v-if="open"
    class="fixed inset-0 z-[70] flex items-end justify-center overflow-y-auto bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
    role="dialog"
    aria-modal="true"
    aria-labelledby="auth-dialog-title"
    @click.self="emit('close')"
  >
    <div
      class="relative my-auto w-full max-w-md rounded-t-2xl border border-ink-600 bg-ink-900 shadow-2xl sm:rounded-2xl"
    >
      <div class="flex items-center justify-between gap-3 border-b border-ink-600 px-5 py-4">
        <div>
          <h2 id="auth-dialog-title" class="text-base font-semibold text-mist-50">
            {{ isSignedIn ? 'Your account' : 'Save your progress' }}
          </h2>
          <p class="mt-0.5 text-xs text-muted">
            {{
              isSignedIn
                ? 'Progress is backed up to your account.'
                : 'Learning works without an account. Sign in to keep your progress on every device.'
            }}
          </p>
        </div>
        <HamburgerButton
          :open="open"
          controls="auth-dialog"
          open-label="Close sign-in"
          close-label="Close sign-in"
          @toggle="emit('close')"
        />
      </div>

      <!-- Signed in -->
      <div v-if="isSignedIn" class="space-y-4 px-5 py-5">
        <div class="flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-950/60 p-3">
          <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/15 text-brand">
            {{ initials }}
          </span>
          <div class="min-w-0">
            <p class="truncate text-sm font-medium text-mist-50">{{ accountName }}</p>
            <p class="truncate font-mono text-[11px] text-dim">
              {{ user?.email ?? user?.phoneNumber ?? 'Signed in' }} · {{ providerLabel }}
            </p>
          </div>
        </div>

        <p class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider">
          <span
            class="h-1.5 w-1.5 rounded-full"
            :class="syncDot"
            aria-hidden="true"
          />
          <span :class="syncText">{{ syncText }}</span>
        </p>

        <div class="flex flex-col gap-2">
          <NuxtLink
            to="/account"
            class="rounded-xl border border-ink-600 px-4 py-2.5 text-center text-sm text-mist-50 transition hover:border-brand/40"
            @click="emit('close')"
          >
            Devices and account details
          </NuxtLink>
          <button
            type="button"
            class="rounded-xl border border-ink-600 px-4 py-2.5 text-sm text-muted transition hover:text-mist-50"
            @click="handleSignOut"
          >
            Sign out
          </button>
        </div>
      </div>

      <!-- Signed out -->
      <div v-else class="px-5 py-5">
        <button
          type="button"
          class="flex w-full items-center justify-center gap-3 rounded-xl border border-ink-600 bg-ink-950 px-4 py-2.5 text-sm font-medium text-mist-50 transition hover:border-brand/40 disabled:opacity-50"
          :disabled="busy"
          @click="handleGoogle"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" aria-hidden="true">
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.7v3h3.9c2.3-2.1 3.5-5.2 3.5-8.9z" />
            <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1A12 12 0 0 0 12 24z" />
            <path fill="#FBBC05" d="M5.4 14.4a7.2 7.2 0 0 1 0-4.6V6.7H1.4a12 12 0 0 0 0 10.8l4-3.1z" />
            <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.4 6.7l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
          </svg>
          Continue with Google
        </button>

        <div class="my-5 flex items-center gap-3">
          <span class="h-px flex-1 bg-ink-600" aria-hidden="true" />
          <span class="font-mono text-[10px] uppercase tracking-widest text-dim">or</span>
          <span class="h-px flex-1 bg-ink-600" aria-hidden="true" />
        </div>

        <div
          class="mb-4 flex gap-1 rounded-xl border border-ink-600 bg-ink-950/60 p-1"
          role="tablist"
          aria-label="Sign-in method"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            role="tab"
            class="flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition"
            :class="method === tab.id ? 'bg-ink-800 text-mist-50' : 'text-dim hover:text-mist-200'"
            :aria-selected="method === tab.id"
            @click="selectMethod(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>

        <p
          v-if="error"
          class="mb-4 rounded-xl border border-warn/30 bg-warn/5 px-3 py-2.5 text-sm text-warn"
          role="alert"
        >
          {{ error }}
        </p>

        <!-- Email -->
        <form v-if="method === 'email'" class="space-y-3" @submit.prevent="handleEmail">
          <label class="block">
            <span class="mb-1.5 block text-xs font-medium text-muted">Email</span>
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-mist-50 outline-none transition placeholder:text-dim focus:border-brand/50"
              placeholder="you@example.com"
            />
          </label>

          <label v-if="createAccount" class="block">
            <span class="mb-1.5 block text-xs font-medium text-muted">Name</span>
            <input
              v-model="nameInput"
              type="text"
              autocomplete="name"
              class="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-mist-50 outline-none transition placeholder:text-dim focus:border-brand/50"
              placeholder="How your name should appear"
            />
          </label>

          <label class="block">
            <span class="mb-1.5 block text-xs font-medium text-muted">Password</span>
            <input
              v-model="password"
              type="password"
              :autocomplete="createAccount ? 'new-password' : 'current-password'"
              required
              minlength="6"
              class="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-mist-50 outline-none transition placeholder:text-dim focus:border-brand/50"
              placeholder="At least six characters"
            />
          </label>

          <button
            type="submit"
            class="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft disabled:opacity-50"
            :disabled="busy"
          >
            {{ busy ? 'Working…' : createAccount ? 'Create account' : 'Sign in' }}
          </button>

          <button
            type="button"
            class="w-full text-center text-xs text-dim transition hover:text-mist-200"
            @click="createAccount = !createAccount"
          >
            {{
              createAccount
                ? 'Already have an account? Sign in'
                : 'Need an account? Create one'
            }}
          </button>
        </form>

        <!-- Phone -->
        <form v-else class="space-y-3" @submit.prevent="handlePhone">
          <template v-if="!phoneConfirmation">
            <label class="block">
              <span class="mb-1.5 block text-xs font-medium text-muted">Phone number</span>
              <input
                v-model="phone"
                type="tel"
                autocomplete="tel"
                required
                class="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 text-sm text-mist-50 outline-none transition placeholder:text-dim focus:border-brand/50"
                placeholder="+14155552671"
              />
            </label>
            <p class="text-xs text-dim">
              Include your country code. Firebase sends a one-time code by SMS.
            </p>
            <button
              type="submit"
              class="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft disabled:opacity-50"
              :disabled="busy"
            >
              {{ busy ? 'Sending…' : 'Send code' }}
            </button>
          </template>

          <template v-else>
            <label class="block">
              <span class="mb-1.5 block text-xs font-medium text-muted">
                Code sent to {{ phone }}
              </span>
              <input
                v-model="code"
                type="text"
                inputmode="numeric"
                autocomplete="one-time-code"
                required
                class="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2.5 font-mono text-sm tracking-widest text-mist-50 outline-none transition placeholder:text-dim focus:border-brand/50"
                placeholder="123456"
              />
            </label>
            <button
              type="submit"
              class="w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft disabled:opacity-50"
              :disabled="busy"
            >
              {{ busy ? 'Verifying…' : 'Verify and sign in' }}
            </button>
            <button
              type="button"
              class="w-full text-center text-xs text-dim transition hover:text-mist-200"
              @click="cancelPhoneCode"
            >
              Use a different number
            </button>
          </template>

          <!-- reCAPTCHA anchors the invisible challenge for phone sign-in. -->
          <div id="recaptcha-container" />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

type Method = 'email' | 'phone'

const tabs: { id: Method; label: string }[] = [
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
]

const { user, busy, error, syncState, isSignedIn, displayName: accountName, providerLabel, phoneConfirmation, signUpWithEmail, signInWithEmail, signInWithGoogle, sendPhoneCode, confirmPhoneCode, cancelPhoneCode, signOut, clearError } = useAuth()

const method = ref<Method>('email')
const createAccount = ref(false)
const email = ref('')
const password = ref('')
const nameInput = ref('')
const phone = ref('')
const code = ref('')

const initials = computed(() => {
  const source = user.value?.displayName ?? user.value?.email ?? 'L'
  return source.trim().charAt(0).toUpperCase() || 'L'
})

const syncText = computed(() => {
  if (syncState.value === 'syncing') return 'Syncing progress…'
  if (syncState.value === 'error') return 'Saved on this device, sync will retry'
  if (syncState.value === 'synced') return 'Progress saved to your account'
  return 'Ready'
})

const syncDot = computed(() => {
  if (syncState.value === 'error') return 'bg-warn'
  if (syncState.value === 'syncing') return 'bg-brand animate-pulse'
  return 'bg-ok'
})

function selectMethod(next: Method) {
  method.value = next
  clearError()
  if (next === 'phone') cancelPhoneCode()
}

// Switching between sign-in and sign-up clears the shared error, otherwise a
// message about a bad password stays on screen when the mode changes.
watch(createAccount, clearError)

function closed() {
  clearError()
  createAccount.value = false
  password.value = ''
  code.value = ''
  cancelPhoneCode()
}

watch(() => props.open, (isOpen) => {
  if (!isOpen) closed()
})

async function handleEmail() {
  const result = createAccount.value
    ? await signUpWithEmail(email.value, password.value, nameInput.value)
    : await signInWithEmail(email.value, password.value)
  if (result) emit('close')
}

async function handleGoogle() {
  const result = await signInWithGoogle()
  if (result) emit('close')
}

async function handlePhone() {
  const result = phoneConfirmation.value
    ? await confirmPhoneCode(code.value)
    : await sendPhoneCode(phone.value)
  if (result) emit('close')
}

async function handleSignOut() {
  await signOut()
  emit('close')
}
</script>