import type { Section } from '~/types/content'

export const jsJsonProjectSections: Section[] = [
  {
    id: 'js-s78',
    title: 'JSON syntax',
    description: 'The grammar a JSON document has to follow, the values it is allowed to hold, and what it cannot say.',
    lessons: [
      {
        id: 'js-l94',
        title: 'JSON intro and syntax',
        description: 'What a JSON document is, and the exact punctuation rules that decide whether it parses.',
        duration: 5,
        objectives: [
          'Say what JSON is and why it is text rather than an object',
          'Write a valid document with objects, arrays and every value type',
          'Spot the four punctuation mistakes that break a document',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l94-b1',
            body: 'JSON is a text format for storing and sending data. It is not JavaScript: it is a string of characters with a fixed grammar, and until something parses it every object in it is just text on screen. The grammar is nearly identical to an object literal, which is why the conversion in both directions is a single call — and why it is so easy to forget which side of the line you are standing on. In JavaScript code the quotes are single; inside a JSON document they are double, always.',
          },
          {
            type: 'demo',
            id: 'j-l94-d1',
            title: 'The same value as an object and as JSON text',
            body: 'The bottom block was generated from the top one with JSON.stringify. Read them together and the difference is the whole point: JavaScript values have types, methods and live references, while JSON has characters.',
            html: `<h3>JavaScript value</h3>
<pre id="obj"></pre>
<h3>JSON text</h3>
<pre id="text"></pre>`,
            css: `pre { background: #f4f6f8; padding: 0.6rem; border-radius: 6px; font-size: 13px; overflow: auto; }`,
            javascript: `const book = { title: 'The Hobbit', pages: 310, inPrint: true }
document.querySelector('#obj').textContent = book
document.querySelector('#text').textContent = JSON.stringify(book, null, 2)`,
          },
          {
            type: 'heading',
            id: 'j-l94-h1',
            level: 3,
            body: 'A JSON document',
          },
          {
            type: 'code',
            id: 'j-l94-c1',
            language: 'plaintext',
            title: 'Objects, arrays and scalars',
            code: `{
  "title": "The Hobbit",
  "pages": 310,
  "inPrint": true,
  "tags": ["fantasy", "classic"],
  "author": { "name": "J. R. R. Tolkien", "born": 1892 }
}`,
          },
          {
            type: 'text',
            id: 'j-l94-b2',
            body: 'Three shapes and three sets of brackets. An **object** is braces holding `"key": value` pairs, an **array** is square brackets holding values in order, and a **string** is text inside double quotes. What makes JSON strict is the punctuation around them: every key in double quotes, every pair separated by a comma, and no comma after the last one. Compare that with a JavaScript object literal, where keys go unquoted, quotes are optional on values and a trailing comma is harmless — every one of those is a syntax error here.',
          },
          {
            type: 'heading',
            id: 'j-l94-h2',
            level: 3,
            body: 'The rules that catch people out',
          },
          {
            type: 'list',
            id: 'j-l94-l1',
            style: 'bullet',
            items: [
              'Keys are always in double quotes. `"title"` is JSON; `title` on its own is a syntax error.',
              'Text values need double quotes too, which makes `"310"` a string and `310` a number. The two are not interchangeable and nothing tells you which one you have.',
              'No trailing commas anywhere. `{ "a": 1, }` and `[1, 2, ]` both fail.',
              'No comments. A `//` line inside a document is a parse error, not a note to yourself.',
              'Booleans are lowercase `true` and `false`, and "nothing" is lowercase `null`.',
              'There is no `undefined`, no `NaN`, no `Infinity`, no `Date`, no function. If a value is not one of the six types, it cannot be written.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l94-w1',
            title: 'Four characters that break a document',
            body: 'The failures you will actually meet are an unquoted key, single quotes around a key, a trailing comma, and smart quotes pasted from a document or a chat message. Each one fails at `JSON.parse`, and the reported position is usually one character past the real mistake. When a document that looks correct will not parse, look for curly quotes first — paste from a plain text editor rather than typing over it.',
          },
          {
            type: 'tip',
            id: 'j-l94-t1',
            title: 'Why the grammar is so narrow',
            body: 'JSON has to be read by JavaScript, Python, Java, Go and a hundred other languages, and none of them agree on anything else. The grammar keeps only the intersection — double quotes, no comments, no trailing commas — because every extra variation is one more thing each parser has to implement. The price is a little typing. The return is that any language can read what any other one wrote.',
          },
          {
            type: 'exercise',
            id: 'j-l94-x1',
            exercise: {
              id: 'ex-js-json-syntax',
              instructions:
                'The `text` variable below is broken in three ways. Repair it in place so that `JSON.parse` accepts it, then parse it into a variable called `data` and log `data.title`. Keep the values themselves exactly as they are — the repair is punctuation, not rewriting.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const text = "{title: 'The Hobbit', pages: 310,}"
// Repair text, then parse it into data and log data.title.
`,
              },
              expectedOutput: 'The Hobbit',
              tests: [
                {
                  id: 'ex-js-json-syntax-t1',
                  label: 'text is now valid JSON',
                  body: `if (typeof text !== 'string') return 'Keep the text variable.'
try {
  JSON.parse(text)
} catch (error) {
  return 'JSON.parse still rejects text: ' + error.message
}
return true`,
                },
                {
                  id: 'ex-js-json-syntax-t2',
                  label: 'data holds the parsed document',
                  body: `if (typeof data === 'undefined' || data === null) return 'Parse text into a variable called data.'
return data && data.title === 'The Hobbit'
  ? true
  : 'The title should be The Hobbit, got: ' + JSON.stringify(data);`,
                },
                {
                  id: 'ex-js-json-syntax-t3',
                  label: 'pages came back as a number, not text',
                  body: `if (typeof data === 'undefined' || data === null) return 'Parse text into a variable called data.'
return typeof data.pages === 'number'
  ? true
  : 'pages has to stay unquoted, so JSON.parse gives you ' + typeof data.pages + '.',
`,
                },
                {
                  id: 'ex-js-json-syntax-t4',
                  label: 'The title was logged',
                  body: `var log = (window.__log || []).join(' | ')
return log.indexOf('The Hobbit') > -1
  ? true
  : 'Log the parsed title, for example console.log(data.title).';`,
                },
              ],
              hints: [
                'Three things are wrong: the keys are unquoted, the title uses single quotes, and there is a comma before the closing brace.',
                'JSON needs double quotes around keys and around any text value, so it reads "title": "The Hobbit".',
                'Delete the comma before the }, then add `const data = JSON.parse(text)` followed by `console.log(data.title)`.',
              ],
              solution: {
                javascript: `const text = '{ "title": "The Hobbit", "pages": 310 }'
const data = JSON.parse(text)
console.log(data.title)`,
              },
              testNotes:
                'The first check is the honest one: it tries to parse whatever text you left in place, so punctuation mistakes fail immediately and with the real message. The other checks read the parsed object, so patching the document by slicing the string will not satisfy them.',
            },
          },
        ],
      },
      {
        id: 'js-l95',
        title: 'JSON vs XML and data types',
        description: 'The same data written two ways, and the six types JSON is allowed to say.',
        duration: 5,
        objectives: [
          'Explain what XML gives up that JSON does not, and the reverse',
          'Name the six JSON types and write a value of each',
          'Handle the two traps: typeof null and numbers that arrive as strings',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l95-b1',
            body: 'XML was the first format the web used to move data between a server and a page, and it is still everywhere: SVG, RSS, sitemaps, most Microsoft Office formats. JSON took that job because it describes **values** rather than **markup**. An XML document says what the tags are; a JSON document says what the values are. When the receiver is a program, "what is this value" is the question worth answering.',
          },
          {
            type: 'demo',
            id: 'j-l95-d1',
            title: 'One order, written twice',
            body: 'Both strings hold the same three facts. XML spends its characters on structure and hands the total over as text. JSON is shorter and the total comes back as a number.',
            html: `<h3>XML</h3>
<pre id="xml">&lt;order id="4471"&gt;
  &lt;item&gt;Tea&lt;/item&gt;
  &lt;item&gt;Coffee&lt;/item&gt;
  &lt;total&gt;9.50&lt;/total&gt;
&lt;/order&gt;</pre>
<h3>JSON</h3>
<pre id="json"></pre>
<p id="read"></p>`,
            css: `pre { background: #f4f6f8; padding: 0.6rem; border-radius: 6px; font-size: 13px; overflow: auto; }`,
            javascript: `const json = '{"id":4471,"items":["Tea","Coffee"],"total":9.5}'
document.querySelector('#json').textContent = json
const order = JSON.parse(json)
document.querySelector('#read').textContent =
  'id is a ' + typeof order.id + ', items is a ' + typeof order.items + ', total is a ' + typeof order.total`,
          },
          {
            type: 'heading',
            id: 'j-l95-h1',
            level: 3,
            body: 'The same data as XML',
          },
          {
            type: 'code',
            id: 'j-l95-c1',
            language: 'plaintext',
            title: 'The order as an XML document',
            code: `<order id="4471">
  <item>Tea</item>
  <item>Coffee</item>
  <total>9.50</total>
</order>`,
          },
          {
            type: 'text',
            id: 'j-l95-b2',
            body: 'Both are plain text, which is the one thing they genuinely share: you can read either in a text editor, mail it, or store it in a single column of a database. Everything else is a trade. XML is self-describing — a tag called `<total>` tells you what 9.50 means with no outside agreement — and it allows attributes, comments and namespaces. JSON has none of that, and buys two things XML cannot easily give: real value types, and a grammar small enough to parse in one function.',
          },
          {
            type: 'list',
            id: 'j-l95-l1',
            style: 'bullet',
            items: [
              '**Shape.** XML nests tags; JSON nests braces and brackets. An XML list costs four lines per item, a JSON list one comma.',
              '**Types.** XML is text everywhere, so `<total>9.50</total>` arrives as the string "9.50" and converting it is your job. JSON keeps `9.5` a number.',
              '**Self-describing.** An XML tag carries the field name, so a reader needs no schema. A JSON key carries it too, but nothing in the document says whether 9.50 is a price, a weight or an id.',
              '**Extras.** XML allows attributes, comments and namespaces. JSON allows none of the three, which is what keeps it one value type all the way down.',
              '**Getting at it.** XML usually arrives parsed into a tree of nodes you walk; JSON is one call: `JSON.parse(text)`.',
              '**Where you meet them.** Config files, API responses and package metadata are JSON. SVG, RSS and sitemaps are XML.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l95-h2',
            level: 3,
            body: 'The six JSON types',
          },
          {
            type: 'code',
            id: 'j-l95-c2',
            language: 'javascript',
            title: 'Every type JSON has',
            code: `console.log(typeof '{"a":1}')           // "string" — text until it is parsed
console.log(typeof JSON.parse('{"a":1}')) // "object"
console.log(JSON.parse('42'))            // 42      — a number
console.log(JSON.parse('true'))           // true    — a boolean
console.log(JSON.parse('null'))           // null    — the only null
console.log(JSON.parse('[1, 2]'))         // [1, 2]  — an array
console.log(JSON.parse('"Tea"'))          // Tea     — a string`,
          },
          {
            type: 'text',
            id: 'j-l95-b3',
            body: 'A number is written plainly: `9.5`, `-3`, `1e3`, with no quotes, no thousands separators and no currency symbol. Text is inside double quotes, and inside a string the only escape is a backslash: `"He said \\"hi\\""` and `"line\\nbreak"`. There is no way to write a function, a date, `undefined` or a reference to another part of the document, so anything JSON cannot express has to be turned into a string before it is sent.',
          },
          {
            type: 'warning',
            id: 'j-l95-w1',
            title: 'typeof lies about null, and says nothing about arrays',
            body: '`typeof null` is `"object"`. That is a bug from 1995 kept for compatibility and it is still true in every browser you will use, so a quick `typeof x === "object"` check waves null through and the crash happens later, somewhere unrelated. `Array.isArray(x)` is the check that means what it says. The other half of the trap is arithmetic: a JSON number is a JavaScript number, so `id + 1` works, but a JSON string is a string, so `id + 1` quietly gives you "44711" and no error anywhere.',
          },
          {
            type: 'exercise',
            id: 'j-l95-x1',
            exercise: {
              id: 'ex-js-json-types',
              instructions:
                'Write a function `describe(value)` that returns the JSON type name of whatever it is given: "string", "number", "boolean", "null", "array" or "object". Order the checks carefully — `typeof null` reports "object", so the null case has to be caught before the general one.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Write describe(value) below. Then nothing else.
`,
              },
              tests: [
                {
                  id: 'ex-js-json-types-t1',
                  label: 'describe reports strings',
                  body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe('hello') === 'string'
  ? true
  : 'describe("hello") should return "string", got ' + describe('hello');`,
                },
                {
                  id: 'ex-js-json-types-t2',
                  label: 'describe reports numbers',
                  body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe(9.5) === 'number'
  ? true
  : 'describe(9.5) should return "number", got ' + describe(9.5);`,
                },
                {
                  id: 'ex-js-json-types-t3',
                  label: 'describe reports arrays as "array", not "object"',
                  body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe([1, 2]) === 'array'
  ? true
  : 'An array is not an object here. Use Array.isArray(value), got ' + describe([1, 2]);`,
                },
                {
                  id: 'ex-js-json-types-t4',
                  label: 'describe reports null as "null"',
                  body: `if (typeof describe !== 'function') return 'Define a function called describe.'
return describe(null) === 'null'
  ? true
  : 'typeof null is "object", so you have to test value === null before you test the type.';`,
                },
              ],
              hints: [
                'Start with the case typeof cannot report: `if (value === null) return "null"`.',
                'Then `if (Array.isArray(value)) return "array"`, and after that `const type = typeof value` gives you string, number, boolean or object.',
                'So: null first, array second, then return typeof value unless it is "object", in which case return "object".',
              ],
              solution: {
                javascript: `function describe(value) {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  const type = typeof value
  if (type === 'object') return 'object'
  return type
}`,
              },
              testNotes:
                'The function is called with a real value each time, so there is nothing to set up first. The null and array checks are the two that catch implementations written straight from typeof.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s78',
      title: 'JSON syntax check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s78-q1',
          type: 'multiple-choice',
          prompt: 'Which of these four is a valid JSON document?',
          options: [
            "{ name: 'Ada' }",
            "{ 'name': 'Ada' }",
            '{ "name": "Ada" }',
            '{ "name": "Ada", }',
          ],
          answer: 2,
          explanation:
            'Only the third obeys all three rules: double quotes on the key, double quotes on the text value, no trailing comma. The first has an unquoted key and single quotes, the second uses single quotes, and the fourth has a comma after the last pair.',
        },
        {
          id: 'quiz-js-s78-q2',
          type: 'true-false',
          prompt: 'JSON allows comments, so a line starting with // inside a document is ignored when it is parsed.',
          answer: false,
          explanation:
            'There is no comment syntax in JSON at all. A // line is a parse error, and that is why config files that ship as JSON with comments in them fail in production but work on your machine, where a different file was used.',
        },
        {
          id: 'quiz-js-s78-q3',
          type: 'blank',
          prompt: 'Which method turns a JavaScript value into JSON text?',
          answers: ['json.stringify', 'stringify', 'json.stringify()', 'stringify()', 'json . stringify'],
          explanation:
            '`JSON.stringify` is the outbound half of the bridge: values in, a string out. The `JSON` part is the object that owns the method, so the full name is `JSON.stringify`, not a bare `stringify`.',
        },
        {
          id: 'quiz-js-s78-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const text = '{"total": 9.50}'
const data = JSON.parse(text)
console.log(typeof data.total)`,
          options: ['number', 'string', 'object', 'NaN'],
          answer: 0,
          explanation:
            'The value is unquoted, so JSON reads it as a number and parse produces a JavaScript number. Had the document said "9.50" with quotes, the answer would be string and any arithmetic on it would concatenate instead.',
        },
        {
          id: 'quiz-js-s78-q5',
          type: 'identify-error',
          prompt: 'What stops this document from parsing?',
          code: `const text = '{"total": 9.50,}'
const order = JSON.parse(text)`,
          options: [
            'Nothing — JavaScript objects allow a trailing comma',
            'The trailing comma before the closing brace',
            'total is not a valid key name',
            '9.50 has too many decimal places for JSON',
          ],
          answer: 1,
          explanation:
            'JSON has no trailing commas anywhere, and a parser stops at the comma it cannot use. This is the most common copy-paste failure, because JavaScript object literals accept the very same thing and nothing warns you until the parse.',
        },
      ],
    },
  },
  {
    id: 'js-s79',
    title: 'JSON parsing',
    description: 'Turning text into values and values back into text, then using both inside a page.',
    lessons: [
      {
        id: 'js-l96',
        title: 'JSON.parse and JSON.stringify',
        description: 'The two calls that bridge text and values, and how each behaves when the data is awkward.',
        duration: 6,
        objectives: [
          'Convert values to text with JSON.stringify, including indentation and filters',
          'Convert text back with JSON.parse and handle the SyntaxError',
          'Name what a round trip loses: functions, undefined, dates and NaN',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'j-l96-b1',
            body: 'These two calls are the whole bridge. `JSON.stringify` takes live JavaScript values and returns a string; `JSON.parse` takes a string and returns live values. Everything else here is a detail of how each behaves when the data is awkward — a missing value, a function, or a string that is not valid JSON at all.',
          },
          {
            type: 'demo',
            id: 'j-l96-d1',
            title: 'Parse this and see what happens',
            body: 'Type anything into the box and press the button. Valid JSON comes back pretty-printed; anything else comes back as the exact parse error, which is the fastest way to learn the grammar.',
            html: `<textarea id="src" rows="4">{ "name": "Ada", "tags": ["js"] }</textarea>
<button id="go" type="button">Parse and re-stringify</button>
<pre id="out"></pre>`,
            css: `textarea { width: 100%; font-family: ui-monospace, SFMono-Regular, monospace; font-size: 13px; }
button { margin: 0.5rem 0; }
pre { background: #f4f6f8; padding: 0.6rem; border-radius: 6px; font-size: 13px; white-space: pre-wrap; }`,
            javascript: `const src = document.querySelector('#src')
const out = document.querySelector('#out')
document.querySelector('#go').addEventListener('click', function () {
  try {
    out.textContent = JSON.stringify(JSON.parse(src.value), null, 2)
  } catch (error) {
    out.textContent = 'Could not parse: ' + error.message
  }
})`,
          },
          {
            type: 'heading',
            id: 'j-l96-h1',
            level: 3,
            body: 'Text into values',
          },
          {
            type: 'code',
            id: 'j-l96-c1',
            language: 'javascript',
            title: 'parse, and what comes back',
            code: `const text = '{"name":"Bo","admin":false,"score":null,"tags":["js","css"]}'
const user = JSON.parse(text)

console.log(user.name)    // Bo    — a real string
console.log(user.admin)   // false — a real boolean, not the text "false"
console.log(user.score)   // null  — a real null
console.log(user.tags[1]) // css`,
          },
          {
            type: 'text',
            id: 'j-l96-b2',
            body: '`JSON.parse` is strict and unforgiving: it stops at the first thing it cannot read and gives up with a `SyntaxError`, which means every line after that call is dead code unless you handle it. Wrap anything you did not type yourself — a file, a form field, a response body — in a `try`/`catch`. Parsing proves the text is well formed and says nothing about whether the result is what you expected.',
          },
          {
            type: 'heading',
            id: 'j-l96-h2',
            level: 3,
            body: 'Values into text',
          },
          {
            type: 'code',
            id: 'j-l96-c2',
            language: 'javascript',
            title: 'stringify, with all three arguments',
            code: `const user = { name: 'Ada', role: 'admin', lastLogin: new Date() }

JSON.stringify(user)             // {"name":"Ada","role":"admin","lastLogin":"2026-01-30T09:00:00.000Z"}
JSON.stringify(user, null, 2)    // the same text, indented two spaces
JSON.stringify(user, ['name'])    // only the keys you name

// The second argument can also be a function, called for every key.
JSON.stringify(user, function (key, value) {
  return typeof value === 'function' ? undefined : value
})`,
          },
          {
            type: 'list',
            id: 'j-l96-l1',
            style: 'bullet',
            items: [
              '**Functions are dropped.** They have no JSON form, so the property disappears from the output with no warning.',
              '**`undefined` is dropped** too, as a value and as a property. `JSON.stringify(undefined)` returns `undefined`, not a string.',
              '**A `Date` becomes a text timestamp** in UTC, and comes back from `parse` as a string. `new Date(text)` is the repair.',
              '**`NaN` and `Infinity` become `null`,** because JSON has no way to write them.',
              '**A `Map`, a `Set` or an `Error` become `{}`** — their contents are not enumerable own properties.',
              '**Cyclic data cannot be stringified at all.** `JSON.stringify` gives up on an object that contains itself.',
            ],
          },
          {
            type: 'code',
            id: 'j-l96-c3',
            language: 'javascript',
            title: 'What actually survived, printed',
            code: `const payload = {
  id: 7,
  label: 'Demo',
  createdAt: new Date(),
  toString() {
    return 'x'
  },
}
console.log(JSON.stringify(payload, null, 2))
// { "id": 7, "label": "Demo", "createdAt": "2026-01-30T09:00:00.000Z" }
// the method is gone — a function has nowhere to go`,
          },
          {
            type: 'warning',
            id: 'j-l96-w1',
            title: 'response.json() is JSON.parse',
            body: 'Every JSON lesson in the browser ends at the same line. `await response.json()` reads the response body as text and parses it, so a 404 page served as HTML comes back as a parse error instead of an error you can read the message of. Check `response.ok` first, and keep the text when you need it: `const text = await response.text()`, then parse by hand. That is also how you find out whether the server sent JSON or a login page.',
          },
          {
            type: 'tip',
            id: 'j-l96-t1',
            title: 'A round trip is not identity',
            body: 'Parse then stringify gives you back something that looks the same and is not: the property order may change, the text is now unindented, `Date` objects are text, and whatever functions the original had no longer exist. That is perfectly fine for storage and transport, and wrong if you were expecting to get your object back.',
          },
          {
            type: 'exercise',
            id: 'j-l96-x1',
            exercise: {
              id: 'ex-js-json-roundtrip',
              instructions:
                'Write a function `roundTrip(value)` that takes any JavaScript value, converts it to JSON text and parses that text back, returning the result. Then log the result of `roundTrip({ name: "Ada", active: true, tags: ["a", "b"] })`.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Write roundTrip(value) below, then log the call shown in the instructions.
`,
              },
              tests: [
                {
                  id: 'ex-js-json-roundtrip-t1',
                  label: 'Objects survive the round trip with their values intact',
                  body: `if (typeof roundTrip !== 'function') return 'Define a function called roundTrip.'
var back = roundTrip({ n: 1, label: 'tea' })
return back && back.n === 1 && back.label === 'tea'
  ? true
  : 'roundTrip should parse the text it produced, so the values have to come back.';`,
                },
                {
                  id: 'ex-js-json-roundtrip-t2',
                  label: 'A boolean comes back as a boolean',
                  body: `if (typeof roundTrip !== 'function') return 'Define a function called roundTrip.'
var back = roundTrip({ active: true })
return typeof back.active === 'boolean' && back.active === true
  ? true
  : 'true has to come back as a boolean, got ' + typeof back.active + '.';`,
                },
                {
                  id: 'ex-js-json-roundtrip-t3',
                  label: 'An array comes back as an array',
                  body: `if (typeof roundTrip !== 'function') return 'Define a function called roundTrip.'
var back = roundTrip([1, 2, 3])
return Array.isArray(back) && back.length === 3
  ? true
  : 'An array has to come back as an array with all three values.';`,
                },
                {
                  id: 'ex-js-json-roundtrip-t4',
                  label: 'A function property is gone after the trip',
                  body: `if (typeof roundTrip !== 'function') return 'Define a function called roundTrip.'
var back = roundTrip({ keep: 1, greet: function () { return 'hi' } })
return back.keep === 1 && typeof back.greet === 'undefined'
  ? true
  : 'A function cannot be written as JSON, so the greet property should be absent after the trip.';`,
                },
              ],
              hints: [
                'Two lines do the whole job: `const text = JSON.stringify(value)` and then `return JSON.parse(text)`.',
                'Parse the text you just produced, not the value you started with — otherwise nothing is being tested.',
                'Check what disappears: `roundTrip({ keep: 1, greet: function () {} })` comes back with no `greet` property at all.',
              ],
              solution: {
                javascript: `function roundTrip(value) {
  const text = JSON.stringify(value)
  return JSON.parse(text)
}

console.log(roundTrip({ name: 'Ada', active: true, tags: ['a', 'b'] }))`,
              },
              testNotes:
                'The fourth check is the one that surprises people: functions are dropped by stringify, so after the trip the property is genuinely absent rather than null. No test inspects the intermediate text — the whole point is what comes back out.',
            },
          },
        ],
      },
      {
        id: 'js-l97',
        title: 'JSON objects and arrays',
        description: 'Navigating a parsed document as a tree, and turning it into something you can display.',
        duration: 5,
        objectives: [
          'Navigate nested objects and arrays out of parsed text',
          'Map, filter and reduce over an array of objects',
          'Default a missing key once instead of guarding it in four places',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l97-b1',
            body: 'A parsed document is not a flat list of values — it is a tree, and walking it is the same as walking any object you wrote yourself. The difference is that you did not choose the keys, so every read is a guess until something checks it.',
          },
          {
            type: 'demo',
            id: 'j-l97-d1',
            title: 'One document, three views of it',
            body: 'The same parsed array rendered three ways: as a list of names, as a count of everything, and as the work still outstanding. All three read the parsed data and nothing else, which is the point — the document is the single source of truth.',
            html: `<ul id="team"></ul>
<p id="open"></p>`,
            css: `ul { padding-left: 1.1rem; }
p { color: #555; font-size: 14px; }`,
            javascript: `const text = '{"people":[{"name":"Ada","done":true},{"name":"Bo","done":false}]}'
const data = JSON.parse(text)
const list = document.querySelector('#team')
data.people.forEach(function (person) {
  const item = document.createElement('li')
  item.textContent = person.name
  list.appendChild(item)
})
const left = data.people.filter(function (person) { return !person.done })
document.querySelector('#open').textContent = left.length + ' still to do'`,
          },
          {
            type: 'heading',
            id: 'j-l97-h1',
            level: 3,
            body: 'Reading into a structure',
          },
          {
            type: 'code',
            id: 'j-l97-c1',
            language: 'javascript',
            title: 'Dot and bracket access on parsed data',
            code: `const data = JSON.parse(text)
data.people.length              // how many
data.people[0].name             // the first name
data.meta.owner.name            // the name two levels down
data.people[1].name             // brackets work too: data.people[1]['name']
data.meta.owner?.name ?? 'none' // optional chaining, then a default`,
          },
          {
            type: 'text',
            id: 'j-l97-b2',
            body: 'Dot access on parsed data carries the same hazard it carries anywhere: `data.people[0].name` throws a TypeError if `people` is missing, throws on the index if `people` is an empty array, and gives `undefined` if the entry has no `name`. Optional chaining turns the first of those into a harmless `undefined`, `Array.isArray` and a length check handle the second, and only the third needs a `?.`.',
          },
          {
            type: 'heading',
            id: 'j-l97-h2',
            level: 3,
            body: 'Arrays of objects, the usual shape',
          },
          {
            type: 'code',
            id: 'j-l97-c2',
            language: 'javascript',
            title: 'The same four array methods, on parsed data',
            code: `const names = data.people.map(function (person) { return person.name })
const waiting = data.people.filter(function (person) { return !person.done })
const total = data.people.reduce(function (sum, person) {
  return sum + person.hours
}, 0)

// One default, decided once, where the data enters your code.
const rows = (data.people ?? []).map(function (person) {
  return person.name + ' (' + (person.hours ?? 0) + 'h)'
})`,
          },
          {
            type: 'text',
            id: 'j-l97-b3',
            body: 'The `?? []` on the last line is the habit worth keeping. When a key might be missing, decide the empty case once at the point the data enters your code rather than in four places downstream. Array methods do not care what is inside an array of objects — `map`, `filter` and `reduce` see elements, and the property reads are ordinary reads you could have written by hand.',
          },
          {
            type: 'warning',
            id: 'j-l97-w1',
            title: 'A number is not guaranteed to be a number',
            body: 'A JSON number is a JavaScript number only when the sender wrote it unquoted. A form-encoded value, a spreadsheet column or a hand-edited config file can all put "31" where you expect 31, and then `person.hours + 1` quietly produces "311" with no error anywhere. Check with `typeof` once at the edge, or convert with `Number(...)`, and let the rest of the code assume it was told the truth.',
          },
          {
            type: 'tip',
            id: 'j-l97-t1',
            title: 'Check the shape once, then trust it',
            body: 'When a document has a shape you rely on, check it in one place — `if (!Array.isArray(data.people)) return` — and let the rest of the function assume it. Every line after that reads as though the shape were guaranteed, and when it is not you find out in one clear message instead of four.',
          },
          {
            type: 'exercise',
            id: 'j-l97-x1',
            exercise: {
              id: 'ex-js-json-list',
              instructions:
                'The `text` variable holds a document with a `tasks` array. Parse it into a variable called `data`, build an array called `open` holding the `text` of every task that is not done, and log those titles joined with a comma and a space.',
              languages: ['javascript'],
              starterCode: {
                javascript: `const text = '{"tasks":[{"text":"Read chapter 3","done":false},{"text":"Buy milk","done":true}]}'
// Parse text into data, then build open and log it.
`,
              },
              expectedOutput: 'Read chapter 3',
              tests: [
                {
                  id: 'ex-js-json-list-t1',
                  label: 'data holds the parsed document with both tasks',
                  body: `if (typeof data === 'undefined' || data === null) return 'Parse the string into a variable called data.'
if (!Array.isArray(data.tasks)) return 'The parsed object should have a tasks array.'
return data.tasks.length === 2
  ? true
  : 'The document lists two tasks, found ' + data.tasks.length + '.';`,
                },
                {
                  id: 'ex-js-json-list-t2',
                  label: 'done arrived as a boolean',
                  body: `if (typeof data === 'undefined' || !data.tasks) return 'Parse the string into a variable called data.'
return typeof data.tasks[0].done === 'boolean'
  ? true
  : 'done should come back as a boolean, got ' + typeof data.tasks[0].done + '.';`,
                },
                {
                  id: 'ex-js-json-list-t3',
                  label: 'open holds only the unfinished title',
                  body: `if (typeof open === 'undefined' || !Array.isArray(open)) return 'Build an array called open holding the unfinished task texts.'
return open.length === 1 && open[0] === 'Read chapter 3'
  ? true
  : 'Only the unfinished task belongs in open, got: ' + JSON.stringify(open);`,
                },
                {
                  id: 'ex-js-json-list-t4',
                  label: 'The console shows the unfinished titles only',
                  body: `var log = (window.__log || []).join(' | ')
return log.indexOf('Read chapter 3') > -1 && log.indexOf('Buy milk') === -1
  ? true
  : 'Log only the unfinished titles, for example console.log(open.join(", ")).';`,
                },
              ],
              hints: [
                '`const data = JSON.parse(text)` gives you `data.tasks` as an array of two objects, each with `text` and `done`.',
                'A filter keeps what you want, then a map picks the field: `data.tasks.filter(function (task) { return !task.done }).map(function (task) { return task.text })`.',
                'Assign that to `open`, then log it with `console.log(open.join(", "))` so the titles appear in the console.',
              ],
              solution: {
                javascript: `const text = '{"tasks":[{"text":"Read chapter 3","done":false},{"text":"Buy milk","done":true}]}'
const data = JSON.parse(text)

const open = data.tasks
  .filter(function (task) { return !task.done })
  .map(function (task) { return task.text })

console.log(open.join(', '))`,
              },
              testNotes:
                'The checks read the parsed object rather than the text, so slicing the string by hand will not pass them. The last check reads the console: the output has to contain the unfinished title and must not contain the finished one.',
            },
          },
        ],
      },
      {
        id: 'js-l98',
        title: 'JSON in HTML',
        description: 'The two ways JSON reaches a page: fetched over the network, or carried in the markup itself.',
        duration: 5,
        objectives: [
          'Read a JSON island out of a script tag with textContent and JSON.parse',
          'Fetch JSON and handle a response that is not JSON at all',
          'Explain why a closing script tag inside embedded JSON breaks the page',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'j-l98-b1',
            body: 'JSON reaches an HTML page in two ways, and you will meet both. Either the server sends it and `fetch` parses the response, or the page itself carries it as text inside a `<script>` tag that your code parses on load. That second pattern is called a **data island**: the page ships its own initial data with no round trip, which is how server-rendered apps and static sites hand state to the client.',
          },
          {
            type: 'demo',
            id: 'j-l98-d1',
            title: 'A data island in the page',
            body: 'The JSON sits in a script tag the browser never runs. The code below reads it with `textContent`, parses it, and renders it — the same path a server-rendered page uses for the data it already knows.',
            html: `<script type="application/json" id="site-data">
  { "name": "CodeIngot", "tags": ["html", "css", "javascript"] }
</script>
<h3 id="who"></h3>
<ul id="tags"></ul>`,
            css: `ul { padding-left: 1.1rem; }
h3 { margin: 0.5rem 0 0.25rem; }`,
            javascript: `const island = document.querySelector('#site-data')
const data = JSON.parse(island.textContent)

document.querySelector('#who').textContent = data.name
const list = document.querySelector('#tags')
data.tags.forEach(function (tag) {
  const item = document.createElement('li')
  item.textContent = tag
  list.appendChild(item)
})`,
          },
          {
            type: 'heading',
            id: 'j-l98-h1',
            level: 3,
            body: 'Reading an island',
          },
          {
            type: 'code',
            id: 'j-l98-c1',
            language: 'html',
            title: 'The whole pattern in four lines',
            code: `<script type="application/json" id="site-data">
  { "name": "CodeIngot", "tags": ["html", "css", "javascript"] }
</script>

<script>
  const data = JSON.parse(document.querySelector('#site-data').textContent)
  document.querySelector('#tags').textContent = data.tags.join(', ')
</script>`,
          },
          {
            type: 'text',
            id: 'j-l98-b2',
            body: 'Three details make it work. The tag is `type="application/json"`, so the browser treats the contents as data and never tries to execute them — the same JSON inside a plain `<script>` is a syntax error. You read it with `textContent`, because a script element holds text, and then you parse that text to get values. And a script element\'s text is literally every character between its tags, so a JSON string containing the sequence that closes a script tag ends the element early and dumps the rest of the document into your JSON. Escaping the slash inside the JSON string is the standard repair, because JSON itself reads `\\/` as a plain slash.',
          },
          {
            type: 'heading',
            id: 'j-l98-h2',
            level: 3,
            body: 'Getting JSON over HTTP',
          },
          {
            type: 'code',
            id: 'j-l98-c2',
            language: 'javascript',
            title: 'fetch, checked before it is parsed',
            code: `async function loadUsers(url) {
  const response = await fetch(url)
  if (!response.ok) {
    // Checked first, so a login page or a 404 never reaches the parser.
    return []
  }
  return response.json()   // which is JSON.parse on the response text
}`,
          },
          {
            type: 'warning',
            id: 'j-l98-w1',
            title: 'A parse error is not an error message',
            body: 'When a server answers with an HTML page — a login screen, a 404, a maintenance notice — `response.json()` still runs, and the failure it reports is a `SyntaxError` about a stray `<`. You learn nothing about what actually went wrong. Read `await response.text()`, check `response.ok` and the content type, and only then parse, so a real message is still there when you log it.',
          },
          {
            type: 'list',
            id: 'j-l98-l1',
            style: 'bullet',
            items: [
              '`<script type="application/json">` — the data island pattern above, read by your own code.',
              '`<script type="application/ld+json">` — structured data for search engines. Same syntax, different reader.',
              '`<script type="importmap">` — JSON that tells the browser which bare specifier maps to which URL.',
              'The `fetch` and `response.json()` pair — the same format, arriving over the network instead of in the markup.',
              'A `.json` file fetched at start-up — a config file shipped next to the page.',
            ],
          },
          {
            type: 'exercise',
            id: 'j-l98-x1',
            exercise: {
              id: 'ex-js-json-html',
              instructions:
                'The page already has a JSON island and an empty list. Parse the island into a variable called `data`, render every tag in `data.site.tags` as its own list item inside #tags, and set the text of #who to the site name. Keep the script tag as it is — you are changing the JavaScript only.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: `<script type="application/json" id="site-data">
  { "site": { "name": "CodeIngot", "tags": ["html", "css", "javascript"] } }
</script>

<h3 id="who"></h3>
<ul id="tags"></ul>
`,
                javascript: `// Parse the island into data, then fill #tags and #who.
`,
              },
              tests: [
                {
                  id: 'ex-js-json-html-t1',
                  label: 'One list item was rendered per tag',
                  body: `var out = document.querySelector('#tags')
if (!out) return 'Keep the ul with id tags.'
var items = out.querySelectorAll('li')
return items.length === 3
  ? true
  : 'Render one li for each of the three tags, found ' + items.length + '.';`,
                },
                {
                  id: 'ex-js-json-html-t2',
                  label: 'The tags appear in the order the JSON lists them',
                  body: `var out = document.querySelector('#tags')
if (!out) return 'Keep the ul with id tags.'
var items = out.querySelectorAll('li')
if (items.length < 2) return 'Render one li per tag first.'
return items[1].textContent === 'css'
  ? true
  : 'The second tag should be css, got: ' + items[1].textContent;`,
                },
                {
                  id: 'ex-js-json-html-t3',
                  label: '#who shows the site name from the JSON',
                  body: `var who = document.querySelector('#who')
if (!who) return 'Keep the heading with id who.'
return who.textContent === 'CodeIngot'
  ? true
  : 'Set the text of #who to data.site.name, got: ' + who.textContent;`,
                },
                {
                  id: 'ex-js-json-html-t4',
                  label: 'The island was parsed into a variable called data',
                  body: `if (typeof data === 'undefined' || data === null) return 'Parse the island into a variable called data.'
return Array.isArray(data.site.tags)
  ? true
  : 'data.site.tags should be the array from the JSON, got: ' + JSON.stringify(data);`,
                },
              ],
              hints: [
                'The island is a script element: `const island = document.querySelector("#site-data")`, then `JSON.parse(island.textContent)`.',
                'Create one `li` per tag with `document.createElement("li")`, set its `textContent`, and `appendChild` it to the list inside a `forEach`.',
                'Finish with `document.querySelector("#who").textContent = data.site.name`.',
              ],
              solution: {
                html: `<script type="application/json" id="site-data">
  { "site": { "name": "CodeIngot", "tags": ["html", "css", "javascript"] } }
</script>

<h3 id="who"></h3>
<ul id="tags"></ul>
`,
                javascript: `const island = document.querySelector('#site-data')
const data = JSON.parse(island.textContent)

document.querySelector('#who').textContent = data.site.name

const list = document.querySelector('#tags')
data.site.tags.forEach(function (tag) {
  const item = document.createElement('li')
  item.textContent = tag
  list.appendChild(item)
})`,
              },
              testNotes:
                'The first three checks read the rendered DOM, so they pass whichever way you build the list. The fourth keeps a data variable so the parse has to exist on its own rather than hidden inside a chain.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s79',
      title: 'JSON parsing check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s79-q1',
          type: 'multiple-choice',
          prompt: 'What happens when you pass text that is not valid JSON to JSON.parse?',
          options: [
            'It returns null and carries on',
            'It returns an object built from whatever it could read',
            'It raises a SyntaxError that you can catch, and nothing after the call runs',
            'It returns undefined',
          ],
          answer: 2,
          explanation:
            'The parser stops at the first thing it cannot read and throws, so every line after that call is dead code unless you wrap it. This is why text from a file, a form field or a response body always goes inside a try/catch.',
        },
        {
          id: 'quiz-js-s79-q2',
          type: 'true-false',
          prompt: 'After a parse and stringify round trip, a Date is still a Date.',
          answer: false,
          explanation:
            'JSON has no date type, so stringify writes it as a UTC text timestamp and parse gives that text back as a string. `new Date(text)` is the repair, and you have to do it yourself every time.',
        },
        {
          id: 'quiz-js-s79-q3',
          type: 'blank',
          prompt: 'Which response method is JSON.parse in disguise?',
          answers: ['response.json', 'json', 'response.json()', 'r.json()', 'response . json'],
          explanation:
            '`response.json()` reads the body as text and parses it. That is also why it throws on an HTML error page, and why checking `response.ok` first is not optional.',
        },
        {
          id: 'quiz-js-s79-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `const text = '{"tags":["a","b"]}'
const data = JSON.parse(text)
console.log(data.tags.length, typeof data.tags[0])`,
          options: ['2 string', '2 object', '1 string', 'undefined undefined'],
          answer: 0,
          explanation:
            'The array has two entries, so the length is 2, and each entry is a JSON string, so typeof reports "string". If it printed "object" you would be looking at a nested object rather than an array of names.',
        },
        {
          id: 'quiz-js-s79-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this line?',
          code: `const island = document.querySelector('#site-data')
const tags = island.textContent.tags.join(', ')
console.log(tags)`,
          options: [
            'textContent is a string, so it has no tags property to join',
            'The script tag must be type="text/javascript" to be readable',
            'join only works on arrays of numbers',
            'querySelector cannot reach a script element',
          ],
          answer: 0,
          explanation:
            'The text inside the script tag is characters, so you have to parse it before reading properties: `JSON.parse(island.textContent).tags`. Skipping the parse gives a TypeError about reading a property of undefined.',
        },
      ],
    },
  },
  {
    id: 'js-s80',
    title: 'Modules',
    description: 'One scope per file, and an explicit list of what the rest of the page is allowed to use.',
    lessons: [
      {
        id: 'js-l99',
        title: 'Modules',
        description: 'One file, one scope, and an explicit list of what the rest of the page is allowed to use.',
        duration: 5,
        objectives: [
          'Turn a script into a module with type="module"',
          'Export and import named things, and use a default export',
          'Explain why module code is deferred and runs in strict mode',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'j-l99-b1',
            body: 'One file holding everything is one file holding everything: one bug, one `var`, and a page where every script can reach into every other script. A **module** fixes that with two rules — the file gets its own scope, and it publishes an explicit list of what other files may use. Strict mode, private top-level names and imports that load before they are needed all follow from those two rules.',
          },
          {
            type: 'demo',
            id: 'j-l99-d1',
            title: 'A module written by hand',
            body: 'Real modules use the import and export keywords, which need a server. This is the same idea without them: the state lives inside the wrapper, and the outside world gets a single object holding the one function it is allowed to call. Everything else — including the count itself — stays private.',
            html: `<button id="add" type="button">Add one</button>
<p id="out">0</p>`,
            css: `button { font: inherit; padding: 0.35rem 0.7rem; }
p { font-size: 15px; }`,
            javascript: `const counter = (function () {
  let count = 0                       // private: nothing outside can reach it
  return {
    increment: function () {
      count += 1
      return count
    },
  }
})()

const out = document.querySelector('#out')
document.querySelector('#add').addEventListener('click', function () {
  out.textContent = counter.increment()
})`,
          },
          {
            type: 'heading',
            id: 'j-l99-h1',
            level: 3,
            body: 'A script that is a module',
          },
          {
            type: 'code',
            id: 'j-l99-c1',
            language: 'html',
            title: 'One attribute changes the rules',
            code: `<!-- the old way: both files share one global scope -->
<script src="counter.js"></script>
<script src="ui.js"></script>

<!-- the new way: each file is its own module -->
<script type="module" src="counter.js"></script>
<script type="module" src="ui.js"></script>`,
          },
          {
            type: 'text',
            id: 'j-l99-b2',
            body: '`type="module"` changes three things at once. The file gets its own scope, so top-level `const` and `function` declarations stop leaking onto the page. The code runs in **strict mode**, which turns silent mistakes — assigning to an undeclared variable, `this` being `undefined` inside a plain function — into errors you see immediately. And the file is treated as **deferred**: the browser fetches it in parallel with the rest of the page but only runs it after the document is parsed, so your code can query elements at the top level without wrapping everything in a load handler. One catch: modules are fetched over HTTP, so opening the page from a `file://` path will not work — serve the folder instead.',
          },
          {
            type: 'heading',
            id: 'j-l99-h2',
            level: 3,
            body: 'Exporting and importing',
          },
          {
            type: 'code',
            id: 'j-l99-c2',
            language: 'javascript',
            title: 'Named exports',
            code: `// counter.js
export let count = 0                  // a named export
export function increment() { count += 1 }

// ui.js
import { count, increment } from './counter.js'
console.log(count)
increment()
console.log(count)                    // 1`,
          },
          {
            type: 'code',
            id: 'j-l99-c3',
            language: 'javascript',
            title: 'Named versus default',
            code: `// date.js — one default export, the file's main thing
export default function formatDate(date) {
  return String(date)
}

// main.js
import formatDate from './date.js'     // default: any local name you like
import { helper } from './other.js'   // named: the name has to match`,
          },
          {
            type: 'list',
            id: 'j-l99-l1',
            style: 'bullet',
            items: [
              '**Named exports** are the sensible default: the import states exactly what it uses, and renaming in the source file breaks the import loudly instead of quietly.',
              'A **default export** is the file\'s headline feature, imported without braces and under any name you choose — convenient for one formatter or class, unhelpful when the reader cannot tell what they have.',
              '`export { a, b }` at the bottom of a file exports a list written in one place; `import * as utils` pulls the whole public surface under a single name.',
              'Import paths need the file extension and are resolved relative to the file doing the importing, not relative to the page.',
            ],
          },
          {
            type: 'warning',
            id: 'j-l99-w1',
            title: 'No globals means no shared state by accident',
            body: 'The first thing you give up is the trick of two script tags sharing a `var`. That was never sharing, it was a leak, and it worked only as long as load order never changed. If two modules need the same thing, one of them imports it and exports it; if two modules need to change the same thing, that thing belongs in a third module they both import. The second thing you give up is `var` quietly creating a global — which is the entire point of strict mode.',
          },
          {
            type: 'exercise',
            id: 'j-l99-x1',
            exercise: {
              id: 'ex-js-modules',
              instructions:
                'These two scripts used to sit in separate `<script>` tags and shared `greeting` and `greet` through the global scope. Turn the first one into a module: wrap it in a function that returns `{ greet }`, so nothing it declares stays on `window`, and have the second script go through the returned object. Keep the two log lines and their output exactly as they are.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Script 1 — the "module"
var greeting = 'Hello'
function greet(name) {
  return greeting + ', ' + name
}

// Script 2 — the "importing" script, in its own <script> tag
console.log(greet('Ada'))
console.log(greet('Bo'))
`,
              },
              tests: [
                {
                  id: 'ex-js-modules-t1',
                  label: 'greet is no longer a global',
                  body: `return typeof window.greet === 'undefined' ? true : 'greet is still on window — the first script still leaks. Wrap it so its declarations stop escaping.';`,
                },
                {
                  id: 'ex-js-modules-t2',
                  label: 'greeting is no longer a global either',
                  body: `return typeof window.greeting === 'undefined' ? true : 'greeting is still on window. Everything the first script declares has to stay inside the module.';`,
                },
                {
                  id: 'ex-js-modules-t3',
                  label: 'The behaviour is unchanged: it still greets Ada',
                  body: `var log = (window.__log || []).join(' | ')
return log.indexOf('Hello, Ada') > -1 ? true : 'The console should still show "Hello, Ada" — the output must not change.';`,
                },
                {
                  id: 'ex-js-modules-t4',
                  label: 'The behaviour is unchanged: it still greets Bo',
                  body: `var log = (window.__log || []).join(' | ')
return log.indexOf('Hello, Bo') > -1 ? true : 'The console should still show "Hello, Bo" — both script calls have to keep working.';`,
                },
              ],
              hints: [
                'Wrap the body of the first script in a function, declare `greeting` and `greet` inside it, and `return` an object holding `greet`.',
                'Give the wrapper a name and call it: `const messageUtils = (function () { ... })()`.',
                'Then change the two log lines to go through it: `messageUtils.greet("Ada")` and `messageUtils.greet("Bo")`.',
              ],
              solution: {
                javascript: `// utils.js — the module: nothing declared here is global
const messageUtils = (function () {
  const greeting = 'Hello'

  function greet(name) {
    return greeting + ', ' + name
  }

  return { greet }
})()

// main.js — the importing script
console.log(messageUtils.greet('Ada'))
console.log(messageUtils.greet('Bo'))`,
              },
              testNotes:
                'The sandbox runs your code as a classic script, so real import and export statements would not run here. What the checks measure is the half that matters: a private scope plus an explicit list of what the outside world may use. The import and export syntax for the same job is earlier in this lesson, and the hand-written version is the demo at the top.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s80',
      title: 'Modules check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s80-q1',
          type: 'multiple-choice',
          prompt: 'What does type="module" do to a script file?',
          options: [
            'It downloads the file before the rest of the page so it runs first',
            'It gives the file its own scope, runs it in strict mode and defers it until the document is parsed',
            'It turns the file into a library that other pages can use',
            'It runs the file once for the page and once for every importer',
          ],
          answer: 1,
          explanation:
            'Three effects in one attribute: private top-level scope, strict mode, and deferred execution. Deferring is why module code can query elements at the top level without a load handler. It does not run first — that would be the opposite of what defer means.',
        },
        {
          id: 'quiz-js-s80-q2',
          type: 'true-false',
          prompt: 'Two module files can share a value by both declaring it with var at the top level.',
          answer: false,
          explanation:
            'Each module has its own scope, so the two declarations are unrelated and nothing is shared. Sharing happens through an export on one side and an import on the other, which makes it visible in the source instead of depending on load order.',
        },
        {
          id: 'quiz-js-s80-q3',
          type: 'blank',
          prompt: 'Which keyword publishes a named value from a module so another file can import it?',
          answers: ['export'],
          explanation:
            '`export` marks what the outside world may use, `import` asks for it by name. Naming your public surface is what makes a module readable: the reader of an import statement sees exactly what the file offers.',
        },
        {
          id: 'quiz-js-s80-q4',
          type: 'code-output',
          prompt: 'Two modules as written here. What does main.js print?',
          code: `// counter.js
export let count = 0
export function increment() { count += 1 }

// main.js
import { count, increment } from './counter.js'
increment()
console.log(count)`,
          options: ['0', '1', 'undefined', '2'],
          answer: 1,
          explanation:
            'An imported binding is a live view of the exporting module, not a copy taken at import time. The increment changes count in counter.js, and the log reads the new value: 1. Copying the value instead would print 0.',
        },
        {
          id: 'quiz-js-s80-q5',
          type: 'identify-error',
          prompt: 'What is wrong with this import?',
          code: `// utils.js
export function greet(name) { return 'Hi, ' + name }

// main.js
import greet from './utils.js'
console.log(greet('Ada'))`,
          options: [
            'Nothing is wrong, this is the usual form',
            'utils.js has no default export, so greet is undefined here — it needs a named import',
            'The path must drop the .js extension',
            'greet has to be called before it is imported',
          ],
          answer: 1,
          explanation:
            'A default import without braces expects a default export, and utils.js only has a named one. `import { greet } from "./utils.js"` is the fix, and the failure is loud rather than silent, which is exactly why named exports are the safer default.',
        },
      ],
    },
  },
  {
    id: 'js-s81',
    title: 'Final project',
    description: 'Data, render and events wired together into a task tracker that actually works.',
    lessons: [
      {
        id: 'js-l100',
        title: 'Build an interactive task tracker',
        description: 'Combine HTML, CSS and JavaScript into a small app that actually works.',
        duration: 25,
        objectives: [
          'Keep a list of tasks in an array and render it',
          'Add, complete and clear tasks through the DOM',
          'Drive an empty state from the same data as the list',
        ],
        xp: 120,
        content: [
          {
            type: 'text',
            id: 'j-l100-b1',
            body: 'Everything so far has been one idea at a time. This project is about holding one idea in your head while wiring three things together: the **data** (an array of tasks), the **render** (a function that turns that array into list items) and the **events** (the buttons and the form that change the data).',
          },
          {
            type: 'demo',
            id: 'j-l100-d1',
            title: 'The three parts, running',
            body: 'Type a task, press Enter, and watch the count change. The array at the top is the only state there is; the list and the number below it are both drawn from it by one render function, and every event ends by calling that function again.',
            html: `<h3>Tasks</h3>
<form id="task-form">
  <label for="task-input">New task</label>
  <input id="task-input" type="text" placeholder="e.g. Buy milk" />
  <button type="submit">Add</button>
</form>
<ul id="task-list"></ul>
<p id="count">0 tasks</p>`,
            css: `#task-list { list-style: none; padding: 0; }
#task-list li { padding: 0.25rem 0; }
#count { color: #555; font-size: 14px; }`,
            javascript: `const list = document.querySelector('#task-list')
const input = document.querySelector('#task-input')
const count = document.querySelector('#count')
const tasks = []

function render() {
  list.replaceChildren()
  tasks.forEach(function (text) {
    const item = document.createElement('li')
    item.textContent = text
    list.appendChild(item)
  })
  count.textContent = tasks.length + ' tasks'
}

document.querySelector('#task-form').addEventListener('submit', function (event) {
  event.preventDefault()
  const text = input.value.trim()
  if (!text) return
  tasks.push(text)
  input.value = ''
  render()
})`,
          },
          {
            type: 'heading',
            id: 'j-l100-h1',
            level: 3,
            body: 'What you are building',
          },
          {
            type: 'list',
            id: 'j-l100-l1',
            style: 'ordered',
            items: [
              'Add a task by typing in the form and pressing Enter or clicking Add.',
              'Mark a task done with its own button — the row gets the class `done` so CSS can strike it through.',
              'Delete completed tasks with the "Clear completed" button; unfinished tasks stay.',
              'A live count updates automatically because the list is rebuilt from the array on every change.',
              'State lives in one `let tasks` array of objects shaped `{ text, done }`.',
              'A single `render()` function rebuilds the entire list and toggles the `#empty` message.',
            ],
          },
          {
            type: 'heading',
            id: 'j-l100-h2',
            level: 3,
            body: 'Planning routine',
          },
          {
            type: 'text',
            id: 'j-l100-b2',
            body: 'Follow this order and the pieces fall into place: first model the data, then write the render function, then wire the events. Each step only touches what the previous step created.',
          },
          {
            type: 'list',
            id: 'j-l100-l2',
            style: 'ordered',
            items: [
              'Declare `let tasks = []` — each task is `{ text: string, done: boolean }`.',
              'Write `render()` that clears the list, loops `tasks`, creates an `li` and a toggle button for each, and sets `empty.hidden = tasks.length > 0`.',
              'Attach the form submit handler: prevent default, trim the input, return early if empty, push a new task, clear the input, call `render()`.',
              'Attach the clear-completed handler: filter `tasks` to keep only undone ones, call `render()`.',
            ],
          },
          {
            type: 'code',
            id: 'j-l100-c1',
            language: 'javascript',
            title: 'The data and the render function',
            code: `let tasks = [{ text: 'Buy milk', done: false }]

function render() {
  const list = document.querySelector('#task-list')
  list.replaceChildren()

  tasks.forEach(function (task, index) {
    const item = document.createElement('li')
    item.textContent = task.text

    if (task.done) {
      item.classList.add('done')       // same class your CSS styles
    }

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.textContent = task.done ? 'Undo' : 'Done'
    toggle.addEventListener('click', function () {
      tasks[index].done = !tasks[index].done
      render()
    })

    item.appendChild(toggle)
    list.appendChild(item)
  })

  const empty = document.querySelector('#empty')
  empty.hidden = tasks.length > 0
}`,
          },
          {
            type: 'tip',
            id: 'j-l100-t1',
            title: 'Render on every change',
            body: 'Do not try to patch individual list items after every action. Empty the list and rebuild it — for a list of this size that is instant, and it removes a whole category of bugs where the page and the data drift apart.',
          },
          {
            type: 'example',
            id: 'j-l100-e1',
            title: 'The whole loop, in miniature',
            body: 'Add tasks, tick them off, then clear. Every one of those three buttons changes the array and then calls the same render function — exactly the shape you are about to build.',
            html: `<h1>Task tracker</h1>

<form id="task-form">
  <label for="task-input">New task</label>
  <input id="task-input" name="task" type="text" placeholder="e.g. Buy milk" />
  <button type="submit">Add</button>
</form>

<ul id="task-list"></ul>
<button type="button" id="clear-done">Clear completed</button>
<p id="empty">Nothing to do. Add a task above.</p>`,
            css: `#task-list { list-style: none; padding: 0; }
#task-list li { display: flex; align-items: center; gap: 0.5rem; padding: 0.3rem 0; }
#task-list li.done { text-decoration: line-through; opacity: 0.6; }`,
            javascript: `const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const empty = document.querySelector('#empty')
let tasks = []

function render() {
  list.replaceChildren()

  tasks.forEach(function (task, index) {
    const item = document.createElement('li')
    item.textContent = task.text
    if (task.done) item.classList.add('done')

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.textContent = task.done ? 'Undo' : 'Done'
    toggle.addEventListener('click', function () {
      tasks[index].done = !tasks[index].done
      render()
    })

    item.appendChild(toggle)
    list.appendChild(item)
  })

  empty.hidden = tasks.length > 0
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const text = input.value.trim()
  if (!text) return
  tasks.push({ text: text, done: false })
  input.value = ''
  render()
})

document.querySelector('#clear-done').addEventListener('click', function () {
  tasks = tasks.filter(function (task) { return !task.done })
  render()
})

render()`,
            showPreview: true,
          },
          {
            type: 'tip',
            id: 'j-l100-t2',
            title: 'Tests check behaviour, not styling',
            body: 'The checks drive the interface the way a person would — they fill the input, fire the submit event and click the row buttons. They are testing behaviour and structure, not markup or CSS, so the visual design is entirely your choice. The one hard requirement is the class name `done` on a completed row, because the tests need a way to recognise that state.',
          },
          {
            type: 'exercise',
            id: 'j-l100-x1',
            exercise: {
              id: 'ex-js-task-tracker',
              instructions:
                'Finish the task tracker. Submitting the form adds a task to the list, an empty or whitespace-only input is ignored, each row has a button that marks it done, the done state uses the class "done", the "clear completed" button removes finished tasks and leaves the rest, and the #empty paragraph is hidden whenever at least one task is on screen.',
              languages: ['html', 'css', 'javascript'],
              starterCode: {
                html: `<h1>Task tracker</h1>

<form id="task-form">
  <label for="task-input">New task</label>
  <input id="task-input" name="task" type="text" placeholder="e.g. Buy milk" />
  <button type="submit" id="add-task">Add</button>
</form>

<ul id="task-list"></ul>

<button type="button" id="clear-done">Clear completed</button>
<p id="empty">Nothing to do. Add a task above.</p>`,
                css: `#task-list {
  list-style: none;
  padding: 0;
}

#task-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
}

#task-list li.done {
  text-decoration: line-through;
  opacity: 0.6;
}`,
                javascript: `const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const clearButton = document.querySelector('#clear-done')
const empty = document.querySelector('#empty')

let tasks = []

// Render the list from tasks, and update the empty message.
function render() {
  
}

// Add a task when the form is submitted.
form.addEventListener('submit', function (event) {
  
})

// Remove every completed task.
clearButton.addEventListener('click', function () {
  
})
`,
              },
              tests: [
                {
                  id: 'ex-js-task-tracker-t1',
                  label: 'Submitting the form adds a task, and hides the empty message',
                  body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
var empty = document.querySelector('#empty')
if (!form || !input || !list || !empty) return 'Keep the form, the input, the list and the #empty paragraph.'
var before = list.querySelectorAll('li').length
input.value = 'Buy milk'
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
var items = list.querySelectorAll('li')
if (items.length !== before + 1) return 'After adding Buy milk the list should hold one more item.'
if (items[items.length - 1].textContent.indexOf('Buy milk') === -1) return 'The new row should contain the text that was typed.'
return empty.hidden === true ? true : 'Set empty.hidden = true from your render function whenever at least one task is listed.';`,
                },
                {
                  id: 'ex-js-task-tracker-t2',
                  label: 'An empty input does not create a blank task',
                  body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
if (!form || !input || !list) return 'Keep the form, the input and the #task-list element.'
var before = list.querySelectorAll('li').length
input.value = '   '
form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
return list.querySelectorAll('li').length === before
  ? true
  : 'Trim the input and return early when nothing is left, so blank rows never appear.';`,
                },
                {
                  id: 'ex-js-task-tracker-t3',
                  label: 'Clicking the row button marks it done with the class "done"',
                  body: `var list = document.querySelector('#task-list')
if (!list) return 'Keep the #task-list element.'
var items = list.querySelectorAll('li')
if (items.length === 0) return 'Add a task first, so the checks have a row to click.'
var button = items[0].querySelector('button')
if (!button) return 'Each task row needs a button that marks the task done.'
button.click()
var rows = list.querySelectorAll('li')
return rows[0].classList.contains('done')
  ? true
  : 'After clicking the button the row should have the class done, so your CSS can strike it through.';`,
                },
                {
                  id: 'ex-js-task-tracker-t4',
                  label: 'Clear completed removes finished tasks and keeps the rest',
                  body: `var form = document.querySelector('#task-form')
var input = document.querySelector('#task-input')
var list = document.querySelector('#task-list')
var clearButton = document.querySelector('#clear-done')
if (!form || !input || !list || !clearButton) return 'Keep the form, the input, the list and the #clear-done button.'
if (list.querySelectorAll('li').length < 2) {
  input.value = 'Finished'
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
  input.value = 'Ongoing'
  form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
}
var firstRow = list.querySelectorAll('li')[0]
var firstButton = firstRow.querySelector('button')
if (firstRow.classList.contains('done') && firstButton) firstButton.click()
var rows = list.querySelectorAll('li')
var survivor = rows[0].textContent
var target = rows[1].querySelector('button')
if (!target) return 'Each task row needs a button that marks the task done.'
target.click()
clearButton.click()
var left = list.querySelectorAll('li')
if (left.length !== rows.length - 1) return 'Clearing completed should remove exactly the one finished task, but ' + left.length + ' of ' + rows.length + ' are left.'
return left[0].textContent.indexOf(survivor) > -1
  ? true
  : 'The unfinished task should still be in the list after clearing.';`,
                },
              ],
              hints: [
                'Start with the data: `let tasks = []` and push `{ text: input.value, done: false }` inside the submit handler, then clear the input.',
                'Write one `render()` that calls `list.replaceChildren()`, loops over `tasks` with `forEach`, and creates an `li` plus a button for each task.',
                'Toggle with `tasks[index].done = !tasks[index].done` and then call `render()` again. Clear completed with `tasks = tasks.filter(function (task) { return !task.done })`, and set `empty.hidden = tasks.length === 0` at the end of render.',
              ],
              solution: {
                html: `<h1>Task tracker</h1>

<form id="task-form">
  <label for="task-input">New task</label>
  <input id="task-input" name="task" type="text" placeholder="e.g. Buy milk" />
  <button type="submit" id="add-task">Add</button>
</form>

<ul id="task-list"></ul>

<button type="button" id="clear-done">Clear completed</button>
<p id="empty">Nothing to do. Add a task above.</p>`,
                css: `#task-list {
  list-style: none;
  padding: 0;
}

#task-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0;
}

#task-list li.done {
  text-decoration: line-through;
  opacity: 0.6;
}`,
                javascript: `const form = document.querySelector('#task-form')
const input = document.querySelector('#task-input')
const list = document.querySelector('#task-list')
const clearButton = document.querySelector('#clear-done')
const empty = document.querySelector('#empty')

let tasks = []

function render() {
  list.replaceChildren()

  tasks.forEach(function (task, index) {
    const item = document.createElement('li')
    item.textContent = task.text
    if (task.done) item.classList.add('done')

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.textContent = task.done ? 'Undo' : 'Done'
    toggle.addEventListener('click', function () {
      tasks[index].done = !tasks[index].done
      render()
    })

    item.appendChild(toggle)
    list.appendChild(item)
  })

  empty.hidden = tasks.length > 0
}

form.addEventListener('submit', function (event) {
  event.preventDefault()
  const text = input.value.trim()
  if (!text) return
  tasks.push({ text: text, done: false })
  input.value = ''
  render()
})

clearButton.addEventListener('click', function () {
  tasks = tasks.filter(function (task) {
    return !task.done
  })
  render()
})`,
              },
              testNotes:
                'These checks drive the interface the way a person would — they fill the input, fire the submit event and click the row buttons. They are testing behaviour, not markup, so the CSS is entirely your choice. The one hard requirement is the class name "done" on a completed row, because the checks need a way to recognise that state. The first check also covers the empty message, because adding a task and hiding #empty are two halves of the same render call.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-js-s81',
      title: 'Final project check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-js-s81-q1',
          type: 'multiple-choice',
          prompt: 'Where should the task list live so the count and the empty message stay in step with it?',
          options: [
            'In the DOM, read back out of it whenever you need the data',
            'In one array that every handler updates before calling render()',
            'In a cookie, so it survives a refresh',
            'In a separate function for each action, each with its own copy',
          ],
          answer: 1,
          explanation:
            'One array, one render function. The page is drawn from the data and never edited directly, so the list, the count and the empty message can never disagree with each other or with the state.',
        },
        {
          id: 'quiz-js-s81-q2',
          type: 'true-false',
          prompt: 'Rebuilding the whole list on every change is wasteful at any size.',
          answer: false,
          explanation:
            'For a list of tens or hundreds of rows, emptying and rebuilding is instant, and it removes the whole category of bug where the page and the data drift apart. Patching individual rows is the optimisation you reach for only when you have measured a real problem.',
        },
        {
          id: 'quiz-js-s81-q3',
          type: 'blank',
          prompt: 'Which method call empties an element so it can be re-rendered?',
          answers: ['replacechildren', 'replacechildren()', '.replacechildren()', 'element.replacechildren'],
          explanation:
            'Calling it with no arguments removes every child in one step, which is exactly what render() needs before appending the rows it has just built.',
        },
        {
          id: 'quiz-js-s81-q4',
          type: 'code-output',
          prompt: 'What does this print?',
          code: `let tasks = [{ text: 'Walk', done: false }]
tasks.push({ text: 'Read', done: false })
console.log(tasks.length, tasks[1].text)`,
          options: ['2 Read', '1 Read', '2 undefined', '0 Read'],
          answer: 0,
          explanation:
            'push appends, so the array holds two tasks and index 1 is the one just added. This is the shape the submit handler produces: the new task is always the last element, which is why the render loop reads the index rather than capturing a task object.',
        },
        {
          id: 'quiz-js-s81-q5',
          type: 'identify-error',
          prompt: 'Clicking Add twice leaves two copies of every task on the page. What is missing?',
          code: `function render() {
  const list = document.querySelector('#task-list')
  tasks.forEach(function (task) {
    const item = document.createElement('li')
    item.textContent = task.text
    list.appendChild(item)
  })
}`,
          options: [
            'The push has to happen outside the forEach',
            'The list is never emptied, so each render appends a second copy of every row',
            'appendChild cannot be called inside forEach',
            'render has to be declared before tasks',
          ],
          answer: 1,
          explanation:
            'The first line inside render must be `list.replaceChildren()`. Without it the loop adds the whole array to whatever is already there, and the visible list grows every time while the data stays correct — the drift that rebuilding from scratch exists to prevent.',
        },
      ],
    },
  },
]