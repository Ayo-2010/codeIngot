import type { Section } from '~/types/content'

export const frontendProjectsTodoSections: Section[] = [
  {
    id: 'fp-s7',
    title: 'Capstone: Todo Application',
    description:
      'A task list that survives a reload: one array of state, one render function, three filters and a storage layer that fails safely.',
    lessons: [
      {
        id: 'fp-l13',
        title: 'Plan the todo app',
        description: 'Designing the task shape, choosing a storage key, and deciding what the render function is allowed to do.',
        duration: 6,
        objectives: [
          'Model a task as data with a stable id and a done flag',
          'Choose one storage key and one update path for every mutation',
          'Derive the visible list and remaining count from state',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'fp-l13-intro',
            body: '**The buttons are not the app.** The app is an array of tasks, a filter and a storage key. Every click changes the array, saves it, and renders the screen from the result. Once that loop is in place, add, complete, delete and filter are small variations on the same operation.',
          },
          {
            type: 'text',
            id: 'fp-l13-b2',
            body: 'The workspace gives you the form, the filter buttons, the list and the empty-state paragraph. What it does not give you is the data layer. That is the build: a task shape, a safe load, a save, a render and an update function.',
          },
          {
            type: 'heading',
            id: 'fp-l13-h1',
            level: 3,
            body: 'The inventory',
          },
          {
            type: 'list',
            id: 'fp-l13-list1',
            style: 'bullet',
            items: [
              '**Add form** — a labelled text input and a submit button.',
              '**Filters** — all, active and completed, with the current one marked for assistive technology.',
              '**List** — one row per visible task, with a toggle, the title and a delete control.',
              '**Count** — how many tasks are still active, derived from the full array.',
              '**Empty state** — a message when the current filter has nothing to show.',
              '**Storage** — one JSON value under one well-named key.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l13-h2',
            level: 3,
            body: 'The shape of a task',
          },
          {
            type: 'code',
            id: 'fp-l13-code1',
            language: 'javascript',
            title: 'One task, three fields',
            code: `{
  id: '8f14e45f-ceea-4b1d-9c3a-2f4ad1c6b2a0',
  title: 'Review the calculator',
  done: false,
}`,
          },
          {
            type: 'text',
            id: 'fp-l13-b3',
            body: 'The id is what the toggle and delete handlers use to find the task. It must be stable for the life of the task. The done flag is the only mutable state; the title is fixed once the task is created, unless you deliberately add an edit feature later.',
          },
          {
            type: 'code',
            id: 'fp-l13-code2',
            language: 'javascript',
            title: 'Three variables at module scope',
            code: `const STORAGE_KEY = 'codeingot.todos';

let tasks = load();
let filter = 'all';`,
          },
          {
            type: 'heading',
            id: 'fp-l13-h3',
            level: 3,
            body: 'The data flow',
          },
          {
            type: 'list',
            id: 'fp-l13-list2',
            style: 'ordered',
            items: [
              'On load, read the storage key and parse it. If anything fails, start with an empty array.',
              'Render the list from `tasks` and the current `filter`; never patch rows by hand.',
              'On add, prepend a new task with a fresh id, save, then render.',
              'On toggle or delete, update the matching task by id, save, then render.',
              'On filter change, set `filter`, update `aria-pressed`, then render.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l13-warn',
            title: 'Do not use the array index as an id',
            body: 'The index changes when the list is filtered or reordered, so a row can end up toggling a different task than the one that was clicked. Give every task its own id when it is created, and store that id in the row (`data-id`) rather than the position in the array.',
          },
          {
            type: 'tip',
            id: 'fp-l13-tip',
            title: 'Break the stored value on purpose',
            body: 'After the app works, set `localStorage.setItem("codeingot.todos", "{oops")` and reload. The app should start empty, not throw. That one test covers the corrupt-value manual check and is the difference between a demo and something a person can actually use.',
          },
          {
            type: 'heading',
            id: 'fp-l13-h4',
            level: 3,
            body: 'Your checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l13-b4',
            body: 'Open the workspace and read the eight checks. Write the task shape, the storage key and the empty functions first: `load`, `save`, `visibleTasks`, `render` and `update`. The next lesson fills them in and wires the form and filters.',
          },
          {
            type: 'project',
            id: 'fp-l13-project',
            projectSlug: 'todo-application',
            title: 'Start the todo app',
            body: 'The starter has the form, filters and list markup. Add the data layer before the event handlers; every handler depends on the same array and the same render function.',
          },
        ],
      },
      {
        id: 'fp-l14',
        title: 'Build and submit the todo app',
        description: 'Saving safely, rendering from state, wiring filters and proving a reload restores the list.',
        duration: 8,
        objectives: [
          'Load and save a task array without letting corrupt storage break the app',
          'Render list rows from state with elements created in JavaScript',
          'Wire add, toggle, delete and filter through one update path',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'fp-l14-intro',
            body: '**Render is a function of state.** If a row appears, disappears or changes colour, it is because `tasks` or `filter` changed and `render()` ran. There is no third place where the list can be edited.',
          },
          {
            type: 'heading',
            id: 'fp-l14-h1',
            level: 3,
            body: 'Milestone 1: load and save safely',
          },
          {
            type: 'code',
            id: 'fp-l14-code1',
            language: 'javascript',
            title: 'A load that cannot throw',
            code: `function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}`,
          },
          {
            type: 'text',
            id: 'fp-l14-b2',
            body: '`JSON.parse` throws on malformed text, and a stored value could be valid JSON that is not an array. The `try`/`catch` handles the first; `Array.isArray` handles the second. Starting from `[]` is always better than showing a blank page because one key was corrupted.',
          },
          {
            type: 'heading',
            id: 'fp-l14-h2',
            level: 3,
            body: 'Milestone 2: render rows from state',
          },
          {
            type: 'code',
            id: 'fp-l14-code2',
            language: 'javascript',
            title: 'Elements created from data, not from HTML strings',
            code: `function render() {
  const shown = visibleTasks();
  list.replaceChildren();

  for (const task of shown) {
    const item = document.createElement('li');
    item.className = task.done ? 'todo-item is-done' : 'todo-item';

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.dataset.id = task.id;
    toggle.setAttribute('aria-pressed', String(task.done));
    toggle.textContent = task.done ? '✓' : '○';

    const label = document.createElement('span');
    label.className = 'todo-text';
    label.textContent = task.title;

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.dataset.remove = task.id;
    remove.setAttribute('aria-label', \`Delete \${task.title}\`);
    remove.textContent = '×';

    item.append(toggle, label, remove);
    list.append(item);
  }

  const left = tasks.filter((task) => !task.done).length;
  countEl.textContent = \`\${left} \${left === 1 ? 'task' : 'tasks'} left\`;
  emptyEl.hidden = shown.length > 0;
}`,
          },
          {
            type: 'text',
            id: 'fp-l14-b3',
            body: '`textContent` is the important choice. A task title is entered by the person using the app, so treating it as HTML would let a title like `<img onerror=...>` run code. `textContent` inserts it as text, which is exactly what a title is.',
          },
          {
            type: 'code',
            id: 'fp-l14-code-css',
            language: 'css',
            title: 'A completed task reads as completed',
            code: `.todo-item.is-done .todo-text {
  text-decoration: line-through;
  color: #5f6f64;
}`,
          },
          {
            type: 'text',
            id: 'fp-l14-b3b',
            body: 'The class is the only thing that changes when a task is toggled; the text is still the same text. Styling the completed state this way keeps the render function simple and lets the browser announce the button\'s `aria-pressed` state independently of the line through the label.',
          },
          {
            type: 'heading',
            id: 'fp-l14-h3',
            level: 3,
            body: 'Milestone 3: add a task',
          },
          {
            type: 'text',
            id: 'fp-l14-b4a',
            body: 'The form is the only place a new task enters the array. Trim the input, ignore an empty string, give the task a fresh id, prepend it, then run the same save-and-render path as every other change.',
          },
          {
            type: 'code',
            id: 'fp-l14-code-add',
            language: 'javascript',
            title: 'One entry point for new tasks',
            code: `form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  tasks = [
    { id: crypto.randomUUID(), title, done: false },
    ...tasks,
  ];
  input.value = '';
  save();
  render();
  input.focus();
});`,
          },
          {
            type: 'text',
            id: 'fp-l14-b4',
            body: 'The form submit handler calls `preventDefault()` because the page is not navigating anywhere. The input is cleared and focused again, so a person can type the next task without reaching for the mouse. The new task goes at the front because the most recent thing is usually the one being checked.',
          },
          {
            type: 'heading',
            id: 'fp-l14-h3b',
            level: 3,
            body: 'Milestone 4: one update path',
          },
          {
            type: 'code',
            id: 'fp-l14-code3',
            language: 'javascript',
            title: 'Mutate, save, render',
            code: `function update(id, changes) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...changes } : task,
  );
  save();
  render();
}

list.addEventListener('click', (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const toggle = target.closest('[data-id]');
  if (toggle) {
    const task = tasks.find((item) => item.id === toggle.dataset.id);
    if (task) update(task.id, { done: !task.done });
    return;
  }

  const remove = target.closest('[data-remove]');
  if (remove) {
    tasks = tasks.filter((item) => item.id !== remove.dataset.remove);
    save();
    render();
  }
});`,
          },
          {
            type: 'text',
            id: 'fp-l14-b4',
            body: 'The form adds a task; the list handler toggles or deletes one; the filter buttons change which subset is visible. All four paths end in `save()` and `render()`. That repetition is deliberate — every change has the same shape, so there is no way to update the screen without updating storage.',
          },
          {
            type: 'heading',
            id: 'fp-l14-h4',
            level: 3,
            body: 'Milestone 5: filters and the count',
          },
          {
            type: 'code',
            id: 'fp-l14-code4',
            language: 'javascript',
            title: 'The filter is state too',
            code: `function visibleTasks() {
  if (filter === 'active') return tasks.filter((task) => !task.done);
  if (filter === 'completed') return tasks.filter((task) => task.done);
  return tasks;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    render();
  });
});`,
          },
          {
            type: 'text',
            id: 'fp-l14-b5',
            body: '`aria-pressed` is what makes the active filter visible to a screen reader without relying on colour. The count always comes from the full `tasks` array, not from the filtered rows: "2 tasks left" should mean two tasks left in the whole list, even when the completed view is open.',
          },
          {
            type: 'warning',
            id: 'fp-l14-warn',
            title: 'innerHTML plus user input is a security bug',
            body: 'Building a row with `innerHTML` and concatenating the task title runs whatever markup the title contains. It also destroys and recreates the focused control on every render. `createElement` and `textContent` avoid both problems, and they are not meaningfully longer.',
          },
          {
            type: 'tip',
            id: 'fp-l14-tip',
            title: 'Test the four states',
            body: 'Run the app with no tasks, one task, several tasks and a filter that matches nothing. Then reload and check the list is still there. Finally, corrupt the stored JSON and reload. Those five checks cover more than most manual test plans.',
          },
          {
            type: 'heading',
            id: 'fp-l14-h5',
            level: 3,
            body: 'Submit this build',
          },
          {
            type: 'text',
            id: 'fp-l14-b6',
            body: 'Open the workspace and work through the milestones. The automated checks look for `createElement`, localStorage, `JSON.stringify`, `JSON.parse`, the event listener, the completed style and the counter. The manual check is the one that matters: reload restores the list, and a corrupt value falls back to empty.',
          },
          {
            type: 'project',
            id: 'fp-l14-project',
            projectSlug: 'todo-application',
            title: 'Submit the todo app',
            body: 'Add, complete, delete, filter, reload and corrupt the storage key. When all six behave, run the checklist and submit.',
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-fp-s7',
      title: 'Todo application check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-fp-s7-q1',
          type: 'multiple-choice',
          prompt: 'What is the source of truth for the todo list?',
          options: [
            'The rendered list items',
            'The task array in JavaScript',
            'The localStorage key alone',
            'The filter buttons',
          ],
          answer: 1,
          explanation:
            'The array is the state. The list, count and empty state are all rendered from it after every change.',
        },
        {
          id: 'quiz-fp-s7-q2',
          type: 'multiple-choice',
          prompt: 'Why give each task a stable id instead of using its array index?',
          options: [
            'Indexes are not numbers',
            'Filtering and reordering change the index, so a row can act on the wrong task',
            'localStorage cannot store arrays',
            'Ids make the text longer',
          ],
          answer: 1,
          explanation:
            'The index describes a position, not a task. A stable id keeps toggle and delete pointed at the same task through every filter change.',
        },
        {
          id: 'quiz-fp-s7-q3',
          type: 'true-false',
          prompt: 'If the stored JSON is corrupt, the app should throw so the problem is visible.',
          answer: false,
          explanation:
            'A corrupt value should fall back to an empty list. The app remains usable, and the person does not lose the page because of one bad key.',
        },
        {
          id: 'quiz-fp-s7-q4',
          type: 'blank',
          prompt: 'The attribute that marks the current filter button as pressed is ___.',
          answers: ['aria-pressed', 'aria pressed'],
          explanation:
            'aria-pressed exposes a toggle button\'s state to assistive technology, so the current filter is announced rather than only coloured.',
        },
        {
          id: 'quiz-fp-s7-q5',
          type: 'identify-error',
          prompt: 'What is the main problem with this render code?',
          code: 'list.innerHTML += `<li>${task.title}</li>`;',
          options: [
            'It is too slow to type',
            'The title is inserted as HTML, and every render destroys the existing rows and focus',
            'It needs a semicolon',
            'localStorage does not allow lists',
          ],
          answer: 1,
          explanation:
            'User text must not become markup, and replacing the whole list on every change loses focus and state. Create elements and set textContent instead.',
        },
      ],
    },
  },
]
