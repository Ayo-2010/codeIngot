import type { Section } from '~/types/content'

export const htmlGraphicsSections: Section[] = [
  {
    id: 'html-s53',
    title: 'HTML Canvas',
    description: 'A drawing surface, a 2D context, and the resize problem that catches everybody.',
    lessons: [
      {
        id: 'html-l64',
        title: 'HTML Canvas',
        description: 'The canvas element, getContext, the drawing model, and sizing for a high-density screen.',
        duration: 7,
        objectives: [
          'Get a 2D context and draw shapes and text onto a canvas',
          'Explain why canvas is invisible to assistive technology and what to do about it',
          'Size a canvas for a device pixel ratio without blurring it',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l64',
          title: 'HTML Canvas quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l64-q1',
              type: 'multiple-choice',
              prompt: 'What happens when you set the width or height attribute of a canvas?',
              options: [
                'Nothing',
                'The canvas is resized and everything drawn on it is cleared',
                'Only the visible part is cleared',
                'The context is recreated',
              ],
              answer: 1,
              explanation: 'Resizing replaces the drawing buffer, so any transform you had set is also gone.',
            },
            {
              id: 'quiz-html-l64-q2',
              type: 'true-false',
              prompt: 'Content inside the canvas tags is read by a screen reader as a description of the drawing.',
              answer: false,
              explanation: 'It is a fallback for browsers that cannot render canvas. A text alternative has to be provided separately.',
            },
            {
              id: 'quiz-html-l64-q3',
              type: 'multiple-choice',
              prompt: 'Why scale the drawing buffer by the device pixel ratio?',
              options: [
                'To make the canvas larger on the page',
                'So the drawing uses as many physical pixels as the screen has, and is not blurry',
                'To reduce memory use',
                'To make animations smoother',
              ],
              answer: 1,
              explanation: 'A buffer sized in CSS pixels is stretched across more physical pixels on a retina display, which is what produces the blur.',
            },
            {
              id: 'quiz-html-l64-q4',
              type: 'blank',
              prompt: 'Which pair of methods saves and restores the canvas drawing state?',
              answers: [
                'save and restore',
                'ctx.save() and ctx.restore()',
                'save/restore',
              ],
              explanation: 'They push and pop fillStyle, lineWidth, font, transform and the clipping region together.',
            },
            {
              id: 'quiz-html-l64-q5',
              type: 'multiple-choice',
              prompt: 'When is SVG a better choice than canvas?',
              options: [
                'For thousands of moving sprites',
                'For a chart or icon that should scale, be styled by CSS, and be inspectable',
                'For anything drawn per frame',
                'Never — canvas is always more modern',
              ],
              answer: 1,
              explanation: 'SVG keeps every shape as an element. Canvas has no object model, no CSS and no accessibility.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l64-b1',
            body: 'A `<canvas>` is a rectangular drawing surface. It has no content of its own — the fallback inside the tags is what a browser shows when it cannot render canvas, and that is the only content the element has. Everything drawn on it is drawn by script through a context object obtained from `getContext`. The canvas knows nothing about what is on it, which is the single most important thing to remember about it.',
          },
          {
            type: 'demo',
            id: 'c-l64-d1',
            title: 'The drawing model in one script',
            body: 'The canvas below is drawn entirely by script: a filled rectangle, a stroked circle, a line, and some text. The fallback text inside the canvas tags is what appears if scripting is off.',
            html: `<canvas id="c" width="420" height="180" role="img" aria-label="A blue rectangle, an orange circle, a green line and the words Drawn with canvas">
  Your browser does not support canvas. This is the fallback content.
</canvas>

<script>
  const c = document.getElementById('c');
  const ctx = c.getContext('2d');

  ctx.fillStyle = '#1d4ed8';
  ctx.fillRect(20, 20, 140, 70);

  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(250, 55, 35, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#16a34a';
  ctx.beginPath();
  ctx.moveTo(310, 130);
  ctx.lineTo(400, 20);
  ctx.stroke();

  ctx.fillStyle = '#0f172a';
  ctx.font = '16px system-ui, sans-serif';
  ctx.fillText('Drawn with canvas', 20, 160);
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
canvas { max-width: 100%; border: 1px dashed #cbd5e1; border-radius: 6px; }`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'c-l64-h1',
            level: 3,
            body: 'Sizing for a high-density screen',
          },
          {
            type: 'code',
            id: 'c-l64-c1',
            language: 'plaintext',
            title: 'The resize pattern',
            code: `function fit(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // the drawing buffer gets more pixels…
  canvas.width  = Math.round(rect.width  * dpr);
  canvas.height = Math.round(rect.height * dpr);

  // …and the context is scaled so your drawing code uses CSS pixels
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return ctx;
}

const ctx = fit(canvas);
ctx.fillRect(10, 10, 100, 50);   // 100 CSS pixels, sharp on any screen

// redraw on resize, because resizing the buffer clears it
window.addEventListener('resize', () => draw(fit(canvas)));

// and if a transform is used elsewhere, it is on the state stack
ctx.save();
ctx.translate(50, 50);
ctx.rotate(Math.PI / 12);
ctx.restore();      // restores the transform, fillStyle, lineWidth and more`,
          },
          {
            type: 'list',
            id: 'c-l64-l1',
            style: 'bullet',
            items: [
              'The canvas has a drawing buffer sized by its width and height attributes, and a CSS size that may be different.',
              'Setting width or height clears the canvas, including any transform you had set.',
              'The context is a state machine: fillStyle, strokeStyle, lineWidth, font, transform and the clipping region all persist until you change them.',
              '`save()` and `restore()` push and pop that state, and they are how you avoid leaking settings between draws.',
              'A path is built with moveTo, lineTo, arc, bezierCurveTo and closePath, and is only painted when you call fill or stroke.',
              '`getContext("2d")` returns null if the context is already taken with a different type.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l64-w1',
            title: 'Canvas is invisible to a screen reader',
            body: 'A screen reader sees an empty box. The content inside the tags is a fallback for browsers without canvas, not a description, and it is not read once the canvas works. Anything a canvas conveys that matters — a chart, a diagram, a drawing — needs a text alternative beside it, and the canvas itself needs `role="img"` and an `aria-label` at minimum.',
          },
          {
            type: 'tip',
            id: 'c-l64-t1',
            title: 'Canvas or SVG?',
            body: 'Canvas draws many things fast and gives you no object model: no element per shape, no CSS, no accessibility, and nothing to inspect in the DOM. SVG keeps every shape as an element, scales to any size, styles with CSS, and is inspectable. Use canvas for thousands of moving things and SVG for everything else.',
          },
          {
            type: 'exercise',
            id: 'c-l64-x1',
            exercise: {
              id: 'ex-l64',
              instructions:
                'Draw a filled rectangle and a labelled stroke on a canvas, give the canvas an accessible name, and scale the drawing buffer for the device pixel ratio.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<canvas id="c" width="300" height="150"></canvas>\n',
                javascript: "const c = document.getElementById('c');\nconst ctx = c.getContext('2d');\n",
              },
              tests: [
                {
                  id: 'ex-l64-t1',
                  label: 'The canvas has an accessible name',
                  body:
                    'const c = document.querySelector("canvas"); return (c.getAttribute("aria-label") || "").trim().length > 5',
                },
                {
                  id: 'ex-l64-t2',
                  label: 'The canvas has a 2D context',
                  body: 'return !!document.querySelector("canvas").getContext("2d")',
                },
                {
                  id: 'ex-l64-t3',
                  label: 'The drawing buffer is at least as large as the CSS size',
                  body:
                    'const c = document.querySelector("canvas"); const r = c.getBoundingClientRect(); return c.width >= Math.round(r.width) && c.height >= Math.round(r.height)',
                },
                {
                  id: 'ex-l64-t4',
                  label: 'The buffer accounts for the device pixel ratio',
                  body:
                    'const c = document.querySelector("canvas"); const dpr = window.devicePixelRatio || 1; const r = c.getBoundingClientRect(); return c.width >= Math.round(r.width * dpr) - 1',
                },
                {
                  id: 'ex-l64-t5',
                  label: 'The canvas has fallback content inside its tags',
                  body:
                    'return document.querySelector("canvas").textContent.trim().length > 10',
                },
              ],
              hints: [
                'Multiplying the CSS size by window.devicePixelRatio and then scaling the context is what makes the drawing sharp.',
                'The text inside the canvas tags is the fallback, and it needs to say something useful.',
              ],
              solution: {
                html:
                  '<canvas id="c" width="300" height="150" role="img" aria-label="A blue rectangle with the words Hello canvas drawn beside it">\n  This chart requires JavaScript. The figures are in the table below.\n</canvas>\n',
                javascript:
                  "const c = document.getElementById('c');\nconst dpr = window.devicePixelRatio || 1;\nconst r = c.getBoundingClientRect();\nc.width = Math.round(r.width * dpr);\nc.height = Math.round(r.height * dpr);\nconst ctx = c.getContext('2d');\nctx.setTransform(dpr, 0, 0, dpr, 0, 0);\nctx.fillStyle = '#1d4ed8';\nctx.fillRect(20, 20, 120, 60);\nctx.fillStyle = '#0f172a';\nctx.font = '16px system-ui, sans-serif';\nctx.fillText('Hello canvas', 20, 110);\n",
              },
              testNotes:
                'The fourth test is the density assertion. A buffer set to the CSS size renders soft on any screen with a pixel ratio above 1.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s54',
    title: 'HTML SVG',
    description: 'Scalable Vector Graphics as an element, and how inline SVG differs from a file.',
    lessons: [
      {
        id: 'html-l65',
        title: 'HTML SVG',
        description: 'The svg element, viewBox, paths, and what inline SVG makes possible that an image file does not.',
        duration: 6,
        objectives: [
          'Write an inline SVG with a viewBox that scales to its container',
          'Use currentColor so an icon inherits the text colour',
          'Explain what an SVG file offers that inline SVG does not, and the reverse',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l65',
          title: 'HTML SVG quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l65-q1',
              type: 'multiple-choice',
              prompt: 'What does the viewBox attribute do?',
              options: [
                'Sets the size the SVG renders at',
                'Declares the internal coordinate system, which is what makes the drawing scale',
                'Sets the background colour',
                'Defines an animation',
              ],
              answer: 1,
              explanation: 'viewBox maps the internal coordinates onto whatever size the element ends up, which is what makes an SVG resolution independent.',
            },
            {
              id: 'quiz-html-l65-q2',
              type: 'true-false',
              prompt: 'Filling a shape with currentColor makes it inherit the CSS color of its parent.',
              answer: true,
              explanation: 'That is the standard way to build an icon that works on a light and a dark background without a second file.',
            },
            {
              id: 'quiz-html-l65-q3',
              type: 'multiple-choice',
              prompt: 'How do you hide a decorative inline SVG from assistive technology?',
              options: [
                'Give it an empty aria-label',
                'aria-hidden="true" and focusable="false"',
                'Set display: none',
                'Remove its role',
              ],
              answer: 1,
              explanation: 'aria-hidden removes it from the accessibility tree, and focusable="false" stops older engines making it focusable.',
            },
            {
              id: 'quiz-html-l65-q4',
              type: 'blank',
              prompt: 'Which element draws an arbitrary shape from path data?',
              answers: [
                'path',
                '<path>',
                'the path element',
              ],
              explanation: 'path is the general-purpose shape; the others are shortcuts for common geometry.',
            },
            {
              id: 'quiz-html-l65-q5',
              type: 'multiple-choice',
              prompt: 'Which is an advantage of an SVG file over inline SVG?',
              options: [
                'It can be styled by the page CSS',
                'It can be cached and reused without repeating the markup',
                'It inherits currentColor',
                'It can be animated with CSS',
              ],
              answer: 1,
              explanation: 'An SVG file is a separate resource, so it caches. The other three are all things only inline SVG can do.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l65-b1',
            body: 'SVG is a graphics format built on XML, and it has been part of HTML since 2010. As an element, `<svg>` sits in the flow of the document like any other, and its children are shapes: `rect`, `circle`, `line`, `path`, `text`, `polygon`. The important attribute is `viewBox`, which declares the coordinate system the shapes are drawn in and lets the whole thing scale to whatever size the container gives it.',
          },
          {
            type: 'demo',
            id: 'c-l65-d1',
            title: 'An inline SVG that scales and inherits colour',
            body: 'The two icons below use the same markup except for the path data. Both fill with currentColor, so they take the colour of the text around them, and both scale to their container because of the viewBox.',
            html: `<p style="color: #1d4ed8;">
  An icon that inherits the text colour:
  <svg class="icon" viewBox="0 0 24 24" role="img" aria-label="Warning">
    <path fill="currentColor" d="M12 2 1 21h22L12 2zm0 6 7.5 12h-15L12 8zm-1 3v5h2v-5h-2zm0 6v2h2v-2h-2z"/>
  </svg>
</p>

<p style="color: #16a34a;">
  And another, at a different size, with the same approach:
  <svg class="icon big" viewBox="0 0 24 24" role="img" aria-label="Passed">
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
  </svg>
</p>

<style>
  .icon { width: 1em; height: 1em; vertical-align: -0.125em; }
  .big { width: 2em; height: 2em; }
</style>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }`,
            height: 180,
          },
          {
            type: 'code',
            id: 'c-l65-c1',
            language: 'html',
            title: 'The inline SVG essentials',
            code: `<!-- a scalable icon: no width or height, just a viewBox -->
<svg class="icon" viewBox="0 0 24 24" role="img" aria-label="Close">
  <path fill="currentColor" d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/>
</svg>

<!-- decorative: no accessible name, and hidden from assistive technology -->
<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/>
</svg>

<!-- and when the icon is the only content of a link, name the link, not the icon -->
<a href="/close" aria-label="Close">
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/>
  </svg>
</a>

<!-- the shape elements -->
<svg viewBox="0 0 100 60" width="200" height="120">
  <rect x="0" y="0" width="40" height="30" fill="#1d4ed8" rx="4"/>
  <circle cx="60" cy="15" r="14" fill="#ea580c"/>
  <line x1="0" y1="45" x2="100" y2="45" stroke="#16a34a" stroke-width="2"/>
  <polygon points="10,58 20,42 30,58" fill="#7c3aed"/>
  <text x="40" y="50" font-size="10" fill="#0f172a">Label</text>
</svg>

<!-- and an external file, which cannot be styled from the page -->
<img src="/icons/logo.svg" alt="The company logo" width="120" height="32">`,
          },
          {
            type: 'list',
              id: 'c-l65-l1',
            style: 'bullet',
            items: [
              '`viewBox` — the internal coordinate system. Without it the drawing does not scale.',
              '`width` and `height` — the layout size. Omit both and CSS controls it entirely.',
              '`preserveAspectRatio` — how to fit a non-matching ratio. `xMidYMid meet` is the default.',
              '`currentColor` — fill with it and the shape inherits the CSS `color` of its parent.',
              '`role="img"` plus `aria-label` — names a meaningful graphic.',
              '`aria-hidden="true"` plus `focusable="false"` — removes a decorative one entirely.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l65-t1',
            title: 'Inline SVG or an SVG file?',
            body: 'Inline SVG can be styled and animated by the page\'s CSS and can inherit colour, which an `<img src="icon.svg">` cannot do at all. An SVG file can be cached, referenced from several places, and kept out of the HTML. A UI icon belongs inline; a logo or an illustration belongs in a file.',
          },
          {
            type: 'warning',
            id: 'c-l65-w1',
            title: 'Inline SVG is styleable from the page, and that is a hazard',
            body: 'An icon inlined into a component inherits every global rule that happens to match it, including a `path { fill: red }` written by someone else. Scoping with a class, or using `currentColor` for every fill, keeps the icon looking like itself on every page it lands on.',
          },
          {
            type: 'exercise',
            id: 'c-l65-x1',
            exercise: {
              id: 'ex-l65',
              instructions:
                'Create an inline SVG icon that scales with its container through a viewBox and takes its colour from the surrounding text via currentColor.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<p class="label">\n  \n</p>\n',
                css: '.label {\n  color: ;\n}\n\n.icon {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l65-t1',
                  label: 'There is an inline svg element',
                  body: 'return !!document.querySelector("svg")',
                },
                {
                  id: 'ex-l65-t2',
                  label: 'The svg has a viewBox',
                  body:
                    'return /^\\s*[-\\d.]+\\s+[-\\d.]+\\s+[-\\d.]+\\s+[-\\d.]+\\s*$/.test(document.querySelector("svg").getAttribute("viewBox") || "")',
                },
                {
                  id: 'ex-l65-t3',
                  label: 'The svg has no fixed width and height attributes',
                  body:
                    'const s = document.querySelector("svg"); return !s.hasAttribute("width") && !s.hasAttribute("height")',
                },
                {
                  id: 'ex-l65-t4',
                  label: 'A shape inside the svg fills with currentColor',
                  body:
                    'return /currentColor/.test(document.querySelector("svg").innerHTML)',
                },
                {
                  id: 'ex-l65-t5',
                  label: 'The svg is sized in relative units so it scales with the text',
                  body:
                    'const s = getComputedStyle(document.querySelector("svg")); return /^(1em|1rem|1\\.\\d+em|\\d+%)$/.test(s.width) || /^(1em|1rem|1\\.\\d+em|\\d+%)$/.test(s.height)',
                },
              ],
              hints: [
                'The viewBox is four numbers: min-x, min-y, width and height, separated by spaces.',
                'Omitting width and height lets CSS size the element, which is what makes it responsive.',
              ],
              solution: {
                html:
                  '<p class="label">\n  Saved\n  <svg class="icon" viewBox="0 0 24 24" role="img" aria-label="Saved">\n    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>\n  </svg>\n</p>\n',
                css:
                  '.label {\n  color: #16a34a;\n}\n\n.icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.125em;\n}\n',
              },
              testNotes:
                'The last test checks that the size is relative. A fixed pixel size on the svg is the usual reason an icon refuses to line up with the text beside it.',
            },
          },
        ],
      },
    ],
  },
]

export const htmlMediaSections: Section[] = [
  {
    id: 'html-s55',
    title: 'HTML Media',
    description: 'Video and audio elements, the formats that work, and the attributes that matter.',
    lessons: [
      {
        id: 'html-l66',
        title: 'HTML Media',
        description: 'The video and audio elements, multiple sources, and why controls are not optional.',
        duration: 6,
        objectives: [
          'Embed a video with several sources and a working fallback',
          'Explain why the controls attribute is not optional',
          'Say which formats work without a plugin',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l66',
          title: 'HTML Media quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l66-q1',
              type: 'multiple-choice',
              prompt: 'What happens to a video element without the controls attribute?',
              options: [
                'It plays automatically',
                'It has no interface, which makes it unusable and sometimes unplayable',
                'It plays muted',
                'It loads the poster instead',
              ],
              answer: 1,
              explanation: 'The controls attribute provides the entire player interface. Without it the user has no way to act.',
            },
            {
              id: 'quiz-html-l66-q2',
              type: 'true-false',
              prompt: 'A browser will autoplay a video with sound.',
              answer: false,
              explanation: 'Autoplay is only permitted for muted video without an audio track, and only if the user has not disabled it.',
            },
            {
              id: 'quiz-html-l66-q3',
              type: 'multiple-choice',
              prompt: 'Which formats play without a plugin?',
              options: [
                'Only MP4',
                'MP4 and WebM for video; MP3, WAV and Ogg for audio',
                'AVI and MOV only',
                'Any format, the browser downloads a codec',
              ],
              answer: 1,
              explanation: 'These are the formats browsers ship decoders for. Anything else needs a plugin or transcoding.',
            },
            {
              id: 'quiz-html-l66-q4',
              type: 'blank',
              prompt: 'Which attribute shows a still frame before playback starts?',
              answers: [
                'poster',
                'poster=',
              ],
              explanation: 'The poster is replaced by the first frame as soon as playback begins.',
            },
            {
              id: 'quiz-html-l66-q5',
              type: 'multiple-choice',
              prompt: 'Why offer more than one source?',
              options: [
                'To increase the file size',
                'So the browser can pick a format it can decode',
                'Because one source is invalid',
                'To enable autoplay',
              ],
              answer: 1,
              explanation: 'The browser walks the sources in order and takes the first type it says it can display.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l66-b1',
            body: 'The `<video>` and `<audio>` elements play media natively. Both take a `src` attribute or a set of `<source>` children, and both need the `controls` attribute — without it the player has no interface at all, which makes the media unusable and, on some platforms, unplayable. The formats that work without a plugin are MP4 and WebM for video, and MP3, WAV and Ogg for audio.',
          },
          {
            type: 'demo',
            id: 'c-l66-d1',
            title: 'A video with two sources and an audio track',
            body: 'The video offers two formats and the browser takes the first it can play. The poster frame appears before playback starts, which saves the user a black rectangle. The audio element below has its own controls.',
            html: `<video controls width="420" poster="https://picsum.photos/id/1067/420/236"
       preload="metadata">
  <source src="/media/tour.mp4" type="video/mp4">
  <source src="/media/tour.webm" type="video/webm">
  Your browser cannot play this video.
  <a href="/media/tour.mp4">Download the MP4</a> instead.
</video>

<audio controls preload="none">
  <source src="/media/interview.mp3" type="audio/mpeg">
  <source src="/media/interview.ogg" type="audio/ogg">
  <a href="/media/interview.mp3">Download the audio</a>
</audio>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
video { max-width: 100%; border-radius: 8px; background: #0f172a; display: block; }
audio { margin-top: 0.75rem; width: 100%; }`,
            height: 330,
          },
          {
            type: 'code',
            id: 'c-l66-c1',
            language: 'html',
            title: 'The attributes that matter',
            code: `<!-- the full set, in the order they usually appear -->
<video
  controls                       <!-- without this there is no interface -->
  width="640"                     <!-- the layout size, to avoid a jump -->
  height="360"
  poster="/media/poster.jpg"       <!-- the frame shown before playback -->
  preload="metadata"              <!-- none | metadata | auto -->
  playsinline                     <!-- plays in place on a phone, not fullscreen -->
  muted                           <!-- autoplay requires muted -->
  loop
  crossorigin="anonymous"
  aria-label="A two minute tour of the workshop">
  <source src="/media/tour.webm" type="video/webm">
  <source src="/media/tour.mp4"  type="video/mp4">
  <track src="/media/tour.en.vtt" srclang="en" label="English" kind="captions" default>
  <p>Your browser cannot play this video.
     <a href="/media/tour.mp4">Download the MP4</a> instead.</p>
</video>

<!-- the same set on audio, minus the picture-related ones -->
<audio controls preload="metadata" src="/media/interview.mp3"></audio>

<!-- and the text tracks -->
<track kind="subtitles"    srclang="es" label="Español"     src="/media/es.vtt">
<track kind="captions"     srclang="en" label="English"     src="/media/en.vtt" default>
<track kind="descriptions" srclang="en" label="Audio description" src="/media/desc.vtt">
<track kind="chapters"     srclang="en" label="Chapters"    src="/media/ch.vtt">
<track kind="metadata"     src="/media/meta.vtt">`,
          },
          {
            type: 'tip',
            id: 'c-l66-t1',
            title: 'Autoplay is a last resort',
            body: 'A browser will autoplay only a muted, non-audio video, and even then the user may have turned autoplay off entirely. Anything with sound needs an explicit play action from the user. Design for the play button being pressed rather than assuming it will not be.',
          },
          {
            type: 'warning',
            id: 'c-l66-w1',
            title: 'Captions are not optional',
            body: 'A video without captions excludes anyone who cannot hear it, and in a great many jurisdictions that is a legal requirement rather than a courtesy. The `track` element is the mechanism, and the WebVTT file has to be timed properly — auto-generated captions from a speech model are a starting point, not a finished file.',
          },
          {
            type: 'exercise',
            id: 'c-l66-x1',
            exercise: {
              id: 'ex-l66',
              instructions:
                'Embed a video with the controls attribute, at least two sources, a poster, and a captions track in a track element.',
              languages: ['html'],
              starterCode: {
                html: '<video>\n  \n</video>\n',
              },
              tests: [
                {
                  id: 'ex-l66-t1',
                  label: 'The video has the controls attribute',
                  body: 'return document.querySelector("video").hasAttribute("controls")',
                },
                {
                  id: 'ex-l66-t2',
                  label: 'There are at least two source elements',
                  body: 'return document.querySelectorAll("video source").length >= 2',
                },
                {
                  id: 'ex-l66-t3',
                  label: 'Every source declares a type',
                  body:
                    'return Array.from(document.querySelectorAll("video source")).every(s => !!s.getAttribute("type"))',
                },
                {
                  id: 'ex-l66-t4',
                  label: 'The video has a poster',
                  body: 'return !!document.querySelector("video").getAttribute("poster")',
                },
                {
                  id: 'ex-l66-t5',
                  label: 'There is a captions track with an srclang and a label',
                  body:
                    'const t = document.querySelector("track[kind=\'captions\']"); return !!t && !!t.getAttribute("srclang") && !!t.getAttribute("label") && !!t.getAttribute("src")',
                },
              ],
              hints: [
                'sources go inside the video element, and the order matters — the first one the browser can play wins.',
                'A track element is a child of the video, with kind, srclang, label and src.',
              ],
              solution: {
                html:
                  '<video controls width="640" height="360" poster="/media/poster.jpg" preload="metadata">\n  <source src="/media/tour.webm" type="video/webm">\n  <source src="/media/tour.mp4" type="video/mp4">\n  <track kind="captions" src="/media/tour.en.vtt" srclang="en" label="English" default>\n  <p>Your browser cannot play this video. <a href="/media/tour.mp4">Download the MP4</a> instead.</p>\n</video>\n',
              },
              testNotes:
                'The first test is the accessibility assertion. A video without controls has no interface at all, and on some platforms it cannot be played.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s56',
    title: 'HTML Video',
    description: 'The video element in detail, the JavaScript API, and what a resilient player needs.',
    lessons: [
      {
        id: 'html-l67',
        title: 'HTML Video',
        description: 'The video element attributes, the properties and events that drive a custom player, and captions.',
        duration: 6,
        objectives: [
          'Control playback with the video API and listen for its events',
          'Explain what a custom player must provide so it is not less accessible than the native one',
          'Add captions with a WebVTT track and cue file',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l67',
          title: 'HTML Video quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l67-q1',
              type: 'multiple-choice',
              prompt: 'When does the duration property become known?',
              options: [
                'Immediately, as soon as the element exists',
                'After the loadedmetadata event fires',
                'After the ended event',
                'After the canplay event',
              ],
              answer: 1,
              explanation: 'Before loadedmetadata the duration is NaN, which is why seeking code has to wait for that event.',
            },
            {
              id: 'quiz-html-l67-q2',
              type: 'true-false',
              prompt: 'A custom player gives the user everything the native control does.',
              answer: false,
              explanation: 'The native control has keyboard shortcuts, Picture-in-Picture, AirPlay, captions and a screen reader mode. Rebuilding all of it is a large project.',
            },
            {
              id: 'quiz-html-l67-q3',
              type: 'multiple-choice',
              prompt: 'What file format do caption tracks use?',
              options: [
                'SRT',
                'WebVTT, with a .vtt extension',
                'VTT',
                'XML only',
              ],
              answer: 1,
              explanation: 'WebVTT is the format browsers parse. An SRT file has to be converted.',
            },
            {
              id: 'quiz-html-l67-q4',
              type: 'blank',
              prompt: 'Which property is written to move the playhead?',
              answers: [
                'currentTime',
                'video.currentTime',
              ],
              explanation: 'Setting currentTime seeks. Reading it gives the current position in seconds.',
            },
            {
              id: 'quiz-html-l67-q5',
              type: 'multiple-choice',
              prompt: 'How often does the timeupdate event fire?',
              options: [
                'On every frame',
                'Roughly four times a second',
                'Once at the start',
                'Only when playback ends',
              ],
              answer: 1,
              explanation: 'That is enough for a progress bar and not enough for a scrubbing preview, which needs its own calculation.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l67-b1',
            body: 'The video element has a JavaScript API that is more complete than the native control. The properties — currentTime, duration, paused, volume, playbackRate, muted — are readable and writable, and the events — loadedmetadata, timeupdate, play, pause, ended, seeking, error — tell you what has happened. That is enough to build a player, and building one is a decision with a cost.',
          },
          {
            type: 'demo',
            id: 'c-l67-d1',
            title: 'Driving the video element from script',
            body: 'The video below has a custom control panel rather than the native one. It demonstrates the properties and events: play and pause, a seek bar driven by timeupdate, a rate control, and a live caption region.',
            html: `<video id="v" width="420" preload="metadata" playsinline
       aria-describedby="v-desc">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm">
  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">
  Your browser cannot play this video.
</video>
<p id="v-desc">A short clip of a flower, with a custom control panel below it.</p>

<div class="controls">
  <button id="play" type="button">Play</button>
  <input id="seek" type="range" min="0" max="100" value="0" aria-label="Seek">
  <span id="time">0:00 / 0:00</span>
  <label for="rate">Speed
    <select id="rate">
      <option value="0.5">0.5×</option>
      <option value="1" selected>1×</option>
      <option value="1.5">1.5×</option>
      <option value="2">2×</option>
    </select>
  </label>
</div>

<script>
  const v = document.getElementById('v');
  const play = document.getElementById('play');
  const seek = document.getElementById('seek');
  const time = document.getElementById('time');
  const rate = document.getElementById('rate');

  const fmt = (s) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    return m + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  };

  play.addEventListener('click', () => {
    if (v.paused) { v.play(); } else { v.pause(); }
  });

  v.addEventListener('play',  () => { play.textContent = 'Pause'; });
  v.addEventListener('pause', () => { play.textContent = 'Play'; });

  v.addEventListener('loadedmetadata', () => {
    time.textContent = '0:00 / ' + fmt(v.duration);
  });

  v.addEventListener('timeupdate', () => {
    seek.value = (v.currentTime / v.duration) * 100;
    time.textContent = fmt(v.currentTime) + ' / ' + fmt(v.duration);
  });

  seek.addEventListener('input', () => {
    v.currentTime = (seek.value / 100) * v.duration;
  });

  rate.addEventListener('change', () => { v.playbackRate = Number(rate.value); });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
video { max-width: 100%; border-radius: 8px; background: #0f172a; display: block; }
#v-desc { color: #475569; font-size: 13px; }
.controls { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }
button, select { padding: 0.3rem 0.6rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; font: inherit; }
input[type="range"] { flex: 1; min-width: 80px; }
#time { font-variant-numeric: tabular-nums; color: #475569; }`,
            height: 380,
          },
          {
            type: 'list',
            id: 'c-l67-l1',
            style: 'bullet',
            items: [
              '`currentTime` — the playhead position in seconds. Writable, and the way to seek.',
              '`duration` — the length, or NaN until loadedmetadata has fired.',
              '`paused`, `ended`, `muted`, `volume` — readable and writable booleans and numbers.',
              '`playbackRate` — 0.5 to 2, and it affects the audio pitch unless you compensate.',
              '`play()` returns a promise that rejects if autoplay is blocked, so handle it.',
              '`loadedmetadata` — the duration and dimensions are now known. Almost everything else waits for this.',
              '`timeupdate` — fires about four times a second. Enough for a progress bar, not enough for a scrub preview.',
              '`error` — fires with a MediaError; check `error.code` to tell a decode failure from a network one.',
            ],
          },
          {
            type: 'code',
            id: 'c-l67-c2',
            language: 'plaintext',
            title: 'A WebVTT cue file',
            code: `WEBVTT

1
00:00:00.000 --> 00:00:04.500
A wide shot of the workshop floor.

2
00:00:04.500 --> 00:00:09.000
The press is running.

3
00:00:09.000 --> 00:00:13.250
[Laughter from the group]

NOTE
Spoken by the narrator. Do not overlap with the music bed.`,
          },
          {
            type: 'warning',
            id: 'c-l67-w1',
            title: 'A custom player is a downgrade unless you rebuild all of it',
            body: 'The native control has keyboard shortcuts, a full-screen button, Picture-in-Picture, captions, playback speed, AirPlay, and a screen reader mode that announces position. Building your own means reimplementing each of those, plus a focus trap and a live region for the position. The honest answer to "should I build a custom player" is almost always no.',
          },
          {
            type: 'tip',
            id: 'c-l67-t1',
            title: 'Style the native controls first',
            body: 'The controls attribute is a boolean, so there is no styling switch. What you can do is keep the native controls and layer your own artwork around them, or hide the native ones only once yours cover every capability the native one had.',
          },
          {
            type: 'exercise',
            id: 'ex-l67-x1',
            exercise: {
              id: 'ex-l67',
              instructions:
                'Add a play/pause button that reflects the current state, and a caption track loaded from a WebVTT file.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<video id="v" width="360" controls>\n  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">\n</video>\n<button id="play" type="button">Play</button>\n',
                javascript: "const v = document.getElementById('v');\n",
              },
              tests: [
                {
                  id: 'ex-l67-t1',
                  label: 'The video still has the native controls',
                  body: 'return document.querySelector("video").hasAttribute("controls")',
                },
                {
                  id: 'ex-l67-t2',
                  label: 'There is a track element for captions',
                  body: 'return !!document.querySelector("track[kind=\'captions\']")',
                },
                {
                  id: 'ex-l67-t3',
                  label: 'The track points at a .vtt file',
                  body:
                    'return /\\.vtt(\\?|$)/.test(document.querySelector("track").getAttribute("src") || "")',
                },
                {
                  id: 'ex-l67-t4',
                  label: 'The play button text changes with the state',
                  body:
                    'return /^play$|^pause$/i.test(document.getElementById("play").textContent.trim())',
                },
                {
                  id: 'ex-l67-t5',
                  label: 'The play button is not itself a submit button',
                  body: 'return document.getElementById("play").getAttribute("type") === "button"',
                },
              ],
              hints: [
                'Listen for the play and pause events on the video, and set the button label from those.',
                'The kind attribute on a track distinguishes subtitles, captions, descriptions, chapters and metadata.',
              ],
              solution: {
                html:
                  '<video id="v" width="360" controls>\n  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4">\n  <track kind="captions" src="/media/flower.en.vtt" srclang="en" label="English" default>\n</video>\n<button id="play" type="button">Play</button>\n',
                javascript:
                  "const v = document.getElementById('v');\nconst b = document.getElementById('play');\nb.addEventListener('click', () => { v.paused ? v.play() : v.pause(); });\nv.addEventListener('play', () => { b.textContent = 'Pause'; });\nv.addEventListener('pause', () => { b.textContent = 'Play'; });\n",
              },
              testNotes:
                'The first test is deliberate. A custom button next to a video with no native controls is a downgrade, and the exercise keeps the native one in place.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s57',
    title: 'HTML Audio',
    description: 'The audio element, the formats that matter, and when audio is the right medium.',
    lessons: [
      {
        id: 'html-l68',
        title: 'HTML Audio',
        description: 'Playing audio without a plugin, and the design questions that come with it.',
        duration: 5,
        objectives: [
          'Embed an audio file with controls and a fallback',
          'Choose a format and explain why',
          'Decide when audio belongs on a page at all',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l68',
          title: 'HTML Audio quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l68-q1',
              type: 'multiple-choice',
              prompt: 'Which audio format is most efficient at a given quality?',
              options: [
                'MP3',
                'Opus',
                'WAV',
                'AIFF',
              ],
              answer: 1,
              explanation: 'Opus is roughly twice as efficient as MP3 at the same quality, and is supported by every current browser.',
            },
            {
              id: 'quiz-html-l68-q2',
              type: 'true-false',
              prompt: 'An audio player with no transcript is a complete alternative to the written version.',
              answer: false,
              explanation: 'It excludes Deaf and hard-of-hearing users, and anyone who cannot turn sound on. The transcript is the accessible version.',
            },
            {
              id: 'quiz-html-l68-q3',
              type: 'multiple-choice',
              prompt: 'What does preload="none" do?',
              options: [
                'Prevents the file being downloaded until the user presses play',
                'Prevents the file being played',
                'Hides the controls',
                'Compresses the file',
              ],
              answer: 0,
              explanation: 'It saves the bandwidth and the surprise cost of a page that downloads audio nobody plays.',
            },
            {
              id: 'quiz-html-l68-q4',
              type: 'blank',
              prompt: 'What happens if the promise returned by play() rejects?',
              answers: [
                'Autoplay was blocked',
                'autoplay is blocked',
                'playback was blocked',
              ],
              explanation: 'A browser refuses to start audio without a user gesture, and the rejection is how you find out.',
            },
            {
              id: 'quiz-html-l68-q5',
              type: 'multiple-choice',
              prompt: 'Which element is right for a long transcript beside a player?',
              options: [
                'A div with an onclick handler',
                'A details element with a summary',
                'A hidden paragraph',
                'The alt attribute of the audio element',
              ],
              answer: 1,
              explanation: 'details and summary work without JavaScript, are keyboard accessible, and are announced as a disclosure.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l68-b1',
            body: 'The `<audio>` element is the video element without the picture. It plays MP3, WAV and Ogg natively, and the same attributes apply: `controls`, `preload`, `loop`, `muted`, and a set of `<source>` children. What makes audio a design problem rather than a technical one is that it starts without any visible sign, so a user has to be told it exists and be given a way to stop it.',
          },
          {
            type: 'demo',
            id: 'c-l68-d1',
            title: 'An audio player with a transcript beside it',
            body: 'The player is small and the transcript sits directly beneath it, so the audio is an option rather than a gate. Every recording on a page should have a transcript, and the two together serve people who cannot hear it and people who cannot read it as comfortably.',
            html: `<figure class="player">
  <figcaption>Interview with the workshop lead &mdash; 4:12</figcaption>
  <audio controls preload="none">
    <source src="/media/interview.ogg" type="audio/ogg">
    <source src="/media/interview.mp3" type="audio/mpeg">
    <a href="/media/interview.mp3">Download the audio</a>
  </audio>
  <details>
    <summary>Read the transcript</summary>
    <p><strong>Interviewer:</strong> When did the workshop start?</p>
    <p><strong>Lead:</strong> In a rented unit above a bakery, in the March of 2019.</p>
    <p><strong>Interviewer:</strong> And the first press?</p>
    <p><strong>Lead:</strong> Second hand, and it needed a new belt twice a week.</p>
  </details>
</figure>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; line-height: 1.6; }
.player { border: 1px solid #cbd5e1; border-radius: 8px; padding: 0.75rem 1rem; max-width: 460px; }
figcaption { font-weight: 600; margin-bottom: 0.5rem; }
audio { width: 100%; }
details { margin-top: 0.75rem; }
summary { cursor: pointer; font-weight: 600; }
details p { margin: 0.5rem 0; }`,
            height: 300,
          },
          {
            type: 'code',
            id: 'c-l68-c1',
            language: 'html',
            title: 'The audio element in use',
            code: `<!-- the full set of attributes -->
<audio
  controls
  src="/media/interview.mp3"
  preload="metadata"
  loop
  aria-label="Interview with the workshop lead, four minutes twelve">
</audio>

<!-- with sources and a download fallback -->
<audio controls preload="none">
  <source src="/media/interview.ogg" type="audio/ogg">
  <source src="/media/interview.mp3" type="audio/mpeg">
  <a href="/media/interview.mp3">Download the MP3 (3.2 MB)</a>
</audio>

<!-- a short effect, muted by default so it never startles anyone -->
<audio src="/media/ding.ogg" preload="auto"></audio>

<!-- and the same file, played by script -->
<script>
  const clip = document.getElementById('clip');
  clip.volume = 0.7;

  // the play promise rejects when autoplay is blocked — handle it
  clip.play().catch(() => {
    console.log('Playback was blocked until the user interacted');
  });
</script>

<!-- a transcript beside the player, which is the accessible half of the pair -->
<figure>
  <figcaption>Interview, 4:12</figcaption>
  <audio controls src="/media/interview.mp3"></audio>
  <details>
    <summary>Transcript</summary>
    <p>Interviewer: When did the workshop start?</p>
    <p>Lead: In a rented unit above a bakery, in the March of 2019.</p>
  </details>
</figure>`,
          },
          {
            type: 'tip',
            id: 'c-l68-t1',
            title: 'MP3 for compatibility, Opus for size',
            body: 'MP3 plays everywhere, including old hardware and some email clients. Opus is roughly twice as efficient at the same quality and is supported by every current browser. Offering both costs one extra file and covers the whole range, with the browser picking the smaller one.',
          },
          {
            type: 'warning',
            id: 'c-l68-w1',
            title: 'Audio needs a transcript, not just a player',
            body: 'A player with no transcript excludes Deaf and hard-of-hearing users completely, and it excludes anyone in a situation where they cannot turn sound on. The transcript is not a nice-to-have; it is the accessible version of the same content.',
          },
          {
            type: 'exercise',
            id: 'ex-l68-x1',
            exercise: {
              id: 'ex-l68',
              instructions:
                'Embed an audio clip with the controls attribute, two sources, and a transcript in a details element beside it.',
              languages: ['html'],
              starterCode: {
                html: '<figure>\n  \n</figure>\n',
              },
              tests: [
                {
                  id: 'ex-l68-t1',
                  label: 'There is an audio element with controls',
                  body: 'return document.querySelector("audio").hasAttribute("controls")',
                },
                {
                  id: 'ex-l68-t2',
                  label: 'The audio has at least two sources',
                  body: 'return document.querySelectorAll("audio source").length >= 2',
                },
                {
                  id: 'ex-l68-t3',
                  label: 'Every source declares a type',
                  body:
                    'return Array.from(document.querySelectorAll("audio source")).every(s => !!s.getAttribute("type"))',
                },
                {
                  id: 'ex-l68-t4',
                  label: 'There is a transcript in a details element',
                  body:
                    'const d = document.querySelector("details"); return !!d && d.textContent.trim().length >= 40',
                },
                {
                  id: 'ex-l68-t5',
                  label: 'The audio is inside a figure with a figcaption naming it',
                  body:
                    'return !!document.querySelector("figure > figcaption") && !!document.querySelector("figure audio")',
                },
              ],
              hints: [
                'details and summary give a disclosure that works without JavaScript, which is the right control for a long transcript.',
                'A figure with a figcaption is what names the audio for a screen reader user.',
              ],
              solution: {
                html:
                  '<figure>\n  <figcaption>Interview with the workshop lead &mdash; 4:12</figcaption>\n  <audio controls preload="none">\n    <source src="/media/interview.ogg" type="audio/ogg">\n    <source src="/media/interview.mp3" type="audio/mpeg">\n    <a href="/media/interview.mp3">Download the MP3</a>\n  </audio>\n  <details>\n    <summary>Read the transcript</summary>\n    <p>Interviewer: When did the workshop start?</p>\n    <p>Lead: In a rented unit above a bakery, in the March of 2019.</p>\n  </details>\n</figure>\n',
              },
              testNotes:
                'The fourth test is the accessibility assertion. A player with no transcript excludes Deaf users entirely.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s58',
    title: 'HTML Plug-ins',
    description: 'The object element, why plug-ins are gone, and what replaced them.',
    lessons: [
      {
        id: 'html-l69',
        title: 'HTML Plug-ins',
        description: 'The object element, embed, and why almost nothing on the modern web needs a plug-in.',
        duration: 5,
        objectives: [
          'Say what the object element does and when it is still appropriate',
          'Explain why plug-in content is effectively gone from the web',
          'Choose the right element for PDF, video and interactive content',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l69',
          title: 'HTML Plug-ins quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l69-q1',
              type: 'multiple-choice',
              prompt: 'What is the object element used for today?',
              options: [
                'Running Flash content',
                'Embedding an external resource, rarely the right answer since the browser does most of it natively',
                'Playing audio',
                'Drawing graphics',
              ],
              answer: 1,
              explanation: 'Video, audio, PDF, SVG and canvas all have native elements, so almost nothing needs a plug-in embed.',
            },
            {
              id: 'quiz-html-l69-q2',
              type: 'true-false',
              prompt: 'Embedding a PDF in an object is usually better than linking to it.',
              answer: false,
              explanation: 'An embed takes away the viewer the user has chosen and guesses a size. A link respects their setup and works on a phone.',
            },
            {
              id: 'quiz-html-l69-q3',
              type: 'multiple-choice',
              prompt: 'Which element can hold fallback content?',
              options: [
                'embed',
                'object',
                'Both',
                'Neither',
              ],
              answer: 2,
              explanation: 'Both hold fallback content, though the fallback is a required child of object and cannot be a child of embed.',
            },
            {
              id: 'quiz-html-l69-q4',
              type: 'blank',
              prompt: 'Which element was removed from HTML entirely?',
              answers: [
                'applet',
                '<applet>',
              ],
              explanation: 'applet was for Java, which no browser runs any more.',
            },
            {
              id: 'quiz-html-l69-q5',
              type: 'multiple-choice',
              prompt: 'Why are plug-ins a security concern?',
              options: [
                'They are slow',
                'They run with the permissions of the machine rather than the page',
                'They cannot be styled',
                'They require a licence',
              ],
              answer: 1,
              explanation: 'That level of privilege is why they were removed for security history, and why a prompt to install one is a malware route.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l69-b1',
            body: 'The `<object>` element embeds an external resource, and historically that resource was a plug-in — Flash, Java, QuickTime, a PDF viewer. Every one of those has been replaced by something the browser does natively: video and audio play in the browser, PDF has a built-in viewer, and the interactive graphics the web used to need Flash for are now canvas, SVG and WebGL. The element is not removed, but the reason it existed is.',
          },
          {
            type: 'demo',
            id: 'c-l69-d1',
            title: 'object with fallback content, and the modern equivalents',
            body: 'The first block uses object with fallback content inside it. The two below it are the elements a page would use today for the same jobs.',
            html: `<object type="image/svg+xml" data="/icons/diagram.svg"
        width="300" height="120"
        aria-label="A flow diagram">
  <img src="/icons/diagram.png" alt="A flow diagram">
  <p>This diagram needs SVG support. <a href="/icons/diagram.png">View it as a PNG</a>.</p>
</object>

<p>For video, the video element:</p>
<audio controls preload="none" style="width: 280px;">
  <source src="/media/clip.mp3" type="audio/mpeg">
</audio>

<p>For a document, a plain link is better than embedding it:</p>
<a href="/reports/q1.pdf">Open the Q1 report (PDF)</a>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
object { border: 1px dashed #cbd5e1; border-radius: 6px; }
a { color: #1d4ed8; }`,
            height: 300,
          },
          {
            type: 'code',
            id: 'c-l69-c1',
            language: 'html',
            title: 'object, embed, and the replacements',
            code: `<!-- object: an external resource, with fallback content inside it -->
<object type="image/svg+xml" data="/diagram.svg" width="300" height="120">
  <img src="/diagram.png" alt="A flow diagram">
</object>

<!-- a PDF, as an embedded document rather than a link -->
<object type="application/pdf" data="/report.pdf" width="100%" height="600">
  <p>This report is a PDF.
     <a href="/report.pdf">Download it instead</a>.</p>
</object>

<!-- embed: no fallback content is possible, so it is close to useless -->
<embed src="/report.pdf" type="application/pdf">

<!-- what to use instead -->
<video controls src="/clip.mp4"></video>              <!-- video, natively -->
<audio controls src="/clip.mp3"></audio>              <!-- audio, natively -->
<iframe src="https://example.com/embed" title="…"     <!-- a whole page -->
<svg viewBox="0 0 100 100">…</svg>                    <!-- vector graphics -->
<canvas id="c"></canvas>                              <!-- raster drawing -->

<!-- and a document is almost always a link, not an embed -->
<a href="/report.pdf" type="application/pdf">Open the Q1 report (PDF, 2.1 MB)</a>`,
          },
          {
            type: 'list',
            id: 'c-l69-l1',
            style: 'bullet',
            items: [
              '`<object>` — embeds a resource and can hold fallback content. Rarely the right answer today.',
              '`<embed>` — the same idea with no fallback possible. Effectively deprecated by disuse.',
              '`<applet>` — Java applets. Removed from HTML entirely.',
              '`<iframe>` — embeds a whole document, which is a different and still very useful thing.',
              '`<video>` and `<audio>` — media, natively.',
              '`<svg>` and `<canvas>` — graphics, natively.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l69-t1',
            title: 'Link to the document',
            body: 'Embedding a PDF in a page makes the browser show a viewer the user cannot control, at a size the author guessed, with no way to open it elsewhere. A link to the file respects whatever the user has set up, and it works on a phone. It is almost always the better answer.',
          },
          {
            type: 'warning',
            id: 'c-l69-w1',
            title: 'Plugin content is same-origin privileged',
            body: 'A plug-in runs with the permissions of the machine, not the page. Every one of them was either removed for a security history or superseded by something safer. Nothing on the modern web needs a plug-in, and a request to install one is a well-worn route to malware.',
          },
          {
            type: 'exercise',
            id: 'c-l69-x1',
            exercise: {
              id: 'ex-l69',
              instructions:
                'Embed an SVG with the object element and give it meaningful fallback content, and provide a plain link to the same file as the no-plugin path.',
              languages: ['html'],
              starterCode: {
                html: '<object type="image/svg+xml" data="/icons/diagram.svg" width="300" height="120">\n  \n</object>\n',
              },
              tests: [
                {
                  id: 'ex-l69-t1',
                  label: 'There is an object element with a type and a data attribute',
                  body:
                    'const o = document.querySelector("object"); return !!o && !!o.getAttribute("type") && !!o.getAttribute("data")',
                },
                {
                  id: 'ex-l69-t2',
                  label: 'The object has fallback content inside it',
                  body:
                    'return document.querySelector("object").textContent.trim().length >= 20',
                },
                {
                  id: 'ex-l69-t3',
                  label: 'The fallback includes an image',
                  body: 'return !!document.querySelector("object img")',
                },
                {
                  id: 'ex-l69-t4',
                  label: 'The fallback includes a link to the file',
                  body: 'return !!document.querySelector("object a")',
                },
                {
                  id: 'ex-l69-t5',
                  label: 'The object has an accessible name',
                  body:
                    'const o = document.querySelector("object"); return (o.getAttribute("aria-label") || "").trim().length > 3',
                },
              ],
              hints: [
                'Fallback content goes between the object tags, exactly as it would for video.',
                'A link inside the fallback gives the user a way to the file when the object cannot be rendered.',
              ],
              solution: {
                html:
                  '<object type="image/svg+xml" data="/icons/diagram.svg" width="300" height="120" aria-label="A flow diagram">\n  <img src="/icons/diagram.png" alt="A flow diagram showing intake, review and sign-off">\n  <p>This diagram needs SVG support. <a href="/icons/diagram.svg">Open the SVG</a> or <a href="/icons/diagram.png">view it as a PNG</a>.</p>\n</object>\n',
              },
              testNotes:
                'The last test is the assertion that most object embeds are missing. An unnamed embedded resource is announced as nothing at all.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s59',
    title: 'HTML YouTube',
    description: 'Embedding a YouTube video, and why the privacy-enhanced domain is the one to use.',
    lessons: [
      {
        id: 'html-l70',
        title: 'HTML YouTube',
        description: 'The iframe embed, its parameters, and the privacy and performance cost of a third-party player.',
        duration: 5,
        objectives: [
          'Build a YouTube embed with a title and the privacy-enhanced domain',
          'Say which embed parameters change the player behaviour',
          'Explain the privacy and performance cost of a third-party embed',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l70',
          title: 'HTML YouTube quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l70-q1',
              type: 'multiple-choice',
              prompt: 'Which hostname defers YouTube cookies until the video is played?',
              options: [
                'youtube.com',
                'youtube-nocookie.com',
                'youtu.be',
                'googlevideo.com',
              ],
              answer: 1,
              explanation: 'The nocookie host does not set cookies on load, which is a meaningful privacy improvement on a page you do not own.',
            },
            {
              id: 'quiz-html-l70-q2',
              type: 'true-false',
              prompt: 'A YouTube embed needs a title attribute to be usable with a screen reader.',
              answer: true,
              explanation: 'Without one the frame is announced as just "frame", and the user has no idea what is in it.',
            },
            {
              id: 'quiz-html-l70-q3',
              type: 'multiple-choice',
              prompt: 'What does the start parameter do?',
              options: [
                'Starts playback automatically',
                'Begins the video at a given number of seconds',
                'Sets the player width',
                'Enables captions',
              ],
              answer: 1,
              explanation: 'start=90 opens the player at the ninety second mark.',
            },
            {
              id: 'quiz-html-l70-q4',
              type: 'blank',
              prompt: 'Which iframe attribute stops the embed loading until it is near the viewport?',
              answers: [
                'loading',
                'loading="lazy"',
              ],
              explanation: 'loading="lazy" defers the third-party code as well as the image.',
            },
            {
              id: 'quiz-html-l70-q5',
              type: 'multiple-choice',
              prompt: 'What is the lightest way to link to a video that illustrates a paragraph?',
              options: [
                'An iframe embed',
                'A poster image linking to the video',
                'An embed element',
                'A video element pointing at YouTube',
              ],
              answer: 1,
              explanation: 'A poster image loads in a few kilobytes and no third-party code, at the cost of one click.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l70-b1',
            body: 'A YouTube video is embedded with an iframe pointing at YouTube. The embed is a cross-origin frame, so it is straightforward to make and straightforward to get wrong. Two things matter before anything else: the iframe needs a `title`, because a video with no title is announced as just "frame"; and the host should be `youtube-nocookie.com` rather than `youtube.com`, which stops cookies being set until the user actually plays the video.',
          },
          {
            type: 'demo',
            id: 'c-l70-d1',
            title: 'A minimal, privacy-respecting embed',
            body: 'The iframe below uses the nocookie host, has a title, and asks for a modest player size. It is the smallest embed that is still usable — every extra feature you enable is more code running on your page.',
            html: `<iframe
  src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ"
  title="A demonstration of the embed, three minutes long"
  width="400" height="225"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
  allowfullscreen></iframe>

<p>The same video, with a start time and no related videos:</p>

<iframe
  src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?start=90&amp;rel=0"
  title="The same demonstration, from the ninety second mark"
  width="400" height="225"
  loading="lazy"
  allowfullscreen></iframe>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
iframe { border: 0; border-radius: 8px; }
p { margin: 0.75rem 0 0.35rem; }`,
            height: 560,
          },
          {
            type: 'code',
            id: 'c-l70-c1',
            language: 'html',
            title: 'The parameters that matter',
            code: `<!-- the minimal correct embed -->
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
  title="A short description of what the video shows"
  width="560" height="315"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen></iframe>

<!-- with parameters, joined by &amp; in HTML -->
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID?start=90&amp;rel=0&amp;modestbranding=1"
  title="…"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerpolicy="strict-origin"
  allowfullscreen></iframe>

<!-- and the aspect ratio wrapper, which is what makes it responsive -->
<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe
    src="https://www.youtube-nocookie.com/embed/VIDEO_ID"
    title="…"
    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"
    loading="lazy"
    allowfullscreen></iframe>
</div>

<!-- the hostnames -->
youtube.com/embed/ID            sets cookies on load
youtube-nocookie.com/embed/ID  sets them only when the user plays

<!-- and a plain link, which is the lightest option of all -->
<p><a href="https://www.youtube.com/watch?v=VIDEO_ID">Watch on YouTube</a></p>`,
          },
          {
            type: 'list',
              id: 'c-l70-l1',
            style: 'bullet',
            items: [
              '`title` — the accessible name. Required, and the one thing most embeds are missing.',
              '`loading="lazy"` — do not load the player until it is near the viewport.',
              '`referrerpolicy` — `strict-origin-when-cross-origin` sends almost nothing.',
              '`allow` — the permissions the player may use. Only list what you need.',
              '`start` — a start time in seconds. `rel=0` removes the related videos.',
              '`autoplay=1` — works only with `mute=1` and only after a user gesture. Rarely worth it.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l70-w1',
            title: 'An embed is a third-party tracker on every page',
            body: 'A YouTube iframe loads code and sets cookies before the visitor has done anything. On a page with several embeds that is several megabytes and a privacy disclosure you did not write. A link, or a poster image that links to the video, is often the better answer for content that is not the point of the page.',
          },
          {
            type: 'tip',
            id: 'c-l70-t1',
            title: 'Use a lite embed when the video is not the point',
            body: 'A poster image with a play badge, linking to the video, loads in a few kilobytes and no third-party code at all. It costs one click, and for a video that illustrates a paragraph rather than carrying the page, that trade is usually worth making.',
          },
          {
            type: 'exercise',
            id: 'ex-l70-x1',
            exercise: {
              id: 'ex-l70',
              instructions:
                'Embed a YouTube video with a descriptive title, on the privacy-enhanced host, lazy loaded, and wrapped so it keeps a 16:9 ratio.',
              languages: ['html'],
              starterCode: {
                html: '<iframe></iframe>\n',
              },
              tests: [
                {
                  id: 'ex-l70-t1',
                  label: 'There is an iframe with a descriptive title',
                  body:
                    'const f = document.querySelector("iframe"); return !!f && (f.getAttribute("title") || "").trim().length >= 10',
                },
                {
                  id: 'ex-l70-t2',
                  label: 'The src points at the privacy-enhanced host',
                  body:
                    'return /youtube-nocookie\\.com\\/embed\\//.test(document.querySelector("iframe").getAttribute("src") || "")',
                },
                {
                  id: 'ex-l70-t3',
                  label: 'The embed is lazy loaded',
                  body: 'return document.querySelector("iframe").getAttribute("loading") === "lazy"',
                },
                {
                  id: 'ex-l70-t4',
                  label: 'A referrerpolicy is set',
                  body:
                    'return !!document.querySelector("iframe").getAttribute("referrerpolicy")',
                },
                {
                  id: 'ex-l70-t5',
                  label: 'The iframe is inside a ratio-preserving wrapper',
                  body:
                    'const f = document.querySelector("iframe"); const p = f.parentElement; const s = getComputedStyle(p); return p !== document.body && (parseFloat(s.paddingBottom) > 0 || /56\\.25|aspect-ratio/.test(s.paddingBottom + s.aspectRatio))',
                },
              ],
              hints: [
                'The host is youtube-nocookie.com/embed/ followed by the video id.',
                'The classic ratio wrapper works by setting padding-bottom as a percentage and positioning the iframe absolutely inside it.',
              ],
              solution: {
                html:
                  '<div style="position: relative; padding-bottom: 56.25%; height: 0; max-width: 560px;">\n  <iframe\n    src="https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?rel=0"\n    title="A demonstration of the embed, three minutes long"\n    style="position: absolute; inset: 0; width: 100%; height: 100%; border: 0;"\n    loading="lazy"\n    referrerpolicy="strict-origin-when-cross-origin"\n    allowfullscreen></iframe>\n</div>\n',
              },
              testNotes:
                'The second test is the privacy assertion. The youtube.com embed host sets cookies on page load; the nocookie host waits until the visitor plays.',
            },
          },
        ],
      },
    ],
  },
]
