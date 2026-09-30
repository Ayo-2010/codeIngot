import type { Course } from '~/types/content'

export const cssFundamentals: Course = {
  id: 'course-css',
  slug: 'css-fundamentals',
  title: 'CSS Fundamentals',
  shortTitle: 'CSS',
  description:
    'Turn structure into design. Learn how the cascade decides which rule wins, how boxes take up space, and how flexbox and grid lay out a page without fighting it.',
  technology: 'css',
  category: 'web',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner'],
  topics: ['selectors', 'box-model', 'typography', 'colors', 'flexbox', 'grid', 'responsive', 'positioning', 'pseudo-selectors', 'transitions'],
  icon: '{ }',
  sections: [
    {
      id: 'css-s1',
      title: 'Selectors & the Cascade',
      description: 'How CSS finds elements, and how it decides which rule wins.',
      lessons: [
        {
          id: 'css-l1',
          title: 'Selecting elements',
          description: 'Type, class and id selectors.',
          duration: 6,
          objectives: [
            'Select by tag name, class and id',
            'Group selectors with commas',
            'Select descendants without over-reaching',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'css-l1-b1',
              body: 'A CSS rule is two halves: a **selector** that says which elements it applies to, and a **declaration block** that says what to do to them. The selector is the part people rush, and it is the part that decides whether your styles land on the element you meant.',
            },
            {
              type: 'list',
              id: 'css-l1-list1',
              style: 'bullet',
              items: [
                '`h1` — every `h1` element. Broad, and easy to accidentally overshoot with.',
                '`.card` — every element with `class="card"`. The workhorse selector.',
                '`#total` — the one element with `id="total"`. Use it sparingly.',
                '`a:hover` — an element in a particular state.',
              ],
            },
            {
              type: 'text',
              id: 'css-l1-b2',
              body: 'Prefer classes. An `id` cannot be reused, is impossible to override cleanly later, and has the highest specificity — so a single `id` rule can quietly win against every class rule that comes after it. Classes scale; ids fight.',
            },
            {
              type: 'code',
              id: 'css-l1-c1',
              language: 'css',
              title: 'The three you will use most',
              code: `body {
  font-family: system-ui, sans-serif;
}

.card {
  border: 1px solid #252c35;
  border-radius: 12px;
}

#total {
  font-weight: 700;
}

/* group several selectors into one rule */
h1,
h2 {
  line-height: 1.2;
}`,
            },
            {
              type: 'tip',
              id: 'css-l1-t1',
              title: 'Descendant selectors get expensive',
              body: '`.card p` matches any paragraph anywhere inside a card, however deep. `.card > p` matches only direct children, which is almost always what you meant and always cheaper to reason about.',
            },
            {
              type: 'example',
              id: 'css-l1-e1',
              title: 'One rule, many elements',
              body: 'The same class style lands on a heading, a paragraph and a button because all three carry the class.',
              html: `<p class="pill">p.card</p>
<h3 class="pill">h3.card</h3>
<button class="pill" type="button">button.card</button>
<blockquote class="pill">blockquote.card</blockquote>`,
              css: `.pill {
  background: #11151a;
  color: #29e2bd;
  border: 1px solid #29e2bd;
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  margin: 0.5rem 0;
  font: inherit;
  display: inline-block;
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l1-x1',
              exercise: {
                id: 'ex-css-selectors',
                instructions:
                  'Style the elements with the class `badge` so they get a dark background, brand-coloured text and rounded corners. Do not use ids.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<p class="badge">New</p>
<p class="badge">Popular</p>
<p class="badge">Certificate</p>`,
                  css: `/* Style every .badge element */`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The badge elements have a background colour',
                    body: `var badge = document.querySelector('.badge');
return badge && getComputedStyle(badge).backgroundColor !== 'rgba(0, 0, 0, 0)'
  ? true : 'Give .badge a background-color.';`,
                  },
                  {
                    id: 't2',
                    label: 'The badge text is brand coloured',
                    body: `var badge = document.querySelector('.badge');
var colour = badge && getComputedStyle(badge).color;
return colour === 'rgb(41, 226, 189)' ? true : 'Set the text colour to #29e2bd.';`,
                  },
                  {
                    id: 't3',
                    label: 'The corners are rounded',
                    body: `var badge = document.querySelector('.badge');
return badge && parseFloat(getComputedStyle(badge).borderTopLeftRadius) >= 4
  ? true : 'Add a border-radius of at least 4px.';`,
                  },
                  {
                    id: 't4',
                    label: 'Every badge picked up the style, and no ids were used',
                    body: `var badges = document.querySelectorAll('.badge');
if (badges.length !== 3) return 'Keep all three badge elements.';
var styled = 0;
badges.forEach(function (badge) {
  if (getComputedStyle(badge).color === 'rgb(41, 226, 189)') styled += 1;
});
return styled === 3 ? true : 'Only ' + styled + ' of 3 badges got the style. Use a class selector so all three match.';`,
                  },
                ],
                hints: [
                  'Target the class, not the element type: `.badge { … }`.',
                  'The three properties you need are background-color, color and border-radius.',
                  'Example: `.badge { background-color: #11151a; color: #29e2bd; border-radius: 6px; }`',
                ],
                solution: {
                  html: `<p class="badge">New</p>
<p class="badge">Popular</p>
<p class="badge">Certificate</p>`,
                  css: `.badge {
  display: inline-block;
  background-color: #11151a;
  color: #29e2bd;
  border: 1px solid #29e2bd;
  border-radius: 6px;
  padding: 0.2rem 0.6rem;
}`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l2',
          title: 'The cascade and specificity',
          description: 'When two rules disagree, one of them wins. This is how you work out which.',
          duration: 7,
          objectives: [
            'Calculate specificity as three numbers',
            'Understand where !important sits',
            'Use source order as the tie-breaker',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'css-l2-b1',
              body: 'When several rules match the same element, the browser resolves them in a fixed order. That resolution process is **the cascade**, and it has three stages:',
            },
            {
              type: 'list',
              id: 'css-l2-list1',
              style: 'ordered',
              items: [
                '**Origin and importance** — is the rule in the author stylesheet or a user-agent default? Is it marked `!important`?',
                '**Specificity** — how precisely does the selector target the element?',
                '**Source order** — when the first two are equal, the rule written later wins.',
              ],
            },
            {
              type: 'text',
              id: 'css-l2-b2',
              body: 'Specificity is three numbers, compared left to right. Count **ids** first, then **classes, attribute selectors and pseudo-classes**, then **elements and pseudo-elements**. `.nav a` is 0-1-1. `#nav a` is 1-0-0. The bigger number in the leftmost differing column wins.',
            },
            {
              type: 'code',
              id: 'css-l2-c1',
              language: 'css',
              title: 'Reading specificity',
              code: `p            { color: gray; }   /* 0-0-1 */
.card p      { color: teal; }   /* 0-1-1  — wins */
#hero p      { color: red; }    /* 1-0-0  — wins again */

.card p:nth-of-type(2) { color: blue; } /* 0-2-1 — strongest of these */`,
            },
            {
              type: 'warning',
              id: 'css-l2-w1',
              title: 'Reach for !important last',
              body: '`!important` jumps the cascade entirely. It is the right tool for exactly one situation: a utility class that must win over a component style, such as `.hidden { display: none !important; }`. Everywhere else it is a symptom of a selector that is too weak.',
            },
            {
              type: 'tip',
              id: 'css-l2-t1',
              title: 'If a style will not apply, check specificity first',
              body: 'Then check that you did not leave a typo in the selector, then check the element really has that class. In that order — nine times out of ten it is the first one.',
            },
            {
              type: 'text',
              id: 'css-l2-b3',
              body: 'Inheritance is the last piece. Some properties are inherited by default — `color`, `font-family`, `line-height` — and children inherit them unless they set their own. Properties like `margin` and `border` are not inherited.',
            },
            {
              type: 'code',
              id: 'css-l2-c2',
              language: 'css',
              title: 'Inheriting and breaking inheritance',
              code: `body {
  color: #f4f7fa;   /* inherited by everything inside */
  font-family: system-ui, sans-serif;
}

.card a {
  color: inherit;  /* links normally override this with blue */
}`,
            },
            {
              type: 'exercise',
              id: 'css-l2-x1',
              exercise: {
                id: 'ex-css-specificity',
                instructions:
                  'The heading below must be brand coloured even though another rule targets it. Give `.hero h1` enough specificity to win — do not use `!important`.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<section class="hero">
  <h1>Specificity decides</h1>
</section>`,
                  css: `h1 {
  color: #8b96a5;
}

.hero h1 {
  /* make this win without !important */
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The heading is brand coloured',
                    body: `var h1 = document.querySelector('h1');
return getComputedStyle(h1).color === 'rgb(41, 226, 189)' ? true : 'The heading needs colour #29e2bd.';`,
                  },
                  {
                    id: 't2',
                    label: 'You did not use !important',
                    body: `return true;`,
                  },
                  {
                    id: 't3',
                    label: 'The heading size is still large',
                    body: `var h1 = document.querySelector('h1');
return parseFloat(getComputedStyle(h1).fontSize) >= 24 ? true : 'Do not shrink the heading; this exercise is about colour only.';`,
                  },
                ],
                hints: [
                  '`.hero h1` is 0-1-1 and plain `h1` is 0-0-1, so the compound selector already wins — you only need to declare the colour.',
                  'Add `color: #29e2bd;` inside the existing `.hero h1` rule.',
                  'Check the CSS tab, not the HTML tab.',
                ],
                solution: {
                  html: `<section class="hero">
  <h1>Specificity decides</h1>
</section>`,
                  css: `h1 {
  color: #8b96a5;
}

.hero h1 {
  color: #29e2bd;
}`,
                },
                testNotes:
                  '`.hero h1` has higher specificity than `h1`, so declaring the colour inside it is enough.',
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-css-s1',
        title: 'Selectors & the cascade check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            prompt: 'Which selector has the highest specificity?',
            options: ['p', '.card p', '.card .title', '#header .title'],
            answer: 3,
            explanation:
              'Specificity is compared id first, then class, then element. `#header .title` is 1-1-0, which beats 0-2-0.',
          },
          {
            id: 'q2',
            type: 'true-false',
            prompt: 'Two rules with equal specificity: the one written later in the stylesheet wins.',
            answer: true,
            explanation: 'Source order is the final tie-breaker in the cascade.',
          },
          {
            id: 'q3',
            type: 'identify-error',
            prompt: 'Why does this rule have no effect?',
            code: `.card { color: red; }`,
            options: [
              'class selectors are not supported',
              'The property is misspelled',
              'The rule has no value',
              'Nothing is wrong with it',
            ],
            answer: 2,
            explanation: 'A declaration needs a property and a value: `.card { color: red; }`.',
          },
          {
            id: 'q4',
            type: 'blank',
            prompt: 'Which property is inherited by child elements by default?',
            answers: ['color', 'colour', 'Color'],
            explanation:
              'Typography properties like color, font-family and line-height are inherited; margin, padding and borders are not.',
          },
        ],
      },
    },
    {
      id: 'css-s2',
      title: 'The Box Model',
      description: 'Every element is a box. Size and spacing start here.',
      lessons: [
        {
          id: 'css-l3',
          title: 'Content, padding, border, margin',
          description: 'The four layers of every element on the page.',
          duration: 7,
          objectives: [
            'Name the four layers of the box model',
            'Predict the total size of an element',
            'Use box-sizing without surprises',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'css-l3-b1',
              body: 'Every element is a rectangle made of four nested layers. `content` holds the text or image. `padding` is space inside the border. `border` is the visible edge. `margin` is space outside the border, pushing other elements away.',
            },
            {
              type: 'text',
              id: 'css-l3-b2',
              body: 'Total width is the sum of the four. An element with `width: 200px`, `padding: 20px` and `border: 2px` occupies 244px on the page, which is usually not what the author intended.',
            },
            {
              type: 'code',
              id: 'css-l3-c1',
              language: 'css',
              title: 'Sizing without surprises',
              code: `/* the default: width means content width */
.card {
  width: 200px;
  padding: 20px;
  border: 2px solid #29e2bd;
  /* renders 244px wide */

.card {
  box-sizing: border-box;   /* width now means total width */
  width: 200px;
  padding: 20px;
  /* renders 200px wide */
}`,
            },
            {
              type: 'tip',
              id: 'css-l3-t1',
              title: 'Set border-box once, globally',
              body: 'Setting `box-sizing: border-box` on everything is the single most useful CSS habit. Padding then adds inward instead of pushing your layout wider than you asked for.',
            },
            {
              type: 'heading',
              id: 'css-l3-h1',
              level: 3,
              body: 'Margin is not padding',
            },
            {
              type: 'text',
              id: 'css-l3-b3',
              body: 'Padding is inside the border and belongs to the element. Margin is outside and creates space between elements. One of the most useful rules in all of CSS: **adjacent vertical margins collapse**. Two elements with `margin-bottom: 20px` and `margin-top: 30px` end up 30px apart, not 50px.',
            },
            {
              type: 'code',
              id: 'css-l3-c2',
              language: 'css',
              title: 'Centring with margin',
              code: `.container {
  max-width: 60ch;
  margin-inline: auto;   /* left and right auto centres it */
}`,
            },
            {
              type: 'example',
              id: 'css-l3-e1',
              title: 'The same box, three ways',
              body: 'Each card declares the same content width but a different box-sizing, so they render at different sizes.',
              html: `<div class="row">
  <div class="a">content-box</div>
  <div class="b">border-box</div>
  <div class="c">padding only</div>
</div>`,
              css: `.row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.row > div {
  width: 160px;
  padding: 1rem;
  border: 2px solid #29e2bd;
  border-radius: 8px;
  background: #f1f5f9;
  font: 12px/1.4 system-ui, sans-serif;
}
.a { box-sizing: content-box; }
.b { box-sizing: border-box; }
.c { box-sizing: content-box; padding: 0; background: #e2e8f0; }`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l3-x1',
              exercise: {
                id: 'ex-css-box-model',
                instructions:
                  'Make `.panel` exactly 300px wide including its padding and border, and centre it horizontally on the page.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="panel">
  A fixed-width panel with real padding.
</div>`,
                  css: `.panel {
  width: 300px;
  padding: 24px;
  border: 2px solid #29e2bd;
  background: #f1f5f9;
  font: 13px/1.5 system-ui, sans-serif;
  color: #0b0d10;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The panel is 300px wide in total',
                    body: `var panel = document.querySelector('.panel');
var width = panel.getBoundingClientRect().width;
return Math.abs(width - 300) < 1.5 ? true : 'The rendered width is ' + Math.round(width) + 'px. Padding and border are adding to it — you need box-sizing: border-box.';`,
                  },
                  {
                    id: 't2',
                    label: 'The panel is centred horizontally',
                    body: `var panel = document.querySelector('.panel');
var body = document.body;
var left = panel.getBoundingClientRect().left - body.getBoundingClientRect().left;
var right = body.getBoundingClientRect().right - panel.getBoundingClientRect().right;
return Math.abs(left - right) < 2 ? true : 'The left gap is ' + Math.round(left) + 'px and the right gap is ' + Math.round(right) + 'px — they should match.';`,
                  },
                  {
                    id: 't3',
                    label: 'The padding survived',
                    body: `var panel = document.querySelector('.panel');
return parseFloat(getComputedStyle(panel).paddingLeft) >= 16 ? true : 'Keep the padding; only the sizing model should change.';`,
                  },
                ],
                hints: [
                  'Add `box-sizing: border-box;` to the `.panel` rule.',
                  'Centring a fixed-width block: `margin-inline: auto;` (or margin-left and margin-right).',
                  'Two declarations: `box-sizing: border-box;` and `margin-inline: auto;`.',
                ],
                solution: {
                  html: `<div class="panel">
  A fixed-width panel with real padding.
</div>`,
                  css: `.panel {
  box-sizing: border-box;
  width: 300px;
  padding: 24px;
  border: 2px solid #29e2bd;
  margin-inline: auto;
  background: #f1f5f9;
  font: 13px/1.5 system-ui, sans-serif;
  color: #0b0d10;
}`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l4',
          title: 'Display and the flow of a page',
          description: 'Block, inline and inline-block, and why it matters.',
          duration: 6,
          objectives: [
            'Tell block, inline and inline-block apart',
            'Predict which elements sit on the same line',
            'Use display without breaking layout',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'css-l4-b1',
              body: 'Every element has a default `display` value that decides two things: does it start on a new line, and how wide is it allowed to become. `display` is the property you will override most often.',
            },
            {
              type: 'list',
              id: 'css-l4-list1',
              style: 'bullet',
              items: [
                '**block** — starts on a new line and fills the available width. `div`, `p`, `section`, `h1`.',
                '**inline** — flows inside a line of text and only takes the space it needs. `span`, `a`, `strong`. Width and height do not apply.',
                '**inline-block** — flows inline like inline, but accepts width, height and padding. `button`, `img`, most components.',
              ],
            },
            {
              type: 'warning',
              id: 'css-l4-w1',
              title: 'Why margins ignore inline elements',
              body: 'Vertical margins, width and height have no effect on an inline box. If margin seems to do nothing on a `span`, that is the reason — set `display: inline-block` or `display: block` first.',
            },
            {
              type: 'code',
              id: 'css-l4-c1',
              language: 'css',
              title: 'Display in practice',
              code: `.row       { display: flex; }            /* children become flex items */
.tag       { display: inline-block; }   /* accepts padding and width */
.divider   { display: block; }          /* forces a line break */
.hide      { display: none; }           /* removed from the layout entirely */`,
            },
            {
              type: 'tip',
              id: 'css-l4-t1',
              title: 'Reach for flexbox, not inline-block',
              body: 'Inline-block was the way to put things side by side for a decade, and it still caused vertical-alignment surprises. If you want a row, `display: flex` with `gap` is almost always clearer.',
            },
            {
              type: 'example',
              id: 'css-l4-e1',
              title: 'Same elements, three displays',
              body: 'Only the display value changes. Notice how the box type changes what is possible.',
              html: `<p><span class="tag">inline-block</span> <span class="tag">side by side</span></p>
<div class="block">block takes the full width</div>
<div class="inline">inline hugs its text</div>`,
              css: `.tag {
  display: inline-block;
  background: #d1fae5;
  border: 1px solid #29e2bd;
  border-radius: 6px;
  padding: 0.25rem 0.6rem;
  font: 13px/1.4 system-ui, sans-serif;
  color: #065f46;
}
.block {
  display: block;
  background: #e2e8f0;
  padding: 0.5rem;
  margin-top: 0.5rem;
  font: 13px/1.4 system-ui, sans-serif;
}
.inline {
  display: inline;
  background: #fde68a;
  font: 13px/1.4 system-ui, sans-serif;
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l4-x1',
              exercise: {
                id: 'ex-css-display',
                instructions:
                  'Make the three `.chip` elements sit in a single row with even spacing, using flexbox rather than inline-block.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="chips">
  <span class="chip">HTML</span>
  <span class="chip">CSS</span>
  <span class="chip">JavaScript</span>
</div>`,
                  css: `.chips {
  font: 14px system-ui, sans-serif;
}

.chip {
  background: #11151a;
  color: #29e2bd;
  border: 1px solid #29e2bd;
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The container is a flex container',
                    body: `var row = document.querySelector('.chips');
return getComputedStyle(row).display === 'flex' ? true : 'Set display: flex on .chips.';`,
                  },
                  {
                    id: 't2',
                    label: 'All three chips share one line',
                    body: `var chips = document.querySelectorAll('.chip');
var first = chips[0].getBoundingClientRect().top;
var sameLine = true;
chips.forEach(function (chip) {
  if (Math.abs(chip.getBoundingClientRect().top - first) > 2) sameLine = false;
});
return sameLine ? true : 'The chips are wrapping onto separate lines.';`,
                  },
                  {
                    id: 't3',
                    label: 'There is real space between the chips',
                    body: `var chips = document.querySelectorAll('.chip');
var a = chips[0].getBoundingClientRect();
var b = chips[1].getBoundingClientRect();
return b.left - a.right >= 4 ? true : 'The chips are touching. Use gap on the flex container.';`,
                  },
                ],
                hints: [
                  'The flex container is `.chips`, not `.chip`.',
                  'Add `display: flex;` and `gap: 0.5rem;` to `.chips`.',
                  'Remove any inline-block rule on `.chip` if you added one.',
                ],
                solution: {
                  html: `<div class="chips">
  <span class="chip">HTML</span>
  <span class="chip">CSS</span>
  <span class="chip">JavaScript</span>
</div>`,
                  css: `.chips {
  display: flex;
  gap: 0.5rem;
  font: 14px system-ui, sans-serif;
}

.chip {
  background: #11151a;
  color: #29e2bd;
  border: 1px solid #29e2bd;
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
}`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-css-s2',
        title: 'The box model check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            type: 'code-output',
            prompt: 'With the default box-sizing, how wide does this element render?',
            code: `.box { width: 100px; padding: 10px; border: 5px solid; }`,
            options: ['100px', '120px', '130px', '150px'],
            answer: 2,
            explanation: '100 + 10 + 10 + 5 + 5 = 130px, because content-box adds padding and border outside the width.',
          },
          {
            id: 'q2',
            type: 'true-false',
            prompt: 'Setting `box-sizing: border-box` makes padding count inside the declared width.',
            answer: true,
            explanation: 'That is exactly what it does, which is why most resets apply it globally.',
          },
          {
            id: 'q3',
            type: 'multiple-choice',
            prompt: 'Which display value lets an element accept width and padding while sitting in a line of text?',
            options: ['block', 'inline', 'inline-block', 'none'],
            answer: 2,
            explanation:
              'Inline elements ignore width, height and vertical margins. Inline-block accepts them.',
          },
          {
            id: 'q4',
            type: 'blank',
            prompt: 'Which shorthand centres a fixed-width block horizontally?',
            answers: ['margin-inline: auto', 'margin-inline:auto', 'margin-inline : auto'],
            explanation: 'Auto left and right margins split the leftover space equally on both sides.',
          },
        ],
      },
    },
    {
      id: 'css-s3',
      title: 'Colors, Typography & Units',
      description: 'The properties that decide how a page reads, not just how it looks.',
      lessons: [
        {
          id: 'css-l5',
          title: 'Colour, custom properties and contrast',
          description: 'One palette, defined once, reused everywhere.',
          duration: 6,
          objectives: [
            'Write hex, rgb and hsl colours',
            'Define a palette with custom properties',
            'Keep text contrast readable',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'css-l5-b1',
              body: 'Hex is compact (`#29e2bd`), RGB works with transparency (`rgb(41 226 189 / 0.4)`), and HSL lets you adjust lightness without hunting for a new colour. The format matters far less than being consistent with yourself.',
            },
            {
              type: 'text',
              id: 'css-l5-b2',
              body: 'Custom properties hold values for the whole document. Define them once on `:root` and every rule can use them, which turns a palette into a single edit rather than a search-and-replace across the stylesheet.',
            },
            {
              type: 'code',
              id: 'css-l5-c1',
              language: 'css',
              title: 'A small design system in ten lines',
              code: `:root {
  --bg: #0b0d10;
  --surface: #11151a;
  --border: #252c35;
  --text: #f4f7fa;
  --muted: #8b96a5;
  --brand: #29e2bd;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
}

.card a {
  color: var(--brand);
}`,
            },
            {
              type: 'text',
              id: 'css-l5-b3',
              body: 'Contrast is not a preference. Body text needs a ratio of at least 4.5:1 against its background, and large text at least 3:1. Muted grey on a dark background is the easiest thing to get wrong, and the easiest to verify with a contrast checker.',
            },
            {
              type: 'tip',
              id: 'css-l5-t1',
              title: 'Never encode meaning in colour alone',
              body: 'If red means "error", it also needs an icon, a heading or a word. Colour is never the only signal — for colour-blind readers, for low-contrast screens, and for anyone in bright sunlight.',
            },
            {
              type: 'example',
              id: 'css-l5-e1',
              title: 'One palette, four surfaces',
              body: 'Every colour here comes from a custom property defined once at the top of the stylesheet.',
              html: `<div class="panel">
  <h2>Palette</h2>
  <p class="muted">Muted text still has to pass contrast on the dark surface.</p>
  <button class="cta" type="button">Primary action</button>
</div>`,
              css: `:root {
  --surface: #11151a;
  --border: #252c35;
  --text: #f4f7fa;
  --muted: #8b96a5;
  --brand: #29e2bd;
}
.panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1rem;
  color: var(--text);
  font: 14px/1.6 system-ui, sans-serif;
}
.muted { color: var(--muted); }
.cta {
  background: var(--brand);
  color: #04211c;
  border: 0;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  font: inherit;
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l5-x1',
              exercise: {
                id: 'ex-css-variables',
                instructions:
                  'Define a `--brand` custom property on `:root` and use it for the button background instead of the hard-coded hex value.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<button class="cta" type="button">Start</button>
<p class="note">Themed with a custom property</p>`,
                  css: `body {
  font: 14px system-ui, sans-serif;
  padding: 1rem;
}

.cta {
  background-color: #29e2bd;
  color: #04211c;
  border: 0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
}

.note { color: #0b0d10; }`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'A --brand custom property is defined on :root',
                    body: `var value = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim();
return value ? true : 'Define --brand on :root, for example :root { --brand: #29e2bd; }';`,
                  },
                  {
                    id: 't2',
                    label: 'The button uses var(--brand) for its background',
                    body: `var cta = document.querySelector('.cta');
var bg = getComputedStyle(cta).backgroundColor;
return bg === 'rgb(41, 226, 189)' ? true : 'The button background renders as ' + bg + '. Make the declaration use var(--brand).';`,
                  },
                  {
                    id: 't3',
                    label: 'The button keeps its rounded shape',
                    body: `var cta = document.querySelector('.cta');
return parseFloat(getComputedStyle(cta).borderTopLeftRadius) > 0
  ? true : 'Theming should not change the shape — keep the border-radius.';`,
                  },
                ],
                hints: [
                  'Add a `:root { --brand: #29e2bd; }` block at the top of the CSS.',
                  'Then in `.cta`, replace `background-color: #29e2bd;` with `background-color: var(--brand);`.',
                  'The rendered colour stays identical — that is exactly the point of the variable.',
                ],
                solution: {
                  html: `<button class="cta" type="button">Start</button>
<p class="note">Themed with a custom property</p>`,
                  css: `:root {
  --brand: #29e2bd;
}

body {
  font: 14px system-ui, sans-serif;
  padding: 1rem;
}

.cta {
  background-color: var(--brand);
  color: #04211c;
  border: 0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
}

.note { color: #0b0d10; }`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l6',
          title: 'Typography and units',
          description: 'Type choices that survive a 320px screen.',
          duration: 6,
          objectives: [
            'Build a font stack that always resolves',
            'Choose between px, rem, em and ch',
            'Use line-height deliberately',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'css-l6-b1',
              body: 'A `font-family` value is a list tried left to right. Always finish with a generic family so a missing font degrades to something reasonable instead of the browser default serif.',
            },
            {
              type: 'code',
              id: 'css-l6-c1',
              language: 'css',
              title: 'A defensive font stack',
              code: `body {
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-size: 1rem;
  line-height: 1.6;
}

code {
  font-family: 'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace;
}`,
            },
            {
              type: 'list',
              id: 'css-l6-list1',
              style: 'bullet',
              items: [
                '`px` — absolute. Fine for borders and hairlines, brittle for type.',
                '`rem` — relative to the root font size. The default choice for text and spacing.',
                '`em` — relative to the element itself. Good for padding that should scale with its own text.',
                '`%` — relative to the parent. Widths, and the occasional height.',
                '`ch` — the width of a zero character. Ideal for readable line lengths.',
                '`vw` / `vh` — viewport units. Useful for full-height sections, risky for body text.',
              ],
            },
            {
              type: 'text',
              id: 'css-l6-b2',
              body: 'Line-height should be a unitless number between roughly 1.4 and 1.7 for body text. Unitless means it multiplies whatever font size the element ends up with, so it scales correctly at every size.',
            },
            {
              type: 'tip',
              id: 'css-l6-t1',
              title: 'Long lines are the original sin',
              body: 'Text wider than about 75 characters per line is measurably harder to read. One declaration — `max-width: 65ch` — does more for readability than any amount of font tuning.',
            },
            {
              type: 'code',
              id: 'css-l6-c2',
              language: 'css',
              title: 'A readable article',
              code: `.article {
  max-width: 65ch;
  font-size: 1.125rem;
  line-height: 1.65;
}

.article h2 {
  font-size: 1.5rem;
  letter-spacing: -0.02em;
  margin-top: 2rem;
}

.article p + p {
  margin-top: 1rem;
}`,
            },
            {
              type: 'exercise',
              id: 'css-l6-x1',
              exercise: {
                id: 'ex-css-typography',
                instructions:
                  'Give the article a maximum readable width and comfortable line-height. Keep the font size in rem.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<article class="article">
  <h2>Typography</h2>
  <p>Measure matters more than font choice. A line of text that is too long forces the eye to travel too far to reach the start of the next one, and readers lose their place more often than they realise.</p>
  <p>Setting a maximum width in ch units ties the measure to the font itself, so it stays sensible even when the font size changes.</p>
</article>`,
                  css: `.article {
  font: 1rem/1.6 system-ui, sans-serif;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The article has a maximum width',
                    body: `var article = document.querySelector('.article');
var max = getComputedStyle(article).maxWidth;
return max && max !== 'none' ? true : 'Set a max-width so long lines stop being unreadable.';`,
                  },
                  {
                    id: 't2',
                    label: 'The rendered width stays under about 800px',
                    body: `var article = document.querySelector('.article');
var width = article.getBoundingClientRect().width;
return width <= 820 ? true : 'The line is ' + Math.round(width) + 'px wide. Aim for roughly 60-75 characters — try max-width: 65ch.';`,
                  },
                  {
                    id: 't3',
                    label: 'Line height is comfortable',
                    body: `var article = document.querySelector('.article');
var lineHeight = parseFloat(getComputedStyle(article).lineHeight);
var fontSize = parseFloat(getComputedStyle(article).fontSize);
var ratio = lineHeight / fontSize;
return ratio >= 1.35 ? true : 'The line-height ratio is ' + ratio.toFixed(2) + '. Body text needs at least 1.4.';`,
                  },
                ],
                hints: [
                  'A max-width in `ch` scales with the font: `max-width: 65ch;`.',
                  'Line-height is the second value in the `font` shorthand, or its own property. A ratio of 1.6 is a safe start.',
                  'Two declarations: `max-width: 65ch;` and `line-height: 1.6;`.',
                ],
                solution: {
                  html: `<article class="article">
  <h2>Typography</h2>
  <p>Measure matters more than font choice. A line of text that is too long forces the eye to travel too far to reach the start of the next one, and readers lose their place more often than they realise.</p>
  <p>Setting a maximum width in ch units ties the measure to the font itself, so it stays sensible even when the font size changes.</p>
</article>`,
                  css: `.article {
  max-width: 65ch;
  font-size: 1rem;
  line-height: 1.6;
  font-family: system-ui, sans-serif;
}`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-css-s3',
        title: 'Colour and typography check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            prompt: 'Which unit is relative to the root font size?',
            options: ['px', 'em', 'rem', '%'],
            answer: 2,
            explanation: 'rem is relative to the root element, which is why it respects browser text-size settings.',
          },
          {
            id: 'q2',
            type: 'code-output',
            prompt: 'What does this resolve to?',
            code: `a { color: rgb(41 226 189 / 0.5); }`,
            options: [
              'Fully opaque brand green',
              'Brand green at 50% opacity',
              'A pale mint',
              'Invalid syntax',
            ],
            answer: 1,
            explanation: 'The value after the slash is the alpha channel, so / 0.5 means half transparent.',
          },
          {
            id: 'q3',
            type: 'blank',
            prompt: 'Which unit is best for limiting a readable line length?',
            answers: ['ch', 'CH', 'Ch'],
            explanation: 'ch is the width of a zero glyph, so it tracks the font and keeps the character count sane.',
          },
          {
            id: 'q4',
            type: 'true-false',
            prompt: 'Body text needs a contrast ratio of at least 4.5:1 against its background.',
            answer: true,
            explanation: 'That is the WCAG AA threshold for normal-size text. Large text may drop to 3:1.',
          },
        ],
      },
    },
    {
      id: 'css-s4',
      title: 'Layout: Flexbox & Grid',
      description: 'Two layout systems, each with one job.',
      lessons: [
        {
          id: 'css-l7',
          title: 'Flexbox for one dimension',
          description: 'A row or a column, and everything along it.',
          duration: 8,
          objectives: [
            'Create a flex container and control its direction',
            'Distribute space with justify-content',
            'Align cross-axis items with align-items',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'css-l7-b1',
              body: 'Flexbox lays out **one dimension at a time**: a row, or a column. The element you put `display: flex` on is the container, and its direct children become flex items. That single declaration is where the whole system starts.',
            },
            {
              type: 'text',
              id: 'css-l7-b2',
              body: 'The axes are named by direction, not by physical position. In a row the main axis runs left to right and the cross axis runs top to bottom. Switch to `flex-direction: column` and they swap.',
            },
            {
              type: 'code',
              id: 'css-l7-c1',
              language: 'css',
              title: 'The properties you will actually use',
              code: `.toolbar {
  display: flex;
  flex-direction: row;           /* or column */
  gap: 0.5rem;                   /* space between items */
  justify-content: space-between;/* along the main axis */
  align-items: center;           /* along the cross axis */
  flex-wrap: wrap;               /* wrap when items overflow */
}

.toolbar > .spacer {
  flex: 1;                       /* absorb the remaining space */
}`,
            },
            {
              type: 'list',
              id: 'css-l7-list1',
              style: 'bullet',
              items: [
                '`justify-content` — flex-start, center, space-between, space-around, space-evenly.',
                '`align-items` — stretch (default), flex-start, center, baseline.',
                '`flex: 1` lets an item grow and shrink to fill the space left over.',
                '`flex: 0 0 auto` pins an item to its natural size.',
                '`gap` replaces the margin hack. Use it.',
              ],
            },
            {
              type: 'warning',
              id: 'css-l7-w1',
              title: 'Centre with two lines, not seven',
              body: 'To centre anything: `display: flex; justify-content: center; align-items: center;`. The `top: 50%; left: 50%; transform: translate(-50%, -50%)` trick is only needed for absolutely positioned elements.',
            },
            {
              type: 'example',
              id: 'css-l7-e1',
              title: 'A card row',
              body: 'One flex container, three items, and a spacer that soaks up the leftover space.',
              html: `<div class="card">
  <div>
    <h3>Monthly</h3>
    <p>Everything you need to ship.</p>
  </div>
  <span class="price">€19</span>
  <button class="cta" type="button">Choose</button>
</div>`,
              css: `.card {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 30rem;
  padding: 1rem;
  border: 1px solid #252c35;
  border-radius: 10px;
  font: 14px system-ui, sans-serif;
  color: #0b0d10;
}
.card h3 { margin: 0 0 0.15rem; font-size: 16px; }
.card p { margin: 0; color: #64748b; }
.price { margin-left: auto; font-weight: 700; }
.cta {
  background: #29e2bd;
  color: #04211c;
  border: 0;
  border-radius: 6px;
  padding: 0.45rem 0.9rem;
  font: inherit;
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l7-x1',
              exercise: {
                id: 'ex-css-flexbox',
                instructions:
                  'Turn `.toolbar` into a flex row: items on one line, spread apart, vertically centred, wrapping when narrow.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="toolbar">
  <strong>Files</strong>
  <span>3 selected</span>
  <button type="button">Download</button>
</div>`,
                  css: `.toolbar {
  font: 14px system-ui, sans-serif;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  color: #0f172a;
}

.toolbar button {
  font: inherit;
  padding: 0.35rem 0.7rem;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The toolbar is a flex row',
                    body: `var bar = document.querySelector('.toolbar');
var display = getComputedStyle(bar).display;
var direction = getComputedStyle(bar).flexDirection;
if (display !== 'flex') return 'Set display: flex on .toolbar.';
return direction === 'row' ? true : 'The direction is ' + direction + ', but a toolbar is a row.';`,
                  },
                  {
                    id: 't2',
                    label: 'Items are spread with space-between',
                    body: `var bar = document.querySelector('.toolbar');
return getComputedStyle(bar).justifyContent === 'space-between'
  ? true : 'Use justify-content: space-between to push items to the edges.';`,
                  },
                  {
                    id: 't3',
                    label: 'Items are vertically centred',
                    body: `var bar = document.querySelector('.toolbar');
return getComputedStyle(bar).alignItems === 'center'
  ? true : 'Use align-items: center so the button lines up with the text.';`,
                  },
                  {
                    id: 't4',
                    label: 'All three items share one line',
                    body: `var items = document.querySelectorAll('.toolbar > *');
var first = items[0].getBoundingClientRect().top;
var sameLine = true;
items.forEach(function (item) {
  if (Math.abs(item.getBoundingClientRect().top - first) > 2) sameLine = false;
});
return sameLine ? true : 'The items are stacking vertically.';`,
                  },
                ],
                hints: [
                  'All four properties go on `.toolbar`, not on its children.',
                  'Start with `display: flex;` then `justify-content: space-between;`.',
                  'Finish with `align-items: center;` and `flex-wrap: wrap;`.',
                ],
                solution: {
                  html: `<div class="toolbar">
  <strong>Files</strong>
  <span>3 selected</span>
  <button type="button">Download</button>
</div>`,
                  css: `.toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font: 14px system-ui, sans-serif;
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  color: #0f172a;
}

.toolbar button {
  font: inherit;
  padding: 0.35rem 0.7rem;
}`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l8',
          title: 'Grid for two dimensions',
          description: 'Rows and columns at the same time.',
          duration: 8,
          objectives: [
            'Define columns with repeat and minmax',
            'Use gap instead of margins for spacing',
            'Build a responsive grid with auto-fit',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'css-l8-b1',
              body: 'Where flexbox distributes along one axis, CSS Grid places things on **both axes at once**. You describe the shape with tracks and the browser works out where every item lands.',
            },
            {
              type: 'code',
              id: 'css-l8-c1',
              language: 'css',
              title: 'The grid properties that matter',
              code: `.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* three equal columns */
  gap: 1rem;                             /* space between tracks */
}

.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr);
  grid-template-areas:
    "side main"
    "foot foot";
  min-height: 100vh;
}

.layout > aside { grid-area: side; }
.layout > main  { grid-area: main; }
.layout > footer { grid-area: foot; }`,
            },
            {
              type: 'heading',
              id: 'css-l8-h1',
              level: 3,
              body: 'repeat(), fr and minmax()',
            },
            {
              type: 'text',
              id: 'css-l8-b2',
              body: '`1fr` means one share of the leftover space, which makes columns equal by default. `repeat(3, 1fr)` is shorthand for three equal columns. `minmax(220px, 1fr)` sets a floor and a ceiling so a column never becomes unusably narrow. `auto-fit` collapses empty tracks entirely, which is what makes a responsive grid possible with no media queries at all.',
            },
            {
              type: 'code',
              id: 'css-l8-c2',
              language: 'css',
              title: 'A responsive card grid in three lines',
              code: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}`,
            },
            {
              type: 'tip',
              id: 'css-l8-t1',
              title: 'Grid for structure, flexbox for components',
              body: 'Use grid to describe the page: columns, sidebars, card walls. Use flexbox inside a component: a button with an icon, a row of tags, a navbar. They nest happily.',
            },
            {
              type: 'example',
              id: 'css-l8-e1',
              title: 'Auto-fit in action',
              body: 'Narrow the preview and watch the columns reflow without a single media query.',
              html: `<div class="cards">
  <article>HTML</article>
  <article>CSS</article>
  <article>JavaScript</article>
  <article>TypeScript</article>
  <article>React</article>
</div>`,
              css: `.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 0.6rem;
  font: 13px system-ui, sans-serif;
}
.cards article {
  background: #11151a;
  color: #29e2bd;
  border: 1px solid #29e2bd;
  border-radius: 8px;
  padding: 1rem 0.6rem;
  text-align: center;
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l8-x1',
              exercise: {
                id: 'ex-css-grid',
                instructions:
                  'Lay the four `.tile` elements out in a two-column grid with a consistent gap, and keep every tile the same height.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="tiles">
  <div class="tile">One</div>
  <div class="tile">Two</div>
  <div class="tile">Three</div>
  <div class="tile">Four</div>
</div>`,
                  css: `.tiles {
  font: 14px system-ui, sans-serif;
}

.tile {
  background: #e2e8f0;
  border: 1px solid #94a3b8;
  border-radius: 8px;
  padding: 1rem;
  color: #0f172a;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The container is a grid',
                    body: `var tiles = document.querySelector('.tiles');
return getComputedStyle(tiles).display === 'grid' ? true : 'Set display: grid on .tiles.';`,
                  },
                  {
                    id: 't2',
                    label: 'There are exactly two columns',
                    body: `var tiles = document.querySelector('.tiles');
var count = getComputedStyle(tiles).gridTemplateColumns.split(' ').filter(Boolean).length;
return count === 2 ? true : 'The container resolved to ' + count + ' column(s). Use grid-template-columns with two tracks.';`,
                  },
                  {
                    id: 't3',
                    label: 'There is a real gap between tiles',
                    body: `var tiles = document.querySelector('.tiles');
var first = document.querySelector('.tile').getBoundingClientRect();
var second = document.querySelectorAll('.tile')[1].getBoundingClientRect();
var space = second.left - first.right;
return space >= 4 ? true : 'The tiles are touching. Add gap: 1rem to .tiles.';`,
                  },
                  {
                    id: 't4',
                    label: 'All four tiles share one height',
                    body: `var items = document.querySelectorAll('.tile');
var heights = [];
items.forEach(function (item) { heights.push(item.getBoundingClientRect().height); });
var same = heights.every(function (h) { return Math.abs(h - heights[0]) < 1; });
return same ? true : 'Grid items stretch by default — make sure align-items is not overridden.';`,
                  },
                ],
                hints: [
                  'Two declarations on `.tiles`: `display: grid;` and `grid-template-columns: repeat(2, 1fr);`.',
                  'Add `gap: 1rem;` so the tiles are not flush against each other.',
                  'If heights differ, check that `align-items` has not been set to something other than stretch.',
                ],
                solution: {
                  html: `<div class="tiles">
  <div class="tile">One</div>
  <div class="tile">Two</div>
  <div class="tile">Three</div>
  <div class="tile">Four</div>
</div>`,
                  css: `.tiles {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  font: 14px system-ui, sans-serif;
}

.tile {
  background: #e2e8f0;
  border: 1px solid #94a3b8;
  border-radius: 8px;
  padding: 1rem;
  color: #0f172a;
}`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l9',
          title: 'Responsive with intent',
          description: 'Breakpoints, clamp and content-driven decisions.',
          duration: 7,
          objectives: [
            'Write mobile-first media queries with min-width',
            'Use clamp to size fluidly without breakpoints',
            'Choose breakpoints based on content',
          ],
          xp: 55,
          content: [
            {
              type: 'text',
              id: 'css-l9-b1',
              body: 'Mobile-first means the base styles describe the **narrow** case and media queries add complexity as the viewport grows. It produces less CSS, and it means the small screen never parses rules it will not use.',
            },
            {
              type: 'code',
              id: 'css-l9-c1',
              language: 'css',
              title: 'Mobile-first with min-width',
              code: `.layout {
  display: grid;
  grid-template-columns: 1fr;      /* narrow first */
  gap: 1rem;
}

@media (min-width: 48rem) {
  .layout {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}`,
            },
            {
              type: 'text',
              id: 'css-l9-b2',
              body: '`clamp()` takes a minimum, a preferred value and a maximum, and picks whatever fits in between. It removes whole ranges of breakpoints: fluid type and fluid spacing with no media query at all.',
            },
            {
              type: 'code',
              id: 'css-l9-c2',
              language: 'css',
              title: 'Fluid values with clamp',
              code: `:root {
  --text: clamp(1rem, 0.9rem + 0.5vw, 1.15rem);
  --space: clamp(0.75rem, 0.6rem + 1vw, 1.5rem);
}

body {
  font-size: var(--text);
  padding: var(--space);
}`,
            },
            {
              type: 'warning',
              id: 'css-l9-w1',
              title: 'Breakpoints come from the content',
              body: 'Do not design for named devices. Resize until the layout breaks and put the breakpoint there. Two breakpoints tuned to real content beat six copied from a tutorial.',
            },
            {
              type: 'tip',
              id: 'css-l9-t1',
              title: 'Test at 320px first',
              body: 'If it works at 320px it works everywhere. That width is the honest test of whether a layout is flexible or merely not very wide.',
            },
            {
              type: 'exercise',
              id: 'css-l9-x1',
              exercise: {
                id: 'ex-css-responsive',
                instructions:
                  'Make `.layout` a single column on narrow screens and two columns on wider ones, using a `min-width` media query expressed in rem.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="layout">
  <aside class="side">Sidebar</aside>
  <main class="main">Content</main>
</div>`,
                  css: `.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  font: 14px system-ui, sans-serif;
}

.side { background: #d1fae5; padding: 1rem; border-radius: 8px; color: #065f46; }
.main { background: #e2e8f0; padding: 1rem; border-radius: 8px; color: #0f172a; }`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'A min-width media query exists',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (error) { return []; }
});
var media = rules.filter(function (rule) { return rule.type === 4; });
return media.length > 0 ? true : 'Add an @media (min-width: …) block so the layout can expand.';`,
                  },
                  {
                    id: 't2',
                    label: 'The breakpoint uses rem, not px',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (error) { return []; }
});
var media = rules.filter(function (rule) { return rule.type === 4; });
var usesPx = media.some(function (rule) {
  return String(rule.conditionText || rule.media.mediaText).indexOf('px') > -1;
});
return !usesPx ? true : 'Use a rem breakpoint, for example @media (min-width: 48rem).';`,
                  },
                  {
                    id: 't3',
                    label: 'The base layout is already a grid',
                    body: `var layout = document.querySelector('.layout');
return getComputedStyle(layout).display === 'grid' ? true : 'The layout should be a grid before any media query applies.';`,
                  },
                ],
                hints: [
                  'Add `@media (min-width: 48rem) { .layout { grid-template-columns: 14rem 1fr; } }`.',
                  'Inside the media query, redeclare grid-template-columns — the base rule stays a single column.',
                  'Use rem so the breakpoint scales with the user text size.',
                ],
                solution: {
                  html: `<div class="layout">
  <aside class="side">Sidebar</aside>
  <main class="main">Content</main>
</div>`,
                  css: `.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  font: 14px system-ui, sans-serif;
}

@media (min-width: 48rem) {
  .layout {
    grid-template-columns: 14rem minmax(0, 1fr);
  }
}

.side { background: #d1fae5; padding: 1rem; border-radius: 8px; color: #065f46; }
.main { background: #e2e8f0; padding: 1rem; border-radius: 8px; color: #0f172a; }`,
                },
              },
            },
          ],
        },
      ],
      quiz: {
        id: 'quiz-css-s4',
        title: 'Layout check',
        passingScore: 70,
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            prompt: 'Which property distributes flex items along the main axis?',
            options: ['align-items', 'justify-content', 'flex-flow', 'place-content'],
            answer: 1,
            explanation: 'justify-content handles the main axis; align-items handles the cross axis.',
          },
          {
            id: 'q2',
            type: 'code-output',
            prompt: 'How many columns does this produce?',
            code: `.g { display: grid; grid-template-columns: repeat(4, 1fr); }`,
            options: ['1', '2', '4', 'Depends on the content'],
            answer: 2,
            explanation: 'repeat(4, 1fr) defines four equal, flexible columns.',
          },
          {
            id: 'q3',
            type: 'identify-error',
            prompt: 'Which property does not exist?',
            code: `.x { display: flex; gap: 1rem; column-gap: 2rem; }`,
            options: ['gap', 'column-gap', 'flex-column-gap', 'All are valid'],
            answer: 2,
            explanation: 'The axis properties are row-gap and column-gap. There is no flex-column-gap.',
          },
          {
            id: 'q4',
            type: 'true-false',
            prompt: 'In a mobile-first layout, base styles describe the narrowest screen.',
            answer: true,
            explanation:
              'Media queries with min-width then add complexity as space becomes available, which keeps the CSS smaller.',
          },
          {
            id: 'q5',
            type: 'blank',
            prompt: 'Which function takes a minimum, a preferred value and a maximum?',
            answers: ['clamp', 'clamp()'],
            explanation: 'clamp(min, preferred, max) gives fluid values without breakpoints.',
          },
        ],
      },
    },
    {
      id: 'css-s5',
      title: 'Final Project',
      description: 'Combine custom properties, grid, flexbox and hover states.',
      lessons: [
        {
          id: 'css-l10',
          title: 'Build a responsive card grid',
          description: 'The CSS capstone: tokens, grid, flex and hover in one page.',
          duration: 35,
          objectives: [
            'Define a palette with custom properties',
            'Build a card wall that reflows without breakpoints',
            'Polish spacing, borders and hover states',
          ],
          xp: 150,
          content: [
            {
              type: 'text',
              id: 'css-l10-b1',
              body: 'This is the capstone for the CSS course. You already know every ingredient — the project is about assembling them in the right order and making deliberate choices about spacing.',
            },
            {
              type: 'list',
              id: 'css-l10-list1',
              style: 'ordered',
              items: [
                'Define colours and spacing as custom properties on `:root`.',
                'Lay the cards out with `display: grid` and `repeat(auto-fit, minmax(…))`.',
                'Use flexbox *inside* each card for the title and the meta row.',
                'Set `box-sizing: border-box` globally so padding never surprises you.',
                'Add a hover state that is obvious but restrained.',
                'Read the result at 320px, 768px and 1280px before you submit.',
              ],
            },
            {
              type: 'tip',
              id: 'css-l10-t1',
              title: 'There is no reference solution',
              body: 'The checks verify structure, spacing and behaviour rather than taste. Build something you would be happy to ship, and keep the markup semantic.',
            },
            {
              type: 'exercise',
              id: 'css-l10-x1',
              exercise: {
                id: 'ex-css-project',
                instructions:
                  'Build the course card wall: responsive layout, a themed colour, predictable sizing and a hover effect. Press Check when every item passes.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="grid">
  <article class="card">
    <h2>HTML Fundamentals</h2>
    <p class="meta">Beginner · 8 lessons</p>
    <a class="link" href="#">Start course</a>
  </article>
  <article class="card">
    <h2>CSS Fundamentals</h2>
    <p class="meta">Beginner · 10 lessons</p>
    <a class="link" href="#">Start course</a>
  </article>
</div>`,
                  css: `:root {
  --brand: #29e2bd;
}

body {
  font: 15px/1.5 system-ui, sans-serif;
  padding: 2rem 1rem;
  background: #0b0d10;
  color: #f4f7fa;
}

.grid {
  /* lay the cards out */
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The card wall is a grid',
                    body: `var grid = document.querySelector('.grid');
return getComputedStyle(grid).display === 'grid' ? true : 'The .grid container needs display: grid.';`,
                  },
                  {
                    id: 't2',
                    label: 'The columns are defined',
                    body: `var grid = document.querySelector('.grid');
var value = getComputedStyle(grid).gridTemplateColumns;
return value && value !== 'none' ? true : 'Declare grid-template-columns on .grid, ideally repeat(auto-fit, minmax(220px, 1fr)).';`,
                  },
                  {
                    id: 't3',
                    label: 'Every card has real padding',
                    body: `var cards = document.querySelectorAll('.card');
if (cards.length < 2) return 'Keep at least two cards.';
for (var i = 0; i < cards.length; i++) {
  var style = getComputedStyle(cards[i]);
  if (parseFloat(style.paddingLeft) < 12) return 'Card ' + (i + 1) + ' needs at least 12px of horizontal padding.';
}
return true;`,
                  },
                  {
                    id: 't4',
                    label: 'The cards use your custom property',
                    body: `var root = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim();
if (!root) return 'Define --brand on :root and use it in the card styles.';
var card = document.querySelector('.card');
var border = getComputedStyle(card).borderTopColor;
return border === 'rgb(41, 226, 189)' ? true : 'Use var(--brand) somewhere visible on the card, such as its border or the link colour.';`,
                  },
                  {
                    id: 't5',
                    label: 'Sizing is predictable with border-box',
                    body: `var card = document.querySelector('.card');
var box = getComputedStyle(card).boxSizing;
return box === 'border-box' ? true : 'Set box-sizing: border-box so padding and border stay inside the declared width.';`,
                  },
                  {
                    id: 't6',
                    label: 'The cards have a hover state',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (error) { return []; }
});
var hasHover = rules.some(function (rule) {
  return rule.selectorText && rule.selectorText.indexOf(':hover') > -1;
});
return hasHover ? true : 'Add a :hover rule, for example .card:hover { border-color: … }.';`,
                  },
                  {
                    id: 't7',
                    label: 'The markup stays semantic',
                    body: `var cards = document.querySelectorAll('.card');
var headings = document.querySelectorAll('.card h2').length;
var links = document.querySelectorAll('.card a').length;
if (headings !== cards.length) return 'Each card should have its own heading.';
return links >= 1 ? true : 'Keep the call-to-action links inside the cards.';`,
                  },
                ],
                hints: [
                  'Start with `:root` and a `--brand` value, then style `.card` with `var(--brand)`.',
                  'For the grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;`.',
                  'Add `* { box-sizing: border-box; }` at the top and a `.card:hover { … }` rule at the bottom.',
                ],
                solution: {
                  html: `<div class="grid">
  <article class="card">
    <h2>HTML Fundamentals</h2>
    <p class="meta">Beginner · 8 lessons</p>
    <a class="link" href="#">Start course</a>
  </article>
  <article class="card">
    <h2>CSS Fundamentals</h2>
    <p class="meta">Beginner · 10 lessons</p>
    <a class="link" href="#">Start course</a>
  </article>
</div>`,
                  css: `:root {
  --brand: #29e2bd;
  --surface: #11151a;
  --border: #252c35;
  --muted: #8b96a5;
}

* {
  box-sizing: border-box;
}

body {
  font: 15px/1.5 system-ui, sans-serif;
  padding: 2rem 1rem;
  background: #0b0d10;
  color: #f4f7fa;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  max-width: 60rem;
  margin-inline: auto;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  transition: border-color 150ms ease, transform 150ms ease;
}

.card:hover {
  border-color: var(--brand);
  transform: translateY(-2px);
}

.card h2 {
  margin: 0;
  font-size: 1.1rem;
}

.meta {
  margin: 0;
  color: var(--muted);
  font-size: 0.85rem;
}

.link {
  margin-top: auto;
  color: var(--brand);
}`,
                },
                testNotes:
                  'These checks verify structure, spacing and behaviour rather than visual taste. Any clean, responsive, semantic solution passes.',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'css-s6',
      title: 'Positioning & Pseudo-selectors',
      description: 'Taking elements out of normal flow, layering with z-index, and styling states and parts with pseudo-selectors.',
      lessons: [
        {
          id: 'css-l11',
          title: 'Position, z-index and stacking',
          description: 'static, relative, absolute, fixed and sticky positioning.',
          duration: 7,
          objectives: [
            'Choose the right position value for a layout need',
            'Understand offset properties and the containing block',
            'Layer elements with z-index and stacking context',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'c-l11-b1',
              body: 'By default every element sits in **normal flow**: it flows from top to bottom, left to right, and occupies its place in the document order. The `position` property lets you pull an element out of that flow or nudge it from its spot.',
            },
            {
              type: 'list',
              id: 'c-l11-l1',
              style: 'bullet',
              items: [
                '`static` (default) — in normal flow, ignore top/right/bottom/left.',
                '`relative` — stays in flow, but offsets from its own position.',
                '`absolute` — removed from flow, offsets from the nearest positioned ancestor.',
                '`fixed` — removed from flow, pinned to the viewport.',
                '`sticky` — in flow until a scroll threshold, then behaves like fixed.',
              ],
            },
            {
              type: 'code',
              id: 'c-l11-c1',
              language: 'css',
              title: 'Each position type',
              code: `/* stays in flow, nudged 10px down and right */
.relative-box {
  position: relative;
  top: 10px;
  left: 10px;
}

/* positioned against the nearest non-static ancestor */
.absolute-box {
  position: absolute;
  top: 0;
  right: 0;
}

/* pinned to the viewport, never scrolls away */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

/* sticks to the top after you scroll past it */
.sticky-nav {
  position: sticky;
  top: 0;
}`,
            },
            {
              type: 'text',
              id: 'c-l11-b2',
              body: 'z-index controls the **stacking order** — which element draws on top. But z-index only works on positioned elements, and it creates a new **stacking context**, which can surprise you when one element\'s z-index stops affecting another.',
            },
            {
              type: 'warning',
              id: 'c-l11-w1',
              title: 'z-index does not work on static elements',
              body: 'A common mistake: setting `z-index: 999` on an element that is still `position: static` and wondering why nothing happens. Add `position: relative` (or another non-static value) first.',
            },
            {
              type: 'exercise',
              id: 'css-l11-x1',
              exercise: {
                id: 'ex-css-position',
                instructions:
                  'Position the notification badge absolutely in the top-right corner of the card, and give the card position: relative so it becomes the reference point.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="card">
  <h3>Messages</h3>
  <p>You have unread messages.</p>
  <span class="badge">3</span>
</div>`,
                  css: `.card {
  border: 1px solid #252c35;
  border-radius: 8px;
  padding: 1rem;
}
.badge {
  background: #29e2bd;
  color: #0b0d10;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The card has position: relative',
                    body: `var card = document.querySelector('.card');
var pos = getComputedStyle(card).position;
return pos === 'relative' ? true : 'Add position: relative to .card.';`,
                  },
                  {
                    id: 't2',
                    label: 'The badge is positioned absolutely',
                    body: `var badge = document.querySelector('.badge');
var pos = getComputedStyle(badge).position;
return pos === 'absolute' ? true : 'Add position: absolute to .badge.';`,
                  },
                  {
                    id: 't3',
                    label: 'The badge is in the top-right corner',
                    body: `var badge = document.querySelector('.badge');
var top = parseFloat(getComputedStyle(badge).top);
var right = parseFloat(getComputedStyle(badge).right);
return top === 8 && right === 8 ? true : 'Offset the badge from the top-right: top: 8px; right: 8px;.';`,
                  },
                ],
                hints: [
                  '`.card { position: relative; }` makes the card the reference for absolutely positioned children.',
                  '`.badge { position: absolute; top: 8px; right: 8px; }` pins the badge to the corner.',
                  'Without position: relative on the parent, the badge positions against the viewport.',
                ],
                solution: {
                  css: `.card {
  position: relative;
  border: 1px solid #252c35;
  border-radius: 8px;
  padding: 1rem;
}
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #29e2bd;
  color: #0b0d10;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
}`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l12',
          title: 'Pseudo-classes and pseudo-elements',
          description: ':hover, :focus, :nth-child and ::before, ::after.',
          duration: 6,
          objectives: [
            'Style elements in different states with pseudo-classes',
            'Target specific children with structural pseudo-classes',
            'Insert decorative content with pseudo-elements',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'c-l12-b1',
              body: 'Pseudo-classes style an element **based on a condition**. `:hover` fires when the pointer is over it. `:focus` fires when keyboard users land on it. `:nth-child(odd)` and `:nth-child(even)` alternate row colours. These exist before you write any JavaScript — use them for free polish.',
            },
            {
              type: 'code',
              id: 'c-l12-c1',
              language: 'css',
              code: `/* link states */
a:link { color: #64b5f6; }
a:visited { color: #ba68c8; }
a:hover { color: #29e2bd; }
a:focus { outline: 2px solid #29e2bd; }

/* zebra striping */
tr:nth-child(even) {
  background: #1a1f25;
}

/* style the first item differently */
li:first-child {
  font-weight: bold;
}

/* anything that is not the last item */
li:not(:last-child) {
  margin-bottom: 0.5rem;
}

/* form fields that have content */
input:not(:placeholder-shown) {
  border-color: #29e2bd;
}`,
            },
            {
              type: 'text',
              id: 'c-l12-b2',
              body: 'Pseudo-elements (`::before`, `::after`) insert generated content that does not exist in the HTML. They are perfect for decorative touches, custom bullets, or the dot on a list item — things that would bloat the markup if written in HTML.',
            },
            {
              type: 'code',
              id: 'c-l12-c2',
              language: 'css',
              title: 'Custom list marker with ::before',
              code: `li::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 0.5rem;
  background: #29e2bd;
  border-radius: 50%;
  vertical-align: middle;
}

.quote::before {
  content: """;
  font-size: 3rem;
  color: #29e2bd;
}`,
            },
            {
              type: 'warning',
              id: 'c-l12-w1',
              title: 'Hover is not keyboard-friendly',
              body: 'If you only style `:hover`, keyboard and touch users miss it. Always pair `:hover` with `:focus-visible` (or `:focus`) so the same style works for everyone.',
            },
            {
              type: 'exercise',
              id: 'css-l12-x1',
              exercise: {
                id: 'ex-css-pseudo',
                instructions:
                  'Add a :hover effect on the button (background color change) and a ::after pseudo-element on the card title that shows a trailing dot.',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<div class="card">
  <h3 class="card-title">New feature</h3>
  <button class="btn">Learn more</button>
</div>`,
                  css: `.card {
  border: 1px solid #252c35;
  border-radius: 8px;
  padding: 1rem;
}
.card-title {
  margin: 0;
}
.btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'A :hover rule exists for the button',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var hasHover = rules.some(function (rule) {
  return rule.selectorText && rule.selectorText.indexOf('.btn') > -1 && rule.selectorText.indexOf(':hover') > -1;
});
return hasHover ? true : 'Add a .btn:hover rule with a background color.';`,
                  },
                  {
                    id: 't2',
                    label: 'A ::after pseudo-element exists for the card title',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var hasAfter = rules.some(function (rule) {
  return rule.selectorText && rule.selectorText.indexOf('.card-title') > -1 && rule.selectorText.indexOf('::after') > -1;
});
return hasAfter ? true : 'Add a .card-title::after rule.';`,
                  },
                  {
                    id: 't3',
                    label: 'The ::after has content',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var afterRule = rules.find(function (rule) {
  return rule.selectorText && rule.selectorText.indexOf('.card-title') > -1 && rule.selectorText.indexOf('::after') > -1;
});
if (!afterRule) return 'Add a .card-title::after rule.';
return afterRule.style.content ? true : 'Set content: "." or some other value on ::after.';`,
                  },
                ],
                hints: [
                  '`.btn:hover { background: … }` changes the background on hover.',
                  '`.card-title::after { content: "·"; }` adds a decorative character.',
                  'Pseudo-elements need the content property — even an empty string content: "" works.',
                ],
                solution: {
                  css: `.card {
  border: 1px solid #252c35;
  border-radius: 8px;
  padding: 1rem;
}
.card-title {
  margin: 0;
}
.card-title::after {
  content: "·";
  margin-left: 0.25rem;
  color: #29e2bd;
}
.btn {
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
.btn:hover {
  background: #29e2bd;
  color: #0b0d10;
}`,
                },
              },
            },
          ],
        },
      ],
    },
    {
      id: 'css-s7',
      title: 'Visual Refinement',
      description: 'Combinators for precise targeting, box-sizing for predictable sizing, and decorative effects.',
      lessons: [
        {
          id: 'css-l13',
          title: 'Combinators, attribute selectors and box-sizing',
          description: 'Targeting descendants, children and siblings; selecting by attribute; and why border-box matters.',
          duration: 6,
          objectives: [
            'Use combinator selectors (>, +, ~) for precise targeting',
            'Match elements by attribute value',
            'Apply box-sizing: border-box for predictable sizing',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'c-l13-b1',
              body: 'Class selectors (`.card`) match every element with that class. Combinator selectors let you be more specific about **where** the class appears. `>` means "direct child only", `+` means "the element immediately after", and `~` means "any sibling after".',
            },
            {
              type: 'code',
              id: 'c-l13-c1',
              language: 'css',
              code: `/* all <p> inside .card, at any depth */
.card p { color: #ccc; }

/* only <p> that are direct children of .card */
.card > p { color: #29e2bd; }

/* the <h2> immediately following a <p> */
p + h2 { margin-top: 2rem; }

/* any .tag that comes after .featured */
.featured ~ .tag { display: none; }

/* select elements with a specific attribute */
input[type="email"] { border-color: #29e2bd; }
a[href^="https"]::after { content: """; }
input[required] { border-width: 2px; }`,
            },
            {
              type: 'text',
              id: 'c-l13-b2',
              body: 'By default the browser uses `content-box`: setting `width` adds padding and border *on top* of that width, which makes sizing unpredictable. `border-box` includes padding and border *inside* the declared width, which is almost always what you want.',
            },
            {
              type: 'tip',
              id: 'c-l13-t1',
              title: 'The one rule to add first',
              body: '`html { box-sizing: border-box; }` plus `* { box-sizing: inherit; }` is the most common first line of any stylesheet today. It makes every element size the way you expect.',
            },
            {
              type: 'example',
              id: 'c-l13-e1',
              title: 'Content-box vs border-box',
              body: 'Two boxes with the same width and padding. The content-box one is visibly wider, because its padding pushes outside the declared width.',
              html: `<div class="box content-box">Content box</div>
<div class="box border-box">Border box</div>`,
              css: `.box {
  width: 200px;
  padding: 20px;
  border: 4px solid #29e2bd;
  margin-bottom: 1rem;
}
.content-box { box-sizing: content-box; }
.border-box { box-sizing: border-box; }`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l13-x1',
              exercise: {
                id: 'ex-css-boxsizing',
                instructions:
                  'Add the universal box-sizing reset and select the external link by its href attribute starting with "https".',
                languages: ['html', 'css'],
                starterCode: {
                  html: `<p>Some text and a <a href="https://developer.mozilla.org">link</a>.</p>`,
                  css: `/* add the box-sizing reset here */`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'A box-sizing reset targets all elements',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var hasReset = rules.some(function (rule) {
  var sel = rule.selectorText || '';
  return sel.indexOf('*,') > -1 || sel.indexOf('*') > -1 && sel.indexOf('box-sizing') === -1;
});
return hasReset || document.querySelectorAll('*').length > 0 ? true : 'Add * { box-sizing: border-box; }';`,
                  },
                  {
                    id: 't2',
                    label: 'The external link is selected by attribute',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var hasAttr = rules.some(function (rule) {
  return rule.selectorText && rule.selectorText.indexOf('href^=') > -1;
});
return hasAttr ? true : 'Add a[href^="https"] rule.';`,
                  },
                ],
                hints: [
                  'Start with: `* { box-sizing: border-box; }`',
                  'Or the more complete: `html { box-sizing: border-box; } *, *::before, *::after { box-sizing: inherit; }`',
                  'Attribute selectors: `a[href^="https"]` matches links starting with https.',
                ],
                solution: {
                  css: `* {
  box-sizing: border-box;
}
a[href^="https"] {
  color: #29e2bd;
}`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l14',
          title: 'Rounded corners, shadows and gradients',
          description: 'border-radius, box-shadow, text-shadow and linear-gradient.',
          duration: 6,
          objectives: [
            'Round corners with border-radius',
            'Add depth with box-shadow',
            'Create gradients with linear-gradient',
          ],
          xp: 45,
          content: [
            {
              type: 'text',
              id: 'c-l14-b1',
              body: 'A few properties give elements a polished, three-dimensional feel. `border-radius` rounds corners. `box-shadow` and `text-shadow` add light and depth. `linear-gradient` generates an image with CSS — no image file needed.',
            },
            {
              type: 'code',
              id: 'c-l14-c1',
              language: 'css',
              code: `.card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
}

.card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
}

.card-title {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.gradient-bg {
  background: linear-gradient(135deg, #29e2bd 0%, #0f1419 100%);
  color: white;
}`,
            },
            {
              type: 'text',
              id: 'c-l14-b2',
              body: 'Border-radius can take up to four values (top-left, top-right, bottom-right, bottom-left) or an explicit curve like `border-radius: 12px 4px`. A `border-radius: 999px` (or `border-radius: 50%`) on a square element makes a circle.',
            },
            {
              type: 'tip',
              id: 'c-l14-t1',
              title: 'Shadows are layered',
              body: 'Pass multiple comma-separated shadows to layer them: `box-shadow: 0 1px 2px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1);`. One outer shadow for depth, one inner for a pressed-in effect.',
            },
            {
              type: 'exercise',
              id: 'css-l14-x1',
              exercise: {
                id: 'ex-css-shadows',
                instructions:
                  'Style the card with rounded corners, a subtle box-shadow, and a gradient background on the title.',
                languages: ['css'],
                starterCode: {
                  html: `<div class="card">
  <h3 class="card-title">Gradient title</h3>
</div>`,
                  css: `.card {
  padding: 1.5rem;
  border: 1px solid #252c35;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'The card has rounded corners',
                    body: `var card = document.querySelector('.card');
var radius = parseFloat(getComputedStyle(card).borderRadius);
return radius > 0 ? true : 'Add border-radius to .card.';`,
                  },
                  {
                    id: 't2',
                    label: 'The card has a box-shadow',
                    body: `var card = document.querySelector('.card');
var shadow = getComputedStyle(card).boxShadow;
return shadow && shadow !== 'none' ? true : 'Add box-shadow to .card.';`,
                  },
                  {
                    id: 't3',
                    label: 'The title has a gradient background',
                    body: `var title = document.querySelector('.card-title');
var bg = getComputedStyle(title).backgroundImage;
return bg.indexOf('gradient') > -1 ? true : 'Add a linear-gradient background to .card-title.';`,
                  },
                ],
                hints: [
                  '`border-radius: 12px;` rounds the corners.',
                  '`box-shadow: 0 4px 12px rgba(0,0,0,0.2);` adds depth.',
                  '`background: linear-gradient(135deg, #29e2bd, #0f1419);` on .card-title.',
                ],
                solution: {
                  css: `.card {
  padding: 1.5rem;
  border: 1px solid #252c35;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.card-title {
  margin: 0;
  background: linear-gradient(135deg, #29e2bd, #0f1419);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}`,
                },
              },
            },
          ],
        },
        {
          id: 'css-l15',
          title: 'Transitions and transforms',
          description: 'Animating property changes and moving/sizing elements in 2D space.',
          duration: 6,
          objectives: [
            'Animate state changes with transition',
            'Move and scale elements with transform',
            'Understand timing functions and performance',
          ],
          xp: 50,
          content: [
            {
              type: 'text',
              id: 'c-l15-b1',
              body: 'The `transition` property animates a change to another property over time. Instead of a property snapping from one value to another instantly, it flows from start to end for a duration you choose. Together with `transform` (which moves, rotates, scales or skews an element), they are the two most useful animation tools in CSS.',
            },
            {
              type: 'code',
              id: 'c-l15-c1',
              language: 'css',
              code: `.btn {
  background: #252c35;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  transition: background 0.2s ease, transform 0.2s ease;
}

.btn:hover {
  background: #29e2bd;
  color: #0b0d10;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}`,
            },
            {
              type: 'text',
              id: 'c-l15-b2',
              body: 'Transition takes four parts: the property to transition, the duration, the timing function, and a delay. `ease` starts slow, speeds up, then ends slow. `linear` is a constant speed. `cubic-bezier(.5, 0, .5, 1)` lets you make custom curves.',
            },
            {
              type: 'tip',
              id: 'c-l15-t1',
              title: 'transform is hardware-accelerated',
              body: 'Unlike `top`/`left` (which trigger a re-layout), `transform` and `opacity` can run on the GPU. For smooth animations, animate `transform` and `opacity` instead of box-model properties.',
            },
            {
              type: 'example',
              id: 'c-l15-e1',
              title: 'A button that lifts on hover',
              body: 'Watch the button scale up slightly and cast a stronger shadow when hovered.',
              html: `<button class="lift-btn">Lift me</button>`,
              css: `.lift-btn {
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 8px;
  background: #29e2bd;
  color: #0b0d10;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.lift-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(41, 226, 189, 0.4);
}`,
              showPreview: true,
            },
            {
              type: 'exercise',
              id: 'css-l15-x1',
              exercise: {
                id: 'ex-css-transition',
                instructions:
                  'Add a transition to the button that animates its background-color on hover over 0.3s with an ease-in-out timing function.',
                languages: ['css'],
                starterCode: {
                  html: `<button class="pulse-btn">Hover me</button>`,
                  css: `.pulse-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #252c35;
  color: white;
  cursor: pointer;
}`,
                },
                tests: [
                  {
                    id: 't1',
                    label: 'A transition property exists',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var hasTransition = rules.some(function (rule) {
  var sel = rule.selectorText || '';
  return sel.indexOf('.pulse-btn') > -1 && !sel.indexOf(':hover') > -1 && rule.style.transition;
});
return hasTransition ? true : 'Add transition to .pulse-btn (not :hover).';`,
                  },
                  {
                    id: 't2',
                    label: 'The :hover state changes background',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var hoverRule = rules.find(function (rule) {
  var sel = rule.selectorText || '';
  return sel.indexOf('.pulse-btn') > -1 && sel.indexOf(':hover') > -1;
});
if (!hoverRule) return 'Add a .pulse-btn:hover rule.';
return hoverRule.style.backgroundColor ? true : 'Set a background-color in :hover.';`,
                  },
                  {
                    id: 't3',
                    label: 'The transition duration is about 0.3s',
                    body: `var rules = Array.from(document.styleSheets).flatMap(function (sheet) {
  try { return Array.from(sheet.cssRules); } catch (e) { return []; }
});
var baseRule = rules.find(function (rule) {
  var sel = rule.selectorText || '';
  return sel.indexOf('.pulse-btn') > -1 && sel.indexOf(':hover') === -1;
});
if (!baseRule) return 'Transition should be on the base .pulse-btn rule.';
var dur = baseRule.style.transitionDuration;
return dur && dur.indexOf('0.3') > -1 ? true : 'Use 0.3s for the transition duration.';`,
                  },
                ],
                hints: [
                  'Add `transition: background-color 0.3s ease-in-out;` to `.pulse-btn`.',
                  'Set a different `background-color` in `.pulse-btn:hover`.',
                  'The transition goes on the base rule, not the hover rule — that way it animates both ways.',
                ],
                solution: {
                  css: `.pulse-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #252c35;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.pulse-btn:hover {
  background: #29e2bd;
  color: #0b0d10;
}`,
                },
              },
            },
          ],
        },
      ],
    },
  ],
  projects: [],
}