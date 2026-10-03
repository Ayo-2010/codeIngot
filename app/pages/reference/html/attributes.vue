<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">HTML Attributes</h1>
      <p class="mt-3 text-muted">
        {{ attributes.length }} attributes that belong to particular elements. Anything valid on every
        element is on the
        <NuxtLink to="/reference/html/global-attributes" class="text-brand hover:underline">
          global attributes
        </NuxtLink>
        page instead.
      </p>
    </header>

    <div class="mt-8">
      <input
        v-model="search"
        type="search"
        placeholder="Search attributes…"
        aria-label="Search attributes"
        class="w-full max-w-xs rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
      />
    </div>

    <div class="mt-6">
      <AttributeTable :attributes="filtered" />
    </div>

    <p v-if="filtered.length === 0" class="mt-8 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      Nothing matches “{{ search }}”.
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTML attributes' })

const attributes = htmlReferenceAttributes()
const search = ref('')

const term = computed(() => search.value.trim().toLowerCase())
const filtered = computed(() =>
  term.value
    ? attributes.filter((attribute) =>
        `${attribute.attribute} ${attribute.belongsTo} ${attribute.description}`.toLowerCase().includes(term.value),
      )
    : attributes,
)
</script>
