/**
 * Compiles the editor's TypeScript, JSX and TSX into the JavaScript the
 * sandbox can run.
 *
 * The sandbox has no network and no loader of its own: it is an opaque-origin
 * iframe with inline scripts only. So the transform happens here, in the host,
 * with Sucrase — a fast, syntax-only compiler. Types are erased, and what the
 * learner sees running is their own code with the ceremony stripped.
 *
 * JSX becomes `React.createElement(...)` by default, which is what a classic
 * inline script can run. A multi-file exercise asks for `modules` instead and
 * gets the automatic runtime plus real `import`/`export`, which needs the
 * registry in `~/utils/module-registry` to answer the `require` calls.
 *
 * Sucrase does not type-check. That is intentional: this is a run-and-see
 * environment, and the type-level lessons are checked with quizzes and code
 * reading instead, exactly as the platform's other lessons check things the
 * runtime cannot observe. Sucrase is loaded lazily so courses that never
 * touch TypeScript never pay for it.
 */
import type { EditorLanguage } from '~/types/content'

/** Languages that carry executable script, in tab order. */
export const SCRIPT_LANGUAGES: readonly EditorLanguage[] = [
  'javascript',
  'typescript',
  'jsx',
  'tsx',
]

/** The order to look for a script in when several could be present. */
export const SCRIPT_PRIORITY: readonly EditorLanguage[] = ['tsx', 'jsx', 'typescript', 'javascript']

export function isScriptLanguage(language: EditorLanguage): boolean {
  return SCRIPT_LANGUAGES.includes(language)
}

/** True when the source needs compiling before the browser can run it. */
export function needsTranspile(language: EditorLanguage): boolean {
  return language === 'typescript' || language === 'jsx' || language === 'tsx'
}

export interface TranspileOptions {
  /**
   * Compile this file as a module in a real project.
   *
   * That means two things at once, which is why they share a switch. `import`
   * and `export` become `require` and `exports` calls for the sandbox's module
   * registry, and JSX compiles with the automatic runtime — so the file looks
   * like, and behaves like, the file a learner would write in a real toolchain,
   * with no `React` global in scope.
   *
   * It is opt-in because it only works inside that registry: a module compiled
   * this way cannot run as a classic script, so anything that is not part of a
   * multi-file exercise keeps the default.
   */
  modules?: boolean
}

export interface TranspileResult {
  code: string
  /** A human-readable compile error, or null when the source compiled. */
  error: string | null
}

let sucrase: Promise<typeof import('sucrase')> | null = null

function loadSucrase(): Promise<typeof import('sucrase')> {
  if (!sucrase) sucrase = import('sucrase')
  return sucrase
}

/**
 * Compile one script. Plain JavaScript passes straight through, so callers can
 * use this for every script language without branching.
 */
export async function transpileScript(
  source: string,
  language: EditorLanguage,
  options: TranspileOptions = {},
): Promise<TranspileResult> {
  const asModule = Boolean(options.modules) && isScriptLanguage(language)
  if (!needsTranspile(language) && !asModule) return { code: source, error: null }

  const transforms: Array<'typescript' | 'jsx' | 'imports'> = []
  if (language === 'typescript' || language === 'tsx') transforms.push('typescript')
  if (language === 'jsx' || language === 'tsx') transforms.push('jsx')
  if (asModule) transforms.push('imports')

  try {
    const { transform } = await loadSucrase()
    const { code } = transform(source, {
      transforms,
      // A module's JSX uses the automatic runtime and resolves
      // `react/jsx-dev-runtime` through the registry, exactly as a real
      // toolchain does — so `React` need never be in scope. Everything else
      // still emits `React.createElement` against the injected global.
      jsxRuntime: asModule ? 'automatic' : 'classic',
      // Keep modern syntax the browser already understands instead of
      // down-levelling it, so optional chaining and friends behave normally.
      disableESTransforms: true,
    })
    return { code, error: null }
  } catch (error) {
    return { code: '', error: error instanceof Error ? error.message : String(error) }
  }
}
