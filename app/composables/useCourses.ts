import type { Course, LearningPath, Lesson, Project, Section } from '~/types/content'
import { htmlFundamentals } from '~/content/courses/html-fundamentals'
import { cssFundamentals } from '~/content/courses/css-fundamentals'
import { javascriptFundamentals } from '~/content/courses/javascript-fundamentals'
import { frontendDeveloper } from '~/content/paths/frontend-developer'
import { challenges } from '~/content/challenges/index'
import { projects } from '~/content/projects/index'
import { referenceEntries } from '~/content/reference/index'
import { htmlGlobalAttributes, htmlTagCategories, htmlTags } from '~/content/reference/html'
import { htmlAttributes } from '~/content/reference/html-attributes'
import { htmlTagPages, findHtmlTagPage } from '~/content/reference/html-tag-pages'
import { htmlEvents } from '~/content/reference/html-events'
import { htmlNavItems, htmlTagNavItems } from '~/content/reference/html-nav'
import {
  cssAnimatableProperties,
  cssInheritedProperties,
  cssNonAnimatableProperties,
  cssProperties,
  cssPropertyCategories,
} from '~/content/reference/css-properties'
import { cssNavItems, cssPropertyNavItems } from '~/content/reference/css-nav'
import { cssPropertyPages, findCssPropertyPage, propertySlug } from '~/content/reference/css-property-pages'
import {
  cssAuralProperties,
  cssColorNames,
  cssColorValues,
  cssEntities,
  cssFontFallbacks,
  cssFunctions,
  cssSelectors,
  cssUnits,
  cssWebSafeFonts,
} from '~/content/reference/css-sections'
import { htmlCanvasMembers, htmlCanvasProperties } from '~/content/reference/html-canvas'
import {
  htmlCharacterSets,
  htmlColorNames,
  htmlCountryCodes,
  htmlDoctypes,
  htmlLanguageCodes,
  httpMethods,
  httpStatuses,
  keyboardShortcuts,
  mediaFormats,
} from '~/content/reference/html-sections'

export interface FlatLesson extends Lesson {
  courseSlug: string
  courseTitle: string
  sectionId: string
  sectionTitle: string
  index: number
  href: string
}

const allCourses: Course[] = [htmlFundamentals, cssFundamentals, javascriptFundamentals]
const allPaths: LearningPath[] = [frontendDeveloper]
const allProjects: Project[] = projects

/** Every course, precomputed lookup maps. Content-only, so it is module scope. */
const courseBySlug = new Map(allCourses.map((course) => [course.slug, course]))
const lessonIndex = new Map<string, FlatLesson & { course: Course; section: Section }>()
const lessonOrder: string[] = []
const courseLessonTotals: Record<string, number> = {}

for (const course of allCourses) {
  let index = 0
  const lessons: string[] = []
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      lessonIndex.set(lesson.id, {
        ...lesson,
        courseSlug: course.slug,
        courseTitle: course.title,
        sectionId: section.id,
        sectionTitle: section.title,
        index,
        href: `/learn/${course.slug}/${lesson.id}`,
        course,
        section,
      })
      lessonOrder.push(lesson.id)
      lessons.push(lesson.id)
      index += 1
    }
  }
  courseLessonTotals[course.slug] = lessons.length
}

export function useCourses() {
  return { courses: allCourses, paths: allPaths, projects: allProjects }
}

export function allCoursesList(): Course[] {
  return allCourses
}

export function getCourse(slug: string): Course | undefined {
  return courseBySlug.get(slug)
}

export function getLesson(courseSlug: string, lessonId: string) {
  const lesson = lessonIndex.get(lessonId)
  if (!lesson || lesson.courseSlug !== courseSlug) return undefined
  return lesson
}

export function getQuizById(courseSlug: string, quizId: string) {
  const course = courseBySlug.get(courseSlug)
  if (!course) return undefined
  for (const section of course.sections) {
    if (section.quiz?.id === quizId) return section.quiz
  }
  return undefined
}

export function getQuizSection(courseSlug: string, quizId: string) {
  const course = courseBySlug.get(courseSlug)
  if (!course) return undefined
  for (const section of course.sections) {
    if (section.quiz?.id === quizId) return section
  }
  return undefined
}

export function getLessonById(lessonId: string) {
  return lessonIndex.get(lessonId)
}

export function courseLessons(course: Course): FlatLesson[] {
  const out: FlatLesson[] = []
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      out.push(lessonIndex.get(lesson.id) as FlatLesson)
    }
  }
  return out
}

export function nextLesson(lessonId: string) {
  const index = lessonOrder.indexOf(lessonId)
  const nextId = lessonOrder[index + 1]
  if (!nextId) return undefined
  return lessonIndex.get(nextId)
}

export function previousLesson(lessonId: string) {
  const index = lessonOrder.indexOf(lessonId)
  if (index <= 0) return undefined
  const previousId = lessonOrder[index - 1]
  if (!previousId) return undefined
  return lessonIndex.get(previousId)
}

export function lessonTotalsFor(courseSlug: string): number {
  return courseLessonTotals[courseSlug] ?? 0
}

export function allLessonIds(): string[] {
  return lessonOrder
}

export function allLessonFlat(): FlatLesson[] {
  return lessonOrder.map((id) => lessonIndex.get(id) as FlatLesson)
}

export function getPath(slug: string): LearningPath | undefined {
  return allPaths.find((path) => path.slug === slug)
}

