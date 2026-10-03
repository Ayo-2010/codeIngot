<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">PX to EM Converter</h1>
      <p class="mt-3 text-muted">
        1em is the font size of the element, so converting to em makes a value scale with the reader's
        preference instead of being fixed. The base size only matters for a single px to em conversion.
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
          compounds: an <code class="font-mono text-brand">em</code> inside another
          <code class="font-mono text-brand">em</code> is a fraction of the first. Convenient for padding
          that should follow the text.
        </li>
        <li>
          <code class="font-mono text-brand">rem</code> is relative to the root, so it never compounds. Use
          it for type scale, spacing and anything where a nested value should stay predictable.
        </li>
        <li>
          <code class="font-mono text-brand">%</code> behaves like <code class="font-mono text-brand">em</code>
          in most cases, and is the older notation for it.
        </li>
        <li>
          Leave a border width in <code class="font-mono text-brand">px</code>. A hairline that scales with
          the text gets thick on a large display and disappears on a small one.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'PX to EM converter' })

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
