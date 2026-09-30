const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/** Escape plain text. All inline markdown is rendered from already-escaped text. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char] ?? char)
}

/**
 * Minimal, predictable inline markdown: `code`, **bold**, *italic*.
 * Content is authored in-house, and everything is escaped first, so the result is safe.
 */
export function renderInline(value: string): string {
  let html = escapeHtml(value)
  html = html.replace(/`([^`]+)`/g, (_match, code: string) => `<code>${code}</code>`)
  html = html.replace(/\*\*([^*]+)\*\*/g, (_match, strong: string) => `<strong>${strong}</strong>`)
  html = html.replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, (_match, lead: string, em: string) => `${lead}<em>${em}</em>`)
  return html
}

export function codeToHtml(value: string): string {
  return escapeHtml(value)
}