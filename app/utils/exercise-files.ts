/**
 * Turns an exercise's files into the one shape the editor and the sandbox both
 * work with.
 *
 * An exercise can describe itself two ways, and the difference is real rather
 * than cosmetic:
 *
 *  - `starterCode` keys files by language. One file per language is exactly what
 *    an HTML/CSS/JS lesson is, and it is still the right way to write one.
 *  - `files` lists files by path, so an exercise can hold `App.jsx` *and*
 *    `main.jsx` and have them import each other the way a real project does.
 *
 * Both are normalised here so nothing downstream has to ask which was used. The
 * shorthand keeps its short language labels on the tabs — the HTML/CSS/JS
 * courses have looked like that for hundreds of lessons and there is no reason
 * to churn them — while a real file list shows its paths.
 */
import type { CodingExercise, EditorLanguage, ExerciseFile } from '~/types/content'
import { SCRIPT_LANGUAGES } from '~/utils/transpile'

export const LANGUAGE_LABEL: Record<EditorLanguage, string> = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'JS',
  typescript: 'TS',
  jsx: 'JSX',
  tsx: 'TSX',
}

/** Tab order for the shorthand, which is also the order files are written in. */
export const LANGUAGE_ORDER: readonly EditorLanguage[] = [
  'html',
  'css',
  'javascript',
  'typescript',
  'jsx',
  'tsx',
]

/** Where a single-file exercise's file lives when the sandbox imports it. */
export const DEFAULT_FILE_PATH: Record<EditorLanguage, string> = {
  html: 'index.html',
  css: 'styles.css',
  javascript: 'script.js',
  typescript: 'index.ts',
  jsx: 'App.jsx',
  tsx: 'App.tsx',
}

/**
 * A file that mounts the app itself, the way `main.jsx` does in a real project.
 * When one of these exists the sandbox runs it and mounts nothing on its own —
 * otherwise it would mount the app a second time into the same node.
 */
const MOUNTING_ENTRIES = ['main.jsx', 'main.tsx', 'main.js', 'main.ts', 'index.jsx', 'index.tsx']

/** The component file to run when the exercise has no `main.*` of its own. */
const COMPONENT_ENTRY = /^App\.(jsx|tsx|js|ts)$/

/** A test file, which belongs to the test runner rather than to the page. */
const TEST_FILE = /\.(test|spec)\.[jt]sx?$/

/** A path without its folders, since a real project keeps sources in `src/`. */
function basename(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1)
}

/** Expand a language-keyed shorthand into files with usable paths. */
export function normaliseFiles(source: Partial<Record<EditorLanguage, string>>): ExerciseFile[] {
  const files: ExerciseFile[] = []
  for (const language of LANGUAGE_ORDER) {
    const content = source[language]
    if (typeof content !== 'string') continue
    files.push({
      path: DEFAULT_FILE_PATH[language],
      language,
      content,
      label: LANGUAGE_LABEL[language],
    })
  }
  return files
}

/** True when the exercise is written as real files rather than the shorthand. */
export function isMultiFileExercise(exercise: CodingExercise): boolean {
  return Boolean(exercise.files && exercise.files.length > 0)
}

export function starterFiles(exercise: CodingExercise): ExerciseFile[] {
  return exercise.files ?? normaliseFiles(exercise.starterCode ?? {})
}

/**
 * The solution, falling back to the files on screen. An exercise that never
 * shipped a separate solution is best judged by what the learner starts with.
 */
export function solutionFiles(exercise: CodingExercise): ExerciseFile[] {
  if (exercise.solutionFiles) return exercise.solutionFiles
  if (exercise.files) return exercise.files
  return normaliseFiles(exercise.solution ?? exercise.starterCode ?? {})
}

/**
 * The files a browser bundle would run: the scripts, minus tests.
 *
 * A test file belongs to the test runner rather than to the page, and its
 * imports (`vitest`, Testing Library) are not something the sandbox can answer.
 * Leaving it out of the compile step is what a real toolchain does too.
 */
export function scriptFiles(files: ExerciseFile[]): ExerciseFile[] {
  return files.filter(
    (file) => SCRIPT_LANGUAGES.includes(file.language) && !TEST_FILE.test(file.path),
  )
}

/** Every HTML source, joined. Multi-page exercises are not a thing here. */
export function pageHtml(files: ExerciseFile[]): string {
  return files
    .filter((file) => file.language === 'html')
    .map((file) => file.content)
    .join('\n')
}

/** Every stylesheet, joined, since a page can carry more than one. */
export function pageCss(files: ExerciseFile[]): string {
  return files
    .filter((file) => file.language === 'css')
    .map((file) => file.content)
    .join('\n')
}

/**
 * The file the sandbox executes first, in the order a real toolchain would pick
 * it: the declared entry, else `main.*`, else the App component, else the last
 * script — the same "single script" choice the editor has always made.
 */
export function entryPath(files: ExerciseFile[], declared?: string): string | null {
  const scripts = scriptFiles(files)
  if (scripts.length === 0) return null
  if (declared) {
    const named = scripts.find((file) => file.path === declared)
    if (named) return named.path
  }
  const mounting = scripts.find((file) => MOUNTING_ENTRIES.includes(basename(file.path)))
  if (mounting) return mounting.path
  const component = scripts.find((file) => COMPONENT_ENTRY.test(basename(file.path)))
  return (component ?? scripts[scripts.length - 1]!).path
}

/**
 * True when the sandbox has to mount the entry's default export itself.
 *
 * A `main.jsx` calls `createRoot(...).render(<App />)` the way a real entry file
 * does, so mounting anything on top of it would render twice into one node.
 */
export function mountsDefaultExport(files: ExerciseFile[], declared?: string): boolean {
  const entry = entryPath(files, declared)
  if (!entry) return false
  return !MOUNTING_ENTRIES.includes(basename(entry))
}

/**
 * Whether the sandbox should mount the entry's default export for the preview.
 *
 * Only when the exercise declared `previewProps`. That declaration is the
 * exercise saying its default export is a component worth looking at, and it is
 * what keeps the sandbox from mounting things React cannot render: a helper
 * module has no default export, and a higher-order component's default export
 * returns a function rather than an element.
 */
export function mountsForPreview(
  files: ExerciseFile[],
  declared: string | undefined,
  previewProps: Record<string, unknown> | undefined,
): boolean {
  if (previewProps === undefined) return false
  return mountsDefaultExport(files, declared)
}
