import type { Section } from '~/types/content'

export const htmlImageSections: Section[] = [
  {
    id: 'html-s20',
    title: 'HTML Images',
    description: 'The img element, its required attributes, and the three ways to supply a fallback.',
    lessons: [
      {
        id: 'html-l31',
        title: 'HTML Images',
        description: 'Images are empty elements, and the src, alt and width attributes are what make one work.',
        duration: 6,
        objectives: [
          'Embed an image with the img element and its required attributes',
          'Explain why alt is mandatory rather than decorative',
          'Say what width and height do for layout stability',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l31',
          title: 'HTML Images quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l31-q1',
              type: 'multiple-choice',
              prompt: 'What does the alt attribute contain?',
              options: [
                'A caption displayed under the image',
                'A replacement for the image, read in its place when it cannot be seen',
                'A tooltip shown on hover',
                'The file name for SEO',
              ],
              answer: 1,
              explanation: 'Alt is a replacement, not a caption. Long descriptions belong in a figcaption next to the image.',
            },
            {
              id: 'quiz-html-l31-q2',
              type: 'multiple-choice',
              prompt: 'How do you mark an image as decorative?',
              options: [
                'Omit the alt attribute',
                'Set alt to the word decorative',
                'Set alt to an empty string',
                'Set the role attribute to presentation',
              ],
              answer: 2,
              explanation: 'alt="" tells the screen reader to skip the image. An omitted attribute is treated as a missing description, not as a decision.',
            },
            {
              id: 'quiz-html-l31-q3',
              type: 'true-false',
              prompt: 'Declaring width and height on an image prevents layout shift while it loads.',
              answer: true,
              explanation: 'The browser reserves the space up front instead of discovering it after the download.',
            },
            {
              id: 'quiz-html-l31-q4',
              type: 'blank',
              prompt: 'Which attribute makes the browser download the image only when it is near the viewport?',
              answers: [
                'loading',
                'loading="lazy"',
                'lazy',
              ],
              explanation: 'loading="lazy" defers off-screen images until they approach the viewport.',
            },
            {
              id: 'quiz-html-l31-q5',
              type: 'multiple-choice',
              prompt: 'Why should alt text avoid starting with "image of"?',
              options: [
                'Because it makes the attribute too long',
                'Because the screen reader already announced the element type',
                'Because search engines reject it',
                'Because it breaks the alt in older browsers',
              ],
              answer: 1,
              explanation: 'The reader has already said "image". Repeating that in the alt text just adds noise before the useful part.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l31-b1',
            body: 'Images are embedded with the `<img>` element. The `src` attribute says where the file is, and the `alt` attribute says what the image is. The element is an empty element: it has no closing tag and no content, because the image is the whole element. Everything else about it is optional, but the two attributes that matter most are the two that are not optional in practice.',
          },
          {
            type: 'demo',
            id: 'c-l31-d1',
            title: 'The same image with and without alt text',
            body: 'Both images are the same file. The first has meaningful alt text and announces itself. The second does not, and a screen reader has nothing useful to say.',
            html: `<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sicily_Monte Pellegrino_Panorama.jpg/640px-Sicily_Monte_Pellegrino_Panorama.jpg"
       alt="A wide panorama of the coastline at Monte Pellegrino, with the sea beyond"
       width="320">
  <figcaption>A panorama of the coast.</figcaption>
</figure>

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sicily_Monte_Pellegrino_Panorama.jpg/640px-Sicily_Monte_Pellegrino_Panorama.jpg"
       width="320">
  <figcaption>No alt attribute at all.</figcaption>
</figure>`,
            height: 260,
          },
          {
            type: 'code',
            id: 'c-l31-c1',
            language: 'html',
            title: 'The three required-in-practice attributes',
            code: `<img src="logo.png" alt="The company logo" width="200" height="80">

<!-- decorative: empty alt, and nothing else changes -->
<img src="divider.svg" alt="">

<!-- loading and decoding hints -->
<img src="hero.jpg" alt="The hero image" loading="lazy" decoding="async">

<!-- responsive: the browser picks from the source list -->
<img src="photo-800.jpg" srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="A photograph of the workshop bench" width="800" height="533">`,
          },
          {
            type: 'heading',
            id: 'c-l31-h1',
            level: 3,
            body: 'Alt text is not a caption',
          },
          {
            type: 'text',
            id: 'c-l31-b2',
            body: 'The alt attribute is a replacement for the image, not a description of it. It is what a screen reader announces in place of the image, and it is what appears when the image fails to load. Write it as a short phrase, with no "image of" or "picture of" at the start — the reader already announced the element type. If the text is long enough to need a sentence or two, it belongs in a `figcaption` next to the image, not in the alt attribute.',
          },
          {
            type: 'list',
            id: 'c-l31-l1',
            style: 'bullet',
            items: [
              '**Meaningful image** — describe it. `alt="A bar chart showing sales rising through the year"`.',
              '**Decorative image** — leave it empty: `alt=""`. The empty string tells the reader to skip it, which is different from omitting the attribute entirely.',
              '**Image that is also a link** — the alt text becomes the accessible name of the link, so it has to describe the destination, not the picture.',
              '**Text in the image** — if the image contains words that matter, those words go in the alt text.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l31-t1',
            title: 'Why width and height matter so much',
            body: 'Without them the browser does not know the image size until it has downloaded it, reserves no space, and the page jumps as each image arrives. With them the space is reserved up front, so the content below does not shift. This is called cumulative layout shift, and it is the single most common cause of a janky-looking page.',
          },
          {
            type: 'warning',
            id: 'c-l31-w1',
            title: 'An omitted alt attribute is a bug',
            body: 'A validator flags it, a screen reader announces the file name, and the browser has no way to know whether the image is decorative. Writing `alt=""` is a deliberate, correct decision. Writing nothing is an accident.',
          },
          {
            type: 'exercise',
            id: 'c-l31-x1',
            exercise: {
              id: 'ex-l31',
              instructions:
                'Add an image with meaningful alt text and explicit width and height, plus a second image that is purely decorative and has an empty alt.',
              languages: ['html'],
              starterCode: {
                html: '<!-- meaningful image -->\n\n<!-- decorative divider -->\n',
              },
              tests: [
                {
                  id: 'ex-l31-t1',
                  label: 'There are two images',
                  body: 'return document.querySelectorAll("img").length === 2',
                },
                {
                  id: 'ex-l31-t2',
                  label: 'Both images have a src',
                  body:
                    'return Array.from(document.querySelectorAll("img")).every(i => i.getAttribute("src") && i.getAttribute("src").trim().length > 0)',
                },
                {
                  id: 'ex-l31-t3',
                  label: 'The meaningful image has descriptive alt text',
                  body:
                    'const imgs = Array.from(document.querySelectorAll("img")); return imgs.some(i => (i.getAttribute("alt") || "").trim().length >= 8)',
                },
                {
                  id: 'ex-l31-t4',
                  label: 'The decorative image uses an empty alt, not a missing one',
                  body:
                    'return document.querySelectorAll("img[alt=\'\']").length === 1',
                },
                {
                  id: 'ex-l31-t5',
                  label: 'The meaningful image declares width and height',
                  body:
                    'const i = Array.from(document.querySelectorAll("img")).find(x => (x.getAttribute("alt") || "").trim().length >= 8); return !!i && i.hasAttribute("width") && i.hasAttribute("height")',
                },
              ],
              hints: [
                'The image element is void: no closing tag.',
                'The decorative one is written alt="" — the attribute is present and the value is empty.',
              ],
              solution: {
                html:
                  '<!-- meaningful image -->\n<img src="chart.png" alt="A bar chart showing sales rising through the year" width="400" height="240">\n\n<!-- decorative divider -->\n<img src="divider.svg" alt="" width="400" height="4">\n',
              },
              testNotes:
                'The last two tests pull the same failure in opposite directions: alt="" is correct and alt="decorative" or no alt at all is not.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s21',
    title: 'HTML Image Map',
    description: 'Clickable regions on a single image, and why the element is nearly always the wrong answer.',
    lessons: [
      {
        id: 'html-l32',
        title: 'HTML Image Map',
        description: 'The map and area elements, and the accessibility and maintenance problems they create.',
        duration: 6,
        objectives: [
          'Attach an image map with the usemap attribute and define areas',
          'Write the four shape types and their coordinate pairs',
          'Explain why a set of real links is almost always better',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l32',
          title: 'HTML Image Map quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l32-q1',
              type: 'multiple-choice',
              prompt: 'How does an image know which map to use?',
              options: [
                'The map element has an id and the image uses usemap',
                'The image has a map attribute',
                'The map element has a src attribute',
                'They must be adjacent siblings',
              ],
              answer: 0,
              explanation: 'The image carries usemap="#name" and the map element carries name="name". They do not have to be adjacent.',
            },
            {
              id: 'quiz-html-l32-q2',
              type: 'multiple-choice',
              prompt: 'How many numbers does a circle area need?',
              options: [
                'Two',
                'Three',
                'Four',
                'As many as it has points',
              ],
              answer: 1,
              explanation: 'A circle takes centre x, centre y and radius — three numbers.',
            },
            {
              id: 'quiz-html-l32-q3',
              type: 'true-false',
              prompt: 'A screen reader user can tell which part of an image each area covers.',
              answer: false,
              explanation: 'They hear the image once and then a list of separate links with no indication of where each sits.',
            },
            {
              id: 'quiz-html-l32-q4',
              type: 'blank',
              prompt: 'Which shape value covers everything not claimed by another area?',
              answers: [
                'default',
                'shape="default"',
                'default shape',
              ],
              explanation: 'The default shape takes no coords and acts as the fallback for the rest of the image.',
            },
            {
              id: 'quiz-html-l32-q5',
              type: 'multiple-choice',
              prompt: 'What is the usual recommendation for a set of links arranged on a page?',
              options: [
                'Use an image map so the layout matches the design',
                'Use real links, laid out with CSS',
                'Use absolute positioning on the anchors',
                'Use an area element per link without a map',
              ],
              answer: 1,
              explanation: 'Real links are focusable, styleable, responsive and announced with useful text. CSS can place them anywhere.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l32-b1',
            body: 'An image map turns regions of a single image into separate links. The `<map>` element holds the region definitions, each in an `<area>` element, and the image points at the map with a `usemap` attribute whose value is the map name. The shape attribute says which geometric primitive to use, and the `coords` attribute gives the numbers.',
          },
          {
            type: 'demo',
            id: 'c-l32-d1',
            title: 'Three regions on one image',
            body: 'The image is a single graphic divided into three areas. Each area is a separate link with its own coordinates, and each carries alt text describing where it goes.',
            html: `<img src="https://placehold.co/420x220/1d4ed8/ffffff?text=One+Image+Three+Regions"
     alt="A diagram divided into three regions: left, middle and right"
     usemap="#regions" width="420" height="220">

<map name="regions">
  <area shape="rect" coords="0,0,140,220" href="#left" alt="Go to the left region">
  <area shape="circle" coords="280,110,70" href="#middle" alt="Go to the middle region">
  <area shape="poly" coords="420,0,420,220,280,110" href="#right" alt="Go to the right region">
</map>

<p>Click any region. Each is a real link with its own destination.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
img { display: block; border-radius: 8px; }`,
            height: 320,
          },
          {
            type: 'heading',
            id: 'c-l32-h1',
            level: 3,
            body: 'The four shapes',
          },
          {
            type: 'list',
            id: 'c-l32-l1',
            style: 'bullet',
            items: [
              '`rect` — `coords="left,top,right,bottom"`. The rectangle can be any size, not just a square.',
              '`circle` — `coords="cx,cy,r"`. The centre point, then the radius.',
              '`poly` (polygon) — a list of x,y pairs joined by straight lines, and closed automatically.',
              '`default` — no coords. Everything on the image not covered by another area. Use it once at most.',
            ],
          },
          {
            type: 'code',
            id: 'c-l32-c1',
            language: 'html',
            title: 'Every shape, with its coordinates',
            code: `<img src="plan.png" alt="Floor plan of the building" usemap="#floor">

<map name="floor">
  <!-- top-left x, top-left y, bottom-right x, bottom-right y -->
  <area shape="rect"   coords="10,10,180,90"  href="/lobby"    alt="The lobby">
  <!-- centre x, centre y, radius -->
  <area shape="circle" coords="300,140,55"    href="/atrium"  alt="The atrium">
  <!-- a triangle: three x,y pairs -->
  <area shape="poly"   coords="400,20,470,20,435,90" href="/roof" alt="The roof terrace">
  <!-- everything else -->
  <area shape="default" href="/help" alt="Help">
</map>

<!-- a map can also live inside a picture element -->
<object data="plan.png" usemap="#floor" type="image/png">
  <img src="plan-fallback.png" alt="Floor plan">
</object>`,
          },
          {
            type: 'warning',
            id: 'c-l32-w1',
            title: 'Why this is almost never the right tool',
            body: 'A screen reader announces the image once and then reads each area as a separate link, with no indication of which part of the image each one covers. A user who cannot see the image gets a list of disconnected links. On top of that, the coordinates break the moment the image is responsive, the area is keyboard-focusable in a way that is not obvious, and it cannot be styled.',
          },
          {
            type: 'tip',
            id: 'c-l32-t1',
            title: 'What to use instead',
            body: 'For navigation, use real links and lay them out however you like — a list, a grid, a styled menu. For a genuinely spatial diagram where position is the information, an image map is defensible, and then it needs a text equivalent beside it describing every region and its link.',
          },
          {
            type: 'code',
            id: 'c-l32-c2',
            language: 'html',
            title: 'The accessible alternative for a spatial diagram',
            code: `<figure>
  <img src="plan.png" alt="Floor plan: lobby on the left, atrium in the centre, roof terrace at the top">
  <figcaption>
    <h3>Jump to</h3>
    <ul>
      <li><a href="/lobby">The lobby</a> — left of the plan</li>
      <li><a href="/atrium">The atrium</a> — centre of the plan</li>
      <li><a href="/roof">The roof terrace</a> — top of the plan</li>
    </ul>
  </figcaption>
</figure>`,
          },
          {
            type: 'exercise',
            id: 'c-l32-x1',
            exercise: {
              id: 'ex-l32',
              instructions:
                'Attach an image map to the image and define three regions: a rectangle, a circle and a polygon, each with its own href and alt text.',
              languages: ['html'],
              starterCode: {
                html:
                  '<img src="https://placehold.co/420x220/1d4ed8/ffffff?text=Three+Regions" alt="A diagram in three regions" width="420" height="220">\n\n<map name="regions">\n  \n</map>\n',
              },
              tests: [
                {
                  id: 'ex-l32-t1',
                  label: 'The image references a map with usemap',
                  body:
                    'const i = document.querySelector("img"); return !!i && i.getAttribute("usemap") === "#regions"',
                },
                {
                  id: 'ex-l32-t2',
                  label: 'There are three areas',
                  body: 'return document.querySelectorAll("map[name=\'regions\'] area").length === 3',
                },
                {
                  id: 'ex-l32-t3',
                  label: 'The three shapes are rect, circle and poly',
                  body:
                    'const shapes = Array.from(document.querySelectorAll("area")).map(a => a.getAttribute("shape")).sort().join(","); return shapes === "circle,poly,rect"',
                },
                {
                  id: 'ex-l32-t4',
                  label: 'Every area has coords, href and alt',
                  body:
                    'return Array.from(document.querySelectorAll("area")).every(a => a.getAttribute("coords") && a.getAttribute("href") && a.getAttribute("alt"))',
                },
              ],
              hints: [
                'The usemap value is a hash followed by the name of the map element.',
                'A circle takes three numbers: centre x, centre y, radius.',
              ],
              solution: {
                html:
                  '<img src="https://placehold.co/420x220/1d4ed8/ffffff?text=Three+Regions" alt="A diagram divided into three regions" usemap="#regions" width="420" height="220">\n\n<map name="regions">\n  <area shape="rect" coords="0,0,140,220" href="#left" alt="Go to the left region">\n  <area shape="circle" coords="280,110,70" href="#middle" alt="Go to the middle region">\n  <area shape="poly" coords="420,0,420,220,280,110" href="#right" alt="Go to the right region">\n</map>\n',
              },
              testNotes:
                'The last test is the one that keeps image maps usable. An area with no alt text announces nothing when the region is focused.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s22',
    title: 'HTML Background Images',
    description: 'The background attribute, what it cannot do, and where background images actually belong.',
    lessons: [
      {
        id: 'html-l33',
        title: 'HTML Background Images',
        description: 'The obsolete background attribute, and why the CSS property replaced it.',
        duration: 5,
        objectives: [
          'Recognise the background attribute and say why it is obsolete',
          'Set a background image with the CSS background property',
          'Explain why a background image is the wrong choice for meaningful content',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l33',
          title: 'HTML Background Images quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l33-q1',
              type: 'multiple-choice',
              prompt: 'What is the status of the HTML background attribute?',
              options: [
                'Current and preferred',
                'Obsolete — the CSS background properties replaced it',
                'Valid only on the body element',
                'Valid only for images',
              ],
              answer: 1,
              explanation: 'It still parses and renders, but it is obsolete. Everything it did is available in CSS, and more.',
            },
            {
              id: 'quiz-html-l33-q2',
              type: 'true-false',
              prompt: 'A background image is described to screen reader users automatically.',
              answer: false,
              explanation: 'A background is not an element, so it has no alt text and cannot be announced. Meaningful images must be img elements.',
            },
            {
              id: 'quiz-html-l33-q3',
              type: 'multiple-choice',
              prompt: 'What does background-size: cover do?',
              options: [
                'Scales the image to fit inside the box, leaving gaps',
                'Scales the image to fill the box, cropping if needed and keeping the ratio',
                'Repeats the image until the box is filled',
                'Sets the image to its natural size',
              ],
              answer: 1,
              explanation: 'cover fills the box and crops the overflow; contain fits the whole image inside and leaves gaps.',
            },
            {
              id: 'quiz-html-l33-q4',
              type: 'blank',
              prompt: 'Which background property controls whether an image repeats?',
              answers: [
                'background-repeat',
                'repeat',
              ],
              explanation: 'background-repeat takes repeat, no-repeat, repeat-x or repeat-y.',
            },
            {
              id: 'quiz-html-l33-q5',
              type: 'multiple-choice',
              prompt: 'Why set a background colour as well as a background image?',
              options: [
                'Because images do not load in some browsers',
                'So the content stays readable if the image fails to load or is not printed',
                'Because CSS requires it',
                'To make the image load faster',
              ],
              answer: 1,
              explanation: 'Background images are not printed by default and can fail. The colour is the fallback the text is actually readable against.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l33-b1',
            body: 'HTML once had a `background` attribute on the body element, and it still parses, but it is obsolete and doing it this way is a mistake. The attribute packed colour, image, tiling and alignment into one string, none of it could be styled further, and it applied to exactly one element. The CSS `background` property does everything the attribute did and considerably more.',
          },
          {
            type: 'demo',
            id: 'c-l33-d1',
            title: 'A tiled background and a covered one',
            body: 'The first panel tiles a small pattern. The second covers the panel with a larger gradient. Both are set entirely in CSS.',
            html: `<div class="tile">Tiled pattern, repeated to fill the panel.</div>
<div class="cover">A single large background, sized to cover.</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
.tile, .cover { padding: 1rem; border-radius: 8px; margin-bottom: 0.75rem; color: #0f172a; }
.tile {
  background-color: #e0f2fe;
  background-image: url("https://www.transparenttextures.com/patterns/15x15/light-grid.png");
  background-repeat: repeat;
}
.cover {
  background-image: linear-gradient(120deg, #0ea5e9, #1e3a8a);
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
}`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l33-h1',
            level: 3,
            body: 'The background properties',
          },
          {
            type: 'list',
            id: 'c-l33-l1',
            style: 'bullet',
            items: [
              '`background-image` — the image itself. Usually a url(), a gradient, or several layers separated by commas.',
              '`background-size` — `auto`, `cover` to fill while keeping the ratio, `contain` to fit inside, or explicit lengths.',
              '`background-repeat` — `repeat` is the default; `no-repeat`, `repeat-x` and `repeat-y` are the useful ones.',
              '`background-position` — where the image sits when there is leftover room.',
              '`background-attachment` — `scroll` (default), `fixed`, or `local`.',
            ],
          },
          {
            type: 'code',
            id: 'c-l33-c1',
            language: 'css',
            title: 'The shorthand, and the old attribute beside it',
            code: `/* obsolete: works, parses, should not be used */
<body background="pattern.png" bgcolor="#eef">
<body background="banner.jpg">

/* current: the same idea, expressed properly */
body {
  background-color: #eef;
  background-image: url("pattern.png");
  background-repeat: repeat;
}

/* the shorthand, in the usual order */
.hero {
  background: #0f172a url("hero.jpg") no-repeat center / cover;
}

/* several layers, first one on top */
.split {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)),
    url("hero.jpg");
  background-size: cover;
  color: white;
}`,
          },
          {
            type: 'warning',
            id: 'c-l33-w1',
            title: 'A background image is invisible to assistive technology',
            body: 'A background image has no alt attribute, because it is not an element. A screen reader cannot describe it, cannot find a link inside it, and cannot tell a user that it is there at all. If the image carries information, it must be an `img`. If it is decoration, that is exactly right.',
          },
          {
            type: 'tip',
            id: 'c-l33-t1',
            title: 'Backgrounds and printed pages',
            body: 'Browsers do not print background images by default, and users can turn them off entirely. Never put text that only exists against a background image somewhere the image might not appear — put it on a solid colour that meets contrast requirements on its own.',
          },
          {
            type: 'exercise',
            id: 'c-l33-x1',
            exercise: {
              id: 'ex-l33',
              instructions:
                'Give the panel a tiled background pattern and a background colour that still works if the image fails to load.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="panel">A panel with a patterned background.</div>\n',
                css: '.panel {\n  padding: 1rem;\n  border-radius: 8px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l33-t1',
                  label: 'The panel sets a background image',
                  body: 'return /background-image/.test(getComputedStyle(document.querySelector(".panel")).backgroundImage)',
                },
                {
                  id: 'ex-l33-t2',
                  label: 'The background image is tiled',
                  body:
                    'const s = getComputedStyle(document.querySelector(".panel")); return s.backgroundRepeat === "repeat" && s.backgroundImage !== "none"',
                },
                {
                  id: 'ex-l33-t3',
                  label: 'A background colour is set as well, so the text stays readable if the image fails',
                  body:
                    'const c = getComputedStyle(document.querySelector(".panel")).backgroundColor; return c !== "rgba(0, 0, 0, 0)" && c !== "transparent"',
                },
                {
                  id: 'ex-l33-t4',
                  label: 'The obsolete background attribute is not used',
                  body: 'return document.body.getAttribute("background") === null && !document.querySelector("[background]")',
                },
              ],
              hints: [
                'background-image takes a url(), and background-repeat controls the tiling.',
                'Setting a background-color alongside it is what makes the panel readable without the image.',
              ],
              solution: {
                html: '<div class="panel">A panel with a patterned background.</div>\n',
                css:
                  '.panel {\n  padding: 1rem;\n  border-radius: 8px;\n  background-color: #e0f2fe;\n  background-image: url("https://www.transparenttextures.com/patterns/15x15/light-grid.png");\n  background-repeat: repeat;\n}\n',
              },
              testNotes:
                'The last test is the habit worth forming. The HTML background attribute still renders, so nothing warns you that you have used it.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s23',
    title: 'The Picture Element',
    description: 'Serving different art direction and different file formats from one image slot.',
    lessons: [
      {
        id: 'html-l34',
        title: 'The Picture Element',
        description: 'picture, source and srcset, and the difference between art direction and format selection.',
        duration: 6,
        objectives: [
          'Use picture with source elements to offer alternative images',
          'Tell art direction apart from responsive format selection',
          'Explain when a plain img with srcset is enough',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l34',
          title: 'The Picture Element quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l34-q1',
              type: 'multiple-choice',
              prompt: 'How many img elements must a picture contain?',
              options: [
                'None',
                'Exactly one, as the fallback',
                'One per source',
                'As many as needed',
              ],
              answer: 1,
              explanation: 'The img is the fallback for browsers that do not support picture, and it carries the alt text for the whole set.',
            },
            {
              id: 'quiz-html-l34-q2',
              type: 'multiple-choice',
              prompt: 'Which of these is art direction rather than resolution switching?',
              options: [
                'Serving a 400w image on a small screen and a 1600w image on a large one',
                'Serving a portrait crop on a phone and a landscape crop on a desktop',
                'Serving an AVIF where supported and a JPEG otherwise',
                'Adding a width descriptor to srcset',
              ],
              answer: 1,
              explanation: 'Art direction changes the image itself. The others change only the encoding or the resolution of the same picture.',
            },
            {
              id: 'quiz-html-l34-q3',
              type: 'true-false',
              prompt: 'A picture element needs a sizes attribute on its img for resolution switching.',
              answer: false,
              explanation: 'For resolution switching, a plain img with srcset and sizes is simpler and is the recommended approach.',
            },
            {
              id: 'quiz-html-l34-q4',
              type: 'blank',
              prompt: 'Which attribute on a source element carries a MIME type condition?',
              answers: [
                'type',
              ],
              explanation: 'The first source whose type the browser can display is used.',
            },
            {
              id: 'quiz-html-l34-q5',
              type: 'multiple-choice',
              prompt: 'What problem appears when different sources show meaningfully different content?',
              options: [
                'The image fails to load',
                'The single alt text on the img can only describe one of them accurately',
                'The browser downloads every source',
                'The width descriptor becomes invalid',
              ],
              answer: 1,
              explanation: 'One img, one alt. If the variants differ in content, the description needs a caption or the markup is misleading one group of users.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l34-b1',
            body: 'The `<picture>` element gives an author control over which image the browser picks, and it does so before the image is fetched rather than after. It contains zero or more `<source>` elements and exactly one `<img>` fallback. The browser walks the sources in order, takes the first whose condition matches, and only downloads that one.',
          },
          {
            type: 'demo',
            id: 'c-l34-d1',
            title: 'Art direction: a different crop on a narrow screen',
            body: 'On a wide screen the browser loads the landscape image. Below 700px it loads the portrait crop instead. The img element is what a browser without picture support falls back to.',
            html: `<picture>
  <source media="(max-width: 700px)" srcset="https://picsum.photos/id/1015/600/900">
  <source media="(max-width: 1400px)" srcset="https://picsum.photos/id/1015/900/500">
  <img src="https://picsum.photos/id/1015/1400/700"
       alt="A river running between tall canyon walls" width="700" height="350">
</picture>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
picture img { width: 100%; height: auto; border-radius: 8px; display: block; }`,
            height: 300,
          },
          {
            type: 'heading',
            id: 'c-l34-h1',
            level: 3,
            body: 'Two different jobs',
          },
          {
            type: 'text',
            id: 'c-l34-b2',
            body: 'Art direction and format selection look similar in the markup and solve different problems. Art direction means the image itself should change — a different crop, a different composition, a different image entirely — because the wide version does not work in a narrow space. Format selection means the same picture is available in several encodings and the browser should take whichever it can display, usually a smaller modern format plus a fallback. Modern browsers can decode almost everything, so format selection via picture is now mostly a historical concern; art direction is the reason to reach for it.',
          },
          {
            type: 'code',
            id: 'c-l34-c1',
            language: 'html',
            title: 'Art direction, and format selection',
            code: `<!-- art direction: a different crop per breakpoint -->
<picture>
  <source media="(max-width: 700px)" srcset="portrait-600x900.jpg">
  <source media="(max-width: 1400px)" srcset="landscape-900x500.jpg">
  <img src="wide-1400x700.jpg" alt="A river between canyon walls" width="1400" height="700">
</picture>

<!-- format selection: same picture, better encodings first -->
<picture>
  <source type="image/avif" srcset="hero.avif">
  <source type="image/webp" srcset="hero.webp">
  <img src="hero.jpg" alt="A river between canyon walls" width="1400" height="700">
</picture>

<!-- responsive resolution: no picture needed, and this is the common case -->
<img src="photo-800.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 800px"
     alt="A river between canyon walls" width="800" height="533">`,
          },
          {
            type: 'list',
            id: 'c-l34-l1',
            style: 'bullet',
            items: [
              '`media` on a source is a media query. The first matching source wins.',
              '`type` on a source is a MIME type. The first type the browser says it can display wins.',
              '`srcset` inside picture takes one image per source, not a width-descriptor list.',
              '`sizes` belongs on the img and tells the browser how wide the image will render, so it can pick a candidate before layout.',
              'The img inside picture is mandatory, and its alt is the alt for the whole set.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l34-t1',
            title: 'Do not use picture for resolution switching',
            body: 'If the only thing changing is the file size, use srcset and sizes on a plain img. Wrapping that in picture adds an element and a second place for the description to go wrong, for no benefit.',
          },
          {
            type: 'warning',
            id: 'c-l34-w1',
            title: 'The alt text has to work for every source',
            body: 'A user on a wide screen and a user on a phone may see different images, and both are reading the same alt attribute. If the two images say meaningfully different things, the markup is lying to one of them, and the fix is a caption for the variant rather than a compromise alt.',
          },
          {
            type: 'exercise',
            id: 'c-l34-x1',
            exercise: {
              id: 'ex-l34',
              instructions:
                'Wrap the image in a picture element and offer a portrait version for narrow screens, keeping the wide image as the img fallback with its alt text.',
              languages: ['html'],
              starterCode: {
                html:
                  '<picture>\n  \n  <img src="https://picsum.photos/id/1015/1400/700" alt="A river running between tall canyon walls" width="700" height="350">\n</picture>\n',
              },
              tests: [
                {
                  id: 'ex-l34-t1',
                  label: 'There is a picture element',
                  body: 'return !!document.querySelector("picture")',
                },
                {
                  id: 'ex-l34-t2',
                  label: 'There is at least one source inside it',
                  body: 'return document.querySelectorAll("picture source").length >= 1',
                },
                {
                  id: 'ex-l34-t3',
                  label: 'The picture contains exactly one img',
                  body: 'return document.querySelectorAll("picture img").length === 1',
                },
                {
                  id: 'ex-l34-t4',
                  label: 'Every source has a srcset and a media or type condition',
                  body:
                    'return Array.from(document.querySelectorAll("picture source")).every(s => s.getAttribute("srcset") && (s.getAttribute("media") || s.getAttribute("type")))',
                },
                {
                  id: 'ex-l34-t5',
                  label: 'The fallback img still carries the alt text',
                  body:
                    'const i = document.querySelector("picture img"); return !!i && (i.getAttribute("alt") || "").length > 10',
                },
              ],
              hints: [
                'The source elements go before the img, not after it.',
                'A media condition is written as media="(max-width: 700px)".',
              ],
              solution: {
                html:
                  '<picture>\n  <source media="(max-width: 700px)" srcset="https://picsum.photos/id/1015/600/900">\n  <source media="(max-width: 1400px)" srcset="https://picsum.photos/id/1015/900/500">\n  <img src="https://picsum.photos/id/1015/1400/700" alt="A river running between tall canyon walls" width="700" height="350">\n</picture>\n',
              },
              testNotes:
                'The last test matters because the img is the fallback. If the alt text is only on a source, browsers that cannot use picture lose the description entirely.',
            },
          },
        ],
      },
    ],
  },
]
