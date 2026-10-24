import type { Section } from '~/types/content'

export const reactComponentsSections: Section[] = [
  {
    id: 'react-s2',
    title: 'Components and Props',
    description: 'Writing reusable components, passing data with props, and composing children.',
    lessons: [
      {
        id: 'react-l4',
        title: 'Function components and JSX',
        description: 'Writing a component that returns JSX, props with defaults, and the rules of hooks.',
        duration: 6,
        objectives: [
          'Write a function component with typed props',
          'Use default prop values with destructuring',
          'Return valid JSX from every code path',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l4',
          title: 'Function components and JSX quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l4-q1',
              type: 'true-false',
              prompt: 'Components must return a single root element.',
              answer: false,
              explanation: 'A component can return a fragment or a single element; a fragment groups siblings without adding a wrapper node to the DOM.',
            },
            {
              id: 'quiz-react-l4-q2',
              type: 'multiple-choice',
              prompt: 'Which signature gives `count` a default of 0 when the caller omits the prop?',
              options: [
                'function Card(props = 0)',
                'function Card({ count }) = 0',
                'function Card(count: 0)',
                'function Card({ count = 0 })',
              ],
              answer: 3,
              explanation: 'Destructuring defaults apply when the property is `undefined`, so `{ count = 0 }` keeps the component usable without that prop.',
            },
            {
              id: 'quiz-react-l4-q3',
              type: 'multiple-choice',
              prompt: 'A component has nothing to show on one branch. What should that branch return?',
              options: [
                'undefined',
                'false',
                'null',
                'An empty string',
              ],
              answer: 2,
              explanation: '`null` is a valid React result meaning "render nothing here", so every path still returns a value React understands.',
            },
            {
              id: 'quiz-react-l4-q4',
              type: 'true-false',
              prompt: 'Props flow one way: a child component cannot modify the props it receives.',
              answer: true,
              explanation: 'Props are read-only inputs from the parent. If a child needs to change data, the parent owns the state and passes down a callback.',
            },
            {
              id: 'quiz-react-l4-q5',
              type: 'multiple-choice',
              prompt: 'How does a function component receive its props?',
              options: [
                'As a single object argument',
                'As positional arguments, one per prop',
                'Through a global store',
                'Through `this.props`',
              ],
              answer: 0,
              explanation: 'React calls the component with one props object, which is why the signature destructures named fields from it.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l4-d1',
            title: 'Props in, JSX out',
            body: 'A function component takes one props object and returns JSX. The caller leaves `count` out here, so the **default** of 0 is used.',
            files: [
              {
                path: 'Card.jsx',
                language: 'jsx',
                content: `export default function Card({ title, count = 0, children }) {
  return (
    <div style={{ fontFamily: 'system-ui', border: '1px solid #d0d7de', borderRadius: 8, padding: 12, width: 200 }}>
      <h2 style={{ margin: 0, fontSize: 16 }}>{title}</h2>
      <span style={{ color: '#5b6470' }}>{count}</span>
      <p style={{ margin: '8px 0 0' }}>{children}</p>
    </div>
  )
}
`,
              },
            ],
            previewProps: { title: 'Inbox', children: 'No count was passed, so the default is shown.' },
            height: 175,
          },
          {
            type: 'text',
            id: 'react-l4-intro',
            body: '**Function components and JSX.** A component is a function that takes a single object of inputs — **props** — and returns the markup for one piece of the page. Props are read-only: a component receives them and describes what to show, but never writes to them.',
          },
          {
            type: 'text',
            id: 'react-l4-b2',
            body: 'Almost every component destructures the props it needs directly in the signature, so the body reads as plain variables. Destructuring also lets you give a **default value**, which is how a component stays usable when the caller omits an optional prop.',
          },
          {
            type: 'heading',
            id: 'react-l4-h1',
            level: 2,
            body: 'Props in, JSX out',
          },
          {
            type: 'code',
            id: 'react-l4-code',
            language: 'jsx',
            title: 'a component with defaults and children',
            code: `export default function Card({ title, count = 0, children }) {\n  return (\n    <div className="card">\n      <h2>{title}</h2>\n      <span>{count}</span>\n      {children}\n    </div>\n  )\n}\n\n// The caller supplies the values as attributes:\n// <Card title="Inbox" count={3} />`,
          },
          {
            type: 'list',
            id: 'react-l4-list',
            style: 'bullet',
            items: [
              'Props flow one way, from parent to child — a child cannot change the props it was given.',
              'Destructure in the signature: `function Card({ title })` rather than `props.title` throughout.',
              'Defaults live in the destructuring: `count = 0` covers a missing prop.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l4-tip',
            title: 'A component must always return something',
            body: 'Every path through the function must return JSX. If there is nothing to show, return `null` — that is a valid React result meaning "render nothing here".',
          },
          {
            type: 'heading',
            id: 'react-l4-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l4-b3',
            body: 'Write a `Card` component and check the markup it produces. The tests call the component and inspect the element it returns.',
          },
          {
            type: 'exercise',
            id: 'react-l4-x1',
            exercise: {
              id: 'ex-react-l4',
              instructions:
                'Write Card({ title, count }) returning a div with className "card" that holds an h2 containing the title and a span containing the count. count defaults to 0.',
              languages: ['jsx'],
              files: [
                {
                  path: 'Card.jsx',
                  language: 'jsx',
                  content: `// Return a div.card holding an <h2> and a <span>.\nexport default function Card({ title, count }) {\n  return <div />\n}\n`,
                },
              ],
              previewProps: { title: 'Inbox', count: 3 },
              tests: [
                {
                  id: 'ex-react-l4-t1',
                  label: 'the root is a div with the card class',
                  body: "const el = Card({ title: 'Inbox' }); return el.type === 'div' && el.props.className === 'card'",
                },
                {
                  id: 'ex-react-l4-t2',
                  label: 'the h2 shows the title',
                  body: "const kids = Card({ title: 'Inbox' }).props.children; return kids[0].type === 'h2' && kids[0].props.children === 'Inbox'",
                },
                {
                  id: 'ex-react-l4-t3',
                  label: 'the span shows the count',
                  body: "const kids = Card({ title: 'Inbox', count: 3 }).props.children; return kids[1].type === 'span' && kids[1].props.children === 3",
                },
                {
                  id: 'ex-react-l4-t4',
                  label: 'count defaults to zero',
                  body: "const kids = Card({ title: 'Inbox' }).props.children; return kids[1].props.children === 0",
                },
              ],
              hints: [
                'Destructure count with a default: function Card({ title, count = 0 }).',
                'The div wraps two children in order: the <h2> first, then the <span>.',
                'The class attribute is written className in JSX: <div className="card">.',
              ],
              solutionFiles: [
                {
                  path: 'Card.jsx',
                  language: 'jsx',
                  content: `export default function Card({ title, count = 0 }) {\n  return (\n    <div className="card">\n      <h2>{title}</h2>\n      <span>{count}</span>\n    </div>\n  )\n}\n`,
                },
              ],
              testNotes:
                'The tests read the two children by position and check the default separately, so a missing default or a swapped order is caught.',
            },
          },
        ],
      },
      {
        id: 'react-l5',
        title: 'Composing and children prop',
        description: 'Passing content between components, conditional rendering, and the children prop.',
        duration: 6,
        objectives: [
          'Pass data from parent to child through props',
          'Use the children prop to compose layouts',
          'Apply conditional rendering with ternary and &&',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l5',
          title: 'Composing and children prop quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l5-q1',
              type: 'multiple-choice',
              prompt: 'What makes a component reusable?',
              options: [
                'It never re-renders',
                'It accepts props so the same component can render different data',
                'It uses useState',
                'It imports a CSS file',
              ],
              answer: 1,
              explanation: 'Props are the mechanism for passing data into a component, making it reusable across different contexts.',
            },
            {
              id: 'quiz-react-l5-q2',
              type: 'multiple-choice',
              prompt: 'What ends up in the `children` prop?',
              options: [
                'Everything nested between the opening and closing tags of the component',
                'Only text, never elements',
                'The component own JSX',
                'A list of the component event handlers',
              ],
              answer: 0,
              explanation: 'Whatever you nest inside a component is passed as `children`, which lets a layout wrap content it does not know in advance.',
            },
            {
              id: 'quiz-react-l5-q3',
              type: 'multiple-choice',
              prompt: '`{isReady && <Spinner />}` — what renders when `isReady` is false?',
              options: [
                '<Spinner />',
                'The text "false"',
                'Nothing',
                'An error',
              ],
              answer: 2,
              explanation: 'With `&&`, a falsy left side short-circuits and JSX renders nothing. The right side is never evaluated.',
            },
            {
              id: 'quiz-react-l5-q4',
              type: 'multiple-choice',
              prompt: 'When is a ternary the right choice inside JSX?',
              options: [
                'When you need to run a loop over items',
                'When one branch may be omitted entirely',
                'When the condition is a number rather than a boolean',
                'When both branches are values of the same kind, such as two elements',
              ],
              answer: 3,
              explanation: 'A ternary always produces one of its two values, so it fits either/or UI where both options are valid JSX.',
            },
            {
              id: 'quiz-react-l5-q5',
              type: 'true-false',
              prompt: 'When a component only needs to display nested content, `children` is usually clearer than a custom `content` prop.',
              answer: true,
              explanation: 'Nesting reads like ordinary markup and keeps the shell reusable. A `content` prop that must receive JSX adds ceremony without adding capability.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l5-d1',
            title: 'A shell that renders what you nest',
            body: 'Panel never says what it will hold. Whatever sits between its tags arrives as the `children` prop, and the ternary picks one of two lines.',
            files: [
              {
                path: 'App.jsx',
                language: 'jsx',
                content: `function Panel({ title, children }) {
  return (
    <section style={{ fontFamily: 'system-ui', border: '1px solid #d0d7de', borderRadius: 8, padding: 12, width: 220 }}>
      <h3 style={{ margin: '0 0 6px', fontSize: 15 }}>{title}</h3>
      <div>{children}</div>
    </section>
  )
}

export default function App({ title, detail, online }) {
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <Panel title={title}>
        <p style={{ margin: 0 }}>{detail}</p>
      </Panel>
      <p style={{ margin: '8px 0 0', color: '#5b6470' }}>
        {online ? 'Online now' : 'Offline'}
      </p>
    </div>
  )
}
`,
              },
            ],
            previewProps: { title: 'Profile', detail: 'Ada Lovelace', online: true },
            height: 185,
          },
          {
            type: 'text',
            id: 'react-l5-intro',
            body: '**Composing and children prop.** Components compose the way functions compose: one component renders another and hands it data. Anything nested between a component’s opening and closing tags arrives as the `children` prop, which lets a layout wrap content it does not know in advance.',
          },
          {
            type: 'text',
            id: 'react-l5-b2',
            body: 'That is the difference between a fixed component and a reusable shell. A `Panel` that renders `{children}` can hold a form on one page and a table on another, without knowing what either is.',
          },
          {
            type: 'heading',
            id: 'react-l5-h1',
            level: 2,
            body: 'A shell that renders whatever you nest',
          },
          {
            type: 'code',
            id: 'react-l5-code',
            language: 'jsx',
            title: 'children and conditional content',
            code: `export default function Panel({ title, children }) {\n  return (\n    <section>\n      <h3>{title}</h3>\n      <div>{children}</div>\n    </section>\n  )\n}\n\n// Used like a normal tag — the inside becomes children:\n// <Panel title="Profile"><p>Ada Lovelace</p></Panel>\n\n// Either/or with a ternary:\nconst message = loggedIn ? <p>Welcome back</p> : <p>Please sign in</p>`,
          },
          {
            type: 'list',
            id: 'react-l5-list',
            style: 'bullet',
            items: [
              '`{children}` renders whatever was nested inside the component — markup, text, or other components.',
              'A ternary (`cond ? a : b`) picks between two JSX values inline.',
              '`cond && element` renders the element only when the condition is true.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l5-tip',
            title: 'Prefer children over a new prop',
            body: 'If a component only needs to display some content, `children` is the natural prop. Adding a `content` prop that must be passed as JSX is usually a sign that nesting would read better.',
          },
          {
            type: 'heading',
            id: 'react-l5-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l5-b3',
            body: 'Build the reusable shell. Notice that the component never mentions what the content is.',
          },
          {
            type: 'exercise',
            id: 'react-l5-x1',
            exercise: {
              id: 'ex-react-l5',
              instructions:
                'Write Panel({ title, children }) returning a section that contains an h3 with the title and a div wrapping the children.',
              languages: ['jsx'],
              files: [
                {
                  path: 'Panel.jsx',
                  language: 'jsx',
                  content: `// Return a <section> with an <h3> and a <div> holding children.\nexport default function Panel({ title, children }) {\n  return <div />\n}\n`,
                },
              ],
              previewProps: { title: 'Profile', children: 'Signed in as Ada' },
              tests: [
                { id: 'ex-react-l5-t1', label: 'the root is a section', body: "return Panel({ title: 'Profile', children: 'x' }).type === 'section'" },
                {
                  id: 'ex-react-l5-t2',
                  label: 'the h3 shows the title',
                  body: "const kids = Panel({ title: 'Profile', children: 'x' }).props.children; return kids[0].type === 'h3' && kids[0].props.children === 'Profile'",
                },
                {
                  id: 'ex-react-l5-t3',
                  label: 'the content sits in a div',
                  body: "const kids = Panel({ title: 'Profile', children: 'x' }).props.children; return kids[1].type === 'div'",
                },
                {
                  id: 'ex-react-l5-t4',
                  label: 'the div renders the nested content',
                  body: "const kids = Panel({ title: 'Profile', children: 'Ada Lovelace' }).props.children; return kids[1].props.children === 'Ada Lovelace'",
                },
              ],
              hints: [
                'The section wraps two children, in order: the <h3> and the <div>.',
                'Render the nested content by placing {children} inside the div.',
                'The div is not just decoration — the tests check that the content is inside it.',
              ],
              solutionFiles: [
                {
                  path: 'Panel.jsx',
                  language: 'jsx',
                  content: `export default function Panel({ title, children }) {\n  return (\n    <section>\n      <h3>{title}</h3>\n      <div>{children}</div>\n    </section>\n  )\n}\n`,
                },
              ],
              testNotes:
                'The tests pass different values for children each time, so the component must render whatever it is given rather than fixed text.',
            },
          },
        ],
      },
      {
        id: 'react-l6',
        title: 'Lists and keys',
        description: 'Rendering arrays of data, the key prop, and avoiding index keys.',
        duration: 5,
        objectives: [
          'Render a list with .map and JSX',
          'Assign a stable key to each item',
          'Explain why using array index as key breaks reordering',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l6',
          title: 'Lists and keys quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l6-q1',
              type: 'identify-error',
              prompt: 'What is wrong with using array index as key?',
              code: 'items.map((item, index) => (\n  <li key={index}>{item.name}</li>\n))',
              options: [
                'Nothing - index keys are always fine',
                'The list will not sort correctly',
                'Reordering, inserting or removing items breaks reconciliation',
                'TypeScript will not compile',
              ],
              answer: 2,
              explanation: 'Index keys cause bugs when the list changes order, because React uses keys to track identity. Use a stable unique id instead.',
            },
            {
              id: 'quiz-react-l6-q2',
              type: 'multiple-choice',
              prompt: 'For a list of tasks where each task has an `id`, which key should you use?',
              options: [
                'item.id',
                'The array index',
                'Math.random()',
                'item.title',
              ],
              answer: 0,
              explanation: 'A key must be stable and unique among siblings. The id comes from the data, so it survives reordering; random values change every render.',
            },
            {
              id: 'quiz-react-l6-q3',
              type: 'true-false',
              prompt: 'A `key` is available inside the child component as a normal prop.',
              answer: false,
              explanation: 'React reads the key off the element for its own reconciliation. It is not passed down to the child as a prop and is not rendered into the DOM.',
            },
            {
              id: 'quiz-react-l6-q4',
              type: 'multiple-choice',
              prompt: 'What does `items.map((item) => <li key={item.id}>{item.title}</li>)` produce?',
              options: [
                'A string of HTML',
                'An array of elements React can render',
                'A single DOM node',
                'A promise that resolves to a list',
              ],
              answer: 1,
              explanation: '`map` returns one element per item, giving React an array it can render as a list; the keys tell it which rows are which.',
            },
            {
              id: 'quiz-react-l6-q5',
              type: 'multiple-choice',
              prompt: 'A key must be unique among which elements?',
              options: [
                'All elements in the whole app',
                'The components declared in the same file',
                'The siblings in that list',
                'Only the elements that changed since the last render',
              ],
              answer: 2,
              explanation: 'Keys are compared only within a sibling list, so the same id can safely appear in a different list elsewhere in the tree.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l6-d1',
            title: 'map over data, key by id',
            body: 'The array becomes one list item per entry. Each gets a `key` taken from the data, which is how React tracks a row as the list changes.',
            files: [
              {
                path: 'TaskList.jsx',
                language: 'jsx',
                content: `export default function TaskList({ items }) {
  return (
    <ul style={{ fontFamily: 'system-ui', margin: 0, paddingLeft: 20 }}>
      {items.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}
`,
              },
            ],
            previewProps: { items: [{ id: 'a', title: 'Write the plan' }, { id: 'b', title: 'Ship it' }] },
            height: 120,
          },
          {
            type: 'text',
            id: 'react-l6-intro',
            body: '**Lists and keys.** A list in React is an array of elements, usually produced by mapping over data. Each element needs a `key` — a stable, unique identifier — so React can tell which items stayed, moved, or disappeared when the list changes.',
          },
          {
            type: 'text',
            id: 'react-l6-b2',
            body: 'The key is not rendered and is not a normal prop: React reads it off the element to track identity. Using the array index as the key works only as long as the list never reorders; insert an item at the top and every following row is now a different item wearing the old identity.',
          },
          {
            type: 'heading',
            id: 'react-l6-h1',
            level: 2,
            body: 'map over data, key by identity',
          },
          {
            type: 'code',
            id: 'react-l6-code',
            language: 'jsx',
            title: 'building a list',
            code: `export default function TaskList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>{item.title}</li>\n      ))}\n    </ul>\n  )\n}\n\n// <TaskList items={[{ id: 'a', title: 'Write' }]} />`,
          },
          {
            type: 'list',
            id: 'react-l6-list',
            style: 'bullet',
            items: [
              '`.map()` turns each item into an element; the result is an array React can render.',
              'The `key` must be stable and unique among siblings — an id from the data, not a random number or the index.',
              'Keys are internal to React: they appear on the element, not in the rendered DOM, and not in the child’s props.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l6-warn',
            title: 'Do not key by index',
            body: 'Index keys look harmless and are correct until the list changes order. Then React reuses the wrong DOM nodes and the UI shows stale state — an input keeps the value that belonged to a different row.',
          },
          {
            type: 'heading',
            id: 'react-l6-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l6-b3',
            body: 'Turn an array of tasks into a list. The tests check both the rendered text and the identity React uses to track each row.',
          },
          {
            type: 'exercise',
            id: 'react-l6-x1',
            exercise: {
              id: 'ex-react-l6',
              instructions:
                'Write TaskList({ items }) returning a ul with one li per item, keyed by item.id and showing item.title.',
              languages: ['jsx'],
              files: [
                {
                  path: 'TaskList.jsx',
                  language: 'jsx',
                  content: `// Map the items into <li> elements keyed by item.id.\nexport default function TaskList({ items }) {\n  return <ul />\n}\n`,
                },
              ],
              previewProps: {
                items: [
                  { id: 'a', title: 'Write the reducer' },
                  { id: 'b', title: 'Ship it' },
                ],
              },
              tests: [
                { id: 'ex-react-l6-t1', label: 'the root is a ul', body: "return TaskList({ items: [] }).type === 'ul'" },
                {
                  id: 'ex-react-l6-t2',
                  label: 'there is one li per item',
                  body: "const kids = TaskList({ items: [{ id: 'a', title: 'A' }, { id: 'b', title: 'B' }] }).props.children; return kids.length === 2",
                },
                {
                  id: 'ex-react-l6-t3',
                  label: 'each li shows the item title',
                  body: "const kids = TaskList({ items: [{ id: 'a', title: 'Write the plan' }] }).props.children; return kids[0].type === 'li' && kids[0].props.children === 'Write the plan'",
                },
                {
                  id: 'ex-react-l6-t4',
                  label: 'each li is keyed by the item id',
                  body: "const kids = TaskList({ items: [{ id: 'a', title: 'A' }, { id: 'b', title: 'B' }] }).props.children; return kids[0].key === 'a' && kids[1].key === 'b'",
                },
                {
                  id: 'ex-react-l6-t5',
                  label: 'an empty list renders no rows',
                  body: "return TaskList({ items: [] }).props.children.length === 0",
                },
              ],
              hints: [
                'Map over items inside the ul: {items.map((item) => ...)}.',
                'Return the <li> from the map callback, and give it key={item.id}.',
                'The visible text is a child of the li, so the arrow function should return a single element: <li key={item.id}>{item.title}</li>.',
              ],
              solutionFiles: [
                {
                  path: 'TaskList.jsx',
                  language: 'jsx',
                  content: `export default function TaskList({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        <li key={item.id}>{item.title}</li>\n      ))}\n    </ul>\n  )\n}\n`,
                },
              ],
              testNotes:
                'The key check reads element.key directly, because React stores the key on the element rather than in props.',
            },
          },
        ],
      },
      {
        id: 'react-l37',
        title: 'JSX expressions and attributes',
        description: 'Embedding JavaScript in JSX with curly braces, setting attributes, and the difference between attribute and property.',
        duration: 6,
        objectives: [
          'Embed any JavaScript expression in JSX with curly braces',
          'Set string and numeric attributes on JSX elements',
          'Spread props onto an element with the spread operator',
          'Explain why className is used instead of class',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l37',
          title: 'JSX expressions and attributes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l37-q1',
              type: 'blank',
              prompt: 'What prop does a component receive by default to render its child content?',
              answers: [
                'children',
                'props.children',
              ],
              explanation: 'The children prop contains whatever content is nested between a component\'s opening and closing tags.',
            },
            {
              id: 'quiz-react-l37-q2',
              type: 'multiple-choice',
              prompt: 'Which of these cannot appear inside JSX curly braces?',
              options: [
                'A variable',
                'A function call',
                'An arithmetic expression',
                'An `if` statement',
              ],
              answer: 3,
              explanation: 'Braces accept expressions that produce a value, not statements. That is why ternaries and `&&` replace `if` inside JSX.',
            },
            {
              id: 'quiz-react-l37-q3',
              type: 'multiple-choice',
              prompt: 'Which JSX attribute replaces the HTML `for` attribute on a label?',
              options: [
                'for',
                'labelFor',
                'className',
                'htmlFor',
              ],
              answer: 3,
              explanation: '`for` is a reserved word in JavaScript, so JSX uses `htmlFor`. Similarly `class` becomes `className`.',
            },
            {
              id: 'quiz-react-l37-q4',
              type: 'multiple-choice',
              prompt: 'How do you forward a whole props object onto a `div` in JSX?',
              options: [
                '<div {...props} />',
                '<div props={...props} />',
                '<div {props} />',
                '<div spread(props) />',
              ],
              answer: 0,
              explanation: 'The spread operator inside the tag expands the object into individual attributes, which is how wrapper components stay transparent.',
            },
            {
              id: 'quiz-react-l37-q5',
              type: 'multiple-choice',
              prompt: 'What is the difference between `src="url"` and `src={url}`?',
              options: [
                'The first passes the literal string "url"; the second passes the value of the variable named url',
                'They are identical',
                'The second form is invalid JSX',
                'The first form only works on img elements',
              ],
              answer: 0,
              explanation: 'Quotes always mean a fixed string, while braces evaluate a JavaScript expression. Confusing the two hard-codes a value you meant to compute.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l37-d1',
            title: 'Braces for values, quotes for strings',
            body: 'A variable is embedded with `{ }`, and the same braces set attributes from values. The class attribute keeps its JSX name, `className`.',
            files: [
              {
                path: 'Avatar.jsx',
                language: 'jsx',
                content: `export default function Avatar({ name, url }) {
  const label = 'Hello, ' + name
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <h4 style={{ margin: '0 0 6px', fontSize: 15 }}>{label}</h4>
      <img src={url} alt={name} className="avatar" style={{ width: 64, height: 64, borderRadius: '50%' }} />
    </div>
  )
}
`,
              },
            ],
            previewProps: {
              name: 'Ada Lovelace',
              url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' rx='48' fill='%232f6feb'/%3E%3C/svg%3E",
            },
            height: 150,
          },
          {
            type: 'text',
            id: 'react-l37-intro',
            body: '**JSX expressions and attributes.** Curly braces switch from markup back to JavaScript. Anything that produces a value — a variable, arithmetic, a function call — can go inside `{ }`, and the same braces set an attribute to a computed value instead of a fixed string.',
          },
          {
            type: 'text',
            id: 'react-l37-b2',
            body: 'Attributes use JavaScript names, not HTML ones. `class` becomes `className` because `class` is a reserved word, and `for` becomes `htmlFor`. Strings stay quoted; everything else is wrapped in braces: `src={url}` rather than `src="url"`.',
          },
          {
            type: 'heading',
            id: 'react-l37-h1',
            level: 2,
            body: 'Braces for values, quotes for fixed strings',
          },
          {
            type: 'code',
            id: 'react-l37-code',
            language: 'jsx',
            title: 'expressions and attributes',
            code: `const name = 'Ada'\nconst url = '/ada.png'\n\n// Those two values arrive as props from the caller:\nexport default function Avatar({ name, url }) {\n  return (\n    <div>\n      <h1>{'Hello, ' + name}</h1>\n      <img src={url} alt={name} className="avatar" />\n    </div>\n  )\n}\n\n// Comparison: HTML vs JSX\n// <img class="avatar" src="x">\n// <img className="avatar" src={x} />`,
          },
          {
            type: 'list',
            id: 'react-l37-list',
            style: 'bullet',
            items: [
              '`{expression}` embeds a value; a string literal is written as `{"text"}`.',
              '`className` and `htmlFor` replace the HTML `class` and `for` attributes.',
              'Spread (`{...props}`) forwards many attributes at once, which is how wrappers stay transparent.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l37-tip',
            title: 'An expression, not a statement',
            body: 'Only expressions may appear in braces — no `if` or `for`. Anything that computes a value works, which is why ternaries and `&&` show up where an `if` would be in ordinary code.',
          },
          {
            type: 'heading',
            id: 'react-l37-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l37-b3',
            body: 'Set attributes from the props you receive, remembering the JSX names.',
          },
          {
            type: 'exercise',
            id: 'react-l37-x1',
            exercise: {
              id: 'ex-react-l37',
              instructions:
                'Write Avatar({ name, url }) returning an img whose src is the url, whose alt is the name, and whose className is "avatar".',
              languages: ['jsx'],
              files: [
                {
                  path: 'Avatar.jsx',
                  language: 'jsx',
                  content: `// Return an <img> built from the props.\nexport default function Avatar({ name, url }) {\n  return <div />\n}\n`,
                },
              ],
              previewProps: {
                name: 'Ada Lovelace',
                // An inline placeholder, so the preview shows the image rather
                // than a broken-image icon.
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect width='96' height='96' rx='48' fill='%232f6feb'/%3E%3C/svg%3E",
              },
              tests: [
                { id: 'ex-react-l37-t1', label: 'the element is an img', body: "return Avatar({ name: 'Ada', url: '/a.png' }).type === 'img'" },
                {
                  id: 'ex-react-l37-t2',
                  label: 'src comes from the url prop',
                  body: "return Avatar({ name: 'Ada', url: '/a.png' }).props.src === '/a.png'",
                },
                {
                  id: 'ex-react-l37-t3',
                  label: 'alt comes from the name prop',
                  body: "return Avatar({ name: 'Ada', url: '/a.png' }).props.alt === 'Ada'",
                },
                {
                  id: 'ex-react-l37-t4',
                  label: 'the class is set with className',
                  body: "return Avatar({ name: 'Ada', url: '/a.png' }).props.className === 'avatar'",
                },
              ],
              hints: [
                'Computed attributes are wrapped in braces: src={url}.',
                'The image class attribute is className, not class.',
                'A self-closing tag is enough here: <img src={url} alt={name} className="avatar" />.',
              ],
              solutionFiles: [
                {
                  path: 'Avatar.jsx',
                  language: 'jsx',
                  content: `export default function Avatar({ name, url }) {\n  return <img src={url} alt={name} className="avatar" />\n}\n`,
                },
              ],
              testNotes:
                'The tests change the url and name between checks, so hard-coded attribute values fail.',
            },
          },
        ],
      },
      {
        id: 'react-l38',
        title: 'Conditional rendering',
        description: 'Rendering different UI based on state using if statements, ternaries, and the && operator.',
        duration: 6,
        objectives: [
          'Guard rendering with early returns',
          'Use ternary operators for inline conditional JSX',
          'Use the && operator for simple presence checks',
          'Choose the right pattern for readability and accessibility',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-react-l38',
          title: 'Conditional rendering quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l38-q1',
              type: 'multiple-choice',
              prompt: 'Why does React warn about keys when rendering a list?',
              options: [
                'To make the list sortable',
                'To track which items changed, were added, or were removed',
                'To style each item differently',
                'To prevent memory leaks',
              ],
              answer: 1,
              explanation: 'Keys help React identify which items in a list have changed. Without them, reordering causes bugs and poor performance.',
            },
            {
              id: 'quiz-react-l38-q2',
              type: 'multiple-choice',
              prompt: '`{count && <p>Items</p>}` with `count` equal to `0` renders what?',
              options: [
                'The number 0',
                'Nothing',
                '<p>Items</p>',
                'An error',
              ],
              answer: 0,
              explanation: '`0` is falsy, so `&&` returns `0` itself rather than skipping. React then renders that number, producing a stray zero on the page.',
            },
            {
              id: 'quiz-react-l38-q3',
              type: 'multiple-choice',
              prompt: 'When is an early return the clearest conditional pattern?',
              options: [
                'When the alternative is a whole different view',
                'When you need two inline options in one sentence',
                'When the condition is always true',
                'When you want to skip rendering the component entirely',
              ],
              answer: 0,
              explanation: 'An early return handles a completely different screen up front and leaves the main path flat, instead of nesting the whole layout in a branch.',
            },
            {
              id: 'quiz-react-l38-q4',
              type: 'true-false',
              prompt: 'A ternary always renders one of its two branches.',
              answer: true,
              explanation: 'Unlike `&&`, a ternary has an explicit alternative, so one of the two values is always chosen — which is why both branches should be valid JSX.',
            },
            {
              id: 'quiz-react-l38-q5',
              type: 'multiple-choice',
              prompt: 'Which expression is safe on the left of `&&` when the value might be `0`?',
              options: [
                'unread',
                'unread > 0',
                'count',
                'items.length',
              ],
              answer: 1,
              explanation: 'Comparing makes the left side a boolean, so a zero becomes `false` and renders nothing instead of printing a stray `0`.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l38-d1',
            title: 'One boolean, two ways',
            body: 'The ternary always renders one of the two lines, while the `&&` span appears only when the condition holds - a zero count would show nothing at all.',
            files: [
              {
                path: 'Status.jsx',
                language: 'jsx',
                content: `export default function Status({ loggedIn, unread }) {
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <p style={{ margin: 0 }}>{loggedIn ? 'Welcome back' : 'Please sign in'}</p>
      {loggedIn && unread > 0 && (
        <span style={{ color: '#bf3989' }}>{unread} unread</span>
      )}
    </div>
  )
}
`,
              },
            ],
            previewProps: { loggedIn: true, unread: 3 },
            height: 130,
          },
          {
            type: 'text',
            id: 'react-l38-intro',
            body: '**Conditional rendering.** There is no special syntax for showing one thing or another — conditions are just JavaScript inside the component. What varies is where you put them: an early return at the top, a ternary inside JSX, or the `&&` shorthand for something that may not be there at all.',
          },
          {
            type: 'text',
            id: 'react-l38-b2',
            body: 'Both branches of a ternary are always the same kind of value — two elements. With `&&`, a false left side renders nothing. That is convenient, but a falsy value such as `0` printed by `&&` shows up as a stray zero, so guard the condition itself rather than relying on the value.',
          },
          {
            type: 'heading',
            id: 'react-l38-h1',
            level: 2,
            body: 'Three ways, one idea',
          },
          {
            type: 'code',
            id: 'react-l38-code',
            language: 'jsx',
            title: 'early return, ternary, and &&',
            code: `export default function Status({ loggedIn }) {\n  // Early return: a guard for a whole-different view.\n  if (!loggedIn) return <p>Please sign in</p>\n\n  return (\n    <div>\n      <p>Welcome back</p>\n      {unreadCount > 0 && <span>{unreadCount} unread</span>}\n    </div>\n  )\n}\n\n// A ternary when both sides are elements:\n// {loggedIn ? <p>Welcome back</p> : <p>Please sign in</p>}`,
          },
          {
            type: 'list',
            id: 'react-l38-list',
            style: 'bullet',
            items: [
              'An early return keeps the happy path flat when the alternative is a whole different view.',
              'A ternary chooses between two values inline and always renders one of them.',
              '`cond && element` renders the element only when the condition holds — and nothing otherwise.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l38-warn',
            title: 'Beware && with a number',
            body: 'If the left side is `0`, React renders the number zero rather than nothing. Write `count > 0 && ...` so the left side is always a boolean.',
          },
          {
            type: 'heading',
            id: 'react-l38-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l38-b3',
            body: 'Return different markup depending on a single boolean, with the same element type in both cases.',
          },
          {
            type: 'exercise',
            id: 'react-l38-x1',
            exercise: {
              id: 'ex-react-l38',
              instructions:
                'Write Status({ loggedIn }) returning a p with the text "Welcome back" when loggedIn is true, and the text "Please sign in" when it is false.',
              languages: ['jsx'],
              files: [
                {
                  path: 'Status.jsx',
                  language: 'jsx',
                  content: `// Return a <p> whose text depends on loggedIn.\nexport default function Status({ loggedIn }) {\n  return <p>Please sign in</p>\n}\n`,
                },
              ],
              previewProps: { loggedIn: true },
              tests: [
                {
                  id: 'ex-react-l38-t1',
                  label: 'the element is always a p',
                  body: 'return Status({ loggedIn: true }).type === "p" && Status({ loggedIn: false }).type === "p"',
                },
                {
                  id: 'ex-react-l38-t2',
                  label: 'a signed-in user is welcomed back',
                  body: 'return Status({ loggedIn: true }).props.children === "Welcome back"',
                },
                {
                  id: 'ex-react-l38-t3',
                  label: 'a signed-out user is asked to sign in',
                  body: 'return Status({ loggedIn: false }).props.children === "Please sign in"',
                },
                {
                  id: 'ex-react-l38-t4',
                  label: 'the condition is what changes, not the tag',
                  body: 'const a = Status({ loggedIn: true }); const b = Status({ loggedIn: false }); return a.type === b.type && a.props.children !== b.props.children',
                },
              ],
              hints: [
                'A ternary fits here because both sides are the same element with different text.',
                'Write the condition in braces inside the JSX: {loggedIn ? <p>...</p> : <p>...</p>}.',
                'Both branches must be a <p>, so only the text differs.',
              ],
              solutionFiles: [
                {
                  path: 'Status.jsx',
                  language: 'jsx',
                  content: `export default function Status({ loggedIn }) {\n  return loggedIn ? <p>Welcome back</p> : <p>Please sign in</p>\n}\n`,
                },
              ],
              testNotes:
                'The last check confirms the two states share an element type but differ in content — the exact shape a ternary produces.',
            },
          },
        ],
      },
      {
        id: 'react-l39',
        title: 'Class components',
        description: 'The legacy component syntax: state, lifecycle methods, and when you might still encounter them.',
        duration: 5,
        objectives: [
          'Write a class component with a render method',
          'Manage state with this.state and this.setState',
          'Use lifecycle methods like componentDidMount',
          'Understand why function components with hooks are preferred',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-react-l39',
          title: 'Class components quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-react-l39-q1',
              type: 'multiple-choice',
              prompt: 'Which method must a class component define to return its JSX?',
              options: [
                'componentDidMount',
                'constructor',
                'render',
                'setState',
              ],
              answer: 2,
              explanation: 'React calls `render()` to read the component’s output. Lifecycle methods run around that render, and `setState` schedules a new one.',
            },
            {
              id: 'quiz-react-l39-q2',
              type: 'multiple-choice',
              prompt: 'Inside a class component, where do the incoming props live?',
              options: [
                'this.state',
                'this.data',
                'A global props object',
                'this.props',
              ],
              answer: 3,
              explanation: 'The base class assigns props to the instance, so a class reads them through `this.props` rather than a destructured parameter.',
            },
            {
              id: 'quiz-react-l39-q3',
              type: 'multiple-choice',
              prompt: 'State is `{ count: 0, name: "Ada" }`. What does `this.setState({ count: 1 })` leave `name` as?',
              options: [
                'undefined, because state is replaced entirely',
                '"Ada", because setState merges the given fields',
                'An error is thrown',
                'It resets to an empty string',
              ],
              answer: 1,
              explanation: '`setState` performs a shallow merge, so only the named field changes and every other field keeps its current value.',
            },
            {
              id: 'quiz-react-l39-q4',
              type: 'multiple-choice',
              prompt: 'Which class must a legacy React component extend?',
              options: [
                'React.Component',
                'React.Element',
                'React.PureComponent only',
                'HTMLElement',
              ],
              answer: 0,
              explanation: 'Extending `React.Component` (or importing `Component` from react) gives the instance its props, state, and render lifecycle.',
            },
            {
              id: 'quiz-react-l39-q5',
              type: 'true-false',
              prompt: 'Function components with hooks are the preferred modern style, while classes remain readable legacy code.',
              answer: true,
              explanation: 'Hooks express state and effects without `this` or lifecycle ceremony, but classes still appear in older code and tutorials, so reading them matters.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'react-l39-d1',
            title: 'The class form, actually running',
            body: 'A class reads its inputs from `this.props` and returns markup from `render`. Importing `Component` replaces the older `React.Component` global.',
            files: [
              {
                path: 'Welcome.jsx',
                language: 'jsx',
                content: `import { Component } from 'react'

class Welcome extends Component {
  render() {
    return <h1 style={{ margin: 0, fontSize: 18 }}>Hello, {this.props.name}</h1>
  }
}

export default function App({ name }) {
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      <Welcome name={name} />
      <p style={{ margin: '6px 0 0', color: '#5b6470' }}>Rendered by a class component.</p>
    </div>
  )
}
`,
              },
            ],
            previewProps: { name: 'Ada' },
            height: 130,
          },
          {
            type: 'text',
            id: 'react-l39-intro',
            body: '**Class components.** Before hooks, components were classes that extended `React.Component` and returned markup from a `render` method. You will still meet them in older code and in many tutorials, so it is worth being able to read one — and to write its function-component equivalent.',
          },
          {
            type: 'text',
            id: 'react-l39-b2',
            body: 'A class reads state from `this.state` and changes it with `this.setState`, which merges the given fields into the existing state. Lifecycle methods such as `componentDidMount` run at fixed points in the component’s life. Every one of these has a direct hook equivalent in a function component.',
          },
          {
            type: 'heading',
            id: 'react-l39-h1',
            level: 2,
            body: 'The class form, and its modern twin',
          },
          {
            type: 'code',
            id: 'react-l39-code',
            language: 'jsx',
            title: 'a class component and the same component as a function',
            code: `// Legacy class syntax:\nclass Welcome extends React.Component {\n  render() {\n    return <h1>{'Hello, ' + this.props.name}</h1>\n  }\n}\n\n// The modern equivalent — a function is enough for this component:\nfunction Welcome({ name }) {\n  return <h1>{'Hello, ' + name}</h1>\n}\n\n// When state is needed, the class adds this.state...\n// ...which becomes a useState pair in a function.`,
          },
          {
            type: 'list',
            id: 'react-l39-list',
            style: 'bullet',
            items: [
              '`render()` returns the JSX, and `this.props` holds the props.',
              '`this.setState({ ... })` merges into state and triggers a re-render.',
              '`componentDidMount` and friends map onto `useEffect`, which is why function components are now the default.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l39-tip',
            title: 'Read the class, write the function',
            body: 'When you find a class component, translate it: props destructured in the signature, `this.state` to `useState`, and each lifecycle method to a `useEffect`. The behaviour is the same, and there is no `this` to bind.',
          },
          {
            type: 'heading',
            id: 'react-l39-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l39-b3',
            body: 'Write the function-component version of the greeting class above. It renders the same output with no `this`.',
          },
          {
            type: 'exercise',
            id: 'react-l39-x1',
            exercise: {
              id: 'ex-react-l39',
              instructions:
                'Write a function component Welcome({ name }) returning an h1 with the text "Hello, " followed by the name. For name "Ada" the visible text is "Hello, Ada".',
              languages: ['jsx'],
              files: [
                {
                  path: 'Welcome.jsx',
                  language: 'jsx',
                  content: `// Return an <h1> greeting the person in props.name.\nexport default function Welcome({ name }) {\n  return <h1 />\n}\n`,
                },
              ],
              previewProps: { name: 'Ada' },
              tests: [
                { id: 'ex-react-l39-t1', label: 'the element is an h1', body: "return Welcome({ name: 'Ada' }).type === 'h1'" },
                {
                  id: 'ex-react-l39-t2',
                  label: 'it greets the given name',
                  body: "const kids = Welcome({ name: 'Ada' }).props.children; return (Array.isArray(kids) ? kids.join('') : kids) === 'Hello, Ada'",
                },
                {
                  id: 'ex-react-l39-t3',
                  label: 'a different name produces different text',
                  body: "const kids = Welcome({ name: 'Grace' }).props.children; return (Array.isArray(kids) ? kids.join('') : kids) === 'Hello, Grace'",
                },
              ],
              hints: [
                'Destructure the prop: function Welcome({ name }).',
                'Mix text and a value inside the heading: <h1>Hello, {name}</h1>.',
                'Keep the comma and the space after "Hello" exactly as written.',
              ],
              solutionFiles: [
                {
                  path: 'Welcome.jsx',
                  language: 'jsx',
                  content: `export default function Welcome({ name }) {\n  return <h1>Hello, {name}</h1>\n}\n`,
                },
              ],
              testNotes:
                'The tests join the children before comparing, because JSX turns mixed text and expressions into a small array of parts.',
            },
          },
        ],
      },
    ],
  },
]
