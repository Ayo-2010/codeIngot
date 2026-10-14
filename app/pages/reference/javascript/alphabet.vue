<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <nav class="text-xs text-dim" aria-label="Breadcrumb">
      <NuxtLink to="/reference/javascript" class="hover:text-brand">JavaScript</NuxtLink>
      <span class="px-1.5">/</span>
      <span class="text-muted">By alphabet</span>
    </nav>

    <header class="mt-4">
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">JS by Alphabet</h1>
      <p class="mt-3 text-muted">
        All {{ entries.length }} members from the reference in one list. Each one links to the topic
        that documents it.
      </p>
    </header>

    <div class="mt-6">
      <ReferenceJsMemberList :entries="entries" order="alphabet" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'JavaScript by alphabet' })

const entries = await javascriptReferenceMembers()
</script>
