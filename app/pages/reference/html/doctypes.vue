<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Doctypes</h1>
      <p class="mt-3 text-muted">
        A doctype is not a version number. It tells the parser which rules to apply, and a page with no
        doctype or an unrecognised one is put into quirks mode, where box sizing and layout behave
        differently.
      </p>
    </header>

    <section class="mt-8 rounded-2xl border border-brand/25 bg-brand/5 p-5">
      <h2 class="text-sm font-semibold text-mist-50">The only one to write</h2>
      <figure class="mt-3 overflow-hidden rounded-xl border border-ink-600 bg-ink-900">
        <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6 text-mist-200"><code>{{ html5.doctype }}</code></pre>
      </figure>
      <p class="mt-2 text-sm text-mist-200">{{ html5.description }}</p>
    </section>

    <div class="mt-8 space-y-4">
      <article
        v-for="doctype in deprecated"
        :key="doctype.name"
        class="rounded-2xl border border-ink-600 bg-ink-900 p-5"
      >
        <h2 class="text-sm font-semibold text-mist-50">{{ doctype.name }}</h2>
        <figure class="mt-3 overflow-hidden rounded-xl border border-ink-600 bg-ink-950">
          <pre class="overflow-x-auto p-3 font-mono text-[12px] leading-5 text-mist-200"><code>{{ doctype.doctype }}</code></pre>
        </figure>
        <p class="mt-3 text-sm leading-relaxed text-mist-200">{{ doctype.description }}</p>
        <DeprecationNote v-if="doctype.deprecated" :note="doctype.deprecated" class="mt-3" />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'HTML doctypes',
  description:
    'What an HTML doctype actually switches on: which parser rules apply, and how a missing doctype drops the page into quirks mode.',
})

const doctypes = await htmlReferenceDoctypes()
const html5 = doctypes.find((doctype) => doctype.name === 'HTML5') ?? doctypes[0]!
const deprecated = doctypes.filter((doctype) => doctype.name !== 'HTML5')
</script>
