import { m, t } from './javascript-builders'

/**
 * The core language topics from the source index: the built-in objects a
 * JavaScript program reaches for before it touches the DOM.
 */
export const javascriptTopics1 = [
  t(
    'js-array',
    'JS Array',
    'JavaScript',
    'The list you will use more than any other object.',
    'An array is an ordered list of values, and the methods on it fall into three groups: those that ask a question and return a new value (map, filter, find), those that change the array in place (push, splice, sort), and those that read it (includes, indexOf, join). Knowing which group a method is in tells you whether you can chain it. Every callback method passes three arguments — the value, its index, and the whole array — and the third one is what lets you reach outside the list.',
    { language: 'javascript', code: `const scores = [72, 91, 85, 58]

// Transforms: a new array comes back.
const passed = scores.filter((score) => score >= 60)
const grades = scores.map((score) => (score >= 60 ? 'pass' : 'fail'))

// Queries: a single value or a boolean.
const best = Math.max(...scores)
const index = scores.indexOf(91)

// Mutations: the array itself changes.
scores.push(100)
scores.sort((a, b) => a - b)` },
    [
      m('concat()', 'Returns a new array joining this one with others or with another array. It does not change either input.'),
      m('constructor', 'The Array constructor itself. Called with new it makes an array; called with one number it makes that many empty slots.'),
      m('copyWithin()', 'Copies a slice of the array over another part of the same array, in place, and returns the array.'),
      m('entries()', 'Returns an iterator of [index, value] pairs, which is what for...of destructures into.'),
      m('every()', 'True when the callback returns true for every element. Useful as a guard before assuming an array is uniform.'),
      m('fill()', 'Overwrites a range of elements with one value, in place, and returns the array.'),
      m('filter()', 'Returns a new array holding only the elements the callback kept.'),
      m('find()', 'Returns the first element the callback accepts, or undefined. Stops as soon as it has one.'),
      m('findIndex()', 'Returns the index of the first element the callback accepts, or -1. Stops as soon as it has one.'),
      m('forEach()', 'Runs the callback once per element. Returns undefined, so it cannot be chained, and it skips holes in sparse arrays.'),
      m('from()', 'Builds an array from anything iterable or array-like: a string, a Set, a NodeList, or an object with a length.'),
      m('includes()', 'True when the value is present. Unlike indexOf it finds NaN, and it does not care about type coercion.'),
      m('indexOf()', 'Returns the first index of the value, or -1. Searches by strict equality after coercion, so it never finds NaN.'),
      m('isArray()', 'True when the value is an array, across realms. Prefer it over instanceof, which fails for arrays from another frame.'),
      m('join()', 'Concatenates the elements into a string using a separator, defaulting to a comma. Null and undefined become empty strings.'),
      m('keys()', 'Returns an iterator of the array indices, in order.'),
      m('length', 'How many elements the array has. Setting it truncates or extends the array, leaving new slots empty.'),
      m('lastIndexOf()', 'Returns the last index of the value, or -1, searching from the end backwards.'),
      m('map()', 'Returns a new array of the callback results, one per element, keeping the length the same.'),
      m('pop()', 'Removes and returns the last element, or undefined when the array is empty.'),
      m('prototype', 'The object that Array instances inherit from. Array.prototype is where shared methods live, which is why you can add to it and every array gains the method.'),
      m('push()', 'Appends elements to the end and returns the new length.'),
      m('reduce()', 'Folds the array into one value, left to right, carrying an accumulator through the callback.'),
      m('reduceRight()', 'The same fold running right to left, for when order matters the other way round.'),
      m('reverse()', 'Reverses the array in place and returns it. This one does mutate.'),
      m('shift()', 'Removes and returns the first element, or undefined when the array is empty.'),
      m('slice()', 'Returns a shallow copy of a portion of the array, without touching the original.'),
      m('some()', 'True when the callback returns true for at least one element.'),
      m('sort()', 'Sorts in place and returns the array. Without a comparator it compares strings, so numbers sort as text: always pass one for numbers.'),
      m('splice()', 'Removes elements and inserts others at one index, in place, returning the removed elements.'),
      m('toString()', 'The same output as join with a comma. It is what string coercion and template literals use.'),
      m('unshift()', 'Inserts elements at the front and returns the new length.'),
      m('valueOf()', 'Returns the primitive itself, which is the array. Overridden by subclasses to change coercion.'),
    ],
  ),

  t(
    'js-boolean',
    'JS Boolean',
    'JavaScript',
    'A wrapper object for the two primitive values.',
    'You will almost never need this. `true` and `false` are primitives on their own, and the Boolean object only matters when you need an actual object, for example to hang extra properties off it or to pass a boxed value to an API that expects one. It is a wrapper, not a truthiness test: `new Boolean(false)` is an object, and objects are always truthy.',
    { language: 'javascript', code: `const flag = true              // the primitive you want
const boxed = new Boolean(false)

if (boxed) console.log('always runs')  // an object is truthy

boxed.label = 'archived'   // now it can carry data` },
    [
      m('constructor', 'The Boolean constructor. Called with new it returns a boxed object rather than the primitive.'),
      m('prototype', 'The object Boolean instances inherit from.'),
      m('toString()', 'Returns "true" or "false".'),
      m('valueOf()', 'Returns the primitive true or false.'),
    ],
  ),

  t(
    'js-classes',
    'JS Classes',
    'JavaScript',
    'The syntax for prototypes, constructors and inheritance.',
    'A class is syntax over the prototype system: `class` declares a constructor, methods land on the prototype, and `extends` links a child to a parent. `static` puts a member on the constructor itself rather than on instances, which is how you write a factory or a constant. `super` calls the parent constructor or a parent method. Classes are hoisted in name but not initialised, so you cannot construct one before its declaration is evaluated.',
    { language: 'javascript', code: `class Shape {
  constructor(name) {
    this.name = name
  }

  describe() {
    return \`a \${this.name}\`
  }
}

class Circle extends Shape {
  static count = 0

  constructor(radius) {
    super('circle')
    this.radius = radius
    Circle.count += 1
  }

  area() {
    return Math.PI * this.radius ** 2
  }
}

const c = new Circle(3)
c.describe()   // 'a circle', via Shape
c.area()       // 28.27` },
    [
      m('constructor()', 'Runs when an instance is created. In a derived class it must call super() before it touches this.'),
      m('extends', 'Makes a class inherit from another, setting up the prototype chain and letting super work.'),
      m('static', 'Puts a method or field on the constructor rather than on its instances.'),
      m('super', 'Calls the parent constructor, or a parent method of the same name, from inside a derived class.'),
    ],
  ),

  t(
    'js-date',
    'JS Date',
    'JavaScript',
    'Points in time, and the traps that come with them.',
    'A Date holds a single number: milliseconds since the Unix epoch, in UTC. Everything else is a view onto it, which is why the `get*` methods come in pairs — local and UTC — and why mixing them is the classic bug. `getMonth` returns 0 for January, and `getDay` returns 0 for Sunday. Prefer the `UTC` variants when you are storing or comparing, and `toISOString` when you are serialising, because it always has the same shape regardless of the reader’s locale.',
    { language: 'javascript', code: `const now = new Date()

new Date('2026-03-14')            // parsed as UTC midnight
new Date(2026, 2, 14)             // local, month is 0-based
new Date('March 14, 2026')        // implementation-defined, avoid

const iso = now.toISOString()      // always UTC, always the same shape
const year = now.getFullYear()     // local
const utcYear = now.getUTCFullYear()

new Date('2026-03-14').getTime() - now.getTime()` },
    [
      m('constructor', 'Builds a Date from a timestamp, a date string, or year/month/day numbers. Month is 0-based, so March is 2.'),
      m('getDate()', 'Day of the month, 1 to 31, in local time.'),
      m('getDay()', 'Day of the week, 0 for Sunday to 6 for Saturday, in local time.'),
      m('getFullYear()', 'Four-digit year in local time.'),
      m('getHours()', 'Hour 0 to 23 in local time.'),
      m('getMilliseconds()', 'Milliseconds 0 to 999 in local time.'),
      m('getMinutes()', 'Minutes 0 to 59 in local time.'),
      m('getMonth()', 'Month 0 to 11 in local time, so January is 0. This is the most common off-by-one in the language.'),
      m('getSeconds()', 'Seconds 0 to 59 in local time.'),
      m('getTime()', 'Milliseconds since the epoch. This is the underlying value; every other method is derived from it.'),
      m('getTimezoneOffset()', 'Minutes to add to local time to reach UTC, so it is negative for offsets east of Greenwich.'),
      m('getUTCDate()', 'Day of the month in UTC.'),
      m('getUTCDay()', 'Day of the week in UTC.'),
      m('getUTCFullYear()', 'Four-digit year in UTC.'),
      m('getUTCHours()', 'Hour 0 to 23 in UTC.'),
      m('getUTCMilliseconds()', 'Milliseconds 0 to 999 in UTC.'),
      m('getUTCMinutes()', 'Minutes 0 to 59 in UTC.'),
      m('getUTCMonth()', 'Month 0 to 11 in UTC.'),
      m('getUTCSeconds()', 'Seconds 0 to 59 in UTC.'),
      m('now()', 'The current time in milliseconds since the epoch. Called on the constructor, so Date.now().'),
      m('parse()', 'Turns a date string into a timestamp. Called on the constructor, so Date.parse().'),
      m('prototype', 'The object Date instances inherit from.'),
      m('setDate()', 'Sets the day of the month in local time, returning the new timestamp.'),
      m('setFullYear()', 'Sets the year in local time. Also the way to set month and day together.'),
      m('setHours()', 'Sets the hour in local time, accepting minutes, seconds and milliseconds as extra arguments.'),
      m('setMilliseconds()', 'Sets the milliseconds in local time.'),
      m('setMinutes()', 'Sets the minutes in local time, accepting seconds and milliseconds as extra arguments.'),
      m('setMonth()', 'Sets the month in local time, 0-based, accepting a day as a second argument.'),
      m('setSeconds()', 'Sets the seconds in local time, accepting milliseconds as a second argument.'),
      m('setTime()', 'Sets the date from a timestamp in milliseconds, returning it.'),
      m('setUTCDate()', 'Sets the day of the month in UTC.'),
      m('setUTCFullYear()', 'Sets the year in UTC, also setting month and day when given.'),
      m('setUTCHours()', 'Sets the hour in UTC.'),
      m('setUTCMilliseconds()', 'Sets the milliseconds in UTC.'),
      m('setUTCMinutes()', 'Sets the minutes in UTC.'),
      m('setUTCMonth()', 'Sets the month in UTC, 0-based.'),
      m('setUTCSeconds()', 'Sets the seconds in UTC.'),
      m('toDateString()', 'A human-readable date with no time, in local time and local format.'),
      m('toISOString()', 'A UTC string in a fixed format that sorts and parses reliably. This is the one to put on the wire.'),
      m('toJSON()', 'Calls toISOString, which is how JSON.stringify gets the format right for dates.'),
      m('toLocaleDateString()', 'The date in the reader’s locale and time zone, for showing to a person.'),
      m('toLocaleTimeString()', 'The time in the reader’s locale and time zone.'),
      m('toLocaleString()', 'Both date and time in the reader’s locale and time zone.'),
      m('toString()', 'A human-readable local date and time. Its format is not specified, so never parse it.'),
      m('toTimeString()', 'A human-readable local time with no date.'),
      m('toUTCString()', 'A UTC string in the legacy format, mostly kept for HTTP headers.'),
      m('UTC()', 'Builds a timestamp from year, month, day and time parts, all in UTC. Called on the constructor.'),
      m('valueOf()', 'Returns the timestamp, which is what makes Date compare with < and > work.'),
    ],
  ),

  t(
    'js-error',
    'JS Error',
    'JavaScript',
    'What every thrown value is built from.',
    'Errors carry two things: a name that says what kind of failure it is, and a message that says what happened. Built-ins add `stack`, which is where the failure came from, and anything you throw is caught by type in a catch block, so extending Error is how you make your own kinds. TypeErrors and RangeErrors are thrown by the language itself when you misuse a value or a size.',
    { language: 'javascript', code: `class HttpError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

try {
  throw new HttpError(404, 'no such user')
} catch (error) {
  if (error instanceof HttpError) console.log(error.status)
  console.log(error.stack)   // where it was thrown
}` },
    [
      m('name', 'The kind of error, such as "TypeError". Defaults to "Error" unless a subclass overrides it.'),
      m('message', 'The description of what went wrong. Defaults to an empty string, so always pass one.'),
    ],
  ),

  t(
    'js-global',
    'JS Global',
    'JavaScript',
    'The functions and values available without importing anything.',
    'These are the globals of the language itself. The encoding functions convert between text and percent-escapes, with `encodeURIComponent` the one you want for a value going into a query string or a path segment because it also escapes the characters that would otherwise change the structure. `parseInt` and `Number` differ on trailing text, and `eval` should not be used on input you did not write.',
    { language: 'javascript', code: `encodeURIComponent('a b&c')   // 'a%20b%26c'
encodeURI('a b&c')            // 'a%20b&c', leaves & alone

parseInt('42px')              // 42
Number('42px')                // NaN
Number('')                    // 0, a trap worth knowing

isNaN('hello')                // true, because it coerces first
Number.isNaN('hello')         // false, because it does not

eval('1 + 1')                 // 2, but never do this` },
    [
      m('decodeURI()', 'Reverses encodeURI, leaving reserved characters such as & and # escaped.'),
      m('decodeURIComponent()', 'Reverses encodeURIComponent, including the reserved characters.'),
      m('encodeURI()', 'Percent-escapes a whole URI, leaving the characters that give it structure intact.'),
      m('encodeURIComponent()', 'Percent-escapes one value, including the separators, for use inside a URI.'),
      m('escape()', 'Legacy encoder that predates the URI functions. Not standard and should be avoided.', 'Superseded by encodeURI.'),
      m('eval()', 'Runs a string of source as code. Slow, unsafe with untrusted input, and blocked by Content Security Policy.', 'Avoid it. Parse the text instead, for example with JSON.parse.'),
      m('Infinity', 'A value larger than any finite number. Produced by dividing a non-zero number by zero.'),
      m('isFinite()', 'False for NaN and for the infinities. It coerces its argument first.'),
      m('isNaN()', 'True when the argument coerces to NaN, so isNaN("hello") is true. Prefer Number.isNaN, which does not coerce.'),
      m('NaN', 'Not a Number, the result of arithmetic that cannot be represented. NaN is the only value that is not equal to itself.'),
      m('Number()', 'Converts anything to a number, returning NaN for text that is not a complete number and 0 for an empty string.'),
      m('parseFloat()', 'Reads a number from the start of a string and ignores the rest, so parseFloat("42px") is 42.'),
      m('parseInt()', 'Reads a whole number from the start of a string, honouring a radix. Always pass 10 for decimal.'),
      m('String()', 'Converts a value to a string, with the same output as toString but safe for null and undefined.'),
      m('undefined', 'The value of a variable that has never been assigned, and the result of a missing property.'),
      m('unescape()', 'Legacy counterpart to escape. Not standard and should be avoided.', 'Superseded by decodeURIComponent.'),
    ],
  ),

  t(
    'js-json',
    'JS JSON',
    'JavaScript',
    'Two functions for moving data between text and objects.',
    'JSON is the text format almost every API speaks, and these are the two functions that read and write it. `stringify` is where the interesting options live: the third argument is an indentation, and the second is a replacer that lets you drop or rewrite fields as it serialises. One trap: `undefined` values are dropped rather than turned into null, so a field that disappears is often one you forgot to assign.',
    { language: 'javascript', code: `const user = { name: 'Ada', tags: ['admin'], joined: new Date(0) }

JSON.stringify(user)                       // '{"name":"Ada",...}'
JSON.stringify(user, null, 2)              // pretty-printed
JSON.stringify(user, ['name'])            // only these keys

const text = '{"id":1,"name":"Ada"}'
const data = JSON.parse(text)
JSON.parse('nope')                        // throws SyntaxError

// The body for a request, with the header that tells the server to expect it.
fetch('/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(user),
})` },
    [
      m('parse()', 'Reads JSON text and returns the value. Throws SyntaxError on bad input, so wrap it when the text came from outside.', 'Called as JSON.parse().'),
      m('stringify()', 'Writes a value as JSON text. The second argument filters or transforms keys, the third sets the indentation.', 'Called as JSON.stringify().'),
    ],
  ),
]
