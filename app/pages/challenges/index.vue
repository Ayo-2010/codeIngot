<template>
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Challenges</h1>
      <p class="mt-3 text-muted">
        One focused problem each. Every challenge is graded by test cases that inspect the rendered
        result, so a solution has to actually work rather than merely look right.
      </p>
    </header>

    <div class="mt-8 flex flex-wrap items-center gap-4">
      <fieldset class="flex flex-wrap items-center gap-1.5">
        <legend class="sr-only">Filter by technology</legend>
        <button
          v-for="option in techFilters"
          :key="option"
          type="button"
          class="rounded-lg border px-3 py-1.5 text-sm transition"
          :class="chipClass(option)"
          :aria-pressed="technology === option"
          @click="technology = option"
        >
          {{ option === 'all' ? 'All' : option }}
        </button>
      </fieldset>

      <fieldset class="flex flex-wrap items-center gap-1.5">
        <legend class="sr-only">Filter by difficulty</legend>
        <button
          v-for="option in difficultyFilters"
          :key="option"
          type="button"
          class="rounded-lg border px-3 py-1.5 text-sm capitalize transition"
          :class="chipClass(option)"
          :aria-pressed="difficulty === option"
          @click="difficulty = option"
        >
          {{ option === 'all' ? 'All levels' : option }}
        </button>
      </fieldset>

      <p class="ml-auto font-mono text-xs text-dim">
        {{ filtered.length }} of {{ all.length }} challenges · {{ passedCount }} passed
      </p>
    </div>

    <div v-if="filtered.length" class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <ChallengeCard v-for="challenge in filtered" :key="challenge.id" :challenge="challenge" />
    </div>
    <p v-else class="mt-10 rounded-2xl border border-dashed border-ink-600 p-10 text-center text-muted">
      No challenges match that combination yet.
    </p>
  </div>
</template>

<script setup lang="ts">
const all = allChallenges()
const { progress } = useLearningProgress()

useHead({ title: 'Challenges' })

const technology = ref('all')
const difficulty = ref('all')

const techFilters = ['all', 'HTML', 'CSS', 'JavaScript']
const difficultyFilters = ['all', 'beginner', 'intermediate', 'advanced']

const filtered = computed(() =>
  all.filter((challenge) => {
    const techMatch =
      technology.value === 'all' ||
      (technology.value === 'HTML' && challenge.technology === 'html') ||
      (technology.value === 'CSS' && challenge.technology === 'css') ||
      (technology.value === 'JavaScript' && challenge.technology === 'javascript')
    const levelMatch = difficulty.value === 'all' || challenge.difficulty === difficulty.value
    return techMatch && levelMatch
  }),
)

const passedCount = computed(
  () => all.filter((challenge) => progress.value.completedChallenges.includes(challenge.id)).length,
)

function chipClass(option: string) {
  const active =
    option === technology.value || option === difficulty.value
  return active
    ? 'border-brand/40 bg-brand/10 text-brand'
    : 'border-ink-600 text-muted hover:text-mist-50'
}
</script>