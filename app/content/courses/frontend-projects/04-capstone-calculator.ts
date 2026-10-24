import type { Section } from '~/types/content'

export const frontendProjectsCalculatorSections: Section[] = [
  {
    id: 'fp-s6',
    title: 'Capstone: Interactive Calculator',
    description:
      'A keypad, a display and three pieces of state. The arithmetic is easy; routing every press and handling the edge cases is the build.',
    lessons: [
      {
        id: 'fp-l11',
        title: 'Plan the calculator',
        description: 'Choosing the state, designing one action for the whole keypad, and listing the edge cases before writing code.',
        duration: 6,
        objectives: [
          'Identify the three pieces of state a calculator needs',
          'Route every key through one click handler using data attributes',
          'Write down the operator, decimal and clear edge cases as behaviour',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-fp-l11',
          title: 'Plan the calculator quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l11-q1',
              type: 'multiple-choice',
              prompt: 'Where should the calculator keep the number being typed?',
              options: [
                'Only in the display text, read back on every press',
                'In a JavaScript variable, with the display rendered from it',
                'In a cookie',
                'In a CSS custom property',
              ],
              answer: 1,
              explanation: 'The variables are the source of truth. Reading the display back breaks as soon as it contains an operator, a trailing decimal or an error message.',
            },
            {
              id: 'quiz-fp-l11-q2',
              type: 'multiple-choice',
              prompt: 'Why give every key a data-action attribute?',
              options: [
                'So CSS can style the keypad',
                'So one delegated click handler can route every press',
                'So the browser computes the result automatically',
                'So the keypad works without JavaScript',
              ],
              answer: 1,
              explanation: 'The handler reads the action and value from the clicked button, so the whole keypad needs one listener instead of one per key.',
            },
            {
              id: 'quiz-fp-l11-q3',
              type: 'true-false',
              prompt: 'A decimal point can appear more than once in the same number.',
              answer: false,
              explanation: 'The decimal handler should ignore the press when current already contains a dot, so typing 1.2.3 stays a valid number.',
            },
            {
              id: 'quiz-fp-l11-q4',
              type: 'multiple-choice',
              prompt: 'Why keep `current` as text rather than converting it to a number immediately?',
              options: [
                'Text values are faster to append to',
                'A trailing decimal point has to survive until the next digit arrives',
                'Numbers cannot be written into an output element',
                'It removes the need for Number() anywhere in the app',
              ],
              answer: 1,
              explanation: 'If "1." became the number 1 the decimal would vanish, and typing 2 would produce 12 instead of 1.2. Keeping the display value as text lets the input buffer stay exactly what the person pressed.',
            },
            {
              id: 'quiz-fp-l11-q5',
              type: 'multiple-choice',
              prompt: 'Which element should show the calculator result while announcing changes politely?',
              options: [
                'A div with a class of display',
                'A paragraph with role="alert"',
                'An input with the readonly attribute',
                'An output element carrying aria-live="polite"',
              ],
              answer: 3,
              explanation: 'output is the element for a calculated result, and aria-live="polite" announces updates when the user pauses. An alert role would interrupt on every key press, which is far too noisy.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l11-intro',
            body: '**The arithmetic is the easy part.** A calculator is a small state machine: a display, the number being typed, the number committed before an operator, and which operator is pending. Almost every bug comes from letting those four things fall out of sync.',
          },
          {
            type: 'text',
            id: 'fp-l11-b2',
            body: 'The workspace starts with a display and an empty keypad. You decide where the state lives, which buttons exist, and how a press reaches the logic. The checklist does not ask for a clever calculator; it asks for one that survives a second operator, a second decimal point and a clear in the middle of a calculation.',
          },
          {
            type: 'heading',
            id: 'fp-l11-h1',
            level: 3,
            body: 'The inventory',
          },
          {
            type: 'list',
            id: 'fp-l11-list1',
            style: 'bullet',
            items: [
              '**Display** — a real `<output>` element showing the current value, marked `aria-live="polite"`.',
              '**Digits** — ten buttons from 0 to 9, each with an action and a value.',
              '**Decimal point** — one button, allowed at most once per number.',
              '**Operators** — add, subtract, multiply and divide, each with a pending state.',
              '**Equals** — evaluates the pending operation and shows the result.',
              '**Clear and delete** — one resets everything, one removes the last digit.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l11-h2',
            level: 3,
            body: 'The state model',
          },
          {
            type: 'text',
            id: 'fp-l11-b3',
            body: 'Keep `current` as text, because the display is text and because a trailing decimal point has to survive until the next digit arrives. Keep `previous` as a number and `operator` as one of four strings. `waitingForOperand` is the small flag that makes a second operator press replace the first instead of computing twice.',
          },
          {
            type: 'code',
            id: 'fp-l11-code1',
            language: 'javascript',
            title: 'Four variables, one display',
            code: `let current = '0';          // the number being typed, as text
let previous = null;       // the number committed before an operator
let operator = null;       // '+', '-', '*' or '/'
let waitingForOperand = false;`,
          },
          {
            type: 'heading',
            id: 'fp-l11-h3',
            level: 3,
            body: 'The behaviour, written before the code',
          },
          {
            type: 'list',
            id: 'fp-l11-list2',
            style: 'ordered',
            items: [
              'A digit appends to `current` — unless the last press was an operator, in which case it starts a new number.',
              'A decimal point is ignored when `current` already contains one.',
              'An operator commits the current number, then waits for the next one.',
              'A second operator pressed while waiting replaces the first; it does not compute.',
              'Equals computes once, shows the result and clears the pending operator.',
              'Clear resets every variable and puts the display back to `0`.',
              'Delete removes the last character of `current` and never goes below `0`.',
            ],
          },
          {
            type: 'text',
            id: 'fp-l11-b4',
            body: 'That list is the specification. If you can read a press of "5 + * 4 =" and say which branch it takes, you are ready to write the handler. The result should be 20: the `*` replaces the `+`, then `4` becomes the second operand.',
          },
          {
            type: 'warning',
            id: 'fp-l11-warn',
            title: 'Do not use eval',
            body: '`eval(display.textContent)` looks like a shortcut and is a bug waiting to happen: it executes whatever string is on screen, it turns a typo into code, and it cannot handle the "5 + *" case without producing a syntax error. Write one small `compute(a, b, operator)` function and call it deliberately.',
          },
          {
            type: 'tip',
            id: 'fp-l11-tip',
            title: 'Write the edge cases as test presses',
            body: 'Before coding, write five sequences on paper: `5 + * 4 =`, `1 . 2 . 3`, `8 / 0 =`, `AC` mid-calculation, and `7 + 3 =` followed by `4`. Each one corresponds to a branch in the handler. Testing them takes a minute and catches the bugs the checklist cannot see.',
          },
          {
            type: 'heading',
            id: 'fp-l11-h4',
            level: 3,
            body: 'Your checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l11-b5',
            body: 'Open the workspace and read the eight checks. Build the keypad markup with an action on every button, then write the state variables and the handler. The next lesson fills in the computation and the edge cases.',
          },
          {
            type: 'project',
            id: 'fp-l11-project',
            projectSlug: 'interactive-calculator',
            title: 'Start the calculator',
            body: 'The starter has the display and the empty keypad. Add the buttons and the state first; the automated checks look for the structure, and the manual checks look for the edge cases.',
          },
        ],
      },
      {
        id: 'fp-l12',
        title: 'Build and submit the calculator',
        description: 'Writing one keypad handler, one compute function, and the guards that make repeated operators and decimals behave.',
        duration: 8,
        objectives: [
          'Handle every keypad press through one delegated click listener',
          'Compute with an explicit function rather than eval',
          'Guard division by zero, repeated operators and repeated decimals',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-fp-l12',
          title: 'Build and submit the calculator quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l12-q1',
              type: 'multiple-choice',
              prompt: 'What should pressing 5, +, ×, 4, = produce?',
              options: [
                'Two operators in a row',
                '20, because × replaces +',
                '0, because the first operator wins',
                'A syntax error',
              ],
              answer: 1,
              explanation: 'A second operator pressed while waiting for the next number replaces the pending operator. The calculation becomes 5 × 4.',
            },
            {
              id: 'quiz-fp-l12-q2',
              type: 'identify-error',
              prompt: 'Why is this a poor way to evaluate the expression?',
              code: 'const result = eval(display.textContent);',
              options: [
                'eval is slower than a button',
                'It executes arbitrary text and cannot handle repeated operators safely',
                'display.textContent is always a number',
                'It needs a semicolon',
              ],
              answer: 1,
              explanation: 'eval runs whatever string is on screen and turns malformed input into a syntax error. A compute function with explicit branches is safer and easier to test.',
            },
            {
              id: 'quiz-fp-l12-q3',
              type: 'multiple-choice',
              prompt: 'Why does the keypad listener use `event.target.closest("button[data-action]")`?',
              options: [
                'A click can land on a child of the button, and closest climbs to the button itself',
                'It finds the first button anywhere on the page',
                'It prevents the default form submission',
                'It sorts the keypad buttons into order',
              ],
              answer: 0,
              explanation: 'Buttons often contain a span or an icon, so event.target may be that child rather than the button. closest walks up to the nearest matching ancestor, keeping one delegated listener reliable.',
            },
            {
              id: 'quiz-fp-l12-q4',
              type: 'multiple-choice',
              prompt: 'Why does format() pass results through `Number(value.toFixed(10))`?',
              options: [
                'To convert the result into a string',
                'To round every result to exactly ten decimal places for display',
                'To trim floating-point noise such as 0.30000000000000004 down to 0.3',
                'To catch division by zero before it happens',
              ],
              answer: 2,
              explanation: 'Binary floating point leaves tiny leftovers after some sums, and limiting the decimals removes them. Wrapping the fixed string in Number strips the trailing zeros as well, so the display stays clean.',
            },
            {
              id: 'quiz-fp-l12-q5',
              type: 'multiple-choice',
              prompt: 'Why is every keypad button given `type="button"`?',
              options: [
                'So pressing it cannot submit a surrounding form',
                'So it receives a focus ring automatically',
                'So it can be styled like a button',
                'So the browser treats it as the equals key',
              ],
              answer: 0,
              explanation: 'A button inside a form defaults to type="submit", so a stray key press could send the form. Declaring type="button" makes each key purely a control the click handler reacts to.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l12-intro',
            body: '**One listener, one switch, one compute function.** The keypad is a grid of buttons, but the behaviour is a small set of actions. Keep the markup declarative and let the handler decide what each action means.',
          },
          {
            type: 'heading',
            id: 'fp-l12-h1',
            level: 3,
            body: 'Milestone 1: a keypad made of real buttons',
          },
          {
            type: 'code',
            id: 'fp-l12-code1',
            language: 'html',
            title: 'One action and one value per key',
            code: `<output id="display" class="display" aria-live="polite">0</output>

<div class="keypad">
  <button type="button" data-action="clear">AC</button>
  <button type="button" data-action="delete">DEL</button>

  <button type="button" data-action="digit" data-value="7">7</button>
  <button type="button" data-action="digit" data-value="8">8</button>
  <button type="button" data-action="digit" data-value="9">9</button>
  <button type="button" data-action="operator" data-value="/">&divide;</button>

  <button type="button" data-action="equals">=</button>
</div>`,
          },
          {
            type: 'text',
            id: 'fp-l12-b2',
            body: 'Every button is `type="button"`, so none of them can submit a form by accident. The visible label can be `÷` or `×`; the value in `data-value` is the character the computation uses. The display is an `<output>`, which is the element for a calculated result, and `aria-live="polite"` tells a screen reader when it changes.',
          },
          {
            type: 'code',
            id: 'fp-l12-code-css',
            language: 'css',
            title: 'A readable display and a keypad that does not reflow',
            code: `.display {
  display: block;
  padding: 1rem;
  font-size: 2rem;
  text-align: right;
  overflow-x: auto;
}

.keypad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}`,
          },
          {
            type: 'text',
            id: 'fp-l12-b2b',
            body: '`text-align: right` matches every calculator people already know, and `overflow-x: auto` keeps a long result readable instead of letting it push the keypad wider than the page. The four-column grid is what makes the keypad look like a keypad at any width.',
          },
          {
            type: 'heading',
            id: 'fp-l12-h2',
            level: 3,
            body: 'Milestone 2: one handler for the whole keypad',
          },
          {
            type: 'code',
            id: 'fp-l12-code2',
            language: 'javascript',
            title: 'Delegation keeps the listener count at one',
            code: `keypad.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const { action, value } = button.dataset;

  if (action === 'digit') inputDigit(value);
  else if (action === 'decimal') inputDecimal();
  else if (action === 'operator') chooseOperator(value);
  else if (action === 'equals') evaluate();
  else if (action === 'clear') clear();
  else if (action === 'delete') backspace();
});`,
          },
          {
            type: 'text',
            id: 'fp-l12-b3',
            body: '`closest()` matters: the click may land on a child of the button, and `event.target` would then be that child. Closest climbs to the nearest matching button, so the handler still works when the button contains an icon or a span.',
          },
          {
            type: 'heading',
            id: 'fp-l12-h3',
            level: 3,
            body: 'Milestone 3: compute once',
          },
          {
            type: 'code',
            id: 'fp-l12-code3',
            language: 'javascript',
            title: 'A single compute function',
            code: `function compute(a, b, operator) {
  if (operator === '+') return a + b;
  if (operator === '-') return a - b;
  if (operator === '*') return a * b;
  if (operator === '/') return b === 0 ? null : a / b;
  return b;
}

function format(value) {
  if (!Number.isFinite(value)) return 'Error';
  return String(Number(value.toFixed(10)));
}`,
          },
          {
            type: 'text',
            id: 'fp-l12-b4',
            body: 'Returning `null` for division by zero gives the caller one clear failure value. `format()` trims floating-point noise such as `0.30000000000000004` to `0.3` and refuses `Infinity` or `NaN`, so the display never shows a value the next press cannot parse.',
          },
          {
            type: 'heading',
            id: 'fp-l12-h4',
            level: 3,
            body: 'Milestone 4: the edge cases',
          },
          {
            type: 'list',
            id: 'fp-l12-list1',
            style: 'ordered',
            items: [
              'After an operator, a digit starts a new `current` instead of appending to the old one.',
              'A decimal is ignored if `current` already has one.',
              'Pressing an operator while waiting replaces the operator and does not compute.',
              'Pressing equals with no pending operator does nothing.',
              'Dividing by zero shows `Error`, then the next digit starts a fresh calculation.',
              'Clear resets `current`, `previous`, `operator` and `waitingForOperand` together.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l12-warn',
            title: 'The display is not the state',
            body: 'Reading `Number(display.textContent)` after every press seems simpler, until the display contains an operator, a trailing decimal or `Error`. The variables are the source of truth; the display is only what `render()` writes from them. That separation is what makes clear, delete and equals predictable.',
          },
          {
            type: 'tip',
            id: 'fp-l12-tip',
            title: 'Test with the keyboard, not only the mouse',
            body: 'Tab to each button and press Enter. The output should update and the focus ring should stay visible. Because every key is a real `<button>`, this works without any extra code — as long as you did not replace the buttons with clickable divs.',
          },
          {
            type: 'heading',
            id: 'fp-l12-h5',
            level: 3,
            body: 'Submit this build',
          },
          {
            type: 'text',
            id: 'fp-l12-b5',
            body: 'Open the workspace and work through the milestones. The automated checks look for the display, the buttons, one listener, the grid and the dataset read. The manual checks are the real test: repeated operators, a second decimal, division by zero and a clear mid-calculation.',
          },
          {
            type: 'project',
            id: 'fp-l12-project',
            projectSlug: 'interactive-calculator',
            title: 'Submit the calculator',
            body: 'Run the five sequences from the planning lesson, then the automated checklist. Submit when every sequence behaves the same way twice in a row.',
          },
        ],
      },
    ],
  },
]
