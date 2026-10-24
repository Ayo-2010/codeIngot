<template>
  <div v-if="lesson && course" class="flex h-full overflow-hidden">
    <aside
      class="hidden w-72 shrink-0 border-r border-ink-600 bg-ink-900 lg:block"
      aria-label="Course navigation"
    >
      <LearnCourseSidebar
        :course="course"
        :current-lesson-id="lesson.id"
      />
    </aside>

    <div
      v-if="drawerOpen"
      id="course-drawer"
      class="fixed inset-x-0 bottom-0 top-16 z-40 lg:hidden"
    >
      <div class="absolute inset-0 bg-ink-950/80" @click="closeDrawer()" />
      <div
        ref="drawerEl"
        role="dialog"
        aria-modal="true"
        aria-label="Course navigation"
        class="absolute bottom-0 left-0 top-14 w-[86vw] max-w-sm overflow-hidden border-r border-ink-600 bg-ink-900"
      >
        <LearnCourseSidebar
          :course="course"
          :current-lesson-id="lesson.id"
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
          @toggle="drawerOpen ? closeDrawer() : openDrawer()"
        />
        <p class="truncate font-mono text-[11px] uppercase tracking-wider text-dim">
          {{ course.shortTitle }} · {{ lesson.sectionTitle }}
        </p>
        <div class="ml-auto flex shrink-0 items-center gap-2">
          <button
            v-if="previous"
            type="button"
            class="rounded-lg border border-ink-600 px-2.5 py-1.5 text-xs text-muted transition hover:text-mist-50"
            @click="go(previous)"
          >
            ← Previous
          </button>
          <NuxtLink
            :to="`/learn/${course.slug}/quiz/${lesson.quiz.id}`"
            class="rounded-lg border border-brand/40 px-2.5 py-1.5 text-xs text-brand transition hover:bg-brand/10"
            :aria-label="`Take the quiz for ${lesson.title}`"
          >
            ★ Quiz
          </NuxtLink>
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

      <div ref="scrollContainer" data-testid="lesson-scroll" class="flex min-h-0 flex-1 overflow-y-auto">
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
              :blocks="lessonContent ?? []"
              :course-slug="course.slug"
              :lesson-id="lesson.id"
            />

            <footer class="mt-12 border-t border-ink-600 pt-6">
              <div v-if="!isDone" class="mb-5">
                <div class="h-1 overflow-hidden rounded-full bg-ink-700">
                  <div
                    class="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
                    :style="{ width: `${Math.round(autoProgress * 100)}%` }"
                  />
                </div>
                <p class="mt-2 text-xs text-dim">{{ autoHint }}</p>
              </div>

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
            <LearnLessonToc :blocks="lessonContent ?? []" :xp="lesson.xp" :duration="lesson.duration" />
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

import { loadLesson, nextLesson, previousLesson } from '~/composables/useCourses'
import { scrollBlockIntoView } from '~/utils/scroll-to-block'

const route = useRoute()
const router = useRouter()

const course = computed(() => getCourse(String(route.params.course)))
const lesson = computed(() => {
  const slug = String(route.params.course)
  const id = String(route.params.lesson)
  return getLesson(slug, id)
})

const { isLessonComplete, isExerciseComplete, completeLesson, visitLesson } = useLearningProgress()

usePageSeo({
  title: computed(() => lesson.value?.title ?? 'Lesson'),
  description: computed(
    () =>
      lesson.value?.description ??
      'A short guided lesson with a live example, an exercise and its own quiz.',
  ),
  type: 'article',
})

const drawerOpen = ref(false)
const drawerEl = ref<HTMLElement | null>(null)

/**
 * The drawer covers the lesson at narrow widths, so it behaves like a modal:
 * focus moves in on open, Tab stays inside, Escape closes it, and focus returns
 * to the button that opened it. Route changes also close it, but must not steal
 * focus from the lesson that just loaded.
 */
let restoreFocusOnClose = true

function drawerFocusables(): HTMLElement[] {
  const selector =
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  return Array.from(drawerEl.value?.querySelectorAll<HTMLElement>(selector) ?? [])
}

function drawerTrigger(): HTMLElement | null {
  return document.querySelector<HTMLElement>('button[aria-controls="course-drawer"]')
}

function openDrawer() {
  restoreFocusOnClose = true
  drawerOpen.value = true
}

function closeDrawer(restoreFocus = true) {
  restoreFocusOnClose = restoreFocus
  drawerOpen.value = false
}

watch(drawerOpen, async (open) => {
  if (!import.meta.client) return
  await nextTick()
  if (open) {
    drawerFocusables()[0]?.focus()
    return
  }
  if (restoreFocusOnClose) drawerTrigger()?.focus()
  restoreFocusOnClose = true
})

