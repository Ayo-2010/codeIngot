import type { JsMember, JsMemberKind, JsTopic } from '~/types/content'
import type { EditorLanguage } from '~/types/content'

/**
 * Shared shapes for the JavaScript reference data files.
 *
 * Descriptions are the only hand-written part, so the helpers keep the data terse:
 * `m` for a member, `t` for a topic. The member kind is derived from the name
 * rather than typed out, because the source index does not record it.
 */

/** Names that are constants rather than properties. */
const CONSTANTS = new Set([
  'Infinity',
  'NaN',
  'undefined',
  'E',
  'LN2',
  'LN10',
  'LOG2E',
  'LOG10E',
  'PI',
  'SQRT1_2',
  'SQRT2',
  'MAX_VALUE',
  'MIN_VALUE',
  'NEGATIVE_INFINITY',
  'POSITIVE_INFINITY',
  'g',
  'i',
  'm',
  's',
  'u',
  'y',
])

/** Topics whose entries are language statements rather than object members. */
const STATEMENT_TOPICS = new Set(['JS Statements'])

/** Topics whose entries are interfaces, i.e. constructor names. */
const INTERFACE_TOPICS = new Set(['DOM Event Objects'])

/**
 * RegExp entries are quantifiers, character classes and escape sequences. They
 * are recognisable because they are punctuation rather than identifiers.
 */
function looksLikeToken(name: string): boolean {
  if (CONSTANTS.has(name)) return false
  if (/^[A-Za-z_$][\w$]*$/.test(name)) return false
  return true
}

export function memberKind(topicLabel: string, name: string): JsMemberKind {
  if (INTERFACE_TOPICS.has(topicLabel)) return 'interface'
  if (STATEMENT_TOPICS.has(topicLabel)) return 'statement'
  if (name.endsWith('()')) return 'method'
  if (CONSTANTS.has(name)) return 'constant'
  if (looksLikeToken(name)) return 'token'
  return 'property'
}

/**
 * A member before its kind has been worked out. The kind follows from the name
 * and the topic, so `t` fills it in rather than it being typed out 857 times.
 */
export type JsMemberDraft = Omit<JsMember, 'kind'>

export function m(name: string, description: string, deprecated?: string): JsMemberDraft {
  return deprecated ? { name, description, deprecated } : { name, description }
}

export function t(
  id: string,
  label: string,
  group: string,
  summary: string,
  usage: string,
  example: { language: EditorLanguage; code: string },
  members: JsMemberDraft[],
): JsTopic {
  // The kind follows from the name and the topic, so it is stamped here rather
  // than typed out beside every description.
  return {
    id,
    label,
    group,
    summary,
    usage,
    example,
    members: members.map((member) => ({ ...member, kind: memberKind(label, member.name) })),
  }
}
