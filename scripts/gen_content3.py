import pathlib, re

base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')

DESC = {
 'react-l1':'What React is, why it exists, and how the component model works.',
 'react-l2':'Scaffolding a Vite + React project and understanding the folder structure.',
 'react-l3':'Writing your first function component in JSX and rendering it to the page.',
 'react-l4':'Writing reusable function components and passing data with props.',
 'react-l5':'Composing components with the children prop and conditional rendering.',
 'react-l6':'Rendering arrays with .map() and assigning stable keys.',
 'react-l7':'Adding local state to a function component with useState.',
 'react-l8':'Running side effects after render with useEffect.',
 'react-l9':'Following the two rules of hooks to keep rendering predictable.',
 'react-l10':'Handling browser events with React synthetic events.',
 'react-l11':'Binding form inputs to state using the controlled component pattern.',
 'react-l12':'Handling form submission and validation.',
 'react-l13':'Sharing data through the tree with Context and useContext.',
 'react-l14':'Managing complex state with useReducer.',
 'react-l15':'Caching values and callbacks with useMemo and useCallback.',
 'react-l16':'Accessing DOM elements and storing mutable values with useRef.',
 'react-l17':'Setting up client-side routing with React Router.',
 'react-l18':'Reading URL parameters and nesting route layouts.',
 'react-l19':'Guarding routes and lazy-loading route components.',
 'react-l20':'Splitting code by route and showing a loading fallback with Suspense.',
 'react-l21':'Preventing unnecessary re-renders with React.memo.',
 'react-l22':'Profiling renders with React DevTools.',
 'react-l23':'Writing unit tests with React Testing Library.',
 'react-l24':'Writing integration tests for user flows.',
 'react-l25':'Running end-to-end tests.',
 'react-l29':'Building the React course project step by step.',
 'react-l35':'ES6 essentials for React: arrow functions, destructuring, spread, modules.',
 'react-l36':'Upgrading older class-component patterns to function components and hooks.',
 'react-l37':'Embedding expressions and setting attributes in JSX.',
 'react-l38':'Rendering different UI based on conditions.',
 'react-l39':'Writing legacy class components.',
 'react-l40':'Controlled textarea and select elements.',
 'react-l41':'Multiple inputs, checkboxes, and radio groups.',
 'react-l42':'Marking non-urgent updates with useTransition.',
 'react-l43':'Forwarding refs through custom components with forwardRef.',
 'react-l44':'Extracting reusable logic into custom hooks.',
 'react-l45':'Wrapping components with higher-order components.',
 'react-l46':'Rendering into a DOM node outside the tree with portals.',
 'react-l47':'Importing regular CSS into React components.',
 'react-l48':'Scoped styles with CSS Modules.',
 'react-l49':'Dynamic styles with CSS-in-JS and Sass.',
 'react-l50':'Animating enter and leave transitions.',
 'ts-l1':'What TypeScript is, the compile step, and the bugs it prevents.',
 'ts-l2':'Configuring tsconfig.json and running the compiler in watch mode.',
 'ts-l3':'Converting a .js file to .ts and adding your first type annotation.',
 'ts-l4':'Primitive types and TypeScript type inference.',
 'ts-l5':'Typed arrays, tuples, and readonly.',
 'ts-l6':'Object types, optional properties, and index signatures.',
 'ts-l7':'Union and intersection types with narrowing.',
 'ts-l8':'Function parameter and return types.',
 'ts-l9':'Function types, callbacks, and void.',
 'ts-l10':'Function overloads and typing this.',
 'ts-l11':'Interfaces versus type aliases.',
 'ts-l12':'Extending interfaces and declaration merging.',
 'ts-l13':'Implementing interfaces in classes.',
 'ts-l14':'Generic functions and type parameters.',
 'ts-l15':'Generic interfaces and classes.',
 'ts-l16':'Generic constraints and conditional types.',
 'ts-l17':'Partial, Required, and Readonly utility types.',
 'ts-l18':'Pick, Omit, and Record utility types.',
 'ts-l19':'Exclude, Extract, NonNullable, and ReturnType.',
 'ts-l20':'Discriminated unions and exhaustive matching.',
 'ts-l21':'Template literal types and key remapping.',
 'ts-l22':'The infer keyword in conditional types.',
 'ts-l23':'ES modules, path aliases, and module resolution.',
 'ts-l24':'Declaration files and ambient declarations.',
 'ts-l25':'Publishing a typed npm package.',
 'ts-l26':'The strict flag and the flags it enables.',
 'ts-l27':'Tuning strictness during migration.',
 'ts-l28':'Project references and incremental builds.',
 'ts-l29':'Setting up the typed task tracker project.',
 'ts-l30':'Building a type-safe reducer with discriminated actions.',
 'ts-l31':'Typed DOM and event handlers.',
 'ts-l32':'localStorage persistence with a JSON reviver.',
 'ts-l33':'Drag-and-drop and keyboard shortcuts.',
}

