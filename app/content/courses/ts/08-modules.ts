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
        content: [
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-ts-s8',
      title: 'Modules & Declarations check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s8-q1',
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
          id: 'quiz-ts-s8-q2',
          type: 'true-false',
          prompt: 'A .d.ts file can contain implementation code.',
          answer: false,
          explanation: 'Declaration files (.d.ts) contain only type information. No implementation code is allowed.',
        },
        {
          id: 'quiz-ts-s8-q3',
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
          id: 'quiz-ts-s8-q4',
          type: 'blank',
          prompt: 'Which tsconfig option generates .d.ts files alongside .js output?',
          answers: ['declaration: true', 'declaration', '"declaration": true'],
          explanation: 'declaration: true emits declaration files. Combine with declarationMap for source maps.',
        },
        {
          id: 'quiz-ts-s8-q5',
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
      ],
    },
  },
]
