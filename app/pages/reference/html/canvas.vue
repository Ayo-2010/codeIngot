<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Canvas</h1>
      <p class="mt-3 text-muted">
        A canvas is a bitmap, not a set of shapes. Once you draw, the only way to change it is to clear it
        and draw again, and the context transform has to be saved and restored or the whole page ends up
        rotated.
      </p>
    </header>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">First lines</h2>
      <figure class="mt-3 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
        <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6 text-mist-200"><code>{{ firstLines }}</code></pre>
      </figure>
      <p class="mt-2 text-sm text-muted">
        Width and height are attributes, and they set the backing store. Style width and height separately
        when you want the canvas scaled by CSS.
      </p>
    </section>

    <div class="mt-8 flex gap-1 rounded-lg border border-ink-600 bg-ink-900 p-1" role="tablist" aria-label="Context members">
      <button
        v-for="tab in tabs"
        :id="`canvas-tab-${tab.id}`"
        :key="tab.id"
        type="button"
        role="tab"
        :aria-selected="view === tab.id"
        :aria-controls="`canvas-panel-${tab.id}`"
        :tabindex="view === tab.id ? 0 : -1"
        class="rounded-md px-3 py-1.5 text-sm transition"
        :class="view === tab.id ? 'bg-brand/15 text-brand' : 'text-muted hover:text-mist-50'"
        @click="view = tab.id"
      >
        {{ tab.label }}
        <span class="ml-1 font-mono text-xs text-dim">{{ tab.count }}</span>
      </button>
    </div>

    <div
      v-for="tab in tabs"
      v-show="view === tab.id"
      :id="`canvas-panel-${tab.id}`"
      :key="tab.id"
      role="tabpanel"
      :aria-labelledby="`canvas-tab-${tab.id}`"
      class="mt-6 overflow-x-auto rounded-2xl border border-ink-600"
    >
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="w-1/3 px-4 py-3 font-semibold">Name</th>
            <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member in listFor(tab.id)"
            :key="member.name"
            class="border-b border-ink-800 align-top last:border-0"
          >
            <td class="px-4 py-2.5 font-mono text-brand">{{ member.name }}</td>
            <td class="px-4 py-2.5 text-mist-200">{{ member.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HtmlCanvasMember } from '~/types/content'

definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'HTML canvas',
  description:
    'How the HTML canvas element works: a bitmap you draw on with JavaScript, width and height as attributes and context transforms you must save and restore.',
})

const { members, properties } = await htmlReferenceCanvas()
const view = ref<'methods' | 'properties'>('methods')

const tabs = computed(() => [
  { id: 'methods' as const, label: 'Methods', count: members.length },
  { id: 'properties' as const, label: 'Properties', count: properties.length },
])

function listFor(id: 'methods' | 'properties'): HtmlCanvasMember[] {
  return id === 'methods' ? members : properties
}

const firstLines = `<canvas id="chart" width="600" height="300"></canvas>

<script>
  const canvas = document.querySelector('#chart')
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#1a73e8'
  ctx.fillRect(20, 20, 160, 80)
<\/script>`
</script>
