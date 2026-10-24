import { setFirebaseLoader, setFirebaseServices } from '~/utils/firebase-services'
import { registerCloudStorage } from '~/utils/progress-storage'

/**
 * Starts Firebase in the browser and hands progress storage a cloud provider.
 *
 * The SDK is not imported here. The plugin registers an importer; the auth
 * composable asks for it only when a remembered session is being restored or
 * the visitor starts signing in. Signing in is an upgrade, never a requirement,
 * so a visitor who only reads lessons never downloads the auth and Firestore code.
 *
 * The plugin is deliberately forgiving: if the config is incomplete or the SDK
 * refuses to start, nothing is registered and the app carries on with
 * localStorage only.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.firebase

  if (!config?.apiKey || !config?.projectId || !config?.appId) {
    console.warn('[firebase] config incomplete; running with local progress only')
    setFirebaseServices(null)
    return
  }

  setFirebaseLoader(async () => {
    try {
      const [appSdk, authSdk, firestoreSdk] = await Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebase/firestore'),
      ])

      const app = appSdk.getApps().length > 0 ? appSdk.getApp() : appSdk.initializeApp(config)
      const auth = authSdk.getAuth(app)
      // Keeps the learner signed in across reloads, which is what makes "your
      // progress is saved" feel true once an account exists.
      void authSdk.setPersistence(auth, authSdk.browserLocalPersistence).catch(() => {
        /* private browsing can refuse; the in-memory session still works */
      })
      const db = firestoreSdk.getFirestore(app)

      const { FirestoreProgressStorage } = await import('~/utils/firebase-store')
      const services = { app, auth, db }
      setFirebaseServices(services)
      registerCloudStorage(new FirestoreProgressStorage(() => ({ auth, db })))
      return services
    } catch (error) {
      console.warn('[firebase] init failed; running with local progress only', error)
      setFirebaseServices(null)
      return null
    }
  })
})
