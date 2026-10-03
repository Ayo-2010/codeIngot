import type { HtmlTagPage } from '~/types/content'

export const htmlTagPages4: HtmlTagPage[] = [
  {
    tag: '<button>',
    usage:
      'Represents a control the reader activates, so it belongs whenever something happens rather than somewhere the reader goes. Always state the type, because the default is submit and a stray button inside a form will post the page.',
    example: {
      language: 'html',
      code: `<button type="button" class="filter">Unread only</button>
<button type="submit">Save draft</button>
<button type="button" disabled aria-disabled="true">Archived</button>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<form>', '<input>', '<fieldset>'],
  },
  {
    tag: '<caption>',
    usage:
      'Provides the accessible name for a table and is the first child of the table, before any row group. It describes the whole table, not a column, and the text is what most screen readers announce when the table receives focus.',
    example: {
      language: 'html',
      code: `<table>
  <caption>Trail conditions, October</caption>
  <thead>
    <tr><th scope="col">Segment</th><th scope="col">Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Ridge loop</td><td>Open</td></tr>
  </tbody>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<table>', '<th>', '<thead>'],
  },
  {
    tag: '<col>',
    usage:
      'Applies shared properties such as width or background to a single column when placed inside a <colgroup>. It is a void element, so it takes no closing tag, and it has no effect outside a table.',
    example: {
      language: 'html',
      code: `<table>
  <colgroup>
    <col class="numeric">
    <col>
  </colgroup>
  <tr><td>2.4</td><td>Updated</td></tr>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<colgroup>', '<table>', '<span>'],
  },
  {
    tag: '<colgroup>',
    usage:
      'Groups one or more <col> elements so a set of columns can be styled or sized as a unit. Put the shared styling on the colgroup itself to cover the whole run, and use span when the run covers several columns.',
    example: {
      language: 'html',
      code: `<table>
  <colgroup span="2" class="key-columns">
  </colgroup>
  <colgroup class="data-columns">
  </colgroup>
  <tr><td>Name</td><td>Role</td><td>Score</td></tr>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<col>', '<table>', '<tbody>'],
  },
  {
    tag: '<datalist>',
    usage:
      'Supplies a set of suggested values for an <input> without preventing other input, so the reader can ignore the list and type something else. The suggestions are a convenience, not validation; never treat them as the only allowed answers.',
    example: {
      language: 'html',
      code: `<label for="framework">Framework</label>
<input id="framework" name="framework" list="frameworks">
<datalist id="frameworks">
  <option value="Nuxt"></option>
  <option value="SvelteKit"></option>
</datalist>`,
    },
    support: [
      { browser: 'Chrome', version: '37' },
      { browser: 'Edge', version: '79' },
      { browser: 'Firefox', version: '18' },
      { browser: 'Safari', version: '5.1' },
    ],
    related: ['<input>', '<option>', '<select>'],
  },
  {
    tag: '<details>',
    usage:
      'Holds content the reader can reveal on demand, with the disclosure triangle and open state handled by the browser. Pair it with a <summary> as the first child, and remember that a closed disclosure is hidden from find-in-page.',
    example: {
      language: 'html',
      code: `<details>
  <summary>How is the score calculated?</summary>
  <p>Each answer is weighted by the time taken.</p>
</details>`,
    },
    support: [
      { browser: 'Chrome', version: '12' },
      { browser: 'Edge', version: '79' },
      { browser: 'Firefox', version: '49' },
      { browser: 'Safari', version: '6' },
    ],
    related: ['<summary>', '<dialog>', '<iframe>'],
  },
  {
    tag: '<dialog>',
    usage:
      'Shows a modal or non-modal overlay, and showModal gives you the focus trap, the backdrop and Escape-to-close for free. Give it a close button inside, since Escape is not discoverable on its own, and prefer it over a div with a z-index.',
    example: {
      language: 'html',
      code: `<dialog id="delete-dialog" aria-labelledby="delete-title">
  <h2 id="delete-title">Delete this project?</h2>
  <p>This cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>`,
    },
    support: [
      { browser: 'Chrome', version: '37' },
      { browser: 'Edge', version: '79' },
      { browser: 'Firefox', version: '98' },
      { browser: 'Safari', version: '15.4' },
    ],
    related: ['<details>', '<form>', '<button>'],
  },
  {
    tag: '<embed>',
    usage:
      'Embeds external content such as a plugin or SVG at a point in the page, and is a void element with no fallback content of its own. Modern work usually wants <iframe> or <object> instead, because they can hold fallback markup.',
    example: {
      language: 'html',
      code: `<embed src="diagram.svg" type="image/svg+xml" width="320" height="200">`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '2' },
      { browser: 'Safari', version: '3.1' },
    ],
    related: ['<object>', '<param>', '<iframe>'],
  },
  {
    tag: '<fieldset>',
    usage:
      'Groups related controls as one labelled unit, which is what lets a browser disable the whole set at once and draw a box around it. Give it a <legend> as its first child, because that legend is the accessible name for the group.',
    example: {
      language: 'html',
      code: `<fieldset>
  <legend>Delivery</legend>
  <label><input type="radio" name="ship" value="standard"> Standard</label>
  <label><input type="radio" name="ship" value="express"> Express</label>
</fieldset>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<legend>', '<form>', '<label>'],
  },
  {
    tag: '<form>',
    usage:
      'Collects related controls and submits them together as one request, which is also what makes Enter submit from most single-line inputs. Only controls carrying a name are included in the data, and group related fields with fieldset and legend rather than a bare div.',
    example: {
      language: 'html',
      code: `<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>
  <button type="submit">Subscribe</button>
</form>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<fieldset>', '<label>', '<input>', '<button>'],
  },
  {
    tag: '<iframe>',
    usage:
      'Embeds another document in an inline frame, and because it is a separate browsing context it needs its own title for screen readers. Sandboxing is worth adding: sandbox alone blocks scripts, forms and popups without breaking ordinary embeds.',
    example: {
      language: 'html',
      code: `<iframe
  src="https://example.com/embed"
  title="Quarterly chart"
  loading="lazy"
  sandbox
></iframe>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<embed>', '<object>', '<audio>'],
  },
  {
    tag: '<input>',
    usage:
      'Collects a single line of typed data, and the type attribute decides which keyboard, validation and picker the reader gets. Every input needs a label, and placeholder text is not a substitute because it disappears on focus and often fails contrast checks.',
    example: {
      language: 'html',
      code: `<label for="qty">Quantity</label>
<input id="qty" name="qty" type="number" min="1" max="99" value="1" required>

<input type="checkbox" name="gift" checked>
<label for="gift">Include gift wrap</label>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<label>', '<select>', '<textarea>', '<button>'],
  },
  {
    tag: '<label>',
    usage:
      'Captions a form control, and clicking the label focuses that control, which is why it beats a placeholder. Tie the two together with a for attribute matching the control id, or nest the control inside the label when the association is implicit.',
    example: {
      language: 'html',
      code: `<label for="search">Search lessons</label>
<input id="search" name="q" type="search">

<label>
  <input type="checkbox" name="done">
  Hide completed lessons
</label>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<input>', '<fieldset>', '<legend>'],
  },
  {
    tag: '<legend>',
    usage:
      'Labels the fieldset it sits inside, and browsers render it as the first line interrupting the group border. It must be the first child of the fieldset, and it is the group name screen readers announce, so keep it short and concrete.',
    example: {
      language: 'html',
      code: `<fieldset>
  <legend>Preferred contact</legend>
  <label><input type="radio" name="contact" value="email"> Email</label>
  <label><input type="radio" name="contact" value="phone"> Phone</label>
</fieldset>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<fieldset>', '<label>', '<form>'],
  },
  {
    tag: '<meter>',
    usage:
      'Shows a measurement inside a known range, such as disk usage, and it is for status rather than for progress of a task. Without value it becomes indeterminate, and unlike progress it should not animate while the value climbs.',
    example: {
      language: 'html',
      code: `<label for="disk">Disk used</label>
<meter id="disk" value="0.72" min="0" max="1" low="0.5" high="0.8" optimum="0.4"></meter>`,
    },
    support: [
      { browser: 'Chrome', version: '8' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '16' },
      { browser: 'Safari', version: '5.1' },
    ],
    related: ['<progress>', '<output>', '<input>'],
  },
  {
    tag: '<object>',
    usage:
      'Embeds an external resource such as a PDF, an image or a plugin, and unlike embed it can hold fallback content for readers whose browser cannot handle the resource. Parameters for the plugin go in child param elements.',
    example: {
      language: 'html',
      code: `<object type="application/pdf" data="/docs/spec.pdf" width="480" height="640">
  <p>No PDF viewer available. <a href="/docs/spec.pdf">Download the spec</a></p>
</object>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '3.1' },
    ],
    related: ['<embed>', '<param>', '<iframe>'],
  },
  {
    tag: '<optgroup>',
    usage:
      'Groups related options inside a select and the browser renders the group name as a non-selectable divider. The label attribute names the group, and it helps when a long list needs a second level of structure.',
    example: {
      language: 'html',
      code: `<select name="region">
  <optgroup label="Europe">
    <option value="uk">United Kingdom</option>
    <option value="ie">Ireland</option>
  </optgroup>
  <optgroup label="Americas">
    <option value="ca">Canada</option>
  </optgroup>
</select>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<option>', '<select>', '<datalist>'],
  },
  {
    tag: '<option>',
    usage:
      'Defines one choice inside a select or one suggestion inside a datalist, and the value attribute is what gets submitted rather than the visible text when the two differ. The first option in a select is the default, so make sure it is a real choice and not a placeholder.',
    example: {
      language: 'html',
      code: `<select name="size">
  <option value="s">Small</option>
  <option value="m" selected>Medium</option>
  <option value="l">Large</option>
</select>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<optgroup>', '<select>', '<datalist>'],
  },
  {
    tag: '<output>',
    usage:
      'Holds a result the browser computed itself, such as a sum of other fields, and it is announced politely when its value changes. It carries a name so the result submits with the form, and for="ids" ties it to the inputs it summarises.',
    example: {
      language: 'html',
      code: `<form oninput="total.value = (qty.value * price.value).toFixed(2)">
  <input id="qty" name="qty" type="number" value="3">
  <input id="price" name="price" type="number" step="0.01" value="4.50">
  <output name="total" for="qty price">13.50</output>
</form>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '5.1' },
    ],
    related: ['<meter>', '<progress>', '<input>'],
  },
  {
    tag: '<param>',
    usage:
      'Supplies a named parameter to the object element it sits inside, and it is a void element with no closing tag. The element is obsolete: put configuration on the object with data-* attributes, or on the embedded document itself.',
    example: {
      language: 'html',
      code: `<object type="application/x-shockwave-flash" data="/legacy.swf">
  <param name="quality" value="high">
</object>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '3.1' },
    ],
    related: ['<object>', '<embed>', '<link>'],
  },
  {
    tag: '<progress>',
    usage:
      'Reports how far a task has got, and it is indeterminate when no value is set, which is the right state for work whose length is unknown. Unlike meter it is meant to increase, so avoid using it for a fixed measurement.',
    example: {
      language: 'html',
      code: `<label for="upload">Uploading</label>
<progress id="upload" value="70" max="100">70%</progress>

<progress id="sync">Syncing…</progress>`,
    },
    support: [
      { browser: 'Chrome', version: '8' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '16' },
      { browser: 'Safari', version: '5.1' },
    ],
    related: ['<meter>', '<output>', '<label>'],
  },
  {
    tag: '<select>',
    usage:
      'Opens a control for choosing one option from a list, and it is the right answer when the options are known and the set is small. It has almost no styling control, so when you need multi-select or custom presentation, use checkboxes instead.',
    example: {
      language: 'html',
      code: `<label for="lang">Language</label>
<select id="lang" name="lang" required>
  <option value="">Choose a language</option>
  <option value="en" selected>English</option>
  <option value="es">Spanish</option>
</select>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<option>', '<optgroup>', '<input>', '<datalist>'],
  },
  {
    tag: '<summary>',
    usage:
      'Provides the always-visible label of a details element and acts as the toggle. It must be the first child of details, it accepts phrasing content only, and it is the click target readers use to open the disclosure.',
    example: {
      language: 'html',
      code: `<details>
  <summary>Keyboard shortcuts</summary>
  <dl>
    <dt><kbd>Ctrl</kbd> + <kbd>K</kbd></dt>
    <dd>Open the command palette</dd>
  </dl>
</details>`,
    },
    support: [
      { browser: 'Chrome', version: '12' },
      { browser: 'Edge', version: '79' },
      { browser: 'Firefox', version: '49' },
      { browser: 'Safari', version: '6' },
    ],
    related: ['<details>', '<dialog>', '<button>'],
  },
  {
    tag: '<table>',
    usage:
      'Holds tabular data where rows and columns both carry meaning, and it brings keyboard navigation for free. It is the wrong element for layout, which is what CSS grid and flexbox are for; a layout table is announced as a data table and reads as nonsense.',
    example: {
      language: 'html',
      code: `<table>
  <caption>Support</caption>
  <thead>
    <tr><th scope="col">Browser</th><th scope="col">Version</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Chrome</th><td>1</td></tr>
  </tbody>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<caption>', '<thead>', '<tbody>', '<tr>', '<th>', '<td>'],
  },
  {
    tag: '<tbody>',
    usage:
      'Groups the main block of rows in a table body, and browsers insert it automatically if you write rows directly inside table. Give it its own class when you style odd and even rows, since nth-child on tr does not survive a re-sort.',
    example: {
      language: 'html',
      code: `<table>
  <tbody class="rows">
    <tr><td>Alpha</td><td>12</td></tr>
    <tr><td>Beta</td><td>31</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Total</td><td>43</td></tr>
  </tfoot>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<table>', '<thead>', '<tfoot>', '<tr>'],
  },
  {
    tag: '<td>',
    usage:
      'Holds one data cell inside a row, and its scope is implied by the table structure. For a cell that labels a row or column, use th with a scope instead, because th is announced as a header and responds to the sort state.',
    example: {
      language: 'html',
      code: `<table>
  <tr>
    <th scope="row">Chrome</th>
    <td>1</td>
  </tr>
  <tr>
    <th scope="row">Firefox</th>
    <td>1</td>
  </tr>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<th>', '<tr>', '<tbody>'],
  },
  {
    tag: '<textarea>',
    usage:
      'Collects multi-line text, and the rows and cols attributes set its visible size because the reader can still resize it. Text inside the element is the default value, so remember to escape any angle brackets the reader might have typed in.',
    example: {
      language: 'html',
      code: `<label for="notes">Release notes</label>
<textarea id="notes" name="notes" rows="5" cols="40" maxlength="500" required></textarea>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<input>', '<label>', '<output>'],
  },
  {
    tag: '<tfoot>',
    usage:
      'Groups the rows at the foot of a table, such as a totals row, and browsers may render it above the body when the table is long. Put it after tbody in the source even when it is displayed at the top.',
    example: {
      language: 'html',
      code: `<table>
  <tbody>
    <tr><td>Hosting</td><td>24.00</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Total</th><td>24.00</td></tr>
  </tfoot>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<tbody>', '<thead>', '<tr>'],
  },
  {
    tag: '<th>',
    usage:
      'Marks a header cell for a row or a column, and scope tells assistive technology which kind it is. Inside a thead it is a column header, inside a tbody it labels its row, and scope="row" is what makes a sortable table usable.',
    example: {
      language: 'html',
      code: `<table>
  <thead>
    <tr>
      <th scope="col">Version</th>
      <th scope="col" aria-sort="ascending">Release date</th>
    </tr>
  </thead>
  <tbody>
    <tr><th scope="row">1.0</th><td>March</td></tr>
  </tbody>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<td>', '<caption>', '<thead>'],
  },
  {
    tag: '<thead>',
    usage:
      'Groups the header rows of a table and is where column labels live. Browsers repeat these rows when a long table breaks across pages, which is why column headers belong here rather than in the first body row.',
    example: {
      language: 'html',
      code: `<table>
  <thead>
    <tr><th scope="col">Segment</th><th scope="col">Elevation</th></tr>
  </thead>
  <tbody>
    <tr><td>Ridge loop</td><td>1,240 m</td></tr>
  </tbody>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<tbody>', '<tfoot>', '<tr>', '<th>'],
  },
  {
    tag: '<tr>',
    usage:
      'Is one row in a table and its cells are th for headers or td for data. Browsers add it when rows are written directly inside table, so its main value is giving a row a class, an id or event handlers of its own.',
    example: {
      language: 'html',
      code: `<table>
  <tbody>
    <tr class="is-selected" aria-selected="true">
      <th scope="row">Beta</th>
      <td>31</td>
    </tr>
  </tbody>
</table>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<td>', '<th>', '<tbody>', '<thead>'],
  },
]
