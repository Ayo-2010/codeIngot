import type { Section } from '~/types/content'

export const cssFlexboxSections: Section[] = [
  {
    id: 'css-s69',
    title: 'CSS Flexbox',
    description:
      'The one-dimensional layout model: axes, direction and wrapping, the sizing properties on flex items, and the patterns that replace most of the layout tricks you used to write.',
    lessons: [
      {
        id: 'css-l111',
        title: 'CSS Flexbox',
        description:
          'The flex container, the two axes, and why flexbox solves one dimension at a time instead of both at once.',
        duration: 7,
        xp: 45,
        objectives: [
          'Turn an element into a flex container with display: flex',
          'Explain what a flex item is and which elements become one',
          'Name the main axis and the cross axis for a given flex-direction',
          'Say why flexbox is a one-dimensional layout model',
        ],
        quiz: {
          id: 'quiz-css-l111',
          title: 'CSS Flexbox quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l111-q1',
              type: 'multiple-choice',
              prompt: 'Which elements become flex items when you set `display: flex` on a parent?',
              options: [
                'The parent\'s direct children only',
                'Every descendant of the parent, at every depth',
                'Only the children that are block-level elements',
                'Any child that has a width set on it',
              ],
              answer: 0,
              explanation: 'Flex items are the direct children of the flex container. A grandchild lives inside a flex item and is laid out by its own parent\'s `display`, not by the outer flex context. This is why nesting a new `display: flex` deep inside a flex item starts a completely independent layout.',
            },
            {
              id: 'quiz-css-l111-q2',
              type: 'multiple-choice',
              prompt: 'Why is flexbox described as a one-dimensional layout model?',
              options: [
                'Because it only works in one browser dimension such as width',
                'Because it arranges items along one axis at a time, and stacks them along the other axis separately',
                'Because it can only ever produce a single row or a single column',
                'Because it cannot be nested inside another flexbox',
              ],
              answer: 1,
              explanation: 'Flexbox places items along the main axis first and then deals with the cross axis. It never tries to fill a two-dimensional area with tracked rows and columns, which is what CSS Grid is for. That single-axis focus is exactly why flexbox layouts are so predictable.',
            },
            {
              id: 'quiz-css-l111-q3',
              type: 'multiple-choice',
              prompt: 'How does `display: inline-flex` differ from `display: flex`?',
              options: [
                'Its children are laid out as blocks',
                'It disables the main axis',
                'It can only hold one child',
                'The container becomes inline-level, taking only the width it needs, while its children still flex',
              ],
              answer: 3,
              explanation: 'The children are laid out identically; the difference is the container itself, which sits in a line of text and shrinks to its content like an inline box.',
            },
            {
              id: 'quiz-css-l111-q4',
              type: 'multiple-choice',
              prompt: 'With `flex-direction: column`, which way does the cross axis run?',
              options: [
                'Left to right',
                'Top to bottom',
                'Bottom to top',
                'Right to left',
              ],
              answer: 0,
              explanation: 'A column flips the roles: the main axis runs top to bottom, so the cross axis runs left to right and `align-items` moves items horizontally.',
            },
            {
              id: 'quiz-css-l111-q5',
              type: 'multiple-choice',
              prompt: 'Two flex items each have `margin: 1rem`. How much space is between them in a flex row?',
              options: [
                '1rem, because the margins collapse',
                '0, because margins are ignored on flex items',
                '2rem, because flex items do not collapse margins',
                '4rem, because each margin is doubled',
              ],
              answer: 2,
              explanation: 'Margin collapsing does not happen inside a flex container, so both margins apply and add up. `gap` avoids the doubled spacing and the trailing edge gap.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l111-b1',
            body: 'Everything in this section comes from a single declaration on a single element: **`display: flex`**. That element becomes a *flex container*, and its direct children become *flex items*. Everything after that is the browser deciding how to share the container\'s space among those items.',
          },
          {
            type: 'demo',
            id: 'c-l111-d1',
            title: 'The same markup, as blocks and as flex items',
            body: 'Both columns hold identical markup. On the left the children are block-level, so each one takes the full width and stacks on its own line. On the right the parent is `display: flex`, so the same children sit on one row and share the width.',
            html: `<div class="fbx-demo fbx-pair">
  <div class="fbx-side">
    <p class="fbx-label">display: block</p>
    <div class="fbx-stack">
      <div class="fbx-item">Item one</div>
      <div class="fbx-item">Item two</div>
      <div class="fbx-item">Item three</div>
    </div>
  </div>
  <div class="fbx-side">
    <p class="fbx-label">display: flex</p>
    <div class="fbx-stack fbx-row">
      <div class="fbx-item">Item one</div>
      <div class="fbx-item">Item two</div>
      <div class="fbx-item">Item three</div>
    </div>
  </div>
</div>`,
            css: `.fbx-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-pair {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}
.fbx-side {
  flex: 1 1 0;
}
.fbx-label {
  margin: 0 0 0.4rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.fbx-stack {
  /* no display declared here: these stay block-level */
}
.fbx-stack.fbx-row {
  display: flex;
}
.fbx-item {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 6px;
  padding: 0.5rem 0.6rem;
  color: #e8edf4;
  font-size: 13px;
}
.fbx-row .fbx-item {
  flex: 1 1 0;
  border-color: #29e2bd;
  text-align: center;
}`,
            height: 150,
          },
          {
            type: 'text',
            id: 'c-l111-b2',
            body: 'Nothing about the children changed. Their margins, padding, borders and font are all the same in both columns. The only difference is one declaration on the parent, and that is what moves three stacked blocks onto one horizontal row. This is the thing to internalise before touching any other flexbox property: **`display` on the parent is the whole switch.**',
          },
          {
            type: 'heading',
            id: 'c-l111-h1',
            level: 3,
            body: 'Main axis and cross axis',
          },
          {
            type: 'text',
            id: 'c-l111-b3',
            body: 'A flex container has two axes, and which physical direction each one runs in depends on `flex-direction`. The **main axis** is the direction items are placed in and along which they are distributed. The **cross axis** is perpendicular to it, and it is the direction items are aligned in and stacked along when they wrap. Every alignment property in flexbox is named after one of these two axes, so the words are not decoration - they tell you which direction a property moves things.',
          },
          {
            type: 'code',
            id: 'c-l111-c1',
            language: 'css',
            title: 'The switch and the axis it sets',
            code: `.row {
  display: flex;
  /* flex-direction defaults to row: main axis runs left to right,
     cross axis runs top to bottom */
}
.row.reverse {
  flex-direction: row-reverse;  /* main axis now runs right to left */
}
.column {
  display: flex;
  flex-direction: column;       /* main axis runs top to bottom,
                                   cross axis runs left to right */
}`,
          },
          {
            type: 'list',
            id: 'c-l111-l1',
            style: 'bullet',
            items: [
              '**`display: flex`** makes the element a flex container. Its *direct* children become flex items. Grandchildren are not flex items - they are inside an item, so they are laid out by whatever their own parent\'s `display` says.',
              '**`display: inline-flex`** does the same thing but makes the container itself an inline-level box, so it only takes the width its content needs and can sit in a line of text. The flex layout of the children is identical.',
              '**The main axis** is set by `flex-direction`. `row` (the default) and `row-reverse` put it horizontally; `column` and `column-reverse` put it vertically. The `-reverse` variants run from the end instead of the start, and they move the layout without touching the DOM order.',
              '**The cross axis** is always the other one. `justify-content` distributes along the main axis; `align-items` and `align-content` work along the cross axis.',
              '**Flexbox is one-dimensional.** It arranges items along one axis *now* and the other *afterwards*. It does not try to fill a two-dimensional area with rows and columns the way CSS Grid does. That is not a limitation you have to work around - it is why flexbox is so predictable: one axis, one set of rules.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l111-t1',
            title: 'Say the axes out loud before you write the property',
            body: 'Before typing any alignment rule, ask which axis you are moving things along. "I want these three to spread out left to right" means the main axis is a row, so it is `justify-content`. "I want them to hug the bottom" means the cross axis, so it is `align-items`. Choosing the right axis by name is faster than trying properties until one works.',
          },
          {
            type: 'warning',
            id: 'c-l111-w1',
            title: 'display: flex silently kills margins between siblings',
            body: 'Vertical margins between block siblings collapse, so in a normal block stack `margin-bottom: 1rem` and `margin-top: 1rem` on adjacent items give you 1rem of gap, not 2rem. Flex items do not collapse margins, so the same code now gives you 2rem - and it differs between a row and a column layout. This is why `gap` exists, and why you should reach for it instead of margins between flex items.',
          },
          {
            type: 'example',
            id: 'c-l111-e1',
            title: 'A row of equal-width items',
            body: 'Three items with `flex: 1 1 0` divide the row into three identical parts regardless of their content length, because the `1 1 0` basis tells flexbox to ignore the starting width and share the space equally. This is the single most common flexbox pattern there is.',
            html: `<div class="fbx-demo fbx-equal">
  <div class="fbx-equally">Deploy</div>
  <div class="fbx-equally">Configuration for the production environment</div>
  <div class="fbx-equally">Logs</div>
</div>`,
            css: `.fbx-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-equal {
  display: flex;
  gap: 0.75rem;
}
.fbx-equally {
  flex: 1 1 0;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-left: 3px solid #29e2bd;
  border-radius: 6px;
  padding: 0.6rem 0.7rem;
  font-size: 13px;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l111-x1',
            exercise: {
              id: 'ex-l111',
              instructions:
                'Turn the `.stack` element below into a flex container so its three children sit on a single row instead of stacking.',
              languages: ['css'],
              starterCode: {
                html: '<div class="stack">\n  <div class="cell">One</div>\n  <div class="cell">Two</div>\n  <div class="cell">Three</div>\n</div>',
                css: '.stack {\n  background: #141922;\n}\n.cell {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.5rem 0.7rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l111-t1',
                  label: 'The container is a flex container',
                  body: 'return getComputedStyle(document.querySelector(".stack")).display === "flex"',
                },
                {
                  id: 'ex-l111-t2',
                  label: 'The children now sit side by side',
                  body: 'const cells = document.querySelectorAll(".cell"); const a = cells[0].getBoundingClientRect(); const b = cells[1].getBoundingClientRect(); return b.left >= a.right - 1',
                },
                {
                  id: 'ex-l111-t3',
                  label: 'All three children are still present',
                  body: 'return document.querySelectorAll(".stack > .cell").length === 3',
                },
              ],
              hints: [
                'The declaration goes on the parent, not on the children.',
                'The value is the single keyword `flex`.',
                '`.stack { display: flex; }`',
              ],
              solution: {
                html: '<div class="stack">\n  <div class="cell">One</div>\n  <div class="cell">Two</div>\n  <div class="cell">Three</div>\n</div>',
                css: '.stack {\n  display: flex;\n  background: #141922;\n  gap: 0.5rem;\n}\n.cell {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.5rem 0.7rem;\n}\n',
              },
              testNotes:
                'The first test reads the computed `display` on the container. The second measures the live boxes: if the children have not been placed side by side, the second cell\'s left edge is at or below the first cell\'s right edge. The third test stops you from deleting the elements you were asked to lay out.',
            },
          },
        ],
      },
      {
        id: 'css-l112',
        title: 'Flex Direction and Wrap',
        description:
          'Choosing the direction the main axis runs, letting items flow onto more lines, and using `gap` instead of margins to space them.',
        duration: 7,
        xp: 45,
        objectives: [
          'Set the main axis with flex-direction and its four values',
          'Track how the meaning of the main and cross axes changes with the direction',
          'Let items flow onto a new line with flex-wrap and flex-wrap: wrap-reverse',
          'Space items with gap and explain why it beats margins for this job',
        ],
        quiz: {
          id: 'quiz-css-l112',
          title: 'Flex Direction and Wrap quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l112-q1',
              type: 'true-false',
              prompt: 'With `flex-direction: column`, the main axis runs from top to bottom.',
              answer: true,
              explanation: 'Yes. `column` puts the main axis vertically and the cross axis horizontally, which means `justify-content` moves items up and down and `align-items` moves them left and right. Flip to `column-reverse` and the main axis runs bottom to top, so the same properties push items the other way.',
            },
            {
              id: 'quiz-css-l112-q2',
              type: 'multiple-choice',
              prompt: 'What is the default value of `flex-wrap`?',
              options: [
                '`nowrap`',
                '`wrap`',
                '`wrap-reverse`',
                '`inherit`',
              ],
              answer: 0,
              explanation: '`nowrap` is the default, so items are squeezed onto one line and shrink to fit rather than moving onto a new line.',
            },
            {
              id: 'quiz-css-l112-q3',
              type: 'multiple-choice',
              prompt: 'What does `flex-wrap: wrap-reverse` do?',
              options: [
                'It reverses the order of the items on each line',
                'It makes the container scroll vertically',
                'It stacks new lines from the bottom up, so the first line ends up underneath',
                'It only wraps when the items are reversed',
              ],
              answer: 2,
              explanation: 'The items keep their order within a line, but the lines themselves start at the bottom, which inverts which line counts as the first one.',
            },
            {
              id: 'quiz-css-l112-q4',
              type: 'multiple-choice',
              prompt: 'A row has `flex-wrap: wrap` but nothing ever wraps. What is the likely reason?',
              options: [
                '`gap` is set on the container',
                'The items can shrink, so they squeeze to fit instead of moving to a new line',
                '`flex-direction` is `row`',
                'The container has a background colour',
              ],
              answer: 1,
              explanation: 'Shrinking is considered before wrapping, so items with the default `flex-shrink: 1` compress first. Give them a floor with `flex: 0 0 auto` or a `min-width`.',
            },
            {
              id: 'quiz-css-l112-q5',
              type: 'multiple-choice',
              prompt: 'What is the accessibility cost of `flex-direction: row-reverse`?',
              options: [
                'The links lose their focus styles',
                'The container stops wrapping',
                'The items can no longer be clicked',
                'Visual order no longer matches DOM order, so tab and screen-reader order disagree with the screen',
              ],
              answer: 3,
              explanation: 'Reversing the direction reorders the screen without touching the DOM, so keyboard focus and screen reader order follow the original markup rather than what is seen.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l112-b1',
            body: 'Every alignment property in flexbox is relative to the main axis, so you cannot use flexbox until you know which way that axis is pointing. **`flex-direction` decides it**, and it is worth reading as two pieces of information at once: the base direction, and whether the start is the end.',
          },
          {
            type: 'demo',
            id: 'c-l112-d1',
            title: 'The four directions side by side',
            body: 'The same five items under each of the four `flex-direction` values. The arrows on the left show where the main axis runs for each one, and note how the cross axis flips to stay perpendicular.',
            html: `<div class="fbx-dir-demo">
  <div class="fbx-dir">
    <span class="fbx-tag">row</span>
    <span class="fbx-axis">main &#8594;</span>
    <div class="fbx-bar fbx-row"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div>
  </div>
  <div class="fbx-dir">
    <span class="fbx-tag">row-reverse</span>
    <span class="fbx-axis">main &#8592;</span>
    <div class="fbx-bar fbx-rev"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div>
  </div>
  <div class="fbx-dir">
    <span class="fbx-tag">column</span>
    <span class="fbx-axis">main &#8595;</span>
    <div class="fbx-bar fbx-col"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div>
  </div>
  <div class="fbx-dir">
    <span class="fbx-tag">column-reverse</span>
    <span class="fbx-axis">main &#8593;</span>
    <div class="fbx-bar fbx-col-rev"><i>1</i><i>2</i><i>3</i><i>4</i><i>5</i></div>
  </div>
</div>`,
            css: `.fbx-dir-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
.fbx-dir {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.fbx-tag {
  width: 108px;
  flex: none;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 11px;
  color: #29e2bd;
}
.fbx-axis {
  width: 62px;
  flex: none;
  font-size: 11px;
  color: #9aa5b4;
}
.fbx-bar {
  display: flex;
  gap: 4px;
  flex: 1 1 0;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 4px;
  padding: 4px;
}
.fbx-bar i {
  font-style: normal;
  background: #1f6feb;
  color: #e8edf4;
  font-size: 11px;
  border-radius: 3px;
  padding: 2px 6px;
}
.fbx-row { flex-direction: row; }
.fbx-rev { flex-direction: row-reverse; justify-content: flex-end; }
.fbx-col { flex-direction: column; }
.fbx-col-rev { flex-direction: column-reverse; justify-content: flex-end; }
.fbx-col i, .fbx-col-rev i { align-self: flex-start; }`,
            height: 250,
          },
          {
            type: 'text',
            id: 'c-l112-b2',
            body: 'Two consequences of this are worth stating plainly. First, the physical words *horizontal* and *vertical* are useless on their own - `justify-content` always means the main axis and `align-items` always means the cross axis, whatever those happen to be. Second, the `-reverse` values reorder the visual layout but leave the DOM order alone, which means keyboard focus order and screen reader order no longer match what you see.',
          },
          {
            type: 'heading',
            id: 'c-l112-h1',
            level: 3,
            body: 'Wrapping onto new lines',
          },
          {
            type: 'text',
            id: 'c-l112-b3',
            body: 'By default a flex container is **`flex-wrap: nowrap`**: items are forced onto one line and shrink to fit rather than overflow. Turn on `wrap` and items that no longer fit move down onto a new line instead. This is what makes a "responsive row" possible with no media query at all - the container responds to the space it actually has.',
          },
          {
            type: 'demo',
            id: 'c-l112-d2',
            title: 'A row that wraps when it runs out of room',
            body: 'The two rows hold the same six items. The top one is `nowrap`, so the items are squeezed onto a single line. The bottom one is `wrap`, so items drop onto a second line once they stop fitting. The dashed outlines show where each line begins and ends.',
            html: `<div class="fbx-wrap-demo">
  <p class="fbx-wlabel">flex-wrap: nowrap (the default)</p>
  <div class="fbx-nowrap">
    <div class="fbx-chip">Overview</div>
    <div class="fbx-chip">Activity</div>
    <div class="fbx-chip">Members</div>
    <div class="fbx-chip">Settings</div>
    <div class="fbx-chip">Billing</div>
    <div class="fbx-chip">Audit log</div>
  </div>
  <p class="fbx-wlabel">flex-wrap: wrap</p>
  <div class="fbx-wrapping">
    <div class="fbx-chip">Overview</div>
    <div class="fbx-chip">Activity</div>
    <div class="fbx-chip">Members</div>
    <div class="fbx-chip">Settings</div>
    <div class="fbx-chip">Billing</div>
    <div class="fbx-chip">Audit log</div>
  </div>
</div>`,
            css: `.fbx-wrap-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-wlabel {
  margin: 0 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.fbx-nowrap,
.fbx-wrapping {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
  padding: 5px;
  outline: 1px dashed #2a3441;
  border-radius: 4px;
}
.fbx-nowrap { flex-wrap: nowrap; }
.fbx-wrapping { flex-wrap: wrap; }
.fbx-chip {
  flex: 0 0 auto;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 999px;
  padding: 0.25rem 0.6rem;
  font-size: 12px;
  color: #e8edf4;
  white-space: nowrap;
}`,
            height: 190,
          },
          {
            type: 'code',
            id: 'c-l112-c1',
            language: 'css',
            title: 'Direction, wrapping and the shorthand',
            code: `.row {
  display: flex;
  flex-direction: row;      /* the default */
  flex-wrap: wrap;         /* the second half of flex-flow */
  flex-flow: row wrap;     /* direction then wrap, as one declaration */
}

.col {
  display: flex;
  flex-flow: column nowrap; /* shorthand form, saying nothing explicitly */
}

/* wrap-reverse is the one to know about and the one to use carefully:
   new lines stack from the bottom, which inverts which line is "first" */
.reverse-lines {
  display: flex;
  flex-wrap: wrap-reverse;
}

/* spacing between items - one declaration, no trailing-edge gap */
.row {
  gap: 0.75rem;            /* both axes. row-gap / column-gap set them apart */
}`,
          },
          {
            type: 'list',
            id: 'c-l112-l1',
            style: 'bullet',
            items: [
              '**`flex-direction: row`** (the default) - main axis horizontal, items left to right.',
              '**`row-reverse`** - main axis horizontal, items right to left. Same layout, reversed start.',
              '**`flex-direction: column`** - main axis vertical, items top to bottom. This is how you stack a sidebar next to content.',
              '**`column-reverse`** - main axis vertical, items bottom to top. Rare, but it is the correct tool for pinning the first item to the end of a container.',
              '**`flex-wrap: wrap`** - items that do not fit move onto a new line. **`wrap-reverse`** does the same thing but stacks the new lines from the bottom up, so the first line ends up underneath.',
              '**`flex-flow: <direction> <wrap>`** is the shorthand for the two. Write it as `flex-flow: row wrap`; the order is direction first, then wrap, and both parts are optional.',
              '**`gap`** sets the space *between* items on both axes. `row-gap` and `column-gap` set them independently, and both are physical: `row-gap` is vertical for a row container, horizontal for a column container.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l112-t1',
            title: 'gap, not margins',
            body: 'Margins on flex items add up from both sides, so a row of items with `margin: 0.5rem` gets 1rem between neighbours but a half-rem gap at each end of the container. `gap: 0.5rem` gives you 0.5rem between items and nothing at the edges, which is what you actually want. It also has no effect on the last line of a wrapped row, and it needs no `:first-child` or `:last-child` cleanup.',
          },
          {
            type: 'warning',
            id: 'c-l112-w1',
            title: 'wrap only works when items are allowed to stay at their size',
            body: 'If the items have `flex-shrink: 1` (the default) they will squeeze to fit on one line rather than wrap, because shrinking happens before wrapping is considered. That is why `nowrap` and `wrap` can look identical. Give the items a floor - `flex: 0 0 auto`, a `min-width`, or a `flex-basis` - and the wrap will actually happen.',
          },
          {
            type: 'example',
            id: 'c-l112-e1',
            title: 'Tags that wrap and stay right-aligned',
            body: 'The container wraps and puts the first line at the bottom using `wrap-reverse`, and `align-content: flex-end` pushes those lines to the bottom of the fixed-height box. This is how you get a caption or a set of chips anchored to the bottom of a card.',
            html: `<div class="fbx-foot-demo">
  <div class="fbx-foot">
    <div class="fbx-tag2">alpha</div>
    <div class="fbx-tag2">beta</div>
    <div class="fbx-tag2">gamma</div>
    <div class="fbx-tag2">delta</div>
    <div class="fbx-tag2">epsilon</div>
    <div class="fbx-tag2">zeta</div>
  </div>
</div>`,
            css: `.fbx-foot-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-foot {
  display: flex;
  flex-wrap: wrap-reverse;  /* new lines stack upward */
  align-content: flex-end;  /* and the whole group hugs the bottom */
  justify-content: flex-end;
  gap: 0.35rem;
  height: 90px;
  border: 1px dashed #2a3441;
  border-radius: 6px;
  padding: 0.5rem;
}
.fbx-tag2 {
  flex: 0 0 auto;
  background: #1d2531;
  border: 1px solid #29e2bd;
  color: #e8edf4;
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
  font-size: 12px;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l112-x1',
            exercise: {
              id: 'ex-l112',
              instructions:
                'Make `.toolbar` a vertical flex container whose items sit in a column, and give it a `gap` of `12px` so the items are evenly separated.',
              languages: ['css'],
              starterCode: {
                html: '<div class="toolbar">\n  <div class="btn">New</div>\n  <div class="btn">Open</div>\n  <div class="btn">Save</div>\n  <div class="btn">Close</div>\n</div>',
                css: '.toolbar {\n  background: #141922;\n  display: flex;\n}\n.btn {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.4rem 0.8rem;\n  color: #e8edf4;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l112-t1',
                  label: 'The main axis is a column',
                  body: 'return getComputedStyle(document.querySelector(".toolbar")).flexDirection === "column"',
                },
                {
                  id: 'ex-l112-t2',
                  label: 'A real gap is set, not left to normal',
                  body: 'const g = getComputedStyle(document.querySelector(".toolbar")).gap; return g !== "normal" && parseFloat(g) === 12',
                },
                {
                  id: 'ex-l112-t3',
                  label: 'The items really are stacked vertically',
                  body: 'const cells = document.querySelectorAll(".btn"); const a = cells[0].getBoundingClientRect(); const b = cells[1].getBoundingClientRect(); return b.top >= a.bottom - 1',
                },
              ],
              hints: [
                'The property that sets the main axis is `flex-direction`, and its column value is the single keyword `column`.',
                '`gap` accepts a length directly - `gap: 12px` - and applies to both axes at once.',
                '`.toolbar { flex-direction: column; gap: 12px; }`',
              ],
              solution: {
                html: '<div class="toolbar">\n  <div class="btn">New</div>\n  <div class="btn">Open</div>\n  <div class="btn">Save</div>\n  <div class="btn">Close</div>\n</div>',
                css: '.toolbar {\n  background: #141922;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.btn {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.4rem 0.8rem;\n  color: #e8edf4;\n}\n',
              },
              testNotes:
                'The second test checks both that `gap` is not the default `normal` and that it parses to 12, so a `column-gap` of `2rem` does not pass. The third test measures the live boxes to confirm the items are stacked rather than merely declared as a column.',
            },
          },
        ],
      },
      {
        id: 'css-l113',
        title: 'Flex Items',
        description:
          'How items are sized along the main axis: flex-grow, flex-shrink, flex-basis, the shorthand, order, and every alignment property on both axes.',
        duration: 9,
        xp: 55,
        objectives: [
          'Size flex items with flex-grow, flex-shrink and flex-basis and predict the result',
          'Read the flex shorthand in its order: grow, shrink, basis',
          'Explain why flex-basis beats width on a flex item',
          'Distinguish justify-content, align-items, align-self, align-content and justify-self',
          'Reorder items with order and explain the accessibility cost',
        ],
        quiz: {
          id: 'quiz-css-l113',
          title: 'Flex Items quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l113-q1',
              type: 'blank',
              prompt: 'Which property makes the main axis run horizontally from right to left instead of left to right?',
              answers: [
                'flex-direction: row-reverse',
                'row-reverse',
              ],
              explanation: '`flex-direction: row-reverse` reverses the start and end of the main axis without changing the DOM order of the items. `justify-content` still distributes along the main axis, but `flex-start` now means the right edge - which is a frequent source of confusion.',
            },
            {
              id: 'quiz-css-l113-q2',
              type: 'multiple-choice',
              prompt: 'What is the difference between `flex: 1 1 0` and `flex: 1 1 auto`?',
              options: [
                'The first never shrinks',
                '`auto` prevents the item from growing',
                'A zero basis ignores content so items come out exactly equal, while `auto` starts from content width',
                'The first only works in a column container',
              ],
              answer: 2,
              explanation: 'With a zero basis all the space is shared by grow factor alone, so items are identical. With `auto` each item starts at its content width and a long label keeps an advantage.',
            },
            {
              id: 'quiz-css-l113-q3',
              type: 'multiple-choice',
              prompt: 'An item has `width: 200px` and `flex-basis: 60px`. How wide does it start?',
              options: [
                '200px, because `width` wins',
                '60px, because `flex-basis` beats `width` on a flex item',
                '260px, the two added together',
                'It depends on the container height',
              ],
              answer: 1,
              explanation: 'The flex sizing algorithm reads the basis first, so `flex-basis` overrides `width` on a flex item. Use `width` only when the item is not being flexed.',
            },
            {
              id: 'quiz-css-l113-q4',
              type: 'multiple-choice',
              prompt: 'Why does `justify-self` do nothing on a flex item?',
              options: [
                'It is a grid property; flexbox has no per-item control on the main axis',
                'It only applies to absolutely positioned elements',
                'It needs `!important` to take effect',
                'It must be set on the container instead',
              ],
              answer: 0,
              explanation: 'Main-axis space is shared by `flex-grow` and then positioned for all items by `justify-content`. The per-item override exists only on the cross axis, as `align-self`.',
            },
            {
              id: 'quiz-css-l113-q5',
              type: 'multiple-choice',
              prompt: 'When does `align-content` have any effect?',
              options: [
                'Always, on every flex container',
                'Only in a column container',
                'Only when `align-items: stretch` is set',
                'Only when the items wrap onto more than one line',
              ],
              answer: 3,
              explanation: '`align-content` distributes wrapped lines along the cross axis. With a single line there is nothing to distribute, so the property does nothing.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l113-b1',
            body: 'The container decides the direction and the distribution; the *items* decide how much of that space they take. That is the job of three properties, and understanding their order of operations is most of what there is to know about flexbox sizing.',
          },
          {
            type: 'demo',
            id: 'c-l113-d1',
            title: 'The same two items, five different sizing rules',
            body: 'Each row is an independent flex container holding the same two items. Read them left to right: fixed size, then grow only, then no shrink, then an explicit basis that overrides width, and finally `flex: 1` making both items equal regardless of content.',
            html: `<div class="fbx-size-demo">
  <div class="fbx-case">
    <span class="fbx-clabel">flex: 0 0 140px</span>
    <div class="fbx-crow"><div class="fbx-a">A</div><div class="fbx-b">B with a much longer label</div></div>
  </div>
  <div class="fbx-case">
    <span class="fbx-clabel">flex-grow: 1 on both</span>
    <div class="fbx-crow"><div class="fbx-a grow">A</div><div class="fbx-b grow">B with a much longer label</div></div>
  </div>
  <div class="fbx-case">
    <span class="fbx-clabel">flex: 1 0 auto (no shrink)</span>
    <div class="fbx-crow"><div class="fbx-a noshrink">A</div><div class="fbx-b noshrink">B with a much longer label</div></div>
  </div>
  <div class="fbx-case">
    <span class="fbx-clabel">flex-basis: 60px, width: 200px</span>
    <div class="fbx-crow"><div class="fbx-a basis">A</div><div class="fbx-b basis">B</div></div>
  </div>
  <div class="fbx-case">
    <span class="fbx-clabel">flex: 1 1 0 on both</span>
    <div class="fbx-crow"><div class="fbx-a equal">A</div><div class="fbx-b equal">B with a much longer label</div></div>
  </div>
</div>`,
            css: `.fbx-size-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.fbx-case {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.fbx-clabel {
  width: 190px;
  flex: none;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 10px;
  color: #9aa5b4;
}
.fbx-crow {
  display: flex;
  flex: 1 1 0;
  gap: 4px;
  min-width: 0;
}
.fbx-a, .fbx-b {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  font-size: 11px;
  overflow: hidden;
  white-space: nowrap;
}
.fbx-crow > * { flex: 0 0 140px; }
.fbx-crow > .grow { flex-grow: 1; }
.fbx-crow > .noshrink { flex-shrink: 0; }
.fbx-crow > .basis { flex: 0 0 60px; width: 200px; }
.fbx-crow > .equal { flex: 1 1 0; }`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l113-b2',
            body: 'Row three is the one that surprises people: setting `flex-shrink: 0` stops the items compressing, and because the container is still `nowrap` by default, the wide item simply overflows instead. Row four shows the precedence rule - `flex-basis` wins over `width` for a flex item, so each item is 60px wide on screen even though the stylesheet says `width: 200px`.',
          },
          {
            type: 'heading',
            id: 'c-l113-h1',
            level: 3,
            body: 'The three sizing properties',
          },
          {
            type: 'code',
            id: 'c-l113-c1',
            language: 'css',
            title: 'The shorthand, in order',
            code: `/* THE ORDER MATTERS: flex: <grow> <shrink> <basis> */
.item       { flex: 1 1 0;      /* grow equally, shrink equally, ignore content */
.fixed      { flex: 0 0 140px;  /* never grow, never shrink, exactly 140px */
.automatic  { flex: 1 1 auto;   /* grow and shrink, but start from content width */
.default    { flex: 0 1 auto;   /* what every item gets if you set nothing */
.nonshrink  { flex: 1 0 auto; } /* grow when there is room, never compress */

/* long form - exactly the same as flex: 1 1 0 */
.longhand {
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
}

/* the ONE value keyword */
.auto { flex: auto; }        /* 1 1 auto */
.none { flex: none; }        /* 0 0 auto */`,
          },
          {
            type: 'list',
            id: 'c-l113-l1',
            style: 'bullet',
            items: [
              '**`flex-grow`** - a unitless number saying how much of the leftover space this item absorbs. `flex-grow: 0` (the default) means the item does not grow at all. Only *leftover* space is distributed, so items with different content still differ unless grow is equal.',
              '**`flex-shrink`** - how much an item may compress when the container is too small, weighted against the other items. `0` means it refuses to shrink and will overflow instead.',
              '**`flex-basis`** - the size the item starts at *before* grow and shrink are applied. `auto` means "use my `width` or my content". A length like `200px` means "pretend I am 200px wide, then distribute from there".',
              '**`flex-basis` beats `width`** on a flex item. The sizing algorithm reads the basis first, so in the demo above `width: 200px` is ignored in favour of `flex-basis: 60px`. Use `width` for a single fixed item and `flex-basis` when the item is going to be flexed.',
              '**The order of operations** is: measure each item at its basis, then shrink any items that overflow (weighted by `flex-shrink`), then hand out any remaining space (weighted by `flex-grow`). Growing happens strictly after shrinking, which is why a row of `flex: 1 1 0` items comes out exactly equal.',
              '**`flex: 1 1 0` versus `flex: 1 1 auto`** is the distinction that matters most. A basis of `0` means content is ignored and space is split purely by grow factor, so the items are exactly equal. A basis of `auto` means each item starts at its content width and then grows, so a long label still gets more.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l113-t1',
            title: 'Order reorders the screen, not the document',
            body: '`order` changes only the visual sequence. The DOM order - which is what tab order, screen readers and find-in-page all follow - is untouched. Reordering navigation so the visually-first link is last in the markup is a real bug for keyboard and screen reader users, not a matter of taste. If items need a different visual arrangement, change the markup order instead.',
          },
          {
            type: 'warning',
            id: 'c-l113-w1',
            title: 'justify-self does nothing on a flex item',
            body: '`justify-self` is a grid property. Flexbox has no per-item control along the main axis, because the main axis space is shared out by `flex-grow` and then positioned for everyone at once with `justify-content`. The per-item escape hatch exists on the *cross* axis only, and it is called `align-self`. If you reach for `justify-self` on a flex item, the rule is silently dropped.',
          },
          {
            type: 'heading',
            id: 'c-l113-h2',
            level: 3,
            body: 'Every alignment property, and which axis it moves',
          },
          {
            type: 'text',
            id: 'c-l113-b3',
            body: 'Five properties do the positioning, and the only reliable way to keep them straight is to remember which axis each one owns. Note that `align-items` and `justify-content` live on the *container*, while `align-self` lives on the *item* and overrides the container for one item.',
          },
          {
            type: 'list',
            id: 'c-l113-l2',
            style: 'bullet',
            items: [
              '**`justify-content`** (container, main axis) - distributes the items along the main axis: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`. `space-between` puts the first item at the start and the last at the end with all slack in between; `space-around` gives each item equal space on both sides, so the edges get half a share.',
              '**`align-items`** (container, cross axis) - aligns each item within its line: `stretch` (the default, which is why flex items fill their line vertically in a row), `flex-start`, `flex-end`, `center`, `baseline`, `stretch`. `baseline` aligns the first lines of the items\' text, which is what you want in a row of mixed font sizes.',
              '**`align-self`** (item, cross axis) - the same values as `align-items`, applied to one item and overriding the container. This is how you raise a single badge to the top of a row without touching the others.',
              '**`align-content`** (container, cross axis, *only when items wrap*) - distributes the wrapped *lines* along the cross axis. With a single line it has no effect at all, because there is nothing to distribute. Values: `stretch`, `flex-start`, `center`, `space-between` and friends.',
              '**`place-items`** (container) - shorthand for `align-items` and `justify-content`. `place-items: center` is the two-value form (`align-items` first, then `justify-content`); `place-items: center center` names both axes explicitly. There is also `place-content` for `align-content` + `justify-content`, and `place-self` for the item-level pair.',
              '**`order`** (item) - a plain integer, default `0`. Lower numbers come first, so `order: -1` pulls one item to the front of a row. Negative values work; fractional values do not.',
            ],
          },
          {
            type: 'example',
            id: 'c-l113-e1',
            title: 'A row with one stretched sidebar and a top-aligned badge',
            body: 'The sidebar grows to fill the row via `flex: 1`, the label stays at its content width, and the badge overrides the row\'s `align-items: center` with `align-self: flex-start` so it sits at the top. The `baseline` alignment on the icon keeps it lined up with the text beside it.',
            html: `<div class="fbx-items-demo fbx-card">
  <div class="fbx-icon">01</div>
  <div class="fbx-text">
    <strong>Retry the import</strong>
    <span>Four rows were rejected by the validator. Fix the column mapping and run it again.</span>
  </div>
  <div class="fbx-badge">Action needed</div>
</div>`,
            css: `.fbx-items-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-card {
  display: flex;
  align-items: center;   /* the row default for this component */
  gap: 0.75rem;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
}
.fbx-icon {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;   /* override the row's centering for this one */
  background: #141922;
  border: 1px solid #29e2bd;
  color: #29e2bd;
  border-radius: 6px;
  font-family: ui-monospace, Consolas, monospace;
  font-size: 12px;
}
.fbx-text {
  flex: 1 1 auto;         /* take the leftover width */
  min-width: 0;           /* let the text actually shrink instead of overflowing */
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}
.fbx-text strong {
  color: #e8edf4;
  font-weight: 600;
}
.fbx-text span {
  color: #9aa5b4;
  font-size: 12px;
}
.fbx-badge {
  flex: 0 0 auto;
  background: #1f6feb;
  color: #e8edf4;
  border-radius: 999px;
  padding: 0.15rem 0.55rem;
  font-size: 11px;
  white-space: nowrap;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l113-t2',
            title: 'Add min-width: 0 to growing text items',
            body: 'A flex item will not shrink below its own minimum content size by default, so a long unbroken string or an image in a `flex: 1` item can push the whole row wider than the container. Setting `min-width: 0` on the growing item lets it actually compress and lets `overflow: hidden` or `text-overflow: ellipsis` do their job.',
          },
          {
            type: 'exercise',
            id: 'c-l113-x1',
            exercise: {
              id: 'ex-l113',
              instructions:
                'Make the two `.cell` items split the row equally regardless of how much text each contains, and make them both shrink when the row gets tight.',
              languages: ['css'],
              starterCode: {
                html: '<div class="row">\n  <div class="cell">Short</div>\n  <div class="cell">A considerably longer piece of text that would otherwise dominate the row</div>\n</div>',
                css: '.row {\n  display: flex;\n  gap: 8px;\n}\n.cell {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.5rem 0.7rem;\n  color: #e8edf4;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l113-t1',
                  label: 'The cells grow equally',
                  body: 'const cells = document.querySelectorAll(".cell"); return getComputedStyle(cells[0]).flexGrow === "1" && getComputedStyle(cells[1]).flexGrow === "1"',
                },
                {
                  id: 'ex-l113-t2',
                  label: 'The cells can still shrink',
                  body: 'const cells = document.querySelectorAll(".cell"); return getComputedStyle(cells[0]).flexShrink === "1"',
                },
                {
                  id: 'ex-l113-t3',
                  label: 'The basis is zero, so content length is ignored',
                  body: 'const cells = document.querySelectorAll(".cell"); return getComputedStyle(cells[0]).flexBasis === "0px"',
                },
                {
                  id: 'ex-l113-t4',
                  label: 'The two cells really are the same width on screen',
                  body: 'const cells = document.querySelectorAll(".cell"); const a = cells[0].getBoundingClientRect().width; const b = cells[1].getBoundingClientRect().width; return Math.abs(a - b) < 1.5',
                },
              ],
              hints: [
                'The shorthand is `flex: <grow> <shrink> <basis>`.',
                'For a basis of zero you can write `0`, and the computed value will come back as `0px`.',
                '`.cell { flex: 1 1 0; }`',
              ],
              solution: {
                html: '<div class="row">\n  <div class="cell">Short</div>\n  <div class="cell">A considerably longer piece of text that would otherwise dominate the row</div>\n</div>',
                css: '.row {\n  display: flex;\n  gap: 8px;\n}\n.cell {\n  flex: 1 1 0;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.5rem 0.7rem;\n  color: #e8edf4;\n}\n',
              },
              testNotes:
                'The first three tests read the longhand computed values, so any spelling of the shorthand passes. A `flex: 1` shorthand fails test three, because it expands to `1 1 0%` and its computed `flex-basis` comes back as `0%` rather than `0px`, and it fails test four only if the two cells were left at different widths. The fourth test measures the rendered boxes, which is what catches the common mistake of setting `flex-grow` on its own and leaving the basis at `auto`.',
            },
          },
        ],
      },
      {
        id: 'css-l114',
        title: 'Flexbox Layout Examples',
        description:
          'Four complete patterns that cover most real interface work: a centred card, a navbar with a pushed-right group, a wrap row that needs no media query, and a full-height column with a pinned footer.',
        duration: 10,
        xp: 60,
        objectives: [
          'Centre a single child on both axes with place-items: center',
          'Push one item to the far end of a row with margin-left: auto',
          'Build a row that reflows at narrow widths without a media query',
          'Make a card grid with flex: 1 1 240px and a per-item minimum',
          'Pin a footer to the bottom of a full-height column with margin-top: auto',
        ],
        quiz: {
          id: 'quiz-css-l114',
          title: 'Flexbox Layout Examples quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l114-q1',
              type: 'identify-error',
              prompt: 'This is meant to put a row of items on the left and a push-right button on the far right, but nothing changes. Why?',
              code: '.toolbar {\n  justify-content: space-between;\n}',
              options: [
                '`space-between` only works on flex items, not on the container',
                'The container is missing `display: flex`, so there is no flex context for `justify-content` to act on',
                '`justify-content` was removed from the spec and is now `justify-items`',
                'The children need `flex: 1` before `justify-content` has any effect',
              ],
              answer: 1,
              explanation: 'Every distribution and alignment property in flexbox is inert unless the element is actually a flex container. Without `display: flex` the children are ordinary blocks and `justify-content` has nothing to distribute. This is the number one reason a flexbox rule appears to be ignored.',
            },
            {
              id: 'quiz-css-l114-q2',
              type: 'multiple-choice',
              prompt: 'What does `place-items: center` on a flex container do?',
              options: [
                'It centres only along the main axis',
                'It centres the child on both axes in one declaration',
                'It pushes the child to the bottom of the container',
                'It sets the container gap to zero',
              ],
              answer: 1,
              explanation: '`place-items` is the shorthand for `align-items` and `justify-content`, so a single declaration handles the cross axis and the main axis at once.',
            },
            {
              id: 'quiz-css-l114-q3',
              type: 'multiple-choice',
              prompt: 'In a `flex-direction: column` container, which property centres content vertically?',
              options: [
                '`align-items: center`',
                '`text-align: center`',
                '`vertical-align: middle`',
                '`justify-content: center`',
              ],
              answer: 3,
              explanation: 'A column makes the main axis vertical, and `justify-content` works along the main axis. `align-items` would centre horizontally in this container.',
            },
            {
              id: 'quiz-css-l114-q4',
              type: 'multiple-choice',
              prompt: '`margin-top: auto` on a footer does not move it to the bottom. What is missing?',
              options: [
                'The column needs a definite height, such as `min-height: 100vh`',
                'A `float: left` on the footer',
                '`justify-content: flex-start` on the column',
                'A `gap` on the container',
              ],
              answer: 0,
              explanation: 'An auto margin can only absorb free space. Without a height taller than the content there is no space to absorb, so the footer sits right under the body.',
            },
            {
              id: 'quiz-css-l114-q5',
              type: 'multiple-choice',
              prompt: 'In `flex: 1 1 240px`, what does the `240px` control?',
              options: [
                'The maximum width of the card',
                'The gap between cards',
                'The basis at which the card stops being useful, so it wraps below that width',
                'The height of the card',
              ],
              answer: 2,
              explanation: 'The basis is the width the card starts from. When the container cannot give a card that much room, the card moves to a new line, which is what makes the grid reflow without a media query.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l114-b1',
            body: 'The patterns below are worth memorising as shapes rather than as recipes. Each one replaces a trick that used to need floats, absolute positioning or a fixed height, and each is the answer I reach for first when the problem sounds like one of them.',
          },
          {
            type: 'demo',
            id: 'c-l114-d1',
            title: 'Centred, pushed right, and pinned to the bottom',
            body: 'Three containers, three one-declaration solutions. The left card centres its child on both axes with `place-items: center`. The middle bar pushes its last child to the far end with `margin-left: auto`. The right panel fills the height and drops its footer to the bottom with `margin-top: auto`.',
            html: `<div class="fbx-pat-demo">
  <div class="fbx-centred">
    <div class="fbx-chipc">place-items: center</div>
  </div>
  <div class="fbx-bar2">
    <span class="fbx-navlink">Docs</span>
    <span class="fbx-navlink">Pricing</span>
    <span class="fbx-navlink push">Sign in</span>
  </div>
  <div class="fbx-panel">
    <div class="fbx-pbody">The body fills what is left over.</div>
    <div class="fbx-pfoot">margin-top: auto</div>
  </div>
</div>`,
            css: `.fbx-pat-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
  display: flex;
  gap: 1rem;
}
.fbx-centred {
  display: flex;
  place-items: center;
  height: 110px;
  width: 150px;
  background: #1d2531;
  border: 1px dashed #2a3441;
  border-radius: 6px;
}
.fbx-chipc {
  background: #1f6feb;
  border-radius: 5px;
  padding: 0.3rem 0.6rem;
  font-size: 11px;
}
.fbx-bar2 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 220px;
  height: 110px;
  background: #1d2531;
  border: 1px dashed #2a3441;
  border-radius: 6px;
  padding: 0 0.6rem;
  box-sizing: border-box;
}
.fbx-navlink {
  font-size: 12px;
  color: #9aa5b4;
}
.fbx-navlink.push {
  margin-left: auto;
  color: #29e2bd;
}
.fbx-panel {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 170px;
  height: 110px;
  background: #1d2531;
  border: 1px dashed #2a3441;
  border-radius: 6px;
  padding: 0.6rem;
  box-sizing: border-box;
}
.fbx-pbody {
  font-size: 12px;
  color: #e8edf4;
}
.fbx-pfoot {
  margin-top: auto;
  font-size: 11px;
  color: #9aa5b4;
  border-top: 1px solid #2a3441;
  padding-top: 0.4rem;
}`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'c-l114-h1',
            level: 3,
            body: 'The idiomatic auto margins',
          },
          {
            type: 'text',
            id: 'c-l114-b2',
            body: '`margin-left: auto` on a single item is the correct way to push one thing to the end of a row, and `margin-top: auto` is the correct way to push one thing to the bottom of a column. Both work because an `auto` margin absorbs *all* the free space in that direction before `flex-grow` gets any, so the item is shoved to the end and everything else stays packed at the start. In a column, `flex-grow: 1` on the middle item achieves the same thing from the other side.',
          },
          {
            type: 'list',
            id: 'c-l114-l1',
            style: 'bullet',
            items: [
              '**Centring one thing** - `display: flex; place-items: center` on the parent. There is no need for a wrapper, an absolute position or a known height.',
              '**Centring one thing in a column** - `justify-content: center` does the vertical centring there, because in a column the main axis is vertical. This is the mistake almost everyone makes once.',
              '**Push one item right** - `margin-left: auto` on that item. Better than `justify-content: space-between`, which also spreads the items *between* each other and changes the spacing of everything else.',
              '**Push one item down** - `margin-top: auto` on that item, in a `flex-direction: column` container. The idiomatic full-height page shell.',
              '**A wrapping row with no media query** - `flex-wrap: wrap` plus a `flex-basis` on the items. The basis is the point: it is the width at which the item stops being useful, so below it the item moves to a new line.',
              '**A responsive card row** - `flex: 1 1 240px` with a `max-width` on each card if you need to cap the growth. As the container shrinks, cards drop to a new line until only one fits.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l114-t1',
            title: 'gap beats margin auto for spacing, but not for pushing',
            body: 'These solve different problems and it is worth keeping them apart. `gap` spaces *everything* evenly and leaves no trailing gap. `margin-*: auto` pushes *one* item away from the rest. If you use `margin: auto` on every item to space them, each item claims half the free space on both sides and the outer edges end up with gaps too.',
          },
          {
            type: 'warning',
            id: 'c-l114-w1',
            title: 'margin-top: auto needs a definite height to work against',
            body: 'The footer only drops to the bottom if the column is taller than its content. If the container has no `height`, no `min-height` and no taller parent, it is exactly as tall as its children and `margin-top: auto` has no free space to absorb - the footer sits right below the body and the rule looks broken. Give the shell `min-height: 100vh` or `height: 100%` inside a sized parent.',
          },
          {
            type: 'example',
            id: 'c-l114-e1',
            title: 'A navbar with a pushed-right group',
            body: 'The brand is on the left, the links sit next to it, and the account group is pushed to the far right by a single `margin-left: auto` on its first child. Note there is no `justify-content: space-between` - that would spread the links across the whole bar as well.',
            html: `<nav class="fbx-nav-demo">
  <span class="fbx-brand">Northwind</span>
  <div class="fbx-links">
    <a href="#">Overview</a>
    <a href="#">Activity</a>
    <a href="#">Members</a>
  </div>
  <div class="fbx-account">
    <span class="fbx-avatar" aria-hidden="true">RA</span>
    <span>Rowan</span>
  </div>
</nav>`,
            css: `.fbx-nav-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-nav-demo {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 8px;
  padding: 0.6rem 0.8rem;
}
.fbx-brand {
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #29e2bd;
  white-space: nowrap;
}
.fbx-links {
  display: flex;
  gap: 0.9rem;
}
.fbx-links a {
  color: #9aa5b4;
  text-decoration: none;
  font-size: 13px;
}
.fbx-links a:hover {
  color: #e8edf4;
}
.fbx-account {
  margin-left: auto;   /* pushes this group to the far end, nothing else moves */
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 12px;
  color: #e8edf4;
}
.fbx-avatar {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #1f6feb;
  font-size: 11px;
  font-weight: 600;
}`,
            showPreview: true,
          },
          {
            type: 'example',
            id: 'c-l114-e2',
            title: 'A card grid that reflows on its own',
            body: 'Each card is `flex: 1 1 240px`. The `240px` is the width at which the card stops being useful, so as the container narrows, cards drop to a new line by themselves. Resize the preview and no media query is involved anywhere - the reflow is the flex algorithm doing its job.',
            html: `<div class="fbx-grid-demo">
  <div class="fbx-gcard">
    <span class="fbx-glabel">Pass rate</span>
    <strong>98.4%</strong>
    <span class="fbx-gmeta">Last 30 days</span>
  </div>
  <div class="fbx-gcard">
    <span class="fbx-glabel">Median latency</span>
    <strong>212ms</strong>
    <span class="fbx-gmeta">p50 across all regions</span>
  </div>
  <div class="fbx-gcard">
    <span class="fbx-glabel">Open alerts</span>
    <strong>7</strong>
    <span class="fbx-gmeta">2 critical</span>
  </div>
  <div class="fbx-gcard">
    <span class="fbx-glabel">Deploys</span>
    <strong>31</strong>
    <span class="fbx-gmeta">This week</span>
  </div>
</div>`,
            css: `.fbx-grid-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-grid-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.fbx-gcard {
  flex: 1 1 240px;      /* grows to fill, shrinks from 240px, wraps below it */
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-top: 2px solid #29e2bd;
  border-radius: 8px;
  padding: 0.7rem 0.8rem;
}
.fbx-glabel {
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.fbx-gcard strong {
  font-size: 20px;
  color: #e8edf4;
  font-weight: 600;
}
.fbx-gmeta {
  font-size: 11px;
  color: #9aa5b4;
}`,
            showPreview: true,
          },
          {
            type: 'example',
            id: 'c-l114-e3',
            title: 'A full-height shell with the footer pinned to the bottom',
            body: 'The shell is a column with `min-height` to match the preview. The middle region grows with `flex: 1`, so it absorbs the leftover space and pushes the footer down regardless of how short the content is. This is the whole page-shell pattern, and it never needs a media query.',
            html: `<div class="fbx-shell-demo">
  <div class="fbx-shell">
    <header class="fbx-shell-head">Release 4.2.0</header>
    <div class="fbx-shell-main">
      <p>Short content. The middle region still takes all the space, so the footer stays at the bottom of the shell.</p>
    </div>
    <footer class="fbx-shell-foot">margin-top: auto on the footer</footer>
  </div>
</div>`,
            css: `.fbx-shell-demo {
  background: #141922;
  color: #e8edf4;
  font-family: "Segoe UI", system-ui, sans-serif;
  font-size: 13px;
}
.fbx-shell {
  display: flex;
  flex-direction: column;
  min-height: 200px;
  height: 100%;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 8px;
}
.fbx-shell-head {
  padding: 0.5rem 0.7rem;
  border-bottom: 1px solid #2a3441;
  font-size: 12px;
  color: #29e2bd;
}
.fbx-shell-main {
  flex: 1;            /* absorbs the leftover height */
  padding: 0.6rem 0.7rem;
}
.fbx-shell-main p {
  margin: 0;
  font-size: 12px;
  color: #9aa5b4;
}
.fbx-shell-foot {
  margin-top: auto;  /* same result, when the growing item is not available */
  border-top: 1px solid #2a3441;
  padding: 0.5rem 0.7rem;
  font-size: 11px;
  color: #9aa5b4;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l114-t2',
            title: 'Reach for grid when the rows must line up',
            body: 'Flexbox is one-dimensional, so a card row where every card in every row needs the same height works only because `align-items: stretch` lines them up by accident. As soon as you need independent column widths that align across rows, that is a two-dimensional requirement and CSS Grid is the right tool. Flexbox for the rows, grid for the page.',
          },
          {
            type: 'exercise',
            id: 'c-l114-x1',
            exercise: {
              id: 'ex-l114',
              instructions:
                'Centre the `.badge` element inside `.stage` on both axes, and push the `.spacer`-bearing `.push` element in `.toolbar` to the far right with a margin rather than by spreading the whole row.',
              languages: ['css'],
              starterCode: {
                html: '<div class="stage">\n  <div class="badge">Saved</div>\n</div>\n<div class="toolbar">\n  <span>Northwind</span>\n  <span>Docs</span>\n  <span class="push">Sign out</span>\n</div>',
                css: '.stage {\n  height: 120px;\n  background: #141922;\n  border: 1px dashed #2a3441;\n}\n.badge {\n  background: #1f6feb;\n  color: #e8edf4;\n  border-radius: 999px;\n  padding: 0.2rem 0.6rem;\n}\n.toolbar {\n  display: flex;\n  gap: 1rem;\n  margin-top: 0.75rem;\n  padding: 0.5rem 0.7rem;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n}\n.push {\n  color: #29e2bd;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l114-t1',
                  label: 'The stage is a flex container',
                  body: 'return getComputedStyle(document.querySelector(".stage")).display === "flex"',
                },
                {
                  id: 'ex-l114-t2',
                  label: 'The badge is centred on both axes',
                  body: 'const c = document.querySelector(".stage").getBoundingClientRect(); const b = document.querySelector(".badge").getBoundingClientRect(); const dx = Math.abs((b.left - c.left) - (c.right - b.right)); const dy = Math.abs((b.top - c.top) - (c.bottom - b.bottom)); return dx < 2 && dy < 2',
                },
                {
                  id: 'ex-l114-t3',
                  label: 'The pushed item uses a real left margin',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".push")).marginLeft) > 0',
                },
                {
                  id: 'ex-l114-t4',
                  label: 'The pushed item really is at the right-hand end',
                  body: 'const t = document.querySelector(".toolbar").getBoundingClientRect(); const p = document.querySelector(".push").getBoundingClientRect(); const other = document.querySelector(".toolbar span:first-child").getBoundingClientRect(); return p.right > t.left + t.width * 0.7 && other.left < t.left + t.width * 0.4',
                },
              ],
              hints: [
                'Centring needs two things at once: a flex container, and alignment on both axes. `place-items` sets both in one declaration.',
                'An `auto` margin absorbs all the free space on its side, which pushes the item to the end while leaving the others packed at the start.',
                '`.stage { display: flex; place-items: center; }` and `.push { margin-left: auto; }`',
              ],
              solution: {
                html: '<div class="stage">\n  <div class="badge">Saved</div>\n</div>\n<div class="toolbar">\n  <span>Northwind</span>\n  <span>Docs</span>\n  <span class="push">Sign out</span>\n</div>',
                css: '.stage {\n  display: flex;\n  place-items: center;\n  height: 120px;\n  background: #141922;\n  border: 1px dashed #2a3441;\n}\n.badge {\n  background: #1f6feb;\n  color: #e8edf4;\n  border-radius: 999px;\n  padding: 0.2rem 0.6rem;\n}\n.toolbar {\n  display: flex;\n  gap: 1rem;\n  margin-top: 0.75rem;\n  padding: 0.5rem 0.7rem;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n}\n.push {\n  margin-left: auto;\n  color: #29e2bd;\n}\n',
              },
              testNotes:
                'The second test measures the badge against the stage on both axes and compares the space on the left with the space on the right, and the space above with the space below. Centring on one axis only will fail it. The fourth test confirms the margin actually moved the item rather than the row merely being spread out - a `justify-content: space-between` solution would put the item at the end too, which is why test three also requires a real `margin-left` on the element itself.',
            },
          },
        ],
      },
    ],
  },
]