import type { Section } from '~/types/content'

export const reactHomeSections: Section[] = [
  {
    id: 'react-s1',
    title: 'Getting started',
    description: 'What React adds, how components work, and how to set up your first project.',
    lessons: [
      {
        id: 'react-l1',
        title: 'What React is and why it exists',
        description: 'A library for building user interfaces from composable components.',
        duration: 5,
        objectives: [
          'Say what problem React solves that plain JavaScript does not',
          'Explain the component model and JSX',
          'Name the three principles of React design',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l1',
          title: 'What React is and why it exists quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l1-q1',
              type: 'identify-error',
              prompt: 'What is wrong with this component?',
              code: 'function Welcome(props) {\n  return <h1>Hello, {props.name}</h1>\n}',
              options: [
                'Missing return statement',
                'Props needs to be destructured',
                'Missing closing parenthesis',
                'Nothing - it is valid JSX',
              ],
              answer: 3,
              explanation: 'This is valid JSX. Props is the implicit parameter of a function component. With TypeScript you would annotate it, but plain JS accepts this.',
            },
            {
              id: 'quiz-react-l1-q2',
              type: 'multiple-choice',
              prompt: 'Which trio names the React design principles described in the lesson?',
              options: [
                'Imperative, class-based, isolated',
                'Reactive, two-way bound, opinionated',
                'Static, server-rendered, stateful',
                'Declarative, component-based, composable',
              ],
              answer: 3,
              explanation: 'You declare what the UI should look like, the UI is built from components, and those components compose like functions calling functions.',
            },
            {
              id: 'quiz-react-l1-q3',
              type: 'multiple-choice',
              prompt: 'In JSX, what decides whether `<Welcome />` calls your component instead of creating a built-in DOM tag?',
              options: [
                'The capital first letter of the name',
                'The file extension',
                'The import statement above it',
                'Whether the element has props',
              ],
              answer: 0,
              explanation: 'A lowercase tag such as `<div>` becomes a real DOM element, while a capitalised name such as `<Welcome />` is treated as a reference to your function.',
            },
            {
              id: 'quiz-react-l1-q4',
              type: 'multiple-choice',
              prompt: 'JSX is not HTML. What does `return <h1>Hello, world</h1>` become under the hood?',
              options: [
                'A `document.createElement("h1")` call at render time',
                'A template string of HTML sent to the browser',
                'A JSON payload posted to the server',
                'A `React.createElement("h1", null, "Hello, world")` call',
              ],
              answer: 3,
              explanation: 'JSX is syntax sugar for `React.createElement`, which builds a plain element object describing the tag, props, and children.',
            },
            {
              id: 'quiz-react-l1-q5',
              type: 'true-false',
              prompt: 'In React you normally update the page by calling `document.querySelector` and editing DOM nodes by hand.',
              answer: false,
              explanation: 'React owns the DOM after the first render. You change the data and let the component re-run; React reconciles the result for you.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l1-d1',
            title: 'A component, running for real',
            body: 'Nothing in that heading was written by hand. The component returns the markup, and React puts it on screen.',
            files: [
              {
                path: 'Greeting.jsx',
                language: 'jsx',
                content: `export default function Greeting() {
  return <h2>Hello from a component</h2>
}
`,
              },
            ],
            previewProps: {},
            height: 110,
          },
          {
            type: 'text',
            id: 'react-l1-intro',
            body: '**What React is and why it exists.** Building a UI by hand means changing the DOM yourself: create an element, find it again, update its text. Every new feature adds more of those steps, and the page slowly drifts out of sync with your data. React changes the question from *how* the DOM changes to *what* the page should show.',
          },
          {
            type: 'text',
            id: 'react-l1-b2',
            body: 'You describe the interface as a function of your data, and React works out the DOM changes. The description is written in **components** — functions that return markup — and in **JSX**, the syntax that lets markup live inside JavaScript. Because a component is just a function returning a value, it can be reused, composed, and tested like any other function.',
          },
          {
            type: 'heading',
            id: 'react-l1-h1',
            level: 2,
            body: 'A component is a function that returns markup',
          },
          {
            type: 'code',
            id: 'react-l1-code',
            language: 'jsx',
            title: 'the smallest component',
            code: `// A component is a function whose name is capitalised.
export default function Welcome() {
  return <h1>Hello, world</h1>
}

// JSX is not HTML. It becomes a call that builds an element object:
// React.createElement('h1', null, 'Hello, world')`,
          },
          {
            type: 'list',
            id: 'react-l1-list',
            style: 'bullet',
            items: [
              '**Declarative.** You say what the UI looks like for the current data; React does the DOM work.',
              '**Component-based.** A UI is a tree of small functions, each owning a piece of the page.',
              '**Composable.** Components take inputs (props) and can render other components, like functions calling functions.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l1-tip',
            title: 'Capital letters matter',
            body: 'A lowercase tag like `<div>` becomes a real DOM element. A capitalised name like `<Welcome />` becomes a call to *your* function. That single rule is how JSX tells built-in tags apart from your components.',
          },
          {
            type: 'heading',
            id: 'react-l1-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l1-b3',
            body: 'Write your first component. The editor runs real JSX, and the tests call your component and inspect the element it returns.',
          },
          {
            type: 'exercise',
            id: 'react-l1-x1',
            exercise: {
              id: 'ex-react-l1',
              instructions:
                'Write a component called Welcome that returns an h1 element whose text is exactly: Hello, world',
              languages: ['jsx'],
              files: [
                {
                  path: 'Welcome.jsx',
                  language: 'jsx',
                  content: `// Return an <h1> with the text Hello, world.
export default function Welcome() {
  return <div />
}
`,
                },
              ],
              previewProps: {},
              tests: [
                { id: 'ex-react-l1-t1', label: 'Welcome is a function', body: "return typeof Welcome === 'function'" },
                {
                  id: 'ex-react-l1-t2',
                  label: 'it renders an h1',
                  body: "return Welcome().type === 'h1'",
                },
                {
                  id: 'ex-react-l1-t3',
                  label: 'the h1 contains exactly the right text',
                  body: "return Welcome().props.children === 'Hello, world'",
                },
              ],
              hints: [
                'A component returns JSX. Return the <h1> directly.',
                'The text goes between the tags, with no extra punctuation: <h1>Hello, world</h1>.',
                'Do not wrap it in a <div> — the tests expect the element type to be h1.',
              ],
              solutionFiles: [
                {
                  path: 'Welcome.jsx',
                  language: 'jsx',
                  content: `export default function Welcome() {
  return <h1>Hello, world</h1>
}
`,
                },
              ],
              testNotes:
                'The tests call Welcome() and read the element it returns, so they check the markup without needing a rendered page.',
            },
          },
        ],
      },
      {
        id: 'react-l2',
        title: 'Getting started with Vite',
        description: 'Scaffolding a new React project and understanding the folder structure.',
        duration: 6,
        objectives: [
          'Create a new Vite + React + TypeScript project',
          'Identify the src, public, and index.html files',
          'Run the dev server and open the browser',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l2',
          title: 'Getting started with Vite quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l2-q1',
              type: 'true-false',
              prompt: 'JSX is required to use React.',
              answer: false,
              explanation: 'JSX is syntactic sugar, not a requirement. React can be used with React.createElement or any renderer, though JSX is the standard.',
            },
            {
              id: 'quiz-react-l2-q2',
              type: 'multiple-choice',
              prompt: 'In the Vite scaffold, which folder holds static files that are served exactly as they are?',
              options: [
                'public/',
                'src/',
                'node_modules/',
                'dist/',
              ],
              answer: 0,
              explanation: '`public/` contains files copied through untouched, while `src/` holds the components and other code that Vite processes.',
            },
            {
              id: 'quiz-react-l2-q3',
              type: 'multiple-choice',
              prompt: 'Which script starts the Vite development server with instant reload as you edit?',
              options: [
                'npm run build',
                'npm run preview',
                'npm start',
                'npm run dev',
              ],
              answer: 3,
              explanation: '`npm run dev` runs the `vite` script, which serves the app locally and updates it as files change. `build` and `preview` are for production output.',
            },
            {
              id: 'quiz-react-l2-q4',
              type: 'blank',
              prompt: 'Which file in a Vite project contains the `<div id="root">` element where React mounts?',
              answers: [
                'index.html',
                'index.html file',
                'the index.html',
              ],
              explanation: 'The single page is `index.html`, and its empty `#root` div is the mount point that `src/main.jsx` fills with the React tree.',
            },
            {
              id: 'quiz-react-l2-q5',
              type: 'multiple-choice',
              prompt: 'What is the job of `npm run build`?',
              options: [
                'Start the dev server with hot reload',
                'Install the dependencies listed in package.json',
                'Run the component tests once',
                'Produce the optimised files for deployment',
              ],
              answer: 3,
              explanation: 'The build script runs `vite build`, bundling and minifying the app into deployable files. It does not serve them or install anything.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l2-d1',
            title: 'What the scaffold renders',
            body: 'This is the app `npm create vite` produces, running here through the same module sandbox the exercises use. Click the button - the count is held in a component, not in the DOM.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h3 style={{ margin: '0 0 8px' }}>Vite + React</h3>
      <button onClick={() => setCount(count + 1)}>count is {count}</button>
      <p style={{ margin: '8px 0 0', color: '#5b6470' }}>
        Edit src/App.jsx and save to test HMR.
      </p>
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
            id: 'react-l2-intro',
            body: '**Getting started with Vite.** A modern React project is created with a scaffold tool. Vite sets up the folder, the development server, and a production build, so you start on your first component instead of on a bundler config.',
          },
          {
            type: 'text',
            id: 'react-l2-b2',
            body: 'The layout is small and predictable. `index.html` is the single page, with a `<div id="root">` where React will mount. `src/` holds your components, and `public/` holds static files served as-is. A few scripts in `package.json` drive the whole workflow.',
          },
          {
            type: 'heading',
            id: 'react-l2-h1',
            level: 2,
            body: 'Scaffold, run, and the folder it makes',
          },
          {
            type: 'code',
            id: 'react-l2-code',
            language: 'plaintext',
            title: 'create and run a Vite project',
            code: `npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# folder layout
# index.html          the single page, with <div id="root">
# src/main.jsx        mounts <App /> into that div
# src/App.jsx         your first component
# public/             static files served unchanged`,
          },
          {
            type: 'list',
            id: 'react-l2-list',
            style: 'bullet',
            items: [
              '`npm run dev` starts a dev server with instant reload as you edit.',
              '`npm run build` produces the optimised files for deployment.',
              '`package.json` holds the scripts and the dependency list — React and ReactDOM are entries there.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l2-tip',
            title: 'Read package.json before anything else',
            body: 'In any unfamiliar project the scripts and dependencies tell you how to run it and what it is built on. It is a two-minute read that saves an hour of guessing.',
          },
          {
            type: 'heading',
            id: 'react-l2-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l2-b3',
            body: 'Describe the project the scaffold creates. Fill in the scripts and the two runtime dependencies.',
          },
          {
            type: 'exercise',
            id: 'react-l2-x1',
            exercise: {
              id: 'ex-react-l2',
              instructions:
                'Fill packageJson so dev runs "vite", build runs "vite build" and preview runs "vite preview", and so react and react-dom are listed as dependencies.',
              languages: ['javascript'],
              files: [
                {
                  path: 'package.js',
                  language: 'javascript',
                  content: `export const packageJson = {
  name: 'my-app',
  scripts: {
    dev: '',
    build: '',
    preview: '',
  },
  dependencies: {
    react: '',
    'react-dom': '',
  },
}
`,
                },
              ],
              tests: [
                { id: 'ex-react-l2-t1', label: 'dev starts the dev server', body: "return packageJson.scripts.dev === 'vite'" },
                {
                  id: 'ex-react-l2-t2',
                  label: 'build makes a production build',
                  body: "return packageJson.scripts.build === 'vite build'",
                },
                {
                  id: 'ex-react-l2-t3',
                  label: 'preview serves the build',
                  body: "return packageJson.scripts.preview === 'vite preview'",
                },
                {
                  id: 'ex-react-l2-t4',
                  label: 'react and react-dom are dependencies',
                  body: "const deps = packageJson.dependencies; return typeof deps.react === 'string' && deps.react.length > 0 && typeof deps['react-dom'] === 'string' && deps['react-dom'].length > 0",
                },
              ],
              hints: [
                'The three scripts are the exact strings Vite uses: "vite", "vite build", and "vite preview".',
                'react-dom keeps its hyphen, so it is written as a quoted key.',
                'Any non-empty version string works for the dependencies — the tests only check that the entries exist.',
              ],
              solutionFiles: [
                {
                  path: 'package.js',
                  language: 'javascript',
                  content: `export const packageJson = {
  name: 'my-app',
  scripts: {
    dev: 'vite',
    build: 'vite build',
    preview: 'vite preview',
  },
  dependencies: {
    react: '^18.3.1',
    'react-dom': '^18.3.1',
  },
}
`,
                },
              ],
              testNotes:
                'The scripts are checked exactly, because a typo there is the difference between a project that runs and one that does not.',
            },
          },
        ],
      },
      {
        id: 'react-l3',
        title: 'Your first component',
        description: 'Writing a component in JSX, rendering it to the page, and understanding the render cycle.',
        duration: 6,
        objectives: [
          'Write a function component that returns JSX',
          'Render a component tree with createRoot',
          'Explain the difference between the source and the DOM',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-react-l3',
          title: 'Your first component quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l3-q1',
              type: 'multiple-choice',
              prompt: 'Which function mounts a React app to the DOM?',
              options: [
                'ReactDOM.render',
                'createRoot',
                'hydrateRoot',
                'Both B and C',
              ],
              answer: 3,
              explanation: 'createRoot replaces the older ReactDOM.render. hydrateRoot is used for server-rendered apps. Both mount the app.',
            },
            {
              id: 'quiz-react-l3-q2',
              type: 'multiple-choice',
              prompt: 'A component returns two sibling elements at the top level. What does JSX require?',
              options: [
                'They must be wrapped in one parent element or a fragment',
                'Nothing, siblings are always allowed',
                'Each sibling needs its own key',
                'They must be returned as an array',
              ],
              answer: 0,
              explanation: 'A component returns one value. Siblings go inside a wrapper such as a `<div>`, or inside a fragment when you do not want an extra DOM node.',
            },
            {
              id: 'quiz-react-l3-q3',
              type: 'multiple-choice',
              prompt: 'What is a fragment (`<>...</>`) used for?',
              options: [
                'It adds a plain div around the children',
                'It renders its children only once',
                'It groups siblings without adding a node to the DOM',
                'It turns children into strings',
              ],
              answer: 2,
              explanation: 'A fragment satisfies the single-root rule while producing no extra element, so the DOM stays as flat as your markup intends.',
            },
            {
              id: 'quiz-react-l3-q4',
              type: 'true-false',
              prompt: 'After mounting with `createRoot`, React updates the DOM to match later renders instead of you patching nodes by hand.',
              answer: true,
              explanation: '`createRoot` hands ownership of that subtree to React. From then on you change data and re-render, and React reconciles only what differs.',
            },
            {
              id: 'quiz-react-l3-q5',
              type: 'multiple-choice',
              prompt: 'Before React produces DOM nodes, what is a JSX element?',
              options: [
                'A live DOM node',
                'A string of HTML',
                'An object describing what to render',
                'A browser event',
              ],
              answer: 2,
              explanation: 'Each element is a lightweight object holding the type, props, and children. React reads those descriptions and builds the matching DOM.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l3-d1',
            title: 'One parent, two children',
            body: 'Siblings are wrapped in a single `<div>`, then mounted once into `#root`. Change the code in the exercise below and this is the shape you are building.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h1 style={{ margin: '0 0 6px', fontSize: 22 }}>Tasks</h1>
      <p style={{ margin: 0, color: '#5b6470' }}>Nothing here yet.</p>
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
            id: 'react-l3-intro',
            body: '**Your first component.** A component returns a description of part of the page. When several elements sit side by side, JSX asks you to wrap them in a single parent — usually a `<div>`, or a fragment when you do not want an extra element in the DOM.',
          },
          {
            type: 'text',
            id: 'react-l3-b2',
            body: 'To put that description on the page, you mount it once with `createRoot`. After the first render React owns that part of the DOM: you change your data and re-render, and React updates only what needs to change. In these exercises the React runtime is already loaded and the preview has a `#root` element waiting, so your component appears as soon as you write it.',
          },
          {
            type: 'heading',
            id: 'react-l3-h1',
            level: 2,
            body: 'A tree of elements, rendered once',
          },
          {
            type: 'code',
            id: 'react-l3-code',
            language: 'jsx',
            title: 'wrapping with a parent, then rendering',
            code: `// src/App.jsx
export default function App() {
  return (
    <div>
      <h1>Tasks</h1>
      <p>Nothing here yet.</p>
    </div>
  )
}

// src/main.jsx - mount the tree once, into the #root div from index.html.
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)

// A fragment groups elements without adding a real node:
// return <><h1>Tasks</h1><p>Empty</p></>`,
          },
          {
            type: 'list',
            id: 'react-l3-list',
            style: 'bullet',
            items: [
              'JSX must return a single root element — wrap siblings in a `<div>` or a fragment.',
              'Each element becomes an object describing what to render; the DOM is produced from that description.',
              "`createRoot(document.getElementById('root')).render(<App />)` mounts the tree into the page’s `#root` element.",
            ],
          },
          {
            type: 'warning',
            id: 'react-l3-warn',
            title: 'The source is not the DOM',
            body: 'You never edit the DOM by hand in React. Change the data, let the component re-run, and React reconciles the result. Reaching for `document.querySelector` to patch things usually means the data is not driving the view.',
          },
          {
            type: 'heading',
            id: 'react-l3-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l3-b3',
            body: 'Build the component from the example: a heading and a paragraph wrapped in a single parent.',
          },
          {
            type: 'exercise',
            id: 'react-l3-x1',
            exercise: {
              id: 'ex-react-l3',
              instructions:
                'Write App to return a div containing an h1 with the text "Tasks" and a p with the text "Nothing here yet.".',
              languages: ['jsx'],
              files: [
                {
                  path: 'App.jsx',
                  language: 'jsx',
                  content: `// Return a div holding an <h1> and a <p>.
export default function App() {
  return <div />
}
`,
                },
              ],
              tests: [
                { id: 'ex-react-l3-t1', label: 'the root element is a div', body: "return App().type === 'div'" },
                {
                  id: 'ex-react-l3-t2',
                  label: 'the div has exactly two children',
                  body: 'const kids = App().props.children; return Array.isArray(kids) && kids.length === 2',
                },
                {
                  id: 'ex-react-l3-t3',
                  label: 'the first child is the Tasks heading',
                  body: "const kids = App().props.children; return kids[0].type === 'h1' && kids[0].props.children === 'Tasks'",
                },
                {
                  id: 'ex-react-l3-t4',
                  label: 'the second child is the empty message',
                  body: "const kids = App().props.children; return kids[1].type === 'p' && kids[1].props.children === 'Nothing here yet.'",
                },
              ],
              hints: [
                'Two elements side by side need one parent around them, so the <div> wraps both.',
                'The order matters: the <h1> comes first, then the <p>.',
                'Text goes between the tags, exactly as written: <h1>Tasks</h1> and <p>Nothing here yet.</p>.',
              ],
              solutionFiles: [
                {
                  path: 'App.jsx',
                  language: 'jsx',
                  content: `export default function App() {
  return (
    <div>
      <h1>Tasks</h1>
      <p>Nothing here yet.</p>
    </div>
  )
}
`,
                },
              ],
              previewProps: {},
              testNotes:
                'The tests read the two children by position, so both the order and the wrapping parent are checked.',
            },
          },
        ],
      },
      {
        id: 'react-l35',
        title: 'ES6 essentials for React',
        description: 'The JavaScript features you need to read and write React code: arrow functions, destructuring, the spread operator, and modules.',
        duration: 7,
        objectives: [
          'Write arrow functions and understand how they differ from regular functions',
          'Use destructuring to pull values out of props and state',
          'Spread array and object values immutably',
          'Import and export modules with ESM syntax',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l35',
          title: 'ES6 essentials for React quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l35-q1',
              type: 'multiple-choice',
              prompt: 'What does React solve?',
              options: [
                'It replaces the browser entirely',
                'It keeps the DOM in sync with your data declaratively',
                'It compiles TypeScript to JavaScript',
                'It provides a backend for React applications',
              ],
              answer: 1,
              explanation: 'React lets you describe what the UI should look like for a given state, and it handles updating the DOM to match.',
            },
            {
              id: 'quiz-react-l35-q2',
              type: 'code-output',
              prompt: 'What is logged?',
              code: 'const names = [\'Ada\', \'Grace\', \'Alan\']\nconst [first, ...rest] = names\nconsole.log(rest)',
              options: [
                '"Ada"',
                '["Grace", "Alan"]',
                '["Ada", "Grace", "Alan"]',
                'undefined',
              ],
              answer: 1,
              explanation: 'Array destructuring takes `Ada` into `first`, and the rest element gathers every remaining name into a new array.',
            },
            {
              id: 'quiz-react-l35-q3',
              type: 'multiple-choice',
              prompt: 'Why write `const next = { ...task, done: true }` instead of `task.done = true`?',
              options: [
                'The spread is faster at runtime',
                'Mutating an object is a syntax error',
                'It freezes the original object',
                'It creates a new reference React can compare against the old one',
              ],
              answer: 3,
              explanation: 'React detects change by reference. Spreading produces a different object, while an in-place edit leaves the old reference looking unchanged.',
            },
            {
              id: 'quiz-react-l35-q4',
              type: 'multiple-choice',
              prompt: 'Which line correctly imports a named export `greet` from `./greet`?',
              options: [
                'import { greet } from "./greet"',
                'import greet from "./greet"',
                'import * greet from "./greet"',
                'export { greet } from "./greet"',
              ],
              answer: 0,
              explanation: 'Named exports are imported inside braces. Without braces you would be asking for the module default export instead.',
            },
            {
              id: 'quiz-react-l35-q5',
              type: 'true-false',
              prompt: 'An arrow function captures `this` from where it is written rather than from where it is called.',
              answer: true,
              explanation: 'Arrows have no `this` of their own, so they use the surrounding scope. That is why class methods are often written as arrows to avoid binding.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l35-d1',
            title: 'Destructuring and spread, live',
            body: 'The component destructures its props, destructures an array with a rest element, and renders a small badge component. Everything shown is read from values, never copied by hand.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `function Badge({ label, tone }) {
  return (
    <span style={{ padding: '2px 8px', borderRadius: 999, background: tone, fontSize: 13 }}>
      {label}
    </span>
  )
}

export default function App({ items }) {
  const [first, ...rest] = items
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <p style={{ margin: '0 0 6px' }}>First: {first}</p>
      <p style={{ margin: '0 0 10px' }}>Rest: {rest.join(', ')}</p>
      <Badge label="ES6" tone="#e0f2fe" />
    </div>
  )
}
`,
              },
            ],
            previewProps: { items: ['Ada', 'Grace', 'Alan'] },
            height: 150,
          },
          {
            type: 'text',
            id: 'react-l35-intro',
            body: '**ES6 essentials for React.** React code is modern JavaScript first. Four features show up on almost every line: arrow functions, destructuring, the spread operator, and modules. Learning them well makes the React itself read clearly.',
          },
          {
            type: 'text',
            id: 'react-l35-b2',
            body: 'Destructuring is how you read props — `function Card({ title })` instead of `props.title` everywhere. Spread is how you update immutably — `{ ...task, done: true }` instead of editing the original. Immutability is not style: React relies on new references to detect change.',
          },
          {
            type: 'heading',
            id: 'react-l35-h1',
            level: 2,
            body: 'The four features, in one place',
          },
          {
            type: 'code',
            id: 'react-l35-code',
            language: 'javascript',
            title: 'arrows, destructuring, spread, modules',
            code: `// Arrow functions keep the surrounding this and read tidily.
const double = (n) => n * 2

// Object destructuring pulls named fields out of props.
function Card({ title, done }) {
  return title
}

// Array destructuring takes position one and gathers the rest.
const names = ['Ada', 'Grace', 'Alan']
const [first, ...rest] = names   // first = 'Ada', rest = ['Grace', 'Alan']

// Spread copies into a new object or array — never mutate the original.
const task = { id: '1', done: false }
const finished = { ...task, done: true }

// Modules: export a name, import it elsewhere.
export function greet(name) {
  return 'Hi, ' + name
}
// import { greet } from './greet'`,
          },
          {
            type: 'list',
            id: 'react-l35-list',
            style: 'bullet',
            items: [
              'Arrow functions (`=>`) are shorter and capture `this` from where they are written.',
              'Destructuring names the fields you need: `const { title } = props` or `function C({ title })`.',
              'Spread (`...`) builds new values; the original stays untouched, which React depends on.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l35-tip',
            title: 'Treat every value as read-only',
            body: 'Inside React, never write `task.done = true`. Write `const next = { ...task, done: true }`. The new object is a different reference, so React sees the change; the old one is left alone.',
          },
          {
            type: 'heading',
            id: 'react-l35-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l35-b3',
            body: 'Practise destructuring: split the first name from the rest without touching the array.',
          },
          {
            type: 'exercise',
            id: 'react-l35-x1',
            exercise: {
              id: 'ex-react-l35',
              instructions:
                'Write unpack(names) that returns an object with first equal to the first name and rest an array of the remaining names. Use array destructuring.',
              languages: ['javascript'],
              files: [
                {
                  path: 'unpack.js',
                  language: 'javascript',
                  content: `// Return { first, rest } using destructuring.
export function unpack(names) {
  return { first: undefined, rest: [] }
}
`,
                },
              ],
              tests: [
                { id: 'ex-react-l35-t1', label: 'first is the first name', body: "return unpack(['Ada', 'Grace', 'Alan']).first === 'Ada'" },
                {
                  id: 'ex-react-l35-t2',
                  label: 'rest holds the remaining names in order',
                  body: "return JSON.stringify(unpack(['Ada', 'Grace', 'Alan']).rest) === '[\"Grace\",\"Alan\"]'",
                },
                {
                  id: 'ex-react-l35-t3',
                  label: 'an empty list gives undefined and an empty rest',
                  body: 'const r = unpack([]); return r.first === undefined && r.rest.length === 0',
                },
                {
                  id: 'ex-react-l35-t4',
                  label: 'a single name leaves rest empty',
                  body: 'return unpack([\'x\']).rest.length === 0',
                },
              ],
              hints: [
                'Array destructuring reads by position: const [first] = names.',
                'The rest element gathers everything after the first: const [first, ...rest] = names.',
                'Return an object literal: { first, rest }.',
              ],
              solutionFiles: [
                {
                  path: 'unpack.js',
                  language: 'javascript',
                  content: `export function unpack(names) {
  const [first, ...rest] = names
  return { first, rest }
}
`,
                },
              ],
              testNotes:
                'The empty-list check confirms rest is really an array (not undefined), which is what the rest element always produces.',
            },
          },
        ],
      },
      {
        id: 'react-l36',
        title: 'Upgrading to modern React',
        description: 'Moving from older React patterns to function components and hooks, and understanding the migration path.',
        duration: 5,
        objectives: [
          'Identify class component patterns that map to hooks',
          'Replace setState calls with useState equivalents',
          'Migrate componentDidMount/componentDidUpdate to useEffect',
          'Use the react-codemod script to automate large migrations',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l36',
          title: 'Upgrading to modern React quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l36-q1',
              type: 'blank',
              prompt: 'What is the name of the modern React API entry point?',
              answers: [
                'createRoot',
                'React-dom createRoot',
              ],
              explanation: 'import { createRoot } from "react-dom/client" is the modern way to mount an app.',
            },
            {
              id: 'quiz-react-l36-q2',
              type: 'multiple-choice',
              prompt: 'A class uses `componentDidMount` and `componentDidUpdate`. Which single hook replaces both?',
              options: [
                'useEffect',
                'useState',
                'useReducer',
                'useRef',
              ],
              answer: 0,
              explanation: 'One `useEffect` with the right dependency array covers both the mount run and the update runs, replacing the two lifecycle methods.',
            },
            {
              id: 'quiz-react-l36-q3',
              type: 'multiple-choice',
              prompt: '`this.state` plus `this.setState` map to which modern pair?',
              options: [
                'useRef and a ref setter',
                'useReducer only',
                'props and a callback prop',
                'useState value and its setter',
              ],
              answer: 3,
              explanation: '`useState` returns the current value and a setter, which is exactly the role `this.state` and `this.setState` played in a class.',
            },
            {
              id: 'quiz-react-l36-q4',
              type: 'true-false',
              prompt: 'Moving to function components removes the need to bind methods to `this` in a constructor.',
              answer: true,
              explanation: 'Function components have no `this`, so the binding step disappears. The handler is just a function in scope.',
            },
            {
              id: 'quiz-react-l36-q5',
              type: 'multiple-choice',
              prompt: 'Which tool does the lesson name for automating large class-to-hooks migrations?',
              options: [
                'create-react-app',
                'react-codemod',
                'Vite',
                'ESLint',
              ],
              answer: 1,
              explanation: '`react-codemod` rewrites common legacy patterns mechanically, which is safer than hand-editing hundreds of files during a migration.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l36-d1',
            title: 'The hooks version of the counter',
            body: 'This is the "after" from the comparison below, running. There is no `this` and no class — one `useState` pair holds the count and one `useEffect` sets the document title as it changes.',
            files: [
              {
                path: 'Counter.jsx',
                language: 'jsx',
                content: `import { useState, useEffect } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = 'Count: ' + count
  }, [count])
  return (
    <button onClick={() => setCount(count + 1)} style={{ font: 'inherit', padding: '6px 12px' }}>
      Count: {count}
    </button>
  )
}
`,
              },
            ],
            previewProps: {},
            height: 100,
          },
          {
            type: 'text',
            id: 'react-l36-intro',
            body: '**Upgrading to modern React.** Older React code is written as classes: `this.state`, `setState`, and lifecycle methods such as `componentDidMount`. Modern React uses function components with hooks, which express the same ideas in less code and without `this`.',
          },
          {
            type: 'text',
            id: 'react-l36-b2',
            body: 'The mapping is direct once you see it. `this.state` becomes `useState`; `setState` becomes the setter the hook returns; `componentDidMount` and `componentDidUpdate` become a single `useEffect`. Because `setState` already expected a new value rather than a mutation, the update style barely changes.',
          },
          {
            type: 'heading',
            id: 'react-l36-h1',
            level: 2,
            body: 'From class to hooks',
          },
          {
            type: 'code',
            id: 'react-l36-code',
            language: 'jsx',
            title: 'the same counter, two ways',
            code: `// Before: a class with state and a lifecycle method.
class Counter extends React.Component {
  state = { count: 0 }
  componentDidMount() {
    document.title = 'Count: ' + this.state.count
  }
  increment = () => this.setState({ count: this.state.count + 1 })
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>
  }
}

// After: a function with hooks. No this, no class.
function Counter() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = 'Count: ' + count
  }, [count])
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}`,
          },
          {
            type: 'list',
            id: 'react-l36-list',
            style: 'bullet',
            items: [
              '`this.state` and `setState` map to a `useState` pair: the value and its setter.',
              '`componentDidMount` / `componentDidUpdate` fold into one `useEffect` with a dependency array.',
              'Hooks remove `this` entirely, so no more binding methods in the constructor.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l36-tip',
            title: 'Update with a value, not an edit',
            body: 'Both styles want a new value, never an in-place edit. `setState({ count: this.state.count + 1 })` and `setCount(count + 1)` both build the next state; neither mutates the old one.',
          },
          {
            type: 'heading',
            id: 'react-l36-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l36-b3',
            body: 'Write the pure update both `setState` and `setCount` rely on: produce the next state without changing the current one.',
          },
          {
            type: 'exercise',
            id: 'react-l36-x1',
            exercise: {
              id: 'ex-react-l36',
              instructions:
                'Write nextCount(state, delta) returning a new state object whose count is state.count plus delta. Do not change the object you were given.',
              languages: ['javascript'],
              files: [
                {
                  path: 'state.js',
                  language: 'javascript',
                  content: `// Return a new state with count increased by delta.
export function nextCount(state, delta) {
  return state
}
`,
                },
              ],
              tests: [
                { id: 'ex-react-l36-t1', label: 'adds the delta to the count', body: 'return nextCount({ count: 1 }, 2).count === 3' },
                {
                  id: 'ex-react-l36-t2',
                  label: 'handles a negative delta',
                  body: 'return nextCount({ count: 5 }, -2).count === 3',
                },
                {
                  id: 'ex-react-l36-t3',
                  label: 'the original state is not changed',
                  body: 'const base = { count: 1 }; nextCount(base, 1); return base.count === 1',
                },
                {
                  id: 'ex-react-l36-t4',
                  label: 'a new object is returned',
                  body: 'const base = { count: 0 }; return nextCount(base, 0) !== base',
                },
              ],
              hints: [
                'Copy the state and override count, rather than editing it.',
                'Object spread makes the copy: { ...state }.',
                'Combine them: return { ...state, count: state.count + delta }.',
              ],
              solutionFiles: [
                {
                  path: 'state.js',
                  language: 'javascript',
                  content: `export function nextCount(state, delta) {
  return { ...state, count: state.count + delta }
}
`,
                },
              ],
              testNotes:
                'The immutability checks re-read the original object and compare references — exactly how React notices that state has changed.',
            },
          },
        ],
      },
    ],
  },
]
