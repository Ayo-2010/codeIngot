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

    <!--
      `minmax(0, 1fr)` rather than `1fr`: a bare `1fr` track is `minmax(auto, 1fr)`,
      so its automatic minimum is the column's min-content size. The lesson rows use
      `truncate` (white-space: nowrap), and nowrap text reports its full unwrapped
      width as min-content, so the track grew past the `max-w-7xl` container and
      pushed the sticky aside off the right edge of the viewport.
    -->
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div class="min-w-0">
        <section
          v-if="capstoneProjects.length"
          class="mb-10 rounded-2xl border border-brand/25 bg-brand/5 p-5 sm:p-6"
          aria-labelledby="capstones-heading"
        >
          <div class="flex flex-wrap items-end justify-between gap-3">
            <div class="max-w-2xl">
              <p class="font-mono text-[11px] uppercase tracking-widest text-brand">Capstone builds</p>
              <h2 id="capstones-heading" class="mt-1 text-lg font-semibold tracking-tight text-mist-50">
                Five projects, brief to shipped
              </h2>
              <p class="mt-1.5 text-sm leading-relaxed text-muted">
                Each build has its own workspace: a brief, a design reference, starter files and a
                checklist that grades the code you write. The lessons walk you through the plan and
                the review; the workspace is where the project lives.
              </p>
            </div>
            <NuxtLink
              to="/projects"
              class="shrink-0 rounded-lg border border-ink-600 px-3 py-1.5 text-xs font-medium text-mist-50 transition hover:border-brand/50 hover:bg-ink-800"
            >
              Browse all projects
            </NuxtLink>
          </div>

          <ul class="mt-4 grid gap-2 sm:grid-cols-2">
            <li v-for="(project, index) in capstoneProjects" :key="project.id">
              <NuxtLink
                :to="`/projects/${project.slug}`"
                class="flex h-full items-start gap-3 rounded-xl border border-ink-600 bg-ink-900 px-3.5 py-3 transition hover:border-brand/40"
              >
                <span
                  class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-brand/30 font-mono text-[11px] text-brand"
                  aria-hidden="true"
                >
                  {{ index + 1 }}
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-sm font-medium text-mist-50">{{ project.title }}</span>
                  <span class="mt-0.5 block text-xs text-dim">
                    {{ project.difficulty }} · ~{{ project.estimatedMinutes }} min · {{ project.xp }} XP
                  </span>
                </span>
                <span class="mt-0.5 shrink-0 text-brand" aria-hidden="true">&rarr;</span>
              </NuxtLink>
            </li>
          </ul>
        </section>

        <section
          v-for="(chapter, chapterIndex) in chapters"
          :key="chapter.id"
          class="mb-10 last:mb-0"
          :aria-labelledby="`${chapter.id}-title`"
        >
          <div class="flex flex-wrap items-baseline gap-3">
            <span class="font-mono text-xs text-brand">{{ String(chapterIndex + 1).padStart(2, '0') }}</span>
            <h2 :id="`${chapter.id}-title`" class="text-xl font-semibold tracking-tight text-mist-50">
              {{ chapter.title }}
            </h2>
            <span class="ml-auto font-mono text-[11px] text-dim">
              {{ chapterDone(chapter) }}/{{ chapter.lessons }} lessons
            </span>
          </div>
          <p v-if="chapter.description" class="mt-1 pl-8 text-sm text-muted">{{ chapter.description }}</p>

          <div class="mt-4 space-y-1.5">
            <div v-for="section in chapter.sections" :key="section.id">
              <ol class="space-y-1.5">
                <li v-for="lesson in section.lessons" :key="lesson.id">
                  <div class="flex items-stretch gap-2">
                    <NuxtLink
                      :to="`/learn/${course.slug}/${lesson.id}`"
                      class="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 transition hover:border-brand/40"
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
                        {{ done(lesson.id) ? '✓' : lessonNumber(chapter, lesson.id) }}
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

                    <!--
                      A one-lesson section owns a single quiz, so its quiz rides
                      on the lesson row instead of adding 60 extra quiz cards.
                    -->
                    <NuxtLink
                      v-if="section.quiz && section.lessons.length === 1"
                      :to="`/learn/${course.slug}/quiz/${section.quiz.id}`"
                      class="flex shrink-0 items-center gap-1.5 rounded-xl border border-ink-600 bg-ink-900 px-3 text-xs transition hover:border-brand/40 hover:text-brand"
                      :class="quizDone(section.quiz) ? 'text-ok' : 'text-dim'"
                      :aria-label="`Take the ${section.quiz.title} quiz`"
                    >
                      <span aria-hidden="true">★</span>
                      <span class="hidden sm:inline">Quiz</span>
                    </NuxtLink>
                  </div>
                </li>
              </ol>

              <NuxtLink
                v-if="section.quiz && section.lessons.length > 1"
                :to="`/learn/${course.slug}/quiz/${section.quiz.id}`"
                class="mt-3 flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-850 px-4 py-3 transition hover:border-brand/40"
              >
                <span class="text-brand" aria-hidden="true">★</span>
                <div class="min-w-0 flex-1">
                  <p class="text-sm text-mist-50">{{ section.quiz.title }}</p>
                  <p class="text-xs text-dim">
                    {{ section.quiz.questionCount }} questions · pass at {{ section.quiz.passingScore }}%
                  </p>
                </div>
                <span class="font-mono text-xs" :class="quizDone(section.quiz) ? 'text-ok' : 'text-dim'">
                  {{ quizScore(section.quiz) !== null ? `${quizScore(section.quiz)}%` : 'not taken' }}
                </span>
              </NuxtLink>
            </div>
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
import type { CourseChapter } from '~/composables/useCourses'
import type { ProjectSummary, QuizSummary } from '~/types/content'

