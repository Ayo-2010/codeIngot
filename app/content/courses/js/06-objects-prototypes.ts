import type { Section } from '~/types/content'

export const jsObjectsPrototypesSections: Section[] = [
  {
    id: 'js-s37',
    title: 'Object definitions',
    description: 'Grouping related values under names, and the rules that decide how a property is read and written.',
    lessons: [
      {
        id: 'js-l47',
        title: 'Object definitions and properties',
        description: 'The object literal, reading and writing properties, and why an object is more than a bag of variables.',
        duration: 6,
        objectives: [
          'Write an object literal and read its properties with dot and bracket notation',
          'Add, change and delete properties on an existing object',
          'Tell the difference between a missing property and a property holding undefined'
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l47',
          title: 'Object definitions and properties quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l47-q1',
              type: 'multiple-choice',
              prompt: 'What do you get when you read a property that does not exist on an object?',
              options: [
                'null',
                'undefined',
                '0',
                'A TypeError is thrown',
              ],
              answer: 1,
              explanation: 'Reading a missing property gives `undefined`, and nothing is thrown. The error appears one step later if you use that value, which is why the failure message points at the code that assumed the property was there rather than at the line that reads it.',
            },
            {
              id: 'quiz-js-l47-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const book = { title: \'Dune\', pages: 412 }\nconsole.log(book.author)',
              options: [
                '\'Dune\'',
                'undefined',
                'null',
                'It throws a ReferenceError',
              ],
              answer: 1,
              explanation: '`author` was never written, so reading it gives `undefined`. Had the code gone on to call `book.author.toUpperCase()`, that line would be the one that throws — the read itself is harmless.',
            },
            {
              id: 'quiz-js-l47-q3',
              type: 'true-false',
              prompt: 'A `const` object cannot have its properties changed after it is created.',
              answer: false,
              explanation: '`const` freezes the binding, not the container. `settings.theme = "light"` is fine; `settings = {}` is the line that throws.',
            },
            {
              id: 'quiz-js-l47-q4',
              type: 'blank',
              prompt: 'Which method returns an array of an object property names?',
              answers: [
                'object.keys',
                'objectkeys',
                'object keys',
                'keys',
              ],
              explanation: '`Object.keys` gives the names, `Object.values` gives the values and `Object.entries` gives name-value pairs. Keys come back in insertion order, so an object with numeric-looking keys will not keep them in the order you wrote them.',
            },
            {
              id: 'quiz-js-l47-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this?',
              code: 'const config = { retries: 3 }\nconfig.retries = config.retries + 1\nconsole.log(config[\'retries\'])',
              options: [
                'Nothing — this logs 4',
                'The bracket notation is invalid on an object',
                'A trailing comma is missing between the properties',
                'config cannot be reassigned because it is declared with const',
              ],
              answer: 0,
              explanation: 'Reading and writing a property of a `const` object is fine — only assigning to the name `config` itself is blocked. Bracket and dot notation are interchangeable here, and the one-property literal needs no comma after it.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l47-b1',
            body: 'An **object** is a set of values filed under names. Where an array answers "give me the third thing", an object answers "give me the name" — and names survive reordering, deletion and everything else. The reason to reach for one is not tidiness: it is that a value on its own has no identity, and as soon as two things belong together (a user and its email, a point and its colour) you need a name for the pair.',
          },
          {
            type: 'demo',
            id: 'j-l47-d1',
            title: 'One object, drawn onto the page',
            body: 'The object holds the three values; the script decides what happens with them. Nothing here knows about the DOM except the last three lines.',
            html: `<div class="card">
  <h3 id="name">—</h3>
  <p id="role">—</p>
  <p class="muted" id="email">—</p>
</div>`,
            css: `body { font-family: system-ui, sans-serif; }
.card { border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 .35rem; font-size: 16px; }
.card p { margin: .2rem 0; font-size: 14px; }
.muted { color: #6b7683; }`,
            javascript: `const user = {
  name: 'Ada Lovelace',
  role: 'Analyst',
  email: 'ada@example.com'
}

document.querySelector('#name').textContent = user.name
document.querySelector('#role').textContent = user.role
document.querySelector('#email').textContent = user.email`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'j-l47-h1',
            level: 3,
            body: 'Writing one',
          },
          {
            type: 'code',
            id: 'j-l47-c1',
            language: 'javascript',
            title: 'The object literal',
            code: `const book = {
  title: 'The Pragmatic Programmer',
  pages: 352,
  inPrint: true
}

const empty = {}`,
          },
          {
            type: 'text',
            id: 'j-l47-b2',
            body: 'Braces, then `key: value` pairs separated by commas. Keys are usually written bare when they are valid identifiers, and quoted when they are not: `{ "first-name": "Ada" }` is legal, `{ first-name: "Ada" }` is not. A trailing comma is allowed and is the safer habit — it keeps diffs to one line when you add a property at the end.',
          },
          {
            type: 'heading',
            id: 'j-l47-h2',
            level: 3,
            body: 'Reading and writing',
          },
          {
            type: 'code',
            id: 'j-l47-c2',
            language: 'javascript',
            title: 'The same object, opened up',
            code: `book.title            // 'The Pragmatic Programmer'
book['pages']         // 352 — brackets work too
book.title = 'The Pragmatic Programmer, 20th Anniversary Edition'

book.author = 'Hunt'   // adding a property that was not there
delete book.inPrint   // removing one`,
          },
          {
            type: 'text',
            id: 'j-l47-b3',
            body: 'Dot notation needs a valid identifier after the dot. Bracket notation takes any string, which is what you reach for when the key has a space or a dash in it, or when the key is only known at runtime: `book[someKey]`. Note what is not happening: there is no `setTitle` call, no type check. Assigning to a property that does not exist creates it, and deleting one that does not exist is quietly fine.',
          },
          {
            type: 'warning',
            id: 'j-l47-w1',
            title: 'A missing property is not an error, it is undefined',
            body: 'Reading `book.isbn` on an object with no `isbn` gives `undefined`, not a crash. That tolerance is exactly what bites later: `book.isbn.toString()` throws a TypeError about reading a property of undefined, and the message names `isbn` rather than the line that actually assumed it existed. Check with `if (book.isbn)` or `if ("isbn" in book)` at the point of use.',
          },
          {
            type: 'heading',
            id: 'j-l47-h3',
            level: 3,
            body: 'Objects are not sealed',
          },
          {
            type: 'code',
            id: 'j-l47-c3',
            language: 'javascript',
            title: 'Inspecting what an object actually holds',
            code: `Object.keys(book)     // ['title', 'pages', 'author']
Object.values(book)   // the values, in the same order
Object.entries(book)  // [['title', '...'], ['pages', 352], ...]

'author' in book      // true
book.hasOwnProperty('author')  // true — ignores anything inherited`,
          },
          {
            type: 'list',
            id: 'j-l47-l1',
            style: 'bullet',
            items: [
              '**`Object.keys`** for the names, in insertion order. This is what you want almost every time.',
              '**`Object.values`** for the values alone — useful for a quick `Object.values(counts).includes(n)`.',
              '**`Object.entries`** for pairs, which is what you want to loop over, since each entry is already an array.',
              '**`in`** checks the whole chain, so it is true for inherited names too. `hasOwnProperty` checks only the object itself.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l47-t1',
            title: 'const stops the name moving, not the contents',
            body: '`const book = {}` prevents you writing `book = somethingElse`, but `book.title = "x"` is still allowed — the object is a container, and the binding is the thing `const` freezes. When you genuinely need an object that cannot change, `Object.freeze(book)` throws on any write attempt instead of failing silently.',
          },
          {
            type: 'example',
            id: 'j-l47-e1',
            title: 'Editing an object from the page',
            body: 'Two inputs write into the same object, and the summary underneath is rebuilt from it every time. This is the shape of almost every settings panel you will build.',
            html: `<label>Name <input id="n" value="Ada" /></label>
<label>Role <input id="r" value="Analyst" /></label>
<p id="out"></p>`,
            javascript: `const profile = { name: 'Ada', role: 'Analyst' }

const name = document.querySelector('#n')
const role = document.querySelector('#r')

function render() {
  profile.name = name.value
  profile.role = role.value
  document.querySelector('#out').textContent =
    profile.name + ' is an ' + profile.role
}

render()
name.addEventListener('input', render)
role.addEventListener('input', render)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l47-x1',
            exercise: {
              id: 'ex-js-object-props',
              instructions:
                'Create an object `settings` with three properties: `theme` set to "dark", `fontSize` set to 16, and `compact` set to false. Then add a fourth property `language` with the value "en" after the object is built, and log `settings.theme + "-" + settings.language`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Three properties in the literal, one added afterwards.

const settings = {
  
}

console.log(settings.theme + '-' + settings.language)
`,
              },
              expectedOutput: 'dark-en',
              tests: [
                {
                  id: 'ex-js-object-props-t1',
                  label: 'settings is an object with the three original properties',
                  body: `return typeof settings === 'object' && settings !== null && !Array.isArray(settings)
  ? true
  : 'Create an object called settings.';
if (settings.theme !== 'dark') return 'settings.theme should be the string dark, got: ' + settings.theme;
if (settings.fontSize !== 16) return 'settings.fontSize should be the number 16, got: ' + settings.fontSize;
if (settings.compact !== false) return 'settings.compact should be the boolean false, got: ' + settings.compact;
return true;`,
                },
                {
                  id: 'ex-js-object-props-t2',
                  label: 'language was added after the literal',
                  body: `if (typeof settings !== 'object') return 'Create an object called settings.'
return settings.language === 'en'
  ? true
  : 'settings.language should be the string en. Assign it after the object is built: settings.language = "en".';`,
                },
                {
                  id: 'ex-js-object-props-t3',
                  label: 'Brackets read the property as well as the dot',
                  body: `if (typeof settings !== 'object') return 'Create an object called settings.'
return settings['theme'] === 'dark' && settings['language'] === 'en'
  ? true
  : 'Both settings["theme"] and settings["language"] should read back the same values as the dot form.';`,
                },
                {
                  id: 'ex-js-object-props-t4',
                  label: 'The result was logged',
                  body: `var log = window.__log || []
return log.length > 0 && log[log.length - 1] === 'dark-en'
  ? true
  : 'Expected the console output to be dark-en, got: ' + log.join('|');`,
                },
              ],
              hints: [
                'An object literal is braces with key: value pairs and commas between them: const settings = { theme: "dark", fontSize: 16, compact: false }.',
                'Adding a property later is a plain assignment: settings.language = "en".',
                'Keys are not always strings, so quote the value when it is text — theme: "dark" gives the string, theme: dark would be a ReferenceError.',
              ],
              solution: {
                javascript: `const settings = {
  theme: 'dark',
  fontSize: 16,
  compact: false
}

settings.language = 'en'

console.log(settings.theme + '-' + settings.language)`,
              },
              testNotes:
                'The checks read the properties back off the object you built and the last console line. The literal can be written across several lines or all on one; both parse to the same thing.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s38',
    title: 'Object methods',
    description: 'Functions stored on an object, and what `this` refers to inside one.',
    lessons: [
      {
        id: 'js-l48',
        title: 'Object methods and display',
        description: 'Putting functions on an object, the role of this, and the four ways to display an object in the console.',
        duration: 6,
        objectives: [
          'Define a method on an object and call it with dot notation',
          'Explain what this points at inside a method and why a detached call breaks it',
          'Choose between console.log, JSON.stringify, Object.entries and a table'
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l48',
          title: 'Object methods and display quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l48-q1',
              type: 'multiple-choice',
              prompt: 'Inside a method called as `cart.add(2)`, what does `this` refer to?',
              options: [
                'The global object',
                'The object the method was written inside',
                'The object the call started from, which here is cart',
                'undefined, always',
              ],
              answer: 2,
              explanation: '`this` is decided by the call, not by where the function was written. `cart.add(2)` starts at `cart`, so `this` is `cart`; the same function called with no object in front of it has no `this` at all.',
            },
            {
              id: 'quiz-js-l48-q2',
              type: 'identify-error',
              prompt: 'What goes wrong here?',
              code: 'const cart = {\n  count: 0,\n  add(price) {\n    this.count += price\n    return this.count\n  }\n}\n\nsetTimeout(cart.add, 100)',
              options: [
                'Nothing, the callback runs with cart as this',
                'A TypeError, because the detached call leaves this undefined',
                'The count is reset to 0',
                'It throws a SyntaxError at parse time',
              ],
              answer: 1,
              explanation: 'Handing `cart.add` to setTimeout passes the function with nothing in front of it, so `this` is undefined and `this.count` throws. `setTimeout(cart.add.bind(cart), 100)` or `setTimeout(() => cart.add(2), 100)` keeps the receiver attached.',
            },
            {
              id: 'quiz-js-l48-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const box = { value: 7 }\ndocument.body.textContent = box',
              options: [
                '7',
                '[object Object]',
                'undefined',
                '{ value: 7 }',
              ],
              answer: 1,
              explanation: 'Assigning an object where a string is expected runs the default string conversion, which for a plain object is "[object Object]". Convert explicitly with `JSON.stringify(box)` or take the field you meant.',
            },
            {
              id: 'quiz-js-l48-q4',
              type: 'true-false',
              prompt: 'The shorthand `add(price) { ... }` gives the method its own `this`, while `add: function (price) { ... }` does not.',
              answer: false,
              explanation: 'Neither form gets its own `this`. Both are called with the object in front of them, and both lose it the moment the function is passed around on its own.',
            },
            {
              id: 'quiz-js-l48-q5',
              type: 'blank',
              prompt: 'Which console method prints a list of objects as a side-by-side table in the browser?',
              answers: [
                'console.table',
                'consoletable',
                'console table',
                'table',
              ],
              explanation: '`console.table` is the quickest way to compare a few records. `console.log` is fine for one object, and `JSON.stringify` is the one to reach for when the value is going into HTML or over the network.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l48-b1',
            body: 'A method is an ordinary function stored as a property. There is no separate method concept in the language — the difference is only that it is found on an object, which means it can be called with `obj.name()` and can see which object it was called on. Grouping behaviour with the data it acts on is what stops a plain object from becoming fifty loose variables.',
          },
          {
            type: 'demo',
            id: 'j-l48-d1',
            title: 'An object that does its own arithmetic',
            body: 'The button calls a method on the object instead of doing the maths itself. Add a second method and nothing outside the object has to change.',
            html: `<button id="add">Add one</button>
<p id="out">0 items</p>`,
            css: `body { font-family: system-ui, sans-serif; }
button { font: inherit; padding: .4rem .7rem; }
#out { font-size: 15px; }`,
            javascript: `const basket = {
  items: [],

  add(name) {
    this.items.push(name)
    return this.items.length
  },

  summary() {
    return this.items.length + ' items: ' + this.items.join(', ')
  }
}

document.querySelector('#add').addEventListener('click', () => {
  const count = basket.add('book')
  document.querySelector('#out').textContent = basket.summary()
})`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'j-l48-h1',
            level: 3,
            body: 'Writing a method',
          },
          {
            type: 'code',
            id: 'j-l48-c1',
            language: 'javascript',
            title: 'Shorthand versus key-value function',
            code: `const cart = {
  count: 0,

  // shorthand: name becomes the method name
  add(price) {
    this.count += price
    return this.count
  }
}

const same = {
  count: 0,

  // the long form: a function stored under a key
  add: function (price) {
    this.count += price
    return this.count
  }
}`,
          },
          {
            type: 'text',
            id: 'j-l48-b2',
            body: 'Both forms produce the same object; the shorthand just cuts the typing and cannot be used with a computed key. What the shorthand does *not* do is give the method its own `this`.',
          },
          {
            type: 'heading',
            id: 'j-l48-h2',
            level: 3,
            body: 'What this means',
          },
          {
            type: 'code',
            id: 'j-l48-c2',
            language: 'javascript',
            title: 'this is the object the call started from',
            code: `cart.add(10)          // this is cart, count becomes 10

const add = cart.add   // the function, on its own
add(10)                // TypeError: this is undefined

const bound = cart.add.bind(cart)
bound(10)              // works — this is cart again`,
          },
          {
            type: 'text',
            id: 'j-l48-b3',
            body: '`this` is not the object the function was written in; it is the object the call started from. That is why passing a method as a callback is the mistake you will hit most often: `setTimeout(cart.add, 100)` calls `add` with no object in front of it, `this` is `undefined`, and the first line to touch it throws. `.bind(cart)` pins it, and an arrow function defined inside another method captures the surrounding `this` instead.',
          },
          {
            type: 'heading',
            id: 'j-l48-h3',
            level: 3,
            body: 'Looking at an object from outside',
          },
          {
            type: 'code',
            id: 'j-l48-c3',
            language: 'javascript',
            title: 'Four ways to see the same object',
            code: `const user = { name: 'Ada', role: 'Analyst', age: 36 }

console.log(user)                        // Node: { name: 'Ada', ... }
console.log('Text says', user)            // Text says [object Object]
console.log(JSON.stringify(user))        // {"name":"Ada","role":"Analyst","age":36}
console.table(user)                       // a table in the browser console`,
          },
          {
            type: 'warning',
            id: 'j-l48-w1',
            title: 'Putting an object into the page with concatenation',
            body: '`element.textContent = user` writes the literal text "[object Object]" on the page, because string conversion on a plain object falls back to that. Convert first — `JSON.stringify(user, null, 2)` if you want the whole thing, or pick the one field you meant: `user.name`.',
          },
          {
            type: 'list',
            id: 'j-l48-l1',
            style: 'bullet',
            items: [
              '**`console.log(obj)`** — reads best in the browser, where Chrome and Firefox expand one level.',
              '**`console.table(listOfObjects)`** — the fastest way to compare a handful of records side by side.',
              '**`JSON.stringify(obj)`** — what you want when the value is going into HTML, a `data-` attribute or the network.',
              '**`Object.entries(obj)`** — when you need to loop over the pairs; each entry is a `[key, value]` array.',
            ],
          },
          {
            type: 'example',
            id: 'j-l48-e1',
            title: 'A method that fixes the arguments for you',
            body: 'The method checks the input before it touches `this.count`, so the guard travels with the data instead of being repeated at every call site.',
            html: `<label>Price <input id="p" type="number" value="12" /></label>
<button id="go">Add</button>
<p id="out">0</p>`,
            javascript: `const till = {
  count: 0,
  add(price) {
    if (typeof price !== 'number' || Number.isNaN(price)) {
      return 'Not a number'
    }
    this.count += price
    return this.count
  }
}

const total = till.add.bind(till)

document.querySelector('#go').addEventListener('click', () => {
  const result = total(Number(document.querySelector('#p').value))
  document.querySelector('#out').textContent = String(result)
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l48-x1',
            exercise: {
              id: 'ex-js-object-methods',
              instructions:
                'Build an object `player` with a property `score` set to 0, a method `add(points)` that adds to `this.score` and returns the new score, and a method `reset()` that sets `this.score` back to 0 and returns it. Then call `add(10)`, `add(5)` and log the result of the second call.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Two methods on one object. Use this inside both,
// not the object name by hand.

const player = {
  score: 0,
  
}

console.log(player.add(10))
console.log(player.add(5))
`,
              },
              expectedOutput: '15',
              tests: [
                {
                  id: 'ex-js-object-methods-t1',
                  label: 'player is an object with add and reset methods',
                  body: `if (typeof player !== 'object' || player === null) return 'Create an object called player.'
return typeof player.add === 'function' && typeof player.reset === 'function'
  ? true
  : 'Give player an add(points) method and a reset() method.';`,
                },
                {
                  id: 'ex-js-object-methods-t2',
                  label: 'add changes the score on the object and returns it',
                  body: `if (typeof player !== 'object' || player === null) return 'Create an object called player.'
if (typeof player.add !== 'function') return 'Give player an add(points) method.'
player.score = 0
player.add(10)
player.add(5)
return player.score === 15
  ? true
  : 'After add(10) and add(5) the score should be 15, got: ' + player.score;`,
                },
                {
                  id: 'ex-js-object-methods-t3',
                  label: 'reset puts the score back to 0',
                  body: `if (typeof player !== 'object' || player === null) return 'Create an object called player.'
if (typeof player.reset !== 'function') return 'Give player a reset() method.'
player.score = 40
return player.reset() === 0 && player.score === 0
  ? true
  : 'reset() should set this.score to 0 and return 0.';`,
                },
                {
                  id: 'ex-js-object-methods-t4',
                  label: 'The result was logged',
                  body: `var log = window.__log || []
return log.length > 1 && log[log.length - 1] === 15
  ? true
  : 'Expected the last console output to be 15, got: ' + log.join('|');`,
                },
              ],
              hints: [
                'Inside the method use this.score, not player.score — that is what makes the method work on any object with the same shape.',
                'Write the method as add(points) { this.score += points; return this.score } using the shorthand form.',
                'reset() has no parameters, so it is written reset() { ... }, and every method needs its own return unless you want undefined.',
              ],
              solution: {
                javascript: `const player = {
  score: 0,

  add(points) {
    this.score += points
    return this.score
  },

  reset() {
    this.score = 0
    return this.score
  }
}

console.log(player.add(10))
console.log(player.add(5))`,
              },
              testNotes:
                'The checks call your methods on a real object, so writing `player.score` inside a method happens to pass here — but the next lesson is about the case where it does not.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s39',
    title: 'Object accessors',
    description: 'get and set, and using them so a value can never be stored in a broken state.',
    lessons: [
      {
        id: 'js-l49',
        title: 'Getters and setters',
        description: 'Defining a property as a pair of functions, and where they earn their place in real code.',
        duration: 7,
        objectives: [
          'Define a getter and a setter with the get and set keywords',
          'Use an accessor to validate a value on the way in and to hide the real storage',
          'Explain why a getter that writes its own property does not do what it looks like'
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l49',
          title: 'Getters and setters quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l49-q1',
              type: 'multiple-choice',
              prompt: 'What does a setter receive as its parameter?',
              options: [
                'Every value assigned to the property, as an array',
                'The value on the right-hand side of the assignment, exactly once',
                'The object the property belongs to',
                'Nothing — a setter takes no parameters',
              ],
              answer: 1,
              explanation: 'A setter is always called with the single assigned value. Assigning twice calls it twice, and whatever it returns is discarded, so the only way a setter can refuse a value is by not writing it.',
            },
            {
              id: 'quiz-js-l49-q2',
              type: 'identify-error',
              prompt: 'What happens when this runs?',
              code: 'const box = {\n  get width() {\n    return this.width * 2\n  }\n}\n\nconsole.log(box.width)',
              options: [
                'It prints 0',
                'It prints 2',
                'It recurses until the call stack overflows',
                'It prints undefined',
              ],
              answer: 2,
              explanation: 'Reading `this.width` inside the getter calls the getter again, all the way up. The rule the error hides is simple: an accessor never refers to itself — back it with a differently named field such as `_width`.',
            },
            {
              id: 'quiz-js-l49-q3',
              type: 'true-false',
              prompt: 'Adding a getter and setter to a property is invisible to the code that already reads and writes it.',
              answer: true,
              explanation: 'That is the reason to use them. Call sites keep the plain `obj.name = value` form, so a validation rule can be introduced later without hunting down every place that touches the property.',
            },
            {
              id: 'quiz-js-l49-q4',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const fridge = { _temp: 4 }\nObject.defineProperty(fridge, \'temp\', {\n  get() {\n    return this._temp * 2\n  }\n})\nconsole.log(fridge.temp)',
              options: [
                '8',
                '4',
                'undefined',
                'It prints nothing because the property is not enumerable',
              ],
              answer: 0,
              explanation: 'Being non-enumerable only affects `Object.keys` and `for…in`. Reading the property directly still runs the getter, and it reads `_temp`, a plain field holding 4, and returns 8.',
            },
            {
              id: 'quiz-js-l49-q5',
              type: 'blank',
              prompt: 'By convention, what prefix marks the private field an accessor reads and writes?',
              answers: [
                'underscore',
                '_',
                'an underscore',
                '_-',
                'leading underscore',
                'leading underscore and a prefix underscore',
              ],
              explanation: 'The underscore is a convention, not a keyword — nothing enforces it, it just tells the next reader which name is not theirs to touch. A Symbol would enforce it properly, at the cost of uglier code.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l49-b1',
            body: 'A **getter** is a function that runs when you read a property; a **setter** runs when you write one. Neither takes the value as an argument in the usual sense: the setter always gets exactly one, the value assigned. Together they let a property keep an invariant — that is, a promise that whatever is stored inside is always in a usable state.',
          },
          {
            type: 'demo',
            id: 'j-l49-d1',
            title: 'A property that refuses bad input',
            body: 'Type anything into the box. The setter trims it and refuses an empty one, so the full name is always readable without a check at every use.',
            html: `<label>Full name <input id="n" value="  ada lovelace  " /></label>
<p id="out"></p>
<p class="muted" id="err"></p>`,
            css: `body { font-family: system-ui, sans-serif; }
label { display: block; margin-bottom: .5rem; font-size: 14px; }
input { font: inherit; padding: .3rem .4rem; }
#out { font-size: 16px; margin: .3rem 0; }
.muted { color: #c0392b; font-size: 13px; min-height: 1em; }`,
            javascript: `const profile = {
  fullName: '',
  set name(value) {
    const clean = value.trim()
    if (clean.length < 2) {
      document.querySelector('#err').textContent = 'Too short'
      return
    }
    document.querySelector('#err').textContent = ''
    this.fullName = clean
  },
  get initials() {
    return this.fullName
      .split(' ')
      .map((part) => part[0].toUpperCase())
      .join('')
  }
}

const input = document.querySelector('#n')
const out = document.querySelector('#out')

function render() {
  profile.name = input.value
  out.textContent = profile.fullName + ' — ' + profile.initials
}

render()
input.addEventListener('input', render)`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'j-l49-h1',
            level: 3,
            body: 'The syntax',
          },
          {
            type: 'code',
            id: 'j-l49-c1',
            language: 'javascript',
            title: 'A getter, a setter, and a private field behind them',
            code: `const thermometer = {
  _celsius: 20,

  get celsius() {
    return this._celsius
  },

  set celsius(value) {
    this._celsius = Number(value)
  }
}

thermometer.celsius = 25   // the setter runs
console.log(thermometer.celsius)  // 25 — the getter runs`,
          },
          {
            type: 'text',
            id: 'j-l49-b2',
            body: 'The name `celsius` behaves like an ordinary property from the outside — no parentheses, exactly like `profile.name`. That is the point: the call site never changes, so the guard can be added later without touching the code that reads the value. The leading underscore on `_celsius` is a convention, not a keyword; it says "this one is not for you".',
          },
          {
            type: 'heading',
            id: 'j-l49-h2',
            level: 3,
            body: 'What the setter is for',
          },
          {
            type: 'code',
            id: 'j-l49-c2',
            language: 'javascript',
            title: 'Three jobs a setter does well',
            code: `const form = {
  email: '',

  set email(value) {
    const clean = String(value).trim().toLowerCase()
    if (!clean.includes('@')) return   // refuse, leave the old value
    this._email = clean                // the real field
  },

  get email() {
    return this._email || ''
  },

  get domain() {
    return this.email.split('@')[1] || ''   // derived, nothing to store
  }
}`,
          },
          {
            type: 'list',
            id: 'j-l49-l1',
            style: 'bullet',
            items: [
              '**Normalising** — trimming whitespace, lower-casing an email, turning a string into a number once instead of at four call sites.',
              '**Validating** — refusing the assignment outright and leaving the previous value in place.',
              '**Deriving** — a getter that computes a value from what is stored, so there is no second field to fall out of step.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l49-w1',
            title: 'A getter that assigns its own property loops forever',
            body: 'Inside the body of `get celsius()`, `this.celsius = x` calls the getter again, which assigns again, and the call stack overflows with "Maximum call stack size exceeded". If you want a real backing field, give it a different name — `_celsius`, or the Symbol pattern. The same trap waits for a setter that reads the property it is setting.',
          },
          {
            type: 'heading',
            id: 'j-l49-h3',
            level: 3,
            body: 'Rules worth knowing',
          },
          {
            type: 'list',
            id: 'j-l49-l2',
            style: 'bullet',
            items: [
              'A property can have a getter and no setter. Writing to it then silently does nothing in sloppy mode and throws in strict mode — which is a confusing error if you did not mean it.',
              '`Object.keys()` will not list a property defined with `get` unless you also give it `enumerable: true`.',
              '`Object.assign(target, source)` copies an accessor as an accessor, but `JSON.stringify` only ever sees the getter result.',
              'A setter is expected to return nothing. Returning a value from it is legal and ignored.',
            ],
          },
          {
            type: 'code',
            id: 'j-l49-c3',
            language: 'javascript',
            title: 'Accessors without the keyword',
            code: `const fridge = { _temp: 4 }

Object.defineProperty(fridge, 'temperature', {
  get() {
    return this._temp
  },
  set(value) {
    if (typeof value !== 'number') return
    this._temp = value
  },
  enumerable: true
})`,
          },
          {
            type: 'tip',
            id: 'j-l49-t1',
            title: 'Do not reach for an accessor too early',
            body: 'A getter should either protect an invariant or compute something. If it only returns `this._x`, you have added two names for one value and every future reader has to check which one is the real one. Plain properties stay plain until there is a reason.',
          },
          {
            type: 'example',
            id: 'j-l49-e1',
            title: 'A temperature property that stays a number',
            body: 'Clear the box and nothing breaks: the setter refuses anything that is not a number, so the reading code never needs a guard.',
            html: `<label>Celsius <input id="c" value="18" /></label>
<p id="out"></p>`,
            javascript: `const room = {
  _celsius: 18,
  get celsius() {
    return this._celsius
  },
  set celsius(value) {
    const n = Number(value)
    if (Number.isNaN(n)) return
    this._celsius = n
  },
  get fahrenheit() {
    return Math.round(this._celsius * 9 / 5 + 32)
  }
}

const input = document.querySelector('#c')
const out = document.querySelector('#out')

function render() {
  room.celsius = input.value
  out.textContent = room.celsius + 'C is ' + room.fahrenheit + 'F'
}

render()
input.addEventListener('input', render)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l49-x1',
            exercise: {
              id: 'ex-js-getter-setter',
              instructions:
                'Build an object `cart` whose property `count` is stored as a real property `_count` starting at 1. Give it a getter `count` that returns `_count`, and a setter `count` that refuses anything that is not a positive whole number — in that case leave `_count` unchanged. Then set `cart.count = 5`, try `cart.count = -3`, and log `cart.count`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// The getter returns, the setter validates.
// Use this._count inside both.

const cart = {
  _count: 1,
  
}

cart.count = 5
cart.count = -3
console.log(cart.count)
`,
              },
              expectedOutput: '5',
              tests: [
                {
                  id: 'ex-js-getter-setter-t1',
                  label: 'cart stores the real number in _count',
                  body: `if (typeof cart !== 'object' || cart === null) return 'Create an object called cart.'
return typeof cart._count === 'number'
  ? true
  : 'Keep the real number in a _count property on cart.';`,
                },
                {
                  id: 'ex-js-getter-setter-t2',
                  label: 'count has both a getter and a setter',
                  body: `if (typeof cart !== 'object' || cart === null) return 'Create an object called cart.'
var d = Object.getOwnPropertyDescriptor(cart, 'count')
return d && typeof d.get === 'function' && typeof d.set === 'function'
  ? true
  : 'Define count as a pair: get count() { ... } and set count(value) { ... }.';`,
                },
                {
                  id: 'ex-js-getter-setter-t3',
                  label: 'A positive whole number is stored',
                  body: `if (typeof cart !== 'object' || cart === null) return 'Create an object called cart.'
cart._count = 1
cart.count = 5
return cart._count === 5 && cart.count === 5
  ? true
  : 'After cart.count = 5 both _count and cart.count should read 5, got: ' + cart._count;`,
                },
                {
                  id: 'ex-js-getter-setter-t4',
                  label: 'A bad assignment is refused and the value is logged',
                  body: `if (typeof cart !== 'object' || cart === null) return 'Create an object called cart.'
cart._count = 5
cart.count = -3
cart.count = 2.5
var log = window.__log || []
return cart._count === 5 && cart.count === 5
  ? true
  : 'The setter must ignore -3 and 2.5 and leave the count at 5, got: ' + cart._count;`,
                },
              ],
              hints: [
                'The getter and setter both need the keyword: get count() { return this._count } and set count(value) { ... }.',
                'In the setter, check first and return early — `if (value <= 0 || !Number.isInteger(value)) return` — so the old value survives.',
                'Never write `this.count` inside either one; that recurses and overflows the stack. Use `this._count`.',
              ],
              solution: {
                javascript: `const cart = {
  _count: 1,

  get count() {
    return this._count
  },

  set count(value) {
    if (!Number.isInteger(value) || value <= 0) return
    this._count = value
  }
}

cart.count = 5
cart.count = -3
console.log(cart.count)`,
              },
              testNotes:
                'The checks use `Object.getOwnPropertyDescriptor` to confirm count really is an accessor pair, not a plain property, and then assign through it to see whether the setter holds.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s40',
    title: 'Object constructors',
    description: 'One function that builds a consistent object every time, and what new actually does.',
    lessons: [
      {
        id: 'js-l50',
        title: 'Object constructors',
        description: 'A function that produces objects of a known shape, and the rules behind calling it with new.',
        duration: 7,
        objectives: [
          'Write a constructor function that assigns every field with this',
          'Explain what new does: the fresh object, the call, and the return',
          'Check a constructed object with instanceof and Object.keys'
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l50',
          title: 'Object constructors quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l50-q1',
              type: 'multiple-choice',
              prompt: 'What does `new Book("Dune", 412)` do first?',
              options: [
                'Calls the function and then copies its fields onto a blank object',
                'Creates an empty object linked to Book.prototype, then calls Book with this bound to it',
                'Runs Book twice, once with each argument',
                'Validates the arguments before creating anything',
              ],
              answer: 1,
              explanation: 'The object exists before the body runs, which is why `this` is already usable on the first line. Only afterwards does the returned value matter — and only if it is an object.',
            },
            {
              id: 'quiz-js-l50-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function Box(label) {\n  this.label = label\n  return 42\n}\n\nconsole.log(new Box(\'a\').label)',
              options: [
                'a',
                '42',
                'undefined',
                'It throws a TypeError',
              ],
              answer: 0,
              explanation: 'The constructor returned a primitive, and a primitive return is ignored, so you get the object `new` created — with its `label` intact. Return an *object* instead and that one replaces the whole thing, which is the case that catches people out.',
            },
            {
              id: 'quiz-js-l50-q3',
              type: 'true-false',
              prompt: 'In a strict-mode module, calling a constructor function without `new` throws a TypeError.',
              answer: true,
              explanation: 'Strict mode gives `this` the value `undefined` inside a plain call, so the first `this.something = ...` throws immediately. In sloppy mode the same call writes to the global object and returns undefined, which pushes the failure somewhere else entirely.',
            },
            {
              id: 'quiz-js-l50-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this constructor?',
              code: 'function User(name) {\n  name = name\n  age = 30\n}\nconst u = new User(\'Ada\')',
              options: [
                'Nothing, it is fine',
                'The assignments miss this, so nothing lands on the new object',
                'age must come before name',
                'A constructor cannot assign a number',
              ],
              answer: 1,
              explanation: '`name = name` assigns a parameter to itself and touches nothing else, and in strict mode `age = 30` throws on an undeclared name. Every field a constructor sets has to start with `this.`.',
            },
            {
              id: 'quiz-js-l50-q5',
              type: 'blank',
              prompt: 'Which operator tells you an object was built by a particular constructor function?',
              answers: [
                'instanceof',
                'instance of',
                'instanceOf',
                'an instanceof check',
              ],
              explanation: '`dune instanceof Book` walks the prototype chain, so it is true for the object and for anything built from it by a related constructor. Comparing `book.constructor === Book` answers a similar question but is easier to break with a hand-written prototype chain.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l50-b1',
            body: 'An object literal is fine for one object. The moment you make five of them you are copying the same keys by hand, and the fifth one is the one that forgets `email`. A **constructor** is a plain function whose job is to build an object of a known shape: it takes the differing values, sets everything else, and hands the finished object back. Calling it with `new` is what makes that happen.',
          },
          {
            type: 'demo',
            id: 'j-l50-d1',
            title: 'Three users from one function',
            body: 'Every entry below has the same keys, which is the whole point: the list can be rendered without checking whether a field exists.',
            html: `<ul id="list"></ul>
<button id="add">Add a user</button>`,
            css: `body { font-family: system-ui, sans-serif; }
ul { padding-left: 1.1rem; font-size: 15px; }
li { margin: .25rem 0; }
button { font: inherit; padding: .4rem .7rem; }`,
            javascript: `function User(name, email) {
  this.name = name
  this.email = email
  this.active = true
}

const names = ['Ada', 'Grace', 'Alan']
const list = document.querySelector('#list')

names.forEach((name) => {
  const user = new User(name, name.toLowerCase() + '@example.com')
  const item = document.createElement('li')
  item.textContent = user.name + ' — ' + user.email
  list.appendChild(item)
})`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'j-l50-h1',
            level: 3,
            body: 'Writing one',
          },
          {
            type: 'code',
            id: 'j-l50-c1',
            language: 'javascript',
            title: 'Capitalised name, called with new',
            code: `function Book(title, pages) {
  this.title = title
  this.pages = pages
  this.available = true
}

const dune = new Book('Dune', 412)
console.log(dune.title)      // 'Dune'
console.log(dune.available)  // true — set for you`,
          },
          {
            type: 'text',
            id: 'j-l50-b2',
            body: 'The capital first letter is the only thing marking it as a constructor; the language does not check. Inside the body `this` is the fresh object `new` has already created, so every field is a normal assignment. Give every instance the same set of keys, even when the value is a placeholder — code that reads `book.available` should never have to test whether it is there.',
          },
          {
            type: 'heading',
            id: 'j-l50-h2',
            level: 3,
            body: 'What new actually does',
          },
          {
            type: 'code',
            id: 'j-l50-c2',
            language: 'javascript',
            title: 'The long form of new Book("Dune", 412)',
            code: `// 1. Create an empty object whose prototype is Book.prototype
const fresh = Object.create(Book.prototype)

// 2. Call the function with this bound to that object
Book.call(fresh, 'Dune', 412)

// 3. Return it — unless the function returned an object itself
return fresh`,
          },
          {
            type: 'text',
            id: 'j-l50-b3',
            body: 'Those three steps are the whole mechanism, and the third one is the surprising part. A `return` of a primitive is ignored, so `return 42` inside a constructor still gives you the object `new` made. A `return` of an *object* replaces it entirely — the fields your constructor set are thrown away. This is how a constructor can hand back a different object, and the reason a constructor that returns an object behaves so unlike every other function.',
          },
          {
            type: 'warning',
            id: 'j-l50-w1',
            title: 'Calling a constructor without new',
            body: 'In strict mode, which every module is, `Book("Dune", 412)` throws a TypeError because `this` is undefined. In sloppy mode it silently runs against the global object and returns undefined, so the variable ends up holding undefined and the error appears much later, somewhere unrelated. If a `new` is easy to forget, a `class` gives the error at the call site for free.',
          },
          {
            type: 'heading',
            id: 'j-l50-h3',
            level: 3,
            body: 'Checking what you built',
          },
          {
            type: 'code',
            id: 'j-l50-c3',
            language: 'javascript',
            title: 'Four useful questions to ask',
            code: `const dune = new Book('Dune', 412)

dune instanceof Book        // true — built from this constructor
dune.constructor === Book    // true
Object.keys(dune)           // ['title', 'pages', 'available']
typeof dune                  // 'object'`,
          },
          {
            type: 'tip',
            id: 'j-l50-t1',
            title: 'The same shape without a constructor',
            body: 'A factory function does the same job and needs no `new`: `function makeUser(name) { return { name, active: true } }`. It cannot be called with `new` by accident, and it can validate or freeze the result on the way out. Constructor functions and classes win when you want `instanceof` to work.',
          },
          {
            type: 'example',
            id: 'j-l50-e1',
            title: 'Building an object from form input',
            body: 'The fields come from the inputs, but which keys exist is decided in one place. Adding a field to the constructor makes it available everywhere at once.',
            html: `<label>Title <input id="t" value="Dune" /></label>
<label>Pages <input id="p" type="number" value="412" /></label>
<button id="go">Make the book</button>
<pre id="out"></pre>`,
            javascript: `function Book(title, pages) {
  this.title = title
  this.pages = Number(pages)
  this.read = false
  this.describe = function () {
    return this.title + ' (' + this.pages + ' pages)'
  }
}

document.querySelector('#go').addEventListener('click', () => {
  const book = new Book(
    document.querySelector('#t').value,
    document.querySelector('#p').value
  )
  document.querySelector('#out').textContent = book.describe()
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l50-x1',
            exercise: {
              id: 'ex-js-constructor',
              instructions:
                'Write a constructor function `Task` that takes `title` and `priority`, sets `this.title`, `this.priority` and `this.done = false`, and gives every task a method `label()` returning the title in upper case. Make one task called `task` with title "Write tests" and priority "high", then log `task.label()`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Remember to call it with new.
// Every field goes on this.

function Task() {
  
}

const task = new Task()
console.log(task.label())
`,
              },
              expectedOutput: 'WRITE TESTS',
              tests: [
                {
                  id: 'ex-js-constructor-t1',
                  label: 'Task is a function and task is built from it',
                  body: `if (typeof Task !== 'function') return 'Define a function called Task.'
return task instanceof Task
  ? true
  : 'Build the task with new Task(...) so it is an instance of Task.';`,
                },
                {
                  id: 'ex-js-constructor-t2',
                  label: 'The constructor set the three fields',
                  body: `return task.title === 'Write tests'
  ? true
  : 'The task title should be the string Write tests, got: ' + task.title;
return task.priority === 'high'
  ? true
  : 'The task priority should be the string high, got: ' + task.priority;
return task.done === false
  ? true
  : 'Every task should start with done set to false, got: ' + task.done;`,
                },
                {
                  id: 'ex-js-constructor-t3',
                  label: 'Every instance gets a working label method',
                  body: `if (typeof task.label !== 'function') return 'Give every task a label() method.'
return task.label() === 'WRITE TESTS'
  ? true
  : 'label() should return the title in upper case, got: ' + task.label();`,
                },
                {
                  id: 'ex-js-constructor-t4',
                  label: 'A second instance keeps its own values',
                  body: `if (typeof Task !== 'function') return 'Define a function called Task.'
var second = new Task('Ship it', 'low')
return second.title === 'Ship it' && second.priority === 'low' && second.done === false && second.label() === 'SHIP IT'
  ? true
  : 'A second task must take its own title and priority and still start with done false.';`,
                },
              ],
              hints: [
                'Inside the function, every assignment starts with this: this.title = title. The parameter and the property share a name on purpose.',
                'Attach the method as a property of the object: this.label = function () { return this.title.toUpperCase() }, or use the shorthand `label() { ... }`.',
                'If the tests cannot see the values, check you did not forget new — calling Task("x", "y") without it leaves task undefined.',
              ],
              solution: {
                javascript: `function Task(title, priority) {
  this.title = title
  this.priority = priority
  this.done = false
  this.label = function () {
    return this.title.toUpperCase()
  }
}

const task = new Task('Write tests', 'high')
console.log(task.label())`,
              },
              testNotes:
                'The checks read the fields directly and build a second instance, so a constructor that hard-codes one value will fail the last test.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s41',
    title: 'Prototypes',
    description: 'Where objects get their methods from, and how every object shares one copy.',
    lessons: [
      {
        id: 'js-l51',
        title: 'Prototypes',
        description: 'The prototype chain that gives every object its methods, and the cost of copying them per instance.',
        duration: 8,
        objectives: [
          'Follow a property lookup along the prototype chain',
          'Put a shared method on the constructor prototype instead of in the body',
          'Use Object.create to start an object from a specific prototype'
        ],
        xp: 70,
        quiz: {
          id: 'quiz-js-l51',
          title: 'Prototypes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l51-q1',
              type: 'multiple-choice',
              prompt: 'Why can a plain `{}` call `hasOwnProperty` when nothing ever defined that method on it?',
              options: [
                'The browser adds it to every object automatically',
                'It is found further along the prototype chain, on Object.prototype',
                'It is inherited from the window object',
                'hasOwnProperty is a keyword built into the language',
              ],
              answer: 1,
              explanation: 'A read that misses walks the chain. Every object ends up at `Object.prototype`, which is where the methods that look built-in actually live — which is also why adding to that object is so dangerous.',
            },
            {
              id: 'quiz-js-l51-q2',
              type: 'true-false',
              prompt: 'A method defined inside a constructor is copied onto every instance, so each one gets its own version of the function.',
              answer: true,
              explanation: 'Each call to the constructor runs that line and creates a fresh function object. It behaves the same when called, but `a.method === b.method` is false and a thousand objects cost a thousand functions.',
            },
            {
              id: 'quiz-js-l51-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function Task(title) {\n  this.title = title\n}\nTask.prototype.label = function () {\n  return \'T:\' + this.title\n}\n\nconst t = new Task(\'a\')\nconsole.log(Object.keys(t).join(\',\'))',
              options: [
                'title,label',
                'title',
                'label',
                'title,label is a function',
              ],
              answer: 1,
              explanation: '`Object.keys` lists own enumerable properties only. `label` lives on the prototype, so it is reachable with `t.label` but invisible to `Object.keys`, `for…in`-free iteration and `JSON.stringify`.',
            },
            {
              id: 'quiz-js-l51-q4',
              type: 'identify-error',
              prompt: 'What is the danger here?',
              code: 'Object.prototype.get = function () {\n  return \'anything\'\n}\n\nconst list = { get: 2 }\nconsole.log(list.get())',
              options: [
                'Nothing — it works',
                'Every object in the page now has a get method, and code that loops over properties will pick it up',
                'Object.prototype is read-only so the assignment is ignored',
                'It throws immediately',
              ],
              answer: 1,
              explanation: 'Extending `Object.prototype` changes every object, including ones other code owns, and anything that iterates over properties will see the new key. Shared behaviour belongs on your own constructor or prototype, which is what `class extends` is for.',
            },
            {
              id: 'quiz-js-l51-q5',
              type: 'blank',
              prompt: 'Which method creates an empty object whose prototype is the one you pass in?',
              answers: [
                'object.create',
                'objectcreate',
                'object create',
                'create',
              ],
              explanation: '`Object.create(proto)` builds an object linked to `proto`, so it inherits from it but owns nothing — `Object.keys` on the result is empty. Passing `null` ends the chain, which is how you get an object with no inherited methods at all.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l51-b1',
            body: 'Every object has a hidden link to another object, its **prototype**, and every prototype is itself an object with a prototype. When JavaScript cannot find `book.toString`, it does not fail: it looks at `book`’s prototype, then that object’s prototype, and keeps going until it reaches `Object.prototype` — where it finally finds `toString` and `hasOwnProperty`. This chain is why plain objects can do things you never gave them.',
          },
          {
            type: 'demo',
            id: 'j-l51-d1',
            title: 'A method that is not on the object',
            body: 'The objects in the list are built by a constructor that never defines describe(). They can still call it, because it lives on the prototype.',
            html: `<ul id="out"></ul>
<p class="muted" id="keys"></p>`,
            css: `body { font-family: system-ui, sans-serif; }
ul { padding-left: 1.1rem; font-size: 15px; }
.muted { color: #6b7683; font-size: 13px; }`,
            javascript: `function Task(title) {
  this.title = title   // one own property each
}

Task.prototype.describe = function () {
  return 'Task: ' + this.title
}

const list = document.querySelector('#out')
const first = new Task('Write tests')
;['Write tests', 'Fix the build'].forEach((name) => {
  const task = new Task(name)
  const item = document.createElement('li')
  item.textContent = task.describe()
  list.appendChild(item)
})

document.querySelector('#keys').textContent =
  'own keys: ' + Object.keys(first).join(', ')`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'j-l51-h1',
            level: 3,
            body: 'The chain, drawn out',
          },
          {
            type: 'code',
            id: 'j-l51-c1',
            language: 'javascript',
            title: 'Where a property is found',
            code: `function Task(title) {
  this.title = title
}

const t = new Task('Write tests')

t.title           // own property — found on t
t.hasOwnProperty('title')  // true
Object.keys(t)    // ['title'] — own enumerable keys only

Task.prototype.describe = function () {
  return 'Task: ' + this.title
}

t.describe()      // not on t — found on Task.prototype
t.hasOwnProperty('describe')  // false`,
          },
          {
            type: 'text',
            id: 'j-l51-b2',
            body: '`Object.keys` and `for…of` see own properties only. A plain read walks the chain, which is why `t.hasOwnProperty` works even though nothing in your code ever put that method on `t`. The console shows this as `__proto__`, and it is a debugging aid rather than something to write in application code — use `Object.getPrototypeOf(t)` instead.',
          },
          {
            type: 'heading',
            id: 'j-l51-h2',
            level: 3,
            body: 'Why put methods on the prototype',
          },
          {
            type: 'code',
            id: 'j-l51-c2',
            language: 'javascript',
            title: 'One copy versus one per object',
            code: `function Slow(title) {
  this.title = title
  this.describe = function () {        // a new function per task
    return 'Task: ' + this.title
  }
}

function Fast(title) {
  this.title = title
}

Fast.prototype.describe = function () {  // one function, shared
  return 'Task: ' + this.title
}

const many = Array.from({ length: 1000 }, (_, i) => new Fast('task' + i))
console.log(many.length)   // 1000 objects, 1001 shared describe functions in total: one`,
          },
          {
            type: 'text',
            id: 'j-l51-b3',
            body: 'Both versions behave identically from the caller’s side — `task.describe()` works either way. The difference is memory and identity: a function created inside the constructor is a brand-new object per instance, so a thousand tasks hold a thousand copies and `a.describe === b.describe` is false. On the prototype there is one function, so the comparison is true and nothing is duplicated.',
          },
          {
            type: 'warning',
            id: 'j-l51-w1',
            title: 'Never add to Object.prototype',
            body: 'It looks harmless: adding one method there makes it available everywhere. But `Object.prototype` is the end of the chain for every object in the page, including ones you did not write, and a name like `get` or `remove` will collide with something. Enumerating properties across libraries also starts picking it up, quietly. If you need shared behaviour, build the chain on your own constructor — that is what `class` does for you.',
          },
          {
            type: 'heading',
            id: 'j-l51-h3',
            level: 3,
            body: 'Building a chain',
          },
          {
            type: 'code',
            id: 'j-l51-c3',
            language: 'javascript',
            title: 'Object.create starts an object from a prototype',
            code: `function describe() {
  return 'Task: ' + this.title
}

const proto = { describe: describe }
const t = Object.create(proto)

t.title = 'Write tests'
t.describe()              // 'Task: Write tests'
Object.keys(t)            // ['title']

const bare = Object.create(null)
bare.toString             // undefined — the chain ends immediately`,
          },
          {
            type: 'list',
            id: 'j-l51-l1',
            style: 'bullet',
            items: [
              '**`Object.getPrototypeOf(obj)`** — the next object in the chain, without touching `__proto__`.',
              '**`Object.create(proto)`** — an object whose prototype is exactly the one you pass.',
              '**`obj.hasOwnProperty(key)`** — did this object itself define it, as opposed to finding it further up?',
              '**`"key" in obj`** — true for own *and* inherited properties, so it answers a different question.',
              '**`class ... extends ...`**** — the modern way to build a chain; `super()` replaces the manual `Book.call(this, …)` copy.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l51-t1',
            title: 'Editing the prototype after instances exist',
            body: 'Adding to `Task.prototype` also updates objects that already exist, because the lookup happens on read rather than being copied at build time. That is convenient when it is deliberate — you can teach an object a new method long after it was created — and it is why a prototype change is a behaviour change for every live instance, not just the ones made afterwards.',
          },
          {
            type: 'example',
            id: 'j-l51-e1',
            title: 'A shared method, and where it comes from',
            body: 'Every entry below is built by the same constructor and none of them owns describe. The read-only properties panel shows the difference between what is theirs and what they inherit.',
            html: `<button id="add">Add a task</button>
<ul id="out"></ul>
<pre id="keys"></pre>`,
            javascript: `function Task(title) {
  this.title = title
}

Task.prototype.describe = function () {
  return 'Task: ' + this.title
}

const out = document.querySelector('#out')
const keys = document.querySelector('#keys')
let count = 0

document.querySelector('#add').addEventListener('click', () => {
  const task = new Task('task ' + (count + 1))
  count = count + 1

  const item = document.createElement('li')
  item.textContent = task.describe()
  out.appendChild(item)

  keys.textContent =
    'own keys: ' + Object.keys(task).join(', ') +
    ' | describe is own: ' + task.hasOwnProperty('describe')
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l51-x1',
            exercise: {
              id: 'ex-js-prototype',
              instructions:
                'Write a constructor `Shape` that takes a `name` and sets `this.name`. Put a single method `describe()` on `Shape.prototype` — not inside the constructor — that returns the name followed by " is a shape". Create `circle` with `new Shape("circle")` and log `circle.describe()`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// describe() goes on Shape.prototype,
// so every shape shares one copy.

function Shape() {
  
}

const circle = new Shape('circle')
console.log(circle.describe())
`,
              },
              expectedOutput: 'circle is a shape',
              tests: [
                {
                  id: 'ex-js-prototype-t1',
                  label: 'Shape is a constructor and sets this.name',
                  body: `if (typeof Shape !== 'function') return 'Define a constructor function called Shape.'
return typeof Shape.prototype === 'object' && Shape.prototype !== null
  ? true
  : 'Every function has a prototype object you can add methods to.';`,
                },
                {
                  id: 'ex-js-prototype-t2',
                  label: 'describe lives on the prototype, not on the instance',
                  body: `if (typeof Shape !== 'function') return 'Define a constructor function called Shape.'
return typeof Shape.prototype.describe === 'function'
  ? true
  : 'Add the method to Shape.prototype, after the function declaration.';
return circle.hasOwnProperty('describe') === false
  ? true
  : 'circle still owns describe, which means the method is inside the constructor rather than on the prototype.';`,
                },
                {
                  id: 'ex-js-prototype-t3',
                  label: 'Two shapes share the same method function',
                  body: `if (typeof Shape !== 'function') return 'Define a constructor function called Shape.'
var a = new Shape('a')
var b = new Shape('b')
return a.describe === b.describe
  ? true
  : 'Each instance made its own copy of describe. Define it once on Shape.prototype.';`,
                },
                {
                  id: 'ex-js-prototype-t4',
                  label: 'The result was logged',
                  body: `var log = window.__log || []
return circle.name === 'circle' && circle.describe() === 'circle is a shape'
  ? true
  : 'describe() should return the name followed by " is a shape", got: ' + circle.describe();
return log.length > 0 && log[log.length - 1] === 'circle is a shape'
  ? true
  : 'Expected the console output to be circle is a shape, got: ' + log.join('|');`,
                },
              ],
              hints: [
                'The constructor body only sets this.name — everything else goes on the prototype.',
                'Write Shape.prototype.describe = function () { return this.name + " is a shape" } after the constructor, not inside it.',
                'In this file you cannot use class, but the pattern is the same one class syntax generates under the hood.',
              ],
              solution: {
                javascript: `function Shape(name) {
  this.name = name
}

Shape.prototype.describe = function () {
  return this.name + ' is a shape'
}

const circle = new Shape('circle')
console.log(circle.describe())`,
              },
              testNotes:
                'The second and third checks compare identity, not behaviour: a method written inside the constructor works identically when called, so only these two tests can tell the two placements apart.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s42',
    title: 'Map and Set',
    description: 'Two built-in collections for the cases an object and an array handle badly.',
    lessons: [
      {
        id: 'js-l52',
        title: 'Map and Set',
        description: 'Ordered collections with real add, delete and size, and when to reach for them instead of an object or an array.',
        duration: 7,
        objectives: [
          'Store unique values in a Set and read them back in insertion order',
          'Store key-value pairs in a Map using keys of any type',
          'Choose between Map and a plain object on the actual weakness of each'
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l52',
          title: 'Map and Set quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l52-q1',
              type: 'multiple-choice',
              prompt: 'How many entries does this Set have?',
              code: 'const s = new Set()\ns.add(\'a\')\ns.add(\'a\')\ns.add(\'b\')',
              options: [
                '1',
                '2',
                '3',
                '0',
              ],
              answer: 1,
              explanation: 'A Set stores each value once. The second `add("a")` finds the value already there and changes nothing, so membership testing needs no `includes` check beforehand.',
            },
            {
              id: 'quiz-js-l52-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const m = new Map()\nm.set(\'a\', 1)\nconsole.log(m.get(\'b\'))',
              options: [
                'null',
                'undefined',
                '0',
                'It throws a TypeError',
              ],
              answer: 1,
              explanation: '`get` on a missing key gives `undefined`, the same as reading a missing object property. That is why counting uses `(map.get(k) || 0) + 1` rather than reaching for a default at the end.',
            },
            {
              id: 'quiz-js-l52-q3',
              type: 'true-false',
              prompt: 'The right way to read the number of entries in a Map or a Set is `map.size()`.',
              answer: false,
              explanation: '`size` is a property, not a method: `map.size`, with no parentheses. Calling it throws a TypeError, and it is worth knowing that because reaching for `size()` is the single most common Map typo.',
            },
            {
              id: 'quiz-js-l52-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this?',
              code: 'const first = { id: 1 }\nconst rows = new Map()\nrows.set(first, \'row one\')\n\nconsole.log(rows.get({ id: 1 }))',
              options: [
                'Nothing, it logs row one',
                'It logs undefined, because each object literal is a different key',
                'It logs null',
                'It throws a TypeError',
              ],
              answer: 1,
              explanation: 'Map keys are compared by identity, not by structure. The object in the `get` is a brand-new object, so it is a different key. Keep a reference to the key and reuse it.',
            },
            {
              id: 'quiz-js-l52-q5',
              type: 'blank',
              prompt: 'What is the Map equivalent of `Object.entries(obj)`?',
              answers: [
                'a for…of loop over entries',
                'spreading the map into entries',
                '[...map]',
                '[...map.entries()]',
                'the map.entries() iterator',
                'entries',
              ],
              explanation: 'A Map is iterable directly, so `for (const [key, value] of map)` works with no conversion call. Spreading with `[...map]` gives the `[key, value]` pairs as arrays, exactly the shape `Object.entries` produces for an object.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l52-b1',
            body: 'Both of these ship with JavaScript, so nothing needs installing. A **Set** holds values with no duplicates; a **Map** holds key-value pairs and keeps them in the order you added them. They are the answer to two specific complaints about the older tools: an array needs `includes` to check membership, which is a linear scan, and an object silently accepts keys that are not really keys.',
          },
          {
            type: 'demo',
            id: 'j-l52-d1',
            title: 'Tags that count themselves',
            body: 'Type a tag and press the button. A repeat of a tag already seen adds nothing, because a Set refuses duplicates — no check needed first.',
            html: `<input id="tag" placeholder="tag" />
<button id="add">Add</button>
<p id="out"></p>`,
            css: `body { font-family: system-ui, sans-serif; }
input { font: inherit; padding: .3rem .4rem; }
button { font: inherit; padding: .4rem .7rem; margin-left: .4rem; }
#out { font-size: 15px; line-height: 1.6; }`,
            javascript: `const tags = new Set()
const counts = new Map()
const out = document.querySelector('#out')

function render() {
  out.textContent = [...tags].join(', ') + ' — ' + tags.size + ' tag(s)'
}

document.querySelector('#add').addEventListener('click', () => {
  const tag = document.querySelector('#tag').value.trim().toLowerCase()
  if (tag) {
    tags.add(tag)
    counts.set(tag, (counts.get(tag) || 0) + 1)
  }
  document.querySelector('#tag').value = ''
  render()
})`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'j-l52-h1',
            level: 3,
            body: 'Set',
          },
          {
            type: 'code',
            id: 'j-l52-c1',
            language: 'javascript',
            title: 'Adding, checking, counting',
            code: `const seen = new Set()

seen.add('js')     // returns the Set, so you cannot chain .add
seen.add('js')     // ignored — already present
seen.has('js')     // true
seen.size          // 1, not 2

seen.delete('js')
seen.size          // 0

for (const value of seen) console.log(value)   // insertion order`,
          },
          {
            type: 'text',
            id: 'j-l52-b2',
            body: '`size` is a real property maintained as you go; an array gives you `length` only because arrays are indexed, which is the same idea wearing different clothes. The duplicate check is where the Set earns its place: `add` is one hash lookup, so tagging a thousand items with a thousand `add` calls is cheap, where a thousand `includes` calls over a growing array is not.',
          },
          {
            type: 'heading',
            id: 'j-l52-h2',
            level: 3,
            body: 'Map',
          },
          {
            type: 'code',
            id: 'j-l52-c2',
            language: 'javascript',
            title: 'Pairs, and keys that are not strings',
            code: `const counts = new Map()

counts.set('js', 1)
counts.set('js', counts.get('js') + 1)
counts.get('js')      // 2
counts.has('js')      // true
counts.size           // 1

const rowA = { id: 1 }
counts.set(rowA, 'first row')   // an object works as a key
counts.get({ id: 1 })           // undefined — a different object

for (const [key, value] of counts) console.log(key, value)`,
          },
          {
            type: 'text',
            id: 'j-l52-b3',
            body: 'Two consequences worth holding on to. First, keys are compared by identity, so `counts.get({ id: 1 })` misses — you have to keep a reference to the object you used as the key. Second, a Map can be `Object.entries`-style looped with `for…of` directly, while a plain object needs the extra call; and `map.keys()` and `map.values()` are iterators when you only want one side.',
          },
          {
            type: 'code',
            id: 'j-l52-c3',
            language: 'javascript',
            title: 'From an object to a Map, and back',
            code: `new Map(Object.entries({ a: 1, b: 2 }))   // Map with two pairs
Object.fromEntries(new Map([['a', 1]]))          // { a: 1 }

const m = new Map([['a', 1], ['b', 2]])
console.log([...m.keys()])    // ['a', 'b']
console.log([...m.values()])  // [1, 2]
m.forEach((value, key) => console.log(key, value))`,
          },
          {
            type: 'heading',
            id: 'j-l52-h3',
            level: 3,
            body: 'Choosing between them',
          },
          {
            type: 'list',
            id: 'j-l52-l1',
            style: 'bullet',
            items: [
              '**Object** for fixed, known keys — configuration, form state, a row you wrote yourself. It is also the only one JSON accepts, and the only one you can dot into.',
              '**Map** when keys are added and removed at runtime, when the key is not a string, or when you need to iterate the pairs in order.',
              '**Set** when the list itself is the data and you care about membership rather than position — selected ids, unique tags, visited nodes.',
              '**WeakMap** for object keys you want the garbage collector to be able to reclaim; it is not iterable and has no `size`.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l52-w1',
            title: 'The mistakes specific to a Map',
            body: 'Using `[object Object]` as a key puts every object in one bucket. Using `map.push(...)` treats the Map as an array and fails. And `map.size()` — with parentheses — is a call on a number, which is a TypeError; it is a plain property, like `array.length`.',
          },
          {
            type: 'example',
            id: 'j-l52-e1',
            title: 'Counting words with a Map',
            body: 'The two lines that would be awkward with a plain object are `counts.get(word) || 0` — no undefined check — and the fact that the keys can be anything, including a number.',
            html: `<textarea id="text" rows="3">the quick brown fox the fox</textarea>
<button id="go">Count</button>
<pre id="out"></pre>`,
            javascript: `const counts = new Map()

function count(text) {
  const words = text.toLowerCase().split(/\\s+/).filter(Boolean)
  words.forEach((word) => {
    counts.set(word, (counts.get(word) || 0) + 1)
  })
  return counts
}

document.querySelector('#go').addEventListener('click', () => {
  counts.clear()
  const result = count(document.querySelector('#text').value)
  document.querySelector('#out').textContent =
    [...result].map((pair) => pair.join(': ')).join(', ')
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l52-x1',
            exercise: {
              id: 'ex-js-map-set',
              instructions:
                'Create a Set called `unique` and add the words "one", "two", "one" and "three" to it, in that order. Then create a Map called `lengths` with one entry per word in the Set, where the key is the word and the value is how many characters it has. Log `unique.size`, then log `lengths.get("two")`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// The repeat should not make a fifth entry.
// A Map entry is two things: key, then value.

const unique = new Set()

const lengths = new Map()

console.log(unique.size)
console.log(lengths.get('two'))
`,
              },
              expectedOutput: '3 then 3',
              tests: [
                {
                  id: 'ex-js-map-set-t1',
                  label: 'unique is a Set and the repeat was ignored',
                  body: `if (typeof unique === 'undefined' || typeof unique.add !== 'function') return 'Create a Set called unique.'
return unique.size === 3
  ? true
  : 'Adding "one" twice to a Set keeps it at three entries, got size ' + unique.size + '. Add one, two, one and three.';`,
                },
                {
                  id: 'ex-js-map-set-t2',
                  label: 'The Set still holds all three words',
                  body: `if (typeof unique === 'undefined' || typeof unique.has !== 'function') return 'Create a Set called unique.'
return unique.has('one') && unique.has('two') && unique.has('three')
  ? true
  : 'The Set must contain one, two and three — check the words are spelled the same as in the instructions.';`,
                },
                {
                  id: 'ex-js-map-set-t3',
                  label: 'lengths is a Map keyed by word',
                  body: `if (typeof lengths === 'undefined' || typeof lengths.get !== 'function') return 'Create a Map called lengths.'
return lengths.size === 3
  ? true
  : 'lengths should have one entry per word in the Set, so three entries, got ' + lengths.size + '.';
return lengths.get('one') === 3 && lengths.get('two') === 3 && lengths.get('three') === 5
  ? true
  : 'Each value should be the character count of its word: one and two are 3, three is 5.';`,
                },
                {
                  id: 'ex-js-map-set-t4',
                  label: 'Both results were logged',
                  body: `var log = window.__log || []
return log.length > 1 && log[log.length - 1] === 3 && log[0] === 3
  ? true
  : 'Expected the console output to be 3 then 3, got: ' + log.join('|');`,
                },
              ],
              hints: [
                'Add to the Set with unique.add("one") four times — the second "one" is simply ignored.',
                'Loop over the Set with unique.forEach((word) => { ... }) and set an entry per word: lengths.set(word, word.length).',
                'Map.get returns undefined for a key it does not have, so use (lengths.get(word) || 0) + 1 when counting into it.',
              ],
              solution: {
                javascript: `const unique = new Set()
unique.add('one')
unique.add('two')
unique.add('one')
unique.add('three')

const lengths = new Map()
unique.forEach((word) => {
  lengths.set(word, word.length)
})

console.log(unique.size)
console.log(lengths.get('two'))`,
              },
              testNotes:
                'The checks read `size` directly, which is why `size()` with parentheses fails. They also check the Set contents rather than only the count, so a Set of three arbitrary entries will not pass.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s43',
    title: 'Function definitions',
    description: 'The function keyword, hoisting, and the differences between a declaration and an expression.',
    lessons: [
      {
        id: 'js-l53',
        title: 'Function definitions and the function keyword',
        description: 'What the keyword does for you, why order stops mattering, and how a function becomes a value.',
        duration: 7,
        objectives: [
          'Write a named function declaration and a named function expression',
          'Explain what hoisting does and why a const arrow is different',
          'Recognise an immediately invoked function expression and what it is for'
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l53',
          title: 'Function definitions and the function keyword quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l53-q1',
              type: 'multiple-choice',
              prompt: 'Which of these can be called before the line it is written on?',
              options: [
                'const hello = () => "hi"',
                'function hello() { return "hi" }',
                'let hello = function () { return "hi" }',
                'var hello = function () { return "hi" }',
              ],
              answer: 1,
              explanation: 'Only a function declaration is hoisted with its body attached. The other three are assignments: the name is reserved but has no value yet, so the call lands in the temporal dead zone and throws.',
            },
            {
              id: 'quiz-js-l53-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'console.log(typeof add)\n\nfunction add(a, b) {\n  return a + b\n}',
              options: [
                'undefined',
                '"number"',
                '"function"',
                'It throws a ReferenceError',
              ],
              answer: 2,
              explanation: 'The declaration is recorded with its value before any statement runs, so by the time the log executes `add` is already a function. That is why the call in the next line works too.',
            },
            {
              id: 'quiz-js-l53-q3',
              type: 'identify-error',
              prompt: 'What is wrong with this?',
              code: 'const result = (function () {\n  const hidden = 42\n  return hidden * 2\n})\n\nconsole.log(result)',
              options: [
                'Nothing, it logs 84',
                'The function is never called, so result is the function itself',
                'The parentheses are not allowed around a function',
                'const hidden is not visible inside the function',
              ],
              answer: 1,
              explanation: 'The trailing `()` is what calls it. Without them the wrapper is just an expression that produces a function, and `result` holds that function rather than the number 84.',
            },
            {
              id: 'quiz-js-l53-q4',
              type: 'true-false',
              prompt: 'A named function expression can call itself by its own name, which a plain function stored in a variable cannot.',
              answer: true,
              explanation: 'The name on `function area2() { }` exists only inside the body, and it is the one to use for recursion. A function assigned to `const area` has to refer to `area` itself — which works, but only because the variable happens to be in scope.',
            },
            {
              id: 'quiz-js-l53-q5',
              type: 'blank',
              prompt: 'What is the name for the behaviour where a function declaration is available before the line it is written on?',
              answers: [
                'hoisting',
                'function hoisting',
                'hoisted',
                'hoist',
              ],
              explanation: 'Hoisting applies to every declaration, but only function declarations carry their value up with the name. `let` and `const` are hoisted as names only, and touching one before its line is the ReferenceError the term also covers.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l53-b1',
            body: 'A function declaration starts with the `function` keyword and a name you choose. Everything else about it — the parentheses, the parameters, the braces — is the same as any other function. The keyword is not decoration: it is what makes the name available before the line it is written on, which is the one behaviour that separates a declaration from everything else here.',
          },
          {
            type: 'demo',
            id: 'j-l53-d1',
            title: 'Two calls, one above and one below',
            body: 'Both buttons call a function that is defined further down the script, and both work. Nothing about a declaration depends on where in the file it sits.',
            html: `<button id="a">Call before the definition</button>
<button id="b">Call after</button>
<pre id="out">nothing yet</pre>`,
            css: `body { font-family: system-ui, sans-serif; }
button { font: inherit; padding: .4rem .7rem; margin-right: .4rem; }
pre { font-size: 13px; }`,
            javascript: `const out = document.querySelector('#out')

document.querySelector('#a').addEventListener('click', () => {
  out.textContent = 'before: ' + greet('Ada')
})
document.querySelector('#b').addEventListener('click', () => {
  out.textContent = 'after: ' + greet('Ada')
})

function greet(name) {
  return 'Hello, ' + name
}`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'j-l53-h1',
            level: 3,
            body: 'Declaration against expression',
          },
          {
            type: 'code',
            id: 'j-l53-c1',
            language: 'javascript',
            title: 'The same body, three placements',
            code: `// declaration — the name is bound and usable immediately
function area(w, h) {
  return w * h
}

// expression — the function is the value on the right of the =
const sameArea = function (w, h) {
  return w * h
}

// named expression — same thing, plus a name it can call itself by
const labelled = function area2(w, h) {
  return w * h
}`,
          },
          {
            type: 'text',
            id: 'j-l53-b2',
            body: 'All three produce a function with the same behaviour. What differs is when the name exists and whether the function has a name of its own. The named expression is the interesting one: `area2` is only visible inside its own body, so it is what you want for recursion, and it gives you a useful name in a stack trace instead of "anonymous".',
          },
          {
            type: 'heading',
            id: 'j-l53-h2',
            level: 3,
            body: 'Hoisting, precisely',
          },
          {
            type: 'code',
            id: 'j-l53-c2',
            language: 'javascript',
            title: 'One of these two lines fails',
            code: `greet()          // works — 'Hi'

function greet() {
  return 'Hi'
}

hello()          // ReferenceError
const hello = () => 'Hi'`,
          },
          {
            type: 'text',
            id: 'j-l53-b3',
            body: 'JavaScript reads a scope and records every declaration in it before it runs any statement. A function declaration is one of those records, and its body travels with it, so it exists from the top of the scope. `const` and `let` are recorded too, but only as names with no value, and using one before its line is a ReferenceError. Nothing about functions is magic here — the runtime is simply taking one declaration type with it and not the others.',
          },
          {
            type: 'warning',
            id: 'j-l53-w1',
            title: 'Hoisting is a licence, not a reason',
            body: 'Because a declaration can be called from anywhere in its scope, a call at the top of a long file can reach into code far below it, and nothing in the source says that connection exists. The habit that pays off: define before you use, in reading order, and treat the fact that it *would* work as an accident rather than a design.',
          },
          {
            type: 'heading',
            id: 'j-l53-h3',
            level: 3,
            body: 'A function that runs the moment it is defined',
          },
          {
            type: 'code',
            id: 'j-l53-c3',
            language: 'javascript',
            title: 'The immediately invoked function expression',
            code: `const result = (function () {
  const hidden = 42
  return hidden * 2
})()

console.log(result)   // 84

// the wrapping parentheses are what mark it as an expression`,
          },
          {
            type: 'text',
            id: 'j-l53-b4',
            body: 'Wrapping the function in parentheses turns it into a value, which the trailing `()` then calls immediately. The reason it existed was the old way to get private variables in a browser, and it is how every module scope works. In modern code a plain block, or just a function declaration, covers the same ground without the punctuation.',
          },
          {
            type: 'list',
            id: 'j-l53-l1',
            style: 'bullet',
            items: [
              '**Declaration** when the function is a permanent part of the file and everything may call it.',
              '**Named expression** when the function is a value — stored, passed around — and needs to refer to itself.',
              '**Arrow** for short callbacks and anything that must keep the surrounding `this`.',
              '**Method shorthand** inside an object literal, where the name comes from the key.',
            ],
          },
          {
            type: 'example',
            id: 'j-l53-e1',
            title: 'A function that builds a function',
            body: 'The outer function returns a new function each time it is called, so each one closes over its own number. The inner name is the named expression, and it calls itself to count down.',
            html: `<button id="go">Count down from 3</button>
<pre id="out">—</pre>`,
            javascript: `function makeCounter(start) {
  return function count(n) {
    if (n <= 0) return 'done'
    return n + '… ' + count(n - 1)
  }
}

const lines = []

document.querySelector('#go').addEventListener('click', () => {
  lines.length = 0
  const count = makeCounter()
  for (let n = 3; n > 0; n -= 1) lines.push(count(n))
  lines.push(count(0))
  document.querySelector('#out').textContent = lines.join('\\n')
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l53-x1',
            exercise: {
              id: 'ex-js-function-decl',
              instructions:
                'Write a function declaration called `shout` that takes a string and returns it upper-cased with an exclamation mark on the end. Call `shout("hello")` on a line *above* the declaration, before it is defined, and log the result — the call must come first in the file and still work.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// The call goes here, above the declaration:

console.log(shout('hello'))

// Then the declaration, using the function keyword:

`,
              },
              expectedOutput: 'HELLO!',
              tests: [
                {
                  id: 'ex-js-function-decl-t1',
                  label: 'shout is defined',
                  body: `return typeof shout === 'function' ? true : 'Define a function called shout.';`,
                },
                {
                  id: 'ex-js-function-decl-t2',
                  label: 'shout upper-cases and adds a mark',
                  body: `if (typeof shout !== 'function') return 'Define a function called shout.'
return shout('hello') === 'HELLO!'
  ? true
  : 'Expected HELLO!, got: ' + shout('hello');`,
                },
                {
                  id: 'ex-js-function-decl-t3',
                  label: 'The mark is added even when there is nothing to shout',
                  body: `if (typeof shout !== 'function') return 'Define a function called shout.'
return shout('') === '!' && shout('ok') === 'OK!'
  ? true
  : 'shout("") should give ! and shout("ok") should give OK!. Return text.toUpperCase() + "!".';`,
                },
                {
                  id: 'ex-js-function-decl-t4',
                  label: 'The result was logged',
                  body: `var log = window.__log || []
return log.length > 0 && log[log.length - 1] === 'HELLO!'
  ? true
  : 'Expected the console output to be HELLO!, got: ' + log.join('|');`,
                },
              ],
              hints: [
                'Start the definition with the function keyword: function shout(text) { ... }.',
                'Build the result from the parameter: text.toUpperCase() + "!" — an exclamation mark in ordinary quotes, not a template literal.',
                'Leave the call above the definition. That only works because a declaration is hoisted; a const arrow on the same line would throw a ReferenceError.',
              ],
              solution: {
                javascript: `console.log(shout('hello'))

function shout(text) {
  return text.toUpperCase() + '!'
}`,
              },
              testNotes:
                'The checks call shout directly, so the ordering rule cannot be tested automatically — putting the call on top is the part to get right by eye.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s44',
    title: 'Function parameters',
    description: 'How a function receives the values it works on, and what happens when one is not passed at all.',
    lessons: [
      {
        id: 'js-l54',
        title: 'Parameters and default values',
        description: 'How a function receives what it needs, defaults that remove the undefined case, rest parameters and the shorthand arrow body.',
        duration: 7,
        objectives: [
          'Tell parameters and arguments apart and know that nothing is type-checked',
          'Give a parameter a default so the missing case never reaches the body',
          'Collect any number of arguments with a rest parameter'
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l54',
          title: 'Parameters and default values quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l54-q1',
              type: 'multiple-choice',
              prompt: 'What is a parameter?',
              options: [
                'A value passed in at the call site',
                'A name in the function definition that receives a value',
                'A type declaration the engine checks',
                'A default value',
              ],
              answer: 1,
              explanation: 'The names in the definition are parameters; the values in the parentheses at the call are arguments. The pairing is by position, so `area(3, 4)` computes `3 * 4` regardless of what the names are called.',
            },
            {
              id: 'quiz-js-l54-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function area(width, height) {\n  return width * height\n}\nconsole.log(area(3))',
              options: [
                '9',
                'NaN',
                '0',
                'It throws a TypeError',
              ],
              answer: 1,
              explanation: 'Nothing is checked, so `height` is `undefined` and `3 * undefined` is `NaN`. A default — `height = 1` — removes that case at the source instead of patching it afterwards.',
            },
            {
              id: 'quiz-js-l54-q3',
              type: 'true-false',
              prompt: 'A default parameter is used whenever the caller passes a falsy value, including an empty string or zero.',
              answer: false,
              explanation: 'Only a missing argument or an explicit `undefined` triggers the default. `0` and `""` are real values and win — which is what you want for a quantity, and a surprise when the parameter is a string.',
            },
            {
              id: 'quiz-js-l54-q4',
              type: 'identify-error',
              prompt: 'What goes wrong here?',
              code: 'function first(...a, last) {\n  return a.length + last\n}\nconsole.log(first(1, 2, 3))',
              options: [
                'It logs 6',
                'It throws a SyntaxError, because a rest parameter must be last',
                'It logs 4',
                'last is undefined and the result is NaN',
              ],
              answer: 1,
              explanation: 'A rest parameter swallows everything left over, so it has to come last in the list. Move it to the end, or take the last argument separately and rest the front.',
            },
            {
              id: 'quiz-js-l54-q5',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const nums = [1, 2, 3]\nfunction total(...values) {\n  return values.length\n}\nconsole.log(total(...nums))',
              options: [
                '1',
                '3',
                '[1, 2, 3]',
                'It throws a TypeError',
              ],
              answer: 1,
              explanation: 'The three dots work in both directions with opposite jobs. The rest parameter gathers the arguments into an array, and the spread in the call hands the array to the function one value at a time.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l54-b1',
            body: 'A function that takes nothing still cannot do anything useful on its own. Parameters are how a caller hands over the values the work depends on, and the rules around them are looser than in most languages — which is why the mistakes here are quiet ones rather than loud ones.',
          },
          {
            type: 'demo',
            id: 'j-l54-d1',
            title: 'The same function, called four ways',
            body: 'The four calls below are all legal. Two of them produce what the author intended, and two produce results nobody typed, without an error in sight.',
            html: `<button data-q="0">greet()</button>
<button data-q="1">greet('Ada')</button>
<button data-q="2">greet('Ada', '?')</button>
<button data-q="3">greet('', '!')</button>
<pre id="out">—</pre>`,
            css: `body { font-family: system-ui, sans-serif; }
button { font: inherit; padding: .4rem .7rem; margin-right: .3rem; }
pre { font-size: 13px; }`,
            javascript: `function greet(name = 'friend', punctuation = '!') {
  return 'Hello, ' + name + punctuation
}

const args = [[], ['Ada'], ['Ada', '?'], ['', '!']]

document.querySelectorAll('button').forEach((button) => {
  button.addEventListener('click', () => {
    const n = Number(button.dataset.q)
    document.querySelector('#out').textContent = greet(...args[n])
  })
})`,
            height: 190,
          },
          {
            type: 'text',
            id: 'j-l54-b2',
            body: '**Parameters** are the names in the definition. **Arguments** are the values at the call site, paired with the parameters by position — which is why `area(3, 4)` computes `3 * 4` and has nothing to do with the names. JavaScript checks nothing about them: no types are declared, no argument count is enforced, and passing the wrong thing raises no error. `area(3, 4, 5)` quietly ignores the fifth value; `area(3)` quietly gives you `undefined`, and `3 * undefined` is `NaN`. The contract is a promise you keep in a comment, not something the language enforces.',
          },
          {
            type: 'heading',
            id: 'j-l54-h1',
            level: 3,
            body: 'Default parameters',
          },
          {
            type: 'text',
            id: 'j-l54-b3',
            body: 'A default removes the undefined case at the source instead of patching it afterwards with an `if`. It is used only when the argument is **missing** or explicitly passed as `undefined`. `0` and `""` are real values and win over the default — which is exactly what you want for a quantity or a discount, and a common surprise for a string parameter.',
          },
          {
            type: 'code',
            id: 'j-l54-c1',
            language: 'javascript',
            title: 'Put the fallback in the parameter list',
            code: `function greet(name = 'friend', punctuation = '!') {
  return 'Hello, ' + name + punctuation
}

console.log(greet())           // Hello, friend!
console.log(greet('Ada'))      // Hello, Ada!
console.log(greet('Ada', '?')) // Hello, Ada?
console.log(greet(''))         // Hello, ! — "" is a value, so no default`,
          },
          {
            type: 'heading',
            id: 'j-l54-h2',
            level: 3,
            body: 'Rest parameters',
          },
          {
            type: 'text',
            id: 'j-l54-b4',
            body: 'When a function genuinely takes any number of arguments, a rest parameter collects whatever is left into a real array. The three dots go **in the definition**, not at the call site, and it has to be the last parameter. You then use it exactly like an array: `prices.length`, `prices.map`, a `for…of` over it. The spread on the call side — `total(...list)` — is the same three dots with the opposite job, handing a list of values to the function.',
          },
          {
            type: 'code',
            id: 'j-l54-c2',
            language: 'javascript',
            title: '...rest gathers the arguments',
            code: `function total(...prices) {
  return prices.reduce((sum, price) => sum + price, 0)
}

console.log(total(2, 5, 8))  // 15
console.log(total())         // 0

const list = [1, 2, 3]
console.log(total(...list))  // 6 — the call-side spread`,
          },
          {
            type: 'heading',
            id: 'j-l54-h3',
            level: 3,
            body: 'Arrows: the concise body',
          },
          {
            type: 'code',
            id: 'j-l54-c3',
            language: 'javascript',
            title: 'Concise versus block body',
            code: `const short = (n) => n * 2          // returns n * 2

const long = (n) => {          // needs an explicit return
  const result = n * 2
  return result
}`,
          },
          {
            type: 'text',
            id: 'j-l54-b5',
            body: 'A concise body has no braces and no `return` — the value after the arrow is returned for you. Add braces and you are back to an ordinary body, where `return` is mandatory and forgetting it gives you `undefined`. The parentheses around a single parameter may be dropped, but keep them for zero or for more than one: they are what tell the reader where the parameters stop. Defaults and rest work in arrows exactly as they do in a declaration, which makes `const f = (a, b = 2) => a * b` a perfectly ordinary line.',
          },
          {
            type: 'tip',
            id: 'j-l54-t1',
            title: 'Arrows have no this of their own',
            body: 'An arrow function inherits `this` from the code around it instead of getting one from the call. That makes arrows perfect for callbacks and array methods — `items.map((item) => item * 2)` always means the surrounding code — and a poor choice for object methods that need to know which object they were called on, or for a constructor.',
          },
          {
            type: 'example',
            id: 'j-l54-e1',
            title: 'A function that returns its result',
            body: 'The function returns a value, and the code around it decides where that value goes. Change the number and the total updates.',
            html: `<label for="qty">Quantity</label>
<input id="qty" type="number" value="2" />
<p id="out">waiting…</p>`,
            javascript: `function lineTotal(price, quantity = 1) {
  return price * quantity
}

const out = document.querySelector('#out')
const input = document.querySelector('#qty')

function update() {
  out.textContent = 'Total: ' + lineTotal(2.5, Number(input.value) || 0)
}

update()
input.addEventListener('input', update)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l54-x1',
            exercise: {
              id: 'ex-js-rest-params',
              instructions:
                'Write `average(...numbers)` that returns the mean of however many numbers you pass in, using a rest parameter. Return 0 when it is called with no numbers at all. Then log `average(2, 4, 6)`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Rest parameter, divide by how many you were given,
// and return 0 for an empty call.

function average() {
  
}

console.log(average(2, 4, 6))
`,
              },
              expectedOutput: '4',
              tests: [
                {
                  id: 'ex-js-rest-params-t1',
                  label: 'average is a function',
                  body: `return typeof average === 'function' ? true : 'Define a function called average.';`,
                },
                {
                  id: 'ex-js-rest-params-t2',
                  label: 'Three numbers average correctly',
                  body: `if (typeof average !== 'function') return 'Define a function called average.'
return average(2, 4, 6) === 4
  ? true
  : '(2 + 4 + 6) / 3 is 4, got: ' + average(2, 4, 6);`,
                },
                {
                  id: 'ex-js-rest-params-t3',
                  label: 'A single number and a pair both work',
                  body: `if (typeof average !== 'function') return 'Define a function called average.'
return average(10) === 10 && average(1, 2) === 1.5
  ? true
  : 'average(10) should be 10 and average(1, 2) should be 1.5. Got: ' + average(10) + ' and ' + average(1, 2);`,
                },
                {
                  id: 'ex-js-rest-params-t4',
                  label: 'No arguments returns 0 instead of NaN',
                  body: `if (typeof average !== 'function') return 'Define a function called average.'
return average() === 0
  ? true
  : 'Calling average() with no numbers should return 0 — guard the empty case before dividing.';`,
                },
              ],
              hints: [
                'Add `...numbers` inside the parentheses of the definition — that is what turns the arguments into an array you can use `length` on.',
                'Sum them with `numbers.reduce((sum, n) => sum + n, 0)`, then divide the total by `numbers.length`.',
                'Divide by zero gives NaN, so check `numbers.length === 0` and return 0 before you get there.',
              ],
              solution: {
                javascript: `function average(...numbers) {
  if (numbers.length === 0) return 0
  const total = numbers.reduce((sum, n) => sum + n, 0)
  return total / numbers.length
}

console.log(average(2, 4, 6))`,
              },
              testNotes:
                'The checks call the function with different numbers of arguments. A fixed `function average(a, b, c)` would pass two of them and fail the one-argument and zero-argument cases.',
            },
          },
        ],
      },
    ],
  },
]