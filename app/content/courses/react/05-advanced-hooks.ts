import type { Section } from '~/types/content'

export const reactAdvancedHooksSections: Section[] = [
  {
    id: 'react-s5',
    title: 'Advanced Hooks',
    description: 'Context, useReducer, useMemo, useCallback, and useRef.',
    lessons: [
      {
        id: 'react-l13',
        title: 'useContext for shared state',
        description: 'Passing data through the component tree without prop drilling.',
        duration: 6,
        objectives: [
          'Create a context with createContext',
          'Provide values with Context.Provider',
          'Consume context with useContext in any descendant',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l13',
          title: 'useContext for shared state quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l13-q1',
              type: 'multiple-choice',
              prompt: 'When should you use useContext?',
              options: [
                'When a prop needs to reach deeply nested components',
                'When you want to store local state',
                'When you want to optimize rendering',
                'When you need to fetch data',
              ],
              answer: 0,
              explanation: 'Context solves prop drilling: when a value is needed by many components at different levels, context avoids passing it through every intermediate component.',
            },
            {
              id: 'quiz-react-l13-q2',
              type: 'multiple-choice',
              prompt: 'When is the default value passed to `createContext(\'light\')` actually used?',
              options: [
                'Whenever a component calls `useContext`',
                'Only when the provider value is an empty string',
                'When a consumer has no matching provider above it',
                'Only during the first render of the consumer',
              ],
              answer: 2,
              explanation: 'The default is the fallback for consumers with no provider above them. Once a provider exists, its `value` prop wins regardless of the default.',
            },
            {
              id: 'quiz-react-l13-q3',
              type: 'multiple-choice',
              prompt: 'Two providers for the same context are nested around a consumer. Which value does `useContext` return?',
              options: [
                'The outermost provider’s value',
                'The nearest provider’s value — the innermost one above the consumer',
                'The value passed to `createContext`',
                'An array containing both provider values',
              ],
              answer: 1,
              explanation: 'React resolves context by walking up to the closest provider, so an inner provider can override an outer one for its subtree.',
            },
            {
              id: 'quiz-react-l13-q4',
              type: 'true-false',
              prompt: 'Context stores the shared state itself, so using it removes the need for `useState`.',
              answer: false,
              explanation: 'Context only transports a value down the tree. The state still lives in a `useState` or `useReducer` above the provider, and context delivers it.',
            },
            {
              id: 'quiz-react-l13-q5',
              type: 'multiple-choice',
              prompt: 'A provider’s `value` prop changes. What happens to components that call `useContext` for that context?',
              options: [
                'They re-render with the new value',
                'Nothing happens until they are remounted',
                'Only the provider’s direct children re-render',
                'React throws because context values must stay stable',
              ],
              answer: 0,
              explanation: 'Consumers subscribe to the nearest provider, so a new value re-renders every component that reads it — even ones several levels below.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l13-d1',
            title: 'Provide high, read low',
            body: 'The button reads the theme straight from context. No prop is passed through the component in between.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext('light')

function ThemeButton() {
  const theme = useContext(ThemeContext)
  const dark = theme === 'dark'
  return (
    <button
      style={{
        background: dark ? '#1e293b' : '#e2e8f0',
        color: dark ? '#f8fafc' : '#0f172a',
        padding: '6px 12px',
        border: 'none',
        borderRadius: 6,
      }}
    >
      Theme: {theme}
    </button>
  )
}

export default function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme}>
      <div style={{ display: 'grid', gap: 8 }}>
        <ThemeButton />
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
          Toggle
        </button>
      </div>
    </ThemeContext.Provider>
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
            id: 'react-l13-intro',
            body: '**useContext for shared state.** Props travel one level at a time, so a value needed three levels down has to be passed through every component in between — the problem known as prop drilling. Context solves it: a value is provided high in the tree and read directly by any descendant.',
          },
          {
            type: 'text',
            id: 'react-l13-b2',
            body: 'A context is created once, with a default value, and given a value by a `Provider`. Components read it with `useContext` and re-render when the provided value changes. Providers nest, and the *nearest* one above the consumer wins — which is how a subtree can override a theme or a locale.',
          },
          {
            type: 'heading',
            id: 'react-l13-h1',
            level: 2,
            body: 'Provide high, read low',
          },
          {
            type: 'code',
            id: 'react-l13-code',
            language: 'jsx',
            title: 'a theme context',
            code: `export const ThemeContext = createContext('light')   // the default\n\nexport default function App() {\n  return (\n    <ThemeContext.Provider value="dark">\n      <Toolbar />\n    </ThemeContext.Provider>\n  )\n}\n\n// Toolbar is somewhere below App and receives no theme prop.\nfunction Toolbar() {\n  const theme = useContext(ThemeContext)\n  return <button className={theme}>Save</button>\n}\n\n// Nesting providers: the nearest one wins for the components inside it.`,
          },
          {
            type: 'list',
            id: 'react-l13-list',
            style: 'bullet',
            items: [
              '`createContext(defaultValue)` makes the context; the default is used when there is no provider.',
              '`Context.Provider value={...}` supplies the value to everything inside it.',
              '`useContext(Context)` reads the nearest provided value — no props in between.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l13-tip',
            title: 'Context is not a state manager',
            body: 'Context only carries a value down the tree. The state itself still lives in a `useState` or `useReducer`, usually one level above the provider — context is how that state is delivered.',
          },
          {
            type: 'heading',
            id: 'react-l13-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l13-b3',
            body: 'Write the rule React follows when several providers are nested around a consumer.',
          },
          {
            type: 'exercise',
            id: 'react-l13-x1',
            exercise: {
              id: 'ex-react-l13',
              instructions:
                'Write resolveTheme(providers, fallback) returning the value a consumer sees. providers is ordered outermost first, so the innermost (last) value wins; when there are no providers, return the fallback.',
              languages: ['javascript'],
              files: [
                {
                  path: 'theme.js',
                  language: 'javascript',
                  content: `// Providers are ordered outermost to innermost.\nexport function resolveTheme(providers, fallback) {\n  return fallback\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l13-t1',
                  label: 'the innermost provider wins',
                  body: "return resolveTheme(['light', 'dark'], 'system') === 'dark'",
                },
                {
                  id: 'ex-react-l13-t2',
                  label: 'with no providers the default is used',
                  body: "return resolveTheme([], 'system') === 'system'",
                },
                {
                  id: 'ex-react-l13-t3',
                  label: 'a single provider supplies its value',
                  body: "return resolveTheme(['dark'], 'system') === 'dark'",
                },
                {
                  id: 'ex-react-l13-t4',
                  label: 'the last of several is the nearest',
                  body: "return resolveTheme(['a', 'b', 'c'], 'x') === 'c'",
                },
              ],
              hints: [
                'The array is ordered from the outermost provider to the innermost.',
                'The nearest provider to the consumer is the last one in the array.',
                'Return the last element, or the fallback when the array is empty.',
              ],
              solutionFiles: [
                {
                  path: 'theme.js',
                  language: 'javascript',
                  content: `export function resolveTheme(providers, fallback) {\n  return providers.length > 0 ? providers[providers.length - 1] : fallback\n}\n`,
                },
              ],
              testNotes:
                'The ordering checks are what distinguish "nearest wins" from a first-match implementation.',
            },
          },
        ],
      },
      {
        id: 'react-l14',
        title: 'useReducer for state logic',
        description: 'Managing complex state with a reducer function and dispatch.',
        duration: 6,
        objectives: [
          'Define a reducer with a switch statement',
          'Dispatch actions to update state',
          'Explain when to use useReducer instead of useState',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l14',
          title: 'useReducer for state logic quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l14-q1',
              type: 'true-false',
              prompt: 'useReducer is always better than useState.',
              answer: false,
              explanation: 'useReducer adds complexity. Use it when state logic is complex or involves multiple sub-values, not for simple booleans.',
            },
            {
              id: 'quiz-react-l14-q2',
              type: 'multiple-choice',
              prompt: 'A reducer receives an action type it does not recognise. What should it return?',
              options: [
                '`null`',
                '`undefined`',
                'The initial state',
                'The current state unchanged',
              ],
              answer: 3,
              explanation: 'A reducer must be total: the `default` case returns the state it was given, so an unexpected action has no effect instead of wiping out state.',
            },
            {
              id: 'quiz-react-l14-q3',
              type: 'multiple-choice',
              prompt: 'What does `useReducer(reducer, initial)` return?',
              options: [
                'The next state only',
                'A `[state, dispatch]` pair',
                'The reducer function and its initial state',
                'A `[dispatch, state]` pair',
              ],
              answer: 1,
              explanation: 'The hook returns the current state first and the `dispatch` function second, which is the order the array destructuring in the examples relies on.',
            },
            {
              id: 'quiz-react-l14-q4',
              type: 'multiple-choice',
              prompt: 'Which situation best justifies `useReducer` over `useState`?',
              options: [
                'Several related fields changed by named actions with their own rules',
                'A single boolean that toggles a panel',
                'The value of a text input',
                'A value that never changes after mount',
              ],
              answer: 0,
              explanation: 'Reducers pay off when the next state depends on multiple pieces of the current state and updates have names. A lone boolean is simpler with `useState`.',
            },
            {
              id: 'quiz-react-l14-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this reducer?',
              code: 'function reducer(state, action) {\n  switch (action.type) {\n    case \'add\':\n      return state + action.amount\n  }\n}',
              options: [
                'It mutates the state object',
                'There is no `default` case, so an unknown action returns `undefined`',
                'A reducer cannot use a `switch` statement',
                'It reads `action.amount` instead of `state.amount`',
              ],
              answer: 1,
              explanation: 'Falling out of the switch returns `undefined`, which React would treat as the new state. The `default` case should return `state` unchanged.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l14-d1',
            title: 'A counter reducer, live',
            body: 'Every button dispatches a named action. The reducer decides what each name means, and an unknown action changes nothing.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useReducer } from 'react'

const initial = 0

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return initial
    default:
      return state
  }
}

export default function App() {
  const [count, dispatch] = useReducer(reducer, initial)
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <strong style={{ fontSize: 22 }}>Count: {count}</strong>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
        <button onClick={() => dispatch({ type: 'reset' })}>reset</button>
      </div>
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
            id: 'react-l14-intro',
            body: '**useReducer for state logic.** When state updates have names and rules — increment, add, remove, reset — a reducer puts those rules in one place. `useReducer(reducer, initial)` returns the current state and a `dispatch` function.',
          },
          {
            type: 'text',
            id: 'react-l14-b2',
            body: 'The reducer is a pure function: `(state, action) => nextState`. Components dispatch *what happened* and stay free of update logic, which makes the rules easy to read, test, and share. Reach for it when the next state depends on several pieces of the current one; a single boolean is still simpler with `useState`.',
          },
          {
            type: 'heading',
            id: 'react-l14-h1',
            level: 2,
            body: 'Name the actions, centralise the rules',
          },
          {
            type: 'code',
            id: 'react-l14-code',
            language: 'jsx',
            title: 'a counter reducer',
            code: `import { useReducer } from 'react'\n\nconst initialState = 0\n\nexport function counterReducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return state + 1\n    case 'decrement':\n      return state - 1\n    case 'reset':\n      return initialState\n    default:\n      return state          // an unknown action changes nothing\n  }\n}\n\nexport default function Counter() {\n  const [count, dispatch] = useReducer(counterReducer, initialState)\n  return (\n    <button onClick={() => dispatch({ type: 'increment' })}>{count}</button>\n  )\n}`,
          },
          {
            type: 'list',
            id: 'react-l14-list',
            style: 'bullet',
            items: [
              'The reducer takes `(state, action)` and returns the next state — it never mutates.',
              '`dispatch({ type: ’increment’ })` sends an action; the reducer decides what it means.',
              'An unrecognised action should return the current state, so the reducer is total.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l14-tip',
            title: 'Test the reducer, not the component',
            body: 'A reducer is a pure function, so it can be tested with plain calls — no renderer, no DOM. Putting update logic in a reducer is often the easiest way to make it verifiable.',
          },
          {
            type: 'heading',
            id: 'react-l14-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l14-b3',
            body: 'Implement the counter reducer with its three actions and a safe default.',
          },
          {
            type: 'exercise',
            id: 'react-l14-x1',
            exercise: {
              id: 'ex-react-l14',
              instructions:
                "Write counterReducer(state, action) where state is a number. 'increment' adds one, 'decrement' subtracts one, 'reset' returns 0, and any other action returns the state unchanged.",
              languages: ['javascript'],
              files: [
                {
                  path: 'counter.js',
                  language: 'javascript',
                  content: `// state is a number: increment, decrement, reset.\nexport function counterReducer(state, action) {\n  return state\n}\n`,
                },
              ],
              tests: [
                { id: 'ex-react-l14-t1', label: 'increment adds one', body: "return counterReducer(0, { type: 'increment' }) === 1" },
                {
                  id: 'ex-react-l14-t2',
                  label: 'decrement subtracts one',
                  body: "return counterReducer(1, { type: 'decrement' }) === 0",
                },
                { id: 'ex-react-l14-t3', label: 'reset returns to zero', body: "return counterReducer(5, { type: 'reset' }) === 0" },
                {
                  id: 'ex-react-l14-t4',
                  label: 'an unknown action changes nothing',
                  body: "return counterReducer(3, { type: 'explode' }) === 3",
                },
              ],
              hints: [
                'Switch on action.type, exactly as in the example.',
                'Each case returns the next number; increment is state + 1.',
                'The default case returns the state unchanged, so the reducer never corrupts on an unknown action.',
              ],
              solutionFiles: [
                {
                  path: 'counter.js',
                  language: 'javascript',
                  content: `export function counterReducer(state, action) {\n  switch (action.type) {\n    case 'increment':\n      return state + 1\n    case 'decrement':\n      return state - 1\n    case 'reset':\n      return 0\n    default:\n      return state\n  }\n}\n`,
                },
              ],
              testNotes:
                'The unknown-action check is the one that catches a reducer written as a chain of ifs without a fallback.',
            },
          },
        ],
      },
      {
        id: 'react-l15',
        title: 'useMemo and useCallback',
        description: 'Preventing unnecessary recomputations and function recreations.',
        duration: 5,
        objectives: [
          'Memoize expensive calculations with useMemo',
          'Prevent child re-renders with useCallback',
          'Explain the dependency arrays for each hook',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l15',
          title: 'useMemo and useCallback quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l15-q1',
              type: 'identify-error',
              prompt: 'What is wrong with this useMemo usage?',
              code: 'const filtered = useMemo(\n  () => items.filter(expensiveCheck),\n  [items]\n)',
              options: [
                'Nothing is wrong',
                'expensiveCheck is not in the dependency array',
                'useMemo should not be used for filtering',
                'The function should not take arguments',
              ],
              answer: 1,
              explanation: 'If expensiveCheck depends on outer variables, they must be in the dependency array. Otherwise stale values cause subtle bugs.',
            },
            {
              id: 'quiz-react-l15-q2',
              type: 'multiple-choice',
              prompt: 'What does `useMemo(compute, deps)` return?',
              options: [
                'The memoised function itself',
                'A ref whose `current` holds the result',
                'The cached result of `compute`',
                'A boolean saying whether it recomputed',
              ],
              answer: 2,
              explanation: '`useMemo` invokes the function and hands back its return value, replaying it only when a dependency changes. `useCallback` is the one that returns the function.',
            },
            {
              id: 'quiz-react-l15-q3',
              type: 'multiple-choice',
              prompt: 'Why does an inline object literal in a dependency array defeat memoisation?',
              options: [
                '`Object.is` compares by reference, and a new literal is a new reference every render',
                'Objects are not allowed as dependencies',
                '`useMemo` only accepts primitive dependencies',
                'React deep-clones dependencies before comparing them',
              ],
              answer: 0,
              explanation: 'Dependencies are compared with `Object.is`, which is reference equality for objects. A literal created during render never compares equal to the previous one.',
            },
            {
              id: 'quiz-react-l15-q4',
              type: 'multiple-choice',
              prompt: 'When is wrapping a calculation in `useMemo` a poor choice?',
              options: [
                'When the calculation is expensive and runs on every keystroke',
                'When its result is passed to a memoised child',
                'When the calculation is cheap and the memo only adds cost and noise',
                'When its dependencies are primitives',
              ],
              answer: 2,
              explanation: 'A memo has its own cost — storing a value and comparing dependencies. For cheap work that overhead outweighs the saving, so measure before adding one.',
            },
            {
              id: 'quiz-react-l15-q5',
              type: 'multiple-choice',
              prompt: '`useCallback(handleSelect, [doSelect])` is passed to a child wrapped in `React.memo`. Why does that help?',
              options: [
                'It runs `handleSelect` less often',
                'It memoises the child’s rendered output',
                'It makes `handleSelect` asynchronous',
                'It keeps the function’s identity stable so the child’s props compare equal',
              ],
              answer: 3,
              explanation: 'A `memo` child skips re-rendering when its props are shallowly equal. A stable function reference keeps the callback prop equal between renders; the callback still runs whenever it is called.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l15-d1',
            title: 'A memoised filter and a stable callback',
            body: 'The filtered list is recomputed with **useMemo** only when the query changes, and the clear button uses a callback that keeps its identity.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useCallback, useMemo, useState } from 'react'

const items = ['Apple', 'Banana', 'Cherry', 'Apricot']

export default function App() {
  const [query, setQuery] = useState('')

  const visible = useMemo(
    () => items.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  const clear = useCallback(() => setQuery(''), [])

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Filter fruit"
      />
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {visible.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <button onClick={clear}>Clear</button>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 210,
          },
          {
            type: 'text',
            id: 'react-l15-intro',
            body: '**useMemo and useCallback.** Both hooks remember something between renders. `useMemo` remembers a computed value and recomputes it only when its dependencies change. `useCallback` does the same for a function, handing back the same reference until a dependency changes.',
          },
          {
            type: 'text',
            id: 'react-l15-b2',
            body: 'The dependencies are compared with `Object.is`, so a freshly created array or object always counts as a change. That is the whole mechanism: cache the value, compare the inputs, recompute when they differ. These are performance tools, not correctness tools — reach for them when a render is measurably doing work it does not need to do.',
          },
          {
            type: 'heading',
            id: 'react-l15-h1',
            level: 2,
            body: 'Cache a value, cache a callback',
          },
          {
            type: 'code',
            id: 'react-l15-code',
            language: 'jsx',
            title: 'memoised value and stable callback',
            code: `import { useCallback, useMemo } from 'react'\n\nexport default function TaskList({ items, query }) {\n  // Recomputed only when items or query change:\n  const visible = useMemo(\n    () => items.filter((item) => item.name.includes(query)),\n    [items, query],\n  )\n\n  // The same function reference until doSelect changes:\n  const handleSelect = useCallback((id) => doSelect(id), [doSelect])\n\n  return (\n    <ul>\n      {visible.map((item) => (\n        <li key={item.id} onClick={() => handleSelect(item.id)}>{item.name}</li>\n      ))}\n    </ul>\n  )\n}`,
          },
          {
            type: 'list',
            id: 'react-l15-list',
            style: 'bullet',
            items: [
              '`useMemo(fn, deps)` returns the cached result of `fn`, calling it again only when deps change.',
              '`useCallback(fn, deps)` returns a memoised `fn` — useful when passing it to a memoised child.',
              'Both use `Object.is` per dependency, so inline objects and arrays defeat the memo.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l15-warn',
            title: 'Do not memoise by reflex',
            body: 'A memo has its own cost: storing the value and comparing the dependencies. Adding `useMemo` around cheap calculations usually makes code harder to read for no measurable gain. Measure first.',
          },
          {
            type: 'heading',
            id: 'react-l15-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l15-b3',
            body: 'Build the cache underneath `useMemo`: keep the last dependencies and value, and recompute only when the dependencies change.',
          },
          {
            type: 'exercise',
            id: 'react-l15-x1',
            exercise: {
              id: 'ex-react-l15',
              instructions:
                'Complete memoCache() so run(deps, compute) calls compute only when deps differ from the previous call, and returns the cached value otherwise. The first call always computes.',
              languages: ['javascript'],
              files: [
                {
                  path: 'memoCache.js',
                  language: 'javascript',
                  content: `// A tiny useMemo: recompute only when the dependencies change.\nexport function memoCache() {\n  let lastDeps = null\n  let lastValue\n\n  return {\n    run(deps, compute) {\n      // TODO: compare deps with lastDeps, recompute when they differ.\n      return compute()\n    },\n  }\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l15-t1',
                  label: 'equal dependencies reuse the cached value',
                  body: "let calls = 0; const cache = memoCache(); const first = cache.run([1], () => { calls++; return 'a' }); const second = cache.run([1], () => { calls++; return 'b' }); return calls === 1 && first === 'a' && second === 'a'",
                },
                {
                  id: 'ex-react-l15-t2',
                  label: 'changed dependencies recompute',
                  body: "let calls = 0; const cache = memoCache(); cache.run([1], () => { calls++; return 'a' }); const second = cache.run([2], () => { calls++; return 'b' }); return calls === 2 && second === 'b'",
                },
                {
                  id: 'ex-react-l15-t3',
                  label: 'the first call always computes',
                  body: "let calls = 0; const cache = memoCache(); cache.run([], () => { calls++; return 'x' }); return calls === 1",
                },
                {
                  id: 'ex-react-l15-t4',
                  label: 'equal-looking objects still count as a change',
                  body: "let calls = 0; const cache = memoCache(); cache.run([{ a: 1 }], () => { calls++; return 1 }); cache.run([{ a: 1 }], () => { calls++; return 2 }); return calls === 2",
                },
              ],
              hints: [
                'Remember both the previous dependencies and the previous value.',
                'Compare lengths first, then element by element with Object.is.',
                'When nothing changed, return lastValue without calling compute.',
              ],
              solutionFiles: [
                {
                  path: 'memoCache.js',
                  language: 'javascript',
                  content: `export function memoCache() {\n  let lastDeps = null\n  let lastValue\n\n  return {\n    run(deps, compute) {\n      const changed =\n        lastDeps === null ||\n        lastDeps.length !== deps.length ||\n        lastDeps.some((value, index) => !Object.is(value, deps[index]))\n\n      if (changed) {\n        lastValue = compute()\n        lastDeps = deps\n      }\n      return lastValue\n    },\n  }\n}\n`,
                },
              ],
              testNotes:
                'The object check pins down reference comparison, which is exactly why an inline object in a dependency array causes repeated work.',
            },
          },
        ],
      },
      {
        id: 'react-l16',
        title: 'useRef for DOM access',
        description: 'Accessing DOM elements and storing mutable values.',
        duration: 5,
        objectives: [
          'Create a ref and attach it to a DOM element',
          'Use useRef to store a mutable value across renders',
          'Focus an input programmatically on mount',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l16',
          title: 'useRef for DOM access quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l16-q1',
              type: 'blank',
              prompt: 'What property of a ref holds the current value?',
              answers: [
                'current',
                'ref.current',
              ],
              explanation: 'useRef returns an object whose .current property holds the value.',
            },
            {
              id: 'quiz-react-l16-q2',
              type: 'true-false',
              prompt: 'Assigning to `ref.current` causes the component to re-render.',
              answer: false,
              explanation: 'A ref is a mutable box outside React’s render data, so writing to `current` notifies nothing. Use state when the UI must reflect the change.',
            },
            {
              id: 'quiz-react-l16-q3',
              type: 'multiple-choice',
              prompt: 'Where should you focus an input through a ref when the component mounts?',
              options: [
                'In the component body during render',
                'Inside the `useRef` call itself',
                'In the JSX before the element exists',
                'In a `useEffect` with an empty dependency array',
              ],
              answer: 3,
              explanation: 'During the first render the DOM node is not attached yet, so `current` is still `null`. The effect runs after commit, when the node is available to focus.',
            },
            {
              id: 'quiz-react-l16-q4',
              type: 'multiple-choice',
              prompt: 'Which value belongs in a ref rather than in state?',
              options: [
                'The text shown in a controlled input',
                'Whether a modal is open',
                'An interval id used only for cleanup',
                'The selected tab that the UI displays',
              ],
              answer: 2,
              explanation: 'An interval id must survive renders but never appears in the output, which is exactly the mutable-value case for a ref. Values the UI renders belong in state.',
            },
            {
              id: 'quiz-react-l16-q5',
              type: 'multiple-choice',
              prompt: 'What does `useRef(0)` return on the component’s second render?',
              options: [
                'A brand-new `{ current: 0 }` object',
                'The same object as the first render, holding whatever `current` now is',
                'The number `0`',
                'A function that returns `0`',
              ],
              answer: 1,
              explanation: 'React creates the ref box once and hands back the identical object on every render, which is what lets a value persist without triggering renders.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l16-d1',
            title: 'Focus held in a ref',
            body: 'The input is focused on mount through a ref, and the same handle lets the button focus it again later.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useEffect, useRef, useState } from 'react'

export default function App() {
  const inputRef = useRef(null)
  const [text, setText] = useState('')

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input
        ref={inputRef}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Focused on mount"
      />
      <p style={{ margin: 0 }}>Characters: {text.length}</p>
      <button onClick={() => inputRef.current.focus()}>Focus the input</button>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 170,
          },
          {
            type: 'text',
            id: 'react-l16-intro',
            body: '**useRef for DOM access.** A ref is a small box with one property, `current`. Attach it to an element with the `ref` prop and React puts the DOM node in that box, giving you a handle for things state cannot express — focusing an input, measuring a node, scrolling.',
          },
          {
            type: 'text',
            id: 'react-l16-b2',
            body: 'The same box also stores any mutable value that should survive renders. Writing to `ref.current` does *not* re-render, which is the important difference from state: use a ref for a value the UI does not display, and state for a value it does.',
          },
          {
            type: 'heading',
            id: 'react-l16-h1',
            level: 2,
            body: 'A box that survives renders',
          },
          {
            type: 'code',
            id: 'react-l16-code',
            language: 'jsx',
            title: 'focusing an input, and counting renders',
            code: `import { useEffect, useRef } from 'react'\n\nexport default function SearchBox() {\n  const inputRef = useRef(null)\n\n  useEffect(() => {\n    inputRef.current.focus()      // after the first render\n  }, [])\n\n  return <input ref={inputRef} placeholder="Search" />\n}\n\n// The same ref holds any mutable value across renders:\nconst rendersRef = useRef(0)\nrendersRef.current += 1          // no re-render triggered`,
          },
          {
            type: 'list',
            id: 'react-l16-list',
            style: 'bullet',
            items: [
              '`useRef(initial)` returns `{ current: initial }`, the same object on every render.',
              'Attach it with `ref={inputRef}`; React sets `current` to the DOM node.',
              'Changing `current` does not re-render — use state when the UI must update.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l16-tip',
            title: 'Reach for a ref last',
            body: 'Most values belong in state or are derived during render. A ref is for the genuinely imperative cases — focus, scroll, media playback — where you need the DOM node itself.',
          },
          {
            type: 'heading',
            id: 'react-l16-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l16-b3',
            body: 'Write the box a ref is made of, and update it the way a ref would be updated.',
          },
          {
            type: 'exercise',
            id: 'react-l16-x1',
            exercise: {
              id: 'ex-react-l16',
              instructions:
                'Write createRefBox(initial) returning an object with a current property set to initial. Write bump(box) that increases box.current by one and returns the new value.',
              languages: ['javascript'],
              files: [
                {
                  path: 'refBox.js',
                  language: 'javascript',
                  content: `// A ref is a box with a mutable current value.\nexport function createRefBox(initial) {\n  return { current: null }\n}\n\n// Increase box.current by one and return it.\nexport function bump(box) {\n  return box.current\n}\n`,
                },
              ],
              tests: [
                { id: 'ex-react-l16-t1', label: 'the box starts at the initial value', body: 'return createRefBox(5).current === 5' },
                {
                  id: 'ex-react-l16-t2',
                  label: 'bump counts up and returns the new value',
                  body: 'const box = createRefBox(0); return bump(box) === 1 && bump(box) === 2',
                },
                {
                  id: 'ex-react-l16-t3',
                  label: 'bump mutates the same box',
                  body: 'const box = createRefBox(10); bump(box); return box.current === 11',
                },
                {
                  id: 'ex-react-l16-t4',
                  label: 'two boxes are independent',
                  body: 'const a = createRefBox(0); const b = createRefBox(0); bump(a); return a.current === 1 && b.current === 0',
                },
              ],
              hints: [
                'createRefBox returns { current: initial } — the parameter is the starting value.',
                'bump writes straight to the box: box.current += 1.',
                'Return the new value, not the box, so the caller can use it immediately.',
              ],
              solutionFiles: [
                {
                  path: 'refBox.js',
                  language: 'javascript',
                  content: `export function createRefBox(initial) {\n  return { current: initial }\n}\n\nexport function bump(box) {\n  box.current += 1\n  return box.current\n}\n`,
                },
              ],
              testNotes:
                'The two-boxes check confirms each ref is its own box rather than shared module state.',
            },
          },
        ],
      },
      {
        id: 'react-l42',
        title: 'useTransition',
        description: 'Marking updates as non-urgent so the UI stays responsive during slow renders.',
        duration: 6,
        objectives: [
          'Call useTransition to get [isPending, startTransition]',
          'Wrap state updates that are not urgent in startTransition',
          'Show a pending indicator while the transition is in progress',
          'Distinguish between urgent and transition updates',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l42',
          title: 'useTransition quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l42-q1',
              type: 'multiple-choice',
              prompt: 'Which update should you wrap in `startTransition`?',
              options: [
                'Updating a controlled input as the user types',
                'Filtering a large list after the user changes a filter',
                'Showing a validation error on submit',
                'Toggling a checkbox',
              ],
              answer: 1,
              explanation: 'Typing and toggles are urgent and should stay synchronous. Re-rendering a large list can be marked as a transition so the input remains responsive.',
            },
            {
              id: 'quiz-react-l42-q2',
              type: 'multiple-choice',
              prompt: 'In `const [isPending, startTransition] = useTransition()`, what is the first element?',
              options: [
                'A boolean that is true while the transition is rendering',
                'A function that starts the transition',
                'The deferred state value',
                'A ref pointing at the transition',
              ],
              answer: 0,
              explanation: '`useTransition` returns the pending flag first and the starter function second. The flag is what you use to show a subtle “Updating…” indicator.',
            },
            {
              id: 'quiz-react-l42-q3',
              type: 'true-false',
              prompt: 'A transition makes the deferred render finish faster.',
              answer: false,
              explanation: 'A transition does not speed work up; it lets React abandon outdated work so an urgent update can render first. If a render is slow because it does too much, that work still needs fixing.',
            },
            {
              id: 'quiz-react-l42-q4',
              type: 'multiple-choice',
              prompt: 'Why should the controlled input’s own state update stay outside `startTransition`?',
              options: [
                'Transitions cannot update string state',
                '`startTransition` can only be called once per render',
                'The input would lag behind the typing and could show stale text',
                'It throws an error in development builds',
              ],
              answer: 2,
              explanation: 'Transitions are interruptible and deferred, so an input value updated inside one may be reverted or delayed. Typing must remain an urgent, synchronous update.',
            },
            {
              id: 'quiz-react-l42-q5',
              type: 'multiple-choice',
              prompt: 'The user types again while a transition render is still in progress. What does React do?',
              options: [
                'Renders both results in the order they started',
                'Lets the older transition finish, then starts the newer one',
                'Queues every transition and applies them all',
                'Abandons the in-progress transition and applies only the latest result',
              ],
              answer: 3,
              explanation: 'Transitions supersede one another, so only the newest input’s result matters. That is why a slow filter cannot block the freshest keystrokes.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l42-d1',
            title: 'Urgent typing, deferred results',
            body: 'The input updates immediately while the filtered list is marked as a transition, so it can be interrupted by newer keystrokes.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState, useTransition } from 'react'

const all = ['React', 'Vue', 'Svelte', 'Solid', 'Angular', 'Preact']

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(all)
  const [isPending, startTransition] = useTransition()

  function onChange(event) {
    const next = event.target.value
    setQuery(next)
    startTransition(() => {
      setResults(all.filter((item) => item.toLowerCase().includes(next.toLowerCase())))
    })
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <input value={query} onChange={onChange} placeholder="Search frameworks" />
      {isPending && <span style={{ color: '#64748b' }}>Updating...</span>}
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 210,
          },
          {
            type: 'text',
            id: 'react-l42-intro',
            body: '**useTransition.** Not every update is equally urgent. Typing in a field must feel instant; the filtered list that follows can wait. `useTransition` lets you mark the second kind of update as a transition, so React keeps the urgent one responsive and interrupts the slow one if a newer input arrives.',
          },
          {
            type: 'text',
            id: 'react-l42-b2',
            body: 'It returns a pending flag and a `startTransition` function. State updates made inside `startTransition` are deferred; `isPending` is true while they are in flight, which is where you show a subtle indicator. Because transitions supersede one another, only the latest matters once the user stops typing.',
          },
          {
            type: 'heading',
            id: 'react-l42-h1',
            level: 2,
            body: 'Urgent now, everything else in a transition',
          },
          {
            type: 'code',
            id: 'react-l42-code',
            language: 'jsx',
            title: 'keeping the input responsive',
            code: `import { useState, useTransition } from 'react'\n\nexport default function Search({ items }) {\n  const [query, setQuery] = useState('')\n  const [results, setResults] = useState(items)\n  const [isPending, startTransition] = useTransition()\n\n  function onChange(event) {\n    const next = event.target.value\n    setQuery(next)                     // urgent: the input must keep up\n    startTransition(() => {\n      setResults(items.filter((item) => item.includes(next)))  // non-urgent\n    })\n  }\n\n  return (\n    <div>\n      <input value={query} onChange={onChange} />\n      {isPending && <span>Updating...</span>}\n      <ul>{results.map((item) => <li key={item}>{item}</li>)}</ul>\n    </div>\n  )\n}`,
          },
          {
            type: 'list',
            id: 'react-l42-list',
            style: 'bullet',
            items: [
              '`startTransition(() => setX(...))` marks the update as non-urgent and interruptible.',
              '`isPending` is true while a transition is rendering — the natural place for a spinner.',
              'Urgent updates (the input value) run immediately; only the transition can be superseded.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l42-warn',
            title: 'Transitions are not a scheduler',
            body: 'A transition does not make work faster — it lets React abandon outdated work. If a render is slow because it does too much, fix the work itself rather than hiding it behind a transition.',
          },
          {
            type: 'heading',
            id: 'react-l42-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l42-b3',
            body: 'Model the "latest wins" rule: several transition updates may pile up, but only the last one should be applied.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l42-x1',
            exercise: {
              id: 'ex-react-l42',
              instructions:
                "Write finalTransition(updates) returning the value of the last entry whose kind is 'transition', or null when there is none. Entries look like { kind: 'urgent' | 'transition', value }.",
              languages: ['javascript'],
              files: [
                {
                  path: 'transitions.js',
                  language: 'javascript',
                  content: `// Return the last transition's value, or null.\nexport function finalTransition(updates) {\n  return null\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l42-t1',
                  label: 'the last transition wins over earlier ones',
                  body: "return finalTransition([{ kind: 'urgent', value: 'a' }, { kind: 'transition', value: 'b' }, { kind: 'transition', value: 'c' }]) === 'c'",
                },
                {
                  id: 'ex-react-l42-t2',
                  label: 'urgent updates are ignored',
                  body: "return finalTransition([{ kind: 'urgent', value: 'a' }]) === null",
                },
                {
                  id: 'ex-react-l42-t3',
                  label: 'no updates means nothing to apply',
                  body: 'return finalTransition([]) === null',
                },
                {
                  id: 'ex-react-l42-t4',
                  label: 'a single transition is applied',
                  body: "return finalTransition([{ kind: 'transition', value: 'only' }]) === 'only'",
                },
              ],
              hints: [
                'Walk the list and remember the last transition value you saw.',
                'Filtering to the transitions and taking the last one is the shortest route.',
                'Return null when nothing was a transition — including an empty list.',
              ],
              solutionFiles: [
                {
                  path: 'transitions.js',
                  language: 'javascript',
                  content: `export function finalTransition(updates) {\n  let value = null\n  for (const update of updates) {\n    if (update.kind === 'transition') value = update.value\n  }\n  return value\n}\n`,
                },
              ],
              testNotes:
                'The mixed list confirms that urgent entries are skipped rather than simply taking the last element.',
            },
          },
        ],
      },
      {
        id: 'react-l43',
        title: 'forwardRef',
        description: 'Passing a ref from a parent component through a custom component to a DOM element.',
        duration: 6,
        objectives: [
          'Wrap a component with forwardRef to receive a ref',
          'Forward the ref to the underlying DOM element',
          'Type refs with React.Ref and RefObject',
          'Use forwardRef with function components that use hooks',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l43',
          title: 'forwardRef quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l43-q1',
              type: 'multiple-choice',
              prompt: 'What does `forwardRef` let a parent component do?',
              options: [
                'Pass a ref through a function component to one of its DOM elements',
                'Read a child’s local state directly',
                'Skip rendering a child when its props are unchanged',
                'Replace context with a global variable',
              ],
              answer: 0,
              explanation: 'A function component does not receive refs as props by default. `forwardRef` forwards the ref to a DOM node or another component you choose.',
            },
            {
              id: 'quiz-react-l43-q2',
              type: 'multiple-choice',
              prompt: 'Inside a component wrapped with `forwardRef`, what arguments does the function receive?',
              options: [
                '`(props, ref)`',
                '`(ref, props)`',
                '`(props, context)`',
                '`(children, ref)`',
              ],
              answer: 0,
              explanation: 'The wrapper changes the signature from `(props)` to `(props, ref)`. Putting that ref on the underlying element is what lets the parent reach it.',
            },
            {
              id: 'quiz-react-l43-q3',
              type: 'multiple-choice',
              prompt: 'Why can’t a parent pass `ref` as an ordinary prop to a function component?',
              options: [
                'Function components cannot accept props at all',
                'Refs only work with class components',
                '`ref` is treated as a plain HTML attribute and rendered as a string',
                '`ref` is reserved by React and is not included in the props object',
              ],
              answer: 3,
              explanation: 'React strips `ref` before calling the component, so it never appears in `props`. `forwardRef` is the supported way to receive it and decide which node it targets.',
            },
            {
              id: 'quiz-react-l43-q4',
              type: 'multiple-choice',
              prompt: 'Which TypeScript type fits the ref parameter of a `forwardRef` component that forwards to an `<input>`?',
              options: [
                '`HTMLInputElement`',
                '`React.MutableState<HTMLInputElement>`',
                '`React.Ref<HTMLInputElement>`',
                '`ElementRef<string>`',
              ],
              answer: 2,
              explanation: '`React.Ref<T>` accepts both object refs and callback refs, which is why it is the correct parameter type. `HTMLInputElement` alone describes the node, not the ref handle.',
            },
            {
              id: 'quiz-react-l43-q5',
              type: 'true-false',
              prompt: 'A component created with `forwardRef` can still call hooks such as `useState` and `useEffect`.',
              answer: true,
              explanation: '`forwardRef` only changes how the component receives its ref; it is still a function component, so the normal hooks rules and capabilities apply.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l43-d1',
            title: 'A ref forwarded to the real input',
            body: 'The wrapper receives a ref with **forwardRef** and puts it on the input, so the parent can focus it directly.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { forwardRef, useRef } from 'react'

const TextInput = forwardRef(function TextInput(props, ref) {
  return <input ref={ref} {...props} />
})

export default function App() {
  const inputRef = useRef(null)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <TextInput ref={inputRef} placeholder="Name" />
      <button onClick={() => inputRef.current.focus()}>Focus the input</button>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 130,
          },
          {
            type: 'text',
            id: 'react-l43-intro',
            body: '**forwardRef.** A `ref` on a DOM element is straightforward, but a component does not receive `ref` as a prop — it is reserved. To let a parent reach the element inside your component, you wrap the component with `forwardRef` and pass the ref down to the element that should receive it.',
          },
          {
            type: 'text',
            id: 'react-l43-b2',
            body: 'The wrapped function takes `(props, ref)` instead of just props, and the usual job is to put that ref on the underlying input or button while spreading the rest of the props through. This keeps the wrapper transparent: focus, measurement, and scroll all pass straight to the real element.',
          },
          {
            type: 'heading',
            id: 'react-l43-h1',
            level: 2,
            body: 'Hand the ref down to the element',
          },
          {
            type: 'code',
            id: 'react-l43-code',
            language: 'jsx',
            title: 'forwarding a ref to an input',
            code: `export const TextInput = forwardRef(function TextInput(props, ref) {\n  return <input ref={ref} {...props} />\n})\n\nfunction Form() {\n  const inputRef = useRef(null)\n  return (\n    <>\n      <TextInput ref={inputRef} placeholder="Name" />\n      <button onClick={() => inputRef.current.focus()}>Focus</button>\n    </>\n  )\n}\n\n// Spreading props keeps the wrapper transparent: the placeholder,\n// id and handlers all land on the real input.`,
          },
          {
            type: 'list',
            id: 'react-l43-list',
            style: 'bullet',
            items: [
              '`ref` is not a normal prop — `forwardRef` is how a component receives one.',
              'Put the ref on the DOM element that should be reachable, and spread the remaining props through.',
              'When a component must expose both its own ref and an inner element’s, merge them with a helper.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l43-tip',
            title: 'Prefer a prop-based API when you can',
            body: 'Forwarding refs is sometimes needed for focus and measurement, but if you only want to trigger an action, an `onOpen`-style callback prop is simpler and easier to test than reach-through imperative code.',
          },
          {
            type: 'heading',
            id: 'react-l43-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l43-b3',
            body: 'When two refs must point at the same element, a small helper wires both at once. Write that helper.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l43-x1',
            exercise: {
              id: 'ex-react-l43',
              instructions:
                'Write mergeRefs(a, b) returning a function that, when called with a value, sets a.current and b.current to that value. Refs are objects with a current property.',
              languages: ['javascript'],
              files: [
                {
                  path: 'mergeRefs.js',
                  language: 'javascript',
                  content: `// Return a function that fills both refs with the same value.\nexport function mergeRefs(a, b) {\n  return () => {}\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l43-t1',
                  label: 'both refs receive the value',
                  body: "const a = { current: null }; const b = { current: null }; mergeRefs(a, b)('el'); return a.current === 'el' && b.current === 'el'",
                },
                {
                  id: 'ex-react-l43-t2',
                  label: 'a returned function is a function',
                  body: 'const a = { current: null }; const b = { current: null }; return typeof mergeRefs(a, b) === "function"',
                },
                {
                  id: 'ex-react-l43-t3',
                  label: 'a later value replaces the earlier one',
                  body: "const a = { current: null }; const b = { current: null }; const set = mergeRefs(a, b); set('first'); set(null); return a.current === null && b.current === null",
                },
                {
                  id: 'ex-react-l43-t4',
                  label: 'the work happens when the function is called',
                  body: "const a = { current: null }; const b = { current: null }; mergeRefs(a, b); return a.current === null",
                },
              ],
              hints: [
                'mergeRefs must return a function, not the result of assigning.',
                'The returned function closes over a and b.',
                'Assign both inside it: (value) => { a.current = value; b.current = value }.',
              ],
              solutionFiles: [
                {
                  path: 'mergeRefs.js',
                  language: 'javascript',
                  content: `export function mergeRefs(a, b) {\n  return (value) => {\n    a.current = value\n    b.current = value\n  }\n}\n`,
                },
              ],
              testNotes:
                'The last check confirms nothing is assigned until the callback runs — the behaviour React needs when it attaches refs after render.',
            },
          },
        ],
      },
      {
        id: 'react-l44',
        title: 'Custom Hooks',
        description: 'Extracting reusable logic into custom hooks that compose React hooks together.',
        duration: 7,
        objectives: [
          'Name a hook function starting with use',
          'Share logic between components by calling a custom hook',
          'Use useState, useEffect, and other hooks inside a custom hook',
          'Return whatever state or functions the consuming component needs',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-react-l44',
          title: 'Custom Hooks quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l44-q1',
              type: 'multiple-choice',
              prompt: 'What does useCallback(fn, deps) return?',
              options: [
                'The result of calling fn',
                'A memoized version of fn that only changes when deps change',
                'A new function every render',
                'undefined',
              ],
              answer: 1,
              explanation: 'useCallback returns a memoized callback that only changes when one of its dependencies changes.',
            },
            {
              id: 'quiz-react-l44-q2',
              type: 'multiple-choice',
              prompt: 'What makes a function a custom hook?',
              options: [
                'Its name starts with `use` and it calls other hooks',
                'It returns JSX',
                'It is declared outside a component file',
                'It accepts a ref as its only argument',
              ],
              answer: 0,
              explanation: 'A custom hook is a function whose name starts with `use` and which calls built-in hooks. That convention is what lets React check the rules of hooks.',
            },
            {
              id: 'quiz-react-l44-q3',
              type: 'multiple-choice',
              prompt: 'Two components call the same `useCounter()` custom hook. What do they share?',
              options: [
                'The same count value',
                'The logic, while each component gets its own independent state',
                'The same `setCount` function',
                'Nothing — a hook cannot be called from two places',
              ],
              answer: 1,
              explanation: 'Each call to a hook creates its own state. A custom hook shares behaviour, not values, which is why the two counters in the demo move independently.',
            },
            {
              id: 'quiz-react-l44-q4',
              type: 'multiple-choice',
              prompt: 'Which call inside a custom hook breaks the rules of hooks?',
              options: [
                '`useState` at the top level of the hook',
                '`useEffect` at the top level of the hook',
                '`useState` inside an `if` branch',
                'Returning an object built from hook values',
              ],
              answer: 2,
              explanation: 'Hooks must run in the same order on every render, so a conditional `useState` would change the order. Branch inside the hook’s logic instead, not around the hook call.',
            },
            {
              id: 'quiz-react-l44-q5',
              type: 'multiple-choice',
              prompt: 'What should a custom hook return?',
              options: [
                'Whatever the consuming component needs — values, setters, flags, or callbacks',
                'Always an array of exactly two items',
                'JSX that the caller renders',
                'Only the state it created, never functions',
              ],
              answer: 0,
              explanation: 'The hook decides its own API: an object for named values, an array for positional ones, plus any derived flags or callbacks. The consumer should not have to unwrap an arbitrary shape.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l44-d1',
            title: 'One hook, two independent counters',
            body: 'Both components call the same **useCounter** hook, but each one keeps its own count. The hook shares the logic, not the values.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useCallback, useState } from 'react'

function useCounter(initial) {
  const [count, setCount] = useState(initial)
  const increment = useCallback(() => setCount((value) => value + 1), [])
  const reset = useCallback(() => setCount(initial), [initial])
  return { count, increment, reset }
}

function Counter({ label }) {
  const { count, increment, reset } = useCounter(0)
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <strong>{label}: {count}</strong>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={increment}>+</button>
        <button onClick={reset}>reset</button>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <Counter label="First" />
      <Counter label="Second" />
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 210,
          },
          {
            type: 'text',
            id: 'react-l44-intro',
            body: '**Custom Hooks.** When two components need the same behaviour, the logic can be lifted into a function that itself calls hooks. A custom hook is exactly that: a function whose name starts with `use`, which composes built-in hooks and returns whatever the caller needs.',
          },
          {
            type: 'text',
            id: 'react-l44-b2', 
            body: 'The `use` prefix is not decoration — it is how React and the linter know the function may contain hooks, and it is why the rules of hooks apply. Each component that calls the hook gets its own independent state; the hook shares the *logic*, not the values.',
          },
          {
            type: 'heading',
            id: 'react-l44-h1',
            level: 2,
            body: 'Logic, not state, is what is shared',
          },
          {
            type: 'code',
            id: 'react-l44-code',
            language: 'jsx',
            title: 'a counter hook and its caller',
            code: `import { useCallback, useState } from 'react'\n\nexport function useCounter(initial = 0) {\n  const [count, setCount] = useState(initial)\n  const increment = useCallback(() => setCount((c) => c + 1), [])\n  const reset = useCallback(() => setCount(initial), [initial])\n  return { count, increment, reset }\n}\n\nexport default function Counter() {\n  const { count, increment, reset } = useCounter()\n  return (\n    <div>\n      <span>{count}</span>\n      <button onClick={increment}>+</button>\n      <button onClick={reset}>reset</button>\n    </div>\n  )\n}\n\n// Two components calling useCounter each get their own count.`,
          },
          {
            type: 'list',
            id: 'react-l44-list',
            style: 'bullet',
            items: [
              'The name must start with `use` so the rules of hooks apply and the linter can check it.',
              'A custom hook calls other hooks; it is not a place for plain helpers that use no hooks.',
              'Return an object or array shaped for the caller — values, setters, derived flags, callbacks.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l44-tip',
            title: 'Extract the pure part first',
            body: 'The most testable part of a custom hook is often a plain function it calls — a filter, a formatter, a calculation. Extract that, test it directly, and keep the hook thin.',
          },
          {
            type: 'heading',
            id: 'react-l44-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l44-b3',
            body: 'Write the pure function behind a search hook: the filter a `useSearch` hook would expose.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l44-x1',
            exercise: {
              id: 'ex-react-l44',
              instructions:
                'Write filterByQuery(items, query) returning a NEW array of the items whose name contains query, ignoring case. An empty query returns a copy of every item.',
              languages: ['javascript'],
              files: [
                {
                  path: 'search.js',
                  language: 'javascript',
                  content: `// Return matching items; the query is case-insensitive.\nexport function filterByQuery(items, query) {\n  return items\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l44-t1',
                  label: 'matches on part of the name',
                  body: "const items = [{ name: 'Apple' }, { name: 'Banana' }]; const r = filterByQuery(items, 'app'); return r.length === 1 && r[0].name === 'Apple'",
                },
                {
                  id: 'ex-react-l44-t2',
                  label: 'the match ignores case',
                  body: "return filterByQuery([{ name: 'Apple' }], 'APPLE').length === 1",
                },
                {
                  id: 'ex-react-l44-t3',
                  label: 'an empty query returns every item, as a copy',
                  body: "const items = [{ name: 'A' }]; const r = filterByQuery(items, ''); return r.length === 1 && r !== items",
                },
                {
                  id: 'ex-react-l44-t4',
                  label: 'no match gives an empty array',
                  body: "return filterByQuery([{ name: 'Apple' }], 'zzz').length === 0",
                },
              ],
              hints: [
                'Lower-case both the query and the name before comparing.',
                'filter already returns a new array, so it fits the empty-query case too.',
                'const q = query.toLowerCase(); return items.filter((item) => item.name.toLowerCase().includes(q)).',
              ],
              solutionFiles: [
                {
                  path: 'search.js',
                  language: 'javascript',
                  content: `export function filterByQuery(items, query) {\n  const needle = query.toLowerCase()\n  return items.filter((item) => item.name.toLowerCase().includes(needle))\n}\n`,
                },
              ],
              testNotes:
                'The empty-query check compares against the original array reference, so returning the input unchanged is caught.',
            },
          },
        ],
      },
      {
        id: 'react-l45',
        title: 'Higher-Order Components',
        description: 'The legacy pattern of wrapping a component with a function, and when hooks replace it.',
        duration: 5,
        objectives: [
          'Write an HOC that takes a component and returns an enhanced one',
          'Pass props through to the wrapped component',
          'Explain why custom hooks are preferred over HOCs today',
          'Recognize HOC patterns in older codebases',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l45',
          title: 'Higher-Order Components quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l45-q1',
              type: 'multiple-choice',
              prompt: 'What does a higher-order component do?',
              options: [
                'Takes a component and returns a new component with extra behaviour or props',
                'Renders a component into a portal',
                'Replaces every hook with a class lifecycle method',
                'Memoizes a component’s render output automatically',
              ],
              answer: 0,
              explanation: 'An HOC is a function that wraps a component and returns another component. Custom hooks usually solve the same reuse problem with less nesting today.',
            },
            {
              id: 'quiz-react-l45-q2',
              type: 'blank',
              prompt: 'Complete the naming convention: an HOC is usually named `____Something`, such as `withLoading`.',
              answers: [
                'with',
              ],
              explanation: 'The `with` prefix signals that a function wraps a component and returns an enhanced version. Following it makes HOCs recognizable in older codebases.',
            },
            {
              id: 'quiz-react-l45-q3',
              type: 'multiple-choice',
              prompt: 'An HOC destructures `loading` out of its props. What must it do so the wrapped component still receives the caller’s other props?',
              options: [
                'Spread the remaining props onto the wrapped component',
                'Pass the entire props object, including `loading`',
                'Store the remaining props in a ref',
                'Re-render the parent with those props',
              ],
              answer: 0,
              explanation: 'Destructuring removes `loading` from the object, so only `...rest` contains the caller’s props. Spreading `...rest` through keeps the wrapper transparent.',
            },
            {
              id: 'quiz-react-l45-q4',
              type: 'multiple-choice',
              prompt: 'What is the main reason custom hooks are preferred over HOCs today?',
              options: [
                'HOCs cannot pass props to the component they wrap',
                'HOCs only work with class components',
                'Hooks execute faster than components do',
                'Hooks share logic without adding a wrapper component or renaming props',
              ],
              answer: 3,
              explanation: 'An HOC inserts another component into the tree and can obscure where props came from. A hook reuses the same logic directly inside the component that needs it.',
            },
            {
              id: 'quiz-react-l45-q5',
              type: 'true-false',
              prompt: 'An HOC modifies the component passed to it in place.',
              answer: false,
              explanation: 'An HOC returns a new component that renders the original inside it. The original component is untouched, which is why HOCs can be composed and reused.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l45-d1',
            title: 'An HOC that wraps for loading',
            body: '**withLoading** takes a component and returns an enhanced one. The wrapper destructures loading and spreads the remaining props through unchanged.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

function List({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18 }}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function withLoading(Component) {
  return function WithLoading({ loading, ...rest }) {
    if (loading) return <p style={{ margin: 0 }}>Loading...</p>
    return <Component {...rest} />
  }
}

const ListWithLoading = withLoading(List)

export default function App() {
  const [loading, setLoading] = useState(false)
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <ListWithLoading loading={loading} items={['Alpha', 'Beta', 'Gamma']} />
      <button onClick={() => setLoading(!loading)}>Toggle loading</button>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 170,
          },
          {
            type: 'text',
            id: 'react-l45-intro',
            body: '**Higher-Order Components.** An HOC is a function that takes a component and returns a new component with extra behaviour. It was the standard way to share logic before hooks: wrap, add props, render the original inside.',
          },
          {
            type: 'text',
            id: 'react-l45-b2',
            body: 'It still appears in older code and in libraries. The pattern works, but it costs a wrapper component in the tree, makes the prop names harder to trace, and hides where data came from. A custom hook shares the same logic without adding a component or changing the props.',
          },
          {
            type: 'heading',
            id: 'react-l45-h1',
            level: 2,
            body: 'A function that returns a component',
          },
          {
            type: 'code',
            id: 'react-l45-code',
            language: 'jsx',
            title: 'an HOC, and its hook-shaped replacement',
            code: `export function withLoading(Component) {\n  return function WithLoading({ loading, ...rest }) {\n    if (loading) return <p>Loading...</p>\n    return <Component {...rest} />\n  }\n}\n\nexport const UserList = withLoading(function UserList({ users }) {\n  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>\n})\n\n// The hook version: no wrapper component, no prop renaming.\n// const loading = useLoading()`,
          },
          {
            type: 'list',
            id: 'react-l45-list',
            style: 'bullet',
            items: [
              'An HOC takes a component and returns a new one — often with a name like `withSomething`.',
              'It merges the props it adds with the props it was given, and spreads the rest through.',
              'Hooks usually replace HOCs nowadays: same logic sharing, no extra component in the tree.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l45-warn',
            title: 'Watch what the wrapper swallows',
            body: 'An HOC that destructures a prop it adds will hide that prop from the wrapped component. Spread the remaining props through so nothing the caller passes is silently dropped.',
          },
          {
            type: 'heading',
            id: 'react-l45-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l45-b3',
            body: 'Write an HOC that injects fixed props into whatever component it wraps.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l45-x1',
            exercise: {
              id: 'ex-react-l45',
              instructions:
                'Write withProps(Component, extraProps) returning a new function component that renders Component with the incoming props and extraProps combined. On a name clash the extra props win.',
              languages: ['jsx'],
              files: [
                {
                  path: 'withProps.jsx',
                  language: 'jsx',
                  content: `// Base renders the props it is given.\nexport function Base(props) {\n  return <div data-title={props.title} data-extra={props.extra} />\n}\n\n// Return a component that renders Base with extraProps merged in.\nexport function withProps(Component, extraProps) {\n  return Component\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l45-t1',
                  label: 'returns a new component',
                  body: 'const Enhanced = withProps(Base, { extra: "y" }); return typeof Enhanced === "function" && Enhanced !== Base',
                },
                {
                  id: 'ex-react-l45-t2',
                  label: 'incoming and extra props are both visible',
                  body: 'const Enhanced = withProps(Base, { extra: "y" }); const el = Enhanced({ title: "x" }); const child = el.type(el.props); return child.props["data-title"] === "x" && child.props["data-extra"] === "y"',
                },
                {
                  id: 'ex-react-l45-t3',
                  label: 'extra props win on a clash',
                  body: 'const Enhanced = withProps(Base, { title: "z" }); const el = Enhanced({ title: "x" }); const child = el.type(el.props); return child.props["data-title"] === "z"',
                },
                {
                  id: 'ex-react-l45-t4',
                  label: 'it renders the wrapped component',
                  body: 'const Enhanced = withProps(Base, { extra: "y" }); return Enhanced({ title: "x" }).type === Base',
                },
              ],
              hints: [
                'Return a new function component, not the component that was passed in.',
                'Render <Component {...props} {...extraProps} /> so both sets of props arrive.',
                'Order matters: put extraProps last so it overrides a clashing name.',
              ],
              solutionFiles: [
                {
                  path: 'withProps.jsx',
                  language: 'jsx',
                  content: `export function Base(props) {\n  return <div data-title={props.title} data-extra={props.extra} />\n}\n\nexport function withProps(Component, extraProps) {\n  return function WithProps(props) {\n    return <Component {...props} {...extraProps} />\n  }\n}\n`,
                },
              ],
              testNotes:
                'The clash check is what forces the spread order, and the render check confirms the wrapped component is still used.',
            },
          },
        ],
      },
    ],
  },
]
