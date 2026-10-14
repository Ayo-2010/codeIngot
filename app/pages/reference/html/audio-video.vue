<template>
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML Audio/Video</h1>
      <p class="mt-3 text-muted">
        {{ formats.length }} formats worth knowing. MP4 with H.264 is the only video that plays everywhere
        without a second source, and a poster frame plus captions are the two things most sites leave out.
      </p>
    </header>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">A player that works</h2>
      <figure class="mt-3 overflow-hidden rounded-2xl border border-ink-600 bg-ink-900">
        <pre class="overflow-x-auto p-3 font-mono text-[12.5px] leading-6 text-mist-200"><code>{{ example }}</code></pre>
      </figure>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-mist-200">
        <li>
          The <code class="font-mono text-brand">controls</code> attribute is what gives you real keyboard
          and screen reader support. A media element without it is inert for most readers.
        </li>
        <li>
          <code class="font-mono text-brand">preload="metadata"</code> fetches just enough to show a
          duration and seek bar, which is the right default on a page with several players.
        </li>
        <li>
          Two <code class="font-mono text-brand">source</code> elements with
          <code class="font-mono text-brand">type</code> attributes let the browser pick, so it never
          downloads a codec it cannot play.
        </li>
      </ul>
    </section>

    <div class="mt-8 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="w-1/4 px-4 py-3 font-semibold">Format</th>
            <th scope="col" class="w-1/4 px-4 py-3 font-semibold">MIME type</th>
            <th scope="col" class="px-4 py-3 font-semibold">Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="format in formats" :key="format.format" class="border-b border-ink-800 align-top last:border-0">
            <th scope="row" class="px-4 py-2.5 font-medium text-mist-50">{{ format.format }}</th>
            <td class="px-4 py-2.5 font-mono text-xs text-brand">{{ format.type }}</td>
            <td class="px-4 py-2.5 text-mist-200">{{ format.note }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
useHead({ title: 'HTML audio and video' })

const formats = await htmlReferenceMediaFormats()

const example = `<video controls preload="metadata" width="640" poster="/images/talk.jpg">
  <source src="/media/talk.mp4" type="video/mp4">
  <source src="/media/talk.webm" type="video/webm">
  <track src="/media/talk.vtt" kind="captions" srclang="en" label="English" default>
  Your browser cannot play this video.
  <a href="/media/talk.mp4">Download it instead</a>.
</video>`
</script>