CODE = {
 'react-l1':"function Welcome() {\n  return <h1>Hello, world</h1>\n}\n// React keeps the DOM in sync with this JSX",
 'react-l2':"npm create vite@latest my-app -- --template react\ncd my-app\nnpm install\nnpm run dev",
 'react-l3':"function Welcome() {\n  return <h1>Hello, world</h1>\n}\nexport default Welcome",
 'react-l4':"function Card({ title, children }) {\n  return (\n    <div className='card'>\n      <h2>{title}</h2>\n      {children}\n    </div>\n  )\n}",
 'react-l5':"const logged = true\nreturn logged ? <p>Welcome back</p> : <p>Please sign in</p>",
 'react-l6':"items.map(item => <li key={item.id}>{item.name}</li>)",
 'react-l7':"const [count, setCount] = useState(0)\nreturn <button onClick={() => setCount(count + 1)}>{count}</button>",
 'react-l8':"useEffect(() => {\n  document.title = 'Count: ' + count\n  return () => { /* cleanup */ }\n}, [count])",
 'react-l9':"// ✅ top level only\nuseEffect(() => {})\n// ❌ never inside if / loops\nif (x) { useEffect(() => {}) }",
 'react-l10':"return <button onClick={handleClick}>Click me</button>",
 'react-l11':"const [value, setValue] = useState('')\nreturn <input value={value} onChange={e => setValue(e.target.value)} />",
 'react-l12':"function onSubmit(e) {\n  e.preventDefault()\n  console.log('submitted')\n}\nreturn <form onSubmit={onSubmit}>...</form>",
 'react-l13':"const Theme = createContext('light')\nreturn <Theme.Provider value='dark'>...</Theme.Provider>",
 'react-l14':"const [state, dispatch] = useReducer(reducer, initialState)",
 'react-l15':"const value = useMemo(() => compute(a, b), [a, b])",
 'react-l16':"const input = useRef(null)\nuseEffect(() => input.current.focus(), [])\nreturn <input ref={input} placeholder='Focus me' />",
 'react-l17':"<Routes><Route path='/' element={<Home />} /></Routes>",
 'react-l18':"const { id } = useParams()\n<Route path=':id' element={<Detail />} />",
 'react-l19':"if (!user) return <Navigate to='/login' />\nconst Page = lazy(() => import('./Page'))",
 'react-l20':"const Page = lazy(() => import('./Page'))\n<Suspense fallback={<p>Loading...</p>}><Page /></Suspense>",
 'react-l21':"export default React.memo(MyComponent)",
 'react-l22':"// React DevTools → Profiler → record interactions",
 'react-l23':"render(<Button />)\nscreen.getByText('Submit')",
 'react-l24':"fireEvent.click(screen.getByText('Submit'))",
 'react-l25':"cy.visit('/')\ncy.get('button').click()",
 'react-l29':"// scaffold → implement features → ship",
 'react-l35':"const names = ['Ada', 'Grace']\nconst [first, ...rest] = names",
 'react-l36':"class Welcome extends React.Component {\n  render() { return <h1>Hi</h1> }\n}",
 'react-l37':"const name = 'Ada'\nreturn <h1>Hello, {name}</h1>\nreturn <img src={url} className='avatar' />",
 'react-l38':"const logged = true\nreturn logged ? <p>Welcome back</p> : <p>Please sign in</p>",
 'react-l39':"class Welcome extends React.Component {\n  render() {\n    return <h1>Hello, {this.props.name}</h1>\n  }\n}",
 'react-l40':"const [text, setText] = useState('')\nreturn <textarea value={text} onChange={e => setText(e.target.value)} />",
 'react-l41':"const [checked, setChecked] = useState(false)\nreturn <input type='checkbox' checked={checked} onChange={e => setChecked(e.target.checked)} />",
 'react-l42':"const [isPending, startTransition] = useTransition()",
 'react-l43':"const Fwd = forwardRef((props, ref) => <input ref={ref} {...props} />)",
 'react-l44':"function useCounter() {\n  const [count, setCount] = useState(0)\n  return [count, () => setCount(c => c + 1)]\n}",
 'react-l45':"const withLog = Wrapped => props => <Wrapped {...props} />",
 'react-l46':"return createPortal(<div className='modal'>Hi</div>, document.getElementById('modal-root'))",
 'react-l47':"import './App.css'\nreturn <div className='card'>Hi</div>",
 'react-l48':"import styles from './Card.module.css'\nreturn <div className={styles.card}>Hi</div>",
 'react-l49':"const Button = styled.button`color: blue;`\n@import './variables.scss';",
 'react-l50':"// TransitionGroup / enter-leave animation",
 'ts-l1':"let name: string = 'Ada'\nlet age: number = 30\n// types are erased at runtime",
 'ts-l2':'{ "compilerOptions": { "target": "ES2022", "strict": true } }',
 'ts-l3':"let message: string = 'Hello'\nmessage = 42   // ❌ compile error",
 'ts-l4':"let name: string = 'Ada'\nlet active: boolean = true\nlet score = 100   // inferred as number",
 'ts-l5':"const ids: number[] = [1, 2]\nconst pair: [string, number] = ['Ada', 30]",
 'ts-l6':"type User = { name: string; age?: number }\ntype Map = { [key: string]: number }",
 'ts-l7':"type Status = 'idle' | 'loading' | 'done'\ntype A = { x: number } & { y: number }",
 'ts-l8':"function add(a: number, b: number): number { return a + b }",
 'ts-l9':"type Math = (a: number, b: number) => number\nconst f: Math = (a, b) => a + b",
 'ts-l10':"function make(x: string): string\nfunction make(x: number): number\nfunction make(x: any) { return x }",
 'ts-l11':"interface User { name: string }\ntype Alias = { name: string }",
 'ts-l12':"interface Admin extends User { role: string }\ninterface User { age: number }   // merging",
 'ts-l13':"class Employee implements User { name: string }",
 'ts-l14':"function wrap<T>(value: T): T { return value }\nwrap<string>('hi')",
 'ts-l15':"interface Box<T> { value: T }\nclass Store<T> { items: T[] = [] }",
 'ts-l16':"function logLength<T extends { length: number }>(item: T) {}\ntype IsString<T> = T extends string ? true : false",
 'ts-l17':"type P = Partial<User>\ntype R = Required<User>\ntype RO = Readonly<User>",
 'ts-l18':"type NameOnly = Pick<User, 'name'>\ntype NoAge = Omit<User, 'age'>\ntype Dict = Record<string, number>",
 'ts-l19':"type NoNull = NonNullable<string | null>\ntype R = ReturnType<typeof add>",
 'ts-l20':"type State = { kind: 'idle' } | { kind: 'load', data: string }\nswitch (s.kind) { case 'idle': ... default: never }",
 'ts-l21':"type Handler = `on${Capitalize<string>}`",
 'ts-l22':"type Param<T> = T extends (...args: infer A) => any ? A : never",
 'ts-l23':"import { foo } from './foo'\n// tsconfig baseUrl / paths",
 'ts-l24':"declare module 'foo' { const x: number }\n// foo.d.ts",
 'ts-l25':"{ \"name\": \"pkg\", \"types\": \"dist/index.d.ts\", \"exports\": { \".\": \"./dist/index.js\" } }",
 'ts-l26':"// strict enables noImplicitAny, strictNullChecks, etc.",
 'ts-l27':"// @ts-expect-error\n// disable one flag during migration",
 'ts-l28':"{ \"composite\": true, \"declaration\": true }",
 'ts-l29':"type Task = { id: string; title: string; done: boolean }",
 'ts-l30':"type Action = { type: 'add'; payload: Task } | { type: 'toggle'; id: string }",
 'ts-l31':"button.addEventListener('click', (e: Event) => {})\nconst form = e.target as HTMLFormElement",
 'ts-l32':"const raw = localStorage.getItem('tasks')\nconst tasks = JSON.parse(raw, reviver)",
 'ts-l33':"e.dataTransfer.setData('text/plain', id)\nwindow.addEventListener('keydown', ...)",
}

