import type { Section } from '~/types/content'

export const tsBasicsSections: Section[] = [
  {
    id: 'ts-s2',
    title: 'TypeScript Basics',
    description: 'The primitive types, type inference, and the annotations you will write every day.',
    lessons: [
      {
        id: 'ts-l4',
        title: 'Primitive types and inference',
        description: 'string, number, boolean, null, undefined, and when TypeScript figures it out for you.',
        duration: 6,
        objectives: [
          'List the primitive types and write an annotation for each',
          'Explain when inference works and when it does not',
          'Choose between const and let for narrower types',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'ts-l5',
        title: 'Arrays, tuples and readonly',
        description: 'Typing lists, fixed-length tuples, and preventing mutation with readonly.',
        duration: 6,
        objectives: [
          'Write string[] and Array<string> for arrays',
          'Create a tuple with a fixed number of elements',
          'Use readonly to make arrays and tuples immutable',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'ts-l6',
        title: 'Objects, optional properties and index signatures',
        description: 'Object types, optional ? properties, and indexing when keys are dynamic.',
        duration: 6,
        objectives: [
          'Write an inline object type with required and optional fields',
          'Explain what an index signature does and when to use it',
          'Distinguish excess property checks from structural typing',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'ts-l7',
        title: 'Union and intersection types',
        description: 'Combining types with | and &, and narrowing with type guards.',
        duration: 6,
        objectives: [
          'Create a union type and narrow it with typeof',
          'Create an intersection type to merge object shapes',
          'Use a discriminant property for exhaustive narrowing',
        ],
        xp: 45,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s2',
      title: 'TypeScript Basics check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s2-q1',
          type: 'multiple-choice',
          prompt: 'Which is NOT a primitive type in TypeScript?',
          options: ['string', 'number', 'object', 'boolean'],
          answer: 2,
          explanation: 'object is a non-primitive (reference) type. The primitives are string, number, boolean, null, undefined, symbol, and bigint.',
        },
        {
          id: 'quiz-ts-s2-q2',
          type: 'true-false',
          prompt: 'TypeScript can always infer the type of a variable from its initial value.',
          answer: false,
          explanation: 'Inference works when there is an initial value. Variables declared without initialization need explicit annotations.',
        },
        {
          id: 'quiz-ts-s2-q3',
          type: 'multiple-choice',
          prompt: 'What does readonly string[] mean?',
          options: [
            'An array of strings that cannot be reassigned',
            'An array of strings whose elements cannot be changed',
            'A tuple of strings',
            'An array of readonly strings',
          ],
          answer: 1,
          explanation: 'readonly prevents mutation of the array contents (push, pop, index assignment). The variable itself can still be reassigned unless also declared const.',
        },
        {
          id: 'quiz-ts-s2-q4',
          type: 'blank',
          prompt: 'What syntax creates a tuple of exactly two elements, a string and a number?',
          answers: ['[string, number]', 'tuple<string, number>'],
          explanation: 'Tuple types use bracket syntax with comma-separated element types: [string, number].',
        },
        {
          id: 'quiz-ts-s2-q5',
          type: 'identify-error',
          prompt: 'What is the issue with this type?',
          code: 'type User = {\n  name: string\n  age?: number\n  [key: string]: any\n}',
          options: [
            'Nothing is wrong',
            'Optional property must come after index signature',
            'Index signature value type must be compatible with all properties',
            'Cannot mix optional properties with index signatures',
          ],
          answer: 2,
          explanation: 'The index signature says every property is `any`, but `name` is `string` and `age?` is `number | undefined`. The index signature value type must be a supertype of all property types.',
        },
      ],
    },
  },
]