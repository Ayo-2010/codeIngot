/**
 * Vue's SSR renderer emits a prefetch hint for every dynamic import reachable
 * from the modules used to render the page. The home page imports the course
 * catalogue, so that includes every lesson, every project body and the Firebase
 * SDK: roughly a megabyte of scripts the visitor has not asked for, racing the
 * page for bandwidth on a phone.
 *
 * NuxtLink still prefetches on hover and focus (see `prefetchOn` in
 * `nuxt.config.ts`), so navigation keeps its head start without paying for the
 * whole catalogue on first paint. Only script hints are removed; styles and
 * fonts are not the problem and can stay.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    html.head = html.head.map((chunk) =>
      chunk.replace(/<link\b[^>]*\brel="prefetch"[^>]*\bas="script"[^>]*>/gi, ''),
    )
  })
})
