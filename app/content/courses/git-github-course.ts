import type { Course } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { gitGitHubSections } from './git-github'

export const gitGitHubCourse: Course = {
  id: 'course-git',
  slug: 'git-github',
  title: 'Git & GitHub',
  shortTitle: 'Git',
  description:
    'Master version control. From local commits to team collaboration on GitHub — the workflow every developer uses daily.',
  technology: 'git',
  category: 'web',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: [
    'version-control',
    'repositories',
    'commits',
    'branching',
    'merging',
    'rebasing',
    'remotes',
    'github',
    'pull-requests',
    'workflows',
    'stashing',
    'best-practices',
  ],
  icon: '±',
  projects: projectsForCourse('git-github').map((p) => p.slug),
  sections: gitGitHubSections,
}