<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">HTML Global Attributes</h1>
      <p class="mt-3 text-muted">
        {{ globalAttributes.length }} attributes that are valid on every element. An attribute that only
        works on one element belongs on the
        <NuxtLink to="/reference/html/attributes" class="text-brand hover:underline">attributes page</NuxtLink>.
      </p>
    </header>

    <div class="mt-8">
      <input
        v-model="search"
        type="search"
        placeholder="Search attributes…"
        aria-label="Search global attributes"
        class="w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
      />
    </div>

    <div class="mt-6 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="px-4 py-3 font-semibold">Attribute</th>
            <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="attribute in filtered"
            :key="attribute.attribute"
            class="border-b border-ink-800 align-top last:border-0"
          >
            <td class="px-4 py-2.5 font-mono text-brand">{{ attribute.attribute }}</td>
            <td class="px-4 py-2.5 text-mist-200">
              {{ attribute.description }}
              <DeprecationNote v-if="attribute.deprecated" :note="attribute.deprecated" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p
      v-if="filtered.length === 0"
      class="mt-8 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted"
    >
      Nothing matches “{{ search }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'HTML global attributes',
  description:
    'The attributes valid on every HTML element — id, class, lang, data-* and the rest — with element-specific attributes kept on their own page.',
})

const globalAttributes = await htmlReferenceGlobalAttributes()
const search = ref('')

const term = computed(() => search.value.trim().toLowerCase())
const filtered = computed(() =>
  term.value
    ? globalAttributes.filter((attribute) =>
        `${attribute.attribute} ${attribute.description}`.toLowerCase().includes(term.value),
      )
    : globalAttributes,
)
</script>
