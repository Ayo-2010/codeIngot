<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <template v-if="topic">
      <nav class="text-xs text-dim" aria-label="Breadcrumb">
        <NuxtLink to="/reference/javascript" class="hover:text-brand">JavaScript</NuxtLink>
        <span class="px-1.5">/</span>
        <span class="text-muted">{{ topic.label }}</span>
      </nav>

      <header class="mt-4">
        <h1 class="font-mono text-3xl font-semibold tracking-tight text-mist-50">{{ topic.label }}</h1>
        <p class="mt-1 font-mono text-[11px] uppercase tracking-wider text-dim">{{ topic.group }}</p>
        <p class="mt-4 text-lg leading-relaxed text-mist-200">{{ topic.usage }}</p>
      </header>

      <section class="mt-8">
        <h2 class="text-sm font-semibold text-mist-50">Example</h2>
        <figure class="mt-3 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
          <figcaption
            class="flex items-center justify-between border-b border-ink-600 bg-ink-850 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-dim"
          >
            <span>{{ topic.example.language }}</span>
            <button type="button" class="hover:text-brand" @click="copy(topic.example.code)">Copy</button>
          </figcaption>
          <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6"><code><span
              v-for="(token, index) in tokens"
              :key="index"
              :class="TOKEN_CLASS[token.kind]"
            >{{ token.value }}</span></code></pre>
        </figure>
      </section>

      <section class="mt-10">
        <div class="flex flex-wrap items-baseline justify-between gap-3">
          <h2 class="text-sm font-semibold text-mist-50">Members</h2>
          <p class="font-mono text-xs text-dim">
            {{ filtered.length }} of {{ topic.members.length }}
          </p>
        </div>

        <label v-if="topic.members.length" class="mt-3 block">
          <span class="sr-only">Search the {{ topic.label }} members</span>
          <input
            id="member-search"
            v-model="search"
            type="search"
            :placeholder="`Search ${topic.members.length} members`"
            class="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm text-mist-50 outline-none transition placeholder:text-dim focus:border-brand/50"
          />
        </label>

        <p
          v-if="topic.members.length === 0"
          class="mt-4 rounded-xl border border-ink-600 bg-ink-900 px-4 py-6 text-center text-sm text-dim"
        >
          This topic has no member list in the source index. The notes above cover it.
        </p>

        <p
          v-else-if="filtered.length === 0"
          class="mt-4 rounded-xl border border-ink-600 bg-ink-900 px-4 py-6 text-center text-sm text-dim"
        >
          Nothing matches “{{ search }}”.
        </p>

        <div v-else class="mt-4 overflow-x-auto rounded-2xl border border-ink-600">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
                <th scope="col" class="px-4 py-3 font-semibold">Member</th>
                <th scope="col" class="px-4 py-3 font-semibold">Kind</th>
                <th scope="col" class="px-4 py-3 font-semibold">What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in filtered" :key="member.name" class="border-b border-ink-800 align-top last:border-0">
                <th scope="row" class="whitespace-nowrap px-4 py-3 font-mono text-[13px] font-medium text-mist-50">
                  {{ member.name }}
                </th>
                <td class="whitespace-nowrap px-4 py-3">
                  <TagPill :value="kindLabel(member.kind)" tone="muted" />
                </td>
                <td class="px-4 py-3 leading-relaxed text-muted">
                  {{ member.description }}
                  <DeprecationNote v-if="member.deprecated" :note="member.deprecated" class="mt-2" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <nav class="mt-10 flex items-center justify-between gap-4 border-t border-ink-600 pt-6" aria-label="Adjacent topics">
        <NuxtLink
          v-if="previous"
          :to="previous.to"
          class="rounded-lg border border-ink-600 px-3 py-2 font-mono text-xs text-muted transition hover:border-brand/50 hover:text-brand"
        >
          ← {{ previous.label }}
        </NuxtLink>
        <span v-else />
        <NuxtLink
          v-if="next"
          :to="next.to"
          class="rounded-lg border border-ink-600 px-3 py-2 font-mono text-xs text-muted transition hover:border-brand/50 hover:text-brand"
        >
          {{ next.label }} →
        </NuxtLink>
      </nav>
    </template>

    <div v-else class="py-20 text-center">
      <h1 class="text-2xl font-semibold text-mist-50">No topic for “{{ slug }}”</h1>
      <p class="mt-2 text-muted">That topic is not in the reference. Browse the list instead.</p>
      <NuxtLink
        to="/reference/javascript"
        class="mt-6 inline-block rounded-lg border border-brand/50 px-4 py-2 text-sm text-brand hover:bg-brand/10"
      >
        All JavaScript topics
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TOKEN_CLASS, highlight } from '~/utils/highlight'
import type { JsMemberKind } from '~/types/content'

definePageMeta({ layout: 'reference' })

const route = useRoute()
const slug = computed(() => String(route.params.topic ?? ''))

const topics = javascriptReferenceTopics()
const topic = computed(() => javascriptReferenceTopicBySlug(slug.value))

const tokens = computed(() => highlight(topic.value?.example.code ?? '', topic.value?.example.language ?? 'javascript'))

const search = ref('')
const filtered = computed(() => {
  const current = topic.value
  if (!current) return []
  const term = search.value.trim().toLowerCase()
  if (!term) return current.members
  return current.members.filter(
    (member) =>
      member.name.toLowerCase().includes(term) || member.description.toLowerCase().includes(term),
  )
})

const KIND_LABELS: Record<JsMemberKind, string> = {
  method: 'Method',
  property: 'Property',
  constant: 'Constant',
  statement: 'Statement',
  token: 'Pattern',
  interface: 'Interface',
}

function kindLabel(kind: JsMemberKind) {
  return KIND_LABELS[kind]
}

const position = computed(() => topics.findIndex((entry) => entry.id === slug.value))
const previous = computed(() => (position.value > 0 ? link(topics[position.value - 1]!) : null))
const next = computed(() =>
  position.value >= 0 && position.value < topics.length - 1 ? link(topics[position.value + 1]!) : null,
)

function link(entry: { label: string; id: string }) {
  return { label: entry.label, to: `/reference/javascript/topic/${entry.id}` }
}

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
}

useHead({ title: computed(() => topic.value?.label ?? 'Topic not found') })
</script>
