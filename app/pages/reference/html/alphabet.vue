<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">HTML by Alphabet</h1>
      <p class="mt-3 text-muted">
        {{ tags.length }} elements from A to Z. Each tag name links to its own page with an example,
        browser support and the elements it relates to.
      </p>
    </header>

    <div class="mt-8">
      <TagList order="alphabet" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'HTML by alphabet',
  description:
    'Every HTML element from A to Z, each linking to its own reference page with an example, browser support and related elements.',
})

const tags = await htmlReferenceTags()
</script>
