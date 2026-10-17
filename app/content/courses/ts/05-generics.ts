import type { Section } from '~/types/content'

export const tsGenericsSections: Section[] = [
  {
    id: 'ts-s5',
    title: 'Generics',
    description: 'Writing reusable components that work with any type while preserving type safety.',
    lessons: [
      {
        id: 'ts-l14',
        title: 'Generic functions and type parameters',
        description: 'Angle brackets, type parameter constraints, and inference at call sites.',
        duration: 6,
        objectives: [
          'Write a generic function with a type parameter',
          'Add a constraint with extends',
          'Let TypeScript infer the type argument from the call',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'ts-l14-intro',
            body: '**Generic functions and type parameters.** A generic is a function that works for many types while remembering *which* type it is working with. The placeholder in the angle brackets — `<T>` — stands in for whatever the caller passes, and the compiler keeps track of it.',
          },
          {
            type: 'text',
            id: 'ts-l14-b2',
            body: 'Without generics you would reach for `any`, which throws the type information away: the function accepts anything and returns an untyped anything. A type parameter preserves the link between input and output, so `wrap(42)` is a number and `wrap(’hi’)` is a string, from the same code.',
          },
          {
            type: 'heading',
            id: 'ts-l14-h1',
            level: 2,
            body: 'A placeholder that keeps its identity',
          },
          {
            type: 'code',
            id: 'ts-l14-code',
            language: 'typescript',
            title: 'type parameters and constraints',
            code: `function wrap<T>(value: T): T {
  return value
}

wrap<string>('hi')      // T given explicitly
wrap(42)                // T inferred as number

// A constraint says what T must at least be:
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}

longest('ab', 'abc')    // 'abc'
longest([1, 2], [1])    // [1, 2]`,
          },
          {
            type: 'list',
            id: 'ts-l14-list',
            style: 'bullet',
            items: [
              '`<T>` names a type the caller supplies; call sites usually have it inferred for them.',
              '`extends` constrains what `T` may be, so the body is allowed to use the members it guarantees.',
              'Type parameters are erased at runtime — generics cost nothing and produce the same JavaScript.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l14-tip',
            title: 'A generic should link two positions',
            body: 'If a type parameter appears only once, it is not really doing anything — you have written a fancy `any`. Generics earn their place when the input type determines the output type, as in `wrap<T>(value: T): T`.',
          },
          {
            type: 'heading',
            id: 'ts-l14-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l14-b3',
            body: 'Write your first generic function: return the first element of any array, or undefined when it is empty.',
          },
          {
            type: 'exercise',
            id: 'ts-l14-x1',
            exercise: {
              id: 'ex-ts-l14',
              instructions:
                'Write first(items) so it returns the first element of the array, or undefined if the array is empty. It must work for arrays of numbers and arrays of strings.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Return the first item, or undefined when there is none.
function first<T>(items: T[]): T | undefined {
  return undefined
}
`,
              },
              tests: [
                { id: 'ts-l14-t1', label: 'first([1, 2, 3]) is 1', body: 'return first([1, 2, 3]) === 1' },
                { id: 'ts-l14-t2', label: 'first([]) is undefined', body: 'return first([]) === undefined' },
                { id: 'ts-l14-t3', label: 'it works for strings too', body: "return first(['a', 'b']) === 'a'" },
                { id: 'ts-l14-t4', label: 'a single-element array returns that element', body: 'return first([9]) === 9' },
              ],
              hints: [
                'Arrays are indexed from zero, so the first element is items[0].',
                'The empty array case already works: items[0] is undefined when there is nothing there.',
                'Return items[0] — that single expression covers both the filled and the empty case.',
              ],
              solution: {
                typescript: `function first<T>(items: T[]): T | undefined {
  return items[0]
}
`,
              },
              testNotes:
                'The same function is called with numbers and with strings. That it answers correctly for both is the whole point of the type parameter.',
            },
          },
        ],
      },
      {
        id: 'ts-l15',
        title: 'Generic interfaces and classes',
        description: 'Parameterising interfaces and classes, and default type arguments.',
        duration: 5,
        objectives: [
          'Define a generic interface like Box<T>',
          'Write a generic class with a type parameter',
          'Provide a default so callers can omit the argument',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'ts-l15-intro',
            body: '**Generic interfaces and classes.** The same placeholder works on interfaces and classes. `interface Box<T> { value: T }` describes a container whose contents you choose at the point of use: `Box<number>` or `Box<User>`.',
          },
          {
            type: 'text',
            id: 'ts-l15-b2',
            body: 'A generic class carries the parameter through all of its methods. `class Store<T>` with an `add(item: T)` method means a `Store<string>` will only ever accept strings — the container remembers what it holds. You can also give the parameter a default, so a caller who does not care can leave it out.',
          },
          {
            type: 'heading',
            id: 'ts-l15-h1',
            level: 2,
            body: 'Containers that remember their contents',
          },
          {
            type: 'code',
            id: 'ts-l15-code',
            language: 'typescript',
            title: 'generic interface, class, and default',
            code: `interface Box<T> {
  value: T
}

const numeric: Box<number> = { value: 42 }

class Store<T> {
  items: T[] = []

  add(item: T): void {
    this.items.push(item)
  }
}

const names = new Store<string>()
names.add('Ada')          // ok
// names.add(42)          // ✗ number is not a string

// A default is used when the caller omits the argument:
interface Response<T = unknown> {
  data: T
}

const empty: Response = { data: {} }`,
          },
          {
            type: 'list',
            id: 'ts-l15-list',
            style: 'bullet',
            items: [
              'The type argument is written once on the interface or class and flows to every member.',
              '`new Store<string>()` fixes `T` for the life of that instance.',
              'A default (`<T = unknown>`) keeps the type usable without an argument while staying honest.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l15-warn',
            title: 'Box<T> is a type, not a class',
            body: 'Nothing named `Box` exists once the code runs — the interface vanishes with the rest of the types. If you need a value you can construct, make it a class; the interface is only a description.',
          },
          {
            type: 'heading',
            id: 'ts-l15-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l15-b3',
            body: 'Build a small generic container. A stack is last-in, first-out: whatever you pushed most recently, you pop first.',
          },
          {
            type: 'exercise',
            id: 'ts-l15-x1',
            exercise: {
              id: 'ex-ts-l15',
              instructions:
                'Complete the Stack class. push(item) adds an item on top; pop() removes and returns the most recent item, or undefined when the stack is empty.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// A last-in, first-out container.
class Stack<T> {
  items: T[] = []

  push(item: T): void {
    // add the item on top
  }

  pop(): T | undefined {
    return undefined
  }
}
`,
              },
              tests: [
                {
                  id: 'ts-l15-t1',
                  label: 'a new stack is empty',
                  body: 'const s = new Stack(); return s.pop() === undefined',
                },
                {
                  id: 'ts-l15-t2',
                  label: 'pop returns the most recently pushed item',
                  body: 'const s = new Stack(); s.push(1); s.push(2); return s.pop() === 2',
                },
                {
                  id: 'ts-l15-t3',
                  label: 'items come back in reverse order',
                  body: 'const s = new Stack(); s.push(1); s.push(2); s.push(3); return s.pop() === 3 && s.pop() === 2 && s.pop() === 1 && s.pop() === undefined',
                },
                {
                  id: 'ts-l15-t4',
                  label: 'it works with strings too',
                  body: "const s = new Stack(); s.push('a'); s.push('b'); return s.pop() === 'b'",
                },
              ],
              hints: [
                'You already have an items array on the class; this.items is that array.',
                'push is just this.items.push(item).',
                'pop is this.items.pop() — JavaScript arrays already pop from the end, which is the top of the stack.',
              ],
              solution: {
                typescript: `class Stack<T> {
  items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }
}
`,
              },
              testNotes:
                'The tests build stacks of numbers and of strings from the same class. The empty case at the start proves pop returns undefined rather than throwing.',
            },
          },
        ],
      },
      {
        id: 'ts-l16',
        title: 'Generic constraints and conditional types',
        description: 'Narrowing what a type parameter can be, and choosing types with extends.',
        duration: 6,
        objectives: [
          'Constrain a type parameter to a specific shape',
          'Write a conditional type T extends U ? X : Y',
          'Distribute a conditional type over a union',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'ts-l16-intro',
            body: '**Generic constraints and conditional types.** A free type parameter can be anything, which means the body cannot use any of its members — the compiler cannot know they exist. A constraint narrows the field: `<T extends { length: number }>` promises that whatever T turns out to be, it has a length.',
          },
          {
            type: 'text',
            id: 'ts-l16-b2',
            body: 'The same `extends` keyword powers conditional types. `T extends string ? X : Y` is a type that resolves to X or Y depending on T. These live entirely in the type system — they choose a type, not a value — and they are how the standard utility types such as `Pick` and `ReturnType` are built.',
          },
          {
            type: 'heading',
            id: 'ts-l16-h1',
            level: 2,
            body: 'Constraints at runtime, conditionals in the type system',
          },
          {
            type: 'code',
            id: 'ts-l16-code',
            language: 'typescript',
            title: 'constrain, then choose a type',
            code: `// T is only allowed to be something with a length:
function logLength<T extends { length: number }>(item: T): number {
  return item.length
}

logLength('hello')        // 5
logLength([1, 2, 3])      // 3

// Conditional types select a type based on another:
type IsString<T> = T extends string ? 'yes' : 'no'

type A = IsString<string>          // 'yes'
type B = IsString<number>          // 'no'
type C = IsString<string | Date>   // 'yes' | 'no'  (distributes over the union)`,
          },
          {
            type: 'list',
            id: 'ts-l16-list',
            style: 'bullet',
            items: [
              'A constraint (`extends`) is checked at the call site, so an incompatible argument is a compile error.',
              'A conditional type resolves to one type or another — it produces no runtime code at all.',
              'Conditional types **distribute** over unions: `IsString<string | Date>` applies to each member.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l16-tip',
            title: 'Constraints let you use what you require',
            body: 'Inside a generic body you can only touch what every possible T is guaranteed to have. The constraint is how you widen that guarantee — ask for a length, an id, or a name, and then you may use it.',
          },
          {
            type: 'heading',
            id: 'ts-l16-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l16-b3',
            body: 'Use a constraint to write one function that works for strings, arrays, and any other value that has a length.',
          },
          {
            type: 'exercise',
            id: 'ts-l16-x1',
            exercise: {
              id: 'ex-ts-l16',
              instructions:
                'Write longest(a, b) so it returns whichever argument has the greater length. Assume the two are never equal.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Return the argument with the greater length.
function longest<T extends { length: number }>(a: T, b: T): T {
  return a
}
`,
              },
              tests: [
                { id: 'ts-l16-t1', label: "longest('ab', 'abc') is 'abc'", body: "return longest('ab', 'abc') === 'abc'" },
                { id: 'ts-l16-t2', label: 'it works for arrays', body: 'return longest([1, 2], [1, 2, 3]).length === 3' },
                { id: 'ts-l16-t3', label: 'the smaller one loses', body: "return longest('abc', 'ab') === 'abc'" },
                {
                  id: 'ts-l16-t4',
                  label: 'it works for any object with a length',
                  body: 'const longer = longest({ length: 5 }, { length: 2 }); return longer.length === 5',
                },
              ],
              hints: [
                'Both arguments are guaranteed to have a length, so compare a.length and b.length.',
                'Return a when it is longer, otherwise b.',
                'One line does it: return a.length >= b.length ? a : b.',
              ],
              solution: {
                typescript: `function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}
`,
              },
              testNotes:
                'The last check passes plain objects with only a length property — exactly the shape the constraint asked for, and nothing more.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-ts-s5',
      title: 'Generics check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s5-q1',
          type: 'multiple-choice',
          prompt: 'What does function identity<T>(value: T): T mean?',
          options: [
            'A function that only accepts type T',
            'A function that works with any type and returns the same type',
            'A function that converts any value to type T',
            'A function that requires T to be a class',
          ],
          answer: 1,
          explanation: 'The type parameter T is a placeholder. The function accepts any type and returns that exact same type.',
        },
        {
          id: 'quiz-ts-s5-q2',
          type: 'true-false',
          prompt: 'TypeScript can infer the type argument when you call a generic function.',
          answer: true,
          explanation: 'TypeScript infers T from the argument type. identity("hello") infers T = string.',
        },
        {
          id: 'quiz-ts-s5-q3',
          type: 'multiple-choice',
          prompt: 'What does interface Box<T = string> mean?',
          options: [
            'T defaults to string if not provided',
            'T must be string',
            'T extends string',
            'Box only works with strings',
          ],
          answer: 0,
          explanation: 'Default type parameters let callers omit the argument. Box<number> uses number; Box uses string.',
        },
        {
          id: 'quiz-ts-s5-q4',
          type: 'blank',
          prompt: 'What syntax constrains a type parameter to types that have a length property?',
          answers: ['T extends { length: number }', 'T extends Length', 'T has length'],
          explanation: 'Constraints use extends with the required shape: function logLength<T extends { length: number }>(item: T).',
        },
        {
          id: 'quiz-ts-s5-q5',
          type: 'identify-error',
          prompt: 'What does this conditional type evaluate to?',
          code: 'type IsString<T> = T extends string ? "yes" : "no"\n\ntype Test = IsString<string | number>',
          options: [
            '"yes"',
            '"no"',
            '"yes" | "no"',
            'never',
          ],
          answer: 2,
          explanation: 'Conditional types distribute over unions. IsString<string | number> becomes IsString<string> | IsString<number> = "yes" | "no".',
        },
      ],
    },
  },
]
