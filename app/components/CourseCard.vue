<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 p-5 transition hover:border-brand/40"
  >
    <div class="flex items-start gap-3">
      <span
        class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-800 font-mono text-sm text-brand ring-1 ring-ink-600"
        aria-hidden="true"
      >
        {{ course.icon }}
      </span>
      <div class="min-w-0">
        <h3 class="text-[15px] font-semibold text-mist-50">
          <NuxtLink :to="`/courses/${course.slug}`" class="after:absolute after:inset-0">
            {{ course.title }}
          </NuxtLink>
        </h3>
        <p class="mt-0.5 line-clamp-2 text-sm leading-relaxed text-muted">{{ course.description }}</p>
      </div>
    </div>

    <div class="mt-4 flex flex-wrap gap-1.5">
      <TagPill :value="course.difficulty" tone="brand" />
      <TagPill v-for="badge in course.badges.slice(0, 2)" :key="badge" :value="badge" tone="muted" />
    </div>

    <dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11.5px] text-dim sm:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="flex gap-1.5">
        <dt class="sr-only">{{ stat.label }}</dt>
        <dd>{{ stat.value }} {{ stat.label }}</dd>
      </div>
    </dl>

    <div v-if="percent > 0" class="mt-4">
      <div class="mb-1.5 flex items-center justify-between text-[11px]">
        <span class="text-dim">{{ status === 'completed' ? 'Complete' : 'In progress' }}</span>
        <span class="font-mono text-muted">{{ percent }}%</span>
      </div>
      <ProgressBar :value="percent" :label="`${course.title} progress`" />
    </div>

    <div class="mt-auto flex items-center justify-between gap-3 pt-5">
      <span class="text-xs text-dim">{{ totalMinutes }} min total</span>
      <span class="flex items-center gap-1.5 text-sm font-medium text-brand">
        {{ cta }}
        <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { CourseMeta } from '~/types/content'

const props = defineProps<{ course: CourseMeta }>()

const { courseProgressPercent, courseStatus } = useLearningProgress()

const stats = computed(() => {
  const info = courseStats(props.course)
  return [
    { value: info.lessons, label: 'lessons' },
    { value: info.challenges, label: 'challenges' },
    { value: info.quizzes, label: 'quizzes' },
    { value: info.projects, label: 'projects' },
  ]
})

const totalMinutes = computed(() => {
  const minutes = courseStats(props.course).minutes
  if (minutes < 90) return `${minutes} min`
  return `${Math.round((minutes / 60) * 10) / 10} h`
})

const percent = computed(() => courseProgressPercent(props.course))
const status = computed(() => courseStatus(props.course.slug))
const cta = computed(() =>
  status.value === 'completed' ? 'Review' : percent.value > 0 ? 'Continue' : 'Start course',
)
</script>