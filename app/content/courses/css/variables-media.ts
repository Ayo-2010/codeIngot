import type { Section } from '~/types/content'

export const cssVariableMediaSections: Section[] = [
  {
    id: 'css-s65',
    title: 'CSS Variables',
    description: 'Custom properties, how a subtree can be re-themed by redefining one value, and how JavaScript reads and writes them at runtime.',
    lessons: [
      {
        id: 'css-l104',
        title: 'The var() Function',
        description: 'Declare a reusable value with a --name property and read it back with var(), including a fallback for when it is missing.',
        duration: 7,
        objectives: [
          'Declare a custom property with the `--name` syntax',
          'Read a custom property with var() and use it in any declaration',
          'Supply a fallback value with var(--name, fallback)',
          'Explain why a missing custom property invalidates the declaration',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l104',
          title: 'The var() Function quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l104-q1',
              type: 'true-false',
              prompt: 'If `var(--accent)` is used with no fallback and the variable is undefined, the declaration is discarded and the property falls back to its inherited or initial value.',
              answer: true,
              explanation: 'The declaration is invalid at computed-value time. It does not fall back to the previous declaration in the same rule.',
            },
            {
              id: 'quiz-css-l104-q2',
              type: 'code-output',
              prompt: 'What colour is the text?',
              code: ':root {\n  --ink: #123456;\n}\n.card {\n  color: var(--ink);\n  background: var(--missing, #eeeeee);\n}',
              options: [
                'Black, and a transparent background',
                '#123456 text on a #eeeeee background',
                'Inherited text colour on a #eeeeee background',
                'Nothing — the rule is invalid because --missing is undefined',
              ],
              answer: 1,
              explanation: 'The fallback argument supplies `#eeeeee` for the undefined variable, so both declarations are valid.',
            },
            {
              id: 'quiz-css-l104-q3',
              type: 'multiple-choice',
              prompt: 'What does it mean that custom properties are untyped?',
              options: [
                'They can only hold colour values',
                'They cannot be inherited',
                'They must be declared with `var()`',
                'The browser stores the text without checking it, so a typo simply defines a different variable',
              ],
              answer: 3,
              explanation: 'A custom property stores a token sequence such as `"#29e2bd"` and the browser does not validate it, which is why a mistyped name is silently a new variable.',
            },
            {
              id: 'quiz-css-l104-q4',
              type: 'multiple-choice',
              prompt: 'Where can a custom property declared on an element be read?',
              options: [
                'Only on the exact element where it is declared',
                'On that element and all of its descendants',
                'Only inside the same rule',
                'Only on `:root`',
              ],
              answer: 1,
              explanation: 'Custom properties inherit exactly like `color`, so a declaration on an ancestor is available to the whole subtree beneath it.',
            },
            {
              id: 'quiz-css-l104-q5',
              type: 'multiple-choice',
              prompt: 'Why is `:root` a common place to declare variables?',
              options: [
                'It targets the `<html>` element, so the value reaches every element from one place',
                'It is the only selector that accepts custom properties',
                'It gives the variables priority over later overrides',
                'It makes the variables read-only',
              ],
              answer: 0,
              explanation: '`:root` is the `<html>` element, so declarations there are inherited by the entire document and there is exactly one place to look for the palette.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l104-b1',
            body: 'A custom property is a variable you declare inside your stylesheet. You set it with a property name that starts with two dashes, and you read it back with `var()`. The button below is styled entirely from one variable — change that one value and every colour in it moves together.',
          },
          {
            type: 'demo',
            id: 'c-l104-d1',
            title: 'A themed button built from one variable',
            body: 'The background, the border and the text colour are all read from `--btn` and `--btn-ink`. Neither colour is written literally anywhere in the `.btn` rule.',
            html: `<div class="stage">
  <button class="btn" type="button">Save changes</button>
  <p class="note">The same button, coloured by one variable.</p>
</div>`,
            css: `:root {
  --btn: #29e2bd;
  --btn-ink: #06251f;
}
.stage {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
  padding: 1rem;
}
.btn {
  background: var(--btn);
  color: var(--btn-ink);
  border: 2px solid var(--btn-ink);
  border-radius: 8px;
  padding: 0.6rem 1.1rem;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}
.note {
  margin: 0;
  font-size: 13px;
  color: #5c6672;
}`,
            height: 180,
          },
          {
            type: 'text',
            id: 'c-l104-b2',
            body: 'You are looking at a button whose entire palette comes from two custom properties declared on `:root`. The `.btn` rule itself never mentions a colour value, only the names of the variables.',
          },
          {
            type: 'heading',
            id: 'c-l104-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l104-c1',
            language: 'css',
            title: 'Declaring and reading a custom property',
            code: `:root {
  --brand: #29e2bd;
}

.btn {
  background: var(--brand);
}`,
          },
          {
            type: 'list',
            id: 'c-l104-l1',
            style: 'bullet',
            items: [
              '**Declaration** — a property name beginning with `--`, followed by any string. `--brand: #29e2bd;`',
              '**Reading** — `var(--brand)` substitutes the stored text into the declaration.',
              '**Custom properties are untyped.** The browser stores the token sequence `"#29e2bd"` and does not check it. A typo like `--brand-colour: red` is not an error, it simply defines a different variable.',
              '**They inherit.** A custom property declared on an element is available to that element and all its descendants, exactly like `color`.',
              '**They cascade and can be overridden**, which is what makes them a theming tool rather than a constant.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l104-h2',
            level: 3,
            body: 'The fallback argument',
          },
          {
            type: 'code',
            id: 'c-l104-c2',
            language: 'css',
            title: 'A fallback keeps the rule valid',
            code: `.badge {
  border-color: var(--accent, #29e2bd);
}`,
          },
          {
            type: 'text',
            id: 'c-l104-b3',
            body: 'The second argument to `var()` is used when the variable is not set at all. It can be a single value or a whole list of values, so `--shadow: 0 2px 8px rgba(0, 0, 0, 0.2);` can be read as `box-shadow: var(--shadow, 0 0 0 1px #d5dae0);`.',
          },
          {
            type: 'warning',
            id: 'c-l104-w1',
            title: 'No fallback means the declaration is thrown away',
            body: 'If `var(--accent)` has no fallback and no value, the browser cannot compute the declaration. It is treated as invalid **at computed-value time**, which means the property falls back to its inherited or initial value — it does not fall back to the previous declaration in the same rule. The element silently loses that one property and everything else about it still works.',
          },
          {
            type: 'tip',
            id: 'c-l104-t1',
            title: 'Why put them on :root',
            body: '`:root` is the `<html>` element, so variables declared there reach every element on the page and there is exactly one place to look for them.',
          },
          {
            type: 'exercise',
            id: 'c-l104-x1',
            exercise: {
              id: 'ex-l104',
              instructions:
                'Declare a custom property `--card-border` on `:root` and use it, with a fallback, as the border colour of `.card`.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">A card</div>',
                css: ':root {\n  \n}\n\n.card {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l104-t1',
                  label: 'The variable --card-border is defined',
                  body: 'const v = getComputedStyle(document.documentElement).getPropertyValue("--card-border"); return v.trim().length > 0',
                },
                {
                  id: 'ex-l104-t2',
                  label: 'The card border colour comes from the variable',
                  body: 'const root = getComputedStyle(document.documentElement); const card = getComputedStyle(document.querySelector(".card")); return card.borderTopColor === root.getPropertyValue("--card-border").trim()',
                },
                {
                  id: 'ex-l104-t3',
                  label: 'The card still has a visible border',
                  body: 'const s = getComputedStyle(document.querySelector(".card")); return parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== "none"',
                },
              ],
              hints: [
                'The variable name is `--card-border` and it goes inside the `:root` rule.',
                'Read it with `border-color: var(--card-border, #d5dae0);` — the fallback keeps the rule valid if the variable is ever removed.',
                'Remember the border needs a `style` too: `border: 1px solid var(--card-border, #d5dae0);` is fine.',
              ],
              solution: {
                html: '<div class="card">A card</div>',
                css: ':root {\n  --card-border: #29e2bd;\n}\n\n.card {\n  border: 1px solid var(--card-border, #d5dae0);\n  padding: 1rem;\n}\n',
              },
              testNotes:
                'The tests compare the card\'s computed border colour with the value the browser computed for the variable on `<html>`.',
            },
          },
        ],
      },
      {
        id: 'css-l105',
        title: 'Overriding Variables',
        description: 'Redefine a variable on any element and the entire subtree beneath it re-themes, with no new selectors and no duplicated rules.',
        duration: 8,
        objectives: [
          'Redefine a variable on a descendant and predict which elements change',
          'Explain why no extra selectors are needed to re-theme a component',
          'Build one component that reads correctly in three different themes',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l105',
          title: 'Overriding Variables quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l105-q1',
              type: 'blank',
              prompt: 'Complete the sentence: redefining a variable on an element re-themes that element and its ________.',
              answers: [
                'descendants',
                'subtree',
                'children',
                'whole subtree',
              ],
              explanation: 'Custom properties inherit, so a redefinition applies to the entire subtree beneath it.',
            },
            {
              id: 'quiz-css-l105-q2',
              type: 'multiple-choice',
              prompt: 'You set `--card-bg` on a `.theme-dark` element. Which elements pick it up?',
              options: [
                'Every element on the page',
                'Its siblings',
                'That element and its descendants only',
                'Only elements with the `.card` class anywhere',
              ],
              answer: 2,
              explanation: 'Variables follow the DOM tree rather than the selector, so the redefinition reaches the element itself and everything inside it, not its siblings.',
            },
            {
              id: 'quiz-css-l105-q3',
              type: 'multiple-choice',
              prompt: '`.theme-dark { --card-bg: #14181d; }` is set while `--card-ink` stays on `:root`. What happens?',
              options: [
                'The background is overridden and the ink keeps inheriting from `:root`',
                'The rule is ignored because it is partial',
                'The ink becomes transparent',
                'Both values reset to their initial values',
              ],
              answer: 0,
              explanation: 'A redefinition can be partial: only the property named on the wrapper changes, and any variable it does not set continues to inherit from an ancestor.',
            },
            {
              id: 'quiz-css-l105-q4',
              type: 'multiple-choice',
              prompt: 'Why is redefining variables better than a `.card.card--dark` rule?',
              options: [
                'Variables are faster to parse than classes',
                'A class cannot change colours',
                'Variables avoid the cascade entirely',
                'The component rules stay in one place instead of being duplicated per theme and state',
              ],
              answer: 3,
              explanation: 'A modifier class repeats every declaration for every theme, while variables leave one component rule and a short list of value overrides.',
            },
            {
              id: 'quiz-css-l105-q5',
              type: 'multiple-choice',
              prompt: 'A theme should apply to one section of the page. Where does the wrapper with the redefined variables go?',
              options: [
                'Anywhere on the page, because variables are global',
                'As an ancestor of exactly the content the theme should cover',
                'Only on `body`',
                'On each leaf element individually',
              ],
              answer: 1,
              explanation: 'Inheritance means the theme covers the wrapper\'s subtree, so placing the wrapper around the section keeps the rest of the page on the default values.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l105-b1',
            body: 'A variable declared on an element is inherited by everything inside it, and so is any redefinition. That means you can set a variable once and then change it *locally* to re-theme an entire component. The three cards below are the same component, and their CSS never varies — only the variables they inherit do.',
          },
          {
            type: 'demo',
            id: 'c-l105-d1',
            title: 'One component, three themes',
            body: '`.card` has no colour values at all. Light, dark and high-contrast come purely from redefining `--card-bg`, `--card-ink` and `--card-accent` on the wrapper class.',
            html: `<div class="row">
  <div class="panel theme-light">
    <div class="card">
      <h3>Light</h3>
      <p>Variables defined on the .theme-light wrapper.</p>
      <button class="cta" type="button">Action</button>
    </div>
  </div>
  <div class="panel theme-dark">
    <div class="card">
      <h3>Dark</h3>
      <p>Identical markup, identical rules.</p>
      <button class="cta" type="button">Action</button>
    </div>
  </div>
  <div class="panel theme-contrast">
    <div class="card">
      <h3>High contrast</h3>
      <p>Still one component.</p>
      <button class="cta" type="button">Action</button>
    </div>
  </div>
</div>`,
            css: `:root {
  --radius: 10px;
}
.theme-light {
  --card-bg: #ffffff;
  --card-ink: #14181d;
  --card-accent: #1d4ed8;
  --card-edge: #d5dae0;
}
.theme-dark {
  --card-bg: #14181d;
  --card-ink: #e9edf2;
  --card-accent: #29e2bd;
  --card-edge: #2c333c;
}
.theme-contrast {
  --card-bg: #000000;
  --card-ink: #ffffff;
  --card-accent: #ffd400;
  --card-edge: #ffffff;
}
.card {
  background: var(--card-bg);
  color: var(--card-ink);
  border: 2px solid var(--card-edge);
  border-radius: var(--radius);
  padding: 1rem;
}
.card h3 {
  margin: 0 0 0.4rem;
  font-size: 15px;
}
.card p {
  margin: 0 0 0.9rem;
  font-size: 13px;
  opacity: 0.8;
}
.cta {
  background: var(--card-accent);
  color: var(--card-bg);
  border: 0;
  border-radius: 6px;
  padding: 0.45rem 0.85rem;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}`,
            height: 300,
          },
          {
            type: 'text',
            id: 'c-l105-b2',
            body: 'Every card is the same `.card` element with the same rules. The only difference is which wrapper it sits inside, and that wrapper redefines four variables. This is how essentially every modern theme switch, design-token system and white-label product works.',
          },
          {
            type: 'heading',
            id: 'c-l105-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l105-c1',
            language: 'css',
            title: 'The component never mentions a colour',
            code: `.card {
  background: var(--card-bg);
  color: var(--card-ink);
  border: 2px solid var(--card-edge);
}

.theme-dark {
  --card-bg: #14181d;
  --card-ink: #e9edf2;
  --card-edge: #2c333c;
}`,
          },
          {
            type: 'list',
            id: 'c-l105-l1',
            style: 'bullet',
            items: [
              'A custom property declared on `body` reaches every element, so the site default can live in one place.',
              'A redefinition on any ancestor wins for that ancestor and everything under it, because the cascade resolves the property once per element.',
              'The redefined value can be **partial**: `.theme-dark { --card-bg: #14181d; }` leaves `--card-ink` inherited from `:root`.',
              'Redefinitions do not need to match the original selector name. `.theme-dark` and `.card` are unrelated as far as the cascade is concerned; only the DOM relationship matters.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l105-t1',
            title: 'This is why var() beats a second class',
            body: 'The usual alternative is `.card.card--dark { ... }`. That duplicates every rule for every theme and every combination of theme and state. Variables keep the component rules in one place and leave the variations as a flat list of small blocks.',
          },
          {
            type: 'warning',
            id: 'c-l105-w1',
            title: 'A redefinition does not reach a sibling',
            body: 'Variables follow the DOM tree, not the selector. Setting `--x` on `.theme-dark` does nothing for a `.theme-dark` element outside it. Scope themes by wrapping, and put the wrapper as high in the tree as the theme is meant to apply.',
          },
          {
            type: 'example',
            id: 'c-l105-e1',
            title: 'A theme token layer plus one component',
            body: 'A small token block defines the palette, a second block maps the palette onto semantic names, and the component only ever reads the semantic names. Swapping the palette block re-themes everything downstream.',
            html: `<div class="app">
  <nav class="bar">
    <span class="logo">Inkwell</span>
    <button class="cta" type="button">Upgrade</button>
  </nav>
  <div class="body">
    <h3>Semantic tokens only</h3>
    <p>The component below reads --surface, --ink and --accent.</p>
    <button class="cta" type="button">Primary action</button>
  </div>
</div>`,
            css: `.app {
  --surface: #ffffff;
  --ink: #14181d;
  --accent: #1d4ed8;
  --edge: #d5dae0;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 1rem;
  background: var(--surface);
  border: 1px solid var(--edge);
  border-radius: 10px;
}
.logo {
  font-weight: 700;
  color: var(--ink);
}
.body {
  margin-top: 0.75rem;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--edge);
  border-radius: 10px;
  color: var(--ink);
}
.body h3 {
  margin: 0 0 0.4rem;
  font-size: 15px;
}
.body p {
  margin: 0 0 0.9rem;
  font-size: 13px;
}
.cta {
  background: var(--accent);
  color: var(--surface);
  border: 0;
  border-radius: 6px;
  padding: 0.45rem 0.85rem;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l105-x1',
            exercise: {
              id: 'ex-l105',
              instructions:
                'The `.panel` below sets a default colour. Redefine `--panel-bg` and `--panel-ink` on `.panel.alt` so the second panel uses the dark values, without restyling `.panel` itself.',
              languages: ['css'],
              starterCode: {
                html: '<div class="row">\n  <div class="panel"><p>Default</p></div>\n  <div class="panel alt"><p>Alternate</p></div>\n</div>',
                css: ':root {\n  --panel-bg: #ffffff;\n  --panel-ink: #14181d;\n}\n\n.row {\n  display: flex;\n  gap: 1rem;\n}\n\n.panel {\n  flex: 1;\n  background: var(--panel-bg);\n  color: var(--panel-ink);\n  border: 1px solid var(--edge, #d5dae0);\n  border-radius: 8px;\n  padding: 1rem;\n}\n\n.panel p {\n  margin: 0;\n}\n\n.alt {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l105-t1',
                  label: 'The alternate panel has its own background',
                  body: 'const alt = getComputedStyle(document.querySelector(".panel.alt")); const base = getComputedStyle(document.querySelector(".panel:not(.alt)")); return alt.backgroundColor !== base.backgroundColor',
                },
                {
                  id: 'ex-l105-t2',
                  label: 'The alternate panel sets a dark background',
                  body: 'return getComputedStyle(document.querySelector(".panel.alt")).backgroundColor === "rgb(20, 24, 29)"',
                },
                {
                  id: 'ex-l105-t3',
                  label: 'The default panel is unchanged',
                  body: 'return getComputedStyle(document.querySelector(".panel:not(.alt)")).backgroundColor === "rgb(255, 255, 255)"',
                },
              ],
              hints: [
                'Add a rule for `.alt` that declares `--panel-bg: #14181d;` and `--panel-ink: #e9edf2;`.',
                'You must not change the `.panel` rule — `.alt` only redefines variables, the component rule stays identical for both panels.',
                'The specificity of `.panel.alt` does not matter here, because you are setting properties on the element, not properties the element reads.',
              ],
              solution: {
                html: '<div class="row">\n  <div class="panel"><p>Default</p></div>\n  <div class="panel alt"><p>Alternate</p></div>\n</div>',
                css: ':root {\n  --panel-bg: #ffffff;\n  --panel-ink: #14181d;\n}\n\n.row {\n  display: flex;\n  gap: 1rem;\n}\n\n.panel {\n  flex: 1;\n  background: var(--panel-bg);\n  color: var(--panel-ink);\n  border: 1px solid var(--edge, #d5dae0);\n  border-radius: 8px;\n  padding: 1rem;\n}\n\n.panel p {\n  margin: 0;\n}\n\n.alt {\n  --panel-bg: #14181d;\n  --panel-ink: #e9edf2;\n}\n',
              },
              testNotes:
                'The tests read the computed backgrounds of both panels to prove the override applied to one subtree only.',
            },
          },
        ],
      },
      {
        id: 'css-l106',
        title: 'Variables and JavaScript',
        description: 'Read a custom property with getComputedStyle and change one at runtime with setProperty, including the string-value trap that catches everyone.',
        duration: 7,
        objectives: [
          'Read a custom property with getComputedStyle().getPropertyValue()',
          'Change one at runtime with element.style.setProperty()',
          'Pass values to setProperty as strings with units included',
          'Wire a theme toggle to a data attribute',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l106',
          title: 'Variables and JavaScript quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l106-q1',
              type: 'identify-error',
              prompt: 'Why does this theme switch not work?',
              code: 'el.style.setProperty(\'--size\', 10)',
              options: [
                'setProperty is not a real DOM method',
                'The property name must be camelCase',
                'The value must be a string, so a bare number is rejected',
                'Custom properties cannot be set from JavaScript',
              ],
              answer: 2,
              explanation: 'Custom properties hold untyped strings, so `setProperty(\'--size\', 10)` does nothing. Write `\'10px\'` with the unit inside the string.',
            },
            {
              id: 'quiz-css-l106-q2',
              type: 'multiple-choice',
              prompt: 'Why call `.trim()` on the result of `getPropertyValue(\'--accent\')`?',
              options: [
                'It converts the value to a number',
                'The returned string usually has leading whitespace, which breaks comparisons',
                'It resolves inherited variables',
                'It strips the units from the value',
              ],
              answer: 1,
              explanation: 'Most browsers return the computed custom property with leading whitespace, so trimming is what makes `===` comparisons against a palette entry work.',
            },
            {
              id: 'quiz-css-l106-q3',
              type: 'multiple-choice',
              prompt: 'Why does `document.documentElement.style.getPropertyValue(\'--accent\')` sometimes return an empty string?',
              options: [
                'Chrome does not support custom properties',
                'The document must be reloaded first',
                'The variable name has to be camelCase',
                'The variable was declared in a stylesheet, and inline style only exposes inline declarations',
              ],
              answer: 3,
              explanation: 'The `style` object only reports inline declarations. Use `getComputedStyle(document.documentElement)` to read the value after the whole cascade.',
            },
            {
              id: 'quiz-css-l106-q4',
              type: 'multiple-choice',
              prompt: 'What does `el.style.removeProperty(\'--accent\')` do?',
              options: [
                'It removes the inline value so the stylesheet value applies again',
                'It deletes the variable from every stylesheet',
                'It sets the value to `none`',
                'It stops the variable from being inherited',
              ],
              answer: 0,
              explanation: '`removeProperty` only removes the inline custom property; with no inline value left, the cascade falls back to whatever the stylesheet declared.',
            },
            {
              id: 'quiz-css-l106-q5',
              type: 'multiple-choice',
              prompt: 'Which line switches the theme using a data attribute that CSS can match with `[data-theme="dark"]`?',
              options: [
                '`document.documentElement.classList = \'dark\'`',
                '`document.body.theme = \'dark\'`',
                '`document.documentElement.dataset.theme = \'dark\'`',
                '`document.documentElement.style.theme = \'dark\'`',
              ],
              answer: 2,
              explanation: 'The `dataset` API writes a real `data-theme` attribute, which is exactly what an attribute selector can target. Setting an arbitrary property does not create an attribute.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l106-b1',
            body: 'Custom properties live on the cascade, so JavaScript can read them off any element and write them onto any element at runtime. That is what makes a live theme switch possible without a single class on the body. The panel below reads `--accent` and `--accent-ink` out of the DOM and prints their values; clicking the button rewrites them.',
          },
          {
            type: 'demo',
            id: 'c-l106-d1',
            title: 'Read a variable, then change it',
            body: 'The readout shows the two variables as the browser computed them. Click the button and the accent variable is rewritten with setProperty; the readout and the swatch both update immediately.',
            html: `<div class="panel">
  <span class="swatch"></span>
  <dl class="readout">
    <dt>--accent</dt><dd class="accent-value"></dd>
    <dt>--accent-ink</dt><dd class="ink-value"></dd>
  </dl>
  <button class="btn" type="button">Shuffle accent</button>
</div>`,
            css: `:root {
  --accent: #1d4ed8;
  --accent-ink: #ffffff;
}
.panel {
  background: var(--accent);
  color: var(--accent-ink);
  border-radius: 10px;
  padding: 1rem;
  display: grid;
  gap: 0.6rem;
  justify-items: start;
}
.swatch {
  width: 100%;
  height: 8px;
  border-radius: 99px;
  background: var(--accent-ink);
}
.readout {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  margin: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
}
.readout dt {
  opacity: 0.75;
}
.readout dd {
  margin: 0;
  font-weight: 700;
}
.btn {
  background: var(--accent-ink);
  color: var(--accent);
  border: 0;
  border-radius: 6px;
  padding: 0.45rem 0.85rem;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}`,
            javascript: `var panel = document.querySelector('.panel')
var root = document.documentElement
var palette = ['#1d4ed8', '#b91c1c', '#047857', '#7c3aed', '#c2410c']

function readVars() {
  var style = getComputedStyle(panel)
  document.querySelector('.accent-value').textContent = style.getPropertyValue('--accent').trim()
  document.querySelector('.ink-value').textContent = style.getPropertyValue('--accent-ink').trim()
}

document.querySelector('.btn').addEventListener('click', function () {
  var current = getComputedStyle(panel).getPropertyValue('--accent').trim()
  var next = palette[(palette.indexOf(current) + 1) % palette.length]
  root.style.setProperty('--accent', next)
  readVars()
})

readVars()`,
            height: 230,
          },
          {
            type: 'text',
            id: 'c-l106-b2',
            body: 'The readout is not hard-coded text. It is the computed value of the variable pulled straight out of the page, which is why it changes the instant the variable does.',
          },
          {
            type: 'heading',
            id: 'c-l106-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l106-c1',
            language: 'javascript',
            title: 'Reading and writing a custom property',
            code: `var style = getComputedStyle(document.querySelector('.panel'))
var value = style.getPropertyValue('--accent').trim()

document.documentElement.style.setProperty('--accent', '#b91c1c')`,
          },
          {
            type: 'code',
            id: 'c-l106-c2',
            language: 'css',
            title: 'A theme switch driven by one attribute',
            code: `[data-theme='dark'] {
  --surface: #14181d;
  --ink: #e9edf2;
}`,
          },
          {
            type: 'code',
            id: 'c-l106-c3',
            language: 'javascript',
            title: 'Flipping it',
            code: `document.documentElement.dataset.theme = 'dark'`,
          },
          {
            type: 'warning',
            id: 'c-l106-w1',
            title: 'Custom property values must be strings',
            body: '`style.setProperty(\'--size\', 10)` silently does nothing. Custom properties are untyped token sequences, so the browser only accepts a string, and if the value is meant to be a length the unit has to be part of it. Write `setProperty(\'--size\', \'10px\')`, never `10` and never `10 + \'px\'` — the unit belongs in the string.',
          },
          {
            type: 'list',
            id: 'c-l106-l1',
            style: 'bullet',
            items: [
              '`getComputedStyle(el).getPropertyValue(\'--x\')` returns the **computed** value, so inherited variables are resolved for you.',
              '`el.style.setProperty(\'--x\', \'…\')` writes an inline custom property, which wins over every stylesheet rule until it is removed.',
              '`el.style.removeProperty(\'--x\')` deletes the inline value and lets the stylesheet take over again.',
              '`getPropertyValue` returns a string with leading whitespace in most browsers — call `.trim()` before comparing.',
              '`el.style.setProperty` with no value, or `el.style[\'--x\'] = value`, are not equivalent; use `setProperty`.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l106-t1',
            title: 'Read from :root, not from :root\'s inline style',
            body: '`document.documentElement.style.getPropertyValue(\'--x\')` only returns values you set inline. `getComputedStyle(document.documentElement)` returns the value after the whole cascade, including values declared in your stylesheet.',
          },
          {
            type: 'exercise',
            id: 'c-l106-x1',
            exercise: {
              id: 'ex-l106',
              instructions:
                'Give `.panel` a `--panel-bg` variable with a fallback, so the panel has a coloured background even where the variable is not defined.',
              languages: ['css'],
              starterCode: {
                html: '<div class="panel">Panel</div>',
                css: '.panel {\n  \n}\n',
              },
              tests: [
                {
                  id: 'ex-l106-t1',
                  label: 'The panel background is not the browser default',
                  body: 'return getComputedStyle(document.querySelector(".panel")).backgroundColor !== "rgba(0, 0, 0, 0)"',
                },
                {
                  id: 'ex-l106-t2',
                  label: 'The background is written with a var() call',
                  body: 'const sheet = [...document.styleSheets].flatMap(function (s) { try { return [...s.cssRules] } catch (e) { return [] } }).map(function (r) { return r.cssText }).join(" "); return /var\(\s*--panel-bg/.test(sheet)',
                },
                {
                  id: 'ex-l106-t3',
                  label: 'The variable carries a fallback value',
                  body: 'const sheet = [...document.styleSheets].flatMap(function (s) { try { return [...s.cssRules] } catch (e) { return [] } }).map(function (r) { return r.cssText }).join(" "); return /var\(\s*--panel-bg\s*,/.test(sheet)',
                },
              ],
              hints: [
                'Declare the variable in the same rule as the property that reads it, or in a `:root` rule.',
                'The fallback goes after a comma inside the same `var()`: `background: var(--panel-bg, #e6f4ff);`',
                'A fallback is a comma-separated second argument, not a second `var()` call.',
              ],
              solution: {
                html: '<div class="panel">Panel</div>',
                css: '.panel {\n  --panel-bg: #e6f4ff;\n  background: var(--panel-bg, #e6f4ff);\n  border: 1px solid var(--panel-edge, #d5dae0);\n  border-radius: 8px;\n  padding: 1rem;\n}\n',
              },
              testNotes:
                'The last two tests inspect the authored stylesheet text, because a working fallback cannot be observed from computed style alone once the variable is defined.',
            },
          },
        ],
      },
      {
        id: 'css-l107',
        title: 'Variables in Media Queries',
        description: 'Custom properties work perfectly inside the block of a media query and cannot be used in its condition. Here is the limitation and the workaround.',
        duration: 8,
        objectives: [
          'Use a custom property in the declarations inside a media query block',
          'State clearly why a custom property cannot appear in the media condition',
          'Apply a variable as a breakpoint with matchMedia and a data attribute',
          'Choose the right workaround for a given situation',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l107',
          title: 'Variables in Media Queries quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l107-q1',
              type: 'multiple-choice',
              prompt: 'How is a custom property declared?',
              options: [
                '$brand: red;',
                '--brand: red;',
                '@brand: red;',
                'var(--brand): red;',
              ],
              answer: 1,
              explanation: 'Custom properties are ordinary CSS properties whose names start with two dashes, and they are read back with `var()`.',
            },
            {
              id: 'quiz-css-l107-q2',
              type: 'multiple-choice',
              prompt: 'Why can a custom property not be used in a media query condition?',
              options: [
                'Media queries only accept pixel values',
                'Custom properties are not allowed outside declarations',
                'Media queries run only on the server',
                'The condition is evaluated before any element exists to resolve the variable against',
              ],
              answer: 3,
              explanation: 'Custom properties are resolved per element at computed-value time, but the media query is evaluated before that and has no element to resolve against.',
            },
            {
              id: 'quiz-css-l107-q3',
              type: 'multiple-choice',
              prompt: 'What happens to `@media (max-width: var(--breakpoint))` in browsers?',
              options: [
                'It treats the variable as `0px`',
                'The condition is invalid, so the query never matches',
                'It falls back to a default breakpoint',
                'It works only in Firefox',
              ],
              answer: 1,
              explanation: '`var()` in a condition makes the whole condition invalid rather than merely ignored, so the block behind it never applies.',
            },
            {
              id: 'quiz-css-l107-q4',
              type: 'multiple-choice',
              prompt: 'What is the documented workaround for a variable-driven breakpoint?',
              options: [
                'Use `matchMedia` in JavaScript to set a data attribute that CSS selects on',
                'Duplicate the media query once for every possible value',
                'Put the variable inside `calc()` in the condition',
                'Declare the variable inside the media block instead',
              ],
              answer: 0,
              explanation: '`matchMedia` can read a breakpoint held in JavaScript and flip a data attribute, leaving CSS with a plain attribute selector that needs no `var()`.',
            },
            {
              id: 'quiz-css-l107-q5',
              type: 'multiple-choice',
              prompt: 'Why call the `apply` function once at startup as well as on `change`?',
              options: [
                '`change` fires only after a click',
                'The first call registers the listener',
                '`change` only fires when the condition flips, so a page loaded narrow would otherwise start wrong',
                '`matchMedia` needs two calls to initialise',
              ],
              answer: 2,
              explanation: 'The `change` listener is silent until the query flips, so a page opened at a narrow width must be evaluated once on load to set the attribute correctly.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l107-b1',
            body: 'Variables are substituted when a declaration is computed, which is long after the browser has already decided whether a media query matches. So a variable works perfectly well inside the block and is completely ignored in the condition. The panel below changes its padding and font size at one breakpoint, and the sizes it uses come from variables.',
          },
          {
            type: 'demo',
            id: 'c-l107-d1',
            title: 'Variables working inside a media query block',
            body: 'The base rule uses `--pad` and `--step`. The media query changes only those two variables, and every padding and font size in the panel follows. Note the breakpoint is `max-width: 900px` — this preview is about 700px wide, so a narrower breakpoint such as 600px would never fire here.',
            html: `<div class="panel">
  <h3>Adaptive panel</h3>
  <p>Both the padding and the type size are driven by variables that change across the breakpoint.</p>
  <button class="btn" type="button">Action</button>
</div>`,
            css: `:root {
  --pad: 1rem;
  --step: 15px;
}
.panel {
  background: #ffffff;
  border: 1px solid #d5dae0;
  border-radius: 10px;
  padding: var(--pad);
}
.panel h3 {
  margin: 0 0 0.4rem;
  font-size: var(--step);
}
.panel p {
  margin: 0 0 0.9rem;
  font-size: calc(var(--step) - 2px);
}
.btn {
  background: #29e2bd;
  color: #06251f;
  border: 0;
  border-radius: 6px;
  padding: 0.45rem 0.85rem;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}
@media (max-width: 900px) {
  :root {
    --pad: 1.75rem;
    --step: 19px;
  }
}`,
            height: 240,
          },
          {
            type: 'text',
            id: 'c-l107-b2',
            body: 'The media query does not restyle the panel. It redefines two variables, and the panel restyles itself because it was written to read them. Writing breakpoints this way keeps the responsive decision in one place.',
          },
          {
            type: 'heading',
            id: 'c-l107-h1',
            level: 3,
            body: 'The limitation',
          },
          {
            type: 'code',
            id: 'c-l107-c1',
            language: 'css',
            title: 'This does not work',
            code: `:root {
  --breakpoint: 600px;
}

@media (max-width: var(--breakpoint)) {
  .panel {
    padding: 2rem;
  }
}`,
          },
          {
            type: 'warning',
            id: 'c-l107-w1',
            title: 'A custom property cannot be used in a media query condition',
            body: 'Custom properties are untyped strings that are resolved per element at computed-value time. A media query condition has no element, so there is nothing to resolve against. `var()` in a condition is not merely ignored in most engines — it makes the whole condition invalid, and the query never matches. `var()` is only usable in the declarations inside the block.',
          },
          {
            type: 'heading',
            id: 'c-l107-h2',
            level: 3,
            body: 'The workaround: one attribute, one class of JavaScript',
          },
          {
            type: 'code',
            id: 'c-l107-c2',
            language: 'css',
            title: 'CSS becomes a simple boolean check',
            code: `[data-narrow='true'] .panel {
  padding: 2rem;
}`,
          },
          {
            type: 'code',
            id: 'c-l107-c3',
            language: 'javascript',
            title: 'matchMedia sets the attribute when the condition changes',
            code: `var mq = window.matchMedia('(max-width: 600px)')

function apply(matches) {
  document.documentElement.dataset.narrow = String(matches)
}

mq.addEventListener('change', function (e) {
  apply(e.matches)
})

apply(mq.matches)`,
          },
          {
            type: 'text',
            id: 'c-l107-b3',
            body: 'The breakpoint now lives in one string in JavaScript, and every consumer is a plain attribute selector. If you need a real variable-driven breakpoint in a build, a preprocessor can generate the media query text for you, which is how Sass and PostCSS plugins do it.',
          },
          {
            type: 'tip',
            id: 'c-l107-t1',
            title: 'Listen for change, and read matches',
            body: 'A `change` event only fires when the condition flips, so run the function once at startup as well — otherwise a page loaded on a narrow screen starts out wrong.',
          },
          {
            type: 'exercise',
            id: 'c-l107-x1',
            exercise: {
              id: 'ex-l107',
              instructions:
                'Add a `@media (max-width: 900px)` block that redefines `--pad` on `:root` to `1.75rem`. The `.panel` rule is already written to read it.',
              languages: ['css'],
              starterCode: {
                html: '<div class="panel">Panel</div>',
                css: ':root {\n  --pad: 1rem;\n}\n\n.panel {\n  padding: var(--pad, 1rem);\n  border: 1px solid var(--edge, #d5dae0);\n  border-radius: 8px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l107-t1',
                  label: 'A @media rule is present',
                  body: 'const rules = [...document.styleSheets].flatMap(function (s) { try { return [...s.cssRules] } catch (e) { return [] } }); return rules.some(function (r) { return r.type === 4 || r.constructor.name === "CSSMediaRule" })',
                },
                {
                  id: 'ex-l107-t2',
                  label: '--pad resolves to a real length',
                  body: 'const v = getComputedStyle(document.documentElement).getPropertyValue("--pad").trim(); return /px|rem|em$/.test(v) && parseFloat(v) > 0',
                },
                {
                  id: 'ex-l107-t3',
                  label: 'The panel padding matches the resolved --pad',
                  body: 'const root = getComputedStyle(document.documentElement).getPropertyValue("--pad").trim(); const panel = getComputedStyle(document.querySelector(".panel")); return panel.paddingTop === root || Math.abs(parseFloat(panel.paddingTop) - parseFloat(root)) < 0.5',
                },
              ],
              hints: [
                'The media query goes after the rules that use the variable, or before — order matters for equal specificity, so put it last.',
                'Inside the block, redeclare the variable on `:root`: `@media (max-width: 900px) { :root { --pad: 1.75rem; } }`',
                'The `.panel` rule needs no change at all. That is the whole point of driving layout from variables.',
              ],
              solution: {
                html: '<div class="panel">Panel</div>',
                css: ':root {\n  --pad: 1rem;\n}\n\n.panel {\n  padding: var(--pad, 1rem);\n  border: 1px solid var(--edge, #d5dae0);\n  border-radius: 8px;\n}\n\n@media (max-width: 900px) {\n  :root {\n    --pad: 1.75rem;\n  }\n}\n',
              },
              testNotes:
                'These tests do not depend on the query firing. They check that the block exists and that the panel padding always tracks the resolved variable, at whatever width the preview happens to be.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s66',
    title: 'CSS Box Sizing',
    description: 'The difference between content-box and border-box, and why the one-line reset belongs at the top of nearly every stylesheet.',
    lessons: [
      {
        id: 'css-l108',
        title: 'Box Sizing',
        description: 'Make width mean what you expect it to mean with box-sizing, and install the reset that stops width surprises for the rest of the course.',
        duration: 6,
        objectives: [
          'Predict the outer width of a content-box and a border-box element',
          'Apply the universal border-box reset',
          'Explain why the reset belongs near the top of the stylesheet',
          'Recall the inheritance caveat and handle form controls',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l108',
          title: 'Box Sizing quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l108-q1',
              type: 'multiple-choice',
              prompt: 'What is the default value of `box-sizing`?',
              options: [
                '`border-box`',
                '`content-box`',
                '`padding-box`',
                '`margin-box`',
              ],
              answer: 1,
              explanation: '`content-box` is the default, which is why `width` measures only the content and padding and border are added on top.',
            },
            {
              id: 'quiz-css-l108-q2',
              type: 'code-output',
              prompt: 'How wide is the box, really?',
              code: '.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n  box-sizing: content-box;\n}',
              options: [
                '200px',
                '240px',
                '250px',
                '190px',
              ],
              answer: 2,
              explanation: 'Content-box makes `width` the content only, so the outer width is 200 + 20 + 20 + 5 + 5 = 250px.',
            },
            {
              id: 'quiz-css-l108-q3',
              type: 'true-false',
              prompt: 'Adding padding to an element can make it wider than the width you declared.',
              answer: true,
              explanation: 'Only under `content-box`. That is precisely the surprise the `border-box` reset exists to remove.',
            },
            {
              id: 'quiz-css-l108-q4',
              type: 'blank',
              prompt: 'Which single declaration, applied to the universal selector, makes declared widths include padding and border? Give the value only.',
              answers: [
                'border-box',
              ],
              explanation: '`* { box-sizing: border-box; }` is the reset nearly every project starts with.',
            },
            {
              id: 'quiz-css-l108-q5',
              type: 'multiple-choice',
              prompt: 'Why is `*` alone not quite enough in the reset?',
              options: [
                'Because `*` has no specificity',
                'Because generated content with `::before` and `::after` is a box too and needs it as well',
                'Because `*` only matches elements, not pseudo-classes',
                'Because `box-sizing` does not inherit',
              ],
              answer: 1,
              explanation: '`::before` and `::after` generate boxes of their own, so the reset normally includes them explicitly.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l108-b1',
            body: 'You have already met `box-sizing`: it decides whether `width` measures the content area alone or the whole box including padding and border. Here is what that choice costs you. Both boxes below are declared `width: 240px`, and one of them is much wider than 240 pixels.',
          },
          {
            type: 'demo',
            id: 'c-l108-d1',
            title: 'The same width, two box models',
            body: 'Both boxes are `width: 240px` with `padding: 20px` and a `4px` border. The content-box one measures 288px across; the border-box one is exactly 240px, so it lines up with the ruler underneath.',
            html: `<div class="stage">
  <div class="tag">content-box</div>
  <div class="box content">content-box: width 240px</div>
  <div class="tag">border-box</div>
  <div class="box border">border-box: width 240px</div>
  <div class="ruler">240px</div>
</div>`,
            css: `.stage {
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
  justify-items: start;
}
.tag {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #5c6672;
}
.box {
  width: 240px;
  padding: 20px;
  border: 4px solid #29e2bd;
  border-radius: 8px;
  background: #f2fbf9;
  font-size: 13px;
}
.content {
  box-sizing: content-box;
}
.border {
  box-sizing: border-box;
}
.ruler {
  width: 240px;
  height: 10px;
  background: #1d4ed8;
  border-radius: 3px;
}`,
            height: 280,
          },
          {
            type: 'text',
            id: 'c-l108-b2',
            body: 'The blue bar is 240px wide. The border-box box lines up with it. The content-box box overflows it by its padding and border — 48px of extra width that `width` never mentioned.',
          },
          {
            type: 'heading',
            id: 'c-l108-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'code',
            id: 'c-l108-c1',
            language: 'css',
            title: 'The two values',
            code: `.box {
  width: 240px;
  padding: 20px;
  border: 4px solid #111;
}

.box.content {
  box-sizing: content-box;
}

.box.border {
  box-sizing: border-box;
}`,
          },
          {
            type: 'list',
            id: 'c-l108-l1',
            style: 'bullet',
            items: [
              '`content-box` is the default. `width` is the content area only, so the outer width is `width + padding + border`.',
              '`border-box` makes `width` the outer width. Content is squeezed to `width - padding - border` instead.',
              '`height` behaves the same way. On `content-box` a `height` plus padding is taller than you asked for.',
              'The two values only differ when padding or border is non-zero, which is why this is easy to miss until you add padding later.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l108-h2',
            level: 3,
            body: 'The reset',
          },
          {
            type: 'code',
            id: 'c-l108-c2',
            language: 'css',
            title: 'Near the top of the stylesheet',
            code: `*,
*::before,
*::after {
  box-sizing: border-box;
}`,
          },
          {
            type: 'text',
            id: 'c-l108-b3',
            body: 'With this in place `width: 50%` inside a padded row works, `padding` never surprises you, and a two-column grid of padded cards does not overflow its track. `::before` and `::after` are included because generated content is a box too and inherits the property.',
          },
          {
            type: 'exercise',
            id: 'c-l108-x1',
            exercise: {
              id: 'ex-l108',
              instructions:
                'Add the border-box reset to the stylesheet, then confirm the two cards below both measure exactly 240px across.',
              languages: ['css'],
              starterCode: {
                html: '<div class="card">One</div>\n<div class="card">Two</div>',
                css:
                  '.card {\n  width: 240px;\n  padding: 20px;\n  border: 4px solid #29e2bd;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l108-t1',
                  label: 'The universal reset applies border-box',
                  body: 'return getComputedStyle(document.querySelector(".card")).boxSizing === "border-box"',
                },
                {
                  id: 'ex-l108-t2',
                  label: 'The outer width really is 240px',
                  body: 'return Math.round(document.querySelector(".card").getBoundingClientRect().width) === 240',
                },
                {
                  id: 'ex-l108-t3',
                  label: 'Both cards are the same width',
                  body: 'const cards = [...document.querySelectorAll(".card")]; return cards.length === 2 && Math.abs(cards[0].getBoundingClientRect().width - cards[1].getBoundingClientRect().width) < 1',
                },
              ],
              hints: [
                'The reset is a single rule targeting `*`.',
                'It needs to come before anything that sets a width, or at least apply to the element you are measuring.',
                'Add `*, *::before, *::after { box-sizing: border-box; }`',
              ],
              solution: {
                html: '<div class="card">One</div>\n<div class="card">Two</div>',
                css:
                  '*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n.card {\n  width: 240px;\n  padding: 20px;\n  border: 4px solid #29e2bd;\n}\n',
              },
              testNotes:
                'The second test measures the rendered box rather than reading a declared value, so it fails without the reset.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s67',
    title: 'CSS Media Queries',
    description: 'Ask the browser what it is looking at, and change your styles based on the answer.',
    lessons: [
      {
        id: 'css-l109',
        title: 'Media Queries',
        description: 'The syntax, mobile-first versus desktop-first, and why your breakpoints should come from your content.',
        duration: 7,
        objectives: [
          'Write a media query that applies rules above a width',
          'Explain why mobile-first means starting with `min-width`',
          'Give breakpoints in `em` or `rem` instead of pixels',
          'Use the modern range syntax and justify a content-driven breakpoint',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l109',
          title: 'Media Queries quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l109-q1',
              type: 'multiple-choice',
              prompt: 'What does `@media (min-width: 48rem)` mean?',
              options: [
                'Apply only on screens narrower than 48rem',
                'Apply when the viewport is at least 48rem wide',
                'Apply only in portrait orientation',
                'Apply on devices with a physical width of 48rem',
              ],
              answer: 1,
              explanation: '`min-width` is inclusive of the value itself. It applies at 48rem and above, which is what makes it the mobile-first choice.',
            },
            {
              id: 'quiz-css-l109-q2',
              type: 'true-false',
              prompt: 'Two stacked `max-width` queries can both match at the same viewport width.',
              answer: true,
              explanation: 'A viewport that is both 400px and 600px wide satisfies both conditions, so both blocks apply and you must resolve the conflict yourself.',
            },
            {
              id: 'quiz-css-l109-q3',
              type: 'blank',
              prompt: 'Which media feature lets you respond to a user who has asked for less motion? Give the feature name only.',
              answers: [
                'prefers-reduced-motion',
              ],
              explanation: '`@media (prefers-reduced-motion: reduce)` is the standard way to respect that request and disable animation.',
            },
            {
              id: 'quiz-css-l109-q4',
              type: 'multiple-choice',
              prompt: 'What is the best reason to add a breakpoint?',
              options: [
                'A popular device is exactly that wide',
                'The layout visibly breaks at that width',
                'A framework requires it',
                'It has been in the design file since 2010',
              ],
              answer: 1,
              explanation: 'Breakpoints should come from where your content stops working. Device widths are arbitrary and your content will change.',
            },
            {
              id: 'quiz-css-l109-q5',
              type: 'code-output',
              prompt: 'How many columns does the row have on a narrow screen?',
              code: '.row { display: grid; grid-template-columns: 1fr; }\n@media (min-width: 900px) {\n  .row { grid-template-columns: repeat(3, 1fr); }\n}',
              options: [
                '3',
                '1',
                '4',
                '0',
              ],
              answer: 1,
              explanation: 'Below the breakpoint only the base rule applies, so the row is a single column. Media query rules are additive, not replacements.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l109-b1',
            body: 'A media query lets you attach CSS to a condition about the environment: how wide the viewport is, whether it is a print page, or whether the user asked for reduced motion. The browser evaluates the condition and applies the block only when it holds.',
          },
          {
            type: 'demo',
            id: 'c-l109-d1',
            title: 'One stylesheet, two very different layouts',
            body: 'Below 900px the cards stack in a single column. Above it they sit three abreast. The breakpoint is set to 900px rather than the usual 600px so that you can see the change inside this narrow preview.',
            html: `<div class="cards">
  <article class="card">One</article>
  <article class="card">Two</article>
  <article class="card">Three</article>
</div>`,
            css: `.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  font-size: 14px;
}
.card {
  border: 1px solid #d5dae0;
  border-radius: 8px;
  padding: 0.75rem;
}
@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
            height: 240,
          },
          {
            type: 'text',
            id: 'c-l109-b2',
            body: 'One rule changed the layout for wide screens only. Below the breakpoint the original single-column rule still applies, untouched. This is mobile-first in practice: the default is the simplest case, and queries add complexity as the space grows.',
          },
          {
            type: 'heading',
            id: 'c-l109-h1',
            level: 3,
            body: 'The syntax',
          },
          {
            type: 'code',
            id: 'c-l109-c1',
            language: 'css',
            title: 'The three query types you will use',
            code: `/* width, either edge */
@media (min-width: 48rem) { ... }
@media (max-width: 30rem) { ... }

/* modern range syntax, same meaning, easier to read */
@media (48rem <= width) { ... }

/* not about width at all */
@media print { ... }
@media (prefers-reduced-motion: reduce) { ... }
@media (prefers-color-scheme: dark) { ... }`,
          },
          {
            type: 'list',
            id: 'c-l109-l1',
            style: 'bullet',
            items: [
              '`min-width` means "at least this wide", so rules apply on the way up. `max-width` means "at most this wide", so rules apply on the way down.',
              'The media type comes first: `screen`, `print`, or `all` by default. Width conditions go in parentheses after it.',
              'Queries combine with `and`, `not` and `,` for alternatives, exactly like logic.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l109-t1',
            title: 'Breakpoints in `em`, not `px`',
            body: 'A `px` breakpoint ignores the user\'s font size, so a page that is comfortable at their default size can break at a larger one. `em` breakpoints scale with the root font size. Use `rem` if you would rather tie them to the root regardless of context.',
          },
          {
            type: 'warning',
            id: 'c-l109-w1',
            title: 'A breakpoint should exist because the content broke',
            body: 'Do not add a query at 768px because a device is 768px wide. Resize until the layout looks wrong, then add a query there. Two or three well-chosen breakpoints beat ten guessed ones.',
          },
          {
            type: 'heading',
            id: 'c-l109-h2',
            level: 3,
            body: 'Why mobile-first beats desktop-first',
          },
          {
            type: 'list',
            id: 'c-l109-l2',
            style: 'ordered',
            items: [
              'The base rules describe the simplest, narrowest case, so there is nothing to undo as the viewport grows.',
              'The enhancements cascade on top, which means the cascade does the work for you.',
              '`max-width` queries stack badly: two of them can both match at once, and you end up fighting for who wins.',
            ],
          },
          {
            type: 'exercise',
            id: 'c-l109-x1',
            exercise: {
              id: 'ex-l109',
              instructions:
                'Switch the two cards to sit side by side at wide widths. Start from a stacked base and add a `min-width` query — do not write a `max-width` query.',
              languages: ['css'],
              starterCode: {
                html: '<div class="row">\n  <div class="card">One</div>\n  <div class="card">Two</div>\n</div>',
                css:
                  '.row {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.75rem;\n}\n.card {\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n  padding: 0.75rem;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l109-t1',
                  label: 'A min-width media query is present',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return /@media\\s*\\(min-width/.test(css)',
                },
                {
                  id: 'ex-l109-t2',
                  label: 'No max-width query was used',
                  body: 'const css = [...document.styleSheets].map((s) => [...s.cssRules].map((r) => r.cssText).join(" ")).join(" "); return !/@media\\s*\\(max-width/.test(css)',
                },
                {
                  id: 'ex-l109-t3',
                  label: 'The grid template changes inside the query',
                  body: 'return [...document.styleSheets].some((s) => [...s.cssRules].some((r) => r.type === 4 && /grid-template-columns/.test(r.cssText)))',
                },
              ],
              hints: [
                'The base rule stays single-column; the query is what adds the second column.',
                'Wrap a rule in `@media (min-width: 900px) { ... }`.',
                'Inside it, set `grid-template-columns: repeat(2, 1fr);` on `.row`.',
              ],
              solution: {
                html: '<div class="row">\n  <div class="card">One</div>\n  <div class="card">Two</div>\n</div>',
                css:
                  '.row {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 0.75rem;\n}\n.card {\n  border: 1px solid #d5dae0;\n  border-radius: 8px;\n  padding: 0.75rem;\n}\n@media (min-width: 900px) {\n  .row {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n',
              },
              testNotes:
                'The tests inspect the stylesheet itself, because at the preview width the query may or may not be active.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s68',
    title: 'CSS MQ Examples',
    description: 'Three real patterns: a navigation that collapses, a card grid that reflows, and type that scales smoothly.',
    lessons: [
      {
        id: 'css-l110',
        title: 'MQ Examples',
        description: 'Media queries applied to the patterns you will build constantly.',
        duration: 7,
        objectives: [
          'Collapse a horizontal navigation into a stacked list at narrow widths',
          'Reflow a card grid with a query and with `auto-fit`',
          'Scale typography smoothly with `clamp()` instead of a stepped query',
          'Pick the right technique for a given reflow',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l110',
          title: 'MQ Examples quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l110-q1',
              type: 'multiple-choice',
              prompt: 'Which of these reflows a grid with no media query at all?',
              options: [
                '`grid-template-columns: repeat(3, 1fr)`',
                '`grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))`',
                '`grid-template-columns: 100% 100%`',
                '`display: inline-grid`',
              ],
              answer: 1,
              explanation: '`auto-fit` with `minmax()` creates as many tracks as fit and collapses the rest, so the grid adapts continuously.',
            },
            {
              id: 'quiz-css-l110-q2',
              type: 'code-output',
              prompt: 'How wide is the heading at a viewport of 400px?',
              code: 'h1 { font-size: clamp(2rem, 1rem + 4vw, 4rem); }',
              options: [
                '2rem',
                '2.64rem',
                '4rem',
                '4vw',
              ],
              answer: 1,
              explanation: 'The preferred value is 1rem + 4vw = 16px + 16px = 32px, which is 2rem. It sits between the bounds so it is used as is.',
            },
            {
              id: 'quiz-css-l110-q3',
              type: 'true-false',
              prompt: '`clamp()` can only be used for font sizes.',
              answer: false,
              explanation: 'It works on any length: `width`, `padding`, `gap` and `border-radius` all accept it. Fluid spacing is often more useful than fluid type.',
            },
            {
              id: 'quiz-css-l110-q4',
              type: 'blank',
              prompt: 'Which grid function creates as many columns as will fit, collapsing the leftovers? Give the function name only.',
              answers: [
                'auto-fit',
              ],
              explanation: '`auto-fit` collapses empty tracks so the remaining items stretch. `auto-fill` leaves the empty tracks in place instead.',
            },
            {
              id: 'quiz-css-l110-q5',
              type: 'multiple-choice',
              prompt: 'What is the strongest argument for preferring `flex-wrap` over a media query?',
              options: [
                'It produces fewer bytes',
                'Browsers render it faster',
                'It needs no width in the stylesheet, so there is no breakpoint to maintain or get wrong',
                'It works without JavaScript',
              ],
              answer: 2,
              explanation: 'A query introduces a hard-coded width that must be revisited whenever the content changes. Wrapping has no such coupling.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l110-b1',
            body: 'Most responsive work is one of three shapes: something rearranges, something wraps, or something scales. Media queries handle the first two. The third usually does not need a query at all.',
          },
          {
            type: 'demo',
            id: 'c-l110-d1',
            title: 'A card grid that reflows on its own',
            body: 'These cards have no media query at all. `repeat(auto-fit, minmax(140px, 1fr))` reflows whenever there is not enough room, at any width, with no breakpoint to maintain.',
            html: `<div class="grid">
  <div class="card">RWD Intro</div>
  <div class="card">RWD Viewport</div>
  <div class="card">RWD Grid View</div>
  <div class="card">RWD Media Queries</div>
  <div class="card">RWD Images</div>
  <div class="card">RWD Videos</div>
</div>`,
            css: `.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.5rem;
  font-size: 13px;
}
.card {
  border: 1px solid #d5dae0;
  border-radius: 6px;
  padding: 0.6rem;
  background: #f7f9fa;
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l110-b2',
            body: 'Narrow the window and the cards rewrap. Widen it and they grow. Nothing was hard-coded, and there is no width in the stylesheet at which this breaks.',
          },
          {
            type: 'heading',
            id: 'c-l110-h1',
            level: 3,
            body: 'Pattern one: a navigation that collapses',
          },
          {
            type: 'code',
            id: 'c-l110-c1',
            language: 'css',
            title: 'Row on wide screens, stacked on narrow',
            code: `/* base: narrow. Stack by default. */
.nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

@media (min-width: 48rem) {
  .nav ul {
    flex-direction: row;
    gap: 1rem;
  }
}`,
          },
          {
            type: 'text',
            id: 'c-l110-b3',
            body: 'The base rule is the narrow layout and the query only adds what wide screens need. Written the other way round — wide by default, then undoing it with `max-width` — you end up with rules that cancel rules, and every change to the narrow layout means remembering to change the wide one too.',
          },
          {
            type: 'heading',
            id: 'c-l110-h2',
            level: 3,
            body: 'Pattern two: a query-based grid',
          },
          {
            type: 'demo',
            id: 'c-l110-d2',
            title: 'The same grid, controlled by a breakpoint',
            body: 'One column below 900px, two above it. The breakpoint is deliberately above the width of this preview so the effect is visible straight away.',
            html: `<div class="grid">
  <div class="card">RWD Intro</div>
  <div class="card">RWD Viewport</div>
  <div class="card">RWD Grid View</div>
  <div class="card">RWD Media Queries</div>
</div>`,
            css: `.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  font-size: 13px;
}
.card {
  border: 1px solid #d5dae0;
  border-radius: 6px;
  padding: 0.6rem;
  background: #f7f9fa;
}
@media (min-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}`,
            height: 200,
          },
          {
            type: 'text',
            id: 'c-l110-b4',
            body: 'Compare the two demos. The first needed no breakpoint because `auto-fit` decides for itself. The second needs one because the design genuinely calls for exactly two columns above a certain size. Use `auto-fit` when the content is uniform and a query when the layout has a specific intent.',
          },
          {
            type: 'heading',
            id: 'c-l110-h3',
            level: 3,
            body: 'Pattern three: type that scales smoothly',
          },
          {
            type: 'code',
            id: 'c-l110-c2',
            language: 'css',
            title: 'clamp() replaces the stepped type scale',
            code: `h1 {
  /* min, preferred, max */
  font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
}`,
          },
          {
            type: 'tip',
            id: 'c-l110-t1',
            title: 'Why `clamp()` beats stepping type with a query',
            body: 'A stepped scale jumps size at the breakpoint, which looks like a glitch on a window drag. `clamp()` moves continuously between a floor and a ceiling, so there is nothing to step. You also drop a breakpoint you no longer need.',
          },
          {
            type: 'warning',
            id: 'c-l110-w1',
            title: 'Resist the urge to add a query for everything',
            body: 'Every breakpoint is a place future changes can conflict. If `flex-wrap`, `auto-fit` or `clamp()` gets you there, prefer them — add a query only when the layout must change shape rather than merely adapt.',
          },
          {
            type: 'exercise',
            id: 'c-l110-x1',
            exercise: {
              id: 'ex-l110',
              instructions:
                'Make the heading scale with the viewport instead of jumping size. Use `clamp()` with a 1.5rem floor and a 3rem ceiling, and leave the heading at its narrowest width below 1.5rem.',
              languages: ['css'],
              starterCode: {
                html: '<h1 class="title">Responsive type</h1>\n<p class="body">The heading below is sized with a fixed value. Replace it with a fluid one.</p>',
                css:
                  '.title {\n  font-size: 24px;\n}\n.body {\n  font-size: 15px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l110-t1',
                  label: 'The heading uses clamp()',
                  body: 'return getComputedStyle(document.querySelector(".title")).fontSize !== "24px"',
                },
                {
                  id: 'ex-l110-t2',
                  label: 'The size is at least 24px at this width',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".title")).fontSize) >= 24',
                },
                {
                  id: 'ex-l110-t3',
                  label: 'The size never exceeds 48px',
                  body: 'return parseFloat(getComputedStyle(document.querySelector(".title")).fontSize) <= 48',
                },
              ],
              hints: [
                '`clamp()` takes a minimum, a preferred value and a maximum.',
                'The preferred value needs a viewport unit to respond to width: `vw`.',
                'Try `font-size: clamp(1.5rem, 1rem + 3vw, 3rem);`',
              ],
              solution: {
                html: '<h1 class="title">Responsive type</h1>\n<p class="body">The heading below is sized with a fixed value. Replace it with a fluid one.</p>',
                css:
                  '.title {\n  font-size: clamp(1.5rem, 1rem + 3vw, 3rem);\n}\n.body {\n  font-size: 15px;\n}\n',
              },
              testNotes:
                'The second and third tests check the computed size at the preview width, which must sit between the clamp bounds.',
            },
          },
        ],
      },
    ],
  },
]