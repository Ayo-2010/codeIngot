import type {
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
  ProjectSummary,
  Quiz,
  QuizSummary,
} from '~/types/content'
import { courseMeta } from '~/content/courses/meta'
import { loadSection } from '~/content/courses/section-loaders'
import { frontendDeveloper } from '~/content/paths/frontend-developer'
import { challenges } from '~/content/challenges/index'
import { projectSummaries } from '~/content/projects/meta'

/**
 * A lesson as the catalogue sees it: everything except the lesson body. The
 * body travels with its section module, which `loadLesson` imports on demand,
 * so no page pays for lessons it never opens.
 */
export interface FlatLesson extends CourseLessonMeta {
  courseSlug: string
  courseTitle: string
  sectionId: string
  sectionTitle: string
  index: number
  href: string
}

/**
 * A contiguous run of sections presented as one chapter.
 *
 * The three original courses were authored as one section per lesson; grouping
 * them at the point of display keeps every section intact while giving the
 * catalogue and sidebar a readable outline.
 */
export interface CourseChapter {
  id: string
  title: string
  sections: CourseSectionMeta[]
  lessons: number
  /** The section description, when the chapter is exactly one section. */
  description?: string
}

const allCourses: CourseMeta[] = courseMeta
const allPaths: LearningPath[] = [frontendDeveloper]
const allProjects: ProjectSummary[] = projectSummaries

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
 * Lazy loaders for reference corpora.
 *
 * These used to be module-level `import()` calls. That looks lazy, but the
 * promise is created as soon as the catalogue module is evaluated, so visiting
 * the home page started downloading the whole HTML, CSS and JavaScript
 * reference. Returning the promise from a function defers the import until a
 * reference page actually asks for it, and the null check keeps it shared.
 */
let htmlRefPromise: Promise<{
  tags: typeof import('~/content/reference/html').htmlTags
  categories: typeof import('~/content/reference/html').htmlTagCategories
  globalAttributes: typeof import('~/content/reference/html').htmlGlobalAttributes
}> | null = null
function getHtmlReference() {
  return (htmlRefPromise ??= import('~/content/reference/html').then((m) => ({
    tags: m.htmlTags,
    categories: m.htmlTagCategories,
    globalAttributes: m.htmlGlobalAttributes,
  })))
}

let htmlAttrPromise: Promise<typeof import('~/content/reference/html-attributes').htmlAttributes> | null = null
function getHtmlAttributes() {
  return (htmlAttrPromise ??= import('~/content/reference/html-attributes').then((m) => m.htmlAttributes))
}

let htmlTagPagesPromise: Promise<{
  pages: typeof import('~/content/reference/html-tag-pages').htmlTagPages
  findPage: typeof import('~/content/reference/html-tag-pages').findHtmlTagPage
}> | null = null
function getHtmlTagPages() {
  return (htmlTagPagesPromise ??= import('~/content/reference/html-tag-pages').then((m) => ({
    pages: m.htmlTagPages,
    findPage: m.findHtmlTagPage,
  })))
}

let htmlEventsPromise: Promise<typeof import('~/content/reference/html-events').htmlEvents> | null = null
function getHtmlEvents() {
  return (htmlEventsPromise ??= import('~/content/reference/html-events').then((m) => m.htmlEvents))
}

let htmlNavPromise: Promise<{
  navItems: typeof import('~/content/reference/html-nav').htmlNavItems
  tagNavItems: typeof import('~/content/reference/html-nav').htmlTagNavItems
}> | null = null
function getHtmlNav() {
  return (htmlNavPromise ??= import('~/content/reference/html-nav').then((m) => ({
    navItems: m.htmlNavItems,
    tagNavItems: m.htmlTagNavItems,
  })))
}

let htmlCanvasPromise: Promise<{
  members: typeof import('~/content/reference/html-canvas').htmlCanvasMembers
  properties: typeof import('~/content/reference/html-canvas').htmlCanvasProperties
}> | null = null
function getHtmlCanvas() {
  return (htmlCanvasPromise ??= import('~/content/reference/html-canvas').then((m) => ({
    members: m.htmlCanvasMembers,
    properties: m.htmlCanvasProperties,
  })))
}

