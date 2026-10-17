import type { EditorLanguage } from '~/types/content'

export type TokenKind =
  | 'plain'
  | 'tag'
  | 'attr'
  | 'string'
  | 'comment'
  | 'keyword'
  | 'number'
  | 'function'
  | 'property'
  | 'operator'
  | 'punctuation'
  | 'selector'
  | 'value'
  | 'atrule'

export interface Token {
  kind: TokenKind
  value: string
}

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch',
  'case', 'break', 'continue', 'new', 'class', 'extends', 'this', 'super', 'try', 'catch',
  'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'delete', 'void', 'await', 'async',
  'yield', 'import', 'export', 'from', 'default', 'as', 'static', 'get', 'set', 'null',
  'undefined', 'true', 'false', 'NaN',
])

/**
 * TypeScript keeps every JavaScript keyword and adds type-level ones. The
 * editor has no semantic model, so this is a lexical pass: it only needs to
 * make `interface`, `type`, `readonly` and friends read as keywords rather
 * than as ordinary identifiers.
 */
const TS_KEYWORDS = new Set([
  ...JS_KEYWORDS,
  'interface', 'type', 'enum', 'implements', 'readonly', 'public', 'private',
  'protected', 'abstract', 'declare', 'namespace', 'keyof', 'infer', 'satisfies',
  'override', 'any', 'unknown', 'never', 'string', 'number', 'boolean', 'object',
  'symbol', 'bigint',
])

const JS_BUILTINS = new Set([
  'console', 'document', 'window', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number',
  'Boolean', 'Promise', 'Set', 'Map', 'Date', 'RegExp', 'Error', 'Symbol', 'parseInt',
  'parseFloat', 'isNaN', 'setTimeout', 'setInterval', 'fetch', 'localStorage', 'alert',
  'structuredClone', 'ArrayBuffer',
])

const CSS_AT_RULES = new Set([
  'media', 'supports', 'import', 'keyframes', 'font-face', 'layer', 'container', 'property',
  'charset', 'namespace', 'scope',
])

function push(tokens: Token[], kind: TokenKind, value: string) {
  if (!value) return
  const last = tokens[tokens.length - 1]
  if (last && last.kind === kind) {
    last.value += value
    return
  }
  tokens.push({ kind, value })
}

const TAG_RE = /<\/?[a-zA-Z][\w-]*/g
const IDENT_RE = /[A-Za-z_$][\w$]*/y
const NUM_RE = /\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?/y

export function highlightHtml(source: string): Token[] {
  const tokens: Token[] = []
  let index = 0
  while (index < source.length) {
    const rest = source.slice(index)

    const commentStart = rest.indexOf('<!--')
    const tagStart = source.indexOf('<', index)
    const nextSpecial = Math.min(
      commentStart === -1 ? Infinity : index + commentStart,
      tagStart === -1 ? Infinity : tagStart,
    )
    if (nextSpecial === Infinity) {
      push(tokens, 'plain', rest)
      break
    }
    push(tokens, 'plain', source.slice(index, nextSpecial))
    index = nextSpecial

    if (source.startsWith('<!--', index)) {
      const end = source.indexOf('-->', index)
      const stop = end === -1 ? source.length : end + 3
      push(tokens, 'comment', source.slice(index, stop))
      index = stop
      continue
    }

    // <tag ...> or </tag>
    const match = /^<\/?[a-zA-Z][\w-]*/.exec(source.slice(index))
    if (!match) {
      push(tokens, 'plain', source[index]!)
      index += 1
      continue
    }
    push(tokens, 'tag', match[0])
    index += match[0].length

    // attributes until > or />
    while (index < source.length) {
      const char = source[index]!
      if (char === '>') {
        push(tokens, 'tag', '>')
        index += 1
        break
      }
      if (char === '/' && source[index + 1] === '>') {
        push(tokens, 'tag', '/>')
        index += 2
        break
      }
      if (/\s/.test(char)) {
        push(tokens, 'plain', char)
        index += 1
        continue
      }
      if (char === '"' || char === "'") {
        const end = source.indexOf(char, index + 1)
        const stop = end === -1 ? source.length : end + 1
        push(tokens, 'string', source.slice(index, stop))
        index = stop
        continue
      }
      if (char === '=') {
        push(tokens, 'operator', '=')
        index += 1
        continue
      }
      IDENT_RE.lastIndex = index
      const ident = IDENT_RE.exec(source)
      if (ident && ident.index === index) {
        push(tokens, 'attr', ident[0])
        index += ident[0].length
        continue
      }
      push(tokens, 'plain', char)
      index += 1
    }
  }
  return tokens
}

