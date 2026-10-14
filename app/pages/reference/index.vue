<template>
  <div class="mx-auto max-w-5xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Reference</h1>
      <p class="mt-3 text-muted">
        A lookup for the language you are writing. Each one has its own page, so you get the whole
        vocabulary for that language instead of a mixed list.
      </p>
    </header>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="language in referenceLanguages"
        :key="language.value"
        :to="language.to"
        class="group rounded-2xl border border-ink-600 bg-ink-900 p-6 transition hover:border-brand/50 hover:bg-ink-800"
      >
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-xl font-semibold text-mist-50">{{ language.label }}</h2>
          <span class="font-mono text-xs text-dim">{{ count(language.value) }}</span>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ language.blurb }}</p>
        <p class="mt-4 font-mono text-xs text-brand opacity-0 transition group-hover:opacity-100">
          Open {{ language.label }} reference →
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Reference' })

// Each card counts what its own reference actually contains, rather than the
// size of the shared entry list, which is only a starting point.
const [htmlTags, cssProperties, jsMembers] = await Promise.all([
  htmlReferenceTags(),
  cssReferenceProperties(),
  javascriptReferenceMembers(),
])

const counts = {
  html: computed(() => htmlTags.length),
  css: computed(() => cssProperties.length),
  javascript: computed(() => jsMembers.length),
}

function count(group: 'html' | 'css' | 'javascript') {
  return counts[group].value
}
</script>