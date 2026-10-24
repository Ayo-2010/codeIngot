<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Font Fallbacks</h1>
      <p class="mt-3 text-muted">
        {{ stacks.length }} ready-made stacks. The generic family always goes last, because it is the
        only part of the list guaranteed to resolve.
      </p>
    </header>

    <div class="mt-8 space-y-4">
      <article v-for="stack in stacks" :key="stack.label" class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
        <h2 class="text-lg font-semibold text-mist-50" :style="{ fontFamily: stack.stack.join(', ') }">
          {{ stack.label }}
        </h2>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ stack.note }}</p>
        <p class="mt-3 font-mono text-xs leading-5 text-brand">{{ stack.stack.join(', ') }}</p>
        <p class="mt-3 text-base leading-6 text-mist-200" :style="{ fontFamily: stack.stack.join(', ') }">
          The quick brown fox jumps over the lazy dog — 0123456789
        </p>
      </article>
    </div>

    <section class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">Size the fallback, not just the name</h2>
      <p class="mt-2 text-sm leading-relaxed text-muted">
        A stack alone still allows the layout to jump when a web font arrives or fails. Adding a matching
        <code class="font-mono text-brand">size-adjust</code> to a local fallback closes most of that gap.
      </p>
      <pre class="mt-3 overflow-x-auto rounded-2xl border border-ink-600 bg-ink-950 p-4 font-mono text-[12px] leading-5 text-mist-200"><code>@font-face {
  font-family: 'Inter Fallback';
  src: local('Arial');
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
}

body {
  font-family: 'Inter var', 'Inter Fallback', system-ui, sans-serif;
}</code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'CSS font fallbacks',
  description:
    'Ready-made CSS font stacks that end in the generic family guaranteed to resolve, so text still renders when a webfont fails to load.',
})

const stacks = await cssReferenceFontFallbacks()
</script>