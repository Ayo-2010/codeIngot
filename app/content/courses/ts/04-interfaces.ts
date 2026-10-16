import type { Section } from '~/types/content'

export const tsInterfacesSections: Section[] = [
  {
    id: 'ts-s4',
    title: 'Interfaces and Type Aliases',
    description: 'Defining reusable shapes, extending interfaces, and when to prefer type over interface.',
    lessons: [
      {
        id: 'ts-l11',
        title: 'Interfaces vs type aliases',
        description: 'The two ways to name a shape, and the practical differences between them.',
        duration: 5,
        objectives: [
          'Define an interface and a type alias for the same shape',
          'List the features only interfaces have (declaration merging)',
          'List the features only type aliases have (unions, primitives)',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l12',
        title: 'Extending and merging interfaces',
        description: 'Building new interfaces from old ones, and how declaration merging works.',
        duration: 5,
        objectives: [
          'Extend an interface with extends',
          'Merge two interfaces with the same name',
          'Explain when merging is useful (augmenting library types)',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l13',
        title: 'Implementing interfaces in classes',
        description: 'The implements clause, and why a class can satisfy an interface without declaring it.',
        duration: 5,
        objectives: [
          'Write a class that implements an interface',
          'Explain structural typing: no implements required to match',
          'Use implements to catch missing members at compile time',
        ],
        xp: 35,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s4',
      title: 'Interfaces & Type Aliases check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s4-q1',
          type: 'multiple-choice',
          prompt: 'Which feature is ONLY available with interfaces, not type aliases?',
          options: ['Extending', 'Declaration merging', 'Union types', 'Generic parameters'],
          answer: 1,
          explanation: 'Declaration merging (multiple interface declarations with the same name combining) only works with interfaces.',
        },
        {
          id: 'quiz-ts-s4-q2',
          type: 'true-false',
          prompt: 'A class must declare implements Interface to satisfy that interface.',
          answer: false,
          explanation: 'TypeScript uses structural typing. A class matches an interface if it has all the required members, regardless of implements.',
        },
        {
          id: 'quiz-ts-s4-q3',
          type: 'multiple-choice',
          prompt: 'What does interface B extends A do?',
          options: [
            'Copies all members of A into B',
            'Creates a new interface with A members plus B own members',
            'Makes B a subclass of A',
            'Merges B into A',
          ],
          answer: 1,
          explanation: 'extends creates a new interface that includes all members from the parent plus its own members.',
        },
        {
          id: 'quiz-ts-s4-q4',
          type: 'blank',
          prompt: 'Which keyword defines a type alias?',
          answers: ['type', 'Type'],
          explanation: 'type MyType = { ... } defines a type alias.',
        },
        {
          id: 'quiz-ts-s4-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this type alias?',
          code: 'type EventHandler = (event: MouseEvent) => void\n  | (event: KeyboardEvent) => void',
          options: [
            'Nothing is wrong',
            'Function types cannot be unioned',
            'Parentheses are needed around the union',
            'void cannot be used in union types',
          ],
          answer: 2,
          explanation: 'Function types in a union need parentheses: type EventHandler = ((event: MouseEvent) => void) | ((event: KeyboardEvent) => void).',
        },
      ],
    },
  },
]