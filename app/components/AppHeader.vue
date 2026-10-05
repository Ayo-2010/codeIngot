<template>
  <header
    class="sticky top-0 z-50 h-16 border-b border-ink-600/70 bg-ink-950/85 backdrop-blur-md"
  >
    <div class="mx-auto flex h-full max-w-[1600px] items-center gap-4 px-4 sm:px-6">
      <NuxtLink
        to="/"
        class="group flex shrink-0 items-center gap-2.5 rounded-lg px-1 py-1"
        aria-label="codeIngot home"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-lg bg-brand/15 text-brand ring-1 ring-brand/30 transition group-hover:bg-brand/25"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" class="h-4.5 w-4.5" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 8l-5 4 5 4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 8l5 4-5 4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="text-[15px] font-semibold tracking-tight text-mist-50">
          code<span class="text-brand">Ingot</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Main">
        <NuxtLink
          v-for="item in primaryNav"
          :key="item.to"
          :to="item.to"
          class="nav-link"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <button
          type="button"
          class="hidden items-center gap-2 rounded-lg border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm text-muted transition hover:border-ink-500 hover:text-mist-50 sm:flex"
          @click="openPalette()"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" stroke-linecap="round" />
          </svg>
          <span>Search</span>
          <kbd class="rounded border border-ink-600 bg-ink-800 px-1.5 py-0.5 font-mono text-[11px] text-dim">
            Ctrl K
          </kbd>
        </button>

        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm font-medium text-mist-50 transition hover:border-brand/40 hover:bg-ink-800"
        >
          <ClientOnly>
            <XpChip />
            <template #fallback>
              <span class="flex items-center gap-1.5 text-sm text-dim">
                <span class="text-brand">
                  <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                    <path d="M12 2.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 8.9l6-.8z" />
                  </svg>
                </span>
                <span class="font-mono tabular-nums">0 XP</span>
                <span class="hidden text-xs sm:inline">Lv 1</span>
              </span>
            </template>
          </ClientOnly>
        </NuxtLink>

        <NuxtLink
          to="/progress"
          class="hidden items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-muted transition hover:text-mist-50 sm:flex"
        >
          Progress
        </NuxtLink>

        <button
          type="button"
          class="flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm font-medium text-mist-50 transition hover:border-brand/40 hover:bg-ink-800"
          :aria-expanded="accountOpen"
          aria-controls="account-dialog"
          @click="accountOpen = true"
        >
          <ClientOnly>
            <span v-if="isSignedIn" class="flex items-center gap-2">
              <span
                class="grid h-5 w-5 place-items-center rounded-full bg-brand/15 font-mono text-[10px] text-brand"
                aria-hidden="true"
              >
                {{ initials }}
              </span>
              <span class="hidden sm:inline">{{ accountName }}</span>
            </span>
            <span v-else class="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 20a7 7 0 0 1 14 0" stroke-linecap="round" />
              </svg>
              <span class="hidden sm:inline">Sign in</span>
            </span>
            <template #fallback>
              <span class="text-sm text-mist-50">Sign in</span>
            </template>
          </ClientOnly>
        </button>

        <HamburgerButton
          :open="mobileOpen"
          controls="mobile-nav"
          open-label="Open navigation"
          close-label="Close navigation"
          class="lg:hidden"
          @toggle="mobileOpen = !mobileOpen"
        />
      </div>
    </div>

    <div
      v-if="mobileOpen"
      id="mobile-nav"
      class="border-t border-ink-600 bg-ink-950 px-4 py-3 lg:hidden"
    >
      <nav class="flex flex-col gap-1" aria-label="Mobile">
        <NuxtLink
          v-for="item in primaryNav"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2.5 text-sm text-mist-200 hover:bg-ink-800"
          @click="mobileOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          to="/dashboard"
          class="rounded-lg px-3 py-2.5 text-sm text-mist-200 hover:bg-ink-800"
          @click="mobileOpen = false"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink
          to="/progress"
          class="rounded-lg px-3 py-2.5 text-sm text-mist-200 hover:bg-ink-800"
          @click="mobileOpen = false"
        >
          Progress
        </NuxtLink>
        <NuxtLink
          to="/account"
          class="rounded-lg px-3 py-2.5 text-sm text-mist-200 hover:bg-ink-800"
          @click="mobileOpen = false"
        >
          Account
        </NuxtLink>
        <button
          type="button"
          class="mt-2 rounded-lg border border-ink-600 px-3 py-2.5 text-left text-sm text-muted"
          @click="((mobileOpen = false), openPalette())"
        >
          Search everything (Ctrl K)
        </button>
      </nav>
    </div>
  </header>

  <AuthDialog :open="accountOpen" @close="accountOpen = false" />
</template>

<script setup lang="ts">
const { isSignedIn, displayName: accountName } = useAuth()

const accountOpen = ref(false)
const mobileOpen = ref(false)
const { openPalette } = useCommandPalette()

const initials = computed(() => {
  const source = accountName.value.trim()
  return source.charAt(0).toUpperCase() || 'L'
})

const primaryNav = [
  { to: '/paths', label: 'Learn' },
  { to: '/courses', label: 'Courses' },
  { to: '/challenges', label: 'Challenges' },
  { to: '/projects', label: 'Projects' },
  { to: '/playground', label: 'Playground' },
  { to: '/reference', label: 'Reference' },
]

watch(() => useRoute().fullPath, () => {
  mobileOpen.value = false
  accountOpen.value = false
})
</script>

<style scoped>
.nav-link {
  border-radius: 0.5rem;
  padding: 0.4rem 0.7rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  transition:
    color 120ms ease,
    background-color 120ms ease;
}

.nav-link:hover {
  color: var(--color-mist-50);
  background: var(--color-ink-800);
}

.nav-link.router-link-active {
  color: var(--color-brand);
}
</style>