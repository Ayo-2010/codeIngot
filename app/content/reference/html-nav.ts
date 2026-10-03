import type { ReferenceNavItem } from '~/types/content'
import { htmlTags } from './html'
import { tagSlug } from './html-tag-pages'

/**
 * The HTML reference sidebar, in the order given by the source index. The Tags
 * group follows the section pages, so every element is reachable from any page
 * without the section links moving.
 */
export const htmlNavItems: ReferenceNavItem[] = [
  { id: 'overview', label: 'HTML Reference', to: '/reference/html' },
  { id: 'alphabet', label: 'HTML by Alphabet', to: '/reference/html/alphabet' },
  { id: 'category', label: 'HTML by Category', to: '/reference/html/category' },
  { id: 'browser-support', label: 'HTML Browser Support', to: '/reference/html/browser-support' },
  { id: 'attributes', label: 'HTML Attributes', to: '/reference/html/attributes' },
  { id: 'global-attributes', label: 'HTML Global Attributes', to: '/reference/html/global-attributes' },
  { id: 'events', label: 'HTML Events', to: '/reference/html/events' },
  { id: 'colors', label: 'HTML Colors', to: '/reference/html/colors' },
  { id: 'canvas', label: 'HTML Canvas', to: '/reference/html/canvas' },
  { id: 'audio-video', label: 'HTML Audio/Video', to: '/reference/html/audio-video' },
  { id: 'character-sets', label: 'HTML Character Sets', to: '/reference/html/character-sets' },
  { id: 'doctypes', label: 'HTML Doctypes', to: '/reference/html/doctypes' },
  { id: 'url-encode', label: 'HTML URL Encode', to: '/reference/html/url-encode' },
  { id: 'language-codes', label: 'HTML Language Codes', to: '/reference/html/language-codes' },
  { id: 'country-codes', label: 'HTML Country Codes', to: '/reference/html/country-codes' },
  { id: 'http-messages', label: 'HTTP Messages', to: '/reference/html/http-messages' },
  { id: 'http-methods', label: 'HTTP Methods', to: '/reference/html/http-methods' },
  { id: 'px-to-em', label: 'PX to EM Converter', to: '/reference/html/px-to-em' },
  { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts', to: '/reference/html/keyboard-shortcuts' },
]

/** The Tags group, rendered under the heading `HTML Tags` after every section. */
export const htmlTagNavItems = htmlTags.map((tag) => ({
  label: tag.tag,
  to: `/reference/html/tag/${tagSlug(tag.tag)}`,
}))