def fallback_code(lid, title):
    t = (lid + ' ' + title).lower()
    if 'what-react' in t: return CODE['react-l1']
    if 'get-started' in t or 'vite' in t: return CODE['react-l2']
    if 'first-component' in t: return CODE['react-l3']
    if 'es6' in t: return CODE['react-l35']
    if 'upgrade' in t: return CODE['react-l36']
    if 'jsx-intro' in t or 'expressions' in t or 'attributes' in t: return CODE['react-l37']
    if 'if-statements' in t or 'conditional' in t: return CODE['react-l38']
    if 'react-class' in t or ('class' in t and 'component' in t): return CODE['react-l39']
    if 'destructuring' in t: return "function User({ name, age = 0 }) {\n  return <p>{name} is {age}</p>\n}"
    if 'children' in t: return CODE['react-l5']
    if 'use-state' in t or 'usestate' in t: return CODE['react-l7']
    if 'use-effect' in t or 'useeffect' in t: return CODE['react-l8']
    if 'rules' in t: return CODE['react-l9']
    if 'custom-hooks' in t: return CODE['react-l44']
    if 'use-context' in t or 'context' in t: return CODE['react-l13']
    if 'use-reducer' in t or 'usereducer' in t: return CODE['react-l14']
    if 'use-memo' in t or 'usememo' in t: return CODE['react-l15']
    if 'use-callback' in t: return "const onSave = useCallback((id) => save(id), [save])"
    if 'use-ref' in t or 'useref' in t: return CODE['react-l16']
    if 'forward-ref' in t: return CODE['react-l43']
    if 'hoc' in t or 'higher' in t: return CODE['react-l45']
    if 'event' in t: return CODE['react-l10']
    if 'controlled' in t: return CODE['react-l11']
    if 'forms' in t or 'submit' in t: return CODE['react-l12']
    if 'textarea' in t: return CODE['react-l40']
    if 'select' in t: return "const [lang, setLang] = useState('js')\nreturn <select value={lang} onChange={e => setLang(e.target.value)}><option>JS</option></select>"
    if 'multiple' in t or 'inputs' in t: return "const [form, setForm] = useState({ name: '', email: '' })\nfunction onChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }"
    if 'checkbox' in t: return CODE['react-l41']
    if 'radio' in t: return "const [theme, setTheme] = useState('light')\nreturn <input type='radio' value='dark' checked={theme==='dark'} />"
    if 'lists' in t: return CODE['react-l6']
    if 'portal' in t: return CODE['react-l46']
    if 'suspense' in t: return CODE['react-l20']
    if 'transition' in t: return CODE['react-l50']
    if 'router' in t or 'route' in t: return CODE['react-l17']
    if 'parameter' in t or 'nested' in t: return CODE['react-l18']
    if 'protected' in t or 'lazy' in t: return CODE['react-l19']
    if 'code-splitting' in t: return CODE['react-l20']
    if 'memoization' in t: return CODE['react-l21']
    if 'measuring' in t: return CODE['react-l22']
    if 'css-styling' in t: return CODE['react-l47']
    if 'css-modules' in t: return CODE['react-l48']
    if 'css-in-js' in t: return CODE['react-l49']
    if 'sass' in t: return "@import './variables.scss';\n.card { padding: 1rem; }"
    if 'testing' in t or 'test' in t: return CODE['react-l23']
    if 'project' in t: return CODE['react-l29']
    if 'simple' in t or 'primitive' in t: return CODE['ts-l4']
    if 'explicit' in t or 'inference' in t: return CODE['ts-l4']
    if 'special' in t: return "let anything: any\nlet nil: null | undefined"
    if 'arrays' in t: return CODE['ts-l5']
    if 'tuples' in t: return CODE['ts-l5']
    if 'object' in t and 'type' in t: return CODE['ts-l6']
    if 'enum' in t: return CODE['ts-l6']
    if 'alias' in t or 'interface' in t: return CODE['ts-l11']
    if 'union' in t: return CODE['ts-l7']
    if 'function' in t: return CODE['ts-l8']
    if 'cast' in t: return CODE['ts-l8']
    if 'class' in t: return CODE['ts-l13']
    if 'generic' in t: return CODE['ts-l14']
    if 'utility' in t: return CODE['ts-l17']
    if 'keyof' in t: return "type K = keyof User"
    if 'null' in t: return CODE['ts-l4']
    if 'definitely' in t: return "npm install -D @types/lodash"
    if 'ts-5' in t or '5 updates' in t: return CODE['ts-l1']
    if 'configuration' in t or 'tsconfig' in t: return CODE['ts-l2']
    if 'node' in t: return CODE['ts-l28']
    if 'with-react' in t: return "function App() { return <div>Hello</div> }"
    if 'tooling' in t: return "tsc --noEmit"
    if 'advanced' in t or 'mapped' in t: return CODE['ts-l21']
    if 'guard' in t: return "function isString(x: unknown): x is string { return typeof x === 'string' }"
    if 'conditional' in t: return CODE['ts-l16']
    if 'literal' in t: return "type Direction = 'north' | 'south'"
    if 'namespace' in t: return "namespace Utils { export function add(a: number, b: number) {} }"
    if 'index' in t and 'signature' in t: return CODE['ts-l6']
    if 'merging' in t: return CODE['ts-l12']
    if 'async' in t: return CODE['ts-l32']
    if 'decorator' in t: return "@readonly\nmethod() {}"
    if 'js-project' in t: return "// checkJs: true in tsconfig"
    if 'migration' in t: return "rename .js → .ts"
    if 'error' in t and 'handling' in t: return "try { risky() } catch (e) { console.error(e) }"
    if 'best' in t or 'practice' in t: return "prefer type over interface; avoid any"
    if 'frontend-project' in t: return "// build the project step by step"
    return None

