<template>
  <div class="flex h-screen flex-col bg-ink-950 overflow-hidden">
    <AppHeader compact />
    <main id="main" class="flex-1 overflow-hidden">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  style: [
    {
      hid: 'learn-layout-overflow',
      tag: 'style',
      attrs: { 'data-learn-layout': '' },
      children: 'html,body{overflow:hidden;height:100%;margin:0}',
    },
  ],
})
</script>
