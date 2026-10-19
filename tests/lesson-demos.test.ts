import { describe, expect, it } from 'vitest'
import type { Course, DemoBlock } from '~/types/content'
import { entryPath, mountsForPreview, scriptFiles } from '~/utils/exercise-files'
import { transpileScript } from '~/utils/transpile'
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

/**
 * A demo is the first thing a learner sees in a lesson, and it has two forms:
 * a plain html/css/javascript widget, or a set of real files run through the
 * module sandbox. The plain form is a string and cannot really be wrong; the
 * file form is compiled and mounted, so it is checked the way an exercise is.
 */
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

interface LocatedDemo {
  where: string
  demo: DemoBlock
}

const demos: LocatedDemo[] = []
for (const course of courses) {
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      for (const block of lesson.content) {
        if (block.type === 'demo') {
          demos.push({ where: `${course.slug} › ${lesson.id} › ${block.id}`, demo: block })
        }
      }
    }
  }
}

const fileDemos = demos.filter((entry) => entry.demo.files?.length)

describe('lesson demos', () => {
  it('exist across the courses', () => {
    expect(demos.length).toBeGreaterThan(100)
  })

  it('each carry a title and something to render', () => {
    for (const { where, demo } of demos) {
      expect(demo.title, where).toBeTruthy()
      const hasFiles = Boolean(demo.files?.length)
      const hasHtml = typeof demo.html === 'string' && demo.html.length > 0
      const hasScript = typeof demo.javascript === 'string' && demo.javascript.length > 0
      expect(hasFiles || hasHtml || hasScript, where).toBe(true)
    }
  })

  it('includes file-based demos, so the checks below mean something', () => {
    expect(fileDemos.length).toBeGreaterThan(0)
  })

  // The React, TypeScript and Git courses used to open with text and nothing to
  // look at. Every one of their lessons now opens with a live demo.
  const demoFirst = [reactCourse, typescriptFundamentals, gitGitHubCourse]
  for (const course of demoFirst) {
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        it(`${course.slug} › ${lesson.id} opens with a demo`, () => {
          expect(lesson.content[0]?.type, lesson.id).toBe('demo')
        })
      }
    }
  }

  for (const { where, demo } of fileDemos) {
    describe(`file demo ${where}`, () => {
      it('compiles every file as a module', async () => {
        for (const file of scriptFiles(demo.files ?? [])) {
          const { error } = await transpileScript(file.content, file.language, { modules: true })
          expect(error, `${file.path}: ${error}`).toBeNull()
        }
      })

      it('resolves its imports, mounts once, and reports no error', async () => {
        const modules: { path: string; code: string }[] = []
        for (const file of scriptFiles(demo.files ?? [])) {
          const compiled = await transpileScript(file.content, file.language, { modules: true })
          modules.push({ path: file.path, code: compiled.code ?? '' })
        }
        const entry = entryPath(demo.files ?? [], demo.entry)
        expect(entry, where).toBeTruthy()
        const autoMount = mountsForPreview(demo.files ?? [], demo.entry, demo.previewProps)
        const { errors, mounted } = runRegistry(modules, entry!, autoMount, demo.previewProps)
        expect(errors, where).toEqual([])
        if (autoMount) expect(mounted, where).toHaveLength(1)
      })
    })
  }
})
