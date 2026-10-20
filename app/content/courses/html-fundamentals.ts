import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { withChapter } from './chapters'
import { htmlIntroSections } from './html/01-intro'
import { htmlElementsSections } from './html/02-elements-attributes'
import { htmlColorSections } from './html/03-colors'
import { htmlCssSections } from './html/04-css-in-html'
import { htmlLinkSections } from './html/05-links'
import { htmlImageSections } from './html/06-images'
import { htmlTableSections } from './html/07-tables-lists'
import { htmlStructureSections } from './html/08-structure'
import { htmlMetaSections } from './html/09-meta'
import { htmlSemanticsSections } from './html/10-semantics'
import { htmlCharacterSections } from './html/11-characters'
import { htmlFormSections } from './html/12-forms'
import { htmlGraphicsSections, htmlMediaSections } from './html/13-graphics-media'
import { htmlApiSections } from './html/14-apis'
import { htmlClosingSections } from './html/15-summary-accessibility'

export const htmlFundamentals: Course = {
  id: 'course-html',
  slug: 'html-fundamentals',
  title: 'HTML Fundamentals',
  shortTitle: 'HTML',
  description:
    'Build the structure of the web from scratch. Every element you write here becomes a node the browser, the CSS engine and screen readers all have to agree on.',
  technology: 'html',
  category: 'web',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: [
    'structure',
    'text',
    'links',
    'images',
    'media',
    'tables',
    'lists',
    'forms',
    'semantics',
    'accessibility',
  ],
  icon: '<>',
  sections: [
    ...withChapter('Getting started', htmlIntroSections),
    ...withChapter('Elements, attributes and text', htmlElementsSections),
    ...withChapter('Colour', htmlColorSections),
    ...withChapter('Stylesheets, links and images', [
      ...htmlCssSections,
      ...htmlLinkSections,
      ...htmlImageSections,
    ]),
    ...withChapter('Tables and lists', htmlTableSections),
    ...withChapter('Blocks, classes and the document head', [
      ...htmlStructureSections,
      ...htmlMetaSections,
    ]),
    ...withChapter('Semantics and characters', [...htmlSemanticsSections, ...htmlCharacterSections]),
    ...withChapter('Forms', htmlFormSections),
    ...withChapter('Graphics and media', [...htmlGraphicsSections, ...htmlMediaSections]),
    ...withChapter('Browser APIs, accessibility and wrap-up', [
      ...htmlApiSections,
      ...htmlClosingSections,
    ]),
  ],
  projects: projectsForCourse('html-fundamentals'),
}