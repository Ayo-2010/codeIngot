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
import type { EditorLanguage } from '~/types/content'
import { createSandboxRunner, type SandboxRunResult } from '~/utils/sandbox'
import { SCRIPT_PRIORITY, transpileScript } from '~/utils/transpile'
import { loadReactRuntime } from '~/utils/react-runtime'

const props = withDefaults(
  defineProps<{
    files: Partial<Record<EditorLanguage, string>>
    tests?: { id: string; label: string; body: string }[]
    autoRun?: boolean
  }>(),
  { autoRun: true },
)

const emit = defineEmits<{ result: [SandboxRunResult] }>()

const frameEl = ref<HTMLIFrameElement | null>(null)
const runner = createSandboxRunner()
let timer: ReturnType<typeof setTimeout> | null = null
let token = 0

async function run(tests?: { id: string; label: string; body: string }[]): Promise<SandboxRunResult> {
  const frame = frameEl.value
  if (!frame) return emptyResult()
  const mine = ++token

  const files = props.files
  const language = SCRIPT_PRIORITY.find((candidate) => (files[candidate] ?? '').length > 0)
  const compiled = await transpileScript(language ? files[language] ?? '' : '', language ?? 'javascript')

  if (compiled.error) {
    const failed: SandboxRunResult = {
      logs: [],
      runtimeError: `Could not compile your ${language ?? 'script'}: ${compiled.error}`,
      tests: [],
      durationMs: 0,
    }
    if (mine === token) emit('result', failed)
    return failed
  }

  // JSX and TSX need the vendored React runtime and a node to mount into.
  const react = Boolean(files.jsx || files.tsx)
  let runtime: string | undefined
  if (react) {
    try {
      runtime = await loadReactRuntime()
    } catch (error) {
      const failed: SandboxRunResult = {
        logs: [],
        runtimeError: error instanceof Error ? error.message : 'Could not load the React runtime.',
        tests: [],
        durationMs: 0,
      }
      if (mine === token) emit('result', failed)
      return failed
    }
  }

  return runner
    .run(frame, {
      html: files.html ?? '',
      css: files.css ?? '',
      javascript: compiled.code,
      tests: tests ?? [],
      runtime,
      mount: react ? '<div id="root"></div>' : undefined,
    })
    .then((result) => {
      if (mine === token) emit('result', result)
      return result
    })
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
  () => [
    props.files.html,
    props.files.css,
    props.files.javascript,
    props.files.typescript,
    props.files.jsx,
    props.files.tsx,
  ],
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