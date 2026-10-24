import type { Section } from '~/types/content'

export const tsAdvancedSections: Section[] = [
  {
    id: 'ts-s7',
    title: 'Advanced Types',
    description: 'Discriminated unions, template literal types, mapped types, and the infer keyword.',
    lessons: [
      {
        id: 'ts-l20',
        title: 'Discriminated unions and exhaustive matching',
        description: 'Using a common tag to narrow unions, and the never check for exhaustiveness.',
        duration: 6,
        objectives: [
          'Build a discriminated union with a shared literal property',
          'Narrow with a switch statement and default: never',
          'Explain why this pattern scales to many variants',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-ts-l20',
          title: 'Discriminated unions and exhaustive matching quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l20-q1',
              type: 'multiple-choice',
              prompt: 'What makes a union "discriminated"?',
              options: [
                'All members are primitive types',
                'All members share a common literal property',
                'The union has exactly two members',
                'The union uses the discriminated keyword',
              ],
              answer: 1,
              explanation: 'A discriminated union has a shared property (the discriminant) with a different literal value in each member, enabling narrowing.',
            },
            {
              id: 'quiz-ts-l20-q2',
              type: 'true-false',
              prompt: 'The never type in a switch default case ensures exhaustiveness.',
              answer: true,
              explanation: 'If all cases are handled, the default branch receives never. Adding a new variant without handling it makes the default reachable, causing a compile error.',
            },
            {
              id: 'quiz-ts-l20-q3',
              type: 'multiple-choice',
              prompt: 'Inside `case "circle":` in a switch on `shape.kind`, what does the compiler know about `shape`?',
              options: [
                'It is the circle member, so radius is available',
                'It is still the full Shape union',
                'It is the rect member',
                'It is unknown until runtime',
              ],
              answer: 0,
              explanation: 'Checking the discriminant narrows the whole union to the member whose literal matches, so only the circle fields are in scope.',
            },
            {
              id: 'quiz-ts-l20-q4',
              type: 'multiple-choice',
              prompt: 'What happens when a new member is added to `Shape` but the switch is not updated?',
              options: [
                'Nothing changes until the program runs',
                'The new member is treated as rect',
                'The assignment `const exhaustive: never = shape` becomes a compile error',
                'The union silently loses the new member',
              ],
              answer: 2,
              explanation: 'After all known cases are handled, an unhandled variant is the only thing left in `shape`. It can no longer be assigned to `never`, so the compiler reports the omission.',
            },
            {
              id: 'quiz-ts-l20-q5',
              type: 'multiple-choice',
              prompt: 'Why prefer a union of variants over several optional fields and booleans?',
              options: [
                'It compiles faster',
                'It makes impossible combinations unrepresentable',
                'It removes the need for a discriminant',
                'It allows any property to be added later',
              ],
              answer: 1,
              explanation: 'A union lists exactly the real states, so combinations such as a circle that also has a width cannot be written down at all.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l20-d1',
            title: 'Switch on the tag',
            body: 'The discriminant is read at runtime like any other property. Types are erased before this runs, so the switch below is ordinary JavaScript — but it is exactly the shape that lets the compiler narrow each branch.',
            html: `<button id="circle">Circle of radius 2</button>
<button id="rect">Rectangle 3 by 4</button>
<pre id="out">Press a shape.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; margin-right: 6px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')
const shapes = [
  { kind: 'circle', radius: 2 },
  { kind: 'rect', width: 3, height: 4 },
]

function area(shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rect':
      return shape.width * shape.height
    default:
      throw new Error('Unhandled shape')
  }
}

document.querySelector('#circle').addEventListener('click', function () {
  out.textContent = 'circle area: ' + area(shapes[0]).toFixed(2)
})

document.querySelector('#rect').addEventListener('click', function () {
  out.textContent = 'rect area: ' + area(shapes[1]).toFixed(2)
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l20-intro',
            body: '**Discriminated unions and exhaustive matching.** A discriminated union gives every member a shared property whose value is a distinct literal — `kind: ’circle’` versus `kind: ’rect’`. Checking that one property narrows the whole value, so inside the `circle` branch the compiler knows `radius` exists.',
          },
          {
            type: 'text',
            id: 'ts-l20-b2',
            body: 'This is the pattern that replaces a pile of optional fields and booleans. Instead of a shape where `radius` and `width` are both optional and only one is ever meaningful, you describe exactly the cases that exist. The compiler can then tell you when you have forgotten one.',
          },
          {
            type: 'heading',
            id: 'ts-l20-h1',
            level: 2,
            body: 'One tag, several shapes',
          },
          {
            type: 'code',
            id: 'ts-l20-code',
            language: 'typescript',
            title: 'narrowing with switch, exhaustiveness with never',
            code: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2   // shape is the circle here
    case 'rect':
      return shape.width * shape.height    // and the rect here
    default: {
      // With every variant handled, shape is never here.
      const exhaustive: never = shape
      throw new Error('Unhandled shape: ' + String(exhaustive))
    }
  }
}

area({ kind: 'circle', radius: 2 })
area({ kind: 'rect', width: 3, height: 4 })`,
          },
          {
            type: 'list',
            id: 'ts-l20-list',
            style: 'bullet',
            items: [
              'Every member shares the tag (`kind`) with a different literal value — that value is the discriminant.',
              '`case ’circle’` narrows the union to the one member with that literal.',
              'Assigning to `never` in the default turns a newly added, unhandled variant into a compile error.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l20-tip',
            title: 'Impossible states become unrepresentable',
            body: 'Three booleans describe eight combinations, most of them nonsense. Three union members describe exactly three real states. The type system is at its best when the wrong value cannot be written down.',
          },
          {
            type: 'heading',
            id: 'ts-l20-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l20-b3',
            body: 'Handle a two-member union by switching on its tag. The runtime behaviour mirrors what the narrowing does at compile time.',
          },
          {
            type: 'exercise',
            id: 'ts-l20-x1',
            exercise: {
              id: 'ex-ts-l20',
              instructions:
                'Write area(shape) for the Shape union. A circle returns PI times radius squared; a rectangle returns width times height.',
              languages: ['typescript'],
              starterCode: {
                typescript: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }

// Switch on the tag and compute each area.
function area(shape: Shape): number {
  return 0
}
`,
              },
              tests: [
                {
                  id: 'ts-l20-t1',
                  label: 'a rectangle multiplies width by height',
                  body: "return area({ kind: 'rect', width: 3, height: 4 }) === 12",
                },
                {
                  id: 'ts-l20-t2',
                  label: 'a unit circle has area PI',
                  body: "return Math.abs(area({ kind: 'circle', radius: 1 }) - Math.PI) < 1e-9",
                },
                {
                  id: 'ts-l20-t3',
                  label: 'a radius-2 circle has area 4 PI',
                  body: "return Math.abs(area({ kind: 'circle', radius: 2 }) - 4 * Math.PI) < 1e-9",
                },
                {
                  id: 'ts-l20-t4',
                  label: 'a 5-by-2 rectangle is 10',
                  body: "return area({ kind: 'rect', width: 5, height: 2 }) === 10",
                },
              ],
              hints: [
                'switch (shape.kind) lets each case see the matching member.',
                'In the circle case the member is shape.radius; in the rect case it is shape.width and shape.height.',
                'A circle area is Math.PI * shape.radius ** 2; a rectangle is shape.width * shape.height.',
              ],
              solution: {
                typescript: `type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; width: number; height: number }

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'rect':
      return shape.width * shape.height
    default: {
      const exhaustive: never = shape
      throw new Error('Unhandled shape: ' + String(exhaustive))
    }
  }
}
`,
              },
              testNotes:
                'The tests pass one member and then the other from the same function, which is the proof that the tag is driving the branch.',
            },
          },
        ],
      },
      {
        id: 'ts-l21',
        title: 'Template literal types and key remapping',
        description: 'Building string types from other strings, and remapping keys in mapped types.',
        duration: 5,
        objectives: [
          'Create a template literal type like get${Capitalize<string>}',
          'Use as in a mapped type to transform keys',
          'Generate event handler names from event names',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-ts-l21',
          title: 'Template literal types and key remapping quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l21-q1',
              type: 'multiple-choice',
              prompt: 'What does type EventNames = `on${Capitalize<string>}` produce?',
              options: [
                'A union of all possible event handler names',
                'A template that matches any string starting with "on"',
                'A type that can only be "onClick"',
                'An error, Capitalize only works on literal strings',
              ],
              answer: 1,
              explanation: 'Template literal types with intrinsic string manipulation (Capitalize, Lowercase, etc.) produce pattern types that match the pattern.',
            },
            {
              id: 'quiz-ts-l21-q2',
              type: 'identify-error',
              prompt: 'What does this mapped type produce?',
              code: 'type ReadonlyKeys<T> = {\n  readonly [K in keyof T]: T[K]\n}',
              options: [
                'An error, readonly cannot be used in mapped types',
                'A type with all properties readonly',
                'A type with only the readonly properties from T',
                'A type where keys are readonly but values are not',
              ],
              answer: 1,
              explanation: 'The readonly modifier in a mapped type makes all properties readonly. This is how the built-in Readonly<T> is implemented.',
            },
            {
              id: 'quiz-ts-l21-q3',
              type: 'multiple-choice',
              prompt: 'Which clause renames keys inside a mapped type?',
              options: [
                '`as`',
                '`in`',
                '`keyof`',
                '`infer`',
              ],
              answer: 0,
              explanation: 'The syntax `[K in keyof T as ...]` uses `as` to compute a new key for each property while the mapped type transforms its value.',
            },
            {
              id: 'quiz-ts-l21-q4',
              type: 'multiple-choice',
              prompt: 'What single string literal does the type `get${Capitalize<\'name\'>}` produce?',
              options: [
                '"getname"',
                '"getName"',
                '"GetName"',
                '"getNAME"',
              ],
              answer: 1,
              explanation: '`Capitalize` upper-cases only the first character, so `"name"` becomes `"Name"` and the prefix produces `"getName"`.',
            },
            {
              id: 'quiz-ts-l21-q5',
              type: 'code-output',
              prompt: 'What does `UserGetters` describe?',
              code: 'type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n}\n\ninterface User {\n  name: string\n  age: number\n}\n\ntype UserGetters = Getters<User>',
              options: [
                '{ name: string; age: number }',
                '{ getName: string; getAge: number }',
                'An error, because mapped types cannot rename keys',
                '{ getName: () => string; getAge: () => number }',
              ],
              answer: 3,
              explanation: 'The `as` clause prefixes each key with `get` and capitalizes it, and each property value is a function returning the original property type.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l21-d1',
            title: 'Building a handler name from an event name',
            body: 'A template literal type like `on` plus `Capitalize` describes a name such as onClick, but it does not build it. The live version is a small function that concatenates the prefix and upper-cases the first letter.',
            html: `<label>event <input id="event" value="click"></label>
<button id="go">Name the handler</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button, input { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; }
button { cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')

function handlerName(event) {
  return 'on' + event.charAt(0).toUpperCase() + event.slice(1)
}

document.querySelector('#go').addEventListener('click', function () {
  const event = document.querySelector('#event').value
  out.textContent = 'event "' + event + '" becomes "' + handlerName(event) + '"'
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l21-intro',
            body: '**Template literal types and key remapping.** A template literal type builds a new string type out of pieces, using the same backtick syntax as a template string: `on${Capitalize<’click’>}` is the single type `’onClick’`. When the pieces are unions, the result is every combination.',
          },
          {
            type: 'text',
            id: 'ts-l21-b2',
            body: 'Mapped types can rename keys while they transform values, using `as`. That is how you generate a whole family of names — a `get` prefix on every property, or an `on` prefix on every event. The names are checked, so a typo in a handler name is a compile error rather than a silent no-op.',
          },
          {
            type: 'heading',
            id: 'ts-l21-h1',
            level: 2,
            body: 'Names built from other names',
          },
          {
            type: 'code',
            id: 'ts-l21-code',
            language: 'typescript',
            title: 'template literal types and as-remapping',
            code: `// A string type assembled from pieces:
type ClickHandler = \`on\${Capitalize<'click'>}\`     // 'onClick'
type AnyHandler = \`on\${Capitalize<string>}\`       // any 'on'+Uppercase name

// A mapped type that renames every key:
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K]
}

interface User {
  name: string
  age: number
}

type UserGetters = Getters<User>
// { getName: () => string; getAge: () => number }

// The runtime echo — the same name, as a value:
function handlerName(event: string): string {
  return 'on' + event.charAt(0).toUpperCase() + event.slice(1)
}`,
          },
          {
            type: 'list',
            id: 'ts-l21-list',
            style: 'bullet',
            items: [
              'A template literal type uses backticks and `${...}`, exactly like a template string — but it evaluates to a type.',
              '`Capitalize`, `Lowercase`, `Uppercase` and `Uncapitalize` transform the string inside.',
              'The `as` clause in a mapped type renames the key; `[K in keyof T as ...]` is the syntax.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l21-warn',
            title: 'These are compile-time names',
            body: 'A template literal type checks that a string *looks* like `onClick`; it does not create the property at runtime. If you need the value, a function like `handlerName` still has to concatenate the string.',
          },
          {
            type: 'heading',
            id: 'ts-l21-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l21-b3',
            body: 'Build the value that the template literal type describes: turn an event name into its handler name.',
          },
          {
            type: 'exercise',
            id: 'ts-l21-x1',
            exercise: {
              id: 'ex-ts-l21',
              instructions:
                "Write handlerName(event) returning the text \"on\" followed by the event with its first letter upper-cased. handlerName(\"click\") is \"onClick\".",
              languages: ['typescript'],
              starterCode: {
                typescript: `// "click" -> "onClick"
function handlerName(event: string): string {
  return ''
}
`,
              },
              tests: [
                { id: 'ts-l21-t1', label: 'click becomes onClick', body: "return handlerName('click') === 'onClick'" },
                { id: 'ts-l21-t2', label: 'change becomes onChange', body: "return handlerName('change') === 'onChange'" },
                { id: 'ts-l21-t3', label: 'an empty name is just the prefix', body: "return handlerName('') === 'on'" },
                {
                  id: 'ts-l21-t4',
                  label: 'the rest of the word is untouched',
                  body: "return handlerName('mouseEnter') === 'onMouseEnter'",
                },
              ],
              hints: [
                'The prefix is the literal string "on".',
                'Get the first character with event.charAt(0) and upper-case it with .toUpperCase().',
                'Everything after the first character is event.slice(1): return "on" + event.charAt(0).toUpperCase() + event.slice(1).',
              ],
              solution: {
                typescript: `function handlerName(event: string): string {
  return 'on' + event.charAt(0).toUpperCase() + event.slice(1)
}
`,
              },
              testNotes:
                'The empty-name check proves the function does not throw on a missing first character, and the camelCase case proves only the first letter is touched.',
            },
          },
        ],
      },
      {
        id: 'ts-l22',
        title: 'The infer keyword and type inference in conditional types',
        description: 'Capturing types inside conditionals, and building Parameters and ReturnType yourself.',
        duration: 5,
        objectives: [
          'Use infer to capture a type parameter',
          'Reimplement ReturnType with infer',
          'Extract array element types with infer',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-ts-l22',
          title: 'The infer keyword and type inference in conditional types quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l22-q1',
              type: 'blank',
              prompt: 'What keyword captures a type inside a conditional type?',
              answers: [
                'infer',
                'Infer',
              ],
              explanation: 'infer declares a type variable to be inferred within a conditional type: T extends Array<infer U> ? U : never.',
            },
            {
              id: 'quiz-ts-l22-q2',
              type: 'multiple-choice',
              prompt: 'Given `type Element<T> = T extends (infer U)[] ? U : never`, what is `Element<string[]>`?',
              options: [
                'string',
                'string[]',
                'never',
                'unknown',
              ],
              answer: 0,
              explanation: 'The pattern matches an array and `infer U` captures its element type, which is `string` for `string[]`.',
            },
            {
              id: 'quiz-ts-l22-q3',
              type: 'multiple-choice',
              prompt: 'Why is `typeof add` needed in `MyReturn<typeof add>`?',
              options: [
                'It calls add at compile time',
                'It makes add generic',
                'It converts the function value into its type',
                'It widens the return type to any',
              ],
              answer: 2,
              explanation: '`MyReturn` expects a function type, but `add` is a value. `typeof add` is the type query that turns that value into its type.',
            },
            {
              id: 'quiz-ts-l22-q4',
              type: 'multiple-choice',
              prompt: 'If the pattern in a conditional type does not match, which branch is used?',
              options: [
                'The true branch with infer filled as any',
                'A compile error is always raised',
                'The nearest matching member of the union',
                'The false branch after the colon',
              ],
              answer: 3,
              explanation: 'A conditional type always resolves to one of its two branches. No match means the `: never` side is chosen, which is why these helpers return never for unsupported inputs.',
            },
            {
              id: 'quiz-ts-l22-q5',
              type: 'multiple-choice',
              prompt: 'With `type MyParams<T> = T extends (...args: infer P) => unknown ? P : never`, what is `MyParams<typeof add>` for `add(a: number, b: number)`?',
              options: [
                'number',
                '[number, number]',
                '(a: number, b: number) => number',
                'never',
              ],
              answer: 1,
              explanation: '`infer P` captures the whole parameter list as a tuple, not just the first argument. That is exactly how the built-in `Parameters` is defined.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l22-d1',
            title: 'Capture and apply, with values',
            body: 'infer captures a piece of a type — an element, or a return value — and hands it back. There is nothing to capture at runtime, so the live echo is apply: call a function with an array spread into separate arguments.',
            html: `<button id="add">Apply add to 2 and 3</button>
<button id="shout">Apply uppercase to hi</button>
<pre id="out">Press a button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; margin-right: 6px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const out = document.querySelector('#out')

function apply(fn, args) {
  return fn(...args)
}

document.querySelector('#add').addEventListener('click', function () {
  const sum = apply(function (a, b) { return a + b }, [2, 3])
  out.textContent = 'apply(add, [2, 3]) = ' + sum
})

document.querySelector('#shout').addEventListener('click', function () {
  const loud = apply(function (text) { return text.toUpperCase() }, ['hi'])
  out.textContent = 'apply(up, [hi]) = ' + loud
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l22-intro',
            body: '**The infer keyword and type inference in conditional types.** A conditional type asks whether one type extends another. `infer` lets the matching pattern name a piece of the type it matched — the element type of an array, the return type of a function — and use it in the result.',
          },
          {
            type: 'text',
            id: 'ts-l22-b2',
            body: 'This is how the built-in utilities are written. `ReturnType<T>` is a conditional type with an `infer R` for the return position; `Parameters<T>` infers the argument list. Once you can read those definitions, the standard library stops looking like a collection of magic names.',
          },
          {
            type: 'heading',
            id: 'ts-l22-h1',
            level: 2,
            body: 'Capture a type while matching it',
          },
          {
            type: 'code',
            id: 'ts-l22-code',
            language: 'typescript',
            title: 'infer in three shapes',
            code: `// The element type of an array:
type Element<T> = T extends (infer U)[] ? U : never

// The return type of a function:
type MyReturn<T> = T extends (...args: never[]) => infer R ? R : never

// The parameter types of a function:
type MyParams<T> = T extends (...args: infer P) => unknown ? P : never

function add(a: number, b: number) {
  return a + b
}

type A = Element<string[]>       // string
type R = MyReturn<typeof add>    // number
type P = MyParams<typeof add>    // [number, number]

// The same "capture and apply" idea, with values:
function apply<T>(fn: (...args: any[]) => T, args: any[]): T {
  return fn(...args)
}`,
          },
          {
            type: 'list',
            id: 'ts-l22-list',
            style: 'bullet',
            items: [
              '`infer U` declares a placeholder and asks the compiler to fill it from whatever matched.',
              '`typeof add` turns a value into its type, which is what lets `MyReturn` reach into a real function.',
              'If the pattern does not match, the conditional falls through to its `: never` branch.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l22-tip',
            title: 'Read infer as "match here, name it"',
            body: 'When a conditional type looks dense, replace `infer X` with "and call this part X". `T extends (infer U)[]` reads: if T is an array of something, call that something U — and then use U.',
          },
          {
            type: 'heading',
            id: 'ts-l22-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l22-b3',
            body: 'Write the value-level counterpart: a function that applies another function to an array of arguments.',
          },
          {
            type: 'exercise',
            id: 'ts-l22-x1',
            exercise: {
              id: 'ex-ts-l22',
              instructions:
                'Write apply(fn, args) that calls fn with the items of args as its arguments and returns the result.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Call fn with each item of args as a separate argument.
function apply(fn: (...args: any[]) => any, args: any[]): any {
  return fn()
}
`,
              },
              tests: [
                { id: 'ts-l22-t1', label: 'adds two arguments', body: 'return apply((a, b) => a + b, [2, 3]) === 5' },
                { id: 'ts-l22-t2', label: 'calls with no arguments', body: "return apply(() => 'x', []) === 'x'" },
                {
                  id: 'ts-l22-t3',
                  label: 'passes a single string argument',
                  body: "return apply((s) => s.toUpperCase(), ['hi']) === 'HI'",
                },
                {
                  id: 'ts-l22-t4',
                  label: 'passes three arguments',
                  body: 'return apply((a, b, c) => a + b + c, [1, 2, 3]) === 6',
                },
              ],
              hints: [
                'args is an array, but fn expects separate arguments.',
                'The spread operator turns an array back into a list of arguments.',
                'return fn(...args) — one line covers every argument count.',
              ],
              solution: {
                typescript: `function apply(fn: (...args: any[]) => any, args: any[]): any {
  return fn(...args)
}
`,
              },
              testNotes:
                'The tests call the helper with zero, one, two and three arguments, so only a real spread — not a hard-coded arg count — passes.',
            },
          },
        ],
      },
    ],
  },
]
