import type { Section } from '~/types/content'

export const htmlCssSections: Section[] = [
  {
    id: 'html-s16',
    title: 'HTML CSS',
    description: 'What CSS is, the three ways to attach it, and the handful of properties you need to make a page presentable.',
    lessons: [
      {
        id: 'html-l21',
        title: 'What is CSS',
        description: 'Cascading Style Sheets, what the word cascading means, and why it is a separate language.',
        duration: 6,
        objectives: [
          'Say what CSS controls and what it deliberately does not',
          'Explain what cascading means using an inheritance example',
          'Describe the three levels of the cascade in order',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l21',
          title: 'What is CSS quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l21-q1',
              type: 'multiple-choice',
              prompt: 'What does the word cascading describe?',
              options: [
                'That stylesheets load in a particular order',
                'That a style on a parent applies to its children, and that the cascade decides which competing rule wins',
                'That CSS files are downloaded in parallel',
                'That inline styles are applied last',
              ],
              answer: 1,
              explanation: 'Two mechanisms: inheritance passes values down the tree, and the cascade resolves conflicts between rules. Together they are what cascading means.',
            },
            {
              id: 'quiz-html-l21-q2',
              type: 'multiple-choice',
              prompt: 'In what order does the cascade resolve competing declarations?',
              options: [
                'Source order, then specificity, then origin and importance',
                'Origin and importance, then specificity, then source order',
                'Specificity, then source order, then origin and importance',
                'Origin and importance, then source order, then specificity',
              ],
              answer: 1,
              explanation: 'The cascade first considers where a rule came from and whether it is marked !important, then how specific its selector is, and only then which rule came last.',
            },
            {
              id: 'quiz-html-l21-q3',
              type: 'multiple-choice',
              prompt: 'Which selector wins between #main, .card and p when all three set the same property?',
              options: [
                'p',
                '.card',
                '#main',
                'They are all equal, so the last one wins',
              ],
              answer: 2,
              explanation: 'Specificity ranks an id above a class and a class above a type selector, so #main outranks both of the others.',
            },
            {
              id: 'quiz-html-l21-q4',
              type: 'multiple-choice',
              prompt: 'Which of these properties is NOT inherited from a parent element by default?',
              options: [
                'color',
                'font-family',
                'line-height',
                'margin',
              ],
              answer: 3,
              explanation: 'Text-related properties such as colour, font and line-height inherit. Margins and borders do not, because every descendant inheriting them would push boxes outward.',
            },
            {
              id: 'quiz-html-l21-q5',
              type: 'multiple-choice',
              prompt: 'Which task is outside what CSS is for?',
              options: [
                'Setting the colour and size of text',
                'Controlling spacing and layout',
                'Reacting to a button click with behaviour',
                'Changing the page for different screen sizes',
              ],
              answer: 2,
              explanation: 'CSS handles presentation and layout, including responsive changes. Behaviour belongs to JavaScript.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l21-b1',
            body: 'Cascading Style Sheets is the language used to format the layout of a webpage. With CSS you control the colour, font and size of text, the spacing between elements, how elements are positioned and laid out, which background image or colour is used, and how the page changes for different devices and screen sizes.',
          },
          {
            type: 'demo',
            id: 'c-l21-d1',
            title: 'Cascading and inheritance in one example',
            body: 'The body is coloured blue. Every heading and paragraph inside it is blue too, because those properties are inherited — and nothing below has overridden them.',
            html: `<h2>Release notes</h2>
<p>Published by the platform team on 1 March.</p>
<p>Nothing in this body sets a colour of its own, so all three inherit from the rule below.</p>`,
            css: `body {
  color: blue;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}`,
            height: 150,
          },
          {
            type: 'heading',
            id: 'c-l21-h1',
            level: 3,
            body: 'What cascading means',
          },
          {
            type: 'text',
            id: 'c-l21-b2',
            body: 'Cascading means that a style applied to a parent element also applies to all the child elements within that parent. If you set the colour of the body text to blue, all headings, paragraphs and other text elements inside the body will also get that colour, unless you specify something else. The word describes two separate mechanisms working together: inheritance, which passes values down the tree, and the cascade, which decides which of several competing rules wins.',
          },
          {
            type: 'list',
            id: 'c-l21-l1',
            style: 'ordered',
            items: [
              '**Origin and importance.** Did this come from the author, the user, or the browser default? Is it marked `!important`?',
              '**Specificity.** Which selector describes its target most precisely? `#id` beats `.class` beats `tag`.',
              '**Source order.** If both rules are equally specific and equally important, the one that comes last wins.',
            ],
          },
          {
            type: 'text',
            id: 'c-l21-b3',
            body: 'Not every property is inherited. Colour, font and line-height are, because it would be tedious to set them on every element. Margins and borders are not, because you would not want every descendant of a box to be pushed outward by the same amount. The full list of inherited properties is worth knowing before you write a reset.',
          },
          {
            type: 'tip',
            id: 'c-l21-t1',
            title: 'Why CSS is a separate file at all',
            body: 'When formatting lived in the markup, changing one brand colour meant editing every page. Separating the two means one file can restyle a thousand pages, and it means the same markup can be presented completely differently without being touched.',
          },
          {
            type: 'exercise',
            id: 'c-l21-x1',
            exercise: {
              id: 'ex-l21',
              instructions:
                'Set a colour on the body and let it cascade. Then override the colour on one paragraph only, without changing the body rule.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<h2>Release notes</h2>\n<p>The first paragraph inherits.</p>\n<p class="override">This one does not.</p>\n',
                css: 'body {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l21-t1',
                  label: 'The body sets a colour',
                  body: 'return getComputedStyle(document.body).color !== "rgb(0, 0, 0)"',
                },
                {
                  id: 'ex-l21-t2',
                  label: 'The first paragraph inherited the body colour',
                  body:
                    'const h = getComputedStyle(document.querySelector("h2")).color; const p = getComputedStyle(document.querySelectorAll("p")[0]).color; return h === p && h === getComputedStyle(document.body).color',
                },
                {
                  id: 'ex-l21-t3',
                  label: 'The second paragraph has a different colour',
                  body:
                    'const ps = document.querySelectorAll("p"); return getComputedStyle(ps[0]).color !== getComputedStyle(ps[1]).color',
                },
                {
                  id: 'ex-l21-t4',
                  label: 'The override uses the class, not an inline style',
                  body: 'return !document.querySelector(".override").hasAttribute("style")',
                },
              ],
              hints: [
                'Put the colour on `body` and it will reach everything inside it.',
                'Then add a rule for `.override` that sets a different colour.',
              ],
              solution: {
                html:
                  '<h2>Release notes</h2>\n<p>The first paragraph inherits.</p>\n<p class="override">This one does not.</p>\n',
                css: 'body {\n  color: #0f766e;\n}\n.override {\n  color: #b91c1c;\n}\n',
              },
              testNotes:
                'The second test compares the computed colour of the body, the heading and the first paragraph. They match only if inheritance carried the value down.',
            },
          },
        ],
      },
      {
        id: 'html-l22',
        title: 'Inline CSS',
        description: 'The style attribute, why it works, and the three reasons not to reach for it.',
        duration: 5,
        objectives: [
          'Apply a style to a single element with the style attribute',
          'Explain why an inline style beats almost every stylesheet rule',
          'Name the three situations where an inline style is the right choice',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l22',
          title: 'Inline CSS quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l22-q1',
              type: 'multiple-choice',
              prompt: 'Which attribute applies CSS directly to a single element?',
              options: [
                'class',
                'id',
                'style',
                'rel',
              ],
              answer: 2,
              explanation: 'The `style` attribute holds declarations for that one element. A `class` or `id` is only a hook that a stylesheet rule can target.',
            },
            {
              id: 'quiz-html-l22-q2',
              type: 'multiple-choice',
              prompt: 'Why does an inline style usually beat a rule in an external stylesheet?',
              options: [
                'Because inline styles are downloaded last',
                'Because stylesheet rules never apply to elements that have a style attribute',
                'Because inline styles are marked !important automatically',
                'Because the browser treats a style attribute as if it had a unique id, outranking any normal selector',
              ],
              answer: 3,
              explanation: 'The style attribute has a specificity above any ordinary selector. Only an !important declaration in a stylesheet outranks it.',
            },
            {
              id: 'quiz-html-l22-q3',
              type: 'multiple-choice',
              prompt: 'Which is a genuine reason to use an inline style?',
              options: [
                'To colour every heading on the site consistently',
                'To keep the CSS out of the HTML file',
                'To apply a pixel width calculated by JavaScript at runtime',
                'To make a rule easier to override later with a class',
              ],
              answer: 2,
              explanation: 'A value the script computes has to be written somewhere, and the style attribute is the place that accepts a per-element computed value.',
            },
            {
              id: 'quiz-html-l22-q4',
              type: 'true-false',
              prompt: 'Many email clients strip <style> blocks but keep style attributes, which is one reason inline CSS survives in email templates.',
              answer: true,
              explanation: 'Email clients have limited and inconsistent CSS support, so inline styles are often the only reliable way to style a message.',
            },
            {
              id: 'quiz-html-l22-q5',
              type: 'multiple-choice',
              prompt: 'What can you NOT do with a style that was written inline?',
              options: [
                'Apply it to a single element',
                'Change the value it sets',
                'Target it from a class or a media query',
                'Set a colour with it',
              ],
              answer: 2,
              explanation: 'A class rule or media query needs a selector to match, and an inline declaration has none. That is why inline styles cannot respond to screen size.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l22-b1',
            body: 'Inline CSS applies a unique style to a single HTML element using the `style` attribute. It is the most specific thing you can write short of `!important`, because the browser treats it as if it had been given a unique id. That is exactly why it is useful for a one-off and exactly why it is a poor default.',
          },
          {
            type: 'demo',
            id: 'c-l22-d1',
            title: 'Inline styles winning over a stylesheet',
            body: 'The stylesheet below sets every heading to grey. The second heading carries an inline style and stays blue, because an inline style outranks any selector short of !important.',
            html: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<h1 style="color: blue;">This heading keeps its inline style</h1>`,
            css: `h1 { color: grey; }
p { color: red; }`,
            height: 140,
          },
          {
            type: 'code',
            id: 'c-l22-c1',
            language: 'html',
            title: 'Inline styling two elements',
            code: `<h1 style="color:blue;">A Blue Heading</h1>

<p style="color:red;">A red paragraph.</p>`,
          },
          {
            type: 'heading',
            id: 'c-l22-h1',
            level: 3,
            body: 'When it is the right choice',
          },
          {
            type: 'list',
            id: 'c-l22-l1',
            style: 'bullet',
            items: [
              '**A value computed at runtime.** A script writing an exact pixel width or a transform has to go somewhere, and the style attribute is the only place that takes a computed value.',
              '**An email template.** Many mail clients strip `<style>` blocks but keep `style` attributes.',
              '**A deliberate override.** One element that must differ from a rule it inherits, and the reason is genuinely local.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l22-w1',
            title: 'What you lose by using it everywhere',
            body: 'You cannot target an inline style with a class or a media query, so it cannot be restyled, cannot respond to a breakpoint, and cannot be changed without finding every occurrence. It also bloats the markup and makes the document harder to read than the content it contains.',
          },
          {
            type: 'tip',
            id: 'c-l22-t1',
            title: 'The rule of thumb',
            body: 'If you are writing a style by hand and thinking about how it looks, it belongs in the stylesheet. If a script computed it, the style attribute is fine.',
          },
          {
            type: 'exercise',
            id: 'c-l22-x1',
            exercise: {
              id: 'ex-l22',
              instructions:
                'Colour the heading blue and the paragraph red using inline styles, exactly as the example above.',
              languages: ['html'],
              starterCode: {
                html: '<h1>A Blue Heading</h1>\n\n<p>A red paragraph.</p>\n',
              },
              tests: [
                {
                  id: 'ex-l22-t1',
                  label: 'The heading renders blue',
                  body: 'return getComputedStyle(document.querySelector("h1")).color === "rgb(0, 0, 255)"',
                },
                {
                  id: 'ex-l22-t2',
                  label: 'The paragraph renders red',
                  body: 'return getComputedStyle(document.querySelector("p")).color === "rgb(255, 0, 0)"',
                },
                {
                  id: 'ex-l22-t3',
                  label: 'Both colours came from style attributes',
                  body:
                    'return document.querySelectorAll("[style]").length === 2',
                },
              ],
              hints: [
                'The attribute goes inside the opening tag: `<h1 style="color:blue;">`.',
                'The CSS is `color:blue` — the element name is not repeated inside the style value.',
              ],
              solution: {
                html: '<h1 style="color:blue;">A Blue Heading</h1>\n\n<p style="color:red;">A red paragraph.</p>\n',
              },
              testNotes:
                'The third test confirms the colours came from the markup rather than a stylesheet, which is what makes this inline CSS.',
            },
          },
        ],
      },
      {
        id: 'html-l23',
        title: 'Internal CSS',
        description: 'The style element in the head, and when a page needs its own rules.',
        duration: 5,
        objectives: [
          'Write an internal stylesheet in a style element inside the head',
          'Explain why it must be in the head and not the body',
          'Decide between internal and external for a given project',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l23',
          title: 'Internal CSS quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l23-q1',
              type: 'blank',
              prompt: 'Which element in the head refers to an external stylesheet?',
              answers: [
                'link',
                '<link>',
              ],
              explanation: '`<link rel="stylesheet" href="...">` points at an external file. The `<style>` element holds internal rules.',
            },
            {
              id: 'quiz-html-l23-q2',
              type: 'multiple-choice',
              prompt: 'Where do internal CSS rules live?',
              options: [
                'In a `<style>` element inside the document',
                'In a `style` attribute on every element',
                'In the page’s `<title>` element',
                'In a separate `.css` file',
              ],
              answer: 0,
              explanation: 'Internal CSS is written in a `<style>` block, usually in the head. A separate file is external CSS, and a `style` attribute is inline CSS.',
            },
            {
              id: 'quiz-html-l23-q3',
              type: 'multiple-choice',
              prompt: 'Why should a <style> element sit in the head rather than at the end of the body?',
              options: [
                'The head is the only place the parser accepts a style element',
                'Styles in the body cannot be overridden',
                'It makes the stylesheet cacheable across pages',
                'The rules are available before the body is rendered, avoiding a flash of unstyled content',
              ],
              answer: 3,
              explanation: 'Rules in the head are parsed before the content is painted. Put them at the end of the body and the page appears unstyled first, then restyles.',
            },
            {
              id: 'quiz-html-l23-q4',
              type: 'true-false',
              prompt: 'An internal stylesheet is downloaded once and reused from cache by every other page on the site.',
              answer: false,
              explanation: 'Internal CSS lives inside one document, so there is no separate file to cache and nothing another page can reuse.',
            },
            {
              id: 'quiz-html-l23-q5',
              type: 'multiple-choice',
              prompt: 'Which situation genuinely suits an internal stylesheet?',
              options: [
                'A single-page prototype where a second file is friction',
                'A large site where every page shares the same palette',
                'A page whose styles must be reused by twenty other pages',
                'A site whose colours must be changeable in one place',
              ],
              answer: 0,
              explanation: 'Internal CSS is scoped to one document and cannot be shared. That makes it a good fit for a one-off page and a poor fit for a site.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l23-b1',
            body: 'Internal CSS defines styles for a single page. It is written in a `<style>` element inside the `<head>`, and it applies to every matching element in that document and nowhere else. This is the middle ground between an inline style and a full stylesheet: one element to edit, but every rule in one place.',
          },
          {
            type: 'demo',
            id: 'c-l23-d1',
            title: 'One style element, every matching element on the page',
            body: 'Both headings and both paragraphs are styled by the four rules in the head. The background is powderblue, exactly as the example sets out.',
            html: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<h1>And a second heading</h1>
<p>And a second paragraph.</p>`,
            css: `body { background-color: powderblue; }
h1   { color: blue; }
p    { color: red; }`,
            height: 150,
          },
          {
            type: 'code',
            id: 'c-l23-c1',
            language: 'html',
            title: 'A complete internal stylesheet',
            code: `<!DOCTYPE html>
<html>
<head>
<style>
body {background-color: powderblue;}
h1   {color: blue;}
p    {color: red;}
</style>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`,
          },
          {
            type: 'heading',
            id: 'c-l23-h1',
            level: 3,
            body: 'Why it lives in the head',
          },
          {
            type: 'text',
            id: 'c-l23-b2',
            body: 'A style element in the head is parsed before the body, so the browser has the rules in hand before it starts rendering the content. Put the same element at the end of the body and the page still works, but the browser paints unstyled content first and then restyles it — a flash of unstyled content that is visible on a slow connection and to anyone with a slow device.',
          },
          {
            type: 'list',
            id: 'c-l23-l1',
            style: 'bullet',
            items: [
              '**One page only** and the rules are genuinely specific to it — a print stylesheet, a campaign landing page, an email.',
              '**A prototype or a CodePen**, where a second file is friction.',
              '**A critical above-the-fold rule set** inlined during a build, with the rest external.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l23-t1',
            title: 'Most pages should not have one',
            body: 'An internal stylesheet cannot be shared, cached or reused. It is a fine answer for a single page and a poor one for a site, and it is the usual reason a project ends up with the same colours copy-pasted into twenty different files.',
          },
          {
            type: 'exercise',
            id: 'c-l23-x1',
            exercise: {
              id: 'ex-l23',
              instructions:
                'Add an internal stylesheet that gives the page a powderblue background, blue headings and red paragraphs.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Report</title>\n  \n</head>\n<body>\n  <h1>This is a heading</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n',
                css: '/* the rules below belong in a style element in the head */\n',
              },
              tests: [
                {
                  id: 'ex-l23-t1',
                  label: 'There is a style element in the head',
                  body: 'return !!document.querySelector("head style")',
                },
                {
                  id: 'ex-l23-t2',
                  label: 'The body background is powderblue',
                  body: 'return getComputedStyle(document.body).backgroundColor === "rgb(176, 224, 230)"',
                },
                {
                  id: 'ex-l23-t3',
                  label: 'The heading is blue',
                  body: 'return getComputedStyle(document.querySelector("h1")).color === "rgb(0, 0, 255)"',
                },
                {
                  id: 'ex-l23-t4',
                  label: 'The paragraph is red',
                  body: 'return getComputedStyle(document.querySelector("p")).color === "rgb(255, 0, 0)"',
                },
              ],
              hints: [
                'The style element belongs between the title and the closing head tag.',
                'Each rule is a selector, a brace, and then the declarations.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Report</title>\n  <style>\n    body { background-color: powderblue; }\n    h1   { color: blue; }\n    p    { color: red; }\n  </style>\n</head>\n<body>\n  <h1>This is a heading</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n',
              },
              testNotes:
                'Powderblue is rgb(176, 224, 230), which is what the test compares against.',
            },
          },
        ],
      },
      {
        id: 'html-l24',
        title: 'External CSS',
        description: 'The link element, one file for many pages, and the one change that restyles a whole site.',
        duration: 5,
        objectives: [
          'Link an external stylesheet with a link element',
          'Explain the caching and maintenance benefit of one shared file',
          'Write a valid .css file with no HTML in it',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l24',
          title: 'External CSS quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l24-q1',
              type: 'multiple-choice',
              prompt: 'What is the main maintenance benefit of one external stylesheet shared by every page?',
              options: [
                'Each page downloads its own copy, so caching never matters',
                'One edit restyles every page that links the file',
                'It removes the need for a `<head>` element',
                'It makes inline styles override the cascade',
              ],
              answer: 1,
              explanation: 'Every page links the same file, so one change updates the whole site. The browser can also cache that single file between pages.',
            },
            {
              id: 'quiz-html-l24-q2',
              type: 'multiple-choice',
              prompt: 'Which two attributes does a stylesheet link require?',
              options: [
                'rel="stylesheet" and href',
                'type="css" and src',
                'class="stylesheet" and href',
                'media="css" and src',
              ],
              answer: 0,
              explanation: 'rel says what the linked resource is and href says where it lives. Without rel="stylesheet" the browser has no reason to apply the file as CSS.',
            },
            {
              id: 'quiz-html-l24-q3',
              type: 'multiple-choice',
              prompt: 'Besides easier maintenance, what does one shared external stylesheet give a multi-page site?',
              options: [
                'Each page downloads the file again, so it stays current',
                'It removes the need for a head element',
                'The file is downloaded once and reused from the browser cache on later pages',
                'It lets inline styles win more often',
              ],
              answer: 2,
              explanation: 'The browser caches the file under its URL, so navigating to another page that links the same file usually costs no second download.',
            },
            {
              id: 'quiz-html-l24-q4',
              type: 'multiple-choice',
              prompt: 'What does media="print" on a stylesheet link do?',
              options: [
                'Downloads the sheet only when the user prints',
                'Converts the page to a printable format',
                'Makes the sheet apply to every medium',
                'Restricts the sheet to print output',
              ],
              answer: 3,
              explanation: 'The media attribute limits when a sheet applies. media="print" keeps those rules out of the screen rendering.',
            },
            {
              id: 'quiz-html-l24-q5',
              type: 'multiple-choice',
              prompt: 'What should a .css file contain?',
              options: [
                'Rules only, with no HTML and no <style> wrapper',
                'A doctype followed by rules',
                'A <style> element wrapping the rules',
                'A full HTML document with styles in the head',
              ],
              answer: 0,
              explanation: 'The file is linked as CSS, not parsed as a document, so any HTML in it is an error. The <style> wrapper belongs only to internal CSS.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l24-b1',
            body: 'An external style sheet defines styles for many HTML pages. To use one, add a `<link>` element to the `<head>` of each page. This is the most common way to add CSS, because the styles live in a file that every page shares — and the browser downloads it once and reuses it from cache on every page after the first.',
          },
          {
            type: 'demo',
            id: 'c-l24-d1',
            title: 'The page, styled entirely by a linked file',
            body: 'Nothing in this markup carries a style attribute or a class. Every visual decision comes from the linked stylesheet.',
            html: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>
<a href="#">And a link</a>`,
            css: `body {
  background-color: powderblue;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}
h1 { color: blue; }
p { color: red; }
a { color: navy; }`,
            height: 150,
          },
          {
            type: 'code',
            id: 'c-l24-c1',
            language: 'html',
            title: 'The document and the file it points at',
            code: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>

<!-- styles.css — no HTML, no doctype, no <style> wrapper -->

body {
  background-color: powderblue;
}
h1 {
  color: blue;
}
p {
  color: red;
}`,
          },
          {
            type: 'heading',
            id: 'c-l24-h1',
            level: 3,
            body: 'The link element',
          },
          {
            type: 'list',
            id: 'c-l24-l1',
            style: 'bullet',
            items: [
              '`rel="stylesheet"` says what the relationship is. It is not optional and it is not decorative.',
              '`href` is the path to the file, and it is resolved exactly like any other link.',
              '`media` optionally restricts the sheet to a medium, such as `media="print"`.',
              'The file must be saved with a `.css` extension and must contain nothing but CSS.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l24-t1',
            title: 'This is the whole argument for external styles',
            body: 'With an external sheet you can change the look of an entire website by changing one file. Nothing else in the pipeline gives you that: not a build step, not a component library, not a design token file.',
          },
          {
            type: 'warning',
            id: 'c-l24-w1',
            title: 'Linking is not loading',
            body: 'A stylesheet in the head blocks rendering until it has been fetched and parsed. That is usually correct — but a large sheet on a slow connection delays the first paint, which is the main reason critical CSS sometimes gets inlined and the rest deferred.',
          },
          {
            type: 'exercise',
            id: 'c-l24-x1',
            exercise: {
              id: 'ex-l24',
              instructions:
                'Link an external stylesheet from the head. The linked file already contains the rules; the document just needs to point at it.',
              languages: ['html'],
              starterCode: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Report</title>\n  \n</head>\n<body>\n  <h1>This is a heading</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l24-t1',
                  label: 'There is a link element with rel="stylesheet" in the head',
                  body: 'return !!document.querySelector("head link[rel=\'stylesheet\']")',
                },
                {
                  id: 'ex-l24-t2',
                  label: 'The link points at a .css file',
                  body: 'return /\\.css(\\?|$)/.test(document.querySelector("head link").getAttribute("href"))',
                },
                {
                  id: 'ex-l24-t3',
                  label: 'The heading is still blue from the linked sheet',
                  body: 'return getComputedStyle(document.querySelector("h1")).color === "rgb(0, 0, 255)"',
                },
                {
                  id: 'ex-l24-t4',
                  label: 'No element carries an inline style',
                  body: 'return document.querySelectorAll("[style]").length === 0',
                },
              ],
              hints: [
                'The link goes in the head, next to the title.',
                'It needs both attributes: `<link rel="stylesheet" href="styles.css">`.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Report</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <h1>This is a heading</h1>\n  <p>This is a paragraph.</p>\n</body>\n</html>\n',
              },
              testNotes:
                'The harness supplies styles.css with the rules from the example, so the heading renders blue only if the link is correct.',
            },
          },
        ],
      },
      {
        id: 'html-l25',
        title: 'CSS Colors, Fonts and Sizes',
        description: 'The three properties that change how text reads, and what each one actually controls.',
        duration: 5,
        objectives: [
          'Set text colour, font family and font size with CSS',
          'Explain why font-family takes a list',
          'Choose a relative unit for text size rather than an absolute one',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l25',
          title: 'CSS Colors, Fonts and Sizes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l25-q1',
              type: 'multiple-choice',
              prompt: 'Why should a font-family value always end with a generic family such as sans-serif?',
              options: [
                'Generic families load faster',
                'Because the named fonts may not be installed, and the generic family is the guaranteed fallback',
                'Because browsers ignore everything after the first font name',
                'Because generic families are the only accessible option',
              ],
              answer: 1,
              explanation: 'The browser can only use fonts installed on the machine. Without a generic family at the end, a missing font leaves the browser to guess.',
            },
            {
              id: 'quiz-html-l25-q2',
              type: 'multiple-choice',
              prompt: 'A font-size written in rem is relative to what?',
              options: [
                'The parent element font size',
                'The viewport width',
                'The root element font size',
                'The browser default of 16px, always',
              ],
              answer: 2,
              explanation: 'rem means root em, so every rem on the page scales from the font size set on the html element.',
            },
            {
              id: 'quiz-html-l25-q3',
              type: 'code-output',
              prompt: 'The html element has font-size: 16px and the h1 has font-size: 300%. How large is the heading?',
              code: 'html { font-size: 16px; }\nh1 { font-size: 300%; }',
              options: [
                '3px',
                '19px',
                '48px',
                '300px',
              ],
              answer: 2,
              explanation: 'A percentage font size is relative to the size the element would otherwise inherit, so 300% of 16px is 48px.',
            },
            {
              id: 'quiz-html-l25-q4',
              type: 'multiple-choice',
              prompt: 'Why is a relative unit like rem usually a better choice than px for body text?',
              options: [
                'It renders in more browsers',
                'It scales with the reader’s own default font size',
                'It is shorter to type',
                'It prevents the text from wrapping',
              ],
              answer: 1,
              explanation: 'A px size ignores a user who has raised their default text size. Relative units let the whole page scale with that preference.',
            },
            {
              id: 'quiz-html-l25-q5',
              type: 'multiple-choice',
              prompt: 'Which generic font family should end the stack for code, so characters line up in columns?',
              options: [
                'serif',
                'cursive',
                'monospace',
                'fantasy',
              ],
              answer: 2,
              explanation: 'A monospace face gives every character the same width, which is what makes code and aligned output readable.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l25-b1',
            body: 'Three properties cover most of what people mean when they say they have styled some text. The `color` property defines the text colour. The `font-family` property defines the font. The `font-size` property defines the size. You will meet all three again in the CSS course; this is only enough to make a document readable.',
          },
          {
            type: 'demo',
            id: 'c-l25-d1',
            title: 'All three properties on two elements',
            body: 'The heading is blue, Verdana and 300% of the inherited size. The paragraph is red, Courier and 160%.',
            html: `<h1>This is a heading</h1>
<p>This is a paragraph.</p>`,
            css: `h1 {
  color: blue;
  font-family: verdana;
  font-size: 300%;
}
p {
  color: red;
  font-family: courier;
  font-size: 160%;
}`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l25-h1',
            level: 3,
            body: 'Why font-family takes a list',
          },
          {
            type: 'text',
            id: 'c-l25-b2',
            body: 'The browser only has the fonts installed on the machine. `font-family: verdana` means "use Verdana if it happens to be installed", with no fallback and no guarantee. A list is a set of preferences: use the first one available, and if none are available, use the generic family at the end. Always finish with a generic family, or a missing font leaves the browser to guess.',
          },
          {
            type: 'code',
            id: 'c-l25-c1',
            language: 'plaintext',
            title: 'Font stacks and size units',
            code: `body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

/* generic families: always end the stack with one */
sans-serif   a plain sans-serif
serif        a plain serif
monospace    fixed-width, for code
cursive      a handwriting-like face
fantasy      a decorative face
system-ui    whatever the operating system uses

/* size units */
1rem    relative to the root font size — almost always what you want
1em     relative to the parent element's font size
100%     the same as 1em for font-size
16px    an absolute size, unaffected by anything above it`,
          },
          {
            type: 'tip',
            id: 'c-l25-t1',
            title: 'Set the size once, on the root',
            body: 'Set `font-size` on `html` and then use `rem` everywhere. Every other size on the page becomes relative to one value, which is what makes a user who has increased their default text size get a page that responds properly.',
          },
          {
            type: 'exercise',
            id: 'c-l25-x1',
            exercise: {
              id: 'ex-l25',
              instructions:
                'Set the heading to Verdana at 300% and blue, and the paragraph to Courier at 160% and red.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n',
                css: 'h1 {\n  \n}\n\np {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l25-t1',
                  label: 'The heading font family is Verdana',
                  body: 'return /verdana/i.test(getComputedStyle(document.querySelector("h1")).fontFamily)',
                },
                {
                  id: 'ex-l25-t2',
                  label: 'The heading is 300% of the inherited size',
                  body:
                    'const h = getComputedStyle(document.querySelector("h1")); const b = getComputedStyle(document.body); return Math.round(parseFloat(h.fontSize) / parseFloat(b.fontSize) * 100) === 300',
                },
                {
                  id: 'ex-l25-t3',
                  label: 'The paragraph font family is Courier',
                  body: 'return /courier/i.test(getComputedStyle(document.querySelector("p")).fontFamily)',
                },
                {
                  id: 'ex-l25-t4',
                  label: 'The paragraph is red and the heading is blue',
                  body:
                    'return getComputedStyle(document.querySelector("h1")).color === "rgb(0, 0, 255)" && getComputedStyle(document.querySelector("p")).color === "rgb(255, 0, 0)"',
                },
              ],
              hints: [
                'Each rule needs three declarations: color, font-family and font-size.',
                'The percentage is of the size the element would otherwise have inherited, which is why the heading lands at 300%.',
              ],
              solution: {
                html: '<h1>This is a heading</h1>\n<p>This is a paragraph.</p>\n',
                css:
                  'h1 {\n  color: blue;\n  font-family: verdana;\n  font-size: 300%;\n}\n\np {\n  color: red;\n  font-family: courier;\n  font-size: 160%;\n}\n',
              },
              testNotes:
                'The second test compares the heading against the body rather than a fixed pixel value, so it holds whatever the base size happens to be.',
            },
          },
        ],
      },
      {
        id: 'html-l26',
        title: 'CSS Border, Padding and Margin',
        description: 'The three properties that put space around a box, and which one goes where.',
        duration: 6,
        objectives: [
          'Add a border to any element with one declaration',
          'Explain the difference between padding and margin using the box model',
          'Explain why margin sits outside the border and padding inside it',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l26',
          title: 'CSS Border, Padding and Margin quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l26-q1',
              type: 'true-false',
              prompt: 'The margin property defines the space between the text and the border.',
              answer: false,
              explanation: 'That is padding. Margin is the space outside the border, between this box and the next one.',
            },
            {
              id: 'quiz-html-l26-q2',
              type: 'multiple-choice',
              prompt: 'Which property creates space between the content and the border, inside the box and over its background?',
              options: [
                'padding',
                'margin',
                'border',
                'outline',
              ],
              answer: 0,
              explanation: 'Padding is part of the element, so the background colour extends through it. Margin is outside the border and always transparent.',
            },
            {
              id: 'quiz-html-l26-q3',
              type: 'multiple-choice',
              prompt: 'Which three parts does the border shorthand set?',
              options: [
                'Colour, width and radius',
                'Margin, padding and width',
                'Width, style and colour',
                'Style, radius and colour',
              ],
              answer: 2,
              explanation: 'A border needs a thickness, a line style such as solid, and a colour — for example border: 2px solid powderblue.',
            },
            {
              id: 'quiz-html-l26-q4',
              type: 'true-false',
              prompt: 'Two stacked blocks with a 20px bottom margin and a 30px top margin end up 50px apart.',
              answer: false,
              explanation: 'Vertical margins collapse: the larger margin wins, so the gap is 30px rather than the sum of both.',
            },
            {
              id: 'quiz-html-l26-q5',
              type: 'multiple-choice',
              prompt: 'Which declaration draws a border only along the bottom edge?',
              options: [
                'border: bottom 2px solid black',
                'border-bottom: 2px solid black',
                'border-style: bottom',
                'margin-bottom: 2px solid black',
              ],
              answer: 1,
              explanation: 'Each side has its own property, and border-bottom takes the same width, style and colour values as the shorthand.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l26-b1',
            body: 'The `border` property draws a border around an element, and it works on nearly all elements. The `padding` property defines the space between the text and the border. The `margin` property defines the space outside the border. Three properties, and the difference between the last two is the single most useful thing to understand in CSS layout.',
          },
          {
            type: 'demo',
            id: 'c-l26-d1',
            title: 'Border, then padding, then margin',
            body: 'The three versions of the same paragraph. The first has a border and nothing else. The second adds padding inside the border. The third adds margin outside it.',
            html: `<p class="border">A border with no padding. The text sits flush against the line.</p>
<p class="border padded">Padding pushes the text away from the border, inside it.</p>
<p class="border padded margined">Margin pushes the whole box away from its neighbours, outside the border.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
p { margin: 0 0 0.5rem; }
.border { border: 2px solid powderblue; }
.padded { padding: 30px; }
.margined { margin: 30px; }`,
            height: 330,
          },
          {
            type: 'heading',
            id: 'c-l26-h1',
            level: 3,
            body: 'The three spaces, from the inside out',
          },
          {
            type: 'list',
            id: 'c-l26-l1',
            style: 'ordered',
            items: [
              '**Content.** The text, or the child elements, or an image.',
              '**Padding.** Space between the content and the border. It takes the background colour, so it is part of the box.',
              '**Border.** The visible edge of the box.',
              '**Margin.** Space between this box and the next one. It is always transparent and never takes a background.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l26-h2',
            level: 3,
            body: 'The test that settles it',
          },
          {
            type: 'text',
            id: 'c-l26-b2',
            body: 'Change the background colour of the element. Whatever moves is inside the box, so it is padding or border. Whatever does not move is outside, so it is margin. Padding is part of the element; margin is the gap you left around it.',
          },
          {
            type: 'tip',
            id: 'c-l26-t1',
            title: 'Vertical margins collapse',
            body: 'Two adjacent blocks with margins do not add up. The larger one wins, which is why a heading with a bottom margin sits neatly above a paragraph with a top margin instead of doubling the gap. This surprises people once and then becomes a tool.',
          },
          {
            type: 'warning',
            id: 'c-l26-w1',
            title: 'The border shorthand order matters',
            body: '`border: 2px solid powderblue` is width, style, then colour. Write them in a different order and the declaration is invalid and dropped, and you get no border at all with no error message.',
          },
          {
            type: 'exercise',
            id: 'c-l26-x1',
            exercise: {
              id: 'ex-l26',
              instructions:
                'Give the paragraph a 2px solid powderblue border, 30px of padding and 30px of margin.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<p>Use of the border and padding properties.</p>\n',
                css: 'p {\n  font-family: system-ui, sans-serif;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l26-t1',
                  label: 'The border is 2px wide and solid',
                  body:
                    'const s = getComputedStyle(document.querySelector("p")); return s.borderTopWidth === "2px" && s.borderTopStyle === "solid"',
                },
                {
                  id: 'ex-l26-t2',
                  label: 'The padding is 30px on every side',
                  body:
                    'const s = getComputedStyle(document.querySelector("p")); return s.paddingTop === "30px" && s.paddingBottom === "30px"',
                },
                {
                  id: 'ex-l26-t3',
                  label: 'The margin is 30px on every side',
                  body:
                    'const s = getComputedStyle(document.querySelector("p")); return s.marginTop === "30px" && s.marginBottom === "30px"',
                },
                {
                  id: 'ex-l26-t4',
                  label: 'Padding is smaller than the border plus margin, confirming it is inside',
                  body:
                    'const s = getComputedStyle(document.querySelector("p")); return s.paddingTop !== s.marginTop || s.borderTopWidth !== "0px"',
                },
              ],
              hints: [
                'The border shorthand takes width, style and colour in that order.',
                'Padding and margin are four-value shorthands, so one value sets all four sides.',
              ],
              solution: {
                html: '<p>Use of the border and padding properties.</p>\n',
                css: 'p {\n  font-family: system-ui, sans-serif;\n  border: 2px solid powderblue;\n  padding: 30px;\n  margin: 30px;\n}\n',
              },
              testNotes:
                'The computed values are what the browser resolved, so a shorthand that expands correctly passes regardless of how it was written.',
            },
          },
        ],
      },
      {
        id: 'html-l27',
        title: 'Linking to External CSS',
        description: 'The three ways to write the href, and how the browser resolves each one.',
        duration: 5,
        objectives: [
          'Write a link to an external stylesheet with a full URL or a relative path',
          'Predict which file the browser loads for a given href',
          'Explain what a leading slash changes about the path',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l27',
          title: 'Linking to External CSS quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l27-q1',
              type: 'multiple-choice',
              prompt: 'What is the difference between /css/styles.css and css/styles.css?',
              options: [
                'They are identical',
                'The first is root-relative and resolves from the site root; the second is document-relative and resolves from the current folder',
                'The first is cached and the second is not',
                'The first is for CSS and the second is for JavaScript',
              ],
              answer: 1,
              explanation: 'The leading slash anchors the path at the origin root. Without it the path is relative to the folder of the current file, which changes as pages move.',
            },
            {
              id: 'quiz-html-l27-q2',
              type: 'multiple-choice',
              prompt: 'A page at /html/intro.html links href="css/styles.css". Which file does the browser request?',
              options: [
                '/css/styles.css',
                '/html/css/styles.css',
                '/html/intro.html/css/styles.css',
                '/css/html/styles.css',
              ],
              answer: 1,
              explanation: 'A document-relative path is resolved against the folder of the current file, so /html/intro.html looks inside /html/.',
            },
            {
              id: 'quiz-html-l27-q3',
              type: 'multiple-choice',
              prompt: 'A page at /admin/settings/page.html links href="/css/styles.css". Which file does the browser request?',
              options: [
                '/admin/settings/css/styles.css',
                '/admin/css/styles.css',
                '/css/styles.css',
                '/admin/settings/page.html/css/styles.css',
              ],
              answer: 2,
              explanation: 'The leading slash anchors the path at the origin root, so the page’s own depth does not affect the result.',
            },
            {
              id: 'quiz-html-l27-q4',
              type: 'true-false',
              prompt: 'A full URL such as https://example.com/css/styles.css is resolved relative to the folder of the page that links it.',
              answer: false,
              explanation: 'A full URL is already absolute. It resolves to the same file from any page, and it depends on that other origin being reachable.',
            },
            {
              id: 'quiz-html-l27-q5',
              type: 'multiple-choice',
              prompt: 'Why do site templates usually write stylesheet paths as root-relative?',
              options: [
                'Root-relative paths load faster',
                'They allow cross-origin stylesheets',
                'They are the only form the link element accepts',
                'They keep working when a page moves to a different folder depth',
              ],
              answer: 3,
              explanation: 'A path starting at the site root does not change when the page linking it moves, whereas a document-relative path resolves differently at each depth.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l27-b1',
            body: 'External stylesheets can be referenced with a full URL or with a path relative to the current page. Both are the same `link` element — only the `href` changes. Knowing which file each form resolves to is the difference between a working site and a 404 on every page except the homepage.',
          },
          {
            type: 'demo',
            id: 'c-l27-d1',
            title: 'The same link, three ways',
            body: 'Each of these three link elements points at a different file. Only the first is on another origin; the other two are on this site, and they differ in where they are anchored.',
            html: `<h1>Styling</h1>
<p>Below are the three forms of a stylesheet link, and what each one resolves to.</p>
<ul>
  <li><code>https://example.com/css/styles.css</code> &mdash; a full URL on another origin</li>
  <li><code>/html/styles.css</code> &mdash; anchored at the root of this site</li>
  <li><code>styles.css</code> &mdash; relative to this page's folder</li>
</ul>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
h1 { color: navy; }
code { background: #eef2f7; padding: 0.1rem 0.3rem; border-radius: 4px; font-size: 13px; }`,
            height: 210,
          },
          {
            type: 'heading',
            id: 'c-l27-h1',
            level: 3,
            body: 'The three forms',
          },
          {
            type: 'list',
            id: 'c-l27-l1',
            style: 'bullet',
            items: [
              '**A full URL** — `href="https://www.example.com/css/styles.css"`. Absolute, so it works from any depth, but it depends on another origin being up and permits cross-origin rules to be restricted.',
              '**Root-relative** — `href="/css/styles.css"`. Starts at the root of the current origin, so `/html/page.html` and `/admin/page.html` both resolve to the same file.',
              '**Document-relative** — `href="styles.css"`. Resolved against the folder of the current file, so a page at `/html/intro.html` looks in `/html/`.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l27-t1',
            title: 'Root-relative is the right default for a site',
            body: 'Document-relative paths break the moment you move a file into a subfolder, because the resolution changes with it. A leading slash keeps the reference stable, which is why most site templates use it everywhere.',
          },
          {
            type: 'warning',
            id: 'c-l27-w1',
            title: 'A leading slash is not the same as a relative path',
            body: '`/styles.css` and `styles.css` look similar and mean completely different things. The first is from the site root; the second is from wherever this page happens to live. Confusing them is the most common cause of a stylesheet that works on one page and 404s on every other.',
          },
          {
            type: 'exercise',
            id: 'c-l27-x1',
            exercise: {
              id: 'ex-l27',
              instructions:
                'Link the stylesheet with a root-relative path so it resolves the same way from any page depth. The file lives at /css/styles.css on this site.',
              languages: ['html'],
              starterCode: {
                html: '<!DOCTYPE html>\n<html>\n<head>\n  <title>Styling</title>\n  \n</head>\n<body>\n  <h1>Styling</h1>\n</body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l27-t1',
                  label: 'There is a stylesheet link in the head',
                  body: 'return !!document.querySelector("head link[rel=\'stylesheet\']")',
                },
                {
                  id: 'ex-l27-t2',
                  label: 'The path starts with a slash, so it is root-relative',
                  body: 'return document.querySelector("head link").getAttribute("href").startsWith("/")',
                },
                {
                  id: 'ex-l27-t3',
                  label: 'The path points at a .css file',
                  body: 'return /\\.css$/.test(document.querySelector("head link").getAttribute("href"))',
                },
                {
                  id: 'ex-l27-t4',
                  label: 'The heading is styled from the linked sheet',
                  body: 'return getComputedStyle(document.querySelector("h1")).color === "rgb(0, 0, 128)"',
                },
              ],
              hints: [
                'A root-relative path starts with a slash: `/css/styles.css`.',
                'The rel and href attributes are both required.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html>\n<head>\n  <title>Styling</title>\n  <link rel="stylesheet" href="/css/styles.css">\n</head>\n<body>\n  <h1>Styling</h1>\n</body>\n</html>\n',
              },
              testNotes:
                'The harness serves /css/styles.css with the navy heading rule, so the colour only appears if the root-relative path resolved correctly.',
            },
          },
        ],
      },
    ],
  },
]
