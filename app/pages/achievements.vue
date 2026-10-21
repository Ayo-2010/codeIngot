<template>
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Achievements</h1>
      <p class="mt-3 text-muted">
        Badges are calculated from your progress, never handed out for opening a page. Each one has
        its own XP reward, and the bar underneath shows how close you are.
      </p>
      <p class="mt-4 font-mono text-xs text-dim">
        {{ unlockedCount }} / {{ list.length }} unlocked · {{ totalXp.toLocaleString() }} achievement XP
      </p>
    </header>

    <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="item in list"
        :key="item.id"
        class="rounded-2xl border p-5 transition"
        :class="item.unlocked ? 'border-brand/30 bg-brand/5' : 'border-ink-600 bg-ink-900'"
      >
        <div class="flex items-start gap-3">
          <span
            class="grid h-11 w-11 shrink-0 place-items-center rounded-xl font-mono text-sm ring-1"
            :class="item.unlocked ? 'bg-brand/15 text-brand ring-brand/30' : 'bg-ink-800 text-dim ring-ink-600'"
            aria-hidden="true"
          >
            {{ item.icon }}
          </span>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold text-mist-50">{{ item.title }}</p>
            <p class="mt-1 text-xs leading-relaxed text-muted">{{ item.description }}</p>
          </div>
          <span class="shrink-0 font-mono text-[11px]" :class="item.unlocked ? 'text-brand' : 'text-dim'">
            +{{ item.xp }}
          </span>
        </div>
        <div class="mt-4">
          <ProgressBar :value="item.ratio * 100" :label="`${item.title} progress`" />
          <p class="mt-1.5 font-mono text-[11px]" :class="item.unlocked ? 'text-ok' : 'text-dim'">
            {{ item.unlocked ? 'Unlocked' : `${Math.round(item.ratio * 100)}% there` }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
usePageSeo({
  title: 'Achievements',
  description: 'Achievements unlocked by your lessons, quizzes and projects.',
  noindex: true,
})

const { achievements } = useLearningProgress()

const list = computed(() => achievements.value)
const unlockedCount = computed(() => list.value.filter((item) => item.unlocked).length)
const totalXp = computed(() =>
  list.value.filter((item) => item.unlocked).reduce((sum, item) => sum + item.xp, 0),
)
</script>