import { describe, expect, it } from 'vitest'
import { transpileScript } from '~/utils/transpile'
import {
  entryPath,
  mountsDefaultExport,
  mountsForPreview,
  normaliseFiles,
  starterFiles,
} from '~/utils/exercise-files'
import { buildSrcdoc } from '~/utils/sandbox'
import type { CodingExercise } from '~/types/content'
import { runRegistry } from './helpers/module-harness'

const APP_SOURCE = `import { useState } from 'react'

export default function Counter() {
  const [n] = useState(0)
  return <button>{n}</button>
}
`

const MAIN_SOURCE = `import Counter from './App'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')).render(<Counter />)
`

describe('module transpilation', () => {
  it('turns imports and exports into calls the registry answers', async () => {
    const { code, error } = await transpileScript(APP_SOURCE, 'jsx', { modules: true })
    expect(error).toBeNull()
    expect(code).toContain("require('react')")
    expect(code).toContain('exports.default = Counter')
  })

  it('compiles JSX with the automatic runtime, so React need not be in scope', async () => {
    const { code } = await transpileScript(APP_SOURCE, 'jsx', { modules: true })
    expect(code).toContain('react/jsx-dev-runtime')
    expect(code).not.toContain('React.createElement')
  })

  it('leaves a classic script alone, so every existing exercise still runs', async () => {
    const { code } = await transpileScript(APP_SOURCE, 'jsx')
    expect(code).toContain('React.createElement')
    expect(code).not.toContain('require(')
  })
})

describe('the sandbox module registry', () => {
  it('runs a two-file app, resolving a relative import without its extension', async () => {
    const app = await transpileScript(APP_SOURCE, 'jsx', { modules: true })
    const main = await transpileScript(MAIN_SOURCE, 'jsx', { modules: true })

    const { mounted, errors } = runRegistry(
      [
        { path: 'App.jsx', code: app.code },
        { path: 'main.jsx', code: main.code },
      ],
      'main.jsx',
      false,
    )

    expect(errors).toEqual([])
    expect(mounted).toHaveLength(1)
    expect((mounted[0]!.type as { name?: string }).name).toBe('Counter')
  })

  it('mounts the entry default export when nothing else does', async () => {
    const app = await transpileScript(APP_SOURCE, 'jsx', { modules: true })
    const { mounted, errors } = runRegistry([{ path: 'App.jsx', code: app.code }], 'App.jsx', true)
    expect(errors).toEqual([])
    expect(mounted).toHaveLength(1)
  })

  it('mounts the entry with the props the exercise declared', async () => {
    const app = await transpileScript(APP_SOURCE, 'jsx', { modules: true })
    const { mounted, errors } = runRegistry([{ path: 'App.jsx', code: app.code }], 'App.jsx', true, {
      title: 'Inbox',
      count: 3,
    })
    expect(errors).toEqual([])
    expect(mounted).toHaveLength(1)
    expect(mounted[0]!.props).toEqual({ title: 'Inbox', count: 3 })
  })

  it('leaves a stylesheet import inert, because the CSS is applied separately', async () => {
    const app = await transpileScript(APP_SOURCE, 'jsx', { modules: true })
    const main = await transpileScript(MAIN_SOURCE, 'jsx', { modules: true })
    const { errors } = runRegistry(
      [
        { path: 'App.jsx', code: app.code },
        { path: 'main.jsx', code: main.code },
      ],
      'main.jsx',
      false,
    )
    expect(errors.join(' ')).not.toContain('index.css')
  })

  it('explains a file it cannot find, naming the import and where it came from', async () => {
    const missing = await transpileScript(`import Gone from './Gone'\nconsole.log(Gone)\n`, 'jsx', {
      modules: true,
    })
    const { errors } = runRegistry([{ path: 'main.jsx', code: missing.code }], 'main.jsx', false)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('Cannot find ./Gone')
    expect(errors[0]).toContain('main.jsx')
  })

  it('explains a package it cannot provide, rather than failing silently', async () => {
    const missing = await transpileScript(`import _ from 'lodash'\nconsole.log(_)\n`, 'jsx', {
      modules: true,
    })
    const { errors } = runRegistry([{ path: 'main.jsx', code: missing.code }], 'main.jsx', false)
    expect(errors).toHaveLength(1)
    expect(errors[0]).toContain('lodash')
    expect(errors[0]).toContain('react-dom/client')
  })
})

describe('a module exercise\u2019s tests reach the module\u2019s exports', () => {
  const SOURCE = `import { useState } from 'react'

export function stepCount(count, steps) {
  return steps.reduce((total, step) => total + step, count)
}

export default function Card({ title, count = 0 }) {
  const [shown] = useState(title)
  return (
    <div className="card">
      <h2>{shown}</h2>
      <span>{count}</span>
    </div>
  )
}
`

  async function harness() {
    const compiled = await transpileScript(SOURCE, 'jsx', { modules: true })
    expect(compiled.error).toBeNull()
    return runRegistry([{ path: 'App.jsx', code: compiled.code }], 'App.jsx', true)
  }

  it('binds a named export to its own name', async () => {
    const { errors, runTest } = await harness()
    expect(errors).toEqual([])
    expect(runTest('return stepCount(0, [1, 1, 1]) === 3')).toBe(true)
  })

  it('binds a default export under the name the function declares', async () => {
    const { runTest } = await harness()
    expect(runTest("return Card({ title: 'Inbox' }).props.className === 'card'")).toBe(true)
  })

  it('sees the same element shape the previous classic-script tests expected', async () => {
    const { runTest } = await harness()
    expect(runTest("return Card({ title: 'Inbox' }).props.children[0].type === 'h2'")).toBe(true)
    expect(runTest("return Card({ title: 'Inbox' }).props.children[1].props.children === 0")).toBe(true)
  })
})

