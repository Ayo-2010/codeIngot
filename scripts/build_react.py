def react_l40():
    return build_lesson('react-l40','Textarea and Select',
        'Controlled textarea and select elements.',6,35,
        ['Bind a textarea value to state','Bind a select value to state','Handle change events for both'],
        [T('<strong>Controlled textarea and select.</strong> Like inputs, textarea and select elements are controlled by binding their <code>value</code> to state and updating state through <code>onChange</code>.','react-l40','b1'),
         T('For a <code>select</code>, the <code>value</code> should match one of the <code>&lt;option&gt;</code> values. Changing state updates which option is selected.','react-l40','b2'),
         H('Controlled textarea/select','react-l40','h1'),
         L(['<code><textarea value={note} onChange={e => setNote(e.target.value)} /></code>' + chr(9) + 'textarea.',
            '<code><select value={lang} onChange={e => setLang(e.target.value)}></code>' + chr(9) + 'select.',
            'Each <code>&lt;option value="js"&gt;</code> carries the value that becomes state.'],'react-l40','l1'),
         C('const [lang, setLang] = useState("js")\nreturn <select value={lang} onChange={e => setLang(e.target.value)}>\n  <option value="js">JavaScript</option>\n  <option value="ts">TypeScript</option>\n</select>','javascript','Controlled select','react-l40','c1'),
         TP('value must match an option','If select value does not match any option value, nothing appears selected.','react-l40','t1'),
         EX('react-l40',
            'Write a <code>LanguagePicker</code> with a controlled <code>&lt;select></code> offering "js" and "ts" options, bound to state.',
            {'javascript':'import { useState } from "react"\n\nfunction LanguagePicker() {\n  // your code here\n}'},
            [{'id':'ex-react-l40-t1','label':'select with value and onChange','body':'return /select/.test(code) && /onChange=/.test(code)'}],
            ['Import useState.','Render <select value={lang} onChange={e => setLang(e.target.value)}> with options.'],
            {'javascript':'import { useState } from "react"\n\nfunction LanguagePicker() {\n  const [lang, setLang] = useState("js")\n  return <select value={lang} onChange={e => setLang(e.target.value)}>\n    <option value="js">JavaScript</option>\n    <option value="ts">TypeScript</option>\n  </select>\n}'})])

def react_l41():
    return build_lesson('react-l41','Multiple inputs, Checkbox and Radio',
        'Handling multiple inputs, checkboxes, and radio groups.',7,40,
        ['Handle several inputs with a single state object','Use checked/onChange for checkboxes','Group radios with a shared name and value'],
        [T('<strong>Multiple inputs.</strong> When a form has many fields, keep them in a single state object and update by <code>e.target.name</code>.','react-l41','b1'),
         T('<strong>Checkboxes</strong> use <code>checked</code>/<code>onChange</code> with a boolean. <strong>Radios</strong> share a <code>name</code> and each has a <code>value</code>; the selected one matches state.','react-l41','b2'),
         H('Patterns','react-l41','h1'),
         L(['<code>setForm({ ...form, [e.target.name]: e.target.value })</code>' + chr(9) + 'multiple inputs.',
            '<code>checked={agreed} onChange={e => setAgreed(e.target.checked)}</code>' + chr(9) + 'checkbox.',
            '<code>name="theme" value="dark" checked={theme === "dark"}</code>' + chr(9) + 'radio.'],'react-l41','l1'),
         C('const [form, setForm] = useState({ name: "", email: "" })\nfunction onChange(e) {\n  setForm({ ...form, [e.target.name]: e.target.value })\n}','javascript','Multiple inputs','react-l41','c1'),
         TP('Checkbox is boolean','Use <code>checked</code> (not <code>value</code>) for checkboxes and store a boolean in state.','react-l41','t1'),
         EX('react-l41',
            'Write a <code>Settings</code> component with a checkbox "agree" bound to boolean state, returning the checkbox with checked and onChange.',
            {'javascript':'import { useState } from "react"\n\nfunction Settings() {\n  // your code here\n}'},
            [{'id':'ex-react-l41-t1','label':'Uses checked','body':'return /checked=/.test(code)'},
             {'id':'ex-react-l41-t2','label':'Uses useState','body':'return /useState/.test(code)'}],
            ['Import useState with a boolean.','Render <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />.'],
            {'javascript':'import { useState } from "react"\n\nfunction Settings() {\n  const [agreed, setAgreed] = useState(false)\n  return <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />\n}'})])

def react_l42():
    return build_lesson('react-l42','useTransition',
        'Marking non-urgent updates with useTransition.',6,35,
        ['Call useTransition to get [isPending, startTransition]','Wrap non-urgent updates in startTransition','Show a pending indicator while transitioning'],
        [T('<strong>useTransition.</strong> Some state updates (like typing in a search box that filters a long list) can feel laggy because every keystroke re-renders a large list. useTransition marks an update as non-urgent, so urgent input stays responsive while the heavy list re-renders in the background.','react-l42','b1'),
         T('useTransition returns <code>[isPending, startTransition]</code>. Wrap the non-urgent state update in <code>startTransition(() => setQuery(q))</code>. <code>isPending</code> is true while the transition is in progress.','react-l42','b2'),
         H('Using useTransition','react-l42','h1'),
         L(['<code>const [isPending, startTransition] = useTransition()</code>.',
            '<code>startTransition(() => setQuery(q))</code>' + chr(9) + 'mark as non-urgent.',
            'Show a loading indicator when <code>isPending</code> is true.'],'react-l42','l1'),
         C('const [isPending, startTransition] = useTransition()\nfunction handleChange(e) {\n  setQuery(e.target.value)            // urgent: show the typed char\n  startTransition(() => setResults(filter(results, e.target.value)))  // non-urgent\n}','javascript','useTransition','react-l42','c1'),
         TP('Keep urgent updates urgent','Typing into the input must stay instant. Only wrap the expensive downstream update in startTransition.','react-l42','t1'),
         EX('react-l42',
            'Write a component that calls useTransition and returns [isPending, startTransition].',
            {'javascript':'import { useTransition } from "react"\n\nfunction Search() {\n  // your code here\n}'},
            [{'id':'ex-react-l42-t1','label':'Uses useTransition','body':'return /useTransition/.test(code)'}],
            ['Import useTransition from "react".','Call const [isPending, startTransition] = useTransition().'],
            {'javascript':'import { useTransition } from "react"\n\nfunction Search() {\n  const [isPending, startTransition] = useTransition()\n  return null\n}'})])

