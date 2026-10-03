<template>
  <div class="flex h-screen overflow-hidden bg-ink-950">
    <aside class="hidden w-64 shrink-0 border-r border-ink-600 lg:block">
      <ReferenceCssSidebar v-if="isCss" :current-path="route.path" />
      <ReferenceSidebar v-else :current-path="route.path" />
    </aside>
    <div class="min-w-0 flex-1 overflow-y-auto">
      <main id="main">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// HTML and CSS are separate reference trees, so each has its own sidebar.
const isCss = computed(() => route.path === '/reference/css' || route.path.startsWith('/reference/css/'))
</script>
