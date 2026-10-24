<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS Default Values</h1>
      <p class="mt-3 text-muted">
        {{ properties.length }} properties with the value they have when nothing sets them, and whether
        descendants inherit it. {{ inherited.length }} properties are inherited.
      </p>
    </header>

    <div class="mt-8 grid gap-3 sm:grid-cols-3">
      <button
        type="button"
        class="rounded-xl border px-4 py-3 text-left text-sm transition"
        :class="onlyInherited ? 'border-brand bg-brand/10 text-mist-50' : 'border-ink-600 bg-ink-900 text-muted hover:border-brand/50'"
        @click="onlyInherited = false"
      >
        All properties
        <span class="mt-1 block font-mono text-xs text-dim">{{ properties.length }}</span>
      </button>
      <button
        type="button"
        class="rounded-xl border px-4 py-3 text-left text-sm transition"
        :class="onlyInherited ? 'border-ink-600 bg-ink-900 text-muted hover:border-brand/50' : 'border-brand bg-brand/10 text-mist-50'"
        @click="onlyInherited = true"
      >
        Inherited only
        <span class="mt-1 block font-mono text-xs text-dim">{{ inherited.length }}</span>
      </button>
      <label class="rounded-xl border border-ink-600 bg-ink-900 px-4 py-3">
        <span class="block text-sm text-muted">Search</span>
        <input
          v-model="search"
          type="search"
          placeholder="Property or initial value…"
          aria-label="Search properties or initial values"
          class="mt-1 w-full bg-transparent font-mono text-xs text-mist-50 outline-none placeholder:text-dim"
        />
      </label>
    </div>

    <p class="mt-4 font-mono text-xs text-dim">{{ filtered.length }} of {{ properties.length }} properties</p>

    <div class="mt-4">
      <PropertyTable :properties="filtered" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'CSS default values',
  description:
    'The initial value of every CSS property and whether descendants inherit it — what an element gets before any stylesheet applies.',
})

const [properties, inherited] = await Promise.all([
  cssReferenceProperties(),
  cssReferenceInherited(),
])

const search = ref('')
const onlyInherited = ref(false)

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  return properties.filter((property) => {
    if (onlyInherited.value && !property.inherits) return false
    if (!term) return true
    return `${property.name} ${property.initial} ${property.description}`.toLowerCase().includes(term)
  })
})
</script>