export function allPathsList(): LearningPath[] {
  return allPaths
}

export function getChallenge(slug: string) {
  return challenges.find((challenge) => challenge.slug === slug)
}

export function getProject(slug: string) {
  return allProjects.find((project) => project.slug === slug)
}

export function allChallenges() {
  return challenges
}

export function allProjectsList() {
  return allProjects
}

export function allReferenceEntries() {
  return referenceEntries
}

export function htmlReferenceTags() {
  return htmlTags
}

export function htmlReferenceCategories() {
  return htmlTagCategories
}

export function htmlReferenceGlobalAttributes() {
  return htmlGlobalAttributes
}

export function htmlReferenceAttributes() {
  return htmlAttributes
}

export function htmlReferenceEvents() {
  return htmlEvents
}

export function htmlReferenceNav() {
  return htmlNavItems
}

export function htmlReferenceTagNav() {
  return htmlTagNavItems
}

export function htmlReferenceTagPages() {
  return htmlTagPages
}

export function htmlReferenceTagPage(slug: string) {
  return findHtmlTagPage(slug)
}

export function htmlReferenceColorNames() {
  return htmlColorNames
}

export function htmlReferenceCharacterSets() {
  return htmlCharacterSets
}

export function htmlReferenceDoctypes() {
  return htmlDoctypes
}

export function htmlReferenceLanguageCodes() {
  return htmlLanguageCodes
}

export function htmlReferenceCountryCodes() {
  return htmlCountryCodes
}

export function htmlReferenceHttpStatuses() {
  return httpStatuses
}

export function htmlReferenceHttpMethods() {
  return httpMethods
}

export function htmlReferenceCanvas() {
  return { members: htmlCanvasMembers, properties: htmlCanvasProperties }
}

export function htmlReferenceMediaFormats() {
  return mediaFormats
}

export function htmlReferenceKeyboardShortcuts() {
  return keyboardShortcuts
}

export function cssReferenceProperties() {
  return cssProperties
}

export function cssReferenceNav() {
  return cssNavItems
}

export function cssReferencePropertyNav() {
  return cssPropertyNavItems
}

export function cssReferencePropertyPages() {
  return cssPropertyPages
}

export function cssReferencePropertyPage(slug: string) {
  return findCssPropertyPage(slug)
}

export function cssReferenceSelectors() {
  return cssSelectors
}

export function cssReferenceFunctions() {
  return cssFunctions
}

export function cssReferenceUnits() {
  return cssUnits
}

export function cssReferenceColorNames() {
  return cssColorNames
}

export function cssReferenceColorValues() {
  return cssColorValues
}

export function cssReferenceWebSafeFonts() {
  return cssWebSafeFonts
}

export function cssReferenceFontFallbacks() {
  return cssFontFallbacks
}

export function cssReferenceEntities() {
  return cssEntities
}

export function cssReferenceAuralProperties() {
  return cssAuralProperties
}

export function cssReferenceAnimatable() {
  return { animatable: cssAnimatableProperties(), static: cssNonAnimatableProperties() }
}

export function cssReferenceInherited() {
  return cssInheritedProperties()
}

/**
 * The category groups shown on the CSS overview. Each links to its first
 * property, so the overview needs no route of its own per category.
 */
export function cssReferenceCategories() {
  return cssPropertyCategories
    .map((category) => {
      const members = cssProperties.filter((property) => property.category === category)
      return {
        category,
        count: members.length,
        firstSlug: members.length ? propertySlug(members[0]!.name) : '',
      }
    })
    .filter((group) => group.count > 0)
}

export function cssReferencePropertySlug(name: string) {
  return propertySlug(name)
}

/**
 * The language subpages the reference index links to. Adding CSS or JavaScript
 * means adding an entry here and building the matching page.
 */
export const referenceLanguages = [
  {
    value: 'html' as const,
    label: 'HTML',
    to: '/reference/html',
    blurb: 'Every element, what it is for, and the attributes that belong to it.',
  },
  {
    value: 'css' as const,
    label: 'CSS',
    to: '/reference/css',
    blurb: 'Properties, selectors, functions and units, with the syntax and first-support version for each.',
  },
  {
    value: 'javascript' as const,
    label: 'JavaScript',
    to: '/reference/javascript',
    blurb: 'Built-in objects, the DOM and the browser APIs.',
  },
]

export interface CourseStats {
  lessons: number
  challenges: number
  quizzes: number
  projects: number
  minutes: number
}

export function courseStats(course: Course): CourseStats {
  let lessons = 0
  let challenges = 0
  let minutes = 0
  let quizzes = 0
  for (const section of course.sections) {
    if (section.quiz) quizzes += 1
    for (const lesson of section.lessons) {
      lessons += 1
      minutes += lesson.duration
      if (lesson.content.some((block) => block.type === 'exercise')) challenges += 1
    }
  }
  return { lessons, challenges, quizzes, projects: course.projects.length, minutes }
}

export function totalContentStats() {
  return allCourses.reduce(
    (acc, course) => {
      const stats = courseStats(course)
      return {
        lessons: acc.lessons + stats.lessons,
        challenges: acc.challenges + stats.challenges,
        projects: acc.projects + stats.projects,
        quizzes: acc.quizzes + stats.quizzes,
        minutes: acc.minutes + stats.minutes,
      }
    },
    { lessons: 0, challenges: 0, projects: 0, quizzes: 0, minutes: 0 },
  )
}