<template>
  <div class="mx-auto max-w-3xl px-4 py-12 sm:px-6">
    <template v-if="page">
      <nav class="text-xs text-dim" aria-label="Breadcrumb">
        <NuxtLink to="/reference/html" class="hover:text-brand">HTML</NuxtLink>
        <span class="px-1.5">/</span>
        <span class="text-muted">{{ page.tag }}</span>
      </nav>

      <header class="mt-4">
        <h1 class="font-mono text-3xl font-semibold tracking-tight text-mist-50">{{ page.tag }}</h1>
        <p class="mt-1 font-mono text-xs text-dim">{{ meta?.category ?? 'HTML element' }}</p>
        <p class="mt-4 text-lg leading-relaxed text-mist-200">{{ page.usage }}</p>
        <DeprecationNote v-if="meta?.deprecated" :note="meta.deprecated" class="mt-4" />
      </header>

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
          Versions are the first release with usable support. “Not supported” means the element never
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

      <nav class="mt-10 flex items-center justify-between gap-4 border-t border-ink-600 pt-6" aria-label="Adjacent tags">
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
        That tag is not in the reference. Browse the list instead.
      </p>
      <NuxtLink
        to="/reference/html"
        class="mt-6 inline-block rounded-lg border border-brand/50 px-4 py-2 text-sm text-brand hover:bg-brand/10"
      >
        All HTML elements
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { htmlTags } from '~/content/reference/html'
import { findHtmlTagPage, htmlTagPages, tagSlug } from '~/content/reference/html-tag-pages'
import { TOKEN_CLASS, highlight } from '~/utils/highlight'

definePageMeta({ layout: 'reference' })

const route = useRoute()
const slug = computed(() => String(route.params.tag ?? ''))

const page = computed(() => findHtmlTagPage(slug.value))
const meta = computed(() => htmlTags.find((tag) => tagSlug(tag.tag) === slug.value))

const tokens = computed(() => highlight(page.value?.example.code ?? '', page.value?.example.language ?? 'html'))

// Only link to related tags that actually have a page, so no link dead-ends.
const related = computed(() =>
  (page.value?.related ?? [])
    .map((tag) => ({ label: tag, to: `/reference/html/tag/${tagSlug(tag)}` }))
    .filter((item) => htmlTagPages.some((entry) => tagSlug(entry.tag) === tagSlug(item.label))),
)

const position = computed(() => htmlTagPages.findIndex((entry) => tagSlug(entry.tag) === slug.value))
const previous = computed(() => (position.value > 0 ? link(htmlTagPages[position.value - 1]!) : null))
const next = computed(() =>
  position.value >= 0 && position.value < htmlTagPages.length - 1 ? link(htmlTagPages[position.value + 1]!) : null,
)

function link(entry: { tag: string }) {
  return { label: entry.tag, to: `/reference/html/tag/${tagSlug(entry.tag)}` }
}

async function copy(code: string) {
  await navigator.clipboard.writeText(code)
}

useHead({ title: computed(() => page.value?.tag ?? 'Tag not found') })
</script>
