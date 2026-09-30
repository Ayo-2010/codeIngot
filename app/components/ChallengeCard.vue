<template>
  <article
    class="group relative flex h-full flex-col rounded-2xl border border-ink-600 bg-ink-900 p-5 transition hover:border-brand/40"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="font-mono text-[11px] uppercase tracking-wider text-brand">{{ technologyLabel }}</span>
      <TagPill :value="challenge.difficulty" :tone="challenge.difficulty === 'advanced' ? 'warn' : 'muted'" />
    </div>
    <h3 class="mt-2 text-base font-semibold text-mist-50">
      <NuxtLink :to="`/challenges/${challenge.slug}`" class="after:absolute after:inset-0">
        {{ challenge.title }}
      </NuxtLink>
    </h3>
    <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ challenge.summary }}</p>

    <p class="mt-4 text-[11px] uppercase tracking-wider text-dim">Practice</p>
    <div class="mt-1.5 flex flex-wrap gap-1.5">
      <TagPill v-for="practice in challenge.practices" :key="practice" :value="practice" tone="muted" />
    </div>

    <div class="mt-auto flex items-center justify-between gap-3 pt-5">
      <span class="font-mono text-[11px] text-dim">~{{ challenge.estimatedMinutes }} min · {{ challenge.xp }} XP</span>
      <span
        class="flex items-center gap-1.5 text-sm font-medium"
        :class="complete ? 'text-ok' : 'text-brand'"
      >
        <template v-if="complete">
          <span aria-hidden="true">✓</span> Passed
        </template>
        <template v-else>
          Start challenge
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </template>
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Challenge } from '~/types/content'

const props = defineProps<{ challenge: Challenge }>()

const { isChallengeComplete } = useLearningProgress()

const complete = computed(() => isChallengeComplete(props.challenge.id))

const technologyLabel = computed(() => {
  const labels: Record<string, string> = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
  }
  return labels[props.challenge.technology] ?? props.challenge.technology
})
</script>