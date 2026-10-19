
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
  | 'dom'
  | 'responsive'
  | 'other'

export type CourseCategory = 'web' | 'programming' | 'computer-science' | 'tools' | 'projects'

export type CourseType = 'course' | 'project-course'

/**
 * Everything a learner can write in the editor.
 *
 * `html`, `css` and `javascript` run in the sandbox as they are. The other
 * three are compiled to JavaScript first (see `~/utils/transpile`): a real
 * `tsc`-style transform strips `typescript`, `jsx` becomes `React.createElement`
 * calls, and `tsx` does both. React lessons get the vendored runtime injected
 * so JSX renders for real rather than being read as text.
 */
export type EditorLanguage = 'html' | 'css' | 'javascript' | 'typescript' | 'jsx' | 'tsx'

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
  /** Markup for a plain demo. Omitted when the demo is written as `files`. */
  html?: string
  css?: string
  javascript?: string
  height?: number
  /**
   * A demo written as real files, run through the same module sandbox the
   * exercises use rather than as one classic script.
   *
   * A React demo is the reason this exists: a component is a `.jsx` module with
   * an `export default`, and only the module path compiles it with the automatic
   * runtime and mounts the default export. Given `files`, the `html` / `css` /
   * `javascript` above are ignored — the files are the demo.
   */
  files?: ExerciseFile[]
  /** The file to run first, when the demo names one. Inferred when absent. */
  entry?: string
  /**
   * Props to mount the default export with, exactly as an exercise declares
   * them. Present means "the default export is a component worth previewing".
   */
  previewProps?: Record<string, unknown>
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

/**
 * One file in an exercise, addressed the way a real project addresses it.
 *
 * The language-keyed `starterCode` below covers the common case of one file per
 * language, which is every HTML, CSS and JavaScript lesson. A React exercise
 * needs `App.jsx` *and* `main.jsx` at the same time, and one slot per language
 * cannot express that, so those exercises list their files and get real imports
 * between them instead.
 */
export interface ExerciseFile {
  /** Path as it is written in an import, e.g. `App.jsx` or `components/List.jsx`. */
  path: string
  language: EditorLanguage
  content: string
  /**
   * Tab caption. Falls back to the path, so a multi-file exercise shows its file
   * names while the single-file courses keep their short language labels.
   */
  label?: string
}

export interface CodingExercise {
  id: string
  instructions: string
  /** Languages the learner may edit, in tab order. */
  languages: EditorLanguage[]
  /**
   * The single-script shorthand: one source per language, which is what every
   * HTML, CSS and JavaScript exercise uses. A file-based exercise leaves it out
   * and lists `files` instead.
   */
  starterCode?: Partial<Record<EditorLanguage, string>>
  /**
   * The files this exercise is made of, when it is a real multi-file project.
   * Given these, the language-keyed `starterCode` and `solution` below are
   * ignored — they are the single-file shorthand.
   */
  files?: ExerciseFile[]
  solutionFiles?: ExerciseFile[]
  /**
   * Which file runs first. Inferred when absent: a `main.*` file if the exercise
   * has one, otherwise the App file.
   */
  entry?: string
  /**
   * The props the sandbox passes when it mounts this exercise's default export
   * into the preview.
   *
   * Declaring them is the exercise saying "the default export is a component
   * worth looking at", and it is also the switch that turns mounting on: an
   * exercise without them is never mounted. That matters, because a plain helper
   * function renders nothing and a higher-order component returns another
   * component, and React would throw on either. Use `{}` for a component that
   * takes no props at all.
   */
  previewProps?: Record<string, unknown>
  expectedOutput?: string
  tests: ExerciseTest[]
  hints: string[]
  solution?: Partial<Record<EditorLanguage, string>>
  /** XP awarded for passing; derived from the test count when absent. */
  xp?: number
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
  /** The starter, keyed by language. Omitted by a project written as real files. */
  starterFiles?: Partial<Record<EditorLanguage, string>>
  /**
   * The starter as real files, for a project whose point is the source tree.
   * Given these, `starterFiles` above is ignored and the editor shows one tab
   * per path, with the imports between them resolved as a real project would.
   */
  files?: ExerciseFile[]
  /** Images the learner needs, offered as one-click copy so URLs are never typed by hand. */
  assets?: ProjectAsset[]
  designPreviewHtml: string
  designPreviewCss: string
  /**
   * Behaviour for the design reference, so a project that is really a piece of
   * software can be tried in place. Optional: a static reference is enough for
   * a layout exercise, and this script is never handed to the learner.
   */
  designPreviewJs?: string
  solutionNote: string
}

