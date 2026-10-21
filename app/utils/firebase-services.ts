import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

export interface FirebaseServices {
  app: FirebaseApp
  auth: Auth
  db: Firestore
}

/**
 * The client SDK only exists in the browser and only after the plugin has run,
 * so it is held in a module singleton rather than through Nuxt's injection.
 * `null` is a normal state, not an error: it means the app is running without
 * Firebase, which is exactly how it behaves for an anonymous learner.
 */
let services: FirebaseServices | null = null
let loader: (() => Promise<FirebaseServices | null>) | null = null
let pending: Promise<FirebaseServices | null> | null = null

export function setFirebaseServices(next: FirebaseServices | null): void {
  services = next
}

export function getFirebaseServices(): FirebaseServices | null {
  return services
}

/**
 * The plugin registers the importer; the SDK itself is only fetched the first
 * time something asks for it. Every caller shares the same in-flight promise,
 * so a sign-in click and an idle warm-up cannot initialize Firebase twice.
 */
export function setFirebaseLoader(next: (() => Promise<FirebaseServices | null>) | null): void {
  loader = next
}

export function loadFirebaseServices(): Promise<FirebaseServices | null> {
  if (services) return Promise.resolve(services)
  if (!loader) return Promise.resolve(null)
  if (!pending) {
    pending = loader()
      .catch(() => null)
      .finally(() => {
        pending = null
      })
  }
  return pending
}

export function firebaseAvailable(): boolean {
  return services !== null
}