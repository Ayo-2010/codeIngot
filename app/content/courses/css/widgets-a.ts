import type { Section } from '~/types/content'

export const cssWidgetSectionsA: Section[] = [
  {
    id: 'css-s32',
    title: 'CSS Navigation Bar',
    description: 'Building site navigation from a semantic list, and shaping it vertically or horizontally with flexbox.',
    lessons: [
      {
        id: 'css-l67',
        title: 'Navbar',
        description: 'What a navigation bar is made of, and why the list underneath it should never be removed.',
        duration: 5,
        objectives: ['Build a bar from a `<nav>` landmark wrapping a list of links', 'Explain what `list-style: none` costs in semantics', 'Style list items as full-width rows without touching the markup'],
        xp: 35,
        content: [
          { type: 'text', id: 'c-l67-b1', body: 'A navigation bar is a list of links to the main parts of a site, wrapped in a `<nav>` element so the browser and assistive technology know what it is for.' },
          {
            type: 'demo', id: 'c-l67-d1', title: 'A semantic navigation bar',
            body: 'Four sections of a site as a real `<nav>` landmark. The markup underneath is a plain list — only the appearance changed.',
            html: `<nav class="site-nav">
  <ul role="list">
    <li><a href="#">Home</a></li>
    <li><a href="#">Tutorials</a></li>
    <li><a href="#">Reference</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>`,
            css: `.site-nav ul {
  list-style: none; margin: 0; padding: 0;
  border: 1px solid #d5dae0; border-radius: 10px; overflow: hidden;
}
.site-nav li + li { border-top: 1px solid #d5dae0; }
.site-nav a {
  display: block; padding: 0.7rem 1rem;
  color: #1d2733; text-decoration: none;
}
.site-nav a:hover, .site-nav a:focus { background: #29e2bd; }`,
            height: 200,
          },
          { type: 'text', id: 'c-l67-b2', body: 'Each link is a full-width row with padding and the underlines are gone. Nothing about the structure moved — the same list is there, just styled.' },
          { type: 'heading', id: 'c-l67-h1', level: 3, body: 'The part people get wrong' },
          { type: 'code', id: 'c-l67-c1', language: 'html', code: `<nav aria-label="Main">
  <ul role="list">
    <li><a href="/">Home</a></li>
    <li><a href="/tutorials">Tutorials</a></li>
    <li><a href="/reference">Reference</a></li>
  </ul>
</nav>` },
          {
            type: 'list', id: 'c-l67-l1', style: 'bullet',
            items: [
              '**`<nav>`** marks the region as a navigation landmark, so screen reader users can jump straight to it.',
              '**The list is not decoration.** It is what tells assistive technology how many items exist and where one ends and the next begins.',
              '**`list-style: none`** hides the bullets — and in Safari it also strips the list semantics. Add `role="list"` on the `<ul>` to put them back.',
              '**`display: block` on the anchor** makes the whole row clickable, not just the word.',
              '**Padding, never margins, on the links.** Padding grows the target without adding gaps between rows.',
            ],
          },
          { type: 'warning', id: 'c-l67-w1', title: 'Do not throw the list away', body: 'A common "cleanup" deletes the `<ul>` and puts bare links in the `<nav>`. That looks tidier and is a real regression: the item count disappears and a screen reader user cannot tell whether the bar holds two links or twenty. Hide the bullets, keep the list.' },
          {
            type: 'example', id: 'c-l67-e1', title: 'Accessible list hiding', showPreview: true,
            body: '`role="list"` restores what `list-style: none` removes in Safari, so the bar looks identical and still reads as a four-item list.',
            html: `<nav class="safe-nav">
  <ul role="list">
    <li><a href="#">Home</a></li>
    <li><a href="#">Docs</a></li>
    <li><a href="#">Blog</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
            css: `.safe-nav ul {
  list-style: none; margin: 0; padding: 0.25rem;
  display: flex; gap: 0.25rem;
  background: #f3f5f8; border-radius: 8px;
}
.safe-nav a {
  display: block; padding: 0.5rem 0.9rem; border-radius: 6px;
  color: #1d2733; text-decoration: none;
}
.safe-nav a:hover, .safe-nav a:focus { background: #29e2bd; }`,
          },
          {
            type: 'exercise', id: 'c-l67-x1',
            exercise: {
              id: 'ex-l67',
              instructions: 'Turn the navigation list below into a stacked bar: remove the markers and default spacing, and make each link a full-width padded block.',
              languages: ['css'],
              starterCode: { html: '<nav class="site-nav">\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Tutorials</a></li>\n    <li><a href="#">Reference</a></li>\n    <li><a href="#">About</a></li>\n  </ul>\n</nav>\n', css: '.site-nav ul {\n  \n}\n.site-nav a {\n  \n}\n' },
              tests: [
                { id: 'ex-l67-t1', label: 'Markers and default spacing are gone', body: 'const s = getComputedStyle(document.querySelector("nav ul")); return s.listStyleType === "none" && s.marginLeft === "0px" && s.paddingLeft === "0px"' },
                { id: 'ex-l67-t2', label: 'Each link is an undecorated block', body: 'const a = getComputedStyle(document.querySelector("nav a")); return a.display === "block" && a.textDecorationLine === "none"' },
                { id: 'ex-l67-t3', label: 'All four links are still in the document', body: 'return document.querySelectorAll("nav ul li a").length === 4' },
              ],
              hints: ['Three properties on the `<ul>`: `list-style`, `margin` and `padding`.', 'The anchor is inline by default, so it needs `display: block` to span the row.', 'Try `list-style: none; margin: 0; padding: 0;` plus `display: block; padding: 0.6rem 1rem;`.'],
              solution: { html: '<nav class="site-nav">\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Tutorials</a></li>\n    <li><a href="#">Reference</a></li>\n    <li><a href="#">About</a></li>\n  </ul>\n</nav>\n', css: '.site-nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.site-nav a {\n  display: block;\n  padding: 0.6rem 1rem;\n  text-decoration: none;\n}\n' },
              testNotes: 'The tests read the computed style of `nav ul` and `nav a`.',
            },
          },
        ],
      },
      {
        id: 'css-l68',
        title: 'Vertical Navbar',
        description: 'The same navigation markup stacked into a sidebar, with a clear active state.',
        duration: 6,
        objectives: ['Stack a navigation list with `flex-direction: column`', 'Make each item fill the full width of the sidebar', 'Style the current page so the user knows where they are'],
        xp: 38,
        content: [
          { type: 'text', id: 'c-l68-b1', body: 'A vertical navbar is the same `<nav>` and list as before, with `display: flex` and `flex-direction: column` on the list so the rows stack instead of running across.' },
          {
            type: 'demo', id: 'c-l68-d1', title: 'Stacked sidebar navigation',
            body: 'The same four links, stacked. The third is marked `aria-current="page"` and styled as the active item.',
            html: `<nav class="side-nav">
  <ul role="list">
    <li><a href="#">Dashboard</a></li>
    <li><a href="#">Orders</a></li>
    <li><a href="#" class="active" aria-current="page">Customers</a></li>
    <li><a href="#">Settings</a></li>
  </ul>
</nav>`,
            css: `.side-nav ul {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; width: 220px;
  border: 1px solid #d5dae0; border-radius: 10px; overflow: hidden;
}
.side-nav a {
  display: block; padding: 0.7rem 1rem; color: #1d2733;
  text-decoration: none; border-left: 3px solid transparent;
}
.side-nav a:hover, .side-nav a:focus { background: #eef1f5; }
.side-nav a.active { background: #29e2bd; border-left-color: #0b3b34; font-weight: 600; }`,
            height: 230,
          },
          { type: 'text', id: 'c-l68-b2', body: 'The active row has a filled background and a coloured left border. `aria-current="page"` says the same thing to a screen reader that the fill says visually.' },
          { type: 'heading', id: 'c-l68-h1', level: 3, body: 'The rules that make it work' },
          { type: 'code', id: 'c-l68-c1', language: 'css', code: `.side-nav ul {\n  display: flex;\n  flex-direction: column;\n}\n.side-nav a {\n  display: block;\n  width: 100%;\n}` },
          {
            type: 'list', id: 'c-l68-l1', style: 'bullet',
            items: [
              '**`flex-direction: column`** is what actually stacks them. A list is vertical by default, but the moment you add flexbox you have to say which way you want it.',
              '**`width: 100%` on the anchor** — an inline element only occupies the text width, which is why the row looks half-empty until you make it a block.',
              '**A fixed width on the `<ul>`** stops the sidebar stretching across the page.',
              '**`aria-current="page"`** is the semantic half of the active state. A colour change alone tells nobody who is not looking at it.',
            ],
          },
          { type: 'tip', id: 'c-l68-t1', title: 'Highlight with a border, not just a colour', body: 'A background tint with low contrast is invisible to anyone with a colour vision deficiency. Adding `border-left: 3px solid` gives a second, non-colour signal for the current page.' },
          {
            type: 'exercise', id: 'c-l68-x1',
            exercise: {
              id: 'ex-l68',
              instructions: 'Make the navigation list a vertical navbar: a flex column whose four links all fill the full width of the row.',
              languages: ['css'],
              starterCode: { html: '<nav class="side-nav">\n  <ul>\n    <li><a href="#">Dashboard</a></li>\n    <li><a href="#">Orders</a></li>\n    <li><a href="#">Customers</a></li>\n    <li><a href="#">Settings</a></li>\n  </ul>\n</nav>\n', css: '.side-nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  \n}\n.side-nav a {\n  \n}\n' },
              tests: [
                { id: 'ex-l68-t1', label: 'The list is a flex column', body: 'return getComputedStyle(document.querySelector("nav ul")).flexDirection === "column"' },
                { id: 'ex-l68-t2', label: 'The links fill their row', body: 'const a = getComputedStyle(document.querySelector("nav a")); return a.display === "block" && a.width === getComputedStyle(document.querySelector("nav ul")).width' },
                { id: 'ex-l68-t3', label: 'The bar is 220px wide and does not fill the page', body: 'const u = document.querySelector("nav ul"); return getComputedStyle(u).width === "220px" && u.getBoundingClientRect().width < document.body.getBoundingClientRect().width' },
              ],
              hints: ['Two containers are involved: the `<ul>` decides the stacking, the `<a>` decides the clickable width.', '`flex-direction: column` means nothing until `display: flex` is on the same element.', 'Try `display: flex; flex-direction: column; width: 220px;` plus `display: block; padding: 0.6rem 1rem;`.'],
              solution: { html: '<nav class="side-nav">\n  <ul>\n    <li><a href="#">Dashboard</a></li>\n    <li><a href="#">Orders</a></li>\n    <li><a href="#">Customers</a></li>\n    <li><a href="#">Settings</a></li>\n  </ul>\n</nav>\n', css: '.side-nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  width: 220px;\n}\n.side-nav a {\n  display: block;\n  width: 100%;\n  padding: 0.6rem 1rem;\n}\n' },
              testNotes: 'The tests read the computed `flex-direction` and compare a rendered link width with the list width.',
            },
          },
        ],
      },
      {
        id: 'css-l69',
        title: 'Horizontal Navbar',
        description: 'Laying the same list out in a row with gaps and equal-width items.',
        duration: 6,
        objectives: ['Lay a navigation list out in a row with `flex-direction: row`', 'Space items with `gap` instead of margins', 'Give every item equal width with `flex: 1`'],
        xp: 40,
        content: [
          { type: 'text', id: 'c-l69-b1', body: 'A horizontal navbar is the same markup again — the list is a flex row with a `gap` between items, and `flex: 1` so every cell is the same width.' },
          {
            type: 'demo', id: 'c-l69-d1', title: 'Row of equal-width items',
            body: 'Four cells filling the bar evenly. The last is active, with a darker underline.',
            html: `<nav class="bar-nav">
  <ul role="list">
    <li><a href="#">Home</a></li>
    <li><a href="#">Docs</a></li>
    <li><a href="#">Pricing</a></li>
    <li><a href="#" class="active" aria-current="page">Contact</a></li>
  </ul>
</nav>`,
            css: `.bar-nav ul {
  list-style: none; margin: 0; padding: 0.25rem;
  display: flex; flex-direction: row; gap: 0.25rem;
  background: #f3f5f8; border-radius: 10px;
}
.bar-nav li { flex: 1; text-align: center; }
.bar-nav a {
  display: block; padding: 0.6rem 0.5rem; border-radius: 6px;
  color: #1d2733; text-decoration: none;
}
.bar-nav a:hover, .bar-nav a:focus { background: #e2e7ee; }
.bar-nav a.active { background: #29e2bd; box-shadow: inset 0 -3px 0 #0b3b34; }`,
            height: 130,
          },
          { type: 'text', id: 'c-l69-b2', body: '`gap` puts a consistent 0.25rem between every pair of items without touching a single margin. `flex: 1` splits the leftover space equally, so all four cells are identical.' },
          { type: 'heading', id: 'c-l69-h1', level: 3, body: 'Why gap beats margins here' },
          { type: 'code', id: 'c-l69-c1', language: 'css', code: `.bar-nav ul {\n  display: flex;\n  flex-direction: row;\n  gap: 0.25rem;\n}\n.bar-nav li {\n  flex: 1;\n}` },
          {
            type: 'list', id: 'c-l69-l1', style: 'bullet',
            items: [
              '**`flex-direction: row`** is the default, but writing it makes the intent obvious to whoever reads the rule next.',
              '**`gap`** adds space between items and nowhere else. Margins on the last item leak outside the bar, and `li + li { margin-left: … }` is the fiddly old workaround.',
              '**`flex: 1`** is shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0`. That zero basis is what makes the widths equal instead of content-dependent.',
              '**`flex: 1` belongs on the `<li>`**, not the `<a>`. The list item is the flex child; the link just fills it.',
            ],
          },
          { type: 'tip', id: 'c-l69-t1', title: 'Equal width is not always what you want', body: 'On a phone, four equal cells squeeze the labels. Use `flex: 1 1 auto` there, or drop to a single column with a media query, and keep the equal split for the full-width bar.' },
          {
            type: 'example', id: 'c-l69-e1', title: 'Row that reflows on narrow screens', showPreview: true,
            body: 'No JavaScript: the bar wraps on its own when there is not enough width, because `flex-wrap` is on and the basis is a minimum, not a fixed size.',
            html: `<nav class="wrap-nav">
  <ul role="list">
    <li><a href="#">Home</a></li>
    <li><a href="#">Tutorials</a></li>
    <li><a href="#">Reference</a></li>
    <li><a href="#">Community</a></li>
  </ul>
</nav>`,
            css: `.wrap-nav ul {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-wrap: wrap; gap: 0.5rem;
}
.wrap-nav li { flex: 1 1 120px; }
.wrap-nav a {
  display: block; text-align: center; padding: 0.6rem 0.5rem;
  border: 1px solid #d5dae0; border-radius: 8px;
  color: #1d2733; text-decoration: none;
}`,
          },
          {
            type: 'exercise', id: 'c-l69-x1',
            exercise: {
              id: 'ex-l69',
              instructions: 'Lay the navigation list out as a horizontal bar with a gap between items, and make every item the same width.',
              languages: ['css'],
              starterCode: { html: '<nav class="bar-nav">\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Docs</a></li>\n    <li><a href="#">Pricing</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>\n', css: '.bar-nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  \n}\n.bar-nav li {\n  \n}\n' },
              tests: [
                { id: 'ex-l69-t1', label: 'The list is a flex row', body: 'return getComputedStyle(document.querySelector("nav ul")).flexDirection === "row"' },
                { id: 'ex-l69-t2', label: 'There is a real gap between items', body: 'return parseFloat(getComputedStyle(document.querySelector("nav ul")).columnGap) >= 4' },
                { id: 'ex-l69-t3', label: 'All four items are the same width', body: 'const w = Array.from(document.querySelectorAll("nav li")).map(li => Math.round(li.getBoundingClientRect().width)); return new Set(w).size === 1 && w.length === 4' },
              ],
              hints: ['Three things: `display` plus `flex-direction` on the `<ul>`, `gap` for spacing, `flex: 1` on each `<li>`.', 'Equal widths need `flex-basis: 0`, which `flex: 1` sets for you.', 'Try `display: flex; flex-direction: row; gap: 0.5rem;` and `flex: 1;` on the items.'],
              solution: { html: '<nav class="bar-nav">\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">Docs</a></li>\n    <li><a href="#">Pricing</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>\n', css: '.bar-nav ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: row;\n  gap: 0.5rem;\n}\n.bar-nav li {\n  flex: 1;\n  text-align: center;\n}\n' },
              testNotes: 'The tests read computed `flex-direction` and `column-gap`, then compare the rendered widths of the four list items.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s32', title: 'CSS Navigation Bar quiz', passingScore: 60,
      questions: [
        { id: 'quiz-css-s32-q1', type: 'multiple-choice', prompt: 'What is lost when a navigation list is replaced with bare links inside a `<nav>`?', options: ['Nothing important, the links still work', 'The visual spacing between items', 'The item count and list semantics for assistive technology', 'The page title'], answer: 2, explanation: 'The list is how a screen reader knows how many navigation items exist. Without it the user hears a stream of links with no count and no boundaries.' },
        { id: 'quiz-css-s32-q2', type: 'true-false', prompt: 'Setting `list-style: none` on a `<ul>` is safe in every browser because it is only a visual change.', answer: false, explanation: 'In Safari it also removes the list semantics. Add `role="list"` to the `<ul>` alongside `list-style: none`.' },
        { id: 'quiz-css-s32-q3', type: 'code-output', prompt: 'What does this rule set?', code: '.nav ul { display: flex; flex-direction: column; }', options: ['A vertical navigation list', 'A horizontal navigation list', 'The list disappears', 'The items are absolutely positioned'], answer: 0, explanation: 'A flex container with `flex-direction: column` stacks its children top to bottom, which is the vertical navbar layout.' },
        { id: 'quiz-css-s32-q4', type: 'blank', prompt: 'Complete the sentence: equal-width flex items need `flex: 1` on the list item so that the flex basis is ______.', answers: ['0', 'zero'], explanation: '`flex: 1` expands to `flex-grow: 1; flex-shrink: 1; flex-basis: 0`, and a zero basis makes all cells identical instead of content-sized.' },
        { id: 'quiz-css-s32-q5', type: 'multiple-choice', prompt: 'Which property adds space between flex items without leaking outside the container?', options: ['margin-right on every item', 'gap', 'padding on the container', 'text-indent'], answer: 1, explanation: '`gap` applies only between items, so the first and last edges stay flush with the container.' },
      ],
    },
  },
  {
    id: 'css-s33',
    title: 'CSS Dropdowns',
    description: 'A dropdown menu that opens on hover and on keyboard focus, with no JavaScript at all.',
    lessons: [
      {
        id: 'css-l70',
        title: 'Dropdowns',
        description: 'Building a dropdown with `:hover` and `:focus-within`, and why the second one is not optional.',
        duration: 7,
        objectives: ['Hide a submenu by default and reveal it with `:hover`', 'Open the same submenu on keyboard focus with `:focus-within`', 'Explain why a hover-only menu is unusable on touch devices'],
        xp: 45,
        content: [
          { type: 'text', id: 'c-l70-b1', body: 'A CSS-only dropdown is a nested list hidden with `display: none` and revealed when the parent item is hovered — or focused, using `:focus-within`.' },
          {
            type: 'demo', id: 'c-l70-d1', title: 'Hover, focus, and a permanently open panel',
            body: 'Hover or tab into the first item to open its submenu. The bar on the right is the same markup with an `open` class, kept open so you can see the result without touching anything.',
            html: `<div class="dd-demo">
  <nav class="dd">
    <ul role="list">
      <li class="has-menu">
        <a href="#">Products</a>
        <ul class="sub" role="list">
          <li><a href="#">Widgets</a></li>
          <li><a href="#">Gadgets</a></li>
          <li><a href="#">Spares</a></li>
        </ul>
      </li>
      <li><a href="#">Pricing</a></li>
      <li><a href="#">Docs</a></li>
    </ul>
  </nav>
  <nav class="dd">
    <ul role="list">
      <li class="has-menu open">
        <a href="#">Products</a>
        <ul class="sub" role="list">
          <li><a href="#">Widgets</a></li>
          <li><a href="#">Gadgets</a></li>
          <li><a href="#">Spares</a></li>
        </ul>
      </li>
      <li><a href="#">Pricing</a></li>
    </ul>
  </nav>
</div>`,
            css: `.dd-demo { display: flex; gap: 1.5rem; align-items: flex-start; font-size: 14px; }
.dd ul { list-style: none; margin: 0; padding: 0; }
.dd > ul { display: flex; gap: 0.5rem; }
.dd > ul > li { position: relative; }
.dd a { display: block; padding: 0.5rem 0.8rem; color: #1d2733; text-decoration: none; border-radius: 6px; }
.dd > ul > li > a:hover, .dd > ul > li > a:focus { background: #29e2bd; }
.dd .sub {
  display: none; position: absolute; top: 100%; left: 0;
  min-width: 150px; background: #fff;
  border: 1px solid #d5dae0; border-radius: 8px; padding: 0.25rem;
  box-shadow: 0 10px 24px rgba(20, 30, 45, 0.14); z-index: 2;
}
.dd .has-menu:hover .sub, .dd .has-menu:focus-within .sub, .dd .has-menu.open .sub { display: block; }`,
            height: 250,
          },
          { type: 'text', id: 'c-l70-b2', body: 'The second bar is the same code with an extra `open` class on one item, purely so the open state is visible on screen. Delete the class and it behaves exactly like the first.' },
          { type: 'heading', id: 'c-l70-h1', level: 3, body: 'The two selectors doing the work' },
          { type: 'code', id: 'c-l70-c1', language: 'css', code: `.has-menu .sub {\n  display: none;\n}\n.has-menu:hover .sub,\n.has-menu:focus-within .sub {\n  display: block;\n}` },
          {
            type: 'list', id: 'c-l70-l1', style: 'bullet',
            items: [
              '**`position: relative` on the parent item** anchors the absolutely positioned submenu, so it appears under its own parent rather than the edge of the page.',
              '**`top: 100%`** puts the submenu immediately below the parent row, with no magic offset.',
              '**`z-index`** lifts the submenu above whatever follows it in the document so it is not painted underneath.',
              '**`:focus-within`** matches whenever the element *or any descendant* has focus, so tabbing into a submenu link keeps the panel open.',
            ],
          },
          { type: 'warning', id: 'c-l70-w1', title: '`:hover` alone is not a menu', body: 'A hover-only dropdown cannot be used at all on a touch screen — there is no hover state to enter, and the first tap often lands on a link that navigates away before the submenu appears. It is equally invisible to anyone navigating by keyboard. `:focus-within` is mandatory, not a nice extra: keep both selectors on the same rule.' },
          {
            type: 'example', id: 'c-l70-e1', title: 'Dropdown that survives the pointer leaving', showPreview: true,
            body: 'An invisible bridge across the gap keeps the panel open while you move diagonally from the parent item to a submenu link, instead of it snapping shut mid-move.',
            html: `<nav class="bridge">
  <ul role="list">
    <li class="has-menu">
      <a href="#">Library</a>
      <ul class="sub" role="list">
        <li><a href="#">Books</a></li>
        <li><a href="#">Films</a></li>
        <li><a href="#">Music</a></li>
      </ul>
    </li>
    <li><a href="#">Blog</a></li>
  </ul>
</nav>`,
            css: `.bridge ul { list-style: none; margin: 0; padding: 0; }
.bridge > ul { display: flex; gap: 0.5rem; }
.bridge .has-menu { position: relative; }
.bridge a { display: block; padding: 0.5rem 0.8rem; color: #1d2733; text-decoration: none; border-radius: 6px; }
.bridge .sub {
  display: none; position: absolute; top: 100%; left: 0;
  padding-top: 8px; min-width: 160px;
}
.bridge .sub-inner {
  background: #fff; border: 1px solid #d5dae0; border-radius: 8px;
  padding: 0.25rem; box-shadow: 0 10px 24px rgba(20, 30, 45, 0.14);
}
.bridge .has-menu:hover .sub, .bridge .has-menu:focus-within .sub { display: block; }`,
          },
          {
            type: 'exercise', id: 'c-l70-x1',
            exercise: {
              id: 'ex-l70',
              instructions: 'Make the submenu open on both hover and keyboard focus. Keep the `:focus-within` selector — the test looks for it.',
              languages: ['css'],
              starterCode: { html: '<nav class="dd">\n  <ul>\n    <li class="has-menu">\n      <a href="#">Products</a>\n      <ul class="sub">\n        <li><a href="#">Widgets</a></li>\n        <li><a href="#">Gadgets</a></li>\n      </ul>\n    </li>\n    <li><a href="#">Pricing</a></li>\n  </ul>\n</nav>\n', css: '.has-menu {\n  position: relative;\n}\n.sub {\n  \n}\n' },
              tests: [
                { id: 'ex-l70-t1', label: 'The submenu is hidden by default', body: 'return getComputedStyle(document.querySelector(".sub")).display === "none"' },
                { id: 'ex-l70-t2', label: 'A :hover or :focus-within rule opens it', body: 'const rules = Array.from(document.styleSheets).flatMap(s => { try { return Array.from(s.cssRules) } catch (e) { return [] } }); return rules.some(r => { const t = r.selectorText || ""; return t.includes(".sub") && (t.includes(":hover") || t.includes(":focus-within")) })' },
                { id: 'ex-l70-t3', label: 'Both submenu links are reachable', body: 'return document.querySelectorAll(".sub li a").length === 2 && getComputedStyle(document.querySelector(".has-menu")).position === "relative"' },
              ],
              hints: ['Two rules: one setting `display: none` on `.sub`, one setting `display: block` via the `:hover` and `:focus-within` pseudo-classes.', 'The selector is `.has-menu:focus-within .sub` — a descendant combinator, not `.sub:focus-within`.', 'Try `.sub { display: none; }` then `.has-menu:hover .sub, .has-menu:focus-within .sub { display: block; }`.'],
              solution: { html: '<nav class="dd">\n  <ul>\n    <li class="has-menu">\n      <a href="#">Products</a>\n      <ul class="sub">\n        <li><a href="#">Widgets</a></li>\n        <li><a href="#">Gadgets</a></li>\n      </ul>\n    </li>\n    <li><a href="#">Pricing</a></li>\n  </ul>\n</nav>\n', css: '.has-menu {\n  position: relative;\n}\n.sub {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  background: #fff;\n  border: 1px solid #d5dae0;\n  padding: 0.25rem;\n}\n.has-menu:hover .sub,\n.has-menu:focus-within .sub {\n  display: block;\n}\n' },
              testNotes: 'The tests read the computed `display` of `.sub`, then walk the document stylesheets for a rule combining `.sub` with `:hover` or `:focus-within`.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s33', title: 'CSS Dropdowns quiz', passingScore: 60,
      questions: [
        { id: 'quiz-css-s33-q1', type: 'multiple-choice', prompt: 'Why is a `:hover`-only dropdown unusable on a phone?', options: ['Phones do not support `:hover`', 'There is no persistent hover state, so nothing opens reliably', '`:hover` is too slow on mobile networks', 'It works, but the colours are wrong'], answer: 1, explanation: 'Touch devices fire hover events only as a side effect of tapping. The first tap usually registers as a click and navigates, so the submenu never appears.' },
        { id: 'quiz-css-s33-q2', type: 'true-false', prompt: '`:focus-within` keeps a submenu open while a link inside it has keyboard focus.', answer: true, explanation: '`:focus-within` matches an element when it or any descendant holds focus, so tabbing into the submenu keeps the panel on screen.' },
        { id: 'quiz-css-s33-q3', type: 'code-output', prompt: 'What does this set?', code: '.sub { display: none; }\n.has-menu:hover .sub { display: block; }', options: ['The submenu is always visible', 'It appears while the parent item is hovered and is hidden otherwise', 'The submenu disappears on hover', 'The submenu becomes a flex row'], answer: 1, explanation: 'The first rule hides it by default; the second reverses that while the pointer is over the parent item.' },
        { id: 'quiz-css-s33-q4', type: 'blank', prompt: 'Complete the sentence: an absolutely positioned submenu needs `position: relative` on its ________ so it anchors to that item instead of the page.', answers: ['parent', 'parent item', 'parent li', 'containing block'], explanation: 'An absolutely positioned element is placed against its nearest positioned ancestor. Without one it falls back to the page.' },
        { id: 'quiz-css-s33-q5', type: 'multiple-choice', prompt: 'Which property keeps an open submenu painted above the content that follows it?', options: ['float', 'z-index', 'order', 'overflow'], answer: 1, explanation: '`z-index` sets stacking order for positioned elements. `overflow` would do the opposite — it can clip the submenu.' },
      ],
    },
  },
  {
    id: 'css-s34',
    title: 'CSS Image Gallery',
    description: 'A responsive grid of images that stay square, fill their tile, and never distort.',
    lessons: [
      {
        id: 'css-l71',
        title: 'Image Gallery',
        description: 'Laying out thumbnails in a grid with `aspect-ratio`, and cropping them neatly with `object-fit: cover`.',
        duration: 7,
        objectives: ['Lay tiles out in a responsive grid with `repeat(auto-fit, minmax(...))`', 'Force equal-height tiles with `aspect-ratio`', 'Fill a fixed box without distorting using `object-fit: cover`'],
        xp: 45,
        content: [
          { type: 'text', id: 'c-l71-b1', body: 'An image gallery is a grid of tiles where every image is cropped to the same shape so the rows line up, whatever the original proportions were.' },
          {
            type: 'demo', id: 'c-l71-d1', title: 'A responsive gallery of cropped tiles',
            body: 'Nine tiles, each forced to a 4:3 box. Narrow the preview and the grid reflows to fewer columns on its own — no media query, no script.',
            html: `<div class="gallery">
  <div class="tile p1"></div><div class="tile p2"></div><div class="tile p3"></div>
  <div class="tile p4"></div><div class="tile p5"></div><div class="tile p6"></div>
  <div class="tile p7"></div><div class="tile p8"></div><div class="tile p9"></div>
</div>`,
            css: `.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; }
.tile { aspect-ratio: 4 / 3; border-radius: 8px; background-size: cover; background-position: center; }
.p1 { background-image: linear-gradient(135deg, #29e2bd, #0b7f6d); }
.p2 { background-image: radial-gradient(circle at 30% 30%, #ffd166, #ef476f); }
.p3 { background-image: linear-gradient(45deg, #4cc9f0, #3a0ca3); }
.p4 { background-image: radial-gradient(circle at 70% 70%, #ff9f1c, #7f1d1d); }
.p5 { background-image: linear-gradient(160deg, #80ed99, #006466); }
.p6 { background-image: linear-gradient(200deg, #f72585, #480ca8); }
.p7 { background-image: radial-gradient(circle at 20% 80%, #bde0fe, #415a77); }
.p8 { background-image: linear-gradient(90deg, #ffd6a5, #d00000); }
.p9 { background-image: radial-gradient(circle at 50% 20%, #caffbf, #38b000); }`,
            height: 300,
          },
          { type: 'text', id: 'c-l71-b2', body: 'Each tile has no content and no intrinsic size, so `aspect-ratio` is what gives it height. The next example applies the same idea to a real `<img>` with `object-fit`.' },
          { type: 'heading', id: 'c-l71-h1', level: 3, body: 'object-fit: cover' },
          { type: 'code', id: 'c-l71-c1', language: 'css', code: `.frame {
  width: 240px;
  height: 160px;
  overflow: hidden;
}
.frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}` },
          {
            type: 'list', id: 'c-l71-l1', style: 'bullet',
            items: [
              '**A replaced element keeps its own proportions.** An `<img>` is 320x180, so forcing a square box on it with `width` and `height` squashes it.',
              '**`object-fit: cover`** fills the box and crops the overflow, centred by default. The image fills the tile and nothing is distorted.',
              '**`object-fit: contain`** fits the whole image inside the box, leaving space rather than cropping. Use it for logos and diagrams.',
              '**`object-position`** moves the crop window — `center` is the default, `top` keeps a face in shot.',
              '**`object-fit` only applies to replaced elements**: `<img>`, `<video>`, `<canvas>`, `<iframe>`. It does nothing to a `<div>`.',
            ],
          },
          { type: 'tip', id: 'c-l71-t1', title: 'aspect-ratio beats the padding hack', body: 'The old trick for a square box was a `padding-top: 100%` spacer with an absolutely positioned child. `aspect-ratio: 1 / 1` says the same thing in one line and needs no extra elements.' },
          {
            type: 'example', id: 'c-l71-e1', title: 'The same crop, three ways', showPreview: true,
            body: 'A wide source image in an identical square box: the default stretches it, `contain` letterboxes it, `cover` crops it. Three boxes, three results, one image.',
            html: `<div class="compare">
  <figure><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='320' height='180' fill='%2329e2bd'/%3E%3Ccircle cx='260' cy='45' r='34' fill='%23ffd166'/%3E%3Crect y='120' width='320' height='60' fill='%230b3b34'/%3E%3C/svg%3E" alt="Wide abstract shape"><figcaption>default (stretched)</figcaption></figure>
  <figure class="contain"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='320' height='180' fill='%2329e2bd'/%3E%3Ccircle cx='260' cy='45' r='34' fill='%23ffd166'/%3E%3Crect y='120' width='320' height='60' fill='%230b3b34'/%3E%3C/svg%3E" alt="Wide abstract shape"><figcaption>contain</figcaption></figure>
  <figure class="cover"><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180'%3E%3Crect width='320' height='180' fill='%2329e2bd'/%3E%3Ccircle cx='260' cy='45' r='34' fill='%23ffd166'/%3E%3Crect y='120' width='320' height='60' fill='%230b3b34'/%3E%3C/svg%3E" alt="Wide abstract shape"><figcaption>cover</figcaption></figure>
</div>`,
            css: `.compare { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin: 0; }
.compare figure { margin: 0; }
.compare img { display: block; width: 100%; aspect-ratio: 1 / 1; border-radius: 8px; }
.compare .contain img { object-fit: contain; background: #eef1f5; }
.compare .cover img { object-fit: cover; }
.compare figcaption { margin-top: 0.35rem; font-size: 12px; color: #5a6675; text-align: center; }`,
          },
          {
            type: 'exercise', id: 'c-l71-x1',
            exercise: {
              id: 'ex-l71',
              instructions: 'Turn the tiles below into a gallery: a responsive grid whose tiles are all 4:3, with the image cropped rather than stretched.',
              languages: ['css'],
              starterCode: { html: '<div class="gallery">\n  <div class="tile"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'180\'%3E%3Crect width=\'320\' height=\'180\' fill=\'%2329e2bd\'/%3E%3C/svg%3E" alt="Tile one"></div>\n  <div class="tile"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'180\'%3E%3Crect width=\'320\' height=\'180\' fill=\'%23ff6b6b\'/%3E%3C/svg%3E" alt="Tile two"></div>\n</div>\n', css: '.gallery {\n  display: grid;\n  \n}\n.tile img {\n  \n}\n' },
              tests: [
                { id: 'ex-l71-t1', label: 'The gallery is a grid with auto-fitting columns', body: 'const g = getComputedStyle(document.querySelector(".gallery")); return g.display === "grid" && g.gridTemplateColumns.split(" ").length > 1' },
                { id: 'ex-l71-t2', label: 'Every image is cropped with object-fit: cover', body: 'return Array.from(document.querySelectorAll(".tile img")).every(img => getComputedStyle(img).objectFit === "cover")' },
                { id: 'ex-l71-t3', label: 'Every tile is 4:3 and the same height', body: 'const r = Array.from(document.querySelectorAll(".tile")).map(x => Math.round(x.getBoundingClientRect().width) / Math.round(x.getBoundingClientRect().height)); return new Set(r.map(v => v.toFixed(2))).size === 1 && Math.abs(r[0] - 1.3333) < 0.1' },
              ],
              hints: ['Three properties: the grid template on the container, a ratio on the image, and the fit on the image.', '`repeat(auto-fit, minmax(110px, 1fr))` gives as many columns as the width allows.', 'Try `grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px;` and `width: 100%; aspect-ratio: 4 / 3; object-fit: cover;`.'],
              solution: { html: '<div class="gallery">\n  <div class="tile"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'180\'%3E%3Crect width=\'320\' height=\'180\' fill=\'%2329e2bd\'/%3E%3C/svg%3E" alt="Tile one"></div>\n  <div class="tile"><img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'320\' height=\'180\'%3E%3Crect width=\'320\' height=\'180\' fill=\'%23ff6b6b\'/%3E%3C/svg%3E" alt="Tile two"></div>\n</div>\n', css: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));\n  gap: 10px;\n}\n.tile img {\n  display: block;\n  width: 100%;\n  aspect-ratio: 4 / 3;\n  object-fit: cover;\n}\n' },
              testNotes: 'The tests read computed `display` and `grid-template-columns`, the `object-fit` of each image, and each tile’s rendered width-to-height ratio.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s34', title: 'CSS Image Gallery quiz', passingScore: 60,
      questions: [
        { id: 'quiz-css-s34-q1', type: 'multiple-choice', prompt: 'What does `object-fit: cover` do?', options: ['Stretches the image to fill the box, distorting it', 'Fills the box and crops whatever overflows', 'Fits the whole image inside the box, leaving gaps', 'Blurs the image to hide the edges'], answer: 1, explanation: '`cover` scales the image until it fills the box in both directions, then crops the overflow. Proportions are preserved.' },
        { id: 'quiz-css-s34-q2', type: 'true-false', prompt: 'Setting `width` and `height` on an `<img>` always gives the box size you asked for without distorting the image.', answer: false, explanation: 'An `<img>` is a replaced element with its own proportions. Setting both dimensions distorts it unless you also set `object-fit`.' },
        { id: 'quiz-css-s34-q3', type: 'code-output', prompt: 'What does this set?', code: '.gallery { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }', options: ['Exactly three equal columns', 'As many columns as fit, each at least 140px and sharing the rest evenly', 'One column that is 140px wide', 'A fixed four-column grid'], answer: 1, explanation: '`auto-fit` collapses empty tracks and `1fr` splits the leftover space, so the grid reflows as the width changes — no media query needed.' },
        { id: 'quiz-css-s34-q4', type: 'blank', prompt: 'Complete the sentence: to give a tile a fixed shape with nothing inside it, use the property ________.', answers: ['aspect-ratio', 'aspect ratio'], explanation: '`aspect-ratio: 4 / 3` gives the box a height from its width, replacing the old `padding-top` percentage spacer.' },
        { id: 'quiz-css-s34-q5', type: 'multiple-choice', prompt: 'Which elements does `object-fit` apply to?', options: ['Any element with children', 'Every element that has a background', 'Replaced elements such as `<img>`, `<video>` and `<canvas>`', 'Only `<img>` elements'], answer: 2, explanation: '`object-fit` controls how a replaced element fills its content box. It has no effect on ordinary elements such as a `<div>`.' },
      ],
    },
  },
  {
    id: 'css-s35',
    title: 'CSS Image Sprites',
    description: 'Combining many icons into one image and pulling the one you want out with `background-position`.',
    lessons: [
      {
        id: 'css-l72',
        title: 'Image Sprites',
        description: 'What a sprite is, why one request can serve many icons, and how `background-position` selects a region.',
        duration: 7,
        objectives: ['Explain what an image sprite is and why it saves requests', 'Select one region of a sprite with `background-position`', 'Point `background-image` at an inline SVG data URI'],
        xp: 48,
        content: [
          { type: 'text', id: 'c-l72-b1', body: 'An image sprite is a single image containing many small graphics laid out in a row or grid. Each icon is shown by giving an element a small box and sliding the sprite behind it with `background-position`.' },
          {
            type: 'demo', id: 'c-l72-d1', title: 'Two icons, one image',
            body: 'Both icons come from the same 32x16 sprite. The only difference is the `background-position`: `0 0` shows the left cell, `-16px 0` slides the image left to reveal the right one. The bordered box is the untrimmed sprite, scaled up three times.',
            html: `<div class="sprite-demo">
  <span class="icon icon-mountain"></span>
  <span class="icon icon-dot"></span>
  <span class="strip"></span>
</div>`,
            css: `.sprite-demo { display: flex; align-items: center; gap: 1rem; }
.icon {
  display: inline-block; width: 16px; height: 16px;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'%3E%3Crect x='1' y='1' width='14' height='14' rx='3' fill='%2329e2bd'/%3E%3Cpath d='M5 11 L8 5 L11 11 Z' fill='%230b3b34'/%3E%3Crect x='17' y='1' width='14' height='14' rx='3' fill='%23ff6b6b'/%3E%3Ccircle cx='24' cy='8' r='4' fill='%23fff'/%3E%3C/svg%3E");
}
.icon-mountain { background-position: 0 0; }
.icon-dot { background-position: -16px 0; }
.strip {
  width: 96px; height: 48px;
  border: 1px solid #d5dae0; border-radius: 6px;
  background-repeat: no-repeat; background-size: 96px 48px;
  background-position: 0 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'%3E%3Crect x='1' y='1' width='14' height='14' rx='3' fill='%2329e2bd'/%3E%3Cpath d='M5 11 L8 5 L11 11 Z' fill='%230b3b34'/%3E%3Crect x='17' y='1' width='14' height='14' rx='3' fill='%23ff6b6b'/%3E%3Ccircle cx='24' cy='8' r='4' fill='%23fff'/%3E%3C/svg%3E");
}`,
            height: 160,
          },
          { type: 'text', id: 'c-l72-b2', body: 'Two elements, one file. Swap the `background-position` and you get a different icon with no extra request and no extra bytes on the wire.' },
          { type: 'heading', id: 'c-l72-h1', level: 3, body: 'Why background-position works' },
          { type: 'code', id: 'c-l72-c1', language: 'css', code: `.icon {\n  width: 16px;\n  height: 16px;\n  background-image: url("sprite.png");\n  background-repeat: no-repeat;\n}\n.icon-a { background-position: 0 0; }\n.icon-b { background-position: -16px 0; }` },
          {
            type: 'list', id: 'c-l72-l1', style: 'bullet',
            items: [
              '**The element is a window.** Its own width and height decide how much of the background is visible.',
              '**`background-position` moves the image, not the element.** A positive value pushes the picture right and down; a negative value pulls it left and up.',
              '**The offsets must match the sprite layout.** With 16px cells, the third icon is `-32px 0` and the second row is `0 -16px`.',
              '**`background-repeat: no-repeat`** stops the picture tiling when the element is larger than one cell.',
              '**`background-size`** scales the sprite before positioning, so one authored at 2x needs its size halved to land on the same cell size.',
            ],
          },
          { type: 'warning', id: 'c-l72-w1', title: 'Sprites have real costs', body: 'The technique dates from an era when every request was expensive. Browsers now cache and pipeline requests so well that a page of separate SVGs is usually just as fast, and sprites have downsides: one misplaced offset shows the wrong icon, the whole file downloads even if you use one cell, and it cannot be cached separately from the rest of the UI.' },
          {
            type: 'example', id: 'c-l72-e1', title: 'Four icons from one data URI', showPreview: true,
            body: 'A custom property holding the sprite, reused by four elements that differ only in `background-position`. This is the shape of a real sprite sheet, with no network request at all.',
            html: `<div class="row">
  <span class="ico c1"></span><span class="ico c2"></span>
  <span class="ico c3"></span><span class="ico c4"></span>
</div>`,
            css: `.row {
  --sprite: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Crect x='1' y='1' width='14' height='14' rx='3' fill='%2329e2bd'/%3E%3Cpath d='M4 12 L8 5 L12 12 Z' fill='%230b3b34'/%3E%3Crect x='17' y='1' width='14' height='14' rx='3' fill='%23ffd166'/%3E%3Ccircle cx='24' cy='8' r='4' fill='%237f1d1d'/%3E%3Crect x='1' y='17' width='14' height='14' rx='3' fill='%234cc9f0'/%3E%3Crect x='5' y='21' width='6' height='6' fill='%23022333'/%3E%3Crect x='17' y='17' width='14' height='14' rx='3' fill='%23f72585'/%3E%3Cpath d='M20 29 L24 21 L28 29 Z' fill='%23fff'/%3E%3C/svg%3E");
}
.ico { width: 16px; height: 16px; background-image: var(--sprite); background-repeat: no-repeat; }
.c1 { background-position: 0 0; }
.c2 { background-position: -16px 0; }
.c3 { background-position: 0 -16px; }
.c4 { background-position: -16px -16px; }`,
          },
          {
            type: 'exercise', id: 'c-l72-x1',
            exercise: {
              id: 'ex-l72',
              instructions: 'Show the second cell of the sprite below: size the element to one cell, do not repeat the image, and shift the background so the right-hand cell lines up.',
              languages: ['css'],
              starterCode: { html: '<span class="ico icon-b"></span>\n', css: `.ico {\n  display: inline-block;\n  background-repeat: no-repeat;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'%3E%3Crect x='1' y='1' width='14' height='14' rx='3' fill='%2329e2bd'/%3E%3Cpath d='M5 11 L8 5 L11 11 Z' fill='%230b3b34'/%3E%3Crect x='17' y='1' width='14' height='14' rx='3' fill='%23ff6b6b'/%3E%3Ccircle cx='24' cy='8' r='4' fill='%23fff'/%3E%3C/svg%3E");\n}\n.icon-b {\n  \n}\n` },
              tests: [
                { id: 'ex-l72-t1', label: 'The element is a 16x16 window', body: 'const s = getComputedStyle(document.querySelector(".ico")); return s.width === "16px" && s.height === "16px"' },
                { id: 'ex-l72-t2', label: 'The sprite is not repeated', body: 'return getComputedStyle(document.querySelector(".ico")).backgroundRepeat === "no-repeat"' },
                { id: 'ex-l72-t3', label: 'The background is shifted to the second cell', body: 'return getComputedStyle(document.querySelector(".ico")).backgroundPosition === "-16px 0px"' },
              ],
              hints: ['The sprite is 32px wide with two 16px cells, so the second cell starts at x = 16.', '`background-position` takes an offset from the top left of the element box. Positive moves the image right, negative moves it left.', 'Set `width: 16px; height: 16px;` on `.ico` and `background-position: -16px 0;` on `.icon-b`.'],
              solution: { html: '<span class="ico icon-b"></span>\n', css: `.ico {\n  display: inline-block;\n  background-repeat: no-repeat;\n  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'%3E%3Crect x='1' y='1' width='14' height='14' rx='3' fill='%2329e2bd'/%3E%3Cpath d='M5 11 L8 5 L11 11 Z' fill='%230b3b34'/%3E%3Crect x='17' y='1' width='14' height='14' rx='3' fill='%23ff6b6b'/%3E%3Ccircle cx='24' cy='8' r='4' fill='%23fff'/%3E%3C/svg%3E");\n}\n.icon-b {\n  width: 16px;\n  height: 16px;\n  background-position: -16px 0;\n}\n` },
              testNotes: 'The tests read the computed width, height, `background-repeat` and `background-position` of `.ico`. Computed positions report both offsets in pixels.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s35', title: 'CSS Image Sprites quiz', passingScore: 60,
      questions: [
        { id: 'quiz-css-s35-q1', type: 'multiple-choice', prompt: 'What is an image sprite?', options: ['A decorative background added behind text', 'One image containing many icons, with a window onto it for each use', 'A CSS animation that cycles through frames', 'A sprite sheet format for 3D game engines'], answer: 1, explanation: 'A sprite packs many small graphics into a single file. Each element shows one cell by setting its own box size and sliding the image with `background-position`.' },
        { id: 'quiz-css-s35-q2', type: 'true-false', prompt: 'Sprites are still the fastest way to load many small icons on any modern site.', answer: false, explanation: 'Browsers cache and pipeline requests well. Sprites trade flexibility for a request count that matters less now, and they invite positioning errors.' },
        { id: 'quiz-css-s35-q3', type: 'code-output', prompt: 'A sprite has 24px cells. What does this show?', code: '.i { width: 24px; height: 24px; background-position: -48px 0; }', options: ['The first cell in the row', 'The third cell in the row', 'The second row, first column', 'Nothing, negative offsets are invalid'], answer: 1, explanation: 'The offsets give the top-left of the visible window in sprite coordinates: x = -48 is 48px into the row, which is the third 24px cell.' },
        { id: 'quiz-css-s35-q4', type: 'blank', prompt: 'Complete the sentence: to stop the sprite tiling when the element is larger than one cell, set `background-repeat: ________`.', answers: ['no-repeat'], explanation: '`no-repeat` draws the image once at its positioned spot instead of repeating it across the element.' },
        { id: 'quiz-css-s35-q5', type: 'multiple-choice', prompt: 'Why is an inline SVG data URI a good sprite source for a self-contained demo?', options: ['Data URIs are compressed by the browser', 'It needs no network request and no extra file, so the technique is shown offline', 'Data URIs load faster than any file', 'It makes `background-position` move the icons for you'], answer: 1, explanation: 'A data URI lives in the stylesheet itself, so there is nothing to fetch. The positioning technique is identical to one using a real sprite file.' },
      ],
    },
  },
]