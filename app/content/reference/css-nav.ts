import type { ReferenceNavItem } from '~/types/content'
import { cssProperties } from './css-properties'
import { propertySlug } from './css-property-pages'

/**
 * The CSS reference sidebar, in the order given by the source index. The
 * Properties group follows the section pages, so every property is reachable
 * from any page without the section links moving.
 */
export const cssNavItems: ReferenceNavItem[] = [
  { id: 'overview', label: 'CSS Reference', to: '/reference/css' },
  { id: 'browser-support', label: 'CSS Browser Support', to: '/reference/css/browser-support' },
  { id: 'selectors', label: 'CSS Selectors', to: '/reference/css/selectors' },
  { id: 'functions', label: 'CSS Functions', to: '/reference/css/functions' },
  { id: 'aural', label: 'CSS Reference Aural', to: '/reference/css/aural' },
  { id: 'web-safe-fonts', label: 'CSS Web Safe Fonts', to: '/reference/css/web-safe-fonts' },
  { id: 'font-fallbacks', label: 'CSS Font Fallbacks', to: '/reference/css/font-fallbacks' },
  { id: 'animatable', label: 'CSS Animatable', to: '/reference/css/animatable' },
  { id: 'units', label: 'CSS Units', to: '/reference/css/units' },
  { id: 'px-to-em', label: 'CSS PX-EM Converter', to: '/reference/css/px-to-em' },
  { id: 'colors', label: 'CSS Colors', to: '/reference/css/colors' },
  { id: 'color-values', label: 'CSS Color Values', to: '/reference/css/color-values' },
  { id: 'default-values', label: 'CSS Default Values', to: '/reference/css/default-values' },
  { id: 'entities', label: 'CSS Entities', to: '/reference/css/entities' },
]

/** The Properties group, rendered under the heading `CSS Properties`. */
export const cssPropertyNavItems = cssProperties.map((property) => ({
  label: property.name,
  to: `/reference/css/property/${propertySlug(property.name)}`,
}))