<template>
  <nav class="flex h-full min-h-0 flex-col" aria-label="Course contents">
    <div class="border-b border-ink-600 px-4 py-3">
      <NuxtLink :to="`/courses/${course.slug}`" class="text-xs text-dim hover:text-brand">
        ← {{ course.title }}
      </NuxtLink>
      <ProgressBar class="mt-2" :value="percent" :label="`${course.title} progress`" />
      <p class="mt-1.5 font-mono text-[11px] text-dim">{{ percent }}% · {{ completedCount }}/{{ total }} lessons</p>
    </div>

    <ol class="min-h-0 flex-1 overflow-y-auto py-2">
      <li v-for="(section, sectionIndex) in course.sections" :key="section.id">
        <p class="px-4 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-dim">
          {{ String(sectionIndex + 1).padStart(2, '0') }} · {{ section.title }}
        </p>
        <ul>
          <li v-for="(lesson, index) in section.lessons" :key="lesson.id">
            <NuxtLink
              :to="`/learn/${course.slug}/${lesson.id}`"
              class="flex items-start gap-2.5 border-l-2 px-4 py-2 text-sm transition"
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
          </li>
        </ul>
        <NuxtLink
          v-if="section.quiz"
          :to="`/learn/${course.slug}/quiz/${section.quiz.id}`"
          class="flex items-center gap-2.5 px-4 py-2 text-sm text-muted transition hover:text-mist-50"
          :class="section.quiz.id === currentQuizId ? 'text-mist-50 bg-brand/10 border-l-2 border-brand' : ''"
        >
          <span class="text-brand" aria-hidden="true">★</span>
          {{ section.quiz.title }}
        </NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { CourseMeta, CourseSectionMeta } from '~/types/content'

const props = defineProps<{
  course: CourseMeta
  currentLessonId: string
  currentQuizId?: string
}>()

const { progress, courseProgressPercent } = useLearningProgress()

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

function sectionLink(section: CourseSectionMeta): string {
  const last = section.lessons[section.lessons.length - 1]
  return `/learn/${props.course.slug}/${last?.id ?? ''}`
}
</script>