def react_l43():
    return build_lesson('react-l43','forwardRef',
        'Forwarding refs through custom components with forwardRef.',6,35,
        ['Wrap a component with forwardRef to receive a ref','Forward the ref to the underlying DOM element','Use forwardRef with function components'],
        [T('<strong>forwardRef.</strong> By default, refs work on DOM elements, not on custom components. forwardRef lets a parent pass a ref through a custom component to a DOM element inside it — useful for focusing a custom input, for example.','react-l43','b1'),
         T('forwardRef receives a render function with (props, ref). You forward the ref to a DOM element with <code>ref={ref}</code>.','react-l43','b2'),
         H('forwardRef pattern','react-l43','h1'),
         L(['<code>const Fwd = forwardRef((props, ref) => ...)</code>' + chr(9) + 'create the component.',
            '<code>&lt;input ref={ref} {...props} /&gt;</code>' + chr(9) + 'forward the ref to a DOM element.',
            'Type refs with <code>React.Ref</code> and <code>RefObject</code>.'],'react-l43','l1'),
         C('const FwdInput = forwardRef((props, ref) => (\n  <input ref={ref} {...props} />\n))','javascript','forwardRef','react-l43','c1'),
         TP('Prefer refs sparingly','Most interactions should flow through state and events. Reach for refs only when you need direct DOM access (focus, text selection, measurements).','react-l43','t1'),
         EX('react-l43',
            'Write a <code>Fwd</code> component with forwardRef that renders <code>&lt;input ref={ref} {...props} /></code>.',
            {'javascript':'import { forwardRef } from "react"\n\n// your code here'},
            [{'id':'ex-react-l43-t1','label':'forwardRef used','body':'return /forwardRef/.test(code)'}],
            ['Import forwardRef from "react".','Call forwardRef((props, ref) => <input ref={ref} {...props} />).'],
            {'javascript':'import { forwardRef } from "react"\n\nconst Fwd = forwardRef((props, ref) => <input ref={ref} {...props} />)'})])

def react_l44():
    return build_lesson('react-l44','Custom Hooks',
        'Extracting reusable logic into custom hooks.',7,45,
        ['Name a hook function starting with use','Share logic between components with a custom hook','Use built-in hooks inside a custom hook'],
        [T('<strong>Custom Hooks.</strong> When several components share the same stateful logic, extract it into a custom Hook — a function whose name starts with <code>use</code> and that calls other Hooks.','react-l44','b1'),
         T('Custom Hooks let you share logic (not state). Each component that calls the Hook gets its own isolated state and effects.','react-l44','b2'),
         H('Custom Hook rules','react-l44','h1'),
         L(['Name it <code>useSomething</code>' + chr(9) + 'React identifies Hooks by the "use" prefix.',
            'Call other Hooks inside it (useState, useEffect, etc.).',
            'Return whatever state or functions consumers need.'],'react-l44','l1'),
         C('function useCounter() {\n  const [count, setCount] = useState(0)\n  return [count, () => setCount(c => c + 1)]\n}','javascript','Custom hook','react-l44','c1'),
         TP('Hooks share logic, not state','Two components using useCounter each get their own count. They do not share state.','react-l44','t1'),
         EX('react-l44',
            'Write a custom Hook <code>useCounter</code> that returns <code>[count, increment]</code> using useState.',
            {'javascript':'import { useState } from "react"\n\nfunction useCounter() {\n  // your code here\n}'},
            [{'id':'ex-react-l44-t1','label':'Name starts with use','body':'return /^function useCounter/.test(code) || /const useCounter =/.test(code)'},
             {'id':'ex-react-l44-t2','label':'Uses useState','body':'return /useState/.test(code)'}],
            ['Name the function useCounter.','Use useState(0) and return [count, increment].'],
            {'javascript':'import { useState } from "react"\n\nfunction useCounter() {\n  const [count, setCount] = useState(0)\n  return [count, () => setCount(c => c + 1)]\n}'})])

def react_l45():
    return build_lesson('react-l45','Higher-Order Components',
        'Wrapping components with Higher-Order Components.',5,35,
        ['Write an HOC that takes a component and returns an enhanced one','Pass props through to the wrapped component','Explain why custom hooks are preferred over HOCs today'],
        [T('<strong>Higher-Order Components (HOCs).</strong> An HOC is a function that takes a component and returns a new, enhanced component. It was the original way to reuse logic before Hooks.','react-l45','b1'),
         T('Today, custom Hooks are preferred because they are more explicit and compose better. Learn HOCs mainly to read and maintain older code.','react-l45','b2'),
         H('HOC pattern','react-l45','h1'),
         L(['<code>const withLog = Wrapped => props => { ... return <Wrapped {...props} /> }</code>.',
            'The HOC receives props and passes them through to the wrapped component.',
            'Add behavior (logging, auth, data fetching) without changing the wrapped component.'],'react-l45','l1'),
         C('const withLog = Wrapped => props => {\n  console.log(props)\n  return <Wrapped {...props} />\n}','javascript','Higher-Order Component','react-l45','c1'),
         W('Hooks replace HOCs','New code should use custom Hooks instead of HOCs. HOCs add indirection and can make debugging harder.','react-l45','w1'),
         EX('react-l45',
            'Write an HOC <code>withLog</code> that takes a component and returns a component that logs its props before rendering.',
            {'javascript':'// your HOC here'},
            [{'id':'ex-react-l45-t1','label':'Returns a function/component','body':'return typeof code === "string" && code.includes("=>")'}],
            ['Define withLog as a function taking Wrapped and returning a component.','Spread props into <Wrapped {...props} />.'],
            {'javascript':'const withLog = Wrapped => props => {\n  console.log(props)\n  return <Wrapped {...props} />\n}'})])

