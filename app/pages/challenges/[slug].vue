<template>
  <div v-if="challenge" class="mx-auto max-w-7xl px-4 py-12 sm:px-6">
    <nav class="text-xs text-dim" aria-label="Breadcrumb">
      <NuxtLink to="/challenges" class="hover:text-brand">Challenges</NuxtLink>
      <span class="px-1.5">/</span>
      <span class="text-muted">{{ challenge.title }}</span>
    </nav>

    <div class="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
      <div class="min-w-0">
        <header>
          <div class="flex flex-wrap items-center gap-2">
            <TagPill :value="techLabel" tone="info" />
            <TagPill :value="challenge.difficulty" :tone="challenge.difficulty === 'advanced' ? 'warn' : 'brand'" />
            <TagPill v-for="practice in challenge.practices" :key="practice" :value="practice" tone="muted" />
          </div>
          <h1 class="mt-3 text-2xl font-semibold tracking-tight text-mist-50 sm:text-3xl">
            {{ challenge.title }}
          </h1>
          <p class="mt-2 max-w-2xl text-muted">{{ challenge.summary }}</p>
        </header>

        <section class="mt-6">
          <h2 class="text-sm font-semibold text-mist-50">The brief</h2>
          <ul class="mt-2 space-y-2 text-sm text-mist-200">
            <li v-for="(line, index) in challenge.instructions" :key="index" class="flex gap-2">
              <span class="font-mono text-xs text-brand">{{ index + 1 }}.</span>
              <span v-html="inline(line)" />
            </li>
          </ul>
        </section>

        <EditorCodeWorkspace
          class="mt-6"
          :files="files"
          :starter-code="challenge.exercise.starterCode"
          :exercise="challenge.exercise"
          :active-language="challenge.exercise.languages[0] ?? 'html'"
          show-check
          @passed="onPassed"
        />
      </div>

      <aside class="space-y-4 lg:sticky lg:top-20">
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <p class="text-[11px] font-semibold uppercase tracking-wider text-dim">Challenge</p>
          <dl class="mt-3 space-y-2 text-sm">
            <div class="flex justify-between gap-3">
              <dt class="text-muted">Estimated time</dt>
              <dd class="font-mono text-mist-50">{{ challenge.estimatedMinutes }} min</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted">Reward</dt>
              <dd class="font-mono text-brand">{{ challenge.xp }} XP</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted">Tests</dt>
              <dd class="font-mono text-mist-50">{{ challenge.exercise.tests.length }}</dd>
            </div>
            <div class="flex justify-between gap-3">
              <dt class="text-muted">Status</dt>
              <dd class="font-mono" :class="complete ? 'text-ok' : 'text-dim'">
                {{ complete ? 'Passed' : 'Not passed' }}
              </dd>
            </div>
          </dl>
        </div>

        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-5">
          <h2 class="text-sm font-semibold text-mist-50">How checks work</h2>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            Your code is loaded into a real page and the tests inspect it with the DOM API — computed
            styles, element counts, real clicks. Console output and runtime errors are captured too.
          </p>
          <p v-if="challenge.exercise.testNotes" class="mt-2 text-sm leading-relaxed text-muted">
            {{ challenge.exercise.testNotes }}
          </p>
        </div>
      </aside>
    </div>
  </div>

  <div v-else class="mx-auto max-w-3xl px-4 py-24 text-center">
    <h1 class="text-2xl font-semibold text-mist-50">Challenge not found</h1>
    <NuxtLink to="/challenges" class="mt-4 inline-block text-sm text-brand">Back to challenges</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { renderInline } from '~/utils/inline-markdown'
import type { EditorLanguage } from '~/types/content'

const route = useRoute()
const challenge = computed(() => getChallenge(String(route.params.slug)))
const { isChallengeComplete, completeExercise } = useLearningProgress()

usePageSeo({
  title: computed(() => challenge.value?.title ?? 'Challenge'),
  description: computed(
    () =>
      challenge.value?.summary ??
      'A browser-checked frontend challenge with a starter file and automated tests.',
  ),
})

const files = ref<Partial<Record<EditorLanguage, string>>>({})
watch(
  challenge,
  (value) => {
    if (value) files.value = { ...value.exercise.starterCode }
  },
  { immediate: true },
)

const complete = computed(() => (challenge.value ? isChallengeComplete(challenge.value.id) : false))

const techLabel = computed(() => {
  const labels: Record<string, string> = { html: 'HTML', css: 'CSS', javascript: 'JavaScript' }
  return challenge.value ? (labels[challenge.value.technology] ?? challenge.value.technology) : ''
})

function inline(text: string) {
  return renderInline(text)
}

function onPassed() {
  if (challenge.value) completeExercise(challenge.value.id, challenge.value.xp)
}
</script>