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

  // Every lesson row carries its own quiz at its side.
  const quizLinks = page.locator('main a[aria-label^="Take the quiz for"]')
  await expect(quizLinks).toHaveCount(77)
  const hrefs = await quizLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  )
  expect(new Set(hrefs).size).toBe(77)
  await expect(page.getByText(/\d+ questions · pass at \d+%/)).toHaveCount(0)
})

test('the lesson sidebar lists chapters rather than every section', async ({ page }) => {
  await gotoHydrated(page, '/learn/html-fundamentals/html-l1')

  const list = page.getByTestId('course-sidebar-list')
  await expect(list.locator(':scope > li')).toHaveCount(10)
  await expect(list.locator(':scope > li').first()).toContainText('Getting started')

  // The current lesson is still marked, so the reveal-on-load logic keeps working.
  await expect(list.locator('[aria-current="page"]')).toHaveCount(1)

  // Every lesson in the sidebar has its own quiz on the same row.
  const quizLinks = list.locator('a[aria-label^="Take the quiz for"]')
  await expect(quizLinks).toHaveCount(77)
  const hrefs = await quizLinks.evaluateAll((links) =>
    links.map((link) => link.getAttribute('href')),
  )
  expect(new Set(hrefs).size).toBe(77)
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

  // Four chapters: foundations, build skills, five capstone builds, and shipping.
  const chapters = page.locator('main section[aria-labelledby]')
  await expect(chapters).toHaveCount(5)
  await expect(chapters.nth(1).getByRole('heading', { level: 2 })).toHaveText('Foundations')
  await expect(chapters.nth(2).getByRole('heading', { level: 2 })).toHaveText('Build skills')
  await expect(chapters.nth(3).getByRole('heading', { level: 2 })).toHaveText('Capstone builds')
  await expect(chapters.nth(4).getByRole('heading', { level: 2 })).toHaveText('Ship it')

  // 18 lessons, grouped into 4 chapters, and every lesson shows its own quiz inline.
  await expect(page.locator('main ol > li')).toHaveCount(18)
  await expect(page.locator('main a[aria-label^="Take the quiz for"]')).toHaveCount(18)
  await expect(page.getByText(/\d+ questions · pass at \d+%/)).toHaveCount(0)
})

test('a lesson quiz loads its lesson title and a full question set', async ({ page }) => {
  await gotoHydrated(page, '/learn/dom-browser-apis/quiz/quiz-dom-l1')

  await expect(
    page.getByRole('heading', { level: 1, name: 'What the DOM is quiz' }),
  ).toBeVisible()
  await expect(page.getByText('0/5 answered · pass at 60%')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Back to lesson' })).toHaveAttribute(
    'href',
    '/learn/dom-browser-apis/dom-l1',
  )
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

test('a project workspace loads its brief and checklist after the lazy load', async ({ page }) => {
  await gotoHydrated(page, '/projects/personal-profile-page')

  await expect(
    page.getByRole('heading', { level: 1, name: 'Personal Profile Page' }),
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Brief' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Checklist' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Download folder' })).toBeVisible()
})
