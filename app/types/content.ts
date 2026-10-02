export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export type Technology =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'vue'
  | 'nextjs'
  | 'node'
  | 'python'
  | 'sql'
  | 'api'
  | 'git'
  | 'linux'
  | 'docker'
  | 'dsa'
  | 'uiux'
  | 'a11y'
  | 'other'

export type CourseCategory = 'web' | 'programming' | 'computer-science' | 'tools' | 'projects'

export type CourseType = 'course' | 'project-course'

export type EditorLanguage = 'html' | 'css' | 'javascript'

/* ---------------------------------- blocks --------------------------------- */

export interface TextBlock {
  type: 'text'
  id: string
  body: string
}

export interface HeadingBlock {
  type: 'heading'
  id: string
  level: 2 | 3
  body: string
}

export interface CodeBlock {
  type: 'code'
  id: string
  language: EditorLanguage | 'plaintext'
  title?: string
  code: string
  highlightLines?: number[]
}

export interface ListBlock {
  type: 'list'
  id: string
  style: 'bullet' | 'ordered'
  items: string[]
}

export interface TipBlock {
  type: 'tip'
  id: string
  title: string
  body: string
}

export interface WarningBlock {
  type: 'warning'
  id: string
  title: string
  body: string
}

export interface ExampleBlock {
  type: 'example'
  id: string
  title: string
  body: string
  html: string
  css?: string
  javascript?: string
  showPreview: boolean
}

export interface ExerciseBlock {
  type: 'exercise'
  id: string
  exercise: CodingExercise
}

export interface QuizBlock {
  type: 'quiz'
  id: string
  quiz: Quiz
}

/** A live result shown on its own, with no code beside it. Used to open a lesson. */
export interface DemoBlock {
  type: 'demo'
  id: string
  title: string
  body?: string
  html: string
  css?: string
  javascript?: string
  height?: number
}

export type LessonBlock =
  | TextBlock
  | HeadingBlock
  | CodeBlock
  | ListBlock
  | TipBlock
  | WarningBlock
  | ExampleBlock
  | DemoBlock
  | ExerciseBlock
  | QuizBlock

/* --------------------------------- exercise -------------------------------- */

export interface ExerciseTest {
  id: string
  label: string
  /** Body of a function. `return true` to pass, or return a string/false to fail with feedback. */
  body: string
}

export interface CodingExercise {
  id: string
  instructions: string
  /** Languages the learner may edit, in tab order. */
  languages: EditorLanguage[]
  starterCode: Partial<Record<EditorLanguage, string>>
  expectedOutput?: string
  tests: ExerciseTest[]
  hints: string[]
  solution?: Partial<Record<EditorLanguage, string>>
  /** Free text explaining what the tests check, shown after a check run. */
  testNotes?: string
}

/* ----------------------------------- quiz ---------------------------------- */

export type QuizQuestion =
  | {
      id: string
      type: 'multiple-choice'
      prompt: string
      code?: string
      options: string[]
      answer: number
      explanation: string
    }
  | {
      id: string
      type: 'true-false'
      prompt: string
      code?: string
      answer: boolean
      explanation: string
    }
  | {
      id: string
      type: 'blank'
      prompt: string
      code?: string
      /** Every accepted answer, lowercase and trimmed. */
      answers: string[]
      explanation: string
    }
  | {
      id: string
      type: 'code-output'
      prompt: string
      code: string
      options: string[]
      answer: number
      explanation: string
    }
  | {
      id: string
      type: 'identify-error'
      prompt: string
      code: string
      options: string[]
      answer: number
      explanation: string
    }

export interface Quiz {
  id: string
  title: string
  passingScore: number
  questions: QuizQuestion[]
}

/* ---------------------------------- course --------------------------------- */

export interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  objectives: string[]
  content: LessonBlock[]
  xp: number
}

export interface Section {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  quiz?: Quiz
}

export interface Project {
  id: string
  slug: string
  title: string
  tagline: string
  summary: string
  difficulty: Difficulty
  technologies: Technology[]
  estimatedMinutes: number
  xp: number
  brief: string[]
  requirements: string[]
  checklist: ChecklistItem[]
  starterFiles: Partial<Record<EditorLanguage, string>>
  designPreviewHtml: string
  designPreviewCss: string
  solutionNote: string
}

export interface ChecklistItem {
  id: string
  label: string
  /** How the item is verified when the learner submits the project. */
  verify: ProjectCheck
}

export type ProjectCheck =
  | { kind: 'selector'; selector: string; label: string }
  | { kind: 'text'; needle: string; label: string }
  | { kind: 'css-rule'; needle: string; label: string }
  | { kind: 'js-call'; needle: string; label: string }
  | { kind: 'manual'; label: string }

export interface Course {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  technology: Technology
  category: CourseCategory
  type: CourseType
  difficulty: Difficulty
  badges: ('beginner' | 'popular' | 'new' | 'project' | 'certificate')[]
  topics: string[]
  icon: string
  sections: Section[]
  projects: Project[]
}

/* ----------------------------------- paths --------------------------------- */

export interface PathStep {
  id: string
  order: number
  title: string
  summary: string
  courseSlug: string
  technologies: Technology[]
}

export interface LearningPath {
  id: string
  slug: string
  title: string
  tagline: string
  description: string
  difficulty: Difficulty
  icon: string
  outcomes: string[]
  steps: PathStep[]
}

/* -------------------------------- challenges ------------------------------- */

export interface Challenge {
  id: string
  slug: string
  title: string
  summary: string
  difficulty: Difficulty
  technology: Technology
  practices: string[]
  estimatedMinutes: number
  xp: number
  instructions: string[]
  exercise: CodingExercise
}

/* --------------------------------- reference ------------------------------- */

export interface ReferenceEntry {
  id: string
  name: string
  group: 'html' | 'css' | 'javascript'
  summary: string
  syntax: string
  details: string[]
  example?: { language: EditorLanguage | 'plaintext'; code: string }
}
