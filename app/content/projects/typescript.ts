import type { Project } from '~/types/content'

export const typescriptProjects: Project[] = [
  {
    id: 'project-typed-task-tracker',
    slug: 'typed-task-tracker',
    title: 'Typed Task Tracker',
    tagline: 'A task list fully typed with generics, utility types, and strict null checks.',
    summary:
      'Take the JavaScript todo app you already know and rebuild it in TypeScript. The logic is similar, but every edge case that used to throw at runtime now fails at compile time: a missing id, an unknown filter, a task read before it exists.',
    difficulty: 'intermediate',
    technologies: ['typescript', 'javascript'],
    estimatedMinutes: 150,
    xp: 480,
    brief: [
      'Define a Task interface with id, title, done and created fields, then make a Filter type as a union of string literals.',
      'Write a reducer function whose action parameter is a discriminated union, and let TypeScript narrow each case.',
      'Use utility types so the same Task type drives both the full record and the patch you save to localStorage.',
      'Type querySelector so it returns the right element type, and never reach for a non-null assertion without a guard.',
      'Persist the state as JSON with a reviver that restores the created Date on load.',
    ],
    requirements: [
      'A Task interface with id, title, and done fields, plus a created Date.',
      'A Filter type that is a union of "all", "active", "completed"',
      'A reducer-style update function with a discriminated union action parameter.',
      'State persisted to localStorage and restored on load with type checking.',
      'No ts-expect-error or any in the final solution.',
      'An empty state message when no tasks match the current filter.',
    ],
    checklist: [
      {
        id: 'tt-1',
        label: 'Task and Filter interfaces or type aliases are defined',
        verify: { kind: 'js-call', needle: 'interface.*Task|type Filter', label: 'a Task interface or Filter type' },
      },
      {
        id: 'tt-2',
        label: 'The action parameter is a discriminated union',
        verify: { kind: 'js-call', needle: 'type.*Action|union', label: 'a discriminated union for actions' },
      },
      {
        id: 'tt-3',
        label: 'Utility types are used on the Task shape',
        verify: { kind: 'js-call', needle: 'Partial<|Pick<|Omit<|Readonly<', label: 'a utility type usage' },
      },
      {
        id: 'tt-4',
        label: 'State is typed and persisted with JSON',
        verify: { kind: 'js-call', needle: 'localstorage|json.stringify|json.parse', label: 'localStorage and JSON usage' },
      },
      {
        id: 'tt-5',
        label: 'No any or ts-expect-error escapes into the final code',
        verify: { kind: 'manual', label: 'the solution uses no any keyword and no ts-expect-error' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Typed Task Tracker</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <main class="task-tracker">
      <h1>Typed Task Tracker</h1>

      <form id="new-task-form">
        <label for="new-task-title">New task</label>
        <input id="new-task-title" name="title" type="text" autocomplete="off" />
        <button type="submit">Add</button>
      </form>

      <div class="filters">
        <button type="button" data-filter="all" aria-pressed="true">All</button>
        <button type="button" data-filter="active" aria-pressed="false">Active</button>
        <button type="button" data-filter="completed" aria-pressed="false">Completed</button>
      </div>

      <ul id="task-list" class="task-list"></ul>

      <p id="task-count" class="task-count">0 tasks left</p>
      <p id="task-empty" class="task-empty" hidden>No tasks match the current filter.</p>
    </main>

    <script type="module" src="app.ts"></script>
  </body>
</html>
`,
      css: `.task-tracker {
  max-width: 36rem;
  margin: 3rem auto;
  padding: 0 1.25rem;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* Write the form, list and filter rules here. */
`,
      typescript: `// Rename this file from .ts to .js to compare with the JS version.
// The logic is the same, but every type error you fix here is a crash you
// just prevented in production.

interface Task {
  id: string;
  title: string;
  done: boolean;
  created: Date;
}

type Filter = 'all' | 'active' | 'completed';

// Write your reducer, render, save and load functions here.
`,
    },
    designPreviewHtml: `<section class="tt">
  <h1>Typed Task Tracker</h1>

  <form class="tt-form">
    <input class="tt-input" type="text" placeholder="What needs doing?" aria-label="New task" />
    <button class="tt-add" type="button">Add</button>
  </form>

  <div class="tt-filters">
    <button class="tt-chip is-active" type="button">All</button>
    <button class="tt-chip" type="button">Active</button>
    <button class="tt-chip" type="button">Completed</button>
  </div>

  <ul class="tt-list">
    <li class="tt-item">
      <input class="tt-check" type="checkbox" id="tt-1" />
      <label class="tt-label" for="tt-1">Build the typed version</label>
      <button class="tt-remove" type="button" aria-label="Remove">×</button>
    </li>
    <li class="tt-item is-done">
      <input class="tt-check" type="checkbox" id="tt-2" checked />
      <label class="tt-label done" for="tt-2">Pass the build with zero errors</label>
      <button class="tt-remove" type="button" aria-label="Remove">×</button>
    </li>
    <li class="tt-item">
      <input class="tt-check" type="checkbox" id="tt-3" />
      <label class="tt-label" for="tt-3">Deploy to production</label>
      <button class="tt-remove" type="button" aria-label="Remove">×</button>
    </li>
  </ul>

  <p class="tt-count">1 task left</p>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0f172a;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.tt {
  max-width: 36rem;
  margin: 0 auto;
}

.tt h1 {
  margin: 0 0 1.5rem;
  font-size: 1.75rem;
  color: #f8fafc;
}

.tt-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.tt-input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: 1px solid #334159;
  border-radius: 8px;
  background: #1e293b;
  color: #f8fafc;
  font: inherit;
}

.tt-add {
  padding: 0.6rem 1.1rem;
  border: 0;
  border-radius: 8px;
  background: #38bdf8;
  color: #0f172a;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.tt-filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tt-chip {
  padding: 0.3rem 0.75rem;
  border: 1px solid #334159;
  border-radius: 999px;
  background: transparent;
  color: #94a3b8;
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}

.tt-chip.is-active {
  border-color: #0ea5e9;
  color: #f8fafc;
  background: rgba(14, 165, 233, 0.1);
}

.tt-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #334159;
  border-radius: 10px;
  overflow: hidden;
  background: #1e293b;
}

.tt-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.8rem;
  border-bottom: 1px solid #334159;
}

.tt-item:last-child {
  border-bottom: 0;
}

.tt-check {
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  accent-color: #0ea5e9;
}

.tt-label {
  flex: 1;
  cursor: pointer;
}

.tt-label.done {
  color: #64748b;
  text-decoration: line-through;
}

.tt-remove {
  padding: 0.3rem 0.5rem;
  border: 0;
  background: transparent;
  color: #64748b;
  font-size: 1.2rem;
  cursor: pointer;
}

.tt-remove:hover {
  color: #f8fafc;
}

.tt-item.is-done .tt-label {
  color: #64748b;
  text-decoration: line-through;
}

.tt-count {
  margin: 0.75rem 0 0;
  color: #94a3b8;
  font-size: 0.85rem;
}
`,
    designPreviewJs: `var tracker = document.querySelector('.tt');
if (tracker) {
  var input = tracker.querySelector('.tt-input');
  var list = tracker.querySelector('.tt-list');
  var counter = tracker.querySelector('.tt-count');
  var chips = tracker.querySelectorAll('.tt-chip');

  var tasks = [
    { id: '1', title: 'Build the typed version', done: false },
    { id: '2', title: 'Pass the build with zero errors', done: true },
    { id: '3', title: 'Deploy to production', done: false }
  ];
  var filter = 'all';

  function visible() {
    if (filter === 'active') return tasks.filter(function (t) { return !t.done; });
    if (filter === 'completed') return tasks.filter(function (t) { return t.done; });
    return tasks;
  }

  function render() {
    var items = visible();
    list.textContent = '';
    items.forEach(function (task) {
      var li = document.createElement('li');
      li.className = 'tt-item' + (task.done ? ' is-done' : '');
      li.innerHTML =
        '<input class="tt-check" type="checkbox" ' + (task.done ? 'checked' : '') + ' />' +
        '<label class="tt-label' + (task.done ? ' done' : '') + '">' + task.title + '</label>' +
        '<button class="tt-remove" type="button">×</button>';
      list.appendChild(li);
    });
    var left = tasks.filter(function (t) { return !t.done; }).length;
    counter.textContent = left + ' task' + (left === 1 ? '' : 's') + ' left';
  }

  input.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    if (!input.value.trim()) return;
    tasks.push({ id: String(Date.now()), title: input.value.trim(), done: false });
    input.value = '';
    render();
  });

  list.addEventListener('click', function (e) {
    var target = e.target;
    var item = target.closest('.tt-item');
    if (!item) return;
    var index = Array.prototype.indexOf.call(list.children, item);
    if (target.classList.contains('tt-check') || target.classList.contains('tt-label')) {
      tasks[index].done = !tasks[index].done;
      render();
    }
    if (target.classList.contains('tt-remove')) {
      tasks.splice(index, 1);
      render();
    }
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      filter = chip.textContent.trim().toLowerCase();
      render();
    });
  });

  render();
}
`,
    solutionNote:
      'A strong solution defines Task and Filter as explicit types, writes a reducer whose action is a discriminated union, and uses utility types so the same shape applies to both new tasks and partial updates. Every DOM access is typed so querySelector returns the right element, and every JSON parse is guarded with a try/catch that validates the shape on load.',
  },
  {
    id: 'project-typed-api-client',
    slug: 'typed-api-client',
    title: 'Typed API Client',
    tagline: 'A client that fetches, caches and validates external data with full TypeScript generics.',
    summary:
      'Build a reusable API client where the request and response are both typed. You will use generics to describe the endpoint, infer the response shape, and handle the three states every async call has: loading, success, and error.',
    difficulty: 'advanced',
    technologies: ['typescript', 'javascript'],
    estimatedMinutes: 180,
    xp: 520,
    brief: [
      'Define an Endpoint type as a generic interface with input and output shapes.',
      'Write a fetchTyped function that takes an Endpoint and returns a Promise of its output.',
      'Use generics to preserve the response type through the call chain.',
      'Implement a cache that stores typed responses by key.',
      'Handle loading and error states with a discriminated union Result type.',
    ],
    requirements: [
      'An Endpoint generic interface with input and output parameters.',
      'A fetchTyped function generic over Endpoint that returns the inferred output type.',
      'A cache object typed with a Record of endpoint keys to cached results.',
      'A Result type as a discriminated union of loading, success, and error.',
      'Type the error value so a 404 and a network failure are distinguishable.',
    ],
    checklist: [
      {
        id: 'ac-1',
        label: 'An Endpoint interface or type is parameterized with generics',
        verify: { kind: 'js-call', needle: 'interface.*Endpoint|type.*Endpoint', label: 'a generic Endpoint type' },
      },
      {
        id: 'ac-2',
        label: 'A fetchTyped function returns the inferred response type',
        verify: { kind: 'js-call', needle: 'function.*fetch|Promise<', label: 'a typed fetch function' },
      },
      {
        id: 'ac-3',
        label: 'The cache is typed with a Record keyed by endpoint name',
        verify: { kind: 'js-call', needle: 'Record<', label: 'a Record type for the cache' },
      },
      {
        id: 'ac-4',
        label: 'A Result union type covers loading, success, and error',
        verify: { kind: 'js-call', needle: 'loading|success|error', label: 'discriminated states' },
      },
      {
        id: 'ac-5',
        label: 'The solution compiles with zero errors and uses no any',
        verify: { kind: 'manual', label: 'the project builds with tsc --strict and has zero any usages' },
      },
    ],
    starterFiles: {
      typescript: `// Define your Endpoint type and fetchTyped function here.
