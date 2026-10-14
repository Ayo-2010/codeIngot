import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { domBrowserApisSections } from './dom-browser-apis'

export const domBrowserApisCourse: Course = {
  id: 'course-dom',
  slug: 'dom-browser-apis',
  title: 'DOM & Browser APIs',
  shortTitle: 'DOM',
  description:
    'Manipulate the page, respond to events, and use the browser APIs that power modern web applications — all without a framework.',
  technology: 'javascript',
  category: 'web',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: [
    'dom-tree',
    'selection',
    'traversal',
    'manipulation',
    'attributes',
    'styles',
    'events',
    'bom',
    'storage',
    'fetch',
    'web-apis',
    'canvas',
    'svg',
  ],
  icon: '{ }',
  projects: projectsForCourse('dom-browser-apis').map((p) => p.slug),
  sections: domBrowserApisSections,
}