import type { Section } from '~/types/content'

export const cssResponsiveSections: Section[] = [
  {
    id: 'css-s70',
    title: 'RWD Intro',
    description:
      'What responsive actually means, the three historical approaches, and why breakpoints belong to your content rather than to a list of phones.',
    lessons: [
      {
        id: 'css-l115',
        title: 'RWD Intro',
        description:
          'Fluid is not responsive. The three approaches, why the third one won, and how to find your breakpoints in the content instead of in a device list.',
        duration: 6,
        xp: 40,
        objectives: [
          'Explain the difference between a fluid layout and a responsive one',
          'Describe the fixed, fluid and responsive approaches and say why responsive won',
          'Explain what a breakpoint is actually a measurement of',
          'Explain why design for the content beats design for named devices',
        ],
        quiz: {
          id: 'quiz-css-l115',
          title: 'RWD Intro quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l115-q1',
              type: 'multiple-choice',
              prompt: 'What is the difference between a fluid layout and a responsive one?',
              options: [
                'Fluid uses percentages, responsive uses pixels',
                'Fluid stretches smoothly at every width; responsive additionally changes structure at defined widths',
                'Fluid supports touch input, responsive supports a mouse',
                'Fluid loads faster, responsive loads slower',
              ],
              answer: 1,
              explanation: 'Fluid describes stretching: one design, sized in percentages, which has to work at every width and therefore is always designed for the worst case. Responsive means the structure itself changes - columns become rows, sidebars move - so each size range gets a layout that is actually comfortable.',
            },
            {
              id: 'quiz-css-l115-q2',
              type: 'true-false',
              prompt: 'A layout should have a breakpoint at 768px because that is the width of a common tablet.',
              answer: false,
              explanation: 'A breakpoint is a measurement of your content, not a device. You should add one at the width where your own layout breaks - a column too narrow to read, a line of text too short - and device lists go stale immediately and miss split-screen windows, browser sidebars and foldables.',
            },
            {
              id: 'quiz-css-l115-q3',
              type: 'blank',
              prompt: 'Name the three historical approaches to sizing a layout, from the oldest to the newest.',
              answers: [
                'fixed, fluid, responsive',
                'fixed, fluid, responsive design',
              ],
              explanation: 'Fixed used only pixels and had one design. Fluid replaced widths with percentages so the layout stretched. Responsive added structural change at defined widths on top of a fluid base, which is why it won: it can have many designs instead of one compromise.',
            },
            {
              id: 'quiz-css-l115-q4',
              type: 'identify-error',
              prompt: 'Which part of this approach is the problem?',
              code: '.card {\n  width: 60%;\n  min-width: 420px;\n}',
              options: [
                'The percentage width should be `max-width` instead',
                'The `min-width` floor makes the layout stop reflowing below 420px',
                '`width` and `min-width` cannot be combined on one element',
                'The value should be expressed in rem rather than px',
              ],
              answer: 1,
              explanation: 'The card is fluid in the strict sense - its width is a percentage - but the `min-width` gives it a floor below which it cannot shrink, and the text spills out. Fluid stretching only works if nothing is pinned.',
            },
            {
              id: 'quiz-css-l115-q5',
              type: 'multiple-choice',
              prompt: 'Why did responsive design displace fluid design?',
              options: [
                'Fluid layouts were slower to render on mobile',
                'Fluid layouts required JavaScript to resize',
                'A fluid layout has one design that must survive every width, so it is always designed for the narrowest case',
                'Fluid layouts could not be combined with web fonts',
              ],
              answer: 2,
              explanation: 'A single fluid design must work at 320px and at 2560px at the same time, so it is permanently compromised at one end. Responsive designs can have several designs, each comfortable in its own range, which is better for the reader and barely more work for the author.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l115-b1',
            body: 'A page that scales is not the same as a page that responds. This distinction is the whole subject of the next eight lessons, so it is worth being precise about it before touching a single declaration.',
          },
          {
            type: 'demo',
            id: 'c-l115-d1',
            title: 'Two cards, the same percentage width',
            body: 'Both cards are `width: 60%`, so both are fluid - they shrink and grow smoothly as the container changes. The left one wraps its content into a readable stack. The right one holds a fixed 400px minimum, so below that width the content starts to break. Resize the window and watch where each one stops working.',
            html: `<div class="rwd-intro stage">
  <div class="card good">
    <h4>Fluid</h4>
    <p>A percentage width with no floor. The card and its text reflow together at every size, because nothing is pinned.</p>
  </div>
  <div class="card bad">
    <h4>Fluid with a floor</h4>
    <p>The same 60% width, but with a 400px minimum. Below that the text cannot reflow, so it spills out of the card.</p>
  </div>
</div>`,
            css: `.rwd-intro {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
}
.stage {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
}
.card {
  width: 60%;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 8px;
  padding: 0.85rem 1rem;
}
.card h4 {
  margin: 0 0 0.4rem;
  color: #29e2bd;
  font-size: 13px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.card p {
  margin: 0;
  color: #9aa5b4;
  line-height: 1.5;
}
.card.good {
  min-width: 0;
}
.card.bad {
  min-width: 400px;
  border-color: #b4453a;
}`,
            height: 190,
          },
          {
            type: 'text',
            id: 'c-l115-b2',
            body: 'The right-hand card is fluid too, in the strict sense - its width is a percentage. But it stops being usable once the viewport is narrower than its `min-width`, and no amount of scaling fixes that. **Fluid means the layout stretches. Responsive means the layout changes shape in response to what it has to fit.**',
          },
          {
            type: 'heading',
            id: 'c-l115-h1',
            level: 3,
            body: 'The three approaches',
          },
          {
            type: 'list',
            id: 'c-l115-l1',
            style: 'bullet',
            items: [
              '**Fixed** - every measurement is in pixels. One layout, designed for one screen size. Simple to build, and wrong on everything else. Its only remaining virtue is for genuinely fixed-size contexts, like a print stylesheet.',
              '**Fluid** - widths become percentages so the layout stretches to fill any screen. This solves the "page scrolls sideways" problem and nothing else: columns get unreadably narrow, text lines run to 200 characters, and navigation collapses into a single unreadable row.',
              '**Responsive** - a fluid base that additionally *changes structure* at defined widths. Columns become rows, sidebars move below the content, images swap resolution. This is the approach that won, because it is the only one that treats the layout as a set of choices rather than a single compromise.',
            ],
          },
          {
            type: 'text',
            id: 'c-l115-b3',
            body: 'The reason fluid lost is instructive. A fluid layout has exactly one design, and it has to survive every width at once, so it is always designed for the worst case - the narrowest one. Responsive designs can have many designs, each of which is comfortable in its own range. That is strictly better for the reader and only slightly more work for you.',
          },
          {
            type: 'heading',
            id: 'c-l115-h2',
            level: 3,
            body: 'Breakpoints are measurements of your content',
          },
          {
            type: 'text',
            id: 'c-l115-b4',
            body: 'The word "breakpoint" comes from print typography, where a fixed page size makes any other size a break. On the web there is no page size, so a breakpoint is not a property of a device - it is the width at which *your* layout stops working. It is the point where a column becomes too narrow for its content, or a line of text gets shorter than about 45 characters, or a navigation wraps.',
          },
          {
            type: 'code',
            id: 'c-l115-c1',
            language: 'css',
            title: 'A breakpoint derived from content, not from a phone',
            code: `/* a two-column card grid stops working when a card is too narrow
   to hold a heading plus a readable sentence - that is the breakpoint.
   40rem is not a device, it is "one card cannot breathe". */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
}`,
          },
          {
            type: 'tip',
            id: 'c-l115-t1',
            title: 'Try to delete breakpoints',
            body: 'The best breakpoint is the one you never wrote. Modern CSS Grid and flexbox with `auto-fit` and `minmax()` reflow without a single media query, and the grid lesson later in this course shows exactly how. Reach for `@media` when the *structure* has to change, not when a column merely got narrower.',
          },
          {
            type: 'warning',
            id: 'c-l115-w1',
            title: 'Stop thinking in devices',
            body: 'Lists of device widths go stale the moment they are written, and they miss the cases that actually matter: a 320px browser window on a large monitor, a split-screen tablet, a foldable phone, a browser sidebar taking 400px off a desktop window. Test at the widths where your own content breaks, not at the widths a vendor shipped.',
          },
          {
            type: 'exercise',
            id: 'c-l115-x1',
            exercise: {
              id: 'ex-l115',
              instructions:
                'Make the card below fluid so it always fits its container: give it a percentage width instead of the fixed pixel width, and remove the `min-width` floor that stops the text reflowing.',
              languages: ['css'],
              starterCode: {
                html: '<div class="panel"><div class="card"><h4>Fluid</h4><p>A percentage width with no floor lets the text reflow at every container size instead of spilling out of the card.</p></div></div>',
                css: '.panel {\n  width: 420px;\n  background: #1d2531;\n  padding: 1rem;\n  border: 1px solid #2a3441;\n}\n.card {\n  width: 400px;\n  min-width: 400px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l115-t1',
                  label: 'The card width is a percentage of its container',
                  body: 'return getComputedStyle(document.querySelector(".card")).width !== "400px"',
                },
                {
                  id: 'ex-l115-t2',
                  label: 'The card no longer has a 400px floor',
                  body: 'return getComputedStyle(document.querySelector(".card")).minWidth !== "400px"',
                },
                {
                  id: 'ex-l115-t3',
                  label: 'The card is narrower than its container, so it has room to shrink',
                  body: 'const c = document.querySelector(".card"); const p = c.parentElement; return c.getBoundingClientRect().width < p.getBoundingClientRect().width',
                },
              ],
              hints: [
                'Replace the fixed `width` with a percentage of the parent.',
                'The `min-width` floor is what stops the layout reflowing - it has to go.',
                '`.card { width: 100%; }` with no `min-width`.',
              ],
              solution: {
                html: '<div class="panel"><div class="card"><h4>Fluid</h4><p>A percentage width with no floor lets the text reflow at every container size instead of spilling out of the card.</p></div></div>',
                css: '.panel {\n  width: 420px;\n  background: #1d2531;\n  padding: 1rem;\n  border: 1px solid #2a3441;\n}\n.card {\n  width: 100%;\n}\n',
              },
              testNotes:
                'The first two tests read computed width and `min-width` on the card. The third measures the card and its padded parent: the card must be strictly narrower than the panel, which is what leaves room for it to shrink.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s71',
    title: 'RWD Viewport',
    description:
      'The one line of markup every responsive page needs, what breaks without it, and why blocking zoom is an accessibility failure rather than a UX tweak.',
    lessons: [
      {
        id: 'css-l116',
        title: 'RWD Viewport',
        description:
          'The viewport meta tag, what a mobile browser does without it, the difference between `initial-scale` and `maximum-scale`, and why `user-scalable=no` fails accessibility.',
        duration: 6,
        xp: 40,
        objectives: [
          'Write the viewport meta tag and say what each of its parts does',
          'Predict how a mobile browser renders a desktop-width page when the tag is missing',
          'Explain initial-scale and why user-scalable=no is not a valid option',
          'Explain why blocking zoom is a WCAG failure',
        ],
        quiz: {
          id: 'quiz-css-l116',
          title: 'RWD Viewport quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l116-q1',
              type: 'multiple-choice',
              prompt: 'What happens on a phone when a page has no viewport meta tag?',
              options: [
                'The page renders at the device width in CSS pixels',
                'The browser uses a virtual viewport of roughly 980px and scales the rendered page down to fit the screen',
                'The browser renders the page in a desktop layout mode with a scrollbar',
                'The page falls back to a server-side mobile site',
              ],
              answer: 1,
              explanation: 'Without `width=device-width`, mobile browsers assume a wide legacy screen of about 980px and then scale everything down to fit the physical screen. The result is a desktop design rendered as a small unreadable page - which is exactly why a correct CSS layout still fails on a phone without this tag.',
            },
            {
              id: 'quiz-css-l116-q2',
              type: 'true-false',
              prompt: 'Adding `user-scalable=no` to the viewport tag is an acceptable way to stop a page zooming when a user taps a plain div.',
              answer: false,
              explanation: 'It blocks pinch zoom, which is the primary magnification tool for low-vision readers, and it fails WCAG 1.4.4. The real fix is semantic: make the control a `<button>` or an `<a>`, and the browser stops treating the tap as a zoom gesture.',
            },
            {
              id: 'quiz-css-l116-q3',
              type: 'blank',
              prompt: 'Which single attribute makes the layout viewport equal to the physical screen width in CSS pixels?',
              answers: [
                'width=device-width',
                'device-width',
              ],
              explanation: '`width=device-width` in the tag\'s `content` sets the layout viewport to the device width. Paired with `initial-scale=1` it gives one CSS pixel per device pixel, so media queries see the real screen width.',
            },
            {
              id: 'quiz-css-l116-q4',
              type: 'identify-error',
              prompt: 'Which part of this viewport tag is wrong?',
              code: '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, maximum-scale=1">',
              options: [
                '`width=device-width` should be `width=screen-width`',
                '`initial-scale=1` should be `initial-scale=100`',
                '`user-scalable=no` and `maximum-scale=1` disable pinch zoom, which fails WCAG 1.4.4',
                'The `name` should be `viewport` in capitals',
              ],
              answer: 2,
              explanation: 'The first two settings are correct and standard. The last two block the user from magnifying the page, which is an accessibility failure - WCAG 1.4.4 requires text to be scalable to 200% without loss of content or function.',
            },
            {
              id: 'quiz-css-l116-q5',
              type: 'multiple-choice',
              prompt: 'What does `viewport-fit=cover` do, and what does it oblige you to handle?',
              options: [
                'It forces the page into landscape; you then need a landscape media query',
                'It extends the layout into the notch and rounded corners, so you must pad with `env(safe-area-inset-*)`',
                'It fixes the viewport at 375px; you then need `initial-scale`',
                'It disables the browser UI; you then need `user-scalable=no`',
              ],
              answer: 1,
              explanation: '`viewport-fit=cover` lets the background and content extend under the notch and rounded corners. Everything you do not want hidden there has to be padded away from the edges with the `safe-area-inset-*` environment values.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l116-b1',
            body: 'This is the only lesson in the block whose code is markup rather than CSS, and it is the one tag people leave out most often. Without it, every responsive technique in the following lessons is wasted on a phone - because the phone is not giving your layout a narrow screen to respond to.',
          },
          {
            type: 'demo',
            id: 'c-l116-d1',
            title: 'The tag itself, and what it changes',
            body: 'This is the tag, shown literally, because that is the only honest way to demonstrate markup in a CSS preview. Below it, the same page is rendered twice. The left frame is a fake mobile browser that has the tag: the layout sees a 380px-wide viewport and reflows to its single-column design. The right frame is the same fake browser without the tag: the layout still believes it has a 980px-wide viewport, so it renders the desktop design and then scales the whole thing down to fit.',
            html: `<div class="rwd-vp">
  <code class="tag">&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>

  <div class="frames">
    <figure class="frame">
      <figcaption>with the tag</figcaption>
      <div class="screen ok">
        <div class="bar"></div>
        <div class="row"></div>
        <div class="col">
          <div class="col-main"></div>
          <div class="col-side"></div>
        </div>
      </div>
    </figure>

    <figure class="frame">
      <figcaption>without the tag</figcaption>
      <div class="screen no">
        <div class="bar"></div>
        <div class="row"></div>
        <div class="col">
          <div class="col-main"></div>
          <div class="col-side"></div>
        </div>
      </div>
    </figure>
  </div>
</div>`,
            css: `.rwd-vp {
  background: #141922;
  color: #e8edf4;
  font-family: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  font-size: 12px;
}
.rwd-vp .tag {
  display: block;
  padding: 0.55rem 0.7rem;
  margin-bottom: 0.9rem;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-left: 3px solid #29e2bd;
  border-radius: 4px;
  color: #29e2bd;
  font-size: 12px;
}
.rwd-vp .frames {
  display: flex;
  gap: 1.25rem;
}
.rwd-vp figure {
  margin: 0;
  flex: 1;
}
.rwd-vp figcaption {
  margin-bottom: 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
  font-family: system-ui, sans-serif;
}
/* the fake device: a fixed 380px wide window */
.rwd-vp .screen {
  width: 380px;
  border: 1px solid #2a3441;
  border-radius: 6px;
  overflow: hidden;
}
.rwd-vp .bar {
  height: 10px;
  background: #1f6feb;
}
.rwd-vp .row {
  height: 14px;
  margin: 8px;
  background: #2a3441;
}
/* with the tag the layout believes it is 380px wide, so it reflows
   into one column - that is what the real media queries would do */
.rwd-vp .ok .col {
  display: grid;
  gap: 8px;
  padding: 0 8px;
}
.rwd-vp .ok .col-main {
  height: 46px;
  background: #29e2bd;
}
.rwd-vp .ok .col-side {
  height: 22px;
  background: #1f4d43;
}
/* without the tag the layout believes it has 980px, keeps the desktop
   two-column design, and the browser shrinks all of it to fit 380px */
.rwd-vp .no {
  position: relative;
}
.rwd-vp .no .col {
  width: 980px;
  position: absolute;
  top: 32px;
  left: 8px;
  transform: scale(0.378);
  transform-origin: top left;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 8px;
  padding: 0;
}
.rwd-vp .no .col-main {
  height: 46px;
  background: #29e2bd;
}
.rwd-vp .no .col-side {
  height: 46px;
  background: #1f4d43;
}
.rwd-vp .no::after {
  content: "980px of layout squeezed into 380px";
  display: block;
  padding-top: 58px;
  text-align: center;
  color: #9aa5b4;
  font-size: 11px;
}`,
            height: 300,
          },
          {
            type: 'heading',
            id: 'c-l116-h1',
            level: 3,
            body: 'What the tag actually does',
          },
          {
            type: 'list',
            id: 'c-l116-l1',
            style: 'bullet',
            items: [
              '**`width=device-width`** - sets the layout viewport to the physical width of the screen in CSS pixels. Without it, mobile browsers fall back to a virtual viewport of about 980px and then scale the rendered page down to fit, which is why a desktop design on a phone arrives as an unreadable postage stamp.',
              '**`initial-scale=1`** - sets the starting zoom level so one CSS pixel is one device pixel. Omitting it while setting `width=device-width` gives an awkward initial zoom on some browsers; together the two are the standard pair.',
              '**`viewport-fit=cover`** (optional) - extends the layout into the notch and rounded corners of a phone. Pair it with `env(safe-area-inset-*)` padding, or your own header ends up under the camera.',
              '**`maximum-scale` and `user-scalable`** - the two you must not use. They exist, they are honoured, and setting them is a WCAG 1.4.4 failure.',
            ],
          },
          {
            type: 'code',
            id: 'c-l116-c1',
            language: 'html',
            title: 'The tag, in full',
            code: `<!-- the minimum every responsive page needs -->
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- optional: also fill the notch, then pad with env(safe-area-inset-*) -->
<meta name="viewport"
      content="width=device-width, initial-scale=1, viewport-fit=cover">

/* never do this - it fails WCAG 1.4.4 (Resize Text) and 1.4.10 */
<meta name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`,
          },
          {
            type: 'heading',
            id: 'c-l116-h2',
            level: 3,
            body: 'Why you must not disable zoom',
          },
          {
            type: 'text',
            id: 'c-l116-b2',
            body: 'Pinch zoom is not a legacy feature. It is the primary magnification tool for anyone with low vision, and it is the only way to enlarge text when a site has not scaled its type properly. Setting `maximum-scale=1` or `user-scalable=no` makes a phone site genuinely unusable for those readers, and it is checked: WCAG success criterion 1.4.4 requires that text can be scaled to 200% without loss of content or function. Safari ignores `maximum-scale` for accessibility settings for exactly this reason, which tells you how the standards bodies think about it.',
          },
          {
            type: 'tip',
            id: 'c-l116-t1',
            title: 'If zoom feels broken, fix the CSS',
            body: 'The usual reason people reach for `user-scalable=no` is that double-tap zoom fires when a user taps a plain `<div>` and it looks like a bug. It is not a bug. Make the thing a `<button>` or an `<a>`, and the browser stops treating the tap as a zoom gesture. That is a semantic fix rather than a suppression.',
          },
          {
            type: 'warning',
            id: 'c-l116-w1',
            title: 'Do not disable zoom',
            body: 'No `user-scalable=no` and no `maximum-scale`. Beyond the accessibility failure, you gain nothing: a layout that survives a narrow viewport will also survive the user making it narrower, and one that does not is already broken. If a team review pushes back on this, point at WCAG 1.4.4 and at the audits it fails.',
          },
          {
            type: 'exercise',
            id: 'c-l116-x1',
            exercise: {
              id: 'ex-l116',
              instructions:
                'Add a viewport meta tag to the `<head>` so mobile browsers give the page a device-width layout viewport, and remove the `maximum-scale` and `user-scalable` settings that block pinch zoom.',
              languages: ['html'],
              starterCode: {
                html: '<!doctype html>\n<html>\n<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">\n</head>\n<body>\n  <h1>Invoices</h1>\n</body>\n</html>',
              },
              tests: [
                {
                  id: 'ex-l116-t1',
                  label: 'The page has a viewport meta tag',
                  body: 'return !!document.querySelector("meta[name=\\"viewport\\"]")',
                },
                {
                  id: 'ex-l116-t2',
                  label: 'The tag asks for the device width',
                  body: 'const c = document.querySelector("meta[name=\\"viewport\\"]").content; return c.includes("width=device-width")',
                },
                {
                  id: 'ex-l116-t3',
                  label: 'The tag sets an initial scale of 1',
                  body: 'const c = document.querySelector("meta[name=\\"viewport\\"]").content; return /initial-scale\\s*=\\s*1/.test(c)',
                },
                {
                  id: 'ex-l116-t4',
                  label: 'Pinch zoom is not disabled',
                  body: 'const c = document.querySelector("meta[name=\\"viewport\\"]").content; return !c.includes("user-scalable=no") && !c.includes("maximum-scale")',
                },
              ],
              hints: [
                'The tag goes in the `<head>` and its name is exactly "viewport".',
                'The `content` attribute is a comma-separated list of key=value pairs.',
                'content="width=device-width, initial-scale=1"',
              ],
              solution: {
                html: '<!doctype html>\n<html>\n<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n</head>\n<body>\n  <h1>Invoices</h1>\n</body>\n</html>',
              },
              testNotes:
                'These tests read the `content` attribute of the viewport meta tag as a string, since the effect of the tag is on the browser chrome rather than on a computed style. The fourth test is the accessibility check - the starter code fails it on purpose.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s72',
    title: 'RWD Grid View',
    description:
      'Responsive grids with no media queries at all: `repeat()`, `minmax()`, and the difference between `auto-fit` and `auto-fill` that decides whether your last row stretches.',
    lessons: [
      {
        id: 'css-l117',
        title: 'RWD Grid View',
        description:
          'Build a grid that reflows from four columns to one without a single media query, and understand exactly what `auto-fit` does that `auto-fill` does not.',
        duration: 8,
        xp: 50,
        objectives: [
          'Write a responsive track list with repeat() and minmax()',
          'Explain what minmax() is doing at each step of the calculation',
          'Predict how auto-fit and auto-fill differ when there are more tracks than items',
          'Explain why a grid can be responsive with no media query at all',
        ],
        quiz: {
          id: 'quiz-css-l117',
          title: 'RWD Grid View quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l117-q1',
              type: 'multiple-choice',
              prompt: 'A grid has four items and `repeat(auto-fit, minmax(9rem, 1fr))` resolves to five tracks. What happens to the fifth track?',
              options: [
                'It is kept at zero width and the four items stay at their computed size',
                'It is collapsed, and the four items each grow to an equal share of the full row',
                'The fourth item wraps onto a second row',
                'The grid drops from five tracks back to four',
              ],
              answer: 1,
              explanation: 'That is exactly what `auto-fit` does: tracks that end up with no item in them are collapsed to zero, and the remaining tracks - each defined as `minmax(9rem, 1fr)` - grow to take the freed space. Using `auto-fill` instead would keep the empty track and leave a visible gap.',
            },
            {
              id: 'quiz-css-l117-q2',
              type: 'true-false',
              prompt: 'In `minmax(18rem, 1fr)`, the `18rem` sets the narrowest a track may become before the grid drops a column.',
              answer: true,
              explanation: '`minmax()` sets a floor and a ceiling for each track. Once the container is too narrow to give every track its `18rem` floor, the grid resolves to one fewer track. That floor is the real breakpoint - the width at which your layout changes shape - and you should choose it from what the content needs.',
            },
            {
              id: 'quiz-css-l117-q3',
              type: 'blank',
              prompt: 'Which keyword in `repeat(?, minmax(18rem, 1fr))` makes the grid collapse tracks that contain no items?',
              answers: [
                'auto-fit',
              ],
              explanation: '`auto-fit` collapses empty tracks so the remaining ones fill the row. `auto-fill` keeps the empty tracks, which preserves the track rhythm but leaves a gap at the end of a partially filled row.',
            },
            {
              id: 'quiz-css-l117-q4',
              type: 'identify-error',
              prompt: 'Why does this grid look wrong?',
              code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));\n}\n.cards li:last-child {\n  grid-column: 1 / -1;\n}',
              options: [
                '`grid-column` cannot be used on a list item',
                'The last item is forced full width and destroys the responsive behaviour it was meant to complete',
                '`minmax()` needs a `px` minimum rather than a `rem` one',
                '`auto-fit` requires the container to have an explicit width',
              ],
              answer: 1,
              explanation: 'Forcing the final child to span `1 / -1` makes it the full container width at every viewport size, which is precisely the horizontal-stretch problem responsive layout exists to prevent. `auto-fit` already handles this - and the override wins over it, because it is a later, more specific rule.',
            },
            {
              id: 'quiz-css-l117-q5',
              type: 'multiple-choice',
              prompt: 'Why can a CSS Grid card layout be fully responsive with no media queries?',
              options: [
                'Grid ignores the container width and always uses fixed track sizes',
                'The browser recomputes the number of `auto-fit` tracks every time the container resizes, using the `minmax()` floor as the breakpoint',
                'Media queries are applied automatically inside grid track lists',
                '`1fr` makes each track scale proportionally to the font size',
              ],
              answer: 1,
              explanation: 'Track sizing is a live calculation. As the container narrows, tracks that cannot hold their `minmax()` minimum drop out, and `auto-fit` collapses the empties - so the layout reflows continuously with no breakpoints written anywhere. `1fr` means an equal share of the leftover space, nothing to do with font size.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l117-b1',
            body: 'There is a good chance you will never write a media query for your card grid. CSS Grid can decide how many columns fit and reflow every time the container resizes, with no breakpoints involved. The whole mechanism is three keywords - `repeat`, `minmax` and `auto-fit` - and the only thing you have to choose is the smallest a column is allowed to get.',
          },
          {
            type: 'demo',
            id: 'c-l117-d1',
            title: 'auto-fit collapsing from four columns to one',
            body: 'Narrow the browser window and watch the grid re-flow. At the widest size there are four columns; as the container narrows, tracks drop out one at a time as soon as another would fall below `14rem`, until there is a single column. No media query is involved at any point - the browser is just re-running the track calculation. Resize the window to see it; this preview is a fixed size otherwise.',
            html: `<div class="rwd-grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
</div>`,
            css: `.rwd-grid {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  display: grid;
  /* one row of as many tracks as fit, each at least 14rem and at most 1fr,
     and no empty tracks left over - that is what auto-fit means */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 0.6rem;
}
.rwd-grid .cell {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 6px;
  padding: 0.9rem 0.7rem;
  text-align: center;
  color: #29e2bd;
  font-weight: 600;
}`,
            height: 120,
          },
          {
            type: 'text',
            id: 'c-l117-b2',
            body: 'The result at the top of this page is four columns. Resize the window below roughly 60rem and it becomes three, then two, then one. **The breakpoint is an emergent property of the container width and your chosen minimum track size - not a number you typed anywhere.** That is what designing for content breakpoints means in practice.',
          },
          {
            type: 'heading',
            id: 'c-l117-h1',
            level: 3,
            body: 'How the track count is calculated',
          },
          {
            type: 'code',
            id: 'c-l117-c1',
            language: 'css',
            title: 'The whole pattern, annotated',
            code: `.cards {
  display: grid;
  gap: 1rem;

  /* repeat() asks for N tracks that all share one definition */
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
}

/* read it right to left:
   1fr      each track takes an equal share of whatever space is left over
   minmax() ... but that share has a floor and a ceiling
   auto-fit  "as many as fit" - and collapse the empty ones */
`,
          },
          {
            type: 'list',
            id: 'c-l117-l1',
            style: 'bullet',
            items: [
              '**`repeat()`** — generates a number of tracks from a single definition. `repeat(3, 1fr)` is three equal columns. `repeat(auto-fit, ...)` is the special form: the count is not written down, it is worked out from the space available.',
              '**`minmax()`** — gives a track a floor and a ceiling. `minmax(18rem, 1fr)` means "never narrower than 18rem, and as wide as an equal share of the leftover space". The minimum is where your breakpoint comes from, so pick it based on what the content needs.',
              '**`auto-fit`** — asks for as many tracks as fit, then **collapses any that end up empty**. That collapse is what makes the remaining tracks grow to fill the row, which is why the last row of a three-item grid fills the full width instead of leaving a gap.',
              '**`auto-fill`** — asks for as many tracks as fit but **keeps the empty ones**. With four items in a five-track row, you get four cards and one blank slot, and the cards do not grow.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l117-h2',
            level: 3,
            body: 'auto-fit versus auto-fill, side by side',
          },
          {
            type: 'text',
            id: 'c-l117-b3',
            body: 'This is the one distinction worth memorising, because the two keywords differ in exactly one situation and the difference is very visible. Give a grid four items and a track definition that yields five tracks.',
          },
          {
            type: 'example',
            id: 'c-l117-e1',
            title: 'Four items: auto-fit stretches them, auto-fill leaves a gap',
            body: 'Both grids hold the same four items. The top grid uses `auto-fit`, so the fifth, empty track is collapsed and the four cards each grow to a quarter of the row. The bottom grid uses `auto-fill`, so the empty track survives and you can see it as the blank space after the fourth card. Narrow the window until only three tracks fit and the difference disappears - both behave identically once the row is full.',
            html: `<p class="cap">auto-fit</p>
<div class="grid fit">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
</div>

<p class="cap">auto-fill</p>
<div class="grid fill">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
</div>`,
            css: `.cap {
  margin: 0 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.grid {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
}
.grid.fit {
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
}
.grid.fill {
  grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
}
.cell {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 5px;
  padding: 0.5rem 0.4rem;
  text-align: center;
  color: #29e2bd;
  font-weight: 600;
  font-size: 12px;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l117-t1',
            title: 'Choose the minimum from the content',
            body: 'Do not pick `18rem` because a tutorial said so. Pick the width at which the content inside a card stops working - roughly 45 to 60 characters of text, or enough room for a thumbnail plus a legible label. That number *is* your breakpoint, and it will be different from everyone else\'s.',
          },
          {
            type: 'warning',
            id: 'c-l117-w1',
            title: 'auto-fit can make a single lonely item full width',
            body: 'If exactly one item remains in the last row, `auto-fit` collapses every other track and that one card expands to the full container width - often a jarring 1200px-wide card. Either use `auto-fill`, or use `:last-child` / `:nth-last-child(n + 3)` to stretch the final row deliberately rather than by accident.',
          },
          {
            type: 'exercise',
            id: 'c-l117-x1',
            exercise: {
              id: 'ex-l117',
              instructions:
                'Give the grid below responsive columns with no media query: set `grid-template-columns` so it lays out as many columns as fit, each at least 10rem wide and sharing the leftover space, and collapsing any empty tracks.',
              languages: ['css'],
              starterCode: {
                html: '<div class="grid">\n  <div class="cell">One</div>\n  <div class="cell">Two</div>\n  <div class="cell">Three</div>\n  <div class="cell">Four</div>\n</div>',
                css: '.grid {\n  display: grid;\n  gap: 0.5rem;\n}\n.cell {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.5rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l117-t1',
                  label: 'The grid is in use',
                  body: 'return getComputedStyle(document.querySelector(".grid")).display === "grid"',
                },
                {
                  id: 'ex-l117-t2',
                  label: 'The resolved track list has at least one track and every track is a real length, not 0px',
                  body: 'const t = getComputedStyle(document.querySelector(".grid")).gridTemplateColumns.trim().split(/\\s+/); return t.length > 0 && t.every(x => x.endsWith("px") && parseFloat(x) > 0)',
                },
                {
                  id: 'ex-l117-t3',
                  label: 'No track is narrower than the 10rem (160px) minimum',
                  body: 'const t = getComputedStyle(document.querySelector(".grid")).gridTemplateColumns.trim().split(/\\s+/); return t.every(x => parseFloat(x) >= 159)',
                },
                {
                  id: 'ex-l117-t4',
                  label: 'Every cell sits in the first row, so empty tracks were collapsed',
                  body: 'const tops = new Set([...document.querySelectorAll(".cell")].map(c => Math.round(c.getBoundingClientRect().top))); return tops.size === 1',
                },
              ],
              hints: [
                'You need `repeat()`, a `minmax()` with a `1fr` ceiling, and `auto-fit` inside them.',
                '`auto-fit` is the keyword that collapses the leftover empty tracks; `auto-fill` would leave them.',
                '`grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));`',
              ],
              solution: {
                html: '<div class="grid">\n  <div class="cell">One</div>\n  <div class="cell">Two</div>\n  <div class="cell">Three</div>\n  <div class="cell">Four</div>\n</div>',
                css: '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));\n  gap: 0.5rem;\n}\n.cell {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.5rem;\n}\n',
              },
              testNotes:
                'The tests read the computed `grid-template-columns`, which the browser resolves into a list of pixel tracks such as `320px 320px`. The track count therefore depends on the width of the exercise preview, which is why the tests assert on track validity and minimum width rather than on a fixed count. The fourth test checks that all four cells share a top edge, which fails with `auto-fill` if the row has an empty track.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s73',
    title: 'RWD Media Queries',
    description:
      'The `@media` rule in full: media types against media features, `min-width` against `max-width`, the range syntax, and how to organise breakpoints across a codebase.',
    lessons: [
      {
        id: 'css-l118',
        title: 'RWD Media Queries',
        description:
          'Write media queries by hand, choose between `min-width` and `max-width` for a reason, and organise breakpoints so they do not drift apart across a project.',
        duration: 9,
        xp: 55,
        objectives: [
          'Write a media query with a media type, a media feature and a value',
          'Explain the difference between a media type and a media feature',
          'Explain why min-width is preferred over max-width in a mobile-first stylesheet',
          'Combine conditions with and, with a comma, and with the not keyword',
          'Name the breakpoint values used across a codebase and keep them consistent',
        ],
        quiz: {
          id: 'quiz-css-l118',
          title: 'RWD Media Queries quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l118-q1',
              type: 'multiple-choice',
              prompt: 'What is the difference between a media type and a media feature?',
              options: [
                'Types are obsolete; features are the modern replacement',
                'The type describes the kind of output (screen, print); the feature describes a property of it (width, orientation)',
                'Features only work inside `not` queries',
                'A query can have either one or several types, never features',
              ],
              answer: 1,
              explanation: 'The media type answers "what kind of output": `screen`, `print`, `speech`. The media feature answers "what about it": `width`, `min-width`, `orientation`, `prefers-color-scheme`. `screen` is the default type, which is why `@media (min-width: 48rem)` is shorthand for the `screen and ...` form.',
            },
            {
              id: 'quiz-css-l118-q2',
              type: 'true-false',
              prompt: 'Writing media queries with `min-width` instead of `max-width` makes the stylesheet mobile first, which is generally the better default.',
              answer: true,
              explanation: 'With `min-width` the base rules describe the narrow layout and each query adds to it. Nothing has to be reversed or undone, no query contradicts another, and a size in between the breakpoints can still be designed cleanly rather than only patched.',
            },
            {
              id: 'quiz-css-l118-q3',
              type: 'blank',
              prompt: 'Which single property contains both `screen` and the width test in the rule `@media screen and (min-width: 48rem)`?',
              answers: [
                'and',
              ],
              explanation: '`and` joins two conditions that must both hold. A comma would be a logical OR (the rule would apply on wide screens *or* on paper), and `not` negates the entire query rather than joining anything.',
            },
            {
              id: 'quiz-css-l118-q4',
              type: 'multiple-choice',
              prompt: 'Which query matches only between 640px and 1024px, and is written most clearly?',
              options: [
                '@media (max-width: 640px) and (min-width: 1024px)',
                '@media (40rem <= width < 64rem)',
                '@media (width >= 40rem) and (width < 64rem)',
                '@media not (width >= 64rem) and (width >= 40rem)',
              ],
              answer: 1,
              explanation: 'The modern range syntax expresses an interval in one readable comparison. The first option can never be true because no width is simultaneously at most 640px and at least 1024px. The range syntax is supported across all current browsers and removes the need to stack two queries.',
            },
            {
              id: 'quiz-css-l118-q5',
              type: 'identify-error',
              prompt: 'Why does this comment mislead the next developer?',
              code: '/* tablet layout */\n@media (max-width: 768px) {\n  .nav { display: flex; }\n}',
              options: [
                'Media queries cannot use `max-width`',
                'The query is named after a device rather than after what the layout does, and device widths go stale immediately',
                '`display: flex` is not supported inside a media query',
                'The comment should be above the rule, not inside it',
              ],
              answer: 1,
              explanation: '768px is a hardware guess that says nothing about the design, and it is wrong for a 700px desktop window, a split-screen tablet and a foldable alike. Name the breakpoint after the behaviour - "navigation becomes a single row" - because that is still true after the devices change.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l118-b1',
            body: 'A media query is a conditional block: CSS the browser only applies when the thing being queried matches. They are the tool for changes that a grid cannot express - reordering a header, moving a sidebar, switching to a tab bar - and they are the tool of last resort for everything else.',
          },
          {
            type: 'demo',
            id: 'c-l118-d1',
            title: 'A layout that reflows at a breakpoint',
            body: 'The panel below is styled twice. The base rules describe the narrow design: one column, the navigation stacked above the content. Inside `@media (min-width: 40rem)` the same elements become two columns with the navigation in a side rail, and the accent border moves from the top edge to the left edge. The preview is a fixed size, so you cannot resize it here - open this lesson in the browser\'s own width and watch it change as you drag the window past 640px.',
            html: `<div class="rwd-mq">
  <nav class="rail">Home<br>Work<br>About</nav>
  <div class="content">
    <h4>Same markup, two layouts</h4>
    <p>Below 40rem the rail sits above the content in a single column. At 40rem and above it moves to the left as a fixed-width sidebar. Only the CSS differs.</p>
  </div>
</div>`,
            css: `.rwd-mq {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  display: grid;
  gap: 0.75rem;
  border-top: 3px solid #29e2bd;
  padding-top: 0.75rem;
}
.rwd-mq .rail {
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 6px;
  padding: 0.6rem;
  color: #29e2bd;
  line-height: 1.7;
  font-size: 12px;
}
.rwd-mq .content h4 {
  margin: 0 0 0.35rem;
  font-size: 14px;
}
.rwd-mq .content p {
  margin: 0;
  color: #9aa5b4;
  line-height: 1.55;
}

/* above 640px the structure changes, so a media query is the right tool */
@media (min-width: 40rem) {
  .rwd-mq {
    grid-template-columns: 8rem 1fr;
    align-items: start;
    border-top: 0;
    border-left: 3px solid #29e2bd;
    padding-top: 0;
    padding-left: 0.75rem;
  }
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l118-b2',
            body: 'Note that the preview itself cannot be resized, so nothing appears to change here. That is a limitation of the sandbox, not of the rule. Open this page in a real browser and drag the window: the layout flips at exactly 640px, and every value between 40rem and 100rem shares the same two-column design.',
          },
          {
            type: 'heading',
            id: 'c-l118-h1',
            level: 3,
            body: 'The syntax',
          },
          {
            type: 'code',
            id: 'c-l118-c1',
            language: 'css',
            title: 'Anatomy of a media query',
            code: `@media screen and (min-width: 48rem) {
  /* 1  media type: screen, print, all (the default)
     2  the keyword and
     3  media feature: min-width
     4  the value it is compared against */
  .layout {
    grid-template-columns: 12rem 1fr;
  }
}`,
          },
          {
            type: 'list',
            id: 'c-l118-l1',
            style: 'bullet',
            items: [
              '**Media type** answers "what kind of output": `screen`, `print`, or `speech`. `screen` is the default, so `@media (min-width: 48rem)` and `@media screen and (min-width: 48rem)` are the same thing. Almost every query you write is a `screen` query.',
              '**Media feature** answers "what about this output": `width`, `min-width`, `max-width`, `orientation`, `prefers-color-scheme`, `prefers-reduced-motion`, `hover`, `pointer`. These are the parts that are actually interesting.',
              '**`min-width` and `max-width`** — the two you will use constantly. `min-width` asks "is it at least this wide?" and `max-width` asks "is it no wider than this?". Both compare against the viewport, not the container, so a query inside a component is always about the window.',
              '**Orientation** (`orientation: portrait`) is a much worse proxy for "is this a phone" than `min-width`, because a phone in landscape is wider than a small tablet in portrait. Use it only for something that genuinely depends on shape.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l118-h2',
            level: 3,
            body: 'min-width, and why it wins',
          },
          {
            type: 'text',
            id: 'c-l118-b3',
            body: 'Both styles work, and the old tutorials are full of `max-width`. Write `min-width` anyway, for one concrete reason: **it is mobile first**. With `min-width` the base rules describe the narrow layout, and each query *adds* something as space appears. Nothing needs to be undone, no query can contradict another, and you can read the stylesheet from narrow to wide and know exactly what the page looks like at each step.',
          },
          {
            type: 'code',
            id: 'c-l118-c2',
            language: 'css',
            title: 'The same two designs, written both ways',
            code: `/* desktop first - the query must take things away, so every change
   is a reversal, and a third size can only be patched, never designed */
@media (max-width: 40rem) {
  .layout { grid-template-columns: 1fr; }
}

/* mobile first - the base is the narrow design, each query adds.
   A size in between can still be designed cleanly. */
.layout { grid-template-columns: 1fr; }
@media (min-width: 40rem) {
  .layout { grid-template-columns: 12rem 1fr; }
}`,
          },
          {
            type: 'warning',
            id: 'c-l118-w1',
            title: 'A media query is not a device query',
            body: 'Writing `@media (max-width: 768px) { /* tablets */ }` is a comment that will be wrong within a year. Breakpoints are named after what the layout does at that width, not after the hardware. `@media (min-width: 40rem)` and a comment saying "two-column layout becomes viable" tells the next reader something true.',
          },
          {
            type: 'heading',
            id: 'c-l118-h3',
            level: 3,
            body: 'Combining conditions',
          },
          {
            type: 'list',
            id: 'c-l118-l2',
            style: 'bullet',
            items: [
              '**`and`** — both conditions must be true. `@media screen and (min-width: 40rem) and (orientation: landscape)` fires only in that one combination.',
              '**A comma** — a logical OR, and each condition must be a complete query. `@media (min-width: 60rem), print` applies on wide screens *and* on paper, which is how you share rules with a print stylesheet.',
              '**`not`** — negates the whole query. `@media not all and (hover: hover)` means "any device without a real hover pointer", which is how you make hover-only affordances safe on touch. Note that `not` goes at the start, before the type.',
              '**Range syntax** — the modern one. `@media (width >= 48rem)` is exactly equivalent to `@media (min-width: 48rem)` and supports `<`, `<=`, `>` and `>=` in one readable interval: `@media (40rem <= width < 64rem)` describes a band instead of stacking two queries.',
            ],
          },
          {
            type: 'code',
            id: 'c-l118-c3',
            language: 'css',
            title: 'Range syntax, and why rem beats em here',
            code: `@media (width >= 48rem) { }        /* same as min-width: 48rem */
@media (40rem <= width < 64rem) { }  /* a band, without stacking two queries */

/* prefer rem in breakpoints. em in a media query resolves against the
   BROWSER DEFAULT font size (16px), not your root font size, so em and
   px agree while rem also responds to a user's text-size preference. */
@media (min-width: 48rem) { }   /* 768px at a 16px root */
@media (min-width: 768px) { }   /* identical today, and wrong if the
                                    user scales their default text size */`,
          },
          {
            type: 'tip',
            id: 'c-l118-t1',
            title: 'Keep a short, shared list of breakpoints',
            body: 'Most projects need three or four. Write them down in one place - a custom property block, a comment at the top of the stylesheet, or a short note in the README - and use only those values. Four authors each inventing their own breakpoints produce a stylesheet where the phone, tablet and desktop designs disagree by a few pixels, which is far worse than having no media queries at all. A workable default set: `40rem`, `48rem`, `64rem`, `80rem`.',
          },
          {
            type: 'exercise',
            id: 'c-l118-x1',
            exercise: {
              id: 'ex-l118',
              instructions:
                'Add a media query so that from `48rem` and above the layout becomes two columns of `10rem` and the rest, and give the panel a left accent border at that size. Write it with `min-width` (mobile first) so the narrow layout stays the default.',
              languages: ['css'],
              starterCode: {
                html: '<div class="layout">\n  <nav class="rail">Home<br>Work<br>About</nav>\n  <div class="content"><p>One column by default. Above 48rem this should become a 10rem rail beside the content, with a left accent border.</p></div>\n</div>',
                css: '.layout {\n  display: grid;\n  gap: 0.75rem;\n}\n.rail {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.6rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l118-t1',
                  label: 'Above 48rem the layout has two tracks: 10rem and the remainder',
                  body: 'const t = getComputedStyle(document.querySelector(".layout")).gridTemplateColumns.trim().split(/\\s+/); return t.length === 2 && Math.abs(parseFloat(t[0]) - 160) < 2 && parseFloat(t[1]) > parseFloat(t[0])',
                },
                {
                  id: 'ex-l118-t2',
                  label: 'At that size the panel has a left border and no top border',
                  body: 'const s = getComputedStyle(document.querySelector(".layout")); return parseFloat(s.borderLeftWidth) > 0 && parseFloat(s.borderTopWidth) === 0',
                },
                {
                  id: 'ex-l118-t3',
                  label: 'The rule is written mobile first with min-width, not max-width',
                  body: 'const src = document.querySelector("style") ? Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch (e) { return "" } }).join(" ") : ""; return src.includes("min-width") && !src.includes("max-width")',
                },
              ],
              hints: [
                'Write the narrow layout as the base rule, with no query at all.',
                'The query adds the two-column grid and the border, so it needs `min-width`.',
                '`@media (min-width: 48rem) { .layout { grid-template-columns: 10rem 1fr; border-left: 3px solid #29e2bd; } }`',
              ],
              solution: {
                html: '<div class="layout">\n  <nav class="rail">Home<br>Work<br>About</nav>\n  <div class="content"><p>One column by default. Above 48rem this should become a 10rem rail beside the content, with a left accent border.</p></div>\n</div>',
                css: '.layout {\n  display: grid;\n  gap: 0.75rem;\n}\n.rail {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 0.6rem;\n}\n\n/* mobile first: the narrow layout above is the default, this only adds */\n@media (min-width: 48rem) {\n  .layout {\n    grid-template-columns: 10rem 1fr;\n    align-items: start;\n    border-left: 3px solid #29e2bd;\n    padding-left: 0.75rem;\n  }\n}',
              },
              testNotes:
                'IMPORTANT: the first two tests only pass if the test runner viewport is 768px wide or wider, because the rule they read exists only inside the media query. Below 48rem the correct solution fails by design. `10rem` computes to 160px at the default root font size. The third test reads the actual stylesheet rules and confirms the query uses `min-width` and not `max-width`.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s74',
    title: 'RWD Images',
    description:
      'Stop images overflowing with two declarations, then serve the right file for the right screen with `srcset`, `sizes` and `<picture>`.',
    lessons: [
      {
        id: 'css-l119',
        title: 'RWD Images',
        description:
          'The two-declaration baseline that keeps an image inside its container, and how to let the browser choose a source file with `srcset`, `sizes` and the `picture` element.',
        duration: 8,
        xp: 50,
        objectives: [
          'Stop an image overflowing its container with max-width and height: auto',
          'Explain why height: auto is required alongside max-width',
          'Use srcset and sizes to let the browser pick a resolution',
          'Use the picture element for art direction, with media and type',
          'Explain the difference between resolution switching and art direction',
        ],
        quiz: {
          id: 'quiz-css-l119',
          title: 'RWD Images quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l119-q1',
              type: 'multiple-choice',
              prompt: 'Why does `height: auto` have to accompany `max-width: 100%` on an image?',
              options: [
                'Because `height: auto` is what makes the image scale at all',
                'Because without it the browser honours the height attribute and the scaled image is squashed',
                'Because `max-width` is ignored on replaced elements without it',
                'Because it removes the need for the width and height attributes',
              ],
              answer: 1,
              explanation: 'The browser reads the `height` attribute as a real height, so capping the width alone gives you a 260x173 box with 16:9 content stretched into it. `height: auto` makes the height derive from the width, which is what preserves the ratio.',
            },
            {
              id: 'quiz-css-l119-q2',
              type: 'true-false',
              prompt: 'Setting `sizes` correctly is optional, because the browser falls back to assuming the image fills the whole viewport.',
              answer: false,
              explanation: 'The browser does fall back to 100vw, and that is exactly the problem: an image that renders 260px wide is treated as needing a full-width candidate, so phones download the large file. `sizes` is a media query list describing the real rendered width, and it is what makes `srcset` worthwhile.',
            },
            {
              id: 'quiz-css-l119-q3',
              type: 'blank',
              prompt: 'Which HTML element lets you serve a different crop of the same photograph on narrow screens?',
              answers: [
                'picture',
                '<picture>',
              ],
              explanation: '`picture` wraps a set of `source` elements chosen by `media` or `type`, plus a mandatory `img` fallback that carries `alt`, `width` and `height`. It is the tool for art direction - different compositions per screen - whereas `srcset` on its own only switches resolution.',
            },
            {
              id: 'quiz-css-l119-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this markup?',
              code: '<picture>\n  <source srcset="hero.avif" type="image/avif">\n  <img src="hero.jpg" width="1600" height="900">\n</picture>',
              options: [
                'Nothing: this is a correct AVIF fallback chain',
                'The type attribute must come before srcset',
                'The img needs loading="lazy" to be valid',
                'picture cannot contain a source without a media attribute',
              ],
              answer: 0,
              explanation: 'This is correct. The browser takes the first `source` whose `type` it supports, so an AVIF-capable browser gets the smaller file and everything else falls through to the `img`. Note what is missing though: the `alt` attribute, which is required.',
            },
            {
              id: 'quiz-css-l119-q5',
              type: 'multiple-choice',
              prompt: 'Your page jumps as images load, shifting the text down. Which change fixes that most directly?',
              options: [
                'Add `loading="lazy"` to every image',
                'Add width and height attributes so the browser can reserve the box',
                'Set `width: 100%` on all images',
                'Convert the images to SVG',
              ],
              answer: 1,
              explanation: 'With `width` and `height` attributes the browser knows the aspect ratio before the file arrives, so it reserves the right height and nothing moves. `loading="lazy"` helps initial load performance but does nothing about the shift for images already in view.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l119-b1',
            body: 'Images are the most common cause of a broken mobile layout, and the most commonly skipped fix. Start with the two declarations below and almost every image problem on the web goes away.',
          },
          {
            type: 'demo',
            id: 'c-l119-d1',
            title: 'max-width: 100% with height: auto',
            body: 'The top image has no width rules at all, so it renders at its intrinsic 480px and spills out of a 260px box. The bottom one is identical except for `max-width: 100%; height: auto`, which scales it down to the box width while keeping the 3:2 proportion. Both images are inline SVG data URIs, so this preview needs no network and you can see the scaling immediately.',
            html: `<div class="rwd-img">
  <p class="cap">no width rules - 480px intrinsic width, overflowing</p>
  <div class="frame">
    <img class="raw"
      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='320'><rect width='480' height='320' fill='%232a3441'/><text x='240' y='170' font-family='sans-serif' font-size='34' fill='%239aa5b4' text-anchor='middle'>480 x 320</text></svg>"
      alt="A wide placeholder image at its intrinsic size">
  </div>

  <p class="cap">max-width: 100% + height: auto - scaled to the box, same ratio</p>
  <div class="frame">
    <img class="fluid"
      src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='320'><rect width='480' height='320' fill='%231f6feb'/><text x='240' y='170' font-family='sans-serif' font-size='34' fill='%23ffffff' text-anchor='middle'>480 x 320</text></svg>"
      alt="A wide placeholder image scaled down to its container">
  </div>
</div>`,
            css: `.rwd-img {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
}
.rwd-img .cap {
  margin: 0 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
.rwd-img .frame {
  width: 260px;
  border: 1px dashed #2a3441;
  padding: 0.25rem;
  margin-bottom: 0.9rem;
}
.rwd-img img {
  display: block;
}
/* the fix, in full */
.rwd-img .fluid {
  max-width: 100%;
  height: auto;
}`,
            height: 420,
          },
          {
            type: 'text',
            id: 'c-l119-b2',
            body: 'Note the two declarations together. `max-width: 100%` stops the image ever being wider than its container, but on its own it is not enough: the browser has already read the `height` attribute and will honour it, so a scaled-down image ends up squashed into 260x173 while the content inside is stretched. **`height: auto` tells the browser to derive the height from the width**, and that is what preserves the proportion.',
          },
          {
            type: 'heading',
            id: 'c-l119-h1',
            level: 3,
            body: 'The baseline, and why it is worth putting on everything',
          },
          {
            type: 'code',
            id: 'c-l119-c1',
            language: 'css',
            title: 'Two declarations, one reset',
            code: `/* put this on img, video, canvas, svg - anything replaced */
img,
video,
canvas,
svg {
  max-width: 100%;
  height: auto;
}`,
          },
          {
            type: 'tip',
            id: 'c-l119-t1',
            title: 'Add display: block while you are there',
            body: 'An inline `<img>` sits on the text baseline, which leaves a few pixels of mystery gap underneath it. That gap is the single most common cause of "why is there a stripe under this picture". `display: block` removes it, and it costs nothing.',
          },
          {
            type: 'heading',
            id: 'c-l119-h2',
            level: 3,
            body: 'Serving the right file: srcset and sizes',
          },
          {
            type: 'text',
            id: 'c-l119-b3',
            body: 'The CSS above makes the image *fit*. It does nothing about how many bytes were downloaded: a phone is still downloading a 2400px-wide file and shrinking it, which is slow, wasteful and the main reason images are the heaviest part of most pages. **`srcset` lets the browser pick the file before it downloads anything**, because it knows the screen, the pixel density and the layout slot.',
          },
          {
            type: 'code',
            id: 'c-l119-c2',
            language: 'html',
            title: 'Resolution switching with srcset and sizes',
            code: `<!-- sizes tells the browser how wide the image will actually render,
     so it can choose a source BEFORE downloading. It is a media query
     list plus a fallback - and it must be right or the whole thing
     degrades to "assume full width". -->
<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1600.jpg 1600w"
  sizes="(max-width: 40rem) 100vw,
         (max-width: 64rem) 50vw,
         400px"
  width="1600" height="1067"
  alt="A warehouse aisle, photographed at dusk"
  loading="lazy" decoding="async">

<!-- always give width and height attributes: they let the browser
     reserve the right space before the file arrives, which is what
     stops the page jumping as images load -- a real layout shift
     and a measurable performance score. -->`,
          },
          {
            type: 'list',
            id: 'c-l119-l1',
            style: 'bullet',
            items: [
              '**`srcset="file.jpg 400w, ..."`** — a list of candidate files with the width each one is. The `w` descriptor is the honest one for responsive images. The older pixel-density descriptor (`2x`) works too, but you then have to know your sizes in advance.',
              '**`sizes`** — a media query list describing how wide the image will render at each viewport, ending in a fallback width. The browser combines it with the device pixel ratio and picks a candidate at least that wide. Getting `sizes` wrong silently costs you the biggest file on every device, so write it for your actual layout.',
              '**Resolution switching** — every candidate shows the same picture at different sizes. One image, several files. This is what you want for almost all photography.',
              '**Art direction** — different *crops or compositions* per screen, because the 16:9 landscape that works on a desktop does not work in a 4:5 mobile card. This needs the `picture` element, because the choice is made by markup, not by width.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l119-h3',
            level: 3,
            body: 'The picture element',
          },
          {
            type: 'code',
            id: 'c-l119-c3',
            language: 'html',
            title: 'Art direction and format fallback',
            code: `<!-- art direction: a wide crop on desktop, a tall crop on narrow
     screens, chosen with the same media queries as your CSS -->
<picture>
  <source media="(max-width: 40rem)" srcset="portrait-600.avif, portrait-600.jpg">
  <source media="(min-width: 40rem)" srcset="landscape-1200.avif, landscape-1200.jpg">
  <img src="landscape-1200.jpg"
       width="1200" height="675"
       alt="The control room at night">
</picture>

<!-- format fallback works the same way: the browser takes the first
     <source> whose type it supports, and skips the rest -->
<picture>
  <source type="image/avif" srcset="hero.avif">
  <source type="image/webp" srcset="hero.webp">
  <img src="hero.jpg" alt="A hero illustration">
</picture>

<!-- the <img> is mandatory: it is the fallback, and it is what
     carries alt, width and height. -->`,
          },
          {
            type: 'warning',
            id: 'c-l119-w1',
            title: 'A preview cannot show you srcset working',
            body: 'Choosing the right file is a network decision the browser makes at load time, and there is nothing a static preview can observe. That is why the demo above shows the CSS half of the story - the overflow fix - with inline data URIs. The `srcset` markup is for real pages, and the only honest way to check it is to open the network panel and watch which file was requested.',
          },
          {
            type: 'exercise',
            id: 'c-l119-x1',
            exercise: {
              id: 'ex-l119',
              instructions:
                'Stop the image below overflowing its 220px frame: give it a `max-width` of `100%` and a `height` of `auto` so it scales down while keeping its 3:2 ratio.',
              languages: ['css'],
              starterCode: {
                html: '<div class="frame">\n  <img src="data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'480\' height=\'320\'><rect width=\'480\' height=\'320\' fill=\'%231f6feb\'/></svg>" alt="Placeholder">\n</div>',
                css: '.frame {\n  width: 220px;\n  border: 1px dashed #2a3441;\n}\nimg {\n  width: 480px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l119-t1',
                  label: 'The image is capped at 100% of its container',
                  body: 'return getComputedStyle(document.querySelector("img")).maxWidth === "100%"',
                },
                {
                  id: 'ex-l119-t2',
                  label: 'The height is auto so the ratio is preserved',
                  body: 'return getComputedStyle(document.querySelector("img")).height === "auto"',
                },
                {
                  id: 'ex-l119-t3',
                  label: 'The rendered image is no wider than its frame',
                  body: 'const i = document.querySelector("img"); const f = document.querySelector(".frame"); return i.getBoundingClientRect().width <= f.getBoundingClientRect().width',
                },
                {
                  id: 'ex-l119-t4',
                  label: 'The rendered width and height are still in a 3:2 ratio',
                  body: 'const r = document.querySelector("img").getBoundingClientRect(); return Math.abs(r.width / r.height - 1.5) < 0.05',
                },
              ],
              hints: [
                'Two declarations, on the `img` element itself.',
                'The width cap alone squashes the image, because the browser still honours the height attribute.',
                '`img { max-width: 100%; height: auto; }`',
              ],
              solution: {
                html: '<div class="frame">\n  <img src="data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'480\' height=\'320\'><rect width=\'480\' height=\'320\' fill=\'%231f6feb\'/></svg>" alt="Placeholder">\n</div>',
                css: '.frame {\n  width: 220px;\n  border: 1px dashed #2a3441;\n}\nimg {\n  max-width: 100%;\n  height: auto;\n  display: block;\n}\n',
              },
              testNotes:
                'The tests read `max-width` and `height` on the image, then measure the rendered box. `height: auto` is what makes the fourth test pass - the intrinsic ratio of the inline SVG is 480/320 = 1.5, and with a hard width the box would come out at 220x220, a ratio of 1.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s75',
    title: 'RWD Videos',
    description:
      'Keeping embedded video responsive: the padding hack, why an iframe still needs it, and how `aspect-ratio` replaces the whole thing.',
    lessons: [
      {
        id: 'css-l120',
        title: 'RWD Videos',
        description:
          'The intrinsic-ratio padding hack, what it still does that `aspect-ratio` does not, and how to crop a frame that will not cooperate with `object-fit: cover`.',
        duration: 7,
        xp: 45,
        objectives: [
          'Build a responsive 16:9 embed with the padding-top hack',
          'Explain why padding works as a height here and why it is still needed for an iframe',
          'Use the aspect-ratio property instead, and know when the hack is still required',
          'Crop a mis-shaped frame with object-fit: cover',
        ],
        quiz: {
          id: 'quiz-css-l120',
          title: 'RWD Videos quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l120-q1',
              type: 'multiple-choice',
              prompt: 'Why does the padding-top trick work for a 16:9 embed?',
              options: [
                'Percentage padding resolves against the containing block width, and 56.25% of the width is 9/16 of it',
                'Padding forces the browser to read the video file and measure it first',
                'An iframe has no intrinsic size, so the browser guesses one',
                'Padding-top overrides the width attribute on the iframe',
              ],
              answer: 0,
              explanation: 'Percentage padding is always resolved against the containing block *width*. A wrapper 640px wide gets 360px of top padding from `56.25%`, which is exactly the height a 640x360 video needs. Setting the wrapper height to 0 leaves that padding as the only contribution.',
            },
            {
              id: 'quiz-css-l120-q2',
              type: 'true-false',
              prompt: 'An iframe has an intrinsic aspect ratio, so it needs no wrapper element at all if you set `width: 100%`.',
              answer: false,
              explanation: 'An iframe has no intrinsic ratio - it does not know what aspect it should be - so `width: 100%` gives you a 300px-tall letterbox of arbitrary height. That is why it needs a sized wrapper. Replaced elements such as `<img>` and `<video>` *do* know their ratio, which is why `max-width: 100%; height: auto` is enough for those.',
            },
            {
              id: 'quiz-css-l120-q3',
              type: 'blank',
              prompt: 'What percentage `padding-top` gives a wrapper a 16:9 shape?',
              answers: [
                '56.25%',
                '56.25',
              ],
              explanation: '9/16 = 0.5625. Write the division in a comment next to the number - 4:3 is 75%, 1:1 is 100% - because nobody remembers these without checking.',
            },
            {
              id: 'quiz-css-l120-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this wrapper?',
              code: '.ratio {\n  position: relative;\n  padding-top: 56.25%;\n}\n.ratio iframe {\n  width: 100%;\n  height: 320px;\n  border: 0;\n}',
              options: [
                'The padding percentage is wrong for 16:9',
                'The wrapper is missing height: 0, and the iframe is not absolutely positioned, so it stacks after the padding and doubles the height',
                'A percentage padding-top is only valid on positioned elements',
                'The iframe needs `aspect-ratio` rather than a fixed height',
              ],
              answer: 1,
              explanation: 'The hack needs both halves: `height: 0` so only the padding contributes to the wrapper height, and `position: absolute; inset: 0` on the child so it fills that padding instead of adding its own height underneath it. Modern CSS does all of this with `aspect-ratio: 16 / 9` on the wrapper plus `height: 100%` on the child.',
            },
            {
              id: 'quiz-css-l120-q5',
              type: 'multiple-choice',
              prompt: 'Your card grid has fixed-ratio boxes and the images inside look squashed. What fixes it?',
              options: [
                'Add `object-fit: contain` to the images',
                'Set an explicit size or aspect-ratio on the image as well as `object-fit: cover`',
                'Add `width: auto` to the images',
                'Remove the width and height attributes from the img',
              ],
              answer: 1,
              explanation: '`object-fit` only does anything once the element has a box that differs from the source ratio. With `width: 100%` and no height the image already matches its content, so `cover` silently does nothing. Give the image an `aspect-ratio` or height, then `object-fit: cover` fills the box and crops the overflow.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l120-b1',
            body: 'A video embed has an intrinsic size - 640x360, say - and it will not scale itself. Left alone, it forces its container wider than a phone screen and the whole page scrolls sideways. The fix is the same idea as the image lesson: reserve the right amount of space in advance, and let the player fill it.',
          },
          {
            type: 'demo',
            id: 'c-l120-d1',
            title: 'The padding-top ratio trick beside the modern aspect-ratio',
            body: 'Both frames hold the same 16:9 gradient "player". The left one uses the old trick: the wrapper gets `padding-top: 56.25%` - which is 9/16 of its own width - and the child is absolutely positioned to fill it. The right one does the same job with a single `aspect-ratio: 16 / 9` declaration. Drag the window narrower and both stay 16:9; neither needs a media query.',
            html: `<div class="rwd-video">
  <p class="cap">padding-top: 56.25% with an absolutely positioned child</p>
  <div class="ratio">
    <div class="player">16:9 via padding</div>
  </div>

  <p class="cap">aspect-ratio: 16 / 9</p>
  <div class="ratio modern">
    <div class="player">16:9 via aspect-ratio</div>
  </div>
</div>`,
            css: `.rwd-video {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
}
.rwd-video .cap {
  margin: 0 0 0.3rem;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9aa5b4;
}
/* the wrapper is an ordinary block, so its width comes from the page */
.ratio {
  position: relative;
  height: 0;
  margin-bottom: 0.9rem;
  /* 9 / 16 = 0.5625, so 56.25% of the wrapper width becomes its height */
  padding-top: 56.25%;
  background: #1d2531;
  border: 1px solid #2a3441;
}
.ratio .player {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #1f6feb, #29e2bd);
  color: #0b0d10;
  font-weight: 600;
  font-size: 13px;
}
/* the modern one-liner, no absolute positioning and no zero height */
.ratio.modern {
  height: auto;
  padding-top: 0;
  aspect-ratio: 16 / 9;
}`,
            height: 380,
          },
          {
            type: 'heading',
            id: 'c-l120-h1',
            level: 3,
            body: 'Why padding does that',
          },
          {
            type: 'text',
            id: 'c-l120-b2',
            body: 'Percentage padding resolves against the **width** of the containing block, whatever the element. A wrapper that is 640px wide gets `padding-top: 56.25%` = 360px, which is exactly the height a 640x360 video needs. Set the wrapper height to `0` so the padding is all that is left, then pull the child out of the flow with `position: absolute; inset: 0` so it fills that space exactly. The wrapper then behaves like a div of unknown height with a known ratio, and it scales with no JavaScript.',
          },
          {
            type: 'code',
            id: 'c-l120-c1',
            language: 'css',
            title: 'The padding hack, and the markup it needs',
            code: `/* the wrapper does the arithmetic */
.ratio {
  position: relative;
  height: 0;
  padding-top: 56.25%;   /* 9 / 16 */
}
.ratio > iframe,
.ratio > video {
  position: absolute;
  inset: 0;             /* fill the padding box exactly */
  width: 100%;
  height: 100%;
  border: 0;
}

/* the wrapper is required - this is not an optional div */
<div class="ratio">
  <iframe src="https://www.youtube.com/embed/..." allowfullscreen></iframe>
</div>`,
          },
          {
            type: 'list',
            id: 'c-l120-l1',
            style: 'bullet',
            items: [
              '**16:9 is `56.25%`** because 9/16 = 0.5625. 4:3 is `75%`, 1:1 is `100%`, 21:9 is `42.86%`. Write the division in a comment next to the number, because nobody remembers these.',
              '**The child must be absolutely positioned.** Without `position: absolute` the `<iframe>` sits *after* the padding, doubling the wrapper height. This is the single most common way to get the hack half-right.',
              '**`height: 0` is not optional either.** The wrapper keeps whatever content height its children contribute; zeroing it leaves the padding as the only contributor.',
              '**An iframe needs the wrapper because it has no intrinsic ratio.** A replaced element such as `<img>` or `<video>` already knows its own proportion, which is why `max-width: 100%; height: auto` works on those and does nothing for an iframe.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l120-h2',
            level: 3,
            body: 'The modern answer',
          },
          {
            type: 'text',
            id: 'c-l120-b3',
            body: 'All of that is now one declaration. `aspect-ratio` tells an element what shape to be, the element gets that shape from its width, and the absolutely positioned child is no longer needed because the wrapper has real height. It is supported everywhere that matters, so use it unless you have a specific reason not to.',
          },
          {
            type: 'code',
            id: 'c-l120-c2',
            language: 'css',
            title: 'aspect-ratio, and the case that still needs the hack',
            code: `/* the whole modern pattern */
.video {
  aspect-ratio: 16 / 9;
  background: #1d2531;
}
.video > iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

/* still reach for the padding hack when: the browser must support
   something older, the element is a plain div you do not control,
   or you are pinning the height to 100% of a flex or grid parent
   and need the parent's height to come from the padding instead */`,
          },
          {
            type: 'tip',
            id: 'c-l120-t1',
            title: 'You still need a wrapper, even with aspect-ratio',
            body: '`aspect-ratio` gives the element a shape; it does not let an `<iframe>` fill its parent. Put the iframe inside a sized box and make the iframe `width: 100%; height: 100%`. That is the whole trick in modern CSS - and if the iframe has a default `border`, set `border: 0` or the frame is a couple of pixels off.',
          },
          {
            type: 'heading',
            id: 'c-l120-h3',
            level: 3,
            body: 'Cropping instead of letterboxing',
          },
          {
            type: 'code',
            id: 'c-l120-c3',
            language: 'css',
            title: 'object-fit: cover for a box the source does not match',
            code: `/* contain (the default for replaced elements): the whole source is
   visible and letterboxed, so the picture sits inside the box */
.thumb-contain { object-fit: contain; }

/* cover: the box is filled, and whatever does not fit is cropped
   off the edges. The right answer for a fixed-ratio card grid. */
.thumb-cover {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  /* move the crop window when the interesting part is not centred */
  object-position: 50% 30%;
}`,
          },
          {
            type: 'warning',
            id: 'c-l120-w1',
            title: 'object-fit does nothing without a set height',
            body: '`object-fit` only has an effect once the element has a box that differs from the source ratio. An `<img>` with `width: 100%` and no height is already exactly the right shape for its content, so `cover` silently changes nothing. Set an explicit `aspect-ratio` (or a height) on the element as well.',
          },
          {
            type: 'exercise',
            id: 'ex-l120-x1',
            exercise: {
              id: 'ex-l120',
              instructions:
                'Give the `.player` box below a 16:9 shape that follows the width of its container, and make the inner `.screen` fill that box completely.',
              languages: ['css'],
              starterCode: {
                html: '<div class="player">\n  <div class="screen">16:9 video would go here</div>\n</div>',
                css: '.player {\n  width: 100%;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n}\n.screen {\n  background: #1f6feb;\n  color: #ffffff;\n  font: 13px system-ui, sans-serif;\n  display: grid;\n  place-items: center;\n  height: 200px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l120-t1',
                  label: 'The player box has a 16:9 ratio',
                  body: 'return getComputedStyle(document.querySelector(".player")).aspectRatio.replace(/\\s/g, "") === "16/9"',
                },
                {
                  id: 'ex-l120-t2',
                  label: 'The rendered box is wider than it is tall, at about 1.5 to 1',
                  body: 'const r = document.querySelector(".player").getBoundingClientRect(); return r.height > 0 && Math.abs(r.width / r.height - 1.5) < 0.05',
                },
                {
                  id: 'ex-l120-t3',
                  label: 'The screen fills the whole player box',
                  body: 'const p = document.querySelector(".player").getBoundingClientRect(); const s = document.querySelector(".screen").getBoundingClientRect(); return Math.abs(s.width - p.width) < 2 && Math.abs(s.height - p.height) < 2',
                },
              ],
              hints: [
                'One declaration gives the box its shape; the child then fills it with width and height of 100%.',
                '`aspect-ratio` takes two numbers separated by a slash and does not need units.',
                '`.player { aspect-ratio: 16 / 9; }` and `.screen { width: 100%; height: 100%; }`',
              ],
              solution: {
                html: '<div class="player">\n  <div class="screen">16:9 video would go here</div>\n</div>',
                css: '.player {\n  width: 100%;\n  aspect-ratio: 16 / 9;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n}\n.screen {\n  background: #1f6feb;\n  color: #ffffff;\n  font: 13px system-ui, sans-serif;\n  display: grid;\n  place-items: center;\n  width: 100%;\n  height: 100%;\n}\n',
              },
              testNotes:
                'The first test reads the computed `aspect-ratio`, which the browser serialises without spaces as `16/9`. The second measures the rendered box, so it confirms the ratio is actually being applied rather than just declared. The third confirms the child fills the parent, which is the part `aspect-ratio` alone does not do.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s76',
    title: 'RWD Frameworks',
    description:
      'What a CSS framework actually gives you, a survey of Bootstrap, Tailwind and Foundation, and an honest judgement about when one is worth the dependency.',
    lessons: [
      {
        id: 'css-l121',
        title: 'RWD Frameworks',
        description:
          'What a framework really does for you - a grid, a breakpoint set and a set of defaults - plus when plain CSS Grid and custom properties is the better call.',
        duration: 7,
        xp: 45,
        objectives: [
          'Describe what a CSS framework actually provides, in three parts',
          'Summarise how Bootstrap, Tailwind and Foundation each approach responsive layout',
          'Decide when a framework helps and when it is overhead',
          'Build a small design token set with custom properties as the no-framework alternative',
        ],
        quiz: {
          id: 'quiz-css-l121',
          title: 'RWD Frameworks quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l121-q1',
              type: 'multiple-choice',
              prompt: 'What are the three things a CSS framework actually provides?',
              options: [
                'A grid, a breakpoint set, and a set of defaults',
                'A preprocessor, a bundler and a component compiler',
                'Accessibility testing, browser support and a CDN',
                'A design file export, a token sync and a documentation site',
              ],
              answer: 0,
              explanation: 'Every CSS framework is those three parts. Today the grid is the weakest of them, because `repeat(auto-fit, minmax(16rem, 1fr))` does the same job in one line with no library. The breakpoint set is worth having for consistency, and the defaults are where the real value and the real weight both live.',
            },
            {
              id: 'quiz-css-l121-q2',
              type: 'true-false',
              prompt: 'Tailwind is best described as a grid framework with a twelve-column grid and breakpoints at 576px, 768px and 992px.',
              answer: false,
              explanation: 'That is Bootstrap\'s breakpoint scale. Tailwind has no grid component of its own; its responsive story is breakpoint-prefixed utility classes at 640, 768, 1024, 1280 and 1536px. Its real contribution to responsive work is a constrained *scale* of values, so nobody invents a new spacing step per component.',
            },
            {
              id: 'quiz-css-l121-q3',
              type: 'blank',
              prompt: 'Name the one part of a CSS framework that has genuinely become less valuable since CSS Grid shipped.',
              answers: [
                'the grid',
                'grid',
                'the grid component',
                'grid system',
              ],
              explanation: 'A twelve-column grid with breakpoint helpers used to be the reason to install anything at all. `repeat(auto-fit, minmax(18rem, 1fr))` covers most of it with one declaration and no library, which is why every modern framework has quietly dropped or de-emphasised its own grid.',
            },
            {
              id: 'quiz-css-l121-q4',
              type: 'multiple-choice',
              prompt: 'Which is the strongest argument for owning a small token set instead of adopting a framework?',
              options: [
                'It renders faster, because there is less CSS to parse',
                'Nothing has to be upgraded or overridden, and the markup stays readable HTML',
                'Frameworks do not work on narrow screens',
                'Custom properties are the only way to use media queries',
              ],
              answer: 1,
              explanation: 'A framework ships decisions made for you, and every one you disagree with becomes CSS you have to fight, plus a class of markup that is not really HTML. A token layer you own has no upgrade path and no specificity wars. The speed argument is weak - both ship far more CSS than a small site needs.',
            },
            {
              id: 'quiz-css-l121-q5',
              type: 'identify-error',
              prompt: 'Which of these is not a reason to avoid a framework on a long-lived project?',
              code: '.card {\n  padding: 1.5rem;\n  border-radius: 0.5rem;\n  background: #fff;\n}\n/* the framework also styles .card */',
              options: [
                'Every default is a decision made for you, so disagreeing with one means fighting it',
                'Utility classes make the markup harder to read and review than a named rule',
                'Frameworks cannot be used without a build step',
                'The whole component set ships whether or not you use it',
              ],
              answer: 2,
              explanation: 'Frameworks work perfectly well from a plain stylesheet - Bootstrap and Foundation are built that way. The other three are genuine costs: defaults you must accept or override, a class of markup that is harder to review, and bundle weight for components you never render.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l121-b1',
            body: 'A CSS framework sounds like it saves you from writing CSS. It does not. What it saves you from is *making the same three decisions again on every project*, and the value of that depends entirely on whether those decisions would have been the same anyway.',
          },
          {
            type: 'demo',
            id: 'c-l121-d1',
            title: 'The three things a framework gives you, rebuilt in 20 lines',
            body: 'No framework here, and nothing to install. This is the whole of what a framework grid, a breakpoint set and a token set amount to: six custom properties for the spacing and colour scale, one grid helper, and two media queries. Everything a large framework does is this idea spread over a thousand files - plus components you probably do not use.',
            html: `<div class="rwd-fw">
  <div class="tokens">
    <span class="chip" data-token="--space-2">--space-2</span>
    <span class="chip" data-token="--space-3">--space-3</span>
    <span class="chip" data-token="--space-4">--space-4</span>
    <span class="chip" data-token="--brand">--brand</span>
    <span class="chip" data-token="--surface">--surface</span>
    <span class="chip" data-token="--ink">--ink</span>
  </div>
  <div class="grid">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
  </div>
  <p class="note">No media query above the breakpoint: the grid is fluid on its own. The query below only exists to show the kind of thing a framework gives you for free.</p>
</div>`,
            css: `.rwd-fw {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  /* 1. the token set: one scale for spacing, one for colour */
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --brand: #29e2bd;
  --surface: #1d2531;
  --line: #2a3441;
  --ink: #e8edf4;
}
.rwd-fw .tokens {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}
.rwd-fw .chip {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 0.15rem 0.45rem;
  font: 11px ui-monospace, Menlo, Consolas, monospace;
  color: var(--brand);
}
/* 2. the grid: fluid, no breakpoints */
.rwd-fw .grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: var(--space-3);
}
.rwd-fw .item {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: var(--space-3);
  text-align: center;
  color: var(--brand);
  font-weight: 600;
}
/* 3. the breakpoint set: pick a few and reuse them, that is the discipline */
.rwd-fw .note {
  margin: var(--space-3) 0 0;
  color: #9aa5b4;
  line-height: 1.5;
}
@media (min-width: 48rem) {
  .rwd-fw .note {
    color: var(--brand);
  }
}`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'c-l121-h1',
            level: 3,
            body: 'The three parts',
          },
          {
            type: 'list',
            id: 'c-l121-l1',
            style: 'bullet',
            items: [
              '**A grid.** A documented way to lay out columns, usually twelve or sixteen of them, with breakpoint-aware helpers. Today this is the least valuable part: `repeat(auto-fit, minmax(16rem, 1fr))` is one line and needs no library, which is why every modern framework has quietly dropped its own grid.',
              '**A breakpoint set.** A fixed list of agreed widths with named helpers attached. The value is real but small: the value is in *everyone using the same numbers*, not in the numbers themselves. Three custom properties give you the same discipline.',
              '**Defaults.** Reset rules, a type scale, form styling, buttons, cards, and a bundle of utility classes. This is where a framework genuinely earns its place, and also where it starts costing you: every default is a decision made for you, and any you disagree with becomes CSS you have to fight.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l121-h2',
            level: 3,
            body: 'A short survey',
          },
          {
            type: 'list',
            id: 'c-l121-l2',
            style: 'bullet',
            items: [
              '**Bootstrap** — the original: twelve-column grid, `.row` / `.col-md-6` helpers, a large set of components, `prefers-reduced-motion` respected, theming through CSS variables. Best when a team already knows it and a design needs its component set tomorrow. Its breakpoints are `sm 576px`, `md 768px`, `lg 992px`, `xl 1200px`, `xxl 1400px`.',
              '**Tailwind** — not a grid framework so much as a constrained way of writing CSS in your markup. Its responsive story is breakpoint-prefixed utility classes, with `sm:` through `2xl:` at 640, 768, 1024, 1280 and 1536px. Its real contribution to responsive work is a *scale*: because the spacing and breakpoint values come from a fixed set, nobody invents a new one per component.',
              '**Foundation** — Zurb\'s grid-first framework with a similar idea to Bootstrap but breakpoint-heavy and historically more responsive-by-default. Now maintained by the Open Foundation, and a reasonable choice if you need its XY grid or its form components.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l121-w1',
            title: 'The cost side of the ledger',
            body: 'A framework ships its whole component set whether or not you use it. You pay for it in bytes, in a build step, in a class of markup that is not HTML (so it is harder to read and harder for the next person to change), and in specificity wars the moment you want one component to look different. Utility frameworks push this further: `.text-sm .font-semibold .text-slate-300 .px-4 .py-2 .rounded-md` is harder to review than a rule with a name.',
          },
          {
            type: 'tip',
            id: 'c-l121-t1',
            title: 'Test the fit, not the features',
            body: 'The honest question is not "does this framework support what I need" - all three do - it is "would our team be faster on day one and day thirty?". Day one favours a framework. Day thirty favours a small, named set of tokens and layout helpers you own, because nothing has to be upgraded and nothing has to be overridden. On a small or long-lived project, that usually tips it.',
          },
          {
            type: 'example',
            id: 'c-l121-e1',
            title: 'The no-framework equivalent: tokens plus two helpers',
            body: 'A complete, offline token layer: six spacing values, five colours, a type scale in `clamp()`, one fluid grid helper and a `.container` that uses `min()`. Nothing is installed and nothing is fetched - this is the entire argument, rendered.',
            html: `<div class="shell">
  <p class="eyebrow">Section</p>
  <h3 class="title">A page shell in about twenty declarations</h3>
  <div class="cards">
    <div class="card"><h4>Grid</h4><p>Fluid, no breakpoints.</p></div>
    <div class="card"><h4>Type</h4><p>Fluid, no breakpoints.</p></div>
    <div class="card"><h4>Space</h4><p>One scale, reused.</p></div>
  </div>
</div>`,
            css: `.shell {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 1rem;
  --space-4: 2rem;
  --surface: #1d2531;
  --line: #2a3441;
  --ink: #e8edf4;
  --muted: #9aa5b4;
  --brand: #29e2bd;

  background: #141922;
  color: var(--ink);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  padding: var(--space-3);
}
.shell .eyebrow {
  margin: 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--brand);
}
.shell .title {
  margin: var(--space-1) 0 var(--space-3);
  font-size: clamp(1.1rem, 1rem + 0.6vw, 1.6rem);
  line-height: 1.2;
}
.shell .cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  gap: var(--space-2);
}
.shell .card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: var(--space-2);
}
.shell .card h4 {
  margin: 0 0 var(--space-1);
  font-size: 13px;
  color: var(--brand);
}
.shell .card p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'ex-l121-x1',
            exercise: {
              id: 'ex-l121',
              instructions:
                'Replace the framework-style layout with an owned one: give the wrapper a `--gap` custom property of `1rem`, use it for the grid\'s `gap`, and switch the track list to the responsive `repeat(auto-fit, minmax(9rem, 1fr))` form.',
              languages: ['css'],
              starterCode: {
                html: '<div class="panel">\n  <div class="row">One</div>\n  <div class="row">Two</div>\n  <div class="row">Three</div>\n</div>',
                css: '.panel {\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 1rem;\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.row {\n  background: #232c39;\n  border-radius: 4px;\n  padding: 0.5rem;\n  font: 13px system-ui, sans-serif;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l121-t1',
                  label: 'The panel defines a --gap custom property of 1rem',
                  body: 'const v = getComputedStyle(document.querySelector(".panel")).getPropertyValue("--gap").trim(); return v === "1rem" || Math.abs(parseFloat(v) - 16) < 0.5',
                },
                {
                  id: 'ex-l121-t2',
                  label: 'The grid gap actually comes from that variable',
                  body: 'return Math.abs(parseFloat(getComputedStyle(document.querySelector(".panel")).gap) - 16) < 0.5',
                },
                {
                  id: 'ex-l121-t3',
                  label: 'The track list is fluid, not a fixed count',
                  body: 'const t = getComputedStyle(document.querySelector(".panel")).gridTemplateColumns.trim().split(/\\s+/); return t.length >= 1 && t.every(x => x.endsWith("px"))',
                },
                {
                  id: 'ex-l121-t4',
                  label: 'No track is narrower than the 9rem (144px) floor',
                  body: 'const t = getComputedStyle(document.querySelector(".panel")).gridTemplateColumns.trim().split(/\\s+/); return t.every(x => parseFloat(x) >= 143)',
                },
              ],
              hints: [
                'Declare the property on the same rule: `--gap: 1rem;`',
                'A custom property is used with `var(--gap)`, inside another declaration.',
                '`.panel { --gap: 1rem; gap: var(--gap); grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr)); }`',
              ],
              solution: {
                html: '<div class="panel">\n  <div class="row">One</div>\n  <div class="row">Two</div>\n  <div class="row">Three</div>\n</div>',
                css: '.panel {\n  --gap: 1rem;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  padding: 1rem;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));\n  gap: var(--gap);\n}\n.row {\n  background: #232c39;\n  border-radius: 4px;\n  padding: 0.5rem;\n  font: 13px system-ui, sans-serif;\n}\n',
              },
              testNotes:
                'The first test reads the custom property with `getPropertyValue`, which returns the declared token (`1rem`) rather than a computed pixel value - the accepted `~16` covers a learner who writes `--gap: 16px` instead. The second reads the resolved `gap` in pixels. The last two read the resolved track list, whose count depends on the width of the exercise preview.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s77',
    title: 'RWD Templates',
    description:
      'Putting it all together: a page shell that is responsive with no media queries at all, the mobile first build order, and a checklist for reviewing at 320px.',
    lessons: [
      {
        id: 'css-l122',
        title: 'RWD Templates',
        description:
          'A complete responsive page shell with zero media queries - fluid type, a fluid grid and a container built with min() - plus the build order and the review checklist.',
        duration: 9,
        xp: 60,
        objectives: [
          'Build a page shell that reflows using no media queries at all',
          'Scale type fluidly with clamp() between a minimum and a maximum',
          'Constrain a container with min() so it never exceeds its parent',
          'Explain the mobile first build order',
          'Check a layout at 320px against a concrete list',
        ],
        quiz: {
          id: 'quiz-css-l122',
          title: 'RWD Templates quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l122-q1',
              type: 'multiple-choice',
              prompt: 'What does `width: min(100% - 2rem, 72rem)` give you on a container?',
              options: [
                'A fixed 72rem width on large screens that stops being fluid above that',
                'The smaller of the parent width minus the gutter, and 72rem - so it never overflows its parent and never grows unbounded',
                'A width that follows the viewport exactly, ignoring the parent',
                'An automatic fallback to 72rem if 100% is unsupported',
              ],
              answer: 1,
              explanation: '`min()` takes the smaller of its arguments, so the container is always `100% - 2rem` wide or less, and never more than 72rem. Add `margin-inline: auto` and it centres itself. That is a complete responsive container in one declaration.',
            },
            {
              id: 'quiz-css-l122-q2',
              type: 'true-false',
              prompt: 'Because a modern layout can use `clamp()`, `min()` and `auto-fit` grids, media queries are no longer needed for responsive design.',
              answer: false,
              explanation: 'They are needed whenever the *structure* has to change - a navigation becoming a menu, a table becoming cards, a form going from two columns to one. They are simply no longer needed for sizing, spacing and column count, which is where most of the old boilerplate went.',
            },
            {
              id: 'quiz-css-l122-q3',
              type: 'blank',
              prompt: 'In `minmax(min(9rem, 100%), 1fr)`, what does the inner `min()` protect against?',
              answers: [
                'a floor wider than a narrow screen',
                'track floor wider than the container',
                'overflow',
                'a min-width that is too large on narrow screens',
              ],
              explanation: 'A plain `9rem` floor is 144px, which is fine on a desktop and too wide on a 320px screen once the gutters are subtracted - the grid overflows. Wrapping the floor in `min(9rem, 100%)` means the track is never asked to be wider than its container, so the pattern is safe at every width.',
            },
            {
              id: 'quiz-css-l122-q4',
              type: 'identify-error',
              prompt: 'Which one of these is not part of the mobile first build order?',
              code: '1. viewport meta tag\n2. fluid foundations: min() container, clamp() type\n3. auto-fit grids and wrapping flex rows\n4. base rules for the 1280px desktop design\n5. structural breakpoints with min-width',
              options: [
                'Step 1 - the viewport tag must come after the CSS',
                'Step 2 - the container should use max-width, not min()',
                'Step 4 - you write the narrow layout as the unqueried base, not the desktop one',
                'Step 5 - breakpoints should use max-width in a mobile first build',
              ],
              answer: 2,
              explanation: 'Mobile first means the 320px layout is the unqueried base and each query adds as space appears, so nothing has to be reversed or undone. Step 4 has it backwards, which turns the build into a sequence of corrections rather than a series of additions.',
            },
            {
              id: 'quiz-css-l122-q5',
              type: 'multiple-choice',
              prompt: 'Which problem on the 320px checklist is not a fluid-sizing problem?',
              options: [
                'The page scrolls sideways because of a fixed-width element',
                'Body text runs to 900 characters per line on a wide monitor',
                'A heading stays at the same pixel size on a phone and a 27-inch monitor',
                'A tap target is 20 by 20 CSS pixels and hard to hit',
              ],
              answer: 3,
              explanation: 'Tap target size is a design decision, not a sizing one - nothing about `clamp()` or `min()` makes a small target larger. WCAG 2.2 asks for at least 24 by 24 CSS pixels, and 44 by 44 is the comfortable target, including the gaps between adjacent controls.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l122-b1',
            body: 'Here is the payoff of the block. Everything below is responsive and **there is not one media query in it**. Fluid type, a fluid grid, a fluid container, and a fluid gap between them, all from four modern features. Media queries are still a tool - but they are for changing structure, and this shell never needs to.',
          },
          {
            type: 'demo',
            id: 'c-l122-d1',
            title: 'A responsive shell with no media queries at all',
            body: 'Drag the window from wide to about 320px. The heading scales smoothly with `clamp()`, the container stops growing at 72rem because of `min(100% - 2rem, 72rem)`, the cards re-flow because of `auto-fit` and `minmax()`, and the padding between the edge and the content is itself fluid. At no point does the layout snap at a breakpoint - it just gets narrower.',
            html: `<div class="shell">
  <div class="inner">
    <header class="head">
      <span class="brand">Fluid</span>
      <nav class="nav">
        <a href="#">Work</a><a href="#">Notes</a><a href="#">About</a>
      </nav>
    </header>

    <h1 class="title">A layout that adapts without a single breakpoint</h1>
    <p class="lede">Clamp for the type, min() for the container, auto-fit for the grid. Everything else is ordinary CSS.</p>

    <div class="cards">
      <article class="card"><h3>clamp()</h3><p>A floor, a fluid middle and a ceiling, in one declaration.</p></article>
      <article class="card"><h3>min()</h3><p>The container takes the smaller of its parent and its own maximum.</p></article>
      <article class="card"><h3>auto-fit</h3><p>As many columns as fit, each never below its minimum.</p></article>
    </div>
  </div>
</div>`,
            css: `.shell {
  background: #141922;
  color: #e8edf4;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;

  --gutter: clamp(0.75rem, 3vw, 2rem);
  --surface: #1d2531;
  --line: #2a3441;
  --brand: #29e2bd;
}
/* never wider than the parent, never wider than 72rem, always a gutter */
.inner {
  width: min(100% - (var(--gutter) * 2), 72rem);
  margin-inline: auto;
}
.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding-block: 0.75rem;
  border-bottom: 1px solid var(--line);
}
.brand {
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}
.nav a {
  color: #9aa5b4;
  text-decoration: none;
  font-size: 12px;
}
/* fluid type: floor 1.5rem, ceiling 2.6rem, fluid middle between 320 and 1280 */
.title {
  margin: clamp(1rem, 4vw, 2.25rem) 0 0.5rem;
  font-size: clamp(1.5rem, 1rem + 2.6vw, 2.6rem);
  line-height: 1.15;
  letter-spacing: -0.015em;
}
.lede {
  margin: 0 0 clamp(1rem, 3vw, 1.75rem);
  max-width: 60ch;
  color: #9aa5b4;
  line-height: 1.6;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  gap: var(--gutter);
}
.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: clamp(0.75rem, 2vw, 1.25rem);
}
.card h3 {
  margin: 0 0 0.35rem;
  font-size: 14px;
  color: var(--brand);
}
.card p {
  margin: 0;
  color: #9aa5b4;
  line-height: 1.55;
}`,
            height: 430,
          },
          {
            type: 'heading',
            id: 'c-l122-h1',
            level: 3,
            body: 'The four features, and why each one is there',
          },
          {
            type: 'code',
            id: 'c-l122-c1',
            language: 'css',
            title: 'The template, reduced',
            code: `.inner {
  /* never wider than the parent, never wider than 72rem, and always
     leaves a gutter on both sides - one declaration, no breakpoint */
  width: min(100% - 2rem, 72rem);
  margin-inline: auto;
}

.title {
  /* clamp(MIN, FLUID, MAX): the fluid middle is what scales */
  font-size: clamp(1.5rem, 1rem + 2.6vw, 2.6rem);
  line-height: 1.15;
}

.cards {
  /* the min() inside minmax stops the floor from overflowing a very
     narrow screen, where 15rem would be wider than the viewport */
  grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));
  gap: clamp(0.75rem, 3vw, 2rem);
}

.lede {
  /* a measure in ch keeps lines readable on a wide monitor and on a phone */
  max-width: 60ch;
}`,
          },
          {
            type: 'list',
            id: 'c-l122-l1',
            style: 'bullet',
            items: [
              '**`min()` for the container.** `min(100% - 2rem, 72rem)` means "as wide as my parent allows, minus the gutter, but never more than 72rem". Add `margin-inline: auto` and the whole thing centres itself. No `.container` at each breakpoint.',
              '**`clamp()` for type.** Three numbers: the smallest acceptable size, a preferred size that scales with the viewport, and the largest. The middle term is usually `1rem + Xvw` so it can grow from the rem floor. Type that snaps between two sizes is worse than type that never changes, so this is a genuine improvement rather than a party trick.',
              '**`auto-fit` with `minmax()` for the grid.** The floor you choose *is* the breakpoint, as established in the grid lesson.',
              '**`min()` inside the `minmax()` floor.** `minmax(min(15rem, 100%), 1fr)` is the detail people miss: on a 320px screen a plain `15rem` floor is 240px of a 288px content box and the grid overflows. Wrapping the floor in `min(..., 100%)` makes the pattern safe at any width.',
              '**`max-width: 60ch` for prose.** Not responsive, but the one thing that makes long-form text readable. Line length is the reason a fluid full-width column of body text is worse than a fixed one.',
            ],
          },
          {
            type: 'example',
            id: 'c-l122-e1',
            title: 'The full shell: header, hero, grid, footer',
            body: 'The complete pattern end to end, still with no media queries. Notice the header wraps its navigation onto its own line by itself - `flex-wrap` doing the work a media query usually does. Every value that changes with the viewport is a `clamp()`, a `min()` or an `auto-fit` track.',
            html: `<div class="page">
  <header class="bar">
    <span class="logo">Meridian</span>
    <nav class="links"><a href="#">Docs</a><a href="#">Pricing</a><a href="#">Blog</a><a href="#">Sign in</a></nav>
  </header>

  <main class="main">
    <section class="hero">
      <p class="kicker">Release 2.4</p>
      <h1>Grid, type and space that all scale together</h1>
      <p class="sub">One custom property for the gutter drives the container padding, the grid gap and the card padding. Change it once and the whole page responds.</p>
      <div class="actions"><a class="btn" href="#">Get started</a><a class="btn ghost" href="#">Read the docs</a></div>
    </section>

    <section class="cards">
      <article><h4>Fluid type</h4><p>clamp() between a floor and a ceiling.</p></article>
      <article><h4>Fluid grid</h4><p>auto-fit tracks with a minmax() floor.</p></article>
      <article><h4>Fluid gutter</h4><p>min() so the container never exceeds its parent.</p></article>
      <article><h4>Fluid space</h4><p>One custom property, reused everywhere.</p></article>
    </section>
  </main>

  <footer class="foot">Meridian - built with clamp, min, auto-fit and no breakpoints.</footer>
</div>`,
            css: `.page {
  --gutter: clamp(0.75rem, 3vw, 2rem);
  --surface: #1d2531;
  --line: #2a3441;
  --ink: #e8edf4;
  --muted: #9aa5b4;
  --brand: #29e2bd;

  background: #141922;
  color: var(--ink);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 13px;
  min-height: 100%;
}
.page .bar,
.page .main,
.page .foot {
  width: min(100% - (var(--gutter) * 2), 64rem);
  margin-inline: auto;
}
.page .bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  padding-block: 0.7rem;
  border-bottom: 1px solid var(--line);
}
.page .logo {
  color: var(--brand);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.page .links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
}
.page .links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 12px;
}
.page .hero {
  padding-block: clamp(1rem, 4vw, 2.5rem);
}
.page .kicker {
  margin: 0 0 0.4rem;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brand);
}
.page h1 {
  margin: 0 0 0.6rem;
  font-size: clamp(1.5rem, 1rem + 2.4vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: -0.015em;
}
.page .sub {
  margin: 0;
  max-width: 58ch;
  color: var(--muted);
  line-height: 1.6;
}
.page .actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gutter);
  margin-top: 1.1rem;
}
.page .btn {
  display: inline-block;
  padding: 0.5rem 0.95rem;
  border-radius: 6px;
  background: var(--brand);
  color: #0b0d10;
  font-weight: 600;
  font-size: 12px;
  text-decoration: none;
}
.page .btn.ghost {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--muted);
}
.page .cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(13rem, 100%), 1fr));
  gap: var(--gutter);
  padding-bottom: clamp(1rem, 3vw, 2rem);
}
.page .cards article {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: clamp(0.75rem, 2vw, 1.15rem);
}
.page .cards h4 {
  margin: 0 0 0.3rem;
  font-size: 13px;
  color: var(--brand);
}
.page .cards p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}
.page .foot {
  border-top: 1px solid var(--line);
  padding-block: 0.8rem;
  color: var(--muted);
  font-size: 11px;
}`,
            showPreview: true,
          },
          {
            type: 'heading',
            id: 'c-l122-h2',
            level: 3,
            body: 'The build order',
          },
          {
            type: 'list',
            id: 'c-l122-l2',
            style: 'ordered',
            items: [
              '**The viewport tag, first, before any CSS.** One line in the `<head>`. Nothing else works on a phone without it.',
              '**The narrow design, unqueried.** Write the base rules as the 320px layout. Get it readable, in order, with a sane measure - before you think about wide screens.',
              '**Fluid foundations.** Container with `min()`, type with `clamp()`, spacing with a scale of custom properties. Now the layout is already responsive everywhere; everything below is refinement.',
              '**Layout with `auto-fit` grids and wrapping flex rows.** Not one breakpoint yet. This is where most responsive work has become unnecessary.',
              '**Structural breakpoints, last, and only where the structure must change.** A navigation that needs to become a menu, a two-column form that must become one, a table that must become cards. Two or three of them, at content-derived widths, written with `min-width`.',
              '**Then check at 320px, 768px and a wide window**, with the content you actually have - not with lorem ipsum.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l122-t1',
            title: 'Put the gutter in one custom property',
            body: 'If the container padding, the grid gap and the card padding are three separate literals, they will drift apart the first time somebody changes one of them. Define `--gutter: clamp(0.75rem, 3vw, 2rem)` once and use it everywhere. The demo above does exactly this, and the whole page is one value away from being re-tuned.',
          },
          {
            type: 'heading',
            id: 'c-l122-h3',
            level: 3,
            body: 'The 320px checklist',
          },
          {
            type: 'list',
            id: 'c-l122-l3',
            style: 'bullet',
            items: [
              'Does the page scroll sideways at all? If yes, something has a fixed width or a `min-width` that is too large. Find it with `document.documentElement.scrollWidth` versus `clientWidth`.',
              'Is any line of body text shorter than about 45 characters or longer than 80? Both are hard to read.',
              'Does every tap target clear 44 by 44 CSS pixels? Include the gaps between them, not just the element.',
              'Does the navigation still reach everything, or has it wrapped into three rows?',
              'Do any images, tables, code blocks or long unbreakable strings overflow? `overflow-wrap: anywhere` on prose handles the last one.',
              'Is the type still readable at the `clamp()` floor? Check the smallest size, not the one you can see in your own window.',
              'Does everything still work at 200% browser zoom, which is a WCAG requirement and also a useful stress test?',
            ],
          },
          {
            type: 'warning',
            id: 'c-l122-w1',
            title: 'Fluid is not the finish line',
            body: 'A layout can be perfectly fluid and still unusable: 900px-wide lines of body text, tap targets a few pixels high, a fixed header covering content. Fluid sizing solves overflow, nothing else. Every item in the checklist above is a decision you still have to make, and the checklist is why - you cannot see any of it by looking at your own 27-inch monitor.',
          },
          {
            type: 'exercise',
            id: 'ex-l122-x1',
            exercise: {
              id: 'ex-l122',
              instructions:
                'Make the shell below fully fluid with no media query: constrain the container with `min()` so it never exceeds `48rem` while always leaving a `1rem` gutter, and lay the three panels out with a responsive `auto-fit` grid whose track floor cannot overflow a narrow screen.',
              languages: ['css'],
              starterCode: {
                html: '<div class="outer">\n  <div class="shell">\n    <h3 class="title">A fluid shell</h3>\n    <div class="panels">\n      <div class="panel">One</div>\n      <div class="panel">Two</div>\n      <div class="panel">Three</div>\n    </div>\n  </div>\n</div>',
                css: '.outer {\n  background: #141922;\n  padding: 0.5rem;\n}\n.shell {\n  width: 900px;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  border-radius: 6px;\n  padding: 1rem;\n}\n.title {\n  margin: 0 0 0.6rem;\n  font: 600 14px system-ui, sans-serif;\n  color: #29e2bd;\n}\n.panels {\n  display: grid;\n  grid-template-columns: repeat(3, 200px);\n  gap: 8px;\n}\n.panel {\n  background: #232c39;\n  border-radius: 4px;\n  padding: 0.5rem;\n  font: 13px system-ui, sans-serif;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l122-t1',
                  label: 'The container width is not a fixed pixel value',
                  body: 'const s = getComputedStyle(document.querySelector(".shell")).width; return s !== "900px" && s !== "920px"',
                },
                {
                  id: 'ex-l122-t2',
                  label: 'The container is narrower than its parent, leaving room for the gutter',
                  body: 'const a = document.querySelector(".shell"); const b = a.parentElement; return b.getBoundingClientRect().width - a.getBoundingClientRect().width >= 8',
                },
                {
                  id: 'ex-l122-t3',
                  label: 'The container is capped at 48rem (768px)',
                  body: 'return document.querySelector(".shell").getBoundingClientRect().width <= 768',
                },
                {
                  id: 'ex-l122-t4',
                  label: 'The panel grid resolves to real tracks, none below 120px',
                  body: 'const t = getComputedStyle(document.querySelector(".panels")).gridTemplateColumns.trim().split(/\\s+/); return t.length >= 1 && t.every(x => x.endsWith("px") && parseFloat(x) >= 119)',
                },
              ],
              hints: [
                'The container needs `width: min(100% - 1rem, 48rem)` and `margin-inline: auto`.',
                'For the grid, `repeat(auto-fit, minmax(min(9rem, 100%), 1fr))` gives you a floor that cannot overflow a narrow screen.',
                '`min()` nested inside `minmax()` is the detail that makes the floor safe at 320px.',
              ],
              solution: {
                html: '<div class="outer">\n  <div class="shell">\n    <h3 class="title">A fluid shell</h3>\n    <div class="panels">\n      <div class="panel">One</div>\n      <div class="panel">Two</div>\n      <div class="panel">Three</div>\n    </div>\n  </div>\n</div>',
                css: '.outer {\n  background: #141922;\n  padding: 0.5rem;\n}\n.shell {\n  width: min(100% - 1rem, 48rem);\n  margin-inline: auto;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  border-radius: 6px;\n  padding: 1rem;\n}\n.title {\n  margin: 0 0 0.6rem;\n  font: 600 14px system-ui, sans-serif;\n  color: #29e2bd;\n}\n.panels {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(min(9rem, 100%), 1fr));\n  gap: 8px;\n}\n.panel {\n  background: #232c39;\n  border-radius: 4px;\n  padding: 0.5rem;\n  font: 13px system-ui, sans-serif;\n}\n',
              },
              testNotes:
                'All four tests measure rendered geometry, so they pass in any viewport - there is deliberately no media query in this exercise. The second test allows at least 8px of slack for the 1rem gutter and the parent\'s own 0.5rem padding. The fourth reads the resolved track list; how many tracks there are depends on the width of the exercise preview, so the test asserts validity and the 9rem floor rather than a count.',
            },
          },
        ],
      },
    ],
  },
]