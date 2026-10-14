<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Country Codes</h1>
      <p class="mt-3 text-muted">
        {{ codes.length }} region subtags for the <code class="font-mono text-brand">lang</code> attribute.
        Choose by the spelling and vocabulary a reader expects, not by where the content was written: a
        Dublin publisher writing in British English is still <code class="font-mono text-brand">en-GB</code>.
      </p>
    </header>

    <div class="mt-8">
      <input
        v-model="search"
        type="search"
        placeholder="Search countriesâ€¦"
        aria-label="Search country codes"
        class="w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
      />
    </div>

    <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="row in filtered"
        :key="row.code"
        class="flex items-center justify-between gap-3 rounded-xl border border-ink-600 bg-ink-900 p-3"
      >
        <span class="font-mono text-sm text-brand">{{ row.code }}</span>
        <span class="min-w-0 truncate text-sm text-mist-200">{{ row.country }}</span>
      </div>
    </div>

    <p
      v-if="filtered.length === 0"
      class="mt-8 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted"
    >
      Nothing matches â€œ{{ search }}â€.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTML country codes' })

const codes = await htmlReferenceCountryCodes()
const search = ref('')

const term = computed(() => search.value.trim().toLowerCase())
const filtered = computed(() =>
  term.value ? codes.filter((row) => `${row.code} ${row.country}`.toLowerCase().includes(term.value)) : codes,
)
</script>
