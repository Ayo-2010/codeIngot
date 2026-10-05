import { getApp, getApps, initializeApp } from 'firebase/app'
import { browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { registerCloudStorage } from '~/utils/progress-storage'
import { FirestoreProgressStorage } from '~/utils/firebase-store'
import { setFirebaseServices } from '~/utils/firebase-services'

/**
 * Starts Firebase in the browser and hands progress storage a cloud provider.
 *
 * The plugin is deliberately forgiving: if the config is incomplete or the SDK
 * refuses to start, nothing is registered and the app carries on with
 * localStorage only. Signing in is an upgrade, never a requirement.
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.firebase

  if (!config?.apiKey || !config?.projectId || !config?.appId) {
    console.warn('[firebase] config incomplete; running with local progress only')
    setFirebaseServices(null)
    return
  }

  try {
    const app = getApps().length > 0 ? getApp() : initializeApp(config)
    const auth = getAuth(app)
    // Keeps the learner signed in across reloads, which is what makes "your
    // progress is saved" feel true once an account exists.
    void setPersistence(auth, browserLocalPersistence).catch(() => {
      /* private browsing can refuse; the in-memory session still works */
    })
    const db = getFirestore(app)

    setFirebaseServices({ app, auth, db })
    registerCloudStorage(new FirestoreProgressStorage(() => ({ auth, db })))
  } catch (error) {
    console.warn('[firebase] init failed; running with local progress only', error)
    setFirebaseServices(null)
  }
})