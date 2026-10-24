import type { Section } from '~/types/content'

export const tsBasicsSections: Section[] = [
  {
    id: 'ts-s2',
    title: 'TypeScript Basics',
    description: 'The primitive types, type inference, and the annotations you will write every day.',
    lessons: [
      {
        id: 'ts-l4',
        title: 'Primitive types and inference',
        description: 'string, number, boolean, null, undefined, and when TypeScript figures it out for you.',
        duration: 6,
        objectives: [
          'List the primitive types and write an annotation for each',
          'Explain when inference works and when it does not',
          'Choose between const and let for narrower types',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-ts-l4',
          title: 'Primitive types and inference quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l4-q1',
              type: 'true-false',
              prompt: 'TypeScript can always infer the type of a variable from its initial value.',
              answer: false,
              explanation: 'Inference works when there is an initial value. Variables declared without initialization need explicit annotations.',
            },
            {
              id: 'quiz-ts-l4-q2',
              type: 'multiple-choice',
              prompt: 'Which annotation correctly describes a true/false value?',
              options: [
                'ready: Boolean',
                'ready: bool',
                'ready: boolean',
                'ready: Bool',
              ],
              answer: 2,
              explanation: 'The primitive is written lowercase: `boolean`. The capitalised `Boolean` is the object wrapper type and is almost never what you want in an annotation.',
            },
            {
              id: 'quiz-ts-l4-q3',
              type: 'multiple-choice',
              prompt: 'What types does TypeScript infer for `const edition = \'first\'` and `let reprint = \'first\'`?',
              options: [
                'Both are `string`',
                '`edition` is the literal `\'first\'`; `reprint` is `string`',
                'Both are the literal `\'first\'`',
                '`edition` is `string`; `reprint` is `\'first\'`',
              ],
              answer: 1,
              explanation: 'A `const` can never be reassigned, so its literal value is safe to keep as a type. A `let` may change, so the compiler widens it to `string`.',
            },
            {
              id: 'quiz-ts-l4-q4',
              type: 'multiple-choice',
              prompt: 'Why are `string` and `String` not interchangeable in an annotation?',
              options: [
                '`String` is not valid TypeScript',
                'They differ only in older compiler versions',
                '`string` can only hold string literals',
                '`String` is the object wrapper type; the primitive is written lowercase `string`',
              ],
              answer: 3,
              explanation: '`typeof "hi"` is `"string"`, so the lowercase name is the one that matches real values. `String` names the boxed object, which behaves differently in comparisons.',
            },
            {
              id: 'quiz-ts-l4-q5',
              type: 'multiple-choice',
              prompt: 'Which declaration cannot rely on inference and needs an annotation?',
              options: [
                '`const title = \'Dune\'`',
                '`let pages = 412`',
                '`let subtitle`',
                '`const inPrint = true`',
              ],
              answer: 2,
              explanation: 'Inference reads the value on the right of the `=`. A declaration with no initial value has nothing to learn from, so you must state the type yourself.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l4-d1',
            title: 'Only the runtime value survives',
            body: 'These values were written with annotations and inference, but at runtime the types are erased. `typeof` is the closest thing that remains — and it reports the value, not what you promised.',
            html: `<button id="go">Report the runtime types</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  const title = 'Dune'
  const pages = 412
  const inPrint = true
  const subtitle = undefined
  out.textContent = [
    'title -> ' + typeof title,
    'pages -> ' + typeof pages,
    'inPrint -> ' + typeof inPrint,
    'subtitle -> ' + typeof subtitle,
  ].join('\\n')
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l4-intro',
            body: '**Primitive types and inference.** The primitive types are the atoms of the type system: `string`, `number`, `boolean`, `null`, `undefined`, `symbol` and `bigint`. You write them in lowercase — `string`, never `String`. The uppercase versions are the object wrappers and are almost never what you want.',
          },
          {
            type: 'text',
            id: 'ts-l4-b2',
            body: 'Inference means you usually do not write them at all. TypeScript reads the value on the right and works out the type on the left, so `const title = \'Dune\'` is already a string. Annotate when there is no value to infer from — a function parameter — or when you want to be stricter than the value alone would be.',
          },
          {
            type: 'heading',
            id: 'ts-l4-h1',
            level: 2,
            body: 'Inference in practice',
          },
          {
            type: 'code',
            id: 'ts-l4-code',
            language: 'typescript',
            title: 'what the compiler infers',
            code: `let title = 'Dune'      // inferred string
let pages = 412         // inferred number
let inPrint = true      // inferred boolean

const edition = 'first' // inferred the literal 'first', not string
let reprint = 'first'   // inferred string (let may be reassigned)

// No value to learn from, so the annotation is required:
function format(pages: number, title: string) {
  return title + ' (' + pages + ' pages)'
}

// A variable with no value needs one too:
let subtitle: string | undefined`,
          },
          {
            type: 'list',
            id: 'ts-l4-list',
            style: 'bullet',
            items: [
              '`const` infers the narrow literal (`\'first\'`); `let` widens to `string` because it can change.',
              'Parameters have nothing to infer from — always annotate them.',
              'A variable declared without a value has no inferred type, so give it one: `let subtitle: string | undefined`.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l4-tip',
            title: 'Let inference do the typing',
            body: 'Add annotations at the boundaries — parameters, return types on exported functions, and empty containers — and let the compiler infer the rest. A file where every local repeats its type is noisier than plain JavaScript and catches nothing extra.',
          },
          {
            type: 'heading',
            id: 'ts-l4-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l4-b3',
            body: 'Fill in values that match each annotation, then bundle them into an object. The object is inferred — no annotation needed there.',
          },
          {
            type: 'exercise',
            id: 'ts-l4-x1',
            exercise: {
              id: 'ex-ts-l4',
              instructions:
                'Set title to a non-empty string, pages to a positive number and inPrint to a boolean, then make book bundle all three.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Fill each value in so it matches its annotation.
const title: string = ''
const pages: number = 0
const inPrint: boolean = false

// Bundle them. The object needs no annotation of its own.
const book = { title, pages, inPrint }
`,
              },
              tests: [
                { id: 'ts-l4-t1', label: 'title is a non-empty string', body: "return typeof title === 'string' && title.length > 0" },
                { id: 'ts-l4-t2', label: 'pages is a positive number', body: "return typeof pages === 'number' && pages > 0" },
                { id: 'ts-l4-t3', label: 'inPrint is a boolean', body: "return typeof inPrint === 'boolean'" },
                {
                  id: 'ts-l4-t4',
                  label: 'book bundles all three values',
                  body: 'return !!book && book.title === title && book.pages === pages && book.inPrint === inPrint',
                },
              ],
              hints: [
                "title is a string, so use quotes: title = 'something'.",
                'pages already has the type number from its annotation — only the value is missing.',
                'inPrint is a boolean, so true or false works; the tests accept either, they only check the type.',
              ],
              solution: {
                typescript: `const title: string = 'Dune'
const pages: number = 412
const inPrint: boolean = true

const book = { title, pages, inPrint }
`,
              },
              testNotes:
                'The tests check both the value and its runtime type. They cannot see your annotations, so they prove the value is the kind of thing the annotation allowed.',
            },
          },
        ],
      },
      {
        id: 'ts-l5',
        title: 'Arrays, tuples and readonly',
        description: 'Typing lists, fixed-length tuples, and preventing mutation with readonly.',
        duration: 6,
        objectives: [
          'Write string[] and Array<string> for arrays',
          'Create a tuple with a fixed number of elements',
          'Use readonly to make arrays and tuples immutable',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-ts-l5',
          title: 'Arrays, tuples and readonly quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l5-q1',
              type: 'multiple-choice',
              prompt: 'What does readonly string[] mean?',
              options: [
                'An array of strings that cannot be reassigned',
                'An array of strings whose elements cannot be changed',
                'A tuple of strings',
                'An array of readonly strings',
              ],
              answer: 1,
              explanation: 'readonly prevents mutation of the array contents (push, pop, index assignment). The variable itself can still be reassigned unless also declared const.',
            },
            {
              id: 'quiz-ts-l5-q2',
              type: 'blank',
              prompt: 'What syntax creates a tuple of exactly two elements, a string and a number?',
              answers: [
                '[string, number]',
                'tuple<string, number>',
              ],
              explanation: 'Tuple types use bracket syntax with comma-separated element types: [string, number].',
            },
            {
              id: 'quiz-ts-l5-q3',
              type: 'identify-error',
              prompt: 'What is wrong with this assignment?',
              code: 'const point: [number, number] = [3, 4, 5]',
              options: [
                'Nothing is wrong',
                'The tuple type allows exactly two numbers, but three are supplied',
                'Tuple elements must be strings',
                'The array needs the `Array<>` syntax',
              ],
              answer: 1,
              explanation: 'A tuple records a type per position and therefore a fixed length. `[number, number]` permits two entries, so the third element is rejected.',
            },
            {
              id: 'quiz-ts-l5-q4',
              type: 'multiple-choice',
              prompt: 'Which two array types mean the same thing?',
              options: [
                '`number[]` and `Array<number>`',
                '`number[]` and `[number]`',
                '`number[]` and `readonly number[]`',
                '`Array<number>` and `[number, number]`',
              ],
              answer: 0,
              explanation: '`number[]` is shorthand for `Array<number>`; both describe a list of any length whose elements are numbers. The other pairs differ in length or mutability.',
            },
            {
              id: 'quiz-ts-l5-q5',
              type: 'code-output',
              prompt: 'What are the types of `label` and `value` after this destructuring?',
              code: 'const pair: [string, number] = [\'Ada\', 36]\nconst [label, value] = pair',
              options: [
                '`label` is number, `value` is string',
                '`label` is string, `value` is number',
                'Both are string',
                'Both are `any`',
              ],
              answer: 1,
              explanation: 'Destructuring a tuple carries the type of each position with it. The first element was declared string and the second number, and that survives the unpacking.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l5-d1',
            title: 'readonly is a compile-time promise',
            body: 'The array below is annotated `readonly`, which would make `push` a compile error. At runtime that annotation is gone, so the array is a normal array and the push succeeds. A tuple is likewise just a plain array, unpacked here by position.',
            html: `<button id="go">Push and unpack</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  const locked = ['a', 'b']
  locked.push('c')

  const pair = ['Ada', 36]
  const label = pair[0]
  const value = pair[1]

  out.textContent = 'after push: ' + locked.join(', ') + '\\ntuple parts: ' + label + ' / ' + value
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l5-intro',
            body: '**Arrays, tuples and readonly.** An array type records the type of every element: `number[]` (or its long form, `Array<number>`) is a list of numbers. The compiler then knows that `prices[0]` is a number, and it rejects a push of anything else.',
          },
          {
            type: 'text',
            id: 'ts-l5-b2',
            body: 'A tuple is an array with a fixed length and a type per position: `[number, number]` is exactly two numbers. Tuples are how you return more than one value without inventing an object — a coordinate, a min-and-max pair, a key and its value.',
          },
          {
            type: 'heading',
            id: 'ts-l5-h1',
            level: 2,
            body: 'Arrays and tuples',
          },
          {
            type: 'code',
            id: 'ts-l5-code',
            language: 'typescript',
            title: 'lists that know their contents',
            code: `const ids: number[] = [1, 2, 3]
const names: Array<string> = ['Ada', 'Grace']   // same as string[]

const pair: [string, number] = ['Ada', 36]      // exactly two entries
const point: [number, number] = [3, 4]

// A tuple element is narrowed by position:
const [label, value] = pair   // label: string, value: number

// readonly stops the array being changed after it is created:
const locked: readonly string[] = ['a', 'b']
// locked.push('c')   // ✗ compile error`,
          },
          {
            type: 'list',
            id: 'ts-l5-list',
            style: 'bullet',
            items: [
              '`number[]` and `Array<number>` mean the same thing; pick one and be consistent.',
              'A tuple names a type per position, so destructuring carries those types with it.',
              '`readonly` removes the mutating methods (`push`, `pop`, index assignment) from the type.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l5-warn',
            title: 'A tuple is a promise about length',
            body: 'TypeScript checks `[number, number]` at the point you build it, but the runtime array is still a plain array. Assigning a tuple to a variable then pushing onto it is caught as a type error — which is exactly the value of the tuple.',
          },
          {
            type: 'heading',
            id: 'ts-l5-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l5-b3',
            body: 'Return two numbers from one function using a tuple: the smallest and largest value in a list.',
          },
          {
            type: 'exercise',
            id: 'ts-l5-x1',
            exercise: {
              id: 'ex-ts-l5',
              instructions:
                'Write minMax(numbers) so it returns a two-element tuple [smallest, largest]. Assume the list is never empty.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Return [smallest, largest] as a tuple.
function minMax(numbers: number[]): [number, number] {
  return [0, 0]
}
`,
              },
              tests: [
                { id: 'ts-l5-t1', label: 'minMax([3, 1, 2]) is [1, 3]', body: "return JSON.stringify(minMax([3, 1, 2])) === '[1,3]'" },
                { id: 'ts-l5-t2', label: 'it handles negative numbers', body: "return JSON.stringify(minMax([-5, -1, -9])) === '[-9,-1]'" },
                { id: 'ts-l5-t3', label: 'a single element is both ends', body: "return JSON.stringify(minMax([7])) === '[7,7]'" },
              ],
              hints: [
                'Math.min and Math.max do the work — the tuple is just how you return both.',
                'Both take a list of numbers, not an array, so spread it: Math.min(...numbers).',
                'Return them in order: small first, large second, as [small, large].',
              ],
              solution: {
                typescript: `function minMax(numbers: number[]): [number, number] {
  return [Math.min(...numbers), Math.max(...numbers)]
}
`,
              },
              testNotes:
                'The tests compare the returned pair position by position. A tuple type would reject returning a single number or three of them — the tests confirm the order is right.',
            },
          },
        ],
      },
      {
        id: 'ts-l6',
        title: 'Objects, optional properties and index signatures',
        description: 'Object types, optional ? properties, and indexing when keys are dynamic.',
        duration: 6,
        objectives: [
          'Write an inline object type with required and optional fields',
          'Explain what an index signature does and when to use it',
          'Distinguish excess property checks from structural typing',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-ts-l6',
          title: 'Objects, optional properties and index signatures quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l6-q1',
              type: 'identify-error',
              prompt: 'What is the issue with this type?',
              code: 'type User = {\n  name: string\n  age?: number\n  [key: string]: any\n}',
              options: [
                'Nothing is wrong',
                'Optional property must come after index signature',
                'Index signature value type must be compatible with all properties',
                'Cannot mix optional properties with index signatures',
              ],
              answer: 2,
              explanation: 'The index signature says every property is `any`, but `name` is `string` and `age?` is `number | undefined`. The index signature value type must be a supertype of all property types.',
            },
            {
              id: 'quiz-ts-l6-q2',
              type: 'true-false',
              prompt: '`age?: number` is shorthand for `age: number | undefined`.',
              answer: true,
              explanation: 'The question mark means the property may be absent or undefined, so its read type is a union with `undefined`. That is why you must guard before using it.',
            },
            {
              id: 'quiz-ts-l6-q3',
              type: 'multiple-choice',
              prompt: 'When is an index signature the right tool?',
              options: [
                'When every key is known in advance',
                'When the object must have a fixed length',
                'When values may be of several unrelated types',
                'When an object has dynamic keys, such as word counts',
              ],
              answer: 3,
              explanation: 'An index signature describes an object whose keys you cannot list ahead of time, like a word count. For a record with known fields, listing them explicitly is safer.',
            },
            {
              id: 'quiz-ts-l6-q4',
              type: 'multiple-choice',
              prompt: 'Inside `greet(user: User)`, where `User` has `age?: number`, what type does `user.age` have?',
              options: [
                'number',
                'any',
                'number | undefined',
                'never',
              ],
              answer: 2,
              explanation: 'An optional property may be missing, so reading it produces `T | undefined`. The compiler then requires a check before you can treat it as a number.',
            },
            {
              id: 'quiz-ts-l6-q5',
              type: 'multiple-choice',
              prompt: 'For keys that are added and removed at runtime, why does the lesson prefer `Map<string, number>`?',
              options: [
                'A Map keeps its key and value types as you iterate it and is clearer for changing keys',
                'A Map is the only type that supports string keys',
                'A Map stores values as strings automatically',
                'An index signature cannot describe JSON-shaped data',
              ],
              answer: 0,
              explanation: 'A `Map` carries its key and value types through iteration and makes runtime addition and removal explicit. An index signature is best for plain JSON-shaped records.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l6-d1',
            title: 'Guard an optional key, then count words',
            body: 'The object type says `age` may be missing, so the code checks before using it. The word counter is the index-signature shape: any string key maps to a number. Both are still plain objects once the types are erased.',
            html: `<button id="go">Greet and count</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  const user = { name: 'Ada' }
  const greeting = user.age === undefined
    ? 'Hello, ' + user.name
    : 'Hello, ' + user.name + ' (' + user.age + ')'

  const counts = {}
  const words = 'a b a'.split(' ')
  for (const word of words) {
    counts[word] = (counts[word] || 0) + 1
  }

  out.textContent = greeting + '\\ncounts: ' + JSON.stringify(counts)
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l6-intro',
            body: '**Objects, optional properties and index signatures.** Most data in a real program is an object, and an object type describes which keys it has and what each one holds: `{ name: string; age: number }`. TypeScript checks that you only reach for keys that exist.',
          },
          {
            type: 'text',
            id: 'ts-l6-b2',
            body: 'A question mark makes a key optional: `{ name: string; age?: number }` means `age` may be missing or undefined, so the compiler forces you to handle that before using it. An index signature covers the opposite case — an object whose keys you do not know in advance, like a word count.',
          },
          {
            type: 'heading',
            id: 'ts-l6-h1',
            level: 2,
            body: 'Object types and index signatures',
          },
          {
            type: 'code',
            id: 'ts-l6-code',
            language: 'typescript',
            title: 'named keys, optional keys, and open keys',
            code: `type User = {
  name: string
  age?: number            // optional: may be absent
}

function greet(user: User) {
  // user.age is number | undefined here, so guard before using it:
  return user.age === undefined
    ? 'Hello, ' + user.name
    : 'Hello, ' + user.name + ' (' + user.age + ')'
}

// An index signature says every key maps to a value of one type:
type WordCount = { [word: string]: number }

const counts: WordCount = {}
counts['hello'] = 1        // any string key is allowed`,
          },
          {
            type: 'list',
            id: 'ts-l6-list',
            style: 'bullet',
            items: [
              '`age?: number` is shorthand for `age: number | undefined`.',
              'Reading an optional property gives `T | undefined`, so narrowing comes first.',
              'An index signature `{ [key: string]: number }` lets you read and write any string key — good for maps, risky for records with known fields.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l6-tip',
            title: 'Prefer a Map for truly dynamic keys',
            body: 'When keys are added and removed at runtime, a `Map<string, number>` is usually clearer than an index signature, and it carries its type through iteration. Reach for the index signature when you are describing plain JSON-shaped data.',
          },
          {
            type: 'heading',
            id: 'ts-l6-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l6-b3',
            body: 'Build the classic index-signature example: count how often each word appears in a sentence.',
          },
          {
            type: 'exercise',
            id: 'ts-l6-x1',
            exercise: {
              id: 'ex-ts-l6',
              instructions:
                'Write wordCount(text) that returns an object mapping each whitespace-separated word to how many times it appears.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Return { word: count } for every word in the text.
function wordCount(text: string): { [word: string]: number } {
  return {}
}
`,
              },
              tests: [
                {
                  id: 'ts-l6-t1',
                  label: 'counts a repeated word',
                  body: "const c = wordCount('a b a'); return c.a === 2 && c.b === 1",
                },
                {
                  id: 'ts-l6-t2',
                  label: 'handles a single word',
                  body: "const c = wordCount('solo'); return c.solo === 1 && Object.keys(c).length === 1",
                },
                {
                  id: 'ts-l6-t3',
                  label: 'empty text gives an empty object',
                  body: 'return Object.keys(wordCount(\'\')).length === 0',
                },
              ],
              hints: [
                'Start with an empty object and a loop over the words.',
                'Split on whitespace with text.split(\' \'), then read and update a count per word.',
                'Guard the increment so a missing key starts at zero: counts[word] = (counts[word] || 0) + 1.',
              ],
              solution: {
                typescript: `function wordCount(text: string): { [word: string]: number } {
  const counts: { [word: string]: number } = {}
  const words = text.split(' ').filter((word) => word.length > 0)

  for (const word of words) {
    counts[word] = (counts[word] || 0) + 1
  }

  return counts
}
`,
              },
              testNotes:
                'The tests read named keys from the returned object. The index signature is what tells the compiler those dynamic keys are numbers.',
            },
          },
        ],
      },
      {
        id: 'ts-l7',
        title: 'Union and intersection types',
        description: 'Combining types with | and &, and narrowing with type guards.',
        duration: 6,
        objectives: [
          'Create a union type and narrow it with typeof',
          'Create an intersection type to merge object shapes',
          'Use a discriminant property for exhaustive narrowing',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-ts-l7',
          title: 'Union and intersection types quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l7-q1',
              type: 'multiple-choice',
              prompt: 'Which is NOT a primitive type in TypeScript?',
              options: [
                'string',
                'number',
                'object',
                'boolean',
              ],
              answer: 2,
              explanation: 'object is a non-primitive (reference) type. The primitives are string, number, boolean, null, undefined, symbol, and bigint.',
            },
            {
              id: 'quiz-ts-l7-q2',
              type: 'multiple-choice',
              prompt: 'What does the type `{ a: number } & { b: number }` require?',
              options: [
                'Either an `a` or a `b`, but not both',
                'An object with no extra keys',
                'An array of two numbers',
                'Both an `a` and a `b`',
              ],
              answer: 3,
              explanation: 'An intersection means "all of these at once", so for object shapes the members combine. A union written with `|` would be the "either" version.',
            },
            {
              id: 'quiz-ts-l7-q3',
              type: 'multiple-choice',
              prompt: 'Which check narrows a `string | number` so you can call string methods?',
              options: [
                '`Array.isArray(value)`',
                '`value instanceof Number`',
                '`typeof value === \'string\'`',
                '`\'length\' in value`',
              ],
              answer: 2,
              explanation: '`typeof` is the guard for primitive unions. Inside that branch the compiler treats the value as a string and allows `.toUpperCase()` and friends.',
            },
            {
              id: 'quiz-ts-l7-q4',
              type: 'multiple-choice',
              prompt: 'What makes a discriminated union work?',
              options: [
                'Every member shares a literal property with a different value',
                'Every member is optional',
                'Every member has an index signature',
                'Every member uses the same object type',
              ],
              answer: 0,
              explanation: 'A shared literal key such as `status` lets one equality check select a branch. The compiler then knows exactly which members exist in that branch.',
            },
            {
              id: 'quiz-ts-l7-q5',
              type: 'code-output',
              prompt: 'What does this function return for `idLabel(\'ab\')`?',
              code: 'function idLabel(id: string | number) {\n  return typeof id === \'string\' ? id.toUpperCase() : \'#\' + id\n}',
              options: [
                '\'#ab\'',
                '\'AB\'',
                '\'ab\'',
                'undefined',
              ],
              answer: 1,
              explanation: 'The guard selects the string branch, where `toUpperCase()` turns `\'ab\'` into `\'AB\'`. The number branch with the `#` prefix is never reached.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l7-d1',
            title: 'Narrow with typeof, merge with &',
            body: 'A union is one of several types and a guard picks which; an intersection carries all the shapes at once. At runtime these are just a `typeof` check and merged keys — the unions and intersections were erased.',
            html: `<button id="go">Narrow a union, merge two shapes</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  function describe(value) {
    return typeof value === 'string' ? 'text: ' + value : 'number: ' + value
  }

  const merged = Object.assign({}, { name: 'Ada' }, { age: 36 })

  out.textContent = describe('hi') + '\\n' + describe(3) + '\\nmerged keys: ' + Object.keys(merged).join(', ')
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l7-intro',
            body: '**Union and intersection types.** A union says a value is one of several types: `string | number`. An intersection says it is all of them at once, which for object types means combined: `{ a: number } & { b: number }` has both keys. Unions are by far the more common of the two.',
          },
          {
            type: 'text',
            id: 'ts-l7-b2',
            body: 'Before you can use a union, you have to *narrow* it — prove which member you are holding. `typeof`, `Array.isArray`, a comparison, or the presence of a shared key all narrow a union inside an `if`. After the check, the compiler treats the value as the narrowed type only.',
          },
          {
            type: 'heading',
            id: 'ts-l7-h1',
            level: 2,
            body: 'Narrowing a union',
          },
          {
            type: 'code',
            id: 'ts-l7-code',
            language: 'typescript',
            title: 'one value, several possible shapes',
            code: `type Id = string | number

function idLabel(id: Id): string {
  if (typeof id === 'string') {
    // here id is string, so .toUpperCase() is allowed
    return id.toUpperCase()
  }
  // here id is number
  return '#' + id
}

// A discriminated union: a shared literal key picks the branch.
type Result =
  | { status: 'ok'; value: number }
  | { status: 'error'; message: string }

function render(result: Result): string {
  return result.status === 'ok' ? String(result.value) : result.message
}`,
          },
          {
            type: 'list',
            id: 'ts-l7-list',
            style: 'bullet',
            items: [
              '`typeof` narrows primitives; `Array.isArray`, `in` and equality narrow the rest.',
              'A **discriminated union** gives every member a shared literal key (`status`) so one check selects a branch.',
              'Intersections (`&`) merge object shapes; they are not the same as "either", which is what a union means.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l7-tip',
            title: 'Unions replace flags and optional soup',
            body: 'Two booleans can express four states, only three of which make sense. A discriminated union of three members makes the impossible state unrepresentable — and the compiler will tell you if you forget to handle one.',
          },
          {
            type: 'heading',
            id: 'ts-l7-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l7-b3',
            body: 'Write a function that accepts a union and returns a different answer per member, using a guard to narrow.',
          },
          {
            type: 'exercise',
            id: 'ts-l7-x1',
            exercise: {
              id: 'ex-ts-l7',
              instructions:
                "Write describe(value) for a string | number. Return 'text' when it is a string and 'number' when it is a number.",
              languages: ['typescript'],
              starterCode: {
                typescript: `// Narrow the union, then return the right word.
function describe(value: string | number): string {
  return ''
}
`,
              },
              tests: [
                { id: 'ts-l7-t1', label: "describe('hi') is 'text'", body: "return describe('hi') === 'text'" },
                { id: 'ts-l7-t2', label: 'describe(3) is \'number\'', body: "return describe(3) === 'number'" },
                { id: 'ts-l7-t3', label: 'describe(3.5) is \'number\'', body: "return describe(3.5) === 'number'" },
                { id: 'ts-l7-t4', label: "describe('') is 'text'", body: "return describe('') === 'text'" },
              ],
              hints: [
                'A single guard is enough: typeof value === "string".',
                'Return early for the string case, then return the other value for the number case.',
                'Return exactly the words text and number — the tests compare them as strings.',
              ],
              solution: {
                typescript: `function describe(value: string | number): string {
  return typeof value === 'string' ? 'text' : 'number'
}
`,
              },
              testNotes:
                'The tests pass a string and two numbers. They prove the branch you take is driven by typeof, which is the guard the union needs.',
            },
          },
        ],
      },
    ],
  },
]
