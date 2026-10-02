import type { Section } from '~/types/content'

export const cssGridSections: Section[] = [
  {
    id: 'css-s78',
    title: 'Grid Intro',
    description: 'The two-dimensional layout model: rows and columns, explicit versus implicit tracks, and when to choose grid over flexbox.',
    lessons: [
      {
        id: 'css-l123',
        title: 'Grid Intro',
        description: 'Grid as a two-dimensional system, the tracks it creates, the `gap` between them, and how it differs from flexbox.',
        duration: 7,
        objectives: [
          'Switch an element to `display: grid` and describe the rows and columns it creates',
          'Explain the difference between explicit and implicit tracks',
          'Separate cells with `gap` instead of margins',
          'Choose between grid and flexbox for a given layout',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l123-b1',
            body: 'Grid is a **two-dimensional** layout system. Flexbox distributes space along one axis; grid places rows *and* columns at the same time, so you control the shape of the whole layout instead of one line at a time.',
          },
          {
            type: 'demo',
            id: 'c-l123-d1',
            title: 'Rows, columns and a gap',
            body: 'Six boxes on a three-column grid. The yellow one is a single cell; the grey space around it is the gap between tracks.',
            html: `<div class="grid">
  <div class="cell">1</div><div class="cell">2</div><div class="cell hot">3</div>
  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
</div>`,
            css: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.cell {
  background: #eef1f5;
  border: 1px solid #c9d1da;
  border-radius: 8px;
  padding: 1.4rem;
  text-align: center;
  font-size: 14px;
}
.hot {
  background: #ffe9a8;
  border-color: #e0b400;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l123-b2',
            body: 'Three tracks across, two tracks down, six cells. The boxes fill them edge to edge and `gap: 12px` keeps 12px between every pair — no margin hacks, so the last row can never drift out of line.',
          },
          { type: 'heading', id: 'c-l123-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l123-c1',
            code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}`,
            language: 'css',
            title: 'grid.css',
          },
          {
            type: 'list',
            id: 'c-l123-l1',
            style: 'bullet',
            items: [
              '**`display: grid`** makes the element a grid *container*. Its direct children become grid *items*, one per cell.',
              '**`grid-template-columns`** declares the explicit columns. Each value is one track.',
              '**`repeat(3, 1fr)`** is shorthand for `1fr 1fr 1fr` — three identical tracks.',
              '**`fr`** is a flexible unit: `1fr` is one share of whatever space is left after fixed tracks and gaps are taken out.',
              '**`gap`** spaces the tracks apart, inside the grid only, never around the outside edge.',
            ],
          },
          { type: 'heading', id: 'c-l123-h2', level: 3, body: 'Explicit and implicit tracks' },
          {
            type: 'text',
            id: 'c-l123-b3',
            body: 'You declare some tracks and the browser creates others. **Explicit** tracks are the ones you wrote in `grid-template-columns` and `grid-template-rows`. **Implicit** tracks are generated on demand whenever an item needs a row or column you never declared. Add a seventh cell to the demo and it lands in a fourth column nobody asked for.',
          },
          {
            type: 'list',
            id: 'c-l123-l2',
            style: 'bullet',
            items: [
              'Implicit columns are sized by `grid-auto-columns`, implicit rows by `grid-auto-rows`.',
              'Both default to `auto`, which is why an implicit row grows to fit its content instead of clipping it.',
              'Because `1fr` requires an explicit track, implicit tracks never share space equally.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l123-t1',
            title: 'Grid or flexbox?',
            body: 'Grid is two-dimensional — you place things into a table-like structure and control rows and columns together. Flexbox is one-dimensional — it distributes space along a single axis, either a row or a column. A page with a sidebar and a stack of cards is grid; a row of buttons sharing the width evenly is flexbox. If you cannot say which axis you need, you probably only need flexbox.',
          },
          {
            type: 'exercise',
            id: 'c-l123-x1',
            exercise: {
              id: 'ex-l123',
              instructions: 'Turn the container below into a grid with three equal columns and a 12px gap between them.',
              languages: ['css'],
              starterCode: {
                html: '<div class="grid">\n  <div>A</div>\n  <div>B</div>\n  <div>C</div>\n  <div>D</div>\n  <div>E</div>\n  <div>F</div>\n</div>',
                css: '.grid {\n  \n}\n.grid div {\n  background: #eef1f5;\n  border: 1px solid #c9d1da;\n  padding: 1rem;\n  border-radius: 8px;\n}\n',
              },
              tests: [
                { id: 'ex-l123-t1', label: 'The container is a grid', body: 'return getComputedStyle(document.querySelector(".grid")).display === "grid"' },
                { id: 'ex-l123-t2', label: 'There are three column tracks', body: 'return getComputedStyle(document.querySelector(".grid")).gridTemplateColumns.split(" ").length === 3' },
                { id: 'ex-l123-t3', label: 'The gap is 12px', body: 'return getComputedStyle(document.querySelector(".grid")).gap === "12px"' },
              ],
              hints: [
                'One declaration sets the layout mode: `display: grid`.',
                '`repeat(3, 1fr)` writes three equal columns in a single line.',
                'Try `display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;`',
              ],
              solution: {
                html: '<div class="grid">\n  <div>A</div>\n  <div>B</div>\n  <div>C</div>\n  <div>D</div>\n  <div>E</div>\n  <div>F</div>\n</div>',
                css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n',
              },
              testNotes: 'The tests read the computed style of `.grid`. `gridTemplateColumns` resolves to three track sizes once the grid is laid out.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s78',
      title: 'Grid Intro quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s78-q1',
          type: 'multiple-choice',
          prompt: 'What makes grid a two-dimensional system?',
          options: ['It always produces square cells', 'You control rows and columns at the same time', 'It only works in one direction at a time', 'It loads faster than flexbox'],
          answer: 1,
          explanation: 'Rows and columns exist simultaneously, so items are placed into a table-like structure rather than distributed along a single axis.',
        },
        {
          id: 'quiz-css-s78-q2',
          type: 'true-false',
          prompt: 'A column you never declared in `grid-template-columns` will never be created.',
          answer: false,
          explanation: 'The browser creates implicit tracks as needed. `grid-auto-columns` and `grid-auto-rows` control their size.',
        },
        {
          id: 'quiz-css-s78-q3',
          type: 'code-output',
          prompt: 'What layout does this produce?',
          code: '.wrap {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}',
          options: ['One row of three boxes', 'Three rows of one box each', 'Three equal columns, with rows added as items overflow', 'A flex row of three items'],
          answer: 2,
          explanation: '`repeat(3, 1fr)` declares three explicit columns; extra items flow into new implicit rows with a 10px gap.',
        },
        {
          id: 'quiz-css-s78-q4',
          type: 'blank',
          prompt: 'Complete the sentence: use ______ to space grid tracks apart, instead of margins.',
          answers: ['gap'],
          explanation: '`gap` applies between tracks only, never around the outside edges, so items stay flush with the container.',
        },
        {
          id: 'quiz-css-s78-q5',
          type: 'multiple-choice',
          prompt: 'A nav bar of five links that must share the row evenly. Which system fits best?',
          options: ['Grid, because everything should use grid', 'Flexbox, because it distributes space along one axis', 'Neither — use floats', 'Grid with `grid-auto-flow: column`'],
          answer: 1,
          explanation: 'It is a single-axis problem: share the row. Grid is for when rows and columns both need controlling.',
        },
      ],
    },
  },
  {
    id: 'css-s79',
    title: 'Grid Container',
    description: 'The properties that build a grid: track sizes with repeat() and minmax(), template areas, auto-flow, and alignment.',
    lessons: [
      {
        id: 'css-l124',
        title: 'Grid Container',
        description: 'Track sizing with `repeat()`, `minmax()` and `fr`, named template areas, `grid-auto-flow`, and alignment of items inside their cells.',
        duration: 8,
        objectives: [
          'Size tracks with `repeat()`, `minmax()` and the `fr` unit',
          'Build a responsive column count with `auto-fit` and `minmax()`',
          'Lay out a page with named `grid-template-areas`',
          'Centre items in their cells with `align-items` and `justify-items`',
        ],
        xp: 48,
        content: [
          {
            type: 'text',
            id: 'c-l124-b1',
            body: 'Everything a grid knows comes from its container: the track sizes, how items flow into them, and how they sit inside each cell. The items themselves only need to be told where to land.',
          },
          {
            type: 'demo',
            id: 'c-l124-d1',
            title: 'Fixed columns beside responsive columns',
            body: 'Left: `repeat(3, 1fr)`, always three columns. Right: `repeat(auto-fit, minmax(150px, 1fr))`, as many columns as fit.',
            html: `<div class="pair">
  <div class="fixed">
    <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
    <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
  </div>
  <div class="auto">
    <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
    <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
  </div>
</div>`,
            css: `.pair {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}
.fixed,
.auto {
  flex: 1;
  display: grid;
  gap: 8px;
}
.fixed {
  grid-template-columns: repeat(3, 1fr);
}
.auto {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}
.cell {
  background: #eef1f5;
  border: 1px solid #c9d1da;
  border-radius: 6px;
  padding: 1rem;
  text-align: center;
  font-size: 13px;
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l124-b2',
            body: 'Same six boxes, two rules. The left one holds its three columns however tight you squeeze it; the right one reflows — down to two columns, then one — with no media query at all.',
          },
          { type: 'heading', id: 'c-l124-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l124-c1',
            code: `.fixed {
  grid-template-columns: repeat(3, 1fr);
}
.auto {
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}`,
            language: 'css',
            title: 'tracks.css',
          },
          {
            type: 'list',
            id: 'c-l124-l1',
            style: 'bullet',
            items: [
              '**`repeat(3, 1fr)`** — three identical tracks. `1fr` is one share of the leftover space, so three `1fr` tracks are always exactly equal.',
              '**`minmax(min, max)`** — a track never goes below `min` but stretches up to `max`. `minmax(150px, 1fr)` means "at least 150px, then share what is left".',
              '**`repeat(auto-fit, ...)`** — work out how many tracks fit at that minimum, then collapse the empty ones.',
              '**`grid-template-rows`** — the same syntax for the vertical axis as `grid-template-columns` uses for the horizontal one.',
              '**`grid-auto-flow`** — `row` (default) fills across then down, `column` fills down then across, and adding `dense` backfills earlier holes instead of leaving them empty.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l124-t1',
            title: '`auto-fill` versus `auto-fit`',
            body: 'They differ only when the tracks outnumber the items, and it confuses nearly everyone. **`auto-fill`** creates as many tracks as fit and **keeps the empty ones**, so your items stay at their `minmax()` minimum and sit left with blank space at the end. **`auto-fit`** collapses the empty tracks to zero width and lets the items **stretch** to fill the row. Six items with room for eight leaves two empty tracks under `auto-fill` and none under `auto-fit`.',
          },
          { type: 'heading', id: 'c-l124-h2', level: 3, body: 'Template areas' },
          {
            type: 'text',
            id: 'c-l124-b3',
            body: '`grid-template-areas` draws the layout as a picture: rows of names, where an empty cell is a full stop. Every name must form a rectangle, so an L-shaped name invalidates the whole declaration.',
          },
          {
            type: 'code',
            id: 'c-l124-c2',
            code: `.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
}
.head { grid-area: head; }
.side { grid-area: side; }
.main { grid-area: main; }
.foot { grid-area: foot; }`,
            language: 'css',
            title: 'areas.css',
          },
          {
            type: 'example',
            id: 'c-l124-e1',
            title: 'Areas and alignment in one grid',
            body: 'An area map where one item spans two columns and one sits at the far end of its cell. Area names place the items; `justify-items` positions them inside.',
            html: `<div class="page">
  <header class="head">header</header>
  <aside class="side">sidebar</aside>
  <main class="main">
    <div class="tile">main</div>
    <div class="tile wide">spans two columns</div>
    <div class="tile push">justify-self: end</div>
  </main>
  <footer class="foot">footer</footer>
</div>`,
            css: `.page {
  display: grid;
  grid-template-columns: 140px repeat(2, 1fr);
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "head head head" "side main main" "foot foot foot";
  gap: 10px;
  align-items: stretch;
  justify-items: stretch;
}
.head { grid-area: head; }
.side { grid-area: side; }
.main {
  grid-area: main;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.foot { grid-area: foot; }
.head, .side, .tile, .foot {
  background: #eef1f5;
  border: 1px solid #c9d1da;
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 13px;
}
.tile {
  background: #e6f7f2;
  border-color: #29e2bd;
}
.wide {
  grid-column: span 2;
}
.push {
  grid-column: span 2;
  justify-self: end;
}`,
            showPreview: true,
          },
          {
            type: 'list',
            id: 'c-l124-l2',
            style: 'bullet',
            items: [
              '**`align-items`** — vertical alignment of every item in its cell: `stretch` (default), `start`, `end`, `center`, `baseline`.',
              '**`justify-items`** — the same, horizontally.',
              '**`align-content` and `justify-content`** align the *tracks* instead, for when they do not fill the container — a common use is centring a grid narrower than its parent.',
              '**Line-based placement** — `grid-column: 2` sits an item in column 2; `grid-column: 2 / 4` starts it on line 2 and ends on line 4, covering columns 2 and 3. Lines start at 1 and the end line is one past the last track, so six columns means line 7.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l124-w1',
            title: 'Placing into tracks that do not exist',
            body: 'Write `grid-column: 5` on a two-column grid and the browser silently creates columns 3 and 4 as implicit, `auto`-sized tracks. The layout falls apart in a way that is hard to trace back, so declare the tracks you need.',
          },
          {
            type: 'exercise',
            id: 'c-l124-x1',
            exercise: {
              id: 'ex-l124',
              instructions: 'Give the container as many columns of at least 160px as fit, each sharing the leftover width, with a 10px gap.',
              languages: ['css'],
              starterCode: {
                html: '<div class="grid">\n  <div>A</div>\n  <div>B</div>\n  <div>C</div>\n  <div>D</div>\n</div>',
                css: '.grid {\n  \n}\n.grid div {\n  background: #eef1f5;\n  border: 1px solid #c9d1da;\n  padding: 1rem;\n  border-radius: 8px;\n}\n',
              },
              tests: [
                { id: 'ex-l124-t1', label: 'The container is a grid', body: 'return getComputedStyle(document.querySelector(".grid")).display === "grid"' },
                { id: 'ex-l124-t2', label: 'More than one column track is resolved', body: 'return getComputedStyle(document.querySelector(".grid")).gridTemplateColumns.split(" ").length > 1' },
                { id: 'ex-l124-t3', label: 'The gap is 10px', body: 'return getComputedStyle(document.querySelector(".grid")).gap === "10px"' },
              ],
              hints: [
                'The whole track list is a single `repeat()` with two arguments.',
                '`auto-fit` decides how many tracks, `minmax()` sets the floor and the ceiling.',
                'Try `display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px;`',
              ],
              solution: {
                html: '<div class="grid">\n  <div>A</div>\n  <div>B</div>\n  <div>C</div>\n  <div>D</div>\n</div>',
                css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\n  gap: 10px;\n}\n',
              },
              testNotes: 'The second test counts resolved track sizes, which is more than one while the container is wider than 160px.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s79',
      title: 'Grid Container quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s79-q1',
          type: 'multiple-choice',
          prompt: 'What does `1fr` represent?',
          options: ['One pixel of available width', 'One share of the space left after fixed tracks and gaps', 'The height of one row', 'The font size of the grid'],
          answer: 1,
          explanation: 'Fixed tracks are taken out first, then what remains is divided by the total number of `fr` units, which is why three `1fr` tracks are always equal.',
        },
        {
          id: 'quiz-css-s79-q2',
          type: 'multiple-choice',
          prompt: 'Four columns are defined and there is room for six. What does `auto-fit` do with the two empty tracks?',
          options: ['Keeps them at full size so items stay small', 'Collapses them to zero width so the items stretch', 'Centres the items and leaves the gaps visible', 'Removes two items from the flow'],
          answer: 1,
          explanation: '`auto-fit` collapses the empty tracks and the items grow to fill the row. `auto-fill` is the opposite: it keeps the empty tracks, so the items stay at their `minmax()` minimum.',
        },
        {
          id: 'quiz-css-s79-q3',
          type: 'true-false',
          prompt: 'A `grid-template-areas` name that forms an L-shape is valid as long as the number of names matches.',
          answer: false,
          explanation: 'Each named area must be a rectangle. An L-shaped name makes the whole declaration invalid and the browser drops it.',
        },
        {
          id: 'quiz-css-s79-q4',
          type: 'code-output',
          prompt: 'A grid has three columns. Where does this item sit?',
          code: '.item {\n  grid-column: 2 / 4;\n}',
          options: ['Column 2 only', 'Columns 2 and 3', 'Columns 1 to 4', 'The last column'],
          answer: 1,
          explanation: 'The start line is 2 and the end line 4 is exclusive, so the item covers columns 2 and 3.',
        },
        {
          id: 'quiz-css-s79-q5',
          type: 'blank',
          prompt: 'Complete the sentence: `grid-auto-flow: column` fills the grid down first and then ________.',
          answers: ['across'],
          explanation: '`row`, the default, fills across then down; `column` fills down then across. Adding `dense` backfills earlier holes.',
        },
      ],
    },
  },
  {
    id: 'css-s80',
    title: 'Grid Item',
    description: 'Placing items on the grid: column and row lines, spans, the `-1` end-line trick, named areas and item-level alignment.',
    lessons: [
      {
        id: 'css-l125',
        title: 'Grid Item',
        description: 'Place items with `grid-column` and `grid-row`, span several tracks, use `-1` for the last line, and align with `justify-self` and `align-self`.',
        duration: 8,
        objectives: [
          'Place an item on a named line and make it span several tracks',
          'Use the `-1` end line to span to the last row or column',
          'Place an item by area name with `grid-area`',
          'Align one item inside its cell with `justify-self`, `align-self` and `place-self`',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'c-l125-b1',
            body: 'The container builds the tracks; the item chooses its place in them. Everything an item needs is a few properties: which lines it starts and ends on, and where it sits inside the cell those lines describe.',
          },
          {
            type: 'demo',
            id: 'c-l125-d1',
            title: 'Two columns across, and the whole width',
            body: 'A four-column grid. The teal block covers columns 1 and 2. The amber block runs from line 1 to `-1`, so it spans every column however many there are.',
            html: `<div class="grid">
  <div class="cell half">1 / 3</div><div class="cell">3</div><div class="cell">4</div>
  <div class="cell wide">grid-column: 1 / -1</div>
  <div class="cell end">justify-self: end</div><div class="cell">6</div><div class="cell">7</div>
</div>`,
            css: `.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.cell {
  background: #eef1f5;
  border: 1px solid #c9d1da;
  border-radius: 8px;
  padding: 1.2rem;
  text-align: center;
  font-size: 13px;
}
.half {
  grid-column: span 2;
  background: #e6f7f2;
  border-color: #29e2bd;
}
.wide {
  grid-column: 1 / -1;
  background: #ffe9a8;
  border-color: #e0b400;
}
.end {
  justify-self: end;
  background: #f1e9ff;
  border-color: #a97be0;
}`,
            height: 230,
          },
          {
            type: 'text',
            id: 'c-l125-b2',
            body: 'Both spans take a single property. `span 2` says "take two tracks, wherever you land", so the browser advances to avoid leaving a hole. `1 / -1` names an explicit start and end: the negative line counts back from the final line, so that amber block would still span everything if the column count changed.',
          },
          { type: 'heading', id: 'c-l125-h1', level: 3, body: 'How it works' },
          {
            type: 'code',
            id: 'c-l125-c1',
            code: `.half {
  grid-column: span 2;
}
.wide {
  grid-column: 1 / -1;
}
.end {
  justify-self: end;
}`,
            language: 'css',
            title: 'items.css',
          },
          {
            type: 'list',
            id: 'c-l125-l1',
            style: 'bullet',
            items: [
              '**`grid-column: 2`** — start and end at line 2, so the item fills column 2 alone.',
              '**`grid-column: 2 / 4`** — shorthand for `grid-column-start: 2` and `grid-column-end: 4`. The end line is exclusive, so this covers columns 2 and 3.',
              '**`grid-column: span 2`** — no line numbers, just a width. The item takes two tracks from wherever the auto-placement cursor is.',
              '**`grid-column: 1 / -1`** — `-1` is the final line of the explicit grid, which is what makes a full-width divider that survives a change in column count.',
              '**`grid-column: 2 / span 2`** — you can mix forms: a named start line plus a span.',
              '**`grid-row`** — the identical set of values for the vertical axis, including `span` and negative lines.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l125-t1',
            title: 'Negative lines count from the end',
            body: 'On a three-column grid the lines are 1, 2, 3 and 4, so `-1` is line 4 and `-3` is line 1. Because the numbers are relative to the end of the grid, `1 / -1` stays correct no matter how many explicit tracks there are — unlike hard-coding a line number.',
          },
          { type: 'heading', id: 'c-l125-h2', level: 3, body: 'Named placement and item alignment' },
          {
            type: 'text',
            id: 'c-l125-b3',
            body: 'When the container declares `grid-template-areas`, an item names itself with `grid-area`. The shorthand takes one to four values in the order start row / start column / end row / end column, so a single name and four explicit lines are the same property.',
          },
          {
            type: 'code',
            id: 'c-l125-c2',
            code: `.head {
  grid-area: head;
}
.content {
  grid-area: 2 / 2 / 3 / 4;
}
.item {
  grid-area: 1 / 1 / 2 / 3;
}`,
            language: 'css',
            title: 'placement.css',
          },
          {
            type: 'list',
            id: 'c-l125-l2',
            style: 'bullet',
            items: [
              '**`justify-self`** — horizontal alignment of one item inside its cell: `stretch` (default), `start`, `end`, `center`.',
              '**`align-self`** — the vertical equivalent, and **`place-self`** sets both at once, as in `place-self: center end`.',
              'An item-level value always beats the container-level `align-items` and `justify-items`, so set the default for the grid and override the one odd item.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l125-w1',
            title: 'Overlap is silent',
            body: 'Two items placed on the same lines stack in the same cell with no warning at all. Overlap is occasionally what you want, but far more often it is a typo in a line number that quietly hides one of the two.',
          },
          {
            type: 'exercise',
            id: 'c-l125-x1',
            exercise: {
              id: 'ex-l125',
              instructions: 'Make the highlighted item span the full width of the four-column grid, from the first line to the last, and centre it vertically in its row.',
              languages: ['css'],
              starterCode: {
                html: '<div class="grid">\n  <div>A</div><div>B</div><div>C</div><div>D</div>\n  <div class="wide">full width</div>\n</div>',
                css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n}\n.grid div {\n  background: #eef1f5;\n  border: 1px solid #c9d1da;\n  padding: 1rem;\n  border-radius: 8px;\n}\n.wide {\n  \n}\n',
              },
              tests: [
                { id: 'ex-l125-t1', label: 'The wide item starts on the first line', body: 'return getComputedStyle(document.querySelector(".wide")).gridColumnStart === "1"' },
                { id: 'ex-l125-t2', label: 'The wide item ends on the last line', body: 'return getComputedStyle(document.querySelector(".wide")).gridColumnEnd === "-1"' },
                { id: 'ex-l125-t3', label: 'It is centred vertically in its row', body: 'const s = getComputedStyle(document.querySelector(".wide")); return s.alignSelf === "center" || s.placeSelf.startsWith("center")' },
              ],
              hints: [
                'Two lines in one shorthand: start line, slash, end line.',
                'The last line of the grid is the negative line `-1`, and it does not change with the column count.',
                'Try `grid-column: 1 / -1; align-self: center;`',
              ],
              solution: {
                html: '<div class="grid">\n  <div>A</div><div>B</div><div>C</div><div>D</div>\n  <div class="wide">full width</div>\n</div>',
                css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 10px;\n}\n.wide {\n  grid-column: 1 / -1;\n  align-self: center;\n}\n',
              },
              testNotes: 'The tests read `gridColumnStart`, `gridColumnEnd` and `alignSelf` from the computed style of `.wide`.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s80',
      title: 'Grid Item quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s80-q1',
          type: 'code-output',
          prompt: 'A grid has four columns. What does this set?',
          code: '.item {\n  grid-column: 2 / 4;\n}',
          options: ['Column 2 only', 'Columns 2 and 3', 'Columns 2, 3 and 4', 'The last two columns'],
          answer: 1,
          explanation: 'The end line is exclusive, so `2 / 4` starts on line 2 and stops before line 4, covering columns 2 and 3.',
        },
        {
          id: 'quiz-css-s80-q2',
          type: 'multiple-choice',
          prompt: 'Why is `grid-column: 1 / -1` a good rule for a full-width divider?',
          options: ['Because `-1` means "no limit", so the item never wraps', 'Because `-1` is the final line, so the span adapts to any column count', 'Because negative columns are collapsed by the browser', 'Because it forces the grid to have exactly one column'],
          answer: 1,
          explanation: 'Negative line numbers count back from the end of the grid, so the end line follows the explicit track count wherever it lands.',
        },
        {
          id: 'quiz-css-s80-q3',
          type: 'true-false',
          prompt: 'If two grid items are placed on the same lines, the browser reports an error.',
          answer: false,
          explanation: 'They stack silently in the same cell. Overlap is valid and occasionally intentional, but it is also the most common symptom of a wrong line number.',
        },
        {
          id: 'quiz-css-s80-q4',
          type: 'blank',
          prompt: 'Complete the sentence: to make one item span two tracks wherever it lands, use `grid-column: ______`.',
          answers: ['span 2'],
          explanation: 'A span with no line numbers takes that many tracks from wherever the auto-placement cursor currently is.',
        },
        {
          id: 'quiz-css-s80-q5',
          type: 'multiple-choice',
          prompt: 'The container says `justify-items: start` but one item should hug the right edge of its cell. What wins?',
          options: ['`justify-items: start`, because it is on the container', '`justify-self: end` on that item, because item-level alignment overrides the container', 'Neither — you need a media query', 'Whichever rule is written later, regardless of selector'],
          answer: 1,
          explanation: 'Item-level alignment always beats the container-level default for that item, regardless of specificity or source order between the two rules.',
        },
      ],
    },
  },
]
