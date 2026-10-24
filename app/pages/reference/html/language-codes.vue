<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Language Codes</h1>
      <p class="mt-3 text-muted">
        {{ codes.length }} values for the <code class="font-mono text-brand">lang</code> attribute. Use the
        two-letter code on the html element, then add a region subtag only when the spelling or the
        vocabulary genuinely differs.
      </p>
    </header>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">Declaring it</h2>
      <figure class="mt-3 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
        <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6 text-mist-200"><code>{{ example }}</code></pre>
      </figure>
      <p class="mt-2 text-sm text-muted">
        Marking a passage in another language is what makes a screen reader switch voices, and it lets a
        browser offer translation for that part only.
      </p>
    </section>

    <div class="mt-8">
      <input
        v-model="search"
        type="search"
        placeholder="Search languagesâ€¦"
        aria-label="Search language codes"
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
        <span class="min-w-0 truncate text-sm text-mist-200">{{ row.language }}</span>
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
usePageSeo({
  title: 'HTML language codes',
  description:
    'Values for the HTML lang attribute: start with the two-letter code and add a region subtag only when spelling or vocabulary genuinely differs.',
})

const codes = await htmlReferenceLanguageCodes()
const search = ref('')

const term = computed(() => search.value.trim().toLowerCase())
const filtered = computed(() =>
  term.value ? codes.filter((row) => `${row.code} ${row.language}`.toLowerCase().includes(term.value)) : codes,
)

const example = `<html lang="en-GB">
  <body>
    <p>Colour names are spelled differently in English variants.</p>
    <p lang="fr">La couleur est une notion qui varie.</p>
  </body>
</html>`
</script>
