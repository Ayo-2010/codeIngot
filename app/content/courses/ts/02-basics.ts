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
        content: [
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
        content: [
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-ts-s2',
      title: 'TypeScript Basics check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s2-q1',
          type: 'multiple-choice',
          prompt: 'Which is NOT a primitive type in TypeScript?',
          options: ['string', 'number', 'object', 'boolean'],
          answer: 2,
          explanation:
            'object is a non-primitive (reference) type. The primitives are string, number, boolean, null, undefined, symbol, and bigint.',
        },
        {
          id: 'quiz-ts-s2-q2',
          type: 'true-false',
          prompt: 'TypeScript can always infer the type of a variable from its initial value.',
          answer: false,
          explanation:
            'Inference works when there is an initial value. Variables declared without initialization need explicit annotations.',
        },
        {
          id: 'quiz-ts-s2-q3',
          type: 'multiple-choice',
          prompt: 'What does readonly string[] mean?',
          options: [
            'An array of strings that cannot be reassigned',
            'An array of strings whose elements cannot be changed',
            'A tuple of strings',
            'An array of readonly strings',
          ],
          answer: 1,
          explanation:
            'readonly prevents mutation of the array contents (push, pop, index assignment). The variable itself can still be reassigned unless also declared const.',
        },
        {
          id: 'quiz-ts-s2-q4',
          type: 'blank',
          prompt: 'What syntax creates a tuple of exactly two elements, a string and a number?',
          answers: ['[string, number]', 'tuple<string, number>'],
          explanation: 'Tuple types use bracket syntax with comma-separated element types: [string, number].',
        },
        {
          id: 'quiz-ts-s2-q5',
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
          explanation:
            'The index signature says every property is `any`, but `name` is `string` and `age?` is `number | undefined`. The index signature value type must be a supertype of all property types.',
        },
      ],
    },
  },
]
