<template>
  <header
    class="sticky top-0 z-50 h-16 border-b border-ink-600/70 bg-ink-950/85 backdrop-blur-md"
  >
    <div class="mx-auto flex h-full max-w-[1600px] items-center gap-4 px-4 sm:px-6 min-w-0">
      <!--
        The app mark: the chevrons below are mirrored in public/favicon.svg,
        which draws the same badge for the browser tab. Change both together.
      -->
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
        <span class="text-[15px] font-semibold tracking-tight text-mist-50 truncate">
          code<span class="text-brand">Ingot</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex lg:gap-2 min-w-0 flex-1" aria-label="Main">
        <template v-for="item in primaryNav" :key="item.to || item.label">
          <NuxtLink
            v-if="!item.children"
            :to="item.to"
            class="nav-link whitespace-nowrap"
          >
            {{ item.label }}
          </NuxtLink>
          <div
            v-else
            class="relative"
            @mouseenter="openMenu = item.label"
            @mouseleave="openMenu = null"
            @focusout="onMenuFocusOut($event, item.label)"
          >
            <button
              type="button"
              class="nav-link flex items-center gap-1.5 whitespace-nowrap"
              :aria-expanded="openMenu === item.label"
              :aria-controls="menuId(item.label)"
              @click="toggleMenu(item.label)"
              @keydown.escape.prevent="escapeMenus()"
            >
              {{ item.label }}
              <svg
                viewBox="0 0 24 24"
                class="h-3.5 w-3.5 shrink-0 transition-transform"
                :class="openMenu === item.label ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div
              :id="menuId(item.label)"
              data-header-menu
              class="absolute top-full left-0 z-50 mt-2 max-h-[70vh] min-w-[200px] overflow-y-auto rounded-xl border border-ink-600 bg-ink-900 py-1.5 shadow-xl transition-all duration-150"
              :class="
                openMenu === item.label
                  ? 'visible translate-y-0 opacity-100'
                  : 'invisible translate-y-1 opacity-0'
              "
              @keydown.escape.prevent="escapeMenus()"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                class="block px-3 py-2 text-sm text-muted transition-colors hover:bg-ink-800 hover:text-mist-50"
                @click="closeMenus()"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
        </template>
      </nav>

      <div class="ml-auto flex items-center gap-2 shrink-0" aria-label="Account actions">
        <ThemeToggle />
        <button
          type="button"
          class="hidden items-center gap-2 rounded-lg border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm text-muted transition hover:border-ink-500 hover:text-mist-50 sm:flex"
          @click="openPalette()"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" stroke-linecap="round" />
          </svg>
          <span class="hidden sm:inline">Search</span>
          <kbd class="rounded border border-ink-600 bg-ink-800 px-1.5 py-0.5 font-mono text-[11px] text-dim shrink-0">
            Ctrl K
          </kbd>
        </button>

        <NuxtLink
          to="/dashboard"
          class="flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm font-medium text-mist-50 transition hover:border-brand/40 hover:bg-ink-800 shrink-0"
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
          class="flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-900 px-3 py-1.5 text-sm font-medium text-mist-50 transition hover:border-brand/40 hover:bg-ink-800 shrink-0"
          :aria-expanded="accountOpen"
          :aria-label="isSignedIn ? 'Account menu' : 'Sign in'"
          aria-controls="account-dialog"
          @click="accountOpen = true"
        >
          <ClientOnly>
            <span v-if="isSignedIn" class="flex items-center gap-2">
              <span
                class="grid h-5 w-5 place-items-center rounded-full bg-brand/15 font-mono text-[10px] text-brand shrink-0"
                aria-hidden="true"
              >
                {{ initials }}
              </span>
              <span class="hidden xl:inline truncate">{{ accountName }}</span>
            </span>
            <span v-else class="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
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
          class="lg:hidden shrink-0"
          @toggle="mobileOpen = !mobileOpen"
        />
      </div>
    </div>

<div
  v-if="mobileOpen"
  id="mobile-nav"
  class="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-ink-600 bg-ink-950 px-4 py-3 lg:hidden"
>
  <nav class="flex flex-col gap-1" aria-label="Mobile">
    <template v-for="item in primaryNav" :key="item.to || item.label">
      <NuxtLink
        v-if="!item.children"
        :to="item.to"
        class="rounded-lg px-3 py-2.5 text-sm text-mist-200 hover:bg-ink-800"
        @click="mobileOpen = false"
      >
        {{ item.label }}
      </NuxtLink>
      <div v-else class="space-y-1 border-l border-ink-600/50 pl-2">
        <p class="px-3 pt-1 font-mono text-[11px] uppercase tracking-wider text-dim">
          {{ item.label }}
        </p>
        <NuxtLink
          v-for="child in item.children"
          :key="child.to"
          :to="child.to"
          class="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-ink-800 hover:text-mist-50"
          @click="mobileOpen = false"
        >
          {{ child.label }}
        </NuxtLink>
      </div>
    </template>
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
import ThemeToggle from './ThemeToggle.vue'

const accountOpen = ref(false)
const mobileOpen = ref(false)
const { openPalette } = useCommandPalette()

/**
 * The header lives inside the layout's suspense boundary, so it hydrates after
 * `app:mounted`. Browser tests wait for this marker before clicking: a control
 * that looks interactive but has no listener simply swallows the click.
 */
onMounted(() => {
  document.documentElement.dataset.headerReady = 'true'
})

/**
 * The header's disclosure menus. Hover opens them for pointer users; click and
 * focus open them for keyboard users, and `aria-expanded` always reports what is
 * actually visible. The previous version was hover-only, so the links could not
 * be reached by keyboard and the attribute was permanently false.
 */
const openMenu = ref<string | null>(null)

function menuId(label: string) {
  return `header-menu-${label.toLowerCase()}`
}

function toggleMenu(label: string) {
  openMenu.value = openMenu.value === label ? null : label
}

function closeMenus() {
  openMenu.value = null
}

/** Escape closes the menu and returns focus to the button that opened it. */
function escapeMenus() {
  const active = document.activeElement as HTMLElement | null
  const panel = active?.closest<HTMLElement>('[data-header-menu]')
  const button = panel?.previousElementSibling as HTMLElement | null
  // Focus the trigger before hiding the panel, so focus is never left on a
  // hidden element.
  button?.focus()
  closeMenus()
}

/** Keep a menu open while focus stays inside it, close it when focus leaves. */
function onMenuFocusOut(event: FocusEvent, label: string) {
  const next = event.relatedTarget as Node | null
  const current = event.currentTarget as HTMLElement | null
  if (next && current?.contains(next)) return
  if (openMenu.value === label) openMenu.value = null
}

const initials = computed(() => {
  const source = accountName.value.trim()
  return source.charAt(0).toUpperCase() || 'L'
})

/**
 * The catalogue for the header's Courses menu. Course metadata is bundled
 * eagerly, so the full list is available on the server with no fetch.
 */
const courseNav = [
  { to: '/courses', label: 'All courses' },
  ...allCoursesList().map((course) => ({
    to: `/courses/${course.slug}`,
    label: course.title,
  })),
]

const primaryNav = computed(() => [
  { to: '/paths', label: 'Learn' },
  { label: 'Courses', children: courseNav },
  {
    label: 'Practice',
    children: [
      { to: '/challenges', label: 'Challenges' },
      { to: '/projects', label: 'Projects' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { to: '/reference', label: 'Reference' },
      { to: '/playground', label: 'Playground' },
    ],
  },
])

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