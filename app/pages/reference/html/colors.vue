<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Colors</h1>
      <p class="mt-3 text-muted">
        {{ colors.length }} named colours browsers still accept in CSS. They exist for compatibility;
        a hex or <code class="font-mono text-brand">rgb()</code> value is easier to reason about, and a
        custom property keeps a palette in one place.
      </p>
    </header>

    <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="color in colors"
        :key="color.name"
        class="flex items-center gap-3 rounded-xl border border-ink-600 bg-ink-900 p-3"
      >
        <span
          class="h-10 w-10 shrink-0 rounded-lg border border-ink-500"
          :style="{ background: isNamedKeyword(color.name) ? color.name : color.hex }"
          aria-hidden="true"
        />
        <div class="min-w-0">
          <p class="font-mono text-sm text-mist-50">{{ color.name }}</p>
          <p class="truncate font-mono text-xs text-dim">{{ color.hex }}</p>
        </div>
      </div>
    </div>

    <section class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">Writing a colour</h2>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-mist-200">
        <li>
          <code class="font-mono text-brand">#1a73e8</code> is a hex value. Three digits is shorthand for
          six, so <code class="font-mono text-brand">#abc</code> equals <code class="font-mono text-brand">#aabbcc</code>.
        </li>
        <li>
          <code class="font-mono text-brand">rgb(26 115 232)</code> takes channels from 0 to 255, and
          adding <code class="font-mono text-brand">/ 40%</code> sets alpha without a fourth argument.
        </li>
        <li>
          <code class="font-mono text-brand">hsl(212 88% 51%)</code> works in hue, saturation and
          lightness, which is how you build a scale of tints and shades from one base colour.
        </li>
        <li>
          <code class="font-mono text-brand">currentColor</code> resolves to the element's own colour, so
          an icon or border follows the text without a second value to keep in step.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTML colors' })

const colors = htmlReferenceColorNames()

// `currentColor` and `transparent` are keywords rather than hex values.
function isNamedKeyword(name: string) {
  return name === 'currentColor'
}
</script>
