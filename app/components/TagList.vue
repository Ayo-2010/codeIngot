<template>
  <div>
    <input
      v-model="term"
      type="search"
      placeholder="Search tags…"
      aria-label="Search tags"
      class="w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <p class="mt-3 font-mono text-xs text-dim">
      {{ filtered.length }} of {{ tags.length }} elements
    </p>

    <!-- By alphabet -->
    <div v-if="order === 'alphabet'" class="mt-6 space-y-10">
      <section v-for="letter in letters" :key="letter.letter">
        <h2 class="sticky top-16 z-10 mb-3 w-fit bg-ink-950/90 px-2 py-1 font-mono text-sm text-brand backdrop-blur">
          {{ letter.letter }}
        </h2>
        <TagTable :tags="letter.tags" />
      </section>
    </div>

    <!-- By category -->
    <div v-else class="mt-6 space-y-10">
      <section v-for="group in grouped" :key="group.category">
        <h2 class="mb-3 flex items-baseline gap-3 text-lg font-semibold text-mist-50">
          {{ group.category }}
          <span class="font-mono text-xs font-normal text-dim">{{ group.tags.length }}</span>
        </h2>
        <TagTable :tags="group.tags" />
      </section>
    </div>

    <p
      v-if="filtered.length === 0"
      class="mt-8 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted"
    >
      Nothing matches “{{ term }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { HtmlTag } from '~/types/content'

const props = defineProps<{ order: 'alphabet' | 'category' }>()

const term = ref('')
const tags = htmlReferenceTags()
const categories = htmlReferenceCategories()

const filtered = computed(() => {
  const needle = term.value.trim().toLowerCase()
  if (!needle) return tags
  return tags.filter((tag) =>
    `${tag.tag} ${tag.description} ${tag.category}`.toLowerCase().includes(needle),
  )
})

const letters = computed(() => {
  const buckets = new Map<string, HtmlTag[]>()
  for (const tag of filtered.value) {
    // Comments and the doctype sort under their punctuation, not a letter.
    const letter = /[a-z]/.test(tag.tag) ? (tag.tag.match(/[a-z]/) as RegExpMatchArray)[0] : '#'
    if (!buckets.has(letter)) buckets.set(letter, [])
    buckets.get(letter)!.push(tag)
  }
  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, group]) => ({ letter: letter === '#' ? 'Other' : letter.toUpperCase(), tags: group }))
})

const grouped = computed(() =>
  categories
    .map((category) => ({ category, tags: filtered.value.filter((tag) => tag.category === category) }))
    .filter((group) => group.tags.length > 0),
)
</script>