// Every endpoint should declare its input and output shape, and the
// compiler should know the response type at every call site.

interface Endpoint {
  // Add your generic parameters here
}

async function fetchTyped<E extends Endpoint>(): Promise<unknown> {
  // Implement the typed fetch here
}

// Write your Result type and cache here.
`,
    },
    designPreviewHtml: `<section class="ac">
  <h1>Typed API Client</h1>

  <div class="ac-endpoint">
    <code>GET /api/users/{id}</code>
    <pre class="ac-response">{"id": 42, "name": "Alex Rivera", "email": "alex@example.com"}</pre>
  </div>

  <div class="ac-cache">
    <h3>Cache</h3>
    <p class="ac-status">Loaded 8 users, 3 cached</p>
  </div>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0f172a;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.ac {
  max-width: 42rem;
  margin: 0 auto;
}

.ac h1 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #f8fafc;
}

.ac-endpoint {
  margin-bottom: 1.5rem;
}

.ac-endpoint code {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  background: #1e293b;
  color: #38bdf8;
  font-size: 0.9rem;
}

.ac-response {
  margin: 0.5rem 0 0;
  padding: 0.75rem;
  border-radius: 6px;
  background: #111827;
  color: #4ade80;
  font-size: 0.82rem;
  overflow-x: auto;
}

