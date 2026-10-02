import type { Section } from '~/types/content'

export const cssFontSections: Section[] = [
  {
    id: 'css-s16',
    title: 'CSS Fonts',
    description:
      'Choosing typefaces, loading them reliably, sizing them sanely, and putting them together in pairs.',
    lessons: [
      {
        id: 'css-l38',
        title: 'Font Family',
        description:
          'The font-family property, the generic families every browser must ship, and the stack syntax that makes a missing font harmless.',
        duration: 6,
        objectives: [
          'Set a font with the font-family property and explain the comma-separated stack',
          'Name the five generic families and what shape each one guarantees',
          'Quote a multi-word family name correctly',
          'Explain why a stack always ends in a generic family',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l38-b1',
            body: '`font-family` decides which typeface renders the text. It takes a **stack**: a list of family names, tried left to right, with the browser using the first one it actually has. The last entry is always a **generic family**, which every browser is required to provide.',
          },
          {
            type: 'demo',
            id: 'c-l38-d1',
            title: 'Five generic families, same words',
            body: 'The same sentence set five times, once per generic family. Every one of these renders on every device without a single download.',
            html: `<p class="row"><span class="tag">serif</span><span class="f-serif">Quick brown foxes jump</span></p>
<p class="row"><span class="tag">sans-serif</span><span class="f-sans">Quick brown foxes jump</span></p>
<p class="row"><span class="tag">monospace</span><span class="f-mono">Quick brown foxes jump</span></p>
<p class="row"><span class="tag">cursive</span><span class="f-curs">Quick brown foxes jump</span></p>
<p class="row"><span class="tag">fantasy</span><span class="f-fant">Quick brown foxes jump</span></p>`,
            css: `.row {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin: 0 0 0.5rem;
  font-size: 15px;
}
.tag {
  flex: 0 0 84px;
  font-family: monospace;
  font-size: 12px;
  color: #6b7280;
}
.f-serif {
  font-family: serif;
}
.f-sans {
  font-family: sans-serif;
}
.f-mono {
  font-family: monospace;
}
.f-curs {
  font-family: cursive;
}
.f-fant {
  font-family: fantasy;
}`,
            height: 230,
          },
          {
            type: 'text',
            id: 'c-l38-b2',
            body: 'The letter shapes are the giveaway. `serif` has small finishing strokes on the ends of letters, `sans-serif` has none, and `monospace` gives every character the same width so code lines up. `cursive` joins letters like handwriting, `fantasy` is decorative and unpredictable by design. None of these is one specific typeface — each is a promise the browser keeps.',
          },
          {
            type: 'heading',
            id: 'c-l38-h1',
            level: 3,
            body: 'The stack syntax',
          },
          {
            type: 'text',
            id: 'c-l38-b3',
            body: 'A stack is just a comma-separated list. The browser walks it from the left, and the first family it has installed wins. Everything after it is dead weight unless that family turns out to be missing.',
          },
          {
            type: 'code',
            id: 'c-l38-c1',
            language: 'css',
            title: 'Reading a font stack',
            code: `.prose {
  font-family: "Source Serif Pro", Georgia, "Times New Roman", serif;
}`,
          },
          {
            type: 'list',
            id: 'c-l38-l1',
            style: 'ordered',
            items: [
              'Try `"Source Serif Pro"`. If the machine has it, use it and stop reading.',
              'Otherwise try `Georgia`, the most widely installed serif.',
              'Then `"Times New Roman"`, which older Windows machines usually have.',
              'Finally `serif`, which cannot fail, because the browser must have some serif.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l38-h2',
            level: 3,
            body: 'Quoting multi-word names',
          },
          {
            type: 'text',
            id: 'c-l38-b4',
            body: 'A family name containing spaces must be wrapped in quotes, or the browser reads each word as a separate family name. `Trebuchet MS` unquoted becomes two families named `Trebuchet` and `MS`, neither of which exists. Single-word names like `Georgia` need no quotes, though quoting them is harmless.',
          },
          {
            type: 'code',
            id: 'c-l38-c2',
            language: 'css',
            title: 'Quoted and unquoted',
            code: `.bad {
  font-family: Trebuchet MS, sans-serif;
}

.good {
  font-family: "Trebuchet MS", sans-serif;
}`,
          },
          {
            type: 'tip',
            id: 'c-l38-t1',
            title: 'Put the stack on the root, not on every element',
            body: '`font-family` inherits, so one declaration on `html` or `body` styles the whole page. Set it once at the top of your stylesheet and never repeat it.',
          },
          {
            type: 'warning',
            id: 'c-l38-w1',
            title: 'A stack with no generic family can end up invisible',
            body: '`font-family: "Brand Face";` with nothing after it means that if the font is missing, the browser falls back to its own default — which on some systems is an unpredictable serif. Always terminate the stack.',
          },
          {
            type: 'exercise',
            id: 'c-l38-x1',
            exercise: {
              id: 'ex-l38',
              instructions:
                'Give `.brand` a font stack: the quoted name "Nimbus Sans" first, then a generic sans-serif last. Then give `.mono` a monospace stack.',
              languages: ['css'],
              starterCode: {
                html: '<p class="brand">Interface text</p>\n<p class="mono">const answer = 42;</p>',
                css: '.brand {\n  font-family: ;\n}\n.mono {\n  font-family: ;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l38-t1',
                  label: 'The brand stack ends in sans-serif',
                  body: 'return /sans-serif\\s*$/.test(getComputedStyle(document.querySelector(".brand")).fontFamily.trim())',
                },
                {
                  id: 'ex-l38-t2',
                  label: 'The brand stack keeps the quoted name first',
                  body: 'const f = getComputedStyle(document.querySelector(".brand")).fontFamily; return /^"Nimbus Sans"/.test(f.trim())',
                },
                {
                  id: 'ex-l38-t3',
                  label: 'The brand stack has at least two entries',
                  body: 'return getComputedStyle(document.querySelector(".brand")).fontFamily.split(",").length >= 2',
                },
                {
                  id: 'ex-l38-t4',
                  label: 'The mono paragraph ends in monospace',
                  body: 'return /monospace\\s*$/.test(getComputedStyle(document.querySelector(".mono")).fontFamily.trim())',
                },
              ],
              hints: [
                'A stack is a comma-separated list inside one pair of quotes.',
                'A family name with a space in it needs double quotes: `"Nimbus Sans"`.',
                'Try `font-family: "Nimbus Sans", sans-serif;`',
              ],
              solution: {
                html: '<p class="brand">Interface text</p>\n<p class="mono">const answer = 42;</p>',
                css:
                  '.brand {\n  font-family: "Nimbus Sans", sans-serif;\n}\n.mono {\n  font-family: monospace;\n}\n',
              },
              testNotes:
                'The tests read the computed `font-family`, which the browser always reports as a normalised comma-separated list.',
            },
          },
        ],
      },
      {
        id: 'css-l39',
        title: 'Font Web Safe',
        description:
          'The handful of families that ship with nearly every operating system, and how to build a stack that looks the same everywhere.',
        duration: 5,
        objectives: [
          'List the common web-safe serif, sans-serif and monospace families',
          'Build a stack that degrades gracefully on a machine missing your first choice',
          'Explain the trade-off between web-safe fonts and downloaded fonts',
          'Spot the moment a page stops looking the same on every device',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l39-b1',
            body: 'A **web safe font** is one already installed on the machine, so it costs nothing to use and cannot fail to load. Choosing them means your page looks close enough to the design everywhere without a single network request.',
          },
          {
            type: 'demo',
            id: 'c-l39-d1',
            title: 'One sentence, three shapes',
            body: 'The same words three times: once with a serif stack, once with a sans-serif stack, once with a monospace stack. Nothing was downloaded — these are what the operating system already had.',
            html: `<p class="f-serif">Typography is what language looks like.</p>
<p class="f-sans">Typography is what language looks like.</p>
<p class="f-mono">Typography is what language looks like.</p>`,
            css: `.f-serif {
  font-family: serif;
  font-size: 20px;
  margin: 0 0 0.75rem;
}
.f-sans {
  font-family: sans-serif;
  font-size: 20px;
  margin: 0 0 0.75rem;
}
.f-mono {
  font-family: monospace;
  font-size: 18px;
  margin: 0 0 0.75rem;
}`,
            height: 210,
          },
          {
            type: 'text',
            id: 'c-l39-b2',
            body: 'The serif has contrast between thick and thin strokes and finishing details on the terminals. The sans-serif has an even stroke weight throughout. The monospace gives every character an identical advance width, so the line stays perfectly aligned. That difference is what you are seeing, not three different colours.',
          },
          {
            type: 'heading',
            id: 'c-l39-h1',
            level: 3,
            body: 'The families worth knowing',
          },
          {
            type: 'list',
            id: 'c-l39-l1',
            style: 'bullet',
            items: [
              '**Serif** — `Georgia`, `"Times New Roman"`, Garamond, Palatino, Baskerville. Read well in long paragraphs.',
              '**Sans-serif** — `Arial`, `Helvetica`, Verdana, Tahoma, `"Trebuchet MS"`, Calibri. The safe default for interface text.',
              '**Monospace** — `"Courier New"`, Consolas, Menlo, Monaco. For code, terminal output and anything that must line up.',
              '**Display** — Impact, `"Comic Sans MS"`. Available, but neither belongs in a professional layout.',
            ],
          },
          {
            type: 'code',
            id: 'c-l39-c1',
            language: 'css',
            title: 'Web-safe stacks you will actually use',
            code: `body {
  font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
}

.heading {
  font-family: Georgia, "Times New Roman", serif;
}

code,
pre {
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
}`,
          },
          {
            type: 'heading',
            id: 'c-l39-h2',
            level: 3,
            body: 'The trade-off',
          },
          {
            type: 'demo',
            id: 'c-l39-d2',
            title: 'A stack narrowing from many candidates to one',
            body: 'Three stacks. The first is a long modern list, the second a traditional web-safe pair, the third a bare generic. On any machine at least one of them renders — which is the entire point.',
            html: `<div class="sample a">Modern stack</div>
<div class="sample b">Traditional stack</div>
<div class="sample c">Generic only</div>`,
            css: `.sample {
  font-size: 18px;
  margin: 0 0 0.6rem;
  padding: 0.4rem 0.6rem;
  border-left: 4px solid #d5dae0;
}
.a {
  font-family: -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
  border-left-color: #29e2bd;
}
.b {
  font-family: Georgia, "Times New Roman", serif;
  border-left-color: #7cc4ff;
}
.c {
  font-family: monospace;
  border-left-color: #f5a623;
}`,
            height: 220,
          },
          {
            type: 'text',
            id: 'c-l39-b3',
            body: 'Web-safe fonts are free and instant, and they cap how distinctive your design can be. They also differ subtly between Windows, macOS and Linux — the font called `Georgia` is not the same file everywhere, so headings shift a little from platform to platform. That drift is the price for never waiting on a download.',
          },
          {
            type: 'tip',
            id: 'c-l39-t1',
            title: 'Body text should be conservative',
            body: 'Reserve a distinctive font for headings and let the body use the most boring sans-serif on the machine. Nobody notices a plain paragraph, and everybody notices text they cannot read.',
          },
          {
            type: 'warning',
            id: 'c-l39-w1',
            title: 'A single family name is not a fallback',
            body: '`font-family: Helvetica;` on a Windows machine falls back to whatever the browser picks, which is rarely what you designed. Always keep at least two or three candidates plus a generic at the end.',
          },
          {
            type: 'exercise',
            id: 'c-l39-x1',
            exercise: {
              id: 'ex-l39',
              instructions:
                'Build a web-safe stack for `.title` that tries Georgia, then "Times New Roman", and ends in serif. Give `.plain` a sans-serif stack ending in sans-serif.',
              languages: ['css'],
              starterCode: {
                html: '<h2 class="title">Chapter four</h2>\n<p class="plain">A short paragraph of body text.</p>',
                css: '.title {\n  font-family: ;\n}\n.plain {\n  font-family: ;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l39-t1',
                  label: 'The heading stack ends in serif',
                  body: 'return /serif\\s*$/.test(getComputedStyle(document.querySelector(".title")).fontFamily.trim())',
                },
                {
                  id: 'ex-l39-t2',
                  label: 'The heading stack still offers Georgia',
                  body: 'return /^Georgia/.test(getComputedStyle(document.querySelector(".title")).fontFamily.trim())',
                },
                {
                  id: 'ex-l39-t3',
                  label: 'The heading stack has three or more candidates',
                  body: 'return getComputedStyle(document.querySelector(".title")).fontFamily.split(",").length >= 3',
                },
                {
                  id: 'ex-l39-t4',
                  label: 'The paragraph ends in sans-serif',
                  body: 'return /sans-serif\\s*$/.test(getComputedStyle(document.querySelector(".plain")).fontFamily.trim())',
                },
              ],
              hints: [
                'Write the candidates in order, separated by commas, inside a single declaration.',
                '"Times New Roman" needs quotes because of the space.',
                'Try `font-family: Georgia, "Times New Roman", serif;`',
              ],
              solution: {
                html: '<h2 class="title">Chapter four</h2>\n<p class="plain">A short paragraph of body text.</p>',
                css:
                  '.title {\n  font-family: Georgia, "Times New Roman", serif;\n}\n.plain {\n  font-family: Arial, Helvetica, sans-serif;\n}\n',
              },
              testNotes:
                'These tests inspect the normalised computed stack on each element, so quoting and comma spacing do not matter.',
            },
          },
        ],
      },
      {
        id: 'css-l40',
        title: 'Font Fallbacks',
        description:
          'What happens when a font is missing, how the generic family guarantees readable text, and how to make a fallback match the real font.',
        duration: 7,
        objectives: [
          'Describe the font matching algorithm in plain terms',
          'Explain the job of the trailing generic family in a stack',
          'Use multiple sources and font-display in an @font-face rule',
          'Use size-adjust and ascent-override to reduce layout shift',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l40-b1',
            body: 'A font stack only matters when part of it is missing. When the browser cannot find the first family, it walks down the list, and when it runs out it must still draw the text — using whatever generic family it was guaranteed to have. That safety net is what stops a page from rendering as a wall of blanks.',
          },
          {
            type: 'demo',
            id: 'c-l40-d1',
            title: 'A missing first choice, caught by the last one',
            body: 'The first line asks for two families this machine does not have. The second asks for the same two, but ends with a generic. Both render — the difference is which font you get and how predictable it is.',
            html: `<p class="no-generic">Brand Display, Brand Text</p>
<p class="with-generic">Brand Display, Brand Text, serif</p>`,
            css: `.no-generic {
  font-family: "Brand Display", "Brand Text";
  font-size: 22px;
  margin: 0 0 0.75rem;
}
.with-generic {
  font-family: "Brand Display", "Brand Text", serif;
  font-size: 22px;
  margin: 0 0 0.75rem;
}`,
            height: 180,
          },
          {
            type: 'text',
            id: 'c-l40-b2',
            body: 'Nothing on this page loaded, and nothing failed. The browser rejected both brand names because neither is installed here and then made a decision. The second line is under your control: the `serif` at the end guarantees the result is a serif, whatever else happens.',
          },
          {
            type: 'heading',
            id: 'c-l40-h1',
            level: 3,
            body: 'How the browser picks',
          },
          {
            type: 'list',
            id: 'c-l40-l1',
            style: 'ordered',
            items: [
              'Read the `font-family` list from left to right.',
              'For each family, check whether a matching face is available, locally or through `@font-face`.',
              'Use the first match. Ignore the rest of the list.',
              'If nothing matches, use the trailing generic family if there is one.',
              'If there is not, use the user agent default font.',
            ],
          },
          {
            type: 'text',
            id: 'c-l40-b3',
            body: 'This is why a *real* family beats a generic in slot one: a generic resolves instantly and is guaranteed, but "Times New Roman" also usually exists and gives you a designed face when it is present. The generic goes last precisely because it is the only entry that cannot fail.',
          },
          {
            type: 'code',
            id: 'c-l40-c1',
            language: 'css',
            title: 'Multiple sources in a font-face rule',
            code: `@font-face {
  font-family: "Brand Sans";
  src: url("/fonts/brand-sans.woff2") format("woff2"),
       url("/fonts/brand-sans.woff") format("woff"),
       url("/fonts/brand-sans.ttf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}`,
          },
          {
            type: 'list',
            id: 'c-l40-l2',
            style: 'bullet',
            items: [
              '**`src` is a fallback list too.** The browser downloads the first format it supports, so put the modern one first and never ship only an old format.',
              '**`font-display`** decides what the reader sees while the file is still downloading. `swap` shows fallback text immediately, `block` hides text briefly, `optional` may skip the font entirely, `fallback` sits between swap and block.',
              '**`font-weight: 100 900`** tells the browser the file contains a variable weight range, so one download covers every weight. A single file per weight is fine too, but request them all.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l40-h2',
            level: 3,
            body: 'Making the fallback look like the real thing',
          },
          {
            type: 'demo',
            id: 'c-l40-d2',
            title: 'A fallback face adjusted to match',
            body: 'Two headings declaring the same missing family. The lower one declares a locally installed fallback face whose size has been adjusted, so it occupies almost the same space as the real font would.',
            html: `<h3 class="plain-fallback">Layout shift happens here</h3>
<h3 class="tuned-fallback">Layout shift happens here</h3>`,
            css: `@font-face {
  font-family: "Tuned Fallback";
  src: local("Arial");
  size-adjust: 104%;
  ascent-override: 92%;
}
.plain-fallback {
  font-family: "Brand Display", sans-serif;
  margin: 0 0 1rem;
  font-size: 26px;
}
.tuned-fallback {
  font-family: "Brand Display", "Tuned Fallback", sans-serif;
  margin: 0 0 1rem;
  font-size: 26px;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l40-b4',
            body: '`size-adjust` scales the fallback so its characters occupy the same width as the intended font, and `ascent-override` adjusts where the line box sits vertically. Apply them and the swap from fallback to real font barely moves the text. There are companions — `descent-override`, `line-gap-override` — and browsers build automatic fallback metrics the same way, but writing your own gives you control over the result.',
          },
          {
            type: 'tip',
            id: 'c-l40-t1',
            title: 'Match the metrics, not the look',
            body: 'A fallback cannot be made to look like a missing font. It can only be made to occupy the same space, which is what the reader actually notices as "jank". Chase the metrics.',
          },
          {
            type: 'warning',
            id: 'c-l40-w1',
            title: 'font-display: block can make text invisible',
            body: '`block` hides text until the font loads, for up to about three seconds, then shows the fallback anyway. On a slow connection the reader stares at an empty heading. `swap` is almost always the right default for body content.',
          },
          {
            type: 'exercise',
            id: 'c-l40-x1',
            exercise: {
              id: 'ex-l40',
              instructions:
                'Rewrite the stack on `.headline` so it survives a missing font: keep "Brand Display" first, add a second family named "Brand Text", and finish with a generic serif.',
              languages: ['css'],
              starterCode: {
                html: '<h2 class="headline">A headline that will always render</h2>',
                css: '.headline {\n  font-family: "Brand Display";\n  font-size: 24px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l40-t1',
                  label: 'The stack ends in serif',
                  body: 'return /serif\\s*$/.test(getComputedStyle(document.querySelector(".headline")).fontFamily.trim())',
                },
                {
                  id: 'ex-l40-t2',
                  label: 'The intended family is still first',
                  body: 'return /^"Brand Display"/.test(getComputedStyle(document.querySelector(".headline")).fontFamily.trim())',
                },
                {
                  id: 'ex-l40-t3',
                  label: 'A second named candidate sits in the middle',
                  body: 'return /"Brand Text"/.test(getComputedStyle(document.querySelector(".headline")).fontFamily)',
                },
                {
                  id: 'ex-l40-t4',
                  label: 'The stack has exactly three candidates',
                  body: 'return getComputedStyle(document.querySelector(".headline")).fontFamily.split(",").length === 3',
                },
              ],
              hints: [
                'A stack is the intended font, then a backup, then a generic you know will exist.',
                'Both brand names need quotes.',
                'Try `font-family: "Brand Display", "Brand Text", serif;`',
              ],
              solution: {
                html: '<h2 class="headline">A headline that will always render</h2>',
                css:
                  '.headline {\n  font-family: "Brand Display", "Brand Text", serif;\n  font-size: 24px;\n}\n',
              },
              testNotes:
                'The tests read the computed stack, so they pass only when a real fallback chain with a terminating generic is in place.',
            },
          },
        ],
      },
      {
        id: 'css-l41',
        title: 'Font Style',
        description:
          'Style, weight and width: the three properties that decide how a letterform is drawn without changing which typeface it comes from.',
        duration: 6,
        objectives: [
          'Set font-style to normal, italic or oblique and know what each one really means',
          'Use numeric weights from 100 to 900 and the keyword equivalents',
          'Apply font-stretch to condensed and expanded widths',
          'Predict how a browser handles a weight a font does not provide',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l41-b1',
            body: '`font-style`, `font-weight` and `font-stretch` all operate on a face you have already chosen. They do not change the typeface; they change how that typeface is drawn. Style leans it, weight thickens it, stretch widens or narrows it.',
          },
          {
            type: 'demo',
            id: 'c-l41-d1',
            title: 'One word at five weights',
            body: 'The same word repeated at 100, 300, 500, 700 and 900. Only `font-weight` changes between the lines.',
            html: `<p class="w100">Handgloves</p>
<p class="w300">Handgloves</p>
<p class="w500">Handgloves</p>
<p class="w700">Handgloves</p>
<p class="w900">Handgloves</p>`,
            css: `.w100, .w300, .w500, .w700, .w900 {
  font-family: sans-serif;
  font-size: 24px;
  margin: 0 0 0.35rem;
}
.w100 { font-weight: 100; }
.w300 { font-weight: 300; }
.w500 { font-weight: 500; }
.w700 { font-weight: 700; }
.w900 { font-weight: 900; }`,
            height: 260,
          },
          {
            type: 'text',
            id: 'c-l41-b2',
            body: 'The stroke gets heavier from top to bottom. If two lines look identical, the font you are using has no separate light or black cut, so the browser synthesises weight by smearing the outline. It works, and it never looks as good as a real weight.',
          },
          {
            type: 'heading',
            id: 'c-l41-h1',
            level: 3,
            body: 'font-style',
          },
          {
            type: 'list',
            id: 'c-l41-l1',
            style: 'bullet',
            items: [
              '**`normal`** — the upright face. The default.',
              '**`italic`** — a true italic cut, designed with different letterforms: a single-storey `a`, a leaning `f`, tighter spacing.',
              '**`oblique`** — the upright face slanted by the browser. It keeps the normal shapes and just leans them, which is what synthetic oblique does.',
            ],
          },
          {
            type: 'demo',
            id: 'c-l41-d2',
            title: 'normal, italic and oblique',
            body: 'Three lines, same family. Where a real italic face exists the middle line uses it; otherwise the browser leans the upright shapes for you.',
            html: `<p class="s-normal">The quick brown fox</p>
<p class="s-italic">The quick brown fox</p>
<p class="s-oblique">The quick brown fox</p>`,
            css: `.s-normal, .s-italic, .s-oblique {
  font-family: serif;
  font-size: 21px;
  margin: 0 0 0.5rem;
}
.s-normal { font-style: normal; }
.s-italic { font-style: italic; }
.s-oblique { font-style: oblique 12deg; }`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l41-h2',
            level: 3,
            body: 'font-weight',
          },
          {
            type: 'code',
            id: 'c-l41-c1',
            language: 'css',
            title: 'Numeric and keyword weights',
            code: `.thin { font-weight: 100; }
.extra-light { font-weight: 200; }
.light { font-weight: 300; }
.normal { font-weight: 400; }
.medium { font-weight: 500; }
.semibold { font-weight: 600; }
.bold { font-weight: 700; }
.extrabold { font-weight: 800; }
.black { font-weight: 900; }`,
          },
          {
            type: 'list',
            id: 'c-l41-l2',
            style: 'bullet',
            items: [
              '`normal` is `400` and `bold` is `700`. Those are the only two keyword values, and they are aliases for the numbers.',
              'Numbers run `100` to `900` in steps of 100. Values in between, like `450`, are legal and are interpolated for variable fonts.',
              'If the family has no face at the requested weight, the browser looks for the nearest one, then synthesises bold by smearing if nothing is closer.',
              'A variable font declared as `font-weight: 100 900` gives you the whole range from one file, with no synthesis at all.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l41-h3',
            level: 3,
            body: 'font-stretch',
          },
          {
            type: 'text',
            id: 'c-l40-b5',
            body: '`font-stretch` picks a width from the `ultra-condensed` through `ultra-expanded` range, or you can give a percentage from 50% to 200%. It only does something if the family actually ships those widths — very few do. Reach for it with a family that has the cuts, not as a substitute for choosing a narrower design.',
          },
          {
            type: 'code',
            id: 'c-l41-c2',
            language: 'css',
            title: 'Stretch keywords and percentages',
            code: `.condensed { font-stretch: condensed; }
.semi-expanded { font-stretch: semi-expanded; }
.hairline { font-stretch: 75%; }
.wide { font-stretch: 125%; }`,
          },
          {
            type: 'tip',
            id: 'c-l41-t1',
            title: 'Do not lean body text',
            body: 'Italic is fine for a word of emphasis and normal for a whole sentence. Long italic passages are noticeably harder to read because the slant pushes the letter shapes into each other.',
          },
          {
            type: 'warning',
            id: 'c-l41-w1',
            title: 'font-style is not a transform',
            body: '`transform: skewX(-10deg)` will lean anything, including a container, and it shifts layout without telling the accessibility tree or the browser anything. `font-style: italic` is a font request: if the face exists, it is used properly.',
          },
          {
            type: 'exercise',
            id: 'c-l41-x1',
            exercise: {
              id: 'ex-l41',
              instructions:
                'Set `.pull` to italic and weight 700, and `.quiet` to weight 300. Use the `em` element for the pull quote.',
              languages: ['css'],
              starterCode: {
                html: '<em class="pull">Slower, and worth it.</em>\n<p class="quiet">Set quietly in the margin.</p>',
                css: '.pull {\n  font-size: 20px;\n  \n}\n.quiet {\n  font-size: 15px;\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l41-t1',
                  label: 'The pull quote is italic',
                  body: 'return getComputedStyle(document.querySelector("em.pull")).fontStyle === "italic"',
                },
                {
                  id: 'ex-l41-t2',
                  label: 'The pull quote is bold',
                  body: 'return getComputedStyle(document.querySelector("em.pull")).fontWeight === "700"',
                },
                {
                  id: 'ex-l41-t3',
                  label: 'The quiet line is weight 300',
                  body: 'return getComputedStyle(document.querySelector(".quiet")).fontWeight === "300"',
                },
                {
                  id: 'ex-l41-t4',
                  label: 'The quiet line is not italic',
                  body: 'return getComputedStyle(document.querySelector(".quiet")).fontStyle === "normal"',
                },
              ],
              hints: [
                'Style and weight are two separate properties: `font-style` and `font-weight`.',
                'Weight is a number from 100 to 900, not a keyword, unless you want `bold`.',
                'Try `font-style: italic; font-weight: 700;`',
              ],
              solution: {
                html: '<em class="pull">Slower, and worth it.</em>\n<p class="quiet">Set quietly in the margin.</p>',
                css:
                  '.pull {\n  font-size: 20px;\n  font-style: italic;\n  font-weight: 700;\n}\n.quiet {\n  font-size: 15px;\n  font-weight: 300;\n}\n',
              },
              testNotes:
                'The tests read `font-style` and `font-weight` from the computed style of each element.',
            },
          },
        ],
      },
      {
        id: 'css-l42',
        title: 'Font Size',
        description:
          'Absolute and relative units, why rem suits body text, and how em compounds when font sizes are nested.',
        duration: 7,
        objectives: [
          'Distinguish absolute units from relative ones',
          'Explain why rem is the safer choice for body text',
          'Describe the em compounding problem and how to avoid it',
          'Set a type scale where every step relates to a root size',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l42-b1',
            body: '`font-size` accepts two kinds of unit. **Absolute** units (`px`, `pt`) are fixed numbers the reader cannot influence. **Relative** units (`rem`, `em`, `%`, `vw`) are computed from something else on the page, so they move when the reader or the viewport changes.',
          },
          {
            type: 'demo',
            id: 'c-l42-d1',
            title: 'The same size written five ways',
            body: 'Five paragraphs that all compute to the same 20px right now. They do not stay that way: change the browser default size, zoom the page, or resize the window, and they drift apart.',
            html: `<p class="u-px">Written in px</p>
<p class="u-pt">Written in pt</p>
<p class="u-em">Written in em</p>
<p class="u-rem">Written in rem</p>
<p class="u-vw">Written in vw</p>`,
            css: `.u-px, .u-pt, .u-em, .u-rem, .u-vw {
  margin: 0 0 0.4rem;
}
.u-px { font-size: 20px; }
.u-pt { font-size: 20pt; }
.u-em { font-size: 1.25em; }
.u-rem { font-size: 1.25rem; }
.u-vw { font-size: 1.25vw; }`,
            height: 240,
          },
          {
            type: 'text',
            id: 'c-l42-b2',
            body: 'At the default settings they cluster together, because 1em, 1rem and 1vw all happen to land near 20px right now. The `vw` line is visibly smaller, because 1vw is 1% of the viewport width — about 15px on a wide screen. Change the page zoom and the `rem` and `em` lines grow with it while the `px` and `pt` lines stay pinned.',
          },
          {
            type: 'heading',
            id: 'c-l42-h1',
            level: 3,
            body: 'The units',
          },
          {
            type: 'list',
            id: 'c-l42-l1',
            style: 'bullet',
            items: [
              '**`px`** — a CSS pixel, a fixed device-independent unit. Does not respond to the reader\'s font-size preference.',
              '**`pt`** — a typographic point, 1/72 of an inch. Converted to pixels for screen display and rounded, so it drifts. Print only.',
              '**`em`** — relative to the font size of the *parent* element. Scales with the reader, and compounds when nested.',
              '**`rem`** — relative to the font size of the root element. Scales with the reader and never compounds.',
              '**`%`** — relative to the parent font size, so it behaves exactly like `em` for font sizes.',
              '**`vw` / `vh`** — 1% of the viewport width or height. Useful for a single hero line; wrong for body text, because it ignores the reader entirely.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l42-h2',
            level: 3,
            body: 'Why rem suits body text',
          },
          {
            type: 'text',
            id: 'c-l42-b3',
            body: 'When a reader raises their browser\'s default font size because the page looks too small, `rem` and `em` grow and the layout stays readable. `px` ignores the request entirely, which is the accessibility complaint behind nearly every "zoom my page" issue report. Because `rem` measures from the root rather than the parent, it also gives you an absolute reference point: `1.5rem` is always the same number of pixels, wherever you put it.',
          },
          {
            type: 'heading',
            id: 'c-l42-h3',
            level: 3,
            body: 'The em compounding problem',
          },
          {
            type: 'demo',
            id: 'c-l42-d2',
            title: 'Nested em sizes, shrinking every level',
            body: 'The same markup twice. On the left, each nested `em` multiplies the parent, so the deepest text is unreadably small. On the right the nested sizes use `rem` and the scale holds.',
            html: `<div class="col">
  <p class="one">Level 1<em class="two">Level 2<em class="three">Level 3 text</em></em></p>
</div>
<div class="col">
  <p class="one rem-one">Level 1<em class="two rem-two">Level 2<em class="three rem-three">Level 3 text</em></em></p>
</div>`,
            css: `.col {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d5dae0;
  border-radius: 8px;
  font-size: 14px;
}
.col + .col {
  margin-left: 0.75rem;
}
.row2 {
  display: flex;
}
.two { font-size: 1.2em; }
.three { font-size: 1.2em; }
.rem-two { font-size: 1.2rem; }
.rem-three { font-size: 1.2rem; }`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l42-b4',
            body: 'On the left, `1.2em` at level 1 is 1.2 times the base. At level 2 it is 1.2 times *that*, and at level 3 a third multiplication — about 1.73 times the base, and shrinking further with every level you add. Use `rem` for anything structural, or set the child size to a `rem` value the moment you nest.',
          },
          {
            type: 'code',
            id: 'c-l42-c1',
            language: 'css',
            title: 'A rem type scale',
            code: `:root {
  font-size: 100%;
}
body {
  font-size: 1rem;
  line-height: 1.6;
}
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }
h4 { font-size: 1.25rem; }
small { font-size: 0.875rem; }
.caption { font-size: 0.75rem; }`,
          },
          {
            type: 'tip',
            id: 'c-l42-t1',
            title: 'Never use vw for body text',
            body: 'A viewport unit knows nothing about the reader\'s preference, and on a very wide screen it produces body text small enough to strain. `clamp()` with a `rem` minimum is the safe way to make a heading responsive.',
          },
          {
            type: 'warning',
            id: 'c-l42-w1',
            title: 'An em in font-size is also an em in margins',
            body: 'Setting `font-size: 1.2em` on a block makes its `padding: 1em` and `margin-bottom: 1em` scale by 1.2 too. That surprises people regularly. Use `rem` for spacing too and the whole layout becomes predictable.',
          },
          {
            type: 'exercise',
            id: 'c-l42-x1',
            exercise: {
              id: 'ex-l42',
              instructions:
                'Set `.body-copy` to 1.25rem and `.heading` to 2rem, using relative units only.',
              languages: ['css'],
              starterCode: {
                html: '<h2 class="heading">A heading at two rems</h2>\n<p class="body-copy">Body copy at one and a quarter rems.</p>',
                css: '.heading {\n  font-size: ;\n}\n.body-copy {\n  font-size: ;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l42-t1',
                  label: 'The heading computes to 32px',
                  body: 'return getComputedStyle(document.querySelector(".heading")).fontSize === "32px"',
                },
                {
                  id: 'ex-l42-t2',
                  label: 'The body copy computes to 20px',
                  body: 'return getComputedStyle(document.querySelector(".body-copy")).fontSize === "20px"',
                },
                {
                  id: 'ex-l42-t3',
                  label: 'The heading still tracks the root size',
                  body: 'return document.querySelector(".heading").style.fontSize.trim() !== "32px" && document.querySelector(".heading").style.fontSize.trim() !== ""',
                },
                {
                  id: 'ex-l42-t4',
                  label: 'The body copy still tracks the root size',
                  body: 'return /rem|em|%$/.test(document.querySelector(".body-copy").style.fontSize)',
                },
              ],
              hints: [
                'The root font size is 16px, so `1rem` is 16px and `2rem` is 32px.',
                'A relative unit keeps the reader\'s font-size preference working.',
                'Try `font-size: 2rem;` and `font-size: 1.25rem;`',
              ],
              solution: {
                html: '<h2 class="heading">A heading at two rems</h2>\n<p class="body-copy">Body copy at one and a quarter rems.</p>',
                css: '.heading {\n  font-size: 2rem;\n}\n.body-copy {\n  font-size: 1.25rem;\n}\n',
              },
              testNotes:
                'The computed sizes are checked against a 16px root. The last two tests confirm you wrote a relative unit rather than a hard-coded pixel value.',
            },
          },
        ],
      },
      {
        id: 'css-l43',
        title: 'Font Google',
        description:
          'Loading a Google Font with a link or an import, and the two settings that decide how fast and how stable the load feels.',
        duration: 6,
        objectives: [
          'Load a Google Font with a link element and with @import',
          'Explain what display=swap changes for the reader',
          'Use preconnect to remove a round trip to the font host',
          'Request only the weights and subsets you actually use',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l43-b1',
            body: 'Google Fonts serves free typefaces from a network host. You ask for a family, the host returns a stylesheet pointing at the font files, and the browser downloads them. Two extra lines — a `preconnect` and `display=swap` — decide whether that feels instant or not.',
          },
          {
            type: 'demo',
            id: 'c-l43-d1',
            title: 'The layout a web font fills, with system stacks',
            body: 'This is the composition you are aiming at — a display line, a deck and a body paragraph. It is rendered entirely with system font stacks, so it is correct here and needs no download.',
            html: `<p class="kicker">Field notes</p>
<h1 class="display">Signals and Noise</h1>
<p class="deck">A short essay on typography, defaults, and what happens when a font fails to arrive.</p>
<p class="copy">The paragraph underneath is the one people actually read, so it gets the most boring family available and the most generous line height.</p>`,
            css: `.kicker {
  font-family: monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7280;
  margin: 0 0 0.5rem;
}
.display {
  font-family: serif;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1.1;
  margin: 0 0 0.5rem;
}
.deck {
  font-family: sans-serif;
  font-size: 1.125rem;
  color: #4b5563;
  margin: 0 0 1rem;
  max-width: 34em;
}
.copy {
  font-family: sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  margin: 0;
  max-width: 34em;
}`,
            height: 300,
          },
          {
            type: 'text',
            id: 'c-l43-b2',
            body: 'Notice how the shapes of the roles are different: the kicker is monospaced and wide-tracked, the display line is a serif, the deck and the body are sans-serif. Swap those families for a downloaded pair later and the composition holds, because the roles are doing the work, not the specific faces.',
          },
          {
            type: 'heading',
            id: 'c-l43-h1',
            level: 3,
            body: 'Loading it',
          },
          {
            type: 'code',
            id: 'c-l43-c1',
            language: 'html',
            title: 'The link element, with preconnect and swap',
            code: `<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,700&family=Inter:wght@400;600&display=swap"
  />
</head>`,
          },
          {
            type: 'code',
            id: 'c-l43-c2',
            language: 'css',
            title: 'The same thing as an import',
            code: `@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap");

body {
  font-family: "Inter", system-ui, sans-serif;
}`,
          },
          {
            type: 'list',
            id: 'c-l43-l1',
            style: 'bullet',
            items: [
              '**`preconnect`** opens the connection to both hosts before the stylesheet request is made, so the font file itself does not pay for a fresh TCP and TLS handshake. The second one needs `crossorigin`, because that request is a CORS fetch.',
              '**`display=swap`** in the query string tells the browser to paint the fallback text immediately and swap in the real font when it arrives. Without it the default is `block`, which hides text for up to three seconds.',
              '**`family=Inter:wght@400;600`** asks for specific weights only. Requesting `wght@100..900` on a non-variable family downloads a dozen files.',
              '**`&display=swap`** is part of the URL, not a separate parameter. Forgetting it is the most common reason a Google Font arrives late.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l43-w1',
            title: '@import blocks, the link element does not',
            body: 'An `@import` at the top of a stylesheet is discovered only after that stylesheet has downloaded and parsed, so it adds a whole extra round trip before the font request even starts. Use the `link` element in the `head` wherever you can.',
          },
          {
            type: 'example',
            id: 'c-l43-e1',
            title: 'The same composition with a downloaded family',
            body: 'The markup is unchanged. Only `font-family` values differ — and each one still ends in a generic family, so the page survives a font that never arrives.',
            html: `<p class="kicker">Field notes</p>
<h1 class="display">Signals and Noise</h1>
<p class="deck">A short essay on typography, defaults, and what happens when a font fails to arrive.</p>
<p class="copy">The paragraph underneath is the one people actually read.</p>`,
            css: `body {
  font-family: "Inter", system-ui, sans-serif;
}
.kicker {
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #6b7280;
  margin: 0 0 0.5rem;
}
.display {
  font-family: "Source Serif 4", Georgia, serif;
  font-weight: 700;
  font-size: 2.5rem;
  margin: 0 0 0.5rem;
}
.deck {
  font-size: 1.125rem;
  color: #4b5563;
}
.copy {
  font-size: 1rem;
  line-height: 1.7;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l43-t1',
            title: 'Self-host when it matters',
            body: 'A production page usually does better serving its own woff2 files from its own origin: no third-party connection, no extra DNS lookup, and cached with the rest of your assets. Google Fonts is a convenient way to prototype a choice.',
          },
          {
            type: 'exercise',
            id: 'c-l43-x1',
            exercise: {
              id: 'ex-l43',
              instructions:
                'Give `.article` a font stack that tries "Inter" first and ends in the generic `system-ui, sans-serif`, and set `.aside` to `monospace`. Keep it offline: use no downloaded font.',
              languages: ['css'],
              starterCode: {
                html: '<p class="article">The main article text.</p>\n<p class="aside">Marginal note</p>',
                css: '.article {\n  font-family: ;\n}\n.aside {\n  font-family: ;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l43-t1',
                  label: 'The article stack ends in sans-serif',
                  body: 'return /sans-serif\\s*$/.test(getComputedStyle(document.querySelector(".article")).fontFamily.trim())',
                },
                {
                  id: 'ex-l43-t2',
                  label: 'The article stack offers Inter first',
                  body: 'return /^Inter/.test(getComputedStyle(document.querySelector(".article")).fontFamily.trim())',
                },
                {
                  id: 'ex-l43-t3',
                  label: 'The article stack keeps a fallback candidate',
                  body: 'return getComputedStyle(document.querySelector(".article")).fontFamily.split(",").length >= 3',
                },
                {
                  id: 'ex-l43-t4',
                  label: 'The aside is monospace',
                  body: 'return /monospace\\s*$/.test(getComputedStyle(document.querySelector(".aside")).fontFamily.trim())',
                },
              ],
              hints: [
                'List the font you want, then its neighbours, then the generic family.',
                'A named family does not need quotes if it is a single word.',
                'Try `font-family: Inter, system-ui, sans-serif;`',
              ],
              solution: {
                html: '<p class="article">The main article text.</p>\n<p class="aside">Marginal note</p>',
                css:
                  '.article {\n  font-family: Inter, system-ui, sans-serif;\n}\n.aside {\n  font-family: monospace;\n}\n',
              },
              testNotes:
                'The tests check that the stack has a named first choice, a neighbour and a terminating generic, which is what survives a font that never loads.',
            },
          },
        ],
      },
      {
        id: 'css-l44',
        title: 'Font Pairings',
        description:
          'Matching a heading face with a body face, and why contrast between the two beats similarity.',
        duration: 5,
        objectives: [
          'Pair a display family with a text family deliberately',
          'Explain why contrasting roles beat a matching pair',
          'Recognise the three pairings that reliably work',
          'Test a pairing at small sizes before committing to it',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l44-b1',
            body: 'A page usually needs two families: one for **display** — headings and numbers, seen briefly and at large sizes — and one for **text** — paragraphs, read for minutes at small sizes. They should differ in character, because they are doing different jobs.',
          },
          {
            type: 'demo',
            id: 'c-l44-d1',
            title: 'Two pairings, side by side',
            body: 'On the left, serif headings over sans-serif body. On the right, the reverse. Both are valid pairings; which one suits a page is a question of tone, not correctness.',
            html: `<div class="pair">
  <h3>The Weight of Ink</h3>
  <p>Serif for the heading, sans-serif for the body. The classic editorial split.</p>
</div>
<div class="pair reverse">
  <h3>The Weight of Ink</h3>
  <p>Sans-serif for the heading, serif for the body. Quieter, and closer to print.</p>
</div>`,
            css: `.pair {
  flex: 1;
  padding: 0 1rem 0 0;
}
.reverse {
  padding: 0 0 0 1rem;
  border-left: 1px solid #d5dae0;
}
.pair h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
}
.pair p {
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
}
.pair h3 { font-family: serif; }
.pair p { font-family: sans-serif; }
.reverse h3 { font-family: sans-serif; }
.reverse p { font-family: serif; }`,
            height: 250,
          },
          {
            type: 'text',
            id: 'c-l44-b2',
            body: 'Same words, same sizes, different roles. On the left the heading carries the personality and the paragraph recedes. On the right the paragraph carries it, which suits long-form reading where the text itself is the point.',
          },
          {
            type: 'heading',
            id: 'c-l44-h1',
            level: 3,
            body: 'Pairing rules that hold up',
          },
          {
            type: 'list',
            id: 'c-l44-l1',
            style: 'bullet',
            items: [
              '**Contrast, not similarity.** Two families that differ obviously create a clear hierarchy. Two that differ slightly create noise.',
              '**Match the x-height.** The height of a lowercase `x` decides how large the text reads. Families with very different x-heights look mismatched at the same nominal size.',
              '**One superfamily is allowed.** Two cuts of the same superfamily, one sans for headings and one serif for text, is a safe and cheap pairing.',
              '**Limit yourself to two.** A third family almost always reads as an accident rather than a decision.',
              '**Check the small size.** Test the body face at your real paragraph size and measure, not judge. A heading that flatters at 48px can be illegible at 18px.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l44-h2',
            level: 3,
            body: 'Three reliable combinations',
          },
          {
            type: 'code',
            id: 'c-l44-c1',
            language: 'css',
            title: 'Editorial, technical and neutral',
            code: `/* editorial: serif display, sans body */
.editorial h1 { font-family: Georgia, serif; }
.editorial p { font-family: Arial, Helvetica, sans-serif; }

/* technical: sans display, mono accents */
.technical h1 { font-family: Arial, Helvetica, sans-serif; }
.technical code { font-family: Consolas, "Courier New", monospace; }

/* neutral: one family, weight and size carry the hierarchy */
.neutral h1 { font-family: system-ui, sans-serif; font-weight: 800; }
.neutral p { font-family: system-ui, sans-serif; font-weight: 400; }`,
          },
          {
            type: 'demo',
            id: 'c-l44-d2',
            title: 'Hierarchy from one family alone',
            body: 'No second family at all. Size, weight and letter-spacing carry the hierarchy, which is why so many well-designed interfaces ship with one.',
            html: `<div class="single">
  <h4>Quarterly review</h4>
  <p class="lead">Revenue held flat while churn fell for a third consecutive quarter.</p>
  <p class="body">The detail sits in a smaller, lighter cut of the same family, which keeps the page calm and the reading order obvious.</p>
</div>`,
            css: `.single {
  max-width: 32em;
}
.single h4 {
  font-family: sans-serif;
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 0.35rem;
}
.lead {
  font-family: sans-serif;
  font-size: 1.05rem;
  font-weight: 500;
  margin: 0 0 0.6rem;
}
.body {
  font-family: sans-serif;
  font-size: 0.95rem;
  line-height: 1.65;
  margin: 0;
}`,
            height: 210,
          },
          {
            type: 'tip',
            id: 'c-l44-t1',
            title: 'Pairs get old faster than you think',
            body: 'A pairing that felt fresh two years ago is now the default look of half the internet. If a combination is going to age badly, keep the structural part and refresh the typeface.',
          },
          {
            type: 'warning',
            id: 'c-l44-w1',
            title: 'Line length beats typeface choice',
            body: 'A beautiful body face set to 120 characters a line is unreadable. Constrain your paragraphs to roughly 45 to 75 characters with `max-width` in `em` or `ch` and the pairing will look fine whatever it is.',
          },
          {
            type: 'exercise',
            id: 'c-l44-x1',
            exercise: {
              id: 'ex-l44',
              instructions:
                'Build a two-family editorial pairing: `.title` uses a serif stack, `.lede` uses a sans-serif stack. Both need a terminating generic.',
              languages: ['css'],
              starterCode: {
                html: '<h2 class="title">The Long Read</h2>\n<p class="lede">A standfirst that introduces the piece in one sentence.</p>',
                css: '.title {\n  font-family: ;\n}\n.lede {\n  font-family: ;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l44-t1',
                  label: 'The title ends in serif',
                  body: 'return /serif\\s*$/.test(getComputedStyle(document.querySelector(".title")).fontFamily.trim())',
                },
                {
                  id: 'ex-l44-t2',
                  label: 'The lede ends in sans-serif',
                  body: 'return /sans-serif\\s*$/.test(getComputedStyle(document.querySelector(".lede")).fontFamily.trim())',
                },
                {
                  id: 'ex-l44-t3',
                  label: 'The two families are genuinely different',
                  body: 'return getComputedStyle(document.querySelector(".title")).fontFamily !== getComputedStyle(document.querySelector(".lede")).fontFamily',
                },
                {
                  id: 'ex-l44-t4',
                  label: 'Both stacks offer at least two candidates',
                  body: 'return getComputedStyle(document.querySelector(".title")).fontFamily.split(",").length >= 2 && getComputedStyle(document.querySelector(".lede")).fontFamily.split(",").length >= 2',
                },
              ],
              hints: [
                'A pairing needs two different families, one per role.',
                'Each role gets a stack that ends in the generic matching its role.',
                'Try `font-family: Georgia, serif;` and `font-family: Arial, Helvetica, sans-serif;`',
              ],
              solution: {
                html: '<h2 class="title">The Long Read</h2>\n<p class="lede">A standfirst that introduces the piece in one sentence.</p>',
                css:
                  '.title {\n  font-family: Georgia, serif;\n}\n.lede {\n  font-family: Arial, Helvetica, sans-serif;\n}\n',
              },
              testNotes:
                'The third test fails if you used the same stack for both roles, which is the mistake this exercise is about.',
            },
          },
        ],
      },
      {
        id: 'css-l45',
        title: 'Font Shorthand',
        description:
          'One declaration that sets style, weight, size, line height and family — and resets everything you did not list.',
        duration: 6,
        objectives: [
          'Write the font shorthand in its required order',
          'Explain why the size and line-height need a slash',
          'List the font properties the shorthand resets',
          'Predict what a shorthand does to properties declared earlier',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l45-b1',
            body: 'The `font` shorthand sets `font-style`, `font-variant`, `font-weight`, `font-stretch`, `font-size`, `line-height` and `font-family` in one declaration. It is short, it is order-sensitive, and it resets every one of those properties that you did not mention.',
          },
          {
            type: 'demo',
            id: 'c-l45-d1',
            title: 'Four longhand declarations, one shorthand',
            body: 'Both paragraphs render identically. The top one spells out four properties; the bottom one uses a single `font` declaration.',
            html: `<p class="longhand">The same result, written the long way.</p>
<p class="shorthand">The same result, written once.</p>`,
            css: `.longhand {
  font-family: Georgia, serif;
  font-size: 22px;
  font-weight: 700;
  font-style: italic;
  margin: 0 0 0.75rem;
}
.shorthand {
  font: italic 700 22px/1.3 Georgia, serif;
  margin: 0 0 0.75rem;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l45-b2',
            body: 'The bottom declaration reads left to right: `italic` for style, `700` for weight, `22px` for size, `/1.3` for line height, then the family list. Every part is optional except the size and the family, and the order is fixed.',
          },
          {
            type: 'heading',
            id: 'c-l45-h1',
            level: 3,
            body: 'The required order',
          },
          {
            type: 'code',
            id: 'c-l45-c1',
            language: 'css',
            title: 'The syntax, slot by slot',
            code: `font: [font-style] [font-variant] [font-weight] [font-stretch] font-size[/line-height] font-family;

font: italic small-caps bold condensed 24px/1.4 Georgia, serif;
font: 700 1.5rem/1.2 system-ui, sans-serif;
font: normal normal normal normal 16px/normal "Courier New", monospace;`,
          },
          {
            type: 'list',
            id: 'c-l45-l1',
            style: 'bullet',
            items: [
              '**Style first** — `normal`, `italic` or `oblique`.',
              '**Variant** — `small-caps` is accepted here.',
              '**Weight** — a number from 100 to 900, or `bold`/`normal`.',
              '**Stretch** — a width keyword or percentage.',
              '**Size** — required, and the first place a length is allowed. Its position is what lets a browser parse the rest.',
              '**Line height** — optional, after a slash. `22px/1.3`, `22px/28px`, or the keyword `normal`. No spaces around the slash.',
              '**Family** — required, last. Unquoted or quoted, single entry or a stack.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l45-w1',
            title: 'The shorthand resets everything it does not list',
            body: '`font: 16px Georgia, serif;` does not just set size and family. It sets style to `normal`, weight to `400`, stretch to `normal` and variant to `normal` as well. Anything you set earlier with a longhand is wiped, which is why `font` is such a common source of "why did my bold disappear".',
          },
          {
            type: 'heading',
            id: 'c-l45-h2',
            level: 3,
            body: 'The reset in practice',
          },
          {
            type: 'demo',
            id: 'c-l45-d2',
            title: 'A bold rule killed by a later shorthand',
            body: 'Both headings start bold and italic from a shared rule. The second one also receives a `font` shorthand, which resets its weight and style back to normal before the class rule re-applies the style.',
            html: `<h4 class="broken">Bold set in a rule</h4>
<h4 class="broken fixed">Bold set in a rule, then reset</h4>`,
            css: `.broken {
  font-weight: 700;
  font-style: italic;
  font-size: 20px;
  margin: 0 0 0.6rem;
}
.fixed {
  font: 20px Georgia, serif;
}`,
            height: 190,
          },
          {
            type: 'text',
            id: 'c-l45-b3',
            body: 'The lower heading lost its weight because the shorthand arrived later and reset it. The same applies to properties most people forget: `font-size-adjust`, `font-kerning`, `font-variant-*` and `font-feature-settings` are all reset to their initial values by a `font` shorthand. If you tuned `font-size-adjust` on an element and a shorthand later touches it, the tuning is gone.',
          },
          {
            type: 'code',
            id: 'c-l45-c2',
            language: 'css',
            title: 'Safe order, or avoid the shorthand',
            code: `.card {
  font: normal normal 400 1rem/1.6 system-ui, sans-serif;
}

.title {
  font-size: 2rem;
  line-height: 1.15;
  font-family: Georgia, serif;
}`,
          },
          {
            type: 'tip',
            id: 'c-l45-t1',
            title: 'Longhands scale better than the shorthand',
            body: 'Longhand properties are order-independent and override predictably. Reserve `font` for a reset at the top of a stylesheet where a hard reset is exactly what you want.',
          },
          {
            type: 'exercise',
            id: 'c-l45-x1',
            exercise: {
              id: 'ex-l45',
              instructions:
                'Replace the longhand block on `.banner` with a single `font` shorthand that sets italic, weight 700, 24px size, 1.4 line height and a serif family.',
              languages: ['css'],
              starterCode: {
                html: '<div class="banner">Announcement</div>',
                css:
                  '.banner {\n  font-style: italic;\n  font-weight: 700;\n  font-size: 24px;\n  line-height: 1.4;\n  font-family: Georgia, serif;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l45-t1',
                  label: 'The text renders italic',
                  body: 'return getComputedStyle(document.querySelector(".banner")).fontStyle === "italic"',
                },
                {
                  id: 'ex-l45-t2',
                  label: 'The weight is 700',
                  body: 'return getComputedStyle(document.querySelector(".banner")).fontWeight === "700"',
                },
                {
                  id: 'ex-l45-t3',
                  label: 'The size is 24px',
                  body: 'return getComputedStyle(document.querySelector(".banner")).fontSize === "24px"',
                },
                {
                  id: 'ex-l45-t4',
                  label: 'The line height is 1.4',
                  body: 'return Math.abs(parseFloat(getComputedStyle(document.querySelector(".banner")).lineHeight) - 33.6) < 0.5',
                },
                {
                  id: 'ex-l45-t5',
                  label: 'The family ends in a generic serif',
                  body: 'return /serif\\s*$/.test(getComputedStyle(document.querySelector(".banner")).fontFamily.trim())',
                },
              ],
              hints: [
                'The order is fixed: style, weight, size/line-height, family.',
                'Line height goes after the size, separated by a slash with no spaces.',
                'Try `font: italic 700 24px/1.4 Georgia, serif;`',
              ],
              solution: {
                html: '<div class="banner">Announcement</div>',
                css: '.banner {\n  font: italic 700 24px/1.4 Georgia, serif;\n}\n',
              },
              testNotes:
                'The tests read the resolved computed values. `line-height: 1.4` on a 24px font computes to 33.6px.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s16',
      title: 'CSS Fonts quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s16-q1',
          type: 'multiple-choice',
          prompt: 'What is the last entry in a well-formed `font-family` stack?',
          options: [
            'The most fashionable family available',
            'A generic family like `serif` or `sans-serif`',
            'The family the designer preferred',
            'Nothing — the stack may end anywhere',
          ],
          answer: 1,
          explanation:
            'A generic family is the one entry that cannot fail, because every browser ships one. It guarantees readable text no matter what is missing.',
        },
        {
          id: 'quiz-css-s16-q2',
          type: 'identify-error',
          prompt: 'Why does this rule not produce the font you intended?',
          code: `.brand {
  font-family: Trebuchet MS, sans-serif;
}`,
          options: [
            '`font-family` cannot be set on a class',
            'The family name with a space must be quoted',
            '`sans-serif` is not a valid family',
            'The comma is not allowed',
          ],
          answer: 1,
          explanation:
            'Without quotes the browser reads `Trebuchet` and `MS` as two separate families. Write `"Trebuchet MS", sans-serif`.',
        },
        {
          id: 'quiz-css-s16-q3',
          type: 'multiple-choice',
          prompt: 'Which unit is safest for body text, and why?',
          options: [
            '`px`, because it is precise',
            '`pt`, because it is the print standard',
            '`rem`, because it follows the reader\'s font-size preference and never compounds',
            '`vw`, because it fits the screen',
          ],
          answer: 2,
          explanation:
            '`rem` scales with the root font size so browser zoom preferences are honoured, and measuring from the root means nested sizes do not multiply.',
        },
        {
          id: 'quiz-css-s16-q4',
          type: 'true-false',
          prompt: 'A `font` shorthand only sets the properties you write into it.',
          answer: false,
          explanation:
            'It resets every font longhand to its initial value, including `font-size-adjust`, `font-weight` and `font-style`, whether or not you mention them.',
        },
        {
          id: 'quiz-css-s16-q5',
          type: 'code-output',
          prompt: 'What does this set?',
          code: `.lede {
  font: italic 700 1.5rem/1.3 Georgia, serif;
}`,
          options: [
            'Italic, bold, 24px, 1.3 line height, Georgia or a serif fallback',
            'Italic, bold, 24px, Georgia only — line height is not part of `font`',
            'Only italic and the family; the rest is ignored',
            'Nothing — `font` requires every slot to be filled',
          ],
          answer: 0,
          explanation:
            '`1.5rem` is 24px at a 16px root, and the value after the slash sets line height. Every slot in the shorthand is optional except size and family.',
        },
      ],
    },
  },
  {
    id: 'css-s17',
    title: 'CSS Icons',
    description:
      'Choosing between icon fonts, inline SVG and sprites, and styling whatever you pick with CSS.',
    lessons: [
      {
        id: 'css-l46',
        title: 'Icons',
        description:
          'Icon fonts, inline SVG and sprites compared, plus sizing icons with width and height and colouring them with currentColor.',
        duration: 7,
        objectives: [
          'Compare icon fonts, inline SVG and sprite sheets',
          'Size an icon with width and height and know why that works',
          'Colour an icon with currentColor so it inherits text colour',
          'Decide which technique suits a given project',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'c-l46-b1',
            body: 'Icons are small pieces of interface. There are three ways to put them in a page, and all three are styled with ordinary CSS: an **icon font** where each glyph is a character, an **inline SVG** where the path lives in the markup, and a **sprite sheet** where many paths share one file.',
          },
          {
            type: 'demo',
            id: 'c-l46-d1',
            title: 'Inline SVG icons',
            body: 'Three buttons, each holding a small inline SVG. Nothing was downloaded: the shapes are part of the markup, so they render immediately and take their colour from the text around them.',
            html: `<div class="toolbar">
  <button type="button" class="tool"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 12h14M12 5v14" /></svg> Add</button>
  <button type="button" class="tool"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg> History</button>
  <button type="button" class="tool"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 7h16v12H4zM8 7V5h8v2" /></svg> Archive</button>
</div>`,
            css: `.toolbar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.tool {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: sans-serif;
  font-size: 14px;
  color: #0b7285;
  background: #e6f7fb;
  border: 1px solid #99e9f2;
  border-radius: 8px;
  padding: 0.45rem 0.8rem;
}
.tool svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.tool:hover {
  background: #d3f4f9;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l46-b2',
            body: 'Each `svg` is 20 by 20 pixels and draws its shape as a stroke rather than a fill. The `stroke: currentColor` line is the important one: the stroke takes the value of the `color` property, so these icons are the same teal as the text and would follow a button into its hover state without any extra CSS.',
          },
          {
            type: 'heading',
            id: 'c-l46-h1',
            level: 3,
            body: 'The three techniques',
          },
          {
            type: 'list',
            id: 'c-l46-l1',
            style: 'bullet',
            items: [
              '**Icon font** — one webfont where each glyph is a character, so you write `<span class="icon icon-search"></span>`. Colour and size work like text, and it is one request for hundreds of icons. The costs: screen readers announce gibberish unless you handle `aria-hidden` everywhere, you cannot style parts of a glyph, and it blocks on a font download.',
              '**Inline SVG** — the `<path>` markup sits in the document. Stylable with `fill`, `stroke` and any CSS property, no extra request, no flash of missing icon. The cost is HTML weight, since every instance repeats the path.',
              '**Sprite sheet** — one SVG file containing many symbols, referenced with `<use href="icons.svg#search">`. One cached request for the whole set, and the file is fetched once. Costs: a same-origin request, and it will not render from `file://` or cross-origin.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l46-h2',
            level: 3,
            body: 'Sizing and colouring',
          },
          {
            type: 'text',
            id: 'c-l46-b3',
            body: 'An `svg` element is a replaced element, so it has an intrinsic size. Setting `width` and `height` in CSS scales the whole thing, and the `viewBox` attribute is what makes that possible: it declares the coordinate system the path was drawn in, and the browser maps it onto whatever size you give the element. Change `width` and `height` together to keep the aspect ratio, or set one and leave the other alone only if you also add `aspect-ratio`.',
          },
          {
            type: 'code',
            id: 'c-l46-c1',
            language: 'css',
            title: 'Sizing and inheriting colour',
            code: `.icon {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
}

.icon--large {
  width: 32px;
  height: 32px;
}

.link {
  color: teal;
}

.link .icon {
  vertical-align: -0.15em;
}`,
          },
          {
            type: 'list',
            id: 'c-l46-l2',
            style: 'bullet',
            items: [
              '**`width` and `height`** are the only reliable way to resize an SVG. `font-size` does nothing to it.',
              '**`currentColor`** resolves to the computed value of `color` on the same element, so a stroke or fill written that way tracks the surrounding text and any hover, active or disabled state for free.',
              '**`fill: none` plus `stroke`** is the usual recipe for a line icon. A solid shape uses `fill: currentColor` and no stroke instead.',
              '**`vertical-align`** is how you align an icon with text next to it. `-0.15em` is the usual value for a 20px icon on a 16px line.',
              '**`aria-hidden="true"`** on a decorative icon keeps a screen reader from announcing the path data when the icon sits next to a text label.',
            ],
          },
          {
            type: 'example',
            id: 'c-l46-e1',
            title: 'One icon, three states, no extra rules',
            body: 'Because the stroke is `currentColor`, the icon inherits whatever colour its container has. Hovering, disabling and a theme colour all work without touching the SVG at all.',
            html: `<button type="button" class="act primary">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> New item
</button>
<button type="button" class="act danger">
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg> Delete
</button>
<button type="button" class="act" disabled>
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v12H4zM8 7V5h8v2" /></svg> Archive
</button>`,
            css: `.act {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: sans-serif;
  font-size: 14px;
  padding: 0.45rem 0.8rem;
  border-radius: 8px;
  border: 1px solid currentColor;
  background: none;
  margin-right: 0.5rem;
}
.act svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
.primary {
  color: teal;
}
.danger {
  color: crimson;
}
.act:disabled {
  color: #9ca3af;
  cursor: not-allowed;
}`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'c-l46-t1',
            title: 'Always give the SVG a viewBox',
            body: 'Without a `viewBox` an SVG has no internal coordinate system, so `width: 20px` clips the artwork instead of scaling it. It is the one attribute that makes CSS sizing behave.',
          },
          {
            type: 'warning',
            id: 'c-l46-w1',
            title: 'Hard-coded colours break theming',
            body: 'A `stroke="#29e2bd"` on the icon freezes that colour in the markup, and it will not follow a dark mode, a hover state or a themed button. Write `stroke: currentColor` in your stylesheet instead.',
          },
          {
            type: 'exercise',
            id: 'c-l46-x1',
            exercise: {
              id: 'ex-l46',
              instructions:
                'Make the SVG inside `.icon-btn` 24px square, give it a stroke that inherits the button\'s text colour, and make the button teal.',
              languages: ['css'],
              starterCode: {
                html:
                  '<button type="button" class="icon-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Save</button>',
                css:
                  '.icon-btn {\n  font-family: sans-serif;\n  font-size: 14px;\n}\n.icon-btn svg {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l46-t1',
                  label: 'The icon is 24px wide',
                  body: 'return getComputedStyle(document.querySelector(".icon-btn svg")).width === "24px"',
                },
                {
                  id: 'ex-l46-t2',
                  label: 'The icon is 24px tall',
                  body: 'return getComputedStyle(document.querySelector(".icon-btn svg")).height === "24px"',
                },
                {
                  id: 'ex-l46-t3',
                  label: 'The button text is teal',
                  body: 'return getComputedStyle(document.querySelector(".icon-btn")).color === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l46-t4',
                  label: 'The icon inherits that colour',
                  body: 'const b = document.querySelector(".icon-btn"); const s = document.querySelector(".icon-btn svg"); return getComputedStyle(s).color === getComputedStyle(b).color',
                },
                {
                  id: 'ex-l46-t5',
                  label: 'The icon is drawn, not filled solid',
                  body: 'return getComputedStyle(document.querySelector(".icon-btn svg")).fill === "none"',
                },
              ],
              hints: [
                'Set `width` and `height` on the `svg`, not on the button.',
                '`currentColor` in the `stroke` value makes the stroke follow the `color` of the element.',
                'Try `stroke: currentColor; stroke-width: 2; fill: none;`',
              ],
              solution: {
                html:
                  '<button type="button" class="icon-btn"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg> Save</button>',
                css:
                  '.icon-btn {\n  font-family: sans-serif;\n  font-size: 14px;\n  color: teal;\n}\n.icon-btn svg {\n  width: 24px;\n  height: 24px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 2;\n}\n',
              },
              testNotes:
                'The fourth test compares the computed `color` on the SVG with the computed `color` on the button, which is what `currentColor` guarantees.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s17',
      title: 'CSS Icons quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s17-q1',
          type: 'multiple-choice',
          prompt: 'Which attribute makes an SVG scalable with CSS `width` and `height`?',
          options: ['`class`', '`viewBox`', '`fill`', '`href`'],
          answer: 1,
          explanation:
            '`viewBox` declares the coordinate system the artwork was drawn in, so the browser can map it onto any size you set. Without it, CSS sizing clips the icon instead of scaling it.',
        },
        {
          id: 'quiz-css-s17-q2',
          type: 'multiple-choice',
          prompt: 'What does `stroke: currentColor` do?',
          options: [
            'Paints the icon a fixed brand colour',
            'Makes the stroke take the computed value of the `color` property',
            'Fills the shape with the text colour',
            'Renders the icon in the browser default colour',
          ],
          answer: 1,
          explanation:
            '`currentColor` resolves to the element\'s own computed `color`, so the icon follows the surrounding text and any hover or disabled state with no extra rules.',
        },
        {
          id: 'quiz-css-s17-q3',
          type: 'true-false',
          prompt: 'An icon font is read aloud by screen readers as the letter it contains.',
          answer: false,
          explanation:
            'The raw glyph is announced as noise, and many icon fonts ship private-use characters with no pronunciation at all. Always pair the font with `aria-hidden="true"` and a real text label.',
        },
        {
          id: 'quiz-css-s17-q4',
          type: 'identify-error',
          prompt: 'Why does this icon stay the default colour when the link turns red on hover?',
          code: `a {
  color: red;
}

a .icon {
  stroke: #29e2bd;
  width: 20px;
  height: 20px;
}`,
          options: [
            '`stroke` cannot be set on an SVG',
            'The colour is hard-coded in CSS, so it cannot follow `color`',
            '`width` and `height` are wrong',
            'The rule needs `!important`',
          ],
          answer: 1,
          explanation:
            'A literal `#29e2bd` is fixed. Writing `stroke: currentColor` instead makes the stroke resolve from `color`, so it follows the link automatically.',
        },
        {
          id: 'quiz-css-s17-q5',
          type: 'blank',
          prompt:
            'Which SVG element contains one icon shape inside the document itself?',
          answers: ['svg'],
          explanation:
            'An inline `<svg>` element with its own `viewBox` and path markup needs no external request, which is why it renders instantly and never flashes.',
        },
      ],
    },
  },
]
