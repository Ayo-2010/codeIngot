import type { Section } from '~/types/content'

export const htmlCharacterSections: Section[] = [
  {
    id: 'html-s41',
    title: 'HTML Entities',
    description: 'Reserving characters, named and numeric references, and why the parser needs them.',
    lessons: [
      {
        id: 'html-l52',
        title: 'HTML Entities',
        description: 'The four reserved characters, how to write them, and when an entity is required.',
        duration: 5,
        objectives: [
          'Write the four reserved characters as named or numeric references',
          'Explain why a bare ampersand breaks the markup',
          'Choose between a named and a numeric reference',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l52',
          title: 'HTML Entities quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l52-q1',
              type: 'multiple-choice',
              prompt: 'How many characters are reserved in HTML syntax?',
              options: [
                'Two',
                'Three',
                'Four',
                'Six',
              ],
              answer: 2,
              explanation: 'The ampersand, the less-than sign, the greater-than sign and the quotation mark.',
            },
            {
              id: 'quiz-html-l52-q2',
              type: 'blank',
              prompt: 'What is the entity for the less-than sign?',
              answers: [
                '&lt;',
                'lt',
                '&lt;',
              ],
              explanation: '&lt; is the named reference. &#60; and &#x3C; are the numeric forms.',
            },
            {
              id: 'quiz-html-l52-q3',
              type: 'true-false',
              prompt: 'A bare ampersand in a paragraph is harmless.',
              answer: false,
              explanation: 'It usually recovers silently, but if what follows looks like an entity name it is consumed. AT&T is fine; &copy; in a name is not.',
            },
            {
              id: 'quiz-html-l52-q4',
              type: 'multiple-choice',
              prompt: 'When should you use a numeric rather than a named reference?',
              options: [
                'For speed',
                'For characters that have no name',
                'Never',
                'In attributes only',
              ],
              answer: 1,
              explanation: 'Named references are more readable. Numeric covers everything else, including most emoji.',
            },
            {
              id: 'quiz-html-l52-q5',
              type: 'multiple-choice',
              prompt: 'What happens if you write &lt;div&gt; in a paragraph without escaping?',
              options: [
                'It displays as the text <div>',
                'The parser creates a real div element',
                'It is a syntax error',
                'The div is commented out',
              ],
              answer: 1,
              explanation: 'The parser acts on the brackets. Escaping them with &lt; and &gt; makes them characters instead.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l52-b1',
            body: 'Four characters are reserved in HTML because the syntax uses them: the ampersand, the less-than sign, the greater-than sign and the quotation mark. An entity is an alternative way of writing one of them. It starts with an ampersand and either ends with a semicolon after a name, or a number. A page can be perfectly valid without entities for most of its content — they matter where the syntax itself would otherwise be ambiguous.',
          },
          {
            type: 'demo',
            id: 'c-l52-d1',
            title: 'The same sentence, three ways',
            body: 'The first version is broken markup, because the bare ampersand starts an entity that never ends. The second uses named references. The third uses numeric ones and produces identical output.',
            html: `<p><strong>Broken:</strong> Smith &amp Wesson is written with a bare ampersand above and swallows the rest of the sentence.</p>

<p><strong>Named:</strong> 5 &lt; 10 &amp;&amp; 10 &gt; 5. Written as &amp;amp; inside a paragraph.</p>

<p><strong>Numeric:</strong> 5 &#60; 10 &#38;&#38; 10 &#62; 5. Produces exactly the same text.</p>

<p><strong>Copy of a tag:</strong> &lt;div class="card"&gt; is a div, not an element.</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.6; }
p { margin: 0 0 0.5rem; }`,
            height: 230,
          },
          {
            type: 'code',
            id: 'c-l52-c1',
            language: 'html',
            title: 'The reserved characters and how to write them',
            code: `<!-- the four reserved characters -->
&amp;   &lt;   &gt;   &quot;

<!-- named reference: the one to reach for -->
&lt;p&gt;Fish &amp; Chips&lt;/p&gt;      →  Fish & Chips
&lt;p&gt;5 &lt; 10&lt;/p&gt;             →  5 < 10
&lt;p&gt;She said &quot;hello&quot;&lt;/p&gt; →  She said "hello"

<!-- numeric reference: decimal -->
&#38;    &#60;    &#62;    &#34;

<!-- numeric reference: hexadecimal -->
&#x26;   &#x3C;   &#x3E;   &#x22;

<!-- named reference for an apostrophe, when attributes use single quotes -->
&lt;p&gt;it&apos;s fine&lt;/p&gt;      →  it's fine
&lt;p title="it&apos;s fine"&gt;...&lt;/p&gt;

<!-- a full tag as text, escaped so the parser does not act on it -->
&lt;code&gt;&amp;lt;a href="/x"&amp;gt;link&amp;lt;/a&amp;gt;&lt;/code&gt;

<!-- spaces and other invisible characters -->
&amp;nbsp;    non-breaking space
&amp;copy;    ©
&amp;hellip;  …
&amp;mdash;   —

<!-- in an attribute, both quote styles work, as long as they are not mixed -->
&lt;div class="a'b"&gt;...&lt;/div&gt;
&lt;div class='a"b'&gt;...&lt;/div&gt;`,
          },
          {
            type: 'tip',
            id: 'c-l52-t1',
            title: 'The ampersand is the one that bites',
            body: 'A bare `&` followed by letters and a space is usually recovered silently, so the damage is easy to miss. A bare `&` followed by something that looks like an entity name is worse: `AT&T` is fine, but `&copy;` in a company name becomes a copyright symbol. Always write `&amp;` and stop thinking about it.',
          },
          {
            type: 'warning',
            id: 'c-l52-w1',
            title: 'Named or numeric?',
            body: 'Use the named form for anything you can name — it is readable, and the validator knows it. Use the numeric form for characters that have no name: `&#x1F600;` is a way to write an emoji that no entity will ever cover. Either way, keep the semicolon; without it the reference is not reliably recognised.',
          },
          {
            type: 'exercise',
            id: 'c-l52-x1',
            exercise: {
              id: 'ex-l52',
              instructions:
                'Write a sentence containing an ampersand and a less-than sign using entities, and show a tag as literal text without it being parsed as an element.',
              languages: ['html'],
              starterCode: {
                html: '<p>Write a sentence with an escaped ampersand and an escaped less-than sign.</p>\n\n<p>Show a tag as text.</p>\n',
              },
              tests: [
                {
                  id: 'ex-l52-t1',
                  label: 'The rendered text contains an ampersand',
                  body:
                    'return document.body.textContent.includes("&")',
                },
                {
                  id: 'ex-l52-t2',
                  label: 'The rendered text contains a less-than sign',
                  body:
                    'return document.body.textContent.includes("<")',
                },
                {
                  id: 'ex-l52-t3',
                  label: 'The source uses &amp; rather than a bare ampersand',
                  body:
                    'return document.body.innerHTML.includes("&amp;") && !/&(?!amp;|lt;|gt;|quot;|#)/.test(document.body.innerHTML)',
                },
                {
                  id: 'ex-l52-t4',
                  label: 'No element was created from the escaped tag text',
                  body:
                    'return document.querySelectorAll("div").length === 0 && document.body.textContent.includes("<")',
                },
                {
                  id: 'ex-l52-t5',
                  label: 'Every entity reference ends with a semicolon',
                  body:
                    'return !/&[a-zA-Z#][a-zA-Z0-9]*[^a-zA-Z0-9;]/.test(document.body.innerHTML.replace(/&(amp|lt|gt|quot|nbsp|apos|#[0-9]+|#x[0-9a-fA-F]+);/g, ""))',
                },
              ],
              hints: [
                '&amp; is the ampersand and &lt; is the less-than sign.',
                'To show a tag as text, escape the brackets — the tag will then be characters rather than an element.',
              ],
              solution: {
                html:
                  '<p>Write a sentence with an escaped ampersand and an escaped less-than sign.</p>\n<p>Tea &amp; biscuits, and 5 &lt; 10 any day.</p>\n\n<p>Show a tag as text.</p>\n<p>Use &lt;div class="card"&gt; for a card.</p>\n',
              },
              testNotes:
                'The fourth test is the assertion that the escaping worked. If the angle brackets were left bare, the parser would have created a real div and the text would be gone.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s42',
    title: 'HTML Symbols',
    description: 'The entity list for symbols, and the cases where a character is better drawn than typed.',
    lessons: [
      {
        id: 'html-l53',
        title: 'HTML Symbols',
        description: 'Named entities for symbols, what they cost, and when to use a character, an image or an SVG.',
        duration: 5,
        objectives: [
          'Write common symbol entities including a non-breaking space and an em dash',
          'Explain why a named entity can be worse than the character itself',
          'Choose between a symbol, an image and an inline SVG for an icon',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l53',
          title: 'HTML Symbols quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l53-q1',
              type: 'multiple-choice',
              prompt: 'What problem does a non-breaking space solve?',
              options: [
                'It makes text bold',
                'It prevents a line break between two things that must stay together',
                'It adds a paragraph break',
                'It indents the line',
              ],
              answer: 1,
              explanation: 'A number and its unit, or a name and its following word, should never be split across two lines.',
            },
            {
              id: 'quiz-html-l53-q2',
              type: 'true-false',
              prompt: 'An em dash should be written with a space on either side.',
              answer: false,
              explanation: 'An em dash is closed up: waited—and then. A spaced dash is an en dash used wrong.',
            },
            {
              id: 'quiz-html-l53-q3',
              type: 'multiple-choice',
              prompt: 'Why is an inline SVG better than a dingbat character for an icon?',
              options: [
                'It is smaller in bytes',
                'It inherits currentColor, scales cleanly, and can be hidden from assistive technology',
                'SVGs are always accessible',
                'Characters cannot be coloured',
              ],
              answer: 1,
              explanation: 'A character renders differently per platform font and may be announced as an unpronounceable name.',
            },
            {
              id: 'quiz-html-l53-q4',
              type: 'blank',
              prompt: 'What is the entity for a multiplication sign?',
              answers: [
                '&times;',
                'times',
                '×',
              ],
              explanation: '&times; is the named reference. The character itself is also fine in UTF-8.',
            },
            {
              id: 'quiz-html-l53-q5',
              type: 'multiple-choice',
              prompt: 'When is writing the character directly better than an entity?',
              options: [
                'Never, entities are always required',
                'In a UTF-8 page, for any character that is not one of the four reserved ones',
                'Only inside attributes',
                'Only for characters above U+2000',
              ],
              answer: 1,
              explanation: 'With a UTF-8 charset the character is simpler and more readable. Entities are for the reserved characters and the invisible ones.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l53-b1',
            body: 'HTML includes a large table of named entities for characters that are awkward to type: punctuation, currency, arrows, mathematics, and a few thousand others. They all work. None of them is required, because a modern page declares UTF-8 and can write the characters directly. The entity list is still worth knowing, mostly for the handful of invisible characters that are genuinely useful.',
          },
          {
            type: 'demo',
            id: 'c-l53-d1',
            title: 'The symbols worth knowing',
            body: 'Left to right: a non-breaking space between the number and the unit, an em dash, an ellipsis, a multiplication sign, a copyright symbol, a checkmark and a right-pointing arrow. All of them render as themselves.',
            html: `<p>Non-breaking space: 50&nbsp;km — the number and unit stay together.</p>
<p>Em dash &mdash; with no spaces around it, as it is meant to be used.</p>
<p>Ellipsis &hellip; rather than three periods.</p>
<p>Multiplication &times; not the letter x: 4 &times; 3</p>
<p>Copyright &copy; 2026 &middot; Registered &reg;</p>
<p>Check &check; Cross &cross; Arrow &rarr; Bullet &bull;</p>
<p>Trademark &trade; and degrees &deg; at 20&deg;C</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.7; }
p { margin: 0 0 0.35rem; }`,
            height: 250,
          },
          {
            type: 'list',
            id: 'c-l53-l1',
            style: 'bullet',
            items: [
              '`&nbsp;` — a non-breaking space. The one entity that solves a real layout problem.',
              '`&mdash;` / `&ndash;` — em and en dash, with no spaces around an em dash.',
              '`&hellip;` — a real ellipsis character, not three full stops.',
              '`&times;` — the multiplication sign, distinct from the letter x.',
              '`&copy;`, `&reg;`, `&trade;` — copyright, registered, trademark.',
              '`&larr;`, `&rarr;`, `&uarr;`, `&darr;` — arrows.',
              '`&hearts;`, `&spades;`, `&clubs;`, `&diams;` — card suits.',
              '`&frac12;`, `&deg;`, `&plusmn;`, `&micro;` — common maths and units.',
            ],
          },
          {
            type: 'code',
            id: 'c-l53-c1',
            language: 'html',
            title: 'When to use what',
            code: `<!-- a non-breaking space, where a space would otherwise allow a line break -->
<p>Total: 120&nbsp;kg</p>
<p>Terms&nbsp;&amp;&nbsp;Conditions</p>
<p>50&nbsp;% of the total</p>

<!-- an em dash: closed up, no spaces -->
<p>He waited&mdash;and then he left.</p>

<!-- a character rather than an entity, which is fine in UTF-8 -->
<p>5 × 3 · © 2026 · 20 °C → ✓ ✕</p>

<!-- an SVG icon, when it has to inherit colour and scale cleanly -->
<svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M3 3h2v10H3zM11 3h2v10h-2z"/>
</svg>

<!-- an image, when it is a photograph or a raster drawing -->
<img src="/icons/logo.png" alt="The company logo" width="120" height="32">

<!-- and a font icon, which inherits colour and scales, at the cost of a font file -->
<span class="icon" aria-hidden="true">&#9733;</span>`,
          },
          {
            type: 'tip',
            id: 'c-l53-t1',
            title: 'The non-breaking space is the one to reach for',
            body: '`&nbsp;` is not decoration. It stops a line break between two things that must stay together, and the classic case is a number and its unit: "120 kg" should never break across two lines. Almost every other entity is a question of taste.',
          },
          {
            type: 'warning',
            id: 'c-l53-w1',
            title: 'Do not build an icon system out of entities',
            body: 'A dingbat character in a paragraph inherits the text font, so it renders differently depending on what fonts the user has, and it may be announced by a screen reader as an unpronounceable name. An inline SVG inherits `currentColor`, scales cleanly, and is silent when marked aria-hidden.',
          },
          {
            type: 'exercise',
            id: 'c-l53-x1',
            exercise: {
              id: 'ex-l53',
              instructions:
                'Use a non-breaking space so a number and its unit cannot break across lines, and write an em dash with no spaces around it.',
              languages: ['html'],
              starterCode: {
                html: '<p>Total: 120 kg</p>\n\n<p>He waited and then he left.</p>\n',
              },
              tests: [
                {
                  id: 'ex-l53-t1',
                  label: 'The source uses a non-breaking space entity',
                  body:
                    'return /&nbsp;|\\u00a0/.test(document.body.innerHTML)',
                },
                {
                  id: 'ex-l53-t2',
                  label: 'The rendered paragraph contains a non-breaking space character',
                  body:
                    'return document.body.textContent.includes("\\u00a0")',
                },
                {
                  id: 'ex-l53-t3',
                  label: 'The number and the unit are in the same paragraph',
                  body:
                    'return document.body.textContent.includes("\\u00a0kg") || document.body.textContent.includes("\\u00a0%")',
                },
                {
                  id: 'ex-l53-t4',
                  label: 'An em dash is present',
                  body:
                    'return document.body.textContent.includes("\\u2014")',
                },
                {
                  id: 'ex-l53-t5',
                  label: 'The em dash has no space before it',
                  body:
                    'return /\\S\\u2014/.test(document.body.textContent)',
                },
              ],
              hints: [
                '&nbsp; renders as U+00A0, which is a different character from an ordinary space.',
                'An em dash is written closed up: waited&mdash;then.',
              ],
              solution: {
                html:
                  '<p>Total: 120&nbsp;kg</p>\n\n<p>He waited&mdash;and then he left.</p>\n',
              },
              testNotes:
                'The third test is the reason the lesson exists. A normal space lets the browser break between the number and the unit, which looks like a typo in a table of measurements.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s43',
    title: 'HTML Emojis',
    description: 'Emoji in markup, the variation selector problem, and how to name one for a screen reader.',
    lessons: [
      {
        id: 'html-l54',
        title: 'HTML Emojis',
        description: 'Writing emoji in a document, the character versus emoji presentation problem, and accessible naming.',
        duration: 5,
        objectives: [
          'Insert an emoji and control whether it renders as text or as a pictograph',
          'Explain what a variation selector does',
          'Give a meaningful emoji an accessible name',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l54',
          title: 'HTML Emojis quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l54-q1',
              type: 'multiple-choice',
              prompt: 'What does the variation selector U+FE0F do?',
              options: [
                'Changes the colour of the emoji',
                'Requests emoji presentation rather than text presentation',
                'Makes the emoji smaller',
                'Combines two emoji into one',
              ],
              answer: 1,
              explanation: 'Many symbols default to a monochrome text form. U+FE0F asks for the colour pictograph instead.',
            },
            {
              id: 'quiz-html-l54-q2',
              type: 'true-false',
              prompt: 'A status shown only as a coloured emoji is reliably understandable.',
              answer: false,
              explanation: 'Screen readers announce one character and skip another, and the colours vanish in high contrast mode. State the status in words.',
            },
            {
              id: 'quiz-html-l54-q3',
              type: 'multiple-choice',
              prompt: 'How do you give an emoji an accessible name?',
              options: [
                'alt text on a span',
                'role="img" with aria-label on the element',
                'A title attribute',
                'Wrapping it in a figure',
              ],
              answer: 1,
              explanation: 'role="img" makes it a single image-like node, and aria-label gives that node a name to announce.',
            },
            {
              id: 'quiz-html-l54-q4',
              type: 'blank',
              prompt: 'Which attribute removes a decorative emoji from the accessibility tree?',
              answers: [
                'aria-hidden',
                'aria-hidden="true"',
              ],
              explanation: 'aria-hidden="true" hides the element and its contents from assistive technology.',
            },
            {
              id: 'quiz-html-l54-q5',
              type: 'multiple-choice',
              prompt: 'Why are emoji a poor choice for functional icons?',
              options: [
                'They are large files',
                'They render differently per platform, disappear in high contrast and print, and need a colour font',
                'They cannot be coloured',
                'Browsers block them',
              ],
              answer: 1,
              explanation: 'An SVG inherits currentColor, scales, and survives every rendering mode. An emoji depends on a font being installed.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l54-b1',
            body: 'An emoji is just a character, and it goes into a document the same way any other character does. There is one subtlety: many symbols default to a text presentation, and a variation selector tells the browser to render them as colour pictographs instead. The character U+2764 is a heart either way, but without the selector it may render as a small monochrome symbol, and with it, a red heart.',
          },
          {
            type: 'demo',
            id: 'c-l54-d1',
            title: 'Text presentation, emoji presentation, and naming',
            body: 'The first heart has no variation selector and renders in the text colour. The second has one and renders as a pictograph. The third is wrapped in a span with a role and a label so a screen reader announces it as what it means.',
            html: `<p>Text presentation: &#10084; renders in the current text colour.</p>
<p>Emoji presentation: &#10084;&#65039; renders as a colour pictograph.</p>
<p>Named for assistive technology:
  <span role="img" aria-label="passed">&#10084;&#65039;</span>
  <span role="img" aria-label="warning">&#9888;&#65039;</span>
</p>
<p>Decorative, so it is hidden entirely:
  <span aria-hidden="true">&#10004;&#65039;</span> saved
</p>
<p>Status text instead of a symbol, when the meaning has to be unambiguous:
  <strong>Status: passed</strong>
</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 16px; line-height: 1.7; }
p { margin: 0 0 0.4rem; }
[role="img"] { font-size: 1.1em; }`,
            height: 240,
          },
          {
            type: 'list',
            id: 'c-l54-l1',
            style: 'bullet',
            items: [
              '`&#x1F600;` — the grinning face, as a numeric reference. Works in a UTF-8 page too, written directly.',
              '`&#10084;` — the heart, U+2764. Text presentation by default.',
              '`&#10084;&#65039;` — the same heart with U+FE0F, the variation selector, forcing emoji presentation.',
              '`role="img"` with `aria-label` — gives the emoji an accessible name.',
              '`aria-hidden="true"` — removes a decorative emoji from the accessibility tree entirely.',
              '`alt=":"` on an img — a way to name a decorative image without describing it.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l54-t1',
            title: 'When the meaning matters, use words',
            body: 'A green tick and a red cross are unambiguous on a screen and completely opaque to a screen reader, which may announce one character and skip the other. A status that matters — passed, failed, pending — is better as text. Use the emoji as decoration next to it.',
          },
          {
            type: 'warning',
            id: 'c-l54-w1',
            title: 'Emoji are not icons',
            body: 'A status built out of emoji breaks in high contrast mode, in print, and for anyone whose font stack has no colour emoji — which is most Linux browsers without a colour font installed. Icons need to be SVGs if they need to be icons.',
          },
          {
            type: 'exercise',
            id: 'c-l54-x1',
            exercise: {
              id: 'ex-l54',
              instructions:
                'Add an emoji that renders as a pictograph, give a second one an accessible name with role and aria-label, and hide a decorative one from assistive technology.',
              languages: ['html'],
              starterCode: {
                html: '<p>Status: </p>\n',
              },
              tests: [
                {
                  id: 'ex-l54-t1',
                  label: 'There is at least one character above U+2000',
                  body:
                    'return Array.from(document.body.textContent).some(c => c.codePointAt(0) > 0x2000)',
                },
                {
                  id: 'ex-l54-t2',
                  label: 'A variation selector is used somewhere',
                  body:
                    'return document.body.textContent.includes("\\uFE0F") || /&#65039;/.test(document.body.innerHTML)',
                },
                {
                  id: 'ex-l54-t3',
                  label: 'One element has role="img" with a non-empty aria-label',
                  body:
                    'const e = document.querySelector("[role=\'img\']"); return !!e && (e.getAttribute("aria-label") || "").trim().length > 2',
                },
                {
                  id: 'ex-l54-t4',
                  label: 'A decorative emoji is hidden with aria-hidden',
                  body:
                    'return document.querySelectorAll("[aria-hidden=\'true\']").length >= 1',
                },
                {
                  id: 'ex-l54-t5',
                  label: 'The page states the status in words as well',
                  body:
                    'return /status/i.test(document.body.textContent)',
                },
              ],
              hints: [
                'The variation selector is U+FE0F, written as &#65039; after the character.',
                'aria-label goes on an element with role="img", and the label should be a word rather than a description of the pictograph.',
              ],
              solution: {
                html:
                  '<p>Status: <span role="img" aria-label="passed">&#10004;&#65039;</span> passed</p>\n<p>Decorative: <span aria-hidden="true">&#10084;&#65039;</span> thanks for reading</p>\n',
              },
              testNotes:
                'The last test is the habit worth forming. An emoji alone is opaque to a screen reader, so the word has to be there regardless.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s44',
    title: 'HTML Charset',
    description: 'Declaring UTF-8, what happens without it, and the encoding rules that bite.',
    lessons: [
      {
        id: 'html-l55',
        title: 'HTML Charset',
        description: 'The charset meta element, why it must come first, and what breaks when it is missing.',
        duration: 5,
        objectives: [
          'Declare UTF-8 correctly and say where the declaration goes',
          'Describe what happens when a page omits its charset',
          'Explain why a character set is not a font',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l55',
          title: 'HTML Charset quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l55-q1',
              type: 'multiple-choice',
              prompt: 'Where must the charset meta appear?',
              options: [
                'Anywhere in the head',
                'As the first element in the head, within the first 1024 bytes',
                'In the body',
                'After the closing html tag',
              ],
              answer: 1,
              explanation: 'The browser sniffs for an encoding before parsing and gives up after 1024 bytes, so a late declaration is ignored.',
            },
            {
              id: 'quiz-html-l55-q2',
              type: 'true-false',
              prompt: 'A charset declaration chooses the font used to render text.',
              answer: false,
              explanation: 'The charset maps bytes to characters. The font is chosen separately with font-family.',
            },
            {
              id: 'quiz-html-l55-q3',
              type: 'multiple-choice',
              prompt: 'What is the only sensible charset for a new web page?',
              options: [
                'ISO-8859-1',
                'windows-1252',
                'UTF-8',
                'UTF-16',
              ],
              answer: 2,
              explanation: 'UTF-8 covers every script, and it is the encoding the web has standardised on.',
            },
            {
              id: 'quiz-html-l55-q4',
              type: 'blank',
              prompt: 'What are the garbled characters from a mis-read encoding called?',
              answers: [
                'mojibake',
                'garbled text',
                'mismatched encoding',
              ],
              explanation: 'Mojibake is text decoded with the wrong encoding.',
            },
            {
              id: 'quiz-html-l55-q5',
              type: 'multiple-choice',
              prompt: 'Besides the meta element, where else can a charset be declared?',
              options: [
                'In the CSS',
                'In the HTTP Content-Type response header',
                'In a JavaScript variable',
                'In the lang attribute',
              ],
              answer: 1,
              explanation: 'The header takes precedence in practice, and it is where servers more often get it wrong.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l55-b1',
            body: 'A character set tells the browser how the bytes in the document map to characters. A charset meta element declares that mapping, and UTF-8 covers every script on earth, which is why it is the only sensible choice. The declaration has to be the first thing in the head, because the browser has to know how to read the document before it reads the document.',
          },
          {
            type: 'demo',
            id: 'c-l55-d1',
            title: 'What a missing charset looks like',
            body: 'The first line declares UTF-8 and every character renders correctly. The second block is the same text read as if it were a different encoding, which is what a page without a charset meta typically produces — the mojibake you have all seen.',
            html: `<p>UTF-8 declared: Grüße, naïve, 日本語, Ελληνικά, — em dash</p>
<p>Read as Latin-1: Gr��e, na��ve, æ��æ¥¬èªž, Î"λληνικά, â�� em dash</p>
<p>Named entities still work, because they are ASCII: &amp;amp; &amp;lt; &amp;gt; &amp;copy;</p>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 15px; line-height: 1.7; }
p { margin: 0 0 0.4rem; }`,
            height: 210,
          },
          {
            type: 'list',
            id: 'c-l55-l1',
            style: 'bullet',
            items: [
              '`<meta charset="utf-8">` — the declaration. First element in the head, within the first 1024 bytes.',
              '`<meta http-equiv="Content-Type" content="text/html; charset=utf-8">` — the older form. Still works, and still seen in a great deal of legacy markup.',
              'The HTTP `Content-Type` header with a charset — the other place it can be declared, and servers get it wrong more often than pages do.',
              'ASCII, ISO-8859-1, windows-1252 — all single-byte legacy encodings. Use them only when integrating with a system that requires it.',
              'UTF-16 — for XML interop, never for a web page.',
            ],
          },
          {
            type: 'code',
            id: 'c-l55-c1',
            language: 'html',
            title: 'The declaration and its constraints',
            code: `<!doctype html>
<html lang="en">
  <head>
    <!-- must be the first thing in the head, and within the first 1024 bytes -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Charset</title>
  </head>
  <body>
    <p>Grüße, naïve, 日本語, Ελληνικά — all fine in UTF-8.</p>
  </body>
</html>

<!-- the legacy form, still valid -->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- a page served as XML declares it in the prolog instead -->
<?xml version="1.0" encoding="UTF-8"?>`,
          },
          {
            type: 'tip',
            id: 'c-l55-t1',
            title: 'A charset is not a font',
            body: 'The charset says how the bytes map to characters. The font decides what those characters look like. A page declares a charset and a font-family separately, and choosing a Latin-only font is what makes non-Latin text look like boxes, not what makes it look like mojibake.',
          },
          {
            type: 'warning',
            id: 'c-l55-w1',
            title: 'The 1024 byte rule is not pedantry',
            body: 'The browser sniffs for a charset before it has parsed the head, and it gives up after 1024 bytes. A charset meta placed after a long inline stylesheet or a big prepended script comment is too late, and the browser falls back to a guess — which is the origin of a particular class of "it works on my machine" bug.',
          },
          {
            type: 'exercise',
            id: 'c-l55-x1',
            exercise: {
              id: 'ex-l55',
              instructions:
                'Declare UTF-8 as the very first element in the head, before anything else including a title, and include non-ASCII text to confirm it renders.',
              languages: ['html'],
              starterCode: {
                html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>Charset</title>\n  \n</head>\n<body>\n  <p>Grüße, naïve, 日本語</p>\n</body>\n</html>\n',
              },
              tests: [
                {
                  id: 'ex-l55-t1',
                  label: 'The charset meta exists',
                  body: 'return !!document.querySelector("meta[charset]")',
                },
                {
                  id: 'ex-l55-t2',
                  label: 'It declares utf-8',
                  body:
                    'return (document.querySelector("meta[charset]").getAttribute("charset") || "").toLowerCase() === "utf-8"',
                },
                {
                  id: 'ex-l55-t3',
                  label: 'It is the first element in the head',
                  body:
                    'return document.querySelector("head").firstElementChild.hasAttribute("charset")',
                },
                {
                  id: 'ex-l55-t4',
                  label: 'The body contains a non-ASCII character that survived',
                  body:
                    'return Array.from(document.body.textContent).some(c => c.codePointAt(0) > 127)',
                },
                {
                  id: 'ex-l55-t5',
                  label: 'The html element declares a language',
                  body:
                    'return !!document.documentElement.getAttribute("lang")',
                },
              ],
              hints: [
                'The charset attribute goes on the meta element itself, not on a name attribute.',
                'It has to be the first child of the head — before the title, before the viewport.',
              ],
              solution: {
                html:
                  '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="utf-8">\n  <title>Charset</title>\n</head>\n<body>\n  <p>Grüße, naïve, 日本語</p>\n</body>\n</html>\n',
              },
              testNotes:
                'The third test asserts position rather than presence, which is the distinction the lesson turns on. A charset declared after the title is already too late in some sniffers.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s45',
    title: 'HTML URL Encoding',
    description: 'Percent encoding, encodeURIComponent, and building a query string that survives.',
    lessons: [
      {
        id: 'html-l56',
        title: 'HTML URL Encoding',
        description: 'What percent encoding is, which characters need it, and the difference between encoding a value and a whole URL.',
        duration: 6,
        objectives: [
          'Encode a value for a query string and decode it again',
          'Explain why encodeURIComponent is not the same as encodeURI',
          'Say when the form urlencoded and multipart encodings apply',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l56',
          title: 'HTML URL Encoding quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l56-q1',
              type: 'multiple-choice',
              prompt: 'Which function should encode a single value going into a query string?',
              options: [
                'encodeURI',
                'encodeURIComponent',
                'escape',
                'encode',
              ],
              answer: 1,
              explanation: 'encodeURIComponent encodes everything including the separators, so a value cannot break out of its parameter.',
            },
            {
              id: 'quiz-html-l56-q2',
              type: 'multiple-choice',
              prompt: 'What does encodeURI leave unencoded that encodeURIComponent encodes?',
              options: [
                'Letters and digits',
                'Reserved separators such as / ? & = and :',
                'Spaces',
                'Nothing — they are identical',
              ],
              answer: 1,
              explanation: 'encodeURI is for a complete URL, so it must preserve the structure of the URL.',
            },
            {
              id: 'quiz-html-l56-q3',
              type: 'true-false',
              prompt: 'A query string value containing a raw ampersand can be safely concatenated.',
              answer: false,
              explanation: 'The ampersand ends the parameter and starts a new one, so the server reads the wrong value.',
            },
            {
              id: 'quiz-html-l56-q4',
              type: 'blank',
              prompt: 'What is the percent encoding of a space in a query string?',
              answers: [
                '%20',
                '+',
              ],
              explanation: 'In a path or a fragment it is %20. In a urlencoded form body it becomes +.',
            },
            {
              id: 'quiz-html-l56-q5',
              type: 'multiple-choice',
              prompt: 'Which form encoding is used when submitting a file?',
              options: [
                'application/x-www-form-urlencoded',
                'multipart/form-data',
                'text/plain',
                'application/json',
              ],
              answer: 1,
              explanation: 'enctype="multipart/form-data" is required for file inputs. The server parses it differently.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l56-b1',
            body: 'A URL may only contain a limited set of characters. Anything outside that set has to be written as a percent sign followed by two hexadecimal digits, which is one byte of its UTF-8 encoding in hex. That is percent encoding, and it is why a space in a query string shows up as `%20` and a space in a form submission shows up as `+`. The same idea is what stops a value containing `&` or `=` from breaking the string it is embedded in.',
          },
          {
            type: 'demo',
            id: 'c-l56-d1',
            title: 'Encoding a value and decoding it back',
            body: 'The input below is encoded on the left as you type and decoded on the right, which is the round trip a server performs. The encoded form is what actually goes on the wire.',
            html: `<div class="row">
  <label>
    Encoded
    <input id="raw" value="Tea & coffee = 50% off!" autocomplete="off">
  </label>
  <label>
    What the server decodes back to
    <output id="decoded"></output>
  </label>
</div>
<p class="url" id="url"></p>

<script>
  const raw = document.getElementById('raw');
  const out = document.getElementById('decoded');
  const url = document.getElementById('url');
  function update() {
    const enc = encodeURIComponent(raw.value);
    out.textContent = decodeURIComponent(enc);
    url.textContent = 'https://example.com/search?q=' + enc;
  }
  raw.addEventListener('input', update);
  update();
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.row { display: flex; gap: 1rem; flex-wrap: wrap; }
label { display: block; }
input, output {
  display: block;
  width: 260px;
  padding: 0.4rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
output { background: #f1f5f9; }
.url { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; word-break: break-all; color: #1d4ed8; }`,
            height: 240,
          },
          {
            type: 'heading',
            id: 'c-l56-h1',
            level: 3,
            body: 'Two functions, and the difference matters',
          },
          {
            type: 'list',
            id: 'c-l56-l1',
            style: 'bullet',
            items: [
              '`encodeURIComponent(value)` — encodes one value completely. Use it for anything going into a query string, a path segment, or a fragment.',
              '`encodeURI(url)` — encodes a whole URL while leaving `; , / ? : @ & = + $ #` intact. Use it only when you already have a complete URL.',
              '`decodeURIComponent` and `decodeURI` — the matching decoders, with the same distinction.',
              '**Never** build a query string by concatenating raw values. A value containing `&` ends the parameter and starts another one.',
            ],
          },
          {
            type: 'code',
            id: 'c-l56-c1',
            language: 'plaintext',
            title: 'What each function leaves alone',
            code: `encodeURIComponent("Tea & coffee = 50% off!")
  "Tea%20%26%20coffee%20%3D%2050%25%20off!"

encodeURI("https://example.com/a b?q=1&x=2")
  "https://example.com/a%20b?q=1&x=2"
  ^ the separators survive; the space does not

encodeURIComponent("https://example.com/a b")
  "https%3A%2F%2Fexample.com%2Fa%20b"
  ^ everything encoded, because a single value must not contain separators

/* in JavaScript, building a query string safely */
const params = new URLSearchParams({ q: "Tea & coffee", page: "2" });
params.toString();   // "q=Tea+%26+coffee&page=2"

/* form submissions have their own encoding, set on the form */
<form method="get" action="/search">
  <input name="q">
</form>
<!-- application/x-www-form-urlencoded: a space becomes +, not %20 -->

<form method="post" action="/upload" enctype="multipart/form-data">
  <input type="file" name="avatar">
</form>
<!-- multipart/form-data: used when sending files, and handled differently by the server */`,
          },
          {
            type: 'tip',
            id: 'c-l56-t1',
            title: 'URLSearchParams does it for you',
            body: 'If you are building a query string, do not concatenate. `new URLSearchParams({...})` handles the encoding, the ordering and the escaping, and it produces a string a server can parse without guessing.',
          },
          {
            type: 'warning',
            id: 'c-l56-w1',
            title: 'Encode a path segment separately from the separators',
            body: 'A filename containing a slash will change the path structure if you encode it with encodeURI, and will be sent as one segment if you encode it with encodeURIComponent. Values and path segments get encodeURIComponent; a whole URL gets encodeURI.',
          },
          {
            type: 'exercise',
            id: 'c-l56-x1',
            exercise: {
              id: 'ex-l56',
              instructions:
                'Build a link whose query string is built safely from a value containing an ampersand and a space, so the parameter cannot be broken by its own contents.',
              languages: ['html'],
              starterCode: {
                html: '<a id="search"></a>\n',
              },
              tests: [
                {
                  id: 'ex-l56-t1',
                  label: 'The link has an href containing a query string',
                  body:
                    'return /\\?q=/.test(document.querySelector("a").getAttribute("href"))',
                },
                {
                  id: 'ex-l56-t2',
                  label: 'The ampersand in the value is encoded',
                  body:
                    'const h = document.querySelector("a").getAttribute("href"); return h.includes("%26") && !/\\?q=Tea\\s&/.test(h)',
                },
                {
                  id: 'ex-l56-t3',
                  label: 'The space in the value is encoded',
                  body:
                    'return /%20|\\+/.test(document.querySelector("a").getAttribute("href"))',
                },
                {
                  id: 'ex-l56-t4',
                  label: 'There is exactly one query parameter',
                  body:
                    'const h = document.querySelector("a").getAttribute("href"); return h.split("?")[1].split("&").length === 1',
                },
                {
                  id: 'ex-l56-t5',
                  label: 'The ampersand in the href is written as &amp; in the source',
                  body:
                    'return document.querySelector("a").outerHTML.includes("&amp;") || !document.querySelector("a").outerHTML.includes("&")',
                },
              ],
              hints: [
                'encodeURIComponent turns a space into %20 and an ampersand into %26.',
                'The ampersand that separates parameters in the markup still has to be escaped as &amp;.',
              ],
              solution: {
                html:
                  '<a id="search" href="https://example.com/search?q=Tea%20%26%20coffee">Search for tea and coffee</a>\n',
              },
              testNotes:
                'The fourth test is the one that catches the real bug. A raw ampersand in a value splits one parameter into two, and the server silently reads the wrong search term.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s46',
    title: 'HTML versus XHTML',
    description: 'What XHTML was for, why it was not adopted, and what to write today.',
    lessons: [
      {
        id: 'html-l57',
        title: 'HTML versus XHTML',
        description: 'The differences between the two syntaxes, why XHTML lost, and which parts still matter.',
        duration: 5,
        objectives: [
          'State the two defining differences between HTML and XHTML syntax',
          'Explain why XHTML was not adopted as the successor to HTML',
          'Recognise the small number of XHTML habits still worth keeping',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l57',
          title: 'HTML versus XHTML quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l57-q1',
              type: 'multiple-choice',
              prompt: 'What is the main syntactic difference between HTML5 and XHTML?',
              options: [
                'XHTML uses lowercase tags',
                'XHTML requires every element closed and every attribute valued',
                'HTML5 allows attributes without values',
                'XHTML does not allow self-closing syntax',
              ],
              answer: 1,
              explanation: 'Self-closing void elements and boolean attributes written with a value were both mandatory in XHTML.',
            },
            {
              id: 'quiz-html-l57-q2',
              type: 'true-false',
              prompt: 'A single unescaped ampersand can stop an XHTML page rendering entirely.',
              answer: true,
              explanation: 'XML parsing is fatal on malformed input, unlike the HTML parser, which recovers and continues.',
            },
            {
              id: 'quiz-html-l57-q3',
              type: 'multiple-choice',
              prompt: 'Why did XHTML fail to replace HTML?',
              options: [
                'It was slower',
                'Most pages were never valid, and serving XHTML as text/html gave none of the strictness',
                'Browsers did not support XML',
                'It could not handle images',
              ],
              answer: 1,
              explanation: 'The web could not be made valid, and the two ways of serving it were both worse than plain HTML.',
            },
            {
              id: 'quiz-html-l57-q4',
              type: 'blank',
              prompt: 'How is a self-closing br written in XHTML?',
              answers: [
                '<br />',
                '<br/>',
                'br />',
              ],
              explanation: 'With a trailing slash. HTML5 accepts the same syntax as a style choice.',
            },
            {
              id: 'quiz-html-l57-q5',
              type: 'multiple-choice',
              prompt: 'Which of these is still worth copying from XHTML into HTML5?',
              options: [
                'Serving pages as application/xhtml+xml',
                'Quoting every attribute value and closing void elements with a slash',
                'Treating a malformed tag as a fatal error',
                'Writing all tag names in lower case with no exceptions',
              ],
              answer: 1,
              explanation: 'Both are harmless tidiness in HTML5. The rest is a constraint HTML5 explicitly does not need.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l57-b1',
            body: 'XHTML was an XML serialisation of HTML, and it differed in two ways that mattered. Every element had to be closed, and every attribute had to have a value. `<br>` became `<br />` and `<input disabled>` became `<input disabled="disabled" />`. XML also made the document case-sensitive, and anything malformed became a fatal error rather than something the parser recovered from.',
          },
          {
            type: 'demo',
            id: 'c-l57-d1',
            title: 'The same document, both syntaxes',
            body: 'The two blocks below are the same content. The XHTML version closes every element and gives every attribute a value; the HTML version relies on the parser to infer the closing tags. Both render identically in a browser.',
            html: `<!-- HTML: the void elements stay unclosed -->
<p>Tea &amp; biscuits</p>
<img src="/logo.png" alt="Logo">
<hr>
<input type="checkbox" disabled>

<!-- XHTML: everything is closed, every attribute has a value -->
<p>Tea &amp; biscuits</p>
<img src="/logo.png" alt="Logo" />
<hr />
<input type="checkbox" disabled="disabled" />`,
            css: `body { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 13px; line-height: 1.7; }
pre { background: #f8fafc; padding: 0.75rem; border-radius: 6px; overflow-x: auto; }`,
            height: 250,
          },
          {
            type: 'list',
            id: 'c-l57-l1',
            style: 'bullet',
            items: [
              '**Self-closing required.** `<br />` in XHTML, `<br>` in HTML. Both are accepted in HTML5 too.',
              '**Attribute values required.** `disabled="disabled"` in XHTML, `disabled` in HTML5.',
              '**Case sensitivity.** `Class` works in HTML and is a different attribute in XHTML.',
              '**Malformed markup is fatal.** In HTML the parser recovers and carries on; in XML a single unclosed tag stops everything.',
              '**Namespaces.** XHTML puts the document in the XHTML namespace, which is why inline SVG needed care.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l57-h1',
            level: 3,
            body: 'Why XHTML lost',
          },
          {
            type: 'text',
            id: 'c-l57-b2',
            body: 'XHTML 1.0 was a proposal to make HTML strict, and it failed on the practical grounds that the web was full of documents that were not valid and never would be. Serving an XHTML page as `text/html` — which is what almost everyone did — meant the browser parsed it with the HTML parser anyway, so the strictness bought nothing. Serving it as `application/xhtml+xml` broke the pages that were not valid, and broke `<noscript>`, and broke the `&` entity rule. HTML5 took the useful part: XML syntax is accepted, and the parser is still forgiving.',
          },
          {
            type: 'tip',
            id: 'c-l57-t1',
            title: 'What is still worth keeping',
            body: 'Quoting every attribute value, and closing void elements with a slash, are both harmless in HTML5 and both make markup tidier to read. Use them as style, not as a claim that you are writing XHTML. A real XML document — a feed, a sitemap, an SVG file — is a different matter, and there the rules are not optional.',
          },
          {
            type: 'warning',
            id: 'c-l57-w1',
            title: 'Do not serve HTML as XHTML',
            body: 'If a page is served as `application/xhtml+xml` and has one unescaped ampersand, the page does not render at all — there is a parse error, not a warning. Every entity must be escaped, every attribute quoted, every element closed. It is a real constraint, and it is not one HTML pages need.',
          },
          {
            type: 'exercise',
            id: 'c-l57-x1',
            exercise: {
              id: 'ex-l57',
              instructions:
                'Write the same document both ways: once as HTML, and once with every element closed and every attribute given a value, which is the XHTML habit.',
              languages: ['html'],
              starterCode: {
                html: '<!-- HTML form -->\n\n<!-- XHTML form -->\n',
              },
              tests: [
                {
                  id: 'ex-l57-t1',
                  label: 'Both forms are present as separate code blocks',
                  body:
                    'return document.querySelectorAll("pre").length >= 2',
                },
                {
                  id: 'ex-l57-t2',
                  label: 'The HTML version closes a void element without a slash',
                  body:
                    'return /<(br|hr|img|input)\\b[^>]*>/.test(document.body.textContent) && !/<(br|hr|img|input)\\b[^>]*\\/>/.test(document.querySelector("pre").textContent)',
                },
                {
                  id: 'ex-l57-t3',
                  label: 'The XHTML version self-closes its void elements',
                  body:
                    'return /<(br|hr|img|input)\\b[^>]*\\/>/.test(document.querySelectorAll("pre")[1].textContent)',
                },
                {
                  id: 'ex-l57-t4',
                  label: 'The XHTML version gives a value to the disabled attribute',
                  body:
                    'return /disabled\\s*=\\s*"disabled"/.test(document.querySelectorAll("pre")[1].textContent)',
                },
                {
                  id: 'ex-l57-t5',
                  label: 'The XHTML version escapes its ampersand',
                  body:
                    'return /&amp;/.test(document.querySelectorAll("pre")[1].textContent) && !/&(?!amp;|lt;|gt;|quot;|#)/.test(document.querySelectorAll("pre")[1].textContent)',
                },
              ],
              hints: [
                'A void element is br, hr, img, input, meta or link — it has no content, so there is nothing to close.',
                'The XHTML form writes disabled="disabled" where HTML5 writes just disabled.',
              ],
              solution: {
                html:
                  '<!-- HTML form -->\n<pre>&lt;input type="checkbox" disabled&gt;\n&lt;br&gt;</pre>\n\n<!-- XHTML form -->\n<pre>&lt;input type="checkbox" disabled="disabled" /&gt;\n&lt;br /&gt;</pre>\n',
              },
              testNotes:
                'The comparison runs against textContent, because the tags inside a pre are escaped characters rather than real elements. The two blocks have to be written as escaped text to survive being displayed.',
            },
          },
        ],
      },
    ],
  },
]
