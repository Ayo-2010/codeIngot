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
        content: [
          {
            type: 'text',
            id: 'react-l7-intro',
            body: '**useState hook.** State is data a component remembers between renders. `useState(initial)` returns a pair: the current value and a function that sets it. Calling the setter tells React the data changed and the component should run again.',
          },
          {
            type: 'text',
            id: 'react-l7-b2',
            body: 'Two details matter. First, state is replaced, never edited: you pass a new value, not a mutation of the old one. Second, several updates in one event are queued and applied in order, so an update that depends on the previous value should use the function form — `setCount(c => c + 1)` — which receives the latest value rather than the one captured when the handler was created.',
          },
          {
            type: 'heading',
            id: 'react-l7-h1',
            level: 2,
            body: 'A value, a setter, and a queue of updates',
          },
          {
            type: 'code',
            id: 'react-l7-code',
            language: 'jsx',
            title: 'useState, the functional updater, and immutable lists',
            code: `function Counter() {\n  const [count, setCount] = useState(0)\n  return (\n    <button onClick={() => setCount((c) => c + 1)}>{count}</button>\n  )\n}\n\n// Three updates in one handler all apply, because each receives the latest value:\n// setCount((c) => c + 1)\n// setCount((c) => c + 1)\n// setCount((c) => c + 1)   // count grows by 3\n\n// A list is state too — build a new array, never push:\n// setTasks((tasks) => [...tasks, newTask])`,
          },
          {
            type: 'list',
            id: 'react-l7-list',
            style: 'bullet',
            items: [
              '`useState` returns `[value, setter]`; destructure both.',
              'The setter takes a new value, or a function that receives the previous value and returns the next.',
              'Never `push` into a state array or assign into a state object — `[...tasks, task]` and `{ ...obj, key: v }` instead.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l7-warn',
            title: 'Mutating state silently does nothing',
            body: 'React decides whether to re-render by comparing the new state to the old by reference. If you mutate the array in place, the reference is unchanged and React sees no update — the screen stays stale.',
          },
          {
            type: 'heading',
            id: 'react-l7-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l7-b3',
            body: 'Write the two pure operations a stateful component runs: applying a queue of updater functions, and adding to a list without mutating it.',
          },
          {
            type: 'exercise',
            id: 'react-l7-x1',
            exercise: {
              id: 'ex-react-l7',
              instructions:
                'Write stepCount(count, steps) returning count after applying every step in order. Write addTask(tasks, task) returning a NEW array with the task added.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// 1) Apply each step to the count, in order.\nfunction stepCount(count, steps) {\n  return count\n}\n\n// 2) Return a new list with the task added.\nfunction addTask(tasks, task) {\n  return tasks\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l7-t1',
                  label: 'three +1 steps add three',
                  body: 'return stepCount(0, [1, 1, 1]) === 3',
                },
                {
                  id: 'ex-react-l7-t2',
                  label: 'no steps leaves the count alone',
                  body: 'return stepCount(5, []) === 5',
                },
                {
                  id: 'ex-react-l7-t3',
                  label: 'steps apply in order',
                  body: 'return stepCount(2, [3, -1]) === 4',
                },
                {
                  id: 'ex-react-l7-t4',
                  label: 'addTask appends and returns a new array',
                  body: "const before = [{ id: 'a' }]; const after = addTask(before, { id: 'b' }); return after.length === 2 && after !== before",
                },
                {
                  id: 'ex-react-l7-t5',
                  label: 'the original list is not changed',
                  body: "const before = [{ id: 'a' }]; addTask(before, { id: 'b' }); return before.length === 1",
                },
              ],
              hints: [
                'For stepCount, add each step to a running total — a loop or reduce both work.',
                'stepCount(0, [1, 1, 1]) is three separate increments, which is why it reaches 3.',
                'For addTask, copy the list and put the new task at the end: [...tasks, task].',
              ],
              solution: {
                javascript: `function stepCount(count, steps) {\n  let total = count\n  for (const step of steps) {\n    total += step\n  }\n  return total\n}\n\nfunction addTask(tasks, task) {\n  return [...tasks, task]\n}\n`,
              },
              testNotes:
                'The addTask checks compare the input after the call and the array reference, so an in-place push is caught.',
            },
          },
        ],
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
        content: [
          {
            type: 'text',
            id: 'react-l8-intro',
            body: '**useEffect hook.** Rendering should be pure, so anything that reaches outside the component — talking to the network, listening to an event, setting a document title — goes in an effect. `useEffect` runs your function *after* the render is on screen.',
          },
          {
            type: 'text',
            id: 'react-l8-b2',
            body: 'The second argument is the dependency list, and it decides when the effect re-runs. Omit it and the effect runs after every render; pass `[]` and it runs once on mount; list values and it re-runs when any of them change (compared with `Object.is`). The function an effect returns is its cleanup, run before the next effect and on unmount.',
          },
          {
            type: 'heading',
            id: 'react-l8-h1',
            level: 2,
            body: 'Three dependency lists, and a cleanup',
          },
          {
            type: 'code',
            id: 'react-l8-code',
            language: 'jsx',
            title: 'when an effect runs',
            code: `// Every render (no list) — usually a bug, it re-runs constantly:\nuseEffect(() => {\n  document.title = 'Count: ' + count\n})\n\n// On mount only, with cleanup on unmount:\nuseEffect(() => {\n  const id = setInterval(tick, 1000)\n  return () => clearInterval(id)\n}, [])\n\n// Re-run whenever count changes:\nuseEffect(() => {\n  document.title = 'Count: ' + count\n}, [count])`,
          },
          {
            type: 'list',
            id: 'react-l8-list',
            style: 'bullet',
            items: [
              'No dependency list: run after every render. `[]`: run once on mount. `[value]`: run when `value` changes.',
              'The returned function is the cleanup — remove listeners, clear timers, cancel requests.',
              'Dependencies are compared with `Object.is`, so a newly created object or array each render always counts as changed.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l8-tip',
            title: 'Name every value the effect reads',
            body: 'If the effect uses a prop or state value, it belongs in the dependency list. Leaving it out creates a stale closure: the effect keeps reading the value from the render when it was created.',
          },
          {
            type: 'heading',
            id: 'react-l8-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l8-b3',
            body: 'Write the comparison React uses to decide whether an effect must re-run.',
          },
          {
            type: 'exercise',
            id: 'react-l8-x1',
            exercise: {
              id: 'ex-react-l8',
              instructions:
                'Write depsChanged(prev, next) returning true when the two dependency arrays differ: a different length, or any element not equal under Object.is. Two identical arrays return false.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Does this dependency list trigger the effect again?\nfunction depsChanged(prev, next) {\n  return true\n}\n`,
              },
              tests: [
                { id: 'ex-react-l8-t1', label: 'two empty lists do not change', body: 'return depsChanged([], []) === false' },
                { id: 'ex-react-l8-t2', label: 'equal values do not change', body: 'return depsChanged([1, 2], [1, 2]) === false' },
                { id: 'ex-react-l8-t3', label: 'a different value changes', body: 'return depsChanged([1], [2]) === true' },
                {
                  id: 'ex-react-l8-t4',
                  label: 'a different length changes',
                  body: 'return depsChanged([1], [1, 2]) === true',
                },
                {
                  id: 'ex-react-l8-t5',
                  label: 'two equal-looking objects are still different',
                  body: 'return depsChanged([{ a: 1 }], [{ a: 1 }]) === true',
                },
              ],
              hints: [
                'First compare the lengths; if they differ, the answer is true.',
                'Then compare element by element with Object.is.',
                'A new object each render is never Object.is-equal to the previous one, which is why objects in dependency lists cause repeated effects.',
              ],
              solution: {
                javascript: `function depsChanged(prev, next) {\n  if (prev.length !== next.length) return true\n  return prev.some((value, index) => !Object.is(value, next[index]))\n}\n`,
              },
              testNotes:
                'The last check uses two structurally equal but distinct objects, pinning down that the comparison is by identity, not by value.',
            },
          },
        ],
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
        content: [
          {
            type: 'text',
            id: 'react-l9-intro',
            body: '**Rules of hooks.** React tracks hooks by the order they are called, not by name. That single fact produces two rules: call hooks at the top level of a component, and call them only from React functions. Break either and the order changes between renders, so React hands the wrong state to the wrong hook.',
          },
          {
            type: 'text',
            id: 'react-l9-b2',
            body: 'This is why a hook inside an `if` or a loop is a bug even when the condition looks safe. On the render where the branch is skipped, the following hooks shift up one slot. The fix is almost always to move the condition *inside* the hook, or to split the component in two.',
          },
          {
            type: 'heading',
            id: 'react-l9-h1',
            level: 2,
            body: 'Two rules, one reason',
          },
          {
            type: 'code',
            id: 'react-l9-code',
            language: 'javascript',
            title: 'valid and invalid hook calls',
            code: `// Valid: top level of a component or a custom hook.\nfunction Panel({ items }) {\n  const [open, setOpen] = useState(false)\n  useEffect(() => {}, [])\n}\n\n// Invalid: the hook is conditional, so the order can change.\nfunction Panel({ items }) {\n  const [open, setOpen] = useState(false)\n  if (items.length > 0) {\n    useEffect(() => {}, [])   // breaks the rules of hooks\n  }\n}\n\n// The fix is to move the condition inside the hook:\nuseEffect(() => {\n  if (items.length > 0) {\n    // ...\n  }\n}, [items])`,
          },
          {
            type: 'list',
            id: 'react-l9-list',
            style: 'bullet',
            items: [
              'Call hooks at the top level — never inside a condition, loop, or nested function.',
              'Call hooks only from a function component or another hook (a name starting with `use`).',
              'Move the condition inside the hook rather than wrapping the hook in it.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l9-tip',
            title: 'The lint rule knows this for you',
            body: 'The React hooks ESLint rule reports conditional or misplaced hook calls, and missing dependencies. Let the linter enforce the rules so you do not have to remember them while writing.',
          },
          {
            type: 'heading',
            id: 'react-l9-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l9-b3',
            body: 'Write the check a linter performs: given a record describing one hook call, decide whether it breaks a rule.',
          },
          {
            type: 'exercise',
            id: 'react-l9-x1',
            exercise: {
              id: 'ex-react-l9',
              instructions:
                'Write violatesRules(call) returning true when the hook call breaks a rule. A call is valid only when call.insideComponent is true and call.topLevel is true.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// A hook call must be inside a component and at the top level.\nfunction violatesRules(call) {\n  return false\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l9-t1',
                  label: 'a top-level call inside a component is valid',
                  body: "return violatesRules({ name: 'useState', insideComponent: true, topLevel: true }) === false",
                },
                {
                  id: 'ex-react-l9-t2',
                  label: 'a conditional call is invalid',
                  body: "return violatesRules({ name: 'useEffect', insideComponent: true, topLevel: false }) === true",
                },
                {
                  id: 'ex-react-l9-t3',
                  label: 'a call outside a component is invalid',
                  body: "return violatesRules({ name: 'useState', insideComponent: false, topLevel: true }) === true",
                },
                {
                  id: 'ex-react-l9-t4',
                  label: 'a call that is both is invalid',
                  body: "return violatesRules({ name: 'useEffect', insideComponent: false, topLevel: false }) === true",
                },
              ],
              hints: [
                'A call is valid only when both flags are true.',
                'Negate that: invalid when either flag is false.',
                'Return the negation of the valid condition: !(call.insideComponent && call.topLevel).',
              ],
              solution: {
                javascript: `function violatesRules(call) {\n  return !(call.insideComponent && call.topLevel)\n}\n`,
              },
              testNotes:
                'The four checks cover every combination of the two flags, so both rules must be implemented.',
            },
          },
        ],
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
          options: ['A single value', 'An array of [value, setter]', 'An object with val and set', 'A promise'],
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
