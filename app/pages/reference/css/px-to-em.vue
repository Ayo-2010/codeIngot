<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/css" class="text-sm text-brand hover:underline">← CSS Reference</NuxtLink>
      <h1 class="mt-3 text-3xl font-semibold tracking-tight text-mist-50">CSS PX-EM Converter</h1>
      <p class="mt-3 text-muted">
        1em is the font size of the element, so a value in em scales with the reader's text size instead
        of staying fixed. The base size only matters for converting a single value.
      </p>
    </header>

    <section class="mt-8 rounded-2xl border border-ink-600 bg-ink-900 p-5">
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="base-size" class="block text-sm text-muted">Base font size (px)</label>
          <input
            id="base-size"
            v-model.number="base"
            type="number"
            min="1"
            step="1"
            class="mt-1 w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2 font-mono text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label for="px-value" class="block text-sm text-muted">Value in px</label>
          <input
            id="px-value"
            v-model.number="px"
            type="number"
            min="0"
            step="0.5"
            class="mt-1 w-full rounded-lg border border-ink-600 bg-ink-950 px-3 py-2 font-mono text-sm outline-none focus:border-brand"
          />
        </div>
      </div>

      <div class="mt-5 grid gap-3 sm:grid-cols-3">
        <div class="rounded-xl border border-ink-600 bg-ink-950 p-3">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">em</p>
          <p class="mt-1 font-mono text-xl text-brand">{{ inEm.toFixed(4) }}</p>
        </div>
        <div class="rounded-xl border border-ink-600 bg-ink-950 p-3">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">rem</p>
          <p class="mt-1 font-mono text-xl text-mist-50">{{ inRem.toFixed(4) }}</p>
        </div>
        <div class="rounded-xl border border-ink-600 bg-ink-950 p-3">
          <p class="font-mono text-[11px] uppercase tracking-wider text-dim">%</p>
          <p class="mt-1 font-mono text-xl text-mist-50">{{ inPercent.toFixed(2) }}</p>
        </div>
      </div>

      <p v-if="base <= 0" class="mt-3 text-xs text-warn">
        A base of 0 or less cannot be divided into, so 16 is used instead.
      </p>
    </section>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">A scale to copy</h2>
      <div class="mt-3 overflow-x-auto rounded-2xl border border-ink-600">
        <table class="w-full text-left font-mono text-sm">
          <thead>
            <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
              <th scope="col" class="px-4 py-3 font-semibold">px</th>
              <th scope="col" class="px-4 py-3 font-semibold">em</th>
              <th scope="col" class="px-4 py-3 font-semibold">rem</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in scale" :key="row.px" class="border-b border-ink-800 last:border-0">
              <td class="px-4 py-2 text-mist-50">{{ row.px }}</td>
              <td class="px-4 py-2 text-brand">{{ row.em }}</td>
              <td class="px-4 py-2 text-mist-200">{{ row.rem }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">When each one is right</h2>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-mist-200">
        <li>
          <code class="font-mono text-brand">em</code> is relative to the element's own font size, so it
          compounds inside another <code class="font-mono text-brand">em</code>. Convenient for padding
          that should follow the text, and a trap anywhere the nesting is not obvious.
        </li>
        <li>
          <code class="font-mono text-brand">rem</code> is relative to the root, so it never compounds.
          Use it for the type scale, spacing and any component padding that has to stay predictable
          however deeply it is nested.
        </li>
        <li>
          <code class="font-mono text-brand">%</code> behaves like <code class="font-mono text-brand">em</code>
          for padding and margin, and resolves against the containing block width even on the vertical
          axis, which is rarely what you want for vertical padding.
        </li>
        <li>
          Leave border widths, hairline dividers and shadows in
          <code class="font-mono text-brand">px</code>. A hairline that scales with the text is thick on a
          large display and invisible on a small one.
        </li>
        <li>
          Once everything is in relative units, a single change to the root
          <code class="font-mono text-brand">font-size</code> rescales the whole design. That is the real
          reason to convert.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'CSS PX to EM converter',
  description:
    'Convert PX to EM and back: a value in em scales with the text size a reader picks, and the converter shows the maths for any base font size.',
})

const base = ref(16)
const px = ref(24)

// Guard against a zero or negative base turning the division into Infinity.
const safeBase = computed(() => (base.value > 0 ? base.value : 16))
const safePx = computed(() => (px.value > 0 ? px.value : 0))

const inEm = computed(() => safePx.value / safeBase.value)
const inRem = computed(() => inEm.value)
const inPercent = computed(() => inEm.value * 100)

const steps = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 64]

const scale = computed(() =>
  steps.map((value) => ({
    px: value,
    em: (value / safeBase.value).toFixed(4),
    rem: (value / safeBase.value).toFixed(4),
  })),
)
</script>