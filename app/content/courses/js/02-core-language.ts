import type { Section } from '~/types/content'

export const jsCoreLanguageSections: Section[] = [
  /* ------------------------------------------------------------------ */
  /* js-s7 — Operators                                                  */
  /* ------------------------------------------------------------------ */
  {
    id: 'js-s7',
    title: 'Operators',
    description: 'Computing with values, and the order the language decides to compute them in.',
    lessons: [
      {
        id: 'js-l9',
        title: 'Arithmetic and assignment',
        description: 'The arithmetic you use every day, compound assignment, and the two that surprise everyone once.',
        duration: 5,
        objectives: [
          'Use +, -, *, / and % including the modulo case',
          'Write compound assignment instead of repeated self-assignment',
          'Avoid ++ on the same line that reads the value',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l9-b1',
            body: 'Operators are the verbs of the language. Five arithmetic ones cover nearly everything: `+` adds, `-` subtracts, `*` multiplies, `/` divides, and `%` gives you the **remainder**. Two more, `**` for powers and the pair `++` / `--`, show up often enough to be worth knowing now.',
          },
          {
            type: 'demo',
            id: 'j-l9-d1',
            title: 'A total that updates itself',
            body: 'The quantity changes with `+=`, and the total follows it. The last figure divides the total three ways, which is where `%` earns its keep — the remainder tells you what is left over.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const price = 12.5
let quantity = 2
quantity += 3

const total = price * quantity
document.querySelector('#out').textContent =
  'quantity: ' + quantity +
  ' / total: ' + total +
  ' / per person: ' + (total / 3) +
  ' / leftover when shared: ' + (total % 3)`,
          },
          {
            type: 'heading',
            id: 'j-l9-h1',
            level: 3,
            body: 'Modulo, and why you want it',
          },
          {
            type: 'text',
            id: 'j-l9-b2',
            body: '`%` is the operator for "what is left over", and it is the cheapest way to ask divisibility questions. A number is even when `n % 2 === 0`; a day is a weekend when `day % 7` is `5` or `6`; a name is highlighted every fifth row when `index % 5 === 0`. It also cycles values, because `%` keeps the sign of the dividend — for anything that could go negative, add the divisor back so the result is never below zero.',
          },
          {
            type: 'code',
            id: 'j-l9-c1',
            language: 'javascript',
            title: 'The arithmetic set',
            code: `console.log(7 + 2)    // 9
console.log(7 - 2)    // 5
console.log(7 * 2)    // 14
console.log(7 / 2)    // 3.5
console.log(7 ** 2)   // 49
console.log(7 % 2)    // 1`,
          },
          {
            type: 'code',
            id: 'j-l9-c2',
            language: 'javascript',
            title: 'Asking about a number with %',
            code: `const n = 12
console.log(n % 2 === 0)   // true — it is even

// every third item gets flagged
for (let i = 0; i < 7; i++) {
  if (i % 3 === 0) console.log(i, 'yes')
}`,
          },
          {
            type: 'heading',
            id: 'j-l9-h2',
            level: 3,
            body: 'Compound assignment',
          },
          {
            type: 'text',
            id: 'j-l9-b3',
            body: 'Assignment operators do the arithmetic *and* store the result in one step. `total += 5` is the same as `total = total + 5`, and it matters when the right-hand side is long: `score *= 2` cannot be misread as `score = score * 2`. Every arithmetic operator has one, plus `**=`.',
          },
          {
            type: 'code',
            id: 'j-l9-c3',
            language: 'javascript',
            title: 'Shorter and less error-prone',
            code: `let total = 10
total += 5    // 15
total -= 3    // 12
total *= 2    // 24
total /= 4    // 6
total %= 4    // 2 — remainder
total **= 2   // 4

// the long forms these replace
let price = 5
price = price * 1.2
price = price - 1`,
          },
          {
            type: 'heading',
            id: 'j-l9-h3',
            level: 3,
            body: 'Increment and decrement',
          },
          {
            type: 'code',
            id: 'j-l9-c4',
            language: 'javascript',
            title: 'Both forms, and why it matters',
            code: `let count = 0

count++
++count

// the trap: the line above has already changed count,
// so this logs the value AFTER the increment
console.log(count++)   // 1, and count is now 2
console.log(count)     // 2`,
          },
          {
            type: 'warning',
            id: 'j-l9-w1',
            title: 'Never ++ or -- in the middle of an expression',
            body: '`++count` adds one and *hands back the new value*; `count++` hands back the old value and then adds one. On a line of its own the difference is invisible, which is exactly why it hides until someone writes `arr[i++]`. Keep `++` on its own line, or write `count += 1`.',
          },
          {
            type: 'heading',
            id: 'j-l9-h4',
            level: 3,
            body: 'Adding numbers versus joining text',
          },
          {
            type: 'text',
            id: 'j-l9-b4',
            body: '`+` does double duty. Two numbers add. Two strings join. A **mix** joins, because the string side wins and the number is converted to text — `"Total: " + 3 + 5` is `"Total: 35"`, not `"Total: 8"`, since the string arrives first and every `+` after it concatenates. When you want a computed number inside a sentence, build the number first and drop it into a template literal instead — that is the subject of `js-l17` in the strings section.',
          },
          {
            type: 'code',
            id: 'j-l9-c5',
            language: 'javascript',
            title: 'Same three values, two outcomes',
            code: `console.log(3 + 5)              // 8
console.log('Total: ' + 3 + 5)  // 'Total: 35'
console.log('Total: ' + (3 + 5))  // 'Total: 8'`,
          },
          {
            type: 'tip',
            id: 'j-l9-t1',
            title: 'Round before you compare',
            body: '`Math.round` gives the nearest whole number and is what you want before comparing money or averages: `if (Math.round(average) === 5)`. Leave the rounding out and a computed `4.9999999` fails a check that should pass. Round once, at the boundary, and store the result in a variable rather than repeating the call.',
          },
          {
            type: 'example',
            id: 'j-l9-e1',
            title: 'A bill, with rounding you can see',
            body: 'The unrounded total is the interesting part: floating point leaves a tiny remainder, which is why the check against the rounded value passes and the raw one would not.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const price = 12.5
const quantity = 4

const raw = price * quantity
const rounded = Math.round(raw)

document.querySelector('#out').textContent =
  'raw: ' + raw + ' / rounded: ' + rounded + ' / is whole: ' + (raw % 1 === 0)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l9-x1',
            exercise: {
              id: 'ex-js-arithmetic',
              instructions:
                'Declare a `const` called `price` holding 19.99 and a `let` called `quantity` holding 3. Raise `quantity` to 4 with `+=`. Then log the total rounded to two decimals, using `Number(price * quantity).toFixed(2)`. Log a second line: `quantity % 2`, which should be 0.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// price is 19.99, quantity starts at 3 and becomes 4.
// Log the total with two decimals, then log quantity % 2.

`,
              },
              expectedOutput: '79.96',
              tests: [
                {
                  id: 'ex-js-arithmetic-t1',
                  label: 'price and quantity hold the right values',
                  body: `if (typeof price === 'undefined' || typeof quantity === 'undefined')
  return 'Declare both price and quantity.';
return price === 19.99 && quantity === 4
  ? true
  : 'price must be 19.99 and quantity must end up as 4 (use +=).';`,
                },
                {
                  id: 'ex-js-arithmetic-t2',
                  label: 'The rounded total was logged as 79.96',
                  body: `var log = window.__log || [];
return log.indexOf('79.96') !== -1
  ? true
  : 'Log Number(price * quantity).toFixed(2) and expect the line 79.96. Logged: ' + log.join(' | ');`,
                },
                {
                  id: 'ex-js-arithmetic-t3',
                  label: 'The remainder was logged as 0',
                  body: `var log = window.__log || [];
return log.indexOf('0') !== -1
  ? true
  : 'Log quantity % 2 as a second line. Logged: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'Two declarations to start with: `const price = 19.99` and `let quantity = 3`.',
                'A compound assignment can do the whole job: `quantity += 1` turns 3 into 4.',
                'For the total, `toFixed(2)` turns a number into a string with two decimals, so `console.log(Number(price * quantity).toFixed(2))` prints 79.96.',
              ],
              solution: {
                javascript: `const price = 19.99
let quantity = 3

quantity += 1

console.log(Number(price * quantity).toFixed(2))
console.log(quantity % 2)`,
              },
            },
          },
        ],
      },
      {
        id: 'js-l10',
        title: 'How operators combine',
        description: 'Precedence decides which operator runs first, associativity decides left-to-right or the reverse, and parentheses override both.',
        duration: 6,
        objectives: [
          'Recall the precedence order that decides which operator runs first',
          'Use parentheses to force an order instead of guessing one',
          'Explain why assignment inside a condition is always true'
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l10-b1',
            body: 'An expression with two operators is only meaningful if the language agrees on which one runs first. `2 + 3 * 4` is 14, not 20, because `*` binds tighter than `+`. That ordering is **precedence**, and it is fixed — you do not get a choice about it, you only get to override it. `**` is the only arithmetic operator that breaks the usual direction and works right to left, so `2 ** 3 ** 2` is 512 rather than 64.',
          },
          {
            type: 'demo',
            id: 'j-l10-d1',
            title: 'The same three numbers, two orders',
            body: 'Change any of the three numbers. The left figure is `a + b * c`, the right one is `(a + b) * c`. The parentheses are the only difference, and the gap between them grows with every number you raise.',
            html: `<label>a <input id="a" type="number" value="2" /></label>
<label>b <input id="b" type="number" value="3" /></label>
<label>c <input id="c" type="number" value="4" /></label>
<p id="out">waiting…</p>`,
            javascript: `const out = document.querySelector('#out')

function update() {
  const a = Number(document.querySelector('#a').value)
  const b = Number(document.querySelector('#b').value)
  const c = Number(document.querySelector('#c').value)
  out.textContent = 'a + b * c = ' + (a + b * c) + '   /   (a + b) * c = ' + ((a + b) * c)
}

document.querySelectorAll('#a, #b, #c').forEach(function (el) {
  el.addEventListener('input', update)
})
update()`,
          },
          {
            type: 'heading',
            id: 'j-l10-h1',
            level: 3,
            body: 'The order, from tightest to loosest',
          },
          {
            type: 'list',
            id: 'j-l10-l1',
            style: 'ordered',
            items: [
              '`(` `)` — grouping. Nothing outranks it.',
              '`++`, `--`, `+`, `-`, `!`, `typeof` — the one-value operators.',
              '`**` — the only one that works right to left.',
              '`*`, `/`, `%`',
              '`+`, `-`',
              '`<`, `>`, `<=`, `>=` — comparisons.',
              '`===`, `!==`, `==`, `!=` — equality.',
              '`&&`, then `||`, then `??`.',
              'The conditional `? :`, and finally `=`, which is looser than everything above it.',
            ],
          },
          {
            type: 'code',
            id: 'j-l10-c1',
            language: 'javascript',
            title: 'Precedence doing its job',
            code: `console.log(2 + 3 * 4)     // 14  — * first
console.log(10 - 3 + 2)    // 9   — + and - are the same, left to right
console.log(2 ** 3 ** 2)   // 512 — ** is right to left
console.log(1 + 2 === 3)   // true — equality is looser than +
console.log(true || false && false)   // true — && binds tighter than ||`,
          },
          {
            type: 'heading',
            id: 'j-l10-h2',
            level: 3,
            body: 'Parentheses beat everything',
          },
          {
            type: 'text',
            id: 'j-l10-b2',
            body: 'Precedence gets the answer right most of the time and unreadable all of the time. Nobody reads `total + tax * rate` and immediately sees that tax is multiplied first — they have to stop and consult a table. Add the parentheses even when they are redundant, and the expression says what it does. The rule to keep: parentheses are for the reader first and for the language second.',
          },
          {
            type: 'code',
            id: 'j-l10-c2',
            language: 'javascript',
            title: 'Same meaning, one readable',
            code: `const total = 100
const rate = 0.2
const shipping = 8

// correct, and you have to think about it
const cost = total + shipping * (1 + rate)

// correct, and obvious
const cost2 = total + shipping * (1 + rate)
console.log(cost === cost2)   // true`,
          },
          {
            type: 'heading',
            id: 'j-l10-h3',
            level: 3,
            body: 'Left to right, and the one exception',
          },
          {
            type: 'text',
            id: 'j-l10-b3',
            body: 'When two operators have the same precedence the tie is broken by **associativity**. Almost everything is left-associative, which is why `10 - 3 + 2` is 9 and not -5. The two that are not are `**` and assignment: both work right to left, which is what makes `2 ** 3 ** 2` mean `2 ** (3 ** 2)` and lets `a = b = 5` work at all.',
          },
          {
            type: 'code',
            id: 'j-l10-c3',
            language: 'javascript',
            title: 'Associativity in action',
            code: `console.log(20 - 5 - 3)   // 12 — (20 - 5) - 3
console.log(100 / 10 / 2)  // 5  — (100 / 10) / 2

let a
let b
a = b = 5                 // right to left: b gets 5, then a does
console.log(a, b)         // 5 5`,
          },
          {
            type: 'warning',
            id: 'j-l10-w1',
            title: 'An assignment is not a comparison',
            body: '`=` produces the value it assigned, so `if (total = 10)` assigns 10 and then tests a number — always true. It fails silently, which is the worst way for it to fail. The missing `==` is one keystroke, and the fix is `===`.',
          },
          {
            type: 'tip',
            id: 'j-l10-t1',
            title: 'If you are reading the table, add a bracket',
            body: 'The moment you look up precedence to work out what an expression does, the expression is too clever. Split it into two named variables — `const shippingWithTax = shipping * (1 + rate)` — and the question disappears. Named intermediates cost a line and remove a whole class of bug.',
          },
          {
            type: 'example',
            id: 'j-l10-e1',
            title: 'Two totals from the same cart',
            body: 'The first total is built without parentheses and is wrong by exactly the shipping amount times the rate. The second one is the same calculation written so the order is visible.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const items = 100
const shipping = 8
const rate = 0.2

const careless = items + shipping * (1 + rate)
const careful = (items + shipping) * (1 + rate)

document.querySelector('#out').textContent =
  'items + shipping * (1 + rate): ' + careless +
  '  /  (items + shipping) * (1 + rate): ' + careful`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l10-x1',
            exercise: {
              id: 'ex-js-operator-precedence',
              instructions:
                'Declare `const a = 2`, `const b = 3` and `const c = 4`. Log `a + b * c`, which is 14 because multiplication runs first. Then declare `const grouped = (a + b) * c` and log it, which is 20. As a third line, log `\'1\' + 2 * 3`, which is the string "17" — the arithmetic finishes first, then the string joins it.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// a = 2, b = 3, c = 4
// 1. log a + b * c
// 2. declare grouped = (a + b) * c and log it
// 3. log '1' + 2 * 3

`,
              },
              expectedOutput: '14\n20\n17',
              tests: [
                {
                  id: 'ex-js-operator-precedence-t1',
                  label: 'a, b and c hold 2, 3 and 4',
                  body: `if (typeof a === 'undefined' || typeof b === 'undefined' || typeof c === 'undefined')
  return 'Declare all three: const a = 2, const b = 3, const c = 4.';
return a === 2 && b === 3 && c === 4
  ? true
  : 'a must be 2, b must be 3 and c must be 4.';`,
                },
                {
                  id: 'ex-js-operator-precedence-t2',
                  label: 'grouped holds 20',
                  body: `if (typeof grouped === 'undefined') return 'Declare grouped as a const holding (a + b) * c.'
return grouped === 20
  ? true
  : '(a + b) * c is 20 with these numbers, got: ' + grouped;`,
                },
                {
                  id: 'ex-js-operator-precedence-t3',
                  label: 'The unparenthesised line printed 14',
                  body: `var log = window.__log || [];
return log.indexOf('14') !== -1
  ? true
  : 'Log a + b * c and expect the line 14. Logged: ' + log.join(' | ');`,
                },
                {
                  id: 'ex-js-operator-precedence-t4',
                  label: 'The other two lines printed 20 and 17',
                  body: `var log = (window.__log || []).join(' | ');
if (log.indexOf('20') === -1) return 'The grouped line should print 20. Logged: ' + log;
return log.indexOf('17') !== -1
  ? true
  : "Log '1' + 2 * 3 and expect the line 17 — the multiplication happens before the string joins.";`,
                },
              ],
              hints: [
                'Three declarations first, then the logs in order. Keep each console.log on its own line so the output is three lines.',
                'Without parentheses `a + b * c` is 14. With them, `(a + b) * c` is 20, and that value needs a name of its own so the second log can print it.',
                "The third line mixes a string with arithmetic: 2 * 3 is computed first and gives 6, then '1' joins with it to give '17'.",
              ],
              solution: {
                javascript: `const a = 2
const b = 3
const c = 4

console.log(a + b * c)

const grouped = (a + b) * c
console.log(grouped)

console.log('1' + 2 * 3)`,
              },
              testNotes:
                'The checks read your declared variables and the three console lines. The numbers are what matter, so any working order produces the same output.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s7',
      title: 'Operators check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s7-q1',
          type: 'multiple-choice',
          prompt: 'Why is `2 + 3 * 4` equal to 14 and not 20?',
          options: [
            'Multiplication has higher precedence, so it is applied first and the addition happens afterwards',
            'JavaScript always evaluates the leftmost operator first',
            'Addition is only applied to whole numbers',
            'The expression is evaluated bottom-up as a rule',
          ],
          answer: 0,
          explanation:
            'Precedence groups operators into levels and the tighter level runs first. `*` sits above `+`, so you get `2 + (3 * 4)` = 14. Parentheses are the only way to ask for the other order.',
        },
        {
          id: 'quiz-js-s7-q2',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `console.log(2 ** 3 ** 2)
console.log(10 - 3 + 2)`,
          options: ['64 5', '512 9', '512 5', '64 9'],
          answer: 1,
          explanation:
            '`**` is right-associative, so it means `2 ** (3 ** 2)` = 512. `+` and `-` share a level and run left to right, so `10 - 3 + 2` is `(10 - 3) + 2` = 9, not 5.',
        },
        {
          id: 'quiz-js-s7-q3',
          type: 'true-false',
          prompt: 'Subtraction has higher precedence than addition, so `10 - 3 + 2` is 5.',
          answer: false,
          explanation:
            'They sit at the same level of the precedence table. When two operators tie, the leftmost runs first, which gives 9. Only parentheses can change it.',
        },
        {
          id: 'quiz-js-s7-q4',
          type: 'blank',
          prompt: 'Which operator has the lowest precedence of all, so `a = b + 1` assigns the sum rather than assigning 1 first?',
          answers: ['=', 'assignment', 'equals'],
          explanation:
            'Assignment is looser than every arithmetic, comparison and logical operator, so the whole right-hand side is evaluated first and then stored. That is also why `a = b = 5` works: assignments associate right to left.',
        },
        {
          id: 'quiz-js-s7-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `let total = 0
if (total = 10) {
  console.log('over budget')
}`,
          options: [
            '`=` assigns and then hands back 10, which is truthy, so the branch always runs — the test wants `===`',
            '`total` must be declared with `var` before it can be compared',
            'An `if` cannot contain an assignment at all',
            'Nothing — this correctly tests whether total equals 10',
          ],
          answer: 0,
          explanation:
            'Assignment is an expression that produces the assigned value, so this sets `total` to 10 and tests a truthy number. It never fails loudly. Use `total === 10` for the comparison and keep the assignment on its own line.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* js-s8 — Data types                                                  */
  /* ------------------------------------------------------------------ */
  {
    id: 'js-s8',
    title: 'Data types',
    description: 'What a value is made of, how to find out, and what happens when two different types meet in one expression.',
    lessons: [
      {
        id: 'js-l11',
        title: 'Values and types',
        description: 'Every value has a type, and the type decides what you are allowed to do with it.',
        duration: 6,
        objectives: [
          'Name the seven primitives and recognise everything else as an object',
          'Use typeof to inspect a value, including undeclared names',
          'Tell undefined apart from null',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l11-b1',
            body: 'There are seven primitive types: **string**, **number**, **boolean**, **null**, **undefined**, **symbol** and **bigint**. A primitive is a single value with no inside — you cannot add a property to the number 3 and have it stick. Everything else is an object, arrays included, which is why `typeof []` says `"object"`.',
          },
          {
            type: 'demo',
            id: 'j-l11-d1',
            title: 'Ask the input what it is',
            body: 'Everything typed into a field is a string, including the numbers. Type 42, then 0, then clear the box completely and watch the type name and the truthiness change with the content.',
            html: `<label for="v">Type anything</label>
<input id="v" value="42" />
<p id="out">waiting…</p>`,
            javascript: `const input = document.querySelector('#v')
const out = document.querySelector('#out')

function describe() {
  const value = input.value
  out.textContent =
    'value: "' + value + '" / typeof: ' + typeof value +
    ' / length: ' + value.length + ' / truthy: ' + Boolean(value)
}

input.addEventListener('input', describe)
describe()`,
          },
          {
            type: 'heading',
            id: 'j-l11-h1',
            level: 3,
            body: 'The everyday three',
          },
          {
            type: 'list',
            id: 'j-l11-l1',
            style: 'bullet',
            items: [
              '**string** — text in quotes. `\'Lisbon\'`, `"42"`, `\'\'`. Anything in quotes, even a number, is a string.',
              '**number** — one number type for everything. Integers and decimals are the same type, and `42` and `42.0` are indistinguishable at runtime.',
              '**boolean** — exactly two values, `true` and `false`. Anything that is a test produces one of these.',
            ],
          },
          {
            type: 'code',
            id: 'j-l11-c1',
            language: 'javascript',
            title: 'Asking a value what it is',
            code: `console.log(typeof 'hello')   // 'string'
console.log(typeof 42)        // 'number'
console.log(typeof true)      // 'boolean'
console.log(typeof undefined) // 'undefined'
console.log(typeof {})        // 'object'
console.log(typeof [])        // 'object' — arrays are objects
console.log(typeof (() => 1)) // 'function'`,
          },
          {
            type: 'heading',
            id: 'j-l11-h2',
            level: 3,
            body: 'The one place typeof lies',
          },
          {
            type: 'text',
            id: 'j-l11-b2',
            body: '`typeof null` returns `"object"`. It is not a subtle truth, it is a bug from 1995 that had to be kept forever because old code depended on it. Never test the type to find out whether something is null — compare it: `value === null`. Two other honest-but-unhelpful answers: `NaN` reports `"number"` because it genuinely is one, just not a valid one, so use `Number.isNaN(value)`; and `typeof` on an undeclared name returns `"undefined"` instead of throwing, which is exactly what makes it a safe existence check.',
          },
          {
            type: 'code',
            id: 'j-l11-c2',
            language: 'javascript',
            title: 'The reliable existence check',
            code: `console.log(typeof undeclaredName)   // 'undefined', no error

if (typeof undeclaredName !== 'undefined') {
  console.log(undeclaredName)
}`,
          },
          {
            type: 'heading',
            id: 'j-l11-h3',
            level: 3,
            body: 'undefined versus null',
          },
          {
            type: 'text',
            id: 'j-l11-b3',
            body: 'Both mean "no value", and they are easy to mix up. `undefined` is what JavaScript gives you when nothing was assigned: a variable declared with no value, a missing object key, a function called with too few arguments. `null` is a value *you* choose, meaning "deliberately nothing here" — a form field you have cleared, a slot in a list that is intentionally empty. The practical rule: if nothing assigned it, it will be `undefined`; if you typed `null`, it is `null`.',
          },
          {
            type: 'tip',
            id: 'j-l11-t1',
            title: 'Use typeof on undeclared names only',
            body: '`typeof undeclared` is safe, but *reading* an undeclared name is not — `console.log(undeclared)` is a ReferenceError. When you need the value rather than the type, declare it with a default (`let count = 0`) so the question never comes up.',
          },
          {
            type: 'example',
            id: 'j-l11-e1',
            title: 'Types rendered onto the page',
            body: 'Every value below is rendered into the document so you can see the type name next to the value itself. Watch the last two lines: the array and the object both report `object`.',
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
            id: 'j-l11-x1',
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
                  id: 'ex-js-typeof-describe-t1',
                  label: 'describe is a function',
                  body: `return typeof describe === 'function' ? true : 'Define a function called describe.';`,
                },
                {
                  id: 'ex-js-typeof-describe-t2',
                  label: 'It recognises strings and numbers',
                  body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe('hi') === 'string' && describe(42) === 'number'
  ? true
  : 'A string must give "string" and a number must give "number".';`,
                },
                {
                  id: 'ex-js-typeof-describe-t3',
                  label: 'It recognises booleans',
                  body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe(true) === 'boolean' && describe(false) === 'boolean'
  ? true
  : 'Both true and false are booleans.';`,
                },
                {
                  id: 'ex-js-typeof-describe-t4',
                  label: 'null and objects fall through to "other"',
                  body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe(null) === 'other' && describe([1, 2]) === 'other' && describe({}) === 'other'
  ? true
  : 'Only string, number and boolean get a specific answer — everything else is "other".';`,
                },
              ],
              hints: [
                'A type name is available as a string on any value: `typeof value` already gives you exactly the words you need.',
                'Compare `typeof value` against the three names, and return "other" as the last branch so there is always a result.',
                'A `switch` reads well here: `switch (typeof value) { case "string": return "string"; case "number": return "number"; case "boolean": return "boolean"; default: return "other" }`',
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
              testNotes:
                'These checks call your function with several values, so they pass only if the answer comes from the type of the argument rather than a hard-coded name.',
            },
          },
        ],
      },
      {
        id: 'js-l12',
        title: 'typeof and type conversion',
        description: 'Find out what type a value really is, then convert deliberately — because JavaScript will convert on its own if you let it.',
        duration: 6,
        objectives: [
          'Tell implicit conversion apart from explicit conversion',
          'Convert deliberately with String(), Number() and Boolean()',
          'Know which values are falsy, and why "0" is not one',
          'Use typeof to find out which type a value arrived as',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l12-b1',
            body: 'Every value you get from outside your own code is a string. A number typed into an input field, a quantity from a URL parameter, a price from an API — all of it arrives as text. `typeof value` tells you which type you are actually holding before you use it, and it is the first thing to reach for when a value behaves strangely. Once you know, there are two answers available: convert silently (**implicit**) or on request (**explicit**). Implicit conversion is the one that produces the bugs, so the habit worth building is to make every conversion visible.',
          },
          {
            type: 'demo',
            id: 'j-l12-d1',
            title: 'The same field, added two ways',
            body: 'The field holds text, so `"5" + 2` joins the characters into 52. Converted first, the same two values add up to 7. Type anything you like and both figures update.',
            html: `<label for="n">Amount</label>
<input id="n" value="5" />
<p id="out">waiting…</p>`,
            javascript: `const input = document.querySelector('#n')
const out = document.querySelector('#out')

function update() {
  const raw = input.value
  out.textContent =
    'raw: "' + raw + '" (typeof ' + typeof raw + ')' +
    ' — raw + 2 = "' + (raw + 2) + '"' +
    ' — Number(raw) + 2 = ' + (Number(raw) + 2)
}

input.addEventListener('input', update)
update()`,
          },
          {
            type: 'heading',
            id: 'j-l12-h1',
            level: 3,
            body: 'Explicit conversion',
          },
          {
            type: 'list',
            id: 'j-l12-l1',
            style: 'bullet',
            items: [
              '`typeof value` — the type name as a string. Safe even on a name that was never declared, which makes it the safe existence check.',
              '`String(value)` — anything to text. Works on every type, including `null` and `undefined`.',
              '`Number(value)` — text to a number. Empty or blank text becomes `0`; anything that is not a number becomes `NaN`.',
              '`Boolean(value)` — to `true` or `false`, using the truthiness rules below.',
            ],
          },
          {
            type: 'code',
            id: 'j-l12-c1',
            language: 'javascript',
            title: 'Converting on purpose',
            code: `Number('3.14')     // 3.14
Number('')          // 0     — an empty field becomes zero
Number('99 88')     // NaN  — junk in, NaN out
Number(null)        // 0
Number(undefined)   // NaN

String(100 + 23)    // '123'
String(null)        // 'null'

const amount = Number('42')
console.log(amount + 8)   // 50 — real arithmetic`,
          },
          {
            type: 'warning',
            id: 'j-l12-w1',
            title: '"5" + 2 is "52", not 7',
            body: 'With `+`, if **either** side is a string, JavaScript converts the other side to a string too — which is why `"5" + 2` gives `"52"` and `"5" - 2` gives `3`. This is the classic "my total is wrong by a factor of ten" bug. Convert first, then add: `Number("5") + 2`.',
          },
          {
            type: 'code',
            id: 'j-l12-c2',
            language: 'javascript',
            title: 'The same three lines, three ways',
            code: `console.log('5' + 2)    // '52'  — concatenation
console.log('5' - 2)    // 3     — subtraction coerces
console.log('5' * '2')  // 10    — so does multiplication
console.log(+'5' + 2)  // 7     — unary plus is a Number() in disguise`,
          },
          {
            type: 'heading',
            id: 'j-l12-h2',
            level: 3,
            body: 'Number or parseInt?',
          },
          {
            type: 'text',
            id: 'j-l12-b3',
            body: '`Number()` is strict: the whole string has to be a number or you get `NaN`. `parseInt()` stops at the first character it cannot use and returns what it got, so `parseInt("42px")` gives `42` and `parseInt("abc")` gives `NaN`. For `"42"` and `"42px"` from a form, `Number()` is what you want — it refuses to invent a number out of a typo. Use `parseInt` when the number is genuinely the start of a longer string, and remember to give it the radix: `parseInt(value, 10)`.',
          },
          {
            type: 'heading',
            id: 'j-l12-h3',
            level: 3,
            body: 'Truthy and falsy',
          },
          {
            type: 'text',
            id: 'j-l12-b4',
            body: 'Every value can be used directly as a test. JavaScript asks one question: is this value one of the few that count as nothing? Exactly **seven** values are falsy — everything else, including a full object and an empty array, is truthy. This is why `if (list.length)` works and `if (list)` never does what you hoped.',
          },
          {
            type: 'list',
            id: 'j-l12-l2',
            style: 'bullet',
            items: [
              '`false`',
              '`0` and `-0`',
              '`\'\'` — the empty string, and a string of only spaces is **not** empty',
              '`null`',
              '`undefined`',
              '`NaN`',
              '`document.all`, which exists only to confuse people. Ignore it.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l12-t1',
            title: 'The "0" that is not falsy',
            body: 'The string `"0"` is truthy — it is not on the list, because it has characters in it. That catches people checking whether a field is empty: `if (value)` is true for `"0"`. Test for the empty case directly instead: `value === \'\'`, or `Number(value) === 0` when zero really is the value you are rejecting.',
          },
          {
            type: 'example',
            id: 'j-l12-e1',
            title: 'Converting a form value before you add it up',
            body: 'The number in the box is always a string. The line below converts it before multiplying, which is why the total is 24 and not "242".',
            html: `<label for="qty">Quantity</label>
<input id="qty" type="number" value="6" />
<p id="out">waiting…</p>`,
            javascript: `const qty = document.querySelector('#qty').value
const total = Number(qty) * 4

document.querySelector('#out').textContent =
  'total is ' + total + ' (typeof qty: ' + typeof qty + ')'`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l12-x1',
            exercise: {
              id: 'ex-js-convert',
              instructions:
                'The variable `raw` holds the string "12". Convert it explicitly to a number in a new `const` called `n`, then log `n + 8`. Log a second line containing the string "12" followed by 8, to show what happens without the conversion.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const raw = '12'

// Convert raw to a number in a const called n, then log n + 8.
// Then log raw + 8 to show the difference.

`,
              },
              expectedOutput: '20',
              tests: [
                {
                  id: 'ex-js-convert-t1',
                  label: 'n is the number 12',
                  body: `return typeof n !== 'undefined' && n === 12
  ? true
  : 'Declare n as a number: const n = Number(raw)';`,
                },
                {
                  id: 'ex-js-convert-t2',
                  label: 'The arithmetic line printed 20',
                  body: `var log = window.__log || [];
return log.indexOf('20') !== -1
  ? true
  : 'Log n + 8 and expect the line 20. Logged: ' + log.join(' | ');`,
                },
                {
                  id: 'ex-js-convert-t3',
                  label: 'The unconverted line printed "128"',
                  body: `var log = window.__log || [];
return log.indexOf('128') !== -1
  ? true
  : 'Log raw + 8 and expect the line 128, because the string wins.';`,
                },
              ],
              hints: [
                'Explicit conversion is a function call around the value: `Number(raw)`.',
                'A `const` with the name `n` on its own line: `const n = Number(raw)`.',
                'Then two separate logs: `console.log(n + 8)` gives 20, `console.log(raw + 8)` gives "128".',
              ],
              solution: {
                javascript: `const raw = '12'

const n = Number(raw)

console.log(n + 8)
console.log(raw + 8)`,
              },
              testNotes:
                'The checks look for both console lines, which is the whole point of the exercise: the same 12 behaves differently before and after conversion.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s8',
      title: 'Data types check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s8-q1',
          type: 'multiple-choice',
          prompt: 'What does `typeof null` return?',
          options: ['"object"', '"null"', '"undefined"', '"nothing"'],
          answer: 0,
          explanation:
            'It returns "object" — a bug from the very first version of the language that had to be kept because old programs depended on it. Never use the type to test for null; compare the value with `value === null`.',
        },
        {
          id: 'quiz-js-s8-q2',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `console.log(typeof [])
console.log(typeof NaN)
console.log(typeof (() => 1))`,
          options: [
            '"object" "object" "function"',
            '"array" "number" "function"',
            '"object" "number" "function"',
            '"object" "NaN" "arrow"',
          ],
          answer: 2,
          explanation:
            'Arrays are objects, which is why `typeof []` is "object". NaN really is a number — just not a valid one — so use `Number.isNaN` to detect it. A function reports "function" whether it was written with the keyword or as an arrow.',
        },
        {
          id: 'quiz-js-s8-q3',
          type: 'true-false',
          prompt: 'A number typed into an input field arrives in your code as a string.',
          answer: true,
          explanation:
            'Every field value is text, including digits. That is why `qty * 4` happens to work — `*` coerces — while `qty + 4` quietly joins the characters instead. Convert on purpose with `Number(value)` before you add.',
        },
        {
          id: 'quiz-js-s8-q4',
          type: 'blank',
          prompt: 'Which function converts text to a number, giving `NaN` when the whole string is not a number?',
          answers: ['number', 'number()'],
          explanation:
            '`Number("12abc")` is NaN, because it converts the whole thing or fails. `parseInt("12abc", 10)` returns 12, quietly believing it succeeded — use it only when the number really is the start of a longer string.',
        },
        {
          id: 'quiz-js-s8-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const qty = document.querySelector('#qty').value
const total = qty + 4
document.querySelector('#out').textContent = 'total: ' + total`,
          options: [
            'qty is a string, so + joins characters and the total reads 64 instead of 40 — convert with Number(qty)',
            'textContent cannot be given a concatenated string',
            'querySelector must be called with a class rather than an id',
            'Nothing — this adds the quantity correctly',
          ],
          answer: 0,
          explanation:
            'A field value is the string "6", and a string on either side of `+` turns the whole expression into concatenation. Write `Number(qty) + 4` so the arithmetic happens in numbers, then let the `+` in the sentence do the joining.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* js-s9 — Functions                                                   */
  /* ------------------------------------------------------------------ */
  {
    id: 'js-s9',
    title: 'Functions',
    description: 'Naming behaviour, passing it inputs, and reading the value a call hands back.',
    lessons: [
      {
        id: 'js-l13',
        title: 'Declaring and calling functions',
        description: 'Three ways to write one, why they are not quite interchangeable, and how a call hands a value back.',
        duration: 6,
        objectives: [
          'Write a declaration, an expression and an arrow function',
          'Call a function with arguments and read its return value',
          'Pick the form that fits the job',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l13-b1',
            body: 'A function is a named block of code you can run later, as often as you like, with different inputs each time. The reason to write one is not brevity — it is that a block with a name can be passed around, tested on its own and reasoned about without reading the whole program around it.',
          },
          {
            type: 'demo',
            id: 'j-l13-d1',
            title: 'One function, three calls',
            body: 'The same three lines of code run three times with three different pairs of arguments, and each call returns its own answer. That is the whole point of the parameters: the behaviour is written once.',
            html: `<p id="out">waiting…</p>`,
            javascript: `function area(width, height) {
  return width * height
}

const out = document.querySelector('#out')
const sizes = [[3, 4], [5, 2], [1.5, 2]]

out.textContent = sizes
  .map(function (size) {
    return size[0] + ' x ' + size[1] + ' = ' + area(size[0], size[1])
  })
  .join('   /   ')`,
          },
          {
            type: 'heading',
            id: 'j-l13-h1',
            level: 3,
            body: 'Declaration, expression, arrow',
          },
          {
            type: 'code',
            id: 'j-l13-c1',
            language: 'javascript',
            title: 'The same job, three syntaxes',
            code: `// declaration — hoisted, usable before it is written
function add(a, b) {
  return a + b
}

// expression — a value assigned to a variable, not hoisted
const double = function (n) {
  return n * 2
}

// arrow — no own this, no own arguments
const triple = (n) => n * 3`,
          },
          {
            type: 'text',
            id: 'j-l13-b2',
            body: 'A **declaration** is hoisted: the name exists before the line, value and all, so `add(2, 3)` works even when the call comes first. An **expression** is a function built inside a value, and nothing is available until the assignment runs — calling `double(4)` above its `const` throws. Every arrow is an expression, so arrows follow that rule even though they are written to look like declarations. The practical habit: define before you use, and order stops mattering.',
          },
          {
            type: 'heading',
            id: 'j-l13-h2',
            level: 3,
            body: 'Calling a function',
          },
          {
            type: 'code',
            id: 'j-l13-c2',
            language: 'javascript',
            title: 'The parentheses are what run it',
            code: `function area(width, height) {
  return width * height
}

console.log(area(3, 4))  // 12 — the parentheses are what run it
console.log(area)        // the function itself, not the result`,
          },
          {
            type: 'text',
            id: 'j-l13-b3',
            body: 'The values in the parentheses are **arguments**, matched to the declared **parameters** by position, which is why order matters more than names. `return` hands a value back to the caller and stops the function there, so anything written after a `return` never runs, and a function that falls off the end returns `undefined`. Writing `area` where you meant `area(3, 4)` — in an event listener, in a `setTimeout`, in a `map` callback — passes a function object around instead of calling it.',
          },
          {
            type: 'warning',
            id: 'j-l13-w1',
            title: 'Return, do not print',
            body: 'A function that logs is hard to reuse: you cannot do arithmetic with a log line, and you cannot test it without reading the console. Return the value and let the caller decide whether to print it, store it in a variable or put it on the page. Printing belongs to the code that knows where the answer should go.',
          },
          {
            type: 'heading',
            id: 'j-l13-h3',
            level: 3,
            body: 'Choosing a form',
          },
          {
            type: 'list',
            id: 'j-l13-l1',
            style: 'bullet',
            items: [
              '**Declaration** for anything the file needs regardless of order, and for functions you want to hoist.',
              '**Expression** when the function is a value: stored in a variable, put in an array, handed to something that expects a callback.',
              '**Arrow** for short callbacks and array methods. Avoid it for object methods that need `this`, and for constructors.',
            ],
          },
          {
            type: 'example',
            id: 'j-l13-e1',
            title: 'A button that counts its own clicks',
            body: 'The click handler is an arrow function, so it can see the `count` variable declared just above it. A `function () {}` handler with its own `this` could not.',
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
            id: 'j-l13-x1',
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
                  id: 'ex-js-arrow-even-t1',
                  label: 'isEven is defined',
                  body: `return typeof isEven === 'function' ? true : 'Define a function called isEven.';`,
                },
                {
                  id: 'ex-js-arrow-even-t2',
                  label: 'Even numbers give true',
                  body: `if (typeof isEven !== 'function') return 'Define a function called isEven.'
return isEven(4) === true && isEven(10) === true
  ? true
  : 'isEven(4) and isEven(10) should both return true.';`,
                },
                {
                  id: 'ex-js-arrow-even-t3',
                  label: 'Odd numbers give false',
                  body: `if (typeof isEven !== 'function') return 'Define a function called isEven.'
return isEven(7) === false && isEven(0.5) === false
  ? true
  : 'isEven(7) and isEven(0.5) should both return false.';`,
                },
                {
                  id: 'ex-js-arrow-even-t4',
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
              testNotes: 'The checks only see the four return values. They cannot tell an arrow function from a declaration, so either shape passes.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s9',
      title: 'Functions check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s9-q1',
          type: 'multiple-choice',
          prompt: 'What does a function return when it finishes without an explicit `return`?',
          options: ['null', 'undefined', '0', 'An empty string'],
          answer: 1,
          explanation:
            'Falling off the end gives `undefined`, which is different from returning `0` or `""`. That is why a default parameter rescues a missing argument — `undefined` is exactly the value that triggers a default.',
        },
        {
          id: 'quiz-js-s9-q2',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const double = function (n) {
  return n * 2
}
console.log(typeof double, double(4))`,
          options: ['"number" 8', '"function" 8', '"function" undefined', '"number" "8"'],
          answer: 1,
          explanation:
            'A function expression is still a function value, so `typeof` reports "function" — and the parentheses in `double(4)` are what run it. Without them you would be logging the function itself.',
        },
        {
          id: 'quiz-js-s9-q3',
          type: 'true-false',
          prompt: 'A function declaration can be called from a line above the declaration itself.',
          answer: true,
          explanation:
            'Declarations are hoisted with their bodies attached, so the name exists from the top of the scope. A `const double = function...` in the same position would not: the name is reserved but empty until the assignment runs, which is the temporal dead zone.',
        },
        {
          id: 'quiz-js-s9-q4',
          type: 'blank',
          prompt: 'Which keyword introduces a named function that is available from the top of its scope?',
          answers: ['function', 'function keyword', 'fn'],
          explanation:
            '`function add() {}` is a declaration, and declarations are hoisted. Anything assigned to a `const` — including a function expression and every arrow — is only usable after that line has run.',
        },
        {
          id: 'quiz-js-s9-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const area = (w, h) => {
  return w * h
}
document.querySelector('#out').addEventListener('click', area)`,
          options: [
            'The handler is passed as a value rather than called, so clicking gives you the function instead of an area — wrap it: () => area(3, 4)',
            'Arrow functions cannot be used as event handlers',
            'addEventListener needs the handler to be an expression, not a declaration',
            'Nothing — this computes an area on every click',
          ],
          answer: 0,
          explanation:
            'Handing `area` to `addEventListener` is correct — the browser calls it with the event object, which then becomes `w`. The mistake is expecting it to receive the dimensions. Wrap it in an arrow that supplies the arguments: `addEventListener("click", () => area(3, 4))`.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* js-s10 — Objects                                                    */
  /* ------------------------------------------------------------------ */
  {
    id: 'js-s10',
    title: 'Objects',
    description: 'Named data with behaviour attached, and the ways of taking it apart and reshaping it.',
    lessons: [
      {
        id: 'js-l14',
        title: 'Objects, properties and methods',
        description: 'Keyed collections, how to read and write them, and methods that know their own object.',
        duration: 6,
        objectives: [
          'Build an object literal and explain what a property is',
          'Read and write properties with dot and bracket notation',
          'Write a method that uses this, and list what an object contains',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l14-b1',
            body: 'A plain variable holds one value. An object holds a set of them, each behind a name you choose. That is the entire idea: `name: value` pairs wrapped in braces. Reach for an object whenever you are describing **one thing with several facts about it** — a user, a product, a cart — and the names make the code read like a sentence. A value can be any type, including a list: arrays are objects too, so `tags: [\'input\', \'desk\']` is a perfectly ordinary property.',
          },
          {
            type: 'demo',
            id: 'j-l14-d1',
            title: 'An object that updates the page',
            body: 'The counter is a property, the method knows which object it belongs to through `this`, and the click handler only has to say what should change. Nothing on the page is being read back out of the markup.',
            html: `<button id="add">Add a review</button>
<p id="out">waiting…</p>`,
            javascript: `const product = { name: 'Keyboard', price: 49, reviews: 12 }
const out = document.querySelector('#out')

function label() {
  return product.name + ' — ' + product.price + ' — ' + product.reviews + ' reviews'
}

document.querySelector('#add').addEventListener('click', function () {
  product.reviews += 1
  out.textContent = label()
})

out.textContent = label()`,
          },
          {
            type: 'heading',
            id: 'j-l14-h1',
            level: 3,
            body: 'Object literals',
          },
          {
            type: 'code',
            id: 'j-l14-c1',
            language: 'javascript',
            title: 'Four properties, four types',
            code: `// Each line is one property: a name, a colon, then a value.
// Declare with const: the binding never moves, even if the properties do.
const product = {
  name: 'Keyboard',        // text
  price: 49,               // a number
  tags: ['input', 'desk'], // a list
  inStock: true,           // yes or no
}
console.log(product.name)   // Keyboard`,
          },
          {
            type: 'heading',
            id: 'j-l14-h2',
            level: 3,
            body: 'Reading and writing properties',
          },
          {
            type: 'code',
            id: 'j-l14-c2',
            language: 'javascript',
            title: 'Two ways in, two ways to change',
            code: `product.name                // dot access
product['price']            // brackets give the same result
const key = 'name'
product[key]                // a name only known at runtime
product.nationality = 'UK'   // add a property
delete product.inStock      // remove one entirely`,
          },
          {
            type: 'text',
            id: 'j-l14-b2',
            body: 'Dot access needs a real JavaScript name after the dot. Reach for brackets when the name holds a dash or a space, starts with a digit, or is only known at runtime: `form.elements[\'email-address\']` and `product[key]` both work where `product.email - address` would be read as subtraction. Brackets are fine for ordinary names too, so the only rule that matters is *brackets whenever you cannot type the name straight after a dot*.',
          },
          {
            type: 'heading',
            id: 'j-l14-h3',
            level: 3,
            body: 'Methods and this',
          },
          {
            type: 'code',
            id: 'j-l14-c3',
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
            id: 'j-l14-b3',
            body: 'A method is a function stored on the object. Inside a normal `function` method, `this` is the object the method was called on, which is how `count` reads its own items without being told what to work on. Two rules follow. Call a method with `()` — `cart.label` on its own hands you the function, not the answer. And do not pull a method off the object before calling it: `const { label } = cart` loses `this` and the call throws. An arrow function has no `this` of its own, which is why an arrow never works as a method here.',
          },
          {
            type: 'warning',
            id: 'j-l14-w1',
            title: 'Nested access can fail on missing keys',
            body: 'If `user` exists but `user.address.city` does not, the expression throws a TypeError and everything after it stops running. Guard with optional chaining — `user.address?.city` — which gives `undefined` instead of stopping the program. Nesting is also where the bracket rule earns its keep: `myObj[\'cars\'][\'car2\']` is `myObj.cars.car2` written so it survives names held in variables.',
          },
          {
            type: 'heading',
            id: 'j-l14-h4',
            level: 3,
            body: 'Listing what is inside',
          },
          {
            type: 'code',
            id: 'j-l14-c4',
            language: 'javascript',
            title: 'Keys, values and pairs',
            code: `Object.keys(product)    // ['name', 'price', 'tags', 'inStock']
Object.values(product)  // the values, in the same order
Object.entries(product) // [['name', 'Keyboard'], ...] — pairs`,
          },
          {
            type: 'example',
            id: 'j-l14-e1',
            title: 'An object rendered as a summary',
            body: 'Entries turns an object into text without changing the object itself. Every line writes with `textContent`, so a value containing markup shows up as characters rather than as elements.',
            html: `<ul id="out"></ul>`,
            javascript: `const user = { name: 'Ada', role: 'admin', active: true }
const out = document.querySelector('#out')
Object.entries(user).forEach(function ([key, value]) {
  const item = document.createElement('li')
  item.textContent = key + ': ' + String(value)
  out.appendChild(item)
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l14-x1',
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
                  id: 'ex-js-object-method-t1',
                  label: 'The cart object has a label method',
                  body: `if (typeof cart === 'undefined') return 'Keep the cart object.'
return typeof cart.label === 'function' ? true : 'Add a label() method inside the cart object, next to count().';`,
                },
                {
                  id: 'ex-js-object-method-t2',
                  label: 'The existing count method still works',
                  body: `if (typeof cart === 'undefined') return 'Keep the cart object.'
if (typeof cart.count !== 'function') return 'Keep the existing count() method.'
return cart.count() === 2 ? true : 'Do not remove or rename the count method.';`,
                },
                {
                  id: 'ex-js-object-method-t3',
                  label: 'label() returns "Cart: 2 items"',
                  body: `if (typeof cart === 'undefined' || typeof cart.label !== 'function') return 'Add a label() method to the cart object.'
return cart.label() === 'Cart: 2 items' ? true : 'Expected Cart: 2 items, got: ' + cart.label();`,
                },
                {
                  id: 'ex-js-object-method-t4',
                  label: 'The label reflects the current item count',
                  body: `if (typeof cart === 'undefined' || typeof cart.label !== 'function') return 'Add a label() method to the cart object.'
var saved = cart.items
cart.items = ['Tea']
var result = cart.label()
cart.items = saved
return result === 'Cart: 1 item' ? true : 'label() must read this.count() each time — one item should give "Cart: 1 item", got: ' + result;`,
                },
              ],
              hints: [
                'Add the method inside the object literal, after `count()`, separated by a comma.',
                'The method needs a name, a parameter list, and a body: `label() { ... }`.',
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
              testNotes:
                'The last check swaps the items out from under the object and calls the method again, so it only passes if `label()` reads `this.count()` at call time rather than baking in a number.',
            },
          },
        ],
      },
      {
        id: 'js-l15',
        title: 'Copying and transforming objects',
        description: 'Pull values out in one readable line, copy them out without touching the original, and survive the key that is not there.',
        duration: 6,
        objectives: [
          'Destructure objects and arrays, with defaults and renaming',
          'Use spread to copy and merge without touching the original',
          'Reach for optional chaining and nullish coalescing on missing data',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l15-b1',
            body: 'Destructuring is the inverse of writing an object literal. Instead of naming each value as you store it, you write the names you **want** on the left of the `=` and JavaScript works out where each one comes from. The gain is readability: `const { name, role } = user` says what you are after, where `const name = user.name` says how to fetch it and leaves the reader to notice it happens twice.',
          },
          {
            type: 'demo',
            id: 'j-l15-d1',
            title: 'A copy that is only a copy at the top',
            body: 'The first line renames nothing and changes nothing on the original object. The second adds a key to a copy. The third reaches inside the copy — and the original changes too, because spread copies one level deep.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const user = { name: 'Ada', role: 'admin', prefs: { theme: 'dark' } }

const { name, role } = user
const next = { ...user, role: 'guest' }
next.prefs.theme = 'light'

document.querySelector('#out').textContent =
  'name: ' + name + ' / role: ' + role +
  ' / next.role: ' + next.role +
  ' / next.prefs.theme: ' + next.prefs.theme +
  ' / user.prefs.theme: ' + user.prefs.theme +
  ' / same prefs object: ' + (next.prefs === user.prefs)`,
          },
          {
            type: 'heading',
            id: 'j-l15-h1',
            level: 3,
            body: 'Destructuring objects',
          },
          {
            type: 'code',
            id: 'j-l15-c1',
            language: 'javascript',
            title: 'Rename and default',
            code: `const user = { name: 'Ada', role: 'admin', email: 'ada@codeingot.dev' }
const { name, role } = user                      // name 'Ada', role 'admin'
const { name: displayName } = user              // renamed on the way out
const { role = 'guest', country = 'UK' } = user  // defaults for missing keys
console.log(displayName, country)                // Ada UK`,
          },
          {
            type: 'heading',
            id: 'j-l15-h2',
            level: 3,
            body: 'Destructuring arrays',
          },
          {
            type: 'code',
            id: 'j-l15-c2',
            language: 'javascript',
            title: 'Positions, skips and the rest',
            code: `const [first, second] = ['Ada', 'Bo']  // positions, in order
const [a, , third] = ['x', 'y', 'z']    // a blank skips a slot
const [head, ...tail] = [1, 2, 3, 4]    // 1, then [2, 3, 4]
let i = 1
let j = 2
;[i, j] = [j, i]   // swap — see the tip below`,
          },
          {
            type: 'heading',
            id: 'j-l15-h3',
            level: 3,
            body: 'Nested destructuring',
          },
          {
            type: 'code',
            id: 'j-l15-c3',
            language: 'javascript',
            title: 'Reaching down, and collecting the rest',
            code: `const order = {
  id: 4471,
  customer: { name: 'Ada', address: { city: 'Leeds' } },
}
const { customer: { name, address: { city } } } = order
// name 'Ada', city 'Leeds'
const { id, ...meta } = order
// id 4471, meta everything else — drops a key without deleting it`,
          },
          {
            type: 'heading',
            id: 'j-l15-h4',
            level: 3,
            body: 'Spread: copy and merge',
          },
          {
            type: 'code',
            id: 'j-l15-c4',
            language: 'javascript',
            title: 'The last one wins',
            code: `const defaults = { theme: 'dark', lang: 'en' }
const settings = { ...defaults, lang: 'fr' }
// { theme: 'dark', lang: 'fr' } — the later value overrides
const copy = { ...defaults }   // a separate object
copy.theme = 'light'           // defaults is untouched`,
          },
          {
            type: 'tip',
            id: 'j-l15-t1',
            title: 'A spread copy is one level deep',
            body: '`{ ...user }` makes a new object but hands over the *same* references inside it, so `copy.prefs.theme = "light"` also changes `user.prefs.theme`. When the nested data matters, spread each level: `{ ...user, prefs: { ...user.prefs } }`, or rebuild the nested part outright.',
          },
          {
            type: 'tip',
            id: 'j-l15-t2',
            title: 'Assignment without a keyword needs parentheses',
            body: 'A line that starts with `{` is parsed as a block, not an object, so a bare destructuring assignment fails in a way that looks unrelated. Write `;({ a } = obj)` with a leading semicolon or parentheses, or use `const` and avoid the problem entirely. A swap needs the keyword version: `let [a, b] = [1, 2]` first, then `[a, b] = [b, a]`.',
          },
          {
            type: 'heading',
            id: 'j-l15-h5',
            level: 3,
            body: 'When a key is missing',
          },
          {
            type: 'code',
            id: 'j-l15-c5',
            language: 'javascript',
            title: '?. and ??',
            code: `const user = { name: 'Ada' }
console.log(user.address?.city)              // undefined — no crash
console.log(user.address?.city ?? 'Unknown')  // Unknown
console.log(user.role ?? 'guest')            // guest
console.log({ points: 0 }.points ?? 10)      // 0 — ?? only replaces null/undefined`,
          },
          {
            type: 'example',
            id: 'j-l15-e1',
            title: 'Destructuring a form value',
            body: 'The input event gives you one object; destructuring keeps the handler readable.',
            html: `<label for="email">Email</label>
<input id="email" type="email" value="ada@codeingot.dev" />
<p id="out">waiting...</p>`,
            javascript: `const input = document.querySelector('#email')
const out = document.querySelector('#out')
input.addEventListener('input', function () {
  const { value } = input
  out.textContent = 'Domain: ' + (value.split('@')[1] || 'no domain yet')
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l15-x1',
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
                  id: 'ex-js-destructure-t1',
                  label: 'A variable called name now holds "Ada"',
                  body: `return typeof name !== 'undefined' && name === 'Ada' ? true : 'Use: const { name, email } = user';`,
                },
                {
                  id: 'ex-js-destructure-t2',
                  label: 'A variable called email now holds the address',
                  body: `return typeof email !== 'undefined' && email === 'ada@codeingot.dev' ? true : 'Extract both properties in one destructuring statement.';`,
                },
                {
                  id: 'ex-js-destructure-t3',
                  label: 'The user object is intact',
                  body: `if (typeof user === 'undefined') return 'Keep the original user object.'
return user && user.name === 'Ada' && user.role === 'admin' ? true : 'Destructuring reads values — it must not change the original object.';`,
                },
                {
                  id: 'ex-js-destructure-t4',
                  label: 'Both values were logged',
                  body: `var log = (window.__log || []).join(' | ')
return log.indexOf('Ada') > -1 && log.indexOf('ada@codeingot.dev') > -1 ? true : 'Log each value on its own line, for example console.log(name) then console.log(email).';`,
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
              testNotes: 'Nothing here checks that you typed the braces — `const name = user.name` would pass the first three checks too. They are value checks, not syntax checks.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s10',
      title: 'Objects check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s10-q1',
          type: 'multiple-choice',
          prompt: 'Which line reads the "theme-color" property out of this object?',
          code: `const settings = { 'theme-color': 'dark' }
const key = 'theme-color'`,
          options: [
            'settings.key',
            "settings['key']",
            'settings[key]',
            'None of them work, because the name contains a dash',
          ],
          answer: 2,
          explanation:
            '`settings[key]` looks up whatever string the variable holds, so it finds the property. The other two ask for a property literally called "key", which does not exist — and the dash is a second reason dot access could never work here.',
        },
        {
          id: 'quiz-js-s10-q2',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const base = { theme: 'dark' }
const copy = { ...base, theme: 'light' }
console.log(base.theme, copy.theme)`,
          options: ['light light', 'dark light', 'dark dark', 'light dark'],
          answer: 1,
          explanation:
            'The spread builds a new object, so the later `theme` overrides only the copy. `base` still points at the original object with its original value — that is the whole reason to copy before changing.',
        },
        {
          id: 'quiz-js-s10-q3',
          type: 'true-false',
          prompt: '`const { a } = obj` creates a copy of `obj` that is safe to change.',
          answer: false,
          explanation:
            'It creates two new variables holding the values that were inside. The object is not copied and nothing is isolated — if `a` is itself an object, both names now point at the same one.',
        },
        {
          id: 'quiz-js-s10-q4',
          type: 'blank',
          prompt: 'Which method gives you an array of an object\'s own key names?',
          answers: ['object.keys', 'objectkeys', 'keys', 'object.keys()'],
          explanation:
            '`Object.keys(obj)` returns the names, `Object.values(obj)` the values, and `Object.entries(obj)` the pairs. `for…in` walks inherited keys too, which is why the Object methods are the better default.',
        },
        {
          id: 'quiz-js-s10-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const cart = {
  items: ['Tea'],
  count() {
    return this.items.length
  },
}
const { count } = cart
console.log(count())`,
          options: [
            'Pulling count off the object loses `this`, so the call throws — call it as cart.count()',
            'Destructuring cannot read a method',
            'count is a reserved word',
            'Nothing — it returns 1',
          ],
          answer: 0,
          explanation:
            'The destructured `count` is a bare function reference with no object attached, so `this` inside it is not the cart and `this.items` fails. Keep the call on the object, or bind it explicitly.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* js-s11 — Events                                                     */
  /* ------------------------------------------------------------------ */
  {
    id: 'js-s11',
    title: 'Events',
    description: 'The browser telling your code that something happened, and how to listen for it.',
    lessons: [
      {
        id: 'js-l16',
        title: 'Events and event handlers',
        description: 'Listen for a click, a keystroke or a submission, read the event object, and stop the browser doing the thing you did not want.',
        duration: 6,
        objectives: [
          'Attach a handler with addEventListener and remove it again by reference',
          'Name the events you will use most and when each one fires',
          'Read target, key and value off the event object',
          'Stop a form submitting or a link navigating with preventDefault',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l16-b1',
            body: 'An **event** is something that happened, named and reported by the browser: a click, a keystroke, the page finishing loading, a form being submitted. An **event handler** is the function you hand over to be told when it happens. JavaScript runs your handler *after* the event has already happened, which is why handlers read the current state of the page rather than change it before something occurs.',
          },
          {
            type: 'demo',
            id: 'j-l16-d1',
            title: 'Two buttons, two handlers, one counter',
            body: 'The count lives in a `let` between the two listeners, so both handlers work on the same value and the page never has to be read back out of the markup. The reset button is the reason the counter is worth having.',
            html: `<button id="add">+1</button>
<button id="reset">Reset</button>
<p id="out">0</p>`,
            javascript: `const out = document.querySelector('#out')
let count = 0

function show() {
  out.textContent = count
}

document.querySelector('#add').addEventListener('click', function () {
  count += 1
  show()
})
document.querySelector('#reset').addEventListener('click', function () {
  count = 0
  show()
})`,
          },
          {
            type: 'heading',
            id: 'j-l16-h1',
            level: 3,
            body: 'addEventListener, and what it takes',
          },
          {
            type: 'code',
            id: 'j-l16-c1',
            language: 'javascript',
            title: 'The one call you need',
            code: `button.addEventListener('click', function (event) {
  console.log('clicked', event.type)
})

// the short form, when the handler does not need the event
button.addEventListener('click', () => {
  count += 1
})`,
          },
          {
            type: 'text',
            id: 'j-l16-b2',
            body: 'Three arguments, and the first two are all most listeners ever use. The **type** is the event name as a string. The **handler** is a function — and passing a function reference, not a call, is what tells the browser to hold on to it and run it later. The third argument is optional and takes an options object: `{ once: true }` runs the handler a single time and then removes it, and `{ passive: true }` promises you will not stop the event, which lets the browser scroll without waiting for you. `button.onclick = handler` also works and is easier to read, but it replaces whatever was there before, where `addEventListener` adds.',
          },
          {
            type: 'list',
            id: 'j-l16-l1',
            style: 'bullet',
            items: [
              '`click` — the pointer pressed and released on the element.',
              '`input` — fires on every keystroke, paste and clear in a field. This is the one to use for live validation.',
              '`change` — fires when the field loses focus with a new value. Fewer events than `input`, so use it for selects and checkboxes.',
              '`keydown` and `keyup` — `event.key` gives the character, so you can react to Enter without listening for every key.',
              '`submit` — fires on the form, not the button, and only after the browser has decided the form is valid.',
              '`focus` and `blur` — a field gaining or losing attention, which is what you need for inline errors.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l16-h2',
            level: 3,
            body: 'The event object',
          },
          {
            type: 'code',
            id: 'j-l16-c2',
            language: 'javascript',
            title: 'What the browser hands your handler',
            code: `input.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    console.log('submitted with', input.value)
  }
})

form.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log('the browser is not navigating')
})`,
          },
          {
            type: 'text',
            id: 'j-l16-b3',
            body: 'The browser passes one object to the handler, and it describes what happened. `event.type` is the name of the event, `event.key` is the character typed, `event.target` is the element the event started on, and `event.currentTarget` is the element your listener is attached to. Those two are the same almost always, and different the moment you use **event delegation** — where one listener sits on a parent and handles clicks on its children.',
          },
          {
            type: 'warning',
            id: 'j-l16-w1',
            title: 'preventDefault, not return false',
            body: 'A form submitted by a listener reloads the page and throws away your state, because the browser does what forms do. Call `event.preventDefault()` inside the handler and the navigation is cancelled while everything else about the event carries on. `return false` only ever works on an inline `onsubmit` attribute, does nothing in `addEventListener`, and in a delegated listener it cancels the event rather than the default behaviour.',
          },
          {
            type: 'heading',
            id: 'j-l16-h3',
            level: 3,
            body: 'Taking the listener off again',
          },
          {
            type: 'code',
            id: 'j-l16-c3',
            language: 'javascript',
            title: 'removeEventListener wants the same function back',
            code: `function onKey(event) {
  if (event.key === 'Escape') closePanel()
}

document.addEventListener('keydown', onKey)
document.removeEventListener('keydown', onKey)   // gone

// an anonymous handler cannot be removed, because nothing holds a reference
document.addEventListener('click', function () {
  // you can never match this later
})`,
          },
          {
            type: 'tip',
            id: 'j-l16-t1',
            title: 'Give a handler a name if you might remove it',
            body: 'Removal works by identity: the browser compares the function you pass to `removeEventListener` with the one it stored. A second `function () {}` is a different function even when the two look identical, so an anonymous listener lives until the page unloads. Naming it costs one identifier and makes the teardown possible.',
          },
          {
            type: 'example',
            id: 'j-l16-e1',
            title: 'One listener, many rows',
            body: 'There is a single click listener on the list, not one per row. The handler reads event.target to work out which row was clicked, and the logged text sits inside an attribute where a selector can find it later.',
            html: `<ul id="list">
  <li><button class="pick" data-name="Ada">Pick Ada</button></li>
  <li><button class="pick" data-name="Bo">Pick Bo</button></li>
  <li><button class="pick" data-name="Cleo">Pick Cleo</button></li>
</ul>
<p id="out">nothing chosen yet</p>`,
            javascript: `const out = document.querySelector('#out')

document.querySelector('#list').addEventListener('click', function (event) {
  const button = event.target.closest('.pick')
  if (!button) return
  out.textContent = 'You chose ' + button.getAttribute('data-name')
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l16-x1',
            exercise: {
              id: 'ex-js-event-counter',
              instructions:
                'Build a click counter. Add a button with the id `add` and a paragraph with the id `out` that starts by reading "0". Attach a `click` listener to the button that raises the number by one and writes the new number into `#out` as text. Clicking four times should leave "4" in the paragraph.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<!-- A button with id "add", and a paragraph with id "out" that reads 0. -->
`,
                javascript: `// Listen for clicks on #add and raise the number in #out by one.

`,
              },
              expectedOutput: '4',
              tests: [
                {
                  id: 'ex-js-event-counter-t1',
                  label: 'There is a button with the id add',
                  body: `var button = document.querySelector('#add')
return button ? true : 'Add an element like <button id="add"> that a person can click.';`,
                },
                {
                  id: 'ex-js-event-counter-t2',
                  label: 'There is an element with the id out for the number',
                  body: `var out = document.querySelector('#out')
return out ? true : 'Add an element like <p id="out"> for the count to be written into.';`,
                },
                {
                  id: 'ex-js-event-counter-t3',
                  label: 'One click raises the number to 1',
                  body: `var button = document.querySelector('#add')
var out = document.querySelector('#out')
if (!button) return 'Add a button with id add.'
if (!out) return 'Add an element with id out.'
button.click()
var after = String(out.textContent).trim()
return after === '1' ? true : 'After one click #out should read 1, got: ' + after;`,
                },
                {
                  id: 'ex-js-event-counter-t4',
                  label: 'Every further click adds one more',
                  body: `var button = document.querySelector('#add')
var out = document.querySelector('#out')
if (!button) return 'Add a button with id add.'
if (!out) return 'Add an element with id out.'
button.click()
button.click()
var after = String(out.textContent).trim()
return after === '2' ? true : 'Two clicks should leave 2 in #out — read the current number, add one, write it back. Got: ' + after;`,
                },
              ],
              hints: [
                'Read the current number out of the element before you change it: `var current = Number(out.textContent)`. Writing a fresh `0` into the element from the handler is the mistake that makes the count never get past 1.',
                'Keep the running number in a `let` next to the listener instead. `let count = 0`, then the handler does `count += 1` and writes `count` into `#out`.',
                'The whole listener is three lines: query the button, addEventListener on "click", and inside it raise the count and set textContent on the paragraph.',
              ],
              solution: {
                html: `<button id="add">+1</button>
<p id="out">0</p>`,
                javascript: `const button = document.querySelector('#add')
const out = document.querySelector('#out')

let count = 0

button.addEventListener('click', function () {
  count += 1
  out.textContent = count
})`,
              },
              testNotes:
                'The last two checks click the button for you and then read the paragraph, so they only pass if the handler is genuinely attached and adds one per click.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s11',
      title: 'Events check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s11-q1',
          type: 'multiple-choice',
          prompt: 'What does the browser pass to your handler function?',
          options: [
            'One object describing the event, with things like type, target and key on it',
            'Nothing — handlers are always called with no arguments',
            'A string with the name of the event',
            'The element the listener is attached to, and nothing else',
          ],
          answer: 0,
          explanation:
            'Every handler is called with a single event object. It carries the name (`type`), the element the event started on (`target`), the element you listened on (`currentTarget`), plus event-specific details such as `key` or the field `value`.',
        },
        {
          id: 'quiz-js-s11-q2',
          type: 'code-output',
          prompt: 'A link has a click listener that calls `event.preventDefault()`. What happens when it is clicked?',
          code: `link.addEventListener('click', function (event) {
  event.preventDefault()
  console.log('handled')
})`,
          options: [
            'It logs handled and the browser does not follow the link',
            'It throws a ReferenceError, because event is not defined',
            'It follows the link, and only the first click is prevented',
            'The listener is removed and nothing runs',
          ],
          answer: 0,
          explanation:
            '`preventDefault` cancels the browser default — here, the navigation — and the event continues to be dispatched normally. Without that line the page would navigate away and the log would never be seen.',
        },
        {
          id: 'quiz-js-s11-q3',
          type: 'true-false',
          prompt: 'An anonymous handler passed to addEventListener cannot be removed later with removeEventListener.',
          answer: true,
          explanation:
            'Removal compares by identity, and nothing holds a reference to an anonymous function, so no later call can match it. Give the handler a name and store it, or use the `{ once: true }` option when you only ever want one run.',
        },
        {
          id: 'quiz-js-s11-q4',
          type: 'blank',
          prompt: 'Which method on the event object stops the browser from following its default action, such as a form submitting?',
          answers: ['preventdefault', 'event.preventdefault()', 'event.preventdefault'],
          explanation:
            '`event.preventDefault()` cancels the default behaviour and nothing else. `stopPropagation` is a different job: it stops the event travelling further up the tree, which matters when you are using delegation.',
        },
        {
          id: 'quiz-js-s11-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `button.addEventListener('click', () => {
  count += 1
})
button.addEventListener('click', () => {
  count += 1
})`,
          options: [
            'Two different anonymous functions are registered, so the handler runs twice per click — reuse one named function',
            'A button can only have one listener, so this is a syntax error',
            'The arrow function is missing a return value',
            'Nothing — every listener on an element fires once per event',
          ],
          answer: 0,
          explanation:
            'Each call registers its own function, and both fire on the same click, so the count jumps by two. That is how `addEventListener` differs from `onclick =`, which replaces. Pass one named handler, or remove the old one before adding the new.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* js-s12 — Strings                                                    */
  /* ------------------------------------------------------------------ */
  {
    id: 'js-s12',
    title: 'Strings',
    description:
      'Text as a value, template literals for building readable output, and the string methods that do the everyday work of taking apart and cleaning up what a person typed.',
    lessons: [
      {
        id: 'js-l17',
        title: 'Strings and template literals',
        description:
          'How text is stored, why it never changes, and how to put values into sentences without gluing them together with plus signs.',
        duration: 5,
        objectives: [
          'Write a string and read its length',
          'Explain why a string cannot be edited in place',
          'Interpolate values with a template literal',
          'Explain why HTML is built with elements, not with string concatenation',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l17-b1',
            body: 'A string is zero or more characters sitting inside quotes. Single quotes and double quotes do the same job, so pick the one that lets you use the other freely inside: `const greeting = "It is Tuesday"` is easier to read than escaping a quote. A string can be empty, and it can hold numbers and punctuation and newlines — the quotes are the only thing that marks where it starts and stops.',
          },
          {
            type: 'demo',
            id: 'j-l17-d1',
            title: 'A sentence with two values dropped into it',
            body: 'The backticks around the sentence and the dollar-brace pairs around the values are the whole syntax. Nothing else in the text has to change, and a missing space cannot go missing because the spaces live in the sentence.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const name = 'Ada'
const items = 3

const greeting = \`Hello, \${name}. You have \${items} item(s).\`

document.querySelector('#out').textContent = greeting`,
          },
          {
            type: 'heading',
            id: 'j-l17-h1',
            level: 3,
            body: 'A string never changes',
          },
          {
            type: 'code',
            id: 'j-l17-c1',
            language: 'javascript',
            title: 'Reading a string, and failing to edit one',
            code: `const city = 'Lisbon'
city.length            // 6 — one character per letter
city[0]                // 'L'
city[city.length - 1]  // 'n'
city.toUpperCase()     // 'LISBON'

city[0] = 'M'         // does nothing at all
console.log(city)     // still 'Lisbon'`,
          },
          {
            type: 'text',
            id: 'j-l17-b2',
            body: 'That last line is the fact that trips people up: **strings are immutable**. There is no way to change the characters inside one. Every string method you will meet is really a machine that takes a string in and hands you a **new** string back, leaving the original exactly as it was. `toUpperCase()` did not shout the old string; it produced a second, louder one. When a method looks like it should be editing in place, it never is, and the variable you were aiming at is unchanged.',
          },
          {
            type: 'heading',
            id: 'j-l17-h2',
            level: 3,
            body: 'Joining text: plus signs versus template literals',
          },
          {
            type: 'code',
            id: 'j-l17-c2',
            language: 'javascript',
            title: 'Building a sentence with +',
            code: `const name = 'Ada'
const items = 3

// concatenation works, but every value costs a plus sign,
// and every space has to be planned for by hand
const clumsy = 'Hello, ' + name + '. You have ' + items + ' item(s).'

// the same sentence with the values dropped into it — see the demo above
const clear = 'Hello, ' + name + '. You have ' + items + ' item(s).'`,
          },
          {
            type: 'example',
            id: 'j-l17-e1',
            title: 'Both ways, side by side',
            body: 'The two lines hold identical text, which is the point: the template literal is not a different feature, it is the same job with the punctuation and the spacing left where you can see them.',
            html: `<p id="plus">…</p>
<p id="tpl">…</p>`,
            javascript: `const name = 'Ada'
const total = 8

document.querySelector('#plus').textContent =
  'with +: ' + 'Hello, ' + name + '. You owe ' + total + ' euro.'

document.querySelector('#tpl').textContent =
  'with a template literal: ' + \`Hello, \${name}. You owe \${total} euro.\``,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'j-l17-t1',
            title: 'Reach for a template literal whenever a value meets text',
            body: 'Anything inside `${…}` is a full expression, not just a variable name — `${(price * 1.2).toFixed(2)}` is legal and usually better than doing the maths on a line above. Two things it buys you: a missing space never goes missing, because the spaces live in the text; and a number cannot accidentally glue itself to a word, because `+` will not appear in the sentence at all.',
          },
          {
            type: 'heading',
            id: 'j-l17-h3',
            level: 3,
            body: 'Text that spans lines',
          },
          {
            type: 'example',
            id: 'j-l17-e2',
            title: 'A template literal that holds a whole card',
            body: 'The sentence is written over several lines exactly as you would type it into a text editor — no escape characters and no plus signs. Try the same three lines with ordinary quotes and `+` and you will see what the template literal is saving you from.',
            html: `<p id="out">waiting…</p>`,
            css: `p { white-space: pre-wrap; }`,
            javascript: `const name = 'Ada'

const card = \`Name: \${name}
Role: engineer
Note: he is often called "the countess"\`

document.querySelector('#out').textContent = card`,
            showPreview: true,
          },
          {
            type: 'text',
            id: 'j-l17-b3',
            body: 'A normal string can only be one line, so anything longer is held together with `\\n` escapes and `+`. That produces a wall of code where the sentence you are writing is invisible in a column of punctuation. A template literal holds the sentence as it appears, and the indentation inside it becomes part of the text — which is why a multi-line template used for output usually starts its continuation lines flush left, and why **leading whitespace is real**.',
          },
          {
            type: 'warning',
            id: 'j-l17-w1',
            title: 'Never build HTML by string concatenation',
            body: 'It is tempting, because a template literal *can* hold tags: `<li>${name}</li>`. Do not. Anything that came from a person — a name typed into a form, a comment, data from a server — becomes part of the markup, and that is how you ship somebody else\'s code into your page. JavaScript reads a `<` inside that text as the start of a tag rather than as a character. Build the element instead and set its text: `document.createElement(\'li\')`, then `item.textContent = name`. Text placed through `textContent` is displayed as characters and can never become markup, whatever is in it.',
          },
          {
            type: 'example',
            id: 'j-l17-e3',
            title: 'The same name, rendered as markup and as text',
            body: 'The first line is bold, because the value was inserted as markup. The second line shows the angle brackets as characters, because `textContent` displays whatever it is given and never interprets it. Use the second form for anything a person typed.',
            html: `<div id="out"></div>`,
            javascript: `const name = 'Ada <b>Lovelace</b>'

const asMarkup = document.createElement('p')
asMarkup.innerHTML = 'Rendered as markup: ' + name

const asText = document.createElement('p')
asText.textContent = 'Rendered as text: ' + name

document.querySelector('#out').appendChild(asMarkup)
document.querySelector('#out').appendChild(asText)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l17-x1',
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
                  id: 'ex-js-template-greet-t1',
                  label: 'greet is a function',
                  body: `return typeof greet === 'function' ? true : 'Define a function called greet.';`,
                },
                {
                  id: 'ex-js-template-greet-t2',
                  label: 'greet("Ada") returns "Hello, Ada!"',
                  body: `if (typeof greet !== 'function') return 'Define a function called greet.'
return greet('Ada') === 'Hello, Ada!'
  ? true
  : 'Expected the string Hello, Ada! — exactly one space after the comma.';`,
                },
                {
                  id: 'ex-js-template-greet-t3',
                  label: 'It works for any name, including an empty one',
                  body: `if (typeof greet !== 'function') return 'Define a function called greet.'
return greet('') === 'Hello, !' && greet('Bo') === 'Hello, Bo!'
  ? true
  : 'The name must come from the parameter, not from a hard-coded word.';`,
                },
                {
                  id: 'ex-js-template-greet-t4',
                  label: 'The greeting was logged to the console',
                  body: `return window.__log.length > 0 && window.__log[window.__log.length - 1] === 'Hello, Ada!'
  ? true
  : 'Expected the console output to be Hello, Ada!, got: ' + window.__log.join(' | ');`,
                },
              ],
              hints: [
                'Put the function between the comment and the existing console.log line.',
                'A template literal starts and ends with a backtick character, and a value drops in between dollar-brace and closing-brace: ' +
                  "`Hello, \${name}!`" +
                  ' returns the greeting for any name.',
                'So the body is a single line: return ' +
                  "`Hello, \${name}!`" +
                  ' — then keep the console.log below it.',
              ],
              solution: {
                javascript: `function greet(name) {
  return \`Hello, \${name}!\`
}

console.log(greet('Ada'))`,
              },
              testNotes:
                'These checks compare the returned string exactly, so the spacing matters. They cannot tell whether you used a template literal or concatenation with + — both produce the same text.',
            },
          },
        ],
      },
      {
        id: 'js-l18',
        title: 'String methods and search',
        description:
          'Cut a string up, clean it, change it and search it — and the two slicing traps that catch everyone once.',
        duration: 6,
        objectives: [
          'Take a substring with slice and know its arguments are end-exclusive',
          'Clean input with trim and change case with toUpperCase',
          'Break a string apart with split and rebuild it with join',
          'Choose between replace and replaceAll',
          'Ask a yes-or-no question with includes and startsWith',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l18-b1',
            body: 'A string is a primitive value, yet it still has methods attached. That looks contradictory until you notice what is really happening: JavaScript temporarily wraps the value so it can call a method on it, then throws the wrapper away. You get the tools without the cost, and because strings never change, none of those tools can surprise you by editing the original.',
          },
          {
            type: 'demo',
            id: 'j-l18-d1',
            title: 'The clean-up chain, live',
            body: 'Type anything. The length counts the invisible spaces your keyboard added, the trimmed value is what a comparison should use, and the slug is the shape a URL wants. Nothing here edits what you typed.',
            html: `<label for="title">Title</label>
<input id="title" value="  Hello Brave New World  " />
<p id="out">waiting…</p>`,
            javascript: `const input = document.querySelector('#title')
const out = document.querySelector('#out')

function update() {
  const title = input.value
  const slug = title.trim().toLowerCase().split(' ').join('-')
  out.textContent =
    'length: ' + title.length +
    ' / trimmed: "' + title.trim() + '"' +
    ' / slug: "' + slug + '"' +
    ' / starts with hello: ' + title.trim().toLowerCase().startsWith('hello')
}

input.addEventListener('input', update)
update()`,
          },
          {
            type: 'heading',
            id: 'j-l18-h1',
            level: 3,
            body: 'Taking a part of a string with slice',
          },
          {
            type: 'code',
            id: 'j-l18-c1',
            language: 'javascript',
            title: 'slice, and the end-exclusive second argument',
            code: `const row = 'Apple, Banana, Kiwi'

row.slice(0, 5)      // 'Apple'  — counts from 0, stops *before* 5
row.slice(7)         // 'Banana, Kiwi' — no end, so it runs to the end
row.slice(-6)        // 'Kiwi'   — a negative index counts back from the end
row.slice(-6, -2)    // 'Kiwi'

const last = row.length - 1
row[last]             // 'i'`,
          },
          {
            type: 'warning',
            id: 'j-l18-w1',
            title: 'Two slicing traps',
            body: 'First, `slice(-3)` does not mean "three characters from the front" — a negative index is counted from the end, so `slice(-3)` is the **tail** of the string. Second, `substring(13, 7)` returns the same text as `substring(7, 13)`: `substring` quietly swaps arguments that arrive in the wrong order, which hides a mistake rather than reporting it. `slice` does not swap; it returns an empty string. Prefer `slice` and read both arguments as the positions you actually want.',
          },
          {
            type: 'heading',
            id: 'j-l18-h2',
            level: 3,
            body: 'Case and whitespace',
          },
          {
            type: 'code',
            id: 'j-l18-c2',
            language: 'javascript',
            title: 'The four you will use on anything a person typed',
            code: `const raw = '  Ada Lovelace  '

raw.length                     // 16 — the spaces are characters too
raw.trim()                     // 'Ada Lovelace'
raw.toUpperCase()              // 'ADA LOVELACE'
raw.toLowerCase()              // 'ada lovelace'
'ab'.repeat(3)                 // 'ababab'

// comparison should not care about case or stray spaces
if (raw.trim().toLowerCase() === 'ada lovelace') {
  console.log('matched')
}`,
          },
          {
            type: 'text',
            id: 'j-l18-b2',
            body: '`trim` is the one that earns its place on nearly every line of real code, because text arriving from a form arrives with the invisible characters a person\'s keyboard and operating system add. Untrimmed, `"ada@example.com "` silently fails every validation check and gives a confusing error about a valid address.',
          },
          {
            type: 'heading',
            id: 'j-l18-h3',
            level: 3,
            body: 'Splitting and joining',
          },
          {
            type: 'code',
            id: 'j-l18-c3',
            language: 'javascript',
            title: 'Turning text into a list and back again',
            code: `const csv = 'apple, banana ,kiwi'
const words = csv.split(',')            // ['apple', ' banana ', 'kiwi']
const clean = words.map((w) => w.trim())
clean                                   // ['apple', 'banana', 'kiwi']

clean.join(', ')                        // 'apple, banana, kiwi'
clean.join('')                          // 'applebananakiwi'
'one two three'.split(' ')              // split on any string, not just commas`,
          },
          {
            type: 'text',
            id: 'j-l18-b3',
            body: '`split` is the bridge between text and arrays — it is what turns a comma-separated line from a file or an input field into data you can loop over. `join` is the way back, and its argument is the separator it puts *between* items, never at the ends. `split(\'\')` is the exception worth knowing: it cuts a string into an array of individual characters.',
          },
          {
            type: 'heading',
            id: 'j-l18-h4',
            level: 3,
            body: 'Replacing text',
          },
          {
            type: 'code',
            id: 'j-l18-c4',
            language: 'javascript',
            title: 'replace touches one match, replaceAll touches every one',
            code: `const note = 'bad apple, bad pear'

note.replace('bad', 'good')     // 'good apple, bad pear'  — first only
note.replaceAll('bad', 'good')  // 'good apple, good pear'
note                            // unchanged: replace returns a new string

'2024-05-06'.replaceAll('-', '/')   // '2024/05/06'
'a-b-c'.replace('-', '+')          // 'a+b-c'  ← the classic surprise`,
          },
          {
            type: 'heading',
            id: 'j-l18-h5',
            level: 3,
            body: 'Asking a question instead of counting',
          },
          {
            type: 'list',
            id: 'j-l18-l1',
            style: 'bullet',
            items: [
              '`includes(text)` — is this text in there at all? `true` or `false`, and the index is thrown away.',
              '`startsWith(text)` / `endsWith(text)` — is this how the string begins, or how it finishes?',
              '`indexOf(text)` — *where* is the first occurrence, counting from 0, or `-1` if it is not there.',
              '`padStart(length, filler)` — pad the front until the text is `length` long: `padStart(3, \'0\')` turns `7` into `\'007\'`, which is how a zero-padded id like `0042` is made.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l18-t1',
            title: 'Use includes when you only need the answer',
            body: '`includes` reads as the question you are actually asking, and it stops you having to remember that a missing string is `-1` rather than `0` or `false`. Reach for `indexOf` only when you genuinely need the position — to slice from there, to highlight the match, or to keep the first of several.',
          },
          {
            type: 'exercise',
            id: 'j-l18-x1',
            exercise: {
              id: 'ex-js-string-slug',
              instructions:
                'Write `slugify(title)` so it returns the title lowercased, with any leading or trailing spaces removed, and every space replaced by a single dash. Then log `slugify("  Hello Brave New World  ")`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Returns 'hello-brave-new-world' for '  Hello Brave New World  '.

function slugify(title) {
  
}

// Log the slug of the title below.
console.log(slugify('  Hello Brave New World  '))
`,
              },
              expectedOutput: 'hello-brave-new-world',
              tests: [
                {
                  id: 'ex-js-string-slug-t1',
                  label: 'slugify is a function',
                  body: `return typeof slugify === 'function' ? true : 'Define a function called slugify.';`,
                },
                {
                  id: 'ex-js-string-slug-t2',
                  label: 'The title is trimmed, lowercased and dasherised',
                  body: `if (typeof slugify !== 'function') return 'Define a function called slugify.'
return slugify('  Hello Brave New World  ') === 'hello-brave-new-world'
  ? true
  : 'Expected hello-brave-new-world, got: [' + slugify('  Hello Brave New World  ') + ']';`,
                },
                {
                  id: 'ex-js-string-slug-t3',
                  label: 'It works for other titles, including one word',
                  body: `if (typeof slugify !== 'function') return 'Define a function called slugify.'
return slugify('A B') === 'a-b' && slugify('Solo') === 'solo'
  ? true
  : 'The word must come from the parameter — do not hard-code a result.';`,
                },
                {
                  id: 'ex-js-string-slug-t4',
                  label: 'The slug was logged to the console',
                  body: `return window.__log.length > 0 && window.__log[window.__log.length - 1] === 'hello-brave-new-world'
  ? true
  : 'Expected the console output to be hello-brave-new-world, got: ' + window.__log.join(' | ');`,
                },
              ],
              hints: [
                'Each method returns a new string, so chain them: one call for the case, one for the spaces.',
                '`.trim()` removes the outside spaces, `.toLowerCase()` changes the case.',
                '`.split(" ").join("-")` swaps every space for a dash, and unlike `replace(" ", "-")` it does not stop at the first one.',
              ],
              solution: {
                javascript: `function slugify(title) {
  return title.trim().toLowerCase().split(' ').join('-')
}

console.log(slugify('  Hello Brave New World  '))`,
              },
              testNotes:
                'The checks only look at the returned string, so several different implementations pass. A version using replaceAll(" ", "-") after trimming is equally correct.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s12',
      title: 'Strings check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s12-q1',
          type: 'multiple-choice',
          prompt: 'What happens when you run `const s = "abc"; s[0] = "z";`?',
          options: [
            'The string becomes "zbc"',
            'It throws a TypeError because strings are read-only',
            'Nothing — strings are immutable, so the assignment is ignored',
            'The string becomes "abc" and a new variable holds "z"',
          ],
          answer: 2,
          explanation:
            'Strings are immutable. Assigning to an index is ignored in sloppy code and an error in strict mode — either way it never edits the text. Every string method returns a new string instead.',
        },
        {
          id: 'quiz-js-s12-q2',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const fruit = 'banana'
console.log(fruit.slice(-3), fruit.slice(1, 3))`,
          options: ['"ana" "ana"', '"nan" "an"', '"ban" "ba"', '"banana" "ban"', 'It throws'],
          answer: 0,
          explanation:
            'A negative index counts back from the end, so slice(-3) is the tail, "ana". The second argument is the position to stop before, so slice(1, 3) gives "an" plus "a" — "ana".',
        },
        {
          id: 'quiz-js-s12-q3',
          type: 'true-false',
          prompt: 'Template literals can span several lines, and anything can go inside `${...}`.',
          answer: true,
          explanation:
            'A template literal holds real newlines, so a sentence can be typed as it reads. Inside `${...}` you can put a whole expression, not just a name — `${(price * 1.2).toFixed(2)}` is legal.',
        },
        {
          id: 'quiz-js-s12-q4',
          type: 'blank',
          prompt: 'Which method replaces **every** occurrence of a substring, rather than only the first?',
          answers: ['replaceall', 'replace all', 'replaceAll'],
          explanation:
            '`replace` changes the first match and returns a new string; `replaceAll` changes all of them. `replace(" ", "-")` on "a-b-c" leaves you with "a+b-c", which is the bug you meet the first time you try to normalise a sentence.',
        },
        {
          id: 'quiz-js-s12-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this snippet?',
          code: `const name = getUserTypedName()
list.innerHTML = \`<li>\${name}</li>\``,
          options: [
            'The template literal syntax is invalid inside innerHTML',
            'Anything a person typed is inserted as markup, so a name containing a tag changes the page',
            'innerHTML cannot be used with a template literal at all',
            'The dollar-brace should be a plus sign',
          ],
          answer: 1,
          explanation:
            'The syntax is fine; the danger is that the value is inserted as markup rather than as text. Build an element and assign to `textContent` instead — text set that way is displayed as characters and can never become a tag.',
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ */
  /* js-s13 — Numbers                                                    */
  /* ------------------------------------------------------------------ */
  {
    id: 'js-s13',
    title: 'Numbers',
    description: 'One number type, why decimals are only ever approximate, and the rounding that makes comparisons behave.',
    lessons: [
      {
        id: 'js-l19',
        title: 'Numbers and rounding',
        description:
          'Why 0.1 + 0.2 is not 0.3, how to control decimal places, and how to round a number the way you meant to.',
        duration: 6,
        objectives: [
          'Explain why JavaScript has only one number type',
          'Explain floating point imprecision and why it breaks === on decimals',
          'Choose between toFixed and toPrecision',
          'Round up, down and to nearest with Math',
          'Turn text into a number without guessing',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l19-b1',
            body: 'JavaScript has exactly one number type. There is no `int`, no `float`, no `long` — `3`, `3.0` and `3.14` are all the same kind of value, and JavaScript will not stop you writing `let count = 2.5` where a whole number of people was meant. Every number is stored in 64 bits, which is accurate to about fifteen significant digits. That is plenty for prices and distances, and it is not enough for values far beyond it, where `9999999999999999` quietly becomes `10000000000000000`.',
          },
          {
            type: 'demo',
            id: 'j-l19-d1',
            title: 'One sum, three answers',
            body: 'The raw figure carries a tail of digits that has no business in a price. The rounded one is the same number you meant, and the third line is what to display. The `===` check in the middle is the failure that costs an afternoon.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const sum = 0.1 + 0.2

document.querySelector('#out').textContent =
  'raw: ' + sum +
  ' / is it exactly 0.3: ' + (sum === 0.3) +
  ' / rounded to two places: ' + sum.toFixed(2) +
  ' / rounded as a number: ' + Math.round(sum * 100) / 100`,
          },
          {
            type: 'heading',
            id: 'j-l19-h1',
            level: 3,
            body: 'Why 0.1 + 0.2 is not 0.3',
          },
          {
            type: 'code',
            id: 'j-l19-c1',
            language: 'javascript',
            title: 'The surprise, and three ways out',
            code: `const sum = 0.1 + 0.2

sum                     // 0.30000000000000004
sum === 0.3             // false  ← the part that costs you an hour

// 1. for showing a value to a person
sum.toFixed(2)          // '0.30'

// 2. for a number you want to keep calculating with
Math.round(sum * 100) / 100   // 0.3

// 3. for money: never use decimals at all, use whole pence
Math.round(0.1 * 100) + Math.round(0.2 * 100)   // 30`,
          },
          {
            type: 'text',
            id: 'j-l19-b2',
            body: 'The reason is not a JavaScript bug. Computers store numbers in binary, and one tenth has no exact binary form — the same way one third has no exact form in decimal, so `0.1 + 0.2` in decimal arithmetic would give `0.33333…`. In binary, `0.1` is stored as the nearest available approximation, slightly too large, and `0.2` slightly too large too. Adding two approximations that are each a hair off gives a result that is a hair off, and printing it in base ten shows all seventeen digits of it.',
          },
          {
            type: 'text',
            id: 'j-l19-b3',
            body: 'That is why the `===` check fails, and the important part is that `===` is not at fault. It correctly reports that the stored value is not identical to the stored value of `0.3`, which is a *different* approximation. The mistake is asking a strict equality question about a quantity that can only ever be approximately known. Once that is clear the rule is short: **never compare a computed decimal with `===`.** Decide how many decimal places the answer should have, round to that, and compare the rounded values.',
          },
          {
            type: 'warning',
            id: 'j-l19-w1',
            title: 'The failure mode is silence, not an error',
            body: 'Nothing throws. The page renders, the console is clean, and the only symptom is a total that is off by a fraction of a penny on one screen and not the next. If a numeric comparison misbehaves, suspect the comparison rather than the arithmetic: either round both sides first, or use a tolerance test — `Math.abs(a - b) < 0.01` instead of `a === b`.',
          },
          {
            type: 'heading',
            id: 'j-l19-h2',
            level: 3,
            body: 'toFixed and toPrecision',
          },
          {
            type: 'code',
            id: 'j-l19-c2',
            language: 'javascript',
            title: 'Two ways to control how many digits you see',
            code: `const x = 9.656

x.toFixed(2)          // '9.66'  — two digits *after* the point
x.toFixed(0)          // '10'    — rounds, then drops the point
x.toFixed(4)          // '9.6560' — padded with zeros on purpose

x.toPrecision(3)      // '9.66'  — three digits *in total*, so 9.66
x.toPrecision(5)      // '9.6560'

x.toString()          // '9.656' — no rounding at all
(100 + 23).toString() // method calls need the parentheses around a literal`,
          },
          {
            type: 'tip',
            id: 'j-l19-t1',
            title: 'toFixed returns text, not a number',
            body: '`(0.1 + 0.2).toFixed(2)` is the string `\'0.30\'`, and that is deliberate: you cannot have a string with a variable number of decimal places. Use it for anything a person reads — a price, a percentage, a score out of ten. If you need to keep calculating, use `Math.round(x * 100) / 100`, which gives you the number `0.3` and stays usable.',
          },
          {
            type: 'heading',
            id: 'j-l19-h3',
            level: 3,
            body: 'Whole numbers with Math',
          },
          {
            type: 'code',
            id: 'j-l19-c3',
            language: 'javascript',
            title: 'round, floor, ceil, abs — and the negative-number difference',
            code: `Math.round(4.6)    // 5    nearest, and .5 goes up
Math.round(-4.2)   // -4

Math.floor(4.9)    // 4    always down — this is why it pairs with random
Math.floor(-4.2)   // -5   ← not -4: it really does move toward minus infinity

Math.ceil(4.1)     // 5    always up, which is what page counts need
Math.trunc(-4.2)   // -4   the integer part, throwing the fraction away

Math.abs(-4.7)     // 4.7  distance from zero, so signs disappear

const temps = [18.4, 21.9, 17.2]
Math.max(...temps)  // 21.9
Math.min(...temps)  // 17.2`,
          },
          {
            type: 'text',
            id: 'j-l19-b4',
            body: '`floor` and `ceil` are the two you reach for constantly, and they disagree about negative numbers in a way that looks like a bug until you picture a number line. `floor` moves toward negative infinity — it gives up the fraction and lands further from zero. `ceil` moves toward positive infinity. If you want the digits thrown away regardless of direction, that is `trunc`. `Math.max` and `Math.min` take any number of values, which is why they almost always appear as `Math.max(...array)` once you have more than three.',
          },
          {
            type: 'heading',
            id: 'j-l19-h4',
            level: 3,
            body: 'Checking a number is what you think it is',
          },
          {
            type: 'code',
            id: 'j-l19-c4',
            language: 'javascript',
            title: 'Number.isNaN, Number.isInteger and friends',
            code: `const input = 'abc'
const parsed = Number(input)   // NaN

parsed === parsed               // false — NaN is the only value unequal to itself
Number.isNaN(parsed)           // true  ← use this, always
typeof parsed                  // 'number', which is the historical lie

Number.isInteger(4)            // true
Number.isInteger(4.0)          // true — there is no separate integer type
Number.isFinite(1 / 0)         // false — Infinity is not usable as a value
Number.isSafeInteger(2 ** 53)  // false — past this point precision starts going`,
          },
          {
            type: 'heading',
            id: 'j-l19-h5',
            level: 3,
            body: 'Turning text into a number',
          },
          {
            type: 'list',
            id: 'j-l19-l1',
            style: 'bullet',
            items: [
              '`Number(value)` — converts the **whole** thing or fails. `Number(\'12abc\')` is `NaN`, which is the honest answer: it is not a number. This is the one to reach for by default.',
              '`parseInt(value)` — reads the leading digits and stops. `parseInt(\'12abc\')` is `12`. Always pass the radix: `parseInt(value, 10)`, or `\'08\'` will be read in base 8.',
              '`parseFloat(value)` — like `parseInt` but keeps the fraction, and has no radix to forget.',
            ],
          },
          {
            type: 'code',
            id: 'j-l19-c5',
            language: 'javascript',
            title: 'The difference, in three lines',
            code: `Number('12abc')        // NaN  — strict, and therefore trustworthy
parseInt('12abc', 10) // 12    — lenient, and quietly believes it succeeded
parseFloat('3.5kg')   // 3.5   — lenient, for measurements`,
          },
          {
            type: 'exercise',
            id: 'j-l19-x1',
            exercise: {
              id: 'ex-js-number-cents',
              instructions:
                'Adding 0.1 and 0.2 directly gives 0.30000000000000004. Work out the total in **whole pence** instead — no decimals anywhere — store it in a variable called `totalCents`, and log it. For this input the answer is 30.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const unitPrice = 0.1
const quantity = 3

// Convert to whole pence, work in pence, then store the result in totalCents.

// Expected: 30
`,
              },
              expectedOutput: '30',
              tests: [
                {
                  id: 'ex-js-number-cents-t1',
                  label: 'totalCents is a number',
                  body: `return typeof totalCents !== 'undefined' && typeof totalCents === 'number'
  ? true
  : 'Declare it as: const totalCents = ...';`,
                },
                {
                  id: 'ex-js-number-cents-t2',
                  label: 'The total is right',
                  body: `if (typeof totalCents === 'undefined') return 'Declare a variable called totalCents first.'
return Math.abs(totalCents - 30) < 0.0001
  ? true
  : 'Expected 30 pence, got: ' + totalCents;`,
                },
                {
                  id: 'ex-js-number-cents-t3',
                  label: 'It is a whole number, not 30.000000000000004',
                  body: `if (typeof totalCents === 'undefined') return 'Declare a variable called totalCents first.'
return Number.isInteger(totalCents)
  ? true
  : 'Your answer still has a decimal tail. Round before you multiply.';`,
                },
                {
                  id: 'ex-js-number-cents-t4',
                  label: 'The total was logged',
                  body: `return window.__log.length > 0 && /(^|\\D)30(\\D|$)/.test(window.__log.join(' '))
  ? true
  : 'Log the total with console.log(totalCents).';`,
                },
              ],
              hints: [
                'A price of 0.1 is 10 pence. Convert first, multiply second.',
                '`Math.round(unitPrice * 100)` gives you exactly 10, with no decimal tail left over.',
                'So the whole thing is one line: `const totalCents = Math.round(unitPrice * 100) * quantity`, then log it.',
              ],
              solution: {
                javascript: `const unitPrice = 0.1
const quantity = 3

const totalCents = Math.round(unitPrice * 100) * quantity

console.log(totalCents)`,
              },
              testNotes:
                'The checks compare the value, not the method, so multiplying first and rounding afterwards also passes as long as the result is a whole number. Storing cents is the habit that makes money code correct.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s13',
      title: 'Numbers check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s13-q1',
          type: 'multiple-choice',
          prompt: 'Why does `0.1 + 0.2 === 0.3` evaluate to `false`?',
          options: [
            'Because JavaScript compares decimals with a tolerance of zero',
            'Because both sides are stored as binary approximations and the stored value of the sum is not identical to the stored value of 0.3',
            'Because `===` refuses to compare two numbers that both have decimal points',
            'Because `+` on decimals produces a string in JavaScript',
          ],
          answer: 1,
          explanation:
            'One tenth has no exact binary representation, so it is stored as the nearest available approximation. Adding two approximations leaves a result that differs in the seventeenth decimal place. `===` is reporting this truthfully — the fix is to round to the precision you mean before comparing.',
        },
        {
          id: 'quiz-js-s13-q2',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `console.log(Math.floor(-4.2), Math.round(-4.2))`,
          options: ['-4 -4', '-5 -4', '-4 -5', '-5 -5', 'NaN NaN'],
          answer: 1,
          explanation:
            '`floor` moves toward negative infinity, so -4.2 becomes -5. `round` moves toward the nearest whole number, and -4.2 is nearer to -4. If you wanted the fraction simply thrown away regardless of direction, that is `trunc(-4.2)`, which gives -4.',
        },
        {
          id: 'quiz-js-s13-q3',
          type: 'true-false',
          prompt: '`(9.656).toFixed(2)` returns the number 9.66, so you can keep calculating with it.',
          answer: false,
          explanation:
            'It returns the string "9.66". You cannot have a number with a variable number of decimal places, so the result is text. Use `Math.round(x * 100) / 100` when you need a number you can keep working with.',
        },
        {
          id: 'quiz-js-s13-q4',
          type: 'blank',
          prompt: 'Which method tells you whether a value is `NaN`?',
          answers: ['number.isnan', 'numberisnan', 'isnan', 'number.isnan()'],
          explanation:
            '`Number.isNaN(value)` is the honest test. `typeof NaN` says "number", and `NaN === NaN` is false, so no equality comparison can ever find it.',
        },
        {
          id: 'quiz-js-s13-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this code?',
          code: `const cents = 0.1 + 0.2
if (cents === 0.3) {
  console.log('price matches')
}`,
          options: [
            '`cents` is a bad name for a number',
            'The comparison uses `===` on two computed decimals, so it is false even when the price is right',
            'Decimal literals need a leading zero',
            'Nothing — this is the recommended way to compare prices',
          ],
          answer: 1,
          explanation:
            'The sum is 0.30000000000000004, so the branch never runs and no error is reported. Compare rounded values (`Math.round(cents * 100) === 30`), compare a tolerance (`Math.abs(cents - 0.3) < 0.001`), or store money as whole pence so the question never arises.',
        },
      ],
    },
  },
]