export function highlightCss(source: string): Token[] {
  const tokens: Token[] = []
  let index = 0
  while (index < source.length) {
    const char = source[index]!
    if (char === '/' && source[index + 1] === '*') {
      const end = source.indexOf('*/', index)
      const stop = end === -1 ? source.length : end + 2
      push(tokens, 'comment', source.slice(index, stop))
      index = stop
      continue
    }
    if (source.startsWith('/*', index)) {
      const end = source.indexOf('*/', index)
      const stop = end === -1 ? source.length : end + 2
      push(tokens, 'comment', source.slice(index, stop))
      index = stop
      continue
    }
    if (char === '"' || char === "'") {
      const end = source.indexOf(char, index + 1)
      const stop = end === -1 ? source.length : end + 1
      push(tokens, 'string', source.slice(index, stop))
      index = stop
      continue
    }
    if (char === '@') {
      IDENT_RE.lastIndex = index + 1
      const ident = IDENT_RE.exec(source)
      if (ident && ident.index === index + 1) {
        push(tokens, 'atrule', '@' + ident[0])
        index += 1 + ident[0].length
        continue
      }
      push(tokens, 'atrule', '@')
      index += 1
      continue
    }
    if (source.startsWith('--', index)) {
      IDENT_RE.lastIndex = index + 2
      const ident = IDENT_RE.exec(source)
      if (ident && ident.index === index + 2) {
        push(tokens, 'property', '--' + ident[0])
        index += 2 + ident[0].length
        continue
      }
    }
    if (char === '{' || char === '}') {
      push(tokens, 'selector', char)
      index += 1
      continue
    }
    if (char === ':' && !source.startsWith('::', index)) {
      push(tokens, 'operator', ':')
      index += 1
      continue
    }
    if (char === ';' || char === ',') {
      push(tokens, 'punctuation', char)
      index += 1
      continue
    }
    if (char === '#' || char === '.') {
      IDENT_RE.lastIndex = index + 1
      const ident = IDENT_RE.exec(source)
      if (ident && ident.index === index + 1) {
        push(tokens, 'selector', char + ident[0])
        index += 1 + ident[0].length
        continue
      }
    }
    IDENT_RE.lastIndex = index
    const ident = IDENT_RE.exec(source)
    if (ident && ident.index === index) {
      const isProperty = tokens.length > 0 && tokens[tokens.length - 1]!.kind === 'selector'
      const prevChar = findPrevNonSpace(source, index)
      push(tokens, isProperty ? 'property' : 'value', ident[0])
      index += ident[0].length
      continue
    }
    NUM_RE.lastIndex = index
    const num = NUM_RE.exec(source)
    if (num && num.index === index) {
      push(tokens, 'number', num[0])
      index += num[0].length
      continue
    }
    if (/\s/.test(char)) {
      push(tokens, 'plain', char)
      index += 1
      continue
    }
    push(tokens, 'plain', char)
    index += 1
  }
  return tokens
}

function findPrevNonSpace(source: string, index: number): string {
  for (let i = index - 1; i >= 0; i -= 1) {
    const char = source[i]!
    if (!/\s/.test(char)) return char
  }
  return ''
}

export function highlightJs(source: string): Token[] {
  return highlightJsLike(source, JS_KEYWORDS)
}

/** TypeScript and JSX share JavaScript's grammar; only the keyword set differs. */
export function highlightTs(source: string): Token[] {
  return highlightJsLike(source, TS_KEYWORDS)
}

