<template>
  <div>
    <section class="relative overflow-hidden border-b border-ink-600/60">
      <div class="pointer-events-none absolute inset-0 grid-veil" aria-hidden="true" />
      <div
        class="pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
        aria-hidden="true"
      />

      <div
        class="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-28"
      >
        <div>
          <p
            class="inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-900/80 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
          >
            <span class="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden="true" />
            Learn by writing code
          </p>
          <h1 class="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Learn to Build.<br />
            <span class="text-brand">Build to Learn.</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Interactive HTML, CSS and JavaScript lessons designed to take you from your first tag to
            real applications. Every concept ends in a running editor and a challenge with real tests.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <NuxtLink
              to="/paths/frontend-developer"
              class="rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
            >
              Start learning
            </NuxtLink>
            <NuxtLink
              to="/paths"
              class="rounded-xl border border-ink-600 bg-ink-900 px-5 py-3 text-sm font-medium text-mist-50 transition hover:border-brand/40"
            >
              Explore paths
            </NuxtLink>
            <NuxtLink
              to="/playground"
              class="rounded-xl px-3 py-3 text-sm text-muted transition hover:text-brand"
            >
              Or open the playground →
            </NuxtLink>
          </div>

          <dl class="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-ink-600/70 pt-6">
            <div v-for="stat in stats" :key="stat.label">
              <dt class="text-xs uppercase tracking-wider text-dim">{{ stat.label }}</dt>
              <dd class="mt-1 font-mono text-xl text-mist-50">{{ stat.value }}</dd>
            </div>
          </dl>
        </div>

        <HeroCodeVisual />
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">Choose your path</h2>
          <p class="mt-2 max-w-xl text-muted">
            Paths are ordered journeys, not course lists. Each stage hands you to the next one.
          </p>
        </div>
        <NuxtLink to="/paths" class="text-sm text-brand hover:text-brand-soft">All paths →</NuxtLink>
      </div>
      <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <PathCard v-for="path in paths" :key="path.id" :path="path" />
      </div>
    </section>

    <section class="border-y border-ink-600/60 bg-ink-900/40">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">How a lesson works</h2>
        <p class="mt-2 max-w-xl text-muted">
          Short lessons, one idea at a time, and an editor that is never more than a click away.
        </p>
        <ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li
            v-for="(step, index) in flow"
            :key="step.title"
            class="relative rounded-2xl border border-ink-600 bg-ink-900 p-5"
          >
            <span class="font-mono text-xs text-brand">{{ String(index + 1).padStart(2, '0') }}</span>
            <p class="mt-2 text-base font-semibold text-mist-50">{{ step.title }}</p>
            <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ step.body }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">Start with a course</h2>
          <p class="mt-2 max-w-xl text-muted">
            Lessons run three to ten minutes. Challenges run on test cases, not answer matching.
          </p>
        </div>
        <NuxtLink to="/courses" class="text-sm text-brand hover:text-brand-soft">Course catalog →</NuxtLink>
      </div>
      <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <CourseCard v-for="course in courses" :key="course.id" :course="course" />
      </div>
    </section>

    <section class="border-t border-ink-600/60">
      <div class="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="rounded-2xl border border-ink-600 bg-ink-900/60 p-6"
        >
          <span class="text-brand" aria-hidden="true">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" stroke-linejoin="round" />
              <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" stroke-linejoin="round" />
            </svg>
          </span>
          <h3 class="mt-4 text-base font-semibold text-mist-50">{{ feature.title }}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ feature.body }}</p>
        </div>
      </div>
    </section>

    <section class="border-t border-ink-600/60 bg-ink-900/40">
      <div
        class="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6"
      >
        <h2 class="text-2xl font-semibold tracking-tight sm:text-3xl">
          No account. No setup. Open and start typing.
        </h2>
        <p class="max-w-2xl text-muted">
          Progress is stored in your browser, so you can close the tab and come back tomorrow with
          your streak, XP and unfinished exercise exactly where you left them.
        </p>
        <NuxtLink
          to="/paths/frontend-developer"
          class="rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
        >
          Begin the Frontend Developer path
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { courses, paths } = useCourses()

const siteUrl = String(useRuntimeConfig().public.siteUrl).replace(/\/+$/, '')

usePageSeo({
  title: 'Learn HTML, CSS and JavaScript by writing real code',
  description:
    'Learn HTML, CSS, JavaScript and the browser by writing code in guided lessons, challenge tests and five complete capstone projects.',
  jsonLd: computed(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        name: 'codeIngot',
        url: siteUrl,
        inLanguage: 'en',
        description:
          'Interactive lessons, browser challenges and capstone projects for learning frontend development.',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: 'codeIngot',
        url: siteUrl,
        description:
          'The team behind codeIngot, an interactive platform for learning frontend development in the browser.',
      },
    ],
  })),
})

const stats = computed(() => {
  const totals = totalContentStats()
  return [
    { value: totals.lessons, label: 'Lessons' },
    { value: totals.challenges + allChallenges().length, label: 'Challenges' },
    { value: totals.projects + allProjectsList().length, label: 'Projects' },
  ]
})

const flow = [
  { title: 'Learn one idea', body: 'A short lesson that explains a single concept with a real example.' },
  { title: 'See it run', body: 'Live preview beside the editor, refreshed as you type.' },
  { title: 'Write the code', body: 'A starter file, not a blank page. You edit real markup.' },
  { title: 'Pass the tests', body: 'Challenges are checked with test cases, so the feedback is honest.' },
]

const features = [
  {
    title: 'Sandboxed execution',
    body: 'Your JavaScript runs in an isolated frame with captured console output and real errors. It cannot touch this page.',
  },
  {
    title: 'Test-case challenges',
    body: 'Challenges run assertions against the rendered result, not a string comparison, so a solution has to actually work.',
  },
  {
    title: 'Progress that is derived',
    body: 'Course and path progress are computed from what you finished, so they can never drift out of sync with reality.',
  },
]
</script>