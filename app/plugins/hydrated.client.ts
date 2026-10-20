/**
 * Marks the document once the app is hydrated *and* the browser has finished the
 * hydration task.
 *
 * The browser tests wait for this before they interact. `app:mounted` alone is
 * too early: a control can be in the DOM, look interactive, and still have no
 * listener attached, so a click does nothing and reads as a broken feature. One
 * frame after the hook, the hydration task has completed and listeners are live.
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.dataset.hydrated = 'true'
      })
    })
  })
})