function highlightJsLike(source: string, keywords: Set<string>): Token[] {
  const tokens: Token[] = []
  let index = 0
  let prevMeaningful: Token | null = null
  const atLineStart = (i: number) => {
    for (let k = i - 1; k >= 0; k -= 1) {
      const char = source[k]!
      if (char === '\n') return true
      if (!/\s/.test(char)) return false
    }
    return true
  }

  while (index < source.length) {
    const char = source[index]!

    if (char === '/' && source[index + 1] === '/') {
      let end = source.indexOf('\n', index)
      if (end === -1) end = source.length
      push(tokens, 'comment', source.slice(index, end))
      index = end
      continue
    }
    if (char === '/' && source[index + 1] === '*') {
      let end = source.indexOf('*/', index)
      end = end === -1 ? source.length : end + 2
      push(tokens, 'comment', source.slice(index, end))
      index = end
      continue
    }
    if (char === '"' || char === "'" || char === '`') {
      let end = index + 1
      while (end < source.length) {
        if (source[end] === '\\') {
          end += 2
          continue
        }
        if (source[end] === char) {
          end += 1
          break
        }
        if (char !== '`' && source[end] === '\n') break
        end += 1
      }
      push(tokens, 'string', source.slice(index, end))
      index = end
      continue
    }
    if (/\d/.test(char)) {
      NUM_RE.lastIndex = index
      const num = NUM_RE.exec(source)
      if (num && num.index === index) {
        push(tokens, 'number', num[0])
        index += num[0].length
        continue
      }
    }
    IDENT_RE.lastIndex = index
    const ident = IDENT_RE.exec(source)
    if (ident && ident.index === index) {
      const word = ident[0]
      let after = index + word.length
      while (after < source.length && /\s/.test(source[after]!)) after += 1
      const nextChar = source[after] ?? ''
      let kind: TokenKind = 'plain'
      if (keywords.has(word)) kind = 'keyword'
      else if (nextChar === '(') kind = 'function'
      else if (JS_BUILTINS.has(word)) kind = 'property'
      else if (prevMeaningful && (prevMeaningful.kind === 'property' || prevMeaningful.value === '.')) {
        kind = 'property'
      } else if (source[index - 1] === '.') kind = 'property'
      push(tokens, kind, word)
      prevMeaningful = tokens[tokens.length - 1]!
      index += word.length
      continue
    }
    if (/[+\-*/%=<>!&|^~?:]/.test(char)) {
      let end = index
      while (end < source.length && /[+\-*/%=<>!&|^~?:]/.test(source[end]!)) end += 1
      const text = source.slice(index, end)
      push(tokens, 'operator', text)
      if (!/^\s+$/.test(text)) prevMeaningful = tokens[tokens.length - 1]!
      index = end
      continue
    }
    if (/[{}()[\];,.]/.test(char)) {
      push(tokens, 'punctuation', char)
      prevMeaningful = tokens[tokens.length - 1]!
      index += 1
      continue
    }
    if (/\s/.test(char)) {
      push(tokens, 'plain', char)
      index += 1
      continue
    }
    void atLineStart
    push(tokens, 'plain', char)
    index += 1
  }
  return tokens
}

export function highlightPlain(source: string): Token[] {
  return [{ kind: 'plain', value: source }]
}

export function highlight(source: string, language: EditorLanguage | 'plaintext'): Token[] {
  switch (language) {
    case 'html':
      return highlightHtml(source)
    case 'css':
      return highlightCss(source)
    case 'javascript':
      return highlightJs(source)
    case 'typescript':
    case 'jsx':
    case 'tsx':
      return highlightTs(source)
    default:
      return highlightPlain(source)
  }
}

export const TOKEN_CLASS: Record<TokenKind, string> = {
  plain: '',
  tag: 'text-[var(--color-token-tag)]',
  attr: 'text-[var(--color-token-attr)]',
  string: 'text-[var(--color-token-string)]',
  comment: 'text-[var(--color-token-comment)] italic',
  keyword: 'text-[var(--color-token-keyword)] font-medium',
  number: 'text-[var(--color-token-number)]',
  function: 'text-[var(--color-token-function)]',
  property: 'text-[var(--color-token-property)]',
  operator: 'text-[var(--color-token-operator)]',
  punctuation: 'text-[var(--color-token-punctuation)]',
  selector: 'text-[var(--color-token-selector)]',
  value: 'text-[var(--color-token-value)]',
  atrule: 'text-[var(--color-token-atrule)]',
}