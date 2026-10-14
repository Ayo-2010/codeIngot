<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Reference Aural</h1>
      <p class="mt-3 text-muted">
        {{ properties.length }} aural properties from CSS 2, none of which any browser ever
        implemented. They are listed here so the names are recognisable rather than looking invented.
      </p>
    </header>

    <p class="mt-8 rounded-2xl border border-warn/40 bg-warn/5 px-5 py-4 text-sm leading-relaxed text-mist-200">
      <strong class="font-semibold text-warn">Removed from the specification.</strong>
      Speech output is the job of the operating system screen reader, not of a stylesheet. Use
      semantic markup, a lang attribute and the accessibility tree instead — a spoken experience built
      from these properties would be unmaintainable even if they worked.
    </p>

    <div class="mt-8 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="w-40 px-4 py-3 font-semibold">Property</th>
            <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="property in properties" :key="property.property" class="border-b border-ink-800 align-top last:border-0">
            <td class="px-4 py-2.5 font-mono text-brand">{{ property.property }}</td>
            <td class="px-4 py-2.5 text-mist-200">
              {{ property.description }}
              <DeprecationNote v-if="property.deprecated" :note="property.deprecated" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <section class="mt-10">
      <h2 class="text-sm font-semibold text-mist-50">cursor is the one name that survived</h2>
      <p class="mt-2 text-sm leading-relaxed text-muted">
        <code class="font-mono text-brand">cursor</code> is still a live property, but only for its visual
        pointer values. The aural values <code class="font-mono text-brand">speak</code> and
        <code class="font-mono text-brand">auto-date</code> were dropped along with everything else.
      </p>
      <NuxtLink
        to="/reference/css/property/cursor"
        class="mt-3 inline-block rounded-lg border border-ink-600 px-3 py-2 font-mono text-xs text-muted transition hover:border-brand/50 hover:text-brand"
      >
        cursor
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'CSS aural reference' })

const properties = await cssReferenceAuralProperties()
</script>