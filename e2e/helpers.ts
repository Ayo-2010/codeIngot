import type { Page } from '@playwright/test'

/**
 * Server-rendered controls do nothing until hydration attaches their handlers.
 * The header hydrates inside the layout's suspense boundary, after `app:mounted`,
 * so wait for its own marker rather than the app-wide one.
 *
 * A dev server can drop the client entry module while Vite is re-optimising
 * dependencies, which leaves a page that never hydrates. That is a property of
 * the compiler under parallel load, not of the app, so a single reload is
 * cheaper and more honest than a long timeout.
 */
export async function gotoHydrated(page: Page, path: string) {
  for (let attempt = 0; ; attempt += 1) {
    await page.goto(path, { waitUntil: 'domcontentloaded' })
    try {
      await page.waitForFunction(
        () =>
          document.documentElement.dataset.hydrated === 'true' &&
          document.documentElement.dataset.headerReady === 'true',
        null,
        { timeout: 45_000 },
      )
      return
    } catch (error) {
      if (attempt >= 1) throw error
    }
  }
}
