<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Entities</h1>
      <p class="mt-3 text-muted">
        {{ entities.length }} named and numeric character references. In CSS these matter inside
        content strings, selectors and url() values; in HTML you can also write them literally.
      </p>
    </header>

    <label class="sr-only" for="entity-search">Search entities</label>
    <input
      id="entity-search"
      v-model="search"
      type="search"
      placeholder="Search entities…"
      class="mt-8 w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <div class="mt-5 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="px-4 py-3 font-semibold">Entity</th>
            <th scope="col" class="w-20 px-4 py-3 font-semibold">Char</th>
            <th scope="col" class="w-32 px-4 py-3 font-semibold">Numeric</th>
            <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entity in filtered"
            :key="entity.name + entity.numeric"
            class="border-b border-ink-800 align-top last:border-0"
          >
            <td class="px-4 py-2.5 font-mono text-brand">{{ entity.name }}</td>
            <td class="px-4 py-2.5 font-mono text-mist-50">{{ entity.character }}</td>
            <td class="px-4 py-2.5 font-mono text-xs text-muted">{{ entity.numeric }}</td>
            <td class="px-4 py-2.5 text-mist-200">{{ entity.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="filtered.length === 0" class="mt-6 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>

    <section class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">Where they are actually needed</h2>
      <pre class="mt-3 overflow-x-auto rounded-2xl border border-ink-600 bg-ink-950 p-4 font-mono text-[12px] leading-5 text-mist-200"><code>.card::after {
  content: "\2192  read more";
}

a[title="Tips &amp; tricks"] {
  color: var(--brand);
}

@media (min-width: 40em) {
  .layout {
    grid-template-columns: repeat(2, 1fr);
  }
}</code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS entities' })

const entities = cssReferenceEntities()
const search = ref('')

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return entities
  return entities.filter((entity) =>
    `${entity.name} ${entity.numeric} ${entity.description}`.toLowerCase().includes(term),
  )
})
</script>