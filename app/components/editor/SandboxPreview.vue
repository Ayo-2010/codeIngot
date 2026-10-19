<template>
  <iframe
    ref="frameEl"
    class="h-full w-full bg-white"
    title="Preview of your code"
    sandbox="allow-scripts allow-modals allow-forms allow-popups"
    referrerpolicy="no-referrer"
  />
</template>

<script setup lang="ts">
import type { ExerciseFile } from '~/types/content'
import type { SandboxModule } from '~/utils/module-registry'
import { createSandboxRunner, type SandboxRunResult } from '~/utils/sandbox'
import { SCRIPT_PRIORITY, transpileScript } from '~/utils/transpile'
import {
  entryPath,
  mountsForPreview,
  pageCss,
  pageHtml,
  scriptFiles,
} from '~/utils/exercise-files'
import { loadReactRuntime } from '~/utils/react-runtime'

const props = withDefaults(
  defineProps<{
    /** The exercise's files, normalised by the workspace before they get here. */
    files: ExerciseFile[]
    /**
     * Run the files as real modules, with `import` between them. True for a
     * multi-file exercise. The single-script shorthand stays false, because a
     * classic inline script cannot import anything.
     */
    modules?: boolean
    /** The file to run first, when the exercise names one. */
    entry?: string
    /**
     * Props for the preview when the exercise's default export is a component.
     * Present only when the exercise declared them, and only then does the
     * sandbox mount anything.
     */
    previewProps?: Record<string, unknown>
    tests?: { id: string; label: string; body: string }[]
    autoRun?: boolean
  }>(),
  { autoRun: true, modules: false },
)

const emit = defineEmits<{ result: [SandboxRunResult] }>()

const frameEl = ref<HTMLIFrameElement | null>(null)
const runner = createSandboxRunner()
let timer: ReturnType<typeof setTimeout> | null = null
let token = 0

/** The one script a classic exercise runs, chosen the way the editor chose it. */
function legacyScript(): ExerciseFile | null {
  const scripts = scriptFiles(props.files)
  for (const language of SCRIPT_PRIORITY) {
    const file = scripts.find(
      (candidate) => candidate.language === language && candidate.content.length > 0,
    )
    if (file) return file
  }
  return null
}

function failedResult(message: string): SandboxRunResult {
  return { logs: [], runtimeError: message, tests: [], durationMs: 0 }
}

async function run(tests?: { id: string; label: string; body: string }[]): Promise<SandboxRunResult> {
  const frame = frameEl.value
  if (!frame) return emptyResult()
  const mine = ++token

  const scripts = scriptFiles(props.files)
  const modules: SandboxModule[] = []
  let javascript = ''
  let entry: string | undefined
  let autoMount = false

  if (props.modules) {
    // Every script is compiled as a module; the registry then loads them in the
    // order the imports ask for, starting from the entry file.
    for (const file of scripts) {
      const compiled = await transpileScript(file.content, file.language, { modules: true })
      if (compiled.error) {
        return report(failedResult(`Could not compile ${file.path}: ${compiled.error}`), mine)
      }
      modules.push({ path: file.path, code: compiled.code })
    }
    entry = entryPath(props.files, props.entry) ?? undefined
    autoMount = mountsForPreview(props.files, props.entry, props.previewProps)
  } else {
    const script = legacyScript()
    const compiled = await transpileScript(script?.content ?? '', script?.language ?? 'javascript')
    if (compiled.error) {
      const name = script?.language ?? 'script'
      return report(failedResult(`Could not compile your ${name}: ${compiled.error}`), mine)
    }
    javascript = compiled.code
  }

  // JSX and TSX need the vendored React runtime and a node to mount into.
  const react = scripts.some((file) => file.language === 'jsx' || file.language === 'tsx')
  let runtime: string | undefined
  if (react) {
    try {
      runtime = await loadReactRuntime()
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not load the React runtime.'
      return report(failedResult(message), mine)
    }
  }

  return runner
    .run(frame, {
      html: pageHtml(props.files),
      css: pageCss(props.files),
      javascript,
      modules: modules.length > 0 ? modules : undefined,
      entry,
      autoMount,
      previewProps: props.previewProps,
      tests: tests ?? [],
      runtime,
      mount: react ? '<div id="root"></div>' : undefined,
    })
    .then((result) => {
      if (mine === token) emit('result', result)
      return result
    })
}

/** Show a failure the learner can act on, unless a newer run replaced it. */
function report(result: SandboxRunResult, mine: number): SandboxRunResult {
  if (mine === token) emit('result', result)
  return result
}

function emptyResult(): SandboxRunResult {
  return { logs: [], runtimeError: null, tests: [], durationMs: 0 }
}

function schedule() {
  if (!props.autoRun) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    void run()
  }, 450)
}

watch(
  () =>
    `${props.modules}|${props.files.map((file) => `${file.path}:${file.content}`).join('\n')}`,
  schedule,
)

onMounted(() => {
  void run()
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  runner.dispose()
})

defineExpose({ run })
</script>