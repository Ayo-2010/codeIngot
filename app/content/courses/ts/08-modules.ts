import type { Section } from '~/types/content'

export const tsModulesSections: Section[] = [
  {
    id: 'ts-s8',
    title: 'Modules and Declaration Files',
    description: 'Organizing code with ES modules, ambient declarations, and publishing type packages.',
    lessons: [
      {
        id: 'ts-l23',
        title: 'ES modules in TypeScript',
        description: 'Import/export syntax, tsconfig module settings, and path aliases.',
        duration: 5,
        objectives: [
          'Configure module, moduleResolution and baseUrl',
          'Use path aliases for clean imports',
          'Explain the difference between import and require',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l24',
        title: 'Declaration files and declare',
        description: '.d.ts files, ambient modules, and typing third-party JavaScript.',
        duration: 5,
        objectives: [
          'Write a declaration file for a plain JavaScript module',
          'Use declare module to augment an existing package',
          'Generate declarations with declaration: true',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l25',
        title: 'Publishing a typed package',
        description: 'exports, types field, and testing your types with attw or tsc --noEmit.',
        duration: 5,
        objectives: [
          'Configure package.json for dual CJS/ESM with types',
          'Add a types or typesVersions field',
          'Verify the published types are consumable',
        ],
        xp: 30,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s8',
      title: 'Modules & Declarations check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s8-q1',
          type: 'multiple-choice',
          prompt: 'What does "moduleResolution": "node16" enable?',
          options: [
            'CommonJS require only',
            'ESM imports with package.json exports support',
            'AMD module loading',
            'SystemJS module loading',
          ],
          answer: 1,
          explanation: 'node16 (and nodenext) resolution understands package.json "exports" and "imports" fields for proper ESM support.',
        },
        {
          id: 'quiz-ts-s8-q2',
          type: 'true-false',
          prompt: 'A .d.ts file can contain implementation code.',
          answer: false,
          explanation: 'Declaration files (.d.ts) contain only type information. No implementation code is allowed.',
        },
        {
          id: 'quiz-ts-s8-q3',
          type: 'multiple-choice',
          prompt: 'How do you augment a module declaration from an external package?',
          options: [
            'Modify node_modules directly',
            'declare module "package-name" { ... }',
            'Create a file named package-name.d.ts',
            'Use import type from "package-name"',
          ],
          answer: 1,
          explanation: 'declare module "package-name" lets you add types to an existing module without modifying it.',
        },
        {
          id: 'quiz-ts-s8-q4',
          type: 'blank',
          prompt: 'Which tsconfig option generates .d.ts files alongside .js output?',
          answers: ['declaration: true', 'declaration', '"declaration": true'],
          explanation: 'declaration: true emits declaration files. Combine with declarationMap for source maps.',
        },
        {
          id: 'quiz-ts-s8-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this package.json for a typed package?',
          code: '{\n  "name": "my-lib",\n  "main": "dist/index.js",\n  "types": "dist/index.d.ts"\n}',
          options: [
            'Nothing is wrong',
            'Missing "exports" field for modern resolution',
            'types must be "typings"',
            'main and types cannot be in the same folder',
          ],
          answer: 1,
          explanation: 'Modern packages should use "exports" with conditional exports for proper dual CJS/ESM support with types.',
        },
      ],
    },
  },
]