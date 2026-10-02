import type { Section } from '~/types/content'

/**
 * A 40x40 SVG tile, URL-encoded so it can live inside a `url("...")` in CSS.
 * Every background demo uses this instead of a remote file, so the previews
 * render with no network and nothing to 404.
 */
const TILE = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22%3E%3Crect width=%2240%22 height=%2240%22 fill=%2229e2bd%22/%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%227%22 fill=%220b0d10%22/%3E%3C/svg%3E'

/** A diagonal-stripe tile at 20x20, used where the difference is a fine pattern. */
const STRIPE =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Crect width=%2220%22 height=%2220%22 fill=%23ffffff%22/%3E%3Cpath d=%22M0 10 H20 M0 15 H20%22 stroke=%22%2329e2bd%22 stroke-width=%223%22/%3E%3C/svg%3E'

export const cssColorsSections: Section[] = [
  {
    id: 'css-s7',
    title: 'CSS Colors',
    description:
      'The four notations a CSS colour can be written in, and every property that accepts one.',
    lessons: [
      {
        id: 'css-l7',
        title: 'Colors',
        description:
          'Named colours, the notations that replace them, and why one colour value works everywhere a colour is accepted.',
        duration: 5,
        objectives: [
          'Write a valid colour in the named, `rgb()`, hex and `hsl()` notations',
          'Set text colour and background colour on the same element',
          'Explain why a colour value is interchangeable across different properties',
          'Choose a readable foreground colour against a given background',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l7-b1',
            body: 'A CSS colour is a value, not a property. Whatever notation you write it in, the result is a number of red, green and blue, and any property that accepts a colour will accept all of the notations below.',
          },
          {
            type: 'demo',
            id: 'c-l7-d1',
            title: 'One colour, four notations',
            body: 'Four boxes that are all exactly the same teal. Only the way the colour is written changes. They are indistinguishable in the output, which is the point.',
            html: `<div class="swatches">
  <p class="named">teal</p>
  <p class="rgb">rgb(0, 128, 128)</p>
  <p class="hex">#008080</p>
  <p class="hsl">hsl(180, 100%, 25%)</p>
</div>`,
            css: `.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.swatches p {
  margin: 0;
  flex: 1 1 110px;
  padding: 1.25rem 0.75rem;
  border-radius: 8px;
  text-align: center;
}
.named {
  background-color: teal;
  color: #fff;
}
.rgb {
  background-color: rgb(0, 128, 128);
  color: #fff;
}
.hex {
  background-color: #008080;
  color: #fff;
}
.hsl {
  background-color: hsl(180, 100%, 25%);
  color: #fff;
}`,
            height: 210,
          },
          {
            type: 'text',
            id: 'c-l7-b2',
            body: 'The browser converts every one of those to the same internal value the moment it parses the stylesheet. What you choose is a question of readability, not of result.',
          },
          {
            type: 'heading',
            id: 'c-l7-h1',
            level: 3,
            body: 'The four notations',
          },
          {
            type: 'list',
            id: 'c-l7-l1',
            style: 'bullet',
            items: [
              '**Named** — `teal`, `crimson`, `rebeccapurple`. A fixed list of about 148 keywords. Fast to type, impossible to shade, and some of the names are ugly in the middle of a design system.',
              '**Hex** — `#008080`. Each channel is two hex digits, so `#rrggbb`. The most common notation in real stylesheets, and the one every colour picker emits.',
              '**RGB / RGBA** — `rgb(0, 128, 128)`. The same three numbers in decimal, with an optional fourth channel for transparency. Straightforward when the numbers are coming from a calculation or from JavaScript.',
              '**HSL / HSLA** — `hsl(180, 100%, 25%)`. Hue, saturation, lightness. The one that lets you change a colour predictably, which is why it is the one to use inside a design system.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l7-h2',
            level: 3,
            body: 'Where a colour is accepted',
          },
          {
            type: 'text',
            id: 'c-l7-b3',
            body: 'A colour value is not tied to a single property. Everywhere a colour is allowed, all four notations work identically. That is the single most useful fact in this lesson: you are never locked into a notation because of where the colour is going.',
          },
          {
            type: 'example',
            id: 'c-l7-e1',
            title: 'The same notation across five properties',
            body: 'One value, `rgb(41, 226, 189)`, used as text colour, background, a border, an outline and a shadow. Change it in one variable and the whole card follows.',
            html: `<div class="card">
  <h4>One colour, five jobs</h4>
  <p>The accent is written once per rule, in the same notation each time.</p>
</div>`,
            css: `.card {
  --accent: rgb(41, 226, 189);
  border: 2px solid var(--accent);
  outline: 6px solid rgba(41, 226, 189, 0.25);
  background: #0b0d10;
  color: var(--accent);
  padding: 1rem;
  border-radius: 10px;
}
.card h4 {
  margin: 0 0 0.35rem;
  font-size: 15px;
}
.card p {
  margin: 0;
  color: #b9c2cc;
  font-size: 13px;
}`,
            showPreview: true,
          },
          {
            type: 'list',
            id: 'c-l7-l2',
            style: 'bullet',
            items: [
              '`color` — the text and icon colour of the element and, by inheritance, of everything inside it.',
              '`background-color` — the paint behind the content, padding and border.',
              '`border-color` — all four edges at once, or one at a time with `border-top-color` and friends.',
              '`outline-color`, `text-decoration-color`, `caret-color`, `column-rule-color` — the same value type.',
              'Inside a shadow, a gradient or a `box-shadow`, where a colour is one argument among several.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l7-t1',
            title: 'Always set the background when you set the text colour',
            body: 'If you set `color: teal` on a container and nothing else, every link and button inside it inherits that teal. A background that is dark and text that is light needs both, on the same element, or you get unreadable text.',
          },
          {
            type: 'warning',
            id: 'c-l7-w1',
            title: 'The inheritance of `color` cuts both ways',
            body: '`color` is an inherited property, so a colour set high in the tree reaches everything below. It is the reason one `color` declaration can recolour an entire page, and the reason a hard-coded colour deep in the tree overrides a theme you thought was in charge.',
          },
          {
            type: 'exercise',
            id: 'c-l7-x1',
            exercise: {
              id: 'ex-l7',
              instructions:
                'Style the note below: white text on a pale mint background, with 1rem of padding. Use a class rule, not an inline style.',
              languages: ['css'],
              starterCode: {
                html: '<div class="note">Saved</div>',
                css: '.note {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l7-t1',
                  label: 'The text is white',
                  body: 'return getComputedStyle(document.querySelector(".note")).color === "rgb(255, 255, 255)"',
                },
                {
                  id: 'ex-l7-t2',
                  label: 'The background is a pale mint',
                  body: 'const bg = getComputedStyle(document.querySelector(".note")).backgroundColor; return bg === "rgb(224, 255, 247)" || bg === "rgb(240, 253, 250)"',
                },
                {
                  id: 'ex-l7-t3',
                  label: 'The padding is 1rem',
                  body: 'return getComputedStyle(document.querySelector(".note")).paddingTop === "16px"',
                },
                {
                  id: 'ex-l7-t4',
                  label: 'The rules live in the stylesheet, not on the element',
                  body: 'return !document.querySelector(".note").hasAttribute("style")',
                },
              ],
              hints: [
                'Two declarations on `.note`: one for `color`, one for `background-color`.',
                'White is `#fff` or `white`. A pale mint is `#e0fff7` or `mintcream`.',
                'Try `color: #fff; background-color: #e0fff7; padding: 1rem;`',
              ],
              solution: {
                html: '<div class="note">Saved</div>',
                css: '.note {\n  color: #fff;\n  background-color: #e0fff7;\n  padding: 1rem;\n}\n',
              },
              testNotes:
                'The tests read the computed style of `.note`, and the last one confirms the styling was not done inline.',
            },
          },
        ],
      },
      {
        id: 'css-l8',
        title: 'RGB',
        description:
          'The `rgb()` and `rgba()` functions, the alpha channel, and what transparency actually does when it paints.',
        duration: 6,
        objectives: [
          'Write a colour with `rgb()` and with `rgba()`',
          'Explain what the alpha channel controls and what it leaves alone',
          'Use a translucent colour without knowing what is behind it',
          'Read an alpha value out of a computed style and know why it is not a clean decimal',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l8-b1',
            body: '`rgb()` takes the three channels of a colour as numbers from 0 to 255. `rgba()` adds a fourth value, the **alpha channel**, from 0 to 1, which controls how opaque the colour is.',
          },
          {
            type: 'demo',
            id: 'c-l8-d1',
            title: 'One translucent box over a coloured one',
            body: 'The teal box is fully opaque. The box on top of it uses `rgba(0, 128, 128, 0.5)`, so the orange underneath shows through and the two blend. That blend is the alpha channel doing its job.',
            html: `<div class="stage">
  <div class="back">opaque rgb(255, 140, 60)</div>
  <div class="front">rgba(0, 128, 128, 0.5)</div>
</div>`,
            css: `.stage {
  position: relative;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
}
.back {
  position: absolute;
  inset: 0;
  background-color: rgb(255, 140, 60);
  padding: 1rem;
  color: #2b1500;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.front {
  position: absolute;
  left: 25%;
  top: 30%;
  right: 15%;
  bottom: 15%;
  background-color: rgba(0, 128, 128, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 0.75rem;
  color: #04231f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l8-b2',
            body: 'The teal box is not "half teal". It is half teal and half whatever was already painted underneath, blended per pixel. That is the difference between a colour that is light and a colour that is transparent, and only one of them lets the page show through.',
          },
          {
            type: 'heading',
            id: 'c-l8-h1',
            level: 3,
            body: 'The syntax',
          },
          {
            type: 'list',
            id: 'c-l8-l1',
            style: 'bullet',
            items: [
              '`rgb(0, 128, 128)` — three comma-separated channels, each 0 to 255 or a percentage. `rgb(0%, 50%, 50%)` is the same colour.',
              '`rgba(0, 128, 128, 0.5)` — the same, plus an alpha from 0 to 1. `0` is invisible, `1` is solid, `0.5` is halfway.',
              'Modern CSS also accepts space-separated form: `rgb(0 128 128 / 50%)`. The comma form is still the safest to write, because it works everywhere.',
            ],
          },
          {
            type: 'text',
            id: 'c-l8-b2a',
            body: 'What alpha changes and what it does not: it changes **opacity only**. It does not lighten the colour, it does not blend it toward white, and it does not change what colour the text on top of it is. If you want a colour that looks paler, change the channels or use `hsl()` with a higher lightness — a low alpha is for showing what is behind.',
          },
          {
            type: 'heading',
            id: 'c-l8-h2',
            level: 3,
            body: 'A ramp of alphas',
          },
          {
            type: 'demo',
            id: 'c-l8-d2',
            title: 'The same colour at five opacities',
            body: 'Five identical teal chips on the same dark background, at 0.2, 0.4, 0.6, 0.8 and 1. The background is identical in all five, so the ramp is entirely the alpha channel.',
            html: `<div class="ramp">
  <span class="step" style="background-color: rgba(41, 226, 189, 0.2);">0.2</span>
  <span class="step" style="background-color: rgba(41, 226, 189, 0.4);">0.4</span>
  <span class="step" style="background-color: rgba(41, 226, 189, 0.6);">0.6</span>
  <span class="step" style="background-color: rgba(41, 226, 189, 0.8);">0.8</span>
  <span class="step" style="background-color: rgba(41, 226, 189, 1);">1.0</span>
</div>`,
            css: `.ramp {
  display: flex;
  gap: 0.5rem;
  background-color: #0b0d10;
  padding: 0.75rem;
  border-radius: 10px;
}
.step {
  flex: 1;
  padding: 2.5rem 0;
  text-align: center;
  border-radius: 6px;
  color: #04231f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}`,
            height: 190,
          },
          {
            type: 'tip',
            id: 'c-l8-t1',
            title: 'The computed alpha comes back rounded',
            body: 'Write `#00808080` or `rgba(0, 128, 128, 0.5)` and `getComputedStyle` will hand you something like `rgba(0, 128, 128, 0.502)`, because 128/255 is not exactly one half. Never compare an alpha with `===` in a test — compare it with a range.',
          },
          {
            type: 'heading',
            id: 'c-l8-h3',
            level: 3,
            body: 'Where translucent colours earn their place',
          },
          {
            type: 'list',
            id: 'c-l8-l2',
            style: 'bullet',
            items: [
              '**Tinted overlays.** A panel over a hero image, where the image should still read through.',
              '**Hover and active states.** The same base colour at 0.8 instead of 1 gives a pressed-in effect without authoring a second colour.',
              '**Borders and focus rings.** A low-alpha border separates two elements without adding a hard line.',
              '**Shadows.** `rgba(0, 0, 0, 0.2)` is the workhorse shadow colour; an opaque black shadow looks like a hole.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l8-w1',
            title: 'A translucent colour with text on it is a contrast risk',
            body: 'Because the result depends on whatever is behind, you cannot know the text contrast of `rgba(0, 0, 0, 0.4)` without knowing the background. Use alpha for surfaces, not for body text.',
          },
          {
            type: 'exercise',
            id: 'c-l8-x1',
            exercise: {
              id: 'ex-l8',
              instructions:
                'Give the panel a half-transparent teal background with `rgba()`, sitting on top of the orange backdrop already in the page. Leave the backdrop element alone.',
              languages: ['css'],
              starterCode: {
                html:
                  '<div class="backdrop">orange backdrop</div>\n<div class="panel">teal at 50%</div>',
                css: '.backdrop {\n  background-color: rgb(255, 140, 60);\n  padding: 1.5rem;\n  border-radius: 8px;\n}\n.panel {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l8-t1',
                  label: 'The panel has a background colour',
                  body: 'return getComputedStyle(document.querySelector(".panel")).backgroundColor !== "rgba(0, 0, 0, 0)"',
                },
                {
                  id: 'ex-l8-t2',
                  label: 'It is teal: 0, 128, 128',
                  body: 'const v = getComputedStyle(document.querySelector(".panel")).backgroundColor; return v.startsWith("rgba(0, 128, 128") || v === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l8-t3',
                  label: 'The alpha is about one half',
                  body: 'const v = getComputedStyle(document.querySelector(".panel")).backgroundColor; const m = v.match(/rgba\\(([^)]+)\\)/); if (!m) return false; const p = m[1].split(",").map((s) => parseFloat(s)); return p.length === 4 && p[3] > 0.45 && p[3] < 0.55',
                },
                {
                  id: 'ex-l8-t4',
                  label: 'The backdrop was left opaque',
                  body: 'return getComputedStyle(document.querySelector(".backdrop")).backgroundColor === "rgb(255, 140, 60)"',
                },
              ],
              hints: [
                'The property is `background-color`, and the function is `rgba(0, 128, 128, 0.5)`.',
                'Alpha is the fourth argument, and it runs 0 to 1.',
                'Try `background-color: rgba(0, 128, 128, 0.5);`',
              ],
              solution: {
                html:
                  '<div class="backdrop">orange backdrop</div>\n<div class="panel">teal at 50%</div>',
                css:
                  '.backdrop {\n  background-color: rgb(255, 140, 60);\n  padding: 1.5rem;\n  border-radius: 8px;\n}\n.panel {\n  background-color: rgba(0, 128, 128, 0.5);\n}\n',
              },
              testNotes:
                'The third test parses the alpha out of the computed value and checks it against a range, because 0.5 comes back from the browser as 0.502.',
            },
          },
        ],
      },
      {
        id: 'css-l9',
        title: 'HEX',
        description:
          'The `#` notation, the three-digit and eight-digit forms, and how to read a hex value by eye.',
        duration: 6,
        objectives: [
          'Write the three-digit, six-digit and eight-digit hex forms',
          'Convert a hex pair to the 0 to 255 range in your head',
          'Add transparency with an alpha pair at the end of a hex value',
          'Explain why a hex value is unaffected by anything the user agent does',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l9-b1',
            body: 'Hex is shorthand for base-16. Every colour channel is written as two digits from `00` to `ff`, which is 0 to 255 in decimal. A leading `#` marks the value as hex so the browser does not read it as a number.',
          },
          {
            type: 'demo',
            id: 'c-l9-d1',
            title: 'Short hex, full hex, and hex with alpha',
            body: 'Three boxes. The first uses the three-digit form, the second the full six-digit form, and the third the eight-digit form — the same six digits as the second, plus two more for transparency. The first two are identical colours. The third is visibly see-through.',
            html: `<div class="row">
  <div class="box short">#0a0</div>
  <div class="box full">#00aa00</div>
  <div class="box alpha">#00aa0080</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 0.5rem;
  background-color: #101418;
  padding: 0.75rem;
  border-radius: 10px;
}
.box {
  flex: 1;
  height: 110px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.5rem;
  border-radius: 6px;
  color: #fff;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.short {
  background-color: #0a0;
}
.full {
  background-color: #00aa00;
}
.alpha {
  background-color: #00aa0080;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l9-b2',
            body: 'The first and second boxes are the same green, which is what the three-digit form means: each digit is doubled. `#0a0` is `#00aa00`, not `#000a00`. The third is `#00aa00` at `80` alpha, so the dark backdrop shows through it.',
          },
          {
            type: 'heading',
            id: 'c-l9-h1',
            level: 3,
            body: 'The three forms',
          },
          {
            type: 'list',
            id: 'c-l9-l1',
            style: 'bullet',
            items: [
              '`#rgb` — three digits, each one **doubled**. `#0a0` becomes `#00aa00`. Shorter to write, but only available when both digits of a pair are equal, so you cannot express every colour this way.',
              '`#rrggbb` — six digits, the full form. Red, green, blue, in that order, two hex digits each.',
              '`#rrggbbaa` — eight digits, the same six plus a transparency pair. `#00808080` is teal at 128/255 alpha.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l9-h2',
            level: 3,
            body: 'Reading hex by eye',
          },
          {
            type: 'demo',
            id: 'c-l9-d2',
            title: 'One channel at a time',
            body: 'Six copies of the same box. Between them only the red channel changes, from `#000000` up to `#ff0000`. The green and blue stay at zero, so each step is a pure red getting stronger.',
            html: `<div class="ramp">
  <span class="chip" style="background-color: #000000;"></span>
  <span class="chip" style="background-color: #330000;"></span>
  <span class="chip" style="background-color: #660000;"></span>
  <span class="chip" style="background-color: #990000;"></span>
  <span class="chip" style="background-color: #cc0000;"></span>
  <span class="chip" style="background-color: #ff0000;"></span>
</div>`,
            css: `.ramp {
  display: flex;
  gap: 4px;
  padding: 0.75rem;
  border-radius: 10px;
  background-color: #f2f5f8;
}
.chip {
  flex: 1;
  height: 80px;
  border-radius: 4px;
}`,
            height: 170,
          },
          {
            type: 'text',
            id: 'c-l9-b3',
            body: 'Two hex digits are one byte, 0 to 255. `00` is off, `7f` is roughly half, `ff` is full. That is the whole model: three channels, three bytes, written as six characters. Once you internalise that, a hex value is readable without converting it.',
          },
          {
            type: 'tip',
            id: 'c-l9-t1',
            title: 'Hex is the notation your design tools hand you',
            body: 'Figma, Photoshop and every browser devtools colour picker emit hex. A token file full of hex values is a direct import from the design file with no conversion step, which is why most design systems end up in hex despite HSL being nicer to reason about.',
          },
          {
            type: 'warning',
            id: 'c-l9-w1',
            title: 'A mistyped hex silently falls back to nothing',
            body: 'A five-digit value like `#00808`, or a value with a stray `z` in it, is not an error you will see on screen. The declaration is dropped and the element falls back to whatever it inherited. Count the digits.',
          },
          {
            type: 'exercise',
            id: 'c-l9-x1',
            exercise: {
              id: 'ex-l9',
              instructions:
                'Set the colours of the three swatches using hex only: the first with a six-digit value for pure green, the second with the same value in three-digit form, and the third with a transparency pair added.',
              languages: ['css'],
              starterCode: {
                html: '<span class="full">#00ff00</span>\n<span class="short">#0f0</span>\n<span class="alpha">50%</span>',
                css: '.full {\n  \n}\n.short {\n  \n}\n.alpha {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l9-t1',
                  label: 'The first swatch is pure green',
                  body: 'return getComputedStyle(document.querySelector(".full")).backgroundColor === "rgb(0, 255, 0)"',
                },
                {
                  id: 'ex-l9-t2',
                  label: 'The three-digit form gives the same green',
                  body: 'return getComputedStyle(document.querySelector(".short")).backgroundColor === "rgb(0, 255, 0)"',
                },
                {
                  id: 'ex-l9-t3',
                  label: 'The third swatch is translucent, not pale',
                  body: 'const v = getComputedStyle(document.querySelector(".alpha")).backgroundColor; const m = v.match(/rgba\\(([^)]+)\\)/); if (!m) return false; const p = m[1].split(",").map((s) => parseFloat(s)); return p[0] === 0 && p[1] === 255 && p[2] === 0 && p[3] > 0.45 && p[3] < 0.55',
                },
                {
                  id: 'ex-l9-t4',
                  label: 'All three were written in hex, not rgb or a keyword',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); const hits = (css.match(/#[0-9a-f]{3,8}/gi) || []).length; return hits >= 3',
                },
              ],
              hints: [
                'Pure green is `ff` in the green position and `00` everywhere else, so the full value is `#00ff00`.',
                'The three-digit form only works because `f` doubles cleanly, giving `#0f0`.',
                'Add two more digits to the end for the alpha pair: `#00ff0080` is green at 128/255.',
              ],
              solution: {
                html: '<span class="full">#00ff00</span>\n<span class="short">#0f0</span>\n<span class="alpha">50%</span>',
                css:
                  '.full {\n  background-color: #00ff00;\n}\n.short {\n  background-color: #0f0;\n}\n.alpha {\n  background-color: #00ff0080;\n}\n',
              },
              testNotes:
                'The fourth test greps the stylesheet for hex values, so the notation is checked as well as the resulting colour.',
            },
          },
        ],
      },
      {
        id: 'css-l10',
        title: 'HSL',
        description:
          'Hue, saturation and lightness, and why describing a colour by how bright and how vivid it is is far easier to work with than three numbers.',
        duration: 7,
        objectives: [
          'Write a colour with `hsl()` and `hsla()`',
          'Describe a colour as a hue angle plus a saturation and lightness percentage',
          'Build a tint or a shade by changing one value',
          'Explain why HSL scales better than hex for a palette or a dark mode',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l10-b1',
            body: 'HSL describes a colour the way a designer talks about it: which **hue** it is, how **saturated** it is, and how **light** it is. The first is an angle in degrees, the other two are percentages.',
          },
          {
            type: 'demo',
            id: 'c-l10-d1',
            title: 'A hue ramp at fixed saturation and lightness',
            body: 'The same saturation and the same lightness, all the way round the colour wheel. Only the hue changes, which is why the set looks like one family rather than six unrelated colours.',
            html: `<div class="wheel">
  <span class="sw" style="background-color: hsl(0, 70%, 45%);">0</span>
  <span class="sw" style="background-color: hsl(60, 70%, 45%);">60</span>
  <span class="sw" style="background-color: hsl(120, 70%, 45%);">120</span>
  <span class="sw" style="background-color: hsl(180, 70%, 45%);">180</span>
  <span class="sw" style="background-color: hsl(240, 70%, 45%);">240</span>
  <span class="sw" style="background-color: hsl(300, 70%, 45%);">300</span>
</div>`,
            css: `.wheel {
  display: flex;
  gap: 4px;
}
.sw {
  flex: 1;
  padding: 2.75rem 0;
  text-align: center;
  color: #fff;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}`,
            height: 190,
          },
          {
            type: 'text',
            id: 'c-l10-b2',
            body: 'Every one of those is `hsl(H, 70%, 45%)`. One parameter moved, six colours, and all six sit at the same perceived brightness. Try that with hex and you would be re-picking six colours by hand.',
          },
          {
            type: 'heading',
            id: 'c-l10-h1',
            level: 3,
            body: 'The three parts',
          },
          {
            type: 'list',
            id: 'c-l10-l1',
            style: 'bullet',
            items: [
              '**Hue** — an angle in degrees, and it wraps. `0` is red, `120` is green, `240` is blue, `360` is back to red. `hsl(480, ...)` is the same as `hsl(120, ...)`.',
              '**Saturation** — how much colour there is, 0% to 100%. At `0%` the value is pure grey no matter what the hue is; at `100%` it is as vivid as that hue gets.',
              '**Lightness** — how bright the colour is, 0% to 100%. `0%` is black, `50%` is mid, `100%` is white. Lightness is perceptual, which is why `50%` really does look like the middle.',
              '**`hsla()`** adds a fourth value, the same 0 to 1 alpha as `rgba()`.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l10-h2',
            level: 3,
            body: 'The same hue, five lightnesses',
          },
          {
            type: 'demo',
            id: 'c-l10-d2',
            title: 'A tint and a shade ramp from one hue',
            body: 'The hue is pinned at 210 and only the lightness moves. The top row is a tint ramp for backgrounds, the bottom row is a shade ramp for text and borders — both derived from a single number.',
            html: `<div class="ramps">
  <div class="row">
    <span style="background-color: hsl(210, 80%, 95%);">95%</span>
    <span style="background-color: hsl(210, 80%, 85%);">85%</span>
    <span style="background-color: hsl(210, 80%, 70%);">70%</span>
    <span style="background-color: hsl(210, 80%, 50%);">50%</span>
    <span style="background-color: hsl(210, 80%, 30%);">30%</span>
  </div>
  <p class="note">One hue, five lightnesses, two readable text colours.</p>
</div>`,
            css: `.ramps {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.row {
  display: flex;
  gap: 4px;
}
.row span {
  flex: 1;
  padding: 1.5rem 0;
  text-align: center;
  color: #062033;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.note {
  margin: 0;
  font-size: 13px;
  color: hsl(210, 80%, 30%);
  font-weight: 700;
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l10-b3',
            body: 'Lightness is the number to reach for when you need a family. `hsl(210, 80%, 95%)` as a page background and `hsl(210, 80%, 30%)` as the text colour are guaranteed to be the same colour at opposite ends, and the contrast between them is a difference you computed rather than one you guessed.',
          },
          {
            type: 'tip',
            id: 'c-l10-t1',
            title: 'Modern CSS lets you mix in a fourth channel',
            body: '`hsl(210 80% 30% / 0.5)` and `hsl(210 80% 30% / 50%)` are both accepted in current browsers, so the alpha does not have to be a decimal. The comma form `hsla(210, 80%, 30%, 0.5)` is still the one that works everywhere.',
          },
          {
            type: 'warning',
            id: 'c-l10-w1',
            title: 'Saturation and lightness are not a brightness slider',
            body: 'Raising saturation does not make a colour brighter, and lowering lightness does not make it greyer. `hsl(210, 100%, 50%)` and `hsl(210, 40%, 50%)` are equally bright and equally readable; the first is just more intense. If you want a paler colour, lower the **lightness**.',
          },
          {
            type: 'list',
            id: 'c-l10-l2',
            style: 'bullet',
            items: [
              '**A palette.** One hue, a set of lightnesses, a set of saturation levels. It scales to any size without a designer picking every swatch.',
              '**A dark mode.** Dark mode is usually the same hues at lower lightness, which is a one-line change to a variable rather than a second set of hand-picked hex values.',
              '**Hover states.** Derive a hover colour with `filter: brightness(1.1)` instead of authoring a second colour at all.',
              '**Chart palettes.** Pick hues that are far apart on the wheel and pin one lightness, and every series reads at the same visual weight.',
            ],
          },
          {
            type: 'exercise',
            id: 'ex-l10-x1',
            exercise: {
              id: 'ex-l10',
              instructions:
                'Set the background of both bars with `hsl()`: the first pure red, the second pure green. Give the second one an alpha of 0.5 so it reads as translucent.',
              languages: ['css'],
              starterCode: {
                html: '<div class="bar red">red</div>\n<div class="bar green">green</div>',
                css: '.bar {\n  height: 3rem;\n  margin-bottom: 0.5rem;\n}\n.red {\n  \n}\n.green {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l10-t1',
                  label: 'The first bar is pure red',
                  body: 'return getComputedStyle(document.querySelector(".red")).backgroundColor === "rgb(255, 0, 0)"',
                },
                {
                  id: 'ex-l10-t2',
                  label: 'The second bar is pure green',
                  body: 'const v = getComputedStyle(document.querySelector(".green")).backgroundColor; const m = v.match(/rgba\\(([^)]+)\\)/); if (!m) return false; const p = m[1].split(",").map((s) => parseFloat(s)); return p[0] === 0 && p[1] === 255 && p[2] === 0',
                },
                {
                  id: 'ex-l10-t3',
                  label: 'The second bar is at half opacity',
                  body: 'const v = getComputedStyle(document.querySelector(".green")).backgroundColor; const m = v.match(/rgba\\(([^)]+)\\)/); if (!m) return false; const p = m[1].split(",").map((s) => parseFloat(s)); return p.length === 4 && p[3] > 0.45 && p[3] < 0.55',
                },
                {
                  id: 'ex-l10-t4',
                  label: 'Both were written with hsl, not hex',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); const hits = (css.match(/hsla?\\(/gi) || []).length; return hits >= 2',
                },
              ],
              hints: [
                'Hue 0 with 100% saturation and 50% lightness is fully saturated red.',
                'Green sits at hue 120.',
                'Try `hsl(0, 100%, 50%)` and `hsla(120, 100%, 50%, 0.5)`.',
              ],
              solution: {
                html: '<div class="bar red">red</div>\n<div class="bar green">green</div>',
                css:
                  '.bar {\n  height: 3rem;\n  margin-bottom: 0.5rem;\n}\n.red {\n  background-color: hsl(0, 100%, 50%);\n}\n.green {\n  background-color: hsla(120, 100%, 50%, 0.5);\n}\n',
              },
              testNotes:
                'The fourth test checks the notation that was used, not only the colour that came out, because HSL and hex produce identical results.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s7',
      title: 'CSS Colors quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s7-q1',
          type: 'multiple-choice',
          prompt: 'What is `#0a0` the same colour as?',
          options: ['`#000a00`', '`#00aa00`', '`#0a0a0a`', '`rgb(0, 170, 0)` is a different colour'],
          answer: 1,
          explanation:
            'The three-digit form doubles each digit, so `#0a0` expands to `#00aa00`. It is also `rgb(0, 170, 0)`, so the last option describes the same colour.',
        },
        {
          id: 'quiz-css-s7-q2',
          type: 'code-output',
          prompt: 'What does `rgba(0, 128, 128, 0.5)` paint over an orange box?',
          code: `.panel {
  background-color: rgba(0, 128, 128, 0.5);
}`,
          options: [
            'A paler teal, half blended toward white',
            'A translucent teal, with the orange showing through',
            'A fully transparent box with an orange tint',
            'Teal at 50% brightness',
          ],
          answer: 1,
          explanation:
            'Alpha changes opacity, not brightness or hue. The result is the teal blended per pixel with whatever was already painted underneath.',
        },
        {
          id: 'quiz-css-s7-q3',
          type: 'true-false',
          prompt: 'Alpha in `rgba()` changes the brightness of the colour.',
          answer: false,
          explanation:
            'Alpha only controls opacity. To change brightness in HSL you move the lightness, and in hex you change the channel values.',
        },
        {
          id: 'quiz-css-s7-q4',
          type: 'blank',
          prompt:
            'In `hsl(210, 80%, 30%)`, which value is the percentage that controls how vivid the colour is? Give the property name, saturation or lightness.',
          answers: ['saturation', 'the saturation', 'sat'],
          explanation:
            'Saturation controls vividness and lightness controls brightness. The first value in each is the hue angle.',
        },
        {
          id: 'quiz-css-s7-q5',
          type: 'multiple-choice',
          prompt: 'Why is HSL usually the better notation inside a design system?',
          options: [
            'It is shorter to type than hex',
            'It converts to hex without loss, so it is faster to paint',
            'A whole palette can be derived from one hue by moving lightness and saturation',
            'It is the only notation that supports transparency',
          ],
          answer: 2,
          explanation:
            'HSL exposes the axes a designer already thinks in. A tint, a shade and a dark-mode variant can all be computed from a single hue, instead of being hand-picked one by one.',
        },
      ],
    },
  },
  {
    id: 'css-s8',
    title: 'CSS Backgrounds',
    description:
      'The background layers behind an element, and the five properties that control how they tile, move and stack.',
    lessons: [
      {
        id: 'css-l11',
        title: 'Background Color',
        description:
          'The paint behind an element, the `transparent` keyword, and exactly how much of the box a background covers.',
        duration: 5,
        objectives: [
          'Set a background colour on any element',
          'Say which parts of the box a background covers and which it skips',
          'Use `transparent` to cancel a background that is inherited or set higher up',
          'Explain why a default background is transparent rather than white',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l11-b1',
            body: '`background-color` paints a solid colour behind an element. It is a plain colour property, so it accepts every notation from the previous lessons, and by default it covers the entire padding box.',
          },
          {
            type: 'demo',
            id: 'c-l11-d1',
            title: 'Where the paint stops',
            body: 'The orange area is the element. Its background fills the whole area including the padding and under the border. The dashed outline is there only to mark where the margin is — that strip stays clear, because a background never paints into margin.',
            html: `<div class="frame">
  <p class="painted">The background fills this orange area, padding and all. The dashed strip is the margin, and it is never painted.</p>
</div>`,
            css: `.frame {
  border: 1px dashed #6b7480;
  padding: 0;
}
.painted {
  margin: 1.5rem;
  padding: 1rem;
  border: 6px solid #a4541a;
  background-color: #ffd8a8;
  margin-bottom: 0;
  font-size: 14px;
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l11-b2',
            body: 'The background extends to the outer edge of the **border** and stops there. It covers the content area and the padding. It does not reach into the margin, which is by design: margin is the gap you keep between elements, and painting it would mean painting your neighbours.',
          },
          {
            type: 'heading',
            id: 'c-l11-h1',
            level: 3,
            body: 'The property, and `transparent`',
          },
          {
            type: 'list',
            id: 'c-l11-l1',
            style: 'bullet',
            items: [
              '`background-color: teal` — accepts named colours, `rgb()`, `rgba()`, hex and `hsl()`, exactly like every other colour property.',
              '`background-color: transparent` — the keyword for fully see-through. It is also the **initial value**, which is why every element on the page has no background until you give it one.',
              'Because it is not inherited, setting it on a parent will not give it to the children. Each element that needs one gets its own declaration, or a shared class.',
            ],
          },
          {
            type: 'demo',
            id: 'c-l11-d2',
            title: 'Transparent against a coloured parent',
            body: 'The left card paints its own grey. The right card sets `background-color: transparent`, so the teal parent shows straight through it. Same page, same parent, and the right one looks like it has no background at all.',
            html: `<div class="parent">
  <div class="opaque">background-color: #f2f5f8</div>
  <div class="clear">background-color: transparent</div>
</div>`,
            css: `.parent {
  display: flex;
  gap: 0.5rem;
  background-color: #29e2bd;
  padding: 0.75rem;
  border-radius: 10px;
}
.opaque,
.clear {
  flex: 1;
  padding: 1.5rem 0.75rem;
  border-radius: 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  color: #04231f;
}
.opaque {
  background-color: #f2f5f8;
}
.clear {
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.25);
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l11-b3',
            body: 'The right card is not white, it is showing the teal. That distinction matters: a page background reads as the page, while a transparent element reads as whatever it sits on, which is what you want for a card that should inherit a theme.',
          },
          {
            type: 'tip',
            id: 'c-l11-t1',
            title: 'Use `transparent` to opt out of a themed background',
            body: 'If a component library puts a background on every `button`, and you need one ghost button, `background-color: transparent` is the clean override. It is more explicit than leaving the property alone, and it documents the intent.',
          },
          {
            type: 'warning',
            id: 'c-l11-w1',
            title: 'A background on `body` does not cover the whole viewport',
            body: 'The background of the root element propagates to the canvas, but a background on `body` only paints the body box. If a short page leaves a strip of white below it, that is why — and it is a very common first surprise.',
          },
          {
            type: 'exercise',
            id: 'ex-l11-x1',
            exercise: {
              id: 'ex-l11',
              instructions:
                'Give the alert a teal background, and make the ghost button on the teal bar fully transparent so the bar shows through it. Leave the bar itself alone.',
              languages: ['css'],
              starterCode: {
                html: '<div class="alert">Saved</div>\n<div class="bar"><button class="ghost" type="button">Cancel</button></div>',
                css: '.alert {\n  \n}\n.bar {\n  background-color: teal;\n  padding: 0.5rem;\n}\n.ghost {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l11-t1',
                  label: 'The alert has a teal background',
                  body: 'return getComputedStyle(document.querySelector(".alert")).backgroundColor === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l11-t2',
                  label: 'The ghost button is fully transparent',
                  body: 'return getComputedStyle(document.querySelector(".ghost")).backgroundColor === "rgba(0, 0, 0, 0)"',
                },
                {
                  id: 'ex-l11-t3',
                  label: 'The teal bar was left as it was',
                  body: 'return getComputedStyle(document.querySelector(".bar")).backgroundColor === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l11-t4',
                  label: 'Transparency came from the keyword, not from a zero alpha colour',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /background-color:\\s*transparent/.test(css)',
                },
              ],
              hints: [
                'Teal is the keyword `teal`, which computes to `rgb(0, 128, 128)`.',
                '`transparent` is a keyword, not a colour with an alpha of zero.',
                'Try `background-color: teal;` on `.alert` and `background-color: transparent;` on `.ghost`.',
              ],
              solution: {
                html: '<div class="alert">Saved</div>\n<div class="bar"><button class="ghost" type="button">Cancel</button></div>',
                css:
                  '.alert {\n  background-color: teal;\n}\n.bar {\n  background-color: teal;\n  padding: 0.5rem;\n}\n.ghost {\n  background-color: transparent;\n}\n',
              },
              testNotes:
                'A computed `rgba(0, 0, 0, 0)` is the browser\'s rendering of `transparent`, so the second test passes for the keyword and also for an equivalent zero alpha.',
            },
          },
        ],
      },
      {
        id: 'css-l12',
        title: 'Background Image',
        description:
          'Painting an image or a generated gradient behind an element, and the two properties that decide how it is sized and placed.',
        duration: 6,
        objectives: [
          'Set a background image with `background-image: url(...)`',
          'Use a gradient as a background image with no file at all',
          'Size and position an image with `background-size` and `background-position`',
          'Choose between `cover` and `contain` and know what each does to the shape',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l12-b1',
            body: '`background-image` paints an image behind an element. It takes a `url()` reference to a file, or a gradient function, which is generated by the browser and needs no file at all.',
          },
          {
            type: 'demo',
            id: 'c-l12-d1',
            title: 'A url image and a gradient, side by side',
            body: 'The left box is tiled from a small inline SVG. The right box is a gradient that exists only as CSS. Neither one is a downloaded file, so both render offline and neither can 404.',
            html: `<div class="row">
  <div class="box tiled">url()</div>
  <div class="box gradient">linear-gradient()</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 0.5rem;
}
.box {
  flex: 1;
  height: 150px;
  display: flex;
  align-items: flex-end;
  padding: 0.5rem;
  border-radius: 8px;
  color: #04231f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.tiled {
  background-image: url("${TILE}");
  background-repeat: no-repeat;
  background-size: 40px 40px;
  background-position: center;
}
.gradient {
  background-image: linear-gradient(135deg, #29e2bd, #1f6feb);
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l12-b2',
            body: 'Both of those are `background-image` values, and they behave identically from here on. A gradient is just an image the browser draws for you, which makes it the right tool for a tint, a sheen or a placeholder that costs no request.',
          },
          {
            type: 'heading',
            id: 'c-l12-h1',
            level: 3,
            body: 'Sizing and positioning',
          },
          {
            type: 'list',
            id: 'c-l12-l1',
            style: 'bullet',
            items: [
              '`background-size` — `auto` keeps the intrinsic size, a length or percentage scales it, `cover` scales up until the image fills the box and crops the overflow, `contain` scales down until the whole image fits and leaves the rest empty.',
              '`background-position` — where the image sits inside the box. Keywords (`top`, `center`, `bottom right`), lengths, or percentages. Defaults to `0% 0%`, the top left.',
              '`background-repeat` decides what happens in the leftover space, and is the subject of the next lesson.',
            ],
          },
          {
            type: 'demo',
            id: 'c-l12-d2',
            title: 'The four sizes of the same image',
            body: 'The same wide image in four boxes of different proportions: left to right `auto`, `contain`, `cover`, and `100% 100%` which stretches it and distorts the aspect ratio.',
            html: `<div class="grid">
  <div class="cell"><span>auto</span></div>
  <div class="cell contain"><span>contain</span></div>
  <div class="cell cover"><span>cover</span></div>
  <div class="cell stretch"><span>100% 100%</span></div>
</div>`,
            css: `.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.cell {
  height: 90px;
  border: 1px solid #d5dae0;
  border-radius: 6px;
  display: flex;
  align-items: flex-end;
  padding: 0.25rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #04231f;
  background-image: url("${STRIPE}");
  background-repeat: no-repeat;
}
.contain {
  background-size: contain;
  background-position: center;
}
.cover {
  background-size: cover;
  background-position: center;
}
.stretch {
  background-size: 100% 100%;
}`,
            height: 260,
          },
          {
            type: 'text',
            id: 'c-l12-b3',
            body: '`cover` is what you want for a photo in a hero: the box is always full, and the crop is what varies. `contain` is what you want for a logo or an icon, where cutting part of it would be wrong. `100% 100%` fills the box and distorts the image, which is almost never what anyone means.',
          },
          {
            type: 'tip',
            id: 'c-l12-t1',
            title: 'Gradients are the cheapest background there is',
            body: '`linear-gradient`, `radial-gradient` and `conic-gradient` are images the browser generates. A placeholder block, a divider, a hover sheen or a hero wash all cost zero requests this way, and they scale without a single extra byte of image data.',
          },
          {
            type: 'warning',
            id: 'c-l12-w1',
            title: 'A background image is decorative, and it is not content',
            body: 'A `background-image` cannot be read by a screen reader, cannot be selected, and disappears entirely in forced-colours mode. If the image carries information — a chart, a logo with a name, an icon that means something — it belongs in an `<img>` or an inline `<svg>`.',
          },
          {
            type: 'list',
            id: 'c-l12-l2',
            style: 'bullet',
            items: [
              'A path is resolved relative to the **stylesheet**, not the page, in the same way an `href` is. A path that worked inline may break when the CSS moves to its own file.',
              'A missing file fails silently: the box renders as if no image were set, with a 404 in the network tab and nothing on screen.',
              '**Multiple images** are allowed as a comma-separated list. The first one in the list is the topmost layer, so the layer closest to your content is written first.',
            ],
          },
          {
            type: 'exercise',
            id: 'ex-l12-x1',
            exercise: {
              id: 'ex-l12',
              instructions:
                'Give the banner a horizontal gradient background from teal to blue, and give the stripe below it a repeating tile so you can see it repeat. Use a gradient and a `url()` respectively, and do not use the `background` shorthand.',
              languages: ['css'],
              starterCode: {
                html: '<div class="banner">Banner</div>\n<div class="stripe">Stripe</div>',
                css:
                  '.banner {\n  height: 4rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n}\n.stripe {\n  height: 3rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l12-t1',
                  label: 'The banner uses a gradient',
                  body: 'return getComputedStyle(document.querySelector(".banner")).backgroundImage.includes("gradient")',
                },
                {
                  id: 'ex-l12-t2',
                  label: 'The gradient goes from teal to blue',
                  body: 'const v = getComputedStyle(document.querySelector(".banner")).backgroundImage; return /rgb\\(41, 226, 189\\)/.test(v) && /rgb\\(31, 111, 235\\)/.test(v)',
                },
                {
                  id: 'ex-l12-t3',
                  label: 'The stripe uses a url() image',
                  body: 'return getComputedStyle(document.querySelector(".stripe")).backgroundImage.startsWith("url(")',
                },
                {
                  id: 'ex-l12-t4',
                  label: 'The stripe repeats and covers its box',
                  body: 'const s = getComputedStyle(document.querySelector(".stripe")); return s.backgroundRepeat === "repeat" && s.backgroundSize !== "auto"',
                },
              ],
              hints: [
                'A gradient is a value for `background-image`, not a separate property.',
                'Teal is `rgb(41, 226, 189)` and blue is `rgb(31, 111, 235)`.',
                'Try `background-image: linear-gradient(90deg, rgb(41, 226, 189), rgb(31, 111, 235));` and a small `url("tile.svg")` with `background-size: 24px 24px`.',
              ],
              solution: {
                html: '<div class="banner">Banner</div>\n<div class="stripe">Stripe</div>',
                css:
                  '.banner {\n  height: 4rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  background-image: linear-gradient(90deg, rgb(41, 226, 189), rgb(31, 111, 235));\n}\n.stripe {\n  height: 3rem;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22%3E%3Crect width=%2224%22 height=%2224%22 fill=%2329e2bd%22/%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%225%22 fill=%230b0d10%22/%3E%3C/svg%3E");\n  background-size: 24px 24px;\n  background-repeat: repeat;\n}\n',
              },
              testNotes:
                'The fourth test confirms the tile is repeated at a size other than its intrinsic one, which is what makes a repeat visible.',
            },
          },
        ],
      },
      {
        id: 'css-l13',
        title: 'Background Repeat',
        description:
          'The six values of `background-repeat`, and how tiling rules and `space` and `round` each fill the leftover area.',
        duration: 7,
        objectives: [
          'Name all six values of `background-repeat` and what each does',
          'Predict whether an image will tile, and in which direction',
          'Explain how `space` and `round` differ from a plain `repeat`',
          'Combine a repeat value with a size and a position to tile in one direction',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l13-b1',
            body: 'Once a background image is smaller than the box it goes in, something has to happen in the leftover space. `background-repeat` is the property that decides what, and it has six values.',
          },
          {
            type: 'demo',
            id: 'c-l13-d1',
            title: 'Repeating versus not repeating',
            body: 'The same 40px tile in two boxes. The top one repeats until it fills the box. The bottom one appears exactly once, in the top left, and the rest is empty. Nothing else differs between them.',
            html: `<div class="stack">
  <div class="box tiled">repeat</div>
  <div class="box once">no-repeat</div>
</div>`,
            css: `.stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.box {
  height: 110px;
  border: 1px solid #d5dae0;
  border-radius: 8px;
  background-image: url("${TILE}");
  background-size: 40px 40px;
  display: flex;
  align-items: flex-end;
  padding: 0.35rem;
  color: #04231f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.tiled {
  background-repeat: repeat;
}
.once {
  background-repeat: no-repeat;
}`,
            height: 260,
          },
          {
            type: 'text',
            id: 'c-l13-b2',
            body: 'The default value is `repeat`, which is why an image smaller than its box tiles by default and catches people out with content images. The moment you set `no-repeat`, the leftover space is simply left alone.',
          },
          {
            type: 'heading',
            id: 'c-l13-h1',
            level: 3,
            body: 'The six values',
          },
          {
            type: 'list',
            id: 'c-l13-l1',
            style: 'bullet',
            items: [
              '`repeat` — tile in both directions until the box is full. Clips the partial tile at the edges. **This is the default.**',
              '`no-repeat` — draw it once at the `background-position` offset and leave the rest empty.',
              '`repeat-x` — tile horizontally only. The standard choice for a strip along the top of a page.',
              '`repeat-y` — tile vertically only. Less common, and easy to mistake for a bug when an image is taller than expected.',
              '`space` — tile in that direction, but **scale the gaps** rather than the image, so the tiles keep their size and the leftover is distributed between them. Nothing is ever clipped.',
              '`round` — tile in that direction and **scale the image down** so a whole number of tiles fits exactly. The image changes size; the seams always line up.',
            ],
          },
          {
            type: 'demo',
            id: 'c-l13-d2',
            title: 'All six, on the same tile',
            body: 'Six boxes, one tile, six repeat values. Look at the edges: `repeat` cuts a tile in half, `space` spreads the gap instead, and `round` has scaled its tile down slightly so a whole number of them fits.',
            html: `<div class="grid">
  <div class="cell"><b>repeat</b></div>
  <div class="cell"><b>no-repeat</b></div>
  <div class="cell"><b>repeat-x</b></div>
  <div class="cell"><b>repeat-y</b></div>
  <div class="cell"><b>space</b></div>
  <div class="cell"><b>round</b></div>
</div>`,
            css: `.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.cell {
  height: 80px;
  border: 1px solid #d5dae0;
  border-radius: 6px;
  background-image: url("${STRIPE}");
  background-size: 34px 34px;
  display: flex;
  align-items: flex-start;
  padding: 0.2rem;
  font-size: 11px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
.cell:nth-child(1) { background-repeat: repeat; }
.cell:nth-child(2) { background-repeat: no-repeat; }
.cell:nth-child(3) { background-repeat: repeat-x; }
.cell:nth-child(4) { background-repeat: repeat-y; }
.cell:nth-child(5) { background-repeat: space; }
.cell:nth-child(6) { background-repeat: round; }`,
            height: 280,
          },
          {
            type: 'text',
            id: 'c-l13-b3',
            body: 'The sixth box is the interesting one: its stripes are slightly closer together than the fifth box\'s. That is `round` resizing the image to fit a whole number of tiles. `space` never resizes anything — it just widens the spacing, which is why the stripes in box five are the same thickness as in box one.',
          },
          {
            type: 'tip',
            id: 'c-l13-t1',
            title: 'Always pair a repeat with a size',
            body: '`background-repeat: repeat` on its own tiles the image at its intrinsic pixel size, which for a photograph means a giant tile. Set `background-size` and the tiling becomes a decision rather than an accident.',
          },
          {
            type: 'warning',
            id: 'c-l13-w1',
            title: 'A repeating photo is a performance problem',
            body: 'A tiled image forces the browser to paint every copy, and on a large area that is a lot of fills per frame during scroll. Tiles are fine for small flat patterns. For a photograph, size it once with `cover` and let it be clipped instead.',
          },
          {
            type: 'example',
            id: 'c-l13-e1',
            title: 'A seamless header strip',
            body: 'A strip along the top of a panel, tiled in one direction only. Notice that `repeat-x` plus a small `background-size` is what stops the pattern from becoming a grid.',
            html: `<div class="panel">
  <div class="strip"></div>
  <div class="body">The pattern above tiles horizontally only, so it reads as a band rather than as a grid.</div>
</div>`,
            css: `.panel {
  border: 1px solid #d5dae0;
  border-radius: 10px;
  overflow: hidden;
}
.strip {
  height: 26px;
  background-image: url("${STRIPE}");
  background-size: 26px 26px;
  background-repeat: repeat-x;
}
.body {
  padding: 0.9rem;
  font-size: 13px;
  color: #3d4753;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'ex-l13-x1',
            exercise: {
              id: 'ex-l13',
              instructions:
                'The band should tile its pattern across the width only. Set `background-repeat` to `repeat-x` on the band, and `no-repeat` on the badge so its single icon stays single.',
              languages: ['css'],
              starterCode: {
                html: '<div class="band"></div>\n<div class="badge"></div>',
                css:
                  '.band {\n  height: 40px;\n  border: 1px solid #d5dae0;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Crect width=%2220%22 height=%2220%22 fill=%2329e2bd%22/%3E%3C/svg%3E");\n  background-size: 20px 20px;\n}\n.badge {\n  width: 90px;\n  height: 40px;\n  border: 1px solid #d5dae0;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%228%22 fill=%23crimson%22/%3E%3C/svg%3E");\n  background-size: 20px 20px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l13-t1',
                  label: 'The band repeats across the width',
                  body: 'return getComputedStyle(document.querySelector(".band")).backgroundRepeat === "repeat-x"',
                },
                {
                  id: 'ex-l13-t2',
                  label: 'The band does not repeat vertically',
                  body: 'return getComputedStyle(document.querySelector(".band")).backgroundRepeatY === "no-repeat"',
                },
                {
                  id: 'ex-l13-t3',
                  label: 'The badge does not repeat at all',
                  body: 'return getComputedStyle(document.querySelector(".badge")).backgroundRepeat === "no-repeat"',
                },
                {
                  id: 'ex-l13-t4',
                  label: 'Both background sizes were left in place',
                  body: 'const a = getComputedStyle(document.querySelector(".band")).backgroundSize; const b = getComputedStyle(document.querySelector(".badge")).backgroundSize; return a === "20px 20px" && b === "20px 20px"',
                },
              ],
              hints: [
                '`repeat-x` tiles left to right and leaves the vertical direction alone.',
                'The two-direction form of the property splits into `background-repeat-x` and `background-repeat-y` in the computed style.',
                '`.band { background-repeat: repeat-x; }` and `.badge { background-repeat: no-repeat; }`',
              ],
              solution: {
                html: '<div class="band"></div>\n<div class="badge"></div>',
                css:
                  '.band {\n  height: 40px;\n  border: 1px solid #d5dae0;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Crect width=%2220%22 height=%2220%22 fill=%2329e2bd%22/%3E%3C/svg%3E");\n  background-size: 20px 20px;\n  background-repeat: repeat-x;\n}\n.badge {\n  width: 90px;\n  height: 40px;\n  border: 1px solid #d5dae0;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Ccircle cx=%2210%22 cy=%2210%22 r=%228%22 fill=%23crimson%22/%3E%3C/svg%3E");\n  background-size: 20px 20px;\n  background-repeat: no-repeat;\n}\n',
              },
              testNotes:
                'The second test reads `background-repeat-y` from the computed style, which is the vertical half of `repeat-x` and must come back as `no-repeat`.',
            },
          },
        ],
      },
      {
        id: 'css-l14',
        title: 'Background Attachment',
        description:
          'The three values of `background-attachment`, what each one is fixed relative to, and why one of them costs you frames.',
        duration: 6,
        objectives: [
          'Name the three values of `background-attachment`',
          'Say what each value is positioned relative to',
          'Explain what `local` does inside a scrollable element',
          'Recognise the performance cost of `fixed` and when it is worth it',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l14-b1',
            body: '`background-attachment` decides what a background image stays attached to as the page moves: the element itself, the scroll container, or the viewport. Three values, and they behave very differently on a long page.',
          },
          {
            type: 'demo',
            id: 'c-l14-d1',
            title: 'Scroll this frame',
            body: 'Each box is taller than the frame you are seeing. Scroll inside any of them and watch the background. The first scrolls with the content, the second is nailed to the box, the third is nailed to the viewport — so it does not move at all when you scroll the box, only when you scroll the page.',
            html: `<div class="tall scroll-att"><span>scroll</span></div>
<div class="tall local-att"><span>local</span></div>
<div class="tall fixed-att"><span>fixed</span></div>`,
            css: `.tall {
  height: 140px;
  border: 1px solid #d5dae0;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  overflow: auto;
  background-size: 40px 40px;
  display: flex;
  align-items: flex-start;
  padding: 0.4rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #04231f;
}
.tall div {
  height: 600px;
}
.scroll-att {
  background-image: url("${TILE}");
  background-repeat: repeat;
  background-attachment: scroll;
}
.local-att {
  background-image: url("${TILE}");
  background-repeat: repeat;
  background-attachment: local;
}
.fixed-att {
  background-image: url("${TILE}");
  background-repeat: repeat;
  background-attachment: fixed;
}`,
            height: 260,
          },
          {
            type: 'text',
            id: 'c-l14-b2',
            body: 'The first box moves its pattern with its own content as you scroll inside it. The second does the same, because the box is the scroll container. The third is positioned against the viewport instead, so scrolling the box does nothing to it at all.',
          },
          {
            type: 'heading',
            id: 'c-l14-h1',
            level: 3,
            body: 'The three values',
          },
          {
            type: 'list',
            id: 'c-l14-l1',
            style: 'bullet',
            items: [
              '`scroll` — **The default.** The background is fixed to the element and scrolls with the page. Nothing surprising ever happens.',
              '`fixed` — The background is positioned relative to the **viewport** and does not move when the page scrolls. This is the parallax and full-bleed-hero effect.',
              '`local` — The background is fixed to the **element\'s own scroll box**. If the element scrolls internally, the background scrolls with it. This is the one people reach for when a fixed background looks wrong inside a modal.',
            ],
          },
          {
            type: 'text',
            id: 'c-l14-b3',
            body: 'The difference between `scroll` and `local` only shows up when the element has its own scrolling. If it does not, they are identical. If it does — a code block, a modal body, a panel with `overflow: auto` — `local` is the correct choice and `scroll` gives you a background that hangs still while its content moves under it.',
          },
          {
            type: 'heading',
            id: 'c-l14-h2',
            level: 3,
            body: 'A full-bleed hero, the legitimate use of `fixed`',
          },
          {
            type: 'example',
            id: 'c-l14-e1',
            title: 'A parallax hero with a fade over it',
            body: 'The gradient on the hero is `fixed`, so it stays put while the page moves and the text appears to slide over a stationary wash. This is `fixed` used for a small, cheap layer — a gradient, not a photograph.',
            html: `<div class="hero">
  <h3>Slower to repaint</h3>
  <p>A fixed gradient costs a repaint of one composited layer. A fixed photograph on a large area does not.</p>
</div>`,
            css: `.hero {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  color: #f4f7fa;
  background-color: #0b0d10;
  background-image: radial-gradient(circle at 30% 20%, rgba(41, 226, 189, 0.55), transparent 60%);
  background-attachment: fixed;
}
.hero h3 {
  margin: 0 0 0.4rem;
  font-size: 18px;
}
.hero p {
  margin: 0;
  max-width: 34ch;
  font-size: 13px;
  color: #b9c2cc;
}`,
            showPreview: true,
          },
          {
            type: 'warning',
            id: 'c-l14-w1',
            title: '`fixed` is the most expensive background value there is',
            body: 'A fixed background cannot be painted once and left alone. On every scroll frame the browser has to keep the background layer aligned to the viewport, which on a large image means a repaint of that whole area, every frame. It is the single biggest cause of janky scrolling on pages that use it. Use a gradient, keep the area small, and add `will-change: transform` on the scrolling layer if you must.',
          },
          {
            type: 'tip',
            id: 'c-l14-t2',
            title: 'Getting the same look without the cost',
            body: 'Put the image on a `::before` pseudo-element that is `position: fixed; inset: 0; z-index: -1;` and let the content scroll over it. The browser promotes it to its own composited layer once, and scrolling becomes a cheap transform instead of a repaint.',
          },
          {
            type: 'exercise',
            id: 'ex-l14-x1',
            exercise: {
              id: 'ex-l14',
              instructions:
                'Pin the pattern on the first panel to the viewport with `background-attachment: fixed`, and on the second to the panel itself with `local`. Leave the third one at its default.',
              languages: ['css'],
              starterCode: {
                html: '<div class="panel pinned">fixed</div>\n<div class="panel own">local</div>\n<div class="panel plain">scroll</div>',
                css:
                  '.panel {\n  height: 90px;\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n  margin-bottom: 0.5rem;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Crect width=%2220%22 height=%2220%22 fill=%2329e2bd%22/%3E%3C/svg%3E");\n  background-size: 20px 20px;\n  display: flex;\n  align-items: flex-start;\n  padding: 0.35rem;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 11px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l14-t1',
                  label: 'The first panel is attached to the viewport',
                  body: 'return getComputedStyle(document.querySelector(".pinned")).backgroundAttachment === "fixed"',
                },
                {
                  id: 'ex-l14-t2',
                  label: 'The second panel is attached to its own scroll box',
                  body: 'return getComputedStyle(document.querySelector(".own")).backgroundAttachment === "local"',
                },
                {
                  id: 'ex-l14-t3',
                  label: 'The third panel is still on the default',
                  body: 'return getComputedStyle(document.querySelector(".plain")).backgroundAttachment === "scroll"',
                },
                {
                  id: 'ex-l14-t4',
                  label: 'The background image was left in place on all three',
                  body: 'return [...document.querySelectorAll(".panel")].every((p) => getComputedStyle(p).backgroundImage.startsWith("url("))',
                },
              ],
              hints: [
                '`fixed` pins the background to the viewport; `local` pins it to the element.',
                'Each panel needs its own `background-attachment` declaration.',
                '`.pinned { background-attachment: fixed; }` and `.own { background-attachment: local; }`',
              ],
              solution: {
                html: '<div class="panel pinned">fixed</div>\n<div class="panel own">local</div>\n<div class="panel plain">scroll</div>',
                css:
                  '.panel {\n  height: 90px;\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n  margin-bottom: 0.5rem;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22%3E%3Crect width=%2220%22 height=%2220%22 fill=%2329e2bd%22/%3E%3C/svg%3E");\n  background-size: 20px 20px;\n  display: flex;\n  align-items: flex-start;\n  padding: 0.35rem;\n  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;\n  font-size: 11px;\n}\n.pinned {\n  background-attachment: fixed;\n}\n.own {\n  background-attachment: local;\n}\n',
              },
              testNotes:
                'The fourth test confirms the image is still set on all three panels, so the attachment values were added rather than swapped in for the image.',
            },
          },
        ],
      },
      {
        id: 'css-l15',
        title: 'Background Shorthand',
        description:
          'The order-sensitive `background` shorthand, the one mistake that silently discards everything you wrote, and how to write it safely.',
        duration: 8,
        objectives: [
          'Write a `background` shorthand with every layer in the correct position',
          'Explain why a misordered shorthand is dropped with no error',
          'Use the `/` separator correctly for a background size',
          'Know when the shorthand is the wrong tool and the longhands are better',
        ],
        xp: 55,
        content: [
          {
            type: 'text',
            id: 'c-l15-b1',
            body: '`background` is a shorthand that sets every background property in one declaration. It is worth learning because it is terse, and worth being careful with because the browser reads it strictly and throws away anything it cannot parse.',
          },
          {
            type: 'demo',
            id: 'c-l15-d1',
            title: 'One shorthand, five properties set',
            body: 'The first card is styled entirely with one longhand. The second is styled with a single shorthand that sets the same five things. They are identical on screen, and the second rule is one line instead of five.',
            html: `<div class="row">
  <div class="card longhand">longhand</div>
  <div class="card shorthand">shorthand</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 0.5rem;
}
.card {
  flex: 1;
  min-height: 120px;
  padding: 0.75rem;
  border-radius: 8px;
  color: #04231f;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
}
.longhand {
  background-color: #ffe8cc;
  background-image: url("${TILE}");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: 40px 40px;
}
.shorthand {
  background: #ffe8cc url("${TILE}") no-repeat fixed center / 40px 40px;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l15-b2',
            body: 'Both cards came out identical. The shorthand set the colour, the image, the repeat, the attachment, the position and the size in one declaration, and that is the entire reason to use it.',
          },
          {
            type: 'warning',
            id: 'c-l15-w1',
            title: 'The order matters, and a wrong order is dropped completely',
            body: 'The browser reads a `background` shorthand **left to right** against a fixed grammar. Position and size must appear as `position / size` — the slash is part of the syntax, not decoration. If any part is out of place, or if a value arrives in a position the parser has already moved past, the parser cannot disambiguate it and **discards the entire declaration**. No colour, no image, nothing. The element simply falls back to the initial values and you get no error message anywhere.',
          },
          {
            type: 'demo',
            id: 'c-l15-d2',
            title: 'The same declaration with the slash missing',
            body: 'The first box has `background: teal url(...) no-repeat center / 60px 60px` and it works. The second has `center 60px 60px` with the slash removed. The second box is not a slightly wrong teal — it has no background at all, because the whole declaration was thrown away.',
            html: `<div class="stack">
  <div class="ok">with the slash</div>
  <div class="broken">without the slash</div>
</div>`,
            css: `.stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.stack div {
  height: 100px;
  border: 1px solid #d5dae0;
  border-radius: 8px;
  padding: 0.4rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #04231f;
}
.ok {
  background: #29e2bd url("${TILE}") no-repeat center / 60px 60px;
}
.broken {
  background: #29e2bd url("${TILE}") no-repeat center 60px 60px;
}`,
            height: 250,
          },
          {
            type: 'text',
            id: 'c-l15-b2a',
            body: 'The bottom box has a border and no teal at all. That is what "silently dropped" means in practice: you keep the declarations around, they look correct, and nothing on the page reflects them.',
          },
          {
            type: 'heading',
            id: 'c-l15-h1',
            level: 3,
            body: 'The order to write it in',
          },
          {
            type: 'code',
            id: 'c-l15-c1',
            language: 'css',
            title: 'The canonical order',
            code: `background: <color> <image> <repeat> <attachment> <position> / <size>;

background: teal url("tile.svg") no-repeat fixed center / 60px 60px;
/*           ^    ^             ^         ^   ^        ^    ^
             |    |             |         |   |        |    background-size
             |    |             |         |   |        position
             |    |             |         |   attachment
             |    |             |         background-repeat
             |    |             background-image
             |    background-color
             the property`,
          },
          {
            type: 'text',
            id: 'c-l15-b3',
            body: 'Two rules make this reliable. First, the **position and size travel together** as a single `position / size` unit — the slash is mandatory when you supply a size, and it must sit directly between them. Second, anything you leave out simply is not set, so the shorthand is a *reset* for every background property it covers: a bare `background: teal` clears the image, the repeat, the position and the size as well as setting the colour.',
          },
          {
            type: 'demo',
            id: 'c-l15-d3',
            title: 'The reset behaviour, and the single-value reset',
            body: 'The first box sets five background properties. The second declares only `background: teal`, which sets the colour **and wipes the other four back to their initial values**. That is why the pattern on the first box is not merely recoloured on the second — it is gone.',
            html: `<div class="stack">
  <div class="full">background: teal url(...) no-repeat fixed center / 40px 40px</div>
  <div class="wiped">background: teal</div>
</div>`,
            css: `.stack {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.stack div {
  height: 100px;
  border: 1px solid #d5dae0;
  border-radius: 8px;
  padding: 0.4rem;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  color: #04231f;
}
.full {
  background: teal url("${TILE}") no-repeat fixed center / 40px 40px;
}
.wiped {
  background: teal;
}`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'c-l15-h2',
            level: 3,
            body: 'Multiple layers in one shorthand',
          },
          {
            type: 'text',
            id: 'c-l15-b4',
            body: 'You may declare several background layers in a single shorthand, separated by commas. The rule is the same as the multi-layer paint order elsewhere in CSS: the **first** layer is the one closest to your content, and the last is the bottom-most, so the one you want behind everything else goes last.',
          },
          {
            type: 'code',
            id: 'c-l15-c2',
            language: 'css',
            title: 'Three layers, comma separated',
            code: `.hero {
  background:
    linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url("hero.jpg") center / cover no-repeat,
    #0b0d10;
}`,
          },
          {
            type: 'list',
            id: 'c-l15-l1',
            style: 'bullet',
            items: [
              '**A colour is only allowed in the final layer.** It is the one layer with no image in front of it, which is the only place a solid colour can sensibly go. Putting a colour in an earlier layer makes the whole shorthand invalid.',
              '**A short value resets the ones after it** within that layer, so `url("a.png")` on its own line means "no repeat, no attachment, default position, auto size".',
              '**Write it across several lines** as shown above. A multi-layer shorthand on one line is genuinely unreadable, and it is where order mistakes hide.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l15-t1',
            title: 'Use the shorthand for the reset, longhands for the detail',
            body: 'The best pattern in real stylesheets is one short `background: #0b0d10;` to establish a base, followed by `background-image` and `background-position` as separate declarations. You get the reset for free and the later lines stay readable, because each one is a single property with a single value.',
          },
          {
            type: 'warning',
            id: 'c-l15-w2',
            title: 'The shorthand also resets `background-color` to transparent',
            body: 'This is the version that catches people out. `background: url("a.png")` on an element that previously had `background-color: red` removes the red, because a shorthand only sets the properties you name — and the colour counts as not named. If you want a colour, include it in the shorthand.',
          },
          {
            type: 'exercise',
            id: 'ex-l15-x1',
            exercise: {
              id: 'ex-l15',
              instructions:
                'Style the card with a single `background` shorthand. It must set a teal colour, tile a 24px pattern, not repeat it, centre it, and keep the existing border. Get the order right — if the shorthand is malformed it will be discarded entirely.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">Report</div>',
                css: '.card {\n  border: 2px solid #d5dae0;\n  border-radius: 8px;\n  padding: 1rem;\n  font-size: 14px;\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l15-t1',
                  label: 'The shorthand was accepted and the colour took',
                  body: 'return getComputedStyle(document.querySelector(".card")).backgroundColor === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l15-t2',
                  label: 'The image took, and so did the size',
                  body: 'const s = getComputedStyle(document.querySelector(".card")); return s.backgroundImage.startsWith("url(") && s.backgroundSize === "24px 24px"',
                },
                {
                  id: 'ex-l15-t3',
                  label: 'The repeat and the position took',
                  body: 'const s = getComputedStyle(document.querySelector(".card")); return s.backgroundRepeat === "no-repeat" && s.backgroundPosition.includes("center")',
                },
                {
                  id: 'ex-l15-t4',
                  label: 'It really was written as one shorthand declaration',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /background:\\s*(?!-)/.test(css) && !/background-color:/.test(css) && !/background-image:/.test(css)',
                },
              ],
              hints: [
                'The size has to sit after a slash, immediately following the position: `center / 24px 24px`.',
                'The canonical order is colour, image, repeat, attachment, position, then `/ size`.',
                'Try `background: teal url("tile.svg") no-repeat center / 24px 24px;` — the border and radius stay where they are.',
              ],
              solution: {
                html: '<div class="card">Report</div>',
                css:
                  '.card {\n  border: 2px solid #d5dae0;\n  border-radius: 8px;\n  padding: 1rem;\n  font-size: 14px;\n  background: teal url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22%3E%3Crect width=%2224%22 height=%2224%22 fill=%23ffffff%22/%3E%3Ccircle cx=%2212%22 cy=%2212%22 r=%226%22 fill=%2329e2bd%22/%3E%3C/svg%3E") no-repeat center / 24px 24px;\n}\n',
              },
              testNotes:
                'The first three tests fail together if the shorthand is malformed, because a dropped declaration resets every background property to its initial value. That is the point of the exercise.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s8',
      title: 'CSS Backgrounds quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s8-q1',
          type: 'multiple-choice',
          prompt: 'Which parts of an element does `background-color` paint?',
          options: [
            'The margin and the padding',
            'The content, the padding and under the border',
            'The content area only',
            'The whole viewport behind the element',
          ],
          answer: 1,
          explanation:
            'A background fills the padding box and paints under the border, stopping at the border edge. It never paints into the margin.',
        },
        {
          id: 'quiz-css-s8-q2',
          type: 'multiple-choice',
          prompt: 'What does `background-repeat: space` do that `round` does not?',
          options: [
            'It clips the tile at the edge',
            'It keeps the tiles at their original size and spreads the leftover into the gaps',
            'It scales the image down to fit a whole number of tiles',
            'It stops tiling entirely',
          ],
          answer: 1,
          explanation:
            '`space` never resizes anything — it distributes the leftover space between tiles. `round` is the one that scales the image so whole tiles fit.',
        },
        {
          id: 'quiz-css-s8-q3',
          type: 'identify-error',
          prompt: 'This declaration sets no background at all. Why?',
          code: `.card {
  background: #29e2bd url("tile.svg") no-repeat center 40px 40px;
}`,
          options: [
            'A colour is not allowed in a `background` shorthand',
            'The size has to be separated from the position with a slash',
            '`no-repeat` must come after the position',
            'A `url()` cannot be combined with a colour',
          ],
          answer: 1,
          explanation:
            'Position and size form one unit, written `position / size`. Without the slash the parser cannot tell which value is which, so it discards the whole declaration with no error.',
        },
        {
          id: 'quiz-css-s8-q4',
          type: 'true-false',
          prompt: 'Setting `background: teal` on an element also clears any background image already set on it.',
          answer: true,
          explanation:
            'A shorthand only sets the properties it names, and any background property it covers that you leave out goes back to its initial value. Omitting the image clears it, and omitting the colour clears the colour.',
        },
        {
          id: 'quiz-css-s8-q5',
          type: 'multiple-choice',
          prompt: 'Why is `background-attachment: fixed` a performance risk?',
          options: [
            'It is not supported in any mobile browser',
            'The background must be realigned to the viewport on every scroll frame, forcing a repaint of that area',
            'It disables hardware acceleration on the whole page',
            'It requires the image to be re-downloaded while scrolling',
          ],
          answer: 1,
          explanation:
            'The background cannot be painted once and cached, so scrolling repaints it each frame. A fixed gradient over a small area is usually fine; a fixed photograph over a large area is not.',
        },
      ],
    },
  },
]
