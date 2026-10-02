import type { Section } from '~/types/content'

export const htmlColorSections: Section[] = [
  {
    id: 'html-s12',
    title: 'HTML Colors',
    description: 'Where colour belongs, the named colours HTML still understands, and why the old attribute is gone.',
    lessons: [
      {
        id: 'html-l17',
        title: 'HTML Colors',
        description: 'How colour is applied from a document, the named colour keywords, and what replaced font color.',
        duration: 6,
        objectives: [
          'Apply colour to an element from a stylesheet rather than from the markup',
          'Name the 16 original HTML colour keywords and where the full list lives',
          'Explain why the font element and its color attribute were removed',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l17-b1',
            body: 'Colour is presentation, so it belongs in the stylesheet. That single rule explains most of what has happened to colour in HTML over the last fifteen years: the `<font>` element and its `color` attribute worked, then were discouraged, then were removed from the specification entirely. What remains in HTML is a list of colour names, and even those are only useful because CSS accepts them as keywords.',
          },
          {
            type: 'demo',
            id: 'c-l17-d1',
            title: 'The same colour, two ways',
            body: 'The first card is coloured with an inline style attribute. The second is coloured with a rule in a stylesheet. Identical result, and only one of them can be changed in one place later.',
            html: `<div class="row">
  <div class="card">
    <h3>Inline</h3>
    <p style="color: teal; font-size: 20px;">This paragraph is coloured by a style attribute on the element itself.</p>
  </div>
  <div class="card">
    <h3>Stylesheet</h3>
    <p class="lede">This paragraph is coloured by a rule in the stylesheet.</p>
  </div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; align-items: stretch; }
.card { flex: 1; border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; }
.card h3 { margin: 0 0 0.5rem; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; }
.card p { margin: 0; }
.lede { color: teal; font-size: 20px; }`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'c-l17-h1',
            level: 3,
            body: 'The original sixteen colour names',
          },
          {
            type: 'text',
            id: 'c-l17-b2',
            body: 'HTML originally defined exactly sixteen colours so that a page could be readable with no stylesheet at all. They are still valid CSS keywords, they are still the only colour names guaranteed to work everywhere, and they are a useful fallback when a design system has not defined a palette yet. Beyond those sixteen there are around one hundred and forty more, and then an effectively unlimited set of notations we will cover in the next three sections.',
          },
          {
            type: 'list',
            id: 'c-l17-l1',
            style: 'bullet',
            items: [
              '**Greys and whites:** black, silver, gray, white, maroon, red, purple, fuchsia, green, lime, olive, yellow, navy, blue, teal, aqua.',
              '**Case does not matter:** `TEAL`, `Teal` and `teal` are the same colour.',
              '**The values are fixed:** `gray` is a specific shade, not a request for "some sort of grey".',
              '**The full list is a reference, not a course:** roughly 148 named colours, each with a fixed hex value.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l17-h2',
            level: 3,
            body: 'What replaced font color',
          },
          {
            type: 'code',
            id: 'c-l17-c1',
            language: 'html',
            title: 'Obsolete and current',
            code: `<!-- Obsolete. Removed from the HTML specification. -->
<font color="red" size="5" face="Arial">Warning</font>

<!-- The current way, and the only one that scales -->
<style>
  .warning {
    color: red;
    font-size: 1.5rem;
    font-family: Arial, sans-serif;
  }
</style>
<p class="warning">Warning</p>`,
          },
          {
            type: 'warning',
            id: 'c-l17-w1',
            title: 'Text and background must both keep their contrast',
            body: 'A colour is only usable if the text on top of it is readable. Navy text on a black background passes every check for being a valid colour and fails every check for being usable. Always set the pair together, and never rely on the browser default for one of them.',
          },
          {
            type: 'tip',
            id: 'c-l17-t1',
            title: 'Start from a palette, not from a colour wheel',
            body: 'Pick a background, then a text colour that clears the contrast threshold against it, then an accent that clears it against both. Choosing the accent first and hoping the text works out is how unreadable pages get made.',
          },
          {
            type: 'exercise',
            id: 'c-l17-x1',
            exercise: {
              id: 'ex-l17',
              instructions:
                'Move the colour out of the markup and into a class. The rendered result must be identical, and the paragraph must carry no style attribute.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<p style="color: teal;">Opening hours are nine to five.</p>\n',
                css: '.hours {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l17-t1',
                  label: 'The paragraph no longer has a style attribute',
                  body: 'return !document.querySelector("p").hasAttribute("style")',
                },
                {
                  id: 'ex-l17-t2',
                  label: 'The paragraph carries a class',
                  body: 'return (document.querySelector("p").className || "").trim().length > 0',
                },
                {
                  id: 'ex-l17-t3',
                  label: 'The paragraph still renders teal',
                  body: 'return getComputedStyle(document.querySelector("p")).color === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l17-t4',
                  label: 'The colour comes from a rule, not from the markup',
                  body: 'return document.querySelectorAll("p[style]").length === 0',
                },
              ],
              hints: [
                'Add a class to the paragraph and give it the same name as the one already in the stylesheet.',
                'Then set the colour on that class instead of on the element.',
              ],
              solution: {
                html: '<p class="hours">Opening hours are nine to five.</p>\n',
                css: '.hours {\n  color: teal;\n}\n',
              },
              testNotes:
                'The third test checks the computed colour, so the result is identical either way. The first two are what make the change worth making.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s12',
      title: 'HTML Colors quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s12-q1',
          type: 'multiple-choice',
          prompt: 'Where should a colour be set in a modern project?',
          options: [
            'In a style attribute on the element',
            'In the stylesheet, targeted by a class or selector',
            'In a font element with a color attribute',
            'In an inline style block in the body',
          ],
          answer: 1,
          explanation:
            'Colour is presentation, so it belongs in CSS. A stylesheet lets you change every instance at once, which an inline style cannot.',
        },
        {
          id: 'quiz-html-s12-q2',
          type: 'true-false',
          prompt: 'The font element and its color attribute are still part of the HTML specification.',
          answer: false,
          explanation:
            'They were deprecated and have since been removed. A parser may still handle them for backwards compatibility, but you should not write them.',
        },
        {
          id: 'quiz-html-s12-q3',
          type: 'multiple-choice',
          prompt: 'Which of these is one of the original sixteen HTML colour names?',
          options: ['charcoal', 'teal', 'crimson', 'turquoise'],
          answer: 1,
          explanation:
            'The sixteen are black, silver, gray, white, maroon, red, purple, fuchsia, green, lime, olive, yellow, navy, blue, teal and aqua.',
        },
        {
          id: 'quiz-html-s12-q4',
          type: 'blank',
          prompt: 'How many colour keywords did HTML originally define so that a page was readable with no stylesheet?',
          answers: ['16', 'sixteen', '16 named colours', 'sixteen named colours'],
          explanation:
            'Sixteen was chosen as the smallest set that could produce a readable page in both light and dark without any CSS at all.',
        },
        {
          id: 'quiz-html-s12-q5',
          type: 'multiple-choice',
          prompt: 'What is the risk of choosing an accent colour first and setting the text colour afterwards?',
          options: [
            'The accent may be a colour keyword CSS does not recognise',
            'The text may end up with too little contrast against its background',
            'The colour will not render on older browsers',
            'The stylesheet will be ignored',
          ],
          answer: 1,
          explanation:
            'Contrast is a property of the pair, not of either colour alone. Pick the background and text together, then choose an accent that works against both.',
        },
      ],
    },
  },
  {
    id: 'html-s13',
    title: 'HTML Colors RGB',
    description: 'Colour as three numbers, the alpha channel, and why mixing in light is additive.',
    lessons: [
      {
        id: 'html-l18',
        title: 'HTML Colors RGB',
        description: 'The rgb notation, the alpha channel, and what each channel actually controls.',
        duration: 6,
        objectives: [
          'Write a colour with rgb() and explain what each of the three numbers means',
          'Add transparency with the alpha channel and say when not to use it',
          'Predict what a colour looks like from its RGB values',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l18-b1',
            body: 'RGB describes colour the way a screen does. A pixel is made of three lights — red, green and blue — and each is a number from 0 to 255 where 0 is off and 255 is fully on. White is all three at full, and black is all three at nothing. This is additive mixing: adding light makes things brighter, which is the opposite of paint.',
          },
          {
            type: 'demo',
            id: 'c-l18-d1',
            title: 'The three channels, and what happens when you turn them up',
            body: 'Each swatch changes one channel while the other two stay put. Raising a channel always makes the colour lighter, never darker.',
            html: `<p class="r0">red 0 &middot; green 0 &middot; blue 0</p>
<p class="r1">red 255 &middot; green 0 &middot; blue 0</p>
<p class="r2">red 255 &middot; green 255 &middot; blue 0</p>
<p class="r3">red 255 &middot; green 255 &middot; blue 255</p>
<p class="r4">red 40 &middot; green 90 &middot; blue 140</p>
<p class="r5">red 40,90,140 at 50% alpha</p>`,
            css: `body { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; }
p { margin: 0 0 0.35rem; padding: 0.5rem 0.75rem; border-radius: 6px; color: #fff; }
.r0 { background: rgb(0 0 0); }
.r1 { background: rgb(255 0 0); }
.r2 { background: rgb(255 255 0); color: #0b0d10; }
.r3 { background: rgb(255 255 255); color: #0b0d10; }
.r4 { background: rgb(40 90 140); }
.r5 { background: rgba(40, 90, 140, 0.5); }`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'c-l18-h1',
            level: 3,
            body: 'The alpha channel',
          },
          {
            type: 'text',
            id: 'c-l18-b2',
            body: 'A fourth value, alpha, controls opacity from 0 to 1, where 0 is fully transparent and 1 is fully opaque. A shorthand exists for the older comma-separated syntax — `rgba(40, 90, 140, 0.5)` — but the modern space-separated form handles it directly: `rgb(40 90 140 / 50%)`. Both work; prefer the modern one in new code because the legacy form is a separate function that exists only for compatibility.',
          },
          {
            type: 'code',
            id: 'c-l18-c1',
            language: 'plaintext',
            title: 'The notations, oldest to newest',
            code: `rgb(40, 90, 140)          legacy, comma separated
rgb(40 90 140)            modern, space separated
rgba(40, 90, 140, 0.5)    legacy, with alpha
rgb(40 90 140 / 50%)      modern, with alpha as a percentage
rgb(40 90 140 / 0.5)      modern, with alpha as a number`,
          },
          {
            type: 'warning',
            id: 'c-l18-w1',
            title: 'Alpha on text is almost always the wrong answer',
            body: 'Making text translucent reduces its contrast against whatever is behind it, and the result depends on that background. A heading at 50% alpha over a busy image can be unreadable on one screen and fine on another. Use a solid colour for text and reserve transparency for surfaces, overlays and borders.',
          },
          {
            type: 'tip',
            id: 'c-l18-t1',
            title: 'You rarely need to compute RGB by hand',
            body: 'Every design tool will give you an RGB value, and most will let you copy one. What matters is understanding what the three numbers mean so you can reason about whether a value someone handed you is plausible.',
          },
          {
            type: 'exercise',
            id: 'c-l18-x1',
            exercise: {
              id: 'ex-l18',
              instructions:
                'Set the swatch to a deep blue using the modern space-separated rgb notation, and give the overlay behind it 60% alpha.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="swatch">Deep blue</div>\n',
                css: '.swatch {\n  color: white;\n  padding: 1rem;\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l18-t1',
                  label: 'The swatch background is a dark blue',
                  body: 'const c = getComputedStyle(document.querySelector(".swatch")).backgroundColor; return c === "rgb(20, 60, 120)" || c === "rgb(20 60 120)"',
                },
                {
                  id: 'ex-l18-t2',
                  label: 'The stylesheet uses the space-separated rgb form',
                  body: 'return /rgb\(\s*\d+\s+\d+\s+\d+\s*\)/.test(document.querySelector("style")?.textContent || Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "))',
                },
                {
                  id: 'ex-l18-t3',
                  label: 'The text on the swatch is white',
                  body: 'return getComputedStyle(document.querySelector(".swatch")).color === "rgb(255, 255, 255)"',
                },
              ],
              hints: [
                'The modern form is `rgb(20 60 120)` — no commas between the numbers.',
                'The colour is already set to white in the starter code, so you only need the background.',
              ],
              solution: {
                html: '<div class="swatch">Deep blue</div>\n',
                css: '.swatch {\n  color: white;\n  padding: 1rem;\n  background: rgb(20 60 120);\n}\n',
              },
              testNotes:
                'The second test reads the stylesheet text to confirm you used the space-separated form rather than the legacy comma-separated one.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s13',
      title: 'HTML Colors RGB quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s13-q1',
          type: 'multiple-choice',
          prompt: 'In rgb(0, 128, 128), what does the 0 in the first position mean?',
          options: [
            'The colour is fully transparent',
            'The red channel is off',
            'The colour is black',
            'The value is invalid',
          ],
          answer: 1,
          explanation:
            'The three numbers are red, green and blue in that order, each from 0 to 255. A zero means that channel contributes nothing.',
        },
        {
          id: 'quiz-html-s13-q2',
          type: 'true-false',
          prompt: 'RGB is a subtractive system, the way paint mixes.',
          answer: false,
          explanation:
            'RGB is additive: it models light, so adding channels makes things brighter. Paint is subtractive, which is why mixing paints gets darker and light gets brighter.',
        },
        {
          id: 'quiz-html-s13-q3',
          type: 'multiple-choice',
          prompt: 'Which is the modern way to write a colour with 50% alpha?',
          options: [
            'rgb(40, 90, 140, 0.5)',
            'rgb(40 90 140 / 50%)',
            'rgba(40, 90, 140, 0.5)',
            'rgb(40 90 140 0.5)',
          ],
          answer: 1,
          explanation:
            'The modern form separates the alpha with a slash and accepts a percentage. The rgba() function exists only for backwards compatibility.',
        },
        {
          id: 'quiz-html-s13-q4',
          type: 'blank',
          prompt: 'What is white in RGB notation?',
          answers: ['rgb(255, 255, 255)', 'rgb(255 255 255)', '255,255,255', '255 255 255'],
          explanation:
            'All three channels at full intensity. Black is all three at zero.',
        },
        {
          id: 'quiz-html-s13-q5',
          type: 'multiple-choice',
          prompt: 'Why is applying alpha to text usually a mistake?',
          options: [
            'Browsers do not support alpha on the color property',
            'It reduces contrast against whatever is behind the text, so readability depends on the background',
            'It makes the text unselectable',
            'It breaks the cascade',
          ],
          answer: 1,
          explanation:
            'Contrast is a property of the pair. Translucent text can be perfectly legible on a flat background and unreadable over an image, on the same page.',
        },
      ],
    },
  },
  {
    id: 'html-s14',
    title: 'HTML Colors HEX',
    description: 'Hex notation, the shorthand form, and alpha in hex.',
    lessons: [
      {
        id: 'html-l19',
        title: 'HTML Colors HEX',
        description: 'Hexadecimal colour values, the three-digit shorthand, and the alpha channel in hex.',
        duration: 5,
    objectives: [
      'Write any colour in hex and convert between hex and RGB',
      'Use the three-digit shorthand correctly',
      'Add an alpha channel to a hex colour',
    ],
    xp: 35,
    content: [
      {
        type: 'text',
            id: 'c-l19-b1',
            body: 'Hex is the same three channels as RGB, written as two hexadecimal digits each and prefixed with a hash. Each digit runs from 0 to F, where F is 15, so a pair of digits covers 0 to 255 — exactly the range RGB uses. `#1E88E5` is the same colour as `rgb(30, 136, 229)`.',
          },
          {
            type: 'demo',
            id: 'c-l19-d1',
            title: 'Hex, and the same colour in every notation',
            body: 'The same teal written four ways. They are indistinguishable in the browser, and the hex form is the one almost every design tool hands you.',
            html: `<div class="row">
  <div class="card" style="background: #008080; color: white;">#008080</div>
  <div class="card" style="background: rgb(0 128 128); color: white;">rgb(0 128 128)</div>
  <div class="card" style="background: teal; color: white;">teal</div>
  <div class="card" style="background: #00808080; color: white;">#00808080</div>
</div>`,
            css: `body { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 14px; }
.row { display: flex; gap: 0.75rem; }
.card { flex: 1; padding: 1.5rem 0.75rem; border-radius: 8px; text-align: center; }`,
            height: 120,
          },
          {
            type: 'heading',
            id: 'c-l19-h1',
            level: 3,
            body: 'Shorthand and alpha',
          },
          {
            type: 'list',
            id: 'c-l19-l1',
            style: 'bullet',
            items: [
              '**Six digits** is the full form: `#RRGGBB`, two per channel.',
              '**Three digits** is shorthand: `#RGB`, one per channel, each digit doubled. `#1E8` means `#11EE88`.',
              '**Eight digits** adds alpha: `#RRGGBBAA`. `#00808080` is teal at roughly 50% alpha.',
              '**Four digits** is shorthand with alpha: `#RGBA`.',
              '**The hash is required.** Without it the value is invalid and the declaration is dropped.',
            ],
          },
          {
            type: 'code',
            id: 'c-l19-c1',
            language: 'plaintext',
            title: 'Converting by hand',
            code: `Teal is rgb(0, 128, 128).

  0   -> 00
  128 -> 80        (128 in hex is 80, because 8*16 + 0 = 128)
  128 -> 80

  so teal = #008080

Shorthand only works when both digits of a pair are identical:

  #008080  ->  #080    (00 -> 0, 80 -> 88, 80 -> 88)
  #1E88E5  ->  no shorthand, because 1E and 88 are not doubles`,
          },
          {
            type: 'tip',
            id: 'c-l19-t1',
            title: 'Lowercase is the convention',
            body: '`#1e88e5` and `#1E88E5` are identical. Every design tool and every minifier outputs lowercase, so match it and your diffs stay clean.',
          },
          {
            type: 'exercise',
            id: 'c-l19-x1',
            exercise: {
              id: 'ex-l19',
              instructions:
                'Set the badge background using a three-digit hex shorthand. The target colour is rgb(255, 0, 0), which shortens to #f00.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<span class="badge">New</span>\n',
                css: '.badge {\n  display: inline-block;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  color: white;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l19-t1',
                  label: 'The badge background is pure red',
                  body: 'return getComputedStyle(document.querySelector(".badge")).backgroundColor === "rgb(255, 0, 0)"',
                },
                {
                  id: 'ex-l19-t2',
                  label: 'The value used is a three-digit hex shorthand',
                  body:
                    'const css = Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "); return /#[0-9a-fA-F]{3}\\b/.test(css)',
                },
                {
                  id: 'ex-l19-t3',
                  label: 'The badge is still an inline-block pill',
                  body: 'return getComputedStyle(document.querySelector(".badge")).display === "inline-block"',
                },
              ],
              hints: [
                'Pure red is `#ff0000`, and both channel pairs are doubles, so it shortens.',
                'The shorthand is `#f00` — three digits, not six.',
              ],
              solution: {
                html: '<span class="badge">New</span>\n',
                css:
                  '.badge {\n  display: inline-block;\n  padding: 0.2rem 0.6rem;\n  border-radius: 999px;\n  color: white;\n  background: #f00;\n}\n',
              },
              testNotes:
                'The second test inspects the stylesheet text for a three-digit hex, so #ff0000 would render identically and still fail.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s14',
      title: 'HTML Colors HEX quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s14-q1',
          type: 'multiple-choice',
          prompt: 'What does #1E8 expand to in the shorthand form?',
          options: ['#1EE888', '#11EE88', '#1E1188', '#111EEE'],
          answer: 1,
          explanation:
            'Each shorthand digit is doubled: 1 becomes 11, E becomes EE, and 8 becomes 88.',
        },
        {
          id: 'quiz-html-s14-q2',
          type: 'true-false',
          prompt: 'Any six-digit hex colour can be shortened to three digits.',
          answer: false,
          explanation:
            'Only when both digits of every pair are identical. #1E88E5 cannot be shortened because 1E and 88 are not doubles.',
        },
        {
          id: 'quiz-html-s14-q3',
          type: 'multiple-choice',
          prompt: 'What is the eight-digit hex form used for?',
          options: [
            'Defining an eight-colour palette',
            'Adding an alpha channel',
            'Specifying a colour space',
            'Naming a CSS custom property',
          ],
          answer: 1,
          explanation:
            'The last two digits of #RRGGBBAA are alpha, where FF is fully opaque and 80 is roughly half.',
        },
        {
          id: 'quiz-html-s14-q4',
          type: 'blank',
          prompt: 'What is the hex value for teal, which is rgb(0, 128, 128)?',
          answers: ['#008080', '008080'],
          explanation: 'Zero is 00, and 128 in hexadecimal is 80.',
        },
        {
          id: 'quiz-html-s14-q5',
          type: 'multiple-choice',
          prompt: 'What happens to a declaration written as 008080 with no hash?',
          options: [
            'The browser guesses the colour',
            'The declaration is invalid and dropped',
            'It is treated as an unknown property',
            'It defaults to black',
          ],
          answer: 1,
          explanation:
            'The hash is part of the notation. Without it the value is not a colour and the whole declaration is discarded.',
        },
      ],
    },
  },
  {
    id: 'html-s15',
    title: 'HTML Colors HSL',
    description: 'Hue, saturation and lightness, and why this is the notation to design in.',
    lessons: [
      {
        id: 'html-l20',
        title: 'HTML Colors HSL',
        description: 'The three components of HSL, and why it makes a colour palette something you can reason about.',
        duration: 6,
        objectives: [
          'Write a colour with hsl() and say what each component controls',
          'Build a tint, a shade and a tone from a single hue',
          'Explain why HSL is easier to design in than RGB',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l20-b1',
            body: 'HSL describes colour the way a designer thinks about it. Hue is which colour it is, as an angle around a wheel from 0 to 360. Saturation is how vivid it is, from 0 to 100 percent, where zero is grey. Lightness is how light it is, also 0 to 100 percent, where 50 is the fully saturated version. Because those three are independent, you can vary one without disturbing the others.',
          },
          {
            type: 'demo',
            id: 'c-l20-d1',
            title: 'One hue, five lightness values',
            body: 'Holding hue and saturation fixed and moving only lightness gives you a tints-and-shades ramp from a single decision. This is the reason to design in HSL.',
            html: `<div class="ramp">
  <div style="background: hsl(174 60% 95%);">95%</div>
  <div style="background: hsl(174 60% 75%);">75%</div>
  <div style="background: hsl(174 60% 50%); color: white;">50%</div>
  <div style="background: hsl(174 60% 30%); color: white;">30%</div>
  <div style="background: hsl(174 60% 15%); color: white;">15%</div>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.ramp { display: flex; }
.ramp div { flex: 1; padding: 1.75rem 0; text-align: center; border-radius: 6px; }`,
            height: 120,
          },
          {
            type: 'heading',
            id: 'c-l20-h1',
            level: 3,
            body: 'Hue is an angle',
          },
          {
            type: 'list',
            id: 'c-l20-l1',
            style: 'bullet',
            items: [
              '`0deg` is red, and so is `360deg` — the wheel closes on itself.',
              '`60deg` is yellow, `120deg` green, `180deg` cyan, `240deg` blue, `300deg` magenta.',
              '`hsl(174 60% 50%)` and `hsl(174, 60%, 50%)` are the same colour.',
              '`0%` saturation is a grey of whatever lightness you set.',
              '`0%` lightness is black and `100%` lightness is white, whatever the hue.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l20-h2',
            level: 3,
            body: 'Why this is the notation to design in',
          },
          {
            type: 'text',
            id: 'c-l20-b2',
            body: 'A colour ramp in RGB means six numbers per step and no way to reason about whether step four is too light. In HSL it is one number per step and the relationship is obvious. This is also why HSL is what most modern frameworks reach for when they build a palette or a dark mode: a background is one lightness swap, a border is another, and the hue never moves.',
          },
          {
            type: 'code',
            id: 'c-l20-c1',
            language: 'plaintext',
            title: 'Tints, tones and shades from one hue',
            code: `Base          hsl(174 60% 50%)
Tint          hsl(174 60% 75%)   same hue, lighter
Tone          hsl(174 30% 50%)   same hue and lightness, less vivid
Shade         hsl(174 60% 30%)   same hue, darker
Complement    hsl(354 60% 50%)   the opposite side of the wheel
Muted variant hsl(174 20% 50%)   what you use for a disabled state

With a CSS custom property, the whole ramp comes from one number:

:root {
  --brand-h: 174;
  --brand-s: 60%;
}
.button { background: hsl(var(--brand-h) var(--brand-s) 50%); }
.button:hover { background: hsl(var(--brand-h) var(--brand-s) 42%); }`,
          },
          {
            type: 'tip',
            id: 'c-l20-t1',
            title: 'HSL is not perceptually even',
            body: 'Equal steps in lightness do not look like equal steps to the eye — yellow at 50% looks far lighter than blue at 50%. HSL is still easier to reason in than RGB, but check contrast rather than trusting the numbers to match your perception.',
          },
          {
            type: 'warning',
            id: 'c-l20-w1',
            title: 'You still need a contrast checker',
            body: 'A ramp that looks harmonious can fail contrast badly at one end. The fix is a tool, not a formula: check the actual pair before you ship it.',
          },
          {
            type: 'exercise',
            id: 'c-l20-x1',
            exercise: {
              id: 'ex-l20',
              instructions:
                'Build a two-step hover state from one base colour using HSL: the button should start at 50% lightness and darken to 40% on hover.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<button class="cta">Get started</button>\n',
                css: '.cta {\n  border: 0;\n  border-radius: 8px;\n  padding: 0.6rem 1.2rem;\n  color: white;\n  font-size: 15px;\n  cursor: pointer;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l20-t1',
                  label: 'The resting state is the base colour',
                  body: 'return getComputedStyle(document.querySelector(".cta")).backgroundColor === "rgb(0, 191, 196)"',
                },
                {
                  id: 'ex-l20-t2',
                  label: 'The hover state is a different colour',
                  body:
                    'const b = document.querySelector(".cta"); b.dispatchEvent(new Event("mouseover")); const css = Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "); return /:hover/.test(css) && /40%/.test(css)',
                },
                {
                  id: 'ex-l20-t3',
                  label: 'The rules use hsl notation',
                  body:
                    'const css = Array.from(document.styleSheets).map(s => { try { return Array.from(s.cssRules).map(r => r.cssText).join(" ") } catch { return "" } }).join(" "); return /hsl\\(/.test(css)',
                },
              ],
              hints: [
                '`hsl(180 60% 50%)` is a cyan close enough to the target — keep the hue and saturation and change only the lightness.',
                'Add a `:hover` rule that repeats the whole colour with 40% instead of 50%.',
              ],
              solution: {
                html: '<button class="cta">Get started</button>\n',
                css:
                  '.cta {\n  border: 0;\n  border-radius: 8px;\n  padding: 0.6rem 1.2rem;\n  color: white;\n  font-size: 15px;\n  cursor: pointer;\n  background: hsl(180 60% 50%);\n}\n.cta:hover {\n  background: hsl(180 60% 40%);\n}\n',
              },
              testNotes:
                'The second test confirms a hover rule exists with the darker lightness, since a computed style alone cannot show a hover state.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s15',
      title: 'HTML Colors HSL quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s15-q1',
          type: 'multiple-choice',
          prompt: 'In hsl(174, 60%, 50%), what does 50% refer to?',
          options: ['The hue', 'The saturation', 'The lightness', 'The opacity'],
          answer: 2,
          explanation:
            'Hue is 174, saturation is 60%, and the final percentage is lightness. 50% lightness is the fully saturated version of that hue.',
        },
        {
          id: 'quiz-html-s15-q2',
          type: 'true-false',
          prompt: 'A colour with 0% saturation is a grey.',
          answer: true,
          explanation:
            'With no saturation there is no hue to show, so the colour is a neutral grey of whatever lightness is set.',
        },
        {
          id: 'quiz-html-s15-q3',
          type: 'multiple-choice',
          prompt: 'What is the main practical advantage of designing in HSL rather than RGB?',
          options: [
            'It renders faster in the browser',
            'One component can be varied without disturbing the other two, so ramps are one number per step',
            'It produces a wider range of colours',
            'It is supported by more browsers',
          ],
          answer: 1,
          explanation:
            'Hue, saturation and lightness are independent, which is what makes a tints-and-shades ramp a single adjustable value.',
        },
        {
          id: 'quiz-html-s15-q4',
          type: 'blank',
          prompt: 'What hue, in degrees, is pure red?',
          answers: ['0', '0deg', '360', '360deg', '0 degrees', '360 degrees'],
          explanation:
            'The wheel starts at red and closes on itself, so 0deg and 360deg are the same colour.',
        },
        {
          id: 'quiz-html-s15-q5',
          type: 'multiple-choice',
          prompt: 'Why should you still check contrast when building a palette in HSL?',
          options: [
            'HSL is not supported in older browsers',
            'Equal steps in lightness do not look equally different to the eye',
            'HSL changes hue when lightness changes',
            'Contrast cannot be expressed in HSL',
          ],
          answer: 1,
          explanation:
            'HSL is not perceptually even: yellow at 50% looks much lighter than blue at 50%. Trust a contrast checker, not the numbers.',
        },
      ],
    },
  },
]
