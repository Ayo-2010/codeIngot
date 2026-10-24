import type { Section } from '~/types/content'

export const tsHomeSections: Section[] = [
  {
    id: 'ts-s1',
    title: 'Getting started',
    description: 'What TypeScript adds to JavaScript, how the compiler works, and what you will be able to do at the end.',
    lessons: [
      {
        id: 'ts-l1',
        title: 'What TypeScript is and why it exists',
        description: 'A typed superset that compiles to plain JavaScript, and the three problems it solves.',
        duration: 5,
        objectives: [
          'Say what TypeScript adds that JavaScript cannot do',
          'Explain the compile step and why it catches bugs early',
          'Name the three classes of bugs TypeScript prevents',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-ts-l1',
          title: 'What TypeScript is and why it exists quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l1-q1',
              type: 'multiple-choice',
              prompt: 'What does TypeScript add to JavaScript?',
              options: [
                'New runtime features',
                'Static type checking that compiles away',
                'A different standard library',
                'Server-side rendering',
              ],
              answer: 1,
              explanation: 'TypeScript is a superset that adds static types; it compiles to plain JavaScript and adds no runtime overhead.',
            },
            {
              id: 'quiz-ts-l1-q2',
              type: 'multiple-choice',
              prompt: 'Why does TypeScript add no runtime cost to the program that ships?',
              options: [
                'The compiler removes every type before the JavaScript runs',
                'The browser compiles the types on first load',
                'Types are stored in a separate file the browser ignores',
                'The JavaScript engine skips annotated lines',
              ],
              answer: 0,
              explanation: 'Type annotations exist only while the compiler checks your code. The emitted JavaScript is ordinary JavaScript, so there is no type-checking work left at runtime.',
            },
            {
              id: 'quiz-ts-l1-q3',
              type: 'multiple-choice',
              prompt: 'Which problem is TypeScript unable to catch for you?',
              options: [
                'Passing a string to a function that expects a number',
                'Reading `user.nam` when the property is really `name`',
                'A loop whose condition never becomes false',
                'Reaching into `user.address.city` when `address` may be undefined',
              ],
              answer: 2,
              explanation: 'Types describe the shape of values, not whether your logic terminates. A loop that never ends is a runtime behaviour problem, so the compiler has nothing to object to.',
            },
            {
              id: 'quiz-ts-l1-q4',
              type: 'identify-error',
              prompt: 'Which call does the compiler reject?',
              code: 'function shout(message: string) {\n  return message.toUpperCase()\n}\n\nshout(\'hello\')\nshout(42)',
              options: [
                'shout(\'hello\')',
                'shout(42)',
                'Both calls',
                'Neither call',
              ],
              answer: 1,
              explanation: 'The parameter is annotated `string`, so passing the number 42 is a compile error. The error appears before the program runs, even though the annotation is erased afterwards.',
            },
            {
              id: 'quiz-ts-l1-q5',
              type: 'true-false',
              prompt: 'Every valid JavaScript program is already valid TypeScript.',
              answer: true,
              explanation: 'TypeScript is a superset of JavaScript: existing JavaScript syntax is legal TypeScript. You add annotations only where you want the extra checking.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l1-d1',
            title: 'The annotation is gone by the time this runs',
            body: 'The compiler would reject a string passed to `add`, but the annotation is erased before the code reaches the browser. Press the button and the plain JavaScript below happily concatenates a number and a string instead of adding.',
            html: `<button id="go">Call add with a string</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `function add(a, b) {
  return a + b
}

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  out.textContent = 'add(1, 2) = ' + add(1, 2) + '\\nadd(1, "2") = ' + add(1, '2') + '\\nno type was checked at runtime'
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l1-intro',
            body: '**What TypeScript is and why it exists.** TypeScript is a superset of JavaScript: every valid JavaScript program is already valid TypeScript. It lets you describe the *shape* of your data, then checks that you use that data consistently. Every type is erased before the code reaches the browser, so the JavaScript that runs is exactly the JavaScript you would have written by hand.',
          },
          {
            type: 'text',
            id: 'ts-l1-b2',
            body: 'The value is not a new runtime. It is a second reader of your code — a compiler that says "you said this was a number, but here you are treating it as a string." That conversation happens while you type, long before a user clicks anything.',
          },
          {
            type: 'heading',
            id: 'ts-l1-h1',
            level: 2,
            body: 'The three classes of bugs it removes',
          },
          {
            type: 'list',
            id: 'ts-l1-list',
            style: 'ordered',
            items: [
              '**Wrong values at the wrong time.** Passing a string to a function that adds numbers, and getting `"12"` instead of `3`.',
              '**Mistyped property names.** Reading `user.nam` when the key is really `name`.',
              '**Missing null.** Reaching into `user.address.city` when `address` might be undefined.',
            ],
          },
          {
            type: 'heading',
            id: 'ts-l1-h2',
            level: 2,
            body: 'Worked example',
          },
          {
            type: 'code',
            id: 'ts-l1-code',
            language: 'typescript',
            title: 'describe a value, then use it',
            code: `// The annotation says: this parameter must be a string.
function shout(message: string) {
  return message.toUpperCase() + '!'
}

console.log(shout('hello world'))   // HELLO WORLD!

// shout(42)   // the compiler rejects this before the code ever runs`,
          },
          {
            type: 'list',
            id: 'ts-l1-list2',
            style: 'bullet',
            items: [
              '`message: string` is an annotation — the only new syntax in the example.',
              'Inside the function the editor now knows `message` has `.toUpperCase()`, so it autocompletes it and flags typos.',
              'Calling `shout(42)` is a compile-time error. In plain JavaScript it would only fail when that line happened to run.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l1-tip',
            title: 'Types disappear at runtime',
            body: 'Compile `shout` and the annotation is gone — the browser receives the same two lines you would have written in JavaScript. TypeScript costs nothing at runtime; it only costs the moment it takes to run the compiler.',
          },
          {
            type: 'heading',
            id: 'ts-l1-h3',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l1-b3',
            body: 'Declare two typed values, then build a sentence from them. The editor runs your real TypeScript, so the annotations you write are checked as you go.',
          },
          {
            type: 'exercise',
            id: 'ts-l1-x1',
            exercise: {
              id: 'ex-ts-l1',
              instructions:
                'Give course the type string and lessonCount the type number, then set summary to a sentence that contains both.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Annotate both variables.
const course = 'TypeScript'
const lessonCount = 33

// Build a sentence such as "TypeScript has 33 lessons".
const summary = ''
`,
              },
              tests: [
                {
                  id: 'ts-l1-t1',
                  label: 'course is a non-empty string',
                  body: "return typeof course === 'string' && course.length > 0",
                },
                {
                  id: 'ts-l1-t2',
                  label: 'lessonCount is the number 33',
                  body: "return typeof lessonCount === 'number' && lessonCount === 33",
                },
                {
                  id: 'ts-l1-t3',
                  label: 'summary mentions both values',
                  body:
                    "return typeof summary === 'string' && summary.includes(course) && summary.includes(String(lessonCount))",
                },
              ],
              hints: [
                'An annotation goes after the name, before the equals sign: const course: string = ...',
                'lessonCount is already a number because of its value — annotate it anyway so the intent is written down.',
                "Join the parts with concatenation: course + ' has ' + lessonCount + ' lessons'.",
              ],
              solution: {
                typescript: `const course: string = 'TypeScript'
const lessonCount: number = 33

const summary = course + ' has ' + lessonCount + ' lessons'
console.log(summary)
`,
              },
              testNotes:
                'The tests run after your code and read the variables you created, so they check the values you produced rather than the exact syntax you used.',
            },
          },
        ],
      },
      {
        id: 'ts-l2',
        title: 'How the compiler fits in your workflow',
        description: 'tsconfig, the watch mode, and running the compiler alongside your editor.',
        duration: 5,
        objectives: [
          'Create a minimal tsconfig.json for a new project',
          'Run tsc in watch mode while you code',
          'Read compiler output and jump to the failing line',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-ts-l2',
          title: 'How the compiler fits in your workflow quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l2-q1',
              type: 'multiple-choice',
              prompt: 'Which file configures the TypeScript compiler?',
              options: [
                'package.json',
                'tsconfig.json',
                'webpack.config.js',
                '.babelrc',
              ],
              answer: 1,
              explanation: 'tsconfig.json is the standard configuration file for the TypeScript compiler.',
            },
            {
              id: 'quiz-ts-l2-q2',
              type: 'blank',
              prompt: 'What command runs the TypeScript compiler in watch mode?',
              answers: [
                'tsc -w',
                'tsc --watch',
                'tsc watch',
              ],
              explanation: '`tsc -w` or `tsc --watch` recompiles on file changes, which is ideal during development.',
            },
            {
              id: 'quiz-ts-l2-q3',
              type: 'multiple-choice',
              prompt: 'Which `compilerOptions` flag turns on the whole family of safety checks, including `strictNullChecks`?',
              options: [
                'target',
                'module',
                'noEmit',
                'strict',
              ],
              answer: 3,
              explanation: '`strict` enables `strictNullChecks` and the rest of the strict family. It is the single setting that finds the most real bugs, which is why the minimal config turns it on.',
            },
            {
              id: 'quiz-ts-l2-q4',
              type: 'multiple-choice',
              prompt: 'What does `"noEmit": true` tell the compiler?',
              options: [
                'Skip type checking and only format the files',
                'Emit only declaration files',
                'Check types but write no JavaScript output',
                'Stop after the first error',
              ],
              answer: 2,
              explanation: '`noEmit` makes `tsc` a pure checker: it reports type errors but leaves file production to a bundler such as Vite or webpack.',
            },
            {
              id: 'quiz-ts-l2-q5',
              type: 'multiple-choice',
              prompt: 'In the minimal tsconfig, what does `"include": ["src"]` control?',
              options: [
                'The folders whose files are checked',
                'The JavaScript version of the output',
                'Which modules may be imported',
                'Where the compiled files are written',
              ],
              answer: 0,
              explanation: '`include` lists the folders the compiler should read. Without it, the compiler falls back to every `.ts` file it can find in the project.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l2-d1',
            title: 'Watch mode re-checks on every save',
            body: 'This stands in for `tsc --watch`. Each press is one save; the compiler reads the whole project again and reports what it found that time.',
            html: `<button id="go">Save a file</button>
<pre id="out">Press the button to start watching.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const report = [
  'no errors',
  'error TS2322: type string is not assignable to type number',
  'no errors',
]
let save = 0

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  out.textContent = 'save ' + (save + 1) + ': ' + report[save % report.length]
  save = save + 1
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l2-intro',
            body: '**How the compiler fits in your workflow.** The TypeScript compiler, `tsc`, is the program that turns your `.ts` files into `.js` files — and that reports type errors while it does so. You rarely run it by hand: your editor runs it in the background, and your build tool runs it before shipping.',
          },
          {
            type: 'text',
            id: 'ts-l2-b2',
            body: 'A single file, `tsconfig.json`, tells the compiler what to check and what to produce. Once that file exists, running `tsc` with no arguments reads it automatically, so the project behaves the same on every machine.',
          },
          {
            type: 'heading',
            id: 'ts-l2-h1',
            level: 2,
            body: 'The smallest useful tsconfig.json',
          },
          {
            type: 'code',
            id: 'ts-l2-code',
            language: 'plaintext',
            title: 'tsconfig.json',
            code: `{
  "compilerOptions": {
    "target": "ES2022",      // how modern the output JavaScript is
    "module": "ESNext",      // keep import/export as written
    "strict": true,          // turn on every safety check
    "noEmit": true           // check types, let the bundler emit files
  },
  "include": ["src"]         // which files to check
}`,
          },
          {
            type: 'list',
            id: 'ts-l2-list',
            style: 'bullet',
            items: [
              '`strict` is the setting that matters most. It enables `strictNullChecks` and the rest of the family that finds real bugs.',
              '`include` lists the folders to check. Without it the compiler falls back to every `.ts` file it can find.',
              '`noEmit` is common in modern setups: Vite or webpack strips the types, and `tsc` is used purely as a checker.',
            ],
          },
          {
            type: 'heading',
            id: 'ts-l2-h2',
            level: 2,
            body: 'Watch mode',
          },
          {
            type: 'code',
            id: 'ts-l2-code2',
            language: 'plaintext',
            title: 'terminal',
            code: `# check once and exit
tsc --noEmit

# re-check on every save
tsc --noEmit --watch`,
          },
          {
            type: 'tip',
            id: 'ts-l2-tip',
            title: 'You already have this in your editor',
            body: 'VS Code runs the same compiler for the red squiggles under your code. The terminal command is useful in CI, where there is no editor — an error there should fail the build.',
          },
          {
            type: 'heading',
            id: 'ts-l2-h3',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l2-b3',
            body: 'A tsconfig is just data, so you can model it in TypeScript and check your understanding. Fill in a configuration that would enable strict checking on a modern project.',
          },
          {
            type: 'exercise',
            id: 'ts-l2-x1',
            exercise: {
              id: 'ex-ts-l2',
              instructions:
                'Fill the tsconfig object so the compiler would target ES2022, enable strict mode, and check the src folder.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Fill in compilerOptions, then list the folder to check.
const tsconfig = {
  compilerOptions: {
    target: '',
    strict: false,
  },
  include: [],
}
`,
              },
              tests: [
                {
                  id: 'ts-l2-t1',
                  label: 'target is ES2022',
                  body:
                    "return typeof tsconfig.compilerOptions.target === 'string' && tsconfig.compilerOptions.target.toLowerCase() === 'es2022'",
                },
                {
                  id: 'ts-l2-t2',
                  label: 'strict is enabled',
                  body: 'return tsconfig.compilerOptions.strict === true',
                },
                {
                  id: 'ts-l2-t3',
                  label: 'the src folder is included',
                  body: "return Array.isArray(tsconfig.include) && tsconfig.include.includes('src')",
                },
              ],
              hints: [
                "The target is written as a string: target: 'ES2022'.",
                'strict is a boolean, so it wants true rather than the string "true".',
                "include is an array of folder paths: include: ['src'].",
              ],
              solution: {
                typescript: `const tsconfig = {
  compilerOptions: {
    target: 'ES2022',
    strict: true,
  },
  include: ['src'],
}
`,
              },
              testNotes:
                'This checks your understanding of the configuration shape, not the compiler itself — the values you set are what a real tsconfig.json would contain.',
            },
          },
        ],
      },
      {
        id: 'ts-l3',
        title: 'Your first typed file',
        description: 'Renaming .js to .ts, adding a type annotation, and watching the error disappear.',
        duration: 6,
        objectives: [
          'Convert a JavaScript file to TypeScript',
          'Add your first type annotation to a variable',
          'Distinguish a compile error from a runtime error',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-ts-l3',
          title: 'Your first typed file quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l3-q1',
              type: 'true-false',
              prompt: 'TypeScript code runs directly in the browser without compilation.',
              answer: false,
              explanation: 'Browsers only run JavaScript. TypeScript must be compiled (transpiled) to JavaScript first.',
            },
            {
              id: 'quiz-ts-l3-q2',
              type: 'identify-error',
              prompt: 'Which line is a compile error?',
              code: 'let message: string = \'Hello\'\nmessage = 42',
              options: [
                'Nothing is wrong',
                'The second line: a number cannot be assigned to a string',
                'The first line: string needs a capital S',
                'message is a reserved word',
              ],
              answer: 1,
              explanation: 'message was annotated as a string, so assigning the number 42 is rejected before the code runs. In plain JavaScript it would silently change the type.',
            },
            {
              id: 'quiz-ts-l3-q3',
              type: 'multiple-choice',
              prompt: 'You rename `app.js` to `app.ts`. What actually changes?',
              options: [
                'The browser starts enforcing the annotations at runtime',
                'Every variable must receive an explicit annotation',
                'The file must be rewritten before it can run',
                'The JavaScript still works, but the compiler now reports type mistakes before it runs',
              ],
              answer: 3,
              explanation: 'The rename is the migration: the existing JavaScript remains valid. What you gain is a compiler that checks the file and reports mistakes before the program runs.',
            },
            {
              id: 'quiz-ts-l3-q4',
              type: 'multiple-choice',
              prompt: 'Where does a type annotation belong?',
              options: [
                'On the variable declaration (the binding)',
                'On every line that reads the variable',
                'At the top of the file, once per type',
                'Inside a comment above the variable',
              ],
              answer: 0,
              explanation: 'One annotation on the binding covers every later use in the file. Repeating the type at each read adds noise without adding any checking.',
            },
            {
              id: 'quiz-ts-l3-q5',
              type: 'multiple-choice',
              prompt: 'You annotate a value as `{ name: string }`. Why does that not guarantee `name` will exist when the data arrives?',
              options: [
                'Annotations are deleted, so the object is empty',
                '`string` allows undefined values',
                'The annotation describes the shape you promise, not the value a runtime source actually supplies',
                'Object types cannot have required properties',
              ],
              answer: 2,
              explanation: 'Types are a promise about shape, and a promise is not proof. With `strictNullChecks` the compiler makes you guard a possibly missing value before you call methods on it.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l3-d1',
            title: 'A compile error is not a runtime error',
            body: 'TypeScript can warn that `name` might be undefined before this runs, but the checker does not remove the problem. Press the button and the plain JavaScript still crashes on the missing value, caught here so you can read it.',
            html: `<button id="go">Reach into a missing value</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  const user = {}
  try {
    out.textContent = user.name.toUpperCase()
  } catch (error) {
    out.textContent = 'runtime error: ' + error.name + ' - ' + error.message
  }
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l3-intro',
            body: '**Your first typed file.** Renaming a file from `.js` to `.ts` is the whole migration. The JavaScript still works; the difference is that now a mistake like assigning a number to a variable you have called a string is reported before the program runs.',
          },
          {
            type: 'text',
            id: 'ts-l3-b2',
            body: 'An annotation is optional. TypeScript infers the type from the value you assign, so `const name = \'Ada\'` is already a string without writing anything. You add an annotation when the inference is not obvious, when you want to *constrain* a value, or when a parameter has no value to infer from.',
          },
          {
            type: 'heading',
            id: 'ts-l3-h1',
            level: 2,
            body: 'Compile errors versus runtime errors',
          },
          {
            type: 'code',
            id: 'ts-l3-code',
            language: 'typescript',
            title: 'the compiler has your back',
            code: `let message: string = 'Hello'
message = 42   // ✗ compile error: number is not assignable to string

let count = 0
count = count + 1   // ✓ inferred number, so this is fine

// A runtime error still happens at run time:
const user: { name?: string } = {}
// user.name.toUpperCase()   // compiles, but would crash — name may be undefined`,
          },
          {
            type: 'list',
            id: 'ts-l3-list',
            style: 'bullet',
            items: [
              'A **compile error** never ships. It is a promise you broke, caught early.',
              'A **runtime error** is a promise you kept about the type but not about the value — an empty array, a missing record, a `null` from an API.',
              'Annotations go on the *binding*, not on every use. One `message: string` is enough for the whole file.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l3-warn',
            title: 'Annotating is not a substitute for handling null',
            body: 'Writing `user: { name: string }` does not make the name exist. With `strictNullChecks` the compiler will force you to prove it does — usually with a guard — before you can call methods on it.',
          },
          {
            type: 'heading',
            id: 'ts-l3-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l3-b3',
            body: 'Here is the lesson of this section in one exercise: the types below are *correct*, and the function is still wrong. A type cannot check that your arithmetic is the arithmetic you meant — only that you handle the right kinds of value. Fix the body so the function does what its name promises.',
          },
          {
            type: 'exercise',
            id: 'ts-l3-x1',
            exercise: {
              id: 'ex-ts-l3',
              instructions:
                'The annotations are already right. Correct the body so add(2, 3) returns 5 instead of the wrong number.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Types are correct — the result is not.
// Make add(2, 3) return 5.
function add(a: number, b: number): number {
  return a - b
}
`,
              },
              tests: [
                {
                  id: 'ts-l3-t1',
                  label: 'add is a function',
                  body: "return typeof add === 'function'",
                },
                {
                  id: 'ts-l3-t2',
                  label: 'add(2, 3) returns the number 5',
                  body: "return typeof add(2, 3) === 'number' && add(2, 3) === 5",
                },
                {
                  id: 'ts-l3-t3',
                  label: 'add(-1, 1) returns 0',
                  body: 'return add(-1, 1) === 0',
                },
              ],
              hints: [
                'Nothing is wrong with the annotations: a: number and the : number return type are both correct.',
                'Read the body literally. The operator between the two parameters is subtraction.',
                'The fix is one character: use + so the two numbers are added.',
              ],
              solution: {
                typescript: `function add(a: number, b: number): number {
  return a + b
}
`,
              },
              testNotes:
                'The tests call your function with real numbers. They cannot see your annotations, so what they prove is the behaviour — which is the point: types describe the shape of a value, not whether the logic is right.',
            },
          },
        ],
      },
    ],
  },
]
