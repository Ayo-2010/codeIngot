<template>
  <div class="overflow-x-auto rounded-2xl border border-ink-600">
    <table class="w-full text-left text-sm">
      <thead>
        <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
          <th scope="col" class="w-1/4 px-4 py-3 font-semibold">Property</th>
          <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          <th scope="col" class="w-1/5 px-4 py-3 font-semibold">Initial value</th>
          <th scope="col" class="w-24 px-4 py-3 font-semibold">Inherited</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="property in properties" :key="property.name" class="border-b border-ink-800 align-top last:border-0">
          <td class="px-4 py-2.5 font-mono">
            <NuxtLink :to="`/reference/css/property/${propertySlug(property.name)}`" class="text-brand hover:underline">
              {{ property.name }}
            </NuxtLink>
          </td>
          <td class="px-4 py-2.5 text-mist-200">
            {{ property.description }}
            <DeprecationNote v-if="property.deprecated" :note="property.deprecated" />
          </td>
          <td class="px-4 py-2.5 font-mono text-xs text-muted">{{ property.initial }}</td>
          <td class="px-4 py-2.5 font-mono text-xs text-muted">{{ property.inherits ? 'yes' : 'no' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { CssProperty } from '~/types/content'
import { propertySlug } from '~/content/reference/css-property-pages'

defineProps<{ properties: CssProperty[] }>()
</script>