export default defineNuxtPlugin((nuxtApp) => {
  const { init } = useLearningProgress()
  nuxtApp.hooks.hook('app:mounted', () => {
    void init()
  })
})