function onDrawerKeydown(event: KeyboardEvent) {
  if (!drawerOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeDrawer()
    return
  }
  if (event.key !== 'Tab') return

  const items = drawerFocusables()
  if (!items.length) return
  const first = items[0]!
  const last = items[items.length - 1]!
  const current = document.activeElement
  const inside = current instanceof Node && drawerEl.value?.contains(current)

  if (!inside) {
    event.preventDefault()
    const target = event.shiftKey ? last : first
    target.focus()
  } else if (event.shiftKey && current === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && current === last) {
    event.preventDefault()
    first.focus()
  }
}

onMounted(() => document.addEventListener('keydown', onDrawerKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onDrawerKeydown))

const scrollContainer = ref<HTMLElement | null>(null)

/**
 * The lesson body loads with the course module, which is
 * why the catalogue can stay small while every lesson still
 * renders its examples and exercises. useAsyncData rather
 * than a watch, so the server-rendered and generated pages
 * carry the content instead of an empty article.
 */
const { data: lessonContent } = await useAsyncData(
  () => `lesson-content-${lesson.value?.id ?? 'none'}`,
  async () => {
    const current = lesson.value
    if (!current) return []
    const loaded = await loadLesson(current.courseSlug, current.id)
    return loaded?.content ?? []
  },
)

const next = computed(() =>
  lesson.value ? nextLesson(lesson.value.id) : undefined,
)
const previous = computed(() => (lesson.value ? previousLesson(lesson.value.id) : undefined))
const isDone = computed(() => (lesson.value ? isLessonComplete(lesson.value.id) : false))

/**
 * Reading a lesson counts as completing it only when the lesson has
 * nothing to do: a lesson with exercises asks for them first, so
 * scrolling alone cannot bank the XP.
 */
const outstandingExercises = computed(
  () =>
    (lessonContent.value ?? []).filter(
      (block) => block.type === 'exercise' && !isExerciseComplete(block.exercise.id),
    ).length,
)

const {
  progress: autoProgress,
  reachedEnd: hasReachedEnd,
  remainingMs: autoRemainingMs,
  isPaused: autoPaused,
} = useLessonAutoComplete({
  lessonId: computed(() => lesson.value?.id ?? ''),
  container: scrollContainer,
  enabled: computed(
    () => Boolean(lesson.value) && !isDone.value && outstandingExercises.value === 0,
  ),
  onComplete: () => complete(),
})

const autoHint = computed(() => {
  if (autoPaused.value) {
    return 'Paused while this tab is in the background. The timer picks up where it left off.'
  }
  if (outstandingExercises.value > 0) {
    return 'Pass every exercise in this lesson to finish it; reading alone is not enough here.'
  }
  const outstanding: string[] = []
  if (!hasReachedEnd.value) outstanding.push('scroll to the end')
  if (autoRemainingMs.value > 0) outstanding.push(`read for another ${formatRemaining(autoRemainingMs.value)}`)
  if (!outstanding.length) return 'Marking this lesson complete.'
  return `This lesson completes itself once you ${outstanding.join(' and ')}.`
})

/**
 * A block id from the URL hash that has not been scrolled to yet. Lesson bodies
 * load asynchronously, so a deep link can arrive before its target block
 * exists; the id is held here and retried once the content is in.
 */
const pendingHash = ref('')

watch(
  [lesson, () => route.hash],
  ([current, hash]) => {
    if (!current) return
    visitLesson(current.id)
    if (drawerOpen.value) closeDrawer(false)
    pendingHash.value = hash ? decodeURIComponent(hash.replace(/^#/, '')) : ''
    void applyScroll()
  },
  { immediate: true },
)

// The body arrives after the route changes, so a deep link asks again here.
watch(lessonContent, () => {
  void applyScroll()
})

/**
 * Puts the reading container where the navigation asked. The document is reset
 * on every pass: the shell is fixed to the viewport, so any document scroll —
 * from a native fragment jump, or a browser revealing a focused control — would
 * slide the lesson out of view with nothing to scroll it back.
 */
async function applyScroll() {
  if (!import.meta.client) return
  await nextTick()
  window.scrollTo({ top: 0, behavior: 'auto' })
  if (pendingHash.value) {
    // `smooth: false` matches a native fragment jump: a deep link arrives
    // already in place rather than animating down the page.
    if (scrollBlockIntoView(pendingHash.value, { container: scrollContainer.value, smooth: false })) {
      pendingHash.value = ''
    }
    return
  }
  scrollContainer.value?.scrollTo({ top: 0 })
}

function go(target: { href: string }) {
  void router.push(target.href)
}

function complete() {
  if (lesson.value) completeLesson(lesson.value, course.value)
}
</script>