<template>
  <nav class="space-y-2" aria-label="On this lesson">
    <p class="font-mono text-[11px] uppercase tracking-wider text-dim">On this lesson</p>
    <ul class="space-y-1 border-l border-ink-600">
      <li v-for="entry in entries" :key="entry.id">
        <a
          :href="`#${entry.id}`"
          class="-ml-px block border-l-2 py-1 pl-3 text-sm transition"
          :class="active === entry.id ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-mist-50'"
        >
          {{ entry.label }}
        </a>
      </li>
    </ul>

    <div v-if="xp" class="mt-5 rounded-xl border border-ink-600 bg-ink-900 p-3">
      <p class="font-mono text-[11px] uppercase tracking-wider text-dim">Reward</p>
      <p class="mt-1 font-mono text-sm text-brand">+{{ xp }} XP</p>
      <p class="mt-1 font-mono text-[11px] text-dim">{{ duration }} min</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { LessonBlock } from '~/types/content'

const props = defineProps<{ blocks: LessonBlock[]; xp: number; duration: number }>()

const active = ref<string>('')

const entries = computed(() => {
  const out: { id: string; label: string }[] = []
  for (const block of props.blocks) {
    if (block.type === 'heading') {
      out.push({ id: block.id, label: block.body })
    } else if (block.type === 'code') {
      out.push({ id: block.id, label: block.title ?? `${block.language} sample` })
    } else if (block.type === 'exercise') {
      out.push({ id: block.id, label: 'Challenge' })
    } else if (block.type === 'quiz') {
      out.push({ id: block.id, label: block.quiz.title })
    } else if (block.type === 'example') {
      out.push({ id: block.id, label: block.title })
    } else if (block.type === 'tip') {
      out.push({ id: block.id, label: block.title })
    } else if (block.type === 'warning') {
      out.push({ id: block.id, label: block.title })
    }
  }
  return out
})

onMounted(() => {
  const observer = new IntersectionObserver(
    (items) => {
      const visible = items
        .filter((item) => item.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
      if (visible) active.value = visible.target.id
    },
    { rootMargin: '-15% 0px -70% 0px' },
  )
  for (const entry of entries.value) {
    const element = document.getElementById(entry.id)
    if (element) observer.observe(element)
  }
  onBeforeUnmount(() => observer.disconnect())
})
</script>