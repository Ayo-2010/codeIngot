<template>
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Reference</h1>
      <p class="mt-3 text-muted">
        Compact, accurate notes on the HTML, CSS and JavaScript you will use most, with the syntax
        first and the details second.
      </p>
    </header>

    <div class="mt-8 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
      <aside class="lg:sticky lg:top-20">
        <label class="block">
          <span class="sr-only">Search the reference</span>
          <input
            v-model="search"
            type="search"
            placeholder="Search…"
            class="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
        <nav class="mt-5 space-y-4" aria-label="Reference groups">
          <div v-for="group in groups" :key="group.value">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-dim">{{ group.label }}</p>
            <ul class="mt-2 space-y-1">
              <li v-for="entry in entriesIn(group.value)" :key="entry.id">
                <a
                  :href="`#${entry.id}`"
                  class="block rounded px-2 py-1 font-mono text-sm transition"
                  :class="active === entry.id ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-ink-800 hover:text-mist-50'"
                >
                  {{ entry.name }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      <div>
        <div class="grid gap-4 sm:grid-cols-2">
          <article
            v-for="entry in filtered"
            :id="entry.id"
            :key="entry.id"
            class="scroll-mt-20 rounded-2xl border border-ink-600 bg-ink-900 p-5"
          >
            <div class="flex items-center justify-between gap-3">
              <h2 class="font-mono text-base text-brand">{{ entry.name }}</h2>
              <TagPill :value="entry.group" :tone="groupTone(entry.group)" />
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
          Nothing in the reference matches “{{ search }}”.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Reference' })

const entries = allReferenceEntries()
const search = ref('')
const active = ref('')

const groups = [
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'javascript', label: 'JavaScript' },
] as const

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return entries
  return entries.filter((entry) =>
    `${entry.name} ${entry.summary} ${entry.group} ${entry.syntax}`.toLowerCase().includes(term),
  )
})

function entriesIn(group: string) {
  return filtered.value.filter((entry) => entry.group === group)
}

function groupTone(group: string) {
  if (group === 'html') return 'brand' as const
  if (group === 'css') return 'info' as const
  return 'warn' as const
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (items) => {
      const visible = items.filter((item) => item.isIntersecting)[0]
      if (visible) active.value = visible.target.id
    },
    { rootMargin: '-10% 0px -75% 0px' },
  )
  for (const entry of filtered.value) {
    const element = document.getElementById(entry.id)
    if (element) observer.observe(element)
  }
  onBeforeUnmount(() => observer.disconnect())
})
</script>