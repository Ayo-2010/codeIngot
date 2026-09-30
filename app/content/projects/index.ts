import type { Project } from '~/types/content'

export const projects: Project[] = [
  {
    id: 'project-profile-page',
    slug: 'personal-profile-page',
    title: 'Personal Profile Page',
    tagline: 'A single-page profile that is structured so well it works before a line of CSS is written.',
    summary:
      'Build a complete static profile page from an empty file: landmarks, an outline, media, a list of skills and a contact form. This project is deliberately HTML-only, because structure is the part of a page that is hardest to retrofit later.',
    difficulty: 'beginner',
    technologies: ['html', 'a11y'],
    estimatedMinutes: 60,
    xp: 260,
    brief: [
      'Plan the outline before you write markup: list every heading on the page in order, then turn each one into a section.',
      'Write the document skeleton first â€” doctype, language, title â€” and only then fill the body.',
      'Group the content with semantic landmarks so the page can be navigated without reading it top to bottom.',
      'Use real content: write three sentences about yourself rather than leaving placeholder text.',
      'Finish with a contact form in which every control has a label and a name.',
      'Read the page back in order and check the outline: one h1, no skipped levels, one main.',
    ],
    requirements: [
      'Start the file with a doctype and set the document language on the html element.',
      'Give the page a title in the head that describes the person, not the site.',
      'Include exactly one main element with the id "main".',
      'Use header, nav, footer, article and at least three section elements.',
      'Include at least three sections: About, Skills and Contact.',
      'Add a profile image with a descriptive alt attribute and explicit width and height.',
      'Include at least one unordered list of skills and one external link.',
      'Include a contact form with at least two labelled controls and a submit button.',
    ],
    checklist: [
      {
        id: 'pc-1',
        label: 'The page has a main landmark with the id "main"',
        verify: { kind: 'selector', selector: 'main#main', label: 'main#main' },
      },
      {
        id: 'pc-2',
        label: 'The page uses header, nav, footer, article and section landmarks',
        verify: { kind: 'selector', selector: 'header nav main article section footer', label: 'header, nav, main, article, section and footer' },
      },
      {
        id: 'pc-3',
        label: 'The profile image has a meaningful alt attribute',
        verify: { kind: 'selector', selector: 'img[alt]', label: 'an img with alt' },
      },
      {
        id: 'pc-4',
        label: 'The page lists skills in an unordered list',
        verify: { kind: 'selector', selector: 'ul li', label: 'a list with list items' },
      },
      {
        id: 'pc-5',
        label: 'The page contains a contact form with labelled controls',
        verify: { kind: 'selector', selector: 'form label input, form label textarea', label: 'a label beside a form control' },
      },
      {
        id: 'pc-6',
        label: 'The About section describes the person in real sentences',
        verify: { kind: 'text', needle: 'about', label: 'text about the person' },
      },
      {
        id: 'pc-7',
        label: 'The Skills section is a real list of technologies',
        verify: { kind: 'text', needle: 'skills', label: 'a skills section' },
      },
      {
        id: 'pc-8',
        label: 'Every image has dimensions and a lazy loading hint where it is below the fold',
        verify: { kind: 'manual', label: 'images have width, height and loading attributes' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Replace this with your name</title>
  </head>
  <body>
    <!-- Structure first: landmarks, then content. -->

    <main id="main">
      <!-- Add your sections here -->
    </main>

    <footer>
      <p>Replace with your own copyright line.</p>
    </footer>
  </body>
</html>
`,
    },
    designPreviewHtml: `<article class="profile">
  <img class="avatar" src="https://placehold.co/160x160/171c22/29e2bd?text=AR" alt="Portrait of Alex Rivera" width="160" height="160" />
  <div class="intro">
    <p class="eyebrow">Front-end developer</p>
    <h1>Alex Rivera</h1>
    <p class="lede">I build interfaces for people who use the web every day, and I care a great deal about the parts nobody notices until they break.</p>
    <div class="actions">
      <a class="btn" href="#contact">Get in touch</a>
      <a class="btn btn--ghost" href="#skills">What I use</a>
    </div>
  </div>
</article>

<section class="cards">
  <article class="card">
    <h3>About</h3>
    <p>Six years of shipping production front ends, mostly in the browser, occasionally on paper before a build.</p>
  </article>
  <article class="card">
    <h3>Skills</h3>
    <ul class="tags">
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
      <li>TypeScript</li>
    </ul>
  </article>
  <article class="card">
    <h3>Contact</h3>
    <p>Open to contract work and interesting problems.</p>
  </article>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0b0d10;
  color: #f4f7fa;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.profile {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 52rem;
  margin: 0 auto;
}

.avatar {
  border-radius: 50%;
  border: 1px solid #252c35;
}

.eyebrow {
  margin: 0;
  color: #29e2bd;
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0.25rem 0 0.5rem;
  font-size: 2rem;
}

.lede {
  margin: 0;
  color: #8b96a5;
  max-width: 44ch;
}

.actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn {
  padding: 0.55rem 1.05rem;
  border-radius: 6px;
  background: #29e2bd;
  color: #0b0d10;
  text-decoration: none;
  font-weight: 600;
}

.btn--ghost {
  background: transparent;
  color: #f4f7fa;
  border: 1px solid #252c35;
}

.cards {
  display: grid;
  gap: 1rem;
  max-width: 52rem;
  margin: 2.5rem auto 0;
}

@media (min-width: 640px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}

.card {
  padding: 1.25rem;
  background: #11151a;
  border: 1px solid #252c35;
  border-radius: 10px;
}

.card h3 {
  margin: 0 0 0.5rem;
  font-size: 1rem;
}

.card p {
  margin: 0;
  color: #8b96a5;
  font-size: 0.9rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.tags li {
  padding: 0.2rem 0.55rem;
  border: 1px solid #252c35;
  border-radius: 999px;
  font-size: 0.8rem;
}
`,
    solutionNote:
      'A strong solution writes the heading outline before any markup, keeps one main and one h1, and gives every form control a matching label. The visual result matters less than the fact that the page could be restyled completely without touching the HTML structure.',
  },
  {
    id: 'project-responsive-landing',
    slug: 'responsive-landing-page',
    title: 'Responsive Landing Page',
    tagline: 'A product page that reflows cleanly from a 360px phone to a wide desktop.',
    summary:
      'Build a marketing page for a small product and make it hold up at every width. You will write the layout with flexbox and grid, add a breakpoint where the design genuinely needs one, and prove it with a media query rather than a pile of magic numbers.',
    difficulty: 'beginner',
    technologies: ['html', 'css'],
    estimatedMinutes: 120,
    xp: 380,
    brief: [
      'Write the section list first â€” hero, features, pricing, call to action â€” and give each one an id so the nav can link to it.',
      'Start mobile-first: write the single-column layout with no media query at all.',
      'Add a container that keeps line length readable on very wide screens.',
      'Use grid for the feature and pricing areas so the columns are described in one declaration.',
      'Add one breakpoint around 720px and only change the properties that actually need to change.',
      'Test by dragging the preview narrower and wider, and by shrinking the window, until nothing overflows.',
    ],
    requirements: [
      'Include a header with a logo link and an in-page navigation list.',
      'Include a hero section with a heading, one sentence of supporting text and a primary button.',
      'Include at least three feature cards laid out with CSS grid.',
      'Include a pricing section with at least two plans.',
      'Include a closing call-to-action section and a footer.',
      'Use a max-width container and centred content so text does not run edge to edge.',
      'Include at least one media query that changes the layout below or above 720px.',
      'Add a visible focus style for links and buttons, and respect reduced motion if you add transitions.',
    ],
    checklist: [
      {
        id: 'lc-1',
        label: 'The page has header, nav, main, at least three sections and a footer',
        verify: { kind: 'selector', selector: 'header nav main section footer', label: 'header, nav, main, section and footer' },
      },
      {
        id: 'lc-2',
        label: 'The feature area is laid out with grid',
        verify: { kind: 'css-rule', needle: 'display: grid', label: 'a display: grid rule' },
      },
      {
        id: 'lc-3',
        label: 'A media query changes the layout at a breakpoint',
        verify: { kind: 'css-rule', needle: '@media', label: 'an @media query' },
      },
      {
        id: 'lc-4',
        label: 'The feature and pricing areas both use the grid rule',
        verify: { kind: 'css-rule', needle: 'grid-template-columns', label: 'a grid-template-columns rule' },
      },
      {
        id: 'lc-5',
        label: 'The call-to-action and pricing sections are written in the page',
        verify: { kind: 'text', needle: 'pricing', label: 'a pricing section' },
      },
      {
        id: 'lc-6',
        label: 'Buttons and links have a visible focus style',
        verify: { kind: 'css-rule', needle: ':focus-visible', label: 'a :focus-visible rule' },
      },
      {
        id: 'lc-7',
        label: 'Content is constrained by a max-width container',
        verify: { kind: 'css-rule', needle: 'max-width', label: 'a max-width rule' },
      },
      {
        id: 'lc-8',
        label: 'Nothing overflows horizontally at 360px or 1440px',
        verify: { kind: 'manual', label: 'no horizontal scrolling at 360px or 1440px' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Product name â€” the small thing that does one job well</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="logo" href="#top">Product name</a>
      <nav class="site-nav" aria-label="Main">
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#start">Get started</a>
      </nav>
    </header>

    <main id="top">
      <!-- Write the hero, features, pricing and call to action here -->
    </main>

    <footer class="site-footer">
      <p>Copyright 2026 Product name</p>
    </footer>
  </body>
</html>
`,
      css: `/* Mobile-first: write the single-column layout first, then add breakpoints. */

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
`,
    },
    designPreviewHtml: `<header class="site-header">
  <a class="logo" href="#top">Ledger</a>
  <nav class="site-nav">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
    <a class="btn" href="#start">Start free</a>
  </nav>
</header>

<section class="hero">
  <p class="eyebrow">Bookkeeping for one person</p>
  <h1>Know where every euro went, without a spreadsheet.</h1>
  <p class="lede">Ledger turns your bank feed into a plain monthly summary. No categories to configure, no reports to build.</p>
  <div class="actions">
    <a class="btn" href="#start">Start free</a>
    <a class="btn btn--ghost" href="#features">See how it works</a>
  </div>
</section>

<section class="features">
  <article class="card">
    <h3>Automatic import</h3>
    <p>Connect a read-only bank link and forget about it.</p>
  </article>
  <article class="card">
    <h3>One summary</h3>
    <p>A single screen showing what came in and what went out.</p>
  </article>
  <article class="card">
    <h3>No lock-in</h3>
    <p>Export everything as CSV whenever you want.</p>
  </article>
</section>

<section class="pricing">
  <article class="plan">
    <h3>Free</h3>
    <p class="price">0</p>
    <p>One account, monthly summary.</p>
  </article>
  <article class="plan plan--featured">
    <h3>Plus</h3>
    <p class="price">6</p>
    <p>Unlimited accounts, weekly digest, exports.</p>
  </article>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  background: #0b0d10;
  color: #f4f7fa;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #252c35;
}

.logo {
  color: #29e2bd;
  font-weight: 700;
  text-decoration: none;
}

.site-nav {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
}

.site-nav a {
  color: #8b96a5;
  text-decoration: none;
}

.site-nav a:hover { color: #f4f7fa; }

.hero,
.features,
.pricing {
  max-width: 60rem;
  margin: 0 auto;
  padding: 3rem 1.25rem;
}

.eyebrow {
  margin: 0;
  color: #29e2bd;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0.4rem 0 0.75rem;
  font-size: 2.1rem;
  line-height: 1.2;
}

.lede {
  margin: 0;
  max-width: 52ch;
  color: #8b96a5;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.55rem 1.1rem;
  border-radius: 6px;
  background: #29e2bd;
  color: #0b0d10;
  font-weight: 600;
  text-decoration: none;
}

.btn--ghost {
  background: transparent;
  border: 1px solid #252c35;
  color: #f4f7fa;
}

.features {
  display: grid;
  gap: 1rem;
  padding-top: 0;
}

.card,
.plan {
  padding: 1.25rem;
  background: #11151a;
  border: 1px solid #252c35;
  border-radius: 10px;
}

.card h3,
.plan h3 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
}

.card p,
.plan p {
  margin: 0;
  color: #8b96a5;
  font-size: 0.9rem;
}

.plan .price {
  margin: 0.2rem 0 0.6rem;
  color: #f4f7fa;
  font-size: 2rem;
  font-weight: 700;
}

.pricing {
  display: grid;
  gap: 1rem;
  padding-top: 0;
}

.plan--featured {
  border-color: #29e2bd;
}

@media (min-width: 720px) {
  .features { grid-template-columns: repeat(3, 1fr); }
  .pricing { grid-template-columns: repeat(2, 1fr); }
}
`,
    solutionNote:
      'A strong solution writes the narrow layout first and adds exactly one breakpoint that changes columns and spacing. It also constrains the text column with a max-width, and it never hides content on small screens â€” only reflows it.',
  },
  {
    id: 'project-interactive-calculator',
    slug: 'interactive-calculator',
    title: 'Interactive Calculator',
    tagline: 'A working calculator built from a display, a keypad and a small amount of deliberate JavaScript.',
    summary:
      'Turn static buttons into a calculator that actually computes. The exercise is not the arithmetic, it is deciding where state lives, routing button presses through one handler, and dealing with the two mistakes every calculator makes: repeated operators and repeated decimals.',
    difficulty: 'intermediate',
    technologies: ['html', 'css', 'javascript'],
    estimatedMinutes: 150,
    xp: 440,
    brief: [
      'Decide where the three pieces of state live: the display text, the number being typed, and the pending operator.',
      'Give every button a data-action attribute so one click handler can serve the whole keypad.',
      'Write a single evaluate function instead of four near-identical operator branches.',
      'Handle the edge cases explicitly: a second press of the same operator, more than one decimal point, and clearing mid-calculation.',
      'Make the display readable: large numerals, right aligned, and visible even when the value is long.',
    ],
    requirements: [
      'A display element that shows the current value.',
      'Number buttons 0 to 9, a decimal point, and the four operators.',
      'An equals button, a clear button and a delete button.',
      'Every button uses type="button" so none of them submit a form by accident.',
      'One click listener that switches on the button action attribute.',
      'A second operator press replaces the pending operator instead of chaining two of them.',
      'The decimal point can only appear once per number.',
      'Clear resets every piece of state and empties the display.',
    ],
    checklist: [
      {
        id: 'cc-1',
        label: 'The calculator has a display and a keypad of buttons',
        verify: { kind: 'selector', selector: '.display, #display', label: 'a display element' },
      },
      {
        id: 'cc-2',
        label: 'There are at least sixteen buttons',
        verify: { kind: 'selector', selector: 'button', label: 'at least 16 buttons' },
      },
      {
        id: 'cc-3',
        label: 'One click listener serves the keypad',
        verify: { kind: 'js-call', needle: 'addeventlistener', label: 'an addEventListener call' },
      },
      {
        id: 'cc-4',
        label: 'The keypad is laid out with grid',
        verify: { kind: 'css-rule', needle: 'display: grid', label: 'a display: grid rule' },
      },
      {
        id: 'cc-5',
        label: 'The calculator selects its elements with querySelector',
        verify: { kind: 'js-call', needle: 'queryselector', label: 'a querySelector call' },
      },
      {
        id: 'cc-6',
        label: 'The display reads right aligned and stays readable when the value is long',
        verify: { kind: 'css-rule', needle: 'text-align', label: 'a text-align rule' },
      },
      {
        id: 'cc-7',
        label: 'Pressing two operators in a row replaces the first operator',
        verify: { kind: 'manual', label: 'pressing 5 + * then 4 gives an error or replaces the operator, never two operators in a row' },
      },
      {
        id: 'cc-8',
        label: 'Division by zero and a second decimal point are both handled',
        verify: { kind: 'manual', label: 'dividing by zero and typing 1.2.3 both behave sensibly' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="calculator">
      <output id="display" class="display" aria-live="polite">0</output>

      <div class="keypad">
        <!-- Buttons carry data-action so one handler can serve them all. -->
      </div>
    </main>

    <script src="script.js"></script>
  </body>
</html>
`,
      css: `.calculator {
  max-width: 20rem;
  margin: 3rem auto;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* Write the display and keypad rules here. */
`,
      javascript: `const display = document.querySelector('#display');
const keypad = document.querySelector('.keypad');

let current = '0';
let previous = null;
let operator = null;

// Build the buttons, attach one listener, and write the calculate logic here.
`,
    },
    designPreviewHtml: `<div class="calc">
  <output class="calc-display">1024</output>
  <div class="calc-keys">
    <button type="button" class="key key--fn">AC</button>
    <button type="button" class="key key--fn">DEL</button>
    <button type="button" class="key key--fn">%</button>
    <button type="button" class="key key--op">/</button>

    <button type="button" class="key">7</button>
    <button type="button" class="key">8</button>
    <button type="button" class="key">9</button>
    <button type="button" class="key key--op">*</button>

    <button type="button" class="key">4</button>
    <button type="button" class="key">5</button>
    <button type="button" class="key">6</button>
    <button type="button" class="key key--op">-</button>

    <button type="button" class="key">1</button>
    <button type="button" class="key">2</button>
    <button type="button" class="key">3</button>
    <button type="button" class="key key--op">+</button>

    <button type="button" class="key key--wide">0</button>
    <button type="button" class="key">.</button>
    <button type="button" class="key key--eq">=</button>
  </div>
</div>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0b0d10;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.calc {
  max-width: 20rem;
  margin: 0 auto;
  padding: 1rem;
  background: #11151a;
  border: 1px solid #252c35;
  border-radius: 14px;
}

.calc-display {
  display: block;
  padding: 1rem 0.5rem;
  color: #f4f7fa;
  font-size: 2.2rem;
  text-align: right;
  letter-spacing: 0.02em;
  overflow-wrap: anywhere;
}

.calc-keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}

.key {
  padding: 0.9rem 0;
  border: 1px solid #252c35;
  border-radius: 8px;
  background: #171c22;
  color: #f4f7fa;
  font: inherit;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background-color 120ms ease;
}

.key:hover { background: #202832; }
.key--fn { color: #8b96a5; }
.key--op { color: #29e2bd; }
.key--eq { background: #29e2bd; color: #0b0d10; font-weight: 700; }
.key--wide { grid-column: span 2; }
`,
    solutionNote:
      'A strong solution keeps three pieces of state, routes every press through one listener that switches on the button action, and computes the result in a single function. It also guards the decimal point and division by zero, and it disables nothing a keyboard user needs â€” every button is a real button.',
  },
  {
    id: 'project-todo-application',
    slug: 'todo-application',
    title: 'Todo Application',
    tagline: 'Add, complete, filter and delete tasks â€” and still find them all after closing the tab.',
    summary:
      'Build a task list that persists to localStorage, which means the real work is in the data layer rather than the buttons. You will also deal with the part most tutorials skip: rendering from state on every change instead of mutating the DOM in five different places.',
    difficulty: 'intermediate',
    technologies: ['html', 'css', 'javascript'],
    estimatedMinutes: 180,
    xp: 500,
    brief: [
      'Give each task a stable id and a done flag. Decide whether you need a title, a created date or both.',
      'Keep one array of tasks as the source of truth and derive the visible list from it.',
      'Write one render function that rebuilds the list from the array, and call it after every change.',
      'Persist on every mutation by writing JSON.stringify(tasks) to localStorage under one key.',
      'On load, read that key back and fall back to an empty list if it is missing or corrupt.',
      'Add three filters â€” all, active, completed â€” and mark the current one with aria-pressed.',
    ],
    requirements: [
      'An input for the task text, an add button, and a list to show the tasks.',
      'Every task has an id, a title and a done flag.',
      'One click handler toggles done, one removes, and both go through the same update function.',
      'Three filters: all, active and completed, with the active filter marked for assistive technology.',
      'A live count of how many tasks remain.',
      'Tasks are saved to localStorage as JSON under a single well-named key.',
      'The list is restored on load, and a corrupt value falls back to an empty array instead of throwing.',
      'An empty state message appears when there is nothing to show.',
    ],
    checklist: [
      {
        id: 'tc-1',
        label: 'The page has an input, an add button, a filter set and a list',
        verify: { kind: 'selector', selector: 'input ul, input ol', label: 'an input and a list' },
      },
      {
        id: 'tc-2',
        label: 'Tasks are stored in localStorage under a single key',
        verify: { kind: 'js-call', needle: 'localstorage', label: 'a localStorage access' },
      },
      {
        id: 'tc-3',
        label: 'Tasks are serialised with JSON.stringify',
        verify: { kind: 'js-call', needle: 'json.stringify', label: 'a JSON.stringify call' },
      },
      {
        id: 'tc-4',
        label: 'State is parsed with JSON.parse on load',
        verify: { kind: 'js-call', needle: 'json.parse', label: 'a JSON.parse call' },
      },
      {
        id: 'tc-5',
        label: 'Button clicks are handled with addEventListener',
        verify: { kind: 'js-call', needle: 'addeventlistener', label: 'an addEventListener call' },
      },
      {
        id: 'tc-6',
        label: 'The list is rendered from an array, and completed items are styled differently',
        verify: { kind: 'css-rule', needle: 'text-decoration', label: 'a text-decoration rule for completed tasks' },
      },
      {
        id: 'tc-7',
        label: 'There is a visible count of remaining tasks',
        verify: { kind: 'text', needle: 'left', label: 'a "left" counter' },
      },
      {
        id: 'tc-8',
        label: 'Reloading the page restores the tasks, and a corrupt value does not break the app',
        verify: { kind: 'manual', label: 'reload keeps the tasks; a broken stored value falls back to an empty list' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="todo">
      <h1>Todo</h1>

      <form class="todo-form">
        <label for="task-input">New task</label>
        <input id="task-input" name="task" type="text" autocomplete="off" />
        <button type="submit">Add task</button>
      </form>

      <div class="filters">
        <button type="button" data-filter="all" aria-pressed="true">All</button>
        <button type="button" data-filter="active" aria-pressed="false">Active</button>
        <button type="button" data-filter="completed" aria-pressed="false">Completed</button>
      </div>

      <ul class="todo-list"></ul>

      <p class="todo-count">0 tasks left</p>
      <p class="todo-empty" hidden>Nothing here yet.</p>
    </main>

    <script src="script.js"></script>
  </body>
</html>
`,
      css: `.todo {
  max-width: 34rem;
  margin: 3rem auto;
  padding: 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Write the list item, filter and completed-state rules here. */
`,
      javascript: `const STORAGE_KEY = 'codeingot.todos';

const form = document.querySelector('.todo-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('.todo-list');
const countEl = document.querySelector('.todo-count');
const emptyEl = document.querySelector('.todo-empty');
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));

let tasks = load();
let filter = 'all';

function load() {
  // Read STORAGE_KEY, JSON.parse it, and return [] if anything goes wrong.
}

function save() {
  // Write tasks back to STORAGE_KEY.
}

function visibleTasks() {
  // Return the tasks that match the current filter.
}

function render() {
  // Rebuild the list and the counter from state.
}

function update(id, changes) {
  // Apply a change, save, and re-render.
}

// Wire the form, the list and the filter buttons here.
`,
    },
    designPreviewHtml: `<section class="todo">
  <h1>Todo</h1>

  <form class="todo-form">
    <input class="todo-input" type="text" placeholder="What needs doing?" aria-label="New task" />
    <button class="todo-add" type="button">Add</button>
  </form>

  <div class="filters">
    <button class="chip is-active" type="button">All</button>
    <button class="chip" type="button">Active</button>
    <button class="chip" type="button">Completed</button>
  </div>

  <ul class="todo-list">
    <li class="todo-item">
      <span class="todo-check" aria-hidden="true"></span>
      <span class="todo-text">Read the DOM reference</span>
    </li>
    <li class="todo-item is-done">
      <span class="todo-check" aria-hidden="true"></span>
      <span class="todo-text">Ship the profile page</span>
    </li>
    <li class="todo-item">
      <span class="todo-check" aria-hidden="true"></span>
      <span class="todo-text">Review the calculator</span>
    </li>
  </ul>

  <p class="todo-count">2 tasks left</p>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0b0d10;
  color: #f4f7fa;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.5;
}

.todo {
  max-width: 34rem;
  margin: 0 auto;
}

h1 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}

.todo-form {
  display: flex;
  gap: 0.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid #252c35;
  border-radius: 8px;
  background: #11151a;
  color: #f4f7fa;
  font: inherit;
}

.todo-add {
  padding: 0.6rem 1.1rem;
  border: 0;
  border-radius: 8px;
  background: #29e2bd;
  color: #0b0d10;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin: 1.25rem 0;
}

.chip {
  padding: 0.3rem 0.75rem;
  border: 1px solid #252c35;
  border-radius: 999px;
  background: transparent;
  color: #8b96a5;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}

.chip.is-active {
  border-color: #29e2bd;
  color: #29e2bd;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid #252c35;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.25rem;
  border-bottom: 1px solid #252c35;
}

.todo-check {
  width: 1.1rem;
  height: 1.1rem;
  flex: none;
  border: 1px solid #3a4451;
  border-radius: 4px;
}

.is-done .todo-check {
  border-color: #29e2bd;
  background: #29e2bd;
}

.is-done .todo-text {
  color: #6f7986;
  text-decoration: line-through;
}

.todo-count {
  margin: 0.9rem 0 0;
  color: #8b96a5;
  font-size: 0.85rem;
}
`,
    solutionNote:
      'A strong solution treats the array as the only source of truth: every interaction mutates state, then saves and re-renders, so the DOM is never patched by hand. It parses the stored value inside a try/catch, gives each task a unique id, and keeps the filter state so a reload still shows the same view.',
  },
  {
    id: 'project-quiz-application',
    slug: 'quiz-application',
    title: 'Quiz Application',
    tagline: 'Present questions from data, score the answers and show the result with a review of what went wrong.',
    summary:
      'Build a quiz driven by a data file rather than by hand-written markup, which makes the interesting part clear: advancing through questions, locking answered ones, and reporting the result in a way that teaches rather than just scoring.',
    difficulty: 'intermediate',
    technologies: ['html', 'css', 'javascript'],
    estimatedMinutes: 150,
    xp: 420,
    brief: [
      'Write the questions as a data array first, then write the markup that renders one question at a time.',
      'Keep an index into the question array rather than duplicating question markup in the HTML.',
      'Lock a question once it is answered: disable the options and mark the chosen one.',
      'Move to the next question with a single function that either accepts the answer or advances the index.',
      'On the last question, show a results screen with the score, a percentage and one line of explanation per question.',
      'Add a restart that resets the index, the answers and the DOM.',
    ],
    requirements: [
      'A question area that shows the current question text and its options.',
      'At least five questions held in a JavaScript array, not in the markup.',
      'Options are buttons that mark the question answered when chosen.',
      'The current question number and a score are both visible.',
      'The last screen shows the score, the percentage and a per-question review.',
      'Restart resets the index, the answers array and the rendered question.',
      'Answers are locked once chosen, and the correct option is visually distinguished.',
      'The quiz is operable entirely with the keyboard.',
    ],
    checklist: [
      {
        id: 'qc-1',
        label: 'The page shows a question area, an options area and a result area',
        verify: { kind: 'selector', selector: '.question, #question', label: 'a question element' },
      },
      {
        id: 'qc-2',
        label: 'Options are rendered from a data array',
        verify: { kind: 'js-call', needle: 'foreach', label: 'a forEach or for loop over the questions' },
      },
      {
        id: 'qc-3',
        label: 'Option clicks are handled with addEventListener',
        verify: { kind: 'js-call', needle: 'addeventlistener', label: 'an addEventListener call' },
      },
      {
        id: 'qc-4',
        label: 'Correct and incorrect answers are styled differently',
        verify: { kind: 'css-rule', needle: 'correct', label: 'a class for correct answers' },
      },
      {
        id: 'qc-5',
        label: 'The progress is shown as text',
        verify: { kind: 'text', needle: 'question', label: 'a question counter' },
      },
      {
        id: 'qc-6',
        label: 'The progress bar is styled with a transition',
        verify: { kind: 'css-rule', needle: 'transition', label: 'a transition rule' },
      },
      {
        id: 'qc-7',
        label: 'Restart resets the index, the answers and the rendered question',
        verify: { kind: 'js-call', needle: 'reset', label: 'a reset function' },
      },
      {
        id: 'qc-8',
        label: 'A finished quiz shows the score, the percentage and a per-question review',
        verify: { kind: 'manual', label: 'the results screen shows the score, the percentage and an explanation per question' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quiz</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="quiz">
      <header class="quiz-header">
        <h1>JavaScript basics quiz</h1>
        <p class="quiz-progress">Question 1 of 5</p>
      </header>

      <div class="bar"><div class="bar-fill"></div></div>

      <section class="question-area">
        <h2 class="question-text">Loading questionâ€¦</h2>
        <div class="options"></div>
        <p class="feedback" role="status"></p>
      </section>

      <section class="results" hidden>
        <h2 class="results-title">Results</h2>
        <p class="results-score"></p>
        <ol class="review"></ol>
        <button class="restart" type="button">Try again</button>
      </section>
    </main>

    <script src="script.js"></script>
  </body>
</html>
`,
      css: `.quiz {
  max-width: 36rem;
  margin: 3rem auto;
  padding: 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.options {
  display: grid;
  gap: 0.6rem;
}

/* Write the option, feedback and results rules here. */
`,
      javascript: `const questions = [
  {
    prompt: 'Which method returns a new array of the items that pass a test?',
    options: ['map', 'filter', 'reduce', 'forEach'],
    answer: 1,
    explanation: 'filter keeps the items for which the callback returned true, in a new array.'
  },
  // Add at least five questions in this shape.
];

const questionTextEl = document.querySelector('.question-text');
const optionsEl = document.querySelector('.options');
const feedbackEl = document.querySelector('.feedback');
const progressEl = document.querySelector('.quiz-progress');

let index = 0;
let answers = [];

function renderQuestion() {
  // Render the current question and its options.
}

function answer(optionIndex) {
  // Record the answer, lock the options, show feedback.
}

function next() {
  // Advance the index, or show the results screen on the last question.
}

function restart() {
  // Reset index, answers and the interface.
}

// Wire up the options container, the next button and the restart button.
`,
    },
    designPreviewHtml: `<section class="quiz">
  <header class="quiz-head">
    <h1>JavaScript basics quiz</h1>
    <p class="quiz-progress">Question 3 of 5</p>
  </header>

  <div class="bar"><span class="bar-fill" style="width: 60%"></span></div>

  <h2 class="quiz-question">Which method returns a new array of only the items that pass a test?</h2>

  <div class="options">
    <button class="option" type="button">map</button>
    <button class="option is-correct" type="button">filter</button>
    <button class="option is-wrong" type="button">reduce</button>
    <button class="option" type="button">forEach</button>
  </div>

  <p class="feedback is-correct">Correct. filter keeps the items for which the callback returned true, in a new array.</p>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0b0d10;
  color: #f4f7fa;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.quiz {
  max-width: 36rem;
  margin: 0 auto;
}

.quiz-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

h1 {
  margin: 0;
  font-size: 1.35rem;
}

.quiz-progress {
  margin: 0;
  color: #8b96a5;
  font-size: 0.85rem;
}

.bar {
  height: 4px;
  margin: 1rem 0 1.75rem;
  border-radius: 999px;
  background: #171c22;
  overflow: hidden;
}

.bar-fill {
  display: block;
  height: 100%;
  width: 40%;
  border-radius: 999px;
  background: #29e2bd;
  transition: width 250ms ease;
}

.quiz-question {
  margin: 0 0 1rem;
  font-size: 1.1rem;
  line-height: 1.4;
}

.options {
  display: grid;
  gap: 0.6rem;
}

.option {
  padding: 0.75rem 0.9rem;
  border: 1px solid #252c35;
  border-radius: 8px;
  background: #11151a;
  color: #f4f7fa;
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 120ms ease, background-color 120ms ease;
}

.option:hover:not([disabled]) {
  border-color: #3a4451;
  background: #171c22;
}

.option[disabled] {
  cursor: default;
}

.is-correct {
  border-color: #29e2bd;
  background: rgba(41, 226, 189, 0.12);
}

.is-wrong {
  border-color: #d9534f;
  background: rgba(217, 83, 79, 0.12);
}

.feedback {
  margin: 1.1rem 0 0;
  padding: 0.75rem 0.9rem;
  border-left: 3px solid #252c35;
  border-radius: 0 8px 8px 0;
  background: #11151a;
  color: #8b96a5;
  font-size: 0.9rem;
}

.feedback.is-correct {
  border-left-color: #29e2bd;
}
`,
    solutionNote:
      'A strong solution stores the questions as data, renders one question from an index, disables the options once an answer is recorded, and explains the answer either way. The results screen shows a percentage and walks through every question, so the quiz teaches on a wrong answer rather than only when it is finished.',
  },
]
