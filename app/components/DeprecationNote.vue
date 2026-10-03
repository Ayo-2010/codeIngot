<template>
  <span class="mt-1 block text-xs text-warn">
    <span class="font-semibold uppercase tracking-wide">Deprecated</span> — {{ note }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ note: string }>()
</script>