import type { Course } from '~/types/content'

export const htmlFundamentals: Course = {
  id: 'course-html',
  slug: 'html-fundamentals',
  title: 'HTML Fundamentals',
  shortTitle: 'HTML',
  description:
    'Build the structure of the web from scratch. Every element you write here becomes a node the browser, the CSS engine and screen readers all have to agree on.',
  technology: 'html',
  category: 'web',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner', 'popular'],
  topics: ['structure', 'text', 'links', 'images', 'media', 'forms', 'semantics', 'tables', 'lists', 'embedding', 'accessibility'],
  icon: '<>',
  sections: [
    {
      id: 'html-s1',
      title: 'HTML Basics',
      description: 'Documents, elements, attributes and nesting.',
      lessons: [
        {
          id: 'html-l1',
          title: 'What HTML actually is',
          description: 'The document skeleton and your first page.',
          duration: 4,
          objectives: [
            'Explain what a browser does with an HTML document',
            'Write a valid document skeleton',
            'Nest elements correctly',
          ],
          xp: 40,
          content: [
            {
              type: 'text',
              id: 'h-l1-b1',
              body: 'HTML is a **markup** language. It does not tell the browser what things look like — it tells the browser what things **are**. A heading is a heading because you wrote `<h1>`, not because you painted it large. Styling is CSS. Behaviour is JavaScript. HTML is the third pillar: the structure both of those others attach to.',
            },
            {
              type: 'text',
              id: 'h-l1-b2',
              body: 'The smallest complete document has three parts: a `doctype` that tells the browser to use modern standards mode, a `head` for metadata, and a `body` for the content a human will see.',
            },
            {
              type: 'code',
              id: 'h-l1-c1',
              language: 'html',
              title: 'The smallest valid page',
              code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My first page</title>
  </head>
  <body>
    <h1>Hello, world</h1>
    <p>I am a paragraph, so I get paragraph spacing.</p>
  </body>
</html>`,
            },
            {
              type: 'tip',
              id: 'h-l1-t1',
              title: 'Why lang matters',
              body: '`lang="en"` lets screen readers pick the right pronunciation rules and lets browsers offer translation. It is the single most commonly missing attribute on the web.',
            },
            {
              type: 'text',
              id: 'h-l1-b3',
              body: 'Elements nest like boxes. An element opened inside another must be closed before the outer one closes, otherwise the browser silently repairs your document — and repaired documents are where mysterious bugs come from. Tag a parent and child like this:',
            },
            {
              type: 'code',
              id: 'h-l1-c2',
              language: 'html',
              title: 'Correct vs broken nesting',
              code: `<!-- correct -->
<div class="card">
  <p>Text inside the card.</p>
</div>

<!-- wrong: the paragraph escapes the div -->
<div class="card">
  <p>Text inside the card.</div>
</p>`,
            },
            {
              type: 'example',
              id: 'h-l1-e1',
              title: 'A tiny page',
              body: 'Run this and look at the preview. The heading is big because headings are big by default, not because of any style.',
              html: `<h1>Structure first</h1>
<p>No CSS was written here. This is HTML's default rendering.</p>`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'h-l1-x1',
              exercise: {
                id: 'ex-html-doctype',
                instructions:
                  'Add a second paragraph below the first one. The preview should show two separate paragraphs.',
                languages: ['html'],
                starterCode: {
                  html: `<h1>My first page</h1>
<p>I am the first paragraph.</p>`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The page still has an <h1>',
                    body: `return document.querySelectorAll('h1').length === 1;`,
                  },
                  {
                    id: 't2',
                    label: 'The page has exactly two paragraphs',
                    body: `return document.querySelectorAll('p').length === 2;`,
                  },
                  {
                    id: 't3',
                    label: 'The new paragraph is not empty',
                    body: `var ps = document.querySelectorAll('p');
return ps[1].textContent.trim().length > 0 || 'Give your second paragraph some text.';`,
                  },
                ],
                hints: [
                  'A paragraph is written with a `p` tag and closed with `</p>`.',
                  'Add a new line after the existing paragraph, on its own.',
                  'Something like `<p>Something new.</p>` on its own line will do it.',
                ],
                solution: {
                  html: `<h1>My first page</h1>
<p>I am the first paragraph.</p>
<p>Here is a second paragraph.</p>`,
                },
              },
            },
          ],
        },
        {
          id: 'html-l2',
          title: 'Elements, attributes and void tags',
          description: 'The grammar every HTML document follows.',
          duration: 6,
          objectives: [
            'Write elements with attributes',
            'Know which elements are void',
            'Use boolean attributes correctly',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'h-l2-b1',
              body: 'An element is an opening tag, optional content, and a closing tag: `<p class="lead">text</p>`. The `class="lead"` part is an **attribute** — extra information about the element, always written as `name="value"` with quotes.',
            },
            {
              type: 'list',
              id: 'h-l2-l1',
              style: 'bullet',
              items: [
                '`class` — a label you can reuse many times, used for styling and for JavaScript hooks.',
                '`id` — a unique name for one element on the page. Never reuse an id.',
                '`href` — where a link goes.',
                '`src` — where an image, script or stylesheet comes from.',
                '`alt` — a text alternative for content that is not text.',
              ],
            },
            {
              type: 'heading',
              id: 'h-l2-h1',
              level: 3,
              body: 'Void elements have no content, so they have no closing tag',
            },
            {
              type: 'text',
              id: 'h-l2-b2',
              body: 'Some elements cannot have children, ever. `<img>` has no contents — an image is a single thing, not a container. Writing `</img>` is invalid and browsers ignore it. The same applies to `<br>`, `<hr>`, `<input>`, `<meta>` and `<link>`.',
            },
            {
              type: 'code',
              id: 'h-l2-c1',
              language: 'html',
              title: 'Void elements',
              code: `<img src="logo.svg" alt="codeIngot logo" />
<br />
<hr />
<input type="text" name="q" />`,
            },
            {
              type: 'text',
              id: 'h-l2-b3',
              body: 'Some attributes are **boolean**: they are either present (true) or absent (false). You never set them to `"true"`. Writing `disabled="false"` still disables the element, which is one of the most common bugs in beginner HTML.',
            },
            {
              type: 'code',
              id: 'h-l2-c2',
              language: 'html',
              title: 'Boolean attributes',
              code: `<!-- the button is disabled -->
<button disabled>Save</button>

<!-- these two are enabled -->
<button>Save</button>
<button disabled="">Save</button>`,
            },
            {
              type: 'tip',
              id: 'h-l2-t1',
              title: 'Use double quotes everywhere',
              body: 'The HTML spec allows either, but mixing them is how you end up with an unclosed attribute at 2am. Pick one and never deviate.',
            },
            {
              type: 'exercise',
              id: 'h-l2-x1',
              exercise: {
                id: 'ex-html-attrs',
                instructions:
                  'Add an image below the heading. Give it a `src` of `https://placehold.co/240x120/29e2bd/0b0d10?text=codeIngot` and an `alt` attribute that describes it.',
                languages: ['html'],
                starterCode: {
                  html: `<h1>Product of the day</h1>
`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'There is an <img> on the page',
                    body: `return document.querySelectorAll('img').length === 1 || 'You need exactly one <img> element.';`,
                  },
                  {
                    id: 't2',
                    label: 'The image has a src attribute',
                    body: `var img = document.querySelector('img');
return (img && img.getAttribute('src')) ? true : 'Add src="…" with the image URL.';`,
                  },
                  {
                    id: 't3',
                    label: 'The image has a useful alt attribute',
                    body: `var img = document.querySelector('img');
if (!img) return 'Add an image first.';
var alt = (img.getAttribute('alt') || '').trim();
return alt.length > 3 ? true : 'alt should describe the image for people who cannot see it.';`,
                  },
                ],
                hints: [
                  'An image is a void element: `<img … />`. It has no closing tag.',
                  'It takes three attributes: `src`, `alt` and optionally `width`.',
                  'Copy the exact src URL you were given into the `src` attribute.',
                ],
                solution: {
                  html: `<h1>Product of the day</h1>
<img src="https://placehold.co/240x120/29e2bd/0b0d10?text=codeIngot" alt="A placeholder product image" />`,
                },
              },
            },
          ],
        },
        {
          id: 'html-l3',
          title: 'The heading hierarchy',
          description: 'Headings are an outline, not a font size.',
          duration: 5,
          objectives: [
            'Use h1 to h6 in a logical order',
            'Understand why heading level matters more than size',
            'Never skip levels for styling reasons',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'h-l3-b1',
              body: 'Headings form the skeleton of a document. `<h1>` is the topic of the page, `<h2>` breaks that topic into parts, `<h3>` breaks a part into sub-parts, and so on. Most pages need only `h1` through `h3`.',
            },
            {
              type: 'code',
              id: 'h-l3-c1',
              language: 'html',
              title: 'A good outline',
              code: `<h1>Baking sourdough</h1>

<h2>Ingredients</h2>
<h3>Starter</h3>
<h3>Final dough</h3>

<h2>Method</h2>
<p>Feed the starter, then mix…</p>`,
            },
            {
              type: 'warning',
              id: 'h-l3-w1',
              title: 'The most common heading mistake',
              body: 'Choosing a heading level for how big you want the text to look. If a section title needs to be smaller, add a CSS class — do not jump from h2 to h6. Screen reader users navigate by heading level, and a broken outline makes a page genuinely hard to use.',
            },
            {
              type: 'text',
              id: 'h-l3-b2',
              body: 'A page should normally have **one** `h1`. Several `h1`s are legal, but one clear main title is friendlier to search engines and to anyone using a document outline.',
            },
            {
              type: 'tip',
              id: 'h-l3-t1',
              title: 'Style by class, not by level',
              body: 'Want an h2 that looks small? `h2.subtle { font-size: 1rem; }`. The level stays meaningful and the size becomes a design decision.',
            },
            {
              type: 'exercise',
              id: 'h-l3-x1',
              exercise: {
                id: 'ex-html-headings',
                instructions:
                  'The page has an `<h1>` and an `<h2>`. Add an `<h3>` underneath the h2 that reads "Types of flour", and a paragraph under it. Do not skip from h2 to h4.',
                languages: ['html'],
                starterCode: {
                  html: `<h1>Flour</h1>
<h2>Bread flour</h2>
`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The page has an h3',
                    body: `return document.querySelectorAll('h3').length === 1 || 'Add exactly one <h3> element.';`,
                  },
                  {
                    id: 't2',
                    label: 'The h3 comes after the h2 in the document',
                    body: `var tags = Array.from(document.body.querySelectorAll('*')).map(function (el) { return el.tagName; });
var i2 = tags.indexOf('H2');
var i3 = tags.indexOf('H3');
return (i2 > -1 && i3 > i2) ? true : 'The <h3> must be a child that follows the <h2>.';`,
                  },
                  {
                    id: 't3',
                    label: 'No level was skipped (h1 -> h2 -> h3)',
                    body: `var levels = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(function (el) { return Number(el.tagName[1]); });
for (var i = 1; i < levels.length; i++) {
  if (levels[i] - levels[i - 1] > 1) return 'You jumped from h' + levels[i - 1] + ' to h' + levels[i] + '. Change the h3 to h2? No — add the missing level.';
}
return true;`,
                  },
                ],
                hints: [
                  'The new heading is a direct child of the h2, not a sibling above it.',
                  'Write `<h3>Types of flour</h3>` on the line after the h2.',
                  'Then add a `<p>` describing bread flour, wheat flour and rye.',
                ],
                solution: {
                  html: `<h1>Flour</h1>
<h2>Bread flour</h2>
<h3>Types of flour</h3>
<p>Wheat, rye and spelt all make excellent bread, in different ways.</p>`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-html-s1',
        title: 'HTML Basics check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            prompt: 'What does the `lang` attribute on `<html>` do?',
            options: [
              'It sets the programming language of the page',
              'It declares the natural language of the content',
              'It loads a translation file',
              'It changes the text direction',
            ],
            answer: 1,
            explanation:
              '`lang` declares the natural language of the content so browsers, search engines and screen readers can handle it correctly.',
          },
          {
            id: 'q2',
            type: 'true-false',
            prompt: '`<img>` is a void element, so it must be written without a closing tag.',
            answer: true,
            explanation:
              'Void elements such as `img`, `br`, `hr` and `input` can never contain children, so they are written with a single tag.',
          },
          {
            id: 'q3',
            type: 'code-output',
            prompt: 'What does this document render as a title?',
            code: `<head><title>codeIngot</title></head>`,
            options: ['A visible h1', 'The browser tab title', 'A bookmark', 'Nothing'],
            answer: 1,
            explanation:
              'The `title` element supplies the browser tab title, bookmark name and default search result headline. It is not visible in the page body.',
          },
          {
            id: 'q4',
            type: 'blank',
            prompt: 'Which attribute is always required on an image for accessibility?',
            answers: ['alt', 'Alt', 'ALT'],
            explanation: '`alt` provides a text alternative for images that convey meaning.',
          },
        ],
      },
    },
    {
      id: 'html-s2',
      title: 'Text & Links',
      description: 'The content people actually came for.',
      lessons: [
        {
          id: 'html-l4',
          title: 'Paragraphs, emphasis and meaning',
          description: 'Text elements that carry meaning, not just looks.',
          duration: 5,
          objectives: [
            'Use strong and em for meaning, not appearance',
            'Know when to use br or a new paragraph',
            'Format a readable block of text',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'h-l4-b1',
              body: 'Text elements describe what a piece of text **means**. `<strong>` marks content of strong importance, `<em>` marks stressed emphasis. Browsers render both in italics or bold by convention, but the reason to use them is meaning — and that meaning is what screen readers announce.',
            },
            {
              type: 'code',
              id: 'h-l4-c1',
              language: 'html',
              code: `<!-- strong importance: a warning -->
<p><strong>Do not</strong> place secrets in client-side code.</p>

<!-- stress emphasis: contrast in a sentence -->
<p>It is not <em>hard</em>, it is just <em>new</em>.</p>

<!-- both: serious and emphasised -->
<p><strong><em>Never</em></strong> commit a password.</p>`,
            },
            {
              type: 'text',
              id: 'h-l4-b2',
              body: 'Use a new `<p>` when you start a new idea. Use `<br>` only for a hard line break inside a single thought — like an address or a poem. A page made of `<br>`s is a page that will reflow badly on a phone.',
            },
            {
              type: 'tip',
              id: 'h-l4-t1',
              title: 'The empty line is not a paragraph',
              body: 'Authors often type blank lines to separate paragraphs. In HTML, a blank line is just whitespace. Only the `<p>` tag creates the break and the spacing.',
            },
            {
              type: 'exercise',
              id: 'html-l4-x1',
              exercise: {
                id: 'ex-html-emphasis',
                instructions:
                  'Wrap the word "never" in the sentence in `<strong>`, and wrap "slowly" in `<em>`. Do not use CSS to make them bold or italic.',
                languages: ['html'],
                starterCode: {
                  html: `<p>You should never save a password in plain text.</p>
<p>Practice a little every day and you will improve slowly.</p>`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'A <strong> element wraps "never"',
                    body: `var s = document.querySelector('strong');
return s && s.textContent.trim() === 'never' ? true : 'Put <strong>never</strong> around the word never.';`,
                  },
                  {
                    id: 't2',
                    label: 'An <em> element wraps "slowly"',
                    body: `var e = document.querySelector('em');
return e && e.textContent.trim() === 'slowly' ? true : 'Put <em>slowly</em> around the word slowly.';`,
                  },
                  {
                    id: 't3',
                    label: 'The paragraphs were not replaced by styling hacks',
                    body: `return document.querySelectorAll('p').length === 2 ? true : 'Keep both original paragraphs.';`,
                  },
                ],
                hints: [
                  'The tags go inside the paragraph, around one word only.',
                  '`<p>You should <strong>never</strong> save…</p>`',
                  'The same applies to the second paragraph with `<em>slowly</em>`.',
                ],
                solution: {
                  html: `<p>You should <strong>never</strong> save a password in plain text.</p>
<p>Practice a little every day and you will improve <em>slowly</em>.</p>`,
                },
              },
            },
          ],
        },
        {
          id: 'html-l5',
          title: 'Links that work',
          description: 'Anchors, targets, and navigating safely.',
          duration: 6,
          objectives: [
            'Create internal and external links',
            'Open new tabs safely with rel',
            'Add an accessible skip link',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'h-l5-b1',
              body: 'The `<a>` element is the only element in HTML that navigates. Its `href` is a URL — it can be another page, a file, a section of the current page, an email address, or even a phone number.',
            },
            {
              type: 'code',
              id: 'h-l5-c1',
              language: 'html',
              title: 'Every kind of link',
              code: `<!-- another page -->
<a href="/courses">Browse courses</a>

<!-- a section of the current page -->
<a href="#pricing">Jump to pricing</a>

<!-- outside the site -->
<a href="https://developer.mozilla.org" rel="noopener">MDN</a>

<!-- open in a new tab, safely -->
<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN ↗</a>

<!-- not a link at all: mail and phone -->
<a href="mailto:hello@codeingot.dev">Email us</a>
<a href="tel:+15550100">Call us</a>`,
            },
            {
              type: 'warning',
              id: 'h-l5-w1',
              title: 'Why rel="noopener" matters',
              body: 'Without it, a page opened with `target="_blank"` gets a handle on your window through `window.opener` and can navigate your tab somewhere else. `rel="noopener"` cuts that off. Add it every time.',
            },
            {
              type: 'text',
              id: 'h-l5-b2',
              body: 'A link that only contains an icon is invisible to a screen reader. Either give it text, or add `aria-label`. And if a link opens in a new tab, say so — a small "opens in a new tab" hint prevents a very common surprise.',
            },
            {
              type: 'code',
              id: 'h-l5-c2',
              language: 'html',
              title: 'An accessible icon link',
              code: `<a href="/reference" class="icon-link" aria-label="Open the reference section">
  <svg aria-hidden="true" width="20" height="20">…</svg>
</a>`,
            },
            {
              type: 'tip',
              id: 'h-l5-t1',
              title: 'The skip link',
              body: 'A page with a long navigation menu should offer a "Skip to content" link as its first focusable element. It is invisible until focused, and it lets keyboard users jump straight past the menu.',
            },
            {
              type: 'exercise',
              id: 'html-l5-x1',
              exercise: {
                id: 'ex-html-links',
                instructions:
                  'Turn "the reference" into a link to `/reference`, and "send an email" into a `mailto:` link to `hello@codeingot.dev`.',
                languages: ['html'],
                starterCode: {
                  html: `<p>Read the reference or send an email.</p>`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'There are two links',
                    body: `return document.querySelectorAll('a').length === 2 || 'You need two <a> elements.';`,
                  },
                  {
                    id: 't2',
                    label: 'One link points to /reference',
                    body: `var links = Array.from(document.querySelectorAll('a'));
return links.some(function (a) { return a.getAttribute('href') === '/reference'; })
  ? true : 'Add a link with href="/reference".';`,
                  },
                  {
                    id: 't3',
                    label: 'One link is a mailto link',
                    body: `var links = Array.from(document.querySelectorAll('a'));
return links.some(function (a) { return (a.getAttribute('href') || '').indexOf('mailto:') === 0; })
  ? true : 'Use href="mailto:hello@codeingot.dev" for the email link.';`,
                  },
                ],
                hints: [
                  'Only wrap the words, not the whole sentence, in each link.',
                  '`<a href="/reference">the reference</a>`',
                  'For email: `<a href="mailto:hello@codeingot.dev">send an email</a>`',
                ],
                solution: {
                  html: `<p>Read <a href="/reference">the reference</a> or <a href="mailto:hello@codeingot.dev">send an email</a>.</p>`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-html-s2',
        title: 'Text & links check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            prompt: 'Which attributes belong on a link that opens in a new tab?',
            options: ['target="blank"', 'target="_blank" rel="noopener"', 'rel="new"', 'new="true"'],
            answer: 1,
            explanation:
              'The correct value is `_blank` with an underscore, and `rel="noopener"` prevents the new page from accessing your window.',
          },
          {
            id: 'q2',
            type: 'true-false',
            prompt: '`<strong>` should be used whenever you want text to look bold.',
            answer: false,
            explanation:
              '`<strong>` communicates importance. If you only want a visual change, use a CSS class so the meaning stays separate from the presentation.',
          },
          {
            id: 'q3',
            type: 'blank',
            prompt: 'Which attribute creates a link to a section of the current page?',
            answers: ['href', 'HREF'],
            explanation: '`href="#section-id"` jumps to an element with a matching id on the same page.',
          },
        ],
      },
    },
    {
      id: 'html-s3',
      title: 'Images & Media',
      description: 'Content that is not text, and how to describe it.',
      lessons: [
        {
          id: 'html-l9',
          title: 'Images, video and audio',
          description: 'Non-text content, its dimensions, and the alt text it needs.',
          duration: 5,
          objectives: [
            'Always write a useful alt',
            'Control image size and lazy loading',
            'Embed a video or audio element',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'h-l3-b1',
              body: 'An image that fails to load still occupies space only if you give it dimensions. Setting `width` and `height` attributes reserves the right amount of room up front, which prevents the layout from jumping around as images arrive — the fastest way to make a page feel cheap.',
            },
            {
              type: 'code',
              id: 'h-l3-c1',
              language: 'html',
              title: 'A well-formed image',
              code: `<img
  src="https://placehold.co/640x360/29e2bd/0b0d10?text=codeIngot"
  alt="A dark code editor with a single line of JavaScript"
  width="640"
  height="360"
  loading="lazy"
/>`,
            },
            {
              type: 'list',
              id: 'h-l3-l1',
              style: 'bullet',
              items: [
                '**Decorative** images: `alt=""`. An empty alt tells screen readers to skip it — that is correct, not lazy.',
                '**Meaningful** images: describe the *content*, not the file. "Ada Lovelace portrait", not "portrait.jpg".',
                '**Images of text**: use real text instead, so it stays selectable, translatable and searchable.',
                '**Below the fold**: add `loading="lazy"`.',
              ],
            },
            {
              type: 'text',
              id: 'h-l3-b2',
              body: 'Video and audio are also HTML. `<video>` needs a `controls` attribute to give the user any control at all, and a `<track>` for captions if there is speech.',
            },
            {
              type: 'code',
              id: 'h-l3-c2',
              language: 'html',
              code: `<video controls width="640" poster="poster.jpg">
  <source src="lesson-1.mp4" type="video/mp4" />
  <track kind="captions" src="lesson-1.vtt" srclang="en" label="English" default />
  Your browser cannot play this video.
</video>`,
            },
            {
              type: 'warning',
              id: 'h-l3-w1',
              title: 'Alt text is not a caption',
              body: 'If the image is only decoration, `alt=""` is correct and better than a description. If it carries information, describe it in one short sentence. Skip the "image of" prefix — screen readers already announce the element type.',
            },
            {
              type: 'exercise',
              id: 'html-l3-x1',
              exercise: {
                id: 'ex-html-image',
                instructions:
                  'Add a properly described image with explicit dimensions below the paragraph. Use the src `https://placehold.co/320x180/171c22/29e2bd?text=codeIngot`.',
                languages: ['html'],
                starterCode: {
                  html: `<h1>Inside the editor</h1>
<p>The editor highlights your code as you type.</p>`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The image has explicit width and height',
                    body: `var img = document.querySelector('img');
if (!img) return 'Add an <img> element.';
return (img.getAttribute('width') && img.getAttribute('height'))
  ? true : 'Give the image width and height attributes so the layout does not jump.';`,
                  },
                  {
                    id: 't2',
                    label: 'The alt text is descriptive, not a file name',
                    body: `var img = document.querySelector('img');
if (!img) return 'Add an <img> element.';
var alt = (img.getAttribute('alt') || '').trim();
if (!alt) return 'alt="" is only correct for decorative images. This one carries meaning.';
if (/\\.(png|jpe?g|svg|webp|gif)$/i.test(alt)) return 'Alt text should describe the content, not the file extension.';
return alt.length >= 10 ? true : 'Say a little more about what the image shows.';`,
                  },
                  {
                    id: 't3',
                    label: 'The image loads below-the-fold content lazily',
                    body: `var img = document.querySelector('img');
return img.getAttribute('loading') === 'lazy' ? true : 'Add loading="lazy" to this image.';`,
                  },
                ],
                hints: [
                  'Copy the placeholder URL into `src` exactly as given.',
                  'Width and height are attributes, not CSS: `width="320" height="180"`.',
                  'Write alt text like "A dark editor window showing one line of JavaScript".',
                ],
                solution: {
                  html: `<h1>Inside the editor</h1>
<p>The editor highlights your code as you type.</p>
<img
  src="https://placehold.co/320x180/171c22/29e2bd?text=codeIngot"
  alt="A dark editor window showing a single line of JavaScript"
  width="320"
  height="180"
  loading="lazy"
/>`,
                },
},
            },
          ],
        },
      ],
    },
    {
      id: 'html-s4',
      title: 'Forms',
      description: 'Collecting input in a way that actually works.',
      lessons: [
        {
          id: 'html-l6',
          title: 'Labels, inputs and the name attribute',
          description: 'Every input needs a label. No exceptions.',
          duration: 7,
          objectives: [
            'Label every form control',
            'Use the right input type and autocomplete token',
            'Group controls with fieldset and legend',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'h-l6-b1',
              body: 'A bare input is unusable. Clicking it does nothing useful, a screen reader announces nothing at all, and zooming in on a phone turns it into a guessing game. Every control needs a `<label>`. There is no exception to this rule.',
            },
            {
              type: 'code',
              id: 'h-l6-c1',
              language: 'html',
              title: 'A label is not optional',
              code: `<!-- explicit: the for attribute points at the input's id -->
<label for="email">Email address</label>
<input id="email" name="email" type="email" autocomplete="email" required />

<!-- implicit: the input is nested inside the label -->
<label>
  Email address
  <input name="email" type="email" autocomplete="email" required />
</label>`,
            },
            {
              type: 'text',
              id: 'h-l6-b2',
              body: 'The `name` attribute is what the control\'s value is called when the form is submitted. Without it the field is never sent. The `id` is what the label points at. Mixing them up is the single most common reason "my form sends nothing".',
            },
            {
              type: 'list',
              id: 'h-l6-l1',
              style: 'bullet',
              items: [
                '`type="email"` gives mobile keyboards an @ key and basic validation.',
                '`autocomplete="email"` lets browsers and password managers fill it in.',
                '`required` asks for validation before submitting.',
                '`minlength` / `maxlength` bound the value.',
                '`placeholder` is a hint, never a label — it disappears the moment someone types.',
              ],
            },
            {
              type: 'code',
              id: 'h-l6-c2',
              language: 'html',
              title: 'Grouping related controls',
              code: `<fieldset>
  <legend>Delivery address</legend>
  <label for="street">Street</label>
  <input id="street" name="street" autocomplete="street-address" />
</fieldset>`,
            },
            {
              type: 'tip',
              id: 'h-l6-t1',
              title: 'The most valuable attribute',
              body: 'A correct `autocomplete` token lets a real user finish your form in seconds. It is free accessibility, and it improves conversion on every checkout form you will ever build.',
            },
            {
              type: 'exercise',
              id: 'html-l6-x1',
              exercise: {
                id: 'ex-html-form',
                instructions:
                  'Give the email input a matching label, a `name` attribute and `type="email"`. Then make the whole thing required.',
                languages: ['html'],
                starterCode: {
                  html: `<form action="/subscribe" method="post">
  <p>Subscribe for weekly lessons.</p>
  <input type="text" id="mail" />
  <button type="submit">Subscribe</button>
</form>`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The input has a name attribute',
                    body: `var input = document.querySelector('input');
return input.getAttribute('name') ? true : 'Without a name, the browser never sends this value.';`,
                  },
                  {
                    id: 't2',
                    label: 'The input type is email',
                    body: `var input = document.querySelector('input');
return input.getAttribute('type') === 'email' ? true : 'Use type="email" so the keyboard and validation match the data.';`,
                  },
                  {
                    id: 't3',
                    label: 'A label points at the input with for="mail"',
                    body: `var label = document.querySelector('label');
return (label && label.getAttribute('for') === 'mail') ? true : 'Add a <label for="mail"> element.';`,
                  },
                  {
                    id: 't4',
                    label: 'The field is required',
                    body: `var input = document.querySelector('input');
return input.hasAttribute('required') ? true : 'Add the required attribute.';`,
                  },
                ],
                hints: [
                  'The input already has `id="mail"`, so your label needs `for="mail"`.',
                  'The label text can be "Email address" — whatever reads best.',
                  'Three attributes to change: `type`, `name`, and add `required`.',
                ],
                solution: {
                  html: `<form action="/subscribe" method="post">
  <p>Subscribe for weekly lessons.</p>
  <label for="mail">Email address</label>
  <input type="email" id="mail" name="email" autocomplete="email" required />
  <button type="submit">Subscribe</button>
</form>`,
                },
              },
            },
          ],
        },
        {
          id: 'html-l7',
          title: 'Semantic structure',
          description: 'Landmark elements that make a page navigable.',
          duration: 6,
          objectives: [
            'Replace generic divs with meaningful elements',
            'Build a page outline with header, nav, main, footer',
            'Use article and section for content grouping',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'h-l7-b1',
              body: '`<div>` is a container of last resort. Semantic elements carry meaning that browsers, search engines and assistive technology all understand — and they do it with no extra markup and no extra cost.',
            },
            {
              type: 'code',
              id: 'h-l7-c1',
              language: 'html',
              title: 'A complete page skeleton',
              code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>codeIngot — Learn by building</title>
</head>
<body>
  <a href="#main" class="skip-link">Skip to content</a>

  <header>
    <a href="/">codeIngot</a>
    <nav aria-label="Main">
      <a href="/paths">Paths</a>
      <a href="/challenges">Challenges</a>
    </nav>
  </header>

  <main id="main">
    <article>
      <h1>Learn by building</h1>
      <p>…</p>
      <section>
        <h2>First steps</h2>
        <p>…</p>
      </section>
    </article>
  </main>

  <aside aria-label="Related">
    <h2>Next up</h2>
  </aside>

  <footer>
    <p>© 2026 codeIngot</p>
  </footer>
</body>
</html>`,
            },
            {
              type: 'text',
              id: 'h-l7-b2',
              body: 'The payoff is navigation. A screen reader user can jump between landmarks with a single keystroke, skipping hundreds of nav links. A `<nav>` is a block of *major* navigation — breadcrumbs, pagination and a logo link are not `<nav>`s.',
            },
            {
              type: 'tip',
              id: 'h-l7-t1',
              title: 'One main, please',
              body: 'A page should have exactly one `<main>`. If you have two, a screen reader cannot tell which one is the content — which defeats the point entirely.',
            },
            {
              type: 'warning',
              id: 'h-l7-w1',
              title: 'Semantic does not mean visible',
              body: '`<header>` inside an `<article>` is a header *for that article*, not for the page. Nesting gives context. Be deliberate about where each element sits.',
            },
            {
              type: 'exercise',
              id: 'html-l7-x1',
              exercise: {
                id: 'ex-html-semantic',
                instructions:
                  'Wrap the article content in `<main>`, put the links in a `<nav aria-label="Main">`, and wrap the wrapper in `<article>`. Give main an id of "main" and add a skip link to it as the first element in body.',
                languages: ['html'],
                starterCode: {
                  html: `<div class="wrapper">
  <div class="links">
    <a href="/paths">Paths</a>
    <a href="/challenges">Challenges</a>
  </div>
  <div class="content">
    <h1>Semantic HTML</h1>
    <p>Structure is meaning.</p>
  </div>
</div>`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'There is exactly one <main>',
                    body: `return document.querySelectorAll('main').length === 1 || 'The page needs exactly one <main> element.';`,
                  },
                  {
                    id: 't2',
                    label: 'There is an <article>',
                    body: `return document.querySelectorAll('article').length === 1 ? true : 'Wrap the content in an <article>.';`,
                  },
                  {
                    id: 't3',
                    label: 'The <nav> is labelled',
                    body: `var nav = document.querySelector('nav');
return nav && nav.getAttribute('aria-label') ? true : 'Add aria-label="Main" to the nav.';`,
                  },
                  {
                    id: 't4',
                    label: 'A skip link is the first focusable element',
                    body: `var a = document.querySelector('a');
var main = document.querySelector('main');
if (!a || !main) return 'You need a link and a <main>.';
return a.getAttribute('href') === '#' + main.getAttribute('id') ? true : 'Make the first link point to #main.';`,
                  },
                  {
                    id: 't5',
                    label: 'No <div> wrappers were left behind',
                    body: `return document.querySelectorAll('div').length === 0 ? true : 'Semantic elements can replace all of the divs here.';`,
                  },
                ],
                hints: [
                  'Order: skip link, then nav, then main containing article.',
                  '`<main id="main">` — the id is what the skip link targets.',
                  '`<a href="#main">Skip to content</a>` must be the very first element inside body.',
                ],
                solution: {
                  html: `<a href="#main">Skip to content</a>
<nav aria-label="Main">
  <a href="/paths">Paths</a>
  <a href="/challenges">Challenges</a>
</nav>
<main id="main">
  <article>
    <h1>Semantic HTML</h1>
    <p>Structure is meaning.</p>
  </article>
</main>`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-html-s4',
        title: 'Forms & structure check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            type: 'identify-error',
            prompt: 'What is wrong with this input?',
            code: `<label>Email</label><input type="email" placeholder="Email" />`,
            options: [
              'The type should be text',
              'The label is not associated with the input',
              'placeholder is not allowed',
              'Nothing is wrong',
            ],
            answer: 1,
            explanation:
              'A label must be associated with its control, either by nesting the input inside the label or with a matching `for` and `id`. Here the label is just text.',
          },
          {
            id: 'q2',
            type: 'true-false',
            prompt: 'A decorative image should have `alt=""` rather than a description.',
            answer: true,
            explanation:
              'An empty alt is the correct way to mark an image as decorative so assistive technology skips it.',
          },
          {
            id: 'q3',
            type: 'multiple-choice',
            prompt: 'How many `<main>` elements should a page contain?',
            options: ['One per article', 'Exactly one', 'As many as sections', 'None, use div'],
            answer: 1,
            explanation:
              'Exactly one main landmark per page, so assistive technology can identify the primary content.',
          },
          {
            id: 'q4',
            type: 'blank',
            prompt: 'Which attribute is the value of an input called in a submitted form?',
            answers: ['name', 'Name', 'NAME'],
            explanation: 'The `name` attribute becomes the key in the submitted data; the `id` is only for labels and CSS.',
          },
        ],
      },
    },
    {
      id: 'html-s5',
      title: 'Final Project',
      description: 'Put structure, links, media and forms together.',
      lessons: [
        {
          id: 'html-l8',
          title: 'Build a personal profile page',
          description: 'A complete static page, structured properly from the top.',
          duration: 25,
          objectives: [
            'Plan a page outline before writing markup',
            'Combine landmarks, sections and content',
            'Include a labelled, accessible form',
          ],
          xp: 120,
          content: [
            {
              type: 'text',
              id: 'h-l8-b1',
              body: 'You have every HTML tool you need. This project is about **ordering** them: decide what the page is made of, write the outline, then fill in the details. Structure first means styling later is a two-minute job instead of a two-hour one.',
            },
            {
              type: 'list',
              id: 'h-l8-l1',
              style: 'ordered',
              items: [
                'Write the headings first — the outline of the whole page.',
                'Turn each heading into a `<section>` with an id.',
                'Place the landmarks: header, nav, main, footer.',
                'Add content: paragraphs, one list, one image, one link.',
                'Finish with a contact form where every control has a label.',
                'Check the outline: no skipped heading levels, one h1, one main.',
              ],
            },
            {
              type: 'tip',
              id: 'h-l8-t1',
              title: 'There is no single right answer',
              body: 'This is checked against requirements, not against a reference solution. Build something you would be happy to show, and make every element earn its place.',
            },
            {
              type: 'exercise',
              id: 'html-l8-x1',
              exercise: {
                id: 'ex-html-project',
                instructions:
                  'Build the profile page. Structure it, style it lightly, and include a contact form with two labelled fields. Press Check when you are done — you need all checks passing.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<header>
  <h1>Your Name</h1>
  <p>Front-end developer in the making.</p>
</header>

<main>
  <!-- sections go here -->
</main>

<footer>
  <p>© 2026</p>
</footer>`,
                  css: `body {
  font-family: system-ui, sans-serif;
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem 1.25rem;
  line-height: 1.6;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The page has a main landmark',
                    body: `return document.querySelectorAll('main').length === 1 ? true : 'Add exactly one <main> element.';`,
                  },
                  {
                    id: 't2',
                    label: 'The page has a header and a footer',
                    body: `return (document.querySelector('header') && document.querySelector('footer')) ? true : 'Add a <header> and a <footer>.';`,
                  },
                  {
                    id: 't3',
                    label: 'There are at least three sections of content',
                    body: `return document.querySelectorAll('section').length >= 3 ? true : 'Split the content into at least three <section> elements.';`,
                  },
                  {
                    id: 't4',
                    label: 'The page has an image with alt text',
                    body: `var img = document.querySelector('img');
return img && (img.getAttribute('alt') || '').length > 3 ? true : 'Include an image with meaningful alt text.';`,
                  },
                  {
                    id: 't5',
                    label: 'The page contains a link',
                    body: `return document.querySelectorAll('a').length >= 1 ? true : 'Add at least one useful link.';`,
                  },
                  {
                    id: 't6',
                    label: 'The form has a labelled control',
                    body: `var label = document.querySelector('label');
var control = document.querySelector('input, textarea, select');
if (!control) return 'Add a contact form with at least one control.';
return (label || control.closest('label')) ? true : 'Every form control needs a label.';`,
                  },
                  {
                    id: 't7',
                    label: 'The heading outline never skips a level',
                    body: `var levels = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(function (el) { return Number(el.tagName[1]); });
for (var i = 1; i < levels.length; i++) {
  if (levels[i] - levels[i - 1] > 1) return 'Your outline jumps from h' + levels[i - 1] + ' to h' + levels[i] + '.';
}
return levels.length >= 3 ? true : 'Use at least three headings to structure the page.';`,
                  },
                ],
                hints: [
                  'Start with headings: h1 for the name, then an h2 for each section.',
                  'A useful order: About → Skills → Projects → Contact.',
                  'If a check complains about a skipped heading, you probably went h2 straight to h4.',
                ],
                solution: {
                  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Alex Rivera — Front-end developer</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <a href="#main">Skip to content</a>
  <header>
    <h1>Alex Rivera</h1>
    <p>Front-end developer in the making.</p>
    <nav aria-label="Main">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="main">
    <section id="about">
      <h2>About</h2>
      <p>I am learning to build for the web, one project at a time.</p>
      <img src="https://placehold.co/320x180/171c22/29e2bd?text=Alex" alt="Portrait of Alex Rivera" width="320" height="180" />
    </section>

    <section id="skills">
      <h2>Skills</h2>
      <ul>
        <li>Semantic HTML</li>
        <li>Modern CSS layout</li>
        <li>JavaScript fundamentals</li>
      </ul>
    </section>

    <section id="contact">
      <h2>Contact</h2>
      <form action="/contact" method="post">
        <label for="name">Name</label>
        <input id="name" name="name" type="text" autocomplete="name" required />
        <label for="email">Email</label>
        <input id="email" name="email" type="email" autocomplete="email" required />
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>© 2026 Alex Rivera</p>
  </footer>
</body>
</html>`,
                },
                testNotes:
                  'These checks look at structure and accessibility, not at visual design. A tidy outline passes.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'html-s6',
      title: 'Tables, Lists & Embedding',
      description: 'Tabular data, navigation lists, embedding external content, and the comments and paths that keep markup maintainable.',
      lessons: [
        {
          id: 'html-l10',
          title: 'Tables for tabular data',
          description: 'Rows, cells, headers, and spans for table data.',
          duration: 7,
          objectives: [
            'Structure tabular data with table, tr, th and td',
            'Mark header cells and associate them with data cells',
            'Use colspan and rowspan for layout variations',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'h-l10-b1',
              body: 'A `<table>` is for **tabular data** — information that makes sense in a grid of rows and columns. Layout tables were deprecated decades ago; if a grid of content is actually a layout, use CSS Grid or Flexbox. HTML tables are for data.',
            },
            {
              type: 'code',
              id: 'h-l10-c1',
              language: 'html',
              title: 'A basic table with headers',
              code: `<table>
  <caption>Quarterly sales</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q3</th>
      <th scope="col">Q4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>6,315</td>
      <td>7,284</td>
      <td>9,920</td>
      <td>8,103</td>
    </tr>
    <tr>
      <th scope="row">South</th>
      <td>5,124</td>
      <td>6,045</td>
      <td>7,632</td>
      <td>7,988</td>
    </tr>
  </tbody>
</table>`,
            },
            {
              type: 'text',
              id: 'h-l10-b2',
              body: 'Use `<caption>` to describe what the table is about. `<th>` cells are bold and centered by default. `scope="col"` says "this header labels the column", `scope="row"` says "this header labels the row". A screen reader uses these relationships to read each cell with its context.',
            },
            {
              type: 'code',
              id: 'h-l10-c2',
              language: 'html',
              title: 'Spanning cells',
              code: `<table>
  <tr>
    <td colspan="2">Spans two columns</td>
    <td>Third column</td>
  </tr>
  <tr>
    <td>Row 2</td>
    <td>Rowspan</td>
    <td rowspan="2">This cell spans two rows</td>
  </tr>
  <tr>
    <td>Row 3</td>
    <td>from above</td>
  </tr>
</table>`,
            },
            {
              type: 'warning',
              id: 'h-l10-w1',
              title: 'colspan and rowspan are rarely needed',
              body: 'Most tables are simple grids. If you reach for colspan or rowspan to "make the headers line up", you probably need to restructure the data rather than stretch the table.',
            },
            {
              type: 'exercise',
              id: 'html-l10-x1',
              exercise: {
                id: 'ex-html-table',
                instructions:
                  'Build a table of three employees. Each row should have: name, role, and start date. The first row should be a header row with scope="col" for each column.',
                languages: ['html'],
                starterCode: {
                  html: `<h2>Team roster</h2>
`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'There is a table element',
                    body: `return document.querySelectorAll('table').length === 1 ? true : 'Add a <table> element.';`,
                  },
                  {
                    id: 't2',
                    label: 'The header cells use scope="col"',
                    body: `var ths = document.querySelectorAll('th');
return ths.length >= 3 ? true : 'Use <th scope="col"> for each column header.';`,
                  },
                  {
                    id: 't3',
                    label: 'The table has at least three data rows',
                    body: `var rows = document.querySelectorAll('tr');
return rows.length >= 4 ? true : 'You need a header row plus three employee rows.';`,
                  },
                  {
                    id: 't4',
                    label: 'The table uses a caption',
                    body: `return document.querySelector('caption') ? true : 'Add a <caption> describing the table.';`,
                  },
                ],
                hints: [
                  'Start with `<table>` and add `<caption>`, `<thead>`, then `<tbody>`.',
                  'Each data row uses `<tr>` with `<td>` cells. Header row uses `<th scope="col">`.',
                  'Row headers use `<th scope="row">` instead of a `<td>`.',
                ],
                solution: {
                  html: `<table>
  <caption>Engineering team at codeIngot</caption>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Started</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Alex Rivera</th>
      <td>Front-end engineer</td>
      <td>2025-03</td>
    </tr>
    <tr>
      <th scope="row">Sam Chen</th>
      <td>Back-end engineer</td>
      <td>2025-01</td>
    </tr>
    <tr>
      <th scope="row">Riley Smith</th>
      <td>Product designer</td>
      <td>2024-11</td>
    </tr>
  </tbody>
</table>`,
                },
              },
            },
          ],
        },
        {
          id: 'html-l11',
          title: 'Lists: ordered, unordered and description',
          description: 'ul, ol, li, dl, dt and dd for every kind of list.',
          duration: 5,
          objectives: [
            'Choose between ul, ol and dl for the right kind of content',
            'Nest lists correctly',
            'Use the type attribute and start attribute on ol',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'h-l11-b1',
              body: 'HTML has three list types. An **unordered list** (`ul`) is for groups where order does not matter. An **ordered list** (`ol`) is for sequences — steps, rankings, a countdown. A **description list** (`dl`) pairs terms with definitions and is perfect for FAQs, glossaries and key/value pairs.',
            },
            {
              type: 'code',
              id: 'h-l11-c1',
              language: 'html',
              code: `<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Cherries</li>
</ul>

<ol start="3">
  <li>First, preheat the oven.</li>
  <li>Second, fold in the eggs.</li>
  <li>Third, bake for 20 minutes.</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>The structure of a web page.</dd>
  <dt>CSS</dt>
  <dd>The presentation of a web page.</dd>
</dl>`,
            },
            {
              type: 'text',
              id: 'h-l11-b2',
              body: 'Lists can nest. An `ol` inside an `ol` automatically switches to lowercase letters (a, b, c). A `ul` inside an `li` creates a sub-list, which is the right way to build a navigation tree.',
            },
            {
              type: 'tip',
              id: 'h-l11-t1',
              title: 'Lists are your semantic shortcut',
              body: 'If you find yourself wrapping every item in a `<p>` or `<br>`, ask whether you actually have a list. Search engines and screen readers both understand list structure.',
            },
            {
              type: 'exercise',
              id: 'html-l11-x1',
              exercise: {
                id: 'ex-html-lists',
                instructions:
                  'Build an ordered list of three steps to bake bread. The second step should contain a nested unordered list of two ingredients.',
                languages: ['html'],
                starterCode: {
                  html: `<h2>Instructions</h2>
`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'There is an ordered list',
                    body: `return document.querySelectorAll('ol').length >= 1 ? true : 'Add an <ol> element.';`,
                  },
                  {
                    id: 't2',
                    label: 'The ordered list has at least three items',
                    body: `var items = document.querySelectorAll('ol > li');
return items.length >= 3 ? true : 'Add at least three <li> items to the ordered list.';`,
                  },
                  {
                    id: 't3',
                    label: 'The second list item contains a nested ul',
                    body: `var li = document.querySelector('ol > li:nth-child(2)');
if (!li) return 'Add a second <li> to the ordered list.';
var sublist = li.querySelector('ul');
return sublist && sublist.querySelectorAll('li').length >= 2
  ? true : 'The second step needs a nested <ul> with at least two items.';`,
                  },
                ],
                hints: [
                  'The `<ul>` must be inside one of the `<li>` elements of the `<ol>`.',
                  'Nesting: `<li>Step 2<ul><li>ingredient a</li><li>ingredient b</li></ul></li>`',
                  'Check that the `<li>` wraps the entire nested list, including the closing tag.',
                ],
                solution: {
                  html: `<ol>
  <li>Mix the dough and let it rise.</li>
  <li>Shape the loaf.
    <ul>
      <li>Flour</li>
      <li>Water</li>
    </ul>
  </li>
  <li>Bake at 230°C for 30 minutes.</li>
</ol>`,
                },
              },
            },
          ],
        },
        {
          id: 'html-l12',
          title: 'Embedding, comments and paths',
          description: 'iframes, comments for maintenance, and relative vs absolute file paths.',
          duration: 6,
          objectives: [
            'Embed external content with iframe',
            'Comment out markup for debugging',
            'Use relative and absolute paths correctly',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'h-l12-b1',
              body: 'Comments are wrapped in `<!--` and `-->`. They are invisible to the user but visible to anyone who views source — use them to explain tricky markup, flag TODOs, or temporarily remove a block while debugging.',
            },
            {
              type: 'code',
              id: 'h-l12-c1',
              language: 'html',
              title: 'HTML comments',
              code: `<!-- TODO: replace placeholder with real content -->
<p>This paragraph is visible to the user.</p>

<!--
<p>This one is not. It is commented out for now.</p>
-->

<!-- Tip: comment on closing tags for deeply nested layouts -->
<div class="card">
  <p>Content</p>
</div> <!-- end .card -->`,
            },
            {
              type: 'text',
              id: 'h-l12-b2',
              body: 'An `<iframe>` embeds another page inside your page. Use it sparingly — an iframe is a window, and every window is a new security boundary. The `loading="lazy"` and `title` attributes matter for performance and accessibility.',
            },
            {
              type: 'code',
              id: 'h-l12-c2',
              language: 'html',
              code: `<iframe
  src="https://example.com"
  title="Example content preview"
  width="640"
  height="360"
  loading="lazy"
  referrerpolicy="no-referrer"
></iframe>`,
            },
            {
              type: 'text',
              id: 'h-l12-b3',
              body: 'Paths can be relative (`/about`, `../images/logo.png`) or absolute (`https://example.com/about`). Relative paths break less when you move the site between domains. A leading slash means "from the site root"; no slash means "from wherever I am now".',
            },
            {
              type: 'warning',
              id: 'h-l12-w1',
              title: 'Never leave bare URLs in href or src',
              body: 'An href of "google.com" is treated as a relative path and resolves to `/current-page/google.com`. A real external link needs the protocol: `https://google.com`.',
            },
            {
              type: 'exercise',
              id: 'html-l12-x1',
              exercise: {
                id: 'ex-html-embed',
                instructions:
                  'Add a comment explaining the section, then embed an iframe pointing to "https://example.com" with a title, width of 640, and loading="lazy".',
                languages: ['html'],
                starterCode: {
                  html: `<div class="media">
  <!-- embed content here -->
</div>`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'There is at least one HTML comment',
                    body: `var comments = (document.documentElement.textContent || '');
return comments.indexOf('<!--') > -1 ? true : 'Add an HTML comment with <!-- -->.';`,
                  },
                  {
                    id: 't2',
                    label: 'There is an iframe',
                    body: `return document.querySelectorAll('iframe').length >= 1 ? true : 'Add an <iframe> element.';`,
                  },
                  {
                    id: 't3',
                    label: 'The iframe has a title attribute',
                    body: `var iframe = document.querySelector('iframe');
return iframe && iframe.getAttribute('title') ? true : 'Add title="…" for accessibility.';`,
                  },
                  {
                    id: 't4',
                    label: 'The iframe uses lazy loading',
                    body: `var iframe = document.querySelector('iframe');
return iframe.getAttribute('loading') === 'lazy' ? true : 'Add loading="lazy" to the iframe.';`,
                  },
                ],
                hints: [
                  'Comments look like: `<!-- your note here -->`',
                  'The iframe needs `src`, `title`, `width`, `loading="lazy"`.',
                  'Use `&lt;` inside comments if you need to show a literal `<` symbol.',
                ],
                solution: {
                  html: `<div class="media">
  <!-- External reference embedded for demonstration -->
  <iframe src="https://example.com" title="Example site" width="640" loading="lazy"></iframe>
</div>`,
                },
              },
            },
          ],
        },
      ],
    },
  ],
  projects: [],
}
