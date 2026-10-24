import type { Section } from '~/types/content'

export const jsDomWritesSections: Section[] = [
  {
    id: 'js-s54',
    title: 'DOM document',
    description: 'The document object is the entry point to the DOM. It represents the whole page and gives you the tools to find, create and modify every element on it.',
    lessons: [
      {
        id: 'js-l65',
        title: 'The document object',
        description: 'document is the root of the DOM tree. Every lookup, creation and write starts here.',
        duration: 5,
        objectives: [
          'Explain what the document object is and why it is the starting point for all DOM work',
          'Use document.querySelector and document.querySelectorAll to find elements',
          'Create new elements with document.createElement and document.createTextNode',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-js-l65',
          title: 'The document object quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l65-q1',
              type: 'multiple-choice',
              prompt: 'What does `document.querySelector("#missing")` return when no element has that id?',
              options: [
                'null',
                'undefined',
                'An empty element',
                'It throws an error',
              ],
              answer: 0,
              explanation: 'It returns `null`, which is why reading a property straight afterwards throws "Cannot read properties of null". Guard the lookup, or use optional chaining with `?.`, which gives `undefined` instead of stopping the program.',
            },
            {
              id: 'quiz-js-l65-q2',
              type: 'true-false',
              prompt: '`document.querySelectorAll` returns a live list that updates when new matching elements are added to the page.',
              answer: false,
              explanation: '`querySelectorAll` returns a static NodeList — a snapshot taken at the moment of the call. New elements added later will not appear in it. Use `getElementsByClassName` or `getElementsByTagName` if you need a live collection.',
            },
            {
              id: 'quiz-js-l65-q3',
              type: 'code-output',
              prompt: 'What does the page show after this runs?',
              code: 'const out = document.querySelector(\'#out\')\nout.innerHTML = \'<strong>Bold</strong>\'',
              options: [
                'The plain text <strong>Bold</strong>, with tags shown as characters',
                'The word Bold in bold text',
                'Nothing — innerHTML was removed from modern browsers',
                'An error, because #out is not a valid selector',
              ],
              answer: 1,
              explanation: '`innerHTML` parses the string as HTML, so the `<strong>` tags become real elements and the word renders in bold. `textContent` would write the tags as visible characters instead.',
            },
            {
              id: 'quiz-js-l65-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this way of creating an element?',
              code: 'const div = document.createElement(\'<div>\')\ndiv.textContent = \'Hello\'\ndocument.body.append(div)',
              options: [
                'Nothing is wrong',
                'createElement takes a tag name without angle brackets',
                'textContent does not work on created elements',
                'append only works on the document, not on body',
              ],
              answer: 1,
              explanation: '`createElement` expects a tag name like `"div"`, not `"<div>"`. The angle brackets make it an invalid tag name and the browser will create an element named `HTMLUnknownElement` instead.',
            },
            {
              id: 'quiz-js-l65-q5',
              type: 'blank',
              prompt: 'Which method creates a plain text node that can be appended to an element?',
              answers: [
                'createTextNode',
                'document.createTextNode',
              ],
              explanation: '`document.createTextNode("text")` makes a text node. It is rarely needed directly because `textContent` and `append` with a string handle it for you, but it exists for cases where you need fine-grained control.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l65-b1',
            body: 'The **document** object is the root of the DOM tree. It represents the entire HTML document and is the entry point for every DOM operation — finding elements, creating new ones, and writing changes back to the page. Without document, JavaScript has no way to reach the markup.',
          },
          {
            type: 'tip',
            id: 'j-l65-dt',
            title: 'Keep the developer tools open',
            body: 'Open them with **F12**, **Ctrl + Shift + I** / **Cmd + Option + I**, or right-click the page and choose **Inspect**. The **Elements** panel is the live DOM; the **Console** panel shows logs and errors.',
          },
          {
            type: 'demo',
            id: 'j-l65-d1',
            title: 'The document object in action',
            body: 'The document object lets you query the page, create elements, and write them into the tree. This demo shows the three core operations: find, create, attach.',
            html: `<div id="out"></div>
<button id="demo-btn" type="button">Run demo</button>`,
            javascript: `const btn = document.querySelector('#demo-btn')
const out = document.querySelector('#out')

btn.addEventListener('click', function () {
  // 1. Find an element
  const existing = document.querySelector('#out')
  // 2. Create a new element
  const p = document.createElement('p')
  p.textContent = 'Created at ' + new Date().toLocaleTimeString()
  // 3. Attach it
  existing.append(p)
})`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'j-l65-h1',
            level: 3,
            body: 'Finding elements',
          },
          {
            type: 'code',
            id: 'j-l65-c1',
            language: 'javascript',
            title: 'querySelector and querySelectorAll',
            code: `const first = document.querySelector('.card')     // first match, or null
const all = document.querySelectorAll('.card') // all matches, as a NodeList
const byId = document.getElementById('main')   // fastest for id lookups`,
          },
          {
            type: 'text',
            id: 'j-l65-b2',
            body: '`querySelector` takes any CSS selector and returns the first matching element, or `null` if nothing matches. `querySelectorAll` returns a **NodeList** — a static snapshot of all matches at the moment you called it. New elements added later will not appear in that NodeList. `getElementById` is a specialised, faster path when you already know the id.',
          },
          {
            type: 'warning',
            id: 'j-l65-w1',
            title: 'null will break your code',
            body: 'If nothing matches, `querySelector` gives you `null` and the next property access throws "Cannot read properties of null". Either check before use — `const el = document.querySelector("#x"); if (!el) return` — or use optional chaining: `document.querySelector("#x")?.textContent`. Both are habits worth having.',
          },
          {
            type: 'heading',
            id: 'j-l65-h2',
            level: 3,
            body: 'Creating elements and text nodes',
          },
          {
            type: 'code',
            id: 'j-l65-c2',
            language: 'javascript',
            title: 'createElement and createTextNode',
            code: `const div = document.createElement('div')
div.className = 'card'
div.setAttribute('data-id', '42')

const text = document.createTextNode('Hello')
div.append(text)`,
          },
          {
            type: 'text',
            id: 'j-l65-b3',
            body: '`createElement` builds a detached element — it exists in memory but is not in the page yet. `createTextNode` makes a plain text node. Both are inert until you attach them with `append`, `appendChild`, `prepend`, or `replaceChildren`. Creating off the page and attaching once is faster than writing into the live tree step by step.',
          },
          {
            type: 'tip',
            id: 'j-l65-t1',
            title: 'Prefer textContent over innerHTML',
            body: '`textContent` writes text as plain characters. `innerHTML` parses the string as HTML, which makes `<script>` tags run and lets attackers inject code. Build nodes with `createElement`, fill them with `textContent`, and keep `innerHTML` for clearing a container or for a literal in your own code.',
          },
          {
            type: 'exercise',
            id: 'j-l65-x1',
            exercise: {
              id: 'ex-js-document-object',
              instructions: 'Write a function called `showTime` that creates a new `<p>` element, sets its textContent to the current time using `new Date().toLocaleTimeString()`, and appends it to the `#log` element. Then attach a click handler to the `#run` button that calls `showTime()` on every click.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<div id="log"></div>
<button id="run" type="button">Show time</button>`,
                javascript: `function showTime() {
  // create a p element, set its text to the current time, append to #log
}

const button = document.querySelector('#run')
// add click handler that calls showTime
`,
              },
              tests: [
                {
                  id: 'ex-js-document-object-t1',
                  label: 'Clicking the button adds a paragraph with a time string',
                  body: `var btn = document.querySelector('#run')
var log = document.querySelector('#log')
if (!btn || !log) return 'Keep the button and the log div.'
btn.click()
var paragraphs = log.querySelectorAll('p')
return paragraphs.length === 1 && paragraphs[0].textContent.includes(':') ? true : 'After one click there should be one p with a time like 10:30:45 AM.';`,
                },
                {
                  id: 'ex-js-document-object-t2',
                  label: 'Each click adds a new paragraph, not replacing the old one',
                  body: `var btn = document.querySelector('#run')
var log = document.querySelector('#log')
if (!btn || !log) return 'Keep the button and the log div.'
btn.click()
btn.click()
var paragraphs = log.querySelectorAll('p')
return paragraphs.length === 2 ? true : 'Two clicks should produce two paragraphs, found ' + paragraphs.length + '.';`,
                },
                {
                  id: 'ex-js-document-object-t3',
                  label: 'The function is named showTime and uses createElement',
                  body: `var log = document.querySelector('#log')
if (!log) return 'Keep the log div.'
if (typeof showTime !== 'function') return 'Name your function showTime.'
log.innerHTML = ''
showTime()
var paragraphs = log.querySelectorAll('p')
return paragraphs.length === 1 && paragraphs[0].tagName === 'P' ? true : 'showTime should create a p element with document.createElement and append it.';`,
                },
              ],
              hints: [
                'Use `document.createElement("p")` to make the paragraph.',
                'Set its text with `textContent = new Date().toLocaleTimeString()`.',
                'Append it to the log with `document.querySelector("#log").append(p)`.',
                'Attach the click handler with `button.addEventListener("click", showTime)`.',
              ],
              solution: {
                html: `<div id="log"></div>
<button id="run" type="button">Show time</button>`,
                javascript: `function showTime() {
  const p = document.createElement('p')
  p.textContent = new Date().toLocaleTimeString()
  document.querySelector('#log').append(p)
}

const button = document.querySelector('#run')
button.addEventListener('click', showTime)`,
              },
              testNotes: 'The tests click the button and check that each click appends a new paragraph with a time string. They also verify the function exists and creates a real p element.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s55',
    title: 'DOM elements',
    description: 'Create elements off the page, render them in batches, and keep your data as the single source of truth. This is the pattern that scales from a todo list to a full application.',
    lessons: [
      {
        id: 'js-l66',
        title: 'Creating elements and rendering a list',
        description: 'Build nodes off the page, attach them in one go, and keep your data as the source of truth.',
        duration: 6,
        objectives: [
          'Create, fill and attach elements with createElement, textContent and append',
          'Render in one batch with a document fragment',
          'Keep data in a variable and re-render on every change',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l66',
          title: 'Creating elements and rendering a list quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l66-q1',
              type: 'multiple-choice',
              prompt: 'What does `document.createElement("li")` return?',
              options: [
                'A string of HTML',
                'A detached li element not yet in the page',
                'A live li element already in the document',
                'A DocumentFragment',
              ],
              answer: 1,
              explanation: '`createElement` builds an element in memory. It is detached — no styles apply, no layout is calculated, and it is not in the accessibility tree — until you insert it with `append`, `prepend`, or `replaceChildren`.',
            },
            {
              id: 'quiz-js-l66-q2',
              type: 'true-false',
              prompt: 'Appending fifty items one at a time with `list.append(item)` in a loop causes fifty repaints.',
              answer: true,
              explanation: 'Each `append` into the live tree triggers a style recalculation and repaint. Building a DocumentFragment first and appending it once batches the work into a single repaint.',
            },
            {
              id: 'quiz-js-l66-q3',
              type: 'code-output',
              prompt: 'What does the list contain after this runs?',
              code: 'const list = document.querySelector(\'#list\')\nlist.replaceChildren()\nfor (const name of [\'A\', \'B\']) {\n  const li = document.createElement(\'li\')\n  li.textContent = name\n  list.append(li)\n}',
              options: [
                'One li with text "A, B"',
                'Two lis: "A" and "B"',
                'An empty list — replaceChildren clears it',
                'An error — replaceChildren takes a fragment',
              ],
              answer: 1,
              explanation: '`replaceChildren()` with no arguments empties the container. Then the loop creates two separate li elements and appends each. The list ends up with two items.',
            },
            {
              id: 'quiz-js-l66-q4',
              type: 'identify-error',
              prompt: 'Why does this render function produce duplicates on the second call?',
              code: 'let tasks = [\'One\']\nfunction render() {\n  const list = document.querySelector(\'#tasks\')\n  for (const task of tasks) {\n    const li = document.createElement(\'li\')\n    li.textContent = task\n    list.append(li)\n  }\n}\nrender()\ntasks.push(\'Two\')\nrender()',
              options: [
                'tasks array is not being updated',
                'The list is not cleared before adding new items',
                'createElement creates duplicates',
                'append does not work inside a loop',
              ],
              answer: 1,
              explanation: 'The function never empties the container. Each call to `render` appends new items on top of the old ones. Start with `list.replaceChildren()` or `list.innerHTML = ""` to clear it first.',
            },
            {
              id: 'quiz-js-l66-q5',
              type: 'blank',
              prompt: 'What method on a container removes all children and inserts new nodes in a single operation?',
              answers: [
                'replaceChildren',
                'replaceChildren()',
              ],
              explanation: '`list.replaceChildren(...nodes)` clears the container and inserts the given nodes in one atomic step. It is the modern replacement for `innerHTML = ""` followed by multiple appends.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l66-b1',
            body: '`createElement` builds an element that does not exist on the page yet. It is *detached*: invisible, unmeasured by CSS, absent from the accessibility tree. It becomes real only when you insert it. The order is always the same — create, fill, attach — because filling after attaching makes the browser repaint on every step.',
          },
          {
            type: 'demo',
            id: 'j-l66-d1',
            title: 'Build, fill, attach — one insert, one repaint',
            body: 'Creating elements one at a time and appending each triggers a repaint every time. Building the whole list in a DocumentFragment and appending once means a single repaint, no matter how many items.',
            html: `<ul id="frag-list"></ul>
<button id="frag-btn" type="button">Render with fragment</button>`,
            javascript: `const list = document.querySelector('#frag-list')
const btn = document.querySelector('#frag-btn')
const names = ['Tea', 'Coffee', 'Water', 'Juice', 'Milk']

btn.addEventListener('click', function () {
  const fragment = document.createDocumentFragment()
  for (const name of names) {
    const item = document.createElement('li')
    item.textContent = name
    fragment.append(item)
  }
  list.replaceChildren(fragment)
})`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'j-l66-h1',
            level: 3,
            body: 'Build, fill, attach',
          },
          {
            type: 'code',
            id: 'j-l66-c1',
            language: 'javascript',
            title: 'The three steps',
            code: `const list = document.querySelector('#list')
const item = document.createElement('li')
item.textContent = 'Tea'              // fill: text, never innerHTML
item.classList.add('fresh')
item.setAttribute('data-id', '12')
list.append(item)                     // attach
list.replaceChildren()                // empty a container in one step
item.remove()                         // detach one element`,
          },
          {
            type: 'text',
            id: 'j-l66-b2',
            body: '`append` takes nodes *and* plain strings, turning the strings into text nodes for you; `appendChild` only accepts nodes. `replaceChildren(...nodes)` removes everything in the container and inserts the new nodes in one operation, instead of emptying it and filling it while the user watches an empty list.',
          },
          {
            type: 'heading',
            id: 'j-l66-h2',
            level: 3,
            body: 'Render, then attach',
          },
          {
            type: 'tip',
            id: 'j-l66-t1',
            title: 'Render, then attach',
            body: 'Build the whole list in a DocumentFragment and append it once. Adding fifty items one at a time makes the browser repaint fifty times; one append means one. A fragment is a container that holds nodes without being part of the document, so nothing is measured or painted until it lands.',
          },
          {
            type: 'code',
            id: 'j-l66-c2',
            language: 'javascript',
            title: 'One insertion, one repaint',
            code: `const fragment = document.createDocumentFragment()
for (const name of names) {
  const item = document.createElement('li')
  item.textContent = name
  fragment.append(item)
}
list.replaceChildren(fragment)`,
          },
          {
            type: 'heading',
            id: 'j-l66-h3',
            level: 3,
            body: 'Re-render when the data changes',
          },
          {
            type: 'text',
            id: 'j-l66-b3',
            body: 'Here is the mental model the rest of this course rests on: keep your data in a variable and let one `render` function be the only thing that touches the page. When the data changes, change the data and call `render`. The moment you edit the DOM as the source of truth, the page and your data can disagree — and only one of them is easy to inspect.',
          },
          {
            type: 'code',
            id: 'j-l66-c3',
            language: 'javascript',
            title: 'Data in, page out',
            code: `let tasks = ['Read chapter 3']

function render() {
  const list = document.querySelector('#tasks')
  list.replaceChildren()
  for (const task of tasks) {
    const item = document.createElement('li')
    item.textContent = task
    list.append(item)
  }
}

render()
tasks = ['Read chapter 3', 'Ship the project']
render()   // the page matches the data again`,
          },
          {
            type: 'exercise',
            id: 'j-l66-x1',
            exercise: {
              id: 'ex-js-dom-render',
              instructions: 'Write a function called `render` that empties the `#tasks` list and adds one `<li>` per item in the `tasks` array, using the array for the text of each item. Then add a click handler on `#add` that pushes "Task N" onto `tasks` and calls `render()` again.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<ul id="tasks"></ul>
<button id="add" type="button">Add task</button>`,
                javascript: `let tasks = ['Write the code']

function render() {
  // clear the list, then add one li per task
}

// Add the click handler here, then call render() once.
`,
              },
              tests: [
                {
                  id: 'ex-js-dom-render-t1',
                  label: 'A function called render exists and fills the list from the array',
                  body: `var list = document.querySelector('#tasks')
if (!list) return 'Keep the #tasks list from the starter HTML.'
if (typeof render !== 'function') return 'Name your function render.'
render()
var items = list.querySelectorAll('li')
return items.length === 1 && items[0].textContent.trim() === 'Write the code' ? true : 'After render() the list should hold one li reading Write the code, found ' + items.length + '.';`,
                },
                {
                  id: 'ex-js-dom-render-t2',
                  label: 'One click adds exactly one item',
                  body: `var button = document.querySelector('#add')
var list = document.querySelector('#tasks')
if (!button || !list) return 'Keep the #add button and the #tasks list.'
button.click()
var items = list.querySelectorAll('li')
return items.length === 2 ? true : 'One click should add one item, the list holds ' + items.length + '.';`,
                },
                {
                  id: 'ex-js-dom-render-t3',
                  label: 'The list holds exactly one item per task, with no duplicates',
                  body: `var button = document.querySelector('#add')
var list = document.querySelector('#tasks')
if (!button || !list || typeof render !== 'function') return 'Keep the button, the list and the render function.'
if (typeof tasks === 'undefined' || !Array.isArray(tasks)) return 'Keep the tasks array and push new items onto it.'
button.click()
button.click()
var items = list.querySelectorAll('li')
return items.length === tasks.length
  ? true
  : 'The list should hold exactly one li per task (' + tasks.length + '), found ' + items.length + ' — remember to clear the list at the start of render().';`,
                },
                {
                  id: 'ex-js-dom-render-t4',
                  label: 'Each task is a separate <li> with its own text',
                  body: `var list = document.querySelector('#tasks')
if (!list) return 'Keep the #tasks list from the starter HTML.'
var items = list.querySelectorAll('li')
return items.length > 1 && items[0].tagName === 'LI' && items[1].textContent.trim().length > 0
  ? true
  : 'Create one li per task with document.createElement("li") and set its text with textContent.';`,
                },
              ],
              hints: [
                'Inside `render`, the first job is emptying the container: `list.replaceChildren()`.',
                'Then loop over `tasks` and build one `li` per item, setting the text with `textContent`.',
                'The click handler does two things: push a new string onto `tasks`, then call `render()`. That is the whole model.',
              ],
              solution: {
                html: `<ul id="tasks"></ul>
<button id="add" type="button">Add task</button>`,
                javascript: `let tasks = ['Write the code']

function render() {
  const list = document.querySelector('#tasks')
  list.replaceChildren()
  for (const task of tasks) {
    const item = document.createElement('li')
    item.textContent = task
    list.append(item)
  }
}

let count = 1

document.querySelector('#add').addEventListener('click', function () {
  count = count + 1
  tasks.push('Task ' + count)
  render()
})

render()`,
              },
              testNotes: 'The checks call your `render` and click your button, so they measure the relationship between the array and the list rather than any particular wording. The third check only passes if the list is cleared on every render.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s56',
    title: 'DOM HTML',
    description: 'Read and change the page through the DOM. Find elements, read their text and attributes, write new content safely, and understand why textContent is the right tool for the job.',
    lessons: [
      {
        id: 'js-l67',
        title: 'Reading and changing the page',
        description: 'The DOM as a tree of objects, how to find a node, and the safe way to write into it.',
        duration: 6,
        objectives: [
          'Find one element or a list of them with querySelector and friends',
          'Read text, form values and attributes',
          'Change text, attributes, classes and styles, and know why textContent is safer than innerHTML',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l67',
          title: 'Reading and changing the page quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l67-q1',
              type: 'multiple-choice',
              prompt: 'What does `element.textContent` return when the element contains `<strong>bold</strong>`?',
              options: [
                'The string "bold"',
                'The string "<strong>bold</strong>"',
                'An HTML element',
                'undefined',
              ],
              answer: 1,
              explanation: 'textContent returns all text as plain characters. The tags are not parsed -- they are returned as literal characters in the string.',
            },
            {
              id: 'quiz-js-l67-q2',
              type: 'true-false',
              prompt: '`querySelectorAll` returns a live NodeList that automatically updates when new matching elements are added.',
              answer: false,
              explanation: 'querySelectorAll returns a static snapshot. New elements added after the call are not included. Use getElementsByClassName or getElementsByTagName for a live collection.',
            },
            {
              id: 'quiz-js-l67-q3',
              type: 'code-output',
              prompt: 'What does the page show after this runs?',
              code: 'const el = document.querySelector(\'#out\')\nel.innerHTML = \'<em>Italic</em>\'',
              options: [
                'The plain text <em>Italic</em>',
                'The word Italic in italics',
                'An error',
                'Nothing',
              ],
              answer: 1,
              explanation: 'innerHTML parses the string as HTML. The <em> tags become real elements and the browser renders the text in italics.',
            },
            {
              id: 'quiz-js-l67-q4',
              type: 'identify-error',
              prompt: 'What is the problem with this code?',
              code: 'const btn = document.querySelector(\'#btn\')\nbtn.addEventListener(\'click\', function () {\n  const el = document.querySelector(\'#missing\')\n  el.textContent = \'Hello\'\n})',
              options: [
                'Nothing is wrong',
                'querySelector returns null if nothing matches, so el.textContent throws',
                'addEventListener does not work on buttons',
                'textContent cannot be assigned',
              ],
              answer: 1,
              explanation: 'If #missing does not exist, querySelector returns null. Accessing .textContent on null throws "Cannot read properties of null". Guard the lookup or use optional chaining.',
            },
            {
              id: 'quiz-js-l67-q5',
              type: 'blank',
              prompt: 'Which property on an element gives you a token list for adding, removing, and toggling CSS classes?',
              answers: [
                'classList',
                'element.classList',
              ],
              explanation: 'element.classList is a DOMTokenList with add, remove, toggle, and contains methods. It is the standard way to manipulate classes without string concatenation.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l67-b1',
            body: 'The **DOM** is the live object model of your page: a tree of objects, one per element, each holding its own text and attributes. JavaScript never edits your HTML source -- it reads and writes this model, and the browser repaints the instant you do. That is why an element built in JavaScript and one written by hand look identical: they arrive at the same tree.',
          },
          {
            type: 'demo',
            id: 'j-l67-d1',
            title: 'Reading and changing the page live',
            body: 'This demo shows finding an element, reading its text, and writing new content with textContent. Click the button to see the change happen immediately.',
            html: `<div id="read-target">Original text</div>
<button id="read-btn" type="button">Read and change</button>
<div id="read-out"></div>`,
            javascript: `const target = document.querySelector('#read-target')
const btn = document.querySelector('#read-btn')
const out = document.querySelector('#read-out')

btn.addEventListener('click', function () {
  // 1. Find the element
  const el = document.querySelector('#read-target')
  // 2. Read its text
  const text = el.textContent
  // 3. Write new content safely
  el.textContent = 'Changed at ' + new Date().toLocaleTimeString()
  // 4. Show what we read
  out.textContent = 'Read: ' + text
})`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'j-l67-h1',
            level: 3,
            body: 'Finding an element',
          },
          {
            type: 'code',
            id: 'j-l67-c1',
            language: 'javascript',
            title: 'Lookups',
            code: `const header = document.querySelector('h1')       // first match, or null
const cards = document.querySelectorAll('.card')  // every match, as a NodeList
document.getElementById('out')                   // by id, the fastest lookup
header.closest('.card')                          // walk up to the nearest ancestor`,
          },
          {
            type: 'text',
            id: 'j-l67-b2',
            body: '`querySelector` returns one element or `null`. `querySelectorAll` returns a **NodeList**, which is a snapshot rather than a live list -- anything you create after collecting it will not be in it. Any CSS selector works, so there is no separate lookup language to learn for classes, attributes or nesting.',
          },
          {
            type: 'warning',
            id: 'j-l67-w1',
            title: 'null will break your code',
            body: 'If nothing matches, `querySelector` gives you `null` and the next property access throws "Cannot read properties of null". Either check before use -- `const out = document.querySelector("#out"); if (!out) return` -- or use optional chaining: `document.querySelector("#out")?.textContent`. Both are habits worth having; the second one you will reach for constantly.',
          },
          {
            type: 'heading',
            id: 'j-l67-h2',
            level: 3,
            body: 'Reading text, values and attributes',
          },
          {
            type: 'code',
            id: 'j-l67-c2',
            language: 'javascript',
            title: 'Three kinds of read',
            code: `const name = document.querySelector('#name')
name.textContent            // the text inside, as a plain string
name.value                  // what is typed into a form control
name.getAttribute('href')   // any attribute, as written in the markup
name.id                     // common ones are also exposed as properties`,
          },
          {
            type: 'heading',
            id: 'j-l67-h3',
            level: 3,
            body: 'Changing the page',
          },
          {
            type: 'code',
            id: 'j-l67-c3',
            language: 'javascript',
            title: 'Writes',
            code: `out.textContent = 'Cart: 2 items'   // replaces the text
img.setAttribute('src', 'land.jpg') // replaces any attribute
out.classList.add('ok')             // add / remove / toggle / contains
out.style.color = 'crimson'         // inline style, for a one-off
out.hidden = true                   // a boolean attribute`,
          },
          {
            type: 'text',
            id: 'j-l67-b3',
            body: '`classList` is how you change an element\'s state without rewriting its markup: `add`, `remove`, `toggle` and `contains` all take the class name as a string, and the class stays a plain word your CSS can style. Setting `style` directly works, but inline styles outrank your stylesheet, so a class is nearly always the better answer.',
          },
          {
            type: 'warning',
            id: 'j-l67-w2',
            title: 'innerHTML with a string is an injection risk, textContent is not',
            body: '`textContent` writes text: the browser shows every character as a character, and a `<` stays a `<`. `innerHTML` hands your string to the HTML parser, so markup in it becomes real elements and a `<script>` in it runs. That is fine for markup you wrote yourself and dangerous the moment any part of the string came from a user, a URL or a file -- `element.innerHTML = userInput` lets someone paste `<img src=x onerror="...">` and run code on your page. The rule for this whole course: build nodes with `createElement`, fill them with `textContent`, and keep `innerHTML` for clearing a container or for a literal in your own code.',
          },
          {
            type: 'exercise',
            id: 'j-l67-x1',
            exercise: {
              id: 'ex-js-dom-read-write',
              instructions: 'Wire up the `#change` button so that every click reads the current text from the `#source` paragraph, reverses it, and writes the reversed text into the `#target` paragraph using textContent.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<p id="source">Hello world</p>
<p id="target"></p>
<button id="change" type="button">Reverse and copy</button>`,
                javascript: `const button = document.querySelector('#change')
const source = document.querySelector('#source')
const target = document.querySelector('#target')

button.addEventListener('click', function () {
  // read from source, reverse, write to target
})
`,
              },
              tests: [
                {
                  id: 'ex-js-dom-read-write-t1',
                  label: 'Clicking writes reversed text to target',
                  body: `var btn = document.querySelector('#change')
var source = document.querySelector('#source')
var target = document.querySelector('#target')
if (!btn || !source || !target) return 'Keep all three elements.'
btn.click()
return target.textContent === 'dlrow olleH' ? true : 'Target should read "dlrow olleH" after one click, got: ' + target.textContent;`,
                },
                {
                  id: 'ex-js-dom-read-write-t2',
                  label: 'Reading uses textContent, not innerHTML',
                  body: `var btn = document.querySelector('#change')
var source = document.querySelector('#source')
if (!btn || !source) return 'Keep the button and source.'
source.innerHTML = 'Hello <strong>world</strong>'
btn.click()
var target = document.querySelector('#target')
return target.textContent === 'dlrow <strong>olleH' ? false : 'Read with textContent so tags are treated as plain text.';`,
                },
                {
                  id: 'ex-js-dom-read-write-t3',
                  label: 'Multiple clicks keep reading the current source',
                  body: `var btn = document.querySelector('#change')
var source = document.querySelector('#source')
var target = document.querySelector('#target')
if (!btn || !source || !target) return 'Keep all three elements.'
btn.click()
source.textContent = 'New text'
btn.click()
return target.textContent === 'txet weN' ? true : 'Second click should reverse the new text, got: ' + target.textContent;`,
                },
              ],
              hints: [
                'Read the text with `source.textContent`.',
                'Reverse a string with `text.split("").reverse().join("")`.',
                'Write the result with `target.textContent = reversed`.',
              ],
              solution: {
                html: `<p id="source">Hello world</p>
<p id="target"></p>
<button id="change" type="button">Reverse and copy</button>`,
                javascript: `const button = document.querySelector('#change')
const source = document.querySelector('#source')
const target = document.querySelector('#target')

button.addEventListener('click', function () {
  const text = source.textContent
  const reversed = text.split('').reverse().join('')
  target.textContent = reversed
})`,
              },
              testNotes: 'The checks click your button and verify the target receives the reversed source text. They also check that textContent (not innerHTML) is used for reading, so HTML tags in the source are treated as plain characters.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s57',
    title: 'DOM forms',
    description: 'Work with form data through the DOM. Read values with FormData, use built-in browser validation, and handle submission without a page reload.',
    lessons: [
      {
        id: 'js-l68',
        title: 'Form data and validation',
        description: 'Read form values with FormData, use checkValidity and reportValidity, and handle submit with preventDefault.',
        duration: 6,
        objectives: [
          'Read all form values at once with FormData and get individual fields with .value',
          'Use checkValidity and reportValidity instead of writing custom validation',
          'Handle form submit with preventDefault and stop the browser from navigating',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l68',
          title: 'Form data and validation quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l68-q1',
              type: 'multiple-choice',
              prompt: 'What does `new FormData(form)` give you?',
              options: [
                'An array of input elements',
                'A collection of all named form controls and their values',
                'A JSON string of the form',
                'The form element itself',
              ],
              answer: 1,
              explanation: 'FormData is a collection keyed by the name attribute of each control. It handles checkboxes, file inputs, and multiple values per name automatically.',
            },
            {
              id: 'quiz-js-l68-q2',
              type: 'true-false',
              prompt: '`form.checkValidity()` shows the browser\'s own validation messages to the user.',
              answer: false,
              explanation: 'checkValidity returns true or false without showing anything. reportValidity checks and shows the browser messages. Use reportValidity when you want the user to see the errors.',
            },
            {
              id: 'quiz-js-l68-q3',
              type: 'code-output',
              prompt: 'What happens when this runs on a valid form?',
              code: 'form.addEventListener(\'submit\', function (event) {\n  event.preventDefault()\n  const data = new FormData(form)\n  console.log(data.get(\'email\'))\n})',
              options: [
                'The page reloads',
                'The email value is logged, page does not reload',
                'An error is thrown',
                'Nothing happens',
              ],
              answer: 1,
              explanation: 'preventDefault stops the navigation. FormData reads the values. The handler runs and logs the email.',
            },
            {
              id: 'quiz-js-l68-q4',
              type: 'identify-error',
              prompt: 'What is wrong with validating on the submit button\'s click event?',
              code: 'document.querySelector(\'#submit-btn\').addEventListener(\'click\', function () {\n  if (!form.checkValidity()) return\n  // process form\n})',
              options: [
                'Nothing is wrong',
                'Misses Enter key in fields and runs before browser validation',
                'click does not fire on buttons',
                'checkValidity only works on submit',
              ],
              answer: 1,
              explanation: 'A click listener on the button misses the Enter key in any field. It also runs before the browser\'s native validation can stop invalid submissions. Listen for submit on the form instead.',
            },
            {
              id: 'quiz-js-l68-q5',
              type: 'blank',
              prompt: 'What method on a form element stops the browser from navigating away on submit?',
              answers: [
                'preventDefault',
                'event.preventDefault()',
              ],
              explanation: 'Call event.preventDefault() inside the submit handler. It cancels the default navigation while letting your code run.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l68-b1',
            body: 'Forms are the main way users send data to your code. The DOM gives you two tools: `FormData` to read every field at once, and the browser\'s own validation via `checkValidity` and `reportValidity`. Your job is to listen for `submit` on the form, call `preventDefault` to stop the navigation, then read the values and decide what to do.',
          },
          {
            type: 'demo',
            id: 'j-l68-d1',
            title: 'A handled form with FormData',
            body: 'Fill in the fields and submit. The handler cancels the navigation, reads all values with FormData, and displays them.',
            html: `<form id="demo-form">
  <label for="demo-name">Name</label>
  <input id="demo-name" name="name" type="text" required />
  <label for="demo-email">Email</label>
  <input id="demo-email" name="email" type="email" required />
  <button type="submit">Submit</button>
</form>
<pre id="demo-out"></pre>`,
            javascript: `const form = document.querySelector('#demo-form')
const out = document.querySelector('#demo-out')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }
  const data = new FormData(form)
  const result = {}
  for (const [key, value] of data) {
    result[key] = value
  }
  out.textContent = JSON.stringify(result, null, 2)
})`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'j-l68-h1',
            level: 3,
            body: 'Reading form values',
          },
          {
            type: 'code',
            id: 'j-l68-c1',
            language: 'javascript',
            title: 'FormData and .value',
            code: `const data = new FormData(form)   // every named control at once
data.get('name')               // one value by its field name
for (const [key, value] of data) { }   // iterate the pairs

input.value                    // the current text of one control
form.elements.email.value      // the same, reached through the form`,
          },
          {
            type: 'text',
            id: 'j-l68-b2',
            body: '`FormData` is the right tool once a form has more than a field or two: it is an object-like collection keyed by the `name` attributes, and it knows how to read checkboxes and file inputs. For a single field, `input.value` or `form.elements.name.value` is simpler.',
          },
          {
            type: 'heading',
            id: 'j-l68-h2',
            level: 3,
            body: 'Letting the browser validate',
          },
          {
            type: 'code',
            id: 'j-l68-c2',
            language: 'javascript',
            title: 'checkValidity and reportValidity',
            code: `form.checkValidity()           // true or false: is every field correct?
form.reportValidity()          // check, and show the browser's own messages`,
          },
          {
            type: 'text',
            id: 'j-l68-b3',
            body: 'Put `checkValidity` or `reportValidity` after `preventDefault`, so the form is not already navigating while you check. Leave `required`, `type`, `min` and `max` on your inputs: the browser validates those in the user\'s own language with a message they already understand.',
          },
          {
            type: 'warning',
            id: 'j-l68-w1',
            title: 'Do not validate on click',
            body: 'Listening for `click` on the submit button misses the Enter key in a field and runs before the browser can stop invalid data. Listen for `submit` on the form instead. The submit event fires for the button, for Enter in any field, and only when the browser considers the form valid -- so `required` and `type="email"` get their chance to speak before your code runs.',
          },
          {
            type: 'heading',
            id: 'j-l68-h3',
            level: 3,
            body: 'A complete submit handler',
          },
          {
            type: 'code',
            id: 'j-l68-c3',
            language: 'javascript',
            title: 'The pattern',
            code: `form.addEventListener('submit', function (event) {
  event.preventDefault()          // stop the navigation

  if (!form.checkValidity()) {
    form.reportValidity()         // show browser messages
    return
  }

  const data = new FormData(form)
  // work with data.get('name'), data.get('email'), etc.
})`,
          },
          {
            type: 'exercise',
            id: 'j-l68-x1',
            exercise: {
              id: 'ex-js-form-data',
              instructions: 'Handle the `submit` event on the `#signup` form. Call `event.preventDefault()`. If the form is not valid, call `form.reportValidity()` and return. Otherwise, read the `name` and `email` fields with `FormData`, build the string "Name: <name>, Email: <email>", and write it into the `#result` paragraph.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<form id="signup">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required />
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Sign up</button>
</form>
<p id="result"></p>`,
                javascript: `const form = document.querySelector('#signup')
const result = document.querySelector('#result')

form.addEventListener('submit', function (event) {
  // prevent default, check validity, read FormData, write result
})
`,
              },
              tests: [
                {
                  id: 'ex-js-form-data-t1',
                  label: 'Submitting a valid form writes the expected string',
                  body: `var form = document.querySelector('#signup')
var result = document.querySelector('#result')
if (!form || !result) return 'Keep the form and result paragraph.'
var nameInput = form.querySelector('#name')
var emailInput = form.querySelector('#email')
nameInput.value = 'Ada'
emailInput.value = 'ada@example.com'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return result.textContent === 'Name: Ada, Email: ada@example.com' ? true : 'Result should be "Name: Ada, Email: ada@example.com", got: ' + result.textContent;`,
                },
                {
                  id: 'ex-js-form-data-t2',
                  label: 'Invalid form shows browser validation and does not write result',
                  body: `var form = document.querySelector('#signup')
var result = document.querySelector('#result')
if (!form || !result) return 'Keep the form and result paragraph.'
var nameInput = form.querySelector('#name')
var emailInput = form.querySelector('#email')
nameInput.value = ''
emailInput.value = 'not-an-email'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return result.textContent === '' ? true : 'Result should stay empty for invalid form, got: ' + result.textContent;`,
                },
                {
                  id: 'ex-js-form-data-t3',
                  label: 'Uses FormData to read the values',
                  body: `var form = document.querySelector('#signup')
var result = document.querySelector('#result')
if (!form || !result) return 'Keep the form and result paragraph.'
var nameInput = form.querySelector('#name')
var emailInput = form.querySelector('#email')
nameInput.value = 'Bo'
emailInput.value = 'bo@example.com'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
var usedFormData = result.textContent.includes('Bo') && result.textContent.includes('bo@example.com')
return usedFormData ? true : 'Read values with FormData, not by querying inputs directly.';`,
                },
              ],
              hints: [
                'Call `event.preventDefault()` first.',
                'Check validity with `form.checkValidity()` and show messages with `form.reportValidity()`.',
                'Create `new FormData(form)` and use `data.get("name")` and `data.get("email")`.',
              ],
              solution: {
                html: `<form id="signup">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required />
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />
  <button type="submit">Sign up</button>
</form>
<p id="result"></p>`,
                javascript: `const form = document.querySelector('#signup')
const result = document.querySelector('#result')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  if (!form.checkValidity()) {
    form.reportValidity()
    return
  }
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')
  result.textContent = 'Name: ' + name + ', Email: ' + email
})`,
              },
              testNotes: 'The checks dispatch a real submit event at your form. They verify that preventDefault is called, that invalid forms trigger browser validation and do not write a result, and that valid forms read values through FormData.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s58',
    title: 'DOM CSS',
    description: 'Change styles through the DOM. Use classList for state, style for one-off values, and CSS custom properties for values that come from JavaScript.',
    lessons: [
      {
        id: 'js-l69',
        title: 'Changing styles with the DOM',
        description: 'Toggle classes for state, set inline styles for one-off changes, and use CSS custom properties when JavaScript values need to reach the stylesheet.',
        duration: 6,
        objectives: [
          'Use classList to add, remove, and toggle CSS classes for element state',
          'Set inline styles with element.style for one-off values',
          'Write CSS custom properties from JavaScript for values that belong in the stylesheet',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-js-l69',
          title: 'Changing styles with the DOM quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l69-q1',
              type: 'multiple-choice',
              prompt: 'Which approach should you use for a named UI state like "loading" or "error"?',
              options: [
                'element.style.color = "red"',
                'element.classList.add("error")',
                'element.setAttribute("style", "color: red")',
                'element.style.setProperty("--error", "red")',
              ],
              answer: 1,
              explanation: 'Named states belong in classes. The CSS defines what .error looks like; JavaScript only decides when it applies. This keeps styling in the stylesheet.',
            },
            {
              id: 'quiz-js-l69-q2',
              type: 'true-false',
              prompt: '`el.style.width = 100` sets the width to 100px.',
              answer: false,
              explanation: 'Inline styles require units. `el.style.width = "100px"` works; `el.style.width = 100` is ignored.',
            },
            {
              id: 'quiz-js-l69-q3',
              type: 'code-output',
              prompt: 'What is the result after this runs?',
              code: 'el.style.setProperty(\'--gap\', \'16px\')\nel.style.setProperty(\'--gap\', \'24px\')\nconsole.log(el.style.getPropertyValue(\'--gap\'))',
              options: [
                '16px',
                '24px',
                'Empty string',
                'Error',
              ],
              answer: 1,
              explanation: 'setProperty overwrites the previous value. The second call sets --gap to 24px.',
            },
            {
              id: 'quiz-js-l69-q4',
              type: 'identify-error',
              prompt: 'Why does the .active class not change the color in this case?',
              code: '.active { color: blue; }\n<div id="el" style="color: red" class="active">Text</div>\n<script>\n  document.querySelector(\'#el\').classList.add(\'active\')\n</script>',
              options: [
                'The class is not added',
                'Inline style has higher specificity than class',
                'color property cannot be overridden',
                'active is a reserved class name',
              ],
              answer: 1,
              explanation: 'Inline styles (the style attribute) have higher specificity than classes. The inline color: red wins over .active { color: blue }. Remove the inline style or use !important in CSS (not recommended).',
            },
            {
              id: 'quiz-js-l69-q5',
              type: 'blank',
              prompt: 'What method sets a CSS custom property on an element from JavaScript?',
              answers: [
                'setProperty',
                'style.setProperty',
                'element.style.setProperty',
              ],
              explanation: 'element.style.setProperty("--name", "value") sets a custom property. It is the only way to set a variable with a dash in its name from JavaScript.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l69-b1',
            body: 'There are three ways to change styles from JavaScript, and each has a clear purpose. Use `classList` for state that your CSS already understands -- `active`, `hidden`, `loading`, `error`. Use `element.style` for one-off values that do not map to a class -- a dynamic width, a calculated position, a color from user input. Use CSS custom properties (variables) when a JavaScript value needs to participate in the cascade -- a theme color, a spacing scale, an animation duration.',
          },
          {
            type: 'demo',
            id: 'j-l69-d1',
            title: 'Three ways to change styles',
            body: 'Click each button to see a different styling approach. Class for state, inline style for a computed value, custom property for a theme color.',
            html: `<div id="style-box" class="box">Styled box</div>
<div class="controls">
  <button id="class-btn" type="button">Toggle .active class</button>
  <button id="inline-btn" type="button">Set random width</button>
  <button id="var-btn" type="button">Change --accent color</button>
</div>`,
            css: `.box {
  width: 100px;
  height: 60px;
  background: var(--accent, teal);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.2s, background 0.2s;
}
.box.active {
  border: 3px solid white;
  box-shadow: 0 0 0 2px teal;
}
.controls { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
.controls button { font-size: 12px; padding: 0.3rem 0.6rem; }`,
            javascript: `const box = document.querySelector('#style-box')

document.querySelector('#class-btn').addEventListener('click', function () {
  box.classList.toggle('active')
})

document.querySelector('#inline-btn').addEventListener('click', function () {
  const width = 80 + Math.random() * 120
  box.style.width = width + 'px'
})

document.querySelector('#var-btn').addEventListener('click', function () {
  const hues = ['teal', 'coral', 'gold', 'violet', 'lime']
  const color = hues[Math.floor(Math.random() * hues.length)]
  box.style.setProperty('--accent', color)
})`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'j-l69-h1',
            level: 3,
            body: 'classList for state',
          },
          {
            type: 'code',
            id: 'j-l69-c1',
            language: 'javascript',
            title: 'Toggle, add, remove, contains',
            code: `el.classList.add('loading')
el.classList.remove('hidden')
el.classList.toggle('active')
if (el.classList.contains('error')) { }`,
          },
          {
            type: 'text',
            id: 'j-l69-b2',
            body: 'Classes are the contract between your HTML, CSS, and JavaScript. The CSS defines what `.active` looks like. JavaScript only decides *when* it applies. This keeps styling in CSS where it belongs -- responsive, maintainable, and inspectable in dev tools.',
          },
          {
            type: 'heading',
            id: 'j-l69-h2',
            level: 3,
            body: 'Inline style for one-offs',
          },
          {
            type: 'code',
            id: 'j-l69-c2',
            language: 'javascript',
            title: 'element.style.property',
            code: `el.style.color = 'crimson'
el.style.width = calculatedWidth + 'px'
el.style.transform = 'translateX(' + x + 'px)'
el.style.setProperty('--gap', gap + 'px')`,
          },
          {
            type: 'text',
            id: 'j-l69-b3',
            body: 'Inline styles have the highest specificity, so they override your stylesheet. Use them sparingly -- only for values that are truly dynamic and do not correspond to a reusable state. Always include units (`px`, `rem`, `%`) when setting numeric values; `el.style.width = 100` does nothing, `el.style.width = "100px"` works.',
          },
          {
            type: 'warning',
            id: 'j-l69-w1',
            title: 'Inline styles beat your stylesheet',
            body: 'An inline `style="color: red"` wins over any class in your CSS. If you set `el.style.color = "red"` and later try to change it with a class, the inline style still wins until you remove it (`el.style.color = ""`). Prefer a class when the change represents a named state.',
          },
          {
            type: 'heading',
            id: 'j-l69-h3',
            level: 3,
            body: 'CSS custom properties for JavaScript values',
          },
          {
            type: 'code',
            id: 'j-l69-c3',
            language: 'javascript',
            title: 'setProperty and getPropertyValue',
            code: `el.style.setProperty('--theme-color', '#0f766e')
el.style.setProperty('--duration', '0.3s')
const color = el.style.getPropertyValue('--theme-color')`,
          },
          {
            type: 'text',
            id: 'j-l69-b4',
            body: 'Custom properties let a JavaScript value flow into the stylesheet. Define `--theme-color` in your CSS, use it in `background: var(--theme-color)`, and update it from JavaScript with `setProperty`. The change affects every element that uses that variable, and it respects the cascade -- a parent can override it for a subtree.',
          },
          {
            type: 'exercise',
            id: 'j-l69-x1',
            exercise: {
              id: 'ex-js-dom-styles',
              instructions: 'Wire up three buttons: `#class-btn` toggles the `highlight` class on the `#target` box, `#inline-btn` sets the box\'s `backgroundColor` to a random hex color, and `#var-btn` sets the custom property `--accent` on the box to a random color from the array `["tomato", "gold", "lime", "cyan", "violet"]`.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<div id="target" class="box">Target</div>
<div class="controls">
  <button id="class-btn" type="button">Toggle highlight</button>
  <button id="inline-btn" type="button">Random background</button>
  <button id="var-btn" type="button">Random accent</button>
</div>`,
                javascript: `const box = document.querySelector('#target')

document.querySelector('#class-btn').addEventListener('click', function () {
  // toggle highlight class
})

document.querySelector('#inline-btn').addEventListener('click', function () {
  // set random backgroundColor
})

document.querySelector('#var-btn').addEventListener('click', function () {
  // set --accent custom property
})
`,
              },
              tests: [
                {
                  id: 'ex-js-dom-styles-t1',
                  label: 'Class button toggles the highlight class',
                  body: `var box = document.querySelector('#target')
var btn = document.querySelector('#class-btn')
if (!box || !btn) return 'Keep the box and class button.'
btn.click()
var has1 = box.classList.contains('highlight')
btn.click()
var has2 = box.classList.contains('highlight')
return has1 && !has2 ? true : 'First click adds highlight, second removes it.';`,
                },
                {
                  id: 'ex-js-dom-styles-t2',
                  label: 'Inline button sets backgroundColor with a color value',
                  body: `var box = document.querySelector('#target')
var btn = document.querySelector('#inline-btn')
if (!box || !btn) return 'Keep the box and inline button.'
btn.click()
var bg = box.style.backgroundColor
return bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)' ? true : 'backgroundColor should be set to a color value.';`,
                },
                {
                  id: 'ex-js-dom-styles-t3',
                  label: 'Var button sets --accent custom property',
                  body: `var box = document.querySelector('#target')
var btn = document.querySelector('#var-btn')
if (!box || !btn) return 'Keep the box and var button.'
btn.click()
var accent = box.style.getPropertyValue('--accent')
return accent && accent.trim().length > 0 ? true : 'Custom property --accent should be set.';`,
                },
              ],
              hints: [
                'Use `box.classList.toggle("highlight")` for the class button.',
                'Generate a random hex color: `"#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, "0")`. Set it with `box.style.backgroundColor = color`.',
                'Pick a random color from the array and set it with `box.style.setProperty("--accent", color)`.',
              ],
              solution: {
                html: `<div id="target" class="box">Target</div>
<div class="controls">
  <button id="class-btn" type="button">Toggle highlight</button>
  <button id="inline-btn" type="button">Random background</button>
  <button id="var-btn" type="button">Random accent</button>
</div>`,
                javascript: `const box = document.querySelector('#target')

document.querySelector('#class-btn').addEventListener('click', function () {
  box.classList.toggle('highlight')
})

document.querySelector('#inline-btn').addEventListener('click', function () {
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  box.style.backgroundColor = color
})

document.querySelector('#var-btn').addEventListener('click', function () {
  const colors = ['tomato', 'gold', 'lime', 'cyan', 'violet']
  const color = colors[Math.floor(Math.random() * colors.length)]
  box.style.setProperty('--accent', color)
})`,
              },
              testNotes: 'The checks click each button and verify the expected style change: classList toggle, inline style backgroundColor, and custom property --accent.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'js-s59',
    title: 'DOM animations',
    description: 'Build simple animations with the Web Animations API and requestAnimationFrame. Move elements, fade them, and chain effects without a library.',
    lessons: [
      {
        id: 'js-l70',
        title: 'Simple animations',
        description: 'Animate with the Web Animations API, use requestAnimationFrame for custom loops, and clean up with finish and cancel.',
        duration: 7,
        objectives: [
          'Animate an element with the Web Animations API using keyframes and options',
          'Use requestAnimationFrame for a custom animation loop and stop it with cancelAnimationFrame',
          'Chain animations with Promise-based finish and handle reduce-motion preference',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-js-l70',
          title: 'Simple animations quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-js-l70-q1',
              type: 'multiple-choice',
              prompt: 'What does `element.animate(keyframes, options)` return?',
              options: [
                'A Promise',
                'An Animation object',
                'The element itself',
                'A keyframe array',
              ],
              answer: 1,
              explanation: 'animate returns an Animation object with play, pause, reverse, cancel, finish, and a finished Promise.',
            },
            {
              id: 'quiz-js-l70-q2',
              type: 'true-false',
              prompt: 'The Web Animations API automatically respects prefers-reduced-motion without any extra code.',
              answer: false,
              explanation: 'The browser does not auto-pause WAAPI animations. You must check matchMedia and either skip the animation or set duration to 0 when reduced motion is preferred.',
            },
            {
              id: 'quiz-js-l70-q3',
              type: 'code-output',
              prompt: 'What does this log when the animation finishes?',
              code: 'el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100 })\n  .finished.then(function () { console.log(\'done\') })',
              options: [
                'done',
                'Nothing',
                'An error',
                'The Animation object',
              ],
              answer: 0,
              explanation: 'The finished Promise resolves when the animation completes. The callback logs "done".',
            },
            {
              id: 'quiz-js-l70-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this RAF loop?',
              code: 'function tick() {\n  el.style.left = x + \'px\'\n  x += 1\n  requestAnimationFrame(tick)\n}\ntick()',
              options: [
                'Nothing is wrong',
                'No way to stop the loop -- missing cancelAnimationFrame',
                'requestAnimationFrame does not take a function',
                'tick must be an arrow function',
              ],
              answer: 1,
              explanation: 'The loop runs forever with no way to stop it. Store the return value of requestAnimationFrame and pass it to cancelAnimationFrame when you need to stop.',
            },
            {
              id: 'quiz-js-l70-q5',
              type: 'blank',
              prompt: 'What method on an Animation object stops it and jumps to the end state (if fill: forwards)?',
              answers: [
                'finish',
                'finish()',
              ],
              explanation: 'anim.finish() completes the animation immediately and resolves the finished Promise. cancel() stops it and reverts unless fill: forwards is set.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'j-l70-b1',
            body: 'The browser gives you two built-in ways to animate. The Web Animations API (`element.animate`) runs on the compositor thread, handles keyframes, easing, and fill modes, and returns an Animation object you can pause, reverse, or finish. `requestAnimationFrame` runs a callback before the next paint -- use it for custom logic like physics, canvas drawing, or scrolling effects. Both respect `prefers-reduced-motion` when you check it.',
          },
          {
            type: 'demo',
            id: 'j-l70-d1',
            title: 'Web Animations API and requestAnimationFrame',
            body: 'Click "WAAPI" to slide the box with the Web Animations API. Click "RAF" to run a custom loop that rotates the box. Both respect reduced motion.',
            html: `<div id="anim-box" class="anim-box">Animated</div>
<div class="controls">
  <button id="waapi-btn" type="button">WAAPI slide</button>
  <button id="raf-btn" type="button">RAF rotate</button>
  <button id="stop-btn" type="button">Stop RAF</button>
</div>`,
            css: `.anim-box {
  width: 80px;
  height: 80px;
  background: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.controls { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
.controls button { font-size: 12px; padding: 0.3rem 0.6rem; }
@media (prefers-reduced-motion: reduce) {
  .anim-box { animation: none !important; transition: none !important; }
}`,
            javascript: `const box = document.querySelector('#anim-box')
let rafId = null

document.querySelector('#waapi-btn').addEventListener('click', function () {
  box.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(200px)' }],
    { duration: 600, easing: 'ease-out', fill: 'forwards' }
  )
})

document.querySelector('#raf-btn').addEventListener('click', function () {
  let angle = 0
  function tick() {
    angle += 2
    box.style.transform = 'rotate(' + angle + 'deg)'
    rafId = requestAnimationFrame(tick)
  }
  tick()
})

document.querySelector('#stop-btn').addEventListener('click', function () {
  if (rafId) cancelAnimationFrame(rafId)
})`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'j-l70-h1',
            level: 3,
            body: 'Web Animations API',
          },
          {
            type: 'code',
            id: 'j-l70-c1',
            language: 'javascript',
            title: 'element.animate(keyframes, options)',
            code: `const anim = el.animate(
  [{ opacity: 0 }, { opacity: 1 }],
  { duration: 300, easing: 'ease-out', fill: 'forwards' }
)
anim.finished.then(function () { console.log('done') })
anim.cancel()   // stop and reset`,
          },
          {
            type: 'text',
            id: 'j-l70-b2',
            body: 'The first argument is an array of keyframe objects. Each keyframe can have any animatable CSS property. The second argument is either a duration in milliseconds or an options object with `duration`, `easing`, `delay`, `iterations`, `direction`, `fill`, and `composite`. The returned `Animation` object has `play`, `pause`, `reverse`, `cancel`, `finish`, and a `finished` Promise.',
          },
          {
            type: 'heading',
            id: 'j-l70-h2',
            level: 3,
            body: 'requestAnimationFrame for custom loops',
          },
          {
            type: 'code',
            id: 'j-l70-c2',
            language: 'javascript',
            title: 'A basic loop',
            code: `let rafId = null
function tick(time) {
  // time is a high-resolution timestamp in milliseconds
  el.style.transform = 'translateX(' + Math.sin(time / 200) * 100 + 'px)'
  rafId = requestAnimationFrame(tick)
}
tick()
// later: cancelAnimationFrame(rafId)`,
          },
          {
            type: 'text',
            id: 'j-l70-b3',
            body: 'requestAnimationFrame calls your function with a timestamp before the next repaint. Return a new requestAnimationFrame call to continue the loop. Store the returned id and pass it to cancelAnimationFrame to stop. Use the timestamp for time-based motion, not frame counting -- the browser may skip frames under load.',
          },
          {
            type: 'warning',
            id: 'j-l70-w1',
            title: 'Respect prefers-reduced-motion',
            body: 'Some users configure their OS to minimize animation. Check `window.matchMedia("(prefers-reduced-motion: reduce)").matches` before starting non-essential motion. For WAAPI, the browser does not auto-pause -- you must skip the animation or set duration to 0. For RAF, do not start the loop. This is not optional: it is an accessibility requirement.',
          },
          {
            type: 'heading',
            id: 'j-l70-h3',
            level: 3,
            body: 'Chaining and cleanup',
          },
          {
            type: 'code',
            id: 'j-l70-c3',
            language: 'javascript',
            title: 'Sequential animations with finished',
            code: `el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 })
  .finished.then(function () {
    return el.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(100px)' }], { duration: 300 })
  })
  .then(function (anim) { return anim.finished })
  .then(function () { console.log('both done') })`,
          },
          {
            type: 'text',
            id: 'j-l70-b4',
            body: 'The `finished` Promise resolves when the animation completes (or is cancelled). Chain `.then` to run the next step. Call `cancel()` to stop an animation and jump to its end state (if `fill: forwards`) or revert (if not). Always clean up RAF loops when the component unmounts or the animation is no longer needed.',
          },
          {
            type: 'exercise',
            id: 'j-l70-x1',
            exercise: {
              id: 'ex-js-simple-animation',
              instructions: 'Wire up the `#fade-btn` to fade out the `#target` box using the Web Animations API (animate opacity from 1 to 0 over 400ms). Wire up the `#slide-btn` to slide the box from its current position to translateX(150px) over 500ms with ease-out easing. Both animations should use fill: forwards so the end state sticks.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<div id="target" class="box">Animate me</div>
<div class="controls">
  <button id="fade-btn" type="button">Fade out</button>
  <button id="slide-btn" type="button">Slide right</button>
</div>`,
                javascript: `const box = document.querySelector('#target')

document.querySelector('#fade-btn').addEventListener('click', function () {
  // fade out with animate
})

document.querySelector('#slide-btn').addEventListener('click', function () {
  // slide right with animate
})
`,
              },
              tests: [
                {
                  id: 'ex-js-simple-animation-t1',
                  label: 'Fade button runs an opacity animation to 0',
                  body: `var box = document.querySelector('#target')
var btn = document.querySelector('#fade-btn')
if (!box || !btn) return 'Keep the box and fade button.'
btn.click()
return box.getAnimations().some(function (a) {
  var kf = a.effect.getKeyframes()
  return kf.some(function (f) { return f.opacity === 0 })
}) ? true : 'Fade button should run an animation with opacity to 0.';`,
                },
                {
                  id: 'ex-js-simple-animation-t2',
                  label: 'Slide button runs a transform animation to translateX(150px)',
                  body: `var box = document.querySelector('#target')
var btn = document.querySelector('#slide-btn')
if (!box || !btn) return 'Keep the box and slide button.'
btn.click()
return box.getAnimations().some(function (a) {
  var kf = a.effect.getKeyframes()
  return kf.some(function (f) { return f.transform && f.transform.includes('150') })
}) ? true : 'Slide button should run an animation with transform translateX(150px).';`,
                },
                {
                  id: 'ex-js-simple-animation-t3',
                  label: 'Both animations use fill: forwards',
                  body: `var box = document.querySelector('#target')
var fadeBtn = document.querySelector('#fade-btn')
var slideBtn = document.querySelector('#slide-btn')
if (!box || !fadeBtn || !slideBtn) return 'Keep the box and both buttons.'
fadeBtn.click()
var fadeAnim = box.getAnimations()[0]
return fadeAnim && fadeAnim.effect.getComputedTiming().fill === 'forwards' ? true : 'Fade animation should use fill: forwards.';`,
                },
              ],
              hints: [
                'Use `box.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: "forwards" })` for fade.',
                'Use `box.animate([{ transform: "translateX(0)" }, { transform: "translateX(150px)" }], { duration: 500, easing: "ease-out", fill: "forwards" })` for slide.',
                'The keyframes array defines the start and end states. The options object controls timing.',
              ],
              solution: {
                html: `<div id="target" class="box">Animate me</div>
<div class="controls">
  <button id="fade-btn" type="button">Fade out</button>
  <button id="slide-btn" type="button">Slide right</button>
</div>`,
                javascript: `const box = document.querySelector('#target')

document.querySelector('#fade-btn').addEventListener('click', function () {
  box.animate(
    [{ opacity: 1 }, { opacity: 0 }],
    { duration: 400, fill: 'forwards' }
  )
})

document.querySelector('#slide-btn').addEventListener('click', function () {
  box.animate(
    [{ transform: 'translateX(0)' }, { transform: 'translateX(150px)' }],
    { duration: 500, easing: 'ease-out', fill: 'forwards' }
  )
})`,
              },
              testNotes: 'The checks click each button and inspect the running animations via getAnimations(). They verify the keyframes contain the expected end values and that fill is set to forwards.',
            },
          },
        ],
      },
    ],
  },
]