import type { Section } from '~/types/content'

export const cssAdvancedBoxSections: Section[] = [
  {
    id: 'css-s43',
    title: 'CSS Rounded Corners',
    description: 'Elliptical corners, the four-value longhand, and clipping children with a radius.',
    lessons: [
      {
        id: 'css-l80',
        title: 'Rounded Corners',
        description: 'Use elliptical slash syntax and per-corner longhands, and see why large radii collapse.',
        duration: 7,
        objectives: [
          'Write the elliptical slash form of `border-radius`',
          'Set each corner independently with the four longhand properties',
          'Predict how a radius larger than half the box width is rendered',
          'Clip overflowing children with `overflow: hidden`',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l80',
          title: 'Rounded Corners quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l80-q1',
              type: 'multiple-choice',
              prompt: 'In `border-radius: 20px / 40px`, what is 40px?',
              options: [
                'The horizontal radius',
                'The vertical radius of the ellipse',
                'The corner size in both directions',
                'The border width',
              ],
              answer: 1,
              explanation: 'Everything before the slash is the horizontal radius and everything after it is the vertical radius.',
            },
            {
              id: 'quiz-css-l80-q2',
              type: 'true-false',
              prompt: 'A child element automatically inherits the rounded corners of its parent.',
              answer: false,
              explanation: '`border-radius` clips only the element it is set on. Children are clipped only by the parent\'s `overflow: hidden`.',
            },
            {
              id: 'quiz-css-l80-q3',
              type: 'code-output',
              prompt: 'What shape does this produce on a 100px square box?',
              code: '.box { border-radius: 50%; }',
              options: [
                'A square with slightly soft corners',
                'A circle',
                'A pill shape',
                'Nothing, percentages are not valid radii',
              ],
              answer: 1,
              explanation: 'A percentage radius resolves against the box width, so 50% of 100px is 50px on both axes — exactly half, which is a full circle.',
            },
            {
              id: 'quiz-css-l80-q4',
              type: 'blank',
              prompt: 'Complete the sentence: when two radii on a corner add up to more than the box measures, the browser ________ them proportionally.',
              answers: [
                'scales',
                'scaling',
                'scale',
              ],
              explanation: 'The overlap rule scales the radii down by a shared factor so the corner still fits inside the box.',
            },
            {
              id: 'quiz-css-l80-q5',
              type: 'multiple-choice',
              prompt: 'Which rule makes a rounded parent clip its children?',
              options: [
                'border-style: hidden',
                'overflow: hidden',
                'clip-radius: true',
                'box-clip: border-box',
              ],
              answer: 1,
              explanation: '`overflow: hidden` establishes the clip region that the parent\'s radius then applies to.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l80-b1',
            body: '`border-radius` accepts two lengths separated by a slash, and the pair defines an **ellipse** rather than a quarter circle. The value before the slash is the horizontal radius, the value after it is the vertical radius. Equal numbers give a circle; different numbers give a stretched one.',
          },
          {
            type: 'demo',
            id: 'c-l80-d1',
            title: 'Circle, ellipse, rounded rectangle',
            body: 'Three boxes of identical size. The first is a full circle at 50%, the second is an ellipse with different horizontal and vertical radii, the third is an ordinary rounded rectangle. All three clip their own child.',
            html: `<div class="row">
  <div class="shape circle">50%</div>
  <div class="shape ellipse">20px / 40px</div>
  <div class="shape rect">12px</div>
</div>`,
            css: `.row { display: flex; gap: 1.25rem; align-items: center; }
.shape { width: 120px; height: 120px; display: grid; place-items: center;
  background: #29e2bd; color: #0b0d10; font: 600 12px system-ui, sans-serif; overflow: hidden; }
.circle { border-radius: 50%; }
.ellipse { border-radius: 20px / 40px; }
.rect { border-radius: 12px; }`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l80-b2',
            body: 'The middle one is the point of this lesson: 20px horizontally, 40px vertically, so the browser draws an ellipse. A single value — `20px` on its own — means `20px / 20px`, a quarter circle of radius 20px.',
          },
          {
            type: 'heading',
            id: 'c-l80-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l80-c1',
            language: 'css',
            code: `.ellipse { border-radius: 20px / 40px; }
.per-corner { border-top-left-radius: 24px; border-top-right-radius: 4px;
  border-bottom-right-radius: 24px; border-bottom-left-radius: 4px; }
.clipped { border-radius: 16px; overflow: hidden; }`,
          },
          {
            type: 'list',
            id: 'c-l80-l1',
            style: 'bullet',
            items: [
              '**Slash form.** `border-radius: 30px / 60px;` sets the horizontal radius to 30px and the vertical radius to 60px on all four corners.',
              '**Value groups.** The shorthand takes one to four values on each side of the slash: `border-radius: 10px 20px 30px 40px / 5px 10px 15px 20px;` The first group is horizontal, the second vertical.',
              '**Order.** One value sets all four corners. Two set top-left/bottom-right, then top-right/bottom-left. Three go top-left, both others, bottom-right. Four go clockwise from the top-left.',
              '**Percentages.** A percentage radius resolves against the box size on its own axis, so `border-radius: 50%` is a circle on a square and an ellipse on a wide rectangle with no slash at all.',
              '**Overlap scaling.** When two radii on one corner add up to more than the box measures on that side, the browser scales both down by a shared factor rather than dropping either.',
              '**`50%` is the ceiling on each axis.** On a 100px-wide box it resolves to 50px, exactly half the width — the largest value that can be drawn before the scaling rule starts reducing it.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l80-t1',
            title: 'Rounded children need overflow: hidden',
            body: '`border-radius` clips the element\'s own background and border, not its children. An image or a coloured `div` inside a rounded box draws square corners right over the curve. `overflow: hidden` on the parent is what actually clips them, which is why so many component styles include it.',
          },
          {
            type: 'warning',
            id: 'c-l80-w1',
            title: 'A big radius is not a sharper circle',
            body: 'A large radius shrinks the straight part of the edge, so a 120px box at `60px` looks like a deliberate pill. Push it to `120px` and the overlap rule scales everything back down — you have not sharpened anything, you have quietly lost all four radii to the scale factor.',
          },
          {
            type: 'exercise',
            id: 'c-l80-x1',
            exercise: {
              id: 'ex-l80',
              instructions: 'Turn the tile into a circle using an elliptical radius pair, and make sure its child is clipped so it looks round too.',
              languages: ['css'],
              starterCode: {
                html: '<div class="tile"><span>Round me</span></div>',
                css: '.tile {\n  width: 140px;\n  height: 140px;\n  background: #29e2bd;\n  display: grid;\n  place-items: center;\n  font: 600 14px system-ui, sans-serif;\n}\n',
              },
              tests: [
                { id: 'ex-l80-t1', label: 'The tile uses a slash elliptical radius', body: 'return getComputedStyle(document.querySelector(".tile")).borderRadius.includes("/")' },
                { id: 'ex-l80-t2', label: 'The horizontal radius is 50% of the tile', body: 'return getComputedStyle(document.querySelector(".tile")).borderTopLeftRadius.startsWith("70")' },
                { id: 'ex-l80-t3', label: 'The child is clipped by the parent', body: 'return getComputedStyle(document.querySelector(".tile")).overflow === "hidden"' },
              ],
              hints: ['The slash sits between the horizontal and vertical radius, inside the same declaration.', 'A half-width horizontal radius turns a square into a circle. The tile is 140px wide, so that is 70px.', 'Try `border-radius: 70px / 70px; overflow: hidden;`'],
              solution: {
                html: '<div class="tile"><span>Round me</span></div>',
                css: '.tile {\n  width: 140px;\n  height: 140px;\n  background: #29e2bd;\n  display: grid;\n  place-items: center;\n  font: 600 14px system-ui, sans-serif;\n  border-radius: 70px / 70px;\n  overflow: hidden;\n}\n',
              },
              testNotes: 'The tests read `borderRadius` and `overflow` off the computed style of `.tile`.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s44',
    title: 'CSS Border Images',
    description: 'Slice a source image into a border, and control its width, outset and repetition.',
    lessons: [
      {
        id: 'css-l81',
        title: 'Border Images',
        description: 'Build a border out of slices of an image, and choose between `round` and `repeat`.',
        duration: 7,
        objectives: [
          'Slice a source image into nine regions with `border-image-slice`',
          'Scale the border independently of the border box with `border-image-width`',
          'Move the border outward with `border-image-outset`',
          'Predict the difference between `round` and `repeat` tiling',
        ],
        xp: 48,
        quiz: {
          id: 'quiz-css-l81',
          title: 'Border Images quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l81-q1',
              type: 'multiple-choice',
              prompt: 'How many regions does `border-image-slice` cut a source image into?',
              options: [
                '4',
                '6',
                '8',
                '9',
              ],
              answer: 3,
              explanation: 'Nine: four corners, four edges and a centre. The centre is only used when the middle slice is stretched.',
            },
            {
              id: 'quiz-css-l81-q2',
              type: 'true-false',
              prompt: '`border-image` needs a real image file to work.',
              answer: false,
              explanation: 'Any paintable image counts, including `linear-gradient` and `repeating-linear-gradient`.',
            },
            {
              id: 'quiz-css-l81-q3',
              type: 'code-output',
              prompt: 'What is missing from this rule?',
              code: '.box {\n  border-image-slice: 16;\n  border-image-repeat: round;\n}',
              options: [
                'Nothing, it is valid',
                'The slice needs a unit',
                'A `border-image-source`',
                '`round` is not a valid value',
              ],
              answer: 2,
              explanation: 'Without a source there is nothing to slice. You also normally set a `border-width` so there is space to draw in.',
            },
            {
              id: 'quiz-css-l81-q4',
              type: 'blank',
              prompt: 'Complete the sentence: `border-image-repeat: round` keeps whole tiles and adjusts them to ________ the available space.',
              answers: [
                'fit',
                'fill',
              ],
              explanation: '`round` divides the edge into a whole number of tiles, adjusting their size slightly so nothing is clipped.',
            },
            {
              id: 'quiz-css-l81-q5',
              type: 'multiple-choice',
              prompt: 'What does `border-image-outset` do?',
              options: [
                'Moves the border outward without affecting layout',
                'Makes the border thicker',
                'Adds space inside the border',
                'Repeats the image more often',
              ],
              answer: 0,
              explanation: 'Outset draws the border further from the padding edge. It is a painting offset, not a layout one.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l81-b1',
            body: '`border-image` replaces the drawn border with slices of an image. The source is cut into nine pieces — four corners, four edges, one centre — and the corners and edges are painted where the border would normally be.',
          },
          {
            type: 'demo',
            id: 'c-l81-d1',
            title: 'The same source, four repetition modes',
            body: 'All four frames use the same striped gradient, sliced into thirds. Only `border-image-repeat` differs: the first stretches one tile across the edge, the second fits whole tiles, the third clips the last one at each edge, and the fourth spreads the leftover as gaps.',
            html: `<div class="frame stretch">stretch</div>
<div class="frame round">round</div>
<div class="frame repeat">repeat</div>
<div class="frame space">space</div>`,
            css: `.frame { width: 200px; padding: 0.9rem; margin-bottom: 0.6rem;
  color: #f4f7fa; font: 600 13px system-ui, sans-serif; background: #0b0d10;
  border: 14px solid transparent;
  border-image-source: repeating-linear-gradient(45deg, #29e2bd 0 10px, #1b2028 10px 20px);
  border-image-slice: 12; }
.stretch { border-image-repeat: stretch; }
.round { border-image-repeat: round; }
.repeat { border-image-repeat: repeat; }
.space { border-image-repeat: space; }`,
            height: 340,
          },
          {
            type: 'text',
            id: 'c-l81-b2',
            body: '`stretch` is the default and scales the middle slice to cover the edge. `round` keeps the tile size and adds as many whole copies as fit, so the pattern is never squashed. `repeat` keeps the tile size but clips the final copy at the edges, and `space` fits whole tiles and turns the leftover into gaps.',
          },
          {
            type: 'heading',
            id: 'c-l81-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l81-c1',
            language: 'css',
            code: `.panel {
  border: 20px solid transparent;
  border-image-source: repeating-linear-gradient(45deg, #29e2bd 0 10px, #1b2028 10px 20px);
  border-image-slice: 12;
  border-image-width: 20px;
  border-image-outset: 6px;
  border-image-repeat: round;
}`,
          },
          {
            type: 'list',
            id: 'c-l81-l1',
            style: 'bullet',
            items: [
              '**`border-image-source`** — any image the browser can paint, gradients included, so nothing has to load from the network.',
              '**`border-image-slice`** — how far in from each edge to cut, in `px` for all four sides or `%` for all four, or a one-to-four value group. The centre ninth is only used for `stretch`.',
              '**`border-image-width`** — how thick the drawn border is. It defaults to the value of `border-width`, takes one to four numbers or percentages, and is independent of `border-style`.',
              '**`border-image-outset`** — pushes the drawn border outward, away from the padding edge, without changing layout. Useful for decorative frames that should not eat the element\'s space.',
              '**`border-image-repeat`** — `stretch`, `repeat`, `round` or `space`, and you can give one value for the edges and another for the corners: `round stretch;`.',
              '**The border has to exist first.** `border: 20px solid transparent;` reserves the space, otherwise `border-image` has nothing to draw inside.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l81-t1',
            title: 'Slices do not scale with the element',
            body: 'Cuts are pixels on the source image. A 90px nine-patch sliced at 30 gives you 30px corners at any element width while the middle stretches — that is why a decorative frame keeps working at any size while the corner detail stays fixed.',
          },
          {
            type: 'warning',
            id: 'c-l81-w1',
            title: 'round and repeat are not interchangeable',
            body: '`round` divides the edge into a whole number of tiles, so stripes stay square and the corners land on a tile boundary. `repeat` clips the final tile, so a stripe that is halfway through at one edge continues halfway through at the corner — a visible broken seam on anything patterned.',
          },
          {
            type: 'exercise',
            id: 'c-l81-x1',
            exercise: {
              id: 'ex-l81',
              instructions: 'Give the box a gradient border image: a `repeating-linear-gradient` source, a slice, and `round` repetition so the pattern is never clipped.',
              languages: ['css'],
              starterCode: {
                html: '<div class="badge">Framed</div>',
                css: '.badge {\n  display: inline-block;\n  padding: 1rem 1.5rem;\n  background: #0b0d10;\n  color: #f4f7fa;\n  font: 600 14px system-ui, sans-serif;\n  border: 16px solid transparent;\n}\n',
              },
              tests: [
                { id: 'ex-l81-t1', label: 'A border image source is set', body: 'return getComputedStyle(document.querySelector(".badge")).borderImageSource.includes("gradient")' },
                { id: 'ex-l81-t2', label: 'A slice value is set', body: 'return getComputedStyle(document.querySelector(".badge")).borderImageSlice !== "0%"' },
                { id: 'ex-l81-t3', label: 'Repetition is round, not repeat', body: 'return getComputedStyle(document.querySelector(".badge")).borderImageRepeat.includes("round")' },
              ],
              hints: ['You need three declarations: `border-image-source`, `border-image-slice` and `border-image-repeat`.', 'A gradient is a valid source, so no image file is needed at all.', 'Try `border-image-source: repeating-linear-gradient(45deg, #29e2bd 0 8px, #0b0d10 8px 16px); border-image-slice: 16; border-image-repeat: round;`'],
              solution: {
                html: '<div class="badge">Framed</div>',
                css: '.badge {\n  display: inline-block;\n  padding: 1rem 1.5rem;\n  background: #0b0d10;\n  color: #f4f7fa;\n  font: 600 14px system-ui, sans-serif;\n  border: 16px solid transparent;\n  border-image-source: repeating-linear-gradient(45deg, #29e2bd 0 8px, #0b0d10 8px 16px);\n  border-image-slice: 16;\n  border-image-repeat: round;\n}\n',
              },
              testNotes: 'The tests read `borderImageSource`, `borderImageSlice` and `borderImageRepeat` from the computed style of `.badge`.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s45',
    title: 'CSS Backgrounds',
    description: 'Layer several backgrounds at once, and understand which layer paints on top.',
    lessons: [
      {
        id: 'css-l82',
        title: 'Backgrounds',
        description: 'Stack multiple background layers with per-layer position, size and repeat, and read them right.',
        duration: 8,
        objectives: [
          'Write a multi-layer background with one comma-separated value per layer',
          'Use the `position / size` slash syntax inside a single layer',
          'Explain why the first layer listed paints on top',
          'Set per-layer repeat and size with list-aware values',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l82',
          title: 'Backgrounds quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l82-q1',
              type: 'multiple-choice',
              prompt: 'With three background layers, which one paints on top?',
              options: [
                'The last one in the list',
                'The first one in the list',
                'Whichever has the largest background-size',
                'The order does not matter',
              ],
              answer: 1,
              explanation: 'Layers paint in list order with the first on top — the opposite of how you read the CSS aloud.',
            },
            {
              id: 'quiz-css-l82-q2',
              type: 'true-false',
              prompt: 'The slash in `center / cover` separates position from size.',
              answer: true,
              explanation: 'Everything before the slash positions the image, everything after it scales it.',
            },
            {
              id: 'quiz-css-l82-q3',
              type: 'code-output',
              prompt: 'How many layers does this declare?',
              code: '.box {\n  background-image: linear-gradient(red, blue), linear-gradient(green, yellow);\n}',
              options: [
                '1',
                '2',
                '3',
                '4',
              ],
              answer: 1,
              explanation: 'One layer per comma-separated value, so there are two.',
            },
            {
              id: 'quiz-css-l82-q4',
              type: 'blank',
              prompt: 'Complete the sentence: with three layers but only one value in `background-position`, the other two layers fall back to ________.',
              answers: [
                '0% 0%',
                '0 0',
                'top left',
              ],
              explanation: 'Value lists are never distributed across layers. Anything omitted resets to the initial value.',
            },
            {
              id: 'quiz-css-l82-q5',
              type: 'identify-error',
              prompt: 'The photo is meant to sit behind a dark scrim so white text stays readable, but the scrim hides the photo completely. What is wrong?',
              code: '.card {\n  background-image: linear-gradient(rgb(0 0 0 / 0.6), rgb(0 0 0 / 0.6)), url(\'/hero.jpg\');\n  background-size: cover;\n}',
              options: [
                'Nothing, the gradient is already behind the image',
                'The first layer paints on top, so the gradient has to be listed after the url()',
                '`background-image` cannot combine gradients and urls',
                'The url() has to be written in a separate declaration',
              ],
              answer: 1,
              explanation: 'Layer order runs the opposite way to how the declaration reads: the first comma-separated value is painted on top of the second. So a scrim belongs last. This is the single most common layer-order bug, and it is why the first question in this set asks about it at all.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l82-b1',
            body: 'An element can carry more than one background image, written as a comma-separated list. The catch that catches everybody is the order: the **first** layer in the list is painted **on top**, not underneath.',
          },
          {
            type: 'demo',
            id: 'c-l82-d1',
            title: 'Two layers, two orders',
            body: 'Both boxes stack the same two gradients and the declaration order is swapped. In the first, teal is listed first and covers the grid. In the second, the grid is listed first and the teal shows through it.',
            html: `<div class="stack top-first">teal listed first</div>
<div class="stack grid-first">grid listed first</div>`,
            css: `.stack { width: 260px; height: 110px; margin-bottom: 0.75rem;
  border: 1px solid #d5dae0; border-radius: 10px; background-repeat: no-repeat; }
.top-first { background-image:
    radial-gradient(circle at 30% 40%, #29e2bd 0 90px, transparent 100px),
    repeating-linear-gradient(0deg, #dfe4ea 0 1px, transparent 1px 14px),
    repeating-linear-gradient(90deg, #dfe4ea 0 1px, transparent 1px 14px); }
.grid-first { background-image:
    repeating-linear-gradient(0deg, #dfe4ea 0 1px, transparent 1px 14px),
    repeating-linear-gradient(90deg, #dfe4ea 0 1px, transparent 1px 14px),
    radial-gradient(circle at 30% 40%, #29e2bd 0 90px, transparent 100px); }`,
            height: 280,
          },
          {
            type: 'text',
            id: 'c-l82-b2',
            body: 'Same three gradients, opposite result. The first one in the list wins the paint order, so put the layer you want visible at the front and push decorative textures to the back.',
          },
          {
            type: 'heading',
            id: 'c-l82-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l82-c1',
            language: 'css',
            code: `.hero {
  background-image:
    radial-gradient(circle at 50% 30%, #29e2bd, transparent 70%),
    linear-gradient(180deg, #0b0d10, #141922);
  background-position: center top, center bottom;
  background-size: cover, cover;
  background-repeat: no-repeat, no-repeat;
}`,
          },
          {
            type: 'list',
            id: 'c-l82-l1',
            style: 'bullet',
            items: [
              '**The shorthand.** `background: url(...) center / cover no-repeat, url(...) left top / 50% auto repeat;` — one comma-separated value per layer, in the same order as `background-image`.',
              '**The slash syntax.** Position and size are written together as `position / size`: `center / cover`, `left top / 40px 40px`, `0 0 / 100% 100%`.',
              '**One value means one layer.** `background-size: cover;` alone applies to every layer. To vary them, write `background-size: cover, auto;` — and write one value per layer, because lists are never distributed across layers.',
              '**The last layer sits behind `background-color`.** Any transparent area in the final layer lets the `background-color` show through underneath all of them.',
              '**`repeat` is per layer too.** `background-repeat: no-repeat, repeat-x;` tiles the second layer horizontally only.',
              '**`origin` versus `clip`.** `background-origin` decides which box the image is positioned from (default `padding-box`); `background-clip` decides which box crops it (default `border-box`).',
            ],
          },
          {
            type: 'tip',
            id: 'c-l82-t1',
            title: 'One position value, one layer',
            body: 'The most common multi-layer bug is giving `background-position` fewer values than there are layers. With three layers and one position, the other two fall back to `0% 0%` and the layers land in the corner. Write one value per layer, or leave the shorthand alone and use the longhands.',
          },
          {
            type: 'warning',
            id: 'c-l82-w1',
            title: 'An invisible layer still counts',
            body: 'A fully transparent layer occupies a slot in the list, shifts the positions of everything after it, and costs a paint pass. If a layer is not visible, delete it — and remember that means re-indexing the matching position, size and repeat lists.',
          },
          {
            type: 'exercise',
            id: 'c-l82-x1',
            exercise: {
              id: 'ex-l82',
              instructions: 'Stack two background layers on the box: a `repeating-linear-gradient` grid listed first, and a flat fill listed second so the grid sits on top of it.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">Two layers</div>',
                css: '.card {\n  width: 220px;\n  height: 120px;\n  padding: 1rem;\n  border-radius: 10px;\n  color: #f4f7fa;\n  font: 600 14px system-ui, sans-serif;\n}\n',
              },
              tests: [
                { id: 'ex-l82-t1', label: 'Both gradient layers were declared', body: 'const img = getComputedStyle(document.querySelector(".card")).backgroundImage; return img.split("gradient").length - 1 >= 2' },
                { id: 'ex-l82-t2', label: 'The layers repeat', body: 'return getComputedStyle(document.querySelector(".card")).backgroundRepeat.includes("repeat")' },
                { id: 'ex-l82-t3', label: 'The card is actually painted', body: 'return getComputedStyle(document.querySelector(".card")).backgroundColor !== "rgba(0, 0, 0, 0)"' },
              ],
              hints: ['One `background-image` declaration holds the whole list, separated by commas.', 'The layer you want on top goes first; the flat fill goes last as the base.', 'Try `background-image: repeating-linear-gradient(45deg, #29e2bd 0 8px, #0b0d10 8px 16px), linear-gradient(#141922, #141922); background-repeat: repeat, no-repeat;`'],
              solution: {
                html: '<div class="card">Two layers</div>',
                css: '.card {\n  width: 220px;\n  height: 120px;\n  padding: 1rem;\n  border-radius: 10px;\n  color: #f4f7fa;\n  font: 600 14px system-ui, sans-serif;\n  background-image:\n    repeating-linear-gradient(45deg, #29e2bd 0 8px, #0b0d10 8px 16px),\n    linear-gradient(#141922, #141922);\n  background-size: 16px 16px, cover;\n  background-repeat: repeat, no-repeat;\n  background-color: #141922;\n}\n',
              },
              testNotes: 'The tests read `backgroundImage` and `backgroundRepeat` and check that both gradient layers survived the parse.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s46',
    title: 'CSS Colors',
    description: 'Mixing, deriving and switching colours at runtime, and knowing what is safe today.',
    lessons: [
      {
        id: 'css-l83',
        title: 'Colors',
        description: 'Blend colours with `color-mix()`, switch themes with `light-dark()`, and see where relative colour is at.',
        duration: 8,
        objectives: [
          'Blend two existing colours with `color-mix()` and pick a percentage',
          'Switch between light and dark values with `light-dark()` and `color-scheme`',
          'Describe what relative colour syntax does and why it is not yet safe to rely on',
          'Mix in `oklab` rather than `srgb` for a perceptually even result',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l83',
          title: 'Colors quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l83-q1',
              type: 'multiple-choice',
              prompt: 'In `color-mix(in oklab, teal, black 30%)`, how much black is in the result?',
              options: [
                '30%',
                '70%',
                '50%',
                '15%',
              ],
              answer: 0,
              explanation: 'The percentage always describes the second colour, whichever order they are listed in.',
            },
            {
              id: 'quiz-css-l83-q2',
              type: 'true-false',
              prompt: '`light-dark()` responds to the theme even if nothing declares `color-scheme`.',
              answer: false,
              explanation: 'It falls back to the light value. You need `color-scheme: light dark` for it to actually respond.',
            },
            {
              id: 'quiz-css-l83-q3',
              type: 'code-output',
              prompt: 'What does this produce?',
              code: '.a { color-scheme: light dark; }\n.b { color: light-dark(#111, #eee); }',
              options: [
                'Always #111',
                'Always #eee',
                '#111 in a light scheme, #eee in a dark one',
                'An invalid value, discarded',
              ],
              answer: 2,
              explanation: '`light-dark()` takes the first value for light and the second for dark, based on the computed `color-scheme`.',
            },
            {
              id: 'quiz-css-l83-q4',
              type: 'blank',
              prompt: 'Complete the sentence: relative colour syntax, like `rgb(from ... r g b)`, is best described as ________-edge today.',
              answers: [
                'cutting',
                'bleeding',
              ],
              explanation: 'It is shipping, but support is narrower than `color-mix()` and `light-dark()`, so keep a static fallback declaration.',
            },
            {
              id: 'quiz-css-l83-q5',
              type: 'multiple-choice',
              prompt: 'Why is `oklab` a better mix space than `srgb`?',
              options: [
                'It is faster to compute',
                'It mixes in a perceptually even space, so a 50% mix looks like a 50% mix',
                'It supports more colour formats',
                'It is the only one available',
              ],
              answer: 1,
              explanation: 'Averaging raw sRGB channels does not match perceived lightness, which is why `srgb` mixes go muddy through the middle.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l83-b1',
            body: 'Modern CSS can compute a colour instead of hard-coding one. `color-mix()` blends two colours you already have, and `light-dark()` picks between two values based on the active colour scheme. Both take the maintenance work out of theming.',
          },
          {
            type: 'demo',
            id: 'c-l83-d1',
            title: 'A swatch scale built by mixing',
            body: 'Every swatch is the same two base colours mixed at a different percentage — the percentage is how much of the second colour, near-black, is present. The badge below also uses `light-dark()`, so it follows the page theme.',
            html: `<div class="swatches">
  <div class="sw" style="--p: 20%"><span>20%</span></div>
  <div class="sw" style="--p: 40%"><span>40%</span></div>
  <div class="sw" style="--p: 60%"><span>60%</span></div>
  <div class="sw" style="--p: 80%"><span>80%</span></div>
</div>
<p class="note">The badge uses <code>light-dark()</code>.</p>
<span class="badge">Theme aware</span>`,
            css: `.swatches { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.sw { flex: 1; height: 70px; display: grid; place-items: center; border-radius: 8px;
  background: color-mix(in oklab, #29e2bd, #0b0d10 var(--p));
  color: #f4f7fa; font: 600 13px system-ui, sans-serif; }
.note { margin: 0 0 0.5rem; font: 400 14px system-ui, sans-serif; color: #3a424d; }
.badge { display: inline-block; padding: 0.4rem 0.85rem; border-radius: 999px;
  color-scheme: light dark;
  background: light-dark(#0b0d10, #29e2bd);
  color: light-dark(#f4f7fa, #0b0d10);
  font: 600 13px system-ui, sans-serif; }`,
            height: 300,
          },
          {
            type: 'text',
            id: 'c-l83-b2',
            body: 'Change `--p` in one place and the whole scale moves, because every swatch is a mix of the same two literals. That is the maintenance win: one brand colour produces every tint and shade you need without a colour picker.',
          },
          {
            type: 'heading',
            id: 'c-l83-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l83-c1',
            language: 'css',
            code: `:root {
  color-scheme: light dark;
  --brand: #29e2bd;
  --ink: #0b0d10;
  --surface: light-dark(#ffffff, #141922);
  --text: light-dark(#0b0d10, #f4f7fa);
  --accent: color-mix(in oklab, var(--brand), var(--ink) 20%);
}
.button {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--accent);
}`,
          },
          {
            type: 'list',
            id: 'c-l83-l1',
            style: 'bullet',
            items: [
              '**`color-mix(in oklab, A, B)`** — the first argument is the colour space. `oklab` mixes in a perceptually even space, so a 50% mix looks like a 50% mix; `srgb` averages raw channel values and goes muddy in the middle.',
              '**The percentage is the second colour.** `color-mix(in oklab, red, blue 25%)` is one quarter blue. Leave it off and you get an even 50/50.',
              '**`light-dark(light, dark)`** — returns the first value when the used `color-scheme` is light, the second when it is dark. It does nothing until something sets `color-scheme`.',
              '**`color-scheme: light dark`** on an element resolves `light-dark()` and also switches form controls, scrollbars and the default canvas colours. Putting it on `:root` is what makes the whole page themable.',
              '**Relative colour syntax** — `rgb(from var(--brand) r g b / 50%)` derives a new colour from an existing one and can adjust individual channels, including with `calc()`.',
              '**Both work inside custom properties.** `color-mix()` and `light-dark()` are valid values for a custom property, so one variable can drive an entire scale.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l83-t1',
            title: 'Mix in oklab, not srgb',
            body: 'Averaging sRGB channels does not match what the eye does. Mix teal into black in `srgb` and you get a dark, slightly grey green; mix it in `oklab` and the lightness drops cleanly with the hue intact. Every engine that supports `color-mix()` supports `oklab`, so there is no reason to reach for `srgb`.',
          },
          {
            type: 'warning',
            id: 'c-l83-w1',
            title: 'Relative colour is still cutting-edge',
            body: '`color-mix()` and `light-dark()` are broadly available in current evergreen browsers and safe to ship with a plain declaration in front as a fallback. Relative colour syntax — anything with a `from` keyword inside a colour function — has far narrower support. Write it, test it, and keep a static colour on the line above so older engines get the old value rather than nothing.',
          },
          {
            type: 'exercise',
            id: 'c-l83-x1',
            exercise: {
              id: 'ex-l83',
              instructions: 'Build the button background by mixing `#29e2bd` toward `#0b0d10` with `color-mix()`, and declare `color-scheme` on the root so the theme-aware text colour resolves.',
              languages: ['css'],
              starterCode: {
                html: '<button class="cta" type="button">Mix me</button>',
                css: ':root {\n  \n}\n\n.cta {\n  padding: 0.6rem 1.1rem;\n  border: 0;\n  border-radius: 8px;\n  font: 600 14px system-ui, sans-serif;\n  color: light-dark(#0b0d10, #0b0d10);\n}\n',
              },
              tests: [
                { id: 'ex-l83-t1', label: 'The button background resolves to a real colour', body: 'const c = getComputedStyle(document.querySelector(".cta")).backgroundColor; return c !== "rgba(0, 0, 0, 0)" && c !== "transparent"' },
                { id: 'ex-l83-t2', label: 'The root declares a color-scheme', body: 'const cs = getComputedStyle(document.documentElement).colorScheme; return cs.includes("light") || cs.includes("dark")' },
                { id: 'ex-l83-t3', label: 'The background is a dark tint, not the pure brand colour', body: 'const c = getComputedStyle(document.querySelector(".cta")).backgroundColor; return c !== "rgb(41, 226, 189)"' },
              ],
              hints: ['`color-mix()` needs a colour space, then two colours with a percentage on the second.', 'The percentage is how much of the second colour to use, so 30% means 30% of `#0b0d10`.', 'Try `:root { color-scheme: light dark; }` and `.cta { background: color-mix(in oklab, #29e2bd, #0b0d10 30%); }`'],
              solution: {
                html: '<button class="cta" type="button">Mix me</button>',
                css: ':root {\n  color-scheme: light dark;\n}\n\n.cta {\n  padding: 0.6rem 1.1rem;\n  border: 0;\n  border-radius: 8px;\n  font: 600 14px system-ui, sans-serif;\n  background: color-mix(in oklab, #29e2bd, #0b0d10 30%);\n  color: light-dark(#0b0d10, #0b0d10);\n}\n',
              },
              testNotes: 'The tests read the resolved `backgroundColor` and the root `colorScheme`. Test 1 fails while the button is still transparent.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s47',
    title: 'CSS Color Keywords',
    description: 'Named colours, system colours, currentColor, and what transparent really is.',
    lessons: [
      {
        id: 'css-l84',
        title: 'Color Keywords',
        description: 'Use named and system colour keywords, and see `currentColor` and `transparent` behaving as they really do.',
        duration: 6,
        objectives: [
          'Name the keyword groups: basic, extended, and system colours',
          'Use system colours so a component follows the operating system',
          'Propagate one colour into a border and a pseudo-element with `currentColor`',
          'Explain why `transparent` and a zero-alpha colour behave differently',
        ],
        xp: 42,
        quiz: {
          id: 'quiz-css-l84',
          title: 'Color Keywords quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l84-q1',
              type: 'multiple-choice',
              prompt: 'What does `currentColor` resolve to?',
              options: [
                'The colour of the nearest parent element',
                'The element\'s own computed `color` value',
                'Black',
                'The value of `border-color`',
              ],
              answer: 1,
              explanation: 'It resolves to whatever `color` has computed to on that element, which for a pseudo-element is the originating element\'s value.',
            },
            {
              id: 'quiz-css-l84-q2',
              type: 'true-false',
              prompt: '`transparent` is the same as not setting a background at all.',
              answer: false,
              explanation: '`transparent` is `rgba(0, 0, 0, 0)` — a real colour with zero alpha, with a computed value that affects transitions.',
            },
            {
              id: 'quiz-css-l84-q3',
              type: 'code-output',
              prompt: 'A button fades from `transparent` to `white`. What does it pass through?',
              code: '.btn { background: transparent; }\n.btn:hover { background: white; }',
              options: [
                'White',
                'Black, then grey',
                'Nothing, it just appears',
                'A teal tint',
              ],
              answer: 1,
              explanation: 'The browser interpolates from transparent black, so the RGB channels climb from 0 through grey to white.',
            },
            {
              id: 'quiz-css-l84-q4',
              type: 'blank',
              prompt: 'Complete the sentence: the system colour keyword for the default button surface is ________.',
              answers: [
                'ButtonFace',
              ],
              explanation: '`ButtonFace` and `ButtonText` follow the operating system theme, which is what makes a custom button look native.',
            },
            {
              id: 'quiz-css-l84-q5',
              type: 'multiple-choice',
              prompt: 'Why use `currentColor` for a border instead of repeating the hex code?',
              options: [
                'It renders faster',
                'One value drives the text, the border and any pseudo-elements together',
                'Hex codes are invalid in `border-color`',
                'It removes the need for a `border-style`',
              ],
              answer: 1,
              explanation: 'Change `color` once and everything painted with the keyword follows — including SVG strokes and pseudo-elements.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l84-b1',
            body: 'A colour keyword is a name instead of a number. `red`, `rebeccapurple` and `CanvasText` are all valid colour values, and `currentColor` is a keyword meaning "whatever `color` this element has already computed to".',
          },
          {
            type: 'demo',
            id: 'c-l84-d1',
            title: 'One value, four places',
            body: 'The card sets `color: #7aa2f7` once. The text, the border, the arrow built with `::after`, and the swatch inside it all pick up that one value through `currentColor`. The button uses system colours, so it follows the OS theme instead.',
            html: `<div class="card">
  <h4>currentColor</h4>
  <p>One colour, inherited by the text, the border and the arrow.</p>
  <span class="dot"></span>
  <button class="sys" type="button">ButtonFace</button>
</div>`,
            css: `.card { color: #7aa2f7; width: 300px; padding: 1.25rem;
  border: 2px solid currentColor; border-radius: 12px;
  font: 500 14px/1.5 system-ui, sans-serif; background: #10151d; }
.card h4 { margin: 0 0 0.3rem; font-size: 15px; color: currentColor; }
.card p { margin: 0 0 1rem; color: currentColor; }
.card::after { content: ""; display: block; width: 0; height: 0; margin-top: 1rem;
  border-left: 12px solid currentColor;
  border-top: 8px solid transparent; border-bottom: 8px solid transparent; }
.dot { display: inline-block; width: 0.8em; height: 0.8em; border-radius: 50%;
  background: currentColor; margin-bottom: 1rem; }
.sys { color: ButtonText; background: ButtonFace; border: 1px solid ButtonBorder;
  border-radius: 6px; padding: 0.4rem 0.8rem; font: 500 13px system-ui, sans-serif; }`,
            height: 330,
          },
          {
            type: 'text',
            id: 'c-l84-b2',
            body: 'Change `color` on the card and every one of those moves together. That is the whole argument for `currentColor`: one value, no duplicated hex codes, and the component still works when the colour was inherited from further up the tree.',
          },
          {
            type: 'heading',
            id: 'c-l84-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l84-c1',
            language: 'css',
            code: `.badge { color: seagreen; border: 1px solid currentColor; }
.badge::before { content: ""; display: inline-block;
  width: 0.6em; height: 0.6em; border-radius: 50%; background: currentColor; }
.fade-safe { background: rgba(255, 255, 255, 0); }
.fade-broken { background: transparent; }`,
          },
          {
            type: 'list',
            id: 'c-l84-l1',
            style: 'bullet',
            items: [
              '**Basic keywords** — `transparent`, `currentColor`, and the sixteen colours from CSS2: `aqua`, `black`, `blue`, `fuchsia`, `gray`, `green`, `lime`, `maroon`, `navy`, `olive`, `purple`, `red`, `silver`, `teal`, `white`, `yellow`.',
              '**Extended keywords** — roughly 148 more, like `rebeccapurple`, `cornflowerblue`, `tomato` and `slategray`. They are case-insensitive, and `gray` and `grey` both work.',
              '**System colours** — `Canvas`, `CanvasText`, `LinkText`, `ButtonFace`, `ButtonText`, `ButtonBorder`, `Field`, `FieldText`, `Highlight`, `SelectedItem`. These follow the operating system theme, which is exactly what you want for something that should look native.',
              '**`currentColor`** — resolves to the element\'s own computed `color`. On a `::before` or `::after` it resolves to the originating element\'s `color`, since a pseudo-element has no colour of its own until you set one.',
              '**`transparent`** — defined as `rgba(0, 0, 0, 0)`: a colour with zero alpha, not the absence of a colour. That distinction is what makes transitions through it go dark.',
              '**Inheritance** — `color` is an inherited property, so `currentColor` on a child picks up whatever the parent resolved to, however many levels up it was set.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l84-t1',
            title: 'currentColor is the cheapest state you will ever write',
            body: 'A button that changes colour on hover needs no `:hover` background or border rule at all if both use `currentColor` — set `color` on hover and everything painted with the keyword follows. It is the same trick that lets an SVG icon inherit its stroke from the surrounding text colour.',
          },
          {
            type: 'warning',
            id: 'c-l84-w1',
            title: 'transparent is not the same as no background',
            body: '`transparent` is `rgba(0, 0, 0, 0)`. Transitioning from it to `white` makes the element fade through **black** and then through grey, because the browser interpolates the RGB channels from zero. Start from `rgba(255, 255, 255, 0)` instead and the fade runs through white.',
          },
          {
            type: 'exercise',
            id: 'c-l84-x1',
            exercise: {
              id: 'ex-l84',
              instructions: 'Set one `color` on the note and make the border and the `::before` dot use `currentColor`, so a single declaration paints all three.',
              languages: ['css'],
              starterCode: {
                html: '<div class="note">One colour, three places</div>',
                css: '.note {\n  width: 240px;\n  padding: 1rem;\n  border: 2px solid #8b95a3;\n  border-radius: 10px;\n  font: 600 14px system-ui, sans-serif;\n}\n',
              },
              tests: [
                { id: 'ex-l84-t1', label: 'The border picks up currentColor', body: 'const s = getComputedStyle(document.querySelector(".note")); return s.borderTopColor === s.color' },
                { id: 'ex-l84-t2', label: 'The ::before dot is painted with the same colour', body: 'const s = getComputedStyle(document.querySelector(".note")); return getComputedStyle(document.querySelector(".note"), "::before").backgroundColor === s.color' },
                { id: 'ex-l84-t3', label: 'The note colour changed from the default grey', body: 'return getComputedStyle(document.querySelector(".note")).color === "rgb(122, 162, 247)"' },
              ],
              hints: ['Set the colour once with `color`, then reference it everywhere else with the `currentColor` keyword.', 'The `::before` needs a `content` value as well as a `background`, or nothing renders.', 'Try `color: #7aa2f7; border: 2px solid currentColor;` plus `.note::before { content: ""; display: inline-block; width: 0.7em; height: 0.7em; border-radius: 50%; background: currentColor; }`'],
              solution: {
                html: '<div class="note">One colour, three places</div>',
                css: '.note {\n  width: 240px;\n  padding: 1rem;\n  border: 2px solid currentColor;\n  border-radius: 10px;\n  font: 600 14px system-ui, sans-serif;\n  color: #7aa2f7;\n}\n.note::before {\n  content: "";\n  display: inline-block;\n  width: 0.7em;\n  height: 0.7em;\n  margin-right: 0.5rem;\n  border-radius: 50%;\n  background: currentColor;\n}\n',
              },
              testNotes: 'The tests compare resolved colour strings. `currentColor` computes to the same `rgb()` value as `color`, which is what makes the comparison pass.',
            },
          },
        ],
      },
    ],
  },
]
