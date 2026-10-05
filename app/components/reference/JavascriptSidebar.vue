<template>
  <nav class="flex h-full min-h-0 flex-col" aria-label="JavaScript reference">
    <div class="border-b border-ink-600 px-4 py-3">
      <NuxtLink to="/reference" class="text-xs text-dim hover:text-brand">← Reference</NuxtLink>
      <p class="mt-1.5 font-mono text-[11px] text-dim">
        {{ groupCount }} groups · {{ topicCount }} topics · {{ memberCount }} members
      </p>
    </div>

    <div class="min-h-0 flex-1 overflow-y-auto py-2">
      <ul>
        <li>
          <NuxtLink
            to="/reference/javascript"
            class="block border-l-2 px-4 py-2 text-sm transition"
            :class="itemClass('/reference/javascript')"
            :aria-current="isActive('/reference/javascript') ? 'page' : undefined"
          >
            JavaScript Reference
          </NuxtLink>
        </li>
        <li v-for="item in indexItems" :key="item.id">
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

      <div v-for="group in groups" :key="group.label" class="mt-3 border-t border-ink-600 pt-2">
        <p class="px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-dim">
          {{ group.label }}
        </p>
        <ul>
          <li v-for="item in group.items" :key="item.id">
            <NuxtLink
              :to="item.to"
              class="block border-l-2 px-4 py-1.5 font-mono text-[13px] transition"
              :class="itemClass(item.to)"
              :aria-current="isActive(item.to) ? 'page' : undefined"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { allJsMembers, javascriptTopics } from '~/content/reference/javascript'
import { javascriptIndexNavItems, javascriptNavGroups } from '~/content/reference/javascript-nav'

const props = defineProps<{ currentPath: string }>()

const indexItems = javascriptIndexNavItems
const groups = javascriptNavGroups
const groupCount = javascriptNavGroups.length
const topicCount = javascriptTopics.length
const memberCount = allJsMembers.length

/**
 * Every entry is its own route, so an exact path match is enough. A prefix
 * match would light up "JavaScript Reference" on every topic page as well.
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
