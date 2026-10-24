import type { Section } from '~/types/content'

export const cssWidgetSectionsB: Section[] = [
  {
    id: 'css-s36',
    title: 'CSS Attr Selectors',
    description: 'Style elements by the attributes they carry: presence, exact value, prefix, suffix, substring or single word.',
    lessons: [
      {
        id: 'css-l73',
        title: 'Attr Selectors',
        description: 'Target elements by what is written inside the tag — the type of an input, part of a placeholder, or your own data- hooks.',
        duration: 7,
        objectives: [
          'Style elements by the mere presence of an attribute with [attr]',
          'Match exact values, and match prefixes, suffixes and substrings',
          'Match one whole word of a whitespace-separated list with [attr~="value"]',
          'Ignore letter case with the case-insensitivity flag',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l73',
          title: 'Attr Selectors quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l73-q1',
              type: 'multiple-choice',
              prompt: 'Which selector matches any link whose href ends with ".pdf"?',
              options: [
                'a[href^=".pdf"]',
                'a[href$=".pdf"]',
                'a[href*=".pdf"]',
                'a[href~=".pdf"]',
              ],
              answer: 1,
              explanation: '`$=` anchors the match at the end of the value, which is exactly what an extension test needs.',
            },
            {
              id: 'quiz-css-l73-q2',
              type: 'true-false',
              prompt: '[attr="value"] matches regardless of letter case in ordinary HTML.',
              answer: false,
              explanation: 'Most attribute values are case-sensitive in HTML. Add the `i` flag — `[attr="value" i]` — to ignore case.',
            },
            {
              id: 'quiz-css-l73-q3',
              type: 'code-output',
              prompt: 'What does this rule do?',
              code: 'input[placeholder^="email"] { border-color: #1f6feb; }',
              options: [
                'Borders every input blue',
                'Borders the input whose placeholder contains the word "email"',
                'Borders the input whose placeholder starts with "email"',
                'Nothing, placeholder cannot be styled',
              ],
              answer: 2,
              explanation: '`^=` tests the beginning of the value, so `placeholder="your email here"` would not match.',
            },
            {
              id: 'quiz-css-l73-q4',
              type: 'blank',
              prompt: 'Which operator matches one whole word inside a whitespace-separated list, such as "btn" inside class="btn btn-large"?',
              answers: [
                '~=',
                '~',
              ],
              explanation: '`[class~="btn"]` splits the value on whitespace and compares whole words, so it matches "btn" but not "btn-large".',
            },
            {
              id: 'quiz-css-l73-q5',
              type: 'multiple-choice',
              prompt: 'Why put a custom data-status attribute on a field instead of an extra class?',
              options: [
                'Data attributes load faster than classes',
                'The attribute name cannot clash with anything the browser defines',
                'Classes cannot be used on form controls',
                'It makes the field read-only',
              ],
              answer: 1,
              explanation: '`data-*` names live in a namespace reserved for authors, so they never collide with a future browser feature.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l73-b1',
            body: 'An attribute selector matches on what is written inside an HTML tag rather than on a class or id. That means you can style an input by its `type`, by its `name`, or by a `data-` attribute you invented yourself — with no extra markup.',
          },
          {
            type: 'demo', id: 'c-l73-d1',
            title: 'Four operators, four different subsets',
            body: 'Five fields, four rules. Green picks out every `type="text"` box, orange catches the input with one particular `name`, blue finds the placeholder that *starts with* a word, and red marks the field carrying a custom `data-status`.',
            html: `<form class="attr-form">
  <label>Full name <input type="text" name="fullname" placeholder="e.g. Ada Lovelace"></label>
  <label>Nickname <input type="text" name="handle" placeholder="nickname (optional)"></label>
  <label>Email <input type="email" name="contact" placeholder="email address"></label>
  <label>Password <input type="password" name="secret" placeholder="password" data-status="required"></label>
  <label>Notes <textarea name="notes" placeholder="tell us more"></textarea></label>
</form>`,
            css: `.attr-form { display: flex; flex-direction: column; gap: 0.6rem; font-size: 13px; }
.attr-form label { display: flex; flex-direction: column; gap: 0.25rem; }
.attr-form input, .attr-form textarea {
  border: 1px solid #cbd3da; border-radius: 6px; padding: 0.45rem 0.6rem; font: inherit;
}
.attr-form input[type="text"] { border-color: #29e2bd; }
.attr-form input[name="handle"] { border-color: #f59e0b; }
.attr-form input[placeholder^="email"] { border-color: #1f6feb; }
.attr-form input[data-status="required"] { border-width: 2px; border-color: #dc2626; }`,
            height: 320,
          },
          {
            type: 'text', id: 'c-l73-b2',
            body: 'The password field is matched by `data-status` — an attribute you added purely so CSS could find it. That is the normal pattern: data attributes are a styling hook that costs no extra class.',
          },
          { type: 'heading', id: 'c-l73-h1', level: 3, body: 'The full set' },
          {
            type: 'code', id: 'c-l73-c1', language: 'css',
            code: `[attr]           { }  /* attribute is present at all */
[attr="value"]   { }  /* attribute has exactly this value */
[attr^="value"]  { }  /* value starts with this */
[attr$="value"]  { }  /* value ends with this */
[attr*="value"]  { }  /* value contains this anywhere */
[attr~="value"]  { }  /* value is one of several whitespace-separated words */
[attr|="value"]  { }  /* value is this, or this- followed by more */
[attr="value" i] { }  /* same as = but case-insensitive */`,
          },
          {
            type: 'list', id: 'c-l73-l1', style: 'bullet',
            items: [
              '**`[attr]`** — presence only. `[disabled]` catches every disabled control, whatever its type.',
              '**`[attr="value"]`** — exact, and case-sensitive in HTML by default. `[type="text"]` does not match `type="TEXT"`.',
              '**`[attr^="value"]`** — prefix. Ideal for `[placeholder^="email"]`.',
              '**`[attr$="value"]`** — suffix. Useful for file types: `[href$=".pdf"]`.',
              '**`[attr*="value"]`** — substring anywhere. Easy to over-match: `href*="index"` also hits `href="/myindexpage.html"`.',
              '**`[attr~="value"]`** — one whole word among whitespace-separated words. What you want for `class="btn btn-large active"`.',
              '**`[attr|="value"]`** — the value is exactly `value`, or `value-` plus more. Built for subtags like `lang="en-GB"`.',
              '**The `i` flag** — `[type="text" i]` ignores case. Add `s` for explicit strict matching where supported.',
            ],
          },
          {
            type: 'warning', id: 'c-l73-w1',
            title: 'Attribute selectors on class names are fragile',
            body: 'You can write `[class*="btn"]` and it will work — until someone writes `class="button-submit"`, which then matches too. Style by class selectors, and use attribute selectors for things HTML already defines: `type`, `href`, `src`, `placeholder`, `disabled`, `checked`.',
          },
          {
            type: 'example', id: 'c-l73-e1',
            title: 'Styling by link type',
            body: 'The same technique applied to links: `^=` marks external ones, `^="mailto:"` marks the contact link, and `target="_blank"` gets a visible hint that the click leaves the site.',
            html: `<nav class="links">
  <a href="#local">Local page</a>
  <a href="https://example.com">External site</a>
  <a href="mailto:hi@example.com">Email us</a>
  <a href="#new" target="_blank">Opens a new tab</a>
</nav>`,
            css: `.links { display: flex; flex-wrap: wrap; gap: 0.75rem; font-size: 14px; }
.links a[href^="https"] { color: #1f6feb; border-bottom: 2px solid currentColor; }
.links a[href^="mailto:"] { color: #b45309; }
.links a[target="_blank"]::after {
  content: " (opens in a new tab)"; color: #6b7280; font-size: 12px;
}`,
            showPreview: true,
          },
          {
            type: 'tip', id: 'c-l73-t1',
            title: 'Cheap, and it keeps markup clean',
            body: 'Instead of `<input class="field field--required">` plus a marker element, write `data-status="required"` on the input and select it with `[data-status="required"]`. The rule lives in one stylesheet and the markup stays readable.',
          },
          {
            type: 'exercise', id: 'c-l73-x1',
            exercise: {
              id: 'ex-l73',
              instructions: 'Style the form with attribute selectors: a border on every text input, a *different* border colour on the email input, and a dashed border on the required field.',
              languages: ['css'],
              starterCode: {
                html: '<form class="a-form">\n  <input type="text" name="first">\n  <input type="text" name="last">\n  <input type="email" name="mail">\n  <input type="text" name="postcode" data-required>\n</form>\n',
                css: '.a-form {\n  \n}\n',
              },
              tests: [
                { id: 'ex-l73-t1', label: 'Text inputs have a visible border',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(\'input[type="text"]\')).borderTopWidth) > 0' },
                { id: 'ex-l73-t2', label: 'The email input uses a different border colour',
                  body: 'const a = getComputedStyle(document.querySelector(\'input[type="text"]\')); const b = getComputedStyle(document.querySelector(\'input[type="email"]\')); return a.borderTopColor !== b.borderTopColor' },
                { id: 'ex-l73-t3', label: 'The required field has a dashed border',
                  body: 'return getComputedStyle(document.querySelector("input[data-required]")).borderTopStyle === "dashed"' },
              ],
              hints: [
                'Select by value with `[attr="value"]` — `[type="text"]` and `[data-required]` both work here.',
                'Write three rules: one on `input[type="text"]`, one on `input[type="email"]`, one on `input[data-required]`.',
                'Try `border: 1px solid #29e2bd;` for text, `#1f6feb` for email, and `border: 2px dashed #dc2626;` for required.',
              ],
              solution: {
                html: '<form class="a-form">\n  <input type="text" name="first">\n  <input type="text" name="last">\n  <input type="email" name="mail">\n  <input type="text" name="postcode" data-required>\n</form>\n',
                css: '.a-form input[type="text"] { border: 1px solid #29e2bd; }\n.a-form input[type="email"] { border: 1px solid #1f6feb; }\n.a-form input[data-required] { border: 2px dashed #dc2626; }\n',
              },
              testNotes: 'The tests read computed styles straight off the inputs, so any valid colours and widths pass.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s37',
    title: 'CSS Forms',
    description: 'Make inputs, selects and textareas look like one system, keep them keyboard-accessible, and keep every field labelled.',
    lessons: [
      {
        id: 'css-l74',
        title: 'Forms',
        description: 'Style every form control consistently, draw your own focus states, and take over native select rendering without losing the current value.',
        duration: 8,
        objectives: [
          'Apply one consistent set of styles to input, select and textarea',
          'Replace native control rendering with appearance: none and a custom indicator',
          'Draw a visible focus ring using :focus-visible',
          'Keep a label associated with every control',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l74',
          title: 'Forms quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l74-q1',
              type: 'multiple-choice',
              prompt: 'What does appearance: none do on a select?',
              options: [
                'Removes the select from the tab order',
                'Removes the browser-drawn widget so you must draw your own indicator',
                'Makes the select invisible',
                'Prevents the form being submitted',
              ],
              answer: 1,
              explanation: 'It hands rendering back to you, including the arrow that showed the current value — which you then have to replace.',
            },
            {
              id: 'quiz-css-l74-q2',
              type: 'true-false',
              prompt: 'outline: none on a focused input is a harmless styling choice.',
              answer: false,
              explanation: 'It deletes the only signal a keyboard user gets about where they are. Replace it with your own outline rather than removing it.',
            },
            {
              id: 'quiz-css-l74-q3',
              type: 'code-output',
              prompt: 'Which rule keeps a 3px focus ring from shifting the layout?',
              code: 'input:focus-visible { outline: 3px solid #29e2bd; }',
              options: [
                'input:focus-visible { border: 3px solid #29e2bd; }',
                'input:focus-visible { outline: 3px solid #29e2bd; }',
                'input:focus-visible { box-shadow: none; }',
                'input:focus-visible { outline: 3px solid #29e2bd; border: 0; }',
              ],
              answer: 1,
              explanation: 'An outline draws outside the box and takes no layout space, so nothing moves. A border on focus does move things.',
            },
            {
              id: 'quiz-css-l74-q4',
              type: 'blank',
              prompt: 'Which property stops form controls rendering at the browser default font size and inheriting the page font instead?',
              answers: [
                'font: inherit',
                'inherit',
              ],
              explanation: 'Controls do not inherit typography by default. `font: inherit`, or explicit size and family properties, fixes it.',
            },
            {
              id: 'quiz-css-l74-q5',
              type: 'multiple-choice',
              prompt: 'Why should every control have a real label?',
              options: [
                'Labels are required for the form to validate',
                'It makes the placeholder persist',
                'Clicking the label focuses the field, and screen readers announce the pair together',
                'It stops the browser zooming on focus',
              ],
              answer: 2,
              explanation: '`<label for="...">` is both a click target and the accessible name of the control, which a placeholder never reliably is.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l74-b1',
            body: 'Form controls are the one part of a page the browser styles almost entirely on its own. Setting `appearance: none` hands that rendering back to you, so inputs, selects and textareas can finally look like they belong to your design.',
          },
          {
            type: 'demo', id: 'c-l74-d1',
            title: 'One visual system across all three controls',
            body: 'A complete form. Every control has a visible label, identical padding and border, rounded corners, and a teal ring that appears the moment a field is focused. Tab through it and watch the ring follow.',
            html: `<form class="signup">
  <div class="field">
    <label for="su-name">Full name</label>
    <input id="su-name" type="text" placeholder="Ada Lovelace">
  </div>
  <div class="field">
    <label for="su-plan">Plan</label>
    <select id="su-plan">
      <option>Starter</option>
      <option>Team</option>
      <option>Enterprise</option>
    </select>
  </div>
  <div class="field">
    <label for="su-notes">Anything we should know?</label>
    <textarea id="su-notes" rows="3" placeholder="Optional"></textarea>
  </div>
  <button type="submit">Create account</button>
</form>`,
            css: `.signup { display: flex; flex-direction: column; gap: 0.9rem; max-width: 320px; font-size: 13px; }
.signup .field { display: flex; flex-direction: column; gap: 0.3rem; }
.signup label { font-weight: 600; }
.signup input, .signup select, .signup textarea {
  appearance: none; font: inherit; color: inherit; background: #fff;
  border: 1px solid #cbd3da; border-radius: 8px; padding: 0.55rem 0.7rem;
}
.signup select {
  padding-right: 2rem;
  background-image: linear-gradient(45deg, transparent 50%, #64748b 50%),
    linear-gradient(135deg, #64748b 50%, transparent 50%);
  background-position: right 0.95rem top 1.1rem, right 0.65rem top 1.1rem;
  background-size: 6px 6px, 6px 6px; background-repeat: no-repeat;
}
.signup :focus-visible { outline: 3px solid #29e2bd; outline-offset: 1px; border-color: #0f766e; }
.signup button {
  appearance: none; font: inherit; font-weight: 600; border: 0; border-radius: 8px;
  padding: 0.6rem 1rem; color: #04211d; background: #29e2bd; cursor: pointer;
}`,
            height: 380,
          },
          {
            type: 'text', id: 'c-l74-b2',
            body: 'The select keeps a small triangle drawn from two gradients, because `appearance: none` removed the browser\'s own arrow. That arrow was the only thing telling the user which value is currently chosen — once you replace it, you owe them an equivalent.',
          },
          { type: 'heading', id: 'c-l74-h1', level: 3, body: 'The rules that matter' },
          {
            type: 'list', id: 'c-l74-l1', style: 'bullet',
            items: [
              '**Group the selectors.** `input, select, textarea { ... }` keeps padding, borders and radius from drifting apart between controls.',
              '**`appearance: none`** removes the platform widget styling on inputs, selects, checkboxes and buttons. First line of almost any custom form design.',
              '**`font: inherit`** on every control, or your inputs render at the browser default size while your paragraphs render at yours.',
              '**`:focus-visible`** draws the ring only when it helps: keyboard focus, yes; a mouse press, no. A `:focus` ring after a mouse click is noise.',
              '**`outline`, not `border`, for the ring.** Changing `border-color` on focus shifts layout by a pixel and nudges everything next to the field.',
              '**Wrap each control in a block with its label.** A flex column of `label` then control makes spacing trivial and keeps the pair together when the form reflows.',
              '**`box-sizing: border-box`** keeps a 100%-wide input from overflowing once padding and border are added.',
            ],
          },
          {
            type: 'warning', id: 'c-l74-w1',
            title: 'Never remove a focus outline without replacing it',
            body: '`outline: none` on an input deletes the browser\'s built-in signal that tells a keyboard user where they are — one of the most common accessibility failures on the web. Draw your own ring instead: `outline: 3px solid #29e2bd; outline-offset: 1px;`, visible against every background the field can sit on.',
          },
          {
            type: 'warning', id: 'c-l74-w2',
            title: 'Restyling a native select is a real handover of responsibility',
            body: 'The browser-rendered select carries the user\'s only continuous indication of what is selected, and `appearance: none` means it has stopped telling them. Drop the arrow and they cannot open the list; keep one that is too pale and they cannot see the live option. Keep `padding-right` so text never runs under the arrow, and keep the control focusable — never pair `appearance: none` with a `div` pretending to be a select.',
          },
          {
            type: 'example', id: 'c-l74-e1',
            title: 'A labelled field, states included',
            body: 'The label is a real `<label for>`, so clicking it focuses the input and screen readers announce the two together. The hint is linked by `aria-describedby`.',
            html: `<form class="mini">
  <label for="mini-email">Email</label>
  <input id="mini-email" type="email" placeholder="you@example.com" aria-describedby="mini-hint">
  <span id="mini-hint" class="hint">We only use this to send the receipt.</span>
  <button type="submit">Send</button>
</form>`,
            css: `.mini { display: flex; flex-direction: column; gap: 0.35rem; max-width: 260px; font-size: 13px; }
.mini label { font-weight: 600; }
.mini input {
  appearance: none; font: inherit; box-sizing: border-box;
  border: 1px solid #cbd3da; border-radius: 8px; padding: 0.55rem 0.7rem;
}
.mini input:focus-visible { outline: 3px solid #29e2bd; outline-offset: 1px; }
.mini .hint { font-size: 12px; color: #6b7280; }
.mini button {
  appearance: none; font: inherit; margin-top: 0.4rem; border: 0; border-radius: 8px;
  padding: 0.55rem 1rem; background: #29e2bd; color: #04211d; font-weight: 600;
}`,
            showPreview: true,
          },
          {
            type: 'tip', id: 'c-l74-t1',
            title: 'The placeholder is not a label',
            body: 'A placeholder disappears the moment someone types, is invisible to many screen readers, and often fails contrast checks. Use it as a hint of *format* only, and give every control a real `<label for="...">`. An unlabelled input tells a screen reader user nothing but "edit text".',
          },
          {
            type: 'exercise', id: 'c-l74-x1',
            exercise: {
              id: 'ex-l74',
              instructions: 'Style the field so it has a visible border, 12px of left padding, and a 3px outline it shows when focused.',
              languages: ['css'],
              starterCode: {
                html: '<div class="f-field">\n  <label for="f-city">City</label>\n  <input id="f-city" type="text">\n</div>\n',
                css: '.f-field input {\n  \n}\n',
              },
              tests: [
                { id: 'ex-l74-t1', label: 'The input has a visible border',
                  body: 'return getComputedStyle(document.querySelector("#f-city")).borderTopWidth !== "0px"' },
                { id: 'ex-l74-t2', label: 'The input has 12px of left padding',
                  body: 'return getComputedStyle(document.querySelector("#f-city")).paddingLeft === "12px"' },
                { id: 'ex-l74-t3', label: 'The input keeps a 3px outline for focus',
                  body: 'const s = getComputedStyle(document.querySelector("#f-city")); return s.outlineStyle !== "none" && s.outlineWidth === "3px"' },
              ],
              hints: [
                'Set three things: `border`, `padding` and `outline`.',
                'Attach the outline to `:focus-visible` so it only shows when it is useful.',
                'Try `border: 1px solid #cbd3da; padding: 0.5rem 12px;` and `:focus-visible { outline: 3px solid #29e2bd; }`.',
              ],
              solution: {
                html: '<div class="f-field">\n  <label for="f-city">City</label>\n  <input id="f-city" type="text">\n</div>\n',
                css: '.f-field input {\n  box-sizing: border-box; font: inherit; appearance: none;\n  border: 1px solid #cbd3da; border-radius: 8px; padding: 0.5rem 12px;\n}\n.f-field input:focus-visible { outline: 3px solid #29e2bd; outline-offset: 1px; }\n',
              },
              testNotes: 'The tests read the computed style of `#f-city`. Setting `outline: none` fails test 3 by design.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s38',
    title: 'CSS Counters',
    description: 'Generate numbering in CSS — for headings, footnotes, figures and nested outlines — without writing a single number in the HTML.',
    lessons: [
      {
        id: 'css-l75',
        title: 'Counters',
        description: 'Reset, increment and print CSS-generated numbers, and use counters() to number nested structures across every level.',
        duration: 7,
        objectives: [
          'Create a counter with counter-reset and advance it with counter-increment',
          'Print a counter into the page with counter() inside a content property',
          'Reset and increment counters per nesting level for scoped numbering',
          'Use counters() to join every level of a nested list into 1.1.2',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l75',
          title: 'Counters quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l75-q1',
              type: 'multiple-choice',
              prompt: 'Which property advances a counter by one?',
              options: [
                'counter-reset',
                'counter-increment',
                'counter-set',
                'counter()',
              ],
              answer: 1,
              explanation: '`counter-increment` adds to the counter each time the element renders; `counter-reset` starts it.',
            },
            {
              id: 'quiz-css-l75-q2',
              type: 'true-false',
              prompt: 'counter() prints every level of an active counter, joined by a separator.',
              answer: false,
              explanation: 'That is `counters()`. `counter()` prints only the innermost value of the counter.',
            },
            {
              id: 'quiz-css-l75-q3',
              type: 'code-output',
              prompt: 'What number does this produce for the nested item?',
              code: 'ol { counter-reset: n; }\nli { counter-increment: n; }\nli::before { content: counters(n, ".") " "; }',
              options: [
                '1',
                '0',
                '1.1',
                'Nothing, content needs a URL',
              ],
              answer: 2,
              explanation: 'The sublist resets `n`, opening a second instance. `counters()` joins both, giving 1.1 for the sub-item.',
            },
            {
              id: 'quiz-css-l75-q4',
              type: 'blank',
              prompt: 'Which counter style prints a value as an upper-case Roman numeral, as in content: counter(sec, ________);',
              answers: [
                'upper-roman',
              ],
              explanation: 'The second argument names the counter style: `decimal`, `lower-roman`, `upper-roman`, `lower-alpha`, `upper-alpha`.',
            },
            {
              id: 'quiz-css-l75-q5',
              type: 'multiple-choice',
              prompt: 'Why reset the same counter name on every nested list?',
              options: [
                'It is required for list styling to work',
                'Each reset opens a new instance, so every sublist starts from 1',
                'It makes the counter faster to compute',
                'It prevents list markers from rendering',
              ],
              answer: 1,
              explanation: 'Counters with the same name nest as instances. Each sublist resets it, producing the fresh inner level that `counters()` then prints.',
            },
          ],
        },
        content: [
          {
            type: 'text', id: 'c-l75-b1',
            body: 'Counters are variables the browser keeps for you while it renders a document. You reset one on a container, increment it on each child, and print it with `counter()` — which means numbering like 1, 1.1, 1.2, 2 can come from structure rather than from numbers typed into the markup.',
          },
          {
            type: 'demo', id: 'c-l75-d1',
            title: 'A nested outline, numbered by CSS',
            body: 'No `value`, no `start`, no hand-typed numbers — the HTML is three plain nested lists. The CSS produces 1, 1.1, 1.2, 2, 2.1, 2.1.1, 2.1.2. The third level is the point: `counters()` joins every active counter, and that is what makes nesting work.',
            html: `<ol class="outline">
  <li>Foundations
    <ol>
      <li>Box model</li>
      <li>Specificity</li>
    </ol>
  </li>
  <li>Layout
    <ol>
      <li>Flexbox
        <ol>
          <li>Gap</li>
          <li>Wrapping</li>
        </ol>
      </li>
      <li>Grid</li>
    </ol>
  </li>
</ol>`,
            css: `.outline, .outline ol { counter-reset: section; list-style: none; margin: 0; padding-left: 1.6rem; }
.outline { padding-left: 0.5rem; }
.outline li { counter-increment: section; margin: 0.3rem 0; font-size: 14px; }
.outline li::before {
  content: counters(section, ".") "  "; display: inline-block;
  min-width: 3.2rem; font-weight: 700; color: #0f766e;
}`,
            height: 300,
          },
          {
            type: 'text', id: 'c-l75-b2',
            body: 'Read the numbers down and you get one continuous sequence across the whole nesting depth. `counter()` would only ever show the innermost value, so a level-3 item would read "1" and be indistinguishable from its parent.',
          },
          { type: 'heading', id: 'c-l75-h1', level: 3, body: 'How it works' },
          {
            type: 'code', id: 'c-l75-c1', language: 'css',
            code: `.outline ol {
  counter-reset: section;
  list-style: none;
}
.outline li {
  counter-increment: section;
}
.outline li::before {
  content: counters(section, ".") "  ";
}`,
          },
          {
            type: 'list', id: 'c-l75-l1', style: 'bullet',
            items: [
              '**`counter-reset: name`** creates the counter. It lives on the *container* that starts a run — an `ol`, a heading, a section.',
              '**`counter-increment: name`** adds 1 every time the element renders. Put it on the repeating child.',
              '**`counter(name)`** prints the current value; `counter(name, upper-roman)` prints it as `I`, `II`, `III`.',
              '**`counters(name, ".")`** prints *every* counter of that name currently open, joined by your separator, innermost value included.',
              '**Counters nest automatically.** Resetting the same name on every `ol` opens a new instance, so each sublist starts at 1 again.',
              '**They style like text.** Counters inherit `color`, `font-weight` and `font-family` from the element, so `font-weight: 700` bolds the numbers too.',
              '**Start values are allowed.** `counter-reset: fig 2;` makes the first item read 3.',
              '**They are not only for lists.** Headings, figures, footnotes and code samples are the classic uses, and `@page` counters are how print CSS adds page numbers.',
            ],
          },
          {
            type: 'example', id: 'c-l75-e1',
            title: 'Numbered figures with a flat counter',
            body: 'Figures do not nest, so a plain `counter()` is enough. The caption is printed entirely from CSS, which means inserting a figure renumbers everything after it automatically.',
            html: `<div class="figs">
  <figure>
    <div class="ph ph-a"></div>
    <figcaption>Measured load time</figcaption>
  </figure>
  <figure>
    <div class="ph ph-b"></div>
    <figcaption>Cache hit ratio</figcaption>
  </figure>
  <figure>
    <div class="ph ph-c"></div>
    <figcaption>Peak memory</figcaption>
  </figure>
</div>`,
            css: `.figs { counter-reset: fig; display: flex; gap: 1rem; }
.figs figure { counter-increment: fig; flex: 1; margin: 0; }
.figs figcaption { font-size: 12px; color: #475569; margin-top: 0.35rem; }
.figs figcaption::before {
  content: "Figure " counter(fig) ": "; font-weight: 700; color: #0f766e;
}
.ph { height: 46px; border-radius: 8px; }
.ph-a { background: #d1fae5; }
.ph-b { background: #dbeafe; }
.ph-c { background: #fef3c7; }`,
            showPreview: true,
          },
          {
            type: 'warning', id: 'c-l75-w1',
            title: 'A CSS counter is not a list item for assistive tech',
            body: 'Generated content is often not announced reliably by screen readers, and the `list-style: none` you set to hide the browser numbers drops the `list` role in some browser and screen reader pairings. On content that must be navigable, keep a real `ol` and add `role="list"` in the HTML — or accept the numbering as decorative and keep it in the markup.',
          },
          {
            type: 'tip', id: 'c-l75-t1',
            title: 'counters() is the whole trick',
            body: 'If you remember one thing: `counter()` gives the innermost value, `counters()` gives the full dotted path. Swap `counters(section, ".")` for `counter(section)` and the third level of the demo collapses to "1", "2", "3".',
          },
          {
            type: 'exercise', id: 'c-l75-x1',
            exercise: {
              id: 'ex-l75',
              instructions: 'Number the outline with CSS counters so the top level reads 1, 2 and the nested items read 1.1 and 2.1. No numbers in the HTML.',
              languages: ['css'],
              starterCode: {
                html: '<ol class="c-list">\n  <li>First\n    <ol>\n      <li>First sub</li>\n    </ol>\n  </li>\n  <li>Second\n    <ol>\n      <li>Second sub</li>\n    </ol>\n  </li>\n</ol>\n',
                css: '.c-list {\n  \n}\n',
              },
              tests: [
                { id: 'ex-l75-t1', label: 'The first top-level item is numbered 1',
                  body: 'const c = getComputedStyle(document.querySelector(".c-list > li"), "::before").content; return c.replace(/"/g, "").trim().indexOf("1") === 0' },
                { id: 'ex-l75-t2', label: 'The nested item under First is numbered 1.1',
                  body: 'const c = getComputedStyle(document.querySelector(".c-list > li:first-child li"), "::before").content; return c.replace(/"/g, "").indexOf("1.1") === 0' },
                { id: 'ex-l75-t3', label: 'The nested item under Second is numbered 2.1',
                  body: 'const c = getComputedStyle(document.querySelector(".c-list > li:nth-child(2) li"), "::before").content; return c.replace(/"/g, "").indexOf("2.1") === 0' },
              ],
              hints: [
                'Reset the counter on the list, increment it on each `li`, and print it from a `::before` pseudo-element.',
                'For dotted multi-level numbers you need `counters()`, not `counter()`: `content: counters(item, ".") "  ";`',
                'Reset on both `.c-list` and `.c-list ol`, then try `.c-list li { counter-increment: item; }` with `.c-list li::before { content: counters(item, ".") "  "; }`.',
              ],
              solution: {
                html: '<ol class="c-list">\n  <li>First\n    <ol>\n      <li>First sub</li>\n    </ol>\n  </li>\n  <li>Second\n    <ol>\n      <li>Second sub</li>\n    </ol>\n  </li>\n</ol>\n',
                css: '.c-list, .c-list ol { counter-reset: item; list-style: none; }\n.c-list li { counter-increment: item; }\n.c-list li::before { content: counters(item, ".") "  "; font-weight: 700; color: #0f766e; }\n',
              },
              testNotes: 'The tests read the `::before` content of each `li`. It comes back quoted, so the strings are stripped before comparison.',
            },
          },
        ],
      },
    ],
  },
]