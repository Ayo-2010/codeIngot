import type { Section } from '~/types/content'

export const cssTableDisplaySections: Section[] = [
  {
    id: 'css-s20',
    title: 'CSS Tables',
    description: 'Styling real tables: borders, size, alignment, row patterns, and making a wide table survive a narrow screen.',
    lessons: [
      {
        id: 'css-l49',
        title: 'Table Borders',
        description: 'How to put a border on a table, and the one property that decides whether its borders merge or double up.',
        duration: 6,
        xp: 40,
        objectives: [
          'Put a border on a table and on individual cells',
          'Explain the difference between border-collapse: collapse and separate',
          'Predict how wide an internal border will be in each mode',
          'Use border-spacing to control the gap in separate mode',
        ],
        quiz: {
          id: 'quiz-css-l49',
          title: 'Table Borders quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l49-q1',
              type: 'blank',
              prompt: 'Which single property on the table decides whether adjacent borders merge into one line or stay separate?',
              answers: [
                'border-collapse',
                'border-collapse: collapse',
              ],
              explanation: '`border-collapse: collapse` (the default) merges shared edges into one border. `separate` keeps each cell\'s border to itself, so shared edges appear twice as wide, and `border-spacing` then applies.',
            },
            {
              id: 'quiz-css-l49-q2',
              type: 'multiple-choice',
              prompt: 'What is the initial value of `border-collapse`, which a table uses when you never set it?',
              options: [
                '`collapse`',
                '`separate`',
                '`none`',
                '`inherit`',
              ],
              answer: 0,
              explanation: 'The initial value is `collapse`, so adjacent cell borders merge by default. You have to opt in to `separate` to get a gap between cells.',
            },
            {
              id: 'quiz-css-l49-q3',
              type: 'multiple-choice',
              prompt: 'A table uses `border-collapse: separate` and every cell has `border: 1px solid`. How wide is the line between two adjacent cells?',
              options: [
                '1px, because the two borders merge in separate mode',
                '0px, because separate mode removes internal borders',
                '2px, because each cell draws its own full border on that edge',
                '3px, because each cell adds a half border on each side',
              ],
              answer: 2,
              explanation: 'In separate mode neither cell shares its border, so the two one-pixel borders sit side by side and read as a two-pixel line.',
            },
            {
              id: 'quiz-css-l49-q4',
              type: 'multiple-choice',
              prompt: 'Where should a table border go so it renders consistently in collapsed mode?',
              options: [
                'On the `tr` element, so one rule covers the row',
                'On the `thead` and `tbody` elements',
                'On the `td` and `th` cells',
                'On a `::before` pseudo-element of the table',
              ],
              answer: 2,
              explanation: 'A row has no box of its own, so borders on `tr` render inconsistently between engines. Put the border on the cells and draw only the edges you want.',
            },
            {
              id: 'quiz-css-l49-q5',
              type: 'blank',
              prompt: 'Which property sets the gap between cells while `border-collapse: separate` is in effect?',
              answers: [
                'border-spacing',
              ],
              explanation: '`border-spacing` controls the space between cells in separate mode; cell `padding` is separate and applies in both modes.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l49-b1',
            body: 'A table border is set in two places: on the `<table>` itself for its outer edge, and on the cells for the grid inside. Whether those lines merge into one thin line or sit side by side as a double line is decided by a single property on the table, **`border-collapse`**.',
          },
          {
            type: 'demo',
            id: 'c-l49-d1',
            title: 'Collapsed versus separated',
            body: 'Both tables have the same one-pixel border on every cell. On the left, `collapse` merges each shared edge into a single line. On the right, `separate` keeps every cell\'s border to itself, so each internal edge is two pixels wide.',
            html: `<div class="pair">
  <table class="collapsed">
    <caption>border-collapse: collapse</caption>
    <tr><td>Cell</td><td>Cell</td></tr>
    <tr><td>Cell</td><td>Cell</td></tr>
  </table>
  <table class="separated">
    <caption>border-collapse: separate</caption>
    <tr><td>Cell</td><td>Cell</td></tr>
    <tr><td>Cell</td><td>Cell</td></tr>
  </table>
</div>`,
            css: `table {
  border-collapse: collapse;
  background: #141922;
  color: #e8edf4;
  font-size: 13px;
}
caption {
  caption-side: top;
  padding-bottom: 0.4rem;
  color: #9aa5b4;
  text-align: left;
}
td {
  border: 1px solid #5b6472;
  padding: 0.45rem 0.7rem;
}
.pair {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}
table {
  width: 50%;
}
table td {
  border-color: #29e2bd;
}
.separated {
  border-collapse: separate;
  border-spacing: 4px;
}`,
            height: 170,
          },
          {
            type: 'text',
            id: 'c-l49-b2',
            body: 'On the right, look closely at the line between two cells. It is visibly thicker than the line around the outside, because you are seeing two separate one-pixel borders sitting next to each other. That is not a rendering quirk — it is exactly what `separate` asks for.',
          },
          {
            type: 'heading',
            id: 'c-l49-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l49-c1',
            language: 'css',
            title: 'The two border models',
            code: `/* the default: one shared border per edge, 1px wide */
table {
  border-collapse: collapse;
  border: 1px solid #5b6472;   /* the outer edge of the whole table */
}

/* every cell keeps its own border, so shared edges are 2px wide */
table.airy {
  border-collapse: separate;
  border-spacing: 6px;         /* the gap between cells, in separate mode only */
}`,
          },
          {
            type: 'list',
            id: 'c-l49-l1',
            style: 'bullet',
            items: [
              '**`collapse` (the default)** — borders on adjacent cells merge into one. A `1px` border looks like `1px`, not `2px`. This is what almost every design system uses, because it gives predictable hairline grids.',
              '**`separate`** — each cell draws its own border and none are shared, so a shared edge is twice the width you wrote. You control the gap between cells with `border-spacing`, which is ignored in collapsed mode.',
              '**`border-spacing`** — only applies in `separate` mode. It sets the space *between* cells; cell padding is separate and always applies.',
              '**In `collapse` mode you also get rounded corners and working `border` on the table itself.** In `separate` mode a `border-radius` on the table rounds the table box, not the individual cells.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l49-t1',
            title: 'Set the border on the cells, not on the rows',
            body: 'A border on `tr` behaves inconsistently across browsers in collapsed mode, because the row has no box of its own. Put the border on `td` and `th` and select which edges to draw with `border-bottom` only — that is what produces the clean horizontal rules most tables use.',
          },
          {
            type: 'warning',
            id: 'c-l49-w1',
            title: 'A doubled border is a doubling of your own making',
            body: 'If you write `border: 1px solid` on every cell and then set `border-collapse: separate`, every internal line becomes 2px. If you *want* 2px lines, that is fine — but if you wrote 1px expecting 1px, the fix is `collapse`, not a half-pixel border.',
          },
          {
            type: 'example',
            id: 'c-l49-e1',
            title: 'A realistic header with only horizontal rules',
            body: 'The header row is fully bordered, and the body cells carry only a bottom border. This reads as a table far faster than a full grid, and it survives a long row of content without turning into a spreadsheet.',
            html: `<table class="data">
  <thead>
    <tr><th>Invoice</th><th>Client</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>INV-1042</td><td>Northwind Ltd</td><td>Paid</td></tr>
    <tr><td>INV-1043</td><td>Acme Corp</td><td>Pending</td></tr>
  </tbody>
</table>`,
            css: `table {
  border-collapse: collapse;
  width: 100%;
  font-size: 13px;
}
th {
  border: 1px solid #3a4插;
  background: #1d2531;
  color: #e8edf4;
  text-align: left;
  padding: 0.5rem 0.7rem;
}
td {
  border-bottom: 1px solid #2a3441;
  padding: 0.45rem 0.7rem;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l49-x1',
            exercise: {
              id: 'ex-l49',
              instructions:
                'The table below draws a one-pixel border around every cell. Set `border-collapse` so that shared edges merge into a single line instead of doubling up.',
              languages: ['css'],
              starterCode: {
                html: '<table class="grid">\n  <tr><td>A</td><td>B</td></tr>\n  <tr><td>C</td><td>D</td></tr>\n</table>',
                css: '.grid {\n  border-collapse: separate;\n}\ntd {\n  border: 1px solid #5b6472;\n  padding: 0.4rem 0.7rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l49-t1',
                  label: 'The table collapses its borders',
                  body: 'return getComputedStyle(document.querySelector(".grid")).borderCollapse === "collapse"',
                },
                {
                  id: 'ex-l49-t2',
                  label: 'The cells still have a one-pixel border',
                  body: 'return parseFloat(getComputedStyle(document.querySelector("td")).borderTopWidth) === 1',
                },
                {
                  id: 'ex-l49-t3',
                  label: 'The cells are still padded',
                  body: 'return getComputedStyle(document.querySelector("td")).paddingTop === "6.4px" || parseFloat(getComputedStyle(document.querySelector("td")).paddingTop) > 0',
                },
              ],
              hints: [
                'The property goes on the `table` element, not on the cells.',
                'It has two values: `collapse` and `separate`.',
                '`.grid { border-collapse: collapse; }`',
              ],
              solution: {
                html: '<table class="grid">\n  <tr><td>A</td><td>B</td></tr>\n  <tr><td>C</td><td>D</td></tr>\n</table>',
                css: '.grid {\n  border-collapse: collapse;\n}\ntd {\n  border: 1px solid #5b6472;\n  padding: 0.4rem 0.7rem;\n}\n',
              },
              testNotes:
                'The first test reads the computed `border-collapse` value on the table. The second confirms you did not solve it by deleting the cell borders.',
            },
          },
        ],
      },
      {
        id: 'css-l50',
        title: 'Table Size',
        description: 'Setting the width of a table and choosing between automatic and fixed column layout.',
        duration: 6,
        xp: 40,
        objectives: [
          'Set the overall width of a table',
          'Explain how table-layout: auto allocates column widths',
          'Explain how table-layout: fixed allocates column widths',
          'Choose fixed layout for tables whose content length is unpredictable',
        ],
        quiz: {
          id: 'quiz-css-l50',
          title: 'Table Size quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l50-q1',
              type: 'true-false',
              prompt: 'Setting `border-spacing` on a table with `border-collapse: collapse` changes the gap between its cells.',
              answer: false,
              explanation: '`border-spacing` only applies in `separate` mode. In `collapse` mode the gap between cells is produced by the cells\' own padding and by the shared borders.',
            },
            {
              id: 'quiz-css-l50-q2',
              type: 'multiple-choice',
              prompt: 'Under `table-layout: auto`, how does the browser choose column widths?',
              options: [
                'It reads the widths from the first row and shares the rest equally',
                'It divides the table width equally between every column',
                'It measures every cell and allocates width in proportion to what the content wants',
                'It copies the widths declared on the widest body row',
              ],
              answer: 2,
              explanation: 'Auto layout is content-driven: the browser measures every cell, so one long value can blow a column open and the widths change as the data changes.',
            },
            {
              id: 'quiz-css-l50-q3',
              type: 'multiple-choice',
              prompt: 'Under `table-layout: fixed`, where does the browser read a column width from?',
              options: [
                'The first row cell for that column',
                'The widest cell anywhere in the column',
                'The `min-width` declared on the table',
                'The last body cell in that column',
              ],
              answer: 0,
              explanation: 'Fixed layout only reads widths from the first row; a width on a cell forty rows down is ignored completely, so put the widths on your `th` elements.',
            },
            {
              id: 'quiz-css-l50-q4',
              type: 'multiple-choice',
              prompt: 'A fixed-layout table has no explicit cell widths. How is its width shared?',
              options: [
                'Proportionally to how much content each column holds',
                'Only the columns that contain text get width',
                'By the order the columns appear in the markup',
                'Equally between the columns',
              ],
              answer: 3,
              explanation: 'With no explicit widths, fixed layout gives every column an equal share of the table width and makes the content fit that share by wrapping or overflowing.',
            },
            {
              id: 'quiz-css-l50-q5',
              type: 'multiple-choice',
              prompt: 'Why is `table-layout: fixed` cheaper to render on a long table?',
              options: [
                'It skips painting borders and backgrounds',
                'It only inspects the first row instead of measuring every cell',
                'It stores the rendered table in localStorage',
                'It removes cell padding',
              ],
              answer: 1,
              explanation: 'Auto layout must measure every cell before it can draw anything, while fixed layout only looks at the first row, so the cost stops growing with the row count.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l50-b1',
            body: 'A table sizes itself in two stages: first the whole table takes a width, then the browser decides how to share that width between the columns. **`table-layout` controls the second stage**, and it is the setting that decides whether your layout is predictable.',
          },
          {
            type: 'demo',
            id: 'c-l50-d1',
            title: 'The same wide content under both layouts',
            body: 'Both tables are 100% wide and hold identical content. Under `auto`, the long description dictates the column widths and the short columns squeeze. Under `fixed`, the columns are equal and the long text wraps.',
            html: `<table class="data auto">
  <thead>
    <tr><th>Ref</th><th>Description</th><th>Qty</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>R-1</td>
      <td>A deliberately long description that has to wrap in a fixed layout</td>
      <td>12</td>
    </tr>
  </tbody>
</table>

<table class="data fixed">
  <thead>
    <tr><th>Ref</th><th>Description</th><th>Qty</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>R-1</td>
      <td>A deliberately long description that has to wrap in a fixed layout</td>
      <td>12</td>
    </tr>
  </tbody>
</table>`,
            css: `table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 0.75rem;
}
th,
td {
  border: 1px solid #3a4453;
  padding: 0.4rem 0.6rem;
  text-align: left;
}
th {
  background: #1d2531;
}
.fixed {
  table-layout: fixed;
}`,
            height: 240,
          },
          {
            type: 'text',
            id: 'c-l50-b2',
            body: 'In the top table the `Ref` column is a narrow sliver and `Description` has taken most of the width, because auto layout gives each column roughly what its content asks for. In the bottom table the three columns are equal thirds and the description wraps onto three lines. Neither is wrong, but only one of them stays the same on every row of real data.',
          },
          {
            type: 'heading',
            id: 'c-l50-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l50-c1',
            language: 'css',
            title: 'Width and table-layout together',
            code: `table {
  width: 100%;          /* the table fills its container */
  table-layout: fixed;  /* columns share that width equally unless told otherwise */
}

th:nth-child(1),
td:nth-child(1) {
  width: 80px;          /* with fixed layout these are respected exactly */
}`,
          },
          {
            type: 'list',
            id: 'c-l50-l1',
            style: 'bullet',
            items: [
              '**`width` on the table** — sets the total width. `100%` fills the parent, a fixed value like `600px` fixes it, and omitting it lets the table be only as wide as its content.',
              '**`table-layout: auto` (the default)** — a content-driven algorithm. The browser measures every cell in every row, then allocates width in proportion to what the content wants. Column widths therefore change when the data changes, and one long value can blow a column open.',
              '**`table-layout: fixed`** — a purely numeric algorithm. The table width comes first, any `width` on the first row\'s cells is honoured exactly, and the rest of the width is shared equally. Content that does not fit wraps or overflows instead of resizing the table.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l50-t1',
            title: 'Fixed layout is cheaper too',
            body: 'Auto layout has to measure every cell before it can draw anything, so it gets slower as rows and columns grow. Fixed layout only looks at the first row. On a long data table that difference is measurable, not theoretical.',
          },
          {
            type: 'warning',
            id: 'c-l50-w1',
            title: 'Fixed layout ignores widths below the first row',
            body: 'In fixed mode the browser reads `width` from the cells in the **first row only** to decide the column widths. A `width` on a cell in row 40 is ignored completely. Set the widths on your `th` elements, or on the first row, and everything below inherits them.',
          },
          {
            type: 'example',
            id: 'c-l50-e1',
            title: 'Fixed layout with explicit column widths',
            body: 'Only the first row carries widths, exactly as the warning described. The remaining rows have no width declarations at all and still land in the right columns.',
            html: `<table class="data">
  <thead>
    <tr><th>Ref</th><th>Description</th><th>Qty</th><th>Price</th></tr>
  </thead>
  <tbody>
    <tr><td>R-1</td><td>Hex bolt, zinc plated, 60mm</td><td>12</td><td>4.20</td></tr>
    <tr><td>R-2</td><td>Washer, stainless, M8</td><td>480</td><td>0.06</td></tr>
    <tr><td>R-3</td><td>Bracket, folded steel, 120mm, with a long descriptive value</td><td>7</td><td>11.95</td></tr>
  </tbody>
</table>`,
            css: `table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  font-size: 13px;
}
th,
td {
  border-bottom: 1px solid #2a3441;
  padding: 0.45rem 0.6rem;
  text-align: left;
}
th {
  background: #1d2531;
}
th:nth-child(1) { width: 60px; }
th:nth-child(3) { width: 60px; }
th:nth-child(4) { width: 80px; }
td:nth-child(3),
td:nth-child(4) {
  text-align: right;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l50-x1',
            exercise: {
              id: 'ex-l50',
              instructions:
                'Give the table below a fixed layout and make it fill its container. Do not set a width on the individual cells — the exercise is about the layout algorithm.',
              languages: ['css'],
              starterCode: {
                html: '<table class="data">\n  <thead><tr><th>Ref</th><th>Description</th></tr></thead>\n  <tbody><tr><td>R-1</td><td>Hex bolt</td></tr></tbody>\n</table>',
                css: '.data {\n  border-collapse: collapse;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l50-t1',
                  label: 'The table uses a fixed layout',
                  body: 'return getComputedStyle(document.querySelector(".data")).tableLayout === "fixed"',
                },
                {
                  id: 'ex-l50-t2',
                  label: 'The table fills its container',
                  body: 'const t = document.querySelector(".data"); const p = t.parentElement; return Math.abs(t.getBoundingClientRect().width - p.getBoundingClientRect().width) < 2',
                },
                {
                  id: 'ex-l50-t3',
                  label: 'The columns are even shares of the table width',
                  body: 'const cells = document.querySelectorAll("thead th"); const w = cells[0].getBoundingClientRect().width; const t = document.querySelector(".data").getBoundingClientRect().width; return Math.abs(w - t / 2) < 4',
                },
              ],
              hints: [
                'Two declarations: one sets the layout algorithm, one sets the width.',
                '`table-layout` has the values `auto` and `fixed`.',
                '`.data { table-layout: fixed; width: 100%; }`',
              ],
              solution: {
                html: '<table class="data">\n  <thead><tr><th>Ref</th><th>Description</th></tr></thead>\n  <tbody><tr><td>R-1</td><td>Hex bolt</td></tr></tbody>\n</table>',
                css: '.data {\n  border-collapse: collapse;\n  table-layout: fixed;\n  width: 100%;\n}\n',
              },
              testNotes:
                'The third test measures both header cells and compares one of them to half the table width, which is what fixed layout does when no explicit column widths are given.',
            },
          },
        ],
      },
      {
        id: 'css-l51',
        title: 'Table Alignment',
        description: 'Aligning text inside cells on both axes, moving the caption, and giving cells room to breathe.',
        duration: 6,
        xp: 40,
        objectives: [
          'Centre text horizontally inside a cell with text-align',
          'Align cell content vertically with vertical-align',
          'Move a caption to the bottom with caption-side',
          'Give cells internal spacing with padding rather than margins',
        ],
        quiz: {
          id: 'quiz-css-l51',
          title: 'Table Alignment quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l51-q1',
              type: 'multiple-choice',
              prompt: 'Why does a shared border between two adjacent cells look twice as wide under `border-collapse: separate`?',
              options: [
                'Because `separate` adds `border-spacing` to the border itself',
                'Because each cell keeps its own border and neither one is shared',
                'Because the browser doubles every border in separate mode',
                'Because `border-width` is interpreted as a total across both cells',
              ],
              answer: 1,
              explanation: 'In `separate` mode each cell draws its own border to its own edge, so the two borders sit side by side. In `collapse` mode they merge into one shared border drawn half by each cell, which is why a `1px` border looks like `1px`.',
            },
            {
              id: 'quiz-css-l51-q2',
              type: 'multiple-choice',
              prompt: 'Which property moves content to the vertical middle of a tall table cell?',
              options: [
                '`text-align: middle`',
                '`align-content: middle`',
                '`vertical-align: middle`',
                '`line-height: middle`',
              ],
              answer: 2,
              explanation: '`vertical-align` handles the vertical axis inside a table cell; `text-align` only moves content horizontally, and `middle` is not one of its values.',
            },
            {
              id: 'quiz-css-l51-q3',
              type: 'multiple-choice',
              prompt: 'Which declaration moves a `<caption>` below the table?',
              options: [
                '`caption-side: bottom`',
                '`caption-align: bottom`',
                '`vertical-align: bottom`',
                '`text-align: bottom`',
              ],
              answer: 0,
              explanation: '`caption-side` is the dedicated property for the caption position and accepts `top` or `bottom`. No other alignment property moves it.',
            },
            {
              id: 'quiz-css-l51-q4',
              type: 'multiple-choice',
              prompt: 'Why does the lesson recommend padding rather than margin inside table cells?',
              options: [
                'Padding is inherited and margin is not',
                'Padding can be animated and margin cannot',
                'Margin cannot be declared on a `td` at all',
                'Margins on cells behave inconsistently across engines and can collapse rows, while padding is reliable',
              ],
              answer: 3,
              explanation: 'A cell is a table cell first, so margins are handled inconsistently and may disturb the row. Padding grows the space inside the cell in every engine.',
            },
            {
              id: 'quiz-css-l51-q5',
              type: 'multiple-choice',
              prompt: 'Why right-align a column of prices?',
              options: [
                'It makes the header row bold',
                'The digits line up so values can be compared down the column',
                'It stops the column from wrapping',
                '`text-align: right` is the only value cells accept',
              ],
              answer: 1,
              explanation: 'Right alignment puts the last digit of each number on the same vertical line, which is what makes a numeric column scannable.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l51-b1',
            body: 'A cell aligns its content on two independent axes. **`text-align` handles the horizontal one** and works exactly as it does on a paragraph. **`vertical-align` handles the vertical one**, and it is a different property with a different set of values — most people reach for the wrong one first.',
          },
          {
            type: 'demo',
            id: 'c-l51-d1',
            title: 'Top-aligned versus vertically centred',
            body: 'The row is forced to be tall. The left cell sits at the top of it, the right cell floats in the vertical middle. Both cells have identical padding — only `vertical-align` differs.',
            html: `<table class="align">
  <caption>caption-side: top — the default position</caption>
  <tr class="tall">
    <td class="top">vertical-align: top</td>
    <td class="middle">vertical-align: middle</td>
  </tr>
</table>`,
            css: `table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
caption {
  caption-side: top;
  padding-bottom: 0.4rem;
  color: #9aa5b4;
  text-align: left;
}
td {
  border: 1px solid #3a4453;
  padding: 0.6rem 0.8rem;
}
.tall td {
  height: 110px;
}
.top {
  vertical-align: top;
}
.middle {
  vertical-align: middle;
  text-align: right;
}`,
            height: 210,
          },
          {
            type: 'text',
            id: 'c-l51-b2',
            body: 'The right cell is also right-aligned, which is what `text-align: right` does — it moves text along the horizontal axis, nothing else. If you wanted the text on the right but still lined up with the top of the cell, you would set `vertical-align: top` and leave `text-align` alone.',
          },
          {
            type: 'heading',
            id: 'c-l51-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l51-c1',
            language: 'css',
            title: 'The three alignment properties in a table',
            code: `td {
  padding: 0.6rem 0.8rem;   /* room inside the cell, on every side */
  text-align: left;        /* horizontal: left | center | right | justify */
  vertical-align: middle;  /* vertical: top | middle | baseline | bottom */
}

caption {
  caption-side: bottom;    /* top (default) | bottom */
  padding: 0.4rem 0 0;
}`,
          },
          {
            type: 'list',
            id: 'c-l51-l1',
            style: 'bullet',
            items: [
              '**`text-align`** — the usual horizontal alignment. `left`, `center`, `right`, `justify`. Numeric columns almost always want `right` so digits line up on their decimal point.',
              '**`vertical-align`** — controls where content sits inside a tall cell. `top` and `bottom` pin it to an edge, `middle` centres it, and `baseline` (the initial value) lines the text up with the other cells in the row, which is what you almost always want when one cell holds an icon or an image.',
              '**`caption-side`** — moves the `<caption>` above or below the table. Useful for a units note or a source line under the data.',
              '**`padding` on cells, never `margin`.** A cell is a table cell first; margins on cells behave inconsistently and can collapse rows in some engines. `padding` is always safe.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l51-t1',
            title: 'Align an icon, not the whole row',
            body: 'If a row has an avatar or a status dot in the first cell and that cell looks off, set `vertical-align: middle` on *that cell only*. Forcing `vertical-align` on every cell to fix it will fight the cells that were already correct.',
          },
          {
            type: 'warning',
            id: 'c-l51-w1',
            title: 'A caption is not a heading',
            body: 'The `<caption>` element is not a heading and is not in the accessibility tree as one. If the table needs a visible label that screen reader users and search engines both understand, use a real `<h3>` outside the table, or associate a heading element with the table using `aria-labelledby`.',
          },
          {
            type: 'example',
            id: 'c-l51-e1',
            title: 'A caption below the table',
            body: 'Everything is the same as the demo except `caption-side`, which now sits under the last row. This is the standard place for a units note or a data source.',
            html: `<table class="data">
  <caption>Figures in kilograms. Source: internal inventory, October.</caption>
  <thead>
    <tr><th>Material</th><th>Mass</th></tr>
  </thead>
  <tbody>
    <tr><td>Steel bracket</td><td>1.240</td></tr>
    <tr><td>Aluminium rail</td><td>0.815</td></tr>
  </tbody>
</table>`,
            css: `table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
caption {
  caption-side: bottom;
  padding-top: 0.4rem;
  color: #9aa5b4;
  text-align: left;
}
th,
td {
  border-bottom: 1px solid #2a3441;
  padding: 0.45rem 0.6rem;
  text-align: left;
}
th {
  background: #1d2531;
}
td:last-child {
  text-align: right;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l51-x1',
            exercise: {
              id: 'ex-l51',
              instructions:
                'The amount cell below is hard to scan. Right-align it horizontally, move the caption to the bottom of the table, and give every cell 0.75rem of padding.',
              languages: ['css'],
              starterCode: {
                html: '<table class="data">\n  <caption>Order summary</caption>\n  <thead><tr><th>Item</th><th>Amount</th></tr></thead>\n  <tbody><tr><td>Hex bolt</td><td>1,240</td></tr></tbody>\n</table>',
                css: '.data {\n  border-collapse: collapse;\n  width: 100%;\n}\nth,\ntd {\n  border-bottom: 1px solid #2a3441;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l51-t1',
                  label: 'The amount column is right-aligned',
                  body: 'return getComputedStyle(document.querySelector("tbody td:last-child")).textAlign === "right"',
                },
                {
                  id: 'ex-l51-t2',
                  label: 'The caption sits below the table',
                  body: 'return getComputedStyle(document.querySelector("caption")).captionSide === "bottom"',
                },
                {
                  id: 'ex-l51-t3',
                  label: 'The cells are padded',
                  body: 'const s = getComputedStyle(document.querySelector("tbody td")); return parseFloat(s.paddingTop) >= 10 && parseFloat(s.paddingLeft) >= 10',
                },
              ],
              hints: [
                'Horizontal alignment inside a cell is the same property you use on a paragraph.',
                'The caption has its own dedicated property, `caption-side`.',
                '`.data td:last-child { text-align: right; }`, `caption { caption-side: bottom; }`, `th, td { padding: 0.75rem; }`',
              ],
              solution: {
                html: '<table class="data">\n  <caption>Order summary</caption>\n  <thead><tr><th>Item</th><th>Amount</th></tr></thead>\n  <tbody><tr><td>Hex bolt</td><td>1,240</td></tr></tbody>\n</table>',
                css: '.data {\n  border-collapse: collapse;\n  width: 100%;\n}\ncaption {\n  caption-side: bottom;\n}\nth,\ntd {\n  border-bottom: 1px solid #2a3441;\n  padding: 0.75rem;\n}\ntbody td:last-child {\n  text-align: right;\n}\n',
              },
              testNotes:
                'The tests read `text-align` on the last body cell, `caption-side` on the caption, and the computed padding on a cell. `0.75rem` computes to `12px`.',
            },
          },
        ],
      },
      {
        id: 'css-l52',
        title: 'Table Style',
        description: 'Zebra striping, hover feedback and header styling — the three rules that make a data table readable.',
        duration: 7,
        xp: 45,
        objectives: [
          'Stripe alternate rows with nth-child(even)',
          'Add a hover state to rows',
          'Style a header row that reads as distinct from the body',
          'Diagnose a zebra stripe that is invisible because cells have their own background',
        ],
        quiz: {
          id: 'quiz-css-l52',
          title: 'Table Style quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l52-q1',
              type: 'multiple-choice',
              prompt: 'Your zebra striping rule `tr:nth-child(even) { background: #eee; }` produces nothing. What is the most likely cause?',
              options: [
                '`:nth-child` only works on elements that are direct children of `body`',
                'The `tr` elements have no background because a `td` rule sets its own background',
                '`background` is not allowed on table rows in any browser',
                'The selector needs `tbody` as a prefix to match',
              ],
              answer: 1,
              explanation: 'A cell with its own background paints on top of its row, hiding the stripe entirely. Stripe the cells instead (`tr:nth-child(even) td`), or clear the cell background to `transparent`.',
            },
            {
              id: 'quiz-css-l52-q2',
              type: 'multiple-choice',
              prompt: 'Which selector stripes every second row of the table body only?',
              options: [
                '`thead tr:nth-child(even)`',
                '`tbody tr:nth-child(even)`',
                '`td:nth-child(odd)`',
                '`tbody li:nth-child(even)`',
              ],
              answer: 1,
              explanation: 'Scoping the selector to `tbody` counts rows inside the body, so the stripe starts on the second body row and no header row is involved.',
            },
            {
              id: 'quiz-css-l52-q3',
              type: 'multiple-choice',
              prompt: 'What does `.data tbody tr:hover` do?',
              options: [
                'It changes the colour of the hovered cell only',
                'It applies the style permanently after a click',
                'It targets the first row of the body',
                'It applies the style while the pointer is anywhere over that row',
              ],
              answer: 3,
              explanation: 'The pointer is genuinely over the `tr` box for the whole width of the row, so the highlight follows the row rather than a single cell.',
            },
            {
              id: 'quiz-css-l52-q4',
              type: 'multiple-choice',
              prompt: 'How do you keep a header row visible while a long table body scrolls?',
              options: [
                '`position: sticky; top: 0` on the `th` elements',
                '`position: fixed` on the `th` elements',
                '`overflow: hidden` on the `th` elements',
                '`table-layout: fixed` on the table',
              ],
              answer: 0,
              explanation: 'A sticky `th` stays pinned to the top of its scroll container, which is the same `position: sticky` behaviour used outside tables.',
            },
            {
              id: 'quiz-css-l52-q5',
              type: 'multiple-choice',
              prompt: 'Why prefer `:nth-child(even)` over adding `class="even"` to alternate rows by hand?',
              options: [
                'Classes are not allowed inside `tbody`',
                '`:nth-child` works without JavaScript and a class would not',
                'The selector cannot go stale when rows are inserted, while hand-written classes desynchronise',
                'Classes cannot be given a background colour',
              ],
              answer: 2,
              explanation: 'A selector is recalculated from the current DOM, so inserting a row keeps the stripe correct. Hand-written classes have to be maintained forever and break on the first insert.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l52-b1',
            body: 'A table full of numbers is hard to follow with the eye. Three rules fix most of it: a distinct header row, alternating row backgrounds so the eye has a rail to follow, and a hover highlight so you can see which row you are pointing at.',
          },
          {
            type: 'demo',
            id: 'c-l52-d1',
            title: 'Zebra striping, a header row and a hover state',
            body: 'Rows two and four are tinted by `tr:nth-child(even)` inside the `tbody`. The header row has its own background. Hovering any body row raises it to the highlight colour.',
            html: `<table class="data">
  <thead>
    <tr><th>Invoice</th><th>Client</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>INV-1042</td><td>Northwind Ltd</td><td>Paid</td></tr>
    <tr><td>INV-1043</td><td>Acme Corp</td><td>Pending</td></tr>
    <tr><td>INV-1044</td><td>Globex</td><td>Paid</td></tr>
    <tr><td>INV-1045</td><td>Initech</td><td>Overdue</td></tr>
  </tbody>
</table>`,
            css: `.data {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data th {
  background: #29e2bd;
  color: #0b0d10;
  text-align: left;
  padding: 0.5rem 0.7rem;
}
.data td {
  padding: 0.45rem 0.7rem;
  border-bottom: 1px solid #2a3441;
}
.data tbody tr:nth-child(even) {
  background: #161d27;
}
.data tbody tr:hover {
  background: #1f4d43;
}`,
            height: 240,
          },
          {
            type: 'text',
            id: 'c-l52-b2',
            body: 'Notice that the stripe starts on row two of the *body*, not row two of the table. `nth-child` counts siblings, and the header rows live in a separate `<thead>`, so the counting restarts naturally inside `<tbody>`. That is the reason for putting the rule inside `tbody` rather than on bare `tr` selectors.',
          },
          {
            type: 'heading',
            id: 'c-l52-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l52-c1',
            language: 'css',
            title: 'The three rules, annotated',
            code: `.data tbody tr:nth-child(even) {
  background: #161d27;   /* rows 2, 4, 6 ... of the body */
}
.data tbody tr:nth-child(even) td {
  background: transparent; /* belt and braces: keep the cell clear too */
}
.data tbody tr:hover {
  background: #1f4d43;   /* points at the row under the cursor */
}`,
          },
          {
            type: 'list',
            id: 'c-l52-l1',
            style: 'bullet',
            items: [
              '**`nth-child(even)`** — matches every second child. `odd` matches the first, third and fifth. The number is a *position among siblings*, not a class, which is why you must scope it to `tbody` if you do not want the header row counted.',
              '**`tr:hover`** — fires while the pointer is over any part of the row, because the pointer is genuinely over the `tr` box. Add `transition: background 120ms` if you want the change to feel intentional rather than flickering.',
              '**Header styling** — set `background` and `font-weight` on `th`, and if you want a header that stays put while a long table scrolls, `position: sticky` on `th` is all it takes.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l52-w1',
            title: 'A stripe on the row is invisible if the cells have backgrounds',
            body: 'A cell with its own background is painted on top of its row, so `tr { background: ... }` produces nothing at all. If your zebra stripes are not appearing, check whether any `td` rule sets a `background` — the fix is to stripe the cells (`tr:nth-child(even) td`) or clear the cell background to `transparent`.',
          },
          {
            type: 'tip',
            id: 'c-l52-t1',
            title: 'Stripe with a selector, not a class',
            body: 'Resist putting `class="odd"` on every other row by hand. It is markup you have to maintain forever, and it desynchronises the moment anyone inserts a row. `:nth-child(even)` costs nothing and can never be wrong.',
          },
          {
            type: 'example',
            id: 'c-l52-e1',
            title: 'A header that sticks while the body scrolls',
            body: 'The table is inside a fixed-height container. The `th` elements are `position: sticky`, so the header stays visible while the rows scroll under it — the same property you meet in the position section.',
            html: `<div class="scroller">
  <table class="data">
    <thead>
      <tr><th>Ref</th><th>Description</th></tr>
    </thead>
    <tbody>
      <tr><td>R-1</td><td>Hex bolt</td></tr>
      <tr><td>R-2</td><td>Washer</td></tr>
      <tr><td>R-3</td><td>Bracket</td></tr>
      <tr><td>R-4</td><td>Spacer</td></tr>
      <tr><td>R-5</td><td>Nut, nyloc</td></tr>
      <tr><td>R-6</td><td>Clevis pin</td></tr>
    </tbody>
  </table>
</div>`,
            css: `.scroller {
  height: 150px;
  overflow: auto;
}
.data {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.data th {
  position: sticky;
  top: 0;
  background: #1d2531;
  color: #e8edf4;
  text-align: left;
  padding: 0.5rem 0.7rem;
}
.data td {
  padding: 0.4rem 0.7rem;
  border-bottom: 1px solid #2a3441;
}
.data tbody tr:nth-child(even) {
  background: #161d27;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l52-x1',
            exercise: {
              id: 'ex-l52',
              instructions:
                'Add zebra striping to the table below: every even-numbered row in the body gets a background of `#161d27`. Odd rows should keep the page background.',
              languages: ['css'],
              starterCode: {
                html: '<table class="data">\n  <tbody>\n    <tr><td>Row one</td><td>a</td></tr>\n    <tr><td>Row two</td><td>b</td></tr>\n    <tr><td>Row three</td><td>c</td></tr>\n    <tr><td>Row four</td><td>d</td></tr>\n  </tbody>\n</table>',
                css: '.data {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data td {\n  border-bottom: 1px solid #2a3441;\n  padding: 0.45rem 0.7rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l52-t1',
                  label: 'The second row is striped',
                  body: 'return getComputedStyle(document.querySelector(".data tbody tr:nth-child(2)")).backgroundColor === "rgb(22, 29, 39)"',
                },
                {
                  id: 'ex-l52-t2',
                  label: 'The fourth row is striped too',
                  body: 'return getComputedStyle(document.querySelector(".data tbody tr:nth-child(4)")).backgroundColor === "rgb(22, 29, 39)"',
                },
                {
                  id: 'ex-l52-t3',
                  label: 'The first row is left unstyled',
                  body: 'const bg = getComputedStyle(document.querySelector(".data tbody tr:nth-child(1)")).backgroundColor; return bg === "rgba(0, 0, 0, 0)" || bg === "transparent"',
                },
                {
                  id: 'ex-l52-t4',
                  label: 'The stripe is a selector, not a hand-added class',
                  body: 'return document.querySelectorAll(".data tbody tr").length === 4 && !document.querySelector(".data tbody tr .even, .data tbody tr.stripe")',
                },
              ],
              hints: [
                'The number after `nth-child` is the child position, and it counts from 1.',
                'Scope the selector to `tbody` so only body rows are counted.',
                '`.data tbody tr:nth-child(even) { background: #161d27; }`',
              ],
              solution: {
                html: '<table class="data">\n  <tbody>\n    <tr><td>Row one</td><td>a</td></tr>\n    <tr><td>Row two</td><td>b</td></tr>\n    <tr><td>Row three</td><td>c</td></tr>\n    <tr><td>Row four</td><td>d</td></tr>\n  </tbody>\n</table>',
                css: '.data {\n  width: 100%;\n  border-collapse: collapse;\n}\n.data td {\n  border-bottom: 1px solid #2a3441;\n  padding: 0.45rem 0.7rem;\n}\n.data tbody tr:nth-child(even) {\n  background: #161d27;\n}\n',
              },
              testNotes:
                'The tests read the computed `background-color` of the second, fourth and first body rows. `#161d27` computes to `rgb(22, 29, 39)`; an unset background computes to `rgba(0, 0, 0, 0)`.',
            },
          },
        ],
      },
      {
        id: 'css-l53',
        title: 'Table Responsive',
        description: 'Making a wide table survive a narrow screen with a scroll container, and the card pattern that works without one.',
        duration: 7,
        xp: 45,
        objectives: [
          'Wrap a table in a container with overflow-x: auto so it scrolls instead of breaking the page',
          'Give a table a min-width so its columns do not collapse into unreadable slivers',
          'Describe the card pattern and the media query that switches to it',
          'Explain why overflow on an ancestor breaks position: sticky',
        ],
        quiz: {
          id: 'quiz-css-l53',
          title: 'Table Responsive quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l53-q1',
              type: 'multiple-choice',
              prompt: 'A wide table breaks the layout on a phone. Which fix is the safest general answer?',
              options: [
                'Add `width: 100%` to the table so it always fits',
                'Set `font-size: 8px` on the table so more columns fit',
                'Wrap it in a container with `max-width: 100%` and `overflow-x: auto`, and give the table a `min-width`',
                'Add `display: block` to every `td` unconditionally at all widths',
              ],
              answer: 2,
              explanation: 'A `width: 100%` table has no minimum, so its columns collapse into unreadable slivers rather than staying legible. Scrolling a capped wrapper and giving the table a `min-width` floor keeps the data readable and keeps the page itself from scrolling sideways.',
            },
            {
              id: 'quiz-css-l53-q2',
              type: 'multiple-choice',
              prompt: 'Which declaration on the wrapper is the load-bearing one for horizontal scrolling?',
              options: [
                '`overflow-x: auto`',
                '`overflow-x: hidden`',
                '`overflow-x: scroll`',
                '`white-space: nowrap`',
              ],
              answer: 0,
              explanation: '`auto` adds a scrollbar only when the content actually overflows. `hidden` clips the data with no way to reach it, and `scroll` forces a permanent scrollbar.',
            },
            {
              id: 'quiz-css-l53-q3',
              type: 'multiple-choice',
              prompt: 'Why give the table `min-width` rather than `width: 100%` inside the scroll wrapper?',
              options: [
                '`min-width` makes the table transparent to the wrapper',
                '`width: 100%` is invalid on a table element',
                '`min-width` keeps a readable floor so columns cannot collapse, and the wrapper scrolls instead',
                '`min-width` disables the scrollbar entirely',
              ],
              answer: 2,
              explanation: 'A percentage width lets the columns compress to slivers, while a pixel `min-width` holds their size and pushes the overflow onto the wrapper.',
            },
            {
              id: 'quiz-css-l53-q4',
              type: 'multiple-choice',
              prompt: 'In the card pattern, what replaces the hidden column header on a narrow screen?',
              options: [
                'A second `th` placed inside every row',
                'An `aria-label` on the table element',
                'A caption repeated under every row',
                'A `::before` on each cell that reads its `data-label`',
              ],
              answer: 3,
              explanation: 'Below the breakpoint the `thead` is hidden and each `td::before` generates its column name from the cell\'s `data-label`, so the value still has a label.',
            },
            {
              id: 'quiz-css-l53-q5',
              type: 'multiple-choice',
              prompt: 'Why does wrapping a table in a scroll container break a sticky header placed outside it?',
              options: [
                'Sticky only works on `td` elements',
                'An ancestor with `overflow` other than `visible` becomes the scroll container for the sticky element',
                'The wrapper forces `position: static` on all children',
                'Sticky requires `table-layout: auto`',
              ],
              answer: 1,
              explanation: 'Sticky positioning is relative to the nearest scroll container, so the wrapper captures the header. Put the sticky `thead` inside the same wrapper as the rows.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l53-b1',
            body: 'A table has an intrinsic minimum width: its columns refuse to shrink below the widest unbreakable word they contain, plus their padding. On a narrow screen that minimum wins, and the table either forces the whole page to scroll sideways or crushes its columns into unreadable slivers. There is no property that makes a table fluid on its own — you have to choose one of two patterns, and both start by deciding what is allowed to scroll.',
          },
          {
            type: 'demo',
            id: 'c-l53-d1',
            title: 'The table that breaks the page, and the one that scrolls',
            body: 'The top table is left alone, so on a narrow viewport it pushes the page wider than the screen. The bottom table is identical except that it sits inside a `max-width: 100%` wrapper with `overflow-x: auto` and the table itself is given a `min-width`. Now the page never scrolls — only the wrapper does.',
            html: `<p class="label">Unprotected — the page scrolls sideways</p>
<table class="wide">
  <thead>
    <tr><th>Ref</th><th>Description</th><th>Warehouse</th><th>Bin</th><th>Updated</th></tr>
  </thead>
  <tbody>
    <tr><td>R-1180</td><td>Hex bolt M12 galvanised</td><td>North</td><td>A-14</td><td>2026-02-11</td></tr>
    <tr><td>R-1181</td><td>Washer M12 stainless</td><td>North</td><td>A-14</td><td>2026-02-11</td></tr>
  </tbody>
</table>

<p class="label">Protected — only the wrapper scrolls</p>
<div class="scroller">
  <table class="wide">
    <thead>
      <tr><th>Ref</th><th>Description</th><th>Warehouse</th><th>Bin</th><th>Updated</th></tr>
    </thead>
    <tbody>
      <tr><td>R-1180</td><td>Hex bolt M12 galvanised</td><td>North</td><td>A-14</td><td>2026-02-11</td></tr>
      <tr><td>R-1181</td><td>Washer M12 stainless</td><td>North</td><td>A-14</td><td>2026-02-11</td></tr>
    </tbody>
  </table>
</div>`,
            css: `.label {
  margin: 0 0 0.35rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8b95a4;
}
.wide {
  border-collapse: collapse;
  font-size: 13px;
  color: #e8edf4;
  background: #141922;
}
.wide th, .wide td {
  border: 1px solid #2a3441;
  padding: 0.4rem 0.7rem;
  text-align: left;
  white-space: nowrap;
}
.wide th {
  background: #1d2531;
}
.scroller {
  max-width: 100%;
  overflow-x: auto;
  border: 1px solid #2a3441;
}
.scroller .wide {
  min-width: 520px;
}`,
            height: 260,
          },
          {
            type: 'heading',
            id: 'c-l53-h1',
            level: 3,
            body: 'Pattern one: scroll it',
          },
          {
            type: 'text',
            id: 'c-l53-b2',
            body: 'This is the honest option and the one to reach for by default. The data genuinely is wide, so let the user pan it, and give them a visible hint that there is more to see.',
          },
          {
            type: 'code',
            id: 'c-l53-c1',
            language: 'css',
            title: 'A scroll container with a floor on the table',
            code: `/* the wrapper owns the scrolling, and never grows past its parent */
.scroller {
  max-width: 100%;
  overflow-x: auto;
}

/* the table keeps a floor, so its columns stay readable while panning */
.scroller .wide {
  min-width: 520px;
}`,
          },
          {
            type: 'list',
            id: 'c-l53-l1',
            style: 'bullet',
            items: [
              '**`overflow-x: auto`** is the load-bearing declaration. `hidden` clips the content with no way to reach it, and `scroll` forces a permanent scrollbar even when the content fits.',
              '**`min-width`, not `width`.** A `width: 100%` table will happily compress its columns to nothing inside the wrapper; `min-width` lets it keep its natural size and lets the wrapper do the scrolling.',
              '**Watch for focus scrolling.** A wrapper with `overflow` becomes scrollable programmatically, so the keyboard focus ring can scroll off-screen. Add `scroll-margin` on the cells if that bites.',
              '**Give it a label.** A scrolling region is not obvious to a keyboard or screen-reader user, so it is worth `role="region"` and `aria-label` on the wrapper.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l53-w1',
            title: 'Overflow on an ancestor breaks sticky headers',
            body: 'Any ancestor with `overflow` other than `visible` becomes the scroll container for a `position: sticky` descendant, even if it never actually scrolls. Put your sticky `<thead>` inside the scroll wrapper rather than outside it, or the header will stop sticking as soon as you wrap the table.',
          },
          {
            type: 'heading',
            id: 'c-l53-h2',
            level: 3,
            body: 'Pattern two: the card',
          },
          {
            type: 'text',
            id: 'c-l53-b3',
            body: 'When the table has only a few columns, or the rows are short enough to read on their own, the card pattern beats scrolling: below a breakpoint each row stops being a row and becomes a block, with a `::before` label standing in for the header cell it no longer has.',
          },
          {
            type: 'example',
            id: 'c-l53-e1',
            title: 'Rows become cards under 560px',
            body: 'The table renders normally on a wide screen. Under `560px` the table elements are forced to `display: block`, each `td` becomes its own line, and the column header is re-created from `data-label` on the cell. Note the `thead` is hidden — at that size it would be a stack of orphaned words.',
            html: `<table class="cards">
  <thead>
    <tr><th>Ref</th><th>Description</th><th>Bin</th></tr>
  </thead>
  <tbody>
    <tr><td data-label="Ref">R-1180</td><td data-label="Description">Hex bolt M12</td><td data-label="Bin">A-14</td></tr>
    <tr><td data-label="Ref">R-1181</td><td data-label="Description">Washer M12</td><td data-label="Bin">A-14</td></tr>
  </tbody>
</table>`,
            css: `.cards {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #e8edf4;
}
.cards th, .cards td {
  border-bottom: 1px solid #2a3441;
  padding: 0.5rem 0.7rem;
  text-align: left;
}
.cards th {
  background: #1d2531;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}

@media (max-width: 560px) {
  .cards, .cards tbody, .cards tr, .cards td {
    display: block;
    width: 100%;
  }
  .cards thead {
    display: none;
  }
  .cards tr {
    margin-bottom: 0.75rem;
    border: 1px solid #2a3441;
    border-radius: 6px;
    padding: 0.35rem 0;
    background: #141922;
  }
  .cards td {
    border-bottom: 1px solid #1d2531;
  }
  .cards td::before {
    content: attr(data-label);
    display: inline-block;
    min-width: 7.5rem;
    color: #9aa5b4;
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l53-t1',
            title: 'Pick by column count, not by taste',
            body: 'Two or three columns usually reads better as cards. Four or more, or any cell holding a sentence or a number people compare across rows, is better as a scroll container — once every row is its own box, comparing one column across ten rows becomes impossible.',
          },
          {
            type: 'exercise',
            id: 'c-l53-x1',
            exercise: {
              id: 'ex-l53',
              instructions:
                'Make the table below survive a narrow screen: wrap it in a `div.scroller` with `max-width: 100%` and `overflow-x: auto`, and give the table a `min-width` of `420px` so its columns do not collapse.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<table class="data">\n  <thead>\n    <tr><th>Ref</th><th>Description</th><th>Updated</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>R-1180</td><td>Hex bolt M12 galvanised</td><td>2026-02-11</td></tr>\n    <tr><td>R-1181</td><td>Washer M12 stainless</td><td>2026-02-11</td></tr>\n  </tbody>\n</table>',
                css: '.data {\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.data th, .data td {\n  border-bottom: 1px solid #2a3441;\n  padding: 0.4rem 0.7rem;\n  text-align: left;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l53-t1',
                  label: 'The table sits inside a scroll container',
                  body: 'return !!document.querySelector(".scroller .data")',
                },
                {
                  id: 'ex-l53-t2',
                  label: 'The container is capped and scrolls horizontally',
                  body: 'const s = getComputedStyle(document.querySelector(".scroller")); return s.overflowX === "auto" && s.maxWidth === "100%"',
                },
                {
                  id: 'ex-l53-t3',
                  label: 'The table has a 420px floor',
                  body: 'return getComputedStyle(document.querySelector(".scroller .data")).minWidth === "420px"',
                },
                {
                  id: 'ex-l53-t4',
                  label: 'The table did not use a width percentage in place of min-width',
                  body: 'const w = document.querySelector(".scroller .data").style.width; return w === "" || !w.endsWith("%")',
                },
              ],
              hints: [
                'The wrapper is a new element you add around the `<table>` — the table keeps its own class.',
                '`overflow-x: auto` scrolls only when the content actually overflows, which is why it beats `scroll`.',
                'A `min-width` in pixels keeps the columns readable. Setting `width: 100%` instead lets them shrink to nothing.',
              ],
              solution: {
                html: '<div class="scroller">\n  <table class="data">\n    <thead>\n      <tr><th>Ref</th><th>Description</th><th>Updated</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>R-1180</td><td>Hex bolt M12 galvanised</td><td>2026-02-11</td></tr>\n      <tr><td>R-1181</td><td>Washer M12 stainless</td><td>2026-02-11</td></tr>\n    </tbody>\n  </table>\n</div>',
                css: '.scroller {\n  max-width: 100%;\n  overflow-x: auto;\n}\n.scroller .data {\n  min-width: 420px;\n  border-collapse: collapse;\n  font-size: 13px;\n}\n.data th, .data td {\n  border-bottom: 1px solid #2a3441;\n  padding: 0.4rem 0.7rem;\n  text-align: left;\n}\n',
              },
              testNotes:
                'The tests read computed styles. `overflow-x: auto` and `min-width: 420px` compute exactly as written; the final test guards against replacing the floor with a percentage `width`, which compiles but defeats the pattern.',
            },
          },
        ],
      },
    ],
  },
]