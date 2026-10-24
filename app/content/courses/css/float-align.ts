import type { Section } from '~/types/content'

export const cssFloatAlignSections: Section[] = [
  {
    id: 'css-s25',
    title: 'CSS Float',
    description: 'How floats pulled an element out of the normal flow, how clearing repaired the damage, and why you read this section rather than use it.',
    lessons: [
      {
        id: 'css-l58',
        title: 'Float',
        description: 'What `float` does, why text wraps around it, and why floats are a legacy technique you should understand but not reach for.',
        duration: 6,
        objectives: [
          'Set an element to float left, right or not at all',
          'Explain why text wraps beside a floated element instead of below it',
          'Describe what happens to the parent of an uncleared float',
          'Name the two modern layout systems that replace almost every float',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-css-l58',
          title: 'Float quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l58-q1',
              type: 'multiple-choice',
              prompt: 'What does `float` do to an element?',
              options: [
                'Gives it a higher z-index than its siblings',
                'Removes it from the normal flow and pushes it to one side',
                'Makes it scroll horizontally when it overflows',
                'Converts it into a table cell',
              ],
              answer: 1,
              explanation: 'A float is taken out of normal flow and placed at an edge of its container, so other content flows around it.',
            },
            {
              id: 'quiz-css-l58-q2',
              type: 'code-output',
              prompt: 'What does this set?',
              code: '.p { float: left; width: 100px; }',
              options: [
                'The paragraph is centred',
                'The paragraph floats left and following text wraps down its right side',
                'The paragraph becomes a 100px wide block',
                'Nothing, floats only work on images',
              ],
              answer: 1,
              explanation: 'The width applies and the element is floated left, so following text wraps beside it.',
            },
            {
              id: 'quiz-css-l58-q3',
              type: 'multiple-choice',
              prompt: 'Which three values does `float` accept in practice?',
              options: [
                '`start`, `end`, `auto`',
                '`top`, `bottom`, `none`',
                '`left`, `right`, `none`',
                '`inline`, `block`, `none`',
              ],
              answer: 2,
              explanation: '`left` and `right` push the element to an edge, and `none` is the default that removes any float. There is no `float: center`.',
            },
            {
              id: 'quiz-css-l58-q4',
              type: 'multiple-choice',
              prompt: 'Which two layout systems replace almost every use of floats?',
              options: [
                'Flexbox and grid',
                'Tables and absolute positioning',
                'Inline-block and multi-column',
                'Position sticky and transforms',
              ],
              answer: 0,
              explanation: 'Flexbox and grid keep items in flow, so columns, sidebars and horizontal strips need no float and no clearing step.',
            },
            {
              id: 'quiz-css-l58-q5',
              type: 'true-false',
              prompt: 'A second element with `float: left` sits beside the first floated element rather than dropping below it.',
              answer: true,
              explanation: 'Floats stack along the edge, so consecutive left floats line up next to each other until the line runs out of room.',
            },
          ],
        },
        content: [
          { type: 'text', id: 'c-l58-b1',
            body: '`float` takes an element out of the normal top-to-bottom flow and pushes it to one side of its container. Everything else in the container flows *around* it, which is what makes floats useful for wrapping text beside an image.' },
          { type: 'demo', id: 'c-l58-d1',
            title: 'Text wrapping around a floated box',
            body: 'The box floats left. The paragraph narrows into the space beside it, then returns to full width once it passes the bottom of the box.',
            html: `<div class="wrap-demo">
  <div class="float-box">Floated</div>
  <p>The box above has been pushed to the left edge, so this paragraph no longer starts at the container's left edge — it starts wherever the box ends. That is the whole mechanism.</p>
  <p>A second paragraph, to show that the wrap happens per line, not per block.</p>
</div>`,
            css: `.wrap-demo { border: 1px solid #d5dae0; border-radius: 10px; padding: 1rem; font-size: 14px; line-height: 1.6; }
.wrap-demo p { margin: 0 0 0.75rem; }
.float-box { float: left; width: 110px; height: 110px; margin: 0 1rem 0.5rem 0; border-radius: 10px; background: linear-gradient(135deg, #29e2bd, #1c9e86); color: #06231d; font-weight: 600; display: flex; align-items: center; justify-content: center; }`,
            height: 260 },
          { type: 'text', id: 'c-l58-b2',
            body: 'Three values cover almost everything: `left`, `right` and `none`. `none` is the default, so an element that is not floated behaves like any other block.' },
          { type: 'heading', id: 'c-l58-h1', level: 3, body: 'How it works' },
          { type: 'code', id: 'c-l58-c1', language: 'css',
            code: `.float-box {
  float: left;
  width: 110px;
  height: 110px;
}` },
          { type: 'list', id: 'c-l58-l1', style: 'bullet', items: [
            '**`float: left`** pins the element to the left edge; inline content flows down its right side.',
            '**`float: right`** mirrors it, pinning to the right edge with content down the left.',
            '**`float: none`** removes any float. This is the initial value.',
            'A float is still a block-level box: it accepts `width` and `height`, and `margin` works on it.',
            'Floats stack. A second left float sits beside the first instead of below it.',
            'A float cannot be pushed above or below its container — it stays at the top of its line.',
          ] },
          { type: 'warning', id: 'c-l58-w1', title: 'Floats are a legacy technique',
            body: 'You will find floats everywhere in old stylesheets, and plenty of tutorials still teach them first. Do not follow that lead. Nearly everything floats were used for — columns, sidebars, horizontal strips, centring — is better done with **flexbox** or **grid**, which have no wrap bugs and no clearing step. Learn this lesson so the floats in code you inherit make sense, then build new layouts with flexbox.' },
          { type: 'tip', id: 'c-l58-t1', title: 'A float does not know it should stop',
            body: 'A float escapes its parent and can spill into whatever follows it on the page. Nothing about `float` says "stay inside this box". Clearing puts a boundary back, which is the next lesson.' },
          { type: 'exercise', id: 'c-l58-x1', exercise: {
            id: 'ex-l58',
            instructions: 'Float the box to the left of the paragraph, so the text wraps around it.',
            languages: ['css'],
            starterCode: { html: '<div class="layout">\n  <div class="box">Box</div>\n  <p>Text that wraps around the floated box.</p>\n</div>\n', css: '.box {\n  \n}\n.layout p { margin: 0; font-size: 14px; }\n' },
            tests: [
              { id: 'ex-l58-t1', label: 'The box floats left', body: 'return getComputedStyle(document.querySelector(".box")).float === "left"' },
              { id: 'ex-l58-t2', label: 'The box keeps its background', body: 'return getComputedStyle(document.querySelector(".box")).backgroundColor !== "rgba(0, 0, 0, 0)"' },
              { id: 'ex-l58-t3', label: 'The box keeps a visible width', body: 'return parseFloat(getComputedStyle(document.querySelector(".box")).width) > 0' },
            ],
            hints: ['Add a `float` declaration to `.box`.', 'The three values are `left`, `right` and `none`.', 'Try `.box { float: left; width: 80px; height: 80px; }`'],
            solution: { html: '<div class="layout">\n  <div class="box">Box</div>\n  <p>Text that wraps around the floated box.</p>\n</div>\n', css: '.box {\n  float: left;\n  width: 80px;\n  height: 80px;\n}\n.layout p { margin: 0; font-size: 14px; }\n' },
            testNotes: 'The tests read the computed `float`, background colour and rendered width of `.box`.',
          } },
        ],
      },
      {
        id: 'css-l59',
        title: 'Clear',
        description: 'How `clear` pushes content below a float, the `::after` clearfix, and the collapsed parent you get when nobody clears.',
        duration: 6,
        objectives: [
          'Clear left, right or both sides with the `clear` property',
          'Write the `::after` clearfix in three declarations',
          'Explain why an uncleared float makes its parent collapse to zero height',
          'Diagnose a collapsed parent by measuring it in the browser',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-css-l59',
          title: 'Clear quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l59-q1',
              type: 'true-false',
              prompt: 'A floated element adds its height to the height of its parent.',
              answer: false,
              explanation: 'It does not. That is why a parent containing only floated children collapses to zero height until something clears.',
            },
            {
              id: 'quiz-css-l59-q2',
              type: 'blank',
              prompt: 'Complete the clearfix: set `.parent::after` to `content: ""`, `display: block` and `clear: ________`.',
              answers: [
                'both',
              ],
              explanation: '`clear: both` moves the generated element below floats on both sides, which gives the parent its height back.',
            },
            {
              id: 'quiz-css-l59-q3',
              type: 'multiple-choice',
              prompt: 'Which value of `clear` drops an element below floats on both sides?',
              options: [
                '`clear: left`',
                '`clear: both`',
                '`clear: right`',
                '`clear: none`',
              ],
              answer: 1,
              explanation: '`both` clears left and right floats, which is why the clearfix uses it almost every time. `left` and `right` only clear one side.',
            },
            {
              id: 'quiz-css-l59-q4',
              type: 'multiple-choice',
              prompt: 'Why does the clearfix use `::after` rather than a real child element?',
              options: [
                '`::after` is the only pseudo-element that accepts `content`',
                'A real child cannot be given the `clear` property',
                'A real child would become a flex item',
                'An element cannot be its own child, so a generated pseudo-element is appended inside the parent',
              ],
              answer: 3,
              explanation: 'You cannot append a clearing box from inside the parent as a real child, but `::after` is generated inside it. Making it a block with `clear: both` drags the parent height with it.',
            },
            {
              id: 'quiz-css-l59-q5',
              type: 'multiple-choice',
              prompt: 'Why is the collapsed-parent problem absent in a flex container?',
              options: [
                'Flex containers always have a fixed height',
                'Flexbox ignores the `float` property and removes the element',
                'Flex items stay in flow, so the container sizes itself to its content',
                'Flex containers add an automatic clearfix',
              ],
              answer: 2,
              explanation: 'Nothing in a flex container is taken out of flow, so the container always grows to fit its items and no clearing is needed.',
            },
          ],
        },
        content: [
          { type: 'text', id: 'c-l59-b1',
            body: '`clear` stops an element from sitting beside a float. An element with `clear` drops below any float that came before it, so the float stops overlapping whatever comes next.' },
          { type: 'demo', id: 'c-l59-d1',
            title: 'Collapsed parent versus cleared parent',
            body: 'Both boxes hold the same float and the same paragraph. On the left nothing is cleared, so the parent has collapsed to almost nothing and the content hangs out below it. On the right a clearfix gives the parent its height back.',
            html: `<div class="pair">
  <div class="side">
    <p class="tag bad">not cleared</p>
    <div class="parent collapsed">
      <div class="floater">Float</div>
      <p>This paragraph sits beside the float and outside the parent box, because the parent never grew to fit it.</p>
    </div>
  </div>
  <div class="side">
    <p class="tag good">cleared</p>
    <div class="parent cleared">
      <div class="floater">Float</div>
      <p>This paragraph sits beside the float and the parent box now contains both of them.</p>
    </div>
  </div>
</div>`,
            css: `.pair { display: flex; gap: 1rem; font-size: 13px; }
.side { flex: 1; }
.tag { margin: 0 0 0.4rem; font-weight: 600; }
.tag.bad { color: #b42318; }
.tag.good { color: #1c9e86; }
.parent { border: 1px dashed #b42318; border-radius: 8px; padding: 0.75rem; background: #fff7f6; }
.parent.cleared { border-color: #1c9e86; background: #f2fbf8; }
.parent.cleared::after { content: ""; display: block; clear: both; }
.floater { float: left; width: 70px; height: 70px; margin: 0 0.75rem 0.5rem 0; border-radius: 8px; background: linear-gradient(135deg, #29e2bd, #1c9e86); display: flex; align-items: center; justify-content: center; font-weight: 600; }
.parent p { margin: 0; line-height: 1.5; }`,
            height: 280 },
          { type: 'text', id: 'c-l59-b2',
            body: 'The failure on the left is the one that costs people hours. A float is out of flow, so it contributes **no height** to its parent. If every child of a parent is floated, the parent has nothing left to give it a height and collapses to zero. Add a border and you see a thin line with the content spilling out underneath it.' },
          { type: 'heading', id: 'c-l59-h1', level: 3, body: 'How it works' },
          { type: 'code', id: 'c-l59-c1', language: 'css',
            code: `.cleared::after {
  content: "";
  display: block;
  clear: both;
}` },
          { type: 'list', id: 'c-l59-l1', style: 'bullet', items: [
            '**`clear: both`** drops below left and right floats. This is the value you want almost every time.',
            '**`clear: left`** and **`clear: right`** drop below floats on that side only.',
            '**`clear: none`** is the default, and clears nothing.',
            '`clear` only ever moves an element *down*. It cannot pull anything up beside a float.',
            'It still shares horizontal space with what follows it — only its own top edge is pushed down.',
          ] },
          { type: 'tip', id: 'c-l59-t1', title: 'Why the clearfix uses ::after',
            body: 'An element cannot be its own child, so you cannot append a clearing element from inside the parent. A generated `::after` can. Making it `display: block` turns it into a real box that occupies space, and `clear: both` moves that box below the floats — which drags the parent height with it.' },
          { type: 'tip', id: 'c-l59-t2', title: 'In flex and grid the problem does not exist',
            body: 'Flex items and grid items are never taken out of flow, so those containers always size themselves to their content. If you are writing a clearfix today, check whether the parent could simply be `display: flex`.' },
          { type: 'exercise', id: 'c-l59-x1', exercise: {
            id: 'ex-l59',
            instructions: 'Apply the clearfix to `.card` so the floated `.badge` is contained inside it instead of spilling out below.',
            languages: ['css'],
            starterCode: { html: '<div class="card">\n  <div class="badge">New</div>\n  <p>The badge floats, so the card must contain it.</p>\n</div>\n', css: '.badge { float: left; width: 60px; height: 60px; border-radius: 8px; background: #29e2bd; }\n.card { border: 1px solid #d5dae0; padding: 1rem; }\n.card::after {\n  \n}\n' },
            tests: [
              { id: 'ex-l59-t1', label: 'The ::after pseudo-element clears both sides', body: 'return getComputedStyle(document.querySelector(".card"), "::after").clear === "both"' },
              { id: 'ex-l59-t2', label: 'The ::after pseudo-element is a block', body: 'return getComputedStyle(document.querySelector(".card"), "::after").display === "block"' },
              { id: 'ex-l59-t3', label: 'The ::after pseudo-element has generated content', body: 'return getComputedStyle(document.querySelector(".card"), "::after").content !== "none"' },
            ],
            hints: ['A clearfix needs three declarations on `.card::after`: `content`, `display` and `clear`.', 'Without `content: "";` the generated element is not rendered at all.', 'Try `content: ""; display: block; clear: both;`'],
            solution: { html: '<div class="card">\n  <div class="badge">New</div>\n  <p>The badge floats, so the card must contain it.</p>\n</div>\n', css: '.badge { float: left; width: 60px; height: 60px; border-radius: 8px; background: #29e2bd; }\n.card { border: 1px solid #d5dae0; padding: 1rem; }\n.card::after { content: ""; display: block; clear: both; }\n' },
            testNotes: 'The tests read the computed style of the generated `.card::after` pseudo-element.',
          } },
        ],
      },
      {
        id: 'css-l60',
        title: 'Float Examples',
        description: 'Two realistic float layouts — a magazine text wrap and an image with a caption — then an honest look at why the pattern is dated.',
        duration: 5,
        objectives: [
          'Build a magazine-style wrap where text runs down the side of a block',
          'Pair a block image with a caption that clears cleanly',
          'Recognise the two-column float layout in older stylesheets',
          'Say which flexbox pattern replaces each float example',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-css-l60',
          title: 'Float Examples quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l60-q1',
              type: 'multiple-choice',
              prompt: 'A parent box has collapsed to zero height around a floated child. What fixes it?',
              options: [
                'Adding `overflow: hidden` to the parent',
                'Setting `position: relative` on the float',
                'Clearing the float, or making the parent a flex or grid container',
                'Adding a fixed height in pixels to the parent',
              ],
              answer: 2,
              explanation: 'Clearing the float restores the height. Flex and grid containers size themselves to their content, so they avoid the problem entirely.',
            },
            {
              id: 'quiz-css-l60-q2',
              type: 'multiple-choice',
              prompt: 'What does `display: flow-root` do to a container holding floats?',
              options: [
                'It establishes a new formatting context, so the container contains its floats',
                'It turns the container into a flex row',
                'It floats the container itself',
                'It hides any content that overflows',
              ],
              answer: 0,
              explanation: '`flow-root` makes the element establish its own formatting context, which contains the floats in one declaration instead of a `::after` clearfix.',
            },
            {
              id: 'quiz-css-l60-q3',
              type: 'multiple-choice',
              prompt: 'Which flexbox pattern replaces a two-column float layout?',
              options: [
                '`float: both` on the parent',
                '`display: flex` on the parent with `flex: 1` on each column',
                '`display: block` on each column',
                '`position: absolute` on each column',
              ],
              answer: 1,
              explanation: 'A flex row with `flex: 1` on each child gives equal columns with no clearing, and `align-items` handles the equal-height problem floats cannot solve.',
            },
            {
              id: 'quiz-css-l60-q4',
              type: 'multiple-choice',
              prompt: 'Which problem has no clean float answer when building columns?',
              options: [
                'Setting a background colour on a column',
                'Adding padding inside a column',
                'Putting a border on a column',
                'Making columns of unequal height line up',
              ],
              answer: 3,
              explanation: 'Floated columns do not equalise their heights, so the tallest one wins and the others leave ragged edges. Flexbox gets this from `align-items: stretch` for free.',
            },
            {
              id: 'quiz-css-l60-q5',
              type: 'multiple-choice',
              prompt: 'Which modern tool still handles the magazine text-wrap case best?',
              options: [
                '`transform: translate`',
                '`display: table`',
                '`shape-outside` on a floated image',
                '`position: fixed`',
              ],
              answer: 2,
              explanation: 'Text flowing around a shape has no exact flex or grid replacement, so `shape-outside` on a float remains the recommended tool for that one case.',
            },
          ],
        },
        content: [
          { type: 'text', id: 'c-l60-b1',
            body: 'These are the two shapes floats were invented for, and you will still find both in older code. The gradient blocks stand in for images, so nothing has to load from the network.' },
          { type: 'demo', id: 'c-l60-d1',
            title: 'Magazine wrap and a captioned figure',
            body: 'On the left, a block floated right with text wrapping down its side and back to full width underneath. On the right, the same idea at card size: a "photo" with its caption beside it.',
            html: `<div class="cols">
  <div class="magazine">
    <div class="hero"></div>
    <p>Float-based text wrap. The block sits on the right, and every line here is squeezed into the narrow column beside it until the block ends. This is exactly how print typography behaved, which is why floats still look convincing even though the technique underneath is obsolete.</p>
    <p>Once the text passes the bottom of the float it returns to the full width of the column.</p>
    <div class="caption">Figure 1 — the floated block the copy wrapped around.</div>
  </div>
  <div class="card">
    <div class="shot"></div>
    <div class="copy">
      <h4>Harbour, 06:40</h4>
      <p>A small caption beside the image instead of below it.</p>
    </div>
  </div>
</div>`,
            css: `.cols { display: flex; gap: 1rem; align-items: flex-start; font-size: 13px; }
.magazine { flex: 3; line-height: 1.6; }
.magazine p { margin: 0 0 0.6rem; }
.hero { float: right; width: 130px; height: 130px; margin: 0 0 0.5rem 1rem; border-radius: 10px; background: linear-gradient(135deg, #29e2bd, #0f6f5e); }
.caption { clear: both; border-top: 1px solid #d5dae0; padding-top: 0.5rem; font-size: 12px; color: #5b6672; }
.card { flex: 1; display: flow-root; border: 1px solid #d5dae0; border-radius: 10px; overflow: hidden; }
.shot { float: left; width: 92px; height: 92px; background: linear-gradient(135deg, #f7b267, #c1553a); }
.copy { padding: 0.75rem; }
.copy h4 { margin: 0 0 0.3rem; font-size: 13px; }
.copy p { margin: 0; line-height: 1.45; }`,
            height: 310 },
          { type: 'text', id: 'c-l60-b2',
            body: 'The second column uses `display: flow-root` instead of a clearfix. That one declaration makes the element establish its own formatting context, so it contains its floats — the modern one-line version of the same fix. Worth knowing, because it is what to write instead of `::after` when you inherit a float you must keep.' },
          { type: 'heading', id: 'c-l60-h1', level: 3, body: 'Why the pattern is dated' },
          { type: 'list', id: 'c-l60-l1', style: 'ordered', items: [
            '**Vertical centring is impossible.** A float sits at the top of its line box; centring one needs a fake-element hack.',
            '**Every column needs a clear.** Three floated columns need two clearfixes, and one forgotten clear drops the next section on top of them.',
            '**Order is baked in.** Floats rearrange visually without changing DOM order, so tab and screen reader order drift away from what is on screen.',
            '**Unequal heights need extra markup.** The "tallest column wins" problem has no clean float answer, which is exactly what `align-items` is for.',
            '**Responsive is painful.** Turning three columns into one means a media query that switches off every float — something flexbox does with `flex-wrap`.',
          ] },
          { type: 'tip', id: 'c-l60-t1', title: 'What to use instead',
            body: 'The magazine wrap is the one case with no exact modern replacement, and even there `shape-outside` on a floated image still does the job best. The captioned figure is simply a flex row. The column layout is `display: flex` with `flex: 1` on each child and no clearing at all.' },
          { type: 'exercise', id: 'c-l60-x1', exercise: {
            id: 'ex-l60',
            instructions: 'Float the swatch to the right of the paragraph and clear the credit line so it sits underneath both.',
            languages: ['css'],
            starterCode: { html: '<div class="entry">\n  <div class="swatch"></div>\n  <p>The swatch floats right and the copy wraps beside it.</p>\n  <div class="credit">Photo credit</div>\n</div>\n', css: '.swatch { width: 70px; height: 70px; border-radius: 8px; background: linear-gradient(135deg, #29e2bd, #1c9e86); }\n.credit { border-top: 1px solid #d5dae0; padding-top: 0.5rem; font-size: 12px; }\n' },
            tests: [
              { id: 'ex-l60-t1', label: 'The swatch floats right', body: 'return getComputedStyle(document.querySelector(".swatch")).float === "right"' },
              { id: 'ex-l60-t2', label: 'The credit line clears both sides', body: 'return getComputedStyle(document.querySelector(".credit")).clear === "both"' },
              { id: 'ex-l60-t3', label: 'The credit line is pushed clear of the float', body: 'const s = getComputedStyle(document.querySelector(".credit")); return s.clear !== "none"' },
            ],
            hints: ['Two declarations: one `float` on `.swatch`, one `clear` on `.credit`.', '`clear` only moves an element down, so it belongs on the element that comes last.', 'Try `float: right;` on `.swatch` and `clear: both;` on `.credit`.'],
            solution: { html: '<div class="entry">\n  <div class="swatch"></div>\n  <p>The swatch floats right and the copy wraps beside it.</p>\n  <div class="credit">Photo credit</div>\n</div>\n', css: '.swatch { float: right; width: 70px; height: 70px; margin: 0 0 0.5rem 1rem; border-radius: 8px; background: linear-gradient(135deg, #29e2bd, #1c9e86); }\n.credit { clear: both; border-top: 1px solid #d5dae0; padding-top: 0.5rem; font-size: 12px; }\n' },
            testNotes: 'The tests read the computed `float` of `.swatch` and the computed `clear` of `.credit`.',
          } },
        ],
      },
    ],
  },
  {
    id: 'css-s26',
    title: 'CSS Inline-block',
    description: 'The display value between `inline` and `block`: it flows inline like text but accepts width, height and vertical-align.',
    lessons: [
      {
        id: 'css-l61',
        title: 'Inline-block',
        description: 'How `inline-block` bridges inline and block behaviour, why adjacent inline-blocks get a whitespace gap, and when it is still the right tool.',
        duration: 5,
        objectives: [
          'Explain the two behaviours `inline-block` combines',
          'Accept width and height where `inline` cannot',
          'Shift an inline-block with `vertical-align`',
          'Remove the whitespace gap between adjacent inline-blocks',
        ],
        xp: 35,
        quiz: {
          id: 'quiz-css-l61',
          title: 'Inline-block quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l61-q1',
              type: 'multiple-choice',
              prompt: 'Which behaviours does `inline-block` combine?',
              options: [
                'It floats left by default, like `float: left`',
                'It flows inline like `inline`, and accepts width and height like `block`',
                'It becomes invisible to screen readers',
                'It positions absolutely inside its parent',
              ],
              answer: 1,
              explanation: 'It keeps the inline flow behaviour while honouring the box dimensions a block-level box can take.',
            },
            {
              id: 'quiz-css-l61-q2',
              type: 'true-false',
              prompt: 'Setting `width` and `height` on an element with `display: inline` changes its size.',
              answer: false,
              explanation: 'Inline boxes ignore both properties. Switching to `inline-block` makes them apply.',
            },
            {
              id: 'quiz-css-l61-q3',
              type: 'code-output',
              prompt: 'Three inline-block boxes written on separate lines. What do you see?',
              code: '<span class="x">A</span>\n<span class="x">B</span>\n<span class="x">C</span>',
              options: [
                'Three boxes stacked vertically',
                'Three boxes side by side with a small whitespace gap between each',
                'One box containing the other two',
                'The boxes overlapping',
              ],
              answer: 1,
              explanation: 'The newlines between the tags collapse into a real space between the inline-block boxes.',
            },
            {
              id: 'quiz-css-l61-q4',
              type: 'blank',
              prompt: 'Fill in the gap: `vertical-align` works on `inline` and `inline-block` elements and on table cells, but never on a ________ block.',
              answers: [
                'normal',
                'block-level',
              ],
              explanation: 'A normal block-level element has no baseline to align against, so `vertical-align` does nothing to it.',
            },
            {
              id: 'quiz-css-l61-q5',
              type: 'multiple-choice',
              prompt: 'You want a row of boxes with no whitespace gap between them. Best modern fix?',
              options: [
                'Add `letter-spacing: -4px` to the boxes',
                'Put the tags on one line with no space between them',
                'Make the parent `display: flex`',
                'Set `white-space: normal` on the parent',
              ],
              answer: 2,
              explanation: 'A flex container ignores whitespace between its children entirely, and it also gives you alignment and wrapping control.',
            },
          ],
        },
        content: [
          { type: 'text', id: 'c-l61-b1',
            body: '`inline-block` is a hybrid. The element flows inline with surrounding text, like `inline`, but it also behaves like `block` for sizing: it accepts `width`, `height` and `vertical-align`. It is the escape hatch from the rule that inline elements ignore dimensions.' },
          { type: 'demo', id: 'c-l61-d1',
            title: 'inline versus inline-block versus block',
            body: 'Three rows, the same three boxes each time. In the top row the boxes are `inline`, so width and height do nothing. In the middle row they are `inline-block`, so the dimensions apply and they sit side by side. In the bottom row they are `block`, so each fills the line and drops onto its own row.',
            html: `<div class="compare">
  <p class="row-label">display: inline</p>
  <div class="line"><div class="unit a">A</div><div class="unit b">B</div><div class="unit c">C</div></div>
  <p class="row-label">display: inline-block</p>
  <div class="line"><div class="unit ib a">A</div><div class="unit ib b">B</div><div class="unit ib c">C</div></div>
  <p class="row-label">display: block</p>
  <div class="line"><div class="unit blk a">A</div><div class="unit blk b">B</div><div class="unit blk c">C</div></div>
</div>`,
            css: `.compare { font-size: 13px; }
.row-label { margin: 0.75rem 0 0.35rem; font-weight: 600; color: #5b6672; }
.line { border: 1px dashed #d5dae0; border-radius: 8px; padding: 0.5rem; white-space: nowrap; overflow: hidden; }
.unit { width: 90px; height: 44px; color: #06231d; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; border-radius: 6px; }
.unit.a { background: linear-gradient(135deg, #b8f5e6, #6fdcc0); }
.unit.b { background: linear-gradient(135deg, #ffe2b8, #f7b267); }
.unit.c { background: linear-gradient(135deg, #ffd0d8, #f78ba3); }
.unit.ib { display: inline-block; vertical-align: top; }
.unit.blk { display: block; margin-bottom: 4px; }`,
            height: 330 },
          { type: 'text', id: 'c-l61-b2',
            body: 'Look closely at the middle row. The boxes are correctly sized, but there is a visible gap between each pair — that is the whitespace between the tags collapsing into a real space.' },
          { type: 'heading', id: 'c-l61-h1', level: 3, body: 'How it works' },
          { type: 'code', id: 'c-l61-c1', language: 'css',
            code: `.unit {
  display: inline-block;
  width: 90px;
  height: 44px;
  vertical-align: top;
}` },
          { type: 'list', id: 'c-l61-l1', style: 'bullet', items: [
            '**Width and height work.** An `inline` box ignores both; an `inline-block` box honours them.',
            '**It still flows inline.** It sits on a text line, wraps to the next line when the line is full, and can live inside a heading.',
            '**`vertical-align` applies.** `top`, `middle`, `bottom` and `baseline` all work, and `baseline` is the default.',
            '**The whitespace gap is real.** A space between the tags becomes a text space between the boxes, about 4px wide.',
            '**Internally it is still a block box.** Margins, padding and borders apply exactly as they would to a block.',
          ] },
          { type: 'tip', id: 'c-l61-t1', title: 'Killing the whitespace gap',
            body: 'Put the tags on one line, or set `font-size: 0` on the parent and restore it on the children, or use a flex parent. If you need one of those tricks regularly, the flex parent is the answer.' },
          { type: 'exercise', id: 'c-l61-x1', exercise: {
            id: 'ex-l61',
            instructions: 'Make `.badge` an inline-block that is 70px wide and 34px tall, aligned to the top of the line.',
            languages: ['css'],
            starterCode: { html: '<p class="line">Inline <span class="badge">New</span> text continues here.</p>\n', css: '.badge { background: #29e2bd; border-radius: 6px; }\n.line { font-size: 15px; }\n' },
            tests: [
              { id: 'ex-l61-t1', label: 'The badge is inline-block', body: 'return getComputedStyle(document.querySelector(".badge")).display === "inline-block"' },
              { id: 'ex-l61-t2', label: 'The badge is 70px wide', body: 'return getComputedStyle(document.querySelector(".badge")).width === "70px"' },
              { id: 'ex-l61-t3', label: 'The badge is 34px tall and aligned to the top', body: 'const s = getComputedStyle(document.querySelector(".badge")); return s.height === "34px" && s.verticalAlign === "top"' },
            ],
            hints: ['An inline element ignores `width` and `height`. `display: inline-block` makes them apply.', '`vertical-align: top` sticks the badge to the top of the line instead of the baseline.', 'Try `display: inline-block; width: 70px; height: 34px; vertical-align: top;`'],
            solution: { html: '<p class="line">Inline <span class="badge">New</span> text continues here.</p>\n', css: '.badge { display: inline-block; width: 70px; height: 34px; vertical-align: top; background: #29e2bd; border-radius: 6px; }\n.line { font-size: 15px; }\n' },
            testNotes: 'The tests read the computed `display`, `width`, `height` and `vertical-align` of `.badge`.',
          } },
        ],
      },
    ],
  },
  {
    id: 'css-s27',
    title: 'CSS Align',
    description: 'Horizontal and vertical centring with `text-align`, `margin: auto` and flexbox — plus the `vertical-align` misconception that catches everyone.',
    lessons: [
      {
        id: 'css-l62',
        title: 'Align',
        description: 'Centring content with `text-align`, `margin: auto` and flexbox, plus why `vertical-align` never moves a normal block.',
        duration: 7,
        objectives: [
          'Centre inline content with `text-align`',
          'Centre a block-level element with `margin: auto` and a defined width',
          'Centre content in both directions with flexbox',
          'Explain why `vertical-align` has no effect on a normal block element',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-css-l62',
          title: 'Align quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l62-q1',
              type: 'multiple-choice',
              prompt: 'How do you horizontally centre a text paragraph inside its container?',
              options: [
                '`margin: 0 auto` on the paragraph',
                '`text-align: center` on the paragraph or its parent',
                '`vertical-align: middle` on the paragraph',
                '`float: center` on the paragraph',
              ],
              answer: 1,
              explanation: '`text-align` handles inline content including text. `margin: 0 auto` centres the block box itself, not the text inside it.',
            },
            {
              id: 'quiz-css-l62-q2',
              type: 'true-false',
              prompt: '`vertical-align: middle` will vertically centre an ordinary block-level `div` that has no text around it.',
              answer: false,
              explanation: '`vertical-align` only aligns against a baseline, which exists for inline-level and table-cell content. On a plain block it does nothing.',
            },
            {
              id: 'quiz-css-l62-q3',
              type: 'code-output',
              prompt: 'What does this do?',
              code: '.box {\n  width: 300px;\n  margin: 0 auto;\n}',
              options: [
                'Centres the box vertically in its parent',
                'Centres the box horizontally by dividing the leftover space equally',
                'Centres the text inside the box',
                'Makes the box absolutely positioned and centred',
              ],
              answer: 1,
              explanation: 'Auto left and right margins split the remaining horizontal space evenly. Vertical auto margins resolve to zero.',
            },
            {
              id: 'quiz-css-l62-q4',
              type: 'blank',
              prompt: 'Name the flexbox property that centres an item along the main axis: `________`.',
              answers: [
                'justify-content',
              ],
              explanation: '`justify-content` works along the main axis and `align-items` along the cross axis. On a row container that is horizontal and vertical respectively.',
            },
            {
              id: 'quiz-css-l62-q5',
              type: 'multiple-choice',
              prompt: 'Which of these does `vertical-align` apply to?',
              options: [
                'Any element with a `height` set',
                'Only absolutely positioned elements',
                'Inline-level elements, table cells, and flex or grid items',
                'Block-level elements with a fixed height',
              ],
              answer: 2,
              explanation: 'It aligns against a baseline or the cell box, so it needs inline-level, table-cell, flex or grid context to have any effect.',
            },
          ],
        },
        content: [
          { type: 'text', id: 'c-l62-b1',
            body: 'Centring is the one alignment task that should take one line. Three tools, three situations: `text-align` for text and inline content, `margin: auto` for a block, and flexbox when you also need vertical centring.' },
          { type: 'demo', id: 'c-l62-d1',
            title: 'Vertically centred versus not',
            body: 'Both boxes are 160px tall and hold the same label. The left one is a flex container and the label sits dead centre, both ways. The right one does nothing, so the label sits up at the top of the box.',
            html: `<div class="pairs">
  <div class="col">
    <p class="row-label">display: flex + align-items</p>
    <div class="tall centered"><span class="label">Centred</span></div>
  </div>
  <div class="col">
    <p class="row-label">no vertical centring</p>
    <div class="tall plain"><span class="label plain-label">Not centred</span></div>
  </div>
</div>`,
            css: `.pairs { display: flex; gap: 1rem; font-size: 13px; }
.col { flex: 1; }
.row-label { margin: 0 0 0.4rem; font-weight: 600; color: #5b6672; }
.tall { height: 160px; border: 1px solid #d5dae0; border-radius: 10px; background: linear-gradient(135deg, #f6fbf9, #e6f7f2); }
.tall.centered { display: flex; align-items: center; justify-content: center; }
.label { font-weight: 600; color: #06231d; }
.plain-label { background: linear-gradient(135deg, #ffe2b8, #f7b267); padding: 2px 6px; border-radius: 4px; }`,
            height: 230 },
          { type: 'text', id: 'c-l62-b2',
            body: 'The right-hand label is not centred because nothing told it to be. Its parent is a block box, and block boxes have no baseline to align against.' },
          { type: 'heading', id: 'c-l62-h1', level: 3, body: 'The vertical-align trap' },
          { type: 'text', id: 'c-l62-b3',
            body: '`vertical-align` is one of the most misused properties in CSS. It lines an element up against **the baseline of a line of text** — that is all it ever did. So it works on `inline` and `inline-block` elements, on table cells and rows, and on flex and grid items. Applied to a normal block-level `div` with no text around it, it does nothing at all, because there is no baseline to align against. If someone tells you to vertically centre a box with `vertical-align: middle`, they are describing a table cell, not a div.' },
          { type: 'list', id: 'c-l62-l1', style: 'bullet', items: [
            '**Horizontal, inline content:** `text-align: center` on the parent. It is inherited, so it hits every descendant.',
            '**Horizontal, one block:** give it a `width`, then `margin: 0 auto`. Auto margins split the leftover space equally.',
            '**Both directions:** `display: flex` with `justify-content: center` horizontally and `align-items: center` vertically.',
            '**Vertically, by position:** `position: relative` with `top: 50%` and `transform: translateY(-50%)` — precise, but flexbox reads better.',
            '**In a grid:** `place-items: center` does both axes in one declaration.',
          ] },
          { type: 'code', id: 'c-l62-c1', language: 'css',
            code: `.center-horizontal {
  width: 300px;
  margin: 0 auto;
}

.center-both {
  display: flex;
  align-items: center;
  justify-content: center;
}` },
          { type: 'warning', id: 'c-l62-w1', title: 'A block will not centre vertically with margin: auto',
            body: 'Auto vertical margins resolve to `0` on a block in normal flow, because there is no leftover vertical space to divide — the height is content-driven. `margin: auto` centres horizontally only. For vertical centring, use flexbox or grid.' },
          { type: 'tip', id: 'c-l62-t1', title: 'text-align is inherited, margin is not',
            body: '`text-align: center` on a parent centres every piece of text inside it, however deep. `margin: 0 auto` centres one box and nothing else. Picking the wrong one is the usual reason a layout refuses to centre.' },
          { type: 'exercise', id: 'c-l62-x1', exercise: {
            id: 'ex-l62',
            instructions: 'Centre the panel both ways: vertically with flexbox on the stage, horizontally with auto margins on the panel.',
            languages: ['css'],
            starterCode: { html: '<div class="stage">\n  <div class="panel">Centred both ways</div>\n</div>\n', css: '.stage { height: 200px; border: 1px dashed #d5dae0; border-radius: 10px; }\n.panel { width: 160px; background: #29e2bd; border-radius: 8px; }\n' },
            tests: [
              { id: 'ex-l62-t1', label: 'The stage is a flex container', body: 'return getComputedStyle(document.querySelector(".stage")).display === "flex"' },
              { id: 'ex-l62-t2', label: 'Items are centred on the cross axis', body: 'return getComputedStyle(document.querySelector(".stage")).alignItems === "center"' },
              { id: 'ex-l62-t3', label: 'The panel keeps its 160px width and has auto side margins', body: 'const s = getComputedStyle(document.querySelector(".panel")); return s.width === "160px" && s.marginLeft === "auto"' },
            ],
            hints: ['A flex container needs `display: flex`, then `align-items: center` for the vertical centring.', '`margin-left: auto` on a flex item centres it along the main axis by absorbing the free space.', 'Try `display: flex; align-items: center; justify-content: center;` on `.stage`.'],
            solution: { html: '<div class="stage">\n  <div class="panel">Centred both ways</div>\n</div>\n', css: '.stage { display: flex; align-items: center; justify-content: center; height: 200px; border: 1px dashed #d5dae0; border-radius: 10px; }\n.panel { width: 160px; margin: 0 auto; background: #29e2bd; border-radius: 8px; }\n' },
            testNotes: 'The tests read the computed `display` and `align-items` of `.stage`, and the `width` and `margin-left` of `.panel`.',
          } },
        ],
      },
    ],
  },
]