<template>
  <article
    class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-900 transition hover:border-brand/40"
  >
    <div class="h-32 border-b border-ink-600 bg-ink-850">
      <iframe
        class="h-full w-full"
        :title="`${project.title} design preview`"
        sandbox=""
        :srcdoc="previewDoc"
      />
    </div>
    <div class="flex flex-1 flex-col p-5">
      <div class="flex flex-wrap items-center gap-1.5">
        <TagPill v-for="tech in technologies" :key="tech" :value="tech" tone="info" />
        <TagPill :value="project.difficulty" tone="brand" />
      </div>
      <h3 class="mt-3 text-base font-semibold text-mist-50">
        <NuxtLink :to="`/projects/${project.slug}`" class="after:absolute after:inset-0">
          {{ project.title }}
        </NuxtLink>
      </h3>
      <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ project.tagline }}</p>
      <div class="mt-auto flex items-center justify-between gap-3 pt-5">
        <span class="font-mono text-[11px] text-dim">
          ~{{ Math.round(project.estimatedMinutes / 60 * 10) / 10 }} h · {{ project.xp }} XP
        </span>
        <span class="flex items-center gap-1.5 text-sm font-medium" :class="complete ? 'text-ok' : 'text-brand'">
          <template v-if="complete">
            <span aria-hidden="true">✓</span> Submitted
          </template>
          <template v-else>
            Start project
            <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </template>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Project } from '~/types/content'

const props = defineProps<{ project: Project }>()

const { isProjectComplete } = useLearningProgress()

const complete = computed(() => isProjectComplete(props.project.id))

const technologies = computed(() =>
  props.project.technologies.map((tech) =>
    tech === 'html' ? 'HTML' : tech === 'css' ? 'CSS' : tech === 'javascript' ? 'JavaScript' : tech,
  ),
)

const previewDoc = computed(
  () =>
    `<!DOCTYPE html><html><head><meta charset="utf-8" /><style>body{margin:0;height:100vh;overflow:hidden;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}*{box-sizing:border-box}${props.project.designPreviewCss}</style></head><body>${props.project.designPreviewHtml}</body></html>`,
)
</script>