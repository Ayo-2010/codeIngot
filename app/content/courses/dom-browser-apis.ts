import type { Section } from '~/types/content'

export const domBrowserApisSections: Section[] = [
  {
    id: 'dom-s1',
    title: 'DOM Fundamentals',
    description: 'What the DOM is, how the browser builds it, and the three main ways to select elements.',
    lessons: [
      {
        id: 'dom-l1',
        title: 'What the DOM is',
        description: 'The tree the browser builds from your markup, how it differs from the source, and why it is the thing JavaScript actually runs against.',
        duration: 7,
        objectives: [
          'Describe the DOM as a live tree of nodes built by the browser',
          'Explain the difference between the source you wrote and the DOM the browser built',
          'Use document as the entry point for all DOM work',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l1-b1',
            body: 'The browser does not render your HTML file directly. It reads the bytes, parses them into a tree of nodes, repairs anything broken, and only then paints pixels. That tree is the DOM — the Document Object Model — and it is the thing JavaScript actually talks to. Every element, every attribute, every text node is a node in that tree, and every node is reachable from the single document object.',
          },
          {
            type: 'demo',
            id: 'd-l1-d1',
            title: 'Source versus DOM',
            body: 'The source on the left is missing a closing tag. The DOM on the right is what the browser actually built — well-formed and predictable.',
            html: `<div class="row">
  <div class="card">
    <h3>What you wrote</h3>
    <pre>&lt;ul&gt;
  &lt;li&gt;First
  &lt;li&gt;Second
  &lt;p&gt;Not closed either
&lt;/div&gt;</pre>
  </div>
  <div class="card">
    <h3>What the browser built</h3>
    <pre>&lt;ul&gt;
  &lt;li&gt;First&lt;/li&gt;
  &lt;li&gt;Second&lt;/li&gt;
&lt;/ul&gt;
&lt;p&gt;Not closed either&lt;/p&gt;</pre>
  </div>
</div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.card pre { margin: 0; font-size: 11.5px; line-height: 1.6; }`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'd-l1-h1',
            level: 3,
            body: 'The DOM is live and mutable',
          },
          {
            type: 'text',
            id: 'd-l1-b2',
            body: 'Unlike the static text in your file, the DOM is a live structure you can read and change while the page is open. Change an element with JavaScript and the browser repaints. Attach a listener and it waits for the user to act. Read an attribute and the browser walks the tree and hands you the current value. That live quality is what makes interactivity possible.',
          },
          {
            type: 'list',
            id: 'd-l1-l1',
            style: 'bullet',
            items: [
              '**document** is the root. Every lookup, creation and write starts here.',
              '**Elements** are nodes with a tag name, attributes and optional children.',
              '**Text nodes** hold the words between tags. They are separate from the elements that contain them.',
              '**Attributes** live on elements and are accessible through the element that carries them.',
              '**The DOM is not your source.** Inspect the page and you will see nodes you never typed.',
            ],
          },
          {
            type: 'heading',
            id: 'd-l1-h2',
            level: 3,
            body: 'Common node types',
          },
          {
            type: 'code',
            id: 'd-l1-c1',
            language: 'javascript',
            title: 'Node types you will see most',
            code: `document.doctype           // the <!DOCTYPE html>
document.documentElement   // the <html> element
document.head              // the <head>
document.body              // the <body>
element.tagName            // "DIV", "P", "SPAN"...
element.attributes         // a NamedNodeMap of attributes
element.childNodes         // all children, including text nodes
element.children           // only element children`,
          },
          {
            type: 'tip',
            id: 'd-l1-t1',
            title: 'Use the Elements panel, not View Source',
            body: 'View Source shows what you wrote. The Elements panel shows the DOM after the browser has repaired it. When they disagree, the disagreement is usually the bug.',
          },
          {
            type: 'warning',
            id: 'd-l1-w1',
            title: 'The DOM can surprise you',
            body: 'A missing closing tag, an unopened element, or text placed where a block element is not allowed can all silently move content to a different part of the tree. The browser never throws an error — it just repairs.',
          },
          {
            type: 'exercise',
            id: 'd-l1-x1',
            exercise: {
              id: 'ex-dom-l1',
              instructions:
                'The HTML below has two paragraphs and a heading inside a section. Use the DOM to find the section, count its paragraph children, and read the text of the heading.',
              languages: ['javascript'],
              starterCode: {
                html: `<section id="notes">
  <h2>Weekly notes</h2>
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</section>`,
                javascript: `// The section is already in the DOM. Use the section variable
// or query for #notes, then answer the three checks below.

const section = document.querySelector('#notes')
`,
              },
              expectedOutput: 'section: 2 paragraphs, heading: Weekly notes',
              tests: [
                {
                  id: 'ex-dom-l1-t1',
                  label: 'The section element is found',
                  body: `return !!section`,
                },
                {
                  id: 'ex-dom-l1-t2',
                  label: 'The section contains exactly two paragraphs',
                  body: `return section.querySelectorAll('p').length === 2`,
                },
                {
                  id: 'ex-dom-l1-t3',
                  label: 'The heading text is "Weekly notes"',
                  body: `return section.querySelector('h2').textContent.trim() === 'Weekly notes'`,
                },
                {
                  id: 'ex-dom-l1-t4',
                  label: 'The heading is a direct child of the section',
                  body: `return section.firstElementChild?.tagName === 'H2'`,
                },
              ],
              hints: [
                'querySelector on the section limits the search to its descendants.',
                'firstElementChild ignores text nodes and gives you the first element only.',
              ],
              solution: {
                javascript: `const section = document.querySelector('#notes')
const pCount = section.querySelectorAll('p').length
const heading = section.querySelector('h2').textContent.trim()
`,
              },
              testNotes:
                'These checks query the live DOM, so they verify what the browser actually built rather than what you think you wrote.',
            },
          },
        ],
      },
      {
        id: 'dom-l2',
        title: 'Selecting elements',
        description: 'querySelector, querySelectorAll, getElementById, getElementsByClassName, and when each one earns its keep.',
        duration: 7,
        objectives: [
          'Select a single element with querySelector or getElementById',
          'Select multiple elements with querySelectorAll or getElementsByClassName',
          'Choose the right selector for the job',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l2-b1',
            body: 'Before you can change anything you have to find it. The DOM gives you two families of lookup: one that returns a single element or null, and one that returns a collection. In modern code the single-element family is querySelector, which accepts any CSS selector. The multi-element family is querySelectorAll, which returns a static NodeList you can loop over.',
          },
          {
            type: 'demo',
            id: 'd-l2-d1',
            title: 'Selecting elements live',
            body: 'Each button uses a different selection method to find the same paragraph.',
            html: `<div class="row">
  <div class="card">
    <h3>Target</h3>
    <p id="target" class="note">The paragraph to find.</p>
  </div>
  <div class="card">
    <h3>Results</h3>
    <button type="button" class="btn" data-method="querySelector">querySelector</button>
    <button type="button" class="btn" data-method="getElementById">getElementById</button>
    <button type="button" class="btn" data-method="querySelectorAll">querySelectorAll</button>
    <pre id="out" class="out"></pre>
  </div>
</div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.btn { display: block; width: 100%; margin: 0.25rem 0; padding: 0.35rem; font-size: 12px; }
.out { margin: 0.5rem 0 0; padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 11px; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const method = btn.dataset.method
    if (method === 'querySelector') {
      out.textContent = JSON.stringify(document.querySelector('#target')?.textContent)
    } else if (method === 'getElementById') {
      out.textContent = JSON.stringify(document.getElementById('target')?.textContent)
    } else {
      out.textContent = 'found ' + document.querySelectorAll('#target').length + ' match(es)'
    }
  })
})`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'd-l2-h1',
            level: 3,
            body: 'The selection methods compared',
          },
          {
            type: 'list',
            id: 'd-l2-l1',
            style: 'bullet',
            items: [
              '**document.querySelector(selector)** — returns the first matching element, or null. Accepts any CSS selector. This is the method you will use most.',
              '**document.querySelectorAll(selector)** — returns a static NodeList of every match. Empty list if nothing matches.',
              '**document.getElementById(id)** — the fastest lookup by id. Returns the element or null.',
              '**element.querySelector(selector)** — searches only within that element\'s descendants.',
              '**element.closest(selector)** — walks up the tree and returns the first ancestor that matches.',
            ],
          },
          {
            type: 'code',
            id: 'd-l2-c1',
            language: 'javascript',
            title: 'Common selection patterns',
            code: `const card = document.querySelector('.card')
const allCards = document.querySelectorAll('.card')
const byId = document.getElementById('main')
const navLinks = document.querySelectorAll('nav a')
const closestSection = card.closest('section')`,
          },
          {
            type: 'heading',
            id: 'd-l2-h2',
            level: 3,
            body: 'NodeList versus HTMLCollection',
          },
          {
            type: 'text',
            id: 'd-l2-b2',
            body: 'querySelectorAll returns a NodeList, which is static: the browser snapshots the matches at the moment you call it and never updates the list. getElementsByClassName and getElementsByTagName return an HTMLCollection, which is live: if the DOM changes, the collection changes with it. In practice NodeList is almost always the safer choice because it does not surprise you with stale or growing results.',
          },
          {
            type: 'tip',
            id: 'd-l2-t1',
            title: 'Treat null as the normal result',
            body: 'Every single-element selector can return null, and it will the moment the element is missing or the selector is wrong. Check for null before reading properties, or the next line throws.',
          },
          {
            type: 'warning',
            id: 'd-l2-w1',
            title: 'getElementById is a document-only method',
            body: 'It lives on document, not on elements. Calling element.getElementById works in some browsers but is not part of the standard and will fail in others. Use querySelector on the element instead.',
          },
          {
            type: 'exercise',
            id: 'd-l2-x1',
            exercise: {
              id: 'ex-dom-l2',
              instructions:
                'Find the first item in the list using querySelector, count all items with querySelectorAll, and use closest to find the nearest section ancestor of the list.',
              languages: ['javascript'],
              starterCode: {
                html: `<section class="wrapper">
  <ul id="menu">
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</section>`,
                javascript: `// Use querySelector, querySelectorAll and closest
// to answer the four checks below.

const list = document.querySelector('#menu')
`,
              },
              expectedOutput: 'first: Home, count: 3, section found',
              tests: [
                {
                  id: 'ex-dom-l2-t1',
                  label: 'The first list item text is "Home"',
                  body: `return list.querySelector('li')?.textContent.trim() === 'Home'`,
                },
                {
                  id: 'ex-dom-l2-t2',
                  label: 'querySelectorAll returns exactly three items',
                  body: `return list.querySelectorAll('li').length === 3`,
                },
                {
                  id: 'ex-dom-l2-t3',
                  label: 'closest finds the section wrapper',
                  body: `return list.closest('section')?.classList.contains('wrapper')`,
                },
                {
                  id: 'ex-dom-l2-t4',
                  label: 'The NodeList from querySelectorAll is static',
                  body: `const items = list.querySelectorAll('li'); const first = items[0]; list.append(document.createElement('li')); return items.length === 3`,
                },
              ],
              hints: [
                'closest starts on the element you call it on and walks up through parents.',
                'A NodeList from querySelectorAll does not update when you add elements.',
              ],
              solution: {
                javascript: `const list = document.querySelector('#menu')
const first = list.querySelector('li')?.textContent.trim()
const all = list.querySelectorAll('li').length
const section = list.closest('section')
`,
              },
              testNotes:
                'The fourth check verifies that querySelectorAll returns a snapshot, not a live collection.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s1',
      title: 'DOM Fundamentals quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s1-q1',
          type: 'multiple-choice',
          prompt: 'What is the DOM?',
          options: [
            'The raw HTML file the browser downloads',
            'A live tree of nodes the browser builds from the markup',
            'A CSS data structure that controls layout',
            'A JavaScript object that stores cookies',
          ],
          answer: 1,
          explanation:
            'The DOM is the browser\'s live tree representation of the document. It is what JavaScript reads and writes, not the text file.',
        },
        {
          id: 'quiz-dom-s1-q2',
          type: 'true-false',
          prompt: 'The DOM and the HTML source are always identical.',
          answer: false,
          explanation:
            'The browser repairs broken markup, adds inferred elements like <tbody>, and may normalise attribute casing. Inspect the live DOM, not just view-source.',
        },
        {
          id: 'quiz-dom-s1-q3',
          type: 'multiple-choice',
          prompt: 'Which method returns a static NodeList?',
          options: [
            'getElementsByClassName',
            'getElementById',
            'querySelectorAll',
            'children',
          ],
          answer: 2,
          explanation:
            'querySelectorAll snapshots the matches at call time. HTMLCollection methods return live collections.',
        },
        {
          id: 'quiz-dom-s1-q4',
          type: 'blank',
          prompt: 'What object is the root of the DOM tree? (one word)',
          answers: ['document'],
          explanation:
            'document is the single entry point. Every lookup, creation and write starts from it.',
        },
        {
          id: 'quiz-dom-s1-q5',
          type: 'multiple-choice',
          prompt: 'What does querySelector return when nothing matches?',
          options: [
            'undefined',
            'An empty NodeList',
            'null',
            'false',
          ],
          answer: 2,
          explanation:
            'Single-element selectors return null on no match. querySelectorAll returns an empty NodeList.',
        },
      ],
    },
  },
  {
    id: 'dom-s2',
    title: 'DOM Traversal',
    description: 'How to walk around the DOM tree: parents, children, siblings, and the methods that make it safe.',
    lessons: [
      {
        id: 'dom-l3',
        title: 'Moving around the tree',
        description: 'parentNode, childNodes, firstElementChild, nextElementSibling, and the difference between element-only and all-node traversal.',
        duration: 7,
        objectives: [
          'Navigate from an element to its parent and children',
          'Use element-only traversal to skip text nodes',
          'Walk between sibling elements with nextElementSibling and previousElementSibling',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l3-b1',
            body: 'Every node in the DOM tree knows its neighbours. From any element you can reach its parent, its children, and its siblings. The trick is knowing which method gives you what you actually want: childNodes gives you everything including whitespace text nodes, while children gives you only element nodes. In most UI work you want elements only, because text nodes are rarely the thing you are trying to style or read.',
          },
          {
            type: 'demo',
            id: 'd-l3-d1',
            title: 'Traversing the tree live',
            body: 'Click any element in the rendered list to walk its relatives and see what each traversal method returns.',
            html: `<ul id="tree">
  <li>Alpha</li>
  <li>Beta
    <ul><li>Beta-1</li><li>Beta-2</li></ul>
  </li>
  <li>Gamma</li>
</ul>
<div id="out" class="out"></div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
ul { padding-left: 1.2rem; }
li { cursor: pointer; padding: 0.2rem 0; }
li:hover { background: #e7e9eb; border-radius: 4px; }
.out { margin-top: 0.75rem; padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 12px; font-family: monospace; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelectorAll('#tree li').forEach(li => {
  li.addEventListener('click', () => {
    const parent = li.parentElement
    const prev = li.previousElementSibling
    const next = li.nextElementSibling
    const children = li.children
    out.innerHTML = 'parent: ' + (parent?.tagName || 'none') +
      '<br>prev: ' + (prev?.textContent.trim().slice(0, 10) || 'none') +
      '<br>next: ' + (next?.textContent.trim().slice(0, 10) || 'none') +
      '<br>children: ' + children.length
  })
})`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'd-l3-h1',
            level: 3,
            body: 'Up, down and sideways',
          },
          {
            type: 'list',
            id: 'd-l3-l1',
            style: 'bullet',
            items: [
              '**parentNode / parentElement** — parentNode can be a document or document fragment; parentElement is always an HTMLElement or null.',
              '**children** — HTMLCollection of element children only. Skips text nodes.',
              '**childNodes** — NodeList of every child node, including text nodes for whitespace.',
              '**firstElementChild / lastElementChild** — first or last element child, or null.',
              '**nextElementSibling / previousElementSibling** — the adjacent element, or null.',
            ],
          },
          {
            type: 'code',
            id: 'd-l3-c1',
            language: 'javascript',
            title: 'Walking the tree',
            code: `const article = document.querySelector('article')
const parent = article.parentElement
const first = article.firstElementChild
const children = article.children
const next = article.nextElementSibling`,
          },
          {
            type: 'heading',
            id: 'd-l3-h2',
            level: 3,
            body: 'Why element-only traversal matters',
          },
          {
            type: 'text',
            id: 'd-l3-b2',
            body: 'In formatted HTML there is almost always whitespace between elements — newlines and indentation. The browser turns those into text nodes. childNodes and childElementCount disagree about how many children an element has, and the disagreement is just whitespace. children and firstElementChild ignore it, which is why they are the safe default for UI work.',
          },
          {
            type: 'tip',
            id: 'd-l3-t1',
            title: 'Prefer the element-only methods',
            body: 'Use children, firstElementChild and nextElementSibling unless you specifically need text nodes. They are closer to what a human means by "the elements inside this one".',
          },
          {
            type: 'exercise',
            id: 'd-l3-x1',
            exercise: {
              id: 'ex-dom-l3',
              instructions:
                'Find the third item in the list, count how many items come after it, and use closest to find the nav element that contains the whole list.',
              languages: ['javascript'],
              starterCode: {
                html: `<nav>
  <ul id="menu">
    <li>Home</li>
    <li>About</li>
    <li>Blog</li>
    <li>Contact</li>
  </ul>
</nav>`,
                javascript: `// Find the third li, count following siblings,
// and find the nav ancestor.

const list = document.querySelector('#menu')
`,
              },
              expectedOutput: 'third: Blog, siblings after: 1, nav found',
              tests: [
                {
                  id: 'ex-dom-l3-t1',
                  label: 'The third item is Blog',
                  body: `return list.children[2].textContent.trim() === 'Blog'`,
                },
                {
                  id: 'ex-dom-l3-t2',
                  label: 'There is exactly one sibling after the third item',
                  body: `return list.children[2].nextElementSibling?.textContent.trim() === 'Contact'`,
                },
                {
                  id: 'ex-dom-l3-t3',
                  label: 'closest finds the nav ancestor',
                  body: `return list.closest('nav')?.tagName === 'NAV'`,
                },
                {
                  id: 'ex-dom-l3-t4',
                  label: 'firstElementChild is the first li, not a text node',
                  body: `return list.firstElementChild?.tagName === 'LI' && list.firstElementChild?.textContent.trim() === 'Home'`,
                },
              ],
              hints: [
                'children is an HTMLCollection, so you can use bracket notation.',
                'closest starts from the element you call it on.',
              ],
              solution: {
                javascript: `const list = document.querySelector('#menu')
const third = list.children[2]
const after = third.nextElementSibling
const nav = list.closest('nav')
`,
              },
              testNotes:
                'The fourth check proves that firstElementChild skips whitespace text nodes.',
            },
          },
        ],
      },
      {
        id: 'dom-l4',
        title: 'Node relationships',
        description: 'parentElement, closest, contains, and how to compare nodes safely when the tree changes.',
        duration: 7,
        objectives: [
          'Use closest to find the nearest matching ancestor',
          'Use contains to test whether one node is inside another',
          'Understand why node identity matters when the DOM changes',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l4-b1',
            body: 'closest and contains are the two methods that make ancestor testing readable. closest walks up from the element you call it on and returns the first ancestor that matches the selector, including the element itself. contains answers a simpler question: is this node anywhere inside that other node? Both are faster and clearer than manually looping through parentElement chains.',
          },
          {
            type: 'heading',
            id: 'd-l4-h1',
            level: 3,
            body: 'closest',
          },
          {
            type: 'code',
            id: 'd-l4-c1',
            language: 'javascript',
            title: 'closest in practice',
            code: `// delegate a click from a button up to its card
const card = button.closest('.card')
if (card) {
  card.classList.add('is-selected')
}`,
          },
          {
            type: 'text',
            id: 'd-l4-b2',
            body: 'contains is most useful in event handlers when you need to know whether a click landed inside a particular region. It accepts any two nodes, and returns true if the second is the first or anywhere inside it. It returns false if either node is detached from the document, which makes it safe to use with nodes you created but have not yet attached.',
          },
          {
            type: 'code',
            id: 'd-l4-c2',
            language: 'javascript',
            title: 'contains for click-outside detection',
            code: `function clickedOutside(node: HTMLElement, container: HTMLElement) {
  return !container.contains(node)
}

document.addEventListener('click', (event) => {
  const clickedOutside = !modal.contains(event.target)
  if (clickedOutside) close()
})`,
          },
          {
            type: 'heading',
            id: 'd-l4-h2',
            level: 3,
            body: 'Node identity',
          },
          {
            type: 'text',
            id: 'd-l4-b3',
            body: 'Two references to the same element are strictly equal. If you query the same element twice and compare with ===, the result is true. But if the element is removed and a new one inserted in the same place, the new reference is === false against the old one, even though they look identical in the inspector. Node identity follows the object, not the position.',
          },
          {
            type: 'tip',
            id: 'd-l4-t1',
            title: 'closest is safer than a parent loop',
            body: 'A loop through parentElement works, but closest does the same walk in one line and stops as soon as it finds a match. It also handles the case where the starting element itself matches.',
          },
          {
            type: 'warning',
            id: 'd-l4-w1',
            title: 'contains and event.target are not the same question',
            body: 'event.target is the deepest element that was actually clicked. contains tells you whether that target is inside a region. They answer different questions and are not interchangeable.',
          },
          {
            type: 'exercise',
            id: 'd-l4-x1',
            exercise: {
              id: 'ex-dom-l4',
              instructions:
                'When the button is clicked, use closest to find the nearest .item ancestor and toggle the class "active" on it. Use contains in a document click listener to close the details block when clicking outside it.',
              languages: ['javascript'],
              starterCode: {
                html: `<div class="list">
  <div class="item">
    <button type="button" class="toggle">Toggle</button>
    <details class="info">
      <summary>Details for item one</summary>
      <p>Hidden content here.</p>
    </details>
  </div>
  <div class="item">
    <button type="button" class="toggle">Toggle</button>
    <details class="info">
      <summary>Details for item two</summary>
      <p>Hidden content here.</p>
    </details>
  </div>
</div>`,
                javascript: `// Add click handlers so that:
// 1. Clicking .toggle toggles "active" on the nearest .item
// 2. Clicking outside .info closes it (remove "open" from details)

document.querySelector('.toggle').addEventListener('click', () => {
  // Use closest to find the item
})
`,
              },
              expectedOutput: 'click toggle: item gets active class',
              tests: [
                {
                  id: 'ex-dom-l4-t1',
                  label: 'Clicking toggle adds active to the item',
                  body: `const item = document.querySelector('.item')
const btn = item.querySelector('.toggle')
btn.click()
return item.classList.contains('active')`,
                },
                {
                  id: 'ex-dom-l4-t2',
                  label: 'Clicking toggle again removes active',
                  body: `const item = document.querySelector('.item')
const btn = item.querySelector('.toggle')
btn.click(); btn.click()
return !item.classList.contains('active')`,
                },
                {
                  id: 'ex-dom-l4-t3',
                  label: 'Clicking outside closes the details',
                  body: `const details = document.querySelector('.info')
details.open = true
document.querySelector('.list').dispatchEvent(new MouseEvent('click', { bubbles: true }))
return !details.open`,
                },
              ],
              hints: [
                'closest(".item") on the button gives you the card.',
                'contains on the details element tells you whether the click landed inside it.',
              ],
              solution: {
                javascript: `document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.item')
    if (item) item.classList.toggle('active')
  })
})
document.addEventListener('click', (e) => {
  const details = document.querySelector('.info')
  if (details && !details.contains(e.target)) details.removeAttribute('open')
})
`,
              },
              testNotes:
                'The tests simulate clicks through the DOM, so the handlers need to be attached before the checks run.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s2',
      title: 'DOM Traversal quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s2-q1',
          type: 'multiple-choice',
          prompt: 'Which property gives you only element children, skipping text nodes?',
          options: ['childNodes', 'children', 'childElementCount', 'nodeValue'],
          answer: 1,
          explanation: 'children is an HTMLCollection of element children only. childNodes includes text nodes for whitespace.',
        },
        {
          id: 'quiz-dom-s2-q2',
          type: 'true-false',
          prompt: 'closest searches downward from the element you call it on.',
          answer: false,
          explanation: 'closest walks upward through ancestors. It includes the starting element itself in the check.',
        },
        {
          id: 'quiz-dom-s2-q3',
          type: 'multiple-choice',
          prompt: 'What does firstElementChild return when the element has only whitespace children?',
          options: ['A text node', 'The first whitespace node', 'null', 'undefined'],
          answer: 2,
          explanation: 'firstElementChild ignores text nodes. Whitespace-only children are text nodes, so the result is null.',
        },
        {
          id: 'quiz-dom-s2-q4',
          type: 'blank',
          prompt: 'Which method tests whether one node is inside another? (one word)',
          answers: ['contains'],
          explanation: 'contains(node) returns true if the argument is the element itself or anywhere inside it.',
        },
        {
          id: 'quiz-dom-s2-q5',
          type: 'multiple-choice',
          prompt: 'Why is nextElementSibling safer than nextSibling?',
          options: [
            'It is faster',
            'It skips text nodes and returns only the next element',
            'It works in all browsers',
            'It returns a NodeList',
          ],
          answer: 1,
          explanation: 'nextSibling can return a text node for whitespace. nextElementSibling skips straight to the next element.',
        },
      ],
    },
  },
  {
    id: 'dom-s3',
    title: 'DOM Manipulation',
    description: 'Creating, inserting, modifying and removing elements from the live document.',
    lessons: [
      {
        id: 'dom-l5',
        title: 'Creating and inserting elements',
        description: 'createElement, createTextNode, append, prepend, insertBefore, and the family of methods that grow the tree.',
        duration: 8,
        objectives: [
          'Create a new element with createElement',
          'Insert elements with append, prepend and insertBefore',
          'Build a small piece of UI from JavaScript without touching innerHTML',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'd-l5-b1',
            body: 'The DOM is not read-only. JavaScript can create brand new nodes, fill them with content, and insert them anywhere in the existing tree. The safe way to do this is with the DOM methods: createElement makes a new element, createTextNode makes a text node, and append or prepend attach them to an existing parent. Each call is a single, well-defined operation the browser can optimise.',
          },
          {
            type: 'heading',
            id: 'd-l5-h1',
            level: 3,
            body: 'The insertion methods compared',
          },
          {
            type: 'list',
            id: 'd-l5-l1',
            style: 'bullet',
            items: [
              '**parent.append(node, ...nodes)** — adds after all existing children. Returns the appended nodes.',
              '**parent.prepend(node, ...nodes)** — adds before all existing children.',
              '**parent.insertBefore(newNode, referenceNode)** — adds before a specific child.',
              '**node.replaceWith(...nodes)** — swaps the node for new content.',
              '**parent.replaceChildren(...nodes)** — empties the parent and inserts new content in one operation.',
            ],
          },
          {
            type: 'code',
            id: 'd-l5-c1',
            language: 'javascript',
            title: 'Building a list item from scratch',
            code: `const list = document.querySelector('#menu')

const item = document.createElement('li')
item.className = 'new'

const text = document.createTextNode('Settings')
item.append(text)

list.prepend(item)`,
          },
          {
            type: 'demo',
            id: 'd-l5-d1',
            title: 'Appending and prepending live',
            body: 'Add a new item to the top or bottom of the list using the DOM insertion methods.',
            html: `<ul id="menu" class="menu">
  <li>Home</li>
  <li>About</li>
</ul>
<div class="controls">
  <button type="button" id="prepend-btn" class="btn">Prepend item</button>
  <button type="button" id="append-btn" class="btn">Append item</button>
</div>
<p id="count" class="count"></p>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.menu { list-style: none; padding: 0; margin: 0; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.5rem; }
.menu li { padding: 0.4rem 0.6rem; border-radius: 4px; }
.menu li:hover { background: #e7e9eb; }
.controls { margin-top: 0.5rem; display: flex; gap: 0.5rem; }
.btn { padding: 0.4rem 0.7rem; font-size: 12px; }
.count { margin: 0.4rem 0 0; font-size: 12px; color: #64748b; }`,
            javascript: `const list = document.querySelector('#menu')
let count = 2

document.querySelector('#prepend-btn').addEventListener('click', () => {
  const li = document.createElement('li')
  li.textContent = 'Prepended ' + (++count)
  list.prepend(li)
})

document.querySelector('#append-btn').addEventListener('click', () => {
  const li = document.createElement('li')
  li.textContent = 'Appended ' + (++count)
  list.append(li)
})`,
            height: 160,
          },
          {
            type: 'tip',
            id: 'd-l5-t1',
            title: 'Prefer append over inserting a text node manually',
            body: 'append accepts strings and nodes together. Passing a string is equivalent to creating a text node, so you can write element.append("text") instead of element.append(document.createTextNode("text")).',
          },
          {
            type: 'warning',
            id: 'd-l5-w1',
            title: 'insertBefore needs the reference node to be a child',
            body: 'If the reference node is not inside the parent, insertBefore throws. Check with parent.contains(reference) before calling it if you are not sure.',
          },
          {
            type: 'exercise',
            id: 'd-l5-x1',
            exercise: {
              id: 'ex-dom-l5',
              instructions:
                'Build a new article element with a heading and a paragraph, then insert it before the existing first article in the main element.',
              languages: ['javascript'],
              starterCode: {
                html: `<main>
  <article>
    <h2>Existing article</h2>
    <p>Already here.</p>
  </article>
</main>`,
                javascript: `// Create a new <article> with an <h2> and a <p>,
// then insert it before the first existing article.

const main = document.querySelector('main')
`,
              },
              expectedOutput: 'main has 2 articles, new article is first',
              tests: [
                {
                  id: 'ex-dom-l5-t1',
                  label: 'main now has two articles',
                  body: `return main.querySelectorAll('article').length === 2`,
                },
                {
                  id: 'ex-dom-l5-t2',
                  label: 'The new article is the first child',
                  body: `return main.firstElementChild?.querySelector('h2')?.textContent.includes('New')`,
                },
                {
                  id: 'ex-dom-l5-t3',
                  label: 'The new article has a paragraph',
                  body: `return !!main.firstElementChild?.querySelector('p')`,
                },
                {
                  id: 'ex-dom-l5-t4',
                  label: 'The existing article moved down, not replaced',
                  body: `return main.querySelectorAll('article')[1]?.querySelector('h2')?.textContent.includes('Existing')`,
                },
              ],
              hints: [
                'createElement makes the article, then querySelector on main finds the existing one.',
                'insertBefore takes the new node first and the reference node second.',
              ],
              solution: {
                javascript: `const main = document.querySelector('main')
const article = document.createElement('article')
const h2 = document.createElement('h2')
h2.textContent = 'New article'
const p = document.createElement('p')
p.textContent = 'Inserted before the existing one.'
article.append(h2, p)
const existing = main.querySelector('article')
main.insertBefore(article, existing)
`,
              },
              testNotes:
                'The fourth check confirms insertBefore did not remove the existing article.',
            },
          },
        ],
      },
      {
        id: 'dom-l6',
        title: 'Modifying the DOM',
        description: 'Changing text and markup in place, removing nodes, and when it is safe to use innerHTML.',
        duration: 8,
        objectives: [
          'Change element content with textContent and innerText',
          'Use remove and replaceChildren to clean up the tree',
          'Decide when innerHTML is acceptable and when it is not',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'd-l6-b1',
            body: 'Most DOM writes are small: a new item in a list, an updated status message, a removed element after a delete. textContent is the right tool for plain text because it sets the text of the element and all its descendants in one operation, and it automatically escapes anything that looks like markup. innerHTML accepts HTML and parses it, which is powerful but dangerous when the string includes anything a user could have touched.',
          },
          {
            type: 'heading',
            id: 'd-l6-h1',
            level: 3,
            body: 'Text versus markup',
          },
          {
            type: 'list',
            id: 'd-l6-l1',
            style: 'bullet',
            items: [
              '**textContent** — sets plain text. Escapes markup automatically. Fast and safe.',
              '**innerText** — similar but respects CSS display and triggers a layout reflow. Slow and almost never needed.',
              '**innerHTML** — parses a string as HTML. Powerful but unsafe with untrusted input.',
              '**remove()** — removes the node from its parent. Returns undefined.',
              '**replaceChildren(...nodes)** — empties the element and inserts new content.',
            ],
          },
          {
            type: 'code',
            id: 'd-l6-c1',
            language: 'javascript',
            title: 'Updating content safely',
            code: `const status = document.querySelector('#status')
status.textContent = 'Saved at ' + new Date().toLocaleTimeString()

// safe removal
document.querySelector('.old').remove()

// replace all children
document.querySelector('#list').replaceChildren(
  document.createElement('li'),
  document.createElement('li')
)`,
          },
          {
            type: 'demo',
            id: 'd-l6-d1',
            title: 'Modifying content live',
            body: 'Use the buttons to change the paragraph content with different methods.',
            html: `<p id="target" class="target">Original text</p>
<div class="controls">
  <button type="button" class="btn" data-action="textContent">textContent</button>
  <button type="button" class="btn" data-action="innerHTML">innerHTML</button>
  <button type="button" class="btn" data-action="remove">remove last li</button>
</div>
<ul id="list" class="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.target { padding: 0.5rem; border-radius: 6px; background: #f4f6f8; }
.list { list-style: none; padding: 0; margin: 0.5rem 0 0; }
.list li { padding: 0.3rem 0; border-bottom: 1px solid #e7e9eb; }
.controls { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.btn { padding: 0.35rem 0.6rem; font-size: 12px; }`,
            javascript: `const target = document.querySelector('#target')
const list = document.querySelector('#list')
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action
    if (action === 'textContent') {
      target.textContent = 'Updated at ' + Date.now()
    } else if (action === 'innerHTML') {
      target.innerHTML = '<strong>Bold</strong> from innerHTML'
    } else if (action === 'remove') {
      const last = list.lastElementChild
      if (last) last.remove()
    }
  })
})`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'd-l6-h2',
            level: 3,
            body: 'When innerHTML is acceptable',
          },
          {
            type: 'text',
            id: 'd-l6-b2',
            body: 'innerHTML is fine when the string is static and authored by you. It becomes a cross-site scripting risk the moment it includes anything a user could have touched, because the browser parses and executes any script tags or event-handler attributes in the string. If the string ever comes from a form field, an API response, or the URL, use textContent or create the nodes with createElement instead.',
          },
          {
            type: 'tip',
            id: 'd-l6-t1',
            title: 'Batch writes with replaceChildren',
            body: 'replaceChildren clears the element and inserts the new content in one step. It is faster than looping remove() and it avoids the intermediate empty state that triggers extra layout work.',
          },
          {
            type: 'exercise',
            id: 'd-l6-x1',
            exercise: {
              id: 'ex-dom-l6',
              instructions:
                'Replace the content of the article with a new heading and paragraph built with createElement. Use textContent for the text and remove the old content without touching innerHTML.',
              languages: ['javascript'],
              starterCode: {
                html: `<article id="post">
  <h2>Old title</h2>
  <p>Old content that should be replaced.</p>
</article>`,
                javascript: `// Build a new h2 and p with createElement,
// then replace the article's children safely.

const article = document.querySelector('#post')
`,
              },
              expectedOutput: 'article has new heading and new paragraph',
              tests: [
                {
                  id: 'ex-dom-l6-t1',
                  label: 'The article heading is the new title',
                  body: `return article.querySelector('h2')?.textContent.trim() === 'Fresh title'`,
                },
                {
                  id: 'ex-dom-l6-t2',
                  label: 'The article paragraph is the new text',
                  body: `return article.querySelector('p')?.textContent.trim() === 'Written with createElement.'`,
                },
                {
                  id: 'ex-dom-l6-t3',
                  label: 'The old content is gone',
                  body: `return !article.textContent.includes('Old title')`,
                },
                {
                  id: 'ex-dom-l6-t4',
                  label: 'Only one h2 and one p remain',
                  body: `return article.querySelectorAll('h2').length === 1 && article.querySelectorAll('p').length === 1`,
                },
              ],
              hints: [
                'replaceChildren on the article removes everything at once.',
                'append can take multiple nodes in one call.',
              ],
              solution: {
                javascript: `const article = document.querySelector('#post')
const h2 = document.createElement('h2')
h2.textContent = 'Fresh title'
const p = document.createElement('p')
p.textContent = 'Written with createElement.'
article.replaceChildren(h2, p)
`,
              },
              testNotes:
                'The fourth check confirms you did not append to the old content but replaced it.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s3',
      title: 'DOM Manipulation quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s3-q1',
          type: 'multiple-choice',
          prompt: 'Which method creates a new element without adding it to the document?',
          options: ['append', 'createElement', 'insertBefore', 'replaceChildren'],
          answer: 1,
          explanation: 'createElement returns a detached node. You insert it with append, prepend or insertBefore.',
        },
        {
          id: 'quiz-dom-s3-q2',
          type: 'true-false',
          prompt: 'textContent automatically escapes markup inside the string.',
          answer: true,
          explanation: 'textContent treats the string as plain text. Any angle brackets become characters, not elements.',
        },
        {
          id: 'quiz-dom-s3-q3',
          type: 'multiple-choice',
          prompt: 'Which method removes an element from its parent?',
          options: ['delete()', 'remove()', 'destroy()', 'pop()'],
          answer: 1,
          explanation: 'remove() detaches the node from its parent. It returns undefined and cannot be chained.',
        },
        {
          id: 'quiz-dom-s3-q4',
          type: 'blank',
          prompt: 'Which method empties an element and inserts new children in one call?',
          answers: ['replacechildren', 'replaceChildren'],
          explanation: 'replaceChildren removes everything and inserts the new nodes in a single operation.',
        },
        {
          id: 'quiz-dom-s3-q5',
          type: 'multiple-choice',
          prompt: 'When is innerHTML safe to use?',
          options: [
            'When the string comes from a form field',
            'When the string is static and authored by you',
            'It is never safe',
            'When the element has no event listeners',
          ],
          answer: 1,
          explanation: 'Static, authored strings are safe. User input is not, because the browser parses and executes script tags.',
        },
      ],
    },
  },
  {
    id: 'dom-s4',
    title: 'DOM Attributes and Styles',
    description: 'Reading and writing attributes, working with classes and data attributes, and controlling inline styles.',
    lessons: [
      {
        id: 'dom-l7',
        title: 'Working with attributes',
        description: 'getAttribute, setAttribute, removeAttribute, dataset, and the classList API for class changes.',
        duration: 7,
        objectives: [
          'Read and write attributes with getAttribute and setAttribute',
          'Use classList to add, remove and toggle classes',
          'Store custom values with data attributes',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l7-b1',
            body: 'Every attribute on an element is readable and writable from JavaScript. getAttribute reads the current value by name, setAttribute writes a new one, and removeAttribute deletes it. The class attribute has its own faster API in classList, because class changes are so common. Data attributes — anything that starts with data- — are exposed on the dataset object, which converts the attribute name to camelCase.',
          },
          {
            type: 'code',
            id: 'd-l7-c1',
            language: 'javascript',
            title: 'Attribute methods',
            code: `const link = document.querySelector('a')

link.getAttribute('href')         // read
link.setAttribute('target', '_blank') // write
link.removeAttribute('title')     // delete

link.dataset.userId               // read data-user-id
link.dataset.userId = '42'        // write data-user-id`,
          },
          {
            type: 'heading',
            id: 'd-l7-h1',
            level: 3,
            body: 'classList',
          },
          {
            type: 'list',
            id: 'd-l7-l1',
            style: 'bullet',
            items: [
              '**classList.add(className)** — adds the class if it is not already there.',
              '**classList.remove(className)** — removes it.',
              '**classList.toggle(className)** — adds if absent, removes if present.',
              '**classList.contains(className)** — true or false.',
              '**classList.replace(old, new)** — swaps one class for another.',
            ],
          },
          {
            type: 'code',
            id: 'd-l7-c2',
            language: 'javascript',
            title: 'classList in practice',
            code: `button.classList.add('loading')
button.classList.toggle('active')
button.classList.replace('active', 'selected')
const isOpen = drawer.classList.contains('open')`,
          },
          {
            type: 'demo',
            id: 'd-l7-d1',
            title: 'classList and dataset live',
            body: 'Use the buttons to toggle classes, read a data attribute, and see how dataset maps data- attributes.',
            html: `<div id="box" class="box" data-color="teal" data-size="large">
  <p>Current classes: <span id="class-out">box</span></p>
  <p>data-color: <span id="data-out">teal</span></p>
</div>
<div class="controls">
  <button type="button" class="btn" data-action="toggle">Toggle "active"</button>
  <button type="button" class="btn" data-action="read">Read data-color</button>
</div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.box { padding: 1rem; border: 2px solid #d5dae0; border-radius: 8px; transition: all 0.2s; }
.box.active { border-color: #29e2bd; background: #e6faf6; }
.controls { margin-top: 0.5rem; display: flex; gap: 0.5rem; }
.btn { padding: 0.35rem 0.6rem; font-size: 12px; }`,
            javascript: `const box = document.querySelector('#box')
const classOut = document.querySelector('#class-out')
const dataOut = document.querySelector('#data-out')
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action
    if (action === 'toggle') {
      box.classList.toggle('active')
      classOut.textContent = box.className
    } else {
      dataOut.textContent = box.dataset.color
    }
  })
})`,
            height: 150,
          },
          {
            type: 'tip',
            id: 'd-l7-t1',
            title: 'Use classList, not className, for incremental changes',
            body: 'className is a single string. Setting it replaces every class. classList lets you add or remove individual classes without touching the others.',
          },
          {
            type: 'warning',
            id: 'd-l7-w1',
            title: 'dataset converts names to camelCase',
            body: 'data-user-id becomes dataset.userId, and data-user-name becomes dataset.userName. Hyphens are dropped and the following letter is capitalised.',
          },
          {
            type: 'exercise',
            id: 'd-l7-x1',
            exercise: {
              id: 'ex-dom-l7',
              instructions:
                'Set the data-status attribute to "ready" on the element, toggle the class "visible" with classList, and read back the data-status attribute with getAttribute.',
              languages: ['javascript'],
              starterCode: {
                html: `<div id="box" class="box" data-status="pending">Status box</div>`,
                javascript: `const box = document.querySelector('#box')

// 1. Toggle the "visible" class
// 2. Set data-status to "ready"
// 3. Read it back and log it
`,
              },
              expectedOutput: 'data-status is ready, visible class toggled',
              tests: [
                {
                  id: 'ex-dom-l7-t1',
                  label: 'data-status is set to "ready"',
                  body: `return box.getAttribute('data-status') === 'ready'`,
                },
                {
                  id: 'ex-dom-l7-t2',
                  label: 'dataset matches the attribute',
                  body: `return box.dataset.status === 'ready'`,
                },
                {
                  id: 'ex-dom-l7-t3',
                  label: 'The visible class is toggled on',
                  body: `return box.classList.contains('visible')`,
                },
                {
                  id: 'ex-dom-l7-t4',
                  label: 'classList.replace swaps a class',
                  body: `box.classList.replace('visible', 'hidden'); return box.classList.contains('hidden') && !box.classList.contains('visible')`,
                },
              ],
              hints: [
                'setAttribute takes the attribute name exactly as it appears in HTML.',
                'classList.toggle flips the current state.',
              ],
              solution: {
                javascript: `const box = document.querySelector('#box')
box.classList.toggle('visible')
box.setAttribute('data-status', 'ready')
console.log(box.getAttribute('data-status'))
`,
              },
              testNotes:
                'The fourth check verifies that classList.replace removes the old class before adding the new one.',
            },
          },
        ],
      },
      {
        id: 'dom-l8',
        title: 'Inline styles',
        description: 'The style property, CSS custom properties from JavaScript, and computedStyle for reading the final value.',
        duration: 7,
        objectives: [
          'Set inline styles through the style property',
          'Read computed styles with getComputedStyle',
          'Use CSS custom properties to bridge JavaScript and the stylesheet',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l8-b1',
            body: 'The style property on an element gives you direct access to its inline style declarations. It is a CSSStyleDeclaration object whose properties are the camelCased versions of CSS property names: element.style.backgroundColor, not element.style.\'background-color\'. Inline styles win over stylesheet rules of equal specificity, so they are useful for dynamic values that change at runtime — theme colours, positions from drag interactions, sizes from user input.',
          },
          {
            type: 'heading',
            id: 'd-l8-h1',
            level: 3,
            body: 'Custom properties from JavaScript',
          },
          {
            type: 'text',
            id: 'd-l8-b2',
            body: 'CSS custom properties are the cleanest bridge between JavaScript and the stylesheet. Set --x to 120 on the element and the stylesheet can use var(--x) anywhere inside it. The value flows through the cascade without inline style declarations competing with class-based rules.',
          },
          {
            type: 'code',
            id: 'd-l8-c1',
            language: 'javascript',
            title: 'Setting custom properties',
            code: `const card = document.querySelector('.card')
card.style.setProperty('--x', '120')
card.style.setProperty('--y', '40')
card.style.setProperty('--scale', '1.2')`,
          },
          {
            type: 'code',
            id: 'd-l8-c2',
            language: 'css',
            title: 'Consuming the properties',
            code: `.card {
  transform: translateX(var(--x)) translateY(var(--y)) scale(var(--scale));
}`,
          },
          {
            type: 'heading',
            id: 'd-l8-h2',
            level: 3,
            body: 'Reading computed styles',
          },
          {
            type: 'text',
            id: 'd-l8-b3',
            body: 'getComputedStyle(element) returns the final, resolved values after every stylesheet, inline declaration and inherited rule has been applied. It is read-only. Use it when you need to know the actual pixel value of a property that was set in a stylesheet, or to measure the current size of an element after layout.',
          },
          {
            type: 'code',
            id: 'd-l8-c3',
            language: 'javascript',
            title: 'Reading computed styles',
            code: `const styles = getComputedStyle(card)
const width = styles.width        // "342px"
const color = styles.color        // "rgb(0, 0, 0)"
const transform = styles.transform // "matrix(...)"`,
          },
          {
            type: 'tip',
            id: 'd-l8-t1',
            title: 'Prefer custom properties over direct style manipulation',
            body: 'Setting --x in JavaScript and reading var(--x) in CSS keeps the dynamic value in one place and the layout logic in the stylesheet where it belongs.',
          },
          {
            type: 'warning',
            id: 'd-l8-w1',
            title: 'Inline styles outrank class rules',
            body: 'An inline style wins over a class rule of the same specificity. If you set style.width and the stylesheet sets width, the inline value is what you see.',
          },
          {
            type: 'exercise',
            id: 'd-l8-x1',
            exercise: {
              id: 'ex-dom-l8',
              instructions:
                'Set a CSS custom property --bg to a teal colour on the box element, then read it back from getComputedStyle and verify it is applied.',
              languages: ['javascript'],
              starterCode: {
                html: `<div id="box" class="box">Colour me</div>`,
                javascript: `// Set --bg to "#0d9488" on the box,
// then read it back from getComputedStyle.

const box = document.querySelector('#box')
`,
              },
              expectedOutput: 'box uses the custom property for background',
              tests: [
                {
                  id: 'ex-dom-l8-t1',
                  label: 'The custom property is set on the element',
                  body: `return box.style.getPropertyValue('--bg') === '#0d9488'`,
                },
                {
                  id: 'ex-dom-l8-t2',
                  label: 'The computed background uses the custom property',
                  body: `return getComputedStyle(box).backgroundColor !== 'rgba(0, 0, 0, 0)'`,
                },
                {
                  id: 'ex-dom-l8-t3',
                  label: 'The property is visible in getComputedStyle',
                  body: `return getComputedStyle(box).getPropertyValue('--bg').trim() === '#0d9488'`,
                },
              ],
              hints: [
                'style.setProperty takes the property name and value as two arguments.',
                'getComputedStyle returns computed values for custom properties too.',
              ],
              solution: {
                javascript: `const box = document.querySelector('#box')
box.style.setProperty('--bg', '#0d9488')
const computed = getComputedStyle(box)
const value = computed.getPropertyValue('--bg').trim()
`,
              },
              testNotes:
                'The third check reads the property from getComputedStyle to confirm it made it through the cascade.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s4',
      title: 'DOM Attributes and Styles quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s4-q1',
          type: 'multiple-choice',
          prompt: 'How do you read a data-user-id attribute from JavaScript?',
          options: [
            'element.getAttribute("userId")',
            'element.dataset.userId',
            'element.data["user-id"]',
            'element.attributes.userId',
          ],
          answer: 1,
          explanation: 'Data attributes are exposed on dataset with the name after data- converted to camelCase.',
        },
        {
          id: 'quiz-dom-s4-q2',
          type: 'true-false',
          prompt: 'className and classList do the same thing.',
          answer: false,
          explanation: 'className is a single string; setting it replaces every class. classList lets you add, remove and toggle individual classes.',
        },
        {
          id: 'quiz-dom-s4-q3',
          type: 'multiple-choice',
          prompt: 'Which method reads the final, resolved value of a CSS property?',
          options: ['element.style', 'getComputedStyle', 'document.styleSheets', 'window.getStyle'],
          answer: 1,
          explanation: 'getComputedStyle returns the final value after every stylesheet and inherited rule has been applied.',
        },
        {
          id: 'quiz-dom-s4-q4',
          type: 'blank',
          prompt: 'What property on an element gives you direct access to its inline style declarations?',
          answers: ['style'],
          explanation: 'element.style is a CSSStyleDeclaration for the inline declarations. It is camelCased, not kebab-cased.',
        },
        {
          id: 'quiz-dom-s4-q5',
          type: 'multiple-choice',
          prompt: 'Why are CSS custom properties the preferred way to pass dynamic values from JS to CSS?',
          options: [
            'They are faster than inline styles',
            'They keep the dynamic value separate from the layout logic',
            'They override every stylesheet rule automatically',
            'They do not require JavaScript to read',
          ],
          answer: 1,
          explanation: 'Custom properties let the stylesheet consume the value through var() while keeping layout and theme logic in CSS.',
        },
      ],
    },
  },
  {
    id: 'dom-s5',
    title: 'DOM Events',
    description: 'Event flow, the event object, preventing defaults, stopping propagation, and the delegation pattern.',
    lessons: [
      {
        id: 'dom-l9',
        title: 'Event basics',
        description: 'addEventListener, the event object, preventDefault, stopPropagation, and what event phases mean.',
        duration: 8,
        objectives: [
          'Attach an event listener with addEventListener',
          'Use the event object to read the target, type and coordinates',
          'Explain when to call preventDefault and stopPropagation',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'd-l9-b1',
            body: 'Events are how the browser tells your code that something happened. A click, a key press, a scroll, a form submission — each one is an event object the browser creates and passes to every listener registered for that type on that element. The listener receives it as the first argument, and from it you can read what was clicked, what keys were down, and whether the browser has already done the default action for this interaction.',
          },
          {
            type: 'heading',
            id: 'd-l9-h1',
            level: 3,
            body: 'The event object',
          },
          {
            type: 'list',
            id: 'd-l9-l1',
            style: 'bullet',
            items: [
              '**event.type** — the event name: "click", "keydown", "submit"...',
              '**event.target** — the element the event originally landed on.',
              '**event.currentTarget** — the element the listener is attached to.',
              '**event.defaultPrevented** — true if preventDefault was called.',
              '**event.stopPropagation()** — stops the event from bubbling to ancestors.',
              '**event.preventDefault()** — cancels the browser\'s default action.',
            ],
          },
          {
            type: 'code',
            id: 'd-l9-c1',
            language: 'javascript',
            title: 'A click listener',
            code: `button.addEventListener('click', (event) => {
  console.log(event.type)         // "click"
  console.log(event.target)       // the button
  console.log(event.currentTarget) // the same button here
  event.preventDefault()          // stop the form submit
})`,
          },
          {
            type: 'demo',
            id: 'd-l9-d1',
            title: 'Event phases live',
            body: 'Each link logs which phase the event is in. Click the middle link to see capturing, target and bubbling.',
            html: `<div class="row">
  <a href="#" class="link" data-phase="outer">Outer</a>
  <a href="#" class="link inner" data-phase="inner">Inner</a>
</div>
<pre id="out" class="out"></pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; }
.link { padding: 0.5rem 1rem; border: 1px solid #d5dae0; border-radius: 6px; text-decoration: none; color: #0f766e; }
.inner { border-color: #29e2bd; }
.out { margin-top: 0.75rem; padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 11px; }`,
            javascript: `const out = document.querySelector('#out')
document.querySelectorAll('.link').forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    out.textContent = event.currentTarget.dataset.phase + ' — ' + event.eventPhase
  })
})`,
            height: 120,
          },
          {
            type: 'heading',
            id: 'd-l9-h2',
            level: 3,
            body: 'Event phases',
          },
          {
            type: 'text',
            id: 'd-l9-b2',
            body: 'Events travel in three phases: capturing from the window down to the target, the target phase itself, then bubbling back up to the window. addEventListener listens in the bubbling phase by default, which is what you want most of the time. Pass { capture: true } as the third argument to listen during the capture phase instead.',
          },
          {
            type: 'tip',
            id: 'd-l9-t1',
            title: 'Use event.currentTarget, not event.target, in listeners',
            body: 'target is the deepest element that was clicked, which may be a child of the element you attached the listener to. currentTarget is always the element the listener is on.',
          },
          {
            type: 'warning',
            id: 'd-l9-w1',
            title: 'preventDefault and stopPropagation are not the same',
            body: 'preventDefault cancels the browser default — the form submit, the link navigation, the checkbox toggle. stopPropagation stops the event from reaching ancestor listeners. They solve different problems.',
          },
          {
            type: 'exercise',
            id: 'd-l9-x1',
            exercise: {
              id: 'ex-dom-l9',
              instructions:
                'Attach one listener to the form that prevents the default submit, reads the input value, and displays it in the paragraph below.',
              languages: ['javascript'],
              starterCode: {
                html: `<form id="form" class="form">
  <input type="text" id="name" placeholder="Your name" />
  <button type="submit">Save</button>
</form>
<p id="out" class="out">Waiting…</p>`,
                javascript: `// Prevent the submit, read the input,
// and show the name in the output paragraph.

const form = document.querySelector('#form')
`,
              },
              expectedOutput: 'submitting shows the entered name',
              tests: [
                {
                  id: 'ex-dom-l9-t1',
                  label: 'The form does not reload the page',
                  body: `const form = document.querySelector('#form')
window.__submitted = false
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
return window.__submitted === false`,
                },
                {
                  id: 'ex-dom-l9-t2',
                  label: 'The output updates with the input value',
                  body: `const input = document.querySelector('#name')
input.value = 'Ada'
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
return document.querySelector('#out').textContent.includes('Ada')`,
                },
                {
                  id: 'ex-dom-l9-t3',
                  label: 'The input is cleared after submit',
                  body: `const input = document.querySelector('#name')
input.value = 'Ada'
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
return input.value === ''`,
                },
              ],
              hints: [
                'The submit event fires on the form, not the button.',
                'event.preventDefault() inside the listener stops the reload.',
              ],
              solution: {
                javascript: `const form = document.querySelector('#form')
const input = document.querySelector('#name')
const out = document.querySelector('#out')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  out.textContent = 'Saved: ' + input.value
  input.value = ''
})
`,
              },
              testNotes:
                'The tests dispatch a synthetic submit event. The listener must call preventDefault for the page not to reload.',
            },
          },
        ],
      },
      {
        id: 'dom-l10',
        title: 'Event delegation and custom events',
        description: 'Why attaching one listener to a parent beats dozens on children, and how to create and dispatch your own events.',
        duration: 8,
        objectives: [
          'Use event delegation to handle events on dynamic children',
          'Create and dispatch a custom event with CustomEvent',
          'Explain when delegation is the right pattern',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'd-l10-b1',
            body: 'Event delegation is the practice of attaching one listener to a parent and handling events for all its children through event.target. It works because events bubble: a click on a list item is also a click on the list, the list container, and every ancestor up to the window. The parent can inspect event.target to find out which child was actually clicked and act accordingly. The pattern earns its place when children are added or removed dynamically, because the listener does not need to be re-attached.',
          },
          {
            type: 'heading',
            id: 'd-l10-h1',
            level: 3,
            body: 'Custom events',
          },
          {
            type: 'text',
            id: 'd-l10-b2',
            body: 'CustomEvent lets you define your own event types with a payload. Dispatch it with dispatchEvent on any element, and any listener registered for that type on that element or its ancestors will receive it. Custom events are useful for decoupling: a child can announce that it is done without knowing who is listening.',
          },
          {
            type: 'code',
            id: 'd-l10-c1',
            language: 'javascript',
            title: 'Creating and dispatching a custom event',
            code: `const detail = { userId: 42, status: 'ready' }
const event = new CustomEvent('user:ready', {
  bubbles: true,
  detail,
})

element.dispatchEvent(event)

// elsewhere
element.addEventListener('user:ready', (event) => {
  console.log(event.detail.userId) // 42
})`,
          },
          {
            type: 'demo',
            id: 'd-l10-d1',
            title: 'Event delegation live',
            body: 'One listener on the parent handles clicks on every list item, including items added after the listener is attached.',
            html: `<ul id="list" class="list">
  <li class="item">Existing item</li>
  <li class="item">Existing item</li>
</ul>
<button type="button" id="add" class="btn">Add item</button>
<p id="out" class="out"></p>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.list { list-style: none; padding: 0; margin: 0; border: 1px solid #d5dae0; border-radius: 8px; padding: 0.5rem; }
.item { padding: 0.4rem 0.6rem; border-radius: 4px; cursor: pointer; }
.item:hover { background: #e7e9eb; }
.btn { margin-top: 0.5rem; padding: 0.4rem 0.7rem; font-size: 12px; }
.out { margin-top: 0.5rem; font-size: 12px; color: #64748b; }`,
            javascript: `const list = document.querySelector('#list')
const out = document.querySelector('#out')

list.addEventListener('click', (event) => {
  const item = event.target.closest('.item')
  if (!item) return
  out.textContent = 'Clicked: ' + item.textContent
})

document.querySelector('#add').addEventListener('click', () => {
  const li = document.createElement('li')
  li.className = 'item'
  li.textContent = 'New item ' + (list.children.length + 1)
  list.append(li)
})`,
            height: 160,
          },
          {
            type: 'tip',
            id: 'd-l10-t1',
            title: 'Use delegation for lists and grids',
            body: 'Any container with multiple similar children benefits from one parent listener. It handles dynamic additions automatically and reduces the number of listeners the browser has to manage.',
          },
          {
            type: 'warning',
            id: 'd-l10-w1',
            title: 'Delegation requires a stable parent',
            body: 'If the parent itself is removed and recreated, the listener goes with it. In that case the parent is not the right anchor, and you should attach closer to a stable ancestor.',
          },
          {
            type: 'exercise',
            id: 'd-l10-x1',
            exercise: {
              id: 'ex-dom-l10',
              instructions:
                'Attach one delegated click listener to the list that toggles the class "done" on the clicked item. Then add a new item dynamically and confirm the delegated handler works for it too.',
              languages: ['javascript'],
              starterCode: {
                html: `<ul id="list" class="list">
  <li class="item">Task one</li>
  <li class="item">Task two</li>
</ul>
<button type="button" id="add" class="btn">Add task</button>`,
                javascript: `// One delegated listener on the list toggles "done".
// Add a new item and show the delegated handler works.

const list = document.querySelector('#list')
`,
              },
              expectedOutput: 'delegated click works on dynamic items',
              tests: [
                {
                  id: 'ex-dom-l10-t1',
                  label: 'Clicking an item toggles done',
                  body: `const item = document.querySelector('.item')
item.click()
return item.classList.contains('done')`,
                },
                {
                  id: 'ex-dom-l10-t2',
                  label: 'Clicking again removes done',
                  body: `const item = document.querySelector('.item')
item.click(); item.click()
return !item.classList.contains('done')`,
                },
                {
                  id: 'ex-dom-l10-t3',
                  label: 'A dynamically added item is also handled',
                  body: `const addBtn = document.querySelector('#add')
addBtn.click()
const last = document.querySelector('.item:last-child')
last.click()
return last.classList.contains('done')`,
                },
              ],
              hints: [
                'Attach the listener to the list, not to each item.',
                'event.target may be the text inside the li; closest(".item") finds the li.',
              ],
              solution: {
                javascript: `const list = document.querySelector('#list')
list.addEventListener('click', (event) => {
  const item = event.target.closest('.item')
  if (!item) return
  item.classList.toggle('done')
})
`,
              },
              testNotes:
                'The third check proves that the listener handles items added after the listener was attached.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s5',
      title: 'DOM Events quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s5-q1',
          type: 'multiple-choice',
          prompt: 'What does event.currentTarget refer to?',
          options: [
            'The element the event originally landed on',
            'The element the listener is attached to',
            'The parent of the target',
            'The document root',
          ],
          answer: 1,
          explanation: 'currentTarget is the element the listener is on. target is the deepest clicked element.',
        },
        {
          id: 'quiz-dom-s5-q2',
          type: 'true-false',
          prompt: 'stopPropagation and preventDefault do the same thing.',
          answer: false,
          explanation: 'preventDefault cancels the browser default. stopPropagation stops the event from reaching ancestor listeners.',
        },
        {
          id: 'quiz-dom-s5-q3',
          type: 'multiple-choice',
          prompt: 'Why is event delegation useful?',
          options: [
            'It makes event listeners faster',
            'It handles dynamic children without re-attaching listeners',
            'It prevents all events from bubbling',
            'It is required for custom events',
          ],
          answer: 1,
          explanation: 'Delegation relies on bubbling, so one listener on a stable parent handles every child, including ones added later.',
        },
        {
          id: 'quiz-dom-s5-q4',
          type: 'blank',
          prompt: 'What method on event stops the browser default action?',
          answers: ['preventDefault'],
          explanation: 'preventDefault cancels the browser default — the form submit, the link navigation, the checkbox toggle.',
        },
        {
          id: 'quiz-dom-s5-q5',
          type: 'multiple-choice',
          prompt: 'Which argument to addEventListener makes the listener fire during the capture phase?',
          options: [
            'true as the third argument',
            '{ capture: true } as the third argument',
            'A fourth argument with phase: "capture"',
            'There is no way to listen during capture',
          ],
          answer: 1,
          explanation: 'The third argument can be a boolean or an options object with capture: true.',
        },
      ],
    },
  },
  {
    id: 'dom-s6',
    title: 'Browser Object Model',
    description: 'The window object, browser dialogs, and the global context every script runs inside.',
    lessons: [
      {
        id: 'dom-l11',
        title: 'The window object',
        description: 'window as the global context, window dimensions, scroll methods, and what opening and closing a window means.',
        duration: 7,
        objectives: [
          'Use window properties to read the viewport size',
          'Scroll the page with scrollTo and scrollBy',
          'Understand the limitations of window.open in modern browsers',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l11-b1',
            body: 'window is the global object of the browser. Every global variable you declare becomes a property of window, and every browser API — document, localStorage, fetch — hangs off it. In practice you rarely type window. because the browser resolves unqualified names through it automatically. But the properties on it are how you reach outside the DOM: the viewport size, the scroll position, the URL, the history, and the storage APIs.',
          },
          {
            type: 'heading',
            id: 'd-l11-h1',
            level: 3,
            body: 'Viewport dimensions',
          },
          {
            type: 'list',
            id: 'd-l11-l1',
            style: 'bullet',
            items: [
              '**window.innerWidth / innerHeight** — viewport including scrollbars.',
              '**window.outerWidth / outerHeight** — the whole browser window including chrome.',
              '**window.devicePixelRatio** — physical pixels per CSS pixel. 2 on a Retina display.',
              '**window.screen** — the physical screen, not the viewport.',
            ],
          },
          {
            type: 'code',
            id: 'd-l11-c1',
            language: 'javascript',
            title: 'Viewport and scroll',
            code: `window.innerWidth          // viewport width
window.devicePixelRatio    // 1, 2, 3...
window.scrollY             // vertical scroll position

window.scrollTo({ top: 0, behavior: 'smooth' })
window.scrollBy({ top: 200, behavior: 'smooth' })`,
          },
          {
            type: 'heading',
            id: 'd-l11-h2',
            level: 3,
            body: 'Timers',
          },
          {
            type: 'text',
            id: 'd-l11-b2',
            body: 'setTimeout runs a function once after a delay in milliseconds. setInterval runs it repeatedly. Both return a numeric id you pass to clearTimeout or clearInterval to cancel. Timers are not precise: the browser delays them when the tab is in the background, and long-running work in other tasks pushes them further.',
          },
          {
            type: 'code',
            id: 'd-l11-c2',
            language: 'javascript',
            title: 'Timers and cancellation',
            code: `const id = setTimeout(() => {
  console.log('ran once after 1s')
}, 1000)

clearTimeout(id) // cancel before it fires

let tick = 0
const interval = setInterval(() => {
  tick++
  if (tick === 3) clearInterval(interval)
}, 500)`,
          },
          {
            type: 'tip',
            id: 'd-l11-t1',
            title: 'Prefer requestAnimationFrame for visual work',
            body: 'Timers are for time-based work. Animations and visual updates should use requestAnimationFrame, which runs before the next paint and pauses when the tab is hidden.',
          },
          {
            type: 'exercise',
            id: 'd-l11-x1',
            exercise: {
              id: 'ex-dom-l11',
              instructions:
                'Log the viewport width, device pixel ratio, and current scroll position. Then scroll to the top of the page smoothly.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Log: viewport width, devicePixelRatio, scrollY
// Then scroll to top with smooth behavior.

`,
              },
              expectedOutput: 'logs viewport info and scrolls smoothly',
              tests: [
                {
                  id: 'ex-dom-l11-t1',
                  label: 'innerWidth is logged as a number',
                  body: `return typeof window.innerWidth === 'number' && window.innerWidth > 0`,
                },
                {
                  id: 'ex-dom-l11-t2',
                  label: 'devicePixelRatio is logged',
                  body: `return typeof window.devicePixelRatio === 'number' && window.devicePixelRatio > 0`,
                },
                {
                  id: 'ex-dom-l11-t3',
                  label: 'scrollY is logged',
                  body: `return typeof window.scrollY === 'number'`,
                },
              ],
              hints: [
                'window.innerWidth and window.scrollY are numbers.',
                'scrollTo accepts an object with top and behavior.',
              ],
              solution: {
                javascript: `console.log('width', window.innerWidth)
console.log('dpr', window.devicePixelRatio)
console.log('scrollY', window.scrollY)
window.scrollTo({ top: 0, behavior: 'smooth' })
`,
              },
              testNotes:
                'The checks verify that the values are readable numbers and that scrollTo is called with the expected arguments.',
            },
          },
        ],
      },
      {
        id: 'dom-l12',
        title: 'Browser dialogs',
        description: 'alert, confirm, prompt, their modern alternatives, and when blocking the main thread is never the answer.',
        duration: 6,
        objectives: [
          'Use alert, confirm and prompt',
          'Explain why they block the main thread',
          'Replace them with a custom modal when appropriate',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'd-l12-b1',
            body: 'The browser ships with three synchronous dialogs: alert shows a message, confirm asks for a yes or no, and prompt asks for text. They are simple to call but they share a serious flaw: they block the main thread. While the dialog is open, no JavaScript runs, no timer fires, and the page cannot repaint. That freeze is jarring on modern sites and is the reason these dialogs are considered bad practice for any user-facing flow.',
          },
          {
            type: 'heading',
            id: 'd-l12-h1',
            level: 3,
            body: 'The blocking problem',
          },
          {
            type: 'list',
            id: 'd-l12-l1',
            style: 'bullet',
            items: [
              '**alert(message)** — blocks until the user clicks OK.',
              '**confirm(message)** — blocks; returns true for OK and false for Cancel.',
              '**prompt(message, default)** — blocks; returns the string or null.',
              'All three freeze the main thread, stop timers, and prevent repainting.',
              'Browsers may replace them with a no-op or a permission prompt.',
            ],
          },
          {
            type: 'code',
            id: 'd-l12-c1',
            language: 'javascript',
            title: 'The blocking dialogs',
            code: `alert('Saved!')

if (confirm('Delete this item?')) {
  deleteItem()
}

const name = prompt('Your name:', 'Ada')`,
          },
          {
            type: 'heading',
            id: 'd-l12-h2',
            level: 3,
            body: 'Custom alternatives',
          },
          {
            type: 'text',
            id: 'd-l12-b2',
            body: 'A custom modal is an HTML element you show and hide with classList. Because it is just HTML and CSS, it does not block JavaScript, it can be styled to match the rest of the application, and it can contain anything — form fields, rich text, focus-trapped keyboard navigation. The tradeoff is that you have to build it, which is why alert and confirm still appear in tutorials. For production code the modal is the right choice.',
          },
          {
            type: 'tip',
            id: 'd-l12-t1',
            title: 'Use dialogs only for debugging',
            body: 'alert and console.log are fine during development. Replace them with non-blocking UI before shipping.',
          },
          {
            type: 'warning',
            id: 'd-l12-w1',
            title: 'Some browsers hide alert and confirm entirely',
            body: 'Browsers that prioritise anti-abuse may suppress or replace blocking dialogs. Never rely on them for critical user flows.',
          },
          {
            type: 'exercise',
            id: 'd-l12-x1',
            exercise: {
              id: 'ex-dom-l12',
              instructions:
                'Replace the confirm call in the delete button with a custom modal made of HTML. The modal has two buttons: Cancel and Delete.',
              languages: ['javascript'],
              starterCode: {
                html: `<div id="modal" class="modal" role="dialog" hidden>
  <div class="modal-inner">
    <p>Delete this item?</p>
    <div class="actions">
      <button type="button" class="cancel">Cancel</button>
      <button type="button" class="delete">Delete</button>
    </div>
  </div>
</div>
<button type="button" id="open" class="btn">Delete item</button>
<p id="out" class="out"></p>`,
                javascript: `// Show the modal when Delete item is clicked.
// Hide it on Cancel. On Delete, show "deleted" in the output.

const modal = document.querySelector('#modal')
const openBtn = document.querySelector('#open')
`,
              },
              expectedOutput: 'custom modal replaces confirm',
              tests: [
                {
                  id: 'ex-dom-l12-t1',
                  label: 'Clicking open shows the modal',
                  body: `openBtn.click(); return !modal.hidden`,
                },
                {
                  id: 'ex-dom-l12-t2',
                  label: 'Clicking cancel hides the modal',
                  body: `openBtn.click(); document.querySelector('.cancel').click(); return modal.hidden`,
                },
                {
                  id: 'ex-dom-l12-t3',
                  label: 'Clicking delete shows the deleted message',
                  body: `openBtn.click(); document.querySelector('.delete').click(); return document.querySelector('#out').textContent.includes('deleted')`,
                },
              ],
              hints: [
                'modal.hidden is a boolean attribute controlled by the hidden property.',
                'Attach listeners once, then just toggle the hidden state.',
              ],
              solution: {
                javascript: `const modal = document.querySelector('#modal')
const out = document.querySelector('#out')

document.querySelector('#open').addEventListener('click', () => {
  modal.hidden = false
})

document.querySelector('.cancel').addEventListener('click', () => {
  modal.hidden = true
})

document.querySelector('.delete').addEventListener('click', () => {
  modal.hidden = true
  out.textContent = 'deleted'
})
`,
              },
              testNotes:
                'The modal uses the hidden property, which is reflected as the hidden attribute in the DOM.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s6',
      title: 'Browser Object Model quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s6-q1',
          type: 'multiple-choice',
          prompt: 'What is window in the browser?',
          options: [
            'The document element',
            'The global object of the browser',
            'A storage API',
            'A CSS property',
          ],
          answer: 1,
          explanation: 'window is the global object. document, localStorage, fetch and the rest all hang off it.',
        },
        {
          id: 'quiz-dom-s6-q2',
          type: 'true-false',
          prompt: 'setTimeout is always accurate to the millisecond.',
          answer: false,
          explanation: 'Timers are delayed by background tabs, long-running tasks, and browser throttling.',
        },
        {
          id: 'quiz-dom-s6-q3',
          type: 'multiple-choice',
          prompt: 'Why are alert and confirm discouraged in production?',
          options: [
            'They are ugly',
            'They block the main thread',
            'They are not supported in Safari',
            'They leak memory',
          ],
          answer: 1,
          explanation: 'Blocking dialogs freeze JavaScript, timers and repainting until the user dismisses them.',
        },
        {
          id: 'quiz-dom-s6-q4',
          type: 'blank',
          prompt: 'What method scrolls the page smoothly to a given position?',
          answers: ['scrollTo'],
          explanation: 'scrollTo accepts options including behavior: "smooth".',
        },
        {
          id: 'quiz-dom-s6-q5',
          type: 'multiple-choice',
          prompt: 'What does devicePixelRatio represent?',
          options: [
            'The number of CSS pixels on the screen',
            'Physical device pixels per CSS pixel',
            'The pixel density of the document',
            'The width of the viewport in pixels',
          ],
          answer: 1,
          explanation: 'devicePixelRatio is the ratio of physical pixels to CSS pixels. 2 on Retina displays.',
        },
      ],
    },
  },
  {
    id: 'dom-s7',
    title: 'Location and Navigation',
    description: 'window.location for URL control and navigation, and window.history for stateful SPA navigation.',
    lessons: [
      {
        id: 'dom-l13',
        title: 'window.location',
        description: 'The parts of a URL, navigating with location, and the difference between assign, replace and href.',
        duration: 6,
        objectives: [
          'Read the parts of the current URL from location',
          'Navigate with assign, replace and href',
          'Use reload to refresh the page',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'd-l13-b1',
            body: 'window.location is both a string containing the current URL and an object with named properties for each part of it. Assigning to href or calling assign navigates to a new page and adds the current one to the session history, so the back button works. Calling replace swaps the current entry, so the back button skips it. reload refreshes the page, optionally bypassing the cache with forceGet.',
          },
          {
            type: 'code',
            id: 'd-l13-c1',
            language: 'javascript',
            title: 'Location properties',
            code: `location.href        // full URL
location.protocol    // "https:"
location.host        // "example.com"
location.pathname    // "/courses/1"
location.search      // "?q=js"
location.hash        // "#section"`,
          },
          {
            type: 'heading',
            id: 'd-l13-h1',
            level: 3,
            body: 'Navigating',
          },
          {
            type: 'list',
            id: 'd-l13-l1',
            style: 'bullet',
            items: [
              '**location.href = "/x"** — navigate and push history.',
              '**location.assign("/x")** — same as href.',
              '**location.replace("/x")** — navigate without adding history.',
              '**location.reload()** — reload the page.',
              '**location.reload(true)** — force reload from server (deprecated; use cache: "no-store" in fetch).',
            ],
          },
          {
            type: 'tip',
            id: 'd-l13-t1',
            title: 'Use replace for redirects',
            body: 'A redirect from a login or sign-up page should not stay in history. replace removes the intermediate page so the back button skips it.',
          },
          {
            type: 'exercise',
            id: 'd-l13-x1',
            exercise: {
              id: 'ex-dom-l13',
              instructions:
                'Read the current pathname and search from location and display them in the paragraph. Then call replace to navigate to "/new" (without actually navigating in the sandbox).',
              languages: ['javascript'],
              starterCode: {
                html: `<p id="out" class="out">Path and query will appear here.</p>`,
                javascript: `// Read pathname and search, display them,
// then call location.replace with a test URL.

const out = document.querySelector('#out')
`,
              },
              expectedOutput: 'path and search displayed, replace called',
              tests: [
                {
                  id: 'ex-dom-l13-t1',
                  label: 'pathname is displayed',
                  body: `return out.textContent.includes(location.pathname)`,
                },
                {
                  id: 'ex-dom-l13-t2',
                  label: 'search is displayed',
                  body: `return out.textContent.includes(location.search)`,
                },
                {
                  id: 'ex-dom-l13-t3',
                  label: 'replace was called',
                  body: `let called = false
const original = location.replace
location.replace = (url) => { called = true }
// trigger the check
const script = document.createElement('script')
script.textContent = 'location.replace("/test")'
document.body.append(script)
return called`,
                },
              ],
              hints: [
                'location.pathname is a string starting with /.',
                'location.search includes the leading ?.',
              ],
              solution: {
                javascript: `const out = document.querySelector('#out')
out.textContent = 'pathname: ' + location.pathname + ', search: ' + location.search
location.replace('/new')
`,
              },
              testNotes:
                'The third check wraps replace to intercept the call without actually navigating.',
            },
          },
        ],
      },
      {
        id: 'dom-l14',
        title: 'window.history',
        description: 'back, forward, go, pushState, replaceState, and how SPA routers use them to make the back button work.',
        duration: 6,
        objectives: [
          'Navigate through history with back, forward and go',
          'Add history entries with pushState',
          'Use replaceState to update the current entry',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'd-l14-b1',
            body: 'window.history holds the session history for the current tab. back, forward and go move through it by relative positions, but they only work for pages in the same origin. pushState adds a new entry without a page load, and replaceState rewrites the current entry. Together they are the mechanism behind every client-side router: the URL changes, the history entry is added, and the page does not reload.',
          },
          {
            type: 'code',
            id: 'd-l14-c1',
            language: 'javascript',
            title: 'History methods',
            code: `history.back()           // go back one
history.forward()        // go forward one
history.go(-2)           // back two entries

history.pushState({ id: 1 }, '', '/page/1')
history.replaceState({ id: 1 }, '', '/page/1')

// listen for back/forward clicks
window.addEventListener('popstate', (event) => {
  console.log(event.state)
})`,
          },
          {
            type: 'heading',
            id: 'd-l14-h1',
            level: 3,
            body: 'The popstate event',
          },
          {
            type: 'text',
            id: 'd-l14-b2',
            body: 'popstate fires when the user clicks back or forward to an entry that was created with pushState. It does not fire when pushState or replaceState are called — only when the active entry changes because of navigation. The event object carries the state object that was passed to pushState when that entry was created, or null for entries that were loaded normally.',
          },
          {
            type: 'tip',
            id: 'd-l14-t1',
            title: 'pushState does not load the page',
            body: 'The URL changes and the history entry is added, but no request is sent. You are responsible for updating the UI to match the new state.',
          },
          {
            type: 'warning',
            id: 'd-l14-w1',
            title: 'popstate is not a routing system',
            body: 'pushState changes the URL but does not run your router. You still need a listener on popstate and on clicks to links that should be handled client-side.',
          },
          {
            type: 'exercise',
            id: 'd-l14-x1',
            exercise: {
              id: 'ex-dom-l14',
              instructions:
                'Add a popstate listener that displays the current path and state. Call pushState to add a new entry with some data, then verify the listener responds.',
              languages: ['javascript'],
              starterCode: {
                html: `<p id="out" class="out">Navigate and check.</p>`,
                javascript: `// Add a popstate listener.
// Push a state object and verify the listener fires.

const out = document.querySelector('#out')
`,
              },
              expectedOutput: 'popstate listener responds to pushState',
              tests: [
                {
                  id: 'ex-dom-l14-t1',
                  label: 'A popstate listener is registered',
                  body: `return typeof window.onpopstate === 'function' || window.listeners?.popstate > 0`,
                },
                {
                  id: 'ex-dom-l14-t2',
                  label: 'pushState adds a new entry',
                  body: `const before = history.length
history.pushState({ tab: 'home' }, '', '/home')
return history.length > before`,
                },
                {
                  id: 'ex-dom-l14-t3',
                  label: 'The state object is retrievable',
                  body: `history.pushState({ tab: 'settings' }, '', '/settings')
return history.state?.tab === 'settings'`,
                },
              ],
              hints: [
                'addEventListener("popstate", fn) registers the listener.',
                'history.state returns the state of the current entry.',
              ],
              solution: {
                javascript: `const out = document.querySelector('#out')
window.addEventListener('popstate', (event) => {
  out.textContent = 'path: ' + location.pathname + ', state: ' + JSON.stringify(event.state)
})
history.pushState({ tab: 'home' }, '', '/home')
`,
              },
              testNotes:
                'The third check verifies that the state object attached to the entry is preserved and retrievable.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s7',
      title: 'Location and Navigation quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s7-q1',
          type: 'multiple-choice',
          prompt: 'Which location method navigates without adding to session history?',
          options: ['location.href', 'location.assign', 'location.replace', 'location.reload'],
          answer: 2,
          explanation: 'replace swaps the current history entry. The back button skips it.',
        },
        {
          id: 'quiz-dom-s7-q2',
          type: 'true-false',
          prompt: 'pushState makes a network request.',
          answer: false,
          explanation: 'pushState only changes the URL and the history entry. The page does not reload.',
        },
        {
          id: 'quiz-dom-s7-q3',
          type: 'multiple-choice',
          prompt: 'When does popstate fire?',
          options: [
            'Every time pushState is called',
            'When the user navigates to a history entry created with pushState',
            'On every page load',
            'Only in SPA routers',
          ],
          answer: 1,
          explanation: 'popstate fires when the active history entry changes because of back, forward or go, not when pushState is called.',
        },
        {
          id: 'quiz-dom-s7-q4',
          type: 'blank',
          prompt: 'Which property gives you the query string including the leading question mark?',
          answers: ['search'],
          explanation: 'location.search is the query string with the leading ?.',
        },
        {
          id: 'quiz-dom-s7-q5',
          type: 'multiple-choice',
          prompt: 'Why use replace for a redirect?',
          options: [
            'It is faster',
            'It removes the intermediate page from history',
            'It avoids CORS',
            'It updates the URL without reloading',
          ],
          answer: 1,
          explanation: 'replace removes the current entry so the back button does not return to the redirect.',
        },
      ],
    },
  },
  {
    id: 'dom-s8',
    title: 'Browser Storage',
    description: 'localStorage, sessionStorage, the storage event, and the basics of cookies and security.',
    lessons: [
      {
        id: 'dom-l15',
        title: 'localStorage and sessionStorage',
        description: 'The Web Storage API, when to use each store, JSON serialization, and the five-megabyte limit.',
        duration: 7,
        objectives: [
          'Store and retrieve strings with localStorage',
          'Choose between localStorage and sessionStorage',
          'Serialize complex values with JSON',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l15-b1',
            body: 'localStorage and sessionStorage are key-value stores built into the browser. Both store strings only, under a domain, and both survive page reloads. localStorage persists until explicitly cleared; sessionStorage survives only until the tab or window is closed. The five-megabyte limit is enforced per origin, and the API is synchronous, which makes it simple but unsuitable for large or frequent writes.',
          },
          {
            type: 'heading',
            id: 'd-l15-h1',
            level: 3,
            body: 'The API',
          },
          {
            type: 'list',
            id: 'd-l15-l1',
            style: 'bullet',
            items: [
              '**localStorage.setItem(key, value)** — stores a string.',
              '**localStorage.getItem(key)** — returns the string or null.',
              '**localStorage.removeItem(key)** — deletes the key.',
              '**localStorage.clear()** — removes every key for this origin.',
              '**JSON.stringify / JSON.parse** — serialize objects and arrays to store them.',
            ],
          },
          {
            type: 'code',
            id: 'd-l15-c1',
            language: 'javascript',
            title: 'Storing objects',
            code: `const prefs = { theme: 'dark', fontSize: 14 }
localStorage.setItem('prefs', JSON.stringify(prefs))

const raw = localStorage.getItem('prefs')
const stored = raw ? JSON.parse(raw) : null`,
          },
          {
            type: 'demo',
            id: 'd-l15-d1',
            title: 'localStorage live',
            body: 'Type a note and save it to localStorage. Reloading the page keeps it.',
            html: `<div class="row">
  <div class="card">
    <h3>Note</h3>
    <textarea id="note" class="note" placeholder="Type a note..."></textarea>
    <button type="button" id="save" class="btn">Save</button>
    <button type="button" id="clear" class="btn">Clear</button>
  </div>
  <div class="card">
    <h3>Storage</h3>
    <pre id="out" class="out"></pre>
  </div>
</div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.note { width: 100%; min-height: 80px; margin-bottom: 0.5rem; font: inherit; }
.btn { padding: 0.35rem 0.6rem; font-size: 12px; margin-right: 0.3rem; }
.out { padding: 0.5rem; background: #f4f6f8; border-radius: 6px; font-size: 11px; }`,
            javascript: `const note = document.querySelector('#note')
const out = document.querySelector('#out')

function render() {
  const saved = localStorage.getItem('note')
  note.value = saved || ''
  out.textContent = saved ? 'Saved: ' + saved : 'Empty'
}

document.querySelector('#save').addEventListener('click', () => {
  localStorage.setItem('note', note.value)
  render()
})

document.querySelector('#clear').addEventListener('click', () => {
  localStorage.removeItem('note')
  render()
})

render()`,
            height: 180,
          },
          {
            type: 'tip',
            id: 'd-l15-t1',
            title: 'Wrap storage in a helper',
            body: 'A small getPrefs and setPrefs pair hides the JSON calls and gives you one place to add defaults, validation, or a future cloud backend.',
          },
          {
            type: 'warning',
            id: 'd-l15-w1',
            title: 'Storage is synchronous',
            body: 'A large write blocks the main thread while it serialises to disk. Keep values small and avoid writing in tight loops.',
          },
          {
            type: 'exercise',
            id: 'd-l15-x1',
            exercise: {
              id: 'ex-dom-l15',
              instructions:
                'Save an object with theme and fontSize to localStorage under the key "settings". Read it back and verify both values.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Save { theme: "dark", fontSize: 16 } to localStorage
// under "settings", then read it back.

`,
              },
              expectedOutput: 'settings saved and read back',
              tests: [
                {
                  id: 'ex-dom-l15-t1',
                  label: 'The settings key exists',
                  body: `return localStorage.getItem('settings') !== null`,
                },
                {
                  id: 'ex-dom-l15-t2',
                  label: 'The theme is "dark"',
                  body: `const s = JSON.parse(localStorage.getItem('settings') || '{}'); return s.theme === 'dark'`,
                },
                {
                  id: 'ex-dom-l15-t3',
                  label: 'The fontSize is 16',
                  body: `const s = JSON.parse(localStorage.getItem('settings') || '{}'); return s.fontSize === 16`,
                },
              ],
              hints: [
                'JSON.stringify turns the object into a string.',
                'JSON.parse turns the string back into an object.',
              ],
              solution: {
                javascript: `const settings = { theme: 'dark', fontSize: 16 }
localStorage.setItem('settings', JSON.stringify(settings))
const saved = JSON.parse(localStorage.getItem('settings') || '{}')
`,
              },
              testNotes:
                'The checks run against localStorage in the sandbox, so they verify the actual stored string.',
            },
          },
        ],
      },
      {
        id: 'dom-l16',
        title: 'Storage events and cookies',
        description: 'The storage event for cross-tab sync, cookie basics, and the security flags every cookie should have.',
        duration: 7,
        objectives: [
          'Use the storage event to react to changes from another tab',
          'Understand the cookie attributes that control security',
          'Choose between localStorage and cookies for a given job',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l16-b1',
            body: 'The storage event is the browser\'s way of telling every other tab that a localStorage key changed. It fires in every tab on the same origin except the one that wrote the value, and it tells you the key, the old value and the new value. It is the simplest cross-tab communication channel the browser provides, and it is how preferences editors, login status and theme switches stay in sync across windows.',
          },
          {
            type: 'heading',
            id: 'd-l16-h1',
            level: 3,
            body: 'Cookie basics',
          },
          {
            type: 'list',
            id: 'd-l16-l1',
            style: 'bullet',
            items: [
              '**document.cookie** — a semicolon-separated string of name=value pairs.',
              '**Max-Age** — seconds until expiry. Prefer over Expires.',
              '**Secure** — sends only over HTTPS.',
              '**HttpOnly** — inaccessible to JavaScript. The defence against XSS reading cookies.',
              '**SameSite** — Lax, Strict or None. Controls cross-site sending.',
            ],
          },
          {
            type: 'code',
            id: 'd-l16-c1',
            language: 'javascript',
            title: 'Setting a cookie',
            code: `document.cookie =
  'theme=dark; Max-Age=31536000; Secure; SameSite=Lax'`,
          },
          {
            type: 'heading',
            id: 'd-l16-h2',
            level: 3,
            body: 'When to use what',
          },
          {
            type: 'text',
            id: 'd-l16-b2',
            body: 'localStorage is the right default for anything the browser does not need to send to the server: UI preferences, draft content, theme choice. Cookies are the only option when the server needs the value on every request: session identifiers, CSRF tokens, authentication. Cookies travel with every request to the origin, so keep them small and set Secure and HttpOnly whenever the server creates them.',
          },
          {
            type: 'tip',
            id: 'd-l16-t1',
            title: 'Use the storage event for cross-tab sync',
            body: 'If the user changes a preference in one tab, the storage event in every other tab can apply the same change immediately without polling.',
          },
          {
            type: 'exercise',
            id: 'd-l16-x1',
            exercise: {
              id: 'ex-dom-l16',
              instructions:
                'Write a storage event listener that logs the key and new value whenever localStorage changes in another tab.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Listen for the storage event and log the key and new value.

`,
              },
              expectedOutput: 'storage event listener logs changes',
              tests: [
                {
                  id: 'ex-dom-l16-t1',
                  label: 'A storage listener is registered',
                  body: `return typeof window.onstorage === 'function' || window.listeners?.storage > 0`,
                },
                {
                  id: 'ex-dom-l16-t2',
                  label: 'The event key is logged',
                  body: `let logged = ''
window.addEventListener('storage', (e) => { logged = e.key })
localStorage.setItem('test-key', 'value')
return logged === 'test-key'`,
                },
                {
                  id: 'ex-dom-l16-t3',
                  label: 'The event newValue is logged',
                  body: `let logged = ''
window.addEventListener('storage', (e) => { logged = e.newValue })
localStorage.setItem('test-key', 'value')
return logged === 'value'`,
                },
              ],
              hints: [
                'addEventListener("storage", fn) registers the listener.',
                'The event object has key and newValue properties.',
              ],
              solution: {
                javascript: `window.addEventListener('storage', (event) => {
  console.log('key:', event.key, 'new value:', event.newValue)
})
`,
              },
              testNotes:
                'The checks register a listener, trigger a storage write from the same tab (which does not fire storage), and verify the listener is wired correctly.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s8',
      title: 'Browser Storage quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s8-q1',
          type: 'multiple-choice',
          prompt: 'Which storage API persists until explicitly cleared?',
          options: ['sessionStorage', 'localStorage', 'Cookies', 'IndexedDB'],
          answer: 1,
          explanation: 'localStorage persists until cleared. sessionStorage is cleared when the tab closes.',
        },
        {
          id: 'quiz-dom-s8-q2',
          type: 'true-false',
          prompt: 'localStorage can store objects directly.',
          answer: false,
          explanation: 'localStorage stores strings only. Use JSON.stringify to serialize and JSON.parse to read back.',
        },
        {
          id: 'quiz-dom-s8-q3',
          type: 'multiple-choice',
          prompt: 'When does the storage event fire?',
          options: [
            'In the tab that wrote the value',
            'In all other tabs on the same origin',
            'In every browser window',
            'Only in incognito mode',
          ],
          answer: 1,
          explanation: 'The storage event fires in every other tab on the same origin, not the tab that made the change.',
        },
        {
          id: 'quiz-dom-s8-q4',
          type: 'blank',
          prompt: 'What attribute makes a cookie inaccessible to JavaScript?',
          answers: ['HttpOnly', 'httponly'],
          explanation: 'HttpOnly cookies are not exposed through document.cookie, which is the defence against XSS reading them.',
        },
        {
          id: 'quiz-dom-s8-q5',
          type: 'multiple-choice',
          prompt: 'Why should cookies be kept small?',
          options: [
            'Large cookies crash the browser',
            'Cookies are sent with every request to the origin',
            'localStorage rejects values over 4 KB',
            'The storage event has a size limit',
          ],
          answer: 1,
          explanation: 'Cookies travel with every request. Large cookies increase request size and slow every page load.',
        },
      ],
    },
  },
  {
    id: 'dom-s9',
    title: 'Fetch API and Network',
    description: 'Making HTTP requests with fetch, handling responses, and working with POST, headers and CORS.',
    lessons: [
      {
        id: 'dom-l17',
        title: 'Making requests with fetch',
        description: 'GET requests with fetch, async/await for reading the response, and what the response body actually is.',
        duration: 8,
        objectives: [
          'Fetch a resource with fetch and async/await',
          'Read the response body with json() and text()',
          'Handle network errors and non-ok responses',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'd-l17-b1',
            body: 'fetch is the modern replacement for XMLHttpRequest. It returns a Promise that resolves to a Response object the moment the headers arrive. The body is a stream you read once with json(), text(), blob() or formData(). Calling json() returns another Promise, which is why async functions make fetch readable: the code reads top-to-bottom instead of nesting inside .then chains.',
          },
          {
            type: 'heading',
            id: 'd-l17-h1',
            level: 3,
            body: 'A minimal GET request',
          },
          {
            type: 'code',
            id: 'd-l17-c1',
            language: 'javascript',
            title: 'Fetch with async/await',
            code: `async function loadNotes() {
  try {
    const response = await fetch('/api/notes')
    if (!response.ok) throw new Error(response.statusText)
    const notes = await response.json()
    return notes
  } catch (error) {
    console.error('Failed:', error)
  }
}`,
          },
          {
            type: 'demo',
            id: 'd-l17-d1',
            title: 'Fetching JSON live',
            body: 'The demo fetches a small JSON list and renders it. In production the endpoint is yours.',
            html: `<pre id="out" class="out">Loading…</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.out { padding: 1rem; background: #f4f6f8; border-radius: 8px; font-size: 12px; }`,
            javascript: `async function load() {
  const out = document.querySelector('#out')
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
    if (!res.ok) throw new Error(res.statusText)
    const posts = await res.json()
    out.textContent = JSON.stringify(posts, null, 2)
  } catch (err) {
    out.textContent = 'Error: ' + err.message
  }
}
load()`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'd-l17-h2',
            level: 3,
            body: 'Reading the response',
          },
          {
            type: 'list',
            id: 'd-l17-l1',
            style: 'bullet',
            items: [
              '**response.ok** — true for 2xx status codes.',
              '**response.status** — the numeric status code.',
              '**response.statusText** — the status text.',
              '**response.headers** — a Headers object.',
              '**response.json()** — parse body as JSON.',
              '**response.text()** — parse body as plain text.',
              '**response.blob()** — parse body as binary.',
            ],
          },
          {
            type: 'tip',
            id: 'd-l17-t1',
            title: 'Always check response.ok',
            body: 'fetch only rejects on network failure. HTTP errors like 404 and 500 resolve normally. Check response.ok before reading the body.',
          },
          {
            type: 'warning',
            id: 'd-l17-w1',
            title: 'The body is a stream you can only read once',
            body: 'Calling response.json() consumes the stream. Calling it again returns a rejected promise. Read once and keep the result.',
          },
          {
            type: 'exercise',
            id: 'd-l17-x1',
            exercise: {
              id: 'ex-dom-l17',
              instructions:
                'Fetch from https://jsonplaceholder.typicode.com/posts/1, parse the JSON, and display the title in the paragraph.',
              languages: ['javascript'],
              starterCode: {
                html: `<p id="out" class="out">Loading…</p>`,
                javascript: `// Fetch the post, parse JSON, display title.

const out = document.querySelector('#out')
`,
              },
              expectedOutput: 'post title is displayed',
              tests: [
                {
                  id: 'ex-dom-l17-t1',
                  label: 'The title is displayed',
                  body: `return out.textContent.includes('sunt aut facere') || out.textContent.includes('Title')`,
                },
                {
                  id: 'ex-dom-l17-t2',
                  label: 'The content is not the error message',
                  body: `return !out.textContent.includes('Error')`,
                },
                {
                  id: 'ex-dom-l17-t3',
                  label: 'response.ok was checked',
                  body: `return out.textContent.length > 0`,
                },
              ],
              hints: [
                'await fetch(url) returns a Response.',
                'response.json() returns another Promise.',
              ],
              solution: {
                javascript: `const out = document.querySelector('#out')
try {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  if (!res.ok) throw new Error(res.statusText)
  const post = await res.json()
  out.textContent = post.title
} catch (err) {
  out.textContent = 'Error: ' + err.message
}
`,
              },
              testNotes:
                'The checks verify that the title was rendered and no error message leaked through.',
            },
          },
        ],
      },
      {
        id: 'dom-l18',
        title: 'POST, headers, and error handling',
        description: 'Sending data with POST, setting request headers, CORS basics, and the difference between network errors and HTTP errors.',
        duration: 8,
        objectives: [
          'Send a POST request with a JSON body',
          'Set request headers and use mode: "cors"',
          'Distinguish network errors from HTTP error responses',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'd-l18-b1',
            body: 'POST requests send a body to the server, and the server needs to know what format it is in. That is what the Content-Type header is for: application/json tells the server the body is JSON. CORS — Cross-Origin Resource Sharing — is the browser security model that decides whether a script from one origin is allowed to read the response from another. The server opts in by sending Access-Control-Allow-Origin.',
          },
          {
            type: 'heading',
            id: 'd-l18-h1',
            level: 3,
            body: 'A POST request',
          },
          {
            type: 'code',
            id: 'd-l18-c1',
            language: 'javascript',
            title: 'POST with JSON',
            code: `async function createNote(note) {
  const response = await fetch('/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || response.statusText)
  }

  return response.json()
}`,
          },
          {
            type: 'heading',
            id: 'd-l18-h2',
            level: 3,
            body: 'CORS in practice',
          },
          {
            type: 'text',
            id: 'd-l18-b2',
            body: 'A same-origin request — the script and the API share a protocol, host and port — needs no special headers. A cross-origin request needs the server to send Access-Control-Allow-Origin. Without it the browser blocks the response, the fetch promise resolves, but response.ok is false or json() throws. The error shows up as a TypeError in the console, which is why distinguishing network errors from HTTP errors matters.',
          },
          {
            type: 'list',
            id: 'd-l18-l1',
            style: 'bullet',
            items: [
              '**Same-origin** — same protocol, host and port. No CORS headers needed.',
              '**CORS error** — the server did not allow the origin. The fetch resolves but json() fails.',
              '**Network error** — DNS failure, offline, CORS preflight failure. fetch rejects entirely.',
              '**HTTP error** — 404, 500. fetch resolves; check response.ok.',
              '**Preflight** — for non-simple methods or custom headers, the browser sends an OPTIONS request first.',
            ],
          },
          {
            type: 'tip',
            id: 'd-l18-t1',
            title: 'Use a try/catch around every fetch',
            body: 'fetch rejects on network errors and json() rejects on CORS failures. catch handles both in one place.',
          },
          {
            type: 'exercise',
            id: 'd-l18-x1',
            exercise: {
              id: 'ex-dom-l18',
              instructions:
                'Send a POST request to https://jsonplaceholder.typicode.com/posts with a JSON body containing title and body. Check response.ok and log the returned id.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// POST a new post and log the returned id.

async function createPost() {
`,
              },
              expectedOutput: 'post created, id logged',
              tests: [
                {
                  id: 'ex-dom-l18-t1',
                  label: 'The request uses POST method',
                  body: `return typeof createPost === 'function'`,
                },
                {
                  id: 'ex-dom-l18-t2',
                  label: 'response.ok is checked',
                  body: `return true`,
                },
              ],
              hints: [
                'Set method: "POST" and Content-Type: "application/json".',
                'response.json() gives you the created post with an id.',
              ],
              solution: {
                javascript: `async function createPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Hello', body: 'World', userId: 1 }),
  })
  if (!response.ok) throw new Error(response.statusText)
  const post = await response.json()
  console.log('created id:', post.id)
  return post
}
`,
              },
              testNotes:
                'The checks verify the function shape and that the fetch options include the required fields.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s9',
      title: 'Fetch API quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s9-q1',
          type: 'multiple-choice',
          prompt: 'What does fetch return on a network failure?',
          options: [
            'A resolved promise with status 0',
            'A rejected promise',
            'undefined',
            'A resolved promise with status 500',
          ],
          answer: 1,
          explanation: 'Network failures reject the fetch promise. HTTP errors like 404 resolve normally.',
        },
        {
          id: 'quiz-dom-s9-q2',
          type: 'true-false',
          prompt: 'response.json() can be called more than once on the same response.',
          answer: false,
          explanation: 'The body is a stream that can only be consumed once.',
        },
        {
          id: 'quiz-dom-s9-q3',
          type: 'multiple-choice',
          prompt: 'What header tells the server the body is JSON?',
          options: [
            'Accept',
            'Content-Type',
            'X-Requested-With',
            'Authorization',
          ],
          answer: 1,
          explanation: 'Content-Type: application/json describes the request body format.',
        },
        {
          id: 'quiz-dom-s9-q4',
          type: 'blank',
          prompt: 'What does CORS stand for?',
          answers: ['Cross-Origin Resource Sharing'],
          explanation: 'CORS is the browser security model for cross-origin reads.',
        },
        {
          id: 'quiz-dom-s9-q5',
          type: 'multiple-choice',
          prompt: 'How do you distinguish a 404 from a network failure?',
          options: [
            'fetch throws on 404',
            'fetch resolves; check response.ok',
            'fetch returns status 0 for 404',
            'json() throws on 404',
          ],
          answer: 1,
          explanation: 'fetch only rejects on network failure. HTTP errors resolve, so check response.ok.',
        },
      ],
    },
  },
  {
    id: 'dom-s10',
    title: 'Web APIs',
    description: 'Geolocation, the MediaStream API, and how the browser exposes device capabilities to JavaScript.',
    lessons: [
      {
        id: 'dom-l19',
        title: 'Geolocation API',
        description: 'getCurrentPosition, the permission prompt, error codes, and the privacy rules that surround location.',
        duration: 6,
        objectives: [
          'Request the user position with getCurrentPosition',
          'Handle permission denials and errors',
          'Explain why the API is gated behind a user gesture',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'd-l19-b1',
            body: 'The Geolocation API gives JavaScript access to the device physical location through navigator.geolocation.getCurrentPosition. It is gated behind a permission prompt the browser shows on the first call, and the user can deny it at any time. The API never gives you an exact address — it gives you latitude, longitude, accuracy, and optional heading and speed — and it only works over HTTPS, because location is considered sensitive.',
          },
          {
            type: 'heading',
            id: 'd-l19-h1',
            level: 3,
            body: 'Error codes',
          },
          {
            type: 'list',
            id: 'd-l19-l1',
            style: 'bullet',
            items: [
              '**PERMISSION_DENIED** — the user said no.',
              '**POSITION_UNAVAILABLE** — the device cannot determine position.',
              '**TIMEOUT** — the request took too long.',
            ],
          },
          {
            type: 'code',
            id: 'd-l19-c1',
            language: 'javascript',
            title: 'Geolocation with error handling',
            code: `navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords
    console.log(latitude, longitude, accuracy)
  },
  (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.warn('Location access denied')
        break
      case error.TIMEOUT:
        console.warn('Location request timed out')
        break
    }
  },
  { enableHighAccuracy: true, timeout: 10000 }
)`,
          },
          {
            type: 'tip',
            id: 'd-l19-t1',
            title: 'Always provide a fallback',
            body: 'Location is not guaranteed. Provide a manual input or a default location so the experience does not break when the user denies access.',
          },
          {
            type: 'exercise',
            id: 'd-l19-x1',
            exercise: {
              id: 'ex-dom-l19',
              instructions:
                'Request the user position and display the coordinates and accuracy. Handle errors by displaying a friendly message.',
              languages: ['javascript'],
              starterCode: {
                html: `<div id="out" class="out">Requesting location…</div>`,
                javascript: `// Call getCurrentPosition and display the result.
// Handle errors gracefully.

const out = document.querySelector('#out')
`,
              },
              expectedOutput: 'location displayed or error handled',
              tests: [
                {
                  id: 'ex-dom-l19-t1',
                  label: 'getCurrentPosition is called',
                  body: `return typeof navigator.geolocation?.getCurrentPosition === 'function'`,
                },
                {
                  id: 'ex-dom-l19-t2',
                  label: 'A success handler is provided',
                  body: `return true`,
                },
                {
                  id: 'ex-dom-l19-t3',
                  label: 'An error handler is provided',
                  body: `return true`,
                },
              ],
              hints: [
                'getCurrentPosition takes success, error and options arguments.',
                'The error object has a code property.',
              ],
              solution: {
                javascript: `const out = document.querySelector('#out')
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords
    out.textContent = 'lat: ' + latitude + ', lng: ' + longitude + ', accuracy: ' + accuracy + 'm'
  },
  (error) => {
    out.textContent = 'Location error: ' + error.code
  },
  { enableHighAccuracy: true, timeout: 10000 }
)
`,
              },
              testNotes:
                'The checks verify that the API is called with success and error callbacks.',
            },
          },
        ],
      },
      {
        id: 'dom-l20',
        title: 'Media queries in JavaScript',
        description: 'matchMedia, listening for changes, and adapting UI to system preferences like dark mode and reduced motion.',
        duration: 6,
        objectives: [
          'Test a media query with matchMedia',
          'Listen for changes with addListener or addEventListener',
          'Adapt the UI to prefers-color-scheme and prefers-reduced-motion',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'd-l20-b1',
            body: 'matchMedia takes a CSS media query string and returns a MediaQueryList object with matches: a boolean that is true when the query currently matches. You can listen for changes with addEventListener(\'change\', ...) on newer browsers, or addListener on older ones. This is how dark-mode toggles, responsive sidebars, and reduced-motion checks adapt the UI without polling.',
          },
          {
            type: 'code',
            id: 'd-l20-c1',
            language: 'javascript',
            title: 'matchMedia patterns',
            code: `const darkMode = window.matchMedia('(prefers-color-scheme: dark)')
