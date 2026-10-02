import type { Section } from '~/types/content'

export const cssTextSection: Section = {
  id: 'css-s15',
  title: 'CSS Text',
  description:
    'The properties that decide how text looks and how comfortably it reads: colour, alignment, decoration, case, spacing and shadow.',
  lessons: [
    {
      id: 'css-l32',
      title: 'Text Color',
      description:
        'Setting the colour of text with `color`, and why one declaration on a parent is usually enough.',
      duration: 4,
      objectives: [
        'Set the colour of text with the `color` property',
        'Predict which descendants inherit a `color` value',
        'Override an inherited colour on a single child without touching the rest',
      ],
      xp: 30,
      content: [
        {
          type: 'text',
          id: 'c-l32-b1',
          body: 'The `color` property sets the colour of text. It is an **inherited** property, which means a child element takes its parent\'s colour unless it sets one of its own.',
        },
        {
          type: 'demo',
          id: 'c-l32-d1',
          title: 'One colour, three children, one override',
          body: 'The wrapper sets `color` once. The first two paragraphs inherit it. The third sets its own `color` and is the only one that changes.',
          html: `<div class="note">
  <p>A plain paragraph, inheriting.</p>
  <p>Another one, still inheriting.</p>
  <p class="warn">This paragraph overrides the inherited colour.</p>
</div>`,
          css: `.note {
  color: #b91c1c;
  font-size: 15px;
}
.note p {
  margin: 0 0 0.5rem;
}
.note .warn {
  color: #1d4ed8;
}`,
          height: 200,
        },
        {
          type: 'text',
          id: 'c-l32-b2',
          body: 'The wrapper is the only thing that sets a base colour. Two paragraphs pick it up with no rule of their own; the third has one `color` line that beats inheritance.',
        },
        { type: 'heading', id: 'c-l32-h1', level: 3, body: 'How it works' },
        {
          type: 'code',
          id: 'c-l32-c1',
          language: 'css',
          code: `.note {
  color: #b91c1c;
}
.note .warn {
  color: #1d4ed8;
}`,
        },
        {
          type: 'list',
          id: 'c-l32-l1',
          style: 'bullet',
          items: [
            '`color` accepts any colour: a hex value, `rgb()`, `hsl()` or a named colour like `tomato`.',
            'It also sets the colour of the text in `<a>` elements, because the default link colour is only a starting point.',
            'It is inherited, so set it once on a wrapper — usually `body` — rather than repeating it on every heading and paragraph.',
            'A child only deviates when it has its own `color` declaration. You never re-declare the inherited value just to keep it.',
          ],
        },
        {
          type: 'tip',
          id: 'c-l32-t1',
          title: 'Set the default on body',
          body: '`body { color: #1f2933; }` gives the whole page a base colour. Everything after that is a deliberate accent, not a requirement.',
        },
        {
          type: 'warning',
          id: 'c-l32-w1',
          title: 'Text contrast is a real requirement',
          body: 'Colour alone is never a signal. Keep body text at a contrast ratio of at least 4.5:1 against its background, and never make colour the only way a link looks different from the text around it.',
        },
        {
          type: 'exercise',
          id: 'c-l32-x1',
          exercise: {
            id: 'ex-l32',
            instructions:
              'Set the wrapper\'s text colour to #b91c1c and give the paragraph with the class `accent` its own colour, #1d4ed8.',
            languages: ['css'],
            starterCode: {
              html: '<div class="panel">\n  <p>Plain paragraph</p>\n  <p class="accent">Accented paragraph</p>\n</div>',
              css: '.panel {\n  \n}\n',
            },
            tests: [
              { id: 'ex-l32-t1', label: 'The panel sets a red text colour', body: 'return getComputedStyle(document.querySelector(".panel")).color === "rgb(185, 28, 28)"' },
              { id: 'ex-l32-t2', label: 'The plain paragraph inherits it', body: 'return getComputedStyle(document.querySelector(".panel p")).color === "rgb(185, 28, 28)"' },
              { id: 'ex-l32-t3', label: 'The accented paragraph overrides it', body: 'return getComputedStyle(document.querySelector(".panel .accent")).color === "rgb(29, 78, 216)"' },
            ],
            hints: [
              'One rule on `.panel` covers both paragraphs — inheritance does the rest.',
              'The override needs its own selector: `.panel .accent` or just `.accent`.',
              'Try `color: #b91c1c;` on `.panel` and `color: #1d4ed8;` on `.accent`.',
            ],
            solution: {
              html: '<div class="panel">\n  <p>Plain paragraph</p>\n  <p class="accent">Accented paragraph</p>\n</div>',
              css: '.panel {\n  color: #b91c1c;\n}\n.panel .accent {\n  color: #1d4ed8;\n}\n',
            },
            testNotes:
              'The tests compare computed `color` values, which browsers report in `rgb()` form.',
          },
        },
      ],
    },
    {
      id: 'css-l33',
      title: 'Text Alignment',
      description:
        'Aligning text horizontally with `text-align`, why it needs a constrained width, and the logical `start` and `end` values.',
      duration: 5,
      objectives: [
        'Align text with `left`, `right`, `center` and `justify`',
        'Explain why centred text needs a constrained width to be visible',
        'Use `start` and `end` so alignment follows writing direction',
      ],
      xp: 32,
      content: [
        {
          type: 'text',
          id: 'c-l33-b1',
          body: '`text-align` sets the horizontal alignment of the text inside an element. It only moves the text within the space the element already occupies.',
        },
        {
          type: 'demo',
          id: 'c-l33-d1',
          title: 'One paragraph, four alignments',
          body: 'The same paragraph appears four times inside a fixed-width box, once per value. The box is what makes the difference visible — without a width every line already fills the page and they all look identical.',
          html: `<div class="align-box">
  <p class="a-left">Alignment only changes where the line sits inside the element. The line is exactly the same length in all four cases.</p>
  <p class="a-right">Alignment only changes where the line sits inside the element. The line is exactly the same length in all four cases.</p>
  <p class="a-center">Alignment only changes where the line sits inside the element. The line is exactly the same length in all four cases.</p>
  <p class="a-justify">Alignment only changes where the line sits inside the element. The line is the same length in all four, and justify stretches each to both edges.</p>
</div>`,
          css: `.align-box {
  width: 340px;
  border: 1px solid #d5dae0;
  padding: 1rem;
  font-size: 14px;
}
.align-box p {
  margin: 0 0 0.75rem;
}
.align-box p:last-child {
  margin-bottom: 0;
}
.a-left { text-align: left; }
.a-right { text-align: right; }
.a-center { text-align: center; }
.a-justify { text-align: justify; }`,
          height: 300,
        },
        {
          type: 'text',
          id: 'c-l33-b2',
          body: 'Each paragraph is a block element, so it already fills the width of the box. `text-align` then decides where every line is placed within that width.',
        },
        { type: 'heading', id: 'c-l33-h1', level: 3, body: 'How it works' },
        {
          type: 'code',
          id: 'c-l33-c1',
          language: 'css',
          code: `.align-box {
  width: 340px;
}
.a-center {
  text-align: center;
}
.a-justify {
  text-align: justify;
}`,
        },
        {
          type: 'list',
          id: 'c-l33-l1',
          style: 'bullet',
          items: [
            '`left`, `right` and `center` are the everyday values. `left` is the default.',
            '`justify` stretches every line except the last so both edges are flush. It looks bad at narrow widths, where it produces rivers of white space.',
            '`text-align` is inherited, so setting it once on a container aligns all the text inside it.',
            '`start` and `end` align to the reading direction rather than a physical side. In a left-to-right language they behave like `left` and `right`, but in a right-to-left one they flip automatically.',
          ],
        },
        {
          type: 'tip',
          id: 'c-l33-t1',
          title: 'Give centred text a max-width',
          body: 'A full-width centred paragraph is unreadable because the eye cannot find the start of the next line. Cap it with `max-width: 65ch`, centre the *block* with margin, then let the text sit left inside it.',
        },
        {
          type: 'warning',
          id: 'c-l33-w1',
          title: 'Never justify body copy on a phone',
          body: '`justify` depends on wide lines. On a narrow screen it produces large uneven gaps between words and makes text noticeably harder to read.',
        },
        {
          type: 'exercise',
          id: 'c-l33-x1',
          exercise: {
            id: 'ex-l33',
            instructions:
              'Give the box a width of 300px and centre the text inside it.',
            languages: ['css'],
            starterCode: {
              html: '<div class="box">\n  <p>Centred text sits in the middle of the box, whatever the box measures.</p>\n</div>',
              css: '.box {\n  border: 1px solid #d5dae0;\n  padding: 1rem;\n}\n',
            },
            tests: [
              { id: 'ex-l33-t1', label: 'The paragraph text is centred', body: 'return getComputedStyle(document.querySelector("p")).textAlign === "center"' },
              { id: 'ex-l33-t2', label: 'The box is 300px wide', body: 'return getComputedStyle(document.querySelector(".box")).width === "300px"' },
            ],
            hints: [
              'Without a `width` the box fills its parent, so the alignment is invisible.',
              'Set the width on `.box` and the alignment on the `p` inside it, not on both.',
              'Add `width: 300px;` to `.box` and `text-align: center;` to `.box p`.',
            ],
            solution: {
              html: '<div class="box">\n  <p>Centred text sits in the middle of the box, whatever the box measures.</p>\n</div>',
              css: '.box {\n  width: 300px;\n  border: 1px solid #d5dae0;\n  padding: 1rem;\n}\n.box p {\n  text-align: center;\n}\n',
            },
            testNotes:
              'The tests read computed `text-align` and `width`. Padding is added outside `width`.',
          },
        },
      ],
    },
    {
      id: 'css-l34',
      title: 'Text Decoration',
      description:
        'Underlines, overlines and line-throughs, and how to control their style, colour, thickness and offset.',
      duration: 6,
      objectives: [
        'Add underlines, overlines and line-throughs with `text-decoration-line`',
        'Style a decoration with `-style`, `-color` and `-thickness`',
        'Lift a decoration off the text with `text-underline-offset`',
      ],
      xp: 36,
      content: [
        {
          type: 'text',
          id: 'c-l34-b1',
          body: 'Text decoration is the set of lines drawn through or under text: underlines, overlines and strikethroughs. Each part is a separate property, and the `text-decoration` shorthand sets several at once.',
        },
        {
          type: 'demo',
          id: 'c-l34-d1',
          title: 'A thin link underline and a thick heading underline',
          body: 'The link keeps the browser default underline. The heading replaces it with a 6px pink line offset 8px below the text, so the two never collide.',
          html: `<p>Read the <a href="#">text decoration reference</a> for the full list of values.</p>
<h3 class="rule">A heading with a thick coloured underline</h3>
<p class="muted">The pink rule is 6px thick and sits 8px clear of the glyphs.</p>`,
          css: `a {
  color: #1d4ed8;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
.rule {
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #ec4899;
  text-decoration-thickness: 6px;
  text-underline-offset: 8px;
  font-size: 20px;
}
.muted {
  color: #6b7280;
  font-size: 14px;
}`,
          height: 200,
        },
        {
          type: 'text',
          id: 'c-l34-b2',
          body: 'Both elements are underlined, but nothing about the two lines is shared. Each one is styled entirely on its own element.',
        },
        { type: 'heading', id: 'c-l34-h1', level: 3, body: 'How it works' },
        {
          type: 'code',
          id: 'c-l34-c1',
          language: 'css',
          code: `.rule {
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: #ec4899;
  text-decoration-thickness: 6px;
  text-underline-offset: 8px;
}`,
        },
        {
          type: 'list',
          id: 'c-l34-l1',
          style: 'bullet',
          items: [
            '`text-decoration-line` accepts `none`, `underline`, `overline`, `line-through`, or several separated by spaces — `underline line-through` is valid.',
            '`text-decoration-style` accepts `solid`, `double`, `dotted`, `dashed` and `wavy`. It has no visible effect unless `text-decoration-line` is not `none`.',
            '`text-decoration-color` sets the line colour independently of `color`.',
            '`text-decoration-thickness` takes a length or a percentage, and defaults to `auto`, which lets the browser pick something sensible for the font size.',
            '`text-underline-offset` moves an underline down or up. `0.2em` sits clear of the descenders.',
          ],
        },
        {
          type: 'warning',
          id: 'c-l34-w1',
          title: 'Decoration paints over the text',
          body: 'Underlines are drawn on top of the glyphs, so a thick line tight to the baseline cuts straight through the descenders on `g`, `y` and `p`. Raise it with `text-underline-offset` or thin it down.',
        },
        {
          type: 'tip',
          id: 'c-l34-t1',
          title: 'Skip the ink on wrapped links',
          body: '`text-decoration-skip-ink: auto` lets the underline pass behind the descenders and whitespace of each line instead of through them. It is the biggest single upgrade to a long link underline.',
        },
        {
          type: 'exercise',
          id: 'c-l34-x1',
          exercise: {
            id: 'ex-l34',
            instructions:
              'Underline the heading with a 5px thick line, sitting 4px below the text.',
            languages: ['css'],
            starterCode: {
              html: '<h3 class="head">Report highlights</h3>',
              css: '.head {\n  font-size: 20px;\n}\n',
            },
            tests: [
              { id: 'ex-l34-t1', label: 'The heading is underlined', body: 'return getComputedStyle(document.querySelector(".head")).textDecorationLine === "underline"' },
              { id: 'ex-l34-t2', label: 'The underline is 5px thick', body: 'return getComputedStyle(document.querySelector(".head")).textDecorationThickness === "5px"' },
              { id: 'ex-l34-t3', label: 'The underline is offset 4px', body: 'return getComputedStyle(document.querySelector(".head")).textUnderlineOffset === "4px"' },
            ],
            hints: [
              'A decoration has no thickness until `text-decoration-line` is set to something other than `none`.',
              'The offset property is `text-underline-offset`, not `text-decoration-offset`.',
              'Try `text-decoration-line: underline; text-decoration-thickness: 5px; text-underline-offset: 4px;`',
            ],
            solution: {
              html: '<h3 class="head">Report highlights</h3>',
              css: '.head {\n  font-size: 20px;\n  text-decoration-line: underline;\n  text-decoration-thickness: 5px;\n  text-underline-offset: 4px;\n}\n',
            },
            testNotes:
              'The tests read `textDecorationLine`, `textDecorationThickness` and `textUnderlineOffset`.',
          },
        },
      ],
    },
    {
      id: 'css-l35',
      title: 'Text Transformation',
      description:
        'Forcing text to upper or lower case visually, and why that changes what people can read and search.',
      duration: 6,
      objectives: [
        'Force a case with `uppercase`, `lowercase` and `capitalize`',
        'Explain why `text-transform` does not change the underlying text',
        'Avoid transforming text that a screen reader or search engine must read correctly',
      ],
      xp: 40,
      content: [
        {
          type: 'text',
          id: 'c-l35-b1',
          body: '`text-transform` forces the *displayed* case of text: `uppercase`, `lowercase`, `capitalize` (which uppercases the first letter of every word), or `none`.',
        },
        {
          type: 'demo',
          id: 'c-l35-d1',
          title: 'The heading reads in caps, the source does not',
          body: 'The heading was typed in mixed case and renders as all capitals. The blue line underneath is the real string from the DOM, unchanged.',
          html: `<h3 class="shout">the quiet art of typography</h3>
<p class="truth">Actual DOM text: <code>the quiet art of typography</code></p>
<p class="copy">The heading above is drawn in capitals. The line below, which is not transformed, shows you what the markup actually contains: the same lower-case letters.</p>`,
          css: `.shout {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 0.5rem;
}
.truth {
  color: #1d4ed8;
  font-size: 14px;
  margin: 0 0 0.75rem;
}
.copy {
  color: #4b5563;
  font-size: 14px;
  margin: 0;
}`,
          height: 220,
        },
        {
          type: 'text',
          id: 'c-l35-b2',
          body: 'Two different strings. The one the browser draws is all capitals; the one in the DOM still has `t`, `q`, `a`, `r` and `p` in lower case, which is what you see in the blue line.',
        },
        { type: 'heading', id: 'c-l35-h1', level: 3, body: 'How it works' },
        {
          type: 'code',
          id: 'c-l35-c1',
          language: 'css',
          code: `.shout {
  text-transform: uppercase;
  letter-spacing: 0.06em;
}`,
        },
        {
          type: 'list',
          id: 'c-l35-l1',
          style: 'bullet',
          items: [
            '`uppercase` renders `a` as `A`. `lowercase` renders `A` as `a`. `capitalize` uppercases the first letter of each word and leaves the rest alone.',
            'The transformation is visual only. Copy the heading out of the page and you get the original lower-case text.',
            'It inherits, so one rule on a container transforms everything inside it.',
            '`capitalize` also uppercases the first letter after an apostrophe, so `don\'t` becomes `Don\'T`.',
          ],
        },
        {
          type: 'warning',
          id: 'c-l35-w1',
          title: 'This changes appearance, not content',
          body: 'The DOM still holds `the quiet art`. A screen reader announces the original lower-case string, a search for "The" misses a heading that looks like it says THE, and anything that copies the text — a quote, a form submission, a translation service — gets the wrong casing. Uppercase also flattens the ascender and descender cues that give a word its shape, which is why long uppercase passages are hard to read.',
        },
        {
          type: 'tip',
          id: 'c-l35-t1',
          title: 'Type the capitals instead',
          body: 'If the words must genuinely be capitals — an acronym, a brand name, a label assistive tech reads out loud — write them in capitals in the HTML and leave `text-transform` off. Keep the property for decorative headings where the exact casing carries no meaning.',
        },
        {
          type: 'exercise',
          id: 'c-l35-x1',
          exercise: {
            id: 'ex-l35',
            instructions:
              'Force the label to display in uppercase. Leave the markup alone.',
            languages: ['css'],
            starterCode: {
              html: '<p class="label">weekly summary</p>',
              css: '.label {\n  \n}\n',
            },
            tests: [
              { id: 'ex-l35-t1', label: 'The label renders in uppercase', body: 'return getComputedStyle(document.querySelector(".label")).textTransform === "uppercase"' },
              { id: 'ex-l35-t2', label: 'The underlying text was not changed', body: 'return document.querySelector(".label").textContent === "weekly summary"' },
            ],
            hints: [
              'The HTML is already correct. You only need one declaration.',
              'If you were tempted to edit the text itself, that is the trap this lesson is about.',
              'Add `text-transform: uppercase;` to `.label`.',
            ],
            solution: {
              html: '<p class="label">weekly summary</p>',
              css: '.label {\n  text-transform: uppercase;\n}\n',
            },
            testNotes:
              'The second test proves the point: the rendered case changed while the DOM string did not.',
          },
        },
      ],
    },
    {
      id: 'css-l36',
      title: 'Text Spacing',
      description:
        'Controlling space between letters, between words, and between lines — and why `line-height` should have no unit.',
      duration: 7,
      objectives: [
        'Space out letters with `letter-spacing` and words with `word-spacing`',
        'Set readable leading with `line-height`',
        'Explain why a unitless `line-height` survives a font-size change',
      ],
      xp: 44,
      content: [
        {
          type: 'text',
          id: 'c-l36-b1',
          body: 'Three properties control the space inside a piece of text: `letter-spacing` between characters, `word-spacing` between words, and `line-height` between lines.',
        },
        {
          type: 'demo',
          id: 'c-l36-d1',
          title: 'The same paragraph at three line heights',
          body: 'One paragraph at `line-height` 1, 1.6 and 2.5. The gap between lines is the only thing that changes.',
          html: `<div class="spacer">
  <p class="lh-1">Typography is the craft of arranging type so that it communicates. Line height is the single most important control over how long a passage stays comfortable to read.</p>
  <p class="lh-2">Typography is the craft of arranging type so that it communicates. Line height is the single most important control over how long a passage stays comfortable to read.</p>
  <p class="lh-3">Typography is the craft of arranging type so that it communicates. Line height is the single most important control over how long a passage stays comfortable to read.</p>
</div>`,
          css: `.spacer {
  width: 340px;
  font-size: 14px;
}
.spacer p {
  margin: 0 0 0.75rem;
  background: #f4f6f8;
  padding: 0.5rem;
}
.lh-1 { line-height: 1; }
.lh-2 { line-height: 1.6; }
.lh-3 { line-height: 2.5; }`,
          height: 320,
        },
        {
          type: 'text',
          id: 'c-l36-b2',
          body: '`line-height: 1` packs the lines so tightly that ascenders and descenders from neighbouring lines collide. Around `1.5` to `1.7` is comfortable for body copy; `2.5` is readable but wasteful.',
        },
        { type: 'heading', id: 'c-l36-h1', level: 3, body: 'How it works' },
        {
          type: 'code',
          id: 'c-l36-c1',
          language: 'css',
          code: `.lh-2 {
  line-height: 1.6;
}
.tracked {
  letter-spacing: 0.08em;
}
.wide {
  word-spacing: 0.2em;
}`,
        },
        {
          type: 'list',
          id: 'c-l36-l1',
          style: 'bullet',
          items: [
            '`letter-spacing` takes a length. It adds space *after* each character, so a small positive value optically widens a word.',
            '`word-spacing` takes a length and only affects the space between words.',
            '`line-height` multiplies the font size when it is unitless: `1.6` means 1.6 times the font size. It sets the height of the line box, not of the glyphs.',
            'Negative values are valid for `letter-spacing` and `word-spacing` and are used to tighten large display type.',
            'All three are inherited.',
          ],
        },
        {
          type: 'warning',
          id: 'c-l36-w1',
          title: 'Leave line-height unitless',
          body: 'A unitless `line-height` is computed against each element\'s own font size, so `1.6` stays a comfortable 1.6-to-1 ratio everywhere. Write `line-height: 25px`, nest something at a smaller font size, and the ratio becomes enormous.',
        },
        {
          type: 'tip',
          id: 'c-l36-t1',
          title: 'Tracking for uppercase labels',
          body: 'Uppercase text has no ascender and descender cues, so a little `letter-spacing` — `0.06em` to `0.12em` — is what makes it readable. Pair it with a slightly heavier `font-weight`.',
        },
        {
          type: 'exercise',
          id: 'c-l36-x1',
          exercise: {
            id: 'ex-l36',
            instructions:
              'Set the paragraph to a unitless line height of 1.8 and add 2px of letter spacing.',
            languages: ['css'],
            starterCode: {
              html: '<p class="body">A comfortable line height makes a long paragraph easy to stay with.</p>',
              css: '.body {\n  width: 320px;\n}\n',
            },
            tests: [
              { id: 'ex-l36-t1', label: 'The line height is a unitless 1.8', body: 'return getComputedStyle(document.querySelector(".body")).lineHeight === "1.8"' },
              { id: 'ex-l36-t2', label: 'The letters are spaced 2px apart', body: 'return getComputedStyle(document.querySelector(".body")).letterSpacing === "2px"' },
            ],
            hints: [
              'Write `1.8` with no unit — that is what keeps the ratio correct at any font size.',
              '`letter-spacing` is a plain length, so `2px` is right here.',
              'Add `line-height: 1.8;` and `letter-spacing: 2px;` to `.body`.',
            ],
            solution: {
              html: '<p class="body">A comfortable line height makes a long paragraph easy to stay with.</p>',
              css: '.body {\n  width: 320px;\n  line-height: 1.8;\n  letter-spacing: 2px;\n}\n',
            },
            testNotes:
              'A unitless `line-height` is reported by the browser exactly as written, so the test compares against `"1.8"`.',
          },
        },
      ],
    },
    {
      id: 'css-l37',
      title: 'Text Shadow',
      description:
        'Dropping a shadow behind text with `text-shadow`, stacking several of them, and where `filter: drop-shadow()` differs.',
      duration: 7,
      objectives: [
        'Give text a shadow with offset, blur and colour values',
        'Stack multiple shadows by separating them with commas',
        'Explain what `filter: drop-shadow()` does differently from `text-shadow`',
      ],
      xp: 48,
      content: [
        {
          type: 'text',
          id: 'c-l37-b1',
          body: '`text-shadow` draws a blurred copy of the text behind it. The value is a list: a horizontal offset, a vertical offset, an optional blur radius and an optional colour.',
        },
        {
          type: 'demo',
          id: 'c-l37-d1',
          title: 'One shadow, two shadows, and drop-shadow',
          body: 'The first heading has one shadow, the second stacks two, and the third uses `filter: drop-shadow()`. The blue mark behind the last heading shows the difference: the filter follows the element shape, not the glyphs.',
          html: `<h3 class="one">Single shadow</h3>
<h3 class="two">Two stacked shadows</h3>
<h3 class="filtered">Filtered drop shadow</h3>
<p class="note">The filter renders the whole element, so the shadow sits behind the solid circle behind this line rather than following the glyph outlines.</p>`,
          css: `.one {
  color: #0f172a;
  text-shadow: 2px 2px 0 #94a3b8;
}
.two {
  color: #f8fafc;
  text-shadow:
    3px 3px 0 #1d4ed8,
    6px 6px 0 #ec4899;
}
.filtered {
  color: #f8fafc;
  filter: drop-shadow(4px 4px 0 #0ea5e9);
}
.note {
  color: #4b5563;
  font-size: 14px;
}`,
          height: 280,
        },
        {
          type: 'text',
          id: 'c-l37-b2',
          body: 'The three headings use the same weight and colour. What changes is whether the depth comes from text geometry or from the filter pipeline.',
        },
        { type: 'heading', id: 'c-l37-h1', level: 3, body: 'How it works' },
        {
          type: 'code',
          id: 'c-l37-c1',
          language: 'css',
          code: `.one {
  text-shadow: 2px 2px 0 #94a3b8;
}
.two {
  text-shadow:
    3px 3px 0 #1d4ed8,
    6px 6px 0 #ec4899;
}
.filtered {
  filter: drop-shadow(4px 4px 0 #0ea5e9);
}`,
        },
        {
          type: 'list',
          id: 'c-l37-l1',
          style: 'bullet',
          items: [
            'The first two values are required: `x-offset y-offset`. Both take lengths and may be negative.',
            'The blur radius is optional and defaults to `0`, which gives a hard-edged offset copy. A blur makes it a soft glow.',
            'The colour comes last, even though `text-shadow` and `box-shadow` otherwise share a syntax. Omit it and you get the browser default.',
            'Several shadows go in one declaration, separated by commas, painted front to back — the first in the list ends up on top.',
            '`text-shadow` follows the glyphs only. It never draws a rectangle, and it is painted behind the text colour.',
            '`filter: drop-shadow()` takes the same values but applies them to the whole rendered element, shapes and text together. That makes it the right tool when the shadow must follow an avatar, a badge or a transparent image.',
            'A `drop-shadow` is drawn *behind* the element, unlike `box-shadow`, which is drawn outside the border box. It is also more expensive to render, so use it only where it earns its cost.',
          ],
        },
        {
          type: 'warning',
          id: 'c-l37-w1',
          title: 'Shadows are decoration, not a fix',
          body: 'A heavy shadow on body text hurts legibility and can drop the contrast below the accessible minimum. If text looks weak, fix the colour first and keep any shadow subtle.',
        },
        {
          type: 'exercise',
          id: 'c-l37-x1',
          exercise: {
            id: 'ex-l37',
            instructions:
              'Give the heading a text shadow offset 3px right and 3px down, with no blur.',
            languages: ['css'],
            starterCode: {
              html: '<h3 class="lift">Annual report</h3>',
              css: '.lift {\n  color: #0f172a;\n}\n',
            },
            tests: [
              { id: 'ex-l37-t1', label: 'The heading has a text shadow', body: 'return getComputedStyle(document.querySelector(".lift")).textShadow !== "none"' },
              { id: 'ex-l37-t2', label: 'The shadow is offset 3px on both axes', body: 'return getComputedStyle(document.querySelector(".lift")).textShadow === "rgb(15, 23, 42) 3px 3px 0px"' },
            ],
            hints: [
              'The offsets are the first two values, the blur comes third and the colour last.',
              'Omitting the blur gives the same result as writing `0`, and the computed value reports `0px` either way.',
              'Try `text-shadow: 3px 3px 0 #0f172a;`',
            ],
            solution: {
              html: '<h3 class="lift">Annual report</h3>',
              css: '.lift {\n  color: #0f172a;\n  text-shadow: 3px 3px 0 #0f172a;\n}\n',
            },
            testNotes:
              'Browsers report a resolved shadow as `colour x y blur`, so a hard shadow reads as `0px`.',
          },
        },
      ],
    },
  ],
  quiz: {
    id: 'quiz-css-s15',
    title: 'CSS Text quiz',
    passingScore: 60,
    questions: [
      {
        id: 'quiz-css-s15-q1',
        type: 'multiple-choice',
        prompt: 'Why does `text-align: center` appear to do nothing on a full-width paragraph?',
        options: [
          '`text-align` only works on inline elements',
          'The paragraph already fills its container, so there is no leftover space to centre within',
          'Centring requires `display: flex`',
          'The browser ignores it below 400px',
        ],
        answer: 1,
        explanation:
          'A block element is as wide as its container by default, so every line already reaches both edges. You need a `width` or `max-width` on the block first — centre the block with margin, then align the text inside it.',
      },
      {
        id: 'quiz-css-s15-q2',
        type: 'true-false',
        prompt: '`text-transform: uppercase` changes the actual characters stored in the DOM.',
        answer: false,
        explanation:
          'It is visual only. The DOM keeps the original string, which is why screen readers, search and anything copying the text get the original casing.',
      },
      {
        id: 'quiz-css-s15-q3',
        type: 'code-output',
        prompt: 'What does this rule produce?',
        code: '.notice {\n  text-decoration-line: underline;\n  text-decoration-thickness: 4px;\n  text-underline-offset: 3px;\n}',
        options: [
          'A 4px underline sitting 3px below the text',
          'A 3px underline sitting 4px below the text',
          'A 4px underline offset 3px in from the text',
          'Nothing — a decoration needs a style keyword',
        ],
        answer: 0,
        explanation:
          '`text-decoration-thickness` is the line thickness and `text-underline-offset` is the gap between the line and the text: 4px and 3px respectively.',
      },
      {
        id: 'quiz-css-s15-q4',
        type: 'blank',
        prompt:
          'Complete the sentence: `line-height` should usually be written without a unit so it stays proportional when the ________ changes.',
        answers: ['font size', 'font-size'],
        explanation:
          'A unitless value is a multiplier of the element\'s own font size, so `1.6` stays a 1.6-to-1 ratio no matter how large or small the text becomes.',
      },
      {
        id: 'quiz-css-s15-q5',
        type: 'multiple-choice',
        prompt: 'When is `filter: drop-shadow()` the better choice over `text-shadow`?',
        options: [
          'When the text needs a soft blur',
          'When the shadow must follow the shape of the whole element rather than the glyphs',
          'When the shadow should sit inside the border box',
          'When you want to stack several shadows',
        ],
        answer: 1,
        explanation:
          '`text-shadow` is derived from text geometry and can only follow the glyphs. A filter applies to the entire rendered element, so it also follows avatars, badges and transparent images.',
      },
    ],
  },
}