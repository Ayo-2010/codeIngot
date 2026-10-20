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

/**
 * Frontend Projects is the capstone course: five project workspaces, each with
 * a planning lesson and a build-and-submit lesson, plus a final shipping
 * section. The projects are also attached to the course, so they appear both in
 * the summary block and in the "At a glance" counts.
 */
test('the projects course presents its five capstone builds', async ({ page }) => {
  await gotoHydrated(page, '/courses/frontend-projects')

  const capstones = page.getByRole('region', { name: 'Five projects, brief to shipped' })
  await expect(capstones).toBeVisible()
  await expect(capstones.locator('ul > li')).toHaveCount(5)
  await expect(capstones.getByRole('link', { name: /Personal Profile Page/ })).toHaveAttribute(
    'href',
    '/projects/personal-profile-page',
  )
  await expect(capstones.getByRole('link', { name: /Quiz Application/ })).toHaveAttribute(
    'href',
    '/projects/quiz-application',
  )

  // Three chapters: foundations and skills, five capstone builds, and shipping.
  const chapters = page.locator('main section[aria-labelledby]')
  await expect(chapters).toHaveCount(4)
  await expect(chapters.nth(1).getByRole('heading', { level: 2 })).toHaveText('Foundations and skills')
  await expect(chapters.nth(2).getByRole('heading', { level: 2 })).toHaveText('Capstone builds')
  await expect(chapters.nth(3).getByRole('heading', { level: 2 })).toHaveText('Ship it')

  // 18 lessons, grouped into 3 chapters, and every section still owns its quiz.
  await expect(page.locator('main ol > li')).toHaveCount(18)
  await expect(page.getByText(/\d+ questions · pass at \d+%/)).toHaveCount(9)
})

test('a capstone lesson hands off to the project workspace', async ({ page }) => {
  await gotoHydrated(page, '/learn/frontend-projects/fp-l7')

  const callout = page.getByRole('complementary', { name: 'Start the profile page' })
  await expect(callout).toBeVisible()
  await expect(callout.getByRole('link', { name: 'Open the project workspace' })).toHaveAttribute(
    'href',
    '/projects/personal-profile-page',
  )
})
