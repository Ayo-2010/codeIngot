import { describe, expect, it } from 'vitest'
import {
  matchesCssRule,
  matchesJsCall,
  matchesText,
  normalizeSelector,
  selectorTestBody,
} from '~/utils/project-verify'

describe('normalizeSelector', () => {
  it('strips the HTML-style angle bracket early content used', () => {
    expect(normalizeSelector('<li')).toBe('li')
    expect(normalizeSelector('<caption')).toBe('caption')
    expect(normalizeSelector('  <label  ')).toBe('label')
  })

  it('leaves real selectors alone', () => {
    expect(normalizeSelector('main#main')).toBe('main#main')
    expect(normalizeSelector('img[alt]')).toBe('img[alt]')
    expect(normalizeSelector('[role="tablist"]')).toBe('[role="tablist"]')
  })
})

describe('selectorTestBody', () => {
  it('requires at least one match by default', () => {
    expect(selectorTestBody({ selector: 'article' })).toBe(
      'return document.querySelectorAll("article").length >= 1',
    )
  })

  it('requires the stored count when there is one', () => {
    expect(selectorTestBody({ selector: 'section', count: 3 })).toBe(
      'return document.querySelectorAll("section").length >= 3',
    )
  })

  it('never asks for fewer than one match', () => {
    expect(selectorTestBody({ selector: 'section', count: 0 })).toContain('>= 1')
  })
})

describe('matchesText', () => {
  it('looks at the HTML only, case-insensitively', () => {
    expect(matchesText('<p>About me</p>', 'about')).toBe(true)
    expect(matchesText('<p>nothing here</p>', 'about')).toBe(false)
  })
})

describe('matchesCssRule', () => {
  it('matches whole words, so gap does not match gap-sm', () => {
    expect(matchesCssRule('.card { gap: 1rem; }', 'gap')).toBe(true)
    expect(matchesCssRule('.card { gap-sm: 1rem; }', 'gap')).toBe(false)
  })

  it('finds at-rules and pseudo-classes', () => {
    expect(matchesCssRule('@media (min-width: 40em) {}', '@media')).toBe(true)
    expect(matchesCssRule('a:hover {}', ':hover')).toBe(true)
  })
})

describe('matchesJsCall', () => {
  it('matches bare identifiers as words, case-insensitively', () => {
    expect(matchesJsCall('const el = document.querySelector("#x")', 'queryselector')).toBe(true)
    expect(matchesJsCall('const list = []', 'queryselector')).toBe(false)
  })

  it('matches dotted calls literally', () => {
    expect(matchesJsCall('await response.json()', 'json()')).toBe(true)
    expect(matchesJsCall('const x = jsonValue', 'json()')).toBe(false)
  })
})
