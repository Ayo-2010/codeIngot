import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { withChapter } from './chapters'
import { frontendProjectsSections } from './frontend-projects/01-intro'
import { frontendProjectsProfileSections } from './frontend-projects/02-capstone-profile'
import { frontendProjectsLandingSections } from './frontend-projects/03-capstone-landing'
import { frontendProjectsCalculatorSections } from './frontend-projects/04-capstone-calculator'
import { frontendProjectsTodoSections } from './frontend-projects/05-capstone-todo'
import { frontendProjectsQuizSections } from './frontend-projects/06-capstone-quiz'
import { frontendProjectsShipSections } from './frontend-projects/07-ship'

export const frontendProjectsCourse: Course = {
  id: 'course-frontend-projects',
  slug: 'frontend-projects',
  title: 'Frontend Projects',
  shortTitle: 'Projects',
  description:
    'Five guided builds from brief to shipped URL: plan the structure, write mobile-first CSS, add deliberate JavaScript, and finish with a README and a live link. Every build has its own workspace and checklist.',
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
  sections: [
    ...withChapter('Foundations', frontendProjectsSections.slice(0, 1)),
    ...withChapter('Build skills', frontendProjectsSections.slice(1)),
    ...withChapter('Capstone builds', [
      ...frontendProjectsProfileSections,
      ...frontendProjectsLandingSections,
      ...frontendProjectsCalculatorSections,
      ...frontendProjectsTodoSections,
      ...frontendProjectsQuizSections,
    ]),
    ...withChapter('Ship it', frontendProjectsShipSections),
  ],
  projects: projectsForCourse('frontend-projects'),
}
