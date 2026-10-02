import type { Section } from '~/types/content'

export const htmlClosingSections: Section[] = [
  {
    id: 'html-s65',
    title: 'HTML Accessibility',
    description: 'The parts of accessibility that are HTML, and the four rules that catch most problems.',
    lessons: [
      {
        id: 'html-l76',
        title: 'HTML Accessibility',
        description: 'Semantic markup as accessibility, the four rules that matter most, and how to check your work.',
        duration: 8,
        objectives: [
          'Apply the four rules that prevent most accessibility failures',
          'Write markup that works with a keyboard alone',
          'Check a page for the failures that matter before shipping it',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l76-b1',
            body: 'Most of accessibility is HTML done properly rather than ARIA added afterwards. A page built with real buttons, real labels, real headings and real landmarks is accessible without a single ARIA attribute, and it stays accessible as it grows. The failures that remain are surprisingly few: content that cannot be reached by keyboard, content with no accessible name, information conveyed by colour alone, and a focus order that does not match the visual one.',
          },
          {
            type: 'demo',
            id: 'c-l76-d1',
            title: 'The same action, three ways',
            body: 'Three buttons that do exactly the same thing. The first is a real button, the second is a div with a click handler, the third is a div with ARIA bolted on. Only the first is focusable, activates on Enter and Space, announces itself, and can be disabled.',
            html: `<div class="row">
  <button type="button" class="good" onclick="document.getElementById('out').textContent='Saved.'">
    Save (real button)
  </button>
  <div class="bad" tabindex="0" onclick="document.getElementById('out').textContent='Saved.'">
    Save (div with onclick)
  </div>
  <div class="bad" role="button" tabindex="0" onclick="document.getElementById('out').textContent='Saved.'">
    Save (div with role)
  </div>
</div>

<p id="out" role="status">Nothing yet. Tab to the buttons and try Enter.</p>

<p class="fine">
  The middle one has a tabindex, so it is focusable, but Enter does nothing.
  The third announces as a button, but Space does not activate it and a
  disabled state is impossible.
</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 0.5rem; flex-wrap: wrap; }
button, .bad {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  font: inherit;
  cursor: pointer;
}
.good { border: 1px solid #16a34a; background: #f0fdf4; }
.bad { border: 1px solid #dc2626; background: #fef2f2; }
:focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }
#out { font-weight: 600; }
.fine { color: #475569; font-size: 13px; max-width: 40rem; }`,
            height: 260,
          },
          {
            type: 'heading',
            id: 'c-l76-h1',
            level: 3,
            body: 'The four rules',
          },
          {
            type: 'list',
            id: 'c-l76-l1',
            style: 'ordered',
            items: [
              '**Everything works with a keyboard.** Tab moves focus, Enter and Space activate, Escape cancels. If you cannot use the page without a mouse, neither can a large number of your users.',
              '**Everything has an accessible name.** Links describe their destination, buttons describe their action, form controls have labels, images have alt text. A control with no name is announced as "button" and nothing more.',
              '**Nothing depends on colour alone.** An error is not just a red border; it has text. A required field is not just an asterisk; it is marked with `required` and said in the label.',
              '**The focus order matches the visual order.** Do not reorder with CSS `order`, absolute positioning, or a positive `tabindex`. A positive tabindex is almost always a bug.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l76-h2',
            level: 3,
            body: 'The rest, briefly',
          },
          {
            type: 'list',
            id: 'c-l76-l2',
            style: 'bullet',
            items: [
              '**Landmarks.** `header`, `nav`, `main`, `aside` and `footer` let a screen reader user skip to the part they want. Label repeated navs with `aria-label`.',
              '**Headings.** A correct outline is the only table of contents a screen reader gets for free.',
              '**Images.** Meaningful ones get alt text; decorative ones get `alt=""`. An image of text is a last resort.',
              '**Contrast.** 4.5:1 for body text, 3:1 for large text and for the boundaries of UI components.',
              '**Zoom and reflow.** The page must work at 200% zoom and at 320 CSS pixels wide, with no horizontal scrolling.',
              '**Reduced motion.** Honour `prefers-reduced-motion` before animating anything on scroll.',
              '**Form errors.** Say what went wrong, where, and how to fix it — in text, near the field, not only in a colour.',
              '**`lang` on the html element.** Without it, a screen reader uses its own default voice for a language it cannot read.',
            ],
          },
          {
            type: 'code',
            id: 'c-l76-c1',
            language: 'html',
            title: 'The patterns, done properly',
            code: `<!-- a page that navigable -->
<html lang="en-GB">
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <nav aria-label="Primary">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/docs">Docs</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" tabindex="-1">
    <h1>Page title</h1>

    <!-- a form with real labels and real errors -->
    <form novalidate>
      <div class="field">
        <label for="email">Email address</label>
        <input id="email" name="email" type="email"
               autocomplete="email" required
               aria-describedby="email-error">
        <p id="email-error" class="error" role="alert"></p>
      </div>

      <!-- an error summary, focused on submit failure -->
      <div id="summary" role="alert" tabindex="-1" hidden>
        <h2>There is a problem</h2>
        <ul>
          <li><a href="#email">Email address: enter an address in the form name@example.com</a></li>
        </ul>
      </div>

      <button type="submit">Continue</button>
    </form>

    <!-- a disclosure, without JavaScript -->
    <details>
      <summary>What happens to my data?</summary>
      <p>It is stored on servers in the region you selected.</p>
    </details>
  </main>

  <footer>
    <p>&copy; 2026 Example</p>
  </footer>
</body>
</html>

<style>
  /* a visible focus ring, on everything, always */
  :focus-visible {
    outline: 3px solid #1d4ed8;
    outline-offset: 2px;
  }

  /* and one that only appears for keyboard users, which is focus-visible's job */
  .skip {
    position: absolute;
    left: -9999px;
  }
  .skip:focus {
    left: 1rem;
    top: 1rem;
    z-index: 10;
    background: white;
    padding: 0.5rem 0.75rem;
  }

  @media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
  }
</style>`,
          },
          {
            type: 'tip',
            id: 'c-l76-t1',
            title: 'The checks worth running before shipping',
            body: 'Put the mouse away and use the page — that finds keyboard traps and invisible focus. Zoom to 200% and narrow the window to 320 pixels, which finds overflow. Run an automated checker, which finds missing names and contrast problems. Then read the page with a screen reader for one section, which finds the problems no tool detects. The first three take ten minutes.',
          },
          {
            type: 'warning',
            id: 'c-l76-w1',
            title: 'Automated checks find a third of it',
            body: 'A linter cannot tell you that a link says "click here", that an error message is unclear, or that the reading order is wrong. Automated testing is the floor, not the ceiling, and a page that passes every check can still be unusable.',
          },
          {
            type: 'exercise',
            id: 'c-l76-x1',
            exercise: {
              id: 'ex-l76',
              instructions:
                'Give a page the four things a screen reader needs first: a language, a skip link, a main landmark, and a focus style that is never removed.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Checkout</title>\n  \n</head>\n<body>\n  <h1>Checkout</h1>\n  <p>Nothing else yet.</p>\n</body>\n</html>\n',
                css: '/* the focus ring */\n',
              },
              tests: [
                {
                  id: 'ex-l76-t1',
                  label: 'The html element declares a language',
                  body:
                    'return (document.documentElement.getAttribute("lang") || "").trim().length >= 2',
                },
                {
                  id: 'ex-l76-t2',
                  label: 'There is a skip link as the first focusable element, targeting main',
                  body:
                    'const a = document.querySelector("a[href^=\'#\']"); return !!a && a.getAttribute("href") === "#main" && !!document.querySelector("main#main")',
                },
                {
                  id: 'ex-l76-t3',
                  label: 'There is exactly one main landmark',
                  body: 'return document.querySelectorAll("main").length === 1',
                },
                {
                  id: 'ex-l76-t4',
                  label: 'The main has an id matching the skip link target',
                  body:
                    'const a = document.querySelector("a[href^=\'#\']"); return !!a && a.getAttribute("href").slice(1) === document.querySelector("main").id',
                },
                {
                  id: 'ex-l76-t5',
                  label: 'No rule sets outline to none or zero',
                  body:
                    'return !/outline\\s*:\\s*(none|0)/.test(Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "))',
                },
                {
                  id: 'ex-l76-t6',
                  label: 'The page has exactly one h1',
                  body: 'return document.querySelectorAll("h1").length === 1',
                },
              ],
              hints: [
                'The skip link is the first thing in the body and points at the main element id.',
                'outline: none without a replacement is the single most common accessibility bug in a stylesheet.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Checkout</title>\n  <style>\n    :focus-visible { outline: 3px solid #1d4ed8; outline-offset: 2px; }\n    .skip { position: absolute; left: -9999px; }\n    .skip:focus { left: 1rem; top: 1rem; background: #fff; padding: 0.5rem 0.75rem; }\n  </style>\n</head>\n<body>\n  <a class="skip" href="#main">Skip to content</a>\n  <main id="main" tabindex="-1">\n    <h1>Checkout</h1>\n    <p>Your order is ready.</p>\n  </main>\n</body>\n</html>\n',
                css: ':focus-visible {\n  outline: 3px solid #1d4ed8;\n  outline-offset: 2px;\n}\n',
              },
              testNotes:
                'The second and fourth tests together confirm the skip link is real rather than decorative: it points at an id, and that id belongs to the main element.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s65',
      title: 'HTML Accessibility quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s65-q1',
          type: 'multiple-choice',
          prompt: 'Why is a real button better than a div with role="button"?',
          options: [
            'It looks better',
            'It comes with focus, keyboard activation, disabled state and the correct announcement',
            'role="button" is invalid',
            'It is smaller',
          ],
          answer: 1,
          explanation:
            'The role adds the announcement. Everything else — focus, Enter and Space, disabled — is part of the element.',
        },
        {
          id: 'quiz-html-s65-q2',
          type: 'true-false',
          prompt: 'It is fine to write outline: none as long as the element still shows a cursor change.',
          answer: false,
          explanation:
            'A cursor change is invisible to a keyboard user. The focus indicator has to be visible or replaced with something equally visible.',
        },
        {
          id: 'quiz-html-s65-q3',
          type: 'multiple-choice',
          prompt: 'Which is the correct way to mark a required field?',
          options: [
            'An asterisk next to the label',
            'The required attribute, plus saying so in text',
            'A red border',
            'Nothing, users will find out',
          ],
          answer: 1,
          explanation:
            'An asterisk and a colour are both visual conventions that carry no information for a screen reader or in high contrast mode.',
        },
        {
          id: 'quiz-html-s65-q4',
          type: 'blank',
          prompt: 'What is the minimum contrast ratio for body text?',
          answers: ['4.5:1', '4.5', '4.5:1 against its background'],
          explanation: 'Large text at 24px or 18.66px bold may use 3:1.',
        },
        {
          id: 'quiz-html-s65-q5',
          type: 'multiple-choice',
          prompt: 'What does a skip link do?',
          options: [
            'Skips an image',
            'Lets a keyboard user jump past repeated navigation to the main content',
            'Skips the page footer',
            'Disables navigation',
          ],
          answer: 1,
          explanation:
            'It is the first focusable element on the page, and it targets the main landmark so repeated navigation is bypassed.',
        },
      ],
    },
  },
  {
    id: 'html-s66',
    title: 'HTML Summary',
    description: 'The whole course in one page, and the questions to ask of any markup you write.',
    lessons: [
      {
        id: 'html-l77',
        title: 'HTML Summary',
        description: 'A recap of the whole course, and the checks that keep a page correct as it grows.',
        duration: 6,
        objectives: [
          'Recall the element families and what each is for',
          'Apply the checks that catch most HTML mistakes',
          'Know where to go next from here',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l77-b1',
            body: 'HTML is a document structure language. Everything else follows from that: the element you choose describes what the content is, and CSS and JavaScript decide how it looks and what it does. Pick the element that says what the thing is, and most of the hard problems — accessibility, search ranking, styling hooks, future maintainability — solve themselves.',
          },
          {
            type: 'demo',
            id: 'c-l77-d1',
            title: 'A complete page, using everything from the course',
            body: 'One document: metadata in the head, landmarks in the body, a table with headers and scope, a list for navigation, a form with labels and constraints, an image with meaningful alt text, and a footer.',
            html: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A short summary of the page.">
  <title>Workshop timetable</title>
  <link rel="stylesheet" href="/css/site.css">
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header>
    <nav aria-label="Primary">
      <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/timetable">Timetable</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" tabindex="-1">
    <h1>Workshop timetable</h1>

    <figure>
      <img src="/img/workshop.jpg" alt="The workshop floor, with four benches and a large press at the far end"
           width="640" height="360" loading="lazy">
      <figcaption>The workshop floor.</figcaption>
    </figure>

    <table>
      <caption>Opening hours by day</caption>
      <thead>
        <tr><th scope="col">Day</th><th scope="col">Opens</th><th scope="col">Closes</th></tr>
      </thead>
      <tbody>
        <tr><th scope="row">Monday</th><td>09:00</td><td>17:00</td></tr>
        <tr><th scope="row">Saturday</th><td>10:00</td><td>14:00</td></tr>
      </tbody>
    </table>

    <section>
      <h2>Book a place</h2>
      <form action="/bookings" method="post">
        <p>
          <label for="name">Full name</label>
          <input id="name" name="name" type="text" autocomplete="name" required>
        </p>
        <p>
          <label for="email">Email address</label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </p>
        <p>
          <label for="session">Session</label>
          <select id="session" name="session">
            <option value="">Choose…</option>
            <option value="am">Morning</option>
            <option value="pm">Afternoon</option>
          </select>
        </p>
        <button type="submit">Book</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Example</p>
  </footer>
</body>
</html>`,
            height: 520,
          },
          {
            type: 'heading',
            id: 'c-l77-h1',
            level: 3,
            body: 'The element families, in one list',
          },
          {
            type: 'list',
            id: 'c-l77-l1',
            style: 'bullet',
            items: [
              '**Document** — `!doctype`, `html`, `head`, `body`, `title`, `meta`, `link`, `style`, `script`, `base`.',
              '**Sections** — `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `h1` to `h6`.',
              '**Grouping** — `p`, `hr`, `pre`, `blockquote`, `ol`, `ul`, `li`, `dl`, `dt`, `dd`, `figure`, `figcaption`, `div`.',
              '**Text level** — `a`, `em`, `strong`, `small`, `s`, `cite`, `q`, `dfn`, `abbr`, `ruby`, `data`, `time`, `code`, `kbd`, `samp`, `var`, `sub`, `sup`, `i`, `b`, `u`, `mark`, `bdi`, `bdo`, `span`, `br`, `wbr`.',
              '**Edits** — `ins`, `del`.',
              '**Embedded** — `picture`, `source`, `img`, `iframe`, `embed`, `object`, `param`, `video`, `audio`, `track`, `map`, `area`, `canvas`, `svg`, `math`.',
              '**Tabular** — `table`, `caption`, `colgroup`, `col`, `tbody`, `thead`, `tfoot`, `tr`, `td`, `th`.',
              '**Forms** — `form`, `label`, `input`, `button`, `select`, `datalist`, `optgroup`, `option`, `textarea`, `output`, `progress`, `meter`, `fieldset`, `legend`.',
              '**Interactive** — `details`, `summary`, `dialog`.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l77-h2',
            level: 3,
            body: 'The checks to run on any page',
          },
          {
            type: 'list',
            id: 'c-l77-l2',
            style: 'ordered',
            items: [
              'Does every image have an `alt`, with `alt=""` where it is decorative?',
              'Is there exactly one `h1`, and do heading levels never skip going down?',
              'Is there exactly one `main`, and is the `lang` attribute set?',
              'Does every form control have a `label`, and is every button\'s `type` explicit?',
              'Does the page work with a keyboard alone, with a visible focus ring?',
              'Do links describe their destination rather than saying "click here"?',
              'Is nothing conveyed by colour alone?',
              'Do relative paths resolve, and are they lower-case on a case-sensitive server?',
              'Does the page work at 200% zoom and at 320 pixels wide?',
              'Does a validator pass, and does the console have no errors?',
            ],
          },
          {
            type: 'tip',
            id: 'c-l77-t1',
            title: 'Where to go next',
            body: 'CSS next, and the CSS course here covers it from syntax to layout. Then JavaScript for behaviour, and the DOM API. After that, accessibility in depth, HTTP and the server side, and a framework — but the semantics you have learned here are what every framework still emits underneath, and they are the part nobody can take back for you.',
          },
          {
            type: 'exercise',
            id: 'c-l77-x1',
            exercise: {
              id: 'ex-l77',
              instructions:
                'Run the checks from the lesson over a document: a doctype, a language, a title, one main, one h1, and every image and control accounted for.',
              languages: ['html'],
              starterCode: {
                html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Workshop</title>\n</head>\n<body>\n  <h1>Workshop</h1>\n</body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l77-t1',
                  label: 'The doctype is html and the language is set',
                  body:
                    'return !!document.doctype && document.doctype.name.toLowerCase() === "html" && !!document.documentElement.getAttribute("lang")',
                },
                {
                  id: 'ex-l77-t2',
                  label: 'There is a non-empty title and exactly one h1',
                  body:
                    'const t = document.querySelector("title"); return !!t && t.textContent.trim().length > 0 && document.querySelectorAll("h1").length === 1',
                },
                {
                  id: 'ex-l77-t3',
                  label: 'There is exactly one main landmark',
                  body: 'return document.querySelectorAll("main").length === 1',
                },
                {
                  id: 'ex-l77-t4',
                  label: 'Every image has an alt attribute, decorative or not',
                  body:
                    'return Array.from(document.querySelectorAll("img")).every(i => i.hasAttribute("alt"))',
                },
                {
                  id: 'ex-l77-t5',
                  label: 'Every form control has a label or an aria-label',
                  body:
                    'return Array.from(document.querySelectorAll("input, select, textarea")).every(c => !!document.querySelector("label[for=\'" + c.id + "\']") || !!c.getAttribute("aria-label"))',
                },
                {
                  id: 'ex-l77-t6',
                  label: 'Every button declares an explicit type',
                  body:
                    'return Array.from(document.querySelectorAll("button")).every(b => !!b.getAttribute("type"))',
                },
                {
                  id: 'ex-l77-t7',
                  label: 'No link text is a non-descriptive placeholder',
                  body:
                    'return !Array.from(document.querySelectorAll("a")).some(a => /^(click here|here|read more|more|learn more|link)$/i.test(a.textContent.trim()))',
                },
              ],
              hints: [
                'A control with no id cannot be matched by a label for attribute, so give every control an id.',
                'alt="" is a deliberate value and it counts as having the attribute.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Workshop timetable</title>\n</head>\n<body>\n  <main>\n    <h1>Workshop timetable</h1>\n    <img src="/img/workshop.jpg" alt="The workshop floor, with four benches and a press at the far end" width="640" height="360">\n    <form action="/bookings" method="post">\n      <p><label for="name">Full name</label><input id="name" name="name" type="text" autocomplete="name" required></p>\n      <p><label for="notes">Anything we should know?</label><textarea id="notes" name="notes" rows="3"></textarea></p>\n      <button type="submit">Book a place</button>\n    </form>\n  </main>\n</body>\n</html>\n',
              },
              testNotes:
                'The seventh test is the check most often skipped. A link reading "click here" gives a screen reader user nothing to go on when they are reading the page out of context.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s66',
      title: 'HTML Summary quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s66-q1',
          type: 'multiple-choice',
          prompt: 'What is the central idea of choosing semantic HTML?',
          options: [
            'Semantic elements render faster',
            'The element name describes what the content is, which solves accessibility, styling and indexing problems at once',
            'It produces less markup',
            'It is required by the validator',
          ],
          answer: 1,
          explanation:
            'One decision pays for itself three times over: assistive technology, CSS hooks, and search engines.',
        },
        {
          id: 'quiz-html-s66-q2',
          type: 'true-false',
          prompt: 'A page should have exactly one h1.',
          answer: true,
          explanation:
            'One h1 names the page. Everything below it is a heading level describing depth, not size.',
        },
        {
          id: 'quiz-html-s66-q3',
          type: 'multiple-choice',
          prompt: 'How many main elements may a document contain?',
          options: ['One', 'One per page section', 'As many as you like', 'None'],
          answer: 0,
          explanation: 'Exactly one, and it holds the primary content.',
        },
        {
          id: 'quiz-html-s66-q4',
          type: 'blank',
          prompt: 'Which attribute marks an image as deliberately decorative?',
          answers: ['alt=""', 'alt', 'alt=""'],
          explanation: 'An empty alt tells the screen reader to skip it. Omitting alt is a missing description, not a decision.',
        },
        {
          id: 'quiz-html-s66-q5',
          type: 'multiple-choice',
          prompt: 'Which of these is the next step after this course?',
          options: [
            'Learn a framework and stop writing HTML',
            'CSS, then JavaScript, and keep the semantics underneath',
            'Skip to backend development',
            'Stop writing markup entirely',
          ],
          answer: 1,
          explanation:
            'A framework still emits the same elements. The semantics here are what everything else is built on.',
        },
      ],
    },
  },
]
