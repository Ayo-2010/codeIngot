<template>
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <template v-if="page">
      <nav class="text-xs text-dim" aria-label="Breadcrumb">
        <NuxtLink to="/reference/css" class="hover:text-brand">CSS</NuxtLink>
        <span class="px-1.5">/</span>
        <span class="text-muted">{{ page.property }}</span>
      </nav>

      <header class="mt-4">
        <h1 class="font-mono text-3xl font-semibold tracking-tight text-mist-50">{{ page.property }}</h1>
        <p class="mt-1 font-mono text-xs text-dim">{{ meta?.category ?? 'CSS property' }}</p>
        <p class="mt-4 text-lg leading-relaxed text-mist-200">{{ page.usage }}</p>
        <DeprecationNote v-if="meta?.deprecated" :note="meta.deprecated" class="mt-4" />
      </header>

      <dl v-if="meta" class="mt-6 grid gap-3 sm:grid-cols-2">
        <div class="rounded-xl border border-ink-600 bg-ink-900 px-4 py-3">
          <dt class="font-mono text-[11px] uppercase tracking-wider text-dim">Initial value</dt>
          <dd class="mt-1 font-mono text-sm text-mist-50">{{ meta.initial }}</dd>
        </div>
        <div class="rounded-xl border border-ink-600 bg-ink-900 px-4 py-3">
          <dt class="font-mono text-[11px] uppercase tracking-wider text-dim">Inherited</dt>
          <dd class="mt-1 font-mono text-sm text-mist-50">{{ meta.inherits ? 'yes' : 'no' }}</dd>
        </div>
      </dl>

      <section class="mt-8">
        <h2 class="text-sm font-semibold text-mist-50">Example</h2>
        <figure class="mt-3 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
          <figcaption
            class="flex items-center justify-between border-b border-ink-600 bg-ink-850 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-dim"
          >
            <span>{{ page.example.language }}</span>
            <button type="button" class="hover:text-brand" @click="copy(page.example.code)">Copy</button>
          </figcaption>
          <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6"><code><span
              v-for="(token, index) in tokens"
              :key="index"
              :class="TOKEN_CLASS[token.kind]"
            >{{ token.value }}</span></code></pre>
        </figure>
      </section>

      <section class="mt-8">
        <h2 class="text-sm font-semibold text-mist-50">Browser support</h2>
        <div class="mt-3 overflow-x-auto rounded-2xl border border-ink-600">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
                <th scope="col" class="px-4 py-3 font-semibold">Browser</th>
                <th scope="col" class="px-4 py-3 font-semibold">First version</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in page.support"
                :key="row.browser"
                class="border-b border-ink-800 last:border-0"
              >
                <th scope="row" class="px-4 py-2.5 font-medium text-mist-50">{{ row.browser }}</th>
                <td class="px-4 py-2.5 font-mono" :class="row.version === 'No' ? 'text-warn' : 'text-ok'">
                  {{ row.version === 'No' ? 'Not supported' : row.version }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-2 text-xs text-dim">
          Versions are the first release with usable support. “Not supported” means the property never
          reached a stable release in that browser.
        </p>
      </section>

      <section v-if="related.length" class="mt-8">
        <h2 class="text-sm font-semibold text-mist-50">Related</h2>
        <div class="mt-3 flex flex-wrap gap-2">
          <NuxtLink
            v-for="item in related"
            :key="item.to"
            :to="item.to"
            class="rounded-lg border border-ink-600 bg-ink-900 px-2.5 py-1 font-mono text-xs text-muted transition hover:border-brand/50 hover:text-brand"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </section>

      <nav class="mt-10 flex items-center justify-between gap-4 border-t border-ink-600 pt-6" aria-label="Adjacent properties">
        <NuxtLink
          v-if="previous"
          :to="previous.to"
          class="rounded-lg border border-ink-600 px-3 py-2 font-mono text-xs text-muted transition hover:border-brand/50 hover:text-brand"
        >
          ← {{ previous.label }}
        </NuxtLink>
        <span v-else />
        <NuxtLink
          v-if="next"
          :to="next.to"
          class="rounded-lg border border-ink-600 px-3 py-2 font-mono text-xs text-muted transition hover:border-brand/50 hover:text-brand"
        >
          {{ next.label }} →
        </NuxtLink>
      </nav>
    </template>

    <div v-else class="py-20 text-center">
      <h1 class="text-2xl font-semibold text-mist-50">No page for “{{ slug }}”</h1>
      <p class="mt-2 text-muted">
        That property is not in the reference. Browse the list instead.
      </p>
      <NuxtLink
        to="/reference/css"
        class="mt-6 inline-block rounded-lg border border-brand/50 px-4 py-2 text-sm text-brand hover:bg-brand/10"
      >
        All CSS properties
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TOKEN_CLASS, highlight } from '~/utils/highlight'

definePageMeta({ layout: 'reference' })

const route = useRoute()
const slug = computed(() => String(route.params.property ?? ''))

const properties = cssReferenceProperties()
const pages = cssReferencePropertyPages()

const page = computed(() => cssReferencePropertyPage(slug.value))
const meta = computed(() => properties.find((property) => cssReferencePropertySlug(property.name) === slug.value))

const tokens = computed(() => highlight(page.value?.example.code ?? '', page.value?.example.language ?? 'css'))

// Only link to related properties that actually have a page, so no link dead-ends.
const related = computed(() =>
  (page.value?.related ?? []).map((name) => ({
    label: name,
    to: `/reference/css/property/${cssReferencePropertySlug(name)}`,
  })),
)

const position = computed(() =>
  pages.findIndex((entry) => cssReferencePropertySlug(entry.property) === slug.value),
)
const previous = computed(() => (position.value > 0 ? link(pages[position.value - 1]!) : null))
const next = computed(() =>
  position.value >= 0 && position.value < pages.length - 1 ? link(pages[position.value + 1]!) : null,
)

function link(entry: { property: string }) {
  return { label: entry.property, to: `/reference/css/property/${cssReferencePropertySlug(entry.property)}` }
}

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
}

useHead({ title: computed(() => page.value?.property ?? 'Property not found') })
</script>