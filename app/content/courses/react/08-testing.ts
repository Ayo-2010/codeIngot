import type { Section } from '~/types/content'

export const reactTestingSections: Section[] = [
  {
    id: 'react-s8',
    title: 'Testing',
    description: 'Testing React components with Vitest, Testing Library, and type-safe mocks.',
    lessons: [
      {
        id: 'react-l23',
        title: 'Setting up Vitest and Testing Library',
        description: 'Configuring the test runner, writing the first test, and jsdom.',
        duration: 5,
        objectives: [
          'Install and configure Vitest with Vite',
          'Write a test that renders a component with @testing-library/react',
          'Configure jsdom for DOM simulation in tests',
        ],
        xp: 35,
        content: [],
      },
      {
        id: 'react-l24',
        title: 'Testing user interactions',
        description: 'Simulating clicks, typing, and form submission with fireEvent and userEvent.',
        duration: 6,
        objectives: [
          'Render a component and find elements with a screen query',
          'Fire events and assert on the resulting DOM state',
          'Handle asynchronous behavior with waitFor and findBy',
        ],
        xp: 40,
        content: [],
      },
      {
        id: 'react-l25',
        title: 'Mocking modules and type safety',
        description: 'Replacing dependencies in tests with vi, and keeping types correct.',
        duration: 5,
        objectives: [
          'Mock a dependency module with vi.mock',
          'Create a typed mock that preserves the original interface',
          'Test components that use async data and useEffect',
        ],
        xp: 35,
        content: [],
      },
    ],
    quiz: {
      id: 'quiz-react-s8',
      title: 'Testing check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-react-s8-q1',
          type: 'multiple-choice',
          prompt: 'What does @testing-library/react encourage?',
          options: [
            'Querying by element id',
            'Querying by display value the way a user would',
            'Testing implementation details',
            'Mocking every dependency',
          ],
          answer: 1,
          explanation: 'Testing Library encourages querying as a user would: by role, text, label, etc. This makes tests resilient to refactors.',
        },
        {
          id: 'quiz-react-s8-q2',
          type: 'true-false',
          prompt: 'screen.getByRole("button") can find a button even without a test id.',
          answer: true,
          explanation: 'getByRole queries by accessible role, which is more robust than test IDs and matches how users perceive the UI.',
        },
        {
          id: 'quiz-react-s8-q3',
          type: 'multiple-choice',
          prompt: 'Which function finds elements that appear after an async action?',
          options: ['getByText', 'queryByText', 'findByText', 'waitFor'],
          answer: 2,
          explanation: 'findByText returns a promise that resolves when the element appears, retrying until it times out.',
        },
        {
          id: 'quiz-react-s8-q4',
          type: 'blank',
          prompt: 'What Testing Library function returns null instead of throwing when not found?',
          answers: ['queryByText', 'queryBy'],
          explanation: 'The query* family returns null when not found, unlike get* which throws and find* which waits.',
        },
        {
          id: 'quiz-react-s8-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this test approach?',
          code: 'const container = render(<App />)\nconst button = container.querySelector(".submit")\nbutton.click()',
          options: [
            'querySelector is slower than getBy',
            'querySelector bypasses Testing Library and should be avoided for queries',
            'It is missing an await',
            'The render result is wrong',
          ],
          answer: 1,
          explanation: 'Testing Library recommends using screen queries (getByRole, getByText) rather than container.querySelector, because the former matches how users interact.',
        },
      ],
    },
  },
]