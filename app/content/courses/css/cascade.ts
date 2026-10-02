import type { Section } from '~/types/content'

export const cssCascadeSections: Section[] = [
  {
    id: 'css-s39',
    title: 'CSS Website Layout',
    description: 'Put the pieces you have learned into one page shell and give every region a name.',
    lessons: [
      {
        id: 'css-l76',
        title: 'Website Layout',
        description: 'Assemble a page shell from a header, sidebar, main and footer using CSS grid named areas.',
        duration: 8,
        objectives: [
          'Build a page shell with `grid-template-areas`',
          'Assign each child to a named region with `grid-area`',
          'Reorder regions on a narrow screen with a media query',
          'Pick track sizes that keep the sidebar and content readable',
        ],
        xp: 50,
        content: [
          { type: 'text', id: 'c-l76-b1',
            body: 'A page layout is the same skeleton almost every time: a header across the top, a sidebar down one side, content in the middle, a footer at the bottom. CSS grid lets you **name** those regions, so you describe the shape once and place elements into it by name.' },
          { type: 'demo', id: 'c-l76-d1', title: 'A page shell with named grid areas',
            body: 'Four regions. The header spans the full width, the sidebar sits beside the main content, and the footer spans the bottom.',
            html: `<div class="page">
  <header class="page-head">Acme Docs</header>
  <nav class="page-side">Guide<br />API<br />Support</nav>
  <main class="page-main"><h3>Getting started</h3>
    <p>Every region here is named in <code>grid-template-areas</code> and placed by name with <code>grid-area</code>.</p>
  </main>
  <footer class="page-foot">&copy; 2026 Acme</footer>
</div>`,
            css: `.page {
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
  grid-gap: 8px;
  font: 13px/1.5 system-ui, sans-serif;
}
.page-head, .page-foot, .page-side, .page-main {
  border: 1px solid #d5dae0;
  border-radius: 8px;
  padding: 10px;
}
.page-head { grid-area: head; background: #29e2bd; border-color: #1fbd9d; font-weight: 600; }
.page-side { grid-area: side; background: #f5f7f9; }
.page-main { grid-area: main; }
.page-main h3 { margin: 0 0 4px; font-size: 14px; }
.page-main p { margin: 0; color: #55606b; }
.page-foot { grid-area: foot; text-align: center; color: #55606b; }`,
            height: 300 },
          { type: 'text', id: 'c-l76-b2',
            body: 'The layout is not described by any selector. The `.page` grid has four named regions, and each child says which region it belongs in. Nothing depends on source order, so rearranging a region is a one-word change.' },
          { type: 'heading', id: 'c-l76-h1', level: 3, body: 'The three properties that do it' },
          { type: 'code', id: 'c-l76-c1', language: 'css', title: 'Named areas in full',
            code: `.page {
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
}
.page-head { grid-area: head; }
.page-side { grid-area: side; }
.page-main { grid-area: main; }
.page-foot { grid-area: foot; }` },
          { type: 'list', id: 'c-l76-l1', style: 'bullet', items: [
            '`grid-template-areas` is a grid of **strings**, one string per row. Each string holds **space-separated region names**.',
            'A `.` means an empty cell. `"head head"` means two cells in one row, both belonging to `head`.',
            'Every named region must form a **rectangle**. An L-shape or plus shape invalidates the whole declaration.',
            '`grid-area: head` is a shorthand for the four placement longhands, looked up by region name.',
            'The template goes on the **parent**; the `grid-area` values go on the children.',
          ] },
          { type: 'example', id: 'c-l76-e1', title: 'The same shell, stacked on a phone',
            body: 'One media query changes the shape of the template. No element moves in the HTML — the named regions are simply rearranged and the sidebar becomes a full-width bar.',
            html: `<div class="shell">
  <header class="shell-head">Acme Docs</header>
  <nav class="shell-side">Guide</nav>
  <main class="shell-main">Content</main>
  <footer class="shell-foot">Footer</footer>
</div>`,
            css: `.shell {
  display: grid;
  grid-template-columns: 110px 1fr;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
  grid-gap: 6px;
  font: 12px/1.4 system-ui, sans-serif;
}
.shell-head, .shell-side, .shell-main, .shell-foot {
  border: 1px solid #d5dae0;
  border-radius: 6px;
  padding: 8px;
}
.shell-head { grid-area: head; background: #29e2bd; }
.shell-side { grid-area: side; background: #f5f7f9; }
.shell-main { grid-area: main; }
.shell-foot { grid-area: foot; }
@media (max-width: 520px) {
  .shell {
    grid-template-columns: 1fr;
    grid-template-areas:
      "head"
      "side"
      "main"
      "foot";
  }
}`,
            showPreview: true },
          { type: 'tip', id: 'c-l76-t1', title: 'Narrow the preview, not just the breakpoint',
            body: 'A shell that looks right at one width proves very little. Drag the preview pane narrower and watch which track collapses first — that is usually the one that needed a smaller minimum.' },
          { type: 'exercise', id: 'c-l76-x1', exercise: {
            id: 'ex-l76',
            instructions: 'Lay out the shell below with CSS grid: a full-width header on top, the nav left of the main content, and a full-width footer underneath. Use named grid areas.',
            languages: ['css'],
            starterCode: {
              html: '<div class="shell">\n  <header class="head">Header</header>\n  <nav class="side">Nav</nav>\n  <main class="main">Main</main>\n  <footer class="foot">Footer</footer>\n</div>\n',
              css: '.shell {\n  display: grid;\n  grid-template-areas:\n    "head head"\n    "side main"\n    "foot foot";\n}\n',
            },
            tests: [
              { id: 'ex-l76-t1', label: 'The shell is a grid',
                body: 'return getComputedStyle(document.querySelector(".shell")).display === "grid"' },
              { id: 'ex-l76-t2', label: 'The header is placed in the head area',
                body: 'return getComputedStyle(document.querySelector(".head")).gridArea.startsWith("head")' },
              { id: 'ex-l76-t3', label: 'The nav is placed in the side area',
                body: 'return getComputedStyle(document.querySelector(".side")).gridArea.startsWith("side")' },
            ],
            hints: [
              'Set `display: grid` on `.shell`, then list the rows of `grid-template-areas` as quoted strings separated by newlines.',
              'Each child then needs `grid-area: head`, `grid-area: side`, `grid-area: main` and `grid-area: foot`.',
              'Try `grid-template-areas: "head head" "side main" "foot foot";` plus a `gap`.',
            ],
            solution: {
              html: '<div class="shell">\n  <header class="head">Header</header>\n  <nav class="side">Nav</nav>\n  <main class="main">Main</main>\n  <footer class="foot">Footer</footer>\n</div>\n',
              css: '.shell {\n  display: grid;\n  grid-template-columns: 120px 1fr;\n  gap: 6px;\n  grid-template-areas:\n    "head head"\n    "side main"\n    "foot foot";\n}\n.head { grid-area: head; }\n.side { grid-area: side; }\n.main { grid-area: main; }\n.foot { grid-area: foot; }\n',
            },
            testNotes: 'The tests read the computed `display` of `.shell` and the computed `grid-area` of the header and nav.',
          } },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s39',
      title: 'CSS Website Layout quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s39-q1', type: 'multiple-choice', prompt: 'Where must `grid-template-areas` be declared?',
          options: ['On each child element', 'On the grid container', 'On the body element only', 'Anywhere, the browser sorts it out'],
          answer: 1, explanation: 'The template defines the container grid. The children then place themselves into it with `grid-area`.' },
        { id: 'quiz-css-s39-q2', type: 'code-output', prompt: 'What shape does this template produce?',
          code: '.p {\n  display: grid;\n  grid-template-areas:\n    "head head"\n    "side main"\n    "foot foot";\n}',
          options: ['Three stacked full-width rows', 'Header across the top, side and main side by side, footer across the bottom', 'A two-column grid with no header', 'Nothing — the areas are not rectangular'],
          answer: 1, explanation: 'Each quoted string is a row. `head` occupies both cells of row one, `side` and `main` split row two, `foot` spans row three.' },
        { id: 'quiz-css-s39-q3', type: 'true-false', prompt: 'A named grid area is allowed to form an L-shape.',
          answer: false, explanation: 'Every area must be a rectangle. An L-shape invalidates the whole `grid-template-areas` declaration and the grid falls back to no areas at all.' },
        { id: 'quiz-css-s39-q4', type: 'identify-error', prompt: 'Why does this shell not lay out as intended?',
          code: '.p {\n  display: grid;\n  grid-template-areas: "head head" "side main";\n}\n.h { grid-area: head; }\n.m { grid-area: main; }',
          options: ['`grid-area` values must be quoted', 'The named areas are never assigned, so the children are auto-placed', 'A grid needs at least three rows', '`display: grid` cannot be combined with `grid-area`'],
          answer: 1, explanation: 'The template names regions but nothing maps them. Without matching `grid-area` values on the children, the browser auto-places them in source order.' },
        { id: 'quiz-css-s39-q5', type: 'multiple-choice', prompt: 'A shell is fine on a desktop and cramped on a phone. What is the cleanest fix?',
          options: ['Add more media queries targeting individual children', 'Rewrite the layout with floats', 'Change the named `grid-template-areas` shape in a media query', 'Add `overflow: hidden` to the container'],
          answer: 2, explanation: 'Because the regions are named, one declaration controls the whole shape. The media query changes the template and every child follows.' },
      ],
    },
  },
  {
    id: 'css-s40',
    title: 'CSS Units',
    description: 'How lengths are measured, and why the unit you pick changes how your layout survives.',
    lessons: [
      {
        id: 'css-l77',
        title: 'Units',
        description: 'Absolute and relative length units, why `px` is not truly absolute, and which to reach for by default.',
        duration: 7,
        objectives: [
          'Name the absolute units and convert between `in`, `cm`, `mm`, `pt` and `pc`',
          'Explain why `em` and `rem` behave differently and when each is correct',
          'Use `%`, `vw`, `vh`, `vmin`, `vmax`, `ch` and `ex` for the cases they suit',
          'Say why `px` is not a physical unit and what that means for zoom',
        ],
        xp: 45,
        content: [
          { type: 'text', id: 'c-l77-b1',
            body: 'A length in CSS is a number followed by a unit, and the unit decides what the number is measured against. Absolute units are fixed slices of physical distance. Relative units are computed from something else on the page — a font size, a parent, the viewport — so they move when that thing moves.' },
          { type: 'demo', id: 'c-l77-d1', title: 'The same box in four units',
            body: 'Four boxes, all asked to be `120` units wide. `px` is the same number every time. `em` and `%` scale with their context. `rem` follows the root font size.',
            html: `<div class="parent">
  <div class="unit-box box-px">px</div>
  <div class="unit-box box-em">em</div>
  <div class="unit-box box-rem">rem</div>
  <div class="unit-box box-pct">%</div>
</div>`,
            css: `.parent {
  font-size: 20px;
  border: 1px dashed #d5dae0;
  border-radius: 8px;
  padding: 10px;
}
.unit-box {
  height: 26px;
  margin-bottom: 6px;
  border-radius: 5px;
  background: #29e2bd;
  color: #06342a;
  font: 12px/26px system-ui, sans-serif;
  padding-left: 6px;
}
.box-px { width: 120px; }
.box-em { width: 6em; }
.box-rem { width: 7.5rem; }
.box-pct { width: 100%; }`,
            height: 220 },
          { type: 'text', id: 'c-l77-b2',
            body: 'The parent has `font-size: 20px`, so `6em` resolves to `120px` here — change the parent font size and only the `em` box moves. The `%` box measures against its parent width, not its font. The `rem` box ignores the parent entirely.' },
          { type: 'warning', id: 'c-l77-w1', title: '`px` is not a physical unit',
            body: 'A CSS pixel is a **reference unit**, not a piece of paper. Browsers zoom by scaling how many CSS pixels fill the screen, so `width: 100px` stays 100 CSS pixels whether that is 1/96 of an inch on a desktop or a different physical size on a phone. This is exactly why `px` text still grows when a user zooms — a fixed number of CSS pixels occupies more physical space as the zoom goes up.' },
          { type: 'heading', id: 'c-l77-h1', level: 3, body: 'The absolute units' },
          { type: 'list', id: 'c-l77-l1', style: 'bullet', items: [
            '`px` — a CSS pixel, the reference unit. `1in` is always `96px`, `1cm` is `96/2.54px`.',
            '`pt` — a point. `1pt = 1/72in`, so `72pt = 1in`. This is the print unit.',
            '`pc` — a pica. `1pc = 12pt = 1/6in`. Used mainly in typography for measure.',
            '`in` — inches. `1in = 96px`. `cm` — centimetres, `96/2.54 ≈ 37.795px`.',
            '`mm` — millimetres, `96/25.4 ≈ 3.7795px`. `Q` — quarter-millimetres for print typography.',
          ] },
          { type: 'heading', id: 'c-l77-h2', level: 3, body: 'The relative units' },
          { type: 'list', id: 'c-l77-l2', style: 'bullet', items: [
            '`em` — relative to the **font size of the element itself**. In `font-size` it refers to the parent font size; in `padding` it refers to this element font size. Nested `em` compounds.',
            '`rem` — relative to the **root element font size**. Compounding stops here, which is why most of your sizing should be `rem`.',
            '`%` — relative to the same axis of the **parent box**: `%` width is a percentage of the parent width, `%` font size a percentage of the parent font size.',
            '`vw`, `vh` — `1vw` is 1% of the viewport width, `1vh` is 1% of its height. Neither accounts for scrollbars or mobile browser chrome.',
            '`vmin`, `vmax` — the smaller or larger of `vw` and `vh`. `vmin` is the safe one for anything that must always fit.',
            '`ch` — the width of the `0` glyph, so it measures horizontal space in characters. `60ch` is a readable line length.',
            '`ex` — the height of a lowercase `x`, used for vertical type-based spacing.',
          ] },
          { type: 'tip', id: 'c-l77-t1', title: 'Default to `rem`, reach for `em` deliberately',
            body: 'Use `rem` for font sizes, spacing and most component dimensions, because it only changes when you or the user change it. Use `em` for padding and margins inside a component so they stay in proportion to that component own size when it is resized.' },
          { type: 'exercise', id: 'c-l77-x1', exercise: {
            id: 'ex-l77',
            instructions: 'Size the panel below using relative units: give it a `1.5rem` font size and `2rem` of padding on every side. Do not use `px`.',
            languages: ['css'],
            starterCode: {
              html: '<div class="panel">Measured in rem</div>\n',
              css: '.panel {\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n}\n',
            },
            tests: [
              { id: 'ex-l77-t1', label: 'The font size is 1.5rem (24px)',
                body: 'return getComputedStyle(document.querySelector(".panel")).fontSize === "24px"' },
              { id: 'ex-l77-t2', label: 'The padding is 2rem on every side (32px)',
                body: 'const s = getComputedStyle(document.querySelector(".panel")); return s.paddingTop === "32px" && s.paddingRight === "32px" && s.paddingBottom === "32px" && s.paddingLeft === "32px"' },
            ],
            hints: [
              '`rem` resolves against the root font size, which is 16px unless the page sets it otherwise.',
              'The `padding` shorthand accepts four values: top, right, bottom, left.',
              'Try `font-size: 1.5rem; padding: 2rem;`',
            ],
            solution: {
              html: '<div class="panel">Measured in rem</div>\n',
              css: '.panel {\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n  font-size: 1.5rem;\n  padding: 2rem;\n}\n',
            },
            testNotes: 'The tests read the computed font size and padding of `.panel`. The root font size is 16px, so `1.5rem` is `24px` and `2rem` is `32px`.',
          } },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s40',
      title: 'CSS Units quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s40-q1', type: 'multiple-choice', prompt: 'What is `1em` relative to?',
          options: ['The root font size', 'The font size of the element the property is on', 'The width of the viewport', 'A fixed physical millimetre'],
          answer: 1, explanation: '`em` resolves against the computed font size of the element itself, which is why nested `em` values compound.' },
        { id: 'quiz-css-s40-q2', type: 'true-false', prompt: 'A `px` value is a fixed physical measurement, so browser zoom cannot affect it.',
          answer: false, explanation: 'A CSS pixel is a reference unit. Zoom scales how many pixels fill the screen and `px` scales with it — which is the behaviour accessibility relies on.' },
        { id: 'quiz-css-s40-q3', type: 'code-output', prompt: 'How wide is the box? The parent has `font-size: 20px`.',
          code: '.p { font-size: 20px; }\n.b { width: 4em; }',
          options: ['20px', '64px', '80px', '4px'],
          answer: 2, explanation: '`em` resolves against the font size the child inherits, so `4em` is `4 × 20px = 80px`.' },
        { id: 'quiz-css-s40-q4', type: 'identify-error', prompt: 'What is wrong with sizing a line of body text in `px`?',
          code: 'body {\n  font-size: 14px;\n  line-height: 1.5;\n}',
          options: ['Nothing at all — `px` is always correct for text', 'A fixed `px` font size ignores the user own browser zoom and text-size preference', '`line-height` is not valid with `px` font sizes', '`px` cannot be used on the `body` element'],
          answer: 1, explanation: 'A `px` text size does scale with zoom, but it ignores the user default font size and text-only zoom settings. `rem` honours all three.' },
        { id: 'quiz-css-s40-q5', type: 'multiple-choice', prompt: 'Which unit is best for a full-bleed hero section that should fill the screen height?',
          options: ['`pt`', '`em`', '`vh`', '`cm`'],
          answer: 2, explanation: 'Viewport units are relative to the screen, which is what "fill the viewport height" means. `em` would only follow a font size.' },
      ],
    },
  },
  {
    id: 'css-s41',
    title: 'CSS Specificity',
    description: 'How the browser decides which rule wins when more than one of them applies.',
    lessons: [
      {
        id: 'css-l78',
        title: 'Specificity',
        description: 'The a-b-c specificity calculation, source order as the last tiebreak, and how `:where()` and `:is()` change the arithmetic.',
        duration: 8,
        objectives: [
          'Calculate the specificity of any selector as three numbers',
          'Explain why source order only matters when specificity ties',
          'Use `:where()` to write a selector that always scores zero',
          'Use `:is()` and predict which of its arguments sets the score',
        ],
        xp: 50,
        content: [
          { type: 'text', id: 'c-l78-b1',
            body: 'When more than one rule sets the same property on the same element, the browser picks a winner. It does not pick the last one, and it does not pick the one you were thinking of. It picks the most **specific** selector, and only when specificity ties does later-in-the-file win.' },
          { type: 'demo', id: 'c-l78-d1', title: 'Two rules, one property, one winner',
            body: 'Two rules set `color` on the same paragraph. The second is longer and far more specific, and it wins.',
            html: `<p class="target">The class rule should win.</p>
<p class="winner-label">Winner: <code>.card p.target</code> — specificity 0-2-1</p>`,
            css: `p {
  color: #c0392b;
  font: 14px/1.6 system-ui, sans-serif;
  margin: 0 0 8px;
}
.card p.target {
  color: #008080;
}
.winner-label {
  color: #55606b;
  font-size: 12px;
}`,
            height: 160 },
          { type: 'text', id: 'c-l78-b2',
            body: 'The bare `p` rule scores 0-0-1. The `.card p.target` rule scores 0-2-1: two classes and one element, and the class column decides it. The label underneath states which rule won, so the reasoning is visible in the demo rather than hidden.' },
          { type: 'heading', id: 'c-l78-h1', level: 3, body: 'The a-b-c calculation' },
          { type: 'code', id: 'c-l78-c1', language: 'css', title: 'One number per column',
            code: `/*       a      b          c
         ids    classes    elements
         0      1          0        .card
         1      0          0        #header
         0      2          1        .card p.target
         0      0          3        div p span
         0      1          1        a:hover
         0      0          1        p::first-line */` },
          { type: 'list', id: 'c-l78-l1', style: 'bullet', items: [
            '**Column a — IDs.** Every `#id` counts 1. This column dominates: one ID beats any number of classes.',
            '**Column b — classes, attribute selectors and pseudo-classes.** `.class`, `[type="text"]`, `:hover`, `:focus`, `:first-child`, `:nth-child(2)`.',
            '**Column c — elements and pseudo-elements.** `div`, `p`, `a`, plus `::before` and `::after`, which add to this column.',
            'Compare column by column, left to right, like a three-digit number: **0-2-1 beats 0-1-9 beats 1-0-0**. Never add the columns together.',
            'The universal selector `*` counts for nothing and `:where()` always contributes 0-0-0.',
            'Specificity is per **selector in the list**, not per rule. In `h1, #logo { color: red }` the `h1` scores 0-0-1 on its own.',
          ] },
          { type: 'example', id: 'c-l78-e1', title: 'Walking two competing selectors',
            body: 'Two selectors, three columns each, compared one column at a time. The first column already decides it, so there is no need to look further.',
            html: `<div class="card"><p class="target">Competing selectors</p></div>`,
            css: `/* Selector A: #main p.target
   a: 1 ID          -> 1
   b: 1 class       -> 1
   c: 1 element     -> 1
   = 1-1-1

   Selector B: .layout .card p:hover
   a: 0 IDs         -> 0
   b: 3 class or ps -> 3
   c: 1 element     -> 1
   = 0-3-1

   Column a compares first: 1 > 0, so A wins immediately.
   The three classes in B never get a chance to count. */

#main p.target { color: #008080; }
.layout .card p:hover { color: #c0392b; }
.card {
  padding: 8px;
  border: 1px solid #d5dae0;
  border-radius: 8px;
  font: 14px/1.6 system-ui, sans-serif;
}
#main { margin: 0; }`,
            showPreview: true },
          { type: 'heading', id: 'c-l78-h2', level: 3, body: 'Source order is only the last tiebreak' },
          { type: 'text', id: 'c-l78-b3',
            body: 'If two selectors score exactly the same number, the one appearing **later** wins, and later means later in the concatenated order of all sheets at that origin. That is why a component stylesheet loaded after a base stylesheet overrides it with no specificity tricks at all. Reversing the link order reverses the outcome, which is why this is a last resort and not a strategy.' },
          { type: 'heading', id: 'c-l78-h3', level: 3, body: ':where() and :is()' },
          { type: 'list', id: 'c-l78-l2', style: 'bullet', items: [
            '`:where()` contributes **0-0-0, always**. Everything inside it is measured and then thrown away: `:where(.card, #main) p` scores 0-0-1, same as a bare `p`. Use it when you want a long, readable selector that a component stylesheet can override cheaply.',
            '`:is()` contributes the specificity of its **most specific argument**. `:is(#main, .card)` scores 1-0-0 because `#main` is in the list, even though `.card` also matches.',
            '`:not()`, `:has()` and `:is()` all behave like `:is()`. `:has()` also contributes the specificity of what is inside it.',
            'Nesting follows the same rule: `:is(:is(#a, .b), .c)` scores 1-0-0, from the innermost `#a`.',
            '`:where()` is the standard escape hatch for writing a default that must always lose to a normal class.',
          ] },
          { type: 'warning', id: 'c-l78-w1', title: 'High specificity is expensive to undo',
            body: 'Every `!important`, every `#id` and every nested `.a .b .c` you write becomes something the next person has to out-specify. Scoped, low-specificity selectors are what make a stylesheet safe to extend — a rule nobody can override without more `!important` is a rule that will eventually break.' },
          { type: 'tip', id: 'c-l78-t1', title: 'Do not fight specificity with more specificity',
            body: 'If a utility class keeps losing to your component CSS, the fix is not a longer selector. Lower the component rule with `:where()`, or raise the utility with a single `:is()` wrapper, and both stay legible.' },
          { type: 'exercise', id: 'c-l78-x1', exercise: {
            id: 'ex-l78',
            instructions: 'The rule below loses to nothing on this page, but it carries an `#id` and a class that any component stylesheet will struggle to override. Rewrite it inside `:where()` so it scores 0-0-1, and set the colour to teal.',
            languages: ['css'],
            starterCode: {
              html: '<div id="panel" class="panel">\n  <p>Specificity in action</p>\n</div>\n',
              css: '#panel {\n  padding: 8px;\n  border: 1px solid #d5dae0;\n}\np {\n  color: #c0392b;\n}\n#panel p {\n  \n}\n',
            },
            tests: [
              { id: 'ex-l78-t1', label: 'The paragraph is teal',
                body: 'return getComputedStyle(document.querySelector("#panel p")).color === "rgb(0, 128, 128)"' },
              { id: 'ex-l78-t2', label: 'No rule targets #panel without a :where() wrapper',
                body: 'return Array.from(document.styleSheets).every(s => { try { return Array.from(s.cssRules).every(r => !r.selectorText || r.selectorText.indexOf("#panel") === -1 || r.selectorText.indexOf(":where") > -1); } catch (e) { return true; } })' },
            ],
            hints: [
              'Wrap the whole selector in `:where(...)` so every part of it counts for nothing: `:where(#panel p) { color: teal; }`.',
              'A `:where()` rule scores 0-0-1, which beats the bare `p` rule, so it still wins here.',
              'Try `:where(#panel p) { color: #008080; }`',
            ],
            solution: {
              html: '<div id="panel" class="panel">\n  <p>Specificity in action</p>\n</div>\n',
              css: '#panel {\n  padding: 8px;\n  border: 1px solid #d5dae0;\n}\np {\n  color: #c0392b;\n}\n:where(#panel p) {\n  color: #008080;\n}\n',
            },
            testNotes: 'The first test reads the computed colour of the paragraph. The second walks the stylesheets and fails if any selector still mentions `#panel` outside a `:where()`.',
          } },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s41',
      title: 'CSS Specificity quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s41-q1', type: 'multiple-choice', prompt: 'What is the specificity of `.card p.target`?',
          options: ['0-0-3', '0-2-1', '0-3-0', '2-1-0'],
          answer: 1, explanation: 'Two classes (`.card`, `.target`) go in column b, one element (`p`) in column c, and no IDs, so it is 0-2-1.' },
        { id: 'quiz-css-s41-q2', type: 'true-false', prompt: 'Two rules with identical specificity set `color` on the same element. The one written later wins.',
          answer: true, explanation: 'Source order is the final tiebreak, applied only when the a-b-c numbers are exactly equal.' },
        { id: 'quiz-css-s41-q3', type: 'code-output', prompt: 'Which colour wins?',
          code: '#main p { color: red; }\n.layout .card p:hover { color: blue; }',
          options: ['Blue — the longer selector always wins', 'Red — one ID outranks any number of classes', 'Blue — `:hover` counts as an ID', 'Red — because it is written first'],
          answer: 1, explanation: 'The ID column is compared first. `1-0-1` beats `0-3-1` no matter how many classes the other selector has.' },
        { id: 'quiz-css-s41-q4', type: 'identify-error', prompt: 'Why is this base rule not easy to override?',
          code: '#app #main .widget .row .cell { color: #c0392b; }',
          options: ['The selector is too long to parse', 'Two IDs put it beyond what any utility class can out-specify', 'Class selectors cannot be chained', 'The rule needs `!important` to apply'],
          answer: 1, explanation: 'Two IDs set column a to 2. Beating that with normal rules means more IDs, which is a dead end — it should have been scoped with `:where()`.' },
        { id: 'quiz-css-s41-q5', type: 'multiple-choice', prompt: 'What does `:is(#main, .card)` score?',
          options: ['0-1-0 — it counts the least specific argument', '1-0-0 — it takes the specificity of its most specific argument', '0-0-0 — all its arguments are ignored', '1-1-0 — every argument is added together'],
          answer: 1, explanation: '`:is()` contributes the highest specificity among its arguments, so the `#main` in the list sets column a to 1.' },
      ],
    },
  },
  {
    id: 'css-s42',
    title: 'CSS !important',
    description: 'The escape hatch that inverts the cascade, and the reason it exists at all.',
    lessons: [
      {
        id: 'css-l79',
        title: '!important',
        description: 'What `!important` does, why it inverts the cascade, where it is justified, and why it usually means a wrong selector.',
        duration: 7,
        objectives: [
          'Describe what `!important` changes about the cascade',
          'Explain why an important declaration beats every normal declaration regardless of specificity',
          'Name the cases where `!important` is the correct tool',
          'Recognise `!important` in your own CSS as a selector that needs rewriting',
        ],
        xp: 45,
        content: [
          { type: 'text', id: 'c-l79-b1',
            body: '`!important` is a modifier you put on the **value** side of a declaration, and it moves that declaration out of the normal cascade. An important declaration beats every normal declaration on the element, no matter how specific the normal one is and no matter which comes later in the file.' },
          { type: 'demo', id: 'c-l79-d1', title: 'A low-specificity rule beating a high-specificity one',
            body: 'The teal rule is a single class. The crimson rule is an ID selector written later in the same stylesheet. The teal still wins.',
            html: `<p id="target" class="urgent">The !important class beats the #id.</p>`,
            css: `.urgent {
  color: #008080;
  font: 14px/1.6 system-ui, sans-serif;
  margin: 0;
}
#target {
  color: #c0392b;
}
.urgent {
  color: #008080 !important;
}`,
            height: 140 },
          { type: 'text', id: 'c-l79-b2',
            body: 'Two things are happening here. `.urgent` scores 0-1-0 and `#target` scores 1-0-0, so under normal rules the ID would win — and it would also win by source order, being later. `!important` on the last declaration promotes it to the important tier, and that tier is checked first.' },
          { type: 'heading', id: 'c-l79-h1', level: 3, body: 'The cascade, reordered' },
          { type: 'code', id: 'c-l79-c1', language: 'css', title: 'Where !important sits',
            code: `/* 1. user-agent important
   2. user important             the reader own stylesheet
   3. author important           you, with !important
   4. author normal              you, normally
   5. user normal
   6. user-agent normal

   Within each tier the normal rules apply:
   specificity first, then source order. */
.urgent {
  color: #008080 !important;
}` },
          { type: 'list', id: 'c-l79-l1', style: 'bullet', items: [
            'Normal cascade: for one property on one element, **highest specificity wins**, and if specificity ties, **later in the file wins**.',
            'Important declarations are hoisted into a tier checked **before any normal declaration**. An `!important` on 0-0-1 beats a normal rule with ten IDs.',
            'Inside the important tier the usual rules still apply: an important `#id` beats an important `.class`, and among equals the later one wins.',
            'Two important declarations on the same property and element resolve by specificity first, then source order — same as normal.',
            'The `!important` goes at the **end** of the value: `color: red !important;` is valid, `color: !important red;` is not.',
          ] },
          { type: 'warning', id: 'c-l79-w1', title: 'Reaching for !important usually means the selector is wrong',
            body: 'In your own component stylesheet, `!important` is a sign that a rule is fighting something it should have been scoped around. If `.card .title` needs it to beat your base `.title` rule, the real problem is that both rules scored the same and neither was written deliberately. It also costs performance: important declarations run through a slower path in style resolution. Fix the selector, then delete the `!important`.' },
          { type: 'heading', id: 'c-l79-h2', level: 3, body: 'Where it is the right tool' },
          { type: 'list', id: 'c-l79-l2', style: 'bullet', items: [
            '**Utility classes.** `.hidden { display: none !important }` is meant to work from anywhere and beat whatever component rule happens to match. Utility frameworks depend on this.',
            '**Overriding third-party or legacy CSS** you cannot edit. One `!important` is more honest than escalating specificity with ten nested classes.',
            '**Accessibility overrides.** High-contrast and forced-colors modes need backgrounds and box-shadows removed, sometimes from author styles you did not write.',
            '**Print stylesheets** that must suppress on-screen decoration regardless of what the screen rules set.',
            '**Inline styles.** An inline declaration always beats a normal author rule, so an `!important` stylesheet rule is the only way to beat a `style="..."` attribute.',
          ] },
          { type: 'tip', id: 'c-l79-t1', title: 'When you must use it, narrow the blast radius',
            body: 'Put `!important` on the specific property, not on every line of a block. A single `display: none !important` inside an otherwise normal utility is reviewable; twenty of them in a component is maintenance debt with a countdown.' },
          { type: 'exercise', id: 'c-l79-x1', exercise: {
            id: 'ex-l79',
            instructions: 'The paragraph below carries an inline `style` attribute, which beats any normal rule in your stylesheet. Add `!important` to the colour so the stylesheet wins, and make it teal.',
            languages: ['css'],
            starterCode: {
              html: '<p class="note" style="color: rgb(192, 57, 43)">Inline styles beat normal rules</p>\n',
              css: '.note {\n  font: 14px/1.6 system-ui, sans-serif;\n}\n',
            },
            tests: [
              { id: 'ex-l79-t1', label: 'The paragraph is teal',
                body: 'return getComputedStyle(document.querySelector(".note")).color === "rgb(0, 128, 128)"' },
              { id: 'ex-l79-t2', label: 'The stylesheet is beating the inline style',
                body: 'return getComputedStyle(document.querySelector(".note")).color !== "rgb(192, 57, 43)"' },
            ],
            hints: [
              'Inline styles beat any normal author rule, so the declaration must be important.',
              '`!important` goes after the value and before the semicolon.',
              'Try `.note { color: #008080 !important; }`',
            ],
            solution: {
              html: '<p class="note" style="color: rgb(192, 57, 43)">Inline styles beat normal rules</p>\n',
              css: '.note {\n  font: 14px/1.6 system-ui, sans-serif;\n  color: #008080 !important;\n}\n',
            },
            testNotes: 'The element carries an inline `color`, which normally beats any stylesheet rule. Only an `!important` declaration can win here.',
          } },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s42',
      title: 'CSS !important quiz',
      passingScore: 60,
      questions: [
        { id: 'quiz-css-s42-q1', type: 'multiple-choice', prompt: 'What does `!important` do to a declaration?',
          options: ['Makes it load faster', 'Moves it into a tier checked before all normal declarations', 'Prevents it from being cached', 'Makes it apply to every element'],
          answer: 1, explanation: 'Important declarations are resolved in their own pass, before any normal author declaration is considered.' },
        { id: 'quiz-css-s42-q2', type: 'true-false', prompt: 'An `!important` class selector can beat a normal ID selector written after it.',
          answer: true, explanation: 'The important tier is checked first, so specificity inside it only decides between important declarations, not against normal ones.' },
        { id: 'quiz-css-s42-q3', type: 'code-output', prompt: 'What colour is the text?',
          code: '.a {\n  color: teal !important;\n}\n#b {\n  color: crimson;\n}\n.a {\n  color: green;\n}',
          options: ['Green — the last `.a` rule wins', 'Crimson — the ID selector wins', 'Teal — the important declaration is in the winning tier', 'Crimson — later source order wins'],
          answer: 2, explanation: 'The second `.a` is normal, so it loses to `#b` on specificity. The first `.a` is important, so it beats both normal declarations.' },
        { id: 'quiz-css-s42-q4', type: 'identify-error', prompt: 'Why did this stylesheet end up needing five chained classes?',
          code: '.card .card .title .label .text { color: #c0392b; }',
          options: ['Class selectors need chaining to apply', 'A specificity fight was escalated instead of resolved by scoping the base rule properly', 'Colour is not a valid property without `!important`', 'Nothing is wrong with it'],
          answer: 1, explanation: 'Chaining classes escalates specificity to win a conflict a `:where()` wrapper or a better-scoped base rule would have settled cleanly and readably.' },
        { id: 'quiz-css-s42-q5', type: 'multiple-choice', prompt: 'Which is a legitimate use of `!important`?',
          options: ['Making a card title bold in a component stylesheet', 'A `.hidden` utility that must work from anywhere', 'A colour override on a class you wrote five minutes ago', 'Fixing a layout you have not understood yet'],
          answer: 1, explanation: 'A utility class exists precisely to override whatever matches, so `!important` is part of its contract. The other three are selector problems being papered over.' },
      ],
    },
  },
]