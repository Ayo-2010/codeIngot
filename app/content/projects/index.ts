import type { Project } from '~/types/content'
import { coreProjects } from './core'
import { htmlProjects } from './html'
import { cssProjects } from './css'
import { javascriptProjects } from './javascript'

/**
 * Every project on the site, in the order the /projects page lists them.
 * Order matters: the page does not sort, and the original five come first.
 */
export const projects: Project[] = [
  ...coreProjects,
  ...htmlProjects,
  ...cssProjects,
  ...javascriptProjects,
]

/**
 * A project can use several technologies, but it belongs to exactly one course:
 * the one whose material it exercises. The original five span the three
 * courses, so this is spelled out rather than inferred.
 */
const COURSE_BY_SLUG: Record<string, string> = {
  'personal-profile-page': 'html-fundamentals',
  'responsive-landing-page': 'html-fundamentals',
  'interactive-calculator': 'javascript-fundamentals',
  'todo-application': 'javascript-fundamentals',
  'quiz-application': 'javascript-fundamentals',
  ...Object.fromEntries(htmlProjects.map((p) => [p.slug, 'html-fundamentals'])),
  ...Object.fromEntries(cssProjects.map((p) => [p.slug, 'css-fundamentals'])),
  ...Object.fromEntries(javascriptProjects.map((p) => [p.slug, 'javascript-fundamentals'])),
}

export function projectsForCourse(courseSlug: string): Project[] {
  return projects.filter((project) => COURSE_BY_SLUG[project.slug] === courseSlug)
}
