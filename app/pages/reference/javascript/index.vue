<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">JavaScript Reference</h1>
      <p class="mt-3 text-muted">
        {{ memberCount }} members across {{ topics.length }} topics: the built-in language objects,
        the DOM, the browser APIs, and the style declarations behind
        <code class="font-mono text-sm text-mist-200">element.style</code>. Anything marked deprecated
        is listed with what replaced it.
      </p>
    </header>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        to="/reference/javascript/alphabet"
        class="group rounded-2xl border border-ink-600 bg-ink-900 p-5 transition hover:border-brand/50 hover:bg-ink-800"
      >
        <div class="flex items-baseline justify-between gap-3">
          <h2 class="text-sm font-semibold text-mist-50">JS by Alphabet</h2>
          <span class="font-mono text-xs text-dim">{{ memberCount }}</span>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-muted">
          Every member in one list, from
          <code class="font-mono text-xs text-mist-200">AbortController</code> to
          <code class="font-mono text-xs text-mist-200">write()</code>.
        </p>
        <p class="mt-3 font-mono text-xs text-brand opacity-0 transition group-hover:opacity-100">
          Open JS by Alphabet →
        </p>
      </NuxtLink>

      <NuxtLink
        to="/reference/javascript/category"
        class="group rounded-2xl border border-ink-600 bg-ink-900 p-5 transition hover:border-brand/50 hover:bg-ink-800"
      >
        <div class="flex items-baseline justify-between gap-3">
          <h2 class="text-sm font-semibold text-mist-50">JS by Category</h2>
          <span class="font-mono text-xs text-dim">{{ groups.length }}</span>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-muted">
          The same members grouped the way the source index groups them, from the language itself to
          the DOM.
        </p>
        <p class="mt-3 font-mono text-xs text-brand opacity-0 transition group-hover:opacity-100">
          Open JS by Category →
        </p>
      </NuxtLink>
    </div>

    <section v-for="group in groups" :key="group.label" class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">{{ group.label }}</h2>
      <p class="mt-1 font-mono text-xs text-dim">
        {{ group.topics.length }} topics · {{ group.members }} members
      </p>
      <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="topic in group.topics"
          :key="topic.id"
          :to="`/reference/javascript/topic/${topic.id}`"
          class="flex flex-col rounded-xl border border-ink-600 bg-ink-900 p-4 transition hover:border-brand/50"
        >
          <div class="flex items-baseline justify-between gap-3">
            <span class="font-mono text-sm text-mist-200">{{ topic.label }}</span>
            <span class="font-mono text-xs text-dim">{{ topic.members.length }}</span>
          </div>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ topic.summary }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'JavaScript reference' })

const [topics, navGroups] = await Promise.all([
  javascriptReferenceTopics(),
  javascriptReferenceNavGroups(),
])

const memberCount = computed(() => topics.reduce((total, topic) => total + topic.members.length, 0))

/** The source index groups the topics; keep those headings and their order. */
const groups = computed(() =>
  navGroups.map((group) => ({
    label: group.label,
    topics: topics.filter((topic) => topic.group === group.label),
    members: topics
      .filter((topic) => topic.group === group.label)
      .reduce((total, topic) => total + topic.members.length, 0),
  })),
)
</script>
