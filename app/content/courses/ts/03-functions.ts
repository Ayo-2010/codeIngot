import type { Section } from '~/types/content'

export const tsFunctionsSections: Section[] = [
  {
    id: 'ts-s3',
    title: 'Functions',
    description: 'Typing parameters, return values, overloads, and the this context.',
    lessons: [
      {
        id: 'ts-l8',
        title: 'Parameter and return types',
        description: 'Annotating function signatures, optional parameters, defaults, and rest parameters.',
        duration: 6,
        objectives: [
          'Write a full function signature with parameter and return types',
          'Use optional parameters and default values correctly',
          'Type a rest parameter as an array',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'ts-l8-intro',
            body: '**Parameter and return types.** A function is where annotations earn their keep. A caller has no value to infer from, so the signature is the contract: these are the types that go in, and this is the type that comes out. Get the signature right and every call site is checked against it.',
          },
          {
            type: 'text',
            id: 'ts-l8-b2',
            body: 'Annotations go after the parameter name: `name: string`. The return type goes after the closing parenthesis: `): string`. You can leave the return type off and let it be inferred, but writing it down turns the function into documentation and catches a `return` that drifts from the intent.',
          },
          {
            type: 'heading',
            id: 'ts-l8-h1',
            level: 2,
            body: 'Optional, default, and rest parameters',
          },
          {
            type: 'code',
            id: 'ts-l8-code',
            language: 'typescript',
            title: 'a signature with all three',
            code: `// A required parameter, then an optional one (note the ?).
function greet(name: string, greeting?: string): string {
  return (greeting ?? 'Hello') + ', ' + name + '!'
}

greet('Ada')            // 'Hello, Ada!'
greet('Ada', 'Hi')      // 'Hi, Ada!'

// A default value behaves like an optional parameter with a fallback:
function repeat(text: string, times: number = 2): string {
  return text.repeat(times)
}

// A rest parameter collects the remaining arguments into an array:
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}

sum(1, 2, 3)            // 6
sum()                   // 0`,
          },
          {
            type: 'list',
            id: 'ts-l8-list',
            style: 'bullet',
            items: [
              '`greeting?: string` is `string | undefined` inside the body, so guard it — the `??` here supplies a fallback.',
              'A parameter with a default (`times = 2`) is optional at the call site and never undefined inside the body.',
              'A rest parameter is typed as an *array*: `...numbers: number[]`, not `number`.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l8-tip',
            title: 'Annotate the boundary, infer the middle',
            body: 'Write parameter and return types; let local variables inside the body infer. The signature is what callers depend on, and it is the part that stays stable when the implementation changes.',
          },
          {
            type: 'heading',
            id: 'ts-l8-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l8-b3',
            body: 'Use a rest parameter to accept any number of arguments and total them.',
          },
          {
            type: 'exercise',
            id: 'ts-l8-x1',
            exercise: {
              id: 'ex-ts-l8',
              instructions:
                'Write sumAll(...numbers) that returns the total of every argument. Calling it with no arguments returns 0.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Accept any number of numbers and return their total.
function sumAll(...numbers: number[]): number {
  return 0
}
`,
              },
              tests: [
                { id: 'ts-l8-t1', label: 'sumAll(1, 2, 3) is 6', body: 'return sumAll(1, 2, 3) === 6' },
                { id: 'ts-l8-t2', label: 'sumAll() is 0', body: 'return sumAll() === 0' },
                { id: 'ts-l8-t3', label: 'sumAll(5) is 5', body: 'return sumAll(5) === 5' },
                { id: 'ts-l8-t4', label: 'sumAll(-1, 1) is 0', body: 'return sumAll(-1, 1) === 0' },
              ],
              hints: [
                'The rest parameter is already an array, so numbers has every argument in it.',
                'reduce is the natural fit: start at 0 and add each number.',
                'numbers.reduce((total, n) => total + n, 0) — the 0 is the starting total for the empty case.',
              ],
              solution: {
                typescript: `function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0)
}
`,
              },
              testNotes:
                'The empty call is the interesting one: it proves the rest parameter produces an empty array rather than throwing.',
            },
          },
        ],
      },
      {
        id: 'ts-l9',
        title: 'Function types and callbacks',
        description: 'The function type expression, callbacks, and why void is not undefined.',
        duration: 5,
        objectives: [
          'Write a function type as a standalone type alias',
          'Type a callback that is passed to another function',
          'Explain when void return is appropriate',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'ts-l9-intro',
            body: '**Function types and callbacks.** Functions are values, so they have types too. The syntax mirrors the arrow function: `(a: number, b: number) => number` is a function that takes two numbers and returns one. Giving that type a name — `type Math = (a: number, b: number) => number` — makes signatures reusable across call sites.',
          },
          {
            type: 'text',
            id: 'ts-l9-b2',
            body: 'A parameter typed as a function is a *callback*: the function you receive runs later, once per item, or after something finishes. The important rule is that a callback returning `void` means \"I ignore whatever you return\" — which is why `forEach` accepts a callback that happens to return a value.',
          },
          {
            type: 'heading',
            id: 'ts-l9-h1',
            level: 2,
            body: 'Naming a function type',
          },
          {
            type: 'code',
            id: 'ts-l9-code',
            language: 'typescript',
            title: 'a callback is just a typed parameter',
            code: `// Give the function shape a name and reuse it.
type Transform = (value: number) => number

function applyTwice(value: number, transform: Transform): number {
  return transform(transform(value))
}

applyTwice(3, (n) => n * 2)     // 12

// A callback that returns void promises nothing about its result:
function forEach(items: string[], visit: (item: string) => void) {
  for (const item of items) visit(item)
}

forEach(['a', 'b'], (item) => console.log(item))`,
          },
          {
            type: 'list',
            id: 'ts-l9-list',
            style: 'bullet',
            items: [
              '`(value: number) => number` is a type, not code — the parameter names are documentation.',
              'Passing a callback inline still checks it: `(n) => n * 2` is inferred as `number` from the parameter type.',
              '`void` means the caller does not use the return value, so callbacks may return anything.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l9-warn',
            title: 'void is not undefined',
            body: 'A function typed `() => void` may return a value; the type only says the caller ignores it. If you want to forbid a return value entirely, the type is the misleading one — `void` is about intent, not enforcement.',
          },
          {
            type: 'heading',
            id: 'ts-l9-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l9-b3',
            body: 'Write a higher-order function that takes a value and a callback, and runs the callback twice. This is the shape every `map`, `filter` and `onClick` shares.',
          },
          {
            type: 'exercise',
            id: 'ts-l9-x1',
            exercise: {
              id: 'ex-ts-l9',
              instructions:
                'Write applyTwice(value, transform) that returns the result of applying transform to value, then to the result again.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Run transform twice: transform(transform(value)).
function applyTwice(value: number, transform: (n: number) => number): number {
  return value
}
`,
              },
              tests: [
                { id: 'ts-l9-t1', label: 'applyTwice(1, +1) is 3', body: 'return applyTwice(1, (n) => n + 1) === 3' },
                { id: 'ts-l9-t2', label: 'applyTwice(3, *2) is 12', body: 'return applyTwice(3, (n) => n * 2) === 12' },
                { id: 'ts-l9-t3', label: 'the callback really runs twice', body: 'let calls = 0; applyTwice(0, (n) => { calls = calls + 1; return n }); return calls === 2' },
              ],
              hints: [
                'Calling a function you received works exactly like calling any other: transform(value).',
                'Do it twice — call transform, then call transform again on that result.',
                'One expression does it: return transform(transform(value)).',
              ],
              solution: {
                typescript: `function applyTwice(value: number, transform: (n: number) => number): number {
  return transform(transform(value))
}
`,
              },
              testNotes:
                'The third check counts how many times the callback ran, which proves you applied it twice rather than finding a shortcut.',
            },
          },
        ],
      },
      {
        id: 'ts-l10',
        title: 'Overloads and this typing',
        description: 'Multiple call signatures for one implementation, and binding this in callbacks.',
        duration: 5,
        objectives: [
          'Declare overload signatures for a function with different arities',
          'Type this in an object method or callback',
          'Use bind or arrow functions to preserve this',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'ts-l10-intro',
            body: '**Overloads and this typing.** Sometimes one function should answer to more than one signature. Overloads let you list the allowed calls above a single implementation — the compiler checks callers against the list, and you write the handling once. `this` is the other half: in a method, `this` must be typed explicitly when it is not obvious from the enclosing object.',
          },
          {
            type: 'text',
            id: 'ts-l10-b2',
            body: 'The classic `this` bug is detachment. A method that reads `this` stops working the moment you pass it somewhere else — an event handler, a timer, a callback. An arrow function captures `this` from where it was written, so it survives that journey. That is the fix you will write again and again.',
          },
          {
            type: 'heading',
            id: 'ts-l10-h1',
            level: 2,
            body: 'Overload signatures and a typed this',
          },
          {
            type: 'code',
            id: 'ts-l10-code',
            language: 'typescript',
            title: 'several signatures, one implementation',
            code: `// The allowed calls, one signature per line…
function pad(value: string): string
function pad(value: number): string
// …and a single implementation that handles all of them:
function pad(value: string | number): string {
  return String(value).padStart(4, '0')
}

pad('42')       // '0042'
pad(42)         // '0042'

// A standalone function can declare its this type:
function label(this: { name: string }): string {
  return '#' + this.name
}

// An arrow keeps the this of where it was written:
const counter = {
  count: 0,
  start() {
    return () => {
      this.count += 1
      return this.count
    }
  },
}`,
          },
          {
            type: 'list',
            id: 'ts-l10-list',
            style: 'bullet',
            items: [
              'Overload signatures come first and have no body; the implementation comes last and is not visible to callers.',
              'The implementation signature must be compatible with every overload — usually a union of their parameter types.',
              '`this` is a fake first parameter in the type: `function f(this: T)`. It is erased at runtime.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l10-tip',
            title: 'Prefer arrows when you hand a function out',
            body: 'Reach for an arrow function whenever a method will be passed somewhere else. It closes over the right `this` automatically, so you never need `bind` or a cached `const self = this`.',
          },
          {
            type: 'heading',
            id: 'ts-l10-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l10-b3',
            body: 'Build a counter whose increment method keeps working after you pull it off the object — the exact case where a `this`-using method breaks.',
          },
          {
            type: 'exercise',
            id: 'ts-l10-x1',
            exercise: {
              id: 'ex-ts-l10',
              instructions:
                'Write createCounter() returning an object with total() and increment(). increment adds one and returns the new total; total() reports it. Both must keep working when detached from the object.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// increment and total must still work when pulled off the object.
function createCounter() {
  return {
    total() {
      return 0
    },
    increment() {
      return 0
    },
  }
}
`,
              },
              tests: [
                { id: 'ts-l10-t1', label: 'a new counter totals 0', body: 'const c = createCounter(); return c.total() === 0' },
                {
                  id: 'ts-l10-t2',
                  label: 'increment returns the running total',
                  body: 'const c = createCounter(); c.increment(); c.increment(); return c.total() === 2 && c.increment() === 3',
                },
                {
                  id: 'ts-l10-t3',
                  label: 'a detached increment still updates the counter',
                  body: 'const c = createCounter(); const inc = c.increment; inc(); return c.total() === 1',
                },
              ],
              hints: [
                'Keep the count in a local variable that both methods close over.',
                'With a private count, total() returns it and increment() adds one to it.',
                'Avoid this: write both methods as arrow functions so they capture the local count even when detached.',
              ],
              solution: {
                typescript: `function createCounter() {
  let count = 0

  return {
    total: () => count,
    increment: () => {
      count += 1
      return count
    },
  }
}
`,
              },
              testNotes:
                'The last check is the point: a method shorthand that used this.count would return NaN or throw once detached, while the arrow version keeps working.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-ts-s3',
      title: 'Functions check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s3-q1',
          type: 'multiple-choice',
          prompt: 'How do you type a function that takes a string and returns a number?',
          options: [
            '(string) => number',
            'function(string): number',
            'string -> number',
            'func(string): number',
          ],
          answer: 0,
          explanation: 'The function type expression uses arrow syntax: (param: type) => returnType.',
        },
        {
          id: 'quiz-ts-s3-q2',
          type: 'true-false',
          prompt: 'A function with return type void can return undefined.',
          answer: true,
          explanation: 'void means the return value is ignored. Returning undefined is allowed; returning any other value is an error.',
        },
        {
          id: 'quiz-ts-s3-q3',
          type: 'multiple-choice',
          prompt: 'What does a rest parameter look like in a function type?',
          options: [
            '...args: string[]',
            'args: ...string[]',
            'rest: string...',
            'params: string...',
          ],
          answer: 0,
          explanation: 'Rest parameters in function types use the spread syntax before the parameter name: (...args: string[]) => void.',
        },
        {
          id: 'quiz-ts-s3-q4',
          type: 'blank',
          prompt: 'What keyword declares multiple call signatures for one function implementation?',
          answers: ['overload', 'function overload'],
          explanation: 'Function overloads let you declare multiple signatures before the single implementation.',
        },
        {
          id: 'quiz-ts-s3-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this callback type?',
          code: 'function process(callback: (x: number) => string) {}\n\nprocess((n) => n * 2)',
          options: [
            'Nothing is wrong',
            'The callback returns number but the type expects string',
            'The callback parameter needs a type annotation',
            'Arrow functions cannot be used as callbacks',
          ],
          answer: 1,
          explanation: 'The callback is typed to return string, but the arrow function returns number. The return type must match.',
        },
      ],
    },
  },
]
