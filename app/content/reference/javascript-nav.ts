import type { ReferenceNavItem } from '~/types/content'
import { javascriptTopics } from './javascript'

/**
 * The JavaScript reference sidebar.
 *
 * The source index lists two views, "JS by Category" and "JS by Alphabet", and
 * then groups the topics under four headings. Those headings are kept here
 * because they are how the source is organised, and a reference that loses its
 * own grouping is harder to navigate than one that keeps it.
 *
 * Unlike HTML and CSS, the topics are not repeated in a collapsed group below.
 * A list of every member would be 857 links, which is too long to be worth
 * scrolling; each topic page searches its own members instead.
 */

export interface JavascriptNavGroup {
  label: string
  items: ReferenceNavItem[]
}

/** The two index pages, which the source puts above everything else. */
export const javascriptIndexNavItems: ReferenceNavItem[] = [
  { id: 'alphabet', label: 'JS by Alphabet', to: '/reference/javascript/alphabet' },
  { id: 'category', label: 'JS by Category', to: '/reference/javascript/category' },
]

/** The group headings, in the order the source index uses them. */
const GROUP_ORDER = ['JavaScript', 'HTML DOM', 'Web APIs', 'Other References']

export const javascriptNavGroups: JavascriptNavGroup[] = GROUP_ORDER.map((label) => ({
  label,
  items: javascriptTopics
    .filter((topic) => topic.group === label)
    .map((topic) => ({ id: topic.id, label: topic.label, to: `/reference/javascript/topic/${topic.id}` })),
})).filter((group) => group.items.length > 0)

/** The whole topic list in source order, for pages that need a flat list. */
export const javascriptNavItems: ReferenceNavItem[] = javascriptNavGroups.flatMap((group) => group.items)