def react_l46():
    return build_lesson('react-l46','React Portals',
        'Rendering into a DOM node outside the tree with portals.',6,35,
        ['Create a portal with createPortal','Render into a DOM node outside the React tree','Manage focus across the portal boundary'],
        [T('<strong>Portals.</strong> Normally a component renders inside its parent’s DOM node. createPortal lets you render a component’s children into a different part of the DOM — ideal for modals, tooltips, and notifications that need to escape overflow/clipping containers.','react-l46','b1'),
         T('React still treats portal content as part of the component tree for state and context, even though it lives elsewhere in the DOM.','react-l46','b2'),
         H('createPortal','react-l46','h1'),
         L(['<code>createPortal(children, domNode)</code>' + chr(9) + 'render children into domNode.',
            'Commonly used for modals appended to <code>document.body</code>.',
            'Event bubbling still works through the React tree, not the DOM tree.'],'react-l46','l1'),
         C('return createPortal(\n  <div className="modal">Hi</div>,\n  document.getElementById("modal-root")\n)','javascript','React Portal','react-l46','c1'),
         TP('Manage focus in modals','When a portal opens a modal, move focus into it and restore focus when it closes, for accessibility.','react-l46','t1'),
         EX('react-l46',
            'Write a component that returns createPortal(<div className="modal">Hi</div>, document.getElementById("modal-root")).',
            {'javascript':'import { createPortal } from "react-dom"\n\n// your code here'},
            [{'id':'ex-react-l46-t1','label':'createPortal used','body':'return /createPortal/.test(code)'}],
            ['Import createPortal from "react-dom".','Pass the modal JSX and the target DOM node.'],
            {'javascript':'import { createPortal } from "react-dom"\n\nreturn createPortal(\n  <div className="modal">Hi</div>,\n  document.getElementById("modal-root")\n)'})])

def react_l47():
    return build_lesson('react-l47','CSS styling approaches',
        'Importing regular CSS into React components.',5,30,
        ['Import a CSS file into a component','Apply className to JSX elements','Understand global CSS scope'],
        [T('<strong>Regular CSS.</strong> The simplest way to style React is to write ordinary CSS in a <code>.css</code> file and import it into your component: <code>import "./App.css"</code>. Then reference classes with <code>className</code>.','react-l47','b1'),
         T('Because imported CSS is global, class names can collide across components. Use specific or unique class names, or move to CSS Modules for scoping.','react-l47','b2'),
         H('Importing CSS','react-l47','h1'),
         L(['<code>import "./Card.css"</code>' + chr(9) + 'bring in the stylesheet.',
            '<code>&lt;div className="card"&gt;</code>' + chr(9) + 'apply the class.',
            'Styles apply globally unless scoped.'],'react-l47','l1'),
         C('import "./Card.css"\n\nfunction Card() {\n  return <div className="card">Hi</div>\n}','javascript','Importing CSS','react-l47','c1'),
         TP('Global CSS caution','A class like <code>.card</code> in one file affects every element with className "card" everywhere.','react-l47','t1'),
         EX('react-l47',
            'Write a component that imports "./Button.css" and renders a <code>&lt;button className="btn"></code>.',
            {'javascript':'// your component here'},
            [{'id':'ex-react-l47-t1','label':'Import CSS','body':'return /import.*\.css/.test(code)'},
             {'id':'ex-react-l47-t2','label':'className btn','body':'return /className="btn"/.test(code)'}],
            ['Add import "./Button.css".','Render <button className="btn">.'],
            {'javascript':'import "./Button.css"\n\nexport default function Button() {\n  return <button className="btn">Click</button>\n}'})])

def react_l48():
    return build_lesson('react-l48','CSS Modules',
        'Scoped styles with CSS Modules.',6,35,
        ['Import a .module.css file','Reference scoped classes with styles.className','Understand locally scoped class names'],
        [T('<strong>CSS Modules.</strong> CSS Modules scope class names to a single component by generating unique class names (like <code>card__a1b2</code>). This eliminates global class-name collisions without extra tooling.','react-l48','b1'),
         T('Import the module as <code>styles</code> and use <code>styles.card</code> instead of a plain string. The build tool rewrites it to the unique generated class.','react-l48','b2'),
         H('CSS Modules','react-l48','h1'),
         L(['<code>import styles from "./Card.module.css"</code>' + chr(9) + 'import the module.',
            '<code>&lt;div className={styles.card}&gt;</code>' + chr(9) + 'use the scoped class.',
            'Class names are unique per file, so collisions are impossible.'],'react-l48','l1'),
         C('import styles from "./Card.module.css"\n\nfunction Card() {\n  return <div className={styles.card}>Hi</div>\n}','javascript','CSS Modules','react-l48','c1'),
         TP('Use styles., not plain strings','With CSS Modules you must reference styles.card — a plain string "card" will not match the generated class.','react-l48','t1'),
         EX('react-l48',
            'Write a component that imports "./Card.module.css" as styles and renders <code>&lt;div className={styles.card}></code>.',
            {'javascript':'// your component here'},
            [{'id':'ex-react-l48-t1','label':'Import module as styles','body':'return /import styles/.test(code)'},
             {'id':'ex-react-l48-t2','label':'styles.card','body':'return /styles\.card/.test(code)'}],
            ['Use import styles from "./Card.module.css".','Render className={styles.card}.'],
            {'javascript':'import styles from "./Card.module.css"\n\nexport default function Card() {\n  return <div className={styles.card}>Hi</div>\n}'})])

