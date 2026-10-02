<template>
  <div class="space-y-5">
    <template v-for="block in blocks" :key="block.id">
      <p v-if="block.type === 'text'" :id="block.id" class="prose-ingot" v-html="inline(block.body)" />

      <h2
        v-else-if="block.type === 'heading' && block.level === 2"
        :id="block.id"
        class="pt-2 text-xl font-semibold tracking-tight text-mist-50"
      >
        {{ block.body }}
      </h2>
      <h3 v-else-if="block.type === 'heading'" :id="block.id" class="pt-1 text-base font-semibold text-mist-50">
        {{ block.body }}
      </h3>

      <ol
        v-else-if="block.type === 'list' && block.style === 'ordered'"
        :id="block.id"
        class="space-y-2 text-[15px] text-mist-200"
      >
        <li v-for="(item, index) in block.items" :key="index" class="flex gap-3">
          <span class="mt-0.5 font-mono text-xs text-brand">{{ index + 1 }}.</span>
          <span class="prose-ingot" v-html="inline(item)" />
        </li>
      </ol>
      <ul v-else-if="block.type === 'list'" :id="block.id" class="space-y-2 text-[15px] text-mist-200">
        <li v-for="(item, index) in block.items" :key="index" class="flex gap-3">
          <span class="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand/70" aria-hidden="true" />
          <span class="prose-ingot" v-html="inline(item)" />
        </li>
      </ul>

      <figure
        v-else-if="block.type === 'code'"
        :id="block.id"
        class="scroll-mt-20 overflow-hidden rounded-xl border border-ink-600 bg-ink-950"
      >
        <figcaption
          class="flex items-center justify-between border-b border-ink-600 bg-ink-850 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-dim"
        >
          <span>{{ block.title ?? block.language }}</span>
          <button type="button" class="hover:text-brand" @click="copy(block.code)">Copy</button>
        </figcaption>
        <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6"><code><span
            v-for="(token, index) in codeTokens(block.code, block.language)"
            :key="index"
            :class="tokenClass(token.kind)"
          >{{ token.value }}</span></code></pre>
      </figure>

      <aside
        v-else-if="block.type === 'tip'"
        :id="block.id"
        class="scroll-mt-20 flex gap-3 rounded-xl border border-brand/25 bg-brand/5 p-3.5"
      >
        <span class="mt-0.5 text-brand" aria-hidden="true">💡</span>
        <div>
          <p class="text-sm font-semibold text-mist-50">{{ block.title }}</p>
          <p class="mt-1 text-sm leading-relaxed text-mist-200" v-html="inline(block.body)" />
        </div>
      </aside>

      <aside
        v-else-if="block.type === 'warning'"
        :id="block.id"
        class="scroll-mt-20 flex gap-3 rounded-xl border border-warn/30 bg-warn/5 p-3.5"
      >
        <span class="mt-0.5 text-warn" aria-hidden="true">⚠</span>
        <div>
          <p class="text-sm font-semibold text-mist-50">{{ block.title }}</p>
          <p class="mt-1 text-sm leading-relaxed text-mist-200" v-html="inline(block.body)" />
        </div>
      </aside>

      <figure
        v-else-if="block.type === 'example' && block.showPreview"
        :id="block.id"
        class="scroll-mt-20 overflow-hidden rounded-xl border border-ink-600 bg-ink-900"
      >
        <figcaption class="border-b border-ink-600 bg-ink-850 px-3 py-2">
          <p class="text-sm font-semibold text-mist-50">{{ block.title }}</p>
          <p class="mt-0.5 text-xs leading-relaxed text-muted" v-html="inline(block.body)" />
        </figcaption>
        <div class="grid gap-px bg-ink-600 lg:grid-cols-2">
          <pre class="max-h-72 overflow-auto bg-ink-950 p-3 font-mono text-[12px] leading-5 text-mist-200"><code><span
              v-for="(token, index) in exampleCode(block)"
              :key="index"
              :class="tokenClass(token.kind)"
            >{{ token.value }}</span></code></pre>
          <div class="bg-white">
            <iframe
              class="h-64 w-full"
              title="Example preview"
              sandbox="allow-scripts"
              :srcdoc="exampleDoc(block)"
            />
          </div>
        </div>
      </figure>

      <figure
        v-else-if="block.type === 'demo'"
        :id="block.id"
        class="scroll-mt-20 overflow-hidden rounded-xl border border-ink-600 bg-ink-900"
      >
        <figcaption class="border-b border-ink-600 bg-ink-850 px-3 py-2">
          <p class="text-sm font-semibold text-mist-50">{{ block.title }}</p>
          <p v-if="block.body" class="mt-0.5 text-xs leading-relaxed text-muted" v-html="inline(block.body)" />
        </figcaption>
        <iframe
          class="w-full bg-white"
          :style="{ height: `${block.height ?? 180}px` }"
          title="Live example"
          sandbox="allow-scripts"
          :srcdoc="demoDoc(block)"
        />
      </figure>

      <section
        v-else-if="block.type === 'exercise'"
        :id="block.id"
        class="scroll-mt-20 rounded-xl border border-brand/25 bg-ink-900 p-3 sm:p-4"
        :aria-labelledby="`${block.id}-title`"
      >
        <header class="mb-3">
          <h3 :id="`${block.id}-title`" class="flex items-center gap-2 text-sm font-semibold text-brand">
            <span aria-hidden="true">✎</span> Your turn
          </h3>
          <p class="mt-1.5 text-[15px] leading-relaxed text-mist-200">{{ block.exercise.instructions }}</p>
        </header>
        <EditorCodeWorkspace
          :files="starterFor(block.exercise)"
          :starter-code="block.exercise.starterCode"
          :exercise="block.exercise"
          :active-language="block.exercise.languages[0] ?? 'html'"
          show-check
          @passed="onPassed(block.exercise.id)"
        />
        <p v-if="passedIds.includes(block.exercise.id)" class="mt-2 text-xs text-ok">
          ✓ Challenge passed. It stays unlocked — you can replay it any time.
        </p>
      </section>

      <div
        v-else-if="block.type === 'quiz'"
        :id="block.id"
        class="scroll-mt-20"
      >
        <LessonQuiz
          :quiz="block.quiz"
          @finish="onQuiz(block.quiz, $event)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type {
  CodingExercise,
  DemoBlock,
  EditorLanguage,
  ExampleBlock,
  LessonBlock,
  Quiz,
} from '~/types/content'
import { TOKEN_CLASS, highlight, type Token, type TokenKind } from '~/utils/highlight'
import { renderInline } from '~/utils/inline-markdown'

