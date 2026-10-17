import type { Section } from '~/types/content'

export const htmlIntroSections: Section[] = [
  {
    id: 'html-s1',
    title: 'Getting started',
    description: 'What this course covers, how every lesson is built, and what you will be able to do at the end.',
    lessons: [
      {
        id: 'html-l1',
        title: 'How this course works',
        description: 'A tour of the course, the shape of every lesson, and the four things you will be able to do when you finish.',
        duration: 4,
        objectives: [
          'Describe what this course covers and in what order it builds',
          'Explain the shape of every lesson: live result, then markup, then a challenge',
          'Name the four things you will be able to do once you finish',
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'c-l1-b1',
            body: 'HTML is the structure of the web. Every page you will ever open is a tree of elements, and everything else in the browser — the styling, the behaviour, the way a screen reader announces things — hangs off that tree. This course takes you from an empty file to a complete, accessible page.',
          },
          {
            type: 'demo',
            id: 'c-l1-d1',
            title: 'The same page, before and after the course',
            body: 'Two cards, identical in meaning. The left one is a pile of unlabelled divs. The right one is the same content marked up so a browser, a search engine and a screen reader all know what it is.',
            html: `<div class="row">
  <div class="card">
    <h3>Unlabelled</h3>
    <p>Written as a stack of divs with a class for the look and nothing for the meaning.</p>
    <pre>&lt;div class="card"&gt;
  &lt;div class="title"&gt;Unlabelled&lt;/div&gt;
  &lt;div class="body"&gt;...&lt;/div&gt;
&lt;/div&gt;</pre>
  </div>
  <div class="card good">
    <h3>Marked up</h3>
    <p>The same content, with each piece named for what it is rather than how it looks.</p>
    <pre>&lt;article class="card"&gt;
  &lt;h3&gt;Marked up&lt;/h3&gt;
  &lt;p&gt;...&lt;/p&gt;
&lt;/article&gt;</pre>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
.row { display: flex; gap: 1rem; align-items: stretch; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; font-size: 14px; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.card p { margin: 0 0 0.75rem; }
.card pre { margin: 0; padding: 0.6rem; background: #f4f6f8; border-radius: 6px; font-size: 11.5px; line-height: 1.5; overflow: auto; }
.good { border-color: #29e2bd; }`,
            height: 260,
          },
          {
            type: 'text',
            id: 'c-l1-b2',
            body: 'That difference is the whole subject of this course. A browser will render both of those cards, and they will look almost identical side by side. But only one of them tells you, or a search engine, or someone listening with a screen reader, that the second thing is an article with a heading and a paragraph.',
          },
          {
            type: 'heading',
            id: 'c-l1-h1',
            level: 3,
            body: 'How the course is organised',
          },
          {
            type: 'list',
            id: 'c-l1-l1',
            style: 'bullet',
            items: [
              '**The document first.** The doctype, the root element, the head, and what each of them is actually for.',
              '**Elements and attributes.** The two things every tag is made of, and the difference between them.',
              '**Text and structure.** Headings, paragraphs, formatting, quotations, and why nesting them in the right order matters more than how they look.',
              '**Links and images.** The two elements that make a document a place rather than a page.',
              '**Tables and lists.** Both are about relationships, and both are usually misused.',
              '**Forms.** Every input type, the attributes that control behaviour, and the accessibility rules that go with them.',
              '**Semantics and accessibility.** The elements that exist so the meaning survives, plus the parts of ARIA worth knowing.',
              '**Media, graphics and browser APIs.** Video, audio, canvas, SVG, and the platform features a page can reach for.',
            ],
          },
          {
            type: 'text',
            id: 'c-l1-b3',
            body: 'The order is deliberate. Nothing in the forms section makes sense before you know what an attribute is, and nothing in the semantics section makes sense before you have written the forms it is describing. If a lesson does not land, the problem is almost always in the section before it.',
          },
          {
            type: 'heading',
            id: 'c-l1-h2',
            level: 3,
            body: 'What every lesson looks like',
          },
          {
            type: 'list',
            id: 'c-l1-l2',
            style: 'ordered',
            items: [
              'A live example at the top. You see the rendered result before you see a single character of markup.',
              'The markup that produced it, with the parts that matter called out.',
              'The attributes and elements in a form you can look things up in.',
              'One challenge. You write the HTML, the platform runs it in a real browser, and it tells you which element or attribute you got wrong.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l1-t1',
            title: 'Read the rendered example, not just the code',
            body: 'HTML is unusual in that the code is not the product. A page that looks wrong in your editor may be fine in a browser, and a page that looks right in your editor may be broken. Always look at the result.',
          },
          {
            type: 'exercise',
            id: 'c-l1-x1',
            exercise: {
              id: 'ex-l1',
              instructions:
                'Turn the three divs below into a real article: an <article> containing an <h3> heading and a <p> paragraph. Keep the text exactly as it is.',
              languages: ['html'],
              starterCode: {
                html: '<div>\n  <div>Weekly notes</div>\n  <div>Everything that happened, in order.</div>\n</div>\n',
              },
              tests: [
                {
                  id: 'ex-l1-t1',
                  label: 'There is an <article> element',
                  body: 'return !!document.querySelector("article")',
                },
                {
                  id: 'ex-l1-t2',
                  label: 'The article contains a heading element',
                  body: 'return !!document.querySelector("article h2, article h3, article h4")',
                },
                {
                  id: 'ex-l1-t3',
                  label: 'The article contains a paragraph element',
                  body: 'return !!document.querySelector("article p")',
                },
                {
                  id: 'ex-l1-t4',
                  label: 'No div elements are left',
                  body: 'return document.querySelectorAll("div").length === 0',
                },
              ],
              hints: [
                'The outer wrapper becomes `<article>`.',
                'A heading inside an article is normally an `<h3>` or `<h2>`, not an `<h1>`, because the page itself already owns the `<h1>`.',
                '`<article><h3>Weekly notes</h3><p>Everything that happened, in order.</p></article>`',
              ],
              solution: {
                html: '<article>\n  <h3>Weekly notes</h3>\n  <p>Everything that happened, in order.</p>\n</article>\n',
              },
              testNotes:
                'The tests query the live DOM, so they check what the browser actually built from your markup rather than searching the source text.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s1',
      title: 'Getting started check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s1-q1',
          type: 'multiple-choice',
          prompt: 'What is HTML responsible for?',
          options: [
            'How a page looks and where things sit',
            'What happens when someone clicks a button',
            'The structure and meaning of the content',
            'The requests a page makes to a server',
          ],
          answer: 2,
          explanation:
            'HTML is structure. Presentation belongs to CSS and behaviour belongs to JavaScript, and keeping the three apart is what makes each of them replaceable on its own.',
        },
        {
          id: 'quiz-html-s1-q2',
          type: 'true-false',
          prompt:
            'In the two cards at the top of this lesson, a browser would render the unlabelled version and the marked-up version almost identically.',
          answer: true,
          explanation:
            'Visually they are nearly the same. The difference is in what the markup tells you, a search engine, and a screen reader about what those pieces are.',
        },
        {
          id: 'quiz-html-s1-q3',
          type: 'multiple-choice',
          prompt: 'Which of these is NOT part of this course?',
          options: [
            'Forms and form accessibility',
            'Semantic elements',
            'Browser APIs such as web storage',
            'Building a backend server in Node',
          ],
          answer: 3,
          explanation:
            'The course stops at the platform the browser gives you. Server-side work is a different subject with a different set of tools.',
        },
        {
          id: 'quiz-html-s1-q4',
          type: 'blank',
          prompt: 'What is the first block of every lesson in this course?',
          answers: ['a live example', 'live example', 'demo', 'a live rendered example', 'live rendered example'],
          explanation:
            'Every lesson opens with a rendered example so you know what you are aiming at before you read any markup.',
        },
        {
          id: 'quiz-html-s1-q5',
          type: 'multiple-choice',
          prompt: 'Why does the order of the course matter?',
          options: [
            'Because the later sections are more valuable',
            'Because each section is only understandable once you have the one before it',
            'Because the exercises build on each other',
            'Because HTML cannot be learned out of order',
          ],
          answer: 1,
          explanation:
            'Attributes come before forms, and forms come before the accessibility rules written about them. Each section leans on the vocabulary the previous one introduced.',
        },
      ],
    },
  },
  {
    id: 'html-s2',
    title: 'HTML Introduction',
    description: 'What HTML is, what it deliberately does not do, and how a browser turns your text into a page.',
    lessons: [
      {
        id: 'html-l2',
        title: 'What HTML is',
        description: 'A language of elements and attributes, and the three things every HTML document needs.',
        duration: 6,
        objectives: [
          'Say what HTML is and what it deliberately does not do',
          'Write a complete HTML document with a doctype, root element and head',
          'Explain why a document needs a doctype at all',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l2-b1',
            body: 'HTML is a language of elements and attributes. An element is a thing — a paragraph, a heading, a link — written with a tag that has an opening end and a closing end. An attribute is extra information about that element, written inside the opening tag. That is the entire vocabulary.',
          },
          {
            type: 'demo',
            id: 'c-l2-d1',
            title: 'An element and an attribute',
            body: 'The link below is one element, `<a>`. Its `href` is one attribute. The text between the tags is the content.',
            html: `<p>Here is a <a href="https://developer.mozilla.org" title="The MDN documentation site">link to the documentation</a>.</p>
<p>The tag is <code>&lt;a&gt;</code>, the attribute is <code>href</code>, and everything between the two tags is the content of the element.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; line-height: 1.6; }
a { color: #0f766e; }`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'c-l2-h1',
            level: 3,
            body: 'The three things every document needs',
          },
          {
            type: 'text',
            id: 'c-l2-b2',
            body: 'Every HTML file is a tree with one root, and the root is the `<html>` element. Inside it sit exactly two children: `<head>` for information about the page, and `<body>` for the content itself. Getting this wrong is the single most common cause of a page behaving in ways you did not expect.',
          },
          {
            type: 'list',
            id: 'c-l2-l1',
            style: 'ordered',
            items: [
              '`<!DOCTYPE html>` — tells the browser to use modern standards mode instead of a decades-old compatibility mode.',
              '`<html lang="en">` — the root element, and the language of the text inside it.',
              '`<head>` — the title, the character set, and any stylesheet. Nothing here is visible on the page.',
              '`<body>` — everything a visitor actually sees.',
            ],
          },
          {
            type: 'code',
            id: 'c-l2-c1',
            language: 'html',
            title: 'The smallest complete HTML document',
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>It worked.</p>
  </body>
</html>`,
          },
          {
            type: 'heading',
            id: 'c-l2-h2',
            level: 3,
            body: 'Why the doctype matters',
          },
          {
            type: 'text',
            id: 'c-l2-b3',
            body: 'The web spent years in a transitional period when browsers had to support genuinely broken markup from the 1990s. A browser that finds no doctype assumes it is looking at that old markup and switches into quirks mode, where the box model, vertical alignment and table sizing all behave differently. Add the doctype and the same page renders predictably.',
          },
          {
            type: 'warning',
            id: 'c-l2-w1',
            title: 'The doctype is not a tag',
            body: 'It has no closing tag, no attributes and no end. It is a single declaration on the very first line of the file, before anything else, not even a comment.',
          },
          {
            type: 'tip',
            id: 'c-l2-t1',
            title: 'The lang attribute is not decoration',
            body: 'Screen readers use it to pick a voice, browsers use it to choose hyphenation and font rules, and search engines use it to decide whether your content is relevant to a reader in another language. It is one character of effort for a large amount of return.',
          },
          {
            type: 'exercise',
            id: 'c-l2-x1',
            exercise: {
              id: 'ex-l2',
              instructions:
                'The page below is missing its two required pieces. Add a `<!DOCTYPE html>`-equivalent by... actually: the root element is missing its language. Add `lang="en"` to the `<html>` element so the page declares its language.',
              languages: ['html'],
              starterCode: {
                html: '<html>\n  <head>\n    <title>Report</title>\n  </head>\n  <body>\n    <h1>Weekly report</h1>\n  </body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l2-t1',
                  label: 'The root html element exists',
                  body: 'return !!document.documentElement',
                },
                {
                  id: 'ex-l2-t2',
                  label: 'The root html element has a lang attribute',
                  body: 'return document.documentElement.getAttribute("lang") === "en"',
                },
                {
                  id: 'ex-l2-t3',
                  label: 'The document has a non-empty title',
                  body: 'return (document.title || "").trim().length > 0',
                },
              ],
              hints: [
                'The attribute goes inside the opening tag, so it is `<html lang="en">`.',
                'Attributes are always `name="value"` with quotes around the value.',
              ],
              solution: {
                html: '<html lang="en">\n  <head>\n    <title>Report</title>\n  </head>\n  <body>\n    <h1>Weekly report</h1>\n  </body>\n</html>\n',
              },
              testNotes:
                'The test runs in a real document, so `<title>` inside `<head>` is parsed and exposed through `document.title` for you to check.',
            },
          },
        ],
      },
      {
        id: 'html-l3',
        title: 'How a browser reads your markup',
        description: 'Parsing, the tree the browser builds, and why your code rarely looks like the DOM you inspect.',
        duration: 6,
        objectives: [
          'Describe the steps a browser takes between receiving bytes and painting pixels',
          'Read the difference between the source you wrote and the DOM the browser built',
          'Explain what happens to markup you forget to close',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l3-b1',
            body: 'A browser does not render your file directly. It reads the bytes, decodes them into characters, parses those characters into a tree of nodes, corrects anything that is broken, and only then works out what to paint. The tree it builds is called the DOM, and it is not always identical to the text you wrote.',
          },
          {
            type: 'demo',
            id: 'c-l3-d1',
            title: 'What the browser makes of messy markup',
            body: 'The source on the left is missing a closing tag and never opened one at all. What the browser builds is on the right, and it is well-formed.',
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
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
.row { display: flex; gap: 1rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; font-size: 14px; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.card pre { margin: 0; font-size: 11.5px; line-height: 1.6; }`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'c-l3-h1',
            level: 3,
            body: 'The parser repairs rather than refuses',
          },
          {
            type: 'text',
            id: 'c-l3-b2',
            body: 'When the parser hits a `<li>` while it is still inside an open `<li>`, it closes the first one and starts the second. When it hits a `<p>` inside a `<ul>`, it closes the list, because a paragraph is not allowed there. These repairs are what make the web as broken as it is still render at all — but they also mean a missing tag can quietly move your content somewhere you did not intend.',
          },
          {
            type: 'list',
            id: 'c-l3-l1',
            style: 'bullet',
            items: [
              '`<br>` and `<img>` are the two void elements. They have no content and no closing tag.',
              'Everything else must be closed, even when the closing tag looks redundant.',
              'Omitting an end tag is legal HTML in a very small set of cases, and a bad idea in all of them.',
              'Attribute values with spaces must be quoted. Unquoted values end at the first space.',
            ],
          },
          {
            type: 'code',
            id: 'c-l3-c1',
            language: 'html',
            title: 'Void elements take no closing tag',
            code: `<p>One<br>Two</p>
<img src="logo.svg" alt="Company logo">
<input type="text" name="q">
<hr>`,
          },
          {
            type: 'heading',
            id: 'c-l3-h2',
            level: 3,
            body: 'The DOM is not your source code',
          },
          {
            type: 'text',
            id: 'c-l3-b3',
            body: 'This matters more than it sounds. If you open the developer tools and inspect your page, you will routinely see elements that you never typed and attributes that you never wrote: an inferred `<tbody>`, a `<head>` that appeared on its own, or a `style` attribute injected by a script. The DOM is the browser\'s interpretation of your file, and when something looks wrong in the inspector, start by asking whether the file is what you think it is.',
          },
          {
            type: 'tip',
            id: 'c-l3-t1',
            title: 'Check the source, not the inspector, when markup is misbehaving',
            body: 'The inspector shows the DOM after the browser has repaired it. "View source" shows what you actually wrote. When those two disagree, the disagreement is the bug.',
          },
          {
            type: 'exercise',
            id: 'c-l3-x1',
            exercise: {
              id: 'ex-l3',
              instructions:
                'The list below was written with unclosed list items. Rewrite it so every element is explicitly closed and no paragraph is nested inside a list.',
              languages: ['html'],
              starterCode: {
                html: '<ul>\n  <li>Write the markup\n  <li>Close every tag\n  <p>Not allowed in a list\n</ul>\n',
              },
              tests: [
                {
                  id: 'ex-l3-t1',
                  label: 'The list has exactly three list items',
                  body: 'return document.querySelectorAll("ul > li").length === 3',
                },
                {
                  id: 'ex-l3-t2',
                  label: 'No paragraph ended up inside the list',
                  body: 'return document.querySelectorAll("ul p").length === 0',
                },
                {
                  id: 'ex-l3-t3',
                  label: 'The third item is a list item, not a stray paragraph',
                  body: 'return document.querySelectorAll("ul > li")[2].textContent.trim() === "Not allowed in a list"',
                },
              ],
              hints: [
                'Each `<li>` needs its own `</li>`.',
                'The paragraph has to come after the `</ul>`, not inside it.',
              ],
              solution: {
                html: '<ul>\n  <li>Write the markup</li>\n  <li>Close every tag</li>\n</ul>\n<p>Not allowed in a list</p>\n',
              },
              testNotes:
                'The browser silently repairs the broken version, so the tests are written to detect the repair: an unclosed `<li>` followed by a `<p>` produces a list of two items and a paragraph outside the list.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s2',
      title: 'HTML Introduction quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s2-q1',
          type: 'multiple-choice',
          prompt: 'What are the two children of the root <html> element?',
          options: ['<header> and <footer>', '<head> and <body>', '<nav> and <main>', '<title> and <meta>'],
          answer: 1,
          explanation:
            'The root element has exactly two children: <head> for metadata about the page, and <body> for the content a visitor sees.',
        },
        {
          id: 'quiz-html-s2-q2',
          type: 'true-false',
          prompt: 'The doctype declaration needs a matching closing tag.',
          answer: false,
          explanation:
            'It is a single declaration on the first line, not an element. It has no closing tag and no attributes.',
        },
        {
          id: 'quiz-html-s2-q3',
          type: 'identify-error',
          prompt: 'What is wrong with this markup?',
          code: '<!DOCTYPE html>\n<html>\n<body>\n<p>Hello</p>\n</html>',
          options: [
            'Nothing is wrong',
            'The <body> element is never closed',
            'The <html> element is missing a lang attribute and a <head>',
            'The paragraph should be a heading',
          ],
          answer: 2,
          explanation:
            'A complete document declares its language on the root and has a <head> with at least a title. The <body> here is closed correctly.',
        },
        {
          id: 'quiz-html-s2-q4',
          type: 'blank',
          prompt:
            'Which attribute on the root element tells the browser what language the text is written in?',
          answers: ['lang', 'language'],
          explanation:
            '`lang="en"` on <html> drives screen reader voices, browser hyphenation and search relevance.',
        },
        {
          id: 'quiz-html-s2-q5',
          type: 'multiple-choice',
          prompt: 'Why does the browser repair malformed markup instead of refusing to render it?',
          options: [
            'To make error messages easier to read',
            'Because pages from the 1990s were badly broken and had to keep working',
            'To make the page load faster',
            'Because HTML is not a real specification',
          ],
          answer: 1,
          explanation:
            'Compatibility with genuinely broken 1990s markup is the whole reason the parser is so forgiving. The cost is that a missing tag can quietly relocate your content.',
        },
      ],
    },
  },
  {
    id: 'html-s3',
    title: 'HTML Editors',
    description: 'What an editor actually does for you, and the handful of features worth turning on.',
    lessons: [
      {
        id: 'html-l4',
        title: 'HTML Editors',
        description: 'What an editor does for you, and the four features actually worth turning on.',
        duration: 4,
        objectives: [
          'Name the three jobs an editor does that a plain text file cannot',
          'Explain why an editor that closes your tags for you can also hide mistakes',
          'Set up an editor so that unclosed tags are visible immediately',
        ],
        xp: 25,
        content: [
      {
        type: 'text',
        id: 'c-l4-b1',
        body: 'HTML is plain text, so any editor can write it. A good HTML editor earns its place by doing three things a text file cannot: it highlights the structure, it catches the mistakes that are invisible in raw text, and it closes tags and brackets for you.',
      },
      {
        type: 'demo',
        id: 'c-l4-d1',
        title: 'The same markup, raw and highlighted',
        body: 'On the left is a file as it looks in a plain text editor. On the right is the same file with structure highlighting. Nothing about the content changed; only the readability did.',
        html: `<div class="row">
  <div class="card">
    <h3>Plain text</h3>
    <pre>&lt;section class="card"&gt;
&lt;h2&gt;Opening hours&lt;/h2&gt;
&lt;p&gt;We are closed on Mondays.&lt;/p&gt;
&lt;/section&gt;</pre>
  </div>
  <div class="card">
    <h3>With highlighting</h3>
    <pre>&lt;<span class="t">section</span> <span class="a">class</span>=<span class="v">"card"</span>&gt;
&lt;<span class="t">h2</span>&gt;<span class="p">Opening hours</span>&lt;/<span class="t">h2</span>&gt;
&lt;<span class="t">p</span>&gt;<span class="p">We are closed on Mondays.</span>&lt;/<span class="t">p</span>&gt;
&lt;/<span class="t">section</span>&gt;</pre>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; }
.row { display: flex; gap: 1rem; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; font-size: 14px; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; }
.card pre { margin: 0; font-size: 11.5px; line-height: 1.6; }
.t { color: #7c3aed; font-weight: 600; }
.a { color: #b45309; }
.v { color: #0f766e; }
.p { color: #334155; }`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'c-l4-h1',
            level: 3,
            body: 'The features actually worth turning on',
          },
          {
            type: 'list',
            id: 'c-l4-l1',
            style: 'bullet',
            items: [
              '**Emmet abbreviations.** Type `nav>ul>li*4` and expand it into a nested skeleton. Faster than typing, and structurally boring, which is exactly what you want from boilerplate.',
              '**Error checking that runs on save.** Most editors can flag an unclosed tag or a mis-nested element. This is the single highest-value setting in the list.',
              '**Emitted documentation.** Hovering an element or attribute should show what it is for and which HTML version introduced it.',
              '**Format on save.** A formatter normalises indentation and attribute order so diffs stay readable.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l4-h2',
            level: 3,
            body: 'The trap with auto-closing tags',
          },
          {
            type: 'text',
            id: 'c-l4-b2',
            body: 'When your editor closes a tag for you, it can also close the wrong one. Nest a list inside a list and the closing tags can drift, producing a document that is valid but structured in a way you never intended. The cure is not to turn auto-close off — it is to look at the rendered result every time, and to let the error checker run.',
          },
          {
            type: 'tip',
            id: 'c-l4-t1',
            title: 'Learn the abbreviations, not the shortcuts',
            body: 'Emmet works in every editor, so it is worth learning. Editor-specific keybinding schemes are not. If you switch tools you keep the abbreviations and lose nothing.',
          },
          {
            type: 'warning',
            id: 'c-l4-w1',
            title: 'Do not edit HTML in a word processor',
            body: 'Word processors and online document tools add their own markup, styles and invisible characters. They will also happily reformat quotes and break a doctype. Use a real code editor.',
          },
          {
            type: 'exercise',
            id: 'c-l4-x1',
            exercise: {
              id: 'ex-l4',
              instructions:
                'Write a navigation landmark with a heading, a list of three links, and a paragraph of supporting text. Use the right elements for each: the navigation wrapper, a heading inside it, a list for the links, and a paragraph for the text.',
              languages: ['html'],
              starterCode: {
                html: '<nav>\n  \n</nav>\n',
              },
              tests: [
                {
                  id: 'ex-l4-t1',
                  label: 'There is a nav element',
                  body: 'return !!document.querySelector("nav")',
                },
                {
                  id: 'ex-l4-t2',
                  label: 'The nav contains a heading',
                  body: 'return !!document.querySelector("nav h1, nav h2, nav h3")',
                },
                {
                  id: 'ex-l4-t3',
                  label: 'The nav contains a list of exactly three links',
                  body: 'return document.querySelectorAll("nav ul li a, nav ol li a").length === 3',
                },
                {
                  id: 'ex-l4-t4',
                  label: 'The nav contains a paragraph',
                  body: 'return !!document.querySelector("nav p")',
                },
              ],
              hints: [
                'A navigation landmark is `<nav>`, not `<div class="nav">`.',
                'Links that belong together go in a `<ul>`, one `<li>` each.',
              ],
              solution: {
                html:
                  '<nav>\n  <h2>Main</h2>\n  <ul>\n    <li><a href="/courses">Courses</a></li>\n    <li><a href="/projects">Projects</a></li>\n    <li><a href="/about">About</a></li>\n  </ul>\n  <p>Everything on the site, in one place.</p>\n</nav>\n',
              },
              testNotes:
                'These tests check element types and structure in the live DOM. A visually identical page built from divs would fail all four.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s3',
      title: 'HTML Editors quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s3-q1',
          type: 'multiple-choice',
          prompt: 'Which editor feature is the most valuable for writing HTML?',
          options: [
            'A colour theme',
            'Error checking that runs as you type and on save',
            'Automatic tag closing',
            'Built-in file previews',
          ],
          answer: 1,
          explanation:
            'Structural mistakes are invisible in raw text. An error checker that flags an unclosed or mis-nested element is the feature that actually prevents bugs.',
        },
        {
          id: 'quiz-html-s3-q2',
          type: 'true-false',
          prompt: 'Because an editor can close tags for you, you never need to look at the rendered result.',
          answer: false,
          explanation:
            'Auto-closing can produce valid markup that is structured in a way you never intended. Rendering is the only way to know.',
        },
        {
          id: 'quiz-html-s3-q3',
          type: 'multiple-choice',
          prompt: 'What does the Emmet abbreviation nav>ul>li*4 expand to?',
          options: [
            'A list with four items inside a list inside a nav',
            'Four separate nav elements',
            'A nav with four paragraphs',
            'A nav with four classes named ul, li',
          ],
          answer: 0,
          explanation:
            'The > operator nests elements and the *N operator repeats the last one. Together they expand into a nested skeleton instantly.',
        },
        {
          id: 'quiz-html-s3-q4',
          type: 'blank',
          prompt:
            'Which element should you use for a block of navigation links, rather than a div with a class?',
          answers: ['nav', '<nav>'],
          explanation:
            '`<nav>` is a landmark. It tells assistive technology and browsers that this region is navigation, which is information a class name cannot carry.',
        },
        {
          id: 'quiz-html-s3-q5',
          type: 'multiple-choice',
          prompt: 'Why is a word processor a bad choice for writing HTML?',
          options: [
            'It cannot save files with an .html extension',
            'It adds its own markup, styles and invisible characters and reformats your code',
            'It is too slow to type in',
            'It does not support the HTML5 doctype',
          ],
          answer: 1,
          explanation:
            'Word processors are built to produce documents for other word processors. They insert their own styling and can silently reformat quotes, indentation and the doctype.',
        },
      ],
    },
  },
  {
    id: 'html-s4',
    title: 'HTML Basic',
    description: 'The seven or so elements that appear in nearly every document, and how to nest them properly.',
    lessons: [
      {
        id: 'html-l5',
        title: 'The elements every document uses',
        description: 'Headings, paragraphs, and the nesting rules that keep a document valid.',
        duration: 6,
        objectives: [
          'Write headings and paragraphs that nest in a valid order',
          'Explain why heading levels skip rather than reset',
          'Choose the right element for text that is not a paragraph',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l5-b1',
            body: 'Most documents are built from a very small set of elements repeated many times. Headings give structure, paragraphs give prose, and everything else is a variation on those two. Learning to nest them correctly matters far more than remembering every element in the specification.',
          },
          {
            type: 'demo',
            id: 'c-l5-d1',
            title: 'A valid outline and an invalid one',
            body: 'Both cards look reasonable. The left one has a valid heading order. The right one jumps from h2 to h4 and then back to h2, which breaks the outline it is supposed to describe.',
            html: `<div class="row">
  <div class="card">
    <h3>Valid outline</h3>
    <h1>Release notes</h1>
    <h2>March</h2>
    <h3>Fixed</h3>
    <p>The search box no longer loses focus.</p>
    <h3>Added</h3>
    <p>Dates can now be filtered.</p>
    <h2>February</h2>
    <p>Nothing changed.</p>
  </div>
  <div class="card bad">
    <h3>Invalid outline</h3>
    <h1>Release notes</h1>
    <h2>March</h2>
    <h4>Fixed</h4>
    <p>Skipped a level.</p>
    <h2>Fixed again</h2>
    <p>Went back up without closing the section.</p>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card > h3 { margin: 0 0 0.75rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.card h1 { font-size: 19px; margin: 0 0 0.5rem; }
.card h2 { font-size: 16px; margin: 0.9rem 0 0.4rem; }
.card h4 { font-size: 14px; margin: 0.9rem 0 0.4rem; }
.card p { margin: 0 0 0.5rem; }
.bad { border-color: #dc2626; }`,
            height: 300,
          },
          {
            type: 'heading',
            id: 'c-l5-h1',
            level: 3,
            body: 'Headings describe a hierarchy, not a size',
          },
          {
            type: 'text',
            id: 'c-l5-b2',
            body: 'An `<h1>` is not "big text". It is the top level of a document outline. Levels go down one at a time and never jump, and they do not reset just because you have started a new visual section — a new top-level section on the same page is still an `<h2>` under the page `<h1>`.',
          },
          {
            type: 'list',
            id: 'c-l5-l1',
            style: 'bullet',
            items: [
              'One `<h1>` per page, and it names the page.',
              '`<h2>` for the main sections, `<h3>` inside them, and so on.',
              'Never skip a level going down. Going back up is fine once a section has closed.',
              'Never choose a level for its font size. If the size is wrong, that is a CSS problem.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l5-h2',
            level: 3,
            body: 'Paragraphs and the text that is not a paragraph',
          },
          {
            type: 'text',
            id: 'c-l5-b3',
            body: 'A `<p>` is a block of prose. It is not a generic box. Text that is not prose — a label, a caption, a timestamp, a single line of metadata — belongs in something more specific, and each of those has an element that says what it is.',
          },
          {
            type: 'code',
            id: 'c-l5-c1',
            language: 'html',
            title: 'Matching the element to the meaning',
            code: `<!-- prose -->
<p>The office closes at six.</p>

<!-- a label for a control -->
<label for="email">Email address</label>

<!-- a caption for an illustration -->
<figure>
  <img src="office.jpg" alt="The front desk" />
  <figcaption>The front desk, third floor</figcaption>
</figure>

<!-- a quotation, with its source -->
<blockquote cite="https://example.com/source">
  <p>Structure is meaning.</p>
</blockquote>

<!-- machine-readable time -->
<p>Posted <time datetime="2026-03-01">1 March</time></p>`,
          },
          {
            type: 'tip',
            id: 'c-l5-t1',
            title: 'The quickest nesting check',
            body: 'Read the document as an outline with the tags removed. If the list of headings reads like a table of contents, the structure is right. If it reads like a list of font sizes, it is not.',
          },
          {
            type: 'exercise',
            id: 'c-l5-x1',
            exercise: {
              id: 'ex-l5',
              instructions:
                'Rebuild the markup below so the headings form a valid outline: one h1, then h2 sections, then h3 subsections, with no skipped levels. Use a paragraph for the prose.',
              languages: ['html'],
              starterCode: {
                html:
                  '<h1>Handbook</h1>\n<h4>Getting started</h4>\n<p>Install it and run it.</p>\n<h2>Reference</h2>\n<h4>Commands</h4>\n<p>Everything the tool accepts.</p>\n',
              },
              tests: [
                {
                  id: 'ex-l5-t1',
                  label: 'There is exactly one h1',
                  body: 'return document.querySelectorAll("h1").length === 1',
                },
                {
                  id: 'ex-l5-t2',
                  label: 'No heading skips a level on the way down',
                  body:
                    'const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(h => Number(h.tagName[1])); for (let i = 1; i < hs.length; i++) { if (hs[i] > hs[i-1] + 1) return false } return true',
                },
                {
                  id: 'ex-l5-t3',
                  label: 'There are two h2 sections',
                  body: 'return document.querySelectorAll("h2").length === 2',
                },
                {
                  id: 'ex-l5-t4',
                  label: 'Each h2 section contains an h3',
                  body:
                    'return [...document.querySelectorAll("h2")].every(h => !!h.parentElement.querySelector("h3"))',
                },
              ],
              hints: [
                'The first heading is a top-level section, so it should be an `<h2>` under the page `<h1>`.',
                'The sub-headings under each of those should be `<h3>`, not `<h4>`.',
              ],
              solution: {
                html:
                  '<h1>Handbook</h1>\n<h2>Getting started</h2>\n<h3>Install</h3>\n<p>Install it and run it.</p>\n<h2>Reference</h2>\n<h3>Commands</h3>\n<p>Everything the tool accepts.</p>\n',
              },
              testNotes:
                'The outline test walks the headings in document order and fails if any heading is more than one level deeper than the one before it.',
            },
          },
        ],
      },
      {
        id: 'html-l6',
        title: 'Nesting and the shapes you will write most',
        description: 'How elements nest, why nesting is not layout, and the boilerplate you will retype until you stop noticing.',
        duration: 6,
        objectives: [
          'Describe why nesting in HTML is about meaning rather than appearance',
          'Write the page skeleton every document shares',
          'Recognise the difference between structural and presentational nesting',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l6-b1',
            body: 'Elements nest inside other elements, and the shape of that nesting is a claim about meaning. A paragraph inside a list item says the item is a piece of prose. A list inside a list says the items are subordinate. None of that is about appearance — and the appearance is not supposed to be affected by it.',
          },
          {
            type: 'demo',
            id: 'c-l6-d1',
            title: 'Two different nests, two different meanings',
            body: 'Both are lists of four items. One says the items belong to a group; the other says each item has its own sub-list. The markup differs by one element, and the meaning differs completely.',
            html: `<div class="row">
  <div class="card">
    <h3>One group of four</h3>
    <ul>
      <li>Requests</li>
      <li>Responses</li>
      <li>Errors</li>
      <li>Logs</li>
    </ul>
  </div>
  <div class="card">
    <h3>Four groups of two</h3>
    <ul>
      <li>Requests
        <ul><li>Headers</li><li>Body</li></ul>
      </li>
      <li>Responses
        <ul><li>Headers</li><li>Body</li></ul>
      </li>
    </ul>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.6rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
ul { margin: 0; padding-left: 1.1rem; }
ul ul { margin-top: 0.2rem; color: #475569; }`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l6-h1',
            level: 3,
            body: 'Nesting is not layout',
          },
          {
            type: 'text',
            id: 'c-l6-b2',
            body: 'The oldest habit in HTML is reaching for a `<div>` to make something sit next to something else, then wrapping it in another `<div>` to make it sit next to that. Those wrappers are structural noise: they say nothing, and they make the document harder to read for the next person and for every tool that has to parse it. Position comes from CSS.',
          },
          {
            type: 'tip',
            id: 'c-l6-t1',
            title: 'If you cannot name a wrapper div, delete it',
            body: 'Ask what that element *is*. If the answer is "it makes the thing line up", it does not belong in the document and it belongs in a stylesheet instead.',
          },
          {
            type: 'heading',
            id: 'c-l6-h2',
            level: 3,
            body: 'The skeleton every document shares',
          },
          {
            type: 'code',
            id: 'c-l6-c1',
            language: 'html',
            title: 'The page shell you will retype a hundred times',
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page title</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header>
      <nav aria-label="Main">...</nav>
    </header>
    <main>
      <h1>Page title</h1>
      ...
    </main>
    <footer>...</footer>
    <script src="app.js"></script>
  </body>
</html>`,
          },
          {
            type: 'list',
            id: 'c-l6-l2',
            style: 'bullet',
            items: [
              '`<header>` and `<footer>` are not the same as the page top and bottom. They are the header and footer of the nearest sectioning element.',
              '`<main>` holds the unique content of the page. There should be exactly one.',
              '`aria-label` on a landmark gives it a name when a page has more than one of the same kind.',
              'The script goes at the end of the body so the DOM exists before the code runs.',
            ],
          },
          {
            type: 'exercise',
            id: 'c-l6-x1',
            exercise: {
              id: 'ex-l6',
              instructions:
                'Remove the presentational wrapper divs and rebuild the layout with landmarks. The result must have a header, a main, and a footer, with no div elements at all.',
              languages: ['html'],
              starterCode: {
                html:
                  '<div class="wrapper">\n  <div class="top">\n    <div class="inner"><a href="/">Home</a></div>\n  </div>\n  <div class="content">\n    <h1>Release notes</h1>\n  </div>\n  <div class="bottom">\n    <p>Copyright 2026</p>\n  </div>\n</div>\n',
              },
              tests: [
                {
                  id: 'ex-l6-t1',
                  label: 'There is no div left anywhere',
                  body: 'return document.querySelectorAll("div").length === 0',
                },
                {
                  id: 'ex-l6-t2',
                  label: 'There is exactly one main element',
                  body: 'return document.querySelectorAll("main").length === 1',
                },
                {
                  id: 'ex-l6-t3',
                  label: 'The main element contains the h1',
                  body: 'return !!document.querySelector("main h1")',
                },
                {
                  id: 'ex-l6-t4',
                  label: 'There is a header and a footer',
                  body: 'return !!document.querySelector("header") && !!document.querySelector("footer")',
                },
                {
                  id: 'ex-l6-t5',
                  label: 'The copyright text ended up in the footer',
                  body: 'return (document.querySelector("footer")?.textContent || "").includes("Copyright")',
                },
              ],
              hints: [
                'The outer wrapper is not needed at all — the landmarks can sit directly in the body.',
                'The top bar with the link becomes `<header>`, the content becomes `<main>`, and the copyright becomes `<footer>`.',
              ],
              solution: {
                html:
                  '<header>\n  <nav><a href="/">Home</a></nav>\n</header>\n<main>\n  <h1>Release notes</h1>\n</main>\n<footer>\n  <p>Copyright 2026</p>\n</footer>\n',
              },
              testNotes:
                'The first test is the one that matters: a page that looks identical but is built from wrapper divs fails it, because the wrappers carry no meaning.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s4',
      title: 'HTML Basic quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s4-q1',
          type: 'multiple-choice',
          prompt: 'What does an h1 element mean?',
          options: [
            'The largest text on the page',
            'The top level of the document outline',
            'The page title shown in the browser tab',
            'A heading that must appear once per section',
          ],
          answer: 1,
          explanation:
            'Heading levels describe a hierarchy, not a font size. The tab title is a separate thing, set with <title> in the head.',
        },
        {
          id: 'quiz-html-s4-q2',
          type: 'true-false',
          prompt: 'It is fine to jump from an h2 straight to an h4 when the h3 would look too big.',
          answer: false,
          explanation:
            'Levels are never chosen for size. A skipped level breaks the outline for screen reader users, who navigate by heading level.',
        },
        {
          id: 'quiz-html-s4-q3',
          type: 'multiple-choice',
          prompt: 'Which element should wrap a date that the browser should understand as a date?',
          options: ['<span>', '<p>', '<time>', '<small>'],
          answer: 2,
          explanation:
            '<time datetime="2026-03-01">1 March</time> carries a machine-readable value while showing human-readable text.',
        },
        {
          id: 'quiz-html-s4-q4',
          type: 'blank',
          prompt: 'How many <main> elements should a page have?',
          answers: ['one', '1'],
          explanation:
            'Exactly one. It marks the unique content of the page, and a second one would make the landmark ambiguous.',
        },
        {
          id: 'quiz-html-s4-q5',
          type: 'multiple-choice',
          prompt: 'Why is a wrapper div used purely to line two things up side by side a problem?',
          options: [
            'Divs cannot contain other elements',
            'Browsers render them with a default margin',
            'It carries no meaning and belongs in CSS instead',
            'It breaks the heading outline',
          ],
          answer: 2,
          explanation:
            'A div with no meaning is structural noise. It makes the document harder to parse and tells nobody anything. Layout belongs in the stylesheet.',
        },
      ],
    },
  },
]
