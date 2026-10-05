import type { JsMember, JsTopic } from '~/types/content'
import { cssProperties } from './css-properties'
import { javascriptTopics1 } from './javascript-1'
import { javascriptTopics2 } from './javascript-2'
import { javascriptTopics3 } from './javascript-3'
import { javascriptTopics4 } from './javascript-4'
import { javascriptTopics5 } from './javascript-5'
import { memberKind } from './javascript-builders'

/**
 * The JavaScript reference, in the order the source index lists it.
 *
 * The `DOM Style` topic is derived from `cssProperties` rather than described a
 * second time: its 170 matching entries are the camelCase face of the same
 * properties the CSS reference already documents, so `alignContent` here and
 * `align-content` there cannot drift apart. Only the three entries with no CSS
 * equivalent are written out by hand.
 */

/** camelCase for a CSS property name, e.g. `align-content` to `alignContent`. */
function toCamelCase(property: string): string {
  return property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase())
}

const cssByCamelName = new Map(cssProperties.map((property) => [toCamelCase(property.name), property]))

/** The DOM Style entries with no CSS property behind them. */
const domStyleExtras: JsMember[] = [
  {
    name: 'cssFloat',
    kind: 'property',
    description:
      'Reads and writes the CSS float property. It carries the css prefix because float is a reserved word in JavaScript and could not be used as a property name.',
  },
  {
    name: 'orphans',
    kind: 'property',
    description:
      'How many lines of a block must be left at the bottom of a page before a break is forced, so the next page never starts with a single stranded line.',
  },
  {
    name: 'widows',
    kind: 'property',
    description:
      'How many lines of a block must be left at the top of a page before a break is forced, so the previous page never ends with a single stranded line.',
  },
]

function buildDomStyle(): JsTopic {
  // Order the topic by the source index rather than by the CSS list, so the
  // sidebar and the alphabet view agree with everything else in the reference.
  const names = [
    'alignContent', 'alignItems', 'alignSelf', 'animation', 'animationDelay', 'animationDirection',
    'animationDuration', 'animationFillMode', 'animationIterationCount', 'animationName',
    'animationTimingFunction', 'animationPlayState', 'background', 'backgroundAttachment',
    'backgroundColor', 'backgroundImage', 'backgroundPosition', 'backgroundRepeat', 'backgroundClip',
    'backgroundOrigin', 'backgroundSize', 'backfaceVisibility', 'border', 'borderBottom',
    'borderBottomColor', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderBottomStyle',
    'borderBottomWidth', 'borderCollapse', 'borderColor', 'borderImage', 'borderImageOutset',
    'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth', 'borderLeft',
    'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRadius', 'borderRight',
    'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderSpacing', 'borderStyle',
    'borderTop', 'borderTopColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderTopStyle',
    'borderTopWidth', 'borderWidth', 'bottom', 'boxShadow', 'boxSizing', 'captionSide', 'caretColor',
    'clear', 'clip', 'color', 'columnCount', 'columnFill', 'columnGap', 'columnRule', 'columnRuleColor',
    'columnRuleStyle', 'columnRuleWidth', 'columns', 'columnSpan', 'columnWidth', 'counterIncrement',
    'counterReset', 'cursor', 'direction', 'display', 'emptyCells', 'filter', 'flex', 'flexBasis',
    'flexDirection', 'flexFlow', 'flexGrow', 'flexShrink', 'flexWrap', 'cssFloat', 'font', 'fontFamily',
    'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'fontSizeAdjust', 'height', 'isolation',
    'justifyContent', 'left', 'letterSpacing', 'lineHeight', 'listStyle', 'listStyleImage',
    'listStylePosition', 'listStyleType', 'margin', 'marginBottom', 'marginLeft', 'marginRight',
    'marginTop', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'objectFit', 'objectPosition',
    'opacity', 'order', 'orphans', 'outline', 'outlineColor', 'outlineOffset', 'outlineStyle',
    'outlineWidth', 'overflow', 'overflowX', 'overflowY', 'padding', 'paddingBottom', 'paddingLeft',
    'paddingRight', 'paddingTop', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside',
    'perspective', 'perspectiveOrigin', 'position', 'quotes', 'resize', 'right', 'scrollBehavior',
    'tableLayout', 'tabSize', 'textAlign', 'textAlignLast', 'textDecoration', 'textDecorationColor',
    'textDecorationLine', 'textDecorationStyle', 'textIndent', 'textOverflow', 'textShadow',
    'textTransform', 'top', 'transform', 'transformOrigin', 'transformStyle', 'transition',
    'transitionProperty', 'transitionDuration', 'transitionTimingFunction', 'transitionDelay',
    'unicodeBidi', 'userSelect', 'verticalAlign', 'visibility', 'width', 'wordBreak', 'wordSpacing',
    'wordWrap', 'widows', 'zIndex',
  ]

  const extras = new Map(domStyleExtras.map((member) => [member.name, member]))

  const members: JsMember[] = names.map((name) => {
    const extra = extras.get(name)
    if (extra) return extra

    const property = cssByCamelName.get(name)
    if (!property) throw new Error(`DOM Style entry has no CSS property and no hand-written description: ${name}`)

    return {
      name,
      kind: memberKind('DOM Style', name),
      description: property.description,
      ...(property.deprecated ? { deprecated: property.deprecated } : {}),
    }
  })

  return {
    id: 'dom-style',
    label: 'DOM Style',
    group: 'HTML DOM',
    summary: 'Every CSS property as a JavaScript property on element.style.',
    usage:
      'This is what `element.style` is made of. The names are the CSS properties you already know, converted from kebab-case to camelCase, so `border-top-width` becomes `borderTopWidth`. Assigning to a property writes an inline style on that element alone and wins over every stylesheet, which is why it is the right tool for a value computed in script and the wrong tool for a design decision. Setting a custom property needs setProperty, since `--my-var` is not a valid identifier. The full behaviour of each property is documented in the CSS reference.',
    example: {
      language: 'javascript',
      code: `el.style.borderTopWidth = '2px'
el.style.setProperty('--accent', 'navy')   // custom properties need setProperty

const computed = getComputedStyle(el)
computed.getPropertyValue('display')      // what the cascade actually decided

// Write to the whole block at once, which replaces every inline style.
el.style.cssText = 'color: red; display: block'`,
    },
    members,
  }
}

