<template>
  <div class="overflow-x-auto rounded-2xl border border-ink-600">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
          <th scope="col" class="px-4 py-3 font-semibold">Attribute</th>
          <th scope="col" class="px-4 py-3 font-semibold">Belongs to</th>
          <th scope="col" class="px-4 py-3 font-semibold">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="attribute in attributes"
          :key="attribute.attribute"
          class="border-b border-ink-800 align-top last:border-0"
        >
          <td class="px-4 py-2.5 align-top font-mono text-brand">{{ attribute.attribute }}</td>
          <td class="px-4 py-2.5 align-top font-mono text-xs text-muted">
            <template v-for="(tag, index) in tagsIn(attribute.belongsTo)" :key="tag">
              <span v-if="index > 0">, </span>
              <NuxtLink :to="`/reference/html/tag/${tagSlug(tag)}`" class="hover:text-brand hover:underline">
                {{ tag }}
              </NuxtLink>
            </template>
          </td>
          <td class="px-4 py-2.5 align-top text-mist-200">
            {{ attribute.description }}
            <DeprecationNote v-if="attribute.deprecated" :note="attribute.deprecated" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { HtmlAttribute } from '~/types/content'
import { tagSlug } from '~/content/reference/html-tag-pages'

defineProps<{ attributes: HtmlAttribute[] }>()

/** `belongsTo` is a comma-separated list, e.g. `<form>, <input>`. */
function tagsIn(value: string) {
  return value
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
}
</script>
