import type { Course, LearningPath, Lesson, Project, Section } from '~/types/content'
import { htmlFundamentals } from '~/content/courses/html-fundamentals'
import { cssFundamentals } from '~/content/courses/css-fundamentals'
import { javascriptFundamentals } from '~/content/courses/javascript-fundamentals'
import { frontendDeveloper } from '~/content/paths/frontend-developer'
import { challenges } from '~/content/challenges/index'
import { projects } from '~/content/projects/index'
import { referenceEntries } from '~/content/reference/index'

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