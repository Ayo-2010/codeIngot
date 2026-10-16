import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { frontendProjectsSections } from './frontend-projects/01-intro'

export const frontendProjectsCourse: Course = {
  id: 'course-frontend-projects',
  slug: 'frontend-projects',
  title: 'Frontend Projects',
  shortTitle: 'Projects',
  description:
    'Build real applications that combine everything: semantic HTML, responsive CSS, interactive JavaScript, and accessibility. Five projects from a profile page to a data table, each teaching a different skill, each deployable to the web.',
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