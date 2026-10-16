import type { Section } from '~/types/content'

export const tsAdvancedSections: Section[] = [
  {
    id: 'ts-s7',
    title: 'Advanced Types',
    description: 'Discriminated unions, template literal types, mapped types, and the infer keyword.',
    lessons: [
      {
        id: 'ts-l20',
        title: 'Discriminated unions and exhaustive matching',
        description: 'Using a common tag to narrow unions, and the never check for exhaustiveness.',
        duration: 6,
        objectives: [
          'Build a discriminated union with a shared literal property',
          'Narrow with a switch statement and default: never',
          'Explain why this pattern scales to many variants',
        ],
        xp: 45,
        content: [],
      },
      {
        id: 'ts-l21',
        title: 'Template literal types and key remapping',
        description: 'Building string types from other strings, and remapping keys in mapped types.',
        duration: 5,
        objectives: [
          'Create a template literal type like get${Capitalize<string>}',
          'Use as in a mapped type to transform keys',
          'Generate event handler names from event names',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'ts-l22',
        title: 'The infer keyword and type inference in conditional types',
        description: 'Capturing types inside conditionals, and building Parameters and ReturnType yourself.',
        duration: 5,
        objectives: [
          'Use infer to capture a type parameter',
          'Reimplement ReturnType with infer',
          'Extract array element types with infer',
        ],
        xp: 40,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s7',
      title: 'Advanced Types check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s7-q1',
          type: 'multiple-choice',
          prompt: 'What makes a union "discriminated"?',
          options: [
            'All members are primitive types',
            'All members share a common literal property',
            'The union has exactly two members',
            'The union uses the discriminated keyword',
          ],
          answer: 1,
          explanation: 'A discriminated union has a shared property (the discriminant) with a different literal value in each member, enabling narrowing.',
        },
        {
          id: 'quiz-ts-s7-q2',
          type: 'true-false',
          prompt: 'The never type in a switch default case ensures exhaustiveness.',
          answer: true,
          explanation: 'If all cases are handled, the default branch receives never. Adding a new variant without handling it makes the default reachable, causing a compile error.',
        },
        {
          id: 'quiz-ts-s7-q3',
          type: 'multiple-choice',
          prompt: 'What does type EventNames = `on${Capitalize<string>}` produce?',
          options: [
            'A union of all possible event handler names',
            'A template that matches any string starting with "on"',
            'A type that can only be "onClick"',
            'An error, Capitalize only works on literal strings',
          ],
          answer: 1,
          explanation: 'Template literal types with intrinsic string manipulation (Capitalize, Lowercase, etc.) produce pattern types that match the pattern.',
        },
        {
          id: 'quiz-ts-s7-q4',
          type: 'blank',
          prompt: 'What keyword captures a type inside a conditional type?',
          answers: ['infer', 'Infer'],
          explanation: 'infer declares a type variable to be inferred within a conditional type: T extends Array<infer U> ? U : never.',
        },
        {
          id: 'quiz-ts-s7-q5',
          type: 'identify-error',
          prompt: 'What does this mapped type produce?',
          code: 'type ReadonlyKeys<T> = {\n  readonly [K in keyof T]: T[K]\n}',
          options: [
            'An error, readonly cannot be used in mapped types',
            'A type with all properties readonly',
            'A type with only the readonly properties from T',
            'A type where keys are readonly but values are not',
          ],
          answer: 1,
          explanation: 'The readonly modifier in a mapped type makes all properties readonly. This is how the built-in Readonly<T> is implemented.',
        },
      ],
    },
  },
]