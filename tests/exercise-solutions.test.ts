import { createContext, runInContext } from 'node:vm'
import { describe, expect, it } from 'vitest'
import { SCRIPT_PRIORITY, transpileScript } from '~/utils/transpile'
import type { CodingExercise, Course, EditorLanguage, ExerciseFile } from '~/types/content'
import { entryPath, mountsForPreview, scriptFiles } from '~/utils/exercise-files'
import { runRegistry } from './helpers/module-harness'

import { cssFundamentals } from '~/content/courses/css-fundamentals'
import { domBrowserApisCourse } from '~/content/courses/dom-browser-apis-course'
import { frontendProjectsCourse } from '~/content/courses/frontend-projects-course'
import { gitGitHubCourse } from '~/content/courses/git-github-course'
import { htmlFundamentals } from '~/content/courses/html-fundamentals'
import { javascriptFundamentals } from '~/content/courses/javascript-fundamentals'
import { reactCourse } from '~/content/courses/react'
import { responsiveWebDesignCourse } from '~/content/courses/responsive-web-design-course'
import { typescriptFundamentals } from '~/content/courses/typescript-fundamentals'

const courses: Course[] = [
  htmlFundamentals,
  cssFundamentals,
  javascriptFundamentals,
  domBrowserApisCourse,
  responsiveWebDesignCourse,
  gitGitHubCourse,
  typescriptFundamentals,
  reactCourse,
  frontendProjectsCourse,
]

interface LocatedExercise {
  where: string
  exercise: CodingExercise
}

const exercises: LocatedExercise[] = []
for (const course of courses) {
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      for (const block of lesson.content) {
        if (block.type === 'exercise') {
          exercises.push({
            where: `${course.slug} › ${lesson.id} › ${block.exercise.id}`,
            exercise: block.exercise,
          })
        }
      }
    }
  }
}

/** The single script a learner writes, chosen the same way the editor chooses it. */
function scriptOf(
  sources: Partial<Record<EditorLanguage, string>>,
): { language: EditorLanguage; source: string } | null {
  for (const language of SCRIPT_PRIORITY) {
    const source = sources[language]
    if (typeof source === 'string') return { language, source }
  }
  return null
}

/**
 * Exercises the headless VM cannot fairly judge: anything touching the DOM,
 * the network, timers, or the clock, plus anything asynchronous (a classic
 * script body has no way to await, so its assertions would run too early).
 * The remaining exercises are the deterministic, synchronous ones — which is
 * exactly the behaviour these tests are meant to pin down.
 */
const UNSUPPORTED =
  /\b(document|window|fetch|XMLHttpRequest|DOMParser|localStorage|sessionStorage|navigator|location|alert|setTimeout|setInterval|requestAnimationFrame|getComputedStyle|HTMLElement|Date)\b|\basync\b|\bawait\b/

function referencesBrowserApi(...sources: string[]): boolean {
  return sources.some((source) => UNSUPPORTED.test(source))
}

/**
 * A minimal React stand-in so JSX/TSX exercises can be checked without a
 * renderer. `createElement` returns the same element descriptor real React
 * returns — a `{ type, props }` object — which is all the tests inspect.
 */
function reactStub() {
  function createElement(type: unknown, props: Record<string, unknown> | null, ...children: unknown[]) {
    const merged: Record<string, unknown> = { ...(props || {}) }
    // React lifts `key` out of props and onto the element itself.
    const key = 'key' in merged ? merged.key : null
    delete merged.key
    if (children.length === 1) merged.children = children[0]
    else if (children.length > 1) merged.children = children
    return { type, key, props: merged }
  }
  return { Fragment: Symbol('react.fragment'), createElement }
}

/**
 * Runs a script and its test bodies in one fresh VM context. Top-level
 * `const`/`let` in a classic script land in the context's global lexical scope,
 * which later scripts in the same context can see — the same sharing the
 * sandbox iframe gives learner code and its tests.
 */
function runInFreshContext(code: string, bodies: string[]): unknown[] {
  const context = createContext({
    console,
    React: reactStub(),
    ReactDOM: { createRoot: () => ({ render() {}, unmount() {} }) },
    render: () => {},
  })
  runInContext(code, context)
  return bodies.map((body) => runInContext(`(function () { ${body} })()`, context))
}

const withTests = exercises.filter((entry) => entry.exercise.tests.length > 0)

/** Compiling the same file for several checks is wasted work; Sucrase output is pure. */
const compileCache = new Map<string, Promise<{ code: string; error: string | null }>>()

function compile(source: string, language: EditorLanguage, modules = false) {
  const key = `${language}|${modules ? 'modules' : 'script'}|${source}`
  const cached = compileCache.get(key)
  if (cached) return cached
  const started = transpileScript(source, language, modules ? { modules: true } : {})
  compileCache.set(key, started)
  return started
}

/**
 * One runnable form of an exercise.
 *
 * Most lessons are a single classic script, whose top-level bindings share the
 * global lexical scope with the tests. A multi-file exercise is a module graph
 * instead, and its tests see the entry module's exports by name — different
 * plumbing, same assertions.
 */
type Runnable =
  | { kind: 'script'; language: EditorLanguage; source: string }
  | {
      kind: 'modules'
      files: ExerciseFile[]
      entry: string | undefined
      /** The props the sandbox mounts the default export with, when declared. */
      previewProps?: Record<string, unknown>
    }

