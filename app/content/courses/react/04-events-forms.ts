import type { Section } from '~/types/content'

export const reactEventsFormsSections: Section[] = [
  {
    id: 'react-s4',
    title: 'Events and Forms',
    description: 'Handling events, building forms, and controlled versus uncontrolled components.',
    lessons: [
      {
        id: 'react-l10',
        title: 'Event handling',
        description: 'Synthetic events, passing arguments to handlers, and the event object.',
        duration: 5,
        objectives: [
          'Attach onClick and onChange handlers to elements',
          'Pass extra arguments to event handlers',
          'Read the event target and its value',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'react-l10-intro',
            body: '**Event handling.** Attaching a handler in React looks like an HTML attribute: `onClick`, `onChange`, `onSubmit`. The names are camelCase, and the value is a function — not a string of code.',
          },
          {
            type: 'text',
            id: 'react-l10-b2',
            body: 'The function receives an **event object**. React wraps the native event in a synthetic event with the same useful fields — `event.target` is the element that fired it, and for inputs `event.target.value` is the current text. When a handler needs extra data, wrap it in an arrow function: `onClick={() => select(id)}`.',
          },
          {
            type: 'heading',
            id: 'react-l10-h1',
            level: 2,
            body: 'Handlers, arguments, and the event object',
          },
          {
            type: 'code',
            id: 'react-l10-code',
            language: 'jsx',
            title: 'attaching handlers and passing arguments',
            code: `function List({ items }) {\n  return (\n    <ul>\n      {items.map((item) => (\n        // The arrow wraps the call, so select runs on click, not on render.\n        <li key={item.id} onClick={() => select(item.id)}>\n          {item.name}\n        </li>\n      ))}\n    </ul>\n  )\n}\n\n// Read the current text out of an input event:\nfunction onChange(event) {\n  setValue(event.target.value)\n}\n\n// <input value={value} onChange={onChange} />`,
          },
          {
            type: 'list',
            id: 'react-l10-list',
            style: 'bullet',
            items: [
              'Event props are camelCase: `onClick`, `onChange`, `onSubmit`, `onKeyDown`.',
              'Pass the function itself — `onClick={handleClick}` — or an arrow that calls it with arguments.',
              '`event.target` is the element that fired the event; `event.target.value` reads an input’s text.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l10-warn',
            title: 'Do not call the handler while rendering',
            body: '`onClick={handleClick()}` calls the function immediately, during the render, and passes its return value as the handler. Write `onClick={handleClick}` — or `onClick={() => handleClick(id)}` when you need arguments.',
          },
          {
            type: 'heading',
            id: 'react-l10-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l10-b3',
            body: 'Write the two small pieces every event handler relies on: reading a value out of the event, and binding an argument to a handler.',
          },
          {
            type: 'exercise',
            id: 'react-l10-x1',
            exercise: {
              id: 'ex-react-l10',
              instructions:
                'Write readValue(event) returning event.target.value as a string. Write withArg(handler, arg) returning a new function that calls handler with arg when it is invoked.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// 1) Read the current value from an input event.\nfunction readValue(event) {\n  return ''\n}\n\n// 2) Return a function that calls handler with arg.\nfunction withArg(handler, arg) {\n  return handler\n}\n`,
              },
              tests: [
                { id: 'ex-react-l10-t1', label: 'reads the value from the target', body: "return readValue({ target: { value: 'hello' } }) === 'hello'" },
                {
                  id: 'ex-react-l10-t2',
                  label: 'reads an empty value too',
                  body: "return readValue({ target: { value: '' } }) === ''",
                },
                {
                  id: 'ex-react-l10-t3',
                  label: 'the returned function passes the argument',
                  body: "const bound = withArg((id) => 'id:' + id, 7); return bound() === 'id:7'",
                },
                {
                  id: 'ex-react-l10-t4',
                  label: 'the handler is only called when invoked',
                  body: "let calls = 0; const bound = withArg(() => { calls++ }, 1); if (calls !== 0) return false; bound(); return calls === 1",
                },
              ],
              hints: [
                'readValue just follows the object the event gives it: event.target.value.',
                'withArg must return a function, not the result of calling one.',
                'The returned function closes over handler and arg: return () => handler(arg).',
              ],
              solution: {
                javascript: `function readValue(event) {\n  return event.target.value\n}\n\nfunction withArg(handler, arg) {\n  return () => handler(arg)\n}\n`,
              },
              testNotes:
                'The last check proves the wrapping function is returned un-called, which is the difference between onClick={h} and onClick={h()}.',
            },
          },
        ],
      },
      {
        id: 'react-l11',
        title: 'Controlled components',
        description: 'Managing form state in React, validating input, and the controlled pattern.',
        duration: 6,
        objectives: [
          'Wire an input to state with value and onChange',
          'Explain controlled versus uncontrolled inputs',
          'Extract the current value from the event object',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'react-l11-intro',
            body: '**Controlled components.** In an uncontrolled input the DOM remembers what you typed and React only reads it when asked. In a controlled input React state is the single source of truth: the state value is passed to the input, and every keystroke updates the state.',
          },
          {
            type: 'text',
            id: 'react-l11-b2',
            body: 'The loop is `value={state}` plus `onChange` writing back to state. It costs a small amount of code and buys real benefits: you can validate as the user types, transform input on the way in, or reset the field by setting state. A controlled input given a `value` but no `onChange` is read-only — that is React telling you the loop is incomplete.',
          },
          {
            type: 'heading',
            id: 'react-l11-h1',
            level: 2,
            body: 'State drives the input, the input drives state',
          },
          {
            type: 'code',
            id: 'react-l11-code',
            language: 'jsx',
            title: 'one field, then many',
            code: `function NameForm() {\n  const [name, setName] = useState('')\n\n  return (\n    <form>\n      <input\n        value={name}\n        onChange={(event) => setName(event.target.value)}\n      />\n      <p>{name}</p>\n    </form>\n  )\n}\n\n// With several fields, one handler keyed by the input name:\nfunction handleChange(event) {\n  const { name, value } = event.target\n  setForm((form) => ({ ...form, [name]: value }))\n}`,
          },
          {
            type: 'list',
            id: 'react-l11-list',
            style: 'bullet',
            items: [
              'A controlled input takes its value from state: `value={name}`.',
              '`onChange` writes the new text back: `setName(event.target.value)`.',
              'The state update is immutable — `{ ...form, [name]: value }` — so React sees a new object.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l11-tip',
            title: 'One handler, many fields',
            body: 'Give each input a `name`, then use a computed key: `[event.target.name]: event.target.value`. The same handler serves the whole form, and adding a field means adding markup, not code.',
          },
          {
            type: 'heading',
            id: 'react-l11-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l11-b3',
            body: 'Write the immutable field update the onChange handler performs.',
          },
          {
            type: 'exercise',
            id: 'react-l11-x1',
            exercise: {
              id: 'ex-react-l11',
              instructions:
                'Write updateField(state, name, value) returning a NEW state object with the field name set to value, leaving every other field unchanged.',
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return a new state with one field updated.\nfunction updateField(state, name, value) {\n  return state\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l11-t1',
                  label: 'sets the named field',
                  body: "return updateField({}, 'title', 'Hello').title === 'Hello'",
                },
                {
                  id: 'ex-react-l11-t2',
                  label: 'leaves the other fields alone',
                  body: "const next = updateField({ title: 'a', done: false }, 'title', 'b'); return next.title === 'b' && next.done === false",
                },
                {
                  id: 'ex-react-l11-t3',
                  label: 'returns a new object',
                  body: 'const base = { title: \'a\' }; return updateField(base, \'title\', \'b\') !== base',
                },
                {
                  id: 'ex-react-l11-t4',
                  label: 'the original state is not changed',
                  body: "const base = { title: 'a' }; updateField(base, 'title', 'b'); return base.title === 'a'",
                },
              ],
              hints: [
                'Copy the state, then override one key.',
                'The key comes from a variable, so use a computed property name.',
                'Object spread plus a computed key: { ...state, [name]: value }.',
              ],
              solution: {
                javascript: `function updateField(state, name, value) {\n  return { ...state, [name]: value }\n}\n`,
              },
              testNotes:
                'The reference and original-value checks confirm the update is a copy, which is what lets React detect the change.',
            },
          },
        ],
      },
      {
        id: 'react-l12',
        title: 'Forms and validation',
        description: 'Submitting forms, preventing default, and basic validation.',
        duration: 5,
        objectives: [
          'Handle form onSubmit and call preventDefault',
          'Validate input before submission',
          'Show feedback for invalid fields',
        ],
        xp: 35,
        content: [
          {
            type: 'text',
            id: 'react-l12-intro',
            body: '**Forms and validation.** Submitting a form in the browser normally reloads the page — a leftover from server-rendered pages. In a React app you handle `onSubmit` and call `event.preventDefault()` first, then do the work yourself.',
          },
          {
            type: 'text',
            id: 'react-l12-b2',
            body: 'Validation belongs in a pure function that takes the form and returns the problems, if any. Keeping it separate from the handler means the same rules can run on submit, on blur, or on every keystroke without duplicating logic — and they can be tested without a browser.',
          },
          {
            type: 'heading',
            id: 'react-l12-h1',
            level: 2,
            body: 'Stop the reload, then validate',
          },
          {
            type: 'code',
            id: 'react-l12-code',
            language: 'jsx',
            title: 'onSubmit and a pure validate function',
            code: `function handleSubmit(event) {\n  event.preventDefault()      // stop the browser reloading the page\n  const errors = validate(form)\n  if (Object.keys(errors).length > 0) {\n    setErrors(errors)\n    return\n  }\n  save(form)\n}\n\n// <form onSubmit={handleSubmit}> ... </form>\n\n// Validation is a pure function: form in, problems out.\nfunction validate(form) {\n  const errors = {}\n  if (!form.title.trim()) errors.title = 'A title is required'\n  if (!form.email.includes('@')) errors.email = 'Enter a valid email'\n  return errors\n}`,
          },
          {
            type: 'list',
            id: 'react-l12-list',
            style: 'bullet',
            items: [
              '`event.preventDefault()` stops the browser’s default form submission and the page reload.',
              'A validation function returns an object of messages, keyed by field — an empty object means valid.',
              '`Object.keys(errors).length` is the simple test for whether anything failed.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l12-tip',
            title: 'Validate with the data, not the DOM',
            body: 'Because the form lives in state, validation reads plain values. There is no need to query the DOM for input values, which makes the rules easy to reuse and test.',
          },
          {
            type: 'heading',
            id: 'react-l12-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l12-b3',
            body: 'Write the validation function. Return messages keyed by the field that failed, and nothing when the form is valid.',
          },
          {
            type: 'exercise',
            id: 'react-l12-x1',
            exercise: {
              id: 'ex-react-l12',
              instructions:
                "Write validate(form) returning an object of error messages. Require form.title (after trimming) and require form.email to contain an '@'. Return an empty object when the form is valid.",
              languages: ['javascript'],
              starterCode: {
                javascript: `// Return { field: 'message' } for each problem, or {} when valid.\nfunction validate(form) {\n  return {}\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l12-t1',
                  label: 'a valid form has no errors',
                  body: "return Object.keys(validate({ title: 'Write it', email: 'a@b.com' })).length === 0",
                },
                {
                  id: 'ex-react-l12-t2',
                  label: 'a missing title is reported',
                  body: "return 'title' in validate({ title: '', email: 'a@b.com' })",
                },
                {
                  id: 'ex-react-l12-t3',
                  label: 'whitespace is not a title',
                  body: "return 'title' in validate({ title: '   ', email: 'a@b.com' })",
                },
                {
                  id: 'ex-react-l12-t4',
                  label: 'an email without @ is reported',
                  body: "return 'email' in validate({ title: 'Write it', email: 'nope' })",
                },
                {
                  id: 'ex-react-l12-t5',
                  label: 'two problems give two messages',
                  body: "return Object.keys(validate({ title: '', email: 'nope' })).length === 2",
                },
              ],
              hints: [
                'Start with an empty object and add a key only when a rule fails.',
                'Trim before testing the title so spaces do not count as content.',
                'Check for the @ with form.email.includes("@") — note the quotes.',
              ],
              solution: {
                javascript: `function validate(form) {\n  const errors = {}\n  if (!form.title.trim()) errors.title = 'A title is required'\n  if (!form.email.includes('@')) errors.email = 'Enter a valid email'\n  return errors\n}\n`,
              },
              testNotes:
                'The whitespace check is what separates trim() from a plain emptiness test, and the two-problem case ensures both rules run.',
            },
          },
        ],
      },
      {
        id: 'react-l40',
        title: 'Textarea and Select',
        description: 'Handling multiline text input with textarea and dropdowns with select, both as controlled components.',
        duration: 6,
        objectives: [
          'Bind a textarea to state with value and onChange',
          'Read the selected option from a select element',
          'Use a select with a default option for optional fields',
          'Handle multi-select with an array of values',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'react-l40-intro',
            body: '**Textarea and Select.** The two form controls that look different from inputs still work the same way: you hold the value in state and update it from the change event. A `textarea` takes its text from `value`, not from children.',
          },
          {
            type: 'text',
            id: 'react-l40-b2',
            body: 'A `select` keeps a single string in state — the value of the chosen option. Add the `multiple` attribute and the value becomes an array of the selected options instead. That one difference is worth remembering, because a single-select handler that returns a string will misbehave on a multi-select.',
          },
          {
            type: 'heading',
            id: 'react-l40-h1',
            level: 2,
            body: 'One string, or an array of strings',
          },
          {
            type: 'code',
            id: 'react-l40-code',
            language: 'jsx',
            title: 'controlled textarea and select',
            code: `// textarea takes value/onChange like an input — no children.\n<textarea value={notes} onChange={(e) => setNotes(e.target.value)} />\n\n// A single select holds one string:\n<select value={priority} onChange={(e) => setPriority(e.target.value)}>\n  <option value="low">Low</option>\n  <option value="high">High</option>\n</select>\n\n// A multi-select holds an array of the chosen values:\n<select\n  multiple\n  value={tags}\n  onChange={(e) => setTags(Array.from(e.target.selectedOptions, (o) => o.value))}\n>\n  <option value="a">A</option>\n  <option value="b">B</option>\n</select>`,
          },
          {
            type: 'list',
            id: 'react-l40-list',
            style: 'bullet',
            items: [
              'A `textarea` is controlled with `value`, not with text between the tags.',
              'A single `select` stores one string; the `multiple` version stores an array.',
              'For multi-select, read the selected options rather than `value`, so you get them all.',
            ],
          },
          {
            type: 'tip',
            id: 'react-l40-tip',
            title: 'An empty option is a real choice',
            body: 'For an optional field, add an option with `value=""` and label it "Choose one". It keeps the select controlled from the first render and gives the user a way back to "unset".',
          },
          {
            type: 'heading',
            id: 'react-l40-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l40-b3',
            body: 'Write the helper that reads the chosen values from a select, whether it is single or multiple.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l40-x1',
            exercise: {
              id: 'ex-react-l40',
              instructions:
                "Write selectedValues(select). For a single select (select.multiple is false) return the value of the selected option as a string, or \"\" when nothing is selected. For a multiple select return an array of the selected option values.",
              languages: ['javascript'],
              starterCode: {
                javascript: `// A select looks like { multiple, options: [{ value, selected }] }.\nfunction selectedValues(select) {\n  return ''\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l40-t1',
                  label: 'a single select returns the chosen value',
                  body: "const s = { multiple: false, options: [{ value: 'low', selected: false }, { value: 'high', selected: true }] }; return selectedValues(s) === 'high'",
                },
                {
                  id: 'ex-react-l40-t2',
                  label: 'a single select with nothing chosen is empty',
                  body: "const s = { multiple: false, options: [{ value: 'low', selected: false }] }; return selectedValues(s) === ''",
                },
                {
                  id: 'ex-react-l40-t3',
                  label: 'a multiple select returns every chosen value',
                  body: "const s = { multiple: true, options: [{ value: 'a', selected: true }, { value: 'b', selected: false }, { value: 'c', selected: true }] }; return JSON.stringify(selectedValues(s)) === '[\\\"a\\\",\\\"c\\\"]'",
                },
                {
                  id: 'ex-react-l40-t4',
                  label: 'a multiple select with nothing chosen is an empty array',
                  body: "const s = { multiple: true, options: [{ value: 'a', selected: false }] }; return Array.isArray(selectedValues(s)) && selectedValues(s).length === 0",
                },
              ],
              hints: [
                'Check select.multiple first — the two cases return different types.',
                'For a single select, find the option whose selected flag is true.',
                'For multiple, filter the options and map them to their values.',
              ],
              solution: {
                javascript: `function selectedValues(select) {\n  const chosen = select.options.filter((option) => option.selected)\n  if (select.multiple) {\n    return chosen.map((option) => option.value)\n  }\n  return chosen.length > 0 ? chosen[0].value : ''\n}\n`,
              },
              testNotes:
                'The tests check the type as well as the contents — a single select must return a string, a multiple select an array.',
            },
          },
        ],
      },
      {
        id: 'react-l41',
        title: 'Multiple inputs, Checkbox and Radio',
        description: 'Managing forms with many fields, and handling checkbox and radio button groups.',
        duration: 7,
        objectives: [
          'Update multiple fields from one handler using name attributes',
          'Handle a single checkbox with a boolean state',
          'Track a group of checkboxes with an array of values',
          'Use radio buttons for mutually exclusive choices',
        ],
        xp: 45,
        content: [
          {
            type: 'text',
            id: 'react-l41-intro',
            body: '**Multiple inputs, Checkbox and Radio.** A form with many fields does not need many handlers. Give each control a `name`, and a single change handler can update the right field by reading that name off the event.',
          },
          {
            type: 'text',
            id: 'react-l41-b2',
            body: 'Checkboxes are the one control that differs in an important way: their state is a boolean read from `event.target.checked`, not a string from `value`. Radio buttons look like checkboxes but behave like a select — all the radios in a group share a `name`, and the value in state is which one is chosen.',
          },
          {
            type: 'heading',
            id: 'react-l41-h1',
            level: 2,
            body: 'One handler for a whole form',
          },
          {
            type: 'code',
            id: 'react-l41-code',
            language: 'jsx',
            title: 'text, checkbox, and radio with one handler',
            code: `const [form, setForm] = useState({ title: '', done: false, priority: 'low' })\n\n// One handler for every field, keyed by the input name:\nfunction handleChange(event) {\n  const { name, type, value, checked } = event.target\n  setForm((form) => ({\n    ...form,\n    [name]: type === 'checkbox' ? checked : value,\n  }))\n}\n\n// <input name="title" value={form.title} onChange={handleChange} />\n// <input name="done" type="checkbox" checked={form.done} onChange={handleChange} />\n// <input name="priority" type="radio" value="low"\n//        checked={form.priority === 'low'} onChange={handleChange} />`,
          },
          {
            type: 'list',
            id: 'react-l41-list',
            style: 'bullet',
            items: [
              'The `name` attribute is the key the handler writes to: `[event.target.name]`.',
              'A checkbox carries a boolean in `checked`; everything else carries a string in `value`.',
              'Radio buttons in a group share a `name`; state holds the chosen value, and each radio compares itself to it.',
            ],
          },
          {
            type: 'warning',
            id: 'react-l41-warn',
            title: 'A controlled checkbox needs checked',
            body: 'For a checkbox, `value` is not the state — it is the submitted value. Bind the boolean with `checked={form.done}` and read it back from `event.target.checked`, or the box will not toggle.',
          },
          {
            type: 'heading',
            id: 'react-l41-h2',
            level: 2,
            body: 'Your turn',
          },
          {
            type: 'text',
            id: 'react-l41-b3',
            body: 'Write the shared change handler: it reads the field name off the event and stores either the checked flag or the value.',
          },
          {
            type: 'exercise',
            id: 'ex-react-l41-x1',
            exercise: {
              id: 'ex-react-l41',
              instructions:
                "Write applyChange(state, event) returning a NEW state. Use event.target.name as the key; when event.target.type is 'checkbox' store event.target.checked, otherwise store event.target.value. Leave other fields unchanged.",
              languages: ['javascript'],
              starterCode: {
                javascript: `// event.target looks like { name, type, value, checked }.\nfunction applyChange(state, event) {\n  return state\n}\n`,
              },
              tests: [
                {
                  id: 'ex-react-l41-t1',
                  label: 'a text field stores its value',
                  body: "const next = applyChange({}, { target: { name: 'title', type: 'text', value: 'Hello' } }); return next.title === 'Hello'",
                },
                {
                  id: 'ex-react-l41-t2',
                  label: 'a checkbox stores its checked flag',
                  body: "const next = applyChange({}, { target: { name: 'done', type: 'checkbox', value: 'on', checked: true } }); return next.done === true",
                },
                {
                  id: 'ex-react-l41-t3',
                  label: 'an unchecked box stores false',
                  body: "const next = applyChange({}, { target: { name: 'done', type: 'checkbox', value: 'on', checked: false } }); return next.done === false",
                },
                {
                  id: 'ex-react-l41-t4',
                  label: 'other fields are kept',
                  body: "const next = applyChange({ title: 'a', done: false }, { target: { name: 'title', type: 'text', value: 'b' } }); return next.title === 'b' && next.done === false",
                },
                {
                  id: 'ex-react-l41-t5',
                  label: 'the original state is not changed',
                  body: "const base = { title: 'a' }; applyChange(base, { target: { name: 'title', type: 'text', value: 'b' } }); return base.title === 'a'",
                },
              ],
              hints: [
                'Read the field name and type off event.target first.',
                'Pick the value: checked for a checkbox, value for anything else.',
                'Return a copy with the computed key set: { ...state, [name]: next }.',
              ],
              solution: {
                javascript: `function applyChange(state, event) {\n  const { name, type, value, checked } = event.target\n  const next = type === 'checkbox' ? checked : value\n  return { ...state, [name]: next }\n}\n`,
              },
              testNotes:
                'Separate checks for a checked and an unchecked box confirm the boolean is stored rather than a string.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-react-s4',
      title: 'Events and Forms check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-react-s4-q1',
          type: 'multiple-choice',
          prompt: 'In a controlled component, where does the input value come from?',
          options: ['The DOM element itself', 'React state', 'localStorage', 'A global variable'],
          answer: 1,
          explanation: 'In a controlled component, the value is held in React state and passed back to the input via the value prop.',
        },
        {
          id: 'quiz-react-s4-q2',
          type: 'true-false',
          prompt: 'You should always use preventDefault() on form submissions.',
          answer: true,
          explanation: 'preventDefault() stops the browser from reloading the page on form submit, which is almost never what you want in a SPA.',
        },
        {
          id: 'quiz-react-s4-q3',
          type: 'multiple-choice',
          prompt: 'React events use what naming convention?',
          options: ['onclick', 'onClick', 'on-click', 'handle_click'],
          answer: 1,
          explanation: 'React uses camelCase event names: onClick, onChange, onSubmit, etc.',
        },
        {
          id: 'quiz-react-s4-q4',
          type: 'blank',
          prompt: 'What does event.target refer to in a React event handler?',
          answers: ['the element that triggered the event', 'the DOM element'],
          explanation: 'event.target is the DOM element that the event originated from.',
        },
        {
          id: 'quiz-react-s4-q5',
          type: 'identify-error',
          prompt: 'What is the issue with this input?',
          code: '<input value="hello" />',
          options: [
            'Nothing is wrong',
            'It is missing an onChange handler, making it read-only',
            'The value should not be a string',
            'Input must have a name prop',
          ],
          answer: 1,
          explanation: 'Without onChange, a controlled input cannot be edited. React sets the value but nothing updates the state to change it.',
        },
      ],
    },
  },
]
