import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { createServer } from 'node:net'
import { join, resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

/**
 * Guards the initial JavaScript payload of representative routes.
 *
 * The budgets are gzipped bytes of the scripts a browser fetches before it has
 * parsed the page: the entry chunk and every `modulepreload`. Prefetch hints are
 * excluded because they do not block rendering. Lesson routes are budgeted
 * separately from the catalogue so a regression that puts a whole course back
 * on every lesson fails here rather than only in a performance audit.
 */
const root = resolve(import.meta.dirname, '..')
const serverFile = join(root, '.output', 'server', 'index.mjs')
const publicRoot = join(root, '.output', 'public')

if (!existsSync(serverFile)) {
  console.error('Missing .output/server/index.mjs. Run `npm run build` first.')
  process.exit(1)
}

const budgets = [
  { route: '/', maxGzipKB: 240, label: 'home' },
  { route: '/learn/css-fundamentals/css-l32', maxGzipKB: 260, label: 'lesson' },
  { route: '/learn/css-fundamentals/quiz/quiz-css-s15', maxGzipKB: 240, label: 'quiz' },
  { route: '/projects', maxGzipKB: 240, label: 'projects' },
]
const entryBudgetGzipKB = 60

function freePort() {
  return new Promise((resolvePort, reject) => {
    const probe = createServer()
    probe.once('error', reject)
    probe.listen(0, '127.0.0.1', () => {
      const address = probe.address()
      const port = typeof address === 'object' && address ? address.port : 0
      probe.close(() => resolvePort(port))
    })
  })
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // The server has not bound the port yet.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 300))
  }
  throw new Error(`Server did not answer at ${url}`)
}

function initialScripts(html) {
  const scripts = new Set()
  for (const match of html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)) {
    scripts.add(match[1])
  }
  for (const match of html.matchAll(
    /<link rel="modulepreload"[^>]+href="([^"]+\.js)"/g,
  )) {
    scripts.add(match[1])
  }
  return [...scripts]
}

const port = await freePort()
const server = spawn(process.execPath, [serverFile], {
  cwd: root,
  env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
  stdio: 'ignore',
})

const failures = []
try {
  const origin = `http://127.0.0.1:${port}`
  await waitForServer(origin)

  for (const budget of budgets) {
    const response = await fetch(origin + budget.route)
    if (!response.ok) throw new Error(`${budget.route} returned ${response.status}`)
    const html = await response.text()
    const scripts = initialScripts(html)
    let gzip = 0
    let entryGzip = 0
    for (const script of scripts) {
      const file = join(publicRoot, script)
      if (!existsSync(file)) continue
      const contents = readFileSync(file)
      const gz = gzipSync(contents).length
      gzip += gz
      if (script === scripts[0]) entryGzip = gz
    }
    const gzipKB = Math.ceil(gzip / 1024)
    const entryKB = Math.ceil(entryGzip / 1024)
    const status = gzipKB <= budget.maxGzipKB ? 'ok' : 'over'
    console.log(
      `${status.padEnd(4)} ${budget.label.padEnd(8)} ${budget.route} ${gzipKB} KB gzip (budget ${budget.maxGzipKB} KB), entry ${entryKB} KB`,
    )
    if (gzipKB > budget.maxGzipKB) {
      failures.push(`${budget.route} is ${gzipKB} KB gzip, over the ${budget.maxGzipKB} KB budget`)
    }
    const entryIndex = scripts[0]
    if (!entryIndex) continue
    const entryFile = join(publicRoot, entryIndex)
    if (existsSync(entryFile)) {
      const entry = Math.ceil(gzipSync(readFileSync(entryFile)).length / 1024)
      if (entry > entryBudgetGzipKB) {
        failures.push(
          `${budget.route} entry is ${entry} KB gzip, over the ${entryBudgetGzipKB} KB budget`,
        )
      }
    }
  }
} finally {
  server.kill()
}

if (failures.length) {
  console.error('\nBundle budget failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}
console.log('Bundle budgets passed.')
