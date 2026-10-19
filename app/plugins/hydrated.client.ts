/**
 * Marks the document once the app has hydrated and its event handlers are live.
 *
 * The browser tests wait for this before they interact: clicking or hovering a
 * server-rendered control before hydration is attached does nothing, which reads
 * as a broken feature rather than a fast test. It is also the honest signal for
 * "hydration has finished, anything it was going to do has happened".
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    document.documentElement.dataset.hydrated = 'true'
  })
})