def react_l49():
    return build_lesson('react-l49','CSS-in-JS and Sass',
        'Dynamic styles with CSS-in-JS and Sass.',6,35,
        ['Write dynamic styles with CSS-in-JS','Understand Sass features like variables and nesting','Compare runtime vs build-time styling'],
        [T('<strong>CSS-in-JS.</strong> Libraries like styled-components let you write CSS inside JavaScript, with full access to props for dynamic styling: <code>styled.button\`color: ${props => props.primary ? "blue" : "black"};\`</code>.','react-l49','b1'),
         T('<strong>Sass.</strong> A CSS preprocessor adding variables, nesting, and mixins. It is compiled to plain CSS at build time. <code>@import './variables.scss'</code> and <code>.card { padding: $space; }</code>.','react-l49','b2'),
         H('CSS-in-JS vs Sass','react-l49','h1'),
         L(['CSS-in-JS: dynamic, runtime, prop-driven, bundle cost.', 'Sass: static features, build-time, no runtime cost, variables/nesting.'],'react-l49','l1'),
         C('const Button = styled.button\`\n  color: ${props => props.primary ? "blue" : "black"};\n\`\n\n@import "./variables.scss";\n.card { padding: $space; }','javascript','CSS-in-JS and Sass','react-l49','c1'),
         TP('CSS-in-JS has a runtime cost','Styles are computed in the browser. For purely static styles, a .css file or Sass is lighter.','react-l49','t1'),
         EX('react-l49',
            'Write a styled button that turns blue when the primary prop is true.',
            {'javascript':'// your styled component here'},
            [{'id':'ex-react-l49-t1','label':'Interpolation in style','body':'return /\$\{/.test(code) || /primary/.test(code)'}],
            ['Use a styled-components style template literal.','Reference props.primary inside ${}.'],
            {'javascript':'const Button = styled.button\`color: ${props => props.primary ? "blue" : "black"};\`'})])

def react_l50():
    return build_lesson('react-l50','React Transitions',
        'Animating enter and leave transitions.',6,35,
        ['Animate components entering and leaving the DOM','Use transition classes or a library','Coordinate transitions with route changes'],
        [T('<strong>Transitions.</strong> When a component mounts or unmounts, you can animate its entry and exit instead of an instant appear/disappear. This makes the UI feel polished.','react-l50','b1'),
         T('React does not animate by itself. You pair CSS transition/animation classes with lifecycle moments (or a library like framer-motion) to add enter/exit motion.','react-l50','b2'),
         H('Enter/exit animation','react-l50','h1'),
         L(['Add a class when a component mounts, remove it after a frame to trigger a CSS transition.', 'Use key props so React unmounts/remounts items when lists change.', 'Coordinate with route changes so page switches feel smooth.'],'react-l50','l1'),
         C('.fade-enter { opacity: 0 }\n.fade-enter-active { opacity: 1; transition: opacity 300ms }\n.fade-exit { opacity: 1 }\n.fade-exit-active { opacity: 0; transition: opacity 300ms }','css','Transition classes','react-l50','c1'),
         TP('Keep animations respectful','Respect <code>prefers-reduced-motion</code> so users who dislike motion get an instant experience.','react-l50','t1'),
         EX('react-l50',
            'Write CSS that fades an element in over 300ms using opacity and transition.',
            {'css':'.fade-enter { opacity: 0 }\n.fade-enter-active { opacity: 1; transition: opacity 300ms }'},
            [{'id':'ex-react-l50-t1','label':'Uses opacity transition','body':'return /opacity/.test(code) && /transition/.test(code)'}],
            ['Set opacity: 0 on the enter state.','Add transition: opacity 300ms on the active state.'],
            {'css':'.fade-enter { opacity: 0 }\n.fade-enter-active { opacity: 1; transition: opacity 300ms }'}, langs=('css',))])

# =====================================================================
# SECTION 3: STATE  (react-l7, l8, l9 already built above)
# =====================================================================
# State section lessons: react-l7 (useState), react-l8 (useEffect), react-l9 (Rules)
# Already defined above. We'll reference them.

# =====================================================================
# SECTION 4: EVENTS & FORMS  (react-l10, l11, l12, l40, l41)
# =====================================================================
# events-forms lessons already defined above.

# =====================================================================
# SECTION 5: ADVANCED HOOKS  (react-l13..l16, l42..l45)
# =====================================================================
# advanced-hooks lessons already defined above.

# =====================================================================
# SECTION 6: ROUTING  (react-l17..l19, l46, l50)
# =====================================================================
# routing lessons already defined above.

# =====================================================================
# SECTION 7: PERFORMANCE  (react-l20..l22, l47..l49)
# =====================================================================
# performance lessons already defined above.

