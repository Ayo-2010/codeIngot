import type { Section } from '~/types/content'

export const htmlMetaSections: Section[] = [
  {
    id: 'html-s33',
    title: 'HTML JavaScript',
    description: 'The script element, where it goes, and the attributes that control how it loads.',
    lessons: [
      {
        id: 'html-l44',
        title: 'HTML JavaScript',
        description: 'Putting a script in a document, and the three placements that behave differently.',
        duration: 6,
        objectives: [
          'Add a script with the script element and understand when it runs',
          'Explain why defer and async change execution order',
          'Use the noscript element for content that needs no script',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l44',
          title: 'HTML JavaScript quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l44-q1',
              type: 'multiple-choice',
              prompt: 'What does a script in the head with no attributes do to parsing?',
              options: [
                'Nothing, parsing continues in parallel',
                'It blocks the parser until the script has been fetched and run',
                'It runs after the page has loaded',
                'It runs before the head is closed',
              ],
              answer: 1,
              explanation: 'A plain script is parser-blocking, which is the reason defer exists.',
            },
            {
              id: 'quiz-html-l44-q2',
              type: 'true-false',
              prompt: 'defer scripts execute in the order they appear in the document.',
              answer: true,
              explanation: 'Deferred scripts download in parallel but execute in document order, after parsing has finished.',
            },
            {
              id: 'quiz-html-l44-q3',
              type: 'multiple-choice',
              prompt: 'Which attribute is right for an independent third-party tag that does not care when it runs?',
              options: [
                'defer',
                'async',
                'blocking',
                'type="module"',
              ],
              answer: 1,
              explanation: 'async executes as soon as the file arrives, with no ordering guarantee — which is fine for a self-contained tag.',
            },
            {
              id: 'quiz-html-l44-q4',
              type: 'blank',
              prompt: 'Which element holds content shown when scripting is unavailable?',
              answers: [
                'noscript',
                '<noscript>',
              ],
              explanation: 'The browser renders its contents only when scripting is off.',
            },
            {
              id: 'quiz-html-l44-q5',
              type: 'multiple-choice',
              prompt: 'What does defer do on an inline script with no src?',
              options: [
                'Defers it until after parsing',
                'Nothing — there is nothing to download, so it runs where it appears',
                'Throws an error',
                'Converts it to a module',
              ],
              answer: 1,
              explanation: 'Deferral is about download timing. An inline script has no fetch step, so the attribute has no effect.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l44-b1',
            body: 'The `<script>` element embeds or links executable JavaScript. A `src` attribute points at a file; without it the code goes between the tags. The important thing to understand is when it runs. A script in the head with no attributes blocks the parser: the browser stops reading the document, fetches the script, runs it, and only then carries on. That is why a script that touches the DOM has to come after the elements it touches.',
          },
          {
            type: 'demo',
            id: 'c-l44-d1',
            title: 'A script that fills in the page',
            body: 'The button has a data attribute in the markup. The script reads it and writes it into the output area, which demonstrates the ordering problem: the script must run after the elements exist.',
            html: `<button id="go" data-name="Ada">Introduce me</button>
<p id="out" aria-live="polite">Nothing yet.</p>

<script>
  const btn = document.getElementById('go');
  const out = document.getElementById('out');
  btn.addEventListener('click', () => {
    out.textContent = 'Hello, ' + btn.dataset.name + '.';
  });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
button { padding: 0.4rem 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; }`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'c-l44-h1',
            level: 3,
            body: 'The three placements',
          },
          {
            type: 'list',
            id: 'c-l44-l1',
            style: 'bullet',
            items: [
              '**Head, no attributes** — blocks the parser. Downloads, runs, then parsing resumes. Use it only for something that must happen before the page renders.',
              '**Head, `defer`** — downloaded in parallel, executed in order, after the document has been parsed. This is the default choice for your own scripts.',
              '**Head, `async`** — downloaded in parallel and executed the moment it arrives, in no guaranteed order. Right for independent analytics or ad scripts, wrong for anything that depends on order.',
              '**End of body, no attributes** — the old way of avoiding the blocking problem. It works and it delays every script, and `defer` is better.',
            ],
          },
          {
            type: 'code',
            id: 'c-l44-c1',
            language: 'html',
            title: 'The same script, three ways',
            code: `<!-- blocking: the parser stops until this has run -->
<head>
  <script src="blocking.js"></script>
</head>

<!-- deferred: parallel download, in-order execution, after parsing -->
<head>
  <script src="app.js" defer></script>
  <script src="widgets.js" defer></script>
</head>

<!-- async: parallel download, executed as soon as each arrives -->
<head>
  <script src="analytics.js" async></script>
  <script src="ads.js" async></script>
</head>

<!-- inline, with a type that stops it being treated as JavaScript -->
<script type="application/json" id="config">
  {"theme": "dark", "locale": "en-GB"}
</script>

<!-- a module: deferred by default, strict mode, and scoped -->
<script type="module" src="app.js"></script>

<!-- and the fallback -->
<noscript>
  <p>This page needs JavaScript for the interactive map. The
     <a href="/data.csv">data is available as a CSV</a> instead.</p>
</noscript>`,
          },
          {
            type: 'tip',
            id: 'c-l44-t1',
            title: 'defer is the default answer',
            body: 'Almost every script you write is your own code, needs the DOM, and has an order. `defer` gives all three without the guesswork. Reach for `async` only when the script genuinely does not matter when it runs — a third-party tag that reports on its own.',
          },
          {
            type: 'warning',
            id: 'c-l44-w1',
            title: 'Neither defer nor async applies to an inline script',
            body: 'An inline script has nothing to download, so there is nothing to defer. It runs immediately at the position it appears in the document, wherever that is. That is why a module script is the better choice for anything non-trivial — module scripts are deferred by definition.',
          },
          {
            type: 'exercise',
            id: 'c-l44-x1',
            exercise: {
              id: 'ex-l44',
              instructions:
                'Load a deferred script from the head and give the page a noscript fallback that explains what is missing.',
              languages: ['html'],
              starterCode: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Report</title>\n  \n</head>\n<body>\n  <h1>Report</h1>\n  <div id="chart"></div>\n  \n</body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l44-t1',
                  label: 'There is a script element in the head',
                  body: 'return !!document.querySelector("head script")',
                },
                {
                  id: 'ex-l44-t2',
                  label: 'The script is deferred',
                  body: 'return document.querySelector("head script").hasAttribute("defer")',
                },
                {
                  id: 'ex-l44-t3',
                  label: 'The script is not marked async',
                  body: 'return !document.querySelector("head script").hasAttribute("async")',
                },
                {
                  id: 'ex-l44-t4',
                  label: 'There is a noscript element with some content',
                  body:
                    'const n = document.querySelector("noscript"); return !!n && n.textContent.trim().length > 20',
                },
              ],
              hints: [
                'defer is a boolean attribute — writing defer is enough, with no value.',
                'noscript holds plain markup, not a paragraph of text inside an attribute.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Report</title>\n  <script src="chart.js" defer></script>\n</head>\n<body>\n  <h1>Report</h1>\n  <div id="chart"></div>\n  <noscript>\n    <p>This chart needs JavaScript. The same figures are in the summary table below.</p>\n  </noscript>\n</body>\n</html>\n',
              },
              testNotes:
                'The third test is the habit worth keeping. async and defer on the same script means one of them is doing nothing, and the order you thought you had is not the order you get.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s34',
    title: 'HTML File Paths',
    description: 'How the browser resolves a path, and why a link that works locally fails on a server.',
    lessons: [
      {
        id: 'html-l45',
        title: 'HTML File Paths',
        description: 'Absolute paths, relative paths, and the three places a path can start from.',
        duration: 5,
        objectives: [
          'Predict where a relative path resolves from a page in a subfolder',
          'Explain why an absolute filesystem path fails on a web server',
          'Choose between root-relative and relative for a given structure',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l45',
          title: 'HTML File Paths quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l45-q1',
              type: 'multiple-choice',
              prompt: 'What does ../styles/site.css resolve against?',
              options: [
                'The site root',
                'The folder one level above the current page, then into styles',
                'The domain root',
                'Nothing, it is malformed',
              ],
              answer: 1,
              explanation: 'Each ../ steps up one directory from the folder holding the current page.',
            },
            {
              id: 'quiz-html-l45-q2',
              type: 'true-false',
              prompt: 'A path that works when a file is opened locally will always work on a server.',
              answer: false,
              explanation: 'A file URL has a drive letter and an http URL has a host. Relative paths resolve differently in each.',
            },
            {
              id: 'quiz-html-l45-q3',
              type: 'multiple-choice',
              prompt: 'Why might a path 404 on a Linux server after working on a Mac?',
              options: [
                'Linux is slower',
                'The server is case-sensitive and the path case does not match the file',
                'Linux does not serve images',
                'The browser is different',
              ],
              answer: 1,
              explanation: 'macOS and Windows filesystems are case-insensitive by default; Linux is not.',
            },
            {
              id: 'quiz-html-l45-q4',
              type: 'blank',
              prompt: 'Which element changes the base that relative paths resolve against?',
              answers: [
                'base',
                '<base>',
                'base element',
              ],
              explanation: 'A base href makes every relative path on the page resolve against that URL.',
            },
            {
              id: 'quiz-html-l45-q5',
              type: 'multiple-choice',
              prompt: 'Which form of path is most stable across a multi-page site?',
              options: [
                'document-relative, such as style.css',
                'root-relative, such as /css/site.css',
                'parent-relative, such as ../css/site.css',
                'a filesystem path',
              ],
              answer: 1,
              explanation: 'A leading slash anchors resolution at the site root, so it behaves the same from any folder depth.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l45-b1',
            body: 'A file path tells the browser where to find a resource. It is resolved against a base, and the base is usually the URL of the page you are on. The three forms differ only in where they start from. A path beginning with `/` starts at the root of the site. A path beginning with the name of a folder starts from the folder holding the current page. A path beginning with `../` steps up one folder first. A path like `C:\\Users\\...` starts from a disk, and a web server has no idea what that means.',
          },
          {
            type: 'demo',
            id: 'c-l45-d1',
            title: 'Four forms of the same resource',
            body: 'These are four different ways of writing a path to an image. They are not interchangeable — each one resolves from a different base, and only some of them work on a server.',
            html: `<div class="path">
  <code>/img/logo.png</code>
  <span>root-relative — from the site root, works at any depth</span>
</div>
<div class="path">
  <code>logo.png</code>
  <span>document-relative — from this page's own folder</span>
</div>
<div class="path">
  <code>../img/logo.png</code>
  <span>parent-relative — up one folder, then down into img</span>
</div>
<div class="path broken">
  <code>C:\\images\\logo.png</code>
  <span>a filesystem path — meaningless to a web server</span>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
.path { padding: 0.4rem 0.6rem; background: #f0fdf4; border-left: 3px solid #16a34a; margin-bottom: 0.4rem; }
.path span { display: block; color: #475569; font-size: 13px; }
.path code { background: #dcfce7; padding: 0.05rem 0.3rem; }
.broken { background: #fef2f2; border-left-color: #dc2626; }
.broken code { background: #fee2e2; }`,
            height: 240,
          },
          {
            type: 'heading',
            id: 'c-l45-h1',
            level: 3,
            body: 'The case that wastes an afternoon',
          },
          {
            type: 'text',
            id: 'c-l45-b2',
            body: 'You open `index.html` by double-clicking it. The browser builds a URL like `file:///C:/project/index.html` and a relative path resolves against the file on disk, so it works. You upload the folder, the server serves the same structure, and now the same relative path resolves to a URL that does not exist. Nothing about the markup changed. The difference is that a file URL has a drive letter in it and an http URL has a host, and only the second is a real location on a web server.',
          },
          {
            type: 'list',
            id: 'c-l45-l1',
            style: 'bullet',
            items: [
              '`/about.html` — root-relative. Stable at any depth, and the usual choice for a multi-page site.',
              '`style.css` — document-relative. Breaks the moment the file moves into a subfolder.',
              '`../style.css` — parent-relative. Works, and gets harder to follow as depth increases.',
              '`//cdn.example.com/x.js` — protocol-relative. Inherits the current protocol; prefer writing https explicitly.',
              '`C:\\...` or `/Users/...` — filesystem paths. Never valid in a document served over HTTP.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l45-t1',
            title: 'The base element changes resolution',
            body: 'A `<base href="...">` in the head makes every relative path on the page resolve against that URL instead of the page. It is occasionally necessary — for a document rendered at many URLs — and it is also an easy way to break every other relative path on the page. Use it knowing exactly what it does.',
          },
          {
            type: 'warning',
            id: 'c-l45-w1',
            title: 'Case sensitivity is a server setting, not a browser one',
            body: 'A path written `/Img/Logo.png` works locally on Windows and 404s on a case-sensitive Linux server. Author every path in exactly the case the file has on disk, and remember it on every deploy target.',
          },
          {
            type: 'exercise',
            id: 'c-l45-x1',
            exercise: {
              id: 'ex-l45',
              instructions:
                'Reference a stylesheet with a root-relative path and a script with a document-relative path, and mark up a page in a subfolder so both resolve correctly.',
              languages: ['html'],
              starterCode: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Docs</title>\n  \n</head>\n<body>\n  <h1>Docs</h1>\n</body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l45-t1',
                  label: 'There is a root-relative link',
                  body:
                    'return Array.from(document.querySelectorAll("link[href]")).some(l => l.getAttribute("href").startsWith("/"))',
                },
                {
                  id: 'ex-l45-t2',
                  label: 'There is a document-relative script',
                  body:
                    'return Array.from(document.querySelectorAll("script[src]")).some(s => { const h = s.getAttribute("src"); return !!h && !h.startsWith("/") && !/^https?:/.test(h) && !h.startsWith("..") })',
                },
                {
                  id: 'ex-l45-t3',
                  label: 'No path is an absolute filesystem path',
                  body:
                    'return !Array.from(document.querySelectorAll("[href], [src]")).some(e => /^[A-Za-z]:\\\\/.test(e.getAttribute("href") || e.getAttribute("src") || ""))',
                },
                {
                  id: 'ex-l45-t4',
                  label: 'The stylesheet is declared as a stylesheet',
                  body:
                    'return Array.from(document.querySelectorAll("link[href]")).some(l => l.getAttribute("rel") === "stylesheet")',
                },
              ],
              hints: [
                'A leading slash marks the root-relative path; no leading slash marks the document-relative one.',
                'A drive letter in a path is the giveaway that it came from a file system.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Docs</title>\n  <link rel="stylesheet" href="/css/site.css">\n  <script src="page.js" defer></script>\n</head>\n<body>\n  <h1>Docs</h1>\n</body>\n</html>\n',
              },
              testNotes:
                'The third test is the check that catches the local-only mistake. A path with a drive letter in it cannot work on any server.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s35',
    title: 'HTML Head',
    description: 'Everything in the head, the metadata that is not really metadata, and what belongs in the body instead.',
    lessons: [
      {
        id: 'html-l46',
        title: 'HTML Head',
        description: 'The head element, its children, and the difference between metadata and document settings.',
        duration: 5,
        objectives: [
          'List the elements that belong in the head and say what each does',
          'Explain the difference between metadata and document settings',
          'Say where a stylesheet link and an inline style belong',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l46',
          title: 'HTML Head quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l46-q1',
              type: 'multiple-choice',
              prompt: 'Where does the page title text belong?',
              options: [
                'In an h1 in the body',
                'In a title element in the head',
                'In a meta name="title" element',
                'Anywhere, it makes no difference',
              ],
              answer: 1,
              explanation: 'The title element goes in the head and names the document. The h1 names the content on the page, which is a different thing.',
            },
            {
              id: 'quiz-html-l46-q2',
              type: 'true-false',
              prompt: 'The meta description is a ranking factor for search engines.',
              answer: false,
              explanation: 'It is used as the snippet in results and by social cards, but it does not affect ranking.',
            },
            {
              id: 'quiz-html-l46-q3',
              type: 'multiple-choice',
              prompt: 'What happens on mobile without a viewport meta?',
              options: [
                'The page is unstyled',
                'The browser assumes a desktop-width page and scales it down',
                'The page loads at double size',
                'Nothing changes',
              ],
              answer: 1,
              explanation: 'Without width=device-width the layout viewport is assumed to be about 980px wide, so everything appears zoomed out.',
            },
            {
              id: 'quiz-html-l46-q4',
              type: 'blank',
              prompt: 'Which attribute must appear on the first meta element in the head?',
              answers: [
                'charset',
                'charset="utf-8"',
              ],
              explanation: 'The browser has to know the encoding before it has read much of the document.',
            },
            {
              id: 'quiz-html-l46-q5',
              type: 'multiple-choice',
              prompt: 'Which of these is document setting rather than metadata?',
              options: [
                'meta name="description"',
                'meta name="viewport"',
                'meta name="author"',
                'meta name="keywords"',
              ],
              answer: 1,
              explanation: 'The viewport configures the browser layout. The others describe the document for something outside it.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l46-b1',
            body: 'The `<head>` element contains metadata about the document, plus the settings that tell the browser how to interpret it. Nothing in the head is rendered. It is not for the page title, the character set, the viewport, the stylesheet links, the favicon, and the scripts — and it is emphatically not a place to put content, which is a mistake that a great many pages still make.',
          },
          {
            type: 'demo',
            id: 'c-l46-d1',
            title: 'A complete modern head',
            body: 'Every element below belongs in the head. The title is the one exception that is user-visible: it appears in the browser tab, in the history, and in search results.',
            html: '<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="A short summary of the page.">\n  <title>Page title — the site name</title>\n  <link rel="icon" href="/favicon.svg" type="image/svg+xml">\n  <link rel="canonical" href="https://example.com/page">\n  <link rel="stylesheet" href="/css/site.css">\n  <script src="/js/app.js" defer></script>\n</head>\n<body>\n  <h1>Page title — the site name</h1>\n</body>\n</html>',
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }`,
            height: 420,
          },
          {
            type: 'list',
            id: 'c-l46-l1',
            style: 'bullet',
            items: [
              '`<meta charset>` — the character encoding, and it has to be within the first 1024 bytes.',
              '`<meta name="viewport">` — without it, mobile browsers assume a desktop-width page and zoom out.',
              '`<meta name="description">` — the summary search engines and social cards use. Not a ranking factor.',
              '`<title>` — required, and the accessible name of the whole document.',
              '`<link rel="stylesheet">` — the stylesheet. As early as possible, so rendering is not delayed.',
              '`<link rel="icon">` — the favicon. Without one, browsers request a file that does not exist.',
              '`<link rel="canonical">` — the URL this page should be indexed as.',
              '`<script defer>` — deferred by default is the sensible choice.',
              '`<base>` — changes path resolution. Rarely needed, easy to misuse.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l46-h1',
            level: 3,
            body: 'Metadata and document settings',
          },
          {
            type: 'text',
            id: 'c-l46-b2',
            body: 'The two kinds of head content are easy to confuse. Metadata describes the document for something outside the browser: a search engine, a social card preview, a feed reader. Document settings configure the browser itself: the encoding, the viewport, which stylesheet to load, which script to run. Neither belongs in the body, and neither is content. A `<style>` element in the body is technically parsed and applied, but it is a sign that the page is assembled from fragments that do not know how to be a document.',
          },
          {
            type: 'warning',
            id: 'c-l46-w1',
            title: 'The title and the h1 are not the same',
            body: 'The title names the document — it goes in the tab, the bookmark and the search result. The h1 names the content on the page. Pages are routinely titled "Home" and headed "Welcome back", and both are correct, because they answer different questions.',
          },
          {
            type: 'exercise',
            id: 'c-l46-x1',
            exercise: {
              id: 'ex-l46',
              instructions:
                'Build a complete head with a charset, a viewport, a description and a title, in that order, and link a stylesheet.',
              languages: ['html'],
              starterCode: {
                html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  \n</head>\n<body>\n  <h1>Page title</h1>\n</body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l46-t1',
                  label: 'The charset meta is the first element in the head',
                  body:
                    'return document.querySelector("head").firstElementChild.getAttribute("charset") === "utf-8"',
                },
                {
                  id: 'ex-l46-t2',
                  label: 'There is a viewport meta with width=device-width',
                  body:
                    'return /width=device-width/.test((document.querySelector("meta[name=\'viewport\']") || {}).content || "")',
                },
                {
                  id: 'ex-l46-t3',
                  label: 'There is a description meta with real content',
                  body:
                    'const m = document.querySelector("meta[name=\'description\']"); return !!m && (m.getAttribute("content") || "").trim().length >= 20',
                },
                {
                  id: 'ex-l46-t4',
                  label: 'There is exactly one non-empty title',
                  body:
                    'const ts = Array.from(document.querySelectorAll("title")); return ts.length === 1 && ts[0].textContent.trim().length > 0',
                },
                {
                  id: 'ex-l46-t5',
                  label: 'A stylesheet is linked from the head',
                  body: 'return !!document.querySelector("head link[rel=\'stylesheet\']")',
                },
              ],
              hints: [
                'charset goes on the meta element itself, not on a name attribute.',
                'The viewport value is written as a content attribute on a meta with name="viewport".',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="A short summary of what this page is about.">\n  <title>Page title</title>\n  <link rel="stylesheet" href="/css/site.css">\n</head>\n<body>\n  <h1>Page title</h1>\n</body>\n</html>\n',
              },
              testNotes:
                'The first test asserts position, not just presence. A charset declared after the first kilobyte of markup is too late, because the browser has already guessed the encoding by then.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s36',
    title: 'HTML Layout',
    description: 'Building a page structure with elements, and why almost none of it needs a table.',
    lessons: [
      {
        id: 'html-l47',
        title: 'HTML Layout',
        description: 'Composing a page from structural elements, and the grid and flex properties that lay them out.',
        duration: 6,
        objectives: [
          'Compose a page from header, nav, main, section, article, aside and footer',
          'Lay out a two-column page with grid or flex rather than a table',
          'Explain what a CSS grid template does in plain language',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l47',
          title: 'HTML Layout quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l47-q1',
              type: 'multiple-choice',
              prompt: 'How many main elements may a document contain?',
              options: [
                'As many as you like',
                'Exactly one',
                'One per section',
                'None, it is deprecated',
              ],
              answer: 1,
              explanation: 'There must be exactly one main, and it holds the primary content, excluding the header, nav, aside and footer.',
            },
            {
              id: 'quiz-html-l47-q2',
              type: 'true-false',
              prompt: 'A table is a reasonable way to build a two-column page layout.',
              answer: false,
              explanation: 'Grid or flex do the same job with cleaner markup. A table announces cell positions and makes the reading order a guess.',
            },
            {
              id: 'quiz-html-l47-q3',
              type: 'multiple-choice',
              prompt: 'What does minmax(0, 1fr) solve?',
              options: [
                'A track that refuses to shrink below its content and pushes the layout wider than the page',
                'Missing grid gaps',
                'Unsupported browsers',
                'Alignment of items',
              ],
              answer: 0,
              explanation: 'The default minimum is auto, which will not shrink. Setting it to zero lets the track shrink as needed.',
            },
            {
              id: 'quiz-html-l47-q4',
              type: 'blank',
              prompt: 'Which element contains the primary content of a document?',
              answers: [
                'main',
                '<main>',
              ],
              explanation: 'main holds the primary content, and there is exactly one per document.',
            },
            {
              id: 'quiz-html-l47-q5',
              type: 'multiple-choice',
              prompt: 'What is the difference between section and article?',
              options: [
                'They are interchangeable',
                'article is for theming, section is for grouping',
                'article is self-contained content that makes sense on its own; section is a thematic grouping of a page',
                'section is self-contained, article is a grouping',
              ],
              answer: 2,
              explanation: 'An article could be syndicated on its own. A section is a labelled division of the page it lives in.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l47-b1',
            body: 'Layout used to mean a table, because a table was the only reliable way to put things side by side. It no longer is. A page structure is built from elements that say what each region is, and the visual arrangement is done entirely in CSS with grid, flex or floats. The two concerns are cleanly separated: the markup says what the regions mean, and the stylesheet says where they go.',
          },
          {
            type: 'demo',
            id: 'c-l47-d1',
            title: 'A full page structure, laid out with grid',
            body: 'A header across the top, a navigation column and a main column beneath it, and a footer across the bottom. The grid-template-areas declaration does the arranging in six lines.',
            html: `<div class="page">
  <header>Site name</header>
  <nav>Nav</nav>
  <main>Main content</main>
  <aside>Aside</aside>
  <footer>Footer</footer>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; margin: 0; }
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "nav    main"
    "aside  main"
    "footer footer";
  grid-template-columns: 180px 1fr;
  grid-template-rows: auto 1fr auto auto;
  gap: 1px;
  min-height: 340px;
  background: #cbd5e1;
}
.page > * { background: white; padding: 0.75rem; }
header  { grid-area: header; background: #1e3a8a; color: white; font-weight: 600; }
nav     { grid-area: nav; }
main    { grid-area: main; }
aside   { grid-area: aside; }
footer  { grid-area: footer; background: #f1f5f9; }`,
            height: 400,
          },
          {
            type: 'heading',
            id: 'c-l47-h1',
            level: 3,
            body: 'The structural elements',
          },
          {
            type: 'list',
            id: 'c-l47-l1',
            style: 'bullet',
            items: [
              '`<header>` — introductory content for its nearest section. Not the same as the page banner when there are several sections.',
              '`<nav>` — a block of major navigation links. One per document is usually enough.',
              '`<main>` — the primary content. There must be exactly one, and it excludes header, nav, aside and footer.',
              '`<section>` — a thematic grouping with a heading. Not a generic wrapper.',
              '`<article>` — content that would still make sense on its own, syndicated elsewhere.',
              '`<aside>` — content tangential to the main flow: a glossary, a related-links list.',
              '`<footer>` — information about its section: author, date, contact, navigation.',
            ],
          },
          {
            type: 'code',
            id: 'c-l47-c1',
            language: 'css',
            title: 'The layout properties that replace tables',
            code: `/* grid: two columns, gap between them, sidebar fixed */
.page {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  gap: 1.5rem;
}

/* grid with named areas, so the arrangement is readable */
.page {
  display: grid;
  grid-template-areas:
    "head head"
    "side main"
    "foot foot";
  grid-template-columns: 200px 1fr;
}
.head { grid-area: head; }
.side { grid-area: side; }
.main { grid-area: main; }
.foot { grid-area: foot; }

/* flex: a row or a column of siblings, and wrapping */
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* responsive without a media query, using a function rather than a breakpoint */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

/* minmax(0, 1fr) is the fix for a grid or flex child that overflows */
.layout > * { min-width: 0; }

/* float is still here, for the text-wrap case and very little else */
.pull { float: right; margin: 0 0 1rem 1rem; }`,
          },
          {
            type: 'tip',
            id: 'c-l47-t1',
            title: 'minmax(0, 1fr) and min-width: 0',
            body: 'A grid or flex track defaults to a minimum of auto, which means it refuses to shrink below its content. Long unbroken strings then push the layout wider than the page. Setting the minimum to zero, or adding min-width: 0 to the child, is the standard fix.',
          },
          {
            type: 'warning',
            id: 'c-l47-w1',
            title: 'A div is a legitimate last resort',
            body: 'If no semantic element describes a region, a div is the right choice. What matters is that you used a semantic element wherever one applied — not that you never touch a div.',
          },
          {
            type: 'exercise',
            id: 'c-l47-x1',
            exercise: {
              id: 'ex-l47',
              instructions:
                'Build a page structure with header, nav, main, aside and footer, and lay it out as a two-column grid with the header and footer spanning both columns.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="page">\n  \n</div>\n',
                css: '.page {\n  display: grid;\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l47-t1',
                  label: 'All five structural elements are present',
                  body:
                    'return ["header", "nav", "main", "aside", "footer"].every(t => !!document.querySelector(t))',
                },
                {
                  id: 'ex-l47-t2',
                  label: 'There is exactly one main',
                  body: 'return document.querySelectorAll("main").length === 1',
                },
                {
                  id: 'ex-l47-t3',
                  label: 'The container is a grid or flex container',
                  body:
                    'const d = getComputedStyle(document.querySelector(".page")).display; return d === "grid" || d === "flex"',
                },
                {
                  id: 'ex-l47-t4',
                  label: 'The container has more than one column',
                  body:
                    'const d = getComputedStyle(document.querySelector(".page")).display; if (d !== "grid") return true; return d === "grid" && getComputedStyle(document.querySelector(".page")).gridTemplateColumns.split(" ").length >= 2',
                },
                {
                  id: 'ex-l47-t5',
                  label: 'The header and footer span the full width of the container',
                  body:
                    'const page = document.querySelector(".page"); const hs = [...page.children].filter(c => ["HEADER", "FOOTER"].includes(c.tagName)); if (hs.length !== 2) return false; return hs.every(c => Math.round(c.getBoundingClientRect().width) >= Math.round(page.getBoundingClientRect().width) - 1)',
                },
              ],
              hints: [
                'grid-template-areas lets you name each region and then place the elements by name.',
                'A spanning header is written in the areas string as a name repeated across the columns.',
              ],
              solution: {
                html:
                  '<div class="page">\n  <header>Site name</header>\n  <nav>Navigation</nav>\n  <main>Main content</main>\n  <aside>Aside</aside>\n  <footer>Footer</footer>\n</div>\n',
                css:
                  '.page {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "nav    main"\n    "aside  main"\n    "footer footer";\n  grid-template-columns: 180px 1fr;\n  gap: 1px;\n  background: #cbd5e1;\n}\n.page > * { background: white; padding: 0.75rem; }\nheader { grid-area: header; }\nnav { grid-area: nav; }\nmain { grid-area: main; }\naside { grid-area: aside; }\nfooter { grid-area: footer; }\n',
              },
              testNotes:
                'The last test measures actual geometry rather than reading the declaration, so it passes for grid-template-areas, for a column-span shorthand, and for a flex layout with wrap.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s37',
    title: 'HTML Responsive',
    description: 'The viewport meta, fluid units, and why media queries are now the fallback rather than the plan.',
    lessons: [
      {
        id: 'html-l48',
        title: 'HTML Responsive',
        description: 'What responsive design requires from the markup, and the order to build it in.',
        duration: 6,
        objectives: [
          'Explain what the viewport meta does on a mobile browser',
          'Use relative units so text and layout scale with the user font size',
          'Describe how a fluid layout with breakpoints differs from a fixed one',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l48',
          title: 'HTML Responsive quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l48-q1',
              type: 'multiple-choice',
              prompt: 'What does the viewport meta tag do?',
              options: [
                'Makes the page fill the screen height',
                'Tells the browser how wide the device is, so it does not assume a desktop-width page',
                'Hides the browser chrome',
                'Enables dark mode',
              ],
              answer: 1,
              explanation: 'Without it mobile browsers assume about 980px and scale the page down, so everything looks zoomed out.',
            },
            {
              id: 'quiz-html-l48-q2',
              type: 'true-false',
              prompt: 'Setting user-scalable=no on the viewport meta is good practice.',
              answer: false,
              explanation: 'It blocks pinch-zoom, which breaks the page for anyone who needs to magnify it. It is a WCAG failure.',
            },
            {
              id: 'quiz-html-l48-q3',
              type: 'multiple-choice',
              prompt: 'Which unit is relative to the root font size?',
              options: [
                'em',
                'rem',
                '%',
                'ex',
              ],
              answer: 1,
              explanation: 'rem is relative to the root element font size, which makes it the right default for type.',
            },
            {
              id: 'quiz-html-l48-q4',
              type: 'blank',
              prompt: 'Which grid value creates as many columns as will fit?',
              answers: [
                'auto-fit',
                'repeat(auto-fit, minmax(220px, 1fr))',
                'auto-fit',
              ],
              explanation: 'auto-fit collapses empty tracks, so the columns stretch to fill the row as the count changes.',
            },
            {
              id: 'quiz-html-l48-q5',
              type: 'multiple-choice',
              prompt: 'Why build a fluid layout before adding breakpoints?',
              options: [
                'Media queries are being deprecated',
                'It needs far fewer breakpoints and degrades better at widths you did not design for',
                'Fluid layouts load faster',
                'Breakpoints only work with grid',
              ],
              answer: 1,
              explanation: 'A layout that reflows at every width leaves media queries to express genuine arrangement changes rather than every adjustment.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l48-b1',
            body: 'A responsive page is one that works across viewport widths without a separate mobile site. It needs three things: the viewport meta so the browser knows how wide the device is, relative units so sizes follow the user rather than the designer, and a layout that reflows rather than shrinking. The first is one line of markup and is the reason a great many pages fail on a phone.',
          },
          {
            type: 'demo',
            id: 'c-l48-d1',
            title: 'A layout that reflows',
            body: 'The grid below has no fixed widths. It fits as many 240px columns as the viewport allows and drops to one column on a narrow screen, with no media query involved. Resize the frame and watch the columns change count.',
            html: `<div class="cards">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
  <div class="card">Four</div>
  <div class="card">Five</div>
  <div class="card">Six</div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 16px; margin: 0; padding: 1rem; }
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}
.card {
  background: #e0f2fe;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  font-size: 1.125rem;
}`,
            height: 260,
          },
          {
            type: 'heading',
            id: 'c-l48-h1',
            level: 3,
            body: 'Relative units and why they matter more than breakpoints',
          },
          {
            type: 'list',
            id: 'c-l48-l1',
            style: 'bullet',
            items: [
              '`rem` — relative to the root font size. Use it for almost everything.',
              '`%` — relative to the containing block. Useful for widths and max-widths.',
              '`vw` and `vh` — viewport units. Useful for full-height sections, dangerous for type.',
              '`em` — relative to the parent font size. Correct for padding and line-height within a component.',
              '`px` — an absolute unit. Fine for a hairline border, wrong for text and layout.',
            ],
          },
          {
            type: 'code',
            id: 'c-l48-c1',
            language: 'html',
            title: 'The one line that matters, and a breakpoint as backup',
            code: `<!-- without this, mobile browsers assume a ~980px page and scale down -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
  /* fluid by default: no breakpoints needed */
  .container {
    width: min(100% - 2rem, 70rem);
    margin-inline: auto;
  }

  /* type that respects the user's font size preference */
  body { font-size: 100%; }
  h1 { font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem); }
  body { line-height: 1.5; }

  /* images that never overflow their column */
  img, video, svg, iframe { max-width: 100%; height: auto; }

  /* a breakpoint, for the cases a fluid layout cannot express */
  @media (min-width: 48rem) {
    .sidebar { display: block; }
  }
  @media (max-width: 47.99rem) {
    .sidebar { display: none; }
  }

  /* and the pointer-coarse check, which is not about width at all */
  @media (pointer: coarse) {
    .icon-button { min-width: 44px; min-height: 44px; }
  }
</style>`,
          },
          {
            type: 'tip',
            id: 'c-l48-t1',
            title: 'Build fluid first, breakpoints second',
            body: 'A layout that works fluidly at every width needs far fewer breakpoints than one built from fixed desktop sizes, and it degrades better at the widths you did not think of. Media queries are then there for the genuine changes in arrangement, not for adjusting every number.',
          },
          {
            type: 'warning',
            id: 'c-l48-w1',
            title: 'Never stop users from zooming',
            body: 'Setting `user-scalable=no` or `maximum-scale=1` blocks pinch-zoom, which breaks the page for anyone who needs to magnify it. It is a WCAG failure and there is no accessibility argument for it.',
          },
          {
            type: 'exercise',
            id: 'c-l48-x1',
            exercise: {
              id: 'ex-l48',
              instructions:
                'Add the viewport meta, set the base font size so it follows the user, and build a card grid that reflows on its own using repeat(auto-fit, minmax(...)).',
              languages: ['html', 'css'],
              starterCode: {
                html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  \n</head>\n<body>\n  <div class="cards">\n    <div class="card">One</div>\n    <div class="card">Two</div>\n  </div>\n</body>\n</html>\n',
                css: 'body {\n  \n}\n\n.cards {\n  display: grid;\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l48-t1',
                  label: 'The viewport meta is present with width=device-width',
                  body:
                    'return /width=device-width/.test((document.querySelector("meta[name=\'viewport\']") || {}).content || "")',
                },
                {
                  id: 'ex-l48-t2',
                  label: 'Zoom is not blocked',
                  body:
                    'const c = (document.querySelector("meta[name=\'viewport\']") || {}).content || ""; return !/user-scalable\\s*=\\s*no/.test(c) && !/maximum-scale\\s*=\\s*1\\b/.test(c)',
                },
                {
                  id: 'ex-l48-t3',
                  label: 'The grid uses a fluid column count',
                  body:
                    'return /auto-fit|auto-fill/.test(document.querySelector(".cards").getAttribute("style") || "") || /auto-fit|auto-fill/.test(Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "))',
                },
                {
                  id: 'ex-l48-t4',
                  label: 'The grid columns use minmax, so they can shrink',
                  body:
                    'return /minmax\\(/.test(Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "))',
                },
                {
                  id: 'ex-l48-t5',
                  label: 'The document declares a language',
                  body: 'return !!document.documentElement.getAttribute("lang")',
                },
              ],
              hints: [
                'The viewport meta is the first thing in the head, after the charset.',
                'repeat(auto-fit, minmax(140px, 1fr)) is the whole fluid grid — no media query needed.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Cards</title>\n</head>\n<body>\n  <div class="cards">\n    <div class="card">One</div>\n    <div class="card">Two</div>\n  </div>\n</body>\n</html>\n',
                css:
                  'body {\n  font-size: 100%;\n}\n\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 1rem;\n}\n',
              },
              testNotes:
                'The second test is the accessibility assertion. user-scalable=no and maximum-scale=1 both block pinch-zoom, which is a WCAG failure.',
            },
          },
        ],
      },
    ],
  },
]
