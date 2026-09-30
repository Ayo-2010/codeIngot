<template>
  <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
    <header class="max-w-2xl">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Projects</h1>
      <p class="mt-3 text-muted">
        Projects are bigger than challenges and closer to real work: a brief, a design reference,
        starter files, and a checklist you have to satisfy before you can call it done.
      </p>
    </header>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <ProjectCard v-for="project in allProjects" :key="project.id" :project="project" />
    </div>

    <section class="mt-16 rounded-2xl border border-ink-600 bg-ink-900 p-6">
      <h2 class="text-lg font-semibold tracking-tight text-mist-50">How projects are graded</h2>
      <div class="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <p class="text-sm font-medium text-mist-50">Automated checks</p>
          <p class="mt-1.5 text-sm leading-relaxed text-muted">
            Items like "the page has a header" or "the layout uses grid" are verified against the
            files you actually wrote — element names, selectors, CSS rules and JS calls have to be
            present in your source, so a requirement cannot be satisfied by describing it in prose.
          </p>
        </div>
        <div>
          <p class="text-sm font-medium text-mist-50">Your own review</p>
          <p class="mt-1.5 text-sm leading-relaxed text-muted">
            Items marked for manual review are yours to decide: naming, structure, whether it actually
            feels good. That is the part automation cannot judge, and it is the part that matters most.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const allProjects = allProjectsList()

useHead({ title: 'Projects' })
</script>