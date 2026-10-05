/**
 * Coarse location and internet provider for the visitor.
 *
 * This has to run on the server: the browser cannot see its own public address,
 * and a third-party lookup from the client would leak every learner's visit to
 * that lookup service. It is only called when an account exists, so browsing
 * without signing in makes no external request at all.
 *
 * The address itself is deliberately never returned. It is read here to resolve
 * a location, then dropped: the client is never told what it is and no row ever
 * stores it, so there is nothing to leak or delete later.
 */

export interface NetworkInfo {
  city?: string
  region?: string
  country?: string
  countryCode?: string
  timezone?: string
  /** Internet service provider, e.g. the ISP or hosting provider. */
  isp?: string
  organisation?: string
  lookedUpAt?: string
}

const PRIVATE_V4 = [
  /^10\./,
  /^192\.168\./,
  /^127\./,
  /^169\.254\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
]

function isPrivateAddress(ip: string | null | undefined): boolean {
  if (!ip) return true
  if (ip === '::1' || ip === '0.0.0.0') return true
  if (ip.startsWith('fe80') || ip.startsWith('fc') || ip.startsWith('fd')) return true
  return PRIVATE_V4.some((pattern) => pattern.test(ip))
}

/**
 * Proxies rewrite the client address, so the left-most forwarded entry is the
 * closest thing to the real visitor. Cloudflare and Vercel front this app, so
 * their own headers are preferred over the raw socket address.
 */
function resolveIp(event: Parameters<typeof getRequestIP>[0]): string | null {
  const headers = getRequestHeaders(event)
  const candidates = [
    headers['cf-connecting-ip'],
    headers['x-real-ip'],
    headers['x-vercel-forwarded-for'],
    ...String(headers['x-forwarded-for'] ?? '')
      .split(',')
      .map((value) => value.trim()),
  ].filter((value): value is string => typeof value === 'string' && value.length > 0)

  const found = candidates.find((value) => !isPrivateAddress(value))
  return found ?? getRequestIP(event, { xForwardedFor: true }) ?? candidates[0] ?? null
}

/** The slice of the ipwho.is response this route actually reads. */
interface IpLookupResponse {
  success?: boolean
  city?: string
  region?: string
  country?: string
  country_code?: string
  timezone?: { id?: string }
  connection?: { isp?: string; org?: string }
}

/** ipwho.is is keyless and answers over HTTPS; anything else is a no-op. */
async function lookup(ip: string): Promise<Partial<NetworkInfo>> {
  try {
    const response = await $fetch<IpLookupResponse>(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      timeout: 4000,
      retry: 0,
    })
    if (response?.success !== true) return {}
    return {
      city: response.city,
      region: response.region,
      country: response.country,
      countryCode: response.country_code,
      timezone: response.timezone?.id,
      isp: response.connection?.isp,
      organisation: response.connection?.org,
    }
  } catch {
    // Location is a nice-to-have; failing to reach the lookup must never break
    // the sign-in that asked for it.
    return {}
  }
}

export default defineEventHandler(async (event): Promise<NetworkInfo> => {
  const ip = resolveIp(event)

  // Loopback or RFC1918 means there is no public address to resolve.
  if (!ip || isPrivateAddress(ip)) return {}

  const details = await lookup(ip)
  return { ...details, lookedUpAt: new Date().toISOString() }
})