<template>
  <header
    class="sticky top-0 z-40 border-b border-ink-600/70 bg-ink-950/85 backdrop-blur-md"
    :class="compact ? 'h-14' : 'h-16'"
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

      <nav v-if="!compact" class="hidden items-center gap-1 lg:flex" aria-label="Main">
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
          v-if="!compact"
          type="button"
          class="grid h-9 w-9 place-items-center rounded-lg border border-ink-600 text-muted lg:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          aria-label="Open navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="mobileOpen && !compact"
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
</template>

<script setup lang="ts">
defineProps<{ compact?: boolean }>()

const mobileOpen = ref(false)
const { openPalette } = useCommandPalette()

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