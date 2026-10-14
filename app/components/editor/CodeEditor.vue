<template>
  <div class="flex h-full min-h-0 flex-col bg-[var(--color-code-bg)]">
    <div class="flex items-center gap-1 border-b border-[var(--color-code-border)] px-1 py-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="rounded-md px-2.5 py-1 font-mono text-xs transition"
        :class="
          tab.id === active
            ? 'bg-[var(--color-code-header-bg)] text-[var(--color-code-text)] ring-1 ring-[var(--color-code-border)]'
            : 'text-[var(--color-code-header-text)] hover:text-[var(--color-code-text)]'
        "
        :aria-pressed="tab.id === active"
        @click="$emit('update:active', tab.id)"
      >
        {{ tab.label }}
      </button>
      <div class="ml-auto flex items-center gap-1">
        <button
          v-if="showReset"
          type="button"
          class="rounded-md p-1.5 text-[var(--color-code-header-text)] transition hover:bg-[var(--color-code-bg)] hover:text-[var(--color-code-text)]"
          title="Reset to the starter code"
          @click="$emit('reset')"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M4 10a8 8 0 1 1 2 6" stroke-linecap="round" />
            <path d="M4 5v5h5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="sr-only">Reset</span>
        </button>
        <button
          type="button"
          class="rounded-md p-1.5 text-[var(--color-code-header-text)] transition hover:bg-[var(--color-code-bg)] hover:text-[var(--color-code-text)]"
          title="Copy code"
          @click="copy"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" stroke-linecap="round" />
          </svg>
          <span class="sr-only">Copy</span>
        </button>
        <button
          type="button"
          class="rounded-md px-2 py-1 font-mono text-[11px] text-[var(--color-code-header-text)] transition hover:bg-[var(--color-code-bg)] hover:text-[var(--color-code-text)]"
          title="Format the code (Alt+Shift+F)"
          @click="format"
        >
          Format
        </button>
      </div>
    </div>

    <div class="relative flex min-h-0 flex-1 overflow-hidden">
      <div
        class="pointer-events-none select-none overflow-hidden border-r border-[var(--color-code-border)] bg-[var(--color-code-header-bg)]/60 px-2 py-3 text-right font-mono text-[12.5px] leading-6 text-[var(--color-code-header-text)]"
        aria-hidden="true"
      >
        <div :style="{ transform: `translateY(${-scrollTop}px)` }">
          <div v-for="line in lineCount" :key="line" class="h-6 tabular-nums">{{ line }}</div>
        </div>
      </div>

      <div class="relative min-w-0 flex-1">
        <pre
          ref="highlightEl"
          class="pointer-events-none absolute inset-0 overflow-hidden px-3 py-3 font-mono text-[12.5px] leading-6 text-[var(--color-code-text)]"
          aria-hidden="true"
        ><code><span
            v-for="(token, index) in tokens"
            :key="index"
            :class="tokenClass(token.kind)"
          >{{ token.value }}</span><span v-if="code.endsWith('\n')"> </span></code></pre>
        <textarea
          ref="textareaEl"
          :value="code"
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          autocorrect="off"
          wrap="off"
          class="absolute inset-0 h-full w-full resize-none overflow-auto whitespace-pre bg-transparent px-3 py-3 font-mono text-[12.5px] leading-6 text-transparent caret-brand outline-none selection:bg-brand/25"
          :aria-label="`${active.toUpperCase()} code editor`"
          @input="onInput"
          @scroll="onScroll"
          @keydown="onKeydown"
        />
      </div>
    </div>

    <p
      v-if="error"
      class="border-t border-bad/40 bg-bad/10 px-3 py-2 font-mono text-[11.5px] text-bad"
      role="alert"
    >
      {{ error }}
    </p>
    <p
      v-else-if="status"
      class="border-t border-ink-600 px-3 py-2 font-mono text-[11.5px] text-muted"
      aria-live="polite"
    >
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { EditorLanguage } from '~/types/content'
import { TOKEN_CLASS, highlight, type TokenKind } from '~/utils/highlight'

const props = defineProps<{
  modelValue: Partial<Record<EditorLanguage, string>>
  active: EditorLanguage
  tabs: { id: EditorLanguage; label: string }[]
  error?: string | null
  status?: string | null
  showReset?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Partial<Record<EditorLanguage, string>>]
  'update:active': [value: EditorLanguage]
  reset: []
  run: []
}>()

const textareaEl = ref<HTMLTextAreaElement | null>(null)
const highlightEl = ref<HTMLElement | null>(null)
const scrollTop = ref(0)

const code = computed(() => props.modelValue[props.active] ?? '')
const tokens = computed(() => highlight(code.value, props.active))
const lineCount = computed(() => Math.max(1, code.value.split('\n').length))

function tokenClass(kind: TokenKind) {
  return TOKEN_CLASS[kind]
}

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', { ...props.modelValue, [props.active]: target.value })
}

function onScroll() {
  scrollTop.value = textareaEl.value?.scrollTop ?? 0
  if (highlightEl.value) highlightEl.value.scrollTop = scrollTop.value
}

function setValue(next: string, caret?: number) {
  emit('update:modelValue', { ...props.modelValue, [props.active]: next })
  if (caret !== undefined) {
    nextTick(() => {
      const el = textareaEl.value
      if (!el) return
      el.selectionStart = caret
      el.selectionEnd = caret
    })
  }
}

function onKeydown(event: KeyboardEvent) {
  const el = event.target as HTMLTextAreaElement
  if (event.key === 'Tab') {
    event.preventDefault()
    const start = el.selectionStart
    const end = el.selectionEnd
    if (event.shiftKey) {
      const lineStart = code.value.lastIndexOf('\n', start - 1) + 1
      const prefix = code.value.slice(lineStart, lineStart + 2)
      if (prefix === '  ') {
        setValue(code.value.slice(0, lineStart) + code.value.slice(lineStart + 2))
        nextTick(() => {
          el.selectionStart = Math.max(lineStart, start - 2)
          el.selectionEnd = Math.max(lineStart, end - 2)
        })
      }
      return
    }
    setValue(`${code.value.slice(0, start)}  ${code.value.slice(end)}`, start + 2)
    return
  }
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault()
    emit('run')
  }
}

function format() {
  const lines = code.value.split('\n')
  let indent = 0
  const formatted = lines
    .map((line) => {
      const trimmed = line.trim()
      if (/^[}\])]/.test(trimmed)) indent = Math.max(0, indent - 1)
      const result = `${'  '.repeat(indent)}${trimmed}`
      const opens = (trimmed.match(/[{[(]/g) ?? []).length
      const closes = (trimmed.match(/[}\])]/g) ?? []).length
      indent = Math.max(0, indent + opens - closes)
      return result
    })
    .join('\n')
  setValue(formatted)
}

async function copy() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(code.value)
  } catch {
    /* clipboard blocked */
  }
}

function focus() {
  textareaEl.value?.focus()
}

defineExpose({ focus })
</script>