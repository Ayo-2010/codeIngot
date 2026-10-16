import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { tsHomeSections } from './ts/01-home'
import { tsBasicsSections } from './ts/02-basics'
import { tsFunctionsSections } from './ts/03-functions'
import { tsInterfacesSections } from './ts/04-interfaces'
import { tsGenericsSections } from './ts/05-generics'
import { tsUtilitySections } from './ts/06-utilities'
import { tsAdvancedSections } from './ts/07-advanced'
import { tsModulesSections } from './ts/08-modules'
import { tsConfigSections } from './ts/09-config'
import { tsProjectSections } from './ts/10-project'

export const typescriptFundamentals: Course = {
  id: 'course-typescript',
  slug: 'typescript',
  title: 'TypeScript Fundamentals',
  shortTitle: 'TypeScript',
  description:
    'TypeScript adds static types to JavaScript, catching bugs before they reach the browser. You start with the type system basics, learn how to annotate and infer, then build real-world patterns: interfaces, generics, utility types, and configuration. You finish with a typed task tracker that scales.',
  technology: 'typescript',
  category: 'programming',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: [
    'variables',
    'types',
    'type-inference',
    'interfaces',
    'generics',
    'utility-types',
    'strict-mode',
    'tsconfig',
    'modules',
    'declaration-files',
  ],
  icon: 'TS',
  sections: [
    ...tsHomeSections,
    ...tsBasicsSections,
    ...tsFunctionsSections,
    ...tsInterfacesSections,
    ...tsGenericsSections,
    ...tsUtilitySections,
    ...tsAdvancedSections,
    ...tsModulesSections,
    ...tsConfigSections,
    ...tsProjectSections,
  ],
  projects: projectsForCourse('typescript'),
}