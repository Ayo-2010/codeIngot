import type { Section } from '~/types/content'

export const cssTransformMotionSections: Section[] = [
  {
    id: 'css-s50',
    title: 'CSS Text Effects',
    description: 'Transforming text with case changes, spacing adjustments, indentation, and overflow handling.',
    lessons: [
      {
        id: 'css-l89',
        title: 'CSS Text Effects',
        description: 'Using text-transform, letter-spacing, word-spacing, text-indent, and text-overflow with ellipsis.',
        duration: 6,
        xp: 40,
        objectives: [
          'Change text case with text-transform',
          'Adjust letter and word spacing',
          'Indent the first line of a paragraph',
          'Truncate overflowing text with an ellipsis',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l89-b1',
            body: 'CSS provides a handful of properties that change how text looks without changing its meaning. **`text-transform`** alters capitalisation, **`letter-spacing`** and **`word-spacing`** control the gaps between characters and words, **`text-indent`** shifts the first line, and **`text-overflow: ellipsis`** (paired with `white-space: nowrap` and `overflow: hidden`) replaces clipped text with an ellipsis character. These are presentational — they do not affect the underlying text content, selection, or searchability.',
          },
          {
            type: 'demo',
            id: 'c-l89-d1',
            title: 'The same sentence under four treatments',
            body: 'Each paragraph uses the identical source text. The first applies uppercase, the second adds loose letter-spacing, the third indents the first line, and the fourth truncates with an ellipsis.',
            html: `<div class="effects">
  <p class="uppercase">The quick brown fox jumps over the lazy dog.</p>
  <p class="spaced">The quick brown fox jumps over the lazy dog.</p>
  <p class="indented">The quick brown fox jumps over the lazy dog.</p>
  <p class="truncated">The quick brown fox jumps over the lazy dog.</p>
</div>`,
            css: `.effects {
  background: #141922;
  color: #e8edf4;
  font-size: 13px;
  font-family: system-ui, sans-serif;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.uppercase {
  text-transform: uppercase;
}
.spaced {
  letter-spacing: 0.15em;
  word-spacing: 0.5em;
}
.indented {
  text-indent: 2.5rem;
}
.truncated {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l89-b2',
            body: 'Notice that `text-transform: uppercase` does not change the actual characters in the DOM — copy the rendered text and you will paste the original casing. `letter-spacing` accepts length values (including negative ones to tighten), and `word-spacing` works the same way but only affects the space between words. `text-indent` only affects the first formatted line of a block. The ellipsis pattern requires three declarations together: `white-space: nowrap` prevents wrapping, `overflow: hidden` clips the excess, and `text-overflow: ellipsis` inserts the `…` character at the clip point.',
          },
          {
            type: 'heading',
            id: 'c-l89-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l89-c1',
            language: 'css',
            title: 'Text effect properties',
            code: `/* Case transformations */
.heading {
  text-transform: uppercase;   /* also: lowercase | capitalize | none */
}

 /* Spacing — em units scale with font-size */
.loose {
  letter-spacing: 0.1em;       /* between characters */
  word-spacing: 0.5em;         /* between words */
}
.tight {
  letter-spacing: -0.02em;     /* negative tightens */
}

 /* First-line indent */
.paragraph {
  text-indent: 2em;            /* length or percentage */
}

 /* Ellipsis truncation — all three required */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;            /* or any constraining width */
}`,
          },
          {
            type: 'list',
            id: 'c-l89-l1',
            style: 'bullet',
            items: [
              '**`text-transform`** — `uppercase`, `lowercase`, `capitalize` (first letter of each word), `none`. Does not affect copy/paste or find-in-page.',
              '**`letter-spacing`** — space between characters. Use `em` so it scales with the font. Negative values pull letters closer; too negative makes text unreadable.',
              '**`word-spacing`** — space between words. Same units, same scaling. Rarely needed unless you are mimicking a specific typographic style.',
              '**`text-indent`** — indents the first line only. A length or percentage of the containing block width. Use `text-indent: 0` to override a parent indent.',
              '**`text-overflow: ellipsis`** — only works when overflow is clipped and wrapping is disabled. The ellipsis character counts toward the width, so very narrow boxes may show only `…`.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l89-t1',
            title: 'Capitalize is not title case',
            body: '`text-transform: capitalize` uppercases the first letter of every word, including "and", "the", "of". True title case requires JavaScript or a build-step transformation — CSS cannot know which words are articles or prepositions.',
          },
          {
            type: 'warning',
            id: 'c-l89-w1',
            title: 'Ellipsis hides content from everyone',
            body: 'Screen readers may or may not announce the clipped text depending on the browser and settings. If the full text is essential, do not rely on `text-overflow: ellipsis` alone — provide a tooltip, a "read more" expansion, or keep the full text available in the accessibility tree.',
          },
          {
            type: 'example',
            id: 'c-l89-e1',
            title: 'A card title that truncates gracefully',
            body: 'The card has a fixed width. The title uses the three-property ellipsis pattern so long titles never break the card height.',
            html: `<article class="card">
  <h3 class="title">An exceptionally long product name that would overflow the card</h3>
  <p class="meta">Category • $29.00</p>
</article>`,
            css: `.card {
  width: 260px;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 8px;
  padding: 1rem;
  font-size: 13px;
  font-family: system-ui, sans-serif;
}
.title {
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #e8edf4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.meta {
  margin: 0;
  color: #9aa5b4;
  font-size: 0.85rem;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l89-x1',
            exercise: {
              id: 'ex-l89',
              instructions: 'Make the paragraph uppercase, give it loose letter-spacing of 0.1em, and ensure it truncates with an ellipsis if it exceeds 200px.',
              languages: ['css'],
              starterCode: {
                html: '<p class="text">A moderately long sentence that should truncate when the container is narrow.</p>',
                css: '.text {\n  font-size: 13px;\n  font-family: system-ui, sans-serif;\n  max-width: 200px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l89-t1',
                  label: 'The text is uppercase',
                  body: 'return getComputedStyle(document.querySelector(".text")).textTransform === "uppercase"',
                },
                {
                  id: 'ex-l89-t2',
                  label: 'Letter spacing is 0.1em',
                  body: 'const s = getComputedStyle(document.querySelector(".text")); return Math.abs(parseFloat(s.letterSpacing) - 1.3) < 0.5',
                },
                {
                  id: 'ex-l89-t3',
                  label: 'The text truncates with ellipsis',
                  body: 'const s = getComputedStyle(document.querySelector(".text")); return s.whiteSpace === "nowrap" && s.overflow === "hidden" && s.textOverflow === "ellipsis"',
                },
              ],
              hints: [
                'Three separate properties: `text-transform`, `letter-spacing`, and the ellipsis trio.',
                'The ellipsis needs `white-space: nowrap`, `overflow: hidden`, and `text-overflow: ellipsis` together.',
                '`.text { text-transform: uppercase; letter-spacing: 0.1em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }`',
              ],
              solution: {
                html: '<p class="text">A moderately long sentence that should truncate when the container is narrow.</p>',
                css: '.text {\n  font-size: 13px;\n  font-family: system-ui, sans-serif;\n  max-width: 200px;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n',
              },
              testNotes: 'The second test checks computed `letter-spacing` in pixels. `0.1em` at `13px` computes to `1.3px`; the test allows a small rounding tolerance.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s50',
      title: 'CSS Text Effects quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s50-q1',
          type: 'multiple-choice',
          prompt: 'Which `text-transform` value uppercases the first letter of every word, including articles and prepositions?',
          options: ['uppercase', 'lowercase', 'capitalize', 'none'],
          answer: 2,
          explanation: '`capitalize` applies to every word boundary. It cannot distinguish "the" from "Title" — true title case requires JavaScript.',
        },
        {
          id: 'quiz-css-s50-q2',
          type: 'true-false',
          prompt: 'Negative `letter-spacing` pulls characters closer together.',
          answer: true,
          explanation: 'A negative length value reduces the default spacing. Use sparingly — too negative makes text illegible.',
        },
        {
          id: 'quiz-css-s50-q3',
          type: 'multiple-choice',
          prompt: 'What three declarations are required together for `text-overflow: ellipsis` to work?',
          options: [
            '`white-space: nowrap`, `overflow: hidden`, `text-overflow: ellipsis`',
            '`width: 100%`, `overflow: auto`, `text-overflow: ellipsis`',
            '`display: block`, `overflow: hidden`, `text-overflow: clip`',
            '`white-space: pre`, `overflow: visible`, `text-overflow: ellipsis`',
          ],
          answer: 0,
          explanation: 'The text must not wrap (`nowrap`), the overflow must be clipped (`hidden`), and then the ellipsis is inserted at the clip point. All three are mandatory.',
        },
        {
          id: 'quiz-css-s50-q4',
          type: 'blank',
          prompt: 'Which property indents only the first formatted line of a block container?',
          answers: ['text-indent'],
          explanation: '`text-indent` affects the first line only. Subsequent lines are unaffected. Use a length or percentage of the containing block width.',
        },
        {
          id: 'quiz-css-s50-q5',
          type: 'true-false',
          prompt: '`text-transform: uppercase` changes the actual text content in the DOM, so copy/paste yields uppercase text.',
          answer: false,
          explanation: '`text-transform` is purely presentational. The DOM retains the original casing; copy/paste and find-in-page use the original text.',
        },
      ],
    },
  },
  {
    id: 'css-s51',
    title: 'CSS Web Fonts',
    description: 'Using the fonts you did not install: declaring a font file, stacking fallbacks, and deciding when the browser should swap it in.',
    lessons: [
      {
        id: 'css-l90',
        title: 'CSS Web Fonts',
        description: 'Declare a font with @font-face, give it a fallback stack, and control the moment it swaps in with font-display.',
        duration: 8,
        xp: 50,
        objectives: [
          'Declare a font file with @font-face and describe what src, font-family and font-weight do',
          'Write a fallback stack that degrades sensibly when the web font never arrives',
          'Explain the difference between font-display: swap and font-display: optional',
          'Say when system-ui is the better answer than shipping a font file at all',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l90-b1',
            body: 'A web font is just a file the browser downloads on demand, wired to a family name you choose with `@font-face`. The font is not active until something actually *uses* that family name, so declaring a face and then forgetting to reference it is the single most common reason a custom font never appears.',
          },
          {
            type: 'demo',
            id: 'c-l90-d1',
            title: 'Three stacks, three outcomes',
            body: 'The three paragraphs ask for the same three families in a different order. The first names no custom font at all and uses the system UI face. The second names a family that was never declared, so every browser skips it and lands on the next name in the stack. The third names a real family with a genuine fallback, which is what a working `@font-face` looks like. The key lesson is that an unknown family is not an error; it is silently skipped.',
            html: `<p class="s1">The quick brown fox jumps over the lazy dog. 0123456789</p>
<p class="s2">The quick brown fox jumps over the lazy dog. 0123456789</p>
<p class="s3">The quick brown fox jumps over the lazy dog. 0123456789</p>`,
            css: `p {
  margin: 0 0 0.7rem;
  font-size: 19px;
  color: #e8edf4;
}
.s1 {
  font-family: system-ui, sans-serif;
}
.s2 {
  font-family: "Dancing Script", cursive;
}
.s3 {
  font-family: "Georgia", "Times New Roman", serif;
}`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'c-l90-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'text',
            id: 'c-l90-b2',
            body: '`@font-face` is a rule that registers a file under a family name of your choosing. The browser downloads nothing at that point. The download happens when an element on the page is rendered with that family name, and it is cached for later pages.',
          },
          {
            type: 'code',
            id: 'c-l90-c1',
            language: 'css',
            title: 'Declaring and using a face',
            code: `/* register the file under a name you control */
@font-face {
  font-family: "Course Sans";
  src: url("/fonts/course-sans.woff2") format("woff2"),
       url("/fonts/course-sans.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* now use it, with a real fallback behind it */
body {
  font-family: "Course Sans", system-ui, sans-serif;
}`,
          },
          {
            type: 'list',
            id: 'c-l90-l1',
            style: 'bullet',
            items: [
              '**`src`** takes one or more `url()` sources, each with an optional `format()` hint. Give `woff2` first: it is the smallest and every current browser takes it. The extra `woff` is for older engines and costs nothing but a line.',
              '**`font-family`** is the name you are inventing here. It does not have to match the font\'s internal name, and using a name that clashes with an installed system font is a common source of confusing bugs.',
              '**`font-weight` and `font-style`** are how one rule set serves several faces. Declare a separate `@font-face` per weight and the browser downloads only the weight it actually needs, instead of one giant file.',
              '**`font-display`** decides what the user sees while the file is in flight. It is the only declaration here that affects perceived speed.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l90-h2',
            level: 3,
            body: 'font-display is the whole argument',
          },
          {
            type: 'text',
            id: 'c-l90-b3',
            body: 'With `swap`, the browser paints text immediately in the fallback and re-paints it when the web font arrives. With `optional`, it gives the font a very short window: if it is not ready in time, the fallback is used for the life of the page and never swapped. The tradeoff is layout stability against brand consistency.',
          },
          {
            type: 'list',
            id: 'c-l90-l2',
            style: 'bullet',
            items: [
              '**`block`** hides the text entirely for up to three seconds, then shows the fallback. Right for a hero headline that must not flash in the wrong face; wrong for body copy, which just disappears.',
              '**`swap`** shows the fallback at once. The risk is a visible reflow and a flash of mismatched text, which is why you should keep the fallback metrics close to the web font.',
              '**`fallback`** is the middle ground: a very short invisible period, then the fallback forever. Rarely chosen deliberately.',
              '**`optional`** never swaps on a cold load. Best for pages where the font is decoration rather than the content, and the safest default when a slow connection is likely.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l90-w1',
            title: 'A mismatch between fallback and web font moves the layout',
            body: 'If the fallback is much wider than the font you asked for, `swap` produces text that reflows when the real font lands, which pushes everything below it around. Two habits prevent most of it: pick a fallback with similar proportions, and set `size-adjust`, `ascent-override` and `descent-override` on a local `@font-face` that wraps the fallback so the two metrics match.',
          },
          {
            type: 'tip',
            id: 'c-l90-t1',
            title: 'Do you need a font file at all?',
            body: 'Ask first. `system-ui` gives the platform\'s own interface font, which on macOS, Windows and Android are all well designed and cost zero bytes. It also respects the user\'s accessibility size settings, which a fixed web font fights. Many production sites ship one display face for the heading and nothing at all for the body.',
          },
          {
            type: 'exercise',
            id: 'c-l90-x1',
            exercise: {
              id: 'ex-l90',
              instructions:
                'Declare a font face called `Course Sans` from `/fonts/course-sans.woff2` with a weight of 400 and `font-display: swap`, then apply it to `body` with `system-ui` as the fallback.',
              languages: ['css'],
              starterCode: {
                html: '<p>The quick brown fox jumps over the lazy dog.</p>',
                css: 'body {\n  font-size: 16px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l90-t1',
                  label: 'A font face is declared for Course Sans',
                  body: 'return Array.from(document.styleSheets).some((sheet) => { try { return Array.from(sheet.cssRules).some((r) => r.constructor.name === "CSSFontFaceRule" && r.style.getPropertyValue("font-family").replace(/[\'"]/g, "") === "Course Sans") } catch (e) { return false } })',
                },
                {
                  id: 'ex-l90-t2',
                  label: 'The face loads the woff2 file and declares a weight of 400',
                  body: 'return Array.from(document.styleSheets).some((sheet) => { try { return Array.from(sheet.cssRules).some((r) => r.constructor.name === "CSSFontFaceRule" && r.style.getPropertyValue("font-family").replace(/[\'"]/g, "") === "Course Sans" && r.style.getPropertyValue("src").includes("course-sans.woff2") && r.style.getPropertyValue("font-weight") === "400") } catch (e) { return false } })',
                },
                {
                  id: 'ex-l90-t3',
                  label: 'The face asks for swap',
                  body: 'return Array.from(document.styleSheets).some((sheet) => { try { return Array.from(sheet.cssRules).some((r) => r.constructor.name === "CSSFontFaceRule" && r.style.getPropertyValue("font-family").replace(/[\'"]/g, "") === "Course Sans" && r.style.getPropertyValue("font-display") === "swap") } catch (e) { return false } })',
                },
                {
                  id: 'ex-l90-t4',
                  label: 'body uses the new family with system-ui behind it',
                  body: 'return getComputedStyle(document.body).fontFamily.includes("Course Sans") && getComputedStyle(document.body).fontFamily.includes("system-ui")',
                },
              ],
              hints: [
                '`@font-face` goes at the top level of your stylesheet, outside any selector.',
                'Family names are quoted strings in CSS: `font-family: "Course Sans"`.',
                'The rule name the browser shows for a registered face is `CSSFontFaceRule`, which is why these tests read the rule list rather than a computed value.',
              ],
              solution: {
                html: '<p>The quick brown fox jumps over the lazy dog.</p>',
                css: '@font-face {\n  font-family: "Course Sans";\n  src: url("/fonts/course-sans.woff2") format("woff2");\n  font-weight: 400;\n  font-style: normal;\n  font-display: swap;\n}\n\nbody {\n  font-family: "Course Sans", system-ui, sans-serif;\n  font-size: 16px;\n}\n',
              },
              testNotes:
                'A face is a rule rather than a computed style, so the first three tests walk `document.styleSheets` and match on `CSSFontFaceRule`. Reading `cssRules` can throw for cross-origin sheets, so each lookup is wrapped in a try/catch. The font file is never fetched in the sandbox, which does not matter: nothing here depends on the glyphs actually arriving.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s51',
      title: 'CSS Web Fonts quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s51-q1',
          type: 'multiple-choice',
          prompt: 'You add a correct `@font-face` rule but the page still renders in the fallback. What is the most likely cause?',
          options: [
            'The file is in the wrong format',
            'Nothing ever uses the `font-family` you declared on the face',
            '`font-display` has to be set to `block`',
            '`@font-face` only works inside a media query',
          ],
          answer: 1,
          explanation:
            'A face is only a registration. Nothing is downloaded until an element is rendered with that family name. The rule parsed fine, which is why there is no error anywhere.',
        },
        {
          id: 'quiz-css-s51-q2',
          type: 'true-false',
          prompt: 'Naming a font family that was never declared causes an error or falls back to a default font for the whole page.',
          answer: false,
          explanation:
            'An unknown family is silently skipped and the browser moves to the next name in the stack. That is exactly why the stack exists, and why a typo in one family name degrades quietly instead of breaking the page.',
        },
        {
          id: 'quiz-css-s51-q3',
          type: 'blank',
          prompt: 'Which value of `font-display` means the browser will use the fallback for the whole page if the font is not ready almost immediately, and will never swap to it later?',
          answers: ['optional'],
          explanation:
            '`optional` gives the font a very brief window and otherwise commits to the fallback for that page view. It is the choice when layout stability matters more than the exact typeface.',
        },
        {
          id: 'quiz-css-s51-q4',
          type: 'multiple-choice',
          prompt: 'Why does `swap` sometimes make the whole page jump when the web font arrives?',
          options: [
            'The browser reflows because the fallback and the web font have different metrics',
            '`swap` forces a reload once the font is cached',
            'The font file is decoded twice',
            'Only the first paragraph ever uses the custom font',
          ],
          answer: 0,
          explanation:
            'Line boxes are sized by the font in use at render time. When a wider or narrower face replaces the fallback, the height and wrapping of every line change, so everything below shifts. Matching the fallback metrics with `size-adjust` and the `ascent`/`descent` overrides removes most of the jump.',
        },
        {
          id: 'quiz-css-s51-q5',
          type: 'identify-error',
          prompt: 'What is the mistake in this declaration?',
          code: `@font-face {
  font-family: Course Sans;
  src: url("/fonts/course-sans.woff2");
  font-weight: 400;
}`,
          options: [
            '`font-weight` cannot be set on a face',
            'A multi-word `font-family` must be quoted, otherwise it is read as several separate family names',
            '`src` needs a `format()` function',
            'The file path has to be absolute from the site root without a leading slash',
          ],
          answer: 1,
          explanation:
            'An unquoted `Course Sans` is parsed as two family names, `Course` and `Sans`. The face then registers under the wrong name and nothing that references `Course Sans` will match. The same trap applies to any family name with a space.',
        },
      ],
    },
  },
  {
    id: 'css-s52',
    title: 'CSS 2D Transforms',
    description: 'Moving, rotating, scaling and skewing a box without touching layout, and why that difference is the entire point.',
    lessons: [
      {
        id: 'css-l91',
        title: 'CSS 2D Transforms',
        description: 'The four 2D transform functions, the origin they work around, and why a transformed element keeps its original space.',
        duration: 8,
        xp: 50,
        objectives: [
          'Apply translate, rotate, scale and skew, and chain several in one declaration',
          'Predict what `transform-origin` changes and when you would move it',
          'Explain why a transformed element still occupies its untransformed space',
          'Replace a margin or width hack with a transform and say why that is better',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l91-b1',
            body: 'A transform changes how a box is *drawn* without changing where the layout thinks it is. That one sentence is the whole idea, and it is the reason transforms behave so differently from the properties they look like they replace.',
          },
          {
            type: 'demo',
            id: 'c-l91-d1',
            title: 'Rotated, but still in its slot',
            body: 'The orange square is rotated 18 degrees. Watch the dashed outline behind it: that is the space the layout reserved, and it has not moved or changed size at all. The teal square is shifted with `translate`, and its reserved slot stays exactly where it was too. Only the painting changed.',
            html: `<div class="row">
  <div class="box">rotate(18deg)</div>
  <div class="box ghost rotate">rotate(18deg)</div>
  <div class="box shift">translate(26px, 12px)</div>
  <div class="box ghost shift">translate(26px, 12px)</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 2.25rem;
  padding: 1.1rem;
  background: #141922;
  font: 11px/1.4 ui-monospace, monospace;
  color: #9aa5b4;
}
.box {
  width: 78px;
  height: 78px;
  background: #1d2531;
  border: 1px solid #2a3441;
  display: grid;
  place-items: center;
  text-align: center;
}
.rotate {
  background: #f0883e;
  border-color: #f0883e;
  color: #141922;
  transform: rotate(18deg);
}
.shift {
  background: #29e2bd;
  border-color: #29e2bd;
  color: #141922;
  transform: translate(26px, 12px);
}
.ghost {
  background: transparent;
  border: 1px dashed #5b6472;
  color: #5b6472;
}`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l91-h1',
            level: 3,
            body: 'The four functions',
          },
          {
            type: 'code',
            id: 'c-l91-c1',
            language: 'css',
            title: '2D transforms and their defaults',
            code: `transform: translate(40px, -20px);   /* x, then y; one value means x only */
transform: rotate(45deg);          /* clockwise, origin at the centre by default */
transform: scale(1.4);             /* one value scales both axes; scale(2, 0.5) is not */
transform: skewX(-12deg);          /* slants the box without moving it */

/* several at once, applied left to right, all around one origin */
transform: translate(-50%, -50%) rotate(45deg) scale(1.2);`,
          },
          {
            type: 'list',
            id: 'c-l91-l1',
            style: 'bullet',
            items: [
              '**`translate()`** takes lengths or percentages, x first then y. A single value is x, with y at zero. Negative values move the other way. Percentages resolve against the element\'s own size, which makes `translate(-50%, -50%)` the standard way to centre something on top of another.',
              '**`rotate()`** takes an angle in `deg`, `rad`, `grad` or `turn`. Positive is clockwise, because the y axis points down.',
              '**`scale()`** takes a number or two. A single number scales both axes; `scale(2, 0.5)` widens and squashes. It scales *from the origin*, so scaling one axis on its own distorts whatever is inside the box, text included.',
              '**`skew()`** shifts the top edge sideways without moving the bottom, which is how you fake italic. Use it only on large display type; on body text the slant breaks legibility.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l91-h2',
            level: 3,
            body: 'transform-origin decides the pivot',
          },
          {
            type: 'text',
            id: 'c-l91-b2',
            body: 'Every transform happens around a point, and that point defaults to the centre of the element. Move it and the same rotation looks like a different animation: rotate around the bottom and a card swings open like a door; rotate around the centre and it just turns in place.',
          },
          {
            type: 'list',
            id: 'c-l91-l2',
            style: 'bullet',
            items: [
              '`transform-origin: bottom left;` plus `rotate(180deg)` is how you flip an element without `scaleY(-1)` and its inverted-text problem.',
              '`transform-origin: top left;` turns `rotate(45deg)` into the hinge effect used by expanders and accordions.',
              'The value can be a length from the top-left, a percentage, or any mix. `transform-origin: 100% 100%` is the bottom-right corner.',
              'Changing `transform-origin` does not change the box position, so it is free to animate.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l91-w1',
            title: 'A transform is not layout',
            body: 'Transformed elements still occupy their original box, so siblings do not move out of the way and the document does not get longer. That is what you want for a hover nudge, and exactly what you do not want when you were trying to make room. If content below needs to move, you need a real layout property such as `margin`, `gap` or a grid track. The most common symptom of getting this wrong is an overlap.',
          },
          {
            type: 'tip',
            id: 'c-l91-t1',
            title: 'Transforms are cheap, but not free',
            body: '`transform` can usually be handled by the compositor without a repaint, which is why it is the right property for hover and drag work. It still creates a new stacking context and can promote the element to its own layer, so animating hundreds of them at once will cost memory. Animating `top`, `left`, `width` or `box-shadow` instead forces layout or paint on every frame.',
          },
          {
            type: 'exercise',
            id: 'c-l91-x1',
            exercise: {
              id: 'ex-l91',
              instructions:
                'Rotate the badge by 12 degrees around its top-left corner, and push the panel 18 pixels to the right with a transform rather than a margin.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="panel">\n  <span class="badge">New</span>\n  <p>Body copy sits in the panel.</p>\n</div>',
                css: '.panel {\n  position: relative;\n  width: 220px;\n  padding: 1rem;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n}\n.badge {\n  display: inline-block;\n  padding: 0.2rem 0.5rem;\n  background: #29e2bd;\n  color: #141922;\n  font-size: 12px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l91-t1',
                  label: 'The badge is rotated 12 degrees',
                  body: 'return getComputedStyle(document.querySelector(".badge")).transform !== "none" && getComputedStyle(document.querySelector(".badge")).transform.includes("matrix")',
                },
                {
                  id: 'ex-l91-t2',
                  label: 'The rotation is around the top-left corner',
                  body: 'return getComputedStyle(document.querySelector(".badge")).transformOrigin.replace(/\\s+/g, " ").startsWith("0px 0px") || getComputedStyle(document.querySelector(".badge")).transformOrigin.replace(/\\s+/g, " ").startsWith("0% 0%")',
                },
                {
                  id: 'ex-l91-t3',
                  label: 'The panel is moved with translate, not margin',
                  body: 'const p = getComputedStyle(document.querySelector(".panel")); return p.transform.includes("matrix") && p.marginLeft === "0px"',
                },
                {
                  id: 'ex-l91-t4',
                  label: 'The panel moved about 18 pixels right of where it started',
                  body: 'const p = getComputedStyle(document.querySelector(".panel")); const m = p.transform.match(/matrix\\(1, 0, 0, 1, ([-\\d.]+)/); return m ? Math.abs(Number(m[1]) - 18) < 1 : false',
                },
              ],
              hints: [
                'Both changes go on different elements: the rotation on `.badge`, the shift on `.panel`.',
                'A percentage origin resolves against the element\'s own box, so `0 0` and `0% 0%` are the same top-left corner.',
                'A transform computes to a `matrix(...)`, so assert on that string rather than on `rotate`.',
              ],
              solution: {
                html: '<div class="panel">\n  <span class="badge">New</span>\n  <p>Body copy sits in the panel.</p>\n</div>',
                css: '.panel {\n  position: relative;\n  width: 220px;\n  padding: 1rem;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n  transform: translate(18px, 0);\n}\n.badge {\n  display: inline-block;\n  padding: 0.2rem 0.5rem;\n  background: #29e2bd;\n  color: #141922;\n  font-size: 12px;\n  transform-origin: top left;\n  transform: rotate(12deg);\n}\n',
              },
              testNotes:
                'The computed `transform` is always a `matrix(...)`, and the x translation is the fifth value, so the last test reads it back out and checks it is within a pixel of 18. `transform-origin` resolves percentages to lengths against the box, so both `0 0` and `0% 0%` compute to `0px 0px` and either is accepted.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s52',
      title: 'CSS 2D Transforms quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s52-q1',
          type: 'multiple-choice',
          prompt: 'An element is `position: absolute` with `top: 0; left: 0` and you add `transform: translate(-50%, -50%)`. What does that centre it on?',
          options: [
            'The centre of its own containing block',
            'The centre of the viewport',
            'Its own top-left corner',
            'The centre of its nearest positioned ancestor\'s padding box',
          ],
          answer: 0,
          explanation:
            'Percentages in `translate` resolve against the element\'s own size, so this pulls it up and left by half its width and height from its own top-left, which lands it in the middle of wherever it was placed. Pair it with `left: 50%; top: 50%` to centre on the containing block.',
        },
        {
          id: 'quiz-css-s52-q2',
          type: 'true-false',
          prompt: 'Rotating an element with a transform makes the space it occupies in the layout grow to match its new shape.',
          answer: false,
          explanation:
            'Layout keeps the original, untransformed box. That is why a rotated card can overlap its neighbours and why a transform cannot be used to make room. Anything that needs to affect layout must use a real layout property.',
        },
        {
          id: 'quiz-css-s52-q3',
          type: 'blank',
          prompt: 'Which property decides the point a transform rotates and scales around?',
          answers: ['transform-origin'],
          explanation:
            '`transform-origin` sets the pivot and defaults to the centre of the box. Setting it to a corner turns the same `rotate()` into a hinge or a door-swing, which is the whole trick behind many accordion and expander animations.',
        },
        {
          id: 'quiz-css-s52-q4',
          type: 'multiple-choice',
          prompt: 'Which is the correct way to make an element a little wider without disturbing what is inside it?',
          options: [
            '`transform: scaleX(1.2)`, because scaling an axis does not move it',
            '`transform: scaleX(1.2)`, because scaling happens from the transform origin',
            '`width: 120%`, because transforms cannot change width',
            '`skewX(1.2)`, which is the horizontal scale function',
          ],
          answer: 1,
          explanation:
            'Scale happens around the origin, so `scaleX` widens the box symmetrically about that point and the content inside is stretched along with it. If you need the content to stay undistorted while only the frame changes, you need a real layout property such as `width`, not a transform.',
        },
        {
          id: 'quiz-css-s52-q5',
          type: 'identify-error',
          prompt: 'This is meant to centre a badge on the top-right corner of a card. What is wrong?',
          code: `.badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}`,
          options: [
            'Percentages in `translate` are not allowed',
            'The sign is inverted, so it moves away from the corner it should sit on',
            '`right: 0` cannot be combined with `top`',
            'A transform needs a `transform-origin` to be applied',
          ],
          answer: 1,
          explanation:
            'With `top: 0; right: 0` the box\'s top-right corner is already at the corner, so it needs to move right and up by half its own size: `translate(50%, -50%)` would send it outward and down. As written the badge hangs off the card and below the top edge.',
        },
      ],
    },
  },
  {
    id: 'css-s53',
    title: 'CSS 3D Transforms',
    description: 'Giving a page depth: perspective, preserve-3d, rotation on all three axes, and hiding the faces you turned away from.',
    lessons: [
      {
        id: 'css-l92',
        title: 'CSS 3D Transforms',
        description: 'Perspective, preserve-3d, the three axis rotations, translateZ and backface-visibility.',
        duration: 9,
        xp: 55,
        objectives: [
          'Apply perspective to a parent so its children appear to recede',
          'Explain what transform-style: preserve-3d changes and when it is needed',
          'Rotate on the x, y and z axes and predict which way each one turns',
          'Use backface-visibility to hide a face once it has rotated out of view',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l92-b1',
            body: 'CSS 3D transforms are not a separate system from 2D ones. They are the same four functions plus three more axes, and they all share one prerequisite: something has to describe where the viewer is standing. That thing is `perspective`, and without it a 3D rotation collapses to a flat squashed shape.',
          },
          {
            type: 'demo',
            id: 'c-l92-d1',
            title: 'With perspective, and without',
            body: 'The left card has `perspective: 800px` on its wrapper, so the two panels inside sit at real depths and you can see the side face of the card. The right card has an identical `rotateY(35deg)` but no perspective anywhere, so it collapses into a flat trapezoid. Same transform, completely different result.',
            html: `<div class="stage">
  <div class="wrap">
    <div class="scene">
      <div class="face front">front</div>
      <div class="face back">back</div>
    </div>
    <p>perspective: 800px</p>
  </div>
  <div class="wrap flat">
    <div class="scene">
      <div class="face front">front</div>
      <div class="face back">back</div>
    </div>
    <p>no perspective</p>
  </div>
</div>`,
            css: `.stage {
  display: flex;
  gap: 2.5rem;
  padding: 1rem;
  background: #141922;
  font: 11px/1.5 ui-monospace, monospace;
  color: #9aa5b4;
}
.wrap {
  perspective: 800px;
  text-align: center;
}
.scene {
  position: relative;
  width: 150px;
  height: 100px;
  transform-style: preserve-3d;
  transform: rotateY(35deg);
}
.face {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  border: 1px solid #2a3441;
  background: #1d2531;
  color: #e8edf4;
  font-size: 13px;
  backface-visibility: hidden;
}
.back {
  background: #29e2bd;
  color: #141922;
  transform: rotateY(180deg);
}
.flat .scene {
  transform-style: flat;
}
.flat .back {
  display: none;
}`,
            height: 210,
          },
          {
            type: 'heading',
            id: 'c-l92-h1',
            level: 3,
            body: 'Perspective and preserve-3d do different jobs',
          },
          {
            type: 'text',
            id: 'c-l92-b2',
            body: 'These two are constantly confused. `perspective` says how far the viewer is, and it belongs on the *parent* of the thing being rotated. `transform-style: preserve-3d` says that an element\'s own children should keep their depth relative to it instead of being flattened onto its plane. You need both for a stack of rotating panels.',
          },
          {
            type: 'code',
            id: 'c-l92-c1',
            language: 'css',
            title: 'The two forms of perspective',
            code: `/* on the parent: every child shares one vanishing point */
.stage {
  perspective: 800px;
}

/* on the element itself: convenient for a one-off rotation */
.card {
  transform: perspective(800px) rotateY(35deg);
}

/* keep children in 3D instead of painting them flat onto the parent */
.card {
  transform-style: preserve-3d;
}

/* stop drawing a face once it points away from the viewer */
.face {
  backface-visibility: hidden;
}`,
          },
          {
            type: 'list',
            id: 'c-l92-l1',
            style: 'bullet',
            items: [
              '**`perspective`** takes a distance in any length unit. Smaller means a stronger effect and more extreme distortion at the edges; `none` (the default) means no perspective at all. `perspective-origin` sets where that viewer stands, and defaults to the centre of the element.',
              '**`rotateY`** turns around the vertical axis, so the element swings left and right like a door. **`rotateX`** turns around the horizontal axis, tipping it forward and back. **`rotateZ`** spins in the plane and is identical to 2D `rotate()`.',
              '**`translateZ`** moves an element toward or away from the viewer, and under a perspective it changes how large it appears. This is how a layered "cover" effect is built: same-size layers at different Z positions.',
              '**`backface-visibility: hidden`** skips painting an element when it faces away. Leave it visible and a flipped card shows a mirrored copy of its front, which is almost never what anyone wanted.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l92-w1',
            title: 'A missing preserve-3d is the usual cause of a "broken" 3D scene',
            body: 'By default `transform-style` is `flat`, meaning children are projected onto the parent\'s plane before being painted. Add depth to the children and nothing appears to happen, or the layers collapse. The companion rule is that `overflow` other than `visible` on an ancestor also flattens the subtree, so a `3D` card inside a scrolling or clipping container will lose its depth.',
          },
          {
            type: 'tip',
            id: 'c-l92-t1',
            title: 'Keep 3D honest, or do not use it',
            body: 'If an element is rotated away from the viewer it should be hidden, not left as a smeared sliver, so pair every rotation with `backface-visibility`. And 3D is a garnish: it reads as decorative, it costs a new compositing layer per element, and it is genuinely unpleasant for some people with vestibular disorders. Reserve it for a card flip or a subtle depth cue rather than putting the whole interface in a tilting cube.',
          },
          {
            type: 'exercise',
            id: 'c-l92-x1',
            exercise: {
              id: 'ex-l92',
              instructions:
                'Give `.stage` a `perspective` of 700px, rotate `.card` 30 degrees around the vertical axis, keep its children in 3D with `preserve-3d`, and hide the back face.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="stage">\n  <div class="card">\n    <div class="face">front</div>\n    <div class="face back">back</div>\n  </div>\n</div>',
                css: '.stage {\n  padding: 1.5rem;\n  background: #141922;\n}\n.card {\n  position: relative;\n  width: 160px;\n  height: 110px;\n}\n.face {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n  font-size: 13px;\n}\n.back {\n  background: #29e2bd;\n  color: #141922;\n  transform: rotateY(180deg);\n}\n',
              },
              tests: [
                {
                  id: 'ex-l92-t1',
                  label: 'The stage supplies a perspective of 700px',
                  body: 'return getComputedStyle(document.querySelector(".stage")).perspective === "700px"',
                },
                {
                  id: 'ex-l92-t2',
                  label: 'The card is rotated around the vertical axis',
                  body: 'return getComputedStyle(document.querySelector(".card")).transform.includes("matrix3d")',
                },
                {
                  id: 'ex-l92-t3',
                  label: 'The card keeps its children in 3D',
                  body: 'return getComputedStyle(document.querySelector(".card")).transformStyle === "preserve-3d"',
                },
                {
                  id: 'ex-l92-t4',
                  label: 'Faces pointing away are not painted',
                  body: 'return Array.from(document.querySelectorAll(".face")).every((f) => getComputedStyle(f).backfaceVisibility === "hidden")',
                },
              ],
              hints: [
                'Perspective goes on `.stage`, the parent. The rotation and `preserve-3d` go on `.card`.',
                'A 3D transform computes to `matrix3d(...)` rather than `matrix(...)`, so assert on that.',
                '`backface-visibility` belongs on the faces themselves, not on the card.',
              ],
              solution: {
                html: '<div class="stage">\n  <div class="card">\n    <div class="face">front</div>\n    <div class="face back">back</div>\n  </div>\n</div>',
                css: '.stage {\n  padding: 1.5rem;\n  background: #141922;\n  perspective: 700px;\n}\n.card {\n  position: relative;\n  width: 160px;\n  height: 110px;\n  transform: rotateY(30deg);\n  transform-style: preserve-3d;\n}\n.face {\n  position: absolute;\n  inset: 0;\n  display: grid;\n  place-items: center;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n  font-size: 13px;\n  backface-visibility: hidden;\n}\n.back {\n  background: #29e2bd;\n  color: #141922;\n  transform: rotateY(180deg);\n}\n',
              },
              testNotes:
                'Any transform involving a Z component computes to `matrix3d(...)`, which is how the second test recognises a genuine 3D rotation. `perspective` and `transformStyle` are not resolved to a matrix, so they compare directly against the values you asked for.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s53',
      title: 'CSS 3D Transforms quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s53-q1',
          type: 'multiple-choice',
          prompt: 'A child is rotated on the Y axis but appears completely flat, with no sense of depth. Which declaration is most likely missing from the parent?',
          options: [
            '`perspective`',
            '`transform-style: preserve-3d`',
            '`backface-visibility: hidden`',
            '`perspective-origin: center`',
          ],
          answer: 1,
          explanation:
            '`perspective` only affects the element it is set on. Without `transform-style: preserve-3d` on the parent, its children are flattened onto the parent\'s plane before painting, so their own 3D position is thrown away.',
        },
        {
          id: 'quiz-css-s53-q2',
          type: 'true-false',
          prompt: 'An element with `perspective: 500px` and no transform of its own still looks different from one with no perspective at all.',
          answer: false,
          explanation:
            'Perspective only changes how a 3D transformation is projected. With no transform there is nothing to project, so the box is drawn as an ordinary rectangle either way.',
        },
        {
          id: 'quiz-css-s53-q3',
          type: 'blank',
          prompt: 'Which property hides an element once it has been rotated so that it faces away from the viewer?',
          answers: ['backface-visibility'],
          explanation:
            '`backface-visibility: hidden` skips painting the element when its back is toward the viewer. Without it, a card flipped with `rotateY(180deg)` shows a mirrored copy of its own front instead of nothing.',
        },
        {
          id: 'quiz-css-s53-q4',
          type: 'multiple-choice',
          prompt: 'How does `rotateY()` move an element compared with `rotateX()`?',
          options: [
            '`rotateY` tips it forward and back; `rotateX` swings it left and right',
            '`rotateY` swings it left and right; `rotateX` tips it forward and back',
            'They are identical, differing only in axis order',
            '`rotateY` moves it along the Z axis; `rotateX` moves it along the Y axis',
          ],
          answer: 1,
          explanation:
            'Rotation happens around an axis, named for the axis that stays still. `rotateY` leaves the vertical axis fixed and swings the element left and right like a door; `rotateX` leaves the horizontal axis fixed and tips it toward or away from you.',
        },
        {
          id: 'quiz-css-s53-q5',
          type: 'identify-error',
          prompt: 'This card flip has no visible effect. What is the mistake?',
          code: `.stage {
  overflow: hidden;
}

.card {
  transform: rotateY(180deg);
}

.face {
  backface-visibility: hidden;
}`,
          options: [
            '`backface-visibility` has to be set on the card, not on the faces',
            '`overflow: hidden` on the ancestor flattens the 3D subtree, so the depth never renders',
            'A rotation needs `transform-style: flat` to be visible',
            'The rotation angle must be a `px` value',
          ],
          answer: 1,
          explanation:
            'An ancestor whose `overflow` is anything other than `visible` forces the subtree to be flattened, which cancels the 3D effect no matter what the card declares. Move the clipping inside the card, or drop it and clip the faces individually.',
        },
      ],
    },
  },
  {
    id: 'css-s54',
    title: 'CSS Transitions',
    description: 'Interpolating between two states when one changes: which properties can move, how long it should take, and why transition: all is a trap.',
    lessons: [
      {
        id: 'css-l93',
        title: 'CSS Transitions',
        description: 'Animating a property change: duration, timing function, delay, and the state change a transition needs in order to fire.',
        duration: 9,
        xp: 55,
        objectives: [
          'Write a transition with property, duration, timing function and delay',
          'Predict which properties are animatable and which snap',
          'Choose a timing function for the effect you want rather than the default',
          'Explain why a transition needs two states and never fires on page load',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l93-b1',
            body: 'A transition is not an animation you start. It is an instruction about how to get from one computed value to another, and it only does anything when the value changes. That is why a transition declared on `:hover` does nothing until the pointer arrives.',
          },
          {
            type: 'demo',
            id: 'c-l93-d1',
            title: 'The same change, four timing functions',
            body: 'Hover each swatch to move it across the track. The top one has no `transition` at all, so it jumps. The other three arrive over the same duration but feel different, because the easing curve decides whether the movement starts fast, ends fast, or overshoots and settles. This is the single highest-leverage knob in any CSS animation.',
            html: `<div class="stack">
  <div class="track"><span class="chip none">none</span></div>
  <div class="track"><span class="chip ease">ease</span></div>
  <div class="track"><span class="chip ease-in-out">ease-in-out</span></div>
  <div class="track"><span class="chip spring">cubic-bezier(.34,1.56,.64,1)</span></div>
</div>`,
            css: `.stack {
  padding: 1rem;
  background: #141922;
  font: 11px/1.4 ui-monospace, monospace;
}
.track {
  position: relative;
  height: 38px;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  background: #1d2531;
  border: 1px solid #2a3441;
}
.track:hover .chip {
  transform: translateX(210px);
}
.chip {
  position: absolute;
  top: 4px;
  left: 4px;
  display: grid;
  place-items: center;
  width: 128px;
  height: 28px;
  border-radius: 4px;
  background: #29e2bd;
  color: #141922;
  font-size: 11px;
}
.none { transition: none; }
.ease { transition: transform 0.45s ease; }
.ease-in-out { transition: transform 0.45s ease-in-out; }
.spring { transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }`,
            height: 210,
          },
          {
            type: 'heading',
            id: 'c-l93-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l93-c1',
            language: 'css',
            title: 'The long form and the shorthand',
            code: `/* long form, when you want to be explicit */
transition-property: transform;
transition-duration: 300ms;
transition-timing-function: ease-out;
transition-delay: 50ms;

/* shorthand: property, duration, timing function, delay - in that order */
transition: transform 300ms ease-out 50ms;

/* several properties, each with its own settings */
transition: transform 200ms ease-out, opacity 400ms linear 100ms;`,
          },
          {
            type: 'list',
            id: 'c-l93-l1',
            style: 'bullet',
            items: [
              '**`transition-property`** takes property names or a keyword. `all` means every property that can be animated, which is convenient and dangerous in equal measure.',
              '**`transition-duration`** defaults to `0s`, and a zero duration means no transition at all. That default is why adding a transition to an element can look like it did nothing.',
              '**`transition-timing-function`** defaults to `ease`, a gentle start-and-stop curve. `linear` is correct for anything continuous like a spinner; `ease-out` is usually the best choice for UI feedback because it responds immediately and settles.',
              '**`transition-delay`** defaults to `0s`. A short stagger between a list of items appearing is the cheapest polish in CSS.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l93-h2',
            level: 3,
            body: 'What can actually move',
          },
          {
            type: 'text',
            id: 'c-l93-b2',
            body: 'Transitions interpolate between two *computable* values. A property qualifies only if the browser can work out a number for every point in between, which is why colours, lengths and transforms all work and almost nothing else does.',
          },
          {
            type: 'list',
            id: 'c-l93-l2',
            style: 'bullet',
            items: [
              '**Animatable:** `color`, `background-color`, `opacity`, `width`, `height`, `padding`, `margin`, `border-radius`, `transform`, `box-shadow`, `filter`, `transform-origin`.',
              '**Not animatable:** anything from `display` to `grid` or `flex` (they are keywords, not numbers), `visibility`, and `position`. `display` snaps between values, which is why you cannot cross-fade a flex container into a block container.',
              '**Unit-mismatched values will not interpolate.** `width: 0` to `width: 100%` does work because both resolve to pixels. A transition from a keyword such as `auto` to a length has no start value to interpolate from, so it snaps.',
              '**Discrete properties** such as `pointer-events` do change, but instantly, somewhere in the middle of the duration rather than smoothly.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l93-w1',
            title: 'Never write transition: all in production',
            body: '`transition: all 0.3s` looks tidy and is one of the most common causes of sluggish pages. It animates anything that later changes, including properties you never intended to move, and it will happily animate a layout-triggering property like `width`, forcing a reflow on every frame. Name your properties. If you genuinely do not know what will change, that is a sign something else is going on.',
          },
          {
            type: 'tip',
            id: 'c-l93-t1',
            title: 'Transitions need two states, and the second one must be reachable',
            body: 'A transition declared in the base rule animates whenever the element moves into the `:hover`, `:focus`, `.active` or `:checked` state, because that rule already applies. Declaring the identical transition only inside `:hover` will not animate on hover: the transition property itself is changing at the same moment as the value, so there is nothing to interpolate from. Put it on the base rule.',
          },
          {
            type: 'exercise',
            id: 'c-l93-x1',
            exercise: {
              id: 'ex-l93',
              instructions:
                'Give the panel a 0.3 second transition on `transform` using `ease-out`, and a 0.2 second transition on `background-color` using `linear`. On hover it should lift by 6 pixels.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="panel">Hover me</div>',
                css: '.panel {\n  width: 180px;\n  padding: 1rem;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n  cursor: pointer;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l93-t1',
                  label: 'The transform transition is 0.3s with ease-out',
                  body: 'const s = getComputedStyle(document.querySelector(".panel")); return s.transitionProperty.includes("transform") && s.transitionDuration.includes("0.3s") && s.transitionTimingFunction.includes("ease-out")',
                },
                {
                  id: 'ex-l93-t2',
                  label: 'The background-color transition is 0.2s with linear',
                  body: 'const s = getComputedStyle(document.querySelector(".panel")); return s.transitionProperty.includes("background-color") && s.transitionDuration.includes("0.2s") && s.transitionTimingFunction.includes("linear")',
                },
                {
                  id: 'ex-l93-t3',
                  label: 'Both properties are listed, not just transform',
                  body: 'return getComputedStyle(document.querySelector(".panel")).transitionProperty.split(",").length >= 2',
                },
                {
                  id: 'ex-l93-t4',
                  label: 'The hover state lifts the panel by 6 pixels',
                  body: 'const style = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch (e) { return [] } }).find((r) => r.selectorText && r.selectorText.includes(":hover") && r.style && r.style.transform); return style ? style.style.transform.includes("6px") : false',
                },
              ],
              hints: [
                'Put the transition on the base `.panel` rule, not inside `:hover`.',
                'Two properties means one declaration with a comma, and each half carries its own duration and easing.',
                'The last test reads the `:hover` rule directly, because the lift only applies while hovering.',
              ],
              solution: {
                html: '<div class="panel">Hover me</div>',
                css: '.panel {\n  width: 180px;\n  padding: 1rem;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  color: #e8edf4;\n  cursor: pointer;\n  transition: transform 0.3s ease-out, background-color 0.2s linear;\n}\n.panel:hover {\n  transform: translateY(-6px);\n}\n',
              },
              testNotes:
                '`transition-property`, `transition-duration` and `transition-timing-function` all compute to comma-separated lists that line up by index, so the first two tests confirm each property is paired with the right duration and curve. The hover rule is checked by walking the stylesheet because its transform is not computed while the pointer is elsewhere.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s54',
      title: 'CSS Transitions quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s54-q1',
          type: 'multiple-choice',
          prompt: 'A button has `transition: color 0.3s ease` on its base rule and changes colour on `:hover`. When the pointer arrives, the colour changes instantly. What is wrong?',
          options: [
            'Nothing, that is how transitions work',
            'A transition must also be declared inside the `:hover` rule',
            '`transition` was misspelled',
            'The element needs `display: inline-block` to animate',
          ],
          answer: 0,
          explanation:
            'This is correct behaviour. A transition interpolates between two *computed* values, and it cannot animate from "no colour" to a colour. Declare the base colour explicitly, as the reset already does here, and only the `:hover` value differs.',
        },
        {
          id: 'quiz-css-s54-q2',
          type: 'true-false',
          prompt: '`display` can be transitioned smoothly from `flex` to `block` with a 0.3 second duration.',
          answer: false,
          explanation:
            '`display` is a keyword rather than a computable number, so there is nothing to interpolate. The browser swaps it at the end of the duration instead of fading. Use opacity or the `@starting-style` and `transition-behavior: allow-discrete` pairing when you need a real fade on a discrete property.',
        },
        {
          id: 'quiz-css-s54-q3',
          type: 'blank',
          prompt: 'Which timing function is the better default for interface feedback, because the change starts immediately and then settles?',
          answers: ['ease-out', 'easeout'],
          explanation:
            '`ease-out` front-loads the movement, so the interface feels like it responded at once and then comes to rest. The default `ease` is symmetrical and feels slightly sluggish at the start.',
        },
        {
          id: 'quiz-css-s54-q4',
          type: 'multiple-choice',
          prompt: 'What is the practical problem with `transition: all 0.3s`?',
          options: [
            'It is a syntax error and is ignored',
            'It also animates properties you did not intend, including ones that force layout on every frame',
            'It only works on transform and opacity',
            'It disables transitions on child elements',
          ],
          answer: 1,
          explanation:
            '`all` covers every animatable property, so a later change to `width`, `height` or `margin` gets animated too, forcing a reflow per frame. Naming the properties you mean is faster and predictable.',
        },
        {
          id: 'quiz-css-s54-q5',
          type: 'identify-error',
          prompt: 'The colour is meant to ease in over 300ms, but it snaps. What is the error?',
          code: `.badge {
  background: #1d2531;
}

.badge:hover {
  background: #29e2bd;
  transition: background 300ms ease;
}`,
          options: [
            '`background` is not animatable, so use `background-color`',
            'The duration should be written in seconds',
            'The transition has to be declared before the hover rule',
            'Hover does not trigger transitions on backgrounds',
          ],
          answer: 0,
          explanation:
            'Two things are wrong, but the first is the reason it snaps: `background` is a shorthand, and the transition is watching the shorthand rather than a specific longhand, which browsers handle inconsistently. Transition `background-color` and declare it on the base rule as well as in the hover state.',
        },
      ],
    },
  },
  {
    id: 'css-s55',
    title: 'CSS Animations',
    description: 'Keyframes that run without a state change: naming, timing, iteration, direction, fill mode, and how to stop moving things for people who asked you to.',
    lessons: [
      {
        id: 'css-l94',
        title: 'CSS Animations',
        description: 'Writing @keyframes, controlling them with the animation properties, and honouring prefers-reduced-motion.',
        duration: 10,
        xp: 60,
        objectives: [
          'Write an @keyframes block with from, to and percentage stops',
          'Use animation-name, duration, timing-function, iteration-count, direction, fill-mode and play-state',
          'Say when a keyframe animation is the right tool instead of a transition',
          'Add a prefers-reduced-motion fallback for any movement you have authored',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l94-b1',
            body: 'A transition animates a change between two states that something else causes. A keyframe animation animates over time on its own, which means it can loop, run backwards, hold its end value, and have several things happening in one element at once. If the motion has a start and an end and nothing else triggers it, you want an animation.',
          },
          {
            type: 'demo',
            id: 'c-l94-d1',
            title: 'The same box, four animation behaviours',
            body: 'Each of these is one `@keyframes` rule. The first pulses twice and stops at its starting state. The second uses `alternate` with `infinite`, so it reverses on every pass instead of snapping back. The third fills forwards, so it holds the colour it ended on. The fourth pauses and resumes on hover, which is what `animation-play-state` is for.',
            html: `<div class="row">
  <div class="box a"><span>2 iterations</span></div>
  <div class="box b"><span>infinite alternate</span></div>
  <div class="box c"><span>fill: forwards</span></div>
  <div class="box d"><span>pause on hover</span></div>
</div>`,
            css: `.row {
  display: flex;
  gap: 1.1rem;
  padding: 1.1rem;
  background: #141922;
  font: 10px/1.4 ui-monospace, monospace;
  color: #141922;
}
.box {
  display: grid;
  place-items: center;
  width: 96px;
  height: 72px;
  border-radius: 6px;
  font-size: 10px;
  text-align: center;
  animation-duration: 1.6s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.a {
  background: #29e2bd;
  animation-name: pulse;
  animation-iteration-count: 2;
}
.b {
  background: #1f6feb;
  color: #e8edf4;
  animation-name: pulse;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
.c {
  background: #f0883e;
  animation-name: hold;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}
.d {
  background: #9aa5b4;
  animation-name: pulse;
  animation-play-state: paused;
}
.d:hover {
  animation-play-state: running;
}

@keyframes pulse {
  from { transform: scale(1); opacity: 0.55; }
  to   { transform: scale(1.16); opacity: 1; }
}

@keyframes hold {
  from { background: #f0883e; }
  to   { background: #29e2bd; }
}`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'c-l94-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'text',
            id: 'c-l94-b2',
            body: '`@keyframes` defines named blocks of styles. The browser interpolates between the stops you give it, and `animation-name` on an element picks one up. Percentages divide the duration evenly; `0%` and `100%` are the ends and `50%` is halfway through.',
          },
          {
            type: 'code',
            id: 'c-l94-c1',
            language: 'css',
            title: 'Defining and attaching a keyframe animation',
            code: `@keyframes drift {
  0%   { transform: translateX(0); }
  50%  { transform: translateX(12px); }
  100% { transform: translateX(0); }
}

.box {
  animation-name: drift;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  /* shorthand, in this order */
  animation: drift 2s ease-in-out infinite alternate;
}`,
          },
          {
            type: 'list',
            id: 'c-l94-l1',
            style: 'bullet',
            items: [
              '**`animation-name`** names the `@keyframes` rule. Without it nothing runs, which is the animation equivalent of forgetting to reference your `@font-face`.',
              '**`animation-duration`** defaults to `0s`, so a declared animation with no duration completes instantly and looks like it did nothing. Always set it.',
              '**`animation-iteration-count`** takes a number or `infinite`. `infinite` runs forever, so anything non-essential and looping must be paired with reduced-motion handling.',
              '**`animation-direction`** is `normal`, `reverse`, `alternate` or `alternate-reverse`. `alternate` plays each iteration the other way round, which is what makes a pulse feel smooth instead of snapping back.',
              '**`animation-fill-mode`** decides what happens outside the animation\'s active period. `forwards` holds the last keyframe, `backwards` applies the first during any delay, `both` does both, and `none` (the default) does neither.',
              '**`animation-play-state`** is `running` or `paused`, and pausing mid-flight holds the current position rather than restarting. Hover-to-pause is the standard use.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l94-h2',
            level: 3,
            body: 'Animation or transition?',
          },
          {
            type: 'list',
            id: 'c-l94-l2',
            style: 'bullet',
            items: [
              'Use a **transition** when something changes state and you want the change smoothed: hover, focus, a class toggled by a click, a checkbox turning an accordion open.',
              'Use an **animation** when motion happens without a state change: a loading spinner, a skeleton shimmer, a decorative entrance on page load, a looping attention cue.',
              'An animation can be started and stopped by adding or removing a class, so it is not always "on its own". That hybrid is often the cleanest way to trigger an entrance once.',
              'Transitions cannot loop and cannot express three or more stops, which is the quick test: more than two stops means `@keyframes`.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l94-w1',
            title: 'Motion is a medical question, not a taste question',
            body: 'Large, looping or parallax motion triggers nausea and migraines for some people, and the OS exposes a setting for exactly this. Anything that moves more than a few pixels on its own belongs behind a `prefers-reduced-motion` guard. The cleanest pattern is to define the animation twice and let the second definition switch it off, which keeps the media query in one place.',
          },
          {
            type: 'example',
            id: 'c-l94-e1',
            title: 'The reduced-motion guard, in one place',
            body: 'The movement is declared once in a custom property-driven rule, and the media query removes it. Note that the keyframes are left defined; only the animation is switched off, so nothing depends on them being deleted.',
            html: `<div class="card">
  <p class="body">Reduced motion is honoured when the operating system asks for it.</p>
</div>`,
            css: `.card {
  padding: 1rem;
  background: #1d2531;
  border: 1px solid #2a3441;
  color: #e8edf4;
}
.body {
  margin: 0;
  font-size: 14px;
  animation: fade-up 500ms ease-out both;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .body {
    animation: none;
  }
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l94-x1',
            exercise: {
              id: 'ex-l94',
              instructions:
                'Add a `spin` keyframe animation that rotates the dial a full turn over 1.2 seconds. Run it infinitely and linearly, and disable it entirely inside a `prefers-reduced-motion: reduce` query.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="dial">60</div>',
                css: '.dial {\n  display: grid;\n  place-items: center;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: #1d2531;\n  border: 2px solid #29e2bd;\n  color: #e8edf4;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l94-t1',
                  label: 'A keyframes rule named spin exists',
                  body: 'return Array.from(document.styleSheets).some((sheet) => { try { return Array.from(sheet.cssRules).some((r) => r.constructor.name === "CSSKeyframesRule" && r.name === "spin") } catch (e) { return false } })',
                },
                {
                  id: 'ex-l94-t2',
                  label: 'The dial runs spin for 1.2s, infinitely and linearly',
                  body: 'const s = getComputedStyle(document.querySelector(".dial")); return s.animationName === "spin" && s.animationDuration === "1.2s" && s.animationIterationCount === "infinite" && s.animationTimingFunction === "linear"',
                },
                {
                  id: 'ex-l94-t3',
                  label: 'The keyframes cover a full turn',
                  body: 'const rule = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch (e) { return [] } }).find((r) => r.constructor.name === "CSSKeyframesRule" && r.name === "spin"); return rule ? Array.from(rule.cssRules).some((k) => (k.style.transform || "").replace(/\\s+/g, "").includes("360deg")) : false',
                },
                {
                  id: 'ex-l94-t4',
                  label: 'A prefers-reduced-motion query turns the animation off',
                  body: 'const rule = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch (e) { return [] } }).find((r) => r.constructor.name === "CSSMediaRule" && (r.conditionText || "").includes("prefers-reduced-motion")); return rule ? Array.from(rule.cssRules).some((r) => r.style && (r.style.animation === "none" || r.style.animationName === "none")) : false',
                },
              ],
              hints: [
                '`@keyframes` lives at the top level of the stylesheet; only the `animation-*` properties go on the element.',
                'A full turn is `rotate(360deg)` at the end and `rotate(0deg)` at the start.',
                'Inside the media query you switch the animation off rather than editing the keyframes.',
              ],
              solution: {
                html: '<div class="dial">60</div>',
                css: '@keyframes spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.dial {\n  display: grid;\n  place-items: center;\n  width: 70px;\n  height: 70px;\n  border-radius: 50%;\n  background: #1d2531;\n  border: 2px solid #29e2bd;\n  color: #e8edf4;\n  animation: spin 1.2s linear infinite;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dial {\n    animation: none;\n  }\n}\n',
              },
              testNotes:
                'Keyframes and media rules are stylesheet rules rather than computed values, so the first, third and fourth tests walk `document.styleSheets` and match on `CSSKeyframesRule` and `CSSMediaRule`. Reading `cssRules` can throw for cross-origin sheets, so each lookup is guarded.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s55',
      title: 'CSS Animations quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s55-q1',
          type: 'multiple-choice',
          prompt: 'An element has `animation-name: pulse` on an element with `animation-duration` never set. What happens?',
          options: [
            'The animation runs once and stops',
            'Nothing visible happens, because the duration defaults to 0s',
            'The browser picks a reasonable default duration',
            'The animation runs infinitely',
          ],
          answer: 1,
          explanation:
            '`animation-duration` defaults to `0s`, so there is no time to interpolate over and the animation completes on the first frame. This is the most common reason a keyframe animation appears not to work.',
        },
        {
          id: 'quiz-css-s55-q2',
          type: 'true-false',
          prompt: '`animation-fill-mode: forwards` keeps the element at the last keyframe after the animation has finished.',
          answer: true,
          explanation:
            '`forwards` applies the final keyframe\'s styles once the active period ends, so the element holds its end state. Use `none` (the default) if you want it to snap back to its own styles when the animation ends.',
        },
        {
          id: 'quiz-css-s55-q3',
          type: 'blank',
          prompt: 'Which `animation-direction` value makes a looping animation play backwards on every second pass, so it does not snap back?',
          answers: ['alternate'],
          explanation:
            '`alternate` reverses direction each iteration, so a pulse eases out and eases back rather than jumping to the start. `reverse` runs every iteration backwards, and `normal` snaps between the two ends.',
        },
        {
          id: 'quiz-css-s55-q4',
          type: 'multiple-choice',
          prompt: 'Which is the correct rule for an infinite decorative loop?',
          options: [
            'Leave it as it is; the browser skips motion for users who asked for reduced motion',
            'Wrap the animation in `@media (prefers-reduced-motion: reduce)` and set `animation: none`',
            'Set `animation-duration: 1ms` instead',
            'Add `pointer-events: none`',
          ],
          answer: 1,
          explanation:
            'Reduced motion is an operating system setting, and CSS exposes it as a media feature. Authoring the animation once and cancelling it inside the query keeps the decision in one place and means every animation in the codebase gets the same treatment.',
        },
        {
          id: 'quiz-css-s55-q5',
          type: 'identify-error',
          prompt: 'This toast is supposed to slide in once and stay. It vanishes instead. Why?',
          code: `@keyframes slide-in {
  from { transform: translateX(-100%); }
  to   { transform: translateX(0); }
}

.toast {
  animation: slide-in 300ms ease-out;
}`,
          options: [
            '`translateX` cannot be used in a keyframe',
            'Without `animation-fill-mode: forwards` the element returns to its own styles once the animation ends, which drops the transform',
            'The duration is too short',
            'Keyframes must be defined after the element that uses them',
          ],
          answer: 1,
          explanation:
            'The default `fill-mode` is `none`, so once the 300ms is over the animation stops contributing styles and the element goes back to whatever its own rules say, with no transform applied. Adding `forwards` keeps it at the last keyframe.',
        },
      ],
    },
  },
  {
    id: 'css-s56',
    title: 'CSS Tooltips',
    description: 'Building a tooltip that works for a mouse, a keyboard and a touch screen, and why the native title attribute is still a legitimate choice.',
    lessons: [
      {
        id: 'css-l95',
        title: 'CSS Tooltips',
        description: 'A positioned tooltip triggered by hover and focus, compared with the native title attribute and the Popover API.',
        duration: 9,
        xp: 55,
        objectives: [
          'Build a tooltip from a positioned wrapper and an absolutely positioned child',
          'Trigger it on focus as well as hover so keyboard users get the same information',
          'Explain what the native title attribute does well and where it falls short',
          'Say when the Popover API is a better foundation than a hover-only rule',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l95-b1',
            body: 'A tooltip is a small piece of text revealed on demand. The CSS version needs three things: something to position against, an absolutely positioned child, and a state change to reveal it. The trap is that almost every tutorial triggers it with `:hover` alone, which quietly makes it unusable for keyboard and touch users.',
          },
          {
            type: 'demo',
            id: 'c-l95-d1',
            title: 'Hover-only, focus-capable, and native',
            body: 'Hover the buttons or tab to them. The first reveals only on hover, so tabbing past it shows nothing. The second uses `:hover, :focus-visible`, so the same information arrives for a keyboard user, with the outline left intact. The third uses the native `title` attribute: it costs nothing to write and the browser supplies the bubble, but it takes a long pause to appear, cannot be styled, and never appears on touch at all.',
            html: `<div class="row">
  <span class="tip">
    <button type="button">hover only</button>
    <span class="bubble">You cannot see this with a keyboard.</span>
  </span>
  <span class="tip">
    <button type="button">hover or focus</button>
    <span class="bubble">Reachable by keyboard, and the outline stays.</span>
  </span>
  <span class="tip">
    <button type="button" title="Supplied by the browser">native title</button>
  </span>
</div>`,
            css: `.row {
  display: flex;
  gap: 1.25rem;
  padding: 3.2rem 1.1rem 1.4rem;
  background: #141922;
  font-size: 13px;
}
.tip {
  position: relative;
  display: inline-block;
}
.tip button {
  padding: 0.4rem 0.7rem;
  border-radius: 5px;
  border: 1px solid #2a3441;
  background: #1d2531;
  color: #e8edf4;
  font: inherit;
}
.tip .bubble {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: 210px;
  padding: 0.4rem 0.6rem;
  border-radius: 5px;
  border: 1px solid #2a3441;
  background: #1d2531;
  color: #e8edf4;
  font-size: 12px;
  line-height: 1.4;
  opacity: 0;
  visibility: hidden;
  transition: opacity 140ms ease-out;
}
.tip:hover .bubble {
  opacity: 1;
  visibility: visible;
}
.tip:focus-within .bubble,
.tip:hover .bubble {
  opacity: 1;
  visibility: visible;
}`,
            height: 200,
          },
          {
            type: 'heading',
            id: 'c-l95-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'list',
            id: 'c-l95-l1',
            style: 'bullet',
            items: [
              '**The wrapper gets `position: relative`.** Without it the absolutely positioned bubble would resolve against some distant ancestor, usually the page, and appear in the wrong place entirely.',
              '**The bubble is `position: absolute`** and placed with `bottom: 100%` to sit above its trigger. Using percentages against the bubble\'s own size is what lets `left: 50%` plus `translateX(-50%)` centre it regardless of width.',
              '**`visibility: hidden` rather than only `opacity: 0`** keeps the bubble out of the tab order and off the accessibility tree while it is closed, and lets `visibility` be transitioned alongside `opacity`.',
              '**`:focus-within` is the practical focus hook.** `:focus-visible` matches the trigger itself, but `:focus-within` matches the wrapper whenever anything inside it has focus, which is what a wrapper-plus-bubble structure needs.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l95-h2',
            level: 3,
            body: 'The three options, honestly',
          },
          {
            type: 'list',
            id: 'c-l95-l2',
            style: 'bullet',
            items: [
              '**`title`** — free, accessible enough, and rendered by the platform. But it appears only after a long hover delay, cannot be styled, is not shown on touch, and its content is unavailable to assistive technology that reads the accessibility tree. Fine for a genuine supplement, poor as your only tooltip.',
              '**CSS and `:hover, :focus-within`** — fully stylable, animatable, and works on touch because a tap counts as hover. Weakness: a tooltip built this way cannot contain interactive content, and content hidden with `visibility: hidden` is unreachable until the trigger is hovered or focused.',
              '**The Popover API** — `popover="auto"` gives you light-dismiss, Escape to close, top-layer stacking above any `overflow: hidden`, and focus handling for free. Trigger it with `popovertarget` and the browser wires up the click. This is the right base for a tooltip that contains a link or a button.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l95-w1',
            title: 'Do not put the tooltip inside the trigger',
            body: 'The bubble must be a sibling, not a child, of the button. Nest it inside and clicking the button also hits the tooltip, which swallows the click; worse, the bubble becomes part of the button\'s accessible name, so a screen reader announces the tooltip text as if it were the button label. Also never hide the focus outline on the trigger to make the design tidier: the outline is the only indicator a keyboard user has that the tooltip is reachable.',
          },
          {
            type: 'tip',
            id: 'c-l95-t1',
            title: 'Position for the edge of the screen',
            body: 'A tooltip centred above its trigger is off-screen near the right or top edge. The robust pattern is to position with logical properties and flip the bubble with a container query or a small class when it would overflow: `@container (max-width: 20rem) { .bubble { left: auto; right: 0; transform: none; } }`. A tooltip that renders off-screen is worse than no tooltip, because the user has been told there is more information.',
          },
          {
            type: 'exercise',
            id: 'c-l95-x1',
            exercise: {
              id: 'ex-l95',
              instructions:
                'Make the hint appear when `.trigger` is hovered **or** has focus within. Keep it hidden with `visibility: hidden` and `opacity: 0` by default, and reveal both to `visible` and `1`.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<span class="wrap">\n  <button type="button" class="trigger">Save</button>\n  <span class="hint">Saved to this device</span>\n</span>',
                css: '.wrap {\n  display: inline-block;\n}\n.trigger {\n  padding: 0.4rem 0.7rem;\n  border-radius: 5px;\n  border: 1px solid #2a3441;\n  background: #1d2531;\n  color: #e8edf4;\n}\n.hint {\n  padding: 0.4rem 0.6rem;\n  border: 1px solid #2a3441;\n  border-radius: 5px;\n  background: #1d2531;\n  color: #e8edf4;\n  font-size: 12px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l95-t1',
                  label: 'The hint is hidden by default',
                  body: 'const h = getComputedStyle(document.querySelector(".hint")); return h.visibility === "hidden" && h.opacity === "0"',
                },
                {
                  id: 'ex-l95-t2',
                  label: 'A focus rule exists alongside the hover rule',
                  body: 'const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch (e) { return [] } }); return rules.some((r) => r.selectorText && /:focus-within|:focus-visible/.test(r.selectorText) && r.style && r.style.visibility === "visible")',
                },
                {
                  id: 'ex-l95-t3',
                  label: 'The hint is revealed on hover as well',
                  body: 'const rules = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch (e) { return [] } }); return rules.some((r) => r.selectorText && r.selectorText.includes(":hover") && r.style && r.style.visibility === "visible")',
                },
                {
                  id: 'ex-l95-t4',
                  label: 'Focusing the button actually reveals the hint',
                  body: 'const b = document.querySelector(".trigger"); b.focus(); const h = getComputedStyle(document.querySelector(".hint")); return h.visibility === "visible" && h.opacity === "1"',
                },
              ],
              hints: [
                'Combine the two triggers in one rule: `.wrap:hover .hint, .wrap:focus-within .hint { ... }`.',
                '`:focus-within` matches the wrapper, which is why the selector goes through `.wrap` rather than straight to the button.',
                'Both `visibility` and `opacity` need to change; animating only opacity leaves the hint focusable and on screen.',
              ],
              solution: {
                html: '<span class="wrap">\n  <button type="button" class="trigger">Save</button>\n  <span class="hint">Saved to this device</span>\n</span>',
                css: '.wrap {\n  display: inline-block;\n}\n.trigger {\n  padding: 0.4rem 0.7rem;\n  border-radius: 5px;\n  border: 1px solid #2a3441;\n  background: #1d2531;\n  color: #e8edf4;\n}\n.hint {\n  padding: 0.4rem 0.6rem;\n  border: 1px solid #2a3441;\n  border-radius: 5px;\n  background: #1d2531;\n  color: #e8edf4;\n  font-size: 12px;\n  visibility: hidden;\n  opacity: 0;\n}\n.wrap:hover .hint,\n.wrap:focus-within .hint {\n  visibility: visible;\n  opacity: 1;\n}\n',
              },
              testNotes:
                'The last test focuses the button programmatically, which triggers `:focus-within` on the wrapper with no pointer involved. That is the check that distinguishes a genuinely accessible tooltip from a hover-only one.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s56',
      title: 'CSS Tooltips quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s56-q1',
          type: 'multiple-choice',
          prompt: 'A tooltip appears in the wrong place, far from its button. The bubble is `position: absolute` and the wrapper has no positioning. What is missing?',
          options: [
            'A `z-index` on the bubble',
            '`position: relative` on the wrapper, so the bubble resolves against it',
            'A width on the bubble',
            '`overflow: visible` on the body',
          ],
          answer: 1,
          explanation:
            'An absolutely positioned element resolves against its nearest *positioned* ancestor. Without one it walks up to the initial containing block, which is why the bubble lands somewhere unrelated to its trigger.',
        },
        {
          id: 'quiz-css-s56-q2',
          type: 'true-false',
          prompt: 'A tooltip hidden with only `opacity: 0` is still reachable by keyboard, because it is invisible.',
          answer: false,
          explanation:
            'Opacity hides pixels, not elements. The element stays in the accessibility tree and still takes focus if it is focusable, so a screen reader can land on something the sighted user cannot see. Use `visibility: hidden` to remove it properly.',
        },
        {
          id: 'quiz-css-s56-q3',
          type: 'blank',
          prompt: 'Which pseudo-class matches an element whenever anything inside it has focus, which is what a tooltip wrapper needs?',
          answers: [':focus-within', 'focus-within', ':focuswithin'],
          explanation:
            '`:focus-within` matches the container rather than the focused element itself, so a wrapper holding a button picks it up as soon as the button is focused. `:focus-visible` matches only the focused element, which is useful for styling the trigger but not for the wrapper.',
        },
        {
          id: 'quiz-css-s56-q4',
          type: 'multiple-choice',
          prompt: 'What does the native `title` attribute do that a CSS tooltip cannot easily do?',
          options: [
            'It can be styled with CSS',
            'It can contain a link',
            'Nothing much: the browser supplies the bubble for free, but it cannot be styled and does not appear on touch',
            'It appears instantly on hover',
          ],
          answer: 2,
          explanation:
            '`title` is the cheapest option and is a reasonable supplement, but it has a deliberate delay, cannot be styled, and is absent on touch devices. It is a fallback, not a design system.',
        },
        {
          id: 'quiz-css-s56-q5',
          type: 'identify-error',
          prompt: 'Screen readers announce "Save, Saved to this device" as one label, and tapping the button sometimes does nothing. Why?',
          code: `<button type="button" class="trigger">
  Save
  <span class="hint">Saved to this device</span>
</button>`,
          options: [
            'The hint needs a higher z-index',
            'The hint is nested inside the button, so it joins the button\'s accessible name and swallows taps on it',
            '`type="button"` prevents tooltips working',
            'The hint must come before the label text',
          ],
          answer: 1,
          explanation:
            'Everything inside a button is part of its label for assistive technology, so the bubble gets announced as button text. It also sits inside the hit area. Make the bubble a sibling of the button inside a positioned wrapper.',
        },
      ],
    },
  },
]