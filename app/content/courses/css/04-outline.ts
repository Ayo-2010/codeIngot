import type { Section } from '~/types/content'

export const cssOutlineSections: Section[] = [
  {
    id: 'css-s14',
    title: 'CSS Outline',
    description:
      'The line drawn outside an element\'s border, and the four properties that control it.',
    lessons: [
      {
        id: 'css-l27',
        title: 'Outline',
        description:
          'The line drawn outside the border edge, why it never moves anything, and why it is the focus ring.',
        duration: 5,
        objectives: [
          'Draw an outline around an element with the `outline` shorthand',
          'Explain why an outline never changes the size or position of anything around it',
          'Say where an outline sits relative to the border and the margin',
          'Style a focus ring with `outline` and `:focus-visible`',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-css-l27',
          title: 'Outline quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l27-q1',
              type: 'multiple-choice',
              prompt: 'Where is an outline drawn?',
              options: [
                'Inside the padding, between the content and the border',
                'Outside the border edge',
                'In the margin, replacing the margin',
                'As a shadow one pixel outside the border',
              ],
              answer: 1,
              explanation: 'An outline is painted outside the border edge, further from the content than the border itself, and it is never part of the box model.',
            },
            {
              id: 'quiz-css-l27-q2',
              type: 'multiple-choice',
              prompt: 'Which statement about an outline\'s place in the box model is correct?',
              options: [
                'It is the outermost layer of the box model, beyond the margin',
                'It is part of the border and enlarges the border box',
                'It is not part of the box model, so it takes up no layout space',
                'It sits inside the padding and shrinks the content box',
              ],
              answer: 2,
              explanation: 'The outline is painted outside the border but is not content, padding, border or margin. Because it is outside the box model entirely, it never affects layout.',
            },
            {
              id: 'quiz-css-l27-q3',
              type: 'multiple-choice',
              prompt: 'A wide outline on one element can paint over which part of a neighbour?',
              options: [
                'The neighbour\'s text content',
                'The neighbour\'s margin gap',
                'The neighbour\'s scrollbar',
                'Nothing — an outline is clipped to its own element',
              ],
              answer: 1,
              explanation: 'The outline sits outside the margin, so a thick line can spill into the empty margin gap of an adjacent element. It paints on top rather than pushing anything aside.',
            },
            {
              id: 'quiz-css-l27-q4',
              type: 'multiple-choice',
              prompt: 'An element has `border-radius: 12px` and a solid outline. How is the outline drawn?',
              options: [
                'As a rounded line following the border edge',
                'As a square rectangle that ignores the radius',
                'Only at the four corners of the box',
                'Inside the border, following the content box',
              ],
              answer: 0,
              explanation: 'The outline follows the border edge, so a rounded border produces a rounded outline. It is not a separate rectangle drawn around the box.',
            },
            {
              id: 'quiz-css-l27-q5',
              type: 'multiple-choice',
              prompt: 'Why is `:focus-visible` preferred over `:focus` for a custom focus ring?',
              options: [
                'It only matches when the browser cannot draw a default ring',
                'It matches keyboard focus without showing the ring on every mouse click',
                'It works on links but not on buttons',
                'It removes the need to set an outline style',
              ],
              answer: 1,
              explanation: '`:focus-visible` lets the browser decide when focus should be visible, which normally means keyboard navigation. A plain `:focus` rule also fires on mouse clicks.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l27-b1',
            body: "An outline is a line drawn outside the element's border.",
          },
          {
            type: 'demo',
            id: 'c-l27-d1',
            title: 'An outline outside the border',
            body: 'The box below has a 2px black border and a 10px green outline drawn outside it.',
            html: '<div class="demo-box">An outline sits outside the border.</div>',
            css: `.demo-box {
  border: 2px solid #111;
  outline: 10px solid #29e2bd;
  padding: 1rem;
}`,
            height: 160,
          },
          {
            type: 'text',
            id: 'c-l27-b2',
            body: 'This element has a black border and a green outline with a width of 10px.',
          },
          {
            type: 'heading',
            id: 'c-l27-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l27-c1',
            language: 'css',
            code: `.demo-box {
  border: 2px solid #111;
  outline: 10px solid #29e2bd;
  padding: 1rem;
}`,
          },
          {
            type: 'text',
            id: 'c-l27-b3',
            body: 'The outline is painted after the border, further out from the edge of the box. It is drawn on top of whatever is in that space, and **no part of the outline takes up room**. The box above is still exactly as tall as its content and padding; the green line is drawn over the empty area beside it.',
          },
          {
            type: 'demo',
            id: 'c-l27-d2',
            title: 'The same box with and without the outline',
            body: 'Two identical bordered boxes with the same amount of text in them. Only the right one has an outline. The text lines up in both, because the outline was never part of the layout.',
            html: `<div class="row">
  <div class="plain">
    <p>Border only.</p>
    <p class="tail">The text starts at exactly the same x here as it does on the right.</p>
  </div>
  <div class="ringed">
    <p>Border and outline.</p>
    <p class="tail">The text starts at exactly the same x here as it does on the left.</p>
  </div>
</div>`,
            css: `.row {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}
.plain,
.ringed {
  flex: 1;
  border: 2px solid #111;
  padding: 1rem;
  font-size: 13px;
}
.ringed {
  outline: 6px solid #29e2bd;
}
.row p {
  margin: 0 0 0.5rem;
}
.tail {
  color: #5b646e;
}`,
            height: 220,
          },
          {
            type: 'heading',
            id: 'c-l27-h2',
            level: 3,
            body: 'Where it sits',
          },
          {
            type: 'list',
            id: 'c-l27-l1',
            style: 'bullet',
            items: [
              'The outline sits **outside the border**, on the far side of it from the content.',
              'It is **not part of the box model**. It is not content, padding, border or margin, and it is not something you add space for.',
              'Because it is not in the box model, it does not participate in layout at all: no reflow, no shifted siblings, no changed parent height, and nothing to account for in a grid or flex gap.',
              'It also sits outside the margin, so an outline can paint over the margin gap of a neighbouring element if it is wide enough.',
              'The outline follows the border edge, so on an element with a large `border-radius` it is drawn as a rounded line with the same shape.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l27-h3',
            level: 3,
            body: 'What it is actually for',
          },
          {
            type: 'text',
            id: 'c-l27-b4',
            body: 'An outline exists to mark something without disturbing the page. That makes it the right tool for a **focus ring**: the user needs to know which control the keyboard is on, and they need to know it without every focused element resizing itself and shoving the rest of the layout around.',
          },
          {
            type: 'example',
            id: 'c-l27-e1',
            title: 'A focus ring that never reflows',
            body: 'Tab through the two controls. The ring appears on focus, is drawn outside the border, and pushes nothing. `:focus-visible` means it shows up for keyboard focus without appearing on every mouse click.',
            html: `<div class="form">
  <button class="btn" type="button">Save</button>
  <a class="btn" href="#outline">Cancel</a>
</div>`,
            css: `.form {
  display: flex;
  gap: 1rem;
  padding: 1rem;
}
.btn {
  font: inherit;
  padding: 0.6rem 1.1rem;
  border: 2px solid #111;
  border-radius: 6px;
  background-color: #f2f5f8;
  color: #0b0d10;
  cursor: pointer;
}
.btn:focus-visible {
  outline: 3px solid #29e2bd;
  outline-offset: 2px;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l27-t1',
            title: 'An outline does not have to be solid',
            body: '`outline-style` takes `dashed`, `dotted`, `double` and `groove`, like `border-style`. A dashed focus ring is a legitimate choice on dark backgrounds, where a solid line of a similar colour to the border is hard to see.',
          },
          {
            type: 'exercise',
            id: 'ex-l27-x1',
            exercise: {
              id: 'ex-l27',
              instructions:
                'Give the box a 10px green outline drawn outside its border. Leave the existing border and padding alone.',
              languages: ['css'],
              starterCode: {
                html: '<div class="box">Outlined</div>',
                css: '.box {\n  border: 2px solid #111;\n  padding: 1rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l27-t1',
                  label: 'The box has an outline style other than none',
                  body: 'return getComputedStyle(document.querySelector(".box")).outlineStyle !== "none"',
                },
                {
                  id: 'ex-l27-t2',
                  label: 'The outline is 10px wide',
                  body: 'return getComputedStyle(document.querySelector(".box")).outlineWidth === "10px"',
                },
                {
                  id: 'ex-l27-t3',
                  label: 'The outline is the teal colour',
                  body: 'return getComputedStyle(document.querySelector(".box")).outlineColor === "rgb(41, 226, 189)"',
                },
                {
                  id: 'ex-l27-t4',
                  label: 'The existing border was not changed',
                  body: 'return getComputedStyle(document.querySelector(".box")).borderTopWidth === "2px"',
                },
              ],
              hints: [
                'The shorthand takes width, style and colour: `outline: 10px solid #29e2bd;`.',
                'Teal here is `#29e2bd`, which computes to `rgb(41, 226, 189)`.',
                'Add one declaration to `.box` — nothing else needs to change.',
              ],
              solution: {
                html: '<div class="box">Outlined</div>',
                css: '.box {\n  border: 2px solid #111;\n  outline: 10px solid #29e2bd;\n  padding: 1rem;\n}\n',
              },
              testNotes:
                'The tests read the computed outline properties of `.box`, and the last one confirms the original border survived.',
            },
          },
        ],
      },
      {
        id: 'css-l28',
        title: 'Outline Width',
        description:
          'Setting the thickness of an outline with `outline-width`, including the three keyword sizes.',
        duration: 5,
        objectives: [
          'Set the thickness of an outline with `outline-width`',
          'Use the `thin`, `medium` and `thick` keywords and predict their pixel values',
          'Explain why changing `outline-width` never reflows the page',
          'Combine `outline-width` with an explicit style so the width is visible',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-css-l28',
          title: 'Outline Width quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l28-q1',
              type: 'code-output',
              prompt: 'What does this produce?',
              code: '.card {\n  border: 1px solid #111;\n  outline: 3px solid #29e2bd;\n  outline-offset: 5px;\n}',
              options: [
                'A 3px teal border with a 5px inset gap',
                'A 5px teal border with a 3px outline',
                'A 3px teal outline 5px away from the border',
                'Nothing visible, because an outline and a border cannot be used together',
              ],
              answer: 2,
              explanation: 'The `outline` shorthand takes width, style and colour, and `outline-offset` pushes the whole outline 5px further out, leaving a gap between it and the border.',
            },
            {
              id: 'quiz-css-l28-q2',
              type: 'multiple-choice',
              prompt: 'Which pixel values match the keywords `thin`, `medium` and `thick` in current browsers?',
              options: [
                '1px, 3px, 5px',
                '1px, 2px, 4px',
                '2px, 4px, 6px',
                '1px, 4px, 8px',
              ],
              answer: 0,
              explanation: 'The three outline keywords resolve to roughly 1px, 3px and 5px. They are user-agent values rather than fixed numbers, but every current browser ships the same sizes.',
            },
            {
              id: 'quiz-css-l28-q3',
              type: 'multiple-choice',
              prompt: 'What is the initial value of `outline-width`?',
              options: [
                '`0`',
                '`thin`',
                '`medium`',
                '`thick`',
              ],
              answer: 2,
              explanation: '`medium` is the initial value and resolves to about 3px. A styled outline with no width therefore still draws a 3px line.',
            },
            {
              id: 'quiz-css-l28-q4',
              type: 'code-output',
              prompt: 'What is drawn around the box?',
              code: '.box {\n  outline-width: 12px;\n}',
              options: [
                'A 12px line, because the width is enough on its own',
                'A 3px line, because the width falls back to medium',
                'No line, because `outline-style` still has its initial value of `none`',
                'A 12px line, but only while the box is hovered',
              ],
              answer: 2,
              explanation: '`outline-style` starts at `none`, and no line is painted for a style of `none` whatever the width. Width, style and colour must all be present before anything appears.',
            },
            {
              id: 'quiz-css-l28-q5',
              type: 'true-false',
              prompt: 'Changing `outline-width` from `2px` to `20px` changes the element\'s border-box width.',
              answer: false,
              explanation: 'The outline is outside the box model, so neither its width nor any change to it alters the border box. Only the painted line gets thicker.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l28-b1',
            body: '`outline-width` sets how thick the outline is. It takes a length such as `4px` or `0.2rem`, or one of three keywords: `thin`, `medium` and `thick`.',
          },
          {
            type: 'demo',
            id: 'c-l28-d1',
            title: 'The three keyword widths',
            body: 'The same bordered box three times, with the outline width set to `thin`, `medium` and `thick`. The three keywords resolve to about 1px, 3px and 5px, so the difference is clear even though nothing about the boxes themselves moved.',
            html: `<div class="row">
  <div class="box thin">thin</div>
  <div class="box medium">medium</div>
  <div class="box thick">thick</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  padding: 0.5rem;
}
.box {
  flex: 1;
  border: 2px solid #111;
  padding: 1rem;
  font-size: 13px;
  background-color: #0b0d10;
  color: #e8edf2;
}
.thin {
  outline: thin solid #29e2bd;
}
.medium {
  outline: medium solid #29e2bd;
}
.thick {
  outline: thick solid #29e2bd;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l28-b2',
            body: 'The three boxes are identical in size and their text lines up across all three. Only the line around each one changed. That is the point of `outline-width`: it is the one property you can make as large as you like without touching the document flow.',
          },
          {
            type: 'heading',
            id: 'c-l28-h1',
            level: 3,
            body: 'The values',
          },
          {
            type: 'list',
            id: 'c-l28-l1',
            style: 'bullet',
            items: [
              '**`thin`** — 1px in current browsers.',
              '**`medium`** — 3px. This is the **initial value**, so a bare `outline-color` with no style gives you nothing visible, but a styled outline with no width gives you a 3px line.',
              '**`thick`** — 5px.',
              '**A length** — `8px`, `0.25rem`, `2em`. Any CSS length is accepted, and it is the only form that gives you exact control.',
              'The keywords are user-agent values rather than fixed numbers, but every current browser ships the same three sizes, so they are predictable in practice.',
            ],
          },
          {
            type: 'text',
            id: 'c-l28-b3',
            body: 'Setting `outline-width` on its own is not enough. The **initial value of `outline-style` is `none`**, and no line is drawn for a style of `none`, whatever the width is. Width, style and colour have to be given together before you see anything.',
          },
          {
            type: 'code',
            id: 'c-l28-c1',
            language: 'css',
            code: `.box {
  border: 2px solid #111;
  outline-style: solid;
}

.box:hover {
  outline-width: 6px;
}`,
          },
          {
            type: 'tip',
            id: 'c-l28-t1',
            title: 'Why focus rings are allowed to be thick',
            body: 'Because an outline costs no space, a focus ring can be as heavy as it needs to be without moving the layout. That is the whole argument against `outline: none`: a border would have to be added or thickened to serve the same purpose, and that **would** move things.',
          },
          {
            type: 'exercise',
            id: 'ex-l28-x1',
            exercise: {
              id: 'ex-l28',
              instructions:
                'Set the outline width of both boxes to keywords: the first to `thick`, the second to `thin`. You will also need a style, or nothing will be drawn.',
              languages: ['css'],
              starterCode: {
                html: '<div class="heavy">thick</div>\n<div class="light">thin</div>',
                css: '.heavy {\n  border: 2px solid #111;\n  padding: 0.75rem;\n}\n.light {\n  border: 2px solid #111;\n  padding: 0.75rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l28-t1',
                  label: 'The first box has a visible outline',
                  body: 'return getComputedStyle(document.querySelector(".heavy")).outlineStyle !== "none"',
                },
                {
                  id: 'ex-l28-t2',
                  label: 'The first outline is about 5px wide',
                  body: 'const w = getComputedStyle(document.querySelector(".heavy")).outlineWidth; return parseFloat(w) >= 4 && parseFloat(w) <= 6',
                },
                {
                  id: 'ex-l28-t3',
                  label: 'The second outline is about 1px wide',
                  body: 'const w = getComputedStyle(document.querySelector(".light")).outlineWidth; return parseFloat(w) >= 1 && parseFloat(w) <= 1.5',
                },
                {
                  id: 'ex-l28-t4',
                  label: 'The first box is wider on screen than the second by the outline difference',
                  body: 'const a = document.querySelector(".heavy").getBoundingClientRect(); const b = document.querySelector(".light").getBoundingClientRect(); return a.width === b.width',
                },
              ],
              hints: [
                'The property is `outline-width`, and the keywords are unquoted: `outline-width: thick;`.',
                'A width alone draws nothing, because `outline-style` starts at `none`. Add `outline-style: solid;` as well.',
                'Try `outline-width: thick; outline-style: solid;` on `.heavy`.',
              ],
              solution: {
                html: '<div class="heavy">thick</div>\n<div class="light">thin</div>',
                css: '.heavy {\n  outline-width: thick;\n  outline-style: solid;\n  border: 2px solid #111;\n  padding: 0.75rem;\n}\n.light {\n  outline-width: thin;\n  outline-style: solid;\n  border: 2px solid #111;\n  padding: 0.75rem;\n}\n',
              },
              testNotes:
                'The last test compares border-box widths of the two elements. A very different outline width changes nothing about either box, which is the property of `outline` being tested.',
            },
          },
        ],
      },
      {
        id: 'css-l29',
        title: 'Outline Color',
        description:
          'Choosing the colour of an outline with `outline-color`, plus the two values that adapt themselves.',
        duration: 5,
        objectives: [
          'Set the colour of an outline with `outline-color`',
          'Use `invert` to get a ring that flips on dark and light backgrounds',
          'Use `currentColor` to tie the outline to the text colour of the same element',
          'Know the initial value of `outline-color` and why it surprises people',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l29',
          title: 'Outline Color quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l29-q1',
              type: 'blank',
              prompt: 'What property sets the gap between an element\'s border and its outline? Give the property name.',
              answers: [
                'outline-offset',
                'outlineoffset',
                'outline offset',
              ],
              explanation: '`outline-offset` takes a length. Positive values push the outline outward, negative values pull it inward over the element.',
            },
            {
              id: 'quiz-css-l29-q2',
              type: 'multiple-choice',
              prompt: 'On a white background, what colour does `outline-color: invert` paint?',
              options: [
                'White',
                'Black',
                'The current text colour',
                'Transparent',
              ],
              answer: 1,
              explanation: '`invert` flips the colours of the pixels it covers, so on white it paints black and on a black surface it paints white. That makes it useful on backgrounds you do not control.',
            },
            {
              id: 'quiz-css-l29-q3',
              type: 'multiple-choice',
              prompt: 'What is the initial value of `outline-color`?',
              options: [
                '`black`',
                '`currentColor`',
                '`invert`',
                '`transparent`',
              ],
              answer: 1,
              explanation: 'The initial value is `currentColor`, so `outline: solid;` with no colour draws the ring in the element\'s text colour. That is why a custom focus ring often needs only width and style.',
            },
            {
              id: 'quiz-css-l29-q4',
              type: 'multiple-choice',
              prompt: 'What does `currentColor` resolve to for an outline?',
              options: [
                'The colour of the root element',
                'The element\'s background colour',
                'The computed value of `color` on the same element',
                'A fixed browser default that cannot be changed',
              ],
              answer: 2,
              explanation: '`currentColor` means exactly "whatever `color` computes to here". Change the text colour and the outline follows with no second declaration.',
            },
            {
              id: 'quiz-css-l29-q5',
              type: 'code-output',
              prompt: 'What is drawn around the badge?',
              code: '.badge {\n  color: #ff8c3c;\n  outline: 5px solid;\n}',
              options: [
                'A 5px orange outline matching the text colour',
                'A 5px black outline, because no colour was named',
                'Nothing, because the outline colour is missing',
                'A 5px outline in the browser default focus colour',
              ],
              answer: 0,
              explanation: 'The shorthand omits the colour, so `outline-color` stays at its initial value of `currentColor`. That resolves to the badge\'s own orange text colour.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l29-b1',
            body: '`outline-color` accepts any colour notation you already know, plus two values that are specific to outlines: `invert` and `currentColor`.',
          },
          {
            type: 'demo',
            id: 'c-l29-d1',
            title: 'A plain colour, `currentColor` and `invert`',
            body: 'Three copies of the same box on the same background. The first has an explicit orange outline, the second uses `currentColor` so its ring is whatever the text is, and the third uses `invert`, which flips the colours behind it.',
            html: `<div class="row">
  <div class="plain">outline-color: #ff8c3c</div>
  <div class="current">outline-color: currentColor</div>
  <div class="inverted">outline-color: invert</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 0.75rem;
  background-color: #f2f5f8;
  padding: 0.75rem;
  border-radius: 10px;
}
.row > div {
  flex: 1;
  border: 2px solid #111;
  padding: 1rem 0.75rem;
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.plain {
  outline: 5px solid #ff8c3c;
}
.current {
  color: #1f6feb;
  outline: 5px solid currentColor;
}
.inverted {
  outline: 5px solid invert;
}`,
            height: 210,
          },
          {
            type: 'text',
            id: 'c-l29-b2',
            body: '`currentColor` is the interesting one: it means "whatever `color` resolves to on this element". Change the text colour and the outline follows with no second declaration, which is how a themed focus ring stays in sync with a themed link.',
          },
          {
            type: 'heading',
            id: 'c-l29-h1',
            level: 3,
            body: 'The values',
          },
          {
            type: 'list',
            id: 'c-l29-l1',
            style: 'bullet',
            items: [
              '**Any colour notation** — `outline-color: #29e2bd`, `rgb(41, 226, 189)`, `hsl(168, 72%, 53%)`, `teal`. Identical rules to `border-color`.',
              '**`invert`** — inverts the colours of the pixels it paints over. On a white page it draws black; on a black card it draws white. Useful for a ring that has to be visible on backgrounds you do not control.',
              '**`currentColor`** — takes the computed value of `color` on the same element. Write it with no quotes.',
              '**The initial value is `currentColor`**, which surprises people: `outline: solid;` with no colour gives you an outline in the text colour.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l29-t1',
            title: 'Default focus rings already use `currentColor`',
            body: 'When you style `:focus-visible` yourself and set only a width and a style, the ring comes out in the element\'s text colour. That is often exactly right, and it is why a custom focus ring usually needs only two declarations.',
          },
          {
            type: 'exercise',
            id: 'ex-l29-x1',
            exercise: {
              id: 'ex-l29',
              instructions:
                'Give the link a 4px outline that always matches its own text colour, without naming a colour for the outline. Add a style so the outline is actually drawn.',
              languages: ['css'],
              starterCode: {
                html: '<a class="link" href="#outline">A teal link</a>',
                css: '.link {\n  color: #29e2bd;\n  font-size: 18px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l29-t1',
                  label: 'The link has a visible outline',
                  body: 'return getComputedStyle(document.querySelector(".link")).outlineStyle !== "none"',
                },
                {
                  id: 'ex-l29-t2',
                  label: 'The outline is 4px wide',
                  body: 'return getComputedStyle(document.querySelector(".link")).outlineWidth === "4px"',
                },
                {
                  id: 'ex-l29-t3',
                  label: 'The outline colour is the same as the text colour',
                  body: 'const s = getComputedStyle(document.querySelector(".link")); return s.outlineColor === s.color',
                },
              ],
              hints: [
                'The keyword that means "the colour of the text" is `currentColor`.',
                'A width on its own draws nothing, so pair it with `outline-style: solid;`.',
                'Try `outline: 4px solid currentColor;`',
              ],
              solution: {
                html: '<a class="link" href="#outline">A teal link</a>',
                css: '.link {\n  color: #29e2bd;\n  outline: 4px solid currentColor;\n  font-size: 18px;\n}\n',
              },
              testNotes:
                'The third test compares two computed values from the same element, so it passes for `currentColor` and for any colour that happens to match — which is the property being taught.',
            },
          },
        ],
      },
      {
        id: 'css-l30',
        title: 'Outline Shorthand',
        description:
          'The `outline` shorthand, its required order, and why `outline: none` is the most damaging line in a stylesheet.',
        duration: 6,
        objectives: [
          'Write the `outline` shorthand in the width, style, colour order',
          'Explain why `outline: none` and `outline: 0` are the same thing',
          'Replace a removed focus outline with a `:focus-visible` rule that keeps it visible',
          'Say what `outline: auto` does differently from a value you write yourself',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l30',
          title: 'Outline Shorthand quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l30-q1',
              type: 'identify-error',
              prompt: 'A stylesheet contains `button:focus { outline: none; }` and nothing else. What is wrong with it?',
              code: 'button:focus {\n  outline: none;\n}',
              options: [
                '`outline: none` is not a valid value',
                'Nothing, because the default ring can be safely removed',
                'The focus ring is gone and nothing replaces it, so keyboard users cannot see where they are',
                'It should have been written `outline: 0` to be valid',
              ],
              answer: 2,
              explanation: 'Removing a focus outline is only acceptable if a `:focus-visible` rule puts a visible ring back. `outline: none` and `outline: 0` are equivalent, and both delete the only focus cue the browser was providing.',
            },
            {
              id: 'quiz-css-l30-q2',
              type: 'multiple-choice',
              prompt: 'What does `outline: solid;` leave the other outline longhands at?',
              options: [
                'It keeps any width and colour set by an earlier rule',
                'It resets the width to `medium` and the colour to `currentColor`',
                'It sets the width to `0`, so nothing is drawn',
                'It is invalid, because the shorthand requires all three parts',
              ],
              answer: 1,
              explanation: 'A shorthand resets every longhand it omits to its initial value. `outline: solid` therefore sets style to solid, width to medium and colour to currentColor.',
            },
            {
              id: 'quiz-css-l30-q3',
              type: 'multiple-choice',
              prompt: 'How do `outline: none` and `outline: 0` differ in effect?',
              options: [
                '`none` removes the ring only on focus, while `0` removes it everywhere',
                '`0` keeps a hairline outline, while `none` removes it completely',
                'There is no difference in effect: both remove the outline',
                'Only `none` is a valid declaration',
              ],
              answer: 2,
              explanation: '`none` sets the style to its initial value and `0` sets the width to zero, but both leave no visible line. Neither means "leave the current outline alone".',
            },
            {
              id: 'quiz-css-l30-q4',
              type: 'multiple-choice',
              prompt: 'What is special about `outline: auto`?',
              options: [
                'It always draws a 1px solid black ring',
                'It asks the user agent for its own focus ring, which varies between browsers',
                'It is another way of writing `outline: none`',
                'It forces the outline colour to `invert`',
              ],
              answer: 1,
              explanation: '`auto` hands the ring design to the browser. It has no single specified colour and implementations differ, so it works as a fallback rather than a designed ring.',
            },
            {
              id: 'quiz-css-l30-q5',
              type: 'multiple-choice',
              prompt: 'Which pair of rules removes the default ring but keeps focus visible for keyboard users?',
              options: [
                '`:focus { outline: 3px solid blue; }` then `:focus-visible { outline: none; }`',
                '`:focus { outline: none; }` then `:focus-visible { outline: 3px solid blue; }`',
                '`:focus-visible { outline: none; }` on its own',
                '`button { outline: 0; }` on its own',
              ],
              answer: 1,
              explanation: 'The `:focus` rule clears the browser ring and the `:focus-visible` rule puts a designed ring back for keyboard focus. Removing the ring without a replacement leaves no focus cue at all.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l30-b1',
            body: 'The `outline` shorthand sets width, style and colour in one declaration, in that order. It also has two magic values — `none` and `auto` — that are not a combination of the three longhands.',
          },
          {
            type: 'demo',
            id: 'c-l30-d1',
            title: 'The shorthand, written three ways',
            body: 'Three identical boxes. The first uses the full shorthand, the second sets the three longhands separately, and the third uses `outline: auto`. The first two are indistinguishable; the third is the browser\'s own focus ring, which draws two lines and can vary between browsers.',
            html: `<div class="row">
  <div class="short">outline: 5px solid #29e2bd</div>
  <div class="long">outline-width, outline-style, outline-color</div>
  <div class="auto">outline: auto</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 0.75rem;
}
.row > div {
  flex: 1;
  border: 2px solid #111;
  padding: 1rem 0.75rem;
  font-size: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  color: #e8edf2;
  background-color: #0b0d10;
}
.short {
  outline: 5px solid #29e2bd;
}
.long {
  outline-width: 5px;
  outline-style: solid;
  outline-color: #29e2bd;
}
.auto {
  outline: auto;
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l30-b2',
            body: 'The first two boxes are the same colour, the same thickness and the same style. Order does not matter for the longhands, and the shorthand can be written in any order of its parts — the parser matches each value to the property it belongs to. What does matter is that a style is present, and that a width is not `0`.',
          },
          {
            type: 'heading',
            id: 'c-l30-h1',
            level: 3,
            body: 'The two magic values',
          },
          {
            type: 'list',
            id: 'c-l30-l1',
            style: 'bullet',
            items: [
              '**`outline: none`** — sets `outline-style` to `none`. **This is the initial value**, so it removes an outline rather than adding one.',
              '**`outline: 0`** — sets the width to zero, which also removes it. The two are equivalent in effect, and neither of them means "no change".',
              '**`outline: auto`** — asks the user agent for its own focus ring. It has no single specified colour, and browsers implement it differently, which is why you use it as a fallback rather than as a designed ring.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l30-w1',
            title: 'Never remove a focus outline without replacing it',
            body: 'A stylesheet that sets `outline: none` on a control and provides nothing back has removed the only cue a keyboard user has for where they are. The control becomes invisible to focus. If you dislike the default ring, replace it with a `:focus-visible` rule that is at least as visible — never simply delete it.',
          },
          {
            type: 'example',
            id: 'c-l30-e1',
            title: 'Removing the ring the right way',
            body: 'The default ring only appears on mouse click for `:focus`. `:focus-visible` shows it for keyboard use, where it is needed, and the custom outline is at least as thick and coloured to stand out against both light and dark panels.',
            html: `<div class="bar">
  <button class="ghost" type="button">Ghost</button>
  <button class="solid" type="button">Solid</button>
  <a class="link" href="#outline">A link</a>
</div>`,
            css: `.bar {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f2f5f8;
}
.ghost,
.solid,
.link {
  font: inherit;
  padding: 0.5rem 0.9rem;
  border: 2px solid #111;
  border-radius: 6px;
  cursor: pointer;
}
.solid {
  background-color: #111;
  color: #f2f5f8;
}
.link {
  text-decoration: none;
  color: #111;
}
.ghost:focus,
.solid:focus,
.link:focus {
  outline: none;
}
.ghost:focus-visible,
.solid:focus-visible,
.link:focus-visible {
  outline: 3px solid #1f6feb;
  outline-offset: 2px;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l30-t1',
            title: 'The shorthand resets all three longhands',
            body: '`outline: solid;` sets the style to `solid` but also resets `outline-width` to its initial value of `medium` and `outline-color` to `currentColor`. Use the shorthand or the longhands, but do not expect one to inherit a value set by the other in a later rule.',
          },
          {
            type: 'exercise',
            id: 'ex-l30-x1',
            exercise: {
              id: 'ex-l30',
              instructions:
                'Remove the default focus ring on the button and replace it with a `:focus-visible` outline that is at least 3px wide. Both rules go in the stylesheet.',
              languages: ['css'],
              starterCode: {
                html: '<button class="btn" type="button">Send</button>',
                css: '.btn {\n  font: inherit;\n  padding: 0.6rem 1rem;\n  border: 2px solid #111;\n  border-radius: 6px;\n  background-color: #0b0d10;\n  color: #f2f5f8;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l30-t1',
                  label: 'A focus rule removes the default outline',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /:focus[^{]*\\{[^}]*outline:\\s*none/.test(css)',
                },
                {
                  id: 'ex-l30-t2',
                  label: 'A replacement ring is defined for :focus-visible',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /:focus-visible/.test(css)',
                },
                {
                  id: 'ex-l30-t3',
                  label: 'The replacement ring is at least 3px wide',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); const m = css.match(/:focus-visible[^{]*\\{[^}]*outline-width:\\s*([0-9.]+)px/); return !!m && parseFloat(m[1]) >= 3',
                },
              ],
              hints: [
                'Two rules: one on `:focus` that sets `outline: none;`, and one on `:focus-visible` that sets a real outline.',
                'Give the replacement both a width and a style, otherwise nothing is drawn.',
                'Try `:focus { outline: none; }` then `:focus-visible { outline: 3px solid #29e2bd; }`',
              ],
              solution: {
                html: '<button class="btn" type="button">Send</button>',
                css: '.btn {\n  font: inherit;\n  padding: 0.6rem 1rem;\n  border: 2px solid #111;\n  border-radius: 6px;\n  background-color: #0b0d10;\n  color: #f2f5f8;\n}\n.btn:focus {\n  outline: none;\n}\n.btn:focus-visible {\n  outline: 3px solid #29e2bd;\n  outline-offset: 2px;\n}\n',
              },
              testNotes:
                'The tests read the stylesheet rules rather than the computed style, because a focused element is not present in the preview until the learner interacts with it. The replacement width is checked by inspection against the rule you wrote.',
            },
          },
        ],
      },
      {
        id: 'css-l31',
        title: 'Outline Offset',
        description:
          'The gap between the border and the outline, and what happens when you push the outline inward.',
        duration: 5,
        objectives: [
          'Create a gap between an element\'s border and its outline with `outline-offset`',
          'Use a negative `outline-offset` to pull an outline inside the border edge',
          'Say what a negative offset looks like when it exceeds the border width',
          'Use an offset to keep a focus ring clear of a thick or rounded border',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l31',
          title: 'Outline Offset quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l31-q1',
              type: 'true-false',
              prompt: 'Adding a wide outline to an element makes its neighbours move.',
              answer: false,
              explanation: 'Outlines take up no space in the layout. Nothing reflows, no sibling shifts, and the parent height is unchanged, which is exactly why outlines are safe for focus rings.',
            },
            {
              id: 'quiz-css-l31-q2',
              type: 'multiple-choice',
              prompt: 'What does `outline-offset: 8px` do?',
              options: [
                'Moves the outline 8px inward, over the padding',
                'Leaves an 8px gap between the border and the outline',
                'Makes the outline itself 8px thick',
                'Adds 8px of margin around the element',
              ],
              answer: 1,
              explanation: '`outline-offset` controls the distance between the border edge and the outline. A positive value pushes the line outward and leaves that much empty space between them.',
            },
            {
              id: 'quiz-css-l31-q3',
              type: 'multiple-choice',
              prompt: 'Where is an outline drawn on a 2px border with `outline-offset: -10px`?',
              options: [
                'Completely outside the element, 10px away from the border',
                'Exactly on top of the 2px border',
                'Over the padding and possibly over the content',
                'It disappears, because negative offsets are ignored',
              ],
              answer: 2,
              explanation: 'A negative offset pulls the line inward. Once it exceeds the border width it lands on the padding and can overlap the content, because it is painted where it is placed.',
            },
            {
              id: 'quiz-css-l31-q4',
              type: 'multiple-choice',
              prompt: 'What is the initial value of `outline-offset`, and what does it look like?',
              options: [
                '`0`, so the outline sits flush against the outer border edge',
                '`2px`, so there is always a small gap',
                '`-2px`, so the outline tucks inside the border',
                '`auto`, so the browser chooses a gap per element',
              ],
              answer: 0,
              explanation: 'The initial offset is zero: the outline is drawn immediately against the outside of the border with no gap. A small offset such as 2px is a deliberate choice to separate the two lines.',
            },
            {
              id: 'quiz-css-l31-q5',
              type: 'multiple-choice',
              prompt: 'A percentage in `outline-offset` is resolved against what?',
              options: [
                'The viewport width',
                'The element\'s own width',
                'The parent element\'s height',
                'The current font size',
              ],
              answer: 1,
              explanation: 'A percentage offset resolves against the width of the element itself, so the gap scales with the box. That is rarely what you want on a non-square element.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l31-b1',
            body: '`outline-offset` sets the distance between the border edge and the outline. Positive values push the outline further out, negative values pull it in so it is drawn over the element itself.',
          },
          {
            type: 'demo',
            id: 'c-l31-d1',
            title: 'Positive, zero and negative offsets',
            body: 'Three boxes with the same 6px outline. The first is pulled 4px inside its border, the second sits flush against it, and the third is pushed 8px out. Watch the text: it does not move in any of them.',
            html: `<div class="row">
  <div class="inside">offset: -4px</div>
  <div class="flush">offset: 0</div>
  <div class="outside">offset: 8px</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 0.5rem;
}
.row > div {
  flex: 1;
  border: 2px solid #111;
  outline: 6px solid #29e2bd;
  outline-style: solid;
  padding: 1rem;
  font-size: 13px;
  background-color: #0b0d10;
  color: #e8edf2;
}
.inside {
  outline-offset: -4px;
}
.flush {
  outline-offset: 0;
}
.outside {
  outline-offset: 8px;
}`,
            height: 230,
          },
          {
            type: 'text',
            id: 'c-l31-b2',
            body: 'The offset creates the gap. With `outline-offset: 8px` there is 8px of empty space between the black border and the green line; with a negative value the line is drawn inward over the element, on top of its padding and possibly its content.',
          },
          {
            type: 'heading',
            id: 'c-l31-h1',
            level: 3,
            body: 'The values',
          },
          {
            type: 'list',
            id: 'c-l31-l1',
            style: 'bullet',
            items: [
              '**A positive length** — the outline is moved outward, leaving that much space between the border and the line. This is what most focus rings use.',
              '**`0`** — the initial value. The outline is drawn immediately against the outside edge of the border, with no gap.',
              '**A negative length** — the outline moves inward. A negative offset larger than the border width draws the outline on top of the padding and content.',
              '**A percentage** — resolves against the width of the element itself, so the gap scales with the box. Rarely what you want on a non-square element.',
            ],
          },
          {
            type: 'text',
            id: 'c-l31-b3',
            body: 'The offset is also outside the box model, in the same way the outline itself is. Moving it never reflows anything, and it never counts towards the space an element occupies. It only changes where the line is painted.',
          },
          {
            type: 'tip',
            id: 'c-l31-t1',
            title: 'A small offset stops the ring merging with the border',
            body: '`outline-offset: 2px` is the common choice on a focus ring. With `0` and a border of a similar colour, the ring and the border read as one thick smudge; a couple of pixels of gap separates them without adding any layout.',
          },
          {
            type: 'exercise',
            id: 'ex-l31-x1',
            exercise: {
              id: 'ex-l31',
              instructions:
                'Give the badge a 4px solid outline and push it 6px away from its border, so there is a visible gap of empty space around it.',
              languages: ['css'],
              starterCode: {
                html: '<span class="badge">New</span>',
                css: '.badge {\n  display: inline-block;\n  border: 2px solid #111;\n  padding: 0.4rem 0.75rem;\n  background-color: #0b0d10;\n  color: #29e2bd;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l31-t1',
                  label: 'The badge has a 4px outline',
                  body: 'return getComputedStyle(document.querySelector(".badge")).outlineWidth === "4px"',
                },
                {
                  id: 'ex-l31-t2',
                  label: 'The outline is 6px away from the border',
                  body: 'return getComputedStyle(document.querySelector(".badge")).outlineOffset === "6px"',
                },
                {
                  id: 'ex-l31-t3',
                  label: 'The badge itself did not grow to make room for the outline',
                  body: 'const el = document.querySelector(".badge"); return el.getBoundingClientRect().height < 60',
                },
              ],
              hints: [
                'The offset property is `outline-offset`, and it takes a plain length.',
                'An outline needs a style before it draws, so use the `outline` shorthand.',
                'Try `outline: 4px solid #29e2bd; outline-offset: 6px;`',
              ],
              solution: {
                html: '<span class="badge">New</span>',
                css: '.badge {\n  display: inline-block;\n  border: 2px solid #111;\n  outline: 4px solid #29e2bd;\n  outline-offset: 6px;\n  padding: 0.4rem 0.75rem;\n  background-color: #0b0d10;\n  color: #29e2bd;\n}\n',
              },
              testNotes:
                'The third test checks the rendered height of the badge, confirming that neither the outline nor the offset added any space to the element.',
            },
          },
        ],
      },
    ],
  },
]