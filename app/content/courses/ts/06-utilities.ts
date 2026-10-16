import type { Section } from '~/types/content'

export const tsUtilitySections: Section[] = [
  {
    id: 'ts-s6',
    title: 'Utility Types',
    description: 'The built-in type transformers that save you from writing boilerplate.',
    lessons: [
      {
        id: 'ts-l17',
        title: 'Partial, Required, Readonly',
        description: 'Making all properties optional, required, or readonly at once.',
        duration: 5,
        objectives: [
          'Use Partial<T> for a patch object',
          'Use Required<T> to remove optionality',
          'Use Readonly<T> to freeze an object shape',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l18',
        title: 'Pick, Omit, Record',
        description: 'Selecting keys, dropping keys, and mapping keys to a uniform value type.',
        duration: 5,
        objectives: [
          'Use Pick<T, K> to keep only some properties',
          'Use Omit<T, K> to remove properties',
          'Use Record<K, V> for dictionary-like objects',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l19',
        title: 'Exclude, Extract, NonNullable, ReturnType',
        description: 'Filtering unions, removing null/undefined, and extracting function return types.',
        duration: 5,
        objectives: [
          'Filter a union with Exclude and Extract',
          'Strip null and undefined with NonNullable',
          'Extract the return type of a function with ReturnType',
        ],
        xp: 35,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s6',
      title: 'Utility Types check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s6-q1',
          type: 'multiple-choice',
          prompt: 'What does Partial<User> do?',
          options: [
            'Makes all properties required',
            'Makes all properties optional',
            'Removes all properties',
            'Makes all properties readonly',
          ],
          answer: 1,
          explanation: 'Partial<T> maps all properties of T to optional. Useful for update/patch objects.',
        },
        {
          id: 'quiz-ts-s6-q2',
          type: 'true-false',
          prompt: 'Omit<T, K> and Pick<T, K> are opposites.',
          answer: true,
          explanation: 'Pick keeps the listed keys; Omit removes the listed keys. Omit<T, K> === Pick<T, Exclude<keyof T, K>>.',
        },
        {
          id: 'quiz-ts-s6-q3',
          type: 'multiple-choice',
          prompt: 'What does Record<string, number> create?',
          options: [
            'An object with string keys and number values',
            'A tuple of strings and numbers',
            'A union of string and number',
            'An array of objects',
          ],
          answer: 0,
          explanation: 'Record<K, V> creates an object type where all keys are of type K and all values are of type V.',
        },
        {
          id: 'quiz-ts-s6-q4',
          type: 'blank',
          prompt: 'Which utility type removes null and undefined from a union?',
          answers: ['NonNullable<T>', 'NonNullable'],
          explanation: 'NonNullable<T> excludes null and undefined from T.',
        },
        {
          id: 'quiz-ts-s6-q5',
          type: 'identify-error',
          prompt: 'What is the type of ReturnType<() => string>?',
          options: ['string', '() => string', 'void', 'never'],
          answer: 0,
          explanation: 'ReturnType extracts the return type of a function type. For () => string, it is string.',
        },
      ],
    },
  },
]