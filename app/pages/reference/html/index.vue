<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Reference</h1>
      <p class="mt-3 text-muted">
        {{ tags.length }} elements, {{ globalAttributes.length }} global attributes and
        {{ attributes.length }} tag attributes. Everything marked deprecated still appears in older
        code, so it is listed with what replaced it.
      </p>
    </header>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="section in sections"
        :key="section.to"
        :to="section.to"
        class="group rounded-2xl border border-ink-600 bg-ink-900 p-5 transition hover:border-brand/50 hover:bg-ink-800"
      >
        <div class="flex items-baseline justify-between gap-3">
          <h2 class="text-sm font-semibold text-mist-50">{{ section.label }}</h2>
          <span class="font-mono text-xs text-dim">{{ section.count }}</span>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ section.blurb }}</p>
        <p class="mt-3 font-mono text-xs text-brand opacity-0 transition group-hover:opacity-100">
          Open {{ section.label }} →
        </p>
      </NuxtLink>
    </div>

    <section class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">Elements by category</h2>
      <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="group in categories"
          :key="group.category"
          to="/reference/html/category"
          class="flex items-baseline justify-between gap-3 rounded-xl border border-ink-600 bg-ink-900 px-4 py-3 transition hover:border-brand/50"
        >
          <span class="text-sm text-mist-200">{{ group.category }}</span>
          <span class="font-mono text-xs text-dim">{{ group.count }}</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTML reference' })

const tags = htmlReferenceTags()
const attributes = htmlReferenceAttributes()
const globalAttributes = htmlReferenceGlobalAttributes()

const sections = computed(() => [
  { label: 'HTML by Alphabet', to: '/reference/html/alphabet', count: tags.length, blurb: 'Every element A to Z, each with its own page.' },
  { label: 'HTML by Category', to: '/reference/html/category', count: tags.length, blurb: 'The same elements grouped by what they are for.' },
  { label: 'HTML Attributes', to: '/reference/html/attributes', count: attributes.length, blurb: 'Attributes that belong to particular elements.' },
  { label: 'HTML Global Attributes', to: '/reference/html/global-attributes', count: globalAttributes.length, blurb: 'Attributes valid on every element.' },
  { label: 'HTML Events', to: '/reference/html/events', count: htmlReferenceEvents().length, blurb: 'Event handler attributes and when to use the listener form.' },
  { label: 'HTML Browser Support', to: '/reference/html/browser-support', count: tags.length, blurb: 'The first version of each browser with support per element.' },
])

const categories = computed(() =>
  htmlReferenceCategories().map((category) => ({
    category,
    count: tags.filter((tag) => tag.category === category).length,
  })),
)
</script>
