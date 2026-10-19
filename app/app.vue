<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="#29e2bd" :height="2" />
  <NuxtLayout>
    <NuxtPage :page-key="(route) => route.matched[0]?.path ?? route.path" />
  </NuxtLayout>
  <CommandPalette />
  <ToastStack />
</template>

<script setup lang="ts">
/**
 * The browser's own chrome follows the theme. A light page under a dark address
 * bar looks broken on mobile, and the mode can change at any moment, so the
 * colour is reactive rather than a fixed value in the head config. The server
 * renders the preference ('light' unless the visitor has switched), which is the
 * same answer the module gives the `<html>` class, so the two never disagree.
 */
const colorMode = useColorMode()

useHead({
  meta: [
    {
      name: 'theme-color',
      content: computed(() => (colorMode.value === 'dark' ? '#0b0d10' : '#f4f7fa')),
    },
  ],
})
</script>
