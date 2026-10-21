<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <h1 class="text-3xl font-semibold tracking-tight text-mist-50 sm:text-4xl">Admin</h1>
    <p class="mt-2 text-sm text-muted">Device registry and user totals across all accounts.</p>

    <section v-if="!isSignedIn" class="mt-8 rounded-2xl border border-ink-600 bg-ink-900 p-6">
      <h2 class="text-lg font-semibold text-mist-50">Sign in required</h2>
      <p class="mt-2 text-sm text-muted">You need to sign in to access the admin portal.</p>
      <button
        type="button"
        class="mt-4 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
        @click="dialogOpen = true"
      >
        Sign in
      </button>
      <AuthDialog :open="dialogOpen" @close="dialogOpen = false" />
    </section>

    <section v-else-if="!isAdmin" class="mt-8 rounded-2xl border border-ink-600 bg-ink-900 p-6">
      <h2 class="text-lg font-semibold text-mist-50">Access denied</h2>
      <p class="mt-2 text-sm text-muted">Your account does not have admin access.</p>
    </section>

    <template v-else>
      <div class="mt-8 grid gap-4 sm:grid-cols-3">
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">Total users</p>
          <p class="mt-2 font-mono text-3xl text-mist-50">{{ userCount }}</p>
        </div>
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">Total devices</p>
          <p class="mt-2 font-mono text-3xl text-mist-50">{{ devices.length }}</p>
        </div>
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">Current admin</p>
          <p class="mt-2 text-sm text-mist-50">{{ accountName }}</p>
          <p class="mt-1 font-mono text-[11px] text-dim">{{ user?.email }}</p>
        </div>
      </div>

      <section class="mt-8">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-lg font-semibold tracking-tight text-mist-50">All devices</h2>
          <button
            type="button"
            class="rounded-lg border border-ink-600 px-3 py-1.5 text-xs text-muted transition hover:text-mist-50"
            @click="loadDevices"
          >
            Refresh
          </button>
        </div>
        <p class="mt-2 text-sm text-muted">
          Every device row across every user account in Firestore.
        </p>

        <div v-if="loading" class="mt-5 rounded-2xl border border-ink-600 bg-ink-900 px-5 py-8 text-center text-sm text-dim">
          Loading devices…
        </div>

        <div v-else-if="devices.length === 0" class="mt-5 rounded-2xl border border-ink-600 bg-ink-900 px-5 py-8 text-center text-sm text-dim">
          No device rows found.
        </div>

        <div v-else class="mt-5 overflow-x-auto">
          <table class="min-w-full divide-y divide-ink-600 text-left text-sm">
            <thead>
              <tr class="text-[11px] uppercase tracking-wider text-dim">
                <th class="px-4 py-3">User</th>
                <th class="px-4 py-3">Device</th>
                <th class="px-4 py-3">OS / Browser</th>
                <th class="px-4 py-3">Location</th>
                <th class="px-4 py-3">Last seen</th>
                <th class="px-4 py-3">Session</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-ink-600">
              <tr v-for="device in devices" :key="device.deviceId" class="text-mist-200">
                <td class="px-4 py-3">
                  <p class="text-mist-50">{{ device.userName || 'Unknown' }}</p>
                  <p class="font-mono text-[11px] text-dim">{{ device.userEmail || device.userId }}</p>
                </td>
                <td class="px-4 py-3">
                  <p class="text-mist-50">{{ device.deviceName }}</p>
                  <p class="font-mono text-[11px] text-dim">{{ device.userAgent?.slice(0, 60) }}</p>
                </td>
                <td class="px-4 py-3">
                  {{ device.osName }} · {{ device.browserName }}
                </td>
                <td class="px-4 py-3">
                  <template v-if="placeFor(device)">
                    {{ placeFor(device) }}<span v-if="device.isp"> · {{ device.isp }}</span>
                  </template>
                  <span v-else class="text-dim">Unknown</span>
                </td>
                <td class="px-4 py-3 font-mono text-[11px] text-dim">
                  {{ formatWhen(device.lastSeenAt) }}
                </td>
                <td class="px-4 py-3">
                  <span
                    v-if="device.currentSession"
                    class="rounded-full bg-brand/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand"
                  >
                    Active
                  </span>
                  <span v-else class="text-dim">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useFirebaseAccess } from '~/composables/useFirebase'
import { firebaseAvailable } from '~/utils/firebase-services'
import { listAllDevices, getAllUserCount, type AdminDeviceRow } from '~/utils/firebase-store'
import { collection, query, where, getDocs } from 'firebase/firestore'

usePageSeo({
  title: 'Admin',
  description: 'Private device and account administration.',
  noindex: true,
})

const { user, isSignedIn } = useAuth()
const dialogOpen = ref(false)

const devices = ref<AdminDeviceRow[]>([])
const userCount = ref(0)
const loading = ref(false)

const accountName = computed(() => user.value?.displayName?.trim() || user.value?.email?.split('@')[0] || 'Admin')

const ADMIN_EMAILS = ['ayoabdullah13@gmail.com']

async function checkAdmin(): Promise<boolean> {
  const access = useFirebaseAccess()
  if (!access.db || !user.value?.uid) return false

  try {
    const adminDoc = await getDocs(query(collection(access.db, 'admins'), where('uid', '==', user.value.uid)))
    if (!adminDoc.empty) return true

    if (user.value.email && ADMIN_EMAILS.includes(user.value.email)) {
      return true
    }

    return false
  } catch {
    return false
  }
}

const isAdmin = ref(false)

async function loadDevices() {
  const access = useFirebaseAccess()
  if (!access.db) return

  loading.value = true
  try {
    devices.value = await listAllDevices(access.db)
    userCount.value = await getAllUserCount(access.db)
  } finally {
    loading.value = false
  }
}

function placeFor(device: AdminDeviceRow): string | undefined {
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

onMounted(async () => {
  isAdmin.value = await checkAdmin()
  if (isAdmin.value) {
    await loadDevices()
  }
})
</script>
