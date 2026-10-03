import type { HtmlTagPage } from '~/types/content'

export const htmlTagPages3: HtmlTagPage[] = [
  {
    tag: '<ins>',
    usage:
      'Wraps text that was added to a document after it was first published, so the addition is announced as an insertion instead of merely being coloured. Use it in changelogs and track-changes views alongside <del>, rather than faking edits with a background colour.',
    example: {
      language: 'html',
      code: `<p>The guide originally covered <del>tables</del> and now also
  covers <ins>forms</ins>.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<del>', '<s>', '<time>'],
  },
  {
    tag: '<kbd>',
    usage:
      'Identifies a key or key combination the reader has to press, and is usually rendered in a monospace face. Use it for instructions; reach for <code> instead when the text is something typed or printed by a program.',
    example: {
      language: 'html',
      code: `<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save the document.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<samp>', '<code>', '<pre>'],
  },
  {
    tag: '<mark>',
    usage:
      'Highlights text with a background colour so it stands out from the paragraph it sits in, typically for a search hit or the phrase under discussion. It expresses marking rather than importance, so choose <strong> when the emphasis carries real meaning.',
    example: {
      language: 'html',
      code: `<p>Three matches for <mark>canvas</mark> in this chapter.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<strong>', '<em>', '<ins>'],
  },
  {
    tag: '<q>',
    usage:
      'Marks a short quotation inside your own sentence and lets the browser add the quotation marks that match the surrounding language, so you never type them by hand. If the quoted material stands on its own as a block, use <blockquote> instead.',
    example: {
      language: 'html',
      code: `<p>The guide calls it a <q>phrase-level quotation</q>.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<blockquote>', '<cite>', '<em>'],
  },
  {
    tag: '<rp>',
    usage:
      'Supplies the parentheses that a browser shows around a ruby annotation when it cannot render ruby text itself, keeping the reading sensible. Browsers with working ruby support ignore the element completely, which is why it sits beside <rt> as a fallback.',
    example: {
      language: 'html',
      code: `<ruby>漢<rp>(</rp><rt>kan</rt><rp>)</rp>字<rp>(</rp><rt>ji</rt><rp>)</rp></ruby>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '38' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<ruby>', '<rt>', '<bdi>'],
  },
  {
    tag: '<rt>',
    usage:
      'Holds the annotation text that a <ruby> element displays next to the base character, usually a phonetic reading. It only makes sense as a child of <ruby>, and browsers set the smaller annotation type for you.',
    example: {
      language: 'html',
      code: `<p><ruby>日本<rt>にほん</rt>語<rt>ご</rt></ruby> is worth learning.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '38' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<ruby>', '<rp>', '<small>'],
  },
  {
    tag: '<ruby>',
    usage:
      'Annotates a word with a phonetic or semantic reading, as Japanese, Chinese and Korean typesetting requires. Put the base text directly inside it and wrap every reading in <rt>; you do not position anything by hand.',
    example: {
      language: 'html',
      code: `<p>The word <ruby>山水<rt>さんすい</rt></ruby> means landscape.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '38' },
      { browser: 'Safari', version: '5' },
    ],
    related: ['<rt>', '<rp>', '<bdi>'],
  },
  {
    tag: '<s>',
    usage:
      'Strikes through text that is no longer accurate or relevant, such as an old price shown for comparison. Use <del> instead when the text was genuinely removed from a previous version of a document, because only <del> exposes a deletion to assistive technology.',
    example: {
      language: 'html',
      code: `<p>Was <s>49.00</s>, now 29.00 for the first month.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<del>', '<ins>', '<u>'],
  },
  {
    tag: '<samp>',
    usage:
      'Marks output produced by a computer program so error messages and command results are not confused with what the reader typed. Pair it with <kbd> in a documentation page: keys for input, <samp> for what came back.',
    example: {
      language: 'html',
      code: `<p>Build failed: <samp>Module 'profile' not found</samp></p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<kbd>', '<code>', '<var>'],
  },
  {
    tag: '<small>',
    usage:
      'Carries text of secondary importance such as legal notes, copyright lines and fine print. It de-emphasises rather than strikes through, so it is the right choice for footnote-style asides; when you only want a smaller size for unrelated reasons, set font-size in CSS.',
    example: {
      language: 'html',
      code: `<small>Copyright 2026 Example Corp. Prices may change.</small>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<sup>', '<span>', '<p>'],
  },
  {
    tag: '<span>',
    usage:
      'A generic inline wrapper with no meaning of its own, useful as a CSS hook or as the smallest possible container. Prefer a meaningful element such as <strong>, <a> or <label> whenever one fits, and switch to <div> as soon as the content needs a block box.',
    example: {
      language: 'html',
      code: `<p>Updated by <span class="author">Ada</span> on Friday.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<div>', '<small>', '<strong>'],
  },
  {
    tag: '<strike>',
    usage:
      'An obsolete strikethrough element that browsers still render but that carries no meaning about why the text is struck. Choose <del> for a real deletion or <s> for text that is simply outdated, and never add new <strike> markup.',
    example: {
      language: 'html',
      code: `<!-- Deprecated: <strike>Old rate</strike>, write this instead -->
<p>Former price <s>49.00</s>, now 29.00.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<s>', '<del>', '<u>'],
  },
  {
    tag: '<strong>',
    usage:
      'Marks text whose importance is part of the meaning, so screen readers announce it as stressed and search engines weigh it more heavily. Prefer it over <b> in every new page; keep <b> only when you need strong styling with no semantic claim.',
    example: {
      language: 'html',
      code: `<p><strong>Warning:</strong> deleting a project cannot be undone.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<em>', '<b>', '<mark>'],
  },
  {
    tag: '<sub>',
    usage:
      'Lowers text below the baseline for chemical formulas, mathematical notation and similar conventions, with the smaller type chosen by the browser. Use it for real subscripts; a layout nudge that lowers a word is a CSS vertical-align job instead.',
    example: {
      language: 'html',
      code: `<p>Water is H<sub>2</sub>O and limestone is CaCO<sub>3</sub>.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<sup>', '<small>', '<var>'],
  },
  {
    tag: '<sup>',
    usage:
      'Raises text above the baseline for footnote references, exponent notation and ordinal markers. It is meant for genuine superscript notation, not as a trick for shifting a label up a few pixels during layout.',
    example: {
      language: 'html',
      code: `<p>E = mc<sup>2</sup>, as shown in the appendix.<sup>1</sup></p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<sub>', '<small>', '<cite>'],
  },
  {
    tag: '<time>',
    usage:
      'Wraps a human-readable date or time and, through the datetime attribute, the machine-readable form of the same moment. Use it whenever the visible text could be written differently in another locale, so parsers get one fixed value.',
    example: {
      language: 'html',
      code: `<p>Published <time datetime="2026-02-14T09:30">14 February 2026</time>.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<ins>', '<span>', '<data>'],
  },
  {
    tag: '<tt>',
    usage:
      'An obsolete teletype element that only ever produced monospace text and said nothing about what the text was. Use <code> for code, and a CSS font-family when you only need the monospace look; new <tt> markup should never be written.',
    example: {
      language: 'html',
      code: `<!-- Deprecated: <tt>npm run dev</tt>, write this instead -->
<p>Run <code>npm run dev</code> to start the dev server.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<code>', '<samp>', '<pre>'],
  },
  {
    tag: '<u>',
    usage:
      'Marks text that is underlined for annotation reasons, such as a spelling mistake or a proper name in Chinese text. Underlining a link no longer justifies the element, and for real emphasis <em> or <strong> states the intent far more clearly.',
    example: {
      language: 'html',
      code: `<p>The city name is often misspelt as <u>Londin</u>.</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<ins>', '<s>', '<em>'],
  },
  {
    tag: '<var>',
    usage:
      'Identifies a variable inside a mathematical expression so that screen readers announce it as a variable rather than as an ordinary word. Use it for symbols such as x and n in formulas; for code identifiers, <code> is the better fit.',
    example: {
      language: 'html',
      code: `<p><var>x</var> = <var>n</var>(<var>p</var> + <var>q</var>)</p>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<code>', '<samp>', '<em>'],
  },
  {
    tag: '<a>',
    usage:
      'The only element that navigates: with an href it can be opened in a new tab, copied, and followed by a crawler, which is why fake navigation with a clickable <div> or <button> breaks so much. An anchor without an href is a placeholder for a link you are still building, so keep it unstyled until the target exists.',
    example: {
      language: 'html',
      code: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">
  MDN Web Docs</a>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<link>', '<area>', '<nav>'],
  },
  {
    tag: '<area>',
    usage:
      'Defines one clickable region of an image map as a shape with coordinates, and it is a void element with no content and no fallback. Because the regions cannot be reached by touch or keyboard in practice, prefer ordinary links or buttons unless you are maintaining legacy markup.',
    example: {
      language: 'html',
      code: `<img src="/floorplan.png" alt="Office floor plan" usemap="#floorplan">
<map name="floorplan">
  <area shape="rect" coords="20,20,180,90" href="/rooms/kitchen" alt="Kitchen">
</map>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<map>', '<img>', '<a>'],
  },
  {
    tag: '<audio>',
    usage:
      'Plays sound through built-in controls, which you must keep so playback is reachable from the keyboard. Give it <source> children for every format you support, put fallback text last, and never autoplay anything audible without a user action.',
    example: {
      language: 'html',
      code: `<audio controls preload="metadata">
  <source src="/audio/theme.mp3" type="audio/mpeg">
  <source src="/audio/theme.ogg" type="audio/ogg">
  Your browser cannot play this audio.
</audio>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '3.5' },
      { browser: 'Safari', version: '4' },
    ],
    related: ['<video>', '<source>', '<track>'],
  },
  {
    tag: '<canvas>',
    usage:
      'A blank drawing surface that script paints into, and the right choice for charts, games and scenes with many changing shapes. It exposes no accessibility tree, so always supply a text alternative, and prefer inline SVG for a diagram you want to scale, style and inspect.',
    example: {
      language: 'html',
      code: `<canvas id="chart" width="320" height="160" aria-label="Sales by quarter">
  Sales by quarter chart
</canvas>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1.5' },
      { browser: 'Safari', version: '3.1' },
    ],
    related: ['<svg>', '<script>', '<img>'],
  },
  {
    tag: '<img>',
    usage:
      'Embeds a raster image as a replaced element, so it needs a src, an alt that describes the content, and explicit width and height to stop the page jumping while the file loads. Leave alt empty when the image is purely decorative, and move to <picture> when you need art direction or modern formats.',
    example: {
      language: 'html',
      code: `<img src="/assets/logo.png" alt="Example Corp" width="160" height="40">`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<picture>', '<source>', '<svg>'],
  },
  {
    tag: '<map>',
    usage:
      'Holds the set of <area> shapes that belong to one image, which is linked through the usemap attribute on that image. Image maps are effectively legacy now, since the regions are unusable on touch screens, so reach for real links or buttons in new work.',
    example: {
      language: 'html',
      code: `<map name="plan">
  <area shape="circle" coords="120,80,45" href="/lobby" alt="Lobby">
  <area shape="circle" coords="260,80,45" href="/studio" alt="Studio">
</map>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<area>', '<img>', '<a>'],
  },
  {
    tag: '<picture>',
    usage:
      'Wraps an <img> with alternative <source> candidates so the browser can pick a modern format or a crop suited to the viewport. The <img> stays as the final child as a guaranteed fallback, and only sources carrying a media or type attribute take part in the choice.',
    example: {
      language: 'html',
      code: `<picture>
  <source srcset="/wide.webp" media="(min-width: 40em)" type="image/webp">
  <img src="/wide.jpg" alt="The workshop bench" width="800" height="450">
</picture>`,
    },
    support: [
      { browser: 'Chrome', version: '32' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '38' },
      { browser: 'Safari', version: '9.1' },
    ],
    related: ['<img>', '<source>', '<video>'],
  },
  {
    tag: '<source>',
    usage:
      'Offers one candidate file to a parent <audio>, <video> or <picture> element and holds no fallback content of its own. Order matters because the browser takes the first entry it can use, which is why the last child of a media element should be plain fallback text.',
    example: {
      language: 'html',
      code: `<video controls poster="/clip.jpg">
  <source src="/clip.webm" type="video/webm">
  <source src="/clip.mp4" type="video/mp4">
  Your browser cannot play this video.
</video>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '3.5' },
      { browser: 'Safari', version: '4' },
    ],
    related: ['<video>', '<audio>', '<picture>'],
  },
  {
    tag: '<svg>',
    usage:
      'Inline vector markup that lives in the HTML document itself, so it stays sharp at any size and its parts can be targeted with CSS. Choose it for icons and diagrams you want to restyle or animate, and pick <img> with a raster format for photographic artwork.',
    example: {
      language: 'html',
      code: `<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="12" cy="12" r="10" fill="currentColor" />
</svg>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1.5' },
      { browser: 'Safari', version: '4' },
    ],
    related: ['<canvas>', '<img>', '<picture>'],
  },
  {
    tag: '<track>',
    usage:
      'Adds a timed text track to an <audio> or <video> element, and the kind attribute decides what it contains: subtitles translate speech, captions also name sounds and speakers. A video that carries speech should ship at least one track, and label it so users can tell the languages apart.',
    example: {
      language: 'html',
      code: `<video controls poster="/clip.jpg">
  <source src="/clip.mp4" type="video/mp4">
  <track kind="captions" src="/captions-en.vtt" srclang="en"
    label="English" default>
</video>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '3.5' },
      { browser: 'Safari', version: '4' },
    ],
    related: ['<video>', '<audio>', '<source>'],
  },
  {
    tag: '<video>',
    usage:
      'Plays video with built-in controls for play, volume, full screen and captions, which you should keep unless the clip is silent decoration. Add a poster image so the page does not show an empty black box, and list sources for browser coverage.',
    example: {
      language: 'html',
      code: `<video controls width="640" poster="/clip.jpg">
  <source src="/clip.webm" type="video/webm">
  <source src="/clip.mp4" type="video/mp4">
</video>`,
    },
    support: [
      { browser: 'Chrome', version: '4' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '3.5' },
      { browser: 'Safari', version: '4' },
    ],
    related: ['<audio>', '<source>', '<track>'],
  },
  {
    tag: '<applet>',
    usage:
      'An obsolete element for embedding a signed Java applet, and no current browser can run one because plugin support has been removed everywhere. Use <object> or <embed> for a plugin-style resource, <iframe> for a nested document, and plain media elements for pictures and sound.',
    example: {
      language: 'html',
      code: `<!-- Deprecated: an applet has no modern replacement, embed a document instead -->
<iframe src="/chart.html" title="Sales chart" width="320" height="200"></iframe>`,
    },
    support: [
      { browser: 'Chrome', version: 'No' },
      { browser: 'Edge', version: 'No' },
      { browser: 'Firefox', version: 'No' },
      { browser: 'Safari', version: 'No' },
    ],
    related: ['<embed>', '<object>', '<iframe>'],
  },
]