const route = useRoute()
const course = computed(() => getCourse(String(route.params.slug)))
const { progress, courseProgressPercent, isCourseComplete, quizPassed } = useLearningProgress()

const siteUrl = String(useRuntimeConfig().public.siteUrl).replace(/\/+$/, '')

usePageSeo({
  title: computed(() => course.value?.title ?? 'Course not found'),
  description: computed(
    () =>
      course.value?.description ??
      'A guided frontend course with lessons, exercises and a section quiz.',
  ),
  jsonLd: computed(() => {
    const value = course.value
    if (!value) return undefined
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: value.title,
      description: value.description,
      url: `${siteUrl}/courses/${value.slug}`,
      provider: {
        '@type': 'Organization',
        name: 'codeIngot',
        url: siteUrl,
      },
      educationalLevel: value.difficulty,
      inLanguage: 'en',
    }
  }),
})

if (!course.value) {
  throw createError({ statusCode: 404, statusMessage: 'Course not found', fatal: true })
}

const stats = computed(() => courseStats(course.value!))
const chapters = computed(() => (course.value ? courseChapters(course.value) : []))
const capstoneProjects = computed<ProjectSummary[]>(() =>
  course.value?.category === 'projects'
    ? course.value.projects
        .map((slug) => getProjectSummary(slug))
        .filter((project): project is ProjectSummary => project !== undefined)
    : [],
)
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

function chapterDone(chapter: CourseChapter): number {
  return chapter.sections.reduce(
    (total, section) => total + section.lessons.filter((lesson) => done(lesson.id)).length,
    0,
  )
}

/** A lesson's 1-based position across its whole chapter. */
function lessonNumber(chapter: CourseChapter, lessonId: string): number {
  let position = 0
  for (const section of chapter.sections) {
    for (const lesson of section.lessons) {
      position += 1
      if (lesson.id === lessonId) return position
    }
  }
  return position
}

function hasExercise(lessonId: string) {
  const lesson = getLessonById(lessonId)
  return (lesson?.exerciseCount ?? 0) > 0
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
  const entries = [
    { label: 'Chapters', value: chapters.value.length },
    { label: 'Lessons', value: stats.value.lessons },
    { label: 'Challenges', value: stats.value.challenges },
    { label: 'Quizzes', value: stats.value.quizzes },
    { label: 'Time', value: `${stats.value.minutes} min` },
  ]
  // A course with no projects of its own reads "0 projects" badly; the row
  // simply does not appear. Courses that do have projects keep it in place.
  if (stats.value.projects > 0) {
    entries.splice(3, 0, { label: 'Projects', value: stats.value.projects })
  }
  return entries
})

function quizScore(quiz: QuizSummary): number | null {
  return progress.value.quizScores[quiz.id] ?? null
}

function quizDone(quiz: QuizSummary) {
  return quizPassed(quiz)
}
</script>