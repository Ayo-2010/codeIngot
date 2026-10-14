/**
 * Project checklist verification.
 *
 * Each automated check kind looks at the file it actually
 * describes — selectors run against the rendered document,
 * css-rule at the stylesheet, js-call at the script, text at
 * the HTML — instead of grepping the concatenation of all
 * three, where a string in the wrong file could pass a check
 * that was meant for another one.
 */

export interface ProjectFiles {
  html?: string
  css?: string
  javascript?: string
}

/**
 * Normalises a stored selector into one querySelectorAll
 * accepts. Early content wrote tags as `<li`, which is HTML
 * notation rather than a selector; the leading `<` is all
 * that separates the two.
 */
export function normalizeSelector(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed.startsWith('<')) return trimmed.slice(1).trim()
  return trimmed
}

/** A selector check: the selector, and how many hits it needs. */
export interface SelectorCheck {
  selector: string
  count?: number
}

/** The test body that runs inside the sandbox, where the DOM lives. */
export function selectorTestBody(check: SelectorCheck): string {
  const selector = JSON.stringify(normalizeSelector(check.selector))
  const needed = Math.max(1, check.count ?? 1)
  return `return document.querySelectorAll(${selector}).length >= ${needed}`
}

/**
 * True when the needle appears as a whole word, so `gap` does not
 * match `gap-sm`. Boundaries are only required on the sides where
 * the needle itself has a word character, which is what lets
 * `:hover`, `@media` and `minmax(` match without a preceding
 * non-word character.
 */
function hasWord(source: string, needle: string): boolean {
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const startBoundary = /^[a-z0-9]/i.test(needle) ? '(^|[^a-z0-9_-])' : ''
  const endBoundary = /[a-z0-9]$/i.test(needle) ? '([^a-z0-9_-]|$)' : ''
  return new RegExp(`${startBoundary}${escaped}${endBoundary}`, 'i').test(source)
}

/** A css-rule check looks at the stylesheet and nothing else. */
export function matchesCssRule(css: string, needle: string): boolean {
  return hasWord(css, needle)
}

/** A js-call check looks at the script and nothing else. */
export function matchesJsCall(javascript: string, needle: string): boolean {
  if (/^[a-z][a-z0-9]*$/i.test(needle)) return hasWord(javascript, needle)
  return javascript.toLowerCase().includes(needle.toLowerCase())
}

/** A text check looks at the HTML and nothing else. */
export function matchesText(html: string, needle: string): boolean {
  return html.toLowerCase().includes(needle.toLowerCase())
}
