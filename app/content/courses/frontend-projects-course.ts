import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { frontendProjectsSections } from './frontend-projects/01-intro'

export const frontendProjectsCourse: Course = {
  id: 'course-frontend-projects',
  slug: 'frontend-projects',
  title: 'Frontend Projects',
  shortTitle: 'Projects',
  description:
    'Take a page from brief to built: plan the structure, write mobile-first responsive CSS, and make every control work for keyboard and screen-reader users. Every lesson ends in a checkpoint you can test.',
  technology: 'html',
  category: 'projects',
  type: 'course',
  difficulty: 'beginner',
  badges: ['project', 'popular'],
  topics: [
    'project-planning',
    'semantic-html',
    'responsive-design',
    'accessibility',
    'forms',
    'layout',
    'deployment',
  ],
  icon: '◆',
  sections: [...frontendProjectsSections],
  projects: projectsForCourse('frontend-projects'),
}