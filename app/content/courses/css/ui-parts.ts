import type { Section } from '~/types/content'

export const cssUiPartSections: Section[] = [
  {
    id: 'css-s61',
    title: 'CSS Buttons',
    description: 'Style real buttons and link-buttons: states, sizing, width, and the focus ring you must not delete.',
    lessons: [
      {
        id: 'css-l100',
        title: 'Buttons',
        description: 'Give buttons hover, active and focus states, size them properly, and keep them usable by keyboard.',
        duration: 7,
        xp: 45,
        objectives: [
          'Style a button element with padding, radius, colours and a cursor',
          'Add :hover, :active and :focus-visible states with a transition',
          'Explain why a styled link needs display: inline-block and explicit padding',
          'Make a button full width or auto width with the right property',
        ],
        content: [
          { type: 'text', id: 'c-l100-b1', body: 'A button is the most-clicked element on most pages, and the browser gives you almost nothing to work with: a grey slab with a hairline border. Styling one is a padding job, a colour job and a states job — and the states are the part that makes it feel real.' },
          {
            type: 'demo',
            id: 'c-l100-d1',
            title: 'Three buttons, three states',
            body: 'Three buttons in a row. The middle one is frozen in its `:hover` state and the last in its `:active` state, so you can see all three without holding the mouse down. Hover the first one yourself to see it change.',
            html: `<div class="row">
  <button type="button" class="btn">Default</button>
  <button type="button" class="btn frozen-hover">Hover</button>
  <button type="button" class="btn frozen-active">Active</button>
</div>`,
            css: `.row {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.btn {
  border: 1px solid #1f6feb;
  border-radius: 8px;
  padding: 0.6rem 1.1rem;
  background: #ffffff;
  color: #1f6feb;
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, transform 0.05s ease;
}
.btn:hover {
  background: #1f6feb;
  color: #ffffff;
}
.btn:active {
  transform: translateY(1px);
}
.btn:focus-visible {
  outline: 3px solid #29e2bd;
  outline-offset: 2px;
}
.frozen-hover,
.frozen-active {
  background: #1f6feb;
  color: #ffffff;
}
.frozen-active {
  transform: translateY(1px);
}`,
            height: 180,
          },
          { type: 'text', id: 'c-l100-b2', body: 'Three things do all the work: `transition` on the base rule so the change is gradual, separate `:hover` and `:active` rules so you can tell them apart, and `:focus-visible` for keyboard focus. The two frozen classes exist only to paint those states in a static page.' },
          { type: 'heading', id: 'c-l100-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l100-c1',
            language: 'css',
            code: `.btn {
  cursor: pointer;
  padding: 0.6rem 1.1rem;
  border: 1px solid #1f6feb;
  border-radius: 8px;
  background: #ffffff;
  color: #1f6feb;
  font: inherit;
  transition: background 0.15s ease;
}
.btn:hover {
  background: #1f6feb;
  color: #ffffff;
}
.btn:focus-visible {
  outline: 3px solid #29e2bd;
  outline-offset: 2px;
}`,
          },
          {
            type: 'list',
            id: 'c-l100-l1',
            style: 'bullet',
            items: [
              '**`cursor: pointer`** tells the reader the thing is clickable. A native `<button>` gets it free; a styled `<a>` does not.',
              '**`font: inherit`** stops buttons rendering in the tiny default system font while the rest of the page uses your stack.',
              '**`transition`** takes a property, a duration and an easing. Animate `background`, `color`, `border-color` or `transform` — never `width`.',
              '**`:hover`** is pointer-only, and on touch screens it fires on tap and then sticks. That is why `:focus-visible` is not optional.',
              '**`:active`** is the pressed state. A 1px `translateY` reads as a physical push for almost no cost.',
              '**Full width** is `display: block; width: 100%;` since a button is `inline-block`. **Auto width** is the default once you stop setting `width`.',
            ],
          },
          { type: 'warning', id: 'c-l100-w1', title: 'Never delete the focus ring without replacing it', body: 'The default focus outline is ugly and it is also the only thing telling a keyboard user where they are. If you set `outline: none`, put something equally visible in its place — `:focus-visible { outline: 3px solid #29e2bd; }` is the standard replacement. On its own, `outline: none` makes your button unusable without a mouse.' },
          { type: 'tip', id: 'c-l100-t1', title: 'Styling an <a> as a button', body: 'A link is not a button, but sometimes the destination lives on another page and only an `<a>` can go there. The gap is layout: an inline element ignores vertical padding, so a styled link needs `display: inline-block` before its padding means anything.' },
          {
            type: 'code',
            id: 'c-l100-c2',
            language: 'css',
            code: `a.btn {
  display: inline-block;
  padding: 0.6rem 1.1rem;
  border: 1px solid #1f6feb;
  border-radius: 8px;
  text-decoration: none;
}
a.btn:hover {
  background: #1f6feb;
  color: #ffffff;
}`,
          },
          {
            type: 'exercise',
            id: 'c-l100-x1',
            exercise: {
              id: 'ex-l100',
              instructions: 'Style the button below: rounded corners, a pointer cursor, and a transition so its colours animate instead of snapping.',
              languages: ['css'],
              starterCode: { html: '<button type="button" class="btn">Save</button>', css: '.btn {\n  \n}\n' },
              tests: [
                { id: 'ex-l100-t1', label: 'The button has rounded corners', body: 'return getComputedStyle(document.querySelector("button")).borderRadius !== "0px"' },
                { id: 'ex-l100-t2', label: 'The cursor is a pointer', body: 'return getComputedStyle(document.querySelector("button")).cursor === "pointer"' },
                { id: 'ex-l100-t3', label: 'Something is set to transition', body: 'return getComputedStyle(document.querySelector("button")).transitionDuration !== "0s"' },
              ],
              hints: [
                'Three properties on `.btn`: `border-radius`, `cursor` and `transition`.',
                '`cursor: pointer` is what makes the mouse change shape over the button.',
                'Try `border-radius: 8px; cursor: pointer; transition: background 0.15s ease;`',
              ],
              solution: { html: '<button type="button" class="btn">Save</button>', css: '.btn {\n  border-radius: 8px;\n  cursor: pointer;\n  padding: 0.6rem 1.1rem;\n  transition: background 0.15s ease, color 0.15s ease;\n}\n' },
              testNotes: 'The tests read the computed style of the first `button` in the preview.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s61',
      title: 'CSS Buttons quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s61-q1', type: 'multiple-choice', prompt: 'Why does a styled link need `display: inline-block`?', options: ['To give it a wider click area', 'Because an inline box ignores vertical padding, so padding would not apply', 'To make it accept `cursor: pointer`', 'To remove the underline automatically'], answer: 1, explanation: 'Vertical padding on a non-replaced inline element has no effect on layout. `inline-block` makes the box real so padding moves it.' },
        { id: 'quiz-css-s61-q2', type: 'true-false', prompt: 'Setting `outline: none` on `:focus` is safe as long as you style `:hover`.', answer: false, explanation: 'Hover styling is invisible to keyboard users. Remove the outline only if you add a visible `:focus-visible` replacement.' },
        { id: 'quiz-css-s61-q3', type: 'code-output', prompt: 'What does this rule do?', code: '.btn { cursor: pointer; transition: background 0.15s ease; }', options: ['Makes the button unclickable for 0.15s', 'Shows a pointer cursor and animates background colour changes over 150ms', 'Animates the button size over 150ms', 'Adds a 0.15s delay before the button responds'], answer: 1, explanation: '`transition` only names the property, the duration and the easing. It does not animate size or add input delay.' },
        { id: 'quiz-css-s61-q4', type: 'blank', prompt: 'Which pseudo-class styles the moment a button is held down?', answers: [':active'], explanation: '`:active` is the pressed state, usually paired with a small `transform` so the button appears to move.' },
        { id: 'quiz-css-s61-q5', type: 'multiple-choice', prompt: 'How do you make a button span the full width of its container?', options: ['Set `width: auto` on it', 'Add `display: block; width: 100%;`', 'Add `flex: 1` to the parent', 'Add `margin: 0 auto` to it'], answer: 1, explanation: 'A `<button>` is `inline-block` by default, so `width: 100%` needs `display: block` to fill the line.' },
      ],
    },
  },
  {
    id: 'css-s62',
    title: 'CSS Pagination',
    description: 'Build a page-number row that looks right, shows where you are, and announces it to a screen reader.',
    lessons: [
      {
        id: 'css-l101',
        title: 'Pagination',
        description: 'Style a list of page numbers with active and hover states, rounded ends, and correct accessibility markup.',
        duration: 6,
        xp: 40,
        objectives: [
          'Build a pagination bar as an ordered list of links',
          'Style the current page with an .active class and hover states',
          'Round only the first and last item with :first-child and :last-child',
          'Mark the current page with aria-current and label the surrounding <nav>',
        ],
        content: [
          { type: 'text', id: 'c-l101-b1', body: 'Pagination is a row of numbered links. There is no CSS property for it — you build it from a list, mark the current page with a class, and round the two ends. The one thing that is not optional is telling assistive technology which page you are on.' },
          {
            type: 'demo',
            id: 'c-l101-d1',
            title: 'A pagination bar',
            body: 'A real pagination bar. Page 3 is the current page, marked with `aria-current="page"` and filled in. Page 4 lightens when you hover it.',
            html: `<nav class="pager" aria-label="Pagination">
  <ul class="pager-list">
    <li><a href="#" class="page">Prev</a></li>
    <li><a href="#" class="page">1</a></li>
    <li><a href="#" class="page">2</a></li>
    <li><a href="#" class="page active" aria-current="page">3</a></li>
    <li><a href="#" class="page">4</a></li>
    <li><a href="#" class="page">Next</a></li>
  </ul>
</nav>`,
            css: `.pager-list {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.page {
  display: inline-block;
  min-width: 2.25rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid #d5dae0;
  border-radius: 6px;
  background: #ffffff;
  color: #1f2933;
  text-align: center;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.page:hover {
  background: #eef4ff;
  border-color: #1f6feb;
}
.page.active {
  background: #1f6feb;
  border-color: #1f6feb;
  color: #ffffff;
  cursor: default;
}
.pager-list li:first-child .page,
.pager-list li:last-child .page {
  border-radius: 999px;
}`,
            height: 170,
          },
          { type: 'text', id: 'c-l101-b2', body: 'The list has no bullets because `list-style: none` removes them, and the gaps come from `display: flex` on the `<ul>` rather than from margins on each `<li>`. Page 3 is the only filled item, and the only one carrying `aria-current="page"`.' },
          { type: 'heading', id: 'c-l101-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l101-c1',
            language: 'css',
            code: `.pager-list {
  display: flex;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
}
.page {
  display: inline-block;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  text-decoration: none;
}
.page.active {
  background: #1f6feb;
  color: #ffffff;
}
.pager-list li:first-child .page,
.pager-list li:last-child .page {
  border-radius: 999px;
}`,
          },
          {
            type: 'list',
            id: 'c-l101-l1',
            style: 'bullet',
            items: [
              '**Rounded ends, not rounded everything.** A pill on each item reads as a row of separate buttons. `:first-child` and `:last-child` give you the two ends only.',
              '**`.active` is a class, not a pseudo-class.** There is no CSS `:active` for "current page" — that name is taken by the pressed state.',
              "**`display: inline-block`** makes a link's padding count. Links are inline by default, so vertical padding collapses.",
              '**`min-width`** keeps one- and two-digit numbers the same width so the bar does not jitter between pages.',
              '**`cursor: default` on the active page** is a small honesty touch: it is not a link anywhere, so it should not claim to be one.',
            ],
          },
          { type: 'tip', id: 'c-l101-t1', title: 'Round the ends with :first-child, not the first link', body: '`.page:first-child` fails as soon as the first item is not a page link, which is common — many bars start with a "Prev" item or a disabled "1". Selecting `li:first-child .page` keeps the rule working whatever markup sits at the ends.' },
          { type: 'warning', id: 'c-l101-w1', title: 'Colour alone is not enough', body: 'A filled blue square tells a sighted user which page they are on and a screen-reader user nothing at all. Without `aria-current="page"` on the current link, pagination is a list of identical numbers. Add that attribute, and give the `<nav>` an `aria-label` such as "Pagination" — without it a screen reader announces an unlabelled navigation landmark with no clue what it navigates.' },
          {
            type: 'exercise',
            id: 'c-l101-x1',
            exercise: {
              id: 'ex-l101',
              instructions: 'The current page is marked with `aria-current="page"`. Write a rule that gives the marked page a filled background and white text.',
              languages: ['css'],
              starterCode: {
                html: '<nav class="pager" aria-label="Pagination">\n  <ul class="pager-list">\n    <li><a href="#" class="page">1</a></li>\n    <li><a href="#" class="page" aria-current="page">2</a></li>\n  </ul>\n</nav>',
                css: '.page {\n  display: inline-block;\n  padding: 0.4rem 0.6rem;\n}\n',
              },
              tests: [
                { id: 'ex-l101-t1', label: 'Exactly one page is marked as current', body: 'return document.querySelectorAll("[aria-current=page]").length === 1' },
                { id: 'ex-l101-t2', label: 'The current page has a filled background', body: 'const bg = getComputedStyle(document.querySelector("[aria-current=page]")).backgroundColor; return bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent"' },
                { id: 'ex-l101-t3', label: 'The current page text is white', body: 'return getComputedStyle(document.querySelector("[aria-current=page]")).color === "rgb(255, 255, 255)"' },
              ],
              hints: [
                'Style through the attribute selector, not a class: `[aria-current="page"] { }`.',
                'A filled background means `background-color` must be a real colour, not `transparent`.',
                'Try `[aria-current="page"] { background: #1f6feb; color: #ffffff; }`',
              ],
              solution: {
                html: '<nav class="pager" aria-label="Pagination">\n  <ul class="pager-list">\n    <li><a href="#" class="page">1</a></li>\n    <li><a href="#" class="page" aria-current="page">2</a></li>\n  </ul>\n</nav>',
                css: '.page {\n  display: inline-block;\n  padding: 0.4rem 0.6rem;\n}\n\n[aria-current="page"] {\n  background: #1f6feb;\n  color: #ffffff;\n}\n',
              },
              testNotes: "The first test asserts the markup is already correct — exactly one current page — and the others read that element's computed style.",
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s62',
      title: 'CSS Pagination quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s62-q1', type: 'multiple-choice', prompt: 'How do you round only the first and last items of a pagination bar?', options: ['Apply a large `border-radius` to every `.page`', 'Use `li:first-child .page` and `li:last-child .page`', 'Use `:first-of-type` on the `<ul>`', 'Set `overflow: hidden` on the list'], answer: 1, explanation: 'Targeting the first and last list items and then their links keeps the rounding on the outer ends only.' },
        { id: 'quiz-css-s62-q2', type: 'true-false', prompt: '`.active` is a CSS pseudo-class built into the language for marking the current page.', answer: false, explanation: '`.active` is a class name you invent in your markup. The only CSS pseudo-class of that name is `:active`, which means "being pressed".' },
        { id: 'quiz-css-s62-q3', type: 'multiple-choice', prompt: 'Why does the current page link need `aria-current="page"`?', options: ['So CSS can style it with an attribute selector', 'So the link is excluded from the tab order', 'So assistive technology can announce which page you are on', 'So the browser scrolls to the top'], answer: 2, explanation: 'Styling it is a side effect of the selector, not the point. The attribute exists so a screen reader announces "current page" out loud.' },
        { id: 'quiz-css-s62-q4', type: 'code-output', prompt: 'What is wrong with this markup?', code: '<ul class="pager"><li><a href="#">1</a><li><a href="#" class="active">2</a></ul>', options: ['Nothing, it is valid', 'The `<li>` tags are never closed, so the list is malformed', 'A `<ul>` cannot contain `<li>` elements', 'The `.active` class has no matching CSS rule'], answer: 1, explanation: '`<li>` is not a void element — each one needs a closing tag. The bars in this lesson close every `<li>`.' },
        { id: 'quiz-css-s62-q5', type: 'blank', prompt: 'Which attribute labels the navigation landmark so a screen reader knows what the bar controls?', answers: ['aria-label'], explanation: '`<nav aria-label="Pagination">` names the landmark. Without it the reader just announces "navigation" with no context.' },
      ],
    },
  },
  {
    id: 'css-s63',
    title: 'CSS Multiple Columns',
    description: 'Flow text into magazine-style columns, control the gap and rule, and stop cards being split in half.',
    lessons: [
      {
        id: 'css-l102',
        title: 'Multiple Columns',
        description: 'Split a block of text into columns with column-count, column-gap, column-rule and break-inside.',
        duration: 7,
        xp: 45,
        objectives: [
          'Split a block into a fixed number of columns with column-count',
          'Let the browser choose a width with column-width',
          'Control the space and divider with column-gap and column-rule',
          'Stop a card breaking across columns with break-inside: avoid',
        ],
        content: [
          { type: 'text', id: 'c-l102-b1', body: 'Multi-column layout lets the browser flow one block of content into several side-by-side columns, like a newspaper. You do not write the columns yourself — you say how many you want or how wide each should be, and the browser fills them evenly.' },
          {
            type: 'demo',
            id: 'c-l102-d1',
            title: 'An article in three columns',
            body: 'A long article flowing into three columns. The heading spans all three, and each card at the bottom sits whole inside a single column instead of being sliced in half.',
            html: `<article class="article">
  <h3 class="article-title">Field notes on column layout</h3>
  <p>Multi-column layout is one of the few places where the browser does the layout work for you. You state an intent — three columns, or columns at least 16rem wide — and the engine balances the text between them.</p>
  <p>The result is content that reflows on its own. Resize the window and the column count changes with no media query, because every column stays above the width you asked for.</p>
  <div class="note"><strong>Gap</strong><p>Space between columns comes from <code>column-gap</code>, not from margins.</p></div>
  <div class="note"><strong>Rule</strong><p>A one-pixel divider is <code>column-rule</code>, taking width, style and colour.</p></div>
  <div class="note"><strong>Split</strong><p><code>break-inside: avoid</code> keeps a whole card inside one column.</p></div>
</article>`,
            css: `.article {
  column-count: 3;
  column-gap: 1.5rem;
  column-rule: 1px solid #d5dae0;
}
.article-title {
  column-span: all;
  margin: 0 0 0.75rem;
  font-size: 17px;
}
.article p {
  margin: 0 0 0.75rem;
  font-size: 14px;
}
.note {
  break-inside: avoid;
  border: 1px solid #d5dae0;
  border-radius: 8px;
  padding: 0.6rem;
  margin-bottom: 0.75rem;
  font-size: 13px;
}`,
            height: 320,
          },
          { type: 'text', id: 'c-l102-b2', body: 'The heading is not in the columns at all — `column-span: all` lifts it across the full width above them. Everything after it is divided into three columns with a hairline rule between them, and each card declares `break-inside: avoid` so the engine moves a whole card on rather than cutting it.' },
          { type: 'heading', id: 'c-l102-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l102-c1',
            language: 'css',
            code: `.article {
  column-count: 3;
  column-gap: 1.5rem;
  column-rule: 1px solid #d5dae0;
}
.article-title {
  column-span: all;
}
.note {
  break-inside: avoid;
}`,
          },
          {
            type: 'list',
            id: 'c-l102-l1',
            style: 'bullet',
            items: [
              '**`column-count: 3`** is a hard number. Use it when the design fixes the count.',
              '**`column-width: 16rem`** is a hint, not a command: "make columns *at least* this wide, use as many as fit". A narrow window then produces one column with no media query.',
              '**You can set both.** `column-count` acts as a maximum, so `column-width` only ever reduces the count.',
              '**`column-gap`** replaces the `normal` gap, which is `1em` and rarely what a design specifies.',
              '**`column-rule`** takes width, style and colour like `border`. It is drawn in the middle of the gap, so the divider looks off-centre in an odd gap.',
              '**`column-span: all`** breaks a descendant out across every column. Use it for a few headings per article, not per section.',
              '**`break-inside: avoid`** stops a card, table or code block being split across the boundary between two columns.',
            ],
          },
          { type: 'warning', id: 'c-l102-w1', title: 'Three columns of body text is a lot of reading', body: 'Column widths below about 14rem make the eye lose its place on the return sweep. Newspaper layouts use columns for short passages and lists, not for a 2,000-word article. Also remember the only way to reach column two on a phone is to scroll all the way down and back up, which is why `column-width` is usually safer than a fixed `column-count`.' },
          { type: 'tip', id: 'c-l102-t1', title: 'Images need break-inside too', body: 'A tall image in a column is split across two columns by default and looks broken. `break-inside: avoid` on the image, or on a wrapper around it, moves it whole into the next column. The same applies to `figure` and `pre`.' },
          {
            type: 'example',
            id: 'c-l102-e1',
            title: 'Responsive columns with column-width',
            body: 'No media queries at all. `column-width: 14rem` means "as many columns of at least 14rem as will fit", so the same markup is three columns on a desktop and one on a phone.',
            html: `<div class="flow">
  <h3>Column width, not column count</h3>
  <p>This block declares no column count. It asks for columns at least fourteen rem wide and lets the browser decide how many fit right now.</p>
  <p>Narrow the window and the second column disappears on its own, because there is no longer room for a column that meets the minimum width.</p>
</div>`,
            css: `.flow {
  column-width: 14rem;
  column-gap: 1.25rem;
  column-rule: 1px dotted #c3cbd4;
}
.flow h3 {
  column-span: all;
  margin: 0 0 0.6rem;
  font-size: 16px;
}
.flow p {
  margin: 0 0 0.6rem;
  font-size: 14px;
  break-inside: avoid;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l102-x1',
            exercise: {
              id: 'ex-l102',
              instructions: 'The paragraph block below should flow into two columns with a visible 1px divider between them.',
              languages: ['css'],
              starterCode: {
                html: '<div class="flow">\n  <p>Column layout lets the browser flow one block of text into several side-by-side columns, like a printed page.</p>\n  <p>You state an intent and the engine balances the text between the columns for you.</p>\n</div>',
                css: '.flow {\n  \n}\n',
              },
              tests: [
                { id: 'ex-l102-t1', label: 'The block is split into two columns', body: 'return getComputedStyle(document.querySelector(".flow")).columnCount === "2"' },
                { id: 'ex-l102-t2', label: 'There is a rule drawn between the columns', body: 'const s = getComputedStyle(document.querySelector(".flow")).columnRuleStyle; return s !== "none" && s !== ""' },
                { id: 'ex-l102-t3', label: 'The columns have a gap of at least 1rem', body: 'return parseFloat(getComputedStyle(document.querySelector(".flow")).columnGap) >= 16' },
              ],
              hints: [
                'Three properties: `column-count`, `column-gap` and `column-rule`.',
                '`column-rule` is a shorthand in width, style, colour order — the same order as `border`.',
                'Try `column-count: 2; column-gap: 1.5rem; column-rule: 1px solid #d5dae0;`',
              ],
              solution: {
                html: '<div class="flow">\n  <p>Column layout lets the browser flow one block of text into several side-by-side columns, like a printed page.</p>\n  <p>You state an intent and the engine balances the text between the columns for you.</p>\n</div>',
                css: '.flow {\n  column-count: 2;\n  column-gap: 1.5rem;\n  column-rule: 1px solid #d5dae0;\n}\n',
              },
              testNotes: 'The tests read the computed `columnCount`, `columnGap` and `columnRuleStyle` of `.flow`.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s63',
      title: 'CSS Multiple Columns quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s63-q1', type: 'multiple-choice', prompt: 'What does `column-width: 16rem` do?', options: ['Forces exactly one column 16rem wide', 'Asks for as many columns as fit, each at least 16rem wide', 'Sets each column to exactly 16rem regardless of space', 'Sets the gap between columns to 16rem'], answer: 1, explanation: 'It is a minimum, not a fixed value. The browser adds columns while each one can stay at least 16rem wide.' },
        { id: 'quiz-css-s63-q2', type: 'true-false', prompt: 'Setting both `column-count` and `column-width` makes the count win outright.', answer: false, explanation: '`column-count` acts as a maximum. `column-width` can still reduce the count below it, which is why the two combine safely.' },
        { id: 'quiz-css-s63-q3', type: 'code-output', prompt: 'What does this rule stop from happening?', code: '.card { break-inside: avoid; }', options: ['The card from being split across two columns', 'The card from ever being displayed', 'The card from having a background colour', 'The card from breaking out across all columns'], answer: 0, explanation: '`break-inside: avoid` tells the layout engine to move the whole box to the next column rather than divide it.' },
        { id: 'quiz-css-s63-q4', type: 'multiple-choice', prompt: 'How do you make a heading run across the full width above the columns?', options: ['Set `column-span: all` on the heading', 'Set `column-count: 1` on the heading', 'Move the heading outside the multicol container', 'Set `position: absolute` on the heading'], answer: 0, explanation: '`column-span: all` lifts a descendant out of the column flow so it spans every column.' },
        { id: 'quiz-css-s63-q5', type: 'blank', prompt: 'Which property draws the hairline divider between columns? It takes width, style and colour.', answers: ['column-rule'], explanation: '`column-rule` is the shorthand; `column-rule-width`, `-style` and `-color` are the long hands.' },
      ],
    },
  },
  {
    id: 'css-s64',
    title: 'CSS User Interface',
    description: 'The user-interface properties: cursor, resize, outline, caret-color, user-select, accent-color and appearance.',
    lessons: [
      {
        id: 'css-l103',
        title: 'User Interface',
        description: 'Take control of native controls with cursor, resize, outline, caret-color, user-select, accent-color and appearance.',
        duration: 8,
        xp: 50,
        objectives: [
          'Change the mouse cursor with cursor and pick the right shape for the job',
          'Allow or forbid resizing with resize',
          'Style form controls with accent-color and keep them readable',
          'Explain what appearance: none costs you in accessibility',
        ],
        content: [
          { type: 'text', id: 'c-l103-b1', body: 'Browsers ship with user-interface properties for the parts of a page people actually touch: the mouse cursor, resize handles, focus rings, the text caret, whether text can be selected, and the colour of checkboxes and radios. Most are one-liners, and they are the difference between a form that feels native and one that feels like a screenshot.' },
          {
            type: 'demo',
            id: 'c-l103-d1',
            title: 'Custom-styled form controls',
            body: 'A checkbox and a radio pair in your accent colour, a resizable text area, an input with a coloured caret and a visible focus ring, and one paragraph that cannot be selected.',
            html: `<div class="stack">
  <label class="check">
    <input type="checkbox" checked />
    <span>Email me about this release</span>
  </label>
  <div class="row">
    <label class="check"><input type="radio" name="plan" checked /><span>Monthly</span></label>
    <label class="check"><input type="radio" name="plan" /><span>Yearly</span></label>
  </div>
  <input class="field" type="text" value="Focus me and type" />
  <textarea class="field resize" rows="2">Drag the bottom-right corner</textarea>
  <p class="locked">This paragraph cannot be selected.</p>
</div>`,
            css: `.stack {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 14px;
}
.row {
  display: flex;
  gap: 1rem;
}
.check {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}
.check input {
  accent-color: #1f6feb;
  width: 1.05rem;
  height: 1.05rem;
}
.field {
  font: inherit;
  padding: 0.45rem 0.6rem;
  border: 1px solid #d5dae0;
  border-radius: 6px;
  caret-color: #1f6feb;
  cursor: text;
}
.field:focus-visible {
  outline: 3px solid #29e2bd;
  outline-offset: 1px;
}
.resize {
  resize: vertical;
}
.locked {
  user-select: none;
  margin: 0;
  color: #52606d;
}`,
            height: 300,
          },
          { type: 'text', id: 'c-l103-b2', body: 'The checkbox and both radios are stock browser controls — the only thing changed is `accent-color`, so they keep every behaviour they had, including keyboard operation and the checked state, and simply pick up your brand colour. The textarea can be dragged taller but not wider. The paragraph refuses selection.' },
          { type: 'heading', id: 'c-l103-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l103-c1',
            language: 'css',
            code: `input[type="checkbox"],
input[type="radio"] {
  accent-color: #1f6feb;
}
textarea {
  resize: vertical;
  caret-color: #1f6feb;
}
.field:focus-visible {
  outline: 3px solid #29e2bd;
}
.locked {
  user-select: none;
}`,
          },
          {
            type: 'list',
            id: 'c-l103-l1',
            style: 'bullet',
            items: [
              '**`cursor`** picks the pointer shape: `pointer` for something clickable, `text` for selectable text, `grab` for draggable things, `not-allowed` for disabled actions. It is a hint, not behaviour — nothing becomes clickable because you changed the cursor.',
              '**`resize`** controls the handle on a `<textarea>`: `vertical` or `horizontal` for one axis, `both` is the default, `none` removes it. Use `vertical` where the width must match a layout column.',
              '**`outline` on focus** is the visible focus ring. `outline-offset` pushes it away from the border so it stays legible on any background.',
              '**`caret-color`** recolours the blinking insertion caret inside an input. It does not affect selected text colour.',
              '**`user-select`** matters: `none` makes text unselectable, fine for a button label, bad for anything containing information the reader may want to copy.',
              '**`accent-color`** recolours checkboxes, radios, range sliders and progress bars in one line while leaving the control fully functional. This is almost always better than rebuilding it.',
              '**`appearance: none`** removes the platform styling so you can draw your own control — and you then own focus, hover, checked and disabled states too.',
            ],
          },
          { type: 'warning', id: 'c-l103-w1', title: 'appearance: none has an accessibility bill', body: 'Stripping `appearance` removes affordances users have relied on for twenty years: the pressed depth, the platform focus ring, the disabled grey, and on a `<select>` the dropdown arrow. Rebuild all of it, including `:focus-visible`, or ship a control nobody can operate. `accent-color` gets you a branded control with none of that cost.' },
          { type: 'tip', id: 'c-l103-t1', title: 'Reach for user-select: none sparingly', body: 'It is right on button labels, navigation chrome and drag handles. It is wrong on prices, addresses, code samples and error messages. If a reader might reasonably want to copy the text, leave it selectable.' },
          {
            type: 'example',
            id: 'c-l103-e1',
            title: 'Cursor shapes that mean something',
            body: 'Each line has the cursor its content suggests. `cursor` changes nothing about behaviour — the text lines are not actually editable, draggable or forbidden.',
            html: `<div class="cursors">
  <p class="c-pointer">pointer — this looks clickable</p>
  <p class="c-text">text — this looks selectable</p>
  <p class="c-grab">grab — this looks draggable</p>
  <p class="c-wait">wait — this looks busy</p>
  <p class="c-not-allowed">not-allowed — this looks unavailable</p>
</div>`,
            css: `.cursors p {
  margin: 0 0 0.5rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid #d5dae0;
  border-radius: 6px;
  font-size: 14px;
}
.c-pointer { cursor: pointer; }
.c-text { cursor: text; }
.c-grab { cursor: grab; }
.c-wait { cursor: wait; }
.c-not-allowed { cursor: not-allowed; }`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l103-x1',
            exercise: {
              id: 'ex-l103',
              instructions: 'Brand the checkbox below with your accent colour and stop the textarea from being resized sideways.',
              languages: ['css'],
              starterCode: { html: '<input type="checkbox" class="box" checked />\n<textarea class="area" rows="2"></textarea>', css: '.box {\n  \n}\n\n.area {\n  \n}\n' },
              tests: [
                { id: 'ex-l103-t1', label: 'The checkbox has an accent colour set', body: 'return getComputedStyle(document.querySelector(".box")).accentColor !== "auto"' },
                { id: 'ex-l103-t2', label: 'The textarea only resizes vertically', body: 'return getComputedStyle(document.querySelector(".area")).resize === "vertical"' },
                { id: 'ex-l103-t3', label: 'The textarea is not resized freely in both directions', body: 'return getComputedStyle(document.querySelector(".area")).resize !== "both"' },
              ],
              hints: [
                'Two one-line rules: `accent-color` on the checkbox, `resize` on the textarea.',
                '`accent-color` is the only way to recolour a checkbox without `appearance: none`.',
                'Try `.box { accent-color: #1f6feb; }` and `.area { resize: vertical; }`',
              ],
              solution: {
                html: '<input type="checkbox" class="box" checked />\n<textarea class="area" rows="2"></textarea>',
                css: '.box {\n  accent-color: #1f6feb;\n}\n\n.area {\n  resize: vertical;\n}\n',
              },
              testNotes: 'The tests read the computed `accentColor` and `resize` of the two controls.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s64',
      title: 'CSS User Interface quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s64-q1', type: 'multiple-choice', prompt: 'Which property recolours a checkbox without rebuilding it?', options: ['`appearance: none`', '`accent-color`', '`caret-color`', '`user-select`'], answer: 1, explanation: '`accent-color` re-tints checkboxes, radios, ranges and progress bars while the platform keeps every behaviour and state.' },
        { id: 'quiz-css-s64-q2', type: 'true-false', prompt: '`cursor: pointer` makes an element actually perform an action when clicked.', answer: false, explanation: '`cursor` is purely a visual hint about what a click might do. The behaviour comes from the element type and the code behind it.' },
        { id: 'quiz-css-s64-q3', type: 'code-output', prompt: 'What does this rule do?', code: 'textarea { resize: vertical; caret-color: #1f6feb; }', options: ['Makes the textarea blue', 'Lets the textarea be dragged taller but not wider, and colours the text caret blue', 'Makes the textarea 1rem tall', 'Prevents the caret from blinking'], answer: 1, explanation: '`resize` limits the drag handle to one axis; `caret-color` sets the colour of the insertion caret inside the field.' },
        { id: 'quiz-css-s64-q4', type: 'multiple-choice', prompt: 'What is the main cost of `appearance: none`?', options: ['The element disappears from the page', 'It stops working in older browsers only', 'You lose platform affordances and must rebuild focus, hover and checked states yourself', 'It changes the element type'], answer: 2, explanation: 'Removing appearance removes the pressed depth, focus ring and disabled styling. Whatever you draw instead has to cover all of it.' },
        { id: 'quiz-css-s64-q5', type: 'blank', prompt: 'Which property stops a visitor from selecting the text of an element?', answers: ['user-select'], explanation: '`user-select: none` makes text unselectable. Use it on button labels and chrome, not on content the reader may need to copy.' },
      ],
    },
  },
]