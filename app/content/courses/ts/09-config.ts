import type { Section } from '~/types/content'

export const tsConfigSections: Section[] = [
  {
    id: 'ts-s9',
    title: 'Strict Mode and Configuration',
    description: 'The flags that make TypeScript strict, and tuning them for your project.',
    lessons: [
      {
        id: 'ts-l26',
        title: 'strict and the flags it enables',
        description: 'What strict: true turns on, and why you should start with it.',
        duration: 5,
        objectives: [
          'List the seven flags enabled by strict',
          'Explain noImplicitAny, strictNullChecks, strictFunctionTypes',
          'Enable strict mode in a new project from day one',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l27',
        title: 'Tuning strictness for migration',
        description: 'Turning off individual flags when migrating JavaScript, and the migration path.',
        duration: 5,
        objectives: [
          'Disable noImplicitAny temporarily during migration',
          'Use // @ts-expect-error for known issues',
          'Enable flags one by one as the codebase improves',
        ],
        xp: 30,
        content: [],
      },
      {
        id: 'ts-l28',
        title: 'Project references and incremental builds',
        description: 'Splitting a monorepo into referenced projects for faster compilation.',
        duration: 5,
        objectives: [
          'Configure composite and references in tsconfig',
          'Build incrementally with --build mode',
          'Structure a monorepo with shared type packages',
        ],
        xp: 30,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s9',
      title: 'Configuration check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s9-q1',
          type: 'multiple-choice',
          prompt: 'How many flags does strict: true enable?',
          options: ['5', '6', '7', '8'],
          answer: 2,
          explanation: 'strict enables 7 flags: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, alwaysStrict.',
        },
        {
          id: 'quiz-ts-s9-q2',
          type: 'true-false',
          prompt: 'strictNullChecks makes null and undefined valid values of every type.',
          answer: false,
          explanation: 'strictNullChecks does the opposite: it makes null and undefined NOT assignable to other types unless explicitly included in a union (e.g., string | null).',
        },
        {
          id: 'quiz-ts-s9-q3',
          type: 'multiple-choice',
          prompt: 'What does // @ts-expect-error do?',
          options: [
            'Suppresses all errors on the next line',
            'Suppresses errors on the next line, but errors if there are none',
            'Disables type checking for the entire file',
            'Marks a line as intentionally broken for testing',
          ],
          answer: 1,
          explanation: '@ts-expect-error suppresses errors on the next line AND causes an error if that line has no errors, preventing stale suppressions.',
        },
        {
          id: 'quiz-ts-s9-q4',
          type: 'blank',
          prompt: 'Which tsconfig option enables incremental compilation with cache?',
          answers: ['incremental: true', 'incremental', '"incremental": true'],
          explanation: 'incremental: true saves compilation info to .tsbuildinfo for faster subsequent builds.',
        },
        {
          id: 'quiz-ts-s9-q5',
          type: 'identify-error',
          prompt: 'What does composite: true require?',
          code: '{\n  "compilerOptions": {\n    "composite": true\n  }\n}',
          options: [
            'Nothing else',
            'declaration: true and declarationMap: true',
            'strict: false',
            'module: commonjs',
          ],
          answer: 1,
          explanation: 'composite: true (for project references) requires declaration: true and implies declarationMap: true.',
        },
      ],
    },
  },
]