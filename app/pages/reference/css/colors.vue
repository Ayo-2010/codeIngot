<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Colors</h1>
      <p class="mt-3 text-muted">
        {{ colors.length }} named colours. The keyword names are case-insensitive, and the four-digit
        hex form means transparent black rather than a named colour.
      </p>
    </header>

    <label class="sr-only" for="color-search">Search colours</label>
    <input
      id="color-search"
      v-model="search"
      type="search"
      placeholder="Search colours…"
      class="mt-8 w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <p class="mt-3 font-mono text-xs text-dim">{{ filtered.length }} of {{ colors.length }} colours</p>

    <div class="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="color in filtered"
        :key="color.name"
        class="flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-900 px-3 py-2.5"
      >
        <span
          class="h-9 w-9 shrink-0 rounded-lg border border-ink-600"
          :class="color.name === 'currentColor' ? 'bg-brand' : ''"
          :style="color.name === 'currentColor' ? undefined : { background: color.hex }"
          aria-hidden="true"
        />
        <div class="min-w-0">
          <p class="truncate font-mono text-sm text-mist-50">{{ color.name }}</p>
          <p class="font-mono text-xs text-dim">{{ color.hex }}</p>
        </div>
      </article>
    </div>

    <p v-if="filtered.length === 0" class="mt-6 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'CSS colors',
  description:
    'All named CSS colour keywords with their hex values, plus the case rules and the four-digit hex form that means transparent black.',
})

const colors = await cssReferenceColorNames()
const search = ref('')

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return colors
  return colors.filter((color) => `${color.name} ${color.hex}`.toLowerCase().includes(term))
})
</script>