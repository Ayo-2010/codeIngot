<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[10vh] sm:pt-[14vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search codeIngot"
    >
      <div
        class="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
        @click="closePalette()"
      />
      <div
        class="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/60"
      >
        <div class="flex items-center gap-3 border-b border-ink-600 px-4">
          <svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0 text-dim" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" stroke-linecap="round" />
          </svg>
          <input
            ref="inputEl"
            v-model="query"
            type="search"
            role="combobox"
            aria-controls="palette-results"
            :aria-expanded="results.length > 0"
            aria-autocomplete="list"
            placeholder="Search lessons, challenges, reference…"
            class="h-14 w-full bg-transparent text-[15px] text-mist-50 outline-none placeholder:text-dim"
            @keydown.down.prevent="move(1)"
            @keydown.up.prevent="move(-1)"
            @keydown.enter.prevent="go()"
            @keydown.esc="closePalette()"
          />
          <button
            type="button"
            class="rounded-md px-2 py-1 text-xs text-dim hover:text-mist-50"
            aria-label="Close search"
            @click="closePalette()"
          >
            Esc
          </button>
        </div>

        <div id="palette-results" class="max-h-[55vh] overflow-y-auto p-2" role="listbox">
          <p v-if="!query" class="px-3 py-6 text-center text-sm text-dim">
            Search across lessons, courses, challenges, projects and the reference.
          </p>
          <p v-else-if="results.length === 0" class="px-3 py-6 text-center text-sm text-dim">
            Nothing matched “{{ query }}”.
          </p>
          <template v-else>
            <div v-for="group in grouped" :key="group.label" class="mb-2">
              <p class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-dim">
                {{ group.label }}
              </p>
              <button
                v-for="(item, index) in group.items"
                :key="item.id"
                type="button"
                role="option"
                :aria-selected="index === flatIndex(item)"
                class="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm"
                :class="index === flatIndex(item) ? 'bg-brand/12 text-mist-50' : 'text-mist-200 hover:bg-ink-800'"
                @click="navigate(item.to)"
              >
                <span class="min-w-0">
                  <span class="block truncate">{{ item.title }}</span>
                  <span class="block truncate text-xs text-dim">{{ item.hint }}</span>
                </span>
                <span class="shrink-0 rounded border border-ink-600 px-1.5 py-0.5 text-[10px] text-dim">
                  {{ item.kind }}
                </span>
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface PaletteItem {
  id: string
  kind: string
  title: string
  hint: string
  to: string
  haystack: string
}

const { open, closePalette } = useCommandPalette()
const router = useRouter()
const query = ref('')
const selected = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)

const items = computed<PaletteItem[]>(() => {
  const lessons = allLessonFlat().map((lesson) => ({
    id: `lesson-${lesson.id}`,
    kind: 'Lesson',
    title: lesson.title,
    hint: `${lesson.courseTitle} · ${lesson.sectionTitle}`,
    to: lesson.href,
    haystack: `${lesson.title} ${lesson.courseTitle} ${lesson.sectionTitle}`.toLowerCase(),
  }))
  const courses = allCoursesList().map((course) => ({
    id: `course-${course.id}`,
    kind: 'Course',
    title: course.title,
    hint: course.description,
    to: `/courses/${course.slug}`,
    haystack: `${course.title} ${course.description} ${course.topics.join(' ')}`.toLowerCase(),
  }))
  const challenges = allChallenges().map((challenge) => ({
    id: `challenge-${challenge.id}`,
    kind: 'Challenge',
    title: challenge.title,
    hint: challenge.summary,
    to: `/challenges/${challenge.slug}`,
    haystack: `${challenge.title} ${challenge.summary} ${challenge.practices.join(' ')}`.toLowerCase(),
  }))
  const projects = allProjectsList().map((project) => ({
    id: `project-${project.id}`,
    kind: 'Project',
    title: project.title,
    hint: project.tagline,
    to: `/projects/${project.slug}`,
    haystack: `${project.title} ${project.tagline} ${project.summary}`.toLowerCase(),
  }))
  // The reference is split into a subpage per language, so a deep link has to
  // carry the group or it lands on the index with no matching anchor. The
  // corpora themselves are the reference: tag, property and member pages are
  // reachable from each language's own index, so the palette lists the
  // language indexes rather than dead anchors into them.
  const reference = referenceLanguages.map((language) => ({
    id: `ref-${language.value}`,
    kind: 'Reference',
    title: `${language.label} reference`,
    hint: language.blurb,
    to: language.to,
    haystack: `${language.label} reference`.toLowerCase(),
  }))
  const pages = [
    { to: '/dashboard', title: 'Dashboard', hint: 'What to do next' },
    { to: '/progress', title: 'Your Progress', hint: 'Everything you have finished' },
    { to: '/achievements', title: 'Achievements', hint: 'Badges you have unlocked' },
    { to: '/playground', title: 'Playground', hint: 'Free experimentation' },
  ].map((page) => ({
    id: `page-${page.to}`,
    kind: 'Page',
    title: page.title,
    hint: page.hint,
    to: page.to,
    haystack: `${page.title} ${page.hint}`.toLowerCase(),
  }))

  return [...lessons, ...courses, ...challenges, ...projects, ...reference, ...pages]
})

const results = computed(() => {
  const term = query.value.trim().toLowerCase()
  if (!term) return []
  const terms = term.split(/\s+/)
  return items.value
    .map((item) => {
      let score = 0
      for (const part of terms) {
        if (!item.haystack.includes(part)) return { item, score: -1 }
        score += item.title.toLowerCase().includes(part) ? 10 : 1
      }
      return { item, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)
    .map((entry) => entry.item)
})

const grouped = computed(() => {
  const order = ['Page', 'Lesson', 'Course', 'Challenge', 'Project', 'Reference']
  const groups: { label: string; items: PaletteItem[] }[] = []
  for (const label of order) {
    const items = results.value.filter((item) => item.kind === label)
    if (items.length) groups.push({ label, items })
  }
  return groups
})

const flat = computed(() => grouped.value.flatMap((group) => group.items))

function flatIndex(item: PaletteItem): number {
  return flat.value.findIndex((entry) => entry.id === item.id)
}

function move(delta: number) {
  if (flat.value.length === 0) return
  selected.value = (selected.value + delta + flat.value.length) % flat.value.length
}

function go() {
  const target = flat.value[selected.value]
  if (target) navigate(target.to)
}

function navigate(to: string) {
  closePalette()
  query.value = ''
  selected.value = 0
  void router.push(to)
}

watch(open, async (value) => {
  if (value) {
    selected.value = 0
    await nextTick()
    inputEl.value?.focus()
  }
})

watch(query, () => {
  selected.value = 0
})

onMounted(() => {
  const handler = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault()
      open.value ? closePalette() : (open.value = true)
    }
    if (event.key === 'Escape' && open.value) closePalette()
  }
  window.addEventListener('keydown', handler)
  onBeforeUnmount(() => window.removeEventListener('keydown', handler))
})
</script>