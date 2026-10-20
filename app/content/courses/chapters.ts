import type { Section } from '~/types/content'

/**
 * Tags a module's sections with the chapter they belong to.
 *
 * The HTML, CSS and JavaScript courses were authored as one section per lesson,
 * so the catalogue and sidebar showed 66-81 headings. Grouping them into
 * chapters is a presentation change: the sections keep their ids, lessons,
 * quizzes and order. That matters because every section owns a quiz, so merging
 * sections would delete quizzes; tagging them deletes nothing.
 *
 * Chapters must stay contiguous in the `sections` array. Reordering a section
 * into a different chapter would silently change the lesson sequence and the
 * prev/next chain, so the grouping is applied at the point the course composes
 * its sections rather than by filtering them later.
 */
export function withChapter(title: string, sections: readonly Section[]): Section[] {
  return sections.map((section) => ({ ...section, chapter: title }))
}
