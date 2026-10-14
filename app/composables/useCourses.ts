import type {
  Course,
  CourseLessonMeta,
  CourseMeta,
  CourseSectionMeta,
  HtmlTag,
  HtmlAttribute,
  HtmlEventAttribute,
  HtmlGlobalAttribute,
  HtmlTagCategory,
  HtmlCanvasMember,
  CssProperty,
  CssSelector,
  CssFunction,
  CssUnit,
  CssColorName,
  CssColorValue,
  CssEntity,
  CssFontFamily,
  CssAuralProperty,
  JsTopic,
  JsMember,
  LearningPath,
  Lesson,
  Project,
  Quiz,
} from '~/types/content'
import { courseMeta } from '~/content/courses/meta'
import { frontendDeveloper } from '~/content/paths/frontend-developer'
import { challenges } from '~/content/challenges/index'
import { projects } from '~/content/projects/index'

/**
 * A lesson as the catalogue sees it: everything except the lesson
 * body. The body travels with the course module, which `loadCourse`
 * imports on demand, so no page pays for lessons it never opens.
 */
export interface FlatLesson extends CourseLessonMeta {
  courseSlug: string
  courseTitle: string
  sectionId: string
  sectionTitle: string
  index: number
  href: string
}

const allCourses: CourseMeta[] = courseMeta
const allPaths: LearningPath[] = [frontendDeveloper]
const allProjects: Project[] = projects

/** Every course, precomputed lookup maps. Content-only, so it is module scope. */
const courseBySlug = new Map(allCourses.map((course) => [course.slug, course]))
const lessonIndex = new Map<string, FlatLesson & { course: CourseMeta; section: CourseSectionMeta }>()
const lessonPosition = new Map<string, number>()
const lessonOrder: string[] = []
const courseLessonTotals: Record<string, number> = {}

for (const course of allCourses) {
  let index = 0
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
      lessonPosition.set(lesson.id, index)
      lessonOrder.push(lesson.id)
      index += 1
    }
  }
  courseLessonTotals[course.slug] = index
}

/**
 * Course bodies load on demand. The specifiers are static so the
 * bundler splits each course into its own chunk; only the module
 * for the course being read is ever downloaded.
 */
const courseLoaders: Record<string, () => Promise<Course>> = {
  'html-fundamentals': () =>
    import('~/content/courses/html-fundamentals').then((module) => module.htmlFundamentals),
  'css-fundamentals': () =>
    import('~/content/courses/css-fundamentals').then((module) => module.cssFundamentals),
  'javascript-fundamentals': () =>
    import('~/content/courses/javascript-fundamentals').then(
      (module) => module.javascriptFundamentals,
    ),
  'dom-browser-apis': () =>
    import('~/content/courses/dom-browser-apis-course').then((module) => module.domBrowserApisCourse),
  'responsive-web-design': () =>
    import('~/content/courses/responsive-web-design-course').then((module) => module.responsiveWebDesignCourse),
  'git-github': () =>
    import('~/content/courses/git-github-course').then((module) => module.gitGitHubCourse),
}

const loadedCourses = new Map<string, Course>()

// Lazy loaders for reference corpora — each language loads on first use.
const htmlRefPromise = import('~/content/reference/html').then((m) => ({
  tags: m.htmlTags,
  categories: m.htmlTagCategories,
  globalAttributes: m.htmlGlobalAttributes,
}))
const htmlAttrPromise = import('~/content/reference/html-attributes').then((m) => m.htmlAttributes)
const htmlTagPagesPromise = import('~/content/reference/html-tag-pages').then((m) => ({
  pages: m.htmlTagPages,
  findPage: m.findHtmlTagPage,
}))
const htmlEventsPromise = import('~/content/reference/html-events').then((m) => m.htmlEvents)
const htmlNavPromise = import('~/content/reference/html-nav').then((m) => ({
  navItems: m.htmlNavItems,
  tagNavItems: m.htmlTagNavItems,
}))
const htmlCanvasPromise = import('~/content/reference/html-canvas').then((m) => ({
  members: m.htmlCanvasMembers,
  properties: m.htmlCanvasProperties,
}))
const htmlSectionsPromise = import('~/content/reference/html-sections').then((m) => ({
  characterSets: m.htmlCharacterSets,
  colorNames: m.htmlColorNames,
  countryCodes: m.htmlCountryCodes,
  doctypes: m.htmlDoctypes,
  languageCodes: m.htmlLanguageCodes,
  httpMethods: m.httpMethods,
  httpStatuses: m.httpStatuses,
  keyboardShortcuts: m.keyboardShortcuts,
  mediaFormats: m.mediaFormats,
}))

