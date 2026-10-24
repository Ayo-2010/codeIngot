import type { Section } from '~/types/content'

export const jsFlowErrorsSections: Section[] = [
  {
    id: 'js-s21',
    title: 'Comparisons',
    description: 'Asking yes/no questions about values, and combining the answers without nesting everything.',
    lessons: [
      {
        id: 'js-l28',
        title: 'Comparison and logical operators',
        description: 'Ask questions about values, and combine the answers without nesting everything.',
        duration: 6,
        objectives: [
          'Always compare with === and explain why == is a trap',
          'Use <, >, <= and >= on numbers, not on text',
          'Combine tests with && and ||, and reach for ?? when 0 matters',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-js-l28',
          title: 'Comparison and logical operators quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l28-q1',
              type: 'multiple-choice',
              prompt: 'Why is `==` avoided in favour of `===`?',
              options: [
                '`===` runs faster',
                '`==` converts types before comparing, so `0 == "0"` and `"" == 0` are true',
                '`==` only works on numbers',
                '`==` cannot be used inside an `if`',
              ],
              answer: 1,
              explanation: 'Loose equality coerces one side to the other type using a set of rules that are hard to remember. Strict equality asks two simple questions - same type, same value - and that is the entire rule.',
            },
            {
              id: 'quiz-js-l28-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const n = 3\nconsole.log(n == \'3\', n === \'3\')',
              options: [
                'true true',
                'true false',
                'false false',
                'false true',
              ],
              answer: 1,
              explanation: 'Loose equality coerces the string to a number, so `==` gives true. Strict equality also compares types, and a number is not a string, so `===` gives false.',
            },
            {
              id: 'quiz-js-l28-q3',
              type: 'true-false',
              prompt: 'A count of `0` will survive `count || 10`.',
              answer: false,
              explanation: '`0` is falsy, so `||` treats it as missing and hands back the right-hand side. `count ?? 10` is the form that keeps a real zero, because `??` only falls back for `null` and `undefined`.',
            },
            {
              id: 'quiz-js-l28-q4',
              type: 'blank',
              prompt: 'Which operator gives the value only when it is `null` or `undefined`?',
              answers: [
                '??',
                'nullish coalescing',
                'nullish coalescing operator',
              ],
              explanation: '`??` is nullish coalescing: it returns the left side unless it is `null` or `undefined`, then returns the right. `||` fills in for every falsy value, which is why a real `0` or an empty string gets replaced.',
            },
            {
              id: 'quiz-js-l28-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'const items = getItems()\nif (items.length > 0 && items[0].name) {\n  show(items)\n}',
              options: [
                'Nothing - the guard looks fine',
                '`&&` cannot be used with `>`',
                'If `items` is undefined or null the left side throws before `&&` ever gets a chance to short-circuit',
                '`items[0].name` must be compared with `===`',
              ],
              answer: 2,
              explanation: 'Short-circuiting only protects the code on the **right** of `&&`. `items.length` is evaluated first, so an absent `items` throws there. Write the risky check first: `if (items && items.length > 0 && items[0].name)`.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l28-b1',
            body: 'Comparison operators answer a yes/no question and produce a **boolean**. Six of them do the work: `===`, `!==`, `<`, `>`, `<=`, `>=`. Each one is true or false, and that is the only two things a condition can be.',
          },
          {
            type: 'demo',
            id: 'j-l28-d1',
            title: 'Loose and strict, on the same value',
            body: 'Type a value, or press the buttons. The two right-hand columns disagree on purpose, and that disagreement is the whole reason `==` never gets used.',
            html: `<label for="v">Value</label>
<input id="v" value="0" />
<button type="button" id="go">Compare</button>
<p id="out">&mdash;</p>`,
            javascript: `const input = document.querySelector('#v')
const out = document.querySelector('#out')

function compare() {
  const raw = input.value
  const asNumber = Number(raw)

  out.textContent =
    'raw === 0: ' + (raw === 0) +
    ' | raw == 0: ' + (raw == 0) +
    ' | raw === "0": ' + (raw === '0') +
    ' | asNumber === 0: ' + (asNumber === 0)
}

document.querySelector('#go').addEventListener('click', compare)
input.addEventListener('input', compare)
compare()`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'j-l28-h1',
            level: 3,
            body: '=== versus ==',
          },
          {
            type: 'text',
            id: 'j-l28-b2',
            body: 'Strict equality (`===`) asks two questions and needs both to be yes: is the type the same, and is the value the same. Loose equality (`==`) asks only about the value, quietly converting one side first when the types differ. That conversion is a table of rules nobody remembers correctly, which is why `0 == "0"`, `"" == 0` and `null == undefined` are all true. Strict equality has no rules to remember: same type, same value, or it is false.',
          },
          {
            type: 'code',
            id: 'j-l28-c1',
            language: 'javascript',
            title: 'Strict and loose, side by side',
            code: `console.log(0 == '0')     // true  - coerces the string to a number
console.log(0 === '0')    // false - a number is not a string
console.log('' == 0)      // true  - the empty string coerces to 0
console.log('' === 0)     // false
console.log(null == undefined)   // true
console.log(null === undefined)  // false`,
          },
          {
            type: 'warning',
            id: 'j-l28-w1',
            title: 'Never compare with == or !=',
            body: 'Loose equality **coerces** types before comparing, which is how a value typed into a form silently becomes equal to the number you were checking against, or how `"" == 0` sneaks past a validation check. Use `===` and `!==` every time. The loose versions have no use you will miss - if you genuinely want coercion, say it out loud with `Number()` or `String()`.',
          },
          {
            type: 'heading',
            id: 'j-l28-h2',
            level: 3,
            body: 'Ordering comparisons',
          },
          {
            type: 'code',
            id: 'j-l28-c2',
            language: 'javascript',
            title: 'Less than, more than',
            code: `const age = 20
console.log(age < 18)   // false
console.log(age > 18)   // true
console.log(age >= 20)  // true
console.log(age <= 19)  // false`,
          },
          {
            type: 'warning',
            id: 'j-l28-w2',
            title: 'Two strings compare alphabetically, not numerically',
            body: '`"10" < "9"` is **true**, because JavaScript compares them character by character and `1` comes before `9`. If the values are numbers, convert first with `Number()` and then compare. The same trap makes `"apple" < "banana"` work, which is why it survives so long - it looks correct right up until you have more than nine items.',
          },
          {
            type: 'heading',
            id: 'j-l28-h3',
            level: 3,
            body: 'Logical operators',
          },
          {
            type: 'list',
            id: 'j-l28-l1',
            style: 'bullet',
            items: [
              '`&&` - **and**: true only when both sides are true. Both must be answers to yes/no questions.',
              '`||` - **or**: true when at least one side is true.',
              '`!` - **not**: flips one value. Note the position: `!isOpen`, not `isOpen!`.',
            ],
          },
          {
            type: 'code',
            id: 'j-l28-c3',
            language: 'javascript',
            title: 'Combining tests',
            code: `const age = 20
const hasTicket = true

// both must hold
console.log(age >= 18 && hasTicket)   // true

// either is enough
console.log(age < 18 || hasTicket)    // true

// negation
console.log(!hasTicket)               // false`,
          },
          {
            type: 'text',
            id: 'j-l28-b3',
            body: '`&&` and `||` **short-circuit**: they stop as soon as the answer is decided. That is what makes `value !== null && value.length > 0` safe - if `value` is null the right side never runs, so it never throws. The order of the two halves is therefore part of the logic, not a style choice. Write the risky check on the right.',
          },
          {
            type: 'code',
            id: 'j-l28-c4',
            language: 'javascript',
            title: 'Short-circuiting as a guard',
            code: `const user = null

// safe: the right side only runs if user is not null
console.log(user !== null && user.name === 'Ada')   // false

// the same idea with if, which is what you write when there is more than a check
if (user) {
  console.log(user.name)
}`,
          },
          {
            type: 'heading',
            id: 'j-l28-h4',
            level: 3,
            body: 'When || is the wrong tool',
          },
          {
            type: 'text',
            id: 'j-l28-b4',
            body: '`||` returns one of its **operands**, not a boolean - and a default value is the usual reason to want that. The problem is that it treats every falsy value as "missing", so `count || 1` turns a real count of `0` into `1`, and `text || "none"` turns an intentionally empty string into a word. `??` (nullish coalescing) does the same job but only falls back for `null` and `undefined`, which is what a default almost always means.',
          },
          {
            type: 'code',
            id: 'j-l28-c5',
            language: 'javascript',
            title: '|| versus ??',
            code: `const count = 0
const nickname = ''

console.log(count || 10)      // 10 - 0 was treated as missing
console.log(count ?? 10)      // 0  - 0 is a real value

console.log(nickname || 'anon')  // 'anon'
console.log(nickname ?? 'anon')  // '' - empty is a real value`,
          },
          {
            type: 'tip',
            id: 'j-l28-t1',
            title: 'You cannot mix ?? with && or || without parentheses',
            body: 'The grammar forbids `a || b ?? c` on purpose - mixing the two silently swallows a `null`, which is exactly the bug you were trying to avoid. Write `(a || b) ?? c` and the reader immediately knows which rule applies to which half. Precedence is best handled by adding a pair of parentheses when you are not certain.',
          },
          {
            type: 'example',
            id: 'j-l28-e1',
            title: 'One check, three different answers',
            body: 'Watch the second line: `input` is the string `"0"`, which is not empty, so the `||` default does not kick in - but the number 0 would have been replaced.',
            html: `<label for="n">Count</label>
<input id="n" type="number" value="0" />
<p id="out">waiting</p>`,
            javascript: `const raw = document.querySelector('#n').value   // the string "0"
const n = Number(raw)

document.querySelector('#out').textContent =
  'raw: "' + raw + '" (truthy: ' + Boolean(raw) + ') - ' +
  'n || 10: ' + (n || 10) + ' - n ?? 10: ' + (n ?? 10)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l28-x1',
            exercise: {
              id: 'ex-js-comparison',
              instructions:
                'Write a function `canEnter(age, hasId)` that returns true only when `age` is 18 or more **and** `hasId` is true. Use `>=` and `&&` and compare with `===`. Then log three results: `canEnter(20, true)`, `canEnter(17, true)` and `canEnter(20, false)`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return true only when age is 18 or over and hasId is true.

function canEnter(age, hasId) {

}

console.log(canEnter(20, true))
console.log(canEnter(17, true))
console.log(canEnter(20, false))
`,
              },
              expectedOutput: 'true\nfalse\nfalse',
              tests: [
                {
                  id: 'ex-js-comparison-t1',
                  label: 'canEnter is a function',
                  body: `return typeof canEnter === 'function' ? true : 'Define a function called canEnter.';`,
                },
                {
                  id: 'ex-js-comparison-t2',
                  label: 'An adult with ID gets in',
                  body: `if (typeof canEnter !== 'function') return 'Define a function called canEnter.'
return canEnter(20, true) === true
  ? true
  : 'Age 20 with an ID must be allowed.';`,
                },
                {
                  id: 'ex-js-comparison-t3',
                  label: 'A minor is refused, even with ID',
                  body: `if (typeof canEnter !== 'function') return 'Define a function called canEnter.'
return canEnter(17, true) === false
  ? true
  : 'Age 17 must be refused.';`,
                },
                {
                  id: 'ex-js-comparison-t4',
                  label: 'An adult without ID is refused',
                  body: `if (typeof canEnter !== 'function') return 'Define a function called canEnter.'
return canEnter(20, false) === false
  ? true
  : 'No ID means refused, whatever the age.';`,
                },
              ],
              hints: [
                'One line does it: compare the age, combine with `&&`, and compare the id against the boolean `true`.',
                '`>=` is inclusive, so 18 passes. `> 17` also works - but `>= 18` says what you mean.',
                'The body is `return age >= 18 && hasId === true`.',
              ],
              solution: {
                javascript: `function canEnter(age, hasId) {
  return age >= 18 && hasId === true
}

console.log(canEnter(20, true))
console.log(canEnter(17, true))
console.log(canEnter(20, false))`,
              },
              testNotes:
                'The checks call the function with three different combinations, so a hard-coded `return true` will not pass.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s22',
    title: 'Conditions',
    description: 'Choosing what happens next: if chains, the ternary, and switch.',
    lessons: [
      {
        id: 'js-l29',
        title: 'if, else and the ternary',
        description: 'Branch on a condition, and pick between two values with a single expression.',
        duration: 5,
        objectives: [
          'Write an if / else if / else chain in the right order',
          'Use the ternary for a two-branch expression',
          'Combine conditions instead of nesting them'
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l29',
          title: 'if, else and the ternary quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l29-q1',
              type: 'multiple-choice',
              prompt: 'In a chain of `if / else if / else`, how many branches run for one execution?',
              options: [
                'All of them, top to bottom',
                'Only the first one that matches, plus its `else`',
                'Exactly one',
                'Every branch whose condition is truthy',
              ],
              answer: 2,
              explanation: 'Exactly one branch runs. JavaScript checks the conditions in order and stops at the first match, so a chain is not a set of independent tests. This is why the widest range has to be written first - a narrower test placed above it swallows every value it should have let through.',
            },
            {
              id: 'quiz-js-l29-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const n = 0\nconsole.log(n ? \'yes\' : \'no\')',
              options: [
                'yes',
                'no',
                '0',
                'undefined',
              ],
              answer: 1,
              explanation: '`0` is falsy, so the condition fails and the ternary takes the second branch. This is the trap with a ternary: the left side is a truthiness test, not a comparison, so `count > 0` is the safer way to ask "is there anything here?" than `count` alone.',
            },
            {
              id: 'quiz-js-l29-q3',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'function grade(score) {\n  if (score > 70) {\n    return \'Passed\'\n  } else if (score > 90) {\n    return \'Distinction\'\n  } else {\n    return \'Failed\'\n  }\n}',
              options: [
                'The two branches should be joined with `&&`',
                'The branches are in the wrong order, so a score of 95 returns "Passed" instead of "Distinction"',
                '`return` needs to come after the `else if`',
                'Nothing is wrong - this handles every score',
              ],
              answer: 1,
              explanation: 'A chain stops at its first match. A score of 95 satisfies `score > 70`, so the function returns "Passed" and the `score > 90` branch is never reached - it is dead code. Range checks must be written widest first, which here means putting `score > 90` above `score > 70`.',
            },
            {
              id: 'quiz-js-l29-q4',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const list = []\nconsole.log(list ? \'yes\' : \'no\')',
              options: [
                'yes',
                'no',
                'undefined',
                '0',
              ],
              answer: 0,
              explanation: 'An empty array is an object, and every object is truthy in a condition. To ask whether it has items, test `list.length` instead — that is `0` and therefore falsy.',
            },
            {
              id: 'quiz-js-l29-q5',
              type: 'multiple-choice',
              prompt: 'Why is `if (user && user.age >= 18)` safe when `user` is `undefined`?',
              options: [
                '`&&` converts the whole condition to a boolean before reading `age`',
                '`&&` short-circuits, so `user.age` is not evaluated when `user` is falsy',
                'JavaScript skips any property access on undefined automatically',
                'The second comparison is moved into a `try` block',
              ],
              answer: 1,
              explanation: '`&&` evaluates left to right and stops at the first falsy operand. When `user` is undefined, the right-hand side never runs, so the property access cannot throw — the same reason the flat form is safer than nesting.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l29-b1',
            body: 'A condition is a question with a yes/no answer. An `if` asks it, and JavaScript runs one block or the other depending on the answer. The condition does not have to be `true` or `false` - it only has to be **truthy** or **falsy**, which means anything that is not `false`, `0`, `""`, `null`, `undefined` or `NaN`. An empty array and an empty object are both truthy, and that surprises people regularly.',
          },
          {
            type: 'demo',
            id: 'j-l29-d1',
            title: 'A chain deciding in one direction',
            body: 'Move the slider. Every value lands in exactly one band, and the band that fires is the first one whose condition holds.',
            html: `<label for="score">Score <output id="n">72</output></label>
<input id="score" type="range" min="0" max="100" value="72" />
<p id="out">B</p>`,
            javascript: `const slider = document.querySelector('#score')
const num = document.querySelector('#n')
const out = document.querySelector('#out')

function grade(score) {
  if (score >= 90) return 'A'
  if (score >= 70) return 'B'
  if (score >= 40) return 'C'
  return 'F'
}

function render() {
  const score = Number(slider.value)
  num.textContent = score
  out.textContent = 'Band ' + grade(score)
}

slider.addEventListener('input', render)
render()`,
            height: 140,
          },
          {
            type: 'heading',
            id: 'j-l29-h1',
            level: 3,
            body: 'Anatomy of an if chain',
          },
          {
            type: 'code',
            id: 'j-l29-c1',
            language: 'javascript',
            title: 'One chain, three possible outcomes',
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
            type: 'text',
            id: 'j-l29-b2',
            body: 'JavaScript checks the branches **top to bottom and stops at the first match**. That single fact decides the order you write them in. Range checks have to run from widest to narrowest: `score > 70` before `score > 90` means a score of 95 gets caught by the first branch and never reaches the second, and the `>= 90` branch becomes dead code. When you catch yourself reordering an `if` chain to make it work, the check is probably written in the wrong direction.',
          },
          {
            type: 'text',
            id: 'j-l29-b3',
            body: 'Both shapes have a place. An `else` chain suits branches that are genuine peers, where each one is equally likely to run. But when one branch is the common case and the rest are guards, `if (score >= 70) return "Passed"` at the top of a function reads better: every following line is unindented, and the reader sees the rare cases first instead of digging through nesting to reach them.',
          },
          {
            type: 'heading',
            id: 'j-l29-h2',
            level: 3,
            body: 'Braces are optional, and that is the problem',
          },
          {
            type: 'code',
            id: 'j-l29-c2',
            language: 'javascript',
            title: 'One statement does not need braces',
            code: `// fine - one statement per branch
if (age >= 18) console.log('adult')
else console.log('minor')

// fine, and what most style guides ask for
if (age >= 18) {
  console.log('adult')
}

// broken - only the log is conditional, the return always runs
if (age >= 18) console.log('adult')
return 'done'`,
          },
          {
            type: 'warning',
            id: 'j-l29-w1',
            title: 'A line break is not a block',
            body: 'JavaScript decides what belongs to an `if` from the braces, not from your indentation. Write it without braces, add a second line to the same branch, and that second line runs unconditionally. Braces cost two characters and remove the entire class of bug.',
          },
          {
            type: 'heading',
            id: 'j-l29-h3',
            level: 3,
            body: 'Two branches, one value: the ternary',
          },
          {
            type: 'code',
            id: 'j-l29-c3',
            language: 'javascript',
            title: 'condition ? valueIfTrue : valueIfFalse',
            code: `const age = 20

// as an if statement
let ticket
if (age < 16) {
  ticket = 'child'
} else {
  ticket = 'adult'
}

// as an expression - ticket gets the same value
const ticket2 = age < 16 ? 'child' : 'adult'

// it composes, which is the real reason to use one
const label = age < 16 ? 'Child ticket' : age < 65 ? 'Adult ticket' : 'Senior ticket'`,
          },
          {
            type: 'text',
            id: 'j-l29-b4',
            body: 'The difference is that a ternary is an **expression**: it produces a value, so it can sit on the right of an assignment, inside a string, or be passed straight to another function. An `if` statement cannot. That is the whole decision rule - use the ternary when you are computing one value from two options, use `if` when you are running different blocks of code. Nest two ternaries at most; a third level should become an `if`.',
          },
          {
            type: 'heading',
            id: 'j-l29-h4',
            level: 3,
            body: 'Combine conditions instead of nesting them',
          },
          {
            type: 'code',
            id: 'j-l29-c4',
            language: 'javascript',
            title: 'Flat beats nested',
            code: `// nested: three levels of indentation to read one condition
if (user) {
  if (user.age >= 18) {
    if (user.hasId) {
      allowEntry()
    }
  }
}

// flat: one condition, joined with &&
if (user && user.age >= 18 && user.hasId) {
  allowEntry()
}`,
          },
          {
            type: 'text',
            id: 'j-l29-b5',
            body: '`&&` means "and", and it short-circuits: if `user` is missing, `user.age` is never evaluated, so the flat version is also the safe one. When a condition grows past three or four parts, pull it out into a named `const` - a variable called `isAdult` reads better in the `if` than the expression that produced it.',
          },
          {
            type: 'warning',
            id: 'j-l29-w2',
            title: 'A chain that picks one label for each input is a lookup table',
            body: 'When every branch returns a string and one branch is the catch-all, you have written `if` in a costume. An object literal - `const labels = { pass: "Passed", fail: "Failed" }` - or a `switch` says the same thing in fewer lines and cannot fall out of sync with its keys. Reach for a chain when the branches compare against ranges or do different work, not when they just name things.',
          },
          {
            type: 'example',
            id: 'j-l29-e1',
            title: 'Early returns driving a live label',
            body: 'Change the number and watch the label update. Each guard returns immediately, so there is no `else` anywhere - the last line only runs when nothing above it matched.',
            html: `<label for="score">Score</label>
<input id="score" type="number" value="72" />
<p id="out">&mdash;</p>`,
            javascript: `const input = document.querySelector('#score')
const out = document.querySelector('#out')

function grade(score) {
  if (Number.isNaN(score)) return 'Enter a number'
  if (score >= 70) return 'Passed'
  if (score < 40) return 'Resit'
  return 'Marginal'
}

function render() {
  out.textContent = grade(Number(input.value))
}

input.addEventListener('input', render)
render()`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l29-x1',
            exercise: {
              id: 'ex-js-grade-branch',
              instructions:
                'Write `describeTemperature(celsius)` that returns a word for the temperature: "freezing" below 0, "cold" below 15, "warm" below 25, and "hot" for anything else. Then log `describeTemperature(20)`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return 'freezing', 'cold', 'warm' or 'hot' for a number.
// Below 0 is freezing, below 15 is cold, below 25 is warm, else hot.

function describeTemperature(celsius) {

}

console.log(describeTemperature(20))
`,
              },
              expectedOutput: 'warm',
              tests: [
                {
                  id: 'ex-js-grade-branch-t1',
                  label: 'describeTemperature is a function',
                  body: `return typeof describeTemperature === 'function' ? true : 'Define a function called describeTemperature.';`,
                },
                {
                  id: 'ex-js-grade-branch-t2',
                  label: 'The middle ranges return the right words',
                  body: `if (typeof describeTemperature !== 'function') return 'Define a function called describeTemperature.'
return describeTemperature(-4) === 'freezing' && describeTemperature(20) === 'warm'
  ? true
  : 'Expected freezing for -4 and warm for 20, got: ' + describeTemperature(-4) + ' and ' + describeTemperature(20);`,
                },
                {
                  id: 'ex-js-grade-branch-t3',
                  label: 'The boundaries fall in the right band',
                  body: `if (typeof describeTemperature !== 'function') return 'Define a function called describeTemperature.'
return describeTemperature(0) === 'cold' && describeTemperature(15) === 'cold' && describeTemperature(25) === 'hot'
  ? true
  : 'Boundaries: 0 and 15 should be cold, 25 should be hot. Got: ' + describeTemperature(0) + ', ' + describeTemperature(15) + ', ' + describeTemperature(25);`,
                },
                {
                  id: 'ex-js-grade-branch-t4',
                  label: 'The result was logged',
                  body: `var log = window.__log || []
return log.length > 0 && log[log.length - 1] === 'warm'
  ? true
  : 'Expected the console output to be warm, got: ' + log.join('|');`,
                },
              ],
              hints: [
                'Use `if` for the first three bands and let the last one be the catch-all, so there is no `else` needed at the end.',
                'The comparisons are strict: try `celsius < 0`, then `celsius < 15`, then `celsius < 25`.',
                'Put `return "hot"` on the last line of the function, outside every `if`. That line only runs when nothing above returned.',
              ],
              solution: {
                javascript: `function describeTemperature(celsius) {
  if (celsius < 0) return 'freezing'
  if (celsius < 15) return 'cold'
  if (celsius < 25) return 'warm'
  return 'hot'
}

console.log(describeTemperature(20))`,
              },
              testNotes:
                'The checks only look at what the function returns and what reached the console. They cannot tell whether you used `if` or a lookup table, so both styles pass.',
            },
          },
        ],
      },
      {
        id: 'js-l30',
        title: 'switch',
        description: 'One value, many possible branches, and the fall-through that catches everyone out.',
        duration: 4,
        objectives: [
          'Read and write a switch with case and default',
          'Explain what happens when break is missing',
          'Know when an if chain is the clearer choice'
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l30',
          title: 'switch quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l30-q1',
              type: 'true-false',
              prompt: 'A `switch` compares its cases with `==`, so `switch ("0")` matches `case 0:`.',
              answer: false,
              explanation: 'Cases are compared with `===`, which never coerces types, so the string `"0"` does not match the number `0`. Values coming from form inputs arrive as strings, which is why you convert with `Number()` before the `switch` rather than inside it.',
            },
            {
              id: 'quiz-js-l30-q2',
              type: 'blank',
              prompt: 'Which keyword ends a `case` block so the next one does not run?',
              answers: [
                'break',
              ],
              explanation: '`break` leaves the `switch` immediately. Without it JavaScript keeps falling into the following blocks, which is sometimes what you want - stacking `case 3:` and `case 4:` above one block is exactly that - but usually it is a missing keyword rather than a design.',
            },
            {
              id: 'quiz-js-l30-q3',
              type: 'multiple-choice',
              prompt: 'Which lines does this code print?',
              code: 'switch (2) {\n  case 1:\n    console.log(\'one\')\n  case 2:\n    console.log(\'two\')\n  case 3:\n    console.log(\'three\')\n    break\n  default:\n    console.log(\'other\')\n}',
              options: [
                '`two` only',
                '`two` then `three`',
                '`one`, `two`, then `three`',
                '`two`, `three`, then `other`',
              ],
              answer: 1,
              explanation: 'Case 2 matches and runs, but without a `break` the switch falls through into case 3 as well. The `break` in case 3 finally stops it, so both "two" and "three" print.',
            },
            {
              id: 'quiz-js-l30-q4',
              type: 'multiple-choice',
              prompt: 'When is an `if` chain clearly better than a `switch`?',
              options: [
                'When every branch compares the same value against a fixed list',
                'When the branches test ranges or combine several conditions',
                'When there are more than three branches',
                'When the value comes from an input field',
              ],
              answer: 1,
              explanation: 'A `switch` can only ask whether one expression equals a case label exactly. Ranges, method calls and compound conditions cannot be expressed as case labels, so they belong in `if`.',
            },
            {
              id: 'quiz-js-l30-q5',
              type: 'multiple-choice',
              prompt: 'What happens if no `case` matches and the `switch` has no `default`?',
              options: [
                'The first case runs',
                'The last case runs',
                'Nothing inside the switch runs and execution continues after it',
                'It throws a SyntaxError',
              ],
              answer: 2,
              explanation: '`default` is the only branch that runs when nothing matches. Without it the switch simply performs no branch and the next statement after the block executes.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l30-b1',
            body: 'A `switch` is a single question with a list of named answers. JavaScript evaluates the expression in the parentheses **once**, then walks the `case` labels from the top looking for a value that matches it exactly. The first match wins and its block runs. If nothing matches, `default` runs; if there is no `default`, nothing inside the `switch` runs at all and execution carries on underneath.',
          },
          {
            type: 'demo',
            id: 'j-l30-d1',
            title: 'One value, one matching case',
            body: 'Pick a number and watch which case lights up. Exactly one block runs unless a `break` is missing.',
            html: `<label for="day">Day number</label>
<input id="day" type="number" value="2" min="0" max="6" />
<p id="out">&mdash;</p>`,
            javascript: `const input = document.querySelector('#day')
const out = document.querySelector('#out')

function name(n) {
  switch (n) {
    case 0: return 'Sunday'
    case 1: return 'Monday'
    case 2: return 'Tuesday'
    case 3: return 'Wednesday'
    default: return 'Later in the week'
  }
}

input.addEventListener('input', () => {
  out.textContent = 'Matched case for ' + input.value + ': ' + name(Number(input.value))
})`,
            height: 140,
          },
          {
            type: 'heading',
            id: 'j-l30-h1',
            level: 3,
            body: 'The shape of a switch',
          },
          {
            type: 'code',
            id: 'j-l30-c1',
            language: 'javascript',
            title: 'Weekday number to name',
            code: `const dayNumber = 2
let day

switch (dayNumber) {
  case 0:
    day = 'Sunday'
    break
  case 1:
    day = 'Monday'
    break
  case 2:
    day = 'Tuesday'
    break
  default:
    day = 'Unknown'
}

console.log(day)  // Tuesday`,
          },
          {
            type: 'heading',
            id: 'j-l30-h2',
            level: 3,
            body: 'Cases compare strictly',
          },
          {
            type: 'text',
            id: 'j-l30-b2',
            body: 'A `case` label is compared with `===`, so the types have to match. `switch ("0")` with `case 0:` matches nothing: `"0"` is a string and `0` is a number, and that is exactly the same trap as `===`. It bites most often with values that came from an input field, where everything arrives as a string. Convert once, above the `switch`, rather than writing `case Number(x)` in every branch.',
          },
          {
            type: 'heading',
            id: 'j-l30-h3',
            level: 3,
            body: 'Fall-through, and the break that stops it',
          },
          {
            type: 'text',
            id: 'j-l30-b3',
            body: 'Nothing automatically ends a `case`. When a block finishes without a `break`, JavaScript keeps going and runs the next block too - the `switch` has no idea your case was "over". It is called fall-through, and it is occasionally useful: stack several labels with no code between them to share one block.',
          },
          {
            type: 'code',
            id: 'j-l30-c2',
            language: 'javascript',
            title: 'One break missing, three blocks run',
            code: `// broken - 3 runs "C" and "D" as well as "B"
switch (3) {
  case 3:
    console.log('B')
  case 4:
    console.log('C')
  case 5:
    console.log('D')
}

// deliberate - 4 and 5 share the same block
switch (4) {
  case 4:
  case 5:
    console.log('same block')
    break
  default:
    console.log('other')
}`,
          },
          {
            type: 'warning',
            id: 'j-l30-w1',
            title: 'The last case does not need a break',
            body: 'A `switch` ends anyway, so leaving the final `break` off is harmless - but it is inconsistent, and the moment someone inserts a new case above it, that last block starts falling through. Add `break` to every case, including `default`, unless you have a reason not to.',
          },
          {
            type: 'tip',
            id: 'j-l30-t1',
            title: 'default can sit anywhere',
            body: '`default` is not a catch-all case by position - it runs only when nothing else matched, wherever you put it. Putting it first is fine, and it does need a `break` like any other branch. Putting it last, at the bottom, is easier to read.',
          },
          {
            type: 'heading',
            id: 'j-l30-h4',
            level: 3,
            body: 'When an if chain is clearer',
          },
          {
            type: 'code',
            id: 'j-l30-c3',
            language: 'javascript',
            title: 'switch is for equality, if is for everything else',
            code: `// switch: comparing one value against a fixed list
switch (action) {
  case 'save':
  case 'publish':
    persist()
    break
  default:
    warn()
}

// if: ranges, compound tests, anything with an operator in it
if (age >= 18 && age < 65) {
  label = 'working age'
}`,
          },
          {
            type: 'text',
            id: 'j-l30-b4',
            body: 'A `switch` can only ask "is this exactly that?". Ranges like `age < 65`, patterns like `startsWith("a")` and compound tests like `a && b` all have to be written as `if` anyway, so a `switch` next to three of those is two styles solving the same problem. Use `switch` when every branch tests the same expression against one fixed list of values; reach for `if` the moment any branch is doing real work.',
          },
          {
            type: 'example',
            id: 'j-l30-e1',
            title: 'Stacked cases sharing one block',
            body: 'Stars 3 and 4 fall into the same block because both labels sit above one `break`.',
            html: `<label for="stars">Stars</label>
<input id="stars" type="number" value="3" min="1" max="5" />
<p id="out">&mdash;</p>`,
            javascript: `const input = document.querySelector('#stars')
const out = document.querySelector('#out')

function rating(stars) {
  switch (stars) {
    case 1:
      return 'Poor'
    case 2:
      return 'Fair'
    case 3:
    case 4:
      return 'Good'
    default:
      return 'Excellent'
  }
}

function render() {
  out.textContent = rating(Number(input.value))
}

input.addEventListener('input', render)
render()`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l30-x1',
            exercise: {
              id: 'ex-js-switch-label',
              instructions:
                'Write `transitName(mode)` with a `switch` that returns "Walk it" for "walk", "Ride the bus" for "bus", "Take the train" for "train", and "Pick another route" for anything else. Then log `transitName("bus")`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return one of four strings, chosen with a switch.
// The last one is the catch-all for anything you did not list.

function transitName(mode) {
  switch (mode) {

  }
}

console.log(transitName('bus'))
`,
              },
              expectedOutput: 'Ride the bus',
              tests: [
                {
                  id: 'ex-js-switch-label-t1',
                  label: 'transitName is a function',
                  body: `return typeof transitName === 'function' ? true : 'Define a function called transitName.';`,
                },
                {
                  id: 'ex-js-switch-label-t2',
                  label: 'The listed modes return their own string',
                  body: `if (typeof transitName !== 'function') return 'Define a function called transitName.'
return transitName('walk') === 'Walk it' && transitName('train') === 'Take the train'
  ? true
  : 'Expected Walk it and Take the train, got: ' + transitName('walk') + ' and ' + transitName('train');`,
                },
                {
                  id: 'ex-js-switch-label-t3',
                  label: 'Anything else falls to the catch-all',
                  body: `if (typeof transitName !== 'function') return 'Define a function called transitName.'
return transitName('bus') === 'Ride the bus' && transitName('tram') === 'Pick another route'
  ? true
  : 'Expected Ride the bus and Pick another route, got: ' + transitName('bus') + ' and ' + transitName('tram');`,
                },
                {
                  id: 'ex-js-switch-label-t4',
                  label: 'The result was logged',
                  body: `var log = window.__log || []
return log.length > 0 && log[log.length - 1] === 'Ride the bus'
  ? true
  : 'Expected the console output to be Ride the bus, got: ' + log.join('|');`,
                },
              ],
              hints: [
                'Every `case` needs its own `break`, or the blocks below it fall through and run as well.',
                'The catch-all is `default:` - it runs when no `case` matched, whatever order you write it in.',
                'Careful with case labels: `case "walk":` needs the string quotes, because cases compare with `===`.',
              ],
              solution: {
                javascript: `function transitName(mode) {
  switch (mode) {
    case 'walk':
      return 'Walk it'
    case 'bus':
      return 'Ride the bus'
    case 'train':
      return 'Take the train'
    default:
      return 'Pick another route'
  }
}

console.log(transitName('bus'))`,
              },
              testNotes:
                'The checks only see the returned strings. A chain of `if`s that returns the same four values passes just as well - use the exercise to practise the syntax.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s23',
    title: 'Loops',
    description: 'Running the same block of code once, many times, or until something changes.',
    lessons: [
      {
        id: 'js-l31',
        title: 'for and while',
        description: 'Counted repetition with for, condition-based repetition with while, and the two keywords that cut a loop short.',
        duration: 6,
        objectives: [
          'Write a for loop from its three parts',
          'Choose between for, while and do...while',
          'Use break and continue to cut a loop short'
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l31',
          title: 'for and while quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l31-q1',
              type: 'multiple-choice',
              prompt: 'In `for (let i = 0; i < 5; i++)`, which part runs once before the loop body?',
              options: [
                '`i < 5`',
                '`i++`',
                '`let i = 0`',
                'All three, once each',
              ],
              answer: 2,
              explanation: 'The initialiser runs exactly once. The condition is checked before every turn, including the first, and the update runs after every turn. That is why `for (let i = 0; i > 5; i++)` never runs its body at all - the condition is already false when it is first checked.',
            },
            {
              id: 'quiz-js-l31-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'for (let i = 0; i < 5; i++) {\n  if (i === 2) continue\n  if (i === 4) break\n  console.log(i)\n}',
              options: [
                '0 1 2 3',
                '0 1 3',
                '0 1 3 4',
                '0 1 2',
              ],
              answer: 1,
              explanation: '`continue` skips the rest of the turn for i = 2, so 2 is never printed, but the loop carries on. `break` ends the loop entirely at i = 4, so 4 is never reached. The output is 0 1 3.',
            },
            {
              id: 'quiz-js-l31-q3',
              type: 'true-false',
              prompt: 'A `do...while` loop with a condition that is already false still runs its body once.',
              answer: true,
              explanation: 'That is the difference from a plain `while`: the body runs first and the condition is asked afterwards. It is the right shape for work that must happen at least once before you know whether to keep going, and the wrong shape for anything else, because the extra pass is easy to forget.',
            },
            {
              id: 'quiz-js-l31-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'let i = 0\nwhile (i > 0) {\n  console.log(i)\n  i = i + 1\n}',
              options: [
                '`while` cannot be used with a number',
                'The comparison is backwards - the body increments `i` but the loop only runs while `i` is greater than 0, so it never stops',
                '`i` needs to be declared with `const`',
                'Nothing is wrong',
              ],
              answer: 1,
              explanation: 'The body only ever increases `i`, but the condition asks for it to be above 0, which starts true and gets more true. The condition should be `while (i < 5)` or similar. Check every loop condition against what the body does to the counter - that single test catches most runaway loops.',
            },
            {
              id: 'quiz-js-l31-q5',
              type: 'blank',
              prompt: 'Which keyword skips the rest of the current turn of a loop and moves on to the next one?',
              answers: [
                'continue',
              ],
              explanation: '`continue` jumps to the next iteration, leaving the rest of the current body unexecuted. `break` is the one that leaves the loop entirely. Both can also be used inside a `switch`, where `break` is what stops a `case` falling into the next.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l31-b1',
            body: 'A loop runs the same block of code more than once, changing something each turn so the work moves forward. Almost always the "something" is a counter, because that is the one thing you can always make stricter until the loop ends. If you cannot say what makes your loop stop, you do not have a loop yet - you have a way to freeze the browser.',
          },
          {
            type: 'demo',
            id: 'j-l31-d1',
            title: 'A loop building a list',
            body: 'The count in the input drives the loop. Each turn appends one row, so you can watch repetition happen instead of reading console lines.',
            html: `<label for="n">How many turns</label>
<input id="n" type="number" value="5" min="1" max="12" />
<ul id="out"></ul>`,
            javascript: `const input = document.querySelector('#n')
const out = document.querySelector('#out')

function render() {
  out.textContent = ''
  const turns = Number(input.value)

  for (let i = 1; i <= turns; i = i + 1) {
    const row = document.createElement('li')
    row.textContent = 'Turn ' + i + ' of ' + turns
    out.appendChild(row)
  }
}

input.addEventListener('input', render)
render()`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'j-l31-h1',
            level: 3,
            body: 'The three parts of a for loop',
          },
          {
            type: 'code',
            id: 'j-l31-c1',
            language: 'javascript',
            title: 'initialise, condition, update',
            code: `const cars = ['BMW', 'Volvo', 'Mini']
let text = ''

for (let i = 0; i < cars.length; i++) {
  text += cars[i] + '\\n'
}

console.log(text)`,
          },
          {
            type: 'text',
            id: 'j-l31-b2',
            body: 'The three parts are separated by semicolons inside one pair of parentheses. **Initialise** runs once, before the first turn - `let i = 0`. **Condition** is checked before every turn, and the loop ends the moment it is false - `i < cars.length`. **Update** runs after every turn - `i++`. Nothing forces you to use them in that order or all three at once, but written this way the loop reads as a sentence: start at zero, keep going while you have not reached the end, move on by one.',
          },
          {
            type: 'heading',
            id: 'j-l31-h2',
            level: 3,
            body: 'Counting down, and counting by more than one',
          },
          {
            type: 'code',
            id: 'j-l31-c2',
            language: 'javascript',
            title: 'The condition and the update are yours to choose',
            code: `// down to and including zero
for (let i = 3; i >= 0; i--) {
  console.log(i)
}

// up by two
for (let i = 0; i < 10; i += 2) {
  console.log(i)
}

// a condition that is false before the first turn runs the body zero times
for (let i = 0; i > 5; i++) {
  console.log('never runs')
}`,
          },
          {
            type: 'text',
            id: 'j-l31-b3',
            body: 'The last one is worth internalising: the condition is checked **before** the first turn, so an `i` that starts above the limit does nothing at all. That is the difference between `while` and `do...while` in one example. `i++` and `++i` behave identically in a `for` loop, because the value of `i` is used a whole statement later - write `i++` and move on.',
          },
          {
            type: 'heading',
            id: 'j-l31-h3',
            level: 3,
            body: 'while, and when there is no count',
          },
          {
            type: 'code',
            id: 'j-l31-c4',
            language: 'javascript',
            title: 'for, while and do...while on the same job',
            code: `// counted: the number of turns is decided before the loop starts
for (let i = 0; i < 3; i++) {
  console.log(i)
}

// conditional: keep going until the data says stop
let attempts = 0
while (attempts < 3) {
  attempts = attempts + 1
}

// do...while: run once first, THEN ask - so the body always runs at least once
let n = 100
do {
  n = n / 2
} while (n > 1)

console.log(n)  // 50 - the loop body ran even though 100 was already over 1`,
          },
          {
            type: 'text',
            id: 'j-l31-b4',
            body: 'Reach for `for` when you can count the turns, and for `while` when the count depends on something you only learn inside the loop - retrying a request, reading input until it parses. `do...while` is rarer and worth knowing for one job: work that must happen at least once before you know whether to keep going. It is a `while` with the words in the other order, and the semicolon after the closing parenthesis is required.',
          },
          {
            type: 'heading',
            id: 'j-l31-h4',
            level: 3,
            body: 'break and continue',
          },
          {
            type: 'code',
            id: 'j-l31-c5',
            language: 'javascript',
            title: 'Leaving early, or skipping one turn',
            code: `// break: stop the loop entirely
for (let i = 0; i < 10; i++) {
  if (i === 3) break
  console.log(i)   // 0, 1, 2
}

// continue: skip the rest of this turn, carry on with the next one
for (let i = 0; i < 6; i++) {
  if (i % 2 === 0) continue
  console.log(i)   // 1, 3, 5
}`,
          },
          {
            type: 'tip',
            id: 'j-l31-t1',
            title: 'return inside a loop is fine',
            body: '`return` exits the whole function immediately, so a `for` loop and an early return combine happily - that is the usual way to search something: loop, and return the moment you find it. Reach for `break` when you only want to leave the loop and carry on in the function, and for `continue` when you want to skip to the next turn.',
          },
          {
            type: 'warning',
            id: 'j-l31-w1',
            title: 'A loop that never stops',
            body: 'If the condition is written with the wrong comparison - `while (i > 0)` when the body only ever increments - the loop never ends, the page freezes and the browser reports "page unresponsive". The single most reliable guard is to check your condition by hand with a value that is already past the limit: does it stop? If not, the comparison is backwards. For `for`, make sure the update actually moves the counter towards the condition.',
          },
          {
            type: 'example',
            id: 'j-l31-e1',
            title: 'A loop that writes to the page',
            body: 'Each turn creates one list item, so the browser shows the loop happening rather than printing eight identical console lines.',
            html: `<ul id="out"></ul>`,
            javascript: `const out = document.querySelector('#out')

for (let i = 1; i <= 4; i++) {
  const item = document.createElement('li')
  item.textContent = 'Step ' + i + (i % 2 === 0 ? ' (even)' : ' (odd)')
  out.appendChild(item)
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l31-x1',
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
                  id: 'ex-js-loop-sum-t1',
                  label: 'sumUpTo is a function',
                  body: `return typeof sumUpTo === 'function' ? true : 'Define a function called sumUpTo.';`,
                },
                {
                  id: 'ex-js-loop-sum-t2',
                  label: 'sumUpTo(5) returns 15',
                  body: `if (typeof sumUpTo !== 'function') return 'Define a function called sumUpTo.'
return sumUpTo(5) === 15
  ? true
  : '1 + 2 + 3 + 4 + 5 is 15, got: ' + sumUpTo(5);`,
                },
                {
                  id: 'ex-js-loop-sum-t3',
                  label: 'The small cases hold',
                  body: `if (typeof sumUpTo !== 'function') return 'Define a function called sumUpTo.'
return sumUpTo(1) === 1 && sumUpTo(0) === 0
  ? true
  : 'sumUpTo(1) should be 1 and sumUpTo(0) should be 0.';`,
                },
                {
                  id: 'ex-js-loop-sum-t4',
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
                'Put `return total` after the loop, and `return 0` inside the guard - a return before the loop makes the rest unreachable.',
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
              testNotes:
                'These checks only look at the returned totals. A `while` loop, a `for` that counts down, or a formula with no loop at all would all pass.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s24',
    title: 'Loop variants',
    description: 'Loops written for the shape of the data: values for lists, keys for objects, and breaking out early.',
    lessons: [
      {
        id: 'js-l32',
        title: 'for…of, for…in and break',
        description: 'Loops written for the shape of the data: values for lists, keys for objects.',
        duration: 5,
        objectives: [
          'Walk every value of an array or string with for…of',
          'Walk every key of an object with for…in',
          'Get both value and index with entries()'
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l32',
          title: 'for…of, for…in and break quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l32-q1',
              type: 'multiple-choice',
              prompt: 'What does `for (const key in person)` give you?',
              options: [
                'Each value of the object, in order',
                'Each key of the object, and you look the value up with `person[key]`',
                'Each key and value as a pair',
                'Each own method of the object',
              ],
              answer: 1,
              explanation: '`for…in` yields names, never values. The name comes from the object\'s shape, so the value has to be fetched by key. For key and value pairs together, `Object.entries(person)` with destructuring is the form you want.',
            },
            {
              id: 'quiz-js-l32-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'for (const [i, word] of [\'a\', \'b\', \'c\'].entries()) {\n  if (word === \'b\') continue\n  console.log(i, word)\n}',
              options: [
                '0 a 2 c',
                '0 a 1 b 2 c',
                '0 a 1 c',
                'a b c',
              ],
              answer: 0,
              explanation: '`entries()` pairs each index with its value, and `continue` skips the rest of the turn for "b" - so its index never prints either. Output is `0 a` then `2 c`.',
            },
            {
              id: 'quiz-js-l32-q3',
              type: 'true-false',
              prompt: '`for…in` over an array is a safe substitute for `for…of`.',
              answer: false,
              explanation: 'On an array, `for…in` gives you the string index keys `"0"`, `"1"`, `"2"` rather than the values, in an order the language does not promise, and it walks any extra property a library added. For arrays use `for…of`, `entries()` or an array method.',
            },
            {
              id: 'quiz-js-l32-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'const items = [\'a\', \'b\']\nfor (const i in items) {\n  console.log(items[i].toUpperCase())\n}',
              options: [
                '`for…in` cannot be used with `const`',
                'Nothing is wrong',
                '`for…in` hands back index keys as strings, so `items[i]` still happens to work but the loop reads like a bug and any extra array property would be walked too',
                '`toUpperCase` must be called with parentheses omitted',
              ],
              answer: 2,
              explanation: 'This particular code happens to work because `items["0"]` resolves the same as `items[0]`. That is exactly why the mistake survives: nothing tells you it is wrong until a library attaches a property to the array and the loop walks it too. Reach for `for…of`.',
            },
            {
              id: 'quiz-js-l32-q5',
              type: 'blank',
              prompt: 'Which method gives you each index paired with its value, ready to destructure?',
              answers: [
                'entries()',
                'entries',
                '.entries()',
                'array.entries()',
              ],
              explanation: '`items.entries()` yields `[index, value]` pairs, so `for (const [i, item] of items.entries())` gives you both names at once. It replaces the manual counter that otherwise creeps into a `for…of` loop.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l32-b1',
            body: 'A `for` loop with an index is work you do the same way every time: create a counter, compare it to `.length`, print it, increment it. When the data is a list, you can skip all of that. `for…of` hands you each **value** directly, in order, with no counter to get wrong.',
          },
          {
            type: 'demo',
            id: 'j-l32-d1',
            title: 'for…of over a list',
            body: 'The loop hands over each word, so there is no index, no `.length` comparison and no counter to increment. Breaking out early stops the list where you tell it to.',
            html: `<label for="limit">Stop after</label>
<input id="limit" type="number" value="2" min="1" max="4" />
<ul id="out"></ul>`,
            javascript: `const input = document.querySelector('#limit')
const out = document.querySelector('#out')
const words = ['loop', 'iterate', 'repeat', 'halt']

function render() {
  out.textContent = ''
  let shown = 0
  const limit = Number(input.value)

  for (const word of words) {
    if (shown >= limit) break
    const row = document.createElement('li')
    row.textContent = word + ' - ' + word.length + ' letters'
    out.appendChild(row)
    shown = shown + 1
  }
}

input.addEventListener('input', render)
render()`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'j-l32-h1',
            level: 3,
            body: 'for…of walks the values',
          },
          {
            type: 'code',
            id: 'j-l32-c1',
            language: 'javascript',
            title: 'The same shape as a for loop, minus the counting',
            code: `const names = ['Ada', 'Bo', 'Cyd']

for (const name of names) {
  console.log(name)
}

// strings are iterable too - this walks characters
const language = 'JS'
for (const letter of language) {
  console.log(letter)
}`,
          },
          {
            type: 'text',
            id: 'j-l32-b2',
            body: 'The word after `for` is the variable that holds the current value, and `of` names what you are walking. Declare it with `const` unless the loop body has to change the variable itself. "Iterable" just means "JavaScript knows how to walk this one" - arrays, strings, `Map`s, `Set`s and the `NodeList` you get back from a DOM query all qualify.',
          },
          {
            type: 'heading',
            id: 'j-l32-h2',
            level: 3,
            body: 'When you need the index too',
          },
          {
            type: 'code',
            id: 'j-l32-c2',
            language: 'javascript',
            title: 'entries() gives you both',
            code: `const rows = ['Tea', 'Coffee']

// the long way: for…of plus a counter you have to maintain
let i = 0
for (const row of rows) {
  console.log(i, row)
  i = i + 1
}

// the short way: entries() pairs each index with its value
for (const [index, row] of rows.entries()) {
  console.log(index, row)   // 0 Tea, 1 Coffee
}`,
          },
          {
            type: 'text',
            id: 'j-l32-b3',
            body: 'The `[index, row]` on the left is **destructuring**: one array of two items being pulled into two names at once. It reads left to right - index first, because that is the order `entries()` produces. Whenever a `for…of` loop starts growing a manual counter, replace the counter with `entries()` and the two disappear.',
          },
          {
            type: 'heading',
            id: 'j-l32-h3',
            level: 3,
            body: 'for…in walks the keys',
          },
          {
            type: 'code',
            id: 'j-l32-c3',
            language: 'javascript',
            title: 'One key per turn, and you look up the value yourself',
            code: `const person = { first: 'Ada', last: 'Lovelace', age: 36 }

for (const key in person) {
  console.log(key)             // first, last, age
  console.log(person[key])     // Ada, Lovelace, 36
}`,
          },
          {
            type: 'text',
            id: 'j-l32-b4',
            body: '`for…in` is for **objects**, and it gives you the names, never the values - so it is `person[key]`, never `person.key`. The name is written first because it comes from the object\'s shape; there is nothing else it could be. That also means `for…in` will happily walk anything you own, including methods you did not write, which is why it is the more dangerous of the two.',
          },
          {
            type: 'warning',
            id: 'j-l32-w1',
            title: 'Never use for…in on an array',
            body: 'On an array, `for…in` hands you the **string keys** `"0"`, `"1"`, `"2"` - the indexes - in no guaranteed order, and it will also walk any extra property you or a library added to that array. Nothing about `for (const i in items)` says "iterate the items", which is why it reads like a bug. Use `for…of`, `entries()`, or an array method instead.',
          },
          {
            type: 'tip',
            id: 'j-l32-t1',
            title: 'Object.entries() is often what you actually wanted',
            body: '`for (const key in person)` followed immediately by `person[key]` is the shape of `Object.entries(person)`, which gives you `[key, value]` pairs ready to destructure. `Object.keys()` and `Object.values()` are the other two, for when you only want one side.',
          },
          {
            type: 'list',
            id: 'j-l32-l1',
            style: 'bullet',
            items: [
              '**Every value of an array or string** - `for (const item of items)`.',
              '**Every value plus its position** - `for (const [i, item] of items.entries())`.',
              '**Every key of an object** - `for (const key in object)`, then look the value up with `object[key]`.',
              '**Every key and value of an object** - `for (const [key, value] of Object.entries(object))`.',
              '**Never `for…in` on an array.** It walks indexes, in an order the language does not promise.',
            ],
          },
          {
            type: 'example',
            id: 'j-l32-e1',
            title: 'A list rendered with for…of',
            body: 'The loop hands over each word, so there is no index, no `.length` comparison and no counter to increment.',
            html: `<ul id="out"></ul>`,
            javascript: `const out = document.querySelector('#out')
const words = ['loop', 'iterate', 'repeat']

for (const word of words) {
  const item = document.createElement('li')
  item.textContent = word + ' has ' + word.length + ' letters'
  out.appendChild(item)
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l32-x1',
            exercise: {
              id: 'ex-js-loop-tally',
              instructions:
                'Write `countByLength(words)` that returns an object where each key is a word length and each value is how many words have that length. Loop over the array with `for…of`. Then log `countByLength(["a", "bb", "cc", "d"])`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return an object like { 1: 2, 2: 2 } for ['a', 'bb', 'cc', 'd'].
// The key is the length of a word; the value is how many words have it.

function countByLength(words) {
  const tally = {}

  return tally
}

console.log(countByLength(['a', 'bb', 'cc', 'd']))
`,
              },
              expectedOutput: '{ 1: 2, 2: 2 }',
              tests: [
                {
                  id: 'ex-js-loop-tally-t1',
                  label: 'countByLength is a function',
                  body: `return typeof countByLength === 'function' ? true : 'Define a function called countByLength.';`,
                },
                {
                  id: 'ex-js-loop-tally-t2',
                  label: 'It returns an object, not undefined',
                  body: `if (typeof countByLength !== 'function') return 'Define a function called countByLength.'
var result = countByLength(['a', 'bb', 'cc', 'd'])
return result && typeof result === 'object'
  ? true
  : 'countByLength should return an object, got: ' + result;`,
                },
                {
                  id: 'ex-js-loop-tally-t3',
                  label: 'Lengths are counted correctly',
                  body: `if (typeof countByLength !== 'function') return 'Define a function called countByLength.'
var result = countByLength(['a', 'bb', 'cc', 'd'])
return result['1'] === 2 && result['2'] === 2
  ? true
  : 'Two one-letter words and two two-letter words, so result[1] and result[2] should both be 2. Got: ' + JSON.stringify(result);`,
                },
                {
                  id: 'ex-js-loop-tally-t4',
                  label: 'A repeated length adds up, an empty list adds no keys',
                  body: `if (typeof countByLength !== 'function') return 'Define a function called countByLength.'
var result = countByLength(['go', 'to', 'hi', 'up'])
var empty = countByLength([])
return result['2'] === 4 && Object.keys(empty).length === 0
  ? true
  : 'Four two-letter words should give { 2: 4 }, and an empty array should give {}. Got: ' + JSON.stringify(result) + ' and ' + JSON.stringify(empty);`,
                },
              ],
              hints: [
                'Inside the loop, each word knows its own length - `word.length` is the key and `tally[word.length]` is the current count.',
                'Read the current count, add one, and store it back: `tally[word.length] = (tally[word.length] || 0) + 1`.',
                'Use `const word of words` in the `for…of` header, and leave `return tally` as the last line of the function.',
              ],
              solution: {
                javascript: `function countByLength(words) {
  const tally = {}

  for (const word of words) {
    const size = word.length
    tally[size] = (tally[size] || 0) + 1
  }

  return tally
}

console.log(countByLength(['a', 'bb', 'cc', 'd']))`,
              },
              testNotes:
                'The checks read the returned object directly, so they pass whatever style you use to build it. They never look at which loop you chose.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s25',
    title: 'Bitwise operators',
    description: 'Operators that look at the individual bits of a number: what they are for, and where they go wrong.',
    lessons: [
      {
        id: 'js-l33',
        title: 'Bitwise operators',
        description: 'Working with the bits underneath a number, and recognising the one bitwise operator you will really use.',
        duration: 5,
        objectives: [
          'Convert a small number to binary and back with toString and parseInt',
          'Use &, |, ^ and ~ and say what each one does to a bit',
          'Use shifts to multiply and divide by powers of two, and read them correctly'
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l33',
          title: 'Bitwise operators quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l33-q1',
              type: 'multiple-choice',
              prompt: 'Why is `1000000000 | 1` a bad idea?',
              options: [
                '`|` only works on strings',
                'Bitwise operators convert their operands to 32-bit integers first, so the high digits are discarded and the result is 1',
                '`|` cannot be used with a literal',
                'It is a syntax error above 1000',
              ],
              answer: 1,
              explanation: 'Bitwise operators coerce to 32-bit signed integers before doing any work. `1000000000` does not fit in 32 bits, so what arrives is only its low digits. Use `+` for arithmetic on large numbers, or `BigInt` when you genuinely need more than 32 bits.',
            },
            {
              id: 'quiz-js-l33-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const flags = 0\nflags |= 2\nflags |= 4\nconsole.log(flags, (flags & 2) > 0)',
              options: [
                '4 false',
                '6 true',
                '6 false',
                '2 true',
              ],
              answer: 1,
              explanation: '`|=` adds each flag without touching the bits already set, so 2 then 4 gives 6. `6 & 2` is 2, which is greater than 0, so the flag is on.',
            },
            {
              id: 'quiz-js-l33-q3',
              type: 'true-false',
              prompt: '`n >> 2` sets `n` to the number 2.',
              answer: false,
              explanation: 'The 2 is the distance every bit moves, not the result. `40 >> 2` is 10, because each step right divides by two. `n >> 0` is the no-op that makes this easy to check.',
            },
            {
              id: 'quiz-js-l33-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'const READ = 1\nconst WRITE = 2\nlet flags = READ\nflags = flags + WRITE\nconsole.log(hasFlag(flags, WRITE))',
              options: [
                '`flags` must be declared with `let` at the top, not reassigned',
                'Adding instead of OR-ing is fine here, so nothing is wrong',
                'Adding carries between flags, so the two numbers stop being independent flags and one bit read can be set by accident',
                '`WRITE` has to be a number above 2',
              ],
              answer: 2,
              explanation: 'Flags are safe because each one is a separate bit and `|` only ever sets a bit. `+` is arithmetic: it carries, so 1 + 2 + 4 = 7 which happens to look fine, but 1 + 2 = 3 sets bits 1 and 2 at once and reading either flag reports both. Reach for `|=`.',
            },
            {
              id: 'quiz-js-l33-q5',
              type: 'blank',
              prompt: 'Which method turns a number into its binary digits as a string?',
              answers: [
                'toString(2)',
                'toString2',
                '.toString(2)',
                'toString with radix 2',
              ],
              explanation: '`n.toString(2)` gives the bits as a string, and `parseInt(text, 2)` turns them back. Every bitwise operator is easier to check once you can see the binary, because each one then reads as "keep this column" or "flip this column".',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l33-b1',
            body: 'Every number JavaScript stores is a sequence of bits, and a **bit** is one of those on or off. The bitwise operators reach past the number and work on those bits one at a time, so they can do things no arithmetic operator can: check or flip individual flags, pack several booleans into a single number, or halve a value with no division. You will use exactly one of these operators often and the rest rarely, and this lesson is what tells you which is which.',
          },
          {
            type: 'demo',
            id: 'j-l33-d1',
            title: 'Flags packed into one number',
            body: 'Change the three checkboxes. Each one sets a single bit, and the number below is those bits added together. This is the pattern behind permissions, feature toggles and save-file format versions.',
            html: `<label><input type="checkbox" id="read" checked /> can read</label>
<label><input type="checkbox" id="write" /> can write</label>
<label><input type="checkbox" id="admin" /> is admin</label>
<p>bits: <code id="bits">001</code> &nbsp; value: <strong id="val">4</strong></p>`,
            javascript: `const boxes = ['read', 'write', 'admin']
const bits = document.querySelector('#bits')
const val = document.querySelector('#val')

function render() {
  const flags = { read: 1, write: 2, admin: 4 }
  let total = 0

  for (const name of boxes) {
    const box = document.querySelector('#' + name)
    if (box.checked) total = total | flags[name]
  }

  bits.textContent = total.toString(2).padStart(3, '0')
  val.textContent = total
}

for (const name of boxes) {
  document.querySelector('#' + name).addEventListener('change', render)
}
render()`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'j-l33-h1',
            level: 3,
            body: 'Seeing the bits',
          },
          {
            type: 'code',
            id: 'j-l33-c1',
            language: 'javascript',
            title: 'Number to binary and back',
            code: `(5).toString(2)          // '101'
(5).toString(8)          // '5'   - octal
(255).toString(16)       // 'ff'  - hex

parseInt('101', 2)       // 5
parseInt('ff', 16)       // 255
Number('0b101')          // 5

(5).toString(2).padStart(8, '0')   // '00000101'`,
          },
          {
            type: 'text',
            id: 'j-l33-b2',
            body: 'A bit is a single 1 or 0, and the rightmost bit is worth 1, the one to its left 2, then 4, 8, 16. So `5` is `101`: 4 + 0 + 1. `toString(2)` shows that, and `parseInt(text, 2)` turns it back. Everything in this lesson is easier once you can look at the binary, because the operators then say what they mean: each one either reads a column of bits or flips it.',
          },
          {
            type: 'code',
            id: 'j-l33-c2',
            language: 'javascript',
            title: 'The five bitwise operators on 12 and 10',
            code: `// 12 is 1100, 10 is 1010

12 & 10    // 8    1000 - a bit is on only if it is on in BOTH
12 | 10    // 14   1110 - a bit is on if it is on in EITHER
12 ^ 10    // 6    0110 - on when the two bits DIFFER
~12        // -13  every bit flipped, so the number goes negative

1 << 3     // 8    one place left: double three times
256 >> 4   // 16   one place right four times

true & true      // 1 - booleans convert to 1 and 0 first
true | false     // 1`,
          },
          {
            type: 'tip',
            id: 'j-l33-t1',
            title: 'Bitwise OR is the one you will really use',
            body: '`|` is how flags get set: `flags |= READ` turns one permission on, and the other bits are untouched because `|` only ever adds. `true | false` is also how people turn a condition into a real 1 or 0, though `Boolean(value)` says that better. If you remember one operator from this lesson, make it this one.',
          },
          {
            type: 'warning',
            id: 'j-l33-w1',
            title: 'Bitwise operators do not work on numbers above 31 bits',
            body: 'JavaScript bitwise operators convert their operands to **32-bit signed integers** first. `1000000000 | 1` does not give you `1000000001` - the left side loses its high digits on the way in. The moment your numbers get large, use arithmetic (`+`, `*`, `Math.floor(x / 2)`) or `BigInt`. This is not a theoretical limit: a price in cents or a timestamp in milliseconds is already past it.',
          },
          {
            type: 'code',
            id: 'j-l33-c3',
            language: 'javascript',
            title: 'Where the 32-bit limit bites',
            code: `console.log(1000000000 | 1)    // 1 - the high digits were discarded
console.log(1000000000 + 1)    // 1000000001

console.log(2147483647 + 1 | 0) // -2147483648 - it wrapped into the sign bit
console.log(1e10 >> 1)          // 5000000000 is fine for shifts, but not with & or |

// safe arithmetic for halving and doubling
console.log(Math.floor(7 / 2))   // 3
console.log(7 * 2)               // 14`,
          },
          {
            type: 'heading',
            id: 'j-l33-h2',
            level: 3,
            body: 'Shifts, and reading one correctly',
          },
          {
            type: 'code',
            id: 'j-l33-c4',
            language: 'javascript',
            title: 'Multiply and divide by powers of two',
            code: `const n = 40

n << 1      // 80
n << 3      // 320   - n times 2, three times
n >> 2      // 10    - n divided by 4
n >> 0      // 40    - no change, which is the same as no operator at all

// the classic: halve without dividing
console.log(Math.floor(n / 2))   // 20`,
          },
          {
            type: 'text',
            id: 'j-l33-b5',
            body: 'A left shift moves every bit one place along, which multiplies by two; a right shift moves them back, which divides by two. The number after the shift is the **distance**, not the new value, so `n >> 2` means "move two places" and not "become 2". `>>>` is the unsigned version: it fills from the left with zeros instead of the sign bit, which is what you want for a colour channel or a bit field rather than for a negative number.',
          },
          {
            type: 'list',
            id: 'j-l33-l1',
            style: 'bullet',
            items: [
              '`&` - **and**: a bit survives only when it is set in both numbers.',
              '`|` - **or**: a bit survives when it is set in either number. The everyday one.',
              '`^` - **xor**: a bit survives when the two differ. Also how you swap two values with no temporary.',
              '`~` - **not**: flips every bit, which always turns a positive number negative.',
              '`<<` and `>>` - shifts: multiply and divide by powers of two, subject to the 32-bit limit.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l33-w2',
            title: 'Do not reach for & and | to test a condition',
            body: '`if (value & 1)` works, and it is slower to read than `if (value % 2 === 1)` for no benefit, because both are constant time. Reserve `&` for bit fields and flags you deliberately packed. For "is this on / off" on a boolean, `if (isOpen)` already says it.',
          },
          {
            type: 'tip',
            id: 'j-l33-t2',
            title: '^ as a swap, and as "is this different"',
            body: 'Two uses worth knowing. Swapping without a temporary: `a = a ^ b; b = a ^ b; a = a ^ b`. And finding the differing bit of two flags: `mask = a ^ b` - the bits that are set in `mask` are exactly the ones that disagree, so `if (a ^ b & MASK)` is a genuine "has anything changed" test on a bit field.',
          },
          {
            type: 'example',
            id: 'j-l33-e1',
            title: 'Reading a permission as one number',
            body: 'The value is stored once and read back piece by piece. Change the checkboxes and the same number answers all three questions.',
            html: `<label><input type="checkbox" id="read" checked /> read</label>
<label><input type="checkbox" id="write" /> write</label>
<label><input type="checkbox" id="admin" /> admin</label>
<p id="out">&mdash;</p>`,
            javascript: `const READ = 1
const WRITE = 2
const ADMIN = 4

let flags = READ

function describe(value) {
  const parts = []
  if (value & READ) parts.push('read')
  if (value & WRITE) parts.push('write')
  if (value & ADMIN) parts.push('admin')
  return parts.length ? parts.join(' + ') : 'no access'
}

function render() {
  const out = document.querySelector('#out')
  out.textContent = 'flags = ' + flags + ' (' + flags.toString(2) + ') means ' + describe(flags)

  flags = 0
  if (document.querySelector('#read').checked) flags = flags | READ
  if (document.querySelector('#write').checked) flags = flags | WRITE
  if (document.querySelector('#admin').checked) flags = flags | ADMIN
}

for (const id of ['read', 'write', 'admin']) {
  document.querySelector('#' + id).addEventListener('change', render)
}
render()`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l33-x1',
            exercise: {
              id: 'ex-js-bit-flags',
              instructions:
                'Flags are packed into one number with bitwise OR. Write three helpers. `setFlag(flags, bit)` turns that one flag on and returns the new number, leaving every other flag exactly as it was. `hasFlag(flags, bit)` returns true when that flag is on. `countFlags(flags)` returns how many of the three flags are on. Log `countFlags(setFlag(0, 2))`, then `hasFlag(setFlag(0, 2), 2)` and `countFlags(setFlag(setFlag(0, 2), 4))`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Bit 1 = read, bit 2 = write, bit 4 = admin.
// setFlag turns one flag on and touches nothing else.
// hasFlag reports whether one flag is on.
// countFlags reports how many of the three are on.

function setFlag(flags, bit) {

}

function hasFlag(flags, bit) {

}

function countFlags(flags) {

}

console.log(countFlags(setFlag(0, 2)))
console.log(hasFlag(setFlag(0, 2), 2))
console.log(countFlags(setFlag(setFlag(0, 2), 4)))
`,
              },
              expectedOutput: '1\ntrue\n2',
              tests: [
                {
                  id: 'ex-js-bit-flags-t1',
                  label: 'All three helpers are functions',
                  body: `if (typeof setFlag !== 'function') return 'Define setFlag.'
if (typeof hasFlag !== 'function') return 'Define hasFlag.'
if (typeof countFlags !== 'function') return 'Define countFlags.'
return true;`,
                },
                {
                  id: 'ex-js-bit-flags-t2',
                  label: 'setFlag turns exactly one flag on',
                  body: `if (typeof setFlag !== 'function') return 'Define setFlag.'
return setFlag(0, 2) === 2 && setFlag(0, 4) === 4
  ? true
  : 'setFlag(0, 2) should be 2 and setFlag(0, 4) should be 4. Got: ' + setFlag(0, 2) + ' and ' + setFlag(0, 4);`,
                },
                {
                  id: 'ex-js-bit-flags-t3',
                  label: 'setFlag leaves the other flags alone',
                  body: `if (typeof setFlag !== 'function') return 'Define setFlag.'
if (setFlag(3, 4) !== 7) return 'setFlag(3, 4) should keep flags 1 and 2 and add 4, so 7. Got: ' + setFlag(3, 4)
if (setFlag(7, 2) !== 7) return 'Setting a flag that is already on must change nothing, so setFlag(7, 2) should stay 7. Got: ' + setFlag(7, 2)
return true;`,
                },
                {
                  id: 'ex-js-bit-flags-t4',
                  label: 'hasFlag and countFlags read the number',
                  body: `if (typeof hasFlag !== 'function') return 'Define hasFlag.'
if (typeof countFlags !== 'function') return 'Define countFlags.'
if (hasFlag(5, 1) !== true) return 'hasFlag(5, 1) should be true - bit 1 is on in 5.'
if (hasFlag(5, 2) !== false) return 'hasFlag(5, 2) should be false - bit 2 is not on in 5.'
return countFlags(5) === 2 ? true : '5 has bits 1 and 4 on, so countFlags(5) should be 2. Got: ' + countFlags(5);`,
                },
              ],
              hints: [
                'Three separate questions: `|` to turn a flag on without touching the rest, `&` to read one bit back, and a loop over the three bit values to count.',
                '`hasFlag(flags, bit)` is `flags & bit` - and it is already a number, so compare it: `> 0` for true.',
                'For `countFlags`, start at 0 and add one each time `flags & bit` is greater than 0, for bit = 1, then 2, then 4.',
              ],
              solution: {
                javascript: `function setFlag(flags, bit) {
  return flags | bit
}

function hasFlag(flags, bit) {
  return (flags & bit) > 0
}

function countFlags(flags) {
  let total = 0
  for (const bit of [1, 2, 4]) {
    if (hasFlag(flags, bit)) total = total + 1
  }
  return total
}

console.log(countFlags(setFlag(0, 2)))
console.log(hasFlag(setFlag(0, 2), 2))
console.log(countFlags(setFlag(setFlag(0, 2), 4)))`,
              },
              testNotes:
                'The checks only read what the helpers return, so any correct implementation passes. The third check is the one that catches a version using `+` instead of `|`, which would carry between neighbouring flags.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s26',
    title: 'Regular expressions',
    description: 'A small language for describing the shape of text, and knowing when not to use one.',
    lessons: [
      {
        id: 'js-l34',
        title: 'Regular expressions',
        description: 'A small language for describing the shape of text: the characters you need, the flags that decide how much it matches, and the point where to stop using one.',
        duration: 5,
        objectives: [
          'Read a pattern and say what shape of text it accepts',
          'Use g, i and m to change how much a pattern matches',
          'Validate a value with test and rewrite one with replace',
          'Tell match and matchAll apart',
          'Recognise the point where split and trim are the better tool'
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l34',
          title: 'Regular expressions quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l34-q1',
              type: 'multiple-choice',
              prompt: 'Why does `isHexColor("#zzz#fff")` return false with a properly anchored pattern, but true without the anchors?',
              options: [
                'Anchors make the pattern faster',
                '`^` and `$` require the whole string to be the shape, so an unrelated match inside a longer string is not enough',
                'Anchors add the `i` flag automatically',
                'Without anchors the pattern throws',
              ],
              answer: 1,
              explanation: 'A pattern without `^` and `$` is a search: it succeeds on finding the shape anywhere. A pattern with them is a full-string check. Validation is a full-string question, so validation patterns need anchors.',
            },
            {
              id: 'quiz-js-l34-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const s = \'a  b   c\'\nconsole.log(s.replace(/\\s+/, \'-\'))\nconsole.log(s.replace(/\\s+/g, \'-\'))',
              options: [
                'a-b-c then a-b-c',
                'a-b-c then a-b-c with all gaps',
                'a  b-c  then a-b-c',
                'a  b   c then a  b   c',
              ],
              answer: 2,
              explanation: 'Without `g`, `replace` changes the first match only, so the second gap survives. With `g` every run of whitespace is replaced, which is why "clean this whole string" almost always needs the global flag.',
            },
            {
              id: 'quiz-js-l34-q3',
              type: 'true-false',
              prompt: 'The `g` flag makes `test` check the whole string from start to finish each time.',
              answer: false,
              explanation: 'Without `g`, `test` looks for the first match anywhere. With `g`, a pattern object remembers where it last stopped, so calling `test` twice on the *same* pattern object can give different answers. Put patterns in a named `const` without `g`, or build a fresh one, to avoid it.',
            },
            {
              id: 'quiz-js-l34-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this validation?',
              code: 'function isHex(value) {\n  return /#?[0-9a-f]{3,6}/i.test(value)\n}\n\nconsole.log(isHex(\'#fff\'))    // true, by luck\nconsole.log(isHex(\'#fff and more text\'))',
              options: [
                'Nothing is wrong, so both lines print true',
                'There are no anchors and the `#` is optional, so the second line matches anyway - a search rather than a shape check',
                'The `i` flag cannot be combined with `{3,6}`',
                '`test` needs a number, not a string',
              ],
              answer: 1,
              explanation: 'Without `^` and `$` the pattern is a search, so it finds three to six hex characters anywhere in the string and says yes. With the hash optional it also accepts bare `fff`. Validation wants `^#([0-9a-f]{3}|[0-9a-f]{6})$`, which is what the exercise builds.',
            },
            {
              id: 'quiz-js-l34-q5',
              type: 'blank',
              prompt: 'Which method returns the first match together with its captured groups?',
              answers: [
                'match()',
                'match',
                '.match()',
                'string.match()',
                'exec()',
                '.exec()',
              ],
              explanation: '`str.match(pattern)` gives the first match, its index, and any groups after it. Without `g` that is what you get; with `g` you get a flat array of matches and no groups. `matchAll` walks every match while keeping the groups.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l34-b1',
            body: 'A regular expression is a tiny language for describing the **shape** of text rather than one particular string. You write the shape once and it matches every value that fits it - every run of digits, every word ending in `ing`, every value shaped like a hex colour. The pitch is speed of writing; the cost is speed of reading. Patterns are wonderful right up until they are not, and knowing which side of that line you are on is the whole skill.',
          },
          {
            type: 'demo',
            id: 'j-l34-d1',
            title: 'A pattern that accepts a shape',
            body: 'Type a colour value. The pattern is anchored at both ends, so it accepts the shape and nothing else. Delete the hash or add a digit and it stops matching.',
            html: `<label for="hex">Colour</label>
<input id="hex" value="#fff" />
<p id="out">&mdash;</p>`,
            css: '#out { font-weight: 600; }',
            javascript: `const input = document.querySelector('#hex')
const out = document.querySelector('#out')
const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

function render() {
  const value = input.value
  out.textContent = HEX.test(value)
    ? 'Matches: a hex colour'
    : 'No match: not shaped like a hex colour'
}

input.addEventListener('input', render)
render()`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'j-l34-h1',
            level: 3,
            body: 'The literal and the characters in it',
          },
          {
            type: 'code',
            id: 'j-l34-c1',
            language: 'javascript',
            title: 'The dozen characters that cover most real work',
            code: `/abc/          // the letters a, b, c in that order
/.            // any single character except a newline
/\\d/ /\\w/ /\\s/  // a digit; a letter, digit or underscore; a space or newline
/[aeiou]/      // one of the characters inside the brackets
/^cat/ /cat$/   // 'cat' at the very start, 'cat' at the very end
/ab+c/ /colou?r/  // one or more b; the optional u in 'colour'
/\\d{4}-\\d{2}/  // exactly four digits, a dash, exactly two
/(cat|dog)/    // either 'cat' or 'dog'
/\\./           // a literal dot - a dot alone means "any character"`,
          },
          {
            type: 'list',
            id: 'j-l34-l1',
            style: 'bullet',
            items: [
              '`g` - global: find **every** match, not just the first. Without it `replace` changes one occurrence and `match` returns one result.',
              '`i` - ignore case: `/ada/i` matches `Ada`, `ADA` and `ada`.',
              '`m` - multiline: `^` and `$` match at the start and end of **each line** instead of the whole string.',
              '`s` - dotall: `.` also matches a newline. Rarely what you want.',
              '`y` and `u` - sticky matching and full Unicode support. Know they exist; you will not need them for a while.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l34-h2',
            level: 3,
            body: 'test and replace',
          },
          {
            type: 'code',
            id: 'j-l34-c2',
            language: 'javascript',
            title: 'One yes-or-no question, and one rewrite',
            code: `/^[a-z]{2}\\d{2}$/.test('ab12')     // true
/^[a-z]{2}\\d{2}$/.test('ab123')   // false - one digit too many

const title = 'Ada, bo  and cy'
title.replace(/\\s+/g, '-')       // 'Ada,-bo-and-cy'  every run, thanks to g
title.replace(/\\s+/, '-')       // 'Ada,-bo  and cy'  only the first run

'2024-05-06'.replaceAll('-', '/')  // '2024/05/06' - no pattern needed for this one`,
          },
          {
            type: 'text',
            id: 'j-l34-b2',
            body: '`test` asks one question and answers with a boolean, which makes it the right tool for validation and for guards: `if (!/^\\d+$/.test(input)) showError()`. `replace` takes a pattern (or a plain string) plus a replacement and returns a **new** string; the `g` flag turns it from "first only" into "all of them". The replacement has escaping rules of its own - `$&` is the text that matched and `$1` is capture group 1, so a literal `$` is written `$$`. One trap worth knowing before it surprises you: a pattern object carrying `g` remembers where it stopped, so `test` called twice on the **same** pattern can answer differently.',
          },
          {
            type: 'heading',
            id: 'j-l34-h3',
            level: 3,
            body: 'match and matchAll, in one paragraph',
          },
          {
            type: 'code',
            id: 'j-l34-c3',
            language: 'javascript',
            title: 'One pattern, three different results',
            code: `'2024-05-06'.match(/\\d{2}/g)       // ['05', '06'] - every match, no groups
'2024-05-06'.match(/\\d{2}/)        // ['05'] - the first match, plus its index
'2024-05-06'.match(/(\\d{4})-(\\d{2})-(\\d{2})/)
// ['2024-05-06', '2024', '05', '06'] - first match, then the groups

const dates = [...'2024-05-06 and 1999-01-02'.matchAll(/(\\d{4})-(\\d{2})/g)]
dates.length                        // 2 - every match, groups intact`,
          },
          {
            type: 'text',
            id: 'j-l34-b3',
            body: 'Without the `g` flag, `match` hands you the first match, the text around it, the index it sat at, and any captured groups after it. With `g` you get a flat array of every matching substring and no groups at all. `matchAll` keeps the groups while still going through every match, and it returns an iterator rather than an array, so it must be spread with `[...]` before you can call `length` or `map` on it.',
          },
          {
            type: 'tip',
            id: 'j-l34-t1',
            title: 'Give every pattern a name',
            body: 'Put patterns in a `const` at the top of the file and let the name carry the meaning: `const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i`. A named pattern can be reused, tried on its own in the console and changed in one place - and it dodges the shared-state trap, because `HEX.test(...)` called twice in a row is safe when the pattern carries no `g` flag.',
          },
          {
            type: 'warning',
            id: 'j-l34-w1',
            title: 'Past a certain complexity a pattern is worse than the alternative',
            body: 'If you cannot read the pattern out loud in one sentence, it does not belong in the code. `/^(?:(?:\\d{1,3}\\.){3}\\d{1,3})$/` is quicker to get subtly wrong than `value.split(\'.\').length === 4`, and quicker still to break when somebody edits it. For splitting and cleaning, **`split` plus `trim` is usually the better tool**: `\'a, b ,c\'.split(\',\').map((part) => part.trim()).filter(Boolean)` is something you can check by eye and step through. Reach for a pattern when the shape itself is the thing you are testing - digits only, a hex colour, a plausible email - and keep it small enough to say out loud.',
          },
          {
            type: 'exercise',
            id: 'j-l34-x1',
            exercise: {
              id: 'ex-js-hex-pattern',
              instructions:
                'Two helpers for CSS colour values. `isHexColor(value)` returns `true` only when the text is a `#` followed by exactly 3 or exactly 6 digits a-f in either case, and `false` for everything else - a bare `#`, a value with other letters, or anything that is not a string. `normaliseHex(value)` returns the colour lowercased, with the three-digit form expanded so its digits are doubled: `#ABC` becomes `#aabbcc`. Write the pattern once as a `const` and use it in both functions.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// isHexColor('#fff')      -> true
// isHexColor('fff')       -> false  no hash
// isHexColor('#fffff')    -> false  five digits is not a shape
// isHexColor(42)          -> false  not a string
// normaliseHex('#ABC')    -> '#aabbcc'

// One pattern, anchored at both ends, shared by both functions.
const HEX = /the pattern goes here/

function isHexColor(value) {

}

function normaliseHex(value) {

}

console.log(isHexColor('#fff'), isHexColor('fff'))
console.log(normaliseHex('#ABC'))
`,
              },
              expectedOutput: 'true false\n#aabbcc',
              tests: [
                {
                  id: 'ex-js-hex-pattern-t1',
                  label: 'isHexColor accepts the three- and six-digit forms',
                  body: `if (typeof isHexColor !== 'function') return 'Define isHexColor.'
if (isHexColor('#fff') !== true) return 'Expected true for #fff, got: ' + JSON.stringify(isHexColor('#fff'))
return isHexColor('#A1b2C3') === true ? true : 'Expected true for #A1b2C3 - an upper-case digit must count, so use the i flag.';`,
                },
                {
                  id: 'ex-js-hex-pattern-t2',
                  label: 'isHexColor rejects text of the wrong shape',
                  body: `if (typeof isHexColor !== 'function') return 'Define isHexColor.'
var wrong = ['fff', '#', '#fffff', '#a1b2c3d', '#gggggg', ' #fff']
for (var i = 0; i < wrong.length; i++) {
  if (isHexColor(wrong[i]) !== false) return 'Expected false for ' + JSON.stringify(wrong[i]) + ' - anchors at both ends stop anything extra sneaking in.'
}
return true;`,
                },
                {
                  id: 'ex-js-hex-pattern-t3',
                  label: 'isHexColor rejects values that are not strings',
                  body: `if (typeof isHexColor !== 'function') return 'Define isHexColor.'
var values = [42, null, undefined, {}, ['#fff'], true]
for (var i = 0; i < values.length; i++) {
  if (isHexColor(values[i]) !== false) return 'Expected false for ' + JSON.stringify(values[i]) + ' - check typeof first.'
}
return true;`,
                },
                {
                  id: 'ex-js-hex-pattern-t4',
                  label: 'normaliseHex lowercases and expands the short form',
                  body: `if (typeof normaliseHex !== 'function') return 'Define normaliseHex.'
if (normaliseHex('#ABC') !== '#aabbcc') return 'Expected #aabbcc from #ABC, got: ' + normaliseHex('#ABC')
return normaliseHex('#A1B2C3') === '#a1b2c3' ? true : 'A six-digit value only needs lowercasing - got: ' + normaliseHex('#A1B2C3');`,
                },
              ],
              hints: [
                'Build the pattern from the inside out: a literal `#`, then a group holding either three or six characters from the digit-and-letter range, then anchors at both ends.',
                '`^` and `$` make this a shape check rather than a search - without them, `isHexColor("#zzz#fff")` would find `#fff` inside the string and say yes.',
                '`isHexColor` is one call: `return HEX.test(value)`. For `normaliseHex`, `value.match(HEX)` returns the full match followed by the digits in group 1, so `[1]` is what you lowercase and return.',
              ],
              solution: {
                javascript: `const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

function isHexColor(value) {
  if (typeof value !== 'string') return false
  return HEX.test(value)
}

function normaliseHex(value) {
  const match = value.match(HEX)
  if (!match) return value

  const digits = match[1].toLowerCase()
  if (digits.length === 3) return '#' + digits.replace(/./g, (char) => char + char)
  return '#' + digits
}

console.log(isHexColor('#fff'), isHexColor('fff'))
console.log(normaliseHex('#ABC'))`,
              },
              testNotes:
                'The checks call both helpers with good and bad values. Nothing inspects the pattern itself, so any expression that accepts the right shapes passes.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s27',
    title: 'Errors',
    description: 'Reading the errors you will actually hit, and deciding whether to handle a failure or crash on it.',
    lessons: [
      {
        id: 'js-l35',
        title: 'Errors you will actually hit',
        description: 'Reading a message bottom-up, the two failure shapes behind most errors, and what to do when a failure is something to handle rather than crash on.',
        duration: 6,
        xp: 50,
        objectives: [
          'Read a stack trace and find the first frame in your own code',
          'Diagnose `is not a function` down to a typo or a missing value',
          'Guard against `null` and `undefined` before reading a property',
          'Use try, catch and finally for failures you cannot rule out'
        ],
        quiz: {
          id: 'quiz-js-l35',
          title: 'Errors you will actually hit quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l35-q1',
              type: 'multiple-choice',
              prompt: 'Where do you start reading a stack trace?',
              options: [
                'At the bottom, because that is where the program started',
                'At the first line for what went wrong, then the first frame in a file you recognise for where',
                'At the frame with the longest file path',
                'Anywhere, since every frame says the same thing',
              ],
              answer: 1,
              explanation: 'The first line names the failure and the operation that caused it. The frames below are the call chain printed from the inside out, so the first frame in a file you know is your code, and reading further up tells you how the call reached you.',
            },
            {
              id: 'quiz-js-l35-q2',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function getUser(id) {\n  return null\n}\n\nconst user = getUser(\'ada\')\nconsole.log(user?.name)',
              options: [
                'Ada',
                'undefined',
                'null',
                'It throws',
              ],
              answer: 1,
              explanation: 'The optional chaining `?.` stops the property read as soon as the left side is `null` or `undefined`, and the whole expression evaluates to `undefined` rather than throwing. Add `?? \'Unknown\'` when you want a usable value instead.',
            },
            {
              id: 'quiz-js-l35-q3',
              type: 'true-false',
              prompt: 'A `finally` block runs even when the `try` block already returned a value.',
              answer: true,
              explanation: '`finally` runs on every path out of a `try` - after a normal return, after the `catch` handled something, and after a re-throw. That is exactly why cleanup belongs there rather than at the end of the function, where an early return would skip it.',
            },
            {
              id: 'quiz-js-l35-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this code?',
              code: 'function loadSettings(text) {\n  try {\n    return JSON.parse(text)\n  } catch (error) {\n  }\n}',
              options: [
                'Nothing is wrong - an empty catch is valid',
                'A `catch` must return or re-throw, so this one swallows the failure and the caller cannot tell a real value from a failure',
                '`JSON.parse` needs a second argument inside `try`',
                'The `catch` parameter must be named `e`, not `error`',
              ],
              answer: 1,
              explanation: 'A `catch` block that does nothing logs nothing and returns nothing, so the caller gets `undefined` and invents its own theory about why. Either recover - log with enough context and return a fallback the caller can use - or re-throw so the caller decides. If the only thing that fits in the block is a comment, delete the `try`.',
            },
            {
              id: 'quiz-js-l35-q5',
              type: 'blank',
              prompt: 'Which property holds the human-readable text of a thrown Error?',
              answers: [
                'message',
                'error.message',
                '.message',
              ],
              explanation: '`error.message` is the text you wrote when you threw, and it is what a browser prints on the first line of the stack. `error.name` is the class, and `error instanceof TypeError` tells a caller which kind of mistake it was.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l35-b1',
            body: 'An error message is a report, not a punishment: it names the kind of failure, describes the specific thing that went wrong, and lists the calls in progress when it happened. Almost every error is one of two shapes - **a name that does not exist**, or **a value that is not there** - and both are usually a typo, a missing `await`, or something from outside your code that nobody checked. An uncaught error stops the code that is running, so the statements after it never happen: one missing element can leave half a page unstyled rather than merely empty.',
          },
          {
            type: 'demo',
            id: 'j-l35-d1',
            title: 'One missing element, two different failures',
            body: 'Untick the box and the panel stops updating. Nothing looks broken in the page; the code after the failure simply never runs. That is what an uncaught error looks like from the outside.',
            html: `<label><input type="checkbox" id="on" checked /> the #panel element exists</label>
<p id="readout">Panel says: (nothing yet)</p>
<p id="status">ok</p>`,
            javascript: `const toggle = document.querySelector('#on')
const readout = document.querySelector('#readout')
const status = document.querySelector('#status')

function report() {
  try {
    const panel = document.querySelector('#panel')
    readout.textContent = 'Panel says: ' + panel.textContent
    status.textContent = 'ok'
  } catch (error) {
    readout.textContent = 'Panel says: (nothing yet)'
    status.textContent = 'stopped: ' + error.message
  }
}

toggle.addEventListener('change', report)
report()`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'j-l35-h1',
            level: 3,
            body: 'Read the message bottom-up',
          },
          {
            type: 'code',
            id: 'j-l35-c1',
            language: 'plaintext',
            title: 'A real error, as a browser prints it',
            code: `Uncaught TypeError: Cannot read properties of null (reading 'textContent')
    at updateTotal (cart.js:18:21)
    at onSubmit (cart.js:44:9)
    at HTMLFormElement.handleSubmit (cart.js:51:5)`,
          },
          {
            type: 'text',
            id: 'j-l35-b2',
            body: 'The first line is the diagnosis: a `TypeError`, meaning a value was used in a way its type does not allow, plus the operation that failed. The lines under it are the **stack** - the call chain printed from the inside out, each frame giving a file, a line and a column. Start at the top line, then take the first frame that is a file you recognise: that is your code. Keep going up until the frames are files you do not know, because the topmost unknown frame is where the call came from. The chain tells you how your function was reached; only the first line tells you what was wrong.',
          },
          {
            type: 'heading',
            id: 'j-l35-h2',
            level: 3,
            body: 'The "is not a function" family',
          },
          {
            type: 'code',
            id: 'j-l35-c2',
            language: 'javascript',
            title: 'Three causes, one message',
            code: `console.log(appliedDiscount(subtotal, 0.1))   // appliedDiscount is not a function

const user = findUser('ada')      // undefined when nobody matches
console.log(user.label())         // user.label is not a function

const total = 10 + '14'           // the string '1014', not the number 24
console.log(total.toFixed(2))     // total.toFixed is not a function`,
          },
          {
            type: 'warning',
            id: 'j-l35-w1',
            title: 'The null wording is the same bug one step earlier',
            body: 'Older Safari called it `undefined is not an object`. Same failure: you read a property of something that is not there. `null` comes from the places allowed to come back empty-handed - `querySelector` with no match, an object key nobody set, a function that returns nothing on one branch - and `undefined` from a missing argument or an index past the end. Two defences: `user?.label()` gives `undefined` instead of throwing, or `user?.label() ?? \'Unknown\'` supplies a fallback. When the missing thing is your own bug, say so rather than carry on.',
          },
          {
            type: 'heading',
            id: 'j-l35-h3',
            level: 3,
            body: 'try, catch and finally',
          },
          {
            type: 'code',
            id: 'j-l35-c3',
            language: 'javascript',
            title: 'Handle what can fail, clean up either way',
            code: `function loadSettings(text) {
  try {
    return JSON.parse(text)
  } catch (error) {
    console.warn('Could not read the settings:', error.message)
    return null
  } finally {
    hideSpinner()   // runs even when the try returned or the catch fired
  }
}`,
          },
          {
            type: 'text',
            id: 'j-l35-b3',
            body: 'Wrap a block in `try` when the failure belongs to somebody else: text from a person, a file, a server, a value that must be validated. Do not wrap your own arithmetic, and never use `catch` as a tidy way to branch - you will spend an afternoon wondering why a feature silently does nothing. Inside a `catch` you must decide: **recover**, by logging the message and returning a fallback the caller can use, or **re-throw**, so the caller decides. `finally` is for cleanup that must happen on every path - hiding a spinner, re-enabling a button - and it runs even when the `try` block already returned.',
          },
          {
            type: 'code',
            id: 'j-l35-c4',
            language: 'javascript',
            title: 'Throw your own error, with a message worth reading',
            code: `function withdraw(amount) {
  if (typeof amount !== 'number') throw new TypeError('withdraw needs a number')
  if (amount <= 0) throw new RangeError('withdraw needs a positive amount, got: ' + amount)
}

try {
  withdraw(-5)
} catch (error) {
  console.log('Refused:', error.message)   // Refused: withdraw needs a positive amount, got: -5
}`,
          },
          {
            type: 'warning',
            id: 'j-l35-w2',
            title: 'Never swallow an error silently',
            body: 'Three shapes to recognise, all of them common. `catch (error) {}` does nothing at all. `catch (error) { return }` hides the failure **and** changes what the function returns, so the caller gets `undefined` and invents its own theory. `catch (error) { console.log(\'oops\') }` records something but says nothing about what to do next. What holds up: log with enough context to act on - `console.error(\'Could not load user\', id, error)` - then return a sensible fallback or re-throw. If the only thing you can put in a catch block is a comment, delete the `try`.',
          },
          {
            type: 'tip',
            id: 'j-l35-t1',
            title: 'A thrown Error is a value, and the message is the whole point',
            body: '`new Error(\'Cart 42 has no items\')` carries the information the next reader needs; `new Error()` carries nothing and sends them back to the debugger. Include the values that made it wrong, as the `RangeError` above does with the amount. `error.message` is what gets logged, `error.name` is the class, and `error instanceof TypeError` is how a caller tells a bad type from a bad range.',
          },
          {
            type: 'exercise',
            id: 'j-l35-x1',
            exercise: {
              id: 'ex-js-catch-message',
              instructions:
                'Write `parseJsonOrExplain(text)` so it returns the parsed value when `text` is valid JSON. When the text cannot be parsed, log a message containing the word `Invalid` and return `null` instead of letting the error escape. The log call belongs **inside** the catch block: handling the failure where it happens is the exercise.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Returns the parsed value when text is valid JSON.
// Otherwise: log a message containing the word 'Invalid'
// and return null - from inside the catch block.

function parseJsonOrExplain(text) {

}

console.log(parseJsonOrExplain('{"name":"Ada"}'))
console.log(parseJsonOrExplain('{ not json'))
`,
              },
              expectedOutput: 'The parsed object, then a line starting with Invalid JSON.',
              tests: [
                {
                  id: 'ex-js-catch-message-t1',
                  label: 'parseJsonOrExplain is a function',
                  body: `return typeof parseJsonOrExplain === 'function' ? true : 'Define parseJsonOrExplain.';`,
                },
                {
                  id: 'ex-js-catch-message-t2',
                  label: 'Valid JSON comes back as the parsed value',
                  body: `if (typeof parseJsonOrExplain !== 'function') return 'Define parseJsonOrExplain.'
var out
try { out = parseJsonOrExplain('{"name":"Ada","age":36}') } catch (error) { return 'That call threw: ' + error.message }
if (!out || out.name !== 'Ada' || out.age !== 36) return 'Expected the parsed object, got: ' + JSON.stringify(out)
return true;`,
                },
                {
                  id: 'ex-js-catch-message-t3',
                  label: 'Broken JSON returns null instead of throwing',
                  body: `if (typeof parseJsonOrExplain !== 'function') return 'Define parseJsonOrExplain.'
var broken = ['{ not json', '', 'nope', '[1, 2']
for (var i = 0; i < broken.length; i++) {
  var out
  try { out = parseJsonOrExplain(broken[i]) } catch (error) { return JSON.stringify(broken[i]) + ' escaped as ' + error.name }
  if (out !== null) return 'Expected null for ' + JSON.stringify(broken[i]) + ', got: ' + JSON.stringify(out)
}
return true;`,
                },
                {
                  id: 'ex-js-catch-message-t4',
                  label: 'The failure is logged with the word Invalid',
                  body: `var log = window.__log || []
for (var i = 0; i < log.length; i++) { if (log[i].toLowerCase().indexOf('invalid') > -1) return true }
return 'Expected a console.log containing Invalid - got: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'One thing in the try block can go wrong: `JSON.parse` throws when the text is not valid JSON.',
                'The shape is `try { return JSON.parse(text) } catch (error) { ... return null }`, and `error.message` is the text worth logging.',
                'Log first and return second, both between the catch braces: `console.log(\'Invalid JSON: \' + error.message)` then `return null`.',
              ],
              solution: {
                javascript: `function parseJsonOrExplain(text) {
  try {
    return JSON.parse(text)
  } catch (error) {
    console.log('Invalid JSON: ' + error.message)
    return null
  }
}

console.log(parseJsonOrExplain('{"name":"Ada"}'))
console.log(parseJsonOrExplain('{ not json'))`,
              },
              testNotes:
                'The checks call your function with good and bad text and read the console, so your wording only has to contain "Invalid".',
            },
          },
        ],
      },
    ],
  },
]