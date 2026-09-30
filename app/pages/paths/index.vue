<template>
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Learning paths</h1>
      <p class="mt-3 text-muted">
        A path is an ordered journey. Each stage assumes the previous one, and each stage ends with
        real code in the editor. You can still open any course directly — paths guide, they do not lock.
      </p>
    </header>

    <div class="mt-10 grid gap-6 lg:grid-cols-2">
      <PathCard v-for="path in paths" :key="path.id" :path="path" />
    </div>

    <section class="mt-16">
      <h2 class="text-xl font-semibold tracking-tight text-mist-50">Every stage, in order</h2>
      <div v-for="path in paths" :key="`steps-${path.id}`" class="mt-6 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
        <ol class="divide-y divide-ink-600">
          <li v-for="step in path.steps" :key="step.id" class="flex gap-4 p-4 sm:p-5">
            <span class="mt-0.5 font-mono text-xs text-brand">{{ String(step.order).padStart(2, '0') }}</span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium text-mist-50">{{ step.title }}</p>
              <p class="mt-0.5 text-sm text-muted">{{ step.summary }}</p>
            </div>
            <div class="shrink-0 text-right">
              <NuxtLink
                v-if="getCourse(step.courseSlug)"
                :to="`/courses/${step.courseSlug}`"
                class="text-xs text-brand hover:text-brand-soft"
              >
                Available
              </NuxtLink>
              <p v-else class="text-xs text-dim">Coming next</p>
              <p class="mt-0.5 font-mono text-[10px] text-dim">
                {{ getCourse(step.courseSlug) ? `${courseStats(getCourse(step.courseSlug)!).lessons} lessons` : 'planned' }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { paths } = useCourses()

useHead({ title: 'Learning paths' })
</script>