import type { Section } from '~/types/content'

export const reactPerformanceSections: Section[] = [
  {
    id: 'react-s7',
    title: 'Performance',
    description: 'Optimizing renders, code splitting, and measuring performance.',
    lessons: [
      {
        id: 'react-l20',
        title: 'Code splitting with Suspense',
        description: 'Splitting bundles by route and component, and showing a fallback while loading.',
        duration: 5,
        objectives: [
          'Split a component with React.lazy',
          'Show a loading fallback with Suspense',
          'Code-split by route for faster initial load',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l20',
          title: 'Code splitting with Suspense quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l20-q1',
              type: 'multiple-choice',
              prompt: 'What is the correct order for React.memo and hooks in a component?',
              options: [
                'Hooks outside, memo inside the file export',
                'memo wraps the component, hooks stay inside the component',
                'Hooks must come before the component definition',
                'Order does not matter',
              ],
              answer: 1,
              explanation: 'React.memo wraps the component function. The hooks stay inside the function component — the wrapper is external.',
            },
            {
              id: 'quiz-react-l20-q2',
              type: 'identify-error',
              prompt: 'What is wrong with this lazy-loaded component?',
              code: 'import { lazy, Suspense } from \'react\'\n\nconst Page = lazy(import(\'./Page\'))\n\nexport default function App() {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      <Page />\n    </Suspense>\n  )\n}',
              options: [
                'Suspense must wrap App instead of Page',
                'lazy can only be used with class components',
                'lazy needs a function that returns the import, not the import promise itself',
                'Page must be rendered before the Suspense boundary',
              ],
              answer: 2,
              explanation: 'lazy(factory) takes a function so the dynamic import starts when the component first renders. Passing the promise directly starts the download immediately and is not the API lazy expects.',
            },
            {
              id: 'quiz-react-l20-q3',
              type: 'multiple-choice',
              prompt: 'A visitor opens a lazily loaded settings route, navigates away, and comes back later. What happens on the second visit?',
              options: [
                'The chunk is downloaded again because the component unmounted',
                'The route throws, because a lazy module can only mount once',
                'The fallback stays on screen while a fresh request is made',
                'The cached module renders immediately with no new chunk request',
              ],
              answer: 3,
              explanation: 'A loaded chunk is cached by the bundler, so a second visit reuses the module instead of fetching it again. That is why splitting per route does not punish repeat navigation.',
            },
            {
              id: 'quiz-react-l20-q4',
              type: 'multiple-choice',
              prompt: 'Where must a Suspense boundary sit relative to a lazy component?',
              options: [
                'Inside the lazy component, around the JSX it returns',
                'Anywhere in the same file, as long as both are exported',
                'Above the lazy component, so it can show the fallback while the chunk loads',
                'Only in the router configuration, never in JSX',
              ],
              answer: 2,
              explanation: 'Suspense catches the suspension of components rendered inside it, so it must be an ancestor of the lazy component. A boundary below the lazy component never sees the load happen.',
            },
            {
              id: 'quiz-react-l20-q5',
              type: 'multiple-choice',
              prompt: 'Which component is the best candidate for code splitting?',
              options: [
                'The header shown on every page',
                'The root layout shell that contains the sidebar',
                'The sign-in button rendered on first paint',
                'A charting library used only on the reports page',
              ],
              answer: 3,
              explanation: 'Split heavy code that many visitors never need. Splitting something required for the first screen only adds a round trip before the page can be used.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l20-d1',
            title: 'A chunk that loads on demand',
            body: 'The page is not fetched until it is asked for. A fallback stands in while the chunk is in flight, then the loaded view stays cached.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

export default function App() {
  const [state, setState] = useState('idle')

  function loadChunk() {
    setState('loading')
    setTimeout(() => setState('ready'), 600)
  }

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <button onClick={loadChunk}>Open lazy page</button>
      <div style={{ marginTop: 8 }}>
        {state === 'loading' ? <em>Loading chunk...</em> : null}
        {state === 'ready' ? <strong>Lazy page loaded and cached</strong> : null}
      </div>
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
            id: 'react-l20-intro',
            body: '**Code splitting with Suspense.** A bundler normally ships one large JavaScript file, so the first paint waits for code the visitor may never need. Splitting breaks the bundle into chunks that load on demand — usually one per route.',
          },
          {
            type: 'text',
            id: 'react-l20-b2',
            body: '`lazy(() => import(’./Page’))` turns a static import into a chunk fetched the first time the component renders. `Suspense` wraps it and shows a fallback until the chunk arrives. Once loaded, the module is cached — a second visit is instant.',
          },
          {
            type: 'heading',
            id: 'react-l20-h1',
            level: 2,
            body: 'Load only what the screen needs',
          },
          {
            type: 'code',
            id: 'react-l20-code',
            language: 'jsx',
            title: 'a lazy route behind a fallback',
            code: `import { lazy, Suspense } from 'react'\n\nconst TaskDetail = lazy(() => import('./TaskDetail'))\n\nexport default function AppRoutes() {\n  return (\n    <Suspense fallback={<p>Loading...</p>}>\n      <TaskDetail />\n    </Suspense>\n  )\n}\n\n// Split by route so the first paint downloads only the shell:\n// { path: '/tasks/:id', element: <TaskDetail /> }\n// The chunk for TaskDetail is fetched the first time that route matches,\n// then reused for every later visit.`,
          },
          {
            type: 'list',
            id: 'react-l20-list',
            style: 'bullet',
            items: [
              '`lazy(factory)` takes a function returning an import promise, not the import itself.',
              '`Suspense` provides the fallback shown while the chunk is in flight.',
              'One chunk per route is the usual split: users download the pages they open.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l20-tip',
            title: 'Split where it pays',
            body: 'Splitting a component used on the first screen only adds a round trip. Split the heavy, occasionally used parts — a settings page, a charting library, an editor — and leave the shell in the main bundle.',
          },
          {
            type: 'heading',
            id: 'react-l20-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l20-b3',
            body: 'Write the cache behind lazy loading: a chunk is loaded once and then reused by key.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l20-x1',
            exercise: {
              id: 'ex-react-l20',
              instructions:
                'Write lazyCache() returning an object with load(key, factory). The first load for a key calls factory() and caches the result; later loads return the cached module without calling factory again.',
              languages: ['javascript'],
              files: [
                {
                  path: 'lazyCache.js',
                  language: 'javascript',
                  content: `// A cache for lazily loaded chunks.\nexport function lazyCache() {\n  const modules = {}\n\n  return {\n    load(key, factory) {\n      // TODO: load once, then reuse.\n      return factory()\n    },\n  }\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l20-t1',
                  label: 'the first load runs the factory',
                  body: "let loads = 0; const cache = lazyCache(); const first = cache.load('page', () => { loads++; return 'Page' }); return loads === 1 && first === 'Page'",
                },
                {
                  id: 'ex-react-l20-t2',
                  label: 'the second load reuses the cached module',
                  body: "let loads = 0; const cache = lazyCache(); const make = () => { loads++; return 'Page' }; cache.load('page', make); const again = cache.load('page', make); return loads === 1 && again === 'Page'",
                },
                {
                  id: 'ex-react-l20-t3',
                  label: 'different keys load separately',
                  body: "let loads = 0; const cache = lazyCache(); const make = () => { loads++; return 'm' + loads }; const a = cache.load('a', make); const b = cache.load('b', make); return loads === 2 && a !== b",
                },
                {
                  id: 'ex-react-l20-t4',
                  label: 'a cached null is still a cache hit',
                  body: "let loads = 0; const cache = lazyCache(); const make = () => { loads++; return null }; cache.load('x', make); const value = cache.load('x', make); return value === null && loads === 1",
                },
              ],
              hints: [
                'Store loaded modules in the modules object, keyed by key.',
                'Only call factory() when nothing has been stored for that key yet.',
                'Test for the key with "key in modules" so a cached falsy value is not mistaken for a miss.',
              ],
              solutionFiles: [
                {
                  path: 'lazyCache.js',
                  language: 'javascript',
                  content: `export function lazyCache() {\n  const modules = {}\n\n  return {\n    load(key, factory) {\n      if (!(key in modules)) {\n        modules[key] = factory()\n      }\n      return modules[key]\n    },\n  }\n}\n`,
                },
              ],
              testNotes:
                'The fourth check caches a null and expects one load, which is why the cache must test for the key rather than for a truthy value.',
            },
          },
        ],
      },
      {
        id: 'react-l21',
        title: 'Memoization techniques',
        description: 'Using React.memo, useMemo, and useCallback to prevent unnecessary re-renders.',
        duration: 6,
        objectives: [
          'Wrap a component with React.memo to skip re-renders',
          'Identify when props are the cause of re-renders',
          'Apply useCallback to functions passed to memoized children',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l21',
          title: 'Memoization techniques quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l21-q1',
              type: 'identify-error',
              prompt: 'What is the issue with this component?',
              code: 'function Item({ data, onClick }) {\n  const processed = expensiveCalc(data)\n  return <div onClick={onClick}>{processed}</div>\n}',
              options: [
                'No issue',
                'The div has no children',
                'expensiveCalc runs on every render, should be wrapped in useMemo',
                'onClick must be useCallback',
              ],
              answer: 2,
              explanation: 'expensiveCalc(data) runs on every render. If it is genuinely expensive, wrap it in useMemo with data as the dependency.',
            },
            {
              id: 'quiz-react-l21-q2',
              type: 'multiple-choice',
              prompt: 'By default, how does React.memo decide whether to skip a re-render?',
              options: [
                'It deep-compares every nested value inside props',
                'It compares each prop with Object.is, one level deep',
                'It compares the rendered HTML strings of the old and new output',
                'It always re-renders but reuses the previous DOM nodes',
              ],
              answer: 1,
              explanation: 'The default comparison is shallow: keys are compared with Object.is and nested objects are compared by reference. Two equal-looking object literals are therefore still different props.',
            },
            {
              id: 'quiz-react-l21-q3',
              type: 'multiple-choice',
              prompt: 'Which hook keeps an object or array reference stable between renders?',
              options: [
                'useCallback',
                'useRef',
                'useEffect',
                'useMemo',
              ],
              answer: 3,
              explanation: 'useMemo returns the same value until its dependencies change, which is what keeps an object or array prop reference stable. useCallback does the same job for functions.',
            },
            {
              id: 'quiz-react-l21-q4',
              type: 'multiple-choice',
              prompt: 'A component is wrapped as `memo(Component, areEqual)`. What does it mean when areEqual returns true?',
              options: [
                'The props are equal, so React skips the render',
                'The props changed, so React must re-render',
                'The component should be unmounted and remounted',
                'The comparison should fall back to Object.is',
              ],
              answer: 0,
              explanation: 'The second argument replaces the default comparison, and true means "treat the props as unchanged". React then reuses the previous render, so a comparator that always returns true would freeze the component.',
            },
            {
              id: 'quiz-react-l21-q5',
              type: 'identify-error',
              prompt: 'Why can this callback close over a stale `id`?',
              code: 'const handleSelect = useCallback(() => select(id), [])',
              options: [
                'useCallback cannot reference values from the component scope',
                'The empty dependency array keeps the first version of the callback, with the first id',
                'select must be wrapped in useMemo before it can be called',
                'useCallback only accepts string arguments',
              ],
              answer: 1,
              explanation: 'With an empty dependency array the function is created once and keeps the id from that first render. Adding id to the array rebuilds the callback whenever the id changes.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l21-d1',
            title: 'Memo skips the child render',
            body: 'Every parent render re-renders the plain child, but the memoized one compares its props and skips. Its counter stops moving.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { memo, useState } from 'react'

let plainRenders = 0
let memoRenders = 0

const MemoChild = memo(function MemoChild() {
  memoRenders = memoRenders + 1
  return <div>memo child renders: {memoRenders}</div>
})

function PlainChild() {
  plainRenders = plainRenders + 1
  return <div>plain child renders: {plainRenders}</div>
}

export default function App() {
  const [n, setN] = useState(0)
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <button onClick={() => setN(n + 1)}>Parent renders: {n}</button>
      <div style={{ marginTop: 8 }}>
        <PlainChild />
        <MemoChild />
      </div>
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
            id: 'react-l21-intro',
            body: '**Memoization techniques.** When a parent re-renders, React re-renders its children too. `React.memo` interrupts that: a memoized component compares its new props with the old ones and skips the render when they are shallowly equal.',
          },
          {
            type: 'text',
            id: 'react-l21-b2',
            body: 'The catch is that a comparison by value still fails for new objects and new functions, which is what an inline arrow or an object literal is on every render. `useCallback` and `useMemo` exist to keep those references stable — and applying `memo` without them is usually wasted effort.',
          },
          {
            type: 'heading',
            id: 'react-l21-h1',
            level: 2,
            body: 'Compare props, keep references stable',
          },
          {
            type: 'code',
            id: 'react-l21-code',
            language: 'jsx',
            title: 'memo, and the stable callback it needs',
            code: `import { memo, useCallback } from 'react'\n\nexport const Item = memo(function Item({ label, onSelect }) {\n  return <li onClick={onSelect}>{label}</li>\n})\n\n// An inline function is a new reference every render, so memo never helps:\n// <Item label={label} onSelect={() => select(id)} />\n\n// useCallback keeps that reference stable, so the memo can do its job:\nconst handleSelect = useCallback(() => select(id), [id])\n// <Item label={label} onSelect={handleSelect} />`,
          },
          {
            type: 'list',
            id: 'react-l21-list',
            style: 'bullet',
            items: [
              '`React.memo(Component)` skips a re-render when props compare equal by `Object.is` per key.',
              'A new object or function each render defeats the comparison, so the child re-renders anyway.',
              '`useCallback` stabilises functions; `useMemo` stabilises objects and arrays.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l21-warn',
            title: 'Memo is not free',
            body: 'Every memoized component stores its previous props and compares them on each render. For cheap components that is more work than rendering again. Memoize where the render is expensive or the list is long.',
          },
          {
            type: 'heading',
            id: 'react-l21-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l21-b3',
            body: 'Write the comparison React.memo performs by default.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l21-x1',
            exercise: {
              id: 'ex-react-l21',
              instructions:
                'Write shallowEqual(a, b) returning true when both objects have the same keys and each value compares equal with Object.is. The comparison is one level deep, not recursive.',
              languages: ['javascript'],
              files: [
                {
                  path: 'memo.js',
                  language: 'javascript',
                  content: `// The default comparison used by React.memo.\nexport function shallowEqual(a, b) {\n  return false\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l21-t1',
                  label: 'equal primitive values compare equal',
                  body: 'return shallowEqual({ a: 1 }, { a: 1 }) === true',
                },
                {
                  id: 'ex-react-l21-t2',
                  label: 'a different value is not equal',
                  body: 'return shallowEqual({ a: 1 }, { a: 2 }) === false',
                },
                {
                  id: 'ex-react-l21-t3',
                  label: 'a shared object reference compares equal',
                  body: 'const inner = { x: 1 }; return shallowEqual({ a: inner }, { a: inner }) === true',
                },
                {
                  id: 'ex-react-l21-t4',
                  label: 'a different key count is not equal',
                  body: 'return shallowEqual({ a: 1 }, { a: 1, b: 2 }) === false',
                },
                {
                  id: 'ex-react-l21-t5',
                  label: 'two equal-looking objects are not equal',
                  body: 'return shallowEqual({ a: { x: 1 } }, { a: { x: 1 } }) === false',
                },
              ],
              hints: [
                'Compare the key counts first — a different count is an immediate false.',
                'Then check every key of a against the same key of b.',
                'Use Object.is for each value: Object.keys(a).every((key) => Object.is(a[key], b[key])).',
              ],
              solutionFiles: [
                {
                  path: 'memo.js',
                  language: 'javascript',
                  content: `export function shallowEqual(a, b) {\n  if (a === b) return true\n  if (!a || !b) return false\n\n  const aKeys = Object.keys(a)\n  const bKeys = Object.keys(b)\n  if (aKeys.length !== bKeys.length) return false\n\n  return aKeys.every((key) => Object.is(a[key], b[key]))\n}\n`,
                },
              ],
              testNotes:
                'The shared-reference and equal-looking-object checks together pin down that the comparison is by identity and one level deep.',
            },
          },
        ],
      },
      {
        id: 'react-l22',
        title: 'Measuring and debugging renders',
        description: 'Using the React dev tools, memo, and the why-did-you-render package.',
        duration: 5,
        objectives: [
          'Profile component renders in React DevTools',
          'Identify unnecessary re-renders with why-did-you-render',
          'Understand the relationship between props and re-renders',
        ],
        xp: 30,
        quiz: {
          id: 'quiz-react-l22',
          title: 'Measuring and debugging renders quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l22-q1',
              type: 'multiple-choice',
              prompt: 'What does React.memo do?',
              options: [
                'Memoizes the return value of a function',
                'Prevents re-render when props have not changed',
                'Converts a function component to a class component',
                'Adds a cache to API calls',
              ],
              answer: 1,
              explanation: 'React.memo is a higher-order component that skips re-rendering when props are shallowly equal.',
            },
            {
              id: 'quiz-react-l22-q2',
              type: 'multiple-choice',
              prompt: 'You record an interaction in the React DevTools Profiler. What does the flame chart show?',
              options: [
                'Which components rendered and how long each took',
                'Which npm dependencies are out of date',
                'The bundle size of each emitted chunk',
                'Which props are missing TypeScript annotations',
              ],
              answer: 0,
              explanation: 'The Profiler records a commit and shows the components that rendered in it, with timings. That answers "what is slow" before you start changing code.',
            },
            {
              id: 'quiz-react-l22-q3',
              type: 'multiple-choice',
              prompt: 'What does the Profiler entry "Why did this render?" identify?',
              options: [
                'The slowest child in the whole tree',
                'The prop or state that changed and triggered the render',
                'How much memory the component is holding',
                'The route that matched the current URL',
              ],
              answer: 1,
              explanation: 'The entry names the specific changing value, not just the component. That is usually the fact the fix depends on, such as a new object identity or an unrelated parent state update.',
            },
            {
              id: 'quiz-react-l22-q4',
              type: 'true-false',
              prompt: 'Render timings measured in a development build are a reliable guide to production speed.',
              answer: false,
              explanation: 'Development builds run extra checks and are considerably slower. Use them to see what renders, but confirm real timings against a production build.',
            },
            {
              id: 'quiz-react-l22-q5',
              type: 'code-output',
              prompt: 'Using the lesson rule for `busiest` — the most frequent name, with ties going to the first one seen — what does this return?',
              code: 'const log = [\'A\', \'B\', \'A\', \'B\', \'C\']\nbusiest(log)',
              options: [
                'A',
                'B',
                'C',
                'null',
              ],
              answer: 0,
              explanation: 'A and B both appear twice, so the tie is broken by first appearance and A wins. A strict greater-than comparison is what keeps the earlier name on a tie.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l22-d1',
            title: 'Count the renders',
            body: 'The blunt instrument that finds the hot component: store a counter outside the component and print it on every render.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

let appRenders = 0
let listRenders = 0
const items = ['a', 'b', 'c']

function List({ items }) {
  listRenders = listRenders + 1
  return (
    <div>
      List renders: {listRenders} ({items.length} items)
    </div>
  )
}

export default function App() {
  appRenders = appRenders + 1
  const [n, setN] = useState(0)
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <button onClick={() => setN(n + 1)}>Bump: {n}</button>
      <div style={{ marginTop: 8 }}>
        App renders: <strong>{appRenders}</strong>
      </div>
      <List items={items} />
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
            id: 'react-l22-intro',
            body: '**Measuring and debugging renders.** Optimising before measuring is guesswork. The React DevTools Profiler records an interaction and shows which components rendered, how long each took, and why — the flame chart answers "what is slow" before you change anything.',
          },
          {
            type: 'text',
            id: 'react-l22-b2',
            body: 'The simplest measurement is also often the most useful: count renders. A component that renders far more often than its data changes is the place to look. The Profiler adds "why did this render?" for the specific prop or state that changed, which is usually the fact you need.',
          },
          {
            type: 'heading',
            id: 'react-l22-h1',
            level: 2,
            body: 'Record first, then change one thing',
          },
          {
            type: 'code',
            id: 'react-l22-code',
            language: 'javascript',
            title: 'profiling and counting renders',
            code: `// React DevTools -> Profiler -> record an interaction.\n// The flame chart shows which components rendered and how long they took.\n\n// A blunt instrument that finds the culprit surprisingly often:\nconst renderCounts = {}\n\nfunction Item({ label }) {\n  renderCounts[label] = (renderCounts[label] ?? 0) + 1\n  return <li>{label}</li>\n}\n\n// "Why did this render?" in the Profiler names the prop or state that\n// changed, which is usually the fact the fix depends on.`,
          },
          {
            type: 'list',
            id: 'react-l22-list',
            style: 'bullet',
            items: [
              'Record an interaction in the Profiler, then read which components rendered and for how long.',
              'Counting renders finds the hot component without any tooling.',
              '"Why did this render?" points at the changing prop or state, not just the component.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l22-tip',
            title: 'Measure the development build, judge the production build',
            body: 'Development builds run extra checks and are much slower. Use them to find what renders, but confirm real timings against a production build before drawing conclusions about speed.',
          },
          {
            type: 'heading',
            id: 'react-l22-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l22-b3',
            body: 'Turn a render log into an answer: which component rendered most often?',
          },
          {
            type: 'exercise',
            id: 'ex-react-l22-x1',
            exercise: {
              id: 'ex-react-l22',
              instructions:
                'Write busiest(log) returning the component name that appears most often in the log, or null when the log is empty. When two names tie, return the one that appears first.',
              languages: ['javascript'],
              files: [
                {
                  path: 'renderLog.js',
                  language: 'javascript',
                  content: `// Find the component with the most renders.\nexport function busiest(log) {\n  return null\n}\n`,
                },
              ],
              tests: [
                { id: 'ex-react-l22-t1', label: 'the most frequent name wins', body: "return busiest(['A', 'B', 'A']) === 'A'" },
                {
                  id: 'ex-react-l22-t2',
                  label: 'a tie returns the first seen',
                  body: "return busiest(['B', 'A']) === 'B'",
                },
                { id: 'ex-react-l22-t3', label: 'an empty log has no answer', body: 'return busiest([]) === null' },
                { id: 'ex-react-l22-t4', label: 'a single render is the busiest', body: "return busiest(['Only']) === 'Only'" },
                {
                  id: 'ex-react-l22-t5',
                  label: 'a later name can overtake',
                  body: "return busiest(['A', 'A', 'B', 'B', 'B']) === 'B'",
                },
              ],
              hints: [
                'Count each name as you walk the log, keeping the order you first saw them.',
                'Track the best name and count so far as you go.',
                'Only replace the best when the new count is strictly greater, so earlier names win ties.',
              ],
              solutionFiles: [
                {
                  path: 'renderLog.js',
                  language: 'javascript',
                  content: `export function busiest(log) {\n  const counts = {}\n  let best = null\n  let bestCount = 0\n\n  for (const name of log) {\n    counts[name] = (counts[name] ?? 0) + 1\n    if (counts[name] > bestCount) {\n      best = name\n      bestCount = counts[name]\n    }\n  }\n\n  return best\n}\n`,
                },
              ],
              testNotes:
                'The tie check distinguishes a strict greater-than from a greater-or-equal comparison, which is the difference between first-seen and last-seen.',
            },
          },
        ],
      },
      {
        id: 'react-l47',
        title: 'CSS styling approaches',
        description: 'Adding styles to React components: regular CSS, inline styles, and when each approach fits.',
        duration: 6,
        objectives: [
          'Import a CSS file and let class names coexist with JSX',
          'Use inline style objects for dynamic values',
          'Choose between CSS files and inline styles based on reuse and dynamism',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l47',
          title: 'CSS styling approaches quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l47-q1',
              type: 'true-false',
              prompt: 'You should memoize everything to make React fast.',
              answer: false,
              explanation: 'Over-memoization adds overhead. Memoize only when re-renders are expensive or children are memoized.',
            },
            {
              id: 'quiz-react-l47-q2',
              type: 'multiple-choice',
              prompt: 'How do you set a font size in a React inline style object?',
              options: [
                'style={{ \'font-size\': \'12px\' }}',
                'style={{ fontSize: \'12px\' }}',
                'style="font-size: 12px"',
                'style={fontSize: \'12px\'}',
              ],
              answer: 1,
              explanation: 'The style prop takes a JavaScript object, so CSS properties use camelCase keys. Kebab-case belongs in a stylesheet, not as a bare object key.',
            },
            {
              id: 'quiz-react-l47-q3',
              type: 'multiple-choice',
              prompt: 'When is an inline style the better choice than a CSS class?',
              options: [
                'For hover and focus states',
                'For media queries that change the layout',
                'For a width computed from component state',
                'For pseudo-elements such as ::after',
              ],
              answer: 2,
              explanation: 'Inline styles carry values that come from data, like a percentage width or a colour from state. Pseudo-classes, pseudo-elements and media queries cannot be expressed that way.',
            },
            {
              id: 'quiz-react-l47-q4',
              type: 'code-output',
              prompt: 'What string does this expression produce?',
              code: '[\'card\', false, \'card--active\'].filter(Boolean).join(\' \')',
              options: [
                'card false card--active',
                'card card--active',
                'card',
                'card,card--active',
              ],
              answer: 1,
              explanation: 'filter(Boolean) drops the false entry, leaving two names joined by a single space. This is why the truthy-name join is preferred over string concatenation.',
            },
            {
              id: 'quiz-react-l47-q5',
              type: 'multiple-choice',
              prompt: 'Which className adds `card--active` only when `active` is true, while always keeping `card`?',
              options: [
                'className="card {active && \'card--active\'}"',
                'className={active ? \'card card--active\' : \'card\'}',
                'className={[\'card\', active, \'card--active\']}',
                'class="card card--active"',
              ],
              answer: 1,
              explanation: 'A ternary produces a valid string in both states. A bare interpolation is not JSX syntax, and an array passed to className would be coerced to a comma-separated string.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l47-d1',
            title: 'A class for rules, a value for data',
            body: 'The card gets its class by joining the truthy names. The bar takes its width from state, through the style prop.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

export default function App() {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState(40)
  const cls = ['card', active && 'card--active'].filter(Boolean).join(' ')

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <div
        style={{
          border: '1px solid #d8dee6',
          borderRadius: 6,
          padding: 8,
          background: active ? '#eef2ff' : '#fff',
        }}
      >
        <strong>Card</strong>
        <div style={{ color: '#5b6470' }}>className: {cls}</div>
      </div>
      <button onClick={() => setActive(!active)} style={{ marginTop: 8 }}>
        Toggle active
      </button>
      <div
        style={{ width: value + '%', height: 8, background: '#2563eb', marginTop: 8 }}
      />
      <button onClick={() => setValue(value === 40 ? 80 : 40)} style={{ marginTop: 8 }}>
        Widen bar
      </button>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 240,
          },
          {
            type: 'text',
            id: 'react-l47-intro',
            body: '**CSS styling approaches.** The simplest way to style a React component is still a CSS file. Import it, and the classes it defines are available to the JSX in that module — hovering, focus states, media queries and pseudo-elements all keep working.',
          },
          {
            type: 'text',
            id: 'react-l47-b2',
            body: 'Inline styles cover the other half: a value that comes from data. The `style` prop takes an object with camelCase keys, which makes a computed width or a colour from state straightforward. Where a class name is conditional, a small join helper keeps the JSX readable.',
          },
          {
            type: 'heading',
            id: 'react-l47-h1',
            level: 2,
            body: 'A stylesheet for rules, an object for data',
          },
          {
            type: 'code',
            id: 'react-l47-code',
            language: 'jsx',
            title: 'class names and a dynamic style',
            code: `import './App.css'\n\nfunction Card({ title, highlighted }) {\n  return (\n    <div className={highlighted ? 'card card--active' : 'card'}>\n      <h2 className="card__title">{title}</h2>\n    </div>\n  )\n}\n\n// Inline styles carry values that come from data:\nfunction Bar({ value }) {\n  return <div className="bar" style={{ width: value + '%' }} />\n}`,
          },
          {
            type: 'list',
            id: 'react-l47-list',
            style: 'bullet',
            items: [
              'A CSS file imported by the component works exactly as in plain HTML — one class name, one rule.',
              'The `style` prop takes an object with camelCase keys: `style={{ fontSize: ’12px’ }}`.',
              'Build a conditional class list by joining the truthy names, not by string concatenation.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l47-tip',
            title: 'Keep class names predictable',
            body: 'A stable naming pattern — `card`, `card__title`, `card--active` — makes styles easy to find from the markup. Consistency matters more than the exact scheme.',
          },
          {
            type: 'heading',
            id: 'react-l47-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l47-b3',
            body: 'Write the helper that builds a class string from a mix of names and conditions.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l47-x1',
            exercise: {
              id: 'ex-react-l47',
              instructions:
                'Write cx(...parts) returning the truthy parts joined by a single space. Falsy parts — false, null, undefined, or an empty string — are skipped, and no part produces a leading or trailing space.',
              languages: ['javascript'],
              files: [
                {
                  path: 'classNames.js',
                  language: 'javascript',
                  content: `// Join the truthy class names with a single space.\nexport function cx(...parts) {\n  return ''\n}\n`,
                },
              ],
              tests: [
                { id: 'ex-react-l47-t1', label: 'joins two names', body: "return cx('a', 'b') === 'a b'" },
                {
                  id: 'ex-react-l47-t2',
                  label: 'skips a false condition',
                  body: "return cx('a', false, 'b') === 'a b'",
                },
                { id: 'ex-react-l47-t3', label: 'no parts means no classes', body: "return cx() === ''" },
                {
                  id: 'ex-react-l47-t4',
                  label: 'falsy parts are all skipped',
                  body: "return cx(false, null, undefined, '') === ''",
                },
                {
                  id: 'ex-react-l47-t5',
                  label: 'a single name has no stray space',
                  body: "return cx('only') === 'only'",
                },
              ],
              hints: [
                'Filter out the falsy parts first, then join what is left.',
                'Boolean filtering removes false, null, undefined and the empty string in one step.',
                'return parts.filter(Boolean).join(" ").',
              ],
              solutionFiles: [
                {
                  path: 'classNames.js',
                  language: 'javascript',
                  content: `export function cx(...parts) {\n  return parts.filter(Boolean).join(' ')\n}\n`,
                },
              ],
              testNotes:
                'The single-name and all-falsy checks catch implementations that add a leading or trailing space.',
            },
          },
        ],
      },
      {
        id: 'react-l48',
        title: 'CSS Modules',
        description: 'Scoped styles with CSS Modules, where class names are locally available by default.',
        duration: 5,
        objectives: [
          'Import a .module.css file and reference its classes in JSX',
          'Understand how CSS Modules generate unique class names',
          'Use the :global selector for styles that should not be scoped',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l48',
          title: 'CSS Modules quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l48-q1',
              type: 'blank',
              prompt: 'When should you NOT use useCallback?',
              answers: [
                'when the callback is not passed to a memoized child',
                'when there are no children',
              ],
              explanation: 'useCallback is only useful when a function reference stability matters — i.e. when passing to a memoized child or as a dependency.',
            },
            {
              id: 'quiz-react-l48-q2',
              type: 'multiple-choice',
              prompt: 'Which import makes the class names in the stylesheet scoped to the file?',
              options: [
                'import \'./Card.css\'',
                'import styles from \'./Card.module.css\'',
                'import styles from \'./Card.css\'',
                'import \'./Card.module.css\'',
              ],
              answer: 1,
              explanation: 'Only the `.module.css` extension triggers the scoping transform, and the default import is the object that maps your names to the generated ones. A plain `.css` import stays global.',
            },
            {
              id: 'quiz-react-l48-q3',
              type: 'identify-error',
              prompt: 'Why will the imported styles not apply to this div?',
              code: 'import styles from \'./Card.module.css\'\n\nexport default function Card() {\n  return <div className="card">Card</div>\n}',
              options: [
                'className must be styles.card, because the build renamed the class',
                'A CSS module cannot be imported into a JSX file',
                'The component should use the style prop instead of className',
                'className only accepts literal strings, never imported values',
              ],
              answer: 0,
              explanation: 'The build rewrites `.card` to a unique name and exposes it on the imported object. Writing the literal "card" points at a class that no longer exists in the output.',
            },
            {
              id: 'quiz-react-l48-q4',
              type: 'multiple-choice',
              prompt: 'What is `:global(...)` for in a CSS module?',
              options: [
                'Marking a rule so the build leaves its class name unscoped',
                'Importing a stylesheet from node_modules',
                'Applying a class to every module in the application',
                'Disabling CSS Modules for the whole project',
              ],
              answer: 0,
              explanation: '`:global(...)` is the escape hatch for the rare class that must keep its real name, for example when styling third-party markup. Everything else in the file stays scoped.',
            },
            {
              id: 'quiz-react-l48-q5',
              type: 'multiple-choice',
              prompt: 'Two different modules each define a `.card` class. What happens?',
              options: [
                'The later import wins and replaces the other rule',
                'Both are rewritten to unique names, so each rule applies only to its own component',
                'The build throws a duplicate-class error',
                'They collide only when the files are in the same folder',
              ],
              answer: 1,
              explanation: 'Scoping is per file, so the same short name can be reused safely. That is the main advantage over a plain stylesheet, where import order decides the winner.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l48-d1',
            title: 'Classes come from the import',
            body: 'A CSS module exports a mapping, so the class name in the DOM is unique to the file. The markup only references keys.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

const styles = {
  card: 'Card_module__card_3x9f',
  active: 'Card_module__active_7b2a',
}

export default function App() {
  const [on, setOn] = useState(false)
  const cls = [styles.card, on && styles.active].filter(Boolean).join(' ')

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <div
        style={{
          border: '1px solid #d8dee6',
          borderRadius: 6,
          padding: 8,
          background: on ? '#eef2ff' : '#fff',
        }}
      >
        <strong>Scoped card</strong>
        <div style={{ color: '#5b6470' }}>className: {cls}</div>
      </div>
      <button onClick={() => setOn(!on)} style={{ marginTop: 8 }}>
        Toggle
      </button>
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
            id: 'react-l48-intro',
            body: '**CSS Modules.** A plain CSS file is global: two components that both define `.card` collide, and the winner depends on import order. A file ending in `.module.css` is scoped instead — each class name is rewritten to a unique one, and the mapping is exported from the import.',
          },
          {
            type: 'text',
            id: 'react-l48-b2',
            body: 'You reference classes through the imported object: `className={styles.card}` rather than `className="card"`. Because the generated names are unique, styles can be written with short, natural names and never leak. `:global(...)` is the escape hatch when something genuinely must stay unscoped.',
          },
          {
            type: 'heading',
            id: 'react-l48-h1',
            level: 2,
            body: 'Short names, unique output',
          },
          {
            type: 'code',
            id: 'react-l48-code',
            language: 'jsx',
            title: 'a scoped stylesheet',
            code: `// Card.module.css\n// .card { border-radius: 8px; }\n// .title { font-size: 1.25rem; }\n\nimport styles from './Card.module.css'\n\nexport default function Card({ title }) {\n  return (\n    <div className={styles.card}>\n      <h2 className={styles.title}>{title}</h2>\n    </div>\n  )\n}\n\n// The build rewrites .card to something like Card_module__card_3x9f,\n// so it can never clash with another component's .card.`,
          },
          {
            type: 'list',
            id: 'react-l48-list',
            style: 'bullet',
            items: [
              'Only `.module.css` files are scoped; a plain `.css` import stays global.',
              'Classes are used through the imported object: `styles.card`.',
              'The scope is per file, so `.card` in two modules are different classes.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l48-tip',
            title: 'Composing classes still works',
            body: 'Because each class is a string, you can combine them as usual — `[styles.card, active && styles.active].filter(Boolean).join(’ ’)` — exactly like plain CSS class names.',
          },
          {
            type: 'heading',
            id: 'react-l48-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l48-b3',
            body: 'Write the naming rule the build applies: a class name scoped to the file it was declared in.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l48-x1',
            exercise: {
              id: 'ex-react-l48',
              instructions:
                "Write scopedName(file, className) returning a unique name built from the file and the class. Take the file name without its folder, drop the final extension, then join it to the class with an underscore. Example: ('Card.module.css', 'card') gives 'Card.module_card'.",
              languages: ['javascript'],
              files: [
                {
                  path: 'cssModules.js',
                  language: 'javascript',
                  content: `// 'Card.module.css' + 'card' -> 'Card.module_card'\nexport function scopedName(file, className) {\n  return className\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l48-t1',
                  label: 'combines the file and the class',
                  body: "return scopedName('Card.module.css', 'card') === 'Card.module_card'",
                },
                {
                  id: 'ex-react-l48-t2',
                  label: 'ignores the folder',
                  body: "return scopedName('src/Button.module.css', 'btn') === 'Button.module_btn'",
                },
                {
                  id: 'ex-react-l48-t3',
                  label: 'two classes from one file differ',
                  body: "return scopedName('A.module.css', 'x') !== scopedName('A.module.css', 'y')",
                },
                {
                  id: 'ex-react-l48-t4',
                  label: 'two files with the same class differ',
                  body: "return scopedName('A.module.css', 'card') !== scopedName('B.module.css', 'card')",
                },
              ],
              hints: [
                'Start by taking the last path segment: file.split("/").pop().',
                'Drop the final extension by cutting at the last dot.',
                'Remember to guard the no-dot case, then join with an underscore.',
              ],
              solutionFiles: [
                {
                  path: 'cssModules.js',
                  language: 'javascript',
                  content: `export function scopedName(file, className) {\n  const base = file.split('/').pop()\n  const dot = base.lastIndexOf('.')\n  const name = dot === -1 ? base : base.slice(0, dot)\n  return name + '_' + className\n}\n`,
                },
              ],
              testNotes:
                'The uniqueness checks are what matter here: the point of CSS Modules is that two files can use the same class name safely.',
            },
          },
        ],
      },
      {
        id: 'react-l49',
        title: 'CSS-in-JS and Sass',
        description: 'Using styled-components or emotion for dynamic styles, and integrating Sass with the build.',
        duration: 5,
        objectives: [
          'Write a styled component that accepts props for dynamic styling',
          'Use template literals to interpolate values into styles',
          'Configure the Sass preprocessor with Vite or Create React App',
          'Compare runtime CSS-in-JS with build-time extraction',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l49',
          title: 'CSS-in-JS and Sass quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l49-q1',
              type: 'multiple-choice',
              prompt: 'Which statement describes runtime CSS-in-JS?',
              options: [
                'Styles are compiled to a static CSS file before the app is deployed',
                'Styles are written in JavaScript and injected into the document while the app runs',
                'Only Sass can generate dynamic class names',
                'It replaces the browser’s style engine with a JavaScript renderer',
              ],
              answer: 1,
              explanation: 'Libraries such as styled-components and emotion generate class names and inject rules at runtime. Build-time extraction moves that work to the bundle instead.',
            },
            {
              id: 'quiz-react-l49-q2',
              type: 'multiple-choice',
              prompt: 'In `styled.button({ color: (props) => (props.primary ? \'white\' : \'#333\') })`, what decides the colour?',
              options: [
                'A CSS variable declared in the global stylesheet',
                'The props passed to the rendered button',
                'The order in which the module was imported',
                'A media query evaluated during the build',
              ],
              answer: 1,
              explanation: 'A CSS-in-JS style is a value, so a function can read props and return a different declaration per variant. One styled definition then serves every variant without extra classes.',
            },
            {
              id: 'quiz-react-l49-q3',
              type: 'code-output',
              prompt: 'Using the lesson serialiser, what CSS text does this style object produce?',
              code: 'toCss({ backgroundColor: \'blue\', marginTop: \'4px\' })',
              options: [
                'backgroundColor: blue; marginTop: 4px',
                'background-color: blue; margin-top: 4px',
                'background_color: blue; margin_top: 4px',
                'background-color:blue;margin-top:4px',
              ],
              answer: 1,
              explanation: 'Style objects use camelCase, but printed CSS uses kebab-case, with a space after each colon and "; " between declarations. This conversion is the core of every CSS-in-JS library.',
            },
            {
              id: 'quiz-react-l49-q4',
              type: 'multiple-choice',
              prompt: 'Why does Sass add no work for the browser at run time?',
              options: [
                'Because Sass classes are scoped per component',
                'Because Sass is compiled to plain CSS during the build',
                'Because browsers understand .scss files natively',
                'Because Sass rules are injected only when a component mounts',
              ],
              answer: 1,
              explanation: 'Sass is a preprocessor: variables, nesting and mixins are resolved before deployment, and the browser receives ordinary CSS. Runtime CSS-in-JS is the approach that does work while the page runs.',
            },
            {
              id: 'quiz-react-l49-q5',
              type: 'multiple-choice',
              prompt: 'What is needed for Vite to handle an `import \'./styles.scss\'`?',
              options: [
                'Nothing — Vite parses Sass natively',
                'Install the sass package so the preprocessor is available',
                'Rename the file to styles.module.css',
                'Add the styled-components plugin to the Vite config',
              ],
              answer: 1,
              explanation: 'Vite handles the import pipeline but delegates Sass syntax to the sass compiler, which must be installed. Once it is present, `.scss` files compile as part of the build.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l49-d1',
            title: 'Props drive the style',
            body: 'In this approach a style is a value, so a prop can pick the colours directly. Switch the variant and the style object changes.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

export default function App() {
  const [primary, setPrimary] = useState(true)
  const background = primary ? '#2563eb' : '#e5e7eb'
  const color = primary ? '#ffffff' : '#1f2937'

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <button
        style={{
          background,
          color,
          border: 'none',
          borderRadius: 6,
          padding: '8px 14px',
        }}
      >
        {primary ? 'Primary' : 'Default'}
      </button>
      <button onClick={() => setPrimary(!primary)} style={{ marginLeft: 8 }}>
        Switch variant
      </button>
      <div style={{ marginTop: 8, color: '#5b6470' }}>background: {background}</div>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 180,
          },
          {
            type: 'text',
            id: 'react-l49-intro',
            body: '**CSS-in-JS and Sass.** Two approaches trade off differently. CSS-in-JS writes styles as JavaScript values, so a prop can drive a colour or a size directly; the styles are computed at run time. Sass goes the other way — variables, nesting and mixins, compiled to plain CSS before the browser sees anything.',
          },
          {
            type: 'text',
            id: 'react-l49-b2',
            body: 'Both reduce to text in the end. A styled component eventually produces a class and a rule, and a Sass file produces a stylesheet the bundler links. Knowing that a style is a value — and that a value can be printed as CSS text — makes either library easier to reason about.',
          },
          {
            type: 'heading',
            id: 'react-l49-h1',
            level: 2,
            body: 'Styles as values, styles built ahead of time',
          },
          {
            type: 'code',
            id: 'react-l49-code',
            language: 'javascript',
            title: 'a dynamic style object, and a Sass variable',
            code: `// CSS-in-JS: styles are values, so props can drive them.\nconst Button = styled.button({\n  color: (props) => (props.primary ? 'white' : '#333'),\n  background: (props) => (props.primary ? '#2563eb' : '#eee'),\n})\n\n// A style object prints as CSS declarations — camelCase becomes kebab-case:\n// { fontSize: '12px' }   ->   font-size: 12px\n\n// Sass is the opposite trade: compiled at build time, no runtime cost.\n// @use './variables' as vars;\n// .card { color: vars.$ink; }`,
          },
          {
            type: 'list',
            id: 'react-l49-list',
            style: 'bullet',
            items: [
              'A styled component takes props, so one definition serves every variant.',
              'Style objects use camelCase keys; the printed CSS uses kebab-case.',
              'Sass is resolved during the build, so it costs the browser nothing at run time.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l49-warn',
            title: 'Runtime styling has a runtime cost',
            body: 'CSS-in-JS libraries generate and inject rules while the page runs, which adds work on every new style. Some libraries extract the CSS at build time to avoid it; if you use a runtime one, keep an eye on what it emits.',
          },
          {
            type: 'heading',
            id: 'react-l49-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l49-b3',
            body: 'Write the step every CSS-in-JS library must perform: turn a style object into CSS declarations.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l49-x1',
            exercise: {
              id: 'ex-react-l49',
              instructions:
                "Write toCss(styles) returning the declarations of a style object. Convert each camelCase key to kebab-case, follow it with ': ' and the value, and join the declarations with '; '. Example: toCss({ color: 'red', fontSize: '12px' }) gives 'color: red; font-size: 12px'.",
              languages: ['javascript'],
              files: [
                {
                  path: 'styleObject.js',
                  language: 'javascript',
                  content: `// Serialise a style object to CSS declarations.\nexport function toCss(styles) {\n  return ''\n}\n`,
                },
              ],
              tests: [
                { id: 'ex-react-l49-t1', label: 'a single declaration', body: "return toCss({ color: 'red' }) === 'color: red'" },
                {
                  id: 'ex-react-l49-t2',
                  label: 'camelCase becomes kebab-case',
                  body: "return toCss({ fontSize: '12px' }) === 'font-size: 12px'",
                },
                {
                  id: 'ex-react-l49-t3',
                  label: 'several declarations are joined with a semicolon',
                  body: "return toCss({ backgroundColor: 'blue', marginTop: '4px' }) === 'background-color: blue; margin-top: 4px'",
                },
                { id: 'ex-react-l49-t4', label: 'an empty style object gives no text', body: "return toCss({}) === ''" },
              ],
              hints: [
                'Work over Object.keys(styles) and build one declaration per key.',
                'Convert camelCase by inserting a dash before each capital letter, then lower-casing.',
                'Join the declarations with "; " — not with a trailing semicolon.',
              ],
              solutionFiles: [
                {
                  path: 'styleObject.js',
                  language: 'javascript',
                  content: `export function toCss(styles) {\n  return Object.keys(styles)\n    .map((key) => key.replace(/([A-Z])/g, '-$1').toLowerCase() + ': ' + styles[key])\n    .join('; ')\n}\n`,
                },
              ],
              testNotes:
                'The multi-declaration check pins down the join separator, and the camelCase checks confirm the conversion runs.',
            },
          },
        ],
      },
    ],
  },
]
