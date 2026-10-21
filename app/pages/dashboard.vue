<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">
      Welcome back<span v-if="totals.xp">, level {{ level.level }} {{ level.title }}</span>.
    </h1>

    <section
      class="mt-8 overflow-hidden rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-transparent p-6"
      aria-labelledby="continue-heading"
    >
      <p class="font-mono text-[11px] uppercase tracking-widest text-brand">Continue learning</p>
      <template v-if="target">
        <h2 id="continue-heading" class="mt-3 text-xl font-semibold text-mist-50">
          {{ target.courseTitle }}
        </h2>
        <p class="mt-1 text-muted">{{ target.sectionTitle }} · {{ target.title }}</p>
        <div class="mt-5 flex flex-wrap items-center gap-3">
          <NuxtLink
            :to="target.href"
            class="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
          >
            Continue
          </NuxtLink>
          <NuxtLink :to="`/courses/${target.courseSlug}`" class="text-sm text-muted hover:text-mist-50">
            View the whole course
          </NuxtLink>
        </div>
      </template>
      <template v-else>
        <h2 id="continue-heading" class="mt-3 text-xl font-semibold text-mist-50">
          Pick your first lesson
        </h2>
        <p class="mt-1 text-muted">
          The Frontend Developer path starts with HTML, then CSS, then JavaScript.
        </p>
        <NuxtLink
          to="/learn/html-fundamentals/html-l1"
          class="mt-5 inline-block rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
        >
          Start lesson 1
        </NuxtLink>
      </template>
    </section>

    <div class="mt-6 grid gap-6 lg:grid-cols-3">
      <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5 lg:col-span-2">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base font-semibold text-mist-50">Your progress</h2>
          <NuxtLink to="/progress" class="text-xs text-brand hover:text-brand-soft">Details →</NuxtLink>
        </div>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <div
            v-for="stat in statRows"
            :key="stat.label"
            class="rounded-xl border border-ink-600 bg-ink-850 p-4"
          >
            <p class="text-xs uppercase tracking-wider text-dim">{{ stat.label }}</p>
            <p class="mt-1.5 font-mono text-2xl text-mist-50">{{ stat.value }}</p>
          </div>
        </div>
        <div class="mt-5">
          <div class="flex items-center justify-between text-xs">
            <span class="text-muted">Level {{ level.level }} · {{ level.title }}</span>
            <span class="font-mono text-dim">{{ totals.xp.toLocaleString() }} XP</span>
          </div>
          <ProgressBar class="mt-2" :value="level.progress * 100" label="Level progress" />
          <p class="mt-1.5 font-mono text-[11px] text-dim">
            ██████████░░ {{ Math.round(level.progress * 100) }}% to level {{ level.level + 1 }}
          </p>
        </div>
      </section>

      <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
        <h2 class="text-base font-semibold text-mist-50">Daily goal</h2>
        <p class="mt-1 font-mono text-3xl" :class="dailyGoalRatio >= 1 ? 'text-ok' : 'text-mist-50'">
          {{ progress.dailyXp }}
          <span class="text-sm text-dim">/ {{ progress.dailyGoal }} XP</span>
        </p>
        <ProgressBar class="mt-3" :value="dailyGoalRatio * 100" label="Daily goal progress" />
        <label class="mt-4 block text-xs text-dim">
          Daily goal (XP)
          <select
            class="mt-1 w-full rounded-lg border border-ink-600 bg-ink-950 px-2 py-1.5 text-sm text-mist-50"
            :value="progress.dailyGoal"
            @change="setDailyGoal(Number(($event.target as HTMLSelectElement).value))"
          >
            <option v-for="option in [25, 50, 75, 100, 150]" :key="option" :value="option">
              {{ option }} XP
            </option>
          </select>
        </label>
        <div class="mt-4 flex items-center gap-1.5 text-sm">
          <span aria-hidden="true">🔥</span>
          <span class="text-mist-50">{{ streak.current }} day streak</span>
        </div>
        <ol class="mt-3 grid grid-cols-7 gap-1 text-center" aria-label="This week">
          <li v-for="day in streakWeek" :key="day.date">
            <span
              class="grid h-7 w-full place-items-center rounded-md text-[11px]"
              :class="day.active ? 'bg-brand/20 text-brand' : 'bg-ink-800 text-dim'"
            >
              {{ day.label }}
            </span>
          </li>
        </ol>
      </section>
    </div>

    <section class="mt-6 rounded-2xl border border-ink-600 bg-ink-900 p-5">
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-base font-semibold text-mist-50">Current path</h2>
        <NuxtLink v-if="currentPath" :to="`/paths/${currentPath.slug}`" class="text-xs text-brand hover:text-brand-soft">
          Open path →
        </NuxtLink>
      </div>
      <template v-if="currentPath">
        <p class="mt-2 text-sm text-muted">{{ currentPath.title }} · {{ pathDone }} of {{ currentPath.steps.length }} courses</p>
        <ProgressBar class="mt-3" :value="pathPercent" label="Path progress" />
        <ol class="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="step in currentPath.steps.slice(0, 6)" :key="step.id">
            <NuxtLink
              v-if="getCourse(step.courseSlug)"
              :to="`/courses/${step.courseSlug}`"
              class="flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-850 px-3 py-2 text-sm text-mist-200 transition hover:border-brand/40"
            >
              <span class="font-mono text-[11px] text-dim">{{ String(step.order).padStart(2, '0') }}</span>
              {{ step.title }}
            </NuxtLink>
            <div
              v-else
              class="flex items-center gap-2 rounded-lg border border-ink-600/60 bg-ink-850/50 px-3 py-2 text-sm text-dim"
            >
              <span class="font-mono text-[11px]">{{ String(step.order).padStart(2, '0') }}</span>
              {{ step.title }}
              <span class="ml-auto text-[10px] uppercase">soon</span>
            </div>
          </li>
        </ol>
      </template>
    </section>

    <div class="mt-6 grid gap-6 lg:grid-cols-2">
      <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base font-semibold text-mist-50">Recent achievements</h2>
          <NuxtLink to="/achievements" class="text-xs text-brand hover:text-brand-soft">All →</NuxtLink>
        </div>
        <ul v-if="unlocked.length" class="mt-4 space-y-2">
          <li
            v-for="item in unlocked"
            :key="item.id"
            class="flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-850 px-3 py-2.5"
          >
            <span class="grid h-8 w-8 place-items-center rounded-lg bg-brand/10 text-brand ring-1 ring-brand/30" aria-hidden="true">
              {{ item.icon }}
            </span>
            <div class="min-w-0">
              <p class="text-sm text-mist-50">{{ item.title }}</p>
              <p class="truncate text-xs text-dim">{{ item.description }}</p>
            </div>
            <span class="ml-auto font-mono text-[11px] text-brand">+{{ item.xp }} XP</span>
          </li>
        </ul>
        <p v-else class="mt-4 text-sm text-muted">
          None yet. Finish a lesson, pass a challenge or submit a project and they start appearing here.
        </p>
      </section>

      <section class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
        <h2 class="text-base font-semibold text-mist-50">Keep practising</h2>
        <div class="mt-4 space-y-2">
          <NuxtLink
            v-for="challenge in suggestions"
            :key="challenge.id"
            :to="`/challenges/${challenge.slug}`"
            class="flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-850 px-3 py-2.5 transition hover:border-brand/40"
          >
            <span class="text-sm text-mist-50">{{ challenge.title }}</span>
            <span class="ml-auto font-mono text-[11px] text-dim">{{ challenge.practices[0] }}</span>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { levelInfo } from '~/utils/achievements'

