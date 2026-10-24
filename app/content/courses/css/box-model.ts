import type { Section } from '~/types/content'

export const cssBoxSections: Section[] = [
  {
    id: 'css-s11',
    title: 'CSS Padding',
    description: 'The space inside the border, the four sides and their shorthand, and why padding carries the element\'s background colour.',
    lessons: [
      {
        id: 'css-l24',
        title: 'Padding',
        description: 'Padding is the ring of space between the content and the border, and it takes the element\'s background colour with it.',
        duration: 5,
        objectives: [
          'Set padding on individual sides and with the shorthand',
          'Explain why padding, unlike margin, is filled with the element\'s background colour',
          'Choose whether to write a value or a percentage for a given side',
        ],
        xp: 30,
        quiz: {
          id: 'quiz-css-l24',
          title: 'Padding quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l24-q1',
              type: 'multiple-choice',
              prompt: 'Where does padding draw relative to the border?',
              options: [
                'Outside the border, as transparent space',
                'Inside the border, between content and border',
                'Under the text only',
                'On top of the border, covering it',
              ],
              answer: 1,
              explanation: 'Padding lives inside the border, filling the gap between the content and the border edge. Margin lives outside the border.',
            },
            {
              id: 'quiz-css-l24-q2',
              type: 'true-false',
              prompt: 'Padding takes the element\'s background colour with it.',
              answer: true,
              explanation: 'The background paints across the content and padding areas. Margin stays transparent and shows whatever sits behind the element.',
            },
            {
              id: 'quiz-css-l24-q3',
              type: 'code-output',
              prompt: 'With `padding: 1rem 2rem;`, which sides get 2rem?',
              code: 'div { padding: 1rem 2rem; }',
              options: [
                'top and bottom',
                'left and right',
                'all four',
                'top and left',
              ],
              answer: 1,
              explanation: 'Two values mean vertical then horizontal, so top and bottom are 1rem while left and right are 2rem.',
            },
            {
              id: 'quiz-css-l24-q4',
              type: 'multiple-choice',
              prompt: 'What happens to a box\'s total rendered size when you add padding?',
              options: [
                'It shrinks',
                'It stays exactly the same',
                'It grows',
                'It changes colour',
              ],
              answer: 2,
              explanation: 'Padding pushes the border outward, so the box occupies more space on the page even though the content size is unchanged.',
            },
            {
              id: 'quiz-css-l24-q5',
              type: 'blank',
              prompt: 'Padding is INSIDE the border and takes the element\'s ________ colour.',
              answers: [
                'background',
              ],
              explanation: 'That is the difference from margin: padding is painted with the element\'s background, margin is not.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l24-b1',
            body: 'Padding is the space inside an element\'s border, between the content and the border edge. It pushes the border out from the content, and it takes the element\'s background colour with it.',
          },
          {
            type: 'demo',
            id: 'c-l24-d1',
            title: 'Padding space versus margin space',
            body: 'Two boxes, same border and same background. The left grows from padding — its background colour fills the new space. The right grows from margin — that space is transparent and shows the grey frame, because margin never borrows the element\'s colour.',
            html: `<div class="pair">
  <div class="box padded">Padded<br><span class="note">background fills the padding</span></div>
  <div class="box margined">Margined<br><span class="note">margin stays transparent</span></div>
</div>`,
            css: `.pair {
  display: flex;
  gap: 1.5rem;
  background: #e5e7eb;
  padding: 1.5rem;
  border-radius: 10px;
}
.box {
  border: 2px solid #374151;
  background: #bbf7d0;
  font-size: 13px;
  border-radius: 6px;
}
.padded {
  padding: 2rem;
}
.margined {
  margin: 2rem;
  padding: 0.75rem;
}
.note {
  display: block;
  margin-top: 0.5rem;
  font-size: 11px;
  color: #374151;
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l24-b2',
            body: 'Padding is INSIDE the border and takes the element\'s background colour with it. Margin is OUTSIDE the border, transparent, and pushes other elements away. That is the single most useful distinction when two spaces look the same.',
          },
          {
            type: 'heading',
            id: 'c-l24-h1',
            level: 3,
            body: 'The four sides and the shorthand',
          },
          {
            type: 'code',
            id: 'c-l24-c1',
            language: 'css',
            title: 'Padding, one side at a time and all at once',
            code: `.box {
  padding-top: 1rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
}

.box {
  padding: 1rem 2rem;
}`,
          },
          {
            type: 'list',
            id: 'c-l24-l1',
            style: 'bullet',
            items: [
              '**`padding-top` / `padding-right` / `padding-bottom` / `padding-left`** — each side, in that fixed clockwise order: top, right, bottom, left.',
              '**`padding`** — the shorthand. One value sets all four. Two values set vertical then horizontal. Three set top, horizontal, bottom. Four set every side explicitly.',
              '**Values** — any length unit: `px`, `rem`, `em`, `%`. Percentages resolve against the element\'s own width, even for `padding-top` and `padding-bottom`.',
              '**Background fills it** — padding takes the element\'s `background-color`, so the colour extends to the border edge.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l24-t1',
            title: 'Padding makes things bigger, not smaller',
            body: 'Adding padding grows the box\'s total footprint, because the background extends into it. If a fixed-width layout is drifting off the right edge, look at padding before you blame the width.',
          },
          {
            type: 'exercise',
            id: 'c-l24-x1',
            exercise: {
              id: 'ex-l24',
              instructions: 'Add padding so the text inside the card has room to breathe on all sides, and make the background a soft mint so the padded area is obvious. Use the class rule, not an inline style.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">A padded card</div>',
                css: '.card {\n  background: #ecfdf5;\n  border: 2px solid #29e2bd;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l24-t1',
                  label: 'The top padding is greater than zero',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".card")).paddingTop) > 0',
                },
                {
                  id: 'ex-l24-t2',
                  label: 'The background is a soft mint',
                  body: 'const bg = getComputedStyle(document.querySelector(".card")).backgroundColor; return bg === "rgb(236, 253, 245)" || bg === "rgb(224, 255, 247)"',
                },
                {
                  id: 'ex-l24-t3',
                  label: 'Padding is equal on all four sides',
                  body: 'const s = getComputedStyle(document.querySelector(".card")); return s.paddingTop === s.paddingRight && s.paddingRight === s.paddingBottom && s.paddingBottom === s.paddingLeft',
                },
              ],
              hints: [
                'The shorthand `padding: 1rem;` sets all four sides at once.',
                'The background already fills the padding area for you.',
                'Try `padding: 1rem;`',
              ],
              solution: {
                html: '<div class="card">A padded card</div>',
                css: '.card {\n  background: #ecfdf5;\n  border: 2px solid #29e2bd;\n  padding: 1rem;\n}\n',
              },
              testNotes: 'The tests read the computed style of `.card`. `1rem` resolves to `16px` at the default root font size.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s12',
    title: 'CSS Height/Width',
    description: 'Setting and clamping the size of a box, why a fixed height on text is usually wrong, and the content-box default.',
    lessons: [
      {
        id: 'css-l25',
        title: 'Height/Width',
        description: 'The `width` and `height` properties, the `min-`/`max-` prefixes that clamp them, and why text does not like a fixed height.',
        duration: 6,
        objectives: [
          'Set and clamp width and height with the min/max prefixes',
          'Explain why `height` on a paragraph usually clips or overflows its text',
          'State what box the `width` value sizes by default',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l25',
          title: 'Height/Width quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l25-q1',
              type: 'multiple-choice',
              prompt: 'Which property puts a ceiling on a width?',
              options: [
                'min-width',
                'max-width',
                'width',
                'width-limit',
              ],
              answer: 1,
              explanation: '`max-width` is a ceiling: it lets the box grow up to a point, then refuses to grow further. `min-width` is a floor.',
            },
            {
              id: 'quiz-css-l25-q2',
              type: 'true-false',
              prompt: 'By default, `width` sets the size of the content box only.',
              answer: true,
              explanation: 'Under the default `content-box`, `width` is the content width. Padding and border are added on top of it.',
            },
            {
              id: 'quiz-css-l25-q3',
              type: 'code-output',
              prompt: 'What is the common purpose of this rule on an image?',
              code: '.img { max-width: 100%; }',
              options: [
                'It crops the image',
                'It makes the image 100% wide always',
                'It stops the image overflowing a narrow screen',
                'It hides the image',
              ],
              answer: 2,
              explanation: '`max-width: 100%` lets the image shrink to fit a container that is narrower than the image, stopping it from overflowing.',
            },
            {
              id: 'quiz-css-l25-q4',
              type: 'multiple-choice',
              prompt: 'Why is setting a fixed `height` on a paragraph usually a mistake?',
              options: [
                'It sets the font size',
                'Text can overflow or get clipped when it wraps',
                'It prevents scrolling',
                'It hides the element',
              ],
              answer: 1,
              explanation: 'A fixed height is a fixed box. When the text wraps to a new line it either spills over or gets clipped by overflow.',
            },
            {
              id: 'quiz-css-l25-q5',
              type: 'blank',
              prompt: 'A width declared as a percentage is always resolved against the element\'s ________, which for width is the containing block\'s content width.',
              answers: [
                'containing block',
              ],
              explanation: 'Percentages on width resolve against the containing block, not against the element itself.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l25-b1',
            body: 'The `width` and `height` properties set the size of an element\'s content box — the space its text or images actually occupy.',
          },
          {
            type: 'demo',
            id: 'c-l25-d1',
            title: 'A 200 by 80 content box',
            body: 'This element is declared 200px wide and 80px tall. That is the content area. With the default `content-box`, padding and border add on top of those numbers.',
            html: `<div class="demo-box">200 x 80</div>`,
            css: `.demo-box {
  width: 200px;
  height: 80px;
  background: #e0f2fe;
  border: 2px solid #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #0c2a4d;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l25-b2',
            body: 'That is 200px of content width and 80px of content height. With the default `content-box`, padding and border are added on top of those numbers, so the box on screen is larger than 200 x 80.',
          },
          {
            type: 'heading',
            id: 'c-l25-h1',
            level: 3,
            body: 'Capping and flooring a size',
          },
          {
            type: 'code',
            id: 'c-l25-c1',
            language: 'css',
            title: 'Width and its four clamps',
            code: `.boxed {
  width: 200px;
  min-width: 250px;
  max-width: 150px;
  height: 80px;
  min-height: 60px;
  max-height: 120px;
}`,
          },
          {
            type: 'list',
            id: 'c-l25-l1',
            style: 'bullet',
            items: [
              '**`width` / `height`** — content-box by default. The starting dimensions; padding and border grow the total box.',
              '**`min-width` / `min-height`** — a floor. `min-width: max-content` makes a box as wide as its content needs; `min-width: 0` is what defeats flexbox shrinking.',
              '**`max-width` / `max-height`** — a ceiling. `max-width: 100%` is the trick that keeps images from overflowing a narrow screen.',
              '**`auto` is not allowed as a value** — you cannot write `min-width: auto`. Use a length, a percentage, or `none`.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l25-w1',
            title: 'A fixed height on text is usually wrong',
            body: 'Text flows with the font size and the line height, and a fixed `height` is a fixed box — extra lines get clipped or spill over the edge. Set a `min-height` if you need a floor, or let the content decide the height at all.',
          },
          {
            type: 'example',
            id: 'c-l25-e1',
            title: 'Fixed height cutting text off',
            body: 'This paragraph is held to 80px of height with `overflow: hidden`, so the lines that do not fit disappear.',
            html: `<div class="box">This paragraph is held to 80px of height, so the lines that do not fit are clipped away by the overflow rule.</div>`,
            css: `.box {
  width: 240px;
  height: 80px;
  overflow: hidden;
  background: #fee2e2;
  border: 2px solid #b91c1c;
  padding: 0.5rem;
  font-size: 13px;
  line-height: 1.4;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l25-x1',
            exercise: {
              id: 'ex-l25',
              instructions: 'The card below should take up half the available width, but never shrink below 180px and never grow wider than 500px. Set `width`, `min-width` and `max-width` on `.card`.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">Responsive width</div>',
                css: '.card {\n  background: #dcfce7;\n  border: 2px solid #16a34a;\n  padding: 1rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l25-t1',
                  label: 'The floor is 180px',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".card")).minWidth) === 180',
                },
                {
                  id: 'ex-l25-t2',
                  label: 'The ceiling is 500px',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".card")).maxWidth) === 500',
                },
                {
                  id: 'ex-l25-t3',
                  label: 'A 50% width rule exists on the card',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /\.card\\s*\\{[^}]*width:\\s*50%/.test(css)',
                },
              ],
              hints: [
                '`width: 50%` sets the content width as half the parent.',
                '`min-width: 180px;` and `max-width: 500px;` clamp it.',
                'Remember: width sizes the content box by default.',
              ],
              solution: {
                html: '<div class="card">Responsive width</div>',
                css: '.card {\n  background: #dcfce7;\n  border: 2px solid #16a34a;\n  padding: 1rem;\n  width: 50%;\n  min-width: 180px;\n  max-width: 500px;\n}\n',
              },
              testNotes: 'The tests read the computed `min-width` and `max-width` (resolving to pixels) and confirm a `width: 50%` rule exists on `.card`.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s13',
    title: 'CSS Box Model',
    description: 'The four concentric layers of every box, the content-box default that breaks sizing, and the `border-box` reset that fixes it.',
    lessons: [
      {
        id: 'css-l26',
        title: 'Box Model',
        description: 'Content, padding, border and margin as four layers, the `box-sizing` property that decides which of them the width counts, and the reset that ends the argument.',
        duration: 7,
        objectives: [
          'Identify all four layers of the box model on a rendered element',
          'State which layer `width` and `height` size, and how that differs between content-box and border-box',
          'Apply the `box-sizing: border-box` reset and explain what it changes',
        ],
        xp: 55,
        quiz: {
          id: 'quiz-css-l26',
          title: 'Box Model quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l26-q1',
              type: 'multiple-choice',
              prompt: 'Which layer is sized directly by `width` and `height`?',
              options: [
                'Padding',
                'Border',
                'Content',
                'Margin',
              ],
              answer: 2,
              explanation: 'Width and height set the content box. The padding, border and margin are added around it — unless box-sizing changes the rules.',
            },
            {
              id: 'quiz-css-l26-q2',
              type: 'true-false',
              prompt: 'A `border-box` element with `width: 200px`, `padding: 20px` and `border: 5px` is exactly 200px wide in total.',
              answer: true,
              explanation: 'Under `border-box`, the width includes padding and border, so the rendered width stays at 200px.',
            },
            {
              id: 'quiz-css-l26-q3',
              type: 'code-output',
              prompt: 'What does this reset change for every element?',
              code: '* { box-sizing: border-box; }',
              options: [
                'It removes all margins',
                'It makes width include padding and border',
                'It sets height to auto',
                'It hides overflow',
              ],
              answer: 1,
              explanation: '`box-sizing: border-box` makes the declared width include padding and border, so a 200px box stays 200px wide.',
            },
            {
              id: 'quiz-css-l26-q4',
              type: 'multiple-choice',
              prompt: 'Where is the element\'s `background-color` visible?',
              options: [
                'Only in the content area',
                'In the content and padding areas',
                'In the margin area',
                'Nowhere; background never shows',
              ],
              answer: 1,
              explanation: 'The background paints across the content and padding areas. Margin stays transparent and shows whatever sits behind the element.',
            },
            {
              id: 'quiz-css-l26-q5',
              type: 'blank',
              prompt: 'Reading a box from the inside out, the order is content, ________, border, margin.',
              answers: [
                'padding',
              ],
              explanation: 'The four layers in order: content, padding, border, margin. Width and height size the innermost one.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l26-b1',
            body: 'Every element on a web page is a rectangle, and each rectangle is built from four concentric layers: content, padding, border and margin. Width and height set the content. Everything else adds a ring around it.',
          },
          {
            type: 'demo',
            id: 'c-l26-d1',
            title: 'The box model, seen edge on',
            body: 'A single box seen from the outside in. The transparent margin ring reveals the grey frame. Inside it the dark ring is the border, the light blue ring is padding, and the solid blue centre is the content. Each label names the layer it sits in.',
            html: `<div class="frame">
  <div class="layer margin">
    <span class="label">margin</span>
    <div class="layer border">
      <span class="label">border</span>
      <div class="layer padding">
        <span class="label">padding</span>
        <div class="layer content">
          <span class="label">content</span>
          content box
        </div>
      </div>
    </div>
  </div>
</div>`,
            css: `.frame {
  background: #d1d5db;
  padding: 2rem;
  border-radius: 10px;
  display: inline-block;
}
.layer {
  position: relative;
  border-radius: 6px;
}
.margin {
  margin: 32px;
}
.border {
  border: 12px solid #374151;
}
.padding {
  background: #93c5fd;
  padding: 28px;
}
.content {
  background: #1e3a8a;
  color: #fff;
  padding: 18px;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}
.label {
  position: absolute;
  top: 2px;
  right: 6px;
  font: 700 10px/1.1 monospace;
  color: #fff;
  text-shadow: 0 0 2px #000;
}`,
            height: 240,
          },
          {
            type: 'text',
            id: 'c-l26-b2',
            body: 'Read a box from the outside in: margin pushes it away from its neighbours, border draws the line around it, padding gives the content breathing room, and content is where the text and images actually live. Width and height size only the content.',
          },
          {
            type: 'heading',
            id: 'c-l26-h1',
            level: 3,
            body: 'The four layers',
          },
          {
            type: 'code',
            id: 'c-l26-c1',
            language: 'css',
            title: 'The CSS that drew the diagram',
            code: `.frame { background: #d1d5db; padding: 2rem; }
.margin { margin: 32px; }
.border { border: 12px solid #374151; }
.padding { background: #93c5fd; padding: 28px; }
.content { background: #1e3a8a; padding: 18px; }`,
          },
          {
            type: 'list',
            id: 'c-l26-l1',
            style: 'bullet',
            items: [
              '**content** — the text, image or whatever you put inside the element. `width` and `height` set the size of this box only.',
              '**padding** — the ring between content and border. It is filled by the element\'s `background-color` and expands the visible area of the box.',
              '**border** — the line drawn around the padding. It has a width, a style and a colour, and it sits between padding and margin.',
              '**margin** — the transparent gap to the element\'s neighbours. It is never filled by the element\'s own background and pushes everything else away.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l26-t1',
            title: 'Vertical margins collapse',
            body: 'The top margin of one block and the bottom margin of the block next to it collapse into the larger of the two — they do not add up. It is why the gap between paragraphs is not double the gap under each one.',
          },
          {
            type: 'example',
            id: 'c-l26-e1',
            title: 'content-box versus border-box',
            body: 'Both boxes here are declared 200px wide, with 24px of padding and a 12px border. The red one is `content-box`: its real width is 200 + 48 + 24 = 272px. The green one is `border-box`: its real width is exactly 200px, with the padding and border eating into the content area.',
            html: `<div class="pair">
  <div class="cbox">content-box</div>
  <div class="bbox">border-box</div>
</div>`,
            css: `.pair {
  display: flex;
  gap: 2rem;
  background: #f3f4f6;
  padding: 1.5rem;
  border-radius: 10px;
}
.cbox, .bbox {
  width: 200px;
  padding: 24px;
  border: 12px solid #4b5563;
  background: #e5e7eb;
  font-size: 13px;
  text-align: center;
  line-height: 1.4;
}
.cbox { box-sizing: content-box; border-color: #ef4444; }
.bbox { box-sizing: border-box; border-color: #22c55e; }`,
            showPreview: true,
          },
          {
            type: 'heading',
            id: 'c-l26-h2',
            level: 3,
            body: 'The reset that makes width mean width',
          },
          {
            type: 'text',
            id: 'c-l26-b3',
            body: 'By default every element is `content-box`, which is why widths drift wider than you expect once padding and border enter the picture. The fix is a one-line reset that switches every element to `border-box`, so a declared width is the width you get.',
          },
          {
            type: 'code',
            id: 'c-l26-c2',
            language: 'css',
            title: 'The universal box-sizing reset',
            code: `*,
*::before,
*::after {
  box-sizing: border-box;
}`,
          },
          {
            type: 'warning',
            id: 'c-l26-w1',
            title: 'Set the reset first, not on individual rules',
            body: 'If you put `box-sizing: border-box` only on the elements you happen to style, the ones you forget inherit `content-box` and quietly misbehave. The reset must come before everything else, so the whole document agrees on what a width means.',
          },
          {
            type: 'text',
            id: 'c-l26-b4',
            body: 'With that reset in place, `200px` means `200px` wide no matter the padding, and the layout bugs that come from a width that grows on you disappear.',
          },
          {
            type: 'exercise',
            id: 'c-l26-x1',
            exercise: {
              id: 'ex-l26',
              instructions: 'The box below is sized with `content-box`, so its padding and border push it wider than 200px. Switch it to `border-box` so 200px means 200px, and let the tests confirm the box model has flipped.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">200px box</div>',
                css: '.card {\n  width: 200px;\n  padding: 24px;\n  border: 12px solid #4b5563;\n  background: #e5e7eb;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l26-t1',
                  label: 'The box uses border-box',
                  body: 'return getComputedStyle(document.querySelector(".card")).boxSizing === "border-box"',
                },
                {
                  id: 'ex-l26-t2',
                  label: 'The rendered width is exactly 200px',
                  body: 'return document.querySelector(".card").offsetWidth === 200',
                },
                {
                  id: 'ex-l26-t3',
                  label: 'Padding and border are still applied',
                  body: 'const s = getComputedStyle(document.querySelector(".card")); return parseFloat(s.paddingTop) === 24 && parseFloat(s.borderTopWidth) === 12',
                },
              ],
              hints: [
                'One property: `box-sizing: border-box`.',
                'With `border-box`, the declared `width` includes padding and border — check `offsetWidth` to see it.',
                'Under the old `content-box`, offsetWidth would read 272px for this box.',
              ],
              solution: {
                html: '<div class="card">200px box</div>',
                css: '.card {\n  width: 200px;\n  padding: 24px;\n  border: 12px solid #4b5563;\n  background: #e5e7eb;\n  box-sizing: border-box;\n}\n',
              },
              testNotes: 'The first test reads the computed `box-sizing`. The second checks `offsetWidth`, which for `border-box` equals the declared `width` of 200px — it would be 272px under `content-box`.',
            },
          },
        ],
      },
    ],
  },
]
