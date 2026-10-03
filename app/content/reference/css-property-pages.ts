import type { CssPropertyPage } from '~/types/content'
import { cssProperties } from './css-properties'
import { cssPropertyPages1 } from './css-property-pages-1'
import { cssPropertyPages2 } from './css-property-pages-2'
import { cssPropertyPages3 } from './css-property-pages-3'

/**
 * Every property page, ordered to match the source index rather than to match
 * the chunk files, so the sidebar and the previous/next links walk the list in
 * the same order the reference itself does.
 */
const byIndex = new Map<string, CssPropertyPage>()

for (const page of [...cssPropertyPages1, ...cssPropertyPages2, ...cssPropertyPages3]) {
  if (byIndex.has(page.property)) {
    throw new Error(`Duplicate CSS property page: ${page.property}`)
  }
  byIndex.set(page.property, page)
}

export const cssPropertyPages: CssPropertyPage[] = cssProperties.flatMap((property) => {
  const page = byIndex.get(property.name)
  if (!page) return []
  // A property should not link to itself, and every related link should point
  // at a property that has a page, so no link on a detail page dead-ends.
  const known = new Set(cssProperties.map((entry) => entry.name))
  return [
    {
      ...page,
      usage: page.usage || property.description,
      related: page.related.filter((name) => name !== property.name && known.has(name)),
    },
  ]
})

/**
 * A property listed in the index with no detail page is a hole in the
 * reference, and it is easy to introduce when a new property is added. Failing
 * here at import time is loud on purpose, rather than shipping a property whose
 * link in the sidebar goes nowhere.
 */
const missing = cssProperties.filter((property) => !byIndex.has(property.name))
if (missing.length) {
  throw new Error(
    `CSS properties with no detail page: ${missing.map((property) => property.name).join(', ')}`,
  )
}

/** At-rules drop the leading `@` for the route, since it reads as noise in a URL. */
export function propertySlug(name: string) {
  return name.replace(/^@/, '')
}

export function findCssPropertyPage(slug: string) {
  return cssPropertyPages.find((page) => propertySlug(page.property) === slug)
}
