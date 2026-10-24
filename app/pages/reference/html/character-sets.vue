<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Character Sets</h1>
      <p class="mt-3 text-muted">
        Declare UTF-8 and nothing else. The character set is what tells the browser how to turn the bytes
        it received into characters, and a wrong guess produces the mojibake you have seen in comments.
      </p>
    </header>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">Declaring it</h2>
      <figure class="mt-3 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
        <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6 text-mist-200"><code>{{ example }}</code></pre>
      </figure>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-mist-200">
        <li>
          The meta charset has to be inside <code class="font-mono text-brand">head</code> and within the
          first 1024 bytes. After that the browser may already have started decoding.
        </li>
        <li>
          The http-equiv form is an obsolete alternative. Use it only when you cannot add a meta element.
        </li>
        <li>
          The server can also send <code class="font-mono text-brand">Content-Type: text/html; charset=utf-8</code>.
          The server header wins when the two disagree, so fix it there.
        </li>
      </ul>
    </section>

    <div class="mt-8 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="px-4 py-3 font-semibold">Label</th>
            <th scope="col" class="px-4 py-3 font-semibold">Charset</th>
            <th scope="col" class="px-4 py-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="set in characterSets" :key="set.charset" class="border-b border-ink-800 align-top last:border-0">
            <th scope="row" class="px-4 py-2.5 font-medium text-mist-50">{{ set.label }}</th>
            <td class="px-4 py-2.5 font-mono text-xs text-brand">{{ set.charset }}</td>
            <td class="px-4 py-2.5 text-mist-200">{{ set.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'HTML character sets',
  description:
    'Why UTF-8 is the only character set to declare in HTML, where the meta charset goes and how a wrong guess turns text into mojibake.',
})

const characterSets = await htmlReferenceCharacterSets()

const example = `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Reports</title>
</head>`
</script>