# =====================================================================
# SECTION 8: TESTING  (react-l23, l24, l25) - lightweight
# =====================================================================
def react_l23():
    return build_lesson('react-l23','Setting up Vitest and Testing Library',
        'Installing and configuring Vitest and React Testing Library.',5,30,
        ['Install Vitest and React Testing Library','Write a basic render-and-assert test','Run the test suite'],
        [T('<strong>Testing setup.</strong> Vitest is a fast test runner, and React Testing Library lets you render components and query the DOM the way a user would. Install both, configure a test environment (jsdom), and write your first render test.','react-l23','b1'),
         T('A basic test renders a component with <code>render</code>, finds elements with <code>screen.getByText</code> or <code>getByRole</code>, and asserts with <code>expect(...).toBeInTheDocument()</code>.','react-l23','b2'),
         H('First test','react-l23','h1'),
         L(['<code>render(<Button />)</code>' + chr(9) + 'mount the component.',
            '<code>screen.getByText("Submit")</code>' + chr(9) + 'find the element.',
            '<code>expect(...).toBeInTheDocument()</code>' + chr(9) + 'assert it exists.'],'react-l23','l1'),
         C('import { render, screen } from "@testing-library/react"\nimport { describe, it, expect } from "vitest"\n\ntest("renders a button", () => {\n  render(<button>Submit</button>)\n  expect(screen.getByText("Submit")).toBeInTheDocument()\n})','javascript','First test','react-l23','c1'),
         TP('Query like a user','Prefer role and text queries (getByRole, getByText) over class or id selectors — they match how real users find things.','react-l23','t1'),
         EX('react-l23',
            'Write a test that renders <code>&lt;button&gt;Submit&lt;/button&gt;</code> and asserts the button is in the document.',
            {'javascript':'import { render, screen } from "@testing-library/react"\nimport { it, expect } from "vitest"\n\n// your test here'},
            [{'id':'ex-react-l23-t1','label':'Uses render and screen','body':'return /render/.test(code) && /screen/.test(code)'}],
            ['Import render and screen from "@testing-library/react".','Use screen.getByText("Submit") and expect(...).toBeInTheDocument().'],
            {'javascript':'import { render, screen } from "@testing-library/react"\nimport { it, expect } from "vitest"\n\ntest("renders submit", () => {\n  render(<button>Submit</button>)\n  expect(screen.getByText("Submit")).toBeInTheDocument()\n}'})])

def react_l24():
    return build_lesson('react-l24','Testing user interactions',
        'Testing user interactions with fireEvent and user-event.',6,35,
        ['Simulate clicks and input with fireEvent','Assert state changes after user actions','Test form submission'],
        [T('<strong>Testing interactions.</strong> Use <code>fireEvent</code> (or <code>user-event</code>) to simulate clicks, typing, and form submissions, then assert the DOM updated as expected.','react-l24','b1'),
         T('After <code>fireEvent.click(screen.getByRole("button"))</code>, check that the expected text appeared or a function was called.','react-l24','b2'),
         H('Interaction flow','react-l24','h1'),
         L(['<code>fireEvent.click(screen.getByRole("button"))</code>' + chr(9) + 'simulate a click.',
            '<code>fireEvent.change(input, { target: { value: "a" } })</code>' + chr(9) + 'type into an input.',
            'Then assert the resulting DOM or state.'],'react-l24','l1'),
         C('import { render, screen, fireEvent } from "@testing-library/react"\n\nfireEvent.click(screen.getByRole("button", { name: /submit/i }))\nexpect(screen.getByText("Thanks!")).toBeInTheDocument()','javascript','Interaction test','react-l24','c1'),
         TP('Prefer user-event for complex flows','user-event simulates real user behavior more accurately than fireEvent for typing, tabbing, and clicking.','react-l24','t1'),
         EX('react-l24',
            'Write a test that clicks a button and asserts a "Thanks!" message appears.',
            {'javascript':'import { render, screen, fireEvent } from "@testing-library/react"\nimport { it, expect } from "vitest"\n\n// your test here'},
            [{'id':'ex-react-l24-t1','label':'Uses fireEvent.click','body':'return /fireEvent/.test(code) && /click/.test(code)'}],
            ['Import fireEvent from "@testing-library/react".','Click the submit button and assert the thanks message.'],
            {'javascript':'import { render, screen, fireEvent } from "@testing-library/react"\nimport { it, expect } from "vitest"\n\ntest("click shows thanks", () => {\n  render(<button onClick={() => { }} >Submit</button>)\n  fireEvent.click(screen.getByRole("button"))\n})'})])

def react_l25():
    return build_lesson('react-l25','Mocking modules and type safety',
        'Mocking modules and using types in tests.',6,35,
        ['Mock a module with vi.mock','Assert a mock was called','Explain type safety in tests'],
        [T('<strong>Mocking.</strong> Tests should not call real APIs. Use <code>vi.mock</code> to replace a module with a fake implementation, then assert your component calls it correctly.','react-l25','b1'),
         T('TypeScript in tests gives you autocomplete and catches mistakes in mock data and assertions, just like in application code.','react-l25','b2'),
         H('Mocking a module','react-l25','h1'),
         L(['<code>vi.mock("../api", () => ({ fetchUser: vi.fn() }))</code>' + chr(9) + 'mock the API module.',
            '<code>expect(fetchUser).toHaveBeenCalled()</code>' + chr(9) + 'assert it was called.',
            'Reset mocks between tests with <code>vi.clearAllMocks()</code>.'],'react-l25','l1'),
         C('import { vi } from "vitest"\nvi.mock("../api", () => ({ fetchUser: vi.fn() }))\n\n// ...\nexpect(fetchUser).toHaveBeenCalledWith(1)','javascript','Mocking a module','react-l25','c1'),
         TP('Mock at module boundaries','Mock the modules your component imports (API clients), not React itself.','react-l25','t1'),
         EX('react-l25',
            'Write a vi.mock call that mocks a module "../api" exporting a fetchUser function.',
            {'javascript':'import { vi } from "vitest"\n\n// your mock here'},
            [{'id':'ex-react-l25-t1','label':'vi.mock used','body':'return /vi\.mock/.test(code)'},
             {'id':'ex-react-l25-t2','label':'Mocks fetchUser','body':'return /fetchUser/.test(code)'}],
            ['Call vi.mock("../api", () => ({ fetchUser: vi.fn() })).','Return an object with fetchUser as a vi.fn().'],
            {'javascript':'import { vi } from "vitest"\nvi.mock("../api", () => ({ fetchUser: vi.fn() }))'})])

