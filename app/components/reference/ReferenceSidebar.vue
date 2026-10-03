<template>
  <nav class="flex h-full min-h-0 flex-col" aria-label="HTML reference">
    <div class="border-b border-ink-600 px-4 py-3">
      <NuxtLink to="/reference" class="text-xs text-dim hover:text-brand">← Reference</NuxtLink>
      <p class="mt-1.5 font-mono text-[11px] text-dim">{{ sections.length }} sections · {{ tagItems.length }} tags</p>
    </div>

    <div class="min-h-0 flex-1 overflow-y-auto py-2">
      <ul>
        <li v-for="item in sections" :key="item.id">
          <NuxtLink
            :to="item.to"
            class="block border-l-2 px-4 py-2 text-sm transition"
            :class="itemClass(item.to)"
            :aria-current="isActive(item.to) ? 'page' : undefined"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="mt-2 border-t border-ink-600 pt-2">
        <button
          type="button"
          class="flex w-full items-center gap-2 px-4 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-dim transition hover:text-mist-50"
          :aria-expanded="tagsOpen"
          aria-controls="html-tag-nav"
          @click="tagsOpen = !tagsOpen"
        >
          HTML Tags
          <span class="font-mono text-[11px] normal-case text-dim">{{ tagItems.length }}</span>
          <span aria-hidden="true" class="text-[10px]">{{ tagsOpen ? '▾' : '▸' }}</span>
        </button>

        <ul v-show="tagsOpen" id="html-tag-nav" class="pb-2">
          <li v-for="tag in tagItems" :key="tag.to">
            <NuxtLink
              :to="tag.to"
              class="block border-l-2 py-1.5 pl-6 pr-4 font-mono text-[13px] transition"
              :class="itemClass(tag.to)"
              :aria-current="isActive(tag.to) ? 'page' : undefined"
            >
              {{ tag.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { htmlNavItems, htmlTagNavItems } from '~/content/reference/html-nav'

const props = defineProps<{ currentPath: string }>()

const sections = htmlNavItems
const tagItems = htmlTagNavItems

// 124 tags is a long list, so it starts collapsed.
const tagsOpen = ref(false)

/**
 * Every entry is its own route, so an exact path match is enough. A prefix
 * match would light up "HTML Reference" on every tag page as well.
 */
function isActive(to: string) {
  return props.currentPath === to
}

function itemClass(to: string) {
  return isActive(to)
    ? 'border-brand bg-brand/8 text-mist-50'
    : 'border-transparent text-muted hover:bg-ink-800 hover:text-mist-50'
}
</script>