.ac-cache {
  padding: 1rem;
  border: 1px solid #334159;
  border-radius: 10px;
  background: #1e293b;
}

.ac-cache h3 {
  margin: 0 0 0.4rem;
  font-size: 0.95rem;
}

.ac-status {
  margin: 0;
  color: #94a3b8;
  font-size: 0.85rem;
}
`,
    designPreviewJs: `// The reference uses a plain JS implementation so it works in the preview.
// Your TypeScript version should preserve this behavior while adding types.
`,
    solutionNote:
      'A strong solution defines Endpoint as a generic type with Input and Output parameters, then writes fetchTyped<T extends Endpoint>() so every call site gets the exact response shape. The cache uses a Map or Record keyed by endpoint, and the Result type discriminates loading, ok, and error states so callers never access data they do not have.',
  },
  {
    id: 'project-typed-dashboard',
    slug: 'typed-dashboard',
    title: 'Typed Dashboard with Charting',
    tagline: 'A dashboard that renders charts from typed data, with type-safe metric queries.',
    summary:
      'Build a dashboard where every metric query returns typed data. You will model the chart configurations with mapped types, use conditional types to determine the output shape of each query, and ensure a metric name that does not exist is a compile error, not a blank chart.',
    difficulty: 'advanced',
    technologies: ['typescript', 'javascript'],
    estimatedMinutes: 200,
    xp: 540,
    brief: [
      'Define a Metrics type that maps each metric name to its data shape.',
      'Write a query function generic over the metric key that returns the correct array type.',
      'Use keyof to iterate over metrics, and typeof to extract the value type.',
      'Build the chart components to accept the exact type each metric returns.',
      'Ensure renaming or removing a metric is a compile error, not a runtime surprise.',
    ],
    requirements: [
      'A Metrics type mapping metric names to their return shapes.',
      'A query function that returns an array typed to the specific metric.',
      'A keyof-based loop or mapped type over the Metrics type.',
      'Chart components typed to accept their specific metric data.',
      'Zero any types and zero runtime errors when a metric is renamed or removed.',
    ],
    checklist: [
      {
        id: 'dd-1',
        label: 'A Metrics type maps names to data shapes',
        verify: { kind: 'js-call', needle: 'type Metrics|interface Metrics', label: 'a Metrics type definition' },
      },
      {
        id: 'dd-2',
        label: 'A query function uses keyof Metrics',
        verify: { kind: 'js-call', needle: 'keyof', label: 'a keyof usage' },
      },
      {
        id: 'dd-3',
        label: 'Mapped types describe the chart configurations',
        verify: { kind: 'js-call', needle: 'in keyof|mapped type', label: 'a mapped type' },
      },
      {
        id: 'dd-4',
        label: 'The project compiles under strict mode with no any',
        verify: { kind: 'manual', label: 'tsc --strict passes with no any and no errors' },
      },
    ],
    starterFiles: {
      typescript: `// Define your Metrics type and query function here.
