import type { Course } from '~/types/content'

export const javascriptFundamentals: Course = {
  id: 'course-javascript',
  slug: 'javascript-fundamentals',
  title: 'JavaScript Fundamentals',
  shortTitle: 'JavaScript',
  description:
    'The language that turns a document into an application. You start with values and finish by driving a real page: selecting elements, listening for events and rendering a task list from an array.',
  technology: 'javascript',
  category: 'programming',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: ['variables', 'functions', 'arrays', 'objects', 'dom', 'events', 'async', 'fetch', 'json', 'classes', 'modules'],
  icon: 'JS',
  sections: [
    {
      id: 'js-s1',
      title: 'Values & Variables',
      description: 'How to store things, what types they are, and how to turn them into text.',
      lessons: [
        {
          id: 'js-l1',
          title: 'Declaring variables with const and let',
          description: 'Give every value in your program a name, and choose the right kind of binding for it.',
          duration: 6,
          objectives: [
            'Declare a variable with const and with let',
            'Explain why var is rarely the right choice',
            'Reassign a let binding safely',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'js-l1-b1',
              body: 'A variable is a name attached to a value. You declare it with a keyword, and the choice of keyword is a promise to your future self about whether that name will ever be pointed at something else.',
            },
            {
              type: 'code',
              id: 'js-l1-c1',
              language: 'javascript',
              title: 'The two declarations you need',
              code: `const appName = 'codeIngot'
let visits = 0

visits = visits + 1
console.log(appName, visits)`,
            },
            {
              type: 'list',
              id: 'js-l1-l1',
              style: 'bullet',
              items: [
                '`const` — the binding cannot be reassigned. Use it for almost everything.',
                '`let` — the binding can be reassigned. Use it for counters, form values, anything that will change.',
                '`var` — the old keyword. It is function-scoped instead of block-scoped, it can be redeclared by accident, and it can be used before it is declared. There is no case where `const` or `let` will not do.',
              ],
            },
            {
              type: 'text',
              id: 'js-l1-b2',
              body: 'Note the distinction the `const` keyword is really making. It protects the **binding**, not the contents. If the value is an array or an object, you can still change what is inside it; you just cannot point the name at a different array.',
            },
            {
              type: 'code',
              id: 'js-l1-c2',
              language: 'javascript',
              title: 'What const actually prevents',
              code: `const list = [1, 2, 3]
list.push(4)          // fine: the array changed
// list = [9, 9, 9]    // TypeError: Assignment to constant variable

const settings = { theme: 'dark' }
settings.theme = 'light'   // fine: the object changed`,
            },
            {
              type: 'warning',
              id: 'js-l1-w1',
              title: 'Every variable must be declared',
              body: 'Assigning to an undeclared name creates an **implicit global** in sloppy mode and throws in strict mode, which is the default in modern modules. Declare every name you introduce, always.',
            },
            {
              type: 'example',
              id: 'js-l1-e1',
              title: 'A constant and a counter',
              body: 'Run this. The `const` name is fixed, while the `let` counter climbs on the next line.',
              html: `<p id="out">waiting…</p>`,
              javascript: `const site = 'codeIngot'
let visits = 0

visits = visits + 1
document.querySelector('#out').textContent = site + ' has ' + visits + ' visit(s)'`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l1-x1',
              exercise: {
                id: 'ex-js-const-let',
                instructions:
                  'Declare a `const` called `appName` holding the string "codeIngot". Declare a `let` called `visits` holding 0, then increment it by 1 and log the final value of `visits` with `console.log`.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `// Declare appName as a const and visits as a let.
// Then make visits 1 and log it.

`,
                },
                expectedOutput: '1',
                tests: [
                  {
                    id: 'js-l1-x1-t1',
                    label: 'appName holds the string "codeIngot"',
                    body: `return typeof appName !== 'undefined' && appName === 'codeIngot'
  ? true
  : 'Declare it as: const appName = "codeIngot"';`,
                  },
                  {
                    id: 'js-l1-x1-t2',
                    label: 'visits ends up as the number 1',
                    body: `return typeof visits !== 'undefined' && visits === 1
  ? true
  : 'Start visits at 0 and then increase it by 1.';`,
                  },
                  {
                    id: 'js-l1-x1-t3',
                    label: 'The value was logged to the console',
                    body: `return __log.length > 0 && __log[__log.length - 1] === '1'
  ? true
  : 'Expected the console output to be 1, got: ' + __log.join('|');`,
                  },
                ],
                hints: [
                  'Start with `const appName = "codeIngot"` on its own line.',
                  '`let visits = 0` declares a number you are allowed to change. Add a second line that raises it: `visits = visits + 1`.',
                  'Finish with `console.log(visits)`. The console should show a single line containing 1.',
                ],
                solution: {
                  javascript: `const appName = 'codeIngot'
let visits = 0

visits = visits + 1
console.log(visits)`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l2',
          title: 'Values, types and typeof',
          description: 'Every value in JavaScript has a type, and the type decides what you can do with it.',
          duration: 7,
          objectives: [
            'Name the seven primitive types',
            'Use typeof to inspect a value',
            'Spot the cases where typeof lies to you',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'js-l2-b1',
              body: 'JavaScript has seven primitive types: **string**, **number**, **boolean**, **null**, **undefined**, **symbol** and **bigint**. Everything else — arrays, functions, dates, the DOM itself — is an object. `typeof` tells you which one you are holding.',
            },
            {
              type: 'code',
              id: 'js-l2-c1',
              language: 'javascript',
              title: 'Asking a value what it is',
              code: `console.log(typeof 'hello')   // 'string'
console.log(typeof 42)        // 'number'
console.log(typeof true)      // 'boolean'
console.log(typeof undefined) // 'undefined'
console.log(typeof {})        // 'object'
console.log(typeof [])        // 'object'
console.log(typeof (() => 1)) // 'function'`,
            },
            {
              type: 'heading',
              id: 'js-l2-h1',
              level: 3,
              body: 'Three places typeof does not tell you the truth',
            },
            {
              type: 'list',
              id: 'js-l2-l1',
              style: 'ordered',
              items: [
                '`null` reports `"object"`. It is a historical bug kept for compatibility. Test for it with `value === null`.',
                '`NaN` reports `"number"`, because it genuinely is one — it is just not a *valid* number. Test with `Number.isNaN(value)`.',
                '`typeof` on an undeclared identifier returns `"undefined"` instead of throwing, which is exactly why it is a safe existence check: `typeof thing !== "undefined"`.',
              ],
            },
            {
              type: 'tip',
              id: 'js-l2-t1',
              title: 'Use typeof on undeclared names only',
              body: '`typeof undeclared` is safe, but reading the variable is not: an undeclared name in an expression is a ReferenceError. When you need the value and not just the type, declare it first or use a default parameter.',
            },
            {
              type: 'example',
              id: 'js-l2-e1',
              title: 'Types rendered onto the page',
              body: 'Every value below is logged, and the log list is rendered into the document so you can see type names next to the values themselves.',
              html: `<ul id="types"></ul>`,
              javascript: `const values = ['hello', 42, true, null, undefined, [1, 2], { a: 1 }]
const list = document.querySelector('#types')

values.forEach(function (value, index) {
  const item = document.createElement('li')
  item.textContent = index + ': ' + String(value) + ' — typeof ' + typeof value
  list.appendChild(item)
})`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l2-x1',
              exercise: {
                id: 'ex-js-typeof-describe',
                instructions:
                  'Write a function called `describe(value)` that returns the string "string", "number" or "boolean" for those three types, and "other" for everything else — including null, undefined, arrays and objects. Then log the result of calling it with 42.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `// Return 'string', 'number' or 'boolean' for those types.
// Return 'other' for null, undefined, arrays and objects.

function describe(value) {
  
}

console.log(describe(42))
`,
                },
                expectedOutput: 'number',
                tests: [
                  {
                    id: 'js-l2-x1-t1',
                    label: 'describe is a function',
                    body: `return typeof describe === 'function' ? true : 'Define a function called describe.';`,
                  },
                  {
                    id: 'js-l2-x1-t2',
                    label: 'It recognises strings and numbers',
                    body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe('hi') === 'string' && describe(42) === 'number'
  ? true
  : 'A string must give "string" and a number must give "number".';`,
                  },
                  {
                    id: 'js-l2-x1-t3',
                    label: 'It recognises booleans',
                    body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe(true) === 'boolean' && describe(false) === 'boolean'
  ? true
  : 'Both true and false are booleans.';`,
                  },
                  {
                    id: 'js-l2-x1-t4',
                    label: 'null and objects fall through to "other"',
                    body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe(null) === 'other' && describe([1, 2]) === 'other' && describe({}) === 'other'
  ? true
  : 'Only string, number and boolean get a specific answer — everything else is "other".';`,
                  },
                ],
                hints: [
                  'A type name is available as a string on any value: `typeof value` already gives you exactly the words you need.',
                  'Compare `typeof value` against the three names, and return "other" as the last line so there is always a result.',
                  'The switch looks like this: `switch (typeof value) { case "string": return "string"; case "number": return "number"; case "boolean": return "boolean"; default: return "other" }`',
                ],
                solution: {
                  javascript: `function describe(value) {
  switch (typeof value) {
    case 'string':
      return 'string'
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    default:
      return 'other'
  }
}

console.log(describe(42))`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l3',
          title: 'Template literals, operators and equality',
          description: 'Build strings, do arithmetic, and compare values the way a machine should.',
          duration: 8,
          objectives: [
            'Interpolate values into a template literal',
            'Use arithmetic and compound assignment operators',
            'Always compare with === and !==',
          ],
          xp: 60,
          content: [
            {
              type: 'text',
              id: 'js-l3-b1',
              body: 'Adding a number to a string with `+` produces a string, which is why "Total: " + 3 + 5 surprises people. A **template literal** is clearer: backticks around the text, and `${…}` wherever a value should drop in.',
            },
            {
              type: 'code',
              id: 'js-l3-c1',
              language: 'javascript',
              title: 'Template literals',
              code: `const name = 'Ada'
const items = 3

const message = \`\${name} has \${items} item(s)\`
console.log(message)

// a template literal can span lines
const card = \`Name: \${name}
Items: \${items}\``,
            },
            {
              type: 'code',
              id: 'js-l3-c2',
              language: 'javascript',
              title: 'Operators you will use daily',
              code: `let total = 10
total = total + 5     // 15
total += 5            // 20, same thing, shorter
total -= 3            // 17
total *= 2            // 34
total /= 4            // 8.5
total %= 5            // 3, remainder

const even = total % 2 === 0   // remainder tells you divisibility`,
            },
            {
              type: 'warning',
              id: 'js-l3-w1',
              title: 'Never compare with == or !=',
              body: 'Loose equality **coerces** types before comparing, which is how `0 == "0"`, `"" == 0` and `null == undefined` all come out true. Strict equality compares the value and the type. Use `===` and `!==` every time; the loose versions are only ever a source of confusion.',
            },
            {
              type: 'code',
              id: 'js-l3-c3',
              language: 'javascript',
              title: 'Strict and loose, side by side',
              code: `console.log(0 == '0')     // true  — coerces the string to a number
console.log(0 === '0')    // false — a number is not a string
console.log('' == 0)      // true  — the empty string coerces to 0
console.log('' === 0)     // false
console.log(null == undefined)   // true
console.log(null === undefined)  // false`,
            },
            {
              type: 'example',
              id: 'js-l3-e1',
              title: 'A receipt built from a template literal',
              body: 'The template literal below is the exact code from the lesson, running in the page.',
              html: `<p id="out">waiting…</p>`,
              javascript: `const name = 'Ada'
const price = 12.5
const quantity = 4

const total = price * quantity
document.querySelector('#out').textContent = \`\${name}: \${quantity} x \${price} = \${total}\``,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l3-x1',
              exercise: {
                id: 'ex-js-template-greet',
                instructions:
                  'Write a function `greet(name)` that returns the text "Hello, <name>!" using a template literal, with a single space after the comma. Then log the result of `greet("Ada")`.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `// Return 'Hello, Ada!' when called with 'Ada'.

function greet(name) {
  
}

console.log(greet('Ada'))
`,
                },
                expectedOutput: 'Hello, Ada!',
                tests: [
                  {
                    id: 'js-l3-x1-t1',
                    label: 'greet is a function',
                    body: `return typeof greet === 'function' ? true : 'Define a function called greet.';`,
                  },
                  {
                    id: 'js-l3-x1-t2',
                    label: 'greet("Ada") returns "Hello, Ada!"',
                    body: `if (typeof greet !== 'function') return 'Define a function called greet.'
return greet('Ada') === 'Hello, Ada!'
  ? true
  : 'Expected the string Hello, Ada! — exactly one space after the comma.';`,
                  },
                  {
                    id: 'js-l3-x1-t3',
                    label: 'It works for any name, including an empty one',
                    body: `if (typeof greet !== 'function') return 'Define a function called greet.'
return greet('') === 'Hello, !' && greet('Bo') === 'Hello, Bo!'
  ? true
  : 'The name must come from the parameter, not from a hard-coded word.';`,
                  },
                  {
                    id: 'js-l3-x1-t4',
                    label: 'The greeting was logged to the console',
                    body: `return __log.length > 0 && __log[__log.length - 1] === 'Hello, Ada!'
  ? true
  : 'Expected the console output to be Hello, Ada!, got: ' + __log.join('|');`,
                  },
                ],
                hints: [
                  'Put the function between the comment and the existing console.log line.',
                  'A template literal starts and ends with a backtick character, and a value drops in between dollar-brace and closing-brace: ' + "`Hello, \${name}!`" + ' returns the greeting for any name.',
                  'So the body is a single line: return ' + "`Hello, \${name}!`" + ' — then keep the console.log below it.',
                ],
                solution: {
                  javascript: `function greet(name) {
  return \`Hello, \${name}!\`
}

console.log(greet('Ada'))`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-js-s1',
        title: 'Values & variables check',
        passingScore: 70,
        questions: [
          {
            id: 'js-s1-q1',
            type: 'multiple-choice',
            prompt: 'What does `typeof NaN` return?',
            options: ['"number"', '"NaN"', '"undefined"', '"notANumber"'],
            answer: 0,
            explanation:
              'NaN is the result of an invalid numeric operation, but its type really is number. Use `Number.isNaN(value)` to test for it rather than comparing the type.',
          },
          {
            id: 'js-s1-q2',
            type: 'true-false',
            prompt: 'A `const` array cannot be modified in any way, because const makes it immutable.',
            answer: false,
            explanation:
              '`const` protects the binding only. The array it points at can still be mutated with `push`, `splice` and index assignment. The reference cannot be repointed, the contents can.',
          },
          {
            id: 'js-s1-q3',
            type: 'code-output',
            prompt: 'What does this print?',
            code: `const n = 3
console.log(n == '3', n === '3')`,
            options: ['true true', 'true false', 'false false', 'false true'],
            answer: 1,
            explanation:
              'Loose equality coerces the string to a number, so `==` gives true. Strict equality also compares types, and a number is not a string, so `===` gives false.',
          },
          {
            id: 'js-s1-q4',
            type: 'blank',
            prompt: 'Which keyword declares a binding that can never be reassigned?',
            answers: ['const', 'Const', 'CONST'],
            explanation:
              '`const` fixes the binding to one value. Reach for `let` only when the name really does need to point somewhere else later.',
          },
        ],
      },
    },
    {
      id: 'js-s2',
      title: 'Functions & Control Flow',
      description: 'Named blocks of behaviour, and the decisions they make.',
      lessons: [
        {
          id: 'js-l4',
          title: 'Declaring functions three ways',
          description: 'Function declarations, function expressions and arrow functions all do the same job.',
          duration: 7,
          objectives: [
            'Write a function declaration and an expression',
            'Know when an arrow function is the better fit',
            'Predict which one gets this'
          ],
          xp: 60,
          content: [
            {
              type: 'text',
              id: 'js-l4-b1',
              body: 'A function is a named block of code you can run later, as often as you like, with different inputs each time. JavaScript gives you three ways to write one, and they differ only in syntax and in one important detail: where `this` comes from.',
            },
            {
              type: 'code',
              id: 'js-l4-c1',
              language: 'javascript',
              title: 'The three forms',
              code: `// 1. declaration — hoisted, usable before it is written
function add(a, b) {
  return a + b
}

// 2. expression — a value assigned to a variable, not hoisted
const double = function (n) {
  return n * 2
}

// 3. arrow function — no own this, no own arguments
const triple = (n) => n * 3

console.log(add(2, 3), double(4), triple(4))`,
            },
            {
              type: 'text',
              id: 'js-l4-b2',
              body: 'A single-expression arrow function has a **concise body**: no braces, no `return` keyword, the value is returned implicitly. Add braces and you are back to an ordinary function body, where `return` is mandatory.',
            },
            {
              type: 'code',
              id: 'js-l4-c2',
              language: 'javascript',
              title: 'Concise versus block body',
              code: `const short = (n) => n * 2          // returns n * 2

const long = (n) => {          // needs an explicit return
  const result = n * 2
  return result
}`,
            },
            {
              type: 'tip',
              id: 'js-l4-t1',
              title: 'Arrows have no this of their own',
              body: 'An arrow function inherits `this` from the code around it. That makes arrows perfect for callbacks and array methods, and a poor choice for object methods that need to know which object they were called on.',
            },
            {
              type: 'example',
              id: 'js-l4-e1',
              title: 'A button that counts its own clicks',
              body: 'The click handler is an arrow function, so it can see the `count` variable declared just above it.',
              html: `<button id="go">Click me</button>
<p id="out">0</p>`,
              javascript: `const button = document.querySelector('#go')
const out = document.querySelector('#out')
let count = 0

button.addEventListener('click', () => {
  count = count + 1
  out.textContent = count
})`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l4-x1',
              exercise: {
                id: 'ex-js-arrow-even',
                instructions:
                  'Define a function `isEven(n)` that returns true when the number you pass in is even, and false when it is not. Write it as an arrow function with a concise body.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `// Return true for even numbers, false for odd ones.

`,
                },
                tests: [
                  {
                    id: 'js-l4-x1-t1',
                    label: 'isEven is defined',
                    body: `return typeof isEven === 'function' ? true : 'Define a function called isEven.';`,
                  },
                  {
                    id: 'js-l4-x1-t2',
                    label: 'Even numbers give true',
                    body: `if (typeof isEven !== 'function') return 'Define a function called isEven.'
return isEven(4) === true && isEven(10) === true
  ? true
  : 'isEven(4) and isEven(10) should both return true.';`,
                  },
                  {
                    id: 'js-l4-x1-t3',
                    label: 'Odd numbers give false',
                    body: `if (typeof isEven !== 'function') return 'Define a function called isEven.'
return isEven(7) === false && isEven(0.5) === false
  ? true
  : 'isEven(7) and isEven(0.5) should both return false.';`,
                  },
                  {
                    id: 'js-l4-x1-t4',
                    label: 'Zero counts as even, negatives work too',
                    body: `if (typeof isEven !== 'function') return 'Define a function called isEven.'
return isEven(0) === true && isEven(-3) === false
  ? true
  : 'isEven(0) should be true and isEven(-3) should be false.';`,
                  },
                ],
                hints: [
                  'The remainder operator is the whole trick: 4 % 2 is 0, 7 % 2 is 1.',
                  'Write it as `const isEven = (n) => n % 2 === 0` — no braces and no return keyword in a concise body.',
                  'Notice the `===` comparing the remainder to exactly 0, which is also why the answer is a real boolean and not a number.',
                ],
                solution: {
                  javascript: `const isEven = (n) => n % 2 === 0`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l5',
          title: 'Parameters, defaults and return',
          description: 'How a function receives input, and how it hands a result back.',
          duration: 7,
          objectives: [
            'Pass values into a function as parameters',
            'Give a parameter a default value',
            'Return a value instead of printing it',
          ],
          xp: 60,
          content: [
            {
              type: 'text',
              id: 'js-l5-b1',
              body: 'Parameters are the names a function declares. Arguments are the values you actually pass in. Inside the function body the two are paired up by position, which is why order matters more than names.',
            },
            {
              type: 'code',
              id: 'js-l5-c1',
              language: 'javascript',
              title: 'Parameters, arguments and return',
              code: `function area(width, height) {
  return width * height
}

console.log(area(3, 4))   // 12 — the call supplies the arguments

// an extra argument is ignored
console.log(area(3, 4, 5)) // still 12

// a missing argument is undefined
console.log(area(3))       // NaN, because 3 * undefined is NaN`,
            },
            {
              type: 'text',
              id: 'js-l5-b2',
              body: 'A **default parameter** removes the undefined case entirely. It is only used when the argument is missing, or explicitly passed as `undefined` — passing `0` or `""` still uses the value you passed.',
            },
            {
              type: 'code',
              id: 'js-l5-c2',
              language: 'javascript',
              title: 'Default parameters',
              code: `function greet(name = 'friend', punctuation = '!') {
  return 'Hello, ' + name + punctuation
}

console.log(greet())        // Hello, friend!
console.log(greet('Ada'))   // Hello, Ada!
console.log(greet('Ada', '?'))  // Hello, Ada?`,
            },
            {
              type: 'warning',
              id: 'js-l5-w1',
              title: 'Return, do not print',
              body: 'A function that logs is hard to reuse: you cannot do arithmetic with a log line. Return the value, and let the caller decide whether to print it, store it or put it on the page.',
            },
            {
              type: 'example',
              id: 'js-l5-e1',
              title: 'A function that returns its result',
              body: 'The function returns a value, and the code around it decides where that value goes.',
              html: `<input id="qty" type="number" value="2" />
<p id="out">waiting…</p>`,
              javascript: `function lineTotal(price, quantity = 1) {
  return price * quantity
}

const out = document.querySelector('#out')
const input = document.querySelector('#qty')

function update() {
  const qty = Number(input.value) || 0
  out.textContent = 'Total: ' + lineTotal(2.5, qty)
}

update()
input.addEventListener('input', update)`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l5-x1',
              exercise: {
                id: 'ex-js-default-params',
                instructions:
                  'Write `describeOrder(item, quantity)` that returns a string of the form "3 x Tea" — the number, a space, the letter x, a space, then the item name. When `quantity` is not passed in, default it to 1. Then log `describeOrder("Tea")`.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `// Return '1 x Tea' when called with only an item name.

function describeOrder(item, quantity) {
  
}

console.log(describeOrder('Tea'))
`,
                },
                expectedOutput: '1 x Tea',
                tests: [
                  {
                    id: 'js-l5-x1-t1',
                    label: 'describeOrder is a function',
                    body: `return typeof describeOrder === 'function' ? true : 'Define a function called describeOrder.';`,
                  },
                  {
                    id: 'js-l5-x1-t2',
                    label: 'With one argument the quantity defaults to 1',
                    body: `if (typeof describeOrder !== 'function') return 'Define a function called describeOrder.'
return describeOrder('Tea') === '1 x Tea'
  ? true
  : 'Calling describeOrder("Tea") should return the string 1 x Tea — give quantity a default of 1.';`,
                  },
                  {
                    id: 'js-l5-x1-t3',
                    label: 'With two arguments the given quantity is used',
                    body: `if (typeof describeOrder !== 'function') return 'Define a function called describeOrder.'
return describeOrder('Tea', 3) === '3 x Tea'
  ? true
  : 'Expected 3 x Tea, got: ' + describeOrder('Tea', 3);`,
                  },
                  {
                    id: 'js-l5-x1-t4',
                    label: 'The result was logged',
                    body: `return __log.length > 0 && __log[__log.length - 1] === '1 x Tea'
  ? true
  : 'Expected the console output to be 1 x Tea, got: ' + __log.join('|');`,
                  },
                ],
                hints: [
                  'Put the default straight in the parameter list: `function describeOrder(item, quantity = 1)`.',
                  'A default only kicks in when the argument is missing, so a real number always wins.',
                  `Build the string with a template literal: the body is return followed by a template literal such as ` + "`${quantity} x ${item}`" + ` — lower-case x, with a space on each side.`,
                ],
                solution: {
                  javascript: `function describeOrder(item, quantity = 1) {
  return \`\${quantity} x \${item}\`
}

console.log(describeOrder('Tea'))`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l6',
          title: 'Conditionals, loops and scope',
          description: 'Making decisions, repeating work, and keeping variables where they belong.',
          duration: 9,
          objectives: [
            'Branch with if, else if and else',
            'Repeat work with for, for…of and while',
            'Explain block scope and the loop variable trap',
          ],
          xp: 70,
          content: [
            {
              type: 'text',
              id: 'js-l6-b1',
              body: 'Control flow is how a program decides what to do and how many times. Two tools cover almost everything: **conditionals** for decisions and **loops** for repetition.',
            },
            {
              type: 'heading',
              id: 'js-l6-h1',
              level: 3,
              body: 'Making decisions',
            },
            {
              type: 'text',
              id: 'js-l6-b2',
              body: 'An `if` runs its block when the condition is **truthy**. In JavaScript that means anything that is not `false`, `0`, `""`, `null`, `undefined` or `NaN`. An empty array and an empty object are truthy, which surprises people regularly.',
            },
            {
              type: 'code',
              id: 'js-l6-c1',
              language: 'javascript',
              title: 'Branching',
              code: `const score = 72

if (score >= 90) {
  console.log('A')
} else if (score >= 70) {
  console.log('B')
} else {
  console.log('C')
}`,
            },
            {
              type: 'heading',
              id: 'js-l6-h2',
              level: 3,
              body: 'Repeating work',
            },
            {
              type: 'text',
              id: 'js-l6-b3',
              body: 'A loop runs the same block until a condition stops holding. `for` is for counted repetition, `while` is for repetition that has no known end, and `for…of` is the readable way to walk every item of an array or string without touching indexes.',
            },
            {
              type: 'code',
              id: 'js-l6-c2',
              language: 'javascript',
              title: 'Three loops, three jobs',
              code: `// counted
for (let i = 1; i <= 3; i = i + 1) {
  console.log(i)
}

// every item
const names = ['Ada', 'Bo']
for (const name of names) {
  console.log(name)
}

// until something changes
let attempts = 0
while (attempts < 3) {
  attempts = attempts + 1
}`,
            },
            {
              type: 'warning',
              id: 'js-l6-w1',
              title: 'A loop that never stops',
              body: 'If a `while` condition is written with the wrong comparison — `while (i > 0)` when it only ever increments — the page freezes and your browser shows "page unresponsive". Guard the boundary before you run, not after.',
            },
            {
              type: 'text',
              id: 'js-l6-b4',
              body: '**Scope** decides where a name is visible. `let` and `const` declared inside braces live only inside those braces. The classic trap is the loop variable: declared with `let` it is re-created each turn, so a closure inside the loop captures the right value. Declared with `var` it is one shared binding and every callback sees the final value.',
            },
            {
              type: 'tip',
              id: 'js-l6-t1',
              title: 'return inside a loop is fine',
              body: '`return` exits the whole function immediately, so `for` loops and early returns combine happily. Reach for `break` when you only want to leave the loop, and `continue` when you want to skip to the next turn.',
            },
            {
              type: 'example',
              id: 'js-l6-e1',
              title: 'A loop that writes to the page',
              body: 'Each turn creates one list item, so the browser shows the loop happening.',
              html: `<ul id="out"></ul>`,
              javascript: `const out = document.querySelector('#out')

for (let i = 1; i <= 4; i = i + 1) {
  const item = document.createElement('li')
  item.textContent = 'Step ' + i + (i % 2 === 0 ? ' (even)' : ' (odd)')
  out.appendChild(item)
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l6-x1',
              exercise: {
                id: 'ex-js-loop-sum',
                instructions:
                  'Write `sumUpTo(n)` that adds every number from 1 to n with a loop and returns the total. If n is less than 1, return 0 instead. Then log `sumUpTo(5)`.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `// Return the total of 1 + 2 + ... + n.
// Return 0 when n is below 1.

function sumUpTo(n) {
  
}

console.log(sumUpTo(5))
`,
                },
                expectedOutput: '15',
                tests: [
                  {
                    id: 'js-l6-x1-t1',
                    label: 'sumUpTo is a function',
                    body: `return typeof sumUpTo === 'function' ? true : 'Define a function called sumUpTo.';`,
                  },
                  {
                    id: 'js-l6-x1-t2',
                    label: 'sumUpTo(5) returns 15',
                    body: `if (typeof sumUpTo !== 'function') return 'Define a function called sumUpTo.'
return sumUpTo(5) === 15
  ? true
  : '1 + 2 + 3 + 4 + 5 is 15, got: ' + sumUpTo(5);`,
                  },
                  {
                    id: 'js-l6-x1-t3',
                    label: 'The small cases hold',
                    body: `if (typeof sumUpTo !== 'function') return 'Define a function called sumUpTo.'
return sumUpTo(1) === 1 && sumUpTo(0) === 0
  ? true
  : 'sumUpTo(1) should be 1 and sumUpTo(0) should be 0.';`,
                  },
                  {
                    id: 'js-l6-x1-t4',
                    label: 'A negative number returns 0',
                    body: `if (typeof sumUpTo !== 'function') return 'Define a function called sumUpTo.'
return sumUpTo(-3) === 0
  ? true
  : 'Guard the function with an if: if n is less than 1, return 0 before the loop starts.';`,
                  },
                ],
                hints: [
                  'Two parts: a guard with `if` at the top, then the loop that builds a running total.',
                  'Start a `let total = 0`, then `for (let i = 1; i <= n; i = i + 1) { total = total + i }`.',
                  'Put `return total` after the loop, and `return 0` inside the guard — a return before the loop makes the rest unreachable.',
                ],
                solution: {
                  javascript: `function sumUpTo(n) {
  if (n < 1) return 0

  let total = 0
  for (let i = 1; i <= n; i = i + 1) {
    total = total + i
  }
  return total
}

console.log(sumUpTo(5))`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-js-s2',
        title: 'Functions & control flow check',
        passingScore: 70,
        questions: [
          {
            id: 'js-s2-q1',
            type: 'multiple-choice',
            prompt: 'What does a function return when it finishes without an explicit `return`?',
            options: ['null', 'undefined', '0', 'An empty string'],
            answer: 1,
            explanation:
              'Reaching the end of the function body returns `undefined`. Returning nothing is very different from returning `0` or `""`, so check for `undefined` explicitly if it matters.',
          },
          {
            id: 'js-s2-q2',
            type: 'code-output',
            prompt: 'What does this print?',
            code: `function greet(name = 'friend') {
  return 'Hi ' + name
}
console.log(greet())`,
            options: ['Hi friend', 'Hi undefined', 'friend', 'undefined'],
            answer: 0,
            explanation:
              'The default parameter applies because the argument is missing, so the function builds "Hi friend".',
          },
          {
            id: 'js-s2-q3',
            type: 'true-false',
            prompt: 'An arrow function has its own `this` binding, so `this` inside an arrow function always refers to the object it was called on.',
            answer: false,
            explanation:
              'Arrows have no `this` of their own — they inherit it from the enclosing scope. That is why they are excellent as callbacks and a poor fit for object methods that need a dynamic `this`.',
          },
          {
            id: 'js-s2-q4',
            type: 'identify-error',
            prompt: 'What is wrong with this code?',
            code: `const total = prices.reduce(function (sum, price) {
  return sum + price
}, 0)
console.log(totals)`,
            options: [
              'reduce cannot take a starting value',
              'The name logged does not match the name declared',
              'The callback must be an arrow function',
              'reduce needs an array, not a number',
            ],
            answer: 1,
            explanation:
              'The variable is declared as `total` and logged as `totals`, so the reference fails at runtime. Read the names back before running: typos are the most common error in a first program.',
          },
        ],
      },
    },
    {
      id: 'js-s3',
      title: 'Arrays & Objects',
      description: 'Two data structures that between them describe almost anything.',
      lessons: [
        {
          id: 'js-l7',
          title: 'Arrays and the methods you will actually use',
          description: 'push, map, filter, reduce, find and includes cover most of what arrays need.',
          duration: 9,
          objectives: [
            'Add and remove items with push, pop and splice',
            'Transform with map and select with filter',
            'Fold an array into one value with reduce',
          ],
          xp: 70,
          content: [
            {
              type: 'text',
              id: 'js-l7-b1',
              body: 'An array is an ordered list of values written with square brackets. The order is meaningful and the first item is at index 0, so `[10, 20, 30][0]` is `10` and the last item is at index `length - 1`.',
            },
            {
              type: 'code',
              id: 'js-l7-c1',
              language: 'javascript',
              title: 'The mutating methods',
              code: `const stack = ['a', 'b']

stack.push('c')      // add to the end
stack.pop()          // remove from the end and return it
stack.unshift('z')   // add to the front
stack.shift()        // remove from the front

const copy = [...stack]     // spread makes a real copy
stack.includes('b')         // is b in there?
stack.indexOf('z')          // where is z, or -1`,
            },
            {
              type: 'heading',
              id: 'js-l7-h1',
              level: 3,
              body: 'The methods that do not mutate',
            },
            {
              type: 'code',
              id: 'js-l7-c2',
              language: 'javascript',
              title: 'map, filter, find, includes',
              code: `const prices = [3, 8, 15, 22]

prices.map(function (p) { return p * 2 })   // [6, 16, 30, 44] same length
prices.filter(function (p) { return p > 10 }) // [15, 22] fewer items
prices.find(function (p) { return p > 10 })    // 15, the first match only
prices.includes(8)                            // true`,
            },
            {
              type: 'text',
              id: 'js-l7-b2',
              body: '`map` and `filter` both return a **new** array and leave the original untouched. That is why they chain so well: `prices.filter(isAffordable).map(addTax)` reads as a sentence.',
            },
            {
              type: 'text',
              id: 'js-l7-b3',
              body: '`reduce` collapses the whole array into a single value. It takes a function and a starting value, and the function receives the running total as its first parameter. For a total, the first parameter is normally called `sum`.',
            },
            {
              type: 'code',
              id: 'js-l7-c3',
              language: 'javascript',
              title: 'reduce, read carefully',
              code: `const prices = [3, 8, 15]

const total = prices.reduce(function (sum, price) {
  return sum + price
}, 0)   // 0 is the starting value — always pass one

const longest = prices.reduce(function (best, price) {
  return price > best ? price : best
}, 0)`,
            },
            {
              type: 'tip',
              id: 'js-l7-t1',
              title: 'forEach versus map',
              body: '`forEach` runs your function for every item and returns `undefined` — use it for side effects like writing to the DOM. `map` runs the same way but collects the return values into a new array, so use it when you need a result.',
            },
            {
              type: 'example',
              id: 'js-l7-e1',
              title: 'map and filter on real data',
              body: 'The list shows three transformations of the same array, computed in the browser.',
              html: `<ul id="out"></ul>`,
              javascript: `const prices = [3, 8, 15, 22, 40]
const out = document.querySelector('#out')

const doubled = prices.map(function (p) { return p * 2 })
const expensive = prices.filter(function (p) { return p > 10 })
const total = prices.reduce(function (sum, p) { return sum + p }, 0)

;[doubled, expensive, [total]].forEach(function (row) {
  const item = document.createElement('li')
  item.textContent = row.join(', ')
  out.appendChild(item)
})`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l7-x1',
              exercise: {
                id: 'ex-js-array-map',
                instructions:
                  'Use `map` to build a new array of squared scores, and store it in a variable called `squared`. Leave the original `scores` array untouched, then log `squared`.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `const scores = [1, 2, 3, 4]

// Build a new array of squared scores called squared.
// Then log it.

`,
                },
                expectedOutput: '1,4,9,16',
                tests: [
                  {
                    id: 'js-l7-x1-t1',
                    label: 'squared is an array',
                    body: `return typeof squared !== 'undefined' && Array.isArray(squared)
  ? true
  : 'Declare it as: const squared = scores.map(...)';`,
                  },
                  {
                    id: 'js-l7-x1-t2',
                    label: 'Every score was squared',
                    body: `if (typeof squared === 'undefined' || !Array.isArray(squared)) return 'Declare it as: const squared = scores.map(...)'
return JSON.stringify(squared) === JSON.stringify([1, 4, 9, 16])
  ? true
  : 'Expected [1, 4, 9, 16], got: ' + JSON.stringify(squared);`,
                  },
                  {
                    id: 'js-l7-x1-t3',
                    label: 'The original scores were not modified',
                    body: `if (typeof scores === 'undefined') return 'Keep the original scores array.'
return JSON.stringify(scores) === JSON.stringify([1, 2, 3, 4])
  ? true
  : 'map returns a new array — the original scores must stay as they were.';`,
                  },
                  {
                    id: 'js-l7-x1-t4',
                    label: 'The result was logged',
                    body: `return __log.join('|').indexOf('1,4,9,16') > -1
  ? true
  : 'Log the squared array with console.log(squared).';`,
                  },
                ],
                hints: [
                  'map takes one function, and whatever that function returns becomes an item of the new array.',
                  'The function needs a parameter and a return: `function (n) { return n * n }`.',
                  'Write `const squared = scores.map(function (n) { return n * n })` and then `console.log(squared)`.',
                ],
                solution: {
                  javascript: `const scores = [1, 2, 3, 4]

const squared = scores.map(function (n) {
  return n * n
})

console.log(squared)`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l8',
          title: 'Destructuring, spread and rest',
          description: 'Pull values out of an array or object in one readable line, and spread them back out.',
          duration: 8,
          objectives: [
            'Destructure an array and an object',
            'Rename values while destructuring',
            'Use spread to copy and merge, and rest to collect the rest',
          ],
          xp: 65,
          content: [
            {
              type: 'text',
              id: 'js-l8-b1',
              body: 'Destructuring pulls values out of an array or object and binds each to its own name. On the left of the `=` you write the pattern; on the right you write the value being taken apart.',
            },
            {
              type: 'code',
              id: 'js-l8-c1',
              language: 'javascript',
              title: 'Destructuring arrays and objects',
              code: `const point = [10, 20]
const [x, y] = point              // x is 10, y is 20

const user = { name: 'Ada', role: 'admin' }
const { name, role } = user      // name is 'Ada', role is 'admin'

const { name: displayName } = user  // rename: name goes into displayName
const { name: n, ...rest } = user   // rest collects what is left`,
            },
            {
              type: 'text',
              id: 'js-l8-b2',
              body: '**Spread** does the opposite job: it takes a collection and expands it into individual items. Three real uses: copy an array, copy an object, and merge.',
            },
            {
              type: 'code',
              id: 'js-l8-c2',
              language: 'javascript',
              title: 'Spread',
              code: `const list = [1, 2]
const copy = [...list]              // a separate array with the same items
const longer = [...list, 3, 4]      // append during the copy

const defaults = { theme: 'dark', lang: 'en' }
const settings = { ...defaults, lang: 'fr' }
// settings is { theme: 'dark', lang: 'fr' } — the last one wins`,
            },
            {
              type: 'tip',
              id: 'js-l8-t1',
              title: 'Assignment without a keyword needs parentheses',
              body: 'A line that starts with `{` is parsed as a block, not an object. Write `;({ a } = obj)` with a leading semicolon or parentheses, or use `const` and avoid the problem entirely.',
            },
            {
              type: 'example',
              id: 'js-l8-e1',
              title: 'Destructuring a form value',
              body: 'The input event gives you one object; destructuring keeps the handler readable.',
              html: `<label for="email">Email</label>
<input id="email" type="email" value="ada@codeingot.dev" />
<p id="out">waiting…</p>`,
              javascript: `const input = document.querySelector('#email')
const out = document.querySelector('#out')

input.addEventListener('input', function () {
  const { value } = input
  const domain = value.split('@')[1] || 'no domain yet'
  out.textContent = 'Domain: ' + domain
})`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l8-x1',
              exercise: {
                id: 'ex-js-destructure',
                instructions:
                  'Use object destructuring to pull `name` and `email` out of the `user` object into two new variables with those exact names. Do not delete anything from `user`, and log each extracted value with its own `console.log` call.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `const user = { name: 'Ada', email: 'ada@codeingot.dev', role: 'admin' }

// Extract name and email here, then log them.

`,
                },
                tests: [
                  {
                    id: 'js-l8-x1-t1',
                    label: 'A variable called name now holds "Ada"',
                    body: `return typeof name !== 'undefined' && name === 'Ada'
  ? true
  : 'Use: const { name, email } = user';`,
                  },
                  {
                    id: 'js-l8-x1-t2',
                    label: 'A variable called email now holds the address',
                    body: `return typeof email !== 'undefined' && email === 'ada@codeingot.dev'
  ? true
  : 'Both properties should be extracted in one destructuring statement.';`,
                  },
                  {
                    id: 'js-l8-x1-t3',
                    label: 'The user object is intact',
                    body: `if (typeof user === 'undefined') return 'Keep the original user object.'
return user && user.name === 'Ada' && user.role === 'admin'
  ? true
  : 'Destructuring reads values — it must not change the original object.';`,
                  },
                  {
                    id: 'js-l8-x1-t4',
                    label: 'Both values were logged',
                    body: `return __log.indexOf('Ada') > -1 && __log.indexOf('ada@codeingot.dev') > -1
  ? true
  : 'Log each value on its own line, for example console.log(name) and then console.log(email).';`,
                  },
                ],
                hints: [
                  'The left-hand side of the assignment is a pattern in braces, not a string.',
                  'Start typing `const {` and list the property names exactly as they appear on the user object.',
                  'The full line is `const { name, email } = user`, followed by `console.log(name)` and `console.log(email)`.',
                ],
                solution: {
                  javascript: `const user = { name: 'Ada', email: 'ada@codeingot.dev', role: 'admin' }

const { name, email } = user

console.log(name)
console.log(email)`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l9',
          title: 'Objects, methods and safe updates',
          description: 'Keyed collections, methods that know their own object, and updates that do not surprise.',
          duration: 9,
          objectives: [
            'Write object literals with computed keys',
            'Add methods and use this correctly',
            'Update state without mutating the original object',
          ],
          xp: 70,
          content: [
            {
              type: 'text',
              id: 'js-l9-b1',
              body: 'An object is a keyed collection: values stored behind names rather than positions. The literal is written with braces, and the pairs are `key: value` separated by commas.',
            },
            {
              type: 'code',
              id: 'js-l9-c1',
              language: 'javascript',
              title: 'Object literals',
              code: `const product = {
  name: 'Keyboard',
  price: 49,
  tags: ['input', 'desk'],
  inStock: true,
}

product.name                 // dot access
product['price']             // bracket access — needed for odd keys
const key = 'name'
product[key]                 // computed key
Object.keys(product)         // ['name', 'price', 'tags', 'inStock']
Object.values(product)       // the values
Object.entries(product)      // key/value pairs`,
            },
            {
              type: 'heading',
              id: 'js-l9-h1',
              level: 3,
              body: 'Methods and this',
            },
            {
              type: 'text',
              id: 'js-l9-b2',
              body: 'A method is a function stored on the object. Inside a normal function method, `this` refers to the object the method was called on, which is how a method reads its own data without being told what to work on.',
            },
            {
              type: 'code',
              id: 'js-l9-c2',
              language: 'javascript',
              title: 'A method that reads its own object',
              code: `const cart = {
  items: ['Tea', 'Coffee'],
  count() {
    return this.items.length
  },
  label() {
    return 'Cart: ' + this.count() + ' items'
  },
}

console.log(cart.count())   // 2
console.log(cart.label())   // Cart: 2 items`,
            },
            {
              type: 'text',
              id: 'js-l9-b3',
              body: 'If you destructure a method off the object before calling it, `this` is lost: `const { label } = cart; label()` throws. That is the same rule that makes arrow functions unsuitable as methods — an arrow has no `this` of its own to lose or keep.',
            },
            {
              type: 'warning',
              id: 'js-l9-w1',
              title: 'Nested access can fail on missing keys',
              body: 'If `user` exists but `user.address.city` does not, the expression throws a TypeError. Guard with optional chaining — `user.address?.city` — which gives `undefined` instead of stopping the whole program.',
            },
            {
              type: 'example',
              id: 'js-l9-e1',
              title: 'An object rendered as a summary',
              body: 'Entries turns an object into text without changing the object itself.',
              html: `<ul id="out"></ul>`,
              javascript: `const user = { name: 'Ada', role: 'admin', active: true }

const out = document.querySelector('#out')

Object.entries(user).forEach(function (entry) {
  const key = entry[0]
  const value = entry[1]
  const item = document.createElement('li')
  item.textContent = key + ': ' + String(value)
  out.appendChild(item)
})`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l9-x1',
              exercise: {
                id: 'ex-js-object-method',
                instructions:
                  'Add a `label()` method to the `cart` object that returns the text "Cart: 2 items", using `this.count()` for the number. Then log `cart.label()`.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `const cart = {
  items: ['Tea', 'Coffee'],
  count() {
    return this.items.length
  },
}

// Add a label() method below, then log it.

console.log(cart.count())
`,
                },
                expectedOutput: 'Cart: 2 items',
                tests: [
                  {
                    id: 'js-l9-x1-t1',
                    label: 'The cart object has a label method',
                    body: `if (typeof cart === 'undefined') return 'Keep the cart object.'
return typeof cart.label === 'function'
  ? true
  : 'Add a label() method inside the cart object, next to count().';`,
                  },
                  {
                    id: 'js-l9-x1-t2',
                    label: 'The existing count method still works',
                    body: `if (typeof cart === 'undefined') return 'Keep the cart object.'
if (typeof cart.count !== 'function') return 'Keep the existing count() method.'
return cart.count() === 2
  ? true
  : 'Do not remove or rename the count method.';`,
                  },
                  {
                    id: 'js-l9-x1-t3',
                    label: 'label() returns "Cart: 2 items"',
                    body: `if (typeof cart === 'undefined') return 'Keep the cart object.'
if (typeof cart.label !== 'function') return 'Add a label() method to the cart object.'
return cart.label() === 'Cart: 2 items'
  ? true
  : 'Expected the string Cart: 2 items, got: ' + cart.label();`,
                  },
                  {
                    id: 'js-l9-x1-t4',
                    label: 'The label reflects the current item count',
                    body: `if (typeof cart === 'undefined') return 'Keep the cart object.'
if (typeof cart.label !== 'function') return 'Add a label() method to the cart object.'
var saved = cart.items
cart.items = ['Tea']
var result = cart.label()
cart.items = saved
return result === 'Cart: 1 item'
  ? true
  : 'label() must read this.count() each time, so one item should give "Cart: 1 item", got: ' + result;`,
                  },
                ],
                hints: [
                  'Add the method inside the object literal, after `count()`, separated by a comma.',
                  'The method needs a name, a parameter list, and a body: `label() { … }`.',
                  'Inside it, return the text built from `this.count()`, for example `return "Cart: " + this.count() + (this.count() === 1 ? " item" : " items")`.',
                ],
                solution: {
                  javascript: `const cart = {
  items: ['Tea', 'Coffee'],
  count() {
    return this.items.length
  },
  label() {
    return 'Cart: ' + this.count() + (this.count() === 1 ? ' item' : ' items')
  },
}

console.log(cart.count())
console.log(cart.label())`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-js-s3',
        title: 'Arrays & objects check',
        passingScore: 70,
        questions: [
          {
            id: 'js-s3-q1',
            type: 'multiple-choice',
            prompt: 'Which array method returns a new array of the same length, with each item transformed?',
            options: ['forEach', 'map', 'filter', 'reduce'],
            answer: 1,
            explanation:
              '`map` calls your function once per item and collects the return values into a new array of identical length. `filter` can change the length, and `reduce` produces a single value.',
          },
          {
            id: 'js-s3-q2',
            type: 'true-false',
            prompt: '`const list = [1, 2, 3]; list.push(4)` throws, because a const array is frozen.',
            answer: false,
            explanation:
              '`const` freezes the binding, not the contents. The array object is still mutable, which is why libraries that care use `Object.freeze` for that instead.',
          },
          {
            id: 'js-s3-q3',
            type: 'code-output',
            prompt: 'What does this print?',
            code: `const nums = [1, 2, 3, 4]
console.log(nums.filter(function (n) { return n % 2 === 0 }))`,
            options: ['[1, 2, 3, 4]', '[2, 4]', '[1, 3]', '2'],
            answer: 1,
            explanation:
              'The callback keeps only the even numbers. Logging an array shows its items between square brackets, separated by commas.',
          },
          {
            id: 'js-s3-q4',
            type: 'identify-error',
            prompt: 'What is wrong with this code?',
            code: `const config = { port: 3000 }
const port = config.port
const { port } = config
console.log(port)`,
            options: [
              'Nothing is wrong, it runs fine',
              'port is declared twice in the same scope, which is a syntax error',
              'Destructuring only works on arrays',
              'config is not defined',
            ],
            answer: 1,
            explanation:
              'The second `const port` tries to declare a name that already exists in the same block, so the whole script fails to parse — nothing runs at all.',
          },
        ],
      },
    },
    {
      id: 'js-s4',
      title: 'The DOM & Events',
      description: 'Where markup, styling and behaviour finally meet.',
      lessons: [
        {
          id: 'js-l10',
          title: 'Selecting and creating elements',
          description: 'Read the page with querySelector and change it with createElement and appendChild.',
          duration: 9,
          objectives: [
            'Select one element and a list of elements',
            'Create elements, set their text and append them',
            'Render an array into the DOM in a loop',
          ],
          xp: 75,
          content: [
            {
              type: 'text',
              id: 'js-l10-b1',
              body: 'The **DOM** is the browser\'s live object model of your page. JavaScript does not reach into your HTML source — it reads and writes this model, and any change you make is re-rendered on screen immediately. That is why HTML written by JavaScript and HTML written by hand end up looking identical.',
            },
            {
              type: 'code',
              id: 'js-l10-c1',
              language: 'javascript',
              title: 'Finding elements',
              code: `const header = document.querySelector('h1')      // first match, or null
const list = document.querySelectorAll('#list li')  // all matches, as a static list

document.getElementById('out')      // by id
document.getElementsByClassName('tag')  // by class
document.querySelector('.card p')   // any CSS selector`,
            },
            {
              type: 'text',
              id: 'js-l10-b2',
              body: '`querySelector` returns a single element or `null`, and `querySelectorAll` returns a **NodeList** — a static list, not a live one, so adding elements afterwards does not change what you already collected. Any selector `querySelector` understands, `querySelectorAll` understands too.',
            },
            {
              type: 'warning',
              id: 'js-l10-w1',
              title: 'null will break your code',
              body: 'If nothing matches, `querySelector` gives you `null`, and the next property access throws "Cannot read properties of null". Either check before using, or use optional chaining: `document.querySelector("#out")?.textContent`.',
            },
            {
              type: 'text',
              id: 'js-l10-b3',
              body: 'To build elements by hand, create them, fill them, then attach them. `createElement` produces a **detached** node that does not exist on the page until you insert it.',
            },
            {
              type: 'code',
              id: 'js-l10-c2',
              language: 'javascript',
              title: 'Creating and attaching',
              code: `const list = document.querySelector('#list')

const item = document.createElement('li')
item.textContent = 'First item'     // always textContent, never innerHTML
item.classList.add('fresh')
list.appendChild(item)

list.replaceChildren()              // empty a container
item.remove()                       // detach one element`,
            },
            {
              type: 'tip',
              id: 'js-l10-t1',
              title: 'Render, then attach',
              body: 'Build the whole list in a DocumentFragment and append it once. Adding fifty items one at a time makes the browser re-render fifty times; one append means one.',
            },
            {
              type: 'example',
              id: 'js-l10-e1',
              title: 'An array rendered into a list',
              body: 'Three lines of data become three list items, created entirely in JavaScript.',
              html: `<ul id="list"></ul>`,
              javascript: `const names = ['Ada', 'Bo', 'Cleo']
const list = document.querySelector('#list')

for (const name of names) {
  const item = document.createElement('li')
  item.textContent = name
  list.appendChild(item)
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l10-x1',
              exercise: {
                id: 'ex-js-dom-create',
                instructions:
                  'Wire up the `#add` button so that every click appends one new `<li>` to the `#list` element. The items must read "Item 1", "Item 2" and so on, in the order they were added. Keep a `let` counter to keep track of the number.',
                languages: ['html', 'javascript'],
                starterCode: {
                  html: `<ul id="list"></ul>
<button id="add" type="button">Add item</button>`,
                  javascript: `const button = document.querySelector('#add')
const list = document.querySelector('#list')

let count = 0

button.addEventListener('click', function () {
  // create one li, give it the right text, append it
})
`,
                },
                tests: [
                  {
                    id: 'js-l10-x1-t1',
                    label: 'Clicking twice adds exactly two list items',
                    body: `var button = document.querySelector('#add')
var list = document.querySelector('#list')
if (!button) return 'Keep the #add button from the starter HTML.'
if (!list) return 'Keep the #list element from the starter HTML.'
button.click()
button.click()
var items = list.querySelectorAll('li')
return items.length === 2
  ? true
  : 'After two clicks the list should hold 2 items, found ' + items.length + '.';`,
                  },
                  {
                    id: 'js-l10-x1-t2',
                    label: 'The first item reads "Item 1"',
                    body: `var button = document.querySelector('#add')
var list = document.querySelector('#list')
if (!button || !list) return 'Keep the #add button and the #list element.'
if (list.querySelectorAll('li').length === 0) button.click()
var items = list.querySelectorAll('li')
return items[0] && items[0].textContent.trim() === 'Item 1'
  ? true
  : 'The first item should read exactly: Item 1';`,
                  },
                  {
                    id: 'js-l10-x1-t3',
                    label: 'The numbering keeps counting up',
                    body: `var button = document.querySelector('#add')
var list = document.querySelector('#list')
if (!button || !list) return 'Keep the #add button and the #list element.'
while (list.querySelectorAll('li').length < 3) button.click()
var items = list.querySelectorAll('li')
return items.length === 3 && items[2].textContent.trim() === 'Item 3'
  ? true
  : 'The third click should add an item reading exactly: Item 3';`,
                  },
                  {
                    id: 'js-l10-x1-t4',
                    label: 'The new elements really are <li> tags inside #list',
                    body: `var button = document.querySelector('#add')
var list = document.querySelector('#list')
if (!button || !list) return 'Keep the #add button and the #list element.'
if (list.querySelectorAll('li').length === 0) button.click()
var items = list.querySelectorAll('li')
return items.length > 0 && items[0].tagName === 'LI'
  ? true
  : 'Create each row with document.createElement("li") and append it to the list.';`,
                  },
                ],
                hints: [
                  'Increase the counter first, then build the text from it: `count = count + 1` and then `"Item " + count`.',
                  'Inside the click handler, create the element with `document.createElement("li")` and set its text with `textContent`.',
                  'Attach it with `list.appendChild(item)`. Doing that on every click is the whole exercise.',
                ],
                solution: {
                  html: `<ul id="list"></ul>
<button id="add" type="button">Add item</button>`,
                  javascript: `const button = document.querySelector('#add')
const list = document.querySelector('#list')

let count = 0

button.addEventListener('click', function () {
  count = count + 1
  const item = document.createElement('li')
  item.textContent = 'Item ' + count
  list.appendChild(item)
})`,
                },
                testNotes:
                  'These checks click the button for you, so they are testing your event handler rather than your markup. The starter HTML is already correct — the work is all in the JavaScript.',
              },
            },
          ],
        },
        {
          id: 'js-l11',
          title: 'Events, forms and preventDefault',
          description: 'Listening for what the user does, and stopping the browser doing it too.',
          duration: 10,
          objectives: [
            'Attach a handler with addEventListener',
            'Read values out of form controls',
            'Call preventDefault and understand why',
            'Toggle classes in response to state',
          ],
          xp: 80,
          content: [
            {
              type: 'text',
              id: 'js-l11-b1',
              body: 'An **event** is something the user did: a click, a keypress, a submit, a scroll. `addEventListener` takes an event name and a function, and runs that function whenever the event happens on that element.',
            },
            {
              type: 'code',
              id: 'js-l11-c1',
              language: 'javascript',
              title: 'Listening and reading input',
              code: `const input = document.querySelector('#email')

// 'input' fires on every keystroke; 'change' fires when the value is settled
input.addEventListener('input', function (event) {
  console.log('now:', event.target.value)
})

const button = document.querySelector('#go')
button.addEventListener('click', function (event) {
  // event.target is the element the event came from
  event.preventDefault()
})`,
            },
            {
              type: 'heading',
              id: 'js-l11-h1',
              level: 3,
              body: 'Forms submit themselves',
            },
            {
              type: 'text',
              id: 'js-l11-b2',
              body: 'A form with an action and a submit button navigates the whole page when submitted — the default behaviour. If you are handling the submit in JavaScript, you must **cancel** it, or the page will reload before your code finishes.',
            },
            {
              type: 'code',
              id: 'js-l11-c2',
              language: 'javascript',
              title: 'A handled submit',
              code: `const form = document.querySelector('#signup')
const message = document.querySelector('#message')

form.addEventListener('submit', function (event) {
  event.preventDefault()   // stop the navigation

  const email = form.elements.email.value
  message.textContent = 'Thanks, ' + email
  message.classList.add('ok')
})`,
            },
            {
              type: 'text',
              id: 'js-l11-b3',
              body: 'There is no event called "submit button clicked" — you listen for `submit` on the form, which covers the button, pressing Enter in a field, and every other way a form can be submitted. `classList` is the safe way to toggle state on an element: `add`, `remove`, `toggle` and `contains`.',
            },
            {
              type: 'tip',
              id: 'js-l11-t1',
              title: 'What comes after this',
              body: 'Everything in this course is synchronous: it runs top to bottom without waiting. The next step is asynchronous code — `setTimeout`, Promises and `async`/`await` — which is how JavaScript waits for a server without freezing the page.',
            },
            {
              type: 'example',
              id: 'js-l11-e1',
              title: 'A handled form with a live region',
              body: 'Type in the field and submit. The page does not reload, because the handler cancels the default.',
              html: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" value="ada@codeingot.dev" />
  <button type="submit">Sign up</button>
</form>
<p id="message"></p>`,
              javascript: `const form = document.querySelector('#signup')
const message = document.querySelector('#message')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const email = form.elements.email.value
  message.textContent = 'Thanks, ' + email
  message.classList.add('ok')
})`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l11-x1',
              exercise: {
                id: 'ex-js-form-submit',
                instructions:
                  'Handle the `submit` event on the `#signup` form. Call `event.preventDefault()`, read the current value from the `#email` input, write "Thanks, <that value>" into the `#message` paragraph, and add the class `ok` to that paragraph.',
                languages: ['html', 'javascript'],
                starterCode: {
                  html: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />
  <button type="submit" id="submit">Sign up</button>
</form>
<p id="message"></p>`,
                  javascript: `const form = document.querySelector('#signup')
const message = document.querySelector('#message')

form.addEventListener('submit', function (event) {
  // cancel the navigation, read the value, write the message
})
`,
                },
                tests: [
                  {
                    id: 'js-l11-x1-t2',
                    label: 'Submitting writes the greeting into #message',
                    body: `var form = document.querySelector('#signup')
var input = document.querySelector('#email')
var message = document.querySelector('#message')
if (!form || !input || !message) return 'Keep the form, the input and the message paragraph.'
input.value = 'ada@codeingot.dev'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return message.textContent.trim() === 'Thanks, ada@codeingot.dev'
  ? true
  : 'After submitting, #message should read Thanks, ada@codeingot.dev — got: ' + message.textContent.trim();`,
                  },
                  {
                    id: 'js-l11-x1-t3',
                    label: 'The value is read at submit time, not when the page loaded',
                    body: `var form = document.querySelector('#signup')
var input = document.querySelector('#email')
var message = document.querySelector('#message')
if (!form || !input || !message) return 'Keep the form, the input and the message paragraph.'
input.value = 'bo@codeingot.dev'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return message.textContent.trim() === 'Thanks, bo@codeingot.dev'
  ? true
  : 'Read the value inside the handler: the second submit should greet bo@codeingot.dev.';`,
                  },
                  {
                    id: 'js-l11-x1-t4',
                    label: 'The default submit is prevented',
                    body: `var form = document.querySelector('#signup')
if (!form) return 'Keep the #signup form.'
var notCancelled = form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return notCancelled === false
  ? true
  : 'Call event.preventDefault() first, or the browser navigates away and your handler is wasted.';`,
                  },
                  {
                    id: 'js-l11-x1-t5',
                    label: 'The ok class is added to the message',
                    body: `var form = document.querySelector('#signup')
var input = document.querySelector('#email')
var message = document.querySelector('#message')
if (!form || !input || !message) return 'Keep the form, the input and the message paragraph.'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return message.classList.contains('ok')
  ? true
  : 'Add the class with message.classList.add("ok") inside the handler.';`,
                  },
                ],
                hints: [
                  'The handler already receives the event as its parameter — read its value with `event.preventDefault()`.',
                  'Get the typed text from the input at the moment of submitting, for example `input.value` or `form.elements.email.value`.',
                  'Then set the text and the class on the message paragraph: `message.textContent = "Thanks, " + email` and `message.classList.add("ok")`.',
                ],
                solution: {
                  html: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />
  <button type="submit" id="submit">Sign up</button>
</form>
<p id="message"></p>`,
                  javascript: `const form = document.querySelector('#signup')
const message = document.querySelector('#message')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const email = form.elements.email.value
  message.textContent = 'Thanks, ' + email
  message.classList.add('ok')
})`,
                },
                testNotes:
                  'The checks fire a real submit event at your form, so they exercise the whole path: cancel, read, write, add the class. Press the button yourself first to see the same thing happen live.',
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-js-s4',
        title: 'The DOM & events check',
        passingScore: 70,
        questions: [
          {
            id: 'js-s4-q1',
            type: 'multiple-choice',
            prompt: 'What does `document.querySelector("#total")` return when no element has that id?',
            options: ['null', 'undefined', 'An empty element', 'It throws an error'],
            answer: 0,
            explanation:
              'It returns `null`, which is why reading a property straight afterwards throws. Guard the lookup, or use optional chaining with `?.`.',
          },
          {
            id: 'js-s4-q2',
            type: 'true-false',
            prompt: 'Calling `event.preventDefault()` inside a submit handler stops the browser from navigating to the form action.',
            answer: true,
            explanation:
              'Submitting a form navigates by default. Preventing the default is what lets a JavaScript handler take over — and it is why `dispatchEvent` reports the event as cancelled.',
          },
          {
            id: 'js-s4-q3',
            type: 'code-output',
            prompt: 'What does this print?',
            code: `const btn = document.querySelector('#save')
btn.classList.add('saved')
console.log(btn.classList.contains('saved'))`,
            options: ['true', 'false', 'undefined', 'It throws'],
            answer: 0,
            explanation:
              '`classList.add` inserts the class immediately, so `contains` finds it. This add-then-check pattern is the safest way to read element state from tests.',
          },
          {
            id: 'js-s4-q4',
            type: 'identify-error',
            prompt: 'What is wrong with this loop?',
            code: `const list = document.querySelectorAll('#list li')
for (let i = 0; i <= list.length; i++) {
  console.log(list[i].textContent)
}`,
            options: [
              'querySelectorAll results cannot be indexed',
              'The comparison is off by one, so the last turn reads a missing element and throws',
              'A for loop needs a while condition',
              'Nothing is wrong',
            ],
            answer: 1,
            explanation:
              'The last valid index is `list.length - 1`. Using `<=` walks one index past the end, so `list[i]` is undefined and reading `.textContent` throws a TypeError.',
          },
        ],
      },
    },
    {
      id: 'js-s5',
      title: 'Final Project',
      description: 'One page, three technologies, one array driving everything.',
      lessons: [
        {
          id: 'js-l12',
          title: 'Build an interactive task tracker',
          description: 'Combine HTML, CSS and JavaScript into a small app that actually works.',
          duration: 25,
          objectives: [
            'Keep a list of tasks in an array and render it',
            'Add, complete and clear tasks through the DOM',
            'Drive an empty state from the same data as the list',
          ],
          xp: 120,
          content: [
            {
              type: 'text',
              id: 'js-l12-b1',
              body: 'Everything so far has been one idea at a time. This project is about holding one idea in your head while wiring three things together: the **data** (an array of tasks), the **render** (a function that turns that array into list items) and the **events** (the buttons and the form that change the data).',
            },
            {
              type: 'heading',
              id: 'js-l12-h1',
              level: 3,
              body: 'The shape of the solution',
            },
            {
              type: 'text',
              id: 'js-l12-b2',
              body: 'A task is an object with two fields: the text and whether it is done. Every change follows the same three steps — change the array, call `render()`, stop. If your `render()` function is the only thing that touches the list, your event handlers stay short enough to read at a glance.',
            },
            {
              type: 'code',
              id: 'js-l12-c1',
              language: 'javascript',
              title: 'The data and the render function',
              code: `let tasks = [{ text: 'Buy milk', done: false }]

function render() {
  const list = document.querySelector('#task-list')
  list.replaceChildren()

  tasks.forEach(function (task, index) {
    const item = document.createElement('li')
    item.textContent = task.text

    if (task.done) {
      item.classList.add('done')       // same class your CSS styles
    }

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.textContent = task.done ? 'Undo' : 'Done'
    toggle.addEventListener('click', function () {
      tasks[index].done = !tasks[index].done
      render()
    })

    item.appendChild(toggle)
    list.appendChild(item)
  })
}`,
            },
            {
              type: 'list',
              id: 'js-l12-l1',
              style: 'ordered',
              items: [
                'Model each task as `{ text, done }` and hold them in one `let tasks` array.',
                'Write a single `render()` that clears the list and rebuilds it from the array.',
                'Handle the form submit: read the input, ignore it when empty, push a task, clear the field, render.',
                'Give every row its own toggle button that flips `done` and calls `render()` again.',
                'Handle "clear completed" by filtering the array and rendering once.',
                'Drive the `#empty` message from the same render function, so it can never disagree with the list.',
              ],
            },
            {
              type: 'tip',
              id: 'js-l12-t1',
              title: 'Render on every change',
              body: 'Do not try to patch individual list items after every action. Empty the list and rebuild it — for a list of this size that is instant, and it removes a whole category of bugs where the page and the data drift apart.',
            },
            {
              type: 'example',
              id: 'js-l12-e1',
              title: 'The whole loop, in miniature',
              body: 'Add tasks, tick them off, then clear. Every one of those three buttons changes the array and then calls the same render function — exactly the shape you are about to build.',
              html: `<h1>Task tracker</h1>

<form id="task-form">
  <label for="task-input">New task</label>
  <input id="task-input" name="task" type="text" placeholder="e.g. Buy milk" />
  <button type="submit">Add</button>
</form>

<ul id="task-list"></ul>
<button type="button" id="clear-done">Clear completed</button>
<p id="empty">Nothing to do. Add a task above.</p>`,
              css: `#task-list { list-style: none; padding: 0; }
#task-list li { display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; }
#task-list li.done { text-decoration: line-through; opacity: 0.6; }`,
              javascript: `const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const empty = document.querySelector('#empty')
let tasks = []

function render() {
  list.replaceChildren()

  tasks.forEach(function (task, index) {
    const item = document.createElement('li')
    item.textContent = task.text
    if (task.done) item.classList.add('done')

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.textContent = task.done ? 'Undo' : 'Done'
    toggle.addEventListener('click', function () {
      tasks[index].done = !tasks[index].done
      render()
    })

    item.appendChild(toggle)
    list.appendChild(item)
  })

  empty.hidden = tasks.length > 0
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const text = input.value.trim()
  if (!text) return
  tasks.push({ text: text, done: false })
  input.value = ''
  render()
})

document.querySelector('#clear-done').addEventListener('click', function () {
  tasks = tasks.filter(function (task) { return !task.done })
  render()
})

render()`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l12-x1',
              exercise: {
                id: 'ex-js-task-tracker',
                instructions:
                  'Finish the task tracker. Submitting the form adds a task to the list, an empty or whitespace-only input is ignored, each row has a button that marks it done, the done state uses the class "done", the "clear completed" button removes finished tasks and leaves the rest, and the #empty paragraph is hidden whenever at least one task is on screen.',
                languages: ['html', 'css', 'javascript'],
                starterCode: {
                  html: `<h1>Task tracker</h1>

<form id="task-form">
  <label for="task-input">New task</label>
  <input id="task-input" name="task" type="text" placeholder="e.g. Buy milk" />
  <button type="submit" id="add-task">Add</button>
</form>

<ul id="task-list"></ul>

<button type="button" id="clear-done">Clear completed</button>
<p id="empty">Nothing to do. Add a task above.</p>`,
                  css: `#task-list {
  list-style: none;
  padding: 0;
}

#task-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
}

#task-list li.done {
  text-decoration: line-through;
  opacity: 0.6;
}`,
                  javascript: `const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const clearButton = document.querySelector('#clear-done')
const empty = document.querySelector('#empty')

let tasks = []

// Render the list from tasks, and update the empty message.
function render() {
  
}

// Add a task when the form is submitted.
form.addEventListener('submit', function (event) {
  
})

// Remove every completed task.
clearButton.addEventListener('click', function () {
  
})
`,
                },
                tests: [
                  {
                    id: 'js-l12-x1-t1',
                    label: 'Submitting the form adds a task to the list',
                    body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
if (!form || !input || !list) return 'Keep the form, the input and the #task-list element.'
var before = list.querySelectorAll('li').length
input.value = 'Buy milk'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
var items = list.querySelectorAll('li')
return items.length === before + 1 && items[items.length - 1].textContent.indexOf('Buy milk') > -1
  ? true
  : 'After adding Buy milk the list should hold one more item, and that item should contain the text.';`,
                  },
                  {
                    id: 'js-l12-x1-t2',
                    label: 'Tasks accumulate in the order they were added',
                    body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
if (!form || !input || !list) return 'Keep the form, the input and the #task-list element.'
var before = list.querySelectorAll('li').length
input.value = 'Second'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
var items = list.querySelectorAll('li')
return items.length === before + 1 && items[items.length - 1].textContent.indexOf('Second') > -1
  ? true
  : 'Each submit should append one new row at the end of the list.';`,
                  },
                  {
                    id: 'js-l12-x1-t3',
                    label: 'An empty input does not create a blank task',
                    body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
if (!form || !input || !list) return 'Keep the form, the input and the #task-list element.'
var before = list.querySelectorAll('li').length
input.value = '   '
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return list.querySelectorAll('li').length === before
  ? true
  : 'Trim the input and return early when nothing is left, so blank rows never appear.';`,
                  },
                  {
                    id: 'js-l12-x1-t4',
                    label: 'Every row has a button that toggles it',
                    body: `var list = document.querySelector('#task-list')
if (!list) return 'Keep the #task-list element.'
var items = list.querySelectorAll('li')
if (items.length === 0) return 'Add a task first, so the checks have a row to click.'
var buttons = items[0].querySelectorAll('button')
return buttons.length >= 1
  ? true
  : 'Each task row needs a button that marks the task done.';`,
                  },
                  {
                    id: 'js-l12-x1-t5',
                    label: 'Clicking the row button marks it done with the class "done"',
                    body: `var list = document.querySelector('#task-list')
if (!list) return 'Keep the #task-list element.'
var items = list.querySelectorAll('li')
if (items.length === 0) return 'Add a task first, so the checks have a row to click.'
var button = items[0].querySelector('button')
if (!button) return 'Each task row needs a button that marks the task done.'
button.click()
var rows = list.querySelectorAll('li')
return rows[0].classList.contains('done')
  ? true
  : 'After clicking the button the row should have the class done, so your CSS can strike it through.';`,
                  },
                  {
                    id: 'js-l12-x1-t6',
                    label: 'Clear completed removes finished tasks and keeps the rest',
                    body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
var clearButton = document.querySelector('#clear-done')
if (!form || !input || !list || !clearButton) return 'Keep the form, the input, the list and the #clear-done button.'
if (list.querySelectorAll('li').length < 2) {
  input.value = 'Finished'
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  input.value = 'Ongoing'
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
}
var firstRow = list.querySelectorAll('li')[0]
var firstButton = firstRow.querySelector('button')
if (firstRow.classList.contains('done') && firstButton) firstButton.click()
var rows = list.querySelectorAll('li')
var survivor = rows[0].textContent
var target = rows[1].querySelector('button')
if (!target) return 'Each task row needs a button that marks the task done.'
target.click()
clearButton.click()
var left = list.querySelectorAll('li')
if (left.length !== rows.length - 1) return 'Clearing completed should remove exactly the one finished task, but ' + left.length + ' of ' + rows.length + ' are left.'
return left[0].textContent.indexOf(survivor) > -1
  ? true
  : 'The unfinished task should still be in the list after clearing.';`,
                  },
                  {
                    id: 'js-l12-x1-t7',
                    label: 'The empty message is hidden while tasks exist',
                    body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
var empty = document.querySelector('#empty')
if (!form || !input || !list || !empty) return 'Keep the form, the input, the list and the #empty paragraph.'
input.value = 'Anything'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return empty.hidden === true
  ? true
  : 'Set empty.hidden = true from your render function whenever at least one task is listed.';`,
                  },
                ],
                hints: [
                  'Start with the data: `let tasks = []` and push `{ text: input.value, done: false }` inside the submit handler, then clear the input.',
                  'Write one `render()` that calls `list.replaceChildren()`, loops over `tasks` with `forEach`, and creates an `li` plus a button for each task.',
                  'Toggle with `tasks[index].done = !tasks[index].done` and then call `render()` again. Clear completed with `tasks = tasks.filter(function (task) { return !task.done })`, and set `empty.hidden = tasks.length === 0` at the end of render.',
                ],
                solution: {
                  html: `<h1>Task tracker</h1>

<form id="task-form">
  <label for="task-input">New task</label>
  <input id="task-input" name="task" type="text" placeholder="e.g. Buy milk" />
  <button type="submit" id="add-task">Add</button>
</form>

<ul id="task-list"></ul>

<button type="button" id="clear-done">Clear completed</button>
<p id="empty">Nothing to do. Add a task above.</p>`,
                  css: `#task-list {
  list-style: none;
  padding: 0;
}

#task-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
}

#task-list li.done {
  text-decoration: line-through;
  opacity: 0.6;
}`,
                  javascript: `const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const clearButton = document.querySelector('#clear-done')
const empty = document.querySelector('#empty')

let tasks = []

function render() {
  list.replaceChildren()

  tasks.forEach(function (task, index) {
    const item = document.createElement('li')
    item.textContent = task.text
    if (task.done) item.classList.add('done')

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.textContent = task.done ? 'Undo' : 'Done'
    toggle.addEventListener('click', function () {
      tasks[index].done = !tasks[index].done
      render()
    })

    item.appendChild(toggle)
    list.appendChild(item)
  })

  empty.hidden = tasks.length > 0
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const text = input.value.trim()
  if (!text) return
  tasks.push({ text: text, done: false })
  input.value = ''
  render()
})

clearButton.addEventListener('click', function () {
  tasks = tasks.filter(function (task) {
    return !task.done
  })
  render()
})`,
                },
                testNotes:
                  'These checks drive the interface the way a person would — they fill the input, fire the submit event and click the row buttons. They are testing behaviour, not markup, so the CSS is entirely your choice. The one hard requirement is the class name "done" on a completed row, because the tests need a way to recognise that state.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'js-s6',
      title: 'Async, Fetch & JSON',
      description: 'Dealing with time in JavaScript: promises, async/await, HTTP requests and JSON data.',
      lessons: [
        {
          id: 'js-l13',
          title: 'Promises and async/await',
          description: 'From callbacks to promises to the async keyword.',
          duration: 8,
          objectives: [
            'Understand the event loop and non-blocking execution',
            'Write and chain promises',
            'Use async/await for readable asynchronous code',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'c-l13-b1',
              body: 'JavaScript runs on a single thread. When you call `setTimeout` or fetch data, the rest of your code does not wait — the long task is put aside and the event loop picks it up later. This is why the browser stays responsive while a request is in flight.',
            },
            {
              type: 'list',
              id: 'c-l13-l1',
              style: 'bullet',
              items: [
                'A **callback** is a function passed into another function. It works but leads to "callback hell" when nested.',
                'A **promise** is a value that may be available now, or later, or never. It has three states: pending, fulfilled, rejected.',
                'The **async/await** syntax is sugar over promises. `await` pauses the function until the promise settles.',
              ],
            },
            {
              type: 'code',
              id: 'c-l13-c1',
              language: 'javascript',
              title: 'Callback vs promise vs async/await',
              code: `// callback — works but nests badly
setTimeout(function () {
  console.log('two seconds passed')
}, 2000)

// promise
fetch('/api/data')
  .then(function (response) { return response.json() })
  .then(function (data) { console.log(data) })
  .catch(function (error) { console.error(error) })

// async/await
async function loadData() {
  try {
    const response = await fetch('/api/data')
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}`,
            },
            {
              type: 'text',
              id: 'c-l13-b2',
              body: 'Every `async` function returns a promise. If you `throw` inside an async function, the promise rejects. If you `return` a value, the promise fulfills with that value. The `try/catch` block catches any rejection from an `await`ed promise.',
            },
            {
              type: 'warning',
              id: 'c-l13-w1',
              title: 'await must be inside an async function',
              body: '`await` is a syntax error at the top level of a module (in most environments). Either wrap the code in an `async` function, or use it inside an event handler that is async.',
            },
            {
              type: 'example',
              id: 'c-l13-e1',
              title: 'Loading data with a loading spinner',
              body: 'Click the button to simulate a fetch — the message changes after a one-second delay, demonstrating the async flow.',
              html: `<button id="load">Load user</button>
<p id="status">Ready</p>`,
              javascript: `const button = document.getElementById('load')
const status = document.getElementById('status')

async function loadUser() {
  status.textContent = 'Loading…'
  try {
    const response = await fetch('/api/user')
    const user = await response.json()
    status.textContent = 'Hello, ' + user.name
  } catch (error) {
    status.textContent = 'Failed to load user'
  }
}

button.addEventListener('click', loadUser)`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l13-x1',
              exercise: {
                id: 'ex-js-async',
                instructions:
                  'Write an async function called fetchUser that fetches from "/api/user", parses the JSON, and returns the name property. Call it and log the result.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `async function fetchUser() {
  // your code here
}

// Uncomment after writing fetchUser
// fetchUser().then(name => console.log(name))`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'fetchUser is an async function',
                    body: `return typeof fetchUser === 'function' && fetchUser.constructor.name === 'AsyncFunction'
  ? true : 'Define an async function named fetchUser.';`,
                  },
                  {
                    id: 't2',
                    label: 'The function calls fetch and awaits the response',
                    body: `var src = fetchUser.toString();
return src.indexOf('await') > -1 && src.indexOf('fetch') > -1
  ? true : 'Remember to await fetch() and response.json().';`,
                  },
                  {
                    id: 't3',
                    label: 'The function returns the name property',
                    body: `var src = fetchUser.toString();
return src.indexOf('.name') > -1 || src.indexOf('name') > -1
  ? true : 'Return the name property of the parsed JSON.';`,
                  },
                ],
                hints: [
                  '`async function fetchUser() { const response = await fetch("/api/user"); const user = await response.json(); return user.name; }`',
                  'async functions can use try/catch to handle errors.',
                  'Remember: `await` must be inside the `async` function.',
                ],
                solution: {
                  javascript: `async function fetchUser() {
  const response = await fetch('/api/user')
  const user = await response.json()
  return user.name
}

fetchUser().then(name => console.log(name))`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l14',
          title: 'Fetch API and working with JSON',
          description: 'Making HTTP requests and parsing JSON data.',
          duration: 7,
          objectives: [
            'Use the Fetch API to make GET requests',
            'Parse JSON responses correctly',
            'Handle HTTP errors and network failures',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'c-l14-b1',
              body: 'The `fetch()` function is the modern way to make HTTP requests in the browser. It returns a **promise** that resolves to a Response object. Note: fetch only rejects on network errors — for HTTP errors (404, 500), you must check `response.ok` or `response.status` yourself.',
            },
            {
              type: 'code',
              id: 'c-l14-c1',
              language: 'javascript',
              title: 'A robust fetch wrapper',
              code: `async function getJSON(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('HTTP ' + response.status + ' ' + response.statusText);
  }

  return response.json();
}

// usage
try {
  const data = await getJSON('/api/posts');
  console.log(data);
} catch (error) {
  console.error('Failed to load:', error.message);
}`,
            },
            {
              type: 'text',
              id: 'c-l14-b2',
              body: 'JSON (JavaScript Object Notation) is a text format for data. `response.json()` parses the response body as a JavaScript object. The reverse — turning an object into JSON text — is `JSON.stringify()`. Use it when you send data with `fetch(url, { method: "POST", body: JSON.stringify(data) })`.',
            },
            {
              type: 'text',
              id: 'c-l14-b3',
              body: 'POST and PUT requests need two extra fields: `method` (defaults to GET), and `body` (the data). The `headers` field tells the server what content type you are sending — `application/json` is the standard for JSON APIs.',
            },
            {
              type: 'example',
              id: 'c-l14-e1',
              title: 'GET and POST with fetch',
              body: 'Two buttons trigger async fetch calls. The Load button makes a GET request; the Add button sends a POST with a JSON body. Results appear in the <pre> element below.',
              html: `<button id="load-posts">Load posts</button>
<button id="add-post">Add post</button>
<pre id="output"></pre>`,
              javascript: `const output = document.getElementById('output')

async function loadPosts() {
  const response = await fetch('/api/posts')
  if (!response.ok) throw new Error('Could not load posts')
  const posts = await response.json()
  output.textContent = JSON.stringify(posts, null, 2)
}

async function addPost() {
  const newPost = { title: 'New post', body: 'Hello world!', userId: 1 }
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost)
  })
  const result = await response.json()
  output.textContent = JSON.stringify(result, null, 2)
}

document.getElementById('load-posts').addEventListener('click', loadPosts)
document.getElementById('add-post').addEventListener('click', addPost)`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l14-x1',
              exercise: {
                id: 'ex-js-fetch',
                instructions:
                  'Write a function getTodos that fetches from "/api/todos" and returns the parsed JSON array. Handle the HTTP error case by throwing a descriptive message if response.ok is false.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `async function getTodos() {
  // your code here
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'getTodos calls fetch',
                    body: `var src = getTodos.toString();
return src.indexOf('fetch') > -1 ? true : 'Call fetch("/api/todos") inside the function.';`,
                  },
                  {
                    id: 't2',
                    label: 'getTodos awaits response.json()',
                    body: `var src = getTodos.toString();
return src.indexOf('response.json') > -1 ? true : 'Await response.json() to parse the body.';`,
                  },
                  {
                    id: 't3',
                    label: 'getTodos checks response.ok',
                    body: `var src = getTodos.toString();
return src.indexOf('ok') > -1 ? true : 'Check response.ok and throw if it is false.';`,
                  },
                ],
                hints: [
                  'Start: `const response = await fetch("/api/todos")`',
                  '`if (!response.ok) throw new Error("HTTP " + response.status)`',
                  '`return response.json()` to parse and return the data.',
                ],
                solution: {
                  javascript: `async function getTodos() {
  const response = await fetch('/api/todos')
  if (!response.ok) {
    throw new Error('Failed to load todos: ' + response.status)
  }
  return response.json()
}`,
                },
              },
            },
          ],
        },
        {
          id: 'js-l15',
          title: 'Classes and ES modules',
          description: 'Object-oriented patterns with class syntax and module import/export.',
          duration: 8,
          objectives: [
            'Write classes with constructor, methods and inheritance',
            'Import and export values between files',
            'Understand the difference between default and named exports',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'c-l15-b1',
              body: 'A **class** is a blueprint for creating objects. It groups the constructor (what runs when you make one) and methods (functions attached to instances). Classes are syntactic sugar over prototypes — the mechanism exists in every JavaScript engine, the syntax just makes it readable.',
            },
            {
              type: 'code',
              id: 'c-l15-c1',
              language: 'javascript',
              title: 'Class with inheritance',
              code: `class Task {
  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toggle() {
    this.done = !this.done;
  }

  toString() {
    return this.done ? '[x] ' + this.title : '[ ] ' + this.title;
  }
}

class TimedTask extends Task {
  constructor(title, minutes) {
    super(title);
    this.minutes = minutes;
  }

  toString() {
    return super.toString() + ' (' + this.minutes + ' min)';
  }
}

const t = new TimedTask('Read chapter 3', 30);
console.log(t.toString());   // [ ] Read chapter 3 (30 min)
t.toggle();
console.log(t.toString());   // [x] Read chapter 3 (30 min)`,
            },
            {
              type: 'text',
              id: 'c-l15-b2',
              body: 'Modules let you split code into files. `export` makes something available to importers; `import` brings it in. A file can have one **default export** and as many **named exports** as it needs. The default is imported without braces; named ones must match by name.',
            },
            {
              type: 'code',
              id: 'c-l15-c2',
              language: 'javascript',
              title: 'Named and default exports',
              code: `// utils.js
export function add(a, b) { return a + b; }     // named
export const PI = 3.14159;                       // named
export default class Calculator { ... }          // default

// main.js
import Calculator, { add, PI } from './utils.js';
//      ^            ^  ^
//      default     named (by name)

console.log(add(2, 3));  // 5
console.log(PI);          // 3.14159`,
            },
            {
              type: 'warning',
              id: 'c-l15-w1',
              title: 'Never mix var with import/export',
              body: 'Modules run in strict mode automatically. You cannot accidentally create globals with `var` the way you can in a classic script. This is a feature — it catches bugs early.',
            },
            {
              type: 'example',
              id: 'c-l15-e2',
              title: 'A class with methods',
              body: 'Create instances of the Counter class and see the count go up and down as you call its methods.',
              html: `<button id="plus">+1</button>
<button id="minus">−1</button>
<p id="count">0</p>`,
              javascript: `class Counter {
  #count = 0;

  increment() { this.#count++; this.#render(); }
  decrement() { this.#count--; this.#render(); }

  #render() {
    document.getElementById('count').textContent = this.#count;
  }
}

const counter = new Counter();
document.getElementById('plus').addEventListener('click', () => counter.increment());
document.getElementById('minus').addEventListener('click', () => counter.decrement());`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'js-l15-x1',
              exercise: {
                id: 'ex-js-class',
                instructions:
                  'Define a User class with a constructor accepting name and email. Add a method greet() that returns "Hello, {name}!". Create an instance and log the greeting.',
                languages: ['javascript'],
                starterCode: {
                  javascript: `// Define your User class below`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'A User class is defined',
                    body: `return typeof User === 'function' ? true : 'Define a class called User.';`,
                  },
                  {
                    id: 't2',
                    label: 'User instances have a greet method',
                    body: `var u = new User('Sam', 'sam@example.com');
return typeof u.greet === 'function' && u.greet().indexOf('Sam') > -1
  ? true : 'greet() should return a string containing the user\'s name.';`,
                  },
                  {
                    id: 't3',
                    label: 'The greeting includes the name',
                    body: `var u = new User('Taylor', 't@example.com');
return u.greet().indexOf('Taylor') > -1
  ? true : 'The greeting should include the name passed to the constructor.';`,
                  },
                ],
                hints: [
                  '`class User { constructor(name, email) { … } greet() { … } }`',
                  '`return `Hello, ${this.name}!`;`',
                  'Make sure the constructor stores both name and email as instance properties.',
                ],
                solution: {
                  javascript: `class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  greet() {
    return 'Hello, ' + this.name + '!';
  }
}

const user = new User('Jordan', 'jordan@example.com');
console.log(user.greet());`,
                },
              },
            },
          ],
        },
      ],
    },
  ],
  projects: [],
}
