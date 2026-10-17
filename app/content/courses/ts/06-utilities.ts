import type { Section } from '~/types/content'

export const tsUtilitySections: Section[] = [
  {
    id: 'ts-s6',
    title: 'Utility Types',
    description: 'The built-in type transformers that save you from writing boilerplate.',
    lessons: [
      {
        id: 'ts-l17',
        title: 'Partial, Required, Readonly',
        description: 'Making all properties optional, required, or readonly at once.',
        duration: 5,
        objectives: [
          'Use Partial<T> for a patch object',
          'Use Required<T> to remove optionality',
          'Use Readonly<T> to freeze an object shape',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'ts-l17-intro',
            body: '**Partial, Required, Readonly.** The built-in utility types transform an existing type into a new one, so you never hand-write a near-duplicate. `Partial<User>` turns every property optional — the shape of a patch. `Required` does the reverse; `Readonly` makes every property unassignable.',
          },
          {
            type: 'text',
            id: 'ts-l17-b2',
            body: 'These are not runtime helpers; they rewrite types at compile time and vanish with the rest of the types. But they describe a runtime pattern you will write constantly: take a full object, accept a partial one, and merge them so the full shape survives.',
          },
          {
            type: 'heading',
            id: 'ts-l17-h1',
            level: 2,
            body: 'The same interface, three views of it',
          },
          {
            type: 'code',
            id: 'ts-l17-code',
            language: 'typescript',
            title: 'Partial, Required and Readonly',
            code: `interface User {
  name: string
  age: number
}

type Patch = Partial<User>        // name? and age? — both optional
type Complete = Required<Patch>   // back to required
type Frozen = Readonly<User>      // properties cannot be reassigned

const patch: Patch = { age: 30 }  // name may be omitted

// The pattern these describe — merge a patch over a full object:
function withDefaults(partial: Partial<User>, defaults: User): User {
  return { ...defaults, ...partial }
}`,
          },
          {
            type: 'list',
            id: 'ts-l17-list',
            style: 'bullet',
            items: [
              '`Partial<T>` is the type for "some of these fields" — request bodies, options, patches.',
              '`Required<T>` composes the other way, removing `?` from every property.',
              '`Readonly<T>` blocks reassignment at compile time; it is not a runtime freeze.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l17-tip',
            title: 'Spread order is the whole trick',
            body: 'In `{ ...defaults, ...partial }` the later object wins. Put the defaults first and the patch second so a supplied value overrides the fallback — swap them and every default clobbers the real data.',
          },
          {
            type: 'heading',
            id: 'ts-l17-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l17-b3',
            body: 'Implement the merge that `Partial` describes: fill any missing value from a set of defaults, without changing the defaults object.',
          },
          {
            type: 'exercise',
            id: 'ts-l17-x1',
            exercise: {
              id: 'ex-ts-l17',
              instructions:
                'Write withDefaults(partial, defaults) returning a new object: values from partial win, and any key it omits falls back to defaults. Do not modify defaults.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Merge: partial wins, defaults fill the gaps.
function withDefaults(partial: object, defaults: object): object {
  return { ...partial }
}
`,
              },
              tests: [
                {
                  id: 'ts-l17-t1',
                  label: 'supplied values win, missing keys fall back',
                  body: "const r = withDefaults({ a: 1 }, { a: 0, b: 2 }); return r.a === 1 && r.b === 2",
                },
                {
                  id: 'ts-l17-t2',
                  label: 'an empty patch returns the defaults',
                  body: "const r = withDefaults({}, { a: 1, b: 2 }); return r.a === 1 && r.b === 2 && Object.keys(r).length === 2",
                },
                {
                  id: 'ts-l17-t3',
                  label: 'a full patch overrides everything',
                  body: "const r = withDefaults({ a: 9, b: 8 }, { a: 0, b: 0 }); return r.a === 9 && r.b === 8",
                },
                {
                  id: 'ts-l17-t4',
                  label: 'defaults is not modified',
                  body: "const defaults = { a: 0, b: 2 }; withDefaults({ a: 1 }, defaults); return defaults.a === 0 && defaults.b === 2",
                },
              ],
              hints: [
                'You want a brand new object built from two others, with partial taking precedence.',
                'Spread both objects into a new one, defaults first and partial second.',
                'return { ...defaults, ...partial } — because object spread copies values, defaults is left untouched.',
              ],
              solution: {
                typescript: `function withDefaults(partial: object, defaults: object): object {
  return { ...defaults, ...partial }
}
`,
              },
              testNotes:
                'The last check re-reads the defaults object after the call, so an implementation that mutates instead of returning a new object is caught.',
            },
          },
        ],
      },
      {
        id: 'ts-l18',
        title: 'Pick, Omit, Record',
        description: 'Selecting keys, dropping keys, and mapping keys to a uniform value type.',
        duration: 5,
        objectives: [
          'Use Pick<T, K> to keep only some properties',
          'Use Omit<T, K> to remove properties',
          'Use Record<K, V> for dictionary-like objects',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'ts-l18-intro',
            body: '**Pick, Omit, Record.** Where `Partial` changes optionality, these three change which keys exist. `Pick<User, ’name’>` keeps only the named keys; `Omit<User, ’age’>` keeps everything except them; `Record<string, number>` builds a dictionary whose keys and values you choose.',
          },
          {
            type: 'text',
            id: 'ts-l18-b2',
            body: 'Omit is not magic — it is Pick over the complement: `Omit<T, K>` is `Pick<T, Exclude<keyof T, K>>`. And these describe real functions: a client that must not send an `id` uses `Omit` on the type, and a `pick` helper that copies a subset is the runtime counterpart.',
          },
          {
            type: 'heading',
            id: 'ts-l18-h1',
            level: 2,
            body: 'Choose the keys',
          },
          {
            type: 'code',
            id: 'ts-l18-code',
            language: 'typescript',
            title: 'Pick, Omit and Record',
            code: `interface User {
  id: number
  name: string
  age: number
}

type NameOnly = Pick<User, 'name'>       // { name: string }
type NewUser = Omit<User, 'id'>          // { name: string; age: number }

type Scores = Record<string, number>     // every string key maps to number
const scores: Scores = { ada: 10 }

// The runtime version of Pick: copy the chosen keys only.
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>
  for (const key of keys) result[key] = obj[key]
  return result
}`,
          },
          {
            type: 'list',
            id: 'ts-l18-list',
            style: 'bullet',
            items: [
              '`Pick<T, K>` is how you hand part of an object to a function that only needs that part.',
              '`Omit<T, K>` is the safer choice for a create form, where the server assigns the id.',
              '`Record<K, V>` is an object type with uniform values — the typed shape of a lookup table.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l18-warn',
            title: 'Pick and Omit are compile-time only',
            body: 'They change what the compiler allows, not what the object contains at runtime. A `pick` helper still has to copy the keys by hand — and if you forget one, the type will not save you, because the type is not running.',
          },
          {
            type: 'heading',
            id: 'ts-l18-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l18-b3',
            body: 'Write the runtime counterpart of `Pick`: copy only the keys you are asked for.',
          },
          {
            type: 'exercise',
            id: 'ts-l18-x1',
            exercise: {
              id: 'ex-ts-l18',
              instructions:
                'Write pick(obj, keys) returning a new object that contains only the listed keys, with their values from obj. Ignore keys that are not in obj.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Copy only the requested keys into a new object.
function pick<T extends object>(obj: T, keys: string[]): object {
  return { ...obj }
}
`,
              },
              tests: [
                {
                  id: 'ts-l18-t1',
                  label: 'keeps only the requested keys',
                  body: "return JSON.stringify(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])) === '{\"a\":1,\"c\":3}'",
                },
                {
                  id: 'ts-l18-t2',
                  label: 'an empty key list gives an empty object',
                  body: "return Object.keys(pick({ a: 1, b: 2 }, [])).length === 0",
                },
                {
                  id: 'ts-l18-t3',
                  label: 'a single key gives a one-key object',
                  body: "const r = pick({ a: 1, b: 2 }, ['b']); return Object.keys(r).length === 1 && r.b === 2",
                },
                {
                  id: 'ts-l18-t4',
                  label: 'the original object is unmodified',
                  body: "const source = { a: 1, b: 2 }; pick(source, ['a']); return source.b === 2 && Object.keys(source).length === 2",
                },
              ],
              hints: [
                'Start with an empty object and add keys one at a time.',
                'Loop over the keys array and copy each value: result[key] = obj[key].',
                'Return the new object when the loop finishes — do not return obj itself.',
              ],
              solution: {
                typescript: `function pick<T extends object>(obj: T, keys: string[]): object {
  const result: Record<string, unknown> = {}
  for (const key of keys) {
    if (key in obj) result[key] = (obj as Record<string, unknown>)[key]
  }
  return result
}
`,
              },
              testNotes:
                'The empty-keys and single-key checks catch an implementation that copies everything and only pretends to filter.',
            },
          },
        ],
      },
      {
        id: 'ts-l19',
        title: 'Exclude, Extract, NonNullable, ReturnType',
        description: 'Filtering unions, removing null/undefined, and extracting function return types.',
        duration: 5,
        objectives: [
          'Filter a union with Exclude and Extract',
          'Strip null and undefined with NonNullable',
          'Extract the return type of a function with ReturnType',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'ts-l19-intro',
            body: '**Exclude, Extract, NonNullable, ReturnType.** The last family works on unions and functions. `Exclude` removes members of a union; `Extract` keeps only those that match; `NonNullable` strips `null` and `undefined` in one step. These are the building blocks of the conditional types you met earlier.',
          },
          {
            type: 'text',
            id: 'ts-l19-b2',
            body: '`ReturnType` and `Parameters` reach into a function type and pull out a piece of it — useful when you want to reuse a function’s output type without importing it by name. Every one of these is a type, so their runtime echoes are ordinary functions that produce a filtered value.',
          },
          {
            type: 'heading',
            id: 'ts-l19-h1',
            level: 2,
            body: 'Filtering unions and reading functions',
          },
          {
            type: 'code',
            id: 'ts-l19-code',
            language: 'typescript',
            title: 'Exclude, Extract, NonNullable, ReturnType',
            code: `type Mixed = string | number | null | undefined

type Clean = NonNullable<Mixed>          // string | number
type OnlyString = Extract<Mixed, string> // string
type NoString = Exclude<Mixed, string>   // number | null | undefined

function add(a: number, b: number) {
  return a + b
}

type Sum = ReturnType<typeof add>        // number
type Args = Parameters<typeof add>       // [number, number]

// NonNullable has a runtime echo: drop the empty values.
function compact<T>(items: (T | null | undefined)[]): T[] {
  return items.filter((item): item is T => item !== null && item !== undefined)
}`,
          },
          {
            type: 'list',
            id: 'ts-l19-list',
            style: 'bullet',
            items: [
              '`Exclude<T, U>` and `Extract<T, U>` pull a union apart from opposite directions.',
              '`NonNullable<T>` is `Exclude<T, null | undefined>` with a friendlier name.',
              '`ReturnType<typeof f>` gives the return type of `f` without repeating it by hand.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l19-tip',
            title: 'Derive, do not duplicate',
            body: 'When a function’s result type is needed elsewhere, write `ReturnType<typeof fetchUser>` instead of retyping the shape. If the function changes, the type follows automatically.',
          },
          {
            type: 'heading',
            id: 'ts-l19-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l19-b3',
            body: 'Build the runtime version of `NonNullable`: a function that returns a list with the empty values taken out.',
          },
          {
            type: 'exercise',
            id: 'ts-l19-x1',
            exercise: {
              id: 'ex-ts-l19',
              instructions:
                'Write compact(items) returning a new array with every null and undefined removed. Keep the order of the remaining items.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Remove null and undefined, keeping the order.
function compact(items: (number | null | undefined)[]): number[] {
  return items.slice()
}
`,
              },
              tests: [
                {
                  id: 'ts-l19-t1',
                  label: 'drops null and undefined, keeps order',
                  body: 'return JSON.stringify(compact([1, null, 2, undefined, 3])) === "[1,2,3]"',
                },
                {
                  id: 'ts-l19-t2',
                  label: 'an all-empty array becomes empty',
                  body: 'return compact([null, undefined]).length === 0',
                },
                {
                  id: 'ts-l19-t3',
                  label: 'a clean array is unchanged',
                  body: 'return JSON.stringify(compact([4, 5])) === "[4,5]"',
                },
                {
                  id: 'ts-l19-t4',
                  label: 'zero is kept (it is not empty)',
                  body: 'return JSON.stringify(compact([0, null, 1])) === "[0,1]"',
                },
              ],
              hints: [
                'filter builds a new array from the items that pass a test.',
                'The test is: the item is neither null nor undefined.',
                'Remember that 0 is a real value — check for null/undefined specifically, not for truthiness.',
              ],
              solution: {
                typescript: `function compact(items: (number | null | undefined)[]): number[] {
  return items.filter((item): item is number => item !== null && item !== undefined)
}
`,
              },
              testNotes:
                'The final check keeps 0. A filter written as if (item) would drop it, which is the classic bug this exercise is about.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-ts-s6',
      title: 'Utility Types check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-ts-s6-q1',
          type: 'multiple-choice',
          prompt: 'What does Partial<User> do?',
          options: [
            'Makes all properties required',
            'Makes all properties optional',
            'Removes all properties',
            'Makes all properties readonly',
          ],
          answer: 1,
          explanation: 'Partial<T> maps all properties of T to optional. Useful for update/patch objects.',
        },
        {
          id: 'quiz-ts-s6-q2',
          type: 'true-false',
          prompt: 'Omit<T, K> and Pick<T, K> are opposites.',
          answer: true,
          explanation: 'Pick keeps the listed keys; Omit removes the listed keys. Omit<T, K> === Pick<T, Exclude<keyof T, K>>.',
        },
        {
          id: 'quiz-ts-s6-q3',
          type: 'multiple-choice',
          prompt: 'What does Record<string, number> create?',
          options: [
            'An object with string keys and number values',
            'A tuple of strings and numbers',
            'A union of string and number',
            'An array of objects',
          ],
          answer: 0,
          explanation: 'Record<K, V> creates an object type where all keys are of type K and all values are of type V.',
        },
        {
          id: 'quiz-ts-s6-q4',
          type: 'blank',
          prompt: 'Which utility type removes null and undefined from a union?',
          answers: ['NonNullable<T>', 'NonNullable'],
          explanation: 'NonNullable<T> excludes null and undefined from T.',
        },
        {
          id: 'quiz-ts-s6-q5',
          type: 'multiple-choice',
          prompt: 'What is the type of ReturnType<() => string>?',
          options: ['string', '() => string', 'void', 'never'],
          answer: 0,
          explanation: 'ReturnType extracts the return type of a function type. For () => string, it is string.',
        },
      ],
    },
  },
]
