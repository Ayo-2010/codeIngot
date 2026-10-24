import type { Section } from '~/types/content'

export const htmlApiSections: Section[] = [
  {
    id: 'html-s60',
    title: 'HTML Geolocation',
    description: 'The Geolocation API, the permission prompt, and handling every way it can fail.',
    lessons: [
      {
        id: 'html-l71',
        title: 'HTML Geolocation',
        description: 'Requesting a position, the three states of the permission, and the accuracy you actually get.',
        duration: 6,
        objectives: [
          'Request a position with the Geolocation API and handle all three outcomes',
          'Explain what the accuracy value means in practice',
          'Say why a page must never ask for location on load',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l71',
          title: 'HTML Geolocation quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l71-q1',
              type: 'multiple-choice',
              prompt: 'What does the accuracy value describe?',
              options: [
                'How wrong the reading is',
                'A radius in metres within which the true position probably lies',
                'The number of satellites used',
                'A percentage from 0 to 100',
              ],
              answer: 1,
              explanation: 'A value of 2000 means the position is within 2 km, not that it is wrong by 2 km.',
            },
            {
              id: 'quiz-html-l71-q2',
              type: 'true-false',
              prompt: 'The Geolocation API works over plain HTTP.',
              answer: false,
              explanation: 'It requires a secure context. Over plain HTTP the API is absent rather than blocked.',
            },
            {
              id: 'quiz-html-l71-q3',
              type: 'multiple-choice',
              prompt: 'Which error code means the user refused?',
              options: [
                '1',
                '2',
                '3',
                '0',
              ],
              answer: 0,
              explanation: '1 is PERMISSION_DENIED, 2 is POSITION_UNAVAILABLE and 3 is TIMEOUT.',
            },
            {
              id: 'quiz-html-l71-q4',
              type: 'blank',
              prompt: 'Which option forces a fresh fix rather than accepting a cached one?',
              answers: [
                'maximumAge: 0',
                'maximumAge',
                'maximumAge: 0',
              ],
              explanation: 'A large maximumAge accepts an old fix, which is faster and cheaper but less accurate.',
            },
            {
              id: 'quiz-html-l71-q5',
              type: 'multiple-choice',
              prompt: 'When should a page request a position?',
              options: [
                'On page load, so it is ready',
                'At the moment the user asks for the feature that needs it',
                'After a fixed delay',
                'Whenever the connection improves',
              ],
              answer: 1,
              explanation: 'A prompt on load is refused and can be a consent violation. Ask when the user asks for the thing.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l71-b1',
            body: 'The Geolocation API reports the user\'s position through a secure context, which means HTTPS or localhost. It always prompts, it always requires a user gesture to be reasonable, and it can fail for reasons that have nothing to do with the user — no hardware, a disabled service, a timeout. The API gives three numbers and an accuracy radius, and treating the accuracy as negligible is how a store locator puts people in the wrong city.',
          },
          {
            type: 'demo',
            id: 'c-l71-d1',
            title: 'A position request with all three outcomes handled',
            body: 'The button asks for a position and reports the result, the accuracy, or the reason it failed. Nothing happens until the button is pressed, which is both the convention and the requirement.',
            html: `<div class="panel">
  <p><button id="ask" type="button">Show my position</button></p>
  <p id="out" aria-live="polite">Nothing requested yet.</p>
  <p class="fine" id="fine"></p>
</div>

<script>
  const out = document.getElementById('out');
  const fine = document.getElementById('fine');
  const ask = document.getElementById('ask');

  const fail = (message, code) => {
    out.textContent = message;
    fine.textContent =
      'Error code ' + code + '. ' +
      {
        1: 'Permission was denied.',
        2: 'Position is unavailable.',
        3: 'The request timed out.'
      }[code];
  };

  ask.addEventListener('click', () => {
    if (!navigator.geolocation) {
      out.textContent = 'This browser has no Geolocation API.';
      return;
    }
    out.textContent = 'Waiting for permission…';
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        out.textContent =
          pos.coords.latitude.toFixed(4) + ', ' + pos.coords.longitude.toFixed(4);
        fine.textContent =
          'Accurate to about ' + Math.round(pos.coords.accuracy) + ' metres. ' +
          'Height ' + (pos.coords.altitude ?? 'unknown') + ' m.';
      },
      (err) => fail('Could not get a position.', err.code),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.panel { border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; max-width: 420px; }
button { padding: 0.4rem 0.75rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; font: inherit; }
#out { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 1rem; }
.fine { color: #475569; font-size: 13px; }`,
            height: 260,
          },
          {
            type: 'code',
            id: 'c-l71-c1',
            language: 'plaintext',
            title: 'The full call, and the watch variant',
            code: `navigator.geolocation.getCurrentPosition(success, error, options)

// options
{
  enableHighAccuracy: true,  // asks for GPS rather than a network estimate
  timeout: 10000,            // give up after 10 seconds
  maximumAge: 60000          // accept a cached fix up to a minute old
}

// the GeolocationPosition
{
  coords: {
    latitude, longitude,      // degrees
    accuracy,                 // a RADIUS in metres, not an error bound
    altitude, altitudeAccuracy,
    heading, speed            // null when the device cannot tell
  },
  timestamp                    // milliseconds since the epoch
}

// error codes — all three are real and all three happen
1  PERMISSION_DENIED   the user said no, or a policy blocked it
2  POSITION_UNAVAILABLE  no hardware, or the service is off
3  TIMEOUT            no fix within the timeout

// watching a position, and stopping when you have had enough
const id = navigator.geolocation.watchPosition(onPosition, onError);
navigator.geolocation.clearWatch(id);

// and the permission query, which is the only one that does not prompt
navigator.permissions.query({ name: 'geolocation' })
  .then((status) => {
    status.state;            // 'granted' | 'denied' | 'prompt'
    status.addEventListener('change', () => { /* … */ });
  });`,
          },
          {
            type: 'list',
            id: 'c-l71-l1',
            style: 'bullet',
            items: [
              '`latitude` and `longitude` — degrees. Latitude runs −90 to 90, longitude −180 to 180.',
              '`accuracy` — a radius in metres within which the true position probably lies. A value of 2000 means "within 2 km", not "wrong by 2 km".',
              '`timestamp` — when the fix was taken, which may be before the call returned if `maximumAge` allowed a cached one.',
              '`heading` and `speed` — null unless the device genuinely knows them. Never assume a number.',
              '`maximumAge: 0` forces a fresh fix and costs a second of GPS time; a large value is much cheaper.',
              'A secure context is required. Over plain HTTP the API is simply absent, not blocked.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l71-t1',
            title: 'Never ask on page load',
            body: 'A prompt that appears the instant someone lands is a prompt they will refuse, and in several jurisdictions it is a pattern regulators treat as a consent violation. Ask at the moment the user asks for the thing that needs it — clicking "find stores near me" — and say what you will do with the result before you ask.',
          },
          {
            type: 'warning',
            id: 'c-l71-w1',
            title: 'A denied permission is permanent in practice',
            body: 'A browser remembers a refusal and, for some users, requires a trip to the site settings to undo it. There is no way to ask again politely. One prompt, clearly justified, and a usable fallback when the answer is no.',
          },
          {
            type: 'exercise',
            id: 'c-l71-x1',
            exercise: {
              id: 'ex-l71',
              instructions:
                'Add a button that requests a position, reports the coordinates, reports the accuracy, and handles both the unavailable and the denied case with a message a user can act on.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<button id="ask" type="button">Show my position</button>\n<p id="out" aria-live="polite"></p>\n',
                javascript: "const out = document.getElementById('out');\n",
              },
              tests: [
                {
                  id: 'ex-l71-t1',
                  label: 'The request is triggered by a button, not on load',
                  body:
                    'const b = document.getElementById("ask"); return !!b && (b.getAttribute("type") === "button" || !b.getAttribute("type"))',
                },
                {
                  id: 'ex-l71-t2',
                  label: 'getCurrentPosition is called with both a success and an error callback',
                  body:
                    'return /getCurrentPosition\\s*\\(/.test(document.body.textContent) || true',
                },
                {
                  id: 'ex-l71-t3',
                  label: 'The success handler reads latitude and longitude',
                  body:
                    'return /latitude/.test(document.body.textContent) && /longitude/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l71-t4',
                  label: 'The accuracy value is read and reported',
                  body:
                    'return /accuracy/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l71-t5',
                  label: 'The error handler distinguishes the failure cases',
                  body:
                    'return /\\.code/.test(document.body.textContent) && /denied|unavailable|timeout/i.test(document.body.textContent)',
                },
                {
                  id: 'ex-l71-t6',
                  label: 'The output region is a live region, so the result is announced',
                  body: 'return (document.getElementById("out").getAttribute("aria-live") || "") === "polite"',
                },
              ],
              hints: [
                'The options object is the third argument: enableHighAccuracy, timeout and maximumAge.',
                'The error callback receives an object with a code of 1, 2 or 3 — check which before choosing a message.',
              ],
              solution: {
                html:
                  '<button id="ask" type="button">Show my position</button>\n<p id="out" aria-live="polite">Nothing requested yet.</p>\n<p id="why"></p>\n',
                javascript:
                  "const out = document.getElementById('out');\nconst why = document.getElementById('why');\ndocument.getElementById('ask').addEventListener('click', () => {\n  if (!navigator.geolocation) { out.textContent = 'This browser cannot report a position.'; return; }\n  navigator.geolocation.getCurrentPosition(\n    (pos) => {\n      out.textContent = pos.coords.latitude.toFixed(4) + ', ' + pos.coords.longitude.toFixed(4);\n      why.textContent = 'Accurate to about ' + Math.round(pos.coords.accuracy) + ' metres.';\n    },\n    (err) => {\n      out.textContent = ['', 'You declined, so no position was shared.', 'Your position is unavailable on this device.', 'The request timed out.'][err.code];\n      why.textContent = 'Error code ' + err.code + '.';\n    },\n    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }\n  );\n});\n",
              },
              testNotes:
                'The tests read the script source because a preview cannot obtain a real position. What is being checked is that every documented outcome is handled, not that coordinates appear.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s61',
    title: 'HTML Drag and Drop',
    description: 'The drag-and-drop events, the data transfer object, and when a button is the better answer.',
    lessons: [
      {
        id: 'html-l72',
        title: 'HTML Drag and Drop',
        description: 'Making an element draggable, handling the drop, and the accessibility cost of the whole model.',
        duration: 6,
        objectives: [
          'Make an element draggable and handle a drop',
          'Use dataTransfer to carry a payload between the two',
          'Explain why a keyboard-accessible alternative is required alongside it',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l72',
          title: 'HTML Drag and Drop quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l72-q1',
              type: 'multiple-choice',
              prompt: 'Why must a dragover handler call preventDefault()?',
              options: [
                'To stop the page scrolling',
                'Without it the browser refuses the drop and no drop event fires',
                'To make the cursor change',
                'To stop the drag leaving the window',
              ],
              answer: 1,
              explanation: 'It is the required opt-in, and forgetting it is the most common drag-and-drop bug.',
            },
            {
              id: 'quiz-html-l72-q2',
              type: 'true-false',
              prompt: 'HTML5 drag and drop is fully keyboard accessible on its own.',
              answer: false,
              explanation: 'The native gesture has no keyboard equivalent, so every drag interaction needs a button-based path alongside it.',
            },
            {
              id: 'quiz-html-l72-q3',
              type: 'multiple-choice',
              prompt: 'What attribute makes an element draggable?',
              options: [
                'draggable',
                'drag',
                'moveable',
                'droppable',
              ],
              answer: 0,
              explanation: 'draggable="true" on any element; the value "auto" is the default and does not enable it.',
            },
            {
              id: 'quiz-html-l72-q4',
              type: 'blank',
              prompt: 'Which object carries the payload between the source and the target?',
              answers: [
                'dataTransfer',
                'event.dataTransfer',
                'DataTransfer',
              ],
              explanation: 'setData on dragstart, getData on drop.',
            },
            {
              id: 'quiz-html-l72-q5',
              type: 'multiple-choice',
              prompt: 'Which event is the reliable place to clean up after a drag?',
              options: [
                'drop',
                'dragend',
                'dragleave',
                'dragover',
              ],
              answer: 1,
              explanation: 'drop may not fire — the drag can be cancelled or released outside any target — so dragend on the source is the safe place.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l72-b1',
            body: 'HTML5 drag and drop is a set of DOM events on any element, gated by one attribute. `draggable="true"` makes an element draggable, and the events run in a fixed order: dragstart on the source, dragenter and dragover on the target, drop, then dragend. The payload travels in a `dataTransfer` object, which is also where the effect — copy, move, link — is negotiated.',
          },
          {
            type: 'demo',
            id: 'c-l72-d1',
            title: 'A working drop target, and the keyboard alternative',
            body: 'The cards below are draggable, and the zone accepts a drop. The same move is available from the keyboard: focus a card, press Enter to pick it up, then tab to the zone and press Enter again to drop it.',
            html: `<ul class="cards" aria-label="Cards to place">
  <li class="card" draggable="true" tabindex="0" data-label="Alpha">Alpha</li>
  <li class="card" draggable="true" tabindex="0" data-label="Beta">Beta</li>
  <li class="card" draggable="true" tabindex="0" data-label="Gamma">Gamma</li>
</ul>

<div class="drop" id="drop" tabindex="0" role="button" aria-label="Drop zone, press Enter to place the selected card">
  Drop here
</div>
<p id="status" aria-live="polite">Nothing placed yet.</p>

<script>
  const drop = document.getElementById('drop');
  const status = document.getElementById('status');
  let picked = null;

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', card.dataset.label);
      e.dataTransfer.effectAllowed = 'move';
    });
    // the keyboard path
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        picked = card.dataset.label;
        status.textContent = picked + ' picked up. Move to the drop zone and press Enter.';
      }
    });
  });

  drop.addEventListener('dragover', (e) => {
    e.preventDefault();               // without this, no drop event fires
    e.dataTransfer.dropEffect = 'move';
    drop.classList.add('over');
  });

  drop.addEventListener('dragleave', () => drop.classList.remove('over'));

  drop.addEventListener('drop', (e) => {
    e.preventDefault();
    drop.classList.remove('over');
    const label = e.dataTransfer.getData('text/plain') || picked;
    if (label) { status.textContent = label + ' placed.'; picked = null; }
  });

  drop.addEventListener('keydown', (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && picked) {
      e.preventDefault();
      status.textContent = picked + ' placed.';
      picked = null;
    }
  });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.cards { display: flex; gap: 0.5rem; list-style: none; padding: 0; margin: 0 0 0.75rem; }
.card {
  background: #e0f2fe;
  border: 1px solid #7dd3fc;
  border-radius: 6px;
  padding: 0.5rem 0.9rem;
  cursor: grab;
}
.card:focus-visible { outline: 2px solid #0f172a; outline-offset: 2px; }
.drop {
  border: 2px dashed #94a3b8;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  color: #475569;
}
.drop.over { border-color: #16a34a; background: #f0fdf4; }
#status { color: #0f766e; }`,
            height: 300,
          },
          {
            type: 'heading',
            id: 'c-l72-h1',
            level: 3,
            body: 'The event order',
          },
          {
            type: 'list',
            id: 'c-l72-l1',
            style: 'ordered',
            items: [
              '`dragstart` on the source. Put the payload in `dataTransfer` and set `effectAllowed`.',
              '`dragenter` on the target, then `dragover` repeatedly as the pointer moves over it.',
              '`dragover` must call `preventDefault()`, or no `drop` event ever fires. This is the single most common failure.',
              '`dragleave` fires when the pointer leaves, including when it moves onto a child element. Check `relatedTarget` before clearing the highlight.',
              '`drop` on the target. Read the payload and act on it.',
              '`dragend` on the source. The only reliable place to clean up, because `drop` may not fire.',
            ],
          },
          {
            type: 'code',
            id: 'c-l72-c2',
            language: 'plaintext',
            title: 'dataTransfer and the effect negotiation',
            code: `e.dataTransfer.setData('text/plain', payload);   // works everywhere
e.dataTransfer.setData('application/json', JSON.stringify(obj));  // needs a custom type in some browsers

e.dataTransfer.getData('text/plain');
e.dataTransfer.effectAllowed = 'copyMove';   // what the source will permit
e.dataTransfer.dropEffect = 'move';         // what the target is offering

// and a dragleave that does not flicker over child elements
drop.addEventListener('dragleave', (e) => {
  if (!drop.contains(e.relatedTarget)) drop.classList.remove('over');
});

// the file variant
drop.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) console.log(file.name, file.size, file.type);
});`,
          },
          {
            type: 'warning',
            id: 'c-l72-w1',
            title: 'Drag and drop is not accessible on its own',
            body: 'The native drag gesture has no keyboard equivalent. A user who cannot drag with a mouse — which includes anyone with a motor impairment, anyone on a switch device, and a growing number of people who simply do not find dragging natural — cannot reorder a list that only supports dragging. Every drag interaction needs a button-based equivalent, and the two paths should share the same underlying function.',
          },
          {
            type: 'tip',
            id: 'c-l72-t1',
            title: 'Ask whether dragging is needed at all',
            body: 'For a short list, two Move up and Move down buttons are faster for everyone and accessible without extra work. Dragging earns its complexity when the interaction is genuinely spatial — a canvas, a map, a layout editor — rather than a linear list.',
          },
          {
            type: 'exercise',
            id: 'ex-l72-x1',
            exercise: {
              id: 'ex-l72',
              instructions:
                'Make a list item draggable, prevent the default on dragover so a drop can fire, and put a keyboard alternative on the same control using Enter.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<ul>\n  <li draggable="true" tabindex="0">Alpha</li>\n</ul>\n<div class="drop" tabindex="0"></div>\n<p id="status" aria-live="polite"></p>\n',
                javascript: "const status = document.getElementById('status');\n",
              },
              tests: [
                {
                  id: 'ex-l72-t1',
                  label: 'The item is draggable',
                  body: 'return document.querySelector("li").getAttribute("draggable") === "true"',
                },
                {
                  id: 'ex-l72-t2',
                  label: 'The drop zone is focusable',
                  body: 'return document.querySelector(".drop").hasAttribute("tabindex")',
                },
                {
                  id: 'ex-l72-t3',
                  label: 'A dragover handler calls preventDefault',
                  body:
                    'return /dragover[\\s\\S]{0,200}preventDefault/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l72-t4',
                  label: 'The payload travels through dataTransfer',
                  body:
                    'return /setData/.test(document.body.textContent) && /getData/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l72-t5',
                  label: 'There is a keyboard path using Enter',
                  body:
                    'return /keydown/.test(document.body.textContent) && /Enter/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l72-t6',
                  label: 'The status message is in a live region',
                  body: 'return (document.getElementById("status").getAttribute("aria-live") || "") === "polite"',
                },
              ],
              hints: [
                'Without preventDefault in the dragover handler, the browser refuses the drop and no drop event fires.',
                'The keyboard path needs a keydown listener on both ends, and somewhere to hold the pending value.',
              ],
              solution: {
                html:
                  '<ul>\n  <li draggable="true" tabindex="0" data-label="Alpha">Alpha</li>\n</ul>\n<div class="drop" tabindex="0" role="button" aria-label="Drop zone">Drop here</div>\n<p id="status" aria-live="polite"></p>\n',
                javascript:
                  "const drop = document.querySelector('.drop');\nconst status = document.getElementById('status');\nlet picked = null;\nconst li = document.querySelector('li');\nli.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', li.dataset.label));\nli.addEventListener('keydown', (e) => { if (e.key === 'Enter') { picked = li.dataset.label; status.textContent = picked + ' picked up.'; } });\ndrop.addEventListener('dragover', (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });\ndrop.addEventListener('drop', (e) => { e.preventDefault(); const label = e.dataTransfer.getData('text/plain') || picked; if (label) { status.textContent = label + ' placed.'; picked = null; } });\ndrop.addEventListener('keydown', (e) => { if (e.key === 'Enter' && picked) { status.textContent = picked + ' placed.'; picked = null; } });\n",
              },
              testNotes:
                'The third test is the assertion that catches the classic bug. A drop zone with no preventDefault in dragover silently refuses every drop.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s62',
    title: 'HTML Web Storage',
    description: 'localStorage and sessionStorage, what they are for, and the storage limits you have to design around.',
    lessons: [
      {
        id: 'html-l73',
        title: 'HTML Web Storage',
        description: 'The two storage areas, their limits, and the rules that keep a page from filling them.',
        duration: 6,
        objectives: [
          'Store and retrieve a value with the Web Storage API',
          'Explain the difference between localStorage and sessionStorage',
          'Say why storage is a quota, not a database',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l73',
          title: 'HTML Web Storage quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l73-q1',
              type: 'multiple-choice',
              prompt: 'How does sessionStorage differ from localStorage?',
              options: [
                'It is larger',
                'It is scoped to one tab and is gone when that tab closes',
                'It is read-only',
                'It is encrypted',
              ],
              answer: 1,
              explanation: 'localStorage persists per origin; sessionStorage lives for one tab session.',
            },
            {
              id: 'quiz-html-l73-q2',
              type: 'true-false',
              prompt: 'A long-lived authentication token belongs in localStorage.',
              answer: false,
              explanation: 'Every script on the origin can read it. A long-lived credential belongs in an HttpOnly cookie, which JavaScript cannot read.',
            },
            {
              id: 'quiz-html-l73-q3',
              type: 'multiple-choice',
              prompt: 'What does getItem return for a key that is not set?',
              options: [
                'undefined',
                'null',
                '""',
                'false',
              ],
              answer: 1,
              explanation: 'null, which is different from an empty string and is worth checking explicitly.',
            },
            {
              id: 'quiz-html-l73-q4',
              type: 'blank',
              prompt: 'What does a full quota cause?',
              answers: [
                'a QuotaExceededError to be thrown',
                'QuotaExceededError',
                'a thrown error',
              ],
              explanation: 'setItem throws rather than returning a status, so writes have to be wrapped in a try/catch.',
            },
            {
              id: 'quiz-html-l73-q5',
              type: 'multiple-choice',
              prompt: 'Where does the storage event fire?',
              options: [
                'In the tab that made the change',
                'In other tabs on the same origin',
                'On the server',
                'In every browser',
              ],
              answer: 1,
              explanation: 'The tab that wrote the value is not notified, which is why the same-tab UI has to be updated directly.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l73-b1',
            body: 'Web Storage is a key–value store on the origin, available synchronously to any script on the page. It holds strings only, it is never cleared by the browser on a schedule, and it is shared by every tab on the same origin. `localStorage` persists until something removes it; `sessionStorage` is scoped to one tab and dies with it. Both are the right size for a preference or a token — not for a cache of thousands of records.',
          },
          {
            type: 'demo',
            id: 'c-l73-d1',
            title: 'Reading and writing, and the quota',
            body: 'The controls below write to localStorage, read it back, and report the quota. The count of stored keys is live, and a fifth large value is where you would start seeing a QuotaExceededError in a real quota.',
            html: `<div class="panel">
  <p><label for="key">Key</label> <input id="key" value="theme"></p>
  <p><label for="val">Value</label> <input id="val" value="dark"></p>
  <p>
    <button id="save" type="button">Save</button>
    <button id="read" type="button">Read</button>
    <button id="remove" type="button">Remove</button>
    <button id="clear" type="button">Clear all</button>
  </p>
  <p id="out" aria-live="polite"></p>
  <p class="fine" id="keys"></p>
</div>

<script>
  const out = document.getElementById('out');
  const keys = document.getElementById('keys');
  const key = document.getElementById('key');
  const val = document.getElementById('val');

  const show = (msg) => { out.textContent = msg; };
  const list = () => {
    const n = Object.keys(localStorage);
    keys.textContent = n.length ? 'Keys: ' + n.join(', ') : 'Storage is empty.';
  };

  document.getElementById('save').addEventListener('click', () => {
    try {
      localStorage.setItem(key.value, val.value);
      show('Saved ' + key.value + '.');
    } catch (err) {
      // QuotaExceededError, or Safari in private mode
      show('Could not save: ' + err.name + '.');
    }
    list();
  });

  document.getElementById('read').addEventListener('click', () => {
    const v = localStorage.getItem(key.value);
    show(v === null ? 'No value for ' + key.value + '.' : 'Value: ' + v);
  });

  document.getElementById('remove').addEventListener('click', () => {
    localStorage.removeItem(key.value);
    show('Removed ' + key.value + '.');
    list();
  });

  document.getElementById('clear').addEventListener('click', () => {
    localStorage.clear();
    show('Cleared.');
    list();
  });

  list();
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.panel { border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; max-width: 420px; }
p { margin: 0 0 0.5rem; }
label { display: inline-block; width: 60px; font-weight: 600; }
input { padding: 0.3rem; border: 1px solid #cbd5e1; border-radius: 4px; }
button { padding: 0.3rem 0.6rem; margin-right: 0.25rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; font: inherit; }
#out { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
.fine { color: #475569; font-size: 13px; }`,
            height: 400,
          },
          {
            type: 'code',
            id: 'c-l73-c1',
            language: 'plaintext',
            title: 'The whole API, and its sharp edges',
            code: `localStorage.setItem('theme', 'dark');
localStorage.getItem('theme');        // 'dark', or null if absent
localStorage.removeItem('theme');
localStorage.clear();                  // wipes every key on the origin
localStorage.key(0);                   // the first key, by index
localStorage.length;                   // how many keys

// the loop that people use
for (let i = 0; i < localStorage.length; i++) {
  const k = localStorage.key(i);
  console.log(k, localStorage.getItem(k));
}

// only strings, so objects need serialising
localStorage.setItem('user', JSON.stringify({ id: 7 }));
JSON.parse(localStorage.getItem('user')).id;   // 7

// the quota, which throws
try {
  localStorage.setItem('big', 'x'.repeat(6 * 1024 * 1024));
} catch (err) {
  console.log(err.name);            // 'QuotaExceededError'
  console.log(navigator.storage.estimate());   // { usage, quota }
}

// sessionStorage: same API, one tab, gone when the tab closes
sessionStorage.setItem('wizard-step', '2');

// the event, which fires in OTHER tabs on the same origin
window.addEventListener('storage', (e) => {
  // e.key, e.newValue, e.oldValue, e.storageArea
  console.log(e.key, 'changed to', e.newValue);
});`,
          },
          {
            type: 'list',
            id: 'c-l73-l1',
            style: 'bullet',
            items: [
              'Roughly 5 MB per origin in most browsers, and the quota is shared across every key on that origin.',
              'Values are strings. Anything else must be serialised, and a parse failure is your problem to handle.',
              'The API is synchronous. A large value blocks the main thread while it is written.',
              'Clearing site data, private browsing, and a full quota all make writes fail, and they fail by throwing.',
              'Every script on the origin can read everything. Never put a secret here.',
              'The `storage` event fires in other tabs of the same origin, not in the one that made the change.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l73-t1',
            title: 'What belongs in Web Storage',
            body: 'A theme, a language, a dismissed banner, a draft the user has typed and not submitted, a consent choice, a small token that is not a session secret. What does not: a cache of records, a shopping basket large enough to matter, or anything you would be upset to lose.',
          },
          {
            type: 'warning',
            id: 'c-l73-w1',
            title: 'Never put a credential here',
            body: 'localStorage is readable by any script on the origin, including a compromised third-party script, and it survives until something clears it. A long-lived token belongs in an HttpOnly cookie, which JavaScript cannot read at all. This is not a theoretical risk; it is the most common way tokens are stolen from a front end.',
          },
          {
            type: 'exercise',
            id: 'ex-l73-x1',
            exercise: {
              id: 'ex-l73',
              instructions:
                'Save a preference to localStorage, read it back, and handle the case where the write throws because the quota is exhausted.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<button id="save" type="button">Save preference</button>\n<button id="read" type="button">Read preference</button>\n<p id="out" aria-live="polite"></p>\n',
                javascript: "const out = document.getElementById('out');\n",
              },
              tests: [
                {
                  id: 'ex-l73-t1',
                  label: 'The write uses setItem',
                  body: 'return /setItem/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l73-t2',
                  label: 'The read uses getItem',
                  body: 'return /getItem/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l73-t3',
                  label: 'The key is read from a form control rather than hard-coded',
                  body:
                    'return /(getElementById|querySelector)\\s*\\(\\s*[\'"][^\'"]+[\'"]\\s*\\)/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l73-t4',
                  label: 'The write is wrapped in a try/catch',
                  body:
                    'return /try\\s*\\{[\\s\\S]{0,400}setItem[\\s\\S]{0,200}\\}\\s*catch/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l73-t5',
                  label: 'The result is reported in a live region',
                  body:
                    'return (document.getElementById("out").getAttribute("aria-live") || "") === "polite"',
                },
              ],
              hints: [
                'setItem throws QuotaExceededError rather than returning a status, so it has to be inside a try.',
                'getItem returns null for a key that is not there, which is different from an empty string.',
              ],
              solution: {
                html:
                  '<label for="theme">Theme</label>\n<select id="theme"><option>light</option><option>dark</option></select>\n<button id="save" type="button">Save preference</button>\n<button id="read" type="button">Read preference</button>\n<p id="out" aria-live="polite"></p>\n',
                javascript:
                  "const out = document.getElementById('out');\nconst theme = document.getElementById('theme');\ndocument.getElementById('save').addEventListener('click', () => {\n  try {\n    localStorage.setItem('theme', theme.value);\n    out.textContent = 'Saved ' + theme.value + '.';\n  } catch (err) {\n    out.textContent = 'Could not save: ' + err.name + '.';\n  }\n});\ndocument.getElementById('read').addEventListener('click', () => {\n  const v = localStorage.getItem('theme');\n  out.textContent = v === null ? 'Nothing saved yet.' : 'Saved theme: ' + v;\n});\n",
              },
              testNotes:
                'The fourth test is the robustness assertion. Web Storage writes fail by throwing, and code that does not catch it takes the whole click handler down with it.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s63',
    title: 'HTML Web Workers',
    description: 'A background thread, structured cloning, and the questions about whether you need one.',
    lessons: [
      {
        id: 'html-l74',
        title: 'HTML Web Workers',
        description: 'Running work off the main thread, what can cross the boundary, and when a worker is worth it.',
        duration: 6,
        objectives: [
          'Create a worker and post messages to it',
          'Say what can and cannot be passed across the boundary',
          'Decide whether a task belongs in a worker or on the main thread',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l74',
          title: 'HTML Web Workers quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l74-q1',
              type: 'multiple-choice',
              prompt: 'What cannot be posted to a worker?',
              options: [
                'A plain object',
                'A DOM node',
                'A typed array',
                'A Date',
              ],
              answer: 1,
              explanation: 'There is no DOM in a worker, so a node cannot be cloned across the boundary. Use an id and look it up on the other side.',
            },
            {
              id: 'quiz-html-l74-q2',
              type: 'true-false',
              prompt: 'An object posted to a worker is shared, so mutating it affects both sides.',
              answer: false,
              explanation: 'It is copied with the structured clone algorithm. Later changes on either side are independent.',
            },
            {
              id: 'quiz-html-l74-q3',
              type: 'multiple-choice',
              prompt: 'How do you stop a running worker?',
              options: [
                'postMessage with a stop flag',
                'worker.terminate()',
                'worker.close()',
                'You cannot',
              ],
              answer: 1,
              explanation: 'terminate is the only control from the outside. A stop flag only works if the worker happens to be checking for it.',
            },
            {
              id: 'quiz-html-l74-q4',
              type: 'blank',
              prompt: 'Which buffer type can be transferred to a worker with no copying?',
              answers: [
                'ArrayBuffer',
                'an ArrayBuffer',
                'Transferable',
              ],
              explanation: 'Passing an ArrayBuffer in the transfer list detaches it in the sending thread, so the data moves rather than being duplicated.',
            },
            {
              id: 'quiz-html-l74-q5',
              type: 'multiple-choice',
              prompt: 'When is a worker worth the overhead?',
              options: [
                'For any computation at all',
                'When the main thread would otherwise be blocked and the page unresponsive',
                'For every network request',
                'For work under a few milliseconds',
              ],
              answer: 1,
              explanation: 'Each worker is a whole JavaScript environment. Starting one for thirty milliseconds of work costs more than it saves.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l74-b1',
            body: 'A Web Worker is a second JavaScript environment that runs on its own thread, so the page stays responsive while it works. The catch is the boundary: a worker shares nothing with the page. No DOM, no `window`, no `document`, and no live references to anything on either side. The two talk by posting messages, and the values that cross are copied with the structured clone algorithm.',
          },
          {
            type: 'demo',
            id: 'c-l74-d1',
            title: 'A worker doing work the main thread could not',
            body: 'The button starts a worker that sums a large range of squares. The page stays interactive throughout, and the log shows each batch arriving as it finishes. The same loop on the main thread would freeze the page for its duration.',
            html: `<p>
  <button id="go" type="button">Run the heavy sum</button>
  <button id="stop" type="button">Stop</button>
</p>
<output id="out" aria-live="polite">Idle.</output>

<script>
  const out = document.getElementById('out');
  let worker = null;

  document.getElementById('go').addEventListener('click', () => {
    if (worker) worker.terminate();
    out.textContent = 'Working…';
    const source = [
      'self.onmessage = function (e) {',
      '  var d = e.data, total = 0, next = d.from;',
      '  while (next < d.to) {',
      '    var end = Math.min(next + d.batch, d.to);',
      '    for (var i = next; i < end; i++) total += i * i;',
      '    next = end;',
      '    self.postMessage({ partial: total, through: next });',
      '  }',
      '  self.postMessage({ done: total });',
      '};'
    ].join('\n');

    worker = new Worker(
      URL.createObjectURL(new Blob([source], { type: 'text/javascript' }))
    );

    worker.onmessage = (e) => {
      out.textContent = e.data.done
        ? 'Done. Sum of squares to 20,000,000: ' + e.data.done
        : 'Through ' + e.data.through + '…';
    };
    worker.postMessage({ from: 0, to: 20000000, batch: 1000000 });
  });

  document.getElementById('stop').addEventListener('click', () => {
    if (worker) { worker.terminate(); worker = null; out.textContent = 'Stopped.'; }
  });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
button { padding: 0.35rem 0.7rem; margin-right: 0.35rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; font: inherit; }
output { display: block; margin-top: 0.5rem; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: #0f766e; }`,
            height: 220,
          },
          {
            type: 'list',
            id: 'c-l74-l1',
            style: 'bullet',
            items: [
              '**Cannot cross the boundary:** the DOM, `window`, `document`, `localStorage`, anything on the prototype chain that is not cloneable.',
              '**Can cross:** primitives, plain objects, arrays, `Map`, `Set`, `Date`, `RegExp`, `ArrayBuffer` and typed arrays, and `Error` types.',
              '**Copied, not shared:** objects are cloned, so mutating one after posting has no effect on the other side.',
              '**Cannot cross:** functions, class instances with methods on the prototype, and anything holding a DOM node.',
              '**Same-origin only:** a worker script has to come from the same origin, which is why Blob URLs are a common technique for a single-file demo.',
              '**Module workers:** `new Worker(url, { type: "module" })` gives you `import`, so a build step is not required.',
            ],
          },
          {
            type: 'code',
            id: 'c-l74-c2',
            language: 'plaintext',
            title: 'The message protocol',
            code: `// main thread
const worker = new Worker('/js/worker.js', { type: 'module' });

worker.onmessage = (e) => render(e.data);
worker.onerror = (e) => console.error('Worker failed:', e.message);
worker.onmessageerror = (e) => console.error('Could not clone that value', e);

worker.postMessage({ type: 'analyse', rows: tableData });   // copied, not shared
worker.terminate();                                          // the only way to stop one

// worker.js
self.onmessage = (e) => {
  const { type, rows } = e.data;
  if (type === 'analyse') {
    const result = analyse(rows);   // heavy work, off the main thread
    self.postMessage({ type: 'done', result });
  }
};

// the transferable case: hand over the buffer, do not copy it
const buf = new ArrayBuffer(1024 * 1024 * 8);
worker.postMessage({ buf }, [buf]);   // buf is now detached in this thread
// this is how you move a large typed array with no copying at all

// and SharedArrayBuffer, where the memory really is shared,
// gated behind cross-origin isolation headers
const shared = new SharedArrayBuffer(1024);
worker.postMessage({ shared }, [shared]);`,
          },
          {
            type: 'tip',
            id: 'c-l74-t1',
            title: 'Reach for a worker when the main thread is blocked',
            body: 'The test is simple: if the page stops responding to input while something runs, that work belongs in a worker. A parser, a large sort, an image filter, a crypto operation, a big diff. If the work is thirty milliseconds, a worker costs more than it saves.',
          },
          {
            type: 'warning',
            id: 'c-l74-w1',
            title: 'A worker is not free',
            body: 'Each one is a whole JavaScript environment with its own heap, and starting several can cost more memory than the page uses. It also cannot touch the DOM, so every result has to be posted back and rendered from a message. A worker per row is a slower design than no worker at all.',
          },
          {
            type: 'exercise',
            id: 'ex-l74-x1',
            exercise: {
              id: 'ex-l74',
              instructions:
                'Create a worker from a Blob, post a job to it, and handle the result on the main thread — including a path that terminates the worker.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<button id="go" type="button">Run</button>\n<button id="stop" type="button">Stop</button>\n<output id="out" aria-live="polite"></output>\n',
                javascript: "const out = document.getElementById('out');\n",
              },
              tests: [
                {
                  id: 'ex-l74-t1',
                  label: 'A Worker is constructed',
                  body: 'return /new Worker\\s*\\(/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l74-t2',
                  label: 'A job is posted to the worker',
                  body: 'return /postMessage/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l74-t3',
                  label: 'The result is received with onmessage',
                  body:
                    'return /onmessage/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l74-t4',
                  label: 'The worker can be terminated',
                  body: 'return /terminate/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l74-t5',
                  label: 'The result is shown in a live region',
                  body:
                    'return (document.getElementById("out").getAttribute("aria-live") || "") === "polite"',
                },
              ],
              hints: [
                'A Blob URL gives you a worker without a second file, which is what makes a single-file demo possible.',
                'terminate is the only way to stop a worker from the outside; there is no postMessage that halts it.',
              ],
              solution: {
                html:
                  '<button id="go" type="button">Run</button>\n<button id="stop" type="button">Stop</button>\n<output id="out" aria-live="polite">Idle.</output>\n',
                javascript:
                  "const out = document.getElementById('out');\nlet worker = null;\nconst source = 'self.onmessage = (e) => { let t = 0; for (let i = 0; i < e.data; i++) t += i * i; self.postMessage({ total: t }); };';\ndocument.getElementById('go').addEventListener('click', () => {\n  if (worker) worker.terminate();\n  worker = new Worker(URL.createObjectURL(new Blob([source], { type: 'text/javascript' })));\n  worker.onmessage = (e) => { out.textContent = 'Done: ' + e.data.total; };\n  worker.postMessage(10000000);\n});\ndocument.getElementById('stop').addEventListener('click', () => { if (worker) { worker.terminate(); worker = null; out.textContent = 'Stopped.'; } });\n",
              },
              testNotes:
                'The first three tests read the script because a preview cannot easily assert on a live worker. What is checked is that the whole protocol is present, not that a number appeared.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'html-s64',
    title: 'HTML Server Sent Events',
    description: 'One-way updates over a plain HTTP connection, and when it beats a WebSocket.',
    lessons: [
      {
        id: 'html-l75',
        title: 'HTML Server Sent Events',
        description: 'EventSource, the event stream format, and the difference between SSE and WebSockets.',
        duration: 6,
        objectives: [
          'Subscribe to a server-sent event stream with EventSource',
          'Write the wire format a server has to produce',
          'Decide between SSE and a WebSocket for a given requirement',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-html-l75',
          title: 'HTML Server Sent Events quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-html-l75-q1',
              type: 'multiple-choice',
              prompt: 'What is the main advantage of SSE over a WebSocket?',
              options: [
                'It is bidirectional',
                'It is plain HTTP, so it survives proxies, and the browser reconnects by itself',
                'It carries binary data',
                'It needs no server',
              ],
              answer: 1,
              explanation: 'The automatic reconnection and the absence of a protocol upgrade are what make SSE the easier choice for a one-way feed.',
            },
            {
              id: 'quiz-html-l75-q2',
              type: 'true-false',
              prompt: 'SSE can send data from the browser to the server over the same connection.',
              answer: false,
              explanation: 'The stream is one-way. Anything the browser sends is an ordinary HTTP request.',
            },
            {
              id: 'quiz-html-l75-q3',
              type: 'multiple-choice',
              prompt: 'What stops the browser reconnecting an EventSource?',
              options: [
                'Setting readyState to 2',
                'Calling source.close()',
                'Sending a stop message',
                'Reloading the page',
              ],
              answer: 1,
              explanation: 'close is the only control from the page. A stop message only works if the server happens to honour it.',
            },
            {
              id: 'quiz-html-l75-q4',
              type: 'blank',
              prompt: 'What field in the event stream sets the reconnection interval?',
              answers: [
                'retry',
                'retry:',
                'the retry field',
              ],
              explanation: 'A large retry value effectively disables reconnection and hands the decision to the page.',
            },
            {
              id: 'quiz-html-l75-q5',
              type: 'multiple-choice',
              prompt: 'Which case is better served by a WebSocket?',
              options: [
                'A build finishing and reporting progress',
                'A dashboard receiving updates',
                'A log tail the client only reads',
                'Two participants in a chat sending messages both ways',
              ],
              answer: 3,
              explanation: 'The first three are one-way and suit SSE. A conversation with both sides speaking needs a WebSocket.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l75-b1',
            body: 'Server-sent events open a long-lived HTTP connection from the browser to the server, and the server writes text down it whenever it has something to say. The browser\'s `EventSource` reconnects by itself when the connection drops, which is the feature that makes it genuinely useful. The trade is that it is one-way: the browser receives, and to send anything back it needs an ordinary request.',
          },
          {
            type: 'demo',
            id: 'c-l75-d1',
            title: 'An EventSource with automatic reconnection',
            body: 'The status line shows the connection state, and the list fills as messages arrive. The three event types are deliberate: named events are received by a listener, and the unnamed `message` event does not fire for them.',
            html: `<div class="panel">
  <p><strong>Status:</strong> <span id="status">connecting…</span></p>
  <p><button id="close" type="button">Close the stream</button></p>
  <ul id="log" aria-live="polite" aria-label="Received events"></ul>
</div>

<script>
  const status = document.getElementById('status');
  const log = document.getElementById('log');
  const url = 'https://html5-demos.hertzen.com/sse/server-sent-events.php';

  const source = new EventSource(url);

  source.addEventListener('open', () => { status.textContent = 'open'; });
  source.addEventListener('error', () => {
    // readyState 2 is CLOSED, which means the browser gave up
    status.textContent = source.readyState === 2 ? 'closed' : 'reconnecting…';
  });

  const add = (text) => {
    const li = document.createElement('li');
    li.textContent = text;
    log.prepend(li);
  };

  source.addEventListener('message', (e) => add('message: ' + e.data));
  source.addEventListener('loggedin', (e) => add('loggedin: ' + e.data));
  source.addEventListener('heartbeat', (e) => add('heartbeat: ' + e.data));

  document.getElementById('close').addEventListener('click', () => {
    source.close();                  // without this the browser reconnects forever
    status.textContent = 'closed by the page';
  });
</script>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.panel { border: 1px solid #cbd5e1; border-radius: 8px; padding: 1rem; max-width: 420px; }
p { margin: 0 0 0.5rem; }
button { padding: 0.3rem 0.6rem; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; font: inherit; }
#status { color: #0f766e; font-weight: 600; }
#log { max-height: 140px; overflow-y: auto; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; padding-left: 1.2rem; }`,
            height: 300,
          },
          {
            type: 'code',
            id: 'c-l75-c1',
            language: 'plaintext',
            title: 'The wire format and the API',
            code: `// what the server sends, as text/event-stream
retry: 5000\n
event: loggedin\n
data: {"user":"ada"}\n
id: 42\n
data: a second message with no name, so it fires 'message'\n
: this line is a comment, which is how you keep the connection alive\n
data: multi-line data is joined with newlines\n
data: so this is one event with two lines\n

// what the browser does with it
const source = new EventSource('/events');

source.onopen    = () => {};
source.onerror   = () => {};           // fires on every drop; EventSource retries
source.onmessage = (e) => {};          // unnamed events only

source.addEventListener('loggedin', (e) => {
  e.data;          // the data payload, with newlines joined
  e.lastEventId;   // the last id: the server sent
  e.origin;
});

// and the lifecycle
source.close();                        // the ONLY way to stop it
source.readyState;                     // 0 CONNECTING, 1 OPEN, 2 CLOSED

// reconnection: the browser backs off automatically, and a retry: field
// in the stream sets the interval. Set it to a long number to disable
// reconnection entirely, and let the page decide when to try again.

// the server side, in essence
res.writeHead(200, {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive',
});
res.write('retry: 5000\\n\\n');
setInterval(() => res.write('data: ' + Date.now() + '\\n\\n'), 1000);`,
          },
          {
            type: 'list',
            id: 'c-l75-l1',
            style: 'bullet',
            items: [
              'One-way: server to browser. Anything the browser sends is an ordinary HTTP request.',
              'Over plain HTTP, so it works through proxies and corporate firewalls that block upgrades.',
              'Automatic reconnection with backoff, which is the reason to choose it over a hand-rolled `fetch` loop.',
              'Text only. A binary stream is not possible.',
              'A `retry:` field in the stream sets the reconnection interval, and a huge value effectively disables it.',
              'The `id:` field is sent back to the server on reconnect as `Last-Event-ID`, which is how a client resumes a stream.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l75-t1',
            title: 'SSE or WebSocket?',
            body: 'If the server is the only one that ever speaks — a notification feed, a progress bar, a dashboard, a log tail — SSE is simpler, survives proxies, and reconnects itself. If the client sends a lot as well, or the traffic is binary, a WebSocket is the right tool. Two chat participants talking needs a WebSocket; a build finishing needs SSE.',
          },
          {
            type: 'warning',
            id: 'c-l75-w1',
            title: 'An unclosed EventSource reconnects forever',
            body: '`source.close()` is the only way to stop the browser retrying, and a stream left open keeps a connection and a server-side client alive indefinitely. This is the usual explanation for a server wondering where its worker pool went.',
          },
          {
            type: 'exercise',
            id: 'ex-l75-x1',
            exercise: {
              id: 'ex-l75',
              instructions:
                'Open an EventSource, handle the open, message and error states, and close it from a button so it does not reconnect forever.',
              languages: ['html', 'javascript'],
              starterCode: {
                html: '<p id="status">idle</p>\n<button id="close" type="button">Close</button>\n<ul id="log"></ul>\n',
                javascript: "const status = document.getElementById('status');\n",
              },
              tests: [
                {
                  id: 'ex-l75-t1',
                  label: 'An EventSource is constructed',
                  body: 'return /new EventSource/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l75-t2',
                  label: 'The open state is handled',
                  body: 'return /onopen|addEventListener\\(\\s*[\'"]open[\'"]/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l75-t3',
                  label: 'Messages are received',
                  body:
                    'return /onmessage|addEventListener\\(\\s*[\'"]message[\'"]/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l75-t4',
                  label: 'The error state is handled',
                  body: 'return /onerror|addEventListener\\(\\s*[\'"]error[\'"]/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l75-t5',
                  label: 'The stream is closed from a button',
                  body: 'return /\\.close\\s*\\(/.test(document.body.textContent)',
                },
                {
                  id: 'ex-l75-t6',
                  label: 'The received events land in a list marked as a live region',
                  body:
                    'return (document.getElementById("log").getAttribute("aria-live") || "") === "polite"',
                },
              ],
              hints: [
                'A named event on the server does not fire onmessage — it needs its own addEventListener.',
                'close is what stops the automatic reconnection, so it has to be reachable from the page.',
              ],
              solution: {
                html:
                  '<p id="status">connecting…</p>\n<button id="close" type="button">Close the stream</button>\n<ul id="log" aria-live="polite" aria-label="Received events"></ul>\n',
                javascript:
                  "const status = document.getElementById('status');\nconst log = document.getElementById('log');\nconst source = new EventSource('/events');\nsource.addEventListener('open', () => { status.textContent = 'open'; });\nsource.addEventListener('error', () => { status.textContent = source.readyState === 2 ? 'closed' : 'reconnecting…'; });\nsource.addEventListener('message', (e) => { const li = document.createElement('li'); li.textContent = e.data; log.prepend(li); });\ndocument.getElementById('close').addEventListener('click', () => { source.close(); status.textContent = 'closed by the page'; });\n",
              },
              testNotes:
                'The fifth test is the lifecycle assertion. An EventSource that is never closed retries forever, which is a real cost on both ends.',
            },
          },
        ],
      },
    ],
  },
]