# =====================================================================
# SECTION 9: PROJECT  (react-l26..l30) - lightweight
# =====================================================================
def react_l26():
    return build_lesson('react-l26','Project scaffolding and routing',
        'Scaffolding the dashboard project and setting up routing.',7,40,
        ['Scaffold the dashboard project','Configure React Router routes','Create a shell layout with navigation'],
        [T('<strong>Project scaffolding.</strong> You will build a typed dashboard application. Start by scaffolding the Vite project, installing React Router, and creating a shell layout with a sidebar navigation and route outlets.','react-l26','b1'),
         T('The shell layout persists across routes: a sidebar with <code>Link</code> items and a main area that renders the current route component.','react-l26','b2'),
         H('Shell layout','react-l26','h1'),
         L(['<code>npm create vite@latest dashboard -- --template react-ts</code>' + chr(9) + 'scaffold.',
            'Install <code>react-router-dom</code>.',
            'Layout: <Sidebar /> + <Routes /> in <main />.'],'react-l26','l1'),
         C('<Layout>\n  <Sidebar />\n  <main>\n    <Routes>...</Routes>\n  </main>\n</Layout>','jsx','Dashboard shell','react-l26','c1'),
         TP('Keep the shell simple','The layout should only handle navigation and routing; page components own their own data and logic.','react-l26','t1'),
         EX('react-l26',
            'Write a shell layout component that renders a <code>&lt;nav&gt;</code> with links and a <code>&lt;main&gt;</code> with a Routes element.',
            {'javascript':'// your layout here'},
            [{'id':'ex-react-l26-t1','label':'Has nav and main','body':'return /nav/.test(code) && /main/.test(code)'}],
            ['Render a <nav> with Link items.','Render a <main> containing <Routes>.'],
            {'javascript':'function Layout() {\n  return (\n    <div>\n      <nav><Link to="/">Home</Link></nav>\n      <main><Routes /></main>\n    </div>\n  )\n}'})])

def react_l27():
    return build_lesson('react-l27','Typed state and context',
        'Typed state and context for the dashboard.',6,35,
        ['Type state with TypeScript interfaces','Provide typed state via Context','Consume typed context in components'],
        [T('<strong>Typed state and context.</strong> In the dashboard, define TypeScript interfaces for your data shapes (Task, User, Filter) and provide them through a typed Context so every component knows the shape of the state.','react-l27','b1'),
         T('Type the context value and the initial state. Components consuming the context get full autocomplete and type checking.','react-l27','b2'),
         H('Typed context','react-l27','h1'),
         L(['<code>interface Task { id: string; title: string; done: boolean }</code>' + chr(9) + 'data shape.',
            '<code>const TaskCtx = createContext<Task[] | undefined>(undefined)</code>' + chr(9) + 'typed context.',
            '<code>const tasks = useContext(TaskCtx)</code>' + chr(9) + 'typed consumption.'],'react-l27','l1'),
         C('interface Task { id: string; title: string; done: boolean }\nconst TaskCtx = createContext<Task[] | undefined>(undefined)','typescript','Typed context','react-l27','c1'),
         TP('Type the context value','Always type createContext<ValueType> so consumers are type-safe.','react-l27','t1'),
         EX('react-l27',
            'Write a TypeScript interface <code>Task</code> with id (string), title (string), and done (boolean).',
            {'typescript':'// your interface here'},
            [{'id':'ex-react-l27-t1','label':'Interface Task','body':'return /interface Task/.test(code)'},
             {'id':'ex-react-l27-t2','label':'Has id title done','body':'return /id/.test(code) && /title/.test(code) && /done/.test(code)'}],
            ['Declare interface Task with the three fields.','Give id type string, title string, done boolean.'],
            {'typescript':'interface Task {\n  id: string\n  title: string\n  done: boolean\n}'}, langs=('javascript',))])

def react_l28():
    return build_lesson('react-l28','Data fetching with types',
        'Fetching dashboard metrics with typed responses and loading states.',7,45,
        ['Write a typed fetchData function with generics','Handle loading, success, and error states','Cache responses with a typed Map'],
        [T('<strong>Data fetching.</strong> The dashboard fetches metrics from an API. Type the response with an interface, track <code>loading</code>, <code>data</code>, and <code>error</code> states, and cache responses so the same request is not refetched.','react-l28','b1'),
         T('Use a discriminated union or separate booleans for loading/error/success, and never render data before checking loading is false.','react-l28','b2'),
         H('Fetching flow','react-l28','h1'),
         L(['<code>interface Metrics { users: number; revenue: number }</code>' + chr(9) + 'type the response.',
            '<code>const [state, setState] = useState<{ loading: boolean; data?: Metrics; error?: string }>({ loading: true })</code>.',
            'Cache in a <code>Map<string, Metrics</code> keyed by URL.'],'react-l28','l1'),
         C('interface Metrics { users: number; revenue: number }\nconst [state, setState] = useState<{ loading: boolean; data?: Metrics }>({ loading: true })','typescript','Typed fetching','react-l28','c1'),
         TP('Handle the error state','Always render an error UI when fetch fails, not a blank screen.','react-l28','t1'),
         EX('react-l28',
            'Write a TypeScript interface Metrics with users (number) and revenue (number).',
            {'typescript':'// your interface here'},
            [{'id':'ex-react-l28-t1','label':'Interface Metrics','body':'return /interface Metrics/.test(code)'},
             {'id':'ex-react-l28-t2','label':'Fields users revenue','body':'return /users/.test(code) && /revenue/.test(code)'}],
            ['Declare interface Metrics.','Add users: number and revenue: number.'],
            {'typescript':'interface Metrics {\n  users: number\n  revenue: number\n}'}, langs=('javascript',))])

