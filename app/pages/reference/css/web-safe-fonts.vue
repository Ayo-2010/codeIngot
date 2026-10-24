<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Web Safe Fonts</h1>
      <p class="mt-3 text-muted">
        {{ fonts.length }} font stacks that need no download. They are not really safe any more, because
        most are absent on Linux and Android, which is why each stack still ends in a generic family.
      </p>
    </header>

    <div class="mt-8 grid gap-3 md:grid-cols-2">
      <article
        v-for="font in fonts"
        :key="font.stack.join(',')"
        class="rounded-2xl border border-ink-600 bg-ink-900 p-5"
      >
        <p class="text-xl text-mist-50" :style="{ fontFamily: font.stack.join(', ') }">
          The quick brown fox jumps over the lazy dog
        </p>
        <p class="mt-3 font-mono text-xs leading-5 text-brand">{{ font.stack.join(', ') }}</p>
        <p class="mt-1 font-mono text-[11px] text-dim">generic: {{ font.generic }}</p>
      </article>
    </div>

    <section class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">Prefer the keywords on a modern project</h2>
      <p class="mt-2 text-sm leading-relaxed text-muted">
        The four <code class="font-mono text-brand">ui-*</code> keywords resolve to the font the operating
        system already uses for that role, which is more consistent across platforms than any named
        stack. Font stacks belong in a self-hosted variable face plus these as the fallback.
      </p>
      <pre class="mt-3 overflow-x-auto rounded-2xl border border-ink-600 bg-ink-950 p-4 font-mono text-[12px] leading-5 text-mist-200"><code>body {
  font-family: 'Inter var', system-ui, -apple-system, sans-serif;
}

code {
  font-family: ui-monospace, 'Cascadia Code', monospace;
}</code></pre>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'CSS web safe fonts',
  description:
    'CSS font stacks that need no download, honest about no longer being safe now most are absent on Linux and Android.',
})

const fonts = await cssReferenceWebSafeFonts()
</script>