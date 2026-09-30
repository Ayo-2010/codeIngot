<template>
  <div class="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
    <div class="overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 shadow-2xl shadow-black/40">
      <div class="flex items-center gap-2 border-b border-ink-600 bg-ink-850 px-4 py-2.5">
        <span class="flex gap-1.5" aria-hidden="true">
          <span class="h-2.5 w-2.5 rounded-full bg-bad/70" />
          <span class="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span class="h-2.5 w-2.5 rounded-full bg-ok/70" />
        </span>
        <p class="ml-2 font-mono text-[11px] text-dim">lesson-1.js</p>
        <p class="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-brand">
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" aria-hidden="true" />
          {{ statusText }}
        </p>
      </div>

      <div class="grid gap-px bg-ink-600 md:grid-cols-2">
        <pre class="overflow-x-auto bg-ink-950 p-4 font-mono text-[12.5px] leading-6 sm:p-5"><code><span
            v-for="(token, index) in tokens"
            :key="index"
            :class="TOKEN_CLASS[token.kind]"
          >{{ token.value }}</span><span class="caret block h-6 w-2 bg-brand align-middle" /></code></pre>

        <div class="bg-ink-950 p-4 sm:p-5">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">console</p>
          <ul class="mt-2 space-y-1 font-mono text-[12.5px]">
            <li v-for="(line, index) in output" :key="index" class="flex gap-2">
              <span class="select-none text-dim">{{ String(index + 1).padStart(2, '0') }}</span>
              <span :class="line.startsWith(':') ? 'text-ok' : 'text-mist-200'">{{ line }}</span>
            </li>
          </ul>
          <div class="mt-4 rounded-lg border border-ink-600 bg-ink-900 p-3">
            <p class="font-mono text-[11px] text-dim">preview</p>
            <p class="mt-1 text-sm font-medium text-mist-50">Hello, developer.</p>
          </div>
        </div>
      </div>
    </div>

    <p class="mt-4 text-center font-mono text-[11px] text-dim">
      Real editor, real preview, real tests. This is what every lesson gives you.
    </p>
  </div>
</template>

<script setup lang="ts">
import { TOKEN_CLASS, highlight } from '~/utils/highlight'

const source = `const future = "developer";

// build a message, then say it
function greet(role) {
  return \`Hello, \${role}.\`;
}

console.log(greet(future));`

const tokens = highlight(source, 'javascript')
const lines = ['"developer"', 'greet("developer")']
const results = [': ✓ Code executed successfully', '✓ 3 tests passed']
const output = ref<string[]>([lines[0]!])

const statusText = ref('typing…')

onMounted(() => {
  const timers: ReturnType<typeof setTimeout>[] = []
  timers.push(
    setTimeout(() => {
      output.value = [...lines, results[0]!]
      statusText.value = 'running'
    }, 1100),
  )
  timers.push(
    setTimeout(() => {
      output.value = [...lines, results[0]!, results[1]!]
      statusText.value = 'all tests passed'
    }, 2400),
  )
  onBeforeUnmount(() => timers.forEach(clearTimeout))
})
</script>

<style scoped>
.caret {
  animation: blink 1.1s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}
</style>