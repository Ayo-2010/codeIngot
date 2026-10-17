<template>
  <nav ref="tocEl" class="space-y-2" aria-label="On this lesson">
    <p class="font-mono text-[11px] uppercase tracking-wider text-dim">On this lesson</p>
    <ul class="space-y-1 border-l border-ink-600">
      <li v-for="entry in entries" :key="entry.id">
        <a
          :href="`#${entry.id}`"
          class="-ml-px block border-l-2 py-1 pl-3 text-sm transition"
          :class="active === entry.id ? 'border-brand text-brand' : 'border-transparent text-muted hover:text-mist-50'"
          @click="onLinkClick($event, entry.id)"
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
import { findScrollContainer, scrollBlockIntoView } from '~/utils/scroll-to-block'

const props = defineProps<{ blocks: LessonBlock[]; xp: number; duration: number }>()

const active = ref<string>('')
const tocEl = ref<HTMLElement | null>(null)
const inBand = ref<Set<string>>(new Set())
let observer: IntersectionObserver | null = null
let scrollRoot: HTMLElement | null = null

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
    } else if (block.type === 'example' || block.type === 'demo') {
      out.push({ id: block.id, label: block.title })
    } else if (block.type === 'tip') {
      out.push({ id: block.id, label: block.title })
    } else if (block.type === 'warning') {
      out.push({ id: block.id, label: block.title })
    }
  }
  return out
})

/**
 * Handle the jump ourselves instead of letting the browser do a fragment
 * navigation. The learn layout is a fixed-height shell whose body scrolls in an
 * inner container, and a native jump - or a bare `scrollIntoView` - scrolls
 * every scrollable ancestor including the document, so the whole shell would
 * slide up and the header would scroll out of view. `scrollBlockIntoView`
 * scrolls the container directly and resets the document.
 */
function onLinkClick(event: MouseEvent, id: string) {
  // Leave modified clicks alone: they mean "open in a new tab".
  if (event.defaultPrevented || event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (!document.getElementById(id)) return

  event.preventDefault()

  scrollBlockIntoView(id, { container: scrollRoot })

  // Keep the fragment shareable without re-triggering a native jump.
  history.replaceState(null, '', `#${id}`)
  active.value = id
}

onMounted(() => {
  scrollRoot = findScrollContainer(tocEl.value)
  observer = new IntersectionObserver(
    (items) => {
      // Track which targets sit in the band rather than reacting to arrivals
      // alone. Reacting only to entries that become visible leaves the previous
      // entry active when you scroll back up past everything, because nothing
      // new enters the band on the way.
      for (const item of items) {
        if (item.isIntersecting) inBand.value.add(item.target.id)
        else inBand.value.delete(item.target.id)
      }
      active.value = currentEntryId()
    },
    { root: scrollRoot, rootMargin: '0px 0px -68% 0px' },
  )
  observe()
})

/**
 * The topmost entry in the band, or - when a fast scroll leaves the band empty -
 * the last entry already scrolled past, so the highlight never goes stale.
 */
function currentEntryId(): string {
  const ordered = entries.value
    for (const entry of ordered) {
      if (inBand.value.has(entry.id)) return entry.id
    }
  if (!scrollRoot) return ''
  const rootTop = scrollRoot.getBoundingClientRect().top
  let passed = ''
  for (const entry of ordered) {
    const element = document.getElementById(entry.id)
    if (element && element.getBoundingClientRect().top < rootTop) passed = entry.id
  }
  return passed
}

watch(entries, async () => {
  await nextTick()
  active.value = ''
  inBand.value = new Set()
  observe()
})

function observe() {
  observer?.disconnect()
  if (!observer) return
  for (const entry of entries.value) {
    const element = document.getElementById(entry.id)
    if (element) observer.observe(element)
  }
}

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>