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
        quiz: {
          id: 'quiz-react-l23',
          title: 'Setting up Vitest and Testing Library quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l23-q1',
              type: 'blank',
              prompt: 'What Testing Library function returns null instead of throwing when not found?',
              answers: [
                'queryByText',
                'queryBy',
              ],
              explanation: 'The query* family returns null when not found, unlike get* which throws and find* which waits.',
            },
            {
              id: 'quiz-react-l23-q2',
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
            {
              id: 'quiz-react-l23-q3',
              type: 'multiple-choice',
              prompt: 'A Vite project needs a DOM for its component tests. Which config supplies one?',
              options: [
                'test: { environment: \'jsdom\' } in the Vite config',
                'environment: \'node\' in package.json',
                'A jest.config.js with testEnvironment: \'browser\'',
                'Rendering every component into an iframe inside the test',
              ],
              answer: 0,
              explanation: 'Vitest reads the Vite config, so one test block is enough to switch the environment to jsdom. Without a DOM, rendering a component that touches document fails.',
            },
            {
              id: 'quiz-react-l23-q4',
              type: 'multiple-choice',
              prompt: 'What does `render(<Button label="Submit" />)` return?',
              options: [
                'Only the HTML string produced by the component',
                'Queries plus a container, with the component mounted',
                'A promise that resolves after the first paint',
                'A reference to the component function itself',
              ],
              answer: 1,
              explanation: 'render mounts the component into the test DOM and returns helpers including queries and a container. Most tests ignore the return value and use the global screen queries instead.',
            },
            {
              id: 'quiz-react-l23-q5',
              type: 'multiple-choice',
              prompt: 'You cannot find an element by text, role or label in order to query it. What does the lesson say that usually means?',
              options: [
                'The element needs a test id added so the query can find it',
                'Testing Library cannot test this kind of component',
                'The component has too many props to render in a test',
                'The UI has a real accessibility gap that should be fixed',
              ],
              answer: 3,
              explanation: 'Queries mirror how a person finds things, so a missing role or label is a signal about the interface. Fixing the markup makes the test possible and improves the experience at the same time.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l23-d1',
            title: 'A component a test can read',
            body: 'A test renders this component and reads the text a user would see. Clicking Submit is what a user-event fires; the paragraph is what a text query matches.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h3 style={{ margin: '0 0 8px' }}>Sign in</h3>
      <button onClick={() => setSubmitted(true)}>Submit</button>
      <p style={{ margin: '8px 0 0', color: '#5b6470' }}>
        {submitted ? 'Submitted - getByText now finds this.' : 'Click Submit, then read this text.'}
      </p>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 150,
          },
          {
            type: 'text',
            id: 'react-l23-intro',
            body: '**Setting up Vitest and Testing Library.** React components are functions that return elements, so the most direct test calls the component and reads the result. For anything involving state, events or effects, the test renders the component into jsdom and asserts on what a user would see.',
          },
          {
            type: 'text',
            id: 'react-l23-b2',
            body: 'Vitest shares Vite’s config, so a project already using Vite needs one line to set the test environment to `jsdom`. React Testing Library then supplies `render` and a set of queries. The queries are the important part: they deliberately look things up the way a person does — by visible text, by role, by label — so the tests survive a refactor that renames a class.',
          },
          {
            type: 'heading',
            id: 'react-l23-h1',
            level: 2,
            body: 'A runner, a DOM, and queries that read like a user',
          },
          {
            type: 'code',
            id: 'react-l23-code',
            language: 'jsx',
            title: 'the first test',
            code: `// vitest.config.ts\n// { test: { environment: 'jsdom' } }\n\nimport { render, screen } from '@testing-library/react'\n\ntest('shows the button label', () => {\n  render(<Button label="Submit" />)\n  expect(screen.getByText('Submit')).toBeInTheDocument()\n})\n\n// Querying by role, text or label matches how a user finds things:\n// screen.getByRole('button', { name: 'Submit' })`,
          },
          {
            type: 'list',
            id: 'react-l23-list',
            style: 'bullet',
            items: [
              'Vitest reads the Vite config; `environment: ’jsdom’` gives tests a DOM.',
              '`render(<Component />)` mounts the component and returns queries plus a container.',
              'Prefer `getByRole` and `getByText` — they match the accessible UI, not the implementation.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l23-tip',
            title: 'If a query is awkward, the UI may be',
            body: 'When you cannot find an element by text, role or label, that is usually a real accessibility gap rather than a testing problem. Adding the missing role or label fixes the test and the experience at once.',
          },
          {
            type: 'heading',
            id: 'react-l23-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l23-b3',
            body: 'Write the lookup behind a text query: find the element whose text matches exactly.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l23-x1',
            exercise: {
              id: 'ex-react-l23',
              instructions:
                'Write byText(elements, text) returning the first element whose text property equals the given string exactly, or null when none matches. Elements look like { text }.',
              languages: ['javascript'],
              files: [
                {
                  path: 'queries.js',
                  language: 'javascript',
                  content: `// Find an element by its exact text, like screen.getByText.\nexport function byText(elements, text) {\n  return null\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l23-t1',
                  label: 'finds an element by its text',
                  body: "return byText([{ text: 'Submit' }], 'Submit') !== null",
                },
                {
                  id: 'ex-react-l23-t2',
                  label: 'returns the element itself',
                  body: "return byText([{ text: 'Submit' }], 'Submit').text === 'Submit'",
                },
                {
                  id: 'ex-react-l23-t3',
                  label: 'a partial match is not a match',
                  body: "return byText([{ text: 'Sub' }], 'Submit') === null",
                },
                {
                  id: 'ex-react-l23-t4',
                  label: 'picks the right one from several',
                  body: "return byText([{ text: 'A' }, { text: 'B' }], 'B').text === 'B'",
                },
                {
                  id: 'ex-react-l23-t5',
                  label: 'the first matching element is returned',
                  body: "const els = [{ text: 'A' }, { text: 'A' }]; return byText(els, 'A') === els[0]",
                },
              ],
              hints: [
                'find returns the first element that satisfies the test.',
                'Compare the text exactly — no substring matching.',
                'Convert the missing case: find gives undefined, but the tests want null.',
              ],
              solutionFiles: [
                {
                  path: 'queries.js',
                  language: 'javascript',
                  content: `export function byText(elements, text) {\n  return elements.find((element) => element.text === text) ?? null\n}\n`,
                },
              ],
              testNotes:
                'The partial-match check separates exact matching from a substring search, and the duplicate check pins down first-match.',
            },
          },
        ],
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
        quiz: {
          id: 'quiz-react-l24',
          title: 'Testing user interactions quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l24-q1',
              type: 'true-false',
              prompt: 'screen.getByRole("button") can find a button even without a test id.',
              answer: true,
              explanation: 'getByRole queries by accessible role, which is more robust than test IDs and matches how users perceive the UI.',
            },
            {
              id: 'quiz-react-l24-q2',
              type: 'multiple-choice',
              prompt: 'Which function finds elements that appear after an async action?',
              options: [
                'getByText',
                'queryByText',
                'findByText',
                'waitFor',
              ],
              answer: 2,
              explanation: 'findByText returns a promise that resolves when the element appears, retrying until it times out.',
            },
            {
              id: 'quiz-react-l24-q3',
              type: 'multiple-choice',
              prompt: 'Why must `await user.type(...)` and `await user.click(...)` be awaited?',
              options: [
                'They return promises and dispatch their events asynchronously',
                'They throw synchronously if the element is missing',
                'They only work when called inside waitFor',
                'They return the updated DOM element',
              ],
              answer: 0,
              explanation: 'userEvent queues the keystrokes and clicks and resolves when they have been dispatched. Without awaiting, the assertion can run before the events have updated the DOM.',
            },
            {
              id: 'quiz-react-l24-q4',
              type: 'multiple-choice',
              prompt: 'What is the difference between `findByText` and `waitFor`?',
              options: [
                'findByText is synchronous, while waitFor returns a promise',
                'findByText throws immediately, while waitFor returns null',
                'findByText waits for an element to appear, while waitFor retries any assertion until it passes',
                'They are two names for exactly the same helper',
              ],
              answer: 2,
              explanation: 'findBy* is a query that retries until the element exists; waitFor wraps an arbitrary assertion and retries that. Use findBy* for an element and waitFor for other conditions.',
            },
            {
              id: 'quiz-react-l24-q5',
              type: 'multiple-choice',
              prompt: 'A test types "Write the plan", clicks Add, and should confirm the task was added. Which assertion reads the result the way a user would?',
              options: [
                'expect(component.state.tasks).toHaveLength(1)',
                'expect(document.querySelector(\'li\').value).toBe(1)',
                'expect(add).toHaveBeenCalled()',
                'expect(screen.getByText(\'Write the plan\')).toBeInTheDocument()',
              ],
              answer: 3,
              explanation: 'The valuable assertion is on the visible result: the new text is on screen. Checking internal state or call counts ties the test to implementation details that may change.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l24-d1',
            title: 'Type, click, see the item appear',
            body: 'This is the flow an interaction test drives: type into the field, click Add, then assert the new item is on screen.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])

  function add() {
    if (text.trim() === '') return
    setTasks([...tasks, text])
    setText('')
  }

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <input
        aria-label="New task"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="New task"
      />
      <button onClick={add} style={{ marginLeft: 6 }}>Add</button>
      <ul style={{ margin: '8px 0 0', paddingLeft: 18 }}>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 190,
          },
          {
            type: 'text',
            id: 'react-l24-intro',
            body: '**Testing user interactions.** The valuable tests exercise a flow: type into a field, click a button, and check what the user is left looking at. They describe behaviour rather than implementation, so they keep passing when the internals change.',
          },
          {
            type: 'text',
            id: 'react-l24-b2',
            body: '`userEvent` simulates a person more faithfully than a bare event: typing fires the keystrokes and the change events a real input would. Assertions then read the DOM — the text that appeared, the value in the field. When something arrives asynchronously, `findBy*` waits for it instead of asserting too early.',
          },
          {
            type: 'heading',
            id: 'react-l24-h1',
            level: 2,
            body: 'Type, click, then read what the user sees',
          },
          {
            type: 'code',
            id: 'react-l24-code',
            language: 'jsx',
            title: 'an interaction test',
            code: `import { render, screen } from '@testing-library/react'\nimport userEvent from '@testing-library/user-event'\n\ntest('adding a task shows it in the list', async () => {\n  const user = userEvent.setup()\n  render(<TaskApp />)\n\n  await user.type(screen.getByLabelText('New task'), 'Write the plan')\n  await user.click(screen.getByRole('button', { name: 'Add' }))\n\n  expect(screen.getByText('Write the plan')).toBeInTheDocument()\n})\n\n// For anything that arrives later, wait for it:\n// const item = await screen.findByText('Write the plan')`,
          },
          {
            type: 'list',
            id: 'react-l24-list',
            style: 'bullet',
            items: [
              'Test a flow, then assert on the DOM the user would see — not on component state.',
              '`userEvent.type` and `userEvent.click` are async, so await them.',
              '`findBy*` retries until the element appears; `waitFor` does the same for other assertions.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l24-tip',
            title: 'One flow per test',
            body: 'A test named after a single user goal ("adding a task shows it in the list") tells you what broke when it fails. Tests that do five things leave you guessing.',
          },
          {
            type: 'heading',
            id: 'react-l24-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l24-b3',
            body: 'Model a keystroke the way a simulated user produces one, including the keys that do not add text.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l24-x1',
            exercise: {
              id: 'ex-react-l24',
              instructions:
                "Write typeInto(text, key) returning the field's text after the keystroke. A single-character key is appended; 'Backspace' removes the last character; any other named key such as 'Enter' leaves the text unchanged.",
              languages: ['javascript'],
              files: [
                {
                  path: 'typing.js',
                  language: 'javascript',
                  content: `// Apply one keystroke to the field text.\nexport function typeInto(text, key) {\n  return text\n}\n`,
                },
              ],
              tests: [
                { id: 'ex-react-l24-t1', label: 'a character is appended', body: "return typeInto('Wri', 't') === 'Writ'" },
                {
                  id: 'ex-react-l24-t2',
                  label: 'typing builds up the text',
                  body: "return typeInto(typeInto('', 'a'), 'b') === 'ab'",
                },
                {
                  id: 'ex-react-l24-t3',
                  label: 'backspace removes the last character',
                  body: "return typeInto('Writ', 'Backspace') === 'Wri'",
                },
                {
                  id: 'ex-react-l24-t4',
                  label: 'backspace on an empty field does nothing',
                  body: "return typeInto('', 'Backspace') === ''",
                },
                {
                  id: 'ex-react-l24-t5',
                  label: 'a named key does not change the text',
                  body: "return typeInto('Writ', 'Enter') === 'Writ'",
                },
              ],
              hints: [
                'Handle Backspace first — it is the special case.',
                'Remove the last character with text.slice(0, -1), which is safe on an empty string.',
                'Otherwise append only when the key is a single character; named keys like Enter are ignored.',
              ],
              solutionFiles: [
                {
                  path: 'typing.js',
                  language: 'javascript',
                  content: `export function typeInto(text, key) {\n  if (key === 'Backspace') return text.slice(0, -1)\n  if (key.length === 1) return text + key\n  return text\n}\n`,
                },
              ],
              testNotes:
                'The empty-backspace and named-key checks catch implementations that assume a character is always present.',
            },
          },
        ],
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
        quiz: {
          id: 'quiz-react-l25',
          title: 'Mocking modules and type safety quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l25-q1',
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
              id: 'quiz-react-l25-q2',
              type: 'multiple-choice',
              prompt: 'What does `vi.mock(\'./api\', factory)` do?',
              options: [
                'Replaces the module with the factory exports for the whole test file',
                'Spies on one function without changing its behaviour',
                'Mocks the module only for the next test() call',
                'Downloads a stub version of the module from the registry',
              ],
              answer: 0,
              explanation: 'vi.mock is hoisted and applies to every import of that path in the file. The factory supplies the replacement exports, which is how a component can receive fixed data.',
            },
            {
              id: 'quiz-react-l25-q3',
              type: 'multiple-choice',
              prompt: 'What is `vi.fn()` useful for in a test?',
              options: [
                'Freezing a mocked module so it cannot be changed',
                'Converting a promise into a synchronous value',
                'Recording the calls and arguments so the test can assert on them',
                'Generating a random implementation for the mock',
              ],
              answer: 2,
              explanation: 'A vi.fn() mock keeps a record of every call, which allows assertions such as toHaveBeenCalledTimes. It can also be given a fixed return value or implementation.',
            },
            {
              id: 'quiz-react-l25-q4',
              type: 'multiple-choice',
              prompt: 'Why should a mock be typed against the real module interface?',
              options: [
                'So the mock runs faster than the real module',
                'So vi.mock can skip importing the real file at all',
                'So the compiler catches the mock drifting when the real shape changes',
                'So the test can omit its assertions',
              ],
              answer: 2,
              explanation: 'A mock that no longer matches the real module keeps tests green while the app breaks. Typing it against the real interface turns that drift into a compile error.',
            },
            {
              id: 'quiz-react-l25-q5',
              type: 'multiple-choice',
              prompt: 'Which helper makes a mocked async function resolve with given data?',
              options: [
                'vi.fn().mockReturn(data)',
                'vi.async(data)',
                'vi.fn().mockResolvedValue(data)',
                'vi.resolve(data)',
              ],
              answer: 2,
              explanation: 'mockResolvedValue returns a promise that resolves with the value, matching a real async dependency. mockReturn would hand the component a plain value where a promise is expected.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l25-d1',
            title: 'A controlled stand-in for the data',
            body: 'The component asks a module for data and renders what it returns. A test replaces that module with a mock holding fixed data, which is the stand-in shown here.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState, useEffect } from 'react'

// A stand-in for the real ./api module a test would mock.
function fetchTasks() {
  return Promise.resolve([{ id: '1', title: 'Write the plan' }])
}

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data)
      setLoading(false)
    })
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      {loading ? (
        <p style={{ margin: 0 }}>Loading...</p>
      ) : (
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 140,
          },
          {
            type: 'text',
            id: 'react-l25-intro',
            body: '**Mocking modules and type safety.** A component that fetches data depends on the network, which makes its test slow and unreliable. Replacing that one module with a controlled stand-in keeps the test fast and lets you state exactly what the component will receive.',
          },
          {
            type: 'text',
            id: 'react-l25-b2',
            body: '`vi.mock` replaces a module for the whole file, and `vi.fn()` makes a function that records how it was called — which is how you assert that the component asked for what it should. Keeping the mock’s shape the same as the real module is what stops the mock from agreeing with a bug in the component. End-to-end tools cover what unit tests cannot: real routing, real network, real layout.',
          },
          {
            type: 'heading',
            id: 'react-l25-h1',
            level: 2,
            body: 'Replace the dependency, keep the shape',
          },
          {
            type: 'code',
            id: 'react-l25-code',
            language: 'javascript',
            title: 'mocking a module and asserting on the call',
            code: `// Replace ./api for this test file only:\nvi.mock('./api', () => ({\n  fetchTasks: vi.fn().mockResolvedValue([{ id: '1', title: 'Write' }]),\n}))\n\ntest('renders the tasks it fetched', async () => {\n  render(<TaskList />)\n  expect(await screen.findByText('Write')).toBeInTheDocument()\n})\n\n// vi.fn() records calls, so the interaction can be asserted too:\n// expect(fetchTasks).toHaveBeenCalledTimes(1)\n\n// End-to-end runners (Playwright, Cypress) cover the real-browser paths:\n// page.goto('/'); await page.getByRole('button', { name: 'Add' }).click()`,
          },
          {
            type: 'list',
            id: 'react-l25-list',
            style: 'bullet',
            items: [
              '`vi.mock(path, factory)` replaces a module with your own implementation.',
              '`vi.fn()` records arguments and calls, so a test can assert on them.',
              'Unit tests cover logic in isolation; end-to-end tests cover the wiring only a real browser exercises.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l25-warn',
            title: 'A mock that drifts is worse than no mock',
            body: 'If the real module changes shape and the mock does not, the tests keep passing while the app breaks. Type the mock against the real interface where you can, so the compiler notices.',
          },
          {
            type: 'heading',
            id: 'react-l25-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l25-b3',
            body: 'Build the recording stand-in that `vi.fn()` gives you.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l25-x1',
            exercise: {
              id: 'ex-react-l25',
              instructions:
                'Write createMock(impl) returning an object with a mock(...args) function and a calls array. Calling mock records the argument list in calls and returns whatever impl returns for those arguments.',
              languages: ['javascript'],
              files: [
                {
                  path: 'mock.js',
                  language: 'javascript',
                  content: `// A stand-in that records how it was called.\nexport function createMock(impl) {\n  const calls = []\n\n  function mock(...args) {\n    // TODO: record the call, then delegate.\n    return impl()\n  }\n\n  return { mock, calls }\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l25-t1',
                  label: 'returns the implementation result',
                  body: 'const m = createMock((a, b) => a + b); return m.mock(1, 2) === 3',
                },
                {
                  id: 'ex-react-l25-t2',
                  label: 'records each call',
                  body: "const m = createMock(() => null); m.mock('a'); m.mock('b', 'c'); return m.calls.length === 2",
                },
                {
                  id: 'ex-react-l25-t3',
                  label: 'records the arguments in order',
                  body: "const m = createMock(() => null); m.mock('x', 1); return JSON.stringify(m.calls[0]) === '[\\\"x\\\",1]'",
                },
                {
                  id: 'ex-react-l25-t4',
                  label: 'the recorded arguments match the call',
                  body: "const m = createMock((n) => n * 2); const result = m.mock(4); return result === 8 && JSON.stringify(m.calls[0]) === '[4]'",
                },
              ],
              hints: [
                'Record the arguments before delegating, so a throwing implementation still leaves a trace.',
                'args is already an array of the arguments the mock received.',
                'Push args into calls, then return impl(...args).',
              ],
              solutionFiles: [
                {
                  path: 'mock.js',
                  language: 'javascript',
                  content: `export function createMock(impl) {\n  const calls = []\n\n  function mock(...args) {\n    calls.push(args)\n    return impl(...args)\n  }\n\n  return { mock, calls }\n}\n`,
                },
              ],
              testNotes:
                'The argument checks compare the recorded arrays exactly, so a mock that records only the count fails.',
            },
          },
        ],
      },
    ],
  },
]