def react_l29():
    return build_lesson('react-l29','Charts and visual components',
        'Building charts and visual components for the dashboard.',7,40,
        ['Choose a charting approach','Render a visual component with data','Keep visual components pure and data-driven'],
        [T('<strong>Charts and visuals.</strong> Dashboards need charts. You can use a charting library or build lightweight SVG visuals. Keep visual components pure: they receive data as props and render it, with no side effects.','react-l29','b1'),
         T('A bar chart is just SVG <code>&lt;rect></code> elements positioned and sized from data. Pure visual components are easy to test and reuse.','react-l29','b2'),
         H('Visual component','react-l29','h1'),
         L(['Receive data as props (an array of values).', 'Render SVG elements based on those values.', 'Keep styling in CSS or inline styles, not in logic.'],'react-l29','l1'),
         C('<svg width="200" height="100">\n  {values.map((v, i) => (\n    <rect key={i} x={i * 40} y={100 - v} width="30" height={v} fill="blue" />\n  ))}\n</svg>','jsx','SVG bar chart','react-l29','c1'),
         TP('Pure visual components','A chart component should take data and return markup — no API calls or timers inside.','react-l29','t1'),
         EX('react-l29',
            'Write a pure function <code>BarChart({ values })</code> that returns an SVG with one <code>&lt;rect></code> per value.',
            {'javascript':'function BarChart({ values }) {\n  // your code here\n}'},
            [{'id':'ex-react-l29-t1','label':'Uses values prop','body':'return /values/.test(code)'}],
            ['Accept values as a prop.','Map values to rect elements.'],
            {'javascript':'function BarChart({ values }) {\n  return <svg>{values.map((v, i) => <rect key={i} height={v} />)}</svg>\n}'})])

def react_l30():
    return build_lesson('react-l30','Testing and deployment',
        'Testing the dashboard and deploying it.',5,30,
        ['Write tests for dashboard components','Build for production','Deploy to a static host'],
        [T('<strong>Testing and deployment.</strong> Write tests for the dashboard’s key flows (adding a task, toggling done), then build with <code>npm run build</code> and deploy the static output to a host like Vercel, Netlify, or GitHub Pages.','react-l30','b1'),
         T('The build produces a static <code>dist/</code> folder. Upload it to any static host — no server required.','react-l30','b2'),
         H('Deploy flow','react-l30','h1'),
         L(['<code>npm run test</code>' + chr(9) + 'run the test suite.',
            '<code>npm run build</code>' + chr(9) + 'produces dist/.',
            'Upload dist/ to your static host.'],'react-l30','l1'),
         C('npm run test\nnpm run build\n# deploy dist/ to your host','plaintext','Deploy flow','react-l30','c1'),
         TP('Test before deploying','Run the full test suite and fix failures before building and deploying.','react-l30','t1'),
         EX('react-l30',
            'Identify the command that builds a Vite project for production.',
            {'javascript':'// answer'},
            [{'id':'ex-react-l30-t1','label':'build command','body':'return /npm run build/.test(code)'}],
            ['npm run build creates the production output.','That is the build command.'],
            {'javascript':'npm run build'})])

# =====================================================================
# ASSEMBLE SECTIONS
# =====================================================================

home_lessons = [react_l1(), react_l2(), react_l3(), react_l35(), react_l36()]
components_lessons = [react_l4(), react_l5(), react_l6(), react_l37(), react_l38(), react_l39()]
state_lessons = [react_l7(), react_l8(), react_l9()]
events_lessons = [react_l10(), react_l11(), react_l12(), react_l40(), react_l41()]
hooks_lessons = [react_l13(), react_l14(), react_l15(), react_l16(), react_l42(), react_l43(), react_l44(), react_l45()]
routing_lessons = [react_l17(), react_l18(), react_l19(), react_l46(), react_l50()]
perf_lessons = [react_l20(), react_l21(), react_l22(), react_l47(), react_l48(), react_l49()]
testing_lessons = [react_l23(), react_l24(), react_l25()]
project_lessons = [react_l26(), react_l27(), react_l28(), react_l29(), react_l30()]

all_lessons = home_lessons + components_lessons + state_lessons + events_lessons + hooks_lessons + routing_lessons + perf_lessons + testing_lessons + project_lessons
print(f'Total React lessons: {len(all_lessons)}')

def q(sid, stitle, qs):
    return {'id':sid,'title':stitle,'passingScore':60,'questions':qs}

def MCQ(id, prompt, options, answer, explanation):
    return {'id':id,'type':'multiple-choice','prompt':prompt,'options':options,'answer':answer,'explanation':explanation}
def TF(id, prompt, answer, explanation):
    return {'id':id,'type':'true-false','prompt':prompt,'answer':answer,'explanation':explanation}
def BLANK(id, prompt, answers, explanation):
    return {'id':id,'type':'blank','prompt':prompt,'answers':answers,'explanation':explanation}

