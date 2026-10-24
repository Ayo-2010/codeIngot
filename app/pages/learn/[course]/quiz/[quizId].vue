<template>
  <div v-if="quiz && course" class="flex h-full overflow-hidden">
    <aside
      class="hidden w-72 shrink-0 border-r border-ink-600 bg-ink-900 lg:block"
      aria-label="Course navigation"
    >
      <LearnCourseSidebar
        :course="course"
        :current-lesson-id="currentLessonId"
        :current-quiz-id="quizId"
      />
    </aside>

    <div
      v-if="drawerOpen"
      id="course-drawer"
      class="fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden"
    >
      <div class="absolute inset-0 bg-ink-950/80" @click="drawerOpen = false" />
      <div
        class="absolute bottom-0 left-0 top-14 w-[86vw] max-w-sm overflow-hidden border-r border-ink-600 bg-ink-900"
      >
        <LearnCourseSidebar
          :course="course"
          :current-lesson-id="currentLessonId"
          :current-quiz-id="quizId"
        />
      </div>
    </div>

    <div class="flex min-w-0 flex-1 flex-col">
      <div
        class="relative z-[45] flex h-14 shrink-0 items-center gap-3 border-b border-ink-600 bg-ink-900 px-4"
      >
        <HamburgerButton
          :open="drawerOpen"
          controls="course-drawer"
          open-label="Open course navigation"
          close-label="Close course navigation"
          class="lg:hidden"
          @toggle="drawerOpen = !drawerOpen"
        />
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
                Test your understanding of {{ target?.lesson.title ?? 'this lesson' }}.
              </p>
            </header>

            <LessonQuiz :quiz="quiz" @finish="onFinish" />

            <footer class="mt-12 border-t border-ink-600 pt-6">
              <div class="flex justify-between">
              <NuxtLink
                v-if="target"
                :to="`/learn/${course.slug}/${target.lesson.id}`"
                class="rounded-xl border border-ink-600 px-4 py-2.5 text-sm text-mist-50 transition hover:border-brand/40"
              >
                ← Back to lesson
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
const target = computed(() => getQuizTarget(courseSlug.value, quizId.value))
const quizSummary = computed(() => target.value?.quiz)

/** Question bodies are not in the catalogue metadata; fetch the owning course. */
const { data: quiz } = await useAsyncData(
  () => `quiz-${courseSlug.value}-${quizId.value}`,
  () => loadQuiz(courseSlug.value, quizId.value),
)

const { recordQuiz } = useLearningProgress()

usePageSeo({
  title: computed(() => quiz.value?.title ?? quizSummary.value?.title ?? 'Quiz'),
  description: computed(() => {
    const lesson = target.value?.lesson
    if (lesson && course.value) {
      return `Check your understanding of ${lesson.title} in ${course.value.title}.`
    }
    return 'A short lesson quiz that checks what you just learned.'
  }),
})

const drawerOpen = ref(false)

const currentLessonId = computed(() => target.value?.lesson.id ?? '')

const followingLesson = computed(() => {
  if (!target.value) return undefined
  return nextLesson(target.value.lesson.id)
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
