import type { Section } from '~/types/content'

export const htmlLinkSections: Section[] = [
  {
    id: 'html-s17',
    title: 'HTML Links',
    description: 'The anchor element, absolute and relative URLs, and the attributes that make a link usable.',
    lessons: [
      {
        id: 'html-l28',
        title: 'HTML Links',
        description: 'The a element, absolute and relative URLs, and why the href is not the only thing a link needs.',
        duration: 7,
        objectives: [
          'Write a link with an anchor element and an href',
          'Tell an absolute URL from a relative one and predict where each resolves',
          'Explain what target and rel do, and when each is required',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l28-b1',
            body: 'Links are defined with the `<a>` element, and the `href` attribute is where the destination goes. The word link is doing two jobs at once: it is the thing you click, and it is the relationship the document declares. A link with no `href` is called an anchor and is only a named target — it goes nowhere.',
          },
          {
            type: 'demo',
            id: 'c-l28-d1',
            title: 'Internal link, external link, and mail link',
            body: 'Three links, three kinds of destination. The second one is absolute and leaves the site; the first and third resolve inside it.',
            html: `<p><a href="/pages/contact.html">Contact us</a> — an internal link, relative to the site root.</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML">MDN HTML reference</a> — an absolute URL on another origin.</p>
<p><a href="mailto:hello@example.com">Email the team</a> — a mailto link that opens a client.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.7; }
a { color: #1d4ed8; }`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'c-l28-h1',
            level: 3,
            body: 'Absolute and relative',
          },
          {
            type: 'text',
            id: 'c-l28-b2',
            body: 'An absolute URL carries the whole address: protocol, host, and path. It works from any page, because nothing about it depends on where the link happens to sit. A relative URL carries only part of it, and the browser fills in the rest from the current page. Root-relative paths start with a slash and resolve from the site root; document-relative paths have no leading slash and resolve from the folder holding the current file.',
          },
          {
            type: 'code',
            id: 'c-l28-c1',
            language: 'html',
            title: 'The four forms of href',
            code: `<!-- absolute: protocol, host, path -->
<a href="https://www.example.com/docs/guide.html">Guide</a>

<!-- protocol-relative: inherits http or https -->
<a href="//cdn.example.com/logo.svg">Logo</a>

<!-- root-relative: from the root of this origin -->
<a href="/about/team.html">Team</a>

<!-- document-relative: from this page's folder -->
<a href="details.html">Details</a>

<!-- fragment: within the current document -->
<a href="#pricing">Pricing</a>

<!-- special schemes -->
<a href="mailto:hello@example.com">Email</a>
<a href="tel:+441234567890">Call</a>`,
          },
          {
            type: 'list',
            id: 'c-l28-l1',
            style: 'ordered',
            items: [
              '`target="_blank"` opens the link in a new tab. Always pair it with `rel="noopener"`, or the new page gets a handle on your window through `window.opener`.',
              '`rel="nofollow"` asks search engines not to pass ranking signal through the link. It is for untrusted, user-submitted content.',
              '`rel="noreferrer"` withholds the referrer header as well. Combine it with noopener on any external link.',
              '`download` turns the link into a file download rather than a navigation. It works on same-origin files.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l28-t1',
            title: 'The two lines every link needs',
            body: 'A link that opens in a new tab without `rel="noopener"` is a security bug, not a style choice. Newer browsers imply it, but the attribute is free and the bug is severe enough not to depend on that.',
          },
          {
            type: 'warning',
            id: 'c-l28-w1',
            title: 'The href is not the accessible name',
            body: 'A screen reader announces the link text and the destination. "Click here" announces nothing useful, and a bare URL announces a long string of punctuation. The visible text has to make sense out of context, because the whole page is read without it.',
          },
          {
            type: 'exercise',
            id: 'c-l28-x1',
            exercise: {
              id: 'ex-l28',
              instructions:
                'Create three links: one to another page on this site, one to an external site that opens in a new tab safely, and one that starts an email.',
              languages: ['html'],
              starterCode: {
                html: '<!-- internal link -->\n\n<!-- external link, new tab, safe -->\n\n<!-- email link -->\n',
              },
              tests: [
                {
                  id: 'ex-l28-t1',
                  label: 'There are three links',
                  body: 'return document.querySelectorAll("a[href]").length === 3',
                },
                {
                  id: 'ex-l28-t2',
                  label: 'The external link is absolute and uses https',
                  body:
                    'return Array.from(document.querySelectorAll("a[href]")).some(a => /^https:\\/\\//.test(a.getAttribute("href")))',
                },
                {
                  id: 'ex-l28-t3',
                  label: 'The new-tab link sets rel="noopener"',
                  body:
                    'const a = Array.from(document.querySelectorAll("a")).find(x => x.getAttribute("target") === "_blank"); return !!a && /noopener/.test(a.getAttribute("rel") || "")',
                },
                {
                  id: 'ex-l28-t4',
                  label: 'The email link uses the mailto scheme',
                  body:
                    'return Array.from(document.querySelectorAll("a")).some(a => a.getAttribute("href").startsWith("mailto:"))',
                },
              ],
              hints: [
                'The attribute is href, and the destination goes in quotes after the equals sign.',
                'target="_blank" needs rel="noopener" next to it to be safe.',
              ],
              solution: {
                html:
                  '<!-- internal link -->\n<a href="/pages/contact.html">Contact us</a>\n\n<!-- external link, new tab, safe -->\n<a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN</a>\n\n<!-- email link -->\n<a href="mailto:hello@example.com">Email the team</a>\n',
              },
              testNotes:
                'The third test is the one that matters most. An external link with target="_blank" and no noopener lets the opened page reach back through window.opener.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s17',
      title: 'HTML Links quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s17-q1',
          type: 'multiple-choice',
          prompt: 'What does the href="/about/team.html" path resolve against?',
          options: [
            'The folder holding the current page',
            'The root of the current origin',
            'The domain of the previous page visited',
            'Nothing — root-relative paths need a base tag',
          ],
          answer: 1,
          explanation:
            'A leading slash anchors the path at the root of the origin, so it resolves the same way from any depth.',
        },
        {
          id: 'quiz-html-s17-q2',
          type: 'true-false',
          prompt: 'A link with target="_blank" should carry rel="noopener".',
          answer: true,
          explanation:
            'Without it the opened page gets a handle on your window through window.opener, which is a real security risk.',
        },
        {
          id: 'quiz-html-s17-q3',
          type: 'multiple-choice',
          prompt: 'Why is "Click here" a bad link text?',
          options: [
            'It is too long for most screens',
            'It says nothing about the destination when read out of context',
            'Search engines penalise the word here',
            'It cannot be translated',
          ],
          answer: 1,
          explanation:
            'Screen readers announce the link text alone. The text has to describe the destination on its own.',
        },
        {
          id: 'quiz-html-s17-q4',
          type: 'blank',
          prompt: 'Which attribute turns a link into a file download?',
          answers: ['download'],
          explanation: 'The download attribute asks the browser to save the file instead of navigating to it.',
        },
        {
          id: 'quiz-html-s17-q5',
          type: 'identify-error',
          prompt: 'Which link is written correctly?',
          code: `<a href="https://example.com" target="_blank">Example</a>
<a href="https://example.com" target="_blank" rel="noopener">Example</a>`,
          options: [
            'The first one, because it is shorter',
            'The second one, because it protects the opening page',
            'Both are identical',
            'Neither, because target is not valid on links',
          ],
          answer: 1,
          explanation:
            'The second adds rel="noopener", which stops the new page reaching back through window.opener.',
        },
      ],
    },
  },
  {
    id: 'html-s18',
    title: 'HTML Link Colors',
    description: 'How link colours work without styling, the :visited privacy model, and what to do about it.',
    lessons: [
      {
        id: 'html-l29',
        title: 'HTML Link Colors',
        description: 'Why unvisited links are blue, why visited links cannot be styled precisely, and the two properties that do the work.',
        duration: 5,
        objectives: [
          'Say why the browser picks the default link colours',
          'Style link colour for unvisited, visited and hover states',
          'Explain the privacy reason :visited cannot be styled freely',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l29-b1',
            body: 'Browsers display hyperlinks in different colours by default, without any author styling at all. The colours are unvisited blue, visited purple, and an active link while it is being pressed. The browser picks them because a link has to look different from ordinary text, and because a user needs to know at a glance which links they have already followed.',
          },
          {
            type: 'demo',
            id: 'c-l29-d1',
            title: 'The four link states',
            body: 'Each state is styled explicitly here. The hover state only applies while the pointer is over the link, which is why the second row changes colour as you move across it.',
            html: `<p><a class="fresh" href="#one">A link you have not visited</a></p>
<p><a class="seen" href="#two">A link treated as visited</a></p>
<p><a class="loud" href="#three">A link that changes on hover</a></p>
<p><a href="#four">A link with no styling at all</a></p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
a { color: #1d4ed8; }
a:visited { color: #6d28d9; }
a:hover { color: #b91c1c; }
.fresh { color: #1d4ed8; }
.seen { color: #6d28d9; }
.loud:hover { text-decoration: underline; font-weight: 600; }`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'c-l29-h1',
            level: 3,
            body: 'The four states, and which property changes them',
          },
          {
            type: 'list',
            id: 'c-l29-l1',
            style: 'bullet',
            items: [
              '`:link` — an unvisited link. Applies to every link with an href, visited or not, which is why it is the safest place to set the base colour.',
              '`:visited` — a link the user has already followed in this browser profile.',
              '`:hover` — the pointer is over the element. Applies to any element, not just links.',
              '`:active` — the element is being pressed right now.',
              '`:focus` — the element has keyboard focus. Never remove the outline without replacing it.',
            ],
          },
          {
            type: 'code',
            id: 'c-l29-c1',
            language: 'css',
            title: 'A complete link state block',
            code: `a {
  color: #1d4ed8;          /* base */
  text-decoration: underline;
}

a:visited {
  color: #6d28d9;
}

a:hover {
  color: #b91c1c;
}

a:focus-visible {
  outline: 2px solid #0f172a;
  outline-offset: 2px;
}

a:active {
  color: #0f766e;
}`,
          },
          {
            type: 'heading',
            id: 'c-l29-h2',
            level: 3,
            body: 'Why :visited is limited',
          },
          {
            type: 'text',
            id: 'c-l29-b2',
            body: 'Visiting history is sensitive. If a page could style visited links freely, it could render them one colour, read the computed style, and then render them another — using the difference to test whether the user had visited a specific site. Browsers prevent that by allowing only a narrow set of properties inside `:visited`, and by ignoring nearly all of the other selectors on top of it. You can change the colour. You cannot change the font size, the padding, the background image, or anything else that would let the value be read back out.',
          },
          {
            type: 'tip',
            id: 'c-l29-t1',
            title: 'Keep the underline',
            body: 'Colour alone is not an accessible way to mark a link. Users with colour vision deficiency, and anyone on a low-contrast screen, need the underline to do that work. Underline the text and change the colour on hover, not the other way round.',
          },
          {
            type: 'exercise',
            id: 'c-l29-x1',
            exercise: {
              id: 'ex-l29',
              instructions:
                'Style the links so unvisited links are blue, visited links are purple, and hovering turns the link red. Keep the underline on the base state.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<p><a href="#a">One</a> and <a href="#b">two</a> and <a href="#c">three</a>.</p>\n',
                css: 'a {\n  color: ;\n  text-decoration: underline;\n}\n\na:visited {\n  color: ;\n}\n\na:hover {\n  color: ;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l29-t1',
                  label: 'The base link colour is blue',
                  body: 'return getComputedStyle(document.querySelector("a")).color === "rgb(29, 78, 216)"',
                },
                {
                  id: 'ex-l29-t2',
                  label: 'The base state keeps an underline',
                  body:
                    'const s = getComputedStyle(document.querySelector("a")).textDecorationLine; return s.includes("underline")',
                },
                {
                  id: 'ex-l29-t3',
                  label: 'There is a :visited rule setting a purple colour',
                  body:
                    'return Array.from(document.styleSheets).some(sheet => { try { return Array.from(sheet.cssRules).some(r => r.selectorText === "a:visited" && /144\\s*,\\s*41\\s*,\\s*217/.test(r.style.color)) } catch { return false } })',
                },
                {
                  id: 'ex-l29-t4',
                  label: 'There is a :hover rule that changes the colour',
                  body:
                    'return Array.from(document.styleSheets).some(sheet => { try { return Array.from(sheet.cssRules).some(r => r.selectorText === "a:hover" && r.style.color) } catch { return false } })',
                },
              ],
              hints: [
                '#1d4ed8 is the blue, #6d28d9 the purple and #b91c1c the red used in the example.',
                'The three rules are a:visited and a:hover, written as separate blocks.',
              ],
              solution: {
                html: '<p><a href="#a">One</a> and <a href="#b">two</a> and <a href="#c">three</a>.</p>\n',
                css:
                  'a {\n  color: #1d4ed8;\n  text-decoration: underline;\n}\n\na:visited {\n  color: #6d28d9;\n}\n\na:hover {\n  color: #b91c1c;\n}\n',
              },
              testNotes:
                'The last two tests read the stylesheet rules directly, because a fresh preview has no visited history to observe. Hover cannot be asserted without a pointer, so the rule is checked instead of the result.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s18',
      title: 'HTML Link Colors quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s18-q1',
          type: 'multiple-choice',
          prompt: 'Why can :visited not be used to change a link font size?',
          options: [
            'Because font-size is not a colour property',
            'Because reading the result back would leak which links the user has visited',
            'Because browsers do not support the selector',
            'Because font-size does not inherit',
          ],
          answer: 1,
          explanation:
            'Visiting history is private. If a page could set a size and read it back, it could probe the user history one bit at a time.',
        },
        {
          id: 'quiz-html-s18-q2',
          type: 'true-false',
          prompt: 'Relying on colour alone to mark a link is an accessibility problem.',
          answer: true,
          explanation:
            'Colour vision deficiency and low-contrast screens both break the distinction. The underline is what carries the meaning.',
        },
        {
          id: 'quiz-html-s18-q3',
          type: 'multiple-choice',
          prompt: 'Which selector matches a link the user has already followed?',
          options: [':link', ':visited', ':hover', ':target'],
          answer: 1,
          explanation: ':visited matches a followed link in the current browser profile.',
        },
        {
          id: 'quiz-html-s18-q4',
          type: 'blank',
          prompt: 'Which pseudo-class applies while a keyboard user has focus on an element?',
          answers: [':focus-visible', 'focus-visible', ':focus', 'focus'],
          explanation:
            ':focus-visible shows the ring only for keyboard interaction, which is what you almost always want.',
        },
        {
          id: 'quiz-html-s18-q5',
          type: 'multiple-choice',
          prompt: 'Which of these may be styled inside a :visited rule?',
          options: [
            'background-image and font-size',
            'display and position',
            'Colour, and the other permitted properties',
            'Nothing at all is permitted',
          ],
          answer: 2,
          explanation:
            'Browsers allow a narrow set of properties in :visited — colour among them — and ignore the rest to prevent history leaks.',
        },
      ],
    },
  },
  {
    id: 'html-s19',
    title: 'HTML Bookmarks',
    description: 'Linking to a place inside a document, and giving a document a place to be linked to.',
    lessons: [
      {
        id: 'html-l30',
        title: 'HTML Bookmarks',
        description: 'The id attribute as a link target, fragment URLs, and the two attributes that control where the browser scrolls.',
        duration: 5,
        objectives: [
          'Give an element an id and link to it with a fragment',
          'Explain what scroll-margin-top is for on a fixed header',
          'Describe the difference between a bookmark target and a named anchor',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l30-b1',
            body: 'An HTML bookmark is a link target inside a document. You create one by giving any element an `id`, and you link to it with a fragment: a `#` followed by that id. The browser scrolls the target into view and, in every modern browser, moves keyboard focus to it as well — which is why bookmark links work for screen reader users and not just sighted mouse users.',
          },
          {
            type: 'demo',
            id: 'c-l30-d1',
            title: 'A table of contents linking to three bookmarks',
            body: 'Each entry links to an id further down. Clicking one scrolls that heading into view and puts focus on it.',
            html: `<nav aria-label="Contents">
  <a href="#intro">Introduction</a>
  <a href="#usage">Usage</a>
  <a href="#notes">Notes</a>
</nav>

<div style="height: 220px"></div>

<h2 id="intro">Introduction</h2>
<p>This heading is the first bookmark target.</p>

<div style="height: 220px"></div>

<h2 id="usage">Usage</h2>
<p>This heading is the second bookmark target.</p>

<div style="height: 220px"></div>

<h2 id="notes">Notes</h2>
<p>This heading is the third bookmark target.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
nav { position: sticky; top: 0; display: flex; gap: 1rem; padding: 0.5rem; background: #f1f5f9; }
h2 { scroll-margin-top: 3rem; }`,
            height: 380,
          },
          {
            type: 'heading',
            id: 'c-l30-h1',
            level: 3,
            body: 'The old way, and why it is gone',
          },
          {
            type: 'text',
            id: 'c-l30-b2',
            body: 'HTML once had a `name` attribute on the anchor element for this: `<a name="intro">`. It is obsolete and has been removed from the specification. The modern equivalent is `id` on any element, which is better in every way — it is not restricted to anchors, it can be styled, and it is also the hook that CSS and the URL fragment use. The only thing a bare `name` anchor did that an `id` does not is exist without an href.',
          },
          {
            type: 'list',
            id: 'c-l30-l1',
            style: 'bullet',
            items: [
              '**`id` must be unique on the page.** It is the fragment identifier, and duplicates make the link target ambiguous.',
              '**An `id` cannot start with a digit** in HTML5, and cannot contain whitespace.',
              '**Fragments are case-sensitive** in the sense that `#Notes` and `#notes` are different targets.',
              '**A fragment on the same page** is `#name`; on another page it is `page.html#name`.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l30-t1',
            title: 'scroll-margin-top is the fix for a fixed header',
            body: 'When a header is fixed to the top, a fragment link scrolls the target to y=0 — directly underneath the header, where it is invisible. Adding scroll-margin-top to the target reserves the space the header occupies, so the heading lands in clear air.',
          },
          {
            type: 'code',
            id: 'c-l30-c1',
            language: 'css',
            title: 'Making fragment targets clear a sticky header',
            code: `:root { --header-height: 3.5rem; }

h2, h3, [id] {
  scroll-margin-top: var(--header-height);
}`,
          },
          {
            type: 'warning',
            id: 'c-l30-w1',
            title: 'Never name a bookmark after a number only',
            body: 'Fragment links end up in analytics, in shared URLs, and in support tickets. A descriptive id survives a rewrite of the page structure; `section3` does not.',
          },
          {
            type: 'exercise',
            id: 'c-l30-x1',
            exercise: {
              id: 'ex-l30',
              instructions:
                'Add an id to each heading and a set of links at the top that jump to them, then reserve space above the targets so they are not hidden.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<nav></nav>\n\n<h2>Introduction</h2>\n<p>First topic.</p>\n\n<h2>Usage</h2>\n<p>Second topic.</p>\n',
                css: 'h2 {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l30-t1',
                  label: 'Both headings have an id',
                  body:
                    'const hs = document.querySelectorAll("h2"); return hs.length === 2 && Array.from(hs).every(h => h.id && h.id.trim().length > 0)',
                },
                {
                  id: 'ex-l30-t2',
                  label: 'There are two fragment links in the nav',
                  body:
                    'return document.querySelectorAll("nav a[href^=\'#\']").length === 2',
                },
                {
                  id: 'ex-l30-t3',
                  label: 'Every fragment link points at an id that exists',
                  body:
                    'return Array.from(document.querySelectorAll("nav a[href^=\'#\']")).every(a => !!document.getElementById(a.getAttribute("href").slice(1)))',
                },
                {
                  id: 'ex-l30-t4',
                  label: 'The headings reserve space above themselves',
                  body:
                    'return /scroll-margin-top/.test(Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "))',
                },
              ],
              hints: [
                'The link is written href="#introduction" and the heading is id="introduction".',
                'scroll-margin-top goes in the rule for the target, not on the link.',
              ],
              solution: {
                html:
                  '<nav>\n  <a href="#introduction">Introduction</a>\n  <a href="#usage">Usage</a>\n</nav>\n\n<h2 id="introduction">Introduction</h2>\n<p>First topic.</p>\n\n<h2 id="usage">Usage</h2>\n<p>Second topic.</p>\n',
                css: 'h2 {\n  scroll-margin-top: 3rem;\n}\n',
              },
              testNotes:
                'The third test is the one that catches the common mistake: a link whose target does not exist fails silently, and nothing looks wrong.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s19',
      title: 'HTML Bookmarks quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s19-q1',
          type: 'multiple-choice',
          prompt: 'What creates a bookmark target in modern HTML?',
          options: [
            'The name attribute on an anchor',
            'The id attribute on any element',
            'The target attribute on a link',
            'The fragment attribute on the body',
          ],
          answer: 1,
          explanation:
            'Any element with an id can be a fragment target. The old name attribute on anchors is obsolete.',
        },
        {
          id: 'quiz-html-s19-q2',
          type: 'true-false',
          prompt: 'Two elements on a page can share the same id.',
          answer: false,
          explanation:
            'The id is the fragment identifier. Duplicates make the target ambiguous and break label and header associations.',
        },
        {
          id: 'quiz-html-s19-q3',
          type: 'multiple-choice',
          prompt: 'What problem does scroll-margin-top solve?',
          options: [
            'A fragment target scrolled underneath a fixed header and made invisible',
            'Links appearing before the page styles load',
            'Headings jumping too slowly',
            'The browser back button not working',
          ],
          answer: 0,
          explanation:
            'It reserves the space the fixed header occupies, so the target lands below it rather than under it.',
        },
        {
          id: 'quiz-html-s19-q4',
          type: 'blank',
          prompt: 'What character starts a fragment identifier in a URL?',
          answers: ['#', 'hash', 'number sign'],
          explanation: 'A fragment is written as a hash followed by the element id.',
        },
        {
          id: 'quiz-html-s19-q5',
          type: 'multiple-choice',
          prompt: 'What happens when a fragment link points at an id that does not exist?',
          options: [
            'The browser shows an error page',
            'Nothing visible happens; the page stays where it is',
            'The page scrolls to the top',
            'The link is removed from the document',
          ],
          answer: 1,
          explanation:
            'A missing target fails silently, which is why checking that every fragment resolves is a worthwhile test.',
        },
      ],
    },
  },
]