function runnableOf(exercise: CodingExercise, variant: 'starter' | 'solution'): Runnable | null {
  if (variant === 'starter') {
    if (exercise.files?.length) {
      return {
        kind: 'modules',
        files: exercise.files,
        entry: exercise.entry,
        previewProps: exercise.previewProps,
      }
    }
    const script = scriptOf(exercise.starterCode ?? {})
    return script ? { kind: 'script', ...script } : null
  }

  const files = exercise.solutionFiles ?? exercise.files
  if (files?.length) {
    return {
      kind: 'modules',
      files,
      entry: exercise.entry,
      previewProps: exercise.previewProps,
    }
  }
  const script = scriptOf(exercise.solution ?? {})
  return script ? { kind: 'script', ...script } : null
}

/** Every source a variant is written in, for the browser-API screen. */
function sourcesOf(runnable: Runnable): string[] {
  return runnable.kind === 'script'
    ? [runnable.source]
    : runnable.files.map((file) => file.content)
}

/** Runs the test bodies against a variant and returns one outcome each. */
async function outcomesFor(runnable: Runnable, bodies: string[]): Promise<unknown[]> {
  if (runnable.kind === 'script') {
    const compiled = await compile(runnable.source, runnable.language)
    if (compiled.error) throw new Error(compiled.error)
    return runInFreshContext(compiled.code, bodies)
  }

  const compiled: { path: string; code: string }[] = []
  for (const file of scriptFiles(runnable.files)) {
    const result = await compile(file.content, file.language, true)
    if (result.error) throw new Error(`${file.path}: ${result.error}`)
    compiled.push({ path: file.path, code: result.code })
  }

  const entry = entryPath(runnable.files, runnable.entry)
  if (!entry) return bodies.map(() => false)

  const autoMount = mountsForPreview(runnable.files, runnable.entry, runnable.previewProps)
  const { errors, runTest } = runRegistry(compiled, entry, autoMount, runnable.previewProps)

  const unresolved = errors.filter((message) => message.startsWith('Cannot '))
  if (unresolved.length > 0) throw new Error(unresolved.join(' '))

  return bodies.map((body) => {
    try {
      return runTest(body)
    } catch (error) {
      // A test body that throws is a test that failed, not a crashed suite.
      return error instanceof Error ? error.message : String(error)
    }
  })
}

describe('exercise solutions satisfy their own tests', () => {
  const candidates = withTests.filter(({ exercise }) => {
    const runnable = runnableOf(exercise, 'solution')
    if (!runnable) return false
    return !referencesBrowserApi(...sourcesOf(runnable), ...exercise.tests.map((test) => test.body))
  })

  it('covers a meaningful number of exercises', () => {
    expect(candidates.length).toBeGreaterThan(0)
  })

  for (const { where, exercise } of candidates) {
    it(where, async () => {
      const runnable = runnableOf(exercise, 'solution')!
      const outcomes = await outcomesFor(runnable, exercise.tests.map((test) => test.body))

      const failures = exercise.tests
        .map((test, index) => ({ test, outcome: outcomes[index] }))
        .filter(({ outcome }) => outcome !== true)
        .map(({ test, outcome }) => `${test.label} → ${JSON.stringify(outcome)}`)

      expect(failures).toEqual([])
    })
  }
})

describe('exercise starters are not already solutions', () => {
  const candidates = withTests.filter(({ exercise }) => {
    // An exercise with no separate solution has nothing to compare against.
    if (!exercise.solution && !exercise.solutionFiles?.length) return false
    const runnable = runnableOf(exercise, 'starter')
    if (!runnable) return false
    return !referencesBrowserApi(...sourcesOf(runnable), ...exercise.tests.map((test) => test.body))
  })

  for (const { where, exercise } of candidates) {
    it(where, async () => {
      const runnable = runnableOf(exercise, 'starter')!

      let passed = 0
      try {
        const outcomes = await outcomesFor(runnable, exercise.tests.map((test) => test.body))
        passed = outcomes.filter((outcome) => outcome === true).length
      } catch {
        // A starter that throws is failing, which is exactly what we want.
        passed = 0
      }

      expect(passed).toBeLessThan(exercise.tests.length)
    })
  }
})

describe('every exercise solution compiles', () => {
  for (const { where, exercise } of exercises) {
    it(where, async () => {
      const runnable = runnableOf(exercise, 'solution')
      if (!runnable) return
      if (runnable.kind === 'script') {
        const compiled = await compile(runnable.source, runnable.language)
        expect(compiled.error).toBeNull()
        return
      }
      for (const file of scriptFiles(runnable.files)) {
        const compiled = await compile(file.content, file.language, true)
        expect(compiled.error, `${file.path} should compile`).toBeNull()
      }
    })
  }
})

/**
 * A module exercise's whole point is the graph between its files, so a path that
 * points at nothing is checked on its own — including for exercises whose tests
 * need a browser and are therefore skipped above.
 */
describe('no module exercise has a broken import', () => {
  const moduleCases = exercises.filter(
    ({ exercise }) => Boolean(exercise.files?.length || exercise.solutionFiles?.length),
  )

  it('has exercises written as real files', () => {
    expect(moduleCases.length).toBeGreaterThan(0)
  })

  for (const { where, exercise } of moduleCases) {
    it(where, async () => {
      for (const files of [exercise.files, exercise.solutionFiles]) {
        if (!files?.length) continue
        const compiled: { path: string; code: string }[] = []
        for (const file of scriptFiles(files)) {
          const result = await compile(file.content, file.language, true)
          expect(result.error, `${file.path} should compile`).toBeNull()
          compiled.push({ path: file.path, code: result.code })
        }

        const entry = entryPath(files, exercise.entry)
        if (!entry) continue

        const autoMount = mountsForPreview(files, exercise.entry, exercise.previewProps)
        const { errors } = runRegistry(compiled, entry, autoMount, exercise.previewProps)
        expect(errors.filter((message) => message.startsWith('Cannot '))).toEqual([])
      }
    })
  }
})
