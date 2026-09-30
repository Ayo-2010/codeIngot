<template>
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div class="max-w-2xl">
        <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Your progress</h1>
        <p class="mt-3 text-muted">
          Everything here is derived from what you actually finished. Nothing is stored twice, so
          these numbers cannot drift out of sync with your work.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="rounded-lg border border-ink-600 px-3 py-2 text-sm text-muted transition hover:text-mist-50"
          @click="download"
        >
          Export progress
        </button>
        <button
          type="button"
          class="rounded-lg border border-bad/40 px-3 py-2 text-sm text-bad/90 transition hover:bg-bad/10"
          @click="confirmReset = true"
        >
          Reset
        </button>
      </div>
    </header>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in headline" :key="stat.label" class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
        <p class="text-xs uppercase tracking-wider text-dim">{{ stat.label }}</p>
        <p class="mt-2 font-mono text-3xl text-mist-50">{{ stat.value }}</p>
        <p v-if="stat.note" class="mt-1 text-xs text-dim">{{ stat.note }}</p>
      </div>
    </div>

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5 lg:col-span-2">
        <h2 class="text-base font-semibold text-mist-50">Course progress</h2>
        <ul class="mt-4 space-y-4">
          <li v-for="course in courses" :key="course.id">
            <div class="flex flex-wrap items-baseline justify-between gap-2">
              <NuxtLink :to="`/courses/${course.slug}`" class="text-sm text-mist-50 hover:text-brand">
                {{ course.title }}
              </NuxtLink>
              <span class="font-mono text-xs text-dim">{{ percentFor(course.slug) }}%</span>
            </div>
            <ProgressBar class="mt-2" :value="percentFor(course.slug)" :label="`${course.title} progress`" />
            <p class="mt-1.5 font-mono text-[11px] text-dim">
              {{ doneCount(course.slug) }} / {{ courseStats(course).lessons }} lessons ·
              {{ courseStats(course).quizzes }} quiz{{ courseStats(course).quizzes === 1 ? '' : 's' }}
            </p>
          </li>
        </ul>
      </section>

      <div class="space-y-6">
        <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <h2 class="text-base font-semibold text-mist-50">Streak</h2>
          <p class="mt-2 flex items-baseline gap-2">
            <span class="font-mono text-3xl text-mist-50">{{ streak.current }}</span>
            <span class="text-sm text-muted">day streak</span>
          </p>
          <p class="mt-1 font-mono text-xs text-dim">Longest: {{ streak.longest }} days</p>
          <ol class="mt-4 grid grid-cols-7 gap-1 text-center">
            <li v-for="day in streakWeek" :key="day.date">
              <span
                class="grid h-7 w-full place-items-center rounded-md text-[11px]"
                :class="day.active ? 'bg-brand/20 text-brand' : 'bg-ink-800 text-dim'"
              >
                {{ day.label }}
              </span>
            </li>
          </ol>
          <p class="mt-3 text-xs leading-relaxed text-dim">
            A missed day only resets the streak counter. Nothing you completed is ever taken away.
          </p>
        </section>

        <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <h2 class="text-base font-semibold text-mist-50">XP by source</h2>
          <ul class="mt-3 space-y-2 text-sm">
            <li v-for="row in xpRows" :key="row.label" class="flex items-center justify-between gap-3">
              <span class="text-muted">{{ row.label }}</span>
              <span class="font-mono text-mist-50">{{ row.value }} XP</span>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <section class="mt-6 rounded-2xl border border-ink-600 bg-ink-900 p-5">
      <h2 class="text-base font-semibold text-mist-50">Quiz scores</h2>
      <p v-if="quizRows.length === 0" class="mt-3 text-sm text-muted">
        No quizzes taken yet. Every section ends with one.
      </p>
      <ul v-else class="mt-3 space-y-2">
        <li v-for="row in quizRows" :key="row.id" class="flex items-center gap-3">
          <span class="w-40 shrink-0 truncate text-sm text-mist-200">{{ row.title }}</span>
          <ProgressBar class="flex-1" :value="row.score" :label="`${row.title} score`" />
          <span class="w-12 text-right font-mono text-xs" :class="row.score >= 70 ? 'text-ok' : 'text-warn'">
            {{ row.score }}%
          </span>
        </li>
      </ul>
    </section>

    <Teleport to="body">
      <div
        v-if="confirmReset"
        class="fixed inset-0 z-[75] grid place-items-center bg-ink-950/80 px-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="w-full max-w-md rounded-2xl border border-ink-600 bg-ink-900 p-6">
          <h2 class="text-lg font-semibold text-mist-50">Reset all progress?</h2>
          <p class="mt-2 text-sm text-muted">
            This clears lessons, challenges, projects, XP, streak and achievements from this browser.
            It cannot be undone.
          </p>
          <div class="mt-5 flex justify-end gap-2">
            <button
              type="button"
              class="rounded-lg border border-ink-600 px-3 py-2 text-sm text-mist-50"
              @click="confirmReset = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded-lg bg-bad px-3 py-2 text-sm font-semibold text-ink-950"
              @click="doReset"
            >
              Reset everything
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '~/types/content'

useHead({ title: 'Progress' })

const { courses } = useCourses()
const { progress, totals, streak, streakWeek, courseProgressPercent, resetProgress, exportProgress } =
  useLearningProgress()

const confirmReset = ref(false)

const headline = computed(() => [
  { label: 'Total XP', value: totals.value.xp.toLocaleString(), note: `Level ${1 + Math.floor(totals.value.xp / 700)}` },
  { label: 'Lessons', value: totals.value.lessons, note: `${allLessonFlat().length} available` },
  { label: 'Challenges', value: totals.value.challenges, note: `${allChallenges().length} available` },
  { label: 'Projects', value: totals.value.projects, note: `${allProjectsList().length} available` },
])

function percentFor(slug: string) {
  const course = getCourse(slug)
  return course ? courseProgressPercent(course) : 0
}

function doneCount(slug: string) {
  const course = getCourse(slug)
  if (!course) return 0
  const ids = new Set(course.sections.flatMap((section) => section.lessons.map((lesson) => lesson.id)))
  return progress.value.completedLessons.filter((id) => ids.has(id)).length
}

const xpLabels: Record<string, string> = {
  lesson: 'Lessons',
  challenge: 'Challenges',
  quiz: 'Quizzes',
  project: 'Projects',
  achievement: 'Achievements',
  streak: 'Streaks',
}

const xpRows = computed(() =>
  Object.entries(progress.value.xpBySource)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([key, value]) => ({ label: xpLabels[key] ?? key, value })),
)

const quizRows = computed(() => {
  const rows: { id: string; title: string; score: number }[] = []
  for (const course of courses as Course[]) {
    for (const section of course.sections) {
      if (!section.quiz) continue
      const score = progress.value.quizScores[section.quiz.id]
      if (score === undefined) continue
      rows.push({ id: section.quiz.id, title: `${course.shortTitle} · ${section.quiz.title}`, score })
    }
  }
  return rows
})

async function download() {
  if (!import.meta.client) return
  const blob = new Blob([exportProgress()], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'codeingot-progress.json'
  anchor.click()
  URL.revokeObjectURL(url)
}

async function doReset() {
  await resetProgress()
  confirmReset.value = false
}
</script>