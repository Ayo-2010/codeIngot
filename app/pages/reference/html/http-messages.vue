<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTTP Messages</h1>
      <p class="mt-3 text-muted">
        {{ statuses.length }} status codes, grouped by the class in the first digit. The class is the useful
        part: 4xx means the request needs changing, 5xx means the server does.
      </p>
    </header>

    <div class="mt-8 space-y-8">
      <section v-for="group in grouped" :key="group.label">
        <h2 class="flex items-baseline gap-3 text-lg font-semibold text-mist-50">
          {{ group.label }}
          <span class="font-mono text-xs font-normal text-dim">{{ group.rows.length }}</span>
        </h2>
        <div class="mt-3 overflow-x-auto rounded-2xl border border-ink-600">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
                <th scope="col" class="w-24 px-4 py-3 font-semibold">Code</th>
                <th scope="col" class="w-48 px-4 py-3 font-semibold">Status</th>
                <th scope="col" class="px-4 py-3 font-semibold">What it means</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in group.rows" :key="row.code" class="border-b border-ink-800 align-top last:border-0">
                <td class="px-4 py-2.5 font-mono" :class="toneClass(row.code)">{{ row.code }}</td>
                <th scope="row" class="px-4 py-2.5 font-medium text-mist-50">{{ row.status }}</th>
                <td class="px-4 py-2.5 text-mist-200">{{ row.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTTP messages' })

const statuses = htmlReferenceHttpStatuses()

const groups = [
  { label: '1xx â€” Informational', test: (code: number) => code < 200 },
  { label: '2xx â€” Success', test: (code: number) => code >= 200 && code < 300 },
  { label: '3xx â€” Redirection', test: (code: number) => code >= 300 && code < 400 },
  { label: '4xx â€” Client error', test: (code: number) => code >= 400 && code < 500 },
  { label: '5xx â€” Server error', test: (code: number) => code >= 500 },
]

const grouped = groups
  .map((group) => ({ label: group.label, rows: statuses.filter((row) => group.test(row.code)) }))
  .filter((group) => group.rows.length > 0)

function toneClass(code: number) {
  if (code < 300) return 'text-ok'
  if (code < 400) return 'text-info'
  if (code < 500) return 'text-warn'
  return 'text-bad'
}
</script>