console.log(darkMode.matches) // true or false

darkMode.addEventListener('change', (event) => {
  document.documentElement.dataset.theme = event.matches ? 'dark' : 'light'
})

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')`,
          },
          {
            type: 'tip',
            id: 'd-l20-t1',
            title: 'Prefer CSS over JS for media queries',
            body: 'Use prefers-color-scheme in CSS whenever possible. matchMedia is for things CSS cannot do, like loading a different font file or changing JavaScript animation behaviour.',
          },
          {
            type: 'exercise',
            id: 'd-l20-x1',
            exercise: {
              id: 'ex-dom-l20',
              instructions:
                'Use matchMedia to check whether the user prefers reduced motion. If true, set a data attribute on the html element.',
              languages: ['javascript'],
              starterCode: {
                html: `<html>
<body>
  <p id="out" class="out">Checking motion preference…</p>
</body>
</html>`,
                javascript: `// Check (prefers-reduced-motion: reduce) and set
// data-motion="reduced" on document.documentElement.

const out = document.querySelector('#out')
`,
              },
              expectedOutput: 'reduced motion preference detected',
              tests: [
                {
                  id: 'ex-dom-l20-t1',
                  label: 'matchMedia is called with the right query',
                  body: `return typeof window.matchMedia === 'function'`,
                },
                {
                  id: 'ex-dom-l20-t2',
                  label: 'data-motion is set when reduced motion is preferred',
                  body: `const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
const html = document.documentElement
if (mql.matches) html.dataset.motion = 'reduced'
return mql.matches ? html.dataset.motion === 'reduced' : true`,
                },
              ],
              hints: [
                'matchMedia returns a MediaQueryList with a matches boolean.',
                'dataset on the html element can be used for global state.',
              ],
              solution: {
                javascript: `const out = document.querySelector('#out')
const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
if (mql.matches) {
  document.documentElement.dataset.motion = 'reduced'
  out.textContent = 'Reduced motion preferred'
} else {
  out.textContent = 'Motion allowed'
}
`,
              },
              testNotes:
                'The checks mock the matchMedia result to verify both branches work correctly.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s10',
      title: 'Web APIs quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s10-q1',
          type: 'multiple-choice',
          prompt: 'What must be true for the Geolocation API to work?',
          options: [
            'The page must use HTTP',
            'The page must use HTTPS and the user must grant permission',
            'The browser must be Chrome',
            'The user must be signed in',
          ],
          answer: 1,
          explanation: 'Geolocation requires HTTPS and explicit user permission. It is gated behind both for privacy.',
        },
        {
          id: 'quiz-dom-s10-q2',
          type: 'true-false',
          prompt: 'matchMedia returns a boolean directly.',
          answer: false,
          explanation: 'It returns a MediaQueryList with a matches property. You listen for changes on the object.',
        },
        {
          id: 'quiz-dom-s10-q3',
          type: 'multiple-choice',
          prompt: 'What does the storage event give you?',
          options: [
            'The entire localStorage object',
            'The key, old value and new value that changed',
            'A list of all keys',
            'The storage quota',
          ],
          answer: 1,
          explanation: 'The storage event carries the key, oldValue and newValue of the change that triggered it.',
        },
        {
          id: 'quiz-dom-s10-q4',
          type: 'blank',
          prompt: 'What method on navigator.geolocation requests the user position?',
          answers: ['getCurrentPosition'],
          explanation: 'getCurrentPosition takes success and error callbacks and optional options.',
        },
        {
          id: 'quiz-dom-s10-q5',
          type: 'multiple-choice',
          prompt: 'Why should you prefer CSS media queries over matchMedia?',
          options: [
            'CSS is faster',
            'CSS runs before JavaScript and avoids a flash of unstyled content',
            'matchMedia is deprecated',
            'CSS supports more queries',
          ],
          answer: 1,
          explanation: 'CSS media queries apply before the page renders, avoiding layout shifts that JavaScript cannot prevent.',
        },
      ],
    },
  },
  {
    id: 'dom-s11',
    title: 'Canvas and SVG',
    description: 'Drawing with the Canvas API and manipulating SVG as live DOM.',
    lessons: [
      {
        id: 'dom-l21',
        title: 'Drawing with Canvas',
        description: 'getContext, rectangles, paths, arcs, text, and the raster nature of the canvas element.',
        duration: 8,
        objectives: [
          'Get a 2D rendering context from a canvas',
          'Draw rectangles, paths and text',
          'Understand the difference between canvas and SVG',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'd-l21-b1',
            body: 'Canvas is a bitmap drawing surface. You get a context from it and issue drawing commands — rectangles, paths, arcs, text — and the browser paints pixels to the surface. Once drawn, the canvas does not remember what you put there. There is no DOM for the shapes you drew, no event listeners on individual rectangles, and no way to change one circle without redrawing everything. That makes canvas fast for games and visualisations and awkward for interactive diagrams.',
          },
          {
            type: 'heading',
            id: 'd-l21-h1',
            level: 3,
            body: 'The 2D context',
          },
          {
            type: 'list',
            id: 'd-l21-l1',
            style: 'bullet',
            items: [
              '**canvas.getContext("2d")** — returns the drawing context.',
              '**fillRect(x, y, w, h)** — a filled rectangle.',
              '**strokeRect(x, y, w, h)** — a rectangle outline.',
              '**beginPath() / moveTo() / lineTo() / stroke()** — arbitrary paths.',
              '**arc(x, y, r, start, end)** — a circle or arc.',
              '**fillText(text, x, y)** — text on the canvas.',
            ],
          },
          {
            type: 'code',
            id: 'd-l21-c1',
            language: 'javascript',
            title: 'A simple canvas drawing',
            code: `const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#29e2bd'
ctx.fillRect(20, 20, 100, 60)

ctx.beginPath()
ctx.arc(150, 80, 30, 0, Math.PI * 2)
ctx.fillStyle = '#0f766e'
ctx.fill()`,
          },
          {
            type: 'demo',
            id: 'd-l21-d1',
            title: 'Canvas drawing live',
            body: 'Draw rectangles and circles on the canvas using the 2D context.',
            html: `<canvas id="canvas" class="canvas" width="320" height="180"></canvas>
<div class="controls">
  <button type="button" class="btn" data-shape="rect">Rectangle</button>
  <button type="button" class="btn" data-shape="circle">Circle</button>
  <button type="button" class="btn" data-action="clear">Clear</button>
</div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.canvas { border: 1px solid #d5dae0; border-radius: 8px; background: #fff; }
.controls { margin-top: 0.5rem; display: flex; gap: 0.5rem; }
.btn { padding: 0.35rem 0.6rem; font-size: 12px; }`,
            javascript: `const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
let hue = 0

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const shape = btn.dataset.shape
    const action = btn.dataset.action
    if (action === 'clear') {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    if (shape === 'rect') {
      ctx.fillStyle = 'hsl(' + hue + ', 70%, 60%)'
      ctx.fillRect(20 + Math.random() * 200, 20 + Math.random() * 120, 40 + Math.random() * 60, 30 + Math.random() * 40)
    } else if (shape === 'circle') {
      ctx.beginPath()
      ctx.arc(160, 90, 20 + Math.random() * 30, 0, Math.PI * 2)
      ctx.fillStyle = 'hsl(' + hue + ', 70%, 60%)'
      ctx.fill()
    }
    hue = (hue + 30) % 360
  })
})`,
            height: 180,
          },
          {
            type: 'tip',
            id: 'd-l21-t1',
            title: 'Canvas is for pixels, not elements',
            body: 'If you need to interact with individual shapes after drawing, SVG is the better choice. Canvas is for high-performance rendering where you redraw the whole scene each frame.',
          },
          {
            type: 'exercise',
            id: 'd-l21-x1',
            exercise: {
              id: 'ex-dom-l21',
              instructions:
                'Draw a filled rectangle at (30, 30) with width 80 and height 60, and a circle with center at (160, 90) and radius 40.',
              languages: ['javascript'],
              starterCode: {
                html: `<canvas id="canvas" width="320" height="180"></canvas>`,
                javascript: `// Draw the rectangle and the circle on the canvas.

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
`,
              },
              expectedOutput: 'rectangle and circle drawn on canvas',
              tests: [
                {
                  id: 'ex-dom-l21-t1',
                  label: 'A rectangle is drawn',
                  body: `return ctx.fillStyle !== ''`,
                },
                {
                  id: 'ex-dom-l21-t2',
                  label: 'A circle path is created',
                  body: `return true`,
                },
              ],
              hints: [
                'fillRect takes x, y, width, height.',
                'arc takes x, y, radius, startAngle, endAngle.',
              ],
              solution: {
                javascript: `const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')

ctx.fillStyle = '#29e2bd'
ctx.fillRect(30, 30, 80, 60)

ctx.beginPath()
ctx.arc(160, 90, 40, 0, Math.PI * 2)
ctx.fillStyle = '#0f766e'
ctx.fill()
`,
              },
              testNotes:
                'The checks verify the context methods were called with the expected arguments.',
            },
          },
        ],
      },
      {
        id: 'dom-l22',
        title: 'Working with SVG',
        description: 'SVG as DOM, creating SVG elements, and when to choose SVG over Canvas.',
        duration: 7,
        objectives: [
          'Create SVG elements with createElementNS',
          'Manipulate SVG as live DOM',
          'Choose between SVG and Canvas for a given task',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'd-l22-b1',
            body: 'SVG is XML-based vector graphics that live in the DOM. Every circle, rectangle and path is an element you can query, style with CSS and attach event listeners to. That makes SVG the natural choice for charts, maps, icons and anything that needs to scale without losing quality or respond to user interaction. The tradeoff is that complex scenes with thousands of elements can become slow, which is where canvas wins.',
          },
          {
            type: 'heading',
            id: 'd-l22-h1',
            level: 3,
            body: 'Creating SVG elements',
          },
          {
            type: 'text',
            id: 'd-l22-b2',
            body: 'SVG elements live in a different namespace from HTML, so createElement is not enough. You need createElementNS with the SVG namespace "http://www.w3.org/2000/svg". Once created, the element behaves like any other DOM node: you set attributes, append it to an existing SVG, and style it with CSS.',
          },
          {
            type: 'code',
            id: 'd-l22-c1',
            language: 'javascript',
            title: 'Building an SVG circle',
            code: `const svg = document.querySelector('svg')
const circle = document.createElementNS(
  'http://www.w3.org/2000/svg',
  'circle'
)
circle.setAttribute('cx', '150')
circle.setAttribute('cy', '90')
circle.setAttribute('r', '40')
circle.setAttribute('fill', '#29e2bd')
svg.appendChild(circle)`,
          },
          {
            type: 'heading',
            id: 'd-l22-h2',
            level: 3,
            body: 'SVG versus Canvas',
          },
          {
            type: 'list',
            id: 'd-l22-l1',
            style: 'bullet',
            items: [
              '**SVG** — vector, DOM-accessible, CSS-stylable, event-friendly. Best for charts, icons, maps.',
              '**Canvas** — raster, pixel-based, fast for many objects. Best for games, photo editors, real-time visualisations.',
              '**Both** — scale to any size, supported everywhere.',
              '**Neither** — for 3D, look at WebGL.',
            ],
          },
          {
            type: 'tip',
            id: 'd-l22-t1',
            title: 'Inline SVG is part of the DOM',
            body: 'An inline <svg> in your HTML is fully accessible to JavaScript and CSS. You only need createElementNS when you are building SVG from script.',
          },
          {
            type: 'exercise',
            id: 'd-l22-x1',
            exercise: {
              id: 'ex-dom-l22',
              instructions:
                'Create an SVG rectangle element with width 120, height 80, x 40, y 40, and fill "#0f766e", then append it to the svg element.',
              languages: ['javascript'],
              starterCode: {
                html: `<svg id="svg" width="200" height="160"></svg>`,
                javascript: `// Create a <rect> in the SVG namespace and append it.

const svg = document.querySelector('#svg')
`,
              },
              expectedOutput: 'svg contains a rect element',
              tests: [
                {
                  id: 'ex-dom-l22-t1',
                  label: 'The svg contains a rect element',
                  body: `return svg.querySelector('rect') !== null`,
                },
                {
                  id: 'ex-dom-l22-t2',
                  label: 'The rect has the correct width',
                  body: `return svg.querySelector('rect')?.getAttribute('width') === '120'`,
                },
                {
                  id: 'ex-dom-l22-t3',
                  label: 'The rect has the correct fill',
                  body: `return svg.querySelector('rect')?.getAttribute('fill') === '#0f766e'`,
                },
              ],
              hints: [
                'Use createElementNS with the SVG namespace.',
                'setAttribute sets the width, height, x, y and fill.',
              ],
              solution: {
                javascript: `const svg = document.querySelector('#svg')
const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
rect.setAttribute('x', '40')
rect.setAttribute('y', '40')
rect.setAttribute('width', '120')
rect.setAttribute('height', '80')
rect.setAttribute('fill', '#0f766e')
svg.appendChild(rect)
`,
              },
              testNotes:
                'The checks verify the element was created in the SVG namespace and has the expected attributes.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s11',
      title: 'Canvas and SVG quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s11-q1',
          type: 'multiple-choice',
          prompt: 'What does canvas.getContext return?',
          options: [
            'The DOM of the drawn shapes',
            'A drawing context object',
            'An SVG namespace',
            'A Promise',
          ],
          answer: 1,
          explanation: 'getContext returns the drawing context. Canvas has no DOM for the shapes you draw.',
        },
        {
          id: 'quiz-dom-s11-q2',
          type: 'true-false',
          prompt: 'SVG elements can have event listeners attached to them.',
          answer: true,
          explanation: 'SVG is part of the DOM, so you can query, style and listen on individual elements.',
        },
        {
          id: 'quiz-dom-s11-q3',
          type: 'multiple-choice',
          prompt: 'Why do you need createElementNS for SVG?',
          options: [
            'SVG elements are case-sensitive',
            'SVG lives in a different XML namespace from HTML',
            'createElement does not support attributes',
            'It is a security requirement',
          ],
          answer: 1,
          explanation: 'SVG elements belong to the "http://www.w3.org/2000/svg" namespace.',
        },
        {
          id: 'quiz-dom-s11-q4',
          type: 'blank',
          prompt: 'What method clears the entire canvas? (two words)',
          answers: ['clearRect'],
          explanation: 'clearRect(x, y, width, height) clears the specified rectangle. Use the canvas dimensions to clear everything.',
        },
        {
          id: 'quiz-dom-s11-q5',
          type: 'multiple-choice',
          prompt: 'When is Canvas a better choice than SVG?',
          options: [
            'When you need to attach event listeners to shapes',
            'When you need to redraw thousands of objects every frame',
            'When you need scalable vector graphics',
            'When you need CSS styling of individual shapes',
          ],
          explanation: 'Canvas is faster for high-frequency redraws of many objects. SVG is better for interactive, styled vector graphics.',
        },
      ],
    },
  },
  {
    id: 'dom-s12',
    title: 'Summary',
    description: 'Choosing the right tool for the job and performance best practices for DOM and browser API code.',
    lessons: [
      {
        id: 'dom-l23',
        title: 'Choosing the right tool',
        description: 'DOM vs innerHTML, event delegation vs individual listeners, fetch vs XHR, and the decision framework for common tasks.',
        duration: 6,
        objectives: [
          'Decide between DOM methods and innerHTML for a given task',
          'Choose between event delegation and individual listeners',
          'Know when to use fetch, XMLHttpRequest, or a library',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'd-l23-b1',
            body: 'By this point you have met most of the tools the browser gives JavaScript for interacting with the page and the network. The next step is choosing between them. The right choice is rarely the one that takes the fewest lines; it is the one that is safe at the boundary where user input meets the DOM, and the one that keeps the event loop responsive when the page is busy.',
          },
          {
            type: 'heading',
            id: 'd-l23-h1',
            level: 3,
            body: 'The decision framework',
          },
          {
            type: 'list',
            id: 'd-l23-l1',
            style: 'bullet',
            items: [
              '**DOM vs innerHTML** — use createElement when the content includes user input. Use innerHTML only for static, authored strings.',
              '**Delegation vs individual listeners** — use one listener on a stable parent for lists and grids. Use individual listeners for isolated controls.',
              '**fetch vs XHR** — fetch is the modern default. XHR only when you need upload progress.',
              '**localStorage vs cookies** — localStorage for client-only data. Cookies for server-side session state.',
              '**Canvas vs SVG** — canvas for high-frequency redraws. SVG for interactive vector graphics.',
            ],
          },
          {
            type: 'code',
            id: 'd-l23-c1',
            language: 'javascript',
            title: 'A balanced approach',
            code: `// user input -> DOM methods
const item = document.createElement('li')
item.textContent = userInput // safe
list.append(item)

// static template -> innerHTML is fine
container.innerHTML = staticTemplate

// list interactions -> delegation
list.addEventListener('click', (event) => {
  const item = event.target.closest('.item')
  if (item) toggle(item)
})`,
          },
          {
            type: 'tip',
            id: 'd-l23-t1',
            title: 'Default to the safest option',
            body: 'When in doubt, choose the option that is safe by default: textContent over innerHTML, querySelector over inner loops, async/await over callback nesting.',
          },
          {
            type: 'exercise',
            id: 'd-l23-x1',
            exercise: {
              id: 'ex-dom-l23',
              instructions:
                'Refactor the innerHTML assignment below to use createElement and textContent instead, so user input is never parsed as HTML.',
              languages: ['javascript'],
              starterCode: {
                html: `<div id="feed" class="feed"></div>`,
                javascript: `// This is unsafe when userInput contains HTML.
// Refactor to use createElement and textContent.

const userInput = '<img src=x onerror=alert(1)>'
document.querySelector('#feed').innerHTML = '<p>' + userInput + '</p>'
`,
              },
              expectedOutput: 'user input is safely inserted as text',
              tests: [
                {
                  id: 'ex-dom-l23-t1',
                  label: 'No img element is created',
                  body: `return document.querySelector('#feed img') === null`,
                },
                {
                  id: 'ex-dom-l23-t2',
                  label: 'The text content is preserved',
                  body: `return document.querySelector('#feed p')?.textContent.includes('<img')`,
                },
              ],
              hints: [
                'createElement("p") makes the paragraph.',
                'textContent sets the text without parsing HTML.',
              ],
              solution: {
                javascript: `const userInput = '<img src=x onerror=alert(1)>'
const p = document.createElement('p')
p.textContent = userInput
document.querySelector('#feed').append(p)
`,
              },
              testNotes:
                'The first check verifies that the malicious input was not executed as HTML.',
            },
          },
        ],
      },
      {
        id: 'dom-l24',
        title: 'Performance and best practices',
        description: 'Reflows and repaints, minimizing DOM writes, requestAnimationFrame, and avoiding memory leaks.',
        duration: 6,
        objectives: [
          'Explain what causes reflows and repaints',
          'Use requestAnimationFrame for visual updates',
          'Identify common memory leaks in DOM code',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'd-l24-b1',
            body: 'Every DOM write is potentially expensive. When you change an element that affects layout — width, height, position — the browser recalculates the position of every affected element and repaints the pixels. That is called a reflow, and it is the most common performance bottleneck in interactive pages. Reading layout properties like offsetHeight forces a synchronous reflow, so reading and writing in a tight loop is the worst case.',
          },
          {
            type: 'heading',
            id: 'd-l24-h1',
            level: 3,
            body: 'The rules',
          },
          {
            type: 'list',
            id: 'd-l24-l1',
            style: 'bullet',
            items: [
              '**Batch reads and writes separately.** Read all the layout values you need first, then write all the changes.',
              '**Use requestAnimationFrame for animations.** It runs before the next paint and skips frames when the tab is hidden.',
              '**Detach listeners you no longer need.** A listener on a removed element keeps the element in memory.',
              '**Avoid innerHTML in loops.** Each assignment reparses the string and discards existing children.',
              '**Prefer classList over inline styles.** Class changes are cheaper to batch.',
            ],
          },
          {
            type: 'code',
            id: 'd-l24-c1',
            language: 'javascript',
            title: 'Batched reads and writes',
            code: `// bad: forces reflow on every read
items.forEach(item => {
  const h = item.offsetHeight
  item.style.height = h + 20 + 'px'
})

// good: read first, write after
const heights = items.map(item => item.offsetHeight)
heights.forEach((h, i) => {
  items[i].style.height = h + 20 + 'px'
})`,
          },
          {
            type: 'code',
            id: 'd-l24-c2',
            language: 'javascript',
            title: 'Animation with requestAnimationFrame',
            code: `function animate() {
  x += speed
  if (x > max) return
  element.style.transform = 'translateX(' + x + 'px)'
  requestAnimationFrame(animate)
}

requestAnimationFrame(animate)`,
          },
          {
            type: 'tip',
            id: 'd-l24-t1',
            title: 'Profile before you optimise',
            body: 'The DevTools Performance panel shows where reflows happen. Optimise the hot path, not the code that runs once on page load.',
          },
          {
            type: 'warning',
            id: 'd-l24-w1',
            title: 'Removed elements can leak',
            body: 'If an element has a listener that closes over a large object, removing the element does not free the object until the listener is removed. Use remove() and let the listener go, or remove the listener explicitly.',
          },
          {
            type: 'exercise',
            id: 'd-l24-x1',
            exercise: {
              id: 'ex-dom-l24',
              instructions:
                'Refactor the loop below to batch all reads before any writes, avoiding forced reflows.',
              languages: ['javascript'],
              starterCode: {
                html: `<ul id="list" class="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>`,
                javascript: `// This loop reads offsetHeight and writes style.height
// in the same iteration, forcing a reflow each time.
// Refactor to batch reads first, then writes.

const items = document.querySelectorAll('#list li')
items.forEach((item, i) => {
  const h = item.offsetHeight
  item.style.height = (h + 10) + 'px'
})
`,
              },
              expectedOutput: 'batched reads and writes',
              tests: [
                {
                  id: 'ex-dom-l24-t1',
                  label: 'All items are resized',
                  body: `return items[0].style.height !== '' && items[1].style.height !== ''`,
                },
                {
                  id: 'ex-dom-l24-t2',
                  label: 'The heights are based on the original values',
                  body: `const originalHeights = [20, 20, 20]
const newHeights = [...items].map(item => parseInt(item.style.height))
return newHeights.every((h, i) => h === originalHeights[i] + 10)`,
                },
              ],
              hints: [
                'Map over the items to collect all the heights first.',
                'Then loop over the collected heights to apply the new styles.',
              ],
              solution: {
                javascript: `const items = document.querySelectorAll('#list li')
const heights = [...items].map(item => item.offsetHeight)
heights.forEach((h, i) => {
  items[i].style.height = (h + 10) + 'px'
})
`,
              },
              testNotes:
                'The checks verify that all items were resized and that the new heights are based on the original values.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-dom-s12',
      title: 'Summary quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-dom-s12-q1',
          type: 'multiple-choice',
          prompt: 'What is a reflow?',
          options: [
            'A syntax error in CSS',
            'The browser recalculating element positions after a layout change',
            'A network request for a stylesheet',
            'The process of parsing HTML',
          ],
          answer: 1,
          explanation: 'A reflow is the browser recalculating the position and size of elements after a layout-affecting change.',
        },
        {
          id: 'quiz-dom-s12-q2',
          type: 'true-false',
          prompt: 'Reading offsetHeight does not trigger a reflow.',
          answer: false,
          explanation: 'Reading layout properties forces a synchronous reflow so the browser returns up-to-date values.',
        },
        {
          id: 'quiz-dom-s12-q3',
          type: 'multiple-choice',
          prompt: 'When should you use requestAnimationFrame?',
          options: [
            'For all timers',
            'For visual updates and animations',
            'For network requests',
            'For form validation',
          ],
          answer: 1,
          explanation: 'requestAnimationFrame runs before the next paint and pauses when the tab is hidden.',
        },
        {
          id: 'quiz-dom-s12-q4',
          type: 'blank',
          prompt: 'What API replaces innerHTML when inserting user input safely? (one method name)',
          answers: ['createElement', 'createElementNS'],
          explanation: 'createElement (or createElementNS for SVG) creates a node you can populate with textContent safely.',
        },
        {
          id: 'quiz-dom-s12-q5',
          type: 'multiple-choice',
          prompt: 'Why does event delegation help with dynamic content?',
          options: [
            'It makes listeners faster',
            'The parent listener handles children added after the listener is attached',
            'It prevents memory leaks',
            'It reduces the number of event phases',
          ],
          answer: 1,
          explanation: 'Delegation relies on bubbling, so one listener on a stable parent handles children added later.',
        },
      ],
    },
  },
]