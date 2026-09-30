import type { ReferenceEntry } from '~/types/content'

export const referenceEntries: ReferenceEntry[] = [
  {
    id: 'html-a',
    name: '<a>',
    group: 'html',
    summary: 'Creates a hyperlink to another page, a file, an anchor on the current page, an email address or a phone number.',
    syntax: '<a href="URL">label</a>',
    details: [
      'The href attribute is the destination; without it the element is not a link.',
      'href="#section" scrolls to the element with a matching id on the same page.',
      'target="_blank" must be paired with rel="noopener" so the new page cannot reach back through window.opener.',
      'An anchor with no readable text is invisible to screen readers, so give it text or an aria-label.',
    ],
    example: {
      language: 'html',
      code: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN Web Docs
</a>
<a href="mailto:hello@codeingot.dev">Email us</a>`,
    },
  },
  {
    id: 'html-button',
    name: '<button>',
    group: 'html',
    summary: 'A control the user activates, which is the correct element whenever something happens rather than somewhere you go.',
    syntax: '<button type="button" name="NAME">label</button>',
    details: [
      'type="button" does nothing, type="submit" sends the form, type="reset" clears it — always state which.',
      'A button is focusable and works with Enter and Space without any extra code.',
      'Buttons cannot contain interactive descendants such as links or nested buttons.',
      'Use disabled as a bare boolean attribute; disabled="false" still disables the control.',
    ],
    example: {
      language: 'html',
      code: `<button type="button" class="save">Save draft</button>
<button type="submit">Create account</button>
<button type="button" disabled>Save draft</button>`,
    },
  },
  {
    id: 'html-form',
    name: '<form>',
    group: 'html',
    summary: 'Groups related controls so their values are submitted together as one request.',
    syntax: '<form action="/subscribe" method="post">...</form>',
    details: [
      'method is either "get", which puts values in the URL, or "post", which sends them in the body.',
      'Only controls with a name attribute are included in the submitted data.',
      'A form submits on Enter from most single-line inputs, so you usually do not need a separate handler.',
      'Group related controls with fieldset and legend rather than a bare div.',
    ],
    example: {
      language: 'html',
      code: `<form action="/subscribe" method="post">
  <fieldset>
    <legend>Delivery address</legend>
    <label for="street">Street</label>
    <input id="street" name="street" autocomplete="street-address" />
  </fieldset>
  <button type="submit">Subscribe</button>
</form>`,
    },
  },
  {
    id: 'html-input',
    name: '<input>',
    group: 'html',
    summary: 'A single-line text field, and also the base for every other input type through its type attribute.',
    syntax: '<input type="text" name="NAME" id="ID" />',
    details: [
      'It is a void element: it has no closing tag.',
      'type="email" and type="url" give mobile keyboards the right keys and trigger basic validation.',
      'The id is what a label points at; the name is what the value is called when submitted.',
      'Use autocomplete with the correct token so browsers and password managers can fill it in.',
    ],
    example: {
      language: 'html',
      code: `<label for="mail">Email address</label>
<input
  id="mail"
  name="email"
  type="email"
  autocomplete="email"
  required
/>`,
    },
  },
  {
    id: 'html-img',
    name: '<img>',
    group: 'html',
    summary: 'Embeds an image, and is a void element like input or br.',
    syntax: '<img src="URL" alt="description" width="640" height="360" />',
    details: [
      'alt is required on every image. Use alt="" for decoration, and a real description when the image carries meaning.',
      'Set width and height attributes to reserve space and stop the page jumping as images load.',
      'loading="lazy" defers images that sit below the fold.',
      'The src attribute is fetched as soon as it is parsed, so use srcset for responsive image selection.',
    ],
    example: {
      language: 'html',
      code: `<img
  src="https://placehold.co/640x360/171c22/29e2bd?text=codeIngot"
  alt="A dark editor window with a single line of JavaScript"
  width="640"
  height="360"
  loading="lazy"
/>`,
    },
  },
  {
    id: 'html-section',
    name: '<section>',
    group: 'html',
    summary: 'A thematic grouping of content, normally introduced by its own heading.',
    syntax: '<section id="pricing"><h2>Pricing</h2>...</section>',
    details: [
      'A section without an accessible name is no better than a div; give it a heading or an aria-label.',
      'It has no default styling, so it exists purely to describe meaning.',
      'Nest sections to reflect the content hierarchy rather than the visual layout.',
      'Do not use section for page-wide grouping — that is what main and article are for.',
    ],
    example: {
      language: 'html',
      code: `<section id="pricing" aria-labelledby="pricing-heading">
  <h2 id="pricing-heading">Pricing</h2>
  <p>Free forever for one project.</p>
</section>`,
    },
  },
  {
    id: 'html-article',
    name: '<article>',
    group: 'html',
    summary: 'A self-contained composition that would still make sense if it were syndicated on its own.',
    syntax: '<article><h2>Title</h2>...</article>',
    details: [
      'The test is independence: if it could be reused elsewhere unchanged, it is an article.',
      'Each article in a feed should carry its own heading.',
      'An article inside another article is valid, and gives the nested element its own scope.',
      'Pair it with a header for the title and a footer for bylines or timestamps.',
    ],
    example: {
      language: 'html',
      code: `<article>
  <header>
    <h2>Why structure beats styling</h2>
    <p><time datetime="2026-02-11">11 February 2026</time></p>
  </header>
  <p>Restyling a well-structured page is an afternoon of work.</p>
  <footer>
    <p>By Alex Rivera</p>
  </footer>
</article>`,
    },
  },
  {
    id: 'html-header',
    name: '<header>',
    group: 'html',
    summary: 'Introductory content for its nearest section: a title, a logo, or navigation.',
    syntax: '<header><h1>Site name</h1></header>',
    details: [
      'It is not the same as the head element; the header renders inside the page.',
      'A header at the top level is the page header; one inside an article is that article header.',
      'It becomes a banner landmark only when it is a direct descendant of body.',
      'Use it for introductory content, not for a generic strip of content.',
    ],
    example: {
      language: 'html',
      code: `<header>
  <a href="/">codeIngot</a>
  <nav aria-label="Main">
    <a href="/paths">Paths</a>
    <a href="/challenges">Challenges</a>
  </nav>
</header>`,
    },
  },
  {
    id: 'html-footer',
    name: '<footer>',
    group: 'html',
    summary: 'Closing content for its nearest section: copyright, authorship, navigation or contact details.',
    syntax: '<footer><p>© 2026 codeIngot</p></footer>',
    details: [
      'Like header, it takes its meaning from where it sits in the document.',
      'It becomes a contentinfo landmark only as a direct descendant of body.',
      'A link inside a footer is still a link; there is no rule against navigation here.',
      'Time elements belong here as often as anywhere else in a document.',
    ],
    example: {
      language: 'html',
      code: `<footer>
  <p>© 2026 codeIngot</p>
  <nav aria-label="Footer">
    <a href="/privacy">Privacy</a>
    <a href="/contact">Contact</a>
  </nav>
</footer>`,
    },
  },
  {
    id: 'html-nav',
    name: '<nav>',
    group: 'html',
    summary: 'A block of major navigation links.',
    syntax: '<nav aria-label="Main">...</nav>',
    details: [
      'Use it for major navigation, not for every group of links: a logo link or a breadcrumb does not need one.',
      'Label it with aria-label when a page has more than one nav, so the landmark is distinguishable.',
      'A nav usually contains a list, because a list conveys the number of destinations at a glance.',
      'Skip links should sit before the nav, not inside it.',
    ],
    example: {
      language: 'html',
      code: `<nav aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Learn</a></li>
    <li><a href="/paths">Paths</a></li>
    <li><a href="/projects">Projects</a></li>
  </ul>
</nav>`,
    },
  },
  {
    id: 'html-ul',
    name: '<ul>',
    group: 'html',
    summary: 'An unordered list of items where the order carries no meaning.',
    syntax: '<ul><li>Item</li></ul>',
    details: [
      'Only li elements are allowed as direct children.',
      'Use ol instead when sequence matters, such as a set of instructions.',
      'list-style: none in CSS removes the markers without changing the semantics, so the list is still announced as a list.',
      'The list is announced with its item count, which is why navigation is clearer as a list than as loose anchors.',
    ],
    example: {
      language: 'html',
      code: `<ul>
  <li>Read the outline before writing markup</li>
  <li>Check every control has a label</li>
  <li>Verify nothing overflows at 360px</li>
</ul>`,
    },
  },
  {
    id: 'html-table',
    name: '<table>',
    group: 'html',
    summary: 'Tabular data in rows and cells, which is a different thing from layout.',
    syntax: '<table><caption>Data</caption><thead>...</thead><tbody>...</tbody></table>',
    details: [
      'A caption is the first child and names the table for anyone who cannot see it.',
      'Header cells use th, not td, and scope="col" or scope="row" says which way they apply.',
      'Splitting totals into a second tbody lets assistive technology and scripts re-sort rows independently.',
      'Never use a table for page layout; that job belongs to CSS grid and flexbox.',
    ],
    example: {
      language: 'html',
      code: `<table>
  <caption>Quarterly revenue in thousands</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Europe</td>
      <td>412</td>
    </tr>
  </tbody>
</table>`,
    },
  },
  {
    id: 'css-display',
    name: 'display',
    group: 'css',
    summary: 'Decides whether an element is a block, an inline box, a flex or grid container, or not rendered at all.',
    syntax: 'display: block | inline | inline-block | flex | grid | none',
    details: [
      'display: none removes the element from the layout tree and from the accessibility tree; visibility: hidden keeps its space.',
      'block elements fill the available width and start a new line; inline elements flow with the surrounding text.',
      'inline-block is inline for flow purposes but accepts width, height and margins.',
      'display: flex and display: grid turn the element into a container for its direct children only.',
    ],
    example: {
      language: 'css',
      code: `.card {
  display: block;
}

.card__media {
  display: inline-block;
  width: 200px;
}

.hidden {
  display: none;
}`,
    },
  },
  {
    id: 'css-position',
    name: 'position',
    group: 'css',
    summary: 'Places an element using the normal flow, or offsets it from a reference box.',
    syntax: 'position: static | relative | absolute | fixed | sticky',
    details: [
      'static is the default and ignores all offset properties.',
      'relative offsets an element from where it would have been, without removing it from the flow.',
      'absolute and fixed remove the element from the flow; absolute positions against the nearest positioned ancestor.',
      'stickky keeps an element in the flow until its container scrolls past, then pins it.',
    ],
    example: {
      language: 'css',
      code: `.badge {
  position: relative;
  top: 2px;
}

.sidebar {
  position: sticky;
  top: 1rem;
}`,
    },
  },
  {
    id: 'css-flex',
    name: 'flex',
    group: 'css',
    summary: 'Lays out the direct children of a container along one axis, main or cross, with distribution and alignment controls.',
    syntax: 'display: flex; flex-direction: row | column; justify-content: ...; align-items: ...',
    details: [
      'justify-content distributes along the main axis; align-items aligns along the cross axis.',
      'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1 and flex-basis: 0%.',
      'flex-wrap: wrap moves children onto new lines when they run out of room on the main axis.',
      'Only direct children become flex items; grandchildren are laid out by their own parents.',
    ],
    example: {
      language: 'css',
      code: `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.row > * {
  flex: 1 1 12rem;
}`,
    },
  },
  {
    id: 'css-grid',
    name: 'grid',
    group: 'css',
    summary: 'Places children into rows and columns on two axes at once, with tracks that can be defined or implicit.',
    syntax: 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;',
    details: [
      'fr distributes leftover space in equal shares, so 1fr 1fr is always two equal columns.',
      'repeat(auto-fit, minmax(16rem, 1fr)) builds a responsive grid with no media query at all.',
      'grid-template-areas place named blocks and are far clearer than nested wrappers.',
      'Grid controls the container; place-items and gap control the items inside it.',
    ],
    example: {
      language: 'css',
      code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem;
}`,
    },
  },
  {
    id: 'css-margin',
    name: 'margin',
    group: 'css',
    summary: 'Space outside an element, and the only way to push a flex or grid item away from its neighbours.',
    syntax: 'margin: 1rem 0 2rem 0;',
    details: [
      'margin adds space outside the border and is not part of the element background.',
      'Vertical margins between block siblings collapse, so the larger of the two wins.',
      'margin: 0 auto centres a block that has a max-width.',
      'Inside a flex or grid container, margins never collapse and act as a spacing tool alongside gap.',
    ],
    example: {
      language: 'css',
      code: `.page {
  max-width: 44rem;
  margin: 0 auto;
}

section + section {
  margin-top: 2.5rem;
}`,
    },
  },
  {
    id: 'css-padding',
    name: 'padding',
    group: 'css',
    summary: 'Space inside an element, between its content and its border.',
    syntax: 'padding: 1rem 1.5rem;',
    details: [
      'Padding is part of the element, so it is included in its background and border.',
      'Padding cannot be negative; to push an element outward, use margin instead.',
      'Percentage padding is always resolved against the width of the containing block, including the vertical axis.',
      'In a flex or grid container, padding insets the whole set of children at once.',
    ],
    example: {
      language: 'css',
      code: `.card {
  padding: 1.25rem;
  border: 1px solid #252c35;
}`,
    },
  },
  {
    id: 'css-color',
    name: 'color',
    group: 'css',
    summary: 'Sets the foreground text colour of an element, and is inherited by descendants unless overridden.',
    syntax: 'color: #f4f7fa;',
    details: [
      'Accepts hex, rgb(), hsl(), named colours and colour keywords such as currentColor.',
      'Modern syntax allows spaces inside rgb() as well as commas: rgb(244 247 250).',
      'currentColor means "whatever colour this element already has", which makes borders follow text automatically.',
      'It is the most frequently inherited property, so set it once high in the document.',
    ],
    example: {
      language: 'css',
      code: `body {
  color: #f4f7fa;
  background: #0b0d10;
}

.badge {
  color: #29e2bd;
  border: 1px solid currentColor;
}`,
    },
  },
  {
    id: 'css-font',
    name: 'font',
    group: 'css',
    summary: 'Controls the typography of text: family, size, weight, style and spacing.',
    syntax: 'font: 600 1rem/1.5 system-ui, sans-serif;',
    details: [
      'font-family accepts a stack and falls back left to right; include a generic family last.',
      'The font shorthand is font-style font-variant font-weight font-size/line-height font-family.',
      'line-height as a unitless number multiplies the font size, so it scales with the reader’s text size.',
      'Use font-weight in multiples of 100 in variable fonts; 400 is normal and 700 is bold.',
    ],
    example: {
      language: 'css',
      code: `body {
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

h1 {
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
}`,
    },
  },
  {
    id: 'css-gap',
    name: 'gap',
    group: 'css',
    summary: 'Sets the space between grid or flex items without touching the items themselves.',
    syntax: 'gap: 1rem; row-gap: 0.5rem;',
    details: [
      'It replaces margins on children, which removes the margin-collapsing problem entirely.',
      'It works in both axes and can be set separately with row-gap and column-gap.',
      'It has no effect outside flex and grid containers.',
      'Gap is also a shorthand for row-gap and column-gap.',
    ],
    example: {
      language: 'css',
      code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem 1rem;
}`,
    },
  },
  {
    id: 'css-box-sizing',
    name: 'box-sizing',
    group: 'css',
    summary: 'Decides whether padding and border are counted inside a declared width and height or added outside it.',
    syntax: 'box-sizing: border-box;',
    details: [
      'The default is content-box, which makes a 100px wide box 122px wide once padding and border are added.',
      'border-box makes the declared size the final size, which is almost always what you want.',
      'Setting it on *, *::before and *::after once makes every later calculation predictable.',
      'When height is set on an inline element, the value is ignored regardless of this property.',
    ],
    example: {
      language: 'css',
      code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

.button {
  width: 10rem;
  padding: 0.6rem 1rem;
  border: 1px solid #252c35;
}`,
    },
  },
  {
    id: 'css-z-index',
    name: 'z-index',
    group: 'css',
    summary: 'Controls the paint order of positioned elements when they overlap.',
    syntax: 'z-index: 10;',
    details: [
      'It only applies to positioned elements, flex items and grid items; on a static element it is ignored.',
      'A negative value paints behind the in-flow content of the same stacking context.',
      'z-index competes only within the same stacking context, so a high value inside a low-z-index parent has no effect.',
      'A transparent element still creates a stacking context when it has position and a z-index other than auto.',
    ],
    example: {
      language: 'css',
      code: `.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
}`,
    },
  },
  {
    id: 'javascript-array',
    name: 'Array',
    group: 'javascript',
    summary: 'An ordered, mutable list of values with methods for transforming it without changing the original.',
    syntax: 'const values = [1, 2, 3]; values.map(fn); values.filter(fn);',
    details: [
      'map returns a new array of the same length with each item passed through a function.',
      'filter returns a new array containing only the items for which the function returned true.',
      'reduce folds an array into a single value and takes an initial value as its second argument.',
      'sort mutates the array in place, so copy it with spread syntax first if you still need the original order.',
    ],
    example: {
      language: 'javascript',
      code: `const scores = [72, 95, 88, 41]

const descending = [...scores].sort((a, b) => b - a)
const passing = scores.filter((score) => score >= 50)
const average = scores.reduce((total, score) => total + score, 0) / scores.length

console.log(descending.slice(0, 3).join(', '))`,
    },
  },
  {
    id: 'javascript-object',
    name: 'Object',
    group: 'javascript',
    summary: 'A keyed collection of properties, used to describe one thing with named fields.',
    syntax: 'const user = { name: "Ada", role: "engineer" };',
    details: [
      'Properties are read with dot or bracket notation; bracket notation is required for keys that are not valid identifiers.',
      'Object.keys returns the key names, Object.values the values and Object.entries both as pairs.',
      'Spread copies properties into a new object: { ...user, role: "lead" }.',
      'A property with a function value is called a method and is called without binding the object: user.greet().',
    ],
    example: {
      language: 'javascript',
      code: `const user = { name: 'Ada', role: 'engineer' }

for (const [key, value] of Object.entries(user)) {
  console.log(key + ': ' + value)
}

const lead = { ...user, role: 'lead' }
console.log(lead)`,
    },
  },
  {
    id: 'javascript-map',
    name: 'Map',
    group: 'javascript',
    summary: 'A keyed collection that keeps insertion order and accepts any value as a key.',
    syntax: 'const counts = new Map(); counts.set(key, value);',
    details: [
      'Keys can be objects, unlike in a plain object where they are coerced to strings.',
      'get returns undefined for a missing key, so check has when undefined is a valid value.',
      'size reports how many entries there are.',
      'Iterating with for...of yields [key, value] pairs; a whole Map cannot be JSON.stringify-ed directly.',
    ],
    example: {
      language: 'javascript',
      code: `const counts = new Map()

for (const word of ['js', 'css', 'js', 'html', 'js']) {
  counts.set(word, (counts.get(word) || 0) + 1)
}

console.log(counts.get('js')) // 3
console.log([...counts.keys()])`,
    },
  },
  {
    id: 'javascript-set',
    name: 'Set',
    group: 'javascript',
    summary: 'A collection of unique values with fast membership tests and predictable insertion order.',
    syntax: 'const seen = new Set(); seen.add(value);',
    details: [
      'Adding a value that already exists changes nothing, which makes de-duplication a one-liner.',
      'has is used to test membership without constructing the array.',
      'size counts distinct values.',
      'toSorted-free operations like spread and filter produce a new Set, but there is no sort: order follows insertion.',
    ],
    example: {
      language: 'javascript',
      code: `const seen = new Set()

for (const id of [3, 7, 3, 7, 11]) {
  seen.add(id)
}

console.log(seen.size) // 3
console.log([...seen])`,
    },
  },
  {
    id: 'javascript-function',
    name: 'Function',
    group: 'javascript',
    summary: 'A reusable block of scope with parameters, a body and a return value.',
    syntax: 'function add(a, b = 0) { return a + b; }',
    details: [
      'Parameters default to undefined when the argument is missing; a default parameter covers that case for you.',
      'A function that returns nothing returns undefined implicitly.',
      'Arrow functions have no own this, so they cannot be used as object methods or DOM event handlers that need a dynamic this.',
      'Function declarations are hoisted; function expressions assigned to const are not, so declare before use.',
    ],
    example: {
      language: 'javascript',
      code: `function total(prices, taxRate = 0) {
  const sum = prices.reduce((acc, price) => acc + price, 0)
  return Math.round(sum * (1 + taxRate) * 100) / 100
}

const double = (value) => value * 2

console.log(total([9.99, 4.5], 0.2)) // 17.38
console.log(double(21))`,
    },
  },
  {
    id: 'javascript-promise',
    name: 'Promise',
    group: 'javascript',
    summary: 'An object representing the eventual result of an asynchronous operation.',
    syntax: 'const p = new Promise((resolve, reject) => { resolve(value) })',
    details: [
      'A promise is pending, then fulfilled or rejected, and it can only settle once.',
      'then registers a callback for fulfilment and catch one for rejection; both return new promises.',
      'Promise.all waits for every promise and rejects if any one rejects, while allSettled never rejects.',
      'async functions return promises, so await works inside them and throws turn into rejections.',
    ],
    example: {
      language: 'javascript',
      code: `function delay(ms, value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

async function load() {
  const [user, prefs] = await Promise.all([
    delay(100, { name: 'Ada' }),
    delay(50, { theme: 'dark' })
  ])
  return user.name + ' / ' + prefs.theme
}

load().then(console.log)`,
    },
  },
  {
    id: 'javascript-fetch',
    name: 'fetch',
    group: 'javascript',
    summary: 'Requests a resource from the network and returns a promise that resolves to a Response.',
    syntax: 'fetch(url, { method: "GET", headers: {}, body: JSON.stringify(data) })',
    details: [
      'fetch does not reject on a 404 or a 500; check response.ok before reading the body.',
      'The body can be read only once, as text, json, blob or formData.',
      'A POST with a JSON payload needs both a Content-Type header and a stringified body.',
      'AbortController cancels an in-flight request, which is how you avoid updating state after the user has moved on.',
    ],
    example: {
      language: 'javascript',
      code: `async function loadUser(id) {
  const response = await fetch('https://api.example.com/users/' + id)

  if (!response.ok) {
    throw new Error('Request failed with status ' + response.status)
  }

  return response.json()
}

loadUser(1)
  .then((user) => console.log(user.name))
  .catch((error) => console.error(error.message))`,
    },
  },
  {
    id: 'javascript-querySelector',
    name: 'querySelector',
    group: 'javascript',
    summary: 'Returns the first element matching a CSS selector, or null when nothing matches.',
    syntax: 'const el = document.querySelector(".card .title");',
    details: [
      'It accepts any CSS selector, including attribute selectors such as input[type="email"].',
      'It returns null when there is no match, so check before reading properties.',
      'querySelectorAll returns a static NodeList; use forEach on it directly in modern browsers.',
      'Pass the element to search inside as a second argument to scope the search.',
    ],
    example: {
      language: 'javascript',
      code: `const form = document.querySelector('.signup')
const email = document.querySelector('#email')
const errors = document.querySelectorAll('.error')

if (form) {
  form.addEventListener('submit', handleSubmit)
}

errors.forEach((node) => console.warn(node.textContent))`,
    },
  },
  {
    id: 'javascript-addeventlistener',
    name: 'addEventListener',
    group: 'javascript',
    summary: 'Registers a function to run when an event of a given type reaches an element.',
    syntax: 'element.addEventListener("click", handler);',
    details: [
      'The handler receives the event object, which carries the target, type and any event-specific data.',
      'The same function and type can only be registered once per element, so use removeEventListener to undo it.',
      'Options accept a boolean for capture and an object such as { once: true } or { passive: true }.',
      'Add the listener to the element itself rather than to each child when several children share a handler.',
    ],
    example: {
      language: 'javascript',
      code: `const button = document.querySelector('#open')

function onClick(event) {
  console.log('clicked', event.currentTarget)
}

button.addEventListener('click', onClick, { once: true })
button.removeEventListener('click', onClick)`,
    },
  },
  {
    id: 'javascript-json',
    name: 'JSON',
    group: 'javascript',
    summary: 'A text format for structured data, with JSON.parse to read it and JSON.stringify to write it.',
    syntax: 'const data = JSON.parse(text); const text = JSON.stringify(data, null, 2);',
    details: [
      'JSON has six types: object, array, string, number, boolean and null. There is no undefined and no Date.',
      'JSON.parse throws on malformed input, so wrap it in a try/catch when reading stored or remote data.',
      'The second argument to JSON.stringify is a replacer function and the third controls indentation.',
      'Dates become strings on stringify and stay strings on parse, so convert them explicitly if you need Date objects.',
    ],
    example: {
      language: 'javascript',
      code: `const text = '{"name":"Ada","active":true}'

try {
  const user = JSON.parse(text)
  console.log(user.name)
} catch (error) {
  console.warn('Stored value was not valid JSON')
}

console.log(JSON.stringify({ b: 2, a: 1 }, null, 2))`,
    },
  },
  {
    id: 'javascript-console-log',
    name: 'console.log',
    group: 'javascript',
    summary: 'Prints a value to the developer console, and does nothing visible to the user.',
    syntax: 'console.log("label:", value);',
    details: [
      'Several values can be passed as separate arguments and are printed in order.',
      'console.error and console.warn go to different levels, which is how tooling separates real problems.',
      'The return value is undefined, so wrapping an expression in console.log inside a function removes its value.',
      'Logging every render in a loop is the fastest way to find a state update happening more often than you think.',
    ],
    example: {
      language: 'javascript',
      code: `const user = { name: 'Ada', tags: ['admin', 'author'] }

console.log('user:', user)
console.log('names:', user.tags.join(', '))
console.warn('this value is still in development')
console.error('something failed:', new Error('boom'))`,
    },
  },
  {
    id: 'javascript-template-literals',
    name: 'Template literals',
    group: 'javascript',
    summary: 'A string syntax using backticks that can embed expressions and span multiple lines.',
    syntax: '`Total: ${total} for ${count} items`',
    details: [
      'Expressions go inside ${...} and can be any expression, including a function call.',
      'Backslashes are escapes inside template literals, so a literal backslash needs doubling.',
      'A literal backtick is written \\` inside a template literal.',
      'They work for markup, which makes them the cleanest way to build a small piece of DOM.',
    ],
    example: {
      language: 'javascript',
      code: `const name = 'Ada'
const items = 3
const price = 9.99

const summary = \`\${name} bought \${items} items for \${(price * items).toFixed(2)}\`
const markup = \`
  <li class="row">
    <span>\${name}</span>
  </li>
\`

console.log(summary)
console.log(markup.trim())`,
    },
  },
]
