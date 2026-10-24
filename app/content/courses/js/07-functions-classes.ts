import type { Section } from '~/types/content'

export const jsFunctionsClassesSections: Section[] = [
  {
    id: 'js-s45',
    title: 'Function invocation',
    description:
      'Calling a function is more than writing its name in brackets. How you call it decides what `this` is, where the arguments come from, and what happens to the return value.',
    lessons: [
      {
        id: 'js-l55',
        title: 'How functions are invoked',
        description: 'The same function behaves differently depending on how it is called.',
        duration: 6,
        objectives: [
          'Predict what `this` is for each of the four common call shapes',
          'Explain why a method passed as a callback loses its receiver',
          'Use an explicit receiver or an arrow function to keep `this`',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l55',
          title: 'How functions are invoked quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l55-q1',
              type: 'multiple-choice',
              prompt: 'What is `this` inside `function f() { return this }` when called as `f()` in a module?',
              options: [
                'The global object',
                '`undefined`',
                'The module object',
                'The function itself',
              ],
              answer: 1,
              explanation: 'A plain call has no receiver, and inside a module the code is strict by definition, so `this` is `undefined`. It is the global object only in sloppy mode, which is why the same code behaves differently in a script tag and in a module.',
            },
            {
              id: 'quiz-js-l55-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function add(a, b) {\n  return a + b\n}\nconsole.log(add(2, 3, 4, 5))',
              options: [
                '14',
                '5',
                'NaN',
                'undefined',
              ],
              answer: 1,
              explanation: 'A function only names the parameters it declares, and extra arguments are silently ignored. `a` and `b` receive 2 and 3, so the result is 5.',
            },
            {
              id: 'quiz-js-l55-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function compute() {\n  const result = 2 + 2\n}\nconsole.log(compute())',
              options: [
                '4',
                'undefined',
                'NaN',
                'It throws because `result` is unused',
              ],
              answer: 1,
              explanation: 'The function computes 4 but never returns it, so the call produces `undefined`. A missing `return` fails silently, which is why the result looks like a broken calculation.',
            },
            {
              id: 'quiz-js-l55-q4',
              type: 'multiple-choice',
              prompt: 'Which call gives the function a receiver equal to `app`?',
              options: [
                '`app.tick()`',
                '`const f = app.tick; f()`',
                '`tick()`',
                '`tick.call(undefined)`',
              ],
              answer: 0,
              explanation: 'The receiver is the value immediately to the left of the call. `app.tick()` supplies `app`; the other forms call a bare function, so `this` is undefined in a module.',
            },
            {
              id: 'quiz-js-l55-q5',
              type: 'true-false',
              prompt: 'An arrow function used as a callback receives its own `this` from the call site, just like a normal function.',
              answer: false,
              explanation: 'An arrow has no `this` binding of its own; it captures `this` from the scope where it was written. That is why wrapping a method call in an arrow keeps the surrounding object.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l55-b1',
            body: 'A function is not just a list of steps. It is a value that carries a hidden second argument, `this`, and that argument is decided at the moment of the call, not at the moment of the definition. The same function object called four different ways will see four different `this` values. Once you see invocation as the thing that supplies `this`, the weirdest bugs in this area stop being weird.',
          },
          {
            type: 'demo',
            id: 'j-l55-d1',
            title: 'One function, four ways of calling it',
            body: 'The same function reports a different `this` depending only on how it was called.',
            html: '<pre id="out"></pre>',
            javascript: `function report(label) {
  document.getElementById('out').textContent += label + ': ' + this + '\\n'
}

var counter = { name: 'counter', report: report }
report('plain')                 // globalThis (or undefined in a module)
var fn = counter.report
fn('detached')                 // undefined — the receiver was lost
counter.report('method')       // counter
report.call(counter, 'call')   // counter`,
          },
          {
            type: 'heading',
            id: 'j-l55-h1',
            level: 3,
            body: 'The four shapes',
          },
          {
            type: 'code',
            id: 'j-l55-c1',
            language: 'javascript',
            title: 'Every call is one of these',
            code: `function show() {
  console.log(this)
}

// 1. plain call - this is globalThis in sloppy mode, undefined in a module
show()

// 2. method call - this is the object before the dot
const app = { show }
app.show()

// 3. detached - the object is not passed along, so there is no receiver
const loose = app.show
loose()

// 4. explicit - you state the receiver yourself
show.call(app)`,
          },
          {
            type: 'text',
            id: 'j-l55-b2',
            body: 'Shape 3 is the one that catches people. Writing `const loose = app.show` copies the function value, not the object it was attached to. The name `app.show` is read, the function is returned, and the association is gone. Call it and there is nothing to the left of the dot, so there is no receiver and no `this`. This is exactly why `addEventListener(\'click\', obj.handleClick)` often loses the object: the handler is handed to the browser as a bare function.',
          },
          {
            type: 'list',
            id: 'j-l55-l1',
            style: 'ordered',
            items: [
              'Plain call: `fn()`. No receiver. In a module, `this` is `undefined`.',
              'Method call: `obj.fn()`. The receiver is `obj`.',
              'Detached call: `const f = obj.fn; f()`. The receiver was not copied, so `this` is `undefined`.',
              'Explicit call: `fn.call(obj)`, `fn.apply(obj)` or `fn.bind(obj)`. You supply the receiver yourself.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l55-t1',
            title: 'How to tell which shape you are in',
            body: 'Look at the text immediately left of the call. If there is a `name.` or `name[...].`, the receiver is that value. If there is nothing, there is no receiver. That single check answers most "why is this undefined" questions.',
          },
          {
            type: 'heading',
            id: 'j-l55-h2',
            level: 3,
            body: 'Arguments and the return value',
          },
          {
            type: 'code',
            id: 'j-l55-c2',
            language: 'javascript',
            title: 'Arguments come in, one value comes out',
            code: `function add(a, b) {
  return a + b
}

const total = add(2, 3)     // 5
const ignored = add(2, 3, 4, 5)  // still 5: extra arguments are simply dropped`,
          },
          {
            type: 'text',
            id: 'j-l55-b3',
            body: 'A call takes any number of arguments and a function reads the ones it declared names for. Passing more than the signature accepts is not an error in JavaScript; the extras are quietly ignored. That is worth knowing when you read code written against a longer signature, and worth being careful about in your own code, where a silent extra argument usually means the signature is hiding a bug. A function without a `return` gives back `undefined`, which is the single most common cause of "my value came out undefined".',
          },
          {
            type: 'warning',
            id: 'j-l55-w1',
            title: 'Returning nothing',
            body: 'A function that computes a value but forgets `return` is not broken, it is silent. The result of `const x = compute()` is `undefined` and the computation is thrown away. In an editor with no error, that is a hard one to find.',
          },
          {
            type: 'heading',
            id: 'j-l55-h3',
            level: 3,
            body: 'The three ways to keep the receiver',
          },
          {
            type: 'code',
            id: 'j-l55-c3',
            language: 'javascript',
            title: 'Fixing a detached call',
            code: `const app = {
  total: 0,
  add(n) {
    this.total += n
  },
}

setTimeout(app.add, 100, 5)             // wrong: this is not app
setTimeout(app.add.bind(app), 100, 5)   // right: the receiver is baked in`,
          },
          {
            type: 'list',
            id: 'j-l55-l2',
            style: 'bullet',
            items: [
              '`bind` returns a new function with the receiver permanently attached. Use it for callbacks and event handlers.',
              'Call the method on the object at the call site: `app.add(5)`. Nothing to remember, nothing to get wrong.',
              'Wrap it in an arrow: `setTimeout(() => app.add(5), 100)`. The arrow inherits `this` from where it was written, which is `app`.',
            ],
          },
          {
            type: 'example',
            id: 'j-l55-e1',
            title: 'A button handler that keeps its object',
            body: 'The naive version loses `this` when the handler is handed to the browser. The arrow version keeps it, because the arrow closes over the surrounding scope.',
            html: '<button id="go">Add 5</button><p id="total">total: 0</p>',
            javascript: `const cart = {
  total: 0,
  add(n) {
    this.total += n
    document.getElementById('total').textContent = 'total: ' + this.total
  },
}

document.getElementById('go').addEventListener('click', () => cart.add(5))`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l55-x1',
            exercise: {
              id: 'ex-js-invocation-this',
              instructions:
                'Write a function called `describe` that takes a label and logs a line reading `<label> -> <this>`. Call it three ways: once plain, once as a method of an object named `box` that has a `name` of "crate", and once detached through a variable. Then log how many of the three calls saw `box`. Store the count in a variable called `hit`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `var box = { name: 'crate' }

// Write describe(label) so that it logs '<label> -> ' followed by this.
// Then call it plain, as box.describe(...), and detached via a variable.
// Set hit to the number of those three calls where this === box.

var hit = 0
`,
              },
              expectedOutput: '2',
              tests: [
                {
                  id: 'ex-js-invocation-this-t1',
                  label: 'A function called describe exists',
                  body: `return typeof describe === 'function'
  ? true
  : 'Define a function called describe that takes a label.';`,
                },
                {
                  id: 'ex-js-invocation-this-t2',
                  label: 'It logs the label and its this',
                  body: `var src = String(describe)
return src.indexOf('this') > -1 && src.indexOf('label') > -1
  ? true
  : 'describe must build its line from both its label argument and this.';`,
                },
                {
                  id: 'ex-js-invocation-this-t3',
                  label: 'hit counts the method call and the detached call is not box',
                  body: `return hit === 1
  ? true
  : 'Attach describe to box, call it as box.describe, then detach it into a variable. The method call sees box, the detached one does not, so hit is 1.';`,
                },
              ],
              hints: [
                'The method call is `box.describe = describe` followed by `box.describe(\'...\')`.',
                'A detached call looks like `var loose = describe` then `loose(\'...\')` with nothing to the left of the call.',
                'Compare with `this === box` inside the function and count the hits, or set a flag from the method call only.',
              ],
              solution: {
                javascript: `var box = { name: 'crate' }

var hit = 0

function describe(label) {
  console.log(label + ' -> ' + this)
  if (this === box) hit = hit + 1
}

describe('plain')
box.describe = describe
box.describe('method')

var loose = box.describe
loose('detached')

console.log('hit: ' + hit)`,
              },
              testNotes:
                'Only the method call has box to the left of the dot, so only that one sees a receiver. The detached call is the mistake this lesson is about.',
            },
          },
        ],
      },
      {
        id: 'js-l56',
        title: 'call and apply',
        description: 'Choose the receiver yourself instead of relying on the syntax at the call site.',
        duration: 6,
        objectives: [
          'Set `this` deliberately with `call` and `apply`',
          'Tell the difference between the two argument-passing styles',
          'Reuse one function across several unrelated objects',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l56',
          title: 'call and apply quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l56-q1',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'const obj = {\n  name: \'obj\',\n  show() { return this === obj },\n}\nconst loose = obj.show\nconsole.log(loose())',
              options: [
                '`true`',
                '`false`',
                '`undefined`',
                'It throws',
              ],
              answer: 1,
              explanation: 'Assigning `obj.show` to a new variable copies the function, not its receiver. There is nothing to the left of the call, so `this` is `undefined` and the comparison is false. Use `obj.show.bind(obj)` if the receiver matters.',
            },
            {
              id: 'quiz-js-l56-q2',
              type: 'true-false',
              prompt: '`call` and `apply` modify the original function so that later calls use the receiver you passed.',
              answer: false,
              explanation: 'They invoke the function immediately and return a result. The function object is untouched, which is exactly what lets you reuse one function across many receivers.',
            },
            {
              id: 'quiz-js-l56-q3',
              type: 'blank',
              prompt: 'Which method returns a new function with `this` permanently attached, for handing to an event listener?',
              answers: [
                'bind',
              ],
              explanation: '`bind` defers. `call` and `apply` run the function now, which is no use when something else decides when to invoke the callback.',
            },
            {
              id: 'quiz-js-l56-q4',
              type: 'identify-error',
              prompt: 'Why does this handler lose access to the object?',
              code: 'const app = {\n  count: 0,\n  tick() { this.count += 1 },\n}\nsetInterval(app.tick, 1000)',
              options: [
                '`setInterval` is not a real function',
                'The handler is passed as a bare function, so the receiver is never supplied',
                '`this.count += 1` is not valid syntax',
                'The interval is too short',
              ],
              answer: 1,
              explanation: 'The object is not passed to `setInterval`, only the function. When the timer fires, there is nothing to the left of the call, so `this` is undefined. Write `setInterval(app.tick.bind(app), 1000)` or `setInterval(() => app.tick(), 1000)`.',
            },
            {
              id: 'quiz-js-l56-q5',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function sum(a, b) {\n  return this.base + a + b\n}\nconsole.log(sum.apply({ base: 10 }, [2, 3]))',
              options: [
                '15',
                '6',
                '10',
                'undefined',
              ],
              answer: 0,
              explanation: '`apply` calls the function immediately with the first argument as `this` and the second as an array of arguments. Here `this.base` is 10, and 2 and 3 are spread into `a` and `b`, giving 15.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l56-b1',
            body: 'Every function carries three methods that exist only to change how it is called. `call` and `apply` invoke the function immediately with a receiver you choose. `bind` returns a new function with that receiver already attached. The name is the only difference between the first two: `call` takes arguments one at a time, `apply` takes an array.',
          },
          {
            type: 'demo',
            id: 'j-l56-d1',
            title: 'The same function, two receivers',
            body: 'One function reports a different receiver depending on which method you used to call it.',
            html: '<pre id="out"></pre>',
            javascript: `function show() {
  document.getElementById('out').textContent += (this && this.name) + '\\n'
}

var alpha = { name: 'alpha' }
var beta = { name: 'beta' }

show.call(alpha)
show.apply(beta)

var bound = show.bind(alpha)
bound()`,
          },
          {
            type: 'code',
            id: 'j-l56-c1',
            language: 'javascript',
            title: 'The two signatures',
            code: `function introduce(greeting, punctuation) {
  return greeting + ', I am ' + this.name + punctuation
}

const a = introduce.call({ name: 'Ada' }, 'Hello', '!')
//          ^ receiver            ^ arg1        ^ arg2

const names = ['Grace', '!']
const b = introduce.apply({ name: 'Alan' }, names)
// apply takes an array of arguments`,
          },
          {
            type: 'text',
            id: 'j-l56-b2',
            body: 'Neither method changes the original function. They return a fresh result and leave the function itself untouched, which is why you can call the same function a hundred times with a hundred different receivers. This is the escape hatch that makes generic code possible: a function that reads `this.name` can report any object you hand it, without knowing anything about that object in advance.',
          },
          {
            type: 'tip',
            id: 'j-l56-t1',
            title: 'Prefer spread over apply',
            body: 'To pass an array of arguments with no receiver change, use a spread call: `fn(...args)`. It is the same intent as `fn.apply(undefined, args)` but reads like a normal call. Reach for `apply` specifically when you are also setting `this`.',
          },
          {
            type: 'heading',
            id: 'j-l56-h1',
            level: 3,
            body: 'Borrowing built-in methods',
          },
          {
            type: 'text',
            id: 'j-l56-b3',
            body: 'Because `call` and `apply` do not care what the function was written for, you can hand a built-in method a receiver of a completely different shape. `Array.prototype.push.call(list, value)` pushes onto any array-like object, and `Math.max.apply(null, numbers)` finds the largest number in a list, because `Math.max` does not use `this` at all so the receiver is irrelevant.',
          },
          {
            type: 'code',
            id: 'j-l56-c2',
            language: 'javascript',
            title: 'Two everyday uses',
            code: `// Math.max does not care about this, so null is a fine receiver
const highest = Math.max.apply(null, [4, 19, 7])   // 19

// push works on anything with a numeric length
const stack = { length: 0 }
Array.prototype.push.call(stack, 'a')
stack.length   // 1`,
          },
          {
            type: 'example',
            id: 'j-l56-e1',
            title: 'One function, three receivers',
            body: 'The function is written once and reused for every row. Only the receiver changes.',
            html: '<ul id="rows"></ul>',
            javascript: `function render() {
  document.getElementById('rows').innerHTML +=
    '<li>' + this.label + ': ' + this.value + '</li>'
}

var rows = [
  { label: 'first', value: 1 },
  { label: 'second', value: 2 },
  { label: 'third', value: 3 },
]

rows.forEach(function (row) {
  render.call(row)
})`,
            showPreview: true,
          },
          {
            type: 'heading',
            id: 'j-l56-h2',
            level: 3,
            body: 'When you actually want bind',
          },
          {
            type: 'text',
            id: 'j-l56-b4',
            body: '`call` and `apply` run now. `bind` runs later. When you hand a function to something that will call it at a time of its choosing, an event listener, a timer, a `forEach` callback, you cannot use `call`, because you are not making the call. You need `bind`, which produces a new function with the receiver already decided.',
          },
          {
            type: 'list',
            id: 'j-l56-l1',
            style: 'bullet',
            items: [
              '`fn.call(obj, a, b)` — call immediately, receiver first, then arguments.',
              '`fn.apply(obj, [a, b])` — call immediately, receiver first, then an array of arguments.',
              '`fn.bind(obj, a)` — return a new function with the receiver and any leading arguments already applied.',
            ],
          },
          {
            type: 'exercise',
            id: 'j-l56-x1',
            exercise: {
              id: 'ex-js-call-apply-reuse',
              instructions:
                'Write a function called `tag` that returns the string `<this.prefix><this.name>`. Then create three objects, each with a `name` and a different `prefix`, and build an array called `out` where every element is the result of calling `tag` with the matching object as the receiver using `call`. Log the joined result.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Write tag() so it returns this.prefix + this.name.
// Create three objects with different prefixes, then use
// tag.call(obj) once per object to fill an array called out.
// Log out.join(' ').

var out = []
`,
              },
              expectedOutput: 'a-one b-two c-three',
              tests: [
                {
                  id: 'ex-js-call-apply-reuse-t1',
                  label: 'A function called tag exists',
                  body: `return typeof tag === 'function'
  ? true
  : 'Define a function called tag.';`,
                },
                {
                  id: 'ex-js-call-apply-reuse-t2',
                  label: 'out has three entries',
                  body: `return Array.isArray(out) && out.length === 3
  ? true
  : 'out should hold three strings, one per object.';`,
                },
                {
                  id: 'ex-js-call-apply-reuse-t3',
                  label: 'Each entry joins its own prefix and name',
                  body: `return out.every(function (s, i) {
  return typeof s === 'string' && s.length > 0 && s.indexOf(String(i === 0 ? 'a' : i === 1 ? 'b' : 'c')) > -1
})
  ? true
  : 'Each result should start with that object\\'s own prefix, which is only possible if tag read this.';`,
                },
              ],
              hints: [
                'A three-letter prefix and a name reads better here: prefix "a" plus name "one".',
                'Fill the array inside a loop: `out.push(tag.call(objects[i]))`.',
                'If every result comes out the same, `tag` is not reading `this` — return `this.prefix + this.name`.',
              ],
              solution: {
                javascript: `function tag() {
  return this.prefix + this.name
}

var objects = [
  { prefix: 'a', name: 'one' },
  { prefix: 'b', name: 'two' },
  { prefix: 'c', name: 'three' },
]

var out = []
for (var i = 0; i < objects.length; i++) {
  out.push(tag.call(objects[i]))
}

console.log(out.join(' '))`,
              },
              testNotes:
                'The one function reads only this.prefix and this.name, so it cannot possibly know which object it is describing unless the receiver really was set by call.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s46',
    title: 'Function closures',
    description:
      'A function keeps a reference to the variables that were in scope where it was written, and it keeps them alive for as long as the function exists.',
    lessons: [
      {
        id: 'js-l57',
        title: 'Function closures',
        description: 'Use the variables a function was written next to, long after the call that made them has returned.',
        duration: 6,
        objectives: [
          'Explain what a closure is in terms of scope, not magic',
          'Build a function that remembers state between calls',
          'Name the leak you create when a closure captures a loop variable',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l57',
          title: 'Function closures quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l57-q1',
              type: 'multiple-choice',
              prompt: 'In one sentence, what is a closure?',
              options: [
                'A function bundled with its own copy of every global variable',
                'A function that keeps a live reference to the variables in the scope where it was written',
                'A function that cannot be called more than once',
                'The memory freed when a function returns',
              ],
              answer: 1,
              explanation: 'It is a live reference, not a copy. That distinction is why a closure sees the current value of a variable rather than the value at the moment it was created, and why two closures from the same outer call can hold completely different values.',
            },
            {
              id: 'quiz-js-l57-q2',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'function outer() {\n  let n = 0\n  return () => ++n\n}\nconst a = outer()\nconst b = outer()\na(); a(); b();\nconsole.log(a(), b())',
              options: [
                '`3 2`',
                '`2 2`',
                '`3 1`',
                '`1 1`',
              ],
              answer: 2,
              explanation: 'Each call to `outer` creates a fresh `n`. `a` has been incremented twice and the `a()` in the log makes three, while `b` was incremented once and its `b()` makes two.',
            },
            {
              id: 'quiz-js-l57-q3',
              type: 'true-false',
              prompt: 'A closure takes a snapshot of the values of the variables it uses when it is created.',
              answer: false,
              explanation: 'It holds a reference to the variable, not a copy of its value. If the variable changes afterwards, the closure reads the new value.',
            },
            {
              id: 'quiz-js-l57-q4',
              type: 'blank',
              prompt: 'Which keyword gives each loop iteration its own binding, so closures created in the loop do not all share one counter?',
              answers: [
                'let',
              ],
              explanation: '`let` in a loop head is re-bound on every iteration, so each callback closes over a different variable. `var` is function-scoped, so all of them share one binding and every callback reports the final value.',
            },
            {
              id: 'quiz-js-l57-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this module?',
              code: 'let items = []\nexport function all() {\n  return items\n}',
              options: [
                'Nothing, this is the correct way to return a list',
                'It returns the live array, so any caller can mutate or clear the private state',
                '`export function` is not valid syntax',
                'The array must be declared with `const` to be exported',
              ],
              answer: 1,
              explanation: 'Returning the array itself hands out the one binding the module was trying to keep private. Any caller could then run `all().length = 0` and wipe the state. Return a copy instead, with `items.slice()`.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l57-b1',
            body: 'A closure is what you get for free whenever an inner function is created. The inner function keeps a live reference to the variables in the scope it was written in, and that reference outlives the outer call. Nothing is copied. If the outer variable changes later, the inner function sees the new value, because it is reading the same variable rather than a snapshot.',
          },
          {
            type: 'demo',
            id: 'j-l57-d1',
            title: 'A function that remembers',
            body: 'There is no variable holding the count. Each button owns its own, and both keep counting independently.',
            html: '<button id="a">A</button> <button id="b">B</button><p id="out">click either button</p>',
            javascript: `function makeCounter() {
  var count = 0
  return function () {
    count = count + 1
    document.getElementById('out').textContent = 'count: ' + count
  }
}

var a = makeCounter()
var b = makeCounter()

document.getElementById('a').addEventListener('click', a)
document.getElementById('b').addEventListener('click', b)`,
          },
          {
            type: 'heading',
            id: 'j-l57-h1',
            level: 3,
            body: 'Private state without a class',
          },
          {
            type: 'code',
            id: 'j-l57-c1',
            language: 'javascript',
            title: 'The counter pattern',
            code: `function makeCounter() {
  let count = 0          // nobody outside can see or change this
  return function step() {
    count += 1
    return count
  }
}

const a = makeCounter()
const b = makeCounter()

a()   // 1
a()   // 2
b()   // 1  — b has its own count`,
          },
          {
            type: 'text',
            id: 'j-l57-b2',
            body: '`count` is declared inside `makeCounter`, and `step` is returned. When `makeCounter` returns, its stack frame is gone, but `step` still points at `count` and keeps it alive. Two calls to `makeCounter` create two separate bindings, which is why `a` and `b` never interfere. This is the simplest way to give a piece of code private state, and it is how a great deal of production JavaScript is organised.',
          },
          {
            type: 'list',
            id: 'j-l57-l1',
            style: 'bullet',
            items: [
              'The outer function runs once; the inner function runs whenever you like.',
              'Each call to the outer function produces a fresh copy of the captured variables.',
              'Nothing is snapshotted, so the inner function always reads the current value.',
            ],
          },
          {
            type: 'example',
            id: 'j-l57-e1',
            title: 'Three independent boxes',
            body: 'Each box was built by the same call to `makeBox`, so each keeps its own value with no shared variable in sight.',
            html: '<div id="boxes"></div>',
            javascript: `function makeBox(label) {
  var value = 0
  return function (n) {
    value += n
    return label + ' = ' + value
  }
}

var a = makeBox('a')
var b = makeBox('b')
var c = makeBox('c')

a(1); a(2); b(10); c(100); c(1)

document.getElementById('boxes').textContent =
  a(0) + '   ' + b(0) + '   ' + c(0)`,
            showPreview: true,
          },
          {
            type: 'heading',
            id: 'j-l57-h2',
            level: 3,
            body: 'The loop trap',
          },
          {
            type: 'text',
            id: 'j-l57-b3',
            body: 'Because the closure holds a live reference and not a copy, every handler created inside a loop closes over the same variable. Declare the counter with `let` in the loop head and each iteration gets its own binding, so each handler sees a different number. This is the classic reason `let` replaced `var` in loop headers, and it is worth recognising immediately when several callbacks all report the final value.',
          },
          {
            type: 'code',
            id: 'j-l57-c2',
            language: 'javascript',
            title: 'var shares one binding, let does not',
            code: `// wrong: every handler closes over the same i
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0)   // 3, 3, 3
}

// right: each iteration gets a fresh i
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0)   // 0, 1, 2
}`,
          },
          {
            type: 'warning',
            id: 'j-l57-w1',
            title: 'Closures keep things alive',
            body: 'Capturing a large object in a long-lived callback keeps that object in memory for as long as the callback exists. If a callback that runs forever holds a reference to a big array, that array can never be collected. Reach for a narrower capture, or let the reference go, when memory matters.',
          },
          {
            type: 'heading',
            id: 'j-l57-h3',
            level: 3,
            body: 'Closures over module-level state',
          },
          {
            type: 'code',
            id: 'j-l57-c3',
            language: 'javascript',
            title: 'A tiny module',
            code: `let items = []

export function add(item) {
  items.push(item)
}

export function all() {
  return items.slice()
}`,
          },
          {
            type: 'text',
            id: 'j-l57-b4',
            body: 'Module top-level variables are private to the module, and every function defined in that module closes over them. The two exported functions share the same `items` without either of them being able to replace it, which is why `all` returns a copy. If it returned `items` itself, any caller could clear the list with one method call.',
          },
          {
            type: 'exercise',
            id: 'j-l57-x1',
            exercise: {
              id: 'ex-js-closure-adder',
              instructions:
                'Write a function called `makeAdder` that takes a starting number and returns a function. Calling the returned function with a value adds it to the running total and returns the new total. Create one adder from 0, call it with 2, then with 3, and store the results in an array called `log` as the strings "2" and "5". Also create a second adder from 100, add 1 to it, and push that result to `log` as a string.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// makeAdder(start) returns a function that adds to its own total.
var log = []
`,
              },
              expectedOutput: '2 5 101',
              tests: [
                {
                  id: 'ex-js-closure-adder-t1',
                  label: 'makeAdder exists and returns a function',
                  body: `return typeof makeAdder === 'function' && typeof makeAdder(0) === 'function'
  ? true
  : 'makeAdder must be a function that returns a function.';`,
                },
                {
                  id: 'ex-js-closure-adder-t2',
                  label: 'The first adder keeps its own total',
                  body: `return log.length > 1 && String(log[0]) === '2' && String(log[1]) === '5'
  ? true
  : 'The same adder must accumulate: adding 2 then 3 gives 2 then 5.';`,
                },
                {
                  id: 'ex-js-closure-adder-t3',
                  label: 'A second adder starts from its own value',
                  body: `return log.length > 2 && String(log[2]) === '101'
  ? true
  : 'A second makeAdder(100) must keep a separate total, so adding 1 gives 101.';`,
                },
              ],
              hints: [
                'Declare the total inside `makeAdder`, not outside it. A total declared outside would be shared by every adder.',
                '`let total = start` at the top of `makeAdder`, then return a function that updates and returns it.',
                'Push the return value as a string: `log.push(String(add(2)))`.',
              ],
              solution: {
                javascript: `var log = []

function makeAdder(start) {
  var total = start
  return function (n) {
    total = total + n
    return total
  }
}

var a = makeAdder(0)
log.push(String(a(2)))
log.push(String(a(3)))

var b = makeAdder(100)
log.push(String(b(1)))

console.log(log.join(' '))`,
              },
              testNotes:
                'The third test is the real point: two adders made from the same function keep separate totals, which is only possible because each returned function closes over its own binding.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s47',
    title: 'Class syntax',
    description: 'Build one class from another with `extends` and `super`, so a subclass adds behaviour instead of copying it.',
    lessons: [
      {
        id: 'js-l58',
        title: 'Extending classes',
        description: 'Reuse a parent class and override only what actually differs.',
        duration: 7,
        objectives: [
          'Create a subclass with `extends` and call the parent with `super`',
          'Extend a built-in such as `Array` or `Error` correctly',
          'Avoid the two mistakes that break inheritance most often',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-js-l58',
          title: 'Extending classes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l58-q1',
              type: 'multiple-choice',
              prompt: 'Why must `super()` be called before any use of `this` in a subclass constructor?',
              options: [
                'It is a style convention with no runtime effect',
                'Until it runs there is no parent object for `this` to refer to',
                'Because `this` is not allowed in constructors at all',
                'To make the class static',
              ],
              answer: 1,
              explanation: 'The parent constructor is what creates the object. `super` runs it and hands you the result as `this`, so assigning to `this` before that is assigning to nothing, and you get a ReferenceError.',
            },
            {
              id: 'quiz-js-l58-q2',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'class A { greet() { return \'A\' } }\nclass B extends A { greet() { return \'B\' + super.greet() } }\nconsole.log(new B().greet())',
              options: [
                '`A`',
                '`B`',
                '`BA`',
                'It throws',
              ],
              answer: 2,
              explanation: '`super.greet()` runs the parent method and returns "A". The subclass prepends its own "B", so the result is "BA". Overriding without `super` would replace the parent behaviour instead of extending it.',
            },
            {
              id: 'quiz-js-l58-q3',
              type: 'true-false',
              prompt: 'A subclass of `Array` keeps its subclass type when you call `map` or `filter` on it.',
              answer: false,
              explanation: 'By default those methods return whatever constructor `this.constructor` names, and a subclass that wants the normal behaviour usually sets `static get [Symbol.species]`. Add that getter if the subclass must survive the operation.',
            },
            {
              id: 'quiz-js-l58-q4',
              type: 'blank',
              prompt: 'Which keyword names the parent class in a class declaration?',
              answers: [
                'extends',
              ],
              explanation: '`class Child extends Parent` states the relationship. `super` is the separate keyword used inside the child to reach the parent.',
            },
            {
              id: 'quiz-js-l58-q5',
              type: 'identify-error',
              prompt: 'What goes wrong here?',
              code: 'class Base {\n  constructor(name) { this.name = name }\n}\nclass Child extends Base {\n  constructor(name) {\n    this.tagged = true\n    super(name)\n  }\n}',
              options: [
                'Nothing, the order is fine',
                '`this.tagged = true` runs before any parent constructor, so `this` does not exist yet',
                '`tagged` is a reserved word',
                'A child class cannot have its own constructor',
              ],
              answer: 1,
              explanation: 'The parent constructor must run first. Move `super(name)` to the top of the child constructor, then set your own fields.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l58-b1',
            body: 'Inheritance is how one class says "everything the parent can do, plus this". The keyword `extends` names the parent, and `super` is the only way to reach into it. Two rules make the whole mechanism work: a subclass constructor must call `super` before it touches `this`, and `super` can only be used inside a constructor or a method. The `this` rule is not arbitrary, and the next block shows exactly why.',
          },
          {
            type: 'demo',
            id: 'j-l58-d1',
            title: 'A subclass that adds one thing',
            body: 'A plain class cannot do this on its own. Swap in `class Premium extends Member` and the constructor call does all the work.',
            html: '<pre id="out"></pre>',
            javascript: `class Member {
  constructor(name) {
    this.name = name
  }
  describe() {
    return 'member: ' + this.name
  }
}

class Premium extends Member {
  constructor(name, months) {
    super(name)
    this.months = months
  }
  describe() {
    return super.describe() + ' for ' + this.months + ' months'
  }
}

document.getElementById('out').textContent =
  new Member('Ada').describe() + '\\n' + new Premium('Grace', 12).describe()`,
          },
          {
            type: 'heading',
            id: 'j-l58-h1',
            level: 3,
            body: 'Why super must come first',
          },
          {
            type: 'text',
            id: 'j-l58-b2',
            body: 'Under the hood, a class is a function that builds an object and then copies parent methods onto its prototype. A subclass constructor works by temporarily creating the parent object with `super`, handing you that object as `this`, and then letting you add your own fields. Until `super` has run there is no `this` to add anything to. Writing `this.months = months` first produces a `ReferenceError`, and the error message is often unhelpful about the real cause.',
          },
          {
            type: 'code',
            id: 'j-l58-c1',
            language: 'javascript',
            title: 'The order that matters',
            code: `class Bad extends Member {
  constructor(name) {
    this.name = name      // ReferenceError: 'this' is not available
    super(name)
  }
}

class Good extends Member {
  constructor(name) {
    super(name)           // parent first, always
    this.name = name
  }
}`,
          },
          {
            type: 'heading',
            id: 'j-l58-h2',
            level: 3,
            body: 'Extending a built-in',
          },
          {
            type: 'text',
            id: 'j-l58-b3',
            body: 'You can also extend something that was not written as a class, including the built-ins. The rule is the same: call `super` with the arguments the built-in expects, and you get a fully formed built-in as `this`. Subclassing `Array` is the common example, because a class that behaves like an array but adds a method is genuinely useful.',
          },
          {
            type: 'code',
            id: 'j-l58-c2',
            language: 'javascript',
            title: 'A list that can sum itself',
            code: `class SumList extends Array {
  sum() {
    return this.reduce((total, n) => total + n, 0)
  }
}

const list = new SumList(1, 2, 3, 4)
list.push(5)
console.log(list.sum())    // 15
console.log(Array.isArray(list))  // true`,
          },
          {
            type: 'list',
            id: 'j-l58-l1',
            style: 'bullet',
            items: [
              '`super(args)` in a constructor must be the first statement that uses `this`.',
              '`super.method()` in a method runs the parent version, so you can extend behaviour instead of replacing it.',
              'Arrow functions never have their own `this`, so you cannot use `super` inside one.',
              'A subclass constructor that omits `super` entirely is a syntax error, not a runtime surprise.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l58-t1',
            title: 'Prefer composition when the relationship is not "is a"',
            body: 'Inheritance means every change to the parent changes every child. If a `Premium` member is not genuinely a kind of `Member`, give it a member as a constructor argument instead. Composition is easier to change and easier to test.',
          },
          {
            type: 'example',
            id: 'j-l58-e1',
            title: 'Overriding, then adding to',
            body: '`describe` replaces the parent version; `level` is new. Calling `super` keeps the original output instead of retyping it.',
            html: '<pre id="out"></pre>',
            javascript: `class Shape {
  describe() { return 'a shape' }
}
class Circle extends Shape {
  constructor(r) {
    super()
    this.r = r
  }
  describe() { return super.describe() + ' with radius ' + this.r }
  area() { return Math.round(3.14159 * this.r * this.r) }
}
document.getElementById('out').textContent =
  new Circle(3).describe() + '\\narea: ' + new Circle(3).area()`,
            showPreview: true,
          },
          {
            type: 'warning',
            id: 'j-l58-w1',
            title: 'Mutating an inherited array',
            body: 'If your constructor is `constructor(items) { super(items) }`, push and splice methods inherited from `Array` can add or remove elements, changing the length, and `map` and `filter` will return a plain `Array` rather than your subclass. Use the spread form `super(...items)` and add a `static get [Symbol.species]` if you need the subclass to survive those operations.',
          },
          {
            type: 'exercise',
            id: 'j-l58-x1',
            exercise: {
              id: 'ex-js-extends-notifier',
              instructions:
                'A class `Event` already exists with a constructor taking `name` and a `describe` method returning "event: " plus the name. Write `class Reminder extends Event` whose constructor takes `name` and `days`, calls `super` with the name, and stores `days`. Give it a `describe` method that returns the parent description plus " in " plus the days plus " days". Store an instance created with "standup" and 7 in a variable called `item`, and log its describe output.',
              languages: ['javascript'],
              starterCode: {
                javascript: `class Event {
  constructor(name) {
    this.name = name
  }
  describe() {
    return 'event: ' + this.name
  }
}

// class Reminder extends Event { ... }
// var item = new Reminder('standup', 7)

var output = ''
`,
              },
              expectedOutput: 'event: standup in 7 days',
              tests: [
                {
                  id: 'ex-js-extends-notifier-t1',
                  label: 'Reminder extends Event',
                  body: `return typeof Reminder === 'function' && Reminder.prototype instanceof Event
  ? true
  : 'Declare class Reminder extends Event.';`,
                },
                {
                  id: 'ex-js-extends-notifier-t2',
                  label: 'super is called with the name',
                  body: `return typeof item !== 'undefined' && item.name === 'standup' && item.days === 7
  ? true
  : 'Create new Reminder(\\'standup\\', 7) and pass the name to super(name).';`,
                },
                {
                  id: 'ex-js-extends-notifier-t3',
                  label: 'describe reuses the parent message',
                  body: `return typeof item.describe === 'function' && item.describe() === 'event: standup in 7 days'
  ? true
  : 'Return super.describe() plus \\' in \\' plus this.days plus \\' days\\'.';`,
                },
              ],
              hints: [
                '`extends Event` goes in the class declaration itself, not in the constructor.',
                'The first line of the constructor is `super(name)`, and only then can you write `this.days = days`.',
                'Inside `describe`, call `super.describe()` and add your text to whatever it returned.',
              ],
              solution: {
                javascript: `class Event {
  constructor(name) {
    this.name = name
  }
  describe() {
    return 'event: ' + this.name
  }
}

class Reminder extends Event {
  constructor(name, days) {
    super(name)
    this.days = days
  }
  describe() {
    return super.describe() + ' in ' + this.days + ' days'
  }
}

var item = new Reminder('standup', 7)
var output = item.describe()
console.log(output)`,
              },
              testNotes:
                'The third test checks the composed string, so it only passes if the parent was actually reused through super rather than retyped.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s48',
    title: 'Static methods',
    description: 'Attach behaviour to the class itself rather than to the objects it builds.',
    lessons: [
      {
        id: 'js-l59',
        title: 'Static methods',
        description: 'Put helpers and factories on the class, where they are reached through the class name.',
        duration: 5,
        objectives: [
          'Distinguish a static method from a prototype method',
          'Build named constructors that return a configured instance',
          'Keep a constant next to the class that owns it',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l59',
          title: 'Static methods quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l59-q1',
              type: 'multiple-choice',
              prompt: 'What is `this` inside a static method?',
              options: [
                'The instance the method was called on',
                'The class itself',
                '`undefined` always',
                'The global object',
              ],
              answer: 1,
              explanation: 'Statics live on the constructor, not the prototype, so `this` is the class. That is why a static can read `this.name` for a class name but can never see an instance field.',
            },
            {
              id: 'quiz-js-l59-q2',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'class Counter {\n  constructor() { this.n = 0 }\n  static make() { return new Counter() }\n  bump() { this.n += 1; return this.n }\n}\nconsole.log(Counter.make().bump())',
              options: [
                '`1`',
                '`0`',
                '`undefined`',
                'It throws',
              ],
              answer: 0,
              explanation: '`Counter.make` is a static factory returning a new instance, and `bump` is a prototype method that runs on that instance, giving 1.',
            },
            {
              id: 'quiz-js-l59-q3',
              type: 'true-false',
              prompt: 'A static method can read a property that was set on the instance.',
              answer: false,
              explanation: 'There is no instance in a static method. If the helper needs instance data, it belongs on the prototype instead, which is the usual reason a static helper appears to ignore its arguments.',
            },
            {
              id: 'quiz-js-l59-q4',
              type: 'blank',
              prompt: 'Which keyword declares a method on the class rather than on its instances?',
              answers: [
                'static',
              ],
              explanation: '`static of(...)` hangs the method off the constructor, so it is called as `ClassName.of(...)` and can be used before any instance exists.',
            },
            {
              id: 'quiz-js-l59-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this factory?',
              code: 'class Config {\n  constructor(overrides) {\n    Object.assign(this, overrides)\n  }\n  static defaults() {\n    return { theme: \'dark\' }\n  }\n}\nconst c = new Config()\nc.theme = Config.defaults().theme',
              options: [
                'Nothing, this is correct',
                'Nothing is wrong with the factory; the problem is `Object.assign` in a constructor',
                '`static defaults` cannot return an object literal',
                'A constructor cannot call `Object.assign`',
              ],
              answer: 2,
              explanation: 'Static methods can return ordinary values, including object literals, and `Object.assign` in a constructor is idiomatic. If the intent was a static that builds a configured instance, it should return `new Config(...)` rather than leaving callers to assemble the object themselves.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l59-b1',
            body: 'A normal method lives on the prototype, so every instance has it and `this` is the instance. A static method lives on the class itself, so you reach it through the class name and `this` is the class. The deciding question is not "does this need the instance?" but "would this make sense if there were no instances at all?" A parser, a factory, a validator: those belong on the class.',
          },
          {
            type: 'demo',
            id: 'j-l59-d1',
            title: 'Two places to hang behaviour',
            body: 'The prototype method needs an instance. The static method does not, and `this` is the class itself.',
            html: '<pre id="out"></pre>',
            javascript: `class Money {
  constructor(amount) { this.amount = amount }
  plus(other) { return new Money(this.amount + other.amount) }
  static zero() { return new Money(0) }
}

document.getElementById('out').textContent =
  new Money(5).plus(Money.zero()).amount`,
          },
          {
            type: 'code',
            id: 'j-l59-c1',
            language: 'javascript',
            title: 'Static versus prototype',
            code: `class Point {
  constructor(x, y) { this.x = x; this.y = y }

  move(dx, dy) {          // prototype: one per instance
    this.x += dx
    this.y += dy
    return this
  }

  static origin() {        // static: one per class
    return new Point(0, 0)
  }

  static of(x, y) {        // a named constructor
    return new Point(x, y)
  }
}

Point.origin()        // works, no instance needed
Point.of(3, 4)        // works
new Point(1, 2).move(1, 1)`,
          },
          {
            type: 'heading',
            id: 'j-l59-h1',
            level: 3,
            body: 'Named constructors',
          },
          {
            type: 'text',
            id: 'j-l59-b2',
            body: 'A static factory does something a plain `new` call cannot: it can decide what to build. A static `from` or `of` method can validate arguments, apply defaults, and return a different class entirely, such as a specific subclass for one input shape. It also gives one name to the concept, so the argument order is documented in one place instead of repeated at every call site.',
          },
          {
            type: 'code',
            id: 'j-l59-c2',
            language: 'javascript',
            title: 'A factory that validates',
            code: `class Temp {
  constructor(celsius) {
    if (typeof celsius !== 'number') {
      throw new TypeError('celsius must be a number')
    }
    this.celsius = celsius
  }
  static fromFahrenheit(f) {
    return new Temp((f - 32) * 5 / 9)
  }
  get inFahrenheit() {
    return this.celsius * 9 / 5 + 32
  }
}

Temp.fromFahrenheit(212).celsius   // 100`,
          },
          {
            type: 'list',
            id: 'j-l59-l1',
            style: 'bullet',
            items: [
              '`static method()` — reached as `ClassName.method()`. `this` is the class.',
              '`static get name()` — a computed constant, read as `ClassName.name`.',
              '`ClassName.field = value` after the declaration — the old way to attach a static, still worth recognising.',
              'An instance cannot call a static method, and a static method cannot call an instance method without being handed one.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l59-t1',
            title: 'Statics are not inherited the way you might expect',
            body: 'A subclass does get its parent statics through the prototype chain, so `Child.of` works if `Parent.of` exists. But a static method that uses `this` will see the subclass, not the parent, which is usually what you want and occasionally a surprise.',
          },
          {
            type: 'example',
            id: 'j-l59-e1',
            title: 'A static factory that picks the subclass',
            body: 'The static method is on the class and decides which class to build, so callers never write `new` themselves.',
            html: '<pre id="out"></pre>',
            javascript: `class Shape {
  constructor(name) { this.name = name }
  static from(kind) {
    if (kind === 'circle') return new Circle('circle')
    if (kind === 'square') return new Square('square')
    return new Shape('shape')
  }
  describe() { return this.name }
}
class Circle extends Shape {}
class Square extends Shape {}

var list = ['circle', 'square', 'blob'].map(function (k) {
  return Shape.from(k).describe()
})
document.getElementById('out').textContent = list.join(', ')`,
            showPreview: true,
          },
          {
            type: 'warning',
            id: 'j-l59-w1',
            title: 'A static cannot see instance state',
            body: 'There is no instance in a static method, so `this.amount` is undefined there. If a helper needs a value from the object, it belongs on the prototype instead. This is the usual reason a `static` helper someone wrote appears to ignore its arguments.',
          },
          {
            type: 'exercise',
            id: 'j-l59-x1',
            exercise: {
              id: 'ex-js-static-factory',
              instructions:
                'A class `Queue` exists with a constructor taking no arguments that sets `this.items = []`, plus an `add` method that pushes onto `this.items`. Add a static method `of` to `Queue` that takes an array and builds one queue already containing those items, using a spread into the constructor. Then build `var q = Queue.of([1, 2, 3])` and log `q.items.length`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `class Queue {
  constructor() {
    this.items = []
  }
  add(item) {
    this.items.push(item)
    return this
  }
}

// Add Queue.of(arr) here.
// var q = Queue.of([1, 2, 3])

var length = 0
`,
              },
              expectedOutput: '3',
              tests: [
                {
                  id: 'ex-js-static-factory-t1',
                  label: 'Queue.of is a static method',
                  body: `return typeof Queue.of === 'function' && Queue.of([1]).items.length === 1
  ? true
  : 'Declare static of(arr) on Queue and return a new Queue.';`,
                },
                {
                  id: 'ex-js-static-factory-t2',
                  label: 'It returns a real Queue',
                  body: `return typeof q !== 'undefined' && q instanceof Queue && Array.isArray(q.items)
  ? true
  : 'Queue.of must return an instance, so build it with new Queue(...arr).';`,
                },
                {
                  id: 'ex-js-static-factory-t3',
                  label: 'q holds the three values',
                  body: `return typeof q !== 'undefined' && q.items.length === 3 && q.items[2] === 3
  ? true
  : 'The three values from the argument must all end up in q.items.';`,
                },
              ],
              hints: [
                'The keyword goes in the class body: `static of(arr) { ... }`.',
                'The constructor takes no arguments, so spread the array into it: `new Queue(...arr)`.',
                'Then set `length = q.items.length` and log it.',
              ],
              solution: {
                javascript: `class Queue {
  constructor(items) {
    this.items = items || []
  }
  add(item) {
    this.items.push(item)
    return this
  }
  static of(arr) {
    return new Queue(arr.slice())
  }
}

var q = Queue.of([1, 2, 3])
var length = q.items.length
console.log(length)`,
              },
              testNotes:
                'Passing a copy with slice keeps the caller from mutating the queue by holding on to the original array.',
            },
          },
        ],
      },
    ],
  },
]
