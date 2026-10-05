<template>
  <div class="flex h-screen flex-col overflow-hidden bg-ink-950">
    <AppHeader />
    <div class="flex min-h-0 flex-1 overflow-hidden">
      <aside class="hidden w-64 shrink-0 border-r border-ink-600 lg:block">
        <ReferenceCssSidebar v-if="isCss" :current-path="route.path" />
        <ReferenceJavascriptSidebar v-else-if="isJs" :current-path="route.path" />
        <ReferenceSidebar v-else :current-path="route.path" />
      </aside>

      <div class="flex min-w-0 flex-1 flex-col">
        <div
          class="relative z-[45] flex h-14 shrink-0 items-center gap-3 border-b border-ink-600 bg-ink-900 px-4"
        >
          <HamburgerButton
            :open="drawerOpen"
            controls="reference-drawer"
            open-label="Open reference navigation"
            close-label="Close reference navigation"
            class="lg:hidden"
            @toggle="drawerOpen = !drawerOpen"
          />
          <p class="truncate font-mono text-[11px] uppercase tracking-wider text-dim">
            {{ breadcrumb }}
          </p>
          <div class="ml-auto flex shrink-0 items-center gap-2">
            <NuxtLink
              v-if="previousItem"
              :to="previousItem.to"
              class="rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs text-muted transition hover:text-mist-50"
            >
              ← Previous
            </NuxtLink>
            <NuxtLink
              v-if="nextItem"
              :to="nextItem.to"
              class="rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs text-mist-50 transition hover:border-brand/40"
            >
              Next →
            </NuxtLink>
          </div>
        </div>

        <main id="main" class="min-w-0 flex-1 overflow-y-auto">
          <slot />
        </main>
      </div>

      <div
        v-if="drawerOpen"
        id="reference-drawer"
        class="fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden"
      >
        <div class="absolute inset-0 bg-ink-950/80" @click="drawerOpen = false" />
        <div
          class="absolute bottom-0 left-0 top-14 w-[86vw] max-w-sm overflow-hidden border-r border-ink-600 bg-ink-900"
        >
          <ReferenceCssSidebar v-if="isCss" :current-path="route.path" />
          <ReferenceJavascriptSidebar v-else-if="isJs" :current-path="route.path" />
          <ReferenceSidebar v-else :current-path="route.path" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cssNavItems, cssPropertyNavItems } from '~/content/reference/css-nav'
import { htmlNavItems, htmlTagNavItems } from '~/content/reference/html-nav'
import { javascriptIndexNavItems, javascriptNavItems } from '~/content/reference/javascript-nav'

const route = useRoute()

// Each language is its own tree with its own sidebar, so the layout picks one
// from the path rather than sharing a single list.
const isCss = computed(() => route.path === '/reference/css' || route.path.startsWith('/reference/css/'))
const isJs = computed(
  () => route.path === '/reference/javascript' || route.path.startsWith('/reference/javascript/'),
)

const drawerOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    drawerOpen.value = false
  },
)

/**
 * One flat list per language, in the order the sidebar draws them: the section
 * pages first, then the long tag/property/topic lists. Previous and Next walk
 * that list, so they move through the reference the way the sidebar reads.
 */
const flatNav = computed(() => {
  if (isCss.value) return [...cssNavItems, ...cssPropertyNavItems]
  if (isJs.value) {
    return [
      { label: 'JavaScript Reference', to: '/reference/javascript' },
      ...javascriptIndexNavItems,
      ...javascriptNavItems,
    ]
  }
  return [...htmlNavItems, ...htmlTagNavItems]
})

const languageLabel = computed(() => (isCss.value ? 'CSS' : isJs.value ? 'JavaScript' : 'HTML'))

const currentIndex = computed(() => flatNav.value.findIndex((item) => item.to === route.path))

const breadcrumb = computed(() => {
  const current = currentIndex.value >= 0 ? flatNav.value[currentIndex.value] : undefined
  return current ? `${languageLabel.value} · ${current.label}` : languageLabel.value
})

const previousItem = computed(() =>
  currentIndex.value > 0 ? flatNav.value[currentIndex.value - 1] : undefined,
)

const nextItem = computed(() => {
  const index = currentIndex.value
  return index >= 0 && index < flatNav.value.length - 1 ? flatNav.value[index + 1] : undefined
})
</script>