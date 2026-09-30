<template>
  <div
    class="h-1.5 w-full overflow-hidden rounded-full bg-ink-700"
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="label"
  >
    <div
      class="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
      :style="{ width: `${Math.max(0, Math.min(100, value))}%` }"
    />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ value: number; label?: string }>(), { label: 'Progress' })
</script>