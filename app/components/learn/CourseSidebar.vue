<template>
  <nav class="flex h-full min-h-0 flex-col" aria-label="Course contents">
    <div class="border-b border-ink-600 px-4 py-3">
      <NuxtLink :to="`/courses/${course.slug}`" class="text-xs text-dim hover:text-brand">
        ← {{ course.title }}
      </NuxtLink>
      <ProgressBar class="mt-2" :value="percent" :label="`${course.title} progress`" />
      <p class="mt-1.5 font-mono text-[11px] text-dim">{{ percent }}% · {{ completedCount }}/{{ total }} lessons</p>
    </div>

    <ol ref="listEl" data-testid="course-sidebar-list" class="min-h-0 flex-1 overflow-y-auto py-2">
      <li v-for="(chapter, chapterIndex) in chapters" :key="chapter.id">
        <p class="px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-dim">
          {{ String(chapterIndex + 1).padStart(2, '0') }} · {{ chapter.title }}
        </p>
        <ul>
          <template v-for="section in chapter.sections" :key="section.id">
            <li v-for="(lesson, index) in section.lessons" :key="lesson.id">
              <div class="flex items-stretch">
                <NuxtLink
                  :to="`/learn/${course.slug}/${lesson.id}`"
                  class="flex min-w-0 flex-1 items-start gap-2.5 border-l-2 px-4 py-2 text-sm transition"
                  :class="
                    lesson.id === currentLessonId
                      ? 'border-brand bg-brand/8 text-mist-50'
                      : 'border-transparent text-muted hover:bg-ink-800 hover:text-mist-50'
                  "
                  :aria-current="lesson.id === currentLessonId ? 'page' : undefined"
                >
                  <span
                    class="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border text-[9px]"
                    :class="done(lesson.id) ? 'border-ok/40 bg-ok/10 text-ok' : 'border-ink-500 text-dim'"
                    aria-hidden="true"
                  >
                    {{ done(lesson.id) ? '✓' : index + 1 }}
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block">{{ lesson.title }}</span>
                  </span>
                </NuxtLink>
                <!-- Every lesson row carries its own quiz. -->
                <NuxtLink
                  :to="`/learn/${course.slug}/quiz/${lesson.quiz.id}`"
                  class="flex shrink-0 items-center border-l-2 border-transparent pr-3 text-xs transition"
                  :class="lesson.quiz.id === currentQuizId ? 'text-brand' : 'text-dim hover:text-brand'"
                  :aria-label="`Take the quiz for ${lesson.title}`"
                  :title="lesson.quiz.title"
                >
                  <span aria-hidden="true">★</span>
                </NuxtLink>
              </div>
            </li>
          </template>
        </ul>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { CourseMeta } from '~/types/content'

const props = defineProps<{
  course: CourseMeta
  currentLessonId: string
  currentQuizId?: string
}>()

const { progress, courseProgressPercent } = useLearningProgress()

const chapters = computed(() => courseChapters(props.course))

const listEl = ref<HTMLElement | null>(null)

/**
 * Keep the active lesson visible in the sidebar. The list is a scroll container
 * of its own, so a reload starts it at the top and a learner partway through a
 * course would not see where they are. This centres the current lesson, and does
 * nothing when it is already in view.
 */
function revealActive() {
  if (!import.meta.client) return
  const list = listEl.value
  const active = list?.querySelector<HTMLElement>('[aria-current="page"]')
  if (!list || !active) return
  const listRect = list.getBoundingClientRect()
  const activeRect = active.getBoundingClientRect()
  if (activeRect.top >= listRect.top && activeRect.bottom <= listRect.bottom) return
  list.scrollTop += activeRect.top - listRect.top - (list.clientHeight - activeRect.height) / 2
}

onMounted(() => {
  void nextTick(revealActive)
})

// The sidebar stays mounted as lessons change, so the route change has to ask.
watch(
  () => props.currentLessonId,
  () => {
    void nextTick(revealActive)
  },
)

const lessons = computed(() =>
  props.course.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({ id: lesson.id })),
  ),
)
const total = computed(() => lessons.value.length)
const completedCount = computed(
  () => lessons.value.filter((lesson) => progress.value.completedLessons.includes(lesson.id)).length,
)
const percent = computed(() => courseProgressPercent(props.course))

function done(lessonId: string) {
  return progress.value.completedLessons.includes(lessonId)
}
</script>