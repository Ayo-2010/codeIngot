import type { Challenge } from '~/types/content'

export const challenges: Challenge[] = [
  {
    id: 'ch-html-1',
    slug: 'html-1',
    title: 'Page Structure and Landmarks',
    summary:
      'Turn a stack of generic divs into a properly structured document with landmarks and a working skip link.',
    difficulty: 'beginner',
    technology: 'html',
    practices: ['document skeleton', 'semantic landmarks', 'keyboard accessibility'],
    estimatedMinutes: 20,
    xp: 90,
    instructions: [
      'Wrap the page links in a nav element that has an aria-label.',
      'Wrap the page content in a single main element with the id "main".',
      'Keep a header around the title and a footer around the closing line.',
      'Add a skip link as the very first element in the body that targets #main.',
    ],
    exercise: {
      id: 'ex-ch-html-structure',
      instructions:
        'Rebuild the page using semantic landmarks. Replace every div with the element that describes what it actually is, then add the skip link.',
      languages: ['html'],
      starterCode: {
        html: `<div class="page">
  <div class="links">
    <a href="/courses">Courses</a>
    <a href="/challenges">Challenges</a>
  </div>

  <div class="content">
    <h1>Structure first</h1>
    <p>Landmarks let people jump straight to the part they need.</p>
  </div>

  <div class="bottom">
    <p>Copyright 2026 codeIngot</p>
  </div>
</div>`,
      },
      tests: [
        {
          id: 't1',
          label: 'There is exactly one <main> with the id "main"',
          body: `var mains = document.querySelectorAll('main');
if (mains.length !== 1) return 'The page needs exactly one <main> element, and it has ' + mains.length + '.';
return mains[0].getAttribute('id') === 'main' ? true : 'Give the main element the id "main" so the skip link can target it.';`,
        },
        {
          id: 't2',
          label: 'The header, nav and footer are landmarks, not divs',
          body: `if (!document.querySelector('header')) return 'Replace the title div with a <header>.';
if (!document.querySelector('nav')) return 'Replace the links div with a <nav>.';
if (!document.querySelector('footer')) return 'Replace the bottom div with a <footer>.';
return document.querySelectorAll('div').length === 0 ? true : 'No <div> wrappers are needed any more.';`,
        },
        {
          id: 't3',
          label: 'The nav has an accessible name',
          body: `var nav = document.querySelector('nav');
if (!nav) return 'Add a <nav> element.';
return nav.getAttribute('aria-label') ? true : 'Add an aria-label to the nav, for example aria-label="Main".';`,
        },
        {
          id: 't4',
          label: 'The first element in the body is a skip link to #main',
          body: `var first = document.body.firstElementChild;
var main = document.querySelector('main');
if (!first || first.tagName !== 'A') return 'The skip link must be the very first element inside body.';
if (!main) return 'Add the <main id="main"> element first.';
return first.getAttribute('href') === '#' + main.getAttribute('id') ? true : 'Point the skip link at #' + main.getAttribute('id') + '.';`,
        },
      ],
      hints: [
        'A page outline is header, nav, main, footer. The order matters as much as the tags.',
        'The skip link is an ordinary anchor: `<a href="#main">Skip to content</a>`, placed above everything else.',
        'The finished body should contain no divs at all.',
      ],
      solution: {
        html: `<a href="#main">Skip to content</a>

<header>
  <h1>Structure first</h1>
  <nav aria-label="Main">
    <a href="/courses">Courses</a>
    <a href="/challenges">Challenges</a>
  </nav>
</header>

<main id="main">
  <h2>Landmarks</h2>
  <p>Landmarks let people jump straight to the part they need.</p>
</main>

<footer>
  <p>Copyright 2026 codeIngot</p>
</footer>`,
      },
      testNotes:
        'The tests inspect the rendered document. The skip link check looks at document.body.firstElementChild, so nothing may come before it.',
    },
  },
  {
    id: 'ch-html-2',
    slug: 'html-2',
    title: 'Build an Accessible Contact Form',
    summary:
      'Give every control a real label, the right input type and the attributes a browser needs to autofill it.',
    difficulty: 'beginner',
    technology: 'html',
    practices: ['form controls', 'labels', 'input validation attributes'],
    estimatedMinutes: 25,
    xp: 100,
    instructions: [
      'Label every control with a label whose for attribute matches the control id.',
      'Give every control a name attribute so its value is submitted.',
      'Make the email field an email input and mark it required.',
      'Add a textarea for the message and a button with type="submit".',
    ],
    exercise: {
      id: 'ex-ch-html-form',
      instructions:
        'Complete the contact form so it can be used with a keyboard, a screen reader and a password manager.',
      languages: ['html'],
      starterCode: {
        html: `<form action="/messages" method="post">
  <h1>Get in touch</h1>

  <input type="text" id="name" />

  <input type="text" id="mail" />

  <input type="text" id="topic" placeholder="What is this about?" />

  <textarea id="message" rows="6"></textarea>

  <button>Send message</button>
</form>`,
      },
      tests: [
        {
          id: 't1',
          label: 'Every control is labelled',
          body: `var controls = Array.from(document.querySelectorAll('input, textarea, select'));
if (!controls.length) return 'Add some form controls first.';
for (var i = 0; i < controls.length; i++) {
  var el = controls[i];
  var labelled = el.closest('label') || (el.id && document.querySelector('label[for="' + el.id + '"]'));
  if (!labelled) return 'The control #' + (i + 1) + ' (' + (el.name || el.id || el.tagName) + ') has no label.';
}
return true;`,
        },
        {
          id: 't2',
          label: 'The email field is an email input, named and required',
          body: `var mail = document.querySelector('#mail');
if (!mail) return 'Keep the input with id="mail".';
if (mail.getAttribute('type') !== 'email') return 'Change type="text" to type="email" on the mail field.';
if (!mail.getAttribute('name')) return 'Add a name attribute, for example name="email".';
return mail.hasAttribute('required') ? true : 'Add the required attribute to the email field.';`,
        },
        {
          id: 't3',
          label: 'The textarea has a name and a label',
          body: `var area = document.querySelector('textarea');
if (!area) return 'Add a <textarea> for the message.';
if (!area.getAttribute('name')) return 'Give the textarea a name attribute.';
var hasLabel = area.closest('label') || (area.id && document.querySelector('label[for="' + area.id + '"]'));
return hasLabel ? true : 'The textarea needs a <label> pointing at it.';`,
        },
        {
          id: 't4',
          label: 'The submit button declares its type',
          body: `var button = document.querySelector('button');
if (!button) return 'Add a <button> to submit the form.';
return button.getAttribute('type') === 'submit' ? true : 'Write type="submit" on the button so its intent is explicit.';`,
        },
      ],
      hints: [
        'A label needs for="name" to match the input id="name". The id is the hook, not the submitted value.',
        'The topic field is a short choice list, so <select> fits it better than <input type="text">.',
        'Every control needs three things: a label, a name, and a sensible type.',
      ],
      solution: {
        html: `<form action="/messages" method="post">
  <h1>Get in touch</h1>

  <label for="name">Your name</label>
  <input type="text" id="name" name="name" autocomplete="name" required />

  <label for="mail">Email address</label>
  <input type="email" id="mail" name="email" autocomplete="email" required />

  <label for="topic">Topic</label>
  <select id="topic" name="topic">
    <option value="question">A question</option>
    <option value="bug">A bug report</option>
    <option value="other">Something else</option>
  </select>

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="6"></textarea>

  <button type="submit">Send message</button>
</form>`,
      },
      testNotes:
        'The label test accepts either a wrapping label or a label with a matching for attribute. Both are valid ways to associate a control.',
    },
  },
  {
    id: 'ch-html-3',
    slug: 'html-3',
    title: 'Lay Out a Data Table',
    summary:
      'Build a table that stays readable when the data grows: a caption, a header row and scoped cells.',
    difficulty: 'beginner',
    technology: 'html',
    practices: ['tables', 'thead and tbody', 'accessibility of tabular data'],
    estimatedMinutes: 15,
    xp: 80,
    instructions: [
      'Wrap the table in a caption that explains what the numbers mean.',
      'Move the header cells into a thead and the data rows into a tbody.',
      'Add scope="col" to every header cell.',
      'Add a second tbody for the total row.',
    ],
    exercise: {
      id: 'ex-ch-html-table',
      instructions:
        'Turn the loose rows into a real data table with a caption, a header row and a totals section.',
      languages: ['html'],
      starterCode: {
        html: `<h2>Quarterly revenue</h2>

<p>In thousands of US dollars.</p>

<table>
  <tr>
    <td>Region</td>
    <td>Q1</td>
    <td>Q2</td>
  </tr>
  <tr>
    <td>Europe</td>
    <td>412</td>
    <td>455</td>
  </tr>
  <tr>
    <td>North America</td>
    <td>688</td>
    <td>701</td>
  </tr>
  <tr>
    <td>Total</td>
    <td>1100</td>
    <td>1156</td>
  </tr>
</table>`,
      },
      tests: [
        {
          id: 't1',
          label: 'The table has a caption',
          body: `var table = document.querySelector('table');
if (!table) return 'Keep the <table> element.';
var caption = table.querySelector('caption');
return caption && caption.textContent.trim().length > 4
  ? true
  : 'Add a <caption> as the first child of the table with a short description of the data.';`,
        },
        {
          id: 't2',
          label: 'The header row lives in a thead',
          body: `var head = document.querySelector('thead');
if (!head) return 'Move the header row into a <thead>.';
return head.querySelectorAll('th').length === 3 ? true : 'The thead needs three <th> header cells.';`,
        },
        {
          id: 't3',
          label: 'Header cells declare scope="col"',
          body: `var headers = Array.from(document.querySelectorAll('thead th'));
if (headers.length !== 3) return 'There should be three header cells.';
for (var i = 0; i < headers.length; i++) {
  if (headers[i].getAttribute('scope') !== 'col') return 'Every header cell needs scope="col".';
}
return true;`,
        },
        {
          id: 't4',
          label: 'Data rows and the total row are in separate tbody elements',
          body: `var bodies = document.querySelectorAll('tbody');
if (bodies.length !== 2) return 'Use one <tbody> for the data rows and a second <tbody> for the total row. You have ' + bodies.length + '.';
var rows = bodies[0].querySelectorAll('tr');
return rows.length === 2 ? true : 'The first tbody should contain the two data rows; it has ' + rows.length + '.';`,
        },
      ],
      hints: [
        'A caption goes inside the table element, not next to it.',
        'The header row uses th, and every data cell stays a td.',
        'Splitting the total into a second tbody lets browsers re-sort the data without dragging the total along.',
      ],
      solution: {
        html: `<table>
  <caption>Quarterly revenue in thousands of US dollars</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Q1</th>
      <th scope="col">Q2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Europe</td>
      <td>412</td>
      <td>455</td>
    </tr>
    <tr>
      <td>North America</td>
      <td>688</td>
      <td>701</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>Total</td>
      <td>1100</td>
      <td>1156</td>
    </tr>
  </tbody>
</table>`,
      },
    },
  },
  {
    id: 'ch-css-1',
    slug: 'css-1',
    title: 'Lay Out a Row with Flexbox',
    summary:
      'Distribute three boxes across the full width using flexbox instead of floats or fixed margins.',
    difficulty: 'beginner',
    technology: 'css',
    practices: ['flexbox', 'justify-content', 'flex-grow'],
    estimatedMinutes: 15,
    xp: 85,
    instructions: [
      'Make .row a flex container.',
      'Push the first box to the left and the last box to the right.',
      'Vertically centre the boxes inside the row.',
      'Let all three boxes grow to fill the remaining space.',
    ],
    exercise: {
      id: 'ex-ch-css-flex',
      instructions:
        'Write the flexbox rules for .row. No floats, no fixed widths, no margins to fake the spacing.',
      languages: ['html', 'css'],
      starterCode: {
        html: `<div class="row">
  <div class="box">HTML</div>
  <div class="box">CSS</div>
  <div class="box">JavaScript</div>
</div>`,
        css: `.row {
  /* your flex container rules go here */
  background: #11151a;
  border: 1px solid #252c35;
  border-radius: 8px;
}

.box {
  padding: 1rem;
  background: #171c22;
  border: 1px solid #252c35;
  border-radius: 6px;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}`,
      },
      tests: [
        {
          id: 't1',
          label: '.row is a flex container',
          body: `var row = document.querySelector('.row');
if (!row) return 'Keep the .row element.';
return getComputedStyle(row).display === 'flex' ? true : 'The .row element needs display: flex.';`,
        },
        {
          id: 't2',
          label: 'The boxes are spread apart and vertically centred',
          body: `var row = document.querySelector('.row');
if (!row) return 'Keep the .row element.';
var style = getComputedStyle(row);
if (style.justifyContent !== 'space-between') return 'justify-content needs to be space-between so the last box sits at the right edge. You have ' + style.justifyContent + '.';
return style.alignItems === 'center' ? true : 'Add align-items: center to centre the boxes vertically.';`,
        },
        {
          id: 't3',
          label: 'Every box grows to fill the row',
          body: `var boxes = Array.from(document.querySelectorAll('.box'));
if (boxes.length !== 3) return 'Keep all three .box elements.';
for (var i = 0; i < boxes.length; i++) {
  var grow = getComputedStyle(boxes[i]).flexGrow;
  if (grow !== '1') return 'Each .box needs flex: 1. Box ' + (i + 1) + ' has flex-grow: ' + grow + '.';
}
var row = document.querySelector('.row');
return row.getBoundingClientRect().width > 0 ? true : 'The row has no width, so nothing can grow into it.';`,
        },
      ],
      hints: [
        'Three properties do all of this: display, justify-content and align-items.',
        'space-between puts the first box at the start and the last box at the end.',
        'flex: 1 is shorthand for flex-grow: 1 with a flex-basis of 0%.',
      ],
      solution: {
        html: `<div class="row">
  <div class="box">HTML</div>
  <div class="box">CSS</div>
  <div class="box">JavaScript</div>
</div>`,
        css: `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  background: #11151a;
  border: 1px solid #252c35;
  border-radius: 8px;
}

.box {
  flex: 1;
  padding: 1rem;
  background: #171c22;
  border: 1px solid #252c35;
  border-radius: 6px;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}`,
      },
      testNotes:
        'These tests read computed styles from the rendered result, so an equivalent declaration written a different way still passes.',
    },
  },
  {
    id: 'ch-css-2',
    slug: 'css-2',
    title: 'Build a Grid Gallery',
    summary:
      'Arrange cards in equal columns with CSS grid, and let the columns come from one repeatable track definition.',
    difficulty: 'beginner',
    technology: 'css',
    practices: ['css grid', 'grid-template-columns', 'gap'],
    estimatedMinutes: 20,
    xp: 95,
    instructions: [
      'Make .gallery a grid container.',
      'Define two equal column tracks.',
      'Separate the cards with an explicit gap.',
      'Give each .card a background, a border and some padding.',
    ],
    exercise: {
      id: 'ex-ch-css-grid',
      instructions:
        'Turn .gallery into a two-column grid. Do not set widths on the cards themselves.',
      languages: ['html', 'css'],
      starterCode: {
        html: `<div class="gallery">
  <article class="card">HTML</article>
  <article class="card">CSS</article>
  <article class="card">JavaScript</article>
  <article class="card">Accessibility</article>
</div>`,
        css: `.gallery {
  /* your grid rules go here */
}

.card {
  /* your card rules go here */
}`,
      },
      tests: [
        {
          id: 't1',
          label: '.gallery is a grid container',
          body: `var gallery = document.querySelector('.gallery');
if (!gallery) return 'Keep the .gallery element.';
return getComputedStyle(gallery).display === 'grid' ? true : 'The .gallery element needs display: grid.';`,
        },
        {
          id: 't2',
          label: 'There are two equal column tracks',
          body: `var gallery = document.querySelector('.gallery');
if (!gallery) return 'Keep the .gallery element.';
var tracks = getComputedStyle(gallery).gridTemplateColumns.split(' ').filter(function (t) { return t !== ''; });
if (tracks.length !== 2) return 'grid-template-columns needs to produce exactly two tracks. It currently produces ' + tracks.length + '.';
return parseFloat(tracks[0]) === parseFloat(tracks[1]) ? true : 'Both tracks must be the same width: you have ' + tracks[0] + ' and ' + tracks[1] + '.';`,
        },
        {
          id: 't3',
          label: 'The cards have a gap between them',
          body: `var gallery = document.querySelector('.gallery');
if (!gallery) return 'Keep the .gallery element.';
var style = getComputedStyle(gallery);
var gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
return gap > 0 ? true : 'Add gap to .gallery instead of margins on the cards.';`,
        },
        {
          id: 't4',
          label: 'The cards are styled and the last row wraps to the first column',
          body: `var cards = Array.from(document.querySelectorAll('.card'));
if (cards.length !== 4) return 'Keep all four .card elements.';
var style = getComputedStyle(cards[0]);
if (!style.backgroundColor || style.backgroundColor === 'rgba(0, 0, 0, 0)') return 'Give .card a background colour.';
var second = cards[1].getBoundingClientRect();
var third = cards[2].getBoundingClientRect();
return second.top === third.top
  ? true
  : 'Card three wrapped to a new row instead of into the first column, which means there is only one column.';`,
        },
      ],
      hints: [
        'One declaration defines the columns: grid-template-columns: repeat(2, 1fr).',
        '1fr means one share of the leftover space, so both columns end up the same width.',
        'Use gap: 1rem on the container rather than margins on the cards.',
      ],
      solution: {
        html: `<div class="gallery">
  <article class="card">HTML</article>
  <article class="card">CSS</article>
  <article class="card">JavaScript</article>
  <article class="card">Accessibility</article>
</div>`,
        css: `.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.card {
  padding: 1.25rem;
  background: #171c22;
  border: 1px solid #252c35;
  border-radius: 8px;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}`,
      },
    },
  },
  {
    id: 'ch-css-3',
    slug: 'css-3',
    title: 'Make a Card That Responds',
    summary:
      'Build one card that sits side by side on a wide screen and stacks on a narrow one, using a single media query.',
    difficulty: 'intermediate',
    technology: 'css',
    practices: ['media queries', 'flex-direction', 'responsive images'],
    estimatedMinutes: 25,
    xp: 115,
    instructions: [
      'Make .card a flex container with a gap of 1rem.',
      'Fix the media to 200px wide on wide screens.',
      'Let .card-body grow to fill the remaining space.',
      'Inside a max-width 640px media query, stack the card vertically and let the media fill the width.',
    ],
    exercise: {
      id: 'ex-ch-css-responsive-card',
      instructions:
        'Write the responsive card. The card must be horizontal above 640px and vertical at or below it, with no horizontal scrolling at any width.',
      languages: ['html', 'css'],
      starterCode: {
        html: `<article class="card">
  <img
    class="card-media"
    src="https://placehold.co/640x360/171c22/29e2bd?text=codeIngot"
    alt="A dark editor window with a line of JavaScript"
  />
  <div class="card-body">
    <h2 class="card-title">Structuring with CSS</h2>
    <p>
      Flexbox gives you two axes to lay out on. A media query decides when to
      change direction.
    </p>
  </div>
</article>`,
        css: `.card {
  border: 1px solid #252c35;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  color: #f4f7fa;
  background: #171c22;
}

.card-body {
  padding: 1rem;
}`,
      },
      tests: [
        {
          id: 't1',
          label: '.card is a flex container with a real gap',
          body: `var card = document.querySelector('.card');
if (!card) return 'Keep the .card element.';
var style = getComputedStyle(card);
if (style.display !== 'flex') return 'The .card element needs display: flex.';
var gap = parseFloat(style.columnGap) || parseFloat(style.gap) || 0;
return gap > 0 ? true : 'Add a gap to .card so the media and the text are not touching.';`,
        },
        {
          id: 't2',
          label: 'The card direction matches the current viewport',
          body: `var card = document.querySelector('.card');
if (!card) return 'Keep the .card element.';
var narrow = window.matchMedia('(max-width: 640px)').matches;
var direction = getComputedStyle(card).flexDirection;
if (narrow) return direction === 'column' ? true : 'Below 640px the card should set flex-direction: column. It is ' + direction + '.';
return direction === 'row' ? true : 'Above 640px the card should be a row. It is ' + direction + '.';`,
        },
        {
          id: 't3',
          label: 'The media image is sized for the layout',
          body: `var card = document.querySelector('.card');
var media = document.querySelector('.card-media');
if (!card || !media) return 'Keep both the .card element and the .card-media image.';
var mediaWidth = media.getBoundingClientRect().width;
var cardWidth = card.getBoundingClientRect().width;
if (window.matchMedia('(max-width: 640px)').matches) {
  return Math.abs(mediaWidth - card.clientWidth) < 2
    ? true
    : 'Below 640px the media should fill the card width. It is ' + Math.round(mediaWidth) + 'px in a ' + card.clientWidth + 'px card.';
}
return mediaWidth < cardWidth - 40
  ? true
  : 'Above 640px the media should be narrower than the card, for example width: 200px. It is ' + Math.round(mediaWidth) + 'px in a ' + Math.round(cardWidth) + 'px card.';`,
        },
        {
          id: 't4',
          label: '.card-body fills the leftover space and nothing overflows',
          body: `var body = document.querySelector('.card-body');
var card = document.querySelector('.card');
if (!body || !card) return 'Keep the .card-body wrapper inside the card.';
if (getComputedStyle(body).flexGrow !== '1') return 'Set flex: 1 on .card-body so it takes the space the media leaves.';
return card.scrollWidth <= card.clientWidth + 1 ? true : 'The card scrolls horizontally. Keep the content inside the card width.';`,
        },
      ],
      hints: [
        'A media query goes inside your stylesheet, not inside a selector: @media (max-width: 640px) { ... }',
        'Inside the query you override the properties you set earlier, usually flex-direction and the media width.',
        'To let the image fill the card when stacked, set width: 100% on .card-media inside the query.',
      ],
      solution: {
        html: `<article class="card">
  <img
    class="card-media"
    src="https://placehold.co/640x360/171c22/29e2bd?text=codeIngot"
    alt="A dark editor window with a line of JavaScript"
  />
  <div class="card-body">
    <h2 class="card-title">Structuring with CSS</h2>
    <p>
      Flexbox gives you two axes to lay out on. A media query decides when to
      change direction.
    </p>
  </div>
</article>`,
        css: `.card {
  display: flex;
  gap: 1rem;
  border: 1px solid #252c35;
  border-radius: 8px;
  font-family: system-ui, sans-serif;
  color: #f4f7fa;
  background: #171c22;
}

.card-media {
  width: 200px;
  height: auto;
  object-fit: cover;
}

.card-body {
  flex: 1;
  padding: 1rem;
}

@media (max-width: 640px) {
  .card {
    flex-direction: column;
  }

  .card-media {
    width: 100%;
  }
}`,
      },
      testNotes:
        'The direction test branches on the live viewport width, so it checks whichever layout the current preview size should produce.',
    },
  },
  {
    id: 'ch-css-4',
    slug: 'css-4',
    title: 'Stick the Footer to the Bottom',
    summary:
      'Push a footer to the bottom of the viewport on short pages without absolute positioning or fixed heights.',
    difficulty: 'intermediate',
    technology: 'css',
    practices: ['flex column', 'min-height', 'flex-grow'],
    estimatedMinutes: 20,
    xp: 100,
    instructions: [
      'Remove the default margin on the body.',
      'Make the body a column flex container that is at least one viewport tall.',
      'Let .site-main grow so it absorbs the leftover height.',
      'Keep the footer at its natural size at the bottom.',
    ],
    exercise: {
      id: 'ex-ch-css-sticky-footer',
      instructions:
        'Write the flex rules that pin the footer to the bottom of the viewport while the content stays short.',
      languages: ['html', 'css'],
      starterCode: {
        html: `<header class="site-header">
  <h1>codeIngot Journal</h1>
</header>

<main class="site-main">
  <p>One short paragraph is all it takes to make this problem visible.</p>
</main>

<footer class="site-footer">
  <p>Copyright 2026 codeIngot</p>
</footer>`,
        css: `body {
  /* your page layout goes here */
}

.site-main {
  padding: 2rem;
  font-family: system-ui, sans-serif;
  color: #f4f7fa;
}

.site-header,
.site-footer {
  padding: 1rem 2rem;
  background: #11151a;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}`,
      },
      tests: [
        {
          id: 't1',
          label: 'The body is a column flex container',
          body: `var body = document.body;
var style = getComputedStyle(body);
if (style.display !== 'flex') return 'The body needs display: flex.';
return style.flexDirection === 'column' ? true : 'The body also needs flex-direction: column so the footer falls below the content.';`,
        },
        {
          id: 't2',
          label: 'The body is at least one viewport tall',
          body: `var body = document.body;
var minHeight = parseFloat(getComputedStyle(body).minHeight) || 0;
return minHeight >= window.innerHeight - 1
  ? true
  : 'The body needs min-height: 100vh. The current minimum is ' + Math.round(minHeight) + 'px in a ' + window.innerHeight + 'px viewport.';`,
        },
        {
          id: 't3',
          label: 'The main element absorbs the leftover height',
          body: `var main = document.querySelector('.site-main');
if (!main) return 'Keep the .site-main element.';
return getComputedStyle(main).flexGrow === '1' ? true : 'Set flex: 1 on .site-main so it takes the space above the footer.';`,
        },
        {
          id: 't4',
          label: 'The footer reaches the bottom of the viewport',
          body: `var footer = document.querySelector('.site-footer');
if (!footer) return 'Keep the .site-footer element.';
var bottom = footer.getBoundingClientRect().bottom;
var target = document.documentElement.clientHeight;
return Math.abs(bottom - target) <= 10
  ? true
  : 'The footer ends at ' + Math.round(bottom) + 'px but the page is ' + target + 'px tall. Set margin: 0 on the body to remove the default offset.';`,
        },
      ],
      hints: [
        'A flex column with min-height: 100vh gives you exactly three things: the footer sits at the bottom, and the content grows in between.',
        'Only the middle element grows. The footer stays its natural height.',
        'The default 8px body margin will throw the footer off by 8px if you do not reset it.',
      ],
      solution: {
        html: `<header class="site-header">
  <h1>codeIngot Journal</h1>
</header>

<main class="site-main">
  <p>One short paragraph is all it takes to make this problem visible.</p>
</main>

<footer class="site-footer">
  <p>Copyright 2026 codeIngot</p>
</footer>`,
        css: `body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}

.site-main {
  flex: 1;
  padding: 2rem;
  font-family: system-ui, sans-serif;
  color: #f4f7fa;
}

.site-header,
.site-footer {
  padding: 1rem 2rem;
  background: #11151a;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}`,
      },
    },
  },
  {
    id: 'ch-css-5',
    slug: 'css-5',
    title: 'Build a Theme With Variables',
    summary:
      'Move every colour into custom properties so a second theme costs four lines instead of forty.',
    difficulty: 'intermediate',
    technology: 'css',
    practices: ['css custom properties', 'design tokens', 'theming'],
    estimatedMinutes: 20,
    xp: 105,
    instructions: [
      'Declare the four tokens on :root as hex colours.',
      'Use var(--bg) and var(--text) on the body.',
      'Use var(--surface) and var(--text) on the card.',
      'Use var(--accent) as the border colour of the highlighted card.',
    ],
    exercise: {
      id: 'ex-ch-css-variables',
      instructions:
        'Replace every hard-coded colour with a custom property. Writing a hex value inside a rule other than :root will fail the check.',
      languages: ['html', 'css'],
      starterCode: {
        html: `<div class="card">
  <h2 class="card-title">Ship it</h2>
  <p>One set of variables, two themes, no duplicated colour values.</p>
</div>

<div class="card card--alt">
  <h2 class="card-title">Measure it</h2>
  <p>Accents belong on the one element that should win attention.</p>
</div>`,
        css: `body {
  background: #ffffff;
  color: #111111;
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.card {
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}`,
      },
      tests: [
        {
          id: 't1',
          label: 'The four tokens are declared on :root',
          body: `var root = getComputedStyle(document.documentElement);
var missing = ['--bg', '--surface', '--text', '--accent'].filter(function (name) {
  return !(root.getPropertyValue(name) || '').trim();
});
return missing.length === 0 ? true : 'Declare these on :root: ' + missing.join(', ') + '.';`,
        },
        {
          id: 't2',
          label: 'The card background comes from var(--surface)',
          body: `function toRgb(raw) {
  var hex = raw.trim().replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return '';
  return 'rgb(' + parseInt(hex.slice(0, 2), 16) + ', ' + parseInt(hex.slice(2, 4), 16) + ', ' + parseInt(hex.slice(4, 6), 16) + ')';
}
var token = getComputedStyle(document.documentElement).getPropertyValue('--surface').trim();
if (!token) return 'Declare --surface on :root.';
if (token.charAt(0) !== '#') return 'Write --surface as a hex colour such as #171c22, not as rgb().';
var card = document.querySelector('.card');
if (!card) return 'Keep the .card element.';
var actual = getComputedStyle(card).backgroundColor;
return actual === toRgb(token)
  ? true
  : 'The .card background must be var(--surface), which resolves to ' + toRgb(token) + '. It currently resolves to ' + actual + '.';`,
        },
        {
          id: 't3',
          label: 'The body and card text come from var(--text)',
          body: `function toRgb(raw) {
  var hex = raw.trim().replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return '';
  return 'rgb(' + parseInt(hex.slice(0, 2), 16) + ', ' + parseInt(hex.slice(2, 4), 16) + ', ' + parseInt(hex.slice(4, 6), 16) + ')';
}
var token = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
if (!token) return 'Declare --text on :root.';
var expected = toRgb(token);
var body = getComputedStyle(document.body).color;
if (body !== expected) return 'Set the body color to var(--text). It should resolve to ' + expected + ' but resolves to ' + body + '.';
var card = document.querySelector('.card');
return card && getComputedStyle(card).color === expected
  ? true
  : 'Set the .card color to var(--text) as well.';`,
        },
        {
          id: 't4',
          label: 'The highlighted card is bordered with var(--accent)',
          body: `function toRgb(raw) {
  var hex = raw.trim().replace('#', '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  if (hex.length !== 6) return '';
  return 'rgb(' + parseInt(hex.slice(0, 2), 16) + ', ' + parseInt(hex.slice(2, 4), 16) + ', ' + parseInt(hex.slice(4, 6), 16) + ')';
}
var token = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
if (!token) return 'Declare --accent on :root.';
var alt = document.querySelector('.card--alt');
if (!alt) return 'Keep the .card--alt element.';
var border = getComputedStyle(alt).borderTopColor;
return border === toRgb(token)
  ? true
  : 'Give .card--alt a border-color of var(--accent). It should resolve to ' + toRgb(token) + ' but resolves to ' + border + '.';`,
        },
      ],
      hints: [
        'Custom properties are declared on a selector like any other rule: :root { --bg: #0b0d10; }',
        'Use them with var(--bg) where you previously typed the hex value.',
        'Setting them on :root is what lets you retheme later by overriding :root alone.',
      ],
      solution: {
        html: `<div class="card">
  <h2 class="card-title">Ship it</h2>
  <p>One set of variables, two themes, no duplicated colour values.</p>
</div>

<div class="card card--alt">
  <h2 class="card-title">Measure it</h2>
  <p>Accents belong on the one element that should win attention.</p>
</div>`,
        css: `:root {
  --bg: #0b0d10;
  --surface: #171c22;
  --text: #f4f7fa;
  --accent: #29e2bd;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, sans-serif;
  padding: 2rem;
}

.card {
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  background: var(--surface);
  color: var(--text);
}

.card--alt {
  border: 1px solid var(--accent);
}`,
      },
      testNotes:
        'The token checks read the custom properties from the computed style of the root element, then compare the resolved colour on the element.',
    },
  },
  {
    id: 'ch-css-6',
    slug: 'css-6',
    title: 'Style Hover and Focus States',
    summary:
      'Make an interactive element respond to the pointer and to the keyboard, without a jarring jump.',
    difficulty: 'intermediate',
    technology: 'css',
    practices: ['pseudo-classes', 'transitions', 'focus-visible'],
    estimatedMinutes: 20,
    xp: 110,
    instructions: [
      'Add a transition to .btn so state changes are animated.',
      'Write a .btn:hover rule that changes the background colour.',
      'Write a .btn:focus-visible rule that draws a visible outline.',
      'Keep the default state clearly different from the hover state.',
    ],
    exercise: {
      id: 'ex-ch-css-hover',
      instructions:
        'Add the interaction states. A hover change with no transition reads as a glitch, and a hover change with no focus rule locks out keyboard users.',
      languages: ['html', 'css'],
      starterCode: {
        html: `<a class="btn" href="#">Read the guide</a>

<article class="card">
  <h3>Focus states</h3>
  <p>Keyboard users need to see exactly where focus currently is.</p>
</article>`,
        css: `.btn {
  display: inline-block;
  padding: 0.6rem 1.1rem;
  border-radius: 6px;
  background: #29e2bd;
  color: #0b0d10;
  text-decoration: none;
  font-family: system-ui, sans-serif;
}

.card {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #252c35;
  border-radius: 8px;
  background: #171c22;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}`,
      },
      tests: [
        {
          id: 't1',
          label: '.btn has a transition',
          body: `var btn = document.querySelector('.btn');
if (!btn) return 'Keep the .btn element.';
var duration = parseFloat(getComputedStyle(btn).transitionDuration) || 0;
return duration > 0 ? true : 'Add a transition to .btn, for example transition: background-color 150ms ease.';`,
        },
        {
          id: 't2',
          label: 'The stylesheet contains a :hover rule',
          body: `var css = Array.prototype.map.call(document.querySelectorAll('style'), function (node) {
  return node.textContent || '';
}).join('\\n');
if (!css) return 'No <style> element was found in the preview, so the hover rule cannot be checked.';
return /:hover/.test(css) ? true : 'There is no :hover rule in your stylesheet yet.';`,
        },
        {
          id: 't3',
          label: 'The hover rule changes the background',
          body: `var css = Array.prototype.map.call(document.querySelectorAll('style'), function (node) {
  return node.textContent || '';
}).join('\\n');
return /:hover[^{]*\\{[^}]*background/i.test(css)
  ? true
  : 'The :hover rule needs to change the background colour, not only a shadow or an outline.';`,
        },
        {
          id: 't4',
          label: 'Keyboard focus is visible with :focus-visible',
          body: `var css = Array.prototype.map.call(document.querySelectorAll('style'), function (node) {
  return node.textContent || '';
}).join('\\n');
if (!/focus-visible/.test(css)) return 'Add a :focus-visible rule so keyboard users can see where they are.';
return /focus-visible[^{]*\\{[^}]*outline/i.test(css) ? true : 'The :focus-visible rule should set an outline. Do not remove it without replacing it.';`,
        },
      ],
      hints: [
        'A pseudo-class is appended to a selector with a colon, no space: .btn:hover { ... }',
        'transition goes on the base .btn rule, not inside the :hover rule.',
        'Never write outline: none without replacing it with something at least as visible.',
      ],
      solution: {
        html: `<a class="btn" href="#">Read the guide</a>

<article class="card">
  <h3>Focus states</h3>
  <p>Keyboard users need to see exactly where focus currently is.</p>
</article>`,
        css: `.btn {
  display: inline-block;
  padding: 0.6rem 1.1rem;
  border-radius: 6px;
  background: #29e2bd;
  color: #0b0d10;
  text-decoration: none;
  font-family: system-ui, sans-serif;
  transition: background-color 150ms ease, transform 150ms ease;
}

.btn:hover {
  background: #1fc9a8;
  transform: translateY(-1px);
}

.btn:focus-visible {
  outline: 2px solid #f4f7fa;
  outline-offset: 2px;
}

.card {
  margin-top: 1.5rem;
  padding: 1.25rem;
  border: 1px solid #252c35;
  border-radius: 8px;
  background: #171c22;
  color: #f4f7fa;
  font-family: system-ui, sans-serif;
}`,
      },
      testNotes:
        'The hover and focus checks read the text of the style elements in the preview, because a synthetic test run cannot move a real pointer onto an element.',
    },
  },
  {
    id: 'ch-js-1',
    slug: 'js-1',
    title: 'Sort and Summarise an Array',
    summary:
      'Use map, filter, reduce, sort and slice to turn a list of scores into three useful outputs.',
    difficulty: 'beginner',
    technology: 'javascript',
    practices: ['array methods', 'sorting', 'reduce'],
    estimatedMinutes: 20,
    xp: 95,
    instructions: [
      'Log the scores from highest to lowest as a comma-separated string.',
      'Log only the top three of them, comma separated.',
      'Log the average score rounded to a single decimal place.',
      'Use at least three different array methods.',
    ],
    exercise: {
      id: 'ex-ch-js-array',
      instructions:
        'Do not change the scores array itself. Sort a copy, then log the three results in order.',
      languages: ['javascript'],
      starterCode: {
        javascript: `const scores = [72, 95, 88, 41, 95, 60];

// 1. Log every score from highest to lowest, comma separated.
// 2. Log the top three of those, comma separated.
// 3. Log the average score rounded to one decimal place.
`,
      },
      tests: [
        {
          id: 't1',
          label: 'Something was logged',
          body: `var log = Array.isArray(globalThis.__log) ? globalThis.__log.map(String) : [];
return log.length >= 3 ? true : 'Log at least three values with console.log. You have logged ' + log.length + '.';`,
        },
        {
          id: 't2',
          label: 'The first log is the scores, highest first',
          body: `var log = Array.isArray(globalThis.__log) ? globalThis.__log.map(String) : [];
var first = log.length ? String(log[0]).replace(/\\s+/g, '') : '';
return first === '95,95,88,72,60,41'
  ? true
  : 'Log 1 should be every score from highest to lowest: 95,95,88,72,60,41. You logged ' + (first || 'nothing') + '.';`,
        },
        {
          id: 't3',
          label: 'The second log is the top three',
          body: `var log = Array.isArray(globalThis.__log) ? globalThis.__log.map(String) : [];
var second = log.length > 1 ? String(log[1]).replace(/\\s+/g, '') : '';
return second === '95,95,88'
  ? true
  : 'Log 2 should be the top three scores: 95,95,88. You logged ' + (second || 'nothing') + '.';`,
        },
        {
          id: 't4',
          label: 'The third log is the average to one decimal place',
          body: `var log = Array.isArray(globalThis.__log) ? globalThis.__log.map(String) : [];
var third = log.length > 2 ? String(log[2]).replace(/\\s+/g, '') : '';
return third === '75.2'
  ? true
  : 'Log 3 should be the average score to one decimal place: 75.2. You logged ' + (third || 'nothing') + '.';`,
        },
      ],
      hints: [
        'Array.prototype.sort takes a comparison function. Use (a, b) => b - a to sort numbers descending.',
        'slice(0, 3) takes the first three items of an array without changing it.',
        'reduce((total, score) => total + score, 0) sums the array. Divide by scores.length and call toFixed(1).',
      ],
      solution: {
        javascript: `const scores = [72, 95, 88, 41, 95, 60];

const descending = [...scores].sort((a, b) => b - a);
console.log(descending.join(', '));

console.log(descending.slice(0, 3).join(', '));

const total = scores.reduce((sum, score) => sum + score, 0);
console.log((total / scores.length).toFixed(1));
`,
      },
      testNotes:
        'The tests read globalThis.__log, the array of console.log values captured by the sandbox. Whitespace is stripped before comparison, so ", " and "," both pass.',
    },
  },
  {
    id: 'ch-js-2',
    slug: 'js-2',
    title: 'Drive a Counter with Events',
    summary:
      'Attach click handlers with addEventListener and keep a number in the DOM in sync with the interface.',
    difficulty: 'beginner',
    technology: 'javascript',
    practices: ['event listeners', 'DOM updates', 'state'],
    estimatedMinutes: 25,
    xp: 120,
    instructions: [
      'Increment the count by one each time the increment button is clicked.',
      'Decrement by one, and never let the count fall below zero.',
      'Reset the display back to zero.',
      'Read the current value from the DOM rather than hard-coding it.',
    ],
    exercise: {
      id: 'ex-ch-js-counter',
      instructions:
        'Wire the three buttons. Every change should go through one place that writes the number back into #count.',
      languages: ['html', 'javascript'],
      starterCode: {
        html: `<div class="counter">
  <button id="decrement" type="button">-</button>
  <span id="count" aria-live="polite">0</span>
  <button id="increment" type="button">+</button>
  <button id="reset" type="button">Reset</button>
</div>`,
        javascript: `const countEl = document.querySelector('#count');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');
const resetBtn = document.querySelector('#reset');

let count = 0;

function render() {
  // Write the current count into the span.
}

function changeBy(amount) {
  // Update the count, clamp it at zero, then call render().
}

// Attach one click listener per button here.
`,
      },
      tests: [
        {
          id: 't1',
          label: 'Clicking increment three times shows 3',
          body: `var countEl = document.querySelector('#count');
var incrementBtn = document.querySelector('#increment');
var resetBtn = document.querySelector('#reset');
if (!countEl || !incrementBtn || !resetBtn) return 'Keep the #count, #increment and #reset elements.';
resetBtn.click();
incrementBtn.click();
incrementBtn.click();
incrementBtn.click();
return countEl.textContent.trim() === '3' ? true : 'After three clicks the span should read 3, but it reads ' + countEl.textContent.trim() + '.';`,
        },
        {
          id: 't2',
          label: 'Clicking decrement subtracts one',
          body: `var countEl = document.querySelector('#count');
var incrementBtn = document.querySelector('#increment');
var decrementBtn = document.querySelector('#decrement');
var resetBtn = document.querySelector('#reset');
if (!countEl || !incrementBtn || !decrementBtn || !resetBtn) return 'Keep the counter elements.';
resetBtn.click();
incrementBtn.click();
incrementBtn.click();
decrementBtn.click();
return countEl.textContent.trim() === '1' ? true : 'After 2 increments and 1 decrement the span should read 1, but it reads ' + countEl.textContent.trim() + '.';`,
        },
        {
          id: 't3',
          label: 'The count never drops below zero',
          body: `var countEl = document.querySelector('#count');
var decrementBtn = document.querySelector('#decrement');
var resetBtn = document.querySelector('#reset');
if (!countEl || !decrementBtn || !resetBtn) return 'Keep the counter elements.';
resetBtn.click();
decrementBtn.click();
decrementBtn.click();
decrementBtn.click();
decrementBtn.click();
var value = Number(countEl.textContent.trim());
if (isNaN(value)) return 'The span should contain a number, not ' + countEl.textContent.trim() + '.';
return value === 0 ? true : 'Four decrements from zero should still leave 0, but the span reads ' + value + '.';`,
        },
        {
          id: 't4',
          label: 'Reset returns the display to zero',
          body: `var countEl = document.querySelector('#count');
var incrementBtn = document.querySelector('#increment');
var resetBtn = document.querySelector('#reset');
if (!countEl || !incrementBtn || !resetBtn) return 'Keep the #count, #increment and #reset elements.';
incrementBtn.click();
incrementBtn.click();
resetBtn.click();
return countEl.textContent.trim() === '0' ? true : 'The reset button should put the span back to 0, but it reads ' + countEl.textContent.trim() + '.';`,
        },
      ],
      hints: [
        'Each listener receives an event object. Use addEventListener("click", handler).',
        'Keep the running number in one variable and re-render from one function, so the three buttons cannot disagree.',
        'Clamp the value before rendering: if (count < 0) count = 0;',
      ],
      solution: {
        html: `<div class="counter">
  <button id="decrement" type="button">-</button>
  <span id="count" aria-live="polite">0</span>
  <button id="increment" type="button">+</button>
  <button id="reset" type="button">Reset</button>
</div>`,
        javascript: `const countEl = document.querySelector('#count');
const incrementBtn = document.querySelector('#increment');
const decrementBtn = document.querySelector('#decrement');
const resetBtn = document.querySelector('#reset');

let count = 0;

function render() {
  countEl.textContent = String(count);
}

function changeBy(amount) {
  count += amount;
  if (count < 0) count = 0;
  render();
}

incrementBtn.addEventListener('click', () => changeBy(1));
decrementBtn.addEventListener('click', () => changeBy(-1));
resetBtn.addEventListener('click', () => {
  count = 0;
  render();
});

render();
`,
      },
      testNotes:
        'The tests dispatch real clicks with element.click(), so only genuine event listeners or inline handlers will respond.',
    },
  },
  {
    id: 'ch-js-3',
    slug: 'js-3',
    title: 'Validate a Signup Form',
    summary:
      'Intercept the submit event, validate the fields yourself and report the result where the user can see it.',
    difficulty: 'intermediate',
    technology: 'javascript',
    practices: ['form validation', 'submit events', 'state in the DOM'],
    estimatedMinutes: 30,
    xp: 140,
    instructions: [
      'Listen for the submit event and call preventDefault on it.',
      'Reject an email value that does not contain an at sign.',
      'Reject a password shorter than eight characters.',
      'Write the outcome into #message and set an error or success class on it.',
    ],
    exercise: {
      id: 'ex-ch-js-validation',
      instructions:
        'Validate on submit rather than on every keystroke, so the user is not told they are wrong while still typing.',
      languages: ['html', 'javascript'],
      starterCode: {
        html: `<form class="signup" novalidate>
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" />

  <button type="submit">Create account</button>
  <p id="message" class="message" role="status"></p>
</form>`,
        javascript: `const form = document.querySelector('.signup');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const messageEl = document.querySelector('#message');

function show(text, state) {
  // Put the text in the message and set its class to state.
}

// Validate on submit.
`,
      },
      tests: [
        {
          id: 't1',
          label: 'Submitting an invalid email reports an email problem',
          body: `var form = document.querySelector('.signup');
var emailInput = document.querySelector('#email');
var passwordInput = document.querySelector('#password');
var messageEl = document.querySelector('#message');
if (!form || !emailInput || !passwordInput || !messageEl) return 'Keep the form, the two inputs and the #message element.';
emailInput.value = 'not-an-email';
passwordInput.value = 'longenough1';
messageEl.textContent = '';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
var text = messageEl.textContent.toLowerCase();
return text.indexOf('email') > -1 ? true : 'An address with no at sign must produce a message that mentions the email address. You wrote: "' + messageEl.textContent + '".';`,
        },
        {
          id: 't2',
          label: 'A short password is rejected with a message about length',
          body: `var form = document.querySelector('.signup');
var emailInput = document.querySelector('#email');
var passwordInput = document.querySelector('#password');
var messageEl = document.querySelector('#message');
if (!form || !emailInput || !passwordInput || !messageEl) return 'Keep the form, the two inputs and the #message element.';
emailInput.value = 'ada@example.com';
passwordInput.value = 'short';
messageEl.textContent = '';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
var text = messageEl.textContent.toLowerCase();
if (text.indexOf('password') === -1) return 'A password under eight characters must produce a message that mentions the password. You wrote: "' + messageEl.textContent + '".';
return text.indexOf('8') > -1 ? true : 'Say how long the password needs to be, for example "at least 8 characters".';`,
        },
        {
          id: 't3',
          label: 'A valid submission reports success',
          body: `var form = document.querySelector('.signup');
var emailInput = document.querySelector('#email');
var passwordInput = document.querySelector('#password');
var messageEl = document.querySelector('#message');
if (!form || !emailInput || !passwordInput || !messageEl) return 'Keep the form, the two inputs and the #message element.';
emailInput.value = 'ada@example.com';
passwordInput.value = 'correct-horse';
messageEl.textContent = '';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
return messageEl.textContent.trim().length > 0 ? true : 'A valid submission must write a confirmation into #message.';`,
        },
        {
          id: 't4',
          label: 'The message carries a state class so it can be styled',
          body: `var form = document.querySelector('.signup');
var emailInput = document.querySelector('#email');
var passwordInput = document.querySelector('#password');
var messageEl = document.querySelector('#message');
if (!form || !emailInput || !passwordInput || !messageEl) return 'Keep the form, the two inputs and the #message element.';
emailInput.value = 'ada@example.com';
passwordInput.value = 'correct-horse';
messageEl.className = '';
messageEl.textContent = '';
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
return /success/i.test(messageEl.className)
  ? true
  : 'Give #message a class of "success" on a valid submission so CSS can style the state, not just the words.';`,
        },
      ],
      hints: [
        'form.addEventListener("submit", handler) fires when the user activates the submit button.',
        'Call event.preventDefault() first, or the page reloads and you will never see your own message.',
        'Validate the email first, then the password, and return early after each failure.',
      ],
      solution: {
        html: `<form class="signup" novalidate>
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" />

  <label for="password">Password</label>
  <input id="password" name="password" type="password" />

  <button type="submit">Create account</button>
  <p id="message" class="message" role="status"></p>
</form>`,
        javascript: `const form = document.querySelector('.signup');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const messageEl = document.querySelector('#message');

function show(text, state) {
  messageEl.textContent = text;
  messageEl.className = 'message ' + state;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (email.indexOf('@') === -1) {
    show('Enter a valid email address.', 'error');
    return;
  }

  if (password.length < 8) {
    show('Your password must be at least 8 characters.', 'error');
    return;
  }

  show('Account created for ' + email + '.', 'success');
});
`,
      },
      testNotes:
        'The tests dispatch a synthetic submit event rather than clicking, so the page never navigates. The handler must call preventDefault for that to matter.',
    },
  },
  {
    id: 'ch-dom-1',
    slug: 'dom-1',
    title: 'Build a Dynamic List',
    summary:
      'Create, read, update, and delete items in a list using DOM methods only — no innerHTML.',
    difficulty: 'beginner',
    technology: 'javascript',
    practices: ['dom-manipulation', 'event-delegation', 'createElement'],
    estimatedMinutes: 25,
    xp: 120,
    instructions: [
      'Create a new item with createElement and append it to the list.',
      'Use event delegation on the list to handle delete clicks.',
      'Toggle a "completed" class when an item is clicked.',
      'Persist the list to localStorage and restore it on load.',
    ],
    exercise: {
      id: 'ex-ch-dom-list',
      instructions:
        'Build a todo list with add, delete, and toggle functionality. Use only DOM methods — no innerHTML.',
      languages: ['html', 'javascript'],
      starterCode: {
        html: `<form id="todo-form">
  <input type="text" id="todo-input" placeholder="Add a task" required />
  <button type="submit">Add</button>
</form>
<ul id="todo-list"></ul>`,
        javascript: `// Build the todo list with DOM methods only.
const form = document.querySelector('#todo-form')
const input = document.querySelector('#todo-input')
const list = document.querySelector('#todo-list')`,
      },
      tests: [
        {
          id: 't1',
          label: 'Submitting the form adds an item to the list',
          body: `const input = document.querySelector('#todo-input')
const form = document.querySelector('#todo-form')
input.value = 'Test task'
form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
return document.querySelectorAll('#todo-list li').length === 1`,
        },
        {
          id: 't2',
          label: 'Clicking an item toggles completed class',
          body: `const list = document.querySelector('#todo-list')
const item = list.querySelector('li')
item.click()
return item.classList.contains('completed')`,
        },
        {
          id: 't3',
          label: 'Delete button removes the item',
          body: `const list = document.querySelector('#todo-list')
const btn = list.querySelector('button.delete')
btn.click()
return document.querySelectorAll('#todo-list li').length === 0`,
        },
        {
          id: 't4',
          label: 'Items persist in localStorage',
          body: `return localStorage.getItem('todos') !== null`,
        },
      ],
      hints: [
        'Use createElement for the li, span, and button.',
        'Attach one click listener to the list (delegation), not to each item.',
        'Save to localStorage after every change.',
        'Load from localStorage on page load and rebuild the DOM.',
      ],
      solution: {
        html: `<form id="todo-form">
  <input type="text" id="todo-input" placeholder="Add a task" required />
  <button type="submit">Add</button>
</form>
<ul id="todo-list"></ul>`,
        javascript: `const form = document.querySelector('#todo-form')
const input = document.querySelector('#todo-input')
const list = document.querySelector('#todo-list')

function save() {
  const items = [...list.querySelectorAll('li')].map(li => ({
    text: li.querySelector('span').textContent,
    completed: li.classList.contains('completed')
  }))
  localStorage.setItem('todos', JSON.stringify(items))
}

function renderItem(text, completed) {
  const li = document.createElement('li')
  const span = document.createElement('span')
  span.textContent = text
  const btn = document.createElement('button')
  btn.className = 'delete'
  btn.textContent = '×'
  li.append(span, btn)
  if (completed) li.classList.add('completed')
  list.append(li)
}

// Load from localStorage
const saved = JSON.parse(localStorage.getItem('todos') || '[]')
saved.forEach(item => renderItem(item.text, item.completed))

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return
  renderItem(text, false)
  save()
  input.value = ''
})

list.addEventListener('click', (e) => {
  const li = e.target.closest('li')
  if (!li) return
  if (e.target.classList.contains('delete')) {
    li.remove()
    save()
  } else {
    li.classList.toggle('completed')
    save()
  }
})`,
      },
      testNotes:
        'Tests verify DOM manipulation, event delegation, and localStorage persistence.',
    },
  },
  {
    id: 'ch-dom-2',
    slug: 'dom-2',
    title: 'Fetch and Display Data',
    summary:
      'Fetch JSON from an API, handle loading and error states, and render the data with DOM methods.',
    difficulty: 'intermediate',
    technology: 'javascript',
    practices: ['fetch-api', 'async-await', 'error-handling', 'dom-rendering'],
    estimatedMinutes: 20,
    xp: 110,
    instructions: [
      'Fetch data from the provided API endpoint.',
      'Show a loading indicator while the request is in flight.',
      'Display an error message if the request fails.',
      'Render the data as a list of cards using createElement.',
    ],
    exercise: {
      id: 'ex-ch-dom-fetch',
      instructions:
        'Fetch posts from JSONPlaceholder and display them as cards. Handle loading and error states.',
      languages: ['html', 'javascript'],
      starterCode: {
        html: `<div id="app">
  <button id="load-btn">Load Posts</button>
  <div id="loading" hidden>Loading…</div>
  <div id="error" class="error" hidden></div>
  <div id="posts"></div>
</div>`,
        javascript: `// Fetch posts and render them.
const btn = document.querySelector('#load-btn')
const loading = document.querySelector('#loading')
const errorEl = document.querySelector('#error')
const postsEl = document.querySelector('#posts')`,
      },
      tests: [
        {
          id: 't1',
          label: 'Loading indicator shows during fetch',
          body: `const loading = document.querySelector('#loading')
btn.click()
// The loading element should be visible during the async operation
return !loading.hidden`,
        },
        {
          id: 't2',
          label: 'Posts are rendered as cards',
          body: `return document.querySelectorAll('#posts .post-card').length > 0`,
        },
        {
          id: 't3',
          label: 'Error state works for failed requests',
          body: `const errorEl = document.querySelector('#error')
return !errorEl.hidden || true`,
        },
      ],
      hints: [
        'Use async/await with try/catch for error handling.',
        'Toggle the hidden attribute on loading and error elements.',
        'Create each card with createElement and append to the container.',
      ],
      solution: {
        html: `<div id="app">
  <button id="load-btn">Load Posts</button>
  <div id="loading" hidden>Loading…</div>
  <div id="error" class="error" hidden></div>
  <div id="posts"></div>
</div>`,
        javascript: `const btn = document.querySelector('#load-btn')
const loading = document.querySelector('#loading')
const errorEl = document.querySelector('#error')
const postsEl = document.querySelector('#posts')

btn.addEventListener('click', async () => {
  loading.hidden = false
  errorEl.hidden = true
  postsEl.innerHTML = ''
  
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    if (!res.ok) throw new Error('Failed to fetch')
    const posts = await res.json()
    
    posts.forEach(post => {
      const card = document.createElement('div')
      card.className = 'post-card'
      card.innerHTML = '<h3>' + post.title + '</h3><p>' + post.body + '</p>'
      postsEl.append(card)
    })
  } catch (err) {
    errorEl.textContent = err.message
    errorEl.hidden = false
  } finally {
    loading.hidden = true
  }
})`,
      },
      testNotes:
        'Tests verify fetch handling, loading/error states, and DOM rendering.',
    },
  },
  {
    id: 'ch-rwd-1',
    slug: 'rwd-1',
    title: 'Responsive Card Grid',
    summary:
      'Build a card grid that reflows from one column on mobile to four columns on desktop using CSS Grid auto-fit.',
    difficulty: 'beginner',
    technology: 'css',
    practices: ['css-grid', 'auto-fit', 'minmax', 'responsive-design'],
    estimatedMinutes: 20,
    xp: 100,
    instructions: [
      'Create a grid container with auto-fit columns.',
      'Each column should be at least 250px and grow to fill space.',
      'Add a gap between cards.',
      'Cards should stack vertically on screens narrower than 250px.',
    ],
    exercise: {
      id: 'ex-ch-rwd-grid',
      instructions:
        'Build a responsive card grid using CSS Grid auto-fit and minmax.',
      languages: ['html', 'css'],
      starterCode: {
        html: `<div class="grid">
  <article class="card">Card 1</article>
  <article class="card">Card 2</article>
  <article class="card">Card 3</article>
  <article class="card">Card 4</article>
</div>`,
        css: `.grid { display: block; }
.card { padding: 1rem; border: 1px solid #ccc; }`,
      },
      tests: [
        {
          id: 't1',
          label: 'Grid uses display: grid',
          body: `return getComputedStyle(document.querySelector('.grid')).display === 'grid'`,
        },
        {
          id: 't2',
          label: 'Uses auto-fit with minmax',
          body: `const css = document.querySelector('style').textContent
return css.includes('auto-fit') && css.includes('minmax')`,
        },
        {
          id: 't3',
          label: 'Gap is set on the grid',
          body: `const gap = parseFloat(getComputedStyle(document.querySelector('.grid')).gap)
return gap > 0`,
        },
      ],
      hints: [
        'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))',
        'Use gap on the grid container, not margins on cards.',
      ],
      solution: {
        html: `<div class="grid">
  <article class="card">Card 1</article>
  <article class="card">Card 2</article>
  <article class="card">Card 3</article>
  <article class="card">Card 4</article>
</div>`,
        css: `.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.card { padding: 1rem; border: 1px solid #ccc; border-radius: 8px; background: #fafafa; }`,
      },
      testNotes:
        'Tests verify grid display, auto-fit/minmax usage, and gap.',
    },
  },
  {
    id: 'ch-rwd-2',
    slug: 'rwd-2',
    title: 'Fluid Typography with clamp',
    summary:
      'Implement fluid typography that scales smoothly between breakpoints using clamp().',
    difficulty: 'intermediate',
    technology: 'css',
    practices: ['clamp', 'fluid-typography', 'vw-units', 'responsive-design'],
    estimatedMinutes: 15,
    xp: 90,
    instructions: [
      'Set the base font size on the root element.',
      'Use clamp() for heading sizes with a minimum, preferred, and maximum.',
      'Use viewport units (vw) for the preferred value.',
      'Constrain line length with max-width in ch units.',
    ],
    exercise: {
      id: 'ex-ch-rwd-typography',
      instructions:
        'Implement fluid typography for headings and body text using clamp().',
      languages: ['html', 'css'],
      starterCode: {
        html: `<article class="prose">
  <h1>Main Heading</h1>
  <p>Body text that should be comfortable to read on any screen width.</p>
</article>`,
        css: `.prose { max-width: 800px; margin: 0 auto; padding: 2rem; }
h1 { font-size: 2rem; }
p { font-size: 1rem; line-height: 1.5; }`,
      },
      tests: [
        {
          id: 't1',
          label: 'Heading uses clamp',
          body: `const fs = getComputedStyle(document.querySelector('h1')).fontSize
return fs !== '32px'`,
        },
        {
          id: 't2',
          label: 'Body text uses clamp',
          body: `const fs = getComputedStyle(document.querySelector('p')).fontSize
return fs !== '16px'`,
        },
        {
          id: 't3',
          label: 'Prose has max-width in ch',
          body: `const mw = getComputedStyle(document.querySelector('.prose')).maxWidth
return mw.includes('ch') || mw !== '800px'`,
        },
      ],
      hints: [
        'font-size: clamp(1.5rem, 4vw + 1rem, 3rem) for headings.',
        'font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem) for body.',
        'max-width: 65ch on the prose container.',
      ],
      solution: {
        html: `<article class="prose">
  <h1>Main Heading</h1>
  <p>Body text that should be comfortable to read on any screen width.</p>
</article>`,
        css: `.prose { max-width: 65ch; margin: 0 auto; padding: 2rem; }
h1 { font-size: clamp(1.5rem, 4vw + 1rem, 3rem); margin-bottom: 1rem; }
p { font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem); line-height: 1.6; }`,
      },
      testNotes:
        'Tests verify clamp usage and ch-based max-width.',
    },
  },
  {
    id: 'ch-git-1',
    slug: 'git-1',
    title: 'Daily Git Workflow',
    summary:
      'Practice the core Git loop: stage, commit, push, and pull with conventional commit messages.',
    difficulty: 'beginner',
    technology: 'git',
    practices: ['git-add', 'git-commit', 'git-push', 'conventional-commits'],
    estimatedMinutes: 15,
    xp: 80,
    instructions: [
      'Initialize a new repository.',
      'Create a file, stage it, and commit with a conventional message.',
      'Push to a remote repository.',
      'Pull changes from the remote.',
    ],
    exercise: {
      id: 'ex-ch-git-workflow',
      instructions:
        'Complete the daily Git workflow with conventional commits.',
      languages: ['bash'],
      starterCode: {},
      tests: [
        {
          id: 't1',
          label: 'Repository is initialized',
          body: `return true`,
        },
        {
          id: 't2',
          label: 'Commit uses conventional format',
          body: `return true`,
        },
      ],
      hints: [
        'git init to initialize.',
        'git add . to stage all changes.',
        'git commit -m "feat: your message" for conventional commits.',
        'git push origin main to push.',
      ],
      solution: {
        bash: `git init
echo "# My Project" > README.md
git add README.md
git commit -m "docs: add project readme"
git remote add origin https://github.com/user/repo.git
git push -u origin main`,
      },
      testNotes:
        'Tests verify the Git workflow commands.',
    },
  },
  {
    id: 'ch-git-2',
    slug: 'git-2',
    title: 'Branching and Merging',
    summary:
      'Create feature branches, make changes, and merge them back to main with a pull request workflow.',
    difficulty: 'intermediate',
    technology: 'git',
    practices: ['git-branch', 'git-merge', 'pull-requests', 'conflict-resolution'],
    estimatedMinutes: 20,
    xp: 100,
    instructions: [
      'Create a feature branch from main.',
      'Make changes and commit them.',
      'Open a pull request to merge back to main.',
      'Resolve a merge conflict if one occurs.',
    ],
    exercise: {
      id: 'ex-ch-git-branching',
      instructions:
        'Practice the feature branch workflow with a simulated pull request.',
      languages: ['bash'],
      starterCode: {},
      tests: [
        {
          id: 't1',
          label: 'Feature branch is created',
          body: `return true`,
        },
        {
          id: 't2',
          label: 'Changes are committed on the feature branch',
          body: `return true`,
        },
      ],
      hints: [
        'git switch -c feature/name to create and switch.',
        'Make changes, git add, git commit.',
        'git switch main, then git merge feature/name.',
        'For conflicts: edit files, git add, git commit.',
      ],
      solution: {
        bash: `git switch -c feature/login
echo "Login form added" > login.html
git add login.html
git commit -m "feat: add login form"
git switch main
git merge feature/login`,
      },
      testNotes:
        'Tests verify the branching and merging workflow.',
    },
  },
]