const cssPropertiesPromise = import('~/content/reference/css-properties').then((m) => ({
  properties: m.cssProperties,
  animatable: m.cssAnimatableProperties,
  inherited: m.cssInheritedProperties,
  nonAnimatable: m.cssNonAnimatableProperties,
  categories: m.cssPropertyCategories,
}))
const cssNavPromise = import('~/content/reference/css-nav').then((m) => ({
  navItems: m.cssNavItems,
  propertyNavItems: m.cssPropertyNavItems,
}))
const cssPropertyPagesPromise = import('~/content/reference/css-property-pages').then((m) => ({
  pages: m.cssPropertyPages,
  findPage: m.findCssPropertyPage,
  propertySlug: m.propertySlug,
}))

const cssPropertyPagesSlugPromise = import('~/content/reference/css-property-pages').then((m) => m.propertySlug)
const cssSectionsPromise = import('~/content/reference/css-sections').then((m) => ({
  auralProperties: m.cssAuralProperties,
  colorNames: m.cssColorNames,
  colorValues: m.cssColorValues,
  entities: m.cssEntities,
  fontFallbacks: m.cssFontFallbacks,
  functions: m.cssFunctions,
  selectors: m.cssSelectors,
  units: m.cssUnits,
  webSafeFonts: m.cssWebSafeFonts,
}))

const javascriptPromise = import('~/content/reference/javascript').then((m) => ({
  allMembers: m.allJsMembers,
  topicBySlug: m.javascriptTopicBySlug,
  topicSlug: m.javascriptTopicSlug,
  topics: m.javascriptTopics,
}))
const javascriptNavPromise = import('~/content/reference/javascript-nav').then((m) => m.javascriptNavGroups)

/** Loads a full course body, caching it for the rest of the session. */
export async function loadCourse(slug: string): Promise<Course | undefined> {
  const cached = loadedCourses.get(slug)
  if (cached) return cached
  const loader = courseLoaders[slug]
  if (!loader) return undefined
  const course = await loader()
  loadedCourses.set(slug, course)
  return course
}

/** A lesson body with its content, once the course module is loaded. */
export async function loadLesson(courseSlug: string, lessonId: string): Promise<Lesson | undefined> {
  const course = await loadCourse(courseSlug)
  if (!course) return undefined
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      if (lesson.id === lessonId) return lesson
    }
  }
  return undefined
}

export function useCourses() {
  return { courses: allCourses, paths: allPaths, projects: allProjects }
}

export function allCoursesList(): CourseMeta[] {
  return allCourses
}

export function getCourse(slug: string): CourseMeta | undefined {
  return courseBySlug.get(slug)
}

export function getLesson(courseSlug: string, lessonId: string) {
  const lesson = lessonIndex.get(lessonId)
  if (!lesson || lesson.courseSlug !== courseSlug) return undefined
  return lesson
}

