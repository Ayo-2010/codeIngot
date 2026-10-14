<template>
  <section class="overflow-hidden rounded-xl border border-[var(--color-code-border)] bg-[var(--color-code-header-bg)]" aria-label="Code workspace">
    <header class="flex flex-wrap items-center gap-2 border-b border-[var(--color-code-header-border)] bg-[var(--color-code-header-bg)] px-2 py-2">
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft disabled:opacity-50"
          :disabled="running"
          @click="onRun"
        >
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
            <path d="M7 4.5l12 7.5-12 7.5z" />
          </svg>
          Run
        </button>
        <button
          v-if="showCheck"
          type="button"
          class="flex items-center gap-1.5 rounded-lg border border-[var(--color-code-border)] px-3 py-1.5 text-sm font-medium text-[var(--color-code-text)] transition hover:border-brand/50 hover:bg-[var(--color-code-bg)] disabled:opacity-50"
          :disabled="running || checking"
          @click="onCheck"
        >
          <span v-if="checking" class="h-3 w-3 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          {{ checking ? 'Checking' : 'Check' }}
        </button>
        <button
          type="button"
          class="rounded-lg border border-[var(--color-code-border)] px-2.5 py-1.5 text-xs text-[var(--color-code-header-text)] transition hover:text-[var(--color-code-text)]"
          @click="onReset"
        >
          Reset
        </button>
      </div>

      <p class="font-mono text-[11px] text-[var(--color-code-header-text)]">
        <kbd class="rounded border border-[var(--color-code-border)] bg-[var(--color-code-bg)] px-1">Ctrl</kbd> +
        <kbd class="rounded border border-[var(--color-code-border)] bg-[var(--color-code-bg)] px-1">Enter</kbd> to run
      </p>

      <div v-if="statusText" class="ml-auto flex items-center gap-1.5 text-xs" :class="statusTone">
        <span
          class="h-1.5 w-1.5 rounded-full"
          :class="statusTone === 'text-ok' ? 'bg-ok' : statusTone === 'text-bad' ? 'bg-bad' : 'bg-brand'"
        />
        {{ statusText }}
      </div>
    </header>

    <div class="grid min-h-0 gap-px bg-[var(--color-code-border)] lg:grid-cols-2">
      <div class="flex min-h-[320px] flex-col bg-[var(--color-code-bg)]">
        <EditorCodeEditor
          ref="editorRef"
          :model-value="files"
          :active="activeLanguage"
          :tabs="tabs"
          :status="null"
          show-reset
          class="min-h-0 flex-1"
          @update:active="activeLanguage = $event"
          @update:model-value="onEdit"
          @reset="onReset"
          @run="onRun"
        />
      </div>

      <div class="flex min-h-[320px] flex-col bg-[var(--color-code-header-bg)]">
        <div class="flex items-center gap-1 border-b border-[var(--color-code-border)] px-1 py-1">
          <button
            v-for="panel in panels"
            :key="panel.id"
            type="button"
            class="rounded-md px-2.5 py-1 text-xs transition"
            :class="panel.id === activePanel ? 'bg-[var(--color-code-bg)] text-[var(--color-code-text)] ring-1 ring-[var(--color-code-border)]' : 'text-[var(--color-code-header-text)] hover:text-[var(--color-code-text)]'"
            :aria-pressed="panel.id === activePanel"
            @click="activePanel = panel.id"
          >
            {{ panel.label }}
            <span
              v-if="panel.id === 'tests' && testResults.length"
              class="ml-1 font-mono text-[10px] text-brand"
            >
              {{ passedCount }}/{{ testResults.length }}
            </span>
            <span
              v-else-if="panel.id === 'console' && logs.length"
              class="ml-1 font-mono text-[10px] text-dim"
            >
              {{ logs.length }}
            </span>
          </button>
        </div>

        <div v-show="activePanel === 'preview'" class="min-h-0 flex-1">
          <EditorSandboxPreview ref="previewRef" :files="files" :auto-run="true" @result="onResult" />
        </div>

        <div
          v-show="activePanel === 'console'"
          class="min-h-0 flex-1 overflow-auto bg-[var(--color-code-bg)] px-3 py-2 font-mono text-[12px] leading-6 text-[var(--color-code-text)]"
        >
          <p v-if="logs.length === 0" class="text-[var(--color-code-header-text)]">
            Nothing logged yet. Use <code class="text-brand">console.log()</code> and press Run.
          </p>
          <ul v-else class="space-y-0.5">
            <li v-for="(entry, index) in logs" :key="index" :class="logTone(entry.level)">
              <span class="mr-2 select-none text-[var(--color-code-header-text)]">{{ String(index + 1).padStart(2, '0') }}</span>
              {{ entry.text }}
            </li>
          </ul>
          <p v-if="runtimeError" class="mt-3 rounded border border-bad/40 bg-bad/10 px-2 py-1 text-bad">
            {{ runtimeError }}
          </p>
        </div>

        <div v-show="activePanel === 'tests'" class="min-h-0 flex-1 overflow-auto p-3">
          <p v-if="testResults.length === 0" class="text-sm text-[var(--color-code-header-text)]">
            Press <span class="text-[var(--color-code-text)]">Check</span> to run the tests for this exercise.
          </p>
          <template v-else>
            <p
              class="mb-3 text-sm"
              :class="passedCount === testResults.length ? 'text-ok' : 'text-[var(--color-code-text)]'"
            >
              {{ passedCount }} of {{ testResults.length }} tests passed.
            </p>
            <ul class="space-y-2">
              <li
                v-for="test in testResults"
                :key="test.id"
                class="rounded-lg border px-3 py-2 text-sm"
                :class="test.passed ? 'border-ok/30 bg-ok/5' : 'border-bad/30 bg-bad/5'"
              >
                <p class="flex items-center gap-2">
                  <span :class="test.passed ? 'text-ok' : 'text-bad'" aria-hidden="true">
                    {{ test.passed ? '✓' : '✗' }}
                  </span>
                  <span class="sr-only">{{ test.passed ? 'Passed' : 'Failed' }}:</span>
                  <span class="text-[var(--color-code-text)]">{{ test.label }}</span>
                </p>
                <p v-if="test.message && !test.passed" class="mt-1 pl-6 text-xs text-[var(--color-code-header-text)]">
                  {{ test.message }}
                </p>
              </li>
            </ul>
            <p
              v-if="exercise?.testNotes"
              class="mt-3 rounded-lg border border-[var(--color-code-border)] bg-[var(--color-code-header-bg)] px-3 py-2 text-xs leading-relaxed text-[var(--color-code-header-text)]"
            >
              {{ exercise.testNotes }}
            </p>
          </template>
        </div>
      </div>
    </div>

    <footer v-if="showCheck" class="border-t border-[var(--color-code-border)] bg-[var(--color-code-header-bg)] px-3 py-2">
      <div class="flex flex-wrap items-center gap-2">
        <p class="text-xs text-muted">
          Stuck? Hints get more explicit each time.
        </p>
        <button
          v-for="(_, index) in exercise?.hints ?? []"
          :key="index"
          type="button"
          class="rounded-md border border-ink-600 px-2 py-1 text-xs text-muted transition hover:border-brand/40 hover:text-mist-50 disabled:opacity-40"
          :disabled="revealedHints > index"
          @click="revealedHints++"
        >
          {{ revealedHints > index ? `Hint ${index + 1}` : `Reveal hint ${index + 1}` }}
        </button>
        <button
          v-if="exercise?.solution"
          type="button"
          class="rounded-md border border-ink-600 px-2 py-1 text-xs text-muted transition hover:border-warn/50 hover:text-warn"
          @click="showSolution = !showSolution"
        >
          {{ showSolution ? 'Hide solution' : 'Show solution' }}
        </button>
      </div>
      <ol v-if="revealedHints > 0" class="mt-2 space-y-1">
        <li
          v-for="(hint, index) in exercise?.hints.slice(0, revealedHints) ?? []"
          :key="index"
          class="text-xs text-mist-200"
        >
          <span class="font-mono text-brand">Hint {{ index + 1 }}.</span> {{ hint }}
        </li>
      </ol>
      <pre
        v-if="showSolution && exercise?.solution"
        class="mt-2 overflow-auto rounded-lg border border-ink-600 bg-ink-950 p-3 font-mono text-[11.5px] leading-5 text-mist-200"
      ><code>{{ solutionText }}</code></pre>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { CodingExercise, EditorLanguage } from '~/types/content'
