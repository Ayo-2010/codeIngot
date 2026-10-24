import type { Section } from '~/types/content'

export const tsProjectSections: Section[] = [
  {
    id: 'ts-s10',
    title: 'TypeScript Project — Typed Task Tracker',
    description: 'Build a fully typed task tracker with local storage, filtering, and drag-and-drop.',
    lessons: [
      {
        id: 'ts-l29',
        title: 'Project setup and domain types',
        description: 'Initialize the project, define the Task and Filter types, and set up strict tsconfig.',
        duration: 10,
        objectives: [
          'Scaffold a Vite + TypeScript project',
          'Define the domain types: Task, Filter, Priority',
          'Configure strict mode and path aliases',
        ],
        xp: 60,
        quiz: {
          id: 'quiz-ts-l29',
          title: 'Project setup and domain types quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l29-q1',
              type: 'identify-error',
              prompt: 'What is the type of e.currentTarget in a click handler on a button?',
              code: 'button.addEventListener("click", (e) => {\n  console.log(e.currentTarget)\n})',
              options: [
                'HTMLButtonElement',
                'EventTarget',
                'HTMLElement',
                'Element',
              ],
              answer: 1,
              explanation: 'Event.currentTarget is typed as EventTarget because the same handler could be attached to different element types. Cast or use a type guard for specificity.',
            },
            {
              id: 'quiz-ts-l29-q2',
              type: 'multiple-choice',
              prompt: 'Why is `Priority` declared as a union of string literals rather than `string`?',
              options: [
                'It sorts faster',
                'A typo such as `"hihg"` becomes a compile error',
                'It allows any priority at runtime',
                'It makes the field optional',
              ],
              answer: 1,
              explanation: 'A literal union lists the only valid values. Any other string, including a misspelling, is rejected before the project runs.',
            },
            {
              id: 'quiz-ts-l29-q3',
              type: 'multiple-choice',
              prompt: 'In the domain model, what is the type of `Task.id`?',
              options: [
                'string',
                'number',
                'Priority',
                'boolean',
              ],
              answer: 0,
              explanation: 'The `Task` interface declares `id: string`, and `makeTask` accepts it as a string parameter. Keeping ids as strings works whether they come from a counter or a generated UUID.',
            },
            {
              id: 'quiz-ts-l29-q4',
              type: 'multiple-choice',
              prompt: 'What is the priority of a task created by `makeTask("1", "Write the plan")`?',
              options: [
                '`low`',
                '`high`',
                '`undefined`',
                '`normal`',
              ],
              answer: 3,
              explanation: 'The parameter is declared `priority: Priority = \'normal\'`, so omitting it fills in the default. The call site stays short for the common case.',
            },
            {
              id: 'quiz-ts-l29-q5',
              type: 'multiple-choice',
              prompt: 'Which command scaffolds a vanilla TypeScript project with Vite?',
              options: [
                '`npm create vite@latest task-tracker -- --template vanilla-ts`',
                '`npm init typescript task-tracker`',
                '`npx tsc --init task-tracker`',
                '`npm install vite task-tracker`',
              ],
              answer: 0,
              explanation: 'The Vite scaffolder takes the project name and a `--template` flag; `vanilla-ts` selects the plain TypeScript template used by the tracker.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l29-d1',
            title: 'A task factory with defaults',
            body: 'The domain types describe a `Task`, and one factory builds them. Add a task with and without a priority and watch the default fill in. Types are erased before this runs, so the demo shows the shape and defaults the types describe.',
            html: `<button id="normal">Add a normal task</button>
<button id="high">Add a high priority task</button>
<pre id="out">No tasks yet.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `let nextId = 1
const tasks = []

function makeTask(title, priority) {
  if (priority === undefined) priority = 'normal'
  return { id: String(nextId++), title: title, done: false, priority: priority }
}

const out = document.querySelector('#out')

function render() {
  if (!tasks.length) {
    out.textContent = 'No tasks yet.'
    return
  }
  out.textContent = tasks.map(function (t) {
    return t.id + '  ' + t.title + '  [' + t.priority + ']'
  }).join('\n')
}

document.querySelector('#normal').addEventListener('click', function () {
  tasks.push(makeTask('Write the plan'))
  render()
})

document.querySelector('#high').addEventListener('click', function () {
  tasks.push(makeTask('Ship it', 'high'))
  render()
})`,
            height: 180,
          },
          {
            type: 'text',
            id: 'ts-l29-intro',
            body: '**Project setup and domain types.** A typed project starts from its types, not its UI. Before writing a single handler, describe the data — a `Task`, the `Priority` values it may hold, and the `Filter` the user can apply. Everything else is built on those words.',
          },
          {
            type: 'text',
            id: 'ts-l29-b2',
            body: 'The goal of this section is a small task tracker: add tasks, toggle them done, filter the list, and keep it in `localStorage`. Each lesson builds one layer, and every layer is typed. Start the project with `strict: true` so the compiler works for you from the first file.',
          },
          {
            type: 'heading',
            id: 'ts-l29-h1',
            level: 2,
            body: 'The domain model',
          },
          {
            type: 'code',
            id: 'ts-l29-code',
            language: 'typescript',
            title: 'Task, Priority and Filter',
            code: `type Priority = 'low' | 'normal' | 'high'

interface Task {
  id: string
  title: string
  done: boolean
  priority: Priority
}

type Filter = 'all' | 'active' | 'done'

// npm create vite@latest task-tracker -- --template vanilla-ts
// then in tsconfig.json:
// { "compilerOptions": { "strict": true, "baseUrl": ".", "paths": { "@/*": ["src/*"] } } }

function makeTask(id: string, title: string, priority: Priority = 'normal'): Task {
  return { id, title, done: false, priority }
}`,
          },
          {
            type: 'list',
            id: 'ts-l29-list',
            style: 'bullet',
            items: [
              'A union of string literals (`Priority`) prevents a typo like `hihg` from ever compiling.',
              'The interface names the shape once, so every function that touches a task agrees on it.',
              'A default parameter (`priority = ’normal’`) keeps the common case short at the call site.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l29-tip',
            title: 'Model the words before the widgets',
            body: 'Naming `Task`, `Priority` and `Filter` first means the rest of the project reads like the problem. When you later need a new state, you add it to the union and the compiler points at every place that must handle it.',
          },
          {
            type: 'heading',
            id: 'ts-l29-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l29-b3',
            body: 'Write the factory that creates a task, with the defaults the rest of the project will rely on.',
          },
          {
            type: 'exercise',
            id: 'ts-l29-x1',
            exercise: {
              id: 'ex-ts-l29',
              instructions:
                "Write makeTask(id, title, priority) returning a task with priority defaulting to 'normal' and done starting false. Each call must return a brand-new object.",
              languages: ['typescript'],
              starterCode: {
                typescript: `type Priority = 'low' | 'normal' | 'high'

type Task = {
  id: string
  title: string
  done: boolean
  priority: Priority
}

// Build a task from its parts.
function makeTask(id: string, title: string, priority: Priority = 'normal'): Task {
  return { id: '', title: '', done: false, priority: 'normal' }
}
`,
              },
              tests: [
                {
                  id: 'ts-l29-t1',
                  label: 'uses the id and title it is given',
                  body: "const t = makeTask('1', 'Write the plan'); return t.id === '1' && t.title === 'Write the plan'",
                },
                {
                  id: 'ts-l29-t2',
                  label: 'new tasks start unfinished',
                  body: "return makeTask('1', 'x').done === false",
                },
                {
                  id: 'ts-l29-t3',
                  label: 'priority defaults to normal',
                  body: "return makeTask('1', 'x').priority === 'normal'",
                },
                {
                  id: 'ts-l29-t4',
                  label: 'an explicit priority is kept',
                  body: "return makeTask('2', 'x', 'high').priority === 'high'",
                },
                {
                  id: 'ts-l29-t5',
                  label: 'each call returns a new object',
                  body: "return makeTask('1', 'x') !== makeTask('1', 'x')",
                },
              ],
              hints: [
                'Return an object literal built from the parameters, not fixed values.',
                'done is always false for a task you have just created.',
                'The priority parameter already has a default, so just pass it through: { id, title, done: false, priority }.',
              ],
              solution: {
                typescript: `type Priority = 'low' | 'normal' | 'high'

type Task = {
  id: string
  title: string
  done: boolean
  priority: Priority
}

function makeTask(id: string, title: string, priority: Priority = 'normal'): Task {
  return { id: id, title: title, done: false, priority: priority }
}
`,
              },
              testNotes:
                'The last check calls the factory twice and compares the results — an implementation that returns a shared, module-level object would fail.',
            },
          },
        ],
      },
      {
        id: 'ts-l30',
        title: 'State management with type-safe reducers',
        description: 'A Redux-style reducer with discriminated union actions, fully typed.',
        duration: 10,
        objectives: [
          'Define action types as a discriminated union',
          'Write a reducer that narrows on action.type',
          'Use ReturnType<typeof reducer> for the state type',
        ],
        xp: 60,
        quiz: {
          id: 'quiz-ts-l30',
          title: 'State management with type-safe reducers quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l30-q1',
              type: 'multiple-choice',
              prompt: 'Why use a discriminated union for reducer actions?',
              options: [
                'It makes the code shorter',
                'TypeScript narrows the action type based on action.type',
                'It runs faster at runtime',
                'It is required by Redux',
              ],
              answer: 1,
              explanation: 'Discriminated unions let TypeScript narrow the action shape in each case branch, giving full type safety for payloads.',
            },
            {
              id: 'quiz-ts-l30-q2',
              type: 'multiple-choice',
              prompt: 'In the reducer, what does the `toggle` case return?',
              options: [
                'The same array with the matching task mutated',
                'A new array where the matching task is copied with `done` flipped',
                'A new array with the matching task removed',
                'The original array unchanged',
              ],
              answer: 1,
              explanation: '`map` builds a new array and the matching task is replaced by `{ ...task, done: !task.done }`. The other tasks keep their references, so the old state is untouched.',
            },
            {
              id: 'quiz-ts-l30-q3',
              type: 'multiple-choice',
              prompt: 'Why must a reducer return new arrays and objects instead of mutating state?',
              options: [
                'Mutation is slower in JavaScript',
                'TypeScript forbids mutation of interfaces',
                'Reducers cannot read the old state',
                'Reference changes let the UI detect updates and prevent one action corrupting shared state',
              ],
              answer: 3,
              explanation: 'A new reference signals that something changed, and leaving the old values intact means code still holding them sees a consistent snapshot.',
            },
            {
              id: 'quiz-ts-l30-q4',
              type: 'multiple-choice',
              prompt: 'What is the type of `State` in `type State = ReturnType<typeof taskReducer>`?',
              options: [
                'Task',
                'Action',
                'Task[]',
                'void',
              ],
              answer: 2,
              explanation: '`ReturnType` reads the return type straight from the reducer signature, which is `Task[]`. Deriving it means the state type follows any future change to the reducer.',
            },
            {
              id: 'quiz-ts-l30-q5',
              type: 'multiple-choice',
              prompt: 'Inside `case "add":`, what has `action` been narrowed to?',
              options: [
                '{ type: "add"; task: Task }',
                '{ type: "toggle"; id: string }',
                'Action',
                'Task[]',
              ],
              answer: 0,
              explanation: 'The discriminant `type` is a literal in each member, so matching `"add"` narrows the action to the member that carries `task`.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l30-d1',
            title: 'A reducer returns a new list',
            body: 'The reducer takes the current tasks and an action, and returns the next tasks — never editing the old list. Dispatch `add` then `toggle` and watch each action produce new state. Types are erased before this runs, so the demo shows the pure behaviour they describe.',
            html: `<button id="add">Dispatch add</button>
<button id="toggle">Dispatch toggle</button>
<pre id="out">empty list</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `function taskReducer(tasks, action) {
  if (action.type === 'add') {
    return [...tasks, action.task]
  }
  if (action.type === 'toggle') {
    return tasks.map(function (task) {
      return task.id === action.id
        ? { id: task.id, title: task.title, done: !task.done }
        : task
    })
  }
  return tasks
}

let state = []
let nextId = 1
const out = document.querySelector('#out')

function render() {
  out.textContent = state.length
    ? state.map(function (t) { return (t.done ? '[x] ' : '[ ] ') + t.title }).join('\n')
    : 'empty list'
}

document.querySelector('#add').addEventListener('click', function () {
  const id = String(nextId++)
  state = taskReducer(state, { type: 'add', task: { id: id, title: 'Task ' + id, done: false } })
  render()
})

document.querySelector('#toggle').addEventListener('click', function () {
  if (!state.length) return
  state = taskReducer(state, { type: 'toggle', id: state[state.length - 1].id })
  render()
})`,
            height: 180,
          },
          {
            type: 'text',
            id: 'ts-l30-intro',
            body: '**State management with type-safe reducers.** A reducer is a pure function: it takes the current state and an action, and returns the next state. Making the action a discriminated union means each `case` knows exactly which payload it carries — the compiler narrows it for you.',
          },
          {
            type: 'text',
            id: 'ts-l30-b2',
            body: 'The rule that keeps a reducer predictable is *no mutation*: return a new array or object rather than editing the old one. Then the UI can compare references to know what changed, and a mistake in one action cannot corrupt state another action is reading.',
          },
          {
            type: 'heading',
            id: 'ts-l30-h1',
            level: 2,
            body: 'A reducer over discriminated actions',
          },
          {
            type: 'code',
            id: 'ts-l30-code',
            language: 'typescript',
            title: 'narrow on action.type, return new state',
            code: `type Action =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: string }

function taskReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add':
      return [...tasks, action.task]        // a new array
    case 'toggle':
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task,
      )
    default: {
      const never: never = action          // all actions handled
      return tasks
    }
  }
}

// Derive the state type from the reducer itself:
type State = ReturnType<typeof taskReducer>   // Task[]`,
          },
          {
            type: 'list',
            id: 'ts-l30-list',
            style: 'bullet',
            items: [
              'Each action is a member of the union with its own payload shape — `add` has a task, `toggle` has an id.',
              '`action.type` is the discriminant; the matching `case` narrows the whole action.',
              'Spread (`[...tasks, task]`, `{ ...task, done: !task.done }`) returns new values instead of mutating.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l30-tip',
            title: 'Derive the state type, do not restate it',
            body: '`ReturnType<typeof taskReducer>` reads the state type straight from the reducer. If the reducer later returns something richer, every consumer follows with no edits.',
          },
          {
            type: 'heading',
            id: 'ts-l30-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l30-b3',
            body: 'Implement the reducer. It must return a new list and must never change the list it was given.',
          },
          {
            type: 'exercise',
            id: 'ts-l30-x1',
            exercise: {
              id: 'ex-ts-l30',
              instructions:
                'Write taskReducer(tasks, action). add returns a new list with the task appended; toggle flips the done flag of the task whose id matches. Never mutate the input array or its tasks.',
              languages: ['typescript'],
              starterCode: {
                typescript: `type Task = { id: string; title: string; done: boolean }

type Action =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: string }

// Return the next state; do not change the one you were given.
function taskReducer(tasks: Task[], action: Action): Task[] {
  return tasks
}
`,
              },
              tests: [
                {
                  id: 'ts-l30-t1',
                  label: 'add appends the task',
                  body: "const s = taskReducer([], { type: 'add', task: { id: '1', title: 'a', done: false } }); return s.length === 1 && s[0].id === '1'",
                },
                {
                  id: 'ts-l30-t2',
                  label: 'toggle flips the matching task',
                  body: "const one = taskReducer([], { type: 'add', task: { id: '1', title: 'a', done: false } }); const two = taskReducer(one, { type: 'toggle', id: '1' }); return two[0].done === true",
                },
                {
                  id: 'ts-l30-t3',
                  label: 'toggle leaves other tasks alone',
                  body: "const one = [{ id: '1', title: 'a', done: false }, { id: '2', title: 'b', done: false }]; const two = taskReducer(one, { type: 'toggle', id: '2' }); return two[0].done === false && two[1].done === true",
                },
                {
                  id: 'ts-l30-t4',
                  label: 'the input state is not mutated',
                  body: "const base = [{ id: '1', title: 'a', done: false }]; const next = taskReducer(base, { type: 'toggle', id: '1' }); return base[0].done === false && next !== base",
                },
              ],
              hints: [
                'Switch on action.type, exactly like the example.',
                'add: return a new array with the task at the end — [...tasks, action.task].',
                'toggle: map over the tasks and return a copy with done flipped for the matching id, returning the task unchanged otherwise.',
              ],
              solution: {
                typescript: `type Task = { id: string; title: string; done: boolean }

type Action =
  | { type: 'add'; task: Task }
  | { type: 'toggle'; id: string }

function taskReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case 'add':
      return [...tasks, action.task]
    case 'toggle':
      return tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task,
      )
    default:
      return tasks
  }
}
`,
              },
              testNotes:
                'The last check inspects the original array after the call. An in-place toggle would show true there and fail.',
            },
          },
        ],
      },
      {
        id: 'ts-l31',
        title: 'DOM layer with typed event handlers',
        description: 'Querying elements safely, typing form events, and delegating clicks.',
        duration: 10,
        objectives: [
          'Type querySelector with non-null assertions or guards',
          'Handle submit, input, click with correct event types',
          'Delegate events on a list with a single listener',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-ts-l31',
          title: 'DOM layer with typed event handlers quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l31-q1',
              type: 'multiple-choice',
              prompt: 'What event type do you use for a form submit handler?',
              options: [
                'Event',
                'SubmitEvent',
                'FormEvent',
                'InputEvent',
              ],
              answer: 1,
              explanation: 'SubmitEvent is the specific type for form submit events, with access to event.submitter.',
            },
            {
              id: 'quiz-ts-l31-q2',
              type: 'multiple-choice',
              prompt: 'What does `document.querySelector<HTMLUListElement>("#tasks")` return?',
              options: [
                'HTMLUListElement',
                'HTMLUListElement | null',
                'Element',
                'HTMLElement | undefined',
              ],
              answer: 1,
              explanation: 'The generic parameter sets the element type, but the selector may match nothing, so the result stays nullable and must be guarded.',
            },
            {
              id: 'quiz-ts-l31-q3',
              type: 'multiple-choice',
              prompt: 'Why is a guard needed after `querySelector`?',
              options: [
                'The element may not exist, so the result can be null',
                'querySelector always returns any',
                'The generic parameter is ignored',
                'The DOM loads after the script',
              ],
              answer: 0,
              explanation: 'Under `strictNullChecks`, `null` is not part of the element type. Without a guard the compiler refuses to let you call element methods on a possibly missing node.',
            },
            {
              id: 'quiz-ts-l31-q4',
              type: 'multiple-choice',
              prompt: 'In a delegated click listener on a list, what is `event.target`?',
              options: [
                'The element the listener is attached to',
                'Always the document body',
                'The innermost element that was clicked',
                'The element returned by querySelector',
              ],
              answer: 2,
              explanation: '`target` is the element that actually received the event, which may be a child such as a button. `closest("[data-id]")` walks up from it to the row.',
            },
            {
              id: 'quiz-ts-l31-q5',
              type: 'multiple-choice',
              prompt: 'What is the main advantage of delegating clicks to the list instead of binding one listener per row?',
              options: [
                'It makes each row draggable',
                'It avoids a listener per row and handles rows added later',
                'It removes the need for data attributes',
                'It guarantees the event is not null',
              ],
              answer: 1,
              explanation: 'One listener on the parent covers every child, including rows rendered after the listener was attached, and keeps both the DOM and the type surface small.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l31-d1',
            title: 'One listener, delegated',
            body: 'Instead of a listener per row, bind **one** on the list and read `event.target` to find the row. Click any row to see the delegated handler run. Types are erased before this runs, so the demo shows the delegation logic they describe.',
            html: `<ul id="list">
  <li data-id="1">Write the plan <button>toggle</button></li>
  <li data-id="2">Review the plan <button>toggle</button></li>
  <li data-id="3">Ship it <button>toggle</button></li>
</ul>
<pre id="out">Click a row or its button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
ul { list-style: none; margin: 0; padding: 0; }
li { padding: 6px 8px; border: 1px solid #d5dae0; border-radius: 6px; margin-bottom: 6px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
button { font: inherit; padding: 4px 10px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')
const list = document.querySelector('#list')

// One listener for every row, attached to the parent.
list.addEventListener('click', function (event) {
  const row = event.target.closest('[data-id]')
  if (!row) return
  out.textContent = 'the list listener handled data-id=' + row.getAttribute('data-id')
})`,
            height: 220,
          },
          {
            type: 'text',
            id: 'ts-l31-intro',
            body: '**DOM layer with typed event handlers.** The DOM is full of things that might be `null` and events that might be any shape. This is where `strictNullChecks` earns its keep: `document.querySelector` returns `Element | null`, so you cannot use the result until you have handled the missing case.',
          },
          {
            type: 'text',
            id: 'ts-l31-b2',
            body: 'Events are typed too. A submit handler receives a `SubmitEvent`; a click handler a `MouseEvent`. `event.currentTarget` is the element the listener was attached to, and it is typed loosely, so a cast or a guard is honest about what you expect. Delegation — one listener on the list instead of one per row — keeps both the DOM and the types small.',
          },
          {
            type: 'heading',
            id: 'ts-l31-h1',
            level: 2,
            body: 'Querying, typing, and delegating',
          },
          {
            type: 'code',
            id: 'ts-l31-code',
            language: 'typescript',
            title: 'typed DOM access and event handling',
            code: `// querySelector is generic — name the element you expect.
const list = document.querySelector<HTMLUListElement>('#tasks')
if (!list) throw new Error('Missing #tasks')

// A submit handler gets a SubmitEvent; read the form from currentTarget.
form.addEventListener('submit', (event: SubmitEvent) => {
  event.preventDefault()
  const form = event.currentTarget as HTMLFormElement
  const title = (form.elements.namedItem('title') as HTMLInputElement).value
})

// Delegate: one listener, find the row that was clicked.
list.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const id = target.closest('[data-id]')?.getAttribute('data-id')
  if (id) toggle(id)
})`,
          },
          {
            type: 'list',
            id: 'ts-l31-list',
            style: 'bullet',
            items: [
              '`querySelector<T>` returns `T | null`; a guard (or an early throw) is required before use.',
              'Listeners are typed by the event name, so `event` arrives with the right members.',
              'Delegation binds one listener on a parent and reads `event.target`, avoiding a listener per row.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l31-warn',
            title: 'A cast is a promise, not a check',
            body: '`event.currentTarget as HTMLFormElement` tells the compiler to trust you. If the listener is ever attached to something else, the promise breaks at run time. Cast only where you control how the listener is wired.',
          },
          {
            type: 'heading',
            id: 'ts-l31-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l31-b3',
            body: 'Model delegation as a plain function: given a map of handlers and an event, route to the matching handler. This is the logic the single list listener runs.',
          },
          {
            type: 'exercise',
            id: 'ts-l31-x1',
            exercise: {
              id: 'ex-ts-l31',
              instructions:
                'Write delegate(handlers, event) that calls the handler named after event.type with the event, and returns its result. Return undefined when no handler matches.',
              languages: ['typescript'],
              starterCode: {
                typescript: `type Handlers = Record<string, (event: { type: string; target?: string }) => unknown>

// Route the event to its handler.
function delegate(
  handlers: Handlers,
  event: { type: string; target?: string },
): unknown {
  return undefined
}
`,
              },
              tests: [
                {
                  id: 'ts-l31-t1',
                  label: 'calls the handler for the event type',
                  body: "return delegate({ click: () => 'clicked' }, { type: 'click' }) === 'clicked'",
                },
                {
                  id: 'ts-l31-t2',
                  label: 'passes the event to the handler',
                  body: "return delegate({ submit: (e) => e.target }, { type: 'submit', target: 'form' }) === 'form'",
                },
                {
                  id: 'ts-l31-t3',
                  label: 'an unmatched type returns undefined',
                  body: "return delegate({ click: () => 1 }, { type: 'submit' }) === undefined",
                },
                {
                  id: 'ts-l31-t4',
                  label: 'it does not call the wrong handler',
                  body: "let called = ''; delegate({ click: () => { called = 'click' }, submit: () => { called = 'submit' } }, { type: 'submit' }); return called === 'submit'",
                },
              ],
              hints: [
                'The handlers map is keyed by event type.',
                'Look the handler up by event.type and call it with the event.',
                'Guard the missing case: const handler = handlers[event.type]; return handler ? handler(event) : undefined.',
              ],
              solution: {
                typescript: `type Handlers = Record<string, (event: { type: string; target?: string }) => unknown>

function delegate(
  handlers: Handlers,
  event: { type: string; target?: string },
): unknown {
  const handler = handlers[event.type]
  return handler ? handler(event) : undefined
}
`,
              },
              testNotes:
                'The last check records which handler ran, so calling every handler or the first one in the map is caught.',
            },
          },
        ],
      },
      {
        id: 'ts-l32',
        title: 'Persistence and filtering',
        description: 'localStorage with JSON reviver, and derived state for filters.',
        duration: 8,
        objectives: [
          'Save and load typed state from localStorage',
          'Write a reviver to reconstruct Date objects',
          'Compute filtered views without mutating state',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-ts-l32',
          title: 'Persistence and filtering quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l32-q1',
              type: 'true-false',
              prompt: 'localStorage stores only strings, so Date objects must be serialized and revived.',
              answer: true,
              explanation: 'localStorage only stores strings. Dates must be serialized (toISOString) and revived (new Date(str)) when loading.',
            },
            {
              id: 'quiz-ts-l32-q2',
              type: 'multiple-choice',
              prompt: 'Why is a JSON reviver needed when loading tasks?',
              options: [
                '`JSON.stringify` turns Date objects into strings, so the reviver rebuilds them',
                'The reviver compresses the stored string',
                'localStorage requires a reviver to read any value',
                'The reviver validates the schema at runtime',
              ],
              answer: 0,
              explanation: 'Serialization has no Date type to preserve, so a date is written as an ISO string. The reviver checks the key and calls `new Date(value)` as the JSON is parsed.',
            },
            {
              id: 'quiz-ts-l32-q3',
              type: 'multiple-choice',
              prompt: 'What does TypeScript know about the value returned by `JSON.parse`?',
              options: [
                'It is typed as the target interface automatically',
                'It is `any`, so the shape is asserted at the boundary',
                'It is `unknown` and must be narrowed with typeof',
                'It is always a string',
              ],
              answer: 1,
              explanation: '`JSON.parse` has no way to know what was stored, so its result is `any`. Asserting `as Task[]` is the one honest cast, made at the storage boundary.',
            },
            {
              id: 'quiz-ts-l32-q4',
              type: 'multiple-choice',
              prompt: 'Why does `filterTasks` return `[...tasks]` for the `"all"` filter instead of `tasks` itself?',
              options: [
                'Because spread removes duplicate tasks',
                'To convert the array into a tuple',
                'Because `filter` always copies its input',
                'So callers can sort or slice the view without touching stored state',
              ],
              answer: 3,
              explanation: 'Returning a copy keeps the derived view separate from the stored list. Sorting the visible array in place then cannot silently reorder the saved tasks.',
            },
            {
              id: 'quiz-ts-l32-q5',
              type: 'multiple-choice',
              prompt: 'Why compute the visible list from the stored list on each render instead of storing `visibleTasks`?',
              options: [
                'It avoids keeping two copies in sync',
                'It makes localStorage unnecessary',
                'It turns the filter into a union type',
                'It prevents the reviver from running',
              ],
              answer: 0,
              explanation: 'A second stored list must be updated on every add, toggle and filter change, and any missed update shows stale data. Deriving the view removes that whole class of bug.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l32-d1',
            title: 'Filter a derived view',
            body: 'The stored list never changes; each filter computes a fresh view from it. Switch filters and watch the same list produce different results. Types are erased before this runs, so the demo shows the derived filtering they describe.',
            html: `<button id="all">Show all</button>
<button id="active">Show active</button>
<button id="done">Show done</button>
<pre id="out"></pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const tasks = [
  { id: '1', title: 'Write the plan', done: false },
  { id: '2', title: 'Review the plan', done: true },
  { id: '3', title: 'Ship it', done: false },
]

function filterTasks(list, filter) {
  if (filter === 'active') return list.filter(function (t) { return !t.done })
  if (filter === 'done') return list.filter(function (t) { return t.done })
  return list.slice()
}

const out = document.querySelector('#out')

function show(filter) {
  const view = filterTasks(tasks, filter)
  out.textContent = view.length
    ? view.map(function (t) { return t.title }).join('\n')
    : '(none)'
}

document.querySelector('#all').addEventListener('click', function () { show('all') })
document.querySelector('#active').addEventListener('click', function () { show('active') })
document.querySelector('#done').addEventListener('click', function () { show('done') })

show('all')`,
            height: 190,
          },
          {
            type: 'text',
            id: 'ts-l32-intro',
            body: '**Persistence and filtering.** `localStorage` stores strings, so saving state means serializing it and loading means parsing it back. Because the value that comes out of `JSON.parse` is `any`, the type you claim on the way out is a promise the compiler cannot check — you assert it once, at the boundary.',
          },
          {
            type: 'text',
            id: 'ts-l32-b2',
            body: 'Filtering is the other half of this layer, and it should be *derived*: compute the visible list from the stored list every render rather than keeping a second copy in sync. A small pure function — `filterTasks(tasks, filter)` — is all the UI needs.',
          },
          {
            type: 'heading',
            id: 'ts-l32-h1',
            level: 2,
            body: 'Serialize at the edge, filter as a pure function',
          },
          {
            type: 'code',
            id: 'ts-l32-code',
            language: 'typescript',
            title: 'persistence and derived state',
            code: `function save(tasks: Task[]): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function load(): Task[] {
  const raw = localStorage.getItem('tasks')
  if (!raw) return []
  // JSON.parse returns any; we assert the shape we wrote.
  return JSON.parse(raw) as Task[]
}

// A reviver turns stored ISO strings back into Dates:
function reviver(key: string, value: unknown) {
  return key === 'createdAt' && typeof value === 'string' ? new Date(value) : value
}

// Derived state: filter without touching the stored list.
function filterTasks(tasks: Task[], filter: Filter): Task[] {
  if (filter === 'active') return tasks.filter((task) => !task.done)
  if (filter === 'done') return tasks.filter((task) => task.done)
  return [...tasks]
}`,
          },
          {
            type: 'list',
            id: 'ts-l32-list',
            style: 'bullet',
            items: [
              '`JSON.stringify` loses `Date` objects, so the reviver rebuilds them on the way in.',
              '`JSON.parse` returns `any`; asserting `as Task[]` is the one honest cast in the layer.',
              '`filterTasks(’all’)` returns a copy, so callers can sort or slice the view without touching stored state.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l32-tip',
            title: 'Derive, do not duplicate',
            body: 'Storing `visibleTasks` alongside `tasks` means keeping them in sync forever. Computing the visible list from the full list and the current filter removes a whole class of bug.',
          },
          {
            type: 'heading',
            id: 'ts-l32-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l32-b3',
            body: 'Write the derived filter. It must never change the list it is given, even for the all case.',
          },
          {
            type: 'exercise',
            id: 'ts-l32-x1',
            exercise: {
              id: 'ex-ts-l32',
              instructions:
                "Write filterTasks(tasks, filter). 'active' returns the unfinished tasks, 'done' returns the finished ones, and 'all' returns a copy of the whole list. Always return a new array.",
              languages: ['typescript'],
              starterCode: {
                typescript: `type Task = { id: string; title: string; done: boolean }
type Filter = 'all' | 'active' | 'done'

// Return a new array of the matching tasks.
function filterTasks(tasks: Task[], filter: Filter): Task[] {
  return tasks
}
`,
              },
              tests: [
                {
                  id: 'ts-l32-t1',
                  label: 'all returns every task, as a new array',
                  body: "const tasks = [{ id: '1', title: 'a', done: false }, { id: '2', title: 'b', done: true }]; const r = filterTasks(tasks, 'all'); return r.length === 2 && r !== tasks",
                },
                {
                  id: 'ts-l32-t2',
                  label: 'active returns only unfinished tasks',
                  body: "const tasks = [{ id: '1', title: 'a', done: false }, { id: '2', title: 'b', done: true }]; const r = filterTasks(tasks, 'active'); return r.length === 1 && r[0].id === '1'",
                },
                {
                  id: 'ts-l32-t3',
                  label: 'done returns only finished tasks',
                  body: "const tasks = [{ id: '1', title: 'a', done: false }, { id: '2', title: 'b', done: true }]; const r = filterTasks(tasks, 'done'); return r.length === 1 && r[0].id === '2'",
                },
                {
                  id: 'ts-l32-t4',
                  label: 'an empty list stays empty',
                  body: "return filterTasks([], 'active').length === 0",
                },
              ],
              hints: [
                'active and done are just filters on the done flag.',
                'filter returns a new array, so it fits active and done directly.',
                'For all, copy the list with the spread: [...tasks].',
              ],
              solution: {
                typescript: `type Task = { id: string; title: string; done: boolean }
type Filter = 'all' | 'active' | 'done'

function filterTasks(tasks: Task[], filter: Filter): Task[] {
  if (filter === 'active') return tasks.filter((task) => !task.done)
  if (filter === 'done') return tasks.filter((task) => task.done)
  return [...tasks]
}
`,
              },
              testNotes:
                'The all case checks r !== tasks, so returning the same reference — which a later sort would mutate — is caught.',
            },
          },
        ],
      },
      {
        id: 'ts-l33',
        title: 'Polish: drag-and-drop and keyboard shortcuts',
        description: 'Native drag-and-drop API with typed data transfer, and global key handling.',
        duration: 8,
        objectives: [
          'Implement drag-and-drop with DataTransfer typing',
          'Add keyboard shortcuts with keydown event types',
          'Ensure accessibility with ARIA attributes',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-ts-l33',
          title: 'Polish: drag-and-drop and keyboard shortcuts quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l33-q1',
              type: 'blank',
              prompt: 'What DataTransfer method sets the drag data for a custom type?',
              answers: [
                'setData',
                'dataTransfer.setData',
              ],
              explanation: 'dataTransfer.setData(format, data) sets the drag payload. Use a custom format like "application/x-task-id".',
            },
            {
              id: 'quiz-ts-l33-q2',
              type: 'multiple-choice',
              prompt: 'Which drag event must call `preventDefault()` or the browser refuses the drop?',
              options: [
                '`dragstart`',
                '`dragend`',
                '`dragover`',
                '`drop`',
              ],
              answer: 2,
              explanation: 'The browser treats a drop zone as closed unless `dragover` is cancelled. Calling `preventDefault()` there declares the element willing to accept the drop.',
            },
            {
              id: 'quiz-ts-l33-q3',
              type: 'multiple-choice',
              prompt: 'Why is `event.dataTransfer?.setData(...)` written with optional chaining?',
              options: [
                '`setData` may return null',
                '`dataTransfer` can be null on a drag event',
                'The payload may be an object',
                '`DragEvent` is not typed',
              ],
              answer: 1,
              explanation: '`DragEvent.dataTransfer` is nullable in the DOM types, so the `?.` acknowledges that an event may carry no data transfer and avoids an unsafe property access.',
            },
            {
              id: 'quiz-ts-l33-q4',
              type: 'multiple-choice',
              prompt: 'What type is the event parameter in `window.addEventListener("keydown", (event) => ...)`?',
              options: [
                '`KeyboardEvent`',
                '`InputEvent`',
                '`MouseEvent`',
                '`Event`',
              ],
              answer: 0,
              explanation: 'The event-name overload gives the handler the matching event interface, so `event.key` is available without a cast. `InputEvent` belongs to text inputs, not keydown.',
            },
            {
              id: 'quiz-ts-l33-q5',
              type: 'multiple-choice',
              prompt: 'Why pair drag-and-drop with buttons or shortcuts and `aria-label`s?',
              options: [
                'Drag events do not work in Chrome',
                'It is required by the `DataTransfer` API',
                'Drag is invisible to keyboard and screen-reader users',
                'It reduces the number of event listeners',
              ],
              answer: 2,
              explanation: 'A drag gesture has no keyboard equivalent and announces nothing to assistive technology. An equivalent button or shortcut plus labels keeps the action reachable for everyone.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l33-d1',
            title: 'Which command does a key mean',
            body: 'A `keydown` listener stays thin by asking one small pure function what a key means. Press a key in the panel or use the buttons. Types are erased before this runs, so the demo shows the runtime key handling they describe.',
            html: `<button id="n">Simulate n</button>
<button id="slash">Simulate /</button>
<button id="esc">Simulate Escape</button>
<pre id="out">Press a key here or use a button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')

function shortcutFor(key) {
  if (key === 'n') return 'new'
  if (key === '/') return 'search'
  if (key === 'Escape') return 'close'
  return null
}

function handle(key) {
  const command = shortcutFor(key)
  out.textContent = 'key ' + key + ' -> ' + (command === null ? 'no command' : command)
}

document.querySelector('#n').addEventListener('click', function () { handle('n') })
document.querySelector('#slash').addEventListener('click', function () { handle('/') })
document.querySelector('#esc').addEventListener('click', function () { handle('Escape') })

window.addEventListener('keydown', function (event) { handle(event.key) })`,
            height: 180,
          },
          {
            type: 'text',
            id: 'ts-l33-intro',
            body: '**Polish: drag-and-drop and keyboard shortcuts.** The final layer adds the interactions that make the tracker feel finished: dragging rows to reorder, and keyboard shortcuts for the common actions. Both are typed, and both are optional — a mouse is not the only way in.',
          },
          {
            type: 'text',
            id: 'ts-l33-b2',
            body: 'The drag API carries data on a `DataTransfer` object, which may be null on some events, so the code handles that. Keyboard handling reads `event.key` on a `KeyboardEvent`. Wrapping a decision like "which command does this key mean?" in a small pure function keeps the DOM listener thin and testable.',
          },
          {
            type: 'heading',
            id: 'ts-l33-h1',
            level: 2,
            body: 'Drag payloads and key handling',
          },
          {
            type: 'code',
            id: 'ts-l33-code',
            language: 'typescript',
            title: 'dragging, dropping, and shortcuts',
            code: `row.addEventListener('dragstart', (event: DragEvent) => {
  // dataTransfer can be null, so guard it.
  event.dataTransfer?.setData('application/x-task-id', row.dataset.id ?? '')
})

dropZone.addEventListener('dragover', (event: DragEvent) => {
  event.preventDefault()   // allow the drop
})

dropZone.addEventListener('drop', (event: DragEvent) => {
  const id = event.dataTransfer?.getData('application/x-task-id')
  if (id) move(id, dropZone.dataset.id ?? '')
})

window.addEventListener('keydown', (event: KeyboardEvent) => {
  const command = shortcutFor(event.key)
  if (command === 'new') openNewTaskForm()
})

// A tiny pure function is easier to test than the listener itself:
function shortcutFor(key: string): string | null {
  if (key === 'n') return 'new'
  if (key === '/') return 'search'
  if (key === 'Escape') return 'close'
  return null
}`,
          },
          {
            type: 'list',
            id: 'ts-l33-list',
            style: 'bullet',
            items: [
              '`dataTransfer` is nullable, so `?.` keeps the handler honest about the drag not carrying data.',
              '`dragover` must call `preventDefault()` or the browser will refuse the drop.',
              'A named key (`’Escape’`) is more reliable than a key code, and reads better in the source.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l33-warn',
            title: 'Do not make drag the only way',
            body: 'Drag-and-drop is invisible to a keyboard and to a screen reader. Keep a button or a shortcut for the same action, and set `aria-label`s so the row announces what it does.',
          },
          {
            type: 'heading',
            id: 'ts-l33-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l33-b3',
            body: 'Write the pure decision the keydown listener depends on: which command does a key mean?',
          },
          {
            type: 'exercise',
            id: 'ts-l33-x1',
            exercise: {
              id: 'ex-ts-l33',
              instructions:
                "Write shortcutFor(key) returning 'new' for the n key, 'search' for /, 'close' for Escape, and null for any other key.",
              languages: ['typescript'],
              starterCode: {
                typescript: `// Map a key to a command name, or null.
function shortcutFor(key: string): string | null {
  return null
}
`,
              },
              tests: [
                { id: 'ts-l33-t1', label: 'n starts a new task', body: "return shortcutFor('n') === 'new'" },
                { id: 'ts-l33-t2', label: 'slash opens search', body: "return shortcutFor('/') === 'search'" },
                { id: 'ts-l33-t3', label: 'Escape closes', body: "return shortcutFor('Escape') === 'close'" },
                { id: 'ts-l33-t4', label: 'other keys do nothing', body: "return shortcutFor('x') === null && shortcutFor('Enter') === null" },
              ],
              hints: [
                'Compare the key against each known value and return the matching command.',
                'Escape is the exact string "Escape", not the word escape in lower case.',
                'Fall through to null when nothing matches — that is the "no command" answer.',
              ],
              solution: {
                typescript: `function shortcutFor(key: string): string | null {
  if (key === 'n') return 'new'
  if (key === '/') return 'search'
  if (key === 'Escape') return 'close'
  return null
}
`,
              },
              testNotes:
                'The checks include an unknown key, so a function that returns a command for everything is caught.',
            },
          },
        ],
      },
    ],
  },
]