/** Finds a quiz by its own id, across every course. */
export function findQuiz(quizId: string): Quiz | undefined {
  for (const course of allCourses) {
    for (const section of course.sections) {
      if (section.quiz?.id === quizId) return section.quiz
    }
  }
  return undefined
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

export function courseLessons(course: CourseMeta): FlatLesson[] {
  const out: FlatLesson[] = []
  for (const section of course.sections) {
    for (const lesson of section.lessons) {
      out.push(lessonIndex.get(lesson.id) as FlatLesson)
    }
  }
  return out
}

export function nextLesson(lessonId: string) {
  const position = lessonPosition.get(lessonId)
  if (position === undefined) return undefined
  const nextId = lessonOrder[position + 1]
  if (!nextId) return undefined
  return lessonIndex.get(nextId)
}

export function previousLesson(lessonId: string) {
  const position = lessonPosition.get(lessonId)
  if (position === undefined || position <= 0) return undefined
  const previousId = lessonOrder[position - 1]
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
  return allLessonIds().map((id) => lessonIndex.get(id) as FlatLesson)
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

export async function htmlReferenceTags() {
  const { tags } = await htmlRefPromise
  return tags
}

export async function htmlReferenceCategories() {
  const { categories } = await htmlRefPromise
  return categories
}

export async function htmlReferenceGlobalAttributes() {
  const { globalAttributes } = await htmlRefPromise
  return globalAttributes
}

export async function htmlReferenceAttributes() {
  return htmlAttrPromise
}

export async function htmlReferenceEvents() {
  return htmlEventsPromise
}

export async function htmlReferenceNav() {
  const { navItems } = await htmlNavPromise
  return navItems
}

export async function htmlReferenceTagNav() {
  const { tagNavItems } = await htmlNavPromise
  return tagNavItems
}

export async function htmlReferenceTagPages() {
  const { pages } = await htmlTagPagesPromise
  return pages
}

export async function htmlReferenceTagPage(slug: string) {
  const { findPage } = await htmlTagPagesPromise
  return findPage(slug)
}

export async function htmlReferenceColorNames() {
  const { colorNames } = await htmlSectionsPromise
  return colorNames
}

export async function htmlReferenceCharacterSets() {
  const { characterSets } = await htmlSectionsPromise
  return characterSets
}

export async function htmlReferenceDoctypes() {
  const { doctypes } = await htmlSectionsPromise
  return doctypes
}

export async function htmlReferenceLanguageCodes() {
  const { languageCodes } = await htmlSectionsPromise
  return languageCodes
}

export async function htmlReferenceCountryCodes() {
  const { countryCodes } = await htmlSectionsPromise
  return countryCodes
}

export async function htmlReferenceHttpStatuses() {
  const { httpStatuses } = await htmlSectionsPromise
  return httpStatuses
}

export async function htmlReferenceHttpMethods() {
  const { httpMethods } = await htmlSectionsPromise
  return httpMethods
}

export async function htmlReferenceCanvas() {
  return htmlCanvasPromise
}

export async function htmlReferenceMediaFormats() {
  const { mediaFormats } = await htmlSectionsPromise
  return mediaFormats
}

export async function htmlReferenceKeyboardShortcuts() {
  const { keyboardShortcuts } = await htmlSectionsPromise
  return keyboardShortcuts
}

export async function cssReferenceProperties() {
  const { properties } = await cssPropertiesPromise
  return properties
}

export async function cssReferenceNav() {
  const { navItems } = await cssNavPromise
  return navItems
}

export async function cssReferencePropertyNav() {
  const { propertyNavItems } = await cssNavPromise
  return propertyNavItems
}

export async function cssReferencePropertyPages() {
  const { pages } = await cssPropertyPagesPromise
  return pages
}

export async function cssReferencePropertyPage(slug: string) {
  const { findPage } = await cssPropertyPagesPromise
  return findPage(slug)
}

export async function cssReferenceSelectors() {
  const { selectors } = await cssSectionsPromise
  return selectors
}

export async function cssReferenceFunctions() {
  const { functions } = await cssSectionsPromise
  return functions
}

export async function cssReferenceUnits() {
  const { units } = await cssSectionsPromise
  return units
}

export async function cssReferenceColorNames() {
  const { colorNames } = await cssSectionsPromise
  return colorNames
}

export async function cssReferenceColorValues() {
  const { colorValues } = await cssSectionsPromise
  return colorValues
}

export async function cssReferenceWebSafeFonts() {
  const { webSafeFonts } = await cssSectionsPromise
  return webSafeFonts
}

export async function cssReferenceFontFallbacks() {
  const { fontFallbacks } = await cssSectionsPromise
  return fontFallbacks
}

export async function cssReferenceEntities() {
  const { entities } = await cssSectionsPromise
  return entities
}

export async function cssReferenceAuralProperties() {
  const { auralProperties } = await cssSectionsPromise
  return auralProperties
}

export async function cssReferenceAnimatable() {
  const { animatable, nonAnimatable } = await cssPropertiesPromise
  return { animatable: animatable(), static: nonAnimatable() }
}

export async function cssReferenceInherited() {
  const { inherited } = await cssPropertiesPromise
  return inherited()
}

/**
 * The category groups shown on the CSS overview. Each links to its first
 * property, so the overview needs no route of its own per category.
 */
export async function cssReferenceCategories() {
  const { properties, categories } = await cssPropertiesPromise
  const groups = []
  for (const category of categories) {
    const members = properties.filter((property) => property.category === category)
    if (members.length > 0) {
      const firstSlug = await cssReferencePropertySlug(members[0]!.name)
      groups.push({ category, count: members.length, firstSlug })
    }
  }
  return groups
}

export async function cssReferencePropertySlug(name: string) {
  const { propertySlug: slugFn } = await cssPropertyPagesPromise
  return slugFn(name)
}

export async function javascriptReferenceTopics() {
  const { topics } = await javascriptPromise
  return topics
}

export async function javascriptReferenceTopicBySlug(slug: string) {
  const { topicBySlug } = await javascriptPromise
  return topicBySlug(slug)
}

export async function javascriptReferenceTopicSlug(label: string) {
  const { topicSlug } = await javascriptPromise
  return topicSlug(label)
}

/** Every member in the reference, paired with the topic it belongs to. */
export async function javascriptReferenceMembers() {
  const { allMembers } = await javascriptPromise
  return allMembers
}

/** The sidebar groups, which keep the source index headings and their order. */
export async function javascriptReferenceNavGroups() {
  return javascriptNavPromise
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
    blurb: 'The built-in objects, the DOM, the browser APIs and every member, with what it is for.',
  },
]

export interface CourseStats {
  lessons: number
  challenges: number
  quizzes: number
  projects: number
  minutes: number
}

export function courseStats(course: CourseMeta): CourseStats {
  let lessons = 0
  let challenges = 0
  let minutes = 0
  let quizzes = 0
  for (const section of course.sections) {
    if (section.quiz) quizzes += 1
    for (const lesson of section.lessons) {
      lessons += 1
      minutes += lesson.duration
      if (lesson.exerciseCount > 0) challenges += 1
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
