import type { Section } from '~/types/content'

export const jsMechanicsSections: Section[] = [
  {
    id: 'js-s28',
    title: 'Scope',
    description:
      'Where a name is visible, and how a function carries state with it after the function that made it has finished.',
    lessons: [
      {
        id: 'js-l36',
        title: 'Scope and closures',
        description:
          'Where a variable is visible, why some code runs before it should, and how a function carries state with it.',
        duration: 6,
        objectives: [
          'Name the three kinds of scope in JavaScript',
          'Explain what hoisting does to declarations and initialisers',
          'Use a closure to keep state private to a function',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l36-b1',
            body: 'The three layers below each hold a variable with the same name. Only one of them is visible on any given line, and the rule that decides which is scope. Press the button to see which one each line reads.',
          },
          {
            type: 'demo',
            id: 'j-l36-d1',
            title: 'One name, three places it can live',
            body: 'The same `where` is declared three times. Every line below reads the nearest declaration above it, which is why the value changes as the code steps in and out of a block.',
            html: `<button id="go">Log the same name from three places</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { font: inherit; padding: 0.45rem 0.8rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 0.75rem 0 0; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const where = 'global scope'

function outer() {
  const where = 'function scope'
  const lines = ['inside outer(): ' + where]
  {
    const where = 'block scope'
    lines.push('inside the block: ' + where)
  }
  lines.push('back in outer(): ' + where)
  return lines
}

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  out.textContent = ['at the top: ' + where].concat(outer()).join(' | ')
})`,
            height: 150,
          },
          {
            type: 'text',
            id: 'j-l36-b2',
            body: '**Scope** decides where a name is visible. It is the reason the same variable name can mean two different things in two different places, and the reason an error about a variable you can plainly see in the source is possible at all.',
          },
          {
            type: 'heading',
            id: 'j-l36-h1',
            level: 3,
            body: 'Three kinds of scope',
          },
          {
            type: 'list',
            id: 'j-l36-l1',
            style: 'bullet',
            items: [
              '**Global scope** — declared outside any function. Every script and function on the page can read it. Keep these to almost none.',
              '**Function scope** — declared inside a function. Visible only inside that function, and gone once it returns.',
              '**Block scope** — declared with `let` or `const` inside `{ }`. Visible only inside those braces, which is every `if` body, `for` body and function body.',
            ],
          },
          {
            type: 'code',
            id: 'j-l36-c1',
            language: 'javascript',
            title: 'Three layers of the same name',
            code: `const name = 'global'

function outer() {
  const name = 'outer'
  console.log(name)      // outer

  {
    const name = 'block'
    console.log(name)    // block
  }
}

console.log(name)        // global
outer()`,
          },
          {
            type: 'heading',
            id: 'j-l36-h2',
            level: 3,
            body: 'Hoisting, and the error that makes no sense',
          },
          {
            type: 'code',
            id: 'j-l36-c2',
            language: 'javascript',
            title: 'One of these two calls works',
            code: `greet()            // 'hi' — the declaration is hoisted
function greet() {
  return 'hi'
}

sayHi()             // ReferenceError
const sayHi = () => 'hi'`,
          },
          {
            type: 'text',
            id: 'j-l36-b3',
            body: 'JavaScript reads a scope and notes every **declaration** in it before it runs a single statement. A function declaration therefore exists from the top of the scope with its value attached, which is why the first call works. `let` and `const` are noted too, but only as *reserved*: they exist and have no value yet. The span from the top of the block down to the declaration line is the **temporal dead zone**, and touching the name inside it is a `ReferenceError`.',
          },
          {
            type: 'warning',
            id: 'j-l36-w1',
            title: 'Why that error message is so unhelpful',
            body: 'The message says the variable cannot be accessed before initialisation, which is true and tells you nothing else. The name is right there in the source, the spelling is fine, and yet the browser behaves as though you never declared it. Read it as "this line runs before the declaration line", look upwards for where the block actually starts, and move the declaration up.',
          },
          {
            type: 'heading',
            id: 'j-l36-h3',
            level: 3,
            body: 'Closures: a function plus what it remembers',
          },
          {
            type: 'text',
            id: 'j-l36-b4',
            body: 'When a function finishes, its local variables normally disappear. But a function that hands back another function keeps the variables it used alive, because that inner function still refers to them. A **closure** is nothing more than that pairing: a function, plus the variables it remembers from where it was written. The outer function is the factory; the inner one carries the state with it wherever it goes.',
          },
          {
            type: 'code',
            id: 'j-l36-c3',
            language: 'javascript',
            title: 'A counter nobody else can touch',
            code: `// a global counter: any code on the page can change it
let counter = 0

// the same counter, sealed inside a factory
function makeCounter() {
  let count = 0
  return function () {
    count += 1
    return count
  }
}

const add = makeCounter()
console.log(add(), add())  // 1, 2 — count is remembered between calls
console.log(counter)      // 0 — the global one was never touched`,
          },
          {
            type: 'example',
            id: 'j-l36-e1',
            title: 'A closure holding state you can see',
            body: 'Click a few times. The number keeps going up even though `count` is not a global variable and nothing outside `makeCounter` holds it — the returned function carries it.',
            html: `<button id="add">Add one</button>
<p id="out">0</p>`,
            javascript: `const button = document.querySelector('#add')
const out = document.querySelector('#out')

function makeCounter() {
  let count = 0
  return () => (count += 1)
}

const next = makeCounter()
button.addEventListener('click', () => {
  out.textContent = next()
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l36-x1',
            exercise: {
              id: 'ex-js-closure-counter',
              instructions:
                'Write `makeCounter(start)` so it returns a function. Every call to the returned function increases the running count by one and returns the new value, starting from `start`. Two counters made by separate calls must not share state. Then create one from 0 and log three calls.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// makeCounter(start) returns a function that counts up from start.

function makeCounter(start) {
  
}

const next = makeCounter(0)
console.log(next(), next(), next())
`,
              },
              expectedOutput: '1\n2\n3',
              tests: [
                {
                  id: 'ex-js-closure-counter-t1',
                  label: 'makeCounter is a function',
                  body: `return typeof makeCounter === 'function' ? true : 'Define a function called makeCounter.';`,
                },
                {
                  id: 'ex-js-closure-counter-t2',
                  label: 'The returned function counts up from the starting value',
                  body: `if (typeof makeCounter !== 'function') return 'Define a function called makeCounter.'
var fromZero = makeCounter(0)
if (fromZero() !== 1) return 'Starting at 0, the first call should return 1, got: ' + fromZero()
return fromZero() === 2 ? true : 'The second call should return 2, got: ' + fromZero();`,
                },
                {
                  id: 'ex-js-closure-counter-t3',
                  label: 'Two counters keep separate state',
                  body: `if (typeof makeCounter !== 'function') return 'Define a function called makeCounter.'
var first = makeCounter(10)
var second = makeCounter(100)
first()
first()
if (second() !== 101) return 'A second counter from 100 should return 101, got: ' + second()
return first() === 13 ? true : 'The first counter should have reached 13 on its third call, got: ' + first();`,
                },
                {
                  id: 'ex-js-closure-counter-t4',
                  label: 'The three counts were logged',
                  body: `var log = window.__log || []
var last3 = log.slice(log.length - 3)
return last3[0] === '1' && last3[1] === '2' && last3[2] === '3'
  ? true
  : 'Expected 1, then 2, then 3 — got: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'The count cannot be a variable in the outer script, or every counter would share it. Declare it inside makeCounter instead.',
                'Return a function from makeCounter. When it is called it changes the count it can see and returns the new value.',
                'The whole thing is: function makeCounter(start) { let count = start; return function () { count += 1; return count } }.',
              ],
              solution: {
                javascript: `function makeCounter(start) {
  let count = start
  return function () {
    count += 1
    return count
  }
}

const next = makeCounter(0)
console.log(next())
console.log(next())
console.log(next())`,
              },
              testNotes:
                'The third check is the one that matters: it fails for any version that keeps the count in a shared place, which is exactly the mistake a global counter invites.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s28',
      title: 'Scope check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s28-q1',
          type: 'multiple-choice',
          prompt: 'Which declaration decides the value of `label` on the line that logs it?',
          code: `function report() {
  const label = 'report'
  if (true) {
    const label = 'section'
    console.log(label)
  }
}`,
          options: [
            'The `label` in the `if` block, because it is declared nearest the line',
            'The `label` in the function body, because an inner block cannot shadow an outer one',
            'Whichever was assigned last, regardless of nesting',
            'Neither — `if` bodies do not create their own scope',
          ],
          answer: 0,
          explanation:
            'Scope lookup walks outwards from the line and stops at the first declaration it finds. The block-scoped `label` sits nearest the `console.log`, so it wins — the outer one is shadowed for the rest of the block. That is also why the block one has to be a different name if you meant the outer value.',
        },
        {
          id: 'quiz-js-s28-q2',
          type: 'true-false',
          prompt: 'A closure gives a returned function a way to change a variable that the code calling it can also see and change.',
          answer: false,
          explanation:
            'It is the other way round. The remembered variables stay inside the factory: `makeCounter()` seals `count` away, and the returned function is the only thing with a reference to it. That privacy is the reason to reach for a closure rather than a global variable, which any code on the page can overwrite.',
        },
        {
          id: 'quiz-js-s28-q3',
          type: 'blank',
          prompt:
            'The span from the top of a block down to the `let` or `const` declaration is called the temporal ____ ____.',
          answers: ['dead zone', 'deadzone', 'temporal dead zone'],
          explanation:
            'The name is the temporal dead zone. The declaration is noted when the scope is read but has no value yet, so touching the name in that span throws a ReferenceError. Moving the declaration above its first use always fixes it.',
        },
        {
          id: 'quiz-js-s28-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const value = 'top'

function show() {
  console.log(value)
  {
    const value = 'inside'
    console.log(value)
  }
  console.log(value)
}

show()`,
          options: ['top, inside, top', 'inside, inside, top', 'top, top, top', 'inside, top, inside'],
          answer: 0,
          explanation:
            'The first `console.log` is before the block opens, so the only `value` in scope is the top one. Inside the braces the nearer declaration shadows it. After the braces close, the inner declaration is gone and the outer one is visible again — a block shadow is temporary.',
        },
        {
          id: 'quiz-js-s28-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `function makeCounter() {
  count = 0
  return function () {
    count += 1
    return count
  }
}

const a = makeCounter()
const b = makeCounter()`,
          options: [
            'Nothing is wrong, two calls to makeCounter give two counters',
            'count is never declared, so both counters share one implicit global and interfere with each other',
            'count is block scoped, so it cannot be used inside the returned function',
            'makeCounter must be called with the new keyword',
          ],
          answer: 1,
          explanation:
            'The assignment has no `let`, `const` or `var` in front of it, so it creates a global. Both returned functions close over that same global, so calling `a()` also moves `b()` — the exact opposite of the sealed counter the factory is there to provide. Declare `let count = 0` inside `makeCounter`.',
        },
      ],
    },
  },
  {
    id: 'js-s29',
    title: 'Hoisting',
    description:
      'Why a function can be called above the line it is written on, and why a variable cannot.',
    lessons: [
      {
        id: 'js-l37',
        title: 'Hoisting',
        description:
          'What JavaScript does with your declarations before it runs anything, and the two different errors that come out of it.',
        duration: 5,
        objectives: [
          'Say what happens to declarations before the first statement runs',
          'Explain the difference between a hoisted function and a reserved variable',
          'Find the temporal dead zone in a piece of code',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l37-b1',
            body: 'The script below runs from top to bottom, and it still manages to call a function written further down the file. Press the button to watch it happen in order.',
          },
          {
            type: 'demo',
            id: 'j-l37-d1',
            title: 'Three runs, three different answers',
            body: 'Each case is logged in the order the code runs. A function declaration is ready before the first line executes; a `var` exists but is empty; a `const` does not exist yet, so touching it stops the script.',
            html: `<div class="row">
  <div class="card"><h3>function</h3><pre id="a">waiting</pre></div>
  <div class="card"><h3>var</h3><pre id="b">waiting</pre></div>
  <div class="card"><h3>const</h3><pre id="c">waiting</pre></div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 0.75rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.7rem; }
.card h3 { margin: 0 0 0.4rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
pre { margin: 0; padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 12px; white-space: pre-wrap; }`,
            javascript: `const out = {
  a: document.querySelector('#a'),
  b: document.querySelector('#b'),
  c: document.querySelector('#c')
}

out.a.textContent = 'typeof later: ' + (typeof later)
out.b.textContent = 'typeof early: ' + (typeof early) + ', value: ' + early

function later() {
  return 'ready'
}

var early = 'set further down'

try {
  out.c.textContent = 'value is: ' + notYet
} catch (error) {
  out.c.textContent = error.name + ': cannot read it yet'
}

const notYet = 'finally'`,
            height: 190,
          },
          {
            type: 'text',
            id: 'j-l37-b2',
            body: 'JavaScript does not read your file the way a compiler with a single upward pass would. It reads a scope first, notes every **declaration** in it, and only then starts running statements. That pre-pass is hoisting, and it treats the four kinds of declaration very differently.',
          },
          {
            type: 'heading',
            id: 'j-l37-h1',
            level: 3,
            body: 'What each declaration gets from the pre-pass',
          },
          {
            type: 'list',
            id: 'j-l37-l1',
            style: 'bullet',
            items: [
              '**`function`** — hoisted whole. The name points at the function from the very top of the scope, so calling it above the definition works. This is why you can call every function in a file from the top of it.',
              '**`var`** — hoisted as an empty slot. The name exists, so it does not throw, but its value is `undefined` until the assignment runs. Code above the assignment sees `undefined` and carries on with the wrong value instead of complaining.',
              '**`let` and `const`** — noted but **not** given a value. The name is reserved and reading it before the declaration line throws a `ReferenceError`. The design is deliberate: an uninitialised value is a bug worth stopping for, where `undefined` is a bug you find three hours later.',
              '**`class`** — not hoisted at all, exactly like a reserved variable. Using a class above its declaration throws.',
            ],
          },
          {
            type: 'code',
            id: 'j-l37-c1',
            language: 'javascript',
            title: 'The same mistake, three different outcomes',
            code: `console.log(fnType())     // 'function' — fully hoisted
console.log(varType)       // undefined — hoisted, no value yet
// console.log(letType)    // ReferenceError — in the temporal dead zone

function fnType() { return 'function' }
var varType = 'var'
let letType = 'let'`,
          },
          {
            type: 'heading',
            id: 'j-l37-h2',
            level: 3,
            body: 'The temporal dead zone',
          },
          {
            type: 'text',
            id: 'j-l37-b3',
            body: 'The span from the top of a block down to the `let` or `const` line is the **temporal dead zone**. It is not a special runtime state you can inspect — it is just the consequence of the declaration being known but unassigned. Two details catch people: the zone is per block, so moving a `let` one brace outwards gives it a longer dead zone, and it is per *name*, so a different name declared earlier in the same block is fine.',
          },
          {
            type: 'warning',
            id: 'j-l37-w1',
            title: 'Reading the error',
            body: '"Cannot access before initialization" does not mean the variable is missing. It means the line you are on runs before the line that gives it a value. Do not go looking for a typo — go looking upwards for where the block starts, and move the declaration above its first use.',
          },
          {
            type: 'heading',
            id: 'j-l37-h3',
            level: 3,
            body: 'Hoisting across files',
          },
          {
            type: 'text',
            id: 'j-l37-b4',
            body: 'Two classic `<script>` tags on a page share one global scope, so the second file can call a function the first file declared even though it appears later in the document — that is hoisting across script tags, and it is also why one file can quietly overwrite a variable another file declared with `var`. Modules do not work that way: each file gets its own scope and `import` statements are resolved and evaluated before the importing code runs, so the file order in the HTML no longer matters.',
          },
          {
            type: 'tip',
            id: 'j-l37-t1',
            title: 'Never rely on it',
            body: 'Being able to call a hoisted function from the top of a file is useful for reading, and useless as a technique: it makes the reader check the whole file before they can understand the first function. Declare things where they belong and let the order in the file mean something.',
          },
          {
            type: 'exercise',
            id: 'j-l37-x1',
            exercise: {
              id: 'ex-js-hoist-order',
              instructions:
                'The script below stops before it prints anything. Fix it so it prints `ready`, then `started`, then `done` — without deleting the `const` declaration or the `announce` function.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Two problems: the const is read above its declaration, and
// announce() is called above where it is written.

announce('ready')

const stage = 'started'

announce(stage)
announce('done')

function announce(message) {
  console.log(message)
}
`,
              },
              expectedOutput: 'ready\nstarted\ndone',
              tests: [
                {
                  id: 'ex-js-hoist-order-t1',
                  label: 'The script runs without stopping',
                  body: `var log = window.__log || []
return log.length >= 3
  ? true
  : 'Expected three lines of output, got ' + log.length + '. The const is read before it is declared, which stops the script with a ReferenceError.';`,
                },
                {
                  id: 'ex-js-hoist-order-t2',
                  label: 'ready is printed first',
                  body: `var log = window.__log || []
return log[0] === 'ready'
  ? true
  : 'The first line should be ready, got: ' + (log[0] === undefined ? 'nothing at all' : log[0]);`,
                },
                {
                  id: 'ex-js-hoist-order-t3',
                  label: 'started then done follow in that order',
                  body: `var log = window.__log || []
return log[1] === 'started' && log[2] === 'done'
  ? true
  : 'Expected started then done, got: ' + log.join(' | ');`,
                },
                {
                  id: 'ex-js-hoist-order-t4',
                  label: 'Both declarations survived the fix',
                  body: `if (typeof announce !== 'function') return 'Keep the function declaration called announce.'
return typeof stage === 'string' ? true : 'Keep the const declaration called stage.';`,
                },
              ],
              hints: [
                'There are two separate problems. Work out which one stops the script first, fix it, then run again and look for the second.',
                'A `const` read above its own declaration throws; moving the `const stage` line above the first `announce(stage)` call fixes that half.',
                'The `announce(\'ready\')` call at the top works today only because function declarations are hoisted. Move it below the function if you would rather not rely on that.',
              ],
              solution: {
                javascript: `function announce(message) {
  console.log(message)
}

announce('ready')

const stage = 'started'

announce(stage)
announce('done')`,
              },
              testNotes:
                'The checks read the console output, so the fix has to be in the script itself rather than in the expected values.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s29',
      title: 'Hoisting check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s29-q1',
          type: 'multiple-choice',
          prompt: 'What does this print?',
          code: `console.log(typeof fn)
console.log(typeof later)
function fn() {}`,
          options: ['"undefined"', '"function"', '"object"', 'It throws'],
          answer: 2,
          explanation:
            'Function declarations are hoisted whole, so `fn` already holds a function value by the time the first `console.log` runs. `later` has not been reached, and a `typeof` on an undeclared name is one of the few operations that is safe to do — it returns "undefined" instead of throwing.',
        },
        {
          id: 'quiz-js-s29-q2',
          type: 'true-false',
          prompt: 'Reading a `const` declared further down the current block gives you `undefined` rather than an error.',
          answer: false,
          explanation:
            'It throws a ReferenceError. `var` gives you `undefined`; `let` and `const` are reserved during the pre-pass and reading one before its declaration line is a hard stop. That is the deliberate design choice — a wrong value you carry on with is harder to find than a line that refuses to run.',
        },
        {
          id: 'quiz-js-s29-q3',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `console.log(a)
var a = 1
console.log(a)`,
          options: ['1 then 1', 'undefined then 1', '1 then undefined', 'It throws'],
          answer: 1,
          explanation:
            '`var a = 1` is split by the pre-pass into a declaration, which is hoisted as an empty slot, and an assignment, which stays where it is. So the first log reads the empty slot and prints `undefined`, and the second reads the value once the assignment has run. This is the silent version of the bug that `let` turns into an error.',
        },
        {
          id: 'quiz-js-s29-q4',
          type: 'blank',
          prompt:
            'A class declaration is not hoisted, so using one above its own declaration line behaves like a ____ ____ of a let, and throws.',
          answers: ['reference error', 'referenceerror'],
          explanation:
            'Classes get the same treatment as `let` and `const`: the name is reserved in the pre-pass but has no value until the declaration runs. Put classes above the code that uses them, or import them from a module, which is evaluated first.',
        },
        {
          id: 'quiz-js-s29-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const config = getConfig()
console.log(config)

function getConfig() {
  const settings = { theme: 'dark' }
  return settings
}`,
          options: [
            'Nothing is wrong, function declarations are hoisted',
            'getConfig must be called with the new keyword',
            'settings is not visible outside the function that declares it',
            'const cannot be used at the top level of a script',
          ],
          answer: 0,
          explanation:
            'This is hoisting doing its job. `getConfig` is a function declaration, so it is fully defined before the first statement runs, and calling it above the definition is safe. The same code with `const getConfig = () => ...` would throw, which is the difference worth remembering when you convert declarations into arrows.',
        },
      ],
    },
  },
  {
    id: 'js-s30',
    title: 'Strict mode',
    description:
      'A switch that turns the cases JavaScript guesses about into cases it tells you about.',
    lessons: [
      {
        id: 'js-l38',
        title: 'Strict mode',
        description:
          'What strict mode changes, why it exists, and what it stops you from getting away with.',
        duration: 5,
        objectives: [
          'Turn strict mode on for a script or a whole file',
          'Name the mistakes strict mode turns into errors',
          'Explain why modules and class bodies are always strict',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l38-b1',
            body: 'Loose mode was designed in 1995, when every value on a web page was expected to be a number or a short string and guessing was harmless. Press the button to see what loose mode does with a value it has to guess about.',
          },
          {
            type: 'demo',
            id: 'j-l38-d1',
            title: 'The same line, loose and strict',
            body: 'The left panel runs in loose mode and the right panel in strict mode. Everything else about the two scripts is identical.',
            html: `<div class="row">
  <div class="card"><h3>Loose</h3><pre id="a">waiting</pre></div>
  <div class="card"><h3>Strict</h3><pre id="b">waiting</pre></div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 0.75rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.7rem; }
.card h3 { margin: 0 0 0.4rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
pre { margin: 0; padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 12px; white-space: pre-wrap; }`,
            javascript: `const loose = document.querySelector('#a')
const strict = document.querySelector('#b')

loose.textContent = '10 + "5" is: ' + (10 + '5')

try {
  new Function('"use strict"; return leaked')()
} catch (error) {
  strict.textContent = error.name + ': leaked is not defined'
}

new Function('leaked = 1; return leaked')()
loose.textContent += ' | leaked became a ' + (window.leaked === 1 ? 'global' : 'nothing')`,
            height: 150,
          },
          {
            type: 'text',
            id: 'j-l38-b2',
            body: '**Strict mode** is a set of rules JavaScript applies when it refuses to fill in the blanks. Loose mode resolves a small mistake by guessing; strict mode refuses, and says so. Every case it catches is a mistake that would otherwise show up later as a wrong number or a variable that appeared from nowhere.',
          },
          {
            type: 'heading',
            id: 'j-l38-h1',
            level: 3,
            body: 'Turning it on',
          },
          {
            type: 'code',
            id: 'j-l38-c1',
            language: 'javascript',
            title: 'One line, at the top of a file or a function',
            code: `'use strict'

function total(prices) {
  let sum = 0
  for (let i = 0; i < prices.length; i++) {
    sum += prices[i]
  }
  return sum
}`,
          },
          {
            type: 'text',
            id: 'j-l38-b3',
            body: 'The directive has to be the first statement in the file or the function body — a comment above it is fine, a line of code above it is not — and it applies to everything below it in that scope. Putting it at the top of a file is the normal choice. It also applies to everything inside that file, including code in separately loaded functions, which is the part that catches people: strict mode is not something each function opts into.',
          },
          {
            type: 'heading',
            id: 'j-l38-h2',
            level: 3,
            body: 'What changes',
          },
          {
            type: 'list',
            id: 'j-l38-l1',
            style: 'bullet',
            items: [
              '**Assigning to an undeclared variable throws.** `count = 0` with no declaration used to create a global; now it is a `ReferenceError`. This is the single most valuable rule, because it turns a typo into a failure on the line you typed it on.',
              '**`this` is `undefined` in a plain function call.** In loose mode it was the global object, which is how `this` quietly ended up meaning `window` in callbacks. Now it is `undefined`, so a method that needed an object says so.',
              '**Duplicate parameter names and duplicate property names are errors,** as are octal literals like `010` and the `delete` of a plain variable.',
              '**Assignments to read-only properties throw** instead of failing silently, and `arguments` no longer maps onto named parameters.',
              '**`this` at the top level of a script is `undefined`** rather than `window`, so a top-level `this` can no longer be used to reach the page.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l38-w1',
            title: 'The one that bites hardest',
            body: 'The `this` rule changes working code. A function that used `this` to reach the global object — usually as a sloppy stand-in for the module scope — stops working, and the failure is a TypeError about reading a property of `undefined`. That code needed a parameter, not a `this`.',
          },
          {
            type: 'heading',
            id: 'j-l38-h3',
            level: 3,
            body: 'Where you already have it',
          },
          {
            type: 'code',
            id: 'j-l38-c2',
            language: 'javascript',
            title: 'Three places strict mode is not optional',
            code: `function declared() {
  return typeof this               // 'undefined' with the directive
}

// 1. inside a module — <script type="module">
// 2. inside a class body
// 3. inside an eval() you called with 'use strict'

class Box {
  render() {
    return typeof this             // 'object' — this is a method
  }
}`,
          },
          {
            type: 'tip',
            id: 'j-l38-t1',
            title: 'Use it as a linter you do not have to configure',
            body: 'Strict mode has no options and no severity levels: either a mistake is an error or it is not. That is why bundlers and tooling added it everywhere. If you want the errors without the directive, most editors and build tools can flag accidental globals and octal literals on their own.',
          },
          {
            type: 'exercise',
            id: 'j-l38-x1',
            exercise: {
              id: 'ex-js-strict-guard',
              instructions:
                'Write `safeNumber(value)` so it returns `value` unchanged when that is a real, finite number, and `0` for anything else. Use `Number.isFinite`, not the global `isFinite` — the global version converts its argument first, so it calls the number `"42"` a number. Then log the result of `safeNumber("42")`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return the value if it is a real finite number, otherwise 0.

function safeNumber(value) {
  
}

console.log(safeNumber('42'))
`,
              },
              expectedOutput: '0',
              tests: [
                {
                  id: 'ex-js-strict-guard-t1',
                  label: 'safeNumber is a function',
                  body: `return typeof safeNumber === 'function' ? true : 'Define a function called safeNumber.';`,
                },
                {
                  id: 'ex-js-strict-guard-t2',
                  label: 'Real numbers pass straight through',
                  body: `if (typeof safeNumber !== 'function') return 'Define a function called safeNumber.'
if (safeNumber(42) !== 42) return 'safeNumber(42) should return 42, got: ' + safeNumber(42)
if (safeNumber(0) !== 0) return 'safeNumber(0) should return 0.'
return safeNumber(-3.5) === -3.5 ? true : 'safeNumber(-3.5) should return -3.5, got: ' + safeNumber(-3.5);`,
                },
                {
                  id: 'ex-js-strict-guard-t3',
                  label: 'Strings, booleans and null are rejected',
                  body: `if (typeof safeNumber !== 'function') return 'Define a function called safeNumber.'
if (safeNumber('42') !== 0) return 'A string is not a number — expected 0 for safeNumber("42"), got: ' + safeNumber('42')
if (safeNumber(true) !== 0) return 'A boolean is not a number — expected 0.'
return safeNumber(null) === 0 ? true : 'null converts to 0 through Number(), but it is not a number — expected 0.';`,
                },
                {
                  id: 'ex-js-strict-guard-t4',
                  label: 'NaN and Infinity are rejected too',
                  body: `if (typeof safeNumber !== 'function') return 'Define a function called safeNumber.'
if (safeNumber(NaN) !== 0) return 'NaN is not a usable number — expected 0.'
return safeNumber(Infinity) === 0 ? true : 'Infinity is not finite — expected 0, got: ' + safeNumber(Infinity);`,
                },
              ],
              hints: [
                'Number.isFinite answers both questions at once: is it a number, and is it finite. The global isFinite only answers the second, after converting.',
                'The function is one line: return a condition ? value : 0.',
                'Number.isFinite(null) and Number.isFinite("42") are both false, and Number.isFinite(NaN) and Number.isFinite(Infinity) are both false, so a single check covers all four cases.',
              ],
              solution: {
                javascript: `function safeNumber(value) {
  return Number.isFinite(value) ? value : 0
}

console.log(safeNumber('42'))`,
              },
              testNotes:
                'Every check calls the function, so the implementation is free to be a single expression. The third check is the one that separates Number.isFinite from the global isFinite, which returns true for the string "42".',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s30',
      title: 'Strict mode check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s30-q1',
          type: 'multiple-choice',
          prompt: 'What happens in strict mode when you run `total = 10` with no declaration anywhere?',
          options: [
            'A global called total is created',
            'It is a ReferenceError, because total was never declared',
            'It is silently ignored',
            'total becomes 0',
          ],
          answer: 1,
          explanation:
            'Strict mode removed the implicit global. This is the rule worth the most in practice: a typo in a name now fails on the line you typed it instead of creating a global that quietly corrupts a different part of the page hours later.',
        },
        {
          id: 'quiz-js-s30-q2',
          type: 'true-false',
          prompt: 'A file loaded with `<script type="module">` runs in strict mode whether or not you write the directive.',
          answer: true,
          explanation:
            'Modules are always strict, as is every class body, and so is eval called with the flag. The directive only matters for classic scripts and ordinary function bodies — which is why old code that relied on `this` being the global object breaks when it is moved into a module.',
        },
        {
          id: 'quiz-js-s30-q3',
          type: 'identify-error',
          prompt: 'This code used to work and stopped after the directive was added. Why?',
          code: `function renderAll() {
  var items = getItems()
  items.forEach(function (item) {
    this.draw(item)
  })
}

renderAll()`,
          options: [
            'forEach cannot be used in strict mode',
            'this inside the forEach callback is undefined, not the object that called renderAll',
            'getItems is not defined in strict mode',
            'Strict mode forbids var',
          ],
          answer: 1,
          explanation:
            'The callback is called with no object to use as `this`, so it is `undefined`. In loose mode it would silently have been the global object, which is how this bug survived in the first place. The fix is to pass the object in — `items.forEach(renderAll.draw, renderAll)` or an arrow function that closes over it.',
        },
        {
          id: 'quiz-js-s30-q4',
          type: 'code-output',
          prompt: 'What does this print in strict mode?',
          code: `'use strict'
function check() {
  return this
}
console.log(check() === undefined)`,
          options: ['true', 'false', 'undefined', 'It throws a TypeError'],
          answer: 0,
          explanation:
            'A plain function call supplies no receiver, so strict mode sets `this` to `undefined` and the comparison is true. In loose mode `this` would have been the global object and it would have printed false. Reading a property off the undefined `this` is what produces the TypeError.',
        },
        {
          id: 'quiz-js-s30-q5',
          type: 'blank',
          prompt:
            'The directive that turns strict mode on must be the ____ ____ statement in the file or function body.',
          answers: ['first statement', 'first statement in'],
          explanation:
            'It has to come first, or JavaScript treats it as an ordinary string expression and nothing happens — which is the quietest strict mode failure there is, because nothing looks wrong. A comment above it is fine; a line of code above it is not.',
        },
      ],
    },
  },
  {
    id: 'js-s31',
    title: 'The this keyword',
    description:
      'Where this comes from at runtime, and why the same function reads a different object depending on how it was called.',
    lessons: [
      {
        id: 'js-l39',
        title: 'The this keyword',
        description:
          'How a function decides which object `this` is, the four rules that decide it, and the mistake the arrow function tie-breaker fixes.',
        duration: 6,
        objectives: [
          'Read the `this` of any function call using the four rules',
          'Explain why a method passed as a callback loses its object',
          'Fix a lost `this` with an arrow function or an explicit receiver',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l39-b1',
            body: '`this` is not a variable you set. It is a parameter the runtime fills in at the moment of the call, from the shape of the call. The same function below reads three different objects depending only on how it was invoked.',
          },
          {
            type: 'demo',
            id: 'j-l39-d1',
            title: 'The same function, four different calls',
            body: 'Each button makes one call. `this` is fixed when the call happens, not when the function is defined, which is why the four lines disagree.',
            html: `<div class="row">
  <button id="a">obj.describe()</button>
  <button id="b">describe()</button>
  <button id="c">describe.call(other)</button>
  <button id="d">new Thing()</button>
</div>
<pre id="out">Press a button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; flex-wrap: wrap; gap: 0.5rem; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 0.75rem 0 0; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `function Thing(name) {
  this.name = name
}
Thing.prototype.describe = function () {
  return 'this.name is ' + (this && this.name)
}

const obj = new Thing('obj')
const other = new Thing('other')
const describe = obj.describe

const out = document.querySelector('#out')
function show(label) {
  out.textContent = label + ' -> ' + describe()
}
document.querySelector('#a').addEventListener('click', function () { out.textContent = 'obj.describe() -> ' + obj.describe() })
document.querySelector('#b').addEventListener('click', function () { show('describe() with no receiver') })
document.querySelector('#c').addEventListener('click', function () { out.textContent = 'describe.call(other) -> ' + describe.call(other) })
document.querySelector('#d').addEventListener('click', function () { out.textContent = 'new Thing() -> ' + new Thing('fresh').describe() })`,
            height: 170,
          },
          {
            type: 'text',
            id: 'j-l39-b2',
            body: 'The rule underneath all of it: `this` is whatever object sits **to the left of the dot** at the call site, or, when there is nothing to the left, whatever was passed in explicitly. When there is no object at all, strict mode gives you `undefined` and loose mode gives you the global object. Everything else is detail.',
          },
          {
            type: 'heading',
            id: 'j-l39-h1',
            level: 3,
            body: 'The four rules, in order',
          },
          {
            type: 'list',
            id: 'j-l39-l1',
            style: 'ordered',
            items: [
              '**Implicit binding.** `obj.method()` sets `this` to `obj`. This is the only case where the dot in your source decides the answer, and it only works if you actually call it with the dot.',
              '**Explicit binding.** `method.call(obj)` and `method.apply(obj)` set it by hand; `method.bind(obj)` returns a new function that is permanently bound. Use these when the method has to travel somewhere without its object.',
              '**`new` binding.** `new Thing()` sets `this` to the fresh object being constructed, whatever you called it or however many arguments you passed.',
              '**Nothing at all.** A bare `method()` has no receiver, so strict mode gives `this` as `undefined` and loose mode quietly gives the global object. This is where most lost-`this` bugs live.',
            ],
          },
          {
            type: 'code',
            id: 'j-l39-c1',
            language: 'javascript',
            title: 'A method and the callback mistake',
            code: `const timer = {
  label: 'refresh',
  start() {
    // this is the timer here, but not inside the callback
    setTimeout(function () {
      console.log(this.label)     // undefined (strict) — the timer is gone
    }, 100)
  }
}`,
          },
          {
            type: 'warning',
            id: 'j-l39-w1',
            title: 'The mistake you will make with a class',
            body: 'Passing a method as a callback strips the object off it. `list.forEach(obj.render)` and `el.addEventListener("click", obj.handle)` both call the function with no receiver, so `this` is `undefined` and the first property read throws. Three fixes, in order of preference: an arrow function that closes over the object, `bind` once when the object is built, or passing the object in as an argument.',
          },
          {
            type: 'heading',
            id: 'j-l39-h2',
            level: 3,
            body: 'Arrow functions have no this of their own',
          },
          {
            type: 'text',
            id: 'j-l39-b3',
            body: 'An arrow function has no `this`, `arguments` or `new.target` of its own. Where one appears, the name resolves to whatever was in scope where the arrow was **written**. That single fact makes arrows the right choice inside callbacks and methods and the wrong choice for object methods and constructors: an arrow assigned to `render` closes over the object from the constructor, so it keeps working when detached but returns the same object if you ever try to call it on another one.',
          },
          {
            type: 'code',
            id: 'j-l39-c2',
            language: 'javascript',
            title: 'Binding it once, so it can travel',
            code: `const timer = {
  label: 'refresh',
  start() {
    // an arrow closes over timer, so the object survives the detach
    setTimeout(() => {
      console.log(this.label)     // 'refresh'
    }, 100)
  }
}`,
          },
          {
            type: 'tip',
            id: 'j-l39-t1',
            title: 'Read the call site, not the definition',
            body: 'When a method misbehaves, ignore where it was written and look at every place it is called. The bug is at the call site nine times out of ten, and the fix belongs there too. Adding `bind` inside the method hides the problem and creates a new function on every call.',
          },
          {
            type: 'exercise',
            id: 'j-l39-x1',
            exercise: {
              id: 'ex-js-this-binding',
              instructions:
                'Define a `Cart` class whose constructor takes an owner name and starts with an empty `items` array. Add `add(item)`, which pushes onto `items` and returns the new length, and `summary()`, which returns the text "Ada has 2 items" using the owner stored on that same instance. Then create two carts and show that each reports its own owner and its own count.',
              languages: ['javascript'],
              starterCode: {
                javascript: `class Cart {
  constructor(owner) {
    
  }

  add(item) {
    
  }

  summary() {
    
  }
}

const ada = new Cart('Ada')
ada.add('Tea')
`,
              },
              expectedOutput: 'Ada has 1 items',
              tests: [
                {
                  id: 'ex-js-this-binding-t1',
                  label: 'A Cart class is defined',
                  body: `return typeof Cart === 'function' ? true : 'Define a class called Cart.';`,
                },
                {
                  id: 'ex-js-this-binding-t2',
                  label: 'The constructor stores the owner and an empty list',
                  body: `if (typeof Cart !== 'function') return 'Define a class called Cart.'
var cart = new Cart('Ada')
return cart.owner === 'Ada' ? true : 'The constructor should assign the first argument to this.owner.'
return Array.isArray(cart.items) && cart.items.length === 0 ? true : 'Each cart needs its own items array — set this.items = [] in the constructor.';`,
                },
                {
                  id: 'ex-js-this-binding-t3',
                  label: 'add() pushes and returns the new length',
                  body: `if (typeof Cart !== 'function') return 'Define a class called Cart.'
var cart = new Cart('Bo')
if (cart.add('Tea') !== 1) return 'The first add should return 1, got: ' + cart.add('Tea')
if (cart.add('Milk') !== 2) return 'The second add should return 2, got: ' + cart.add('Milk')
return cart.items.length === 2 && cart.items[1] === 'Milk'
  ? true
  : 'add() should push the item onto this.items and return items.length.';`,
                },
                {
                  id: 'ex-js-this-binding-t4',
                  label: 'summary() reads the instance it was called on',
                  body: `if (typeof Cart !== 'function') return 'Define a class called Cart.'
var ada = new Cart('Ada')
ada.add('Tea')
var bo = new Cart('Bo')
bo.add('Milk')
bo.add('Bread')
return ada.summary() === 'Ada has 1 items' && bo.summary() === 'Bo has 2 items'
  ? true
  : 'Each instance should report its own owner and count — got ' + ada.summary() + ' and ' + bo.summary();`,
                },
              ],
              hints: [
                'Everything `summary()` needs is on the instance, so the whole method is the owner name, the words " has ", the length, and the word " items".',
                '`this.items.push(item)` returns the new length for free, so add() can return that directly.',
                'If summary() gives the same answer for two different carts, it has picked up a hardcoded name instead of reading this.owner.',
              ],
              solution: {
                javascript: `class Cart {
  constructor(owner) {
    this.owner = owner
    this.items = []
  }

  add(item) {
    this.items.push(item)
    return this.items.length
  }

  summary() {
    return this.owner + ' has ' + this.items.length + ' items'
  }
}

const ada = new Cart('Ada')
ada.add('Tea')
console.log(ada.summary())`,
              },
              testNotes:
                'The fourth check is the one that catches a summary built from a fixed string instead of from `this`. The first three only care that the pieces are right.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s31',
      title: 'The this keyword check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s31-q1',
          type: 'multiple-choice',
          prompt: 'What is `this` inside `describe` when this runs?',
          code: `const ticket = { label: 'refund', describe() { return this.label } }
const fn = ticket.describe
fn()`,
          options: ['ticket', 'window', 'undefined', 'globalThis, in both loose and strict mode'],
          answer: 2,
          explanation:
            'The assignment `const fn = ticket.describe` stores the function, not the object, and `fn()` is a bare call with nothing to the left of the dot. There is no receiver, so strict mode supplies `undefined` — which is why reading `this.label` throws. Call it as `ticket.describe()` or bind it.',
        },
        {
          id: 'quiz-js-s31-q2',
          type: 'true-false',
          prompt: 'An arrow function defined inside a method can see the method’s `this`, and always keeps it.',
          answer: true,
          explanation:
            'An arrow has no `this` of its own, so the name resolves to the enclosing method’s binding. That is why arrows are the standard fix for a lost `this` in a callback — and why they are the wrong choice for an object method, where you want `this` to follow the object it was called on.',
        },
        {
          id: 'quiz-js-s31-q3',
          type: 'code-output',
          prompt: 'What does this print in strict mode?',
          code: `function speak() {
  return typeof this
}
const obj = { speak }
obj.speak()
const bare = obj.speak
bare()`,
          options: ['"object" then "undefined"', '"object" then "object"', '"undefined" twice', '"object" then "function"'],
          answer: 0,
          explanation:
            '`obj.speak()` has a receiver, so `this` is the object. `bare()` has none, so strict mode sets `this` to `undefined` and `typeof` reports it as "undefined". The same call in loose mode would have reported "object" because `this` would have been the global object.',
        },
        {
          id: 'quiz-js-s31-q4',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const grid = {
  cells: ['a', 'b'],
  render(item) { return item.toUpperCase() },
  draw() {
    this.cells.forEach(this.render)
  }
}`,
          options: [
            'forEach cannot take a method reference',
            'render is called without a receiver, so this is undefined inside it',
            'render must be a function, not a shorthand method',
            'cells needs to be a Set rather than an array',
          ],
          answer: 1,
          explanation:
            'Passing the method reference hands over the function alone, so forEach calls it with no object and `this` is undefined. Inside render there is no `this` read, so the mistake shows up later the moment you add one. Fix it with `this.cells.forEach(cell => this.render(cell))`.',
        },
        {
          id: 'quiz-js-s31-q5',
          type: 'blank',
          prompt:
            'A function that returns `this` and is called with an object handed to it directly — `fn.call(obj)` — is using ____ binding.',
          answers: ['explicit', 'explicit binding'],
          explanation:
            'Explicit binding is `call`, `apply` and `bind`. It is the escape hatch for the case where the call site cannot be changed, which is exactly what happens when a method is passed somewhere as a callback: `list.forEach(obj.render.bind(obj))`.',
        },
      ],
    },
  },
  {
    id: 'js-s32',
    title: 'Arrow functions',
    description:
      'The shorter function syntax, the two things it cannot do, and when each one is the right tool.',
    lessons: [
      {
        id: 'js-l40',
        title: 'Arrow functions',
        description:
          'Writing functions with less ceremony, and the two things an arrow cannot do for you.',
        duration: 5,
        objectives: [
          'Write an arrow in every form the syntax allows',
          'Explain why an arrow keeps the `this` of the scope it was written in',
          'Choose between an arrow and a function for an object method',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l40-b1',
            body: 'An arrow function is the same function with the noise removed. Press the button and watch the counter tick: `this` inside each callback is the object whose method ran it, because arrows have no `this` of their own.',
          },
          {
            type: 'demo',
            id: 'j-l40-d1',
            title: 'The same three callbacks, two syntaxes',
            body: 'Both versions produce identical numbers. The arrow version is shorter and, inside the method, keeps `this` without any help.',
            html: `<div class="row">
  <div class="card"><h3>function</h3><p id="a">0</p></div>
  <div class="card"><h3>arrow</h3><p id="b">0</p></div>
</div>
<button id="go">Add three</button>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.7rem; }
.card h3 { margin: 0 0 0.3rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.card p { margin: 0; font-size: 22px; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }`,
            javascript: `const plain = {
  total: 0,
  add() {
    [1, 2, 3].forEach(function (n) { this.total += n }, this)
    return this.total
  }
}

const arrows = {
  total: 0,
  add() {
    [1, 2, 3].forEach((n) => { this.total += n })
    return this.total
  }
}

document.querySelector('#go').addEventListener('click', function () {
  document.querySelector('#a').textContent = plain.add()
  document.querySelector('#b').textContent = arrows.add()
})`,
            height: 190,
          },
          {
            type: 'text',
            id: 'j-l40-b2',
            body: 'The syntax drops the `function` keyword and the braces whenever there is a single expression to return, which covers most callbacks and almost every `map`, `filter` and `sort` comparator.',
          },
          {
            type: 'code',
            id: 'j-l40-c1',
            language: 'javascript',
            title: 'Every form, shortest first',
            code: `const double = n => n * 2                  // one parameter: no parentheses needed
const add = (a, b) => a + b            // several: parentheses required
const wrap = x => { return x + 1 }     // a block body needs the braces and the return
const log = () => console.log('hi')    // no parameters at all
const make = () => ({ id: 1 })        // returning an object literal needs the parentheses`,
          },
          {
            type: 'heading',
            id: 'j-l40-h1',
            level: 3,
            body: 'The two things an arrow cannot do',
          },
          {
            type: 'list',
            id: 'j-l40-l1',
            style: 'bullet',
            items: [
              '**No `this` of its own.** An arrow resolves `this` from the scope where it was written, not from the call. That is the fix for a lost `this` in a callback, and the reason an arrow is a poor object method: it would keep returning the object it was created on.',
              '**No `new.target` and no `arguments`.** There is no `arguments`, so a rest parameter is the only way to take a variable number of arguments; there is no constructor either, so an arrow cannot be used with `new`.',
              '**No hoisting.** `const` and `let` are reserved in the pre-pass like any other block-scoped name, so a call above the declaration throws.',
            ],
          },
          {
            type: 'code',
            id: 'j-l40-c2',
            language: 'javascript',
            title: 'The mistake an arrow invites',
            code: `const handlers = {
  label: 'save',
  run() {
    return this.label
  }
}

const detached = handlers.run      // fine for a method
detached.call(handlers)            // 'save'

const broken = {
  label: 'save',
  run: () => this.label            // this is whatever this meant where broken was written
}`,
          },
          {
            type: 'warning',
            id: 'j-l40-w1',
            title: 'The silent case is the dangerous one',
            body: 'An arrow method usually does not throw — it quietly returns whatever `this` was in the surrounding scope, often `undefined` or the global object. Nothing looks wrong and a later comparison against the expected value fails for no visible reason. If a method needs `this`, write `method() {}` and see what the console says.',
          },
          {
            type: 'tip',
            id: 'j-l40-t1',
            title: 'A rule that holds up',
            body: 'Use an arrow for anything short, anonymous and passed somewhere else. Use a function when the name matters, when you want hoisting, or when `this` has to follow the object it is called on.',
          },
          {
            type: 'exercise',
            id: 'j-l40-x1',
            exercise: {
              id: 'ex-js-arrow-lexical',
              instructions:
                'Write `makeGreeter(name)` so it returns an object with a single `greet()` method that returns the text "Hi, Ada". The greeting has to keep working after `greet` is lifted off the object and called on its own, so return it as an arrow function rather than a method shorthand.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// makeGreeter returns an object whose greet() still works
// after it is detached from the object.

function makeGreeter(name) {
  
}

console.log(makeGreeter('Ada').greet())
`,
              },
              expectedOutput: 'Hi, Ada',
              tests: [
                {
                  id: 'ex-js-arrow-lexical-t1',
                  label: 'makeGreeter is a function',
                  body: `return typeof makeGreeter === 'function' ? true : 'Define a function called makeGreeter.';`,
                },
                {
                  id: 'ex-js-arrow-lexical-t2',
                  label: 'It returns an object with a greet method',
                  body: `if (typeof makeGreeter !== 'function') return 'Define a function called makeGreeter.'
var greeter = makeGreeter('Ada')
if (!greeter || typeof greeter.greet !== 'function') return 'Return an object that has a greet() method.'
return greeter.greet() === 'Hi, Ada' ? true : 'greet() should return Hi, Ada, got: ' + greeter.greet();`,
                },
                {
                  id: 'ex-js-arrow-lexical-t3',
                  label: 'greet() keeps working when it is detached',
                  body: `if (typeof makeGreeter !== 'function') return 'Define a function called makeGreeter.'
var detached = makeGreeter('Bo').greet
return detached() === 'Hi, Bo'
  ? true
  : 'Calling greet() on its own should still return Hi, Bo, got: ' + detached() + ' — a method shorthand loses this here, an arrow does not.';`,
                },
                {
                  id: 'ex-js-arrow-lexical-t4',
                  label: 'Each greeter remembers its own name',
                  body: `if (typeof makeGreeter !== 'function') return 'Define a function called makeGreeter.'
var first = makeGreeter('Cleo')
var second = makeGreeter('Dev')
return first.greet() === 'Hi, Cleo' && second.greet() === 'Hi, Dev'
  ? true
  : 'Two greeters should remember their own names — got ' + first.greet() + ' and ' + second.greet();`,
                },
              ],
              hints: [
                'The name has to survive after makeGreeter returns, so it cannot be passed in as an argument to greet — it has to be captured from the enclosing scope. That capture is what a closure does.',
                'Return an object literal: return { greet: () => "Hi, " + name + "!" }. Remembering an object literal needs the parentheses.',
                'A method shorthand, greet() {}, would lose this the moment you pull it off the object. An arrow closes over name and does not care.',
              ],
              solution: {
                javascript: `function makeGreeter(name) {
  return {
    greet: () => 'Hi, ' + name + '!'
  }
}

console.log(makeGreeter('Ada').greet())`,
              },
              testNotes:
                'The third check is the point of the exercise: it fails for the method-shorthand version, which is the mistake most people make first.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s32',
      title: 'Arrow functions check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s32-q1',
          type: 'multiple-choice',
          prompt: 'Which of these returns an object?',
          code: `const a = () => { id: 1 }
const b = () => ({ id: 1 })`,
          options: ['Only b', 'Only a', 'Both a and b', 'Neither a nor b'],
          answer: 0,
          explanation:
            'In `a`, the braces are read as a function body, so `{ id: 1 }` is a labelled statement and the arrow returns nothing. Wrapping the object in parentheses forces it to be read as an expression instead. This trips up everyone once.',
        },
        {
          id: 'quiz-js-s32-q2',
          type: 'true-false',
          prompt: 'An arrow function can be called with `new`.',
          answer: false,
          explanation:
            'Arrows have no constructor behaviour, so `new (() => {})` is a TypeError. They also have no `arguments`, which is why a rest parameter is the way to take a variable number of arguments in one.',
        },
        {
          id: 'quiz-js-s32-q3',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const app = {
  title: 'Inbox',
  render() {
    return [1, 2].map(n => this.title + n)
  }
}`,
          options: [
            'this is not available inside an arrow function, so this.title is undefined',
            'map cannot be used with an arrow',
            'The arrow needs parentheses around n',
            'Nothing is wrong, arrows inherit this from the object',
          ],
          answer: 3,
          explanation:
            'This is correct code, and it is the reason to reach for an arrow. The arrow has no `this` of its own, so the name resolves to the `render` method’s `this`, which is the app object — even though the callback itself is called with no receiver.',
        },
        {
          id: 'quiz-js-s32-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `function outer() {
  const name = 'outer'
  const inner = () => name
  return inner()
}
console.log(outer())`,
          options: ['outer', 'undefined', 'The function itself', 'It throws'],
          answer: 0,
          explanation:
            'The arrow resolves `name` from the scope it was written in, which is `outer`, and that scope is still alive while the call runs. This is the closure half of an arrow: no arguments, no `new`, but a live view of the enclosing scope.',
        },
        {
          id: 'quiz-js-s32-q5',
          type: 'blank',
          prompt:
            'An arrow function cannot be used as a constructor because it has no ____.',
          answers: ['prototype', 'own prototype'],
          explanation:
            'Classes give instances a prototype chain and arrows give them nothing. This is one of several reasons an arrow is the wrong shape for an object method — it also has no `this` of its own, so it would keep referring to the object it was defined beside.',
        },
      ],
    },
  },
  {
    id: 'js-s33',
    title: 'Classes',
    description:
      'A way to state up front what every instance will have, take its arguments in one place, and keep its state to itself.',
    lessons: [
      {
        id: 'js-l41',
        title: 'Classes, constructors and inheritance',
        description: 'What a class adds over a plain object, and when the extra machinery is worth it.',
        duration: 7,
        objectives: [
          'Write a class with fields, a constructor and methods',
          'Extend a class with extends and super',
          'Use static members and # private fields, and say when a class earns its place',
        ],
        xp: 55,
        content: [
          {
            type: 'text',
            id: 'j-l41-b1',
            body: 'Every button below was built from the same class. The class is the part that matters: it names the fields every task must have, sets `done` to `false` for every one of them, and gives each instance a method that only works on itself.',
          },
          {
            type: 'demo',
            id: 'j-l41-d1',
            title: 'Four tasks, one template',
            body: 'Each row is a separate instance of the same class. Toggling one leaves the other three alone, which is the difference between state held on an instance and state held in a shared place.',
            html: `<ul id="list"></ul>
<button id="add">Add a task</button>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
ul { list-style: none; margin: 0 0 0.75rem; padding: 0; }
li { padding: 0.35rem 0; border-bottom: 1px solid #e6eaee; cursor: pointer; }
li.done span { text-decoration: line-through; color: #94a3b8; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }`,
            javascript: `class Task {
  done = false

  constructor(title) {
    this.title = title
  }

  toggle() {
    this.done = !this.done
  }
}

const list = document.querySelector('#list')
const tasks = ['Read chapter 3', 'Write the tests', 'Ship it', 'Write the notes'].map((title) => new Task(title))

function draw() {
  list.replaceChildren()
  for (const task of tasks) {
    const li = document.createElement('li')
    li.className = task.done ? 'done' : ''
    const span = document.createElement('span')
    span.textContent = task.title
    li.appendChild(span)
    li.addEventListener('click', function () {
      task.toggle()
      draw()
    })
    list.appendChild(li)
  }
}

draw()
document.querySelector('#add').addEventListener('click', function () {
  tasks.push(new Task('Task ' + (tasks.length + 1)))
  draw()
})`,
            height: 230,
          },
          {
            type: 'text',
            id: 'j-l41-b2',
            body: 'A plain object can hold data and behaviour, so why reach for a class? Because a class states up front what every instance will have, takes its arguments in one place instead of trusting each caller, and can keep state that nothing outside can reach. A class is a **template**, not an object: you make instances from it with `new`.',
          },
          {
            type: 'heading',
            id: 'j-l41-h1',
            level: 3,
            body: 'The shape of a class',
          },
          {
            type: 'code',
            id: 'j-l41-c1',
            language: 'javascript',
            title: 'Fields, constructor, methods',
            code: `class Task {
  done = false            // a field, set up before the constructor body runs

  constructor(title) {
    this.title = title
  }

  toggle() {
    this.done = !this.done
  }

  summary() {
    return (this.done ? '[x] ' : '[ ] ') + this.title
  }
}

const task = new Task('Read chapter 3')
task.toggle()
console.log(task.summary())   // [x] Read chapter 3`,
          },
          {
            type: 'text',
            id: 'j-l41-b3',
            body: '`new Task(...)` allocates a fresh object and runs the `constructor` against it, so `this` inside is that brand-new instance. Fields declared in the class body are set up first, which means `done` is already `false` when the constructor body starts and you never have to remember to initialise it. Leave the constructor out entirely and JavaScript supplies an empty one — `new Task()` still works, it simply takes no arguments.',
          },
          {
            type: 'heading',
            id: 'j-l41-h2',
            level: 3,
            body: 'Inheritance',
          },
          {
            type: 'code',
            id: 'j-l41-c2',
            language: 'javascript',
            title: 'extends and super',
            code: `class TimedTask extends Task {
  constructor(title, minutes) {
    super(title)                    // runs the parent constructor
    this.minutes = minutes
  }

  summary() {
    return super.summary() + ' (' + this.minutes + ' min)'
  }
}

const timed = new TimedTask('Read chapter 3', 30)
timed.toggle()
console.log(timed.summary())   // [x] Read chapter 3 (30 min)`,
          },
          {
            type: 'text',
            id: 'j-l41-b4',
            body: '`extends` means "start from that class and add to it": every parent method is available, and declaring one with the same name replaces it — here `summary` calls the version it replaced through `super`. `super(title)` has to run before you touch `this` in a derived constructor, because until the parent constructor has run there is no parent state to read; leave it out and you get "must call super constructor before accessing this". Inheritance pays when the relationship is real — a timed task *is* a task — and becomes a smell when you reach for it only to avoid repeating two lines.',
          },
          {
            type: 'warning',
            id: 'j-l41-w1',
            title: 'Classes are not hoisted',
            body: 'A function declaration can be called from code above it; a class declaration cannot. `new Car()` placed above `class Car` throws a ReferenceError instead of quietly working. That is deliberate — using a class before you have defined it is a mistake worth reporting. Put classes above the code that uses them, or keep them in a module that is imported from the top.',
          },
          {
            type: 'heading',
            id: 'j-l41-h3',
            level: 3,
            body: 'Static and private',
          },
          {
            type: 'code',
            id: 'j-l41-c3',
            language: 'javascript',
            title: 'Two modifiers worth knowing',
            code: `class Cart {
  #items = []                // private: unreachable from outside the class

  #total() {                 // private methods too
    return this.#items.length
  }

  add(item) {
    this.#items.push(item)
    return this.#total()
  }

  static empty() {           // lives on the class, not on instances
    return new Cart()
  }
}

const cart = Cart.empty()
cart.add('Tea')
console.log(cart.#items)     // SyntaxError — outside code cannot see it`,
          },
          {
            type: 'tip',
            id: 'j-l41-t1',
            title: 'When a class earns its place',
            body: 'Reach for a plain object when it is one set of related values, or a function you hand data to. Reach for a class when each thing carries its **own state** — a counter, an id, a done flag — *and* has behaviour that acts on that state, especially when you will make more than one. Two tests: if the "class" will only ever have a single instance, it is probably a module; if a method never touches `this`, it does not need to be a method.',
          },
          {
            type: 'exercise',
            id: 'j-l41-x1',
            exercise: {
              id: 'ex-js-class',
              instructions:
                'Define a User class whose constructor accepts a name and an email. Add a method `greet()` that returns the text "Hello, <name>!". Create an instance and log the greeting.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Define your User class below
`,
              },
              tests: [
                {
                  id: 'ex-js-class-t1',
                  label: 'A User class is defined',
                  body: `return typeof User === 'function' ? true : 'Define a class called User.';`,
                },
                {
                  id: 'ex-js-class-t2',
                  label: 'The constructor stores the name and the email',
                  body: `if (typeof User !== 'function') return 'Define a class called User.'
var u = new User('Sam', 'sam@example.com')
return u.name === 'Sam' && u.email === 'sam@example.com' ? true : 'The constructor should assign both arguments to this.name and this.email.';`,
                },
                {
                  id: 'ex-js-class-t3',
                  label: 'greet() returns a greeting containing the name',
                  body: `if (typeof User !== 'function') return 'Define a class called User.'
var u = new User('Taylor', 't@example.com')
if (typeof u.greet !== 'function') return 'Add a greet() method to the User class.'
return u.greet().indexOf('Taylor') > -1 ? true : 'greet() should return a string containing the name: ' + u.greet();`,
                },
                {
                  id: 'ex-js-class-t4',
                  label: 'The greeting was logged',
                  body: `var log = (window.__log || []).join(' | ')
return log.indexOf('Hello') > -1 && log.indexOf('Jordan') > -1 ? true : 'Create an instance and log it, for example console.log(new User("Jordan", "jordan@example.com").greet()).';`,
                },
              ],
              hints: [
                'A class body looks like `class User { constructor(name, email) { ... } greet() { ... } }`.',
                'Inside any method, `this` is the instance the method was called on, so the greeting reads `this.name`.',
                'The whole thing is: `return "Hello, " + this.name + "!"` — then create a user and `console.log(user.greet())`.',
              ],
              solution: {
                javascript: `class User {
  constructor(name, email) {
    this.name = name
    this.email = email
  }

  greet() {
    return 'Hello, ' + this.name + '!'
  }
}

const user = new User('Jordan', 'jordan@example.com')
console.log(user.greet())`,
              },
              testNotes:
                'The last check looks for the greeting in the console output, so an instance has to be created and logged as well as defined.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s33',
      title: 'Classes check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s33-q1',
          type: 'multiple-choice',
          prompt: 'Which of these is a reason a class is worth the extra machinery?',
          options: [
            'Classes run faster than objects',
            'It states what every instance will have and takes its arguments in one place',
            'Classes can be JSON.stringified in full',
            'A class creates only one instance',
          ],
          answer: 1,
          explanation:
            'The value is in the contract: fields are declared once, the constructor takes the arguments in one place instead of trusting each caller, and private state stays private. Performance is not on the list — a class and an object literal of the same shape are the same thing at runtime.',
        },
        {
          id: 'quiz-js-s33-q2',
          type: 'true-false',
          prompt: 'A class declaration is hoisted, so a constructor can be called from code above it.',
          answer: false,
          explanation:
            'Classes get the same treatment as `let` and `const`: noted in the pre-pass, no value until the declaration runs. Using one above its own line throws, which is deliberate — you should not be reaching for a type you have not defined yet.',
        },
        {
          id: 'quiz-js-s33-q3',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `class TimedTask extends Task {
  constructor(title, minutes) {
    this.title = title
    this.minutes = minutes
  }
}`,
          options: [
            'extends needs the keyword class on the parent too',
            'super() has to run before this is touched',
            'minutes should be a field, not an argument',
            'Nothing is wrong',
          ],
          answer: 1,
          explanation:
            'In a derived constructor there is no parent state to read until the parent constructor has run, so touching `this` first is a hard error. Call `super(title)` as the first line, then set your own fields.',
        },
        {
          id: 'quiz-js-s33-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `class Point {
  x = 0
  constructor(x) { this.x = x }
}
const p = new Point(0)
p.x += 5
console.log(p.x)`,
          options: ['0', '5', 'undefined', 'It throws'],
          answer: 1,
          explanation:
            'Class fields are set up before the constructor body runs, so the field initialiser sets `x` to 0 and the constructor argument then overwrites it with 0 as well. The later `+= 5` makes it 5. The order matters if you rely on a field default and also pass a value for it.',
        },
        {
          id: 'quiz-js-s33-q5',
          type: 'blank',
          prompt:
            'A static method on a class is called on the ____ itself, not on an instance.',
          answers: ['class', 'the class', 'constructor'],
          explanation:
            '`static empty()` lives on the class, so you call `Cart.empty()` and never `cart.empty()`. It is the right home for a factory or a helper that does not need instance state — and the wrong home for anything that reads `this`.',
        },
      ],
    },
  },
  {
    id: 'js-s34',
    title: 'JSON',
    description:
      'The text format the web uses to move data, and the things it silently drops on the way through.',
    lessons: [
      {
        id: 'js-l42',
        title: 'JSON basics',
        description: 'The text format the web uses to move data, and how it differs from what JavaScript objects can hold.',
        duration: 5,
        objectives: [
          'Turn an object into text with JSON.stringify',
          'Turn text into an object with JSON.parse',
          'Say what JSON cannot represent, and why parsed data must be checked',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l42-b1',
            body: 'The button below parses a string that looks exactly like an object literal and then reads a value out of it. Until `JSON.parse` runs, that string has no properties — it is text.',
          },
          {
            type: 'demo',
            id: 'j-l42-d1',
            title: 'A string before, an object after',
            body: 'Both panels hold the same characters. The left one is a string, so `.employees` does nothing useful; the right one has been parsed, so it is an array you can loop over.',
            html: `<div class="row">
  <div class="card"><h3>Before: text</h3><pre id="a"></pre></div>
  <div class="card"><h3>After: parsed</h3><pre id="b"></pre></div>
</div>
<button id="go">Parse the string</button>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.7rem; }
.card h3 { margin: 0 0 0.4rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
pre { margin: 0; padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 11.5px; white-space: pre-wrap; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }`,
            javascript: `const text = '{"employees":[{"name":"Ada"},{"name":"Bo"}]}'
document.querySelector('#a').textContent = text

document.querySelector('#go').addEventListener('click', function () {
  const data = JSON.parse(text)
  const lines = data.employees.map((employee) => employee.name)
  document.querySelector('#b').textContent = lines.join(' | ') + '  (typeof: ' + typeof data.employees + ')'
})`,
            height: 190,
          },
          {
            type: 'text',
            id: 'j-l42-b2',
            body: 'JSON is a format for storing and transporting data, and its syntax is almost exactly the object-literal syntax from the first lesson — braces, keys in double quotes, a colon, then a value. That similarity is the whole reason JavaScript converts between the two in a single call. One thing to hold on to: JSON is **text**. A JSON document is a string until you parse it, and it has no methods, no functions and no live references.',
          },
          {
            type: 'heading',
            id: 'j-l42-h1',
            level: 3,
            body: 'Turning objects into text',
          },
          {
            type: 'code',
            id: 'j-l42-c1',
            language: 'javascript',
            title: 'stringify',
            code: `const user = { name: 'Ada', role: 'admin', active: true }
JSON.stringify(user)          // {"name":"Ada","role":"admin","active":true}
JSON.stringify(user, null, 2) // the same, indented by two spaces`,
          },
          {
            type: 'heading',
            id: 'j-l42-h2',
            level: 3,
            body: 'Turning text into objects',
          },
          {
            type: 'code',
            id: 'j-l42-c2',
            language: 'javascript',
            title: 'parse, and the failure you will meet',
            code: `const text = '{"name":"Bo","role":"guest"}'
const user = JSON.parse(text)
console.log(user.name)   // Bo
try {
  JSON.parse('{ not json }')   // throws, so wrap it if the text is not yours
} catch (error) {
  console.log('Could not read that: ' + error.message)
}`,
          },
          {
            type: 'heading',
            id: 'j-l42-h3',
            level: 3,
            body: 'What JSON cannot carry',
          },
          {
            type: 'list',
            id: 'j-l42-l1',
            style: 'bullet',
            items: [
              '**Functions are dropped.** `JSON.stringify({ greet() {} })` gives `{}`.',
              '**`undefined` is dropped**, both as a value and as a property.',
              '**A `Date` becomes a string**, so a date that round-trips comes back as text, not as a date.',
              '**`NaN` and `Infinity` become `null`**, because JSON has no way to write them.',
              '**Keys need double quotes** and a trailing comma is a syntax error.',
              'Only strings, numbers, booleans, `null`, arrays and objects survive the trip.',
            ],
          },
          {
            type: 'text',
            id: 'j-l42-b3',
            body: 'The second argument to `stringify` can be a list of keys to keep, or a function called for every key that returns the value to store — that is how you build a clean payload to send without leaking private fields. The third argument is the indent. Losing functions and dates is the price of a format every language on earth can read, and in exchange you get something you can store in a file, put in a database column or send over the wire. Note also that `fetch(...).json()` is `JSON.parse` in disguise: it reads the response body and parses it. That is the whole connection between this lesson and the fetching lesson later in the course.',
          },
          {
            type: 'warning',
            id: 'j-l42-w1',
            title: 'Parsed data is untrusted input',
            body: 'A parsed JSON string can hold anything, and it usually arrived from somewhere you do not control. Check what you got before you use it: is `data.employees` an array, does each entry have the fields you are about to read, is `id` a number. Reading `data.employees[0].firstName` without looking is how one missing key turns into a blank page. Parsing turns a string into an object; it does not make that object correct.',
          },
          {
            type: 'example',
            id: 'j-l42-e1',
            title: 'Parsing a string into a list',
            body: 'The text below is just a string until `JSON.parse` runs on it. After that it is an array you can loop over.',
            html: `<ul id="names"></ul>`,
            javascript: `const data = JSON.parse('{"names":["Ada","Bo","Cleo"]}')
const list = document.querySelector('#names')
data.names.forEach(function (name) {
  const item = document.createElement('li')
  item.textContent = name
  list.appendChild(item)
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l42-x1',
            exercise: {
              id: 'ex-js-json',
              instructions:
                'The `text` variable holds a JSON string describing two employees. Parse it into a new variable called `data`, then log a line reading "John Doe" built from the first employee. Keep the parse and the log as separate steps — do not slice the string by hand.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const text = '{"employees":[{"firstName":"John","lastName":"Doe"},{"firstName":"Anna","lastName":"Smith"}]}'
// Parse the string into a variable called data, then log "John Doe".
`,
              },
              tests: [
                {
                  id: 'ex-js-json-t1',
                  label: 'A variable called data holds a parsed object',
                  body: `if (typeof text === 'undefined') return 'Keep the text variable from the starter code.'
return typeof data !== 'undefined' && data !== null && typeof data === 'object' ? true : 'Create it with: const data = JSON.parse(text)';`,
                },
                {
                  id: 'ex-js-json-t2',
                  label: 'data.employees is an array of both employees',
                  body: `if (typeof data === 'undefined' || data === null) return 'Parse the string into a variable called data first.'
if (!Array.isArray(data.employees)) return 'The parsed object should have an employees array.'
return data.employees.length === 2 ? true : 'The string lists two employees, found ' + data.employees.length + '.';`,
                },
                {
                  id: 'ex-js-json-t3',
                  label: 'The first employee is read from the parsed data',
                  body: `if (typeof data === 'undefined' || !data.employees) return 'Parse the string into a variable called data first.'
var first = data.employees[0]
if (!first || typeof first !== 'object') return 'Read the first entry out of data.employees.'
return first.firstName === 'John' && first.lastName === 'Doe' ? true : 'The first employee should be John Doe, got ' + JSON.stringify(first);`,
                },
                {
                  id: 'ex-js-json-t4',
                  label: 'The full name was logged',
                  body: `var log = (window.__log || []).join(' | ')
return log.indexOf('John') > -1 && log.indexOf('Doe') > -1 ? true : 'Log both names, for example console.log(first.firstName + " " + first.lastName).';`,
                },
              ],
              hints: [
                'A JSON string becomes an object with one call: `JSON.parse` takes the text and gives you back real values.',
                'The object you get back has one property, `employees`, and that property is an array.',
                'Combine the two halves: `console.log(data.employees[0].firstName + " " + data.employees[0].lastName)`.',
              ],
              solution: {
                javascript: `const text = '{"employees":[{"firstName":"John","lastName":"Doe"},{"firstName":"Anna","lastName":"Smith"}]}'
const data = JSON.parse(text)
console.log(data.employees[0].firstName + ' ' + data.employees[0].lastName)`,
              },
              testNotes:
                'The checks read the parsed object, not the text, so slicing the string by hand will not satisfy them.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s34',
      title: 'JSON check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s34-q1',
          type: 'multiple-choice',
          prompt: 'What does `JSON.stringify({ greet() {}, when: new Date(0), skip: undefined })` return?',
          options: [
            '{ "greet": "function", "when": "1970-01-01T00:00:00.000Z" }',
            '{ "when": "1970-01-01T00:00:00.000Z" }',
            '{ "when": 0 }',
            '{}',
          ],
          answer: 1,
          explanation:
            'Functions and `undefined` values are dropped entirely, and a Date is written as its ISO string because JSON has no date type. So the greet key disappears, `skip` disappears, and `when` survives as text — which is why a date that round-trips through JSON comes back a string.',
        },
        {
          id: 'quiz-js-s34-q2',
          type: 'true-false',
          prompt: 'Once a JSON string has been parsed, the result is as trustworthy as an object you wrote yourself.',
          answer: false,
          explanation:
            'Parsing only turns text into values. The data usually came from somewhere you do not control, so check the shape before you read into it: is `employees` an array, does each entry have the fields you are about to use. One missing key is how a blank page happens.',
        },
        {
          id: 'quiz-js-s34-q3',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const payload = { user: user, tags: tags, meta }
const saved = JSON.parse(JSON.stringify(payload))
saved.user.name = 'Ada'
console.log(user.name)`,
          options: [
            'JSON.stringify cannot take an object with a nested one inside',
            'A parsed copy is a full deep clone, so editing saved.user also edits user',
            'JSON.parse returns a string, not an object',
            'meta needs quotes around its key',
          ],
          answer: 1,
          explanation:
            'The round trip is deep, so `saved.user` really is a different object — which means editing `saved` leaves `user` alone. The trap is the opposite belief: reaching for JSON round trips to clone, which works but throws away Dates, turns them into strings, and drops every function on the way.',
        },
        {
          id: 'quiz-js-s34-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const data = JSON.parse('{"count":3}')
console.log(typeof data.count, data.count + 1)`,
          options: ['number 4', 'string 31', 'object NaN', 'It throws'],
          answer: 0,
          explanation:
            'JSON has number literals, so `count` is a real number once parsed and the addition gives 4. Quote the key in the JSON text if you want a string — `{"count":"3"}` would give you "31", which is the classic case where the type came from the wrong place.',
        },
        {
          id: 'quiz-js-s34-q5',
          type: 'blank',
          prompt:
            'The two-space indentation you see when you log an object comes from the third argument to ____.',
          answers: ['json.stringify', 'stringify', 'json.stringify()'],
          explanation:
            '`JSON.stringify(value, replacer, indent)` takes the indent as its third argument. The second one is the replacer: an array of keys to keep, or a function called for each key — which is how you build a payload without leaking a password hash or an internal id.',
        },
      ],
    },
  },
  {
    id: 'js-s35',
    title: 'Debugging',
    description:
      'Finding the first line where a value went wrong, and leaving behind code that will not mislead you tomorrow.',
    lessons: [
      {
        id: 'js-l43',
        title: 'Debugging and readable code',
        description:
          'Making the wrong value visible, stopping the program where you care, halving the search, and leaving behind code that will not mislead you tomorrow.',
        duration: 6,
        objectives: [
          'Pick the right console method for the value you are looking at',
          'Set a breakpoint, step through code and read a watch expression',
          'Use the debugger statement where you cannot click a line',
          'Halve a failing search instead of walking all of it',
          'Name values so a log line reads as a sentence',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l43-b1',
            body: 'The list below was built from an array of objects. `console.log` on the array gives you one collapsed line, which is why half of all debugging gives up early. Press the button to see the same data printed four ways.',
          },
          {
            type: 'demo',
            id: 'j-l43-d1',
            title: 'One array, four console calls',
            body: 'The first line is nearly useless. The next three each answer a different question, and only one of them needs you to add a label by hand.',
            html: `<div class="row">
  <button id="go">Print it four ways</button>
</div>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 0.75rem 0 0; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; font-size: 12px; white-space: pre-wrap; }`,
            javascript: `const orders = [
  { id: 1, customer: 'Ada', total: 24 },
  { id: 2, customer: 'Bo', total: 61 }
]

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  console.log(orders)
  console.table(orders)
  console.dir(orders, { depth: null })
  console.log('orders over 30:', orders.filter((o) => o.total > 30).length)
  out.textContent = 'Open the console to compare the four. console.log collapses the objects; console.table lines them up; console.dir opens every level.'
})`,
            height: 150,
          },
          {
            type: 'text',
            id: 'j-l43-b2',
            body: 'Debugging is a search, and you are looking for one moment: the first point where a value became wrong. Every tool below either makes that moment easier to see or easier to reach. Half the work happens before the bug exists — short functions, honest names and one obvious place a value comes from are what make code debuggable in the first place.',
          },
          {
            type: 'heading',
            id: 'j-l43-h1',
            level: 3,
            body: 'What to print, and how',
          },
          {
            type: 'code',
            id: 'j-l43-c1',
            language: 'javascript',
            title: 'Four console calls that answer four different questions',
            code: `const orders = [{ id: 1, total: 24 }, { id: 2, total: 61 }]

console.log(orders)                     // objects collapsed onto one line — often useless
console.table(orders)                   // a table: one row per item, one column per key
console.dir(orders, { depth: null })    // every level, expanded, nothing cut off
console.log('after tax', 24 * 1.2)      // a label, so the numbers mean something

console.error('real failure')           // console.warn for a soft problem
console.count('render')                 // how many times that line has run
console.trace()                         // prints who called the current function
console.time('load')                    // console.timeEnd prints the milliseconds`,
          },
          {
            type: 'heading',
            id: 'j-l43-h2',
            level: 3,
            body: 'Breakpoints and the debugger statement',
          },
          {
            type: 'code',
            id: 'j-l43-c2',
            language: 'javascript',
            title: 'One word that stops the program exactly here',
            code: `function totalWithTax(cart) {
  debugger      // execution pauses on this line when devtools are open
  const sum = cart.reduce((acc, line) => acc + line.price, 0)
  return sum * 1.2
}`,
          },
          {
            type: 'text',
            id: 'j-l43-b3',
            body: 'With devtools open, `debugger` pauses on that line and shows every variable in scope in the panel on the right, including the ones you never thought to log. Step over to run the next line, step into to follow a call, step out to come back. A watch row takes any expression — `cart.length`, `order.total * 1.2` — and reads it live without touching your code, which beats adding a log and reloading. Right-click a breakpoint for a **conditional** one that only stops when a condition holds (`i === 3`, `user === null`); on a loop that turns forty stops into one. Nothing pauses without a debugger attached, so a `debugger` left in the source costs a visitor nothing — delete it before you ship anyway.',
          },
          {
            type: 'heading',
            id: 'j-l43-h3',
            level: 3,
            body: 'Halving the search',
          },
          {
            type: 'text',
            id: 'j-l43-b4',
            body: 'Halving works everywhere: test the middle input, comment out half a loop and print at the join, paste in half the data, or let `git bisect` walk the commits. Each step has to cut the space in half **and** be repeatable — if you are choosing between forty files from memory, print the twentieth instead, and forty becomes six checks. Halving also needs a property that goes one way only: "everything from index `k` onwards is broken" is one, which is why the exercise below can find its answer that way, and why a scattered set of failures does not bisect at all. For those, a loop with one log line beats any cleverness.',
          },
          {
            type: 'code',
            id: 'j-l43-c3',
            language: 'javascript',
            title: 'Names the log can read out loud',
            code: `const d = getData()                       // names that explain nothing
let t = 0
d.forEach((x) => { t += x.n })
console.log('t', t)

const orders = getOrders()                // names the log can read out loud
let unpaidTotalInCents = 0
orders.forEach((order) => { unpaidTotalInCents += order.totalInCents })
console.log('total of unpaid orders, in cents:', unpaidTotalInCents)`,
          },
          {
            type: 'warning',
            id: 'j-l43-w1',
            title: 'Delete anything that could mislead you',
            body: 'The classic trap is a render function that attaches a listener every time it runs: each render adds another handler, so the button works and everything it does happens twice. `console.count(\'render\')` proves it in one line. Attach the listener once, outside the function that rebuilds the DOM. Two smaller versions of the same habit: commented-out blocks make it ambiguous which version of a function is live, so delete them and let version control remember; and a `console.log` left inside a loop pushes the one line you care about off the top of the console.',
          },
          {
            type: 'list',
            id: 'j-l43-l1',
            style: 'bullet',
            items: [
              '**Strict equality** — `===` compares type and value, `==` converts first, so `item.count == \'0\'` is `true` for the number `0` *and* for the string `\'0\'`.',
              '**`==` and `!=`** — the one place they earn their place is `value == null`, meaning "null or undefined" on purpose.',
              '**A missing `await`** — `const data = fetch(url)` hands you a promise, and the message you get is `data.json is not a function`.',
              '**Mutating a property by accident** — `sort`, `reverse` and `push` change the array your function was handed; copy first with `[...list].sort((a, b) => a - b)`.',
              '**Off-by-one loops** — `i <= list.length` reads one index past the end, so `list[i]` is `undefined` and the next line that touches it throws.',
            ],
          },
          {
            type: 'exercise',
            id: 'j-l43-x1',
            exercise: {
              id: 'ex-js-binary-search',
              instructions:
                'The list below is sorted from low to high. Write `binarySearch(sorted, target)` so it finds the target by looking only at the **middle** of the range still in play, and returns its index — or `-1` when the target is not there. Do not walk the list from the start: the point is that the number of steps follows the number of halvings that fit in the list, not the length of it.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Returns the index of target in a list sorted low to high,
// or -1 when it is not there.

function binarySearch(sorted, target) {
  let low = 0
  let high = sorted.length - 1
  
}

const numbers = [2, 5, 9, 14, 22, 31, 47, 60, 78, 91]

console.log(binarySearch(numbers, 47))
console.log(binarySearch(numbers, 14))
console.log(binarySearch(numbers, 100))
`,
              },
              expectedOutput: '6\n3\n-1',
              tests: [
                {
                  id: 'ex-js-binary-search-t1',
                  label: 'binarySearch is a function',
                  body: `return typeof binarySearch === 'function' ? true : 'Define binarySearch.';`,
                },
                {
                  id: 'ex-js-binary-search-t2',
                  label: 'It finds values at both ends and in the middle',
                  body: `if (typeof binarySearch !== 'function') return 'Define binarySearch.'
var n = [2, 5, 9, 14, 22, 31, 47, 60, 78, 91]
if (binarySearch(n, 47) !== 6) return 'Expected 6 for 47, got: ' + binarySearch(n, 47)
if (binarySearch(n, 14) !== 3) return 'Expected 3 for 14, got: ' + binarySearch(n, 14)
if (binarySearch(n, 2) !== 0) return 'Expected 0 for the first value, got: ' + binarySearch(n, 2)
return binarySearch(n, 91) === 9 ? true : 'Expected 9 for the last value, got: ' + binarySearch(n, 91);`,
                },
                {
                  id: 'ex-js-binary-search-t3',
                  label: 'A missing target comes back as -1',
                  body: `if (typeof binarySearch !== 'function') return 'Define binarySearch.'
var n = [2, 5, 9, 14, 22, 31, 47, 60, 78, 91]
var missing = [100, 1, 12]
for (var i = 0; i < missing.length; i++) {
  if (binarySearch(n, missing[i]) !== -1) return 'Expected -1 for ' + missing[i] + ', got: ' + binarySearch(n, missing[i])
}
return binarySearch([], 5) === -1 ? true : 'An empty list holds nothing — expected -1.';`,
                },
                {
                  id: 'ex-js-binary-search-t4',
                  label: 'The three answers were logged to the console',
                  body: `var log = window.__log || []
var last3 = log.slice(log.length - 3)
return last3[0] === '6' && last3[1] === '3' && last3[2] === '-1'
  ? true
  : 'Expected 6, then 3, then -1 — got: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'Two numbers, and they only ever move inwards: `low` is the first index still possible, `high` the last.',
                'Compare the middle value to the target. Too small means the answer can only be to the right, so `low = mid + 1`; too big means `high = mid`. Never `low = mid` alone — that is how a loop repeats itself forever.',
                'One `return -1` after the loop covers every miss, including the empty list: there `low` is 0 and `high` is -1, so the loop never runs.',
              ],
              solution: {
                javascript: `function binarySearch(sorted, target) {
  let low = 0
  let high = sorted.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    if (sorted[mid] === target) return mid
    if (sorted[mid] < target) low = mid + 1
    else high = mid - 1
  }

  return -1
}

const numbers = [2, 5, 9, 14, 22, 31, 47, 60, 78, 91]

console.log(binarySearch(numbers, 47))
console.log(binarySearch(numbers, 14))
console.log(binarySearch(numbers, 100))`,
              },
              testNotes:
                'The checks only look at the answers, so a recursive version passes just as well. Reread your own loop and check that it only ever touches the middle.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s35',
      title: 'Debugging check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s35-q1',
          type: 'multiple-choice',
          prompt: 'Which console call is the one to reach for when you want to read a list of objects?',
          code: `const orders = [{ id: 1, total: 24 }, { id: 2, total: 61 }]`,
          options: [
            'console.log(orders), because the objects print out in full',
            'console.table(orders), because it lines them up one row per item',
            'console.error(orders), because errors are always more detailed',
            'console.count(orders)',
          ],
          answer: 1,
          explanation:
            '`console.log` on an array of objects collapses them onto one line, which is where a lot of debugging gives up. `console.table` gives one row per item and one column per key, `console.dir(x, { depth: null })` expands every level instead of cutting it off, and `console.count` only tells you how many times a line ran.',
        },
        {
          id: 'quiz-js-s35-q2',
          type: 'true-false',
          prompt: 'A `debugger` statement left in shipped source will pause the page for every visitor.',
          answer: false,
          explanation:
            'The statement only does anything when devtools are open and attached, so it costs a visitor nothing. Delete it before you ship anyway — not for their sake but for yours, because the next person to search for `debugger` has to check every hit is not live.',
        },
        {
          id: 'quiz-js-s35-q3',
          type: 'identify-error',
          prompt: 'Clicking the button fires the handler twice. What is the likely cause?',
          code: `function render(list) {
  list.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = item
    document.querySelector('#out').appendChild(li)
    li.addEventListener('click', onPick)
  })
}

button.addEventListener('click', () => render(items))`,
          options: [
            'addEventListener cannot be called inside a loop',
            'A listener is attached every time render runs, and they stack up',
            'onPick is not a function',
            'items is empty',
          ],
          answer: 1,
          explanation:
            'Each run builds fresh elements, and each fresh element gets its own listener — that part is fine. The bug is that the same *parent* listener is registered on every render, so the parent accumulates handlers and everything runs once per render. `console.count("render")` shows it in one line. Attach the parent listener once, outside the function that rebuilds the DOM.',
        },
        {
          id: 'quiz-js-s35-q4',
          type: 'blank',
          prompt:
            'A watch expression in devtools can hold any ____ , re-evaluated as you step, without editing your code.',
          answers: ['expression', 'javascript expression'],
          explanation:
            'That is the advantage over a log line: you can try `cart.length`, `order.total * 1.2` or `items.filter(isOpen).length` without touching the source and without a reload for each attempt.',
        },
        {
          id: 'quiz-js-s35-q5',
          type: 'code-output',
          prompt: 'Why does this comparison behave differently from `count === 0`?',
          code: `const row = { count: '0' }
console.log(row.count == 0, row.count === 0)`,
          options: [
            'They print false false',
            'They print true true',
            'They print true false',
            'They print false true',
          ],
          answer: 2,
          explanation:
            '`==` converts the string to a number first, so `\'0\'` and `0` are equal. `===` compares type first and says no. This is why a value read from an input or a URL — both strings — will pass a `== 0` check and fail a `=== 0` one, and why the loose comparison is the mistake worth naming.',
        },
      ],
    },
  },
  {
    id: 'js-s36',
    title: 'Style guide',
    description:
      'The conventions that make code readable by someone who did not write it, the mistakes that survive review, and the habits that keep a page fast.',
    lessons: [
      {
        id: 'js-l44',
        title: 'Writing code others can read',
        description:
          'Names, function sizes and formatting that make the next reader faster than the next writer.',
        duration: 5,
        objectives: [
          'Name values so a log line reads as a sentence',
          'Keep one job per function and one reason to change per function',
          'Give a function the smallest useful surface and return early',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l44-b1',
            body: 'Two functions, the same job, the same output. Press the button to see them side by side. Nothing about the second one is cleverer — it is just that you can tell what it does without running it.',
          },
          {
            type: 'demo',
            id: 'j-l44-d1',
            title: 'The same function, written twice',
            body: 'Both produce the same text. The left one has to be run to be understood; the right one can be read.',
            html: `<div class="row">
  <div class="card">
    <h3>Hard to read</h3>
    <pre id="a"></pre>
  </div>
  <div class="card">
    <h3>Readable</h3>
    <pre id="b"></pre>
  </div>
</div>
<button id="go">Run both</button>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.7rem; }
.card h3 { margin: 0 0 0.4rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
pre { margin: 0; padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 12px; white-space: pre-wrap; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }`,
            javascript: `const orders = [{ customer: 'Ada', total: 2400, paid: true }]

function t1(o) {
  var r = 0
  for (var i = 0; i < o.length; i++) { if (o[i].paid) r += o[i].total }
  return r / 100
}
function t2(orders) {
  const paid = orders.filter((order) => order.paid)
  const paidTotalInCents = paid.reduce((sum, order) => sum + order.total, 0)
  return paidTotalInCents / 100
}

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  document.querySelector('#a').textContent = String(t1(orders))
  document.querySelector('#b').textContent = t2(orders) + ' — t2 has a name for every step'
})`,
            height: 190,
          },
          {
            type: 'text',
            id: 'j-l44-b2',
            body: 'Readable code is not a matter of taste. It is the cheapest bug prevention there is: a name that says what it holds removes the whole class of mistakes where you use the wrong one of two similar things, and a function that does one job is a function you can test, reuse and delete without fear.',
          },
          {
            type: 'heading',
            id: 'j-l44-h1',
            level: 3,
            body: 'Names that carry their units',
          },
          {
            type: 'code',
            id: 'j-l44-c1',
            language: 'javascript',
            title: 'The same value, three ways',
            code: `let t = 0.2 + 0.1              // what is t? seconds? a tax rate? a total?
let total = 0.2 + 0.1
let subtotalInCents = 20 + 10  // the unit is in the name

// prefer this over a comment
let totalInCents = priceInCents + taxInCents`,
          },
          {
            type: 'list',
            id: 'j-l44-l1',
            style: 'bullet',
            items: [
              '**Name the unit.** `timeoutMs`, `priceInCents`, `unreadCount`. A number without a unit is the single most common source of a bug that is off by a factor of a thousand.',
              '**Say what a boolean is.** `isOpen`, `hasUnread`, `canSubmit` beat `flag` and `state`, because the call site becomes the sentence.',
              '**Do not shorten.** `user`, `item`, `index` are fine; `u`, `i`, `tmp`, `data2` are not. The two-character version saves nothing and costs a search.',
              '**Name a function after its result.** `formatTotal`, `findFirstMatch`, `isOverdue` — not `doIt` or `process`.',
              '**Functions and classes start upper case, everything else starts lower case.** That one convention tells a reader whether something is a thing or an action without them looking it up.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l44-h2',
            level: 3,
            body: 'One job, and return early',
          },
          {
            type: 'code',
            id: 'j-l44-c2',
            language: 'javascript',
            title: 'Nesting left instead of right',
            code: `// every guard adds a level of indentation to everything below it
function canWithdraw(balance, amount) {
  if (balance > 0) {
    if (amount > 0) {
      if (amount <= balance) {
        return true
      }
    }
  }
  return false
}

// the same three checks, flat
function canWithdraw(balance, amount) {
  if (balance <= 0) return false
  if (amount <= 0) return false
  if (amount > balance) return false
  return true
}`,
          },
          {
            type: 'tip',
            id: 'j-l44-t1',
            title: 'Consistency beats the right answer',
            body: 'Pick one convention and use it everywhere: two spaces or tabs, single quotes or double, semicolons or none. A codebase that is consistently a bit different from your habit is easier to read than one that follows your habit on Monday and a different one on Thursday, because the reader learns the rules once.',
          },
          {
            type: 'warning',
            id: 'j-l44-w1',
            title: 'Comments that lie are worse than no comments',
            body: 'A comment explaining what a line does is noise — the line already says that, and the two drift apart within a month. Write a comment for the things the code cannot say: why this branch exists, why the number is in cents, what breaks if you change it. And delete commented-out code rather than parking it; version control remembers it, your reader does not need to.',
          },
          {
            type: 'exercise',
            id: 'j-l44-x1',
            exercise: {
              id: 'ex-js-readable-names',
              instructions:
                'Write `summariseOrders(orders)` so it returns a new object with two properties: `count`, the number of orders, and `total`, the sum of their `total` fields. It must not change the array it is given — sort it, filter it or push onto it and some other part of the page will quietly get the wrong numbers.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Returns { count, total } for the given orders.
// The array it is given must come back untouched.

function summariseOrders(orders) {
  
}

const orders = [{ total: 10 }, { total: 20 }]
console.log(summariseOrders(orders))
`,
              },
              expectedOutput: '{ count: 2, total: 30 }',
              tests: [
                {
                  id: 'ex-js-readable-names-t1',
                  label: 'summariseOrders is a function',
                  body: `return typeof summariseOrders === 'function' ? true : 'Define a function called summariseOrders.';`,
                },
                {
                  id: 'ex-js-readable-names-t2',
                  label: 'It returns the count and the total',
                  body: `if (typeof summariseOrders !== 'function') return 'Define a function called summariseOrders.'
var result = summariseOrders([{ total: 10 }, { total: 20 }, { total: 5 }])
if (!result || typeof result !== 'object') return 'Return a plain object with count and total.'
return result.count === 3 && result.total === 35
  ? true
  : 'Expected count 3 and total 35, got count ' + result.count + ' and total ' + result.total;`,
                },
                {
                  id: 'ex-js-readable-names-t3',
                  label: 'It leaves the array it was given alone',
                  body: `if (typeof summariseOrders !== 'function') return 'Define a function called summariseOrders.'
var original = [{ total: 10 }, { total: 20 }]
var before = JSON.stringify(original)
summariseOrders(original)
return JSON.stringify(original) === before
  ? true
  : 'The array came back different — sorting or filtering it in place changes every other reference to it.';`,
                },
                {
                  id: 'ex-js-readable-names-t4',
                  label: 'An empty list summarises to zero',
                  body: `if (typeof summariseOrders !== 'function') return 'Define a function called summariseOrders.'
var result = summariseOrders([])
return result.count === 0 && result.total === 0
  ? true
  : 'An empty list should give count 0 and total 0, got ' + result.count + ' and ' + result.total;`,
                },
              ],
              hints: [
                'Two passes are fine and usually clearer than one clever pass: one for the count, one for the sum — or a reduce that carries both.',
                'For the total, reduce with a starting value of 0 so an empty list gives 0 rather than NaN.',
                'Copy before you rearrange: work on [...orders] and leave the original exactly as it arrived.',
              ],
              solution: {
                javascript: `function summariseOrders(orders) {
  const count = orders.length
  const total = orders.reduce((sum, order) => sum + order.total, 0)
  return { count: count, total: total }
}

const orders = [{ total: 10 }, { total: 20 }]
console.log(summariseOrders(orders))`,
              },
              testNotes:
                'The third check compares the array before and after the call, which is the only way to catch an in-place sort. The fourth catches a reduce with no starting value, which returns 0 for an empty list but throws when the totals are strings.',
            },
          },
        ],
      },
      {
        id: 'js-l45',
        title: 'Common mistakes',
        description:
          'The bugs that survive a careful read, why each one happens, and the habit that catches it.',
        duration: 5,
        objectives: [
          'Spot the mistakes that produce a wrong answer rather than an error',
          'Explain why `===` beats `==` and why a loop bound is off by one',
          'Fix a function without changing what the caller expects',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l45-b1',
            body: 'This function is short, plausible and wrong in three separate ways. Press the button to see what it actually returns for a small list, and compare it with the value it should return.',
          },
          {
            type: 'demo',
            id: 'j-l45-d1',
            title: 'Three bugs, one quiet wrong answer',
            body: 'A loop that reads one index too far, no guard for an empty list, and orders that should have been filtered out. None of them throw; all of them return a number.',
            html: `<div class="row">
  <div class="card"><h3>Returns</h3><p id="a">-</p></div>
  <div class="card"><h3>Should be</h3><p id="b">-</p></div>
</div>
<button id="go">Run it</button>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 0.75rem; margin-bottom: 0.75rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.7rem; }
.card h3 { margin: 0 0 0.3rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.card p { margin: 0; font-size: 22px; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }`,
            javascript: `function averageCartValue(orders) {
  var total = 0
  for (var i = 0; i <= orders.length; i++) {
    total += orders[i].total
  }
  return total / orders.length
}

document.querySelector('#go').addEventListener('click', function () {
  const orders = [{ total: 10 }, { total: 20 }]
  document.querySelector('#a').textContent = String(averageCartValue(orders))
  document.querySelector('#b').textContent = '15'
})`,
            height: 190,
          },
          {
            type: 'text',
            id: 'j-l45-b2',
            body: 'The worst bugs are the ones that do not throw. An exception at least tells you the line; a function that returns `NaN` looks exactly like a function that returned `NaN` for a reason you have not worked out yet. Most of the list below is that shape of bug.',
          },
          {
            type: 'heading',
            id: 'j-l45-h1',
            level: 3,
            body: 'The ones you will actually make',
          },
          {
            type: 'list',
            id: 'j-l45-l1',
            style: 'ordered',
            items: [
              '**A loop that runs one time too many.** `i <= list.length` reads `list[list.length]`, which is `undefined`, and the next arithmetic turns it into `NaN`. The fix is not to remember the rule but to prefer `for (const item of list)`, which cannot be off by one.',
              '**`==` where `===` was meant.** `count == 0` is true for `\'0\'` and `0`. Values from an input or a URL are always strings, so a loose comparison silently accepts the wrong type and then arithmetic does something unexpected with it.',
              '**`forEach` with a statement inside it.** `forEach` cannot be paused, and a `break` or `return` inside one either does nothing or exits the whole enclosing function. Use a `for...of` loop when you need to stop early.',
              '**Sorting an array you were handed.** `sort` and `reverse` change the array in place. Every other reference to it sees the change, including a list the user can still see on screen. Copy first: `[...list].sort(...)`.',
              '**Comparing objects with `===`.** Two objects with identical contents are never equal, because you are comparing two references. Compare a field, or `JSON.stringify` the two when you genuinely want the whole shape.',
              '**A float total that is off by a fraction.** `0.1 + 0.2` is `0.30000000000000004`. Keep money in whole cents as integers and only divide at the point of display.',
            ],
          },
          {
            type: 'code',
            id: 'j-l45-c1',
            language: 'javascript',
            title: 'Three that look fine at a glance',
            code: `if (value == '0') { ... }              // also true for the number 0
if (userA === userB) { ... }     // two objects with the same fields are not equal
for (let i = 0; i <= list.length; i++) { ... }   // reads one past the end
list.sort(byName)                 // changed the array your caller still holds`,
          },
          {
            type: 'warning',
            id: 'j-l45-w1',
            title: 'Fix the shape, not the symptom',
            body: 'When a function returns the wrong number, the temptation is to add a `|| 0` or a `Math.round` at the end. That hides the mistake and leaves the cause in place, so the same bug appears somewhere else with a different shape. Go back to the first point where the value stopped being what you expected — that is the whole of debugging, and it is no harder than this.',
          },
          {
            type: 'tip',
            id: 'j-l45-t1',
            title: 'Let the tools do the remembering',
            body: 'A linter will flag `==`, an accidental global and an unused variable for free, every time, with no memory required. Turn on the built-in diagnostics in your editor and fix what it complains about as you go. You will not catch design mistakes this way, but you will never again spend twenty minutes on `i <= length`.',
          },
          {
            type: 'exercise',
            id: 'j-l45-x1',
            exercise: {
              id: 'ex-js-fix-mistakes',
              instructions:
                '`averageCartValue(orders)` has three bugs and returns the wrong number instead of reporting a problem. Fix all three so it returns the average `total` of the orders that were not cancelled, and returns 0 when the list is empty.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Bug 1: the loop bound reads one index past the end.
// Bug 2: an empty list divides by zero.
// Bug 3: cancelled orders should not be counted.

function averageCartValue(orders) {
  var total = 0
  for (var i = 0; i <= orders.length; i++) {
    total += orders[i].total
  }
  return total / orders.length
}

console.log(averageCartValue([{ total: 10 }, { total: 20 }]))
`,
              },
              expectedOutput: '15',
              tests: [
                {
                  id: 'ex-js-fix-mistakes-t1',
                  label: 'averageCartValue is a function',
                  body: `return typeof averageCartValue === 'function' ? true : 'Define a function called averageCartValue.';`,
                },
                {
                  id: 'ex-js-fix-mistakes-t2',
                  label: 'It averages two ordinary orders',
                  body: `if (typeof averageCartValue !== 'function') return 'Define a function called averageCartValue.'
var result = averageCartValue([{ total: 10 }, { total: 20 }])
return result === 15 ? true : 'Expected 15 for a 10 and a 20, got: ' + result + ' — check the loop bound, i < length and not i <= length.';`,
                },
                {
                  id: 'ex-js-fix-mistakes-t3',
                  label: 'Cancelled orders are left out',
                  body: `if (typeof averageCartValue !== 'function') return 'Define a function called averageCartValue.'
var result = averageCartValue([
  { total: 10, status: 'cancelled' },
  { total: 20, status: 'paid' }
])
return result === 20
  ? true
  : 'Only the paid order should count, so the answer is 20 — got: ' + result;`,
                },
                {
                  id: 'ex-js-fix-mistakes-t4',
                  label: 'An empty list gives 0 rather than NaN',
                  body: `if (typeof averageCartValue !== 'function') return 'Define a function called averageCartValue.'
var result = averageCartValue([])
return result === 0
  ? true
  : 'An empty list should give 0 — dividing 0 by 0 gives NaN, so check the length before dividing.';`,
                },
              ],
              hints: [
                'Filter first, then loop. A cancelled order removed up front means the loop and the division never have to think about it.',
                'With the orders filtered, `for (const order of orders)` cannot read past the end — there is no index to get wrong.',
                'Guard the division: if there is nothing left to average, return 0 before you divide.',
              ],
              solution: {
                javascript: `function averageCartValue(orders) {
  const payable = orders.filter((order) => order.status !== 'cancelled')

  if (payable.length === 0) return 0

  let total = 0
  for (const order of payable) {
    total += order.total
  }
  return total / payable.length
}

console.log(averageCartValue([{ total: 10 }, { total: 20 }]))`,
              },
              testNotes:
                'The second check catches the loop bound, the third catches a missing filter, and the fourth catches a division with nothing to divide. A solution that adds a guard but keeps `<=` will still fail the second one.',
            },
          },
        ],
      },
      {
        id: 'js-l46',
        title: 'Performance habits',
        description:
          'The few things that actually make a page feel fast, and the measurements that tell you whether any of it worked.',
        duration: 5,
        objectives: [
          'Cache the node lookup instead of repeating it inside a loop',
          'Avoid a lookup in a loop, and say when the cost is real',
          'Measure before and after, with a tool that gives you numbers',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l46-b1',
            body: 'Both panels below count the same 100 rows 200 times over. One caches the node it needs; the other asks the document each pass. Press the button and read the two numbers.',
          },
          {
            type: 'demo',
            id: 'j-l46-d1',
            title: 'Same count, two costs',
            body: 'Both loops run the same 20,000 checks. The only difference is how many times the second one asks the document to go and find the list.',
            html: `<ul id="list"></ul>
<button id="go">Time 200 passes over the list</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
ul { list-style: none; margin: 0 0 0.75rem; padding: 0; max-height: 110px; overflow: auto; border: 1px solid #e6eaee; border-radius: 6px; }
li { padding: 0.15rem 0.5rem; font-size: 12px; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 0.75rem 0 0; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const list = document.querySelector('#list')
for (let i = 1; i <= 100; i++) {
  const li = document.createElement('li')
  li.textContent = 'Row ' + i
  list.appendChild(li)
}

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  let rows = 0
  let started = performance.now()
  for (let pass = 0; pass < 200; pass++) rows += list.children.length
  const cached = Math.round(performance.now() - started)

  rows = 0
  started = performance.now()
  for (let pass = 0; pass < 200; pass++) rows += document.querySelectorAll('#list li').length
  const queried = Math.round(performance.now() - started)

  out.textContent = 'cached node: ' + cached + ' ms   queried each pass: ' + queried + ' ms   (' + rows + ' rows)'
})`,
            height: 160,
          },
          {
            type: 'text',
            id: 'j-l46-b2',
            body: 'Almost all "this page is slow" reports come from one of three things: too much work per interaction, too many DOM writes, and the browser doing layout more often than it had to. Fix those and almost everything else is noise.',
          },
          {
            type: 'heading',
            id: 'j-l46-h1',
            level: 3,
            body: 'Three habits worth forming',
          },
          {
            type: 'list',
            id: 'j-l46-l1',
            style: 'bullet',
            items: [
              '**Move the lookup out of the loop.** `document.querySelector` walks the document every time you call it. One call before the loop, one variable, and the cost drops by orders of magnitude. The same applies to `getElementById` and to reading a property off a long chain.',
              '**Let the browser batch your writes.** Reading a layout property such as `offsetHeight` after a write forces it to recompute immediately. Read all the measurements first, then make all the changes, and the layout happens once instead of once per item.',
              '**Do less work on the keystroke, not after it.** If something expensive runs while someone is typing, wait until they stop — `setTimeout` for a moment, or an `input` event with a timer you reset on each press. The user sees the same result and the page stays responsive.',
            ],
          },
          {
            type: 'code',
            id: 'j-l46-c1',
            language: 'javascript',
            title: 'The layout thrash',
            code: `const items = list.children          // read every height first
for (const item of items) {
  heights.push(item.offsetHeight)
}

for (const item of items) {           // only then write
  item.style.height = heights[i] + 'px'
}`,
          },
          {
            type: 'warning',
            id: 'j-l46-w1',
            title: 'Do not optimise what you have not measured',
            body: 'Caching a lookup in a loop of five is not a performance improvement, it is noise in your code. And rewriting a clear loop as a clever one can make the slow path slower while making the fast path a fraction faster. `performance.now()` around the two versions gives you an answer in seconds; guessing costs you an afternoon.',
          },
          {
            type: 'tip',
            id: 'j-l46-t1',
            title: 'Measure in the right place',
            body: 'The browser devtools record what actually happened: the Performance panel shows long tasks, the Elements panel counts how many times a style was recalculated, and `console.time` / `console.timeEnd` bracket any block you care about. Optimise the panel that is red, not the one you assume is slow.',
          },
          {
            type: 'exercise',
            id: 'j-l46-x1',
            exercise: {
              id: 'ex-js-perf-lookup',
              instructions:
                'Write `makeLookup(rows)` so it returns a function `find(id)` that returns the `name` of the row with that id, or the text "not found". Build the index once, when `makeLookup` is called, so that `find` never walks the list again — a search over 5,000 rows on every keystroke is what makes a search box feel broken.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Returns find(id), which returns the row name or "not found".
// The rows are indexed once, here, not on every call to find.

function makeLookup(rows) {
  
}

const employees = [{ id: 7, name: 'Ada' }, { id: 12, name: 'Bo' }]

console.log(makeLookup(employees)(7))
`,
              },
              expectedOutput: 'Ada',
              tests: [
                {
                  id: 'ex-js-perf-lookup-t1',
                  label: 'makeLookup is a function',
                  body: `return typeof makeLookup === 'function' ? true : 'Define a function called makeLookup.';`,
                },
                {
                  id: 'ex-js-perf-lookup-t2',
                  label: 'find() returns the name for a known id',
                  body: `if (typeof makeLookup !== 'function') return 'Define a function called makeLookup.'
var find = makeLookup([{ id: 7, name: 'Ada' }, { id: 12, name: 'Bo' }])
if (find(7) !== 'Ada') return 'Expected Ada for id 7, got: ' + find(7)
return find(12) === 'Bo' ? true : 'Expected Bo for id 12, got: ' + find(12);`,
                },
                {
                  id: 'ex-js-perf-lookup-t3',
                  label: 'An unknown id comes back as not found',
                  body: `if (typeof makeLookup !== 'function') return 'Define a function called makeLookup.'
var find = makeLookup([{ id: 7, name: 'Ada' }])
return find(99) === 'not found'
  ? true
  : 'An id that is not in the list should return the text not found, got: ' + find(99);`,
                },
                {
                  id: 'ex-js-perf-lookup-t4',
                  label: 'The index is built once, not on every call to find',
                  body: `if (typeof makeLookup !== 'function') return 'Define a function called makeLookup.'
var rows = []
for (var i = 0; i < 400; i++) rows.push({ id: i, name: 'row ' + i })
var scans = 0
var realFilter = Array.prototype.filter
Array.prototype.filter = function () { scans += 1; return realFilter.apply(this, arguments) }
var find = makeLookup(rows)
var answer = find(250)
Array.prototype.filter = realFilter
return answer !== 'row 250' ? 'Expected row 250, got: ' + answer
  : scans > 0 ? 'The rows were walked with filter again inside find — build the index once, in makeLookup, and look it up afterwards.'
  : true;`,
                },
              ],
              hints: [
                'Turn the list into a plain object once: index[row.id] = row.name. An object property lookup does not get slower as it grows.',
                'makeLookup returns a function, so the index has to be built before that function is handed back.',
                'The "not found" case is a lookup that comes back undefined, so return the text in that branch.',
              ],
              solution: {
                javascript: `function makeLookup(rows) {
  const index = {}
  for (const row of rows) {
    index[row.id] = row.name
  }
  return function find(id) {
    return index[id] === undefined ? 'not found' : index[id]
  }
}

const employees = [{ id: 7, name: 'Ada' }, { id: 12, name: 'Bo' }]

console.log(makeLookup(employees)(7))`,
              },
              testNotes:
                'The last check patches Array.prototype.filter to count how often the rows are walked. A version that searches the list inside find trips it; one that builds an object up front does not.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s36',
      title: 'Style guide check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s36-q1',
          type: 'multiple-choice',
          prompt: 'Which name makes the bug impossible rather than merely unlikely?',
          options: ['t', 'temp', 'timeoutMs', 'data2'],
          answer: 2,
          explanation:
            'A name that carries the unit removes the whole class of mistake where a milliseconds value is passed where seconds were expected. The single-letter and numbered versions are not shorter to type — they are shorter to write and much longer to read.',
        },
        {
          id: 'quiz-js-s36-q2',
          type: 'true-false',
          prompt: 'A `for...of` loop can be off by one index in the way a counted `for` loop can.',
          answer: false,
          explanation:
            'There is no index to get wrong: the loop walks the values themselves, so there is no `length` bound to get wrong and nothing to read past the end. Off-by-one comes from hand-managing an index, and `for...of` is the way to stop managing one.',
        },
        {
          id: 'quiz-js-s36-q3',
          type: 'identify-error',
          prompt: 'Why is the reported total wrong?',
          code: `function totalOf(list) {
  list.sort((a, b) => a.price - b.price)
  return list.reduce((sum, item) => sum + item.price, 0)
}

const shown = [...products]
const reported = totalOf(shown)`,
          options: [
            'sort cannot be called on a spread array',
            'sort changes the array in place, so the copy the page is showing gets reordered too',
            'reduce needs a starting value of 0 as a string',
            'The arrow function inside sort has the wrong this',
          ],
          answer: 1,
          explanation:
            '`sort` sorts in place. `shown` was copied specifically so the display would be untouched, and sorting inside the function undoes that — the page silently reorders itself and the user has no idea why. Copy again inside the function: `[...list].sort(...)`.',
        },
        {
          id: 'quiz-js-s36-q4',
          type: 'blank',
          prompt:
            'Reading a layout property such as offsetHeight right after writing a style forces the browser to ____ immediately.',
          answers: ['recalculate', 'recalculate layout', 'lay out'],
          explanation:
            'That is layout thrashing: write, read, write, read, and the browser recalculates the layout between every pair. Read every measurement you need first, then make every change, and it happens once.',
        },
        {
          id: 'quiz-js-s36-q5',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const rows = [{ total: 10 }, { total: 20 }]
let total = 0
for (let i = 0; i <= rows.length; i++) {
  total += rows[i].total
}
console.log(total)`,
          options: ['30', 'NaN', 'undefined', 'It throws'],
          answer: 1,
          explanation:
            'The loop runs one time too many, so the last pass reads `rows[2]`, which is `undefined`, and adding undefined gives NaN — which prints as NaN rather than throwing, so the loop looks like it worked. Use `i < rows.length`, or better `for (const row of rows)`.',
        },
      ],
    },
  },
]
