/**
 * Everything about the visitor's own machine that can be read without a server
 * round trip. The parts that cannot (public IP, location, provider) come from
 * `/api/device-info`, which is only called once an account exists.
 */

export interface DeviceFingerprint {
  /** Stable per browser, so the same machine does not create a new row each visit. */
  deviceId: string
  /** Human label such as "Windows · Chrome". */
  deviceName: string
  osName: string
  browserName: string
  userAgent: string
  language: string
  timeZone: string
  screen: string
  touch: boolean
}

const DEVICE_ID_KEY = 'app-device-id'

/**
 * Edge and Opera both advertise Chrome in their user agent, and Safari's token
 * is the last word on "not Chrome", so the order here is the whole algorithm.
 */
function detectBrowser(userAgent: string): string {
  if (/Edg\//.test(userAgent)) return 'Edge'
  if (/OPR\//.test(userAgent)) return 'Opera'
  if (/SamsungBrowser/.test(userAgent)) return 'Samsung Internet'
  if (/CriOS/.test(userAgent)) return 'Chrome'
  if (/Firefox\//.test(userAgent)) return 'Firefox'
  if (/Chrome\//.test(userAgent)) return 'Chrome'
  if (/Version\/.*Safari/.test(userAgent)) return 'Safari'
  return 'Browser'
}

function detectOs(userAgent: string): string {
  if (/Windows NT 10/.test(userAgent)) return 'Windows 10/11'
  if (/Windows/.test(userAgent)) return 'Windows'
  if (/iPhone|iPad|iPod/.test(userAgent)) return 'iOS'
  if (/Android/.test(userAgent)) return 'Android'
  if (/CrOS/.test(userAgent)) return 'ChromeOS'
  if (/Mac OS X/.test(userAgent)) return 'macOS'
  if (/Linux/.test(userAgent)) return 'Linux'
  return 'Unknown OS'
}

function randomId(): string {
  const cryptoApi = globalThis.crypto
  if (cryptoApi?.randomUUID) return cryptoApi.randomUUID()
  return `dev-${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`
}

/**
 * The id is stored locally rather than derived from the user agent on purpose:
 * a fingerprint derived from hardware details would follow the person across
 * browsers, which is not something a learning site should do.
 */
export function readDeviceId(): string {
  if (!import.meta.client) return 'server'
  try {
    const existing = window.localStorage.getItem(DEVICE_ID_KEY)
    if (existing) return existing
    const created = randomId()
    window.localStorage.setItem(DEVICE_ID_KEY, created)
    return created
  } catch {
    return randomId()
  }
}

export function readDeviceFingerprint(): DeviceFingerprint {
  if (!import.meta.client) {
    return {
      deviceId: 'server',
      deviceName: 'Unknown device',
      osName: 'Unknown OS',
      browserName: 'Browser',
      userAgent: '',
      language: '',
      timeZone: '',
      screen: '',
      touch: false,
    }
  }

  const userAgent = navigator.userAgent
  const osName = detectOs(userAgent)
  const browserName = detectBrowser(userAgent)

  return {
    deviceId: readDeviceId(),
    deviceName: `${osName} · ${browserName}`,
    osName,
    browserName,
    userAgent,
    language: navigator.language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${window.screen.width}×${window.screen.height}`,
    touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  }
}