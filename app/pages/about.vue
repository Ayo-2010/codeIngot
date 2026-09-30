<template>
  <div class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
    <p class="font-mono text-[11px] uppercase tracking-widest text-brand">About</p>
    <h1 class="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
      Learn by writing code, not just reading about code.
    </h1>

    <div class="prose-ingot mt-8 space-y-4 text-[15px]">
      <p>
        codeIngot exists because reading about code and writing code are different activities, and only
        one of them makes you a developer. Every lesson here is built around a loop:
      </p>
      <ol class="space-y-1.5">
        <li>learn one idea → see it run → write it yourself → get real feedback → pass the tests</li>
      </ol>
      <p>
        That is why the editor is never far away, why challenges are graded with test cases instead of
        string matching, and why the feedback tells you what is wrong rather than just that something
        is wrong.
      </p>
      <h2 class="pt-4 text-xl font-semibold text-mist-50">How it is built</h2>
      <p>
        Content is data, not markup: courses, sections, lessons, exercises, quizzes and projects live in
        typed objects. Adding a course or a technology does not require touching a single component.
      </p>
      <p>
        Learner code runs inside a sandboxed frame with no access to this page, and the console captures
        <code>console.log</code>, warnings and runtime errors from inside it.
      </p>
      <p>
        Progress is derived rather than duplicated — course and path progress are computed from the
        lessons you actually completed, so a number on the dashboard can never disagree with the work.
      </p>
      <h2 class="pt-4 text-xl font-semibold text-mist-50">No account in version one</h2>
      <p>
        You can start immediately. Progress lives in your browser under
        <code>app-learning-progress</code>, behind a small storage interface. When accounts arrive, a
        cloud provider can replace the local one without the learning experience changing at all.
      </p>
      <h2 class="pt-4 text-xl font-semibold text-mist-50">What comes next</h2>
      <p>
        The Frontend Developer path is modelled for nine stages: HTML, CSS, JavaScript, DOM and browser
        APIs, responsive design, Git and GitHub, TypeScript, React, and a final projects stage. Only the
        first three are published today; the data model already supports the rest.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'About' })
</script>