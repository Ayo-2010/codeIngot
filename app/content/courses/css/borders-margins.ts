import type { Section } from '~/types/content'

export const cssBorderMarginSections: Section[] = [
  {
    id: 'css-s9',
    title: 'CSS Borders',
    description: 'Drawing edges around a box: which side, how thick, what colour, and how to round the corners.',
    lessons: [
      {
        id: 'css-l16',
        title: 'Borders',
        description: 'The three properties every border needs, the rule that silently produces nothing, and why a border changes an element outer size.',
        duration: 7,
        objectives: [
          'Set a visible border with border-style, border-width and border-color',
          'Explain why a border-width with no border-style renders nothing',
          'Predict how a border changes the outer size of a fixed-width element',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l16',
          title: 'Borders quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l16-q1',
              type: 'true-false',
              prompt: 'Adding a 10px border to an element declared as `width: 200px` leaves its outer size at 200px.',
              answer: false,
              explanation: 'The border is drawn inside the declared width, so the outer size becomes 220px and the content area shrinks by 20px.',
            },
            {
              id: 'quiz-css-l16-q2',
              type: 'multiple-choice',
              prompt: 'What is the initial value of `border-color`?',
              options: [
                '`black`',
                '`currentColor`',
                '`transparent`',
                '`medium`',
              ],
              answer: 1,
              explanation: 'A styled border with no colour uses `currentColor`, which resolves to the element text colour. Most simple borders therefore need no colour declaration.',
            },
            {
              id: 'quiz-css-l16-q3',
              type: 'multiple-choice',
              prompt: 'Where does a border sit in the box model?',
              options: [
                'Outside the padding, inside the margin',
                'Inside the content area',
                'Inside the margin but outside the background',
                'Between the margin and the viewport',
              ],
              answer: 0,
              explanation: 'The border wraps the padding box, and the margin wraps the border. A background paints through the padding and under the border, but never into the margin.',
            },
            {
              id: 'quiz-css-l16-q4',
              type: 'multiple-choice',
              prompt: 'What is the initial value of `border-width`?',
              options: [
                '`thin`',
                '`0`',
                '`medium`',
                '`1px`',
              ],
              answer: 2,
              explanation: '`medium` is the initial width, but it only becomes visible once a border style is set. The keyword resolves to a browser-chosen size, typically about 3px.',
            },
            {
              id: 'quiz-css-l16-q5',
              type: 'multiple-choice',
              prompt: 'Which of these is not a `border-style` value?',
              options: [
                '`dashed`',
                '`groove`',
                '`round`',
                '`double`',
              ],
              answer: 2,
              explanation: '`round` is not a border style; rounding corners is done with `border-radius`. The style keywords include solid, dashed, dotted, double, groove and ridge.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l16-b1',
            body: 'A border is a line drawn around the edge of an element, between the padding and the outside world. It is made of three properties — `border-width`, `border-style` and `border-color` — and all three must be involved before anything appears.',
          },
          {
            type: 'demo', id: 'c-l16-d1',
            title: 'A bordered box beside an unbordered one',
            body: 'Two boxes of the same declared width. The left one has a 3px solid blue border, the right one has none.',
            html: `<div class="row"><div class="box">3px solid #1f6feb</div><div class="box plain">no border</div></div>`,
            css: `.row { display: flex; gap: 1.5rem; }
.box { width: 140px; padding: 1rem; border: 3px solid #1f6feb; }
.plain { border: none; background: #f2f4f7; }`,
            height: 150,
          },
          {
            type: 'text', id: 'c-l16-b2',
            body: 'Both boxes declare 140px, yet the left one is 6px wider on screen. A border is drawn inside the space the element already occupies, so adding one shrinks the content area unless you account for it.',
          },
          { type: 'heading', id: 'c-l16-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l16-c1', language: 'css',
            code: 'div {\n  border-width: 3px;\n  border-style: solid;\n  border-color: #1f6feb;\n}',
          },
          {
            type: 'list', id: 'c-l16-l1', style: 'bullet',
            items: [
              '`border-style` decides whether a border is drawn at all: `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, or `none`.',
              '`border-width` sets the thickness. Its initial value is `medium`, but it is useless without a style.',
              '`border-color` sets the colour. Its initial value is `currentColor`, so a styled border with no colour takes the text colour.',
              'A border is drawn inside the declared width, so `width: 200px` plus `border: 10px solid` gives an outer size of 220px.',
            ],
          },
          {
            type: 'warning', id: 'c-l16-w1',
            title: 'border-style is not optional',
            body: 'Setting only `border-width` and `border-color` produces nothing at all. `border-style` defaults to `none`, and a `none` border ignores its width and colour entirely. This is the most common reason a border fails to appear.',
          },
          {
            type: 'text', id: 'c-l16-b3',
            body: 'Because `border-style` starts at `none`, declaration order does not rescue you: if the last style declaration on an element is `none`, you have no border. Set the style once, then change width and colour freely after it.',
          },
          {
            type: 'exercise', id: 'c-l16-x1',
            exercise: {
              id: 'ex-l16',
              instructions: 'Give the box below a visible solid blue border 2px wide on every side.',
              languages: ['css'],
              starterCode: { html: '<div class="box">Box</div>', css: '.box {\n  \n}\n' },
              tests: [
                { id: 'ex-l16-t1', label: 'The box has a solid border', body: 'return getComputedStyle(document.querySelector(".box")).borderTopStyle === "solid"' },
                { id: 'ex-l16-t2', label: 'The border is 2px wide', body: 'return parseFloat(getComputedStyle(document.querySelector(".box")).borderTopWidth) === 2' },
                { id: 'ex-l16-t3', label: 'All four sides match', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderTopWidth === s.borderLeftWidth && s.borderRightWidth === "2px" && s.borderBottomWidth === "2px"' },
              ],
              hints: [
                'All three longhand properties are needed: `border-width`, `border-style`, `border-color`.',
                'Width plus colour draws nothing, because `border-style` starts as `none`.',
                'Try `border: 2px solid #1f6feb;`',
              ],
              solution: { html: '<div class="box">Box</div>', css: '.box {\n  border-width: 2px;\n  border-style: solid;\n  border-color: #1f6feb;\n}\n' },
              testNotes: 'The tests read the computed `border-style` and `border-width` of `.box`.',
            },
          },
        ],
      },
      {
        id: 'css-l17',
        title: 'Border Width',
        description: 'The thin, medium and thick keywords, how they relate in size, and when a length beats a keyword.',
        duration: 4,
        objectives: [
          'Set border thickness with the thin, medium and thick keywords',
          'Explain why a length such as 5px overrides all three keywords',
          'Use the side longhands to change one edge only',
        ],
        xp: 30,
        quiz: {
          id: 'quiz-css-l17',
          title: 'Border Width quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l17-q1',
              type: 'multiple-choice',
              prompt: 'You set `border-width: 4px` and `border-color: red` but no border appears. Why?',
              options: [
                'border-color does not accept hex or named colours',
                'border-width must be in rem, not px',
                'border-style is still `none`, so nothing is drawn',
                'The border is painted behind the background',
              ],
              answer: 2,
              explanation: '`border-style` decides whether a border exists at all. Its initial value is `none`, and a `none` border ignores width and colour entirely.',
            },
            {
              id: 'quiz-css-l17-q2',
              type: 'multiple-choice',
              prompt: 'Which lists the border-width keywords from thinnest to thickest?',
              options: [
                'medium, thin, thick',
                'thin, medium, thick',
                'thin, thick, medium',
                'medium, thick, thin',
              ],
              answer: 1,
              explanation: 'The browser maps thin, medium and thick to increasing widths, typically around 1px, 3px and 5px, though the exact pixels are not guaranteed.',
            },
            {
              id: 'quiz-css-l17-q3',
              type: 'multiple-choice',
              prompt: 'What does `border-width: 2px 8px` set?',
              options: [
                '2px on top and bottom, 8px on left and right',
                '2px on left and right, 8px on top and bottom',
                '2px on top, 8px on the other three sides',
                'A 2px border with an 8px radius',
              ],
              answer: 0,
              explanation: 'With two values the first is top and bottom and the second is left and right, following the same clockwise shorthand pattern as margin and padding.',
            },
            {
              id: 'quiz-css-l17-q4',
              type: 'code-output',
              prompt: 'These declarations run in order. What is the final border width on every side?',
              code: '.box {\n  border-style: solid;\n  border-width: 2px;\n  border-width: thick;\n}',
              options: [
                '2px',
                'thick on all sides, typically about 5px',
                '2px on top and thick on the other sides',
                'The border is dropped',
              ],
              answer: 1,
              explanation: '`border-width` is a shorthand for all four sides, so the later keyword replaces the earlier 2px everywhere. Order matters when two declarations target the same sides.',
            },
            {
              id: 'quiz-css-l17-q5',
              type: 'true-false',
              prompt: 'The pixel sizes of `thin`, `medium` and `thick` are guaranteed to be 1px, 3px and 5px in every browser.',
              answer: false,
              explanation: 'The keywords are relative to each other; browsers choose the actual values, commonly around 1px, 3px and 5px. Use an explicit length when a design specifies exact pixels.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l17-b1',
            body: 'Border thickness comes in three named sizes — `thin`, `medium` and `thick` — and you can also give an exact length like `5px`. The keywords are relative to each other, not guaranteed pixel values.',
          },
          {
            type: 'demo', id: 'c-l17-d1',
            title: 'thin, medium and thick on the same element',
            body: 'Three boxes with identical style and colour, differing only in the border width keyword.',
            html: `<div class="row"><div class="box thin">thin</div><div class="box medium">medium</div><div class="box thick">thick</div></div>`,
            css: `.row { display: flex; gap: 1.25rem; }
.box { flex: 1; padding: 0.9rem; border-style: solid; border-color: #1f6feb; }
.thin { border-width: thin; }
.medium { border-width: medium; }
.thick { border-width: thick; }`,
            height: 140,
          },
          {
            type: 'text', id: 'c-l17-b2',
            body: 'The three frames are visibly different sizes. `thin` is typically 1px, `medium` about 3px, `thick` about 5px — starting values the browser chooses, not promises.',
          },
          { type: 'heading', id: 'c-l17-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l17-c1', language: 'css',
            code: '.card {\n  border-style: solid;\n  border-width: 1px 3px;\n}',
          },
          {
            type: 'list', id: 'c-l17-l1', style: 'bullet',
            items: [
              '`border-width: thin | medium | thick`, or any length or percentage.',
              'One value sets all four sides, two set top/bottom then left/right, three and four run clockwise from the top.',
              'A length beats a keyword: `border-width: 8px` makes every side 8px whatever keyword you set earlier.',
              '`border-top-width`, `border-right-width`, `border-bottom-width` and `border-left-width` change one side only.',
            ],
          },
          {
            type: 'tip', id: 'c-l17-t1',
            title: 'Keywords for UI, lengths for design files',
            body: 'A keyword border follows the platform default, which is right for a form control. When a design file specifies 1px or 2px, use the number — a keyword will not reliably land on the value someone drew.',
          },
          {
            type: 'text', id: 'c-l17-b3',
            body: 'Ordering is the other trap. A later `border-width: thick` overwrites an earlier `border-width: 2px` entirely, because `border-width` is a shorthand for all four sides.',
          },
          {
            type: 'exercise', id: 'c-l17-x1',
            exercise: {
              id: 'ex-l17',
              instructions: 'Give the box a 5px solid border on top and a 1px solid border on the other three sides.',
              languages: ['css'],
              starterCode: { html: '<div class="box">Box</div>', css: '.box {\n  border-style: solid;\n  border-color: #1f6feb;\n}\n' },
              tests: [
                { id: 'ex-l17-t1', label: 'The top border is 5px', body: 'return parseFloat(getComputedStyle(document.querySelector(".box")).borderTopWidth) === 5' },
                { id: 'ex-l17-t2', label: 'The other three sides are 1px', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderRightWidth === "1px" && s.borderBottomWidth === "1px" && s.borderLeftWidth === "1px"' },
              ],
              hints: [
                'Set the top with `border-top-width`, then a `border-width` that comes after it.',
                'Order matters: the later declaration wins for the sides they share.',
                'Try `border-top-width: 5px; border-width: 1px;`',
              ],
              solution: { html: '<div class="box">Box</div>', css: '.box {\n  border-style: solid;\n  border-color: #1f6feb;\n  border-top-width: 5px;\n  border-width: 1px;\n}\n' },
              testNotes: 'The tests read the computed `border-*-width` values of `.box`.',
            },
          },
        ],
      },
      {
        id: 'css-l18',
        title: 'Border Color',
        description: 'Colouring a border per side, and the currentColor keyword that ties it to the text.',
        duration: 5,
        objectives: [
          'Set a border colour with named colours, hex, rgb or hsl values',
          'Colour one side differently with the border-*-color longhands',
          'Use currentColor to make a border follow the text colour automatically',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-css-l18',
          title: 'Border Color quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l18-q1',
              type: 'multiple-choice',
              prompt: 'What does `border-color: currentColor` use?',
              options: [
                'The browser default link colour',
                'The computed value of the `color` property on that element',
                'Nothing — the border stays invisible',
                'The background colour of the element',
              ],
              answer: 1,
              explanation: '`currentColor` resolves to the computed `color` of the same element, which is also why a styled border with no colour already appears in the text colour.',
            },
            {
              id: 'quiz-css-l18-q2',
              type: 'multiple-choice',
              prompt: 'Which property colours only the left border?',
              options: [
                '`border-color`',
                '`border-left`',
                '`border-left-color`',
                '`border-inline-color`',
              ],
              answer: 2,
              explanation: '`border-left-color` targets the colour of one edge. `border-color` would paint all four, and `border-left` sets width and style as well.',
            },
            {
              id: 'quiz-css-l18-q3',
              type: 'multiple-choice',
              prompt: 'What does `border-color: red green blue orange` do?',
              options: [
                'Top red, right green, bottom blue, left orange',
                'Left red, top green, right blue, bottom orange',
                'All four sides orange',
                'It is invalid because border-color takes one value',
              ],
              answer: 0,
              explanation: 'Four values run clockwise from the top, so the fourth is the left edge. The same clockwise rule applies to margin and padding.',
            },
            {
              id: 'quiz-css-l18-q4',
              type: 'code-output',
              prompt: 'These rules apply to the same element in order. What colour is the left border?',
              code: '.box {\n  border: 2px solid blue;\n  border-left-color: green;\n  border-color: red;\n}',
              options: [
                'Blue',
                'Green',
                'Red',
                'It is split between green and red',
              ],
              answer: 2,
              explanation: '`border-color` sets all four sides, so the later red declaration overwrites the earlier green left edge. Put side-specific longhands after a general colour rule.',
            },
            {
              id: 'quiz-css-l18-q5',
              type: 'true-false',
              prompt: 'A border colour can be written as a named colour, hex, `rgb()` or `hsl()`, just like a text colour.',
              answer: true,
              explanation: 'Colour is a single value type in CSS, so every notation is accepted anywhere a colour is allowed.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l18-b1',
            body: 'Any colour you can use for text works for a border, and you can set it per side. One special keyword, `currentColor`, makes a border inherit the element text colour.',
          },
          {
            type: 'demo', id: 'c-l18-d1',
            title: 'A different colour on each side',
            body: 'One box, four sides, four colours. Style solid, width 4px everywhere.',
            html: '<div class="box">top red · right green · bottom blue · left orange</div>',
            css: `.box {
  padding: 1rem;
  border-style: solid;
  border-width: 4px;
  border-top-color: #d64545;
  border-right-color: #2e9e5b;
  border-bottom-color: #2f6feb;
  border-left-color: #e08a1e;
}`,
            height: 150,
          },
          {
            type: 'text', id: 'c-l18-b2',
            body: 'Each `border-*-color` longhand colours exactly one edge. `border-color` on its own would have painted all four sides the same — the longhands are what let them differ.',
          },
          { type: 'heading', id: 'c-l18-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l18-c1', language: 'css',
            code: '.badge {\n  color: #b54708;\n  border: 2px solid currentColor;\n}',
          },
          {
            type: 'list', id: 'c-l18-l1', style: 'bullet',
            items: [
              '`border-color` accepts colour keywords, hex, `rgb()`, `rgba()`, `hsl()` and the system colours.',
              'Longhands: `border-top-color`, `border-right-color`, `border-bottom-color`, `border-left-color`.',
              '`currentColor` resolves to the computed `color` of that same element, inherited values included.',
              'Setting a colour with no `border-style` still draws nothing — the style has to exist first.',
            ],
          },
          {
            type: 'tip', id: 'c-l18-t1',
            title: 'currentColor removes duplicated values',
            body: 'A button that changes on hover only needs its `color` to change. `border-color: currentColor` follows along for free instead of you writing the new hex in three places.',
          },
          {
            type: 'text', id: 'c-l18-b3',
            body: 'A border with a style and no colour at all already defaults to `currentColor`, so most simple borders need no colour declaration whatsoever.',
          },
          {
            type: 'exercise', id: 'c-l18-x1',
            exercise: {
              id: 'ex-l18',
              instructions: 'Give the box a 2px solid border that is red on the left side and green everywhere else.',
              languages: ['css'],
              starterCode: { html: '<div class="box">Box</div>', css: '.box {\n  border-style: solid;\n  border-width: 2px;\n  border-color: #2e9e5b;\n}\n' },
              tests: [
                { id: 'ex-l18-t1', label: 'The left border is red', body: 'return getComputedStyle(document.querySelector(".box")).borderLeftColor === "rgb(214, 69, 69)"' },
                { id: 'ex-l18-t2', label: 'The top border is green', body: 'return getComputedStyle(document.querySelector(".box")).borderTopColor === "rgb(46, 158, 91)"' },
                { id: 'ex-l18-t3', label: 'The left border is 2px solid', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderLeftWidth === "2px" && s.borderLeftStyle === "solid"' },
              ],
              hints: [
                'Add one longhand after `border-color` so it wins for the left edge only.',
                '`#d64545` is the red used here; computed styles report it as `rgb(214, 69, 69)`.',
                'Try `border-left-color: #d64545;`',
              ],
              solution: { html: '<div class="box">Box</div>', css: '.box {\n  border-style: solid;\n  border-width: 2px;\n  border-color: #2e9e5b;\n  border-left-color: #d64545;\n}\n' },
              testNotes: 'Colours are compared in computed `rgb()` form, which is how `getComputedStyle` reports them.',
            },
          },
        ],
      },
      {
        id: 'css-l19',
        title: 'Border Sides',
        description: 'The four side longhands, the per-side shorthand, and the logical properties that follow writing direction.',
        duration: 6,
        objectives: [
          'Style a single edge with border-top, -right, -bottom or -left',
          'Use the per-side shorthands to set width, style and colour together',
          'Apply border-inline-start so borders follow the writing direction',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l19',
          title: 'Border Sides quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l19-q1',
              type: 'multiple-choice',
              prompt: 'Which declaration gives only the top edge a border?',
              options: [
                'border: 2px solid #333;',
                'border-top: 2px solid #333;',
                'border-width: 2px 0 0 0;',
                'border-style: top;',
              ],
              answer: 1,
              explanation: 'The `border-top` longhand sets width, style and colour for one edge. The shorthand would draw all four.',
            },
            {
              id: 'quiz-css-l19-q2',
              type: 'multiple-choice',
              prompt: 'On a right-to-left page, which edge does `border-inline-start` style?',
              options: [
                'The left edge',
                'The right edge',
                'The top edge',
                'Both the left and right edges',
              ],
              answer: 1,
              explanation: 'Inline-start follows the start of the text direction, which is the right side in RTL and the left side in LTR.',
            },
            {
              id: 'quiz-css-l19-q3',
              type: 'multiple-choice',
              prompt: 'In a horizontal left-to-right writing mode, which physical edge does `border-block-end` correspond to?',
              options: [
                'Top',
                'Right',
                'Bottom',
                'Left',
              ],
              answer: 2,
              explanation: 'The block axis runs across the lines of text, from top to bottom in horizontal writing, so block-end is the bottom edge.',
            },
            {
              id: 'quiz-css-l19-q4',
              type: 'code-output',
              prompt: 'On a left-to-right page, what does this box show?',
              code: '.box {\n  border-left: 4px solid red;\n  border-inline-start: 4px solid blue;\n}',
              options: [
                'Both edges, because the properties target different sides',
                'A blue left border, because the later logical declaration wins on the same edge',
                'A red left border, because physical properties beat logical ones',
                'No border, because mixing the systems is invalid',
              ],
              answer: 1,
              explanation: 'On an LTR page `border-inline-start` and `border-left` are the same edge, and the later declaration replaces the earlier one. Mixing the two systems on one edge silently discards one of them.',
            },
            {
              id: 'quiz-css-l19-q5',
              type: 'true-false',
              prompt: '`border-inline-start` always styles the left edge, no matter what direction the text runs.',
              answer: false,
              explanation: 'It follows the inline start, so it is the right edge in RTL and can be the top or bottom in vertical writing. That is exactly why it is useful for content UI.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l19-b1',
            body: 'Every border splits into four independent edges. You can target them one at a time, and there is a second set of names — the logical properties — that follow the direction text is written in.',
          },
          {
            type: 'demo', id: 'c-l19-d1',
            title: 'Four differently coloured sides on one box',
            body: 'A single element whose top, right, bottom and left edges each get their own colour and a 6px solid style.',
            html: '<div class="box">top · right · bottom · left</div>',
            css: `.box {
  padding: 1rem;
  border-top: 6px solid #d64545;
  border-right: 6px solid #2e9e5b;
  border-bottom: 6px solid #2f6feb;
  border-left: 6px solid #e08a1e;
}`,
            height: 150,
          },
          {
            type: 'text', id: 'c-l19-b2',
            body: 'Four declarations, four edges. Each one is a shorthand: the `6px` is the width, `solid` the style, the hex the colour.',
          },
          { type: 'heading', id: 'c-l19-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l19-c1', language: 'css',
            code: '.quote {\n  border-inline-start: 4px solid #1f6feb;\n  border-block-end: 1px dashed #d5dae0;\n}',
          },
          {
            type: 'list', id: 'c-l19-l1', style: 'bullet',
            items: [
              'Physical longhands: `border-top`, `border-right`, `border-bottom`, `border-left`, each taking width, style and colour in that order.',
              'Physical singles underneath: `border-top-width`, `border-top-style`, `border-top-color`, and the same for each side.',
              'Logical properties describe position by role: `inline` runs along the line of text, `block` runs across it.',
              '`border-inline-start` and `border-inline-end` swap sides in right-to-left text; `border-block-start` and `border-block-end` flip in vertical writing modes.',
            ],
          },
          {
            type: 'tip', id: 'c-l19-t1',
            title: 'Logical properties are the default for content UI',
            body: 'A quote bar built with `border-inline-start` stays on the correct side in Arabic or Hebrew without a single media query. Use physical sides only when the design genuinely means "the top of the screen".',
          },
          {
            type: 'text', id: 'c-l19-b3',
            body: 'Do not mix the two systems on one edge. On a left-to-right page `border-left` and `border-inline-start` are the same edge, and the later declaration silently replaces the earlier one.',
          },
          {
            type: 'exercise', id: 'c-l19-x1',
            exercise: {
              id: 'ex-l19',
              instructions: 'Give the box a 4px solid red border on its inline-start edge only, using a logical property.',
              languages: ['css'],
              starterCode: { html: '<div class="box">Quote</div>', css: '.box {\n  padding: 1rem;\n  background: #f7f9fc;\n}\n' },
              tests: [
                { id: 'ex-l19-t1', label: 'There is a 4px inline-start border', body: 'return parseFloat(getComputedStyle(document.querySelector(".box")).borderInlineStartWidth) === 4' },
                { id: 'ex-l19-t2', label: 'The other sides have no border', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderTopWidth === "0px" && s.borderBottomWidth === "0px" && s.borderRightWidth === "0px"' },
                { id: 'ex-l19-t3', label: 'The border is solid and red', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderInlineStartStyle === "solid" && s.borderInlineStartColor === "rgb(214, 69, 69)"' },
              ],
              hints: [
                'The logical side name is `border-inline-start`, and it accepts width, style and colour like any border shorthand.',
                'There is no separate `border-inline-start-color` — one declaration covers all three.',
                'Try `border-inline-start: 4px solid #d64545;`',
              ],
              solution: { html: '<div class="box">Quote</div>', css: '.box {\n  padding: 1rem;\n  background: #f7f9fc;\n  border-inline-start: 4px solid #d64545;\n}\n' },
              testNotes: 'Logical longhands such as `borderInlineStartWidth` are readable through `getComputedStyle` in modern browsers.',
            },
          },
        ],
      },
      {
        id: 'css-l20',
        title: 'Border Shorthand',
        description: 'Writing width, style and colour in one declaration, the order the values must appear in, and what happens when they are wrong.',
        duration: 5,
        objectives: [
          'Write the border shorthand with values in width, style, colour order',
          'Diagnose a discarded declaration caused by an invalid value set',
          'Use the two-to-four value form to set different sides at once',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-css-l20',
          title: 'Border Shorthand quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l20-q1',
              type: 'identify-error',
              prompt: 'Which declaration is invalid and therefore discarded entirely?',
              code: '.box {\n  border: 2px 3px solid red;\n}',
              options: [
                'Nothing — it is valid and uses the current text colour',
                'The shorthand — two widths cannot be resolved, so the whole declaration is dropped',
                'The shorthand cannot start with a length',
                'The declaration is missing a trailing semicolon inside the block',
              ],
              answer: 1,
              explanation: 'A shorthand whose values do not resolve is dropped whole, with no error shown — the usual cause is two values of the same type.',
            },
            {
              id: 'quiz-css-l20-q2',
              type: 'true-false',
              prompt: '`border: solid 2px red` is valid even though the values are not in the conventional order.',
              answer: true,
              explanation: 'The parser accepts the values in any order as long as each one is recognisable as a width, style or colour. The width-style-colour order is a convention, not a requirement.',
            },
            {
              id: 'quiz-css-l20-q3',
              type: 'code-output',
              prompt: 'These rules run in order. What colour is the left border?',
              code: '.box {\n  border-left-color: blue;\n  border: 2px solid red;\n}',
              options: [
                'Blue',
                'Red',
                'Purple',
                'It is left at the initial value',
              ],
              answer: 1,
              explanation: 'The `border` shorthand resets all four sides, including the left colour you set first. Write side-specific overrides after the shorthand.',
            },
            {
              id: 'quiz-css-l20-q4',
              type: 'multiple-choice',
              prompt: 'Besides width, style and colour, what else does the `border` shorthand reset?',
              options: [
                '`border-radius`',
                '`border-image`',
                '`outline`',
                '`box-shadow`',
              ],
              answer: 1,
              explanation: 'The shorthand also resets `border-image` to `none`, which can silently remove an image border set earlier. Radius, outline and shadow are separate properties.',
            },
            {
              id: 'quiz-css-l20-q5',
              type: 'blank',
              prompt: 'In the conventional `border` shorthand, which value comes last: width, style or colour?',
              answers: [
                'colour',
                'color',
              ],
              explanation: 'Width, style, colour is the conventional order, with the colour last. Other orders parse, but keeping the convention makes the declaration easy to scan.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l20-b1',
            body: '`border` sets width, style and colour in a single declaration. The parts can appear in any order, but a style must be there — and the shorthand resets every side at once.',
          },
          {
            type: 'demo', id: 'c-l20-d1',
            title: 'One shorthand, four edges',
            body: 'Everything you see around this box comes from a single `border` declaration.',
            html: '<div class="box">one declaration, four edges</div>',
            css: `.box {
  padding: 1rem;
  border: 3px solid #1f6feb;
  border-radius: 6px;
}`,
            height: 150,
          },
          {
            type: 'text', id: 'c-l20-b2',
            body: 'Because `border` sets all four sides, it overwrites any width, style or colour set earlier on that element. To make one edge different, use a side-specific property *after* the shorthand.',
          },
          { type: 'heading', id: 'c-l20-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l20-c1', language: 'css',
            code: 'div {\n  border: 2px solid red;\n  border: 1px dashed blue;\n}',
          },
          {
            type: 'list', id: 'c-l20-l1', style: 'bullet',
            items: [
              'The conventional order is `border: <width> <style> <colour>;` — width first, style in the middle, colour last.',
              'Other orders parse fine as long as each value is recognisable, so `border: solid 2px red` is valid too.',
              'With two to four values it follows the clockwise rule: top/bottom, left/right, then top, right, bottom.',
              '`border` also resets `border-image` to `none`, so it can silently wipe an image border.',
            ],
          },
          {
            type: 'warning', id: 'c-l20-w1',
            title: 'Get the order wrong and nothing happens at all',
            body: 'If the values do not parse as a valid border, the browser discards the entire declaration silently — no error message, no partial result. `border: 2px 3px solid red;` parses as nothing because two widths cannot be resolved, and that is easy to mistake for a wrong selector.',
          },
          {
            type: 'text', id: 'c-l20-b3',
            body: 'The related trap: because `border` resets all sides, writing `border: 2px solid red` *after* `border-left-color: blue` gives you a red left edge too. Sides first, shorthand last, or the shorthand on its own.',
          },
          {
            type: 'exercise', id: 'c-l20-x1',
            exercise: {
              id: 'ex-l20',
              instructions: 'Set a 3px dashed green border on every side of the box using a single shorthand declaration.',
              languages: ['css'],
              starterCode: { html: '<div class="box">Box</div>', css: '.box {\n  \n}\n' },
              tests: [
                { id: 'ex-l20-t1', label: 'The border is 3px on all sides', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderTopWidth === "3px" && s.borderBottomWidth === "3px" && s.borderLeftWidth === "3px" && s.borderRightWidth === "3px"' },
                { id: 'ex-l20-t2', label: 'The style is dashed', body: 'return getComputedStyle(document.querySelector(".box")).borderTopStyle === "dashed"' },
                { id: 'ex-l20-t3', label: 'The colour is green', body: 'return getComputedStyle(document.querySelector(".box")).borderTopColor === "rgb(46, 158, 91)"' },
              ],
              hints: [
                'The order to remember is width, then style, then colour.',
                'A shorthand with an unresolvable value set is dropped entirely, so make sure `dashed` is present.',
                'Try `border: 3px dashed #2e9e5b;`',
              ],
              solution: { html: '<div class="box">Box</div>', css: '.box {\n  border: 3px dashed #2e9e5b;\n}\n' },
              testNotes: 'Computed values are compared in pixels and in `rgb()` form.',
            },
          },
        ],
      },
      {
        id: 'css-l21',
        title: 'Rounded Borders',
        description: 'Curving the corners with border-radius, the elliptical four-value form, and how 50% turns a square into a circle.',
        duration: 6,
        objectives: [
          'Round all four corners with border-radius',
          'Round individual corners with the border-<corner>-radius longhands',
          'Use the two-value elliptical form and 50% to make a circle',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l21',
          title: 'Rounded Borders quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l21-q1',
              type: 'blank',
              prompt: 'Which `border-radius` value makes a square box render as a perfect circle?',
              answers: [
                '50%',
                'border-radius: 50%',
                '50 percent',
              ],
              explanation: 'A radius of 50% reaches half the box on every side. Larger radii are scaled down automatically, which is what makes `50%` reliably produce a circle.',
            },
            {
              id: 'quiz-css-l21-q2',
              type: 'multiple-choice',
              prompt: 'What does `border-radius: 40px 8px` mean?',
              options: [
                '40px horizontal radius and 8px vertical radius, forming an ellipse',
                '40px on the top corners and 8px on the bottom corners',
                'A 40px border and an 8px radius',
                '40px on the left corners and 8px on the right',
              ],
              answer: 0,
              explanation: 'With two values the first is the horizontal radius and the second the vertical, so each corner is an ellipse rather than a circle.',
            },
            {
              id: 'quiz-css-l21-q3',
              type: 'multiple-choice',
              prompt: 'Which corner does the fourth value in `border-radius: 10px 20px 30px 40px` round?',
              options: [
                'Top-left',
                'Top-right',
                'Bottom-right',
                'Bottom-left',
              ],
              answer: 3,
              explanation: 'The four values run clockwise from the top-left: top-left, top-right, bottom-right, bottom-left. The fourth is the bottom-left corner.',
            },
            {
              id: 'quiz-css-l21-q4',
              type: 'true-false',
              prompt: '`border-radius: 999px` works as a pill radius because a radius larger than half the box is scaled down automatically.',
              answer: true,
              explanation: 'Browsers clamp radii so neighbouring corners never overlap, so an oversized value produces a fully rounded end without needing the element height in advance.',
            },
            {
              id: 'quiz-css-l21-q5',
              type: 'multiple-choice',
              prompt: 'Which property rounds only the top-right corner?',
              options: [
                '`border-radius-top-right`',
                '`border-top-right-radius`',
                '`border-top-radius`',
                '`border-right-top-radius`',
              ],
              answer: 1,
              explanation: 'Corner longhands are named `border-<vertical>-<horizontal>-radius`, so the top-right corner is `border-top-right-radius`.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l21-b1',
            body: '`border-radius` cuts the sharp corners off a border with a curve. A length gives gently rounded corners; `50%` follows the box far enough to become a circle.',
          },
          {
            type: 'demo', id: 'c-l21-d1',
            title: 'A rounded box and a circle',
            body: 'Same width, height and border. The left box has a 20px radius; the right one has `border-radius: 50%`.',
            html: `<div class="row"><div class="box">20px corners</div><div class="box circle">50%</div></div>`,
            css: `.row { display: flex; gap: 2rem; }
.box { width: 120px; height: 120px; display: flex; align-items: center;
  justify-content: center; border: 3px solid #1f6feb; border-radius: 20px;
  font: 13px system-ui, sans-serif; }
.circle { border-radius: 50%; border-color: #2e9e5b; }`,
            height: 170,
          },
          {
            type: 'text', id: 'c-l21-b2',
            body: 'Identical geometry, one different value. 20px clips a small corner off; 50% takes the radius to half the box and rounds the shape all the way round.',
          },
          { type: 'heading', id: 'c-l21-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l21-c1', language: 'css',
            code: '.pill {\n  border-radius: 999px;\n}\n.leaf {\n  border-radius: 40px 8px 40px 8px;\n}',
          },
          {
            type: 'list', id: 'c-l21-l1', style: 'bullet',
            items: [
              'One value sets all four corners; two to four run clockwise from the top-left: top-left, top-right, bottom-right, bottom-left.',
              'Two values form an ellipse: the first is the horizontal radius, the second the vertical.',
              'A radius larger than half the box is scaled down automatically, so corners never overlap — that is why `50%` always gives a full circle on a square.',
              'Individual corners: `border-top-left-radius`, `border-top-right-radius`, `border-bottom-right-radius`, `border-bottom-left-radius`.',
            ],
          },
          {
            type: 'tip', id: 'c-l21-t1',
            title: '999px is the standard pill radius',
            body: 'You rarely know the height in advance. A very large radius is clamped to half the box on each side, so `border-radius: 999px` gives a fully rounded end on any element without measuring it.',
          },
          {
            type: 'text', id: 'c-l21-b3',
            body: 'Radius follows the border. Increase the border width and the curve moves outward with the edge, because the radius is measured to the border box, not the content box.',
          },
          {
            type: 'example', id: 'c-l21-e1', showPreview: true,
            title: 'One value, two values and four values',
            body: 'Three boxes of the same size: one value, an elliptical pair, then four individual corners.',
            html: `<div class="row"><div class="box one">8px</div><div class="box two">40px 8px</div><div class="box four">40px 8px 40px 8px</div></div>`,
            css: `.row { display: flex; gap: 1.25rem; }
.box { width: 110px; height: 110px; border: 3px solid #1f6feb; background: #f7f9fc;
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 0.4rem; font: 12px system-ui, sans-serif; }
.one { border-radius: 8px; }
.two { border-radius: 40px 8px; }
.four { border-radius: 40px 8px 40px 8px; }`,
          },
          {
            type: 'exercise', id: 'c-l21-x1',
            exercise: {
              id: 'ex-l21',
              instructions: 'Round the corners of the box by 12px and give it a 3px solid border.',
              languages: ['css'],
              starterCode: { html: '<div class="box">Box</div>', css: '.box {\n  width: 120px;\n  height: 120px;\n}\n' },
              tests: [
                { id: 'ex-l21-t1', label: 'All four corners are rounded by 12px', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderTopLeftRadius === "12px" && s.borderTopRightRadius === "12px" && s.borderBottomRightRadius === "12px" && s.borderBottomLeftRadius === "12px"' },
                { id: 'ex-l21-t2', label: 'The box has a 3px border', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.borderTopWidth === "3px" && s.borderTopStyle === "solid"' },
              ],
              hints: [
                'One `border-radius` value with no corner named applies to all four.',
                'Radius is separate from the border declaration — write both.',
                'Try `border: 3px solid #1f6feb; border-radius: 12px;`',
              ],
              solution: { html: '<div class="box">Box</div>', css: '.box {\n  width: 120px;\n  height: 120px;\n  border: 3px solid #1f6feb;\n  border-radius: 12px;\n}\n' },
              testNotes: 'The four `border-*-radius` computed values are checked individually.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s10',
    title: 'CSS Margins',
    description: 'The transparent space outside a border, the shorthand that sets all four sides, and the collapsing behaviour that surprises everyone.',
    lessons: [
      {
        id: 'css-l22',
        title: 'Margins',
        description: 'Space outside the border on all four sides, the shorthand forms, horizontal auto-centring, and negative values.',
        duration: 6,
        objectives: [
          'Set space outside the border with margin and its four side longhands',
          'Centre a fixed-width block horizontally with margin: 0 auto',
          'Use negative margins to overlap or pull an element outside its container',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l22',
          title: 'Margins quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l22-q1',
              type: 'true-false',
              prompt: 'A margin can carry its own background colour and border.',
              answer: false,
              explanation: 'Margins are always transparent empty space outside the border. Colour and borders belong to the element box itself.',
            },
            {
              id: 'quiz-css-l22-q2',
              type: 'code-output',
              prompt: 'Where does this 200px block sit inside its 600px container?',
              code: '.card {\n  width: 200px;\n  margin: 0 auto;\n}',
              options: [
                'Left aligned, with 200px of space on the right',
                'Centred, with 200px on each side',
                'Stretched to fill the 600px container',
                'Right aligned',
              ],
              answer: 1,
              explanation: 'The container has 400px of leftover space and `auto` splits it evenly, giving 200px on each side.',
            },
            {
              id: 'quiz-css-l22-q3',
              type: 'multiple-choice',
              prompt: 'What does `margin: 10px 20px 30px 40px` set for the left margin?',
              options: [
                '10px',
                '20px',
                '30px',
                '40px',
              ],
              answer: 3,
              explanation: 'Four values run clockwise from the top: top 10, right 20, bottom 30, left 40. Padding and border-width use the same order.',
            },
            {
              id: 'quiz-css-l22-q4',
              type: 'multiple-choice',
              prompt: 'Why does `margin: 0 auto` fail to centre a block whose `width` is `auto`?',
              options: [
                '`auto` margins only work on inline elements',
                'An auto-width block already fills its container, so there is no leftover space to distribute',
                '`auto` must be written on both top and bottom too',
                'The block needs a border for margins to apply',
              ],
              answer: 1,
              explanation: 'Horizontal auto-centring needs a fixed width. When width is auto the block fills the container and the margins have nothing left to share.',
            },
            {
              id: 'quiz-css-l22-q5',
              type: 'multiple-choice',
              prompt: 'What does `margin-top: -8px` do?',
              options: [
                'Adds 8px of space above the element',
                'Pulls the element 8px upward, overlapping what is above',
                'Shrinks the element height by 8px',
                'Is invalid, because margins cannot be negative',
              ],
              answer: 1,
              explanation: 'Negative margins are legal and pull in the opposite direction, which is useful for overlap and for pulling an element outside its container.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l22-b1',
            body: 'A margin is empty space outside the border. It belongs to the element it is set on, it is always transparent, and it pushes other elements away rather than making this one bigger.',
          },
          {
            type: 'demo', id: 'c-l22-d1',
            title: 'Margin outside, padding inside',
            body: 'The gap between the dashed container and the blue border is the 24px margin. The gap between the blue border and the text is 24px of padding.',
            html: `<div class="outer"><div class="inner">margin is outside · padding is inside</div></div>`,
            css: `.outer { border: 2px dashed #d5dae0; background: #f7f9fc; }
.inner { margin: 24px; padding: 24px; border: 3px solid #1f6feb;
  background: #fff; font: 13px system-ui, sans-serif; }`,
            height: 190,
          },
          {
            type: 'text', id: 'c-l22-b2',
            body: 'Margins never take a background or a border — they are simply empty space. That is why the outer container shows through where the margin is, while the padding area stays white.',
          },
          { type: 'heading', id: 'c-l22-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l22-c1', language: 'css',
            code: '.panel {\n  width: 320px;\n  margin: 0 auto;\n  margin-top: -8px;\n}',
          },
          {
            type: 'list', id: 'c-l22-l1', style: 'bullet',
            items: [
              'Four longhands: `margin-top`, `margin-right`, `margin-bottom`, `margin-left`.',
              'The shorthand runs clockwise from the top: one value for all sides, two for top/bottom then left/right, three adding left/right, four for each side.',
              '`auto` lets the browser distribute leftover space; on a block with a set width, `margin: 0 auto` centres it.',
              'Negative values are legal and pull the element the other way — `margin-top: -8px` overlaps something by 8px.',
              'Horizontal auto-centring needs a width you have fixed. A `width: auto` block already fills its container, so `auto` has nothing to distribute.',
            ],
          },
          {
            type: 'warning', id: 'c-l22-w1',
            title: 'Margin is outside the border',
            body: 'Margin never gives an element a visible background, and adding it does not change the element width — it changes the space around it. If you expected the element to grow or to show colour in that space, you want padding or width.',
          },
          {
            type: 'text', id: 'c-l22-b3',
            body: 'Spacing systems: because a stack of cards with `margin-bottom: 2rem` already gives you 2rem, adding `margin-top` as well changes nothing unless it is larger. Pick one axis and use one of the two.',
          },
          {
            type: 'exercise', id: 'c-l22-x1',
            exercise: {
              id: 'ex-l22',
              instructions: 'Centre the box horizontally in its container and give it 20px of margin on the top and bottom.',
              languages: ['css'],
              starterCode: { html: '<div class="container">\n  <div class="box">Box</div>\n</div>', css: '.container {\n  width: 100%;\n}\n.box {\n  width: 180px;\n}\n' },
              tests: [
                { id: 'ex-l22-t1', label: 'The top and bottom margins are 20px', body: 'const s = getComputedStyle(document.querySelector(".box")); return s.marginTop === "20px" && s.marginBottom === "20px"' },
                { id: 'ex-l22-t2', label: 'The box is horizontally centred', body: 'const box = document.querySelector(".box"); const p = box.parentElement.getBoundingClientRect(); const b = box.getBoundingClientRect(); return Math.abs((b.left - p.left) - (p.right - b.right)) < 1' },
              ],
              hints: [
                '`auto` on the left and right margins splits the leftover space around a fixed-width block.',
                'One shorthand can set top/bottom to 20px while leaving left/right to `auto`.',
                'Try `margin: 20px auto;`',
              ],
              solution: { html: '<div class="container">\n  <div class="box">Box</div>\n</div>', css: '.container {\n  width: 100%;\n}\n.box {\n  width: 180px;\n  margin: 20px auto;\n}\n' },
              testNotes: 'Centring is verified by comparing the leftover space on the left and right of the box.',
            },
          },
        ],
      },
      {
        id: 'css-l23',
        title: 'Margin Collapse',
        description: 'Why two neighbouring margins separate elements by the larger value instead of the sum, and when a parent absorbs its child top margin.',
        duration: 8,
        objectives: [
          'Predict the gap between two adjacent block siblings from their margins',
          'Explain why a parent top margin collapses with its first child top margin',
          'Break a collapse with padding, a border or display: flow-root',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l23',
          title: 'Margin Collapse quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l23-q1',
              type: 'multiple-choice',
              prompt: 'Two blocks touch vertically. The first has `margin-bottom: 40px` and the second `margin-top: 30px`. What gap do you see?',
              options: [
                '70px',
                '40px',
                '30px',
                '10px',
              ],
              answer: 1,
              explanation: 'Adjacent vertical margins collapse to the larger of the two, so the gap is 40px — they never sum.',
            },
            {
              id: 'quiz-css-l23-q2',
              type: 'multiple-choice',
              prompt: 'A child top margin is dragging its parent down. What prevents that collapse?',
              options: [
                'Padding, a border, or non-empty inline content above the child',
                'A width, a height, or a background colour on the parent',
                'A doctype, a viewport meta tag, or a reset stylesheet',
                'Nothing — it cannot be prevented',
              ],
              answer: 0,
              explanation: 'A parent top margin collapses with its first child only when there is no border, no padding and no inline content above the child. `display: flow-root` also contains it.',
            },
            {
              id: 'quiz-css-l23-q3',
              type: 'blank',
              prompt: 'Complete the sentence: margins collapse vertically, so the gap between two touching blocks is the ______ of the two margins.',
              answers: [
                'max',
                'largest',
                'maximum',
                'greater',
                'biggest',
              ],
              explanation: 'The collapsed value is the larger margin — never the sum. Horizontal margins, floats, absolute positioning, and flex or grid items do not collapse at all.',
            },
            {
              id: 'quiz-css-l23-q4',
              type: 'multiple-choice',
              prompt: 'A block has `margin-bottom: 20px`; the next has `margin-top: -8px`. They touch vertically. What is the gap?',
              options: [
                '28px',
                '20px',
                '12px',
                '8px',
              ],
              answer: 2,
              explanation: 'A positive and a negative margin collapse to their sum, so 20px minus 8px leaves a 12px gap. Two positives would collapse to the larger instead.',
            },
            {
              id: 'quiz-css-l23-q5',
              type: 'multiple-choice',
              prompt: 'Which of these margins do not collapse?',
              options: [
                'Two adjacent block siblings in normal flow',
                'A parent and its first child with no padding or border',
                'Margins between flex or grid items',
                'Two positive margins on touching blocks',
              ],
              answer: 2,
              explanation: 'Flex and grid layout do not use margin collapsing; their items keep their margins as specified. Floats and absolutely positioned elements also do not collapse.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l23-b1',
            body: 'Vertical margins do not add up. Two stacked block elements end up separated by the *larger* of their margins, not the sum — a browser behaviour called margin collapse. It is why layouts come out off by exactly the amount you expected to be doubled.',
          },
          {
            type: 'demo', id: 'c-l23-d1',
            title: 'Collapsing siblings beside a padded parent',
            body: 'Left: two blocks with 40px and 30px margins touching, gap 40px. Right: the same margins inside a parent with padding, gap 70px.',
            html: `<div class="row">
  <div class="case">
    <div class="label">adjacent siblings</div>
    <div class="stack"><div class="block top">40px bottom margin</div><div class="block bottom">30px top margin</div></div>
    <div class="note">gap = 40px (the larger)</div>
  </div>
  <div class="case">
    <div class="label">inside a padded parent</div>
    <div class="padded"><div class="stack"><div class="block top">40px bottom margin</div><div class="block bottom">30px top margin</div></div></div>
    <div class="note">gap = 70px (the sum)</div>
  </div>
</div>`,
            css: `.row { display: flex; gap: 2rem; align-items: flex-start; }
.case { flex: 1; font: 13px system-ui, sans-serif; }
.label { font-weight: 600; margin-bottom: 0.4rem; }
.stack { background: #eef2f7; }
.block { background: #cfe3ff; border: 1px solid #4c7fb8; padding: 0.6rem; }
.top { margin-bottom: 40px; }
.bottom { margin-top: 30px; }
.padded { background: #eef2f7; padding: 1px; border: 1px dashed #b6c2d1; }
.note { margin-top: 0.5rem; color: #55606d; }`,
            height: 260,
          },
          {
            type: 'text', id: 'c-l23-b2',
            body: 'The left stack measures 40px between the blocks: 40px and 30px merged and the larger won. The right stack measures 70px because the parent has padding, so there is no shared edge to collapse across. Remove that 1px of padding and it becomes 40px too.',
          },
          { type: 'heading', id: 'c-l23-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l23-c1', language: 'css',
            code: '.card {\n  margin-bottom: 40px;\n}\n.card + .card {\n  margin-top: 30px;\n}',
          },
          {
            type: 'list', id: 'c-l23-l1', style: 'bullet',
            items: [
              'Two vertical margins collapse when they sit between the same pair of block-level boxes: the result is `max(top, bottom)`, never the sum.',
              'A positive and a negative margin collapse to their sum, so `20px` and `-8px` give 12px.',
              'A parent collapses with its first child when it has no border, no padding and no non-empty inline content above the child; the same applies to the last child.',
              'An empty parent takes on the max of its own margins and its children margins, and the parent height becomes zero.',
              'Horizontal margins never collapse. Neither do margins of floats, absolutely positioned elements, or flex and grid items — those layout systems do not collapse at all.',
            ],
          },
          {
            type: 'warning', id: 'c-l23-w1',
            title: 'A child margin can push its parent',
            body: 'When a parent has no border or padding at the top, the child top margin collapses through it and the child appears to sit above the parent box, dragging the whole container down. If a section starts lower than you set it, this is usually why.',
          },
          {
            type: 'tip', id: 'c-l23-t1',
            title: 'Break the collapse deliberately',
            body: 'Padding, a border, or a little inline content on the parent all stop it. `display: flow-root` contains the child margins with no visual side effect — the cleanest way to contain them.',
          },
          {
            type: 'exercise', id: 'c-l23-x1',
            exercise: {
              id: 'ex-l23',
              instructions: 'The two blocks should sit 60px apart, but the second block top margin is collapsing with the first block bottom margin. Give the wrapper 1px of padding so the two margins add up instead.',
              languages: ['css'],
              starterCode: { html: '<div class="wrapper">\n  <div class="a">A</div>\n  <div class="b">B</div>\n</div>', css: '.a {\n  margin-bottom: 30px;\n}\n.b {\n  margin-top: 30px;\n}\n' },
              tests: [
                { id: 'ex-l23-t1', label: 'The wrapper stops the collapse', body: 'return parseFloat(getComputedStyle(document.querySelector(".wrapper")).paddingTop) > 0' },
                { id: 'ex-l23-t2', label: 'The gap between the blocks is 60px', body: 'const a = document.querySelector(".a").getBoundingClientRect(); const b = document.querySelector(".b").getBoundingClientRect(); return Math.abs(b.top - a.bottom - 60) < 1' },
              ],
              hints: [
                'Collapsing happens because the wrapper has nothing between its edge and its children.',
                'Any padding on the wrapper creates a real edge for the child margins to stop at.',
                'Try adding `padding: 1px;` to `.wrapper`',
              ],
              solution: { html: '<div class="wrapper">\n  <div class="a">A</div>\n  <div class="b">B</div>\n</div>', css: '.wrapper {\n  padding: 1px;\n}\n.a {\n  margin-bottom: 30px;\n}\n.b {\n  margin-top: 30px;\n}\n' },
              testNotes: 'The measured gap is the real distance between the two boxes in the sandboxed preview.',
            },
          },
        ],
      },
    ],
  },
]