export interface ProjectAsset {
  id: string
  /** What the image is, in the learner's terms: "Hero photo", "Chart 1". */
  label: string
  url: string
  /** Suggested alt text, so a placeholder does not ship with placeholder wording. */
  alt?: string
}

export interface ChecklistItem {
  id: string
  label: string
  /** How the item is verified when the learner submits the project. */
  verify: ProjectCheck
}

export type ProjectCheck =
  | { kind: 'selector'; selector: string; count?: number; label: string }
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

/* --------------------------- course metadata ---------------------------- */

/**
 * A course with everything the catalogue needs and none of the lesson
 * bodies. The metadata is bundled eagerly so navigation, search and stats
 * work without downloading a single lesson; the bodies load on demand
 * through `loadCourse`.
 */
export interface CourseLessonMeta {
  id: string
  title: string
  description: string
  duration: number
  objectives: string[]
  xp: number
  /** How many exercise blocks the lesson body contains. */
  exerciseCount: number
}

export interface CourseSectionMeta {
  id: string
  title: string
  description: string
  lessons: CourseLessonMeta[]
  /** Quizzes are small, so they travel with the metadata. */
  quiz?: Quiz
}

export interface CourseMeta {
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
  /** Project slugs; the full projects live in their own modules. */
  projects: string[]
  sections: CourseSectionMeta[]
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

export type ReferenceGroup = 'html' | 'css' | 'javascript'

/**
 * Which part of a language an entry belongs to. The reference splits each
 * language into its own subpage, and the sidebar groups by this rather than
 * dumping every DOM method and Web API into one flat list.
 */
export type ReferenceSection =
  | 'tags'
  | 'attributes'
  | 'global-attributes'
  | 'selectors'
  | 'units'
  | 'functions'
  | 'properties'
  | 'objects'
  | 'statements'
  | 'dom-element'
  | 'dom-events'
  | 'web-apis'
  | 'other'

export interface ReferenceEntry {
  id: string
  name: string
  group: ReferenceGroup
  section: ReferenceSection
  summary: string
  syntax: string
  details: string[]
  /** Why this should no longer be used. Absent on anything still supported. */
  deprecated?: string
  example?: { language: EditorLanguage | 'plaintext'; code: string }
}

/* ---------------------------------- html ----------------------------------- */

export type HtmlTagCategory =
  | 'Document structure'
  | 'Sections and grouping'
  | 'Text content'
  | 'Lists'
  | 'Inline text'
  | 'Links'
  | 'Media'
  | 'Embedded content'
  | 'Tables'
  | 'Forms'
  | 'Interactive'

export interface HtmlTag {
  tag: string
  description: string
  category: HtmlTagCategory
  /** Why this should no longer be used. Absent on anything still supported. */
  deprecated?: string
}

export interface HtmlAttribute {
  attribute: string
  /** The tag or tags the attribute applies to, e.g. `<a>, <area>`. */
  belongsTo: string
  description: string
  deprecated?: string
}

export interface HtmlGlobalAttribute {
  attribute: string
  description: string
  deprecated?: string
}

/* ----------------------------- html detail pages --------------------------- */

export interface HtmlEventAttribute {
  event: string
  /** The elements the event fires on, e.g. `<form>, <input>`. */
  appliesTo: string
  description: string
}

export type BrowserName = 'Chrome' | 'Edge' | 'Firefox' | 'Safari'

export interface BrowserSupport {
  browser: BrowserName
  /** First version with support, e.g. "1". "No" when still unsupported. */
  version: string
}

export interface HtmlTagPage {
  tag: string
  /** One or two sentences on when to reach for the element. */
  usage: string
  example: { language: EditorLanguage; code: string }
  support: BrowserSupport[]
  /** Tag names on other detail pages this one should link to. */
  related: string[]
}

/* ------------------------------ html sections ------------------------------ */

export interface HtmlColorName {
  name: string
  hex: string
}

export interface HtmlCharacterSet {
  label: string
  charset: string
  description: string
}

export interface HtmlDoctype {
  name: string
  doctype: string
  description: string
  deprecated?: string
}

export interface LanguageCode {
  code: string
  language: string
}

export interface CountryCode {
  code: string
  country: string
}

export interface HttpStatus {
  code: number
  status: string
  description: string
}

export interface HttpMethod {
  method: string
  description: string
  /** Whether repeating the request has the same effect as making it once. */
  idempotent: boolean
}

export interface HtmlCanvasMember {
  name: string
  kind: 'method' | 'property'
  description: string
}

export interface MediaFormat {
  format: string
  type: string
  note: string
}

export interface KeyboardShortcut {
  keys: string
  action: string
}

/* ---------------------------------- css ----------------------------------- */

export type CssPropertyCategory =
  | 'Box model'
  | 'Typography'
  | 'Background and borders'
  | 'Flexbox and grid'
  | 'Positioning'
  | 'Transitions and animation'
  | 'Transforms and filters'
  | 'Layout and overflow'
  | 'Tables and columns'
  | 'Lists and generated content'
  | 'Color and effects'
  | 'Caret and user interaction'
  | 'Shorthands and resets'
  | 'At-rules'

export interface CssProperty {
  /** Property or at-rule name as written in a stylesheet, e.g. `margin-top`. */
  name: string
  description: string
  category: CssPropertyCategory
  /** The value the property has when nothing sets it. */
  initial: string
  /** Whether descendants inherit the computed value. */
  inherits: boolean
  deprecated?: string
}

export interface CssPropertyPage {
  property: string
  /** One or two sentences on when to reach for the property. */
  usage: string
  example: { language: EditorLanguage; code: string }
  support: BrowserSupport[]
  /** Property names on other detail pages this one should link to. */
  related: string[]
}

export interface CssSelector {
  selector: string
  kind: string
  description: string
}

export interface CssFunction {
  name: string
  signature: string
  description: string
  example: string
}

export interface CssUnit {
  unit: string
  kind: string
  /** How many bytes one unit represents. 0 for units with no fixed size. */
  bytes: number
  description: string
}

export interface CssColorName {
  name: string
  hex: string
}

export interface CssColorValue {
  syntax: string
  description: string
  example: string
}

export interface CssFontFamily {
  stack: string[]
  /** The generic family that ends the stack. */
  generic: string
  /** Fonts offered by operating systems rather than downloaded over the web. */
  webSafe: boolean
}

export interface CssAuralProperty {
  property: string
  description: string
  deprecated?: string
}

export interface CssEntity {
  name: string
  character: string
  numeric: string
  description: string
}

/**
 * What a JavaScript reference entry is. The source mixes several kinds inside
 * one topic — `DOM Events` holds event names, event properties and helper
 * methods together — so the kind is carried per entry rather than per topic.
 * `token` covers the RegExp topic, whose entries are quantifiers, character
 * classes and escape sequences rather than methods.
 */
export type JsMemberKind = 'method' | 'property' | 'constant' | 'statement' | 'token' | 'interface'

export interface JsMember {
  /** Member name exactly as the source index writes it, e.g. `map()`. */
  name: string
  kind: JsMemberKind
  description: string
  deprecated?: string
}

export interface JsTopic {
  /** URL-safe identifier, e.g. `js-array`. */
  id: string
  /** Label as the source index writes it, e.g. `JS Array`. */
  label: string
  /** The source group the topic sits under, e.g. `JavaScript` or `HTML DOM`. */
  group: string
  /** One line for the overview cards. */
  summary: string
  /** A short paragraph for the topic page. */
  usage: string
  example: { language: EditorLanguage; code: string }
  members: JsMember[]
}

/** One entry in the JavaScript reference sidebar. */
export interface ReferenceNavItem {
  id: string
  label: string
  /** Route this entry points at. */
  to: string
  /** Set when the entry expands into its own group of links. */
  children?: { label: string; to: string }[]
}
