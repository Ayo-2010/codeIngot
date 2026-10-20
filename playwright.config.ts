import { defineConfig } from '@playwright/test'

/**
 * Browser smoke tests.
 *
 * These run the real app in a real browser, which is the only place layout and
 * hydration problems surface: the unit tests and the server-rendered HTML
 * cannot see a page that scrolls itself, a demo that never mounts, or a
 * console error thrown during hydration.
 *
 * The browser is the system Chrome (`channel: 'chrome'`) rather than a
 * Playwright-downloaded Chromium, so nothing extra has to be installed.
 */
export default defineConfig({
  // Dev-mode compilation can be slow on a cold route; give each test room.
  timeout: 90_000,
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: true,
  // Two browsers at a time keeps the dev server and this machine comfortable
  // while still overlapping the slow page loads.
  workers: 2,
  // A stray `test.only` must not quietly narrow CI.
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    channel: 'chrome',
    viewport: { width: 1440, height: 900 },
    trace: 'on-first-retry',
  },
  // A dev server under load can take several seconds to answer a click.
  expect: { timeout: 10_000 },
  webServer: {
    command: 'npm run dev -- --port 3000 --host 127.0.0.1',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 300_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
})
