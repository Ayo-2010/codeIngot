import type { HtmlTagPage } from '~/types/content'

export const htmlTagPages1: HtmlTagPage[] = [
  {
    tag: '<!--...-->',
    usage: 'Use HTML comments to leave notes for maintainers inside markup, but never store secrets or large blocks inside them because the comment text is still present in the page source.',
    example: {
      language: 'html',
      code: `<!-- Main navigation -->`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<script>', '<style>', '<noscript>'],
  },
  {
    tag: '<!DOCTYPE>',
    usage: 'Place this declaration at the very top of every HTML document to trigger standards mode. Without it, browsers may render in quirks mode and break modern CSS layout.',
    example: {
      language: 'html',
      code: `<!DOCTYPE html>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<html>', '<head>', '<body>'],
  },
  {
    tag: '<base>',
    usage: 'Define a base URL once inside <head> so every relative link, image, or form action on the page resolves from the same origin. Only one <base> is allowed per document, and it must appear before any relative URLs.',
    example: {
      language: 'html',
      code: `<base href="https://example.com/docs/">`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<link>', '<a>', '<nav>'],
  },
  {
    tag: '<basefont>',
    usage: 'Historically set a default font face and size for the entire document, but CSS provides far more control. Avoid using it in new markup.',
    example: {
      language: 'html',
      code: `<basefont color="#333" size="3">`,
    },
    support: [
      { browser: 'Chrome', version: 'No' },
      { browser: 'Edge', version: 'No' },
      { browser: 'Firefox', version: 'No' },
      { browser: 'Safari', version: 'No' },
    ],
    related: ['<font>', '<body>', '<style>'],
  },
  {
    tag: '<body>',
    usage: 'The direct child of <html> that holds everything the user actually sees. There must be exactly one <body> per document, and most global events and CSS defaults attach here.',
    example: {
      language: 'html',
      code: `<body>
  <h1>Hello</h1>
  <p>Content</p>
</body>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<html>', '<head>', '<main>'],
  },
  {
    tag: '<frame>',
    usage: 'Once used to display a separate document inside a frameset, but frames are removed from the HTML standard and break accessibility. Replace them with <iframe> or server-side composition.',
    example: {
      language: 'html',
      code: `<frame src="nav.html" name="nav">`,
    },
    support: [
      { browser: 'Chrome', version: 'No' },
      { browser: 'Edge', version: 'No' },
      { browser: 'Firefox', version: 'No' },
      { browser: 'Safari', version: 'No' },
    ],
    related: ['<frameset>', '<iframe>', '<object>'],
  },
  {
    tag: '<frameset>',
    usage: 'A container for <frame> elements that replaced <body> in frameset documents; it is obsolete and non-conforming. Use normal scrolling pages with <iframe> when embedding is needed.',
    example: {
      language: 'html',
      code: `<frameset cols="20%,80%">
  <frame src="menu.html">
  <frame src="main.html">
</frameset>`,
    },
    support: [
      { browser: 'Chrome', version: 'No' },
      { browser: 'Edge', version: 'No' },
      { browser: 'Firefox', version: 'No' },
      { browser: 'Safari', version: 'No' },
    ],
    related: ['<frame>', '<iframe>', '<body>'],
  },
  {
    tag: '<head>',
    usage: 'Holds metadata such as character encoding, viewport, title, and links to stylesheets or scripts. It never contains visible content directly; anything that should render belongs in <body>.',
    example: {
      language: 'html',
      code: `<head>
  <meta charset="utf-8">
  <title>Page</title>
</head>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<html>', '<body>', '<title>'],
  },
  {
    tag: '<html>',
    usage: 'The root element of every HTML document. All other elements must be descendants of it, and it is where the \`lang\` attribute is set for accessibility and localisation.',
    example: {
      language: 'html',
      code: `<html lang="en">
  <head>...</head>
  <body>...</body>
</html>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<head>', '<body>', '<meta>'],
  },
  {
    tag: '<link>',
    usage: 'Connect the document to external resources such as stylesheets, icons, or alternate representations. It is a void element and belongs in <head>.',
    example: {
      language: 'html',
      code: `<link rel="stylesheet" href="styles.css">`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<style>', '<a>', '<base>'],
  },
  {
    tag: '<meta>',
    usage: 'Supply machine-readable metadata that no other element expresses, such as character encoding, viewport settings, or SEO description. Keep it inside <head>.',
    example: {
      language: 'html',
      code: `<meta name="description" content="A short summary.">`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<link>', '<head>', '<title>'],
  },
  {
    tag: '<noframes>',
    usage: 'Shown only when the browser does not support frames; since all modern browsers dropped frameset support, this element is obsolete and has no practical use today.',
    example: {
      language: 'html',
      code: `<noframes>
  <p>Upgrade your browser.</p>
</noframes>`,
    },
    support: [
      { browser: 'Chrome', version: 'No' },
      { browser: 'Edge', version: 'No' },
      { browser: 'Firefox', version: 'No' },
      { browser: 'Safari', version: 'No' },
    ],
    related: ['<frameset>', '<iframe>', '<noscript>'],
  },
  {
    tag: '<noscript>',
    usage: 'Provide alternate content for users who have disabled JavaScript or whose browser does not support it. The content inside is never shown to users with JavaScript enabled.',
    example: {
      language: 'html',
      code: `<noscript>
  <p>Enable JavaScript to use this tool.</p>
</noscript>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<script>', '<template>', '<style>'],
  },
  {
    tag: '<script>',
    usage: 'Embed executable JavaScript or import modules directly in a page. Place it at the end of <body> or use \`defer\` / \`async\` so it does not block rendering.',
    example: {
      language: 'html',
      code: `<script defer src="app.js"></script>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<noscript>', '<style>', '<template>'],
  },
  {
    tag: '<style>',
    usage: 'Write CSS directly inside the document instead of linking an external stylesheet. Keep it in <head> and use the \`type="text/css"\` attribute only for legacy environments.',
    example: {
      language: 'html',
      code: `<style>
  body { color: #222; }
</style>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<link>', '<script>', '<noscript>'],
  },
  {
    tag: '<template>',
    usage: 'Hold inert HTML that can be cloned and instantiated later with JavaScript. The markup inside is not rendered until a script moves it into the document.',
    example: {
      language: 'html',
      code: `<template id="row">
  <tr><td>Data</td></tr>
</template>`,
    },
    support: [
      { browser: 'Chrome', version: '26' },
      { browser: 'Edge', version: '13' },
      { browser: 'Firefox', version: '22' },
      { browser: 'Safari', version: '8' },
    ],
    related: ['<script>', '<noscript>', '<table>'],
  },
  {
    tag: '<title>',
    usage: 'Set the title that appears in the browser tab, bookmarks, and search-engine results. There must be exactly one per document, and it belongs inside <head>.',
    example: {
      language: 'html',
      code: `<title>Understanding HTML</title>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<head>', '<meta>', '<link>'],
  },
  {
    tag: '<address>',
    usage: 'Mark up contact information for the author or owner of a page or section. Do not use it for arbitrary addresses unless they are actually contact details.',
    example: {
      language: 'html',
      code: `<address>
  <a href="mailto:dev@example.com">Email us</a>
</address>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<article>', '<aside>', '<footer>'],
  },
  {
    tag: '<article>',
    usage: 'A self-contained composition that makes sense on its own, such as a blog post, news story, or forum post. Use it when the content could be syndicated or read independently of the rest of the page.',
    example: {
      language: 'html',
      code: `<article>
  <h2>Post title</h2>
  <p>Content...</p>
</article>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<section>', '<aside>', '<header>'],
  },
  {
    tag: '<aside>',
    usage: 'Content tangentially related to the surrounding material, such as a sidebar, pull quote, or group of related links. Use it for content that could be removed without breaking the main narrative.',
    example: {
      language: 'html',
      code: `<aside>
  <h3>Related</h3>
  <ul><li>...</li></ul>
</aside>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<article>', '<section>', '<nav>'],
  },
  {
    tag: '<footer>',
    usage: 'A footer for its nearest sectioning element or the whole page. Typically contains copyright, authorship, or links to related documents.',
    example: {
      language: 'html',
      code: `<footer>
  <p>&copy; 2024 Example</p>
</footer>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<header>', '<address>', '<section>'],
  },
  {
    tag: '<h1>',
    usage: 'The top-level heading for the page or the current section. There should usually be one <h1> per page, and heading levels should descend without skipping.',
    example: {
      language: 'html',
      code: `<h1>Site title</h1>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<h2>', '<header>', '<section>'],
  },
  {
    tag: '<h2>',
    usage: 'A second-level heading under an <h1>. Use it to group major sections of a page while preserving a clear document outline.',
    example: {
      language: 'html',
      code: `<h2>Chapter</h2>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<h1>', '<h3>', '<section>'],
  },
  {
    tag: '<h3>',
    usage: 'A third-level heading under an <h2>. Use it for subsections inside a major section.',
    example: {
      language: 'html',
      code: `<h3>Topic</h3>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<h2>', '<h4>', '<section>'],
  },
  {
    tag: '<h4>',
    usage: 'A fourth-level heading under an <h3>. Use it for deeper subsections when the content hierarchy requires it.',
    example: {
      language: 'html',
      code: `<h4>Subtopic</h4>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<h3>', '<h5>', '<section>'],
  },
  {
    tag: '<h5>',
    usage: 'A fifth-level heading under an <h4>. Deep nesting is often a sign that the page structure should be rethought, but this element is available when needed.',
    example: {
      language: 'html',
      code: `<h5>Detail</h5>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<h4>', '<h6>', '<section>'],
  },
  {
    tag: '<h6>',
    usage: 'The lowest-level heading. Use it only when you truly need six levels of hierarchy; if you are regularly reaching <h6>, consider simplifying the page structure.',
    example: {
      language: 'html',
      code: `<h6>Minor note</h6>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<h5>', '<section>', '<p>'],
  },
  {
    tag: '<header>',
    usage: 'Introductory content for its nearest sectioning element or the whole page. It typically contains a heading, logo, or navigation, but it is not itself a heading.',
    example: {
      language: 'html',
      code: `<header>
  <h1>Brand</h1>
  <nav>...</nav>
</header>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<footer>', '<nav>', '<section>'],
  },
  {
    tag: '<main>',
    usage: 'The dominant content of the document, unique to that page. There must be only one visible <main> per page so assistive technology can jump directly to the primary content.',
    example: {
      language: 'html',
      code: `<main>
  <h1>Welcome</h1>
  <p>Primary content...</p>
</main>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<article>', '<section>', '<aside>'],
  },
  {
    tag: '<nav>',
    usage: 'A section of navigation links. Reserve it for major navigation blocks; do not wrap every group of links, such as footer links, in <nav>.',
    example: {
      language: 'html',
      code: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<header>', '<aside>', '<a>'],
  },
  {
    tag: '<section>',
    usage: 'A generic standalone section of a document, typically with a heading. Use it when the content is grouped thematically and could appear in a document outline.',
    example: {
      language: 'html',
      code: `<section>
  <h2>Chapter</h2>
  <p>...</p>
</section>`,
    },
    support: [
      { browser: 'Chrome', version: '1' },
      { browser: 'Edge', version: '12' },
      { browser: 'Firefox', version: '1' },
      { browser: 'Safari', version: '1' },
    ],
    related: ['<article>', '<header>', '<aside>'],
  },
]
