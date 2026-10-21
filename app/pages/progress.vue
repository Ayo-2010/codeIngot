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
          <p class="mt-1 font-mono text-xs text-dim">Total active days: {{ progress.streak.days.length }}</p>

          <div class="mt-4 space-y-3">
            <h3 class="text-xs uppercase tracking-wider text-dim">This week</h3>
            <ol class="grid grid-cols-7 gap-1 text-center">
              <li v-for="day in streakWeek" :key="day.date">
                <span
                  class="grid h-7 w-full place-items-center rounded-md text-[11px]"
                  :class="day.active ? 'bg-brand/20 text-brand' : 'bg-ink-800 text-dim'"
                >
                  {{ day.label }}
                </span>
              </li>
            </ol>
          </div>

          <div v-if="streakMonths.length > 0" class="mt-4 space-y-3">
            <h3 class="text-xs uppercase tracking-wider text-dim">All streaked days</h3>
            <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
              <div v-for="month in streakMonths" :key="month.month" class="space-y-1">
                <p class="text-xs font-medium text-muted">{{ month.month }}</p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="day in month.days"
                    :key="day.date"
                    class="px-2.5 py-1.5 rounded bg-brand/15 text-brand text-[11px] font-mono border border-brand/20 hover:bg-brand/25 transition-colors cursor-default"
                    :title="formatDate(day.date)"
                  >
                    {{ formatDate(day.date, 'dd') }}
                  </span>
                </div>
              </div>
            </div>
          </div>

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
          <span class="w-12 text-right font-mono text-xs" :class="row.score >= row.passingScore ? 'text-ok' : 'text-warn'">
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
import type { CourseMeta } from '~/types/content'
import { jsPDF } from 'jspdf'

usePageSeo({
  title: 'Progress',
  description: 'Your private lesson, quiz and project progress.',
  noindex: true,
})

const { courses } = useCourses()
const { progress, totals, streak, streakWeek, courseProgressPercent, resetProgress, exportProgress } =
  useLearningProgress()

const confirmReset = ref(false)

// Streak calendar - show all streaked days in a monthly grid
const streakMonths = computed(() => {
  const days = progress.value.streak.days
  if (days.length === 0) return []

  const months: Record<string, { date: string; active: boolean }[]> = {}
  for (const day of days) {
    const date = new Date(day + 'T00:00:00')
    const monthKey = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
    if (!months[monthKey]) months[monthKey] = []
    months[monthKey].push({ date: day, active: true })
  }

  return Object.entries(months).map(([month, days]) => ({ month, days }))
})

function formatDate(isoDate: string, format: 'full' | 'dd' = 'full'): string {
  const date = new Date(isoDate + 'T00:00:00')
  if (format === 'dd') {
    return String(date.getDate()).padStart(2, '0')
  }
  return date.toLocaleDateString()
}

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
  const rows: { id: string; title: string; score: number; passingScore: number }[] = []
  for (const course of courses as CourseMeta[]) {
    for (const section of course.sections) {
      if (!section.quiz) continue
      const score = progress.value.quizScores[section.quiz.id]
      if (score === undefined) continue
      rows.push({
        id: section.quiz.id,
        title: `${course.shortTitle} · ${section.quiz.title}`,
        score,
        passingScore: section.quiz.passingScore,
      })
    }
  }
  return rows
})