let htmlSectionsPromise: Promise<{
  characterSets: typeof import('~/content/reference/html-sections').htmlCharacterSets
  colorNames: typeof import('~/content/reference/html-sections').htmlColorNames
  countryCodes: typeof import('~/content/reference/html-sections').htmlCountryCodes
  doctypes: typeof import('~/content/reference/html-sections').htmlDoctypes
  languageCodes: typeof import('~/content/reference/html-sections').htmlLanguageCodes
  httpMethods: typeof import('~/content/reference/html-sections').httpMethods
  httpStatuses: typeof import('~/content/reference/html-sections').httpStatuses
  keyboardShortcuts: typeof import('~/content/reference/html-sections').keyboardShortcuts
  mediaFormats: typeof import('~/content/reference/html-sections').mediaFormats
}> | null = null
function getHtmlSections() {
  return (htmlSectionsPromise ??= import('~/content/reference/html-sections').then((m) => ({
    characterSets: m.htmlCharacterSets,
    colorNames: m.htmlColorNames,
    countryCodes: m.htmlCountryCodes,
    doctypes: m.htmlDoctypes,
    languageCodes: m.htmlLanguageCodes,
    httpMethods: m.httpMethods,
    httpStatuses: m.httpStatuses,
    keyboardShortcuts: m.keyboardShortcuts,
    mediaFormats: m.mediaFormats,
  })))
}

let cssPropertiesPromise: Promise<{
  properties: typeof import('~/content/reference/css-properties').cssProperties
  animatable: typeof import('~/content/reference/css-properties').cssAnimatableProperties
  inherited: typeof import('~/content/reference/css-properties').cssInheritedProperties
  nonAnimatable: typeof import('~/content/reference/css-properties').cssNonAnimatableProperties
  categories: typeof import('~/content/reference/css-properties').cssPropertyCategories
}> | null = null
function getCssProperties() {
  return (cssPropertiesPromise ??= import('~/content/reference/css-properties').then((m) => ({
    properties: m.cssProperties,
    animatable: m.cssAnimatableProperties,
    inherited: m.cssInheritedProperties,
    nonAnimatable: m.cssNonAnimatableProperties,
    categories: m.cssPropertyCategories,
  })))
}

let cssNavPromise: Promise<{
  navItems: typeof import('~/content/reference/css-nav').cssNavItems
  propertyNavItems: typeof import('~/content/reference/css-nav').cssPropertyNavItems
}> | null = null
function getCssNav() {
  return (cssNavPromise ??= import('~/content/reference/css-nav').then((m) => ({
    navItems: m.cssNavItems,
    propertyNavItems: m.cssPropertyNavItems,
  })))
}

let cssPropertyPagesPromise: Promise<{
  pages: typeof import('~/content/reference/css-property-pages').cssPropertyPages
  findPage: typeof import('~/content/reference/css-property-pages').findCssPropertyPage
  propertySlug: typeof import('~/content/reference/css-property-pages').propertySlug
}> | null = null
function getCssPropertyPages() {
  return (cssPropertyPagesPromise ??= import('~/content/reference/css-property-pages').then((m) => ({
    pages: m.cssPropertyPages,
    findPage: m.findCssPropertyPage,
    propertySlug: m.propertySlug,
  })))
}

let cssSectionsPromise: Promise<{
  auralProperties: typeof import('~/content/reference/css-sections').cssAuralProperties
  colorNames: typeof import('~/content/reference/css-sections').cssColorNames
  colorValues: typeof import('~/content/reference/css-sections').cssColorValues
  entities: typeof import('~/content/reference/css-sections').cssEntities
  fontFallbacks: typeof import('~/content/reference/css-sections').cssFontFallbacks
  functions: typeof import('~/content/reference/css-sections').cssFunctions
  selectors: typeof import('~/content/reference/css-sections').cssSelectors
  units: typeof import('~/content/reference/css-sections').cssUnits
  webSafeFonts: typeof import('~/content/reference/css-sections').cssWebSafeFonts
}> | null = null
function getCssSections() {
  return (cssSectionsPromise ??= import('~/content/reference/css-sections').then((m) => ({
    auralProperties: m.cssAuralProperties,
    colorNames: m.cssColorNames,
    colorValues: m.cssColorValues,
    entities: m.cssEntities,
    fontFallbacks: m.cssFontFallbacks,
    functions: m.cssFunctions,
    selectors: m.cssSelectors,
    units: m.cssUnits,
    webSafeFonts: m.cssWebSafeFonts,
  })))
}

