import { test, expect, type Page } from '@playwright/test'

/**
 * Lessons chosen to cover every course shape, and both ends of a long list:
 * the first lesson (where the sidebar has nothing to scroll) and a deep one
 * (where it does).
 */
const LESSONS = [
  { path: '/learn/javascript-fundamentals/js-l1', name: 'js: first lesson' },
  { path: '/learn/javascript-fundamentals/js-l65', name: 'js: deep lesson' },
  { path: '/learn/react/react-l1', name: 'react: module demo' },
  { path: '/learn/typescript/ts-l17', name: 'typescript: plain demo' },
  { path: '/learn/git-github/git-l8', name: 'git: simulated terminal demo' },
  { path: '/learn/dom-browser-apis/dom-l1', name: 'dom: devtools tip' },
]

/**
 * Console noise the app does not own. Analytics is blocked in the sandbox and
 * the favicon is fetched separately; neither is a defect in the page. Errors
 * from `about:` frames are the sandboxed demo's own and are left to the demo
 * tests to judge.
 */
const IGNORED_ERRORS = [/favicon/i, /vercel/i, /net::ERR/i]

function collectErrors(page: Page): string[] {
  const errors: string[] = []
  const record = (text: string, url: string) => {
    if (!text) return
    if (url.startsWith('about:')) return
    if (IGNORED_ERRORS.some((re) => re.test(text) || re.test(url))) return
    errors.push(text)
  }
  page.on('console', (msg) => {
    if (msg.type() === 'error') record(msg.text(), msg.location().url ?? '')
  })
  page.on('pageerror', (error) => record(error.message, ''))
  return errors
}

for (const lesson of LESSONS) {
  test(`${lesson.name} opens without scrolling itself`, async ({ page }) => {
    const errors = collectErrors(page)

    await page.goto(lesson.path, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('article h1')).toBeVisible()
    // Wait for hydration, which is when the editor takes focus - the moment the
    // page used to scroll itself to the bottom. (`networkidle` never settles in
    // dev: HMR and blocked analytics keep going.)
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === 'true')
    await page.waitForTimeout(400)

    // The reading area starts at the top of the lesson.
    const lessonScroll = page.getByTestId('lesson-scroll')
    await expect(lessonScroll).toBeVisible()
    expect(await lessonScroll.evaluate((el) => el.scrollTop)).toBe(0)
    // ...and the document behind the pinned shell has not moved either.
    expect(await page.evaluate(() => window.scrollY)).toBe(0)

    // The active lesson is inside the sidebar's own viewport, not scrolled past.
    const list = page.getByTestId('course-sidebar-list')
    const active = list.locator('[aria-current="page"]')
    await expect(active).toHaveCount(1)
    const listBox = await list.boundingBox()
    const activeBox = await active.boundingBox()
    expect(listBox).not.toBeNull()
    expect(activeBox).not.toBeNull()
    expect(activeBox!.y).toBeGreaterThanOrEqual(listBox!.y - 2)
    expect(activeBox!.y + activeBox!.height).toBeLessThanOrEqual(listBox!.y + listBox!.height + 2)

    expect(errors).toEqual([])
  })
}

test('react lessons mount their demo in the sandbox', async ({ page }) => {
  await page.goto('/learn/react/react-l1')

  // The demo is a real module: the sandbox only fills `srcdoc` once the client
  // has compiled and mounted it, so its presence proves the demo ran.
  const frame = page.locator('article iframe').first()
  await expect(frame).toHaveAttribute('srcdoc', /./, { timeout: 15_000 })

  const box = await frame.boundingBox()
  expect(box).not.toBeNull()
  expect(box!.height).toBeGreaterThan(80)
})
