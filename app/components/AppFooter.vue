<template>
  <footer class="mt-24 border-t border-ink-600/70 bg-ink-950">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
      <div class="md:col-span-2">
        <p class="text-sm font-semibold tracking-tight text-mist-50">
          code<span class="text-brand">Ingot</span>
        </p>
        <p class="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          Learn to build by actually building. Every lesson ends in a working editor, a running
          preview and a challenge with real tests.
        </p>
        <p class="mt-4 font-mono text-xs text-dim">No account required. Progress stays in your browser.</p>
      </div>
      <nav v-for="group in groups" :key="group.label" :aria-label="group.label">
        <p class="text-[11px] font-semibold uppercase tracking-wider text-dim">{{ group.label }}</p>
        <ul class="mt-3 space-y-2">
          <li v-for="item in group.items" :key="item.to">
            <NuxtLink :to="item.to" class="text-sm text-muted transition hover:text-brand">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div
      class="border-t border-ink-600/60 px-4 py-5 text-center text-xs text-dim sm:px-6"
    >
      Built as an open learn-by-doing environment. HTML, CSS and JavaScript, from the ground up.
    </div>
  </footer>
</template>

<script setup lang="ts">
const groups = [
  {
    label: 'Learn',
    items: [
      { to: '/paths', label: 'Learning paths' },
      { to: '/courses', label: 'Course catalog' },
      { to: '/dashboard', label: 'Dashboard' },
    ],
  },
  {
    label: 'Practice',
    items: [
      { to: '/challenges', label: 'Challenges' },
      { to: '/projects', label: 'Projects' },
      { to: '/playground', label: 'Playground' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { to: '/reference', label: 'Reference' },
      { to: '/progress', label: 'Progress' },
      { to: '/about', label: 'About' },
    ],
  },
]
</script>