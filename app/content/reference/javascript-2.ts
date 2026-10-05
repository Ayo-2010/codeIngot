import { m, t } from './javascript-builders'

/**
 * The remaining language topics: numbers, patterns, statements and strings.
 */
export const javascriptTopics2 = [
  t(
    'js-math',
    'JS Math',
    'JavaScript',
    'Stateless maths, all on one object.',
    'Nothing here keeps state, so there is no reason to instantiate it — `Math.floor(1.5)` and not `new Math()`. The functions come in families: trigonometric, logarithmic, rounding and min/max. The constants are the usual mathematical values, and the uppercase spelling is the convention that marks them as fixed. `random()` is not cryptographically secure; reach for `crypto.getRandomValues` when the numbers matter.',
    { language: 'javascript', code: `Math.round(2.5)        // 3, rounds half up
Math.trunc(2.7)        // 2, drops the fraction
Math.round(-2.5)       // -2, so round is not symmetric

Math.max(...scores)    // spread a list into arguments
Math.min(1, 2, 3)      // arguments, not an array

Math.hypot(3, 4)       // 5, avoids overflow

Math.random()          // 0 <= n < 1, not secure
Math.sign(-7)          // -1` },
    [
      m('abs()', 'The distance from zero, so the magnitude without the sign.'),
      m('acos()', 'Arc cosine in radians: the angle whose cosine is x.'),
      m('acosh()', 'Inverse hyperbolic cosine.'),
      m('asin()', 'Arc sine in radians.'),
      m('asinh()', 'Inverse hyperbolic sine.'),
      m('atan()', 'Arc tangent in radians, returning a value between -π/2 and π/2.'),
      m('atan2()', 'Arc tangent that takes both y and x, so it can tell which quadrant the angle is in. This is the one to use for a direction.'),
      m('atanh()', 'Inverse hyperbolic tangent.'),
      m('cbrt()', 'Cube root, including for negative numbers, where Math.pow(x, 1/3) gives NaN.'),
      m('ceil()', 'Rounds up to the next whole number, so 1.1 becomes 2.'),
      m('clz32()', 'Counts leading zeros in the 32-bit form of a number. Useful for bit tricks.'),
      m('cos()', 'Cosine of an angle in radians.'),
      m('cosh()', 'Hyperbolic cosine.'),
      m('E', "Euler's number, the base of natural logarithms, roughly 2.71828."),
      m('exp()', 'Raises e to a power, the exponential function.'),
      m('expm1()', 'Computes e^x - 1 accurately for very small x, where the direct form loses all precision.'),
      m('floor()', 'Rounds down to the previous whole number, so 1.9 becomes 1.'),
      m('fround()', 'Rounds to the nearest 32-bit float, matching the precision of a float in other languages.'),
      m('LN2', 'The natural logarithm of 2, roughly 0.693.'),
      m('LN10', 'The natural logarithm of 10, roughly 2.303.'),
      m('log()', 'The natural logarithm.'),
      m('log10()', 'The base 10 logarithm.'),
      m('log1p()', 'Computes log(1 + x) accurately for very small x.'),
      m('log2()', 'The base 2 logarithm, so log2(8) is 3.'),
      m('LOG2E', 'The base 2 logarithm of e, the multiplier that converts a natural logarithm to base 2.'),
      m('LOG10E', 'The base 10 logarithm of e, the multiplier that converts a natural logarithm to base 10.'),
      m('max()', 'The largest of its arguments, or -Infinity when given none. NaN if any argument is NaN. It takes arguments, not an array, so spread a list.'),
      m('min()', 'The smallest of its arguments, or Infinity when given none. NaN if any argument is NaN.'),
      m('PI', 'The ratio of a circle’s circumference to its diameter, roughly 3.14159.'),
      m('pow()', 'Raises the first argument to the power of the second.'),
      m('random()', 'A pseudo-random number from 0 up to but not including 1. Not suitable for tokens, keys or anything else that must be unguessable.', 'Use crypto.getRandomValues for security.'),
      m('round()', 'Rounds to the nearest whole number, rounding halves towards positive infinity, so -2.5 becomes -2.'),
      m('sign()', '-1, 0 or 1 depending on the sign of the argument.'),
      m('sin()', 'Sine of an angle in radians.'),
      m('sqrt()', 'The square root. Returns NaN for a negative argument.'),
      m('SQRT1_2', 'The square root of one half, roughly 0.7071.'),
      m('SQRT2', 'The square root of two, roughly 1.4142.'),
      m('tan()', 'Tangent of an angle in radians.'),
      m('tanh()', 'Hyperbolic tangent.'),
      m('trunc()', 'Drops the fractional part, keeping the sign. Unlike floor it truncates towards zero.'),
    ],
  ),

  t(
    'js-number',
    'JS Number',
    'JavaScript',
    'One type for integers, decimals and everything in between.',
    'JavaScript has a single numeric type, and it is a double-precision float. That is why it counts to 2^53 exactly and no further, and why `0.1 + 0.2` is not `0.3`. For money, work in integer minor units such as cents. `Number.isInteger` and `Number.isSafeInteger` do not coerce, unlike the bare global versions, which makes them the safer test.',
    { language: 'javascript', code: `0.1 + 0.2                 // 0.30000000000000004
Number.MAX_SAFE_INTEGER    // 9007199254740991

Number.isInteger(5)        // true
Number.isInteger('5')      // false, no coercion
isInteger('5')             // global version coerces, so true

(0.1 + 0.2).toFixed(2)     // '0.30'
(255).toString(16)         // 'ff'
Number.isSafeInteger(2 ** 53)  // false` },
    [
      m('constructor', 'The Number constructor. Called with new it returns a boxed object; called plainly it converts.'),
      m('isFinite()', 'True when the value is a number with no infinity or NaN. It does not coerce, unlike the global isFinite.'),
      m('isInteger()', 'True when the value is a number with no fractional part. It does not coerce.'),
      m('isNaN()', 'True only when the value is the actual NaN value. It does not coerce, unlike the global isNaN.'),
      m('isSafeInteger()', 'True when the value is an integer that can be represented exactly, up to 2^53 - 1.'),
      m('MAX_VALUE', 'The largest representable value, roughly 1.8e308.'),
      m('MIN_VALUE', 'The smallest positive value that can be represented, roughly 5e-324.'),
      m('NEGATIVE_INFINITY', 'Negative infinity, produced by dividing a negative number by zero.'),
      m('NaN', 'Not a Number, produced by arithmetic that cannot be represented. It never equals itself, so test with Number.isNaN.'),
      m('POSITIVE_INFINITY', 'Positive infinity, produced by dividing a positive number by zero.'),
      m('prototype', 'The object Number instances inherit from.'),
      m('toExponential()', 'Writes the number in scientific notation, with one digit before the point.'),
      m('toFixed()', 'Rounds to a fixed number of digits after the decimal point and returns a string. This is a display tool, not arithmetic.'),
      m('toLocaleString()', 'Formats the number using the reader’s locale, with grouping separators.'),
      m('toPrecision()', 'Writes the number with a chosen number of significant digits.'),
      m('toString()', 'Converts to a string, optionally in a given radix, so (255).toString(16) gives "ff".'),
      m('valueOf()', 'Returns the primitive number, which is what makes Number objects compare and coerce like plain numbers.'),
    ],
  ),

  t(
    'js-operators',
    'JS Operators',
    'JavaScript',
    'The symbols that join values into expressions.',
    'The operators are grouped by what they do to their operands. Arithmetic does maths, comparison returns a boolean, logical operators short-circuit and return one of their operands rather than a boolean, and assignment can be chained or combined. The two that catch people out are `==`, which coerces types before comparing, and its strict sibling `===`, which does not — prefer the strict pair everywhere. The nullish pair `??` falls back only on null or undefined, where `||` also falls back on 0 and the empty string.',
    { language: 'javascript', code: `1 + '2'        // '12', a string, not 3
'3' * '4'       // 12, numeric coercion both ways

0 == '0'        // true, coercion
0 === '0'       // false

value ?? 'default'   // fallback only for null and undefined
value || 'default'   // also falls back for 0, '' and false

flag && run()        // runs only when flag is truthy
count += 1           // as count = count + 1` },
    [],
  ),

  t(
    'js-regexp',
    'JS RegExp',
    'JavaScript',
    'Patterns, and the two methods that run them.',
    'A regular expression is written either as a literal between slashes or as a string passed to the constructor. The two methods that matter are `test`, which answers a yes or no, and `exec`, which returns the first match and advances `lastIndex`. Whether a pattern is global decides whether those stateful lastIndex rules apply, so a `g` pattern reused in a loop will start skipping matches unless you reset `lastIndex` or use `matchAll`. `String.match` and `String.replace` are the convenient wrappers and avoid most of this.',
    { language: 'javascript', code: `const re = /^\\d{3}-\\d{4}$/

re.test('555-1234')    // true, no lastIndex involved
'my number is 555-1234 ok'.match(re)   // null, anchored

// Global patterns are stateful, so prefer match/replace over exec in a loop.
const reGlobal = /\\d+/g
const hits = 'a1 b22 c333'.match(reGlobal)   // ['1','22','333']

const execRe = /\\d+/g
execRe.exec('a1 b22')  // match at 0, lastIndex now 1

'2026-03-14'.replace(/(\\d+)-(\\d+)-(\\d+)/, '$3/$2/$1')  // '14/03/2026'` },
    [
      m('constructor', 'Builds a pattern, either from a literal or from a string, which is what you need when the pattern is assembled at runtime.'),
      m('compile()', 'Recompiles a pattern in place on an existing object.', 'Deprecated. Build a new RegExp instead.'),
      m('exec()', 'Runs the pattern against a string and returns the first match with its groups, or null. On a global pattern it also moves lastIndex.'),
      m('g', 'The global flag. Makes the pattern find every match rather than stopping at the first, which is what String.replace needs to swap all of them.'),
      m('global', 'The long form of the g flag, readable as a property on the pattern object.'),
      m('i', 'The case-insensitive flag.'),
      m('ignoreCase', 'The long form of the i flag.'),
      m('lastIndex', 'Where the next match should start. The engine writes to it on a global pattern, which is why a global pattern in a loop can silently skip matches.'),
      m('m', 'The multiline flag, where ^ and $ match the start and end of each line rather than the whole string.'),
      m('multiline', 'The long form of the m flag.'),
      m('n+', 'One or more of the preceding item, the workhorse quantifier.'),
      m('n*', 'Zero or more of the preceding item.'),
      m('n?', 'Zero or one of the preceding item, which makes the item before it optional.'),
      m('n{X}', 'Exactly X of the preceding item.'),
      m('n{X,Y}', 'Between X and Y of the preceding item, greedy by default.'),
      m('n{X,}', 'X or more of the preceding item.'),
      m('n$', 'The preceding item at the end of the string.'),
      m('^n', 'The preceding item at the start of the string.'),
      m('?=n', 'A lookahead: matches when n follows, without consuming it.'),
      m('?!n', 'A negative lookahead: matches unless n follows.'),
      m('source', 'The pattern as text, the same characters you wrote.'),
      m('test()', 'True when the pattern matches anywhere in the string. This one ignores lastIndex, so it is safe to reuse.'),
      m('toString()', 'The pattern in its /.../flags form.'),
      m('[abc]', 'A character class matching any one of the listed characters.'),
      m('[^abc]', 'A negated character class matching any character except the ones listed.'),
      m('[0-9]', 'A digit. The shorthand \\d is shorter and clearer.'),
      m('[^0-9]', 'Any character that is not a digit. The shorthand \\D.'),
      m('(x|y)', 'An alternation, matching either branch. The parentheses are what make it one group.'),
      m('.', 'Any character except a line break. It will not cross lines unless the s flag is set.'),
      m('\\w', 'A word character: a letter, a digit or an underscore.'),
      m('\\W', 'Anything that is not a word character.'),
      m('\\d', 'A digit, from 0 to 9.'),
      m('\\D', 'Anything that is not a digit.'),
      m('\\s', 'Whitespace, including spaces, tabs and line breaks.'),
      m('\\S', 'Anything that is not whitespace.'),
      m('\\b', 'A word boundary, matching where a word character meets a non-word one. It is a position, not a character.'),
      m('\\B', 'Any position that is not a word boundary.'),
      m('\\0', 'A NUL character. Rarely what you want.'),
      m('\\n', 'A line feed.'),
      m('\\f', 'A form feed.'),
      m('\\r', 'A carriage return. Together with \\n it makes CRLF on Windows, so a pattern for line endings needs both.'),
      m('\\t', 'A tab.'),
      m('\\v', 'A vertical tab.'),
      m('\\xxx', 'A character by three-digit octal code.'),
      m('\\xdd', 'A character by two-digit hexadecimal code, such as \\x41 for "A".'),
      m('\\uxxxx', 'A character by four-digit hexadecimal code, which is how you match a Unicode code point.'),
    ],
  ),

  t(
    'js-statements',
    'JS Statements',
    'JavaScript',
    'The keywords that shape control flow and declarations.',
    'These are statements rather than members of an object, but they behave the same way everywhere: they run in order, and the ones that branch change what runs next. The loop family is the part to choose between carefully. `for...of` walks values, `for...in` walks keys, and a plain `for` wins when you need the index. `var` is scoped to the whole function and hoists, `let` and `const` are scoped to the block, so default to them.',
    { language: 'javascript', code: `for (const item of items) {    // values
  if (item.done) continue
  console.log(item)
}

for (const key in object) {    // keys, including inherited ones
  console.log(key)
}

for (let i = 0; i < 10; i += 1) { }   // index

let a = 1                 // block scoped, reassignable
const b = 2               // block scoped, cannot reassign

try {
  risky()
} catch (error) {
  console.error(error)
} finally {
  cleanup()
}` },
    [
      m('break', 'Leaves the innermost loop or switch.'),
      m('class', 'Declares a class, the syntax over the prototype system.'),
      m('continue', 'Skips to the next iteration of the innermost loop.'),
      m('debugger', 'Breaks in the browser’s developer tools when it runs.', 'Remove before shipping; it does nothing useful in production.'),
      m('do...while', 'A loop that runs at least once before it checks the condition.'),
      m('for', 'The counted loop, with initialiser, condition and step.'),
      m('for...in', 'Loops over the keys of an object, including inherited ones. Reach for Object.keys or for...of instead.'),
      m('for...of', 'Loops over the values of anything iterable, including arrays, strings, Maps and Sets.'),
      m('function', 'Declares a function. Named, arrow and function expressions all share this behaviour.'),
      m('if...else', 'Runs a branch when a condition is truthy.'),
      m('return', 'Leaves the function with a value.'),
      m('switch', 'Compares one value against several cases, with break to stop falling through.'),
      m('throw', 'Raises an error to be caught further up the stack.'),
      m('try...catch', 'Runs a block and catches anything thrown in it, with finally for cleanup that must happen either way.'),
      m('var', 'Declares a function-scoped variable that hoists to the top of its function.', 'Use let or const instead.'),
      m('while', 'Repeats a block for as long as a condition holds.'),
    ],
  ),

  t(
    'js-string',
    'JS String',
    'JavaScript',
    'Text, indexed by UTF-16 code unit and immutable.',
    'Strings cannot be changed, so every "modifying" method returns a new string, which is why you chain them. `length` counts UTF-16 code units, not characters and not grapheme clusters, so an emoji outside the basic plane counts as two — that is the whole reason `Intl.Segmenter` exists. The older `substr` is deprecated in favour of `slice`, and `charCodeAt` is superseded by `codePointAt` for anything above the basic plane.',
    { language: 'javascript', code: `const name = 'Ada Lovelace'

name.length              // 12
name[0]                  // 'A', indexing works but is slower than methods
name.at(-1)              // 'e'

name.toUpperCase()       // 'ADA LOVELACE'
'  padded  '.trim()      // 'padded'

name.split(' ')          // ['Ada', 'Lovelace']
'ada'.padStart(6, '0')   // '000ada'

'2026-03-14'.slice(0, 4)   // '2026'

'\\u{1F600}'.length         // 2, not 1: it is outside the basic plane
[...'\\u{1F600}'].length    // 1, iterating counts the code point` },
    [
      m('charAt()', 'The character at an index, or an empty string when the index is past the end. Prefer .at() for negative indices.'),
      m('charCodeAt()', 'The UTF-16 code unit at an index as a number. For anything above the basic plane use codePointAt().'),
      m('concat()', 'Joins strings. The + operator is clearer and does the same coercion.'),
      m('constructor', 'The String constructor.'),
      m('endsWith()', 'True when the string ends with the given text.'),
      m('fromCharCode()', 'Builds a string from UTF-16 code units, which is its inverse. fromCodePoint() is the one for a code point.'),
      m('includes()', 'True when the text appears anywhere in the string.'),
      m('indexOf()', 'The index of the first occurrence of the text, or -1.'),
      m('lastIndexOf()', 'The index of the last occurrence of the text, or -1.'),
      m('length', 'How many UTF-16 code units the string holds. An emoji outside the basic plane counts as two.'),
      m('localeCompare()', 'Compares the string with another using the locale’s rules, returning a negative number, zero or a positive number.'),
      m('match()', 'Runs a regular expression. With a global flag it returns every match; without one it returns the first match with its groups.'),
      m('prototype', 'The object String instances inherit from.'),
      m('repeat()', 'Repeats the string the given number of times.'),
      m('replace()', 'Returns a new string with the first match, or every match when the pattern has the g flag, replaced. The replacement can use $1 to refer to capture groups.'),
      m('search()', 'Returns the index of the first regular expression match, or -1.'),
      m('slice()', 'A substring by index range, accepting negative indices counted from the end. Never mutates.'),
      m('split()', 'Splits the string into an array, on a separator string or a regular expression. Splitting on an empty string gives one entry per code unit.'),
      m('startsWith()', 'True when the string begins with the given text.'),
      m('substr()', 'A substring starting at a position with a length. The arguments are swapped relative to slice.', 'Deprecated. Use slice().'),
      m('substring()', 'A substring between two indices, swapping them if they are the wrong way round, and treating a negative value as zero.'),
      m('toLocaleLowerCase()', 'Lowercases using the locale’s rules.'),
      m('toLocaleUpperCase()', 'Uppercases using the locale’s rules.'),
      m('toLowerCase()', 'Lowercases the string.'),
      m('toString()', 'Returns the string itself.'),
      m('toUpperCase()', 'Uppercases the string.'),
      m('trim()', 'Removes whitespace from both ends. trimStart() and trimEnd() do one side each.'),
      m('valueOf()', 'Returns the string itself, which is the primitive behind the object.'),
    ],
  ),

  t(
    'js-conversion',
    'JS Conversion',
    'Other References',
    'How values turn into other types when you mix them.',
    'JavaScript decides types at the moment an operator is used, and that decision is where most surprising bugs come from. The rule to remember is that a value with no numeric meaning converts to NaN, and any arithmetic involving NaN is NaN. That is why `0.1 + 0.2` is not exactly `0.3`, why `"5" - 1` is `4` but `"5" + 1` is `"51"`, and why comparing with `==` compares types as well as values. Comparing with `===` skips conversion, which is why it is the default. Conversion to a string is the one that keeps producing wrong output, since it happily turns 0 and false into text that looks truthy.',
    { language: 'javascript', code: `Number('42')      // 42
Number('')        // 0, a trap worth remembering
Number('42px')    // NaN, the whole string must be a number
parseInt('42px')  // 42, it reads only the start

String(42)        // '42'
String(null)      // 'null'
String(undefined) // 'undefined'

1 + '2'           // '12'  plus concatenates when either side is a string
'3' * '4'         // 12    minus and times coerce both ways
null + 1          // 1     null converts to 0
undefined + 1     // NaN   undefined converts to NaN

[] + {}           // '[object Object]', the classic surprise
0 == '0'          // true, coercion on comparison
0 === '0'         // false

Boolean('')       // false
Boolean('false')  // true, any non-empty string is truthy
if (list.length) { }    // never compare a length to a boolean` },
    [],
  ),
]
