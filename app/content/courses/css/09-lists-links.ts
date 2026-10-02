import type { Section } from '~/types/content'

export const cssListLinkSections: Section[] = [
  {
    id: 'css-s18',
    title: 'CSS Links',
    description: 'How to style anchors, and how to keep links usable with a mouse, a keyboard and a screen reader.',
    lessons: [
      {
        id: 'css-l47',
        title: 'Links',
        description: 'Style anchors with pseudo-classes, and give keyboard users a focus ring they can actually see.',
        duration: 7,
        objectives: [
          'Style an anchor with `:link`, `:hover`, `:focus-visible`, `:visited` and `:active`',
          'Explain why `:visited` has to come after `:link` and `:hover` in the stylesheet',
          'Keep a visible focus ring on links so keyboard navigation is possible',
          'Decide when removing the underline needs a replacement affordance',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l47-b1',
            body: 'Links are the only elements a browser styles on its own, and it styles them badly by default. An `<a>` element carries a set of pseudo-classes that report its state, and you write one rule per state to take control of how it looks.',
          },
          {
            type: 'demo',
            id: 'c-l47-d1',
            title: 'Links that react to the pointer and to the keyboard',
            body: 'Put the pointer over a link and it changes colour. Press Tab to move through them: a visible ring appears around whichever link has focus, even though nothing has been clicked.',
            html: `<p class="prose">
  Read the <a href="#">style guide</a>, the
  <a href="#">accessibility notes</a>, or the
  <a href="#">release history</a> before you start.
</p>`,
            css: `.prose {
  font-size: 15px;
  line-height: 1.7;
  max-width: 34rem;
}
.prose a {
  color: #1d4ed8;
  text-underline-offset: 3px;
}
.prose a:hover {
  color: #b91c1c;
  text-decoration-thickness: 2px;
}
.prose a:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
  border-radius: 2px;
}`,
            height: 150,
          },
          {
            type: 'text',
            id: 'c-l47-b2',
            body: 'The underline is the browser default and you should keep it. Colour alone is not enough to mark something as a link: someone who cannot distinguish your link blue from your body grey has no way to know a word is a link. If you strip the underline you owe the reader something else — a thicker or differently coloured underline, a background, a border.',
          },
          {
            type: 'heading',
            id: 'c-l47-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l47-c1',
            language: 'css',
            title: 'The five states of a link',
            code: `a           { color: #1d4ed8; }
a:link      { color: #1d4ed8; }
a:visited   { color: #6b21a8; }
a:hover     { color: #b91c1c; }
a:active    { color: #000; }
a:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}`,
            highlightLines: [7, 8, 9],
          },
          {
            type: 'list',
            id: 'c-l47-l1',
            style: 'bullet',
            items: [
              '`:link` matches an `<a>` with an `href` that has not been visited. It never matches a plain `<a>` with no `href`, which is why `a {}` and `a:link {}` are not the same.',
              '`:hover` matches while the pointer is over the element. It is the state most designers reach for first.',
              '`:focus` matches whenever the link has focus, however it got there. `:focus-visible` matches only when the browser decides the focus should be shown — for keyboard and other non-pointer input. Use `:focus-visible`, so a mouse click does not leave a ring sitting on the page.',
              '`:visited` matches a link already followed. It must be written **after** `:link` and `:hover`, because those two have the same specificity and the later rule wins for every link.',
              '`:active` matches the brief moment the pointer is down on the link.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l47-t1',
            title: '`:visited` is deliberately crippled',
            body: 'For privacy, browsers ignore any `:visited` declaration that changes `color` or `background-color` to a value the browser did not already allow while unvisited. You can usually make a visited link *darker* or *less saturated* than your unvisited colour, but a new hue is silently thrown away. Test it with a link you have actually clicked.',
          },
          {
            type: 'warning',
            id: 'c-l47-w1',
            title: 'Never remove the focus outline without a replacement',
            body: '`a:focus { outline: none; }` is the single most common accessibility regression on the web. A keyboard user gets no idea where they are, and a visible `:focus-visible` ring costs you two lines of CSS. If the default ring clashes with your design, restyle it — never delete it.',
          },
          {
            type: 'exercise',
            id: 'c-l47-x1',
            exercise: {
              id: 'ex-l47',
              instructions:
                'Style the link so it is teal, turns dark orange on hover, and has a visible focus ring. The tests check the live computed style.',
              languages: ['css'],
              starterCode: {
                html: '<p>Open the <a href="#">documentation</a> to get started.</p>',
                css: 'a {\n  \n}\n\na:hover {\n  \n}\n\na:focus-visible {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l47-t1',
                  label: 'The link is teal',
                  body: 'return getComputedStyle(document.querySelector("a")).color === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l47-t2',
                  label: 'The link changes colour on hover',
                  body: 'let hovered = false; const a = document.querySelector("a"); const sheet = [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules] } catch { return [] } }); const rules = sheet.filter((r) => r.selectorText && r.selectorText.includes("a:hover")); for (const r of rules) { if (r.style && r.style.color) hovered = true } return hovered',
                },
                {
                  id: 'ex-l47-t3',
                  label: 'A focus outline is set on the link',
                  body: 'const sheet = [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules] } catch { return [] } }); const rule = sheet.find((r) => r.selectorText && r.selectorText.includes("focus-visible") && r.selectorText.includes("a")); return Boolean(rule && rule.style && rule.style.outlineStyle && rule.style.outlineStyle !== "none")',
                },
              ],
              hints: [
                'Colour on `a` for the resting state, a second rule on `a:hover` for the pointer state, and a third on `a:focus-visible` for the ring.',
                'Teal is `#008080`, which computes to `rgb(0, 128, 128)`.',
                'Try `a { color: #008080; }`, `a:hover { color: #b45309; }`, and `a:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }`.',
              ],
              solution: {
                html: '<p>Open the <a href="#">documentation</a> to get started.</p>',
                css: 'a {\n  color: #008080;\n}\n\na:hover {\n  color: #b45309;\n}\n\na:focus-visible {\n  outline: 3px solid #f59e0b;\n  outline-offset: 2px;\n}\n',
              },
              testNotes:
                'The first test reads the computed colour of the anchor. The other two inspect the rules in the page stylesheet, because `:hover` and `:focus-visible` cannot be triggered programmatically.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s18',
      title: 'CSS Links quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s18-q1',
          type: 'multiple-choice',
          prompt: 'Why must the `:visited` rule come after `:link` and `:hover`?',
          options: [
            'Because `:visited` only works on anchors with an `href`',
            'Because they have equal specificity and the later rule wins',
            'Because `:visited` has higher specificity than everything',
            'Because browsers ignore `:visited` in the middle of a stylesheet',
          ],
          answer: 1,
          explanation:
            '`a:link`, `a:visited` and `a:hover` all have the same specificity (0,1,1), so the last one in source order applies. Put `:visited` first and it never matches anything.',
        },
        {
          id: 'quiz-css-s18-q2',
          type: 'true-false',
          prompt: 'You can safely set `a { outline: none; }` as long as the link still changes colour on hover.',
          answer: false,
          explanation:
            'A hover style helps mouse users only. A keyboard user needs a focus indicator, and removing the outline without replacing it makes the page unusable by keyboard.',
        },
        {
          id: 'quiz-css-s18-q3',
          type: 'code-output',
          prompt: 'What does this produce?',
          code: 'a:focus-visible { outline: 2px dashed #111; }',
          options: [
            'A focus ring on every link, even after a mouse click',
            'A focus ring only when the browser decides focus should be visible',
            'A dashed border around every link at all times',
            'Nothing — `:focus-visible` needs `:hover` first',
          ],
          answer: 1,
          explanation:
            '`:focus-visible` matches only when the user is navigating by keyboard or another non-pointer means, which is exactly why it is the right choice over `:focus`.',
        },
        {
          id: 'quiz-css-s18-q4',
          type: 'multiple-choice',
          prompt: 'A browser ignores your `:visited` rule. What is the most likely reason?',
          options: [
            '`:visited` is not a real pseudo-class',
            'You wrote it after `a:link` so it is fine — check the selector instead',
            'You changed `color` to a value the browser will not allow on visited links',
            'The rule needs `!important`',
          ],
          answer: 2,
          explanation:
            'For privacy, browsers only permit a limited set of `:visited` colour changes. A colour the user never saw on an unvisited link is silently discarded.',
        },
        {
          id: 'quiz-css-s18-q5',
          type: 'blank',
          prompt: 'Complete the sentence: colour alone must never be the only signal that a link is a link, which is why the ________ is the browser default.',
          answers: ['underline', 'underlining', 'text underline'],
          explanation:
            'The underline works regardless of colour perception. Removing it means providing another affordance — a thicker underline, a background, or a border.',
        },
      ],
    },
  },
  {
    id: 'css-s19',
    title: 'CSS Lists',
    description: 'The four list properties, the ::marker pseudo-element, and when removing bullets is a mistake.',
    lessons: [
      {
        id: 'css-l48',
        title: 'Lists',
        description: 'Control bullets, numbering and marker position, style the marker with ::marker, and know when `list-style: none` costs you semantics.',
        duration: 7,
        objectives: [
          'Set the marker with `list-style-type`, `list-style-image` and `list-style-position`',
          'Predict whether text wraps flush left or aligns under a marker, and why',
          'Style a marker directly with the `::marker` pseudo-element',
          'Explain when `list-style: none` removes accessibility semantics and what to do instead',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l48-b1',
            body: 'A list is an element with a marker attached to each item — a bullet, a number, or an image — and you control the marker with four properties. Three of them set it, and one decides where the text starts.',
          },
          {
            type: 'demo',
            id: 'c-l48-d1',
            title: 'Four marker styles side by side',
            body: 'Four lists, four marker styles. The last one keeps the disc but paints it with a CSS gradient, so the marker no longer inherits the text colour.',
            html: `<div class="markers">
  <ul class="m-disc"><li>Disc</li><li>Default bullet</li></ul>
  <ul class="m-square"><li>Square</li><li>A solid block</li></ul>
  <ul class="m-circle"><li>Circle</li><li>An outlined bullet</li></ul>
  <ol class="m-decimal"><li>Decimal</li><li>Numbers, in order</li></ol>
  <ul class="m-custom"><li>Coloured marker</li><li>Set with ::marker</li></ul>
</div>`,
            css: `.markers {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-size: 14px;
}
.markers ul,
.markers ol {
  margin: 0;
}
.m-disc { list-style-type: disc; }
.m-square { list-style-type: square; }
.m-circle { list-style-type: circle; }
.m-decimal { list-style-type: decimal; }
.m-custom { list-style-type: square; }
.m-custom li::marker {
  background: linear-gradient(135deg, #29e2bd, #7c3aed);
  color: transparent;
}`,
            height: 150,
          },
          {
            type: 'text',
            id: 'c-l48-b2',
            body: 'Each marker type is a single keyword on `list-style-type`. The gradient in the last list shows that `::marker` can be styled almost like an element, including a background image — with no external file to download.',
          },
          {
            type: 'heading',
            id: 'c-l48-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l48-c1',
            language: 'css',
            title: 'The four list properties',
            code: `ul { list-style-type: square; }
li { list-style-position: outside; }

ul { list-style-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Ccircle cx='5' cy='5' r='4' fill='%2329e2bd'/%3E%3C/svg%3E"); }

ul { list-style: square url(marker.png) inside; }

li::marker { color: #7c3aed; font-size: 1.1em; }`,
            highlightLines: [6],
          },
          {
            type: 'list',
            id: 'c-l48-l1',
            style: 'bullet',
            items: [
              '`list-style-type` picks the marker shape: `disc`, `circle`, `square`, `none`, or a counter format such as `decimal`, `lower-roman`, `decimal-leading-zero`.',
              '`list-style-image` replaces the marker with an image. It wins over `list-style-type` whenever it resolves to an actual image. If the file fails to load, the fallback is `none`, not the type.',
              '`list-style-position` decides the wrap. `outside` (the default) hangs the marker in the margin so wrapped text aligns under the item content. `inside` puts the marker in the flow, so the second line of a long item starts under the bullet.',
              '`list-style` is the shorthand and takes type, image and position in that order, exactly like `background` or `font`.',
              '`::marker` is a pseudo-element targeting just the marker box. Only a limited set of properties apply to it — `color`, `font-*`, `content`, and text properties. Layout properties like `margin` or `position` do nothing.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l48-w1',
            title: '`list-style: none` can remove the list for screen readers',
            body: 'Some assistive technology treats a `<ul>` with `list-style: none` as a plain group of items and stops announcing "list, 4 items". That matters for navigation and for content lists. When you need bullets gone for layout reasons, keep the semantics by adding `role="list"` to the `<ul>` in the HTML, or use `<nav>` with labelled links, which carries its own semantics.',
          },
          {
            type: 'example',
            id: 'c-l48-e1',
            title: 'Inside versus outside, and when `none` is legitimate',
            body: 'Left: a long item with the marker outside, so the wrapped line aligns with the text. Right: the same list with the marker inside, so the wrap runs back under the bullet. Below, a plain `<ul>` used purely to hold a row of tags — layout use, where the bullets were never meaningful and removing them is fine.',
            html: `<div class="pair">
  <div>
    <p class="cap">outside</p>
    <ul class="out">
      <li>A long item that has to wrap onto a second line, which is where the difference shows.</li>
    </ul>
  </div>
  <div>
    <p class="cap">inside</p>
    <ul class="in">
      <li>A long item that has to wrap onto a second line, which is where the difference shows.</li>
    </ul>
  </div>
</div>
<ul class="tags">
  <li>beta</li><li>stable</li><li>deprecated</li>
</ul>`,
            css: `.pair { display: flex; gap: 1.5rem; font-size: 14px; }
.cap { margin: 0 0 .35rem; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: #64748b; }
.out { list-style-position: outside; margin: 0; }
.in { list-style-position: inside; margin: 0; }
.tags { display: flex; gap: .5rem; list-style: none; padding: 0; margin: 1rem 0 0; font-size: 13px; }
.tags li { border: 1px solid #d5dae0; border-radius: 999px; padding: .2rem .7rem; }`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l48-x1',
            exercise: {
              id: 'ex-l48',
              instructions:
                'Give the list square markers, put them inside the text, and paint the markers with `::marker`. The tests read the live computed style.',
              languages: ['css'],
              starterCode: {
                html: '<ul class="steps">\n  <li>Measure</li>\n  <li>Cut</li>\n  <li>Fit</li>\n</ul>',
                css: '.steps {\n  \n}\n\n.steps li::marker {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l48-t1',
                  label: 'The markers are squares',
                  body: 'return getComputedStyle(document.querySelector(".steps")).listStyleType === "square"',
                },
                {
                  id: 'ex-l48-t2',
                  label: 'The markers sit inside the text',
                  body: 'return getComputedStyle(document.querySelector(".steps")).listStylePosition === "inside"',
                },
                {
                  id: 'ex-l48-t3',
                  label: 'The marker colour is set through ::marker',
                  body: 'const sheet = [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules] } catch { return [] } }); const rule = sheet.find((r) => r.selectorText && r.selectorText.includes("::marker")); return Boolean(rule && rule.style && rule.style.color)',
                },
              ],
              hints: [
                '`list-style-type` and `list-style-position` both go on the `<ul>`; `list-style` is the shorthand if you prefer.',
                '`::marker` targets the marker box, and only a few properties apply to it — `color` is one of them.',
                'Try `.steps { list-style-type: square; list-style-position: inside; }` and `.steps li::marker { color: #7c3aed; }`.',
              ],
              solution: {
                html: '<ul class="steps">\n  <li>Measure</li>\n  <li>Cut</li>\n  <li>Fit</li>\n</ul>',
                css: '.steps {\n  list-style-type: square;\n  list-style-position: inside;\n}\n\n.steps li::marker {\n  color: #7c3aed;\n}\n',
              },
              testNotes:
                'The first two tests read the computed list style of the `<ul>`. The third inspects the `::marker` rule, since a marker box cannot be queried directly.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s19',
      title: 'CSS Lists quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s19-q1',
          type: 'multiple-choice',
          prompt: 'What does `list-style-position: outside` do to wrapped text?',
          options: [
            'The marker hangs in the margin, so wrapped lines align with the item content',
            'The marker moves inside, so wrapped lines start under the bullet',
            'The wrapped text is hidden',
            'The marker repeats on every line',
          ],
          answer: 0,
          explanation:
            '`outside` is the default. The marker is placed outside the principal box, which is why a long item wraps to a clean edge aligned with the text.',
        },
        {
          id: 'quiz-css-s19-q2',
          type: 'true-false',
          prompt: 'Setting `list-style: none` on a navigation list is always fine, because the links are still focusable.',
          answer: false,
          explanation:
            'Some screen readers stop announcing list structure once `list-style: none` is applied. Keep the semantics by adding `role="list"`, or by wrapping the links in a `<nav>` with an accessible name.',
        },
        {
          id: 'quiz-css-s19-q3',
          type: 'code-output',
          prompt: 'What marker does this produce?',
          code: 'ul { list-style: square url(missing.png) inside; }',
          options: [
            'A green square image',
            'A square bullet, positioned inside',
            'No marker at all',
            'A numbered list inside the items',
          ],
          answer: 1,
          explanation:
            '`list-style` takes type, image and position. When the image fails to load, the marker falls back to `none` for the image part only, so the `square` type still applies.',
        },
        {
          id: 'quiz-css-s19-q4',
          type: 'identify-error',
          prompt: 'This rule is meant to push the bullet further left. What is wrong with it?',
          code: 'li::marker { position: absolute; left: -20px; }',
          options: [
            'The pseudo-element is misspelled',
            'Layout properties such as position and left do not apply to a marker box',
            'The selector must be `li > ::marker`',
            'Marker styling must go in a media query',
          ],
          answer: 1,
          explanation:
            '`::marker` accepts only colour, font, content and text properties. Layout properties are ignored, which is why a bullet cannot be positioned with CSS.',
        },
        {
          id: 'quiz-css-s19-q5',
          type: 'blank',
          prompt: 'Complete the sentence: `list-style-type: none` is legitimate when the list is used purely for ________ and the bullets carried no meaning.',
          answers: ['layout', 'layout purposes', 'layout only'],
          explanation:
            'Using a `<ul>` as a layout device is fine — the semantics were never the point. Removing bullets from a real content or navigation list is the risky case.',
        },
      ],
    },
  },
]