import type { Section } from '~/types/content'

export const reactStateSections: Section[] = [
  {
    id: 'react-s3',
    title: 'State and Effects',
    description: 'Managing state with hooks, running side effects, and the rules of hooks.',
    lessons: [
      {
        id: 'react-l7',
        title: 'useState hook',
        description: 'Adding state to a function component, updating it immutably, and batching.',
        duration: 6,
        objectives: [
          'Call useState to declare and read component state',
          'Update state with the functional updater form',
          'Never mutate state directly, always replace it',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'react-l8',
        title: 'useEffect hook',
        description: 'Running side effects, the dependency array, and cleaning up.',
        duration: 6,
        objectives: [
          'Run an effect after every render, on mount only, or on dependency change',
          'Write a cleanup function for timers and subscriptions',
          'Avoid stale closures with correct dependency arrays',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'react-l9',
        title: 'Rules of hooks',
        description: 'The two rules every hook must follow, and why they matter.',
        duration: 5,
        objectives: [
          'Only call hooks at the top level, never inside loops or conditions',
          'Only call hooks from React function components or custom hooks',
          'Recognize and fix invalid hook call warnings',
        ],
        xp: 30,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-react-s3',
      title: 'State and Effects check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-react-s3-q1',
          type: 'multiple-choice',
          prompt: 'What does useState return?',
          options: [
            'A single value',
            'An array of [value, setter]',
            'An object with val and set',
            'A promise',
          ],
          answer: 1,
          explanation: 'useState returns a tuple: the current state value and a function to update it.',
        },
        {
          id: 'quiz-react-s3-q2',
          type: 'true-false',
          prompt: 'You must always modify state directly for React to detect the change.',
          answer: false,
          explanation: 'React detects changes by reference. Always create a new array or object rather than mutating the old one.',
        },
        {
          id: 'quiz-react-s3-q3',
          type: 'multiple-choice',
          prompt: 'When does useEffect run with an empty dependency array?',
          options: [
            'After every render',
            'Only on mount and only on unmount',
            'Never, it is a bug',
            'On mount and whenever the component re-renders',
          ],
          answer: 1,
          explanation: 'An empty dependency array means the effect runs on mount, and the cleanup runs on unmount.',
        },
        {
          id: 'quiz-react-s3-q4',
          type: 'blank',
          prompt: 'What is the first argument to useEffect used for?',
          answers: ['side effects', 'effects', 'the side effect function'],
          explanation: 'The first argument is a function containing the side effect logic; the second argument is the dependency array.',
        },
        {
          id: 'quiz-react-s3-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this hook usage?',
          code: 'function List({ items }) {\n  const [open, setOpen] = useState(false)\n  if (items.length > 0) {\n    useEffect(() => {}, [])\n  }\n  return ...\n}',
          options: [
            'Nothing is wrong',
            'useEffect is called conditionally, violating the rules of hooks',
            'useState should not be called before useEffect',
            'Items should not be a prop',
          ],
          answer: 1,
          explanation: 'Hooks must be called unconditionally. Calling useEffect inside an if block violates the rules of hooks and causes errors.',
        },
      ],
    },
  },
]