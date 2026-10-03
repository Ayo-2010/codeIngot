<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Color Values</h1>
      <p class="mt-3 text-muted">
        {{ values.length }} ways to write a colour. rgb and hsl take an optional alpha after a slash, and
        oklch is the space to reach for when a palette has to stay perceptually even.
      </p>
    </header>

    <div class="mt-8 space-y-4">
      <article v-for="entry in values" :key="entry.syntax" class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
        <div class="flex items-baseline justify-between gap-4">
          <code class="font-mono text-sm text-brand">{{ entry.syntax }}</code>
        </div>
        <p class="mt-2 text-sm leading-relaxed text-mist-200">{{ entry.description }}</p>
        <pre class="mt-3 overflow-x-auto rounded-lg border border-ink-600 bg-ink-950 p-3 font-mono text-[12px] leading-5 text-mist-200"><code>{{ entry.example }}</code></pre>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS color values' })

const values = cssReferenceColorValues()
</script>