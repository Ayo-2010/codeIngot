import pathlib, re

base = pathlib.Path(r'C:/Users/User/Desktop/LEARN/codeIngot/app/content/courses')

DESC = {
 'react-l1':'This lesson explains what React is, the problems it solves, and how components and JSX fit together.',
 'react-l2':'Scaffold a Vite + React project and explore the folder structure.',
 'react-l3':'Write your first function component in JSX and render it to the page.',
 'react-l4':'Write reusable function components and pass data through props.',
 'react-l5':'Compose components using the children prop and conditional rendering.',
 'react-l6':'Render arrays with .map() and assign stable keys.',
 'react-l7':'Add local state to a function component with useState.',
 'react-l8':'Run side effects after render with useEffect.',
 'react-l9':'Follow the two rules of hooks to keep rendering predictable.',
 'react-l10':'Handle browser events with React synthetic events.',
 'react-l11':'Bind form inputs to state using the controlled component pattern.',
 'react-l12':'Handle form submission and validate input.',
 'react-l13':'Share data through the tree with Context and useContext.',
 'react-l14':'Manage complex state with useReducer.',
 'react-l15':'Cache values and callbacks with useMemo and useCallback.',
 'react-l16':'Access DOM elements and store mutable values with useRef.',
 'react-l17':'Set up client-side routing with React Router.',
 'react-l18':'Read URL params and nest route layouts.',
 'react-l19':'Guard routes and lazy-load route components.',
 'react-l20':'Split code by route and show a loading fallback with Suspense.',
 'react-l21':'Prevent unnecessary re-renders with React.memo.',
 'react-l22':'Profile renders with React DevTools.',
 'react-l23':'Write unit tests with React Testing Library.',
 'react-l24':'Write integration tests for user flows.',
 'react-l25':'Run end-to-end tests.',
 'react-l29':'Build the course project step by step.',
 'react-l35':'ES6 essentials for React.',
 'react-l36':'Upgrade older React patterns to hooks.',
 'react-l37':'Embed expressions and set attributes in JSX.',
 'react-l38':'Render different UI based on conditions.',
 'react-l39':'Write legacy class components.',
 'react-l40':'Controlled textarea and select elements.',
 'react-l41':'Multiple inputs, checkboxes, and radio groups.',
 'react-l42':'Mark non-urgent updates with useTransition.',
 'react-l43':'Forward refs through custom components.',
 'react-l44':'Extract reusable logic into custom hooks.',
 'react-l45':'Wrap components with higher-order components.',
 'react-l46':'Render into a DOM node outside the tree with portals.',
 'react-l47':'Import regular CSS into components.',
 'react-l48':'Scoped styles with CSS Modules.',
 'react-l49':'Dynamic styles with CSS-in-JS and Sass.',
 'react-l50':'Animate enter/leave transitions.',
 'ts-l1':'What TypeScript is and the compile step that catches bugs early.',
 'ts-l2':'Configure tsconfig and run the compiler in watch mode.',
 'ts-l3':'Convert a JavaScript file to TypeScript and add your first annotation.',
 'ts-l4':'Primitive types and when TypeScript infers them.',
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
 'ts-l26':'The strict flag and what it enables.',
 'ts-l27':'Tuning strictness during migration.',
 'ts-l28':'Project references and incremental builds.',
 'ts-l29':'Set up the typed task tracker project.',
 'ts-l30':'Build a type-safe reducer with discriminated actions.',
 'ts-l31':'Typed DOM and event handlers.',
 'ts-l32':'localStorage persistence with a JSON reviver.',
 'ts-l33':'Drag-and-drop and keyboard shortcuts.',
}

