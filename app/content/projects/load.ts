import type { Project, ProjectGroup } from '~/types/content'
import { projectSummaries } from './meta'

/**
 * Full project bodies live behind these loaders. The summary catalogue is
 * enough for cards, search and course pages; only the workspace, the design
 * reference and the full project list need the briefs and starter files.
 */
const loaders: Record<ProjectGroup, () => Promise<Project[]>> = {
  core: () => import('./core').then((module) => module.coreProjects),
  html: () => import('./html').then((module) => module.htmlProjects),
  css: () => import('./css').then((module) => module.cssProjects),
  javascript: () => import('./javascript').then((module) => module.javascriptProjects),
  typescript: () => import('./typescript').then((module) => module.typescriptProjects),
  react: () => import('./react').then((module) => module.reactProjects),
}

const loaded = new Map<string, Project>()

/** One project, from the module group that owns it. */
export async function loadProject(slug: string): Promise<Project | undefined> {
  const cached = loaded.get(slug)
  if (cached) return cached
  const summary = projectSummaries.find((project) => project.slug === slug)
  if (!summary) return undefined
  const loader = loaders[summary.group]
  if (!loader) return undefined
  const projects = await loader()
  const project = projects.find((entry) => entry.slug === slug)
  if (project) loaded.set(slug, project)
  return project
}

/** The full project list, in catalogue order, for the projects index. */
export async function loadAllProjects(): Promise<Project[]> {
  const groups = await Promise.all(
    (Object.keys(loaders) as ProjectGroup[]).map((group) => loaders[group]!()),
  )
  return groups.flat()
}
