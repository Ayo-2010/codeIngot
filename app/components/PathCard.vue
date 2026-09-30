<template>
  <article
    class="relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 p-5 transition hover:border-brand/40"
  >
    <div class="flex items-center justify-between gap-3">
      <span class="text-[11px] font-semibold uppercase tracking-wider text-dim">Learning path</span>
      <TagPill :value="path.difficulty" tone="brand" />
    </div>
    <h3 class="mt-2 text-lg font-semibold text-mist-50">
      <NuxtLink :to="`/paths/${path.slug}`" class="after:absolute after:inset-0">{{ path.title }}</NuxtLink>
    </h3>
    <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ path.description }}</p>

    <ol class="mt-5 space-y-1.5">
      <li
        v-for="(step, index) in path.steps.slice(0, 4)"
        :key="step.id"
        class="flex items-center gap-2.5 text-sm"
      >
        <span class="font-mono text-[11px] text-dim">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="text-mist-200">{{ step.title }}</span>
      </li>
      <li v-if="path.steps.length > 4" class="flex items-center gap-2.5 text-xs text-dim">
        <span class="font-mono text-[11px]">+{{ path.steps.length - 4 }}</span>
        more stages
      </li>
    </ol>

    <div class="mt-auto pt-5">
      <div class="mb-1.5 flex items-center justify-between text-[11px]">
        <span class="text-dim">{{ completed }} / {{ path.steps.length }} courses</span>
        <span class="font-mono text-muted">{{ percent }}%</span>
      </div>
      <ProgressBar :value="percent" :label="`${path.title} progress`" />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { LearningPath } from '~/types/content'

const props = defineProps<{ path: LearningPath }>()

const { pathProgressPercent, pathCoursesCompleted } = useLearningProgress()

const percent = computed(() => pathProgressPercent(props.path))
const completed = computed(() => pathCoursesCompleted(props.path))
</script>