async function download() {
  if (!import.meta.client) return

  const doc = new jsPDF()
  const margin = 20
  const pageWidth = doc.internal.pageSize.getWidth()
  const contentWidth = pageWidth - margin * 2
  let y = margin

  const primaryColor = '#6366f1'
  const secondaryColor = '#94a3b8'
  const darkColor = '#0f172a'
  const lightColor = '#f8fafc'

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(28)
  doc.setTextColor(primaryColor)
  doc.text('codeIngot', margin, y)
  y += 10

  doc.setFontSize(14)
  doc.setTextColor(secondaryColor)
  doc.text('Learning Progress Report', margin, y)
  y += 16

  doc.setDrawColor(primaryColor)
  doc.setLineWidth(0.5)
  doc.line(margin, y, pageWidth - margin, y)
  y += 12

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(secondaryColor)
  doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, y)
  y += 6
  doc.text(`Total XP: ${totals.value.xp.toLocaleString()}  |  Level ${1 + Math.floor(totals.value.xp / 700)}`, margin, y)
  y += 16

  const drawStatCard = (label: string, value: string, note?: string) => {
    doc.setFillColor(248, 250, 252)
    doc.roundedRect(margin, y, contentWidth / 2 - 4, 22, 3, 3, 'F')
    doc.setFontSize(8)
    doc.setTextColor(secondaryColor)
    doc.text(label.toUpperCase(), margin + 6, y + 8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(darkColor)
    doc.text(value, margin + 6, y + 17)
    if (note) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(secondaryColor)
      doc.text(note, margin + 6 + doc.getTextWidth(value) + 4, y + 17)
    }
    doc.setFont('helvetica', 'normal')
  }

  const stats = [
    { label: 'Total XP', value: totals.value.xp.toLocaleString(), note: `Level ${1 + Math.floor(totals.value.xp / 700)}` },
    { label: 'Lessons', value: totals.value.lessons.toString(), note: `${allLessonFlat().length} available` },
    { label: 'Challenges', value: totals.value.challenges.toString(), note: `${allChallenges().length} available` },
    { label: 'Projects', value: totals.value.projects.toString(), note: `${allProjectsList().length} available` },
  ]

  stats.forEach((stat, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = margin + col * (contentWidth / 2 + 4)
    const yy = y + row * 28

    doc.setFillColor(248, 250, 252)
    doc.roundedRect(x, yy, contentWidth / 2 - 4, 22, 3, 3, 'F')
    doc.setFontSize(8)
    doc.setTextColor(secondaryColor)
    doc.text(stat.label.toUpperCase(), x + 6, yy + 8)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(darkColor)
    doc.text(stat.value, x + 6, yy + 17)
    if (stat.note) {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(secondaryColor)
      doc.text(stat.note, x + 6 + doc.getTextWidth(stat.value) + 4, yy + 17)
    }
    doc.setFont('helvetica', 'normal')
  })

  y += 64

  doc.setFontSize(16)
  doc.setTextColor(primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Course Progress', margin, y)
  y += 10

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(darkColor)

  for (const course of courses as CourseMeta[]) {
    const percent = percentFor(course.slug)
    const done = doneCount(course.slug)
    const total = course.sections.reduce((sum, s) => sum + s.lessons.length, 0)

    doc.setFillColor(255, 255, 255)
    doc.roundedRect(margin, y, contentWidth, 28, 3, 3, 'F')
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, y, contentWidth, 28, 3, 3, 'S')

    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(darkColor)
    doc.text(course.title, margin + 8, y + 10)

    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(secondaryColor)
    doc.text(`${done} / ${total} lessons`, margin + 8, y + 18)

    const barWidth = contentWidth - 16
    const barHeight = 6
    const barX = margin + 8
    const barY = y + 20

    doc.setFillColor(226, 232, 240)
    doc.roundedRect(barX, barY, barWidth, barHeight, 2, 2, 'F')
    doc.setFillColor(primaryColor)
    doc.roundedRect(barX, barY, (barWidth * percent) / 100, barHeight, 2, 2, 'F')

    doc.setFontSize(8)
    doc.setTextColor(secondaryColor)
    doc.text(`${percent}%`, margin + contentWidth - 20, y + 24)

    y += 34
  }

  y += 6

  doc.setFontSize(16)
  doc.setTextColor(primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text('Streak', margin, y)
  y += 10

  doc.setFillColor(248, 250, 252)
  doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F')
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(primaryColor)
  doc.text(`${streak.value.current}`, margin + 12, y + 18)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(secondaryColor)
  doc.text('day streak', margin + 12 + doc.getTextWidth(`${streak.value.current}`) + 4, y + 18)
  doc.setFontSize(9)
  doc.text(`Longest: ${streak.value.longest} days`, margin + 12, y + 26)
  y += 42

  doc.setFontSize(16)
  doc.setTextColor(primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text('XP by Source', margin, y)
  y += 10

  for (const row of xpRows.value) {
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'F')
    doc.setDrawColor(226, 232, 240)
    doc.roundedRect(margin, y, contentWidth, 18, 3, 3, 'S')
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(darkColor)
    doc.text(row.label, margin + 8, y + 12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(primaryColor)
    doc.text(`${row.value.toLocaleString()} XP`, margin + contentWidth - 8 - doc.getTextWidth(`${row.value.toLocaleString()} XP`), y + 12)
    y += 22
  }

  if (quizRows.value.length > 0) {
    y += 6
    doc.setFontSize(16)
    doc.setTextColor(primaryColor)
    doc.setFont('helvetica', 'bold')
    doc.text('Quiz Scores', margin, y)
    y += 10

    for (const row of quizRows.value) {
      doc.setFillColor(255, 255, 255)
      doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F')
      doc.setDrawColor(226, 232, 240)
      doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'S')
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(darkColor)
      doc.text(row.title, margin + 8, y + 10)

      const barWidth = contentWidth - 16
      const barHeight = 6
      const barX = margin + 8
      const barY = y + 12

      doc.setFillColor(226, 232, 240)
      doc.roundedRect(barX, barY, barWidth, barHeight, 2, 2, 'F')
      const scoreColor = row.score >= row.passingScore ? '#22c55e' : '#f59e0b'
      doc.setFillColor(scoreColor)
      doc.roundedRect(barX, barY, (barWidth * row.score) / 100, barHeight, 2, 2, 'F')

      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(scoreColor)
      doc.text(`${row.score}%`, margin + contentWidth - 20, y + 17)
      y += 26
    }
  }

  y += 10
  doc.setFontSize(8)
  doc.setTextColor(secondaryColor)
  doc.setFont('helvetica', 'italic')
  doc.text('Keep learning! Every lesson completed brings you closer to mastery.', margin, y)

  doc.save('codeingot-progress.pdf')
}

async function doReset() {
  await resetProgress()
  confirmReset.value = false
}
</script>