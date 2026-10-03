import type { BrowserSupport } from '~/types/content'

/**
 * First versions with usable support, grouped by the era a feature belongs to.
 * The reference only lists the four evergreen engines, so a property that dates
 * from the CSS1 era reports the same row rather than a hundred per-property
 * tables of near-identical numbers.
 */
const ERAS = {
  core: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '1' },
  flexbox: { Chrome: '29', Edge: '12', Firefox: '28', Safari: '9' },
  grid: { Chrome: '57', Edge: '16', Firefox: '52', Safari: '10.1' },
  flexGap: { Chrome: '84', Edge: '84', Firefox: '63', Safari: '14.1' },
  transform2d: { Chrome: '4', Edge: '12', Firefox: '16', Safari: '6' },
  transform3d: { Chrome: '36', Edge: '12', Firefox: '16', Safari: '9' },
  transition: { Chrome: '26', Edge: '12', Firefox: '16', Safari: '7' },
  animation: { Chrome: '43', Edge: '12', Firefox: '16', Safari: '9' },
  customProps: { Chrome: '49', Edge: '79', Firefox: '31', Safari: '9.1' },
  boxShadow: { Chrome: '10', Edge: '12', Firefox: '4', Safari: '5.1' },
  textShadow: { Chrome: '4', Edge: '12', Firefox: '3.5', Safari: '3.1' },
  borderRadius: { Chrome: '4', Edge: '12', Firefox: '4', Safari: '5' },
  multipleBackgrounds: { Chrome: '4', Edge: '12', Firefox: '4', Safari: '5' },
  backgroundSize: { Chrome: '4', Edge: '12', Firefox: '4', Safari: '5' },
  blendMode: { Chrome: '41', Edge: '79', Firefox: '32', Safari: '9' },
  filter: { Chrome: '53', Edge: '79', Firefox: '35', Safari: '10' },
  backdropFilter: { Chrome: '76', Edge: '79', Firefox: '103', Safari: '18' },
  clipPath: { Chrome: '55', Edge: '79', Firefox: '54', Safari: '13.1' },
  objectFit: { Chrome: '32', Edge: '12', Firefox: '36', Safari: '10' },
  multiColumn: { Chrome: '50', Edge: '12', Firefox: '52', Safari: '10' },
  columnFill: { Chrome: '50', Edge: '12', Firefox: '52', Safari: '10' },
  columnsStrict: { Chrome: '50', Edge: '12', Firefox: '52', Safari: '10' },
  sticky: { Chrome: '56', Edge: '12', Firefox: '32', Safari: '13' },
  scrollBehavior: { Chrome: '61', Edge: '79', Firefox: '36', Safari: '15.4' },
  textSizeAdjust: { Chrome: '54', Edge: '79', Firefox: '1', Safari: '17' },
  fontVariantCaps: { Chrome: '52', Edge: '79', Firefox: '34', Safari: '9.1' },
  fontStretch: { Chrome: '55', Edge: '12', Firefox: '42', Safari: '10' },
  fontFeatureSettings: { Chrome: '62', Edge: '79', Firefox: '34', Safari: '11' },
  imageRendering: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  logicalText: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  writingMode: { Chrome: '48', Edge: '12', Firefox: '41', Safari: '11' },
  hyphens: { Chrome: '55', Edge: '79', Firefox: '43', Safari: '17' },
  userSelect: { Chrome: '54', Edge: '79', Firefox: '69', Safari: '17' },
  textOverflow: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  pointerEventsNone: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  isolation: { Chrome: '41', Edge: '79', Firefox: '36', Safari: '11.1' },
  resize: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  boxDecorationBreak: { Chrome: '130', Edge: '130', Firefox: '32', Safari: '11.1' },
  borderImage: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  tableLayout: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  pageBreak: { Chrome: '1', Edge: '12', Firefox: '1', Safari: '3.1' },
  breakProperties: { Chrome: '50', Edge: '12', Firefox: '52', Safari: '10' },
  scrollbarGutter: { Chrome: '94', Edge: '94', Firefox: '97', Safari: '18.2' },
} as const satisfies Record<string, Record<BrowserSupport['browser'], string>>

export type CssSupportEra = keyof typeof ERAS

/** First version with support, per engine. */
export type CssSupportVersion = Partial<Record<BrowserSupport['browser'], string>>

/**
 * Support for one page. A handful of properties shipped in different years to
 * the rest of their family — `position: sticky` against `position`, `gap` in
 * flex against `gap` in grid — so those pass their own version map.
 */
export function propertySupport(era: CssSupportEra, overrides: CssSupportVersion = {}): BrowserSupport[] {
  const row = ERAS[era]
  return (Object.keys(row) as BrowserSupport['browser'][]).map((browser) => ({
    browser,
    version: overrides[browser] ?? row[browser],
  }))
}
