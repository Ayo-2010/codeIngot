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

export function setFirebaseServices(next: FirebaseServices | null): void {
  services = next
}

export function getFirebaseServices(): FirebaseServices | null {
  return services
}

export function firebaseAvailable(): boolean {
  return services !== null
}