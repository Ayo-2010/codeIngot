import type { Section } from '~/types/content'

export const jsArraysDatesSections: Section[] = [
  /* ---------------------------------- js-s14 --------------------------------- */
  {
    id: 'js-s14',
    title: 'Arrays',
    description:
      'An ordered list under one name: creating it, reading it by position, adding to both ends, and the family of methods that turn raw data into what you actually want.',
    lessons: [
      {
        id: 'js-l20',
        title: 'Arrays and reading data',
        description:
          'Creating a list, reading it by position, adding and removing at each end, and looping over it without counting.',
        duration: 6,
        objectives: [
          'Create an array, read its length, and read an item by index',
          'Explain why there is no last[-1], and where the classic off-by-one comes from',
          'Add and remove with push, pop, shift and unshift, and read with for…of',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l20',
          title: 'Arrays and reading data quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l20-q1',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const cars = [\'Saab\', \'Volvo\', \'BMW\']\ncars.push(\'Audi\')\nconsole.log(cars[cars.length - 1], cars[-1])',
              options: [
                'Audi undefined',
                'Audi Audi',
                'undefined Audi',
                'BMW undefined',
              ],
              answer: 0,
              explanation: 'The last item sits at `length - 1`, so after the push that is the Audi. `cars[-1]` is undefined because indexes count from zero and from the start — there is no index -1, and a negative property lookup is just a missing property rather than an error.',
            },
            {
              id: 'quiz-js-l20-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const items = [1, 2, 3]\nitems.shift()\nitems.unshift(0)\nconsole.log(items)',
              options: [
                '[0, 1, 2, 3]',
                '[0, 2, 3]',
                '[2, 3, 0]',
                '[1, 2, 3]',
              ],
              answer: 1,
              explanation: '`shift` removes the first item, leaving `[2, 3]`, and `unshift(0)` adds 0 at the front. The removed 1 is gone, so the result is `[0, 2, 3]`.',
            },
            {
              id: 'quiz-js-l20-q3',
              type: 'multiple-choice',
              prompt: 'Which method removes the last item from an array and returns it?',
              options: [
                '`push()`',
                '`pop()`',
                '`shift()`',
                '`unshift()`',
              ],
              answer: 1,
              explanation: '`pop` removes and returns the final item. `push` adds at the end, while `shift` and `unshift` work at the front, where every remaining index has to be renumbered.',
            },
            {
              id: 'quiz-js-l20-q4',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const out = []\nfor (const [i, name] of [\'Ada\', \'Bo\'].entries()) {\n  out.push(i + 1 + \'. \' + name)\n}\nconsole.log(out.join(\' | \'))',
              options: [
                '1. Ada | 2. Bo',
                '0. Ada | 1. Bo',
                'Ada | Bo',
                '1. Ada | 1. Bo',
              ],
              answer: 0,
              explanation: '`entries()` yields an `[index, value]` pair for each item, and the destructuring splits it apart. Adding 1 to the zero-based index turns the display into 1 and 2.',
            },
            {
              id: 'quiz-js-l20-q5',
              type: 'multiple-choice',
              prompt: 'Why can `unshift` be much slower than `push` on a long array?',
              options: [
                'It copies the array into a string first',
                'It must renumber every existing item to keep the indexes gapless',
                'It always sorts the array afterwards',
                'It creates a new array instead of changing the original',
              ],
              answer: 1,
              explanation: 'Adding at the front shifts every remaining element one position along so the indexes stay continuous, which costs time proportional to the length. `push` appends without moving anything.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l20-b1',
            body: 'An array is an ordered list of values under one name, written with square brackets. Storing three cars as `car1`, `car2`, `car3` means the code works until the day there are four of them, and every piece of logic has to be rewritten. An array holds all of them at once and can be looped over, so adding a fourth car needs no other changes at all.',
          },
          {
            type: 'demo',
            id: 'j-l20-d1',
            title: 'A queue you can push to and pop from',
            body: 'The four buttons call the four methods. Watch the indexes in the list: `unshift` renumbers every item, and that is why it is the expensive one. Notice also what an empty queue does — the list just goes blank, with no error.',
            html: `<ul id="queue"></ul>
<p id="out">length: 3</p>
<div class="row">
  <button id="push">push</button>
  <button id="pop">pop</button>
  <button id="unshift">unshift</button>
  <button id="shift">shift</button>
</div>`,
            css: `.row { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
ul { margin: 0 0 0.5rem; padding-left: 1.2rem; }
button { font: inherit; padding: 0.25rem 0.7rem; cursor: pointer; }`,
            javascript: `const queue = ['Ada', 'Bo', 'Cy']
const list = document.querySelector('#queue')
const out = document.querySelector('#out')

function draw() {
  list.textContent = ''
  queue.forEach(function (name, i) {
    const li = document.createElement('li')
    li.textContent = i + ': ' + name
    list.appendChild(li)
  })
  out.textContent = 'length: ' + queue.length
}

function on(id, run) {
  document.querySelector('#' + id).onclick = function () {
    run()
    draw()
  }
}

on('push', function () { queue.push('Dee') })
on('pop', function () { queue.pop() })
on('unshift', function () { queue.unshift('Zed') })
on('shift', function () { queue.shift() })
draw()`,
            height: 260,
          },
          {
            type: 'code',
            id: 'j-l20-c1',
            language: 'javascript',
            title: 'Creating and reading',
            code: `const cars = ['Saab', 'Volvo', 'BMW']

cars.length      // 3
cars[0]          // 'Saab'  — the first item
cars[2]          // 'BMW'   — the last item
cars[3]          // undefined — not an error, just nothing there
cars[-1]         // undefined

const first = cars[0]
const last = cars[cars.length - 1]`,
          },
          {
            type: 'heading',
            id: 'j-l20-h1',
            level: 3,
            body: 'There is no last[-1]',
          },
          {
            type: 'text',
            id: 'j-l20-b2',
            body: 'Indexes count from **zero**, so the last item sits at `length - 1`. That off-by-one is the source of the classic loop bug: a loop written as `i < cars.length` and one written as `i <= cars.length` cannot both be right, and only one of them is. Asking for `cars[-1]` returns `undefined` rather than an error, because `-1` is a perfectly good property name — it just has no value on an array. Arrays have indexes and `length`; nothing else, which is why `slice(-3)` gives you the tail of a *string* but `arr[-1]` does nothing useful for an array. Reading past the end is also `undefined`, not a crash, which is friendly right up until that `undefined` gets used.',
          },
          {
            type: 'heading',
            id: 'j-l20-h2',
            level: 3,
            body: 'Adding and removing: the four methods',
          },
          {
            type: 'code',
            id: 'j-l20-c2',
            language: 'javascript',
            title: 'Two at the end, two at the front',
            code: `const stack = ['b']

stack.push('c')      // ['b', 'c']   add to the end
stack.pop()          // 'c'          remove from the end, returns it
stack.unshift('a')   // ['a', 'b']   add to the front
stack.shift()        // 'a'          remove from the front

stack.pop()          // 'b'
stack.pop()          // undefined — an empty array gives undefined, not a crash`,
          },
          {
            type: 'warning',
            id: 'j-l20-w1',
            title: 'The front of an array is expensive',
            body: '`push` adds to the end, which is free. `unshift` and `shift` have to move **every remaining item** one position along to keep the indexes numbered without gaps, so they get slower the longer the array is. On a list of three it makes no difference; inside a loop over ten thousand items it is the reason the page freezes. If you are collecting items and removing them again, keep a `pop`-based stack, and reverse once at the end if you need the other order.',
          },
          {
            type: 'tip',
            id: 'j-l20-t1',
            title: 'Which end is the "front"?',
            body: 'The names come from a stack: `push` and `pop` are the two operations it has, and they work on the end. `shift` and `unshift` work on the start because they shift everything along. If you are building an undo history, `push` and `pop` are what you want. If you are modelling a queue where the oldest item leaves first, that is `shift` and `push` — correct, but be honest about the array\'s length.',
          },
          {
            type: 'heading',
            id: 'j-l20-h3',
            level: 3,
            body: 'Reading without counting',
          },
          {
            type: 'code',
            id: 'j-l20-c3',
            language: 'javascript',
            title: 'for…of, and entries() when you need the position',
            code: `const queue = ['Ada', 'Bo', 'Cy']

for (const name of queue) {
  console.log(name)
}

// entries() gives [index, value] pairs, so destructure them
for (const [i, name] of queue.entries()) {
  console.log(i + 1 + '. ' + name)
}`,
          },
          {
            type: 'text',
            id: 'j-l20-b4',
            body: 'Most loops want the value and nothing else, and `for…of` says exactly that. The classic index loop — `for (let i = 0; i < arr.length; i++)` — reaches for `arr[i]` on every pass and has three ways to be wrong at once: `i` might start at 1, the bound might be `<=`, and `arr.length` is re-read on every iteration. `entries()` is the modern replacement for the times you genuinely need the position, and destructuring pulls the two halves apart so the loop body reads as English. It works the same way on strings, where each "item" is one character.',
          },
          {
            type: 'exercise',
            id: 'j-l20-x1',
            exercise: {
              id: 'ex-js-array-queue',
              instructions:
                'Log how many people are in the queue. Then log each name with its position, on its own line, formatted like `1. Ada`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const queue = ['Ada', 'Bo', 'Cy']

// 1. Log how many people are waiting.
// 2. Log each name with its position, like "1. Ada".

`,
              },
              expectedOutput: '3\n1. Ada\n2. Bo\n3. Cy',
              tests: [
                {
                  id: 'ex-js-array-queue-t1',
                  label: 'The number of people was logged',
                  body: `return window.__log.indexOf('3') > -1
  ? true
  : 'Log queue.length first — expected a line reading 3.';`,
                },
                {
                  id: 'ex-js-array-queue-t2',
                  label: 'The first person is logged as "1. Ada"',
                  body: `return window.__log.join(' | ').indexOf('1. Ada') > -1
  ? true
  : 'Numbering starts at 1, so the first line is "1. Ada".';`,
                },
                {
                  id: 'ex-js-array-queue-t3',
                  label: 'Every name was logged, in queue order',
                  body: `var j = window.__log.join(' | ')
var a = j.indexOf('1. Ada')
var b = j.indexOf('2. Bo')
var c = j.indexOf('3. Cy')
return a > -1 && b > a && c > b ? true : 'Expected the lines "1. Ada", then "2. Bo", then "3. Cy", in that order.';`,
                },
              ],
              hints: [
                'The count is the `length` property — it needs no brackets.',
                'A `for…of` loop over the array gives you each name in order.',
                'For the position as well, use `queue.entries()` — each item is a pair, so `[i, name]` unpacks it. The first item is index 0.',
              ],
              solution: {
                javascript: `const queue = ['Ada', 'Bo', 'Cy']

console.log(queue.length)

for (const [i, name] of queue.entries()) {
  console.log(i + 1 + '. ' + name)
}`,
              },
              testNotes:
                'The checks look for exact text, so the space after the full stop and the starting number of 1 both matter. A manual index loop passes just as well as the entries() version.',
            },
          },
        ],
      },
      {
        id: 'js-l21',
        title: 'Transforming arrays',
        description:
          'map, filter, find, some, every and reduce — what each one gives back, and a decision guide for picking the right one.',
        duration: 7,
        objectives: [
          'Transform with map and select with filter, and chain them',
          'Ask a yes-or-no question with some and every, or find one item with find',
          'Fold an array into one value with reduce, and explain why forEach returns nothing',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-js-l21',
          title: 'Transforming arrays quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l21-q1',
              type: 'multiple-choice',
              prompt: 'What does `const a = [1, 2, 3]; a.forEach((n) => n * 2)` return?',
              options: [
                'A new array [2, 4, 6]',
                '[2, 4, 6], and a is left unchanged',
                'undefined — forEach runs the function for its side effects and discards the return values',
                'undefined, and a becomes [2, 4, 6]',
              ],
              answer: 2,
              explanation: 'forEach returns undefined by design: it exists for side effects like writing to the page. `map` is the one that collects the return values into a new array. If you are about to use a forEach result, you wanted a map.',
            },
            {
              id: 'quiz-js-l21-q2',
              type: 'true-false',
              prompt: '`forEach` returns a new array containing whatever the callback returned for each item.',
              answer: false,
              explanation: 'It returns undefined and throws the callback results away. The method that collects those results into a new array is `map`. Writing a forEach and then using its value is the single most common reason people reach for map instead.',
            },
            {
              id: 'quiz-js-l21-q3',
              type: 'identify-error',
              prompt: 'What is wrong with this snippet?',
              code: 'const names = [\'Ada\', \'Bo\']\nconst initials = names.forEach(function (n) {\n  return n[0]\n})\nconsole.log(initials.length)',
              options: [
                'n[0] cannot be used inside a callback',
                'forEach returns undefined, so initials.length cannot be read',
                'The callback needs to be an arrow function',
                'Nothing — this collects the first letter of each name',
              ],
              answer: 1,
              explanation: 'forEach discards every return value and gives back undefined, so reading `.length` on the result fails. `names.map((n) => n[0])` is what collects the first letter of each name, and it returns ["A", "B"].',
            },
            {
              id: 'quiz-js-l21-q4',
              type: 'blank',
              prompt: 'Which array method returns a new array holding only the items that pass the test, so the result may be shorter than the original?',
              answers: [
                'filter',
                '.filter',
                'filter()',
                'array.filter',
              ],
              explanation: '`filter` keeps the items its callback accepts and drops the rest. `map` transforms items one for one, so it always returns the same length, and `reduce` folds the array down to a single value. When the output has to be an array and its length may shrink, that is `filter`.',
            },
            {
              id: 'quiz-js-l21-q5',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const scores = [42, 91, 68]\nconsole.log(scores.some((n) => n > 80), scores.find((n) => n > 60))',
              options: [
                'true 68',
                'true 91',
                'false 91',
                'true undefined',
              ],
              answer: 1,
              explanation: '`some` asks whether at least one item passes and returns a boolean, so it reports true. `find` returns the first item that passes — 91 comes before 68 in the array, so it stops there.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l21-b1',
            body: 'A loop that builds a new array inside itself is the most common shape in beginner JavaScript, and the array methods replace every one of them. Each takes a function, calls it once per item, and hands the results back in a form suited to what you were trying to do. Once you can name which one you want, the loop disappears. Two things are true of all of them: the array you called the method on is **unchanged**, and the result is a brand-new array that shares nothing with it. That is why `map` and `filter` chain so well — each one leaves the original intact for the next, and there is never a moment where a half-finished change is sitting in your data. The exception is `sort`, which does mutate.',
          },
          {
            type: 'demo',
            id: 'j-l21-d1',
            title: 'One filter, then one map',
            body: 'Type a number and press the button. The first list is `filter` — some prices kept, the rest dropped. The second is that result run through `map`, so every kept price is doubled. Two method calls, no loop, and the original `prices` array is still the one you declared.',
            html: `<label>over <input id="min" type="number" value="10" style="width: 5rem"></label>
<button id="go">filter</button>
<p>kept: <span id="kept"></span></p>
<p>doubled: <span id="doubled"></span></p>`,
            css: `button { font: inherit; padding: 0.25rem 0.7rem; margin-left: 0.4rem; cursor: pointer; }
p { margin: 0.4rem 0 0; }`,
            javascript: `const prices = [3, 8, 15, 22, 40]

function run() {
  const min = Number(document.querySelector('#min').value)
  const kept = prices.filter(function (p) { return p > min })
  const doubled = kept.map(function (p) { return p * 2 })
  document.querySelector('#kept').textContent = kept.join(', ')
  document.querySelector('#doubled').textContent = doubled.join(', ')
}

document.querySelector('#go').onclick = run
run()`,
            height: 200,
          },
          {
            type: 'code',
            id: 'j-l21-c1',
            language: 'javascript',
            title: 'map and filter, the two you will use daily',
            code: `const prices = [3, 8, 15, 22]

prices.map((p) => p * 2)          // [6, 16, 30, 44]  same length, each item changed
prices.filter((p) => p > 10)      // [15, 22]           same or shorter, items kept or dropped
prices.map((p) => p + 1).filter((p) => p > 10)  // chain: raises the floor before selecting`,
          },
          {
            type: 'heading',
            id: 'j-l21-h1',
            level: 3,
            body: 'The return-value rule',
          },
          {
            type: 'text',
            id: 'j-l21-b2',
            body: 'This is the single fact that makes the family predictable, and it is worth learning as a rule rather than as trivia. **`map` and `filter` return a new array.** `find` returns one item or `undefined`. `findIndex` returns a number or `-1`. `some` and `every` return `true` or `false`. `reduce` returns whatever you make it return.',
          },
          {
            type: 'text',
            id: 'j-l21-b3',
            body: '`forEach` is the odd one out: it returns **`undefined`**. It runs your function on every item and then throws the results away, so it exists only for side effects — writing to the page, or adding to a sum held somewhere outside. If you are about to write `forEach` and then use its result, you wanted `map`.',
          },
          {
            type: 'code',
            id: 'j-l21-c2',
            language: 'javascript',
            title: 'The mistake forEach invites',
            code: `const names = ['Ada', 'Bo']

const doubled = names.map((n) => n + n)   // ['AdaAda', 'BoBo'] — usable
const wasted = names.forEach((n) => n + n)
wasted          // undefined — the return values were thrown away
names           // ['Ada', 'Bo'] unchanged either way`,
          },
          {
            type: 'heading',
            id: 'j-l21-h2',
            level: 3,
            body: 'Which one do you want?',
          },
          {
            type: 'list',
            id: 'j-l21-l1',
            style: 'bullet',
            items: [
              'Change every item, keep them all → `map`',
              'Keep only some items → `filter`',
              'Stop at the first item that matches → `find`, or `findIndex` when you need the position',
              'Just answer yes or no → `some` (at least one) or `every` (all of them). Both stop at the first answer, so keep their callbacks free of side effects',
              'Just ask is this in the list → `includes`, no function needed',
              'Do something to the page for each item and ignore the results → `forEach`',
              'Turn the whole array into one number → `reduce`',
            ],
          },
          {
            type: 'heading',
            id: 'j-l21-h3',
            level: 3,
            body: 'Questions rather than lists',
          },
          {
            type: 'code',
            id: 'j-l21-c3',
            language: 'javascript',
            title: 'some, every, find, findIndex, includes',
            code: `const scores = [42, 91, 68]

scores.some((n) => n > 80)     // true  — at least one is over 80
scores.every((n) => n > 50)    // false — not all of them are
scores.find((n) => n > 60)     // 68   — the first match, then it stops
scores.find((n) => n > 200)    // undefined — no match is not an error
scores.includes(91)            // true`,
          },
          {
            type: 'heading',
            id: 'j-l21-h4',
            level: 3,
            body: 'reduce, read carefully',
          },
          {
            type: 'code',
            id: 'j-l21-c4',
            language: 'javascript',
            title: 'The only one that takes a second argument',
            code: `const prices = [3, 8, 15]

// accumulator + item, starting from 0
const total = prices.reduce((sum, price) => sum + price, 0)

// best-so-far + item — the callback has to remember which one it has
const highest = prices.reduce((best, price) => {
  return price > best ? price : best
}, 0)`,
          },
          {
            type: 'warning',
            id: 'j-l21-w1',
            title: 'reduce is the easiest method to misuse',
            body: 'Four things go wrong, all of them quietly. The callback must **return** the accumulator — forgetting `return` gives you `undefined` on the second pass and `NaN` afterwards. The second argument is the **starting value**, and leaving it off means the first item becomes it, which breaks on an empty array and does something odd with strings. The first parameter is the running value and the second is the item, not the other way round. And a `reduce` that only adds up numbers is usually a `map` or a `filter` written the long way — use it when you are folding, not when you are collecting.',
          },
          {
            type: 'heading',
            id: 'j-l21-h5',
            level: 3,
            body: 'One level deeper: flat',
          },
          {
            type: 'code',
            id: 'j-l21-c5',
            language: 'javascript',
            title: 'Flattening, in one call',
            code: `const groups = [['a', 'b'], ['c'], ['d', 'e']]

groups.flat()    // ['a', 'b', 'c', 'd', 'e'] — one level is the default
groups.flat(2)   // flatten two levels deep`,
          },
          {
            type: 'example',
            id: 'j-l21-e1',
            title: 'map and filter on real data',
            body: 'Three different questions asked of the same array. Each line is one method call, and each returns something new without touching the original.',
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
            id: 'j-l21-x1',
            exercise: {
              id: 'ex-js-array-squares',
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
                  id: 'ex-js-array-squares-t1',
                  label: 'squared is an array',
                  body: `return typeof squared !== 'undefined' && Array.isArray(squared)
  ? true
  : 'Declare it as: const squared = scores.map(...)';`,
                },
                {
                  id: 'ex-js-array-squares-t2',
                  label: 'Every score was squared',
                  body: `if (typeof squared === 'undefined' || !Array.isArray(squared)) return 'Declare it as: const squared = scores.map(...)'
return JSON.stringify(squared) === JSON.stringify([1, 4, 9, 16])
  ? true
  : 'Expected [1, 4, 9, 16], got: ' + JSON.stringify(squared);`,
                },
                {
                  id: 'ex-js-array-squares-t3',
                  label: 'The original scores were not modified',
                  body: `if (typeof scores === 'undefined') return 'Keep the original scores array.'
return JSON.stringify(scores) === JSON.stringify([1, 2, 3, 4])
  ? true
  : 'map returns a new array — the original scores must stay as they were.';`,
                },
                {
                  id: 'ex-js-array-squares-t4',
                  label: 'The result was logged',
                  body: `return window.__log.length > 0 && /(^|\\D)16(\\D|$)/.test(window.__log.join(' '))
  ? true
  : 'Log the squared array with console.log(squared).';`,
                },
              ],
              hints: [
                'map takes one function, and whatever that function returns becomes an item of the new array.',
                'The function needs a parameter and a return: `(n) => n * n`.',
                'Write `const squared = scores.map((n) => n * n)` and then `console.log(squared)`.',
              ],
              solution: {
                javascript: `const scores = [1, 2, 3, 4]

const squared = scores.map(function (n) {
  return n * n
})

console.log(squared)`,
              },
              testNotes:
                'The console prints an array as indented JSON, so the last check looks for the final value rather than a comma-joined string. The other checks verify the array itself, not how you produced it.',
            },
          },
        ],
      },
    ],
  },

  /* ---------------------------------- js-s15 --------------------------------- */
  {
    id: 'js-s15',
    title: 'Array sort and iteration',
    description:
      'The one array method that changes the array you gave it, the comparator that makes it correct, and how to sort without mutating.',
    lessons: [
      {
        id: 'js-l22',
        title: 'Sorting and immutability',
        description:
          'Why sort reorders the array you gave it, why its default comparison quietly ruins numbers, and how to sort without mutating.',
        duration: 5,
        objectives: [
          'Explain that sort changes the array it is called on, and that const does not prevent that',
          'Explain why the default comparison breaks numbers, and write a comparator as (a, b) => a - b',
          'Sort without mutating using a spread copy or toSorted',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l22',
          title: 'Sorting and immutability quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l22-q1',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const points = [40, 100, 1, 25, 10]\nconsole.log(points.sort().join(\',\'))',
              options: [
                '1,10,25,40,100',
                '1,10,100,25,40',
                '1,10,25,100,40',
                '1,25,10,40,100',
              ],
              answer: 1,
              explanation: 'Without a comparator, sort compares the values as strings. "2" comes before "4", so 25 lands before 40. Adding the comparator `(a, b) => a - b` gives 1, 10, 25, 40, 100.',
            },
            {
              id: 'quiz-js-l22-q2',
              type: 'true-false',
              prompt: '`sort()` returns a new sorted array and leaves the original in its original order.',
              answer: false,
              explanation: 'sort reorders the array it is called on, in place, and returns that same array. To keep the original intact, sort a copy: `[...points].sort((a, b) => a - b)`, or use `toSorted` where it is available.',
            },
            {
              id: 'quiz-js-l22-q3',
              type: 'multiple-choice',
              prompt: 'A comparator passed to `sort` must return what?',
              options: [
                'true if a should come first, false otherwise',
                '-1, 0 or 1',
                'A negative number, zero, or a positive number',
                'The two items, in the order you want them',
              ],
              answer: 2,
              explanation: 'The contract is only about sign: negative puts a first, positive puts b first, zero means equal as far as ordering goes. sort works out the sequence itself. `a - b` happens to give exactly that for numbers, which is why it is the form you see everywhere.',
            },
            {
              id: 'quiz-js-l22-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this snippet?',
              code: 'const scores = [38, 72, 45, 91]\nconst top = scores.sort(function (a, b) { return b.score - a.score })\nconsole.log(scores[0])',
              options: [
                'The comparator is written backwards — it should be a - b',
                'The items are numbers, so there is nothing to compare and a comparator cannot work',
                'The comparator should compare a.length - b.length',
                'Nothing is wrong — this sorts the numbers from highest to lowest',
              ],
              answer: 1,
              explanation: 'The comparator reads a `.score` property that plain numbers do not have, so `a.score - b.score` is NaN. NaN is not meaningfully negative, zero or positive, so the resulting order is undefined. Compare numbers with `a - b`; compare objects by the property you care about, `a.age - b.age`.',
            },
            {
              id: 'quiz-js-l22-q5',
              type: 'blank',
              prompt: 'Fill in the comparator that sorts numbers from lowest to highest.',
              code: 'const n = [40, 1, 25]\nn.sort((a, b) => ___)',
              answers: [
                'a - b',
                'a-b',
                'a  -  b',
              ],
              explanation: 'Subtracting the two values produces a negative number when a is smaller, zero when they are equal, and a positive number when a is larger — exactly the contract sort expects. Swapping to `b - a` gives the descending order instead.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l22-b1',
            body: 'Almost every array method returns something new and leaves the original alone. `sort` is the exception, and it is worth knowing exactly how it differs because the difference is invisible in the code and obvious in the result. **`sort` reorders the array you call it on, in place, and returns that same array** — not a copy.',
          },
          {
            type: 'demo',
            id: 'j-l22-d1',
            title: 'Sort the copy, or the original changes too',
            body: 'The top line is the array as it was declared, and it never changes. The button builds a new array with a spread, sorts that, and shows the result. Change the line to `points.sort(...)` and watch the top line move too — that is the mutation this section is about.',
            html: `<p>original: <span id="a"></span></p>
<p>ranked: <span id="b">—</span></p>
<button id="go">sort a copy</button>`,
            css: `button { font: inherit; padding: 0.25rem 0.7rem; margin-top: 0.5rem; cursor: pointer; }
p { margin: 0.3rem 0 0; }
span { font-family: ui-monospace, monospace; }`,
            javascript: `const points = [40, 100, 1, 25, 10]

document.querySelector('#a').textContent = points.join(', ')

document.querySelector('#go').onclick = function () {
  const ranked = [...points].sort(function (a, b) {
    return a - b
  })
  document.querySelector('#b').textContent = ranked.join(', ')
}`,
            height: 180,
          },
          {
            type: 'code',
            id: 'j-l22-c1',
            language: 'javascript',
            title: 'sort changes its argument',
            code: `const fruits = ['Banana', 'Orange', 'Apple']

const sorted = fruits.sort()
sorted === fruits        // true — the same array, not a copy
fruits                  // ['Apple', 'Banana', 'Orange'] — the original is reordered`,
          },
          {
            type: 'heading',
            id: 'j-l22-h1',
            level: 3,
            body: 'The default comparison is alphabetical',
          },
          {
            type: 'code',
            id: 'j-l22-c2',
            language: 'javascript',
            title: 'Numbers sorted as text',
            code: `const points = [40, 100, 1, 25, 10]

points.sort()   // [1, 10, 100, 25, 40]  ← wrong: with no comparator, values are
                                  //  compared as strings, and '2' comes before '4'`,
          },
          {
            type: 'warning',
            id: 'j-l22-w1',
            title: 'No error, no warning, just a wrong order',
            body: 'Called without a comparator, `sort` converts each value to a string and compares those alphabetically. For numbers that is simply incorrect — `25` before `40` because `"2"` precedes `"4"`. Nothing tells you: the array is still a valid array of valid numbers, the console is clean, and the bug shows up as a ranking that looks plausible until someone checks the tenth place. The moment an array of numbers needs sorting, pass a comparator. Every time.',
          },
          {
            type: 'heading',
            id: 'j-l22-h2',
            level: 3,
            body: 'The comparator',
          },
          {
            type: 'text',
            id: 'j-l22-b2',
            body: 'A comparator is a function that takes two items and returns a **negative number, zero, or a positive number**. That is the whole contract: negative means `a` should come before `b`, positive means `b` first, zero means equal as far as ordering goes. `sort` works out the rest itself. You never write the loop and never decide the order — you only answer "which of these two goes first?".',
          },
          {
            type: 'code',
            id: 'j-l22-c3',
            language: 'javascript',
            title: 'Compare by subtraction, then by whatever you like',
            code: `const points = [40, 100, 1, 25, 10]

const ascending = [...points].sort((a, b) => a - b)   // [1, 10, 25, 40, 100]
const descending = [...points].sort((a, b) => b - a)  // [100, 40, 25, 10, 1]

people.sort((a, b) => a.age - b.age)      // objects: compare the property you care about

const names = ['Robin', 'ada', 'Bo']
names.sort((a, b) => a.localeCompare(b))  // names need a real comparison, not subtraction`,
          },
          {
            type: 'heading',
            id: 'j-l22-h3',
            level: 3,
            body: 'Sorting without mutating',
          },
          {
            type: 'code',
            id: 'j-l22-c4',
            language: 'javascript',
            title: 'Two ways to keep the original',
            code: `const scores = [40, 100, 1, 25, 10]

// 1. copy first with spread, then sort the copy — scores is untouched
const ranked = [...scores].sort((a, b) => a - b)

// 2. toSorted returns a new array, where it is available
const modern = scores.toSorted((a, b) => a - b)`,
          },
          {
            type: 'tip',
            id: 'j-l22-t1',
            title: 'const does not protect an array\'s contents',
            body: 'The `[...array].sort()` line pays for itself, because it makes the intent explicit where it would otherwise be invisible. `scores.sort()` looks like it produces a new sorted list; it does not, and a sort that reorders the array the rest of your code is iterating over is a genuinely confusing bug to find later. And `const` is no help at all: `const scores = [1, 2, 3]` stops the *name* `scores` from being pointed somewhere else, but does nothing about `scores.push(4)`, `scores[0] = 9`, or `scores.sort()`. To keep contents safe you have to do it deliberately — freeze the array with `Object.freeze(scores)`, which turns every mutation into a thrown error, or take a copy first and sort the copy. Freezing suits values you know nobody should ever change, like a lookup table; it is not a default.',
          },
          {
            type: 'exercise',
            id: 'j-l22-x1',
            exercise: {
              id: 'ex-js-array-rank',
              instructions:
                'Sort the scores from lowest to highest into a **new** array called `ranked`, and log it. The original `scores` array must come out of this unchanged — so build a copy before you sort.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const scores = [72, 45, 91, 38, 60]

// Sort a copy of scores from lowest to highest into ranked, then log it.

`,
              },
              expectedOutput: '38,45,60,72,91',
              tests: [
                {
                  id: 'ex-js-array-rank-t1',
                  label: 'ranked is an array in ascending order',
                  body: `if (typeof ranked === 'undefined' || !Array.isArray(ranked)) return 'Declare it as: const ranked = ...'
return JSON.stringify(ranked) === JSON.stringify([38, 45, 60, 72, 91])
  ? true
  : 'Expected [38, 45, 60, 72, 91], got: ' + JSON.stringify(ranked) + ' — a plain sort() compares numbers as text.';`,
                },
                {
                  id: 'ex-js-array-rank-t2',
                  label: 'The original scores array was not reordered',
                  body: `if (typeof scores === 'undefined') return 'Keep the original scores array.'
return JSON.stringify(scores) === JSON.stringify([72, 45, 91, 38, 60])
  ? true
  : 'sort() changes the array it is called on — sort a copy instead.';`,
                },
                {
                  id: 'ex-js-array-rank-t3',
                  label: 'The ranked scores were logged',
                  body: `return window.__log.length > 0 && /(^|\\D)91(\\D|$)/.test(window.__log.join(' '))
  ? true
  : 'Log the result with console.log(ranked).';`,
                },
              ],
              hints: [
                'Copy the array first: `[...scores]` makes a new array with the same items.',
                'Then sort that copy, giving the comparator `(a, b) => a - b` so it compares numbers as numbers.',
                '`const ranked = [...scores].sort((a, b) => a - b)` does the whole thing in one line.',
              ],
              solution: {
                javascript: `const scores = [72, 45, 91, 38, 60]

const ranked = [...scores].sort(function (a, b) {
  return a - b
})

console.log(ranked)`,
              },
              testNotes:
                'A version using slice() instead of spread passes identically. The second check is the one that catches the common mistake of sorting the original array in place.',
            },
          },
        ],
      },
    ],
  },

  /* ---------------------------------- js-s16 --------------------------------- */
  {
    id: 'js-s16',
    title: 'Dates',
    description:
      'What a Date actually stores, the two ways to build one you can trust, and why the string form is where most date bugs are born.',
    lessons: [
      {
        id: 'js-l23',
        title: 'Dates and time',
        description:
          'Dates as a count of milliseconds, building one from numbers instead of a string, and local time versus UTC.',
        duration: 6,
        objectives: [
          'Explain that a Date stores one number — milliseconds since 1970 — and nothing else',
          'Build a Date from numeric parts and avoid the string-parsing trap',
          'Read the same moment in local time and in UTC, and say when the two disagree',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l23',
          title: 'Dates and time quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l23-q1',
              type: 'multiple-choice',
              prompt: 'What does a Date object actually store?',
              options: [
                'A year, a month, a day, an hour, a minute and a second, as six separate fields',
                'A single number: the milliseconds elapsed since 1 January 1970, midnight UTC',
                'A formatted string such as "2026-03-09T14:05:00.000Z"',
                'A reference to the moment the object was created, so it updates like a clock',
              ],
              answer: 1,
              explanation: 'Everything you read off a Date — getFullYear, getMonth, getHours — is calculated from that one number. That is why two Dates can be subtracted directly, and why a Date is a fixed instant rather than a running clock: it does not tick, and the demo has to re-create it to keep moving.',
            },
            {
              id: 'quiz-js-l23-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const a = new Date(2026, 0, 15)\nconsole.log(a.getMonth())',
              options: [
                '1',
                '0',
                'January',
                '15',
              ],
              answer: 1,
              explanation: 'Months are 0-based when you construct and read them, so January is 0 and December is 11. Only `getFullYear` and `getDate` count the way you expect. The offset appears because months were once indexed from an array, and the array starts at zero.',
            },
            {
              id: 'quiz-js-l23-q3',
              type: 'true-false',
              prompt: '`new Date(\'2026-01-15\')` and `new Date(\'15/01/2026\')` reliably mean the same instant on every machine.',
              answer: false,
              explanation: 'The YYYY-MM-DD form is read as UTC midnight, while day-first forms are read as local midnight. In any timezone behind UTC those land on different days, and the day-first form is an engine detail rather than part of the specification. Build from numbers when the exact instant matters.',
            },
            {
              id: 'quiz-js-l23-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'const sale = new Date(\'2026-02-30\')\nconsole.log(sale.getMonth(), sale.getDate())',
              options: [
                'getMonth cannot be called on a Date',
                'The impossible date is silently rolled over, so this is 1 March, not 30 February',
                'Dates must be created with the new keyword or they do not exist',
                'The format is wrong — it must be written as 30/02/2026',
              ],
              answer: 1,
              explanation: 'A Date has no way to be the thirtieth of February, so the constructor normalises it to 1 March. No error, no warning, and a log line that looks like a perfectly ordinary date. If the input can be wrong, validate the day against the month before constructing the Date.',
            },
            {
              id: 'quiz-js-l23-q5',
              type: 'blank',
              prompt: 'Which method returns the number of milliseconds since 1 January 1970, with no Date object involved?',
              answers: [
                'Date.now()',
                'Date.now',
                'date.now()',
                'Date.now()()',
              ],
              explanation: '`Date.now()` gives the epoch milliseconds directly, which is cheaper than building a Date and reading getTime(). It is also how you time a piece of code: read it before and after, and subtract.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l23-b1',
            body: 'A `Date` looks like a calendar and behaves like a counter. Underneath there is a single number: the milliseconds that have passed since 1 January 1970, midnight UTC, known as the epoch. The year, month, day and hour you see are a rendering of that number, calculated in whichever timezone the machine is in. This is why `new Date()` is a real instant rather than a vague "now", and why two Dates can be subtracted like any other numbers.',
          },
          {
            type: 'demo',
            id: 'j-l23-d1',
            title: 'One fixed instant, and a clock that keeps moving',
            body: 'The second line is a fixed Date, built from a string, and it will read the same tomorrow. The first is `new Date()` with no arguments, which means the moment the line runs — and the clock keeps re-reading it, which is exactly how a live clock is built.',
            html: `<p id="now">right now: …</p>
<p id="fixed">fixed date: …</p>
<p id="stamp">epoch milliseconds: …</p>`,
            css: `p { margin: 0.35rem 0 0; font-family: ui-monospace, monospace; font-size: 13px; }`,
            javascript: `const fixed = new Date('2026-03-01T12:00:00')
document.querySelector('#fixed').textContent = 'fixed date: ' + fixed.toDateString()

function tick() {
  const now = new Date()
  document.querySelector('#now').textContent = 'right now: ' + now.toLocaleTimeString()
  document.querySelector('#stamp').textContent = 'epoch milliseconds: ' + now.getTime()
}

tick()
setInterval(tick, 1000)`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'j-l23-h1',
            level: 3,
            body: 'A Date is a number wearing a costume',
          },
          {
            type: 'code',
            id: 'j-l23-c1',
            language: 'javascript',
            title: 'The counter underneath',
            code: `const now = new Date()
now.getTime()      // 1750000000000 — milliseconds since 1 Jan 1970

new Date(0).toISOString()   // '1970-01-01T00:00:00.000Z' — the epoch itself

const day = 86400000         // milliseconds in a day
new Date(now.getTime() + day)  // the same time tomorrow, not 24 hours from now on a
                              //  daylight-saving boundary`,
          },
          {
            type: 'text',
            id: 'j-l23-b2',
            body: 'Arithmetic on Dates is arithmetic on those milliseconds, which is the useful part and also the trap. `tomorrow` is the same moment plus 86,400,000, and the difference between two Dates divided by 86,400,000 is a number of days. The trap is that a day is not always 86,400,000 milliseconds long: on the day a country changes its clocks, one of them is 23 hours and another is 25. If a day length matters to your answer, add `setDate(d.getDate() + 1)` instead of adding milliseconds.',
          },
          {
            type: 'heading',
            id: 'j-l23-h2',
            level: 3,
            body: 'Two ways to build one',
          },
          {
            type: 'code',
            id: 'j-l23-c2',
            language: 'javascript',
            title: 'From numbers, or from a string',
            code: `// from parts — the month is 0-based, so January is 0
new Date(2026, 0, 15)          // 15 January 2026, at local midnight
new Date(2026, 0, 15, 9, 30)   // and at 09:30 local

// from a string — the shape decides how it is read
new Date('2026-01-15')         // 15 Jan 2026 at 00:00 UTC
new Date('15/01/2026')         // V8 accepts it, but the spec does not require it`,
          },
          {
            type: 'warning',
            id: 'j-l23-w1',
            title: 'String dates are the most reliable way to ship a date bug',
            body: '`new Date(\'2026-01-15\')` is read as **UTC** midnight, while `new Date(\'15/01/2026\')` is read as **local** midnight. In any timezone behind UTC that is the previous day, and the date on screen is wrong before any logic of yours has run. The format is not standardised either: the day-first form is an implementation detail of one engine, and an impossible date such as `\'2026-02-30\'` does not error — it quietly rolls over to 2 March. Build Dates from numbers, `new Date(2026, 1, 30)`, and if you must accept text from a user, check the shape with a regular expression before you hand it to `Date`.',
          },
          {
            type: 'heading',
            id: 'j-l23-h3',
            level: 3,
            body: 'Local time, UTC, and the offset between them',
          },
          {
            type: 'code',
            id: 'j-l23-c3',
            language: 'javascript',
            title: 'One moment, three ways to print it',
            code: `const d = new Date(2026, 0, 15, 12, 0)

d.getHours()           // 12 — noon where this machine is
d.getTimezoneOffset()  // -60 in UTC+1: local time minus UTC, in minutes
d.toISOString()        // '2026-01-15T11:00:00.000Z' — always UTC, always a string
d.toLocaleString()     // '15/01/2026, 12:00:00' — written for the reader's locale`,
          },
          {
            type: 'text',
            id: 'j-l23-b3',
            body: 'The offset is worth remembering because its sign is the opposite of what people expect. `getTimezoneOffset` answers "how many minutes is my clock **behind** UTC", so a zone one hour ahead of UTC returns `-60`. Send a Date to a server or store it anywhere else and use `toISOString` or the underlying milliseconds, never `toLocaleString` — a formatted string has no timezone in it and cannot be read back reliably. Use `toLocaleString` only when a person is looking at it.',
          },
          {
            type: 'tip',
            id: 'j-l23-t1',
            title: 'new Date() with an argument is never what you expect',
            body: '`new Date()` means now. `new Date(1750000000000)` takes that number as epoch milliseconds, so a large number like `new Date(2026, 0, 15)` is not one call at all — it is the multi-argument form, and the brackets are how the arguments get separated. When you only want the number, `Date.now()` gives it without building the object. A single subtraction between `Date.now()` before and after some work is also how you time a piece of code.',
          },
          {
            type: 'exercise',
            id: 'j-l23-x1',
            exercise: {
              id: 'ex-js-date-gap',
              instructions:
                'Write `daysBetween(a, b)`. It takes two date strings in the form `YYYY-MM-DD` and returns the number of **whole days** from the first to the second. `daysBetween(\'2026-02-01\', \'2026-03-01\')` is 28, and reversing the arguments gives -28. Two times on the same day give 0.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Returns the whole days from date a to date b, as a number.

function daysBetween(a, b) {
  return 0
}

console.log(daysBetween('2026-02-01', '2026-03-01'))
`,
              },
              expectedOutput: '28',
              tests: [
                {
                  id: 'ex-js-date-gap-t1',
                  label: 'daysBetween is a function',
                  body: `return typeof daysBetween === 'function' ? true : 'Define a function called daysBetween.';`,
                },
                {
                  id: 'ex-js-date-gap-t2',
                  label: 'February to March 2026 is 28 days',
                  body: `if (typeof daysBetween !== 'function') return 'Define a function called daysBetween.'
var got = daysBetween('2026-02-01', '2026-03-01')
return got === 28 ? true : 'Expected 28, got: ' + got;`,
                },
                {
                  id: 'ex-js-date-gap-t3',
                  label: 'The order of the arguments changes the sign',
                  body: `if (typeof daysBetween !== 'function') return 'Define a function called daysBetween.'
var got = daysBetween('2026-03-01', '2026-02-01')
return got === -28 ? true : 'Expected -28 when the dates are swapped, got: ' + got;`,
                },
                {
                  id: 'ex-js-date-gap-t4',
                  label: 'Twelve hours apart is zero whole days, not one',
                  body: `if (typeof daysBetween !== 'function') return 'Define a function called daysBetween.'
var got = daysBetween('2026-05-10T08:00:00', '2026-05-10T20:00:00')
return got === 0 ? true : 'Expected 0 — round the result rather than truncating it, got: ' + got;`,
                },
              ],
              hints: [
                'Turn each string into a Date, then read the number out of it with `getTime()`.',
                'Subtract the two numbers and divide by 86400000, the number of milliseconds in a day.',
                '`Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000)` is the whole function — Math.round, not Math.floor, so half a day is 0 rather than -1.',
              ],
              solution: {
                javascript: `function daysBetween(a, b) {
  const ms = new Date(b).getTime() - new Date(a).getTime()
  return Math.round(ms / 86400000)
}

console.log(daysBetween('2026-02-01', '2026-03-01'))`,
              },
              testNotes:
                'The arguments are real Date strings, so the checks are deterministic — no clock reading is involved. The last check is the one that catches a Math.floor, which turns a 12-hour gap into -1 instead of 0.',
            },
          },
        ],
      },
    ],
  },

  /* ---------------------------------- js-s17 --------------------------------- */
  {
    id: 'js-s17',
    title: 'Date methods',
    description:
      'The getters that pull a Date apart into numbers, the setters that put it back together, and the UTC twins you need when a server is involved.',
    lessons: [
      {
        id: 'js-l24',
        title: 'Getting and setting date parts',
        description:
          'Pulling a Date apart with getFullYear and friends, changing it with setMonth, and knowing which getters give you UTC instead of local time.',
        duration: 6,
        objectives: [
          'Pull a Date apart with the get… methods, including the 0-based month and the 0-based weekday',
          'Change a Date in place with the set… methods, and predict what an out-of-range part does',
          'Choose between the local getters and the getUTC… getters, and read getTimezoneOffset correctly',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l24',
          title: 'Getting and setting date parts quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l24-q1',
              type: 'multiple-choice',
              prompt: 'What does `new Date(2026, 0, 15).getMonth()` return, and what is that month?',
              options: [
                '0 — January',
                '1 — January',
                '0 — February',
                '15 — March',
              ],
              answer: 0,
              explanation: 'Months are numbered 0 to 11, so 0 is January and 11 is December. The same convention applies to `setMonth`, so the number you read is the number you write — the +1 conversion only belongs in display code.',
            },
            {
              id: 'quiz-js-l24-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const d = new Date(2026, 2, 9, 14, 5)\nd.setMonth(12)\nconsole.log(d.getMonth(), d.getDate())',
              options: [
                '12 9',
                '0 9',
                '1 9',
                '11 9',
              ],
              answer: 1,
              explanation: 'Setters roll over rather than refuse: month 12 is January of the following year, and getMonth reports it as 0. The day of the month survives, because only the month was changed. This is the behaviour to remember before using setMonth to hold "the last day of a month".',
            },
            {
              id: 'quiz-js-l24-q3',
              type: 'true-false',
              prompt: '`getDate()` returns the day of the week, and `getDay()` returns the day of the month.',
              answer: false,
              explanation: 'It is the other way round. `getDate` is the day of the month, `getDay` is the day of the week numbered 0 to 6 with Sunday first. Pairing getDay with a names array means that array has to start with Sunday, or every label is a day out.',
            },
            {
              id: 'quiz-js-l24-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'function label(d) {\n  const days = [\'Mon\', \'Tue\', \'Wed\', \'Thu\', \'Fri\', \'Sat\', \'Sun\']\n  return days[d.getDay()]\n}',
              options: [
                'getDay cannot be used inside a function',
                'The names array starts at Monday but getDay counts Sunday as 0, so every label is a day out',
                'days[d.getDay()] returns undefined because the index is a string',
                'getDay only works on a Date created from a string',
              ],
              answer: 1,
              explanation: '`getDay` is 0 for Sunday, so the array must be ["Sun", "Mon", …]. A one-day shift is the exact failure this causes, and it is easy to miss because every label is still a real weekday.',
            },
            {
              id: 'quiz-js-l24-q5',
              type: 'blank',
              prompt: 'Fill in the method that tells you how many minutes this machine\'s clock is behind UTC.',
              answers: [
                'getTimezoneOffset',
                '.getTimezoneOffset()',
                'gettimezoneoffset',
                'getTimezoneOffset()',
              ],
              explanation: '`getTimezoneOffset()` returns local time minus UTC in minutes, so UTC+1 gives -60. The sign is the part people get wrong: the answer is how far *behind* UTC you are, not your offset from it.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l24-b1',
            body: 'The Date object is deliberately dull. It gives you no formatting, no arithmetic and no calendar helpers — just a row of `get` methods that return plain numbers, and a matching row of `set` methods that change the object in place. Every date display in every application is built out of those numbers, and the whole vocabulary fits on one screen. The two that surprise people are `getMonth` and `getDay`, because both count from zero, and they count different things.',
          },
          {
            type: 'demo',
            id: 'j-l24-d1',
            title: 'A clock assembled from four getters',
            body: 'Nothing formats this. The hours, minutes and seconds are read separately with `getHours`, `getMinutes` and `getSeconds`, padded to two characters by a small helper, and glued together. The weekday comes from `getDay`, which is 0 for Sunday — so the names array has to start there.',
            html: `<p id="clock">--:--:--</p>
<p id="day">…</p>`,
            css: `p { margin: 0.35rem 0 0; font-family: ui-monospace, monospace; font-size: 14px; }`,
            javascript: `const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function two(n) {
  return n < 10 ? '0' + n : String(n)
}

function tick() {
  const d = new Date()
  document.querySelector('#clock').textContent =
    two(d.getHours()) + ':' + two(d.getMinutes()) + ':' + two(d.getSeconds())
  document.querySelector('#day').textContent = 'getDay() is ' + d.getDay() + ' — ' + days[d.getDay()]
}

tick()
setInterval(tick, 1000)`,
            height: 140,
          },
          {
            type: 'heading',
            id: 'j-l24-h1',
            level: 3,
            body: 'The getters',
          },
          {
            type: 'code',
            id: 'j-l24-c1',
            language: 'javascript',
            title: 'Every getter returns a number',
            code: `const d = new Date(2026, 2, 9, 14, 5, 30)

d.getFullYear()      // 2026
d.getMonth()         // 2     — March, because January is 0
d.getDate()          // 9     — the day of the month
d.getDay()           // 1     — Monday, because Sunday is 0
d.getHours()         // 14
d.getMinutes()       // 5
d.getSeconds()       // 30
d.getMilliseconds()  // 0`,
          },
          {
            type: 'text',
            id: 'j-l24-b2',
            body: '`getDate` is the day of the month; `getDay` is the day of the week. Reading them the other way round is the single most common mistake with these two, and it produces a number that looks plausible — `getDay()` returning 9 is impossible, so a formatted date saying "day 9" is the clue that the wrong one was used. Pair `getDay` with an array of weekday names, and remember the array has to start at Sunday, or every label is one day out.',
          },
          {
            type: 'warning',
            id: 'j-l24-w1',
            title: 'The month is 0-based everywhere, including the setters',
            body: '`getMonth` returns 0 to 11 and `setMonth` takes 0 to 11, so `d.setMonth(2)` is March. It is consistent, which is the only reason it is survivable, and it means the arithmetic `month + 1` is needed on the way out and never on the way in. Store months in your own code as 1 to 12 if people read them, and do the conversion in one place.',
          },
          {
            type: 'heading',
            id: 'j-l24-h2',
            level: 3,
            body: 'The setters change the object in place',
          },
          {
            type: 'code',
            id: 'j-l24-c2',
            language: 'javascript',
            title: 'setFullYear, setMonth, setHours',
            code: `const d = new Date(2026, 0, 31)

d.setFullYear(2027)   // 31 Jan 2027 — the other parts are kept
d.setMonth(11)        // 31 Dec 2026 → 31 Dec 2027, month 11 is December
d.setHours(9)         // the time becomes 09:00, minutes and seconds stay

d.setDate(d.getDate() + 1)   // add a day without assuming 86400000 milliseconds
d.setTime(0)                 // back to the epoch, if you really want to`,
          },
          {
            type: 'text',
            id: 'j-l24-b3',
            body: 'Setters return the new timestamp, and — this is the part worth knowing — they **roll over rather than refuse**. `setMonth(13)` on a date in January gives February of the next year, and setting the 31st of a month onto a month with 30 days lands on the 1st of the one after. That is arithmetic behaving as arithmetic. It is also why `setMonth` on "the last day of the month" quietly moves the date rather than keeping the intent.',
          },
          {
            type: 'heading',
            id: 'j-l24-h3',
            level: 3,
            body: 'The UTC twins',
          },
          {
            type: 'code',
            id: 'j-l24-c3',
            language: 'javascript',
            title: 'Same moment, two sets of getters',
            code: `const d = new Date(2026, 0, 15, 12, 0)  // local noon, somewhere in UTC+1

d.getHours()            // 12
d.getUTCFullYear()      // 2026
d.getUTCHours()         // 11 — the same instant, in UTC
d.getTimezoneOffset()   // -60 — local minus UTC, in minutes`,
          },
          {
            type: 'tip',
            id: 'j-l24-t1',
            title: 'Sign of getTimezoneOffset',
            body: 'The method answers "how many minutes is my clock **behind** UTC", so UTC+1 returns -60 and UTC-5 returns +300. A user in London in January is on UTC+0 and gets 0; the same user in July gets -60, because summer time moved the offset and not the clock. If you want a readable offset, divide it by 60 and negate it.',
          },
          {
            type: 'exercise',
            id: 'j-l24-x1',
            exercise: {
              id: 'ex-js-date-parts',
              instructions:
                'Write `formatDate(date)` so it returns the date part of a Date as `YYYY-MM-DD`, for example `2026-03-09`. Month and day must always be two digits, and January must come out as month `01`, not `00` or `1`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const stamp = new Date('2026-03-09T14:05:00')

// Return the date part as YYYY-MM-DD, e.g. 2026-03-09

function formatDate(date) {
  return ''
}

console.log(formatDate(stamp))
`,
              },
              expectedOutput: '2026-03-09',
              tests: [
                {
                  id: 'ex-js-date-parts-t1',
                  label: 'formatDate is a function',
                  body: `return typeof formatDate === 'function' ? true : 'Define a function called formatDate.';`,
                },
                {
                  id: 'ex-js-date-parts-t2',
                  label: 'It formats the given stamp correctly',
                  body: `if (typeof formatDate !== 'function') return 'Define a function called formatDate.'
var got = formatDate(stamp)
return got === '2026-03-09' ? true : 'Expected the string 2026-03-09, got: ' + JSON.stringify(got);`,
                },
                {
                  id: 'ex-js-date-parts-t3',
                  label: 'Single digits are padded to two',
                  body: `if (typeof formatDate !== 'function') return 'Define a function called formatDate.'
var got = formatDate(new Date(2026, 0, 5))
return got === '2026-01-05' ? true : 'Expected 2026-01-05 — month and day need a leading zero.';`,
                },
                {
                  id: 'ex-js-date-parts-t4',
                  label: 'December is month 12, not 11 or 00',
                  body: `if (typeof formatDate !== 'function') return 'Define a function called formatDate.'
var got = formatDate(new Date(2026, 11, 25))
return got === '2026-12-25' ? true : 'Expected 2026-12-25 — getMonth is 0-based, so add 1.';`,
                },
              ],
              hints: [
                'Everything you need is on the Date: getFullYear, getMonth and getDate.',
                'getMonth returns 0 for January, so add one to it — and pad any number below 10 with a leading zero.',
                'A small helper is the tidy way: `function two(n) { return n < 10 ? "0" + n : String(n) }`, then join the three parts with hyphens.',
              ],
              solution: {
                javascript: `function two(n) {
  return n < 10 ? '0' + n : String(n)
}

function formatDate(date) {
  return date.getFullYear() + '-' + two(date.getMonth() + 1) + '-' + two(date.getDate())
}

console.log(formatDate(new Date('2026-03-09T14:05:00')))`,
              },
              testNotes:
                'The Date objects in the checks are constructed with numeric arguments, which is local time, so the expected strings are the same in every timezone. Any approach that reads the three parts works — only the padding and the 0-based month have to be right.',
            },
          },
        ],
      },
    ],
  },

  /* ---------------------------------- js-s18 --------------------------------- */
  {
    id: 'js-s18',
    title: 'Math',
    description:
      'The static functions you reach for every day: rounding, powers and roots, and taking the largest or smallest value out of a list.',
    lessons: [
      {
        id: 'js-l25',
        title: 'Math',
        description:
          'Math as a box of functions rather than something you construct: rounding, sign, powers, roots, and min and max over a list.',
        duration: 5,
        objectives: [
          'Choose between round, floor, ceil and trunc, especially for negative numbers',
          'Use pow, sqrt and the logarithms, and recognise when they hand back NaN or Infinity',
          'Take min, max and an average out of a list of any length',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l25',
          title: 'Math quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l25-q1',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'console.log(Math.floor(-4.2), Math.trunc(-4.2))',
              options: [
                '-4 -4',
                '-5 -4',
                '-4 -5',
                '-5 -5',
              ],
              answer: 1,
              explanation: '`floor` moves toward negative infinity, so -4.2 becomes -5. `trunc` throws the fraction away and keeps the sign, giving -4. On positive numbers the two are identical, which is exactly why the difference goes unnoticed until a negative value appears.',
            },
            {
              id: 'quiz-js-l25-q2',
              type: 'multiple-choice',
              prompt: 'What does `Math.sqrt(-1)` give back?',
              options: [
                'It throws a RangeError, because a negative number has no square root',
                'NaN, with no error and no warning',
                '0, because the square root of nothing is nothing',
                '-1',
              ],
              answer: 1,
              explanation: 'Math answers out-of-domain questions with NaN rather than throwing, so the failure appears later as a display reading NaN or a total that is not a number. A negative argument is usually a sign error upstream, and Math.abs before the call is often the real fix.',
            },
            {
              id: 'quiz-js-l25-q3',
              type: 'true-false',
              prompt: '`Math.max(someArray)` returns the largest number in the array.',
              answer: false,
              explanation: 'Math.max only takes numbers, so an array argument gives NaN. The array has to be spread into the call: `Math.max(...someArray)`. And for a very long array the spread can exceed the argument limit, which is when a reduce is the safer tool.',
            },
            {
              id: 'quiz-js-l25-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'const page = current / perPage\nconst lastPage = Math.floor(page + 1)',
              options: [
                'Math.floor does not accept a second argument',
                'Adding 1 before flooring inflates the result — a page count is already whole, so floor it on its own',
                'page counts cannot be computed with division',
                'Nothing — this is the correct way to count pages',
              ],
              answer: 1,
              explanation: 'If the division is exact, 10 becomes 11. The usual reason to reach for floor is the opposite situation: a ratio that must not round up. If you want to round a fraction up to the next whole page, that is Math.ceil(page) and nothing added.',
            },
            {
              id: 'quiz-js-l25-q5',
              type: 'blank',
              prompt: 'Which Math function gives the distance of a number from zero, so the sign disappears?',
              answers: [
                'Math.abs',
                'abs',
                'Math.abs()',
                'math.abs',
              ],
              explanation: '`Math.abs(-4.7)` is 4.7. It is the function you want whenever a value may be either direction — a difference, a delta, an offset — because squaring or negating it by hand is where sign errors creep in.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l25-b1',
            body: '`Math` is an object holding a few dozen functions, and that is the whole idea. There is no `new Math()` and nothing to configure — you call the ones you need. The functions are the numerical work that would otherwise be three lines of your own every time: rounding a decimal, taking an absolute value, finding the square root. Learn the small set you actually use and treat the rest as lookup.',
          },
          {
            type: 'demo',
            id: 'j-l25-d1',
            title: 'min, max and an average, over a list',
            body: 'Four prices go in. `Math.min` and `Math.max` take any number of values, which is why they appear as `Math.max(...prices)` once a list is involved. The average is a `reduce` and a division — Math has no `average` function, and it cannot, because it does not know the length of your array.',
            html: `<p>min: <span id="lo"></span></p>
<p>max: <span id="hi"></span></p>
<p>average: <span id="avg"></span></p>`,
            css: `p { margin: 0.35rem 0 0; font-family: ui-monospace, monospace; font-size: 14px; }`,
            javascript: `const prices = [3, 8, 15, 22, 40]

const total = prices.reduce(function (a, b) { return a + b }, 0)

document.querySelector('#lo').textContent = Math.min(...prices)
document.querySelector('#hi').textContent = Math.max(...prices)
document.querySelector('#avg').textContent = (total / prices.length).toFixed(2)`,
            height: 130,
          },
          {
            type: 'heading',
            id: 'j-l25-h1',
            level: 3,
            body: 'Rounding four ways',
          },
          {
            type: 'code',
            id: 'j-l25-c1',
            language: 'javascript',
            title: 'round, floor, ceil, trunc, abs, sign',
            code: `Math.round(4.6)    // 5    nearest, and .5 goes up
Math.round(-4.2)   // -4

Math.floor(4.9)    // 4    always down
Math.floor(-4.2)   // -5   ← not -4: floor moves toward minus infinity
Math.ceil(4.1)     // 5    always up, which is what page counts need
Math.trunc(-4.2)   // -4   the fraction thrown away, direction ignored

Math.abs(-4.7)     // 4.7  distance from zero, so the sign disappears
Math.sign(-12)     // -1   just the direction: -1, 0 or 1`,
          },
          {
            type: 'text',
            id: 'j-l25-b2',
            body: '`floor` and `trunc` are the pair that causes the confusion, and the difference only shows up on negative numbers. `floor` moves toward negative infinity, so -4.2 becomes -5; `trunc` throws the fraction away and gives -4. For positive numbers they are identical, which is why the bug survives testing. If you are counting pages, or turning a percentage into a number of items, you want `ceil`; if you are converting a price to whole pence you want `Math.round`.',
          },
          {
            type: 'heading',
            id: 'j-l25-h2',
            level: 3,
            body: 'Powers, roots and logarithms',
          },
          {
            type: 'code',
            id: 'j-l25-c2',
            language: 'javascript',
            title: 'The rest of the box',
            code: `Math.pow(2, 10)      // 1024 — the ** operator does the same
2 ** 10               // 1024
Math.sqrt(144)       // 12
Math.cbrt(-27)        // -3  — sqrt(27) would be NaN
Math.hypot(3, 4)      // 5   — the length of a 3-4-5 triangle, no squaring needed

Math.exp(1)          // 2.718…, the same as Math.E
Math.log(100)        // 4.605… — natural logarithm, "how many doublings"
Math.log2(8)         // 3    — how many times you can halve
Math.log10(1000)     // 3`,
          },
          {
            type: 'warning',
            id: 'j-l25-w1',
            title: 'Math answers out-of-domain questions with NaN, not an error',
            body: '`Math.sqrt(-1)` is `NaN`, `Math.log(0)` is `-Infinity`, and `Math.log(-5)` is `NaN`. Nothing is thrown and nothing is logged, so the failure surfaces much later as a display reading "NaN" or a total that has quietly become not-a-number. A negative number passed to a square root is usually a sign error upstream — a value that should have been an absolute difference, or a subtraction in the wrong order — so `Math.abs` before the call is often the real fix.',
          },
          {
            type: 'heading',
            id: 'j-l25-h3',
            level: 3,
            body: 'min and max over a list',
          },
          {
            type: 'code',
            id: 'j-l25-c3',
            language: 'javascript',
            title: 'The spread, and when it stops working',
            code: `const temps = [18.4, 21.9, 17.2]

Math.max(...temps)   // 21.9
Math.min(...temps)   // 17.2

// Math.max has no idea your array exists — the ... spreads it into arguments
Math.max(temps)      // NaN, because an array is not a number`,
          },
          {
            type: 'tip',
            id: 'j-l25-t1',
            title: 'A very long array breaks the spread',
            body: 'Every function argument is passed separately, and an engine will only accept so many before the call fails. Spreading a hundred thousand items into `Math.max(...rows)` is fine on most engines and catastrophic on others, and it fails with a stack error rather than a sensible message. For a list that big, reduce it: `rows.reduce((m, r) => (r.total > m.total ? r : m))`. And an empty array gives `-Infinity` or `Infinity`, not an error, so a list of nothing is worth a guard.',
          },
          {
            type: 'code',
            id: 'j-l25-c4',
            language: 'javascript',
            title: 'The constants, and the reduce that always works',
            code: `Math.PI    // 3.14159…
Math.E     // 2.71828…

function top(list) {
  if (!list.length) return null
  return list.reduce(function (best, item) {
    return item > best ? item : best
  })
}`,
          },
          {
            type: 'exercise',
            id: 'j-l25-x1',
            exercise: {
              id: 'ex-js-math-stats',
              instructions:
                'Write `stats(numbers)`. It returns an object with three keys: `min`, `max` and `average`. For `[12, 7, 25, 9]` that is min 7, max 25, average 13.25. A list with a single number gives the same number for all three.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const prices = [12, 7, 25, 9]

// Return { min, max, average } for a list of numbers.

function stats(numbers) {
  return {}
}

console.log(stats(prices))
`,
              },
              expectedOutput: 'min 7, max 25, average 13.25',
              tests: [
                {
                  id: 'ex-js-math-stats-t1',
                  label: 'stats is a function',
                  body: `return typeof stats === 'function' ? true : 'Define a function called stats.';`,
                },
                {
                  id: 'ex-js-math-stats-t2',
                  label: 'min and max are right',
                  body: `if (typeof stats !== 'function') return 'Define a function called stats.'
var s = stats([12, 7, 25, 9])
return s.min === 7 && s.max === 25
  ? true
  : 'Expected min 7 and max 25, got min ' + s.min + ' and max ' + s.max;`,
                },
                {
                  id: 'ex-js-math-stats-t3',
                  label: 'The average is right',
                  body: `if (typeof stats !== 'function') return 'Define a function called stats.'
var s = stats([12, 7, 25, 9])
return Math.abs(s.average - 13.25) < 0.0001
  ? true
  : 'Expected an average of 13.25, got: ' + s.average;`,
                },
                {
                  id: 'ex-js-math-stats-t4',
                  label: 'A one-number list gives the same number three times',
                  body: `if (typeof stats !== 'function') return 'Define a function called stats.'
var s = stats([5])
return s.min === 5 && s.max === 5 && Math.abs(s.average - 5) < 0.0001
  ? true
  : 'For [5] every value should be 5, got: ' + JSON.stringify(s);`,
                },
              ],
              hints: [
                'Math.min and Math.max take any number of values, so an array has to be spread into them: Math.max(...numbers).',
                'For the average, add the numbers with reduce and divide by the length.',
                'One object holding all three: `return { min: Math.min(...numbers), max: Math.max(...numbers), average: total / numbers.length }`.',
              ],
              solution: {
                javascript: `function stats(numbers) {
  const total = numbers.reduce(function (a, b) {
    return a + b
  }, 0)

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
    average: total / numbers.length
  }
}

console.log(stats([12, 7, 25, 9]))`,
              },
              testNotes:
                'The checks read the three keys, so the order they are written in and the way you computed them do not matter. A manual loop instead of Math.max passes identically.',
            },
          },
        ],
      },
    ],
  },

  /* ---------------------------------- js-s19 --------------------------------- */
  {
    id: 'js-s19',
    title: 'Random',
    description:
      'Math.random, turning it into a whole number in a range, and an honest look at when randomness helps a user and when it only confuses them.',
    lessons: [
      {
        id: 'js-l26',
        title: 'Random numbers',
        description:
          'Math.random, turning it into a whole number in a range, and an honest look at when randomness helps a user and when it just confuses them.',
        duration: 4,
        objectives: [
          'State the range Math.random returns, and why 1 is never possible',
          'Generate a whole number between two bounds, inclusive or exclusive',
          'Say when randomness is a bad idea in a user interface, and avoid bias when you sample',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l26',
          title: 'Random numbers quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l26-q1',
              type: 'code-output',
              prompt: 'Which expression can never return 10?',
              code: 'Math.floor(Math.random() * 10) + 1',
              options: [
                'All of them can return 10',
                'Math.floor(Math.random() * 10) — its highest value is 9',
                'Math.ceil(Math.random() * 10) + 1 — its lowest value is 1',
                'Math.floor(Math.random() * 11) + 1 — its highest value is 10',
              ],
              answer: 1,
              explanation: 'The multiplier is the number of possible values, not the highest one. `* 10` gives ten values, 0 to 9, so 10 is not among them. To reach 10 you need `* 11 + 1`, or `* 10 + 1` for 1 to 10 inclusive.',
            },
            {
              id: 'quiz-js-l26-q2',
              type: 'true-false',
              prompt: 'Math.random() can return 1, but never returns 0.',
              answer: false,
              explanation: 'It is the other way round: 0 is possible and 1 is not, so the range is 0 <= n < 1. That is why a whole number from 0 to 9 is `Math.floor(Math.random() * 10)`, and why 0 to 100 inclusive needs `* 101`.',
            },
            {
              id: 'quiz-js-l26-q3',
              type: 'blank',
              prompt: 'To pick one item at random from an array called `options`, which length do you multiply by?',
              answers: [
                'options.length',
                'length',
                'options.length()',
                'the length of the array',
              ],
              explanation: 'The array length is the number of possible items, which is the same "multiply by how many there are" rule as any other range. The classic slip is multiplying by `length - 1`, which makes the last item impossible to pick.',
            },
            {
              id: 'quiz-js-l26-q4',
              type: 'multiple-choice',
              prompt: 'What is wrong with picking a random item by rerolling until the result is new?',
              options: [
                'Nothing — it is the standard way to avoid duplicates',
                'It is biased: later options become more likely than earlier ones',
                'It is slower than indexing into the array',
                'Math.random cannot be called more than once a second',
              ],
              answer: 1,
              explanation: 'Every reroll is another chance for the earlier items, so the last value in a set ends up more likely than the first. Pick from the array of remaining items instead. The same trap applies to rerolling until a "good" score: you have built a generator that only produces good scores.',
            },
            {
              id: 'quiz-js-l26-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'function showBanner() {\n  const tip = tips[Math.floor(Math.random() * (tips.length - 1))]\n  render(tip)\n}',
              options: [
                'Math.floor cannot be used inside a function',
                'tips.length - 1 makes the last tip impossible to ever be chosen',
                'Math.random has to be stored in a variable first',
                'Nothing — this picks an item at random correctly',
              ],
              answer: 1,
              explanation: 'The multiplier is the number of possible items, which is the full length. Subtracting one drops the final element, so it never appears no matter how many times the page is reloaded. The version with `tips.length` gives every item the same chance.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l26-b1',
            body: '`Math.random()` returns a number between `0` and `1` — including zero, never including one. On its own that is almost useless, because nobody wants a fraction, but multiplying it first turns it into the tool you actually want: scale the range to the size you need, then round down.',
          },
          {
            type: 'demo',
            id: 'j-l26-d1',
            title: 'A die, rolled as many times as you like',
            body: 'Each press calls the same expression, `Math.floor(Math.random() * 6) + 1`. Multiply by six to get a value in the right range, round down to a whole number, add one so the die never shows zero. The counter underneath shows the raw fraction next to the result, which is the part people skip.',
            html: `<p id="out">…</p>
<button id="roll">roll</button>`,
            css: `p { margin: 0 0 0.6rem; font-family: ui-monospace, monospace; font-size: 15px; }
button { font: inherit; padding: 0.25rem 0.9rem; cursor: pointer; }`,
            javascript: `const out = document.querySelector('#out')

function roll() {
  const fraction = Math.random()
  const face = Math.floor(fraction * 6) + 1
  out.textContent = 'You rolled a ' + face + '  (raw: ' + fraction + ')'
}

document.querySelector('#roll').onclick = roll
roll()`,
            height: 130,
          },
          {
            type: 'code',
            id: 'j-l26-c1',
            language: 'javascript',
            title: 'From a fraction to a whole number',
            code: `Math.random()                    // 0.4823910…  always 0 <= n < 1
Math.random() * 10             // 0 … 9.99…
Math.floor(Math.random() * 10) // 0 to 9    — ten possible values
Math.floor(Math.random() * 6) + 1  // 1 to 6 — a die
Math.floor(Math.random() * 101)    // 0 to 100, inclusive`,
          },
          {
            type: 'heading',
            id: 'j-l26-h1',
            level: 3,
            body: 'A whole number in a range',
          },
          {
            type: 'text',
            id: 'j-l26-b2',
            body: 'Two steps, always. Multiply by **how many values there are**, then add the lowest one. If you want 1 to 10 inclusive there are ten values, so multiply by ten and add one. If you want 0 to 10 inclusive there are eleven, which is where the off-by-one in every hand-written dice function comes from. Wrapping it in a named function is worth the four lines: the arithmetic is easy to get wrong, impossible to read, and identical everywhere it appears.',
          },
          {
            type: 'code',
            id: 'j-l26-c2',
            language: 'javascript',
            title: 'min inclusive, max exclusive — and the version that is not',
            code: `// 1 to 10, both ends possible
function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 1 to 9 — 10 is impossible
function randomIntExclusive(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

// picking an item from a list uses the array length, nothing else
const options = ['rock', 'paper', 'scissors']
const pick = options[Math.floor(Math.random() * options.length)]`,
          },
          {
            type: 'heading',
            id: 'j-l26-h2',
            level: 3,
            body: 'Randomness is rarely what a user needs',
          },
          {
            type: 'list',
            id: 'j-l26-l1',
            style: 'bullet',
            items: [
              '**Reasonable:** a game outcome, a shuffling of a deck, a generated sample address, a placeholder you will replace, a rotating tip of the day.',
              '**Not reasonable:** anything a person typed, reordered. A list that reshuffles every render is a list nobody can find anything in.',
              '**Not reasonable:** anything that must be stable between visits — a "your order number", an identifier, a price. Randomness in an identifier means two users collide and one of them sees the wrong data.',
              '**Not reasonable:** as a way of avoiding a decision. If the result matters, the user should be choosing.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l26-t1',
            title: 'Generate once, then store it',
            body: 'The most reliable fix for a random value that keeps changing is to stop recalculating it. `const value = Math.random()` and then reuse `value` everywhere afterwards. It costs one line and makes the whole problem disappear — and if the value ever needs to be reproduced from a bug report, you can log the one number instead of the twenty lines that consumed it.',
          },
          {
            type: 'warning',
            id: 'j-l26-w1',
            title: 'Never get a result by rejecting the ones you dislike',
            body: 'The obvious way to avoid duplicates is to keep rolling until you get a new one — and that quietly biases everything. The last value in a set becomes more likely than the first, because the first has more chances to be rolled again. If you need a different item, index into the array of remaining items rather than rerolling. The same trap applies to rerolling until you get a "good" score: you have built a generator that only produces good scores.',
          },
          {
            type: 'example',
            id: 'j-l26-e1',
            title: 'A die roll',
            body: 'This runs once when the preview loads, and it produces a different number every time you reload it — which is exactly how randomness behaves in a page.',
            html: `<p id="out">rolling…</p>`,
            javascript: `const roll = Math.floor(Math.random() * 6) + 1
document.querySelector('#out').textContent = 'You rolled a ' + roll`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l26-x1',
            exercise: {
              id: 'ex-js-die-roll',
              instructions:
                'Write `rollDie()` so it returns a random whole number from 1 to 6 inclusive — every face equally likely. Then roll it five times and log each roll on its own line.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Returns a whole number from 1 to 6.

function rollDie() {
  
}

for (let i = 0; i < 5; i++) {
  console.log(rollDie())
}
`,
              },
              tests: [
                {
                  id: 'ex-js-die-roll-t1',
                  label: 'rollDie is a function',
                  body: `return typeof rollDie === 'function' ? true : 'Define a function called rollDie.';`,
                },
                {
                  id: 'ex-js-die-roll-t2',
                  label: 'Every roll is a whole number from 1 to 6',
                  body: `if (typeof rollDie !== 'function') return 'Define a function called rollDie.'
var bad = null
for (var i = 0; i < 300; i++) {
  var v = rollDie()
  if (!Number.isInteger(v) || v < 1 || v > 6) {
    bad = v
    break
  }
}
return bad === null ? true : 'Got ' + bad + ' — a roll must be 1, 2, 3, 4, 5 or 6.';`,
                },
                {
                  id: 'ex-js-die-roll-t3',
                  label: 'It is actually random, not a fixed value',
                  body: `if (typeof rollDie !== 'function') return 'Define a function called rollDie.'
var seen = {}
for (var i = 0; i < 300; i++) {
  seen[String(rollDie())] = true
}
return Object.keys(seen).length >= 3
  ? true
  : 'Three hundred rolls produced at most two different numbers — it looks hard-coded.';`,
                },
                {
                  id: 'ex-js-die-roll-t4',
                  label: 'Five rolls were logged',
                  body: `return window.__log.length >= 5
  ? true
  : 'Expected five console lines, got ' + window.__log.length + '.';`,
                },
              ],
              hints: [
                'Multiply by six to get a number in the right range, then add one so the die never shows zero.',
                '`Math.floor(Math.random() * 6) + 1` is the whole function.',
                'The loop at the bottom already logs five rolls — it just needs something to roll.',
              ],
              solution: {
                javascript: `function rollDie() {
  return Math.floor(Math.random() * 6) + 1
}

for (let i = 0; i < 5; i++) {
  console.log(rollDie())
}`,
              },
              testNotes:
                'The randomness checks roll 300 times, so a real random function passes comfortably and anything returning a constant or a two-value cycle fails. They cannot tell *how* you produced the number.',
            },
          },
        ],
      },
    ],
  },

  /* ---------------------------------- js-s20 --------------------------------- */
  {
    id: 'js-s20',
    title: 'Booleans',
    description:
      'true and false as ordinary values, where they come from, and the long list of things that count as true when you did not expect them to.',
    lessons: [
      {
        id: 'js-l27',
        title: 'Booleans',
        description:
          'Two values, one function, and truthiness — why an empty string, a zero and an empty array all pass a condition.',
        duration: 5,
        objectives: [
          'Say where booleans come from: comparisons, the logical operators, and the Boolean function',
          'Predict whether a value is truthy or falsy without running it',
          'Use === true when a truthy value would be wrong, and know why Boolean is a function',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l27',
          title: 'Booleans quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l27-q1',
              type: 'multiple-choice',
              prompt: 'Which of these is **not** falsy?',
              options: [
                '0',
                '\'\'',
                '[]',
                '0n',
              ],
              answer: 2,
              explanation: 'The falsy six are false, 0, 0n, "", null, undefined and NaN. An empty array is an object, and every object is truthy — which is why `if (list)` and `if (list.length)` are not the same test.',
            },
            {
              id: 'quiz-js-l27-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const input = \'0\'\nif (input) {\n  console.log(\'submitted\')\n}',
              options: [
                'Nothing — 0 is falsy',
                'submitted, because the string "0" is non-empty and therefore truthy',
                'Nothing — strings are never truthy',
                'It logs 0',
              ],
              answer: 1,
              explanation: 'A form field gives you a string, and a non-empty string is truthy whatever the characters are. The same applies to the word "false". This is why field checks state what they mean: `input.value !== \'\'` or `Number(input.value) > 0`.',
            },
            {
              id: 'quiz-js-l27-q3',
              type: 'true-false',
              prompt: '`!!value` is a reliable way to turn any value into a boolean.',
              answer: true,
              explanation: 'Two negations in a row cancel out, so the result is the boolean that value converts to — which is exactly what `Boolean(value)` does. It is the shorter form, and it is the one that reads as "force this to a boolean" once you know what a single `!` does.',
            },
            {
              id: 'quiz-js-l27-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'const disabled = new Boolean(false)\nif (disabled) {\n  button.removeAttribute(\'disabled\')\n}',
              options: [
                'new Boolean is not a real constructor',
                'The object wrapper is truthy even though it holds false, so the block always runs',
                'removeAttribute needs a second argument',
                'Nothing — this correctly checks for false',
              ],
              answer: 1,
              explanation: '`new Boolean(false)` is an object, and every object is truthy, so the condition cannot be false. `true` and `false` are the values you want; `Boolean(x)` is the function that converts. An object wrapping a boolean is one of the few genuinely confusing cases in the language.',
            },
            {
              id: 'quiz-js-l27-q5',
              type: 'blank',
              prompt: 'What is the name of the conversion rule that decides whether a value counts as true in a condition?',
              answers: [
                'truthiness',
                'truthy',
                'truthiness',
              ],
              explanation: 'Truthiness is the rule, and it has a short list of falsy values: false, 0, 0n, the empty string, null, undefined and NaN. Everything else passes a condition, including empty arrays, empty objects and the string "0" — which is why a check on a form field should say what it means rather than rely on the default.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l27-b1',
            body: 'There are exactly two boolean values, `true` and `false`, and they are lowercase words like any other value — not keywords you can rename, and not a type you declare. You almost never write them yourself: they come out of comparisons, out of the logical operators, and out of the functions that test one thing. What you do write is conditions, and the rule that governs those is truthiness — a much larger rule than "equals true".',
          },
          {
            type: 'demo',
            id: 'j-l27-d1',
            title: 'Every value, converted to a boolean',
            body: 'This is the whole truthiness table in one list. The two that catch people are near the top: the string `\'0\'` is true, because a non-empty string is true whatever is in it, and the empty array is true, because an object is an object. Only the last five are falsy.',
            html: `<ul id="out"></ul>`,
            css: `ul { margin: 0; padding-left: 1.2rem; font-size: 13.5px; }
li { margin: 0.15rem 0; }
li b { font-weight: 600; }`,
            javascript: `const values = ['0', 0, '', [], {}, null, undefined, NaN, 'hi', 1]
const out = document.querySelector('#out')

values.forEach(function (v) {
  const shown = typeof v === 'string' ? JSON.stringify(v) : String(v)
  const li = document.createElement('li')
  li.innerHTML = '<b>' + shown + '</b> is ' + Boolean(v)
  out.appendChild(li)
})`,
            height: 260,
          },
          {
            type: 'heading',
            id: 'j-l27-h1',
            level: 3,
            body: 'Where booleans come from',
          },
          {
            type: 'code',
            id: 'j-l27-c1',
            language: 'javascript',
            title: 'Comparisons and logical operators both produce booleans',
            code: `3 > 2                  // true
3 === '3'               // false — strict equality is the honest one
'a' && 'b'              // 'b', not a boolean
!!'a'                   // true — double negation forces one

typeof true           // 'boolean'
Object.keys(true)     // [] — a primitive, so it has no own properties`,
          },
          {
            type: 'text',
            id: 'j-l27-b2',
            body: 'Note the third line: `&&` and `||` do **not** return booleans, they return one of their two arguments. That is what makes `value || fallback` work, and it is also why `a && a.b` is safe on a null `a` in a way `a.b` is not. If you want a real boolean out of them, convert with `!!` or `Boolean()`.',
          },
          {
            type: 'heading',
            id: 'j-l27-h2',
            level: 3,
            body: 'The falsy six, and everything else',
          },
          {
            type: 'code',
            id: 'j-l27-c2',
            language: 'javascript',
            title: 'Boolean() on the interesting ones',
            code: `Boolean(0)         // false
Boolean('')        // false — the empty string
Boolean(NaN)       // false — the result of 0 / 0, say
Boolean(null)      // false — deliberately assigned nothing
Boolean(undefined) // false — never assigned anything
// that is the whole list

Boolean('0')       // true  ← a non-empty string, whatever is in it
Boolean('false')   // true  ← the same
Boolean([])        // true  ← an object
Boolean({})        // true`,
          },
          {
            type: 'warning',
            id: 'j-l27-w1',
            title: 'The form-field bug',
            body: 'An input element has a `value` that is a **string**, so a field containing `0` passes `if (input.value)` and a field containing the word `"false"` passes too. This is a real bug in real pages, and it does not announce itself — the form submits, the number turns into the string "0", and the database stores it happily. The fix is to state what you mean: `input.value !== \'\'`, or `input.value.trim() !== \'\'`, or `Number(input.value) > 0` when the field holds a number.',
          },
          {
            type: 'heading',
            id: 'j-l27-h3',
            level: 3,
            body: 'Boolean is a function, true is a value',
          },
          {
            type: 'code',
            id: 'j-l27-c3',
            language: 'javascript',
            title: 'Why the constructor form is a trap',
            code: `Boolean(0)          // false — the function, doing its job
!!0                 // false — the same, in two characters

new Boolean(false)  // a Boolean OBJECT wrapping false…
Boolean(new Boolean(false))  // …which is true, because objects are truthy
if (new Boolean(false)) {
  // this block runs. Always. Which is not what anybody wanted.
}`,
          },
          {
            type: 'tip',
            id: 'j-l27-t1',
            title: 'When to write === true, and when not to',
            body: 'A condition should say what it means, and that is usually truthiness: `if (list.length)` rather than `if (list.length > 0)`, and `if (!name)` rather than `if (name === false)`. Reach for `=== true` in the opposite case — when a truthy value would be wrong and the test must be exactly a boolean. A checkbox, a feature flag coming from JSON, or a value you did not write: those are the places where `if (flag)` and `if (flag === true)` genuinely disagree, because the string `"false"` and the number `0` are both truthy.',
          },
          {
            type: 'exercise',
            id: 'j-l27-x1',
            exercise: {
              id: 'ex-js-boolean-check',
              instructions:
                'Write `isFilled(value)`. It returns `true` only when `value` is a string with something in it once leading and trailing spaces are removed — so `\'   \'` is empty and returns false. Anything that is not a string returns false.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// true only for a string with real content in it

function isFilled(value) {
  return false
}

console.log(isFilled('Ada'), isFilled('   '), isFilled(''), isFilled(null))
`,
              },
              expectedOutput: 'true false false false',
              tests: [
                {
                  id: 'ex-js-boolean-check-t1',
                  label: 'isFilled is a function',
                  body: `return typeof isFilled === 'function' ? true : 'Define a function called isFilled.';`,
                },
                {
                  id: 'ex-js-boolean-check-t2',
                  label: 'A string with content is filled',
                  body: `if (typeof isFilled !== 'function') return 'Define a function called isFilled.'
return isFilled('Ada') === true ? true : 'Expected true for a string with letters in it.';`,
                },
                {
                  id: 'ex-js-boolean-check-t3',
                  label: 'An empty or all-spaces string is not filled',
                  body: `if (typeof isFilled !== 'function') return 'Define a function called isFilled.'
return isFilled('   ') === false && isFilled('') === false
  ? true
  : 'Spaces are not content — trim the string before checking its length.';`,
                },
                {
                  id: 'ex-js-boolean-check-t4',
                  label: 'Anything that is not a string is not filled',
                  body: `if (typeof isFilled !== 'function') return 'Define a function called isFilled.'
return isFilled(null) === false && isFilled(42) === false && isFilled([]) === false
  ? true
  : 'Only a string can be filled — 0, null and [] are all truthy but none of them is text.';`,
                },
              ],
              hints: [
                'Check the type first: `typeof value !== \'string\'` tells you it cannot possibly be text.',
                'A string with content is longer than zero after trimming: `value.trim().length > 0`.',
                'Two lines do it: `if (typeof value !== \'string\') return false` and then `return value.trim().length > 0`.',
              ],
              solution: {
                javascript: `function isFilled(value) {
  if (typeof value !== 'string') return false
  return value.trim().length > 0
}

console.log(isFilled('Ada'), isFilled('   '), isFilled(''), isFilled(null))`,
              },
              testNotes:
                'The last check is the truthiness lesson in code form: 0, null and [] are all truthy, so a condition that only asks "is this truthy" would accept them. The type check is what makes the function mean what its name says.',
            },
          },
        ],
      },
    ],
  },
]
