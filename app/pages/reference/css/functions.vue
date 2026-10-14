<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Functions</h1>
      <p class="mt-3 text-muted">
        {{ functions.length }} functions across maths, colour, gradients, filters and transforms. Any
        function can be nested inside another, so most of these compose.
      </p>
    </header>

    <label class="sr-only" for="function-search">Search functions</label>
    <input
      id="function-search"
      v-model="search"
      type="search"
      placeholder="Search functions…"
      class="mt-8 w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <p class="mt-3 font-mono text-xs text-dim">{{ filtered.length }} of {{ functions.length }} functions</p>

    <div class="mt-5 grid gap-4 md:grid-cols-2">
      <article
        v-for="entry in filtered"
        :key="entry.name"
        class="rounded-2xl border border-ink-600 bg-ink-900 p-5"
      >
        <h2 class="font-mono text-base text-brand">{{ entry.name }}</h2>
        <p class="mt-1 font-mono text-xs text-dim">{{ entry.signature }}</p>
        <p class="mt-3 text-sm leading-relaxed text-mist-200">{{ entry.description }}</p>
        <pre class="mt-3 overflow-x-auto rounded-lg border border-ink-600 bg-ink-950 p-3 font-mono text-[12px] leading-5 text-mist-200"><code>{{ entry.example }}</code></pre>
      </article>
    </div>

    <p v-if="filtered.length === 0" class="mt-6 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS functions' })

const functions = await cssReferenceFunctions()
const search = ref('')

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return functions
  return functions.filter((entry) => `${entry.name} ${entry.signature} ${entry.description}`.toLowerCase().includes(term))
})
</script>