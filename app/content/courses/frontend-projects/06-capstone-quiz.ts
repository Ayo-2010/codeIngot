import type { Section } from '~/types/content'

export const frontendProjectsQuizSections: Section[] = [
  {
    id: 'fp-s8',
    title: 'Capstone: Quiz Application',
    description:
      'Questions live in data, answers lock after one choice, and the result screen explains every answer instead of only scoring it.',
    lessons: [
      {
        id: 'fp-l15',
        title: 'Plan the quiz app',
        description: 'Writing the question data first, then designing the index, the answer log and the results review.',
        duration: 6,
        objectives: [
          'Model questions as data with one answer index and one explanation',
          'Track the current question, the answers and the locked state',
          'Plan the results screen as a review of every question, not just a score',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-fp-l15',
          title: 'Plan the quiz app quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l15-q1',
              type: 'multiple-choice',
              prompt: 'Why keep the questions in a JavaScript array instead of writing each one into the HTML?',
              options: [
                'Arrays load faster than HTML',
                'One render function can show any question, and the score can read the same data',
                'HTML cannot contain questions',
                'It makes the answer key secret',
              ],
              answer: 1,
              explanation: 'The array is the single source of truth. The question screen, progress, score and review all derive from it.',
            },
            {
              id: 'quiz-fp-l15-q2',
              type: 'multiple-choice',
              prompt: 'With 4 correct answers out of 5 questions, what percentage should be shown?',
              options: [
                '40%',
                '75%',
                '80%',
                '90%',
              ],
              answer: 2,
              explanation: '4 / 5 = 0.8, which is 80% when multiplied by 100 and rounded.',
            },
            {
              id: 'quiz-fp-l15-q3',
              type: 'identify-error',
              prompt: 'Why is this restart incomplete?',
              code: 'function restart() {\n  index = 0;\n  resultsEl.hidden = true;\n  questionArea.hidden = false;\n  renderQuestion();\n}',
              options: [
                'It forgets to reset answers and locked',
                'It renders the first question twice',
                'It should reload the page',
                'It needs a new question array',
              ],
              answer: 0,
              explanation: 'The previous answers are still in the array, so the next attempt starts with the old score. Reset answers and locked as well.',
            },
            {
              id: 'quiz-fp-l15-q4',
              type: 'multiple-choice',
              prompt: 'Why store `answer` as an index into `options` instead of a copy of the correct string?',
              options: [
                'Strings cannot be stored in JSON',
                'It makes the answer key shorter to type',
                'It prevents the browser from reading the answer key',
                'One number can be compared during render and used to highlight the right option in the review',
              ],
              answer: 3,
              explanation: 'The renderer compares the chosen index with the correct index, and the review can mark exactly that option. Duplicated strings would need a second lookup and could drift out of sync with the options.',
            },
            {
              id: 'quiz-fp-l15-q5',
              type: 'multiple-choice',
              prompt: 'A quiz runs entirely in the browser. What does the lesson say about keeping the answer key secret?',
              options: [
                'Anyone can read the data array in DevTools, so a score that matters must be calculated on a server',
                'Minifying the JavaScript makes the key unreadable',
                'ARIA attributes hide the answers from visitors',
                'The browser encrypts the array automatically',
              ],
              answer: 0,
              explanation: 'Every file the browser receives is readable, including the questions and their answer indices. For a learning quiz that is acceptable, but a real assessment has to score on a server the learner cannot inspect.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l15-intro',
            body: '**A quiz is a data problem wearing a UI.** If the questions are written into the markup, every new question is a copy-paste job and every score calculation has to know about the page. If the questions are an array, the interface is one render function and the score is one filter.',
          },
          {
            type: 'text',
            id: 'fp-l15-b2',
            body: 'The workspace gives you one example question, the question area, a progress line and a hidden results screen. The build is to add at least four more questions, render one at a time, lock each answer and finish with a review.',
          },
          {
            type: 'heading',
            id: 'fp-l15-h1',
            level: 3,
            body: 'The question shape',
          },
          {
            type: 'code',
            id: 'fp-l15-code1',
            language: 'javascript',
            title: 'One question, four fields',
            code: `{
  prompt: 'Which method returns a new array of the items that pass a test?',
  options: ['map', 'filter', 'reduce', 'forEach'],
  answer: 1,
  explanation:
    'filter keeps the items for which the callback returned true, in a new array.',
}`,
          },
          {
            type: 'text',
            id: 'fp-l15-b3',
            body: '`answer` is an index into `options`, not a copy of the correct string. That gives the renderer one comparison to make and the review one option to highlight. The explanation is not decoration: it is what turns a wrong answer into a lesson, and the results screen shows it for every question.',
          },
          {
            type: 'heading',
            id: 'fp-l15-h2',
            level: 3,
            body: 'The state',
          },
          {
            type: 'code',
            id: 'fp-l15-code2',
            language: 'javascript',
            title: 'Three variables and an answer log',
            code: `let index = 0;
let answers = [];
let locked = false;

// answers[0] might look like { choice: 2, correct: false }`,
          },
          {
            type: 'text',
            id: 'fp-l15-b4',
            body: '`index` says which question is on screen. `answers` records what was chosen and whether it was right, so the review can rebuild the whole attempt. `locked` stops a second click on the same question from overwriting the first answer.',
          },
          {
            type: 'heading',
            id: 'fp-l15-h3',
            level: 3,
            body: 'The flow',
          },
          {
            type: 'list',
            id: 'fp-l15-list1',
            style: 'ordered',
            items: [
              'Render the question at `index`, its options and the progress text.',
              'On an option click, record the answer, lock the options, mark the correct and chosen options, and show the explanation.',
              'On next, increment `index` and render the next question; on the last one, show the results screen.',
              'On the results screen, calculate the score and percentage, and list every question with its explanation.',
              'On restart, reset `index`, `answers` and `locked`, hide the results and render question one.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l15-warn',
            title: 'Answers in the browser are visible',
            body: 'A quiz that runs entirely in the browser cannot keep its answer key secret. Anyone can open the data array in DevTools. That is fine for a learning quiz, where the point is feedback rather than cheating. If the score ever matters, it has to be calculated on a server that the learner cannot read.',
          },
          {
            type: 'tip',
            id: 'fp-l15-tip',
            title: 'Write the questions before the UI',
            body: 'Five good questions with explanations are harder to write than the render function. Draft them first, check that exactly one option is correct, and only then build the screen. A quiz with a strong data set survives a redesign; a beautiful screen with vague questions does not.',
          },
          {
            type: 'heading',
            id: 'fp-l15-h4',
            level: 3,
            body: 'Your checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l15-b5',
            body: 'Open the workspace and read the eight checks. Add at least five questions to the data array, then write `renderQuestion`, `answer`, `next` and `showResults` as empty functions. The next lesson fills them in and adds the restart reset.',
          },
          {
            type: 'project',
            id: 'fp-l15-project',
            projectSlug: 'quiz-application',
            title: 'Start the quiz app',
            body: 'The starter has one question, the progress line and a hidden results section. Expand the data first; every other feature is a view of that array.',
          },
        ],
      },
      {
        id: 'fp-l16',
        title: 'Build and submit the quiz app',
        description: 'Rendering one question at a time, locking answers, and making restart clear every trace of the last attempt.',
        duration: 8,
        objectives: [
          'Render options from the question data with one click handler per option',
          'Lock a question after it is answered and show the explanation',
          'Build the results review and a restart that resets state and DOM together',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-fp-l16',
          title: 'Build and submit the quiz app quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l16-q1',
              type: 'true-false',
              prompt: 'Options should stay clickable after a question has been answered.',
              answer: false,
              explanation: 'The options should be disabled after the first answer, so one question cannot be answered twice and the recorded score cannot change.',
            },
            {
              id: 'quiz-fp-l16-q2',
              type: 'multiple-choice',
              prompt: 'What belongs on the results screen besides the score?',
              options: [
                'Only the score',
                'A per-question review with the explanation',
                'The source code of the quiz',
                'A second copy of every option',
              ],
              answer: 1,
              explanation: 'The review is what makes the result useful. Each question should show whether it was right and explain the answer.',
            },
            {
              id: 'quiz-fp-l16-q3',
              type: 'multiple-choice',
              prompt: 'Why call `optionsEl.replaceChildren()` at the start of renderQuestion()?',
              options: [
                'It removes the click listeners from the page',
                'It clears the previous options so question two does not render below question one',
                'It resets the score to zero',
                'It re-enables the disabled buttons from the last question',
              ],
              answer: 1,
              explanation: 'Appending without clearing would stack every set of options inside the same container. replaceChildren empties the container so each question is rendered from a clean slate.',
            },
            {
              id: 'quiz-fp-l16-q4',
              type: 'multiple-choice',
              prompt: 'What does `tabindex="-1"` on the question heading allow?',
              options: [
                'It makes the heading programmatically focusable without adding a tab stop',
                'It adds the heading to the normal tab order',
                'It hides the heading from screen readers',
                'It makes the heading editable by the learner',
              ],
              answer: 0,
              explanation: 'A negative tabindex keeps an element out of the Tab sequence while still allowing focus() to move there. That lets the script announce the new question without making the heading a stop the learner must tab past.',
            },
            {
              id: 'quiz-fp-l16-q5',
              type: 'multiple-choice',
              prompt: 'The progress bar width is `((index + 1) / questions.length) * 100`. On the third of five questions, what width is set?',
              options: [
                '30%',
                '50%',
                '60%',
                '75%',
              ],
              answer: 2,
              explanation: 'Three of five questions are now in view, so 3 / 5 × 100 = 60%. Using the same index as the progress text is what keeps the bar and the words from disagreeing.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l16-intro',
            body: '**One question on screen, one answer recorded, one explanation shown.** The quiz does not need a router or a framework. It needs a render function that reads `index`, an answer handler that writes to `answers`, and a results function that reads the whole log.',
          },
          {
            type: 'heading',
            id: 'fp-l16-h1',
            level: 3,
            body: 'Milestone 1: render the current question',
          },
          {
            type: 'code',
            id: 'fp-l16-code-refs',
            language: 'javascript',
            title: 'The elements the render needs',
            code: `const questionArea = document.querySelector('.question-area');
const resultsEl = document.querySelector('.results');
const resultsTitleEl = document.querySelector('.results-title');
const resultsScoreEl = document.querySelector('.results-score');
const reviewEl = document.querySelector('.review');
const nextButton = document.querySelector('.next');
const barFill = document.querySelector('.bar-fill');`,
          },
          {
            type: 'code',
            id: 'fp-l16-code1',
            language: 'javascript',
            title: 'Rebuild the options from the data',
            code: `function renderQuestion() {
  const question = questions[index];
  locked = false;

  questionTextEl.textContent = question.prompt;
  progressEl.textContent = \`Question \${index + 1} of \${questions.length}\`;
  feedbackEl.textContent = '';
  optionsEl.replaceChildren();

  question.options.forEach((option, optionIndex) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option';
    button.textContent = option;
    button.addEventListener('click', () => answer(optionIndex));
    optionsEl.append(button);
  });

  barFill.style.width = \`\${((index + 1) / questions.length) * 100}%\`;
  questionTextEl.focus();
}`,
          },
          {
            type: 'text',
            id: 'fp-l16-b2',
            body: '`replaceChildren()` clears the previous question before the new options are appended; without it, question two would render below question one. `textContent` keeps the question and options as text. The progress text and the bar both come from the same `index`, so they cannot disagree.',
          },
          {
            type: 'code',
            id: 'fp-l16-code1b',
            language: 'html',
            title: 'The two controls the script expects',
            code: `<section class="question-area">
  <h2 class="question-text" tabindex="-1">Loading question…</h2>
  <div class="options"></div>
  <p class="feedback" role="status"></p>
  <button class="next" type="button" hidden>Next question</button>
</section>

<section class="results" hidden>
  <h2 class="results-title" tabindex="-1">Results</h2>
  <p class="results-score"></p>
  <ol class="review"></ol>
  <button class="restart" type="button">Try again</button>
</section>`,
          },
          {
            type: 'text',
            id: 'fp-l16-b2b',
            body: 'The `tabindex="-1"` does not put the heading in the tab order; it only makes it programmatically focusable. That is exactly what you want when `questionTextEl.focus()` or `resultsTitleEl.focus()` moves the reader to the new state without adding a stop the learner has to tab through later.',
          },
          {
            type: 'heading',
            id: 'fp-l16-h2',
            level: 3,
            body: 'Milestone 2: lock the answer',
          },
          {
            type: 'code',
            id: 'fp-l16-code2',
            language: 'javascript',
            title: 'Record once, then explain',
            code: `function answer(choice) {
  if (locked) return;
  locked = true;

  const question = questions[index];
  const correct = choice === question.answer;
  answers[index] = { choice, correct };

  optionsEl.querySelectorAll('button').forEach((button, optionIndex) => {
    button.disabled = true;
    if (optionIndex === question.answer) button.classList.add('correct');
    if (optionIndex === choice && !correct) button.classList.add('wrong');
  });

  feedbackEl.textContent = correct
    ? \`Correct. \${question.explanation}\`
    : \`Not quite. \${question.explanation}\`;

  nextButton.hidden = false;
}`,
          },
          {
            type: 'text',
            id: 'fp-l16-b3',
            body: 'The `locked` guard is what makes one question count once. The disabled buttons also remove them from the tab order after answering, so a keyboard user cannot accidentally answer again. The correct option is marked whether or not the learner chose it; the wrong class only appears on the chosen wrong option.',
          },
          {
            type: 'code',
            id: 'fp-l16-code2b',
            language: 'css',
            title: 'Two states, one progress bar',
            code: `.option.correct {
  border-color: #15803d;
  background: #f0fdf4;
}

.option.wrong {
  border-color: #b91c1c;
  background: #fef2f2;
}

.bar-fill {
  transition: width 180ms ease;
}`,
          },
          {
            type: 'text',
            id: 'fp-l16-b3b',
            body: 'The colours are paired with the words "Correct" and "Not quite" in the feedback region, so the result does not depend on colour alone. The transition is short enough to read as a change rather than an animation, and it is the only motion in the quiz.',
          },
          {
            type: 'heading',
            id: 'fp-l16-h3',
            level: 3,
            body: 'Milestone 3: advance and finish',
          },
          {
            type: 'code',
            id: 'fp-l16-code3',
            language: 'javascript',
            title: 'The same function handles next and finish',
            code: `nextButton.addEventListener('click', () => {
  if (index < questions.length - 1) {
    index += 1;
    renderQuestion();
    return;
  }
  showResults();
});`,
          },
          {
            type: 'text',
            id: 'fp-l16-b4',
            body: 'On the last question, the same button finishes the quiz. The results screen hides the question area, shows the results section, and moves focus to its heading so a screen reader announces the new state instead of leaving focus on a button that no longer exists.',
          },
          {
            type: 'heading',
            id: 'fp-l16-h4',
            level: 3,
            body: 'Milestone 4: score, review and restart',
          },
          {
            type: 'code',
            id: 'fp-l16-code4',
            language: 'javascript',
            title: 'A review that teaches',
            code: `function showResults() {
  const score = answers.filter((answer) => answer?.correct).length;
  const percent = Math.round((score / questions.length) * 100);

  questionArea.hidden = true;
  resultsEl.hidden = false;
  resultsTitleEl.focus();

  resultsScoreEl.textContent = \`\${score} / \${questions.length} (\${percent}%)\`;
  reviewEl.replaceChildren();

  questions.forEach((question, questionIndex) => {
    const item = document.createElement('li');
    const result = answers[questionIndex];
    item.textContent = \`\${result?.correct ? '✓' : '✗'} \${question.prompt} \${question.explanation}\`;
    reviewEl.append(item);
  });
}

function restart() {
  index = 0;
  answers = [];
  locked = false;
  resultsEl.hidden = true;
  questionArea.hidden = false;
  renderQuestion();
}`,
          },
          {
            type: 'text',
            id: 'fp-l16-b5',
            body: 'Every piece of state that a finished attempt leaves behind has to be reset. `index` returns to zero, `answers` becomes a new empty array, and `locked` returns to false. The DOM follows from `renderQuestion()`, so there is no stale option or old score left to clear by hand.',
          },
          {
            type: 'warning',
            id: 'fp-l16-warn',
            title: 'Restart is a state reset, not a page reload',
            body: 'A restart that only hides the results and renders question one leaves the old `answers` in place. The second attempt then starts with the first attempt\'s score, and the review mixes both. Reset every variable before rendering, or reload the page deliberately — but do not half-reset.',
          },
          {
            type: 'tip',
            id: 'fp-l16-tip',
            title: 'Test the two ends of the score',
            body: 'Take the quiz answering everything correctly, then restart and answer everything wrong. The two results should be 100% and 0%, and every review line should explain the answer. If both ends are right, the middle is almost certainly right too.',
          },
          {
            type: 'heading',
            id: 'fp-l16-h5',
            level: 3,
            body: 'Submit this build',
          },
          {
            type: 'text',
            id: 'fp-l16-b6',
            body: 'Open the workspace and work through the milestones. The automated checks look for the live region, options created from the array, the listener, the correct styling, the progress text, the transition, the disabled state and the restart. The manual check is the full run from the first question to the review.',
          },
          {
            type: 'project',
            id: 'fp-l16-project',
            projectSlug: 'quiz-application',
            title: 'Submit the quiz app',
            body: 'Run the quiz all-correct, restart, run it all-wrong, then restart again. Submit when the score, the percentage and every explanation match the attempt.',
          },
        ],
      },
    ],
  },
]
