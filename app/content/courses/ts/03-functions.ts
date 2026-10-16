import type { Section } from '~/types/content'

export const tsFunctionsSections: Section[] = [
  {
    id: 'ts-s3',
    title: 'Functions',
    description: 'Typing parameters, return values, overloads, and the this context.',
    lessons: [
      {
        id: 'ts-l8',
        title: 'Parameter and return types',
        description: 'Annotating function signatures, optional parameters, defaults, and rest parameters.',
        duration: 6,
        objectives: [
          'Write a full function signature with parameter and return types',
          'Use optional parameters and default values correctly',
          'Type a rest parameter as an array',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'ts-l9',
        title: 'Function types and callbacks',
        description: 'The function type expression, callbacks, and why void is not undefined.',
        duration: 5,
        objectives: [
          'Write a function type as a standalone type alias',
          'Type a callback that is passed to another function',
          'Explain when void return is appropriate',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'ts-l10',
        title: 'Overloads and this typing',
        description: 'Multiple call signatures for one implementation, and binding this in callbacks.',
        duration: 5,
        objectives: [
          'Declare overload signatures for a function with different arities',
          'Type this in an object method or callback',
          'Use bind or arrow functions to preserve this',
        ],
        xp: 35,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-ts-s3',
      title: 'Functions check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s3-q1',
          type: 'multiple-choice',
          prompt: 'How do you type a function that takes a string and returns a number?',
          options: [
            '(string) => number',
            'function(string): number',
            'string -> number',
            'func(string): number',
          ],
          answer: 0,
          explanation: 'The function type expression uses arrow syntax: (param: type) => returnType.',
        },
        {
          id: 'quiz-ts-s3-q2',
          type: 'true-false',
          prompt: 'A function with return type void can return undefined.',
          answer: true,
          explanation: 'void means the return value is ignored. Returning undefined is allowed; returning any other value is an error.',
        },
        {
          id: 'quiz-ts-s3-q3',
          type: 'multiple-choice',
          prompt: 'What does a rest parameter look like in a function type?',
          options: [
            '...args: string[]',
            'args: ...string[]',
            'rest: string...',
            'params: string...',
          ],
          answer: 0,
          explanation: 'Rest parameters in function types use the spread syntax before the parameter name: (...args: string[]) => void.',
        },
        {
          id: 'quiz-ts-s3-q4',
          type: 'blank',
          prompt: 'What keyword declares multiple call signatures for one function implementation?',
          answers: ['overload', 'function overload'],
          explanation: 'Function overloads let you declare multiple signatures before the single implementation.',
        },
        {
          id: 'quiz-ts-s3-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this callback type?',
          code: 'function process(callback: (x: number) => string) {}\n\nprocess((n) => n * 2)',
          options: [
            'Nothing is wrong',
            'The callback returns number but the type expects string',
            'The callback parameter needs a type annotation',
            'Arrow functions cannot be used as callbacks',
          ],
          answer: 1,
          explanation: 'The callback is typed to return string, but the arrow function returns number. The return type must match.',
        },
      ],
    },
  },
]