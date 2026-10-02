import type { Project } from '~/types/content'
import { javascriptInteractionProjects } from './javascript-interaction'
import { javascriptDataProjects } from './javascript-data'

/**
 * JavaScript projects, split by the kind of work involved: first you drive the
 * page you already have, then you fetch, persist and reorder state.
 */
export const javascriptProjects: Project[] = [
  ...javascriptInteractionProjects,
  ...javascriptDataProjects,
]
