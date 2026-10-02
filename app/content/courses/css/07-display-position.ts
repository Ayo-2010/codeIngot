import type { Section } from '~/types/content'

export const cssDisplayPositionSections: Section[] = [
  {
    id: 'css-s21',
    title: 'CSS Display',
    description:
      'The one property that decides whether an element takes a whole line, sits inside a line, or stops existing - and how it reshapes the box model.',
    lessons: [
      {
        id: 'css-l54',
        title: 'CSS Display',
        description:
          'The four `display` values you write every day, what each one does to the box, and why a flex parent changes the rules its children follow.',
        duration: 7,
        xp: 45,
        objectives: [
          'Set an element to block, inline, inline-block or none',
          'Predict which box properties stop working for an inline element',
          'Explain how a flex or grid parent overrides the layout role of its children',
          'Remove an element from the layout and from the accessibility tree at the same time',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l54-b1',
            body: 'Every element on the page is a box, and **`display` is the property that tells the browser how that box joins up with its neighbours**. It decides whether the element claims a line of its own, shares a line with text, or generates no box at all. It is also the property that connects to the box model, because the value you pick decides which box model properties still mean anything.',
          },
          {
            type: 'demo',
            id: 'c-l54-d1',
            title: 'One element, four display values',
            body: 'Four cards hold the same paragraph. The first is a block and sits on its own line. The second is inline and flows with text beside it, which is why its `width` and vertical padding are ignored. The third is inline-block: it flows inline but still accepts `width` and `padding`. The fourth is `display: none` and produces no box at all - the space it would have taken is not there.',
            html: `<div class="demo-root dp">
  <p class="label">display: block (the default for a div)</p>
  <div class="box">A block-level div. It fills the available width and starts on a new line.</div>

  <p class="label">display: inline</p>
  <p class="prose">Text before <span class="inline">an inline span with padding: 20px and width: 300px</span> text after. Only the left and right padding shows.</p>

  <p class="label">display: inline-block</p>
  <p class="prose">Text before <span class="inline-block">an inline-block span with padding: 20px and width: 300px</span> text after. Now the width and both paddings apply.</p>

  <p class="label">display: none</p>
  <p class="prose">Text before <span class="gone">this element is not rendered at all</span> text after - with no gap left behind.</p>
</div>`,
            css: `.dp {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  padding: 0.5rem;
}
.dp .label {
  margin: 0.8rem 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.dp .label:first-child {
  margin-top: 0;
}
.dp .box {
  display: block;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-left: 3px solid #29e2bd;
  padding: 0.5rem 0.7rem;
}
.dp .prose {
  margin: 0;
  color: #9aa5b4;
}
.dp .inline,
.dp .inline-block {
  background: #1f6feb;
  color: #e8edf4;
  padding: 20px;
  width: 300px;
  border-radius: 4px;
}
.dp .inline {
  /* inline: width and top/bottom padding are ignored */
  display: inline;
}
.dp .inline-block {
  display: inline-block;
}
.dp .gone {
  display: none;
}`,
            height: 470,
          },
          {
            type: 'text',
            id: 'c-l54-b2',
            body: 'The inline case is the one worth pausing on. An inline box has no separate block box, so it has no intrinsic width of its own and no vertical dimension to pad. `width: 300px` is computed and then thrown away, and the top and bottom padding of `20px` paints outside the line box without pushing anything apart. The left and right padding does apply, because that is the inline axis. `inline-block` gives you a real box that happens to sit in a line, and every box model property starts working again.',
          },
          {
            type: 'heading',
            id: 'c-l54-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l54-c1',
            language: 'css',
            title: 'The four values and what each one does to the box',
            code: `.block {
  display: block;
  /* owns its own line, fills the container, vertical margins do not collapse away
     with it being the only box on the page - and its width defaults to auto,
     which means "fill the parent" */
}

.inline {
  display: inline;
  /* shares a line with text. width, height and top/bottom padding are ignored.
     Only left/right padding, margin, border and background render */
}

.inline-block {
  display: inline-block;
  /* sits in a line like inline, but generates a real block box inside it, so
     width, height and all four paddings behave normally */
}

.gone {
  display: none;
  /* no box is generated at all. The element takes no space, is not focusable,
     is not in the accessibility tree, and is still in the DOM for scripts */
}`,
          },
          {
            type: 'list',
            id: 'c-l54-l1',
            style: 'bullet',
            items: [
              '**`block`** is the initial value for structural elements like `<div>`, `<p>`, `<section>` and every heading. Each one starts a new line, stretches to the container width unless you say otherwise, and stacks vertically.',
              '**`inline`** is the initial value for `<span>`, `<a>`, `<strong>` and `<em>`. These flow inside a line of text, and they are the reason `width` on a `<span>` seems to do nothing.',
              '**`inline-block`** is the pragmatic middle. It is the only one of the three that both flows in a line and honours `width`, `height` and vertical padding. It is the right answer for a badge, a button-ish chip or a swatch, and the wrong answer for anything with real children to lay out - use flex or grid for that.',
              '**`none`** removes the element from the layout. Its space is reclaimed, its descendants are removed with it (you cannot re-show a child of a `display: none` parent), and it disappears from the tab order and the accessibility tree.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l54-t1',
            title: 'Reach for flex, not for a wrapper of inline-blocks',
            body: 'Setting `display: inline-block` on four children with `vertical-align: top` is the old way to build a row, and it still leaks: the whitespace between the tags in your HTML adds a few pixels, and the tallest item sets the line height. `display: flex` on the parent with `gap` gives you the row with no whitespace and no alignment guesswork. Use `inline-block` when the items are genuinely inline in a sentence, not when they are a row of widgets.',
          },
          {
            type: 'warning',
            id: 'c-l54-w1',
            title: 'display: none is also invisible to assistive tech',
            body: 'This is the part people get wrong. `display: none` removes the element from the accessibility tree, so a screen reader never announces it, and it cannot be focused. If you only want it gone visually, `visibility: hidden` is often the better tool because it preserves the layout space - and if you are hiding something only until it is needed, a class that toggles is easier to debug in devtools than an inline `style` attribute.',
          },
          {
            type: 'heading',
            id: 'c-l54-h2',
            level: 3,
            body: 'A flex or grid parent rewrites the rules',
          },
          {
            type: 'text',
            id: 'c-l54-b3',
            body: 'Here is the part that makes `display` a layout property rather than a decoration. When a parent is `display: flex` or `display: grid`, it establishes a new formatting context, and **the direct children stop being blocks or inlines at all**. They become *flex items* or *grid items*, and their `display` value is blockified: an inline child is laid out as if it were `block`, margins no longer collapse, and `float` on a child is ignored entirely. This is why `display: flex` on a parent so often "fixes" a gap you did not expect - it has changed what every child means.',
          },
          {
            type: 'example',
            id: 'c-l54-e1',
            title: 'The same children inside a block parent and a flex parent',
            body: 'Top: three children in a block parent, so each one is a block and they stack. Bottom: the identical markup inside a flex parent, so the children become flex items and line up in a row with equal shares. No child rule changed - only the parent\'s `display`.',
            html: `<p class="label">Parent is a block</p>
<div class="stack">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>

<p class="label">Parent is flex - the children are now flex items</p>
<div class="row">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>`,
            css: `.dp {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  padding: 0.5rem;
}
.dp .label {
  margin: 0.8rem 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.dp .item {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-top: 3px solid #29e2bd;
  padding: 0.6rem 0.7rem;
}
.dp .row {
  display: flex;
  gap: 0.75rem;
}
.dp .row .item {
  flex: 1;
}`,
            showPreview: true,
          },
          {
            type: 'list',
            id: 'c-l54-l2',
            style: 'bullet',
            items: [
              '**Blockification**  -  a flex or grid item is laid out as a block box. `display: inline` on a direct child of a flex container behaves as `block`, and `display: inline-block` behaves as `block`. You can see this in devtools: the computed value is still `inline-block`, but the rendered result is a block box.',
              '**Margins stop collapsing**  -  adjacent vertical margins between flex items collapse into the single largest value. Between flex items there is no collapsing at all; each item keeps its own margin. This is the single most common reason a flex layout looks a pixel different from the block layout you were expecting.',
              '**`float` on the child is ignored**  -  a floated flex item is not taken out of flow, because flex items are never in flow. Same for a clearfix: it is unnecessary inside a flex container, since the container already wraps its content.',
              '**`display: flex` is on the parent, `justify-content` is about the children**  -  the parent lays its children out along the main axis, so the properties that matter (`justify-content`, `align-items`, `gap`) all live on the parent. The children only need `flex` or an explicit basis to take part.',
            ],
          },
          {
            type: 'exercise',
            id: 'c-l54-x1',
            exercise: {
              id: 'ex-l54',
              instructions:
                'Put the two divs below side by side on one line using `display: inline-block`. Do not use float, flex or grid on the container.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="tile">Left</div>\n<div class="tile">Right</div>\n',
                css: '.tile {\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  padding: 0.5rem 0.7rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l54-t1',
                  label: 'Both tiles are inline-block',
                  body: 'const tiles = [...document.querySelectorAll(".tile")]; return tiles.length === 2 && tiles.every((t) => getComputedStyle(t).display === "inline-block")',
                },
                {
                  id: 'ex-l54-t2',
                  label: 'The two tiles share one line',
                  body: 'const tiles = [...document.querySelectorAll(".tile")]; const a = tiles[0].getBoundingClientRect(); const b = tiles[1].getBoundingClientRect(); return Math.abs(a.top - b.top) < 2',
                },
                {
                  id: 'ex-l54-t3',
                  label: 'The second tile starts to the right of the first',
                  body: 'const tiles = [...document.querySelectorAll(".tile")]; const a = tiles[0].getBoundingClientRect(); const b = tiles[1].getBoundingClientRect(); return b.left > a.left',
                },
                {
                  id: 'ex-l54-t4',
                  label: 'The container is not using float, flex or grid',
                  body: 'const root = document.querySelector(".tile").parentElement; const d = getComputedStyle(root).display; return d !== "flex" && d !== "grid" && d !== "inline-flex"',
                },
              ],
              hints: [
                'The value goes on the tiles themselves, not on their parent.',
                '`display: block` puts them on separate lines. You need a value that still flows horizontally but generates a real box.',
                '`.tile { display: inline-block; }`',
              ],
              solution: {
                html: '<div class="tile">Left</div>\n<div class="tile">Right</div>\n',
                css: '.tile {\n  display: inline-block;\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  padding: 0.5rem 0.7rem;\n}\n',
              },
              testNotes:
                'The second and third tests measure the rendered rectangles: two boxes on the same line have the same `top` and different `left` values. The fourth test reads the computed `display` of the parent so the row cannot be faked with flex or grid.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s21',
      title: 'CSS Display quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s21-q1',
          type: 'multiple-choice',
          prompt: 'You set `width: 300px` and `padding: 20px` on a `<span>` and neither has any effect. What is the most likely cause?',
          options: [
            'The span is missing a `position` value',
            'The span is `display: inline`, so it has no block box for width or vertical padding to apply to',
            '`width` only works on elements inside a flex container',
            'The padding is being overridden by a `box-sizing` rule',
          ],
          answer: 1,
          explanation:
            'An inline box has no separate block box, so `width` and `height` cannot apply, and top/bottom padding renders but does not affect layout. `display: inline-block` gives the span a real box and makes every box model property work.',
        },
        {
          id: 'quiz-css-s21-q2',
          type: 'true-false',
          prompt: 'A `display: none` element is still announced by screen readers, because it stays in the HTML.',
          answer: false,
          explanation:
            '`display: none` removes the element from the accessibility tree as well as the layout. It cannot be focused either. It stays in the DOM for scripts and CSS to find, but nothing a user can perceive reaches it.',
        },
        {
          id: 'quiz-css-s21-q3',
          type: 'blank',
          prompt: 'Which `display` value makes a parent lay its direct children out in a row, and blockifies those children in the process?',
          answers: ['flex', 'display: flex'],
          explanation:
            '`display: flex` establishes a flex formatting context. Its direct children become flex items, which are laid out as block boxes, so `float` on them is ignored and their margins stop collapsing with anything.',
        },
        {
          id: 'quiz-css-s21-q4',
          type: 'identify-error',
          prompt: 'Why does this row develop an unexplained few-pixel gap between the two boxes?',
          code: '.row {\n  display: block;\n}\n.card {\n  display: inline-block;\n  width: 200px;\n}\n\n<div class="row">\n  <div class="card">One</div>\n  <div class="card">Two</div>\n</div>',
          options: [
            'Because `display: block` on the parent forces each child onto its own line',
            'Because the newline and indentation between the two `div` elements count as a whitespace text node, which renders as a space in an inline formatting context',
            'Because `width: 200px` on an inline-block is invalid and is being discarded',
            'Because the parent has no `font-size` and inherits a fallback that adds spacing',
          ],
          answer: 1,
          explanation:
            'Inside a block container, inline-level children flow as one inline run, and any whitespace text node between them collapses to a single space that is rendered. That is the gap. `display: flex` on the parent with `gap` removes the problem entirely, because flex items are not part of an inline run and whitespace between them is ignored.',
        },
        {
          id: 'quiz-css-s21-q5',
          type: 'code-output',
          prompt: 'What happens to the vertical spacing between the two items below?',
          code: '.list {\n  display: flex;\n  flex-direction: column;\n}\n.item {\n  margin-bottom: 20px;\n}',
          options: [
            'The two margins collapse and the gap is 20px',
            'The gap is 20px, because flex items never collapse their margins',
            'The gap is 40px, because both margins are added',
            'The items overlap, because margins do not apply to flex items',
          ],
          answer: 1,
          explanation:
            'Margins between flex items do not collapse. Each item keeps its own `margin-bottom`, so the space between the first and second item is 20px, exactly as written. In a normal block flow the same two margins would collapse to the larger of the two.',
        },
      ],
    },
  },
  {
    id: 'css-s22',
    title: 'CSS Max-width',
    description:
      'Capping a container without breaking it: max-width versus width, the min-width floor, and the intrinsic sizing keywords.',
    lessons: [
      {
        id: 'css-l55',
        title: 'CSS Max-width',
        description:
          'Why `width: 100%` is not responsiveness, how `max-width` acts as a ceiling, and what the intrinsic sizing keywords actually compute.',
        duration: 6,
        xp: 40,
        objectives: [
          'Explain the difference between width and max-width on a container',
          'Cap a container so it stops growing but still shrinks',
          'Use min-width as the opposite floor and predict what wins when they conflict',
          'Use min-content, max-content and fit-content to size to the content',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l55-b1',
            body: 'Most layouts that feel "responsive" are really a container with a ceiling on its width. **`max-width` is that ceiling**: the element grows with its content and its parent as normal, up to a limit, and then stops. It never forces a width, and it never causes an overflow. That is the whole difference between it and `width`, and it is why `max-width` is almost always the better tool for a page container.',
          },
          {
            type: 'demo',
            id: 'c-l55-d1',
            title: 'max-width as a ceiling, width as a command',
            body: 'All three bars are the same long text. The first uses `width: 260px` and is exactly that wide every time. The second uses `max-width: 260px` and is 260px here, but collapses to whatever the parent allows when the parent is narrow. The third has both `width: 420px` and `max-width: 260px`: the cap wins, because max-width is applied last as a limit on the used width.',
            html: `<div class="demo-root mw">
  <p class="label">width: 260px - a command</p>
  <div class="bar fixed">This bar is 260px at every viewport width, and it will overflow or overlap its parent on a narrow screen.</div>

  <p class="label">max-width: 260px - a ceiling</p>
  <div class="bar capped">This bar grows with the container but never past 260px, so it can still shrink on a narrow screen.</div>

  <p class="label">width: 420px with max-width: 260px - the cap wins</p>
  <div class="bar both">This bar asks for 420px and is limited to 260px, so it renders at 260px.</div>

  <div class="narrow">
    <p class="label">Inside a 150px parent, the capped bar still fits</p>
    <div class="bar capped">Still readable, still 150px wide, no overflow.</div>
  </div>
</div>`,
            css: `.mw {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  padding: 0.5rem;
}
.mw .label {
  margin: 0.9rem 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.mw .label:first-child {
  margin-top: 0;
}
.mw .bar {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-left: 3px solid #29e2bd;
  padding: 0.55rem 0.7rem;
}
.mw .fixed {
  width: 260px;
}
.mw .capped {
  max-width: 260px;
}
.mw .both {
  width: 420px;
  max-width: 260px;
}
.mw .narrow {
  width: 150px;
  margin-top: 0.4rem;
  padding: 0.5rem;
  border: 1px dashed #1f6feb;
  border-radius: 4px;
}`,
            height: 430,
          },
          {
            type: 'text',
            id: 'c-l55-b2',
            body: 'The dashed box is the point of the whole lesson. A `width` of 260px keeps its value inside a 150px parent and spills out of it. A `max-width` of 260px simply reads as "never wider than 260px", and when only 150px is available it takes 150px. `width: 100%` looks like a responsive rule and is not one - it says "be exactly as wide as the parent", which is a problem the moment the parent is the wrong size or the content has an unbreakable minimum.',
          },
          {
            type: 'heading',
            id: 'c-l55-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l55-c1',
            language: 'css',
            title: 'A container that is capped, not fixed',
            code: `.container {
  /* the useful default for a page container: fill the parent, but not past 960px */
  width: 100%;
  max-width: 960px;
  margin-inline: auto;   /* centres the leftover space on both sides */
}

.card {
  /* only a ceiling: it is as wide as its content needs, up to a limit */
  max-width: 420px;
}

.grid {
  /* the floor: never narrower than this, even on a phone */
  min-width: 280px;
}

img {
  /* max-width: none removes a inherited or browser-default cap when you
     genuinely want an image to be able to exceed it */
  max-width: none;
}`,
          },
          {
            type: 'list',
            id: 'c-l55-l1',
            style: 'bullet',
            items: [
              '**`width`**  -  a request for a specific size. Combined with the default `box-sizing: content-box`, `width: 260px` plus `padding: 0.7rem` on each side is a box 282px wide on the outside, which is the source of a whole family of overflow bugs. If you keep `content-box`, remember the padding is not in the number.',
              '**`max-width`**  -  an upper bound applied after `width` is resolved. The used width becomes `min(width, max-width)`, and if the parent is narrower than the cap, the element still shrinks to fit. It never creates overflow.',
              '**`min-width`**  -  the matching lower bound, applied first. The used width becomes `max(min-width, min(width, max-width))`. When they conflict, the floor wins on the way up: an element with `min-width: 400px` and `max-width: 200px` renders at 400px.',
              '**`max-width: none`**  -  the initial value, meaning no ceiling at all. You need it when a global rule or an image UA stylesheet is capping something and you want that cap gone. It is also the honest way to undo `max-width: 100%` on an image inside a fixed-width container.',
              '**They are not alternatives.** `max-width` is a *limit on* `width`, not a replacement for it. A well-formed responsive container usually uses both: `width: 100%` to fill the parent, `max-width` to stop growing.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l55-t1',
            title: 'The order the two limits are applied in',
            body: 'Think of it as arithmetic on the used width, not as a conflict resolution: the `min-width` floor is applied, then `max-width` clips the result, then `width` is fitted into whatever room is left. In practice the memorable consequence is that `min-width` beats `max-width` when the two disagree, and that a `max-width` below the parent width is simply never reached.',
          },
          {
            type: 'warning',
            id: 'c-l55-w1',
            title: 'A max-width cannot rescue an over-wide child',
            body: 'A cap on the parent does nothing for a child that refuses to shrink. A long unbroken URL, a wide table or an image with an intrinsic width all have a minimum, and if that minimum exceeds the parent cap the content spills out. Fix the child too - `overflow-wrap: break-word`, a scroll container, or `max-width: 100%; height: auto` on the image. Capping the parent is not a substitute for sizing the content.',
          },
          {
            type: 'heading',
            id: 'c-l55-h2',
            level: 3,
            body: 'Sizing to the content itself',
          },
          {
            type: 'text',
            id: 'c-l55-b3',
            body: '`max-width` and `min-width` accept three keywords that ask the browser to measure the content instead of taking your number. They compute to a length, so they drop straight into the same slot, and they are the only sane way to size a shrink-to-fit box.',
          },
          {
            type: 'list',
            id: 'c-l55-l2',
            style: 'bullet',
            items: [
              '**`min-content`**  -  the narrowest the box can be without overflowing its own content. That is roughly the width of the longest unbreakable word, since words wrap at spaces. A two-line label becomes a thin column of stacked words.',
              '**`max-content`**  -  the width the box would take if nothing wrapped at all, i.e. the full length of the content on one line. This is where text-overflow ellipsis is measured against, and it is why `max-content` boxes are so easy to overflow their parent.',
              '**`fit-content(...)`**  -  the useful compromise. `fit-content: 20rem` means "as wide as the content wants, capped at 20rem, and never wider than the available space". It is shorthand for `min(max-content, max(min-content, 20rem))` and it is exactly what you want for a dropdown, a chip or a table cell.',
            ],
          },
          {
            type: 'example',
            id: 'c-l55-e1',
            title: 'A page container with a floor, and a chip sized to its content',
            body: 'The outer panel is a real page container: `width: 100%`, a `max-width` ceiling, and a `min-width` floor so it does not collapse on a tiny screen. Inside it, the badge uses `fit-content` so it hugs its label up to 12rem. The three lines below are the same content at `min-content`, `max-content` and `fit-content`, so the difference is visible side by side.',
            html: `<div class="page">
  <p class="kicker">Release 4.2 - changelog</p>
  <h3 class="title">Container sizing</h3>
  <p class="body">
    The panel below is capped at 900px and floored at 320px, so it never runs edge to edge on a
    desktop and never becomes unreadably narrow. The badge beside it is sized to its own content.
  </p>
  <span class="badge">stable</span>
</div>

<div class="demo-root kw">
  <p class="label">min-content - one word per line</p>
  <div class="line minc">Container sizing keywords explained</div>

  <p class="label">max-content - the whole string on one line</p>
  <div class="line maxc">Container sizing keywords explained</div>

  <p class="label">fit-content: 14rem - content width, capped at 224px, never wider than the parent</p>
  <div class="line fitc">Container sizing keywords explained</div>
</div>`,
            css: `.kw {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.5;
}
.kw .page {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  width: 100%;
  max-width: 900px;
  min-width: 320px;
  margin: 0 auto 1rem;
  padding: 1rem;
  box-sizing: border-box;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 8px;
}
.kw .page .kicker {
  margin: 0 0 0.2rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.kw .page .title {
  margin: 0 0 0.4rem;
  font-size: 16px;
  color: #e8edf4;
}
.kw .page .body {
  margin: 0 0 0.7rem;
  color: #9aa5b4;
}
.kw .page .badge {
  display: inline-block;
  width: fit-content;
  max-width: 12rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: #29e2bd;
  color: #0b0d10;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.kw .label {
  margin: 0.7rem 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.kw .label:first-child {
  margin-top: 0;
}
.kw .line {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-left: 3px solid #1f6feb;
  padding: 0.4rem 0.6rem;
}
.kw .minc {
  width: min-content;
}
.kw .maxc {
  width: max-content;
}
.kw .fitc {
  width: fit-content;
  max-width: 14rem;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l55-x1',
            exercise: {
              id: 'ex-l55',
              instructions:
                'Cap the panel below at 480px wide, give it a floor of 280px, and centre it horizontally with `margin-left` and `margin-right` set to `auto`.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="panel">\n  <h3>Order summary</h3>\n  <p>Three items, dispatched tomorrow.</p>\n</div>\n',
                css: '.panel {\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  border-radius: 8px;\n  padding: 1rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l55-t1',
                  label: 'The panel is capped at 480px',
                  body: 'return getComputedStyle(document.querySelector(".panel")).maxWidth === "480px"',
                },
                {
                  id: 'ex-l55-t2',
                  label: 'The panel has a 280px floor',
                  body: 'return getComputedStyle(document.querySelector(".panel")).minWidth === "280px"',
                },
                {
                  id: 'ex-l55-t3',
                  label: 'The panel is centred by its auto margins',
                  body: 'const s = getComputedStyle(document.querySelector(".panel")); return s.marginLeft === "0px" && s.marginRight === "0px" ? true : Math.abs(parseFloat(s.marginLeft) - parseFloat(s.marginRight)) < 2 && parseFloat(s.marginLeft) > 0',
                },
                {
                  id: 'ex-l55-t4',
                  label: 'The cap is doing the work, not a fixed width',
                  body: 'const s = getComputedStyle(document.querySelector(".panel")); return s.width !== "480px"',
                },
              ],
              hints: [
                '`max-width` is a ceiling and `min-width` is a floor. Both are ordinary CSS properties on the element itself.',
                'Auto margins only centre a block when the element has a width that is less than its parent - which is exactly what the cap gives you.',
                '`.panel { max-width: 480px; min-width: 280px; margin-left: auto; margin-right: auto; }`',
              ],
              solution: {
                html: '<div class="panel">\n  <h3>Order summary</h3>\n  <p>Three items, dispatched tomorrow.</p>\n</div>\n',
                css: '.panel {\n  max-width: 480px;\n  min-width: 280px;\n  margin-left: auto;\n  margin-right: auto;\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  border-radius: 8px;\n  padding: 1rem;\n}\n',
              },
              testNotes:
                'The tests read computed `max-width` and `min-width` as written, since no layout context overrides them. The last test rejects `width: 480px`, which would pass the first check but defeat the exercise - a fixed width cannot shrink. Centring is checked from the computed margins, which resolve to matching pixel values once the element is narrower than its parent.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s22',
      title: 'CSS Max-width quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s22-q1',
          type: 'multiple-choice',
          prompt: 'What is the practical difference between `width: 300px` and `max-width: 300px` on a block element?',
          options: [
            'There is none; both produce 300px when the parent is wider',
            '`width` fixes the box at 300px and can overflow a narrower parent, while `max-width` only forbids going above 300px and still shrinks to fit',
            '`max-width` is ignored by browsers that support `box-sizing: border-box`',
            '`width` includes padding, `max-width` does not',
          ],
          answer: 1,
          explanation:
            '`width` asks for an exact size. `max-width` only caps the size, so the element uses the smaller of the width and the cap and then still shrinks if the parent is narrower. That is why a `max-width` can never be the cause of an overflow.',
        },
        {
          id: 'quiz-css-s22-q2',
          type: 'true-false',
          prompt: 'An element with `min-width: 400px` and `max-width: 200px` renders at 200px, because the cap is applied last.',
          answer: false,
          explanation:
            'The `min-width` floor is enforced on the result, so when the two conflict the floor wins and the element renders at 400px. The limits are arithmetic bounds on the used width, not a priority list where the cap always wins.',
        },
        {
          id: 'quiz-css-s22-q3',
          type: 'blank',
          prompt: 'Which intrinsic sizing keyword resolves to the width the content would take if nothing wrapped at all?',
          answers: ['max-content', 'max-content()'],
          explanation:
            '`max-content` is the full unwrapped length of the content. `min-content` is the width of the longest unbreakable word, and `fit-content()` sits between them, capped by whatever length you pass it.',
        },
        {
          id: 'quiz-css-s22-q4',
          type: 'identify-error',
          prompt: 'This "responsive" panel overflows its parent on a narrow screen. What is the mistake?',
          code: '.panel {\n  width: 100%;\n  padding: 1.5rem;\n}\n',
          options: [
            '`width: 100%` should be `max-width: 100%`',
            'The default `box-sizing: content-box` means the 1.5rem padding is added on top of the 100% width',
            '`width` cannot be used on a block element',
            '`padding` must come before `width` in the declaration block',
          ],
          answer: 1,
          explanation:
            'With `box-sizing: content-box`, `width: 100%` sizes the content box, so 1.5rem of padding on each side is added outside that and the panel ends up 3rem wider than its parent. Either use `box-sizing: border-box` or swap `width: 100%` for `max-width: 100%`.',
        },
        {
          id: 'quiz-css-s22-q5',
          type: 'multiple-choice',
          prompt: 'A container has `max-width: 300px` and `min-width: 400px`. How wide does it actually render?',
          options: [
            '300px, because max-width is the outer limit',
            '400px, because the min-width floor overrides the cap',
            '300px on narrow screens and 400px on wide ones',
            'The declaration is invalid and the element falls back to auto width',
          ],
          answer: 1,
          explanation:
            'The two limits are not a negotiation. The used width is fitted into the range they define, and when the minimum sits above the maximum the minimum wins, so the element renders at 400px. The combination is legal - it just does not do anything except guarantee 400px.',
        },
      ],
    },
  },
  {
    id: 'css-s23',
    title: 'CSS Position',
    description:
      'The five position values, the containing block that decides where an absolute element lands, and what sticky actually requires.',
    lessons: [
      {
        id: 'css-l56',
        title: 'CSS Position',
        description:
          'static, relative, absolute, fixed and sticky: what each does to the flow, and the two questions that resolve almost every positioning bug.',
        duration: 8,
        xp: 50,
        objectives: [
          'Name the five position values and say which one leaves an element in the normal flow',
          'Explain why relative still reserves space while absolute does not',
          'Identify the containing block of an absolute element and use it to fix an unexpected parent',
          'Make a sticky header work by supplying a scroll container and an offset',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l56-b1',
            body: '`position` answers one question: **is this box still in the normal flow, and if not, what is it positioned against?** There are five values, and you only need three facts to use all of them correctly. Does the element keep its space in the flow? Does it move when you set offsets? And what is it positioned relative to?',
          },
          {
            type: 'demo',
            id: 'c-l56-d1',
            title: 'The flow, and what each value does to it',
            body: 'The dotted line is the original place of the blue box in the normal flow. The red box is `position: relative` and has been nudged 20px right and down - a dashed outline marks where it would have been, so you can see that it still holds its slot. The green box is `position: absolute` and has been placed in its parent\'s corner, with no slot left behind at all. Note the gap where the relative box used to sit is still occupied by its outline.',
            html: `<div class="demo-root ps">
  <p class="label">Static, relative, absolute - all in the same parent</p>
  <div class="stage">
    <div class="rel">
      position: relative<br />top: 20px; left: 20px
      <span class="ghost">where it sits in the flow</span>
    </div>
    <div class="rel2">
      position: relative<br />no offsets, so it has not moved
    </div>
    <div class="abs">
      position: absolute<br />top: 0; left: 0
    </div>
  </div>
  <p class="note">
    The stage is <code>position: relative</code>, so it is the containing block for the
    absolute box. Remove that and the green box would jump to the nearest positioned
    ancestor - or the viewport.
  </p>
</div>`,
            css: `.ps {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  padding: 0.5rem;
}
.ps .label {
  margin: 0 0 0.4rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.ps .stage {
  position: relative;
  border: 1px dashed #2a3441;
  border-radius: 6px;
  padding: 0.6rem;
  min-height: 130px;
}
.ps .rel,
.ps .rel2,
.ps .abs {
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 0.5rem;
}
.ps .rel {
  position: relative;
  top: 20px;
  left: 20px;
  background: #1d2531;
  border: 1px solid #1f6feb;
  color: #e8edf4;
}
.ps .rel .ghost {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  color: #9aa5b4;
  font-size: 11px;
}
.ps .rel2 {
  background: #1d2531;
  border: 1px solid #2a3441;
  color: #9aa5b4;
}
.ps .abs {
  position: absolute;
  top: 0;
  right: 0;
  margin-bottom: 0;
  background: #29e2bd;
  color: #0b0d10;
  font-weight: 600;
}
.ps .note {
  margin: 0.8rem 0 0;
  color: #9aa5b4;
  font-size: 12px;
}
.ps code {
  color: #29e2bd;
}`,
            height: 400,
          },
          {
            type: 'text',
            id: 'c-l56-b2',
            body: 'The two dashed things are the whole lesson. `relative` moved the blue box visually and left its space in the flow exactly where it was - which is why a relatively positioned element can overlap a sibling, and why it never causes the layout to reflow. `absolute` took its box out of the flow entirely, so the next element closed up behind it, and the box itself was placed against the stage because the stage is positioned.',
          },
          {
            type: 'heading',
            id: 'c-l56-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l56-c1',
            language: 'css',
            title: 'The five values, annotated',
            code: `.a { position: static; }    /* the default. Offsets are ignored. Safe. */

.b { position: relative; top: 20px; left: 20px; }
  /* still in the flow and still holding its space.
     Moved, but the space stays - so it can overlap a sibling.
     Also the usual way to make an element a containing block. */

.c { position: absolute; top: 0; right: 0; }
  /* out of the flow, so no space is held for it.
     positioned against the nearest ancestor with position other than static,
     or the initial containing block (the viewport-sized page area) if none exists. */

.d { position: fixed; top: 0; left: 0; }
  /* out of the flow, positioned against the viewport.
     Does not move when the page scrolls. Affected by ancestor transforms. */

.e { position: sticky; top: 0; }
  /* in the flow until its offset would be crossed, then it behaves like fixed
     inside its scroll container. Needs a scrolling ancestor and an offset. */`,
          },
          {
            type: 'list',
            id: 'c-l56-l1',
            style: 'bullet',
            items: [
              '**`static`**  -  the initial value, and the correct one about 95% of the time. Offsets written on a static element are simply ignored. Reach for it explicitly when you are overriding a positioned parent, because `position: static` is the only value that reliably cancels an inherited `relative`.',
              '**`relative`**  -  keeps the element in the flow, so it reserves its space and affects its siblings exactly as if it had not moved. The offsets are visual only. Its real job is usually to act as the containing block for an absolute child.',
              '**`absolute`**  -  removes the element from the flow. Its space is reclaimed, siblings move up into it, and the element is sized by its own `width` and `height` rather than by the flow. It is out of flow but not out of the document, so it still scrolls with the page.',
              '**`fixed`**  -  also out of the flow, but positioned against the **viewport**, so it stays put during page scroll. It is the value for a sticky header or a modal backdrop. The catch is the next bullet.',
              '**`sticky`**  -  the hybrid: in the flow until its edge would cross the offset you gave, at which point it pins. It is positioned against its **nearest scrolling ancestor**, not the viewport, and it only moves within the bounds of its own parent. It is the right answer for a table header inside a scroll container.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l56-t1',
            title: 'Find the containing block before you debug the offset',
            body: 'When an absolute element is in the wrong place, do not adjust `top` and `left` - identify what it is positioned against. Walk up the ancestor chain and look for the first element whose `position` is not `static`. If there is none, the element is positioned against the initial containing block, which is the whole page. Adding `position: relative` to the right ancestor is a one-line fix; nudging offsets is not.',
          },
          {
            type: 'warning',
            id: 'c-l56-w1',
            title: 'A transform anywhere above creates a containing block for fixed',
            body: 'If any ancestor of a `position: fixed` element has a `transform`, `filter`, `perspective`, `backdrop-filter` or `will-change: transform`, that ancestor becomes the containing block for the fixed element. The fixed element then positions against that ancestor instead of the viewport and scrolls with it - usually visible as a modal that will not stay put. This is the single most common cause of "fixed does not work" and it is not obvious from the code that failed.',
          },
          {
            type: 'heading',
            id: 'c-l56-h2',
            level: 3,
            body: 'Making sticky actually stick',
          },
          {
            type: 'text',
            id: 'c-l56-b3',
            body: '`position: sticky` has three requirements, and missing any one of them produces an element that simply does not move. First, you must give it an offset - `top: 0` with no other offset does nothing, because the element never needs to move. Second, there must be a scrolling ancestor, and that ancestor is what it pins to. Third, the element needs room to travel: sticky cannot move an element outside its own parent, so the parent has to be taller than the element.',
          },
          {
            type: 'example',
            id: 'c-l56-e1',
            title: 'A sticky panel inside a scroll container',
            body: 'The panel below has a 200px scroll container and the sticky element uses `top: 0`, so it pins to the top of the container as you scroll the text underneath it. Change `top: 0` to nothing and it stops being sticky entirely - that is the offset requirement in one experiment.',
            html: `<div class="demo-root st">
  <div class="scroller">
    <aside class="rail">position: sticky; top: 0;</aside>
    <div class="text">
      <p>Scroll this panel. The rail on the left pins itself to the top of the scroll container as soon as its top edge would cross the offset.</p>
      <p>Sticky is positioned against the nearest scrolling ancestor, not the viewport. Here that is the scroller, which is why the rail never leaves the box.</p>
      <p>Sticky is also bounded by its parent. If the rail were the only child of a short parent, it would have nowhere to travel and would never move, however far you scrolled.</p>
      <p>That bounded behaviour is what makes sticky safe: it can never float over unrelated content above or below its own section, unlike fixed.</p>
      <p>One more rule worth knowing: any ancestor with overflow other than visible becomes the sticky element's scroll container, even if it never actually scrolls. An overflow wrapper above your sticky header is the most common reason it silently stops working.</p>
      <p>For a page-wide header that pins to the browser window, use fixed with a reserved placeholder, or sticky on a direct child of the body with top: 0.</p>
    </div>
  </div>
</div>`,
            css: `.st {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.6;
}
.st .scroller {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  height: 200px;
  overflow: auto;
  padding: 0.75rem;
  box-sizing: border-box;
}
.st .rail {
  position: sticky;
  top: 0;
  flex: 0 0 110px;
  background: #1d2531;
  border: 1px solid #29e2bd;
  border-radius: 6px;
  padding: 0.6rem;
  color: #29e2bd;
  font-size: 12px;
}
.st .text {
  flex: 1;
  color: #9aa5b4;
}
.st .text p {
  margin: 0 0 0.8rem;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l56-t2',
            title: 'Prefer sticky to fixed for anything inside the page',
            body: '`fixed` is global: the element escapes every ancestor, so it will happily float over a modal, a different route, or a section you did not intend. `sticky` is local - it is bounded by its parent, so it cannot escape its section, and it cannot be the thing that breaks a scroll lock. Use `fixed` only for genuine viewport-level chrome such as a modal overlay.',
          },
          {
            type: 'exercise',
            id: 'c-l56-x1',
            exercise: {
              id: 'ex-l56',
              instructions:
                'Make the parent a positioning context, then place the badge 20px from the right and 20px from the bottom of that parent using absolute positioning. The badge must not take up space in the flow.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="card">\n  <h3>Hex bolt M12</h3>\n  <p>Zinc plated, 60mm</p>\n  <span class="badge">In stock</span>\n</div>\n',
                css: '.card {\n  position: static;\n  max-width: 260px;\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  border-radius: 8px;\n  padding: 1.25rem;\n}\n.badge {\n  position: absolute;\n  background: #29e2bd;\n  color: #0b0d10;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 0.15rem 0.5rem;\n  border-radius: 999px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l56-t1',
                  label: 'The card is a positioning context',
                  body: 'return getComputedStyle(document.querySelector(".card")).position === "relative"',
                },
                {
                  id: 'ex-l56-t2',
                  label: 'The badge is absolutely positioned',
                  body: 'return getComputedStyle(document.querySelector(".badge")).position === "absolute"',
                },
                {
                  id: 'ex-l56-t3',
                  label: 'The badge sits 20px from the right edge of the card',
                  body: 'const c = document.querySelector(".card").getBoundingClientRect(); const b = document.querySelector(".badge").getBoundingClientRect(); return Math.abs(c.right - b.right - 20) < 2',
                },
                {
                  id: 'ex-l56-t4',
                  label: 'The badge sits 20px from the bottom edge of the card',
                  body: 'const c = document.querySelector(".card").getBoundingClientRect(); const b = document.querySelector(".badge").getBoundingClientRect(); return Math.abs(c.bottom - b.bottom - 20) < 2',
                },
                {
                  id: 'ex-l56-t5',
                  label: 'The badge is out of the flow, so it adds no height to the card',
                  body: 'const card = document.querySelector(".card"); const h3 = card.querySelector("h3"); const p = card.querySelector("p"); const flowHeight = h3.getBoundingClientRect().height + parseFloat(getComputedStyle(h3).marginBottom) + p.getBoundingClientRect().height + parseFloat(getComputedStyle(p).marginBottom); return card.getBoundingClientRect().height - flowHeight < parseFloat(getComputedStyle(card).paddingTop) * 2 + 40',
                },
              ],
              hints: [
                'Two declarations on two elements: the parent needs to become the containing block, the child needs the offsets.',
                'An absolute element is positioned against the nearest ancestor with a non-static position. If the parent is still `static`, your offsets are measured from somewhere much further up the page.',
                '`.card { position: relative; }` and `.badge { position: absolute; right: 20px; bottom: 20px; }`',
              ],
              solution: {
                html: '<div class="card">\n  <h3>Hex bolt M12</h3>\n  <p>Zinc plated, 60mm</p>\n  <span class="badge">In stock</span>\n</div>\n',
                css: '.card {\n  position: relative;\n  max-width: 260px;\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  border-radius: 8px;\n  padding: 1.25rem;\n}\n.badge {\n  position: absolute;\n  right: 20px;\n  bottom: 20px;\n  background: #29e2bd;\n  color: #0b0d10;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 0.15rem 0.5rem;\n  border-radius: 999px;\n}\n',
              },
              testNotes:
                'The offset tests measure the rendered rectangles of the card and the badge and compare the difference, so a tolerance of 2px covers subpixel rounding. The last test is a loose check that the absolutely positioned badge contributed no height: it compares the card height against the sum of the in-flow children plus the vertical padding.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s23',
      title: 'CSS Position quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s23-q1',
          type: 'multiple-choice',
          prompt: 'What is the difference in layout effect between `position: relative` and `position: absolute` on the same element?',
          options: [
            'None; both move the element by the same amount',
            'Relative stays in the flow and keeps its space, absolute leaves the flow and its space is reclaimed',
            'Relative can only be moved horizontally, absolute can be moved on both axes',
            'Absolute removes the element from the document, relative keeps it in the DOM only',
          ],
          answer: 1,
          explanation:
            'A relative element reserves its original slot and is only displaced visually, so siblings do not move. An absolute element is out of flow, so nothing reserves its space and following siblings close up behind it. Both stay in the DOM - that is not what separates them.',
        },
        {
          id: 'quiz-css-s23-q2',
          type: 'true-false',
          prompt: 'An absolutely positioned element with no positioned ancestor is positioned against the viewport.',
          answer: false,
          explanation:
            'With no positioned ancestor it falls back to the initial containing block, which is the viewport-sized block at the top of the document, not the visible viewport. That is why such an element scrolls away with the page, while a `fixed` element does not.',
        },
        {
          id: 'quiz-css-s23-q3',
          type: 'blank',
          prompt: 'Which `position` value is positioned against the nearest scrolling ancestor and is bounded by its own parent?',
          answers: ['sticky', 'position: sticky'],
          explanation:
            '`sticky` stays in the flow until its offset would be crossed, then pins inside its scroll container. Because it is bounded by its parent, it can never escape its own section, which is the main reason to prefer it over `fixed` for in-page headers.',
        },
        {
          id: 'quiz-css-s23-q4',
          type: 'identify-error',
          prompt: 'This header was meant to stay pinned at the top of the window while the page scrolls. Why does it not work?',
          code: '.card {\n  transition: transform 200ms;\n}\n.fixed-header {\n  position: fixed;\n  top: 0;\n}\n\n<div class="card">\n  <div class="fixed-header">Menu</div>\n  <p>Page content</p>\n</div>',
          options: [
            '`top: 0` is not a valid offset for a fixed element',
            '`position: fixed` cannot be combined with a parent that has padding',
            'The `transform` on the ancestor makes it the containing block for the fixed element, so it scrolls with the page',
            'Fixed elements need `z-index` to stay visible',
          ],
          answer: 2,
          explanation:
            'A non-`none` `transform` on an ancestor establishes a containing block for `position: fixed` descendants. The header is then positioned and scrolled relative to that card instead of the viewport. `filter`, `perspective`, `backdrop-filter` and `will-change: transform` have the same effect.',
        },
        {
          id: 'quiz-css-s23-q5',
          type: 'multiple-choice',
          prompt: 'Your `position: sticky; top: 0` table header does not stick. What should you check first?',
          options: [
            'Whether the sticky element has a `z-index`',
            'Whether an ancestor between it and the page has `overflow` set to anything other than visible, which makes that ancestor the scroll container',
            'Whether the sticky element is `display: inline`',
            'Whether the page has a `<meta name="viewport">` tag',
          ],
          answer: 1,
          explanation:
            'Sticky is positioned against its nearest scrolling ancestor, and any overflow other than `visible` creates one, even if it never actually scrolls. If such a wrapper sits between the header and the document scroller, the header pins to that wrapper instead and appears not to work.',
        },
      ],
    },
  },
  {
    id: 'css-s24',
    title: 'CSS Overflow',
    description:
      'Deciding what happens when content does not fit: clip it, scroll it, or let it spill - and how to truncate a single line with an ellipsis.',
    lessons: [
      {
        id: 'css-l57',
        title: 'CSS Overflow',
        description:
          'The four overflow values, per-axis control, the three declarations behind a working text ellipsis, and the accessibility cost of clipping.',
        duration: 7,
        xp: 45,
        objectives: [
          'Choose between visible, hidden, auto and scroll for a container',
          'Control the two axes separately with overflow-x and overflow-y',
          'Truncate a single line with an ellipsis using the full three-declaration recipe',
          'Explain why overflow: hidden is a problem for keyboard users and find the alternatives',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l57-b1',
            body: 'Overflow is what happens when a box cannot contain its content. The content always has a size it would prefer, and **`overflow` decides whether that preference is honoured, hidden, or turned into a scrollbar**. The initial value is `visible`, which is why a long unbroken string is the usual reason a page suddenly has a horizontal scrollbar you did not write.',
          },
          {
            type: 'demo',
            id: 'c-l57-d1',
            title: 'visible, hidden, auto and scroll',
            body: 'All four boxes hold the same deliberately unbreakable string. `visible` lets it spill past the edge - nothing is lost, the layout is just broken. `hidden` clips it, so the text is genuinely gone. `auto` shows a scrollbar because the content does overflow. `scroll` reserves the scrollbar track permanently, whether or not the content needs it.',
            html: `<div class="demo-root ov">
  <p class="label">overflow: visible - content spills out</p>
  <div class="box vis">averyveryverylongunbreakablestringthatcannotfitinsideitsbox</div>

  <p class="label">overflow: hidden - clipped, and unreachable</p>
  <div class="box hid">averyveryverylongunbreakablestringthatcannotfitinsideitsbox</div>

  <p class="label">overflow: auto - scrollbar appears only because it is needed</p>
  <div class="box aut">averyveryverylongunbreakablestringthatcannotfitinsideitsbox</div>

  <p class="label">overflow: scroll - the track is always reserved</p>
  <div class="box scr">Short text, but the scrollbar track is there anyway.</div>
</div>`,
            css: `.ov {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  line-height: 1.5;
  padding: 0.5rem;
}
.ov .label {
  margin: 0.85rem 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.ov .label:first-child {
  margin-top: 0;
}
.ov .box {
  max-width: 260px;
  height: 42px;
  padding: 0.35rem 0.5rem;
  box-sizing: border-box;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-left: 3px solid #29e2bd;
  border-radius: 4px;
  white-space: nowrap;
  color: #e8edf4;
}
.ov .vis {
  overflow: visible;
  border-left-color: #1f6feb;
}
.ov .hid {
  overflow: hidden;
  border-left-color: #d64545;
}
.ov .aut {
  overflow: auto;
}
.ov .scr {
  overflow: scroll;
}`,
            height: 400,
          },
          {
            type: 'text',
            id: 'c-l57-b2',
            body: 'Compare the third and fourth boxes. Both say "make it scrollable", and the difference is the scrollbar track: `auto` only shows it when there is actually something to scroll to, `scroll` shows it always. On a container whose content changes size, `scroll` guarantees a stable gutter and never makes the page jump; on a fixed-size panel, `auto` looks cleaner. Both scroll with the keyboard and with a trackpad, which is the important part.',
          },
          {
            type: 'heading',
            id: 'c-l57-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l57-c1',
            language: 'css',
            title: 'The four values and the per-axis properties',
            code: `.a { overflow: visible; }   /* the default. content spills and is still selectable */

.b { overflow: hidden; }     /* clipped with no way to reach the clipped part */

.c { overflow: auto; }       /* a scrollbar only while there is something to scroll */

.d { overflow: scroll; }     /* the scrollbar track is always reserved */

/* the axes are separate properties and both accept the same four values */
.e {
  overflow-x: auto;   /* a long line pans horizontally */
  overflow-y: hidden; /* and vertical spill is silently dropped */
}`,
          },
          {
            type: 'list',
            id: 'c-l57-l1',
            style: 'bullet',
            items: [
              '**`visible` (the default)**  -  content is not clipped, so it renders outside the box and can overlap whatever comes next. It is correct for inline content that is merely long, and wrong for anything with a fixed size and a background.',
              '**`hidden`**  -  the box becomes a clip region. The overflowing content is not rendered and cannot be scrolled to, focused or selected. Use it for decorative bleed, never for text the user is supposed to read.',
              '**`auto`**  -  a scroll container that shows scrollbars only when the content exceeds the box. This is the default choice for a log view, a code pane or a wide table wrapper.',
              '**`scroll`**  -  the same scroll container, but the track is always present. Slightly uglier, but it never reflows when content changes, so it is better for a panel whose content grows and shrinks.',
              '**`overflow-x` and `overflow-y`**  -  the per-axis forms, and each takes the same four values. They are not fully independent: if one axis is set to a value other than `visible` and the other is left at `visible`, the browser computes the visible one as `auto` so the box stays usable.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l57-t1',
            title: 'The per-axis rules have a gotcha built in',
            body: 'Writing `overflow-x: hidden; overflow-y: auto` does not mean "hide sideways, scroll vertically". Because a box with a scrolling axis becomes a scroll container in both directions, the `visible` axis is computed to `auto` anyway. If you truly want to clip one axis silently and scroll the other, you need to scroll that other axis yourself - which is usually a sign you want `auto` on both and let the user decide.',
          },
          {
            type: 'heading',
            id: 'c-l57-h2',
            level: 3,
            body: 'Truncating a single line with an ellipsis',
          },
          {
            type: 'text',
            id: 'c-l57-b3',
            body: '`text-overflow: ellipsis` is the one property in CSS that does nothing on its own. It needs a constrained width, and it needs the text to be on one line, so it takes exactly three declarations and all three are load-bearing.',
          },
          {
            type: 'code',
            id: 'c-l57-c2',
            language: 'css',
            title: 'The complete ellipsis recipe',
            code: `.truncate {
  width: 200px;            /* 1. a real width: the text must be forced to overflow */
  white-space: nowrap;     /* 2. keep it on one line, so there is no second line to fall back to */
  overflow: hidden;        /* 3. clip the overflow, which is what the ellipsis replaces */
  text-overflow: ellipsis; /* the visible result */
}`,
          },
          {
            type: 'example',
            id: 'c-l57-e1',
            title: 'The same string with each declaration missing',
            body: 'The first line truncates correctly. The second has no width, so it never overflows and the ellipsis never appears. The third is missing `white-space: nowrap` and wraps to a second line instead. The fourth has the width but no `overflow: hidden`, so the text draws straight past the edge of the box.',
            html: `<div class="demo-root tx">
  <p class="label">All four declarations - truncates</p>
  <div class="tr good">Report-2026-10-final-v3-approved-by-the-steering-committee.pdf</div>

  <p class="label">No width - the ellipsis never triggers</p>
  <div class="tr no-width">Report-2026-10-final-v3-approved-by-the-steering-committee.pdf</div>

  <p class="label">No white-space: nowrap - it wraps instead</p>
  <div class="tr wrap">Report-2026-10-final-v3-approved-by-the-steering-committee.pdf</div>

  <p class="label">No overflow: hidden - it spills past the box</p>
  <div class="tr spill">Report-2026-10-final-v3-approved-by-the-steering-committee.pdf</div>
</div>`,
            css: `.tx {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  padding: 0.5rem;
}
.tx .label {
  margin: 0.85rem 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.tx .label:first-child {
  margin-top: 0;
}
.tx .tr {
  width: 200px;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-left: 3px solid #29e2bd;
  border-radius: 4px;
  padding: 0.35rem 0.5rem;
  color: #e8edf4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tx .no-width {
  width: auto;
  border-left-color: #1f6feb;
}
.tx .wrap {
  white-space: normal;
  border-left-color: #1f6feb;
}
.tx .spill {
  overflow: visible;
  border-left-color: #d64545;
}`,
            showPreview: true,
          },
          {
            type: 'warning',
            id: 'c-l57-w1',
            title: 'A clipped focus ring is an unreachable control',
            body: 'This is the accessibility trap with `overflow: hidden`. Anything that overflows is not just invisible - it cannot be focused, tabbed to, or read aloud, because the browser has no way to scroll it into view inside a box that refuses to scroll. If a control sits inside a clipping container and its ring or label extends past the edge, a keyboard user can never see where they are. The safer answers: let it wrap, use `-webkit-line-clamp` for a bounded multi-line truncation with a `title` attribute for the full value, or - best - provide a real expand and show control that makes the whole text reachable on demand.',
          },
          {
            type: 'tip',
            id: 'c-l57-t2',
            title: 'An ellipsis with no way to see the whole value is a dead end',
            body: 'A truncated filename with no tooltip and no expand control means the user cannot finish their task. Always pair `text-overflow: ellipsis` with a `title` attribute holding the full string, so hovering reveals it, and make sure the full value is also available in the DOM for anyone who cannot hover. If the value matters, show it by default.',
          },
          {
            type: 'exercise',
            id: 'c-l57-x1',
            exercise: {
              id: 'ex-l57',
              instructions:
                'Truncate the label below to a single 200px line ending in an ellipsis. Add a `title` attribute carrying the full text so the value is not a dead end.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<span class="label">Report-2026-10-final-v3-approved-by-the-steering-committee.pdf</span>\n',
                css: '.label {\n  display: inline-block;\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  border-radius: 4px;\n  padding: 0.3rem 0.5rem;\n  font-size: 13px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l57-t1',
                  label: 'The label is 200px wide',
                  body: 'return Math.abs(document.querySelector(".label").getBoundingClientRect().width - 200) < 2',
                },
                {
                  id: 'ex-l57-t2',
                  label: 'The text stays on one line',
                  body: 'return getComputedStyle(document.querySelector(".label")).whiteSpace === "nowrap"',
                },
                {
                  id: 'ex-l57-t3',
                  label: 'The overflow is clipped',
                  body: 'const s = getComputedStyle(document.querySelector(".label")); return s.overflow === "hidden" || s.overflowX === "hidden" || s.overflowY === "hidden"',
                },
                {
                  id: 'ex-l57-t4',
                  label: 'The overflow is shown as an ellipsis',
                  body: 'return getComputedStyle(document.querySelector(".label")).textOverflow === "ellipsis"',
                },
                {
                  id: 'ex-l57-t5',
                  label: 'The text really is truncated, not merely clipped',
                  body: 'const l = document.querySelector(".label"); return l.scrollWidth > l.clientWidth + 2 && l.clientHeight < 40',
                },
                {
                  id: 'ex-l57-t6',
                  label: 'The full value is available in a title attribute',
                  body: 'const t = document.querySelector(".label").getAttribute("title") || ""; return t.length > 20 && t.includes("steering-committee")',
                },
              ],
              hints: [
                'Three CSS declarations, all required: a constrained width, `white-space: nowrap`, and `overflow: hidden` before `text-overflow: ellipsis`.',
                'The element needs a definite width for the text to overflow at all. `display: inline-block` in the starter is what lets a width apply.',
                '`.label { width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }` plus a `title` attribute with the whole filename.',
              ],
              solution: {
                html: '<span class="label" title="Report-2026-10-final-v3-approved-by-the-steering-committee.pdf">Report-2026-10-final-v3-approved-by-the-steering-committee.pdf</span>\n',
                css: '.label {\n  display: inline-block;\n  width: 200px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  background: #1d2531;\n  color: #e8edf4;\n  border: 1px solid #2a3441;\n  border-radius: 4px;\n  padding: 0.3rem 0.5rem;\n  font-size: 13px;\n  vertical-align: bottom;\n}\n',
              },
              testNotes:
                'The fifth test is the one that proves the truncation is real: `scrollWidth` is the full unwrapped text width while `clientWidth` is the clipped 200px box, and the one-line height rules out a wrapped multi-line clip. The width test allows 2px of slack for the border, since `box-sizing` is not declared - add `box-sizing: border-box` if you want the outer edge to land exactly on 200px.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s24',
      title: 'CSS Overflow quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s24-q1',
          type: 'multiple-choice',
          prompt: 'What is the practical difference between `overflow: auto` and `overflow: scroll`?',
          options: [
            'None; both clip the content identically',
            'Both create a scroll container, but `scroll` always reserves the scrollbar track while `auto` only shows it when there is something to scroll to',
            '`auto` also clips the overflowing content, `scroll` lets it spill',
            '`scroll` only works on the vertical axis, `auto` on both',
          ],
          answer: 1,
          explanation:
            'Both make the box a scroll container. The difference is purely the scrollbar track: `auto` shows it on demand, `scroll` reserves it permanently. Use `scroll` when the content grows and shrinks and you do not want the layout to jump.',
        },
        {
          id: 'quiz-css-s24-q2',
          type: 'true-false',
          prompt: 'Content that is clipped by `overflow: hidden` can still be reached by tabbing to it and letting the browser scroll it into view.',
          answer: false,
          explanation:
            'A clipping container is not scrollable, so there is nowhere for the browser to scroll to. Anything clipped is unreachable: not focusable, not scrollable into view, not selectable, and not in the accessibility tree. That is the accessibility cost of `hidden`, and it is why truncating text needs a `title` or an expand control.',
        },
        {
          id: 'quiz-css-s24-q3',
          type: 'blank',
          prompt: 'Which property adds the three-dot truncation to text that is clipped on a single line?',
          answers: ['text-overflow', 'text-overflow: ellipsis'],
          explanation:
            '`text-overflow: ellipsis` draws the ellipsis, but it only works alongside a constrained width, `white-space: nowrap` and `overflow: hidden`. On its own it does nothing, which is the most common reason it appears not to work.',
        },
        {
          id: 'quiz-css-s24-q4',
          type: 'identify-error',
          prompt: 'The developer expected a horizontal scrollbar. Why is there not one?',
          code: '.wrap {\n  width: 300px;\n  overflow-x: hidden;\n  overflow-y: visible;\n}',
          options: [
            '`overflow-y: visible` is not a valid value',
            '`overflow-x` must be declared before `overflow-y` in the block',
            'Because once one axis is a scroll container, the `visible` axis is computed to `auto`, but `hidden` on x still clips instead of scrolling',
            'Because `width` must be set with `max-width` for scrolling to work',
          ],
          answer: 2,
          explanation:
            'The two axes are not fully independent: when one is set to a value other than `visible`, the other is computed to `auto` if it was left at `visible`, so the box remains a usable scroll container. Here `overflow-x: hidden` is the load-bearing value and it clips rather than scrolls, so no scrollbar appears. Use `overflow-x: auto` to get one.',
        },
        {
          id: 'quiz-css-s24-q5',
          type: 'multiple-choice',
          prompt: 'A long unbroken URL is forcing your whole page to scroll sideways. What is the least invasive fix?',
          options: [
            'Add `overflow: hidden` to the container, so the URL is clipped',
            'Add `overflow-wrap: break-word` (or `word-break: break-word`) so the URL can wrap',
            'Reduce the page font size until the URL fits',
            'Add `overflow: scroll` to `body` so the sideways scroll is at least intentional',
          ],
          answer: 1,
          explanation:
            'The URL is one unbreakable token, so it has a minimum width larger than its column. Letting it wrap at arbitrary points fixes the cause. `overflow: hidden` would hide part of the URL, which is a data loss problem, not a layout fix.',
        },
      ],
    },
  },
]
