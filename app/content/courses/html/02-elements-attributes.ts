import type { Section } from '~/types/content'

export const htmlElementsSections: Section[] = [
  {
    id: 'html-s5',
    title: 'HTML Elements',
    description: 'The element catalogue, paired and void elements, and the difference between grouping and sectioning.',
    lessons: [
      {
        id: 'html-l7',
        title: 'The element catalogue',
        description: 'How elements are written, which ones need a closing tag, and the two categories that matter.',
        duration: 6,
        objectives: [
          'Write an element with an opening tag, content and a closing tag',
          'Name the elements that have no closing tag and explain why',
          'Sort an unfamiliar element into a category you already know',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l7-b1',
            body: 'An element is three parts: an opening tag, some content, and a closing tag. `<p>Hello</p>` is one element. The tag name is `p`, the content is `Hello`, and the two tags are the same name — the closing one has a slash in front of it. That is the whole pattern, and almost every element in the language follows it.',
          },
          {
            type: 'demo',
            id: 'c-l7-d1',
            title: 'Paired elements and void elements side by side',
            body: 'On the left, elements that wrap content. On the right, elements that cannot hold content and are written with a single tag.',
            html: `<div class="row">
  <div class="card">
    <h3>Paired — they wrap content</h3>
    <p><code>&lt;p&gt;</code> holds text.</p>
    <p><code>&lt;strong&gt;</code> holds <strong>text</strong>.</p>
    <p><code>&lt;a&gt;</code> holds <a href="#">a link</a>.</p>
    <p><code>&lt;div&gt;</code> holds <div>other elements</div></p>
  </div>
  <div class="card">
    <h3>Void — they hold nothing</h3>
    <p><code>&lt;br&gt;</code> is a line break.</p>
    <p><code>&lt;img&gt;</code> is an image.</p>
    <p><code>&lt;input&gt;</code> is a field.</p>
    <p><code>&lt;hr&gt;</code> is a horizontal rule.</p>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.6rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.card p { margin: 0 0 0.4rem; }
code { background: #f1f5f9; padding: 0.1rem 0.3rem; border-radius: 4px; font-size: 12.5px; }`,
            height: 230,
          },
          {
            type: 'heading',
            id: 'c-l7-h1',
            level: 3,
            body: 'Why some elements have no closing tag',
          },
          {
            type: 'text',
            id: 'c-l7-b2',
            body: 'Void elements exist to mark something that has no content of its own. A line break is not a container. An image is not a container. An input is not a container. There is nothing for a closing tag to close, so writing one is a syntax error, and the parser will treat it as a stray tag. In older HTML, void elements were written `<br>` and `<img>`. The modern style is `<br />` and `<img />`, with a slash that makes it obvious you meant the void form.',
          },
          {
            type: 'code',
            id: 'c-l7-c1',
            language: 'html',
            title: 'The void elements you will actually use',
            code: `<!-- Content flow -->
<br />          a line break
<hr />          a thematic break

<!-- Embedded content -->
<img src="logo.svg" alt="Company logo" />
<area />
<audio controls>
  <source src="intro.mp3" type="audio/mpeg" />
</audio>
<video controls poster="cover.jpg">
  <source src="intro.mp4" type="video/mp4" />
</video>
<track kind="captions" src="en.vtt" srclang="en" label="English" />
<embed src="widget.svg" type="image/svg+xml" />
<iframe src="about.html" title="About us"></iframe>

<!-- Form controls -->
<input type="text" />
<source />      <!-- inside picture -->
<param />       <!-- legacy, inside object -->
<col />
<base />
<link />
<meta />`,
          },
          {
            type: 'tip',
            id: 'c-l7-t1',
            title: 'The slash on void elements is a hint, not a requirement',
            body: 'HTML5 parsers treat `<br>` and `<br />` identically. Write the slash so a reader — including you in six months — can tell at a glance that no closing tag is coming.',
          },
          {
            type: 'warning',
            id: 'c-l7-w1',
            title: 'Not every element is void',
            body: '`<textarea>`, `<script>` and `<style>` hold content, so they do need closing tags. Writing `<textarea />` produces an element that swallows the rest of the document.',
          },
          {
            type: 'exercise',
            id: 'c-l7-x1',
            exercise: {
              id: 'ex-l7',
              instructions:
                'Fix the markup below. Three elements are void and were given closing tags, and two paired elements were never closed.',
              languages: ['html'],
              starterCode: {
                html:
                  '<section>\n  <h2>Office</h2>\n  <p>Second floor<br></br>\n  <p>Open Monday to Friday.</p>\n  <img src="office.jpg" alt="The office"></img>\n  <address>1 High Street</address>\n</section>\n',
              },
              tests: [
                {
                  id: 'ex-l7-t1',
                  label: 'There is a real line break, not an empty br element',
                  body: 'return document.querySelectorAll("br").length === 1',
                },
                {
                  id: 'ex-l7-t2',
                  label: 'The image element is not nested inside another element',
                  body: 'const img = document.querySelector("img"); return !!img && img.parentElement.tagName === "SECTION"',
                },
                {
                  id: 'ex-l7-t3',
                  label: 'The address element is a sibling of the paragraphs',
                  body: 'return document.querySelectorAll("section > p").length === 2',
                },
                {
                  id: 'ex-l7-t4',
                  label: 'The section has a heading, two paragraphs, an image and an address',
                  body:
                    'const s = document.querySelector("section"); return !!s.querySelector("h2") && s.querySelectorAll("p").length === 2 && !!s.querySelector("img") && !!s.querySelector("address")',
                },
              ],
              hints: [
                '`<br></br>` is not a line break followed by an empty element — the parser produces a `br` inside a `br`. Write just `<br />`.',
                'The stray `</img>` becomes a real element in the DOM, which is why the image is not where you expect it.',
              ],
              solution: {
                html:
                  '<section>\n  <h2>Office</h2>\n  <p>Second floor<br /></p>\n  <p>Open Monday to Friday.</p>\n  <img src="office.jpg" alt="The office" />\n  <address>1 High Street</address>\n</section>\n',
              },
              testNotes:
                'A closing tag on a void element is not ignored by the parser — it is turned into a stray element, which is exactly what the second test detects.',
            },
          },
        ],
      },
      {
        id: 'html-l8',
        title: 'Grouping and sectioning',
        description: 'Elements that hold other elements, and the ones that name a region of the page.',
        duration: 6,
        objectives: [
          'Distinguish an element that groups content from one that names a region',
          'Choose between div, section, article, aside and nav',
          'Explain why a sectioning element changes the heading outline',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l8-b1',
            body: 'Most elements come in one of two families. Grouping elements such as `div` and `span` exist purely to hold other things together, and carry no meaning of their own. Sectioning elements such as `section`, `article` and `nav` also hold things together, but the name is a claim: this region is navigation, this region is self-contained content, this region is a distinct topic.',
          },
          {
            type: 'demo',
            id: 'c-l8-d1',
            title: 'The same layout, named three ways',
            body: 'Three cards with identical markup except for the wrapper element. Only the third one tells anything about what it contains.',
            html: `<div class="row">
  <div class="card">
    <h3>&lt;div&gt;</h3>
    <p>A generic container. Says nothing. Perfectly valid, completely opaque.</p>
  </div>
  <div class="card">
    <h3>&lt;section&gt;</h3>
    <p>A distinct topic. It creates its own outline level and can be linked to.</p>
  </div>
  <div class="card good">
    <h3>&lt;article&gt;</h3>
    <p>Self-contained content that would still make sense on its own, syndicated elsewhere.</p>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: stretch; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.5rem; font-size: 15px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.card p { margin: 0; }
.good { border-color: #29e2bd; }`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l8-h1',
            level: 3,
            body: 'The sectioning elements',
          },
          {
            type: 'list',
            id: 'c-l8-l1',
            style: 'bullet',
            items: [
              '`<section>` — a distinct topic within the page. Generic on purpose; pair it with a heading so it is not anonymous.',
              '`<article>` — self-contained content that makes sense on its own: a blog post, a news story, a product review.',
              '`<aside>` — content tangentially related to what surrounds it: a sidebar, a pull quote, a glossary.',
              '`<nav>` — a block of major navigation links. One per page is normal; more than one is fine if each is labelled.',
              '`<header>` and `<footer>` — the header and footer of the nearest sectioning ancestor, not necessarily of the page.',
              '`<main>` — the unique content of the page. Exactly one per document.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l8-h2',
            level: 3,
            body: 'Sectioning changes the outline',
          },
          {
            type: 'text',
            id: 'c-l8-b2',
            body: 'This is the part that surprises people. Wrapping content in a `<section>` creates a new outline level. The `<h2>` inside it is a child of that section, not a sibling of the `<h1>` above it — so an `<h1>` inside a `<section>` is a new top-level heading, not a second one on the page. The outline is derived from where elements sit in the tree, not from the numbers in the tag names.',
          },
          {
            type: 'tip',
            id: 'c-l8-t1',
            title: 'Reach for div when you have nothing to say',
            body: 'A `div` with no sectioning role is not a failure. It is the correct element for a purely visual grouping. Reach for `section` when you can name the topic, and `article` when the content stands alone.',
          },
          {
            type: 'exercise',
            id: 'c-l8-x1',
            exercise: {
              id: 'ex-l8',
              instructions:
                'Replace the generic divs with the sectioning elements that name what they contain: one main region, one navigation region, and one self-contained article.',
              languages: ['html'],
              starterCode: {
                html:
                  '<div class="page">\n  <div class="menu">\n    <a href="/">Home</a>\n  </div>\n  <div class="body">\n    <div class="post">\n      <h1>Why semantics pay off</h1>\n      <p>A short argument.</p>\n    </div>\n  </div>\n</div>\n',
              },
              tests: [
                {
                  id: 'ex-l8-t1',
                  label: 'There are no div elements left',
                  body: 'return document.querySelectorAll("div").length === 0',
                },
                {
                  id: 'ex-l8-t2',
                  label: 'The navigation region uses nav',
                  body: 'return !!document.querySelector("nav a")',
                },
                {
                  id: 'ex-l8-t3',
                  label: 'The self-contained post uses article',
                  body: 'return !!document.querySelector("article h1")',
                },
                {
                  id: 'ex-l8-t4',
                  label: 'The post sits inside a main region',
                  body: 'return !!document.querySelector("main article")',
                },
              ],
              hints: [
                'The outermost wrapper becomes `<main>`, the link block becomes `<nav>`, and the post becomes `<article>`.',
                'The link block needs no extra element around the anchor — `<nav>` holds it directly.',
              ],
              solution: {
                html:
                  '<main>\n  <nav>\n    <a href="/">Home</a>\n  </nav>\n  <article>\n    <h1>Why semantics pay off</h1>\n    <p>A short argument.</p>\n  </article>\n</main>\n',
              },
              testNotes:
                'A page built from classed divs renders identically and fails the first three tests, which is precisely the difference semantics buys you.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s5',
      title: 'HTML Elements quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s5-q1',
          type: 'multiple-choice',
          prompt: 'Which of these is NOT a void element?',
          options: ['<br>', '<img>', '<textarea>', '<hr>'],
          answer: 2,
          explanation:
            '<textarea> holds content, so it needs a closing tag. Writing <textarea /> makes it swallow the rest of the document.',
        },
        {
          id: 'quiz-html-s5-q2',
          type: 'true-false',
          prompt: 'Writing </img> is a harmless way of closing an image element.',
          answer: false,
          explanation:
            'Void elements have no closing tag. The parser turns a stray </img> into a real element, which then wraps whatever follows it.',
        },
        {
          id: 'quiz-html-s5-q3',
          type: 'multiple-choice',
          prompt: 'Which element names a self-contained piece of content that would still make sense syndicated on its own?',
          options: ['<div>', '<section>', '<article>', '<span>'],
          answer: 2,
          explanation:
            '<article> is specifically for content that stands alone. <section> is a topic within a page and <div> says nothing at all.',
        },
        {
          id: 'quiz-html-s5-q4',
          type: 'blank',
          prompt:
            'Wrapping content in a <section> creates a new outline level, so which heading element is correct for the title of a section that sits under the page h1?',
          answers: ['h2', '<h2>', 'h2 heading'],
          explanation:
            'Because the section is nested under the page heading, its title is one level deeper. The number follows the tree, not the tag name.',
        },
        {
          id: 'quiz-html-s5-q5',
          type: 'multiple-choice',
          prompt: 'When is a plain div the right choice?',
          options: [
            'Never, always prefer a sectioning element',
            'When the grouping is purely visual and you have no meaningful name for it',
            'When the element contains text',
            'When the element needs a class for styling',
          ],
          answer: 1,
          explanation:
            'A div is exactly right for a grouping you cannot name. It becomes wrong only when it is standing in for a region that does have a meaning.',
        },
      ],
    },
  },
  {
    id: 'html-s6',
    title: 'HTML Attributes',
    description: 'Attribute syntax, global attributes, boolean attributes, and custom data attributes.',
    lessons: [
      {
        id: 'html-l9',
        title: 'Writing attributes',
        description: 'Where attributes go, when they need quotes, and why unquoted values break.',
        duration: 5,
        objectives: [
          'Write an attribute in the correct position inside an opening tag',
          'Explain when quotes are required and what breaks without them',
          'Choose a sensible attribute for a job rather than inventing one',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l9-b1',
            body: 'Attributes go inside the opening tag, after the element name, as name/value pairs. They configure the element rather than providing its content. Some attributes are boolean and take no value at all; the rest always take one.',
          },
          {
            type: 'demo',
            id: 'c-l9-d1',
            title: 'Quoted and unquoted values',
            body: 'The second link is written without quotes. It works here by luck. The third one has a class list with a space in it and is broken.',
            html: `<p>
  <a href="/guides">Correct: quoted</a> &middot;
  <a href=/guides>Works, but only by luck</a>
</p>
<p>
  <a href=/guides/intro class=lead>Broken: the class stops at the space</a>
</p>
<p>Only the first two links are blue. The third lost its href and its class.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
p { margin: 0.6rem 0; }
a { color: #0f766e; }`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'c-l9-h1',
            level: 3,
            body: 'The rules that are not optional',
          },
          {
            type: 'list',
            id: 'c-l9-l1',
            style: 'bullet',
            items: [
              'Always quote attribute values. Double quotes are the convention; single quotes work too, just do not mix them in one file.',
              'An unquoted value ends at the first space, tab or newline. `class=lead bold` sets `class="lead"` and leaves `bold` as a stray attribute.',
              'The attribute name comes first, then `=`, then the value. Spaces around the `=` are legal and ignored.',
              'Attribute names are case-insensitive in HTML, and are lowercased by the parser. `HREF` becomes `href`.',
            ],
          },
          {
            type: 'code',
            id: 'c-l9-c1',
            language: 'html',
            title: 'One element, six attributes',
            code: `<a
  href="/guides/getting-started"
  class="link link--primary"
  id="start-here"
  title="Read this first"
  target="_blank"
  rel="noopener"
>Getting started</a>`,
          },
          {
            type: 'tip',
            id: 'c-l9-t1',
            title: 'Let the editor format your attributes',
            body: 'One attribute per line, one per row, is far easier to review in a diff than a single 300-character line. Every editor can do it.',
          },
          {
            type: 'exercise',
            id: 'c-l9-x1',
            exercise: {
              id: 'ex-l9',
              instructions:
                'Rewrite the link below so it is correct: the class attribute must survive its space, and the target attribute should be given a matching rel for safety.',
              languages: ['html'],
              starterCode: {
                html: '<a href=/guides class=link link--primary target=_blank>Guides</a>\n',
              },
              tests: [
                {
                  id: 'ex-l9-t1',
                  label: 'The href is set to /guides',
                  body: 'return document.querySelector("a").getAttribute("href") === "/guides"',
                },
                {
                  id: 'ex-l9-t2',
                  label: 'The class attribute contains both class names',
                  body: 'return document.querySelector("a").getAttribute("class") === "link link--primary"',
                },
                {
                  id: 'ex-l9-t3',
                  label: 'The link opens in a new tab',
                  body: 'return document.querySelector("a").getAttribute("target") === "_blank"',
                },
                {
                  id: 'ex-l9-t4',
                  label: 'A noopener rel is present for safety',
                  body: 'return (document.querySelector("a").getAttribute("rel") || "").includes("noopener")',
                },
              ],
              hints: [
                'Wrap every value in double quotes.',
                'A link with `target="_blank"` should also carry `rel="noopener"` so the new page cannot reach back through `window.opener`.',
              ],
              solution: {
                html: '<a href="/guides" class="link link--primary" target="_blank" rel="noopener">Guides</a>\n',
              },
              testNotes:
                'The unquoted original silently truncates the class at the first space, so `link--primary` becomes a stray attribute instead of part of the class list.',
            },
          },
        ],
      },
      {
        id: 'html-l10',
        title: 'Global, boolean and data attributes',
        description: 'The attributes that work on every element, the ones that are just present or absent, and your own.',
        duration: 5,
        objectives: [
          'List the global attributes and say what each one is for',
          'Write a boolean attribute correctly',
          'Store and read a custom value with a data attribute',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l10-b1',
            body: 'Some attributes work on any element. They are called global attributes, and a handful of them will appear in nearly every file you write. Others are boolean: they are either present or not, and you never write a value for them.',
          },
          {
            type: 'demo',
            id: 'c-l10-d1',
            title: 'Global, boolean and custom attributes on one element',
            body: 'The same button carrying a global attribute, a boolean attribute, and a data attribute of your own. The dataset readout below is reading that last one back out.',
            html: `<button
  id="save"
  class="btn"
  data-panel="settings"
  data-index="3"
  hidden
  onclick="document.getElementById('out').textContent = 'data-panel=' + this.dataset.panel + ', data-index=' + this.dataset.index + ', hidden=' + this.hidden"
>Save</button>
<p id="out">Press the button to read its attributes back.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.btn { padding: 0.5rem 1rem; border: 0; border-radius: 6px; background: #0f766e; color: #fff; font-weight: 600; cursor: pointer; font-size: 14px; }
p { margin: 0.8rem 0 0; color: #475569; }`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'c-l10-h1',
            level: 3,
            body: 'The global attributes worth knowing',
          },
          {
            type: 'list',
            id: 'c-l10-l1',
            style: 'bullet',
            items: [
              '`class` — a space-separated list of styling hooks. The single most used attribute in HTML.',
              '`id` — a unique identifier for one element on the page. Also the target for in-page links and for `<label for>`.',
              '`hidden` — hides the element entirely. It is a boolean attribute, and it beats any CSS you write.',
              '`tabindex` — controls tab order. `0` means focusable in source order, `-1` means focusable only by script, a positive number overrides everything.',
              '`title` — a tooltip. Useful as a fallback, useless as a label: it does not appear on touch devices and is invisible to keyboard users until hovered.',
              '`lang` and `dir` — language and reading direction. Both are essential on a page that is not entirely in one language.',
              '`data-*` — your own values, readable from JavaScript through the `dataset` object.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l10-h2',
            level: 3,
            body: 'Boolean attributes',
          },
          {
            type: 'text',
            id: 'c-l10-b2',
            body: 'A boolean attribute is on or off, and there is no third state. The presence of the attribute is the value. Writing `disabled="false"` does not enable the control — it disables it, because the attribute is present. This catches almost everyone once.',
          },
          {
            type: 'code',
            id: 'c-l10-c1',
            language: 'html',
            title: 'Boolean attributes, all of which mean the same thing',
            code: `<button disabled>Save</button>
<button disabled="">Save</button>
<button disabled="disabled">Save</button>
<button disabled="false">Save</button>   <!-- still disabled! -->

<!-- to enable a boolean attribute from JavaScript, remove it: -->
<button id="save">Save</button>`,
          },
          {
            type: 'heading',
            id: 'c-l10-h3',
            level: 3,
            body: 'Custom data attributes',
          },
          {
            type: 'text',
            id: 'c-l10-b3',
            body: 'A `data-` attribute lets you attach your own value to an element without inventing a non-standard attribute. The name after `data-` becomes a camelCase key on the element\'s `dataset`, so `data-panel` reads as `element.dataset.panel`. The value is always a string, no matter what it looks like.',
          },
          {
            type: 'code',
            id: 'c-l10-c2',
            language: 'html',
            title: 'Reading a data attribute',
            code: `<!-- in the markup -->
<button data-user-id="1042" data-confirm="Delete this file?">Delete</button>

<!-- in the script -->
const button = document.querySelector('button')
button.dataset.userId   // "1042"  (camelCase)
button.dataset.confirm  // "Delete this file?"`,
          },
          {
            type: 'warning',
            id: 'c-l10-w1',
            title: 'A title attribute is not a label',
            body: '`title` only shows on hover with a mouse. It is unavailable on touch, invisible to keyboard users, and often ignored by screen readers entirely. Use a real `<label>` for form controls and visible text for everything else.',
          },
          {
            type: 'exercise',
            id: 'c-l10-x1',
            exercise: {
              id: 'ex-l10',
              instructions:
                'Fix the button below: it is disabled with a value of "false" and it needs a data attribute recording which panel it belongs to.',
              languages: ['html'],
              starterCode: {
                html: '<button data-panel="settings" disabled="false">Save settings</button>\n',
              },
              tests: [
                {
                  id: 'ex-l10-t1',
                  label: 'The button is not disabled',
                  body: 'return !document.querySelector("button").disabled',
                },
                {
                  id: 'ex-l10-t2',
                  label: 'The data-panel attribute is still present',
                  body: 'return document.querySelector("button").dataset.panel === "settings"',
                },
                {
                  id: 'ex-l10-t3',
                  label: 'The button has no stray disabled attribute',
                  body: 'return !document.querySelector("button").hasAttribute("disabled")',
                },
              ],
              hints: [
                'A boolean attribute is controlled by whether it is present, so the fix is to remove it entirely rather than set it to false.',
                'Leave the `data-panel` attribute exactly as it is.',
              ],
              solution: { html: '<button data-panel="settings">Save settings</button>\n' },
              testNotes:
                '`disabled="false"` still disables the control, because the browser only checks for the presence of the attribute.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s6',
      title: 'HTML Attributes quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s6-q1',
          type: 'multiple-choice',
          prompt: 'What happens with class=link link--primary written without quotes?',
          options: [
            'The class becomes "link link--primary" as intended',
            'The class becomes "link" and link--primary is treated as a separate attribute',
            'The attribute is dropped entirely',
            'It is a syntax error and nothing renders',
          ],
          answer: 1,
          explanation:
            'An unquoted value ends at the first space. Everything after that is parsed as another attribute name, which is how broken class lists happen.',
        },
        {
          id: 'quiz-html-s6-q2',
          type: 'true-false',
          prompt: 'Writing disabled="false" on a button enables it.',
          answer: false,
          explanation:
            'Boolean attributes are controlled by presence. The attribute is present, so the control is disabled no matter what the value says.',
        },
        {
          id: 'quiz-html-s6-q3',
          type: 'multiple-choice',
          prompt: 'How do you read a data-user-id attribute from JavaScript?',
          options: [
            'element.getAttribute("userId")',
            'element.dataset.userId',
            'element.data["user-id"]',
            'element.attributes.userId',
          ],
          answer: 1,
          explanation:
            'Data attributes are exposed on the dataset object with the name after data- converted to camelCase.',
        },
        {
          id: 'quiz-html-s6-q4',
          type: 'blank',
          prompt: 'Which boolean attribute hides an element completely, overriding any CSS you write?',
          answers: ['hidden'],
          explanation:
            '`hidden` is in the UA stylesheet as `display: none`, and it wins over author styles in the same way any other user-agent rule does.',
        },
        {
          id: 'quiz-html-s6-q5',
          type: 'multiple-choice',
          prompt: 'Why is a title attribute a poor substitute for a label?',
          options: [
            'It is not supported in modern browsers',
            'It only appears on mouse hover, so touch and keyboard users never see it',
            'It cannot contain spaces',
            'It overrides the accessible name in every screen reader',
          ],
          answer: 1,
          explanation:
            'A tooltip is invisible on touch devices and invisible to keyboard users until hovered. Form controls need a real <label>.',
        },
      ],
    },
  },
  {
    id: 'html-s7',
    title: 'HTML Headings',
    description: 'The six levels, what each one means, and how to build an outline that survives.',
    lessons: [
      {
        id: 'html-l11',
        title: 'HTML Headings',
        description: 'What the six heading levels mean, and how to build an outline that never breaks.',
        duration: 5,
        objectives: [
          'Explain what a heading level means and what it does not mean',
          'Build a valid outline that never skips a level going down',
          'Choose a level based on nesting depth rather than appearance',
        ],
        xp: 30,
        content: [
      {
        type: 'text',
        id: 'c-l11-b1',
        body: 'HTML has six heading levels, `<h1>` through `<h6>`. The number is a depth in the document outline, nothing more. It says how far the current topic is from the top of the page. It does not say how big the text should be — that is entirely a CSS decision.',
      },
      {
        type: 'demo',
        id: 'c-l11-d1',
        title: 'One outline, three renderings',
        body: 'The same heading structure sized three different ways. Nothing about the meaning changed; only the CSS did. A screen reader hears the same thing in all three.',
        html: `<div class="row">
  <div class="card">
    <h3>Sized by tag name</h3>
    <div class="bad">
      <h1 style="font-size: 32px">Release notes</h1>
      <h2 style="font-size: 20px">March</h2>
      <h3 style="font-size: 16px">Fixed</h3>
      <h6 style="font-size: 10px">A ticket number</h6>
    </div>
  </div>
  <div class="card">
    <h3>Sized consistently</h3>
    <div class="good">
      <h1>Release notes</h1>
      <h2>March</h2>
      <h3>Fixed</h3>
      <h4>A ticket number</h4>
    </div>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card > h3 { margin: 0 0 0.75rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.bad, .good { line-height: 1.4; }
.bad h6 { margin: 0.5rem 0 0; color: #94a3b8; }
.good h1 { font-size: 22px; margin: 0 0 0.4rem; }
.good h2 { font-size: 17px; margin: 0.6rem 0 0.3rem; }
.good h3 { font-size: 15px; margin: 0.5rem 0 0.3rem; }
.good h4 { font-size: 13px; margin: 0.5rem 0 0; color: #64748b; }`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'c-l11-h1',
            level: 3,
            body: 'How to pick a level',
          },
          {
            type: 'list',
            id: 'c-l11-l1',
            style: 'ordered',
            items: [
              'One `<h1>` per page, and it names the page. Not the site, not the logo — the page.',
              '`<h2>` for each major section of that page.',
              '`<h3>` for subsections inside an `<h2>`, and so on down to `<h6>`.',
              'If the level you need is `<h7>`, the structure is too deep. Flatten it rather than skipping back to a smaller number.',
            ],
          },
          {
            type: 'text',
            id: 'c-l11-b2',
            body: 'Going back up is unrestricted. A `<h2>` can follow an `<h4>` with no problem, because you have finished that subsection and returned to the section level. The rule only constrains going down.',
          },
          {
            type: 'tip',
            id: 'c-l11-t1',
            title: 'Screen reader users navigate by heading',
            body: 'The rotor, the headings list and jump shortcuts in most screen readers are all built on heading levels. A broken outline does not just look untidy — it removes the fastest way of moving around your page for exactly the users who depend on it.',
          },
          {
            type: 'exercise',
            id: 'c-l11-x1',
            exercise: {
              id: 'ex-l11',
              instructions:
                'Rebuild this outline so it is valid. The nested "Windows" and "macOS" topics sit inside a broader "Install" section, and the page has one h1.',
              languages: ['html'],
              starterCode: {
                html:
                  '<h1>Getting started</h1>\n<h3>Install</h3>\n<h5>Windows</h5>\n<p>Download the installer.</p>\n<h5>macOS</h5>\n<p>Run it from your Downloads folder.</p>\n<h3>Next steps</h3>\n<p>Open the app.</p>\n',
              },
              tests: [
                {
                  id: 'ex-l11-t1',
                  label: 'There is exactly one h1',
                  body: 'return document.querySelectorAll("h1").length === 1',
                },
                {
                  id: 'ex-l11-t2',
                  label: 'No heading skips a level on the way down',
                  body:
                    'const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map(h => Number(h.tagName[1])); for (let i = 1; i < hs.length; i++) { if (hs[i] > hs[i-1] + 1) return false } return true',
                },
                {
                  id: 'ex-l11-t3',
                  label: 'Windows and macOS are one level below Install',
                  body: 'return document.querySelectorAll("h3").length === 4',
                },
                {
                  id: 'ex-l11-t4',
                  label: 'No heading below h4 is used',
                  body: 'return document.querySelectorAll("h5, h6").length === 0',
                },
              ],
              hints: [
                'The two top-level sections are `<h2>`, so "Install" moves from `<h3>` to `<h2>`.',
                'Windows and macOS are one level deeper than Install, so they become `<h3>` rather than `<h5>`.',
              ],
              solution: {
                html:
                  '<h1>Getting started</h1>\n<h2>Install</h2>\n<h3>Windows</h3>\n<p>Download the installer.</p>\n<h3>macOS</h3>\n<p>Run it from your Downloads folder.</p>\n<h2>Next steps</h2>\n<p>Open the app.</p>\n',
              },
              testNotes:
                'The third test counts h3 elements: the two platform headings plus the two section headings promoted from h3 to h2 give four in total.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s7',
      title: 'HTML Headings quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s7-q1',
          type: 'multiple-choice',
          prompt: 'What does the number in an h3 element mean?',
          options: [
            'The font size to use',
            'The depth of this heading in the document outline',
            'The order the heading appears on the page',
            'The importance of the heading for search engines',
          ],
          answer: 1,
          explanation:
            'The number is a nesting depth. Size is a styling decision and belongs in CSS.',
        },
        {
          id: 'quiz-html-s7-q2',
          type: 'true-false',
          prompt: 'Going from an h4 back up to an h2 is a structural error.',
          answer: false,
          explanation:
            'Going back up is unrestricted, because you have finished that subsection. Only skipping a level on the way down breaks the outline.',
        },
        {
          id: 'quiz-html-s7-q3',
          type: 'multiple-choice',
          prompt: 'You need a seventh level of heading. What should you do?',
          options: [
            'Use h1 again',
            'Use h6 and make the text smaller',
            'Flatten the structure so h6 is deep enough',
            'Use a div with a bold style',
          ],
          answer: 2,
          explanation:
            'Six levels is the whole range. If you genuinely need a seventh, the document is nested too deeply and the fix is structural.',
        },
        {
          id: 'quiz-html-s7-q4',
          type: 'blank',
          prompt: 'How many h1 elements should a page have?',
          answers: ['one', '1', 'exactly one'],
          explanation:
            'One h1 that names the page. More than one means the page has no single title.',
        },
        {
          id: 'quiz-html-s7-q5',
          type: 'multiple-choice',
          prompt: 'Why does a broken heading outline matter beyond appearance?',
          options: [
            'Search engines penalise it',
            'Screen reader users navigate pages by heading level, so a broken outline removes their fastest way around',
            'Browsers refuse to render the page',
            'It makes the page load slower',
          ],
          answer: 1,
          explanation:
            'Heading lists and rotor navigation are built entirely on levels. That is a primary way of moving through a long document without reading it linearly.',
        },
      ],
    },
  },
  {
    id: 'html-s8',
    title: 'HTML Paragraphs',
    description: 'The paragraph element, what breaks a paragraph, and what to use for text that is not prose.',
    lessons: [
      {
        id: 'html-l12',
        title: 'HTML Paragraphs',
        description: 'What whitespace does and does not do, and the elements for text that is not prose.',
        duration: 5,
        objectives: [
          'Write paragraphs that separate themselves correctly with no markup at all',
          'Explain why line breaks and extra spaces in your source do nothing',
          'Choose an element for text that is not a paragraph of prose',
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'c-l12-b1',
            body: 'A paragraph is a block of prose, and `<p>` is its element. What surprises people is how much HTML does on its own: the browser collapses every run of whitespace down to a single space, so a new line in your source file is not a line break in the output. Paragraphs are separated by the element, not by blank lines.',
          },
          {
            type: 'demo',
            id: 'c-l12-d1',
            title: 'Whitespace does nothing. Elements do everything.',
            body: 'Both of these render identically. The first has blank lines, indentation and a manual break in the source. The second has none of that and exactly the same markup.',
            html: `<div class="row">
  <div class="card">
    <h3>Source with whitespace</h3>
    <pre>&lt;p&gt;First sentence.

      Second sentence, indented
      on its own line.&lt;/p&gt;

    &lt;p&gt;A second paragraph.&lt;/p&gt;</pre>
  </div>
  <div class="card good">
    <h3>What it renders as</h3>
    <p>First sentence. Second sentence, indented on its own line.</p>
    <p>A second paragraph.</p>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.6rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.card p { margin: 0 0 0.6rem; }
pre { margin: 0; font-size: 11.5px; line-height: 1.5; white-space: pre-wrap; background: #f4f6f8; padding: 0.5rem; border-radius: 6px; }
.good { border-color: #29e2bd; }`,
            height: 230,
          },
          {
            type: 'heading',
            id: 'c-l12-h1',
            level: 3,
            body: 'When to break a paragraph',
          },
          {
            type: 'text',
            id: 'c-l12-b2',
            body: 'Break when the idea changes, not when the line gets long. Authors coming from word processors often split paragraphs at a fixed column width; that produces a choppy page and a poor reading experience on a phone, where the same paragraph would fit comfortably on one screen. Write the paragraph as one thought and let the browser wrap it.',
          },
          {
            type: 'code',
            id: 'c-l12-c1',
            language: 'html',
            title: 'The elements that are not paragraphs',
            code: `<!-- prose: a real paragraph -->
<p>The train leaves at six.</p>

<!-- a label attached to a control, not prose -->
<label for="seat">Seat</label>

<!-- a caption for an image -->
<figcaption>Platform 4, looking north</figcaption>

<!-- a quotation -->
<blockquote><p>We closed the line in 1998.</p></blockquote>

<!-- a date the browser can read -->
<p>Last updated <time datetime="2026-03-01T09:15">this morning</time></p>

<!-- a line of metadata, not a sentence -->
<small>Updated 1 March 2026</small>`,
          },
          {
            type: 'warning',
            id: 'c-l12-w1',
            title: 'Never nest a block element inside a paragraph',
            body: 'The parser closes the `<p>` when it meets a `<div>`, a `<ul>` or any other block element, silently splitting your paragraph in two and moving the rest out of it. This is one of the most common causes of "why is my layout broken" in HTML.',
          },
          {
            type: 'tip',
            id: 'c-l12-t1',
            title: 'Indent freely',
            body: 'Because whitespace collapses, you can indent your HTML however you like. Pretty source is free, and it makes nested structure much easier to read.',
          },
          {
            type: 'exercise',
            id: 'c-l12-x1',
            exercise: {
              id: 'ex-l12',
              instructions:
                'The paragraph below has a list written inside it, which the parser silently splits. Move the list out of the paragraph so the structure survives.',
              languages: ['html'],
              starterCode: {
                html:
                  '<p>Bring the following:<ul><li>A passport</li><li>Two photographs</li></ul></p>\n',
              },
              tests: [
                {
                  id: 'ex-l12-t1',
                  label: 'The list is not inside a paragraph',
                  body: 'return document.querySelectorAll("p ul").length === 0',
                },
                {
                  id: 'ex-l12-t2',
                  label: 'There is still exactly one paragraph',
                  body: 'return document.querySelectorAll("p").length === 1',
                },
                {
                  id: 'ex-l12-t3',
                  label: 'The list has two items',
                  body: 'return document.querySelectorAll("ul > li").length === 2',
                },
                {
                  id: 'ex-l12-t4',
                  label: 'The paragraph comes before the list',
                  body:
                    'const p = document.querySelector("p"); const ul = document.querySelector("ul"); return !!(p.compareDocumentPosition(ul) & Node.DOCUMENT_POSITION_FOLLOWING)',
                },
              ],
              hints: [
                'The browser already closed your paragraph before the `<ul>` — the markup you wrote and the DOM you get are different.',
                'End the paragraph, then start the list as a sibling.',
              ],
              solution: {
                html: '<p>Bring the following:</p>\n<ul>\n  <li>A passport</li>\n  <li>Two photographs</li>\n</ul>\n',
              },
              testNotes:
                'The parser repairs nested block content by closing the paragraph early, so the original markup already produces two siblings in the DOM.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s8',
      title: 'HTML Paragraphs quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s8-q1',
          type: 'multiple-choice',
          prompt: 'What does a blank line in your HTML source do?',
          options: [
            'It creates a visible gap in the page',
            'Nothing, because the browser collapses runs of whitespace to a single space',
            'It closes the current paragraph',
            'It adds vertical margin',
          ],
          answer: 1,
          explanation:
            'Whitespace in the source is collapsed. Only elements create separation, which is why paragraphs need <p> tags rather than blank lines.',
        },
        {
          id: 'quiz-html-s8-q2',
          type: 'true-false',
          prompt: 'A ul element written inside a p element will be nested inside the paragraph in the DOM.',
          answer: false,
          explanation:
            'The parser closes the paragraph when it hits a block element. The list becomes a sibling, silently, and your source no longer matches the DOM.',
        },
        {
          id: 'quiz-html-s8-q3',
          type: 'multiple-choice',
          prompt: 'Which element should hold a label attached to a form control?',
          options: ['<p>', '<span>', '<label>', '<small>'],
          answer: 2,
          explanation:
            '<label> is not prose. It associates text with a control so clicking it focuses the field and screen readers announce the relationship.',
        },
        {
          id: 'quiz-html-s8-q4',
          type: 'blank',
          prompt:
            'Which element marks up a quotation from another source, and carries the source in a cite attribute?',
          answers: ['blockquote', '<blockquote>'],
          explanation:
            '<blockquote> marks the quotation itself. The optional cite attribute on it points at the source.',
        },
        {
          id: 'quiz-html-s8-q5',
          type: 'multiple-choice',
          prompt: 'When should you split a paragraph?',
          options: [
            'When it reaches a fixed line length',
            'When the idea changes',
            'Whenever a sentence gets longer than the others',
            'At the end of every sentence',
          ],
          answer: 1,
          explanation:
            'Split on meaning, not on width. A paragraph broken at a fixed column length reads badly on a phone, where the same text would fit on one screen.',
        },
      ],
    },
  },
  {
    id: 'html-s9',
    title: 'HTML Formatting',
    description: 'The elements that mark up emphasis and importance, and when none of them is the right answer.',
    lessons: [
      {
        id: 'html-l13',
        title: 'Semantic formatting elements',
        description: 'Strong, em, mark, small, del, ins, sub, sup and what each one actually means.',
        duration: 6,
        objectives: [
          'Choose between strong and em from the meaning rather than the appearance',
          'Name the element for text that has been deleted or inserted',
          'Explain why b, i and u exist alongside the semantic elements',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l13-b1',
            body: 'The formatting elements carry meaning that a stylesheet cannot add later. `<strong>` says this text is important. `<em>` says this text is emphasised. Both look similar by default, and both usually render bold or italic — which is exactly why you have to choose on meaning rather than on how you want it to look.',
          },
          {
            type: 'demo',
            id: 'c-l13-d1',
            title: 'Same rendering, different meaning',
            body: 'These four runs of text look identical in a browser. Read them aloud and they mean four different things.',
            html: `<p><strong>Important:</strong> the deadline is Friday.</p>
<p><em>Especially</em> the deadline is Friday.</p>
<p><strong><em>Both:</em></strong> the deadline is Friday.</p>
<p><span>Neither:</span> the deadline is Friday.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
p { margin: 0 0 0.6rem; }`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'c-l13-h1',
            level: 3,
            body: 'The set',
          },
          {
            type: 'list',
            id: 'c-l13-l1',
            style: 'bullet',
            items: [
              '`<strong>` — importance or urgency. Not "make this bold".',
              '`<em>` — emphasis that changes the meaning of the sentence. Remove it and the sentence should read differently.',
              '`<mark>` — text highlighted as relevant to the current context, such as a search hit.',
              '`<small>` — side content such as a legal disclaimer, at a smaller size than the surrounding text.',
              '`<del>` — text deleted in a revision, and therefore not to be used. Renders struck through.',
              '`<ins>` — text inserted in a revision. Renders underlined.',
              '`<sub>` and `<sup>` — subscript and superscript, for formulae and ordinals.',
              '`<abbr>` and `<dfn>` — an abbreviation with its expansion, and a term being defined.',
              '`<code>`, `<kbd>`, `<samp>`, `<var>`, `<time>` — inline text with a specific technical role.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l13-h2',
            level: 3,
            body: 'Then what are b, i and u for?',
          },
          {
            type: 'text',
            id: 'c-l13-b2',
            body: '`<b>`, `<i>` and `<u>` are the original presentational elements, and they still exist. `<b>` is for text drawn in a bold face with no added importance — a product name in a review, say. `<i>` is for a run of text in an alternate voice: a ship name, a book title, a phrase in another language. `<u>` is for an unarticulated annotation, like a spelling correction. If none of those apply, use `strong` and `em`.',
          },
          {
            type: 'code',
            id: 'c-l13-c1',
            language: 'html',
            title: 'Choosing the right element',
            code: `<!-- Important: stop the user losing work -->
<strong>Do not close the tab.</strong>

<!-- Emphasis: changes the meaning of the sentence -->
<p>You <em>have</em> to finish this today.</p>

<!-- A product name in a review: bold face, no extra meaning -->
<p>Reviewed the <b>Ledger Pro</b> for three weeks.</p>

<!-- A ship name: alternate voice, not emphasis -->
<p><i>HMS Example</i> was launched in 1994.</p>

<!-- Spelling correction -->
<p>Please spelt it <u>seperate</u>.</p>

<!-- Revised text -->
<p><del>Tuesday</del> <ins>Wednesday</ins></p>

<!-- Technical roles -->
<p>Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.</p>
<p>The <code>--dry-run</code> flag is safe.</p>
<p>Defined in <dfn>HTTP</dfn>, the Hypertext Transfer Protocol.</p>`,
          },
          {
            type: 'tip',
            id: 'c-l13-t1',
            title: 'The test for em',
            body: 'Read the sentence with the emphasised run removed. If it still means the same thing, the emphasis was decorative and you wanted CSS instead.',
          },
          {
            type: 'exercise',
            id: 'c-l13-x1',
            exercise: {
              id: 'ex-l13',
              instructions:
                'Mark up the paragraph below with the right elements: the warning is important, the contrast word is emphasised, and the product name is drawn in a bold face with no added meaning.',
              languages: ['html'],
              starterCode: {
                html:
                  '<p>Warning: this build is unstable. You should really run it on a staging host first. We tested the Ledger Pro for three weeks.</p>\n',
              },
              tests: [
                {
                  id: 'ex-l13-t1',
                  label: 'There is a strong element',
                  body: 'return !!document.querySelector("p strong")',
                },
                {
                  id: 'ex-l13-t2',
                  label: 'The strong element contains the word Warning',
                  body: 'return (document.querySelector("p strong")?.textContent || "").includes("Warning")',
                },
                {
                  id: 'ex-l13-t3',
                  label: 'There is an em element',
                  body: 'return !!document.querySelector("p em")',
                },
                {
                  id: 'ex-l13-t4',
                  label: 'There is a b element for the product name',
                  body: 'return (document.querySelector("p b")?.textContent || "").includes("Ledger Pro")',
                },
              ],
              hints: [
                '"Warning" is importance, so it goes in `<strong>`.',
                '"really" changes the meaning of the sentence, so it goes in `<em>`.',
                'A product name in a review is drawn bold without extra importance, which is what `<b>` is for.',
              ],
              solution: {
                html:
                  '<p><strong>Warning:</strong> this build is unstable. You <em>really</em> should run it on a staging host first. We tested the <b>Ledger Pro</b> for three weeks.</p>\n',
              },
              testNotes:
                'All three render almost identically. The tests are checking the elements themselves, because the meaning is the only thing that differs.',
            },
          },
        ],
      },
      {
        id: 'html-l14',
        title: 'When formatting is the wrong tool',
        description: 'Why a span with a class beats a dozen presentational elements, and when it does not.',
        duration: 5,
        objectives: [
          'Explain why presentation does not belong in the document',
          'Decide when a span with a class is the correct element',
          'Identify the formatting element that cannot be replaced by CSS',
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'c-l14-b1',
            body: 'Almost every visual treatment on a page is a styling decision, and styling decisions belong in CSS. If you find yourself reaching for `<b>` because the text needs to be large, or `<font>` because the colour is wrong, you are solving a presentation problem with a structural tool.',
          },
          {
            type: 'demo',
            id: 'c-l14-d1',
            title: 'Two documents, identical rendering',
            body: 'Both cards look the same. The left one is built from presentational elements; the right one from semantic elements plus a class. Only one of them survives being restyled.',
            html: `<div class="row">
  <div class="card">
    <h3>Presentational</h3>
    <p><font color="c0392b" size="4">Overdue</font></p>
    <p><b>Balance: 42.10</b></p>
  </div>
  <div class="card good">
    <h3>Semantic + CSS</h3>
    <p><span class="status status--late">Overdue</span></p>
    <p><span class="amount">Balance: 42.10</span></p>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: flex-start; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.6rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.good { border-color: #29e2bd; }
.status { display: inline-block; padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 17px; color: #b91c1c; background: #fee2e2; }
.amount { font-weight: 700; }`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l14-h1',
            level: 3,
            body: 'The rule',
          },
          {
            type: 'list',
            id: 'c-l14-l1',
            style: 'bullet',
            items: [
              'If the browser should understand the text, use the semantic element.',
              'If only a person looking at it should notice, use an element with no meaning plus a class, and style the class.',
              'Never use `<font>`, `<center>` or `<big>`. They are obsolete and unsupported in modern specifications.',
              'Never use inline `style` attributes for anything you would want to change later. They cannot be targeted by a media query or a class.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l14-h2',
            level: 3,
            body: 'The one that cannot be replaced',
          },
          {
            type: 'text',
            id: 'c-l14-b2',
            body: 'There is one category that CSS genuinely cannot reproduce: text the user has highlighted themselves. You cannot select arbitrary text in a document, and no stylesheet can colour it. The browser default for selected text is a system colour, and `<mark>` is the only element that lets you say "this text should be highlighted as relevant right now" — a search result, a term being defined, a row being compared.',
          },
          {
            type: 'tip',
            id: 'c-l14-t1',
            title: 'Ask what the element tells a screen reader',
            body: 'If switching from `<b>` to `<span class="x">` loses information for anyone who cannot see the page, keep the semantic element. If it loses nothing, you wanted CSS.',
          },
          {
            type: 'exercise',
            id: 'c-l14-x1',
            exercise: {
              id: 'ex-l14',
              instructions:
                'Rebuild the status line below so it carries no obsolete elements. A span with a class is the correct answer here, because the styling is entirely presentational.',
              languages: ['html'],
              starterCode: {
                html: '<p><font color="c0392b" size="4"><b>Overdue</b></font></p>\n',
              },
              tests: [
                {
                  id: 'ex-l14-t1',
                  label: 'There is no font element',
                  body: 'return document.querySelectorAll("font").length === 0',
                },
                {
                  id: 'ex-l14-t2',
                  label: 'There is no b element',
                  body: 'return document.querySelectorAll("b, strong").length === 0',
                },
                {
                  id: 'ex-l14-t3',
                  label: 'There is a span carrying a class',
                  body:
                    'const s = document.querySelector("p span"); return !!s && s.className.trim().length > 0',
                },
                {
                  id: 'ex-l14-t4',
                  label: 'The text still reads Overdue',
                  body: 'return (document.querySelector("p")?.textContent || "").trim() === "Overdue"',
                },
              ],
              hints: [
                '`<font>` is obsolete, and a parser rewrites it into a span with inline styles — which is exactly the outcome you want, but you should write it yourself.',
                '`<b>` here is purely visual, so a class is the honest choice.',
              ],
              solution: { html: '<p><span class="status status--late">Overdue</span></p>\n' },
              testNotes:
                'This is the one case where dropping the semantic element is correct: the bold face carried no meaning, only size and colour, and both belong in CSS.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s9',
      title: 'HTML Formatting quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s9-q1',
          type: 'multiple-choice',
          prompt: 'Which element should mark up text that carries importance or urgency?',
          options: ['<b>', '<strong>', '<em>', '<span>'],
          answer: 1,
          explanation:
            '<strong> carries meaning. <b> only says "draw this in a bold face", which is a styling request.',
        },
        {
          id: 'quiz-html-s9-q2',
          type: 'true-false',
          prompt: 'strong and em render identically by default in every browser.',
          answer: false,
          explanation:
            '<strong> is bold and <em> is italic by default, though you can restyle either. They are distinguishable both visually and to assistive technology.',
        },
        {
          id: 'quiz-html-s9-q3',
          type: 'multiple-choice',
          prompt: 'Which element marks text that was deleted in a revision?',
          options: ['<del>', '<ins>', '<s>', '<mark>'],
          answer: 0,
          explanation:
            '<del> and <ins> work as a pair for showing what changed, and both render with the conventional strikethrough and underline.',
        },
        {
          id: 'quiz-html-s9-q4',
          type: 'blank',
          prompt:
            'Which element is the one formatting choice that cannot be reproduced in CSS, because you cannot select arbitrary text yourself?',
          answers: ['mark', '<mark>'],
          explanation:
            'User selection uses a system colour no stylesheet can override. <mark> is the only way to highlight text as relevant to the current context.',
        },
        {
          id: 'quiz-html-s9-q5',
          type: 'multiple-choice',
          prompt: 'What should you use when text only needs to be large and coloured?',
          options: [
            '<big> and <font>',
            'A <span> with a class, styled in CSS',
            '<strong>',
            'A heading element',
          ],
          answer: 1,
          explanation:
            'Size and colour are presentation, so they belong in a stylesheet. A span with a class keeps the document clean and the styling changeable.',
        },
      ],
    },
  },
  {
    id: 'html-s10',
    title: 'HTML Quotation Elements',
    description: 'Quoting other people and quoting yourself, and the four elements that distinguish them.',
    lessons: [
      {
        id: 'html-l15',
        title: 'HTML Quotation Elements',
        description: 'The four quotation-related elements, and which one each situation calls for.',
        duration: 5,
        objectives: [
          'Choose between q, blockquote, cite and pre for a quotation',
          'Explain what a cite attribute does and does not do',
          'Mark up code that must keep its exact spacing',
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'c-l15-b1',
            body: 'HTML has four quotation-related elements and they are not interchangeable. `<q>` is an inline quotation that someone else said. `<blockquote>` is a block quotation, longer and set apart from the surrounding text. `<cite>` marks the title of a work, not the quotation itself. `<pre>` preserves whitespace, which is what you need for anything where spacing is significant.',
          },
          {
            type: 'demo',
            id: 'c-l15-d1',
            title: 'Four elements, four different jobs',
            body: 'An inline quote from someone, a block quote from someone, the title of the work it came from, and a block of text whose spacing must not change.',
            html: `<p>As <q>the web is made of documents, the document is the unit of meaning</q>, the structure is not decoration.</p>

<blockquote cite="https://example.com/structure">
  <p>Every element you write becomes a node that the browser, the styling engine and assistive technology all have to agree on.</p>
</blockquote>

<p>The argument is set out in <cite>Structure and Meaning</cite>, chapter three.</p>

<pre>  indented
    indented further
  back</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
p { margin: 0 0 0.7rem; }
blockquote { margin: 0.8rem 0; padding-left: 1rem; border-left: 3px solid #cbd5e1; color: #475569; }
blockquote p { margin: 0; }
cite { font-style: italic; }
pre { background: #f4f6f8; padding: 0.7rem; border-radius: 6px; font-size: 13px; margin: 0.6rem 0 0; }`,
            height: 300,
          },
          {
            type: 'heading',
            id: 'c-l15-h1',
            level: 3,
            body: 'What cite actually does',
          },
          {
            type: 'text',
            id: 'c-l15-b2',
            body: 'The `cite` attribute on a `blockquote` records where the quotation came from. It is not rendered — nothing in the browser shows it — but it is in the DOM, which means search engines and archiving tools can use it. Adding a visible "Source:" link is a separate decision, and a good one, because readers generally want to see where a claim came from.',
          },
          {
            type: 'tip',
            id: 'c-l15-t1',
            title: 'q adds quotation marks for you',
            body: 'The browser renders the marks, and it will localise them to the document language. Do not type the quotation marks yourself around a `<q>`, or you will get two sets.',
          },
          {
            type: 'warning',
            id: 'c-l15-w1',
            title: 'The cite element is for titles, not for sources',
            body: '`<cite>` marks the title of a work — a book, a film, a specification. It does not mark the person who said something, and it does not create a link. Naming an author is plain text, or a link to their work.',
          },
          {
            type: 'exercise',
            id: 'c-l15-x1',
            exercise: {
              id: 'ex-l15',
              instructions:
                'Fix the quotation below. The inline quotation should use q, the longer quotation should use blockquote with a cite attribute, and the extra typed quotation marks should go.',
              languages: ['html'],
              starterCode: {
                html:
                  '<p>She said "the parser repairs rather than refuses", which is the whole design.</p>\n<blockquote><p>Structure is meaning, and the two cannot be separated without losing one of them.</p></blockquote>\n',
              },
              tests: [
                {
                  id: 'ex-l15-t1',
                  label: 'There is a q element',
                  body: 'return !!document.querySelector("p q")',
                },
                {
                  id: 'ex-l15-t2',
                  label: 'The text no longer contains typed quotation marks around the q element',
                  body:
                    'const p = document.querySelector("p"); return !p.textContent.includes(String.fromCharCode(34))',
                },
                {
                  id: 'ex-l15-t3',
                  label: 'There is a blockquote element',
                  body: 'return !!document.querySelector("blockquote p")',
                },
                {
                  id: 'ex-l15-t4',
                  label: 'The blockquote has a cite attribute',
                  body: 'return (document.querySelector("blockquote").getAttribute("cite") || "").length > 0',
                },
              ],
              hints: [
                'Wrap just the quoted phrase in `<q>` and delete the `"` characters you typed around it.',
                'The `cite` attribute goes on the blockquote itself, not on the paragraph inside it.',
              ],
              solution: {
                html:
                  '<p>She said <q>the parser repairs rather than refuses</q>, which is the whole design.</p>\n<blockquote cite="https://example.com/structure">\n  <p>Structure is meaning, and the two cannot be separated without losing one of them.</p>\n</blockquote>\n',
              },
              testNotes:
                'The browser draws the quotation marks for a q element automatically, so typed marks would appear doubled in the rendered page.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s10',
      title: 'HTML Quotation Elements quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s10-q1',
          type: 'multiple-choice',
          prompt: 'Which element is for a short quotation inside a sentence?',
          options: ['<blockquote>', '<q>', '<cite>', '<pre>'],
          answer: 1,
          explanation:
            '<q> is inline and marks a phrase somebody else said. The browser adds the quotation marks.',
        },
        {
          id: 'quiz-html-s10-q2',
          type: 'true-false',
          prompt: 'The cite attribute on a blockquote is visible in the rendered page.',
          answer: false,
          explanation:
            'It is in the DOM but nothing renders it. If you want readers to see the source, add a visible link as well.',
        },
        {
          id: 'quiz-html-s10-q3',
          type: 'multiple-choice',
          prompt: 'Which element marks the title of a work, such as a book or a film?',
          options: ['<cite>', '<blockquote>', '<em>', '<dfn>'],
          answer: 0,
          explanation:
            '<cite> is specifically for the title of a creative or documentary work. <dfn> is for defining a technical term.',
        },
        {
          id: 'quiz-html-s10-q4',
          type: 'blank',
          prompt: 'Which element preserves the exact spacing in a block of text?',
          answers: ['pre', '<pre>'],
          explanation:
            '<pre> turns off whitespace collapsing, which is what makes code and ASCII diagrams render correctly.',
        },
        {
          id: 'quiz-html-s10-q5',
          type: 'multiple-choice',
          prompt: 'What is wrong with writing quotation marks by hand around a q element?',
          options: [
            'Nothing, it is the recommended style',
            'The browser adds its own marks, so you end up with two sets',
            'It stops the text being searchable',
            'It converts the element into a blockquote',
          ],
          answer: 1,
          explanation:
            'The browser renders quotation marks for <q> and will localise them to the document language, so hand-typed marks are always a duplicate.',
        },
      ],
    },
  },
  {
    id: 'html-s11',
    title: 'HTML Comments',
    description: 'What comments are for, what they must never contain, and conditional comments.',
    lessons: [
      {
        id: 'html-l16',
        title: 'HTML Comments',
        description: 'What a comment does, what must never go in one, and commenting out a block.',
        duration: 4,
        objectives: [
          'Write a comment and explain what it does to the rendered page',
          'List the three things a comment must never contain',
          'Comment out a block of markup temporarily',
        ],
        xp: 25,
        content: [
      {
            type: 'text',
            id: 'c-l16-b1',
            body: 'A comment is a note in your source that the browser skips entirely. It is written with `<!--` and `-->`, and everything between those markers is invisible in the rendered page. That makes comments useful for explaining decisions and useless for hiding content from users — the content is still in the file, still in the page source, and still fetched.',
          },
          {
            type: 'demo',
            id: 'c-l16-d1',
            title: 'A comment in the source, nothing in the page',
            body: 'The note below is in the markup. The rendered page shows the heading and the paragraph, and the note is nowhere to be seen.',
            html: `<!-- The heading level is h1 because this is the only page-level title in the document. -->
<h1>Release notes</h1>

<!-- TODO: these dates should come from the API once it is stable. -->
<p>Last updated 1 March 2026.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
h1 { font-size: 21px; margin: 0 0 0.4rem; }
p { margin: 0; color: #475569; }`,
            height: 130,
          },
          {
            type: 'heading',
            id: 'c-l16-h1',
            level: 3,
            body: 'What must never go in a comment',
          },
          {
            type: 'list',
            id: 'c-l16-l1',
            style: 'bullet',
            items: [
              '**Credentials.** Passwords, API keys and tokens do not become secret because they are commented out. They ship in the file.',
              '**Internal notes about other people.** Comments are part of the source, and source is shared.',
              '**Anything that will be stale.** A comment explaining behaviour that has since changed is worse than no comment, because it is confidently wrong.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l16-h2',
            level: 3,
            body: 'Commenting out a block',
          },
          {
            type: 'text',
            id: 'c-l16-b2',
            body: 'To disable a block temporarily, wrap it in a comment. The problem is that a comment cannot contain another comment, so a block that already has comments in it cannot be wrapped as-is. The usual workaround is to remove the inner comment markers first, or to comment out individual lines.',
          },
          {
            type: 'code',
            id: 'c-l16-c1',
            language: 'html',
            title: 'Comments in practice',
            code: `<!-- a one-line note -->

<!--
  A multi-line note. Useful for a chunk of markup
  that exists only for one screen size.
-->

<!-- Section: pricing -->
<h2>Pricing</h2>

<!--
  Temporarily disabled. The API endpoint is not
  stable yet, so this returns 500 half the time.

  <section class="beta">
    <h2>Beta pricing</h2>
  </section>
-->`,
          },
          {
            type: 'warning',
            id: 'c-l16-w1',
            title: 'Commented-out code is not deleted code',
            body: 'Large commented-out blocks are dead weight in every page load and every repository. If it is not coming back this week, delete it; version control remembers it for you.',
          },
          {
            type: 'exercise',
            id: 'c-l16-x1',
            exercise: {
              id: 'ex-l16',
              instructions:
                'Comment out the beta banner below so it does not render, without deleting it.',
              languages: ['html'],
              starterCode: {
                html: '<h1>Dashboard</h1>\n<aside class="beta">You are on the beta plan.</aside>\n',
              },
              tests: [
                {
                  id: 'ex-l16-t1',
                  label: 'The heading still renders',
                  body: 'return !!document.querySelector("h1")',
                },
                {
                  id: 'ex-l16-t2',
                  label: 'The aside no longer renders',
                  body: 'return document.querySelectorAll("aside").length === 0',
                },
                {
                  id: 'ex-l16-t3',
                  label: 'A comment is present in the document',
                  body:
                    'const walk = document.createTreeWalker(document, NodeFilter.SHOW_COMMENT); return !!walk.nextNode()',
                },
              ],
              hints: [
                'Put the opening marker before the aside and the closing marker after it.',
                'A comment cannot contain another comment, so make sure the aside has none inside it.',
              ],
              solution: {
                html: '<h1>Dashboard</h1>\n<!-- <aside class="beta">You are on the beta plan.</aside> -->\n',
              },
              testNotes:
                'The third test walks the DOM for comment nodes, which is how you confirm the markup was commented rather than removed.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s11',
      title: 'HTML Comments quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s11-q1',
          type: 'multiple-choice',
          prompt: 'What does a comment do to the rendered page?',
          options: [
            'It is rendered in small grey text',
            'Nothing — the browser skips it entirely',
            'It is rendered only on small screens',
            'It collapses the elements around it',
          ],
          answer: 1,
          explanation:
            'Comments never render. They remain in the file and in view-source, which is why they cannot be used to hide anything.',
        },
        {
          id: 'quiz-html-s11-q2',
          type: 'true-false',
          prompt: 'An API key in an HTML comment is safe because users cannot see it.',
          answer: false,
          explanation:
            'Comments are in the page source for anyone to read. A commented-out secret is a published secret.',
        },
        {
          id: 'quiz-html-s11-q3',
          type: 'multiple-choice',
          prompt: 'What happens if you wrap a block that already contains a comment in another comment?',
          options: [
            'The nested comment works normally',
            'The first closing marker ends the comment early, so the rest becomes live markup',
            'The browser throws an error',
            'The inner comment is stripped automatically',
          ],
          answer: 1,
          explanation:
            'Comments cannot nest. The first --> encountered closes the comment, and everything after it is parsed as markup.',
        },
        {
          id: 'quiz-html-s11-q4',
          type: 'blank',
          prompt: 'What are the two markers that delimit an HTML comment?',
          answers: ['<!-- and -->', '<!-- -->', '<!--', '-->'],
          explanation:
            'The comment opens with `<!--` and closes with `-->`, and the closing marker is the first one that appears in the file.',
        },
        {
          id: 'quiz-html-s11-q5',
          type: 'multiple-choice',
          prompt: 'Why is a large commented-out block of markup a problem?',
          options: [
            'It slows down HTML parsing significantly',
            'It is dead weight in the file, and version control already remembers it',
            'It breaks the heading outline',
            'It prevents the page from being cached',
          ],
          answer: 1,
          explanation:
            'The block ships in every response for no benefit. Git remembers it perfectly well, so deleting it loses nothing.',
        },
      ],
    },
  },
]
