import { describe, expect, it } from 'vitest'
import { allProjectsList, courseChapters } from '~/composables/useCourses'
import { courseMeta } from '~/content/courses/meta'
import { sectionLoaderIds } from '~/content/courses/section-loaders'
import { cssFundamentals } from '~/content/courses/css-fundamentals'
import { domBrowserApisCourse } from '~/content/courses/dom-browser-apis-course'
import { frontendProjectsCourse } from '~/content/courses/frontend-projects-course'
import { gitGitHubCourse } from '~/content/courses/git-github-course'
import { htmlFundamentals } from '~/content/courses/html-fundamentals'
import { javascriptFundamentals } from '~/content/courses/javascript-fundamentals'
import { reactCourse } from '~/content/courses/react'
import { responsiveWebDesignCourse } from '~/content/courses/responsive-web-design-course'
import { typescriptFundamentals } from '~/content/courses/typescript-fundamentals'
import type { Course } from '~/types/content'

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

/**
 * The three original courses were authored as one section per lesson. Their
 * sections are tagged into chapters at display time; the other six already have
 * multi-lesson sections and need no tag.
 *
 * Frontend Projects now opts in as well: its five capstone builds are grouped
 * separately from the foundations and the shipping lessons.
 */
const legacyCourses = [htmlFundamentals, cssFundamentals, javascriptFundamentals]
const taggedCourses = [...legacyCourses, frontendProjectsCourse]
const expectedChapters = new Map([
  [htmlFundamentals.slug, 10],
  [cssFundamentals.slug, 12],
  [javascriptFundamentals.slug, 11],
  [frontendProjectsCourse.slug, 4],
])

describe('course grouping', () => {
  it('tags every section of the tagged courses with a chapter', () => {
    for (const course of taggedCourses) {
      for (const section of course.sections) {
        expect(section.chapter, `${course.slug}/${section.id}`).toBeTruthy()
      }
    }
  })

  it('keeps each chapter a single contiguous run of sections', () => {
    for (const course of taggedCourses) {
      const seen = new Set<string>()
      let previous: string | undefined
      for (const section of course.sections) {
        if (section.chapter === previous) continue
        expect(seen.has(section.chapter!), `${course.slug}/${section.id} repeats ${section.chapter}`).toBe(false)
        seen.add(section.chapter!)
        previous = section.chapter
      }
    }
  })

  it('grouping preserves the section and lesson order', () => {
    for (const course of courses) {
      const chapters = courseChapters(courseToMeta(course))
      const flattened = chapters.flatMap((chapter) =>
        chapter.sections.flatMap((section) => section.lessons.map((lesson) => lesson.id)),
      )
      const original = course.sections.flatMap((section) => section.lessons.map((lesson) => lesson.id))
      expect(flattened).toEqual(original)
    }
  })

  it('groups the tagged courses into the planned number of chapters', () => {
    for (const course of taggedCourses) {
      expect(courseChapters(courseToMeta(course)).length, course.slug).toBe(expectedChapters.get(course.slug))
    }
  })

  it('keeps the original chapters between 4 and 16 lessons', () => {
    for (const course of legacyCourses) {
      for (const chapter of courseChapters(courseToMeta(course))) {
        expect(chapter.lessons, `${course.slug}/${chapter.title}`).toBeGreaterThanOrEqual(4)
        expect(chapter.lessons, `${course.slug}/${chapter.title}`).toBeLessThanOrEqual(16)
      }
    }
  })

  it('falls back to one chapter per section for courses without tags', () => {
    for (const course of courses.filter((item) => !item.sections.some((section) => section.chapter))) {
      const chapters = courseChapters(courseToMeta(course))
      expect(chapters.length, course.slug).toBe(course.sections.length)
      expect(chapters.map((chapter) => chapter.title)).toEqual(course.sections.map((section) => section.title))
    }
  })
})

