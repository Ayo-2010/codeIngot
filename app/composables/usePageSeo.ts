import { computed, toValue, type MaybeRefOrGetter } from 'vue'

type SeoValue = MaybeRefOrGetter<string>

interface PageSeoOptions {
  title: SeoValue
  description: SeoValue
  /** Defaults to the current route, without its query string or hash. */
  path?: SeoValue
  type?: 'website' | 'article' | 'profile' | 'book'
  noindex?: boolean
  /** Optional schema.org payload rendered as JSON-LD. */
  jsonLd?: MaybeRefOrGetter<Record<string, unknown> | undefined>
}

/**
 * One place for the metadata every public page needs.
 *
 * `titleTemplate` in nuxt.config adds the site name; the Open Graph and Twitter
 * copies use the same title so a shared link does not have two different names.
 * The canonical URL always uses the configured public origin rather than the
 * host header, so preview deployments do not advertise themselves to search.
 */
export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()
  const siteUrl = String(useRuntimeConfig().public.siteUrl).replace(/\/+$/, '')
  const path = computed(() => {
    const value = toValue(options.path) || route.path
    if (value === '/') return ''
    return `/${value.replace(/^\/+|\/+$/g, '')}`
  })
  const canonical = computed(() => `${siteUrl}${path.value}`)

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogUrl: canonical,
    ogType: options.type ?? 'website',
    ogSiteName: 'codeIngot',
    ogLocale: 'en_US',
    twitterCard: 'summary',
    twitterTitle: options.title,
    twitterDescription: options.description,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  useHead({
    link: [{ rel: 'canonical', href: canonical, key: 'canonical' }],
  })

  if (options.jsonLd) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: computed(() => {
            const value = toValue(options.jsonLd)
            return value ? JSON.stringify(value).replace(/</g, '\\u003c') : ''
          }),
        },
      ],
    })
  }

  return { canonical }
}
