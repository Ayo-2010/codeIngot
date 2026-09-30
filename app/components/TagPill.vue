<template>
  <span
    class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium"
    :class="tone"
  >
    {{ label }}
  </span>
</template>

<script setup lang="ts">
type Tone = 'brand' | 'info' | 'warn' | 'ok' | 'bad' | 'muted'

const props = withDefaults(defineProps<{ tone?: Tone; value: string }>(), { tone: 'muted' })

const label = computed(() => {
  if (props.value === 'beginner') return 'Beginner'
  if (props.value === 'intermediate') return 'Intermediate'
  if (props.value === 'advanced') return 'Advanced'
  return props.value.charAt(0).toUpperCase() + props.value.slice(1)
})

const tone = computed(() => {
  const map: Record<Tone, string> = {
    brand: 'border-brand/35 bg-brand/10 text-brand',
    info: 'border-info/30 bg-info/10 text-info',
    warn: 'border-warn/30 bg-warn/10 text-warn',
    ok: 'border-ok/30 bg-ok/10 text-ok',
    bad: 'border-bad/30 bg-bad/10 text-bad',
    muted: 'border-ink-500 bg-ink-800 text-muted',
  }
  return map[props.tone ?? 'muted']
})
</script>