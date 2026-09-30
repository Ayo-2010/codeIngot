<template>
  <div class="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto rounded-xl border border-brand/30 bg-ink-900/95 px-4 py-3 shadow-xl shadow-black/50 backdrop-blur"
        role="status"
      >
        <p class="text-sm font-semibold text-mist-50">{{ toast.title }}</p>
        <p v-if="toast.body" class="mt-0.5 text-xs text-muted">{{ toast.body }}</p>
        <p v-if="toast.xp" class="mt-1 font-mono text-xs text-brand">+{{ toast.xp }} XP</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts } = useLearningProgress()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>