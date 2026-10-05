export function useFirebase() {
  return getFirebaseServices()
}

export function useFirebaseAccess() {
  const services = getFirebaseServices()
  return { auth: services?.auth ?? null, db: services?.db ?? null }
}