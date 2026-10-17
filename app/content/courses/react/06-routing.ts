import type { Section } from '~/types/content'

export const reactRoutingSections: Section[] = [
  {
    id: 'react-s6',
    title: 'Routing',
    description: 'Client-side routing with React Router, nested routes, and protected routes.',
    lessons: [
      {
        id: 'react-l17',
        title: 'React Router basics',
        description: 'Setting up BrowserRouter, Routes, Route, and Link components.',
        duration: 6,
        objectives: [
          'Configure a BrowserRouter around the app',
          'Define routes with the Routes and Route components',
          'Navigate with Link and NavLink components',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'react-l17-intro',
            body: '**React Router basics.** A single-page app has one HTML file, so ’navigating’ means matching the current URL against a list of routes and rendering the component that fits. React Router does that matching and hands you links that change the URL without a page load.',
          },
          {
            type: 'text',
            id: 'react-l17-b2',
            body: 'The router is configured once, either as a data router passed to `RouterProvider` or with `BrowserRouter` wrapping the app. Routes are a list of `{ path, element }` entries. Matching walks that list and renders the first entry whose path fits the URL — so a route that no path matches renders nothing, which is why a catch-all `*` route is worth adding.',
          },
          {
            type: 'heading',
            id: 'react-l17-h1',
            level: 2,
            body: 'One URL, one matched route',
          },
          {
            type: 'code',
            id: 'react-l17-code',
            language: 'jsx',
            title: 'configuring the router',
            code: `import { createBrowserRouter, RouterProvider } from 'react-router-dom'\n\nconst router = createBrowserRouter([\n  { path: '/', element: <Home /> },\n  { path: '/tasks', element: <Tasks /> },\n  { path: '*', element: <NotFound /> },\n])\n\n// <RouterProvider router={router} />\n\n// Links change the URL without reloading the page:\n// <Link to="/tasks">Tasks</Link>\n// <NavLink to="/tasks" className={({ isActive }) => (isActive ? 'on' : '')}>Tasks</NavLink>`,
          },
          {
            type: 'list',
            id: 'react-l17-list',
            style: 'bullet',
            items: [
              'The router wraps the app once, at the root; everything below can use routing hooks.',
              'Each route is a `{ path, element }` pair, and matching is against the current URL.',
              '`Link` renders an anchor that navigates in-app; `NavLink` also tells you when it is active.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l17-tip',
            title: 'Add a catch-all route',
            body: 'Without a catch-all (`path: \'*\'`) entry an unknown URL renders an empty page, which looks like a crash. A small NotFound route turns it into a dead end the user can navigate out of.',
          },
          {
            type: 'heading',
            id: 'react-l17-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l17-b3',
            body: 'Write the matching rule under the router: find the first route whose path equals the URL.',
          },
          {
            type: 'exercise',
            id: 'react-l17-x1',
            exercise: {
              id: 'ex-react-l17',
              instructions:
                'Write resolveRoute(routes, pathname) returning the element of the first route whose path equals pathname, or null when nothing matches. Routes look like { path, element }.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return the element of the first matching route, or null.\nfunction resolveRoute(routes, pathname) {\n  return null\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l17-t1',
                  label: 'a matching path resolves',
                  body: "const routes = [{ path: '/', element: 'Home' }]; return resolveRoute(routes, '/') === 'Home'",
                },
                {
                  id: 'ex-react-l17-t2',
                  label: 'the right route is chosen from several',
                  body: "const routes = [{ path: '/a', element: 'A' }, { path: '/b', element: 'B' }]; return resolveRoute(routes, '/b') === 'B'",
                },
                {
                  id: 'ex-react-l17-t3',
                  label: 'an unknown path resolves to nothing',
                  body: "const routes = [{ path: '/a', element: 'A' }]; return resolveRoute(routes, '/missing') === null",
                },
                {
                  id: 'ex-react-l17-t4',
                  label: 'the first match wins',
                  body: "const routes = [{ path: '/a', element: 'first' }, { path: '/a', element: 'second' }]; return resolveRoute(routes, '/a') === 'first'",
                },
              ],
              hints: [
                'Look through the routes for one whose path equals the pathname.',
                'find returns the first match, which is what a router does.',
                'Return the element of the match, or null when find gives undefined.',
              ],
              solution: {
                javascript: `function resolveRoute(routes, pathname) {\n  const match = routes.find((route) => route.path === pathname)\n  return match ? match.element : null\n}\n`,
              },
              testNotes:
                'The duplicate-path check pins down first-match-wins, and the unknown path confirms the null case is handled.',
            },
          },
        ],
      },
      {
        id: 'react-l18',
        title: 'URL parameters and nested routes',
        description: 'Reading dynamic segments from the URL, and nesting route layouts.',
        duration: 6,
        objectives: [
          'Read path parameters with useParams',
          'Build a layout route that wraps child routes',
          'Use Outlet to render nested route content',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'react-l18-intro',
            body: '**URL parameters and nested routes.** A path like `/tasks/:id` matches `/tasks/42` and hands the component `{ id: ’42’ }`. The colon marks a parameter; whatever sits in that segment becomes a value. This is how one component serves every task without a route per task.',
          },
          {
            type: 'text',
            id: 'react-l18-b2',
            body: 'Nested routes let a parent path own the layout. The parent renders shared chrome and an `<Outlet />` where the matched child appears. The full path is the parent path plus the child path, so a layout at `/tasks` with a child `:id` handles `/tasks/42` while keeping one sidebar and one header.',
          },
          {
            type: 'heading',
            id: 'react-l18-h1',
            level: 2,
            body: 'Parameters, and a layout with an Outlet',
          },
          {
            type: 'code',
            id: 'react-l18-code',
            language: 'jsx',
            title: 'reading params and nesting a layout',
            code: `function TaskDetail() {\n  const { id } = useParams()      // '/tasks/42' gives { id: '42' }\n  return <h1>Task {id}</h1>\n}\n\n// The parent path owns the layout; children render into its Outlet.\n// { path: '/tasks', element: <TasksLayout />, children: [\n//     { index: true, element: <TaskList /> },\n//     { path: ':id', element: <TaskDetail /> },\n// ] }\n\nfunction TasksLayout() {\n  return (\n    <>\n      <Sidebar />\n      <main><Outlet /></main>\n    </>\n  )\n}`,
          },
          {
            type: 'list',
            id: 'react-l18-list',
            style: 'bullet',
            items: [
              'A `:name` segment is a parameter; `useParams()` returns the values as strings.',
              'A parent route with a layout renders `<Outlet />` where the matched child goes.',
              'An `index` child matches the parent path exactly, with no extra segment.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l18-tip',
            title: 'Parameters are strings',
            body: '`id` arrives as `’42’`, not the number 42. Convert explicitly — `Number(id)` — and handle the case where the URL contains something that is not a number at all.',
          },
          {
            type: 'heading',
            id: 'react-l18-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l18-b3',
            body: 'Write the matcher that extracts parameters from a pattern and a pathname.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l18-x1',
            exercise: {
              id: 'ex-react-l18',
              instructions:
                "Write readParams(pattern, pathname) returning an object of parameter values. Segments in the pattern that start with ':' capture the matching segment of the pathname. Return null when the patterns do not match.",
              languages: ['javascript'],
              starterCode: {
                javascript: `// Match '/tasks/:id' against '/tasks/42' and capture the id.\nfunction readParams(pattern, pathname) {\n  return {}\n}\n`,
              },
              tests: [
                { id: 'ex-react-l18-t1', label: 'captures a single parameter', body: "return readParams('/tasks/:id', '/tasks/42').id === '42'" },
                {
                  id: 'ex-react-l18-t2',
                  label: 'captures two parameters',
                  body: "const p = readParams('/users/:userId/posts/:postId', '/users/7/posts/9'); return p.userId === '7' && p.postId === '9'",
                },
                {
                  id: 'ex-react-l18-t3',
                  label: 'a static pattern captures nothing',
                  body: "return Object.keys(readParams('/about', '/about')).length === 0",
                },
                {
                  id: 'ex-react-l18-t4',
                  label: 'a different segment count does not match',
                  body: "return readParams('/tasks/:id', '/tasks') === null",
                },
              ],
              hints: [
                'Split both strings on "/" and compare them segment by segment.',
                'If the segment counts differ, the pattern cannot match — return null.',
                'A segment starting with ":" is a parameter: store the pathname segment under the name after the colon.',
              ],
              solution: {
                javascript: `function readParams(pattern, pathname) {\n  const patternParts = pattern.split('/')\n  const pathParts = pathname.split('/')\n  if (patternParts.length !== pathParts.length) return null\n\n  const params = {}\n  for (let i = 0; i < patternParts.length; i++) {\n    const part = patternParts[i]\n    if (part.startsWith(':')) {\n      params[part.slice(1)] = pathParts[i]\n    } else if (part !== pathParts[i]) {\n      return null\n    }\n  }\n  return params\n}\n`,
              },
              testNotes:
                'The length check and the static-segment comparison together make a real matcher rather than one that accepts any path.',
            },
          },
        ],
      },
      {
        id: 'react-l19',
        title: 'Protected and lazy routes',
        description: 'Guarding routes behind authentication and code-splitting with lazy.',
        duration: 5,
        objectives: [
          'Redirect unauthenticated users to the login page',
          'Lazy-load a route component with React.lazy and Suspense',
          'Combine route protection with lazy loading',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'react-l19-intro',
            body: '**Protected and lazy routes.** Two independent concerns meet at the route level. Some routes should not render at all unless the visitor is signed in; others should not be downloaded until the visitor asks for them. Both are expressed as wrappers around the route element.',
          },
          {
            type: 'text',
            id: 'react-l19-b2',
            body: 'A guard is a tiny component: if the user is missing, render `<Navigate to="/login" />` instead of its children. Lazy loading splits a component into its own chunk with `lazy(() => import(...))` and shows a fallback from `Suspense` while it arrives. Composing them — guard on the outside, suspense on the inside — gives a protected, code-split route.',
          },
          {
            type: 'heading',
            id: 'react-l19-h1',
            level: 2,
            body: 'A guard, and a chunk that loads on demand',
          },
          {
            type: 'code',
            id: 'react-l19-code',
            language: 'jsx',
            title: 'protection and code splitting',
            code: `function RequireUser({ children }) {\n  const user = useCurrentUser()\n  if (!user) return <Navigate to="/login" replace />\n  return children\n}\n\n// The component is downloaded only when its route is visited:\nconst TaskDetail = lazy(() => import('./TaskDetail'))\n\n// <Route\n//   path="/tasks/:id"\n//   element={\n//     <RequireUser>\n//       <Suspense fallback={<Spinner />}><TaskDetail /></Suspense>\n//     </RequireUser>\n//   }\n// />`,
          },
          {
            type: 'list',
            id: 'react-l19-list',
            style: 'bullet',
            items: [
              'A guard returns `<Navigate />` instead of its children when access is denied.',
              '`lazy(() => import(...))` loads the component’s code only when its route renders.',
              '`Suspense` supplies the fallback UI while the lazy chunk is in flight.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l19-warn',
            title: 'Client guards are not security',
            body: 'A route guard only decides what the app renders — the data is still one request away. Real protection is enforced on the server: an API that refuses unauthenticated reads, not a hidden screen.',
          },
          {
            type: 'heading',
            id: 'react-l19-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l19-b3',
            body: 'Write the decision a guard makes about where the visitor should end up.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l19-x1',
            exercise: {
              id: 'ex-react-l19',
              instructions:
                "Write targetPath(user, path, isPrivate) returning '/login' when the route is private and there is no user, and path otherwise. A user is missing when it is null or undefined.",
              languages: ['javascript'],
              starterCode: {
                javascript: `// Where should the visitor land?\nfunction targetPath(user, path, isPrivate) {\n  return path\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l19-t1',
                  label: 'a private route sends a signed-out visitor to login',
                  body: "return targetPath(null, '/tasks', true) === '/login'",
                },
                {
                  id: 'ex-react-l19-t2',
                  label: 'a signed-in visitor reaches the private route',
                  body: "return targetPath({ id: 'u1' }, '/tasks', true) === '/tasks'",
                },
                {
                  id: 'ex-react-l19-t3',
                  label: 'a public route is open to everyone',
                  body: "return targetPath(null, '/about', false) === '/about'",
                },
                {
                  id: 'ex-react-l19-t4',
                  label: 'an undefined user also redirects',
                  body: "return targetPath(undefined, '/tasks/7', true) === '/login'",
                },
              ],
              hints: [
                'The redirect happens only when the route is private AND there is no user.',
                'A falsy check covers null and undefined at once.',
                'Return "/login" when isPrivate && !user, otherwise the requested path.',
              ],
              solution: {
                javascript: `function targetPath(user, path, isPrivate) {\n  return isPrivate && !user ? '/login' : path\n}\n`,
              },
              testNotes:
                'The undefined check makes sure the guard treats a missing user the same way it treats null.',
            },
          },
        ],
      },
      {
        id: 'react-l46',
        title: 'React Portals',
        description: 'Rendering children into a DOM node outside the parent component, for modals, tooltips, and overlays.',
        duration: 5,
        objectives: [
          'Call createPortal to render JSX into a DOM node',
          'Use a portal for a modal or toast that should escape the parent stacking context',
          'Ensure focus management works correctly across the portal boundary',
          'Clean up the portal DOM node on unmount',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'react-l46-intro',
            body: '**React Portals.** A modal rendered inside a deeply nested element inherits that element’s stacking context and can end up clipped or hidden behind something else. A portal renders the markup into a different DOM node — usually one near the end of the body — while keeping it a child of the component in the React tree.',
          },
          {
            type: 'text',
            id: 'react-l46-b2',
            body: 'That split is the useful part: the DOM position escapes the parent layout, but React context and event bubbling still behave as if nothing moved. Portals need an existing host node, so the usual pattern is a second root in `index.html` that the app fills once and reuses.',
          },
          {
            type: 'heading',
            id: 'react-l46-h1',
            level: 2,
            body: 'Render elsewhere, behave as if nested',
          },
          {
            type: 'code',
            id: 'react-l46-code',
            language: 'jsx',
            title: 'a modal in its own root',
            code: `// index.html: <div id="root"></div><div id="modal-root"></div>\n\nfunction Modal({ open, onClose, children }) {\n  if (!open) return null\n  return createPortal(\n    <div className="modal" role="dialog" aria-modal="true">\n      {children}\n      <button onClick={onClose}>Close</button>\n    </div>,\n    document.getElementById('modal-root'),\n  )\n}\n\n// In the DOM the modal sits in #modal-root; in the React tree it is\n// still a child of Modal, so context and event bubbling still work.`,
          },
          {
            type: 'list',
            id: 'react-l46-list',
            style: 'bullet',
            items: [
              '`createPortal(element, node)` renders the element into the given DOM node.',
              'CSS still applies: a modal in a portal escapes the parent’s overflow and stacking context.',
              'React context and event bubbling cross the portal boundary unchanged.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l46-warn',
            title: 'A portal is not a focus strategy',
            body: 'Moving markup outside the page does not move the user’s focus. A modal opened in a portal must still move focus into it, trap Tab, and return focus to the trigger on close — otherwise keyboard users are left behind.',
          },
          {
            type: 'heading',
            id: 'react-l46-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l46-b3',
            body: 'A portal needs a stable host node. Write the helper that creates it once and reuses it afterwards.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l46-x1',
            exercise: {
              id: 'ex-react-l46',
              instructions:
                'Write ensureHost(hosts, id, create). If hosts[id] already exists, return it. Otherwise call create(), store the result at hosts[id], and return it. This is how a portal host node is created once and reused.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// hosts is an object of portal nodes, keyed by id.\nfunction ensureHost(hosts, id, create) {\n  return create()\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l46-t1',
                  label: 'a created host is stored and returned',
                  body: "const hosts = {}; const host = ensureHost(hosts, 'modal-root', () => ({ id: 'modal-root' })); return hosts['modal-root'] === host",
                },
                {
                  id: 'ex-react-l46-t2',
                  label: 'the host is created only once',
                  body: "let created = 0; const hosts = {}; const make = () => { created++; return { n: created } }; ensureHost(hosts, 'a', make); ensureHost(hosts, 'a', make); return created === 1",
                },
                {
                  id: 'ex-react-l46-t3',
                  label: 'an existing host is reused without creating',
                  body: "const existing = { id: 'modal-root' }; const hosts = { 'modal-root': existing }; return ensureHost(hosts, 'modal-root', () => ({ other: true })) === existing",
                },
                {
                  id: 'ex-react-l46-t4',
                  label: 'different ids get different hosts',
                  body: "let created = 0; const hosts = {}; const make = () => { created++; return created }; ensureHost(hosts, 'a', make); ensureHost(hosts, 'b', make); return created === 2 && hosts['a'] !== hosts['b']",
                },
              ],
              hints: [
                'Check whether hosts[id] is already set before doing anything.',
                'Only call create() when there is nothing stored yet.',
                'Store the new host, then return hosts[id] in both cases.',
              ],
              solution: {
                javascript: `function ensureHost(hosts, id, create) {\n  if (!hosts[id]) {\n    hosts[id] = create()\n  }\n  return hosts[id]\n}\n`,
              },
              testNotes:
                'The creation count is what proves the host is reused — the detail that stops a new modal root being added on every render.',
            },
          },
        ],
      },
      {
        id: 'react-l50',
        title: 'React Transitions',
        description: 'Animating elements entering and leaving the DOM: TransitionGroup, react-transition-group, and the built-in Transition API.',
        duration: 6,
        objectives: [
          'Mount and unmount a child with a Transition component',
          'Track enter, appear, and leave states with status names',
          'Combine transitions with routing for page animations',
          'Use TransitionGroup to animate a list of items together',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'react-l50-intro',
            body: '**React Transitions.** React removes an element the moment it leaves the tree, which leaves no time to animate it out. A transition component delays that removal: it keeps the element mounted, tells you which phase it is in, and unmounts it when the animation reports it is done.',
          },
          {
            type: 'text',
            id: 'react-l50-b2',
            body: 'The phases have names — `entering`, `entered`, `exiting`, and `unmounted` — and the typical use is a child function that receives the current status and picks CSS from it. The same four states serve a single element and, with a group wrapper, a whole list being added to or removed from.',
          },
          {
            type: 'heading',
            id: 'react-l50-h1',
            level: 2,
            body: 'Four phases, driven by one boolean',
          },
          {
            type: 'code',
            id: 'react-l50-code',
            language: 'jsx',
            title: 'a fade driven by status',
            code: `const duration = 300\n\nconst styles = {\n  entering: { opacity: 0 },\n  entered: { opacity: 1 },\n  exiting: { opacity: 0 },\n  unmounted: { opacity: 0 },\n}\n\nfunction Panel({ open }) {\n  return (\n    <Transition in={open} timeout={duration} mountOnEnter unmountOnExit>\n      {(status) => (\n        <div style={{ transition: 'opacity ' + duration + 'ms', ...styles[status] }}>\n          Content\n        </div>\n      )}\n    </Transition>\n  )\n}`,
          },
          {
            type: 'list',
            id: 'react-l50-list',
            style: 'bullet',
            items: [
              '`entering` is the frame the element appears in; `entered` is the resting state.',
              '`exiting` keeps the element mounted while it animates out; `unmounted` means it is gone.',
              'The status comes from the transition’s `in` prop and the previous value of that prop.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l50-tip',
            title: 'Respect reduced motion',
            body: 'Some users ask their system to reduce motion. Check `prefers-reduced-motion` and skip straight to `entered` — the component works the same way, it just does not travel.',
          },
          {
            type: 'heading',
            id: 'react-l50-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l50-b3',
            body: 'Write the phase the transition computes from the previous and current values of `in`.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l50-x1',
            exercise: {
              id: 'ex-react-l50',
              instructions:
                "Write transitionStatus(wasActive, active) returning the phase: false/true is 'entering', true/true is 'entered', true/false is 'exiting', and false/false is 'unmounted'.",
              languages: ['javascript'],
              starterCode: {
                javascript: `// wasActive is the previous value of the in prop, active the current one.\nfunction transitionStatus(wasActive, active) {\n  return 'unmounted'\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l50-t1',
                  label: 'appearing for the first time is entering',
                  body: "return transitionStatus(false, true) === 'entering'",
                },
                {
                  id: 'ex-react-l50-t2',
                  label: 'staying visible is entered',
                  body: "return transitionStatus(true, true) === 'entered'",
                },
                {
                  id: 'ex-react-l50-t3',
                  label: 'disappearing is exiting',
                  body: "return transitionStatus(true, false) === 'exiting'",
                },
                {
                  id: 'ex-react-l50-t4',
                  label: 'staying hidden is unmounted',
                  body: "return transitionStatus(false, false) === 'unmounted'",
                },
              ],
              hints: [
                'The two booleans give exactly four combinations — one phase each.',
                'When active is true the answer depends on whether it was already active.',
                'Branch on active first, then on wasActive.',
              ],
              solution: {
                javascript: `function transitionStatus(wasActive, active) {\n  if (active) return wasActive ? 'entered' : 'entering'\n  return wasActive ? 'exiting' : 'unmounted'\n}\n`,
              },
              testNotes:
                'All four combinations are checked, which pins the phase table down completely.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-react-s6',
      title: 'Routing check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-react-s6-q1',
          type: 'multiple-choice',
          prompt: 'Which component wraps the entire app for routing?',
          options: ['Routes', 'Route', 'RouterProvider', 'Link'],
          answer: 2,
          explanation: 'RouterProvider (or BrowserRouter in older versions) wraps the app to provide routing context.',
        },
        {
          id: 'quiz-react-s6-q2',
          type: 'true-false',
          prompt: 'useParams returns an object of URL parameters.',
          answer: true,
          explanation: 'useParams returns a key-value object where keys are parameter names from the route path.',
        },
        {
          id: 'quiz-react-s6-q3',
          type: 'multiple-choice',
          prompt: 'What does React.lazy require to work?',
          options: ['A callback returning a promise', 'A callback returning a module with a default export', 'A string URL', 'A separate JS file'],
          answer: 1,
          explanation: 'React.lazy takes a function returning a Promise that resolves to a module with a default export of the component.',
        },
        {
          id: 'quiz-react-s6-q4',
          type: 'blank',
          prompt: 'What component renders the matched child route?',
          answers: ['Outlet', '<Outlet />'],
          explanation: 'Outlet is rendered inside a layout route and displays the matched child route component.',
        },
        {
          id: 'quiz-react-s6-q5',
          type: 'identify-error',
          prompt: 'How do you redirect a user in a route component?',
          code: 'if (!user) return <Navigate to="/login" />',
          options: [
            '<Navigate /> only works in route components, not loaders',
            'Correct — Navigate is used inside route components',
            'You must use useNavigate instead',
            'Redirections require window.location.assign',
          ],
          answer: 1,
          explanation: '<Navigate /> is the correct way to redirect from within a route component. useNavigate is for imperative redirects in handlers.',
        },
      ],
    },
  },
]