def esc(s):
    return s.replace("'", "\\'").replace("\n", "\\n")

LIST_ITEMS = {
 'react-l1':['UI described declaratively with JSX','Components are reusable, composable functions','React re-renders only when state changes'],
 'react-l2':['Vite scaffolds a dev server and bundler','src holds components and assets','npm run dev starts the dev server'],
 'react-l3':['A component returns JSX','createRoot mounts the app to the DOM','JSX looks like HTML but is JavaScript'],
 'react-l4':['Props flow from parent to child','Destructure props in the signature','Default values with age = 0'],
 'react-l5':['children renders nested content','Ternary for either/or UI','&& for optional presence'],
 'react-l6':['.map() turns arrays into JSX','key must be stable and unique','Avoid index as key'],
 'react-l7':['useState returns [value, setter]','Never mutate state directly','Functional updater setCount(c => c + 1)'],
 'react-l8':['Effect runs after render','Dependency array controls re-runs','Cleanup function for subscriptions'],
 'react-l9':['Hooks only at top level','Only from React functions/custom hooks','Never inside if or loops'],
 'react-l10':['Synthetic events wrap native events','camelCase names: onClick, onChange','Read event.target.value'],
 'react-l11':['value tied to state','onChange updates state','Controlled input is the source of truth'],
 'react-l12':['preventDefault stops page reload','Validate before submitting','Show field-level feedback'],
 'react-l13':['createContext makes a context','Provider supplies the value','useContext reads it in descendants'],
 'react-l14':['Reducer takes (state, action)','dispatch sends actions','Use for complex, related state'],
 'react-l15':['useMemo caches expensive values','useCallback caches functions','Dependency array triggers recompute'],
 'react-l16':['useRef returns { current }','Attach ref to DOM element','Persists across renders without re-rendering'],
 'react-l17':['BrowserRouter wraps the app','Routes/Route define paths','Link navigates without reload'],
 'react-l18':['useParams reads URL segments','Nested routes share layouts','Outlet renders child routes'],
 'react-l19':['Redirect unauthenticated users','React.lazy code-splits routes','Suspense shows loading fallback'],
 'react-l20':['React.lazy imports a component','Suspense wraps lazy content','Fallback displays while loading'],
 'react-l21':['React.memo skips identical props','Props must be stable','Combine with useCallback'],
 'react-l22':['DevTools Profiler records renders','Highlight re-render causes','why-did-you-render for deep inspection'],
 'react-l23':['render() mounts the component','screen queries by text/role','fireEvent simulates user input'],
 'react-l24':['Test full user flows','Assert final DOM state','Mock API boundaries'],
 'react-l25':['cy.visit loads the page','cy.get selects elements','Assertions confirm behavior'],
 'react-l29':['Scaffold the project','Implement features iteratively','Ship a working dashboard'],
 'react-l35':['Arrow functions capture this','Destructuring pulls out values','Spread copies immutably'],
 'react-l36':['this.state → useState','componentDidMount → useEffect','Class → function component'],
 'react-l37':['{ } embeds expressions','className not class','Spread props onto elements'],
 'react-l38':['if outside JSX','ternary inside JSX','&& for simple checks'],
 'react-l39':['render() returns JSX','this.state and this.setState','Lifecycle methods'],
 'react-l40':['textarea uses value/onChange','select uses value/onChange','Multi-select uses an array'],
 'react-l41':['Checkbox is boolean state','Radio is mutually exclusive','Multiple inputs via name attributes'],
 'react-l42':['startTransition marks non-urgent','isPending shows loading state','UI stays responsive'],
 'react-l43':['forwardRef receives ref','Forward to DOM element','Type with React.Ref'],
 'react-l44':['Hook names start with use','Compose built-in hooks','Return state and functions'],
 'react-l45':['HOC takes and returns a component','Hooks preferred over HOCs','Pass props through'],
 'react-l46':['createPortal renders elsewhere','Use for modals and tooltips','Manage focus across boundary'],
 'react-l47':['Import .css in components','Class names map to JSX','Dynamic via inline style objects'],
 'react-l48':['.module.css scopes classes','Unique generated class names',':global escapes scoping'],
 'react-l49':['styled-components interpolates props','Sass compiled at build time','Compare runtime vs build-time'],
 'react-l50':['TransitionGroup animates lists','Track enter/appear/leave','Combine with route changes'],
 'ts-l1':['Static types catch bugs early','Compiles to plain JavaScript','No runtime overhead'],
 'ts-l2':['tsconfig.json configures the compiler','tsc -w watches for changes','Read errors and jump to lines'],
 'ts-l3':['Rename .js to .ts','Add type annotations','Distinguish compile vs runtime errors'],
 'ts-l4':['string, number, boolean','null, undefined, symbol','Inference works with initial values'],
 'ts-l5':['string[] and Array<string>','[string, number] fixed tuples','readonly prevents mutation'],
 'ts-l6':['Inline object types','? marks optional properties','Index signatures for dynamic keys'],
 'ts-l7':['| builds union types','& builds intersections','typeof narrows unions'],
 'ts-l8':['Annotate parameters and return','Optional parameters with ?','Rest parameters as arrays'],
 'ts-l9':['Function type expression','Callback parameter types','void means return ignored'],
 'ts-l10':['Multiple call signatures','Implementation is last','Different arities per overload'],
 'ts-l11':['Interfaces support declaration merging','Types support unions and primitives','Choose by use case'],
 'ts-l12':['extends builds on a parent','Same-named interfaces merge','implements catches missing members'],
 'ts-l13':['class implements Interface','Structural typing matches shapes','implements is optional but safe'],
 'ts-l14':['Angle-bracket type parameters','extends constrains types','Inference at call sites'],
 'ts-l15':['Box<T> generic interfaces','Default type parameters','Generic classes'],
 'ts-l16':['Constrain T with extends','T extends U ? X : Y conditional','Distribution over unions'],
 'ts-l17':['Partial makes all optional','Required removes optionality','Readonly freezes shapes'],
 'ts-l18':['Pick keeps selected keys','Omit removes selected keys','Record maps keys to values'],
 'ts-l19':['Exclude filters unions','Extract picks matching','NonNullable strips null/undefined'],
 'ts-l20':['Shared literal discriminant','switch narrows each variant','default: never enforces exhaustiveness'],
 'ts-l21':['`on${Capitalize<string>}` templates','as remaps mapped keys','Generate handler names'],
 'ts-l22':['infer captures type parameters','Reimplement ReturnType','Extract array element types'],
 'ts-l23':['import/export with ESM','moduleResolution node16','Path aliases with baseUrl'],
 'ts-l24':['.d.ts files hold types only','declare module augments packages','declaration: true emits types'],
 'ts-l25':['types and exports fields','attw verifies published types','tsc --noEmit for checking'],
 'ts-l26':['strict enables 7 flags','noImplicitAny requires annotations','strictNullChecks separates null'],
 'ts-l27':['Disable flags during migration','// @ts-expect-error suppresses','Enable flags incrementally'],
 'ts-l28':['composite for project references','--build mode for incremental','Shared type packages'],
 'ts-l29':['Define Task, Filter, Priority','Configure strict tsconfig','Set up path aliases'],
 'ts-l30':['Discriminated union actions','Reducer narrows on action.type','ReturnType<typeof reducer> for state'],
 'ts-l31':['Type querySelector results','Correct form event types','Event delegation on lists'],
 'ts-l32':['JSON reviver revives Dates','Save/load typed state','No mutation of stored state'],
 'ts-l33':['DataTransfer.setData for drag','keydown for shortcuts','ARIA for accessibility'],
}

