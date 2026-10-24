import type { Section } from '~/types/content'

export const cssSelectorStateSections: Section[] = [
  {
    id: 'css-s28',
    title: 'CSS Combinators',
    description: 'How to relate elements to each other: descendants, children, siblings, and the elements that contain something.',
    lessons: [
      {
        id: 'css-l63',
        title: 'Combinators',
        description: 'The five ways a selector can describe a relationship instead of a single tag name.',
        duration: 7,
        objectives: [
          'Target a descendant, a child and both sibling relationships with the right combinator',
          'Read a multi-part selector such as `.panel > ul li` back into plain words',
          'Use `:has()` to style an element based on what it contains',
          'Explain why a descendant selector is the slowest of the five',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l63',
          title: 'Combinators quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l63-q1',
              type: 'multiple-choice',
              prompt: 'Which selector matches only the direct children of `.panel`?',
              options: [
                '`.panel p`',
                '`.panel > p`',
                '`.panel + p`',
                '`.panel ~ p`',
              ],
              answer: 1,
              explanation: 'The child combinator `>` stops after one level, so anything nested deeper inside another element does not match.',
            },
            {
              id: 'quiz-css-l63-q2',
              type: 'true-false',
              prompt: 'The general sibling combinator `~` can match an element that appears before its sibling.',
              answer: false,
              explanation: 'Both `+` and `~` only look forwards from the earlier sibling. CSS has no backwards sibling selector.',
            },
            {
              id: 'quiz-css-l63-q3',
              type: 'code-output',
              prompt: 'What does this rule do?',
              code: '.card:has(.badge) { border-color: red; }',
              options: [
                'Every `.card` gets a red border',
                'Every `.badge` gets a red border',
                'Only `.card` elements containing a `.badge` get a red border',
                'Nothing, `:has()` is not real CSS',
              ],
              answer: 2,
              explanation: '`:has()` matches an element based on its descendants, which is the one thing no other combinator can do.',
            },
            {
              id: 'quiz-css-l63-q4',
              type: 'blank',
              prompt: 'Complete the selector so only the element immediately after `.title` matches: `.title ________ p`',
              answers: [
                '+',
                'adjacent sibling',
              ],
              explanation: 'The adjacent sibling combinator `+` selects the very next element of the matching type.',
            },
            {
              id: 'quiz-css-l63-q5',
              type: 'multiple-choice',
              prompt: 'Why is `.panel p` slower to match than `.panel > p`?',
              options: [
                'The space character has to be fetched over the network',
                'Descendant selectors are deprecated',
                'The browser tests every matching element on the page and then walks up its ancestors',
                'Child selectors are cached and descendant selectors are not',
              ],
              answer: 2,
              explanation: 'Matching runs right to left, so a descendant selector considers every `p` in the document and checks each ancestor chain.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l63-b1',
            body: 'A combinator is the character that sits **between two parts of a selector** and says how the two must relate. Instead of matching a tag name, the selector matches a *shape* in the document: something inside something, something directly inside something, something next to something.',
          },
          {
            type: 'demo',
            id: 'c-l63-d1',
            title: 'Five rules, five different subsets of one block of markup',
            body: 'There is only one block of HTML here and five rules painting it. Teal bar = child (`>`), amber bar = descendant (a space), purple bar = `:has()`, blue dashed outline = adjacent sibling (`+`), pink wavy underline = general sibling (`~`).',
            html: `<div class="panel">
  <h4 class="title">Release notes</h4>
  <p class="desc">The first paragraph.</p>
  <div class="box"><p class="inner">A paragraph inside the box.</p></div>
  <p class="last">The last paragraph.</p>
</div>`,
            css: `.panel{border:1px solid #d5dae0;border-radius:12px;padding:.85rem;font:13px/1.5 system-ui,sans-serif}
.panel>*{padding:.4rem .6rem;border-radius:8px;background:#f4f7f9;margin:0 0 .4rem}
.panel p{border-left:4px solid #f59e0b}
.panel>p{border-left:4px solid #29e2bd}
.panel:has(.box) .box{border-left:4px solid #8b5cf6}
.panel h4+p{outline:2px dashed #2563eb}
.panel h4~p{text-decoration:underline wavy #e11d48}
.panel .inner{margin-left:1.1rem}`,
            height: 250,
          },
          {
            type: 'text',
            id: 'c-l63-b2',
            body: 'Read the amber and teal bars together. `.panel p` is a descendant selector, so it paints **all three** paragraphs including the one buried inside the box. `.panel > p` is a child selector, so it paints only the two the panel holds *directly* and skips the nested one. The dashed outline lands on one paragraph; the wavy underline lands on two.',
          },
          { type: 'heading', id: 'c-l63-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l63-c1',
            language: 'css',
            title: 'Every combinator in one stylesheet',
            code: `.panel p { color: #111; }        /* descendant */
.panel > p { margin-left: 0.5rem; } /* child */
.title + .desc { color: #2563eb; }  /* adjacent sibling */
.title ~ .last { color: #e11d48; }  /* general sibling */
.note:has(.warn) { border: 1px solid #e11d48; }`,
          },
          {
            type: 'list',
            id: 'c-l63-l1',
            style: 'bullet',
            items: [
              '**Descendant — a space.** `.panel p` matches every `p` at any depth inside `.panel`. Most forgiving, slowest to match.',
              '**Child — `>`.** `.panel > p` matches only the immediate children, and stops after one level.',
              '**Adjacent sibling — `+`.** `h4 + p` matches the element immediately *after* an `h4`, and needs no gap between them.',
              '**General sibling — `~`.** `h4 ~ p` matches every element after an `h4` sharing the parent, whatever sits in between.',
              '**Relational — `:has()`.** `.note:has(.warn)` matches a `.note` *because of what it contains*. It is the only one that can select an ancestor.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l63-t1',
            title: 'Both sibling combinators only ever point forwards',
            body: '`+` and `~` cannot look backwards and cannot cross a level. `h2 ~ p` never matches a paragraph before the heading. To style the *previous* sibling, put `:has()` on the parent instead.',
          },
          {
            type: 'warning',
            id: 'c-l63-w1',
            title: 'Descendant selectors get slow on large documents',
            body: 'Matching runs right to left, so `.panel p` means "find every `p` on the page, then check whether an ancestor is a `.panel`". If you only mean direct children, write `>`. If you only mean one element, give it a class.',
          },
          {
            type: 'example',
            id: 'c-l63-e1',
            title: 'One list, targeted by class on the left and by position on the right',
            body: 'Both lists end up styled identically, but the first needs extra classes in the HTML and the second needs none. Combinators keep the markup clean, and that is the real trade-off.',
            html: `<div class="wrap">
  <ul class="menu"><li>Dashboards</li><li class="current">Reports</li><li>Exports</li></ul>
  <ol class="steps"><li>Connect a source</li><li>Pick a table</li><li>Publish</li></ol>
</div>`,
            css: `.wrap{display:flex;gap:1.6rem;font:13px system-ui,sans-serif}
.menu,.steps{margin:0;padding-left:1.1rem}
.menu li,.steps li{padding:.25rem .4rem;border-radius:6px}
.current{background:#29e2bd;font-weight:600}
.menu li:first-child,.steps li:first-child{color:#6b7280}
.steps li:last-child{color:#0f766e;font-weight:600}
.steps li+li{border-left:2px solid #e5e9ee;margin-left:.3rem}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l63-x1',
            exercise: {
              id: 'ex-l63',
              instructions: 'Give every paragraph that is a **direct child** of `.wrap` a 4px teal left border. The paragraph nested inside `.inner` must be left alone.',
              languages: ['css'],
              starterCode: {
                html: '<div class="wrap">\n  <p>Direct child</p>\n  <div class="inner">\n    <p>Nested deeper</p>\n  </div>\n</div>',
                css: '.wrap {\n  font: 13px system-ui, sans-serif;\n}\n',
              },
              tests: [
                { id: 'ex-l63-t1', label: 'The direct child paragraph has a left border', body: 'return getComputedStyle(document.querySelector(".wrap > p")).borderLeftWidth === "4px"' },
                { id: 'ex-l63-t2', label: 'The left border is teal', body: 'return getComputedStyle(document.querySelector(".wrap > p")).borderLeftColor === "rgb(41, 226, 189)"' },
                { id: 'ex-l63-t3', label: 'The nested paragraph was not touched', body: 'return getComputedStyle(document.querySelector(".inner p")).borderLeftWidth === "0px"' },
              ],
              hints: [
                'You need the child combinator, not a plain descendant selector — the difference is the `>`.',
                'The selector has three parts: `.wrap`, then `>`, then `p`.',
                'Try `.wrap > p { border-left: 4px solid #29e2bd; }`',
              ],
              solution: {
                html: '<div class="wrap">\n  <p>Direct child</p>\n  <div class="inner">\n    <p>Nested deeper</p>\n  </div>\n</div>',
                css: '.wrap {\n  font: 13px system-ui, sans-serif;\n}\n\n.wrap > p {\n  border-left: 4px solid #29e2bd;\n}\n',
              },
              testNotes: 'The tests read the computed style of both paragraphs. `#29e2bd` computes to `rgb(41, 226, 189)`.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s29',
    title: 'CSS Pseudo-class',
    description: 'Selecting elements by their current state — what the user is doing to them, or what position they hold.',
    lessons: [
      {
        id: 'css-l64',
        title: 'Pseudo-class',
        description: 'The state selectors that make a page respond: hover, focus, checked, disabled, position in a list, and exclusion with :not().',
        duration: 8,
        objectives: [
          'Style hover, active and focus states on interactive elements',
          'Explain why `:focus-visible` is the right choice for keyboard users',
          'Select by position in a group with `:first-child`, `:last-child` and `:nth-child()`',
          'Use `:not()` and `:root` to write a rule with an exception or a global starting point',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l64',
          title: 'Pseudo-class quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l64-q1',
              type: 'multiple-choice',
              prompt: 'Which pseudo-class should draw a focus ring for keyboard users?',
              options: [
                '`:hover`',
                '`:active`',
                '`:focus-visible`',
                '`:first-child`',
              ],
              answer: 2,
              explanation: '`:focus-visible` only matches when the browser judges the focus should be visible, which is keyboard and assistive-technology input rather than a mouse click.',
            },
            {
              id: 'quiz-css-l64-q2',
              type: 'true-false',
              prompt: '`:nth-child(2n)` selects every second child, starting with the second one.',
              answer: true,
              explanation: '`2n` counts from 2: 2, 4, 6. Use `2n+1` or `odd` to start from the first child instead.',
            },
            {
              id: 'quiz-css-l64-q3',
              type: 'code-output',
              prompt: 'What does this rule do?',
              code: 'button:disabled { opacity: 0.4; cursor: not-allowed; }',
              options: [
                'Fades the button and shows a not-allowed cursor, but the button still submits',
                'Nothing, `:disabled` only affects cursor styling',
                'Fades the button, shows a not-allowed cursor, and the browser also stops it responding',
                'Hides the button',
              ],
              answer: 2,
              explanation: 'The disabled state is enforced by the browser, not just drawn by CSS. The styling is a second, visual signal on top of behaviour that already works.',
            },
            {
              id: 'quiz-css-l64-q4',
              type: 'blank',
              prompt: 'Which pseudo-class is used to declare custom properties that every rule on the page can read?',
              answers: [
                ':root',
                'root',
              ],
              explanation: '`:root` matches the `html` element, the natural home for a design token like `--accent`.',
            },
            {
              id: 'quiz-css-l64-q5',
              type: 'multiple-choice',
              prompt: 'What does `input:checked + span` rely on?',
              options: [
                'The parent combinator',
                'The adjacent sibling combinator, because the span comes right after the input',
                'The `:not()` pseudo-class',
                'Class specificity',
              ],
              answer: 1,
              explanation: 'A checkbox has no visible content of its own, so the usual technique is to style the label that sits immediately after it.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l64-b1',
            body: 'A pseudo-class is a keyword after a colon that matches an element **because of its current state or position**, not because of what it is. `button:hover` matches every button, but only while the pointer is on one. The state is temporary; the rule stays in your stylesheet and waits.',
          },
          {
            type: 'demo',
            id: 'c-l64-d1',
            title: 'States you can see without moving the mouse',
            body: 'The text field arrives already focused, so `:focus` and `:focus-visible` are visible on load. Hover the buttons, untick the box, and note that the pills show `:first-child`, `:nth-child(2n)` and `:last-child` picking out three positions in one list.',
            html: `<div class="stack">
  <label class="field">Email<input id="email" type="email" placeholder="you@example.com"></label>
  <div class="btns"><button class="btn" type="button">Save</button><button class="btn" type="button" disabled>Sync</button></div>
  <label class="toggle"><input type="checkbox" checked><span>Email me about releases</span></label>
  <ul class="tags"><li><span class="pill">first</span></li><li><span class="pill">second</span></li><li><span class="pill">third</span></li><li><span class="pill">last</span></li></ul>
</div>`,
            css: `:root{--accent:#29e2bd}
.stack{font:13px system-ui,sans-serif;display:grid;gap:.9rem}
.field input{font:inherit;padding:.45rem .6rem;border:1px solid #c9d1d9;border-radius:8px;width:100%}
.field input:focus{border-color:#111827}
.field input:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.btns{display:flex;gap:.5rem}
.btn{font:inherit;padding:.45rem .9rem;border-radius:8px;border:1px solid #c9d1d9;background:#fff;cursor:pointer}
.btn:hover{background:var(--accent);border-color:var(--accent)}
.btn:active{transform:translateY(1px);background:#14b8a6}
.btn:disabled{opacity:.45;cursor:not-allowed}
.toggle input:checked+span{color:#0f766e;font-weight:700}
.tags{display:flex;gap:.4rem;list-style:none;margin:0;padding:0}
.pill{display:inline-block;font-size:12px;padding:.2rem .6rem;border-radius:999px;background:#eceff3}
li:first-child .pill{background:#29e2bd}
li:nth-child(2n) .pill{background:#8b5cf6;color:#fff}
li:last-child .pill{background:#f59e0b}`,
            javascript: `document.getElementById('email').focus()`,
            height: 300,
          },
          {
            type: 'text',
            id: 'c-l64-b2',
            body: 'Three details are doing real work. The field is focused because the demo focused it, and a text field always matches `:focus-visible`. The ticked box is styled through `:checked + span` — the sibling combinator reaching the label beside it. And the greyed Sync button is `:disabled`, which the browser also stops responding to, so the style is a second signal rather than the only one.',
          },
          { type: 'heading', id: 'c-l64-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l64-c1',
            language: 'css',
            title: 'Interaction states',
            code: `a:hover { color: #0f766e; }
a:active { color: #e11d48; }
input:focus { border-color: #111827; }
input:focus-visible { outline: 3px solid #29e2bd; }
button:disabled { opacity: 0.45; cursor: not-allowed; }`,
          },
          {
            type: 'list',
            id: 'c-l64-l1',
            style: 'bullet',
            items: [
              '**`:hover`** — the pointer is over the element; `:active` is the pressed moment in between.',
              '**`:focus`** — the element holds focus, by click or by Tab. **`:focus-visible`** — focus the *browser* thinks deserves a ring, which is keyboard and assistive-technology input rather than mouse.',
              '**`:checked`** — a checkbox or radio is on. `:disabled` and `:enabled` cover availability.',
              '**`:first-child`, `:last-child`, `:only-child`** — position among siblings. `nth-child(2n)` is every second one; `odd` and `-n+2` are just as common.',
              '**`:not(.x)`** — everything *except* something, which lets you write the common case first and carve out an exception. `:root` matches the `html` element and is where custom properties belong.',
            ],
          },
          { type: 'heading', id: 'c-l64-h2', level: 3, body: 'Why `:focus-visible` and not just `:focus`' },
          {
            type: 'text',
            id: 'c-l64-b3',
            body: 'A mouse click focuses an element, but that user is looking at the pointer, not the keyboard. Drawing a big ring on every click trains people to ignore rings — and the ring is the only cue a keyboard user has about where they are. `:focus-visible` shows it when focus came from the keyboard. Keep `:focus` for a text field, where any focus should change the border colour, and use `:focus-visible` for the outline itself.',
          },
          {
            type: 'tip',
            id: 'c-l64-t1',
            title: 'If you remove a focus ring, put something back',
            body: 'The default outline is drawn in a colour the browser picks for contrast. `outline: none` with nothing in its place leaves a keyboard user completely lost. If you dislike the shape, restyle it with `outline` — do not delete it.',
          },
          {
            type: 'example',
            id: 'c-l64-e1',
            title: 'Keyboard focus versus pointer focus',
            body: 'The first button is focused by a script on load, which the browser treats as keyboard-style focus. Click the second with your mouse and notice it gets no ring. That is `:focus-visible` doing its job.',
            html: `<div class="row"><button class="key" type="button">Focused on load</button><button class="key click" type="button">Click me</button></div>`,
            css: `.row{display:flex;gap:.6rem;font:13px system-ui,sans-serif}
.key{font:inherit;padding:.5rem .9rem;border:1px solid #c9d1d9;border-radius:8px;background:#fff}
.key:focus{border-color:#111827}
.key:focus-visible{outline:3px solid #29e2bd;outline-offset:3px}`,
            javascript: `document.querySelector('.key').focus()`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l64-x1',
            exercise: {
              id: 'ex-l64',
              instructions: 'Fade every card in `.row` down to `opacity: 0.4` — except `.featured`, which must stay fully opaque. Use `:not()`.',
              languages: ['css'],
              starterCode: {
                html: '<div class="row">\n  <div class="card featured">Featured</div>\n  <div class="card">Standard</div>\n  <div class="card">Standard</div>\n</div>',
                css: '.card {\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n  padding: 0.6rem;\n}\n',
              },
              tests: [
                { id: 'ex-l64-t1', label: 'The standard cards are faded', body: 'return getComputedStyle(document.querySelector(".card:not(.featured)")).opacity === "0.4"' },
                { id: 'ex-l64-t2', label: 'The featured card stays fully opaque', body: 'return getComputedStyle(document.querySelector(".featured")).opacity === "1"' },
                { id: 'ex-l64-t3', label: 'Both standard cards were caught, not just one', body: 'const faded = [...document.querySelectorAll(".card")].filter((el) => getComputedStyle(el).opacity === "0.4"); return faded.length === 2' },
              ],
              hints: [
                '`:not()` takes a selector and matches everything that does **not** match it.',
                'Attach it to the class, not to an element type: `.card:not(.featured)`.',
                'Try `.card:not(.featured) { opacity: 0.4; }`',
              ],
              solution: {
                html: '<div class="row">\n  <div class="card featured">Featured</div>\n  <div class="card">Standard</div>\n  <div class="card">Standard</div>\n</div>',
                css: '.card {\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n  padding: 0.6rem;\n}\n\n.card:not(.featured) {\n  opacity: 0.4;\n}\n',
              },
              testNotes: 'The tests read the computed `opacity` of the cards and count how many ended up faded.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s30',
    title: 'CSS Pseudo-element',
    description: 'Styling parts of an element the markup does not wrap: generated content, the first letter and line, placeholders, selection and list markers.',
    lessons: [
      {
        id: 'css-l65',
        title: 'Pseudo-element',
        description: 'The :: family, and the one rule about generated content that decides whether a screen reader announces it.',
        duration: 7,
        objectives: [
          'Insert generated content with `::before` and `::after`, and know when it must be empty',
          'Style the first letter, the first line, the placeholder and the selection',
          'Change list bullets with `::marker`',
          'Explain why generated content reaches assistive technology and how to keep it silent',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l65',
          title: 'Pseudo-element quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l65-q1',
              type: 'multiple-choice',
              prompt: 'Which pseudo-element styles the bullet or number in front of a list item?',
              options: [
                '`::before`',
                '`::marker`',
                '`::placeholder`',
                '`::part`',
              ],
              answer: 1,
              explanation: '`::marker` targets the list marker itself. You can change its colour, font and content, but not lay it out as a box.',
            },
            {
              id: 'quiz-css-l65-q2',
              type: 'true-false',
              prompt: 'Content generated with `::before` is announced by screen readers.',
              answer: true,
              explanation: 'Generated content sits inside the element and is part of the accessibility tree. A purely decorative pseudo-element should use `content: ""`.',
            },
            {
              id: 'quiz-css-l65-q3',
              type: 'code-output',
              prompt: 'What happens with this rule?',
              code: '.p::before { color: red; }',
              options: [
                'An empty red box appears before the paragraph',
                'Nothing renders, because `content` is missing',
                'The paragraph turns red',
                'The browser adds the text "red" before the paragraph',
              ],
              answer: 1,
              explanation: '`content` is not optional on `::before` and `::after`. Without it the pseudo-element is never generated, whatever else you style.',
            },
            {
              id: 'quiz-css-l65-q4',
              type: 'blank',
              prompt: 'Which pseudo-element styles the grey hint text inside an empty input field?',
              answers: [
                '::placeholder',
                ':placeholder',
                'placeholder',
              ],
              explanation: '`::placeholder` matches the placeholder text of an input or textarea, letting you colour it so it recedes behind real content.',
            },
            {
              id: 'quiz-css-l65-q5',
              type: 'multiple-choice',
              prompt: 'Where does generated content sit in the document?',
              options: [
                'Outside the element, as a sibling of it',
                'Inside the element, as its first or last child box',
                'In the document head, where the stylesheet lives',
                'Wherever the stylesheet declares it',
              ],
              answer: 1,
              explanation: 'It is a box at the start or end of the element, which is why it inherits the element\'s font and colour and why it is announced.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l65-b1',
            body: 'A pseudo-element is a keyword after `::` that matches a **part of an element** — its first letter, its placeholder, the marker on a list item. Two of them, `::before` and `::after`, go further and generate a box of their own at the start or end of the element.',
          },
          {
            type: 'demo',
            id: 'c-l65-d1',
            title: 'Seven pseudo-elements on one page',
            body: 'A teal dot injected by `::before`, a drop cap from `::first-letter`, a bold opening line from `::first-line`, an attribution from `::after`, a grey placeholder, teal list markers from `::marker`, and a yellow selection.',
            html: `<p class="drop">Drop caps are the oldest trick in CSS typography and they still read well on a long opening paragraph.</p>
<p class="lead">The first line of this paragraph is set heavier than the rest of it.</p>
<blockquote class="quote">Combinators are hard to remember until you see them side by side.</blockquote>
<ul class="menu"><li>Combinators</li><li>Pseudo-classes</li><li>Pseudo-elements</li></ul>
<input class="field" type="text" placeholder="Select some of this text">`,
            css: `body{font:14px/1.6 system-ui,sans-serif;color:#1f2933}
.drop::before{content:"";display:inline-block;width:.6rem;height:.6rem;border-radius:50%;background:#29e2bd;margin-right:.5rem}
.drop::first-letter{font-size:2.6rem;float:left;line-height:.9;padding-right:.35rem;color:#0f766e}
.lead::first-line{font-weight:700;letter-spacing:.01em}
.quote{border-left:3px solid #29e2bd;margin:.6rem 0;padding-left:.9rem;font-style:italic;color:#3f4c59}
.quote::after{content:" — platform team";font-style:normal;color:#7b8794}
.menu li::marker{color:#29e2bd;font-weight:700}
.field{font:inherit;padding:.45rem .6rem;border:1px solid #c9d1d9;border-radius:8px}
.field::placeholder{color:#9aa5b1}
::selection{background:#fde68a}`,
            height: 320,
          },
          {
            type: 'text',
            id: 'c-l65-b2',
            body: 'The teal dot is the interesting one. The HTML contains nothing but a `p` with text — the dot is created by CSS, and it still sits **inside** that `p`, so it inherits the paragraph\'s font, colour and line height, and it takes part in the element\'s accessibility tree.',
          },
          { type: 'heading', id: 'c-l65-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l65-c1',
            language: 'css',
            title: 'The ::before and ::after pattern',
            code: `.item::before {
  content: "";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #29e2bd;
  margin-right: 0.5rem;
}
.item::after {
  content: " (required)";
  color: #b42318;
}`,
          },
          {
            type: 'list',
            id: 'c-l65-l1',
            style: 'bullet',
            items: [
              '**`::before` / `::after`** — generate content. The `content` property is mandatory; without it nothing is rendered at all.',
              '**`::first-letter` / `::first-line`** — typographic details. A drop cap and a heavier opening line are one line of CSS each.',
              '**`::placeholder`** — the hint text inside an empty input or textarea. It takes a single colon in practice and a double colon in the spec.',
              '**`::selection`** — the highlight painted over text you have selected, so you can make it follow your palette.',
              '**`::marker`** — the bullet or number on a list item. Colour and font size work everywhere; the marker box cannot be laid out.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l65-t1',
            title: 'One colon is fine everywhere except the two that generate content',
            body: 'The legacy `:before`, `:after`, `:first-line` and `:first-letter` still accept a single colon, but the modern spelling is `::`. Always write `::before` and `::after` — that is the standard, and it is what tells you which ones generate content.',
          },
          {
            type: 'warning',
            id: 'c-l65-w1',
            title: 'Generated content is announced by screen readers',
            body: 'Because `::before` and `::after` live inside the element, their text is part of the accessibility tree, and a decorative star written as `content: "\\2605"` gets read out before every list item. When the pseudo-element is decoration, give it `content: ""` and draw it with `background` or `border` — an empty `content` still renders the box but contributes nothing to the text.',
          },
          {
            type: 'example',
            id: 'c-l65-e1',
            title: 'Decoration versus content',
            body: 'The list on the left uses `content: ""` plus a background colour, so its bullets are purely visual and silent. The list on the right uses a real character, which a screen reader announces as part of each item.',
            html: `<ul class="silent"><li>Silent bullet</li><li>Silent bullet</li></ul>
<ul class="spoken"><li>Spoken bullet</li><li>Spoken bullet</li></ul>`,
            css: `ul{font:14px/1.6 system-ui,sans-serif;margin:0 0 .6rem}
.silent li::before{content:"";display:inline-block;width:.45rem;height:.45rem;border-radius:50%;background:#29e2bd;margin-right:.5rem}
.spoken li::before{content:"\\2192";color:#8b5cf6;margin-right:.4rem}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l65-x1',
            exercise: {
              id: 'ex-l65',
              instructions: 'Add a generated bullet to the front of every `.item` using `::before` and the content `"\\2022 "`. Make the bullet teal.',
              languages: ['css'],
              starterCode: {
                html: '<ul class="list">\n  <li class="item">First</li>\n  <li class="item">Second</li>\n</ul>',
                css: '.list {\n  font: 14px system-ui, sans-serif;\n}\n',
              },
              tests: [
                { id: 'ex-l65-t1', label: 'Every item has generated content on ::before', body: 'const items = [...document.querySelectorAll(".item")]; return items.length > 0 && items.every((el) => getComputedStyle(el, "::before").content.includes("\\u2022"))' },
                { id: 'ex-l65-t2', label: 'The generated bullet is teal', body: 'return getComputedStyle(document.querySelector(".item"), "::before").color === "rgb(41, 226, 189)"' },
                { id: 'ex-l65-t3', label: 'The list itself was not given extra bullets', body: 'return getComputedStyle(document.querySelector(".item"), "::marker").content === "normal"' },
              ],
              hints: [
                '`::before` needs the `content` property or it renders nothing at all.',
                'The bullet character is U+2022, so in a CSS string write `content: "\\2022 ";`.',
                'Try `.item::before { content: "\\2022 "; color: #29e2bd; }`',
              ],
              solution: {
                html: '<ul class="list">\n  <li class="item">First</li>\n  <li class="item">Second</li>\n</ul>',
                css: '.list {\n  font: 14px system-ui, sans-serif;\n}\n\n.item::before {\n  content: "\\2022 ";\n  color: #29e2bd;\n}\n',
              },
              testNotes: 'The tests read the computed style of the `::before` pseudo-element, passed as the second argument to `getComputedStyle`.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s31',
    title: 'CSS Opacity',
    description: 'Fading whole elements, what that does to their children and to stacking, and the transparent-colour alternative.',
    lessons: [
      {
        id: 'css-l66',
        title: 'Opacity',
        description: 'The difference between fading an element and fading its background, and why that difference matters for text.',
        duration: 6,
        objectives: [
          'Apply `opacity` and predict whether it fades children as well',
          'Explain the stacking context that `opacity` creates',
          'Fade only a background with `rgba()` or a hex alpha channel and keep children crisp',
          'Choose between `opacity` and a muted colour for a disabled control',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l66',
          title: 'Opacity quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l66-q1',
              type: 'multiple-choice',
              prompt: 'What does `opacity: 0.5` on a container do to the text inside it?',
              options: [
                'Nothing, opacity only affects backgrounds',
                'Fades the text to half strength along with everything else',
                'Makes the text fully invisible',
                'Keeps the text at full strength and fades only the border',
              ],
              answer: 1,
              explanation: 'The container and its children are composited together first and then faded as one image, so the foreground colour dims too.',
            },
            {
              id: 'quiz-css-l66-q2',
              type: 'true-false',
              prompt: 'Setting `opacity` on an element creates a new stacking context for its descendants.',
              answer: true,
              explanation: 'Any `opacity` below 1 promotes the element out of the normal stacking order, so a child with a large `z-index` can no longer sit above the parent\'s siblings.',
            },
            {
              id: 'quiz-css-l66-q3',
              type: 'code-output',
              prompt: 'Which rule fades only the background and leaves the text crisp?',
              code: 'a { opacity: 0.4 }\nb { background: rgba(0, 0, 0, 0.4) }',
              options: [
                'Both do, because 0.4 means the same thing either way',
                'Rule a, because opacity always targets the background',
                'Rule b, because a translucent colour paints under the children',
                'Neither, backgrounds cannot be made transparent',
              ],
              answer: 2,
              explanation: 'A translucent background colour is painted as the background layer only. Children are painted afterwards at their normal strength.',
            },
            {
              id: 'quiz-css-l66-q4',
              type: 'blank',
              prompt: 'Complete the value so the element is fully opaque: `opacity: ____`',
              answers: [
                '1',
                '1.0',
              ],
              explanation: '`opacity` runs from 0 to 1. Anything above 1 is clamped, and 1 means no fade at all.',
            },
            {
              id: 'quiz-css-l66-q5',
              type: 'multiple-choice',
              prompt: 'Why is fading body text with `opacity` risky?',
              options: [
                'Opacity is not supported on text',
                'The text becomes invisible to screen readers',
                'The foreground colour dims with the background and can drop below a usable contrast ratio',
                'It makes the text unselectable',
              ],
              answer: 2,
              explanation: 'Opacity composites rendered pixels, so both colours move toward each other. Check the faded result against the contrast requirement, not the original palette.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l66-b1',
            body: '`opacity` sets how opaque an element is, from `0` (invisible) to `1` (fully solid). It looks like a simple number, but it applies to the element **after** everything inside it has been drawn, so the element and all of its children fade together as one flattened picture.',
          },
          {
            type: 'demo',
            id: 'c-l66-d1',
            title: 'Fading the element versus fading the background',
            body: 'Both stacks use a half-strength colour. On the left it is `opacity: 0.5` on the wrapper, so the two overlapping cards go dull together. On the right the same colour is written into `rgba()`, so only the backdrop is translucent and the cards on top stay perfectly crisp.',
            html: `<div class="row">
  <div class="panel"><span class="label">opacity: 0.5</span>
    <div class="stack faded"><div class="card">Card A</div><div class="card offset">Card B</div></div>
  </div>
  <div class="panel"><span class="label">rgba(41, 226, 189, 0.5)</span>
    <div class="stack glass"><div class="card">Card A</div><div class="card offset">Card B</div></div>
  </div>
</div>`,
            css: `.row{display:flex;gap:1.2rem;font:13px system-ui,sans-serif}
.panel{flex:1}
.label{display:block;margin-bottom:.4rem;color:#6b7280}
.stack{position:relative;height:130px;border-radius:12px;padding:.8rem}
.faded{background:#29e2bd;opacity:.5}
.glass{background:rgba(41,226,189,.5)}
.card{width:110px;padding:.5rem .6rem;border-radius:8px;background:#0f172a;color:#f8fafc;font-weight:600}
.card.offset{position:absolute;left:2.4rem;top:3.4rem;background:#b45309}`,
            height: 230,
          },
          {
            type: 'text',
            id: 'c-l66-b2',
            body: 'On the left the orange card is dull, its white label is grey, and you can see through both cards where they overlap. On the right the orange is full-strength orange, its label is white, and the overlap is solid. Nothing about the markup differs — only how the translucency was expressed.',
          },
          { type: 'heading', id: 'c-l66-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l66-c1',
            language: 'css',
            title: 'Three ways to say "half transparent"',
            code: `.faded {
  opacity: 0.5;
}
.glass {
  background: rgba(41, 226, 189, 0.5);
}
.hex {
  background: #29e2bd80;
}`,
          },
          {
            type: 'list',
            id: 'c-l66-l1',
            style: 'bullet',
            items: [
              '**`opacity: 0.5`** affects the element *and every descendant*. Text fades with the background, which is why faded body copy is hard to read.',
              '**It creates a new stacking context.** The element is promoted out of the normal `z-index` comparison, so a child with `z-index: 9999` can no longer rise above a sibling of its parent.',
              '**It cannot be exempted for one child.** There is no child-opacity, and no amount of `z-index` or `position` gets text back to full strength.',
              '**`rgba(41, 226, 189, 0.5)`** fades only the background. Children are painted on top at their normal strength. `#29e2bd80` is the same thing as a hex colour with an alpha byte.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l66-t1',
            title: 'Reach for a colour, not `opacity`',
            body: 'If what you want is "make this less prominent", it is usually one property: a lighter colour, a lower-contrast border, a muted background. `opacity` is for fading a whole thing *uniformly* — a disabled card, a hover ghost, a backdrop over a modal.',
          },
          {
            type: 'warning',
            id: 'c-l66-w1',
            title: 'Faded text can fail contrast for no visible reason',
            body: 'Opacity fades the foreground as well as the background, so two colours that look fine in the palette can land under 4.5:1 once you drop the element to 0.6. Test the faded result, not the original, and never fade a paragraph of body text.',
          },
          {
            type: 'example',
            id: 'c-l66-e1',
            title: 'A disabled button, three ways',
            body: 'The first uses `opacity`, so its label is dull too. The second uses a muted colour pair and keeps the text at full contrast. The third adds `cursor: not-allowed`, which is the signal that actually tells a user the control is off — colour alone never communicates that on its own.',
            html: `<div class="row"><button class="btn" type="button" disabled>opacity</button><button class="btn muted" type="button" disabled>muted</button><button class="btn muted cursor" type="button" disabled>with cursor</button></div>`,
            css: `.row{display:flex;gap:.6rem;font:13px system-ui,sans-serif}
.btn{font:inherit;padding:.5rem .9rem;border:1px solid #0f766e;border-radius:8px;background:#29e2bd;color:#04211c}
.btn:disabled{opacity:.45}
.muted:disabled{opacity:1;background:#e2e8f0;border-color:#cbd5e1;color:#475569}
.cursor:disabled{cursor:not-allowed}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l66-x1',
            exercise: {
              id: 'ex-l66',
              instructions: 'Make the background of `.box` 60% transparent so the page shows through, but leave the text at full strength. Do **not** use the `opacity` property.',
              languages: ['css'],
              starterCode: {
                html: '<div class="box">Only the background fades.</div>',
                css: '.box {\n  padding: 1rem;\n  border-radius: 10px;\n  background: #111827;\n  color: #ffffff;\n  font: 14px system-ui, sans-serif;\n}\n',
              },
              tests: [
                { id: 'ex-l66-t1', label: 'The background is 60% transparent', body: 'return getComputedStyle(document.querySelector(".box")).backgroundColor === "rgba(17, 24, 39, 0.6)"' },
                { id: 'ex-l66-t2', label: 'The element itself was not faded', body: 'return getComputedStyle(document.querySelector(".box")).opacity === "1"' },
                { id: 'ex-l66-t3', label: 'The text is still fully white', body: 'return getComputedStyle(document.querySelector(".box")).color === "rgb(255, 255, 255)"' },
              ],
              hints: [
                '`opacity` is the property the instructions rule out. You want to change the background *colour* instead.',
                'Convert `#111827` to its channels — 17, 24, 39 — and add an alpha of 0.6.',
                'Try `background: rgba(17, 24, 39, 0.6);`',
              ],
              solution: {
                html: '<div class="box">Only the background fades.</div>',
                css: '.box {\n  padding: 1rem;\n  border-radius: 10px;\n  background: rgba(17, 24, 39, 0.6);\n  color: #ffffff;\n  font: 14px system-ui, sans-serif;\n}\n',
              },
              testNotes: 'The tests read `backgroundColor`, `opacity` and `color`. `#111827` is `rgb(17, 24, 39)`, so at a 0.6 alpha it computes to `rgba(17, 24, 39, 0.6)`.',
            },
          },
        ],
      },
    ],
  },
]
