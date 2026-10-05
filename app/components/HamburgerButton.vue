<template>
  <button
    type="button"
    class="grid place-items-center rounded-lg border border-ink-600 text-muted transition hover:text-mist-50"
    :class="sizeClass"
    :aria-expanded="open"
    :aria-controls="controls"
    :aria-label="open ? closeLabel : openLabel"
    @click="$emit('toggle')"
  >
    <span class="relative block h-4 w-4" aria-hidden="true">
      <span
        class="absolute left-0 top-[3px] h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-out"
        :class="open ? 'translate-y-[5px] rotate-45' : ''"
      />
      <span
        class="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded-full bg-current transition-opacity duration-200"
        :class="open ? 'opacity-0' : ''"
      />
      <span
        class="absolute left-0 top-[13px] h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-out"
        :class="open ? '-translate-y-[5px] -rotate-45' : ''"
      />
    </span>
  </button>
</template>

<script setup lang="ts">
/**
 * The open/close control for the site menu and for the drawers that sit below it.
 * The three lines rotate and cross into an X rather than being swapped for a
 * different icon, so the button looks like the same control the whole way.
 */
withDefaults(
  defineProps<{
    open: boolean
    /** Id of the region this button controls, for `aria-controls`. */
    controls: string
    openLabel?: string
    closeLabel?: string
    sizeClass?: string
  }>(),
  {
    openLabel: 'Open navigation',
    closeLabel: 'Close navigation',
    sizeClass: 'h-9 w-9',
  },
)

defineEmits<{ toggle: [] }>()
</script>