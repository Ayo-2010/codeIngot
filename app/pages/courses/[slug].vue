<template>
  <div v-if="course">
    <header class="border-b border-ink-600/60 bg-ink-900/40">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <nav class="text-xs text-dim" aria-label="Breadcrumb">
          <NuxtLink to="/courses" class="hover:text-brand">Courses</NuxtLink>
          <span class="px-1.5">/</span>
          <span class="text-muted">{{ course.shortTitle }}</span>
        </nav>

        <div class="mt-4 flex flex-wrap items-start justify-between gap-6">
          <div class="max-w-2xl">
            <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">{{ course.title }}</h1>
            <p class="mt-3 text-muted">{{ course.description }}</p>
            <div class="mt-4 flex flex-wrap gap-1.5">
              <TagPill :value="course.difficulty" tone="brand" />
              <TagPill v-for="badge in course.badges" :key="badge" :value="badge" tone="muted" />
              <TagPill v-for="topic in course.topics.slice(0, 5)" :key="topic" :value="topic" tone="muted" />
            </div>
          </div>
          <div class="min-w-[220px]">
            <ProgressBar :value="percent" :label="`${course.title} progress`" />
            <p class="mt-2 flex items-center justify-between font-mono text-[11px] text-dim">
              <span>{{ completedLessons }} / {{ stats.lessons }} lessons</span>
              <span class="text-brand">{{ percent }}%</span>
            </p>
            <NuxtLink
              :to="continueHref"
              class="mt-4 block rounded-xl bg-brand px-4 py-2.5 text-center text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
            >
              {{ percent > 0 ? 'Continue course' : 'Start course' }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_300px]">
      <div>
        <section
          v-for="(section, sectionIndex) in course.sections"
          :key="section.id"
          class="mb-10 last:mb-0"
          :aria-labelledby="`${section.id}-title`"
        >
          <div class="flex items-baseline gap-3">
            <span class="font-mono text-xs text-brand">{{ String(sectionIndex + 1).padStart(2, '0') }}</span>
            <h2 :id="`${section.id}-title`" class="text-xl font-semibold tracking-tight text-mist-50">
              {{ section.title }}
            </h2>
          </div>
          <p class="mt-1 pl-8 text-sm text-muted">{{ section.description }}</p>

          <ol class="mt-4 space-y-1.5">
            <li v-for="(lesson, index) in section.lessons" :key="lesson.id">
              <NuxtLink
                :to="`/learn/${course.slug}/${lesson.id}`"
                class="flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 transition hover:border-brand/40"
              >
                <span
                  class="grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px]"
                  :class="
                    done(lesson.id)
                      ? 'border-ok/40 bg-ok/10 text-ok'
                      : 'border-ink-600 text-dim'
                  "
                  aria-hidden="true"
                >
                  {{ done(lesson.id) ? '✓' : index + 1 }}
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block truncate text-sm text-mist-50">{{ lesson.title }}</span>
                  <span class="block truncate text-xs text-dim">{{ lesson.description }}</span>
                </span>
                <span class="flex shrink-0 items-center gap-3 font-mono text-[11px] text-dim">
                  <span v-if="hasExercise(lesson.id)" class="text-brand" title="Ends in a challenge">✎</span>
                  {{ lesson.duration }} min
                </span>
              </NuxtLink>
            </li>
          </ol>

          <div
            v-if="section.quiz"
            class="mt-3 flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-850 px-4 py-3"
          >
            <span class="text-brand" aria-hidden="true">★</span>
            <div class="min-w-0 flex-1">
              <p class="text-sm text-mist-50">{{ section.quiz.title }}</p>
              <p class="text-xs text-dim">
                {{ section.quiz.questions.length }} questions · pass at {{ section.quiz.passingScore }}%
              </p>
            </div>
            <span class="font-mono text-xs" :class="quizDone(section.quiz) ? 'text-ok' : 'text-dim'">
              {{ quizScore(section.quiz) !== null ? `${quizScore(section.quiz)}%` : 'not taken' }}
            </span>
          </div>
        </section>

        <section v-if="isComplete" class="rounded-2xl border border-brand/30 bg-brand/5 p-6 text-center">
          <p class="font-mono text-xs uppercase tracking-widest text-brand">Course complete</p>
          <h2 class="mt-2 text-2xl font-semibold text-mist-50">{{ course.title }}</h2>
          <ul class="mx-auto mt-4 grid max-w-sm gap-1.5 text-left text-sm text-mist-200">
            <li>✓ {{ stats.lessons }} lessons</li>
            <li>✓ {{ stats.challenges }} challenges</li>
            <li>✓ {{ stats.quizzes }} quizzes</li>
            <li v-if="stats.projects">✓ {{ stats.projects }} projects</li>
          </ul>
          <NuxtLink
            v-if="nextCourse"
            :to="`/courses/${nextCourse.slug}`"
            class="mt-6 inline-block rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
          >
            Continue to {{ nextCourse.shortTitle }}
          </NuxtLink>
        </section>
      </div>

      <aside class="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <h2 class="text-sm font-semibold text-mist-50">What you will build</h2>
          <ul class="mt-3 space-y-2">
            <li v-for="objective in course.sections.flatMap((s) => s.lessons.flatMap((l) => l.objectives)).slice(0, 6)" :key="objective" class="flex gap-2 text-sm text-muted">
              <span class="text-brand" aria-hidden="true">▸</span>
              {{ objective }}
            </li>
          </ul>
        </div>
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <h2 class="text-sm font-semibold text-mist-50">At a glance</h2>
          <dl class="mt-3 space-y-2 text-sm">
            <div v-for="row in glance" :key="row.label" class="flex justify-between gap-3">
              <dt class="text-muted">{{ row.label }}</dt>
              <dd class="font-mono text-mist-50">{{ row.value }}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  </div>

  <div v-else class="mx-auto max-w-3xl px-4 py-24 text-center">
    <h1 class="text-2xl font-semibold text-mist-50">That course does not exist</h1>
    <NuxtLink to="/courses" class="mt-4 inline-block text-sm text-brand">Back to the catalog</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Quiz } from '~/types/content'

