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
import { createSandboxRunner, type SandboxRunResult, type SandboxTestResult } from '~/utils/sandbox'

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

function run(tests?: { id: string; label: string; body: string }[]): Promise<SandboxRunResult> {
  const frame = frameEl.value
  if (!frame) {
    return Promise.resolve({
      logs: [],
      runtimeError: null,
      tests: [] as SandboxTestResult[],
      durationMs: 0,
    })
  }
  const mine = ++token
  return runner
    .run(frame, {
      html: props.files.html ?? '',
      css: props.files.css ?? '',
      javascript: props.files.javascript ?? '',
      tests: tests ?? [],
    })
    .then((result) => {
      if (mine === token) emit('result', result)
      return result
    })
}

function schedule() {
  if (!props.autoRun) return
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    void run()
  }, 450)
}

watch(() => [props.files.html, props.files.css, props.files.javascript], schedule)

onMounted(() => {
  void run()
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
  runner.dispose()
})

defineExpose({ run })
</script>