CODE = {
 'react-l1':"React lets you build UIs from composable components.\nfunction Welcome() {\n  return <h1>Hello, world</h1>\n}",
 'react-l2':"npm create vite@latest my-app -- --template react\ncd my-app\nnpm install\nnpm run dev",
 'react-l3':"function Welcome() {\n  return <h1>Hello, world</h1>\n}\nexport default Welcome",
 'react-l4':"function Card({ title, children }) {\n  return <div className='card'>{children}</div>\n}",
 'react-l5':"const logged = true\nreturn logged ? <p>Welcome back</p> : <p>Please sign in</p>",
 'react-l6':"items.map(item => <li key={item.id}>{item.name}</li>)",
 'react-l7':"const [count, setCount] = useState(0)\nreturn <button onClick={() => setCount(count + 1)}>{count}</button>",
 'react-l8':"useEffect(() => {\n  document.title = count\n  return () => { }\n}, [count])",
 'react-l9':"// ✅ top level only\nuseEffect(() => {})\n// ❌ never inside if\nif (x) { useEffect(() => {}) }",
 'react-l10':"return <button onClick={handleClick}>Click</button>",
 'react-l11':"const [value, setValue] = useState('')\nreturn <input value={value} onChange={e => setValue(e.target.value)} />",
 'react-l12':"function onSubmit(e) { e.preventDefault() }\nreturn <form onSubmit={onSubmit}>...</form>",
 'react-l13':"const Theme = createContext('light')\nreturn <Theme.Provider value='dark'>...</Theme.Provider>",
 'react-l14':"const [state, dispatch] = useReducer(reducer, initialState)",
 'react-l15':"const value = useMemo(() => compute(a, b), [a, b])",
 'react-l16':"const input = useRef(null)\nuseEffect(() => input.current.focus(), [])\nreturn <input ref={input} />",
 'react-l17':"<Routes><Route path='/' element={<Home />} /></Routes>",
 'react-l18':"const { id } = useParams()\n<Route path=':id' element={<Detail />} />",
 'react-l19':"if (!user) return <Navigate to='/login' />\nconst Page = lazy(() => import('./Page'))",
 'react-l20':"const Page = lazy(() => import('./Page'))\n<Suspense fallback={<p>Loading...</p>}><Page /></Suspense>",
 'react-l21':"export default React.memo(MyComponent)",
 'react-l22':"// React DevTools Profiler\n// why-did-you-render",
 'react-l23':"render(<Button />)\nscreen.getByText('Submit')",
 'react-l24':"fireEvent.click(screen.getByText('Submit'))",
 'react-l25':"cy.visit('/')\ncy.get('button').click()",
 'react-l29':"// scaffold, implement features, and ship",
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
 'react-l50':"// animate enter/leave with Transition",
 'ts-l1':"let name: string = 'Ada'\nlet age: number = 30\n// compiled away at runtime",
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
 'ts-l21':"type Handler = `on${Capitalize<string>}`\ntype Mapped = { [K in keyof T] as `get${Capitalize<string & K>}`: T[K] }",
 'ts-l22':"type Param<T> = T extends (...args: infer A) => any ? A : never",
 'ts-l23':"import { foo } from './foo'\n// tsconfig: baseUrl, paths",
 'ts-l24':"declare module 'foo' { const x: number; export = x }\n// foo.d.ts",
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

def code_for(lid, title):
    if lid in CODE:
        return CODE[lid]
    t = (lid + ' ' + title).lower()
    if 'what-react' in t:
        return CODE['react-l1']
    if 'get-started' in t or 'vite' in t:
        return CODE['react-l2']
    if 'first-component' in t:
        return CODE['react-l3']
    if 'es6' in t:
        return CODE['react-l35']
    if 'upgrade' in t:
        return CODE['react-l36']
    if 'jsx-intro' in t or 'expressions' in t or 'attributes' in t:
        return CODE['react-l37']
    if 'if-statements' in t or 'conditional' in t:
        return CODE['react-l38']
    if 'react-class' in t or ('class' in t and 'component' in t):
        return CODE['react-l39']
    if 'destructuring' in t:
        return "function User({ name, age = 0 }) {\n  return <p>{name} is {age}</p>\n}"
    if 'children' in t:
        return CODE['react-l5']
    if 'use-state' in t or 'usestate' in t:
        return CODE['react-l7']
    if 'use-effect' in t or 'useeffect' in t:
        return CODE['react-l8']
    if 'rules' in t:
        return CODE['react-l9']
    if 'custom-hooks' in t:
        return CODE['react-l44']
    if 'use-context' in t or 'context' in t:
        return CODE['react-l13']
    if 'use-reducer' in t or 'usereducer' in t:
        return CODE['react-l14']
    if 'use-memo' in t or 'usememo' in t:
        return CODE['react-l15']
    if 'use-callback' in t:
        return "const onSave = useCallback((id) => save(id), [save])"
    if 'use-ref' in t or 'useref' in t:
        return CODE['react-l16']
    if 'forward-ref' in t:
        return CODE['react-l43']
    if 'hoc' in t or 'higher' in t:
        return CODE['react-l45']
    if 'event' in t:
        return CODE['react-l10']
    if 'controlled' in t:
        return CODE['react-l11']
    if 'forms' in t or 'submit' in t:
        return CODE['react-l12']
    if 'textarea' in t:
        return CODE['react-l40']
    if 'select' in t:
        return "const [lang, setLang] = useState('js')\nreturn <select value={lang} onChange={e => setLang(e.target.value)}><option value='js'>JS</option></select>"
    if 'multiple' in t or 'inputs' in t:
        return "const [form, setForm] = useState({ name: '', email: '' })\nfunction onChange(e) { setForm({ ...form, [e.target.name]: e.target.value }) }"
    if 'checkbox' in t:
        return CODE['react-l41']
    if 'radio' in t:
        return "const [theme, setTheme] = useState('light')\nreturn <input type='radio' value='dark' checked={theme==='dark'} onChange={e => setTheme(e.target.value)} />"
    if 'lists' in t:
        return CODE['react-l6']
    if 'portal' in t:
        return CODE['react-l46']
    if 'suspense' in t:
        return CODE['react-l20']
    if 'transition' in t:
        return CODE['react-l50']
    if 'router' in t or 'route' in t:
        return CODE['react-l17']
    if 'parameter' in t or 'nested' in t:
        return CODE['react-l18']
    if 'protected' in t or 'lazy' in t:
        return CODE['react-l19']
    if 'code-splitting' in t:
        return CODE['react-l20']
    if 'memoization' in t:
        return CODE['react-l21']
    if 'measuring' in t:
        return CODE['react-l22']
    if 'css-styling' in t:
        return CODE['react-l47']
    if 'css-modules' in t:
        return CODE['react-l48']
    if 'css-in-js' in t:
        return CODE['react-l49']
    if 'sass' in t:
        return "@import './variables.scss';\n.card { padding: 1rem; }"
    if 'testing' in t or 'test' in t:
        return CODE['react-l23']
    if 'project' in t:
        return CODE['react-l29']
    # TS fallbacks by keyword
    if 'simple' in t or 'primitive' in t:
        return CODE['ts-l4']
    if 'explicit' in t or 'inference' in t:
        return CODE['ts-l4']
    if 'special' in t:
        return "let anything: any\nlet nil: null | undefined"
    if 'arrays' in t:
        return CODE['ts-l5']
    if 'tuples' in t:
        return CODE['ts-l5']
    if 'object' in t and 'type' in t:
        return CODE['ts-l6']
    if 'enum' in t:
        return CODE['ts-l6']
    if 'alias' in t or 'interface' in t:
        return CODE['ts-l11']
    if 'union' in t:
        return CODE['ts-l7']
    if 'function' in t:
        return CODE['ts-l8']
    if 'cast' in t:
        return CODE['ts-l8']
    if 'class' in t:
        return CODE['ts-l13']
    if 'generic' in t:
        return CODE['ts-l14']
    if 'utility' in t:
        return CODE['ts-l17']
    if 'keyof' in t:
        return "type K = keyof User"
    if 'null' in t:
        return CODE['ts-l4']
    if 'definitely' in t:
        return "npm install -D @types/lodash"
    if 'ts-5' in t or '5 updates' in t:
        return CODE['ts-l1']
    if 'configuration' in t or 'tsconfig' in t:
        return CODE['ts-l2']
    if 'node' in t:
        return CODE['ts-l28']
    if 'with-react' in t:
        return "function App() { return <div>Hello</div> }"
    if 'tooling' in t:
        return "tsc --noEmit"
    if 'advanced' in t or 'mapped' in t:
        return CODE['ts-l21']
    if 'guard' in t:
        return "function isString(x: unknown): x is string { return typeof x === 'string' }"
    if 'conditional' in t:
        return CODE['ts-l16']
    if 'literal' in t:
        return "type Direction = 'north' | 'south'"
    if 'namespace' in t:
        return "namespace Utils { export function add(a: number, b: number) {} }"
    if 'index' in t and 'signature' in t:
        return CODE['ts-l6']
    if 'merging' in t:
        return CODE['ts-l12']
    if 'async' in t:
        return CODE['ts-l32']
    if 'decorator' in t:
        return "@readonly\nmethod() {}"
    if 'js-project' in t:
        return "// checkJs: true in tsconfig"
    if 'migration' in t:
        return "rename .js → .ts"
    if 'error' in t and 'handling' in t:
        return "try { risky() } catch (e) { console.error(e) }"
    if 'best' in t or 'practice' in t:
        return "prefer type over interface; avoid any"
    if 'frontend-project' in t:
        return "// build the project step by step"
    return None

files = []
for d in ['react','ts','frontend-projects']:
    dd = base / d
    if dd.exists():
        files += list(dd.rglob('*.ts'))
files += [base/'react.ts', base/'typescript-fundamentals.ts', base/'frontend-projects-course.ts']

pat = re.compile(r"(id: '([a-z]+-l\d+)'[\s\S]*?title: '[^']+'[\s\S]*?objectives: \[[\s\S]*?\],[\s\S]*?xp: \d+,[\s\S]*?content: \[[\s\S]*?\])")

total_files = 0
total_lessons = 0
for f in files:
    s = f.read_text(encoding='utf-8')
    def fill(m):
        global total_lessons
        full = m.group(0)
        lidm = re.search(r"id: '([^']+)'", full)
        titlem = re.search(r"title: '([^']+)'", full)
        lid = lidm.group(1) if lidm else 'lesson'
        title = titlem.group(1) if titlem else lid
        desc = DESC.get(lid, 'This lesson covers the key concepts with practical examples you can run and modify.')
        blocks = []
        blocks.append("          { type: 'text', id: '" + lid + "-intro', body: '<strong>" + title.replace("'", "\\'") + ".</strong> " + desc.replace("'", "\\'") + "' }")
        code = code_for(lid, title)
        if code:
            blocks.append("          { type: 'code', id: '" + lid + "-code', language: 'javascript', title: 'Example', code: " + repr(code) + " }")
        blocks.append("          { type: 'tip', id: '" + lid + "-tip', title: 'Tip', body: 'Edit the example and watch the preview update.' }")
        newcontent = "content: [\n" + ",\n".join(blocks) + "\n        ]"
        total_lessons += 1
        return full[:full.index('content:')] + newcontent
    s3, n = pat.subn(fill, s)
    if n:
        f.write_text(s3, encoding='utf-8')
        total_files += 1
print('files touched:', total_files, 'lessons filled:', total_lessons)