import type { SandboxLog, SandboxRunResult, SandboxTestResult } from '~/utils/sandbox'

const props = withDefaults(
  defineProps<{
    files: Partial<Record<EditorLanguage, string>>
    starterCode?: Partial<Record<EditorLanguage, string>>
    exercise?: CodingExercise
    activeLanguage?: EditorLanguage
    showCheck?: boolean
  }>(),
  { activeLanguage: 'html', showCheck: false },
)

const emit = defineEmits<{
  'update:files': [value: Partial<Record<EditorLanguage, string>>]
  'update:activeLanguage': [value: EditorLanguage]
  passed: [result: SandboxRunResult]
  'check-result': [result: SandboxRunResult]
  result: [result: SandboxRunResult]
}>()

const editorRef = ref<{ focus: () => void } | null>(null)
const previewRef = ref<{ run: (tests?: unknown[]) => Promise<SandboxRunResult> } | null>(null)

const localFiles = ref<Partial<Record<EditorLanguage, string>>>({ ...props.files })
const active = ref<EditorLanguage>(props.activeLanguage)
const activePanel = ref<'preview' | 'console' | 'tests'>('preview')
const logs = ref<SandboxLog[]>([])
const runtimeError = ref<string | null>(null)
const testResults = ref<SandboxTestResult[]>([])
const running = ref(false)
const checking = ref(false)
const revealedHints = ref(0)
const showSolution = ref(false)

