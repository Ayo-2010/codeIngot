<template>
  <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">CSS Reference</h1>
      <p class="mt-3 text-muted">
        {{ properties.length }} properties and at-rules, {{ selectors.length }} selectors,
        {{ functions.length }} functions and {{ units.length }} units. Anything marked deprecated is
        listed with what replaced it.
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
      <h2 class="text-sm font-semibold text-mist-50">Properties by category</h2>
      <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="group in categories"
          :key="group.category"
          :to="`/reference/css/property/${group.firstSlug}`"
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
usePageSeo({
  title: 'CSS reference',
  description:
    'CSS properties, selectors, functions and units with syntax, examples, default values and browser support.',
})

const [
  properties,
  selectors,
  functions,
  units,
  colorNames,
  colorValues,
  animatable,
  entities,
  webSafeFonts,
  fontFallbacks,
  auralProperties,
  categories,
] = await Promise.all([
  cssReferenceProperties(),
  cssReferenceSelectors(),
  cssReferenceFunctions(),
  cssReferenceUnits(),
  cssReferenceColorNames(),
  cssReferenceColorValues(),
  cssReferenceAnimatable(),
  cssReferenceEntities(),
  cssReferenceWebSafeFonts(),
  cssReferenceFontFallbacks(),
  cssReferenceAuralProperties(),
  cssReferenceCategories(),
])

const sections = computed(() => [
  { label: 'CSS Selectors', to: '/reference/css/selectors', count: selectors.length, blurb: 'Every selector type, what it matches and where it fits.' },
  { label: 'CSS Functions', to: '/reference/css/functions', count: functions.length, blurb: 'calc, min, max, clamp, var, gradients and transforms.' },
  { label: 'CSS Units', to: '/reference/css/units', count: units.length, blurb: 'Absolute, relative, viewport and container units.' },
  { label: 'CSS Browser Support', to: '/reference/css/browser-support', count: properties.length, blurb: 'The first version of each browser with support per property.' },
  { label: 'CSS Colors', to: '/reference/css/colors', count: colorNames.length, blurb: 'The named colours and their hex values.' },
  { label: 'CSS Color Values', to: '/reference/css/color-values', count: colorValues.length, blurb: 'Hex, rgb, hsl, oklch and the rest of the colour syntax.' },
  { label: 'CSS Default Values', to: '/reference/css/default-values', count: properties.length, blurb: 'The initial value and whether each property is inherited.' },
  { label: 'CSS Animatable', to: '/reference/css/animatable', count: animatable.animatable.length, blurb: 'Which properties a transition can interpolate.' },
  { label: 'CSS Entities', to: '/reference/css/entities', count: entities.length, blurb: 'Named and numeric character references.' },
  { label: 'CSS Web Safe Fonts', to: '/reference/css/web-safe-fonts', count: webSafeFonts.length, blurb: 'Fonts you can rely on without downloading anything.' },
  { label: 'CSS Font Fallbacks', to: '/reference/css/font-fallbacks', count: fontFallbacks.length, blurb: 'Ready-made stacks for body, code and system text.' },
  { label: 'CSS PX-EM Converter', to: '/reference/css/px-to-em', count: 'px → em', blurb: 'Convert pixel values to em and rem at a base size.' },
  { label: 'CSS Reference Aural', to: '/reference/css/aural', count: auralProperties.length, blurb: 'The removed aural properties, and why they are gone.' },
])
</script>