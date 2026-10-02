import type { Section } from '~/types/content'

export const htmlStructureSections: Section[] = [
  {
    id: 'html-s29',
    title: 'HTML Block and Inline',
    description: 'Which elements are block level, which are inline, and why the distinction decides layout.',
    lessons: [
      {
        id: 'html-l40',
        title: 'HTML Block and Inline',
        description: 'Block and inline elements, why width and height behave differently on each, and the elements that changed category.',
        duration: 6,
        objectives: [
          'Name the default display of an element and list the common block elements',
          'Explain why a width on an inline element is ignored',
          'Say what happened to div and span in HTML5',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l40-b1',
            body: 'Every element has a default display, and for most elements that is either block or inline. A block element takes up the full width of its container, starts on a new line, and the next element starts on a new line after it. An inline element sits inside the flow of text, only takes the space it needs, and does not force a line break. Headings, paragraphs, lists, sections and tables are block. Links, spans, images and emphasis are inline.',
          },
          {
            type: 'demo',
            id: 'c-l40-d1',
            title: 'The same content, block and inline',
            body: 'The three paragraphs are the same length. The first is a block and fills the width. The second is wrapped in spans so the text flows around them as inline content. The third sets a width on an inline element to show that it is ignored.',
            html: `<p>Block level: this paragraph takes the full width of its container, and the next one starts on a new line beneath it.</p>

<p><span>Inline level: </span><span>this paragraph is made of </span><span>several inline elements </span><span>that flow together as one continuous run of text.</span></p>

<p><span class="ignored">This span is given width: 200px, which does nothing</span>, because width and height do not apply to non-replaced inline elements.</p>

<p><span class="made-block">This span is the same element, made block with CSS</span>, so the width applies and it starts on its own line.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.6; }
.ignored { width: 200px; background: #fee2e2; }
.made-block { display: block; width: 200px; background: #dcfce7; }`,
            height: 330,
          },
          {
            type: 'heading',
            id: 'c-l40-h1',
            level: 3,
            body: 'Why inline elements ignore width',
          },
          {
            type: 'text',
            id: 'c-l40-b2',
            body: 'An inline box is chopped into fragments, one per line, and the fragments together fill the line box. There is no single box for `width` to apply to, so it is ignored — the same reason `height` and vertical margins do nothing on an inline span. The one exception is a replaced element such as an image, which behaves as a single atomic box and does accept width and height.',
          },
          {
            type: 'code',
            id: 'c-l40-c1',
            language: 'html',
            title: 'Block, inline, and the two hybrid values',
            code: `<!-- block level: one per line, full width -->
<div>A div</div>
<p>A paragraph</p>
<h1>A heading</h1>
<ul><li>A list item</li></ul>
<section>A section</section>

<!-- inline: flows within a line of text -->
<span>A span</span>
<a href="#">A link</a>
<strong>Bold</strong>
<img src="dot.png" alt="">

<!-- display: inline-block — inline outside, block inside -->
<style>
  .badge {
    display: inline-block;
    width: 120px;   /* now this works */
    padding: 0.25rem 0.5rem;
    text-align: center;
  }
</style>
<span class="badge">Now sized</span>

<!-- display: flex or grid on a div: block that lays out its children -->
<div style="display: flex; gap: 0.5rem;">
  <div>One</div>
  <div>Two</div>
</div>`,
          },
          {
            type: 'tip',
            id: 'c-l40-t1',
            title: 'Use inline-block when you need both',
            body: 'A navigation menu is the classic case: the items want to sit side by side, but each one also wants a width, padding and a background. `display: inline-block` gives both, and it is the right answer far more often than a float.',
          },
          {
            type: 'warning',
            id: 'c-l40-w1',
            title: 'div and span were redefined in HTML5',
            body: 'HTML5 gave div an implicit role of generic and span no role at all, which was the point — they no longer carry meaning. The old advice that div is a block container and span is an inline one is still true as a default, but it is now a description of the CSS default rather than a definition. Use semantic elements first and reach for div and span when nothing else fits.',
          },
          {
            type: 'exercise',
            id: 'c-l40-x1',
            exercise: {
              id: 'ex-l40',
              instructions:
                'Write one block paragraph and one paragraph made of inline spans, then make one of those spans sized by switching it to inline-block.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<!-- a block paragraph -->\n\n<!-- a paragraph built from inline spans -->\n\n<!-- one span made inline-block so it can be sized -->\n',
                css: '.tag {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l40-t1',
                  label: 'There are at least three paragraphs',
                  body: 'return document.querySelectorAll("p").length >= 3',
                },
                {
                  id: 'ex-l40-t2',
                  label: 'At least one paragraph is built from inline spans',
                  body: 'return document.querySelectorAll("p span").length >= 2',
                },
                {
                  id: 'ex-l40-t3',
                  label: 'One of the spans is set to inline-block',
                  body:
                    'return Array.from(document.querySelectorAll("span")).some(s => getComputedStyle(s).display === "inline-block")',
                },
                {
                  id: 'ex-l40-t4',
                  label: 'That inline-block span actually has a width',
                  body:
                    'const s = Array.from(document.querySelectorAll("span")).find(x => getComputedStyle(x).display === "inline-block"); return !!s && parseFloat(getComputedStyle(s).width) > 0',
                },
                {
                  id: 'ex-l40-t5',
                  label: 'The ordinary spans are still inline',
                  body:
                    'return Array.from(document.querySelectorAll("p span")).filter(s => !s.className).every(s => getComputedStyle(s).display === "inline")',
                },
              ],
              hints: [
                'An inline span ignores width. display: inline-block is what makes the width apply.',
                'A span with no display change stays inline, and the test checks that it did.',
              ],
              solution: {
                html:
                  '<!-- a block paragraph -->\n<p>A block paragraph fills the width of its container.</p>\n\n<!-- a paragraph built from inline spans -->\n<p><span>Built </span><span>from </span><span>several </span><span>inline spans.</span></p>\n\n<!-- one span made inline-block so it can be sized -->\n<p><span class="tag">A sized tag</span></p>\n',
                css: '.tag {\n  display: inline-block;\n  width: 120px;\n  background: #dcfce7;\n  text-align: center;\n}\n',
              },
              testNotes:
                'The fourth test is the point of the whole lesson. An inline element with a width set renders at its content width regardless, so the assertion only passes once display is changed.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s29',
      title: 'HTML Block and Inline quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s29-q1',
          type: 'multiple-choice',
          prompt: 'What is the default display of a p element?',
          options: ['inline', 'block', 'inline-block', 'flex'],
          answer: 1,
          explanation:
            'A paragraph is block level: full width, and it forces a break before and after.',
        },
        {
          id: 'quiz-html-s29-q2',
          type: 'multiple-choice',
          prompt: 'Why does width have no effect on a plain span?',
          options: [
            'Spans cannot be styled',
            'An inline box is split across lines, so there is no single box for width to apply to',
            'Spans are always zero-width',
            'The width property only works on block elements in the HTML spec',
          ],
          answer: 1,
          explanation:
            'Inline boxes are fragmented per line. Replaced inline elements such as images are the exception, because they form one atomic box.',
        },
        {
          id: 'quiz-html-s29-q3',
          type: 'true-false',
          prompt: 'display: inline-block lets an element sit inline and still accept a width.',
          answer: true,
          explanation: 'It is inline in its parent flow and establishes a block formatting context internally.',
        },
        {
          id: 'quiz-html-s29-q4',
          type: 'blank',
          prompt: 'Which value makes an element a block that lays out its children in a row?',
          answers: ['flex', 'display: flex', 'inline-flex'],
          explanation: 'display: flex is a block-level flex container; inline-flex is its inline equivalent.',
        },
        {
          id: 'quiz-html-s29-q5',
          type: 'multiple-choice',
          prompt: 'What did HTML5 change about div and span?',
          options: [
            'They were removed',
            'They were given generic roles, so they no longer carry meaning',
            'They became inline by default',
            'They were renamed',
          ],
          answer: 1,
          explanation:
            'They lost their semantic associations. The block and inline defaults remain, as CSS behaviour rather than definition.',
        },
      ],
    },
  },
  {
    id: 'html-s30',
    title: 'HTML Classes',
    description: 'The class attribute, naming conventions, and specificity as it applies to a class selector.',
    lessons: [
      {
        id: 'html-l41',
        title: 'HTML Classes',
        description: 'Reusing a style across many elements with the class attribute, and what a class name can contain.',
        duration: 5,
        objectives: [
          'Apply a class to an element and select it in CSS',
          'Write class names that survive a redesign',
          'Explain specificity between a class and a tag selector',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l41-b1',
            body: 'The `class` attribute is how you give an element a name that a stylesheet can target. One class can go on any number of elements, one element can carry several classes, and a class can be added or removed by a script. That is the whole idea: it lets a single rule apply to a set of elements chosen by meaning rather than by tag name.',
          },
          {
            type: 'demo',
            id: 'c-l31-d2',
            title: 'One class, many elements',
            body: 'Every highlighted paragraph shares the same class and the same rule. The second paragraph carries an extra class that adds a border without changing the first rule.',
            html: `<p class="highlight">Highlighted by class.</p>
<p class="highlight">Highlighted by class, a second time.</p>
<p class="highlight boxed">Highlighted and boxed — two classes, two rules.</p>
<p>Not highlighted at all.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
.highlight { background-color: #fef08a; padding: 0.5rem; }
.boxed { border: 1px solid #0f172a; }`,
            height: 230,
          },
          {
            type: 'code',
            id: 'c-l41-c1',
            language: 'html',
            title: 'Multiple classes, and the naming rules',
            code: `<!-- one class -->
<p class="lead">An opening paragraph.</p>

<!-- several classes, separated by spaces -->
<p class="card card--featured">One element, two independent rules.</p>

<!-- the same class on many elements -->
<span class="badge">New</span>
<span class="badge">Sale</span>
<span class="badge">Limited</span>

<!-- class names: letters, digits, hyphens, underscores, and non-ASCII
     must not start with a digit, and the name is case-sensitive
     .featured is not the same as .Featured -->

<!-- a script can toggle it -->
<button class="btn" onclick="this.classList.toggle('btn--active')">Toggle</button>`,
          },
          {
            type: 'heading',
            id: 'c-l41-h1',
            level: 3,
            body: 'Naming conventions that age well',
          },
          {
            type: 'list',
            id: 'c-l41-l1',
            style: 'bullet',
            items: [
              '**Describe purpose, not appearance.** `.card__title` survives a restyle; `.blue-box` becomes a lie the first time the colour changes.',
              '**Hyphen or underscore, and be consistent.** Both are valid; mixing them is not.',
              '**BEM is a reasonable default.** `block__element--modifier` reads as structure and makes selector specificity predictable.',
              '**Prefix when it collides.** A global `.active` will fight every other `.active` on the page; `.nav__link--active` will not.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l41-t1',
            title: 'A class beats a tag, and an id beats both',
            body: 'Specificity is compared by counting: ids first, then classes and attributes and pseudo-classes, then tags and pseudo-elements. `.lead` beats `p`, which is why a class rule can restyle a paragraph without touching the paragraph rule. It also means that ten class rules will not beat one id, no matter how many there are.',
          },
          {
            type: 'warning',
            id: 'c-l41-w1',
            title: 'Do not build an id out of a class',
            body: 'A selector list of ids, `#home #nav #main #content`, works right up until you need to restyle one of them. Then you find out how many of them you have to edit, and that one of them is inside a third-party widget.',
          },
          {
            type: 'exercise',
            id: 'c-l41-x1',
            exercise: {
              id: 'ex-l41',
              instructions:
                'Create two rules driven by classes, and apply them so that one element carries both classes and each rule applies independently.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<!-- two elements, each with a class -->\n',
                css: '/* one rule for the first class, one for the second */\n',
              },
              tests: [
                {
                  id: 'ex-l41-t1',
                  label: 'There are at least two class selectors in the stylesheet',
                  body:
                    'return Array.from(document.styleSheets).some(sheet => { try { return Array.from(sheet.cssRules).filter(r => r.selectorText && r.selectorText.includes(".")).length >= 2 } catch { return false } })',
                },
                {
                  id: 'ex-l41-t2',
                  label: 'At least two elements carry a class',
                  body: 'return document.querySelectorAll("[class]").length >= 2',
                },
                {
                  id: 'ex-l41-t3',
                  label: 'One element carries more than one class',
                  body:
                    'return Array.from(document.querySelectorAll("[class]")).some(e => e.getAttribute("class").trim().split(/\\s+/).length >= 2)',
                },
                {
                  id: 'ex-l41-t4',
                  label: 'The first class produces a visible style',
                  body:
                    'const e = document.querySelector("." + document.querySelector("[class]").getAttribute("class").trim().split(/\\s+/)[0]); const s = getComputedStyle(e); return s.backgroundColor !== "rgba(0, 0, 0, 0)" || s.color !== "rgb(0, 0, 0)" || s.paddingLeft !== "0px"',
                },
              ],
              hints: [
                'A class in the HTML is written class="name", with no dot. The dot belongs to the CSS selector.',
                'Two classes on one element are separated by a space, not a comma.',
              ],
              solution: {
                html:
                  '<!-- two elements, each with a class -->\n<p class="lead">The opening paragraph.</p>\n<p class="lead card">Carrying both classes.</p>\n',
                css:
                  '.lead {\n  font-weight: 600;\n  color: #1e3a8a;\n}\n\n.card {\n  background: #f1f5f9;\n  padding: 0.5rem;\n  border: 1px solid #cbd5e1;\n}\n',
              },
              testNotes:
                'The last test picks a class name straight out of the markup, so it passes for any pair of class names that both produce a visible effect.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s30',
      title: 'HTML Classes quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s30-q1',
          type: 'multiple-choice',
          prompt: 'How do you write a class in HTML?',
          options: ['class="card"', 'class=card', 'className="card"', '.card="card"'],
          answer: 0,
          explanation: 'The attribute is class, the value is quoted, and the dot only appears in the CSS selector.',
        },
        {
          id: 'quiz-html-s30-q2',
          type: 'true-false',
          prompt: 'An element can carry more than one class at a time.',
          answer: true,
          explanation: 'Several class names go in one attribute, separated by spaces.',
        },
        {
          id: 'quiz-html-s30-q3',
          type: 'multiple-choice',
          prompt: 'Which selector beats a tag selector?',
          options: ['p', '.lead', 'p.lead is equal to .lead', '*'],
          answer: 1,
          explanation:
            'Specificity counts ids, then classes and attributes and pseudo-classes, then tags. A class outranks a tag.',
        },
        {
          id: 'quiz-html-s30-q4',
          type: 'blank',
          prompt: 'Which two characters cannot be the first character of a class name?',
          answers: ['a digit', 'digits', '0-9', 'a number'],
          explanation:
            'A class name cannot start with a digit, and a hyphen cannot be followed by a digit either.',
        },
        {
          id: 'quiz-html-s30-q5',
          type: 'multiple-choice',
          prompt: 'Which class name is most likely to survive a restyle?',
          options: ['.blue-box', '.b1', '.card__title', '.left-column'],
          answer: 2,
          explanation:
            'A name describing purpose and structure stays correct when the colour or the layout changes.',
        },
      ],
    },
  },
  {
    id: 'html-s31',
    title: 'HTML Id',
    description: 'The id attribute, its three jobs, and why it is unique and how it is used by CSS and by scripts.',
    lessons: [
      {
        id: 'html-l42',
        title: 'HTML Id',
        description: 'A unique identifier, a link target, and a label target, and the rules that come with each.',
        duration: 5,
        objectives: [
          'Use an id to target an element from CSS, from a link, and from a label',
          'Explain why ids must be unique on the page',
          'Describe how an id beats any number of classes in specificity',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'c-l42-b1',
            body: 'The `id` attribute gives one element in the document a name that is unique. That name does three jobs. It is a link target, so `#name` scrolls to the element. It is a label target, so a `<label for="name">` is associated with the form control it names. And it is a CSS selector with the highest specificity there is.',
          },
          {
            type: 'demo',
            id: 'c-l42-d1',
            title: 'One id doing all three jobs',
            body: 'The input has an id. The label points at it with for, clicking the label focuses the field, and a link on the right jumps to the whole field group by fragment.',
            html: `<a href="#email-field">Jump to the email field</a>

<div class="field">
  <label for="email-field">Email address</label>
  <input id="email-field" name="email" type="email" placeholder="you@example.com">
</div>

<div class="field">
  <label for="name-field">Full name</label>
  <input id="name-field" name="name" type="text">
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }
a { color: #1d4ed8; }
.field { margin: 0.75rem 0; scroll-margin-top: 1rem; }
label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
input { padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px; }
#email-field { border-color: #1d4ed8; }`,
            height: 260,
          },
          {
            type: 'code',
            id: 'c-l42-c1',
            language: 'html',
            title: 'The three uses, and the rules',
            code: `<!-- 1. a CSS target, the highest specificity available -->
<h2 id="summary">Summary</h2>

<!-- 2. a fragment target for a link -->
<a href="#summary">Jump to the summary</a>
<a href="/page.html#summary">Jump to it from another page</a>

<!-- 3. a label target: the association is made by matching for to id -->
<label for="search">Search</label>
<input id="search" name="q" type="search">

<!-- a script can also find it, though a data attribute is usually better -->
<script>
  const el = document.getElementById("summary");
</script>

<!-- rules: unique on the document, never empty, and case-sensitive -->
<!-- id may contain any character except whitespace -->
<!-- id must not be the empty string, and must not be purely numeric -->

<!-- ARIA references ids too -->
<div role="tooltip" id="tip-1">Extra detail</div>
<button aria-describedby="tip-1">More</button>`,
          },
          {
            type: 'heading',
            id: 'c-l42-h1',
            level: 3,
            body: 'Why uniqueness is not optional',
          },
          {
            type: 'text',
            id: 'c-l42-b2',
            body: 'An id has to identify exactly one element, because everything that uses it assumes there is one: `getElementById` returns a single element, a `<label for>` points at one control, and a fragment URL has one destination. Duplicate ids make all three ambiguous. A validator will catch duplicates in a single document, but ids injected by a script at runtime are the usual source, and they are invisible until the page misbehaves.',
          },
          {
            type: 'tip',
            id: 'c-l42-t1',
            title: 'An id is not a script handle',
            body: 'Reaching into the document by id from a script couples the script to the markup in a way nothing checks. A `data-` attribute with a value is the same convenience and does not claim to be an identifier. Use ids for what they are for: fragment targets, label associations, and the rare selector that genuinely must win.',
          },
          {
            type: 'warning',
            id: 'c-l42-w1',
            title: 'An id you cannot easily override',
            body: 'Ten class rules will not beat one id. That is exactly what you want when the id is marking a specific thing, and exactly what you do not want when a component needs to be restyled by its container. A component that ships `#submit { width: 100% }` cannot be sized by any page using it.',
          },
          {
            type: 'exercise',
            id: 'c-l42-x1',
            exercise: {
              id: 'ex-l42',
              instructions:
                'Give the input an id, associate a label with it using for, add a link that jumps to it, and style it with the id selector.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<a></a>\n\n<div>\n  <label></label>\n  <input type="text">\n</div>\n',
                css: '#email {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l42-t1',
                  label: 'The input has an id',
                  body:
                    'const i = document.querySelector("input"); return !!i && !!i.getAttribute("id") && i.getAttribute("id").trim().length > 0',
                },
                {
                  id: 'ex-l42-t2',
                  label: 'There is a label whose for matches the input id',
                  body:
                    'const i = document.querySelector("input"); return !!document.querySelector("label[for=\'" + i.getAttribute("id") + "\']")',
                },
                {
                  id: 'ex-l42-t3',
                  label: 'There is a link whose fragment targets the input id',
                  body:
                    'const i = document.querySelector("input"); return !!document.querySelector("a[href=\'#" + i.getAttribute("id") + "\']")',
                },
                {
                  id: 'ex-l42-t4',
                  label: 'There is an id selector in the stylesheet',
                  body:
                    'return Array.from(document.styleSheets).some(sheet => { try { return Array.from(sheet.cssRules).some(r => r.selectorText && r.selectorText.startsWith("#")) } catch { return false } })',
                },
                {
                  id: 'ex-l42-t5',
                  label: 'The id is unique on the page',
                  body:
                    'const ids = Array.from(document.querySelectorAll("[id]")).map(e => e.id); return new Set(ids).size === ids.length',
                },
              ],
              hints: [
                'The label and the link both refer to the input through the same id string.',
                'The CSS selector writes the id with a hash in front: #email.',
              ],
              solution: {
                html:
                  '<a href="#email">Jump to the email field</a>\n\n<div>\n  <label for="email">Email address</label>\n  <input id="email" name="email" type="text">\n</div>\n',
                css: '#email {\n  padding: 0.4rem;\n  border: 2px solid #1d4ed8;\n  border-radius: 4px;\n}\n',
              },
              testNotes:
                'The second and third tests build their selectors from the input id, so the assertion holds for any id you choose rather than a fixed one.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s31',
      title: 'HTML Id quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s31-q1',
          type: 'multiple-choice',
          prompt: 'What does the for attribute on a label do?',
          options: [
            'Sets the label text',
            'Associates the label with the control whose id matches',
            'Makes the field required',
            'Forces the label to wrap the field',
          ],
          answer: 1,
          explanation: 'Matching for against a control id is what makes the label name it.',
        },
        {
          id: 'quiz-html-s31-q2',
          type: 'true-false',
          prompt: 'Two elements on a page may share an id if they look identical.',
          answer: false,
          explanation:
            'Ids must be unique. Everything that uses one assumes there is a single target.',
        },
        {
          id: 'quiz-html-s31-q3',
          type: 'multiple-choice',
          prompt: 'Which selector wins against twelve class rules?',
          options: ['#main', 'body', '*', '.layout'],
          answer: 0,
          explanation: 'An id outranks any number of class, attribute and pseudo-class selectors.',
        },
        {
          id: 'quiz-html-s31-q4',
          type: 'blank',
          prompt: 'Which attribute links a label to its input?',
          answers: ['for', 'htmlFor', 'for='],
          explanation: 'The label carries for, and its value matches the control id.',
        },
        {
          id: 'quiz-html-s31-q5',
          type: 'multiple-choice',
          prompt: 'Which is a good reason to use an id?',
          options: [
            'As a script handle for grabbing an element',
            'As a fragment target and a label association',
            'As the only way to style an element',
            'To give the element a higher z-index',
          ],
          answer: 1,
          explanation:
            'Fragment targets and label associations are what ids are for. Script handles are better as data attributes.',
        },
      ],
    },
  },
  {
    id: 'html-s32',
    title: 'HTML Iframes',
    description: 'Embedding another document, and the sandbox and referrerpolicy attributes that make it safe.',
    lessons: [
      {
        id: 'html-l43',
        title: 'HTML Iframes',
        description: 'The iframe element, the attributes that matter, and the sandbox token list.',
        duration: 6,
        objectives: [
          'Embed another document with an iframe and a title',
          'Apply sandbox with the narrowest set of tokens that works',
          'Explain the risk of framing a page you do not control',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'c-l43-b1',
            body: 'An `<iframe>` embeds another document inside this one. It is a browsing context: a whole separate document, with its own URL, its own scripts, its own history. That is the part people forget. An iframe is not a hole in the page, it is a page inside the page, and everything you can do to a tab you can do to it.',
          },
          {
            type: 'demo',
            id: 'c-l43-d1',
            title: 'An embedded document with a sandbox',
            body: 'The frame below loads a page with sandbox="allow-scripts", which lets the embedded page run its own JavaScript while denying it forms, popups, top-level navigation and same-origin access to this page.',
            html: `<iframe src="https://example.com"
        title="An example page embedded in a frame"
        sandbox="allow-scripts"
        loading="lazy"
        referrerpolicy="no-referrer"
        style="width: 100%; height: 220px; border: 1px solid #cbd5e1; border-radius: 8px;"></iframe>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; }`,
            height: 320,
          },
          {
            type: 'heading',
            id: 'c-l43-h1',
            level: 3,
            body: 'The attributes that matter',
          },
          {
            type: 'list',
            id: 'c-l43-l1',
            style: 'bullet',
            items: [
              '`src` — what to load. There is also `srcdoc`, which takes a whole document as an attribute value.',
              '`title` — the accessible name. A frame with no title is announced as just "frame", which tells a screen reader user nothing.',
              '`sandbox` — a space-separated list of permissions. With no value at all, the frame is maximally restricted.',
              '`allow` — permissions policy, e.g. `allow="camera; microphone"`, for specific features.',
              '`loading="lazy"` — defer until near the viewport.',
              '`referrerpolicy` — what is sent in the Referer header.',
              '`height` and `width` — a frame with no size defaults to 300 by 150.',
            ],
          },
          {
            type: 'code',
            id: 'c-l43-c1',
            language: 'html',
            title: 'The sandbox tokens',
            code: `<!-- maximally restricted: nothing is allowed -->
<iframe src="https://example.com" title="Example" sandbox></iframe>

<!-- scripts only: useful for a preview of untrusted HTML -->
<iframe srcdoc="<p>hello</p>" sandbox="allow-scripts" title="Preview"></iframe>

<!-- a full-page embed: same-origin access, forms, popups, top navigation -->
<iframe src="https://example.com"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
        title="Embedded app"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="fullscreen; clipboard-write"></iframe>

<!-- an inline document, no file needed -->
<iframe srcdoc="
  <style>body { font-family: system-ui; padding: 1rem; }</style>
  <p>This document lives in the attribute.</p>
" title="Inline document"></iframe>`,
          },
          {
            type: 'warning',
            id: 'c-l43-w1',
            title: 'sandbox and allow-same-origin together defeats the sandbox',
            body: '`allow-scripts` lets the framed page run code, and `allow-same-origin` gives it the same origin as your page. Together they let that code remove its own sandbox attribute and reload unrestricted. If you only need scripts, grant only `allow-scripts`. This is the one combination to never write by accident.',
          },
          {
            type: 'tip',
            id: 'c-l43-t1',
            title: 'Framing someone else is their decision',
            body: 'Most large sites send `X-Frame-Options: DENY` or a `frame-ancestors` CSP directive, and the browser refuses the frame. That is the correct way to stop clickjacking, and it means an iframe is not a general-purpose way to show somebody else\'s content.',
          },
          {
            type: 'exercise',
            id: 'c-l43-x1',
            exercise: {
              id: 'ex-l43',
              instructions:
                'Embed a document in an iframe with an accessible name, a lazy loading hint, and a sandbox that grants scripts but nothing else.',
              languages: ['html'],
              starterCode: {
                html: '<iframe src="https://example.com"></iframe>\n',
              },
              tests: [
                {
                  id: 'ex-l43-t1',
                  label: 'There is an iframe with a src',
                  body:
                    'const f = document.querySelector("iframe"); return !!f && !!f.getAttribute("src")',
                },
                {
                  id: 'ex-l43-t2',
                  label: 'The iframe has a non-empty title',
                  body:
                    'const f = document.querySelector("iframe"); return !!f && (f.getAttribute("title") || "").trim().length > 3',
                },
                {
                  id: 'ex-l43-t3',
                  label: 'The iframe is sandboxed',
                  body: 'return document.querySelector("iframe").hasAttribute("sandbox")',
                },
                {
                  id: 'ex-l43-t4',
                  label: 'The sandbox grants scripts but not same-origin access',
                  body:
                    'const v = document.querySelector("iframe").getAttribute("sandbox") || ""; return v.includes("allow-scripts") && !v.includes("allow-same-origin")',
                },
                {
                  id: 'ex-l43-t5',
                  label: 'The iframe is lazy loaded',
                  body: 'return document.querySelector("iframe").getAttribute("loading") === "lazy"',
                },
              ],
              hints: [
                'sandbox is a boolean attribute, so writing sandbox="allow-scripts" both enables it and lists the one permission.',
                'Every iframe needs a title. A screen reader announces "frame" and nothing else without one.',
              ],
              solution: {
                html:
                  '<iframe src="https://example.com" title="An example page embedded in a frame" sandbox="allow-scripts" loading="lazy" referrerpolicy="no-referrer"></iframe>\n',
              },
              testNotes:
                'The fourth test is the security assertion. allow-scripts together with allow-same-origin lets a framed page remove its own sandbox, so the two are never granted together here.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-html-s32',
      title: 'HTML Iframes quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-html-s32-q1',
          type: 'multiple-choice',
          prompt: 'What does sandbox with no value do?',
          options: [
            'Allows everything',
            'Grants no permissions at all to the framed document',
            'Disables the iframe entirely',
            'Is the same as omitting the attribute',
          ],
          answer: 1,
          explanation:
            'A bare sandbox is the most restrictive form. Permissions are added one token at a time.',
        },
        {
          id: 'quiz-html-s32-q2',
          type: 'true-false',
          prompt: 'Combining allow-scripts and allow-same-origin is a security risk.',
          answer: true,
          explanation:
            'The framed page can then remove its own sandbox attribute and reload unrestricted.',
        },
        {
          id: 'quiz-html-s32-q3',
          type: 'multiple-choice',
          prompt: 'Why does an iframe need a title attribute?',
          options: [
            'To show a tooltip on hover',
            'Because it is the accessible name, and without it the frame is announced as just "frame"',
            'To set the frame height',
            'It is required for lazy loading to work',
          ],
          answer: 1,
          explanation: 'The title is how a screen reader user knows what the embedded document is.',
        },
        {
          id: 'quiz-html-s32-q4',
          type: 'blank',
          prompt: 'Which attribute carries a whole document inline instead of a file path?',
          answers: ['srcdoc', 'srcdoc='],
          explanation: 'srcdoc takes a complete document as the attribute value.',
        },
        {
          id: 'quiz-html-s32-q5',
          type: 'multiple-choice',
          prompt: 'A site refuses to be framed. What is it sending?',
          options: [
            'A sandbox attribute',
            'X-Frame-Options or a frame-ancestors CSP directive',
            'A crossorigin attribute',
            'A rel="external" link',
          ],
          answer: 1,
          explanation:
            'Those are the standard clickjacking defences, and they are the reason an iframe is not a general-purpose embed.',
        },
      ],
    },
  },
]
