<template>
  <span class="flex items-center gap-1.5" :title="`${totals.xp} XP · Level ${level.level} ${level.title}`">
    <span class="text-brand" aria-hidden="true">
      <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
        <path d="M12 2.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 8.9l6-.8z" />
      </svg>
    </span>
    <span class="font-mono text-sm tabular-nums text-mist-50">{{ totals.xp.toLocaleString() }}</span>
    <span class="hidden text-xs text-dim sm:inline">Lv {{ level.level }}</span>
  </span>
</template>

<script setup lang="ts">
import { levelInfo } from '~/utils/achievements'

const { totals, progress } = useLearningProgress()
const level = computed(() => levelInfo(progress.value.xp))
</script>