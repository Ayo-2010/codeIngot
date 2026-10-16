import type { Section } from '~/types/content'

export const tsHomeSections: Section[] = [
  {
    id: 'ts-s1',
    title: 'TS HOME',
    description: 'What TypeScript adds to JavaScript, how the compiler works, and what you will be able to do at the end.',
    lessons: [
      {
        id: 'ts-l1',
        title: 'What TypeScript is and why it exists',
        description: 'A typed superset that compiles to plain JavaScript, and the three problems it solves.',
        duration: 5,
        objectives: [
          'Say what TypeScript adds that JavaScript cannot do',
          'Explain the compile step and why it catches bugs early',
          'Name the three classes of bugs TypeScript prevents',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'ts-l2',
        title: 'How the compiler fits in your workflow',
        description: 'tsconfig, the watch mode, and running the compiler alongside your editor.',
        duration: 5,
        objectives: [
          'Create a minimal tsconfig.json for a new project',
          'Run tsc in watch mode while you code',
          'Read compiler output and jump to the failing line',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l3',
        title: 'Your first typed file',
        description: 'Renaming .js to .ts, adding a type annotation, and watching the error disappear.',
        duration: 6,
        objectives: [
          'Convert a JavaScript file to TypeScript',
          'Add your first type annotation to a variable',
          'Distinguish a compile error from a runtime error',
        ],
        xp: 40,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s1',
      title: 'TS HOME check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s1-q1',
          type: 'multiple-choice',
          prompt: 'What does TypeScript add to JavaScript?',
          options: [
            'New runtime features',
            'Static type checking that compiles away',
            'A different standard library',
            'Server-side rendering',
          ],
          answer: 1,
          explanation: 'TypeScript is a superset that adds static types; it compiles to plain JavaScript and adds no runtime overhead.',
        },
        {
          id: 'quiz-ts-s1-q2',
          type: 'true-false',
          prompt: 'TypeScript code runs directly in the browser without compilation.',
          answer: false,
          explanation: 'Browsers only run JavaScript. TypeScript must be compiled (transpiled) to JavaScript first.',
        },
        {
          id: 'quiz-ts-s1-q3',
          type: 'multiple-choice',
          prompt: 'Which file configures the TypeScript compiler?',
          options: ['package.json', 'tsconfig.json', 'webpack.config.js', '.babelrc'],
          answer: 1,
          explanation: 'tsconfig.json is the standard configuration file for the TypeScript compiler.',
        },
        {
          id: 'quiz-ts-s1-q4',
          type: 'blank',
          prompt: 'What command runs the TypeScript compiler in watch mode?',
          answers: ['tsc -w', 'tsc --watch', 'tsc watch'],
          explanation: '`tsc -w` or `tsc --watch` recompiles on file changes, which is ideal during development.',
        },
        {
          id: 'quiz-ts-s1-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this tsconfig.json?',
          code: '{\n  "compilerOptions": {\n    "target": "es2020",\n    "module": "commonjs"\n  }\n}',
          options: [
            'Nothing is wrong',
            'Missing "strict": true',
            'target and module are incompatible',
            'The file must be named typescript.config.json',
          ],
          answer: 0,
          explanation: 'This is a valid minimal tsconfig.json. Adding "strict": true is recommended but not required.',
        },
      ],
    },
  },
]