const route = useRoute()
const course = computed(() => getCourse(String(route.params.slug)))
const { progress, courseProgressPercent, isCourseComplete, quizPassed } = useLearningProgress()

useHead({ title: computed(() => course.value?.title ?? 'Course not found') })

if (!course.value) {
  throw createError({ statusCode: 404, statusMessage: 'Course not found', fatal: true })
}

const stats = computed(() => courseStats(course.value!))
const percent = computed(() => (course.value ? courseProgressPercent(course.value) : 0))
const completedLessons = computed(() =>
  course.value ? progress.value.completedLessons.filter((id) => lessonIdsOf(course.value!).has(id)).length : 0,
)
const isComplete = computed(() => course.value ? isCourseComplete(course.value) : false)

function lessonIdsOf(target: NonNullable<typeof course.value>) {
  return new Set(target.sections.flatMap((section) => section.lessons.map((lesson) => lesson.id)))
}

function done(lessonId: string) {
  return progress.value.completedLessons.includes(lessonId)
}

function hasExercise(lessonId: string) {
  const lesson = getLessonById(lessonId)
  return lesson?.content.some((block) => block.type === 'exercise') ?? false
}

const continueHref = computed(() => {
  const first = course.value?.sections[0]?.lessons[0]
  const next = course.value
    ?.sections.flatMap((section) => section.lessons)
    .find((lesson) => !progress.value.completedLessons.includes(lesson.id))
  const target = next ?? first
  return target ? `/learn/${course.value!.slug}/${target.id}` : '/courses'
})

const nextCourse = computed(() => {
  const order = allCoursesList()
  const index = order.findIndex((item) => item.slug === course.value?.slug)
  return index >= 0 ? order[index + 1] : undefined
})

const glance = computed(() => {
  if (!course.value) return []
  return [
    { label: 'Lessons', value: stats.value.lessons },
    { label: 'Challenges', value: stats.value.challenges },
    { label: 'Quizzes', value: stats.value.quizzes },
    { label: 'Projects', value: stats.value.projects },
    { label: 'Time', value: `${stats.value.minutes} min` },
  ]
})

function quizScore(quiz: Quiz): number | null {
  return progress.value.quizScores[quiz.id] ?? null
}

function quizDone(quiz: Quiz) {
  return quizPassed(quiz)
}
</script>