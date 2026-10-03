<template>
  <div class="mx-auto max-w-5xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference" class="text-sm text-brand hover:underline">← Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">JavaScript</h1>
      <p class="mt-3 text-muted">
        {{ entries.length }} built-ins to start with. The full list from the source index — objects,
        the DOM and the browser APIs — is being added next.
      </p>
    </header>

    <input
      v-model="search"
      type="search"
      placeholder="Search…"
      aria-label="Search the JavaScript reference"
      class="mt-8 w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <div class="mt-4 grid gap-4 sm:grid-cols-2">
      <article
        v-for="entry in filtered"
        :id="entry.id"
        :key="entry.id"
        class="scroll-mt-20 rounded-2xl border border-ink-600 bg-ink-900 p-5"
      >
        <div class="flex items-center justify-between gap-3">
          <h2 class="font-mono text-base text-brand">{{ entry.name }}</h2>
          <TagPill :value="entry.group" tone="warn" />
        </div>
        <p class="mt-2 text-sm leading-relaxed text-mist-200">{{ entry.summary }}</p>
        <pre class="mt-3 overflow-x-auto rounded-lg border border-ink-600 bg-ink-950 p-3 font-mono text-[12px] leading-5 text-mist-200"><code>{{ entry.syntax }}</code></pre>
        <ul class="mt-3 space-y-1.5">
          <li v-for="detail in entry.details" :key="detail" class="flex gap-2 text-xs leading-relaxed text-muted">
            <span class="text-brand" aria-hidden="true">▸</span>
            {{ detail }}
          </li>
        </ul>
        <pre
          v-if="entry.example"
          class="mt-3 overflow-x-auto rounded-lg border border-ink-600 bg-ink-950 p-3 font-mono text-[12px] leading-5 text-mist-200"
        ><code>{{ entry.example.code }}</code></pre>
      </article>
    </div>

    <p v-if="filtered.length === 0" class="mt-6 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'JavaScript reference' })

const entries = allReferenceEntries().filter((entry) => entry.group === 'javascript')
const search = ref('')

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return entries
  return entries.filter((entry) =>
    `${entry.name} ${entry.summary} ${entry.syntax}`.toLowerCase().includes(term),
  )
})
</script>