const files = computed({
  get: () => localFiles.value,
  set: (value) => {
    localFiles.value = value
    emit('update:files', value)
  },
})

const activeLanguage = computed({
  get: () => active.value,
  set: (value) => {
    active.value = value
    emit('update:activeLanguage', value)
  },
})

/**
 * The parent can replace the files — a new exercise, a project
 * switch — but it also hands over a fresh object on every
 * render. Only a real change to the contents may reset the
 * editor, or a parent re-render would wipe what was typed.
 */
watch(
  () => props.files,
  (value) => {
    if (sameFiles(value, localFiles.value)) return
    localFiles.value = { ...value }
  },
)

function sameFiles(
  a: Partial<Record<EditorLanguage, string>>,
  b: Partial<Record<EditorLanguage, string>>,
): boolean {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)])
  for (const key of keys) {
    if ((a as Record<string, string | undefined>)[key] !== (b as Record<string, string | undefined>)[key]) {
      return false
    }
  }
  return true
}

watch(
  () => props.activeLanguage,
  (value) => {
    active.value = value
  },
)

watch(
  () => props.exercise?.id,
  () => {
    revealedHints.value = 0
    showSolution.value = false
    testResults.value = []
  },
)

const tabs = computed(() => {
  const available: EditorLanguage[] = ['html', 'css', 'javascript']
  const wanted = props.exercise?.languages ?? available
  return wanted.map((language) => ({
    id: language,
    label: language === 'javascript' ? 'JS' : language.toUpperCase(),
  }))
})

const panels = computed(() => {
  const list: { id: typeof activePanel.value; label: string }[] = [{ id: 'preview', label: 'Preview' }]
  list.push({ id: 'console', label: 'Console' })
  if (props.showCheck) list.push({ id: 'tests', label: 'Tests' })
  return list
})

const passedCount = computed(() => testResults.value.filter((test) => test.passed).length)

const statusText = computed(() => {
  if (running.value) return 'Running…'
  if (checking.value) return 'Running tests…'
  if (runtimeError.value) return 'Runtime error'
  if (testResults.value.length > 0) {
    return passedCount.value === testResults.value.length
      ? 'All tests passed'
      : `${passedCount.value}/${testResults.value.length} tests passed`
  }
  return null
})

const statusTone = computed(() => {
  if (runtimeError.value) return 'text-bad'
  if (testResults.value.length && passedCount.value === testResults.value.length) return 'text-ok'
  return 'text-muted'
})

const solutionText = computed(() => {
  const solution = props.exercise?.solution ?? {}
  return Object.entries(solution)
    .map(([language, code]) => `/* ${language} */\n${code}`)
    .join('\n\n')
})

function logTone(level: SandboxLog['level']) {
  if (level === 'error') return 'text-bad'
  if (level === 'warn') return 'text-warn'
  if (level === 'info' || level === 'debug') return 'text-info'
  return 'text-mist-200'
}

function onEdit(value: Partial<Record<EditorLanguage, string>>) {
  files.value = value
}

async function onRun() {
  running.value = true
  try {
    await previewRef.value?.run()
  } finally {
    running.value = false
  }
}

async function onCheck() {
  const exercise = props.exercise
  if (!exercise) return
  checking.value = true
  activePanel.value = 'tests'
  try {
    const result = await previewRef.value?.run(exercise.tests)
    if (!result) return
    testResults.value = result.tests
    runtimeError.value = result.runtimeError
    if (result.tests.length > 0 && result.tests.every((test) => test.passed)) {
      emit('passed', result)
    }
    emit('check-result', result)
  } finally {
    checking.value = false
  }
}

function onReset() {
  const starter = props.starterCode ?? {}
  files.value = { ...starter }
  testResults.value = []
  revealedHints.value = 0
  showSolution.value = false
}

function onResult(result: SandboxRunResult) {
  logs.value = result.logs
  runtimeError.value = result.runtimeError
  emit('result', result)
}

defineExpose({ runAll: onRun, check: onCheck })

onMounted(() => {
  // Only take focus when nothing else has it, so navigating to a
  // lesson never pulls the learner out of a link or a button.
  if (document.activeElement === document.body) editorRef.value?.focus()
})
</script>