import type { Section } from '~/types/content'

export const jsBomApisSections: Section[] = [
  {
    id: 'js-s66',
    title: 'History',
    description:
      'The stack of pages behind the current one, how to read where you sit in it, and how to move through it without reloading the document.',
    lessons: [
      {
        id: 'js-l78',
        title: 'History',
        description:
          'history.length, history.state, pushState and popstate: what the session history is, and why the state object beats stuffing data into the URL.',
        duration: 6,
        objectives: [
          'Read history.length and history.state and say what each one counts',
          'Add an entry with pushState without triggering a page load',
          'Handle Back and Forward with the popstate event',
          'Explain why a real page load is still the wrong answer for a small view change',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l78',
          title: 'History quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l78-q1',
              type: 'multiple-choice',
              prompt: 'What does history.length actually count?',
              options: [
                'Every entry the current tab has pushed, across all same-origin pages in that tab',
                'The number of entries on the current page only',
                'The number of times the current page has been reloaded',
                'The number of URLs in your bookmarks for this site',
              ],
              answer: 0,
              explanation: 'The session history belongs to the tab, not the page. A single-page app that pushes an entry on every filter change is exactly why the number gets large, and it is why Back can take twenty clicks to leave a site.',
            },
            {
              id: 'quiz-js-l78-q2',
              type: 'true-false',
              prompt: 'Calling history.pushState loads the new URL and fires a page load.',
              answer: false,
              explanation: 'pushState only adds an entry and rewrites the address bar. No request is made, no document is parsed, and neither load nor hashchange fires. Nothing renders until you listen for popstate and draw it yourself.',
            },
            {
              id: 'quiz-js-l78-q3',
              type: 'blank',
              prompt: 'Which event fires when the user presses Back after you have used pushState?',
              answers: [
                'popstate',
              ],
              explanation: 'popstate fires for Back and Forward across same-document entries, and its event.state is the object you passed to the entry now being shown.',
            },
            {
              id: 'quiz-js-l78-q4',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'history.pushState({ page: 2 }, \'\', \'?page=2\')\nconsole.log(history.state.page)',
              options: [
                '2',
                'null',
                'undefined',
                '?page=2',
              ],
              answer: 0,
              explanation: 'The first argument is stored on the entry and handed back by history.state. The third argument is only what the address bar shows — a string, not data.',
            },
            {
              id: 'quiz-js-l78-q5',
              type: 'identify-error',
              prompt: 'A developer calls pushState and listens for nothing. What happens when the user presses Back?',
              code: 'history.pushState({ page: 2 }, \'\', \'/page-2\')\n// no popstate listener anywhere',
              options: [
                'The address bar returns to the previous URL but the page still shows the old content, because nothing re-rendered it',
                'The browser restores the previous page from its cache',
                'The entry is removed automatically, as if pushState had never been called',
                'A SecurityError is reported in the console',
              ],
              answer: 0,
              explanation: 'The entry is still there and the URL still changes. Only your own listener can move the content, which is the whole reason popstate exists.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l78-b1',
            body: 'Every tab has a **session history**: an ordered list of the documents it has visited, plus a pointer to the one being shown right now. `history` is the only way JavaScript gets at that list. It is a queue, not a record of what you did — every same-origin page push in the same tab contributes an entry, which is why a heavy session can leave you with a `history.length` of 47 on a single-URL app.',
          },
          {
            type: 'demo',
            id: 'j-l78-d1',
            title: 'A history stack you can drive',
            body: 'The left card shows what the real page reports. The right card is a stand-in session history, because genuinely changing the address bar inside a lesson would break the lesson. Press push and back and watch the pointer move while the stack keeps every entry.',
            html: `<div class="row">
  <div class="card">
    <h3>This page, for real</h3>
    <p id="real">reading…</p>
  </div>
  <div class="card">
    <h3>A simulated session</h3>
    <p id="view">Start</p>
    <p>
      <button id="push" type="button">push a page</button>
      <button id="back" type="button">back</button>
    </p>
  </div>
</div>`,
            css: `.row { display: flex; gap: 1rem; flex-wrap: wrap; }
.card { flex: 1 1 220px; border: 1px solid #d5dae0; border-radius: 10px; padding: 0.9rem; font-size: 14px; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.card p { margin: 0 0 0.6rem; }
#view { font-family: ui-monospace, monospace; background: #f4f6f8; padding: 0.5rem; border-radius: 6px; }
button { font: inherit; padding: 0.35rem 0.6rem; margin-right: 0.4rem; border: 1px solid #c7ced6; background: #fff; border-radius: 6px; cursor: pointer; }`,
            javascript: `const stack = ['Start']
let index = 0
const view = document.querySelector('#view')

function render() {
  const names = stack.map(function (name, i) {
    return (i === index ? '[' + name + ']' : name)
  })
  view.textContent = names.join(' > ')
  document.querySelector('#real').textContent =
    'history.length = ' + history.length + ' / history.state = ' + JSON.stringify(history.state)
}

document.querySelector('#push').addEventListener('click', function () {
  stack.splice(index + 1)
  stack.push('Page ' + stack.length)
  index = stack.length - 1
  render()
})
document.querySelector('#back').addEventListener('click', function () {
  if (index > 0) index = index - 1
  render()
})
render()`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'j-l78-h1',
            level: 3,
            body: 'What the object actually holds',
          },
          {
            type: 'text',
            id: 'j-l78-b2',
            body: 'Three properties carry almost all of the useful information. `history.length` is the size of the stack. `history.state` is whatever object the current entry was given when it was created. `history.scrollRestoration` decides whether the browser restores the scroll position when you come back. There is no `history.current` and no way to ask which URL is in front of you — the browser deliberately hides the other entries, so the only handle on a previous entry is the state object you stored.',
          },
          {
            type: 'code',
            id: 'j-l78-c1',
            language: 'javascript',
            title: 'Reading it',
            code: `history.length          // how many entries this tab has
history.state           // the state object of the current entry, or null
history.scrollRestoration  // 'auto' or 'manual'`,
          },
          {
            type: 'list',
            id: 'j-l78-l1',
            style: 'bullet',
            items: [
              '**back()** and **forward()** step one entry, exactly as the browser buttons do.',
              '**go(n)** steps n entries: `go(1)` is forward, `go(-1)` is back, `go(0)` reloads the current entry.',
              '**pushState(state, title, url)** adds a new entry and changes the address bar without loading anything.',
              '**replaceState(state, title, url)** overwrites the current entry instead of adding one — the right choice for scroll positions and filter state that should not fill the Back stack with twenty nearly identical entries.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l78-h2',
            level: 3,
            body: 'Changing the view without reloading',
          },
          {
            type: 'text',
            id: 'j-l78-b3',
            body: 'A single-page app still has to look like several pages: the URL has to change, Back has to work, and a reload has to land somewhere sensible. `pushState` solves the first two. The important part is the **first argument** — a plain object you attach to the entry and read back later. Without it you would have to keep your own map from URL to data, and a reload or a shared link would land on a page that knows nothing about what the URL says.',
          },
          {
            type: 'code',
            id: 'j-l78-c2',
            language: 'javascript',
            title: 'pushState and the popstate event',
            code: `function showPage(name) {
  history.pushState({ page: name }, '', '/app/' + name)
  render(name)
}

document.querySelector('#next').addEventListener('click', function () {
  showPage('settings')
})

window.addEventListener('popstate', function (event) {
  // event.state is the object we stored on the entry we are now leaving back to
  render(event.state ? event.state.page : 'home')
})`,
          },
          {
            type: 'warning',
            id: 'j-l78-w1',
            title: 'pushState does not load anything',
            body: 'The commonest bug in this area is calling `pushState` and expecting the page behind it to come back. Nothing fetches, nothing renders, and no `load` or `hashchange` event fires — you have to listen for `popstate` and re-render yourself. `pushState` also throws a `SecurityError` on some `file://` origins, so a history-based app that works over a local server can fail when opened straight off the disk.',
          },
          {
            type: 'warning',
            id: 'j-l78-w2',
            title: 'history.state is not a safe place for anything secret',
            body: 'Everything in a state object is readable by any script on the page and is visible in the entry itself — do not put a token, a password or a card number in it. It is also stringified when the browser restores a session after a restart, so anything non-serialisable (a function, a `Map`, a `Date` as a live object) comes back changed or missing. Keep the state to identifiers and let the app re-fetch the data.',
          },
          {
            type: 'tip',
            id: 'j-l78-t1',
            title: 'push or replace?',
            body: 'If Back should undo the change, use `pushState`. If the change is a detail of the current page — a panel opened, a scroll offset, a sort order — use `replaceState`, so the Back button still leaves the page rather than walking the user back through forty identical screens.',
          },
          {
            type: 'exercise',
            id: 'j-l78-x1',
            exercise: {
              id: 'ex-js-history-stack',
              instructions:
                'Build a stand-in session history. When `#push` is clicked, add a new entry named "Page 1", then "Page 2" and so on, and make it the current entry. Anything after the current entry is discarded first, exactly as a real browser does when you go back and then navigate somewhere new. `#view` must contain the name of the current entry and nothing else, and `#log` must hold one `<li>` per entry, oldest first. When `#back` is clicked, move the current entry one step back but keep every entry in `#log`; the first entry is named "Start" and the pointer must never go before it.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<button id="push" type="button">push a page</button>
<button id="back" type="button">back</button>
<p id="view">Start</p>
<ol id="log"></ol>`,
                javascript: `const stack = ['Start']
let index = 0

const view = document.querySelector('#view')
const log = document.querySelector('#log')

function render() {
  // fill #view with stack[index] and #log with one li per entry
}

document.querySelector('#push').addEventListener('click', function () {
  // drop anything after the current entry, then add "Page " + (number of new entries)
})

document.querySelector('#back').addEventListener('click', function () {
  // step back one entry, but never past Start
})
`,
              },
              expectedOutput: 'Page 1',
              tests: [
                {
                  id: 'ex-js-history-stack-t1',
                  label: 'One push makes the current entry read Page 1',
                  body: `var push = document.querySelector('#push')
var view = document.querySelector('#view')
if (!push || !view) return 'Keep the #push button and the #view element.'
if (view.textContent.trim() !== 'Start') return 'The demo needs to start on Start before anything is pushed.'
push.click()
return view.textContent.trim() === 'Page 1' ? true : 'After one push the view should read exactly: Page 1'`,
                },
                {
                  id: 'ex-js-history-stack-t2',
                  label: 'Three pushes leave four entries with Page 3 current',
                  body: `var push = document.querySelector('#push')
var view = document.querySelector('#view')
var log = document.querySelector('#log')
if (!push || !view || !log) return 'Keep the #push, #view and #log elements.'
for (var i = 0; i < 8 && view.textContent.trim() !== 'Page 3'; i++) push.click()
var items = log.querySelectorAll('li')
return items.length === 4 && view.textContent.trim() === 'Page 3'
  ? true
  : 'Three pushes should leave 4 entries in #log (Start plus three pages) and Page 3 current, found ' + items.length + ' entries.'`,
                },
                {
                  id: 'ex-js-history-stack-t3',
                  label: 'Back from Page 3 lands on Page 2',
                  body: `var push = document.querySelector('#push')
var back = document.querySelector('#back')
var view = document.querySelector('#view')
if (!push || !back || !view) return 'Keep the #push, #back and #view elements.'
for (var i = 0; i < 8 && view.textContent.trim() !== 'Page 3'; i++) push.click()
back.click()
return view.textContent.trim() === 'Page 2'
  ? true
  : 'Back should move one entry, so the view should read Page 2, it reads ' + view.textContent.trim() + '.'`,
                },
                {
                  id: 'ex-js-history-stack-t4',
                  label: 'Back walks to Start without deleting entries',
                  body: `var push = document.querySelector('#push')
var back = document.querySelector('#back')
var view = document.querySelector('#view')
var log = document.querySelector('#log')
if (!push || !back || !view || !log) return 'Keep the #push, #back, #view and #log elements.'
for (var i = 0; i < 8 && view.textContent.trim() !== 'Page 3'; i++) push.click()
var before = log.querySelectorAll('li').length
for (var j = 0; j < 8 && view.textContent.trim() !== 'Start'; j++) back.click()
return view.textContent.trim() === 'Start' && log.querySelectorAll('li').length === before
  ? true
  : 'Back moves the pointer, it does not delete entries: the view must return to Start and #log must still hold all ' + before + ' entries.'`,
                },
              ],
              hints: [
                'Track two things: the array of names, and the index of the current one. Everything else is a write into the page.',
                'On push, `stack.splice(index + 1)` throws away everything after the current entry, then `stack.push("Page " + stack.length)` adds the new name and you set `index = stack.length - 1`.',
                'Render once in a `render()` function: `view.textContent = stack[index]`, and rebuild `#log` with `replaceChildren()` and one `createElement("li")` per entry.',
              ],
              solution: {
                html: `<button id="push" type="button">push a page</button>
<button id="back" type="button">back</button>
<p id="view">Start</p>
<ol id="log"></ol>`,
                javascript: `const stack = ['Start']
let index = 0

const view = document.querySelector('#view')
const log = document.querySelector('#log')

function render() {
  view.textContent = stack[index]
  log.replaceChildren()
  stack.forEach(function (name) {
    const item = document.createElement('li')
    item.textContent = name
    log.append(item)
  })
}

document.querySelector('#push').addEventListener('click', function () {
  stack.splice(index + 1)
  stack.push('Page ' + stack.length)
  index = stack.length - 1
  render()
})

document.querySelector('#back').addEventListener('click', function () {
  if (index > 0) index = index - 1
  render()
})

render()`,
              },
              testNotes:
                'The tests click the buttons for you, so they are testing your handler rather than your markup. Test 4 is the one worth reading twice: a real browser never deletes an entry when you go back, it only moves the pointer.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'js-s67',
    title: 'Navigator',
    description:
      'What the browser will tell you about itself and the person using it, and how much of that is worth reading.',
    lessons: [
      {
        id: 'js-l79',
        title: 'Navigator',
        description:
          'navigator.userAgent, language, onLine, hardwareConcurrency and the rest: reading the browser report, and knowing which parts of it are promises rather than facts.',
        duration: 5,
        objectives: [
          'Read the common navigator properties and what each one actually reports',
          'React to connectivity with navigator.onLine and the online and offline events',
          'Explain why userAgent is a weak feature test and what to use instead',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-js-l79',
          title: 'Navigator quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l79-q1',
              type: 'multiple-choice',
              prompt: 'What is navigator.userAgent?',
              options: [
                'A string describing the browser and platform',
                'A unique identifier that stays constant for one visitor',
                'The width of the browser window in pixels',
                'A promise that resolves once the page has loaded',
              ],
              answer: 0,
              explanation: 'It is a descriptive string about the browser build and platform. It is not an identity: it describes the software, not the person, which is exactly why it has been reduced and frozen by browsers.',
            },
            {
              id: 'quiz-js-l79-q2',
              type: 'true-false',
              prompt: 'navigator.onLine can be trusted to tell you whether a server is actually reachable.',
              answer: false,
              explanation: 'It reports whether the machine has a network interface. A captive portal, a dead router or a stale DNS cache all leave it reporting true, so it is fine for a hint and useless as a health check.',
            },
            {
              id: 'quiz-js-l79-q3',
              type: 'blank',
              prompt: 'Which navigator property reports how many logical CPU cores the browser may use?',
              answers: [
                'hardwareconcurrency',
                'navigator.hardwareconcurrency',
              ],
              explanation: 'hardwareConcurrency is a practical hint for how much work to hand to a web worker, and it is capped by the browser rather than being a raw count of the silicon.',
            },
            {
              id: 'quiz-js-l79-q4',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'console.log(typeof navigator.onLine)',
              options: [
                'boolean',
                'string',
                'number',
                'undefined',
              ],
              answer: 0,
              explanation: 'It is a live boolean, and the online and offline events are how you find out when it changes. Reading it once at the start of your script is not enough on its own.',
            },
            {
              id: 'quiz-js-l79-q5',
              type: 'identify-error',
              prompt: 'What is the real problem with branching the layout on the user agent string?',
              code: 'if (navigator.userAgent.indexOf(\'Mobile\') > -1) {\n  showDesktopLayout()\n}',
              options: [
                'The string can be frozen, spoofed or reduced, so it is an unreliable test of the thing you actually care about',
                'indexOf does not exist on strings',
                'userAgent is undefined in every browser',
                'It fails only when the page is served over http',
              ],
              answer: 0,
              explanation: 'The string format is not a contract. Test the feature instead: matchMedia("(pointer: coarse)") for a touch device, or the presence of the API or CSS you are about to use.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l79-b1',
            body: '`navigator` is the browser reporting on itself: the environment your code happens to be running in, plus a few details about the device. Most of it is read-only, most of it is advisory, and a surprising amount of it is a privacy liability. Read the value, act on it, and never treat it as a fact about the hardware.',
          },
          {
            type: 'demo',
            id: 'j-l79-d1',
            title: 'What this browser reports',
            body: 'Every line below is read live from the navigator object, so the values are whatever this machine reports. The last line also updates by itself if the connection drops and comes back, because `onLine` is a live flag rather than a snapshot.',
            html: `<ul id="out"></ul>
<p id="net">…</p>`,
            css: `#out { margin: 0 0 0.75rem; padding-left: 1.1rem; font-size: 13.5px; }
#out li { margin: 0.15rem 0; word-break: break-word; }
#net { font-weight: 600; margin: 0; }`,
            javascript: `const rows = [
  ['userAgent', navigator.userAgent],
  ['language', navigator.language],
  ['languages', (navigator.languages || []).join(', ')],
  ['platform', navigator.platform],
  ['hardwareConcurrency', navigator.hardwareConcurrency],
  ['maxTouchPoints', navigator.maxTouchPoints],
  ['cookieEnabled', navigator.cookieEnabled]
]

const list = document.querySelector('#out')
rows.forEach(function (row) {
  const item = document.createElement('li')
  item.textContent = row[0] + ': ' + row[1]
  list.append(item)
})

const net = document.querySelector('#net')
function show() { net.textContent = navigator.onLine ? 'Connection: online' : 'Connection: offline' }
window.addEventListener('online', show)
window.addEventListener('offline', show)
show()`,
            height: 240,
          },
          {
            type: 'heading',
            id: 'j-l79-h1',
            level: 3,
            body: 'The properties worth knowing',
          },
          {
            type: 'code',
            id: 'j-l79-c1',
            language: 'javascript',
            title: 'The report',
            code: `navigator.userAgent        // a string naming the browser and platform
navigator.language        // the UI language, e.g. 'en-GB'
navigator.languages       // the user's ordered list of preferred languages
navigator.onLine          // true or false, updated live
navigator.platform        // the platform name, e.g. 'Win32'
navigator.hardwareConcurrency   // how many logical cores are available
navigator.maxTouchPoints  // 0 for a mouse-only device, more for a touchscreen
navigator.clipboard       // the Clipboard API, if the browser allows it
navigator.geolocation     // the Geolocation API, always asking permission first`,
          },
          {
            type: 'text',
            id: 'j-l79-b2',
            body: '`navigator.languages` is the more useful of the two language properties: it is an ordered preference list, so you can pick the first one you actually have content for instead of assuming the first entry matches every visitor. `hardwareConcurrency` is a decent hint for how much work to hand to a worker. `onLine` tells you the browser believes it has a network interface, which is not the same as your server being reachable — see the warning below.',
          },
          {
            type: 'list',
            id: 'j-l79-l1',
            style: 'bullet',
            items: [
              '**Check, do not configure.** If a capability is missing the API is simply not there, so test with `if (navigator.clipboard)` before using it rather than wrapping the call.',
              '**Permissions are separate.** `navigator.geolocation`, `clipboard` and `notifications` all prompt, and all of them can be denied permanently for the origin.',
              '**Secure context only.** Several of these, including clipboard and service workers, refuse to exist on plain http and on `file://`.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l79-h2',
            level: 3,
            body: 'Reacting to the connection',
          },
          {
            type: 'code',
            id: 'j-l79-c2',
            language: 'javascript',
            title: 'online and offline',
            code: `function paint() {
  banner.hidden = navigator.onLine
}

window.addEventListener('online', paint)
window.addEventListener('offline', paint)
paint()   // the events only fire on a change, so read the flag once at the start`,
          },
          {
            type: 'warning',
            id: 'j-l79-w1',
            title: 'onLine is not a health check',
            body: '`navigator.onLine` reports whether the machine has a network interface, nothing more. A hotel wifi captive portal, a dead router with a cached DNS entry, or a cable unplugged a second ago can all leave it reporting `true`. It is fine for showing a "you appear to be offline" hint, and useless for deciding whether to attempt a request. Attempt the request and handle the failure — that is the only reliable signal.',
          },
          {
            type: 'warning',
            id: 'j-l79-w2',
            title: 'userAgent is a string, not a feature',
            body: 'Matching on `navigator.userAgent` breaks without warning: browsers freeze the string, spoof it, or replace it with a reduced one, and every workaround becomes a rule you have to maintain forever. It also uniquely identifies the visitor, which is why browsers are reducing it. Test for what you need instead — `window.matchMedia("(pointer: coarse)")` for a touch device, `CSS.supports("display", "grid")` for layout support, and `"serviceWorker" in navigator` for offline support.',
          },
          {
            type: 'tip',
            id: 'j-l79-t1',
            title: 'Use it to adapt, not to block',
            body: 'The right use of navigator is to make the experience better for the common case: fewer items on the list when there are few cores, an offline banner when the connection drops, the tap target size on a touchscreen. The wrong use is to refuse to work because a string did not match.',
          },
          {
            type: 'exercise',
            id: 'j-l79-x1',
            exercise: {
              id: 'ex-js-navigator-report',
              instructions:
                'Build a small capability report into `#out`. Append one `<li>` for each of four facts, in this order: the UI language from navigator.language, the platform from navigator.platform, the number of cores from navigator.hardwareConcurrency, and the connection. The first three lines read "label: value" where the label is the capitalised property name without the navigator prefix, for example "Language: en-GB". The fourth line reads exactly "Online: yes" when navigator.onLine is true and "Online: no" when it is false.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<ul id="out"></ul>`,
                javascript: `const out = document.querySelector('#out')

function add(label, value) {
  const item = document.createElement('li')
  item.textContent = label + ': ' + value
  out.append(item)
}

// four lines: language, platform, cores, connection
`,
              },
              expectedOutput: 'Language: en-GB',
              tests: [
                {
                  id: 'ex-js-navigator-report-t1',
                  label: 'The list holds exactly four lines',
                  body: `var out = document.querySelector('#out')
if (!out) return 'Keep the #out list from the starter HTML.'
var items = out.querySelectorAll('li')
return items.length === 4 ? true : 'Expected 4 lines in the report, found ' + items.length + '.'`,
                },
                {
                  id: 'ex-js-navigator-report-t2',
                  label: 'The first line reports navigator.language',
                  body: `var out = document.querySelector('#out')
if (!out) return 'Keep the #out list.'
var first = out.querySelector('li')
return first && first.textContent.indexOf(navigator.language) >= 0
  ? true
  : 'The first line should contain the value of navigator.language, which is ' + navigator.language + '.'`,
                },
                {
                  id: 'ex-js-navigator-report-t3',
                  label: 'A line reports the core count',
                  body: `var out = document.querySelector('#out')
if (!out) return 'Keep the #out list.'
var cores = String(navigator.hardwareConcurrency)
var found = false
Array.prototype.forEach.call(out.querySelectorAll('li'), function (li) {
  if (li.textContent.indexOf(cores) >= 0) found = true
})
return found ? true : 'One line should report navigator.hardwareConcurrency, which is ' + cores + '.'`,
                },
                {
                  id: 'ex-js-navigator-report-t4',
                  label: 'The last line says Online: yes or Online: no',
                  body: `var out = document.querySelector('#out')
if (!out) return 'Keep the #out list.'
var want = navigator.onLine ? 'Online: yes' : 'Online: no'
var items = out.querySelectorAll('li')
var last = items[items.length - 1]
return last && last.textContent.trim() === want
  ? true
  : 'The last line should read exactly "' + want + '".'`,
                },
              ],
              hints: [
                'One helper that creates the li and appends it keeps this to four short lines.',
                'Build the label from the property name: "Language", "Platform", "Cores". The value comes straight off the navigator object.',
                'The connection line is a ternary on navigator.onLine: `add("Online", navigator.onLine ? "yes" : "no")` gives exactly the text the test expects.',
              ],
              solution: {
                html: `<ul id="out"></ul>`,
                javascript: `const out = document.querySelector('#out')

function add(label, value) {
  const item = document.createElement('li')
  item.textContent = label + ': ' + value
  out.append(item)
}

add('Language', navigator.language)
add('Platform', navigator.platform)
add('Cores', navigator.hardwareConcurrency)
add('Online', navigator.onLine ? 'yes' : 'no')`,
              },
              testNotes:
                'The tests read the real navigator object, so they are checking the wiring rather than a fixed string. The values will differ on your machine, and the tests are written to expect that.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'js-s68',
    title: 'Popups',
    description:
      'Opening a second window on purpose, what the browser will and will not allow, and the two lines of defence that keep a new page away from yours.',
    lessons: [
      {
        id: 'js-l80',
        title: 'Popups',
        description:
          'window.open and its features string, why most popups are blocked, how to check the return value, and why noopener is not optional.',
        duration: 5,
        objectives: [
          'Call window.open with a features string and read the return value',
          'Explain when a popup is blocked and how to make it survive',
          'Pass noopener so the opened page cannot reach back into yours',
          'Report the window and screen measurements that decide a popup size',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-js-l80',
          title: 'Popups quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l80-q1',
              type: 'multiple-choice',
              prompt: 'What does window.open return when a popup blocker stops the window?',
              options: [
                'null',
                'undefined',
                'an empty window object',
                'the URL it was about to load',
              ],
              answer: 0,
              explanation: 'It returns null, so every use of the result needs a guard. Calling a method on the result without checking is the crash you will meet otherwise.',
            },
            {
              id: 'quiz-js-l80-q2',
              type: 'true-false',
              prompt: 'A window.open call inside a page load event handler works reliably in every current browser.',
              answer: false,
              explanation: 'Blockers key on user activation, so a load-time call has none and is blocked. Some blockers then treat the whole origin as suspicious and block the popup you actually wanted.',
            },
            {
              id: 'quiz-js-l80-q3',
              type: 'blank',
              prompt: 'Which features string value stops the opened page getting a window.opener reference back to your page?',
              answers: [
                'noopener',
              ],
              explanation: 'noopener is the direct answer. noreferrer also implies it in current browsers, and it additionally drops the Referer header, which is its own reason to use it.',
            },
            {
              id: 'quiz-js-l80-q4',
              type: 'code-output',
              prompt: 'With a popup blocker active, what reaches the console?',
              code: 'var win = window.open(\'about:blank\', \'_blank\', \'width=400\')\nif (win) {\n  win.close()\n} else {\n  console.log(\'blocked\')\n}',
              options: [
                'blocked',
                'nothing is logged',
                'an error is reported',
                '400',
              ],
              answer: 0,
              explanation: 'The blocked call gives null, so the else branch is the one that runs. The point of the check is that the user is told, rather than the app carrying on as if a window existed.',
            },
            {
              id: 'quiz-js-l80-q5',
              type: 'identify-error',
              prompt: 'What is the risk in this line?',
              code: 'window.open(\'https://example.com/report\', \'_blank\')',
              options: [
                'The page that opens gets window.opener and can navigate or redirect the page that opened it',
                'The URL is malformed because it is not encoded',
                'It always opens a full window instead of a tab',
                'It cannot open an https page from an http page',
              ],
              answer: 0,
              explanation: 'That is tabnabbing. The fix is a third argument of "noopener", and the same rel="noopener" on any link in your own markup that uses target="_blank".',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l80-b1',
            body: '`window.open` asks the browser for another window or tab. It takes three parts: the URL, a **target** that decides whether it becomes a named window or a new tab, and a comma-separated **features string** such as `"width=480,height=360,menubar=no"`. Because the feature string is a string and not an object, every value is a string too, and a browser is free to ignore any feature it dislikes — especially on a phone, where a popup is nearly always just a tab.',
          },
          {
            type: 'demo',
            id: 'j-l80-d1',
            title: 'Measuring, and the features string you would pass',
            body: 'The numbers are this window, read live. The lower half builds the features string you would hand to `window.open` without opening anything — a real popup in a lesson is exactly the sort of thing that gets blocked, or worse, succeeds and leaves a stray window behind. Change the width and height and watch the string update.',
            html: `<p id="screen">reading…</p>
<p>
  <label>Width <input id="w" type="number" value="480" min="200" max="1200"></label>
  <label>Height <input id="h" type="number" value="360" min="150" max="900"></label>
</p>
<pre id="out">width=480,height=360,menubar=no,toolbar=no</pre>`,
            css: `#screen { margin: 0 0 0.6rem; font-size: 13.5px; white-space: pre-line; }
label { margin-right: 0.9rem; font-size: 13.5px; }
input { width: 5rem; font: inherit; padding: 0.2rem 0.3rem; }
pre { margin: 0.6rem 0 0; padding: 0.6rem; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const w = document.querySelector('#w')
const h = document.querySelector('#h')

function draw() {
  document.querySelector('#screen').textContent =
    'window.inner: ' + window.innerWidth + ' x ' + window.innerHeight +
    ' / window.outer: ' + window.outerWidth + ' x ' + window.outerHeight +
    ' / screen.avail: ' + screen.availWidth + ' x ' + screen.availHeight
  document.querySelector('#out').textContent =
    'width=' + w.value + ',height=' + h.value + ',menubar=no,toolbar=no,scrollbars=yes'
}

w.addEventListener('input', draw)
h.addEventListener('input', draw)
draw()`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'j-l80-h1',
            level: 3,
            body: 'The return value is the whole game',
          },
          {
            type: 'text',
            id: 'j-l80-b2',
            body: '`window.open` hands back a reference to the new window, or `null` if nothing opened. The two things that produce `null` are a blocker and a target the browser will not honour. That is why the habit to build from day one is to check the result before touching it — calling a method on `null` throws, and the error lands far away from the line that caused it.',
          },
          {
            type: 'code',
            id: 'j-l80-c1',
            language: 'javascript',
            title: 'open, check, use',
            code: `const win = window.open('', '_blank', 'width=480,height=360')
if (!win) {
  console.log('The popup was blocked.')
} else {
  win.document.title = 'Preview'
  win.document.body.textContent = 'Hello from the opener.'
  win.focus()
}`,
          },
          {
            type: 'list',
            id: 'j-l80-l1',
            style: 'bullet',
            items: [
              "**`'_blank'`** asks for a new context, usually a tab. A **named target** such as `'preview'` reuses an existing window with that name, which is how a single preview panel is kept alive across clicks.",
              "**`'noopener'`** gives the new page no `window.opener` reference back to yours, so it cannot navigate or redirect the page that opened it.",
              "**`'noreferrer'`** sends no `Referer` header and, in current browsers, implies `noopener` as well.",
              "**`'popup'`** is a hint to open a real window rather than a tab. It is widely ignored on mobile and is better treated as a request than a promise.",
            ],
          },
          {
            type: 'heading',
            id: 'j-l80-h2',
            level: 3,
            body: 'Why blockers exist',
          },
          {
            type: 'code',
            id: 'j-l80-c2',
            language: 'javascript',
            title: 'A popup that survives',
            code: `button.addEventListener('click', function () {
  const win = window.open('https://example.com/report', '_blank', 'noopener')
  if (!win) {
    // a blocker decided for us; do not retry in a loop
    showMessage('Your browser blocked the new window.')
  }
})`,
          },
          {
            type: 'warning',
            id: 'j-l80-w1',
            title: 'Never open a window outside a user action',
            body: 'Blockers key on user activation: a real click, a key press, a tap. A `window.open` in a `load` handler, a `setTimeout`, or the bottom of a script is treated as unsolicited and is blocked in every current browser. Worse, some blockers then flag the whole origin, so the popup that mattered later gets blocked too. The fix is never a retry loop — it is to move the call inside the click handler and tell the user when it did not work.',
          },
          {
            type: 'warning',
            id: 'j-l80-w2',
            title: 'opener is a hole back into your page',
            body: "By default the opened page gets `window.opener`, a live handle to the window that opened it. A page you do not control can use it to navigate your tab to something else — the classic tabnabbing attack — and it can read your `location` on the way. `window.open(url, '_blank', 'noopener')` closes that handle, and any link with `target=\"_blank\"` in your own markup needs `rel=\"noopener\"` for the same reason.",
          },
          {
            type: 'tip',
            id: 'j-l80-t1',
            title: 'A tab is nearly always the right answer',
            body: 'Popups have been in bad shape for a long time: mobile browsers turn them into tabs, blockers stop them unpredictably, and they confuse everyone using a screen reader. A tab, or a dialog rendered in the page, is easier to build and easier to close. Reach for `window.open` when the user has to work in the new window while the first stays put — a print preview, a map, a document to read beside a form.',
          },
          {
            type: 'exercise',
            id: 'j-l80-x1',
            exercise: {
              id: 'ex-js-popup-features',
              instructions:
                'Build the features string you would pass to window.open, without opening anything. When `#go` is clicked, read the numbers out of `#w` and `#h` and write into `#out` a string built in this exact shape: width=480,height=360,menubar=no,toolbar=no,scrollbars=yes — using the current values of the two inputs rather than fixed numbers. Nothing may be written until the button is clicked.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<label>Width <input id="w" type="number" value="480"></label>
<label>Height <input id="h" type="number" value="360"></label>
<button id="go" type="button">Build features</button>
<code id="out"></code>`,
                javascript: `const button = document.querySelector('#go')

button.addEventListener('click', function () {
  const w = document.querySelector('#w')
  const h = document.querySelector('#h')
  // build the string and put it in #out
})`,
              },
              expectedOutput: 'width=480,height=360,menubar=no,toolbar=no,scrollbars=yes',
              tests: [
                {
                  id: 'ex-js-popup-features-t1',
                  label: 'Clicking builds a string containing the width',
                  body: `var w = document.querySelector('#w')
var h = document.querySelector('#h')
var out = document.querySelector('#out')
if (!w || !h || !out) return 'Keep the #w, #h and #out elements.'
w.value = '480'
h.value = '360'
document.querySelector('#go').click()
return out.textContent.indexOf('width=480') >= 0
  ? true
  : 'The features string should include width=480, it reads: ' + out.textContent`,
                },
                {
                  id: 'ex-js-popup-features-t2',
                  label: 'The string contains the height',
                  body: `var w = document.querySelector('#w')
var h = document.querySelector('#h')
var out = document.querySelector('#out')
if (!w || !h || !out) return 'Keep the #w, #h and #out elements.'
w.value = '480'
h.value = '360'
document.querySelector('#go').click()
return out.textContent.indexOf('height=360') >= 0
  ? true
  : 'The features string should include height=360, it reads: ' + out.textContent`,
                },
                {
                  id: 'ex-js-popup-features-t3',
                  label: 'The chrome is turned off in the string',
                  body: `var out = document.querySelector('#out')
if (!out) return 'Keep the #out element.'
document.querySelector('#go').click()
var text = out.textContent
return text.indexOf('menubar=no') >= 0 && text.indexOf('toolbar=no') >= 0 && text.indexOf('scrollbars=yes') >= 0
  ? true
  : 'Include menubar=no, toolbar=no and scrollbars=yes in the features string, it reads: ' + text`,
                },
                {
                  id: 'ex-js-popup-features-t4',
                  label: 'New input values produce a new string',
                  body: `var w = document.querySelector('#w')
var h = document.querySelector('#h')
var out = document.querySelector('#out')
if (!w || !h || !out) return 'Keep the #w, #h and #out elements.'
w.value = '640'
h.value = '480'
document.querySelector('#go').click()
return out.textContent.indexOf('width=640') >= 0 && out.textContent.indexOf('height=480') >= 0
  ? true
  : 'Read the input values inside the click handler, not once when the page loads.'`,
                },
              ],
              hints: [
                'Read the inputs inside the click handler. Reading them once at the top of the script freezes the values from load time.',
                'The string is just pieces joined together: "width=" + w.value + ",height=" + h.value and then the fixed tail.',
                'The full shape is: width=480,height=360,menubar=no,toolbar=no,scrollbars=yes — commas, no spaces, no trailing comma.',
              ],
              solution: {
                html: `<label>Width <input id="w" type="number" value="480"></label>
<label>Height <input id="h" type="number" value="360"></label>
<button id="go" type="button">Build features</button>
<code id="out"></code>`,
                javascript: `const button = document.querySelector('#go')
const out = document.querySelector('#out')

button.addEventListener('click', function () {
  const w = document.querySelector('#w')
  const h = document.querySelector('#h')
  out.textContent =
    'width=' + w.value +
    ',height=' + h.value +
    ',menubar=no,toolbar=no,scrollbars=yes'
})`,
              },
              testNotes:
                'No window is ever opened. The tests check the string you would have passed, which is the part you actually control.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'js-s69',
    title: 'Timing',
    description:
      'Running code later, running it over and over, and running it once per painted frame instead of once per guessed millisecond.',
    lessons: [
      {
        id: 'js-l81',
        title: 'Timing and animation frames',
        description:
          'setTimeout, setInterval and requestAnimationFrame: what each one really schedules, how to cancel them, and why animation belongs on the frame callback.',
        duration: 7,
        objectives: [
          'Explain that a timer queues a task rather than pausing anything',
          'Start and cancel a repeating timer with setInterval and clearInterval',
          'Drive an animation with requestAnimationFrame and the timestamp it hands you',
          'Cancel an animation with cancelAnimationFrame instead of leaving it running',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-js-l81',
          title: 'Timing and animation frames quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l81-q1',
              type: 'multiple-choice',
              prompt: 'Which function should redraw an animation so it stays in step with the display?',
              options: [
                'requestAnimationFrame',
                'setTimeout at 16ms',
                'setInterval at 16ms',
                'Date.now in a while loop',
              ],
              answer: 0,
              explanation: 'The frame callback is scheduled for the display itself, and it stops costing anything when the tab is hidden. A timer runs on its own clock whether or not anything was painted.',
            },
            {
              id: 'quiz-js-l81-q2',
              type: 'true-false',
              prompt: 'setTimeout(fn, 0) runs fn straight away, before the rest of the current code.',
              answer: false,
              explanation: 'It queues a task, so the rest of the current script finishes first, and the browser clamps the delay to something like 4ms. Zero means "as soon as possible", not "now".',
            },
            {
              id: 'quiz-js-l81-q3',
              type: 'blank',
              prompt: 'Which method cancels a requestAnimationFrame callback that has not run yet?',
              answers: [
                'cancelanimationframe',
              ],
              explanation: 'It takes the id returned by the call you want to cancel, which is the frame callback equivalent of clearTimeout.',
            },
            {
              id: 'quiz-js-l81-q4',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'var n = 0\nfunction tick() {\n  n = n + 1\n  if (n < 3) requestAnimationFrame(tick)\n}\nrequestAnimationFrame(tick)\nconsole.log(n)',
              options: [
                '0',
                '1',
                '3',
                'undefined',
              ],
              answer: 0,
              explanation: 'The callback is scheduled for a later frame, so the synchronous log statement runs first with nothing done yet. That is the same queuing behaviour as a timer, and the same reason a frame loop is written the way it is.',
            },
            {
              id: 'quiz-js-l81-q5',
              type: 'identify-error',
              prompt: 'What is the problem with this loop?',
              code: 'setInterval(function () {\n  position = position + 10\n}, 0)',
              options: [
                'A delay of 0 floods the main thread with timer tasks instead of waiting for the display',
                'setInterval cannot be given a delay of 0',
                'position has to be declared with let before it can be added to',
                'The callback must be an arrow function',
              ],
              answer: 0,
              explanation: 'The browser clamps nested timers to roughly 4ms and throttles them further, so you get a busy loop that is not in step with any frame and keeps running in a hidden tab. Use requestAnimationFrame for motion.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l81-b1',
            body: 'JavaScript cannot wait. There is no instruction that pauses the script for two seconds — a timer hands the work to the browser, your function returns, and the browser calls you back when the time is up. That is why the lines after a `setTimeout` all run first. Every scheduling function here follows the same shape: something is queued, and the event loop picks it up later on a turn of its own.',
          },
          {
            type: 'demo',
            id: 'j-l81-d1',
            title: 'A clock that counts real frames',
            body: 'Start it and the number climbs in step with the screen refresh, because the value comes from the timestamp each frame hands over rather than from counting how many times a timer fired. Stop it and the loop is cancelled, not merely hidden. The one-shot button uses setTimeout, so its message lands once, half a second later.',
            html: `<p id="clock">0.00s</p>
<p>
  <button id="start" type="button">Start</button>
  <button id="stop" type="button">Stop</button>
  <button id="once" type="button">One-shot after 500ms</button>
</p>
<p id="note">—</p>`,
            css: `#clock { margin: 0 0 0.6rem; font-family: ui-monospace, monospace; font-size: 20px; }
p { margin: 0 0 0.6rem; }
#note { font-weight: 600; }
button { font: inherit; padding: 0.35rem 0.6rem; margin-right: 0.4rem; border: 1px solid #c7ced6; background: #fff; border-radius: 6px; cursor: pointer; }`,
            javascript: `const clock = document.querySelector('#clock')
const note = document.querySelector('#note')
let running = false
let started = 0
let frame = 0

function loop(now) {
  if (!running) return
  clock.textContent = ((now - started) / 1000).toFixed(2) + 's'
  frame = requestAnimationFrame(loop)
}

document.querySelector('#start').addEventListener('click', function () {
  if (running) return
  running = true
  started = performance.now()
  frame = requestAnimationFrame(loop)
})

document.querySelector('#stop').addEventListener('click', function () {
  running = false
  cancelAnimationFrame(frame)
})

document.querySelector('#once').addEventListener('click', function () {
  note.textContent = 'queued…'
  setTimeout(function () {
    note.textContent = 'that was setTimeout, 500ms later'
  }, 500)
})`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'j-l81-h1',
            level: 3,
            body: 'setTimeout: once, later',
          },
          {
            type: 'code',
            id: 'j-l81-c1',
            language: 'javascript',
            title: 'Queued, not blocking',
            code: `console.log('one')
setTimeout(function () {
  console.log('three')
}, 0)
console.log('two')

// one, two, three — a 0 delay still means "after this turn"
// the callback receives no useful arguments
const id = setTimeout(save, 2000)
clearTimeout(id)   // changed my mind`,
          },
          {
            type: 'text',
            id: 'j-l81-b2',
            body: 'A delay of `0` does not mean "now". It means "as soon as you can", and the browser clamps it — usually to about 4ms, and to far more once five timers are nested inside each other, which is a deliberate throttle against a page that has trapped itself in a loop. `clearTimeout` cancels a pending one, and you need the id that `setTimeout` returned in order to do it. Timers also stay queued while the tab is hidden and fire in a burst when the user comes back, so a poll that assumes steady delivery will surprise you.',
          },
          {
            type: 'heading',
            id: 'j-l81-h2',
            level: 3,
            body: 'setInterval and clearInterval',
          },
          {
            type: 'code',
            id: 'j-l81-c2',
            language: 'javascript',
            title: 'A repeating task',
            code: `const id = setInterval(function () {
  seconds = seconds + 1
  clock.textContent = seconds + 's'
}, 1000)

clearInterval(id)   // stop it; without this it runs until the page closes

setInterval(function () {
  // a throw here does not stop the interval
  render()
}, 16)             // every interval, not every frame`,
          },
          {
            type: 'list',
            id: 'j-l81-l1',
            style: 'bullet',
            items: [
              'The delay is the time between the start of one call and the start of the next, so a slow callback eats into the following gap and the work drifts later.',
              'An exception inside the callback does not cancel the interval. The next call still happens, and the error repeats forever.',
              '`clearInterval` needs the id. Keep it in a variable; a timer you cannot reach is a timer you cannot stop.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l81-h3',
            level: 3,
            body: 'requestAnimationFrame: once per painted frame',
          },
          {
            type: 'text',
            id: 'j-l81-b3',
            body: 'A display refreshes 60 or 120 times a second, and the browser knows exactly when the next frame will happen. `requestAnimationFrame` schedules your callback for that moment and hands you a timestamp, so you never have to guess how long a frame took. A paused animation costs nothing, because no frames are being produced and no callbacks are queued — which is exactly what an interval in a background tab gets wrong.',
          },
          {
            type: 'code',
            id: 'j-l81-c3',
            language: 'javascript',
            title: 'A frame loop, and how to end it',
            code: `let start = null
let frame = 0

function step(now) {
  if (start === null) start = now
  const elapsed = now - start
  box.style.transform = 'translateX(' + (elapsed * 0.2) + 'px)'
  if (elapsed < 2000) {
    frame = requestAnimationFrame(step)   // ask for the next one
  }
}

frame = requestAnimationFrame(step)
cancelAnimationFrame(frame)   // stop early, if needed`,
          },
          {
            type: 'warning',
            id: 'j-l81-w1',
            title: 'A timer at 16ms is not a frame',
            body: 'The arithmetic looks right — 1000 divided by 60 is about 16.7 — and it still goes wrong. A timer and a frame are not the same clock: the timer fires whether or not anything was painted, so it drifts out of step with the display and stutters on every drop. It also keeps running in a tab nobody is looking at. For anything the user watches moving, use `requestAnimationFrame`; keep timers for work that is about time rather than about drawing.',
          },
          {
            type: 'tip',
            id: 'j-l81-t1',
            title: 'Let the timestamp do the maths',
            body: 'Add to the elapsed time each frame rather than assuming a step size. Then a frame that arrives late simply moves the animation further in one go, and the motion stays smooth instead of slowing down whenever the page does.',
          },
          {
            type: 'exercise',
            id: 'j-l81-x1',
            exercise: {
              id: 'ex-js-ticker',
              instructions:
                'Wire up a repeating timer. Clicking `#start` must call setInterval with a callback that runs every 100 milliseconds; the callback adds 0.1 to a running total and writes it into `#clock` as seconds with two decimals and a trailing "s", so the first line reads "0.10s". Store the id that setInterval returns on `window.tickId`, because the stop button cannot cancel a timer it has no reference to. Clicking `#stop` must clear the timer and set `window.tickId` back to null. Starting twice must not create two timers, and stopping before starting must not fail.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<button id="start" type="button">Start</button>
<button id="stop" type="button">Stop</button>
<p id="clock">0.00s</p>`,
                javascript: `const clock = document.querySelector('#clock')
let elapsed = 0

document.querySelector('#start').addEventListener('click', function () {
  // setInterval, and keep the id on window.tickId
})

document.querySelector('#stop').addEventListener('click', function () {
  // clearInterval, then window.tickId = null
})`,
              },
              expectedOutput: '0.10s',
              tests: [
                {
                  id: 'ex-js-ticker-t1',
                  label: 'Start creates a timer and keeps its id',
                  body: `var start = document.querySelector('#start')
if (!start) return 'Keep the #start button.'
start.click()
return typeof window.tickId === 'number' && window.tickId > 0
  ? true
  : 'Save the id that setInterval returns on window.tickId, or the stop button has nothing to cancel.'`,
                },
                {
                  id: 'ex-js-ticker-t2',
                  label: 'Stop clears the timer and empties tickId',
                  body: `var start = document.querySelector('#start')
var stop = document.querySelector('#stop')
if (!start || !stop) return 'Keep the #start and #stop buttons.'
start.click()
stop.click()
return window.tickId === null || window.tickId === undefined
  ? true
  : 'After stopping, set window.tickId back to null so the button cannot cancel a timer twice.'`,
                },
                {
                  id: 'ex-js-ticker-t3',
                  label: 'The clock shows seconds with two decimals',
                  body: `var clock = document.querySelector('#clock')
if (!clock) return 'Keep the #clock paragraph.'
document.querySelector('#start').click()
var raw = clock.textContent.trim().replace('s', '')
return isFinite(parseFloat(raw))
  ? true
  : 'Write the elapsed seconds into #clock as a number, for example 0.30s.'`,
                },
                {
                  id: 'ex-js-ticker-t4',
                  label: 'Starting and stopping repeatedly stays safe',
                  body: `var start = document.querySelector('#start')
var stop = document.querySelector('#stop')
var clock = document.querySelector('#clock')
if (!start || !stop || !clock) return 'Keep the #start, #stop and #clock elements.'
stop.click()
start.click()
start.click()
stop.click()
stop.click()
var raw = clock.textContent.trim().replace('s', '')
return (window.tickId === null || window.tickId === undefined) && isFinite(parseFloat(raw))
  ? true
  : 'Guard both buttons: start must not create a second timer, and stop must do nothing when no timer is running.'`,
                },
              ],
              hints: [
                'SetInterval gives you a number back. That number is the only way clearInterval can find the timer again.',
                'In the callback, do `elapsed = elapsed + 0.1` and write `elapsed.toFixed(2) + "s"` into the clock.',
                'A guard makes both buttons safe: in start, `if (window.tickId) return`; in stop, `if (!window.tickId) return` before clearing.',
              ],
              solution: {
                html: `<button id="start" type="button">Start</button>
<button id="stop" type="button">Stop</button>
<p id="clock">0.00s</p>`,
                javascript: `const clock = document.querySelector('#clock')
let elapsed = 0

document.querySelector('#start').addEventListener('click', function () {
  if (window.tickId) return
  window.tickId = setInterval(function () {
    elapsed = elapsed + 0.1
    clock.textContent = elapsed.toFixed(2) + 's'
  }, 100)
})

document.querySelector('#stop').addEventListener('click', function () {
  if (!window.tickId) return
  clearInterval(window.tickId)
  window.tickId = null
})`,
              },
              testNotes:
                'The tests never wait for the timer, because a test that sleeps is a test that is sometimes wrong. They check the two things you control: the id you kept, and whether the display is a real number.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'js-s70',
    title: 'Cookies',
    description:
      'The oldest storage on the web: what a cookie is, how to read and write one, and why a token in a readable cookie is a token you have lost.',
    lessons: [
      {
        id: 'js-l82',
        title: 'Cookies',
        description:
          'document.cookie as a single string, parsing it into an object, the attributes that control scope and lifetime, and the mistakes that leak data.',
        duration: 6,
        objectives: [
          'Read document.cookie and understand why it is a string and not an object',
          'Parse a cookie string into name and value pairs',
          'Write a cookie with path, max-age, expires, secure and samesite',
          'Explain why anything sensitive belongs behind httpOnly instead',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l82',
          title: 'Cookies quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l82-q1',
              type: 'multiple-choice',
              prompt: 'What does document.cookie give you?',
              options: [
                'One string holding every cookie this page is allowed to read',
                'An object with one property per cookie',
                'Only the cookies that the current page set',
                'An array with one entry per cookie',
              ],
              answer: 0,
              explanation: 'It is a single name=value string joined by semicolons, and it is filtered by the HttpOnly attribute and by the path and domain rules. That is why every piece of cookie code starts by parsing it.',
            },
            {
              id: 'quiz-js-l82-q2',
              type: 'true-false',
              prompt: 'A cookie set with the httpOnly attribute can be read from JavaScript with document.cookie.',
              answer: false,
              explanation: 'httpOnly exists precisely to hide a value from page scripts. It is still sent on matching requests, which is what makes it right for a session identifier.',
            },
            {
              id: 'quiz-js-l82-q3',
              type: 'blank',
              prompt: 'Which cookie attribute keeps a cookie from being sent on cross-site requests?',
              answers: [
                'samesite',
              ],
              explanation: 'SameSite=Lax or Strict withholds the cookie from requests initiated by another site, which is the main defence against cross-site request forgery and against third-party tracking.',
            },
            {
              id: 'quiz-js-l82-q4',
              type: 'code-output',
              prompt: 'Roughly how long does this cookie last?',
              code: 'document.cookie = \'theme=dark; path=/; max-age=60\'',
              options: [
                '60 seconds',
                '60 minutes',
                '60 days',
                'Until the tab is closed',
              ],
              answer: 0,
              explanation: 'max-age is counted in seconds, not minutes, and the expires attribute is the alternative spelling with a date. Get this wrong and a "remember me" cookie lasts a minute.',
            },
            {
              id: 'quiz-js-l82-q5',
              type: 'identify-error',
              prompt: 'What is the problem with this line?',
              code: 'document.cookie = \'sessionToken=\' + token + \'; path=/\'',
              options: [
                'Any script on the page can read the token, and it is resent with every request to the site',
                'Cookie values cannot be built from a variable',
                'The name is too long for a cookie',
                'path=/ means the cookie is only sent to the root path',
              ],
              answer: 0,
              explanation: 'A cookie set this way is readable by every script on the page and is attached to every matching request. A session identifier belongs in a server-set httpOnly cookie instead.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l82-b1',
            body: 'A cookie is a small string the browser stores and sends back with every request to a matching URL. It predates localStorage and is still the only one of the two that the **server** sees automatically, which is exactly why it is still used for session identifiers. From JavaScript, `document.cookie` is one string of `name=value` pairs joined by `; ` — not an object, not an array, and no way to address one value by name.',
          },
          {
            type: 'demo',
            id: 'j-l82-d1',
            title: 'Reading a cookie header',
            body: 'Type or paste any cookie string and it is parsed the way you would have to parse it yourself: split on the semicolon, split each piece on the first equals, trim. Nothing is written to your browser here. The box below the list is the string you would actually receive in a `Cookie:` request header.',
            html: `<label for="src">Cookie string</label>
<input id="src" value="theme=dark; session=abc123; cart=2; token=a=b=c">
<ul id="out"></ul>
<p id="raw">theme=dark; session=abc123; cart=2; token=a=b=c</p>`,
            css: `#src { width: 100%; box-sizing: border-box; font: inherit; padding: 0.4rem; border: 1px solid #c7ced6; border-radius: 6px; }
#out { margin: 0.7rem 0; padding-left: 1.1rem; font-size: 13.5px; }
#out li { margin: 0.15rem 0; }
#raw { margin: 0; font-family: ui-monospace, monospace; font-size: 12px; color: #55606b; }
label { display: block; font-size: 13px; margin-bottom: 0.25rem; }`,
            javascript: `const src = document.querySelector('#src')
const out = document.querySelector('#out')

function parse(str) {
  const jar = {}
  str.split(';').forEach(function (part) {
    const eq = part.indexOf('=')
    if (eq < 1) return
    jar[part.slice(0, eq).trim()] = part.slice(eq + 1).trim()
  })
  return jar
}

function draw() {
  const jar = parse(src.value)
  out.replaceChildren()
  Object.keys(jar).forEach(function (name) {
    const item = document.createElement('li')
    item.textContent = name + ' = ' + jar[name]
    out.append(item)
  })
  document.querySelector('#raw').textContent = 'document.cookie would give: ' + src.value
}

src.addEventListener('input', draw)
draw()`,
            height: 230,
          },
          {
            type: 'heading',
            id: 'j-l82-h1',
            level: 3,
            body: 'Reading',
          },
          {
            type: 'code',
            id: 'j-l82-c1',
            language: 'javascript',
            title: 'One string, no indexing',
            code: `document.cookie                       // 'theme=dark; cart=2'
document.cookie = 'theme=dark'          // write: never deletes, it appends

// there is no delete on document.cookie; you overwrite with an expiry in the past
document.cookie = 'theme=; max-age=0; path=/'`,
          },
          {
            type: 'text',
            id: 'j-l82-b2',
            body: 'The write is a plain string assignment, and the `name=value` part is only the beginning — everything after the first `;` is an attribute. That is why deleting is so unintuitive: you cannot remove a cookie, you set the same name with an expiry in the past and the browser throws it away. Note also that assigning the same name twice with a different path produces **two** cookies, and `document.cookie` will then show both, which is a genuinely confusing bug to track down.',
          },
          {
            type: 'list',
            id: 'j-l82-l1',
            style: 'bullet',
            items: [
              '**Value size.** Around 4KB per cookie, and roughly 50 per domain once attributes are counted. It is a space for an identifier, not for a shopping basket.',
              '**Encoded values.** Semicolons and spaces break the format, so encode anything unusual and decode it after reading.',
              '**Same name, different path** is two cookies, not an update. Fix the paths and delete the old one.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l82-h2',
            level: 3,
            body: 'The attributes that matter',
          },
          {
            type: 'code',
            id: 'j-l82-c2',
            language: 'javascript',
            title: 'A cookie written properly',
            code: `document.cookie =
  'theme=dark' +
  '; path=/' +          // sent to every path on this site
  '; max-age=31536000' + // lifetime in seconds; omit for a session cookie
  '; secure' +          // https only, never sent over plain http
  '; samesite=lax'      // not sent on cross-site requests`,
          },
          {
            type: 'code',
            id: 'j-l82-c3',
            language: 'javascript',
            title: 'A past date, the only way to delete',
            code: `document.cookie = 'theme=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
document.cookie = 'theme=; path=/; max-age=0'

// both attributes must match the original cookie, or nothing is deleted`,
          },
          {
            type: 'warning',
            id: 'j-l82-w1',
            title: 'Anything in a cookie is readable by the page',
            body: 'A cookie set from JavaScript is, by definition, not `httpOnly`, so any script on the page — including yours, and including any script an injected third party manages to run — can read it out of `document.cookie`. Session identifiers, password reset links and anything else sensitive belong in a server-set `httpOnly` cookie, which JavaScript cannot touch at all. If you can read a secret in the browser, so can everything else running there.',
          },
          {
            type: 'warning',
            id: 'j-l82-w2',
            title: 'Cookies travel on every request',
            body: 'Once set, the cookie is attached to every request that matches its path and domain, including images, stylesheets and third-party embeds. That makes it a slow way to move data and a way to leak it: `SameSite=Lax` keeps it off cross-site requests, `secure` keeps it off plain http, and a short `max-age` keeps the damage window small. Decide what a cookie is *for* before you decide how long it should live.',
          },
          {
            type: 'tip',
            id: 'j-l82-t1',
            title: 'Which storage?',
            body: 'If the server needs it on the request, it is a cookie. If only the page needs it, use `localStorage` from the next lesson: more room, structured values, and no traffic on every request. Choosing a cookie for client-only data is a habit that costs you 4KB and a performance hit for nothing.',
          },
          {
            type: 'exercise',
            id: 'j-l82-x1',
            exercise: {
              id: 'ex-js-parse-cookies',
              instructions:
                'Define a function called parseCookies that takes a cookie header string and returns a plain object of name and value pairs. Split the string on the semicolons, then split each piece on its FIRST equals sign, and trim the spaces off both halves so a value containing an equals sign survives intact. Ignore any piece that has no name before the equals sign, which is what an empty string or a trailing semicolon gives you. Return an empty object for an empty string.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return an object of name and value pairs from a cookie header string.
// For example: parseCookies('a=1; b=2') should give { a: '1', b: '2' }
function parseCookies(str) {
  // split on ';', then on the first '=' in each piece
}
`,
              },
              expectedOutput: '{ a: \'1\', b: \'2\' }',
              tests: [
                {
                  id: 'ex-js-parse-cookies-t1',
                  label: 'Two ordinary cookies come back as pairs',
                  body: `var fn = window.parseCookies
if (typeof fn !== 'function') return 'Define parseCookies as a function declaration at the top level of the script.'
var jar = fn('a=1; b=2')
return jar && jar.a === '1' && jar.b === '2'
  ? true
  : 'parseCookies("a=1; b=2") should give an object with a = "1" and b = "2".'`,
                },
                {
                  id: 'ex-js-parse-cookies-t2',
                  label: 'Blank pieces are skipped',
                  body: `var fn = window.parseCookies
if (typeof fn !== 'function') return 'Define parseCookies as a function declaration.'
var jar = fn('a=1;;   ; b=2;')
return jar && jar.a === '1' && jar.b === '2' && Object.keys(jar).length === 2
  ? true
  : 'Empty segments from a doubled semicolon or a trailing one should be ignored, leaving only a and b.'`,
                },
                {
                  id: 'ex-js-parse-cookies-t3',
                  label: 'A value containing equals signs survives',
                  body: `var fn = window.parseCookies
if (typeof fn !== 'function') return 'Define parseCookies as a function declaration.'
var jar = fn('token=abc=123')
return jar && jar.token === 'abc=123'
  ? true
  : 'Split each piece on the first equals sign only, so token keeps the value abc=123.'`,
                },
                {
                  id: 'ex-js-parse-cookies-t4',
                  label: 'An empty string gives an empty object',
                  body: `var fn = window.parseCookies
if (typeof fn !== 'function') return 'Define parseCookies as a function declaration.'
var jar = fn('')
return jar && typeof jar === 'object' && Object.keys(jar).length === 0
  ? true
  : 'parseCookies("") should return an object with no keys, not null or undefined.'`,
                },
              ],
              hints: [
                'Split once on ";" with `str.split(";")`, then loop over the pieces.',
                'For each piece, `part.indexOf("=")` gives you the position of the first equals sign. If it is 0 or less, the piece is empty, so skip it.',
                'The two halves are `part.slice(0, eq).trim()` and `part.slice(eq + 1).trim()`.',
              ],
              solution: {
                javascript: `function parseCookies(str) {
  const jar = {}
  if (!str) return jar
  str.split(';').forEach(function (part) {
    const eq = part.indexOf('=')
    if (eq < 1) return
    const name = part.slice(0, eq).trim()
    if (!name) return
    jar[name] = part.slice(eq + 1).trim()
  })
  return jar
}`,
              },
              testNotes:
                'These tests call your function directly, so the check is the parsing itself. Trim both halves: the standard format is "name=value; name=value" with a space after every semicolon, and skipping that space silently breaks every name.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'js-s71',
    title: 'Web APIs',
    description:
      'What a web API is, the History API as a page-level interface, and the form validation rules the browser gives you for free.',
    lessons: [
      {
        id: 'js-l83',
        title: 'Web APIs, the History API and form validation',
        description:
          'The browser as a platform: the shapes its APIs share, pushState and popstate as one API, and constraint validation with validity, validationMessage and setCustomValidity.',
        duration: 8,
        objectives: [
          'Say what makes a browser object an API and what the shared shapes are',
          'Combine pushState, replaceState and popstate into one navigable interface',
          'Read validity.valueMissing and the other validation flags',
          'Run checkValidity and reportValidity and say how they differ',
          'Add your own rule with setCustomValidity and clear it afterwards',
        ],
        xp: 65,
        quiz: {
          id: 'quiz-js-l83',
          title: 'Web APIs, the History API and form validation quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l83-q1',
              type: 'multiple-choice',
              prompt: 'What does form.checkValidity() do?',
              options: [
                'Runs every control’s constraint rules and returns true or false, without showing any message',
                'Shows the browser’s own validation popup and returns the result',
                'Submits the form if everything passes',
                'Turns the invalid fields red',
              ],
              answer: 0,
              explanation: 'checkValidity is the quiet version: it asks the question and answers it. reportValidity is the one that talks to the user, and the popup it shows is not yours to style.',
            },
            {
              id: 'quiz-js-l83-q2',
              type: 'true-false',
              prompt: 'Calling event.preventDefault() inside a submit handler stops the browser from submitting the form.',
              answer: true,
              explanation: 'It is the first line of any submit handler that talks to a server. Skip it and the browser does a full page submit, the page unloads, and any fetch you started goes with it.',
            },
            {
              id: 'quiz-js-l83-q3',
              type: 'blank',
              prompt: 'Which object exposes the specific reason an input is invalid, such as valueMissing or typeMismatch?',
              answers: [
                'validity',
              ],
              explanation: 'input.validity is a set of booleans naming the failed rule, which is what lets you point at one specific field. input.validationMessage is the sentence that goes with it.',
            },
            {
              id: 'quiz-js-l83-q4',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'var input = document.querySelector(\'#age\')\ninput.setCustomValidity(\'\')\ninput.setCustomValidity(\'You must be 18 or over\')\nconsole.log(input.validity.valid)',
              options: [
                'false',
                'true',
                'undefined',
                'It depends on the current value',
              ],
              answer: 0,
              explanation: 'A custom message sets the customError flag, which makes the field invalid regardless of the other rules. The empty-string call before it is what lets the built-in rules work again later.',
            },
            {
              id: 'quiz-js-l83-q5',
              type: 'identify-error',
              prompt: 'What is missing here?',
              code: 'form.addEventListener(\'submit\', function (e) {\n  fetch(\'/save\', { method: \'POST\', body: new FormData(form) })\n})',
              options: [
                'e.preventDefault(), so the browser also does its own submit and the data is sent twice',
                'A content-type header on the request',
                'An action attribute on the form',
                'FormData cannot be sent with fetch',
              ],
              answer: 0,
              explanation: 'Without preventDefault the browser performs its own navigation, and the page unloads before the fetch can be read. FormData sets its own multipart content type, so that header is the browser’s job.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l83-b1',
            body: 'A **web API** is just a named set of methods and properties the browser puts on a global object, with the browser deciding what sits behind it. `history`, `navigator`, `localStorage`, `fetch`, `document` and `IntersectionObserver` are all the same kind of thing: an interface you call, and events it fires at you. They are grouped into families, and once you know the shape of one family the others stop being new.',
          },
          {
            type: 'demo',
            id: 'j-l83-d1',
            title: 'Two APIs, one form',
            body: 'The button is not a submit that goes anywhere: `novalidate` switches off the browser popup so the page can show the messages itself, and the handler reads the browser’s own verdict from each field. The bottom line confirms the History API is present and what it reports for the current entry.',
            html: `<form id="form" novalidate>
  <p><label>Email <input id="email" type="email" required></label></p>
  <p><label>Password <input id="pw" type="password" minlength="8" required></label></p>
  <button id="check" type="submit">Check</button>
</form>
<ul id="msgs"></ul>
<p id="verdict">Nothing checked yet.</p>
<p id="api">…</p>`,
            css: `form { font-size: 13.5px; }
form p { margin: 0 0 0.5rem; }
label { display: block; }
input { width: 15rem; max-width: 100%; font: inherit; padding: 0.35rem; border: 1px solid #c7ced6; border-radius: 6px; }
button { font: inherit; padding: 0.4rem 0.7rem; border: 1px solid #c7ced6; background: #fff; border-radius: 6px; cursor: pointer; }
#msgs { margin: 0.5rem 0; padding-left: 1.1rem; color: #b02a37; font-size: 13px; }
#verdict { font-weight: 600; margin: 0 0 0.4rem; }
#api { margin: 0; font-size: 12px; color: #55606b; font-family: ui-monospace, monospace; }`,
            javascript: `const form = document.querySelector('#form')
const msgs = document.querySelector('#msgs')
const verdict = document.querySelector('#verdict')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const bad = Array.prototype.filter.call(
    form.querySelectorAll('input'),
    function (input) { return !input.validity.valid }
  )
  msgs.replaceChildren()
  bad.forEach(function (input) {
    const item = document.createElement('li')
    item.textContent = input.id + ' — ' + input.validationMessage
    msgs.append(item)
  })
  verdict.textContent = bad.length === 0
    ? 'Everything looks valid.'
    : bad.length + ' field(s) to fix.'
})

document.querySelector('#api').textContent =
  'History API: pushState ' + (typeof history.pushState) +
  ', replaceState ' + (typeof history.replaceState) +
  ', history.length ' + history.length +
  ', state ' + JSON.stringify(history.state)`,
            height: 330,
          },
          {
            type: 'heading',
            id: 'j-l83-h1',
            level: 3,
            body: 'The shapes an API repeats',
          },
          {
            type: 'list',
            id: 'j-l83-l1',
            style: 'bullet',
            items: [
              '**A global object with methods.** `history.pushState`, `localStorage.getItem`, `navigator.clipboard.writeText`.',
              '**A read-only property and a method that changes it.** `history.state` and `history.pushState`; `localStorage.length` and `localStorage.setItem`.',
              '**Events.** `addEventListener` on the object, and a payload in the event: `popstate` carries the state object, `submit` carries the form.',
              '**A feature test instead of a browser list.** `if ("pushState" in history)`, `if ("geolocation" in navigator)`, `if (window.IntersectionObserver)`. The API is either there or it is not.',
              '**A permission step.** `geolocation`, `clipboard`, `notifications` and `geolocation` all ask, and all of them can be denied permanently.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l83-h2',
            level: 3,
            body: 'The History API as one interface',
          },
          {
            type: 'text',
            id: 'j-l83-b2',
            body: 'Used piecemeal, the History API is confusing: `pushState` adds an entry, `replaceState` edits the current one, and both of them do nothing to the page until `popstate` arrives. Treated as one interface it is simple — a stack of state objects with a pointer, and one event telling you the pointer moved. Write one `render` function, one `navigate` function, and one `popstate` handler that calls the same render, and the whole thing is a router.',
          },
          {
            type: 'code',
            id: 'j-l83-c1',
            language: 'javascript',
            title: 'A minimal router',
            code: `function navigate(name, replace) {
  const method = replace ? 'replaceState' : 'pushState'
  history[method]({ page: name }, '', '/app/' + name)
  render(name)
}

window.addEventListener('popstate', function (event) {
  render(event.state ? event.state.page : 'home')
})

document.addEventListener('click', function (event) {
  const link = event.target.closest('a[data-page]')
  if (!link) return
  event.preventDefault()          // stop the real navigation
  navigate(link.dataset.page)     // do it ourselves
})`,
          },
          {
            type: 'tip',
            id: 'j-l83-t1',
            title: 'A server still has to answer the URL',
            body: 'A `pushState` URL is only a string until someone requests it. Reload that URL or paste it into a new tab and the browser asks the server for a document — so the server needs a catch-all rule that serves your app shell and lets the router read the path. Get this wrong and the app works perfectly until the first refresh.',
          },
          {
            type: 'heading',
            id: 'j-l83-h3',
            level: 3,
            body: 'Constraint validation',
          },
          {
            type: 'text',
            id: 'j-l83-b3',
            body: 'Every form control already knows the rules: `required`, `type="email"`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `step`. The browser applies them without a line of your code, and exposes the verdict on two objects. `input.validity` is the machine-readable reason — a set of booleans including `valueMissing`, `typeMismatch`, `rangeUnderflow`, `patternMismatch` and `customError`. `input.validationMessage` is the sentence the browser would show a user, already written and already localised.',
          },
          {
            type: 'code',
            id: 'j-l83-c2',
            language: 'javascript',
            title: 'The three calls',
            code: `const email = document.querySelector('#email')

email.checkValidity()     // true or false, and fires invalid — no message shown
email.reportValidity()    // true or false, and shows the browser's own popup
email.validity.valueMissing   // why: which specific rule failed
email.validationMessage       // the localised sentence, e.g. "Please fill out this field."

form.addEventListener('submit', function (event) {
  event.preventDefault()      // otherwise the browser submits and the page unloads
  if (!form.checkValidity()) {
    firstInvalid.focus()      // and send the user to it
    return
  }
  // safe to send
})`,
          },
          {
            type: 'code',
            id: 'j-l83-c3',
            language: 'javascript',
            title: 'Adding a rule the browser has no attribute for',
            code: `const pw = document.querySelector('#pw')

function checkStrength() {
  // the empty string removes the custom message, so the built-in rules work again
  pw.setCustomValidity('')
  if (pw.value && pw.value.length < 12) {
    pw.setCustomValidity('Use at least 12 characters.')
  }
}

pw.addEventListener('input', checkStrength)   // re-check on every keystroke`,
          },
          {
            type: 'warning',
            id: 'j-l83-w1',
            title: 'A custom message sticks until you clear it',
            body: 'Once `setCustomValidity("...")` is called, the field stays invalid — even after the user fixes the problem — until you call `setCustomValidity("")` again. Forget that line and the form will refuse to submit forever, with a message about a rule that no longer applies. The habit that prevents it is the empty string first, then the new message, exactly as the snippet above does.',
          },
          {
            type: 'tip',
            id: 'j-l83-t2',
            title: 'novalidate, then do it yourself',
            body: 'The built-in popup is untouchable: no styling, no placement, and it disappears on a timer. Adding `novalidate` to the form turns it off, and the browser’s `validity` and `validationMessage` still work — so you get the browser’s rules and your own presentation at the same time. The trade is that you now owe the user a clear message and a way to reach the field that failed.',
          },
          {
            type: 'exercise',
            id: 'j-l83-x1',
            exercise: {
              id: 'ex-js-form-validate',
              instructions:
                'Make `#check` validate the form without letting the browser submit it. Add a submit handler on `#form` that calls event.preventDefault() first. Then look at each input inside the form: if input.validity.valid is false, append one `<li>` to `#msgs` whose text is the input id, a space, and then that input’s own validationMessage. Clear `#msgs` completely at the start of every submit. If nothing is invalid, `#verdict` must read exactly "Everything looks valid."; otherwise it should count how many fields need fixing.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<form id="form" novalidate>
  <label>Email <input id="email" type="email" required></label>
  <label>Password <input id="pw" type="password" minlength="8" required></label>
  <button id="check" type="submit">Check</button>
</form>
<ul id="msgs"></ul>
<p id="verdict">Nothing checked yet.</p>`,
                javascript: `const form = document.querySelector('#form')
const msgs = document.querySelector('#msgs')
const verdict = document.querySelector('#verdict')

form.addEventListener('submit', function (event) {
  // preventDefault, then walk the inputs
})`,
              },
              expectedOutput: 'Everything looks valid.',
              tests: [
                {
                  id: 'ex-js-form-validate-t1',
                  label: 'An empty form reports both fields',
                  body: `var form = document.querySelector('#form')
var msgs = document.querySelector('#msgs')
if (!form || !msgs) return 'Keep the #form and #msgs from the starter HTML.'
form.querySelector('#email').value = ''
form.querySelector('#pw').value = ''
document.querySelector('#check').click()
return msgs.querySelectorAll('li').length === 2
  ? true
  : 'With both fields empty, one message per invalid input means 2 lines, found ' + msgs.querySelectorAll('li').length + '.'`,
                },
                {
                  id: 'ex-js-form-validate-t2',
                  label: 'One bad value leaves one message, and it names the field',
                  body: `var form = document.querySelector('#form')
var msgs = document.querySelector('#msgs')
if (!form || !msgs) return 'Keep the #form and #msgs.'
form.querySelector('#email').value = 'nope'
form.querySelector('#pw').value = 'longenough1'
document.querySelector('#check').click()
var items = msgs.querySelectorAll('li')
return items.length === 1 && items[0].textContent.indexOf('email') >= 0
  ? true
  : 'A value of "nope" fails type="email", so only the email line should appear, found ' + items.length + '.'`,
                },
                {
                  id: 'ex-js-form-validate-t3',
                  label: 'Two good values clear the list and set the verdict',
                  body: `var form = document.querySelector('#form')
var msgs = document.querySelector('#msgs')
var verdict = document.querySelector('#verdict')
if (!form || !msgs || !verdict) return 'Keep the #form, #msgs and #verdict.'
form.querySelector('#email').value = 'ada@example.com'
form.querySelector('#pw').value = 'longenough1'
document.querySelector('#check').click()
return msgs.querySelectorAll('li').length === 0 && verdict.textContent.trim() === 'Everything looks valid.'
  ? true
  : 'With a valid email and a password of 8 or more characters, #msgs must be empty and #verdict must read exactly: Everything looks valid.'`,
                },
                {
                  id: 'ex-js-form-validate-t4',
                  label: 'The message is the browser’s own sentence',
                  body: `var form = document.querySelector('#form')
var msgs = document.querySelector('#msgs')
if (!form || !msgs) return 'Keep the #form and #msgs.'
form.querySelector('#email').value = ''
form.querySelector('#pw').value = ''
document.querySelector('#check').click()
var first = msgs.querySelector('li')
return first && first.textContent.trim().length > 14
  ? true
  : 'Use the input’s own validationMessage so the wording is the browser’s, not your guess at it.'`,
                },
              ],
              hints: [
                'First line of the handler: event.preventDefault(). Without it the browser submits the form and the whole page goes away.',
                'Collect the bad fields with a filter over form.querySelectorAll("input") checking !input.validity.valid, then loop over the result and build one li each.',
                'msgs.replaceChildren() empties the list in one step. The verdict is a ternary on whether the bad list was empty.',
              ],
              solution: {
                html: `<form id="form" novalidate>
  <label>Email <input id="email" type="email" required></label>
  <label>Password <input id="pw" type="password" minlength="8" required></label>
  <button id="check" type="submit">Check</button>
</form>
<ul id="msgs"></ul>
<p id="verdict">Nothing checked yet.</p>`,
                javascript: `const form = document.querySelector('#form')
const msgs = document.querySelector('#msgs')
const verdict = document.querySelector('#verdict')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const bad = Array.prototype.filter.call(
    form.querySelectorAll('input'),
    function (input) { return !input.validity.valid }
  )

  msgs.replaceChildren()
  bad.forEach(function (input) {
    const item = document.createElement('li')
    item.textContent = input.id + ' ' + input.validationMessage
    msgs.append(item)
  })

  verdict.textContent = bad.length === 0
    ? 'Everything looks valid.'
    : bad.length + ' field(s) to fix.'
})`,
              },
              testNotes:
                'The tests type into the fields and then click your button, so they exercise your submit handler and the browser’s own rules rather than any text you wrote yourself. A custom message left over from a previous run will fail test 3 — clear it with setCustomValidity("") if you added one.',
            },
          },
        ],
      },
    ],
  },

  {
    id: 'js-s72',
    title: 'Web storage',
    description:
      'localStorage and sessionStorage: keyed string storage on the origin, and the mistakes that fill the quota or lose the data.',
    lessons: [
      {
        id: 'js-l84',
        title: 'localStorage and sessionStorage',
        description:
          'Keyed storage that survives reloads, why every value is a string, the API both objects share, and the try/catch that stops a full quota from breaking your page.',
        duration: 6,
        objectives: [
          'Save, read, count and remove keys with setItem, getItem, key and removeItem',
          'Say when sessionStorage is cleared and when localStorage survives',
          'Store objects with JSON.stringify and read them back with JSON.parse',
          'Namespace your keys and catch the quota error instead of losing the data',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l84',
          title: 'localStorage and sessionStorage quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l84-q1',
              type: 'multiple-choice',
              prompt: 'Which of these survives closing the tab?',
              options: [
                'localStorage',
                'sessionStorage',
                'Both of them',
                'Neither of them',
              ],
              answer: 0,
              explanation: 'localStorage is kept until something deletes it or the user clears site data. sessionStorage belongs to the tab and is discarded with it, which is exactly why it suits a wizard and not a saved draft.',
            },
            {
              id: 'quiz-js-l84-q2',
              type: 'true-false',
              prompt: 'Values in localStorage are stored as strings, so saving an object needs JSON.stringify.',
              answer: true,
              explanation: 'Storing an object coerces it to "[object Object]" and you get it back as that string. JSON.stringify on the way in and JSON.parse on the way out are the only way to keep the structure.',
            },
            {
              id: 'quiz-js-l84-q3',
              type: 'blank',
              prompt: 'Which method removes a single named key from localStorage?',
              answers: [
                'removeitem',
              ],
              explanation: 'removeItem takes one key. clear() is the blunt version that empties storage for the whole origin, including keys another feature put there.',
            },
            {
              id: 'quiz-js-l84-q4',
              type: 'code-output',
              prompt: 'What does this log?',
              code: 'localStorage.setItem(\'count\', 4)\nconsole.log(localStorage.getItem(\'count\') + 1)',
              options: [
                '"41"',
                '5',
                '"5"',
                'null',
              ],
              answer: 0,
              explanation: 'getItem hands back the string "4", and the + operator joins two strings rather than adding two numbers. Convert with Number() on the way out and String() on the way in.',
            },
            {
              id: 'quiz-js-l84-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this?',
              code: 'for (var i = 0; i < 1000000; i++) {\n  localStorage.setItem(\'log-\' + i, \'x\')\n}',
              options: [
                'Every write is synchronous, and the 5 MB quota will be hit long before a million keys',
                'localStorage cannot be written from inside a loop',
                'setItem returns a promise that has to be awaited',
                'A key cannot contain a hyphen',
              ],
              answer: 0,
              explanation: 'Storage is not a database: writes block the main thread, the origin has roughly 5 MB, and the excess raises a QuotaExceededError. Keep one key with a bounded value rather than a key per row.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l84-b1',
            body: 'Web storage is a **key and string value** store attached to the origin, not to the page. `localStorage` survives the tab being closed; `sessionStorage` is thrown away with the tab. Both share one API, both are per origin, and neither of them is encrypted, hidden from page scripts, or sent to a server — which is why the obvious use, "remember what the visitor typed", is safe enough, and the tempting one, "remember their password", is not.',
          },
          {
            type: 'demo',
            id: 'j-l84-d1',
            title: 'Two stores, one API',
            body: 'Type something and save it to either store — the two boxes are the same code with a different object. The counts below include everything already on this origin, which is a good reminder that you are sharing one small store with every feature on the site. The wipe button removes only this demo’s key.',
            html: `<p><input id="note" placeholder="something to keep"></p>
<p>
  <button id="save">Save to localStorage</button>
  <button id="tab">Save to sessionStorage</button>
  <button id="wipe">Remove this key</button>
</p>
<p id="local">localStorage: …</p>
<p id="session">sessionStorage: …</p>`,
            css: `p { margin: 0 0 0.6rem; font-size: 13.5px; }
input { font: inherit; padding: 0.35rem; border: 1px solid #c7ced6; border-radius: 6px; }
button { font: inherit; padding: 0.35rem 0.6rem; margin-right: 0.4rem; border: 1px solid #c7ced6; background: #fff; border-radius: 6px; cursor: pointer; }
#local, #session { font-family: ui-monospace, monospace; font-size: 12.5px; }`,
            javascript: `const key = 'js-course-demo-note'
const note = document.querySelector('#note')

function show(area, id) {
  document.querySelector(id).textContent =
    area.length + ' key(s) on this origin. ' + key + ' = ' + (area.getItem(key) || '(empty)')
}

function save(area, id) {
  try {
    area.setItem(key, note.value)
    show(area, id)
  } catch (error) {
    document.querySelector(id).textContent = 'Could not save: ' + error.name
  }
}

document.querySelector('#save').addEventListener('click', function () { save(localStorage, '#local') })
document.querySelector('#tab').addEventListener('click', function () { save(sessionStorage, '#session') })
document.querySelector('#wipe').addEventListener('click', function () {
  localStorage.removeItem(key)
  sessionStorage.removeItem(key)
  show(localStorage, '#local')
  show(sessionStorage, '#session')
})

show(localStorage, '#local')
show(sessionStorage, '#session')`,
            height: 230,
          },
          {
            type: 'heading',
            id: 'j-l84-h1',
            level: 3,
            body: 'The API both objects share',
          },
          {
            type: 'code',
            id: 'j-l84-c1',
            language: 'javascript',
            title: 'Six methods and three properties',
            code: `localStorage.setItem('theme', 'dark')  // write
localStorage.getItem('theme')          // read, or null when the key is missing
localStorage.removeItem('theme')       // delete one key
localStorage.clear()                   // delete every key on this origin
localStorage.key(0)                    // the first key name, null past the end
localStorage.length                    // how many keys there are

for (let i = 0; i < localStorage.length; i++) {
  const name = localStorage.key(i)
  console.log(name, localStorage.getItem(name))
}`,
          },
          {
            type: 'list',
            id: 'j-l84-l1',
            style: 'bullet',
            items: [
              '**Values are strings.** `getItem("count") + 1` on a stored `4` gives `"41"`, not `5`. Store numbers with `String()` and read them with `Number()`.',
              '**A missing key is `null`, not `undefined` and not an empty string.** `getItem("nope") === null` is the check to write.',
              '**`clear()` is a blunt instrument.** It empties storage for the whole origin, including whatever another feature on the site put there. Delete the keys you own.',
              '**It is per origin.** Same protocol, host and port, and nothing else. A different port is a different store, which is why a page on `localhost:3000` cannot see what `localhost:5173` stored.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l84-h2',
            level: 3,
            body: 'localStorage or sessionStorage',
          },
          {
            type: 'text',
            id: 'j-l84-b2',
            body: 'Both are synchronous, which means a write blocks the main thread while it happens — a megabyte of JSON in a loop will freeze the page rather than queue the work. Both are per origin. The difference is the lifetime: `localStorage` persists until something deletes it, `sessionStorage` is tied to the tab and dies with it. That makes the choice obvious in most cases — a draft the user should still have tomorrow is localStorage, a wizard step that should not survive a crash is sessionStorage.',
          },
          {
            type: 'code',
            id: 'j-l84-c2',
            language: 'javascript',
            title: 'Storing something structured',
            code: `const draft = { title: 'Weeknotes', tags: ['js', 'api'] }

// out: a plain string
localStorage.setItem('js-course:draft', JSON.stringify(draft))

// in: a string, or null
const raw = localStorage.getItem('js-course:draft')
const parsed = raw === null ? null : JSON.parse(raw)

localStorage.removeItem('js-course:draft')`,
          },
          {
            type: 'warning',
            id: 'j-l84-w1',
            title: 'The write can fail, and it fails silently if you let it',
            body: 'Roughly 5MB per origin, and a `setItem` past that raises a `QuotaExceededError` that stops your script. It is raised on *some* private-browsing modes too, and reading the property can throw there before you even get that far. Both stores are also wiped wholesale when a user clears site data, so a saved value is a convenience, never a record of truth. Wrap reads and writes in `try` and `catch`, and keep anything important on the server.',
          },
          {
            type: 'warning',
            id: 'j-l84-w2',
            title: 'Everything in here is readable by the page',
            body: 'There is no `httpOnly` for web storage, no encryption, and no scoping below the origin — any script running on the page can read every key, which includes any third-party script you have on it. That rules out tokens, personal data and anything else you would not paste into the console. Name your keys with a prefix, as in `js-course:draft`, so one feature can clear its own data without clearing the site’s.',
          },
          {
            type: 'tip',
            id: 'j-l84-t1',
            title: 'One key, one value',
            body: 'Storing `app:state` and `app:settings` as two separate keys means two writes that can disagree if the second fails. Store one object under one key: one write, one read, one thing to clear, and `JSON.parse` gives the structure back for free.',
          },
          {
            type: 'exercise',
            id: 'j-l84-x1',
            exercise: {
              id: 'ex-js-note-store',
              instructions:
                'Write three functions over localStorage. saveNote(key, text) must store text under the namespaced key "note:" + key, so saving with key "a" writes to "note:a". loadNote(key) must return the stored text, or an empty string when nothing has been saved under that key. clearNote(key) must remove that one key and leave every other key alone — never call clear(). Wrap the read and the write in try and catch, and return an empty string if storage is unavailable.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Save text under "note:" + key.
function saveNote(key, text) {
  // try { localStorage.setItem(...) } catch { }
}

// Return the stored text, or an empty string.
function loadNote(key) {
  // try { ... } catch { return '' }
}

// Remove one namespaced key only.
function clearNote(key) {
  // localStorage.removeItem(...)
}
`,
              },
              expectedOutput: 'hello',
              tests: [
                {
                  id: 'ex-js-note-store-t1',
                  label: 'A saved note comes back unchanged',
                  body: `var save = window.saveNote
var load = window.loadNote
if (typeof save !== 'function' || typeof load !== 'function') return 'Define saveNote and loadNote as function declarations.'
localStorage.removeItem('note:a')
save('a', 'hello')
return load('a') === 'hello'
  ? true
  : 'saveNote("a", "hello") should be readable back as loadNote("a") === "hello".'`,
                },
                {
                  id: 'ex-js-note-store-t2',
                  label: 'Saving again overwrites rather than appending',
                  body: `var save = window.saveNote
var load = window.loadNote
if (typeof save !== 'function' || typeof load !== 'function') return 'Define saveNote and loadNote as function declarations.'
save('a', 'first')
save('a', 'second')
return load('a') === 'second'
  ? true
  : 'Saving the same key twice must replace the value, loadNote("a") reads ' + JSON.stringify(load('a')) + '.'`,
                },
                {
                  id: 'ex-js-note-store-t3',
                  label: 'Every key is namespaced with note:',
                  body: `var save = window.saveNote
if (typeof save !== 'function') return 'Define saveNote as a function declaration.'
localStorage.removeItem('note:a')
localStorage.removeItem('note:b')
save('a', 'one')
save('b', 'two')
var names = []
for (var i = 0; i < localStorage.length; i++) {
  var k = localStorage.key(i)
  if (k && k.indexOf('note:') === 0) names.push(k)
}
return names.length === 2
  ? true
  : 'Prefix every key with "note:" so one feature can clear its own data, found ' + names.length + ' namespaced keys.'`,
                },
                {
                  id: 'ex-js-note-store-t4',
                  label: 'Clearing removes that key and nothing else',
                  body: `var save = window.saveNote
var load = window.loadNote
var clear = window.clearNote
if (typeof save !== 'function' || typeof load !== 'function' || typeof clear !== 'function') return 'Define saveNote, loadNote and clearNote as function declarations.'
save('a', 'x')
save('b', 'y')
clear('a')
return load('a') === '' && load('b') === 'y'
  ? true
  : 'clearNote("a") should remove only note:a, and leave note:b alone.'`,
                },
              ],
              hints: [
                'Build the real key once per function: const full = "note:" + key.',
                'loadNote should handle the miss: `const raw = localStorage.getItem(full); return raw === null ? "" : raw`.',
                'A try and catch around the body of each function is what keeps a disabled or full store from taking the page down with it.',
              ],
              solution: {
                javascript: `function saveNote(key, text) {
  try {
    localStorage.setItem('note:' + key, text)
  } catch (error) {
    console.warn('Could not save the note', error)
  }
}

function loadNote(key) {
  try {
    const raw = localStorage.getItem('note:' + key)
    return raw === null ? '' : raw
  } catch (error) {
    return ''
  }
}

function clearNote(key) {
  try {
    localStorage.removeItem('note:' + key)
  } catch (error) {
    console.warn('Could not clear the note', error)
  }
}`,
              },
              testNotes:
                'The tests clean up the keys they use first, so they do not depend on what you saved in a previous run. They call your functions directly, which means they must be function declarations at the top level of the script — a const arrow function would not be reachable as window.loadNote.',
            },
          },
        ],
      },
    ],
  },
]
