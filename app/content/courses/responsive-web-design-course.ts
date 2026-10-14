import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { responsiveWebDesignSections } from './responsive-web-design'

export const responsiveWebDesignCourse: Course = {
  id: 'course-rwd',
  slug: 'responsive-web-design',
  title: 'Responsive Web Design',
  shortTitle: 'RWD',
  description:
    'Build layouts that work on every screen. Fluid grids, flexible images, media queries, and the patterns that make responsive design systematic.',
  technology: 'css',
  category: 'web',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: [
    'viewport',
    'media-queries',
    'breakpoints',
    'fluid-layouts',
    'flexible-images',
    'typography',
    'flexbox',
    'grid',
    'navigation',
    'performance',
    'testing',
  ],
  icon: '< >',
  projects: projectsForCourse('responsive-web-design').map((p) => p.slug),
  sections: responsiveWebDesignSections,
}