let javascriptPromise: Promise<{
  allMembers: typeof import('~/content/reference/javascript').allJsMembers
  topicBySlug: typeof import('~/content/reference/javascript').javascriptTopicBySlug
  topicSlug: typeof import('~/content/reference/javascript').javascriptTopicSlug
  topics: typeof import('~/content/reference/javascript').javascriptTopics
}> | null = null
function getJavascriptReference() {
  return (javascriptPromise ??= import('~/content/reference/javascript').then((m) => ({
    allMembers: m.allJsMembers,
    topicBySlug: m.javascriptTopicBySlug,
    topicSlug: m.javascriptTopicSlug,
    topics: m.javascriptTopics,
  })))
}

let javascriptNavPromise: Promise<typeof import('~/content/reference/javascript-nav').javascriptNavGroups> | null = null
function getJavascriptNav() {
  return (javascriptNavPromise ??= import('~/content/reference/javascript-nav').then(
    (m) => m.javascriptNavGroups,
  ))
}

/**
 * A lesson body with its content. The catalogue already knows which section
 * owns the lesson, so only that section module is imported, never the whole
 * course.
 */
export async function loadLesson(courseSlug: string, lessonId: string): Promise<Lesson | undefined> {
  const current = lessonIndex.get(lessonId)
  if (!current || current.courseSlug !== courseSlug) return undefined
  const section = await loadSection(current.sectionId)
  return section?.lessons.find((lesson) => lesson.id === lessonId)
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

/**
 * Groups a course's sections into chapters.
 *
 * A chapter is a contiguous run of sections sharing a `chapter` tag. Courses
 * authored with real multi-lesson sections carry no tag, so each section
 * becomes its own chapter and their pages look exactly as they did before.
 */
export function courseChapters(course: CourseMeta): CourseChapter[] {
  const chapters: CourseChapter[] = []
  for (const section of course.sections) {
    const last = chapters[chapters.length - 1]
    if (section.chapter && last && last.title === section.chapter) {
      last.sections.push(section)
      last.lessons += section.lessons.length
      // Two sections in one chapter no longer share a single description.
      last.description = undefined
      continue
    }
    chapters.push({
      id: `chapter-${section.id}`,
      title: section.chapter ?? section.title,
      sections: [section],
      lessons: section.lessons.length,
      description: section.description,
    })
  }
  return chapters
}

/** Finds a lesson quiz summary by its own id, across every course. */
export function findQuiz(quizId: string): QuizSummary | undefined {
  for (const course of allCourses) {
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        if (lesson.quiz.id === quizId) return lesson.quiz
      }
    }
  }
  return undefined
}

/** The lesson and section a quiz belongs to. */
export function getQuizTarget(courseSlug: string, quizId: string) {
  const course = courseBySlug.get(courseSlug)
  if (!course) return undefined
  for (const section of course.sections) {
    for (let lessonIndex = 0; lessonIndex < section.lessons.length; lessonIndex += 1) {
      const lesson = section.lessons[lessonIndex]!
      if (lesson.quiz.id === quizId) {
        return { section, lesson, lessonIndex, quiz: lesson.quiz }
      }
    }
  }
  return undefined
}

