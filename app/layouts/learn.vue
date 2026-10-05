<template>
  <div class="flex h-screen flex-col bg-ink-950 overflow-hidden">
    <AppHeader />
    <main id="main" class="flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  style: [
    {
      id: 'learn-layout-overflow',
      innerHTML: 'html,body{overflow:hidden;height:100%;margin:0}',
    },
  ],
})
</script>
