import type { Section } from '~/types/content'

export const cssIntroSections: Section[] = [
  {
    id: 'css-s1',
    title: 'Getting started',
    description: 'What this course covers, how it is organised, and how to get the most out of it.',
    lessons: [
      {
        id: 'css-l1',
        title: 'How this course works',
        description: 'A tour of the course, the way the lessons are built, and what you will be able to do at the end.',
        duration: 4,
        objectives: [
          'Describe what the course covers and in what order it builds',
          'Explain the shape of every lesson: live result, then code, then a challenge',
          'Name the four things you will be able to do once you finish',
        ],
        xp: 30,
        quiz: {
          id: 'quiz-css-l1',
          title: 'How this course works quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l1-q1',
              type: 'multiple-choice',
              prompt: 'What does CSS change about a page?',
              options: [
                'The meaning of the content and the tags used',
                'Only how things look and where they sit',
                'What happens when someone clicks a button',
                'The file size of the HTML',
              ],
              answer: 1,
              explanation: 'CSS is presentation only. Structure lives in HTML and behaviour lives in JavaScript, which is what keeps the three of them independently replaceable.',
            },
            {
              id: 'quiz-css-l1-q2',
              type: 'true-false',
              prompt: 'In the two cards shown at the top of this lesson, the HTML markup was different.',
              answer: false,
              explanation: 'The markup was identical. Only the CSS differed, which is the point the example was making.',
            },
            {
              id: 'quiz-css-l1-q3',
              type: 'multiple-choice',
              prompt: 'What is the first thing you see in every lesson of this course?',
              options: [
                'A block of code to read',
                'A quiz question',
                'A live rendered example',
                'A list of objectives',
              ],
              answer: 2,
              explanation: 'Every lesson opens with a live example so you know what you are aiming at before you read any syntax.',
            },
            {
              id: 'quiz-css-l1-q4',
              type: 'blank',
              prompt: 'Complete the sentence: the order matters because media queries make no sense before you know ________.',
              answers: [
                'flexbox',
              ],
              explanation: 'Responsive design is built on top of a layout system. Without flexbox or grid there is nothing for a media query to rearrange.',
            },
            {
              id: 'quiz-css-l1-q5',
              type: 'multiple-choice',
              prompt: 'Which section of the course should you understand first?',
              options: [
                'Animations',
                'The box model',
                'Grid',
                'Specificity',
              ],
              answer: 1,
              explanation: 'The box model comes first because almost every later concept — margins, flexbox gaps, grid tracks — is defined in terms of it.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l1-b1',
            body: 'This course takes you from writing your first CSS rule to laying out a whole page with flexbox and grid. Every lesson in it is built the same way: you see the result first, then the rule that produced it, then you write one yourself.',
          },
          {
            type: 'demo',
            id: 'c-l1-d1',
            title: 'Where this course takes you',
            body: 'The same heading, the same paragraph and the same button, before and after. Only the CSS changes — which is the entire subject of this course.',
            html: `<div class="row">
  <div class="card">
    <h3>Static</h3>
    <p>No CSS applied. The browser picks sensible defaults and that is that.</p>
  </div>
  <div class="card styled">
    <h3>Styled</h3>
    <p>Same markup. A handful of CSS rules changed how it looks and where it sits.</p>
  </div>
</div>`,
            css: `.row {
  display: flex;
  gap: 1rem;
}
.card {
  flex: 1;
  border: 1px solid #d5dae0;
  border-radius: 10px;
  padding: 1rem;
  font-size: 14px;
}
.card h3 {
  margin: 0 0 0.5rem;
  font-size: 15px;
}
.card p {
  margin: 0;
}
.styled {
  border-color: #29e2bd;
  box-shadow: 0 8px 24px rgba(41, 226, 189, 0.18);
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l1-b2',
            body: 'That is the whole idea. HTML decides what a thing *is*, CSS decides only how it appears, and the markup underneath never has to change. The left card is the same HTML as the right one.',
          },
          {
            type: 'heading',
            id: 'c-l1-h1',
            level: 3,
            body: 'How the course is organised',
          },
          {
            type: 'list',
            id: 'c-l1-l1',
            style: 'bullet',
            items: [
              '**The box model first.** Margins, padding, borders, height and width. Almost every layout bug is really a box model bug wearing a disguise.',
              '**Colour, borders and backgrounds.** The properties that make something visible at all.',
              '**Text and fonts.** The properties that decide whether a page is comfortable to read.',
              '**Display and position.** How elements take up space, and how you take them out of flow when you need to.',
              '**Flexbox and grid.** The two layout systems that replaced floats for almost all real work.',
              '**Responsive design.** Media queries, relative units, and images that survive a phone.',
            ],
          },
          {
            type: 'text',
            id: 'c-l1-b3',
            body: 'The order is deliberate. Flexbox makes no sense before you know what a box is and how much space it occupies, and media queries make no sense before flexbox. If a lesson does not land, the fix is almost always in the section before it.',
          },
          {
            type: 'heading',
            id: 'c-l1-h2',
            level: 3,
            body: 'What every lesson looks like',
          },
          {
            type: 'list',
            id: 'c-l1-l2',
            style: 'ordered',
            items: [
              'A live example at the top. You see the finished result before you see a single line of code.',
              'The code that produced it, with the important parts called out.',
              'The rules and values, in a form you can look things up in.',
              'One challenge. You write the code, the platform runs it, and it tells you which property you got wrong.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l1-t1',
            title: 'Do the challenges even when the lesson made sense',
            body: 'Reading about flexbox and setting `flex-direction` correctly are different skills. The challenge is where the second one is built, and it takes about a minute.',
          },
          {
            type: 'exercise',
            id: 'c-l1-x1',
            exercise: {
              id: 'ex-l1',
              instructions:
                'Style the card below: give it a solid border, rounded corners, and 1rem of padding on every side.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">A card</div>',
                css: '.card {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l1-t1',
                  label: 'The card has a visible border',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".card")).borderTopWidth) > 0',
                },
                {
                  id: 'ex-l1-t2',
                  label: 'The corners are rounded',
                  body: 'return getComputedStyle(document.querySelector(".card")).borderTopLeftRadius !== "0px"',
                },
                {
                  id: 'ex-l1-t3',
                  label: 'The padding is 1rem on every side',
                  body: 'const s = getComputedStyle(document.querySelector(".card")); return s.paddingTop === "16px" && s.paddingRight === "16px" && s.paddingBottom === "16px" && s.paddingLeft === "16px"',
                },
              ],
              hints: [
                'Three separate properties: `border`, `border-radius` and `padding`.',
                'The root font size is 16px, so `1rem` computes to `16px`.',
                'Try `border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem;`',
              ],
              solution: {
                html: '<div class="card">A card</div>',
                css: '.card {\n  border: 1px solid #d5dae0;\n  border-radius: 10px;\n  padding: 1rem;\n}\n',
              },
              testNotes:
                'The tests read the computed style of `.card`. `1rem` resolves to `16px` at the default root font size.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s2',
    title: 'CSS Introduction',
    description: 'What CSS is, what it deliberately does not do, and how a browser finds your rules.',
    lessons: [
      {
        id: 'css-l2',
        title: 'CSS Introduction',
        description: 'The language of presentation, how a browser applies it, and why it was separated from HTML.',
        duration: 6,
        objectives: [
          'Say what CSS does and what it deliberately does not do',
          'Place presentation alongside structure and behaviour',
          'Describe how a browser turns a stylesheet into pixels',
          'Name the three ways to attach a stylesheet and their trade-offs',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l2',
          title: 'CSS Introduction quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l2-q1',
              type: 'multiple-choice',
              prompt: 'Which of these is CSS responsible for?',
              options: [
                'Deciding a paragraph is a paragraph',
                'Deciding what happens on click',
                'Deciding how that paragraph is coloured and spaced',
                'Fetching the data the paragraph shows',
              ],
              answer: 2,
              explanation: 'Structure is HTML, behaviour is JavaScript, and presentation is CSS. Each can be replaced without touching the others.',
            },
            {
              id: 'quiz-css-l2-q2',
              type: 'multiple-choice',
              prompt: 'At which step does the browser work out which rules apply to an element?',
              options: [
                'Parse',
                'Match',
                'Paint',
                'Composite',
              ],
              answer: 1,
              explanation: 'Matching happens after parsing and before layout. The cascade collects matching rules, then the winning values are computed.',
            },
            {
              id: 'quiz-css-l2-q3',
              type: 'true-false',
              prompt: 'A later CSS rule always beats an earlier one.',
              answer: false,
              explanation: 'Source order only breaks ties. A more specific earlier rule wins over a less specific later one, no matter which comes second in the file.',
            },
            {
              id: 'quiz-css-l2-q4',
              type: 'multiple-choice',
              prompt: 'Why is inline styling a poor choice in a real project?',
              options: [
                'Browsers ignore it',
                'It cannot be cached, reused or themed, and it beats every other rule',
                'It only works on paragraphs',
                'It makes the page load slower than any stylesheet',
              ],
              answer: 1,
              explanation: 'Inline styles have the highest specificity, so they are very hard to override, and they cannot be shared or cached across pages.',
            },
            {
              id: 'quiz-css-l2-q5',
              type: 'code-output',
              prompt: 'What colour is the paragraph?',
              code: 'body { color: grey; }\np { color: teal; }',
              options: [
                'Grey',
                'Teal',
                'Black',
                'The browser default',
              ],
              answer: 1,
              explanation: 'Both rules match the `p`. The `p` rule is more specific, so it wins even though the `body` rule would have inherited down to it.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l2-b1',
            body: 'CSS is a language of instructions you hand to the browser separately from the page. The browser reads your stylesheet, works out which elements each rule is talking about, and changes how they look. HTML decides *what* a thing is; CSS decides only how it appears. Paint a heading grey and it is still a heading for a screen reader, a search engine and a translation tool.',
          },
          {
            type: 'demo',
            id: 'c-l2-d1',
            title: 'The same content, unstyled',
            body: 'This is a heading, a paragraph, a link and a button with no CSS at all. It is completely usable, and completely ugly.',
            html: `<h2>Release notes</h2>
<p>Published by <a href="#">the platform team</a> on 1 March.</p>
<button type="button">Subscribe</button>`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l2-b2',
            body: 'Nothing in that markup is wrong. It is what HTML looked like before anyone separated presentation out of it, and it is why CSS exists.',
          },
          {
            type: 'heading',
            id: 'c-l2-h1',
            level: 3,
            body: 'The three pillars',
          },
          {
            type: 'text',
            id: 'c-l2-b3',
            body: 'Early HTML carried formatting in the markup itself, in tags like `<font>` and attributes like `color`. A site of two hundred pages meant editing two hundred files to change one brand colour. Splitting the three concerns fixed that, and every modern project keeps them apart:',
          },
          {
            type: 'list',
            id: 'c-l2-l1',
            style: 'bullet',
            items: [
              '**HTML — structure.** What each piece of content *is*: a heading, a paragraph, a form control, a list of things.',
              '**CSS — presentation.** How it looks and where it sits: colour, spacing, typography, layout.',
              '**JavaScript — behaviour.** What happens after the page loads, when someone clicks, types or scrolls.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l2-h2',
            level: 3,
            body: 'How a browser gets from your file to pixels',
          },
          {
            type: 'list',
            id: 'c-l2-l2',
            style: 'ordered',
            items: [
              '**Parse.** The browser reads the HTML and builds a tree of elements in memory. It has not drawn anything yet.',
              '**Match.** For every element, it runs through your stylesheet and collects the rules whose selectors match. This is the *cascade*.',
              '**Compute.** For each matched property it decides the winning value, resolving conflicts by specificity and source order.',
              '**Layout.** It works out the size and position of every box on the page.',
              '**Paint.** It fills in pixels, then composites the layers.',
            ],
          },
          {
            type: 'text',
            id: 'c-l2-b4',
            body: 'Only steps 3 to 5 are CSS. Steps 1 and 2 belong to HTML and the DOM. Knowing this split is what tells you which property to reach for when something is in the wrong place.',
          },
          {
            type: 'heading',
            id: 'c-l2-h3',
            level: 3,
            body: 'The same page with CSS applied',
          },
          {
            type: 'example',
            id: 'c-l2-e1',
            title: 'Same content, different appearance',
            body: 'This is the markup from the demo above, plus a stylesheet. The words, the link and the button are untouched — only their appearance changed.',
            html: `<h2>Release notes</h2>
<p>Published by <a href="#">the platform team</a> on 1 March.</p>
<button type="button">Subscribe</button>`,
            css: `body {
  background: #0b0d10;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}
h2 {
  color: #29e2bd;
  margin: 0 0 0.25rem;
}
p {
  margin: 0 0 1rem;
  color: #b9c2cc;
}
a {
  color: #7cc4ff;
}
button {
  background: #29e2bd;
  color: #0b0d10;
  border: 0;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font: inherit;
  cursor: pointer;
}`,
            showPreview: true,
          },
          {
            type: 'heading',
            id: 'c-l2-h4',
            level: 3,
            body: 'Three ways to attach CSS',
          },
          {
            type: 'code',
            id: 'c-l2-c1',
            language: 'html',
            title: 'Inline, internal and external, in one document',
            code: `<!-- 1. inline: on the element itself -->
<p style="color: teal;">Styled where it stands.</p>

<!-- 2. internal: a <style> block in the head of this one page -->
<style>
  p {
    color: teal;
  }
</style>

<!-- 3. external: a separate .css file, shared by every page -->
<link rel="stylesheet" href="styles.css" />`,
          },
          {
            type: 'list',
            id: 'c-l2-l3',
            style: 'bullet',
            items: [
              '**Inline** wins every conflict, which is exactly why it is a trap. It cannot be cached, reused or themed, and it is painful to delete.',
              '**Internal** is fine for a single page or a tiny component, but it is re-sent on every navigation and cannot be shared.',
              '**External** is the default for everything. One request, cached across pages, and the only option that scales past a single screen.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l2-w1',
            title: 'Specificity beats order, not the other way round',
            body: 'A later rule does not automatically win. If an earlier rule is more specific, the earlier one is applied and the later one is ignored outright. This is the single most common reason a style "will not apply", and you will meet it properly in the specificity section.',
          },
          {
            type: 'exercise',
            id: 'c-l2-x1',
            exercise: {
              id: 'ex-l2',
              instructions:
                'Style the page below so the heading is teal and the paragraph is grey. Set the colour on the `h1` and the `p`, not on `body`.',
              languages: ['css'],
              starterCode: {
                html: '<h1>Chapter one</h1>\n<p>The first thing that happened.</p>',
                css: 'body {\n  font-family: system-ui, sans-serif;\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l2-t1',
                  label: 'The heading is teal',
                  body: 'return getComputedStyle(document.querySelector("h1")).color === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l2-t2',
                  label: 'The paragraph is grey',
                  body: 'return getComputedStyle(document.querySelector("p")).color === "rgb(128, 128, 128)"',
                },
                {
                  id: 'ex-l2-t3',
                  label: 'Both colours are set on their own elements',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /h1\\s*\\{[^}]*color/.test(css) && /p\\s*\\{[^}]*color/.test(css)',
                },
              ],
              hints: [
                'Teal is `teal`, which computes to `rgb(0, 128, 128)`.',
                'Grey is `grey`, which computes to `rgb(128, 128, 128)`.',
                'Write a `h1 { ... }` rule and a `p { ... }` rule.',
              ],
              solution: {
                html: '<h1>Chapter one</h1>\n<p>The first thing that happened.</p>',
                css:
                  'body {\n  font-family: system-ui, sans-serif;\n}\nh1 {\n  color: teal;\n}\np {\n  color: grey;\n}\n',
              },
              testNotes:
                'The third test reads the stylesheet text to confirm the colours are on `h1` and `p` rather than inherited from `body`.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s3',
    title: 'CSS Syntax',
    description: 'The anatomy of a rule, how to attach one to a page, and the syntax errors that silently kill a block.',
    lessons: [
      {
        id: 'css-l3',
        title: 'CSS Syntax',
        description: 'Selector, declaration, property and value — and why a missing semicolon breaks everything after it.',
        duration: 6,
        objectives: [
          'Name the four parts of a CSS rule and label them in real code',
          'Attach a stylesheet to a document correctly',
          'Recognise the syntax error that disables a whole rule',
          'Explain what inheritance does and when it applies',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l3',
          title: 'CSS Syntax quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l3-q1',
              type: 'multiple-choice',
              prompt: 'In `p { color: teal; }`, what is `color`?',
              options: [
                'The selector',
                'The property',
                'The value',
                'The at-rule',
              ],
              answer: 1,
              explanation: '`p` is the selector, `color` is the property, and `teal` is the value. A declaration is the property and value together.',
            },
            {
              id: 'quiz-css-l3-q2',
              type: 'code-output',
              prompt: 'What colour is the paragraph?',
              code: 'p {\n  color: red\n  font-weight: 700;\n}',
              options: [
                'Red and bold, as written',
                'Red only, with the font-weight ignored',
                'The browser default colour',
                'Nothing renders at all',
              ],
              answer: 2,
              explanation: 'The missing semicolon makes the whole declaration invalid, so the browser discards it and the rule has nothing left to apply. The paragraph falls back to the default colour.',
            },
            {
              id: 'quiz-css-l3-q3',
              type: 'true-false',
              prompt: 'Margins are inherited by default.',
              answer: false,
              explanation: '`margin` does not inherit. Properties like `color` and `font-family` do, which is why you set them once on a parent.',
            },
            {
              id: 'quiz-css-l3-q4',
              type: 'blank',
              prompt: 'Which HTML element links an external stylesheet to a page? Give the element name only.',
              answers: [
                'link',
              ],
              explanation: 'The `link` element with `rel="stylesheet"` in the `head` is the standard way to attach an external stylesheet.',
            },
            {
              id: 'quiz-css-l3-q5',
              type: 'identify-error',
              prompt: 'Why does this rule do nothing at all?',
              code: '.card {\n  color blue;\n  padding: 1rem;\n}',
              options: [
                '`.card` is not a valid selector',
                'The colon after `color` is missing',
                '`padding` cannot be set on this element',
                'The property should be `text-color`',
              ],
              answer: 1,
              explanation: 'It reads `color blue` as a property named `color blue` with no value, which is invalid, so the declaration is dropped and only `padding` survives.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l3-b1',
            body: 'A CSS rule is always the same three-part shape: a **selector** that says which elements you mean, a **{ }** block, and inside it one or more **declarations**, each a property and a value separated by a colon. Everything else in the language is built from that pattern.',
          },
          {
            type: 'demo',
            id: 'c-l3-d1',
            title: 'A selector and two declarations',
            body: 'This paragraph is targeted by the selector `p`. Two declarations set its colour and its weight.',
            html: `<p class="demo-text">This paragraph is matched by the selector <code>p</code>.</p>`,
            css: `.demo-text {
  color: teal;
  font-weight: 700;
}`,
            height: 120,
          },
          {
            type: 'text',
            id: 'c-l3-b2',
            body: 'Read it as: *select every `p`, and set its `color` to `teal` and its `font-weight` to `700`*. The property names on the left are defined by the specification; the values on the right are your choice, within whatever range the property allows.',
          },
          {
            type: 'heading',
            id: 'c-l3-h1',
            level: 3,
            body: 'The four parts, labelled',
          },
          {
            type: 'code',
            id: 'c-l3-c1',
            language: 'css',
            title: 'Every part of a rule, annotated',
            code: `p            {  color: teal;  font-weight: 700;  }
/* selector */   /* prop */  /* val */ /* prop */  /* val */

{               /* declaration 1: property + value */
  color: teal;  /* the colon separates them; the semicolon ends the declaration */
}`,
          },
          {
            type: 'list',
            id: 'c-l3-l1',
            style: 'bullet',
            items: [
              '**Selector** — what to style. `p`, `.card`, `#header`, `a:hover`, `input[type="text"]`.',
              '**Declaration block** — the `{ }` pair holding the declarations for that selector.',
              '**Property** — the thing being changed. `color`, `margin`, `display`. Chosen by the specification, not by you.',
              '**Value** — what it changes to. `teal`, `16px`, `flex`, `1fr`. Must be valid for that property.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l3-h2',
            level: 3,
            body: 'Attaching a stylesheet',
          },
          {
            type: 'code',
            id: 'c-l3-c2',
            language: 'html',
            title: 'The link element, in the head',
            code: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My page</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>`,
          },
          {
            type: 'text',
            id: 'c-l3-b3',
            body: 'The `link` element belongs in the `head`, not the `body`. Putting it at the end of the document works, but the browser must download and parse the stylesheet before it can paint anything above it, which shows up as a flash of unstyled content.',
          },
          {
            type: 'heading',
            id: 'c-l3-h3',
            level: 3,
            body: 'The syntax error that breaks everything after it',
          },
          {
            type: 'demo',
            id: 'c-l3-d2',
            title: 'One missing semicolon',
            body: 'The first paragraph is styled. The second is not, even though its rule is almost correct. The missing semicolon after `color: red` swallowed the whole third line.',
            html: `<p class="bad-one">Styled: the rule is correct.</p>
<p class="bad-two">Not styled: the semicolon after <code>color: red</code> is missing.</p>`,
            css: `.bad-one {
  color: green;
}
.bad-two {
  color: red
  font-weight: 700;
}`,
            height: 150,
          },
          {
            type: 'text',
            id: 'c-l3-b4',
            body: 'Without the semicolon, `color: red font-weight: 700` is parsed as one declaration with a value of `red font-weight: 700`, which is invalid. The browser throws the entire declaration away, and because the rule now has nothing valid left, it drops the whole block. Nothing is logged loudly — the style just silently does not apply.',
          },
          {
            type: 'tip',
            id: 'c-l3-t1',
            title: 'Let the tooling find these for you',
            body: 'A linter flags a missing semicolon in milliseconds. If your editor has a CSS linter, leave it on. If a rule is not applying at all, check for this before you check anything else.',
          },
          {
            type: 'heading',
            id: 'c-l3-h4',
            level: 3,
            body: 'Inheritance, briefly',
          },
          {
            type: 'demo',
            id: 'c-l3-d3',
            title: 'An inherited value versus an overridden one',
            body: 'The first two items inherit `color` from the `ul`. The third is set directly and wins over the inherited value.',
            html: `<ul>
  <li>Inherited from the list</li>
  <li>Also inherited</li>
  <li style="color: crimson;">Set directly on the item</li>
</ul>`,
            css: `ul {
  color: teal;
  list-style: square;
  padding-left: 1.25rem;
}`,
            height: 170,
          },
          {
            type: 'text',
            id: 'c-l3-b5',
            body: 'Some properties — `color`, `font-family`, `line-height`, `text-align` — pass from a parent to its children automatically. That is inheritance, and it is why setting `color` once on `body` styles the whole page. Others, like `margin` and `border`, do not inherit, which is why you see them repeated on every element.',
          },
          {
            type: 'exercise',
            id: 'c-l3-x1',
            exercise: {
              id: 'ex-l3',
              instructions:
                'Fix the stylesheet so both headings are styled. There is a syntax error in it. Give the first heading a teal colour and the second a crimson one.',
              languages: ['css'],
              starterCode: {
                html: '<h1 class="first">One</h1>\n<h2 class="second">Two</h2>',
                css: '.first {\n  color: teal\n}\n.second {\n  color: crimson;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l3-t1',
                  label: 'The first heading is teal',
                  body: 'return getComputedStyle(document.querySelector(".first")).color === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l3-t2',
                  label: 'The second heading is crimson',
                  body: 'return getComputedStyle(document.querySelector(".second")).color === "rgb(220, 20, 60)"',
                },
                {
                  id: 'ex-l3-t3',
                  label: 'No declaration was silently dropped',
                  body: 'return [...document.styleSheets].every((s) => [...s.cssRules].every((r) => r.style.length > 0))',
                },
              ],
              hints: [
                'Look at the line right after `color: teal`.',
                'Every declaration except the last one needs a semicolon.',
                'The fix is to add `;` after `color: teal`.',
              ],
              solution: {
                html: '<h1 class="first">One</h1>\n<h2 class="second">Two</h2>',
                css: '.first {\n  color: teal;\n}\n.second {\n  color: crimson;\n}\n',
              },
              testNotes:
                'The third test confirms that every rule in the sheet still has at least one valid declaration after the fix.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s4',
    title: 'CSS Selectors',
    description: 'Targeting elements by tag, class and id, and why the class selector is the one you will use most.',
    lessons: [
      {
        id: 'css-l4',
        title: 'CSS Selectors',
        description: 'Element, class and id selectors, the universal selector, and specificity as it applies to each.',
        duration: 7,
        objectives: [
          'Target an element by tag name, by class and by id',
          'Explain why ids are discouraged in stylesheets despite being valid',
          'Use the universal selector and know when not to',
          'Predict which of two competing rules wins and why',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l4',
          title: 'CSS Selectors quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l4-q1',
              type: 'multiple-choice',
              prompt: 'Which selector targets every element carrying `class="card"`?',
              options: [
                '`card`',
                '`.card`',
                '`#card`',
                '`*card`',
              ],
              answer: 1,
              explanation: 'A dot introduces a class selector. `#` is for an id and a bare name is an element selector.',
            },
            {
              id: 'quiz-css-l4-q2',
              type: 'multiple-choice',
              prompt: 'Why are id selectors discouraged in stylesheets?',
              options: [
                'Browsers do not support them',
                'They cannot be combined with classes',
                'Their high specificity makes them very hard to override later',
                'They only work in inline styles',
              ],
              answer: 2,
              explanation: 'An id outranks any number of classes, so once an id rule exists, overriding it usually needs an even more specific selector or `!important`.',
            },
            {
              id: 'quiz-css-l4-q3',
              type: 'code-output',
              prompt: 'What colour is the paragraph?',
              code: '#x { color: blue; }\np { color: red; }',
              options: [
                'Blue',
                'Red',
                'The browser default',
                'Both apply, blue wins the paint order',
              ],
              answer: 0,
              explanation: 'The id selector is more specific, so it wins. The `p` rule written later is ignored entirely for this element.',
            },
            {
              id: 'quiz-css-l4-q4',
              type: 'true-false',
              prompt: 'An element can carry more than one class.',
              answer: true,
              explanation: 'Classes are a list, not a slot. `class="card card--featured"` is valid and both selectors match.',
            },
            {
              id: 'quiz-css-l4-q5',
              type: 'blank',
              prompt: 'Which universal-selector declaration is most commonly set on `*` at the top of a reset? Give the property name only.',
              answers: [
                'box-sizing',
                'box-sizing: border-box',
                'boxsizing',
              ],
              explanation: '`box-sizing: border-box` makes a declared width include padding and border, which removes a whole class of sizing bugs.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l4-b1',
            body: 'A selector is how you say which elements a rule is about. Three forms cover almost everything: match by **tag name**, match by **class**, and match by **id**. The class is the one you will reach for constantly, and the id is the one you will rarely use.',
          },
          {
            type: 'demo',
            id: 'c-l4-d1',
            title: 'Tag, class and id, side by side',
            body: 'The first paragraph is matched by tag name. The second carries the class `note`. The third carries the id `featured`. All three end up the same teal colour, reached three different ways.',
            html: `<p>Matched by tag name: <code>p</code></p>
<p class="note">Matched by class: <code>.note</code></p>
<p id="featured">Matched by id: <code>#featured</code></p>`,
            css: `p {
  color: teal;
}
.note {
  font-weight: 700;
}
#featured {
  text-decoration: underline;
}`,
            height: 180,
          },
          {
            type: 'text',
            id: 'c-l4-b2',
            body: 'Each line is a different rule, and each one produced a different effect. Nothing about the first rule stopped the second from applying — rules do not compete unless they set the *same* property on the *same* element.',
          },
          {
            type: 'heading',
            id: 'c-l4-h1',
            level: 3,
            body: 'The three selector types',
          },
          {
            type: 'list',
            id: 'c-l4-l1',
            style: 'bullet',
            items: [
              '**Element selector** — `p`, `h1`, `a`. Matches every element of that type on the page. Useful for baseline styling like body font, and dangerous for anything specific, because there is no way to exempt one.',
              '**Class selector** — `.note`. Matches any element carrying that class, and an element can carry several. This is the workhorse.',
              '**Id selector** — `#featured`. Matches exactly one element per page, because ids must be unique.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l4-h2',
            level: 3,
            body: 'Why classes beat ids in a stylesheet',
          },
          {
            type: 'demo',
            id: 'c-l4-d2',
            title: 'Reusing one class versus an id you cannot reuse',
            body: 'Both cards get the same class, so one rule styles both. An id could only ever be applied to one of them.',
            html: `<div class="card">Card one</div>
<div class="card">Card two</div>
<div class="card">Card three</div>`,
            css: `.card {
  border: 2px solid teal;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 14px;
}`,
            height: 210,
          },
          {
            type: 'list',
            id: 'c-l4-l2',
            style: 'bullet',
            items: [
              '**Reuse.** A class can go on as many elements as you like. An id can only go on one.',
              '**Specificity.** `#featured` scores far higher than `.note`, so an id rule is very hard to override later. That is a bug waiting to happen, not a feature.',
              '**The cascade wants low specificity.** Rules that are easy to override are rules that other people can change without fear.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l4-t1',
            title: 'Ids still exist',
            body: 'They are fine in the HTML as a fragment target and as a JavaScript hook. They are just a poor choice inside a stylesheet, where they fight you.',
          },
          {
            type: 'heading',
            id: 'c-l4-h3',
            level: 3,
            body: 'The universal selector',
          },
          {
            type: 'code',
            id: 'c-l4-c1',
            language: 'css',
            title: 'Every element on the page',
            code: `* {
  box-sizing: border-box;
}`,
          },
          {
            type: 'text',
            id: 'c-l4-b3',
            body: '`*` matches everything, which makes it the standard way to apply `box-sizing: border-box` once so that padding never changes an element\'s declared width. Keep it for that kind of global reset and avoid it anywhere else — a rule that matches everything is very hard to reason about.',
          },
          {
            type: 'example',
            id: 'c-l4-e1',
            title: 'A realistic reset, and what it buys you',
            body: 'The boxes below are all declared as 200px wide. With the default `content-box`, padding and border push the total past 200px. With `border-box`, 200px means 200px including everything.',
            html: `<div class="box">content-box</div>
<div class="box fixed">border-box</div>`,
            css: `.box {
  width: 200px;
  padding: 20px;
  border: 6px solid #d5dae0;
  background: #f2f5f8;
  font-size: 13px;
  margin-bottom: 0.75rem;
}
* {
  box-sizing: content-box;
}
.fixed {
  box-sizing: border-box;
  border-color: teal;
}`,
            showPreview: true,
          },
          {
            type: 'heading',
            id: 'c-l4-h4',
            level: 3,
            body: 'Which rule wins',
          },
          {
            type: 'text',
            id: 'c-l4-b4',
            body: 'Two rules that set the same property on the same element will conflict, and the browser has to pick one. It compares **specificity** first, and only falls back to source order when the scores tie. You will formalise this in the specificity section, but the short version now:',
          },
          {
            type: 'list',
            id: 'c-l4-l3',
            style: 'ordered',
            items: [
              'An id beats any number of classes.',
              'A class beats any number of element selectors.',
              'If specificity ties, the rule written later wins.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l4-w1',
            title: 'Order of writing does not beat specificity',
            body: 'Writing `p { color: red }` after `#x { color: blue }` does nothing. The id still wins, and the `p` rule is ignored. Specificity is checked before source order, not after.',
          },
          {
            type: 'exercise',
            id: 'c-l4-x1',
            exercise: {
              id: 'ex-l4',
              instructions:
                'Style the three badges so the one with the class `badge` is teal, and the one with the id `hot` is crimson. Leave the plain badge as it is.',
              languages: ['css'],
              starterCode: {
                html:
                  '<span class="plain">Plain</span>\n<span class="badge">Classed</span>\n<span id="hot">Hot</span>',
                css: '.plain {\n  color: grey;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l4-t1',
                  label: 'The plain badge is still grey',
                  body: 'return getComputedStyle(document.querySelector(".plain")).color === "rgb(128, 128, 128)"',
                },
                {
                  id: 'ex-l4-t2',
                  label: 'The class badge is teal',
                  body: 'return getComputedStyle(document.querySelector(".badge")).color === "rgb(0, 128, 128)"',
                },
                {
                  id: 'ex-l4-t3',
                  label: 'The id badge is crimson',
                  body: 'return getComputedStyle(document.querySelector("#hot")).color === "rgb(220, 20, 60)"',
                },
                {
                  id: 'ex-l4-t4',
                  label: 'Both new rules target the right selector',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /\\.badge\\s*\\{[^}]*color/.test(css) && /#hot\\s*\\{[^}]*color/.test(css)',
                },
              ],
              hints: [
                'A class selector starts with a dot; an id selector starts with a hash.',
                'Write two separate rules, one for each.',
                '`.badge { color: teal; }` and `#hot { color: crimson; }`',
              ],
              solution: {
                html:
                  '<span class="plain">Plain</span>\n<span class="badge">Classed</span>\n<span id="hot">Hot</span>',
                css:
                  '.plain {\n  color: grey;\n}\n.badge {\n  color: teal;\n}\n#hot {\n  color: crimson;\n}\n',
              },
              testNotes:
                'The fourth test confirms each colour is set by the selector you were asked to use, rather than by one shared rule.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s5',
    title: 'CSS How To',
    description: 'The three ways to attach a stylesheet, when each is the right choice, and how to link to a page from a subfolder.',
    lessons: [
      {
        id: 'css-l5',
        title: 'CSS How To',
        description: 'External, internal and inline stylesheets, plus the link element and relative paths.',
        duration: 6,
        objectives: [
          'Choose between external, internal and inline for a given situation',
          'Link a stylesheet to a page with a correct `link` element',
          'Write a relative path between folders and explain what it means',
          'Explain why a stylesheet in the head prevents a flash of unstyled content',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l5',
          title: 'CSS How To quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l5-q1',
              type: 'multiple-choice',
              prompt: 'Which attachment method should you use by default in a multi-page project?',
              options: [
                'A `style` attribute on each element',
                'An external stylesheet linked from the head',
                'A `style` block repeated in every page',
                'Inline styles generated by JavaScript',
              ],
              answer: 1,
              explanation: 'An external file is cached across pages, kept in one place, and reviewable. The other options duplicate rules and are hard to override.',
            },
            {
              id: 'quiz-css-l5-q2',
              type: 'multiple-choice',
              prompt: 'From `pages/about.html`, which `href` reaches `styles/site.css` in the site root?',
              options: [
                '`href="styles/site.css"`',
                '`href="pages/styles/site.css"`',
                '`href="/styles/site.css"`',
                '`href="./../styles.css"`',
              ],
              answer: 2,
              explanation: 'A leading slash resolves from the site root regardless of the current page depth. The first option would look inside `pages/`.',
            },
            {
              id: 'quiz-css-l5-q3',
              type: 'true-false',
              prompt: 'A browser will paint a page before it finishes loading an external stylesheet.',
              answer: false,
              explanation: 'Rendering is blocked on the stylesheet. That is why putting the `link` in the head avoids a flash of unstyled content.',
            },
            {
              id: 'quiz-css-l5-q4',
              type: 'blank',
              prompt: 'What attribute value on `link` marks the file as a stylesheet? Give the value only.',
              answers: [
                'stylesheet',
              ],
              explanation: '`rel="stylesheet"` is required. Without it the browser fetches the file and does nothing with it.',
            },
            {
              id: 'quiz-css-l5-q5',
              type: 'multiple-choice',
              prompt: 'What is the main practical problem with inline styles?',
              options: [
                'They are ignored by modern browsers',
                'They cannot be used on custom elements',
                'They cannot be reused or cached and they outrank every stylesheet rule',
                'They only work in print stylesheets',
              ],
              answer: 2,
              explanation: 'Inline styles have the highest specificity of all, so they are effectively impossible to override from a stylesheet, and they repeat on every element.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l5-b1',
            body: 'There are three ways to get CSS into a page, and picking between them is mostly a question of who else needs to reuse the rules. If more than one page needs them, they belong in an external file.',
          },
          {
            type: 'demo',
            id: 'c-l5-d1',
            title: 'The same rule, attached three ways',
            body: 'The left card is styled by an external stylesheet, the middle by a `style` block in this page, and the right by a `style` attribute on the element itself.',
            html: `<div class="grid">
  <div class="card ext">External</div>
  <div class="card int">Internal</div>
  <div class="card inl" style="border-color: teal; border-style: solid; border-width: 2px; border-radius: 8px; padding: 0.75rem;">Inline</div>
</div>`,
            css: `.grid {
  display: flex;
  gap: 0.5rem;
}
.card {
  flex: 1;
  border: 2px solid #d5dae0;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 13px;
}
.ext {
  border-color: teal;
}
.int {
  border-color: crimson;
}`,
            height: 150,
          },
          {
            type: 'text',
            id: 'c-l5-b2',
            body: 'All three cards look almost the same, and that is the problem. The rules are duplicated, so changing the radius means editing three places, and the left one is the only one you can reuse on another page.',
          },
          {
            type: 'heading',
            id: 'c-l5-h1',
            level: 3,
            body: 'When to use which',
          },
          {
            type: 'list',
            id: 'c-l5-l1',
            style: 'bullet',
            items: [
              '**External** — the default. One file, cached across every page, easy to review and to diff. Use this unless you have a reason not to.',
              '**Internal** — a `<style>` block in the head. Acceptable for a genuinely single-page document, and useful for a critical few rules you do not want to wait on a network request for.',
              '**Inline** — a `style` attribute on one element. Reserve it for a value you are injecting from JavaScript, where a stylesheet rule cannot reach it. Never hand-write it in markup.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l5-h2',
            level: 3,
            body: 'The link element',
          },
          {
            type: 'code',
            id: 'c-l5-c1',
            language: 'html',
            title: 'Linking a stylesheet',
            code: `<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="/styles/site.css" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter" />
</head>`,
          },
          {
            type: 'list',
            id: 'c-l5-l2',
            style: 'bullet',
            items: [
              '`rel="stylesheet"` is what tells the browser this file is a stylesheet. Without it the file is downloaded and ignored.',
              '`href` is a URL, so it can be relative or absolute. An absolute path starting with `/` is resolved from the site root, which is more predictable than a relative one.',
              'Multiple `link` elements are allowed and cascade in document order — the last one wins on a tie.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l5-h3',
            level: 3,
            body: 'Relative paths between folders',
          },
          {
            type: 'text',
            id: 'c-l5-b3',
            body: 'A relative `href` is resolved against the URL of the page, not against the stylesheet. So from `pages/about.html`, a link to `styles/site.css` looks in `pages/styles/site.css`, and `../styles/site.css` climbs one level first.',
          },
          {
            type: 'code',
            id: 'c-l5-c2',
            language: 'html',
            title: 'From pages/about.html',
            code: `<!-- the same folder -->
<link rel="stylesheet" href="styles.css" />

<!-- into a styles folder next to this page -->
<link rel="stylesheet" href="styles/site.css" />

<!-- up one level, then into styles -->
<link rel="stylesheet" href="../styles/site.css" />

<!-- from the site root, no matter how deep this page is -->
<link rel="stylesheet" href="/styles/site.css" />`,
          },
          {
            type: 'warning',
            id: 'c-l5-w1',
            title: 'A wrong path fails silently in production',
            body: 'A missing stylesheet produces a 404 in the network tab and an unstyled page, with no error on screen. If the page looks completely unstyled, check the `href` before you check anything in the CSS.',
          },
          {
            type: 'example',
            id: 'c-l5-e1',
            title: 'Why the stylesheet belongs in the head',
            body: 'A browser blocks rendering until it has the stylesheet. Put it in the head and the page appears already styled. Put it at the end of the body and you get a flash of the default styles first.',
            html: `<div class="panel">
  <h4>Flash of unstyled content</h4>
  <p>Inserting a stylesheet at the end of the body means everything above it paints with browser defaults first.</p>
</div>`,
            css: `.panel {
  border-left: 4px solid teal;
  padding: 0.75rem 1rem;
  background: #f2f5f8;
  font-size: 14px;
}
.panel h4 {
  margin: 0 0 0.25rem;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l5-x1',
            exercise: {
              id: 'ex-l5',
              instructions:
                'Style the alert below using a class, not an inline style. Give it a teal border, a pale teal background and 0.75rem of padding.',
              languages: ['css'],
              starterCode: {
                html: '<div style="border-color: teal; border-style: solid; border-width: 2px; padding: 0.75rem;">Saved</div>',
                css: '',
              },
              tests: [
                {
                  id: 'ex-l5-t1',
                  label: 'The alert has a 2px border',
                  body: 'return parseFloat(getComputedStyle(document.querySelector("div")).borderTopWidth) === 2',
                },
                {
                  id: 'ex-l5-t2',
                  label: 'The background is a pale teal',
                  body: 'const bg = getComputedStyle(document.querySelector("div")).backgroundColor; return bg === "rgb(224, 255, 247)" || bg === "rgb(240, 253, 250)"',
                },
                {
                  id: 'ex-l5-t3',
                  label: 'The padding is 0.75rem',
                  body: 'return getComputedStyle(document.querySelector("div")).paddingTop === "12px"',
                },
                {
                  id: 'ex-l5-t4',
                  label: 'The inline style attribute was removed',
                  body: 'return !document.querySelector("div").hasAttribute("style")',
                },
              ],
              hints: [
                'First remove the `style` attribute from the element in the HTML tab.',
                'Then write a class rule that targets the element.',
                'A pale teal background could be `background: #e0fff7`.',
              ],
              solution: {
                html: '<div class="alert">Saved</div>',
                css:
                  '.alert {\n  border: 2px solid teal;\n  background: #e0fff7;\n  padding: 0.75rem;\n}\n',
              },
              testNotes:
                'The fourth test checks the markup itself, so the styling has genuinely moved into the stylesheet rather than being duplicated.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s6',
    title: 'CSS Comments',
    description: 'Leaving notes in a stylesheet that never reach the browser, and when a comment is worth writing.',
    lessons: [
      {
        id: 'css-l6',
        title: 'CSS Comments',
        description: 'Comment syntax, why comments are stripped before the browser parses, and what is worth writing down.',
        duration: 4,
        objectives: [
          'Write a CSS comment with the correct syntax',
          'Explain why comments never reach the browser',
          'Use comments to record intent rather than to narrate the code',
          'Know when a comment is noise',
        ],
        xp: 30,
        quiz: {
          id: 'quiz-css-l6',
          title: 'CSS Comments quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l6-q1',
              type: 'blank',
              prompt: 'What is the opening token of a CSS comment? Give the two characters only.',
              answers: [
                '/*',
                '/ *',
              ],
              explanation: 'CSS has only the `/* ... */` form. There is no `//` line comment in a stylesheet.',
            },
            {
              id: 'quiz-css-l6-q2',
              type: 'true-false',
              prompt: 'Comments are sent to the browser and ignored at render time.',
              answer: false,
              explanation: 'The parser discards comments before it builds the rule tree, so they cost nothing at runtime and never reach the browser.',
            },
            {
              id: 'quiz-css-l6-q3',
              type: 'multiple-choice',
              prompt: 'Which comment is worth writing?',
              options: [
                '`/* set the color */` above `color: teal;`',
                '`/* matches the 4xl spacing step, do not change */` above `margin-top: 56px;`',
                '`/* this is the stylesheet for the card */` at the top of the file',
                'A comment above every single declaration',
              ],
              answer: 1,
              explanation: 'A good comment records intent or a constraint that the code cannot express. The rest restate what is already visible.',
            },
            {
              id: 'quiz-css-l6-q4',
              type: 'identify-error',
              prompt: 'What is wrong with this?',
              code: '.card {\n  // make it stand out\n  border: 2px solid teal;\n}',
              options: [
                'Comments cannot go inside a rule',
                'CSS has no `//` line comment, so the parser reads it as a selector and breaks the rule',
                'The comment needs to be a `<!-- -->` block',
                'Nothing, this is valid',
              ],
              answer: 1,
              explanation: '`//` is not a comment in CSS. It is parsed as a selector, which swallows the following declaration and invalidates the rule.',
            },
            {
              id: 'quiz-css-l6-q5',
              type: 'multiple-choice',
              prompt: 'You want to try a change without losing the old rule. What should you do?',
              options: [
                'Comment the old rule out and commit it',
                'Comment it out while experimenting, then delete it before committing',
                'Keep both rules permanently',
                'Copy the file as a backup and leave the original in place',
              ],
              answer: 1,
              explanation: 'Commenting out is a fine temporary move. Leaving commented-out code in a commit is dead code — version control already holds the history.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l6-b1',
            body: 'A comment is a note inside your stylesheet that the browser throws away before it parses anything. It costs nothing at runtime and can record the reasoning that the code itself cannot.',
          },
          {
            type: 'demo',
            id: 'c-l6-d1',
            title: 'A commented stylesheet',
            body: 'Everything below renders normally. The grey lines are comments — they are in the source, and nowhere in the output.',
            html: `<div class="card">Styled as usual</div>`,
            css: `/* Component: card
   Used in three places, so the rules live here rather than
   on each instance. */

.card {
  /* Brand accent comes from the design tokens, not a literal. */
  border: 2px solid teal;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 14px;
}

/* TODO: the marketing team wants a dashed variant. */
`,
            height: 120,
          },
          {
            type: 'text',
            id: 'c-l6-b2',
            body: 'The rendered output is identical whether the comments are there or not. They exist for whoever reads the file next, which is usually you, six months from now.',
          },
          {
            type: 'heading',
            id: 'c-l6-h1',
            level: 3,
            body: 'The syntax',
          },
          {
            type: 'code',
            id: 'c-l6-c1',
            language: 'css',
            title: 'Both forms',
            code: `/* Multi-line comment.
   Spans as many lines as you like. */

.card { color: teal; }  /* single-line, trailing */`,
          },
          {
            type: 'tip',
            id: 'c-l6-t1',
            title: 'There is no `//` comment in CSS',
            body: 'Unlike JavaScript, a CSS file has only the `/* */` form. A `//` line is parsed as a selector and breaks the rule that follows it.',
          },
          {
            type: 'heading',
            id: 'c-l6-h2',
            level: 3,
            body: 'What is worth writing down',
          },
          {
            type: 'list',
            id: 'c-l6-l1',
            style: 'bullet',
            items: [
              '**Why a value is what it is.** `margin-top: 56px; /* matches the 4xl spacing step */` saves the next reader from "tidying" it back to something arbitrary.',
              '**What a hack works around.** If you are fighting a third-party widget, record the workaround and the bug it routes around.',
              '**A decision that looks wrong.** `z-index: 9999; /* must beat the modal, which is 1000 */` is a fact about the codebase that nothing else records.',
              '**Markers.** `TODO`, `FIXME` and `HACK` are worth grepping for later.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l6-w1',
            title: 'A comment that restates the code is dead weight',
            body: '`/* make the color teal */` above `color: teal;` helps nobody and adds a line that can go out of date. Comment the reason, never the statement.',
          },
          {
            type: 'heading',
            id: 'c-l6-h3',
            level: 3,
            body: 'Commenting out code',
          },
          {
            type: 'code',
            id: 'c-l6-c2',
            language: 'css',
            title: 'Temporarily disabling a rule',
            code: `.card {
  border: 2px solid teal;
  /* border: 2px dashed crimson; */
  padding: 0.75rem;
}`,
          },
          {
            type: 'text',
            id: 'c-l6-b3',
            body: 'This is fine for five minutes while you try something. It is not fine in a commit, because git already remembers the line and a commented-out rule is dead code that linters and readers will both trip over. Delete it and let version control hold the history.',
          },
          {
            type: 'exercise',
            id: 'c-l6-x1',
            exercise: {
              id: 'ex-l6',
              instructions:
                'Add a comment above the `.badge` rule recording that the 3px left border is a deliberate brand accent, and that it should not be removed. The badge must keep its current appearance.',
              languages: ['css'],
              starterCode: {
                html: '<span class="badge">New</span>',
                css: '.badge {\n  border-left: 3px solid teal;\n  padding-left: 0.5rem;\n  font-size: 13px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l6-t1',
                  label: 'The comment is present',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return css.includes("brand")',
                },
                {
                  id: 'ex-l6-t2',
                  label: 'The comment sits above the badge rule',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); const i = css.indexOf("brand"); const j = css.indexOf(".badge"); return i > -1 && j > -1 && i < j',
                },
                {
                  id: 'ex-l6-t3',
                  label: 'The badge still looks the same',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".badge")).borderLeftWidth) === 3',
                },
              ],
              hints: [
                'A CSS comment opens with `/*` and closes with `*/`.',
                'Put it on the line immediately before `.badge {`.',
                'Something like `/* the 3px left border is a deliberate brand accent, do not remove */`',
              ],
              solution: {
                html: '<span class="badge">New</span>',
                css:
                  '/* the 3px left border is a deliberate brand accent, do not remove */\n.badge {\n  border-left: 3px solid teal;\n  padding-left: 0.5rem;\n  font-size: 13px;\n}\n',
              },
              testNotes:
                'The second test checks position, not just presence, so the comment is attached to the rule it explains.',
            },
          },
        ],
      },
    ],
  },
]