/** Loads the quiz that belongs to one lesson. */
export async function loadQuiz(courseSlug: string, quizId: string): Promise<Quiz | undefined> {
  const target = getQuizTarget(courseSlug, quizId)
  if (!target) return undefined
  const section = await loadSection(target.section.id)
  return section?.lessons.find((lesson) => lesson.id === target.lesson.id)?.quiz
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

export function getProjectSummary(slug: string) {
  return allProjects.find((project) => project.slug === slug)
}

export function allChallenges() {
  return challenges
}

export function allProjectsList(): ProjectSummary[] {
  return allProjects
}

export async function htmlReferenceTags() {
  const { tags } = await getHtmlReference()
  return tags
}

export async function htmlReferenceCategories() {
  const { categories } = await getHtmlReference()
  return categories
}

export async function htmlReferenceGlobalAttributes() {
  const { globalAttributes } = await getHtmlReference()
  return globalAttributes
}

export async function htmlReferenceAttributes() {
  return getHtmlAttributes()
}

export async function htmlReferenceEvents() {
  return getHtmlEvents()
}

export async function htmlReferenceNav() {
  const { navItems } = await getHtmlNav()
  return navItems
}

export async function htmlReferenceTagNav() {
  const { tagNavItems } = await getHtmlNav()
  return tagNavItems
}

export async function htmlReferenceTagPages() {
  const { pages } = await getHtmlTagPages()
  return pages
}

export async function htmlReferenceTagPage(slug: string) {
  const { findPage } = await getHtmlTagPages()
  return findPage(slug)
}

export async function htmlReferenceColorNames() {
  const { colorNames } = await getHtmlSections()
  return colorNames
}

export async function htmlReferenceCharacterSets() {
  const { characterSets } = await getHtmlSections()
  return characterSets
}

export async function htmlReferenceDoctypes() {
  const { doctypes } = await getHtmlSections()
  return doctypes
}

export async function htmlReferenceLanguageCodes() {
  const { languageCodes } = await getHtmlSections()
  return languageCodes
}

export async function htmlReferenceCountryCodes() {
  const { countryCodes } = await getHtmlSections()
  return countryCodes
}

export async function htmlReferenceHttpStatuses() {
  const { httpStatuses } = await getHtmlSections()
  return httpStatuses
}

export async function htmlReferenceHttpMethods() {
  const { httpMethods } = await getHtmlSections()
  return httpMethods
}

export async function htmlReferenceCanvas() {
  return getHtmlCanvas()
}

export async function htmlReferenceMediaFormats() {
  const { mediaFormats } = await getHtmlSections()
  return mediaFormats
}

export async function htmlReferenceKeyboardShortcuts() {
  const { keyboardShortcuts } = await getHtmlSections()
  return keyboardShortcuts
}

export async function cssReferenceProperties() {
  const { properties } = await getCssProperties()
  return properties
}

export async function cssReferenceNav() {
  const { navItems } = await getCssNav()
  return navItems
}

export async function cssReferencePropertyNav() {
  const { propertyNavItems } = await getCssNav()
  return propertyNavItems
}

export async function cssReferencePropertyPages() {
  const { pages } = await getCssPropertyPages()
  return pages
}

export async function cssReferencePropertyPage(slug: string) {
  const { findPage } = await getCssPropertyPages()
  return findPage(slug)
}

export async function cssReferenceSelectors() {
  const { selectors } = await getCssSections()
  return selectors
}

export async function cssReferenceFunctions() {
  const { functions } = await getCssSections()
  return functions
}

export async function cssReferenceUnits() {
  const { units } = await getCssSections()
  return units
}

export async function cssReferenceColorNames() {
  const { colorNames } = await getCssSections()
  return colorNames
}

export async function cssReferenceColorValues() {
  const { colorValues } = await getCssSections()
  return colorValues
}

export async function cssReferenceWebSafeFonts() {
  const { webSafeFonts } = await getCssSections()
  return webSafeFonts
}

export async function cssReferenceFontFallbacks() {
  const { fontFallbacks } = await getCssSections()
  return fontFallbacks
}

export async function cssReferenceEntities() {
  const { entities } = await getCssSections()
  return entities
}

export async function cssReferenceAuralProperties() {
  const { auralProperties } = await getCssSections()
  return auralProperties
}

export async function cssReferenceAnimatable() {
  const { animatable, nonAnimatable } = await getCssProperties()
  return { animatable: animatable(), static: nonAnimatable() }
}

export async function cssReferenceInherited() {
  const { inherited } = await getCssProperties()
  return inherited()
}

/**
 * The category groups shown on the CSS overview. Each links to its first
 * property, so the overview needs no route of its own per category.
 */
export async function cssReferenceCategories() {
  const { properties, categories } = await getCssProperties()
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
  const { propertySlug: slugFn } = await getCssPropertyPages()
  return slugFn(name)
}

export async function javascriptReferenceTopics() {
  const { topics } = await getJavascriptReference()
  return topics
}

export async function javascriptReferenceTopicBySlug(slug: string) {
  const { topicBySlug } = await getJavascriptReference()
  return topicBySlug(slug)
}

export async function javascriptReferenceTopicSlug(label: string) {
  const { topicSlug } = await getJavascriptReference()
  return topicSlug(label)
}

/** Every member in the reference, paired with the topic it belongs to. */
export async function javascriptReferenceMembers() {
  const { allMembers } = await getJavascriptReference()
  return allMembers
}

/** The sidebar groups, which keep the source index headings and their order. */
export async function javascriptReferenceNavGroups() {
  return getJavascriptNav()
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
    for (const lesson of section.lessons) {
      lessons += 1
      minutes += lesson.duration
      if (lesson.exerciseCount > 0) challenges += 1
      if (lesson.quiz) quizzes += 1
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
