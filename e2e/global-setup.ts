import { chromium } from '@playwright/test'

/**
 * Warm the dev server before the specs run.
 *
 * Vite compiles each route on its first request, and discovering work mid-run can
 * trigger a full reload that drops focus and invalidates in-flight assertions.
 * Visiting every route the specs use here means the specs measure the app rather
 * than the compiler, and no reload lands in the middle of a test.
 */
const WARM_ROUTES = [
  '/',
  '/learn/javascript-fundamentals/js-l1',
  '/learn/javascript-fundamentals/js-l65',
  '/learn/react/react-l1',
  '/learn/typescript/ts-l17',
  '/learn/git-github/git-l8',
  '/learn/dom-browser-apis/dom-l1',
]

export default async function globalSetup() {
  const browser = await chromium.launch({ channel: 'chrome' })
  const page = await browser.newPage()
  for (const path of WARM_ROUTES) {
    await page.goto(`http://127.0.0.1:3000${path}`, {
      waitUntil: 'domcontentloaded',
      timeout: 120_000,
    })
    // Wait for hydration (the client has run) and then let the first demo
    // compile, which is the slowest work any of these routes does.
    await page.waitForFunction(() => document.documentElement.dataset.hydrated === 'true', null, {
      timeout: 120_000,
    })
    await page.waitForTimeout(1000)
  }
  await browser.close()
}
