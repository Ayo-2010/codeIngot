import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import { gotoHydrated } from './helpers'

// Each page is heavy enough that axe plus a cold dev-server compile can spill
// past the default timeout. Run them one at a time rather than racing the Vite
// optimiser with a second browser.
test.describe.configure({ mode: 'serial' })
test.setTimeout(150_000)

/**
 * Structural accessibility checks on the routes that carry the most UI: the
 * catalogue, the chaptered course outline, a lesson with its sidebar, a quiz,
 * the progress dashboard and the reference index — plus a dark-mode pass.
 *
 * Colour contrast is included deliberately. If a palette change makes text
 * unreadable, that is a bug worth failing the build over, not a rule to mute.
 */
const routes = [
  ['home', '/'],
  ['catalogue', '/courses'],
  ['chaptered course', '/courses/html-fundamentals'],
  ['capstone course', '/courses/frontend-projects'],
  ['lesson', '/learn/html-fundamentals/html-l1'],
  ['capstone lesson', '/learn/frontend-projects/fp-l7'],
  ['quiz', '/learn/html-fundamentals/quiz/quiz-html-s1'],
  ['progress', '/progress'],
  ['reference', '/reference/html'],
] as const

async function blockingViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  return results.violations
    .filter((violation) => violation.impact === 'serious' || violation.impact === 'critical')
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      nodes: violation.nodes.map((node) => node.target.join(' ')),
    }))
}

for (const [name, path] of routes) {
  test(`has no serious accessibility violations: ${name}`, async ({ page }) => {
    await gotoHydrated(page, path)

    const blocking = await blockingViolations(page)
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
  })
}

test('has no serious accessibility violations in dark mode', async ({ page }) => {
  await gotoHydrated(page, '/')
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await page.waitForFunction(() => !document.documentElement.classList.contains('light'))

  // The dark palette has its own syntax-token colours; the home page shows them.
  const blocking = await blockingViolations(page)
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([])
})

test('the mobile course drawer traps focus and closes on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await gotoHydrated(page, '/learn/html-fundamentals/html-l1')

  const trigger = page.locator('button[aria-controls="course-drawer"]')
  await trigger.click()

  const drawer = page.getByRole('dialog', { name: 'Course navigation' })
  await expect(drawer).toBeVisible()
  await expect(drawer.getByRole('link').first()).toBeFocused()

  // Shift+Tab from the first control wraps to the last, staying in the drawer.
  await page.keyboard.press('Shift+Tab')
  await expect(drawer.getByRole('link').last()).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(drawer).toBeHidden()
  await expect(trigger).toBeFocused()
})
