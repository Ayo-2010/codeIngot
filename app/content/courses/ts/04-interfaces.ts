import type { Section } from '~/types/content'

export const tsInterfacesSections: Section[] = [
  {
    id: 'ts-s4',
    title: 'Interfaces and Type Aliases',
    description: 'Defining reusable shapes, extending interfaces, and when to prefer type over interface.',
    lessons: [
      {
        id: 'ts-l11',
        title: 'Interfaces vs type aliases',
        description: 'The two ways to name a shape, and the practical differences between them.',
        duration: 5,
        objectives: [
          'Define an interface and a type alias for the same shape',
          'List the features only interfaces have (declaration merging)',
          'List the features only type aliases have (unions, primitives)',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-ts-l11',
          title: 'Interfaces vs type aliases quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l11-q1',
              type: 'blank',
              prompt: 'Which keyword defines a type alias?',
              answers: [
                'type',
                'Type',
              ],
              explanation: 'type MyType = { ... } defines a type alias.',
            },
            {
              id: 'quiz-ts-l11-q2',
              type: 'identify-error',
              prompt: 'What is wrong with this type alias?',
              code: 'type EventHandler = (event: MouseEvent) => void\n  | (event: KeyboardEvent) => void',
              options: [
                'Nothing is wrong',
                'Function types cannot be unioned',
                'Parentheses are needed around the union',
                'void cannot be used in union types',
              ],
              answer: 2,
              explanation: 'Function types in a union need parentheses: type EventHandler = ((event: MouseEvent) => void) | ((event: KeyboardEvent) => void).',
            },
            {
              id: 'quiz-ts-l11-q3',
              type: 'multiple-choice',
              prompt: 'For a plain object shape, how do `interface User { name: string }` and `type User = { name: string }` compare?',
              options: [
                'The interface is checked at runtime; the alias is not',
                'They describe the same shape with the same capability',
                'Only the alias can be used as a function parameter type',
                'The interface can hold primitives; the alias cannot',
              ],
              answer: 1,
              explanation: 'For object shapes the two spellings are interchangeable; both are erased at compile time. The real differences appear with merging and with naming unions or primitives.',
            },
            {
              id: 'quiz-ts-l11-q4',
              type: 'multiple-choice',
              prompt: 'Which can a type alias name that an interface cannot?',
              options: [
                'An object with optional properties',
                'An object with methods',
                'A generic object shape',
                'A union like `string | number`',
              ],
              answer: 3,
              explanation: 'An interface describes an object type. A type alias can name anything a type can be, including unions, tuples and primitives.',
            },
            {
              id: 'quiz-ts-l11-q5',
              type: 'multiple-choice',
              prompt: 'What JavaScript does an interface produce when the file is compiled?',
              options: [
                'A class with the same name',
                'A runtime object describing the keys',
                'Nothing — the interface is erased',
                'A `Symbol` used for property checks',
              ],
              answer: 2,
              explanation: 'Interfaces are purely type-level, so they vanish in the emitted JavaScript. Only the values you wrote remain, which is why an interface cannot be constructed.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l11-d1',
            title: 'The shape lives on in the value',
            body: 'An interface disappears at compile time, yet the object it describes does not: `describe` still reads `name` and `age` off whatever you hand it. The demo builds the values and runs the same consumer for both.',
            html: `<button id="go">Describe two users</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `function describe(user) {
  return user.name + ' (' + user.age + ')'
}

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  const ada = { name: 'Ada', age: 36 }
  const grace = { name: 'Grace', age: 45 }
  out.textContent = [
    describe(ada),
    describe(grace),
    'keys: ' + Object.keys(ada).join(', '),
  ].join('\n')
})`,
            height: 175,
          },
          {
            type: 'text',
            id: 'ts-l11-intro',
            body: '**Interfaces vs type aliases.** There are two ways to name a shape in TypeScript, and for object shapes they are nearly interchangeable. `interface User { name: string }` and `type User = { name: string }` describe exactly the same thing, and both can be used anywhere a type is expected.',
          },
          {
            type: 'text',
            id: 'ts-l11-b2',
            body: 'The differences are small but real. An interface can be opened again and added to — that is declaration merging. A type alias can name anything, including a union, a tuple or a primitive; an interface can only describe an object. When the two are equal, reach for the interface for public object shapes and the alias for everything else.',
          },
          {
            type: 'heading',
            id: 'ts-l11-h1',
            level: 2,
            body: 'The same shape, two spellings',
          },
          {
            type: 'code',
            id: 'ts-l11-code',
            language: 'typescript',
            title: 'interface and type side by side',
            code: `interface User {
  name: string
  age: number
}

// The identical shape as a type alias:
type Person = { name: string; age: number }

function describe(user: User): string {
  return user.name + ' (' + user.age + ')'
}

// Only a type alias can name a union, a tuple or a primitive:
type Id = string | number
type Pair = [number, number]
type Name = string`,
          },
          {
            type: 'list',
            id: 'ts-l11-list',
            style: 'bullet',
            items: [
              'For plain object shapes the choice is style, not capability — pick one and stay consistent.',
              'An **interface** may be declared more than once; the declarations merge.',
              'A **type alias** may name a union (`string | number`), a tuple, or a primitive, which an interface cannot.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l11-tip',
            title: 'A rule of thumb that avoids bikeshedding',
            body: 'Use `interface` for objects that other code will consume or extend, and `type` for everything else — unions, function types, and short aliases. Both compile to nothing, so this is a readability decision, not a performance one.',
          },
          {
            type: 'heading',
            id: 'ts-l11-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l11-b3',
            body: 'Create an object that matches a named shape, then write the function that consumes it.',
          },
          {
            type: 'exercise',
            id: 'ts-l11-x1',
            exercise: {
              id: 'ex-ts-l11',
              instructions:
                "Write makeUser(name, age) returning an object with those two properties, then label(user) returning the text name followed by space age in parentheses — for example 'Ada (36)'.",
              languages: ['typescript'],
              starterCode: {
                typescript: `interface User {
  name: string
  age: number
}

// Return an object that matches User.
function makeUser(name: string, age: number): User {
  return { name: '', age: 0 }
}

// Return "name (age)", e.g. "Ada (36)".
function label(user: User): string {
  return ''
}
`,
              },
              tests: [
                {
                  id: 'ts-l11-t1',
                  label: 'makeUser builds the object from its arguments',
                  body: "const u = makeUser('Ada', 36); return u.name === 'Ada' && u.age === 36",
                },
                {
                  id: 'ts-l11-t2',
                  label: 'label formats a user',
                  body: "return label({ name: 'Grace', age: 45 }) === 'Grace (45)'",
                },
                {
                  id: 'ts-l11-t3',
                  label: 'label works with makeUser output',
                  body: "return label(makeUser('Ada', 36)) === 'Ada (36)'",
                },
              ],
              hints: [
                'makeUser already receives name and age — return an object built from them.',
                'label receives a user object, so read user.name and user.age.',
                'Join the parts exactly: user.name + " (" + user.age + ")".',
              ],
              solution: {
                typescript: `interface User {
  name: string
  age: number
}

function makeUser(name: string, age: number): User {
  return { name: name, age: age }
}

function label(user: User): string {
  return user.name + ' (' + user.age + ')'
}
`,
              },
              testNotes:
                'The tests read the properties off your objects, which is exactly what the interface promises they will have.',
            },
          },
        ],
      },
      {
        id: 'ts-l12',
        title: 'Extending and merging interfaces',
        description: 'Building new interfaces from old ones, and how declaration merging works.',
        duration: 5,
        objectives: [
          'Extend an interface with extends',
          'Merge two interfaces with the same name',
          'Explain when merging is useful (augmenting library types)',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-ts-l12',
          title: 'Extending and merging interfaces quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l12-q1',
              type: 'multiple-choice',
              prompt: 'Which feature is ONLY available with interfaces, not type aliases?',
              options: [
                'Extending',
                'Declaration merging',
                'Union types',
                'Generic parameters',
              ],
              answer: 1,
              explanation: 'Declaration merging (multiple interface declarations with the same name combining) only works with interfaces.',
            },
            {
              id: 'quiz-ts-l12-q2',
              type: 'multiple-choice',
              prompt: 'What does interface B extends A do?',
              options: [
                'Copies all members of A into B',
                'Creates a new interface with A members plus B own members',
                'Makes B a subclass of A',
                'Merges B into A',
              ],
              answer: 1,
              explanation: 'extends creates a new interface that includes all members from the parent plus its own members.',
            },
            {
              id: 'quiz-ts-l12-q3',
              type: 'multiple-choice',
              prompt: 'An interface extends a parent and redeclares one of its members. What is required of the new type?',
              options: [
                'It must be compatible with the parent\'s type',
                'It must be a completely different type',
                'It must be optional',
                'It must be readonly',
              ],
              answer: 0,
              explanation: 'A child may narrow or repeat a parent\'s member but not contradict it. The result must still be usable wherever the parent type is expected.',
            },
            {
              id: 'quiz-ts-l12-q4',
              type: 'multiple-choice',
              prompt: 'What happens when `interface Dog` is declared a second time in the same scope?',
              options: [
                'The compiler reports a duplicate identifier',
                'The second declaration replaces the first',
                'The declarations merge, and the type has the members of both',
                'Only the members of the first declaration are kept',
              ],
              answer: 2,
              explanation: 'Interfaces merge additively: both declarations contribute their members to one type. Type aliases do not do this and would report a duplicate name.',
            },
            {
              id: 'quiz-ts-l12-q5',
              type: 'multiple-choice',
              prompt: 'When is declaration merging the appropriate tool?',
              options: [
                'For every new interface in your own application',
                'When augmenting a type from a library or the global scope',
                'When you want to rename an existing interface',
                'When two interfaces have conflicting member types',
              ],
              answer: 1,
              explanation: 'Merging lets you add a field to a type you do not own, which is how library and global augmentation works. Inside your own code, inheritance is usually clearer.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l12-d1',
            title: 'Inherited and merged members on one object',
            body: 'A `Dog` value carries the `name` it inherits from `Animal` plus its own `breed` and the merged `goodBoy`. Nothing enforces that at runtime, so the demo simply reads the keys the types promise.',
            html: `<button id="go">Inspect two dogs</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `function describe(dog) {
  const parts = ['name=' + dog.name, 'breed=' + dog.breed]
  if (dog.goodBoy !== undefined) parts.push('goodBoy=' + dog.goodBoy)
  return parts.join(' ')
}

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  const rex = { name: 'Rex', breed: 'Corgi' }
  const bella = { name: 'Bella', breed: 'Poodle', goodBoy: true }
  out.textContent = [describe(rex), describe(bella)].join('\n')
})`,
            height: 170,
          },
          {
            type: 'text',
            id: 'ts-l12-intro',
            body: '**Extending and merging interfaces.** An interface can build on another with `extends`: the child has every member of the parent plus its own. This is how you model a hierarchy without repeating yourself — `Dog extends Animal` already has everything an animal has.',
          },
          {
            type: 'text',
            id: 'ts-l12-b2',
            body: 'Interfaces have a second trick that type aliases do not. If you declare the same name twice, the declarations *merge* into one. This is how libraries let you add a field to a type you did not write, and how a global augmentation slots into an existing interface.',
          },
          {
            type: 'heading',
            id: 'ts-l12-h1',
            level: 2,
            body: 'Extending, and merging a second declaration',
          },
          {
            type: 'code',
            id: 'ts-l12-code',
            language: 'typescript',
            title: 'inheritance and merging',
            code: `interface Animal {
  name: string
}

// Dog has name AND breed:
interface Dog extends Animal {
  breed: string
}

const rex: Dog = { name: 'Rex', breed: 'Corgi' }

// Declaring Dog again adds to the first declaration:
interface Dog {
  goodBoy?: boolean
}

// Now all three keys are allowed:
const bella: Dog = { name: 'Bella', breed: 'Poodle', goodBoy: true }`,
          },
          {
            type: 'list',
            id: 'ts-l12-list',
            style: 'bullet',
            items: [
              '`extends` creates a new interface; it does not change the parent.',
              'A child can override a parent member only with a compatible type.',
              'Merging is additive and usually reserved for library authors augmenting existing types.',
            ],
          },
          {
            type: 'warning',
            id: 'ts-l12-warn',
            title: 'Merging is a sharp tool',
            body: 'Because two declarations of the same interface combine silently, a stray duplicate in your own code can change a type without a visible error. Prefer inheritance for your own code and keep merging for deliberate augmentation.',
          },
          {
            type: 'heading',
            id: 'ts-l12-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l12-b3',
            body: 'Build an admin from a base account, then type-check the result with a guard.',
          },
          {
            type: 'exercise',
            id: 'ts-l12-x1',
            exercise: {
              id: 'ex-ts-l12',
              instructions:
                "Write makeAdmin(name) returning an object with name and role set to 'admin', then isAdmin(account) returning true only when account.role is 'admin'.",
              languages: ['typescript'],
              starterCode: {
                typescript: `interface Account {
  name: string
}

interface Admin extends Account {
  role: 'admin'
}

// Build an admin from the name it receives.
function makeAdmin(name: string): Admin {
  return { name: '', role: 'admin' }
}

// Return true only for an admin account.
function isAdmin(account: Account): boolean {
  return false
}
`,
              },
              tests: [
                {
                  id: 'ts-l12-t1',
                  label: "makeAdmin sets the role to 'admin'",
                  body: "const a = makeAdmin('Ada'); return a.name === 'Ada' && a.role === 'admin'",
                },
                {
                  id: 'ts-l12-t2',
                  label: 'isAdmin accepts an admin',
                  body: "return isAdmin(makeAdmin('Ada')) === true",
                },
                {
                  id: 'ts-l12-t3',
                  label: 'isAdmin rejects a plain account',
                  body: "return isAdmin({ name: 'Ada' }) === false",
                },
              ],
              hints: [
                'makeAdmin ignores its argument — it always stores an empty name. Use the name it received.',
                'A plain account has no role, so reading account.role gives undefined.',
                'Compare directly: return account.role === "admin".',
              ],
              solution: {
                typescript: `interface Account {
  name: string
}

interface Admin extends Account {
  role: 'admin'
}

function makeAdmin(name: string): Admin {
  return { name: name, role: 'admin' }
}

function isAdmin(account: Account): boolean {
  return account.role === 'admin'
}
`,
              },
              testNotes:
                'The third check passes a plain account with no role. The guard has to say false for it rather than assume every account is an admin.',
            },
          },
        ],
      },
      {
        id: 'ts-l13',
        title: 'Implementing interfaces in classes',
        description: 'The implements clause, and why a class can satisfy an interface without declaring it.',
        duration: 5,
        objectives: [
          'Write a class that implements an interface',
          'Explain structural typing: no implements required to match',
          'Use implements to catch missing members at compile time',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-ts-l13',
          title: 'Implementing interfaces in classes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-ts-l13-q1',
              type: 'true-false',
              prompt: 'A class must declare implements Interface to satisfy that interface.',
              answer: false,
              explanation: 'TypeScript uses structural typing. A class matches an interface if it has all the required members, regardless of implements.',
            },
            {
              id: 'quiz-ts-l13-q2',
              type: 'multiple-choice',
              prompt: 'What does `class Square implements Shape` ask the compiler to do?',
              options: [
                'Create a subclass of `Shape`',
                'Check that `Square` provides every member `Shape` requires',
                'Copy `Shape`\'s methods onto `Square` at runtime',
                'Make `Shape` an abstract class',
              ],
              answer: 1,
              explanation: '`implements` is a compile-time checklist: every required member must exist on the class. It does not create inheritance and adds no runtime behaviour.',
            },
            {
              id: 'quiz-ts-l13-q3',
              type: 'multiple-choice',
              prompt: 'How many interfaces can one class implement?',
              options: [
                'Exactly one',
                'At most two',
                'Any number, separated by commas',
                'None; a class can only extend',
              ],
              answer: 2,
              explanation: 'A class may implement several interfaces at once, for example `class C implements A, B`. It must then satisfy the members of all of them.',
            },
            {
              id: 'quiz-ts-l13-q4',
              type: 'true-false',
              prompt: 'The `implements` clause adds runtime checks that the class actually has the members.',
              answer: false,
              explanation: '`implements` is erased along with the rest of the types. The check happens only at compile time, which is early enough to stop a broken class from shipping.',
            },
            {
              id: 'quiz-ts-l13-q5',
              type: 'multiple-choice',
              prompt: 'Structural typing already lets a class satisfy an interface without `implements`. Why write it anyway?',
              options: [
                'It makes the class run faster',
                'It prevents the class from being extended',
                'It is required for the class to be instantiated',
                'It moves a missing-member error to the class declaration, next to the code to fix',
              ],
              answer: 3,
              explanation: 'Without `implements`, a mismatch may surface at a distant call site. The clause asks for the check at the declaration, where you can see and fix the missing member.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'ts-l13-d1',
            title: 'A class and a plain object, one consumer',
            body: '`implements` is checked and then erased, but structural typing is observable: `measure` takes anything with an `area` method, so a `Square` instance and a bare object literal are interchangeable.',
            html: `<button id="go">Measure both shapes</button>
<pre id="out">Press the button.</pre>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #f4f6f8; border-radius: 6px; font-size: 12.5px; }`,
            javascript: `class Square {
  constructor(side) {
    this.side = side
  }
  area() {
    return this.side * this.side
  }
}

function measure(shape) {
  return shape.area()
}

const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  const square = new Square(3)
  const rect = { area: function () { return 12 } }
  out.textContent = [
    'Square(3) -> ' + measure(square),
    'plain object -> ' + measure(rect),
    'both satisfied the Shape interface.',
  ].join('\n')
})`,
            height: 185,
          },
          {
            type: 'text',
            id: 'ts-l13-intro',
            body: '**Implementing interfaces in classes.** The `implements` clause tells the compiler a class promises to provide every member of an interface. Forget one and the class fails to compile — a checklist attached to your class.',
          },
          {
            type: 'text',
            id: 'ts-l13-b2',
            body: 'It is worth knowing that `implements` is optional. TypeScript is *structurally typed*: a class matches an interface if it happens to have the right members, whether or not it says `implements`. The keyword does not change what matches; it only asks the compiler to check your intent at the declaration.',
          },
          {
            type: 'heading',
            id: 'ts-l13-h1',
            level: 2,
            body: 'A class and the shape it satisfies',
          },
          {
            type: 'code',
            id: 'ts-l13-code',
            language: 'typescript',
            title: 'implements, and matching without it',
            code: `interface Shape {
  area(): number
}

class Square implements Shape {
  side: number

  constructor(side: number) {
    this.side = side
  }

  area(): number {
    return this.side * this.side
  }
}

const square: Shape = new Square(3)   // Square is usable as a Shape

// This plain object also satisfies Shape, with no class and no implements:
const rect: Shape = { area: () => 12 }`,
          },
          {
            type: 'list',
            id: 'ts-l13-list',
            style: 'bullet',
            items: [
              '`implements` is checked at compile time and adds nothing at runtime.',
              'A class can implement several interfaces: `class C implements A, B`.',
              'Structural typing means an object literal with the right method already counts as a `Shape`.',
            ],
          },
          {
            type: 'tip',
            id: 'ts-l13-tip',
            title: 'implements is documentation the compiler enforces',
            body: 'Even though matching happens structurally, writing `implements Shape` moves the error to the class declaration, right next to the code you are about to fix — instead of surfacing far away at a call site.',
          },
          {
            type: 'heading',
            id: 'ts-l13-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'ts-l13-b3',
            body: 'Implement a class that satisfies a shape, storing its inputs and returning a computed value.',
          },
          {
            type: 'exercise',
            id: 'ts-l13-x1',
            exercise: {
              id: 'ex-ts-l13',
              instructions:
                'Complete the Rectangle class so area() returns width multiplied by height.',
              languages: ['typescript'],
              starterCode: {
                typescript: `// Make area() return width * height.
class Rectangle {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  area(): number {
    return 0
  }
}
`,
              },
              tests: [
                { id: 'ts-l13-t1', label: 'area is a method', body: "return typeof new Rectangle(1, 1).area === 'function'" },
                { id: 'ts-l13-t2', label: 'a 3 by 4 rectangle has area 12', body: 'return new Rectangle(3, 4).area() === 12' },
                { id: 'ts-l13-t3', label: 'a square works too', body: 'return new Rectangle(5, 5).area() === 25' },
                {
                  id: 'ts-l13-t4',
                  label: 'each instance keeps its own dimensions',
                  body: 'const a = new Rectangle(2, 3); const b = new Rectangle(4, 5); return a.area() === 6 && b.area() === 20',
                },
              ],
              hints: [
                'The constructor already stored width and height on this.',
                'Inside a method, this refers to the instance you called it on.',
                'Return this.width * this.height from area().',
              ],
              solution: {
                typescript: `class Rectangle {
  width: number
  height: number

  constructor(width: number, height: number) {
    this.width = width
    this.height = height
  }

  area(): number {
    return this.width * this.height
  }
}
`,
              },
              testNotes:
                'The last check builds two rectangles to prove the value lives on each instance rather than in a shared variable.',
            },
          },
        ],
      },
    ],
  },
]
