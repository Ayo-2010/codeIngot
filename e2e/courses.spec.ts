import { expect, test } from '@playwright/test'
import { gotoHydrated } from './helpers'

/**
 * The three original courses are one section per lesson, which put 66-81
 * headings in front of a learner. Their sections are tagged into chapters at
 * display time; these checks cover the two places that grouping is visible.
 */
test('the course page groups legacy lessons into chapters', async ({ page }) => {
  await gotoHydrated(page, '/courses/html-fundamentals')

  const chapters = page.locator('main section[aria-labelledby]')
  await expect(chapters).toHaveCount(10)
  await expect(chapters.first().getByRole('heading', { level: 2 })).toHaveText('Getting started')

  // 77 lessons, and no section heading per lesson any more.
  await expect(page.locator('main ol > li')).toHaveCount(77)

  // Every section still owns its quiz: 60 one-lesson sections carry it inline,
  // the 6 multi-lesson sections keep the full quiz card.
  await expect(page.locator('main a[aria-label^="Take the"]')).toHaveCount(60)
  await expect(page.getByText(/\d+ questions · pass at \d+%/)).toHaveCount(6)
})

test('the lesson sidebar lists chapters rather than every section', async ({ page }) => {
  await gotoHydrated(page, '/learn/html-fundamentals/html-l1')

  const list = page.getByTestId('course-sidebar-list')
  await expect(list.locator(':scope > li')).toHaveCount(10)
  await expect(list.locator(':scope > li').first()).toContainText('Getting started')

  // The current lesson is still marked, so the reveal-on-load logic keeps working.
  await expect(list.locator('[aria-current="page"]')).toHaveCount(1)
})
