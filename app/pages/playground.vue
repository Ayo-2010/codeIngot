<template>
  <div class="mx-auto max-w-[1800px] px-4 py-10 sm:px-6">
    <header class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight sm:text-3xl">Playground</h1>
        <p class="mt-2 max-w-2xl text-sm text-muted">
          A free experimentation space. Your code runs in an isolated frame — it cannot touch this
          page — and the console tab captures everything it prints.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          class="rounded-lg border border-ink-600 px-3 py-2 text-sm text-muted transition hover:text-mist-50"
          @click="reset"
        >
          Reset
        </button>
        <button
          type="button"
          class="rounded-lg border border-ink-600 px-3 py-2 text-sm text-muted transition hover:text-mist-50"
          @click="workspace?.clearConsole()"
        >
          Clear console
        </button>
        <button
          type="button"
          class="flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
          @click="workspace?.runAll()"
        >
          Run
        </button>
      </div>
    </header>

    <EditorCodeWorkspace
      ref="workspace"
      v-model:files="files"
      v-model:active-language="activeLanguage"
      class="mt-6"
    />

    <div class="mt-4 flex flex-wrap gap-4 text-xs text-dim">
      <p>
        <kbd class="rounded border border-ink-600 bg-ink-900 px-1 font-mono">Ctrl</kbd> +
        <kbd class="rounded border border-ink-600 bg-ink-900 px-1 font-mono">Enter</kbd> run
      </p>
      <p><kbd class="rounded border border-ink-600 bg-ink-900 px-1 font-mono">Tab</kbd> indent</p>
      <p>
        Later: save a project, export the files, or share a link to this exact setup.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { EditorLanguage } from '~/types/content'

usePageSeo({
  title: 'Playground',
  description:
    'Write HTML, CSS and JavaScript in a live browser playground and see the result immediately, with no setup.',
})

const starterHtml = `<main>
  <h1>Playground</h1>
  <p>Edit the HTML, CSS or JavaScript and press Run.</p>
  <button id="go" type="button">Try it</button>
  <p id="out" role="status"></p>
</main>`

const starterCss = `body {
  font-family: system-ui, sans-serif;
  display: grid;
  gap: 0.75rem;
  padding: 2rem;
  background: #0b0d10;
  color: #f4f7fa;
}

button {
  width: fit-content;
  padding: 0.5rem 1rem;
  border: 1px solid #29e2bd;
  border-radius: 8px;
  background: transparent;
  color: #29e2bd;
  font: inherit;
  cursor: pointer;
}`

const starterJs = `const button = document.querySelector('#go');
const out = document.querySelector('#out');

let clicks = 0;

button.addEventListener('click', () => {
  clicks += 1;
  out.textContent = \`Clicked \${clicks} time\${clicks === 1 ? '' : 's'}\`;
  console.log('click', clicks);
});

console.log('Playground ready');`

const files = ref<Partial<Record<EditorLanguage, string>>>({
  html: starterHtml,
  css: starterCss,
  javascript: starterJs,
})
const activeLanguage = ref<EditorLanguage>('html')

const workspace = ref<{ runAll: () => Promise<void>; clearConsole: () => void } | null>(null)

function reset() {
  files.value = { html: starterHtml, css: starterCss, javascript: starterJs }
  workspace.value?.clearConsole()
}
</script>