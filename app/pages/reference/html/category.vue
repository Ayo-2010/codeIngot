<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">HTML by Category</h1>
      <p class="mt-3 text-muted">
        The same {{ tags.length }} elements grouped by what they are for. Useful when you know the job
        rather than the tag name, such as reaching for the right table element.
      </p>
    </header>

    <div class="mt-8">
      <TagList order="category" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTML by category' })

const tags = await htmlReferenceTags()
</script>
