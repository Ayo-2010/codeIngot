<template>
  <!--
    A definite height (`h-screen`, not `min-h-screen`) is what lets the iframe
    fill the space: `h-full` only resolves against an ancestor with a definite
    height. The middle strip scrolls instead of the page, so the header stays put.
  -->
  <div class="flex h-screen flex-col overflow-hidden">
    <header class="shrink-0 border-b border-ink-600 bg-ink-900/95">
      <div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
        <NuxtLink
          :to="`/projects/${slug}`"
          class="flex items-center gap-1.5 text-sm text-muted transition hover:text-brand"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ project?.title ?? 'Project' }}
        </NuxtLink>

        <h1 class="text-sm font-semibold text-mist-50">Design reference</h1>

        <div class="ml-auto flex flex-wrap items-center gap-1.5">
          <span class="font-mono text-[11px] uppercase tracking-wider text-dim">Width</span>
          <button
            v-for="preset in widthPresets"
            :key="preset.id"
            type="button"
            class="rounded-lg border px-2.5 py-1 font-mono text-[11px] transition"
            :class="
              width === preset.id
                ? 'border-brand bg-brand/10 text-brand'
                : 'border-ink-600 text-muted hover:border-brand/40 hover:text-mist-50'
            "
            :aria-pressed="width === preset.id"
            @click="width = preset.id"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </header>

    <div
      v-if="project"
      class="flex flex-1 justify-center overflow-auto bg-ink-950 px-4 py-6 sm:px-6"
    >
      <iframe
        class="h-full max-w-full shrink-0 rounded-2xl border border-ink-600 bg-white shadow-2xl transition-[width] duration-300"
        :class="frameWidth"
        title="Design reference"
        sandbox="allow-scripts"
        :srcdoc="designDoc"
      />
    </div>

    <div v-else class="mx-auto max-w-3xl px-4 py-24 text-center">
      <h2 class="text-2xl font-semibold text-mist-50">Project not found</h2>
      <NuxtLink to="/projects" class="mt-4 inline-block text-sm text-brand">Back to projects</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { designDocument } from '~/utils/project-design'
import { loadProject } from '~/content/projects/load'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data: project } = await useAsyncData(`project-design:${slug.value}`, () =>
  loadProject(slug.value),
)

usePageSeo({
  title: computed(() =>
    project.value ? `${project.value.title} · Design reference` : 'Design reference',
  ),
  description: computed(
    () =>
      project.value?.summary ??
      'A browser-framed design reference for a guided frontend project.',
  ),
  type: 'article',
})

// Fixed pixel widths rather than responsive ones: the point of the presets is to
// show the reference at an exact breakpoint, and `max-w-full` keeps it inside a
// narrow window.
const widthPresets = [
  { id: 'mobile', label: '360', frame: 'w-[360px]' },
  { id: 'tablet', label: '720', frame: 'w-[720px]' },
  { id: 'desktop', label: '1280', frame: 'w-[1280px]' },
] as const

type WidthPreset = (typeof widthPresets)[number]['id']
const width = ref<WidthPreset>('desktop')

const frameWidth = computed(
  () => widthPresets.find((preset) => preset.id === width.value)?.frame ?? 'w-full',
)

const designDoc = computed(() => (project.value ? designDocument(project.value) : ''))
</script>
