import type { Section } from '~/types/content'

export const reactProjectSections: Section[] = [
  {
    id: 'react-s9',
    title: 'React Project — Dashboard Application',
    description: 'Build a full dashboard with routing, typed state, charts, and authentication flow.',
    lessons: [
      {
        id: 'react-l26',
        title: 'Project scaffolding and routing',
        description: 'Set up Vite + React + TypeScript, configure React Router with layout routes.',
        duration: 10,
        objectives: [
          'Scaffold a Vite + React + TypeScript project with React Router',
          'Create a layout route with a shared sidebar and header',
          'Define protected routes for authenticated pages',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-react-l26',
          title: 'Project scaffolding and routing quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l26-q1',
              type: 'identify-error',
              prompt: 'What does React.memo not help with?',
              code: '// A list of 1000 memoized items, each receiving a new inline object as prop',
              options: [
                'Passing a new object literal as a prop every render defeats memoization',
                'The items are not memoized themselves',
                'React.memo is not needed for lists',
                'Inline objects are always fast',
              ],
              answer: 0,
              explanation: 'React.memo does a shallow comparison of props. If you pass a new object literal each render, the comparison always fails and memoization is wasted.',
            },
            {
              id: 'quiz-react-l26-q2',
              type: 'multiple-choice',
              prompt: 'What does `<Outlet />` do inside a layout route?',
              options: [
                'Renders the matched child route in that spot',
                'Renders the parent layout a second time',
                'Redirects to the index route',
                'Lists every route registered in the app',
              ],
              answer: 0,
              explanation: 'The layout renders the shared header and sidebar once, and Outlet marks where the child page goes. Navigation then swaps only the content inside the outlet.',
            },
            {
              id: 'quiz-react-l26-q3',
              type: 'multiple-choice',
              prompt: 'Under the route with `path: \'/\'`, what does `{ index: true, element: <Overview /> }` mean?',
              options: [
                'The route matches only the URL /index',
                'It is the child rendered at the parent path itself',
                'It is the highest-priority route in the whole app',
                'It is a redirect to the /overview URL',
              ],
              answer: 1,
              explanation: 'An index route is the default child shown when the parent path matches with no further segment. That is how the dashboard overview appears at "/" without an extra URL piece.',
            },
            {
              id: 'quiz-react-l26-q4',
              type: 'multiple-choice',
              prompt: 'Which route definition handles an unknown URL?',
              options: [
                '{ path: \'/404\', element: <NotFound /> }',
                '{ path: \'**\', element: <NotFound /> }',
                '{ path: \'*\', element: <NotFound /> }',
                '{ path: \'?\', element: <NotFound /> }',
              ],
              answer: 2,
              explanation: 'A single `*` is React Router wildcard that matches anything no other route claimed. It is placed outside the layout when the not-found page should not show the dashboard frame.',
            },
            {
              id: 'quiz-react-l26-q5',
              type: 'multiple-choice',
              prompt: 'Why use `NavLink` rather than a plain link for the sidebar?',
              options: [
                'It provides an isActive flag so the current section can be styled without extra state',
                'It prefetches the chunk for every route in the app',
                'It is the only component that can navigate between routes',
                'It blocks navigation until the target page has loaded',
              ],
              answer: 0,
              explanation: 'NavLink tells you when its target matches the current URL, so the active item can be styled directly. That removes the need to track the selected section in component state.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l26-d1',
            title: 'A frame that swaps its page',
            body: 'The layout route renders the header and sidebar once, and swaps only the child in the main area. Click a link to move between child routes.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

const pages = ['Overview', 'Reports', 'Settings']

export default function App() {
  const [page, setPage] = useState('Overview')
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <header style={{ borderBottom: '1px solid #e2e5ea', paddingBottom: 6 }}>
        <strong>Dashboard</strong>
      </header>
      <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {pages.map((name) => (
            <button
              key={name}
              onClick={() => setPage(name)}
              style={{ textAlign: 'left', fontWeight: page === name ? 700 : 400 }}
            >
              {name}
            </button>
          ))}
        </nav>
        <main style={{ color: '#5b6470' }}>
          <h3 style={{ margin: 0 }}>{page}</h3>
          <p style={{ margin: '4px 0 0' }}>The child route renders here, in the Outlet.</p>
        </main>
      </div>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 200,
          },
          {
            type: 'text',
            id: 'react-l26-intro',
            body: '**Step 1: the shell.** A dashboard is a set of pages that share one frame — a header with the product name and the signed-in user, a sidebar for navigation, and an area that swaps as you move between sections. Building that frame first means every later page is added to a place that already exists.',
          },
          {
            type: 'text',
            id: 'react-l26-b2',
            body: 'The frame is a layout route. The router renders it for every child path, and the layout renders an `Outlet` where the current child goes. Navigation lives in the sidebar as `NavLink`s, so the active section is visible without any extra state.',
          },
          {
            type: 'heading',
            id: 'react-l26-h1',
            level: 2,
            body: 'Requirements',
          },
          {
            type: 'list',
            id: 'react-l26-list',
            style: 'bullet',
            items: [
              'A layout route at `/` that renders the header, the sidebar and an `Outlet`.',
              'Child routes for the overview (index), reports and settings pages.',
              'A catch-all `*` route that renders a not-found page.',
            ],
          },
          {
            type: 'heading',
            id: 'react-l26-h2',
            level: 2,
            body: 'The router and its layout',
          },
          {
            type: 'code',
            id: 'react-l26-code',
            language: 'tsx',
            title: 'main.tsx — routes and the shared layout',
            code: `const router = createBrowserRouter([\n  {\n    path: '/',\n    element: <DashboardLayout title="Dashboard" />,\n    children: [\n      { index: true, element: <Overview /> },\n      { path: 'reports', element: <RequireUser><Reports /></RequireUser> },\n      { path: 'settings', element: <RequireUser><Settings /></RequireUser> },\n    ],\n  },\n  { path: '*', element: <NotFound /> },\n])\n\nfunction DashboardLayout({ title }: { title: string }) {\n  return (\n    <div className="app-shell">\n      <header>\n        <h1>{title}</h1>\n        <UserMenu />\n      </header>\n      <main><Outlet /></main>\n    </div>\n  )\n}`,
          },
          {
            type: 'tip',
            id: 'react-l26-tip',
            title: 'Build the frame before the pages',
            body: 'A placeholder in each child route — `<h2>Overview</h2>` is enough — lets you check navigation, the active link and the layout before writing any real page. It is much easier to fix the frame while it is empty.',
          },
          {
            type: 'heading',
            id: 'react-l26-h3',
            level: 2,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'react-l26-b3',
            body: 'Build the layout component itself: the frame every page renders inside.',
          },
          {
            type: 'exercise',
            id: 'react-l26-x1',
            exercise: {
              id: 'ex-react-l26',
              instructions:
                "Write DashboardLayout({ title, children }) returning a div with className 'app-shell'. Its first child is a header containing an h1 with the title; its second child is a main element containing the nested children. The tests read the element tree the component returns.",
              languages: ['jsx'],
              files: [
                {
                  path: 'DashboardLayout.jsx',
                  language: 'jsx',
                  content: `// The frame every page renders inside.\nexport default function DashboardLayout({ title, children }) {\n  return <div />\n}\n`,
                },
              ],
              previewProps: { title: 'Dashboard', children: 'Your tasks appear here.' },
              tests: [
                {
                  id: 'ex-react-l26-t1',
                  label: 'the root is the app shell div',
                  body: "const el = DashboardLayout({ title: 'Dash', children: 'x' }); return el.type === 'div' && el.props.className === 'app-shell'",
                },
                {
                  id: 'ex-react-l26-t2',
                  label: 'the header comes first',
                  body: "const kids = DashboardLayout({ title: 'Dash', children: 'x' }).props.children; return kids[0].type === 'header'",
                },
                {
                  id: 'ex-react-l26-t3',
                  label: 'the header shows the title in an h1',
                  body: "const kids = DashboardLayout({ title: 'Dash', children: 'x' }).props.children; const header = kids[0]; const inner = Array.isArray(header.props.children) ? header.props.children[0] : header.props.children; return inner.type === 'h1' && inner.props.children === 'Dash'",
                },
                {
                  id: 'ex-react-l26-t4',
                  label: 'the content sits in main',
                  body: "const kids = DashboardLayout({ title: 'Dash', children: 'Panel content' }).props.children; return kids[1].type === 'main' && kids[1].props.children === 'Panel content'",
                },
                {
                  id: 'ex-react-l26-t5',
                  label: 'nothing is rendered outside the shell',
                  body: "const kids = DashboardLayout({ title: 'Dash', children: 'x' }).props.children; return Array.isArray(kids) && kids.length === 2",
                },
              ],
              hints: [
                'The div wraps exactly two children, in order: the <header> and the <main>.',
                'The <h1> goes inside the header, with the title as its child.',
                'Render the nested content inside main by placing {children} there.',
              ],
              solutionFiles: [
                {
                  path: 'DashboardLayout.jsx',
                  language: 'jsx',
                  content: `export default function DashboardLayout({ title, children }) {\n  return (\n    <div className="app-shell">\n      <header>\n        <h1>{title}</h1>\n      </header>\n      <main>{children}</main>\n    </div>\n  )\n}\n`,
                },
              ],
              testNotes:
                'The header test tolerates extra header content by looking at the first child, so a user menu can be added without breaking the checkpoint.',
            },
          },
        ],
      },
      {
        id: 'react-l27',
        title: 'Typed state and context',
        description: 'A typed context provider for user authentication and dashboard data.',
        duration: 10,
        objectives: [
          'Create a typed User and Session context',
          'Build a provider component with typed state',
          'Consume context in deeply nested components with no any',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-react-l27',
          title: 'Typed state and context quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l27-q1',
              type: 'blank',
              prompt: 'What hook provides typed context to descendants?',
              answers: [
                'useContext',
                'useContext<ContextType>',
              ],
              explanation: 'useContext returns the current context value, typed by the Context<T> you created.',
            },
            {
              id: 'quiz-react-l27-q2',
              type: 'multiple-choice',
              prompt: 'What is the signed-out session shape used as the context default?',
              options: [
                'null',
                '{ user: null }',
                'undefined',
                '{ user: {} }',
              ],
              answer: 1,
              explanation: 'The session is always an object with a user field, and null means nobody is signed in. Keeping one shape means consumers can read `session.user` without a null check on the session itself.',
            },
            {
              id: 'quiz-react-l27-q3',
              type: 'multiple-choice',
              prompt: 'Why wrap `useContext(SessionContext)` in a `useSession` hook?',
              options: [
                'It makes context updates re-render faster',
                'It is required for TypeScript to infer the context type',
                'It lets the provider avoid re-rendering its children',
                'It keeps the context object in one file, so a missing-provider check can be added in one place',
              ],
              answer: 3,
              explanation: 'The hook becomes the single access point for the session. Later changes, such as throwing when no provider is present or deriving a value, then need to touch only that one function.',
            },
            {
              id: 'quiz-react-l27-q4',
              type: 'multiple-choice',
              prompt: 'Why does the session reducer return the same object for an unknown action?',
              options: [
                'So React sees no change and skips an unnecessary re-render',
                'Because reducers are not allowed to create new objects',
                'To stop the action object from being mutated',
                'Because useReducer requires an identical return value',
              ],
              answer: 0,
              explanation: 'Returning the existing reference signals that nothing changed, so consumers do not update. Copying the state on every unrecognised action would cause needless renders.',
            },
            {
              id: 'quiz-react-l27-q5',
              type: 'multiple-choice',
              prompt: 'What should the login case of the reducer return?',
              options: [
                '{ user: action.user }',
                '{ ...session, user: action.user }',
                'Object.assign(session, { user: action.user })',
                '{ session, user: action.user }',
              ],
              answer: 1,
              explanation: 'A new object with the user replaced keeps the update immutable. Mutating the existing session would leave the same reference and React would not see a change.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l27-d1',
            title: 'One provider, any depth',
            body: 'A provider owns the session and the header reads it through context, with nothing passed down by props. Sign in and out to move the value.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { createContext, useContext, useReducer } from 'react'

const SessionContext = createContext({ user: null })

function sessionReducer(session, action) {
  if (action.type === 'login') return { user: { name: 'Ada' } }
  if (action.type === 'logout') return { user: null }
  return session
}

function UserMenu() {
  const { user } = useContext(SessionContext)
  return (
    <span style={{ color: '#5b6470' }}>
      {user ? 'Signed in as ' + user.name : 'Signed out'}
    </span>
  )
}

export default function App() {
  const [session, dispatch] = useReducer(sessionReducer, { user: null })
  return (
    <SessionContext.Provider value={session}>
      <div style={{ fontFamily: 'system-ui' }}>
        <UserMenu />
        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
          <button onClick={() => dispatch({ type: 'login' })}>Log in</button>
          <button onClick={() => dispatch({ type: 'logout' })}>Log out</button>
        </div>
      </div>
    </SessionContext.Provider>
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
            id: 'react-l27-intro',
            body: '**Step 2: the session.** Almost every page needs to know who is signed in — the header to show a name, the reports page to decide whether to render at all. Passing that down through props means every intermediate component carries it. A context provider holds it once and hands it to whoever asks.',
          },
          {
            type: 'text',
            id: 'react-l27-b2',
            body: 'The state itself still belongs to a reducer: signing in and out are named events with clear rules, and keeping them in one function means the “can this user see this” question is answered by one piece of code rather than scattered across components.',
          },
          {
            type: 'heading',
            id: 'react-l27-h1',
            level: 2,
            body: 'Requirements',
          },
          {
            type: 'list',
            id: 'react-l27-list',
            style: 'bullet',
            items: [
              'A context holding the current session, with a null user when signed out.',
              'A provider component that owns the state and supplies it to the tree.',
              'A `useSession` hook so components never touch the context object directly.',
            ],
          },
          {
            type: 'heading',
            id: 'react-l27-h2',
            level: 2,
            body: 'A typed provider',
          },
          {
            type: 'code',
            id: 'react-l27-code',
            language: 'tsx',
            title: 'the session context and provider',
            code: `type Session = { user: User | null }\n\nconst SessionContext = createContext<Session>({ user: null })\n\nexport function SessionProvider({ children }: { children: ReactNode }) {\n  const [session, dispatch] = useReducer(sessionReducer, { user: null })\n\n  return (\n    <SessionContext.Provider value={session}>\n      {children}\n    </SessionContext.Provider>\n  )\n}\n\n// Components read the context through the hook, never directly:\nexport function useSession() {\n  return useContext(SessionContext)\n}`,
          },
          {
            type: 'tip',
            id: 'react-l27-tip',
            title: 'One hook, one access point',
            body: 'Wrapping `useContext` in a `useSession` hook means the context object appears in exactly one file. Later you can add a check for a missing provider, or derive values, without touching every consumer.',
          },
          {
            type: 'heading',
            id: 'react-l27-h3',
            level: 2,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'react-l27-b3',
            body: 'Write the reducer the provider runs: the named events that sign a user in and out.',
          },
          {
            type: 'exercise',
            id: 'react-l27-x1',
            exercise: {
              id: 'ex-react-l27',
              instructions:
                "Write sessionReducer(session, action) where session is { user }. A 'login' action stores action.user; a 'logout' action sets user to null; any other action returns the session unchanged. Always return a new object when something changes.",
              languages: ['javascript'],
              files: [
                {
                  path: 'session.js',
                  language: 'javascript',
                  content: `// session is { user: null }. Actions: login, logout.\nexport function sessionReducer(session, action) {\n  return session\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l27-t1',
                  label: 'login stores the user',
                  body: "const next = sessionReducer({ user: null }, { type: 'login', user: { id: 'u1' } }); return next.user.id === 'u1'",
                },
                {
                  id: 'ex-react-l27-t2',
                  label: 'logout clears the user',
                  body: "const next = sessionReducer({ user: { id: 'u1' } }, { type: 'logout' }); return next.user === null",
                },
                {
                  id: 'ex-react-l27-t3',
                  label: 'a new session object is returned on change',
                  body: "const before = { user: null }; const next = sessionReducer(before, { type: 'login', user: { id: 'u1' } }); return next !== before && next.user.id === 'u1'",
                },
                {
                  id: 'ex-react-l27-t4',
                  label: 'a later login replaces the user',
                  body: "const before = { user: { id: 'u1' } }; const next = sessionReducer(before, { type: 'login', user: { id: 'u2' } }); return next.user.id === 'u2'",
                },
                {
                  id: 'ex-react-l27-t5',
                  label: 'an unknown action changes nothing',
                  body: "const before = { user: { id: 'u1' } }; return sessionReducer(before, { type: 'nope' }) === before",
                },
              ],
              hints: [
                'Switch on action.type, exactly as in the session example.',
                'Return a copy with one field replaced: { ...session, user: ... }.',
                'For an unknown action return the same object so React sees no change at all.',
              ],
              solutionFiles: [
                {
                  path: 'session.js',
                  language: 'javascript',
                  content: `export function sessionReducer(session, action) {\n  switch (action.type) {\n    case 'login':\n      return { ...session, user: action.user }\n    case 'logout':\n      return { ...session, user: null }\n    default:\n      return session\n  }\n}\n`,
                },
              ],
              testNotes:
                'The identity check and the unknown-action check together confirm the reducer copies on change and stays put on anything else.',
            },
          },
        ],
      },
      {
        id: 'react-l28',
        title: 'Data fetching with types',
        description: 'Fetching dashboard metrics with typed responses and loading states.',
        duration: 10,
        objectives: [
          'Write a typed fetchData function with generics',
          'Handle loading, success, and error states with a discriminated union',
          'Cache responses in context with a typed Map',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-react-l28',
          title: 'Data fetching with types quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l28-q1',
              type: 'multiple-choice',
              prompt: 'What is the purpose of a layout route?',
              options: [
                'To group routes that share a common UI',
                'To speed up builds',
                'To define API endpoints',
                'To handle 404 pages',
              ],
              answer: 0,
              explanation: 'Layout routes share a common element (header, sidebar, etc.) across multiple child routes without duplicating it.',
            },
            {
              id: 'quiz-react-l28-q2',
              type: 'multiple-choice',
              prompt: 'Why prefer one `status` field over separate loading, error and data booleans?',
              options: [
                'It makes impossible combinations such as loading and ready at the same time unrepresentable',
                'It reduces the number of network requests',
                'It removes the need for a reducer',
                'It lets the component skip rendering while loading',
              ],
              answer: 0,
              explanation: 'A discriminated union ties the data or message to exactly one status, so contradictory states cannot be constructed. Separate flags let the component fall into states that should never happen.',
            },
            {
              id: 'quiz-react-l28-q3',
              type: 'multiple-choice',
              prompt: 'In a typed fetch helper, what should happen when `response.ok` is false?',
              options: [
                'Return null and let the caller guess what happened',
                'Return the raw response without parsing it',
                'Retry the request until it eventually succeeds',
                'Throw an error so the caller can move to the error state',
              ],
              answer: 3,
              explanation: 'A failed HTTP status still resolves the fetch promise, so the helper must check ok and throw. The component catch can then turn that error into the error variant of the load state.',
            },
            {
              id: 'quiz-react-l28-q4',
              type: 'multiple-choice',
              prompt: 'On the start action, why must data and error be reset to null?',
              options: [
                'Because a loading state may not hold any other fields',
                'Because reducers may only return primitive values',
                'So that the component remounts from scratch',
                'So a retry does not show stale data or an old error while it loads',
              ],
              answer: 3,
              explanation: 'Each action returns a complete state, not a patch. Clearing both fields means a retry starts clean instead of flashing the previous result or error.',
            },
            {
              id: 'quiz-react-l28-q5',
              type: 'multiple-choice',
              prompt: 'With `LoadState<T>`, what does narrowing on `state.status === \'ready\'` give you?',
              options: [
                'TypeScript knows state.data is of type T',
                'TypeScript knows state.message is a string',
                'TypeScript widens T to unknown',
                'Nothing, because status is typed as a plain string',
              ],
              answer: 0,
              explanation: 'The status field is the discriminant, so the ready branch is the only one that carries data. Checking it lets the compiler guarantee that state.data exists before it is rendered.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l28-d1',
            title: 'Loading, ready, and error',
            body: 'The same request lifecycle the checkpoint models: start moves to loading, and the outcome is either ready with data or error with a message.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useReducer } from 'react'

function loadReducer(state, action) {
  if (action.type === 'start') return { status: 'loading', data: null, error: null }
  if (action.type === 'success') return { status: 'ready', data: action.data, error: null }
  if (action.type === 'error') return { status: 'error', data: null, error: action.error }
  return state
}

function request(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) reject(new Error('Request failed'))
      else resolve([12, 30, 48])
    }, 300)
  })
}

export default function App() {
  const [state, dispatch] = useReducer(loadReducer, { status: 'idle', data: null, error: null })

  function load(shouldFail) {
    dispatch({ type: 'start' })
    request(shouldFail)
      .then((data) => dispatch({ type: 'success', data }))
      .catch((error) => dispatch({ type: 'error', error: error.message }))
  }

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <button onClick={() => load(false)}>Load data</button>
        <button onClick={() => load(true)}>Fail the request</button>
      </div>
      <div style={{ marginTop: 8, color: '#5b6470' }}>
        {state.status === 'loading' && <p style={{ margin: 0 }}>Loading...</p>}
        {state.status === 'error' && <p style={{ margin: 0 }}>Error: {state.error}</p>}
        {state.status === 'ready' && <p style={{ margin: 0 }}>Metrics: {state.data.join(', ')}</p>}
        {state.status === 'idle' && <p style={{ margin: 0 }}>No request yet.</p>}
      </div>
    </div>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 160,
          },
          {
            type: 'text',
            id: 'react-l28-intro',
            body: '**Step 3: data.** A request has three possible outcomes, and the pages that show data must handle all three. Modelling that as one state value with a `status` field — rather than a loose collection of booleans — makes it impossible to forget the error case.',
          },
          {
            type: 'text',
            id: 'react-l28-b2',
            body: 'That is a discriminated union: a `status` of `’loading’`, `’ready’` or `’error’`, with the data or the message attached to the matching variant. The same shape works with `useReducer`, which is how the provider owns the request lifecycle.',
          },
          {
            type: 'heading',
            id: 'react-l28-h1',
            level: 2,
            body: 'Requirements',
          },
          {
            type: 'list',
            id: 'react-l28-list',
            style: 'bullet',
            items: [
              'A state shape of `{ status, data, error }` covering loading, ready and error.',
              'A typed fetch helper that returns the parsed data and throws on a failed request.',
              'Every page rendering all three states — a spinner, the data, or the message.',
            ],
          },
          {
            type: 'heading',
            id: 'react-l28-h2',
            level: 2,
            body: 'One state, three variants',
          },
          {
            type: 'code',
            id: 'react-l28-code',
            language: 'tsx',
            title: 'a discriminated union and the states that read it',
            code: `type LoadState<T> =\n  | { status: 'loading' }\n  | { status: 'ready'; data: T }\n  | { status: 'error'; message: string }\n\nasync function fetchMetrics(): Promise<Metrics> {\n  const response = await fetch('/api/metrics')\n  if (!response.ok) throw new Error('Request failed')\n  return response.json() as Promise<Metrics>\n}\n\n// Each branch is handled explicitly, so none is forgotten:\n// if (state.status === 'loading') return <Spinner />\n// if (state.status === 'error') return <ErrorPanel message={state.message} />\n// return <MetricsGrid data={state.data} />`,
          },
          {
            type: 'warning',
            id: 'react-l28-warn',
            title: 'A boolean per state does not scale',
            body: 'Loading, error and data as three separate fields allows states that cannot happen — loading and ready at the same time. One status field with the data attached makes those states unrepresentable.',
          },
          {
            type: 'heading',
            id: 'react-l28-h3',
            level: 2,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'react-l28-b3',
            body: 'Write the reducer that moves the state through a request lifecycle.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l28-x1',
            exercise: {
              id: 'ex-react-l28',
              instructions:
                "Write loadReducer(state, action) with actions 'start', 'success' and 'error'. start gives { status: 'loading', data: null, error: null }; success gives { status: 'ready', data: action.data, error: null }; error gives { status: 'error', data: null, error: action.error }. Any other action returns the state unchanged.",
              languages: ['javascript'],
              files: [
                {
                  path: 'loader.js',
                  language: 'javascript',
                  content: `// state is { status, data, error }.\nexport function loadReducer(state, action) {\n  return state\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l28-t1',
                  label: 'starting a request moves to loading',
                  body: "return loadReducer({ status: 'idle' }, { type: 'start' }).status === 'loading'",
                },
                {
                  id: 'ex-react-l28-t2',
                  label: 'success carries the data',
                  body: "const next = loadReducer({ status: 'loading' }, { type: 'success', data: [1, 2] }); return next.status === 'ready' && next.data.length === 2",
                },
                {
                  id: 'ex-react-l28-t3',
                  label: 'an error carries the message',
                  body: "const next = loadReducer({ status: 'loading' }, { type: 'error', error: 'Boom' }); return next.status === 'error' && next.error === 'Boom'",
                },
                {
                  id: 'ex-react-l28-t4',
                  label: 'a retry clears the previous result',
                  body: "const next = loadReducer({ status: 'ready', data: [1], error: 'old' }, { type: 'start' }); return next.status === 'loading' && next.data === null && next.error === null",
                },
                {
                  id: 'ex-react-l28-t5',
                  label: 'an unknown action changes nothing',
                  body: "const before = { status: 'idle' }; return loadReducer(before, { type: 'nope' }) === before",
                },
              ],
              hints: [
                'Each case returns a complete new state object, not a partially updated one.',
                'On start, clear both the data and the error so a retry starts clean.',
                'The default case returns the same object, so nothing re-renders.',
              ],
              solutionFiles: [
                {
                  path: 'loader.js',
                  language: 'javascript',
                  content: `export function loadReducer(state, action) {\n  switch (action.type) {\n    case 'start':\n      return { status: 'loading', data: null, error: null }\n    case 'success':\n      return { status: 'ready', data: action.data, error: null }\n    case 'error':\n      return { status: 'error', data: null, error: action.error }\n    default:\n      return state\n  }\n}\n`,
                },
              ],
              testNotes:
                'The retry check is the one that catches a reducer that keeps stale data or an old error around during loading.',
            },
          },
        ],
      },
      {
        id: 'react-l29',
        title: 'Charts and visual components',
        description: 'Building reusable, typed chart components from scratch.',
        duration: 8,
        objectives: [
          'Create a BarChart component that accepts typed data points',
          'Use generics to accept different data shapes',
          'Style with CSS modules or styled-components',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-react-l29',
          title: 'Charts and visual components quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l29-q1',
              type: 'true-false',
              prompt: 'React Context is the best solution for state used by less than 3 components.',
              answer: false,
              explanation: 'Context adds complexity. For simple prop passing, use props. Context shines when many components at different levels need the same data.',
            },
            {
              id: 'quiz-react-l29-q2',
              type: 'multiple-choice',
              prompt: 'Why seed the maximum with 1 in `Math.max(...points.map((point) => point.value), 1)`?',
              options: [
                'It rounds every percentage to a whole number',
                'An empty series would otherwise give -Infinity and produce invalid heights',
                'It caps values above 1 so bars never grow too tall',
                'It sorts the points by value before rendering',
              ],
              answer: 1,
              explanation: 'Math.max with no arguments returns -Infinity, which would make every percentage infinite or NaN. The floor of 1 keeps the math finite for empty and all-zero series.',
            },
            {
              id: 'quiz-react-l29-q3',
              type: 'multiple-choice',
              prompt: 'An all-zero series is passed to `barHeights`. What should it return?',
              options: [
                'An array of zeros',
                'An empty array',
                'An array of NaN values',
                'An array of 100s, so every bar is full height',
              ],
              answer: 0,
              explanation: 'Dividing zero by zero yields NaN, so the maximum of zero needs its own branch. Returning zeros keeps one bar per input with a valid height.',
            },
            {
              id: 'quiz-react-l29-q4',
              type: 'code-output',
              prompt: 'What does this call return?',
              code: 'barHeights([1, 2, 4])',
              options: [
                '[1, 2, 4]',
                '[10, 20, 40]',
                '[25, 50, 100]',
                '[100, 100, 100]',
              ],
              answer: 2,
              explanation: 'Each value is divided by the largest value (4), multiplied by 100 and rounded. The tallest bar is always the full 100 percent.',
            },
            {
              id: 'quiz-react-l29-q5',
              type: 'multiple-choice',
              prompt: 'Why keep the percentage calculation in a plain function instead of inside the chart component?',
              options: [
                'Plain functions run faster than React components',
                'It can be tested on its own and does not depend on React',
                'Components are not allowed to perform arithmetic',
                'It prevents the chart from ever re-rendering',
              ],
              answer: 1,
              explanation: 'Separating the arithmetic from rendering leaves the component mapping points to heights. The calculation can then be checked directly, including the empty and all-zero edge cases.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l29-d1',
            title: 'Bars scaled to the largest value',
            body: 'Each bar height is the value divided by the largest value. Change the data and the tallest bar always fills the chart.',
            files: [
              {
                path: 'BarChart.jsx',
                language: 'jsx',
                content: `export default function BarChart({ points }) {
  const max = Math.max(...points.map((point) => point.value), 1)

  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 100 }}>
        {points.map((point) => (
          <div
            key={point.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              height: '100%',
            }}
          >
            <div
              style={{
                width: 28,
                background: '#7cb3f0',
                height: (point.value / max) * 100 + '%',
                borderRadius: '4px 4px 0 0',
              }}
            />
            <span style={{ fontSize: 12, marginTop: 4, color: '#5b6470' }}>{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
`,
              },
            ],
            previewProps: { points: [{ label: 'Mon', value: 12 }, { label: 'Tue', value: 30 }, { label: 'Wed', value: 48 }] },
            height: 170,
          },
          {
            type: 'text',
            id: 'react-l29-intro',
            body: '**Step 4: the chart.** A chart is a list of items with a proportional height. There is no need for a charting library to draw one: the data is an array of points, and CSS does the drawing once each point knows what percentage of the largest value it represents.',
          },
          {
            type: 'text',
            id: 'react-l29-b2',
            body: 'That percentage is the whole calculation, and it belongs in a plain function — easy to test, and unaware of React. The component then maps the points and applies the number as a height, which keeps the rendering trivial and the arithmetic verifiable.',
          },
          {
            type: 'heading',
            id: 'react-l29-h1',
            level: 2,
            body: 'Requirements',
          },
          {
            type: 'list',
            id: 'react-l29-list',
            style: 'bullet',
            items: [
              'A typed `Point` of `{ label, value }`, and a component that takes an array of them.',
              'Each bar’s height scaled against the largest value, so the tallest fills the chart.',
              'Scale an empty or all-zero series without dividing by zero.',
            ],
          },
          {
            type: 'heading',
            id: 'react-l29-h2',
            level: 2,
            body: 'Data in, bars out',
          },
          {
            type: 'code',
            id: 'react-l29-code',
            language: 'tsx',
            title: 'a typed bar chart',
            code: `type Point = { label: string; value: number }\n\nexport default function BarChart({ points }: { points: Point[] }) {\n  const max = Math.max(...points.map((point) => point.value), 1)\n\n  return (\n    <ul className="chart">\n      {points.map((point) => (\n        <li key={point.label} className="chart__bar">\n          <span\n            className="chart__fill"\n            style={{ height: (point.value / max) * 100 + '%' }}\n          />\n          <span className="chart__label">{point.label}</span>\n        </li>\n      ))}\n    </ul>\n  )\n}`,
          },
          {
            type: 'tip',
            id: 'react-l29-tip',
            title: 'Guard the maximum',
            body: 'An empty series makes `Math.max()` return `-Infinity`. Seeding the comparison with a floor of 1 keeps every percentage finite, including for a series that is entirely zero.',
          },
          {
            type: 'heading',
            id: 'react-l29-h3',
            level: 2,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'react-l29-b3',
            body: 'Write the scaling function the chart is built on.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l29-x1',
            exercise: {
              id: 'ex-react-l29',
              instructions:
                'Write barHeights(values) returning each value as a percentage of the largest value, rounded to the nearest whole number, in the same order. An empty array returns an empty array, and an array whose largest value is zero returns zeros.',
              languages: ['javascript'],
              files: [
                {
                  path: 'chart.js',
                  language: 'javascript',
                  content: `// Each value as a percentage of the largest.\nexport function barHeights(values) {\n  return []\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l29-t1',
                  label: 'the largest value is the full height',
                  body: 'return JSON.stringify(barHeights([50, 100])) === "[50,100]"',
                },
                {
                  id: 'ex-react-l29-t2',
                  label: 'smaller values are scaled proportionally',
                  body: 'return JSON.stringify(barHeights([1, 2, 4])) === "[25,50,100]"',
                },
                {
                  id: 'ex-react-l29-t3',
                  label: 'an empty series has no bars',
                  body: 'return JSON.stringify(barHeights([])) === "[]"',
                },
                {
                  id: 'ex-react-l29-t4',
                  label: 'an all-zero series does not divide by zero',
                  body: 'return JSON.stringify(barHeights([0, 0])) === "[0,0]"',
                },
              ],
              hints: [
                'Find the largest value once, then divide each value by it.',
                'Multiply by 100 and round to get a whole-number percentage.',
                'Handle a maximum of zero separately, otherwise every entry becomes NaN.',
              ],
              solutionFiles: [
                {
                  path: 'chart.js',
                  language: 'javascript',
                  content: `export function barHeights(values) {\n  const max = Math.max(...values, 0)\n  if (max === 0) return values.map(() => 0)\n  return values.map((value) => Math.round((value / max) * 100))\n}\n`,
                },
              ],
              testNotes:
                'The all-zero check is what separates a guarded implementation from one that produces NaN for a flat series.',
            },
          },
        ],
      },
      {
        id: 'react-l30',
        title: 'Testing and deployment',
        description: 'Writing component tests and building for production.',
        duration: 7,
        objectives: [
          'Write tests for components with Testing Library',
          'Test protected routes with a mock auth context',
          'Build for production with Vite and verify the output',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l30',
          title: 'Testing and deployment quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l30-q1',
              type: 'multiple-choice',
              prompt: 'Which testing approach is most robust?',
              options: [
                'Querying by test ID exclusively',
                'Querying by display value and role',
                'Querying by class name',
                'Querying by element type',
              ],
              answer: 1,
              explanation: 'Testing Library prioritizes role, text, label, and display queries — the same way users find things on the page.',
            },
            {
              id: 'quiz-react-l30-q2',
              type: 'multiple-choice',
              prompt: 'A protected page is tested with a signed-out session and should render nothing. Which assertion is correct?',
              options: [
                'expect(screen.getByText(\'Revenue\')).not.toBeInTheDocument()',
                'expect(screen.findByText(\'Revenue\')).toBeNull()',
                'expect(screen.queryByText(\'Revenue\')).not.toBeInTheDocument()',
                'expect(screen.getByRole(\'heading\')).toBeUndefined()',
              ],
              answer: 2,
              explanation: 'queryBy* returns null when nothing matches, so the negation can assert absence. getBy* would throw before the assertion could run, and findBy* returns a promise.',
            },
            {
              id: 'quiz-react-l30-q3',
              type: 'multiple-choice',
              prompt: 'What do `vite build` and `vite preview` each do?',
              options: [
                'build runs the tests; preview deploys the app to production',
                'build starts the dev server; preview minifies its output',
                'Both start a development server on different ports',
                'build creates the production bundle; preview serves that built output locally',
              ],
              answer: 3,
              explanation: 'build produces the optimised bundle, and preview serves that exact output so it can be checked. Testing the built files locally catches problems the dev server hides.',
            },
            {
              id: 'quiz-react-l30-q4',
              type: 'multiple-choice',
              prompt: 'Why can the text of a component be tested without a real browser?',
              options: [
                'Because a component returns an element tree that can be walked directly',
                'Because Testing Library does not need a DOM at all',
                'Because all visible text is stored in a test id',
                'Because Vite pre-renders every component at build time',
              ],
              answer: 0,
              explanation: 'A function component returns a tree of elements and text, which a test can traverse to collect what the user would read. jsdom supplies just enough DOM for rendering and events.',
            },
            {
              id: 'quiz-react-l30-q5',
              type: 'multiple-choice',
              prompt: 'How is the auth context supplied when testing a protected route?',
              options: [
                'By setting a global window.session before the test',
                'By wrapping the render in SessionContext.Provider with a mock session',
                'By mocking React.useState to return a user',
                'By navigating to the login page first',
              ],
              answer: 1,
              explanation: 'The provider is the supported way to put a chosen session in front of the component under test. A signed-out value lets the test assert that the protected content stays absent.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l30-d1',
            title: 'What a test asserts on',
            body: 'A component test walks the returned tree for the text a user would read. Signed out, the reports component returns null, so its text is simply absent.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { createContext, useContext, useState } from 'react'

const SessionContext = createContext({ user: null })

function Reports() {
  const { user } = useContext(SessionContext)
  if (!user) return null
  return <h3 style={{ margin: 0 }}>Revenue: 42k</h3>
}

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  const session = signedIn ? { user: { name: 'Ada' } } : { user: null }

  return (
    <SessionContext.Provider value={session}>
      <div style={{ fontFamily: 'system-ui' }}>
        <button onClick={() => setSignedIn(!signedIn)}>
          {signedIn ? 'Sign out' : 'Sign in'}
        </button>
        <div style={{ marginTop: 8 }}>
          <Reports />
          {!session.user && (
            <p style={{ margin: 0, color: '#5b6470' }}>
              Signed out: the report text is not in the tree.
            </p>
          )}
        </div>
      </div>
    </SessionContext.Provider>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 160,
          },
          {
            type: 'text',
            id: 'react-l30-intro',
            body: '**Step 5: prove it, then ship it.** The dashboard is made of components that return element trees, which is exactly what a test can inspect. A component test renders the component, walks the returned tree for the text a user would read, and asserts on it.',
          },
          {
            type: 'text',
            id: 'react-l30-b2',
            body: 'Protected pages are tested the same way, with a provider supplying a signed-out session: the test asserts that the page content is absent. Once the tests pass, `vite build` produces the production bundle, and `vite preview` serves it so the built output can be checked before it is deployed.',
          },
          {
            type: 'heading',
            id: 'react-l30-h1',
            level: 2,
            body: 'Requirements',
          },
          {
            type: 'list',
            id: 'react-l30-list',
            style: 'bullet',
            items: [
              'A test per page that renders it and asserts on the text a user would see.',
              'A test for a protected route under a signed-out session, asserting the page is not rendered.',
              'A production build checked locally with `vite preview`.',
            ],
          },
          {
            type: 'heading',
            id: 'react-l30-h2',
            level: 2,
            body: 'Assert on what the user sees',
          },
          {
            type: 'code',
            id: 'react-l30-code',
            language: 'tsx',
            title: 'component tests, and the production build',
            code: `import { render, screen } from '@testing-library/react'\n\ntest('the overview shows the headline metric', async () => {\n  render(<Overview />)\n  expect(await screen.findByText('Active users')).toBeInTheDocument()\n})\n\n// A protected page under a signed-out session renders nothing:\ntest('reports stay hidden when signed out', () => {\n  render(\n    <SessionContext.Provider value={{ user: null }}>\n      <Reports />\n    </SessionContext.Provider>,\n  )\n  expect(screen.queryByText('Revenue')).not.toBeInTheDocument()\n})\n\n// npm run build   then   npm run preview   to check the built output.`,
          },
          {
            type: 'tip',
            id: 'react-l30-tip',
            title: 'If it renders, a test can read it',
            body: 'Because a component returns an element tree, its text can be collected without a browser at all. That makes the smallest assertion — the words on the screen — the easiest one to test.',
          },
          {
            type: 'heading',
            id: 'react-l30-h3',
            level: 2,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'react-l30-b3',
            body: 'Write the helper a component test uses: collect every piece of text out of an element tree.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l30-x1',
            exercise: {
              id: 'ex-react-l30',
              instructions:
                'Write collectText(element) returning all text inside an element tree as one string, in order. An element looks like { type, props }; its props.children may be a single value or an array. String and number children are included, nested elements are traversed, and a missing or null child contributes nothing.',
              languages: ['javascript'],
              files: [
                {
                  path: 'text.js',
                  language: 'javascript',
                  content: `// Gather the text of an element and everything inside it.\nexport function collectText(element) {\n  return ''\n}\n`,
                },
              ],
              tests: [
                {
                  id: 'ex-react-l30-t1',
                  label: 'reads text from a single element',
                  body: "return collectText({ type: 'p', props: { children: 'Hello' } }) === 'Hello'",
                },
                {
                  id: 'ex-react-l30-t2',
                  label: 'walks into an array of children',
                  body: "const tree = { type: 'div', props: { children: [{ type: 'p', props: { children: 'A' } }, { type: 'p', props: { children: 'B' } }] } }; return collectText(tree) === 'AB'",
                },
                {
                  id: 'ex-react-l30-t3',
                  label: 'a number child is included',
                  body: "return collectText({ type: 'p', props: { children: 42 } }) === '42'",
                },
                {
                  id: 'ex-react-l30-t4',
                  label: 'an element with no children contributes nothing',
                  body: "return collectText({ type: 'p', props: {} }) === ''",
                },
                {
                  id: 'ex-react-l30-t5',
                  label: 'elements and bare text can be mixed',
                  body: "const tree = { type: 'div', props: { children: [{ type: 'span', props: { children: 'x' } }, 'y'] } }; return collectText(tree) === 'xy'",
                },
              ],
              hints: [
                'Start with the text case: a string or a number is the answer itself.',
                'The children of an element live at element.props.children, which may be one value or an array.',
                'Recurse: map an array through the same function and join, or recurse once on a single child.',
              ],
              solutionFiles: [
                {
                  path: 'text.js',
                  language: 'javascript',
                  content: `export function collectText(element) {\n  if (element === null || element === undefined) return ''\n  if (typeof element === 'string' || typeof element === 'number') return String(element)\n\n  const children = element.props ? element.props.children : null\n  if (children === null || children === undefined) return ''\n  if (Array.isArray(children)) return children.map(collectText).join('')\n  return collectText(children)\n}\n`,
                },
              ],
              testNotes:
                'The mixed element-and-text check is what forces the handling of both an array of children and a single child.',
            },
          },
        ],
      },
    ],
  },
]
