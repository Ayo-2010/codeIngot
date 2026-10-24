import type { Section } from '~/types/content'

export const htmlSemanticsSections: Section[] = [
  {
    id: 'html-s38',
    title: 'HTML Computercode',
    description: 'The elements for code samples, and what to use for keyboard keys and computer output.',
    lessons: [
      {
        id: 'html-l49',
        title: 'HTML Computercode',
        description: 'code, kbd, samp, var and pre, and why a code sample is not just preformatted text.',
        duration: 5,
        objectives: [
          'Use code, kbd, samp and var for what each one actually means',
          'Combine pre and code for a multi-line code block',
          'Explain what a screen reader announces differently for each',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l49',
          title: 'HTML Computercode quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l49-q1',
              type: 'multiple-choice',
              prompt: 'Which element marks text the user types, such as a key?',
              options: [
                'code',
                'kbd',
                'samp',
                'var',
              ],
              answer: 1,
              explanation: 'kbd is for keyboard input, which a screen reader announces distinctly.',
            },
            {
              id: 'quiz-html-l49-q2',
              type: 'multiple-choice',
              prompt: 'What is the difference between code and samp?',
              options: [
                'They are identical',
                'code is the source you wrote, samp is the output the program produced',
                'code is inline and samp is a block',
                'samp is deprecated',
              ],
              answer: 1,
              explanation: 'One is the program text, the other is what it printed.',
            },
            {
              id: 'quiz-html-l49-q3',
              type: 'true-false',
              prompt: 'A code block should be written as pre containing a code element.',
              answer: true,
              explanation: 'pre preserves the whitespace and code tells assistive technology the content is source code.',
            },
            {
              id: 'quiz-html-l49-q4',
              type: 'blank',
              prompt: 'Which element preserves whitespace and line breaks?',
              answers: [
                'pre',
                '<pre>',
              ],
              explanation: 'That is the sole purpose of the pre element.',
            },
            {
              id: 'quiz-html-l49-q5',
              type: 'multiple-choice',
              prompt: 'Why must angle brackets inside a code block be escaped?',
              options: [
                'For readability',
                'Otherwise the browser parses them as real elements instead of text',
                'Because pre cannot contain them',
                'To satisfy the validator',
              ],
              answer: 1,
              explanation: 'A literal <div> in a pre is an element. Writing &lt;div&gt; makes the browser show the characters.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l49-b1',
            body: 'HTML has five elements for computer-related text, and the differences between them are semantic rather than cosmetic. `code` is a fragment of computer code. `kbd` is text the user types, usually a key combination. `samp` is a sample of program output. `var` is a variable or an argument name. `pre` preserves whitespace. Getting them right is what lets a screen reader announce a keyboard shortcut differently from a variable name.',
          },
          {
            type: 'demo',
            id: 'c-l49-d1',
            title: 'The five elements, side by side',
            body: 'Each is styled differently here, but the styling is arbitrary — the elements themselves carry the meaning, and a screen reader announces each one with a different cue.',
            html: `<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save the file.</p>

<p>Set the <var>timeout</var> to <code>3000</code> milliseconds.</p>

<p>The command returned <samp>OK, 200</samp>.</p>

<pre><code>function greet(name) {
  return 'Hello, ' + name;
}</code></pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.6; }
kbd {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-bottom-width: 2px;
  border-radius: 4px;
  padding: 0.05rem 0.35rem;
  font-size: 0.875em;
}
code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #b91c1c; }
samp { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #0f766e; }
var { font-style: italic; }
pre {
  background: #0f172a;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}
pre code { color: inherit; }`,
            height: 300,
          },
          {
            type: 'list',
            id: 'c-l49-l1',
            style: 'bullet',
            items: [
              '`<code>` — an inline fragment of code. Nothing more specific than that.',
              '`<kbd>` — what the user presses. Combinations are written as separate kbd elements joined by + or a separator.',
              '`<samp>` — output produced by a program. Distinct from code, which is what you wrote.',
              '`<var>` — a variable, a parameter, or any mathematical notation. Usually italic by default.',
              '`<pre>` — text with whitespace preserved. Line breaks and indentation survive.',
              '`<pre><code>` — the standard code block. The code element is what tells assistive technology the content is code.',
            ],
          },
          {
            type: 'code',
            id: 'c-l49-c1',
            language: 'html',
            title: 'The distinctions that matter',
            code: `<!-- user input -->
Press <kbd>Ctrl</kbd><kbd>Alt</kbd><kbd>Del</kbd> to sign out.
Type <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste.

<!-- program output, not program text -->
The server replied <samp>503 Service Unavailable</samp>.

<!-- a variable name, in prose -->
Pass the <var>userId</var> to <code>getUser()</code>.

<!-- a code block: pre preserves the whitespace, code says what it is -->
<pre><code class="language-html">
&lt;div class="card"&gt;
  &lt;p&gt;Indented by two spaces&lt;/p&gt;
&lt;/div&gt;</code></pre>

<!-- pre without code, for output or plain text -->
<pre>
  aligned   columns
  of        plain text
</pre>`,
          },
          {
            type: 'tip',
            id: 'c-l49-t1',
            title: 'Wrap pre in something scrollable',
            body: 'A long line in a `pre` makes the page scroll horizontally, which on a phone means the whole layout moves sideways. `overflow-x: auto` on the pre keeps the overflow inside the code block where it belongs.',
          },
          {
            type: 'warning',
            id: 'c-l49-w1',
            title: 'The content of a code block must be escaped',
            body: 'A `<div>` written literally inside a `pre` element is parsed as a real element, not as text. The angle brackets have to be written as `&lt;` and `&gt;` so the browser shows them rather than acting on them.',
          },
          {
            type: 'exercise',
            id: 'c-l49-x1',
            exercise: {
              id: 'ex-l49',
              instructions:
                'Mark up a keyboard shortcut with kbd, a program output with samp, and a multi-line code block with pre wrapping code.',
              languages: ['html'],
              starterCode: {
                html: '<!-- keyboard shortcut -->\n\n<!-- program output -->\n\n<!-- code block -->\n',
              },
              tests: [
                {
                  id: 'ex-l49-t1',
                  label: 'There are at least two kbd elements for the shortcut',
                  body: 'return document.querySelectorAll("kbd").length >= 2',
                },
                {
                  id: 'ex-l49-t2',
                  label: 'There is a samp element',
                  body: 'return !!document.querySelector("samp")',
                },
                {
                  id: 'ex-l49-t3',
                  label: 'There is a pre element',
                  body: 'return !!document.querySelector("pre")',
                },
                {
                  id: 'ex-l49-t4',
                  label: 'The pre contains a code element',
                  body: 'return !!document.querySelector("pre code")',
                },
                {
                  id: 'ex-l49-t5',
                  label: 'The code block keeps its whitespace',
                  body:
                    'const p = document.querySelector("pre"); return getComputedStyle(p).whiteSpace === "pre" && p.textContent.includes("\\n")',
                },
              ],
              hints: [
                'Each key in a combination is its own kbd element, and the separator between them is a plus sign.',
                'pre preserves newlines and indentation; code inside it says what the text is.',
              ],
              solution: {
                html:
                  '<!-- keyboard shortcut -->\n<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>\n\n<!-- program output -->\n<p>The server replied <samp>200 OK</samp>.</p>\n\n<!-- code block -->\n<pre><code>const total = 1 + 2;\nconsole.log(total);</code></pre>\n',
              },
              testNotes:
                'The last test checks that the newlines survived into the rendered text, which is the entire purpose of the pre element.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s39',
    title: 'HTML Semantics',
    description: 'The elements that say what content is, and why that matters more than how it looks.',
    lessons: [
      {
        id: 'html-l50',
        title: 'HTML Semantics',
        description: 'Semantic elements, the outline they produce, and the three things semantic markup gets you for free.',
        duration: 7,
        objectives: [
          'Replace a div soup with the semantic element that fits',
          'Explain what a screen reader gains from a heading structure',
          'Describe how semantics affect SEO and styling',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l50',
          title: 'HTML Semantics quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l50-q1',
              type: 'multiple-choice',
              prompt: 'What does a real button element give you that a styled div does not?',
              options: [
                'A different appearance',
                'Focusability, Enter and Space activation, and a click event',
                'Automatic styling',
                'Nothing, a div is equivalent',
              ],
              answer: 1,
              explanation: 'The keyboard and focus behaviour is part of the element, not something you rebuild with attributes.',
            },
            {
              id: 'quiz-html-l50-q2',
              type: 'true-false',
              prompt: 'Heading levels should be chosen by how important the text looks.',
              answer: false,
              explanation: 'They describe depth in the content structure. Choose the level by nesting and style by class.',
            },
            {
              id: 'quiz-html-l50-q3',
              type: 'multiple-choice',
              prompt: 'What is the first rule of ARIA?',
              options: [
                'Always add a role to every element',
                'Do not use ARIA when a native element will do',
                'ARIA roles must be on the body',
                'ARIA is required for accessibility',
              ],
              answer: 1,
              explanation: 'A role on a div adds the announcement but not the behaviour. Use the native element first.',
            },
            {
              id: 'quiz-html-l50-q4',
              type: 'blank',
              prompt: 'Which element marks a block of major navigation links?',
              answers: [
                'nav',
                '<nav>',
              ],
              explanation: 'nav is a landmark, announced by screen readers as a navigation region.',
            },
            {
              id: 'quiz-html-l50-q5',
              type: 'multiple-choice',
              prompt: 'A stylesheet has a rule for .header. What does that suggest?',
              options: [
                'The CSS is wrong',
                'The markup may be missing a header element and using a div instead',
                'header cannot be styled',
                'Nothing, class selectors are fine',
              ],
              answer: 1,
              explanation: 'A selector named for a region is often the CSS reconstructing semantics the markup should have carried.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l50-b1',
            body: 'Semantic HTML is markup in which the element name says what the content is. A `nav` is navigation, a `button` is an action, a `table` is tabular data. The visual result can be identical either way — semantics change nothing about appearance — but they change what the browser, a search engine and an assistive technology all know about the page before a single style is applied.',
          },
          {
            type: 'demo',
            id: 'c-l50-d1',
            title: 'The same page, twice',
            body: 'The first version is div soup. The second uses the elements that describe the content. They look the same, and the second is navigable by heading, announceable, and indexable.',
            html: `<div class="pair">
  <section>
    <h4>Div soup</h4>
    <div class="fake-nav">
      <div class="fake-link">Home</div>
      <div class="fake-link">Docs</div>
    </div>
    <div class="fake-btn" role="presentation">Save</div>
  </section>
  <section>
    <h4>Semantic</h4>
    <nav aria-label="Primary">
      <a href="#">Home</a>
      <a href="#">Docs</a>
    </nav>
    <button type="button">Save</button>
  </section>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.pair section { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem; }
h4 { margin: 0 0 0.5rem; font-size: 0.9rem; color: #475569; }
.fake-nav { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
.fake-link { color: #1d4ed8; text-decoration: underline; cursor: pointer; }
.fake-btn { display: inline-block; padding: 0.4rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; }
nav { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
a { color: #1d4ed8; }
button { padding: 0.4rem 0.75rem; border: 1px solid #cbd5e1; border-radius: 6px; background: #f8fafc; cursor: pointer; }`,
            height: 210,
          },
          {
            type: 'heading',
            id: 'c-l50-h1',
            level: 3,
            body: 'The three things you get for free',
          },
          {
            type: 'list',
            id: 'c-l50-l1',
            style: 'ordered',
            items: [
              '**Keyboard behaviour.** A button is focusable, activates on both Enter and Space, and fires a click event. A styled div does none of that without a pile of JavaScript.',
              '**Screen reader output.** A button is announced as a button. A nav is announced as a navigation landmark. A div is announced as nothing at all.',
              '**Search engine understanding.** A link is a link and a heading is a heading. Search engines weight the contents of an `a` element as anchor text; they cannot do that with a div.',
            ],
          },
          {
            type: 'code',
            id: 'c-l50-c1',
            language: 'html',
            title: 'The substitutions, one line at a time',
            code: `<!-- navigation -->
<div class="nav">...</div>          →  <nav aria-label="Main">...</nav>
<div class="menu">...</div>        →  <ul>...</ul> inside a nav

<!-- actions -->
<div class="btn" onclick="go()">Go</div>  →  <button type="button">Go</button>
<span onclick="go()">Go</span>             →  <button type="button">Go</button>
<div class="btn" tabindex="0">Go</div>     →  <button type="button">Go</button>

<!-- content regions -->
<div class="header">   →  <header>
<div class="footer">   →  <footer>
<div class="sidebar">  →  <aside>
<div class="article">  →  <article>
<div class="main">     →  <main>

<!-- text meaning -->
<b>important</b>       →  <strong>important</strong>
<i>emphasis</i>        →  <em>emphasis</em>
<div class="title">   →  <h1> to <h6>

<!-- nothing semantic applies -->
<div class="layout">   →  <div class="layout">, and that is fine`,
          },
          {
            type: 'heading',
            id: 'c-l50-h2',
            level: 3,
            body: 'Headings are the document outline',
          },
          {
            type: 'text',
            id: 'c-l50-b2',
            body: 'Heading levels are not about font size. `h1` through `h6` describe the nesting of the content, and the level is chosen by depth in the structure, not by visual importance. A screen reader user navigates by heading the way a sighted user scans the page, so skipping from `h1` to `h4` because the text looks important makes the outline unreadable. Style headings by class, never by changing the level.',
          },
          {
            type: 'tip',
            id: 'c-l50-t1',
            title: 'The div soup smell',
            body: 'If a stylesheet needs a selector to know what an element is — `.header`, `.sidebar`, `.comment` — the markup is missing that information. Those selectors are asking the CSS to reconstruct semantics that the HTML should have carried.',
          },
          {
            type: 'warning',
            id: 'c-l50-w1',
            title: 'Do not add ARIA to fix bad semantics',
            body: 'The first rule of ARIA is not to use it when a native element will do. `role="button"` on a div gives you the announcement but not the focus, the keyboard handling, or the disabled state. A real button gives you all of it. ARIA is for what HTML has no element for.',
          },
          {
            type: 'exercise',
            id: 'c-l50-x1',
            exercise: {
              id: 'ex-l50',
              instructions:
                'Build a page fragment with a nav containing links, an article with a correctly nested heading structure, and a real button instead of a div.',
              languages: ['html'],
              starterCode: {
                html: '<!-- nav with links -->\n\n<!-- article with nested headings -->\n\n<!-- a real button -->\n',
              },
              tests: [
                {
                  id: 'ex-l50-t1',
                  label: 'There is a nav containing at least two links',
                  body:
                    'return document.querySelectorAll("nav a").length >= 2',
                },
                {
                  id: 'ex-l50-t2',
                  label: 'There is an article with an h1',
                  body:
                    'return !!document.querySelector("article h1")',
                },
                {
                  id: 'ex-l50-t3',
                  label: 'The heading levels never skip a level going down',
                  body:
                    'const hs = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")); let ok = true; let prev = 0; for (const h of hs) { const lvl = Number(h.tagName[1]); if (prev && lvl > prev + 1) ok = false; prev = lvl; } return ok',
                },
                {
                  id: 'ex-l50-t4',
                  label: 'The action element is a button with an explicit type',
                  body:
                    'const b = document.querySelector("button"); return !!b && !!b.getAttribute("type")',
                },
                {
                  id: 'ex-l50-t5',
                  label: 'No div carries onclick for an action',
                  body: 'return !document.querySelector("div[onclick]") && !document.querySelector("span[onclick]")',
                },
              ],
              hints: [
                'Heading levels follow nesting, not font size. An h3 directly under an h1 is a skip.',
                'A button always gets an explicit type, because the default inside a form is submit.',
              ],
              solution: {
                html:
                  '<!-- nav with links -->\n<nav aria-label="Main">\n  <a href="/">Home</a>\n  <a href="/docs">Docs</a>\n</nav>\n\n<!-- article with nested headings -->\n<article>\n  <h1>Getting started</h1>\n  <p>Install the tool, then run it.</p>\n  <h2>Installing</h2>\n  <p>Use the package manager for your platform.</p>\n</article>\n\n<!-- a real button -->\n<button type="button">Save</button>\n',
              },
              testNotes:
                'The third test walks the headings in document order and fails on any downward jump of more than one level, which is the outline problem the lesson describes.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s40',
    title: 'HTML Style Guide',
    description: 'Conventions that make markup easier to read, and the document-wide rules that apply everywhere.',
    lessons: [
      {
        id: 'html-l51',
        title: 'HTML Style Guide',
        description: 'Indentation, attribute quoting, element order, and the conventions worth being consistent about.',
        duration: 5,
        objectives: [
          'Apply consistent indentation and lower-case tag names',
          'Always quote attribute values and explain why',
          'Write a small document that follows a house style',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l51',
          title: 'HTML Style Guide quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l51-q1',
              type: 'multiple-choice',
              prompt: 'Why should tag names be lower case?',
              options: [
                'It saves bytes',
                'It is required for CSS to work',
                'HTML is case-insensitive but XML is not, and mixed case breaks in a case-sensitive context',
                'Browsers do not accept upper case',
              ],
              answer: 2,
              explanation: 'Upper case still renders, but it is wrong in XML and confusing when the markup moves into a stricter pipeline.',
            },
            {
              id: 'quiz-html-l51-q2',
              type: 'true-false',
              prompt: 'An attribute value can be left unquoted when it contains no spaces.',
              answer: false,
              explanation: 'It can parse, but the convention is to always quote. An empty attribute still needs quotes: class="".',
            },
            {
              id: 'quiz-html-l51-q3',
              type: 'multiple-choice',
              prompt: 'Which is a void element with no closing tag?',
              options: [
                'div',
                'span',
                'img',
                'p',
              ],
              answer: 2,
              explanation: 'img, br, hr, input, meta and link are void; they have no content and no end tag.',
            },
            {
              id: 'quiz-html-l51-q4',
              type: 'blank',
              prompt: 'How is a boolean attribute such as disabled correctly written?',
              answers: [
                'disabled',
                'disabled',
                '<input disabled>',
              ],
              explanation: 'Boolean attributes are present or absent. Writing disabled="false" still disables it.',
            },
            {
              id: 'quiz-html-l51-q5',
              type: 'multiple-choice',
              prompt: 'What is the best way to enforce indentation style?',
              options: [
                'A code review checklist',
                'A formatter run on save',
                'A comment at the top of the file',
                'Nothing, it is a matter of taste',
              ],
              answer: 1,
              explanation: 'A tool removes the whole class of discussion and leaves review time for decisions that need judgement.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l51-b1',
            body: 'A style guide is a set of conventions so that markup written by different people looks like it was written by one person. None of the rules below change how a page behaves. All of them change how quickly a person can read it, and a surprising number of them are also enforced by a validator or a formatter.',
          },
          {
            type: 'demo',
            id: 'c-l51-d1',
            title: 'The same markup, twice',
            body: 'The first version works. The second works identically and is readable, diffable, and greppable. Nothing about the rendering changed.',
            html: `<div class=card><h2 class=card__title>Report</h2><p class=card__body>Sales rose through the year.</p><a class=card__link href=/reports>All reports</a></div>

<div class="card">
  <h2 class="card__title">Report</h2>
  <p class="card__body">Sales rose through the year.</p>
  <a class="card__link" href="/reports">All reports</a>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.card { border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; margin-bottom: 0.5rem; max-width: 420px; }
.card__title { margin: 0 0 0.5rem; font-size: 1.1rem; }
.card__body { margin: 0 0 0.75rem; }
.card__link { color: #1d4ed8; }`,
            height: 250,
          },
          {
            type: 'list',
            id: 'c-l51-l1',
            style: 'bullet',
            items: [
              '**Lower-case tag names.** `section`, not `SECTION`. Case-insensitive in HTML, but it breaks in a case-sensitive context and in XML.',
              '**Two-space indentation.** Nested by depth, never by eye.',
              '**Always quote attribute values.** `class=""` with an empty value is valid; `class=` is not.',
              '**One attribute per line when there are more than two.** Readable, and the diff is useful.',
              '**Boolean attributes without a value.** `disabled`, not `disabled="true"`.',
              '**Close every non-void element.** Void elements — img, br, hr, input, meta, link — have no closing tag.',
              '**Trailing slash on void elements, if you use one style.** `<img />` and `<img>` are both fine; pick one.',
              '**The doctype first, in lower case.** `<!doctype html>` is the modern form.',
            ],
          },
          {
            type: 'code',
            id: 'c-l51-c1',
            language: 'html',
            title: 'A document following the conventions',
            code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Report</title>
    <link rel="stylesheet" href="/css/site.css">
  </head>
  <body>
    <!-- one comment, on its own line, above what it describes -->
    <header>
      <nav aria-label="Main">
        <ul>
          <li><a href="/" aria-current="page">Home</a></li>
          <li><a href="/reports">Reports</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <h1>Report</h1>

      <table>
        <caption>Quarterly figures</caption>
        <thead>
          <tr>
            <th scope="col">Region</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">North</th>
            <td>1,204</td>
          </tr>
        </tbody>
      </table>

      <!-- void elements, self-closed, one attribute per line when long -->
      <img
        src="/img/trend.png"
        alt="A line chart trending upwards"
        width="640"
        height="320"
      >
      <br>
    </main>
  </body>
</html>`,
          },
          {
            type: 'tip',
            id: 'c-l51-t1',
            title: 'Let a formatter do it',
            body: 'Every rule here that is not a semantic one is better enforced by a tool than by a person. A formatter run on save removes the entire class of discussion about indentation and attribute layout, and leaves the review for the things that actually need judgement.',
          },
          {
            type: 'warning',
            id: 'c-l51-w1',
            title: 'Consistency beats correctness of style',
            body: 'A project that indents with tabs and does it everywhere is fine. A project where two files disagree is not, and the disagreement costs more than either choice ever saved.',
          },
          {
            type: 'exercise',
            id: 'c-l51-x1',
            exercise: {
              id: 'ex-l51',
              instructions:
                'Write a small document that follows the conventions: lower-case tags, two-space indentation, quoted attribute values, a lang attribute and a doctype.',
              languages: ['html'],
              starterCode: {
                html: '',
              },
              tests: [
                {
                  id: 'ex-l51-t1',
                  label: 'The doctype is the first thing in the document',
                  body:
                    'return document.doctype && document.doctype.name.toLowerCase() === "html"',
                },
                {
                  id: 'ex-l51-t2',
                  label: 'The html element declares a language',
                  body:
                    'const l = document.documentElement.getAttribute("lang"); return !!l && l.trim().length >= 2',
                },
                {
                  id: 'ex-l51-t3',
                  label: 'Every attribute value in the body is quoted in the source',
                  body:
                    'return !/<[a-zA-Z][^>]*\\s[a-zA-Z-]+=[^\'"\\s>]/.test(document.body.innerHTML)',
                },
                {
                  id: 'ex-l51-t4',
                  label: 'There is a head containing a charset and a title',
                  body:
                    'return !!document.querySelector("head meta[charset]") && !!document.querySelector("head title")',
                },
                {
                  id: 'ex-l51-t5',
                  label: 'The body has at least two elements to show the structure',
                  body:
                    'return document.body.querySelectorAll("*").length >= 2',
                },
              ],
              hints: [
                'The doctype and the lang attribute are both required by the conventions, and both are checked.',
                'An unquoted attribute value is the thing the third test looks for — check the source, not the DOM.',
              ],
              solution: {
                html:
                  '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8">\n    <title>Notes</title>\n  </head>\n  <body>\n    <h1>Notes</h1>\n    <p>Everything in this document follows the house style.</p>\n  </body>\n</html>\n',
              },
              testNotes:
                'The third test runs against innerHTML, which is why it catches an unquoted value in the source even though the DOM parser would have repaired it.',
            },
          },
        ],
      },
    ],
  },
]
