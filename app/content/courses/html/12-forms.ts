import type { Section } from '~/types/content'

export const htmlFormSections: Section[] = [
  {
    id: 'html-s47',
    title: 'HTML Forms',
    description: 'The form element, the three attributes that define a submission, and how the data arrives.',
    lessons: [
      {
        id: 'html-l58',
        title: 'HTML Forms',
        description: 'A form, its action, method and enctype, and what the browser actually sends.',
        duration: 6,
        objectives: [
          'Build a form with an action, a method and named controls',
          'Explain the difference between GET and POST in terms of the resulting request',
          'Say what enctype multipart/form-data is for',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l58',
          title: 'HTML Forms quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l58-q1',
              type: 'multiple-choice',
              prompt: 'What happens to a form control with no name attribute?',
              options: [
                'It is submitted with an empty value',
                'It is not submitted at all',
                'The browser generates a name for it',
                'It causes a validation error',
              ],
              answer: 1,
              explanation: 'The name is the key the server receives, so an unnamed control sends nothing.',
            },
            {
              id: 'quiz-html-l58-q2',
              type: 'true-false',
              prompt: 'Using method="get" for a password field is safe because GET requests are validated.',
              answer: false,
              explanation: 'GET puts the data in the URL, which ends up in the address bar, the history and the server log.',
            },
            {
              id: 'quiz-html-l58-q3',
              type: 'multiple-choice',
              prompt: 'Which enctype is required for a file upload?',
              options: [
                'application/x-www-form-urlencoded',
                'multipart/form-data',
                'text/plain',
                'application/json',
              ],
              answer: 1,
              explanation: 'enctype="multipart/form-data" is what lets the request carry file content at all.',
            },
            {
              id: 'quiz-html-l58-q4',
              type: 'blank',
              prompt: 'What is the default type of a button inside a form?',
              answers: [
                'submit',
                'submit',
                'type="submit"',
              ],
              explanation: 'Which is why a Cancel button needs type="button" written on it explicitly.',
            },
            {
              id: 'quiz-html-l58-q5',
              type: 'multiple-choice',
              prompt: 'What does a disabled control do on submission?',
              options: [
                'It is submitted with its value',
                'It is submitted as an empty value',
                'It is not submitted',
                'It causes the form to be rejected',
              ],
              answer: 2,
              explanation: 'Disabled controls are excluded from the submitted data, which is the opposite of readonly.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l58-b1',
            body: 'A form collects input and submits it. The `<form>` element itself describes where the data goes and how: `action` is the URL, `method` is GET or POST, and `enctype` is how the body is encoded. The controls inside carry the data, and they only do so if they have a `name` — a control with no name is not submitted at all.',
          },
          {
            type: 'demo',
            id: 'c-l58-d1',
            title: 'A form and the request it produces',
            body: 'The form below is never actually submitted anywhere. The output shows the URL that would be sent, built exactly as the browser would build it, which is the clearest way to see what a GET submission looks like.',
            html: `<form id="f" action="/search" method="get">
  <label for="q">Search</label>
  <input id="q" name="q" value="tea & coffee">
  <button type="submit">Search</button>
</form>
<p class="out" id="out" aria-live="polite"></p>

<script>
  const f = document.getElementById('f');
  const out = document.getElementById('out');
  f.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(f);
    out.textContent = 'GET /search?' + new URLSearchParams(data).toString();
  });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
label { display: block; font-weight: 600; margin-bottom: 0.25rem; }
input { padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px; }
button { padding: 0.4rem 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; }
.out { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #1d4ed8; word-break: break-all; }`,
            height: 250,
          },
          {
            type: 'heading',
            id: 'c-l58-h1',
            level: 3,
            body: 'GET and POST, concretely',
          },
          {
            type: 'list',
            id: 'c-l58-l1',
            style: 'bullet',
            items: [
              '**GET** puts the data in the query string: `GET /search?q=tea`. It is cached, bookmarkable, and visible in the address bar. Right for a search, wrong for a password.',
              '**POST** puts the data in the request body. It is not in the URL, and browsers will warn before re-submitting it on refresh. Right for anything that changes state.',
              '**Neither is encrypted by being POST.** `https` is what encrypts the transport. Sending a password with method="get" puts it in the URL, in the history, and in the server log.',
              '**`enctype="multipart/form-data"`** is required for file uploads, and works fine for ordinary fields too.',
              '**`action` may be omitted**, in which case the form submits to the current URL. It is nearly always better to be explicit.',
            ],
          },
          {
            type: 'code',
            id: 'c-l58-c1',
            language: 'html',
            title: 'A complete form, and the request it produces',
            code: `<!-- GET: a search -->
<form action="/search" method="get">
  <label for="q">Search</label>
  <input id="q" name="q" type="search">
  <button type="submit">Search</button>
</form>
<!-- produces: GET /search?q=naples -->

<!-- POST: a sign-in -->
<form action="/signin" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <label for="password">Password</label>
  <input id="password" name="password" type="password" autocomplete="current-password" required>

  <button type="submit">Sign in</button>
</form>
<!-- produces: POST /signin
     body: email=ada%40example.com&password=... -->

<!-- with a file upload -->
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="avatar">Avatar</label>
  <input id="avatar" name="avatar" type="file" accept="image/*" required>
  <button type="submit">Upload</button>
</form>

<!-- what a control without a name sends: nothing -->
<input type="text" value="ignored">          <!-- no name attribute: not submitted -->
<input type="text" name="kept" value="sent"> <!-- submitted as kept=sent -->

<!-- and what a disabled control sends: also nothing -->
<input type="text" name="locked" value="x" disabled>  <!-- not submitted -->`,
          },
          {
            type: 'tip',
            id: 'c-l58-t1',
            title: 'Always set the button type',
            body: 'A button inside a form defaults to type="submit", even when you meant it to do something else. Being explicit costs four characters and removes a class of bug where a Cancel button submits the form.',
          },
          {
            type: 'warning',
            id: 'c-l58-w1',
            title: 'Validation is yours to render',
            body: 'The browser will refuse to submit a form with a missing required field, and it will show a message in its own language and style. That is a good baseline, but it is not enough: it disappears on submit, it says nothing about format, and it is inconsistent across browsers. Validate on the server regardless, and give the user feedback near the field.',
          },
          {
            type: 'exercise',
            id: 'c-l58-x1',
            exercise: {
              id: 'ex-l58',
              instructions:
                'Build a form that posts to /signin with a named email field, a named password field, and a submit button with an explicit type.',
              languages: ['html'],
              starterCode: {
                html: '<form>\n  \n</form>\n',
              },
              tests: [
                {
                  id: 'ex-l58-t1',
                  label: 'There is a form with an action and a post method',
                  body:
                    'const f = document.querySelector("form"); return !!f && !!f.getAttribute("action") && (f.getAttribute("method") || "").toLowerCase() === "post"',
                },
                {
                  id: 'ex-l58-t2',
                  label: 'Every control has a name',
                  body:
                    'return Array.from(document.querySelectorAll("form input, form select, form textarea")).every(c => !!c.getAttribute("name"))',
                },
                {
                  id: 'ex-l58-t3',
                  label: 'The password field uses type="password"',
                  body:
                    'return !!document.querySelector("input[name][type=\'password\']")',
                },
                {
                  id: 'ex-l58-t4',
                  label: 'The submit button declares type="submit"',
                  body:
                    'const b = document.querySelector("form button"); return !!b && b.getAttribute("type") === "submit"',
                },
                {
                  id: 'ex-l58-t5',
                  label: 'The password field is not sent by GET, and no password uses a GET form',
                  body:
                    'const f = document.querySelector("form"); return (f.getAttribute("method") || "get").toLowerCase() !== "get"',
                },
              ],
              hints: [
                'A control without a name is not submitted — the name is what the server receives.',
                'Every button needs an explicit type, because submit is the default inside a form.',
              ],
              solution: {
                html:
                  '<form action="/signin" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" autocomplete="email" required>\n\n  <label for="password">Password</label>\n  <input id="password" name="password" type="password" autocomplete="current-password" required>\n\n  <button type="submit">Sign in</button>\n</form>\n',
              },
              testNotes:
                'The last test restates the security point from the lesson. A GET form puts the password in the URL, the history and the server log.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s48',
    title: 'HTML Form Attributes',
    description: 'The attributes on the form element itself, and the one legacy that is still in every codebase.',
    lessons: [
      {
        id: 'html-l59',
        title: 'HTML Form Attributes',
        description: 'The attributes that belong to the form element, and the history behind accept-charset.',
        duration: 5,
        objectives: [
          'List the attributes on a form element and what each does',
          'Explain what accept-charset is for and whether it still matters',
          'Describe how form submission works without JavaScript',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-html-l59',
          title: 'HTML Form Attributes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l59-q1',
              type: 'multiple-choice',
              prompt: 'What does novalidate do on a form?',
              options: [
                'It disables the form',
                'It skips the native constraint validation, so you can render errors yourself',
                'It prevents the form from being submitted',
                'It hides the submit button',
              ],
              answer: 1,
              explanation: 'Use it when you present errors next to the fields, with your own messages and your own styling.',
            },
            {
              id: 'quiz-html-l59-q2',
              type: 'true-false',
              prompt: 'accept-charset is worth setting to something other than utf-8 on a modern site.',
              answer: false,
              explanation: 'Every current browser supports UTF-8 and only UTF-8, so any other value is decoration.',
            },
            {
              id: 'quiz-html-l59-q3',
              type: 'multiple-choice',
              prompt: 'Why is a form that works without JavaScript worth having?',
              options: [
                'It loads faster',
                'It still works when a script fails, is blocked, or is not run at all',
                'Browsers require it',
                'It makes the markup shorter',
              ],
              answer: 1,
              explanation: 'The form is the contract and the script is an enhancement. Progressive enhancement is the difference.',
            },
            {
              id: 'quiz-html-l59-q4',
              type: 'blank',
              prompt: 'Which form attribute declares the encoding a submission may use?',
              answers: [
                'accept-charset',
                'acceptCharset',
              ],
              explanation: 'accept-charset is the only form attribute that is hyphenated rather than camel-cased.',
            },
            {
              id: 'quiz-html-l59-q5',
              type: 'multiple-choice',
              prompt: 'What is the default value of the method attribute?',
              options: [
                'post',
                'get',
                'dialog',
                'send',
              ],
              answer: 1,
              explanation: 'It defaults to get, which is why an explicit method is worth writing.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l59-b1',
            body: 'The form element has a short list of attributes, and one of them is a historical oddity. `action` is the URL, `method` is GET or POST, `enctype` is the body encoding, `target` names the browsing context to submit into, `autocomplete` turns browser autofill on or off, and `novalidate` disables the native constraint validation. `accept-charset` is the oddity: it declares which character encodings the form may submit in, and in practice every browser has supported UTF-8 and only UTF-8 since long before anyone needed the attribute.',
          },
          {
            type: 'demo',
            id: 'c-l59-d1',
            title: 'A form with the attributes that matter',
            body: 'The form below submits to itself, so pressing submit reloads the page with the submitted data in the query string. That is what a form does with no JavaScript at all, and it is why forms remain the right answer for a contact form or a search box.',
            html: `<form action="" method="get" accept-charset="utf-8" autocomplete="on">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required>

  <label for="topic">Topic</label>
  <select id="topic" name="topic">
    <option>Billing</option>
    <option>Technical</option>
  </select>

  <button type="submit">Send</button>
</form>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
form { display: grid; gap: 0.35rem; max-width: 280px; }
label { font-weight: 600; }
input, select { padding: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px; }
button { padding: 0.4rem 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; }`,
            height: 300,
          },
          {
            type: 'list',
            id: 'c-l59-l1',
            style: 'bullet',
            items: [
              '`action` — the URL to submit to. Omit it and the form submits to the current page.',
              '`method` — `get` or `post`. Defaults to `get`.',
              '`enctype` — `application/x-www-form-urlencoded` by default; `multipart/form-data` for files; `text/plain` is a rare fallback.',
              '`accept-charset` — the encodings the submission may use. Only utf-8 matters in practice.',
              '`autocomplete` — `on` or `off`. Off is almost never the answer, since it breaks the user\'s own saved data.',
              '`novalidate` — skips the native constraint validation. Use it when you render errors yourself.',
              '`target` — which browsing context receives the response. `_blank` submits in a new tab, which is rarely what you want.',
            ],
          },
          {
            type: 'code',
            id: 'c-l59-c1',
            language: 'html',
            title: 'The form attributes, and a no-JavaScript submission',
            code: `<!-- every attribute on a form element -->
<form action="/search"
      method="get"
      enctype="application/x-www-form-urlencoded"
      accept-charset="utf-8"
      autocomplete="on"
      name="search"
      id="search-form"
      novalidate>

<!-- a form that works with JavaScript disabled -->
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required>
  <button type="submit">Subscribe</button>
</form>

<!-- novalidate, because the errors are rendered beside the fields -->
<form action="/signin" method="post" novalidate>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" aria-describedby="email-error">
  <p id="email-error" role="alert"></p>
  <button type="submit">Sign in</button>
</form>

<!-- a form whose response replaces the current page, rather than a new tab -->
<form action="/search" method="get" target="_self">
  <input name="q">
  <button type="submit">Search</button>
</form>`,
          },
          {
            type: 'tip',
            id: 'c-l59-t1',
            title: 'Progressive enhancement, in practice',
            body: 'A form that works without JavaScript and is improved by it is a form that still works when the script fails, when a browser blocks it, and when the page is rendered by something that does not run scripts. The form is the contract; the script is an enhancement.',
          },
          {
            type: 'warning',
            id: 'c-l59-w1',
            title: 'autocomplete="off" is a mistake',
            body: 'Autofill is faster for the user and more correct for you, and disabling it on a sign-in form is a well-known way to make passwords fail on mobile. The one legitimate use is a field where autofill is genuinely wrong — a one-time code, or a field explicitly marked not to be stored.',
          },
          {
            type: 'exercise',
            id: 'c-l59-x1',
            exercise: {
              id: 'ex-l59',
              instructions:
                'Give the form an explicit action, an explicit method, and accept-charset set to utf-8, and turn native validation off because the errors are rendered beside the fields.',
              languages: ['html'],
              starterCode: {
                html: '<form>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email">\n  <button type="submit">Send</button>\n</form>\n',
              },
              tests: [
                {
                  id: 'ex-l59-t1',
                  label: 'The form has an explicit action',
                  body:
                    'const f = document.querySelector("form"); return !!f.getAttribute("action") && f.getAttribute("action").length > 0',
                },
                {
                  id: 'ex-l59-t2',
                  label: 'The form has an explicit method',
                  body:
                    'return ["get", "post"].includes((document.querySelector("form").getAttribute("method") || "").toLowerCase())',
                },
                {
                  id: 'ex-l59-t3',
                  label: 'accept-charset is set to utf-8',
                  body:
                    'return (document.querySelector("form").getAttribute("accept-charset") || "").toLowerCase() === "utf-8"',
                },
                {
                  id: 'ex-l59-t4',
                  label: 'The form has novalidate, because errors are rendered in the page',
                  body: 'return document.querySelector("form").hasAttribute("novalidate")',
                },
                {
                  id: 'ex-l59-t5',
                  label: 'The form still works without JavaScript — it has a real action and a submit button',
                  body:
                    'const f = document.querySelector("form"); return !!f.getAttribute("action") && !!f.querySelector("button[type=\'submit\'], button:not([type])")',
                },
              ],
              hints: [
                'accept-charset is an attribute on the form, not on the inputs.',
                'novalidate is a boolean attribute, so writing it alone is enough.',
              ],
              solution: {
                html:
                  '<form action="/signin" method="post" accept-charset="utf-8" novalidate>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" aria-describedby="email-error">\n  <p id="email-error" role="alert"></p>\n  <button type="submit">Send</button>\n</form>\n',
              },
              testNotes:
                'The last test is the progressive enhancement check. A form with a real action and a submit button still works if every script on the page fails to load.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s49',
    title: 'HTML Form Elements',
    description: 'The controls a form can contain, and the two that are far more common than the rest.',
    lessons: [
      {
        id: 'html-l60',
        title: 'HTML Form Elements',
        description: 'input, select, textarea, button, datalist, fieldset, output and progress.',
        duration: 6,
        objectives: [
          'Name the controls a form can contain and what each is for',
          'Use fieldset and legend to group related controls',
          'Choose between input and textarea for multi-line text',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l60',
          title: 'HTML Form Elements quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l60-q1',
              type: 'multiple-choice',
              prompt: 'What does the fieldset element do?',
              options: [
                'Adds a border around a form',
                'Groups related controls and names the group with a legend',
                'Validates the controls it contains',
                'Submits the form',
              ],
              answer: 1,
              explanation: 'The grouping is announced before each control, so a screen reader user knows what each field belongs to.',
            },
            {
              id: 'quiz-html-l60-q2',
              type: 'true-false',
              prompt: 'The default value of a textarea is set with a value attribute.',
              answer: false,
              explanation: 'A textarea takes its default value as its child content, which is why stray whitespace inside the tags becomes part of the value.',
            },
            {
              id: 'quiz-html-l60-q3',
              type: 'multiple-choice',
              prompt: 'When is a select a better choice than a text input?',
              options: [
                'When the set of valid values is known and is not very large',
                'When the user needs to type free text',
                'When the field must be searchable',
                'Never — a text input is always simpler',
              ],
              answer: 0,
              explanation: 'A closed set of a handful of options is exactly what a select is for. Beyond about seven, a searchable input with a datalist is better.',
            },
            {
              id: 'quiz-html-l60-q4',
              type: 'blank',
              prompt: 'Which element provides suggestions for an input without requiring a choice?',
              answers: [
                'datalist',
                '<datalist>',
              ],
              explanation: 'The input references it with a list attribute containing the datalist id.',
            },
            {
              id: 'quiz-html-l60-q5',
              type: 'multiple-choice',
              prompt: 'What is the output element for?',
              options: [
                'Sending data to the server',
                'Reporting a computed result, associated with its inputs via for',
                'Displaying an error message',
                'Grouping controls',
              ],
              answer: 1,
              explanation: 'output is for a result the page computed, not for anything the user typed.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l60-b1',
            body: 'A form is built from a small set of elements. `input` is the workhorse and its behaviour comes entirely from its `type`. `select` is a closed list of options, `textarea` is multi-line free text, and `button` is an action. `datalist` gives an input a set of suggestions. `fieldset` and `legend` group related controls, and `output` reports a computed result.',
          },
          {
            type: 'demo',
            id: 'c-l60-d1',
            title: 'The form elements, one of each',
            body: 'A grouped set of related controls, a text input with suggestions, a closed list, a multi-line field, a datalist of suggestions, and an output that reports a calculation as the number is typed.',
            html: `<form>
  <fieldset>
    <legend>Contact details</legend>
    <p>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" list="domains" required>
      <datalist id="domains">
        <option value="example.com"></option>
        <option value="example.org"></option>
      </datalist>
    </p>
    <p>
      <label for="country">Country</label>
      <select id="country" name="country">
        <option value="">Choose…</option>
        <option value="uk">United Kingdom</option>
        <option value="ie">Ireland</option>
      </select>
    </p>
  </fieldset>

  <p>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="3" maxlength="280"></textarea>
  </p>

  <p>
    <label for="qty">Quantity</label>
    <input id="qty" name="qty" type="number" min="1" max="99" value="2">
    <output for="qty" id="total">Subtotal: 0.00</output>
  </p>

  <button type="button" id="calc">Recalculate</button>
  <button type="reset">Reset</button>
  <button type="submit">Send</button>
</form>

<script>
  const qty = document.getElementById('qty');
  const total = document.getElementById('total');
  const recalc = () => {
    total.textContent = 'Subtotal: ' + (Number(qty.value || 0) * 4.5).toFixed(2);
  };
  document.getElementById('calc').addEventListener('click', recalc);
  qty.addEventListener('input', recalc);
  recalc();
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
form { display: grid; gap: 0.6rem; max-width: 300px; }
fieldset { border: 1px solid #cbd5e1; border-radius: 6px; padding: 0.5rem 0.75rem 0.75rem; }
legend { font-weight: 600; padding: 0 0.3rem; }
p { margin: 0; display: grid; gap: 0.2rem; }
label { font-weight: 600; }
input, select, textarea { padding: 0.35rem; border: 1px solid #cbd5e1; border-radius: 4px; font: inherit; }
output { color: #0f766e; font-weight: 600; }
button { padding: 0.35rem 0.7rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; }`,
            height: 480,
          },
          {
            type: 'list',
            id: 'c-l60-l1',
            style: 'bullet',
            items: [
              '`<input>` — the workhorse. Its `type` decides everything: text, email, password, number, date, checkbox, radio, range, file, hidden, color, tel, url, search.',
              '`<select>` — a closed list. One value, or several with `multiple`. Best for more than about seven options.',
              '`<textarea>` — multi-line text. Its content is its default value, unlike every other control.',
              '`<button>` — an action. The `type` decides whether it submits, resets, or does nothing.',
              '`<fieldset>` and `<legend>` — group related controls and give the group a name. Also how the native border and layout come for free.',
              '`<datalist>` — suggestions for an input, filtered as you type, with no requirement to pick one.',
              '`<output>` — a computed result, associated with the inputs it derives from via its `for` attribute.',
              '`<progress>` and `<meter>` — a task\'s completion and a measurement within a known range.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l60-t1',
            title: 'textarea holds its value as child content',
            body: '`<textarea>Hello</textarea>` sets the default value, which is a real source of bugs: any whitespace or line break between the tags becomes part of the value. Put the content on the same line, and set the value in JavaScript with `.value` rather than by rewriting the markup.',
          },
          {
            type: 'warning',
            id: 'c-l60-w1',
            title: 'A fieldset is not decoration',
            body: 'Grouping related controls into a fieldset is what lets a screen reader announce the group name before each control — "Address, line 1". A div with a heading above it announces nothing, and the user has to work out which controls belong to which group every time they tab through the form.',
          },
          {
            type: 'exercise',
            id: 'c-l60-x1',
            exercise: {
              id: 'ex-l60',
              instructions:
                'Build a form that groups two related fields in a fieldset with a legend, adds a multi-line textarea, and includes a select with a placeholder option.',
              languages: ['html'],
              starterCode: {
                html: '<form>\n  \n</form>\n',
              },
              tests: [
                {
                  id: 'ex-l60-t1',
                  label: 'There is a fieldset with a legend',
                  body:
                    'return !!document.querySelector("fieldset > legend")',
                },
                {
                  id: 'ex-l60-t2',
                  label: 'The fieldset contains at least two controls',
                  body:
                    'return document.querySelectorAll("fieldset input, fieldset select, fieldset textarea").length >= 2',
                },
                {
                  id: 'ex-l60-t3',
                  label: 'There is a textarea',
                  body: 'return !!document.querySelector("textarea")',
                },
                {
                  id: 'ex-l60-t4',
                  label: 'The select has a disabled empty first option as a placeholder',
                  body:
                    'const s = document.querySelector("select"); const o = s && s.querySelector("option"); return !!o && (o.getAttribute("value") === null || o.getAttribute("value") === "")',
                },
                {
                  id: 'ex-l60-t5',
                  label: 'Every control has a name, so it is submitted',
                  body:
                    'return Array.from(document.querySelectorAll("form input, form select, form textarea")).every(c => !!c.getAttribute("name"))',
                },
              ],
              hints: [
                'The legend is the first child of the fieldset, and it is what names the group.',
                'A placeholder option is an option with an empty value, usually also selected by default.',
              ],
              solution: {
                html:
                  '<form action="/contact" method="post">\n  <fieldset>\n    <legend>Contact details</legend>\n    <p><label for="email">Email</label><input id="email" name="email" type="email" required></p>\n    <p><label for="phone">Phone</label><input id="phone" name="phone" type="tel"></p>\n  </fieldset>\n  <p><label for="message">Message</label><textarea id="message" name="message" rows="4"></textarea></p>\n  <p><label for="country">Country</label><select id="country" name="country"><option value="">Choose…</option><option value="uk">United Kingdom</option></select></p>\n  <button type="submit">Send</button>\n</form>\n',
              },
              testNotes:
                'The first test asserts that the legend is a direct child of the fieldset, which is the only place it is meaningful.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s50',
    title: 'HTML Input Types',
    description: 'The type attribute on input, and how the browser turns a keyboard and a picker out of it.',
    lessons: [
      {
        id: 'html-l61',
        title: 'HTML Input Types',
        description: 'Every input type, what the browser changes as a result, and how to pick between them.',
        duration: 7,
        objectives: [
          'Name the input types and the keyboard each one produces on a phone',
          'Explain what a date type gives you over a text type',
          'Say why type="text" is a legitimate choice as often as it is',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l61',
          title: 'HTML Input Types quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l61-q1',
              type: 'multiple-choice',
              prompt: 'What value does a color input always submit?',
              options: [
                'A colour name',
                'A hex value such as #1d4ed8',
                'An rgb() value',
                'Whatever text the user typed',
              ],
              answer: 1,
              explanation: 'The color type normalises to a lower-case six-digit hex value.',
            },
            {
              id: 'quiz-html-l61-q2',
              type: 'true-false',
              prompt: 'type="number" is a good choice for a quantity field where users may type commas.',
              answer: false,
              explanation: 'A number input discards anything it cannot parse, so "1,200" becomes an empty field with no explanation.',
            },
            {
              id: 'quiz-html-l61-q3',
              type: 'multiple-choice',
              prompt: 'What does the inputmode attribute control?',
              options: [
                'Validation',
                'Which keyboard appears on a touch device',
                'The value format',
                'The autocomplete behaviour',
              ],
              answer: 1,
              explanation: 'inputmode is the keyboard hint; type is the validation and semantics. They solve different problems.',
            },
            {
              id: 'quiz-html-l61-q4',
              type: 'blank',
              prompt: 'Which input type is submitted but never displayed?',
              answers: [
                'hidden',
                'type="hidden"',
              ],
              explanation: 'A hidden input is part of the submitted data and invisible on the page.',
            },
            {
              id: 'quiz-html-l61-q5',
              type: 'multiple-choice',
              prompt: 'Which input type gives you a slider?',
              options: [
                'number',
                'range',
                'search',
                'progress',
              ],
              answer: 1,
              explanation: 'range is the slider, bounded by min and max and stepped by step.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l61-b1',
            body: 'The `type` attribute on an input decides what the control is. On a desktop it changes what is drawn; on a phone it changes which keyboard appears, which is the larger of the two effects. `type="tel"` gives you a numeric keypad with no plus sign. `type="email"` gives you an @ key. `type="url"` gives you a keyboard with a slash and a dot. None of them validate anything — that is the `pattern` attribute and the constraint validation API.',
          },
          {
            type: 'demo',
            id: 'c-l61-d1',
            title: 'The input types side by side',
            body: 'Each of these produces a different control. The date, number and range types bring a picker or a slider; the rest are text fields with a different keyboard on a touch device.',
            html: `<div class="grid">
  <label>text <input type="text" name="t"></label>
  <label>email <input type="email" name="e"></label>
  <label>password <input type="password" name="p"></label>
  <label>tel <input type="tel" name="te"></label>
  <label>url <input type="url" name="u"></label>
  <label>search <input type="search" name="s"></label>
  <label>number <input type="number" name="n" min="0" max="10"></label>
  <label>date <input type="date" name="d"></label>
  <label>time <input type="time" name="ti"></label>
  <label>month <input type="month" name="mo"></label>
  <label>color <input type="color" name="c" value="#1d4ed8"></label>
  <label>range <input type="range" name="r" min="0" max="100" value="40"></label>
  <label>checkbox <input type="checkbox" name="cb" checked></label>
  <label>radio <input type="radio" name="ra" checked></label>
  <label>file <input type="file" name="f"></label>
  <label>hidden <input type="hidden" name="h" value="opaque"></label>
</div>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 13px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem; }
label { display: grid; gap: 0.15rem; font-weight: 600; color: #475569; }
input { padding: 0.3rem; border: 1px solid #cbd5e1; border-radius: 4px; font: inherit; }`,
            height: 300,
          },
          {
            type: 'code',
            id: 'c-l61-c1',
            language: 'html',
            title: 'The types, and what each is for',
            code: `<!-- text-like: same control, different keyboard on touch -->
<input type="text">      <!-- the default; anything that is not really any of the others -->
<input type="email">     <!-- @ key; a rough validity check, not a real one -->
<input type="password">  <!-- masked, and the manager can fill it -->
<input type="tel">       <!-- numeric keypad, + and # allowed -->
<input type="url">       <!-- keyboard with : / and . -->
<input type="search">    <!-- a clear button, and a search-engine hint -->

<!-- numeric: value is a number, and min/max/step are respected -->
<input type="number" min="0" max="100" step="5" inputmode="numeric">

<!-- date and time: a picker, a formatted value, and a locale-aware presentation -->
<input type="date" min="2026-01-01" max="2026-12-31">
<input type="time" step="900">            <!-- 15 minute steps -->
<input type="datetime-local">
<input type="month">                      <!-- 2026-01 -->
<input type="week">                       <!-- 2026-W05 -->

<!-- colour -->
<input type="color" value="#1d4ed8">     <!-- the value is always #rrggbb -->

<!-- range: a slider, with an output showing the value -->
<input type="range" min="0" max="100" step="1" value="40">

<!-- boolean and choice -->
<input type="checkbox" name="terms" checked>        <!-- on or off; the value is "on" unless set -->
<input type="radio" name="plan" value="a" checked>  <!-- one of a group sharing a name -->

<!-- file -->
<input type="file" accept="image/*" multiple>

<!-- hidden: submitted but never shown -->
<input type="hidden" name="csrf" value="a3f9…">

<!-- and the four you build yourself when nothing fits -->
<textarea></textarea>
<select></select>
<datalist id="d"></datalist>
<output></output>`,
          },
          {
            type: 'tip',
            id: 'c-l61-t1',
            title: 'inputmode is the keyboard hint',
            body: 'There are cases where the semantic type is wrong but the keyboard you want is right. `inputmode="numeric"` on a type="text" field gives the numeric keypad without the browser rejecting values like "1,200". inputmode changes the keyboard; type changes validation.',
          },
          {
            type: 'warning',
            id: 'c-l61-w1',
            title: 'type="number" is not a numeric field',
            body: 'A number input silently discards anything the browser cannot parse, so a user typing "1,200" or "12kg" ends up with an empty field and no explanation. It also has poor accessibility support in several screen readers, and scroll-wheel changes the value by accident. For a quantity, `type="text"` with `inputmode="numeric"` and a pattern is frequently the better answer.',
          },
          {
            type: 'exercise',
            id: 'c-l61-x1',
            exercise: {
              id: 'ex-l61',
              instructions:
                'Build a small form using a date input, an email input, a range input with an output showing its value, and a checkbox.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<div>\n  \n</div>\n',
                javascript: "const range = document.querySelector('input[type=\"range\"]');\n",
              },
              tests: [
                {
                  id: 'ex-l61-t1',
                  label: 'There is a date input',
                  body: 'return !!document.querySelector("input[type=\'date\']")',
                },
                {
                  id: 'ex-l61-t2',
                  label: 'There is an email input',
                  body: 'return !!document.querySelector("input[type=\'email\']")',
                },
                {
                  id: 'ex-l61-t3',
                  label: 'There is a range input with min and max',
                  body:
                    'const r = document.querySelector("input[type=\'range\']"); return !!r && r.hasAttribute("min") && r.hasAttribute("max")',
                },
                {
                  id: 'ex-l61-t4',
                  label: 'There is a checkbox',
                  body: 'return !!document.querySelector("input[type=\'checkbox\']")',
                },
                {
                  id: 'ex-l61-t5',
                  label: 'An output reports the range value, and it matches the slider',
                  body:
                    'const r = document.querySelector("input[type=\'range\']"); const o = document.querySelector("output"); return !!o && o.textContent.includes(r.value)',
                },
              ],
              hints: [
                'The output element is for a computed result — exactly what a live slider value is.',
                'An input with for="…" on the output associates them, so a screen reader announces which input the value came from.',
              ],
              solution: {
                html:
                  '<div>\n  <p><label for="when">Date</label><input id="when" name="when" type="date"></p>\n  <p><label for="mail">Email</label><input id="mail" name="mail" type="email"></p>\n  <p><label for="level">Level</label><input id="level" name="level" type="range" min="0" max="100" value="40"> <output for="level" id="level-out">40</output></p>\n  <p><label for="agree"><input id="agree" name="agree" type="checkbox"> I agree</label></p>\n</div>\n',
                javascript:
                  "const range = document.getElementById('level');\nconst out = document.getElementById('level-out');\nrange.addEventListener('input', () => { out.textContent = range.value; });\n",
              },
              testNotes:
                'The last test checks the live value rather than the markup, so it only passes if the input handler is actually wired up.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s51',
    title: 'HTML Input Attributes',
    description: 'The attributes on an input, and the ones that decide whether a browser will fill it in for you.',
    lessons: [
      {
        id: 'html-l62',
        title: 'HTML Input Attributes',
        description: 'min, max, step, pattern, placeholder, readonly, disabled, required and autocomplete.',
        duration: 6,
        objectives: [
          'Use the constraint attributes to describe what a field accepts',
          'Tell readonly from disabled, and know which one submits',
          'Write autocomplete tokens that help a password manager',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l62',
          title: 'HTML Input Attributes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l62-q1',
              type: 'multiple-choice',
              prompt: 'What is the difference between readonly and disabled?',
              options: [
                'They are identical',
                'readonly submits and stays focusable; disabled is not submitted and is skipped by the keyboard',
                'disabled submits, readonly does not',
                'readonly is for text inputs, disabled is for selects',
              ],
              answer: 1,
              explanation: 'A readonly field is part of the data and reachable by keyboard. A disabled field is not in the submission at all.',
            },
            {
              id: 'quiz-html-l62-q2',
              type: 'true-false',
              prompt: 'A placeholder attribute is a substitute for a label.',
              answer: false,
              explanation: 'It disappears as soon as the user types, and screen reader support is inconsistent. Keep a real label.',
            },
            {
              id: 'quiz-html-l62-q3',
              type: 'multiple-choice',
              prompt: 'Which autocomplete token belongs on a sign-in password field?',
              options: [
                'new-password',
                'current-password',
                'password',
                'off',
              ],
              answer: 1,
              explanation: 'current-password tells the manager this is an existing password, so it fills rather than offers to generate one.',
            },
            {
              id: 'quiz-html-l62-q4',
              type: 'blank',
              prompt: 'Which attribute constrains a value against a regular expression?',
              answers: [
                'pattern',
                'pattern=',
              ],
              explanation: 'The pattern is anchored at both ends automatically, so ^ and $ are not needed.',
            },
            {
              id: 'quiz-html-l62-q5',
              type: 'multiple-choice',
              prompt: 'Why must constraints be enforced on the server as well?',
              options: [
                'The browser is not always present',
                'maxlength and pattern are trivially bypassed by a script, a paste or the developer tools',
                'It makes the code shorter',
                'Servers are faster',
              ],
              answer: 1,
              explanation: 'Client-side validation is a convenience for the user. The server is the only place a constraint is actually enforced.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l62-b1',
            body: 'An input carries a dozen attributes that describe what it accepts and how it behaves. The constraint attributes — `min`, `max`, `step`, `pattern`, `maxlength` — are what the browser validates against. `placeholder` is a hint, not a label. `readonly` and `disabled` look similar and are not: a readonly field is submitted and focusable but not editable, and a disabled field is not submitted at all and is skipped by keyboard navigation.',
          },
          {
            type: 'demo',
            id: 'c-l62-d1',
            title: 'The states a field can be in',
            body: 'Four fields with the same value and different states: normal, readonly, disabled, and required but empty. The readonly one is still submitted; the disabled one is not, and tabbing skips it entirely.',
            html: `<form id="f">
  <p><label for="a">Normal</label><input id="a" name="a" value="editable"></p>
  <p><label for="b">Readonly</label><input id="b" name="b" value="submitted, not editable" readonly></p>
  <p><label for="c">Disabled</label><input id="c" name="c" value="not submitted at all" disabled></p>
  <p><label for="d">Required, empty</label><input id="d" name="d" required></p>
</form>
<p id="out" aria-live="polite"></p>
<button type="button" id="log">Show what would be submitted</button>

<script>
  document.getElementById('log').addEventListener('click', () => {
    document.getElementById('out').textContent =
      'FormData: ' + JSON.stringify(Object.fromEntries(new FormData(document.getElementById('f'))));
  });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
p { margin: 0 0 0.4rem; display: grid; gap: 0.15rem; }
label { font-weight: 600; }
input { padding: 0.35rem; border: 1px solid #cbd5e1; border-radius: 4px; font: inherit; }
input:disabled { background: #f1f5f9; }
button { padding: 0.35rem 0.7rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; }
#out { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #0f766e; }`,
            height: 330,
          },
          {
            type: 'list',
            id: 'c-l62-l1',
            style: 'bullet',
            items: [
              '`name` — the key the value is submitted under. Without it, the field sends nothing.',
              '`value` — the initial value.',
              '`placeholder` — a hint shown when empty. It disappears as soon as you type, so it is not a label.',
              '`required` — must not be empty. The browser blocks submission and shows its own message.',
              '`disabled` — not editable, not focusable, and not submitted.',
              '`readonly` — not editable, but focusable and submitted.',
              '`min`, `max`, `step` — the numeric and date bounds.',
              '`maxlength` and `minlength` — length limits, enforced only on user input, not on a pasted or scripted value.',
              '`pattern` — a regular expression the value must match, anchored at both ends automatically.',
              '`autocomplete` — a token describing what the field holds, which is what lets a password manager fill it in.',
              '`inputmode` — which keyboard to show on a touch device.',
            ],
          },
          {
            type: 'code',
            id: 'c-l62-c1',
            language: 'html',
            title: 'The attributes in use',
            code: `<!-- a postcode: a pattern, a max length, and an autocomplete token -->
<label for="postcode">Postcode</label>
<input id="postcode" name="postcode"
       pattern="[A-Z]{1,2}\\d[A-Z\\d]?\\s?\\d[A-Z]{2}"
       maxlength="8"
       autocomplete="postal-code"
       required>

<!-- a quantity: bounds, a step, and a numeric keyboard without the discard behaviour -->
<label for="qty">Quantity</label>
<input id="qty" name="qty" type="text" inputmode="numeric"
       pattern="\\d{1,3}" value="1">

<!-- sign-in fields, with the tokens a password manager needs -->
<input name="email" type="email" autocomplete="username" required>
<input name="password" type="password" autocomplete="current-password" required>

<!-- registration: new-password, and never off -->
<input name="new-password" type="password" autocomplete="new-password" minlength="12" required>

<!-- readonly versus disabled, on a reference number the server assigned -->
<input name="reference" value="INV-40218" readonly>
<input name="legacy_id" value="INV-40218" disabled>

<!-- the placeholder is a hint, not a label -->
<input name="search" placeholder="Search products…">
<!-- never: <input placeholder="Email address"> with no label -->`,
          },
          {
            type: 'tip',
            id: 'c-l62-t1',
            title: 'The label is not optional',
            body: 'A placeholder is announced by some screen readers and ignored by others, and it disappears the moment the user types, so the field becomes unlabelled. A real `label for` is always there, always read, and clickable for focus. Use the placeholder for the format hint: "e.g. 12:30".',
          },
          {
            type: 'warning',
            id: 'c-l62-w1',
            title: 'maxlength does not protect the server',
            body: 'A user can set a longer value through the developer tools, paste, or a scripted assignment, and browsers deliberately do not apply maxlength to a programmatically set value. Enforce every constraint again on the server, where it cannot be bypassed.',
          },
          {
            type: 'exercise',
            id: 'c-l62-x1',
            exercise: {
              id: 'ex-l62',
              instructions:
                'Build a labelled field with a pattern and a maxlength, a second field that is readonly, and a third that is disabled — and confirm which of the two the form actually submits.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<form id="f">\n  \n</form>\n<p id="out"></p>\n',
                javascript: "const out = document.getElementById('out');\n",
              },
              tests: [
                {
                  id: 'ex-l62-t1',
                  label: 'Every control has a label associated with it',
                  body:
                    'return Array.from(document.querySelectorAll("input")).every(i => !!document.querySelector("label[for=\'" + i.id + "\']"))',
                },
                {
                  id: 'ex-l62-t2',
                  label: 'One input has a pattern',
                  body: 'return !!document.querySelector("input[pattern]")',
                },
                {
                  id: 'ex-l62-t3',
                  label: 'One input has a maxlength',
                  body: 'return !!document.querySelector("input[maxlength]")',
                },
                {
                  id: 'ex-l62-t4',
                  label: 'One input is readonly and one is disabled',
                  body:
                    'return !!document.querySelector("input[readonly]") && !!document.querySelector("input[disabled]")',
                },
                {
                  id: 'ex-l62-t5',
                  label: 'The readonly field is submitted and the disabled one is not',
                  body:
                    'const d = Object.fromEntries(new FormData(document.getElementById("f"))); return Object.values(d).some(v => typeof v === "string" && v.length > 0) && !JSON.stringify(d).includes("legacy")',
                },
              ],
              hints: [
                'A label is associated by its for attribute matching the input id.',
                'Build the FormData and look at the keys — that is exactly what the server receives.',
              ],
              solution: {
                html:
                  '<form id="f">\n  <p><label for="code">Reference</label><input id="code" name="code" pattern="[A-Z]{2}-\\d{4}" maxlength="7" value="INV-4021" required></p>\n  <p><label for="ref">Assigned reference</label><input id="ref" name="reference" value="INV-40218" readonly></p>\n  <p><label for="legacy">Legacy id</label><input id="legacy" name="legacy_id" value="INV-40218" disabled></p>\n</form>\n<p id="out"></p>\n',
                javascript:
                  "const out = document.getElementById('out');\nout.textContent = 'Submitted: ' + JSON.stringify(Object.fromEntries(new FormData(document.getElementById('f'))));\n",
              },
              testNotes:
                'The last test is the whole point of the lesson. readonly submits, disabled does not, and the difference is invisible until you inspect the data.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s52',
    title: 'HTML Input Form Attributes',
    description: 'The form owner attributes, and what shared form submission means in practice.',
    lessons: [
      {
        id: 'html-l63',
        title: 'HTML Input Form Attributes',
        description: 'form, formaction, formmethod, formtarget and formenctype on controls that live outside their form.',
        duration: 6,
        objectives: [
          'Associate a control with a form from outside it using the form attribute',
          'Override the submission per button with formaction and formmethod',
          'Say when a second submit button is the right design',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l63',
          title: 'HTML Input Form Attributes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l63-q1',
              type: 'multiple-choice',
              prompt: 'What does the form attribute on an input do?',
              options: [
                'Sets the encoding of the submission',
                'Associates the control with a form by its id, even from outside the form element',
                'Marks the control as required',
                'Gives the control a name',
              ],
              answer: 1,
              explanation: 'It takes the form id with no hash, and the association works in both directions.',
            },
            {
              id: 'quiz-html-l63-q2',
              type: 'multiple-choice',
              prompt: 'How do you make one button submit a form to a different URL?',
              options: [
                'Set the action attribute on the button',
                'Set formaction on the button',
                'Use a second form',
                'Use target="_blank"',
              ],
              answer: 1,
              explanation: 'formaction overrides the form action for that button only, which is how one form gets two destinations.',
            },
            {
              id: 'quiz-html-l63-q3',
              type: 'true-false',
              prompt: 'The form attribute can associate a label with a control that is outside the form.',
              answer: true,
              explanation: 'label, output, fieldset, legend and object all accept it, which is what makes remote association work.',
            },
            {
              id: 'quiz-html-l63-q4',
              type: 'blank',
              prompt: 'Which attribute skips constraint validation for a single button?',
              answers: [
                'formnovalidate',
                'formnovalidate',
              ],
              explanation: 'The form-level equivalent is novalidate, and it applies to the whole form.',
            },
            {
              id: 'quiz-html-l63-q5',
              type: 'multiple-choice',
              prompt: 'Which is the best reason to have two submit buttons?',
              options: [
                'To have two forms on one page',
                'Because the actions differ, so one set of fields can go to two destinations',
                'To make the form look better',
                'To disable validation on one path',
              ],
              answer: 1,
              explanation: 'Preview versus publish, or save versus save-and-close, are genuinely different actions and belong in one form.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l63-b1',
            body: 'Every form-associated element can name the form it belongs to with the `form` attribute, and a submit button can override the form\'s action, method, target and encoding with `formaction`, `formmethod`, `formtarget` and `formenctype`. That is what makes a page with a search form in the header and a comment form in the article possible, and what lets one form have two different destinations.',
          },
          {
            type: 'demo',
            id: 'c-l63-d1',
            title: 'A form with two submit destinations',
            body: 'One form, two buttons. The first previews the draft; the second publishes it. The buttons override the method and the action, so one set of fields goes to two different endpoints.',
            html: `<form id="editor" action="/publish" method="post">
  <p>
    <label for="title">Title</label>
    <input id="title" name="title" type="text" required>
  </p>
  <p>
    <label for="body">Body</label>
    <textarea id="body" name="body" rows="3"></textarea>
  </p>
  <button type="submit" formaction="/preview" formmethod="get" formtarget="_blank">
    Preview
  </button>
  <button type="submit">Publish</button>
</form>

<p class="out" id="out" aria-live="polite"></p>

<script>
  const form = document.getElementById('editor');
  document.getElementById('out').textContent =
    'Publish button posts to /publish. Preview button GETs /preview in a new tab.';
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
form { display: grid; gap: 0.5rem; max-width: 320px; }
p { margin: 0; display: grid; gap: 0.15rem; }
label { font-weight: 600; }
input, textarea { padding: 0.35rem; border: 1px solid #cbd5e1; border-radius: 4px; font: inherit; }
button { padding: 0.35rem 0.7rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; }
.out { color: #0f766e; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }`,
            height: 330,
          },
          {
            type: 'list',
            id: 'c-l63-l1',
            style: 'bullet',
            items: [
              '`form` on a control — associates it with a form by id, even from outside the form element.',
              '`formaction` on a submit button — the URL this particular button submits to.',
              '`formmethod` — get or post, per button.',
              '`formtarget` — which browsing context receives the response, per button.',
              '`formenctype` — the body encoding for this button.',
              '`formnovalidate` — skips constraint validation for this button only.',
              '`form` on a `label`, `output`, `fieldset`, `legend` and `object` — the same association, in both directions.',
            ],
          },
          {
            type: 'code',
            id: 'c-l63-c1',
            language: 'html',
            title: 'A control outside its form, and two destinations',
            code: `<!-- a search form in the header -->
<form id="site-search" action="/search" method="get" role="search">
  <label for="site-q">Search</label>
  <input id="site-q" name="q" type="search">
  <button type="submit">Search</button>
</form>

<!-- a comment form far down the page, with a hidden control associated from outside -->
<form id="comments" action="/comments" method="post">
  <input type="hidden" name="article_id" value="42">
  <label for="comment">Add a comment</label>
  <textarea id="comment" name="comment" rows="3" required></textarea>
  <button type="submit">Post comment</button>
</form>

<!-- and a control that belongs to the comment form, rendered somewhere else entirely -->
<label for="nickname" form="comments">Display name</label>
<input id="nickname" name="nickname" form="comments" type="text">

<!-- one form, two destinations -->
<form id="editor" action="/publish" method="post">
  <input name="title">
  <button type="submit" formaction="/preview" formmethod="get" formtarget="_blank">Preview</button>
  <button type="submit">Publish</button>
</form>

<!-- and one that skips validation on the way -->
<form action="/subscribe" method="post">
  <input name="email" type="email" required>
  <button type="submit">Subscribe properly</button>
  <button type="submit" formnovalidate>Subscribe anyway</button>
</form>`,
          },
          {
            type: 'tip',
            id: 'c-l63-t1',
            title: 'A second submit button is a real pattern',
            body: 'Save and save-and-close, publish and preview, submit and submit-and-add-another. Each is a genuinely different action with a different destination, and one set of fields with two buttons is the honest way to model that — as opposed to one form plus a script that rewrites the action.',
          },
          {
            type: 'warning',
            id: 'c-l63-w1',
            title: 'formtarget is a tab, not a popup',
            body: '`formtarget="_blank"` opens a new tab, which for a preview is reasonable and for a submit is disorienting — the user ends up with two copies of the page and no clear indication of which one succeeded. If you need a confirmation view, render it in the same tab.',
          },
          {
            type: 'exercise',
            id: 'c-l63-x1',
            exercise: {
              id: 'ex-l63',
              instructions:
                'Build a form with two submit buttons pointing at different actions, and one labelled control that lives outside the form but is associated with it using the form attribute.',
              languages: ['html'],
              starterCode: {
                html: '<form id="editor" action="/publish" method="post">\n  \n</form>\n',
              },
              tests: [
                {
                  id: 'ex-l63-t1',
                  label: 'The form has an id and an action',
                  body:
                    'const f = document.querySelector("form"); return !!f.id && !!f.getAttribute("action")',
                },
                {
                  id: 'ex-l63-t2',
                  label: 'There are two submit buttons',
                  body:
                    'return Array.from(document.querySelectorAll("form button")).filter(b => b.getAttribute("type") === "submit").length === 2',
                },
                {
                  id: 'ex-l63-t3',
                  label: 'One submit button overrides the action with formaction',
                  body:
                    'return !!document.querySelector("form button[formaction]")',
                },
                {
                  id: 'ex-l63-t4',
                  label: 'There is a labelled control whose form attribute points at the form id',
                  body:
                    'const f = document.querySelector("form"); const el = document.querySelector("[form=\'" + f.id + "\']"); return !!el && !!document.querySelector("label[for=\'" + el.id + "\']")',
                },
                {
                  id: 'ex-l63-t5',
                  label: 'The form attribute association actually takes effect',
                  body:
                    'const f = document.querySelector("form"); const el = document.querySelector("[form=\'" + f.id + "\']"); return !!el && el.form === f',
                },
              ],
              hints: [
                'The form attribute takes the id of the form, without a hash.',
                'A label can carry the same form attribute, which is what associates it with a control outside the form.',
              ],
              solution: {
                html:
                  '<label for="title" form="editor">Title</label>\n<input id="title" name="title" form="editor" type="text">\n\n<form id="editor" action="/publish" method="post">\n  <p><label for="body">Body</label><textarea id="body" name="body" rows="3"></textarea></p>\n  <button type="submit" formaction="/preview" formmethod="get" formtarget="_blank">Preview</button>\n  <button type="submit">Publish</button>\n</form>\n',
              },
              testNotes:
                'The last test uses the element form property, which is the browser\'s own answer to whether the association is live rather than an assumption from the markup.',
            },
          },
        ],
      },
    ],
  },
]
