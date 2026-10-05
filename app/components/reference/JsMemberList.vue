<template>
  <div>
    <label class="block">
      <span class="sr-only">Search the JavaScript reference</span>
      <input
        id="js-member-search"
        v-model="search"
        type="search"
        :placeholder="`Search ${entries.length} members`"
        class="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-mist-50 outline-none transition placeholder:text-dim focus:border-brand/50"
      />
    </label>

    <p class="mt-2 font-mono text-xs text-dim">
      {{ filtered.length }} of {{ entries.length }} members
    </p>

    <p
      v-if="filtered.length === 0"
      class="mt-6 rounded-xl border border-ink-600 bg-ink-900 px-4 py-8 text-center text-sm text-dim"
    >
      Nothing matches “{{ search }}”.
    </p>

    <template v-else>
      <section v-for="section in sections" :key="section.label" class="mt-8">
        <h2 class="font-mono text-xs uppercase tracking-wider text-dim">{{ section.label }}</h2>

        <div class="mt-2 overflow-x-auto rounded-2xl border border-ink-600">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
                <th scope="col" class="px-4 py-3 font-semibold">Member</th>
                <th scope="col" class="px-4 py-3 font-semibold">Topic</th>
                <th scope="col" class="px-4 py-3 font-semibold">What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in section.entries"
                :key="`${entry.topic.id}-${entry.member.name}`"
                class="border-b border-ink-800 align-top last:border-0"
              >
                <th scope="row" class="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] font-medium text-mist-50">
                  {{ entry.member.name }}
                </th>
                <td class="whitespace-nowrap px-4 py-2.5">
                  <NuxtLink
                    :to="`/reference/javascript/topic/${entry.topic.id}`"
                    class="text-brand hover:underline"
                  >
                    {{ entry.topic.label }}
                  </NuxtLink>
                </td>
                <td class="px-4 py-2.5 leading-relaxed text-muted">{{ entry.member.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { FlatJsMember } from '~/content/reference/javascript'

const props = defineProps<{ entries: FlatJsMember[]; order: 'alphabet' | 'topic' }>()

const search = ref('')

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  if (!term) return props.entries
  return props.entries.filter(
    ({ topic, member }) =>
      member.name.toLowerCase().includes(term) ||
      member.description.toLowerCase().includes(term) ||
      topic.label.toLowerCase().includes(term),
  )
})

/** Punctuation and digits sort together rather than each getting a heading. */
function bucket(name: string): string {
  const first = name.charAt(0).toUpperCase()
  return /[A-Z]/.test(first) ? first : 'Other'
}

const sections = computed(() => {
  const groups = new Map<string, FlatJsMember[]>()

  if (props.order === 'topic') {
    for (const entry of filtered.value) {
      const list = groups.get(entry.topic.label) ?? []
      list.push(entry)
      groups.set(entry.topic.label, list)
    }
  } else {
    for (const entry of filtered.value) {
      const key = bucket(entry.member.name)
      const list = groups.get(key) ?? []
      list.push(entry)
      groups.set(key, list)
    }
  }

  const sorted = [...groups.entries()]
  if (props.order === 'topic') {
    // Keep the source order of the topics rather than sorting them by label.
    const order = new Map(props.entries.map((entry, index) => [entry.topic.label, index]))
    sorted.sort((a, b) => (order.get(a[0]) ?? 0) - (order.get(b[0]) ?? 0))
  } else {
    sorted.sort((a, b) => a[0].localeCompare(b[0]))
  }

  return sorted.map(([label, entries]) => ({ label, entries }))
})
</script>
