<template>
  <div v-if="path">
    <header class="border-b border-ink-600/60 bg-ink-900/40">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <nav class="text-xs text-dim" aria-label="Breadcrumb">
          <NuxtLink to="/paths" class="hover:text-brand">Paths</NuxtLink>
          <span class="px-1.5">/</span>
          <span class="text-muted">{{ path.title }}</span>
        </nav>

        <div class="mt-4 flex flex-wrap items-start justify-between gap-8">
          <div class="max-w-2xl">
            <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ path.title }}</h1>
            <p class="mt-2 font-mono text-xs uppercase tracking-widest text-brand">{{ path.tagline }}</p>
            <p class="mt-4 text-muted">{{ path.description }}</p>
            <ul class="mt-5 grid gap-1.5 text-sm text-mist-200 sm:grid-cols-2">
              <li v-for="outcome in path.outcomes" :key="outcome" class="flex gap-2">
                <span class="text-brand" aria-hidden="true">▸</span>{{ outcome }}
              </li>
            </ul>
          </div>

          <div class="min-w-[240px] rounded-2xl border border-ink-600 bg-ink-900 p-5">
            <p class="font-mono text-[11px] uppercase tracking-wider text-dim">Path progress</p>
            <p class="mt-2 font-mono text-3xl text-mist-50">{{ completed }} / {{ path.steps.length }}</p>
            <p class="text-xs text-muted">courses completed</p>
            <ProgressBar class="mt-3" :value="percent" :label="`${path.title} progress`" />
            <p class="mt-2 font-mono text-xs text-brand">████████░░ {{ percent }}%</p>
            <NuxtLink
              v-if="continueStep"
              :to="continueHref"
              class="mt-4 block rounded-xl bg-brand px-4 py-2.5 text-center text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
            >
              Continue with {{ continueStep.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h2 class="text-lg font-semibold tracking-tight text-mist-50">The roadmap</h2>
      <ol class="mt-6 space-y-3">
        <li v-for="(step, index) in path.steps" :key="step.id" class="relative">
          <div
            v-if="index < path.steps.length - 1"
            class="absolute left-[27px] top-14 h-6 w-px bg-ink-600"
            aria-hidden="true"
          />
          <div
            class="relative flex gap-4 rounded-2xl border bg-ink-900 p-4 transition sm:p-5"
            :class="statusClass(step)"
          >
            <span
              class="grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-xs ring-1"
              :class="ringClass(step)"
              aria-hidden="true"
            >
              {{ statusGlyph(step) }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <p class="text-base font-semibold text-mist-50">{{ String(step.order).padStart(2, '0') }} · {{ step.title }}</p>
                <TagPill :value="statusLabel(step)" :tone="statusTone(step)" />
              </div>
              <p class="mt-1 text-sm text-muted">{{ step.summary }}</p>
              <div class="mt-3 flex flex-wrap items-center gap-3">
                <TagPill v-for="tech in step.technologies" :key="tech" :value="techLabel(tech)" tone="info" />
                <NuxtLink
                  v-if="getCourse(step.courseSlug)"
                  :to="`/courses/${step.courseSlug}`"
                  class="text-xs text-brand hover:text-brand-soft"
                >
                  {{ lessonCount(step.courseSlug) }} lessons →
                </NuxtLink>
                <span v-else class="text-xs text-dim">Not published yet</span>
              </div>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>

  <div v-else class="mx-auto max-w-3xl px-4 py-24 text-center">
    <h1 class="text-2xl font-semibold text-mist-50">Path not found</h1>
    <NuxtLink to="/paths" class="mt-4 inline-block text-sm text-brand">Back to paths</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { PathStep } from '~/types/content'

const route = useRoute()
const path = computed(() => getPath(String(route.params.slug)))
const { courseStatus, pathProgressPercent, pathCoursesCompleted } = useLearningProgress()

useHead({ title: computed(() => path.value?.title ?? 'Path not found') })

const percent = computed(() => (path.value ? pathProgressPercent(path.value) : 0))
const completed = computed(() => (path.value ? pathCoursesCompleted(path.value) : 0))

const continueStep = computed(() => {
  if (!path.value) return undefined
  const step =
    path.value.steps.find((item) => courseStatus(item.courseSlug) === 'in-progress') ??
    path.value.steps.find((item) => courseStatus(item.courseSlug) === 'available')
  return step
})

const continueHref = computed(() =>
  continueStep.value ? `/courses/${continueStep.value.courseSlug}` : '/courses',
)

function statusOf(step: PathStep) {
  return courseStatus(step.courseSlug)
}

function statusLabel(step: PathStep) {
  const status = statusOf(step)
  if (status === 'completed') return 'Completed'
  if (status === 'in-progress') return 'In progress'
  return getCourse(step.courseSlug) ? 'Available' : 'Planned'
}

function statusTone(step: PathStep) {
  const status = statusOf(step)
  if (status === 'completed') return 'ok' as const
  if (status === 'in-progress') return 'brand' as const
  return 'muted' as const
}

function statusGlyph(step: PathStep) {
  const status = statusOf(step)
  if (status === 'completed') return '✓'
  return String(step.order).padStart(2, '0')
}

function statusClass(step: PathStep) {
  return statusOf(step) === 'in-progress' ? 'border-brand/40' : 'border-ink-600'
}

function ringClass(step: PathStep) {
  const status = statusOf(step)
  if (status === 'completed') return 'bg-ok/10 text-ok ring-ok/30'
  if (status === 'in-progress') return 'bg-brand/10 text-brand ring-brand/30'
  return 'bg-ink-800 text-dim ring-ink-600'
}

function techLabel(tech: string) {
  const labels: Record<string, string> = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    api: 'APIs',
    git: 'Git',
  }
  return labels[tech] ?? tech
}

function lessonCount(slug: string) {
  const course = getCourse(slug)
  return course ? courseStats(course).lessons : 0
}
</script>