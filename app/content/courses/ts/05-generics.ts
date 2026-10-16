import type { Section } from '~/types/content'

export const tsGenericsSections: Section[] = [
  {
    id: 'ts-s5',
    title: 'Generics',
    description: 'Writing reusable components that work with any type while preserving type safety.',
    lessons: [
      {
        id: 'ts-l14',
        title: 'Generic functions and type parameters',
        description: 'Angle brackets, type parameter constraints, and inference at call sites.',
        duration: 6,
        objectives: [
          'Write a generic function with a type parameter',
          'Add a constraint with extends',
          'Let TypeScript infer the type argument from the call',
        ],
        xp: 45,
        content: [],
      },
      {
        id: 'ts-l15',
        title: 'Generic interfaces and classes',
        description: 'Parameterising interfaces and classes, and default type arguments.',
        duration: 5,
        objectives: [
          'Define a generic interface like Box<T>',
          'Write a generic class with a type parameter',
          'Provide a default so callers can omit the argument',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'ts-l16',
        title: 'Generic constraints and conditional types',
        description: 'Narrowing what a type parameter can be, and choosing types with extends.',
        duration: 6,
        objectives: [
          'Constrain a type parameter to a specific shape',
          'Write a conditional type T extends U ? X : Y',
          'Distribute a conditional type over a union',
        ],
        xp: 45,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s5',
      title: 'Generics check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s5-q1',
          type: 'multiple-choice',
          prompt: 'What does function identity<T>(value: T): T mean?',
          options: [
            'A function that only accepts type T',
            'A function that works with any type and returns the same type',
            'A function that converts any value to type T',
            'A function that requires T to be a class',
          ],
          answer: 1,
          explanation: 'The type parameter T is a placeholder. The function accepts any type and returns that exact same type.',
        },
        {
          id: 'quiz-ts-s5-q2',
          type: 'true-false',
          prompt: 'TypeScript can infer the type argument when you call a generic function.',
          answer: true,
          explanation: 'TypeScript infers T from the argument type. identity("hello") infers T = string.',
        },
        {
          id: 'quiz-ts-s5-q3',
          type: 'multiple-choice',
          prompt: 'What does interface Box<T = string> mean?',
          options: [
            'T defaults to string if not provided',
            'T must be string',
            'T extends string',
            'Box only works with strings',
          ],
          answer: 0,
          explanation: 'Default type parameters let callers omit the argument. Box<number> uses number; Box uses string.',
        },
        {
          id: 'quiz-ts-s5-q4',
          type: 'blank',
          prompt: 'What syntax constrains a type parameter to types that have a length property?',
          answers: ['T extends { length: number }', 'T extends Length', 'T has length'],
          explanation: 'Constraints use extends with the required shape: function logLength<T extends { length: number }>(item: T).',
        },
        {
          id: 'quiz-ts-s5-q5',
          type: 'identify-error',
          prompt: 'What does this conditional type evaluate to?',
          code: 'type IsString<T> = T extends string ? "yes" : "no"\n\ntype Test = IsString<string | number>',
          options: [
            '"yes"',
            '"no"',
            '"yes" | "no"',
            'never',
          ],
          answer: 2,
          explanation: 'Conditional types distribute over unions. IsString<string | number> becomes IsString<string> | IsString<number> = "yes" | "no".',
        },
      ],
    },
  },
]