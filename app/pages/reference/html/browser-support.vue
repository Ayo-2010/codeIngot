<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Browser Support</h1>
      <p class="mt-3 text-muted">
        The first version of each browser with usable support for every element. Elements that were
        removed rather than replaced show as not supported, which is the point of keeping them listed.
      </p>
    </header>

    <div class="mt-8">
      <input
        v-model="search"
        type="search"
        placeholder="Search elementsâ€¦"
        aria-label="Search elements"
        class="w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
      />
    </div>

    <div class="mt-6 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="px-4 py-3 font-semibold">Element</th>
            <th
              v-for="browser in browsers"
              :key="browser"
              scope="col"
              class="px-4 py-3 font-semibold"
            >
              {{ browser }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in filtered"
            :key="row.tag"
            class="border-b border-ink-800 align-top last:border-0"
          >
            <th scope="row" class="px-4 py-2.5 font-medium">
              <NuxtLink :to="`/reference/html/tag/${tagSlug(row.tag)}`" class="font-mono text-brand hover:underline">
                {{ row.tag }}
              </NuxtLink>
              <DeprecationNote v-if="row.deprecated" :note="row.deprecated" />
            </th>
            <td
              v-for="browser in browsers"
              :key="browser"
              class="px-4 py-2.5 font-mono text-xs"
              :class="row.support[browser] === 'No' ? 'text-warn' : 'text-mist-200'"
            >
              {{ row.support[browser] === 'No' ? 'No' : row.support[browser] }}
            </td>
          </tr>
        </tbody>
      </table>
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
import { tagSlug } from '~/content/reference/html-tag-pages'

definePageMeta({ layout: 'reference' })
useHead({ title: 'HTML browser support' })

const [pages, tags] = await Promise.all([
  htmlReferenceTagPages(),
  htmlReferenceTags(),
])
const search = ref('')

const browsers = ['Chrome', 'Edge', 'Firefox', 'Safari'] as const

// Every page carries all four browsers, so reshape into one row per element.
const rows = pages.map((page) => ({
  tag: page.tag,
  deprecated: tags.find((tag) => tag.tag === page.tag)?.deprecated,
  support: Object.fromEntries(page.support.map((entry) => [entry.browser, entry.version])),
}))

const term = computed(() => search.value.trim().toLowerCase())
const filtered = computed(() =>
  term.value ? rows.filter((row) => row.tag.toLowerCase().includes(term.value)) : rows,
)
</script>
