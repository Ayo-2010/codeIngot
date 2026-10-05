<template>
  <div class="mx-auto max-w-5xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50 sm:text-4xl">Account</h1>
      <p class="mt-3 text-muted">
        Signing in is optional. This page exists so you can see what an account stores about you and
        which devices have used it.
      </p>
    </header>

    <!-- Signed out -->
    <section v-if="!isSignedIn" class="mt-8 rounded-2xl border border-ink-600 bg-ink-900 p-6">
      <h2 class="text-lg font-semibold text-mist-50">No account yet</h2>
      <p class="mt-2 text-sm text-muted">
        Everything you have done so far is stored in this browser only
        ({{ storageName }} storage). Create an account or sign in and it moves to your account, so it
        follows you to another device.
      </p>
      <div class="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
          @click="dialogOpen = true"
        >
          Sign in or create an account
        </button>
        <NuxtLink
          to="/"
          class="rounded-xl border border-ink-600 px-4 py-2.5 text-sm text-mist-50 transition hover:border-brand/40"
        >
          Keep learning without an account
        </NuxtLink>
      </div>
    </section>

    <!-- Signed in -->
    <template v-else>
      <section class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">Signed in as</p>
          <p class="mt-2 text-lg font-semibold text-mist-50">{{ accountName }}</p>
          <p class="mt-1 break-all font-mono text-xs text-dim">
            {{ user?.email ?? user?.phoneNumber ?? 'No address on file' }}
          </p>
          <p class="mt-3 font-mono text-[11px] text-brand">{{ providerLabel }} account</p>
        </div>

        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">Progress storage</p>
          <p class="mt-2 text-lg font-semibold text-mist-50">
            {{ syncLabel }}
          </p>
          <p class="mt-1 text-xs text-muted">
            {{ totals.lessons }} lessons · {{ totals.challenges }} challenges · {{ totals.xp }} XP
          </p>
          <div class="mt-4 flex gap-2">
            <button
              type="button"
              class="rounded-xl border border-ink-600 px-3 py-2 text-sm text-mist-50 transition hover:border-brand/40"
              @click="signOut"
            >
              Sign out
            </button>
          </div>
        </div>
      </section>

      <section class="mt-8">
        <div class="flex flex-wrap items-baseline justify-between gap-3">
          <h2 class="text-lg font-semibold tracking-tight text-mist-50">
            Devices signed in to this account
          </h2>
          <button
            type="button"
            class="rounded-lg border border-ink-600 px-3 py-1.5 text-xs text-muted transition hover:text-mist-50"
            @click="loadDevices"
          >
            Refresh
          </button>
        </div>
        <p class="mt-2 max-w-2xl text-sm text-muted">
One row per browser that has signed in. Each row is stored in Firestore under your account. Location
            and provider are worked out server-side when you sign in; your IP address is used for that
            lookup and then discarded, so it is never stored or shown.
        </p>

        <div v-if="loading" class="mt-5 rounded-2xl border border-ink-600 bg-ink-900 px-5 py-8 text-center text-sm text-dim">
          Loading devices…
        </div>

        <div
          v-else-if="devices.length === 0"
          class="mt-5 rounded-2xl border border-ink-600 bg-ink-900 px-5 py-8 text-center text-sm text-dim"
        >
          No device rows yet.
        </div>

        <div v-else class="mt-5 space-y-3">
          <article
            v-for="device in devices"
            :key="device.deviceId"
            class="rounded-2xl border bg-ink-900 p-4 transition sm:p-5"
            :class="device.currentSession ? 'border-brand/40' : 'border-ink-600'"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="flex flex-wrap items-center gap-2 text-base font-semibold text-mist-50">
                  {{ device.deviceName }}
                  <span
                    v-if="device.currentSession"
                    class="rounded-full bg-brand/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand"
                  >
                    This device
                  </span>
                </p>
                <p class="mt-1 font-mono text-[11px] uppercase tracking-wider text-dim">
                  {{ device.osName }} · {{ device.browserName }}<span v-if="device.screen"> · {{ device.screen }}</span>
                </p>
              </div>
              <p class="font-mono text-[11px] text-dim">
                {{ formatWhen(device.lastSeenAt) }}
              </p>
            </div>

            <dl class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt class="font-mono text-[10px] uppercase tracking-wider text-dim">Location</dt>
                <dd class="mt-0.5 text-mist-200">
                  <template v-if="placeFor(device)">
                    {{ placeFor(device) }}<span v-if="device.isp"> · {{ device.isp }}</span>
                  </template>
                  <span v-else class="text-dim">Unknown</span>
                </dd>
              </div>
              <div class="sm:col-span-2">
                <dt class="font-mono text-[10px] uppercase tracking-wider text-dim">User-Agent string</dt>
                <dd class="mt-0.5 break-all font-mono text-[11px] leading-relaxed text-muted">
                  {{ device.userAgent }}
                </dd>
              </div>
              <div v-if="device.firstSeenAt">
                <dt class="font-mono text-[10px] uppercase tracking-wider text-dim">First seen</dt>
                <dd class="mt-0.5 text-muted">{{ formatWhen(device.firstSeenAt) }}</dd>
              </div>
              <div v-if="device.timeZone || device.timezone">
                <dt class="font-mono text-[10px] uppercase tracking-wider text-dim">Time zone</dt>
                <dd class="mt-0.5 text-muted">{{ device.timezone ?? device.timeZone }}</dd>
              </div>
            </dl>
          </article>
        </div>
      </section>
    </template>

    <AuthDialog :open="dialogOpen" @close="dialogOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { listDeviceRecords, type DeviceRecord } from '~/utils/firebase-store'

useHead({ title: 'Account' })

const { user, isSignedIn, displayName: accountName, providerLabel, syncState, signOut } = useAuth()
const { storageName, totals } = useLearningProgress()

const dialogOpen = ref(false)
const devices = ref<DeviceRecord[]>([])
const loading = ref(false)

const syncLabel = computed(() => {
  if (!firebaseAvailable()) return 'This browser only'
  if (syncState.value === 'syncing') return 'Syncing…'
  if (syncState.value === 'error') return 'This browser, sync pending'
  return 'This browser and your account'
})

function placeFor(device: DeviceRecord): string | undefined {
  return [device.city, device.region, device.country].filter(Boolean).join(', ') || undefined
}

function formatWhen(iso: string | undefined) {
  if (!iso) return 'unknown'
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) return 'unknown'
  return parsed.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

async function loadDevices() {
  if (!isSignedIn.value) {
    devices.value = []
    return
  }
  loading.value = true
  try {
    devices.value = await listDeviceRecords(useFirebaseAccess())
  } finally {
    loading.value = false
  }
}

watch(isSignedIn, loadDevices, { immediate: true })
</script>