describe('frontend project capstones', () => {
  const capstoneSections = frontendProjectsCourse.sections.filter((section) =>
    section.title.startsWith('Capstone:'),
  )

  it('attaches the five original projects to the course', () => {
    expect(frontendProjectsCourse.projects.map((project) => project.slug)).toEqual([
      'personal-profile-page',
      'responsive-landing-page',
      'interactive-calculator',
      'todo-application',
      'quiz-application',
    ])
  })

  it('gives every capstone section a project hand-off in both lessons', () => {
    expect(capstoneSections).toHaveLength(5)

    const handOffs: string[] = []
    for (const section of capstoneSections) {
      expect(section.lessons, section.id).toHaveLength(2)

      for (const lesson of section.lessons) {
        const slugs = lesson.content.flatMap((block) =>
          block.type === 'project' ? [block.projectSlug] : [],
        )
        expect(slugs, `${section.id}/${lesson.id}`).toHaveLength(1)
        expect(
          frontendProjectsCourse.projects.some((project) => project.slug === slugs[0]),
          `${section.id}/${lesson.id} → ${slugs[0]}`,
        ).toBe(true)
        handOffs.push(...slugs)
      }
    }

    expect(handOffs).toHaveLength(10)
    expect(new Set(handOffs).size).toBe(5)
  })

  it('never hands off to a project that does not exist', () => {
    const known = new Set(allProjectsList().map((project) => project.slug))

    for (const course of courses) {
      for (const section of course.sections) {
        for (const lesson of section.lessons) {
          for (const block of lesson.content) {
            if (block.type !== 'project') continue
            expect(known.has(block.projectSlug), `${lesson.id}/${block.id}`).toBe(true)
          }
        }
      }
    }
  })
})

describe('course content invariants', () => {
  it('has unique section and lesson ids inside every course', () => {
    for (const course of courses) {
      const sectionIds = course.sections.map((section) => section.id)
      expect(new Set(sectionIds).size, course.slug).toBe(sectionIds.length)

      const lessonIds = course.sections.flatMap((section) => section.lessons.map((lesson) => lesson.id))
      expect(new Set(lessonIds).size, course.slug).toBe(lessonIds.length)
      expect(lessonIds.length, course.slug).toBeGreaterThan(0)
    }
  })

  it('uses lesson ids that are unique across the whole catalogue', () => {
    const lessonIds = courses.flatMap((course) =>
      course.sections.flatMap((section) => section.lessons.map((lesson) => lesson.id)),
    )
    expect(new Set(lessonIds).size).toBe(lessonIds.length)
  })

  it('gives every section a quiz with unique ids', () => {
    const quizIds = new Set<string>()
    for (const course of courses) {
      for (const section of course.sections) {
        expect(section.quiz, `${course.slug}/${section.id}`).toBeDefined()
        expect(quizIds.has(section.quiz!.id), section.quiz!.id).toBe(false)
        quizIds.add(section.quiz!.id)
        expect(section.quiz!.questions.length).toBeGreaterThan(0)
      }
    }
  })

  it('keeps the generated metadata in sync with the course modules', () => {
    expect(courseMeta.map((course) => course.slug)).toEqual(courses.map((course) => course.slug))

    for (const course of courses) {
      const meta = courseMeta.find((item) => item.slug === course.slug)
      expect(meta, course.slug).toBeDefined()
      expect(summarise(meta!), course.slug).toEqual(summarise(course))
    }
  })

  it('has a section loader for every section in the catalogue', () => {
    const expected = courses.flatMap((course) => course.sections.map((section) => section.id)).sort()
    expect([...sectionLoaderIds].sort()).toEqual(expected)
  })

  it('ships quiz counts without question bodies in the eager metadata', () => {
    for (const course of courses) {
      const meta = courseMeta.find((item) => item.slug === course.slug)!
      for (const section of meta.sections) {
        const full = course.sections.find((item) => item.id === section.id)?.quiz
        if (!full) {
          expect(section.quiz, section.id).toBeUndefined()
          continue
        }
        expect(section.quiz, section.id).toBeDefined()
        expect(section.quiz!.id).toBe(full.id)
        expect(section.quiz!.passingScore).toBe(full.passingScore)
        expect(section.quiz!.questionCount).toBe(full.questions.length)
        expect(section.quiz).not.toHaveProperty('questions')
      }
    }
  })
})

interface CourseShape {
  sections: Array<{
    id: string
    title: string
    chapter?: string
    lessons: Array<{ id: string }>
    quiz?: { id: string }
  }>
}

function summarise(course: CourseShape) {
  return course.sections.map((section) => ({
    id: section.id,
    title: section.title,
    chapter: section.chapter,
    lessons: section.lessons.map((lesson) => lesson.id),
    quiz: section.quiz?.id,
  }))
}

/** The catalogue only needs the metadata half of a course. */
function courseToMeta(course: Course): CourseShape {
  return {
    sections: course.sections.map((section) => ({
      id: section.id,
      title: section.title,
      chapter: section.chapter,
      lessons: section.lessons.map((lesson) => ({ id: lesson.id })),
      quiz: section.quiz,
    })),
  }
}
