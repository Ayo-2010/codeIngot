import { expect, test } from '@playwright/test'
import { gotoHydrated } from './helpers'

const SITE_URL = 'https://codeingot.vercel.app'

/**
 * Search metadata is server-rendered, so these checks read the same tags a
 * crawler does rather than waiting for hydration. They cover the shared
 * canonical helper and the two generated routes that make the site discoverable.
 */
test('a lesson has a canonical URL, description and social card', async ({ page }) => {
  await gotoHydrated(page, '/learn/html-fundamentals/html-l1')

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${SITE_URL}/learn/html-fundamentals/html-l1`,
  )
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/)
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /How this course works/)
  await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', /.+/)
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    `${SITE_URL}/learn/html-fundamentals/html-l1`,
  )
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary')
})

test('a course exposes structured data for its lessons', async ({ page }) => {
  await gotoHydrated(page, '/courses/html-fundamentals')

  const jsonLd = page.locator('script[type="application/ld+json"]')
  await expect(jsonLd).toHaveCount(1)
  const data = JSON.parse((await jsonLd.textContent()) ?? '{}')
  expect(data['@type']).toBe('Course')
  expect(data.name).toBe('HTML Fundamentals')
  expect(data.url).toBe(`${SITE_URL}/courses/html-fundamentals`)
  expect(data.provider.name).toBe('codeIngot')
  expect(data.inLanguage).toBe('en')
})

test('the home page declares the brand as WebSite and Organization', async ({ page }) => {
  await gotoHydrated(page, '/')

  const jsonLd = page.locator('script[type="application/ld+json"]').first()
  const data = JSON.parse((await jsonLd.textContent()) ?? '{}')
  const types = data['@graph'].map((entry: { '@type': string }) => entry['@type'])
  expect(types).toContain('WebSite')
  expect(types).toContain('Organization')
  for (const entry of data['@graph']) {
    expect(entry.name).toBe('codeIngot')
    expect(entry.url).toBe(SITE_URL)
  }
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    /Learn HTML, CSS and JavaScript/,
  )
})

test('a lesson ships a BreadcrumbList matching its real location', async ({ page }) => {
  await gotoHydrated(page, '/learn/html-fundamentals/html-l1')

  // <script> elements have no inner text, so read textContent directly.
  const jsonLd = page.locator('script[type="application/ld+json"]')
  await expect(jsonLd).toHaveCount(1)
  const data = JSON.parse((await jsonLd.textContent()) ?? '{}')
  expect(data['@type']).toBe('BreadcrumbList')
  const crumbs = data.itemListElement.map((item: { name: string }) => item.name)
  expect(crumbs).toEqual(['Home', 'Courses', 'HTML Fundamentals', 'How this course works'])
  expect(data.itemListElement[0].position).toBe(1)
  expect(data.itemListElement[3].item).toBe(`${SITE_URL}/learn/html-fundamentals/html-l1`)
})

test('sitemap.xml lists public pages and keeps private pages out', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('application/xml')

  const xml = await response.text()
  expect(xml).toContain(`<loc>${SITE_URL}/</loc>`)
  expect(xml).toContain(`<loc>${SITE_URL}/learn/html-fundamentals/html-l1</loc>`)
  expect(xml).toContain(`<loc>${SITE_URL}/projects/personal-profile-page</loc>`)
  expect(xml).not.toContain(`<loc>${SITE_URL}/account</loc>`)
  expect(xml).not.toContain(`<loc>${SITE_URL}/admin</loc>`)
  expect(xml).not.toContain(`<loc>${SITE_URL}/progress</loc>`)
})

test('robots.txt points at the sitemap and private pages are noindex', async ({ page, request }) => {
  const response = await request.get('/robots.txt')
  expect(response.status()).toBe(200)
  const robots = await response.text()
  expect(robots).toContain('User-agent: *')
  expect(robots).toContain(`Sitemap: ${SITE_URL}/sitemap.xml`)

  await gotoHydrated(page, '/account')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})
