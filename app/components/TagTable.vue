<template>
  <div class="overflow-x-auto rounded-2xl border border-ink-600">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
          <th scope="col" class="w-2/5 px-4 py-3 font-semibold">Tag</th>
          <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          <th scope="col" class="w-1/5 px-4 py-3 font-semibold">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tag in tags" :key="tag.tag" class="border-b border-ink-800 align-top last:border-0">
          <td class="px-4 py-2.5 font-mono">
            <NuxtLink :to="`/reference/html/tag/${tagSlug(tag.tag)}`" class="text-brand hover:underline">
              {{ tag.tag }}
            </NuxtLink>
          </td>
          <td class="px-4 py-2.5 text-mist-200">
            {{ tag.description }}
            <DeprecationNote v-if="tag.deprecated" :note="tag.deprecated" />
          </td>
          <td class="px-4 py-2.5 text-muted">{{ tag.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { HtmlTag } from '~/types/content'
import { tagSlug } from '~/content/reference/html-tag-pages'

defineProps<{ tags: HtmlTag[] }>()
</script>
