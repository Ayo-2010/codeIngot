import type { HtmlTagPage } from '~/types/content'
import { htmlTagPages1 } from './html-tag-pages-1'
import { htmlTagPages2 } from './html-tag-pages-2'
import { htmlTagPages3 } from './html-tag-pages-3'
import { htmlTagPages4 } from './html-tag-pages-4'

/**
 * Every tag detail page, in the same order as the tag list. The four chunks
 * exist only to keep the data files a readable size; nothing else should need
 * to know about them.
 */
export const htmlTagPages: HtmlTagPage[] = [
  ...htmlTagPages1,
  ...htmlTagPages2,
  ...htmlTagPages3,
  ...htmlTagPages4,
]

/** Looks up one detail page by the slug used in its route. */
export function findHtmlTagPage(slug: string): HtmlTagPage | undefined {
  return htmlTagPages.find((page) => tagSlug(page.tag) === slug)
}

/** `<article>` -> `article`, `<!--...-->` -> `comment`, `<!DOCTYPE>` -> `doctype`. */
export function tagSlug(tag: string): string {
  if (tag.startsWith('<!--')) return 'comment'
  if (tag.toUpperCase().startsWith('<!DOCTYPE')) return 'doctype'
  return tag.replace(/^<|>$/g, '').toLowerCase()
}
