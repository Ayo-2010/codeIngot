import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { withChapter } from './chapters'
import { jsFoundationsSections } from './js/01-foundations'
import { jsCoreLanguageSections } from './js/02-core-language'
import { jsArraysDatesSections } from './js/03-arrays-dates'
import { jsFlowErrorsSections } from './js/04-flow-errors'
import { jsMechanicsSections } from './js/05-mechanics'
import { jsObjectsPrototypesSections } from './js/06-objects-prototypes'
import { jsFunctionsClassesSections } from './js/07-functions-classes'
import { jsAsyncDomIntroSections } from './js/08-async-dom-intro'
import { jsDomWritesSections } from './js/09-dom-writes'
import { jsDomEventsWindowSections } from './js/10-dom-events-window'
import { jsBomApisSections } from './js/11-bom-apis'
import { jsFetchAjaxSections } from './js/12-fetch-ajax'
import { jsJsonProjectSections } from './js/13-json-project'

export const javascriptFundamentals: Course = {
  id: 'course-javascript',
  slug: 'javascript-fundamentals',
  title: 'JavaScript Fundamentals',
  shortTitle: 'JavaScript',
  description:
    'The language that turns a document into an application. You start with values and the rules that govern them, work through strings, arrays, objects, functions and classes, then reach the browser: the DOM, events, the BOM, storage, fetch and async code. You finish by building a real interactive task tracker.',
  technology: 'javascript',
  category: 'programming',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: [
    'variables',
    'types',
    'operators',
    'conditions',
    'loops',
    'functions',
    'scope',
    'closures',
    'strings',
    'arrays',
    'objects',
    'prototypes',
    'json',
    'dom',
    'events',
    'classes',
    'async',
    'fetch',
    'ajax',
    'storage',
    'debugging',
  ],
  icon: 'JS',
  sections: [
    ...withChapter('Getting started', jsFoundationsSections),
    ...withChapter('Values, types and operators', jsCoreLanguageSections),
    ...withChapter('Arrays, dates and numbers', jsArraysDatesSections),
    ...withChapter('Control flow and errors', jsFlowErrorsSections),
    ...withChapter('Scope, this and classes', jsMechanicsSections),
    ...withChapter('Objects, prototypes and closures', [
      ...jsObjectsPrototypesSections,
      ...jsFunctionsClassesSections,
    ]),
    ...withChapter('Async and the DOM', [...jsAsyncDomIntroSections, ...jsDomWritesSections]),
    ...withChapter('DOM events and the window', jsDomEventsWindowSections),
    ...withChapter('Browser APIs and storage', jsBomApisSections),
    ...withChapter('Fetch, AJAX and workers', jsFetchAjaxSections),
    ...withChapter('JSON, modules and the final project', jsJsonProjectSections),
  ],
  projects: projectsForCourse('javascript-fundamentals'),
}