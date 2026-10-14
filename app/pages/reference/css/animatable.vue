<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Animatable</h1>
      <p class="mt-3 text-muted">
        {{ animatable.length }} properties can interpolate between two values. The other
        {{ staticProperties.length }} switch at the halfway point instead, so a transition still runs but
        it looks like a jump.
      </p>
    </header>

    <div class="mt-8 grid gap-4 lg:grid-cols-2">
      <section>
        <div class="flex items-baseline justify-between gap-3">
          <h2 class="text-sm font-semibold text-mist-50">Animatable</h2>
          <span class="font-mono text-xs text-dim">{{ animatable.length }}</span>
        </div>
        <p class="mt-2 text-sm text-muted">
          Smooth interpolation. Prefer animating transform and opacity over width, top or box-shadow,
          because the browser can run those on the compositor.
        </p>
        <ul class="mt-3 flex flex-wrap gap-1.5">
          <li v-for="property in animatable" :key="property.name">
            <NuxtLink
              :to="`/reference/css/property/${cssReferencePropertySlug(property.name)}`"
              class="block rounded-lg border border-ink-600 bg-ink-900 px-2 py-1 font-mono text-xs text-mist-200 transition hover:border-brand/50 hover:text-brand"
            >
              {{ property.name }}
            </NuxtLink>
          </li>
        </ul>
      </section>

      <section>
        <div class="flex items-baseline justify-between gap-3">
          <h2 class="text-sm font-semibold text-mist-50">Not animatable</h2>
          <span class="font-mono text-xs text-dim">{{ staticProperties.length }}</span>
        </div>
        <p class="mt-2 text-sm text-muted">
          Discrete properties. Changing display or position with a transition does nothing useful, so
          reach for the @starting-style rule or a class swap instead.
        </p>
        <ul class="mt-3 flex flex-wrap gap-1.5">
          <li v-for="property in staticProperties" :key="property.name">
            <NuxtLink
              :to="`/reference/css/property/${cssReferencePropertySlug(property.name)}`"
              class="block rounded-lg border border-ink-600 bg-ink-900 px-2 py-1 font-mono text-xs text-muted transition hover:border-brand/50 hover:text-brand"
            >
              {{ property.name }}
            </NuxtLink>
          </li>
        </ul>
      </section>
    </div>

    <section class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">Preference queries worth pairing with this</h2>
      <pre class="mt-3 overflow-x-auto rounded-2xl border border-ink-600 bg-ink-950 p-4 font-mono text-[12px] leading-5 text-mist-200"><code>@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}</code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS animatable' })

const { animatable, static: staticProperties } = await cssReferenceAnimatable()
</script>