import type { Project } from '~/types/content'

/**
 * Two JavaScript-driven interface projects that sit between the HTML and CSS
 * exercises and the stateful application builds: one teaches the browser API,
 * the other teaches rendering from data.
 */
export const javascriptInteractionProjects: Project[] = [
  {
    id: 'project-tabs-accordion',
    slug: 'tabs-and-accordion-kit',
    title: 'Tabs and Accordion Kit',
    tagline: 'Two disclosure components on one page, written from scratch with no framework and no library.',
    summary:
      'Build a tab strip where exactly one panel is visible, and an accordion where any number of sections can be open at the same time. Both components follow the same underlying rule, which is the point: read the state out of the markup, change one attribute at a time, and never rebuild the DOM by hand.',
    difficulty: 'beginner',
    technologies: ['html', 'css', 'javascript'],
    estimatedMinutes: 120,
    xp: 400,
    brief: [
      'Write the tab markup by hand first: a list of buttons, then one panel per button, with the id of the panel written on the button as a data attribute.',
      'Decide how a tab knows which panel it owns before you write any JavaScript, because every later line depends on that one decision.',
      'Work in one direction only. On a click, find the tab that was clicked, switch the state of every tab and every panel, then stop.',
      'Reset the previous tab as carefully as you activate the new one, since a tab strip with two selected buttons is the most common bug in this exercise.',
      'Keep the markup valid without JavaScript: the first panel open, every other panel hidden, and aria-selected on the first button.',
      'Build the accordion second, by reusing the same three steps: read the state, write the new state, update the markup.',
      'Finish by tabbing through the page and confirming that nothing is clickable only with a mouse.',
    ],
    requirements: [
      'A tab strip with at least three tabs and one panel per tab, marked up with role="tablist", role="tab" and role="tabpanel".',
      'Exactly one panel is visible at a time, and the tab that is showing it is the one marked as selected.',
      'Clicking the tab that is already open leaves it open rather than closing it.',
      'Each accordion row has a heading button and a region of content, and any number of rows can be open at once.',
      'The open state of both components is written to the markup so it works before the script loads.',
      'Click handlers are attached once per component rather than once per button.',
      'The tab strip is laid out with CSS grid, and the open and selected states are visually distinct from the closed state.',
      'Both components are reachable and operable with the keyboard alone.',
    ],
    checklist: [
      {
        id: 'ic-1',
        label: 'The tab strip is marked up with role="tablist" and one role="tab" per button',
        verify: { kind: 'selector', selector: '[role="tablist"]', label: 'an element with role="tablist"' },
      },
      {
        id: 'ic-2',
        label: 'Each component finds its root element with querySelector',
        verify: { kind: 'js-call', needle: 'queryselector', label: 'a querySelector call' },
      },
      {
        id: 'ic-3',
        label: 'Every tab and every panel is collected with querySelectorAll',
        verify: { kind: 'js-call', needle: 'queryselectorall', label: 'a querySelectorAll call' },
      },
      {
        id: 'ic-4',
        label: 'Click handlers are attached with addEventListener',
        verify: { kind: 'js-call', needle: 'addeventlistener', label: 'an addEventListener call' },
      },
      {
        id: 'ic-5',
        label: 'State is changed with classList rather than by rewriting markup',
        verify: { kind: 'js-call', needle: 'classlist', label: 'a classList call' },
      },
      {
        id: 'ic-6',
        label: 'The clicked element is identified with dataset',
        verify: { kind: 'js-call', needle: 'dataset', label: 'a dataset read' },
      },
      {
        id: 'ic-7',
        label: 'The selected tab is marked with aria-selected and the panels with hidden',
        verify: { kind: 'text', needle: 'aria-selected', label: 'aria-selected on the active tab' },
      },
      {
        id: 'ic-8',
        label: 'Switching tabs leaves exactly one panel visible, and both components work from the keyboard',
        verify: { kind: 'manual', label: 'only one panel is ever visible, aria-expanded tracks the accordion rows, and arrow keys and Enter move through both components' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tabs and accordion</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="kit">
      <h1>Tabs and accordion</h1>

      <!-- Build the tab strip and its panels here. -->

      <!-- Build the accordion rows here. -->
    </main>

    <script src="script.js"></script>
  </body>
</html>
`,
      css: `.kit {
  max-width: 46rem;
  margin: 3rem auto;
  padding: 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* Write the tab strip, panel and accordion row rules here. */
`,
      javascript: `// Nothing here yet.
// Decide how a button names the panel it owns, then wire the two components.
`,
    },
    designPreviewHtml: `<section class="panel">
  <p class="eyebrow">Tabs</p>
  <div class="tabs" role="tablist">
    <button class="tab is-selected" type="button" role="tab" aria-selected="true">Overview</button>
    <button class="tab" type="button" role="tab" aria-selected="false">Setup</button>
    <button class="tab" type="button" role="tab" aria-selected="false">API</button>
  </div>

  <div class="tab-panel" role="tabpanel">
    <h2>Overview</h2>
    <p>Two components, one rule: read the current state out of the markup, then write the whole new state in a single pass. No framework, no dependencies, one small script.</p>
    <div class="meta">
      <span>12 tabs</span>
      <span>8 panels</span>
      <span>0 dependencies</span>
    </div>
  </div>
</section>

<section class="panel">
  <p class="eyebrow">Accordion</p>

  <div class="acc">
    <div class="acc-item">
      <button class="acc-head is-open" type="button" aria-expanded="true">
        <span>How does a tab remember its panel?</span>
        <span class="acc-mark" aria-hidden="true">-</span>
      </button>
      <div class="acc-body">
        <p>The button carries the id of its panel in a data attribute, so the click handler never has to guess which element to act on.</p>
      </div>
    </div>

    <div class="acc-item">
      <button class="acc-head" type="button" aria-expanded="false">
        <span>Why reset the previous tab?</span>
        <span class="acc-mark" aria-hidden="true">+</span>
      </button>
      <div class="acc-body" hidden>
        <p>Because a tab strip with two selected buttons is the most common bug in this exercise.</p>
      </div>
    </div>

    <div class="acc-item">
      <button class="acc-head" type="button" aria-expanded="false">
        <span>Does it work without JavaScript?</span>
        <span class="acc-mark" aria-hidden="true">+</span>
      </button>
      <div class="acc-body" hidden>
        <p>The markup holds a sensible open state, so the page still reads before the script loads.</p>
      </div>
    </div>
  </div>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #f6f7f9;
  color: #1a1f26;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.55;
}

.panel {
  max-width: 44rem;
  margin: 0 auto 2.25rem;
}

.eyebrow {
  margin: 0 0 0.6rem;
  color: #0f5f75;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  padding: 0.3rem;
  border: 1px solid #e0e4e9;
  border-radius: 10px;
  background: #ffffff;
}

.tab {
  padding: 0.55rem 0.75rem;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #1a1f26;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
}

.tab.is-selected {
  background: #0e7490;
  color: #ffffff;
  font-weight: 600;
}

.tab-panel {
  margin-top: 0.9rem;
  padding: 1.1rem 1.25rem;
  background: #ffffff;
  border: 1px solid #e0e4e9;
  border-left: 3px solid #0f5f75;
  border-radius: 10px;
}

.tab-panel h2 {
  margin: 0 0 0.4rem;
  font-size: 1.05rem;
}

.tab-panel p {
  margin: 0;
  color: #667080;
  font-size: 0.92rem;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
}

.meta span {
  padding: 0.2rem 0.6rem;
  border: 1px solid #e0e4e9;
  border-radius: 999px;
  color: #667080;
  font-size: 0.78rem;
}

.acc {
  border: 1px solid #e0e4e9;
  border-radius: 10px;
  overflow: hidden;
  background: #ffffff;
}

.acc-item + .acc-item {
  border-top: 1px solid #e0e4e9;
}

.acc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  padding: 0.85rem 1.1rem;
  border: 0;
  background: transparent;
  color: #1a1f26;
  font: inherit;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
}

.acc-head.is-open {
  color: #0f5f75;
  font-weight: 600;
}

.acc-mark {
  flex: none;
  width: 1.4rem;
  height: 1.4rem;
  display: grid;
  place-items: center;
  border: 1px solid #e0e4e9;
  border-radius: 6px;
  color: #0f5f75;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85rem;
}

.acc-body {
  padding: 0 1.1rem 1rem;
}

.acc-body p {
  margin: 0;
  color: #667080;
  font-size: 0.9rem;
}

@media (min-width: 560px) {
  .acc-body { padding-bottom: 1.1rem; }
}

.acc-body {
  animation: acc-open 160ms ease-out;
}

@keyframes acc-open {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: none; }
}

.tab-panel[hidden] {
  display: none;
}
`,
    designPreviewJs: `var tabs = document.querySelectorAll('.tabs .tab');
var panel = document.querySelector('.tab-panel');

if (tabs.length && panel) {
  // The markup ships the Overview panel; the other two are built here so the
  // reference can switch between them.
  var copy = {
    Setup: {
      body: 'Mark each tab up as a button, give the strip a tablist role, and point every tab at the panel it controls with aria-controls.',
      meta: ['role="tablist"', 'aria-selected', 'aria-controls']
    },
    API: {
      body: 'select(tab) hides every panel, then shows the one the tab names. One function owns the whole state so two tabs can never look selected at once.',
      meta: ['select(index)', 'aria-hidden', 'one source of truth']
    }
  };

  var panels = [panel];
  var headings = ['Overview'];

  Array.prototype.forEach.call(tabs, function (tab, index) {
    var name = tab.textContent.trim();
    if (index === 0) return;
    if (!copy[name]) return;

    var next = document.createElement('div');
    next.className = 'tab-panel';
    next.setAttribute('role', 'tabpanel');
    next.hidden = true;

    var title = document.createElement('h2');
    title.textContent = name;
    var text = document.createElement('p');
    text.textContent = copy[name].body;

    var meta = document.createElement('div');
    meta.className = 'meta';
    copy[name].meta.forEach(function (label) {
      var chip = document.createElement('span');
      chip.textContent = label;
      meta.appendChild(chip);
    });

    next.appendChild(title);
    next.appendChild(text);
    next.appendChild(meta);
    panel.parentNode.insertBefore(next, panel.nextSibling);

    panels.push(next);
    headings.push(name);
  });

  function select(index) {
    Array.prototype.forEach.call(tabs, function (tab, position) {
      var on = position === index;
      tab.classList.toggle('is-selected', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (each, position) {
      each.hidden = position !== index;
    });
    var title = panels[index].querySelector('h2');
    if (title) title.textContent = headings[index];
  }

  Array.prototype.forEach.call(tabs, function (tab, index) {
    tab.addEventListener('click', function () {
      select(index);
    });
  });
}

var heads = document.querySelectorAll('.acc-head');

Array.prototype.forEach.call(heads, function (head) {
  var body = head.nextElementSibling;
  var mark = head.querySelector('.acc-mark');

  head.addEventListener('click', function () {
    var open = head.classList.toggle('is-open');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (mark) mark.textContent = open ? '-' : '+';
    if (body) body.hidden = !open;
  });
});
`,
    solutionNote:
      'A strong solution attaches one click listener per component rather than one per button, reads the clicked button as the single source of truth, and then loops over every tab and every panel to write the new state in the same pass. It writes aria-selected and the hidden attribute alongside the visual state rather than relying on a class alone, and it lets the markup hold a sensible open state so the page still works before the script runs.',
  },
  {
    id: 'project-data-table',
    slug: 'sortable-data-table',
    title: 'Sortable and Filterable Data Table',
    tagline: 'A table of twelve records rendered from an array, ordered by any column and narrowed by a search box and a dropdown.',
    summary:
      'Render a table from a JavaScript array and then make it behave like a tool rather than a picture: order by any column, narrow the rows with a text search and a dropdown, and report honestly how many rows survived. Every interaction goes through the same render function, so there is only ever one place where the markup is built.',
    difficulty: 'advanced',
    technologies: ['html', 'css', 'javascript'],
    estimatedMinutes: 180,
    xp: 560,
    brief: [
      'Write the twelve records as an array of plain objects first, with the same property names as the columns, and look at them in the console before writing any markup.',
      'Build the header in HTML and leave the table body empty. One empty tbody element is the only thing the script is allowed to write into.',
      'Keep three pieces of state: the records, which column is the current ordering, and the two control values.',
      'Write one render function that reads the state and rebuilds the body. Filtering, ordering and counting all happen inside that call, never in the click handler.',
      'Build each row with createElement and textContent so a value that contains a tag is shown as text rather than parsed as markup.',
      'Attach a single listener to the header row and read which column was pressed from the element itself, so rows rebuilt on every render keep working.',
      'Order with sort and a comparator that handles both text and numbers, and flips direction when the same column is pressed twice.',
      'Finish with the two states every real table needs: a count that matches what is on screen, and a message when nothing is.',
    ],
    requirements: [
      'At least twelve records held in a JavaScript array of objects, not in the markup.',
      'A table with a header row where each column heading is a button that orders by that column.',
      'The active ordering column is marked with aria-sort, and pressing it a second time reverses the order.',
      'A text search input and a dropdown that narrows one column, and both are combined with the ordering.',
      'One render function rebuilds the table body from state, and every interaction calls it.',
      'Rows are built with createElement and textContent, so a value containing markup is displayed as text.',
      'The search is case-insensitive and is trimmed before it is compared.',
      'The count under the table matches the number of rows currently rendered, and updates on every change.',
      'An empty state message is shown, and the table is hidden, when no records match.',
      'The header listener is attached once to the header row rather than once per column.',
    ],
    checklist: [
      {
        id: 'dt-1',
        label: 'The active column is marked with aria-sort on its heading',
        verify: { kind: 'selector', selector: '[aria-sort]', label: 'a heading with aria-sort' },
      },
      {
        id: 'dt-2',
        label: 'The table borders are collapsed with border-collapse',
        verify: { kind: 'css-rule', needle: 'border-collapse', label: 'a border-collapse rule' },
      },
      {
        id: 'dt-3',
        label: 'One addEventListener on the header row serves every column button',
        verify: { kind: 'js-call', needle: 'addeventlistener', label: 'an addEventListener call' },
      },
      {
        id: 'dt-4',
        label: 'Rows are built with createElement rather than by writing an HTML string',
        verify: { kind: 'js-call', needle: 'createelement', label: 'a createElement call' },
      },
      {
        id: 'dt-5',
        label: 'Cell values are written with textContent so markup in a value cannot be injected',
        verify: { kind: 'js-call', needle: 'textcontent', label: 'a textContent assignment' },
      },
      {
        id: 'dt-6',
        label: 'The visible rows are chosen with filter',
        verify: { kind: 'js-call', needle: 'filter', label: 'an array filter call' },
      },
      {
        id: 'dt-7',
        label: 'The rows are ordered with sort and a comparator',
        verify: { kind: 'js-call', needle: 'sort', label: 'a sort call with a comparator' },
      },
      {
        id: 'dt-8',
        label: 'The search ignores case, the count matches the rows on screen, and the empty state appears when nothing matches',
        verify: { kind: 'manual', label: 'the search is case-insensitive, the count is always right, the empty state replaces the rows, and rows are built with forEach or a for loop' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Records</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="data-table">
      <h1>Records</h1>

      <div class="controls">
        <label class="field">
          <span>Search</span>
          <input id="search" type="search" autocomplete="off" />
        </label>

        <label class="field">
          <span>Status</span>
          <select id="status">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      </div>

      <table class="grid">
        <thead>
          <tr>
            <th scope="col"><button type="button">Name</button></th>
            <th scope="col"><button type="button">Owner</button></th>
            <th scope="col"><button type="button">Status</button></th>
            <th scope="col"><button type="button">Updated</button></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <p class="count">0 records</p>
      <p class="empty">No records match the current controls.</p>
    </main>

    <script src="script.js"></script>
  </body>
</html>
`,
      css: `.data-table {
  max-width: 58rem;
  margin: 3rem auto;
  padding: 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* Write the controls, table and row rules here. */
`,
      javascript: `// Nothing here yet.
// Keep the records at the top of the file, then derive the table from state.
`,
    },
    designPreviewHtml: `<section class="records">
  <h1>Records</h1>

  <div class="controls">
    <label class="field">
      <span>Search</span>
      <input class="input" type="search" placeholder="Name or owner" aria-label="Search records" />
    </label>

    <label class="field">
      <span>Status</span>
      <select class="input" aria-label="Status">
        <option>All</option>
        <option>Active</option>
        <option>Paused</option>
        <option>Closed</option>
      </select>
    </label>

    <span class="count">5 of 12 records</span>
  </div>

  <table class="grid">
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending"><button type="button" data-column="name">Name <span class="sort">↑</span></button></th>
        <th scope="col" aria-sort="none"><button type="button" data-column="owner">Owner <span class="sort">↕</span></button></th>
        <th scope="col" aria-sort="none"><button type="button" data-column="status">Status <span class="sort">↕</span></button></th>
        <th scope="col" aria-sort="none"><button type="button" data-column="updated">Updated <span class="sort">↕</span></button></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Atlas onboarding</td>
        <td>R. Okafor</td>
        <td><span class="pill pill--active">Active</span></td>
        <td>2026-08-14</td>
      </tr>
      <tr>
        <td>Billing migration</td>
        <td>M. Halvorsen</td>
        <td><span class="pill pill--active">Active</span></td>
        <td>2026-09-02</td>
      </tr>
      <tr>
        <td>Content refresh</td>
        <td>J. Almeida</td>
        <td><span class="pill pill--paused">Paused</span></td>
        <td>2026-07-28</td>
      </tr>
      <tr>
        <td>Design tokens</td>
        <td>S. Bergqvist</td>
        <td><span class="pill pill--active">Active</span></td>
        <td>2026-09-19</td>
      </tr>
      <tr>
        <td>Search rewrite</td>
        <td>T. Nakamura</td>
        <td><span class="pill pill--closed">Closed</span></td>
        <td>2026-06-11</td>
      </tr>
    </tbody>
  </table>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #ffffff;
  color: #16202b;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.5;
}

.records {
  max-width: 58rem;
  margin: 0 auto;
}

h1 {
  margin: 0 0 1rem;
  font-size: 1.5rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.field {
  display: grid;
  gap: 0.3rem;
}

.field span {
  color: #5f6b78;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.input {
  padding: 0.5rem 0.7rem;
  border: 1px solid #e3e6eb;
  border-radius: 8px;
  background: #ffffff;
  color: #16202b;
  font: inherit;
  font-size: 0.9rem;
}

.count {
  margin: 0 0 0 auto;
  color: #5f6b78;
  font-size: 0.85rem;
}

.grid {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border: 1px solid #e3e6eb;
  border-radius: 10px;
  overflow: hidden;
}

.grid th,
.grid td {
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #e3e6eb;
  text-align: left;
  font-size: 0.9rem;
}

.grid thead th {
  background: #f7f8fa;
  color: #5f6b78;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.grid tbody tr:last-child td {
  border-bottom: 0;
}

.grid th button {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.grid [aria-sort] button {
  color: #115e59;
}

.sort {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

td {
  color: #5f6b78;
}

.pill {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  border: 1px solid #e3e6eb;
}

.pill--active {
  border-color: #115e59;
  color: #115e59;
}

.pill--paused {
  color: #16202b;
}

.pill--paused {
  background: #fdf3e3;
}

.pill--closed {
  background: #eceef1;
  color: #4a5560;
}

tbody tr {
  transition: background-color 120ms ease;
}

tbody tr:hover {
  background: #f7f8fa;
}

.grid td,
.grid th {
  white-space: nowrap;
}

@media (max-width: 620px) {
  .count { margin-left: 0; }
  .grid th,
  .grid td { padding: 0.5rem 0.6rem; font-size: 0.82rem; }
}
`,
    designPreviewJs: `var records = document.querySelector('.records');

if (records) {
  var search = records.querySelector('input[type="search"]');
  var statusSelect = records.querySelector('select');
  var body = records.querySelector('tbody');
  var count = records.querySelector('.count');
  var headers = records.querySelectorAll('thead th');

  // The markup ships five rows and reports a total of twelve; the reference
  // keeps the rest in memory so search, filter and sort have room to work.
  var all = Array.prototype.map.call(body.querySelectorAll('tr'), function (row) {
    var cells = row.querySelectorAll('td');
    return {
      name: cells[0].textContent.trim(),
      owner: cells[1].textContent.trim(),
      status: cells[2].textContent.trim(),
      updated: cells[3].textContent.trim()
    };
  });
  var total = 12;
  var sortKey = 'name';
  var ascending = true;

  var PILL = { Active: 'active', Paused: 'paused', Closed: 'closed' };

  function render() {
    var needle = (search.value || '').trim().toLowerCase();
    var wanted = statusSelect.value;

    var rows = all.filter(function (record) {
      var matchesText =
        !needle ||
        record.name.toLowerCase().indexOf(needle) > -1 ||
        record.owner.toLowerCase().indexOf(needle) > -1;
      var matchesStatus = wanted === 'All' || record.status === wanted;
      return matchesText && matchesStatus;
    });

    rows.sort(function (a, b) {
      if (a[sortKey] === b[sortKey]) return 0;
      return (a[sortKey] < b[sortKey] ? -1 : 1) * (ascending ? 1 : -1);
    });

    body.textContent = '';
    rows.forEach(function (record) {
      var tr = document.createElement('tr');
      var name = document.createElement('td');
      name.textContent = record.name;
      var owner = document.createElement('td');
      owner.textContent = record.owner;
      var state = document.createElement('td');
      var pill = document.createElement('span');
      pill.className = 'pill pill--' + (PILL[record.status] || 'closed');
      pill.textContent = record.status;
      state.appendChild(pill);
      var updated = document.createElement('td');
      updated.textContent = record.updated;

      tr.appendChild(name);
      tr.appendChild(owner);
      tr.appendChild(state);
      tr.appendChild(updated);
      body.appendChild(tr);
    });

    count.textContent = rows.length + ' of ' + total + ' records';

    Array.prototype.forEach.call(headers, function (th) {
      var button = th.querySelector('button');
      if (!button) return;
      var active = button.dataset.column === sortKey;
      var marker = th.querySelector('.sort');
      th.setAttribute('aria-sort', active ? (ascending ? 'ascending' : 'descending') : 'none');
      if (marker) marker.textContent = active ? (ascending ? '\\u2191' : '\\u2193') : '\\u2195';
    });
  }

  Array.prototype.forEach.call(headers, function (th) {
    var button = th.querySelector('button');
    if (!button) return;
    button.addEventListener('click', function () {
      var key = button.dataset.column;
      if (key === sortKey) ascending = !ascending;
      else {
        sortKey = key;
        ascending = true;
      }
      render();
    });
  });

  search.addEventListener('input', render);
  statusSelect.addEventListener('change', render);

  render();
}
`,
    solutionNote:
      'A strong solution treats the records array as the only source of truth and rebuilds the table body in a single render function, so the click handlers only ever change state and then call it. It builds cells with createElement and textContent, attaches a single listener to the header row so rebuilt rows keep working, keeps the current column and direction in state rather than in the DOM, and renders the count and the empty state from the same array it just drew.',
  },
]