import type { Section } from '~/types/content'

export const tsModulesSections: Section[] = [
  {
    id: 'ts-s8',
    title: 'Modules and Declaration Files',
    description: 'Organizing code with ES modules, ambient declarations, and publishing type packages.',
    lessons: [
      {
        id: 'ts-l23',
        title: 'ES modules in TypeScript',
        description: 'Import/export syntax, tsconfig module settings, and path aliases.',
        duration: 5,
        objectives: [
          'Configure module, moduleResolution and baseUrl',
          'Use path aliases for clean imports',
          'Explain the difference between import and require',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-ts-l23',
          title: 'ES modules in TypeScript quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l23-q1',
              type: 'multiple-choice',
              prompt: 'How do you augment a module declaration from an external package?',
              options: [
                'Modify node_modules directly',
                'declare module "package-name" { ... }',
                'Create a file named package-name.d.ts',
                'Use import type from "package-name"',
              ],
              answer: 1,
              explanation: 'declare module "package-name" lets you add types to an existing module without modifying it.',
            },
            {
              id: 'quiz-ts-l23-q2',
              type: 'multiple-choice',
              prompt: 'Which pair correctly describes what `module` and `moduleResolution` control?',
              options: [
                '`module` sets how imports are resolved; `moduleResolution` sets the output format',
                '`module` sets the emitted module format; `moduleResolution` sets how the compiler finds files',
                'Both control only path aliases',
                '`module` is for JavaScript and `moduleResolution` is for TypeScript',
              ],
              answer: 1,
              explanation: '`module` decides the shape of the emitted code, while `moduleResolution` decides how an import specifier is turned into a file on disk.',
            },
            {
              id: 'quiz-ts-l23-q3',
              type: 'multiple-choice',
              prompt: 'What is the effect of `import type { User } from "./types"`?',
              options: [
                'It imports User as a runtime value',
                'It loads the module lazily',
                'It is erased entirely and leaves no runtime import',
                'It converts User into an interface',
              ],
              answer: 2,
              explanation: '`import type` exists only for the type checker. It documents that the import is type-only and guarantees the line disappears from the compiled JavaScript.',
            },
            {
              id: 'quiz-ts-l23-q4',
              type: 'multiple-choice',
              prompt: 'Why must a bundler also be told about the `paths` aliases in tsconfig?',
              options: [
                'Because `paths` only affects compile-time resolution, not the emitted imports',
                'Because the compiler rewrites every alias to a relative path',
                'Because `paths` only works in declaration files',
                'Because aliases are resolved by the browser at runtime',
              ],
              answer: 0,
              explanation: 'TypeScript uses `paths` to find modules while checking but leaves the alias in the output. The bundler must apply the same mapping at build time.',
            },
            {
              id: 'quiz-ts-l23-q5',
              type: 'multiple-choice',
              prompt: 'Which statement about `import` and `require` is correct?',
              options: [
                '`import` is a runtime function that can be called conditionally',
                '`require` is the ES module syntax checked by the compiler',
                '`import` is static top-level syntax, while `require` is a CommonJS function call',
                'They are two spellings of the same statement',
              ],
              answer: 2,
              explanation: 'ES module imports are static declarations hoisted to the top of the file. `require` is an ordinary function from CommonJS, so it can run conditionally and returns the module at runtime.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l23-d1',
            title: 'One module, named exports',
            body: 'A module is a bag of named exports, and only what it exports can be imported. Types are erased before this runs, so the demo shows the runtime half: which names actually resolve.',
            html: `<button id="goAdd">Import add</button>
<button id="goMultiply">Import multiply</button>
<button id="goMissing">Import divide</button>
<pre id="out">Press a button to import a name.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const mathModule = {
  add: function (a, b) { return a + b },
  multiply: function (a, b) { return a * b },
}

const out = document.querySelector('#out')

function use(name) {
  const value = mathModule[name]
  if (value === undefined) {
    return 'no export called ' + name + ' -> undefined'
  }
  return name + ' imported; calling it with 2 and 3 gives ' + value(2, 3)
}

document.querySelector('#goAdd').addEventListener('click', function () {
  out.textContent = use('add')
})

document.querySelector('#goMultiply').addEventListener('click', function () {
  out.textContent = use('multiply')
})

document.querySelector('#goMissing').addEventListener('click', function () {
  out.textContent = use('divide')
})`,
            height: 180,
          },
          {
            type: 'text',
            id: 'ts-l23-intro',
            body: '**ES modules in TypeScript.** A module is any file with an `import` or an `export`. What you export is public; everything else is private to the file. TypeScript adds types to that boundary, so the names you import arrive already understood.',
          },
          {
            type: 'text',
            id: 'ts-l23-b2',
            body: 'Two tsconfig options control how those imports are resolved. `module` says which module format to emit; `moduleResolution` says how the compiler looks for the file you named. `paths` then lets you replace `../../../../utils` with a short alias such as `@/utils`.',
          },
          {
            type: 'heading',
            id: 'ts-l23-h1',
            level: 2,
            body: 'Exports, imports, and aliases',
          },
          {
            type: 'code',
            id: 'ts-l23-code',
            language: 'typescript',
            title: 'a module and its consumer',
            code: `// math.ts — this file is a module because it exports.
export function add(a: number, b: number): number {
  return a + b
}

export const version = '1.0.0'

// app.ts — importing the names it needs.
import { add, version } from './math'

add(1, 2)                 // names are typed at the import site

// tsconfig paths turn a deep relative path into an alias:
// {
//   "compilerOptions": {
//     "module": "ESNext",
//     "moduleResolution": "Bundler",
//     "baseUrl": ".",
//     "paths": { "@/*": ["src/*"] }
//   }
// }
import { format } from '@/utils/format'`,
          },
          {
            type: 'list',
            id: 'ts-l23-list',
            style: 'bullet',
            items: [
              'An `export` makes a name part of the module’s public surface; only exported names can be imported.',
              '`import type { User } from ...` imports a type only and is erased entirely from the output.',
              '`paths` aliases are a compile-time convenience — your bundler must be told about them too.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l23-tip',
            title: 'Prefer import type for types',
            body: 'Use `import type` when you only need the type. It documents intent and guarantees the import disappears from the compiled JavaScript, so it never drags a runtime dependency along.',
          },
          {
            type: 'heading',
            id: 'ts-l23-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l23-b3',
            body: 'A module is a bag of named exports. Model the *act of importing*: pull one name out of an object that stands in for a module.',
          },
          {
            type: 'exercise',
            id: 'ts-l23-x1',
            exercise: {
              id: 'ex-ts-l23',
              instructions:
                'Write use(mod, name) returning the export called name from a module object, or undefined when the module does not export it. This is what a named import does.',
              languages: ['typescript'],
              starterCode: {
                typescript: `const mathModule = {
  add: (a: number, b: number) => a + b,
  multiply: (a: number, b: number) => a * b,
}

// Return the export called name, or undefined.
function use(mod: Record<string, unknown>, name: string): unknown {
  return undefined
}
`,
              },
              tests: [
                {
                  id: 'ts-l23-t1',
                  label: 'finds an exported function',
                  body: "return typeof use(mathModule, 'add') === 'function'",
                },
                {
                  id: 'ts-l23-t2',
                  label: 'the imported function still works',
                  body: "const add = use(mathModule, 'add'); return add(2, 3) === 5",
                },
                {
                  id: 'ts-l23-t3',
                  label: 'finds a second export',
                  body: "const multiply = use(mathModule, 'multiply'); return multiply(4, 5) === 20",
                },
                {
                  id: 'ts-l23-t4',
                  label: 'a missing export is undefined',
                  body: "return use(mathModule, 'divide') === undefined",
                },
              ],
              hints: [
                'The module is an object whose keys are the exported names.',
                'Reading a key that does not exist already gives undefined in JavaScript.',
                'return mod[name] is the whole function — the missing-name case is handled for free.',
              ],
              solution: {
                typescript: `const mathModule = {
  add: (a: number, b: number) => a + b,
  multiply: (a: number, b: number) => a * b,
}

function use(mod: Record<string, unknown>, name: string): unknown {
  return mod[name]
}
`,
              },
              testNotes:
                'The tests then call the imported function, which proves you returned the real export rather than a copy that lost its behaviour.',
            },
          },
        ],
      },
      {
        id: 'ts-l24',
        title: 'Declaration files and declare',
        description: '.d.ts files, ambient modules, and typing third-party JavaScript.',
        duration: 5,
        objectives: [
          'Write a declaration file for a plain JavaScript module',
          'Use declare module to augment an existing package',
          'Generate declarations with declaration: true',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-ts-l24',
          title: 'Declaration files and declare quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l24-q1',
              type: 'true-false',
              prompt: 'A .d.ts file can contain implementation code.',
              answer: false,
              explanation: 'Declaration files (.d.ts) contain only type information. No implementation code is allowed.',
            },
            {
              id: 'quiz-ts-l24-q2',
              type: 'blank',
              prompt: 'Which tsconfig option generates .d.ts files alongside .js output?',
              answers: [
                'declaration: true',
                'declaration',
                '"declaration": true',
              ],
              explanation: 'declaration: true emits declaration files. Combine with declarationMap for source maps.',
            },
            {
              id: 'quiz-ts-l24-q3',
              type: 'multiple-choice',
              prompt: 'What does `declare module "legacy-widget" { ... }` add to a project?',
              options: [
                'A runtime implementation of the package',
                'A type description the compiler uses for that package',
                'A compiled JavaScript bundle',
                'A new dependency in package.json',
              ],
              answer: 1,
              explanation: 'The `declare module` block attaches types to a package that ships none. It creates no values and installs nothing.',
            },
            {
              id: 'quiz-ts-l24-q4',
              type: 'multiple-choice',
              prompt: 'A declaration promises `unmount()`, but the JavaScript never implements it. What happens when the code runs?',
              options: [
                'The compiler generates the missing function',
                'The declaration file throws at load time',
                'Nothing, the value is inferred from the .d.ts file',
                'The call fails at runtime because declarations create no values',
              ],
              answer: 3,
              explanation: 'A declaration is only a promise about a shape. If the real JavaScript lacks the member, the compile-time check passes and the failure moves to runtime.',
            },
            {
              id: 'quiz-ts-l24-q5',
              type: 'identify-error',
              prompt: 'What is wrong with this declaration file?',
              code: 'declare module \'legacy-widget\' {\n  export function mount(el: Element): void {\n    console.log(el)\n  }\n}',
              options: [
                'Nothing is wrong',
                'A declaration file cannot contain a function body',
                'Element cannot be used in a declaration file',
                'declare module requires a default export',
              ],
              answer: 1,
              explanation: '`.d.ts` files describe shapes and contain no implementations. The fix is to end the signature at `: void` and leave the body to the real JavaScript.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l24-d1',
            title: 'A declaration describes, it does not create',
            body: 'A `.d.ts` file adds types for JavaScript that already runs. **The declaration adds nothing at runtime** — it only tells the compiler what shape to expect. Try calling a name the declaration promises and one it does not.',
            html: `<button id="mount">Call declared mount()</button>
<button id="missing">Use a name with no runtime value</button>
<pre id="out">Press a button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `// This is the real JavaScript the .d.ts file describes:
const legacyWidget = {
  mount: function (el) { return 'mounted into ' + el },
  version: '2.1.0',
}

const out = document.querySelector('#out')

document.querySelector('#mount').addEventListener('click', function () {
  out.textContent = legacyWidget.mount('#app') + ' (version ' + legacyWidget.version + ')'
})

document.querySelector('#missing').addEventListener('click', function () {
  // A declaration could name unmount(), but nothing implemented it:
  out.textContent = 'a declaration can describe unmount(), but at runtime it is ' + String(legacyWidget.unmount)
})`,
            height: 180,
          },
          {
            type: 'text',
            id: 'ts-l24-intro',
            body: '**Declaration files and declare.** Plenty of JavaScript ships without types — an old library, a build script, a browser API. A *declaration file* is a file that contains types and no implementation, telling the compiler what that JavaScript looks like. The extension is `.d.ts` and the keyword is `declare`.',
          },
          {
            type: 'text',
            id: 'ts-l24-b2',
            body: 'Inside a `.d.ts` file you describe shapes — function signatures, constants, classes — with no bodies. `declare module ’some-package’` wraps that description in the module it belongs to, so your normal `import` statements find it. Many packages ship a `.d.ts` generated by the compiler itself.',
          },
          {
            type: 'heading',
            id: 'ts-l24-h1',
            level: 2,
            body: 'Typing JavaScript you did not write',
          },
          {
            type: 'code',
            id: 'ts-l24-code',
            language: 'typescript',
            title: 'an ambient declaration',
            code: `// types/legacy-widget.d.ts — types only, no implementation.
declare module 'legacy-widget' {
  export function mount(el: Element): void
  export const version: string
}

// Elsewhere, your normal import now type-checks:
import { mount, version } from 'legacy-widget'
mount(document.body)

// Your own build can generate declarations too:
// { "compilerOptions": { "declaration": true } }

// A global value declared by a script tag:
declare const APP_VERSION: string`,
          },
          {
            type: 'list',
            id: 'ts-l24-list',
            style: 'bullet',
            items: [
              'A `.d.ts` file holds types only — no function bodies, no runtime values.',
              '`declare module ’name’` attaches a type description to a package that has none.',
              '`declaration: true` makes the compiler emit `.d.ts` files next to your output.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l24-warn',
            title: 'A declaration is a promise you must keep',
            body: 'Writing `declare module ’legacy-widget’` tells the compiler the shape exists; it does not create it. If the description is wrong, the compiler will happily trust you and the bug moves to run time.',
          },
          {
            type: 'heading',
            id: 'ts-l24-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l24-b3',
            body: 'Declaration files are just text, so you can read them. Pull the package name out of a `declare module` line.',
          },
          {
            type: 'exercise',
            id: 'ts-l24-x1',
            exercise: {
              id: 'ex-ts-l24',
              instructions:
                'Write moduleName(declaration) returning the package name written after declare module, or null when the text has no such declaration. Quotes may be single or double.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Return the name inside declare module "name", or null.
function moduleName(declaration: string): string | null {
  return null
}
`,
              },
              tests: [
                {
                  id: 'ts-l24-t1',
                  label: 'reads a double-quoted name',
                  body: "return moduleName('declare module \"legacy-widget\" { }') === 'legacy-widget'",
                },
                {
                  id: 'ts-l24-t2',
                  label: 'reads a single-quoted name',
                  body: "return moduleName(\"declare module 'foo' { const x: number }\") === 'foo'",
                },
                {
                  id: 'ts-l24-t3',
                  label: 'handles a scoped package name',
                  body: "return moduleName('declare module \"@scope/thing\" {}') === '@scope/thing'",
                },
                {
                  id: 'ts-l24-t4',
                  label: 'returns null when there is no declaration',
                  body: "return moduleName('const x = 1') === null",
                },
              ],
              hints: [
                'A regular expression is the shortest path: match declare module, then a quoted name.',
                'The pattern /declare module ["\\\']([^"\\\']+)["\\\']/ captures the name and allows either quote.',
                'Return the first capture, or null when the match fails: const m = declaration.match(...); return m ? m[1] : null.',
              ],
              solution: {
                typescript: `function moduleName(declaration: string): string | null {
  const match = declaration.match(/declare module ["']([^"']+)["']/)
  return match ? match[1] ?? null : null
}
`,
              },
              testNotes:
                'Both quote styles and the no-match case are checked, so a hand-rolled substring search that only handles one style will fail.',
            },
          },
        ],
      },
      {
        id: 'ts-l25',
        title: 'Publishing a typed package',
        description: 'exports, types field, and testing your types with attw or tsc --noEmit.',
        duration: 5,
        objectives: [
          'Configure package.json for dual CJS/ESM with types',
          'Add a types or typesVersions field',
          'Verify the published types are consumable',
        ],
        xp: 30,
        quiz: {
          id: 'quiz-ts-l25',
          title: 'Publishing a typed package quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l25-q1',
              type: 'multiple-choice',
              prompt: 'What does "moduleResolution": "node16" enable?',
              options: [
                'CommonJS require only',
                'ESM imports with package.json exports support',
                'AMD module loading',
                'SystemJS module loading',
              ],
              answer: 1,
              explanation: 'node16 (and nodenext) resolution understands package.json "exports" and "imports" fields for proper ESM support.',
            },
            {
              id: 'quiz-ts-l25-q2',
              type: 'identify-error',
              prompt: 'What is wrong with this package.json for a typed package?',
              code: '{\n  "name": "my-lib",\n  "main": "dist/index.js",\n  "types": "dist/index.d.ts"\n}',
              options: [
                'Nothing is wrong',
                'Missing "exports" field for modern resolution',
                'types must be "typings"',
                'main and types cannot be in the same folder',
              ],
              answer: 1,
              explanation: 'Modern packages should use "exports" with conditional exports for proper dual CJS/ESM support with types.',
            },
            {
              id: 'quiz-ts-l25-q3',
              type: 'multiple-choice',
              prompt: 'Which field tells the compiler where the declarations for the entry point live?',
              options: [
                '`main`',
                '`module`',
                '`types`',
                '`browser`',
              ],
              answer: 2,
              explanation: '`types` points at the generated `.d.ts` for the package entry. `main` points the runtime at the JavaScript instead.',
            },
            {
              id: 'quiz-ts-l25-q4',
              type: 'multiple-choice',
              prompt: 'Before publishing, `tsc --noEmit` checks the project\'s own types. Which tool simulates a consumer install and fails when the published types cannot be resolved?',
              options: [
                '`attw --pack .`',
                '`tsc --build`',
                '`eslint --fix`',
                '`npm dedupe`',
              ],
              answer: 0,
              explanation: '`attw` (Are The Types Wrong) packs the package and resolves it the way a consumer would, catching export-map and declaration mistakes that a local build misses.',
            },
            {
              id: 'quiz-ts-l25-q5',
              type: 'multiple-choice',
              prompt: 'A package has both `main` and an `exports` map. Which one do modern resolvers use?',
              options: [
                '`main` always wins',
                '`exports`, so its paths must agree with `main`',
                '`types` wins over both',
                'Neither; the bundler guesses',
              ],
              answer: 1,
              explanation: 'Modern Node and bundler resolvers consult `exports` first, so a stale path there overrides `main` and breaks consumers even though the package looks correct.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l25-d1',
            title: 'The same entry, two consumers',
            body: 'A package points the **runtime** at JavaScript and the **compiler** at declarations. Resolve the entries map from each side to see which file each consumer receives. Types are erased before this runs, so the demo reads the same paths a resolver would.',
            html: `<button id="types">Resolve for the compiler</button>
<button id="default">Resolve for the runtime</button>
<pre id="out">Press a button to resolve the package entry.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `const exportsMap = {
  types: './dist/index.d.ts',
  default: './dist/index.js',
}

const out = document.querySelector('#out')

document.querySelector('#types').addEventListener('click', function () {
  out.textContent = 'the compiler reads ' + exportsMap.types
})

document.querySelector('#default').addEventListener('click', function () {
  out.textContent = 'the runtime loads ' + exportsMap.default
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l25-intro',
            body: '**Publishing a typed package.** A published package has two audiences: the runtime, which loads your JavaScript, and the compiler, which reads your types. `package.json` is where you point each of them at the right file — `main` for the entry point and `types` for its declarations.',
          },
          {
            type: 'text',
            id: 'ts-l25-b2',
            body: 'Modern packages add an `exports` map, which lets one package expose different files to different consumers — an ESM build, a CommonJS build, and the types for each. Getting this right matters because a wrong path here is the difference between a package that type-checks in someone else’s project and one that does not.',
          },
          {
            type: 'heading',
            id: 'ts-l25-h1',
            level: 2,
            body: 'The fields that matter',
          },
          {
            type: 'code',
            id: 'ts-l25-code',
            language: 'typescript',
            title: 'package.json for a typed library',
            code: `{
  "name": "tiny-math",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}

// Check the shapes before publishing:
// tsc --noEmit            → do the project's own types hold together?
// attw --pack .           → will consumers resolve the types correctly?`,
          },
          {
            type: 'list',
            id: 'ts-l25-list',
            style: 'bullet',
            items: [
              '`types` points at the generated `.d.ts` for the entry point.',
              '`exports` takes precedence for modern resolvers, so keep its paths consistent with `main`.',
              'Tools such as `attw` simulate a consumer install and fail if the types cannot be found.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l25-tip',
            title: 'Publish, then import your own package',
            body: 'The cheapest test of a package’s types is a throwaway project that installs it and tries to import it. If the import resolves and the types appear, consumers will have the same experience.',
          },
          {
            type: 'heading',
            id: 'ts-l25-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l25-b3',
            body: 'package.json is data, so shape it as an object and check your understanding of where each path goes.',
          },
          {
            type: 'exercise',
            id: 'ts-l25-x1',
            exercise: {
              id: 'ex-ts-l25',
              instructions:
                'Fill in packageJson: main is dist/index.js, types is dist/index.d.ts, and exports maps "." to an object whose types is ./dist/index.d.ts and default is ./dist/index.js.',
              languages: ['typescript'],
              starterCode: {
                typescript: `const packageJson = {
  name: 'tiny-math',
  main: '',
  types: '',
  exports: {
    '.': {
      types: '',
      default: '',
    },
  },
}
`,
              },
              tests: [
                { id: 'ts-l25-t1', label: 'main points at the JavaScript entry', body: "return packageJson.main === 'dist/index.js'" },
                {
                  id: 'ts-l25-t2',
                  label: 'types points at the declarations',
                  body: "return packageJson.types === 'dist/index.d.ts'",
                },
                {
                  id: 'ts-l25-t3',
                  label: 'exports "." resolves to the declaration file',
                  body: "return packageJson.exports['.'].types === './dist/index.d.ts'",
                },
                {
                  id: 'ts-l25-t4',
                  label: 'exports "." default resolves to the entry',
                  body: "return packageJson.exports['.'].default === './dist/index.js'",
                },
              ],
              hints: [
                'main and types are plain strings relative to the package root.',
                'The exports entry is an object with types and default keys.',
                'Note the leading ./ inside exports: "./dist/index.js" and "./dist/index.d.ts".',
              ],
              solution: {
                typescript: `const packageJson = {
  name: 'tiny-math',
  main: 'dist/index.js',
  types: 'dist/index.d.ts',
  exports: {
    '.': {
      types: './dist/index.d.ts',
      default: './dist/index.js',
    },
  },
}
`,
              },
              testNotes:
                'The exports checks are exact down to the leading ./ — the detail that most often breaks a package for its consumers.',
            },
          },
        ],
      },
    ],
  },
]
