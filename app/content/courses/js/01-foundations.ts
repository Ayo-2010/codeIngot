import type { Section } from '~/types/content'

export const jsFoundationsSections: Section[] = [
  {
    id: 'js-s1',
    title: 'Getting started',
    description:
      'What JavaScript adds to a page, what the browser does with a script the moment it loads, and how to use the console while you work.',
    lessons: [
      {
        id: 'js-l1',
        title: 'What JavaScript is and how it runs',
        description:
          'Behaviour on top of structure and style, the browser as the runtime, and your first log line.',
        duration: 5,
        objectives: [
          'Say what JavaScript adds that HTML and CSS cannot',
          'Place a script correctly and know why position matters',
          'Use the console as your first debugging tool',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l1',
          title: 'What JavaScript is and how it runs quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l1-q1',
              type: 'multiple-choice',
              prompt: 'A button on a working-looking page does nothing when clicked. Where do you look first?',
              options: [
                'The console, because a JavaScript error leaves the HTML and CSS untouched',
                'The HTML file, because a broken script usually deletes its markup',
                'The CSS, because scripts cannot attach to styled elements',
                'Nothing — this is a known browser bug with buttons',
              ],
              answer: 0,
              explanation: 'A script that throws stops at the error; everything the browser has already drawn stays drawn. That is why the page can look perfect and do nothing. The console names the failing line, and the error message usually contains the exact identifier that went wrong.',
            },
            {
              id: 'quiz-js-l1-q2',
              type: 'true-false',
              prompt: 'A script in `<head>` and the same script at the end of `<body>` behave identically, because JavaScript runs wherever it is written.',
              answer: false,
              explanation: 'A plain inline script runs the instant the parser reaches it. At the top of the `body` the elements below it do not exist yet, so a lookup finds nothing. `defer` and `type="module"` both hold the script until the document has been parsed.',
            },
            {
              id: 'quiz-js-l1-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'function shout() {\n  return \'hi\'\n}\n\nconsole.log(shout)',
              options: [
                'hi',
                'undefined',
                '"function shout() { return \'hi\' }"',
                'an empty string',
              ],
              answer: 2,
              explanation: '`shout` on its own is the function value, not the result of calling it. Nothing is printed until the parentheses appear — that is the difference between defining something and running it.',
            },
            {
              id: 'quiz-js-l1-q4',
              type: 'identify-error',
              prompt: 'Which name cannot be used as a variable?',
              code: 'const 2ndPlace = \'Bo\'\nlet class = \'JavaScript\'',
              options: [
                '`2ndPlace`, because a name cannot begin with a digit',
                '`class`, because it is a reserved word',
                'Both, because names must be camelCase',
                'Neither — both are valid names',
              ],
              answer: 0,
              explanation: 'A name may contain letters, digits, `$` and `_`, but it may not start with a digit — the parser cannot tell where the name ends. `class` is also illegal, since reserved words cannot be identifiers at all. Note the two errors are independent: fix both.',
            },
            {
              id: 'quiz-js-l1-q5',
              type: 'blank',
              prompt: 'Which two characters start a comment that runs to the end of the line?',
              answers: [
                '//',
                'slash slash',
                'two slashes',
              ],
              explanation: 'A double slash comments out the rest of the line, which is why it is the everyday choice and the fastest way to park a line while you bisect a bug. A block comment uses `/*` and `*/` and can span lines.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l1-b1',
            body: 'Everything on the web is three layers stacked on top of each other, and only the top one reacts. The card below already has markup and a style. What it does not have is behaviour — nothing happens when you press the button. That missing piece is the whole of JavaScript, and it is a small layer: one file of plain text that the browser reads and runs while the page is open.',
          },
          {
            type: 'tip',
            id: 'j-l1-dt',
            title: 'How to open the developer tools',
            body: 'Press **F12**, or **Ctrl + Shift + I** on Windows and Linux / **Cmd + Option + I** on Mac, or right-click the page and choose **Inspect**. The **Console** panel shows `console.log` output, warnings and errors, and you can type an expression there and press Enter to run it. The **Elements** panel, beside it, shows the live DOM the browser built.',
          },
          {
            type: 'demo',
            id: 'j-l1-d1',
            title: 'One button, one listener, zero attributes in the markup',
            body: 'Press the button. The markup and the styling are yours from the previous layers; the only new part is the three lines at the bottom, which attach behaviour after the page has already been drawn.',
            html: `<article class="card">
  <h3>codeIngot</h3>
  <p id="status">Nothing has happened yet.</p>
  <button type="button" id="go">Add to basket</button>
</article>`,
            css: `.card { border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; font-family: system-ui, sans-serif; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.card p { margin: 0 0 0.75rem; }
button { padding: 0.4rem 0.7rem; }`,
            javascript: `const status = document.querySelector('#status')
let count = 0

document.querySelector('#go').addEventListener('click', function () {
  count = count + 1
  status.textContent = count + ' item(s) in the basket'
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'j-l1-b2',
            body: 'HTML gives a document structure, CSS gives it a look, and JavaScript is what makes it *respond*. It is the layer that decides what happens when someone clicks a button, when a value in a form passes a check, or when a request comes back. Nothing you do in JavaScript changes what an element **is** — it changes what the element does.',
          },
          {
            type: 'heading',
            id: 'j-l1-h1',
            level: 3,
            body: 'Where your code actually runs',
          },
          {
            type: 'list',
            id: 'j-l1-l1',
            style: 'bullet',
            items: [
              '**The browser is the runtime.** It reads your script, keeps your variables in memory while the page is open, and throws them away when you navigate away.',
              '**The console is part of the browser**, not a separate tool. It is where values, warnings and errors surface, and where you inspect what your code did.',
              '**There is no compile step.** The file you write is the text the browser receives, character for character. That is why a typo is a runtime failure instead of a build error.',
              '**The same code runs in the preview pane here**, inside a sandboxed frame, so a mistake stays a mistake on this page.',
            ],
          },
          {
            type: 'text',
            id: 'j-l1-b3',
            body: 'Where you type: every lesson with a live preview has an **HTML tab** and a **JavaScript tab**. Edit the HTML tab for markup and CSS-in-markup, the JavaScript tab for anything that computes or responds. Run the code and the preview appears beside the tabs; errors and `console.log` output show up in the panel underneath.',
          },
          {
            type: 'heading',
            id: 'j-l1-h2',
            level: 3,
            body: 'Putting a script on the page',
          },
          {
            type: 'code',
            id: 'j-l1-c1',
            language: 'html',
            title: 'A script at the end of the body',
            code: `<h1 id="title">Shop</h1>
<button type="button" id="go">Add to basket</button>

<script>
  document.querySelector('#title').textContent = 'Welcome back';
</script>`,
          },
          {
            type: 'code',
            id: 'j-l1-c2',
            language: 'html',
            title: 'The two attributes worth knowing',
            code: `<!-- wait for the HTML to be parsed before running -->
<script src="app.js" defer></script>

<!-- a module is always deferred, and gets its own scope -->
<script type="module" src="app.js"></script>`,
          },
          {
            type: 'tip',
            id: 'j-l1-t1',
            title: 'Why position matters',
            body: 'A plain inline script runs *immediately*, the moment the parser reaches it. Put it at the top of the `body` and it runs before the elements below it exist, so `document.querySelector` finds nothing. `defer` (and `type="module"`, which is deferred by default) holds the script until the document has been parsed, which is why external scripts prefer it.',
          },
          {
            type: 'heading',
            id: 'j-l1-h3',
            level: 3,
            body: 'console.log, and what the console is for',
          },
          {
            type: 'code',
            id: 'j-l1-c3',
            language: 'javascript',
            title: 'Printing a value',
            code: `const total = 12.5 * 4
console.log('total is', total)

const user = { name: 'Ada', visits: 3 }
console.log(user)     // the console expands objects for you`,
          },
          {
            type: 'text',
            id: 'j-l1-b4',
            body: '`console.log` is not output for a visitor — nobody sees it. It is for **you**. Use it to answer a question you could not answer by reading the code: what is in that variable at this exact line, did that branch run, is the number `NaN`. The browser collects every line, so you can leave a few in while you work and delete them before you finish.',
          },
          {
            type: 'warning',
            id: 'j-l1-w1',
            title: 'Broken JavaScript does not break the page',
            body: 'A script that throws leaves the HTML and CSS exactly as they were. The visitor sees a page that is styled and readable but silently unresponsive, and the only evidence is one red line in the console. That gap between "looks fine" and "does nothing" is the single most common way people lose hours — check the console first when a button does nothing.',
          },
          {
            type: 'example',
            id: 'j-l1-e1',
            title: 'One line of JavaScript changing the page',
            body: 'The button below has no `onclick` attribute in the markup you can see. The script finds it, and attaches a listener instead.',
            html: `<p id="out">waiting…</p>
<button type="button" id="go">Say hello</button>`,
            javascript: `const button = document.querySelector('#go')

button.addEventListener('click', function () {
  document.querySelector('#out').textContent = 'Hello from JavaScript'
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l1-x1',
            exercise: {
              id: 'ex-js-first-log',
              instructions:
                'Declare a `const` called `site` holding the string "codeIngot". Declare a `let` called `count` holding 3, then raise `count` by 2. Log both values in a single `console.log` call, site first.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Declare site as a const string, and count as a let number.
// Then raise count by 2 and log both values.

`,
              },
              expectedOutput: 'codeIngot 5',
              tests: [
                {
                  id: 'ex-js-first-log-t1',
                  label: 'site holds the string "codeIngot"',
                  body: `return typeof site !== 'undefined' && site === 'codeIngot'
  ? true
  : 'Declare it as: const site = "codeIngot"';`,
                },
                {
                  id: 'ex-js-first-log-t2',
                  label: 'count ends up as the number 5',
                  body: `return typeof count !== 'undefined' && count === 5
  ? true
  : 'Start count at 3 and then add 2 to it.';`,
                },
                {
                  id: 'ex-js-first-log-t3',
                  label: 'Both values were logged on one line',
                  body: `var log = window.__log || [];
return log.length > 0 && log[log.length - 1] === 'codeIngot 5'
  ? true
  : 'Expected one console line reading "codeIngot 5", got: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'Start with `const site = "codeIngot"` on its own line.',
                '`let count = 3` gives you a number you are allowed to change. A second line raises it: `count = count + 2`.',
                'One call with two arguments prints both, separated by a space: `console.log(site, count)`.',
              ],
              solution: {
                javascript: `const site = 'codeIngot'
let count = 3

count = count + 2

console.log(site, count)`,
              },
              testNotes:
                'The checks read the variables in the page and the last console line. They cannot see whether your comments explain anything.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s2',
    title: 'Introduction',
    description:
      'The jobs JavaScript does in a real page, the ones it cannot do, and how to tell a library apart from a language.',
    lessons: [
      {
        id: 'js-l2',
        title: 'What JavaScript can do',
        description:
          'Read and change the page, react to the user, fetch and store data, and know where the language stops.',
        duration: 6,
        objectives: [
          'Name the four jobs JavaScript does on a page',
          'Describe the one thing it cannot do that catches beginners',
          'Tell the language apart from the libraries built on it',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-js-l2',
          title: 'What JavaScript can do quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l2-q1',
              type: 'multiple-choice',
              prompt: 'Which job can JavaScript not do on its own?',
              options: [
                'Read a value out of the page',
                'Change the text of an element',
                'Read a row from the database directly',
                'React to a click',
              ],
              answer: 2,
              explanation: 'The script runs on the visitor\'s machine, not on the server, so the database is simply not reachable from it. Reading or writing data means a request to a server, and the server decides what to return — which is also why an API key in a script is a key you must treat as public.',
            },
            {
              id: 'quiz-js-l2-q2',
              type: 'true-false',
              prompt: 'A page with ten event listeners attached but no event fired yet looks exactly like the same page with no JavaScript.',
              answer: true,
              explanation: 'Listeners are just registrations. Nothing in the DOM changes until a handler runs, so the page renders identically. This is worth knowing when a page "looks broken but nothing is wrong" — the code is loaded, it simply has not been triggered.',
            },
            {
              id: 'quiz-js-l2-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const field = document.querySelector(\'#search\')\nconsole.log(field ? \'found\' : \'missing\')',
              options: [
                'found',
                'missing',
                'undefined',
                'It throws a TypeError',
              ],
              answer: 0,
              explanation: '`querySelector` returns `null` when nothing matches, and a missing element is falsy rather than an error — so the ternary takes the `found` branch only when the element is really there. An empty or absent id is why the rest of this course checks before it reads.',
            },
            {
              id: 'quiz-js-l2-q4',
              type: 'blank',
              prompt: 'Name the JavaScript job that has to wait for the network: the one that asks a server for data the original HTML did not contain.',
              answers: [
                'fetch',
                'Fetch',
                'the fetch',
                'fetching',
              ],
              explanation: 'Fetching is the only job that waits. Reading, changing and reacting all happen immediately against what is already in the page, which is why they are the ones you can debug by staring at the DOM.',
            },
            {
              id: 'quiz-js-l2-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this list of the four jobs?',
              code: 'const jobs = [\'read\', \'change\', \'react\', \'refresh\']',
              options: [
                'Nothing — refreshing the page is the fourth job',
                'The fourth job is "fetch", not "refresh"; a reload throws away the page you were working on',
                '"read" and "change" are the same job',
                'The array must be an object to be iterated',
              ],
              answer: 1,
              explanation: 'The fourth job is fetching data from a server. Reloading is the opposite of the point: it discards every variable and every listener, taking you back to the state the server sent. That is why modern pages change the DOM instead of reloading it.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l2-b1',
            body: 'JavaScript has four jobs on a web page, and every script you will ever write is doing at least one of them: **read** the page and the data in it, **change** the page, **react** to what the user does, and **fetch** things that are not there yet. The demo below does three of the four in eight lines. The fourth one needs the network, so it gets its own lesson.',
          },
          {
            type: 'demo',
            id: 'j-l2-d1',
            title: 'Read, change, react',
            body: 'The input starts empty and the list is empty. Type a word, press Add: the script reads the input, reacts to the click, and changes the list. No refresh, no form submission — the page never reloads, which is what "dynamic" means.',
            html: `<div class="row">
  <input id="word" type="text" placeholder="a word" />
  <button type="button" id="add">Add</button>
</div>
<ul id="list"></ul>`,
            css: `body { font-family: system-ui, sans-serif; }
.row { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
ul { margin: 0; padding-left: 1.1rem; }`,
            javascript: `const list = document.querySelector('#list')

document.querySelector('#add').addEventListener('click', function () {
  const value = document.querySelector('#word').value.trim()
  if (!value) return

  const item = document.createElement('li')
  item.textContent = value
  list.appendChild(item)
  document.querySelector('#word').value = ''
})`,
            height: 240,
          },
          {
            type: 'heading',
            id: 'j-l2-h1',
            level: 3,
            body: 'The four jobs',
          },
          {
            type: 'list',
            id: 'j-l2-l1',
            style: 'bullet',
            items: [
              '**Read.** Pull a value out of the page — what is in `#search`, what a checkbox is set to, what the URL says. `querySelector` returns the element; `.value` returns the text a person typed.',
              '**Change.** Write to the page: `textContent` for text, `classList` for styling, `appendChild` for new markup. This is the layer CSS cannot reach, because CSS cannot know what happened.',
              '**React.** Attach a listener so behaviour appears only when it is needed. The handler runs later, which is why a page with ten listeners and none of them fired yet looks exactly like a page with no JavaScript at all.',
              '**Fetch.** Ask a server for data that was not in the original HTML and insert it when it arrives. This is the only one of the four that has to wait for anything.',
            ],
          },
          {
            type: 'code',
            id: 'j-l2-c1',
            language: 'javascript',
            title: 'The same four jobs in one block',
            code: `const field = document.querySelector('#search')   // read
field.addEventListener('input', function () {
  document.querySelector('#results').textContent = 'Searching for ' + field.value
})

const data = await fetch('/api/items')      // fetch
const items = await data.json()

for (const item of items) {
  const row = document.createElement('li')
  row.textContent = item.name              // change
  document.querySelector('#results').appendChild(row)
}`,
          },
          {
            type: 'heading',
            id: 'j-l2-h2',
            level: 3,
            body: 'The one thing it cannot do',
          },
          {
            type: 'warning',
            id: 'j-l2-w1',
            title: 'JavaScript cannot touch what is already on the server',
            body: 'Everything here runs in the visitor\'s browser, on the visitor\'s machine. A script can read and change that page; it cannot read a file on the server, and it cannot see another page the visitor has open. When you need something the browser does not have — the database, another user\'s data, a secret API key — the script has to ask a server, and the server decides what to send back. This is why "JavaScript can read my database" is not a thing, and why a key pasted into a script is a key you have to treat as public.',
          },
          {
            type: 'text',
            id: 'j-l2-b2',
            body: 'The other limit people forget: **order is only guaranteed top to bottom**. Code that must happen *after* something else has to say so, either by being written below it or by being called from it. That is not a JavaScript quirk so much as the honest consequence of running one line at a time, and it is why `async` functions exist — they let you say "I will come back to this line later" without reordering everything above it.',
          },
          {
            type: 'tip',
            id: 'j-l2-t1',
            title: 'The language is not the library',
            body: 'JavaScript is a language with no opinions about how you build things. React, Vue and jQuery are libraries *written in* it — someone else\'s code you download and call. Nothing in this course needs one, and every one of them was built on the same four jobs above. Learn the language first and a library stops being a mystery you have to memorise.',
          },
          {
            type: 'heading',
            id: 'j-l2-h3',
            level: 3,
            body: 'Where it already runs on a page you use',
          },
          {
            type: 'code',
            id: 'j-l2-c2',
            language: 'plaintext',
            title: 'One page, four scripts',
            code: `<head>
  <script src="analytics.js"></script>          <!-- react: track the click -->
  <link rel="stylesheet" href="styles.css" />
  <script src="cart.js" defer></script>       <!-- read + change: the basket count -->
</head>
<body>
  <!-- the content -->
  <script src="carousel.js"></script>          <!-- react: the next/prev arrows -->
</body>`,
          },
          {
            type: 'text',
            id: 'j-l2-b3',
            body: 'Real pages ship several scripts, and the order is chosen deliberately. Analytics wants to be early so it catches everything, the basket needs `defer` so the elements it looks for exist, and the carousel is fine at the end because nothing has to have happened before it. Choosing the position is part of choosing where a script goes, which is the next lesson.',
          },
          {
            type: 'example',
            id: 'j-l2-e1',
            title: 'The page reacting without a reload',
            body: 'Change the slider and watch the number. Nothing is submitted and nothing is fetched — this is the "react" job on its own.',
            html: `<label for="n">Quantity</label>
<input id="n" type="range" min="1" max="5" value="1" />
<p id="out">1 item(s)</p>`,
            javascript: `document.querySelector('#n').addEventListener('input', function () {
  document.querySelector('#out').textContent = this.value + ' item(s)'
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l2-x1',
            exercise: {
              id: 'ex-js-what-can-do',
              instructions:
                'Declare a `const` called `jobs` holding an array of the four JavaScript jobs as strings: exactly "read", "change", "react", "fetch", in that order. Then log the number of jobs in the array.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// An array holding four strings: read, change, react, fetch.
// Then log how many jobs it holds.

`,
              },
              expectedOutput: '4',
              tests: [
                {
                  id: 'ex-js-what-can-do-t1',
                  label: 'jobs is an array of four strings',
                  body: `return Array.isArray(jobs) && jobs.length === 4
  ? true
  : 'Declare jobs as an array holding four items.';`,
                },
                {
                  id: 'ex-js-what-can-do-t2',
                  label: 'The four jobs are in the right order',
                  body: `if (!Array.isArray(jobs)) return 'Declare jobs as an array holding four items.'
return jobs.join(',') === 'read,change,react,fetch'
  ? true
  : 'The order matters: "read,change,react,fetch".'`,
                },
                {
                  id: 'ex-js-what-can-do-t3',
                  label: 'The count was logged',
                  body: `var log = window.__log || [];
return log.length > 0 && String(log[log.length - 1]) === '4'
  ? true
  : 'Log jobs.length and expect the line 4. Logged: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'An array literal is square brackets with commas between: `const jobs = ["read", "change"]`.',
                'The order is read, then change, then react, then fetch — read and fetch both feed the other two.',
                '`console.log(jobs.length)` prints the number of items in the array.',
              ],
              solution: {
                javascript: `const jobs = ['read', 'change', 'react', 'fetch']

console.log(jobs.length)`,
              },
              testNotes:
                'The checks look at the array you built and the last console line. The count has to come from the array, not from a typed-in 4.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s3',
    title: 'Where To',
    description:
      'Inline, external, deferred, module: which script tag to reach for, and what breaks when you pick the wrong one.',
    lessons: [
      {
        id: 'js-l3',
        title: 'Where to put JavaScript',
        description:
          'The four ways to get a script onto a page, and the timing difference that decides between them.',
        duration: 6,
        objectives: [
          'Pick between inline, external, deferred and module scripts',
          'Explain why a top-of-body script finds nothing',
          'Attach a listener to the document for code that must run after loading',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-js-l3',
          title: 'Where to put JavaScript quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l3-q1',
              type: 'multiple-choice',
              prompt: 'An external script with no attributes sits at the top of `<body>` and `document.querySelector("#total")` returns null. Why?',
              options: [
                '`querySelector` only works inside `<script>` tags at the end of the page',
                'The script ran before the parser reached that element, so the element did not exist yet',
                'External scripts cannot use the document object at all',
                'The id is wrong — `#total` only matches ids on form fields',
              ],
              answer: 1,
              explanation: 'A plain script with no attributes blocks and runs the instant the parser reaches it. Anything further down the document has not been built at that moment, so the lookup correctly returns null. Add `defer`, move the tag to the bottom, or listen for `DOMContentLoaded`.',
            },
            {
              id: 'quiz-js-l3-q2',
              type: 'true-false',
              prompt: '`<script type="module" src="app.js"></script>` in `<head>` will run before the page has been parsed, because module scripts are smaller.',
              answer: false,
              explanation: 'Module scripts are deferred by default — that is part of what `type="module"` means, not an accident of file size. They also get their own scope, strict mode, and the ability to import. If you add `defer` as well it changes nothing.',
            },
            {
              id: 'quiz-js-l3-q3',
              type: 'blank',
              prompt: 'Which attribute makes an external script wait until the document has been parsed before it runs?',
              answers: [
                'defer',
                'Defer',
                'DEFER',
                'the defer attribute',
              ],
              explanation: '`defer` downloads the file in parallel with the HTML and runs it once parsing is done. That is both safer and faster than putting the tag at the bottom, where the browser cannot start the download until it reads that line.',
            },
            {
              id: 'quiz-js-l3-q4',
              type: 'identify-error',
              prompt: 'What goes wrong when this page loads?',
              code: '<script src="theme.js"></script>\n<script src="cart.js"></script>',
              options: [
                'Nothing, two scripts are always fine',
                'Both files declare `const app = {}` at the top level, so the second one fails with a redeclaration error',
                'Scripts cannot be loaded from the same folder',
                'The second script never runs because the first blocks it',
              ],
              answer: 1,
              explanation: 'Two classic scripts share one global scope, so the same `const` name declared twice is a SyntaxError and the second file never runs a single line. Split by job and use `type="module"`, where each file has its own scope and the collision becomes impossible.',
            },
            {
              id: 'quiz-js-l3-q5',
              type: 'code-output',
              prompt: 'What does this print, and when?',
              code: '<script src="app.js" defer></script>\n<h1 id="title">Shop</h1>\n\n<script>\n  console.log(document.querySelector(\'#title\') !== null)\n</script>',
              options: [
                'true, after the document is parsed',
                'false, because the inline script runs during parsing',
                'false, because `defer` removes the element',
                'true, before the heading is drawn',
              ],
              answer: 1,
              explanation: 'The inline script has no attributes, so it runs the moment the parser reaches it — at which point the heading below it does not exist. The deferred script runs after parsing, when it would find the element. This is the exact ordering problem `defer` exists to remove.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l3-b1',
            body: 'There are only four realistic places for a script, and they differ in one thing: **when** the code runs. That single difference is responsible for most of the "my script is not running" bugs you will hit, because the code has run perfectly and simply ran before the thing it needed existed. The demo below loads a script from the very top of the body, so you can watch it fail.',
          },
          {
            type: 'demo',
            id: 'j-l3-d1',
            title: 'A script too early, then the same script late',
            body: 'The script below is positioned exactly where a script lands by default: the instant the parser reaches it. The element it looks for has not been built yet, so the log says so. Add `defer` or move the script below the markup and the same two lines succeed.',
            html: `<p id="msg">This element is below the script.</p>`,
            javascript: `// the same two lines, run at two different moments
var msg = document.querySelector('#msg')
console.log(msg ? 'found it' : 'the element did not exist yet')`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'j-l3-h1',
            level: 3,
            body: 'The four options',
          },
          {
            type: 'list',
            id: 'j-l3-l1',
            style: 'bullet',
            items: [
              '**Inline in the body, at the bottom.** No extra file, no extra request, and the parser has already built every element above it. The right choice for a few lines, and the easiest thing to debug.',
              '**External with `defer`.** One cached file for every page, and it waits until the document is parsed. This is the default answer for a real site.',
              '**External as a module.** `type="module"` implies `defer`, adds automatic strict mode, gives the file its own scope, and lets you `import` other files. Two scripts that need to share a name must be modules, because modules cannot see top-level names from each other.',
              '**Inline in the head, blocking.** Runs before anything else, so it delays the whole page. Justified only when the code genuinely must run before the page renders — an analytics beacon that has to catch a fast bounce, for instance.',
            ],
          },
          {
            type: 'code',
            id: 'j-l3-c1',
            language: 'html',
            title: 'Three scripts, three reasons',
            code: `<head>
  <!-- blocking, runs before anything renders: a beacon must catch the first second -->
  <script src="analytics.js"></script>
</head>
<body>
  <h1 id="title">Shop</h1>

  <!-- deferred: waits for the document, runs before DOMContentLoaded fires -->
  <script src="app.js" defer></script>

  <!-- a module: also deferred, and its scope is its own -->
  <script type="module" src="cart.js"></script>
</body>`,
          },
          {
            type: 'code',
            id: 'j-l3-c2',
            language: 'javascript',
            title: 'The blocking case, and what it costs',
            code: `// In <head>, no defer: this pauses the parser and runs first.
document.title = 'Shop'

// The parser has not reached <h1 id="title"> yet.
const title = document.querySelector('#title')
console.log(title)   // null`,
          },
          {
            type: 'tip',
            id: 'j-l3-t1',
            title: 'Why defer and not just move it to the bottom?',
            body: 'Both wait for the elements, but `defer` also downloads in parallel with the HTML. The file arrives while the parser is still working, so by the time the document is finished the script is already sitting in memory and runs immediately. Moving the tag to the bottom means the browser cannot start fetching until it has read that line, which is a slower version of the same idea.',
          },
          {
            type: 'warning',
            id: 'j-l3-w1',
            title: 'One script, one job',
            body: 'Two external scripts that both declare `const app = 1` in the global scope will collide, and the second one fails before your code runs at all. It looks like a bug in your logic and is really a packaging problem. Keep files split by job, and use modules so the scope is private — then the collision cannot happen.',
          },
          {
            type: 'heading',
            id: 'j-l3-h2',
            level: 3,
            body: 'When the script has to come first',
          },
          {
            type: 'text',
            id: 'j-l3-b2',
            body: 'Sometimes the position is decided by the file, not the timing. A script that must be first — a polyfill for a browser feature the rest of the code assumes exists, a consent banner, an analytics beacon that has to fire before anyone navigates away — goes at the top of `head` with no `defer`. Everything else waits. The useful test is: does any *other* code depend on this one having run already? If not, it waits.',
          },
          {
            type: 'code',
            id: 'j-l3-c3',
            language: 'html',
            title: 'A polyfill that genuinely must go first',
            code: `<!-- everything below may call structuredClone, so it has to exist first -->
<script src="polyfills.js"></script>

<script type="module" src="app.js"></script>`,
          },
          {
            type: 'example',
            id: 'j-l3-e1',
            title: 'Listening for the document instead of guessing where to be',
            body: 'This listener fires whenever the page has finished parsing, wherever the script tag happens to sit. It is the way to write code that cannot be defeated by being moved.',
            html: `<p id="out">waiting…</p>`,
            javascript: `document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#out').textContent =
    'the document was ready when this ran'
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l3-x1',
            exercise: {
              id: 'ex-js-script-placement',
              instructions:
                'Write a `const` called `appScript` holding the string "defer", and a `const` called `inlineScript` holding the string "bottom of body". Then log the two in one call, `inlineScript` first.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// appScript holds "defer".
// inlineScript holds "bottom of body".
// Then log inlineScript, then appScript, on one line.

`,
              },
              expectedOutput: 'bottom of body defer',
              tests: [
                {
                  id: 'ex-js-script-placement-t1',
                  label: 'appScript holds "defer"',
                  body: `return typeof appScript !== 'undefined' && appScript === 'defer'
  ? true
  : 'Declare it as: const appScript = "defer"';`,
                },
                {
                  id: 'ex-js-script-placement-t2',
                  label: 'inlineScript holds "bottom of body"',
                  body: `return typeof inlineScript !== 'undefined' && inlineScript === 'bottom of body'
  ? true
  : 'Declare it as: const inlineScript = "bottom of body"';`,
                },
                {
                  id: 'ex-js-script-placement-t3',
                  label: 'They were logged on one line, inlineScript first',
                  body: `var log = window.__log || [];
return log.length > 0 && log[log.length - 1] === 'bottom of body defer'
  ? true
  : 'Expected one console line reading "bottom of body defer", got: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'Two declarations, two lines: `const appScript = "defer"` and `const inlineScript = "bottom of body"`.',
                'A `const` string needs the quotes, and so do the spaces inside it.',
                'One call with two arguments prints both in order, separated by a space: `console.log(inlineScript, appScript)`.',
              ],
              solution: {
                javascript: `const appScript = 'defer'
const inlineScript = 'bottom of body'

console.log(inlineScript, appScript)`,
              },
              testNotes:
                'The checks read both variables and the last console line. The order of the two values matters, because the order of the two scripts is the point of the lesson.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s4',
    title: 'Output',
    description:
      'The three ways to show something in JavaScript, why two of them are traps, and what to reach for instead.',
    lessons: [
      {
        id: 'js-l4',
        title: 'Displaying output',
        description:
          'console.log for yourself, textContent for the visitor, and why document.write is a trap.',
        duration: 5,
        objectives: [
          'Choose between console.log, textContent and alert',
          'Explain why document.write is not a debugging tool',
          'Read a value back out of the DOM to confirm a change landed',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l4',
          title: 'Displaying output quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l4-q1',
              type: 'multiple-choice',
              prompt: 'A visitor\'s name came from a form and must be shown on the page. Which line is correct?',
              options: [
                '`el.innerHTML = name`, because it always escapes the value safely',
                '`el.textContent = name`, because the value is inserted as text and never parsed as markup',
                '`document.write(name)`',
                '`alert(name)`',
              ],
              answer: 1,
              explanation: '`textContent` inserts characters; `innerHTML` parses its argument as markup, so a name containing a tag becomes part of the document. Any value you did not write yourself goes through `textContent`.',
            },
            {
              id: 'quiz-js-l4-q2',
              type: 'true-false',
              prompt: 'Assigning to `element.textContent` replaces every child element inside that element.',
              answer: true,
              explanation: '`textContent` is a setter for the text of the node, so writing to it throws away the existing children. That is convenient for a status line and destructive for a container you meant to fill — in that case add children instead of writing text.',
            },
            {
              id: 'quiz-js-l4-q3',
              type: 'identify-error',
              prompt: 'What happens on the second call to this line?',
              code: 'document.write(\'loading...\')\n// ... a second document.write call later in a click handler\ndocument.write(\'done\')',
              options: [
                'It appends "done" below "loading..."',
                'It replaces the entire document with the text "done"',
                'It logs "done" to the console',
                'It throws a ReferenceError',
              ],
              answer: 1,
              explanation: 'After the page has loaded there is no parser position to write into, so `document.write` replaces the whole document. That is why the debugging reflex belongs on `console.log`, which can only ever add a line.',
            },
            {
              id: 'quiz-js-l4-q4',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const total = 50\nconsole.log(total)\nconsole.log(\'total =\', total)',
              options: [
                '50, then total = 50',
                'total = 50, twice',
                '50, then "total = 50"',
                'Nothing, because total is a number',
              ],
              answer: 0,
              explanation: 'A bare `console.log` prints the value with no label, so the first line is just `50`. The second call has two arguments, so the console shows the string and the number separated by a space. Labelling the value is what makes a long log readable.',
            },
            {
              id: 'quiz-js-l4-q5',
              type: 'blank',
              prompt: 'Which property reads the text back out of an element, so you can confirm a write actually landed?',
              answers: [
                'textContent',
                'innerText',
                'textcontent',
                '.textContent',
              ],
              explanation: 'Reading `element.textContent` gives you exactly what the page now holds, which is the only way to catch a typo in the selector — the writing line and the reading line take different paths through the page.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l4-b1',
            body: 'JavaScript has three ways to show output, and only two of them belong in code you write today. `console.log` is for you and only you — it goes to the developer tools and no visitor ever sees it. `textContent` on an element is for the visitor, and it is how nearly every page displays a value. The third, `document.write`, injects raw HTML at the point the parser currently is, and it is a trap with a long history of destroying the page it was meant to fill.',
          },
          {
            type: 'demo',
            id: 'j-l4-d1',
            title: 'The same message, sent two ways',
            body: 'The paragraph updates because the visitor clicked. The console line underneath prints for you only. Open the console and you will see the same value twice — through two different channels.',
            html: `<p id="out">nothing yet</p>
<button type="button" id="go">Log it</button>`,
            css: `body { font-family: system-ui, sans-serif; }
p { font-weight: 600; }`,
            javascript: `document.querySelector('#go').addEventListener('click', function () {
  var value = 3 * 14
  console.log('for you only:', value)
  document.querySelector('#out').textContent = 'for the visitor: ' + value
})`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'j-l4-h1',
            level: 3,
            body: 'console.log',
          },
          {
            type: 'code',
            id: 'j-l4-c1',
            language: 'javascript',
            title: 'The shapes you will use most',
            code: `console.log('a message')            // one string
console.log('two values:', total)     // a label plus a value
console.log([1, 2, 3])               // arrays print as a list
console.log({ id: 4, name: 'Bo' })   // objects print as key: value

console.warn('something looks odd')   // yellow, still not a failure
console.error('this one stopped us')  // red, names a real failure`,
          },
          {
            type: 'tip',
            id: 'j-l4-t1',
            title: 'Log the value, not the variable name',
            body: '`console.log(total)` prints `50`. `console.log("total =", total)` prints `total = 50`, and now the output tells you *which* value it was when you have six of them in a row. The label costs a few characters and removes the need to count lines back to the declaration.',
          },
          {
            type: 'heading',
            id: 'j-l4-h2',
            level: 3,
            body: 'Writing to the page',
          },
          {
            type: 'code',
            id: 'j-l4-c2',
            language: 'javascript',
            title: 'textContent versus innerHTML',
            code: `const out = document.querySelector('#out')

out.textContent = 'Plain <b>text</b>'   // the tags print as characters
out.innerHTML = 'Real <b>markup</b>'    // the browser builds the element

// textContent also destroys anything already inside:
out.textContent = 'replaced'            // any child element is gone`,
          },
          {
            type: 'warning',
            id: 'j-l4-w1',
            title: 'Never write user data with innerHTML',
            body: '`innerHTML` parses whatever string it is given as markup. That is fine for a string you wrote yourself and dangerous for a string that came from a person or a server: a name of `<img src=x onerror=...>` becomes code that runs. If the value is not yours, use `textContent`. The rule costs nothing and it closes off a whole category of security bug.',
          },
          {
            type: 'warning',
            id: 'j-l4-w2',
            title: 'document.write is not a debugger',
            body: 'It was the original way to put text on a page, and it still appears in old tutorials. It writes at the position the parser has reached, so calling it after load **erases the whole document you were working on**. There is no reading to fix, no variables to inspect, and the failure mode is catastrophic rather than obvious. Use `console.log`.',
          },
          {
            type: 'list',
            id: 'j-l4-l1',
            style: 'bullet',
            items: [
              '`alert(value)` — a modal box, blocks everything, impossible to style. Survives as the answer to "why does nothing happen after my alert?"',
              '`prompt(message)` — asks for a string and returns it, or `null` if the person cancels. Also blocking, also discouraged.',
              '`confirm(message)` — returns `true` or `false`. Useful for a quick delete confirmation you build yourself; rarely worth a modal.',
            ],
          },
          {
            type: 'code',
            id: 'j-l4-c3',
            language: 'javascript',
            title: 'Read it back',
            code: `const out = document.querySelector('#out')
out.textContent = 'total: 50'

// Now confirm it landed, without trusting the line that wrote it:
console.log('the page now says:', out.textContent)`,
          },
          {
            type: 'tip',
            id: 'j-l4-t2',
            title: 'Reading it back is the check worth remembering',
            body: 'The line that assigns and the line that reads are different code paths, and a typo in a selector only shows up on the second one. Logging `element.textContent` after the change tells you whether the page really holds the value you think it does — which is the answer to most "it says the old value" reports.',
          },
          {
            type: 'example',
            id: 'j-l4-e1',
            title: 'Replacing the content of a region',
            body: 'Press the button twice. Each press replaces the text rather than adding to it, because assigning to `textContent` replaces everything the element contained.',
            html: `<button type="button" id="go">Add one</button>
<p id="out">nothing yet</p>`,
            javascript: `var total = 0
document.querySelector('#go').addEventListener('click', function () {
  total = total + 1
  document.querySelector('#out').textContent = 'you have ' + total
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l4-x1',
            exercise: {
              id: 'ex-js-output',
              instructions:
                'Declare a `const` called `out` holding the string "Console and the page are different audiences". Then log it with `console.log`. Declare a `let` called `shown` holding 0, raise it to 1, and log that on a second line.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Declare out as a const string, shown as a let number.
// Log both values, out first.

`,
              },
              expectedOutput: 'Console and the page are different audiences',
              tests: [
                {
                  id: 'ex-js-output-t1',
                  label: 'out holds the required string',
                  body: `return typeof out !== 'undefined' && out === 'Console and the page are different audiences'
  ? true
  : 'Declare it as: const out = "Console and the page are different audiences"';`,
                },
                {
                  id: 'ex-js-output-t2',
                  label: 'shown ends up as the number 1',
                  body: `return typeof shown !== 'undefined' && shown === 1
  ? true
  : 'Start shown at 0 and then raise it to 1.';`,
                },
                {
                  id: 'ex-js-output-t3',
                  label: 'Both values reached the console',
                  body: `var log = window.__log || [];
return log.indexOf('Console and the page are different audiences') !== -1 && log.indexOf('1') !== -1
  ? true
  : 'Log out, then log shown, as two separate lines. Logged: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'A long string still fits on one line: `const out = "Console and the page are different audiences"`.',
                '`let shown = 0` then a second line, `shown = 1`. Two statements, two lines.',
                'Two calls: `console.log(out)` and then `console.log(shown)`.',
              ],
              solution: {
                javascript: `const out = 'Console and the page are different audiences'
let shown = 0

shown = 1

console.log(out)
console.log(shown)`,
              },
              testNotes:
                'The checks look for both console lines, in any order after they have both been printed. Nothing here is written to the page — console output is the only channel this exercise uses.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s5',
    title: 'Syntax and comments',
    description:
      'Statements as the unit of a program, the syntax rules that produce confusing errors, and comments as a working tool.',
    lessons: [
      {
        id: 'js-l5',
        title: 'Statements and syntax',
        description:
          'How a script is chopped into statements, and the small syntax rules that produce the confusing errors.',
        duration: 6,
        objectives: [
          'Separate statements with semicolons and read a statement as a unit',
          'Recognise the syntax traps that produce silent breakage',
          'Tell a statement that runs from a function that only waits',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l5',
          title: 'Statements and syntax quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l5-q1',
              type: 'code-output',
              prompt: 'What does this function return?',
              code: 'function broken() {\n  return\n  5\n}',
              options: [
                '5',
                'undefined',
                '"5"',
                'It throws a SyntaxError',
              ],
              answer: 1,
              explanation: 'The line break ends the statement right after `return`, which is legal — it just returns nothing. Then `5` on its own line is an expression statement with no effect. Keep the value on the same line, or wrap it in parentheses, which holds the statement open across the break.',
            },
            {
              id: 'quiz-js-l5-q2',
              type: 'identify-error',
              prompt: 'Which line is the mistake?',
              code: 'const price = 12.5\nlet label = \'Total: 12.5 EUR\'\nconsole.log(label, price)',
              options: [
                '`console.log` cannot print two values at once',
                'The single-quoted string contains a colon, which must be escaped',
                'Nothing — this is valid JavaScript',
                '`price` must be declared with `var` to be logged',
              ],
              answer: 2,
              explanation: 'Colons and dots are ordinary characters inside a string; only the quote that opened the string ends it. `console.log` accepts any number of arguments, and `const` is fine. Read the string carefully to see where it actually closes.',
            },
            {
              id: 'quiz-js-l5-q3',
              type: 'multiple-choice',
              prompt: 'Which of these is a definition rather than a statement that runs?',
              options: [
                '`console.log(total)`',
                '`function greet() { console.log("hi") }`',
                '`total = total + 1`',
                '`document.querySelector("#out").textContent = total`',
              ],
              answer: 1,
              explanation: 'A `function` statement registers the name and the body without running the body. Every other option performs its work the moment the line is reached. The parentheses are what turn a definition into a call.',
            },
            {
              id: 'quiz-js-l5-q4',
              type: 'true-false',
              prompt: 'Modern JavaScript always inserts a semicolon where a line break would otherwise be ambiguous, so semicolons are optional everywhere.',
              answer: false,
              explanation: 'Automatic insertion is a fallback, not a feature to lean on. It is exactly why a line break after `return` silently ends the statement: the parser supplies the semicolon you did not write. Write your own, and the whole class of ambiguity disappears.',
            },
            {
              id: 'quiz-js-l5-q5',
              type: 'multiple-choice',
              prompt: 'A string literal is missing its closing quote partway through a file. Where does the parser usually report the error?',
              options: [
                'On the line with the missing quote',
                'At the end of the file, because the string swallows every following line',
                'On the line after the string, because that is where the next statement starts',
                'Nowhere — an unclosed string is treated as a comment',
              ],
              answer: 1,
              explanation: 'An unclosed quote keeps consuming characters, including line breaks, until it finds another matching quote or reaches the end of the file. The reported position is therefore far from the real mistake, so check the quote that opened the string.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l5-b1',
            body: 'A script is a list of instructions, and each instruction is a **statement**. JavaScript runs statements top to bottom, in the order they are written — which is why a statement that reads an element has to come *after* the code that puts that element on the page. Everything on this page comes down to that sentence, so the demo below is two statements and an ordering mistake.',
          },
          {
            type: 'demo',
            id: 'j-l5-d1',
            title: 'Two statements, and why the order matters',
            body: 'The log line runs while the page loads. The line inside the function does nothing until the button is pressed. Read them as a timeline: one happens now, the other happens later, and only when something asks.',
            html: `<p id="out">waiting…</p>
<button type="button" id="go">Run the second statement</button>`,
            css: `body { font-family: system-ui, sans-serif; }`,
            javascript: `console.log('statement 1: runs now, while the page loads')

function second() {
  console.log('statement 2: runs only when called')
}

document.querySelector('#go').addEventListener('click', second)`,
            height: 170,
          },
          {
            type: 'text',
            id: 'j-l5-b2',
            body: 'A program is a list of instructions, and each instruction is a **statement**. `let a, b, c` is one statement that declares three names. `a = 5` is another. `console.log(total)` is a third, and it does its work the instant the line is reached — while `function draw() { … }` only puts the name `draw` into memory, with nothing inside the braces happening until something calls it.',
          },
          {
            type: 'code',
            id: 'j-l5-c1',
            language: 'javascript',
            title: 'Statements, one per line',
            code: `const width = 3
const height = 4
const area = width * height

console.log('the area is', area)`,
          },
          {
            type: 'text',
            id: 'j-l5-b3',
            body: 'The semicolon ends a statement. Modern JavaScript can often infer where a statement ends, so you will meet plenty of code without semicolons — but end yours with one. It costs a keystroke and it removes an entire category of bug where a line break changes what the code means.',
          },
          {
            type: 'heading',
            id: 'j-l5-h1',
            level: 3,
            body: 'Syntax rules that catch beginners',
          },
          {
            type: 'list',
            id: 'j-l5-l1',
            style: 'bullet',
            items: [
              '**Case matters.** `total`, `Total` and `TOTAL` are three different names, and a capitalised typo gives you `total is not defined`.',
              '**Reserved words are off limits** as names. You cannot call a variable `class`, `for`, `if`, `const`, `let`, `new`, `function` or `return`. Pick something else and say what it means.',
              '**Names cannot start with a digit** and cannot contain a hyphen, because `my-thing` reads as `my` minus `thing`. Use `myThing`, `my_thing` or `thing-count`.',
              '**Strings need their closing quote.** A single quote left unescaped inside a string swallows every following line, and the error points at the end of the file instead of at the real mistake.',
              '**Whitespace is free — almost everywhere.** Indentation and blank lines are for humans. The exception is a line break that could continue a statement, where JavaScript quietly adds a semicolon for you.',
            ],
          },
          {
            type: 'code',
            id: 'j-l5-c2',
            language: 'javascript',
            title: 'The one line break that is not free',
            code: `// returns undefined: the line break ends the statement after return
function broken() {
  return
  5
}

// returns 5: the opening paren keeps the statement going
function working() {
  return (
    5
  )
}`,
          },
          {
            type: 'heading',
            id: 'j-l5-h2',
            level: 3,
            body: 'Runs now, or waits for a call',
          },
          {
            type: 'text',
            id: 'j-l5-b4',
            body: 'The single most useful thing to notice when reading a script is whether a line *does* anything immediately. That is why a handler can be defined above the element it looks for and still find it later: the lookup happens inside the function body, and the body runs on the click, not on the definition.',
          },
          {
            type: 'code',
            id: 'j-l5-c3',
            language: 'javascript',
            title: 'Defining versus calling',
            code: `function greet() {
  console.log('hello')
}

greet()   // this line runs it — remove it and nothing is printed

greet     // on its own, this just names the function`,
          },
          {
            type: 'example',
            id: 'j-l5-e1',
            title: 'A statement that runs, then one that waits',
            body: 'The first line runs while the page loads. The second only produces output after you press the button — the difference between a statement and a definition.',
            html: `<button type="button" id="go">Call the function</button>`,
            javascript: `console.log('this ran on load')

function onClick() {
  console.log('this ran when the button was pressed')
}

document.querySelector('#go').addEventListener('click', onClick)`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'j-l5-t1',
            title: 'Comments have their own lesson next',
            body: 'Both comment styles, when to reach for each, and how commenting a line out is the fastest debugging tool you have — all of that is the next lesson. For now, one habit is enough: end every statement with a semicolon and keep one statement per line, so the error message points at the line you actually broke.',
          },
          {
            type: 'exercise',
            id: 'j-l5-x1',
            exercise: {
              id: 'ex-js-statements',
              instructions:
                'Write three statements: a `const` called `city` holding the string "Lisbon", a `let` called `days` holding 2, and then a statement that raises `days` to 7. Finish by logging a template-free concatenation: the city, a colon, a space, then the number of days.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Three statements, one per line, each ending with a semicolon.
// Then log "Lisbon: 7".

`,
              },
              expectedOutput: 'Lisbon: 7',
              tests: [
                {
                  id: 'ex-js-statements-t1',
                  label: 'city holds the string "Lisbon"',
                  body: `return typeof city !== 'undefined' && city === 'Lisbon'
  ? true
  : 'Declare it as: const city = "Lisbon"';`,
                },
                {
                  id: 'ex-js-statements-t2',
                  label: 'days ends up as the number 7',
                  body: `return typeof days !== 'undefined' && days === 7
  ? true
  : 'Start days at 2, then raise it to 7 in a separate statement.';`,
                },
                {
                  id: 'ex-js-statements-t3',
                  label: 'The console shows "Lisbon: 7"',
                  body: `var log = window.__log || [];
return log.length > 0 && log[log.length - 1] === 'Lisbon: 7'
  ? true
  : 'Expected one console line reading "Lisbon: 7", got: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'A statement that does two things is a sign it should be two lines: `days = 2` and then `days = 7`.',
                'String and number join with `+`. Add the punctuation as its own short piece of text: `":"` and `" "`.',
                'So the last line is `console.log(city + ": " + days)`. Check the space after the colon.',
              ],
              solution: {
                javascript: `const city = 'Lisbon'
let days = 2

days = 7

console.log(city + ': ' + days)`,
              },
              testNotes:
                'The checks read the two variables and the last console line, so a hard-coded output string will not pass.',
            },
          },
        ],
      },
      {
        id: 'js-l6',
        title: 'Comments',
        description:
          'Both comment styles, what is worth writing down, and commenting a line out as a debugging instrument.',
        duration: 5,
        objectives: [
          'Write both comment styles and choose between them',
          'Comment the why, not the what the code already says',
          'Bisect a bug by commenting lines out, then delete the parking',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l6',
          title: 'Comments quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l6-q1',
              type: 'blank',
              prompt: 'Which two characters start a comment that can span multiple lines?',
              answers: [
                '/*',
                'slash star',
              ],
              explanation: 'A block comment opens with /* and closes with */, so it can cover several lines. The double slash used for a line comment stops at the next line break.',
            },
            {
              id: 'quiz-js-l6-q2',
              type: 'multiple-choice',
              prompt: 'What happens if a `/*` block comment is never closed?',
              options: [
                'Only the next line is ignored',
                'The rest of the file is treated as comment text',
                'The browser throws a SyntaxError at the first line inside it',
                'The comment ends automatically at the next blank line',
              ],
              answer: 1,
              explanation: 'A block comment runs until the matching `*/`, so a missing close turns everything after it into comment text. That is why `//` is the safer everyday choice for short notes.',
            },
            {
              id: 'quiz-js-l6-q3',
              type: 'multiple-choice',
              prompt: 'Which comment is worth writing above `const vatRate = 0.2`?',
              options: [
                '`// sets vatRate to 0.2`',
                '`// this is a number`',
                '`// German VAT rate, checked 2026-01; never use it as a default`',
                '`// increase vatRate`',
              ],
              answer: 2,
              explanation: 'The useful comment explains why the value is 0.2 and when it applies — facts the code cannot express. The others restate the line and will go stale when the value changes.',
            },
            {
              id: 'quiz-js-l6-q4',
              type: 'multiple-choice',
              prompt: 'You comment out half of a misbehaving program and the error disappears. What have you learned?',
              options: [
                'The whole program is broken',
                'The fault is in the half you disabled',
                'The fault is in the half you left running',
                'Comments fix errors by preventing the code from parsing',
              ],
              answer: 1,
              explanation: 'Bisecting works because the removed half can no longer cause the failure. If the error vanishes, the culprit is in the disabled code; if it remains, the fault is in the code still running.',
            },
            {
              id: 'quiz-js-l6-q5',
              type: 'true-false',
              prompt: '`/** ... */` is a block comment that tooling can read as documentation for the function that follows it.',
              answer: true,
              explanation: 'The extra asterisk marks a documentation comment, which editors and generators can surface for the next declaration. It is still ignored by the JavaScript engine.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l6-b1',
            body: 'A comment is text the parser skips. It never runs, so it cannot break anything — which is why it is also the fastest way to take code out of a program without deleting it. The demo below has one line that matters, one line that is dead weight, and the comment that distinguishes them for you.',
          },
          {
            type: 'demo',
            id: 'j-l6-d1',
            title: 'A comment that earns its place',
            body: 'The number 0.2 is correct as a VAT rate, and on its own nobody reading the line next month would know that. The comment says the *why*, not the what — which is the only kind worth writing.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const net = 20

// German VAT rate, checked 2026-01. Never used as a default: the rate is per country.
const vatRate = 0.2

document.querySelector('#out').textContent = 'gross ' + (net * (1 + vatRate))`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'j-l6-h1',
            level: 3,
            body: 'The two styles',
          },
          {
            type: 'code',
            id: 'j-l6-c1',
            language: 'javascript',
            title: 'Line comment and block comment',
            code: `// one line: everything to the right is ignored
const price = 12.5   // a trailing note works too

/*
  A block comment spans lines.
  Use it for a section heading,
  a licence header, or to park
  an approach you are not ready to delete.
*/`,
          },
          {
            type: 'list',
            id: 'j-l6-l1',
            style: 'bullet',
            items: [
              '`//` runs to the end of the line. This is the everyday choice: short, local, and impossible to leave unclosed.',
              '`/* … */` spans lines. Use it for a licence header or a block of disabled code, and be careful — one unclosed `/*` swallows the entire rest of the file.',
              '`/** … */` is a block comment with an extra asterisk, which tooling reads as documentation for the next function. Worth writing once you are writing reusable modules.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l6-w1',
            title: 'The code already says what it does',
            body: '`// increase the counter` above `count = count + 1` is noise — it restates the line, it goes stale the moment the line changes, and it makes the file longer without making it clearer. The comment worth writing is the thing the code cannot express: why this rate, why this order, what breaks if you touch it, and which bug this guard is really about.',
          },
          {
            type: 'heading',
            id: 'j-l6-h2',
            level: 3,
            body: 'Commenting out is a debugging tool',
          },
          {
            type: 'text',
            id: 'j-l6-b2',
            body: 'When a program misbehaves, the fastest way to find the culprit is to make half of it stop happening. Put `//` in front of a suspect line, run it, and read the result. If the error disappears, the fault is in what you just disabled; if it stays, the fault is in the half you left alone. Halve again and you have found it in a few runs, instead of reading every line.',
          },
          {
            type: 'code',
            id: 'j-l6-c2',
            language: 'javascript',
            title: 'Bisecting in two runs',
            code: `const input = document.querySelector('#amount').value
const qty = Number(input)

// run 1: the first line active, the second commented out
const total = Number(input) * 2

// const total = Number(input) * Number(document.querySelector('#qty').value)
// total = total + shipping
// render(total)

// run 2: swap them back and the bug comes with one of them`,
          },
          {
            type: 'tip',
            id: 'j-l6-t1',
            title: 'Park it, then delete it',
            body: 'Commenting out a rewrite you are not ready to finish is fine while you work. Shipping is not — commented-out code rots, lies about what the program does, and makes the next reader think there is a reason for the dead line. Before you finish, delete what you commented out or move it to version control, where it belongs.',
          },
          {
            type: 'code',
            id: 'j-l6-c3',
            language: 'javascript',
            title: 'A comment that earns its keep',
            code: `// TODO: the API is still returning the old field name.
// Blocked on the backend ticket #412 — do not remove this guard.
if (!data.total) return

// Prices are stored in cents to avoid float drift on repeated totals.
const total = Math.round(cents) / 100`,
          },
          {
            type: 'example',
            id: 'j-l6-e1',
            title: 'Two versions of the same line, one commented',
            body: 'The line below is left alone, but the second copy of the calculation is commented out. Read them together: the comment says which one is live, which is the one thing a comment should always settle.',
            html: `<p id="out">waiting…</p>`,
            css: `#out { font-family: ui-monospace, monospace; }`,
            javascript: `const seats = 3

// Old: the price was per person, before the group discount.
const total = seats * 10

// const total = seats * 9

document.querySelector('#out').textContent = 'total is ' + total`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l6-x1',
            exercise: {
              id: 'ex-js-comments',
              instructions:
                'Declare a `const` called `plan` holding the string "pro". Comment out the second of the two log lines below with `//`, so only the first line prints. Then log a line reading "plan: pro".',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Comment out the second log line, then log "plan: pro".
const plan = 'pro'
console.log('second line')
console.log('third line')

`,
              },
              expectedOutput: 'plan: pro',
              tests: [
                {
                  id: 'ex-js-comments-t1',
                  label: 'plan holds the string "pro"',
                  body: `return typeof plan !== 'undefined' && plan === 'pro'
  ? true
  : 'Declare it as: const plan = "pro"';`,
                },
                {
                  id: 'ex-js-comments-t2',
                  label: '"second line" no longer prints',
                  body: `var log = window.__log || [];
return log.indexOf('second line') === -1
  ? true
  : 'Put // in front of that console.log so it stops running. Logged: ' + log.join(' | ');`,
                },
                {
                  id: 'ex-js-comments-t3',
                  label: '"plan: pro" was printed',
                  body: `var log = window.__log || [];
return log.indexOf('plan: pro') !== -1
  ? true
  : 'Log the plan value with its label, like this: console.log("plan: " + plan). Logged: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'A comment needs two characters at the start of the line: `//`. Everything to the right of them is ignored.',
                'Putting `//` in front of a statement turns it into text — the line still has to be valid JavaScript for the comment to start there.',
                'To join the label and the value: `console.log("plan: " + plan)`. Check the space after the colon.',
              ],
              solution: {
                javascript: `const plan = 'pro'
// console.log('second line')
console.log('third line')

console.log('plan: ' + plan)`,
              },
              testNotes:
                'The checks read the console output, which is how they can tell a commented line from a deleted one — the source still contains the text either way.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s6',
    title: 'Variables',
    description:
      'Naming a value so the code reads as a sentence, and choosing the keyword that promises the truth.',
    lessons: [
      {
        id: 'js-l7',
        title: 'Variables and their names',
        description:
          'A name attached to a value, and the naming rules and habits that keep a script readable.',
        duration: 5,
        objectives: [
          'Declare a variable and say what the name is for',
          'Apply the naming rules and know why each one exists',
          'Choose names that carry meaning instead of placeholders',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l7',
          title: 'Variables and their names quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l7-q1',
              type: 'multiple-choice',
              prompt: 'Which of these is a legal variable name?',
              options: [
                '`2nd-place`',
                '`place2`',
                '`my-thing`',
                '`total` (as in `Total`)',
              ],
              answer: 1,
              explanation: 'A name may contain letters, digits, `$` and `_`, but it cannot begin with a digit or contain a hyphen — `my-thing` parses as subtraction. `place2` starts with a letter and keeps the digit after it, which is unambiguous.',
            },
            {
              id: 'quiz-js-l7-q2',
              type: 'true-false',
              prompt: '`Total` and `total` refer to the same variable, because JavaScript ignores capitalisation in names.',
              answer: false,
              explanation: 'Names are case sensitive, so those are two unrelated variables. Reading the wrong one gives you `total is not defined` — or worse, a plausible wrong number if both names happen to exist.',
            },
            {
              id: 'quiz-js-l7-q3',
              type: 'multiple-choice',
              prompt: 'Why is `const my-thing = 1` a syntax error rather than a variable named `my-thing`?',
              options: [
                'Hyphens are reserved for CSS properties',
                'The parser reads it as `my` minus `thing`, which is subtraction',
                'A name may not contain more than one word',
                '`thing` is a reserved word',
              ],
              answer: 1,
              explanation: 'The minus sign is an operator, so the parser stops the name at `my` and treats the rest as arithmetic. That is also why JavaScript uses camelCase or underscores instead of kebab-case.',
            },
            {
              id: 'quiz-js-l7-q4',
              type: 'multiple-choice',
              prompt: '`const 2ndPlace = \'Bo\'` is illegal. Which rename keeps the same meaning and is legal?',
              options: [
                '`const place2 = \'Bo\'`',
                '`const 2nd_place = \'Bo\'`',
                '`const 2ndPlace = \'Bo\'`',
                '`const place-2 = \'Bo\'`',
              ],
              answer: 0,
              explanation: 'A name cannot start with a digit because the parser cannot tell where the number ends and the name begins. Starting with a letter and keeping the digit later, as in `place2`, removes the ambiguity.',
            },
            {
              id: 'quiz-js-l7-q5',
              type: 'multiple-choice',
              prompt: 'Why does the lesson prefer `isLoggedIn` to `flag` for a boolean?',
              options: [
                'It is shorter to type',
                'It states the question the value answers, which stays true when more booleans are added',
                'It makes the variable block-scoped',
                'It stops the value being reassigned',
              ],
              answer: 1,
              explanation: 'A boolean name should read as a yes-or-no question at the call site. `flag` says nothing and becomes actively misleading as soon as a second boolean appears, while `isLoggedIn` keeps its meaning.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l7-b1',
            body: 'A variable is a name attached to a value, and the name is the part a human reads. `total` tells you what a number means; `x2` tells you nothing and sends the reader back to the declaration. The rules for what a name may contain are short, and almost all of them exist because of one ambiguity: the parser has to know where the name ends.',
          },
          {
            type: 'demo',
            id: 'j-l7-d1',
            title: 'Two names, one value',
            body: 'The price is computed once and then given a name. Change the rate on the line above and both lines below follow it — which is the entire reason to name things rather than repeating the calculation.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const rate = 0.2
const gross = 20 * (1 + rate)

document.querySelector('#out').textContent = 'gross is ' + gross`,
            height: 140,
          },
          {
            type: 'heading',
            id: 'j-l7-h1',
            level: 3,
            body: 'The rules, and why each one is there',
          },
          {
            type: 'list',
            id: 'j-l7-l1',
            style: 'bullet',
            items: [
              '**Letters, digits, `$` and `_`.** That is the whole allowed set. Every one of them has to be something the parser can put an unambiguous boundary around.',
              '**No digit first.** `2ndPlace` is illegal because the parser cannot tell whether `2` is part of the name or the start of a number. Start with a letter and put the digit anywhere after: `place2`.',
              '**No hyphen.** `my-thing` reads as `my` minus `thing`, so the parser would treat it as arithmetic. That is also why JavaScript has no kebab-case — `myThing`, `my_thing` and `Thing` are the spellings available to you.',
              '**Case is part of the name.** `total`, `Total` and `TOTAL` are three unrelated variables, and getting it wrong gives you `total is not defined`.',
              '**Reserved words are forbidden.** You cannot name anything `class`, `if`, `for`, `new`, `function`, `const`, `let` or `return`, because the parser already means something by them.',
            ],
          },
          {
            type: 'code',
            id: 'j-l7-c1',
            language: 'javascript',
            title: 'Legal and not',
            code: `const place2 = 'Bo'          // fine: digit after a letter
const myThing = 1            // fine: camelCase
const my_thing = 2           // fine: underscore
const $widget = 3            // fine, but $ is for generated names

const 2ndPlace = 'Bo'        // SyntaxError: cannot start with a digit
const my-thing = 1           // SyntaxError: reads as subtraction
const Total = 5              // a different variable from total`,
          },
          {
            type: 'warning',
            id: 'j-l7-w1',
            title: 'Every variable must be declared',
            body: 'Assigning to a name you never declared is legal in sloppy mode and creates an **implicit global** — a variable that belongs to the whole page, not to your function. Two scripts can then fight over the same name, and the bug appears somewhere neither author was looking. A missing `const` or `let` costs one keyword and removes the whole problem.',
          },
          {
            type: 'heading',
            id: 'j-l7-h2',
            level: 3,
            body: 'Names that carry meaning',
          },
          {
            type: 'tip',
            id: 'j-l7-t1',
            title: 'Name the value, not the type',
            body: '`userInput`, `itemTotal` and `isLoggedIn` survive being moved to another file. `str`, `num` and `flag` only describe what JavaScript already knows — and `flag` becomes a lie the moment you add a second boolean. If you cannot name it, that is usually a sign the value deserves splitting into two.',
          },
          {
            type: 'code',
            id: 'j-l7-c2',
            language: 'javascript',
            title: 'Two names, one value',
            code: `const hoursWorked = 38
const payRate = 24.5

// bad: the reader learns nothing
const a = hoursWorked * payRate

// good: the reader knows what they are looking at before the maths
const grossPay = hoursWorked * payRate`,
          },
          {
            type: 'text',
            id: 'j-l7-b2',
            body: 'Two habits pay for themselves immediately. Use **camelCase**, joining words with a capital, because a hyphen is not available and an underscore is rarer in modern JavaScript. And keep the units in the name when the number alone is ambiguous — `timeoutMs`, `priceCents`, `durationSeconds` — because `1000` next to `duration` is a coin flip, and the comment you write instead will eventually go out of date.',
          },
          {
            type: 'example',
            id: 'j-l7-e1',
            title: 'Names that say what they mean',
            body: 'The two lines below compute the same value. Only one of them tells you, at a glance, what the number is.',
            html: `<p id="out">waiting…</p>`,
            css: `#out { font-family: ui-monospace, monospace; }`,
            javascript: `const priceCents = 1250
const itemCount = 3

const totalCents = priceCents * itemCount
document.querySelector('#out').textContent = 'totalCents = ' + totalCents`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l7-x1',
            exercise: {
              id: 'ex-js-variable-names',
              instructions:
                'Declare a `const` called `itemPrice` holding the number 12, and a `const` called `itemCount` holding 3. Then declare a `const` called `totalPrice` holding the product of the two, and log `totalPrice`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Three const declarations, each on its own line.
// Then log the total.

`,
              },
              expectedOutput: '36',
              tests: [
                {
                  id: 'ex-js-variable-names-t1',
                  label: 'itemPrice and itemCount hold 12 and 3',
                  body: `return typeof itemPrice !== 'undefined' && itemPrice === 12 && typeof itemCount !== 'undefined' && itemCount === 3
  ? true
  : 'Declare itemPrice as 12 and itemCount as 3.';`,
                },
                {
                  id: 'ex-js-variable-names-t2',
                  label: 'totalPrice is the product of the two',
                  body: `if (typeof totalPrice === 'undefined') return 'Declare a const called totalPrice.'
return totalPrice === 36
  ? true
  : 'Set totalPrice to itemPrice * itemCount, which is 36.';`,
                },
                {
                  id: 'ex-js-variable-names-t3',
                  label: 'totalPrice was logged',
                  body: `var log = window.__log || [];
return log.length > 0 && String(log[log.length - 1]) === '36'
  ? true
  : 'Log totalPrice and expect the line 36. Logged: ' + log.join(' | ');`,
                },
              ],
              hints: [
                'Three declarations, three lines: `const itemPrice = 12`, `const itemCount = 3`, then `const totalPrice = itemPrice * itemCount`.',
                'A `const` can be declared from the values of other variables, so the last line can multiply the two names directly.',
                'Finish with `console.log(totalPrice)`.',
              ],
              solution: {
                javascript: `const itemPrice = 12
const itemCount = 3
const totalPrice = itemPrice * itemCount

console.log(totalPrice)`,
              },
              testNotes:
                'The checks read the three variables by name, so a single hard-coded number will not pass — the total has to come from the other two.',
            },
          },
        ],
      },
      {
        id: 'js-l8',
        title: 'let and const',
        description:
          'The keyword is a promise about whether a name will ever point somewhere else, and what that promise costs.',
        duration: 6,
        objectives: [
          'Declare with const by default and let when the value must change',
          'Explain what const prevents, and what it does not',
          'Avoid var and accidental globals',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-js-l8',
          title: 'let and const quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l8-q1',
              type: 'blank',
              prompt: 'Which keyword do you write before a variable so it belongs to the current block instead of the whole page?',
              answers: [
                'const',
                'let',
                'var',
                'Const',
              ],
              explanation: '`const` and `let` both declare a block-scoped name. Assigning to a name you never declared creates an implicit global instead, which two unrelated scripts can silently fight over — that is the bug the keyword prevents.',
            },
            {
              id: 'quiz-js-l8-q2',
              type: 'identify-error',
              prompt: 'What is wrong with this line?',
              code: 'const price = 12\nlet tax = price * 0.2\nlet total = price + tax',
              options: [
                'Nothing — this is valid',
                '`total` is a reserved word',
                'Names must be written in snake_case in JavaScript',
                'A variable cannot be declared from the value of another variable',
              ],
              answer: 0,
              explanation: 'A `const` or `let` can be initialised from any expression, including the value of another variable. `total` is not reserved. This is the normal way to build a value up in readable steps.',
            },
            {
              id: 'quiz-js-l8-q3',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const grossPay = 38 * 24.5\nconsole.log(grossPay)',
              options: [
                '931',
                '"931"',
                '931.0',
                'undefined',
              ],
              answer: 0,
              explanation: 'Two numbers multiply to a number, so the log shows 931 with no quotes. Quotation marks in the output are how you tell a string from a number at a glance — which matters more than it sounds once values start arriving from a form.',
            },
            {
              id: 'quiz-js-l8-q4',
              type: 'code-output',
              prompt: 'What does this print?',
              code: 'const list = [1, 2, 3]\nlist.push(4)\nconsole.log(list.length)',
              options: [
                '3',
                '4',
                'undefined',
                'TypeError',
              ],
              answer: 1,
              explanation: '`const` fixes the binding, not the contents: the same array can still be mutated with `push`. Only pointing `list` at a different array would throw.',
            },
            {
              id: 'quiz-js-l8-q5',
              type: 'multiple-choice',
              prompt: 'What is the main reason the lesson says to avoid `var`?',
              options: [
                'It is slower than `let` at runtime',
                'It is function-scoped and can be redeclared, so a block-local name can leak and be silently shared',
                'It cannot hold numbers',
                'It must be declared at the top of the file',
              ],
              answer: 1,
              explanation: '`var` ignores block boundaries and allows redeclaration in the same function, so unrelated code can share a name without warning. `let` and `const` are block-scoped and refuse a second declaration.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l8-b1',
            body: 'Every variable declaration carries a promise to your future self about whether that name will ever point somewhere else. `const` promises it will not, `let` promises it might. The demo below makes the difference visible: one name climbs, the other refuses, and the refusal is the useful part.',
          },
          {
            type: 'demo',
            id: 'j-l8-d1',
            title: 'A counter that changes and a name that does not',
            body: 'Press the button: the `let` counter climbs. The `const` label beside it never moves, which is exactly the guarantee you get from declaring it that way.',
            html: `<p id="out">waiting…</p>
<button type="button" id="go">Add one</button>`,
            css: `body { font-family: system-ui, sans-serif; }`,
            javascript: `const label = 'items'
let count = 0

document.querySelector('#go').addEventListener('click', function () {
  count = count + 1
  document.querySelector('#out').textContent = label + ': ' + count
})`,
            height: 180,
          },
          {
            type: 'code',
            id: 'j-l8-c1',
            language: 'javascript',
            title: 'The two declarations you need',
            code: `const appName = 'codeIngot'
let visits = 0

visits = visits + 1
console.log(appName, visits)`,
          },
          {
            type: 'heading',
            id: 'j-l8-h1',
            level: 3,
            body: 'What const actually prevents',
          },
          {
            type: 'text',
            id: 'j-l8-b2',
            body: 'The distinction the keyword is really making: `const` protects the **binding**, not the contents. If the value is an array or an object, you can still change what is inside it. You just cannot point the name at a different array. That is why the name is the honest one to read — `const settings` tells you the reference is fixed, and tells you nothing about whether anything inside is.',
          },
          {
            type: 'code',
            id: 'j-l8-c2',
            language: 'javascript',
            title: 'Rebinding versus mutating',
            code: `const list = [1, 2, 3]
list.push(4)            // fine: the array changed
// list = [9, 9, 9]     // TypeError: Assignment to constant variable

const settings = { theme: 'dark' }
settings.theme = 'light'   // fine: the object changed
// settings = {}           // TypeError again`,
          },
          {
            type: 'list',
            id: 'j-l8-l1',
            style: 'bullet',
            items: [
              '`const` — the binding cannot be reassigned, and cannot be redeclared in the same scope. Use it for almost everything.',
              '`let` — the binding can be reassigned, but still cannot be redeclared. Use it for counters, form values, anything that will change.',
              '`var` — the old keyword. Function-scoped instead of block-scoped, redeclarable by accident, and usable before its declaration. There is no case where `const` or `let` will not do.',
            ],
          },
          {
            type: 'tip',
            id: 'j-l8-t1',
            title: 'Why not just use var everywhere?',
            body: '`var` is not slower and it is not shorter. It is less safe: `var x` twice in the same function is legal, so two unrelated pieces of code can silently share a name, and a `var` inside an `if` block leaks out to the end of the function where you can no longer see where it came from. `let` is block-scoped and refuses to be declared twice, so both mistakes become errors.',
          },
          {
            type: 'heading',
            id: 'j-l8-h2',
            level: 3,
            body: 'A preview of scope',
          },
          {
            type: 'text',
            id: 'j-l8-b3',
            body: '`let` and `const` are **block-scoped**: a name declared inside curly braces belongs to those braces and disappears at the closing brace. That is what makes `let` safe to reuse for two unrelated values in two different branches of the same function. Full scope is a later lesson; the point here is that a block is a fence, and `let` respects fences.',
          },
          {
            type: 'code',
            id: 'j-l8-c3',
            language: 'javascript',
            title: 'The same name, two blocks',
            code: `const x = 10
{
  const x = 2      // a different variable entirely
  console.log(x)   // 2
}
console.log(x)     // 10`,
          },
          {
            type: 'warning',
            id: 'j-l8-w1',
            title: 'Every variable must be declared',
            body: 'Assigning to a name you never declared creates an **implicit global** in sloppy mode and throws a ReferenceError in strict mode, which is the default inside modules. A missing `const` or `let` is therefore a silent, page-wide bug that two different scripts can fight over.',
          },
          {
            type: 'example',
            id: 'j-l8-e1',
            title: 'A constant and a counter',
            body: 'Run this. The `const` name is fixed for the whole page; the `let` counter climbs on the next line.',
            html: `<p id="out">waiting…</p>`,
            javascript: `const site = 'codeIngot'
let visits = 0

visits = visits + 1
document.querySelector('#out').textContent = site + ' has ' + visits + ' visit(s)'`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l8-x1',
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
                  id: 'ex-js-const-let-t1',
                  label: 'appName holds the string "codeIngot"',
                  body: `return typeof appName !== 'undefined' && appName === 'codeIngot'
  ? true
  : 'Declare it as: const appName = "codeIngot"';`,
                },
                {
                  id: 'ex-js-const-let-t2',
                  label: 'visits ends up as the number 1',
                  body: `return typeof visits !== 'undefined' && visits === 1
  ? true
  : 'Start visits at 0 and then increase it by 1.';`,
                },
                {
                  id: 'ex-js-const-let-t3',
                  label: 'The value was logged to the console',
                  body: `var log = window.__log || [];
return log.length > 0 && log[log.length - 1] === '1'
  ? true
  : 'Expected the console output to be 1, got: ' + log.join(' | ');`,
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
              testNotes:
                'The checks read the two variables and the last console line, so the number has to come from incrementing the counter rather than being logged directly.',
            },
          },
        ],
      },
    ],
  },
]