def build_blocks(lid, title):
    desc = DESC.get(lid, 'This lesson covers the key concepts with practical examples.')
    items = LIST_ITEMS.get(lid, ['Core idea explained in plain terms', 'Common pattern and when to use it', 'Pitfall to avoid'])
    items_js = "[\n            " + ",\n            ".join("'" + esc(i) + "'" for i in items) + "\n          ]"
    blocks = []
    blocks.append("        {\n          type: 'text',\n          id: '" + lid + "-intro',\n          body: '<strong>" + esc(title) + ".</strong> " + esc(desc) + "'\n        }")
    blocks.append("        {\n          type: 'heading',\n          id: '" + lid + "-h1',\n          level: 3,\n          body: 'Key concepts'\n        }")
    blocks.append("        {\n          type: 'list',\n          id: '" + lid + "-list',\n          style: 'bullet',\n          items: " + items_js + "\n        }")
    code = CODE.get(lid) or fallback_code(lid, title)
    if code:
        blocks.append("        {\n          type: 'code',\n          id: '" + lid + "-code',\n          language: 'javascript',\n          title: 'Example',\n          code: " + repr(code) + "\n        }")
    blocks.append("        {\n          type: 'tip',\n          id: '" + lid + "-tip',\n          title: 'Tip',\n          body: 'Edit the example above and watch the preview update.'\n        }")
    return "content: [\n" + ",\n".join(blocks) + "\n      ],"

def process_file(path):
    s = path.read_text(encoding='utf-8')
    pat = re.compile(r"(id: '([a-z]+-l\d+)'[\s\S]*?title: '[^']*'[\s\S]*?objectives: \[[\s\S]*?\],[\s\S]*?xp: \d+,[\s\S]*?)content: \[[\s\S]*?\]")
    def repl(m):
        prefix = m.group(1)
        lid = m.group(2)
        titlem = re.search(r"title: '([^']+)'", prefix)
        title = titlem.group(1) if titlem else lid
        return prefix + build_blocks(lid, title)
    s2, n = pat.subn(repl, s)
    if n:
        path.write_text(s2, encoding='utf-8')
    return n

files = []
for d in ['react','ts','frontend-projects']:
    dd = base / d
    if dd.exists():
        files += list(dd.rglob('*.ts'))
files += [base/'react.ts', base/'typescript-fundamentals.ts', base/'frontend-projects-course.ts']

total = 0
for f in files:
    total += process_file(f)
print('lessons enriched:', total)
