<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Browser Support</h1>
      <p class="mt-3 text-muted">
        The first version of each browser with usable support, for all
        {{ properties.length }} properties. At-rules are listed too, with the engine version that
        implemented them.
      </p>
    </header>

    <label class="sr-only" for="support-search">Search properties</label>
    <input
      id="support-search"
      v-model="search"
      type="search"
      placeholder="Search properties…"
      class="mt-8 w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
    />

    <p class="mt-3 font-mono text-xs text-dim">{{ filtered.length }} of {{ properties.length }} properties</p>

    <div class="mt-4 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="px-4 py-3 font-semibold">Property</th>
            <th v-for="browser in browsers" :key="browser" scope="col" class="px-4 py-3 font-semibold">
              {{ browser }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filtered" :key="row.name" class="border-b border-ink-800 align-top last:border-0">
            <th scope="row" class="px-4 py-2.5 font-normal">
              <NuxtLink
                :to="`/reference/css/property/${cssReferencePropertySlug(row.name)}`"
                class="font-mono text-brand hover:underline"
              >
                {{ row.name }}
              </NuxtLink>
            </th>
            <td v-for="version in row.versions" :key="version.browser" class="px-4 py-2.5 font-mono text-xs">
              <span :class="version.version === 'No' ? 'text-warn' : 'text-mist-200'">
                {{ version.version === 'No' ? 'No' : version.version }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="filtered.length === 0" class="mt-6 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>

    <p class="mt-4 text-xs text-dim">
      Versions are the first release with usable support, ignoring vendor prefixes. Edge reports the
      first Chromium-based version rather than the retired EdgeHTML line.
    </p>
  </div>
</template>

<script setup lang="ts">
import type { BrowserName } from '~/types/content'

definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS browser support' })

const properties = cssReferenceProperties()
const pages = cssReferencePropertyPages()
const search = ref('')

const browsers: BrowserName[] = ['Chrome', 'Edge', 'Firefox', 'Safari']

const rows = computed(() =>
  properties.map((property) => {
    const support = pages.find((entry) => entry.property === property.name)?.support ?? []
    return {
      name: property.name,
      versions: browsers.map(
        (browser) => support.find((row) => row.browser === browser) ?? { browser, version: 'No' },
      ),
    }
  }),
)

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return rows.value
  return rows.value.filter((row) => row.name.toLowerCase().includes(term))
})
</script>