const props = defineProps<{
  blocks: LessonBlock[]
  courseId?: string
  courseSlug?: string
  lessonId?: string
}>()

const { completeExercise, recordQuiz } = useLearningProgress()

const passedIds = ref<string[]>([])
const tokensCache = new Map<string, Token[]>()

function codeTokens(code: string, language: EditorLanguage | 'plaintext'): Token[] {
  const key = `${language}::${code}`
  let tokens = tokensCache.get(key)
  if (!tokens) {
    tokens = highlight(code, language)
    tokensCache.set(key, tokens)
  }
  return tokens
}

function exampleCode(block: ExampleBlock): Token[] {
  const parts: { language: EditorLanguage; code: string }[] = []
  if (block.html) parts.push({ language: 'html', code: block.html })
  if (block.css) parts.push({ language: 'css', code: block.css })
  if (block.javascript) parts.push({ language: 'javascript', code: block.javascript })
  if (parts.length === 0) return []
  const first = parts[0]!
  return highlight(parts.map((part) => part.code).join('\n\n'), first.language)
}

function wrapDoc(html: string, css: string, javascript: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8" /><style>body{font-family:system-ui,sans-serif;margin:0;padding:14px;line-height:1.55;color:#0b0d10}img{max-width:100%;height:auto}*{box-sizing:border-box}</style><style>${css}</style></head><body>${html}<script>${javascript}<\/script></body></html>`
}

function exampleDoc(block: ExampleBlock): string {
  return wrapDoc(block.html, block.css ?? '', block.javascript ?? '')
}

function demoDoc(block: DemoBlock): string {
  return wrapDoc(block.html, block.css ?? '', block.javascript ?? '')
}

function starterFor(exercise: CodingExercise): Partial<Record<EditorLanguage, string>> {
  return { ...exercise.starterCode }
}

function tokenClass(kind: TokenKind) {
  return TOKEN_CLASS[kind]
}

function inline(text: string): string {
  return renderInline(text)
}

function onPassed(exerciseId: string) {
  if (!passedIds.value.includes(exerciseId)) passedIds.value = [...passedIds.value, exerciseId]
  const exercise = findExercise(exerciseId)
  if (exercise) completeExercise(exerciseId, exercise.xp ?? 60)
}

function findExercise(id: string): (CodingExercise & { xp?: number }) | undefined {
  for (const block of props.blocks) {
    if (block.type === 'exercise' && block.exercise.id === id) return block.exercise
  }
  return undefined
}

function onQuiz(quiz: Quiz, score: number) {
  const slug = props.courseSlug
  const course = slug ? allCoursesList().find((item) => item.slug === slug) : undefined
  recordQuiz(quiz, score, course)
}

async function copy(text: string) {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    /* clipboard blocked */
  }
}
</script>