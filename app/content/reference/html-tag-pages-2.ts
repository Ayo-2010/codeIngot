import type { HtmlTagPage } from '~/types/content'

export const htmlTagPages2: HtmlTagPage[] = [
  {
    tag: '<blockquote>',
    usage:
      'Use it for a passage quoted from another source, so the quotation is set apart from your own prose both visually and for assistive technology. A short quotation woven into a sentence belongs in a <q> instead.',
    example: {
      language: 'html',
      code: `<blockquote cite="https://example.com/essays/on-simplicity">
  <p>Simplicity is a prerequisite for reliability.</p>
</blockquote>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<q>', '<cite>', '<p>'],
  },
  {
    tag: '<br>',
    usage:
      'Insert it only where the author intends a hard line break, such as the lines of a postal address or a stanza of verse, and let text wrap everywhere else. Unlike a block element it does not open a new paragraph, so reach for <p> when you need paragraph spacing.',
    example: {
      language: 'html',
      code: `<address>
  12 Analytical Engine Way<br>
  London WC2N 5HA
</address>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<p>', '<wbr>', '<hr>'],
  },
  {
    tag: '<center>',
    usage:
      'It centres its contents, but the element is obsolete and can neither be styled nor extended. Centre with CSS text-align or auto margins instead, and keep the tag only when you have to maintain a document written before CSS.',
    example: {
      language: 'html',
      code: `<center>
  <h2>Archived notice</h2>
</center>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<div>', '<p>', '<style>'],
  },
  {
    tag: '<div>',
    usage:
      'It is the default block container for the many cases where no element carries the meaning you need, such as a card, a grid cell or a form row. Reach for a semantic element such as <section>, <article> or <ul> first and reserve <div> for the leftovers.',
    example: {
      language: 'html',
      code: `<div class="card">
  <h2>Release notes</h2>
  <p>Version 2.1.0 shipped on Tuesday.</p>
</div>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<section>', '<span>', '<p>'],
  },
  {
    tag: '<figcaption>',
    usage:
      'Add it as the first or last child of a <figure> to label or credit the referenced content. The caption is optional, but when the media needs a visible explanation put it here rather than in a sibling <p> so that it moves with the figure.',
    example: {
      language: 'html',
      code: `<figure>
  <img src="/charts/downloads-2025.png" alt="Monthly downloads, 2021 to 2025">
  <figcaption>Monthly package downloads, Jan 2021 to Dec 2025.</figcaption>
</figure>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<figure>', '<img>', '<caption>'],
  },
  {
    tag: '<figure>',
    usage:
      'Wrap a diagram, photo, chart or code sample that the surrounding text refers to and that could be moved without breaking the prose. It is for self-contained referenced content, not general layout, so a plain <div> is the better choice for styling-only groupings.',
    example: {
      language: 'html',
      code: `<figure>
  <pre><code>npm ci
npm run build</code></pre>
  <figcaption>Install dependencies, then build.</figcaption>
</figure>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<figcaption>', '<img>', '<pre>'],
  },
  {
    tag: '<hr>',
    usage:
      'Use it to mark a thematic break at a point where the content changes topic, and remember that it is a separator rather than decoration. When you only want a visual line, put a border on a <div> or <section> instead, and never put content inside the element.',
    example: {
      language: 'html',
      code: `<p>Shipping and returns</p>
<hr>
<p>Contact the store within 30 days of delivery.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<p>', '<br>', '<div>'],
  },
  {
    tag: '<p>',
    usage:
      'It is the default container for a run of text in the document flow and the element that supplies default paragraph spacing. Use a heading for section titles and a <div> for grouping non-text content, since a <p> may not contain flow content such as lists.',
    example: {
      language: 'html',
      code: `<p>The first release shipped on 4 March 1991.</p>
<p>A second paragraph begins after a blank line.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<div>', '<br>', '<h1>'],
  },
  {
    tag: '<pre>',
    usage:
      'Preserve the author line breaks and spacing, which is what code samples, ASCII diagrams and poetry need. Wrap code in a <code> element inside it so the fragment is also marked up as code, because <code> on its own preserves no whitespace.',
    example: {
      language: 'html',
      code: `<pre><code>const total = [2, 4, 6]
  .reduce((sum, n) => sum + n, 0)</code></pre>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<code>', '<figure>', '<samp>'],
  },
  {
    tag: '<wbr>',
    usage:
      'Mark a point where the line is allowed to break if it needs to, which is what long URLs, file names and identifiers require. Prefer it to a hard <br> because it only breaks when the line would otherwise overflow.',
    example: {
      language: 'html',
      code: `<p>
  Reference: <a href="/docs">https://example.com/docs/<wbr>getting-started</a>
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<br>', '<a>', '<p>'],
  },
  {
    tag: '<dd>',
    usage:
      'It supplies the description half of a term and description pair inside a <dl>, and one term may take several of them. Put the term in a <dt> before it rather than faking the pairing with indented paragraphs.',
    example: {
      language: 'html',
      code: `<dl>
  <dt>Graceful degradation</dt>
  <dd>Losing enhanced features without losing core function.</dd>
</dl>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<dl>', '<dt>', '<li>'],
  },
  {
    tag: '<dir>',
    usage:
      'It laid out a multi-column list of directory entries and has been obsolete since HTML 5. Reproduce the effect with a <ul> styled with CSS columns, and keep the tag only when editing documents written before HTML 5.',
    example: {
      language: 'html',
      code: `<dir>
  <li>quarterly-reports</li>
  <li>annual-audits</li>
</dir>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<ul>', '<li>', '<ol>'],
  },
  {
    tag: '<dl>',
    usage:
      'It groups terms with their definitions, which is what glossaries, FAQ pairs and specification metadata lists are built from. A description list is not a table, so use <table> when values form genuine rows and columns and <ul> for a flat run of items.',
    example: {
      language: 'html',
      code: `<dl>
  <dt>Latency</dt>
  <dd>Time between the request and the first byte.</dd>
  <dt>Throughput</dt>
  <dd>Requests served per second.</dd>
</dl>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<dt>', '<dd>', '<ul>'],
  },
  {
    tag: '<dt>',
    usage:
      'It is the term half of a pair in a <dl> and acts as the implicit heading for the <dd> elements that follow it. Keep its content to phrasing such as text, <a> or <abbr>, because a <dt> may not hold flow content like paragraphs.',
    example: {
      language: 'html',
      code: `<dl>
  <dt><abbr title="Cascading Style Sheets">CSS</abbr></dt>
  <dd>The language used to style a document.</dd>
</dl>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<dd>', '<dl>', '<dfn>'],
  },
  {
    tag: '<li>',
    usage:
      'It marks one entry in a list and belongs only inside <ol>, <ul> or the obsolete <dir>. The list carries the semantics, so drive spacing, markers and layout from the parent with CSS rather than from the item itself.',
    example: {
      language: 'html',
      code: `<ul>
  <li>Write the markup first</li>
  <li>Then style it</li>
</ul>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<ul>', '<ol>', '<dl>'],
  },
  {
    tag: '<ol>',
    usage:
      'A numbered list for items where the sequence itself carries meaning, such as steps in a procedure. When the order means nothing use <ul>, and reach for the type or value attributes only when the numbering must differ from the default sequence.',
    example: {
      language: 'html',
      code: `<ol>
  <li>Clone the repository</li>
  <li value="10">Run the migrations</li>
  <li>Start the server</li>
</ol>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<ul>', '<li>', '<dl>'],
  },
  {
    tag: '<ul>',
    usage:
      'An unordered list for a set of items where the sequence means nothing, such as navigation links or a bulleted feature summary. The element supplies no markers of its own, so set list-style from CSS.',
    example: {
      language: 'html',
      code: `<ul>
  <li><a href="/docs">Documentation</a></li>
  <li><a href="/status">Service status</a></li>
</ul>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<ol>', '<li>', '<nav>'],
  },
  {
    tag: '<abbr>',
    usage:
      'Mark a shortened form and supply the expansion in the title attribute, which assistive technology and tooltips then announce. Use it for initialisms as well as ordinary abbreviations, because the dedicated <acronym> element was folded into this one.',
    example: {
      language: 'html',
      code: `<p>
  The <abbr title="HyperText Markup Language">HTML</abbr> parser builds a tree.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<acronym>', '<dfn>', '<q>'],
  },
  {
    tag: '<acronym>',
    usage:
      'It once marked initialisms such as HTML, but HTML 5 folded that meaning into <abbr>, so it carries no extra semantics today. Replace it with <abbr> and keep the expansion in the title attribute.',
    example: {
      language: 'html',
      code: `<p>
  <acronym title="Cascading Style Sheets">CSS</acronym> is obsolete; write
  <abbr title="Cascading Style Sheets">CSS</abbr> instead.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<abbr>', '<span>', '<i>'],
  },
  {
    tag: '<b>',
    usage:
      'It draws attention to text the way <strong> does, but it carries no importance in the accessibility tree and is purely presentational today. Use <strong> when the emphasis is real meaning, and a CSS font-weight when it is only styling.',
    example: {
      language: 'html',
      code: `<p>
  <b>Breaking change:</b> the <code>config</code> key is now
  <code>settings</code>.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<strong>', '<i>', '<mark>'],
  },
  {
    tag: '<bdi>',
    usage:
      'Isolate a run of text so its own direction is worked out independently of the surrounding text, which is what user names, product codes and mixed-script strings need. Use it when the content is unknown in advance, and <bdo> when you want to force a direction.',
    example: {
      language: 'html',
      code: `<p>
  Signed in as <bdi dir="auto">مدى (mada-92)</bdi> and
  <bdi dir="auto">Jörg (joerg)</bdi>.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<bdo>', '<span>', '<i>'],
  },
  {
    tag: '<bdo>',
    usage:
      'Force the text direction of its contents with the dir attribute, overriding whatever the document inherits. Use it for a fragment you know is written in one direction, such as a Japanese or Hebrew string inside an English sentence.',
    example: {
      language: 'html',
      code: `<p>
  The Hebrew word for peace is <bdo dir="rtl">שלום</bdo>, written inside
  an otherwise left-to-right sentence.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<bdi>', '<p>', '<span>'],
  },
  {
    tag: '<big>',
    usage:
      'It rendered text one step larger and has been obsolete since HTML 5, so nothing requires browsers to honour it. Set the size with CSS font-size, and mark genuine importance with <strong> instead.',
    example: {
      language: 'html',
      code: `<p>
  <big>Ships with the 3.0 release</big> - obsolete, use CSS font-size.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<small>', '<strong>', '<b>'],
  },
  {
    tag: '<cite>',
    usage:
      'Name the creative work the prose refers to, the title of a book, film, paper or piece of art, rather than the person being quoted. Put the author in plain text, and use <q> when the quotation itself is the point being made.',
    example: {
      language: 'html',
      code: `<p>
  The essay <cite>Behancing the Unpredictable</cite> argues that reliable
  systems leave room for surprise.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<q>', '<em>', '<blockquote>'],
  },
  {
    tag: '<code>',
    usage:
      'Mark a fragment as computer code so browsers can style it and screen readers can announce it distinctly from prose. Wrap multi-line samples in a <pre> as well, because <code> on its own preserves no whitespace.',
    example: {
      language: 'html',
      code: `<p>
  Set the token first: <code>export API_TOKEN=abc123</code>, then run
  the migration.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<pre>', '<samp>', '<kbd>'],
  },
  {
    tag: '<data>',
    usage:
      'Expose a human-readable value together with a machine-readable equivalent in the value attribute, which is what scripts and custom widgets read. Use it when a visible number, date or measurement needs a precise value behind it, and plain text otherwise.',
    example: {
      language: 'html',
      code: `<p>
  Queue depth: <data value="128">128 items</data>, refreshed every
  <time datetime="PT30S">30 seconds</time>.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '5' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '2' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<time>', '<output>', '<dfn>'],
  },
  {
    tag: '<del>',
    usage:
      'Mark text as removed in the source document, with the deletion moment available in the datetime attribute, so edits and change logs render struck through. Use it for content that is genuinely gone, and <s> for text that is wrong but still present.',
    example: {
      language: 'html',
      code: `<p>
  The API returns <del datetime="2026-02-01">status</del>
  <ins datetime="2026-02-01">state</ins>.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<ins>', '<s>', '<p>'],
  },
  {
    tag: '<dfn>',
    usage:
      'Identify the term being defined at the point the definition appears, which lets the page link to that definition and tells assistive technology what is being introduced. Use it for the single defining instance, not for every later mention of the word.',
    example: {
      language: 'html',
      code: `<p>
  A <dfn id="heuristic">heuristic</dfn> is a shortcut that trades
  accuracy for speed.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<abbr>', '<a>', '<em>'],
  },
  {
    tag: '<em>',
    usage:
      'Mark text the author emphasises, a stress on one word or a passage read in a different tone, and the meaning reaches assistive technology. For importance that is not a change of tone use <strong>, and for a term being introduced use <dfn>.',
    example: {
      language: 'html',
      code: `<p>
  She said the word <em>never</em> twice, and never in the same tone.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<strong>', '<dfn>', '<cite>'],
  },
  {
    tag: '<font>',
    usage:
      'It set colour, size and face through attributes, which is exactly what CSS does and can be overridden cleanly. Replace it with color, font-size and font-family rules, and reserve presentational tags for documents that predate CSS.',
    example: {
      language: 'html',
      code: `<p>
  <font color="crimson" size="5" face="Georgia">Legacy styling</font> -
  use CSS instead.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<big>', '<b>', '<style>'],
  },
  {
    tag: '<i>',
    usage:
      'Mark a span of text in a different voice or mood, such as an idiom, a ship name or a scientific name. Reach for <em> when the difference is stress on the words themselves, and for pure iconography use a <span> with a font or an icon rather than an <i> holding a glyph.',
    example: {
      language: 'html',
      code: `<p>
  The vessel <i>HMS Beagle</i> carried the genus <i>Galapagos</i> on
  its final voyage.
</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<em>', '<b>', '<span>'],
  },
]
