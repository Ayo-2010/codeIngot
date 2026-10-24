<template>
  <div class="mx-auto max-w-4xl px-4 py-12 sm:px-6">
    <header class="max-w-2xl">
      <NuxtLink to="/reference/html" class="text-sm text-brand hover:underline">← HTML Reference</NuxtLink>
      <h1 class="text-3xl font-semibold tracking-tight text-mist-50">HTML URL Encode</h1>
      <p class="mt-3 text-muted">
        A URL may only carry a limited set of characters. Anything outside it has to be percent-encoded, and
        the wrong choice of encodeURIComponent or encodeURI is one of the easier ways to break a link.
      </p>
    </header>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">Try a value</h2>
      <label for="encode-input" class="mt-3 block text-sm text-muted">Text to encode</label>
      <input
        id="encode-input"
        v-model="value"
        type="text"
        class="mt-1 w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2 text-sm outline-none focus:border-brand"
      />

      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-4">
          <h3 class="font-mono text-xs text-brand">encodeURIComponent</h3>
          <p class="mt-1 text-xs text-dim">For a single value such as a query parameter.</p>
          <p class="mt-3 break-all font-mono text-sm text-mist-50">{{ encoded('component') || 'â€”' }}</p>
        </div>
        <div class="rounded-2xl border border-ink-600 bg-ink-900 p-4">
          <h3 class="font-mono text-xs text-brand">encodeURI</h3>
          <p class="mt-1 text-xs text-dim">For a whole URL, leaving its structure intact.</p>
          <p class="mt-3 break-all font-mono text-sm text-mist-50">{{ encoded('uri') || 'â€”' }}</p>
        </div>
      </div>
    </section>

    <section class="mt-8 overflow-x-auto rounded-2xl border border-ink-600">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-ink-600 bg-ink-900 text-xs uppercase tracking-wider text-dim">
            <th scope="col" class="px-4 py-3 font-semibold">Character</th>
            <th scope="col" class="px-4 py-3 font-semibold">Encoded</th>
            <th scope="col" class="px-4 py-3 font-semibold">What it is</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in table" :key="row.char" class="border-b border-ink-800 last:border-0">
            <td class="px-4 py-2.5 font-mono text-mist-50">{{ row.char }}</td>
            <td class="px-4 py-2.5 font-mono text-brand">{{ row.encoded }}</td>
            <td class="px-4 py-2.5 text-mist-200">{{ row.note }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="mt-8">
      <h2 class="text-sm font-semibold text-mist-50">Rules worth remembering</h2>
      <ul class="mt-3 space-y-2 text-sm leading-relaxed text-mist-200">
        <li>
          A space becomes <code class="font-mono text-brand">%20</code> in a path but
          <code class="font-mono text-brand">+</code> in a query string. encodeURIComponent gives you the
          first, so use it on a value and let the form encoding deal with the second.
        </li>
        <li>
          Never encode the separators. Encoding a whole URL with encodeURIComponent turns every slash into
          <code class="font-mono text-brand">%2F</code> and the URL stops resolving.
        </li>
        <li>
          <code class="font-mono text-brand">decodeURIComponent</code> reverses one value, and
          <code class="font-mono text-brand">decodeURI</code> reverses a whole URL. Mixing them up leaves
          stray <code class="font-mono text-brand">%25</code> in the string.
        </li>
        <li>
          Build a query string with <code class="font-mono text-brand">URLSearchParams</code> rather than by
          hand. It encodes values correctly and re-encodes ampersands in them.
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'reference' })
usePageSeo({
  title: 'HTML URL encode',
  description:
    'Which characters a URL can carry and how to percent-encode the rest, including when encodeURIComponent and encodeURI differ.',
})

const value = ref('a b & c=d/Ã©')

function encoded(kind: 'component' | 'uri') {
  const input = value.value
  if (!input) return ''
  return kind === 'component' ? encodeURIComponent(input) : encodeURI(input)
}

const table = [
  { char: 'space', encoded: '%20', note: 'A literal space is not allowed in a URL at all.' },
  { char: '"', encoded: '%22', note: 'Breaks an attribute value if it is left unencoded.' },
  { char: '#', encoded: '%23', note: 'Starts the fragment, so an unencoded one is read as an anchor.' },
  { char: '&', encoded: '%26', note: 'Separates query parameters, so it is the classic query-injection bug.' },
  { char: '+', encoded: '%2B', note: 'Decodes as a space in a query string, which is not obvious.' },
  { char: '/', encoded: '%2F', note: 'A path separator. encodeURI leaves it alone; encodeURIComponent does not.' },
  { char: ':', encoded: '%3A', note: 'Starts the scheme, so encoding it changes a URL into something else.' },
  { char: '?', encoded: '%3F', note: 'Starts the query string.' },
  { char: '= ', encoded: '%3D', note: 'Separates a parameter name from its value.' },
  { char: 'Ã©', encoded: '%C3%A9', note: 'Two bytes in UTF-8, hence two escapes.' },
  { char: 'â‚¬', encoded: '%E2%82%AC', note: 'Three bytes, and the reason a byte-oriented encoder is wrong.' },
]
</script>
