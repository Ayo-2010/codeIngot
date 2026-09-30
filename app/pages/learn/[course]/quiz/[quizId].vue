<template>
  <div v-if="quiz && course" class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
    <aside
      class="hidden w-72 shrink-0 border-r border-ink-600 bg-ink-900 lg:block"
      aria-label="Course navigation"
    >
      <LearnCourseSidebar
        :course="course"
        :current-lesson-id="currentLessonId"
      />
    </aside>

    <div v-if="drawerOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="absolute inset-0 bg-ink-950/80" @click="drawerOpen = false" />
      <div class="absolute inset-y-0 left-0 w-[86vw] max-w-sm border-r border-ink-600 bg-ink-900">
        <LearnCourseSidebar
          :course="course"
          :current-lesson-id="currentLessonId"
        />
      </div>
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-center gap-3 border-b border-ink-600 bg-ink-900/60 px-4 py-2.5">
        <button
          type="button"
          class="rounded-lg border border-ink-600 p-1.5 text-muted lg:hidden"
          aria-label="Open course navigation"
          @click="drawerOpen = true"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" />
          </svg>
        </button>
        <p class="truncate font-mono text-[11px] uppercase tracking-wider text-dim">
          {{ course.shortTitle }} · Quiz
        </p>
      </div>

      <div class="flex min-h-0 flex-1 overflow-y-auto">
        <article class="min-w-0 flex-1 px-4 py-8 sm:px-8">
          <div class="mx-auto max-w-3xl">
            <header class="mb-8">
              <h1 class="text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
                {{ quiz.title }}
              </h1>
              <p class="mt-2 text-muted">
                Test your understanding of this section's lessons.
              </p>
            </header>

            <LessonQuiz :quiz="quiz" @finish="onFinish" />

            <footer class="mt-12 border-t border-ink-600 pt-6">
              <div class="flex justify-between">
              <NuxtLink
                :to="`/learn/${course.slug}/${prevLesson?.id ?? ''}`"
                v-if="prevLesson"
                class="rounded-xl border border-ink-600 px-4 py-2.5 text-sm text-mist-50 transition hover:border-brand/40"
              >
                ← Previous lesson
              </NuxtLink>
              <NuxtLink
                :to="followingLessonHref"
                class="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
              >
                  Next
                </NuxtLink>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  </div>

  <div v-else class="mx-auto max-w-3xl px-4 py-24 text-center">
    <h1 class="text-2xl font-semibold text-mist-50">Quiz not found</h1>
    <NuxtLink to="/courses" class="mt-4 inline-block text-sm text-brand">Back to courses</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const route = useRoute()

const courseSlug = computed(() => String(route.params.course))
const quizId = computed(() => String(route.params.quizId))

const course = computed(() => getCourse(courseSlug.value))
const quiz = computed(() => getQuizById(courseSlug.value, quizId.value))

const { recordQuiz } = useLearningProgress()

const drawerOpen = ref(false)

const currentLessonId = computed(() => {
  const sec = getQuizSection(courseSlug.value, quizId.value)
  if (!sec) return ''
  return sec.lessons[sec.lessons.length - 1]?.id ?? ''
})

const lastLessonId = computed(() => {
  const sec = getQuizSection(courseSlug.value, quizId.value)
  if (!sec) return ''
  return sec.lessons[sec.lessons.length - 1]?.id ?? ''
})

const prevLesson = computed(() => {
  if (!lastLessonId.value) return undefined
  return previousLesson(lastLessonId.value)
})

const followingLesson = computed(() => {
  if (!lastLessonId.value) return undefined
  return nextLesson(lastLessonId.value)
})

const followingLessonHref = computed(() => {
  if (followingLesson.value) {
    return `/learn/${courseSlug.value}/${followingLesson.value.id}`
  }
  return `/courses/${courseSlug.value}`
})

function onFinish(score: number) {
  if (quiz.value) {
    recordQuiz(quiz.value, score)
  }
}
</script>
