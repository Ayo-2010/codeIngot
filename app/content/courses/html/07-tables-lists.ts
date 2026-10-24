import type { Section } from '~/types/content'

export const htmlTableSections: Section[] = [
  {
    id: 'html-s24',
    title: 'HTML Tables',
    description: 'table, tr, th and td, and the header and scope attributes that make a table readable.',
    lessons: [
      {
        id: 'html-l35',
        title: 'HTML Tables',
        description: 'The four elements a table is made of, and why a header cell is not the same as a data cell.',
        duration: 7,
        objectives: [
          'Build a table with thead, tbody, tr, th and td elements',
          'Explain what scope does and when colspan and rowspan are needed',
          'Add a caption and describe the table for a screen reader',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l35',
          title: 'HTML Tables quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l35-q1',
              type: 'multiple-choice',
              prompt: 'What is the difference between th and td?',
              options: [
                'They are identical, th is just styled bold',
                'th is a header cell describing a column or row, td is a data value',
                'th is deprecated in favour of td',
                'th can only be used in thead',
              ],
              answer: 1,
              explanation: 'The difference is semantic. th labels, td holds a value, and a screen reader uses the th to announce what each value means.',
            },
            {
              id: 'quiz-html-l35-q2',
              type: 'true-false',
              prompt: 'Using a table for page layout is a good idea because tables are for layout.',
              answer: false,
              explanation: 'Tables are for tabular data. A layout table makes the reading order a guess and should be replaced with grid or flex.',
            },
            {
              id: 'quiz-html-l35-q3',
              type: 'multiple-choice',
              prompt: 'What does scope="colgroup" mean?',
              options: [
                'The header applies to one column',
                'The header applies to one row',
                'The header applies to a group of columns',
                'The header is a caption for the table',
              ],
              answer: 2,
              explanation: 'colgroup and rowgroup let a header cover several columns or rows at once.',
            },
            {
              id: 'quiz-html-l35-q4',
              type: 'blank',
              prompt: 'Which attribute makes a cell span more than one column?',
              answers: [
                'colspan',
                'colspan="2"',
                'col span',
              ],
              explanation: 'colspan sets how many columns the cell covers, rowspan how many rows.',
            },
            {
              id: 'quiz-html-l35-q5',
              type: 'multiple-choice',
              prompt: 'Why should the visual order of a table match the DOM order?',
              options: [
                'Because CSS cannot reorder table cells',
                'Because a table styled out of DOM order is navigable by eye but confusing by keyboard',
                'Because screen readers ignore CSS entirely',
                'Because browsers sort rows automatically',
              ],
              answer: 1,
              explanation: 'Keyboard and screen reader navigation follow the DOM. Reorder the markup, not just the styles.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l35-b1',
            body: 'A table is data arranged in rows and columns. HTML says so explicitly: the `<table>` element contains row groups, a row group contains rows, and a row contains cells. Two kinds of cell exist, and the difference is not cosmetic. A `<th>` is a header cell describing the column or row it sits in; a `<td>` is a data cell holding a value. Using `th` throughout a table of numbers is a common and consequential mistake.',
          },
          {
            type: 'demo',
            id: 'c-l35-d1',
            title: 'A table with a caption, header cells and scope',
            body: 'Each header cell declares what it describes. A screen reader announcing this table reads the header alongside each value, so "40" is announced as "Age: 40" rather than just a number.',
            html: `<table>
  <caption>Opening hours for the workshop</caption>
  <thead>
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Opens</th>
      <th scope="col">Closes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Monday</th>
      <td>09:00</td>
      <td>17:00</td>
    </tr>
    <tr>
      <th scope="row">Saturday</th>
      <td>10:00</td>
      <td>14:00</td>
    </tr>
  </tbody>
</table>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
table { border-collapse: collapse; }
caption { text-align: left; font-weight: 600; padding-bottom: 0.5rem; }
th, td { border: 1px solid #cbd5e1; padding: 0.4rem 0.75rem; text-align: left; }
thead th { background: #f1f5f9; }
tbody th { font-weight: 600; }`,
            height: 240,
          },
          {
            type: 'heading',
            id: 'c-l35-h1',
            level: 3,
            body: 'The elements',
          },
          {
            type: 'list',
            id: 'c-l35-l1',
            style: 'bullet',
            items: [
              '`<table>` — the whole thing. Nothing else may be a direct child of it except caption, colgroup, thead, tbody and tfoot.',
              '`<caption>` — a title or description for the table. Optional, and the first child if present.',
              '`<thead>`, `<tbody>`, `<tfoot>` — row groups. Using them is optional but makes the structure explicit.',
              '`<tr>` — a row.',
              '`<th>` — a header cell. Centred and bold by default, and semantically a label.',
              '`<td>` — a data cell. Left-aligned by default, and semantically a value.',
            ],
          },
          {
            type: 'code',
            id: 'c-l35-c1',
            language: 'html',
            title: 'Spanning cells',
            code: `<table>
  <caption>Quarterly figures</caption>
  <thead>
    <tr>
      <th scope="col" rowspan="2">Region</th>
      <th scope="colgroup" colspan="2">2026</th>
      <th scope="colgroup" colspan="2">2027</th>
    </tr>
    <tr>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North</th>
      <td>120</td><td>140</td><td>160</td><td>180</td>
    </tr>
  </tbody>
</table>

<!-- a table used for layout, which is not what tables are for -->
<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 1rem;">
  <strong>Not a table</strong>
  <p>Use CSS grid for this. A layout table announces cell positions to a screen reader and makes the reading order a guess.</p>
</div>`,
          },
          {
            type: 'heading',
            id: 'c-l35-h2',
            level: 3,
            body: 'A table is a grid you navigate',
          },
          {
            type: 'text',
            id: 'c-l35-b2',
            body: 'Screen readers move through a table cell by cell, and the only way to make sense of an isolated value is to know which headers apply to it. The `scope` attribute declares that relationship: `scope="col"` means this header describes its whole column, `scope="row"` its whole row, and `scope="colgroup"` or `scope="rowgroup"` covers a group. Browsers can often infer this from the structure, but a table with a spanning cell or an unusual layout defeats the inference, and then only `scope` and the `headers` attribute will save it.',
          },
          {
            type: 'warning',
            id: 'c-l35-w1',
            title: 'Never use a table for layout',
            body: 'It still renders, so nothing warns you. But a screen reader announces the position of every cell, the reading order becomes a two-column guess, and CSS targeting gets tangled. `display: grid` and `display: flex` do the same job correctly, and they are supported everywhere a table is.',
          },
          {
            type: 'tip',
            id: 'c-l35-t1',
            title: 'Keep the DOM order and the visual order the same',
            body: 'A table styled so the visual order differs from the markup order is navigable by eye and a mess by keyboard. If the visual order matters, reorder the rows, not just the CSS.',
          },
          {
            type: 'exercise',
            id: 'c-l35-x1',
            exercise: {
              id: 'ex-l35',
              instructions:
                'Build a table with a caption, column headers in a thead using th with scope, and one row whose first cell is a row header.',
              languages: ['html'],
              starterCode: {
                html: '<table>\n  \n</table>\n',
              },
              tests: [
                {
                  id: 'ex-l35-t1',
                  label: 'The table has a caption',
                  body: 'return !!document.querySelector("table > caption")',
                },
                {
                  id: 'ex-l35-t2',
                  label: 'There is a thead containing the column headers',
                  body: 'return document.querySelectorAll("thead th").length >= 2',
                },
                {
                  id: 'ex-l35-t3',
                  label: 'Every column header declares scope="col"',
                  body:
                    'return Array.from(document.querySelectorAll("thead th")).every(th => th.getAttribute("scope") === "col")',
                },
                {
                  id: 'ex-l35-t4',
                  label: 'There is at least one row header with scope="row"',
                  body:
                    'return Array.from(document.querySelectorAll("tbody th")).some(th => th.getAttribute("scope") === "row")',
                },
                {
                  id: 'ex-l35-t5',
                  label: 'Data cells use td, not th',
                  body: 'return document.querySelectorAll("tbody td").length >= 2',
                },
              ],
              hints: [
                'The caption is the first child of the table element.',
                'A row label goes in a th with scope="row", in the same row as the values.',
              ],
              solution: {
                html:
                  '<table>\n  <caption>Opening hours</caption>\n  <thead>\n    <tr>\n      <th scope="col">Day</th>\n      <th scope="col">Opens</th>\n      <th scope="col">Closes</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <th scope="row">Monday</th>\n      <td>09:00</td>\n      <td>17:00</td>\n    </tr>\n  </tbody>\n</table>\n',
              },
              testNotes:
                'The third and fourth tests are what make the table navigable. A screen reader uses scope to announce "Opens: 09:00" instead of a bare value.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s25',
    title: 'HTML Lists',
    description: 'What a list is for, and the difference between the three kinds.',
    lessons: [
      {
        id: 'html-l36',
        title: 'HTML Lists',
        description: 'Unordered, ordered and description lists, and choosing between them.',
        duration: 5,
        objectives: [
          'Build an unordered, an ordered and a description list',
          'Decide which list type matches the content',
          'Explain why navigation menus are lists',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l36',
          title: 'HTML Lists quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l36-q1',
              type: 'multiple-choice',
              prompt: 'Which element pairs a term with its description?',
              options: [
                'ul',
                'ol',
                'dl',
                'menu',
              ],
              answer: 2,
              explanation: 'A description list uses dt for the term and dd for the description.',
            },
            {
              id: 'quiz-html-l36-q2',
              type: 'true-false',
              prompt: 'A set of instructions should be marked up as an unordered list with a custom marker.',
              answer: false,
              explanation: 'The order carries the meaning, so it is an ol. Change the appearance with CSS list-style, not the element.',
            },
            {
              id: 'quiz-html-l36-q3',
              type: 'multiple-choice',
              prompt: 'Why is a navigation menu built as a list better than a div per link?',
              options: [
                'It renders faster',
                'It tells assistive technology how many items there are and that they belong together',
                'Lists are required by the HTML spec for menus',
                'It makes the links focusable',
              ],
              answer: 1,
              explanation: 'A list conveys count, grouping and boundaries, all of which a screen reader uses when moving through the menu.',
            },
            {
              id: 'quiz-html-l36-q4',
              type: 'blank',
              prompt: 'Which attribute marks the current page in a navigation list?',
              answers: [
                'aria-current',
                'aria-current="page"',
                'aria-current=page',
              ],
              explanation: 'aria-current="page" goes on the link element for the page you are on.',
            },
            {
              id: 'quiz-html-l36-q5',
              type: 'multiple-choice',
              prompt: 'Where does a nested sublist go?',
              options: [
                'As a sibling of the parent li',
                'Inside the parent li, after its text',
                'Inside the ul, after all the items',
                'In a separate ul after the parent list',
              ],
              answer: 1,
              explanation: 'A sublist is part of the item it belongs to, so it goes inside that li. Placing it as a sibling loses the nesting.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l36-b1',
            body: 'A list is a set of items where the order either does not matter, does matter, or where each item is a term and its definition. HTML has an element for each of those, and choosing the right one is a semantic decision that assistive technology reads out. All of them contain `li` elements, and nesting works in any of them.',
          },
          {
            type: 'demo',
            id: 'c-l36-d1',
            title: 'The three list types side by side',
            body: 'The first has no meaningful order, the second does, and the third pairs terms with descriptions. A screen reader announces "list of 3 items" for the first two and announces each term and definition for the third.',
            html: `<h3>Unordered</h3>
<ul>
  <li>Flour</li>
  <li>Butter</li>
  <li>Salt</li>
</ul>

<h3>Ordered</h3>
<ol>
  <li>Heat the oven</li>
  <li>Mix the dough</li>
  <li>Bake for 20 minutes</li>
</ol>

<h3>Description</h3>
<dl>
  <dt>Router</dt>
  <dd>Forwards packets between networks.</dd>
  <dt>Switch</dt>
  <dd>Forwards packets between devices on one network.</dd>
</dl>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
h3 { font-size: 1rem; margin: 0.75rem 0 0.25rem; }
dt { font-weight: 600; }
dd { margin: 0 0 0.5rem 1.25rem; }`,
            height: 330,
          },
          {
            type: 'list',
            id: 'c-l36-l1',
            style: 'bullet',
            items: [
              '`<ul>` — unordered. Bullets by default, but the marker is a style choice, not a semantic one.',
              '`<ol>` — ordered. Numbered, and the numbers carry meaning: steps, rankings, a sequence.',
              '`<dl>` — description list. `dt` is a term, `dd` is its description. No bullets, no numbers.',
              '`li` — the item, in any of the three.',
              '`value` on an li — overrides the number for that item. Useful when a list is split into columns.',
              '`type` on an ol — changes the marker to a, A, i or I. Presentational, and CSS does it better.',
            ],
          },
          {
            type: 'code',
            id: 'c-l36-c1',
            language: 'html',
            title: 'Nesting, and a navigation menu',
            code: `<!-- nesting: a sublist lives inside an li, not beside it -->
<ul>
  <li>Documentation
    <ul>
      <li>Getting started</li>
      <li>Reference</li>
    </ul>
  </li>
  <li>Support</li>
</ul>

<!-- navigation is a list of links -->
<nav aria-label="Main">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<!-- restarting and overriding the number -->
<ol>
  <li value="4">Fourth, explicitly</li>
  <li>Fifth</li>
</ol>`,
          },
          {
            type: 'tip',
            id: 'c-l36-t1',
            title: 'A menu is a list',
            body: 'Most tutorials build navigation out of a `div` per link. A list is correct: it tells the reader how many items there are, that they belong together, and where one ends and the next begins.',
          },
          {
            type: 'warning',
            id: 'c-l36-w1',
            title: 'Do not choose the list type by its marker',
            body: 'A list of steps rendered with round bullets is still an ordered list, and the markers should be changed with CSS list-style rather than by reaching for the wrong element. The element carries the meaning; the marker is decoration.',
          },
          {
            type: 'exercise',
            id: 'c-l36-x1',
            exercise: {
              id: 'ex-l36',
              instructions:
                'Create an unordered list of ingredients and an ordered list of steps, and mark the current page in a navigation list of links.',
              languages: ['html'],
              starterCode: {
                html: '<!-- ingredients -->\n\n<!-- steps -->\n\n<!-- navigation -->\n',
              },
              tests: [
                {
                  id: 'ex-l36-t1',
                  label: 'There is a ul with three items',
                  body: 'return document.querySelectorAll("ul li").length >= 3',
                },
                {
                  id: 'ex-l36-t2',
                  label: 'There is an ol with three steps',
                  body: 'return document.querySelectorAll("ol > li").length >= 3',
                },
                {
                  id: 'ex-l36-t3',
                  label: 'The navigation is a list of links inside a nav',
                  body:
                    'return document.querySelectorAll("nav ul li a").length >= 2',
                },
                {
                  id: 'ex-l36-t4',
                  label: 'The current page is marked with aria-current="page"',
                  body:
                    'return document.querySelectorAll("nav a[aria-current=\'page\']").length === 1',
                },
              ],
              hints: [
                'The step list is ordered, so it is an ol, and each step is an li directly inside it.',
                'aria-current="page" goes on the link, not on the list item.',
              ],
              solution: {
                html:
                  '<!-- ingredients -->\n<ul>\n  <li>Flour</li>\n  <li>Butter</li>\n  <li>Salt</li>\n</ul>\n\n<!-- steps -->\n<ol>\n  <li>Heat the oven</li>\n  <li>Mix the dough</li>\n  <li>Bake for 20 minutes</li>\n</ol>\n\n<!-- navigation -->\n<nav aria-label="Main">\n  <ul>\n    <li><a href="/" aria-current="page">Home</a></li>\n    <li><a href="/docs">Docs</a></li>\n  </ul>\n</nav>\n',
              },
              testNotes:
                'The last test covers the attribute that tells a screen reader which page you are on. Without it, a user tabbing the menu has no way to tell.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s26',
    title: 'HTML Unordered Lists',
    description: 'Bulleted lists, the marker styles, and list-style-type.',
    lessons: [
      {
        id: 'html-l37',
        title: 'HTML Unordered Lists',
        description: 'The ul element, the default marker, and the list-style properties that change it.',
        duration: 5,
        objectives: [
          'Write an unordered list and say what the default marker is',
          'Change the marker with list-style-type and remove it entirely',
          'Explain the difference between list-style and list-style-type',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l37',
          title: 'HTML Unordered Lists quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l37-q1',
              type: 'multiple-choice',
              prompt: 'What is the default list-style-type of a ul?',
              options: [
                'decimal',
                'disc',
                'circle',
                'none',
              ],
              answer: 1,
              explanation: 'A filled disc is the default marker for an unordered list.',
            },
            {
              id: 'quiz-html-l37-q2',
              type: 'multiple-choice',
              prompt: 'Which selector colours a list bullet?',
              options: [
                'li::marker',
                'li::before',
                'ul span',
                'li:first-child',
              ],
              answer: 0,
              explanation: '::marker is the pseudo-element for the marker. It accepts colour, font and content, and nothing else.',
            },
            {
              id: 'quiz-html-l37-q3',
              type: 'true-false',
              prompt: 'Setting list-style: none on a menu means the screen reader no longer announces it as a list.',
              answer: false,
              explanation: 'The list semantics come from the ul and li elements, not the marker. The count and grouping are still announced.',
            },
            {
              id: 'quiz-html-l37-q4',
              type: 'blank',
              prompt: 'Which property sets the position of the marker, inside or outside the content box?',
              answers: [
                'list-style-position',
                'list-style',
              ],
              explanation: 'list-style-position takes inside or outside, and outside is the default.',
            },
            {
              id: 'quiz-html-l37-q5',
              type: 'multiple-choice',
              prompt: 'Does the list-style-color property work in browsers?',
              options: [
                'Yes, it is widely supported',
                'No, it was never implemented; use ::marker instead',
                'Only in Firefox',
                'Only in WebKit browsers',
              ],
              answer: 1,
              explanation: 'It has never been implemented anywhere. li::marker is the way to colour a bullet.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l37-b1',
            body: 'An unordered list is written with the `<ul>` element, and each entry is an `<li>`. The default marker is a filled disc. The marker is entirely presentational — it carries no meaning, and no information is lost by changing or removing it, which is exactly what makes it safe to restyle.',
          },
          {
            type: 'demo',
            id: 'c-l37-d1',
            title: 'Four marker styles and one with no marker',
            body: 'Disc, circle, square and decimal, plus a list with no marker at all where the bullets are replaced by layout rather than by removing the structure.',
            html: `<ul class="disc"><li>Default disc marker</li><li>Second item</li></ul>
<ul class="circle"><li>Circle marker</li><li>Second item</li></ul>
<ul class="square"><li>Square marker</li><li>Second item</li></ul>
<ul class="decimal"><li>Decimal marker</li><li>Second item</li></ul>
<ul class="grid"><li>No marker, laid out as a grid</li><li>Second item</li><li>Third item</li></ul>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
ul { margin: 0.25rem 0 0.75rem; padding-left: 1.4rem; }
.disc { list-style-type: disc; }
.circle { list-style-type: circle; }
.square { list-style-type: square; }
.decimal { list-style-type: decimal; }
.grid {
  list-style: none;
  padding-left: 0;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0.25rem 2rem;
}`,
            height: 280,
          },
          {
            type: 'code',
            id: 'c-l37-c1',
            language: 'css',
            title: 'The list properties',
            code: `ul {
  /* the shorthand: type, position and image in one declaration */
  list-style: square inside url("bullet.svg");

  /* or the longhand, when you only want one of them */
  list-style-type: square;      /* disc | circle | square | decimal | none | \u25CF ... */
  list-style-position: inside;   /* outside (default) puts the marker in the margin */
  list-style-image: url("bullet.svg"); /* an image as the marker */
}

/* modern and preferred: set the marker colour separately */
li::marker {
  color: #1d4ed8;
}

/* a checkbox list, with no list semantics lost */
ul.tasks { list-style: none; padding-left: 0; }
ul.tasks li::before { content: "\\2610\\00a0"; }

/* remove the bullets entirely */
ul.plain { list-style: none; padding-left: 0; }`,
          },
          {
            type: 'tip',
            id: 'c-l37-t1',
            title: 'Use ::marker, not the list-style-color property',
            body: '`list-style-color` was never implemented in any browser. To colour the bullet, style `li::marker`. It is a limited selector — you can set colour, font and content, and that is all.',
          },
          {
            type: 'warning',
            id: 'c-l37-w1',
            title: 'Removing the marker is not removing the list',
            body: 'A menu styled with `list-style: none` is still a list, and it is still announced as one. The common mistake is going further and replacing the ul with a div of links, which throws away the count and the grouping for no gain.',
          },
          {
            type: 'exercise',
            id: 'c-l37-x1',
            exercise: {
              id: 'ex-l37',
              instructions:
                'Create an unordered list and restyle it: change the marker to squares, and colour the marker with ::marker rather than the list item text.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>\n',
                css: 'ul {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l37-t1',
                  label: 'There is a ul containing three items',
                  body:
                    'const ul = document.querySelector("ul"); return !!ul && ul.querySelectorAll("li").length === 3',
                },
                {
                  id: 'ex-l37-t2',
                  label: 'The marker type is square',
                  body:
                    'const s = getComputedStyle(document.querySelector("ul")); return s.listStyleType === "square"',
                },
                {
                  id: 'ex-l37-t3',
                  label: 'The list items still have their default padding for the marker',
                  body:
                    'return parseFloat(getComputedStyle(document.querySelector("ul")).paddingLeft) >= 10',
                },
                {
                  id: 'ex-l37-t4',
                  label: 'The list was not turned into a div',
                  body: 'return !document.querySelector("div li")',
                },
              ],
              hints: [
                'list-style-type: square changes the marker without changing the element.',
                'Colouring the bullet goes in a li::marker rule, not in the li rule.',
              ],
              solution: {
                html: '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>\n',
                css:
                  'ul {\n  list-style-type: square;\n}\n\nli::marker {\n  color: #1d4ed8;\n}\n',
              },
              testNotes:
                'The third test is a proxy for the common failure of setting list-style: none alongside a new marker type, which leaves the text flush against the edge.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s27',
    title: 'HTML Ordered Lists',
    description: 'Numbered lists, and the start, reversed and type attributes.',
    lessons: [
      {
        id: 'html-l38',
        title: 'HTML Ordered Lists',
        description: 'The ol element, and the three attributes that control how the numbering behaves.',
        duration: 5,
        objectives: [
          'Write an ordered list and say what its default numbering is',
          'Use start, reversed and type to control the numbering',
          'Explain why a numbered list is a numbered list even when the numbers are hidden',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l38',
          title: 'HTML Ordered Lists quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l38-q1',
              type: 'multiple-choice',
              prompt: 'Which attribute makes an ordered list count down?',
              options: [
                'descending',
                'reverse',
                'reversed',
                'dir="rtl"',
              ],
              answer: 2,
              explanation: 'reversed is a boolean attribute on the ol element.',
            },
            {
              id: 'quiz-html-l38-q2',
              type: 'true-false',
              prompt: 'A list of steps with the numbers hidden is still an ordered list semantically.',
              answer: true,
              explanation: 'The semantics come from the ol and li elements. CSS list-style: none changes the appearance only.',
            },
            {
              id: 'quiz-html-l38-q3',
              type: 'multiple-choice',
              prompt: 'How do you change the marker to a, b, c?',
              options: [
                'style="list-type: alpha"',
                'type="a" on the ol, or list-style-type: lower-alpha in CSS',
                'marker="alpha" on the li',
                'format="alpha" on the list',
              ],
              answer: 1,
              explanation: 'The type attribute takes a, A, i or I. The CSS equivalent is list-style-type, and the CSS route is preferred.',
            },
            {
              id: 'quiz-html-l38-q4',
              type: 'blank',
              prompt: 'Which attribute sets the number an ordered list begins counting from?',
              answers: [
                'start',
                'start="5"',
              ],
              explanation: 'It goes on the ol element, and it affects the whole list.',
            },
            {
              id: 'quiz-html-l38-q5',
              type: 'multiple-choice',
              prompt: 'Which attribute overrides the number for a single list item?',
              options: [
                'number',
                'value',
                'index',
                'ordinal',
              ],
              answer: 1,
              explanation: 'value sets the number for that li, which is useful when a list is split into columns.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l38-b1',
            body: 'An ordered list is written with the `<ol>` element. The default marker is decimal — 1, 2, 3. Three attributes change the numbering. `start` sets the first number, `reversed` counts down, and `type` changes the marker style to letters or roman numerals. All three are part of HTML rather than CSS, because the numbering is content here, not decoration.',
          },
          {
            type: 'demo',
            id: 'c-l38-d1',
            title: 'Start, reversed, and lettered markers',
            body: 'Four ordered lists. The first starts at 5, the second counts down from 10, the third uses letters, and the fourth hides the markers with CSS while keeping the ordered semantics.',
            html: `<ol start="5" class="started">
  <li>Default numbering, started at 5</li>
  <li>Six</li>
  <li>Seven</li>
</ol>

<ol reversed start="3" class="reversed">
  <li>Counting down from 3</li>
  <li>Then 2</li>
  <li>Then 1</li>
</ol>

<ol type="a" class="lettered">
  <li>Lettered</li>
  <li>Marker</li>
</ol>

<ol class="hidden-markers">
  <li>No visible number</li>
  <li>Still an ordered list</li>
</ol>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
ol { margin: 0.25rem 0 0.75rem; padding-left: 1.6rem; }
.reversed { list-style-type: lower-roman; }
.lettered { list-style-type: lower-alpha; }
.hidden-markers { list-style: none; padding-left: 0; }
.hidden-markers li::after { content: " \\2013"; color: #64748b; }`,
            height: 300,
          },
          {
            type: 'code',
            id: 'c-l38-c1',
            language: 'html',
            title: 'The three attributes',
            code: `<!-- start counting at 5 -->
<ol start="5">
  <li>Five</li>
  <li>Six</li>
</ol>

<!-- count down -->
<ol reversed start="10">
  <li>Ten</li>
  <li>Nine</li>
</ol>

<!-- letters: a, b, c -->
<ol type="a">
  <li>First</li>
  <li>Second</li>
</ol>

<!-- roman numerals: i, ii, iii -->
<ol type="I">
  <li>First</li>
</ol>

<!-- override the number for one item only -->
<ol>
  <li>One</li>
  <li value="10">Ten, jumping the numbering</li>
  <li>Eleven</li>
</ol>

<!-- ordering by a custom value: this is a presentational hack, not a reordering -->
<ol reversed style="display: flex; flex-direction: column;">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ol>`,
          },
          {
            type: 'tip',
            id: 'c-l38-t1',
            title: 'Hiding the numbers is fine',
            body: 'CSS counters exist for the cases where you want a visual number that is not the list number — a countdown timer, a step count, a progress label. Reaching for a custom counter to reorder items is a different and worse idea; put the items in the order you want.',
          },
          {
            type: 'warning',
            id: 'c-l38-w1',
            title: 'The type attribute is presentational',
            body: 'Changing 1, 2, 3 to a, b, c with `type` is valid but old-fashioned, and the same result is available with `list-style-type` on any list. The exception is a list where the numbering is genuinely part of the content, such as a legal document citing sections by roman numeral — and even then CSS can do it.',
          },
          {
            type: 'exercise',
            id: 'c-l38-x1',
            exercise: {
              id: 'ex-l38',
              instructions:
                'Create an ordered list that starts at 5, then a second one that counts down from 3 using reversed.',
              languages: ['html'],
              starterCode: {
                html: '<!-- starts at 5 -->\n\n<!-- counts down from 3 -->\n',
              },
              tests: [
                {
                  id: 'ex-l38-t1',
                  label: 'There are two ordered lists',
                  body: 'return document.querySelectorAll("ol").length === 2',
                },
                {
                  id: 'ex-l38-t2',
                  label: 'The first list starts at 5',
                  body: 'return document.querySelector("ol").getAttribute("start") === "5"',
                },
                {
                  id: 'ex-l38-t3',
                  label: 'The first list has three items',
                  body: 'return document.querySelectorAll("ol")[0].querySelectorAll("li").length === 3',
                },
                {
                  id: 'ex-l38-t4',
                  label: 'The second list is reversed and starts at 3',
                  body:
                    'const o = document.querySelectorAll("ol")[1]; return o.hasAttribute("reversed") && o.getAttribute("start") === "3"',
                },
              ],
              hints: [
                'The starting number is an attribute on the ol, not on the first li.',
                'reversed is a boolean attribute, so writing it is enough — no value needed.',
              ],
              solution: {
                html:
                  '<!-- starts at 5 -->\n<ol start="5">\n  <li>Five</li>\n  <li>Six</li>\n  <li>Seven</li>\n</ol>\n\n<!-- counts down from 3 -->\n<ol reversed start="3">\n  <li>Three</li>\n  <li>Two</li>\n  <li>One</li>\n</ol>\n',
              },
              testNotes:
                'The first item of a reversed list is the last number, so the markup reads downwards while rendering as 3, 2, 1.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s28',
    title: 'HTML Other Lists',
    description: 'Menus, the dir attribute, and how to change the marker without changing the element.',
    lessons: [
      {
        id: 'html-l39',
        title: 'HTML Other Lists',
        description: 'The menu element, right-to-left lists, and the CSS way to control every marker type.',
        duration: 5,
        objectives: [
          'Explain the status of the menu element and when it is still used',
          'Set the direction of a list marker with the dir attribute',
          'List the CSS marker types and the practical reason to use them',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l39',
          title: 'HTML Other Lists quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l39-q1',
              type: 'multiple-choice',
              prompt: 'What is the menu element used for today?',
              options: [
                'Building a navigation menu bar with keyboard behaviour',
                'Very little — its type attribute was removed and a ul is the usual choice',
                'Rendering a context menu',
                'Declaring a list of commands',
              ],
              answer: 1,
              explanation: 'The menu element has no menu semantics. A ul inside a nav, laid out with CSS, is the correct structure.',
            },
            {
              id: 'quiz-html-l39-q2',
              type: 'true-false',
              prompt: 'The dir="rtl" attribute moves list markers to the right side.',
              answer: true,
              explanation: 'Markers follow the writing direction. The padding has to be adjusted to match, or the list indents on the wrong side.',
            },
            {
              id: 'quiz-html-l39-q3',
              type: 'multiple-choice',
              prompt: 'Why is a space needed after the escape sequence in list-style-type?',
              options: [
                'For readability',
                'So the following characters are not read as part of the code point',
                'Because the browser requires it',
                'To add a gap before the text',
              ],
              answer: 1,
              explanation: 'Without a terminator the next characters are consumed into the code point, and the marker renders as nothing.',
            },
            {
              id: 'quiz-html-l39-q4',
              type: 'blank',
              prompt: 'Which list-style-type value removes the marker entirely?',
              answers: [
                'none',
              ],
              explanation: 'The list remains a list; only the marker disappears.',
            },
            {
              id: 'quiz-html-l39-q5',
              type: 'multiple-choice',
              prompt: 'Which value shows 01, 02, 03 as markers?',
              options: [
                'decimal-zero',
                'decimal-leading-zero',
                'leading-zero-decimal',
                'decimal',
              ],
              answer: 1,
              explanation: 'decimal-leading-zero pads the number to two digits.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l39-b1',
            body: 'Two things get lumped in here. The first is the `<menu>` element, which HTML once used for menus and which now has almost no purpose — the type attribute that gave it its meaning was removed, and in practice a `ul` does the job. The second is direction: lists in a right-to-left language put their marker on the right, and the `dir` attribute is how you say so explicitly rather than inheriting it.',
          },
          {
            type: 'demo',
            id: 'c-l39-d1',
            title: 'A right-to-left list and a menu element',
            body: 'The first list inherits right-to-left direction and puts its markers on the right. The second uses the menu element, which still works and is still a list.',
            html: `<ul class="rtl" dir="rtl">
  <li>ال第一个项目</li>
  <li>البند الثاني</li>
  <li>البند الثالث</li>
</ul>

<menu class="menu-demo">
  <li>Home</li>
  <li>Docs</li>
  <li>About</li>
</menu>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
.rtl { background: #f1f5f9; padding: 0.75rem 0.75rem 0.75rem 1.5rem; border-radius: 8px; }
.menu-demo { background: #ecfdf5; padding: 0.75rem 0.75rem 0.75rem 1.5rem; border-radius: 8px; }`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'c-l39-h1',
            level: 3,
            body: 'The marker types worth knowing',
          },
          {
            type: 'list',
            id: 'c-l39-l1',
            style: 'bullet',
            items: [
              '`disc`, `circle`, `square` — the three bullets, unchanged since the beginning.',
              '`decimal`, `decimal-leading-zero` — 1, 2, 3 and 01, 02, 03.',
              '`lower-alpha`, `upper-alpha`, `lower-roman`, `upper-roman` — the lettered and roman forms.',
              '`none` — no marker at all. The list is still a list.',
              '`symbols()` and `image()` in `list-style-type` — arbitrary strings or a custom image, and they take a fallback after the comma.',
            ],
          },
          {
            type: 'code',
            id: 'c-l39-c1',
            language: 'css',
            title: 'Unusual markers, and explicit direction',
            code: `/* an arbitrary string as the marker */
ul.checks { list-style-type: "\\2713\\00a0"; }
ul.dashes { list-style-type: "\\2013\\00a0"; }

/* a marker image, with a fallback type */
ul.arrows {
  list-style-type: image url("arrow.svg");
  list-style-position: outside;
}

/* marker text that is not a bullet or a number */
ul.tags { list-style-type: "\\25A0\\00a0"; }

/* direction: the markers follow the writing direction */
ul[dir="rtl"] { padding-right: 1.5rem; padding-left: 0; }

/* a menu element restyled as a horizontal bar */
menu.bar {
  display: flex;
  gap: 1rem;
  list-style: none;
  padding: 0;
}`,
          },
          {
            type: 'tip',
            id: 'c-l39-t1',
            title: 'Symbols must be followed by a space',
            body: 'The escape sequence in `list-style-type` has to be followed by a non-hex character, and a space is the reliable choice. Without it, the following characters are read as part of the code point and the marker renders as nothing.',
          },
          {
            type: 'warning',
            id: 'c-l39-w1',
            title: 'The menu element is a list, not a menu',
            body: 'Despite the name, `<menu>` does not build a menu bar, does not handle keyboard interaction, and carries no menu semantics. Use a `ul` inside a `nav`, and let CSS lay it out.',
          },
          {
            type: 'exercise',
            id: 'c-l39-x1',
            exercise: {
              id: 'ex-l39',
              instructions:
                'Build a right-to-left unordered list whose markers sit on the right, using the dir attribute rather than by reordering the markup.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<ul>\n  <li>البند الأول</li>\n  <li>البند الثاني</li>\n</ul>\n',
                css: 'ul {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l39-t1',
                  label: 'The list declares dir="rtl"',
                  body: 'return document.querySelector("ul").getAttribute("dir") === "rtl"',
                },
                {
                  id: 'ex-l39-t2',
                  label: 'The list still contains its items',
                  body: 'return document.querySelectorAll("ul li").length === 2',
                },
                {
                  id: 'ex-l39-t3',
                  label: 'The list is still a list, with markers present',
                  body:
                    'return getComputedStyle(document.querySelector("ul")).listStyleType !== "none"',
                },
                {
                  id: 'ex-l39-t4',
                  label: 'The marker sits on the right, so the padding is on the right side',
                  body:
                    'const s = getComputedStyle(document.querySelector("ul")); return parseFloat(s.paddingRight) >= 10',
                },
              ],
              hints: [
                'The dir attribute goes on the ul and takes rtl.',
                'Markers follow the writing direction, so you need room for them on the right: padding-right.',
              ],
              solution: {
                html:
                  '<ul dir="rtl">\n  <li>البند الأول</li>\n  <li>البند الثاني</li>\n</ul>\n',
                css: 'ul {\n  padding-right: 1.5rem;\n  padding-left: 0;\n}\n',
              },
              testNotes:
                'The fourth test is the part people miss. dir="rtl" moves the marker but the default left padding is still reserved, so the list looks indented on the wrong side.',
            },
          },
        ],
      },
    ],
  },
]
