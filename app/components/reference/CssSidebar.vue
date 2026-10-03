<template>
  <nav class="flex h-full min-h-0 flex-col" aria-label="CSS reference">
    <div class="border-b border-ink-600 px-4 py-3">
      <NuxtLink to="/reference" class="text-xs text-dim hover:text-brand">← Reference</NuxtLink>
      <p class="mt-1.5 font-mono text-[11px] text-dim">{{ sections.length }} sections · {{ propertyItems.length }} properties</p>
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
          :aria-expanded="propertiesOpen"
          aria-controls="css-property-nav"
          @click="propertiesOpen = !propertiesOpen"
        >
          CSS Properties
          <span class="font-mono text-[11px] normal-case text-dim">{{ propertyItems.length }}</span>
          <span aria-hidden="true" class="text-[10px]">{{ propertiesOpen ? '▾' : '▸' }}</span>
        </button>

        <ul v-show="propertiesOpen" id="css-property-nav" class="pb-2">
          <li v-for="item in propertyItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="block border-l-2 py-1.5 pl-6 pr-4 font-mono text-[13px] transition"
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
import { cssNavItems, cssPropertyNavItems } from '~/content/reference/css-nav'

const props = defineProps<{ currentPath: string }>()

const sections = cssNavItems
const propertyItems = cssPropertyNavItems

// 215 properties is a long list, so it starts collapsed.
const propertiesOpen = ref(false)

/**
 * Every entry is its own route, so an exact path match is enough. A prefix
 * match would light up "CSS Reference" on every property page as well.
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