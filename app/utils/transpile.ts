/**
 * Compiles the editor's TypeScript, JSX and TSX into the JavaScript the
 * sandbox can run.
 *
 * The sandbox deliberately has no module loader and no network: it is an
 * opaque-origin iframe with inline scripts only. So the transform happens
 * here, in the host, with Sucrase — a fast, syntax-only compiler. Types are
 * erased, JSX becomes `React.createElement(...)`, and what the learner sees
 * running is their own code with the ceremony stripped.
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
): Promise<TranspileResult> {
  if (!needsTranspile(language)) return { code: source, error: null }

  const transforms: Array<'typescript' | 'jsx'> = []
  if (language === 'typescript' || language === 'tsx') transforms.push('typescript')
  if (language === 'jsx' || language === 'tsx') transforms.push('jsx')

  try {
    const { transform } = await loadSucrase()
    const { code } = transform(source, {
      transforms,
      // Classic runtime emits `React.createElement`, which resolves against the
      // React global the sandbox injects. The automatic runtime would import
      // `react/jsx-runtime`, which an inline script cannot resolve.
      jsxRuntime: 'classic',
      // Keep modern syntax the browser already understands instead of
      // down-levelling it, so optional chaining and friends behave normally.
      disableESTransforms: true,
    })
    return { code, error: null }
  } catch (error) {
    return { code: '', error: error instanceof Error ? error.message : String(error) }
  }
}
