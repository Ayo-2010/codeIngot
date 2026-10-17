import type { Section } from '~/types/content'

export const tsConfigSections: Section[] = [
  {
    id: 'ts-s9',
    title: 'Strict Mode and Configuration',
    description: 'The flags that make TypeScript strict, and tuning them for your project.',
    lessons: [
      {
        id: 'ts-l26',
        title: 'strict and the flags it enables',
        description: 'What strict: true turns on, and why you should start with it.',
        duration: 5,
        objectives: [
          'List the seven flags enabled by strict',
          'Explain noImplicitAny, strictNullChecks, strictFunctionTypes',
          'Enable strict mode in a new project from day one',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'ts-l26-intro',
            body: '**strict and the flags it enables.** `strict: true` is one line in `tsconfig.json` that turns on a family of checks. Each can be set individually, but they belong together: together they are the difference between TypeScript as a syntax hint and TypeScript as a safety net.',
          },
          {
            type: 'text',
            id: 'ts-l26-b2',
            body: 'The three that catch the most real bugs are `noImplicitAny` (refuse to guess when a value has no type), `strictNullChecks` (treat `null` and `undefined` as their own types, not as members of every type) and `strictFunctionTypes` (check callback parameters strictly). The rest tighten property initialisation, `this`, and the emitted `"use strict"`.',
          },
          {
            type: 'heading',
            id: 'ts-l26-h1',
            level: 2,
            body: 'One flag, seven checks',
          },
          {
            type: 'code',
            id: 'ts-l26-code',
            language: 'plaintext',
            title: 'tsconfig.json',
            code: `{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true
  }
}`,
          },
          {
            type: 'list',
            id: 'ts-l26-list',
            style: 'bullet',
            items: [
              '`noImplicitAny`: a value with no inferable type is an error, not silently `any`.',
              '`strictNullChecks`: `string` does not include `null`, so you must handle the missing case.',
              '`strictFunctionTypes`: callback parameter types are checked, catching a whole class of runtime surprises.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l26-tip',
            title: 'Start strict or start over',
            body: 'Turning strictness on later means fixing years of accumulated looseness at once. A new project can begin with `strict: true` and stay clean for free; an old one has to earn it back gradually.',
          },
          {
            type: 'heading',
            id: 'ts-l26-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l26-b3',
            body: 'Write the configuration a new project should start from, and switch on the individual checks you want made explicit.',
          },
          {
            type: 'exercise',
            id: 'ts-l26-x1',
            exercise: {
              id: 'ex-ts-l26',
              instructions:
                'Fill tsconfig.compilerOptions so strict is true and noImplicitAny, strictNullChecks and strictFunctionTypes are each explicitly true.',
              languages: ['typescript'],
              starterCode: {
                typescript: `const tsconfig = {
  compilerOptions: {
    strict: false,
    noImplicitAny: false,
    strictNullChecks: false,
    strictFunctionTypes: false,
  },
}
`,
              },
              tests: [
                { id: 'ts-l26-t1', label: 'strict is on', body: 'return tsconfig.compilerOptions.strict === true' },
                {
                  id: 'ts-l26-t2',
                  label: 'noImplicitAny is on',
                  body: 'return tsconfig.compilerOptions.noImplicitAny === true',
                },
                {
                  id: 'ts-l26-t3',
                  label: 'strictNullChecks is on',
                  body: 'return tsconfig.compilerOptions.strictNullChecks === true',
                },
                {
                  id: 'ts-l26-t4',
                  label: 'strictFunctionTypes is on',
                  body: 'return tsconfig.compilerOptions.strictFunctionTypes === true',
                },
              ],
              hints: [
                'Every one of these flags takes a boolean value.',
                'strict is the umbrella; the other three are the members you are making explicit.',
                'Set all four keys to true.',
              ],
              solution: {
                typescript: `const tsconfig = {
  compilerOptions: {
    strict: true,
    noImplicitAny: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
  },
}
`,
              },
              testNotes:
                'The tests read each key individually, mirroring how the compiler resolves the umbrella flag and its members.',
            },
          },
        ],
      },
      {
        id: 'ts-l27',
        title: 'Tuning strictness for migration',
        description: 'Turning off individual flags when migrating JavaScript, and the migration path.',
        duration: 5,
        objectives: [
          'Disable noImplicitAny temporarily during migration',
          'Use // @ts-expect-error for known issues',
          'Enable flags one by one as the codebase improves',
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'ts-l27-intro',
            body: '**Tuning strictness for migration.** Turning a large JavaScript codebase strict all at once produces thousands of errors and no progress. The practical route is to switch strict on and then deliberately lift the individual flags that are not ready, one at a time, fixing as you go.',
          },
          {
            type: 'text',
            id: 'ts-l27-b2',
            body: 'For a single stubborn line, `// @ts-expect-error` silences the error on the next line — and, importantly, fails if there is *no* error there. That second behaviour is the point: a suppression cannot quietly outlive the problem it was hiding.',
          },
          {
            type: 'heading',
            id: 'ts-l27-h1',
            level: 2,
            body: 'Migrating without stopping',
          },
          {
            type: 'code',
            id: 'ts-l27-code',
            language: 'typescript',
            title: 'lift one flag, silence one line',
            code: `// Strict everywhere, except the one flag we are still paying down:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": false   // temporary: let untyped JavaScript in
  }
}

// Silence a single, understood problem rather than the whole file:
const parsed = JSON.parse(input)
// @ts-expect-error — the payload is validated on the next line
useAsUser(parsed)

// @ts-expect-error errors when the next line has NO error, so it
// cannot rot into a permanent, meaningless suppression.`,
          },
          {
            type: 'list',
            id: 'ts-l27-list',
            style: 'bullet',
            items: [
              'Turn off the *smallest* flag that unblocks you, never the whole of `strict`.',
              '`// @ts-expect-error` is self-cleaning: once the line is fixed, the comment itself becomes an error.',
              'Track the flags you have lifted and put them back as the codebase catches up.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l27-warn',
            title: 'expect-error is not ignore',
            body: 'An old-style `// @ts-ignore` silences an error whether or not one exists, so it hides future mistakes silently. Prefer `@ts-expect-error`, which stops working the moment it is no longer needed.',
          },
          {
            type: 'heading',
            id: 'ts-l27-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l27-b3',
            body: 'Model how the compiler resolves a migration config: an umbrella `strict` flag, plus a list of flags you have temporarily lifted.',
          },
          {
            type: 'exercise',
            id: 'ts-l27-x1',
            exercise: {
              id: 'ex-ts-l27',
              instructions:
                'Write effectiveFlags(config) returning one entry per flag. Every flag is true when config.strict is true and it is not in config.disabled; otherwise false.',
              languages: ['typescript'],
              starterCode: {
                typescript: `const ALL_FLAGS = [
  'noImplicitAny',
  'strictNullChecks',
  'strictFunctionTypes',
  'strictPropertyInitialization',
  'noImplicitThis',
  'alwaysStrict',
]

// Map every flag to its effective boolean.
function effectiveFlags(config: { strict: boolean; disabled: string[] }): Record<string, boolean> {
  return {}
}
`,
              },
              tests: [
                {
                  id: 'ts-l27-t1',
                  label: 'with nothing disabled, a flag is on',
                  body: 'return effectiveFlags({ strict: true, disabled: [] }).noImplicitAny === true',
                },
                {
                  id: 'ts-l27-t2',
                  label: 'a disabled flag is off',
                  body: "return effectiveFlags({ strict: true, disabled: ['noImplicitAny'] }).noImplicitAny === false",
                },
                {
                  id: 'ts-l27-t3',
                  label: 'disabling one flag leaves the others on',
                  body: "return effectiveFlags({ strict: true, disabled: ['noImplicitAny'] }).alwaysStrict === true",
                },
                {
                  id: 'ts-l27-t4',
                  label: 'strict off switches everything off',
                  body: 'return effectiveFlags({ strict: false, disabled: [] }).alwaysStrict === false',
                },
                {
                  id: 'ts-l27-t5',
                  label: 'every flag is reported',
                  body: 'return Object.keys(effectiveFlags({ strict: true, disabled: [] })).length === ALL_FLAGS.length',
                },
              ],
              hints: [
                'Build a new object with one key per entry of ALL_FLAGS.',
                'A flag is on only when strict is true AND it is not in the disabled list.',
                'In the loop: result[flag] = config.strict && !config.disabled.includes(flag).',
              ],
              solution: {
                typescript: `const ALL_FLAGS = [
  'noImplicitAny',
  'strictNullChecks',
  'strictFunctionTypes',
  'strictPropertyInitialization',
  'noImplicitThis',
  'alwaysStrict',
]

function effectiveFlags(config: { strict: boolean; disabled: string[] }): Record<string, boolean> {
  const result: Record<string, boolean> = {}
  for (const flag of ALL_FLAGS) {
    result[flag] = config.strict && !config.disabled.includes(flag)
  }
  return result
}
`,
              },
              testNotes:
                'The last check counts the keys, so an implementation that only reports the disabled flags is caught.',
            },
          },
        ],
      },
      {
        id: 'ts-l28',
        title: 'Project references and incremental builds',
        description: 'Splitting a monorepo into referenced projects for faster compilation.',
        duration: 5,
        objectives: [
          'Configure composite and references in tsconfig',
          'Build incrementally with --build mode',
          'Structure a monorepo with shared type packages',
        ],
        xp: 30,
        content: [
          {
            type: 'text',
            id: 'ts-l28-intro',
            body: '**Project references and incremental builds.** In a monorepo, one giant tsconfig re-checks everything on every change. Project references split it into smaller projects that each compile on their own, with a root config that lists them and a `--build` command that walks the graph.',
          },
          {
            type: 'text',
            id: 'ts-l28-b2',
            body: 'A referenced project must be *composite*, which means it emits declarations and remembers what it has already compiled in a `.tsbuildinfo` file. That memory is what makes the second build so much faster than the first: only the projects whose files changed are rebuilt.',
          },
          {
            type: 'heading',
            id: 'ts-l28-h1',
            level: 2,
            body: 'A solution config and its members',
          },
          {
            type: 'code',
            id: 'ts-l28-code',
            language: 'plaintext',
            title: 'monorepo tsconfig files',
            code: `// tsconfig.json — the solution file: no code of its own, only references.
{
  "files": [],
  "references": [
    { "path": "packages/core" },
    { "path": "packages/app" }
  ]
}

// packages/core/tsconfig.json — a referenced project must be composite.
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "incremental": true
  }
}

// Build in dependency order, rebuilding only what changed:
// tsc --build`,
          },
          {
            type: 'list',
            id: 'ts-l28-list',
            style: 'bullet',
            items: [
              'The root config uses `files: []` and `references` — it coordinates rather than compiles.',
              '`composite: true` is required for any project that others reference, and implies declaration output.',
              '`tsc --build` understands the graph, so a change in `core` rebuilds `app` after it.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l28-tip',
            title: 'Builds are a graph, not a list',
            body: 'Once projects reference each other, build order is determined for you. Add a reference and the dependency is respected automatically — no more hand-ordered build scripts that break when a package moves.',
          },
          {
            type: 'heading',
            id: 'ts-l28-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l28-b3',
            body: 'Write the two configs a referenced project needs: the solution file at the root, and a member that can itself be referenced.',
          },
          {
            type: 'exercise',
            id: 'ts-l28-x1',
            exercise: {
              id: 'ex-ts-l28',
              instructions:
                'Fill rootConfig so it references packages/core and packages/app and has no files of its own. Fill coreConfig.compilerOptions so the project is composite, emits declarations, and builds incrementally.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// The root solution file: only references, no files.
const rootConfig = {
  files: [],
  references: [],
}

// A referenced member project.
const coreConfig = {
  compilerOptions: {
    composite: false,
    declaration: false,
    incremental: false,
  },
}
`,
              },
              tests: [
                {
                  id: 'ts-l28-t1',
                  label: 'the root lists both member projects',
                  body: "return rootConfig.references.length === 2 && rootConfig.references[0].path === 'packages/core' && rootConfig.references[1].path === 'packages/app'",
                },
                { id: 'ts-l28-t2', label: 'the root has no files of its own', body: 'return Array.isArray(rootConfig.files) && rootConfig.files.length === 0' },
                { id: 'ts-l28-t3', label: 'the member is composite', body: 'return coreConfig.compilerOptions.composite === true' },
                {
                  id: 'ts-l28-t4',
                  label: 'the member emits declarations and builds incrementally',
                  body: 'return coreConfig.compilerOptions.declaration === true && coreConfig.compilerOptions.incremental === true',
                },
              ],
              hints: [
                'references is an array of objects, each with a path string.',
                'The two paths are packages/core and packages/app, in that order.',
                'For the member, set composite, declaration and incremental all to true.',
              ],
              solution: {
                typescript: `const rootConfig = {
  files: [],
  references: [
    { path: 'packages/core' },
    { path: 'packages/app' },
  ],
}

const coreConfig = {
  compilerOptions: {
    composite: true,
    declaration: true,
    incremental: true,
  },
}
`,
              },
              testNotes:
                'The reference order is checked as well as the paths, matching the dependency order the build would follow.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-ts-s9',
      title: 'Configuration check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s9-q1',
          type: 'multiple-choice',
          prompt: 'How many flags does strict: true enable?',
          options: ['5', '6', '7', '8'],
          answer: 2,
          explanation: 'strict enables 7 flags: noImplicitAny, strictNullChecks, strictFunctionTypes, strictBindCallApply, strictPropertyInitialization, noImplicitThis, alwaysStrict.',
        },
        {
          id: 'quiz-ts-s9-q2',
          type: 'true-false',
          prompt: 'strictNullChecks makes null and undefined valid values of every type.',
          answer: false,
          explanation: 'strictNullChecks does the opposite: it makes null and undefined NOT assignable to other types unless explicitly included in a union (e.g., string | null).',
        },
        {
          id: 'quiz-ts-s9-q3',
          type: 'multiple-choice',
          prompt: 'What does // @ts-expect-error do?',
          options: [
            'Suppresses all errors on the next line',
            'Suppresses errors on the next line, but errors if there are none',
            'Disables type checking for the entire file',
            'Marks a line as intentionally broken for testing',
          ],
          answer: 1,
          explanation: '@ts-expect-error suppresses errors on the next line AND causes an error if that line has no errors, preventing stale suppressions.',
        },
        {
          id: 'quiz-ts-s9-q4',
          type: 'blank',
          prompt: 'Which tsconfig option enables incremental compilation with cache?',
          answers: ['incremental: true', 'incremental', '"incremental": true'],
          explanation: 'incremental: true saves compilation info to .tsbuildinfo for faster subsequent builds.',
        },
        {
          id: 'quiz-ts-s9-q5',
          type: 'identify-error',
          prompt: 'What does composite: true require?',
          code: '{\n  "compilerOptions": {\n    "composite": true\n  }\n}',
          options: [
            'Nothing else',
            'declaration: true and declarationMap: true',
            'strict: false',
            'module: commonjs',
          ],
          answer: 1,
          explanation: 'composite: true (for project references) requires declaration: true and implies declarationMap: true.',
        },
      ],
    },
  },
]
