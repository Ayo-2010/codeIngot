<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Events</h1>
      <p class="mt-3 text-muted">
        {{ events.length }} event handler attributes. Everything here also has a
        <code class="font-mono text-brand">addEventListener</code> equivalent, and the listener form is
        usually the better one because it keeps the handler out of the markup.
      </p>
    </header>

    <div class="mt-8">
      <input
        v-model="search"
        type="search"
        placeholder="Search eventsâ€¦"
        aria-label="Search events"
        class="w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
      />
    </div>

    <div class="mt-6 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="w-1/4 px-4 py-3 font-semibold">Event</th>
            <th scope="col" class="w-1/3 px-4 py-3 font-semibold">Applies to</th>
            <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in filtered" :key="row.event" class="border-b border-ink-800 align-top last:border-0">
            <td class="px-4 py-2.5 font-mono text-brand">{{ row.event }}</td>
            <td class="px-4 py-2.5 font-mono text-xs leading-5 text-muted">{{ row.appliesTo }}</td>
            <td class="px-4 py-2.5 text-mist-200">{{ row.description }}</td>
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
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'HTML events',
  description:
    'The HTML event handler attributes and their addEventListener equivalents, with why the listener form usually keeps the markup cleaner.',
})

const events = await htmlReferenceEvents()
const search = ref('')

const term = computed(() => search.value.trim().toLowerCase())
const filtered = computed(() =>
  term.value
    ? events.filter((row) =>
        `${row.event} ${row.appliesTo} ${row.description}`.toLowerCase().includes(term.value),
      )
    : events,
)
</script>
