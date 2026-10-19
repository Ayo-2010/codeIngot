import type { Section } from '~/types/content'

export const jsDomEventsWindowSections: Section[] = [
  {
    id: 'js-s60',
    title: 'DOM events',
    description: 'The user does something, the page reacts. Handling those moments well is most of what front-end JavaScript actually is.',
    lessons: [
      {
        id: 'js-l71',
        title: 'Events and form submission',
        description: 'Listen for what the user does, work out who did it, and stop the browser doing it too.',
        duration: 7,
        objectives: [
          'Attach handlers with addEventListener and read the event object',
          'Tell this, event.target and event.currentTarget apart',
          'Handle a submit with preventDefault and read the values with .value or FormData',
          'Use checkValidity and reportValidity instead of inventing your own validation',
        ],
        xp: 55,
        content: [
          {
            type: 'text',
            id: 'j-l71-b1',
            body: 'Every time the user clicks, types, submits or scrolls, the browser fires an **event**: a named signal that something happened. JavaScript listens for those signals and runs your code in response. This lesson covers the whole loop — attach a listener, work out which element the event came from, and cancel the browser default when you want to handle it yourself.',
          },
          {
            type: 'tip',
            id: 'j-l71-dt',
            title: 'Keep the developer tools open',
            body: 'Open them with **F12**, **Ctrl + Shift + I** / **Cmd + Option + I**, or right-click the page and choose **Inspect**. The **Elements** panel is the live DOM; the **Console** panel shows logs and errors.',
          },
          {
            type: 'demo',
            id: 'j-l71-d1',
            title: 'A form that does not navigate',
            body: 'Press **Sign up**. The handler calls `preventDefault`, so the page stays exactly where it is and the greeting is written into the paragraph. The second listener sits on `document`, so every click anywhere is logged with the tag name of the element that was actually clicked — that is `event.target`.',
            html: `<form id="signup">
  <input id="email" type="email" value="ada@codeingot.dev" />
  <button type="submit">Sign up</button>
</form>
<p id="log"></p>`,
            javascript: `const form = document.querySelector('#signup')
const log = document.querySelector('#log')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  log.textContent = 'Signed up ' + form.elements.email.value
})

document.addEventListener('click', function (event) {
  console.log('clicked a ' + event.target.tagName)
})`,
            height: 180,
          },
          {
            type: 'text',
            id: 'j-l71-b2',
            body: 'An **event** is something that happened: a click, a keystroke, a submit, a scroll. `addEventListener` takes the event name and a function, and runs the function whenever that event happens on that element. The name has no `on` prefix — `click`, not `onclick`. Unlike the old `onclick` property it never overwrites what is already attached: you can add several handlers for the same event, and take them off again with `removeEventListener` and the same function reference.',
          },
          {
            type: 'heading',
            id: 'j-l71-h1',
            level: 3,
            body: 'The event object',
          },
          {
            type: 'code',
            id: 'j-l71-c1',
            language: 'javascript',
            title: 'What the handler is handed',
            code: `input.addEventListener('input', function (event) {
  console.log(event.type)   // 'input'
  console.log(event.key)    // key events only: 'a', 'Enter', 'Escape'
})

window.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') submit()
})`,
          },
          {
            type: 'text',
            id: 'j-l71-b3',
            body: 'The handler receives one argument: the event itself. Because the event knows which element it came from, the same function can serve many elements — one handler, many inputs, no duplication.',
          },
          {
            type: 'heading',
            id: 'j-l71-h2',
            level: 3,
            body: 'this, target and currentTarget',
          },
          {
            type: 'code',
            id: 'j-l71-c2',
            language: 'javascript',
            title: 'Three names, two elements',
            code: `list.addEventListener('click', function (event) {
  this                  // the element the listener is attached to
  event.currentTarget   // the same thing, spelled as a property
  event.target          // the element that was actually clicked
})`,
          },
          {
            type: 'text',
            id: 'j-l71-b4',
            body: 'These are the same element and a different element. Attach to a list and click a button inside it: `currentTarget` — and `this` inside a normal function — is the list you attached to, while `target` is the button. Use `target` when you care *which* control was used and `currentTarget` when you care *where you are*. An arrow function has no `this` of its own, so in an arrow handler reach for `event.currentTarget`.',
          },
          {
            type: 'heading',
            id: 'j-l71-h3',
            level: 3,
            body: 'Forms submit themselves',
          },
          {
            type: 'code',
            id: 'j-l71-c3',
            language: 'javascript',
            title: 'A handled submit',
            code: `form.addEventListener('submit', function (event) {
  event.preventDefault()          // stop the navigation

  const email = form.elements.email.value
  message.textContent = 'Thanks, ' + email
  message.classList.add('ok')
})`,
          },
          {
            type: 'text',
            id: 'j-l71-b5',
            body: 'A form with an action navigates the whole page when submitted — that is the browser default, and without cancelling it your handler is thrown away mid-sentence. There is no event for "the submit button was clicked": listen for `submit` on the form and you also get the Enter key in any field, which is what people actually try. `preventDefault` only cancels the default action; it does not stop other listeners on the same event, which is what `stopPropagation` is for.',
          },
          {
            type: 'heading',
            id: 'j-l71-h4',
            level: 3,
            body: 'Reading values and letting the browser validate',
          },
          {
            type: 'code',
            id: 'j-l71-c4',
            language: 'javascript',
            title: 'FormData and validity',
            code: `const data = new FormData(form)   // every named control at once
data.get('name')               // one value by its field name
for (const [key, value] of data) { }   // iterate the pairs

input.value                    // the current text of one control
form.elements.email.value      // the same, reached through the form
form.checkValidity()           // true or false: is every field correct?
form.reportValidity()          // check, and show the browser's own messages`,
          },
          {
            type: 'text',
            id: 'j-l71-b6',
            body: '`FormData` is the right tool once a form has more than a field or two: it is an object-like collection keyed by the `name` attributes, and it knows how to read checkboxes and file inputs. Put `checkValidity` or `reportValidity` *after* `preventDefault`, so the form is not already navigating while you check. And leave `required`, `type`, `min` and `max` on your inputs: the browser validates those in the user\'s own language with a message they already understand.',
          },
          {
            type: 'warning',
            id: 'j-l71-w1',
            title: 'Do not attach listeners inside a loop',
            body: 'Calling `addEventListener` inside a `for` loop attaches one handler *per element*, which sounds efficient until the same loop runs a second time over the same elements — now every existing handler fires again as well. Two clicks do three things and the cause is nowhere near the symptom. Attach each listener once, outside the loop, or put a single listener on the container and read `event.target` to work out which child was used. The same trap is behind the classic "my page runs twice" bug when a script gets included twice.',
          },
          {
            type: 'example',
            id: 'j-l71-e1',
            title: 'A handled form with a live region',
            body: 'Type in the field and submit. The page does not reload, because the handler cancels the default.',
            html: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" value="ada@codeingot.dev" />
  <button type="submit">Sign up</button>
</form>
<p id="message"></p>`,
            javascript: `const form = document.querySelector('#signup')
const message = document.querySelector('#message')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const email = form.elements.email.value
  message.textContent = 'Thanks, ' + email
  message.classList.add('ok')
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l71-x1',
            exercise: {
              id: 'ex-js-form-submit',
              instructions:
                'Handle the `submit` event on the `#signup` form. Call `event.preventDefault()`, read the current value from the `#email` input, write "Thanks, <that value>" into the `#message` paragraph, and add the class `ok` to that paragraph.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />
  <button type="submit" id="submit">Sign up</button>
</form>
<p id="message"></p>`,
                javascript: `const form = document.querySelector('#signup')
const message = document.querySelector('#message')

form.addEventListener('submit', function (event) {
  // cancel the navigation, read the value, write the message
})
`,
              },
              tests: [
                {
                  id: 'ex-js-form-submit-t1',
                  label: 'Submitting writes the greeting into #message',
                  body: `var form = document.querySelector('#signup')
var input = document.querySelector('#email')
var message = document.querySelector('#message')
if (!form || !input || !message) return 'Keep the form, the input and the message paragraph.'
input.value = 'ada@codeingot.dev'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return message.textContent.trim() === 'Thanks, ada@codeingot.dev' ? true : 'After submitting, #message should read Thanks, ada@codeingot.dev — got: ' + message.textContent.trim();`,
                },
                {
                  id: 'ex-js-form-submit-t2',
                  label: 'The value is read at submit time, not when the page loaded',
                  body: `var form = document.querySelector('#signup')
var input = document.querySelector('#email')
var message = document.querySelector('#message')
if (!form || !input || !message) return 'Keep the form, the input and the message paragraph.'
input.value = 'bo@codeingot.dev'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return message.textContent.trim() === 'Thanks, bo@codeingot.dev' ? true : 'Read the value inside the handler: the second submit should greet bo@codeingot.dev.';`,
                },
                {
                  id: 'ex-js-form-submit-t3',
                  label: 'The default submit is prevented',
                  body: `var form = document.querySelector('#signup')
if (!form) return 'Keep the #signup form.'
var notCancelled = form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return notCancelled === false ? true : 'Call event.preventDefault() first, or the browser navigates away and your handler is wasted.';`,
                },
                {
                  id: 'ex-js-form-submit-t4',
                  label: 'The ok class is added to the message',
                  body: `var form = document.querySelector('#signup')
var input = document.querySelector('#email')
var message = document.querySelector('#message')
if (!form || !input || !message) return 'Keep the form, the input and the message paragraph.'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return message.classList.contains('ok') ? true : 'Add the class with message.classList.add("ok") inside the handler.';`,
                },
              ],
              hints: [
                'The handler already receives the event as its parameter — read its value with `event.preventDefault()`.',
                'Get the typed text at the moment of submitting, for example `input.value` or `form.elements.email.value`.',
                'Then set the text and the class on the message paragraph: `message.textContent = "Thanks, " + email` and `message.classList.add("ok")`.',
              ],
              solution: {
                html: `<form id="signup">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" />
  <button type="submit" id="submit">Sign up</button>
</form>
<p id="message"></p>`,
                javascript: `const form = document.querySelector('#signup')
const message = document.querySelector('#message')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const email = form.elements.email.value
  message.textContent = 'Thanks, ' + email
  message.classList.add('ok')
})`,
              },
              testNotes:
                'The checks fire a real submit event at your form, so they exercise the whole path: cancel, read, write, add the class. Press the button yourself first to see the same thing happen live.',
            },
          },
        ],
      },
      {
        id: 'js-l72',
        title: 'Event listeners in practice',
        description: 'The options object, event delegation, and the four event names that cover most of what a page needs.',
        duration: 7,
        objectives: [
          'Attach one listener to a container and handle every child with event delegation',
          'Use the options object: once, passive and capture',
          'Remove a listener and know why the same function reference matters',
          'Pick between input, change, keydown and submit for the job in front of you',
        ],
        xp: 55,
        content: [
          {
            type: 'text',
            id: 'j-l72-b1',
            body: 'Attaching a listener to every button on a page works, but it is the wrong shape: the buttons have to exist before you can find them, so your code has to run again every time new ones appear, and a re-run quietly doubles every handler. There is a better arrangement — one listener on the container, and one line that works out which child was used.',
          },
          {
            type: 'demo',
            id: 'j-l72-d1',
            title: 'One listener, any number of buttons',
            body: 'Click Tea, then Coffee, then Cocoa. Cocoa is added to the page *after* the script ran, and it still works — that is delegation. The listener is on `#menu`; `event.target.closest(".pick")` finds which button it was, wherever in the list it sits.',
            html: `<ul id="menu">
  <li><button class="pick" data-label="Tea">Tea</button></li>
  <li><button class="pick" data-label="Coffee">Coffee</button></li>
</ul>
<p id="chosen">Nothing picked yet</p>`,
            javascript: `const menu = document.querySelector('#menu')
const chosen = document.querySelector('#chosen')

menu.addEventListener('click', function (event) {
  const button = event.target.closest('.pick')
  if (!button) return
  chosen.textContent = 'You picked ' + button.dataset.label
})

const row = menu.querySelector('li').cloneNode(true)
row.querySelector('button').textContent = 'Cocoa'
row.querySelector('button').dataset.label = 'Cocoa'
menu.append(row)`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'j-l72-h1',
            level: 3,
            body: 'Delegation, step by step',
          },
          {
            type: 'list',
            id: 'j-l72-l1',
            style: 'ordered',
            items: [
              'Attach one listener to the element that will always be there — the list, the table, the form.',
              'Inside the handler, take `event.target` and call `closest(".your-class")` to find the real control.',
              'If `closest` returns `null`, the click was not on one of your controls, so return and do nothing.',
              'Read the data you need from that element — a `data-` attribute, a `value`, a `textContent`.',
            ],
          },
          {
            type: 'text',
            id: 'j-l72-b2',
            body: 'The reason it works is the third phase of an event\'s journey. A click does not stay on the button: it bubbles up through every ancestor, so a listener on the list hears about clicks on any descendant. `closest` walks back *down* from wherever the event started to the nearest ancestor with your class, which is why it is the right tool even when the user clicks the text inside a button.',
          },
          {
            type: 'warning',
            id: 'j-l72-w1',
            title: 'closest finds ancestors, and the element itself',
            body: '`closest` starts at the element you call it on and walks up, so `event.target.closest(".pick")` works whether the target is the button or a `<span>` inside it. It does not walk down: if you attach to a button and click a `<span>` inside it, the listener never fires at all, because the event only travels upward. That is the shape delegation fixes.',
          },
          {
            type: 'heading',
            id: 'j-l72-h2',
            level: 3,
            body: 'The options object',
          },
          {
            type: 'code',
            id: 'j-l72-c1',
            language: 'javascript',
            title: 'Three options worth knowing',
            code: `button.addEventListener('click', handler, { once: true })
// fires once, then removes itself

window.addEventListener('scroll', onScroll, { passive: true })
// promises not to call preventDefault, so the browser
// never has to wait for your handler before scrolling

form.addEventListener('submit', onSubmit, { capture: true })
// runs before any handler on an inner element`,
          },
          {
            type: 'tip',
            id: 'j-l72-t1',
            title: 'Use { once: true } for one-shot behaviour',
            body: 'A "show the banner again" button, a one-time onboarding step, a splash that should appear on the first visit only — all of them are the same shape: run this once, then stop caring. `{ once: true }` says that for you and removes the listener automatically, so you cannot leak a handler that fires forever on a page that is still in the DOM.',
          },
          {
            type: 'heading',
            id: 'j-l72-h3',
            level: 3,
            body: 'Taking a listener off again',
          },
          {
            type: 'code',
            id: 'j-l72-c2',
            language: 'javascript',
            title: 'Same reference, or it does not work',
            code: `function onOpen() { }

panel.addEventListener('toggle', onOpen)
panel.removeEventListener('toggle', onOpen)   // this one is removed

panel.removeEventListener('toggle', function onOpen() { })
// this one is NOT: a new function object, so it matches nothing`,
          },
          {
            type: 'text',
            id: 'j-l72-b3',
            body: 'Removal is by identity, not by looking-alike. `removeEventListener` finds the exact function object you passed in, so a fresh inline function matches nothing and the listener stays quietly attached forever. If you need to remove it, keep a reference: declare the handler as a named function or a `const` above the `addEventListener` call.',
          },
          {
            type: 'heading',
            id: 'j-l72-h4',
            level: 3,
            body: 'Which event for which job',
          },
          {
            type: 'list',
            id: 'j-l72-l2',
            style: 'bullet',
            items: [
              '`click` — a deliberate activation. Never fires for Enter or Space on a button, because those browsers turn into a synthetic click for you.',
              '`input` — fires on every edit to a text field, immediately. Use it for live validation, character counters and search-as-you-type.',
              '`change` — fires when the field is finished with: on blur, or immediately for checkboxes, selects and radios. Use it for anything expensive.',
              '`keydown` — fires for every key, including Tab and Escape. Use it for shortcuts, and call `event.preventDefault()` to stop the browser acting on the key.',
              '`submit` — on the form, not the button. The only one that also covers the Enter key.',
            ],
          },
          {
            type: 'example',
            id: 'j-l72-e1',
            title: 'Delegation with a guard and a data attribute',
            body: 'Click a row. The row is the only thing that changed; the listener never moved.',
            html: `<ul id="tasks">
  <li><button class="done" data-id="1">Mark 1 done</button></li>
  <li><button class="done" data-id="2">Mark 2 done</button></li>
</ul>`,
            javascript: `document.querySelector('#tasks').addEventListener('click', function (event) {
  const button = event.target.closest('.done')
  if (!button) return
  button.closest('li').classList.add('finished')
  console.log('finished task ' + button.dataset.id)
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l72-x1',
            exercise: {
              id: 'ex-js-event-delegation',
              instructions:
                'Attach a single click listener to the `#menu` list. When any button with the class `pick` inside it is clicked, set the text of the `#chosen` paragraph to the button\'s `data-label` value. Use `event.target.closest(".pick")` and ignore clicks that land on nothing with that class. Do not attach a listener to the individual buttons.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<ul id="menu">
  <li><button class="pick" data-label="Tea">Tea</button></li>
  <li><button class="pick" data-label="Coffee">Coffee</button></li>
</ul>
<p id="chosen">Nothing picked yet</p>`,
                javascript: `const menu = document.querySelector('#menu')
const chosen = document.querySelector('#chosen')

// One listener on the list, not one on each button.
`,
              },
              tests: [
                {
                  id: 'ex-js-event-delegation-t1',
                  label: 'Clicking the Tea button writes "Tea" into #chosen',
                  body: `var first = document.querySelector('#menu .pick')
var chosen = document.querySelector('#chosen')
if (!first) return 'Keep the .pick buttons from the starter HTML.'
if (!chosen) return 'Keep the #chosen paragraph.'
first.click()
return chosen.textContent.trim() === 'Tea' ? true : 'After clicking the first pick, #chosen should read exactly: Tea — got: ' + chosen.textContent.trim();`,
                },
                {
                  id: 'ex-js-event-delegation-t2',
                  label: 'Clicking the second button changes the answer',
                  body: `var picks = document.querySelectorAll('#menu .pick')
var chosen = document.querySelector('#chosen')
if (picks.length < 2) return 'Keep both starter buttons.'
if (!chosen) return 'Keep the #chosen paragraph.'
picks[0].click()
picks[1].click()
return chosen.textContent.trim() === 'Coffee' ? true : 'The second click should overwrite the first, so #chosen should read: Coffee';`,
                },
                {
                  id: 'ex-js-event-delegation-t3',
                  label: 'Clicking the list itself changes nothing',
                  body: `var menu = document.querySelector('#menu')
var chosen = document.querySelector('#chosen')
if (!menu || !chosen) return 'Keep the #menu list and the #chosen paragraph.'
var pick = menu.querySelector('.pick')
if (!pick) return 'Keep the .pick buttons from the starter HTML.'
pick.click()
var before = chosen.textContent.trim()
menu.click()
return chosen.textContent.trim() === before
  ? true
  : 'A click on the container is not a pick: return early when closest(".pick") gives you null.';`,
                },
                {
                  id: 'ex-js-event-delegation-t4',
                  label: 'A button added after load also works',
                  body: `var menu = document.querySelector('#menu')
var chosen = document.querySelector('#chosen')
if (!menu || !chosen) return 'Keep the #menu list and the #chosen paragraph.'
var fresh = document.createElement('button')
fresh.className = 'pick'
fresh.setAttribute('data-label', 'Cocoa')
fresh.textContent = 'Cocoa'
menu.append(fresh)
fresh.click()
return chosen.textContent.trim() === 'Cocoa'
  ? true
  : 'A button added after page load should still work — that means one listener on #menu, not one per button.';`,
                },
              ],
              hints: [
                'Attach the listener to the list: `menu.addEventListener("click", handler)`.',
                'Inside, resolve the control with `var button = event.target.closest(".pick")` and `if (!button) return` before doing anything else.',
                'Then read the label and write it: `chosen.textContent = button.dataset.label`.',
              ],
              solution: {
                html: `<ul id="menu">
  <li><button class="pick" data-label="Tea">Tea</button></li>
  <li><button class="pick" data-label="Coffee">Coffee</button></li>
</ul>
<p id="chosen">Nothing picked yet</p>`,
                javascript: `const menu = document.querySelector('#menu')
const chosen = document.querySelector('#chosen')

menu.addEventListener('click', function (event) {
  const button = event.target.closest('.pick')
  if (!button) return
  chosen.textContent = button.dataset.label
})`,
              },
              testNotes:
                'The fourth check adds a brand new button to the list and clicks it. Only a delegated listener can pass that one, which is the whole point of the lesson.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s60',
      title: 'DOM events check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s60-q1',
          type: 'multiple-choice',
          prompt: 'What is the real difference between `addEventListener` and setting the `onclick` property?',
          options: [
            'None — they are two spellings of the same thing',
            'addEventListener can attach several handlers to the same event and remove them again, while onclick overwrites whatever was there',
            'onclick is the modern version and addEventListener is deprecated',
            'addEventListener only works on the document, not on elements',
          ],
          answer: 1,
          explanation:
            'The `onclick` property holds one handler, so a second assignment erases the first. `addEventListener` keeps a list, which is why it can also take a listener off again with `removeEventListener` and the same function reference.',
        },
        {
          id: 'quiz-js-s60-q2',
          type: 'true-false',
          prompt:
            'A click listener is attached to a `ul`, and the user clicks a `button` inside one of its `li` children. Inside the handler, `event.currentTarget` is the button.',
          answer: false,
          explanation:
            '`currentTarget` is always the element whose listener is running, so it is the `ul`. `event.target` is the deepest element the event started on, which is the button — and that is the one you want when you need to know which control was used.',
        },
        {
          id: 'quiz-js-s60-q3',
          type: 'code-output',
          prompt: 'The button is inside a form. What happens when it is clicked?',
          code: `button.addEventListener('click', function (event) {
  event.preventDefault()
  console.log('saved')
})`,
          options: [
            'The page navigates and "saved" never prints',
            '"saved" prints, and the click default (activating the button, which submits the form) is cancelled',
            'It is a syntax error, because preventDefault has to be called first',
            'The handler runs twice, once for the click and once for the submit',
          ],
          answer: 1,
          explanation:
            '`preventDefault` cancels the action the browser would have taken for that event. It does not stop other listeners — that is `stopPropagation` — and it is better practice to handle `submit` on the form, which also covers the Enter key.',
        },
        {
          id: 'quiz-js-s60-q4',
          type: 'blank',
          prompt:
            'Which single event fires both when the submit button is clicked and when the user presses Enter inside a field?',
          answers: ['submit', 'the submit event'],
          explanation:
            'Listen for `submit` on the form element. There is no separate event for the button, and `click` on the button misses the Enter key entirely — which is the shortcut people actually use.',
        },
        {
          id: 'quiz-js-s60-q5',
          type: 'identify-error',
          prompt: 'After the first render everything works. After the second render, one click logs "picked" twice. What is wrong?',
          code: `const list = document.querySelector('#list')
for (const item of list.children) {
  item.addEventListener('click', function () {
    console.log('picked')
  })
}
render()   // called again after every change`,
          options: [
            'Nothing is wrong — one handler per item is the correct pattern',
            'The handlers should be attached to list.children in reverse order',
            'Each call to render attaches a second handler to every item, so the handlers stack up',
            'children is a live collection, so the loop runs twice in one pass',
          ],
          answer: 2,
          explanation:
            'The first pass is fine; the second pass doubles every handler. Either attach once outside any re-render, or put a single listener on the list and read `event.target` — delegation has no way to double up.',
        },
      ],
    },
  },
  {
    id: 'js-s61',
    title: 'DOM navigation',
    description: 'Moving up, down and sideways through the tree once you have found the element you care about.',
    lessons: [
      {
        id: 'js-l73',
        title: 'Navigating the DOM',
        description: 'Walk to the parent, the children and the next sibling, and stop confusing nodes with elements.',
        duration: 6,
        objectives: [
          'Walk up with parentElement and closest, and sideways with nextElementSibling',
          'Use children, firstElementChild and lastElementChild for the element-only view',
          'Tell childNodes and children apart, and know why firstChild is often a text node',
          'Build a breadcrumb by walking up from a leaf and reversing the result',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l73-b1',
            body: 'Finding one element is half of working with the DOM. The other half is the set of shortcuts that get you from that element to the one you actually need: the row it sits in, the heading above it, the next one after it. These are plain properties, not functions — you read them, you do not call them.',
          },
          {
            type: 'demo',
            id: 'j-l73-d1',
            title: 'A breadcrumb built by walking up',
            body: 'The deepest item is marked with `data-name`. The script starts there, asks each ancestor for its own name, and joins the list from the top down. Reverse a walk up and you have the trail a file explorer shows you.',
            html: `<ul id="tree">
  <li data-name="Home"><b>Home</b>
    <ul>
      <li data-name="Guides"><b>Guides</b>
        <ul>
          <li data-name="DOM"><b>DOM</b></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
<p id="crumbs"></p>`,
            javascript: `const leaf = document.querySelector('[data-name="DOM"]')
const out = document.querySelector('#crumbs')
const names = []
let item = leaf
while (item) {
  names.unshift(item.dataset.name)
  item = item.parentElement.closest('li')
}
out.textContent = names.join(' > ')`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'j-l73-h1',
            level: 3,
            body: 'Every direction has a property',
          },
          {
            type: 'code',
            id: 'j-l73-c1',
            language: 'javascript',
            title: 'The navigation map',
            code: `el.parentElement            // the containing element
el.children                 // child elements, as a live HTMLCollection
el.firstElementChild        // the first child element, or null
el.lastElementChild         // the last child element, or null
el.nextElementSibling       // the element after it, or null
el.previousElementSibling   // the element before it, or null
el.closest('li')            // this element or its nearest matching ancestor`,
          },
          {
            type: 'text',
            id: 'j-l73-b2',
            body: 'Every one of them can be `null`, and `nextElementSibling` is `null` far more often than people expect — the last `<li>` in a list has nothing after it. Reading a property straight off a `null` is the single most common crash in front-end code, so `if (el.nextElementSibling) { ... }` or `el.nextElementSibling?.remove()` is a habit worth having from the start.',
          },
          {
            type: 'heading',
            id: 'j-l73-h2',
            level: 3,
            body: 'Elements and nodes are not the same list',
          },
          {
            type: 'text',
            id: 'j-l73-b3',
            body: 'The DOM holds two kinds of object: **nodes**, of which elements are one kind, and **text nodes**, which hold the characters between the tags. The unadorned names give you both; the names with `Element` in them give you only elements. Markup that is indented — and all markup is indented — puts a text node of nothing but spaces between every pair of tags, so the unadorned lists are longer than you expect.',
          },
          {
            type: 'code',
            id: 'j-l73-c2',
            language: 'javascript',
            title: 'The same three lines of markup, read two ways',
            code: `<ul id="list">
  <li>Tea</li>
  <li>Coffee</li>
</ul>`,
          },
          {
            type: 'code',
            id: 'j-l73-c3',
            language: 'javascript',
            title: 'What each property gives you here',
            code: `list.children.length         // 2
list.childNodes.length        // 5: two li, plus three whitespace text nodes
list.firstElementChild        // the first li
list.firstChild               // a text node: just spaces and a newline
list.firstChild.textContent   // '' — the bug everyone hits once`,
          },
          {
            type: 'warning',
            id: 'j-l73-w1',
            title: 'firstChild is usually whitespace',
            body: 'Reach for `firstElementChild`, or index `children`, not `firstChild`. `firstChild` is the very first node in the parent, which in any normally formatted markup is the indentation before the first tag — a text node whose `textContent` is a string of spaces. The fix is not to strip the whitespace; it is to stop looking at nodes when you meant elements.',
          },
          {
            type: 'heading',
            id: 'j-l73-h3',
            level: 3,
            body: 'Navigating from a collection',
          },
          {
            type: 'code',
            id: 'j-l73-c4',
            language: 'javascript',
            title: 'Give the collection a name',
            code: `const rows = document.querySelectorAll('tbody tr')
rows.forEach(function (row, index) {
  const name = row.children[1].textContent
  console.log(index, name)
})

for (const row of rows) {
  if (row.nextElementSibling) row.nextElementSibling.style.borderTop = '0'
}`,
          },
          {
            type: 'tip',
            id: 'j-l73-t1',
            title: 'One NodeList, many properties',
            body: 'You do not need a variable per level. `list.querySelectorAll("li a")` runs the query inside the list, not the document, which is both faster and the reason a nested list of links stays out of your results. Reach for the navigation properties when you want exactly one neighbour, and for a scoped query when you want a whole group.',
          },
          {
            type: 'exercise',
            id: 'j-l73-x1',
            exercise: {
              id: 'ex-js-dom-traverse',
              instructions:
                'Attach one click listener to the `#breadcrumbs` list. When any button with the class `crumb` is clicked, set the text of the `#trail` paragraph to the `data-name` values of that item and all of its ancestors, joined with " > ", starting from the outermost. Resolve the button with `event.target.closest(".crumb")`, and walk up with `parentElement`.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<ul id="breadcrumbs">
  <li data-name="Home"><button class="crumb" type="button">Home</button>
    <ul>
      <li data-name="Guides"><button class="crumb" type="button">Guides</button>
        <ul>
          <li data-name="DOM"><button class="crumb" type="button">DOM</button></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
<p id="trail"></p>`,
                javascript: `const list = document.querySelector('#breadcrumbs')
const trail = document.querySelector('#trail')

// One listener. Walk up from the clicked crumb to the top.
`,
              },
              tests: [
                {
                  id: 'ex-js-dom-traverse-t1',
                  label: 'Clicking the deepest crumb gives "Home > Guides > DOM"',
                  body: `var deep = document.querySelector('[data-name="DOM"] .crumb')
var trail = document.querySelector('#trail')
if (!deep) return 'Keep the nested structure from the starter HTML.'
if (!trail) return 'Keep the #trail paragraph.'
deep.click()
return trail.textContent.trim() === 'Home > Guides > DOM' ? true : 'Clicking the deepest crumb should read: Home > Guides > DOM — got: ' + trail.textContent.trim();`,
                },
                {
                  id: 'ex-js-dom-traverse-t2',
                  label: 'Clicking a middle crumb stops there',
                  body: `var mid = document.querySelector('[data-name="Guides"] .crumb')
var trail = document.querySelector('#trail')
if (!mid) return 'Keep the nested structure from the starter HTML.'
if (!trail) return 'Keep the #trail paragraph.'
mid.click()
return trail.textContent.trim() === 'Home > Guides' ? true : 'Clicking Guides should stop the walk there, so #trail should read: Home > Guides';`,
                },
                {
                  id: 'ex-js-dom-traverse-t3',
                  label: 'Clicking the top crumb gives just its own name',
                  body: `var top = document.querySelector('[data-name="Home"] .crumb')
var trail = document.querySelector('#trail')
if (!top) return 'Keep the nested structure from the starter HTML.'
if (!trail) return 'Keep the #trail paragraph.'
top.click()
return trail.textContent.trim() === 'Home' ? true : 'Clicking the outermost crumb should read just: Home';`,
                },
                {
                  id: 'ex-js-dom-traverse-t4',
                  label: 'A crumb added after load produces the full trail',
                  body: `var list = document.querySelector('#breadcrumbs')
var trail = document.querySelector('#trail')
if (!list || !trail) return 'Keep the #breadcrumbs list and the #trail paragraph.'
var deepest = list.querySelector('[data-name="DOM"]')
if (!deepest) return 'Keep the data-name attributes from the starter HTML.'
var item = document.createElement('li')
item.setAttribute('data-name', 'API')
var button = document.createElement('button')
button.className = 'crumb'
button.type = 'button'
button.textContent = 'API'
item.append(button)
deepest.append(item)
button.click()
return trail.textContent.trim() === 'Home > Guides > DOM > API'
  ? true
  : 'The new crumb should read: Home > Guides > DOM > API — got: ' + trail.textContent.trim();`,
                },
              ],
              hints: [
                'Inside the handler, do `var crumb = event.target.closest(".crumb")` and `if (!crumb) return` before anything else.',
                'Then loop: start at `crumb.closest("li")`, push its `dataset.name`, and move up with `item.parentElement.closest("li")` until that is null.',
                'You walked upwards, so the names are in the wrong order. Call `names.reverse()` (or `unshift` as you go) and then `trail.textContent = names.join(" > ")`.',
              ],
              solution: {
                html: `<ul id="breadcrumbs">
  <li data-name="Home"><button class="crumb" type="button">Home</button>
    <ul>
      <li data-name="Guides"><button class="crumb" type="button">Guides</button>
        <ul>
          <li data-name="DOM"><button class="crumb" type="button">DOM</button></li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
<p id="trail"></p>`,
                javascript: `const list = document.querySelector('#breadcrumbs')
const trail = document.querySelector('#trail')

list.addEventListener('click', function (event) {
  const crumb = event.target.closest('.crumb')
  if (!crumb) return
  const names = []
  let item = crumb.closest('li')
  while (item) {
    names.unshift(item.dataset.name)
    item = item.parentElement.closest('li')
  }
  trail.textContent = names.join(' > ')
})`,
              },
              testNotes:
                'The fourth check inserts a new list item after the page has loaded and clicks it, so only a delegated listener will pass. The others check the direction of the walk: the trail must start at the outermost item and stop at the one clicked.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s61',
      title: 'DOM navigation check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s61-q1',
          type: 'multiple-choice',
          prompt: 'You have an element and you know its parent is an element, not the document. Which property should you use?',
          options: ['parentNode', 'parentElement', 'closest()', 'previousElementSibling'],
          answer: 1,
          explanation:
            '`parentNode` can hand you a document, a fragment or any other node type, which is why it is typed as a general node. `parentElement` is narrowed to an element or `null`, so it is the honest choice when you are about to call element methods on it.',
        },
        {
          id: 'quiz-js-s61-q2',
          type: 'true-false',
          prompt: '`children` includes text nodes; `childNodes` does not.',
          answer: false,
          explanation:
            'It is the other way round. `children` gives elements only, and `childNodes` gives every node, including the whitespace text nodes that sit between indented tags.',
        },
        {
          id: 'quiz-js-s61-q3',
          type: 'blank',
          prompt:
            'Which method walks up from an element, including the element itself, and returns the nearest ancestor matching a selector?',
          answers: ['closest', 'element.closest', '.closest'],
          explanation:
            '`closest` starts at the element you call it on, so it matches the element itself as well as its ancestors. It never walks downwards, which is why a listener on a parent is the usual partner for it.',
        },
        {
          id: 'quiz-js-s61-q4',
          type: 'code-output',
          prompt: 'Given `<section><div class="card">Hi</div></section>` in the document, what does this print?',
          code: `const card = document.querySelector('.card')
console.log(card.parentElement.tagName)`,
          options: ['DIV', 'SECTION', 'BODY', 'null'],
          answer: 1,
          explanation:
            '`parentElement` is the `section` that wraps the card in the markup, and `tagName` is always upper case for HTML elements, so it prints `SECTION`. If the card were a direct child of `body` you would get `BODY` instead.',
        },
        {
          id: 'quiz-js-s61-q5',
          type: 'identify-error',
          prompt: 'The console prints an empty string instead of the first item. What is wrong?',
          code: `<ul id="list">
  <li>Tea</li>
  <li>Coffee</li>
</ul>
<script>
const list = document.querySelector('#list')
const first = list.firstChild
console.log(first.textContent)
</script>`,
          options: [
            'Nothing is wrong, firstChild is the first list item',
            'firstChild is the indentation before the first tag, a text node whose textContent is empty',
            'firstChild does not exist on a ul element',
            'textContent does not work on the first item',
          ],
          answer: 1,
          explanation:
            '`firstChild` is the first node of any kind, and in indented markup that is a text node holding a newline and some spaces. `firstElementChild` skips text nodes and gives you the `li` you meant.',
        },
      ],
    },
  },
  {
    id: 'js-s62',
    title: 'DOM nodes',
    description: 'Building elements in memory and putting them on the page, and taking them off again cleanly.',
    lessons: [
      {
        id: 'js-l74',
        title: 'Creating and removing nodes',
        description: 'createElement, the insertion methods, cloneNode, and how to remove exactly the row you meant.',
        duration: 7,
        objectives: [
          'Create elements and text nodes and fill them before attaching them',
          'Insert with append, prepend, before, after and replaceWith',
          'Clone with cloneNode and know what the true argument does',
          'Remove an element without losing the reference you need to remove it again',
        ],
        xp: 55,
        content: [
          {
            type: 'text',
            id: 'j-l74-b1',
            body: 'Any page you build with JavaScript is assembled node by node. The API is small enough to learn in one sitting, and small enough that most bugs come from doing things in the wrong order — so the order is the thing to remember: create, fill, then insert.',
          },
          {
            type: 'demo',
            id: 'j-l74-d1',
            title: 'Add a row, remove that row',
            body: 'Type something and press **Add**. Each new `li` carries its own remove button, and that button closes over the exact item it belongs to — so the third row\'s button removes the third row, not whichever row happens to be first.',
            html: `<ul id="list"></ul>
<input id="text" value="Tea" />
<button id="add" type="button">Add</button>`,
            javascript: `const list = document.querySelector('#list')
document.querySelector('#add').addEventListener('click', function () {
  const input = document.querySelector('#text')
  if (!input.value.trim()) return
  const item = document.createElement('li')
  item.textContent = input.value
  const remove = document.createElement('button')
  remove.textContent = 'x'
  remove.addEventListener('click', function () {
    item.remove()
  })
  item.append(remove)
  list.append(item)
  input.value = ''
})`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'j-l74-h1',
            level: 3,
            body: 'Creating and filling',
          },
          {
            type: 'code',
            id: 'j-l74-c1',
            language: 'javascript',
            title: 'Two ways to make a node',
            code: `const li = document.createElement('li')       // an element, detached
li.textContent = 'Tea'                 // text inside it
li.setAttribute('data-id', '12')
li.classList.add('fresh')

const text = document.createTextNode('Tea')   // a bare text node
li.append(text)                              // attach either kind`,
          },
          {
            type: 'text',
            id: 'j-l74-b2',
            body: 'An element made with `createElement` is **detached**: it is in memory, not in the document. Nothing is measured, nothing is painted, and no stylesheet rule applies to it yet. It becomes real at the moment you insert it, which is also the moment the browser may have to repaint — another reason to fill an element completely before you attach it rather than adding it empty and filling it a line later.',
          },
          {
            type: 'heading',
            id: 'j-l74-h2',
            level: 3,
            body: 'The insertion methods',
          },
          {
            type: 'list',
            id: 'j-l74-l1',
            style: 'bullet',
            items: [
              '`append(node)` / `append(string)` — last child of the parent. The one you will use most.',
              '`prepend(node)` — first child, which is what puts a heading or a total row above a list.',
              '`before(node)` / `after(node)` — called on an existing sibling, positions the new node next to it.',
              '`replaceWith(node)` — swaps one node for another without touching the rest of the parent.',
              '`remove()` — detaches the node and drops your reference to it; the only one that is about deleting.',
            ],
          },
          {
            type: 'code',
            id: 'j-l74-c3',
            language: 'javascript',
            title: 'Where it goes',
            code: `list.append(item)            // last child
list.prepend(first)         // first child
first.before(item)          // sibling, before it
first.after(item)           // sibling, after it
item.replaceWith(other)     // swap one node for another
item.remove()               // detach and drop the reference
list.replaceChildren()      // empty it in one step`,
          },
          {
            type: 'text',
            id: 'j-l74-b3',
            body: '`append` is the one to reach for: it takes nodes *and* plain strings, so `list.append("Tea")` and `list.append(li)` are both legal, and it returns nothing. `appendChild` is the older sibling that only accepts nodes and returns the node it added — which is occasionally handy, and mostly a trap if you assume every method returns something.',
          },
          {
            type: 'warning',
            id: 'j-l74-w1',
            title: 'remove() throws the reference away',
            body: 'Once you call `item.remove()` the node is gone from the page, and the variable still points at a detached object that has no parent and no place in the document. A second call to `remove()` is harmless, but reading a property of a detached node to work out where it *was* is a dead end. If you need to know the position afterwards, record the index before you remove it.',
          },
          {
            type: 'tip',
            id: 'j-l74-t1',
            title: 'Fill first, insert last',
            body: 'Building a detached element and then inserting it once means the browser does one piece of work. Inserting first and filling after means at least one repaint per property you set — which is why a long list is built in a DocumentFragment and attached in a single append.',
          },
          {
            type: 'heading',
            id: 'j-l74-h3',
            level: 3,
            body: 'Copying and removing',
          },
          {
            type: 'code',
            id: 'j-l74-c4',
            language: 'javascript',
            title: 'Clones and removals',
            code: `const copy = row.cloneNode(true)   // deep: children come too
const shallow = row.cloneNode()      // the element, empty
copy.querySelector('input').value = ''   // deep copies share event-free markup

for (const stale of list.querySelectorAll('.old')) stale.remove()`,
          },
          {
            type: 'text',
            id: 'j-l74-b4',
            body: '`cloneNode(true)` copies the element and its whole subtree, but it does not copy anything you added with JavaScript — not a listener, not an inline style, not the value a user typed into a field. Cloning a rendered row and expecting it to look identical is a common surprise; the fix is one line that resets the inputs in the copy.',
          },
          {
            type: 'example',
            id: 'j-l74-e1',
            title: 'Cloning a row for a repeating form',
            body: 'Add a row and it starts empty, because the copy takes the markup but not the values.',
            html: `<form id="rows">
  <div class="row"><input name="task" /><button type="button" class="drop">x</button></div>
</form>
<button id="more" type="button">Add a row</button>`,
            javascript: `const rows = document.querySelector('#rows')
document.querySelector('#more').addEventListener('click', function () {
  const copy = rows.querySelector('.row').cloneNode(true)
  copy.querySelector('input').value = ''
  copy.querySelector('.drop').addEventListener('click', function () {
    copy.remove()
  })
  rows.append(copy)
})`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l74-x1',
            exercise: {
              id: 'ex-js-dom-create-remove',
              instructions:
                'Wire up the **Add** button so that every click appends one new `<li>` to the `#list`, holding the current value of the `#text` input as its text. Every `<li>` must also contain a `<button>`, and clicking that button must remove only that `<li>`. Use one listener on `#list` for the remove buttons, reading the button out of the event.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<ul id="list"></ul>
<input id="text" value="Tea" />
<button id="add" type="button">Add</button>`,
                javascript: `const list = document.querySelector('#list')
const input = document.querySelector('#text')
const add = document.querySelector('#add')

add.addEventListener('click', function () {
  // create one li, give it a remove button, append it
})

// One listener on the list handles every remove button.
`,
              },
              tests: [
                {
                  id: 'ex-js-dom-create-remove-t1',
                  label: 'One click appends one item containing the typed text',
                  body: `var list = document.querySelector('#list')
var input = document.querySelector('#text')
var add = document.querySelector('#add')
if (!list || !input || !add) return 'Keep the #list, the #text input and the #add button.'
list.replaceChildren()
input.value = 'Tea'
add.click()
var items = list.querySelectorAll('li')
return items.length === 1 && items[0].textContent.indexOf('Tea') !== -1
  ? true
  : 'After one click the list should hold one li containing Tea, found ' + items.length + '.';`,
                },
                {
                  id: 'ex-js-dom-create-remove-t2',
                  label: 'Three clicks give three items in the order they were added',
                  body: `var list = document.querySelector('#list')
var input = document.querySelector('#text')
var add = document.querySelector('#add')
if (!list || !input || !add) return 'Keep the #list, the #text input and the #add button.'
list.replaceChildren()
var names = ['Tea', 'Coffee', 'Cocoa']
for (var i = 0; i < names.length; i += 1) {
  input.value = names[i]
  add.click()
}
var items = list.querySelectorAll('li')
var ok = items.length === 3
for (var j = 0; j < names.length && ok; j += 1) {
  ok = items[j].textContent.indexOf(names[j]) !== -1
}
return ok ? true : 'The three items should read Tea, then Coffee, then Cocoa, in that order.';`,
                },
                {
                  id: 'ex-js-dom-create-remove-t3',
                  label: 'Every item holds a real button that removes it',
                  body: `var list = document.querySelector('#list')
var input = document.querySelector('#text')
var add = document.querySelector('#add')
if (!list || !input || !add) return 'Keep the #list, the #text input and the #add button.'
list.replaceChildren()
input.value = 'Tea'
add.click()
var items = list.querySelectorAll('li')
if (items.length !== 1) return 'Add exactly one li per click first.'
var button = items[0].querySelector('button')
if (!button) return 'Each li needs a button: create one with document.createElement("button") and append it.'
button.click()
return list.querySelectorAll('li').length === 0 ? true : 'Clicking the remove button should take that li off the list.';`,
                },
                {
                  id: 'ex-js-dom-create-remove-t4',
                  label: 'A remove button only takes its own item',
                  body: `var list = document.querySelector('#list')
var input = document.querySelector('#text')
var add = document.querySelector('#add')
if (!list || !input || !add) return 'Keep the #list, the #text input and the #add button.'
list.replaceChildren()
input.value = 'Tea'
add.click()
input.value = 'Coffee'
add.click()
var items = list.querySelectorAll('li')
if (items.length !== 2) return 'Add exactly two items first.'
items[0].querySelector('button').click()
var left = list.querySelectorAll('li')
return left.length === 1 && left[0].textContent.indexOf('Coffee') !== -1
  ? true
  : 'Removing the first item should leave Coffee behind — remove the item that owns the button, not the first li in the list.';`,
                },
              ],
              hints: [
                'Inside the add handler: create the `li`, set its text with `textContent`, create a `button` and `item.append(button)`, then `list.append(item)`.',
                'For the remove, put a single listener on `list`, and inside it do `var button = event.target.closest("button")` then `if (!button) return`.',
                'From the button, find the item it belongs to with `button.closest("li")` and call `.remove()` on that. Hard-coding `list.children[0]` only ever works for the first row.',
              ],
              solution: {
                html: `<ul id="list"></ul>
<input id="text" value="Tea" />
<button id="add" type="button">Add</button>`,
                javascript: `const list = document.querySelector('#list')
const input = document.querySelector('#text')
const add = document.querySelector('#add')

add.addEventListener('click', function () {
  const value = input.value.trim()
  if (!value) return
  const item = document.createElement('li')
  item.textContent = value + ' '
  const remove = document.createElement('button')
  remove.type = 'button'
  remove.textContent = 'x'
  item.append(remove)
  list.append(item)
  input.value = ''
})

list.addEventListener('click', function (event) {
  const button = event.target.closest('button')
  if (!button) return
  button.closest('li').remove()
})`,
              },
              testNotes:
                'The checks click the buttons for you, so they are testing your handlers rather than your markup. The last one is the one that matters: it removes the first item and checks that the second one is still there.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s62',
      title: 'DOM nodes check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s62-q1',
          type: 'multiple-choice',
          prompt: 'What does `document.createElement("li")` return?',
          options: [
            'An element that is already on the page and can be seen',
            'A detached element that becomes part of the page only when you insert it',
            'A string of HTML you still have to parse',
            'null, because li cannot be created from JavaScript',
          ],
          answer: 1,
          explanation:
            'It is a real element, but it is not in the document: no stylesheet rule applies to it and nothing is painted until you insert it. That is why the right order is create, fill, then attach.',
        },
        {
          id: 'quiz-js-s62-q2',
          type: 'true-false',
          prompt: '`row.cloneNode(true)` produces a deep copy of the row that is not yet part of the document.',
          answer: true,
          explanation:
            'The `true` copies the whole subtree, and the copy is detached until you insert it. What it does not copy is anything JavaScript added: listeners, inline styles, or the text a user had typed into an input.',
        },
        {
          id: 'quiz-js-s62-q3',
          type: 'blank',
          prompt:
            'Which method inserts a node directly *before* an existing sibling, without touching the parent?',
          answers: ['before', 'node.before', '.before', 'element.before'],
          explanation:
            '`before` and `after` are called on the existing node and position the new one relative to it. `prepend` would have put it first among the children instead, which is a different place entirely.',
        },
        {
          id: 'quiz-js-s62-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const list = document.querySelector('#list')
list.replaceChildren()
console.log(list.children.length)`,
          options: ['0', '1', 'undefined', 'It throws an error'],
          answer: 0,
          explanation:
            '`replaceChildren` with no arguments removes every child in one operation, so the list is empty and `children.length` is 0. It is the fast way to clear a container before refilling it.',
        },
        {
          id: 'quiz-js-s62-q5',
          type: 'identify-error',
          prompt: 'The new element never appears, and the next line fails. What is wrong?',
          code: `const list = document.querySelector('#list')
const item = document.createElement('li')
item = item.append('Tea')
console.log(item.tagName)`,
          options: [
            'Nothing is wrong, append returns the node it appended',
            'append returns undefined, so item is now undefined and reading a property from it fails',
            'createElement returns undefined for a list item',
            'append is spelled appendChild',
          ],
          answer: 1,
          explanation:
            'The mutating methods return nothing on purpose, so nothing waits for a return value. Assigning one back to the variable throws the element away — the item is on the page, but you no longer have a reference to it.',
        },
      ],
    },
  },
  {
    id: 'js-s63',
    title: 'DOM collections',
    description: 'Node lists, HTML collections, and the difference between a snapshot and something that watches.',
    lessons: [
      {
        id: 'js-l75',
        title: 'Node lists and live collections',
        description: 'Which collections update themselves, which are frozen, and how to iterate both the same way.',
        duration: 6,
        objectives: [
          'Tell a live HTMLCollection from a static NodeList at a glance',
          'Understand why iterating a live collection while removing from it never ends',
          'Turn either kind into a real array with Array.from or spread',
          'Re-query deliberately and say out loud when you mean to',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l75-b1',
            body: 'Two of the common ways of getting many elements return a collection that is a **live view** of the page, and the other returns a **snapshot** taken at the moment you asked. The difference is invisible until the day you remove something while looping over it, and then it is the whole problem.',
          },
          {
            type: 'demo',
            id: 'j-l75-d1',
            title: 'A live collection watching the page change',
            body: 'Add items and watch the count. The count line is written by one call to `getElementsByClassName`, and it is correct after every add because that collection is a live view: it re-reads the document every time you read `length`. A `querySelectorAll` list would still be showing the old number.',
            html: `<ul id="list">
  <li class="item">One</li>
</ul>
<p id="count"></p>
<button id="add" type="button">Add an item</button>`,
            javascript: `const list = document.querySelector('#list')
const count = document.querySelector('#count')

function update() {
  const live = document.getElementsByClassName('item')
  count.textContent = 'items: ' + live.length
}

document.querySelector('#add').addEventListener('click', function () {
  const item = document.createElement('li')
  item.className = 'item'
  item.textContent = 'New'
  list.append(item)
  update()
})

update()`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'j-l75-h1',
            level: 3,
            body: 'Live or snapshot',
          },
          {
            type: 'code',
            id: 'j-l75-c1',
            language: 'javascript',
            title: 'Three calls, two behaviours',
            code: `document.getElementsByClassName('item')  // LIVE  HTMLCollection
document.getElementsByTagName('li')         // LIVE  HTMLCollection
element.children                            // LIVE  HTMLCollection
document.querySelectorAll('.item')          // STATIC NodeList
document.querySelectorAll('li')             // STATIC NodeList`,
          },
          {
            type: 'text',
            id: 'j-l75-b2',
            body: 'The rule of thumb: anything from `getElementsBy…`, plus `children` and `children` of an element, is a live `HTMLCollection`. Everything from `querySelectorAll` is a static `NodeList`, frozen at the moment you called it. Live collections only re-read when you touch a property, which is why a saved live collection can look out of date in your head while being perfectly correct in the browser.',
          },
          {
            type: 'warning',
            id: 'j-l75-w1',
            title: 'Looping and removing at the same time hangs the page',
            body: 'This does not finish:\n\n    const items = document.getElementsByClassName("item")\n    while (items.length) items[0].remove()\n\nThe collection is live, so every removal drops `items.length` by one, and the condition is checked again. The same trap with `querySelectorAll` looks like it works — and quietly leaves the items added during the loop behind, because the list you are walking is a stale copy. Neither is what you meant. Remove by iterating backwards over a copy, or collect the nodes first with `Array.from` and then remove them.',
          },
          {
            type: 'heading',
            id: 'j-l75-h2',
            level: 3,
            body: 'Treating them the same',
          },
          {
            type: 'code',
            id: 'j-l75-c2',
            language: 'javascript',
            title: 'Both behave like read-only arrays',
            code: `const items = document.querySelectorAll('.item')

items.length            // how many
items[0]                // index access
items.forEach(fn)       // a method, like an array
for (const el of items) { }   // iterable
const list = Array.from(items) // a real array, with every array method
const names = [...items].map(el => el.textContent)`,
          },
          {
            type: 'text',
            id: 'j-l75-b3',
            body: 'The list is not an array — it has no `map`, `filter` or `reduce`, and you cannot `push` to it — but it does have `length`, index access, `forEach` and iteration, which covers most loops. The moment you want the array methods, `Array.from(items)` is the conversion, and it is worth doing by default: a real array is snapshot semantics, and snapshots are what your loop almost always wanted.',
          },
          {
            type: 'tip',
            id: 'j-l75-t1',
            title: 'Convert when the collection is about to change',
            body: 'If the code below the query adds or removes nodes, the collection you are walking can change shape under you. `Array.from` first is one line that turns a whole class of bugs into a non-event.',
          },
          {
            type: 'code',
            id: 'j-l75-c3',
            language: 'javascript',
            title: 'The safe shape',
            code: `const stale = document.querySelectorAll('.item')
const copy = Array.from(stale)   // frozen, even if the page changes
copy.forEach(function (el) { el.remove() })`,
          },
          {
            type: 'example',
            id: 'j-l75-e1',
            title: 'Counting with a live collection and a loop',
            body: 'The list updates live, so the count is never stale — but the loop copies first, which is why removing does not disturb it.',
            html: `<ul id="todos">
  <li class="todo">Write it down</li>
  <li class="todo">Delete it</li>
</ul>
<p id="summary"></p>`,
            javascript: `const todos = document.getElementsByClassName('todo')
document.querySelector('#summary').textContent = todos.length + ' left'

for (const todo of Array.from(todos)) todo.remove()`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l75-x1',
            exercise: {
              id: 'ex-js-dom-collections',
              instructions:
                'Write a function called `total` that adds up the numbers shown inside every element with the class `item` in `#list`, and returns the sum. It must read the list fresh on every call, not remember the answer. Then wire the `#report` button so that clicking it writes the current total into the `#out` paragraph as a plain number.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<ul id="list">
  <li class="item">1</li>
  <li class="item">2</li>
</ul>
<button id="report" type="button">Report</button>
<p id="out"></p>`,
                javascript: `const list = document.querySelector('#list')
const out = document.querySelector('#out')

function total() {
  // add up the numbers in every .item
}

// Wire the #report button to write total() into #out.
`,
              },
              tests: [
                {
                  id: 'ex-js-dom-collections-t1',
                  label: 'total() adds up the starter items',
                  body: `if (typeof total !== 'function') return 'Name the function total.'
return total() === 3 ? true : 'With 1 and 2 in the list, total() should return 3, got: ' + total();`,
                },
                {
                  id: 'ex-js-dom-collections-t2',
                  label: 'The list is read on every call, not cached',
                  body: `var list = document.querySelector('#list')
if (!list) return 'Keep the #list element from the starter HTML.'
if (typeof total !== 'function') return 'Name the function total.'
list.replaceChildren()
var a = document.createElement('li')
a.className = 'item'
a.textContent = '5'
var b = document.createElement('li')
b.className = 'item'
b.textContent = '7'
list.append(a, b)
return total() === 12 ? true : 'With 5 and 7 in the list, total() should return 12, got: ' + total() + ' — re-query inside the function instead of storing the sum.';`,
                },
                {
                  id: 'ex-js-dom-collections-t3',
                  label: 'An empty list adds up to 0, not undefined',
                  body: `var list = document.querySelector('#list')
if (!list) return 'Keep the #list element from the starter HTML.'
if (typeof total !== 'function') return 'Name the function total.'
list.replaceChildren()
return total() === 0 ? true : 'With nothing in the list, total() should return 0, got: ' + total() + ' — start the sum at 0 rather than at the first item.';`,
                },
                {
                  id: 'ex-js-dom-collections-t4',
                  label: 'The report button writes the current total',
                  body: `var list = document.querySelector('#list')
var out = document.querySelector('#out')
var report = document.querySelector('#report')
if (!list || !out || !report) return 'Keep the #list, the #report button and the #out paragraph.'
if (typeof total !== 'function') return 'Name the function total.'
list.replaceChildren()
var a = document.createElement('li')
a.className = 'item'
a.textContent = '4'
var b = document.createElement('li')
b.className = 'item'
b.textContent = '6'
list.append(a, b)
report.click()
return out.textContent.trim() === '10' ? true : 'With 4 and 6 in the list, #out should read 10 after clicking, got: ' + out.textContent.trim();`,
                },
              ],
              hints: [
                'Start with `var sum = 0`, then loop over `document.querySelectorAll(".item")` and add `Number(item.textContent)` to it.',
                'Return the sum at the end. Keep the query *inside* `total` — that is what makes the answer current every time.',
                'The report handler is two lines: call `total()`, then `out.textContent = String(sum)`. `textContent` needs a string, so convert the number.',
              ],
              solution: {
                html: `<ul id="list">
  <li class="item">1</li>
  <li class="item">2</li>
</ul>
<button id="report" type="button">Report</button>
<p id="out"></p>`,
                javascript: `const list = document.querySelector('#list')
const out = document.querySelector('#out')

function total() {
  let sum = 0
  for (const item of document.querySelectorAll('.item')) {
    sum = sum + Number(item.textContent)
  }
  return sum
}

document.querySelector('#report').addEventListener('click', function () {
  out.textContent = String(total())
})`,
              },
              testNotes:
                'Three of the four checks rewrite the list before calling your function, so a cached sum or a collection captured once will fail. Only the current state of the DOM counts.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s63',
      title: 'DOM collections check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s63-q1',
          type: 'multiple-choice',
          prompt: 'Which of these returns a **static** list — a snapshot taken at the moment of the call?',
          options: [
            'document.getElementsByClassName("item")',
            'document.getElementsByTagName("li")',
            'element.children',
            'document.querySelectorAll(".item")',
          ],
          answer: 3,
          explanation:
            'Everything from `getElementsBy…` and `children` is a live HTMLCollection that re-reads the document. `querySelectorAll` is the one that hands you a frozen NodeList, so elements added afterwards are not in it.',
        },
        {
          id: 'quiz-js-s63-q2',
          type: 'true-false',
          prompt: 'A live collection can report a different `length` than it did a second ago, without you re-running the query.',
          answer: true,
          explanation:
            'That is the definition of live: it is a standing view of the page, and it re-reads when you touch a property. It is why removing from a live list inside a loop over it never terminates.',
        },
        {
          id: 'quiz-js-s63-q3',
          type: 'blank',
          prompt:
            'Which built-in call turns a NodeList or HTMLCollection into a real array, with every array method available?',
          answers: ['array.from', 'from', 'array.from()'],
          explanation:
            '`Array.from(items)` copies the collection into an array. That copy is a snapshot, so removing elements afterwards cannot disturb the loop that is walking it.',
        },
        {
          id: 'quiz-js-s63-q4',
          type: 'code-output',
          prompt: 'There is one element with the class `item` on the page. What does this print?',
          code: `const items = document.getElementsByClassName('item')
const first = items[0]
first.remove()
console.log(first === items[0])`,
          options: ['true', 'false', 'It throws an error', 'undefined'],
          answer: 1,
          explanation:
            '`first` still points at the removed element, and the live collection no longer contains it, so `items[0]` is now `undefined`. Comparing them is false. This is why a node reference and an index are not interchangeable once removal starts.',
        },
        {
          id: 'quiz-js-s63-q5',
          type: 'identify-error',
          prompt: 'This loop should empty the list, but the tab freezes. Why?',
          code: `const items = document.getElementsByClassName('item')
while (items.length) {
  items[0].remove()
}
console.log('done')`,
          options: [
            'The loop is correct, it just runs slowly',
            'It never ends: the collection is live, so every removal makes the loop condition shorter by one, and there is always another item to remove',
            'remove() cannot be called on an element from a live collection',
            'items.length is only read once, so the condition is always true',
          ],
          answer: 1,
          explanation:
            'With a live collection the condition genuinely reaches zero — on a list that has more items than can be removed in time, or a collection that re-queries. The version people actually hit is the reverse: a `querySelectorAll` list is a stale copy, so items added during the loop survive. Copy with `Array.from` first and both problems disappear.',
        },
      ],
    },
  },
  {
    id: 'js-s64',
    title: 'The window object',
    description: 'The global object every script runs inside, and what it tells you about the window the page is in.',
    lessons: [
      {
        id: 'js-l76',
        title: 'The window object',
        description: 'What window is, which of its properties are worth knowing, and when a global is the wrong answer.',
        duration: 6,
        objectives: [
          'Explain what window is and how it relates to globalThis',
          'Read the size of the viewport, and resize and scroll events',
          'Use the timing and storage parts of window, and know when to use setTimeout over setInterval',
          'Reach for a scoped element instead of a global whenever one exists',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l76-b1',
            body: 'In a browser, `window` is the global object: the single object that owns everything a script can reach without asking for it, including `document`, `console`, `setTimeout` and the variables you declared. `window === globalThis`, and that is the whole model. Nothing about it is magic — it is an object with properties, and you can read, write and delete them like any other.',
          },
          {
            type: 'demo',
            id: 'j-l76-d1',
            title: 'Listening to the window itself',
            body: 'Resize the browser window, or scroll this one, and the numbers update. The listener is on `window`, not on an element, because the viewport is not part of the document — there is no element to attach it to.',
            html: `<p>Viewport: <span id="size">?</span></p>
<p>Scrolled to: <span id="pos">?</span></p>`,
            javascript: `const size = document.querySelector('#size')
const pos = document.querySelector('#pos')

function report() {
  size.textContent = window.innerWidth + ' x ' + window.innerHeight
  pos.textContent = window.scrollY + 'px'
}

window.addEventListener('resize', report)
window.addEventListener('scroll', report)
report()`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'j-l76-h1',
            level: 3,
            body: 'Sizing the window',
          },
          {
            type: 'tip',
            id: 'j-l76-t2',
            title: 'innerWidth counts the scrollbar',
            body: 'If you are measuring space to divide between columns, `document.documentElement.clientWidth` is the number that excludes the vertical scrollbar. Reach for `innerWidth` when you want to know how wide the viewport is; reach for `clientWidth` when you want to know how much width is actually available.',
          },
          {
            type: 'code',
            id: 'j-l76-c2',
            language: 'javascript',
            title: 'Four numbers, four meanings',
            code: `window.innerWidth    // the viewport, including the scrollbar
window.innerHeight
window.outerWidth    // the whole browser window, chrome included
window.outerHeight
window.scrollX       // how far the page is scrolled, horizontally
window.scrollY       // and vertically
window.scrollTo(0, 400)   // scroll the page to y = 400`,
          },
          {
            type: 'text',
            id: 'j-l76-b2',
            body: '`innerWidth` includes the vertical scrollbar, so a layout that divides `innerWidth` by two can overflow by half a scrollbar width. For layout work, `document.documentElement.clientWidth` is the number that excludes it. The other trap: `resize` fires on every frame the user drags the window, so doing expensive work in it will make dragging stutter — measure and store the numbers there, and do the heavy work in a `requestAnimationFrame`.',
          },
          {
            type: 'tip',
            id: 'j-l76-t1',
            title: 'Global variable versus global scope',
            body: 'A variable you declare with `let` or `const` at the top level of a script is a global, but it does **not** become a property of `window`. A variable declared with `var` at the top level does. In a module neither does, which is a large part of why modules are safer: nothing leaks into anyone else\'s script.',
          },
          {
            type: 'heading',
            id: 'j-l76-h2',
            level: 3,
            body: 'Timing, storage and the rest',
          },
          {
            type: 'code',
            id: 'j-l76-c3',
            language: 'javascript',
            title: 'The window members you will use most',
            code: `const id = setTimeout(fn, 2000)    // run once, after a delay
clearTimeout(id)                  // cancel it

const every = setInterval(fn, 1000) // run over and over
clearInterval(every)

localStorage.setItem('theme', 'dark')   // survives a reload
localStorage.getItem('theme')
sessionStorage.clear()                  // gone when the tab closes

window.matchMedia('(max-width: 700px)')  // ask about the display
window.devicePixelRatio                  // 2 on a retina screen`,
          },
          {
            type: 'text',
            id: 'j-l76-b3',
            body: 'Use `setTimeout` rather than `setInterval` whenever you can. An interval keeps firing on a schedule whether or not the previous run finished, so a slow job queues up behind itself and the page gets slower the longer it is left open. A timeout schedules one run after the previous one has had time to finish, which is almost always the behaviour you wanted.',
          },
          {
            type: 'warning',
            id: 'j-l76-w1',
            title: 'Do not use a global where an element exists',
            body: 'Reaching for `window.myThing` because it is easier to type creates a name that any other script on the page can read, overwrite or collide with — including a library you did not write. A `const` inside a function, or a `data-` attribute read from a scoped element, cannot be touched by anyone else and reads better six months later.',
          },
          {
            type: 'example',
            id: 'j-l76-e1',
            title: 'Reading the viewport without a global',
            body: 'No variable is added to `window` here. The function closes over what it needs.',
            html: `<p id="note">Resize the window.</p>`,
            javascript: `const note = document.querySelector('#note')

function paint() {
  note.textContent = 'Viewport: ' + window.innerWidth + ' wide'
}

window.addEventListener('resize', paint)
paint()`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l76-x1',
            exercise: {
              id: 'ex-js-window-size',
              instructions:
                'Write a function called `report` that writes `window.innerWidth` into the `#width` span as a string, so that `#width` reads e.g. `800`. Call `report` once immediately, and attach it to the window `resize` event so it runs again whenever the window is resized. Then make the `#hide` button set the `hidden` property of the `#panel` paragraph to `true` when it is clicked.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<p id="panel">Viewport: <span id="width">?</span></p>
<button id="hide" type="button">Hide</button>`,
                javascript: `const panel = document.querySelector('#panel')
const width = document.querySelector('#width')

function report() {
  // write window.innerWidth into #width
}

// Call report() once, and listen for resize on window.

// Wire the #hide button to hide the panel.
`,
              },
              tests: [
                {
                  id: 'ex-js-window-size-t1',
                  label: 'report() writes the viewport width into #width',
                  body: `var width = document.querySelector('#width')
if (!width) return 'Keep the #width span.'
if (typeof report !== 'function') return 'Name the function report.'
report()
return width.textContent.trim() === String(window.innerWidth)
  ? true
  : '#width should read ' + String(window.innerWidth) + ' — got: ' + width.textContent.trim();`,
                },
                {
                  id: 'ex-js-window-size-t2',
                  label: 'report is called on page load, before any resize',
                  body: `var width = document.querySelector('#width')
if (!width) return 'Keep the #width span.'
width.textContent = 'not yet'
report()
return width.textContent.trim() !== 'not yet' ? true : 'Call report() once yourself after defining it — nothing else will do it for you.';`,
                },
                {
                  id: 'ex-js-window-size-t3',
                  label: 'The window resize event calls report',
                  body: `var width = document.querySelector('#width')
if (!width) return 'Keep the #width span.'
if (typeof report !== 'function') return 'Name the function report.'
width.textContent = 'stale'
window.dispatchEvent(new Event('resize'))
return width.textContent.trim() === String(window.innerWidth)
  ? true
  : 'Dispatching a resize on window should call report and refresh #width — attach it with window.addEventListener("resize", report).';`,
                },
                {
                  id: 'ex-js-window-size-t4',
                  label: 'The hide button hides the panel',
                  body: `var panel = document.querySelector('#panel')
var hide = document.querySelector('#hide')
if (!panel || !hide) return 'Keep the #panel paragraph and the #hide button.'
panel.hidden = false
hide.click()
return panel.hidden === true ? true : 'Set panel.hidden = true inside the click handler.';`,
                },
              ],
              hints: [
                'A one-line function: `function report() { width.textContent = String(window.innerWidth) }`. `textContent` only takes a string, so the conversion is not optional.',
                'After the function, call `report()` on its own line, then `window.addEventListener("resize", report)` — passing the reference, not calling it.',
                'The hide button is a separate handler on `#hide`: find it with `querySelector` and set `panel.hidden = true` inside.',
              ],
              solution: {
                html: `<p id="panel">Viewport: <span id="width">?</span></p>
<button id="hide" type="button">Hide</button>`,
                javascript: `const panel = document.querySelector('#panel')
const width = document.querySelector('#width')

function report() {
  width.textContent = String(window.innerWidth)
}

report()
window.addEventListener('resize', report)

document.querySelector('#hide').addEventListener('click', function () {
  panel.hidden = true
})`,
              },
              testNotes:
                'The third check fires a real `resize` event at the window, so a listener attached to an element or to `document` will not answer it. The first two check the same function directly, which is why the initial call has to be your own.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s64',
      title: 'The window object check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s64-q1',
          type: 'multiple-choice',
          prompt: 'In browser JavaScript, what does `window` refer to?',
          options: [
            'The HTML document currently loaded',
            'The browser application itself',
            'The global object — the same one as globalThis',
            'A hidden iframe every page secretly contains',
          ],
          answer: 2,
          explanation:
            '`window` is the global object in a page: it owns `document`, `console`, the timing functions and anything a script declared with `var` at the top level. That is why `window === globalThis` in a browser.',
        },
        {
          id: 'quiz-js-s64-q2',
          type: 'true-false',
          prompt: '`window` is the standard way to reach shared state from server-side Node.js code.',
          answer: false,
          explanation:
            'There is no `window` in Node. Node has `global`, and modern code in both environments uses the portable `globalThis` instead of guessing which one it is running in.',
        },
        {
          id: 'quiz-js-s64-q3',
          type: 'blank',
          prompt:
            'Which property of `window` gives the width of the viewport, in CSS pixels, scrollbar included?',
          answers: ['innerwidth', 'window.innerwidth', '.innerwidth'],
          explanation:
            '`innerWidth` measures the viewport. `outerWidth` is the whole browser window including tabs and toolbars, and `document.documentElement.clientWidth` is the viewport without the scrollbar — the right number for layout.',
        },
        {
          id: 'quiz-js-s64-q4',
          type: 'code-output',
          prompt: 'What does this print in a browser?',
          code: `console.log(typeof window.document)
console.log(window === globalThis)`,
          options: ['"object" then true', '"object" then false', '"undefined" then false', '"window" then true'],
          answer: 0,
          explanation:
            '`window.document` is the document object, so the first line prints `"object"`. In a page `window` and `globalThis` are the same object, so the second line prints `true` — which is the portable way to write code that works in a browser and in Node.',
        },
        {
          id: 'quiz-js-s64-q5',
          type: 'identify-error',
          prompt: 'On a narrow screen the panel sticks out past the right edge. What is wrong?',
          code: `const panel = document.querySelector('#panel')
panel.style.width = window.innerWidth + 'px'`,
          options: [
            'Nothing is wrong, innerWidth is exactly the space available',
            'It should be screen.width, which is the real display width',
            'innerWidth includes the vertical scrollbar and the panel has its own padding and border, so the box overflows',
            'innerWidth is a string and cannot be used in arithmetic',
          ],
          answer: 2,
          explanation:
            '`innerWidth` counts the scrollbar, and `width` on a content-box element adds padding and border on top. For a full-width panel use `width: 100%` and let the box model do the work; use `clientWidth` when you genuinely need a measured number.',
        },
      ],
    },
  },
  {
    id: 'js-s65',
    title: 'Screen and location',
    description: 'What the display can do, where the page is, and how to change where it is going.',
    lessons: [
      {
        id: 'js-l77',
        title: 'Screen and location',
        description: 'Read the parts of a URL, ask the display about itself, and navigate deliberately.',
        duration: 6,
        objectives: [
          'Break a URL into hostname, pathname, search and hash with location',
          'Read the screen object, and know when screen is the wrong question to ask',
          'Navigate with assign and replace, and tell the difference',
          'Read the hash and the query string without parsing them by hand',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l77-b1',
            body: 'Two objects answer the questions a page usually needs asked of it: **what display am I on**, and **where am I**. `screen` describes the display. `location` describes the current URL and is how you change it. Between them they cover the "which device am I on" and "which page is this" questions, and they are properties, not functions — you read them.',
          },
          {
            type: 'demo',
            id: 'j-l77-d1',
            title: 'The current URL, piece by piece',
            body: 'The page and screen lines fill in immediately. Press the button to show the hash instead — the hash is the part after `#`, which is why it is the one piece you can change without asking the server for anything.',
            html: `<p>Page: <span id="where">?</span></p>
<p>Display: <span id="screen">?</span></p>
<button id="go" type="button">Show the hash</button>`,
            javascript: `const where = document.querySelector('#where')
const screenOut = document.querySelector('#screen')

where.textContent = window.location.pathname
screenOut.textContent = window.screen.width + ' x ' + window.screen.height

document.querySelector('#go').addEventListener('click', function () {
  where.textContent = 'hash: ' + (window.location.hash || '(none)')
})`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'j-l77-h1',
            level: 3,
            body: 'location, in pieces',
          },
          {
            type: 'code',
            id: 'j-l77-c1',
            language: 'javascript',
            title: 'One URL, seven properties',
            code: `// https://codeingot.dev/courses/dom?q=events#listeners
location.href        // the whole thing
location.protocol    // 'https:'
location.host        // 'codeingot.dev'
location.hostname    // 'codeingot.dev'
location.port        // '' unless a port is in the URL
location.pathname    // '/courses/dom'
location.search      // '?q=events'
location.hash        // '#listeners'
location.origin      // 'https://codeingot.dev'`,
          },
          {
            type: 'text',
            id: 'j-l77-b2',
            body: 'You do not need to slice these apart yourself. `search` arrives as a string with the `?` still on the front, and `URLSearchParams` reads it for you: `new URLSearchParams(location.search).get("q")` gives you `events`, or `null` if the key is not there. For anything fiddlier than one or two keys, build a `URL` object — `new URL(location.href)` gives you the same pieces as properties, plus `searchParams` that you can edit.',
          },
          {
            type: 'heading',
            id: 'j-l77-h2',
            level: 3,
            body: 'Changing where the page goes',
          },
          {
            type: 'code',
            id: 'j-l77-c2',
            language: 'javascript',
            title: 'Three ways out',
            code: `location.href = '/next-page'    // navigate; adds a history entry
location.assign('/next-page')  // the same, written as a method
location.replace('/next-page') // navigate, no new history entry
location.reload()               // load this URL again
history.back()                  // the previous entry
history.forward()`,
          },
          {
            type: 'text',
            id: 'j-l77-b3',
            body: '`assign` and setting `href` are the same thing, and both add an entry to the history — which is why the browser Back button works afterwards. `replace` navigates *without* adding one, so the page you came from is gone for the user. Choose `replace` for a step you would not want someone to undo with Back; choose `assign` for anything else.',
          },
          {
            type: 'tip',
            id: 'j-l77-t1',
            title: 'Let a link be a link',
            body: 'Navigating from a click handler means the user gets no link to open in a new tab, no middle-click, and no way back if you used `replace`. When the destination is a URL, write an `<a href="...">` and style it like a button. Reach for `location.assign` when there is no link to make — a successful submission, say.',
          },
          {
            type: 'heading',
            id: 'j-l77-h3',
            level: 3,
            body: 'screen, and when not to ask it',
          },
          {
            type: 'code',
            id: 'j-l77-c3',
            language: 'javascript',
            title: 'The display, not the page',
            code: `screen.width        // full display width in CSS pixels
screen.height
screen.availWidth   // minus the taskbar and docks
screen.availHeight
screen.colorDepth   // bits per pixel, usually 24
window.innerWidth   // the viewport — usually the one you want`,
          },
          {
            type: 'warning',
            id: 'j-l77-w1',
            title: 'screen is the monitor, not the page',
            body: 'Laying out with `screen.width` gets the answer wrong every time the window is not maximised, which is almost always. A browser on a 4K monitor with a small window has a small viewport and a very large screen, and the gap between them grows as the window shrinks. For anything the user sees, ask `window.innerWidth`; use `matchMedia("(max-width: 700px)")` when you want the decision to be re-evaluated when the window changes.',
          },
          {
            type: 'example',
            id: 'j-l77-e1',
            title: 'Reading a query parameter without slicing strings',
            body: 'Load the page with `?q=dom` after it and the paragraph fills in. `get` returns `null` for a key that is not there, so the fallback handles the case where the parameter is missing.',
            html: `<p id="q"></p>`,
            javascript: `const q = new URLSearchParams(window.location.search).get('q')
document.querySelector('#q').textContent = q ? 'Searching for: ' + q : 'No search term'`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'j-l77-x1',
            exercise: {
              id: 'ex-js-screen-location',
              instructions:
                'Write a function called `report` that sets the text of `#path` to `location.pathname`, the text of `#screen` to `String(screen.width)`, and the text of `#shape` to "landscape" when `screen.width` is greater than `screen.height` and "portrait" otherwise. Call `report` once, and wire the `#report` button to it so clicking it refreshes all three.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<p>Path: <span id="path"></span></p>
<p>Screen: <span id="screen"></span></p>
<p>Shape: <span id="shape"></span></p>
<button id="report" type="button">Report</button>`,
                javascript: `const path = document.querySelector('#path')
const screenOut = document.querySelector('#screen')
const shape = document.querySelector('#shape')

function report() {
  // fill all three spans
}

// Call report() once, and listen for clicks on #report.
`,
              },
              tests: [
                {
                  id: 'ex-js-screen-location-t1',
                  label: 'report() writes location.pathname into #path',
                  body: `var path = document.querySelector('#path')
if (!path) return 'Keep the #path span.'
if (typeof report !== 'function') return 'Name the function report.'
report()
return path.textContent === location.pathname
  ? true
  : '#path should read the current path: ' + location.pathname;`,
                },
                {
                  id: 'ex-js-screen-location-t2',
                  label: 'report() writes String(screen.width) into #screen',
                  body: `var screenOut = document.querySelector('#screen')
if (!screenOut) return 'Keep the #screen span.'
if (typeof report !== 'function') return 'Name the function report.'
report()
return screenOut.textContent.trim() === String(screen.width)
  ? true
  : '#screen should read the display width: ' + String(screen.width) + ' — got: ' + screenOut.textContent.trim();`,
                },
                {
                  id: 'ex-js-screen-location-t3',
                  label: 'report() calls the screen landscape or portrait',
                  body: `var shape = document.querySelector('#shape')
if (!shape) return 'Keep the #shape span.'
if (typeof report !== 'function') return 'Name the function report.'
report()
var want = screen.width > screen.height ? 'landscape' : 'portrait'
return shape.textContent.trim() === want
  ? true
  : '#shape should read ' + want + ' for a ' + screen.width + ' by ' + screen.height + ' display — got: ' + shape.textContent.trim();`,
                },
                {
                  id: 'ex-js-screen-location-t4',
                  label: 'The report button refreshes all three',
                  body: `var path = document.querySelector('#path')
var screenOut = document.querySelector('#screen')
var shape = document.querySelector('#shape')
var reportBtn = document.querySelector('#report')
if (!path || !screenOut || !shape) return 'Keep all three spans.'
if (!reportBtn) return 'Keep the #report button.'
if (typeof report !== 'function') return 'Name the function report.'
path.textContent = 'cleared'
screenOut.textContent = 'cleared'
shape.textContent = 'cleared'
reportBtn.click()
return screenOut.textContent.trim() === String(screen.width) && path.textContent === location.pathname
  ? true
  : 'Clicking #report should fill all three spans again — attach the listener to the button, not to report.';`,
                },
              ],
              hints: [
                'Look the three elements up once, at the top, and name them so the function is three readable lines.',
                'The tricky one is #screen: `textContent` needs a string, so wrap it — `String(screen.width)`.',
                'For the shape, a ternary is exactly the right tool: `screen.width > screen.height ? "landscape" : "portrait"`. Then call `report()` and add the click listener on the button.',
              ],
              solution: {
                html: `<p>Path: <span id="path"></span></p>
<p>Screen: <span id="screen"></span></p>
<p>Shape: <span id="shape"></span></p>
<button id="report" type="button">Report</button>`,
                javascript: `const path = document.querySelector('#path')
const screenOut = document.querySelector('#screen')
const shape = document.querySelector('#shape')

function report() {
  path.textContent = location.pathname
  screenOut.textContent = String(screen.width)
  shape.textContent = screen.width > screen.height ? 'landscape' : 'portrait'
}

report()
document.querySelector('#report').addEventListener('click', report)`,
              },
              testNotes:
                'The checks call `report` directly and also click your button, so the function and the wiring are both checked. The last one clears all three spans first, so a listener that was never attached cannot pass by accident.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s65',
      title: 'Screen and location check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s65-q1',
          type: 'multiple-choice',
          prompt: 'What does the `screen` object describe?',
          options: [
            'The browser window, tabs and toolbars included',
            'The whole display the browser window happens to be on',
            'The scrollable area of the page',
            'The document, as it was when the page loaded',
          ],
          answer: 1,
          explanation:
            '`screen` is the display, not the window and not the page. That is why `screen.availHeight` is smaller than `screen.height` on a machine with a taskbar, and why it is the wrong number to lay out with.',
        },
        {
          id: 'quiz-js-s65-q2',
          type: 'true-false',
          prompt:
            '`location` is read-only in the sense that you cannot set it to a new value — to change the page you must use a method.',
          answer: false,
          explanation:
            'You can assign to `location.href` and the browser navigates, which is exactly what `location.assign` does. What you cannot do is make the property *hold* something other than the current URL.',
        },
        {
          id: 'quiz-js-s65-q3',
          type: 'blank',
          prompt:
            'For the URL `https://codeingot.dev/courses/dom?q=events`, which property gives you `/courses/dom`?',
          answers: ['pathname', 'location.pathname', '.pathname'],
          explanation:
            '`pathname` is the path only. `href` is the whole URL, `host` is the domain with any port, and `search` is the query string including its leading question mark.',
        },
        {
          id: 'quiz-js-s65-q4',
          type: 'code-output',
          prompt: 'The page is `https://codeingot.dev/courses/dom?q=events`. What does this print?',
          code: `console.log(location.search)`,
          options: ['q=events', '?q=events', 'events', '?q=events#listeners'],
          answer: 1,
          explanation:
            '`search` is the raw query string, question mark and all, as a single string. `new URLSearchParams(location.search).get("q")` is what gives you just `events`, or `null` when the key is missing.',
        },
        {
          id: 'quiz-js-s65-q5',
          type: 'identify-error',
          prompt: 'The user cannot get back to the page they were on. What happened?',
          code: `const go = document.querySelector('#go')
go.addEventListener('click', function () {
  window.location.href = nextPage
})`,
          options: [
            'Nothing — assigning to href is the recommended way to navigate',
            'It should have been screen.width rather than the href',
            'This navigates away and nothing after it runs; an anchor with an href would at least give the user Back and a new tab',
            'location.href cannot be assigned to, so nothing happened at all',
          ],
          answer: 2,
          explanation:
            'Navigation is not wrong, but the page that stays in the history depends on it: assigning `href` adds an entry, and the user does get Back. The real cost of doing it from a handler is that there is no link to middle-click or open in a new tab — so use a real `<a href>` whenever the destination is a URL you could have linked to.',
        },
      ],
    },
  },
]
