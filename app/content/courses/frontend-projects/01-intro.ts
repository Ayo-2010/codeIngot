import type { Section } from '~/types/content'

export const frontendProjectsSections: Section[] = [
  {
    id: 'fp-s1',
    title: 'Project foundations',
    description:
      'How to take a project from a design and a brief to a structured, styled, working page — and the habits that keep a build maintainable.',
    lessons: [
      {
        id: 'fp-l1',
        title: 'Project planning and structure',
        description: 'Breaking a design into HTML, CSS, and JavaScript, and setting up a maintainable folder.',
        duration: 4,
        objectives: [
          'Read a design and list the components and sections it contains',
          'Set up a project structure with html, css, js folders',
          'Set up a dev server with livereload for fast iteration',
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'fp-l1-intro',
            body: '**Project planning and structure.** Every project on this path starts the same way: a picture of what the page should look like and a sentence about what it must do. Before a line of markup, turn both into a plan — an inventory of the pieces on the page, and a folder that will still make sense in a month.',
          },
          {
            type: 'text',
            id: 'fp-l1-b2',
            body: 'The inventory is three lists. **Sections** are the large regions of the page: a header, a hero, a gallery, a footer. **Components** are the pieces that repeat inside them: a card, a button, a form field. **Behaviour** is everything that changes after the page loads: a menu that opens, a filter that hides rows, a form that checks itself. Writing the three lists before you start is what turns a daunting brief into a sequence of small, obvious steps.',
          },
          {
            type: 'heading',
            id: 'fp-l1-h1',
            level: 3,
            body: 'The three lists',
          },
          {
            type: 'list',
            id: 'fp-l1-list',
            style: 'bullet',
            items: [
              '**Sections** — header, hero, gallery, footer. Each one becomes a single landmark element in the HTML.',
              '**Components** — card, button, field, badge. Each one becomes one class and one reusable block of markup.',
              '**Behaviour** — menu, filter, validate. Each one becomes a small, separate piece of JavaScript.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l1-h2',
            level: 3,
            body: 'A folder where each file has one job',
          },
          {
            type: 'code',
            id: 'fp-l1-code',
            language: 'plaintext',
            title: 'One job per file',
            code: `project/
  index.html      the content and its structure
  css/
    reset.css     normalise the browser defaults
    main.css      the site's own rules
  js/
    main.js       behaviour, loaded with defer
  img/
    portrait.jpg`,
          },
          {
            type: 'text',
            id: 'fp-l1-b3',
            body: 'The names say what each file is for, and the separation is what lets you change one without touching the others. A stylesheet loaded from `css/main.css` is cached by the browser and reused on every page; a behaviour file loaded with `defer` runs after the document is parsed, so it can find the elements it needs without a `DOMContentLoaded` wrapper.',
          },
          {
            type: 'heading',
            id: 'fp-l1-h3',
            level: 3,
            body: 'Start with the landmarks',
          },
          {
            type: 'text',
            id: 'fp-l1-b5',
            body: 'The first thing a page gets is not styling — it is an outline. A region becomes a landmark when it uses the matching semantic element, and landmarks are what let a screen reader user jump straight to the navigation or the main content instead of reading everything from the top.',
          },
          {
            type: 'code',
            id: 'fp-l1-code2',
            language: 'html',
            title: 'The outline, before any CSS',
            code: `<header>
  <p class="brand">Ingot Times</p>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <h1>Release notes</h1>
  <p>A short summary of what shipped this week.</p>
</main>

<footer>
  <p>Copyright 2026</p>
</footer>`,
          },
          {
            type: 'warning',
            id: 'fp-l1-warn',
            title: 'A div says nothing',
            body: 'A page built from `div` elements works for anyone using a mouse and a pair of eyes. It gives a screen reader no landmarks, an assistive tool no structure, and the next developer no clue which box is which. The outline above is not extra work — it is the same tags, chosen for what they mean.',
          },
          {
            type: 'tip',
            id: 'fp-l1-tip',
            title: 'Serve the folder, do not open the file',
            body: 'Opening `index.html` from the file system works until the page uses a module, a `fetch`, or a service worker — then the browser blocks it. Run a local server (`npx serve`, the Live Server extension, or `python -m http.server`) and the page loads over HTTP with live reload.',
          },
          {
            type: 'heading',
            id: 'fp-l1-h4',
            level: 3,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l1-b4',
            body: 'Take the pile of boxes below and give it the landmark outline every project starts from.',
          },
          {
            type: 'exercise',
            id: 'fp-l1-x1',
            exercise: {
              id: 'ex-fp-l1',
              instructions:
                'Turn the page built from divs into a landmark outline. The brand and the links belong together at the top in a header, with the links inside a nav. The heading and its paragraph are the page content, and belong in a main. The copyright line belongs in a footer.',
              languages: ['html'],
              starterCode: {
                html: `<div class="top">
  <div class="brand">Ingot Times</div>
</div>
<div class="menu">
  <a href="/">Home</a>
  <a href="/about">About</a>
</div>
<div class="content">
  <h1>Release notes</h1>
  <p>A short summary of what shipped this week.</p>
</div>
<div class="bottom">
  <p>Copyright 2026</p>
</div>
`,
              },
              tests: [
                {
                  id: 'ex-fp-l1-t1',
                  label: 'the banner is a header',
                  body: "return document.querySelector('header') !== null",
                },
                {
                  id: 'ex-fp-l1-t2',
                  label: 'the links live in a nav',
                  body: "return document.querySelector('nav') !== null",
                },
                {
                  id: 'ex-fp-l1-t3',
                  label: 'the content is inside main',
                  body: "return document.querySelector('main') !== null",
                },
                {
                  id: 'ex-fp-l1-t4',
                  label: 'the copyright line is a footer',
                  body: "return document.querySelector('footer') !== null",
                },
                {
                  id: 'ex-fp-l1-t5',
                  label: 'the brand sits inside the header',
                  body: "const header = document.querySelector('header'); return !!header && /Ingot Times/.test(header.textContent)",
                },
                {
                  id: 'ex-fp-l1-t6',
                  label: 'the nav holds both links',
                  body: "return document.querySelectorAll('nav a').length >= 2",
                },
                {
                  id: 'ex-fp-l1-t7',
                  label: 'the heading and paragraph are inside main',
                  body: "const main = document.querySelector('main'); return !!main && !!main.querySelector('h1') && !!main.querySelector('p')",
                },
              ],
              hints: [
                'The brand and the navigation belong in the same top region, so they share one `<header>`.',
                'The links go inside a `<nav>`; the nav can sit inside the header.',
                'The heading and paragraph are the page content — one `<main>` holds both, and the copyright line becomes a `<footer>`.',
              ],
              solution: {
                html: `<header>
  <p class="brand">Ingot Times</p>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <h1>Release notes</h1>
  <p>A short summary of what shipped this week.</p>
</main>
<footer>
  <p>Copyright 2026</p>
</footer>
`,
              },
              testNotes:
                'The last test checks that the heading and its paragraph moved inside main, not just that a main exists — the content has to end up in the right region, not merely somewhere on the page.',
            },
          },
        ],
      },
      {
        id: 'fp-l2',
        title: 'Building the first project from scratch',
        description: 'Taking a design from idea to a working project, step by step.',
        duration: 8,
        objectives: [
          'Write the HTML structure before any styling',
          'Apply CSS grid for the main layout',
          'Wire up interactivity with progressive enhancement',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'fp-l2-intro',
            body: '**Content, then looks, then behaviour.** The order is not a style preference. HTML that is complete and correct works before a single rule of CSS exists — it is readable, scrollable and selectable. Layered on top of that, CSS changes how it looks without changing what it says. JavaScript goes last, and only for what the first two cannot do.',
          },
          {
            type: 'text',
            id: 'fp-l2-b2',
            body: 'This is where the first project begins: a single-page profile. It has a portrait, a name and a role, and a link to more of the person\'s work. The whole page is small enough to hold in your head, which is exactly why it is the right place to practise the order — every project after this one uses the same sequence on a larger scale.',
          },
          {
            type: 'heading',
            id: 'fp-l2-h1',
            level: 3,
            body: 'The finished card',
          },
          {
            type: 'demo',
            id: 'fp-l2-d1',
            title: 'A profile card, built from content outward',
            body: 'A figure with a real image, a caption holding the name as the page heading, and a single link. The image carries alt text; the name is an `h1`, not a styled `div`.',
            html: `<figure class="profile">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' fill='%23c7d2fe'/%3E%3Ccircle cx='60' cy='46' r='20' fill='%236366f1'/%3E%3Crect x='30' y='74' width='60' height='34' rx='16' fill='%236366f1'/%3E%3C/svg%3E" alt="Portrait of Ada Lovelace" width="120" height="120">
  <figcaption>
    <h1>Ada Lovelace</h1>
    <p class="role">Frontend engineer</p>
  </figcaption>
  <p><a href="#work">Read more about Ada</a></p>
</figure>`,
            css: `body { font-family: system-ui, sans-serif; line-height: 1.5; margin: 0; padding: 1rem; }
.profile { margin: 0; max-width: 22rem; }
.profile img { display: block; border-radius: 0.75rem; }
h1 { font-size: 1.25rem; margin: 0.75rem 0 0.25rem; }
.role { margin: 0; color: #475569; }
a { color: #0f766e; }`,
          },
          {
            type: 'heading',
            id: 'fp-l2-h2',
            level: 3,
            body: 'The markup, before any CSS',
          },
          {
            type: 'code',
            id: 'fp-l2-code',
            language: 'html',
            title: 'Structure first',
            code: `<figure class="profile">
  <img src="img/portrait.jpg" alt="Portrait of Ada Lovelace" width="160" height="160">
  <figcaption>
    <h1>Ada Lovelace</h1>
    <p class="role">Frontend engineer</p>
  </figcaption>
  <p><a href="#work">Read more about Ada</a></p>
</figure>`,
          },
          {
            type: 'text',
            id: 'fp-l2-b3',
            body: 'Read that as a sentence and it is the whole page: a figure containing a portrait, a caption with the name and role, and a link. The `width` and `height` attributes are not decoration — they tell the browser how much room to reserve, so the text does not jump when the image finishes loading.',
          },
          {
            type: 'list',
            id: 'fp-l2-list',
            style: 'ordered',
            items: [
              'Write every element the content needs, with no styling at all.',
              'Add the stylesheet and style block by block: the type first, then the spacing, then the layout.',
              'Add a little behaviour only where the page genuinely cannot work without it.',
              'Check the page at a narrow width before you check it at a wide one.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l2-warn',
            title: 'Styling a structure that is wrong',
            body: 'A CSS problem is easy to see and easy to fix. A structure problem is invisible until someone using a screen reader, a search engine, or a phone keyboard runs into it. If you style first, you spend the rest of the project working around markup you should have fixed in the first ten minutes.',
          },
          {
            type: 'tip',
            id: 'fp-l2-tip',
            title: 'Read the page out loud',
            body: 'Before writing any CSS, read the markup from top to bottom as a sentence. If it does not describe the page — "a figure with a portrait, captioned Ada Lovelace, a frontend engineer, then a link" — the structure is not finished yet.',
          },
          {
            type: 'heading',
            id: 'fp-l2-h3',
            level: 3,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l2-b4',
            body: 'The card below has the right content in the wrong markup. Rebuild it so the structure carries the meaning.',
          },
          {
            type: 'exercise',
            id: 'fp-l2-x1',
            exercise: {
              id: 'ex-fp-l2',
              instructions:
                'Rebuild the profile card. Wrap the portrait and the name together in a figure, give the image alt text that describes it, and make the name the page heading. Keep the role line and the link. No image may be left without an alt attribute.',
              languages: ['html'],
              starterCode: {
                html: `<div class="profile">
  <img src="img/portrait.jpg">
  <h2>Ada Lovelace</h2>
  <p>Frontend engineer</p>
  <a href="#work">Read more</a>
</div>
`,
              },
              tests: [
                {
                  id: 'ex-fp-l2-t1',
                  label: 'the card is a figure',
                  body: "return document.querySelector('figure') !== null",
                },
                {
                  id: 'ex-fp-l2-t2',
                  label: 'the portrait has real alt text',
                  body: "const img = document.querySelector('img'); return !!img && (img.getAttribute('alt') || '').trim().length >= 10",
                },
                {
                  id: 'ex-fp-l2-t3',
                  label: 'the name is the page heading',
                  body: "const heading = document.querySelector('h1'); return !!heading && /Ada/.test(heading.textContent)",
                },
                {
                  id: 'ex-fp-l2-t4',
                  label: 'no image is missing its alt attribute',
                  body: "return document.querySelectorAll('img:not([alt])').length === 0",
                },
                {
                  id: 'ex-fp-l2-t5',
                  label: 'the role line is still shown',
                  body: "return /engineer/i.test(document.body.textContent)",
                },
                {
                  id: 'ex-fp-l2-t6',
                  label: 'the link keeps a destination and a label',
                  body: "const link = document.querySelector('a[href]'); return !!link && link.textContent.trim().length > 0",
                },
              ],
              hints: [
                'A `<figure>` groups an image with its caption; the caption element is `<figcaption>`.',
                'Alt text describes the picture for someone who cannot see it — "Portrait of Ada Lovelace", not "portrait.jpg".',
                'The name is the most important heading on the page, so it is an `<h1>`, not an `<h2>`.',
              ],
              solution: {
                html: `<figure class="profile">
  <img src="img/portrait.jpg" alt="Portrait of Ada Lovelace smiling in a garden" width="160" height="160">
  <figcaption>
    <h1>Ada Lovelace</h1>
    <p class="role">Frontend engineer</p>
  </figcaption>
  <p><a href="#work">Read more about Ada</a></p>
</figure>
`,
              },
              testNotes:
                'Two tests guard the alt attribute from different sides: one wants real words, the other refuses any image left without the attribute at all.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-fp-s1',
      title: 'Project foundations check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-fp-s1-q1',
          type: 'multiple-choice',
          prompt: 'What is the first step when starting a frontend project?',
          options: [
            'Write the CSS styles',
            'Write the HTML structure',
            'Set up the JavaScript logic',
            'Pick a color scheme',
          ],
          answer: 1,
          explanation: 'Start with HTML structure: semantics and content come first, then styling, then behavior.',
        },
        {
          id: 'quiz-fp-s1-q2',
          type: 'true-false',
          prompt: 'Progressive enhancement means building with JavaScript first and adding HTML as a fallback.',
          answer: false,
          explanation: 'Progressive enhancement means building from core HTML content upward, adding CSS for layout and styling, then JavaScript for enhanced behavior.',
        },
        {
          id: 'quiz-fp-s1-q3',
          type: 'multiple-choice',
          prompt: 'Which CSS layout method is best for two-dimensional layouts?',
          options: ['Flexbox', 'Float', 'Grid', 'Positioning'],
          answer: 2,
          explanation: 'CSS Grid handles two dimensions (rows and columns). Flexbox is one-dimensional and best for single-axis layouts.',
        },
        {
          id: 'quiz-fp-s1-q4',
          type: 'blank',
          prompt: 'What does a <section> element represent?',
          answers: ['a thematic grouping of content', 'a section of content', 'a content section'],
          explanation: 'A section element groups related content, typically with a heading.',
        },
        {
          id: 'quiz-fp-s1-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this approach?',
          code: '<div class="header">\n  <div class="logo">Brand</div>\n  <div class="nav">...</div>\n</div>',
          options: [
            'Nothing — divs are fine',
            'Should use header for the top banner and nav for navigation',
            'Class names should be lowercase',
            'There is no closing tag',
          ],
          answer: 1,
          explanation: 'Use semantic elements: <header> for the top banner, <nav> for navigation. This conveys meaning to assistive technology.',
        },
      ],
    },
  },
  {
    id: 'fp-s2',
    title: 'Responsive Design',
    description: 'Making projects work on every screen size, from mobile to wide desktop.',
    lessons: [
      {
        id: 'fp-l3',
        title: 'Mobile-first breakpoints',
        description: 'Starting from the smallest screen and adding breakpoints where the design needs them.',
        duration: 6,
        objectives: [
          'Write styles that work on a narrow screen first',
          'Add breakpoints based on content, not device sizes',
          'Use relative units for scaling',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'fp-l3-intro',
            body: '**Write the narrow version first.** A phone is the simplest case: one column, everything stacked, nothing to arrange. Once that works, a breakpoint adds the extra columns a wider screen has room for. Starting from the wide version and shrinking it means every rule is a subtraction, and something is always left over.',
          },
          {
            type: 'text',
            id: 'fp-l3-b2',
            body: 'A breakpoint is a measurement of your own content, not a device. You add one at the width where the layout starts to look wrong — a column too narrow to read, a row that wraps badly — and you write it as `min-width`, so it only ever adds. Device lists go stale the moment a new phone ships, and they miss split-screen windows, browser sidebars and foldables.',
          },
          {
            type: 'heading',
            id: 'fp-l3-h1',
            level: 3,
            body: 'Base rules, then one query',
          },
          {
            type: 'code',
            id: 'fp-l3-code',
            language: 'css',
            title: 'Mobile first, one breakpoint',
            code: `.cards {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* The wide layout only adds to what is already there. */
@media (min-width: 40rem) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
          },
          {
            type: 'text',
            id: 'fp-l3-b3',
            body: 'Read the file from top to bottom and it describes the build: the base rules make a single stack, and the query says what changes once there is room for three. Nothing has to be undone. The `40rem` is not the width of any particular phone — it is the point at which three cards of that size stop being too cramped.',
          },
          {
            type: 'list',
            id: 'fp-l3-list',
            style: 'bullet',
            items: [
              'Base rules target the smallest screen and use no media query at all.',
              'Every query is `min-width`, so it adds complexity rather than removing it.',
              'Sizes use `rem`, which scales with the reader\'s own text size setting.',
              'The viewport meta tag goes in the head, before any stylesheet.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l3-warn',
            title: 'Do not write both directions',
            body: 'A `min-width` query and a `max-width` query at the same number both apply at exactly that width, and which one wins comes down to source order. Pick one direction — for mobile-first, always `min-width` — and the ambiguity disappears.',
          },
          {
            type: 'tip',
            id: 'fp-l3-tip',
            title: 'Drag the window, do not guess',
            body: 'Start with the window as narrow as it goes and drag it wider slowly. Add a breakpoint at the first width where the layout breaks, not at a number you read on a device spec sheet. The drag is the design tool.',
          },
          {
            type: 'heading',
            id: 'fp-l3-h2',
            level: 3,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l3-b4',
            body: 'Write the base rules and the one breakpoint the card grid needs.',
          },
          {
            type: 'exercise',
            id: 'fp-l3-x1',
            exercise: {
              id: 'ex-fp-l3',
              instructions:
                'Write the CSS mobile-first. Make `.cards` a grid that stacks in one column with a `gap` measured in rem. Add a single `min-width: 40rem` media query that turns it into three equal columns. Do not add a max-width query.',
              languages: ['html', 'css'],
              starterCode: {
                html: `<ul class="cards">
  <li class="card">Plan</li>
  <li class="card">Build</li>
  <li class="card">Ship</li>
</ul>
`,
                css: `.cards {
  
}
`,
              },
              tests: [
                {
                  id: 'ex-fp-l3-t1',
                  label: 'the cards are a grid by default',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); const base = rules.find((rule) => rule.selectorText === '.cards'); return !!base && base.style.display === 'grid'",
                },
                {
                  id: 'ex-fp-l3-t2',
                  label: 'the gap uses a relative unit',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); const base = rules.find((rule) => rule.selectorText === '.cards'); return !!base && /rem/.test(base.style.gap || '')",
                },
                {
                  id: 'ex-fp-l3-t3',
                  label: 'there is one min-width query at 40rem',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); return rules.some((rule) => rule.conditionText && /min-width/.test(rule.conditionText) && /40rem/.test(rule.conditionText))",
                },
                {
                  id: 'ex-fp-l3-t4',
                  label: 'no max-width query is used',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); return !rules.some((rule) => rule.conditionText && /max-width/.test(rule.conditionText))",
                },
                {
                  id: 'ex-fp-l3-t5',
                  label: 'the wide layout is three equal columns',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); const media = rules.find((rule) => rule.conditionText && /min-width/.test(rule.conditionText)); if (!media) return false; const inner = Array.from(media.cssRules).find((rule) => rule.selectorText === '.cards'); return !!inner && (inner.style.gridTemplateColumns || '').includes('repeat(3')",
                },
              ],
              hints: [
                'The default block needs `display: grid` and a `gap` in `rem` — no media query yet.',
                'The query is written `@media (min-width: 40rem) { ... }` and only contains the column rule.',
                'Three equal columns is `grid-template-columns: repeat(3, 1fr)`.',
              ],
              solution: {
                css: `.cards {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (min-width: 40rem) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
`,
              },
              testNotes:
                'The tests read the parsed stylesheet rather than the text, so the checks survive reformatting, extra comments and a different but equivalent way of writing the same declarations.',
            },
          },
        ],
      },
      {
        id: 'fp-l4',
        title: 'Images and media in responsive layouts',
        description: 'Serving the right image for the right viewport, and handling videos.',
        duration: 5,
        objectives: [
          'Use srcset and sizes for responsive images',
          'Constrain media with max-width',
          'Use picture for art direction',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'fp-l4-intro',
            body: '**An image is the heaviest thing on most pages.** A single 2400-pixel-wide photograph sent to a phone on a slow connection is the difference between a page that appears and a page that is still arriving. Responsive images fix that by letting the browser choose the file, before it downloads it.',
          },
          {
            type: 'text',
            id: 'fp-l4-b2',
            body: 'There are two separate jobs here, and they use two different attributes. `srcset` offers the browser a set of candidates — different widths or different resolutions of the same crop — and `sizes` tells it how wide the image will be displayed. The browser picks the smallest candidate that still looks sharp. `picture` with a `source` is for the other job: a genuinely different crop on a narrow screen, which is called art direction.',
          },
          {
            type: 'heading',
            id: 'fp-l4-h1',
            level: 3,
            body: 'Candidates, and art direction',
          },
          {
            type: 'code',
            id: 'fp-l4-code',
            language: 'html',
            title: 'One crop, several sizes',
            code: `<img
  src="img/portrait.jpg"
  srcset="img/portrait.jpg 1x, img/portrait-2x.jpg 2x"
  sizes="(min-width: 40rem) 20rem, 100vw"
  alt="Portrait of Ada Lovelace"
  width="320"
  height="320"
>`,
          },
          {
            type: 'code',
            id: 'fp-l4-code2',
            language: 'html',
            title: 'A different crop on a narrow screen',
            code: `<picture>
  <source media="(min-width: 40rem)" srcset="img/hero-wide.jpg">
  <img src="img/hero-tall.jpg" alt="The workshop at sunrise" width="800" height="600">
</picture>`,
          },
          {
            type: 'code',
            id: 'fp-l4-code3',
            language: 'css',
            title: 'Never let media overflow its column',
            code: `img,
video {
  display: block;
  max-width: 100%;
  height: auto;
}`,
          },
          {
            type: 'list',
            id: 'fp-l4-list',
            style: 'bullet',
            items: [
              '`srcset` plus `sizes` picks the right **file** for the space available.',
              '`picture` with a `media` source picks a different **crop** or composition.',
              '`max-width: 100%` stops any media from overflowing its container.',
              'A bare `height` of `auto` keeps the intrinsic proportion while the width shrinks.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l4-warn',
            title: 'The alt attribute is not optional',
            body: 'A missing `alt` attribute is not the same as an empty one. Missing means the file name is read out to anyone using a screen reader; `alt=""` says the image is purely decorative and should be skipped. Decide which one you mean, every time.',
          },
          {
            type: 'tip',
            id: 'fp-l4-tip',
            title: 'Check the network panel, not the preview',
            body: 'A responsive image looks identical no matter which candidate the browser chose. Open the network panel, throttle the connection, and reload — the file name and size in the list is the only way to see that the phone is not downloading the desktop crop.',
          },
          {
            type: 'heading',
            id: 'fp-l4-h2',
            level: 3,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l4-b3',
            body: 'Give the hero image a wide-screen crop, a set of candidates, and a rule that keeps it inside its column.',
          },
          {
            type: 'exercise',
            id: 'fp-l4-x1',
            exercise: {
              id: 'ex-fp-l4',
              instructions:
                'Wrap the image in a `picture` and add a `source` with a `media` attribute for the wide crop. Give the `img` a `srcset` of candidates, a `sizes` hint, and real alt text. In the CSS, make the image never wider than its container.',
              languages: ['html', 'css'],
              starterCode: {
                html: `<div class="hero">
  <img src="img/hero.jpg">
</div>
`,
                css: `.hero img {
  
}
`,
              },
              tests: [
                {
                  id: 'ex-fp-l4-t1',
                  label: 'a picture offers a media source',
                  body: "const source = document.querySelector('picture source'); return !!source && !!source.getAttribute('media')",
                },
                {
                  id: 'ex-fp-l4-t2',
                  label: 'the image offers more than one candidate',
                  body: "const img = document.querySelector('img'); return !!img && !!img.getAttribute('srcset')",
                },
                {
                  id: 'ex-fp-l4-t3',
                  label: 'the image carries a sizes hint',
                  body: "const img = document.querySelector('img'); return !!img && !!img.getAttribute('sizes')",
                },
                {
                  id: 'ex-fp-l4-t4',
                  label: 'the image has alt text',
                  body: "const img = document.querySelector('img'); return !!img && (img.getAttribute('alt') || '').trim().length > 0",
                },
                {
                  id: 'ex-fp-l4-t5',
                  label: 'the image can never overflow its column',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); return rules.some((rule) => rule.selectorText && /img/.test(rule.selectorText) && rule.style.maxWidth === '100%')",
                },
                {
                  id: 'ex-fp-l4-t6',
                  label: 'the image keeps its proportion',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); return rules.some((rule) => rule.selectorText && /img/.test(rule.selectorText) && rule.style.height === 'auto')",
                },
              ],
              hints: [
                '`<picture>` holds one or more `<source>` elements and exactly one `<img>`, which is the fallback.',
                'The `source` for the wide crop needs `media="(min-width: 40rem)"`.',
                'The `img` carries `srcset` and `sizes`; the CSS rule is `max-width: 100%` with `height: auto`.',
              ],
              solution: {
                html: `<div class="hero">
  <picture>
    <source media="(min-width: 40rem)" srcset="img/hero-wide.jpg">
    <img
      src="img/hero.jpg"
      srcset="img/hero.jpg 1x, img/hero-2x.jpg 2x"
      sizes="(min-width: 40rem) 30rem, 100vw"
      alt="The workshop at sunrise"
      width="800"
      height="600"
    >
  </picture>
</div>
`,
                css: `.hero img {
  display: block;
  max-width: 100%;
  height: auto;
}
`,
              },
              testNotes:
                'The last two tests read the computed style, so they check the rule is actually winning the cascade rather than merely present somewhere in the file.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-fp-s2',
      title: 'Responsive Design check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-fp-s2-q1',
          type: 'multiple-choice',
          prompt: 'What does "mobile-first" mean in CSS?',
          options: [
            'Designing for phones only',
            'Writing styles for mobile first, then adding breakpoints for larger screens',
            'Testing on a phone first',
            'Using media queries that only target mobile',
          ],
          answer: 1,
          explanation: 'Mobile-first means your base styles target the smallest screen, and media queries add complexity for larger screens.',
        },
        {
          id: 'quiz-fp-s2-q2',
          type: 'true-false',
          prompt: 'The viewport meta tag is not needed if you use responsive CSS.',
          answer: false,
          explanation: 'Without a viewport meta tag, mobile browsers render at a virtual width and your responsive CSS has no effect.',
        },
        {
          id: 'quiz-fp-s2-q3',
          type: 'multiple-choice',
          prompt: 'Which unit scales with the root font size?',
          options: ['px', 'em', 'rem', 'vh'],
          answer: 2,
          explanation: 'rem is relative to the root element\'s font size, making it ideal for consistent scaling.',
        },
        {
          id: 'quiz-fp-s2-q4',
          type: 'blank',
          prompt: 'What attribute on img offers the browser several candidate files to choose from?',
          answers: ['srcset', 'sizes', 'the srcset attribute'],
          explanation: 'srcset lists the candidates and sizes describes how wide the image will be displayed, so the browser can pick the smallest one that still looks sharp.',
        },
        {
          id: 'quiz-fp-s2-q5',
          type: 'identify-error',
          prompt: 'What is the problem with this CSS?',
          code: '@media (min-width: 768px) {\n  .card { width: 50%; }\n}\n@media (max-width: 768px) {\n  .card { width: 100%; }\n}',
          options: [
            'Nothing is wrong',
            'Using min-width and max-width for the same breakpoint double-applies at 768px',
            'The card should use flex instead',
            'Both media queries should use min-width',
          ],
          answer: 3,
          explanation: 'Using both min-width and max-width at the same breakpoint creates ambiguity at exactly 768px. Stick to one direction (usually min-width/mobile-first).',
        },
      ],
    },
  },
  {
    id: 'fp-s3',
    title: 'Accessibility and Forms',
    description: 'Making projects work for everyone, including keyboard and screen reader users.',
    lessons: [
      {
        id: 'fp-l5',
        title: 'Semantic HTML and ARIA',
        description: 'Using the right elements for the right job, and ARIA only when semantics fall short.',
        duration: 6,
        objectives: [
          'Choose native elements over ARIA whenever possible',
          'Add ARIA roles, states, and properties where semantics are insufficient',
          'Label form controls correctly',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'fp-l5-intro',
            body: '**The right element does most of the accessibility work for you.** A `button` is focusable, responds to Enter and Space, and is announced as a button — all without a single attribute. A `div` with a click handler is none of those things, and no amount of ARIA turns it into a real control. So the first question is always whether a native element already does the job.',
          },
          {
            type: 'text',
            id: 'fp-l5-b2',
            body: 'ARIA is for the gaps. A `label` tied to its input handles the naming; a `role="status"` region announces changes when a search result arrives. Used for those jobs it is precise. Used to fake a widget out of boxes, it becomes a promise the page cannot keep.',
          },
          {
            type: 'heading',
            id: 'fp-l5-h1',
            level: 3,
            body: 'Labels, hints and live regions',
          },
          {
            type: 'demo',
            id: 'fp-l5-d1',
            title: 'A search form that explains itself',
            body: 'The field is a real `input type="search"` with a visible `<label>`, a hint linked by `aria-describedby`, and a results region marked `role="status"` so screen readers announce it when it fills.',
            html: `<form class="search" role="search">
  <label for="q">Search articles</label>
  <input id="q" name="q" type="search" aria-describedby="q-hint">
  <p id="q-hint">Search by title, author or tag.</p>
  <button type="submit">Search</button>
</form>
<p class="results" role="status" aria-live="polite">Type to search…</p>`,
            css: `body { font-family: system-ui, sans-serif; line-height: 1.5; margin: 0; padding: 1rem; }
.search { display: grid; gap: 0.5rem; max-width: 24rem; }
label { font-weight: 600; }
input { padding: 0.5rem 0.6rem; border: 1px solid #cbd5e1; border-radius: 0.5rem; font: inherit; }
input:focus-visible { outline: 2px solid #0f766e; outline-offset: 2px; }
#q-hint { margin: 0; font-size: 0.85rem; color: #475569; }
button { justify-self: start; padding: 0.5rem 0.9rem; border: 0; border-radius: 0.5rem; background: #0f766e; color: white; font: inherit; cursor: pointer; }
.results { color: #475569; }`,
          },
          {
            type: 'heading',
            id: 'fp-l5-h2',
            level: 3,
            body: 'The rule to remember',
          },
          {
            type: 'list',
            id: 'fp-l5-list',
            style: 'ordered',
            items: [
              'Is there a native element that already means this? Use it — `button`, `nav`, `label`, `input`.',
              'If not, is there an ARIA role that matches? Add it, and the attributes it requires.',
              'Only then reach for `role="presentation"` or a custom widget — and only with a keyboard plan.',
              'Never use ARIA to describe something you could have built natively.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l5-warn',
            title: 'A placeholder is not a label',
            body: 'A placeholder disappears the moment someone types, is often missed by screen readers, and usually fails contrast. It is fine as a hint about format. Every control still needs a real `<label>` — or, when there is genuinely no room for visible text, an `aria-label`.',
          },
          {
            type: 'tip',
            id: 'fp-l5-tip',
            title: 'Look for the role, not the element',
            body: 'Screen readers announce roles, not tag names. When you are unsure whether a control is right, ask what role it will be read as. If you cannot name the role in one word, assistive technology cannot either.',
          },
          {
            type: 'heading',
            id: 'fp-l5-h3',
            level: 3,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l5-b3',
            body: 'The form below relies on a placeholder for its only label. Give the field a real label and a linked hint, and make the results region announce itself.',
          },
          {
            type: 'exercise',
            id: 'fp-l5-x1',
            exercise: {
              id: 'ex-fp-l5',
              instructions:
                'Make the search field accessible. It must be an `input type="search"` with a real `<label>` that names it. Add a hint paragraph and connect it with `aria-describedby`, and give the results region a role that announces updates.',
              languages: ['html'],
              starterCode: {
                html: `<form class="search">
  <input placeholder="Search articles">
  <button type="submit">Search</button>
</form>
<div class="results"></div>
`,
              },
              tests: [
                {
                  id: 'ex-fp-l5-t1',
                  label: 'the field is a real search input',
                  body: "return document.querySelector('input[type=\"search\"]') !== null",
                },
                {
                  id: 'ex-fp-l5-t2',
                  label: 'the field has a label that names it',
                  body: "const input = document.querySelector('input[type=\"search\"]'); if (!input) return false; const label = Array.from(document.querySelectorAll('label')).find((element) => element.htmlFor === input.id || element.contains(input)); return !!label && label.textContent.trim().length > 0",
                },
                {
                  id: 'ex-fp-l5-t3',
                  label: 'the field points at its hint',
                  body: "const input = document.querySelector('input[type=\"search\"]'); if (!input) return false; const id = input.getAttribute('aria-describedby'); return !!id && !!document.getElementById(id)",
                },
                {
                  id: 'ex-fp-l5-t4',
                  label: 'the hint is linked and not empty',
                  body: "const input = document.querySelector('input[type=\"search\"]'); if (!input) return false; const id = input.getAttribute('aria-describedby'); const hint = id ? document.getElementById(id) : null; return !!hint && hint.textContent.trim().length > 5",
                },
                {
                  id: 'ex-fp-l5-t5',
                  label: 'the results region announces updates',
                  body: "return document.querySelector('[role=\"status\"], [aria-live]') !== null",
                },
              ],
              hints: [
                'A `<label for="...">` names the control whose `id` matches the `for` value.',
                'The hint is a paragraph with an `id`; the input references that id with `aria-describedby`.',
                '`role="status"` (or `aria-live="polite"`) makes a region announce its changes without stealing focus.',
              ],
              solution: {
                html: `<form class="search" role="search">
  <label for="q">Search articles</label>
  <input id="q" name="q" type="search" aria-describedby="q-hint">
  <p id="q-hint">Search by title, author or tag.</p>
  <button type="submit">Search</button>
</form>
<div class="results" role="status" aria-live="polite"></div>
`,
              },
              testNotes:
                'Labels are accepted either way — the `for` attribute pointing at the id, or the input nested inside the label — because both are valid and both name the control.',
            },
          },
        ],
      },
      {
        id: 'fp-l6',
        title: 'Keyboard navigation and focus',
        description: 'Ensuring every interactive element is reachable, visible, and usable with a keyboard.',
        duration: 5,
        objectives: [
          'Test tab order and ensure it follows the visual layout',
          'Provide visible focus indicators',
          'Trap focus in modal or dialog components',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'fp-l6-intro',
            body: '**Every interactive thing on the page has to be reachable without a mouse.** For most people that is invisible work until it is missing: press Tab and watch where the focus ring goes. If it skips a control, the control cannot be used by anyone navigating with a keyboard, a switch, a head pointer or a screen reader.',
          },
          {
            type: 'text',
            id: 'fp-l6-b2',
            body: 'Tab order follows the document, so a layout that reads sensibly usually tabs sensibly too. Each focusable element is announced with a role and a name, which is another reason a real `button` beats a clickable `div` — the button is in the tab order and announces itself, and the div is neither.',
          },
          {
            type: 'heading',
            id: 'fp-l6-h1',
            level: 3,
            body: 'From a clickable div to a real control',
          },
          {
            type: 'code',
            id: 'fp-l6-code',
            language: 'html',
            title: 'The same thing, done two ways',
            code: `<!-- Not focusable, not announced, needs a click handler -->
<div class="toggle" onclick="toggle()">Menu</div>

<!-- Focusable, announced, works with Enter and Space for free -->
<button type="button" class="toggle">Menu</button>`,
          },
          {
            type: 'text',
            id: 'fp-l6-b3',
            body: 'The two lines do the same thing when clicked with a mouse. Only one of them can be reached at all without one. That is the whole argument, and it is why the `div` version is treated as a bug rather than a shortcut.',
          },
          {
            type: 'heading',
            id: 'fp-l6-h2',
            level: 3,
            body: 'Making focus visible',
          },
          {
            type: 'code',
            id: 'fp-l6-code2',
            language: 'css',
            title: 'A focus ring for keyboard users only',
            code: `.toggle:focus-visible {
  outline: 3px solid #0f766e;
  outline-offset: 2px;
}`,
          },
          {
            type: 'list',
            id: 'fp-l6-list',
            style: 'bullet',
            items: [
              '`:focus-visible` matches keyboard focus, not a mouse click — so the ring never appears when it is not wanted.',
              'Never remove a focus ring without replacing it; `outline: none` alone makes the page unusable.',
              '`outline-offset` keeps the ring clear of the element\'s own border.',
              'Tab through the page yourself, in order, before you call it finished.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l6-warn',
            title: 'Threading the tab trap',
            body: 'A dialog that opens has to take focus, keep Tab inside itself while it is open, return focus to whatever opened it when it closes, and answer Escape. Skip any of those and a keyboard user can end up stuck behind the overlay with no way out.',
          },
          {
            type: 'tip',
            id: 'fp-l6-tip',
            title: 'Unplug the mouse',
            body: 'Put the mouse aside for one pass through the page. Tab forward, Shift+Tab back, activate everything with Enter and Space. It takes two minutes and finds problems that no amount of reading the markup will.',
          },
          {
            type: 'heading',
            id: 'fp-l6-h3',
            level: 3,
            body: 'Checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l6-b4',
            body: 'The toolbar below uses a clickable div. Make it a real control, and give keyboard users a focus ring they can see.',
          },
          {
            type: 'exercise',
            id: 'fp-l6-x1',
            exercise: {
              id: 'ex-fp-l6',
              instructions:
                'Replace the clickable div with a real button that keeps its text. Remove the inline handler entirely. Then add CSS so keyboard focus is visible, using `:focus-visible` rather than `:focus`.',
              languages: ['html', 'css'],
              starterCode: {
                html: `<div class="toolbar">
  <div class="toggle" onclick="toggle()">Menu</div>
</div>
`,
                css: `.toggle {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}
`,
              },
              tests: [
                {
                  id: 'ex-fp-l6-t1',
                  label: 'the control is a real button',
                  body: "return document.querySelector('button') !== null",
                },
                {
                  id: 'ex-fp-l6-t2',
                  label: 'nothing clickable is a div any more',
                  body: "return document.querySelectorAll('div[onclick]').length === 0",
                },
                {
                  id: 'ex-fp-l6-t3',
                  label: 'the control has an accessible name',
                  body: "const button = document.querySelector('button'); return !!button && button.textContent.trim().length > 0",
                },
                {
                  id: 'ex-fp-l6-t4',
                  label: 'keyboard focus is styled',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); return rules.some((rule) => rule.selectorText && rule.selectorText.indexOf('focus-visible') !== -1)",
                },
                {
                  id: 'ex-fp-l6-t5',
                  label: 'the focus ring is actually visible',
                  body: "const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch { return [] } }); const rule = rules.find((item) => item.selectorText && item.selectorText.indexOf('focus-visible') !== -1); if (!rule) return false; return (rule.style.outline || '').length > 0 || (rule.style.outlineWidth || '').length > 0 || (rule.style.boxShadow || '').length > 0",
                },
              ],
              hints: [
                'A `<button type="button">` does not submit a form and is focusable and announced on its own.',
                'The `onclick` attribute disappears with the div — there is nothing it needs to do.',
                'The focus rule is `.toggle:focus-visible { outline: ... }`; an outline (or a box-shadow) is what makes it visible.',
              ],
              solution: {
                html: `<div class="toolbar">
  <button type="button" class="toggle">Menu</button>
</div>
`,
                css: `.toggle {
  display: inline-block;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font: inherit;
}

.toggle:focus-visible {
  outline: 3px solid #0f766e;
  outline-offset: 2px;
}
`,
              },
              testNotes:
                'The last test refuses a rule that merely names `:focus-visible` — it has to actually set an outline or a shadow, because removing the browser ring without replacing it is the failure this lesson warns about.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-fp-s3',
      title: 'Accessibility check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-fp-s3-q1',
          type: 'multiple-choice',
          prompt: 'Which should you use first for accessibility?',
          options: [
            'ARIA attributes',
            'Native HTML elements with built-in semantics',
            'JavaScript event handlers',
            'CSS :focus-visible',
          ],
          answer: 1,
          explanation: 'Native elements like button, label, nav, and section have built-in semantics. Use ARIA only when native semantics are not enough.',
        },
        {
          id: 'quiz-fp-s3-q2',
          type: 'true-false',
          prompt: 'Every form input must have an id.',
          answer: false,
          explanation: 'An input needs an id only if it is associated with a label via for. A label can also wrap the input, which does not need an id.',
        },
        {
          id: 'quiz-fp-s3-q3',
          type: 'multiple-choice',
          prompt: 'What does aria-live do?',
          options: [
            'Makes an element visible',
            'Announces changes to the element to screen readers',
            'Adds keyboard navigation',
            'Hides the element from all users',
          ],
          answer: 1,
          explanation: 'aria-live tells screen readers to announce content changes in that region, useful for status messages and alerts.',
        },
        {
          id: 'quiz-fp-s3-q4',
          type: 'blank',
          prompt: 'What CSS pseudo-class shows focus only for keyboard users?',
          answers: [':focus-visible', 'focus-visible'],
          explanation: ':focus-visible shows focus only when the user is navigating with the keyboard, not on mouse click.',
        },
        {
          id: 'quiz-fp-s3-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this control?',
          code: '<div onclick="handleClick()">Click me</div>',
          options: [
            'Nothing is wrong',
            'A div is not keyboard accessible and should be a button',
            'onclick should be on:click',
            'The function call is wrong',
          ],
          answer: 1,
          explanation: 'A div is not focusable by default and does not respond to Enter. Use a <button> element which is natively keyboard-accessible.',
        },
      ],
    },
  },
]
