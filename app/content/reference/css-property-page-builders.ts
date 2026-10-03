import type { CssPropertyPage, EditorLanguage } from '~/types/content'
import { propertySupport, type CssSupportEra, type CssSupportVersion } from './css-property-support'

/**
 * Most CSS properties come in families: four margin sides, four border widths,
 * eight transition parts. Defining the family once keeps the four longhand
 * pages from drifting apart, and each generated page still gets its own
 * selector, declaration and wording.
 */
export interface FamilySpec {
  /** Property names in the order the source index lists them. */
  names: string[]
  /** The selector every page in the family shares. */
  lead: string
  /** The declaration that page shows, given its own property name. */
  declaration: (name: string) => string
  /** One or two sentences per property. */
  usage: Record<string, string>
  related: string[]
  era: CssSupportEra
  overrides?: CssSupportVersion
}

export function family(spec: FamilySpec): CssPropertyPage[] {
  return spec.names.map((property) => ({
    property,
    usage: spec.usage[property] ?? '',
    example: {
      language: 'css' as EditorLanguage,
      code: `${spec.lead} {\n${spec.declaration(property)}\n}`,
    },
    support: propertySupport(spec.era, spec.overrides),
    related: spec.related,
  }))
}

/** A page whose example needs to be written out rather than generated. */
export function page(
  property: string,
  usage: string,
  code: string,
  related: string[],
  era: CssSupportEra,
  overrides?: CssSupportVersion,
): CssPropertyPage {
  return {
    property,
    usage,
    example: { language: 'css', code },
    support: propertySupport(era, overrides),
    related,
  }
}

/**
 * At-rules are not declarations, so their example is a whole block with no
 * selector. This keeps the five at-rules from needing a bespoke page shape.
 */
export function atRule(
  property: string,
  usage: string,
  code: string,
  related: string[],
  era: CssSupportEra,
): CssPropertyPage {
  return { property, usage, example: { language: 'css', code }, support: propertySupport(era), related }
}
