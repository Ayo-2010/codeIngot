import { describe, expect, it } from 'vitest'
import { projects } from '~/content/projects'
import { entryPath, mountsDefaultExport, scriptFiles } from '~/utils/exercise-files'
import { transpileScript } from '~/utils/transpile'
import { runRegistry } from './helpers/module-harness'

/**
 * A project's file tree is verified in the browser, which leaves the parts
 * that can be checked here unchecked: every file compiles as a module, the
 * imports between them resolve, and the entry mounts itself, so the preview
 * shows the app rather than a blank page.
 *
 * Only projects written as real files are covered; the language-keyed
 * shorthand has no modules in it.
 */
const fileProjects = projects.filter((project) => project.files?.length)

describe('projects written as real files', () => {
  it('exist, so the checks below mean something', () => {
    expect(fileProjects.map((project) => project.slug)).toContain('react-dashboard')
  })

  for (const project of fileProjects) {
    const files = project.files ?? []
    const entry = entryPath(files)

    describe(project.slug, () => {
      it('compiles every bundled script as a module', async () => {
        for (const file of scriptFiles(files)) {
          const { error } = await transpileScript(file.content, file.language, { modules: true })
          expect(error, `${file.path}: ${error}`).toBeNull()
        }
      })

      it('does not bundle its test files into the page', () => {
        for (const file of scriptFiles(files)) {
          expect(file.path).not.toMatch(/\.(test|spec)\.[jt]sx?$/)
        }
      })

      it('leaves the mounting to its own entry file', () => {
        expect(entry).toBeTruthy()
        expect(mountsDefaultExport(files)).toBe(false)
      })

      it('resolves every import from that entry, and mounts once', async () => {
        const modules: { path: string; code: string }[] = []
        for (const file of scriptFiles(files)) {
          const compiled = await transpileScript(file.content, file.language, { modules: true })
          expect(compiled.error, `${file.path}: ${compiled.error}`).toBeNull()
          modules.push({ path: file.path, code: compiled.code ?? '' })
        }

        const { errors, mounted } = runRegistry(modules, entry!, false)
        expect(errors).toEqual([])
        expect(mounted).toHaveLength(1)
      })
    })
  }
})