section_quizzes = {
    'react-s1': q('quiz-react-s1','React HOME check',[
        MCQ('quiz-react-s1-q1','What does React solves?',['It replaces the browser entirely','It keeps the DOM in sync with your data declaratively','It compiles TypeScript to JavaScript','It provides a backend'],1,'React keeps the DOM in sync with state declaratively.'),
        TF('quiz-react-s1-q2','JSX is required to use React.',False,'JSX is syntactic sugar, not a requirement.'),
        MCQ('quiz-react-s1-q3','Modern mount API?',['ReactDOM.render','createRoot','hydrateRoot','Both B and C'],3,'createRoot is the modern entry point.'),
        BLANK('quiz-react-s1-q4','What mounts a React app?',['createRoot'],'import { createRoot } from react-dom/client.')]),
    'react-s2': q('quiz-react-s2','Components check',[
        MCQ('quiz-react-s2-q1','Props flow which direction?',['child → parent','parent → child','both directions','neither'],1,'Props flow parent → child.'),
        TF('quiz-react-s2-q2','Props are read-only.',True,'A component never changes its own props.'),
        BLANK('quiz-react-s2-q2b','The prop for nested content is children.',['children'],'props.children holds wrapped content.')]),
    'react-s3': q('quiz-react-s3','State check',[
        MCQ('quiz-react-s3-q1','useState returns?',['a single value','a [value, setter] pair','an object','a promise'],1,'useState returns [state, setState].'),
        TF('quiz-react-s3-q3','Mutating state directly triggers a re-render.',False,'Always call the setter with a new value.')]),
    'react-s4': q('quiz-react-s4','Events & forms check',[
        MCQ('quiz-react-s4-q1','To stop a form reload, call?',['e.stop()','e.preventDefault()','e.stopPropagation()','return false'],1,'preventDefault stops the default submit.'),
        TF('quiz-react-s4-q2','onClick should be passed a function, not called.',True,'onClick={fn} passes; onClick={fn()} calls immediately.')]),
    'react-s5': q('quiz-react-s5','Advanced hooks check',[
        MCQ('quiz-react-s5-q1','useRef current persists?',['Yes, for the component lifetime','No, resets each render','Only during effects'],1,'useRef.current persists without re-rendering.'),
        TF('quiz-react-s5-q2','Custom hooks must start with "use".',True,'The "use" prefix identifies hooks to React.')]),
    'react-s6': q('quiz-react-s6','Routing check',[
        MCQ('quiz-react-s6-q1','Navigate without reload using?',['<a href>','<Link to>','window.location','history.push'],1,'<Link> updates the URL without reloading.'),
        TF('quiz-react-s6-q2','Lazy routes need a Suspense boundary.',True,'Suspense shows a fallback while lazy code loads.')]),
    'react-s7': q('quiz-react-s7','Performance check',[
        MCQ('quiz-react-s7-q1','React.memo does what?',['skips re-render when props unchanged','always re-renders','fetches data','styles components'],1,'React.memo skips re-render when props are shallowly equal.'),
        TF('quiz-react-s7-q2','Measure before optimizing.',True,'Profile with DevTools first.')]),
    'react-s8': q('quiz-react-s8','Testing check',[
        MCQ('quiz-react-s8-q1','Prevent page reload on submit?',['e.preventDefault()','e.stop()','return false','e.block()'],1,'preventDefault.'),
        TF('quiz-react-s8-q2','fireEvent simulates user interaction.',True,'fireEvent.click simulates a click.')]),
    'react-s9': q('quiz-react-s9','Project check',[
        BLANK('quiz-react-s9-q1','Build command for production?',['npm run build'],'npm run build creates dist/.'),
        TF('quiz-react-s9-q2','Test before deploying.',True,'Run tests first.')]),
}

def write_section_file(fname, sections_var_name, sections):
    content = "import type { Section } from '~/types/content'\n\n"
    for i, sec in enumerate(sections):
        content += f"export const {sections_var_name}_{i} = {repr(sec)}\n\n"
    content += f"export const {sections_var_name} = [\n"
    content += ",\n".join(f"    {sections_var_name}_{i}" for i in range(len(sections)))
    content += "\n]\n"
    (base/fname).write_text(content, encoding='utf-8')
    print(f'Wrote {fname} with {len(sections)} sections')

write_section_file('01-home.ts', 'reactHomeSections', [
    build_section('react-s1','React HOME','What React adds, how components work, and how to set up your first project.', home_lessons, section_quizzes['react-s1']),
])
write_section_file('02-components.ts', 'reactComponentsSections', [
    build_section('react-s2','Components','Reusable components, props, composition, children, lists, keys, JSX, and class components.', components_lessons, section_quizzes['react-s2']),
])
write_section_file('03-state.ts', 'reactStateSections', [
    build_section('react-s3','State','Local state with useState, side effects with useEffect, and the rules of hooks.', state_lessons, section_quizzes['react-s3']),
])
write_section_file('04-events-forms.ts', 'reactEventsFormsSections', [
    build_section('react-s4','Events & Forms','Event handling, controlled components, forms and validation, textarea/select, checkboxes and radios.', events_lessons, section_quizzes['react-s4']),
])
write_section_file('05-advanced-hooks.ts', 'reactAdvancedHooksSections', [
    build_section('react-s5','Advanced Hooks','useContext, useReducer, useMemo/useCallback, useRef, useTransition, forwardRef, custom hooks, and HOCs.', hooks_lessons, section_quizzes['react-s5']),
])
write_section_file('06-routing.ts', 'reactRoutingSections', [
    build_section('react-s6','Routing','React Router, URL parameters, nested routes, protected and lazy routes, portals, and transitions.', routing_lessons, section_quizzes['react-s6']),
])
write_section_file('07-performance.ts', 'reactPerformanceSections', [
    build_section('react-s7','Performance','Code splitting, memoization, measuring renders, and CSS approaches (CSS, Modules, CSS-in-JS, Sass).', perf_lessons, section_quizzes['react-s7']),
])
write_section_file('08-testing.ts', 'reactTestingSections', [
    build_section('react-s8','Testing','Vitest, React Testing Library, user interactions, mocking, and type safety.', testing_lessons, section_quizzes['react-s8']),
])
write_section_file('09-project.ts', 'reactProjectSections', [
    build_section('react-s9','Project','Scaffolding, typed state and context, data fetching, charts, and testing/deployment of the dashboard project.', project_lessons, section_quizzes['react-s9']),
])

print('All React section files written')
