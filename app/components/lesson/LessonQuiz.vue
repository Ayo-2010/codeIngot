<template>
  <section class="rounded-xl border border-ink-600 bg-ink-900 p-4 sm:p-5" aria-labelledby="quiz-title">
    <header class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
      <h3 id="quiz-title" class="text-base font-semibold text-mist-50">{{ quiz.title }}</h3>
      <p class="font-mono text-xs text-dim">
        {{ answeredCount }}/{{ quiz.questions.length }} answered · pass at {{ quiz.passingScore }}%
      </p>
    </header>

    <ol class="space-y-5">
      <li v-for="(question, index) in quiz.questions" :key="question.id">
        <fieldset class="rounded-lg border border-ink-600 bg-ink-850 p-3 sm:p-4">
          <legend class="px-1 text-sm font-medium text-mist-50">
            <span class="mr-2 font-mono text-xs text-brand">{{ index + 1 }}</span>
            {{ question.prompt }}
          </legend>

          <pre
            v-if="question.code"
            class="mt-2 overflow-x-auto rounded-lg border border-ink-600 bg-ink-950 p-3 font-mono text-[12.5px] leading-6 text-mist-200"
          ><code>{{ question.code }}</code></pre>

          <div class="mt-3 space-y-2">
            <template v-if="question.type === 'multiple-choice' || question.type === 'code-output' || question.type === 'identify-error'">
              <label
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                class="flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2 text-sm transition"
                :class="optionClass(question, optionIndex)"
              >
                <input
                  type="radio"
                  class="mt-0.5 accent-brand"
                  :name="question.id"
                  :checked="answers[question.id] === optionIndex"
                  :disabled="isLocked(question)"
                  @change="choose(question.id, optionIndex)"
                />
                <span class="font-mono text-mist-200">{{ option }}</span>
              </label>
            </template>

            <template v-else-if="question.type === 'true-false'">
              <div class="flex gap-2">
                <button
                  v-for="option in [true, false]"
                  :key="String(option)"
                  type="button"
                  class="rounded-lg border px-4 py-2 text-sm transition"
                  :class="booleanClass(question, option)"
                  :disabled="isLocked(question)"
                  @click="choose(question.id, option)"
                >
                  {{ option ? 'True' : 'False' }}
                </button>
              </div>
            </template>

            <template v-else-if="question.type === 'blank'">
              <input
                :value="String(answers[question.id] ?? '')"
                type="text"
                class="w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2 font-mono text-sm text-mist-50 outline-none focus:border-brand"
                placeholder="Type your answer"
                :disabled="isLocked(question)"
                @input="setBlank(question.id, ($event.target as HTMLInputElement).value)"
                @keydown.enter.prevent="submitBlank(question.id)"
              />
              <button
                type="button"
                class="rounded-lg border border-ink-500 px-3 py-1.5 text-xs text-mist-200 transition hover:border-brand/50 disabled:opacity-40"
                :disabled="isLocked(question)"
                @click="submitBlank(question.id)"
              >
                Check answer
              </button>
            </template>
          </div>

          <p
            v-if="isAnswered(question)"
            class="mt-3 rounded-lg border px-3 py-2 text-sm"
            :class="isCorrect(question) ? 'border-ok/30 bg-ok/5 text-ok' : 'border-warn/30 bg-warn/5 text-warn'"
          >
            <strong class="font-semibold">{{ isCorrect(question) ? 'Correct.' : 'Not quite.' }}</strong>
            <span class="text-mist-200"> {{ question.explanation }}</span>
          </p>
        </fieldset>
      </li>
    </ol>

    <footer v-if="answeredCount === quiz.questions.length" class="mt-5 border-t border-ink-600 pt-4">
      <p class="text-sm text-mist-50">
        Score: <span class="font-mono" :class="score >= quiz.passingScore ? 'text-ok' : 'text-warn'">{{ score }}%</span>
        <span v-if="score >= quiz.passingScore" class="ml-2 text-ok">— passed.</span>
        <span v-else class="ml-2 text-warn">— {{ quiz.passingScore }}% needed to pass. Try the ones you missed.</span>
      </p>
      <p v-if="bestScore !== null" class="mt-1 font-mono text-xs text-dim">Best score: {{ bestScore }}%</p>
    </footer>
  </section>
</template>

<script setup lang="ts">
import type { Quiz, QuizQuestion } from '~/types/content'

const props = defineProps<{ quiz: Quiz }>()
const emit = defineEmits<{ finish: [score: number] }>()

const answers = ref<Record<string, number | boolean | string>>({})
const submitted = ref<Record<string, boolean>>({})
const bestScore = ref<number | null>(null)

const answeredCount = computed(
  () => props.quiz.questions.filter((question) => isAnswered(question)).length,
)

const score = computed(() => {
  if (props.quiz.questions.length === 0) return 0
  const correct = props.quiz.questions.filter((question) => isCorrect(question)).length
  return Math.round((correct / props.quiz.questions.length) * 100)
})

function isAnswered(question: QuizQuestion): boolean {
  return submitted.value[question.id] === true
}

function isLocked(question: QuizQuestion): boolean {
  return isAnswered(question)
}

function isCorrect(question: QuizQuestion): boolean {
  const answer = answers.value[question.id]
  if (answer === undefined) return false
  if (question.type === 'multiple-choice' || question.type === 'code-output' || question.type === 'identify-error') {
    return answer === question.answer
  }
  if (question.type === 'true-false') return answer === question.answer
  return question.answers.some((expected) => expected.trim().toLowerCase() === String(answer).trim().toLowerCase())
}

function choose(questionId: string, value: number | boolean | string) {
  answers.value = { ...answers.value, [questionId]: value }
  submitted.value = { ...submitted.value, [questionId]: true }
  finishIfDone()
}

function setBlank(questionId: string, value: string) {
  answers.value = { ...answers.value, [questionId]: value }
}

function submitBlank(questionId: string) {
  const value = String(answers.value[questionId] ?? '').trim()
  if (!value) return
  submitted.value = { ...submitted.value, [questionId]: true }
  finishIfDone()
}

function finishIfDone() {
  if (answeredCount.value !== props.quiz.questions.length) return
  const value = score.value
  if (bestScore.value === null || value > bestScore.value) bestScore.value = value
  emit('finish', value)
}

function optionClass(question: QuizQuestion, optionIndex: number): string {
  if (!isAnswered(question)) return 'border-ink-600 hover:border-ink-500'
  const correct = correctOptionIndex(question)
  if (correct !== undefined && optionIndex === correct) return 'border-ok/40 bg-ok/10'
  if (answers.value[question.id] === optionIndex) return 'border-bad/40 bg-bad/10'
  return 'border-ink-600 opacity-60'
}

function booleanClass(question: QuizQuestion, value: boolean): string {
  if (!isAnswered(question)) return 'border-ink-600 hover:border-brand/40'
  const correct = correctBooleanValue(question)
  if (correct !== undefined && value === correct) return 'border-ok/40 bg-ok/10 text-ok'
  if (answers.value[question.id] === value) return 'border-bad/40 bg-bad/10 text-bad'
  return 'border-ink-600 opacity-60'
}

function correctOptionIndex(question: QuizQuestion): number | undefined {
  if (question.type === 'multiple-choice' || question.type === 'code-output' || question.type === 'identify-error') {
    return question.answer
  }
  return undefined
}

function correctBooleanValue(question: QuizQuestion): boolean | undefined {
  return question.type === 'true-false' ? question.answer : undefined
}
</script>