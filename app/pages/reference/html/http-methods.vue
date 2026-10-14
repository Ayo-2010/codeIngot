<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTTP Methods</h1>
      <p class="mt-3 text-muted">
        {{ methods.length }} methods a browser or API can send. Whether a method is idempotent decides if it
        is safe to retry after a network failure, which is a property of the method rather than of your code.
      </p>
    </header>

    <div class="mt-8 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="w-32 px-4 py-3 font-semibold">Method</th>
            <th scope="col" class="w-32 px-4 py-3 font-semibold">Idempotent</th>
            <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in methods" :key="row.method" class="border-b border-ink-800 align-top last:border-0">
            <th scope="row" class="px-4 py-2.5 font-mono font-semibold text-brand">{{ row.method }}</th>
            <td class="px-4 py-2.5">
              <span :class="row.idempotent ? 'text-ok' : 'text-warn'">{{ row.idempotent ? 'Yes' : 'No' }}</span>
            </td>
            <td class="px-4 py-2.5 text-mist-200">{{ row.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">Choosing between POST and PUT</h2>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-mist-200">
        <li>
          <code class="font-mono text-brand">POST</code> means "do this thing" and the server decides what
          address the result gets. Submitting a form twice creates two records.
        </li>
        <li>
          <code class="font-mono text-brand">PUT</code> means "make this address hold exactly this". Sending
          it twice leaves the same state, so a retry is safe.
        </li>
        <li>
          <code class="font-mono text-brand">PATCH</code> is for a partial change. It is the one browsers
          still restrict in a form, so it needs fetch rather than a form post.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTTP methods' })

const methods = await htmlReferenceHttpMethods()
</script>
