import { createContext, runInContext } from 'node:vm'
import { describe, expect, it } from 'vitest'
import { SCRIPT_PRIORITY, transpileScript } from '~/utils/transpile'
import type { CodingExercise, Course, EditorLanguage } from '~/types/content'

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

describe('exercise solutions satisfy their own tests', () => {
  const candidates = withTests.filter(({ exercise }) => {
    const script = scriptOf(exercise.solution ?? {})
    if (!script) return false
    return !referencesBrowserApi(script.source, ...exercise.tests.map((test) => test.body))
  })

  it('covers a meaningful number of exercises', () => {
    expect(candidates.length).toBeGreaterThan(0)
  })

  for (const { where, exercise } of candidates) {
    it(where, async () => {
      const script = scriptOf(exercise.solution ?? {})!
      const compiled = await transpileScript(script.source, script.language)
      expect(compiled.error).toBeNull()

      const outcomes = runInFreshContext(
        compiled.code,
        exercise.tests.map((test) => test.body),
      )

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
    const script = scriptOf(exercise.starterCode)
    if (!script) return false
    return !referencesBrowserApi(script.source, ...exercise.tests.map((test) => test.body))
  })

  for (const { where, exercise } of candidates) {
    it(where, async () => {
      const script = scriptOf(exercise.starterCode)!
      const compiled = await transpileScript(script.source, script.language)
      expect(compiled.error).toBeNull()

      let passed = 0
      try {
        const outcomes = runInFreshContext(
          compiled.code,
          exercise.tests.map((test) => test.body),
        )
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
      const script = scriptOf(exercise.solution ?? exercise.starterCode)
      if (!script) return
      const compiled = await transpileScript(script.source, script.language)
      expect(compiled.error).toBeNull()
    })
  }
})
