import type { Project } from '~/types/content'
import { coreProjects } from './core'
import { htmlProjects } from './html'
import { cssProjects } from './css'
import { javascriptProjects } from './javascript'
import { typescriptProjects } from './typescript'
import { reactProjects } from './react'

/**
 * Every project on the site, in the order the /projects page lists them.
 * Order matters: the page does not sort, and the original five come first.
 */
export const projects: Project[] = [
  ...coreProjects,
  ...htmlProjects,
  ...cssProjects,
  ...javascriptProjects,
  ...typescriptProjects,
  ...reactProjects,
]

/**
 * A project can use several technologies, but it normally belongs to exactly one
 * course: the one whose material it exercises. The original five span the three
 * courses, so this is spelled out rather than inferred.
 *
 * The original five are also the capstone builds for Frontend Projects. Rather
 * than moving them (and stripping the HTML and JavaScript courses of their
 * projects), the capstone course claims the same projects in addition to the
 * course that teaches their material.
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
  ...Object.fromEntries(typescriptProjects.map((p) => [p.slug, 'typescript'])),
  ...Object.fromEntries(reactProjects.map((p) => [p.slug, 'react'])),
}

const CAPSTONE_COURSE = 'frontend-projects'
const capstoneSlugs = new Set(coreProjects.map((project) => project.slug))

export function projectsForCourse(courseSlug: string): Project[] {
  return projects.filter(
    (project) =>
      COURSE_BY_SLUG[project.slug] === courseSlug ||
      (courseSlug === CAPSTONE_COURSE && capstoneSlugs.has(project.slug)),
  )
}
