import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { reactHomeSections } from './react/01-home'
import { reactComponentsSections } from './react/02-components'
import { reactStateSections } from './react/03-state'
import { reactEventsFormsSections } from './react/04-events-forms'
import { reactAdvancedHooksSections } from './react/05-advanced-hooks'
import { reactRoutingSections } from './react/06-routing'
import { reactPerformanceSections } from './react/07-performance'
import { reactTestingSections } from './react/08-testing'
import { reactProjectSections } from './react/09-project'

export const reactCourse: Course = {
  id: 'course-react',
  slug: 'react',
  title: 'React Fundamentals',
  shortTitle: 'React',
  description:
    'A library for building user interfaces from composable components. You start with JSX and components, work through state, effects and hooks, then add routing, performance, testing, and finish by building a typed dashboard application.',
  technology: 'react',
  category: 'programming',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: [
    'components',
    'jsx',
    'props',
    'state',
    'hooks',
    'context',
    'routing',
    'forms',
    'events',
    'performance',
    'testing',
    'typescript',
    'portals',
    'css',
    'styled-components',
    'sass',
    'accessibility',
    'error-boundaries',
  ],
  icon: '⚛',
  sections: [
    ...reactHomeSections,
    ...reactComponentsSections,
    ...reactStateSections,
    ...reactEventsFormsSections,
    ...reactAdvancedHooksSections,
    ...reactRoutingSections,
    ...reactPerformanceSections,
    ...reactTestingSections,
    ...reactProjectSections,
  ],
  projects: projectsForCourse('react'),
}