import { describe, expect, it } from 'vitest'
import { courseMeta } from '~/content/courses/meta'
import { cssFundamentals } from '~/content/courses/css-fundamentals'
import { domBrowserApisCourse } from '~/content/courses/dom-browser-apis-course'
import { frontendProjectsCourse } from '~/content/courses/frontend-projects-course'
import { gitGitHubCourse } from '~/content/courses/git-github-course'
import { htmlFundamentals } from '~/content/courses/html-fundamentals'
import { javascriptFundamentals } from '~/content/courses/javascript-fundamentals'
import { reactCourse } from '~/content/courses/react'
import { responsiveWebDesignCourse } from '~/content/courses/responsive-web-design-course'
import { typescriptFundamentals } from '~/content/courses/typescript-fundamentals'
import type { Course, Lesson, QuizQuestion, Section } from '~/types/content'

const courses: Course[] = [
  htmlFundamentals,
  cssFundamentals,
  javascriptFundamentals,
  domBrowserApisCourse,
  responsiveWebDesignCourse,
  gitGitHubCourse,
  typescriptFundamentals,
  reactCourse,
  frontendProjectsCourse,
]

const QUIZ_QUESTIONS = 5

interface LessonEntry {
  course: Course
  section: Section
  lesson: Lesson
}

const lessons: LessonEntry[] = courses.flatMap((course) =>
  course.sections.flatMap((section) =>
    section.lessons.map((lesson) => ({ course, section, lesson })),
  ),
)

function questionContent(question: QuizQuestion) {
  return JSON.stringify({
    type: question.type,
    prompt: question.prompt,
    code: question.code ?? '',
    options: 'options' in question ? question.options : undefined,
    answers: 'answers' in question ? question.answers : undefined,
    answer: question.answer,
  })
}

describe('lesson quizzes', () => {
  it('gives every lesson exactly five uniquely identified questions', () => {
    const quizIds = new Set<string>()
    const questionIds = new Set<string>()

    expect(lessons).toHaveLength(459)

    for (const { course, section, lesson } of lessons) {
      const label = `${course.slug}/${section.id}/${lesson.id}`
      const quiz = lesson.quiz

      expect(quiz.id, label).toBe(`quiz-${lesson.id}`)
      expect(quiz.title, label).toBe(`${lesson.title} quiz`)
      expect(quiz.passingScore, label).toBe(60)
      expect(quiz.questions, label).toHaveLength(QUIZ_QUESTIONS)
      expect(quizIds.has(quiz.id), label).toBe(false)
      quizIds.add(quiz.id)

      for (let index = 0; index < quiz.questions.length; index += 1) {
        const question = quiz.questions[index]!
        expect(question.id, label).toBe(`quiz-${lesson.id}-q${index + 1}`)
        expect(questionIds.has(question.id), label).toBe(false)
        questionIds.add(question.id)
      }
    }

    expect(quizIds.size).toBe(lessons.length)
    expect(questionIds.size).toBe(lessons.length * QUIZ_QUESTIONS)
  })

  it('keeps the eager metadata in sync without shipping question bodies', () => {
    expect(courseMeta.flatMap((course) => course.sections.flatMap((section) => section.lessons)))
      .toHaveLength(lessons.length)

    for (const { course, section, lesson } of lessons) {
      const meta = courseMeta.find((candidate) => candidate.slug === course.slug)
      expect(meta, course.slug).toBeDefined()

      const sectionMeta = meta!.sections.find((candidate) => candidate.id === section.id)
      expect(sectionMeta, `${course.slug}/${section.id}`).toBeDefined()

      const lessonMeta = sectionMeta!.lessons.find((candidate) => candidate.id === lesson.id)
      expect(lessonMeta, `${course.slug}/${section.id}/${lesson.id}`).toBeDefined()
      expect(lessonMeta!.quiz).toEqual({
        id: lesson.quiz.id,
        title: lesson.quiz.title,
        passingScore: lesson.quiz.passingScore,
        questionCount: lesson.quiz.questions.length,
      })
      expect(lessonMeta!.quiz).not.toHaveProperty('questions')
    }
  })

  it('never repeats a question between lesson quizzes', () => {
    const contents = new Set<string>()
    let total = 0

    for (const { course, section, lesson } of lessons) {
      for (const question of lesson.quiz.questions) {
        const content = questionContent(question)
        expect(contents.has(content), `${course.slug}/${section.id}/${lesson.id}`).toBe(false)
        contents.add(content)
        total += 1
      }
    }

    expect(total).toBe(lessons.length * QUIZ_QUESTIONS)
  })
})