// The query should be generic so TypeScript knows the return type
// for each metric name at compile time.

type Metrics = {
  // Add your metric definitions here
}

function query<K extends keyof Metrics>(metric: K): Metrics[K][] {
  // Return typed data for the requested metric
}

// Write your chart rendering function here.
`,
    },
    designPreviewHtml: `<section class="dashboard">
  <h1>Typed Dashboard</h1>
  <div class="dashboard-grid">
    <div class="card card--visits">
      <h2>Visits</h2>
      <p class="metric">12,892</p>
    </div>
    <div class="card card--signups">
      <h2>New signups</h2>
      <p class="metric">142</p>
    </div>
    <div class="card card--revenue">
      <h2>Revenue</h2>
      <p class="metric">$5,420</p>
    </div>
  </div>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #0f172a;
  color: #e2e8f0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.dashboard {
  max-width: 52rem;
  margin: 0 auto;
}

.dashboard h1 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #f8fafc;
}

.dashboard-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.card {
  padding: 1.25rem;
  border: 1px solid #334159;
  border-radius: 10px;
  background: #1e293b;
}

.card h2 {
  margin: 0 0 0.5rem;
  font-size: 0.8rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.metric {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #f8fafc;
}
`,
    designPreviewJs: `// Placeholder — the TypeScript version uses typed chart data.
`,
    solutionNote:
      'A strong solution defines Metrics as a strict mapping, queries with keyof so renaming a metric is a compile time check everywhere, and feeds the typed arrays straight into chart components so the shapes never fall out of sync.',
  },
]
