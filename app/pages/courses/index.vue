<template>
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Course catalog</h1>
      <p class="mt-3 text-muted">
        Every course is a sequence of short lessons, each ending in code you wrote, ran and passed.
        Filters are combinable — narrow by technology, difficulty or topic.
      </p>
    </header>

    <div class="mt-8 grid gap-6 lg:grid-cols-[260px_1fr] lg:items-start">
      <aside
        class="rounded-2xl border border-ink-600 bg-ink-900 p-4 lg:sticky lg:top-20"
        aria-label="Course filters"
      >
        <label class="block">
          <span class="sr-only">Search courses</span>
          <input
            v-model="search"
            type="search"
            placeholder="Search courses…"
            class="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>

        <fieldset class="mt-5">
          <legend class="text-[11px] font-semibold uppercase tracking-wider text-dim">Category</legend>
          <div class="mt-2 space-y-1.5">
            <label v-for="option in categoriesWithCounts" :key="option.value" class="flex items-center gap-2 text-sm">
              <input v-model="category" type="radio" :value="option.value" class="accent-brand" />
              <span class="text-mist-200">{{ option.label }}</span>
              <span class="ml-auto font-mono text-[11px] text-dim">{{ option.count }}</span>
            </label>
          </div>
        </fieldset>

        <fieldset class="mt-5">
          <legend class="text-[11px] font-semibold uppercase tracking-wider text-dim">Technology</legend>
          <div class="mt-2 space-y-1.5">
            <label v-for="tech in technologies" :key="tech" class="flex items-center gap-2 text-sm">
              <input v-model="technology" type="radio" :value="tech" class="accent-brand" />
              <span class="text-mist-200">{{ techLabel(tech) }}</span>
              <span class="ml-auto font-mono text-[11px] text-dim">
                {{ courses.filter((c) => c.technology === tech).length }}
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset class="mt-5">
          <legend class="text-[11px] font-semibold uppercase tracking-wider text-dim">Difficulty</legend>
          <div class="mt-2 space-y-1.5">
            <label v-for="level in difficulties" :key="level" class="flex items-center gap-2 text-sm">
              <input v-model="difficulty" type="radio" :value="level" class="accent-brand" />
              <span class="capitalize text-mist-200">{{ level }}</span>
            </label>
          </div>
        </fieldset>

        <fieldset class="mt-5">
          <legend class="text-[11px] font-semibold uppercase tracking-wider text-dim">Topic</legend>
          <div class="mt-2 flex flex-wrap gap-1.5">
            <button
              v-for="topic in topicOptions"
              :key="topic"
              type="button"
              class="rounded-full border px-2.5 py-1 text-xs transition"
              :class="
                topics.includes(topic)
                  ? 'border-brand/40 bg-brand/10 text-brand'
                  : 'border-ink-600 text-muted hover:text-mist-50'
              "
              :aria-pressed="topics.includes(topic)"
              @click="toggleTopic(topic)"
            >
              {{ topic }}
            </button>
          </div>
        </fieldset>

        <button
          type="button"
          class="mt-5 w-full rounded-lg border border-ink-600 px-3 py-2 text-xs text-muted transition hover:text-mist-50"
          @click="reset"
        >
          Reset filters
        </button>
      </aside>

      <div>
        <p class="flex items-center justify-between font-mono text-xs text-dim">
          <span>{{ filtered.length }} of {{ courses.length }} courses</span>
          <select
            v-model="sort"
            class="rounded-lg border border-ink-600 bg-ink-900 px-2 py-1.5 text-xs text-mist-200 outline-none"
            aria-label="Sort courses"
          >
            <option value="recommended">Recommended</option>
            <option value="shortest">Shortest first</option>
            <option value="longest">Longest first</option>
            <option value="progress">My progress</option>
          </select>
        </p>

        <div v-if="filtered.length" class="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <CourseCard v-for="course in filtered" :key="course.id" :course="course" />
        </div>
        <div v-else class="mt-5 rounded-2xl border border-dashed border-ink-600 p-10 text-center">
          <p class="text-mist-50">No courses match those filters.</p>
          <button type="button" class="mt-3 text-sm text-brand" @click="reset">Clear them</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CourseCategory, Difficulty } from '~/types/content'

const { courses } = useCourses()
const { courseProgressPercent } = useLearningProgress()

useHead({ title: 'Courses' })

const search = ref('')
const category = ref<'all' | CourseCategory>('all')
const technology = ref<'all' | string>('all')
const difficulty = ref<'all' | Difficulty>('all')
const topics = ref<string[]>([])
const sort = ref<'recommended' | 'shortest' | 'longest' | 'progress'>('recommended')

const categories: { value: 'all' | CourseCategory; label: string }[] = [
  { value: 'all', label: 'All categories' },
  { value: 'web', label: 'Web Development' },
  { value: 'programming', label: 'Programming' },
  { value: 'computer-science', label: 'Computer Science' },
  { value: 'tools', label: 'Tools' },
  { value: 'projects', label: 'Projects' },
]

const difficulties: ('all' | Difficulty)[] = ['all', 'beginner', 'intermediate', 'advanced']

const technologies = computed(() => [...new Set(courses.map((course) => course.technology))])

const topicOptions = computed(() => [...new Set(courses.flatMap((course) => course.topics))].sort())

const categoriesWithCounts = computed(() =>
  categories.map((option) => ({
    ...option,
    count:
      option.value === 'all'
        ? courses.length
        : courses.filter((course) => course.category === option.value).length,
  })),
)

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  const list = courses.filter((course) => {
    if (category.value !== 'all' && course.category !== category.value) return false
    if (technology.value !== 'all' && course.technology !== technology.value) return false
    if (difficulty.value !== 'all' && course.difficulty !== difficulty.value) return false
    if (topics.value.length && !topics.value.some((topic) => course.topics.includes(topic))) return false
    if (term) {
      const haystack = `${course.title} ${course.description} ${course.topics.join(' ')}`.toLowerCase()
      if (!haystack.includes(term)) return false
    }
    return true
  })

  const bySize = [...list]
  if (sort.value === 'shortest') bySize.sort((a, b) => courseStats(a).minutes - courseStats(b).minutes)
  if (sort.value === 'longest') bySize.sort((a, b) => courseStats(b).minutes - courseStats(a).minutes)
  if (sort.value === 'progress') bySize.sort((a, b) => courseProgressPercent(b) - courseProgressPercent(a))
  return bySize
})

function techLabel(tech: string) {
  const labels: Record<string, string> = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React',
    vue: 'Vue',
    nextjs: 'Next.js',
    node: 'Node.js',
    python: 'Python',
    sql: 'SQL',
    api: 'APIs',
    git: 'Git',
    linux: 'Linux',
    docker: 'Docker',
    dsa: 'Data Structures',
    uiux: 'UI/UX',
    a11y: 'Accessibility',
    other: 'Other',
  }
  return labels[tech] ?? tech
}

function toggleTopic(topic: string) {
  topics.value = topics.value.includes(topic)
    ? topics.value.filter((item) => item !== topic)
    : [...topics.value, topic]
}

function reset() {
  search.value = ''
  category.value = 'all'
  technology.value = 'all'
  difficulty.value = 'all'
  topics.value = []
  sort.value = 'recommended'
}
</script>