const domStyle = buildDomStyle()

/** How many members the source index lists under each topic. */
const EXPECTED_MEMBER_COUNTS: Record<string, number> = {
  'js-array': 33,
  'js-boolean': 4,
  'js-classes': 4,
  'js-date': 48,
  'js-error': 2,
  'js-global': 16,
  'js-json': 2,
  'js-math': 40,
  'js-number': 17,
  'js-operators': 0,
  'js-regexp': 46,
  'js-statements': 16,
  'js-string': 28,
  'js-conversion': 0,
  'dom-attributes': 9,
  'dom-document': 56,
  'dom-element': 89,
  'dom-events': 138,
  'dom-event-objects': 17,
  'dom-htmlcollection': 3,
  'dom-location': 12,
  'dom-navigator': 12,
  'dom-screen': 6,
  'dom-style': 173,
  'dom-window': 52,
  'api-console': 14,
  'api-geolocation': 2,
  'api-history': 4,
  'api-storage': 6,
  'cssstyledeclaration': 8,
}

const authored: JsTopic[] = [
  ...javascriptTopics1,
  ...javascriptTopics2,
  ...javascriptTopics3,
  ...javascriptTopics4,
  ...javascriptTopics5,
]

/**
 * `DOM Style` is generated, so it is spliced in at the position the source index
 * puts it: after `DOM Screen` and before `DOM Window`.
 */
export const javascriptTopics: JsTopic[] = (() => {
  const topics: JsTopic[] = []
  let stylePlaced = false
  for (const topic of authored) {
    if (!stylePlaced && topic.id === 'dom-window') {
      topics.push(domStyle)
      stylePlaced = true
    }
    topics.push(topic)
  }
  if (!stylePlaced) topics.push(domStyle)
  return topics
})()

// Fail at import time rather than shipping a reference with a hole in it.
const ids = new Set<string>()
for (const topic of javascriptTopics) {
  if (ids.has(topic.id)) throw new Error(`Duplicate JavaScript reference topic id: ${topic.id}`)
  ids.add(topic.id)

  const expected = EXPECTED_MEMBER_COUNTS[topic.id]
  if (expected === undefined) throw new Error(`JavaScript reference topic is not counted: ${topic.id}`)
  if (topic.members.length !== expected) {
    throw new Error(
      `JavaScript reference topic ${topic.id} has ${topic.members.length} members, expected ${expected}`,
    )
  }

  const names = new Set<string>()
  for (const member of topic.members) {
    if (names.has(member.name)) throw new Error(`Duplicate member in ${topic.id}: ${member.name}`)
    names.add(member.name)
    if (!member.description.trim()) throw new Error(`Empty description for ${topic.id} / ${member.name}`)
  }
}

for (const id of Object.keys(EXPECTED_MEMBER_COUNTS)) {
  if (!ids.has(id)) throw new Error(`JavaScript reference topic missing: ${id}`)
}

/** URL-safe identifier for a topic, e.g. `JS Array` to `js-array`. */
export function javascriptTopicSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Every member in the reference, paired with the topic it belongs to. */
export interface FlatJsMember {
  topic: JsTopic
  member: JsMember
}

export const allJsMembers: FlatJsMember[] = javascriptTopics.flatMap((topic) =>
  topic.members.map((member) => ({ topic, member })),
)

export function javascriptTopicBySlug(slug: string): JsTopic | undefined {
  return javascriptTopics.find((topic) => topic.id === slug)
}
