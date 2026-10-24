import type { Section } from '~/types/content'

export const jsAsyncDomIntroSections: Section[] = [
  {
    id: 'js-s49',
    title: 'Callbacks',
    description:
      'Passing a function to another function so it can call you back later, and why that is the shape almost every browser API is built on.',
    lessons: [
      {
        id: 'js-l60',
        title: 'Callbacks',
        description:
          'What a callback actually is, why you pass a function instead of the result of calling one, and how the argument makes an API reusable.',
        duration: 6,
        objectives: [
          'Pass a function as an argument and say why the function is passed, not called',
          'Recognise the three mistakes that break a callback: calling it, forgetting to return, using the wrong this',
          'Write a function that takes a callback and calls it exactly once',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l60',
          title: 'Callbacks quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l60-q1',
              type: 'multiple-choice',
              prompt: 'What is a callback?',
              options: [
                'A function that is called immediately when it is defined',
                'A function passed to another function so it can be called later',
                'A function that must return a value to be useful',
                'A function declared inside another function',
              ],
              answer: 1,
              explanation: 'A callback is a function you hand over so somebody else can invoke it later. Nothing requires it to return anything — `forEach` and `addEventListener` ignore the return value entirely. And it does not have to be declared inside anything; a named function declared at the top level is a perfectly good callback.',
            },
            {
              id: 'quiz-js-l60-q2',
              type: 'true-false',
              prompt: '`setTimeout(greet(), 1000)` delays the call to `greet` by one second.',
              answer: false,
              explanation: 'The parentheses call `greet` immediately and pass whatever it returns to `setTimeout`, which then fails because a value is not a function. This is the classic "my callback never ran" bug: write `setTimeout(greet, 1000)` and let the timer decide when.',
            },
            {
              id: 'quiz-js-l60-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function each(list, callback) {\n  for (let i = 0; i < list.length; i++) {\n    callback(list[i], i)\n  }\n}\neach([\'a\', \'b\'], function (item) {\n  console.log(item)\n})',
              options: [
                'a then b',
                '0: a then 1: b',
                'aa then bb',
                'Nothing — the callback needs two parameters',
              ],
              answer: 0,
              explanation: 'The receiver passes the item and the index; your callback declares only the first, and the index is quietly ignored. A callback may accept fewer parameters than it is given, which is what makes `forEach` usable for both counting and transforming.',
            },
            {
              id: 'quiz-js-l60-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this function?',
              code: 'function shoutAll(words) {\n  words.forEach(function (word) {\n    return word.toUpperCase()\n  })\n  return words\n}\nconsole.log(shoutAll([\'hi\', \'yo\']))',
              options: [
                'forEach cannot be used to build a new array',
                'return inside the callback only leaves the callback, so words is unchanged',
                'The callback is missing its index parameter',
                'toUpperCase returns a number rather than a string',
              ],
              answer: 1,
              explanation: 'A `return` exits the function it sits in. The uppercased string goes back to `forEach`, which ignores it, so the array you return is still lowercase. `forEach` is for side effects only — to transform, use `map`, or collect the results yourself.',
            },
            {
              id: 'quiz-js-l60-q5',
              type: 'blank',
              prompt: 'Which syntax passes a function to `setTimeout` so that it runs later, without running it now?',
              answers: [
                'settimeout(fn, 500)',
                'fn',
                'settimeout(fn, 500)',
                'without the parentheses',
              ],
              explanation: 'Pass the bare function reference — `setTimeout(fn, 500)` — and the browser calls it when the delay expires. Adding parentheses turns the passing into a call, which is the mistake the rule exists to prevent.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l60-b1',
            body: 'A **callback** is a function you hand to some other function so that it can call you back when it is done. You have already used a thousand of them without calling them that: `forEach` takes a callback, `addEventListener` takes a callback, `setTimeout` takes a callback. In every case you pass a *reference* to a function — its name, or the whole `function () { }` expression — and the other function decides *when* to run it. That delay is the entire point, and it is why the callback cannot be called by you: you do not know yet whether the data has arrived.',
          },
          {
            type: 'demo',
            id: 'j-l60-d1',
            title: 'A callback that runs when it is ready',
            body: 'Click the button. `run` calls your function back after a moment, which is why the second line appears first: the callback did not exist yet when the code after `run` started executing.',
            html: `<button id="go">Run it</button>
<pre id="out">waiting…</pre>`,
            css: `button { font: inherit; padding: 0.4rem 0.9rem; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; font-size: 13px; }`,
            javascript: `const out = document.getElementById('go').nextElementSibling

document.getElementById('go').addEventListener('click', function () {
  out.textContent = 'called run()'
  run(function (value) {
    out.textContent += '\\nthe callback ran with ' + value
  })
  out.textContent += '\\n...this line came first'
})

function run(callback) {
  setTimeout(function () {
    callback('a result')
  }, 600)
}`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'j-l60-h1',
            level: 3,
            body: 'Passing the function, not calling it',
          },
          {
            type: 'code',
            id: 'j-l60-c1',
            language: 'javascript',
            title: 'The difference is a pair of brackets',
            code: `// passed: a reference to the function. The receiver runs it.
setTimeout(greet, 1000)
button.addEventListener('click', greet)
items.forEach(print)

// called: you run it now and hand over what it returned
setTimeout(greet(), 1000)      // greet runs immediately
addEventListener('click', greet())  // TypeError: undefined is not a function`,
          },
          {
            type: 'text',
            id: 'j-l60-b2',
            body: 'Writing `greet` instead of `greet()` is not a style preference, it is the whole mechanism. The parentheses mean *invoke this now and give me the result*. `setTimeout(greet(), 1000)` therefore calls `greet`, throws its return value away, and then tries to schedule a number as if it were a function — so the work happens too early and the timer never fires. Every time a callback "does not run", check first whether you called it before handing it over.',
          },
          {
            type: 'heading',
            id: 'j-l60-h2',
            level: 3,
            body: 'What the callback gets, and when',
          },
          {
            type: 'code',
            id: 'j-l60-c2',
            language: 'javascript',
            title: 'A callback with parameters',
            code: `function each(list, callback) {
  for (let i = 0; i < list.length; i++) {
    callback(list[i], i)   // the item, and where it was found
  }
}

each(['a', 'b'], function (item, index) {
  console.log(index + ': ' + item)
})`,
          },
          {
            type: 'text',
            id: 'j-l60-b3',
            body: 'The receiver decides both how many arguments the callback receives and what they mean. `forEach` calls yours with three — the item, the index, the whole array — and your callback may declare one parameter, two, or none; extra arguments are simply ignored. That is what makes a small API flexible: `each` above is a dozen lines and still gives you the index for free. The contract worth knowing is that the receiver will call your function *exactly once per item*, so anything you want to keep doing afterwards belongs after the loop, not inside the callback.',
          },
          {
            type: 'heading',
            id: 'j-l60-h3',
            level: 3,
            body: 'The mistake inside a callback: forgetting to return',
          },
          {
            type: 'code',
            id: 'j-l60-c3',
            language: 'javascript',
            title: 'Why the array comes back empty',
            code: `function upperAll(list) {
  each(list, function (item) {
    return item.toUpperCase()   // returned to each, not to upperAll
  })
  return list                  // unchanged: still lowercase
}`,
          },
          {
            type: 'warning',
            id: 'j-l60-w1',
            title: 'A return inside a callback leaves the callback',
            body: '`return` only ever exits the function it is written in. The `item.toUpperCase()` above goes back to `each`, which has nothing to do with it and discards it, so `list` is still lowercase when `upperAll` returns. This is the single most confusing bug in callback code, and the reason callbacks never *transform* anything. If a callback should produce a value, the outer function has to collect it — that is precisely what `map`, `filter` and promises were invented to do properly.',
          },
          {
            type: 'list',
            id: 'j-l60-l1',
            style: 'ordered',
            items: [
              'You pass a function reference: `setTimeout(fn, 500)`, not `setTimeout(fn(), 500)`.',
              'The receiver decides when it runs and what it passes in.',
              'A callback called once per item means your per-item work happens once per item — not the code after the call.',
              'A `return` inside the callback exits the callback, not the function that called it.',
              'Arrow functions do not get their own `this`, which is why they are the safe choice inside object methods.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l60-t1',
            title: 'Prefer an arrow function for a callback',
            body: 'A `function () { }` callback passed as a method argument gets a `this` of its own — in a browser event handler that is the element that was clicked, which is usually what you want, and inside a plain function call it is `undefined`. An arrow function inherits `this` from the surrounding scope, which removes the question entirely and stops the "why is this undefined in my setTimeout" bug.',
          },
          {
            type: 'exercise',
            id: 'j-l60-x1',
            exercise: {
              id: 'ex-js-callback-order',
              instructions:
                'Write a function `runInOrder(list, callback)` that calls `callback` once with the array of items it has processed, in the order they were processed. Use a callback rather than returning an array, and make sure `callback` is called exactly once — including when `list` is empty, where it should receive an empty array.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// your code here

function runInOrder(list, callback) {
  // call callback once, with the array of processed items
}

runInOrder(['a', 'b'], function (done) {
  console.log(done.join(','))
})
`,
              },
              tests: [
                {
                  id: 'ex-js-callback-order-t1',
                  label: 'runInOrder is defined and takes two parameters',
                  body: `if (typeof runInOrder !== 'function') return 'Define a function called runInOrder.'
return runInOrder.length === 2
  ? true
  : 'It should take the list first and the callback second: runInOrder(list, callback).';`,
                },
                {
                  id: 'ex-js-callback-order-t2',
                  label: 'It calls the callback with an array',
                  body: `if (typeof runInOrder !== 'function') return 'Define a function called runInOrder.'
var calls = 0
var got = null
runInOrder(['a', 'b'], function (value) {
  calls += 1
  got = value
})
return Array.isArray(got)
  ? true
  : 'The callback was called with ' + typeof got + ', but it needs an array.';`,
                },
                {
                  id: 'ex-js-callback-order-t3',
                  label: 'The items arrive in order',
                  body: `if (typeof runInOrder !== 'function') return 'Define a function called runInOrder.'
var got = null
runInOrder(['first', 'second', 'third'], function (value) {
  got = value
})
return Array.isArray(got) && got.join(',') === 'first,second,third'
  ? true
  : 'Expected first,second,third but got ' + JSON.stringify(got) + '.';`,
                },
                {
                  id: 'ex-js-callback-order-t4',
                  label: 'The callback fires exactly once, and fires for an empty list',
                  body: `if (typeof runInOrder !== 'function') return 'Define a function called runInOrder.'
var calls = 0
runInOrder(['a', 'b'], function () { calls += 1 })
if (calls !== 1) return 'For two items the callback should run once, it ran ' + calls + ' times.'
var emptyCalls = 0
runInOrder([], function () { emptyCalls += 1 })
return emptyCalls === 1
  ? true
  : 'An empty list should still call the callback once, with an empty array.';`,
                },
              ],
              hints: [
                'Start with an empty result array, add each item, then call the callback with the array once the loop is over.',
                'Calling the callback inside the loop gives you three calls for three items, not one. Move it out.',
                '`const results = []; for (...) { results.push(item) } callback(results)` handles the empty list for free.',
              ],
              solution: {
                javascript: `function runInOrder(list, callback) {
  const results = []
  for (let i = 0; i < list.length; i++) {
    results.push(list[i])
  }
  callback(results)
}

runInOrder(['a', 'b'], function (done) {
  console.log(done.join(','))
})`,
              },
              testNotes:
                'The tests call your function and watch what the callback receives and how many times it runs. They do not check *how* you get there, so building the array with map, with reduce or with a plain loop all pass.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s50',
    title: 'Asynchronous code',
    description:
      'Why waiting never blocks the page, what the event loop actually does, and how three nested callbacks turn into code that reads top to bottom.',
    lessons: [
      {
        id: 'js-l61',
        title: 'Callbacks and asynchronous code',
        description:
          'Why waiting is not blocking, what a promise actually is, and how async/await turns nested callbacks into code that reads top to bottom.',
        duration: 7,
        objectives: [
          'Explain the event loop in your own words',
          'Say what goes wrong with deeply nested callbacks',
          'Create a promise and handle it with then, catch and finally',
          'Write an async function and explain that await needs one',
          'Choose between Promise.all and Promise.allSettled',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-js-l61',
          title: 'Callbacks and asynchronous code quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l61-q1',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'console.log(\'one\')\nsetTimeout(function () {\n  console.log(\'two\')\n}, 1000)\nconsole.log(\'three\')',
              options: [
                'one, two, three',
                'one, three, two',
                'three, one, two',
                'one, two, three, but two arrives immediately',
              ],
              answer: 1,
              explanation: 'The current function runs to its end before the browser gets control back, so `one` and `three` both print immediately. Only once the call stack is empty does the event loop run the expired timer. Writing is not running — the position of a `setTimeout` in your file says nothing about when its callback fires.',
            },
            {
              id: 'quiz-js-l61-q2',
              type: 'true-false',
              prompt: 'A promise can be fulfilled and then rejected later, and `then` will run for both.',
              answer: false,
              explanation: 'A promise settles exactly once, and only the first outcome counts. The second call to `resolve` or `reject` is silently ignored, which is what lets `then` code assume a single, stable result instead of checking whether anything changed.',
            },
            {
              id: 'quiz-js-l61-q3',
              type: 'multiple-choice',
              prompt: 'Why is the callback pyramid hard to maintain?',
              options: [
                'Callbacks cannot be nested in modern JavaScript',
                'Each dependent step adds a level of indentation, pushing the real code right and the error handling out of reach',
                'The browser only runs one callback per page',
                'Nested callbacks are always slower than promises',
              ],
              answer: 1,
              explanation: 'The cost is legibility, not speed. Every dependency adds a level of nesting and another closing brace, so by the third or fourth level there is nowhere sensible to put an `if` and an error handler has to be threaded through every layer. Promises remove the nesting without removing the wait.',
            },
            {
              id: 'quiz-js-l61-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this snippet?',
              code: 'const response = fetch(\'/api/users\')\nconst users = response.json()\nconsole.log(users.length)',
              options: [
                'fetch must be called with await before its result can be used',
                'json() should be called without parentheses',
                'A response cannot be stored in a const',
                'Nothing — the promise resolves before the next line runs',
              ],
              answer: 0,
              explanation: 'Without `await`, `response` is a promise and `users` is a promise of an array, so `users.length` is `undefined` and nothing throws to warn you. `fetch` hands you the envelope asynchronously no matter where it appears; add `await` on both lines.',
            },
            {
              id: 'quiz-js-l61-q5',
              type: 'blank',
              prompt: 'Which method waits for every promise you give it and rejects as soon as the first one fails?',
              answers: [
                'promise.all',
                'promise.allsettled',
              ],
              explanation: '`Promise.all` needs every result to be meaningful, so it rejects on the first failure and discards the successes. `Promise.allSettled` always waits for the lot and reports each outcome with a `status` of `fulfilled` or `rejected`, which is the one you want when partial results still have value.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l61-b1',
            body: 'JavaScript runs one piece of code at a time on a single thread, so anything slow — a timer, a request, a big file — cannot simply stop the world and wait. Instead the slow work is handed off to the browser, your function runs to its end, and the **event loop** picks the finished work back up and calls you. That is why a page stays clickable while a request is in flight. The two lessons before this one gave you the shape of a callback; this one puts that shape into context, so the promise and async/await lessons that follow are refinements of something you have already met.',
          },
          {
            type: 'demo',
            id: 'j-l61-d1',
            title: 'The order the work really happens in',
            body: 'Click the button. The lines marked `sync` run first, all of them, before the queued work starts — which is exactly the surprise that catches people writing `const data = fetch(url)` and then reading `data` on the next line.',
            html: `<button id="go">Run the order test</button>
<pre id="out">ready</pre>`,
            css: `button { font: inherit; padding: 0.4rem 0.9rem; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; font-size: 13px; }`,
            javascript: `const out = document.getElementById('go').nextElementSibling

document.getElementById('go').addEventListener('click', function () {
  const lines = []
  lines.push('sync: the handler starts')

  setTimeout(function () {
    lines.push('later: the queued work, 500ms in')
    out.textContent = lines.join('\\n')
  }, 500)

  lines.push('sync: this line, even though it is written after setTimeout')
  lines.push('sync: and this one too')
  out.textContent = lines.join('\\n')
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'j-l61-b2',
            body: 'JavaScript runs one piece of code at a time on a single thread, so anything slow — a timer, a request, a big file — cannot simply stop the world and wait. Instead the slow work is handed off to the browser, your function runs to its end, and the **event loop** picks the finished work back up and calls you. That is why a page stays clickable while a request is in flight.',
          },
          {
            type: 'heading',
            id: 'j-l61-h1',
            level: 3,
            body: 'Callbacks: the first way to wait',
          },
          {
            type: 'code',
            id: 'j-l61-c1',
            language: 'javascript',
            title: 'A callback, and what nesting does to it',
            code: `// the slow work is put aside; the lines after it run first
console.log('one')
setTimeout(function () {
  console.log('two')
}, 1000)
console.log('three')

// one level of nesting is fine — three is a pyramid
getUser(function (user) {
  getPosts(user.id, function (posts) {
    getComments(posts[0].id, function (comments) {
      console.log(comments.length)
    })
  })
})`,
          },
          {
            type: 'text',
            id: 'j-l61-b3',
            body: 'A **callback** is a function you hand to another function so it can call you later. It works, and for one wait it is the clearest code you can write. The problem is arithmetic: each thing that depends on the previous one adds another layer of nesting, so the code you care about ends up pushed to the right, the closing braces all pile up at the bottom, and there is nowhere left to put an `if`. This is the "callback pyramid", and by the fourth level nobody can say what runs when.',
          },
          {
            type: 'heading',
            id: 'j-l61-h2',
            level: 3,
            body: 'A promise is a value for a future result',
          },
          {
            type: 'code',
            id: 'j-l61-c2',
            language: 'javascript',
            title: 'then, catch and finally',
            code: `const ready = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('the data')   // or reject(new Error('offline'))
  }, 1000)
})

ready
  .then(function (data) {
    console.log('got', data)   // runs on success
    return data.length        // the next then receives this
  })
  .then(function (length) {
    console.log('length', length)
  })
  .catch(function (error) {     // runs on failure, anywhere above it
    console.error(error.message)
  })
  .finally(function () {        // always runs, either way
    console.log('done')
  })`,
          },
          {
            type: 'text',
            id: 'j-l61-b4',
            body: 'A promise starts **pending** and settles exactly once, either **fulfilled** with a value or **rejected** with a reason — usually an `Error`. Because it settles once, `then` never has to worry about a result changing later. The real win is that the promise is a *value*: you can store it in a variable, hand it to another function, and return it, so the "give me this when it is ready" part no longer has to be expressed as nesting. `catch` catches a rejection from anywhere in the chain above it, and `finally` is for cleanup that must happen whether the work succeeded or not — hiding a spinner, releasing a connection.',
          },
          {
            type: 'heading',
            id: 'j-l61-h3',
            level: 3,
            body: 'async and await: promises without the nesting',
          },
          {
            type: 'code',
            id: 'j-l61-c3',
            language: 'javascript',
            title: 'The same three tasks, three ways',
            code: `// callback — works but nests badly
setTimeout(function () {
  console.log('two seconds passed')
}, 2000)

// promise
fetch('/api/data')
  .then(function (response) { return response.json() })
  .then(function (data) { console.log(data) })
  .catch(function (error) { console.error(error) })

// async/await — the chain, read top to bottom
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
            id: 'j-l61-b5',
            body: '`async` in front of `function` means two things at once. Inside, `await` pauses *that function* until the promise settles and hands you the value, so the following lines can treat the result as an ordinary variable. Outside, every `async` function returns a promise whatever you do: `return 42` produces a promise fulfilled with 42, and `throw` produces a rejected one. That is why `await` can appear where a value is expected, and why a `try/catch` around an `await` catches the rejection — the same failure as `.catch`, written in the style of the surrounding code. `await` never freezes the page; it only stops this one function, and anything else queued still runs.',
          },
          {
            type: 'warning',
            id: 'j-l61-w1',
            title: 'await must be inside an async function',
            body: 'Writing `await` at the top level of a script or a module is a syntax error, not a runtime one — the parser rejects it before anything runs. Two options: wrap the code in an `async` function, or, in a browser module where top-level `await` *is* allowed, still keep the real logic inside a function so it can be called again and tested. The related mistake is forgetting the `await` altogether: `const data = fetch(url).then(r => r.json())` gives you a **promise of data**, not data, so `data.length` is `undefined` and no error tells you why.',
          },
          {
            type: 'heading',
            id: 'j-l61-h4',
            level: 3,
            body: 'Waiting for several things at once',
          },
          {
            type: 'code',
            id: 'j-l61-c4',
            language: 'javascript',
            title: 'Promise.all versus Promise.allSettled',
            code: `const urls = ['/api/user', '/api/posts', '/api/comments']
const load = (url) => fetch(url).then((r) => r.json())

// all: one failure rejects everything — use when every result is required
const all = await Promise.all(urls.map(load))
// all[0] is the user, all[1] the posts...

// allSettled: every promise is awaited, failures are reported, not thrown
for (const result of await Promise.allSettled(urls.map(load))) {
  if (result.status === 'fulfilled') {
    console.log('ok', result.value)
  } else {
    console.warn('failed', result.reason.message)
  }
}`,
          },
          {
            type: 'text',
            id: 'j-l61-b6',
            body: 'Both start every request immediately, so three slow calls take as long as the slowest one, not the sum. The difference is what happens when one of them fails. `Promise.all` rejects as soon as the first rejection arrives, and you lose the successful results even if they land a second later — the right behaviour when a half-loaded page is useless. `Promise.allSettled` always waits for the lot and hands back one record per request with a `status` of `fulfilled` or `rejected`, which is what you want for a dashboard of several independent widgets, or when you are reporting failures rather than hiding them.',
          },
          {
            type: 'list',
            id: 'j-l61-l1',
            style: 'bullet',
            items: [
              'A **callback** is a function passed in to be called later. Fine once, unreadable nested.',
              'A **promise** is a value standing in for a future result, with `then`, `catch` and `finally`.',
              '**`async`/`await`** is the same machinery written in order, and needs an `async` function to live in.',
              '**`Promise.all`** needs every result and fails fast; **`Promise.allSettled`** wants every outcome and never fails.'
            ]
          },
          {
            type: 'example',
            id: 'j-l61-e1',
            title: 'A loading state that actually updates',
            body: 'Click the button. The handler starts an async function, shows a spinner immediately, and only replaces it once the awaited promise settles — which is the whole point of putting the wait inside the function.',
            html: `<button id="load">Load user</button>
<p id="status">Ready</p>`,
            javascript: `const status = document.getElementById('status')

// stands in for fetch(): same two-stage shape, resolved after a moment
function fakeRequest() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ ok: true, json: function () { return Promise.resolve({ name: 'Ada' }) } })
    }, 800)
  })
}

async function loadUser() {
  status.textContent = 'Loading…'
  try {
    const response = await fakeRequest()
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const user = await response.json()
    status.textContent = 'Hello, ' + user.name
  } catch (error) {
    status.textContent = 'Failed to load user'
  }
}

document.getElementById('load').addEventListener('click', loadUser)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l61-x1',
            exercise: {
              id: 'ex-js-async',
              instructions:
                'Write an async function `fetchUser()` that awaits `fetch("/api/user")`, checks `response.ok` and raises an error if the request failed, awaits `response.json()` and returns the `name` property of the parsed object. The call and log below are already written — leave them in place.',
              languages: ['javascript'],
              starterCode: {
                javascript: `async function fetchUser() {
  // your code here
}

// Already written for you — this is why the result needs a .then()
fetchUser()
  .then(function (name) {
    console.log(name)
  })
  .catch(function (error) {
    console.error(error.message)
  })
`,
              },
              tests: [
                {
                  id: 'ex-js-async-t1',
                  label: 'fetchUser is an async function',
                  body: `if (typeof fetchUser !== 'function') return 'Define a function called fetchUser.'
return fetchUser.constructor.name === 'AsyncFunction'
  ? true
  : 'Add the async keyword: async function fetchUser() { ... }';`,
                },
                {
                  id: 'ex-js-async-t2',
                  label: 'It awaits the request and the parsed body',
                  body: `if (typeof fetchUser !== 'function') return 'Define a function called fetchUser.'
var src = fetchUser.toString()
return src.indexOf('await') > -1 && src.indexOf('fetch') > -1 && src.indexOf('json') > -1
  ? true
  : 'You need both awaits: one on fetch("/api/user"), one on response.json().';`,
                },
                {
                  id: 'ex-js-async-t3',
                  label: 'It returns the name property',
                  body: `if (typeof fetchUser !== 'function') return 'Define a function called fetchUser.'
var src = fetchUser.toString()
return src.indexOf('name') > -1
  ? true
  : 'Return user.name from the parsed JSON object.';`,
                },
                {
                  id: 'ex-js-async-t4',
                  label: 'It deals with a failed request',
                  body: `if (typeof fetchUser !== 'function') return 'Define a function called fetchUser.'
var src = fetchUser.toString()
return src.indexOf('ok') > -1 || src.indexOf('catch') > -1
  ? true
  : 'Check response.ok and raise an error, or wrap the awaits in a try/catch — fetch does not reject on a 404.';`,
                },
              ],
              hints: [
                'An async function can raise an error like any other function — the promise it returns rejects instead.',
                '`const response = await fetch("/api/user")` gives you the response, not the data; the data needs `await response.json()`.',
                'So: fetch, check `response.ok`, parse the JSON, then `return user.name`.',
              ],
              solution: {
                javascript: `async function fetchUser() {
  const response = await fetch('/api/user')
  if (!response.ok) {
    throw new Error('Could not load the user: HTTP ' + response.status)
  }
  const user = await response.json()
  return user.name
}

fetchUser()
  .then(function (name) {
    console.log(name)
  })
  .catch(function (error) {
    console.error(error.message)
  })`,
              },
              testNotes:
                'These checks read the source of your function, because there is no server here to call. They cannot tell a working request from a wrong URL — check it for real in the browser console against an API that serves /api/user.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s51',
    title: 'Promises',
    description:
      'Promises as first-class values: the executor, the three states, chaining without nesting, and the combinators that wait on many at once.',
    lessons: [
      {
        id: 'js-l62',
        title: 'Promises',
        description:
          'Build a promise from scratch, attach then/catch/finally, chain without nesting, and combine several promises into one result.',
        duration: 7,
        objectives: [
          'Create a promise with new Promise and explain what resolve and reject do',
          'Name the three states and say why only one settle counts',
          'Chain promises and return a value from each then so the next link receives it',
          'Choose between Promise.all, allSettled, race and any',
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l62',
          title: 'Promises quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l62-q1',
              type: 'multiple-choice',
              prompt: 'What does the executor function passed to `new Promise` do?',
              options: [
                'It runs when the promise is awaited',
                'It runs immediately when the promise is created, and settles it once',
                'It runs on every `then` in the chain',
                'It returns the value the promise will eventually hold',
              ],
              answer: 1,
              explanation: 'The executor is synchronous: it runs during construction, and its job is to call `resolve` or `reject` later. That is why a promise can already be fulfilled before you attach anything, and why attaching a handler after the fact still receives the value.',
            },
            {
              id: 'quiz-js-l62-q2',
              type: 'true-false',
              prompt: 'A promise that has been rejected can later be changed to fulfilled by calling `resolve`.',
              answer: false,
              explanation: 'Settlement happens once. The second call is ignored, and there is no API to reset a promise. Code that reassigns the variable holding a promise instead creates a second, unrelated promise — everyone still holding the old one keeps waiting for a value that will never arrive.',
            },
            {
              id: 'quiz-js-l62-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'Promise.resolve(2)\n  .then(function (n) { return n * 3 })\n  .then(function (n) { console.log(n) })',
              options: [
                '2',
                '3',
                '6',
                'undefined',
              ],
              answer: 2,
              explanation: 'Each `then` returns a new promise fulfilled with what its callback returned, so the second link receives 6. Forget the `return n * 3` and the next link gets `undefined` — that is the most common way a promise chain goes quietly wrong.',
            },
            {
              id: 'quiz-js-l62-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this chain?',
              code: 'fetch(\'/api/posts\')\n  .then(function (r) { r.json() })\n  .then(function (data) {\n    console.log(data.items.length)\n  })\n  .catch(showError)',
              options: [
                'The first then is missing a return, so the second link receives undefined',
                'catch must be attached before then in a chain',
                'forEach and map are not allowed inside a promise callback',
                'response.json() must be awaited rather than returned',
              ],
              answer: 0,
              explanation: 'A `then` callback that does not return hands the next link `undefined`, not the parsed body — so the error appears as "cannot read length of undefined" one line away from the mistake. Returning the promise from `r.json()` (or awaiting it inside an async callback) is what passes the data along.',
            },
            {
              id: 'quiz-js-l62-q5',
              type: 'blank',
              prompt: 'Which combinator waits for every promise and hands back one `{ status, value }` record each, never rejecting?',
              answers: [
                'promise.allsettled',
                'promise.all settled',
                'allsettled',
              ],
              explanation: '`Promise.allSettled` reports outcomes instead of collapsing them into a single success or failure, which makes it right for several independent widgets where one failure should not blank the page. `Promise.all` needs every result and rejects on the first failure.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l62-b1',
            body: 'A **promise** is a value that stands in for a result you do not have yet. You saw the shape of one in the previous lesson; this lesson is about treating it as a real value rather than a chain of callbacks. The change is small but it is the one that matters: once the result is an object you can store in a variable, return from a function, and pass to another function, the waiting stops having to be written as nesting. Everything else — states, chaining, combinators — follows from that.',
          },
          {
            type: 'demo',
            id: 'j-l62-d1',
            title: 'One promise, three observers',
            body: 'The same promise is stored, returned and logged. Note the settled time in the output: every `then` runs on the same tick as the `resolve`, not at the moment it was attached, which is why attaching a handler late still gets the value.',
            html: `<button id="go">Run it</button>
<pre id="out">ready</pre>`,
            css: `button { font: inherit; padding: 0.4rem 0.9rem; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; font-size: 13px; }`,
            javascript: `const out = document.getElementById('go').nextElementSibling
const started = Date.now()
const since = () => (Date.now() - started) + 'ms'

document.getElementById('go').addEventListener('click', function () {
  const ready = new Promise(function (resolve) {
    setTimeout(function () { resolve('the data') }, 400)
  })

  // stored in a variable, and given to two separate chains
  const first = ready.then(function (value) {
    return value + ' (first)'
  })
  ready.then(function (value) {
    out.textContent = since() + '  second handler: ' + value
  })

  first.then(function (value) {
    out.textContent += '\\n' + since() + '  first handler: ' + value
  })
})`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'j-l62-h1',
            level: 3,
            body: 'Creating one: the executor',
          },
          {
            type: 'code',
            id: 'j-l62-c1',
            language: 'javascript',
            title: 'new Promise, resolve, reject',
            code: `function delay(ms, value) {
  // the executor runs immediately and synchronously
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(value)        // fulfil it with a value
      // reject(new Error('too slow'))   // or fail it with a reason
    }, ms)
  })
}`,
          },
          {
            type: 'text',
            id: 'j-l62-b2',
            body: 'The function you hand to `new Promise` is the **executor**, and it runs the moment the promise is created, not when it is awaited. Inside it you get two functions: `resolve` fulfils the promise with a value, `reject` fails it. Whichever runs first wins, and everything after is ignored — so calling `resolve` inside a `try` block whose `catch` then calls `reject` settles it fulfilled, not rejected. Promise functions are also the only functions in the language with no return value at all; "settling" is not something you return.',
          },
          {
            type: 'heading',
            id: 'j-l62-h2',
            level: 3,
            body: 'Three states, one transition',
          },
          {
            type: 'list',
            id: 'j-l62-l1',
            style: 'bullet',
            items: [
              '**pending** — created, not settled yet. Every new promise starts here.',
              '**fulfilled** — `resolve` was called; handlers get the value.',
              '**rejected** — `reject` was called, or a handler raised an error; handlers get the reason.',
              'Once it leaves pending it never goes back. There is no way to un-resolve a promise.'
            ]
          },
          {
            type: 'warning',
            id: 'j-l62-w1',
            title: 'A promise cannot be cancelled or reset',
            body: 'Nothing you can do later turns a fulfilled promise back into a pending one, and there is no way to "cancel" a promise that has already resolved — only the work behind it can be cancelled, usually with an AbortController signal. Code that tries, `promise = new Promise(...)` after an await, produces a second promise and abandons the first; whoever is holding the old reference is still waiting on a value that will never reach them.',
          },
          {
            type: 'heading',
            id: 'j-l62-h3',
            level: 3,
            body: 'then, catch and finally',
          },
          {
            type: 'code',
            id: 'j-l62-c2',
            language: 'javascript',
            title: 'What each handler is given',
            code: `ready
  .then(function (value) {
    // on fulfil: receives the value
    return value.length       // returning a value makes a NEW promise
  })
  .then(function (length) {    // the next link gets what you returned
    return length * 2
  })
  .catch(function (error) {    // on reject, from anywhere above
    return 0                  // recovering here keeps the chain alive
  })
  .finally(function () {       // always runs, value or error, passes both on
    console.log('cleaned up')
  })`,
          },
          {
            type: 'heading',
            id: 'j-l62-h4',
            level: 3,
            body: 'Chaining is the point',
          },
          {
            type: 'code',
            id: 'j-l62-c3',
            language: 'javascript',
            title: 'Flat, because each then returns a promise',
            code: `// nested callbacks — the pyramid
getUser(function (user) {
  getPosts(user.id, function (posts) {
    getComments(posts[0].id, function (comments) {
      render(comments)
    })
  })
})

// a flat chain, with the same sequence and the same order
getUser()
  .then(function (user) { return getPosts(user.id) })
  .then(function (posts) { return getComments(posts[0].id) })
  .then(function (comments) { return render(comments) })
  .catch(showError)`,
          },
          {
            type: 'text',
            id: 'j-l62-b3',
            body: '`then` does not run your callback immediately and does not return what your callback returned — it returns a **new** promise, and that new promise is what the next `then` waits on. So the chain stays flat, and each link can see the result of the previous one as an ordinary value. This is also how an error travels: a callback that raises one rejects the promise `then` returned, so a single `catch` at the bottom sees failures from every step above it.',
          },
          {
            type: 'warning',
            id: 'j-l62-w2',
            title: 'Forgetting to return inside then',
            body: 'A `then` callback that computes something but never returns it hands `undefined` to the next link, and the chain quietly continues with nothing. `promise.then(r => r.json()).then(data => data.items.length)` fails with "cannot read length of undefined" three lines away from the mistake. The rule is simple: every `then` that transforms must `return` the transformed value.',
          },
          {
            type: 'heading',
            id: 'j-l62-h5',
            level: 3,
            body: 'Combining promises',
          },
          {
            type: 'code',
            id: 'j-l62-c4',
            language: 'javascript',
            title: 'all, allSettled, race, any',
            code: `const a = delay(300, 'a')
const b = delay(100, 'b')

// all: waits for every one, array in order; rejects on the first failure
Promise.all([a, b]).then(function (values) {
  console.log(values)   // ['a', 'b'] — input order, not finishing order
})

// allSettled: waits for every one and never rejects
Promise.allSettled([a, b]).then(function (results) {
  console.log(results[0].status)   // 'fulfilled' or 'rejected'
})

// race: settles with the first one to settle
Promise.race([a, b]).then(function (value) {
  console.log(value)   // 'b'
})

// any: settles with the first to succeed, or rejects if they all fail
Promise.any([a, b]).then(function (value) {
  console.log(value)   // 'b'
})`,
          },
          {
            type: 'text',
            id: 'j-l62-b4',
            body: 'All four start every promise immediately, so N slow operations cost the slowest one rather than the sum. `Promise.all` is for when every result is required and a partial result is useless; `Promise.allSettled` is for when you want to report rather than hide, and it hands back one record per promise with `status` and either `value` or `reason`. `Promise.race` is the timeout and mirror pattern — pair it with a promise that rejects after a delay to bound how long you wait. `Promise.any` inverts `all`: it takes the first success, which suits redundant requests where any working mirror will do.',
          },
          {
            type: 'tip',
            id: 'j-l62-t1',
            title: 'Make delay a promise and you can await time',
            body: 'Wrapping `setTimeout` in a promise gives you `await delay(200)`, which is how you space sequential steps without sprinkling timers around. It also makes `delay(200).then(go)` and `Promise.all([delay(200), delay(400)])` work, because the delay is now a value like any other. Use it for sequencing and simulated latency in your own code, not as a substitute for a real request.',
          },
          {
            type: 'list',
            id: 'j-l62-l2',
            style: 'ordered',
            items: [
              'Create with `new Promise(executor)`; the executor runs straight away and settles it once.',
              'Attach `then` for success, `catch` for failure, `finally` for cleanup that runs either way.',
              'Each `then` returns a new promise, so `return` inside it is what feeds the next link.',
              'Combine with `all`, `allSettled`, `race` or `any` rather than nesting the work yourself.'
            ]
          },
          {
            type: 'exercise',
            id: 'j-l62-x1',
            exercise: {
              id: 'ex-js-promise-all',
              instructions:
                'Write `delay(ms)` that returns a promise which fulfils with the string "done" after roughly that many milliseconds, using `new Promise` and `setTimeout`. Then write `waitAll(list)` that returns a promise for an array of every result, started at the same time, using `Promise.all` and `Array.map`. Both must return a promise rather than a plain value, and `waitAll` must accept an empty array.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function delay(ms) {
  // return a promise that fulfils with 'done'
}

function waitAll(list) {
  // return a promise for an array of all the results
}

// already written for you
waitAll([delay(20), delay(20)]).then(function (results) {
  console.log(results.join(', '))
})
`,
              },
              tests: [
                {
                  id: 'ex-js-promise-all-t1',
                  label: 'delay is a function that returns a promise',
                  body: `if (typeof delay !== 'function') return 'Define a function called delay.'
var p = delay(5)
return p instanceof Promise
  ? true
  : 'delay must return a promise: return new Promise(function (resolve) { setTimeout(function () { resolve("done") }, ms) }).';`,
                },
                {
                  id: 'ex-js-promise-all-t2',
                  label: 'delay fulfils with the string done',
                  body: `if (typeof delay !== 'function') return 'Define a function called delay.'
var src = delay.toString()
return src.indexOf('resolve') > -1 && src.indexOf('done') > -1
  ? true
  : 'Settle it with resolve("done") once the timeout fires.';`,
                },
                {
                  id: 'ex-js-promise-all-t3',
                  label: 'waitAll returns a promise, even for an empty list',
                  body: `if (typeof waitAll !== 'function') return 'Define a function called waitAll.'
var p = waitAll([])
return p instanceof Promise
  ? true
  : 'waitAll must return a promise: return Promise.all(list.map(...)).';`,
                },
                {
                  id: 'ex-js-promise-all-t4',
                  label: 'waitAll starts every promise with map and combines them',
                  body: `if (typeof waitAll !== 'function') return 'Define a function called waitAll.'
var src = waitAll.toString()
return src.indexOf('Promise.all') > -1 && src.indexOf('map') > -1
  ? true
  : 'Use Promise.all(list.map(function (item) { return delay(item) })) so they all start together.';`,
                },
              ],
              hints: [
                'delay needs `return new Promise(function (resolve) { setTimeout(function () { resolve("done") }, ms) })`.',
                'Starting them one at a time defeats the point — `list.map(delay)` builds the promises, then `Promise.all` waits.',
                '`return Promise.all(list.map(function (ms) { return delay(ms) }))` handles the empty list without a special case.',
              ],
              solution: {
                javascript: `function delay(ms) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve('done') }, ms)
  })
}

function waitAll(list) {
  return Promise.all(
    list.map(function (ms) {
      return delay(ms)
    })
  )
}

waitAll([delay(20), delay(20)]).then(function (results) {
  console.log(results.join(', '))
})`,
              },
              testNotes:
                'Two tests check the return value is a real Promise, which works without waiting. The other two read your source, because the sandbox checks finish before a timer would fire — they cannot confirm the delay is actually ms long.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s52',
    title: 'Async and await',
    description:
      'The same promises written in order: what async changes about a return value, what await actually pauses, and the parallel and sequential mistakes to watch for.',
    lessons: [
      {
        id: 'js-l63',
        title: 'Async and await',
        description:
          'Turn a then chain into straight-line code, know exactly what await suspends, and avoid the two mistakes — serial awaits and swallowed errors — that async code invites.',
        duration: 7,
        objectives: [
          'Explain the two things the async keyword changes',
          'Say precisely what await pauses, and what it does not',
          'Run independent awaits in parallel instead of one after another',
          'Handle failures with try/catch and keep cleanup in finally',
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l63',
          title: 'Async and await quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l63-q1',
              type: 'multiple-choice',
              prompt: 'What does `await` suspend?',
              options: [
                'The whole script, until the promise settles',
                'Only the async function that contains it',
                'Every function in the current file',
                'Nothing — it blocks the thread until the value is ready',
              ],
              answer: 1,
              explanation: 'Only the enclosing function stops; control returns to the event loop, which is why clicks and timers keep firing. The code after the `await` resumes when the promise settles, and everything queued outside runs in the meantime — which is exactly why the line after an un-awaited call usually beats the data it wanted.',
            },
            {
              id: 'quiz-js-l63-q2',
              type: 'true-false',
              prompt: 'An async function that does nothing but `return 42` gives you the number 42 to the caller.',
              answer: false,
              explanation: 'It gives you a promise fulfilled with 42. `async` wraps the return value unconditionally, so every caller must `await` it or attach a `.then`. Reading `.name` straight off the call result gives `undefined`, with no error to point at the mistake.',
            },
            {
              id: 'quiz-js-l63-q3',
              type: 'identify-error',
              prompt: 'What is wrong with this snippet?',
              code: 'async function loadAll(ids) {\n  const users = []\n  for (const id of ids) {\n    users.push(await getUser(id))\n  }\n  return users\n}',
              options: [
                'users should be declared with let before the loop',
                'Awaiting inside the loop runs every request one after another instead of together',
                'A for...of loop cannot be used in an async function',
                'push returns a value, so await is applied to the wrong thing',
              ],
              answer: 1,
              explanation: 'Each await completes before the next iteration starts, so ten ids cost ten round trips. Start them all with `ids.map(getUser)` and then `await Promise.all(...)`. Go serial only when each step depends on the previous result, such as paging through an unknown number of pages.',
            },
            {
              id: 'quiz-js-l63-q4',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'async function work() {\n  console.log(\'1\')\n  await Promise.resolve()\n  console.log(\'3\')\n}\nwork()\nconsole.log(\'2\')',
              options: [
                '1, 2, 3',
                '1, 3, 2',
                '1, 2, then never 3',
                '2, 1, 3',
              ],
              answer: 0,
              explanation: '`work()` runs synchronously up to the first `await`, so `1` prints, then the function returns to the caller and `2` prints. The promise was already resolved, so the microtask queue runs next and `3` follows. Even a zero-cost await defers the rest of the function.',
            },
            {
              id: 'quiz-js-l63-q5',
              type: 'blank',
              prompt: 'Which block runs whether the `try` succeeded or failed, and is the right place to re-enable a disabled button?',
              answers: [
                'finally',
                'finally block',
                'finally()',
              ],
              explanation: '`finally` runs on both paths and does not swallow the value or the error, so cleanup belongs there. `catch` alone would leave the button disabled whenever the request failed — which is the case where the user most needs to try again.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l63-b1',
            body: 'The previous lesson ended with promises as values you can return and pass around. This is the other half of the same idea: `await` lets you *use* a promise like the plain value it stands for, so the code reads in the order the work happens instead of in the order the chain is built. Nothing about the underlying machinery changes — an async function is a promise factory, and `await` is a `.then` in disguise. What changes is that you no longer need a callback per step.',
          },
          {
            type: 'demo',
            id: 'j-l63-d1',
            title: 'Sequential against parallel',
            body: 'Both buttons run the same two simulated requests. The first awaits them one after another, so 400ms of work costs 800ms. The second starts both first and waits for them together, so it finishes in 400ms. Watch the clock.',
            html: `<button id="serial">Run them one at a time</button>
<button id="parallel">Run them together</button>
<p id="out">ready</p>`,
            css: `button { font: inherit; padding: 0.4rem 0.9rem; margin-right: 0.4rem; }`,
            javascript: `const out = document.getElementById('serial').nextElementSibling

function request(ms, value) {
  return new Promise(function (resolve) {
    setTimeout(function () { resolve(value) }, ms)
  })
}

async function serial() {
  const a = await request(400, 'first')
  const b = await request(400, 'second')
  out.textContent = a + ' then ' + b + ' — about 800ms'
}

async function parallel() {
  const both = await Promise.all([request(400, 'first'), request(400, 'second')])
  out.textContent = both.join(' and ') + ' — about 400ms'
}

document.getElementById('serial').addEventListener('click', serial)
document.getElementById('parallel').addEventListener('click', parallel)`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'j-l63-h1',
            level: 3,
            body: 'What the async keyword changes',
          },
          {
            type: 'code',
            id: 'j-l63-c1',
            language: 'javascript',
            title: 'Two guarantees, both automatic',
            code: `async function loadUser(id) {
  // 1. you may use await inside
  const response = await fetch('/api/users/' + id)
  return response.json()
}

// 2. the result is a promise, whatever you return
loadUser(1).then(function (user) {
  console.log(user.name)   // no try/catch needed by the caller
})

async function fails() {
  return 42           // fulfils with 42
}
async function alsoFails() {
  throw new Error('x')  // rejects
}`,
          },
          {
            type: 'text',
            id: 'j-l63-b2',
            body: 'The keyword does exactly two things. Inside the function body, `await` becomes legal. Outside it, the return value is wrapped: an async function **always** hands back a promise, even one that returns a plain value or no value at all. That second guarantee is the one people miss — an async function cannot be used synchronously, so a caller who forgets to `await` the call gets a promise and every property read on it is `undefined`, with no error to explain why.',
          },
          {
            type: 'heading',
            id: 'j-l63-h2',
            level: 3,
            body: 'What await actually pauses',
          },
          {
            type: 'code',
            id: 'j-l63-c2',
            language: 'javascript',
            title: 'One function stops; the page does not',
            code: `async function work() {
  console.log('1')
  await slowThing()          // this function stops here
  console.log('3')           // runs when slowThing settles
}

work()
console.log('2')   // runs immediately — work() returned at the await`,
          },
          {
            type: 'text',
            id: 'j-l63-b3',
            body: '`await` suspends **only the function that contains it**. Everything queued outside keeps running, which is why the page stays responsive and why `work()` returns to the caller before `3` is printed. There is no way to await half a function: to wait inside a synchronous function you must make that function async too, and to wait at the top level of a plain script there is nothing you can do — wrap it in an async function and call it.',
          },
          {
            type: 'warning',
            id: 'j-l63-w1',
            title: 'A rejected promise is a thrown error at the await',
            body: 'An un-awaited async function that fails produces an **unhandled rejection**, which logs a warning in the console and stops nothing — your code carries on as if the call worked. The fix is always at the call site: `await` the call, or attach a `.catch`. Inside the function, a rejection from an awaited promise arrives as a thrown error, so an ordinary `try/catch` catches it and you never write `.catch` at all. Silence here is the danger: a failed save that nobody awaits looks exactly like a successful one until the user reloads.',
          },
          {
            type: 'heading',
            id: 'j-l63-h3',
            level: 3,
            body: 'try, catch and finally',
          },
          {
            type: 'code',
            id: 'j-l63-c3',
            language: 'javascript',
            title: 'The shape you will write most often',
            code: `async function save(form) {
  const button = document.querySelector('#save')
  button.disabled = true
  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    if (!response.ok) {
      throw new Error('HTTP ' + response.status)   // your own error, caught below
    }
    return await response.json()
  } catch (error) {
    showMessage(error.message)     // rejection or your throw, same place
    return null
  } finally {
    button.disabled = false        // runs whichever way the try ended
  }
}`,
          },
          {
            type: 'tip',
            id: 'j-l63-t1',
            title: 'Errors you raise yourself are catchable too',
            body: 'The `throw new Error("HTTP " + response.status)` line looks like it defeats the `catch`, because `catch` is usually taught as "catch errors from elsewhere". It does not: a `throw` inside a `try` is caught by that same `catch`, and that is the point. It is how you turn a 500 that never rejects into one failure path with one message, instead of three separate checks.',
          },
          {
            type: 'heading',
            id: 'j-l63-h4',
            level: 3,
            body: 'The two mistakes async code invites',
          },
          {
            type: 'code',
            id: 'j-l63-c4',
            language: 'javascript',
            title: 'Serial when you meant parallel',
            code: `// WRONG: 400 + 400 + 400 = 1200ms
const user = await fetch('/api/user').then(r => r.json())
const posts = await fetch('/api/posts').then(r => r.json())
const comments = await fetch('/api/comments').then(r => r.json())

// RIGHT: all three start together, 400ms total
const [user, posts, comments] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
])`,
          },
          {
            type: 'code',
            id: 'j-l63-c5',
            language: 'javascript',
            title: 'Parallel when you meant serial',
            code: `// WRONG: both start at once, so the second uses stale data
const user = await createUser(form)
const team = await addToTeam(user.id, form.teamId)

// RIGHT: the second await waits for the first to finish
const user = await createUser(form)
const team = await addToTeam(user.id, form.teamId)`,
          },
          {
            type: 'text',
            id: 'j-l63-b4',
            body: 'Because `await` reads as "do this, then this", the natural mistake is to line them up and add the delays together — three requests that could overlap now take twice as long. The opposite mistake is just as easy: `Promise.all` on two steps where the second needs the first\'s result, which fires both at once and hands the second stale or missing data. The test is a question about dependency: if the second line needs a value the first line produces, it must await; if not, start them together.',
          },
          {
            type: 'list',
            id: 'j-l63-l1',
            style: 'ordered',
            items: [
              '`async` makes `await` legal inside the function and guarantees a promise comes back.',
              '`await` suspends the one function containing it — nothing outside it stops.',
              'An awaited rejection arrives as a thrown error, so `try/catch` replaces `.catch`.',
              'Start independent work together with `Promise.all`; keep dependent steps in sequence.',
              'Return a promise rather than resolving it by hand when you mean to hand work on.'
            ]
          },
          {
            type: 'warning',
            id: 'j-l63-w2',
            title: 'A loop of awaits is a serial loop',
            body: '`for (const id of ids) { results.push(await load(id)) }` runs one request at a time, however many ids there are, because each await completes before the next line starts. Start them all first — `const pending = ids.map(load)` — then `await Promise.all(pending)`. Reach for a serial loop only when the work genuinely depends on the previous result, such as paging: you cannot ask for page four before page three tells you there is one.',
          },
          {
            type: 'exercise',
            id: 'j-l63-x1',
            exercise: {
              id: 'ex-js-async-load',
              instructions:
                'Write an async function `loadProfile()` that awaits a `getUser` helper, awaits `getPosts`, and returns an object with `name` and `posts` in it. Both helpers must be awaited, and the returned object must use the properties `name` and `posts`. The call at the bottom is already written — leave it in place.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function getUser() {
  return Promise.resolve({ name: 'Ada' })
}

function getPosts() {
  return Promise.resolve(['first', 'second'])
}

async function loadProfile() {
  // your code here
}

// Already written for you
loadProfile().then(function (profile) {
  console.log(profile.name + ': ' + profile.posts.length + ' posts')
})
`,
              },
              tests: [
                {
                  id: 'ex-js-async-load-t1',
                  label: 'loadProfile is an async function',
                  body: `if (typeof loadProfile !== 'function') return 'Define a function called loadProfile.'
return loadProfile.constructor.name === 'AsyncFunction'
  ? true
  : 'Add the async keyword: async function loadProfile() { ... }';`,
                },
                {
                  id: 'ex-js-async-load-t2',
                  label: 'It awaits both helpers',
                  body: `if (typeof loadProfile !== 'function') return 'Define a function called loadProfile.'
var src = loadProfile.toString()
var waits = src.split('await').length - 1
return waits >= 2 && src.indexOf('getUser') > -1 && src.indexOf('getPosts') > -1
  ? true
  : 'Await each helper separately: const user = await getUser(), then const posts = await getPosts().';`,
                },
                {
                  id: 'ex-js-async-load-t3',
                  label: 'It returns an object with name and posts',
                  body: `if (typeof loadProfile !== 'function') return 'Define a function called loadProfile.'
var src = loadProfile.toString()
return src.indexOf('name') > -1 && src.indexOf('posts') > -1 && src.indexOf('return') > -1
  ? true
  : 'Return { name: user.name, posts: posts } so the caller gets both values.';`,
                },
                {
                  id: 'ex-js-async-load-t4',
                  label: 'The function was called and logged something',
                  body: `var log = window.__log || []
if (log.length === 0) return 'Nothing reached the console. Check that the loadProfile().then(...) call below the function is still there.'
return log.join(' ').indexOf('Ada') > -1
  ? true
  : 'The log should read "Ada: 2 posts" — check that the object keys are name and posts.';`,
                },
              ],
              hints: [
                '`const user = await getUser()` gives you the object itself, so `user.name` is available on the next line.',
                'Two awaits, two lines — one for the user, one for the posts. Do not wrap them in Promise.all: the posts call does not need the user.',
                '`return { name: user.name, posts: posts }` is the last line of the function.',
              ],
              solution: {
                javascript: `function getUser() {
  return Promise.resolve({ name: 'Ada' })
}

function getPosts() {
  return Promise.resolve(['first', 'second'])
}

async function loadProfile() {
  const user = await getUser()
  const posts = await getPosts()
  return { name: user.name, posts: posts }
}

loadProfile().then(function (profile) {
  console.log(profile.name + ': ' + profile.posts.length + ' posts')
})`,
              },
              testNotes:
                'Two tests read your source, because the values only exist once a promise has settled. The last test runs against the real console: the starter code resolves immediately, so if your function is correct you will see "Ada: 2 posts" in the output.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s53',
    title: 'DOM intro',
    description:
      'The document object model as a live tree of objects, the methods every page needs — find, create, read, write, remove — and how a script decides when to run.',
    lessons: [
      {
        id: 'js-l64',
        title: 'The DOM and its methods',
        description:
          'What the DOM actually is, the methods that read and write it, when a script runs relative to the markup, and how to pick the right way to change the page.',
        duration: 7,
        objectives: [
          'Describe the DOM as a live tree of objects and say what that buys you',
          'Use document.write, querySelector, createElement, appendChild and remove',
          'Place a script so it runs after the markup it needs exists',
          'Choose between textContent, innerHTML and attributes safely',
        ],
        xp: 60,
        quiz: {
          id: 'quiz-js-l64',
          title: 'The DOM and its methods quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l64-q1',
              type: 'multiple-choice',
              prompt: 'What is the DOM?',
              options: [
                'The HTML source of the page, as a string',
                'The browser\'s live tree of objects, one per node, which JavaScript reads and writes',
                'The CSS applied to the page, compiled to objects',
                'A built-in library you have to import',
              ],
              answer: 1,
              explanation: 'The DOM is a live model, not the source text. Writing to it changes what is on screen without touching your file, and an element created in JavaScript lands in exactly the same tree as one written in markup.',
            },
            {
              id: 'quiz-js-l64-q2',
              type: 'true-false',
              prompt: '`document.write("hello")` is the safest way to put text on a page.',
              answer: false,
              explanation: '`document.write` injects raw HTML into the parser stream and, when called after load, replaces everything already on the page. Build an element and set `textContent` instead — same amount of code, no destruction and no injection risk.',
            },
            {
              id: 'quiz-js-l64-q3',
              type: 'code-output',
              prompt: 'What does this produce in the page?',
              code: 'const list = document.querySelector(\'#tasks\')\nconst item = document.createElement(\'li\')\nitem.textContent = \'Buy milk\'\nlist.appendChild(item)',
              options: [
                'A li reading "Buy milk" inside #tasks',
                'Nothing — createElement only makes an element in memory',
                'A list of three items, because appendChild runs once per property set',
                'An error, because appendChild only works on elements you created in the same statement',
              ],
              answer: 0,
              explanation: 'That is the whole pattern: create, fill, attach. `createElement` alone would indeed put nothing on the page — it is `appendChild` that inserts the node and triggers the repaint, and it can be called from a different statement, or a different function, entirely.',
            },
            {
              id: 'quiz-js-l64-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this script?',
              code: '<head>\n  <script>\n    const out = document.getElementById(\'status\')\n    out.textContent = \'ready\'\n  </script>\n</head>\n<body>\n  <p id="status">loading</p>\n</body>',
              options: [
                'getElementById cannot be used in a script',
                'The script runs before the parser reaches the p element, so out is null',
                'textContent cannot be set from a script in the head',
                'The id must be written as #status in getElementById',
              ],
              answer: 1,
              explanation: 'Scripts execute as the parser reaches them, so a script in `<head>` runs before the body exists and the lookup returns null. Move the tag to the end of `<body>`, or wrap the code in a `DOMContentLoaded` listener — both fix it.',
            },
            {
              id: 'quiz-js-l64-q5',
              type: 'blank',
              prompt: 'Which property should you use to write plain text into an element, given that its value might have come from a user?',
              answers: [
                'textcontent',
                'textcontent property',
                'el.textcontent',
              ],
              explanation: '`textContent` treats every character as text, so a `<` stays a `<` and nothing executes. `innerHTML` parses the string as markup, which is what turns a pasted `<img onerror=...>` into a script running on your page.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l64-b1',
            body: 'The **DOM** — Document Object Model — is the browser\'s live representation of your page as a tree of objects, one object per node: your elements, the text between them, the attributes on them. JavaScript does not edit your HTML file. It reads and writes *this tree*, and the browser repaints the instant you do, which is why an element built in JavaScript is indistinguishable from one you typed by hand. The practical consequence: JavaScript is not restricted to what you wrote, it can read and change anything the browser parsed.',
          },
          {
            type: 'demo',
            id: 'j-l64-d1',
            title: 'Writing to the page',
            body: 'A heading, a paragraph and a button. The click handler finds the paragraph by id, reads its current text, and writes a new one — three DOM methods doing all the work, no reload.',
            html: `<h2 id="title">The DOM in one click</h2>
<p id="status">Nothing has happened yet.</p>
<button id="go">Update the paragraph</button>`,
            css: `button { font: inherit; padding: 0.4rem 0.9rem; }
p { font-size: 15px; }`,
            javascript: `const status = document.getElementById('status')

document.getElementById('go').addEventListener('click', function () {
  const before = status.textContent
  status.textContent = 'You just replaced: ' + before
})`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'j-l64-h1',
            level: 3,
            body: 'The tree, and the objects on it',
          },
          {
            type: 'code',
            id: 'j-l64-c1',
            language: 'javascript',
            title: 'Walking the tree',
            code: `const body = document.body
body.firstElementChild            // the first element inside body
document.querySelector('h2')      // the first h2 anywhere, or null
document.querySelectorAll('li')   // every li, as a NodeList
document.getElementById('status') // by id

const p = document.querySelector('#status')
p.tagName                        // 'P'
p.parentElement                  // the element that contains it
p.children                       // its element children
p.textContent                    // all the text inside it`,
          },
          {
            type: 'text',
            id: 'j-l64-b2',
            body: 'Every element object carries its own properties: `tagName`, `id`, `className`, `children`, `parentElement`, and links out to `parentNode` and `nextElementSibling` for walking around it. `querySelector` takes any CSS selector and returns the first match or `null`; `getElementById` is the fastest lookup when you already know the id. Reading a property off `null` is the single most common DOM error, so either check the result or use optional chaining — `document.querySelector("#out")?.textContent`.',
          },
          {
            type: 'heading',
            id: 'j-l64-h2',
            level: 3,
            body: 'Creating, appending and removing',
          },
          {
            type: 'code',
            id: 'j-l64-c2',
            language: 'javascript',
            title: 'The three methods every dynamic list needs',
            code: `const list = document.querySelector('#tasks')

const item = document.createElement('li')   // 1. make the element
item.textContent = 'Buy milk'               //    fill it with text
item.classList.add('todo')                 //    and a class

list.appendChild(item)                      // 2. put it in the page

// 3. take it out again
const done = document.createElement('li')
done.textContent = 'Made the tea'
list.appendChild(done)
done.remove()`,
          },
          {
            type: 'text',
            id: 'j-l64-b3',
            body: '`createElement` builds an element that is **not yet in the document** — it exists in memory only. `appendChild` puts it in, and the browser repaints. `remove` (or `element.remove()` on the element itself) takes it out again. The same three steps cover every list, table and card you will ever build from data: make, fill, attach. Building an element and putting it in the tree in one step with `insertAdjacentHTML` is convenient and skips the fill step entirely, which is exactly the shortcut that leads to bugs.',
          },
          {
            type: 'heading',
            id: 'j-l64-h3',
            level: 3,
            body: 'Three ways to write, one safe answer',
          },
          {
            type: 'code',
            id: 'j-l64-c3',
            language: 'javascript',
            title: 'textContent, innerHTML, setAttribute',
            code: `out.textContent = 'Cart: 2 items'     // text only — always safe
out.innerHTML = '<b>Cart:</b> 2'  // parsed as markup
img.setAttribute('alt', 'A cat')   // any attribute
img.alt = 'A cat'                  // common ones are properties too
out.classList.add('busy')          // add / remove / toggle / contains
out.hidden = true                  // a boolean attribute`,
          },
          {
            type: 'warning',
            id: 'j-l64-w1',
            title: 'innerHTML executes what it is given',
            body: '`innerHTML` hands your string to the HTML parser, so markup in it becomes real elements and a `<script>` in it runs. `textContent` shows every character as a character and a `<` stays a `<`. The difference is invisible until the moment a value came from somewhere you do not control: `element.innerHTML = userInput` lets someone paste `<img src=x onerror="...">` and run code on your page. Rule for the rest of the course — build with `createElement`, fill with `textContent`, and keep `innerHTML` for clearing a container you control.',
          },
          {
            type: 'heading',
            id: 'j-l64-h4',
            level: 3,
            body: 'When your script runs',
          },
          {
            type: 'code',
            id: 'j-l64-c4',
            language: 'javascript',
            title: 'Two placements, one guarantee',
            code: `<!-- in <head>: the element does not exist yet, so wait for DOMContentLoaded -->
<script>
  document.addEventListener('DOMContentLoaded', function () {
    start()
  })
</script>

<!-- at the end of <body>: everything above has been parsed already -->
<script src="app.js"></script>`,
          },
          {
            type: 'text',
            id: 'j-l64-b4',
            body: 'Scripts run the moment the parser reaches them, top to bottom. Put a script in `<head>` and `#status` does not exist yet, so `document.getElementById("status")` gives you `null` and the first click does nothing. Either move the tag to the end of `<body>`, where everything above it has been parsed, or wrap your code in a `DOMContentLoaded` listener, which fires once the whole document is ready. Both are correct; mixing them up is the reason for a script that runs fine and finds nothing.',
          },
          {
            type: 'heading',
            id: 'j-l64-h5',
            level: 3,
            body: 'document.write, and why not',
          },
          {
            type: 'code',
            id: 'j-l64-c5',
            language: 'javascript',
            title: 'The one method that rewrites your page',
            code: `document.write('<p>Hello</p>')   // parses markup into the page

// What you should write instead
const p = document.createElement('p')
p.textContent = 'Hello'
document.body.appendChild(p)`,
          },
          {
            type: 'warning',
            id: 'j-l64-w2',
            title: 'document.write replaces the whole document',
            body: '`document.write` writes raw HTML into the parser stream. During initial load it appends, but called from inside a callback after load — which is exactly what most people mean by it — it wipes everything the page has built so far and replaces it with what you wrote. It is also a blocking parser, so it costs you page speed. Use `createElement` and `appendChild`; they are not more code, they are safer and they compose.',
          },
          {
            type: 'tip',
            id: 'j-l64-t1',
            title: 'Batch writes, do not loop the DOM',
            body: 'Appending inside a loop of a thousand items makes the browser lay out a thousand times. Build the elements off the page first, append them all, and it lays out once. Practically: create a fragment with `document.createDocumentFragment()`, append into that, then append the fragment. On a small list nobody will notice; on a large one it is the difference between smooth and visibly janky.',
          },
          {
            type: 'list',
            id: 'j-l64-l1',
            style: 'bullet',
            items: [
              '**Find it:** `getElementById` for a known id, `querySelector` for anything else, and always handle the `null`.',
              '**Read it:** `textContent` for text, `.value` for form controls, `getAttribute` for anything else.',
              '**Write it:** `textContent` for text, `classList` for state, `setAttribute` for the rest.',
              '**Build it:** `createElement`, fill, then `appendChild` — or `remove()` to take it out.',
              '**Time it:** end of `<body>`, or `DOMContentLoaded`, or the element you need is not there yet.'
            ]
          },
          {
            type: 'exercise',
            id: 'j-l64-x1',
            exercise: {
              id: 'ex-js-dom-basics',
              instructions:
                'Write a function `setStatus(message)` that finds the element with id "status" and sets its text to the message passed in. Then wire the button with id "go" so that clicking it calls `setStatus("clicked")`. Keep the starter HTML, and use `textContent` rather than `innerHTML`.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<p id="status">waiting</p>
<button id="go" type="button">Go</button>`,
                javascript: `const button = document.querySelector('#go')

function setStatus(message) {
  // find #status and write the message into it
}

button.addEventListener('click', function () {
  // call setStatus with 'clicked'
})
`,
              },
              tests: [
                {
                  id: 'ex-js-dom-basics-t1',
                  label: 'setStatus is defined',
                  body: `if (typeof setStatus !== 'function') return 'Define a function called setStatus.'
return true;`,
                },
                {
                  id: 'ex-js-dom-basics-t2',
                  label: 'Clicking #go makes #status read clicked',
                  body: `var status = document.querySelector('#status')
var button = document.querySelector('#go')
if (!status) return 'Keep the <p id="status"> element from the starter HTML.'
if (!button) return 'Keep the <button id="go"> from the starter HTML.'
setStatus('reset by the test')
button.click()
return status.textContent.trim() === 'clicked'
  ? true
  : '#status should read exactly: clicked. Found: ' + status.textContent.trim();`,
                },
                {
                  id: 'ex-js-dom-basics-t3',
                  label: 'It looks the element up instead of hardcoding it',
                  body: `var src = setStatus.toString()
return src.indexOf('status') > -1 && src.indexOf('querySelector') > -1
  ? true
  : 'Look the element up inside setStatus: const status = document.querySelector("#status").';`,
                },
                {
                  id: 'ex-js-dom-basics-t4',
                  label: 'It writes with textContent, not innerHTML',
                  body: `var src = setStatus.toString()
return src.indexOf('textContent') > -1
  ? true
  : 'Use status.textContent = message. innerHTML parses markup, and it is an injection risk.';`,
                },
              ],
              hints: [
                'Two lines: look up the element, then write to it.',
                '`const status = document.querySelector("#status"); status.textContent = message`',
                'If the click test fails, check that the handler calls `setStatus("clicked")` rather than writing to the element itself.',
              ],
              solution: {
                html: `<p id="status">waiting</p>
<button id="go" type="button">Go</button>`,
                javascript: `const button = document.querySelector('#go')

function setStatus(message) {
  const status = document.querySelector('#status')
  if (status) {
    status.textContent = message
  }
}

button.addEventListener('click', function () {
  setStatus('clicked')
})`,
              },
              testNotes:
                'The click test really clicks the button and reads the paragraph back, so it checks behaviour rather than spelling. The last two read your source: they cannot tell a correct lookup from an accidental hardcoded message.',
            },
          },
        ],
      },
    ],
  },
]