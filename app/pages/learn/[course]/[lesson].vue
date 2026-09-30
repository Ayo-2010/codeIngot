<template>
  <div v-if="lesson && course" class="flex h-[calc(100vh-3.5rem)] overflow-hidden">
    <aside
      class="hidden w-72 shrink-0 border-r border-ink-600 bg-ink-900 lg:block"
      aria-label="Course navigation"
    >
      <LearnCourseSidebar
        :course="course"
        :current-lesson-id="lesson.id"
      />
    </aside>

    <div v-if="drawerOpen" class="fixed inset-0 z-50 lg:hidden">
      <div class="absolute inset-0 bg-ink-950/80" @click="drawerOpen = false" />
      <div class="absolute inset-y-0 left-0 w-[86vw] max-w-sm border-r border-ink-600 bg-ink-900">
        <LearnCourseSidebar
          :course="course"
          :current-lesson-id="lesson.id"
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
          {{ course.shortTitle }} · {{ lesson.sectionTitle }}
        </p>
        <div class="ml-auto flex items-center gap-2">
          <button
            v-if="previous"
            type="button"
            class="rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs text-muted transition hover:text-mist-50"
            @click="go(previous)"
          >
            ← Previous
          </button>
          <button
            v-if="next"
            type="button"
            class="rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs text-mist-50 transition hover:border-brand/40"
            @click="go(next)"
          >
            Next →
          </button>
        </div>
      </div>

      <div ref="scrollContainer" class="flex min-h-0 flex-1 overflow-y-auto">
        <article class="min-w-0 flex-1 px-4 py-8 sm:px-8">
          <div class="mx-auto max-w-3xl">
            <header>
              <p class="font-mono text-[11px] uppercase tracking-wider text-brand">
                Lesson {{ lesson.index + 1 }} · {{ lesson.duration }} min
              </p>
              <h1 class="mt-2 text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
                {{ lesson.title }}
              </h1>
              <p class="mt-2 text-muted">{{ lesson.description }}</p>

              <div class="mt-4 rounded-xl border border-ink-600 bg-ink-900 p-4">
                <p class="text-[11px] font-semibold uppercase tracking-wider text-dim">
                  By the end you will be able to
                </p>
                <ul class="mt-2 space-y-1.5">
                  <li
                    v-for="objective in lesson.objectives"
                    :key="objective"
                    class="flex gap-2 text-sm text-mist-200"
                  >
                    <span class="text-brand" aria-hidden="true">▸</span>
                    {{ objective }}
                  </li>
                </ul>
              </div>
            </header>

            <LessonBlockRenderer
              class="mt-8"
              :blocks="lesson.content"
              :course-slug="course.slug"
              :lesson-id="lesson.id"
            />

            <footer class="mt-12 border-t border-ink-600 pt-6">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p class="text-sm font-medium text-mist-50">
                    {{ isDone ? 'Lesson complete' : 'Finished this lesson?' }}
                  </p>
                  <p class="mt-0.5 text-xs text-dim">
                    {{ isDone ? `You earned ${lesson.xp} XP for this.` : `Mark it complete for ${lesson.xp} XP.` }}
                  </p>
                </div>
                <div class="flex gap-2">
                  <button
                    type="button"
                    class="rounded-xl border border-ink-600 px-4 py-2.5 text-sm text-mist-50 transition hover:border-brand/40"
                    :disabled="isDone"
                    @click="complete"
                  >
                    {{ isDone ? 'Completed ✓' : 'Mark complete' }}
                  </button>
                  <button
                    v-if="next"
                    type="button"
                    class="rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
                    @click="go(next)"
                  >
                    Next lesson
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </article>

        <aside class="hidden w-64 shrink-0 border-l border-ink-600 p-5 xl:block" aria-label="Lesson contents">
          <div class="sticky top-6">
            <LearnLessonToc :blocks="lesson.content" :xp="lesson.xp" :duration="lesson.duration" />
          </div>
        </aside>
      </div>
    </div>
  </div>

  <div v-else class="mx-auto max-w-3xl px-4 py-24 text-center">
    <h1 class="text-2xl font-semibold text-mist-50">Lesson not found</h1>
    <NuxtLink to="/courses" class="mt-4 inline-block text-sm text-brand">Back to courses</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'learn' })

const route = useRoute()
const router = useRouter()

const course = computed(() => getCourse(String(route.params.course)))
const lesson = computed(() => {
  const slug = String(route.params.course)
  const id = String(route.params.lesson)
  return getLesson(slug, id)
})

const { isLessonComplete, completeLesson, visitLesson } = useLearningProgress()

useHead({ title: computed(() => lesson.value?.title ?? 'Lesson') })

const drawerOpen = ref(false)

const scrollContainer = ref<HTMLElement | null>(null)

const next = computed(() => (lesson.value ? nextLesson(lesson.value.id) : undefined))
const previous = computed(() => (lesson.value ? previousLesson(lesson.value.id) : undefined))
const isDone = computed(() => (lesson.value ? isLessonComplete(lesson.value.id) : false))

watch(
  [lesson, () => route.hash],
  async ([current, hash]) => {
    if (!current) return
    visitLesson(current.id)
    drawerOpen.value = false
    if (import.meta.client) {
      if (hash) {
        await nextTick()
        document.querySelector(hash)?.scrollIntoView({ block: 'start' })
      } else {
        window.scrollTo(0, 0)
        await nextTick()
        scrollContainer.value?.scrollTo({ top: 0 })
      }
    }
  },
  { immediate: true },
)

function go(target: { href: string }) {
  void router.push(target.href)
}

function complete() {
  if (lesson.value) completeLesson(lesson.value, course.value)
}
</script>