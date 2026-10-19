import { test, expect, type Page } from '@playwright/test'

/** Server-rendered controls do nothing until hydration attaches their handlers. */
async function gotoHydrated(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => document.documentElement.dataset.hydrated === 'true')
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

test('the sidebar links to the current lesson and reveals it', async ({ page }) => {
  await gotoHydrated(page, '/learn/javascript-fundamentals/js-l65')

  const active = page.getByTestId('course-sidebar-list').locator('[aria-current="page"]')
  await expect(active).toBeVisible()
  await active.click()

  // Clicking the current lesson stays on it rather than navigating away.
  await expect(page).toHaveURL(/\/learn\/javascript-fundamentals\/js-l65$/)
  await expect(page.locator('article h1')).toBeVisible()
})
