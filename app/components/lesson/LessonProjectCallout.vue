<template>
  <aside
    v-if="project"
    :id="block.id"
    class="scroll-mt-20 overflow-hidden rounded-xl border border-brand/30 bg-brand/5"
    :aria-labelledby="`${block.id}-title`"
  >
    <div class="p-4 sm:p-5">
      <p class="font-mono text-[11px] uppercase tracking-widest text-brand">Guided build</p>
      <h3 :id="`${block.id}-title`" class="mt-1.5 text-lg font-semibold tracking-tight text-mist-50">
        {{ block.title ?? project.title }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-mist-200" v-html="inline(block.body ?? project.tagline)" />

      <dl class="mt-4 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-dim">
        <div class="flex items-baseline gap-1.5">
          <dt>Time</dt>
          <dd class="text-mist-50">~{{ project.estimatedMinutes }} min</dd>
        </div>
        <div class="flex items-baseline gap-1.5">
          <dt>Reward</dt>
          <dd class="text-brand">{{ project.xp }} XP</dd>
        </div>
        <div class="flex items-baseline gap-1.5">
          <dt>Checks</dt>
          <dd class="text-mist-50">{{ project.checklist.length }}</dd>
        </div>
      </dl>

      <NuxtLink
        :to="`/projects/${project.slug}`"
        class="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-ink-950 transition hover:bg-brand-soft"
      >
        Open the project workspace
        <span aria-hidden="true">&rarr;</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { ProjectBlock } from '~/types/content'
import { renderInline } from '~/utils/inline-markdown'

const props = defineProps<{ block: ProjectBlock }>()

const project = computed(() => getProject(props.block.projectSlug))

function inline(value: string) {
  return renderInline(value)
}
</script>