describe('exercise files', () => {
  it('gives the language shorthand usable paths and keeps its short tab labels', () => {
    const files = normaliseFiles({ html: '<p>hi</p>', css: 'p{}', javascript: 'console.log(1)' })
    expect(files.map((file) => file.path)).toEqual(['index.html', 'styles.css', 'script.js'])
    expect(files.map((file) => file.label)).toEqual(['HTML', 'CSS', 'JS'])
  })

  it('prefers an explicit file list over the shorthand', () => {
    const exercise = {
      id: 'x',
      instructions: '',
      languages: ['tsx'],
      starterCode: { tsx: 'ignored' },
      files: [{ path: 'App.tsx', language: 'tsx', content: 'kept' }],
    } as unknown as CodingExercise
    expect(starterFiles(exercise).map((file) => file.content)).toEqual(['kept'])
  })

  it('runs a main file and mounts nothing itself', () => {
    const files = normaliseFiles({ html: '', tsx: '' })
    const withMain = [
      ...files,
      { path: 'main.jsx', language: 'jsx' as const, content: '' },
    ]
    expect(entryPath(withMain)).toBe('main.jsx')
    expect(mountsDefaultExport(withMain)).toBe(false)
  })

  it('runs the App file and mounts its default export', () => {
    const files = normaliseFiles({ tsx: 'export default function App() {}' })
    expect(entryPath(files)).toBe('App.tsx')
    expect(mountsDefaultExport(files)).toBe(true)
  })

  it('mounts for the preview only when the exercise declares props', () => {
    const component = normaliseFiles({ jsx: 'export default function Card() {}' })
    expect(mountsDefaultExport(component)).toBe(true)
    // A helper module exports no component and a higher-order component returns
    // another component, so React would throw on either — mounting is something
    // the exercise has to ask for.
    expect(mountsForPreview(component, undefined, undefined)).toBe(false)
    expect(mountsForPreview(component, undefined, {})).toBe(true)
  })

  it('never mounts a file that mounts itself', () => {
    const files = [
      ...normaliseFiles({ jsx: '' }),
      { path: 'main.jsx', language: 'jsx' as const, content: '' },
    ]
    expect(mountsForPreview(files, undefined, {})).toBe(false)
  })

  it('honours a declared entry', () => {
    const files = [
      { path: 'App.tsx', language: 'tsx' as const, content: '' },
      { path: 'index.tsx', language: 'tsx' as const, content: '' },
    ]
    expect(entryPath(files, 'App.tsx')).toBe('App.tsx')
  })
})

/** The raw text between a script element's tags, as the HTML parser would see it. */
function scriptText(document: string, id: string): string {
  const open = document.indexOf(`<script id="${id}"`)
  expect(open, `expected a #${id} script`).toBeGreaterThan(-1)
  const start = document.indexOf('>', open) + 1
  const end = document.indexOf('</script>', start)
  expect(end, `expected #${id} to be closed`).toBeGreaterThan(-1)
  return document.slice(start, end)
}

describe('the sandbox document for a module run', () => {
  const files = [
    { path: 'App.jsx', code: 'exports.default = function App() {}' },
    { path: 'main.jsx', code: "require('./App.jsx')" },
  ]

  const document = buildSrcdoc({
    html: '<div id="root"></div>',
    css: '',
    javascript: '',
    modules: files,
    entry: 'main.jsx',
    autoMount: false,
  })

  it('carries the registry and its bootstrap, in that order, then the entry', () => {
    const registry = document.indexOf('id="module-registry"')
    const bootstrap = document.indexOf('id="module-bootstrap"')
    const learner = document.indexOf('id="learner-js"')
    expect(registry).toBeGreaterThan(-1)
    expect(registry).toBeLessThan(bootstrap)
    expect(bootstrap).toBeLessThan(learner)
  })

  it('hands the files and the entry to the bootstrap as parseable JSON', () => {
    const payload = JSON.parse(scriptText(document, '__modules'))
    expect(payload).toEqual({ files, entry: 'main.jsx', autoMount: false })
  })

  it('carries the preview props, and omits them when the exercise declared none', () => {
    const withProps = buildSrcdoc({
      html: '',
      css: '',
      javascript: '',
      modules: files,
      entry: 'App.jsx',
      autoMount: true,
      previewProps: { title: 'Inbox' },
    })
    expect(JSON.parse(scriptText(withProps, '__modules')).props).toEqual({ title: 'Inbox' })
    expect(JSON.parse(scriptText(document, '__modules'))).not.toHaveProperty('props')
  })

  it('keeps a closing script tag inside learner code from ending the document early', () => {
    // A learner writing `</script>` inside a string is a real thing to do, and it
    // must not be able to close the element that carries their files.
    const code = 'const closing = "</script>"'
    const doc = buildSrcdoc({
      html: '',
      css: '',
      javascript: '',
      modules: [{ path: 'App.jsx', code }],
      entry: 'App.jsx',
      autoMount: true,
    })
    expect(JSON.parse(scriptText(doc, '__modules')).files[0].code).toBe(code)
  })

  it('leaves the registry out of a single-script run', () => {
    const plain = buildSrcdoc({ html: '<p>hi</p>', css: '', javascript: 'console.log(1)' })
    expect(plain).not.toContain('module-registry')
    expect(plain).toContain('console.log(1)')
  })
})
