<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Units</h1>
      <p class="mt-3 text-muted">
        {{ all.length }} units. Prefer rem for font size and em inside a component, so the page still
        scales when the reader changes their text size.
      </p>
    </header>

    <label class="sr-only" for="unit-search">Search units</label>
    <input
      id="unit-search"
      v-model="search"
      type="search"
      placeholder="Search units…"
      class="mt-8 w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <section v-for="group in groups" :key="group.kind" class="mt-8">
      <div class="flex items-baseline justify-between gap-3">
        <h2 class="text-sm font-semibold text-mist-50">{{ group.kind }}</h2>
        <span class="font-mono text-xs text-dim">{{ group.items.length }}</span>
      </div>
      <div class="mt-3 overflow-x-auto rounded-2xl border border-ink-600">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
              <th scope="col" class="w-32 px-4 py-3 font-semibold">Unit</th>
              <th scope="col" class="px-4 py-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="unit in group.items" :key="unit.unit" class="border-b border-ink-800 align-top last:border-0">
              <td class="px-4 py-2.5 font-mono text-brand">{{ unit.unit }}</td>
              <td class="px-4 py-2.5 text-mist-200">{{ unit.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <p v-if="groups.length === 0" class="mt-6 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS units' })

const all = await cssReferenceUnits()
const search = ref('')

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return all
  return all.filter((unit) => `${unit.unit} ${unit.kind} ${unit.description}`.toLowerCase().includes(term))
})

const groups = computed(() => {
  const seen = new Map<string, (typeof all)[number]>()
  for (const unit of filtered.value) {
    if (!seen.has(unit.kind)) seen.set(unit.kind, unit)
  }
  return [...seen.values()].map((unit) => ({
    kind: unit.kind,
    items: filtered.value.filter((entry) => entry.kind === unit.kind),
  }))
})
</script>