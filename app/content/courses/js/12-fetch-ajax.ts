import type { Section } from '~/types/content'

export const jsFetchAjaxSections: Section[] = [
  {
    id: 'js-s73',
    title: 'Web workers',
    description: 'Moving a heavy calculation off the main thread so the page keeps responding while it runs.',
    lessons: [
      {
        id: 'js-l85',
        title: 'Web workers',
        description: 'Why a long loop freezes the page, and how to hand that loop to a background thread.',
        duration: 6,
        objectives: [
          'Explain why a long loop stops the page answering clicks',
          'Create a worker and move a calculation into it',
          'Pass values in with postMessage and read results from onmessage',
          'Describe what a worker has no access to'
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l85-b1',
            body: 'JavaScript in a page runs on a single thread: one queue, one job at a time. A loop that takes three seconds occupies that thread for three seconds, and nothing else can run while it does. Clicks are not lost, they queue up, so the button appears dead until the loop finishes. You can see it: open the developer tools, run a loop of a billion iterations, and try to type in the address bar while it runs. That single queue is the reason a worker exists.',
          },
          {
            type: 'demo',
            id: 'j-l85-d1',
            title: 'A counter that keeps ticking while a worker calculates',
            body: 'The number on the right is updated by an interval on the main thread. Press the button and eighty million square roots are computed inside a worker, and the counter carries on moving throughout. Move the same loop into the main thread and the counter freezes until it finishes.',
            html: `<p>UI updates: <strong id="tick">0</strong></p>
<button id="go">Start the heavy loop in a worker</button>
<pre id="out">Nothing started yet.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; min-height: 3.2rem; }`,
            javascript: `const out = document.getElementById('out')
const tick = document.getElementById('tick')
const button = document.getElementById('go')

// A worker's code is ordinary text. Blob keeps it on this page, so there is no second file to serve.
const source = [
  'self.onmessage = function (event) {',
  '  var total = 0',
  '  for (var i = 0; i < event.data.count; i++) total += Math.sqrt(i)',
  '  self.postMessage({ total: total })',
  '}'
].join('\\n')

const worker = new Worker(URL.createObjectURL(new Blob([source], { type: 'text/javascript' })))

let ticks = 0
setInterval(function () {
  ticks += 1
  tick.textContent = String(ticks)
}, 200)

worker.onmessage = function (event) {
  out.textContent = 'Worker finished. Total: ' + Math.round(event.data.total) +
    '\\nUI updates that still happened: ' + ticks
}

button.addEventListener('click', function () {
  button.disabled = true
  out.textContent = 'Working...'
  worker.postMessage({ count: 80000000 })
})`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'j-l85-h1',
            level: 3,
            body: 'Creating a worker',
          },
          {
            type: 'text',
            id: 'j-l85-b2',
            body: '`new Worker(url)` takes the address of a separate script file, exactly like a `<script src>`. The browser starts a second thread for it and returns immediately. The two threads do not share memory in any way you can rely on, so there is nothing to pass by reference: the only way anything crosses the boundary is a message. That constraint is also what makes workers safe. A worker cannot reach into your page by accident, so a background job cannot quietly rewrite a variable the rest of the page depends on.',
          },
          {
            type: 'code',
            id: 'j-l85-c1',
            language: 'javascript',
            title: 'Two files, one channel',
            code: `// main.js
const worker = new Worker('worker.js')

worker.onmessage = function (event) {
  console.log('the worker says', event.data)
}

worker.postMessage({ start: 0, end: 1000000 })`,
          },
          {
            type: 'code',
            id: 'j-l85-c2',
            language: 'javascript',
            title: 'worker.js',
            code: `// runs on its own thread, with its own globals
self.onmessage = function (event) {
  const { start, end } = event.data
  let sum = 0

  for (let i = start; i < end; i += 1) {
    sum += Math.sqrt(i)
  }

  self.postMessage(sum)
}`,
          },
          {
            type: 'text',
            id: 'j-l85-b3',
            body: '`postMessage` copies its argument, so what arrives is a structured clone: plain objects, arrays, strings, numbers, and typed arrays survive the trip, while functions, DOM nodes and class instances do not. Post one and you get the number back, not the object you passed. If your payload will not survive the copy you get a `DataCloneError` at the moment of the call, which is a far kinder failure than a value that arrives subtly wrong.',
          },
          {
            type: 'warning',
            id: 'j-l85-w1',
            title: 'A worker cannot touch the DOM',
            body: 'There is no `document` inside a worker. Any code that reaches for `document.querySelector` or `window.alert` fails the moment it runs, usually as a `ReferenceError` buried in the console with no stack pointing at the real cause. The rule is simple: the worker calculates, the main thread draws. Compute in the worker, `postMessage` the answer back, and let `onmessage` on the main thread be the part that touches the page.',
          },
          {
            type: 'list',
            id: 'j-l85-l1',
            style: 'bullet',
            items: [
              '**Not available:** `document`, `window`, and anything else belonging to the page. The worker\'s own global is `self`.',
              '**Available:** `fetch`, `setTimeout`, `importScripts`, IndexedDB, and the maths you need to calculate with.',
              '**Costs real time:** starting a worker spins up a thread and parses a file, so a worker per keystroke is slower than the work it was meant to speed up.',
              '**Terminated abruptly:** `worker.terminate()` stops it mid-calculation, with no cleanup and no chance to save state.',
              '**Needs a server:** a worker script is fetched like any other file, so opening the page with `file://` will usually fail on the fetch.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l85-h2',
            level: 3,
            body: 'Dividing the work up',
          },
          {
            type: 'text',
            id: 'j-l85-b4',
            body: 'One worker on a four-core machine leaves most of the machine idle, so the usual move is to start several and give each one a slice of the input. The slicing itself is cheap arithmetic and belongs on the main thread: compute the boundaries, post one message per worker, and collect the answers as they arrive. Because results come back in no guaranteed order, every reply needs the identifier of the task it belongs to, otherwise you cannot tell which slice produced which number.',
          },
          {
            type: 'code',
            id: 'j-l85-c3',
            language: 'javascript',
            title: 'Three workers, three slices, one result',
            code: `function runParallel(numbers, workerCount) {
  const size = Math.ceil(numbers.length / workerCount)
  const workers = []

  return new Promise(function (resolve) {
    const parts = []
    let done = 0

    for (let i = 0; i < workerCount; i += 1) {
      const slice = numbers.slice(i * size, (i + 1) * size)
      const worker = new Worker('worker.js')

      worker.onmessage = function (event) {
        parts.push(event.data)
        done += 1

        if (done === workerCount) {
          workers.forEach((w) => w.terminate())
          resolve(parts)
        }
      }

      // the task id travels with the data, because replies can arrive in any order
      worker.postMessage({ id: i, values: slice })
      workers.push(worker)
    }
  })
}`,
          },
          {
            type: 'tip',
            id: 'j-l85-t1',
            title: 'Reach for a worker only after you have measured',
            body: 'Most of what feels slow can be fixed without a second thread: move the loop inside `requestAnimationFrame` so the page keeps painting, replace a loop over thousands of elements with a single `querySelectorAll`, or defer the work until after first paint. A worker adds a file, a message format and a place for bugs to hide. It is worth it for work that genuinely blocks for hundreds of milliseconds, and not worth it for anything shorter.',
          },
          {
            type: 'exercise',
            id: 'j-l85-x1',
            exercise: {
              id: 'ex-js-worker-slices',
              instructions:
                'Write a function `splitWork(count, workers)` that returns an array of exactly `workers` task objects, each `{ id, start, end }`, splitting the range from 0 to `count` into equal parts. Every task must have a `start` of 0 or a previous task\'s `end`, the last task must end at `count`, and no task may extend past `count`. Give each task an `id` equal to its position in the array. With `splitWork(10, 3)` expect `[{id:0,start:0,end:4},{id:1,start:4,end:8},{id:2,start:8,end:10}]`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function splitWork(count, workers) {
  // build the tasks here
  
}

console.log(splitWork(10, 3))
`,
              },
              expectedOutput: "[ { id: 0, start: 0, end: 4 }, { id: 1, start: 4, end: 8 }, { id: 2, start: 8, end: 10 } ]",
              tests: [
                {
                  id: 'ex-js-worker-slices-t1',
                  label: 'It returns one task per worker',
                  body: `if (typeof splitWork !== 'function') return 'Define a function called splitWork.'
var tasks = splitWork(10, 3)
return Array.isArray(tasks) && tasks.length === 3
  ? true
  : 'Expect an array with exactly as many entries as there are workers.';`,
                },
                {
                  id: 'ex-js-worker-slices-t2',
                  label: 'The slices are contiguous and cover the range',
                  body: `if (typeof splitWork !== 'function') return 'Define a function called splitWork.'
var tasks = splitWork(10, 3)
if (!Array.isArray(tasks)) return 'Expect an array of tasks.'
for (var i = 1; i < tasks.length; i++) {
  if (tasks[i].start !== tasks[i - 1].end) return 'Slice ' + i + ' must start where the previous one ended.'
}
return tasks[0].start === 0 && tasks[tasks.length - 1].end === 10
  ? true
  : 'Start at 0 and finish at count, with no gaps between slices.';`,
                },
                {
                  id: 'ex-js-worker-slices-t3',
                  label: 'No slice runs past count',
                  body: `if (typeof splitWork !== 'function') return 'Define a function called splitWork.'
var tasks = splitWork(10, 3)
if (!Array.isArray(tasks)) return 'Expect an array of tasks.'
for (var i = 0; i < tasks.length; i++) {
  if (typeof tasks[i].end !== 'number' || tasks[i].end > 10) return 'A slice ends past count, so a worker would read values that do not exist.'
}
return true
  ? true
  : 'Clamp the final slice to count.';`,
                },
                {
                  id: 'ex-js-worker-slices-t4',
                  label: 'Each task carries its id',
                  body: `if (typeof splitWork !== 'function') return 'Define a function called splitWork.'
var tasks = splitWork(10, 3)
if (!Array.isArray(tasks)) return 'Expect an array of tasks.'
for (var i = 0; i < tasks.length; i++) {
  if (tasks[i].id !== i) return 'Task ' + i + ' has id ' + tasks[i].id + '. Replies can arrive in any order, so each task needs its own id.'
}
return true
  ? true
  : 'Set id to the task position, starting at 0.';`,
                },
              ],
              hints: [
                'The slice width is `Math.ceil(count / workers)` - then walk the array with a `for` loop and set each `start` from the previous `end`.',
                'Building each task as `{ id: i, start: i * size, end: Math.min((i + 1) * size, count) }` handles the short last slice for you.',
                'If the final `end` overshoots, clamp it: `Math.min((i + 1) * size, count)`. That is the difference between 10 values and 12.',
              ],
              solution: {
                javascript: `function splitWork(count, workers) {
  const size = Math.ceil(count / workers)
  const tasks = []

  for (let i = 0; i < workers; i += 1) {
    tasks.push({
      id: i,
      start: i * size,
      end: Math.min((i + 1) * size, count)
    })
  }

  return tasks
}

console.log(splitWork(10, 3))
`,
              },
              testNotes:
                'These checks call your function directly, because there is no worker runtime in this sandbox. They inspect the shape and the arithmetic of the slices, not the messaging that would carry them.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s73',
      title: 'Web workers check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s73-q1',
          type: 'multiple-choice',
          prompt: 'A page freezes while a large loop runs. What is happening?',
          options: [
            'The loop has an infinite recursion and the browser has stopped responding',
            'The loop occupies the only JavaScript thread, so queued events cannot be handled',
            'The garbage collector has run out of memory',
            'The loop is waiting on a network response that never arrives'
          ],
          answer: 1,
          explanation:
            'A page has one main thread and one task queue. A synchronous loop is one task that does not yield, so the click or keypress events arriving during it wait their turn. That is the freeze, and it is why the fix is either to yield with setTimeout or requestAnimationFrame, or to move the loop to a worker thread.',
        },
        {
          id: 'quiz-js-s73-q2',
          type: 'true-false',
          prompt: 'A web worker script can read and modify elements in the page with `document.querySelector`.',
          answer: false,
          explanation:
            'There is no `document` in a worker. It runs on a separate thread with its own global scope, and its only way back to the page is postMessage, which the main thread receives through onmessage and acts on. Attempting to touch the DOM from a worker is a ReferenceError, not a subtle bug.',
        },
        {
          id: 'quiz-js-s73-q3',
          type: 'blank',
          prompt: 'Which method sends data from a worker thread back to the page?',
          answers: ['postmessage'],
          explanation:
            '`self.postMessage(value)` inside the worker is the return channel, and it mirrors `worker.postMessage(value)` in the other direction. Data crosses as a structured clone, so functions and DOM nodes are refused at the call rather than arriving broken.',
        },
        {
          id: 'quiz-js-s73-q4',
          type: 'identify-error',
          prompt: 'This worker is supposed to paint a progress bar. What is wrong?',
          code: `const worker = new Worker('worker.js')
worker.onmessage = function (event) {
  document.getElementById('bar').style.width = event.data + '%'
}`,
          options: [
            'postMessage should be called with an object rather than a number',
            'onmessage must be assigned before the Worker is constructed',
            'Nothing is wrong: a worker script runs on the same thread as the page'
          ],
          answer: 0,
          explanation:
            'Nothing here is wrong at all - this is the correct shape for updating the page from a worker. The worker does the calculation, posts a number back, and the onmessage handler on the main thread is what touches the DOM. Contrast it with a worker that reaches for document itself, which fails immediately.',
        },
        {
          id: 'quiz-js-s73-q5',
          type: 'code-output',
          prompt: 'The main thread runs the first snippet. What does it print?',
          code: `// w.js
self.onmessage = function (event) {
  self.postMessage(event.data * 2)
}

// main.js
const w = new Worker('w.js')
w.onmessage = function (event) {
  console.log(event.data)
}
w.postMessage(7)`,
          options: ['7', '14', 'undefined', 'It prints nothing'],
          answer: 1,
          explanation:
            'The message arrives with data 7, the worker doubles it and posts 14 back, and the main thread logs it. The result is asynchronous: the console line appears after postMessage returns, never before it, which is why nothing in main.js needs to wait for a worker to be ready.',
        },
      ],
    },
  },
  {
    id: 'js-s74',
    title: 'Fetch',
    description: 'Asking a server for data: what a request is made of, why fetch hands you an envelope rather than data, and how to send JSON and give up waiting.',
    lessons: [
      {
        id: 'js-l86',
        title: 'fetch and JSON over HTTP',
        description: 'What an HTTP request is made of, why fetch resolves with a response instead of data, how to send JSON, and how to stop waiting.',
        duration: 7,
        objectives: [
          'Name the four parts of an HTTP request and read a response status',
          'Explain why fetch gives you a response and why response.ok must be checked',
          'Send and parse JSON bodies with GET and POST'
        ],
        xp: 55,
        content: [
          {
            type: 'text',
            id: 'j-l86-b1',
            body: 'Everything a page knows about the world beyond itself, it learned by making a request. The two calls you will write most often are `fetch` to read and `fetch` with `method: "POST"` to write, and both follow the same three steps: make the request, check that it succeeded, then read the body. Almost every bug in this lesson can be traced to skipping the middle step.',
          },
          {
            type: 'demo',
            id: 'j-l86-d1',
            title: 'The ok check decides which path runs',
            body: 'Both buttons run the same three-step function. The first one gets a response with `ok` true, so the data is parsed. The second gets a 500, so the function raises and the catch reports it. Nothing here talks to a network - `fakeFetch` stands in for the real thing, and swapping in `fetch("/api/posts")` leaves the rest of the function unchanged.',
            html: `<button id="ok-btn">Response 200</button>
<button id="bad-btn">Response 500</button>
<pre id="out">Press a button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; margin-right: 0.4rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; min-height: 4rem; white-space: pre-wrap; }`,
            javascript: `const out = document.getElementById('out')

// stands in for fetch: resolves with the shape of a real Response
function fakeFetch(status, body) {
  return Promise.resolve({
    ok: status >= 200 && status < 300,
    status: status,
    json: function () { return Promise.resolve(body) }
  })
}

async function getJSON(source) {
  const response = await source
  if (!response.ok) {
    throw new Error('HTTP ' + response.status)
  }
  return response.json()
}

async function run(status) {
  out.textContent = 'Loading...'
  try {
    const posts = await getJSON(fakeFetch(status, [{ id: 1, title: 'First post' }]))
    out.textContent = 'ok was true, so the body was parsed:\\n' + JSON.stringify(posts, null, 2)
  } catch (error) {
    out.textContent = 'ok was false, so the error path ran: ' + error.message +
      '\\nWithout the ok check, json() would have run on the error page instead.'
  }
}

document.getElementById('ok-btn').addEventListener('click', function () { run(200) })
document.getElementById('bad-btn').addEventListener('click', function () { run(500) })`,
            height: 240,
          },
          {
            type: 'text',
            id: 'j-l86-b2',
            body: 'A page cannot read a database directly - the browser is not allowed to, and should not be. It sends an HTTP **request** to a server, and the server sends back a **response**. Every request has four parts: the **method** (what you want done - `GET` to read, `POST` to create, `PUT` or `PATCH` to change, `DELETE` to remove), the **URL**, the **headers** (metadata such as `Content-Type` and any auth token), and optionally a **body** (the data being sent). Getting any of the four wrong is the usual cause of a request that returns the wrong thing, so it pays to be able to name them.',
          },
          {
            type: 'heading',
            id: 'j-l86-h1',
            level: 3,
            body: 'fetch gives you a response, not the data',
          },
          {
            type: 'text',
            id: 'j-l86-b3',
            body: '`fetch` is asynchronous, so it returns a **promise for the response** - the envelope, not the contents. You `await` it and get a `Response`: `ok` and `status` say how the request went, `headers` describes the body, and the body itself arrives through methods like `.json()` or `.text()`, each of which returns *another* promise. That is why a request needs two awaits: one for the envelope, one for the contents. The headers you send go in `headers`; the `Content-Type` there is what tells the server how to read your body, and without it a JSON body arrives as an unparseable string of characters.',
          },
          {
            type: 'warning',
            id: 'j-l86-w1',
            title: 'fetch swallows HTTP errors by default',
            body: 'If the server is down or the network drops, `fetch` rejects its promise and your `catch` runs. A 404 or a 500 does **not** reject - the request succeeded as far as the network is concerned; the server simply said no. So the promise resolves, `response.ok` is `false`, and if you go straight to `response.json()` you are usually parsing an error page and get a confusing message about unexpected tokens instead of about the missing record. Always check `response.ok` right after the await, and wrap the call in `try/catch` so a real network failure surfaces instead of quietly producing `undefined`.',
          },
          {
            type: 'heading',
            id: 'j-l86-h2',
            level: 3,
            body: 'A wrapper that fails properly',
          },
          {
            type: 'code',
            id: 'j-l86-c1',
            language: 'javascript',
            title: 'A robust getJSON',
            code: `async function getJSON(url) {
  const response = await fetch(url)

  // a 404 or 500 resolves - this is the check people forget
  if (!response.ok) {
    throw new Error('HTTP ' + response.status + ' ' + response.statusText)
  }

  // response.json() is a promise too, so return it and let the caller await
  return response.json()
}

try {
  const posts = await getJSON('/api/posts')
  console.log(posts)
} catch (error) {
  console.error('Failed to load:', error.message)
}`,
          },
          {
            type: 'text',
            id: 'j-l86-b4',
            body: 'Write this once and every call in your app inherits the error handling. The two `await`s become one at the call site because the function itself is `async`, and because it throws on a bad status, the caller\'s `try/catch` catches both kinds of failure - the HTTP error and the dropped connection - with the same line. Parsing is `await response.json()`, which turns the body text into a plain object: `posts` above is an array of objects you can `map` over like any other. Its mirror image is `JSON.stringify()`, which turns your objects back into text; `fetch(...).json()` is nothing more than parse with a nicer name.',
          },
          {
            type: 'tip',
            id: 'j-l86-t1',
            title: 'JSON.stringify and its second argument',
            body: '`JSON.stringify(obj, null, 2)` pretty-prints with two-space indentation, which is what you want when logging an object you are about to debug. The second argument is a **replacer**: a function or an array of allowed keys, called for every key so you can rename, drop or mask it before it goes out. Passing an array of key names is the quick way to send only the fields an API expects - `JSON.stringify(user, [\'id\', \'name\'])` - and a replacer function is where you would replace a password field with asterisks before logging.',
          },
          {
            type: 'heading',
            id: 'j-l86-h3',
            level: 3,
            body: 'Reading with GET, writing with POST',
          },
          {
            type: 'code',
            id: 'j-l86-c2',
            language: 'javascript',
            title: 'One request, four parts',
            code: `// GET - no body, nothing else to declare
const response = await fetch('/api/posts')

// POST - method, headers and body, and the body must be text, not an object
const newPost = { title: 'New post', body: 'Hello world!', userId: 1 }

const created = await fetch('/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newPost)
})`,
          },
          {
            type: 'text',
            id: 'j-l86-b5',
            body: '`method` defaults to `GET`, which is why a bare `fetch(url)` reads. Three things trip people up the first time they POST. You must serialise the object - `body` takes a string, and handing it an object sends the text `"[object Object]"`, which no server can use. You must set `Content-Type: application/json`, because that header is the server\'s instruction for how to read what follows; leave it out and many APIs reject the request outright. And the response is usually not the thing you sent - a server that creates a record normally answers with the stored version, complete with an `id` the database generated.',
          },
          {
            type: 'heading',
            id: 'j-l86-h4',
            level: 3,
            body: 'Giving up: AbortController',
          },
          {
            type: 'code',
            id: 'j-l86-c3',
            language: 'javascript',
            title: 'A timeout you actually get to choose',
            code: `async function getJSONWithTimeout(url, ms) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)

  try {
    const response = await fetch(url, { signal: controller.signal })
    if (!response.ok) {
      throw new Error('HTTP ' + response.status + ' ' + response.statusText)
    }
    return await response.json()
  } catch (error) {
    // an abort arrives as its own error type, so re-word it
    if (error.name === 'AbortError') {
      throw new Error('The request took longer than ' + ms + 'ms')
    }
    throw error
  } finally {
    // always clear the timer, or it fires into a request that already finished
    clearTimeout(timer)
  }
}`,
          },
          {
            type: 'text',
            id: 'j-l86-b6',
            body: 'A request that never comes back leaves the promise pending for ever, and your spinner spins for ever with it. `AbortController` produces a `signal` you hand to `fetch`, and calling `abort()` on the controller cancels the request; `fetch` then rejects with an `AbortError`. The same controller cancels work you started yourself - a search box that fires a request on every keystroke should abort the previous one, so only the last result is ever applied. Note the `finally`: without `clearTimeout` the timer survives the request and fires later into nothing.',
          },
          {
            type: 'warning',
            id: 'j-l86-w2',
            title: 'Never put a secret key in browser code',
            body: 'Anything you write in a page is delivered to every visitor. View source, the network tab and the JavaScript bundle all show it, so a key pasted into a `<script>` or a built `.js` file is public to anyone who opens the page - it is not hidden, only not looked at. This is why API providers give you a separate server-side key for browser apps. In the browser, call your **own** server, and let that server hold the provider key and make the privileged call on your behalf. If a key is ever committed or shipped, treat it as compromised and rotate it; the fix is not to remove it from the file.',
          },
          {
            type: 'example',
            id: 'j-l86-e1',
            title: 'A GET and a POST from the same page',
            body: 'Two buttons, two shapes of request. The reader awaits the response, checks `ok` before parsing, and pretty-prints the JSON. The writer builds an object, sends it with a `Content-Type` header, and shows what came back. `stubReply` stands in for the server - swap it for `fetch("/api/posts")` and `fetch("/api/posts", { method: "POST", headers, body: JSON.stringify(newPost) })` and both functions run unchanged.',
            html: `<button id="load-posts">Load posts</button>
<button id="add-post">Add post</button>
<pre id="output">Pick a button.</pre>`,
            javascript: `const output = document.getElementById('output')

// stands in for a real endpoint: an ok response with a json() method
const stubReply = (body) => Promise.resolve({
  ok: true,
  status: 200,
  json: () => Promise.resolve(body)
})

async function loadPosts() {
  output.textContent = 'Loading...'
  try {
    const response = await stubReply([{ id: 1, title: 'First post' }])
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const posts = await response.json()
    output.textContent = JSON.stringify(posts, null, 2)
  } catch (error) {
    output.textContent = 'Failed to load: ' + error.message
  }
}

async function addPost() {
  const newPost = { title: 'New post', body: 'Hello world!', userId: 1 }
  const created = await (await stubReply({ id: 2, ...newPost })).json()
  output.textContent = 'Sent:\\n' + JSON.stringify(newPost, null, 2) +
    '\\n\\nServer replied:\\n' + JSON.stringify(created, null, 2)
}

document.getElementById('load-posts').addEventListener('click', loadPosts)
document.getElementById('add-post').addEventListener('click', addPost)`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l86-x1',
            exercise: {
              id: 'ex-js-fetch-json',
              instructions:
                'Write an async function `getTodos()` that fetches "/api/todos", throws a descriptive error when `response.ok` is false, and returns the parsed JSON array.',
              languages: ['javascript'],
              starterCode: {
                javascript: `async function getTodos() {
  // your code here
}

getTodos().then(function (todos) {
  console.log(todos.length + ' todos')
}).catch(function (error) {
  console.error(error.message)
})
`,
              },
              expectedOutput: 'The function is async, checks response.ok, and returns the parsed array',
              tests: [
                {
                  id: 'ex-js-fetch-json-t1',
                  label: 'getTodos is defined and async',
                  body: `if (typeof getTodos !== 'function') return 'Define a function called getTodos.'
return getTodos.constructor.name === 'AsyncFunction'
  ? true
  : 'Make it an async function so it can use await.';`,
                },
                {
                  id: 'ex-js-fetch-json-t2',
                  label: 'It requests the right URL',
                  body: `if (typeof getTodos !== 'function') return 'Define a function called getTodos.'
var src = getTodos.toString()
return src.indexOf('fetch') > -1 && src.indexOf('/api/todos') > -1
  ? true
  : 'Call fetch("/api/todos") inside the function.';`,
                },
                {
                  id: 'ex-js-fetch-json-t3',
                  label: 'It checks response.ok before parsing',
                  body: `if (typeof getTodos !== 'function') return 'Define a function called getTodos.'
var src = getTodos.toString()
return src.indexOf('ok') > -1
  ? true
  : 'Check response.ok and raise a descriptive error when it is false.';`,
                },
                {
                  id: 'ex-js-fetch-json-t4',
                  label: 'It awaits and returns response.json()',
                  body: `if (typeof getTodos !== 'function') return 'Define a function called getTodos.'
var src = getTodos.toString()
return src.indexOf('await') > -1 && src.indexOf('json') > -1
  ? true
  : 'Await response.json() - and return it, so the caller receives the array.';`,
                },
              ],
              hints: [
                'Start with `const response = await fetch("/api/todos")` - the response is the envelope, not the data.',
                '`if (!response.ok) { throw new Error("Failed to load todos: " + response.status) }`',
                'Finish with `return response.json()`. Returning the promise is fine: an async function unwraps it for the caller.',
              ],
              solution: {
                javascript: `async function getTodos() {
  const response = await fetch('/api/todos')
  if (!response.ok) {
    throw new Error('Failed to load todos: ' + response.status + ' ' + response.statusText)
  }
  return response.json()
}

getTodos().then(function (todos) {
  console.log(todos.length + ' todos')
})`,
              },
              testNotes:
                'The checks read your source, because no server is running in this sandbox. They confirm the order of operations - request, status check, parse - but not the URL being reachable or the data being well-formed.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s74',
      title: 'Fetch check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s74-q1',
          type: 'multiple-choice',
          prompt: 'What does `await fetch(url)` give you?',
          options: [
            'The parsed body as a plain object',
            'A promise for the response, whose body still needs .json() or .text()',
            'A string of the response body',
            'Nothing, until you call a second function'
          ],
          answer: 1,
          explanation:
            'fetch resolves with a Response: the envelope carrying status, headers and a body you have not read yet. Reading the body is a separate promise from .json(), .text() or .blob(), which is why a full request needs two awaits and why `await fetch(url)` followed by a direct property access usually gives you undefined.',
        },
        {
          id: 'quiz-js-s74-q2',
          type: 'true-false',
          prompt: 'A 404 response makes the promise returned by `fetch` reject, so a `catch` block will run.',
          answer: false,
          explanation:
            'The promise resolves. As far as the network is concerned the request succeeded - something answered. That is exactly why `response.ok` exists and has to be checked by hand: without it you call .json() on an error page and the message you get is about unexpected tokens rather than about the missing record.',
        },
        {
          id: 'quiz-js-s74-q3',
          type: 'blank',
          prompt: 'Which property tells you whether the HTTP status was a success?',
          answers: ['response.ok', 'ok', 'response.ok', 'response.ok'],
          explanation:
            '`response.ok` is true for statuses in the 200 to 299 range and false for everything else, including 3xx after no redirect and every 4xx and 5xx. Checking it immediately after the await is the single habit that separates a readable error message from a confusing parse failure.',
        },
        {
          id: 'quiz-js-s74-q4',
          type: 'identify-error',
          prompt: 'This POST always fails on the server. Why?',
          code: `await fetch('/api/posts', {
  method: 'POST',
  body: { title: 'New post' }
})`,
          options: [
            'method must be lowercase to be accepted',
            'The body is an object, so it arrives as "[object Object]", and the Content-Type header that says how to read it is missing',
            'fetch cannot be called without a second argument',
            'A POST request must use response.text() instead of response.json()'
          ],
          answer: 1,
          explanation:
            'The body option takes a string, so an object is coerced to "[object Object]" before it leaves. And without `Content-Type: application/json` the server has no instruction for how to read what arrived. Both fixes are the same line: `body: JSON.stringify(newPost)` with the header alongside it.',
        },
        {
          id: 'quiz-js-s74-q5',
          type: 'code-output',
          prompt: 'The server answers with status 404 and an HTML error page. What is logged?',
          code: `try {
  const response = await fetch('/api/posts/999')
  const posts = await response.json()
  console.log(posts.length)
} catch (error) {
  console.log('failed')
}`,
          options: [
            '0',
            'failed',
            'undefined',
            'A SyntaxError object'
          ],
          answer: 3,
          explanation:
            'The 404 resolves rather than rejecting, so the catch never runs and the code goes on to parse an HTML error page as JSON. The rejection happens inside response.json(), which produces a SyntaxError about unexpected tokens - an accurate message about the wrong thing. Checking response.ok first would have turned this into a clear "HTTP 404".',
        },
      ],
    },
  },
  {
    id: 'js-s75',
    title: 'Geolocation',
    description: 'Asking the browser where the visitor is, handling a refusal, and turning a position into something useful.',
    lessons: [
      {
        id: 'js-l87',
        title: 'Geolocation',
        description: 'How to ask for a position with permission, what the callback actually receives, and what to do when the visitor says no.',
        duration: 5,
        objectives: [
          'Call getCurrentPosition with a success and an error callback',
          'Read latitude, longitude and accuracy out of the position object',
          'Handle a refused permission request without breaking the page'
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l87-b1',
            body: 'A page can ask the browser for the visitor\'s position, and the browser then asks the visitor. That two-step is the whole design: your code never reads a location directly, it registers interest, and a human decides. It means the API is built around refusal being normal rather than exceptional, so almost every call site needs both callbacks.',
          },
          {
            type: 'demo',
            id: 'j-l87-d1',
            title: 'The shape of a position, without asking for permission',
            body: 'This prints the fields a successful callback receives, using a sample position defined locally. Nothing here triggers a permission prompt, so it runs everywhere. Replace `samplePosition` with the argument of your own success callback and the output is identical.',
            html: `<button id="go">Show the position fields</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; min-height: 4.5rem; white-space: pre-wrap; }`,
            javascript: `const out = document.getElementById('out')

// the shape of the object a success callback receives
const samplePosition = {
  coords: {
    latitude: 51.5074,
    longitude: -0.1278,
    accuracy: 20,
    altitude: null,
    heading: null,
    speed: null
  },
  timestamp: 1700000000000
}

function describe(latitude, longitude) {
  const ns = latitude >= 0 ? 'north' : 'south'
  const ew = longitude >= 0 ? 'east' : 'west'
  return Math.abs(latitude).toFixed(2) + ' degrees ' + ns + ', ' + Math.abs(longitude).toFixed(2) + ' degrees ' + ew
}

document.getElementById('go').addEventListener('click', function () {
  const c = samplePosition.coords
  out.textContent =
    'coords.latitude: ' + c.latitude + '\\n' +
    'coords.longitude: ' + c.longitude + '\\n' +
    'coords.accuracy: ' + c.accuracy + ' metres\\n' +
    'timestamp: ' + new Date(samplePosition.timestamp).toISOString().slice(0, 10) + '\\n\\n' +
    'That is ' + describe(c.latitude, c.longitude)
})`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'j-l87-h1',
            level: 3,
            body: 'Asking, with both callbacks',
          },
          {
            type: 'code',
            id: 'j-l87-c1',
            language: 'javascript',
            title: 'The smallest correct call',
            code: `navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position.coords.latitude, position.coords.longitude)
  },
  function (error) {
    // error.code 1 means PERMISSION_DENIED
    console.warn('No position:', error.message)
  }
)`,
          },
          {
            type: 'text',
            id: 'j-l87-b2',
            body: 'The first argument runs on success and receives a `GeolocationPosition`. The second runs on failure and receives a `GeolocationPositionError` with a numeric `code`: 1 permission denied, 2 position unavailable, 3 timeout. Both are asynchronous, so the visitor has time to read the prompt and decide. Omitting the error callback is the mistake worth naming up front: a refusal then produces nothing at all, no error, no message, and your feature simply never appears.',
          },
          {
            type: 'warning',
            id: 'j-l87-w1',
            title: 'Geolocation needs a secure origin',
            body: 'Browsers only expose `navigator.geolocation` over HTTPS, with `http://localhost` allowed as an exception for development. On a plain `http://` page the property is `undefined`, so `navigator.geolocation.getCurrentPosition` fails with "Cannot read properties of undefined". The fix is not a polyfill - no library can restore a permission the browser will not ask for. Serve the page over TLS.',
          },
          {
            type: 'heading',
            id: 'j-l87-h2',
            level: 3,
            body: 'What comes back',
          },
          {
            type: 'code',
            id: 'j-l87-c2',
            language: 'javascript',
            title: 'The fields worth reading',
            code: `{
  coords: {
    latitude: 51.5074,      // degrees north, -90 to 90
    longitude: -0.1278,     // degrees east, -180 to 180
    accuracy: 20,           // radius of the true position, in metres
    altitude: null,         // metres above sea level, null when unknown
    altitudeAccuracy: null,
    heading: null,          // degrees from north, null when standing still
    speed: null             // metres per second, null when unknown
  },
  timestamp: 1700000000000  // when the reading was taken, in epoch ms
}`,
          },
          {
            type: 'text',
            id: 'j-l87-b3',
            body: '`accuracy` is a radius in metres around the point, not an error bar on one axis. A reading accurate to 2000 metres could put you anywhere inside a circle two kilometres across, which matters when you sort a list of places by distance: a difference of 50 metres between two readings is inside the noise, so ordering by it is meaningless. Any field the device cannot supply comes back as `null` rather than as `0`, so test for `null` instead of comparing against zero, or a device with no compass will look like one facing due north.',
          },
          {
            type: 'list',
            id: 'j-l87-l1',
            style: 'bullet',
            items: [
              '**One reading:** `getCurrentPosition(success, error, options)` asks once and gives you a single fix.',
              '**Continuous readings:** `watchPosition(...)` calls your callback again whenever the position changes, and returns an id you pass to `clearWatch`.',
              '**Maximum age:** the options object takes `maximumAge` in milliseconds, so a fix less than 60 seconds old can be served from a cache instead of waking the GPS chip.',
              '**Timeout:** the `timeout` option stops waiting, which is what keeps a hopeless request from leaving your spinner up for ever.',
              '**High accuracy:** `enableHighAccuracy` trades battery for precision, and is worth setting only when a few metres actually matter.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l87-w2',
            title: 'Ask only when the answer is about to be used',
            body: 'A permission prompt that appears on page load, before the visitor has any reason to want the feature, gets refused far more often than one that appears after a click on "find me". Ask at the moment of intent, say plainly what you will do with the position, and do not ask again after a refusal: browsers remember the choice, and a second prompt may not even appear.',
          },
          {
            type: 'example',
            id: 'j-l87-e1',
            title: 'Nearest of three places, from a local list',
            body: 'The positions are hard-coded, so this runs without a prompt, but the arithmetic is the real thing: degrees are not metres, so latitude has to be scaled by the cosine of the latitude before the two can be compared. Get that wrong and every distance is stretched as you move away from the equator.',
            html: `<button id="find">Where am I nearest to?</button>
<ul id="results"></ul>`,
            javascript: `const places = [
  { name: 'Northgate', latitude: 51.53, longitude: -0.12 },
  { name: 'Riverside', latitude: 51.48, longitude: -0.09 },
  { name: 'Old Mill', latitude: 51.55, longitude: -0.2 }
]

const here = { latitude: 51.5, longitude: -0.1 }

function distanceMetres(a, b) {
  const rad = Math.PI / 180
  const x = (b.longitude - a.longitude) * rad * Math.cos(a.latitude * rad)
  const y = (b.latitude - a.latitude) * rad
  return Math.round(Math.sqrt(x * x + y * y) * 6371000)
}

document.getElementById('find').addEventListener('click', function () {
  const list = document.getElementById('results')
  list.innerHTML = ''
  places
    .map(function (p) { return { name: p.name, metres: distanceMetres(here, p) } })
    .sort(function (a, b) { return a.metres - b.metres })
    .forEach(function (p) {
      const li = document.createElement('li')
      li.textContent = p.name + ': about ' + p.metres + ' m away'
      list.appendChild(li)
    })
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l87-x1',
            exercise: {
              id: 'ex-js-geo-hemisphere',
              instructions:
                'Write `describePosition(position)` where `position` is an object with `latitude` and `longitude` numbers. Return an object `{ hemisphere, side }`: `hemisphere` is `\'north\'` when `latitude` is 0 or greater and `\'south\'` otherwise; `side` is `\'east\'` when `longitude` is 0 or greater and `\'west\'` otherwise. Do not ask for a real position - this function only reads the two numbers it is given.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function describePosition(position) {
  // return { hemisphere: ..., side: ... }
}

console.log(describePosition({ latitude: 51.5, longitude: -0.12 }))
`,
              },
              expectedOutput: '{ hemisphere: \'north\', side: \'west\' }',
              tests: [
                {
                  id: 'ex-js-geo-hemisphere-t1',
                  label: 'The function is defined and returns an object',
                  body: `if (typeof describePosition !== 'function') return 'Define a function called describePosition.'
var result = describePosition({ latitude: 51.5, longitude: -0.12 })
return result !== null && typeof result === 'object'
  ? true
  : 'Return an object with a hemisphere and a side.';`,
                },
                {
                  id: 'ex-js-geo-hemisphere-t2',
                  label: 'North for a positive latitude',
                  body: `if (typeof describePosition !== 'function') return 'Define a function called describePosition.'
return describePosition({ latitude: 51.5, longitude: 10 }).hemisphere === 'north'
  ? true
  : 'A latitude above the equator is north.';`,
                },
                {
                  id: 'ex-js-geo-hemisphere-t3',
                  label: 'South for a negative latitude',
                  body: `if (typeof describePosition !== 'function') return 'Define a function called describePosition.'
return describePosition({ latitude: -33.87, longitude: 151.2 }).hemisphere === 'south'
  ? true
  : 'A negative latitude is south of the equator.';`,
                },
                {
                  id: 'ex-js-geo-hemisphere-t4',
                  label: 'East and west, with zero counted as east',
                  body: `if (typeof describePosition !== 'function') return 'Define a function called describePosition.'
var east = describePosition({ latitude: 0, longitude: 151.2 }).side
var west = describePosition({ latitude: 0, longitude: -0.12 }).side
if (east !== 'east') return 'A longitude of 0 or more is east.'
return west === 'west' ? true : 'A negative longitude is west.';`,
                },
              ],
              hints: [
                'Two ternaries do the whole job: `latitude >= 0 ? \'north\' : \'south\'`.',
                'Build the result first, then return it: `return { hemisphere: ns, side: ew }`.',
                'Check zero against the east branch and the north branch. Zero degrees is not a missing value here - it is the equator and the prime meridian.',
              ],
              solution: {
                javascript: `function describePosition(position) {
  const hemisphere = position.latitude >= 0 ? 'north' : 'south'
  const side = position.longitude >= 0 ? 'east' : 'west'

  return { hemisphere: hemisphere, side: side }
}

console.log(describePosition({ latitude: 51.5, longitude: -0.12 }))
`,
              },
              testNotes:
                'Your function is called directly with fixed numbers, because this sandbox cannot ask for a real position. Nothing checks the surrounding getCurrentPosition call - that part is for a real device over HTTPS.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s75',
      title: 'Geolocation check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s75-q1',
          type: 'multiple-choice',
          prompt: 'A visitor clicks your button and refuses the location prompt. What happens with `getCurrentPosition(success)`?',
          options: [
            'The success callback runs with coordinates of 0, 0',
            'The promise rejects, so a .catch block runs',
            'Neither callback runs and nothing is reported, because no error callback was supplied',
            'The browser throws a ReferenceError inside your page'
          ],
          answer: 2,
          explanation:
            'getCurrentPosition is callback based, not promise based, and a refusal is delivered to the second argument. Leave that argument out and the refusal goes nowhere: no error, no log, and a feature that silently never appears. Always supply both callbacks, and check error.code when the reason matters to the user.',
        },
        {
          id: 'quiz-js-s75-q2',
          type: 'true-false',
          prompt: 'The geolocation API is available to pages served over plain `http://` as well as `https://`.',
          answer: false,
          explanation:
            'It requires a secure origin: HTTPS, with `http://localhost` allowed so development still works. On any other http page `navigator.geolocation` is undefined and the property access itself throws, which reads as a code bug but is really the browser refusing to expose a sensitive API over a channel anyone on the network can read.',
        },
        {
          id: 'quiz-js-s75-q3',
          type: 'blank',
          prompt: 'In the position object, which field gives the radius in metres of the circle around the reported point?',
          answers: ['accuracy', 'coords.accuracy', 'coords.accuracy'],
          explanation:
            '`coords.accuracy` is a radius in metres, not a per-axis error. It tells you how much to trust the fix: sorting places by a 50 metre difference in a reading accurate to 2000 metres is ordering noise.',
        },
        {
          id: 'quiz-js-s75-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const pos = { latitude: -33.87, longitude: 151.21 }
console.log(pos.latitude >= 0 ? 'north' : 'south')`,
          options: ['north', 'south', 'east', 'It throws'],
          answer: 1,
          explanation:
            'Latitude is negative south of the equator, so the test is false and the else branch runs. The same convention applies to longitude: positive is east of the prime meridian. Reading a position as `latitude, longitude` in that order, with north and east positive, is the convention every mapping API uses.',
        },
        {
          id: 'quiz-js-s75-q5',
          type: 'identify-error',
          prompt: 'This feature never shows anything on any browser, and nothing appears in the console. What is the likely cause?',
          code: `navigator.geolocation.getCurrentPosition(function (position) {
  document.getElementById('here').textContent = position.coords.latitude
})`,
          options: [
            'The success callback must be declared with the async keyword',
            'document is not available inside a geolocation callback',
            'The second, error callback is missing, so a refusal is reported nowhere',
            'textContent cannot be set to a number'
          ],
          answer: 2,
          explanation:
            'A refusal is delivered to the error callback, and there is none here, so the user declining produces complete silence - which is exactly the symptom described. The page being served over plain http, so geolocation is undefined, is the other candidate worth checking; it usually throws rather than failing silently.',
        },
      ],
    },
  },
  {
    id: 'js-s76',
    title: 'AJAX',
    description: 'Updating part of a page with data from a server, without reloading it: the idea, the XMLHttpRequest object, sending a request, and reading what comes back.',
    lessons: [
      {
        id: 'js-l88',
        title: 'What AJAX means',
        description: 'The problem AJAX solved, what it means now, and how a request is described in four parts.',
        duration: 4,
        objectives: [
          'Explain why the page used to reload before showing server data',
          'Describe what changes on screen when a page updates in place',
          'Name the four parts of a request'
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'j-l88-b1',
            body: 'Until the middle of the 2000s, getting data from a server meant a new page. You clicked a link, the server built a whole new HTML document, and the browser threw away the page you were on: scroll position, half-filled form, open menu, everything. Every question the page had already loaded was asked again. AJAX changed the shape of that exchange. One piece of a page can now ask the server for one piece of data, and swap that data into the document while the rest of it stays exactly where it was.',
          },
          {
            type: 'demo',
            id: 'j-l88-d1',
            title: 'Rows added without a page load',
            body: 'Press the button and three rows arrive. The table grows, the counter updates, and nothing else on the page flickers, because no navigation happened - the document was never thrown away. `stubServer` stands in for the request so this runs without a server.',
            html: `<button id="load">Load three more rows</button>
<table id="rows">
  <tr><td>Row 1</td></tr>
</table>
<p id="count">Rows: 1</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
table { border-collapse: collapse; margin-top: 0.8rem; }
td { border: 1px solid #d5dae0; padding: 0.35rem 0.9rem; }
#count { color: #55606b; }`,
            javascript: `const rows = document.getElementById('rows')
const count = document.getElementById('count')

// stands in for a request: resolves with the rows a server would send
const stubServer = function (from) {
  return Promise.resolve([
    { label: 'Row ' + (from + 1) },
    { label: 'Row ' + (from + 2) },
    { label: 'Row ' + (from + 3) }
  ])
}

let total = 1

document.getElementById('load').addEventListener('click', function () {
  count.textContent = 'Rows: ' + total + ' (requesting...)'

  stubServer(total).then(function (data) {
    data.forEach(function (row) {
      const tr = document.createElement('tr')
      const td = document.createElement('td')
      td.textContent = row.label
      tr.appendChild(td)
      rows.appendChild(tr)
    })
    total += data.length
    count.textContent = 'Rows: ' + total + ' - the document was never reloaded'
  })
})`,
            height: 230,
          },
          {
            type: 'heading',
            id: 'j-l88-h1',
            level: 3,
            body: 'The name, and what it means now',
          },
          {
            type: 'text',
            id: 'j-l88-b2',
            body: 'AJAX stands for Asynchronous JavaScript and XML. The XML is history: the original technique used `XMLHttpRequest` to fetch an XML document, and the technique got named after the format. Almost nobody transfers XML now. The name stuck because "AJAX" came to mean the *idea* - talk to a server in the background and update part of the page - regardless of the format. Saying "use AJAX" today means "use `fetch`, or `XMLHttpRequest` if you must".',
          },
          {
            type: 'heading',
            id: 'j-l88-h2',
            level: 3,
            body: 'What a request is made of',
          },
          {
            type: 'list',
            id: 'j-l88-l1',
            style: 'bullet',
            items: [
              '**Method** - what you want done: `GET` to read, `POST` to create, `PUT` or `PATCH` to change, `DELETE` to remove.',
              '**URL** - which resource. A path that starts with `/` is same-origin; a full `https://` address is a different origin and is subject to CORS.',
              '**Headers** - metadata: `Content-Type` for the body, `Accept` for what you can handle, `Authorization` for who you are.',
              '**Body** - the data being sent, and only meaningful for methods that carry one. On the wire it is always text.',
            ],
          },
          {
            type: 'code',
            id: 'j-l88-c1',
            language: 'javascript',
            title: 'The same idea, modern spelling',
            code: `// The old spelling
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/posts')
xhr.onload = function () { render(JSON.parse(xhr.responseText)) }
xhr.send()

// The current spelling, and what people mean by AJAX today
const response = await fetch('/api/posts')
if (!response.ok) throw new Error('HTTP ' + response.status)
render(await response.json())`,
          },
          {
            type: 'text',
            id: 'j-l88-b3',
            body: 'Two things about the second version are worth noticing. It is **asynchronous** in the real sense: the request runs alongside the page instead of replacing it, which is what made it a technique rather than a feature. And it is **promise based**, so a failure has somewhere to go. Neither property is decoration - without one of them you are back to blocking the page, and with a callback API that swallows errors you are back to guessing why nothing appeared.',
          },
          {
            type: 'tip',
            id: 'j-l88-t1',
            title: 'Update a container, not the whole page',
            body: 'The point of an in-place update is that the parts the user has already interacted with keep their state. So replace the contents of one container element with freshly built nodes, and leave the rest of the document alone. Setting `document.body.innerHTML` throws away every event listener you attached and every value typed into a form field, which is the same mistake as reloading, just quieter.',
          },
          {
            type: 'exercise',
            id: 'j-l88-x1',
            exercise: {
              id: 'ex-js-ajax-parts',
              instructions:
                'Write `describeRequest(config)` where `config` may contain `method`, `url`, `headers` and `body`. Return an array of the names that are actually present, in the order `method`, `url`, `headers`, `body`. A value counts as present when it is not `undefined` and not `null`. For `{ method: \'GET\', url: \'/api/posts\' }` return `[\'method\', \'url\']`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function describeRequest(config) {
  // return the names of the parts that are present
}

console.log(describeRequest({ method: 'GET', url: '/api/posts' }))
`,
              },
              expectedOutput: "[ 'method', 'url' ]",
              tests: [
                {
                  id: 'ex-js-ajax-parts-t1',
                  label: 'It returns an array of the four part names',
                  body: `if (typeof describeRequest !== 'function') return 'Define a function called describeRequest.'
var parts = describeRequest({ method: 'GET', url: '/api/posts', headers: {}, body: 'x' })
return Array.isArray(parts) && parts.join(',') === 'method,url,headers,body'
  ? true
  : 'Return the names method, url, headers and body, in that order.';`,
                },
                {
                  id: 'ex-js-ajax-parts-t2',
                  label: 'A plain GET lists only method and url',
                  body: `if (typeof describeRequest !== 'function') return 'Define a function called describeRequest.'
var parts = describeRequest({ method: 'GET', url: '/api/posts' })
return Array.isArray(parts) && parts.length === 2 && parts[0] === 'method' && parts[1] === 'url'
  ? true
  : 'A GET with no headers and no body is just a method and a URL.';`,
                },
                {
                  id: 'ex-js-ajax-parts-t3',
                  label: 'A JSON POST lists three parts',
                  body: `if (typeof describeRequest !== 'function') return 'Define a function called describeRequest.'
var parts = describeRequest({ method: 'POST', url: '/api/posts', headers: { 'Content-Type': 'application/json' }, body: '{}' })
return Array.isArray(parts) && parts.length === 3 && parts[2] === 'body'
  ? true
  : 'A POST with a Content-Type header and a body has three parts: method, url, body.';`,
                },
                {
                  id: 'ex-js-ajax-parts-t4',
                  label: 'Undefined and null do not count as present',
                  body: `if (typeof describeRequest !== 'function') return 'Define a function called describeRequest.'
var parts = describeRequest({ method: 'GET', url: '/api/posts', headers: null, body: undefined })
return Array.isArray(parts) && parts.length === 2
  ? true
  : 'A null header object and an undefined body are both absent, not present.';`,
                },
              ],
              hints: [
                'Write out the four names once and check each config value against undefined and null.',
                'An empty string body is present, an empty headers object is present - only null and undefined mean missing.',
                'A small loop keeps it tidy: for each name, `if (config[name] !== undefined && config[name] !== null) parts.push(name)`.',
              ],
              solution: {
                javascript: `function describeRequest(config) {
  const names = ['method', 'url', 'headers', 'body']
  const parts = []

  for (let i = 0; i < names.length; i += 1) {
    const value = config[names[i]]
    if (value !== undefined && value !== null) parts.push(names[i])
  }

  return parts
}

console.log(describeRequest({ method: 'GET', url: '/api/posts' }))
`,
              },
              testNotes:
                'Your function is called directly with plain objects. Nothing here makes a request, because a request would need a server that this sandbox does not have.',
            },
          },
        ],
      },
      {
        id: 'js-l89',
        title: 'The XMLHttpRequest object',
        description: 'What an XMLHttpRequest is, the states it passes through, and which properties tell you where it has got to.',
        duration: 5,
        objectives: [
          'Create an XMLHttpRequest and read readyState, status and responseText',
          'Say what each of the five readyState values means',
          'Explain that responseText is only readable once the request is DONE'
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l89-b1',
            body: '`XMLHttpRequest` is a browser object whose whole job is to make one request and then report on it as it progresses. You create it, you name the request with `open`, you optionally add headers, you call `send`, and from then on the object updates itself while the network does its work. The awkward part, and the source of most bugs with this API, is that progress is reported by **state changes you have to listen for** rather than by a return value.',
          },
          {
            type: 'demo',
            id: 'j-l89-d1',
            title: 'Watching readyState move',
            body: 'The object here is a stand-in with the same properties as a real XMLHttpRequest, so nothing touches the network. Press the buttons in order and watch readyState: 0 when created, 1 after `open`, 2 after `send`. A real object goes on to 3 while the body arrives and ends at 4.',
            html: `<button id="open">open()</button>
<button id="send">send()</button>
<pre id="out">Press the buttons in order.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; margin-right: 0.4rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; min-height: 4.5rem; white-space: pre-wrap; }`,
            javascript: `const out = document.getElementById('out')

// a stand-in for XMLHttpRequest: the same properties, no network
function makeFakeXhr() {
  return {
    readyState: 0,
    status: 0,
    method: '',
    url: '',
    headers: [],
    sent: false,
    open: function (method, url) {
      this.method = method
      this.url = url
      this.readyState = 1
    },
    setRequestHeader: function (name, value) {
      this.headers.push(name + ': ' + value)
    },
    send: function () {
      this.sent = true
      this.readyState = 2
    }
  }
}

const xhr = makeFakeXhr()

function show(label) {
  out.textContent += '\\n' + label + ': readyState ' + xhr.readyState +
    ', method ' + (xhr.method || '(none)') +
    ', url ' + (xhr.url || '(none)') +
    ', sent ' + xhr.sent
}

show('created')
document.getElementById('open').addEventListener('click', function () {
  xhr.open('GET', '/api/posts')
  xhr.setRequestHeader('Accept', 'application/json')
  show('after open')
})
document.getElementById('send').addEventListener('click', function () {
  xhr.send()
  show('after send')
})`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'j-l89-h1',
            level: 3,
            body: 'The five states',
          },
          {
            type: 'list',
            id: 'j-l89-l1',
            style: 'ordered',
            items: [
              '**0 UNOPENED** - constructed, but no request named yet. `open` has not been called.',
              '**1 OPENED** - `open` has been called. The method and URL are set and the headers can now be added.',
              '**2 HEADERS_RECEIVED** - `send` has been called and the server\'s status and response headers have arrived.',
              '**3 LOADING** - the body is still arriving. `responseText` is readable but incomplete, so parsing it here gives you half a document.',
              '**4 DONE** - everything has arrived. This is the only state where the response is worth reading.',
            ],
          },
          {
            type: 'text',
            id: 'j-l89-b2',
            body: 'The naming is `XMLHttpRequest.UNSENT`, `.OPENED`, `.HEADERS_RECEIVED`, `.LOADING` and `.DONE`, and using those constants rather than bare numbers means a reader of your code does not have to look them up. Almost all code only ever cares about 4, and the practical way to detect it is to compare: `if (xhr.readyState === XMLHttpRequest.DONE)`.',
          },
          {
            type: 'warning',
            id: 'j-l89-w1',
            title: 'Reading responseText too early gives you nothing',
            body: 'Before the request is DONE, `responseText` is an empty string. Parse it at state 3 and you will get "Unexpected end of JSON input" on a body that was still arriving, and it will work when you retest it on a fast connection. That is the nastiest class of bug in this API, because it depends on how quickly the server replies. Always gate on the DONE state.',
          },
          {
            type: 'code',
            id: 'j-l89-c1',
            language: 'javascript',
            title: 'Two ways to hear about completion',
            code: `const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/posts')

// event handler style: fires on every state change
xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return
  if (xhr.status >= 200 && xhr.status < 300) {
    render(JSON.parse(xhr.responseText))
  }
}
xhr.send()

// shorter modern equivalents, for when you only care about the end
const xhr2 = new XMLHttpRequest()
xhr2.open('GET', '/api/posts')
xhr2.onload = function () { render(JSON.parse(xhr2.responseText)) }
xhr2.onerror = function () { console.warn('the request failed to complete') }
xhr2.send()`,
          },
          {
            type: 'text',
            id: 'j-l89-b3',
            body: '`onload` is called when the request completes and there is a response to read; `onerror` is called when it never completed at all. That distinction is the one worth keeping: an `onload` handler can still be looking at a 500, and an `onerror` handler will never be, because there is no response. Checking `xhr.status` handles the first case, and `onerror` handles the second.',
          },
          {
            type: 'tip',
            id: 'j-l89-t1',
            title: 'You will not write this by hand in new code',
            body: '`fetch` covers everything in this section in three lines, with real error propagation. Reach for `XMLHttpRequest` when you need to set a header the fetch spec forbids a page from setting, or when you are working with code written before 2015. Reading it still pays, because plenty of libraries and every browser network tab speak it.',
          },
          {
            type: 'exercise',
            id: 'j-l89-x1',
            exercise: {
              id: 'ex-js-xhr-object',
              instructions:
                'Write `createFakeXhr()` returning an object that records what an XMLHttpRequest would have been told. It starts with `readyState: 0`, `status: 0`, `responseText: \'\'`, `headers: []` and `sent: false`. Its `open(method, url)` stores the method and URL on the object and sets `readyState` to 1. Its `setRequestHeader(name, value)` pushes the string `name + \': \' + value` onto `headers`. Its `send(body)` sets `sent` to true, sets `readyState` to 2, and stores `body` in `responseText` if one was given.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function createFakeXhr() {
  return {
    readyState: 0,
    status: 0,
    responseText: '',
    headers: [],
    sent: false
    // add open, setRequestHeader and send here
  }
}

const xhr = createFakeXhr()
xhr.open('GET', '/api/posts')
xhr.send()
console.log(xhr.readyState)
`,
              },
              expectedOutput: '2',
              tests: [
                {
                  id: 'ex-js-xhr-object-t1',
                  label: 'A new object starts unsent, at readyState 0',
                  body: `if (typeof createFakeXhr !== 'function') return 'Define a function called createFakeXhr.'
var xhr = createFakeXhr()
return xhr.readyState === 0 && xhr.sent === false && xhr.responseText === ''
  ? true
  : 'A constructed object has readyState 0, sent false and an empty responseText.';`,
                },
                {
                  id: 'ex-js-xhr-object-t2',
                  label: 'open stores the method and URL and moves to state 1',
                  body: `if (typeof createFakeXhr !== 'function') return 'Define a function called createFakeXhr.'
var xhr = createFakeXhr()
xhr.open('POST', '/api/posts')
return xhr.method === 'POST' && xhr.url === '/api/posts' && xhr.readyState === 1 && xhr.sent === false
  ? true
  : 'open should record method and URL, set readyState to 1, and not send anything.';`,
                },
                {
                  id: 'ex-js-xhr-object-t3',
                  label: 'setRequestHeader collects headers',
                  body: `if (typeof createFakeXhr !== 'function') return 'Define a function called createFakeXhr.'
var xhr = createFakeXhr()
xhr.open('POST', '/api/posts')
xhr.setRequestHeader('Content-Type', 'application/json')
return Array.isArray(xhr.headers) && xhr.headers.length === 1 && xhr.headers[0] === 'Content-Type: application/json'
  ? true
  : 'Push the header as name + \': \' + value onto the headers array.';`,
                },
                {
                  id: 'ex-js-xhr-object-t4',
                  label: 'send marks the request as sent and keeps the body',
                  body: `if (typeof createFakeXhr !== 'function') return 'Define a function called createFakeXhr.'
var xhr = createFakeXhr()
xhr.open('POST', '/api/posts')
xhr.send('{"title":"New post"}')
return xhr.sent === true && xhr.readyState === 2 && xhr.responseText === '{"title":"New post"}'
  ? true
  : 'send should set sent true, move readyState to 2, and put the body in responseText.';`,
                },
              ],
              hints: [
                'Define the three methods inside the object literal, comma separated, after the properties.',
                'Inside `open`, `this` is the object the method was called on, so `this.method = method` works.',
                'For send, only touch responseText when a body actually arrived: `if (body) this.responseText = body`.',
              ],
              solution: {
                javascript: `function createFakeXhr() {
  return {
    readyState: 0,
    status: 0,
    responseText: '',
    headers: [],
    sent: false,

    open: function (method, url) {
      this.method = method
      this.url = url
      this.readyState = 1
    },

    setRequestHeader: function (name, value) {
      this.headers.push(name + ': ' + value)
    },

    send: function (body) {
      this.sent = true
      this.readyState = 2
      if (body) this.responseText = body
    }
  }
}

const xhr = createFakeXhr()
xhr.open('GET', '/api/posts')
xhr.send()
console.log(xhr.readyState)
`,
              },
              testNotes:
                'Your fake object is used instead of a real XMLHttpRequest, so the tests never make a request. They check the state machine: 0 before open, 1 after it, 2 after send.',
            },
          },
        ],
      },
      {
        id: 'js-l90',
        title: 'Sending an AJAX request',
        description: 'Naming a request with open, adding headers, sending a body, and the three things that go wrong on the first POST.',
        duration: 5,
        objectives: [
          'Call open with a method and URL, then send',
          'Add headers with setRequestHeader before send',
          'Serialise an object body and declare its Content-Type'
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l90-b1',
            body: 'Sending a request takes two calls. `open(method, url)` names it - it does not start anything, it only records the intent and moves the object to state 1. `send(body)` starts it. Everything in between is preparation: adding headers, checking a cached copy, setting a timeout. Getting that order wrong is not a style complaint, it is a `TypeError`, because headers cannot be added to a request that has already gone out.',
          },
          {
            type: 'demo',
            id: 'j-l90-d1',
            title: 'What actually goes over the wire',
            body: 'A fake request records every call instead of making one, so you can see the whole sequence. Note that the header is recorded before `send`, and that the body arrives as text. Replace `fakeRequest` with `new XMLHttpRequest()` and add a real URL and the same four lines work unchanged.',
            html: `<button id="get">Send a GET</button>
<button id="post">Send a POST</button>
<pre id="out">Press a button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; margin-right: 0.4rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; min-height: 5rem; white-space: pre-wrap; }`,
            javascript: `const out = document.getElementById('out')

// records the calls instead of making a request
function fakeRequest() {
  const log = []
  return {
    log: log,
    open: function (method, url) { log.push('open ' + method + ' ' + url) },
    setRequestHeader: function (name, value) { log.push('header ' + name + ': ' + value) },
    send: function (body) {
      log.push('send' + (body ? ' with a body of ' + body.length + ' characters' : ' with no body'))
      log.forEach(function (line) { out.textContent += '\\n' + line })
    }
  }
}

function sendGet() {
  const req = fakeRequest()
  req.open('GET', '/api/posts')
  req.send()
}

function sendPost() {
  const req = fakeRequest()
  const newPost = { title: 'New post', body: 'Hello world!', userId: 1 }
  req.open('POST', '/api/posts')
  req.setRequestHeader('Content-Type', 'application/json')
  req.send(JSON.stringify(newPost))
}

document.getElementById('get').addEventListener('click', function () { out.textContent = ''; sendGet() })
document.getElementById('post').addEventListener('click', function () { out.textContent = ''; sendPost() })`,
            height: 260,
          },
          {
            type: 'heading',
            id: 'j-l90-h1',
            level: 3,
            body: 'The three things that break a first POST',
          },
          {
            type: 'list',
            id: 'j-l90-l1',
            style: 'ordered',
            items: [
              '**The body must be a string.** `send({ title: \'New post\' })` puts the text `[object Object]` on the wire, which no server can use. Call `JSON.stringify` on it first.',
              '**The Content-Type header must be set.** Without `application/json` the server has no instruction for reading what arrived, and many APIs reject the request outright rather than guessing.',
              '**The method must actually be POST.** `open` does not remember what you meant. Without the explicit method the request goes as a GET and the body is discarded, which usually looks like the server ignoring you.',
            ],
          },
          {
            type: 'code',
            id: 'j-l90-c1',
            language: 'javascript',
            title: 'A GET and a POST, side by side',
            code: `// read: no body, nothing else to declare
const reader = new XMLHttpRequest()
reader.open('GET', '/api/posts')
reader.onload = function () { render(JSON.parse(reader.responseText)) }
reader.send()

// write: method, headers and a serialised body
const payload = { title: 'New post', body: 'Hello world!', userId: 1 }

const writer = new XMLHttpRequest()
writer.open('POST', '/api/posts')
writer.setRequestHeader('Content-Type', 'application/json')
writer.onload = function () { render(JSON.parse(writer.responseText)) }
writer.send(JSON.stringify(payload))`,
          },
          {
            type: 'text',
            id: 'j-l90-b2',
            body: 'One more detail worth knowing: `send` does not return the data, and it does not block. What comes back later arrives on `onload` or `onreadystatechange`, so any code you write straight after `send` runs *before* the response exists. A `return` after `send` therefore returns `undefined`, which is the single most common reason an AJAX helper seems to work when called directly but returns nothing to its caller.',
          },
          {
            type: 'warning',
            id: 'j-l90-w1',
            title: 'setRequestHeader after send throws',
            body: 'Once the request is away, its headers are final, so `setRequestHeader` throws an `InvalidStateError`. The fix is ordering, not retrying: build every header immediately after `open` and before `send`. It bites hardest in code that sets a header from a variable that might be undefined on an early call, because the failure looks like a random exception rather than an ordering mistake.',
          },
          {
            type: 'tip',
            id: 'j-l90-t1',
            title: 'open takes a third argument you can ignore',
            body: '`open(method, url, async)` takes a third parameter that defaults to `true`. Setting it to `false` is deprecated and unsupported in every current browser, so there is no reason to pass it. What the parameter still describes is the real distinction in this lesson: asynchronous means the page keeps working while the request is in flight, and that is the entire point of the technique.',
          },
          {
            type: 'example',
            id: 'j-l90-e1',
            title: 'Submitting a form as JSON without reloading',
            body: 'The submit event is intercepted, the request is made, and the page is left alone. The fake request resolves a promise instead of going out, so nothing leaves the sandbox; the shape of the code is the part worth copying.',
            html: `<form id="new-post">
  <input id="title" placeholder="Title" value="Hello world">
  <button type="submit">Save</button>
</form>
<pre id="status">Nothing sent yet.</pre>`,
            javascript: `const status = document.getElementById('status')

// a stand-in that records the request and resolves immediately
function stubRequest(method, url, headers, body) {
  return Promise.resolve({
    ok: true,
    status: 200,
    sent: { method: method, url: url, headers: headers, body: body }
  })
}

document.getElementById('new-post').addEventListener('submit', function (event) {
  event.preventDefault()

  const payload = { title: document.getElementById('title').value }
  const request = stubRequest('POST', '/api/posts', { 'Content-Type': 'application/json' }, JSON.stringify(payload))

  request.then(function (response) {
    if (!response.ok) {
      status.textContent = 'HTTP ' + response.status
      return
    }
    status.textContent = 'Sent ' + response.sent.body + ' to ' + response.sent.url + '. The page did not reload.'
  })
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l90-x1',
            exercise: {
              id: 'ex-js-ajax-request',
              instructions:
                'Write `buildRequest(options)` that turns `{ url, body }` into a request description. It returns `{ method, url, headers, body }`. The method is `options.method` or `\'GET\'` when there is none. If `options.body` is present, set `body` to `JSON.stringify(options.body)` and set `headers` to `{ \'Content-Type\': \'application/json\' }`; otherwise `body` is `null` and `headers` is `{}`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function buildRequest(options) {
  // return { method, url, headers, body }
}

console.log(buildRequest({ url: '/api/posts' }))
console.log(buildRequest({ url: '/api/posts', body: { title: 'New post' } }))
`,
              },
              expectedOutput: 'A GET with null body and empty headers, then a POST with a serialised body and a JSON header',
              tests: [
                {
                  id: 'ex-js-ajax-request-t1',
                  label: 'No method means GET',
                  body: `if (typeof buildRequest !== 'function') return 'Define a function called buildRequest.'
var req = buildRequest({ url: '/api/posts' })
return req.method === 'GET'
  ? true
  : 'A request with no method is a GET.';`,
                },
                {
                  id: 'ex-js-ajax-request-t2',
                  label: 'A read has no body and no headers',
                  body: `if (typeof buildRequest !== 'function') return 'Define a function called buildRequest.'
var req = buildRequest({ url: '/api/posts' })
return req.body === null && Object.keys(req.headers).length === 0
  ? true
  : 'A GET with no body should carry body null and empty headers.';`,
                },
                {
                  id: 'ex-js-ajax-request-t3',
                  label: 'An object body is serialised to text',
                  body: `if (typeof buildRequest !== 'function') return 'Define a function called buildRequest.'
var req = buildRequest({ url: '/api/posts', body: { title: 'New post' } })
return req.body === '{"title":"New post"}'
  ? true
  : 'The body must be the JSON text of the object, not the object itself.';`,
                },
                {
                  id: 'ex-js-ajax-request-t4',
                  label: 'A body brings its Content-Type header',
                  body: `if (typeof buildRequest !== 'function') return 'Define a function called buildRequest.'
var req = buildRequest({ url: '/api/posts', body: { title: 'New post' } })
return req.method === 'POST' && req.headers['Content-Type'] === 'application/json'
  ? true
  : 'Sending an object body needs method POST and the application/json header.';`,
                },
              ],
              hints: [
                'Start from the shape of the return value: `return { method: ..., url: options.url, headers: ..., body: ... }`.',
                'One `if (options.body)` is enough - the serialised body and the header are both set inside it.',
                'Use `options.method || \'GET\'` for the default, and `null` rather than an empty string for an absent body.',
              ],
              solution: {
                javascript: `function buildRequest(options) {
  const method = options.method || 'GET'
  let headers = {}
  let body = null

  if (options.body !== undefined && options.body !== null) {
    headers = { 'Content-Type': 'application/json' }
    body = JSON.stringify(options.body)
  }

  return { method: method, url: options.url, headers: headers, body: body }
}

console.log(buildRequest({ url: '/api/posts' }))
console.log(buildRequest({ url: '/api/posts', body: { title: 'New post' } }))
`,
              },
              testNotes:
                'buildRequest is called directly and only produces a description - nothing is transmitted. The tests confirm the three rules a first POST usually breaks: the default method, the serialised body, and the header that explains it.',
            },
          },
        ],
      },
      {
        id: 'js-l91',
        title: 'Handling the response',
        description: 'Reading the status before the body, parsing JSON safely, and telling a failed request from a successful one.',
        duration: 5,
        objectives: [
          'Check the status before parsing the response text',
          'Parse a JSON body and handle the parse failing',
          'Tell a 404 from a request that never completed'
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l91-b1',
            body: 'A completed request has two independent questions to answer. Did it work? That is `xhr.status`, and it is the one people forget. And what did the server send? That is `xhr.responseText`. Answer them in that order. Reading the body first means finding out about a 404 by getting a parse error, and the parse error tells you nothing about what actually went wrong.',
          },
          {
            type: 'demo',
            id: 'j-l91-d1',
            title: 'Status first, body second',
            body: 'The same reading routine handles both buttons. The 200 parses and prints an object; the 500 never reaches `JSON.parse`, so you get a message that names the real problem. That difference is the entire lesson.',
            html: `<button id="ok-btn">Read a 200 response</button>
<button id="bad-btn">Read a 500 response</button>
<pre id="out">Press a button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; margin-right: 0.4rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; min-height: 4.5rem; white-space: pre-wrap; }`,
            javascript: `const out = document.getElementById('out')

// stands in for a completed request
function finished(status, text) {
  return { readyState: 4, status: status, responseText: text }
}

function handle(xhr) {
  if (xhr.readyState !== 4) {
    out.textContent = 'Still working: readyState ' + xhr.readyState
    return
  }

  if (xhr.status < 200 || xhr.status >= 300) {
    out.textContent = 'The server said ' + xhr.status + '. Body:\\n' + xhr.responseText
    return
  }

  try {
    out.textContent = JSON.stringify(JSON.parse(xhr.responseText), null, 2)
  } catch (error) {
    out.textContent = 'Status was fine but the body was not JSON: ' + error.message
  }
}

document.getElementById('ok-btn').addEventListener('click', function () {
  handle(finished(200, '{"title":"Hello world","userId":1}'))
})
document.getElementById('bad-btn').addEventListener('click', function () {
  handle(finished(500, 'Server exploded'))
})`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'j-l91-h1',
            level: 3,
            body: 'Reading the status',
          },
          {
            type: 'code',
            id: 'j-l91-c1',
            language: 'javascript',
            title: 'The order that keeps error messages useful',
            code: `xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return

  if (xhr.status === 0) {
    // 0 means the request never reached a server: offline, DNS, blocked
    show('The request did not complete.')
    return
  }

  if (xhr.status >= 200 && xhr.status < 300) {
    show(JSON.parse(xhr.responseText))
    return
  }

  // 4xx means fix your request, 5xx means fix the server
  show('Failed: ' + xhr.status + ' ' + xhr.statusText)
}`,
          },
          {
            type: 'text',
            id: 'j-l91-b2',
            body: 'A status of `0` is worth its own branch, because it is the one case that is not a server opinion at all: no response arrived. It means the network is down, the host name did not resolve, or the browser blocked the request. Reporting it as "HTTP 0" is technically true and practically useless, so check it before you report anything. The 4xx and 5xx split is worth knowing too: 4xx is a mistake in the request you sent, 5xx is a failure on the server, and telling the user which of the two occurred saves them checking whether they did something wrong.',
          },
          {
            type: 'heading',
            id: 'j-l91-h2',
            level: 3,
            body: 'responseText and responseXML',
          },
          {
            type: 'text',
            id: 'j-l91-b3',
            body: '`responseText` is always a string, whatever the server sent. `responseXML` is a parsed document, and it is empty unless the response carries an `application/xml` or `text/xml` content type - which is the second reason XML died as a transport: you had to be sure the server labelled its answer correctly. For anything JSON, `JSON.parse(xhr.responseText)` is the whole story, and for anything not JSON you were reading a string all along.',
          },
          {
            type: 'warning',
            id: 'j-l91-w1',
            title: 'An empty body is not valid JSON',
            body: '`JSON.parse(\'\')` throws a SyntaxError, as does `JSON.parse(\'No content\')` - and a 204 response is supposed to have no body at all. So the empty string is a case your parser must handle before it ever calls JSON.parse, otherwise a perfectly successful request looks like a broken one. Check `xhr.responseText` for content, and only then parse it.',
          },
          {
            type: 'tip',
            id: 'j-l91-t1',
            title: 'Wrap the parse, not just the request',
            body: 'A try/catch around the whole handler is the practical shape. A request can succeed at the network level and still hand you something unparseable: a proxy error page, a login redirect to an HTML login page, a truncated body. Catching around `JSON.parse` converts all three into one honest message instead of an exception that stops the update dead.',
          },
          {
            type: 'exercise',
            id: 'j-l91-x1',
            exercise: {
              id: 'ex-js-ajax-response',
              instructions:
                'Write `interpretResponse(xhr)` where `xhr` is a plain object with `readyState`, `status` and `responseText`. Return the string `\'pending\'` when `readyState` is not 4. Return `\'failed \' + status` when the status is 0, or below 200, or 300 or above. Return `\'empty body\'` when `responseText` is blank. Otherwise return `JSON.stringify(JSON.parse(responseText))`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function interpretResponse(xhr) {
  // pending, failed, empty body, or the payload as text
}

console.log(interpretResponse({ readyState: 4, status: 200, responseText: '{"ok":true}' }))
`,
              },
              expectedOutput: 'It returns pending, failed 500, empty body, or the payload as text',
              tests: [
                {
                  id: 'ex-js-ajax-response-t1',
                  label: 'An unfinished request reports pending',
                  body: `if (typeof interpretResponse !== 'function') return 'Define a function called interpretResponse.'
return interpretResponse({ readyState: 2, status: 0, responseText: '' }) === 'pending'
  ? true
  : 'Anything below readyState 4 is still in progress.';`,
                },
                {
                  id: 'ex-js-ajax-response-t2',
                  label: 'A 500 reports failure without parsing',
                  body: `if (typeof interpretResponse !== 'function') return 'Define a function called interpretResponse.'
return interpretResponse({ readyState: 4, status: 500, responseText: 'Server exploded' }) === 'failed 500'
  ? true
  : 'Return "failed " + status for a status outside 200 to 299.';`,
                },
                {
                  id: 'ex-js-ajax-response-t3',
                  label: 'A 404 is a failure too',
                  body: `if (typeof interpretResponse !== 'function') return 'Define a function called interpretResponse.'
return interpretResponse({ readyState: 4, status: 404, responseText: 'Not found' }) === 'failed 404'
  ? true
  : 'A 404 never reaches the parser, because the body is an error page.';`,
                },
                {
                  id: 'ex-js-ajax-response-t4',
                  label: 'A good response returns its payload as text',
                  body: `if (typeof interpretResponse !== 'function') return 'Define a function called interpretResponse.'
var result = interpretResponse({ readyState: 4, status: 200, responseText: '{"id":7}' })
return result === '{"id":7}'
  ? true
  : 'Parse the body, then hand the object back as a string with JSON.stringify.';`,
                },
              ],
              hints: [
                'Four early returns in this order: state, status, blank text, then the parse.',
                'A blank body is `if (!xhr.responseText.trim()) return \'empty body\'`.',
                'For the last branch: `return JSON.stringify(JSON.parse(xhr.responseText))` hands back the payload as text.',
              ],
              solution: {
                javascript: `function interpretResponse(xhr) {
  if (xhr.readyState !== 4) return 'pending'
  if (xhr.status === 0 || xhr.status < 200 || xhr.status >= 300) {
    return 'failed ' + xhr.status
  }
  if (!xhr.responseText.trim()) return 'empty body'

  return JSON.stringify(JSON.parse(xhr.responseText))
}

console.log(interpretResponse({ readyState: 4, status: 200, responseText: '{"ok":true}' }))
`,
              },
              testNotes:
                'The tests hand your function a plain object instead of a real request, so nothing is sent. They check the order of the branches, which is the part that produces useful error messages.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s76',
      title: 'AJAX check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s76-q1',
          type: 'multiple-choice',
          prompt: 'What does AJAX mean today, given that almost nobody transfers XML any more?',
          options: [
            'A markup format for describing a request and a response together',
            'Talking to a server in the background and updating part of the page in place',
            'The specific XMLHttpRequest API, and nothing else',
            'A way of compressing page data before it is sent'
          ],
          answer: 1,
          explanation:
            'The X in the original name came from XML documents, and the technique outlived the format. What survived is the idea: a request runs alongside the page, and only the region that needs new data is rebuilt. You can do it with fetch, with XMLHttpRequest, or with a library wrapping either.',
        },
        {
          id: 'quiz-js-s76-q2',
          type: 'true-false',
          prompt: 'Reading `xhr.responseText` as soon as `readyState` is 3 is safe, because the body is nearly all there by then.',
          answer: false,
          explanation:
            'State 3 means the body is still arriving, so the text you read is truncated. Parsing it gives a confusing "Unexpected end of JSON input" that disappears on a fast connection, which is what makes it such a bad bug. Only state 4, DONE, means the response is complete.',
        },
        {
          id: 'quiz-js-s76-q3',
          type: 'blank',
          prompt: 'Which numeric `readyState` value means the request has finished and the response is complete?',
          answers: ['4', '4 (done)', 'done'],
          explanation:
            'It is 4, and the named constant is XMLHttpRequest.DONE. The full ladder is 0 UNOPENED, 1 OPENED, 2 HEADERS_RECEIVED, 3 LOADING, 4 DONE. Using the constant instead of the number means nobody has to remember which is which.',
        },
        {
          id: 'quiz-js-s76-q4',
          type: 'identify-error',
          prompt: 'On a fast machine this works. On a slow connection it throws "Unexpected end of JSON input". Why?',
          code: `xhr.onreadystatechange = function () {
  if (xhr.readyState === 3) {
    render(JSON.parse(xhr.responseText))
  }
}`,
          options: [
            'JSON.parse cannot be used inside an event handler',
            'readyState 3 means the body is still arriving, so the text is incomplete',
            'readyState 3 means the request failed, so the text is an error page',
            'render must be called after send, not before'
          ],
          answer: 1,
          explanation:
            'State 3 is LOADING. Whatever has arrived so far is in responseText, and it grows as the rest comes in. Gate on state 4 instead, or use onload, which fires only once the body is complete.',
        },
        {
          id: 'quiz-js-s76-q5',
          type: 'code-output',
          prompt: 'What is logged?',
          code: `const xhr = new XMLHttpRequest()
xhr.open('GET', '/api/posts')
console.log(xhr.readyState, xhr.sent)`,
          options: [
            '1 false',
            '0 false',
            '4 true',
            'It throws, because open needs a callback'
          ],
          answer: 0,
          explanation:
            'open names the request and moves the object to OPENED, so readyState is 1, and nothing has gone over the wire yet, so sent is false. Calling open with a method and a URL is enough; the third argument is only for asynchronous behaviour and defaults to true.',
        },
      ],
    },
  },
  {
    id: 'js-s77',
    title: 'AJAX applications',
    description: 'Parsing an XML response in the browser, and the shape of a page that updates itself in place instead of reloading.',
    lessons: [
      {
        id: 'js-l92',
        title: 'Working with XML data',
        description: 'Reading an XML response with DOMParser, walking the nodes, and why JSON replaced it almost everywhere.',
        duration: 5,
        objectives: [
          'Parse an XML string into a document with DOMParser',
          'Read values out of the parsed nodes with getElementsByTagName',
          'Explain why JSON replaced XML as the format for AJAX responses'
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l92-b1',
            body: 'XML is what AJAX was named after, and you will still meet it in older APIs, sitemap files, RSS feeds, Office documents and SVG. The browser can parse it for you without a library: hand a string to `DOMParser` and you get a document back, which you then walk the same way you walk an HTML page. The whole API is three methods and a loop.',
          },
          {
            type: 'demo',
            id: 'j-l92-d1',
            title: 'Parsing XML, and what happens when it is broken',
            body: 'The good button parses a well-formed document and prints its titles. The broken button sends a document with an unclosed tag, and the parser reports it rather than guessing. That error branch is the reason the parser is worth using at all: `innerHTML` on a broken string silently gives you a half-built page, while this tells you exactly where it stopped.',
            html: `<button id="good">Parse valid XML</button>
<button id="bad">Parse broken XML</button>
<pre id="out">Press a button.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.45rem 0.7rem; margin-right: 0.4rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
pre { margin-top: 0.8rem; padding: 0.7rem; background: #f4f6f8; border-radius: 6px; min-height: 4rem; white-space: pre-wrap; }`,
            javascript: `const out = document.getElementById('out')

const sample = '<posts>' +
  '<post><title>First post</title><views>12</views></post>' +
  '<post><title>Second post</title><views>7</views></post>' +
  '</posts>'

function readTitles(text) {
  const doc = new DOMParser().parseFromString(text, 'application/xml')

  if (doc.getElementsByTagName('parsererror').length > 0) {
    return 'The XML was not well formed.'
  }

  const nodes = doc.getElementsByTagName('title')
  const values = []
  for (let i = 0; i < nodes.length; i += 1) values.push(nodes[i].textContent)
  return values
}

document.getElementById('good').addEventListener('click', function () {
  out.textContent = readTitles(sample).join('\\n')
})

document.getElementById('bad').addEventListener('click', function () {
  out.textContent = readTitles('<posts><post><title>Broken</posts>')
})`,
            height: 240,
          },
          {
            type: 'heading',
            id: 'j-l92-h1',
            level: 3,
            body: 'The three methods that do it',
          },
          {
            type: 'code',
            id: 'j-l92-c1',
            language: 'javascript',
            title: 'From a string to a list of values',
            code: `const doc = new DOMParser().parseFromString(xmlText, 'application/xml')

// an XML document reports its own syntax errors in a parsererror element
if (doc.getElementsByTagName('parsererror').length > 0) {
  return []
}

// a live list, so index with a loop rather than treating it as an array
const nodes = doc.getElementsByTagName('item')
const titles = []

for (let i = 0; i < nodes.length; i += 1) {
  titles.push(nodes[i].textContent)
}`,
          },
          {
            type: 'text',
            id: 'j-l92-b2',
            body: 'Two details catch people out. The second argument of `parseFromString` is the **content type**, and you should pass `\'application/xml\'` rather than `\'text/html\'`: with the HTML parser, a browser will happily accept malformed input and hand you a document built out of guesses, which is exactly what you did not ask for. And `getElementsByTagName` returns a live list, not an array - it has no `map`, `filter` or `forEach`, so it goes in a `for` loop or gets converted with `Array.from`.',
          },
          {
            type: 'list',
            id: 'j-l92-l1',
            style: 'bullet',
            items: [
              '**`getElementsByTagName(name)`** - every matching element, live. Matches any depth, so nested `<title>` elements are all returned.',
              '**`querySelector(\'item\')`** - the first match, and the only way to reach an attribute: `doc.querySelector(\'item id\')` does not work, `doc.querySelector(\'item\').getAttribute(\'id\')` does.',
              '**`textContent`** - the text of a node, including whitespace. There is no `innerText` on an XML node, because there is no layout.',
              '**`getAttribute(name)`** - an attribute value, always a string, or null when it is absent.',
              '**`Array.from(nodes)`** - the shortest route from the live list to something with `map` and `filter`.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l92-w1',
            title: 'Always check for parsererror',
            body: 'Malformed XML does not throw. The parser returns a document containing a `parsererror` element, and if you walk straight to `getElementsByTagName` you get an empty list and conclude the feed had no items. That is a real bug you will spend an afternoon on, because empty results look like correct results. Check for it first, once, in the one function that parses.',
          },
          {
            type: 'tip',
            id: 'j-l92-t1',
            title: 'Why JSON won',
            body: 'JSON is a subset of JavaScript syntax, so `JSON.parse` produces objects you can use immediately, with no node walking at all. XML tags repeat the name of every field, which is fine for a document and wasteful for data, and its nesting rules are strict in ways that break the moment a value contains an ampersand. XML survives where a document is the point: feeds, sitemaps, SVG. For structured data, JSON is the default.',
          },
          {
            type: 'exercise',
            id: 'j-l92-x1',
            exercise: {
              id: 'ex-js-xml-titles',
              instructions:
                'Write `parseTitles(xmlText)` that parses an XML string with `DOMParser` and returns an array of the text of every `<title>` element, in document order. If the XML is not well formed, or contains no `<title>` element, return an empty array instead of failing.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function parseTitles(xmlText) {
  // parse, check for parsererror, collect the title values
}

console.log(parseTitles('<posts><post><title>First</title></post></posts>'))
`,
              },
              expectedOutput: "[ 'First' ]",
              tests: [
                {
                  id: 'ex-js-xml-titles-t1',
                  label: 'It returns an array of the title values',
                  body: `if (typeof parseTitles !== 'function') return 'Define a function called parseTitles.'
var result = parseTitles('<posts><post><title>First</title></post></posts>')
return Array.isArray(result) && result.length === 1 && result[0] === 'First'
  ? true
  : 'Expect an array holding the text of every title element.';`,
                },
                {
                  id: 'ex-js-xml-titles-t2',
                  label: 'It collects every title, in document order',
                  body: `if (typeof parseTitles !== 'function') return 'Define a function called parseTitles.'
var result = parseTitles('<posts><post><title>First</title></post><post><title>Second</title></post></posts>')
return Array.isArray(result) && result.length === 2 && result[1] === 'Second'
  ? true
  : 'Both titles must be collected, and the second one must stay second.';`,
                },
                {
                  id: 'ex-js-xml-titles-t3',
                  label: 'A document with no titles gives an empty array',
                  body: `if (typeof parseTitles !== 'function') return 'Define a function called parseTitles.'
var result = parseTitles('<posts><post><views>12</views></post></posts>')
return Array.isArray(result) && result.length === 0
  ? true
  : 'No title elements means an empty array.';`,
                },
                {
                  id: 'ex-js-xml-titles-t4',
                  label: 'Broken XML returns an empty array rather than failing',
                  body: `if (typeof parseTitles !== 'function') return 'Define a function called parseTitles.'
var result
try {
  result = parseTitles('<posts><post><title>Broken</posts>')
} catch (error) {
  return 'parseTitles should not fail on malformed XML. Return an empty array instead.'
}
return Array.isArray(result) && result.length === 0
  ? true
  : 'Malformed XML must come back as an empty array.';`,
                },
              ],
              hints: [
                '`new DOMParser().parseFromString(xmlText, \'application/xml\')` gives you a document.',
                'Look for a parsererror element first: `if (doc.getElementsByTagName(\'parsererror\').length > 0) return []`.',
                '`getElementsByTagName` returns a live list with no map, so push the text into a normal array in a for loop.',
              ],
              solution: {
                javascript: `function parseTitles(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml')

  if (doc.getElementsByTagName('parsererror').length > 0) return []

  const nodes = doc.getElementsByTagName('title')
  const titles = []

  for (let i = 0; i < nodes.length; i += 1) {
    titles.push(nodes[i].textContent)
  }

  return titles
}

console.log(parseTitles('<posts><post><title>First</title></post></posts>'))
`,
              },
              testNotes:
                'Your function is called directly with XML strings, so nothing is fetched. The tests cover the well-formed cases and check that malformed input degrades to an empty array instead of throwing.',
            },
          },
        ],
      },
      {
        id: 'js-l93',
        title: 'AJAX in a real page',
        description: 'The three states every in-place update has - loading, loaded, failed - and the rules that keep the page in one of them.',
        duration: 6,
        objectives: [
          'Replace the contents of one container instead of rebuilding the page',
          'Show a loading state, a loaded state and a failed state',
          'Keep the request tied to what the user is looking at now'
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l93-b1',
            body: 'A page that updates itself in place has three states, not two. There is the moment before the answer arrives, the moment it has arrived, and the moment it never will. Code that handles only the second one produces a page where pressing a button appears to do nothing, because the list does not change and no message explains why. Show all three and the page tells the truth about itself.',
          },
          {
            type: 'demo',
            id: 'j-l93-d1',
            title: 'A list that filters in place',
            body: 'Type into the box and the list is rebuilt from the matching titles, without a page load. The status line below is the loading state, and the simulated failure is there so you can see what the third state looks like. No request is made: the data is a local array, but the update, the loading line and the failure line are exactly what a real one needs.',
            html: `<input id="search" placeholder="Type to filter">
<button id="break">Simulate a failure</button>
<ul id="titles"></ul>
<p id="status">Showing all 5 titles.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
input { padding: 0.4rem 0.5rem; border: 1px solid #c9d0d8; border-radius: 6px; }
button { padding: 0.45rem 0.7rem; margin-left: 0.4rem; border-radius: 6px; border: 1px solid #c9d0d8; cursor: pointer; }
ul { padding-left: 1.1rem; }
#status { color: #55606b; }`,
            javascript: `const list = document.getElementById('titles')
const status = document.getElementById('status')
const all = ['Arrays', 'Fetch', 'Functions', 'Geolocation', 'Web workers']
let shouldFail = false

// stands in for a request that takes a moment and can fail
function fakeRequest(term) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (shouldFail) reject(new Error('HTTP 500'))
      else resolve(all.filter(function (t) { return t.toLowerCase().indexOf(term.toLowerCase()) > -1 }))
    }, 300)
  })
}

function render(items) {
  list.innerHTML = ''
  items.forEach(function (title) {
    const li = document.createElement('li')
    li.textContent = title
    list.appendChild(li)
  })
}

function search() {
  const term = document.getElementById('search').value
  status.textContent = 'Loading...'
  list.setAttribute('aria-busy', 'true')

  fakeRequest(term)
    .then(function (items) {
      render(items)
      status.textContent = 'Showing ' + items.length + ' of ' + all.length + ' titles.'
    })
    .catch(function (error) {
      status.textContent = 'Could not load titles: ' + error.message
    })
    .then(function () {
      list.removeAttribute('aria-busy')
    })
}

document.getElementById('search').addEventListener('input', search)
document.getElementById('break').addEventListener('click', function () {
  shouldFail = !shouldFail
  search()
})`,
            height: 280,
          },
          {
            type: 'heading',
            id: 'j-l93-h1',
            level: 3,
            body: 'Rules for updating in place',
          },
          {
            type: 'list',
            id: 'j-l93-l1',
            style: 'ordered',
            items: [
              '**Empty the container, do not replace it.** Set `container.innerHTML = \'\'` and append fresh nodes. Replacing the container element itself destroys every listener attached to it.',
              '**Build nodes and set text.** Create an element, set `textContent`, append it. Assigning a string built from data is how markup injection gets in.',
              '**Say what is happening.** While the request is in flight, say so; when it fails, say that instead of leaving the old content looking current.',
              '**Only apply a result that is still wanted.** If the user can type again, remember which request you started and ignore anything that comes back after a newer one.',
              '**Mark the busy region.** `aria-busy` tells assistive technology the region is updating, and it costs one attribute.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l93-w1',
            title: 'The out-of-order response',
            body: 'Fire a request per keystroke and two will be in flight. Nothing guarantees they come back in order, so a slow early request can land after a fast later one and overwrite the newer results with older ones - the list flickers back to what you had before you typed. Fix it by tagging each request with a counter and dropping any answer whose number is not the latest, or by aborting the previous request with an AbortController.',
          },
          {
            type: 'code',
            id: 'j-l93-c1',
            language: 'javascript',
            title: 'One container, three states, no stale answers',
            code: `const container = document.querySelector('#results')
const status = document.querySelector('#status')
let latest = 0

async function refresh(query) {
  const mine = ++latest
  status.textContent = 'Loading...'
  container.setAttribute('aria-busy', 'true')

  try {
    const response = await fetch('/api/search?q=' + encodeURIComponent(query))
    if (!response.ok) throw new Error('HTTP ' + response.status)
    const data = await response.json()

    // a newer request has already started, so this answer is out of date
    if (mine !== latest) return

    container.innerHTML = ''
    for (const item of data) {
      const li = document.createElement('li')
      li.textContent = item.title
      container.appendChild(li)
    }
    status.textContent = data.length + ' results'
  } catch (error) {
    if (mine !== latest) return
    status.textContent = 'Could not load results: ' + error.message
  } finally {
    if (mine === latest) container.removeAttribute('aria-busy')
  }
}`,
          },
          {
            type: 'text',
            id: 'j-l93-b2',
            body: 'Notice that every write to the page happens inside the branch that knows the request succeeded. The stale check runs before the render and again before the error message, so an abandoned request cannot overwrite the newer status either. That is the whole difference between a search box that occasionally shows the wrong thing and one that never does.',
          },
          {
            type: 'tip',
            id: 'j-l93-t1',
            title: 'Keep the URL honest',
            body: 'When an in-place update changes what the page is showing, update the address bar too with `history.replaceState`. It makes a filtered list linkable, keeps the back button meaningful, and costs one line. What you must not do is push a history entry per keystroke, which fills the back stack with every intermediate letter typed.',
          },
          {
            type: 'example',
            id: 'j-l93-e1',
            title: 'A save button that reports what happened',
            body: 'The smallest complete AJAX interaction: act, say it is happening, say what came back, and say when it failed. Everything else in this lesson is the same four lines with more detail in the middle.',
            html: `<button id="save">Save changes</button>
<p id="feedback" role="status">No changes saved yet.</p>`,
            javascript: `const feedback = document.getElementById('feedback')

// stands in for the real request
function stubSave(payload) {
  return Promise.resolve({ ok: true, saved: payload })
}

document.getElementById('save').addEventListener('click', function () {
  const button = document.getElementById('save')
  button.disabled = true
  feedback.textContent = 'Saving...'

  stubSave({ title: 'Edited title' })
    .then(function (response) {
      if (!response.ok) throw new Error('HTTP ' + response.status)
      feedback.textContent = 'Saved: ' + response.saved.title
    })
    .catch(function (error) {
      feedback.textContent = 'Could not save: ' + error.message
    })
    .then(function () {
      button.disabled = false
    })
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l93-x1',
            exercise: {
              id: 'ex-js-ajax-render',
              instructions:
                'Write `renderPosts(posts)` that fills the `<ul id="post-list">` on the page. It must empty the list first, then append one `<li>` per post whose `textContent` is the post title, and return the number of items it appended. Given `[{ title: \'First\' }, { title: \'Second\' }]` it should render two items and return 2.',
              languages: ['javascript'],
              starterCode: {
                javascript: `function renderPosts(posts) {
  // find #post-list, empty it, append one li per post, return the count
}

console.log(renderPosts([{ title: 'First' }, { title: 'Second' }]))
`,
              },
              expectedOutput: '2, with two list items titled First and Second',
              tests: [
                {
                  id: 'ex-js-ajax-render-t1',
                  label: 'It appends one list item per post',
                  body: `var list = document.querySelector('#post-list')
if (!list) return 'Add a ul with id post-list.'
var count = renderPosts([{ title: 'First' }, { title: 'Second' }])
return list.querySelectorAll('li').length === 2
  ? true
  : 'The list should hold one li for each post.';`,
                },
                {
                  id: 'ex-js-ajax-render-t2',
                  label: 'Each item shows the post title',
                  body: `var list = document.querySelector('#post-list')
if (!list) return 'Add a ul with id post-list.'
renderPosts([{ title: 'First' }, { title: 'Second' }])
var items = list.querySelectorAll('li')
return items[0].textContent === 'First' && items[1].textContent === 'Second'
  ? true
  : 'Set each li textContent to the post title.';`,
                },
                {
                  id: 'ex-js-ajax-render-t3',
                  label: 'It empties the list before rendering',
                  body: `var list = document.querySelector('#post-list')
if (!list) return 'Add a ul with id post-list.'
renderPosts([{ title: 'First' }, { title: 'Second' }])
renderPosts([{ title: 'Only one' }])
return list.querySelectorAll('li').length === 1
  ? true
  : 'The second render must clear the items from the first.';`,
                },
                {
                  id: 'ex-js-ajax-render-t4',
                  label: 'It returns the number of items rendered',
                  body: `var list = document.querySelector('#post-list')
if (!list) return 'Add a ul with id post-list.'
var count = renderPosts([{ title: 'A' }, { title: 'B' }, { title: 'C' }])
return count === 3
  ? true
  : 'Return how many items you appended, so the caller can update a status line.';`,
                },
              ],
              hints: [
                'Start with `const list = document.querySelector(\'#post-list\')`, then `list.innerHTML = \'\'` to empty it.',
                'In the loop: create the li, set `li.textContent = post.title`, then `list.appendChild(li)`.',
                'Keep a counter as you go, or render first and then return `list.children.length`.',
              ],
              solution: {
                javascript: `function renderPosts(posts) {
  const list = document.querySelector('#post-list')
  list.innerHTML = ''

  for (let i = 0; i < posts.length; i += 1) {
    const li = document.createElement('li')
    li.textContent = posts[i].title
    list.appendChild(li)
  }

  return list.children.length
}

console.log(renderPosts([{ title: 'First' }, { title: 'Second' }]))
`,
              },
              testNotes:
                'The tests render into a real list on the page and inspect the resulting elements, so they check the empty-then-append behaviour rather than only the returned count. No request is made - the posts are passed in as data.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s77',
      title: 'AJAX applications check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s77-q1',
          type: 'multiple-choice',
          prompt: 'Why did JSON replace XML as the format for most AJAX responses?',
          options: [
            'JSON is smaller, so responses arrive faster',
            'JSON.parse produces objects you can use immediately, with no node walking or namespace rules',
            'XML cannot be sent over HTTP',
            'Browsers refuse to parse XML for security reasons'
          ],
          answer: 1,
          explanation:
            'JSON is a subset of JavaScript syntax, so a parsed response is already an object with properties you can read. XML needs a parser, a walk and an escape for every special character in a value. XML survives where a document rather than a record is the point: feeds, sitemaps, SVG.',
        },
        {
          id: 'quiz-js-s77-q2',
          type: 'true-false',
          prompt: 'Setting `container.innerHTML = ""` and then appending new items is a safe way to update part of a page in place.',
          answer: true,
          explanation:
            'As long as the container element itself is kept, the listeners attached to it survive and the rest of the page is untouched. What destroys listeners is replacing the container element itself, or assigning to document.body.innerHTML, which throws away the whole page you were trying to update.',
        },
        {
          id: 'quiz-js-s77-q3',
          type: 'blank',
          prompt: 'Which built-in object parses an XML string into a document, with no library?',
          answers: ['domparser', 'new domparser()'],
          explanation:
            '`new DOMParser().parseFromString(text, "application/xml")` is the whole story. Pass the XML content type, not text/html, or the browser will accept broken input and hand you a document built out of guesses instead of reporting a parsererror.',
        },
        {
          id: 'quiz-js-s77-q4',
          type: 'code-output',
          prompt: 'What does this log?',
          code: `const doc = new DOMParser().parseFromString('<a><b>one</b></a>', 'application/xml')
console.log(doc.getElementsByTagName('b')[0].textContent)`,
          options: ['one', '<b>one</b>', 'undefined', 'It throws, because an XML node has no textContent'],
          answer: 0,
          explanation:
            'The live list from getElementsByTagName holds the one matching element, and its textContent is the text inside it. Note that there is no innerText on an XML node - there is no layout - and that the same method returns every matching element at any depth, so nested tags come back together.',
        },
        {
          id: 'quiz-js-s77-q5',
          type: 'identify-error',
          prompt: 'Typing quickly in a search box sometimes shows results for a word the box no longer contains. Why?',
          code: `search.addEventListener('input', function () {
  fetch('/api/search?q=' + search.value)
    .then(function (r) { return r.json() })
    .then(function (data) {
      container.innerHTML = ''
      data.forEach(function (item) {
        container.innerHTML += '<li>' + item.title + '</li>'
      })
    })
})`,
          options: [
            'The listener fires twice per keystroke on some browsers',
            'fetch does not send the value of the input when it is read in the handler',
            'Responses can arrive out of order, so a slow earlier request overwrites the newer result',
            'innerHTML cannot be assigned inside a then block'
          ],
          answer: 2,
          explanation:
            'Nothing orders the responses, so a slow request started two keystrokes ago can land after the newest one and overwrite it. Number the requests and drop any answer that is not the latest, or abort the previous request. The string-building on the last line is a second problem: it re-parses the whole list on every item and would execute markup that came from the server.',
        },
      ],
    },
  },
]