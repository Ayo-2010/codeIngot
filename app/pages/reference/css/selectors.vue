<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Selectors</h1>
      <p class="mt-3 text-muted">
        {{ all.length }} kinds of selector. Anything that only exists for :hover is unreachable by
        keyboard, so pair it with a focus or focus-visible state.
      </p>
    </header>

    <label class="sr-only" for="selector-search">Search selectors</label>
    <input
      id="selector-search"
      v-model="search"
      type="search"
      placeholder="Search selectors…"
      class="mt-8 w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <section v-for="group in filteredGroups" :key="group.kind" class="mt-8">
      <div class="flex items-baseline justify-between gap-3">
        <h2 class="text-sm font-semibold text-mist-50">{{ group.kind }}</h2>
        <span class="font-mono text-xs text-dim">{{ group.items.length }}</span>
      </div>
      <div class="mt-3 overflow-x-auto rounded-2xl border border-ink-600">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
              <th scope="col" class="w-1/4 px-4 py-3 font-semibold">Selector</th>
              <th scope="col" class="px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in group.items" :key="item.selector" class="border-b border-ink-800 align-top last:border-0">
              <td class="px-4 py-2.5 font-mono text-brand">{{ item.selector }}</td>
              <td class="px-4 py-2.5 text-mist-200">{{ item.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <p v-if="filteredGroups.length === 0" class="mt-6 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS selectors' })

const all = await cssReferenceSelectors()
const search = ref('')

/** Keeps the order of the data file, so a kind never moves because of a search. */
const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return all
  return all.filter((item) => `${item.selector} ${item.kind} ${item.description}`.toLowerCase().includes(term))
})

const filteredGroups = computed(() => {
  const seen = new Map<string, (typeof all)[number]>()
  for (const item of filtered.value) {
    if (!seen.has(item.kind)) seen.set(item.kind, item)
  }
  return [...seen.values()].map((item) => ({
    kind: item.kind,
    items: filtered.value.filter((entry) => entry.kind === item.kind),
  }))
})
</script>