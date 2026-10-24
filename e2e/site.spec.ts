import { test, expect, type Page } from '@playwright/test'

/**
 * Server-rendered controls do nothing until hydration attaches their handlers.
 * The header hydrates inside the layout's suspense boundary, after `app:mounted`,
 * so wait for its own marker rather than the app-wide one.
 */
async function gotoHydrated(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(
    () =>
      document.documentElement.dataset.hydrated === 'true' &&
      document.documentElement.dataset.headerReady === 'true',
  )
}

test('the header Courses menu lists every course', async ({ page }) => {
  await gotoHydrated(page, '/')

  const button = page.getByRole('button', { name: 'Courses' })
  await expect(button).toHaveAttribute('aria-expanded', 'false')

  await button.hover()
  await expect(button).toHaveAttribute('aria-expanded', 'true')

  const allCourses = page.getByRole('link', { name: 'All courses' })
  await expect(allCourses).toBeVisible()

  // The menu is a real catalogue, not just a link to the courses index.
  const links = page.locator('header a[href^="/courses/"]')
  await expect(links.first()).toBeVisible()
  expect(await links.count()).toBeGreaterThanOrEqual(5)

  await allCourses.click()
  await expect(page).toHaveURL(/\/courses\/?$/)
})

test('the header Courses menu works from the keyboard', async ({ page }) => {
  await gotoHydrated(page, '/')

  const button = page.getByRole('button', { name: 'Courses' })
  const allCourses = page.getByRole('link', { name: 'All courses' })

  // Focus alone must not open it; the button is a disclosure.
  await button.focus()
  await expect(button).toHaveAttribute('aria-expanded', 'false')

  // `press` re-resolves and focuses the button, so a re-render cannot leave the
  // key going to a detached element.
  await button.press('Enter')
  await expect(button).toHaveAttribute('aria-expanded', 'true', { timeout: 10_000 })
  await expect(allCourses).toBeVisible()
  await expect(button).toBeFocused()

  // Tab walks into the open menu rather than past it.
  await page.keyboard.press('Tab')
  await expect(allCourses).toBeFocused()

  // Escape closes it and hands focus back to the button.
  await page.keyboard.press('Escape')
  await expect(button).toHaveAttribute('aria-expanded', 'false')
  await expect(button).toBeFocused()
  await expect(allCourses).toBeHidden()
})

test('the mobile header menu opens and labels its groups', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await gotoHydrated(page, '/')

  // The label flips to "Close navigation" once open, so target the control by
  // what it controls rather than by its current name.
  const toggle = page.locator('button[aria-controls="mobile-nav"]')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()

  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(toggle).toHaveAccessibleName('Close navigation')
  const mobileNav = page.getByRole('navigation', { name: 'Mobile' })
  await expect(mobileNav).toBeVisible()
  // Each group is named, so "All courses" is not an orphan link.
  await expect(mobileNav.getByText('Courses', { exact: true })).toBeVisible()
  await expect(mobileNav.getByRole('link', { name: 'All courses' })).toBeVisible()
})

test('the mobile account control has an accessible name', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await gotoHydrated(page, '/')

  // The visible "Sign in" label is hidden at this width; the icon is
  // decorative, so the button itself has to carry the name.
  const account = page.locator('header button[aria-controls="account-dialog"]')
  await expect(account).toHaveAccessibleName('Sign in')
})

test('the home page does not prefetch route chunks', async ({ page }) => {
  await gotoHydrated(page, '/')

  // Every dynamic import reachable from the catalogue used to get a prefetch
  // hint. Those hints downloaded project bodies and Firebase on first load.
  await expect(page.locator('link[rel="prefetch"][as="script"]')).toHaveCount(0)
})

test('the home page does not download auth or reference modules', async ({ page }) => {
  const requested: string[] = []
  page.on('request', (request) => requested.push(request.url()))

  await gotoHydrated(page, '/')
  await page.waitForTimeout(1500)

  // The reference libraries used to be module-level `import()` calls, so the
  // home page pulled the whole HTML/CSS/JS reference before anyone asked for it.
  // The plugin shim itself is part of the app; the SDK and corpus are not.
  const eager = requested.filter(
    (url) => url.includes('/content/reference/') || url.includes('/deps/firebase'),
  )
  expect(eager).toEqual([])
})

test('the hero console reveals output without moving anything', async ({ page }) => {
  await gotoHydrated(page, '/')

  // All four console rows exist from the SSR paint, with the pending two held
  // out of sight, so the live reveal changes text rather than layout.
  const consoleList = page.locator('[data-testid="hero-console"]')
  const rows = consoleList.locator('> li')
  await expect(rows).toHaveCount(4)

  const reserved = await consoleList.boundingBox()
  await expect(rows.last()).toBeVisible()
  const settled = await consoleList.boundingBox()
  expect(settled?.height).toBe(reserved?.height)
})

test('the sidebar links to the current lesson and reveals it', async ({ page }) => {
  await gotoHydrated(page, '/learn/javascript-fundamentals/js-l65')

  const active = page.getByTestId('course-sidebar-list').locator('[aria-current="page"]')
  await expect(active).toBeVisible()
  await active.click()

  // Clicking the current lesson stays on it rather than navigating away.
  await expect(page).toHaveURL(/\/learn\/javascript-fundamentals\/js-l65$/)
  await expect(page.locator('article h1')).toBeVisible()
})
