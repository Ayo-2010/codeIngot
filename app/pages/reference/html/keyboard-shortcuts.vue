<template>
  <div class="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">Keyboard Shortcuts</h1>
      <p class="mt-3 text-muted">
        {{ shortcuts.length }} shortcuts, split between the ones the browser supplies and the ones this site
        adds. The ones worth protecting are Tab order, Enter and Escape, because a page that breaks them is
        unusable without a mouse.
      </p>
    </header>

    <div class="mt-8 space-y-8">
      <section v-for="group in grouped" :key="group.label">
        <h2 class="flex items-baseline gap-3 text-lg font-semibold text-mist-50">
          {{ group.label }}
          <span class="font-mono text-xs font-normal text-dim">{{ group.rows.length }}</span>
        </h2>
        <div class="mt-3 overflow-x-auto rounded-2xl border border-ink-600">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
                <th scope="col" class="w-64 px-4 py-3 font-semibold">Keys</th>
                <th scope="col" class="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in group.rows" :key="row.keys" class="border-b border-ink-800 align-top last:border-0">
                <th scope="row" class="px-4 py-2.5">
                  <span
                    v-for="(key, index) in row.keys.split(' / ')"
                    :key="key"
                    class="mr-1 inline-block whitespace-nowrap rounded-md border border-ink-500 bg-ink-850 px-1.5 py-0.5 font-mono text-xs font-normal text-mist-50 last:mr-0"
                    :class="index > 0 ? 'ml-1' : ''"
                  >
                    {{ key }}
                  </span>
                </th>
                <td class="px-4 py-2.5 text-mist-200">{{ row.action }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">Writing your own</h2>
      <figure class="mt-3 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
        <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6 text-mist-200"><code>{{ example }}</code></pre>
      </figure>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-mist-200">
        <li>
          Listen on <code class="font-mono text-brand">document</code>, not on
          <code class="font-mono text-brand">document.body</code>, or the handler is missing until the body
          exists.
        </li>
        <li>
          Call <code class="font-mono text-brand">preventDefault()</code> only for the specific combination
          you claim, or you break the browser's own shortcuts along the way.
        </li>
        <li>
          Say which modifier is required. A bare letter key is unusable, and a bare function key is taken by
          the browser.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'Keyboard shortcuts' })

const shortcuts = await htmlReferenceKeyboardShortcuts()

const browserKeys = new Set([
  'Tab',
  'Shift + Tab',
  'Enter',
  'Space',
  'Escape',
  'Arrow keys',
  'Home / End',
  'Page Up / Page Down',
  'Ctrl + F',
  'F6',
  'Alt + Left / Right',
  'Ctrl + S',
  'Shift + F11',
  'F12',
  'Ctrl + Shift + I',
  'Ctrl + Shift + M',
  'Ctrl + Shift + C',
])

const grouped = [
  {
    label: 'Navigation and activation',
    rows: shortcuts.filter((row) => browserKeys.has(row.keys)),
  },
  {
    label: 'Browser and this site',
    rows: shortcuts.filter((row) => !browserKeys.has(row.keys)),
  },
].filter((group) => group.rows.length > 0)

const example = `document.addEventListener('keydown', (event) => {
  const isPalette = (event.ctrlKey || event.metaKey) && event.key === 'k'

  if (isPalette) {
    event.preventDefault()
    openPalette()
  }

  if (event.key === 'Escape') {
    closeOverlays()
  }
})`
</script>