usePageSeo({
  title: 'Dashboard',
  description: 'Your private learning overview, streak and next lesson.',
  noindex: true,
})

const { progress, totals, streak, streakWeek, dailyGoalRatio, continueTarget, continuePath, pathProgressPercent, pathCoursesCompleted, setDailyGoal, achievements, isChallengeComplete } =
  useLearningProgress()

const level = computed(() => levelInfo(progress.value.xp))
const target = computed(() => continueTarget())
const currentPath = computed(() => continuePath())
const pathPercent = computed(() => (currentPath.value ? pathProgressPercent(currentPath.value) : 0))
const pathDone = computed(() => (currentPath.value ? pathCoursesCompleted(currentPath.value) : 0))

const statRows = computed(() => [
  { label: 'Lessons completed', value: totals.value.lessons },
  { label: 'Challenges passed', value: totals.value.challenges },
  { label: 'Projects submitted', value: totals.value.projects },
  { label: 'Quizzes taken', value: totals.value.quizzes },
])

const unlocked = computed(() => achievements.value.filter((item) => item.unlocked).slice(0, 4))

const suggestions = computed(() => {
  const all = allChallenges()
  const remaining = all.filter((challenge) => !isChallengeComplete(challenge.id))
  return (remaining.length ? remaining : all).slice(0, 4)
})
</script>