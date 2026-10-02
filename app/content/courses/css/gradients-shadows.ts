import type { Section } from '~/types/content'

export const cssGradientShadowSections: Section[] = [
  {
    id: 'css-s48',
    title: 'CSS Gradients',
    description: 'Painting colour transitions with linear-gradient() and radial-gradient(): directions, colour stops, hard edges, fades and repeating patterns.',
    lessons: [
      {
        id: 'css-l85',
        title: 'CSS Linear Gradients',
        description: 'The linear-gradient() function, direction keywords, percentage colour stops, hard stops, fading with transparent, and repeating-linear-gradient.',
        duration: 7,
        xp: 45,
        objectives: [
          'Write a linear-gradient() from two or more colour stops',
          'Control the direction with to right, to bottom and diagonal keywords',
          'Place a stop at a specific percentage to control where the blend happens',
          'Create a hard edge by giving two stops the same position',
          'Fade to nothing with the transparent keyword instead of guessing an rgb value',
          'Produce a repeating pattern with repeating-linear-gradient()',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l85-b1',
            body: 'A gradient is not a colour. It is an **image**, which is why it goes in `background-image` and never in `color`. `linear-gradient()` takes a direction followed by two or more colour stops, and paints the first stop at one end of the gradient line and the last stop at the other, blending between them.',
          },
          {
            type: 'demo',
            id: 'c-l85-d1',
            title: 'A hard stop next to a fade',
            body: 'The left swatch uses two stops at the same position, 50%, so the transition has no width at all and you get a clean vertical edge. The right swatch ends in `transparent`, so it runs off into the page background instead of stopping at a second solid colour. Those two tricks cover most of what you need a linear gradient for.',
            html: `<div class="strip">
  <div class="swatch">
    <span>hard stop</span>
  </div>
  <div class="swatch">
    <span>fade</span>
  </div>
</div>
<p class="cap">left: linear-gradient(to right, #29e2bd 50%, #1f6feb 50%) &nbsp;|&nbsp; right: linear-gradient(to right, #29e2bd, #1f6feb, transparent)</p>`,
            css: `.strip {
  display: flex;
  gap: 1rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
}
.swatch {
  flex: 1;
  height: 110px;
  display: flex;
  align-items: flex-end;
  padding: 0.6rem;
  box-sizing: border-box;
  color: #e8edf4;
  background: #141922;
  border: 1px solid #2a3441;
  border-radius: 8px;
}
.swatch span {
  font-size: 12px;
  letter-spacing: 0.04em;
}
.swatch:first-child {
  background-image: linear-gradient(to right, #29e2bd 50%, #1f6feb 50%);
}
.swatch:last-child {
  background-image: linear-gradient(to right, #29e2bd, #1f6feb, transparent);
}
.cap {
  margin: 0.7rem 0 0;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 11px;
  color: #9aa5b4;
}`,
            height: 190,
          },
          {
            type: 'text',
            id: 'c-l85-b2',
            body: 'That is the whole idea in two swatches. Everything else in this lesson is control over where the stops sit. The gradient line by default runs from top to bottom, which surprises people, so always state the direction unless you genuinely want top to bottom.',
          },
          {
            type: 'heading',
            id: 'c-l85-h1',
            level: 3,
            body: 'Direction',
          },
          {
            type: 'text',
            id: 'c-l85-b3',
            body: 'The direction is written as `to` plus a side or corner. The gradient line is drawn towards that point: the starting colour sits at the opposite end. `to right` therefore paints the first colour on the left. Corners produce the diagonal, which is usually what you want for a subtle sheen or a striped header.',
          },
          {
            type: 'code',
            id: 'c-l85-c1',
            language: 'css',
            title: 'Directions',
            code: `/* the default is to bottom, so state it explicitly */
.a { background-image: linear-gradient(to bottom, #29e2bd, #1f6feb); }

/* diagonals come from naming a corner */
.b { background-image: linear-gradient(to top right, #1f6feb, #29e2bd); }

/* an angle works too: 0deg is to top, 90deg is to right, clockwise */
.c { background-image: linear-gradient(45deg, #1d2531, #2a3441); }`,
          },
          {
            type: 'list',
            id: 'c-l85-l1',
            style: 'bullet',
            items: [
              '**Sides** — `to top`, `to right`, `to bottom` (the default), `to left`.',
              '**Corners** — `to top left`, `to top right`, `to bottom left`, `to bottom right`. These give the diagonal gradients.',
              '**Angles** — `0deg` points to the top and angles increase clockwise, so `90deg` is `to right` and `180deg` is `to bottom`. Reach for an angle when you want a repeating stripe pattern at a non-45-degree angle.',
              '**The starting colour is at the far end.** In `to right`, the first stop you write is painted on the left edge. Reversing the order of the stops reverses the gradient, which is usually easier than fiddling with the direction.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l85-h2',
            level: 3,
            body: 'Colour stops and where they sit',
          },
          {
            type: 'text',
            id: 'c-l85-b4',
            body: 'Each stop can carry a position: a length or a percentage. With two stops and no positions the browser splits the gradient line in half. With three stops it still splits it evenly, at 0%, 50% and 100%. Positions are what give you control, because they say exactly where each colour belongs.',
          },
          {
            type: 'code',
            id: 'c-l85-c2',
            language: 'css',
            title: 'Two stops, three stops, positioned stops',
            code: `/* two stops: the blend runs 0% to 100% */
.a { background-image: linear-gradient(to right, #1f6feb, #29e2bd); }

/* three stops: positions are inferred at 0%, 50%, 100% */
.b { background-image: linear-gradient(to right, #1f6feb, #29e2bd, #141922); }

/* positioned stops: the blue holds flat, then blends over the last 30% */
.c { background-image: linear-gradient(to right, #1f6feb 0%, #1f6feb 70%, #141922 100%); }`,
          },
          {
            type: 'text',
            id: 'c-l85-b5',
            body: 'Stops must be in ascending order, or the declaration is invalid and dropped. `0%` can be left off and `100%` can be left off too. Two stops at the **same** position produce a hard edge, which is the trick in the opening demo: `linear-gradient(to right, #29e2bd 50%, #1f6feb 50%)` has no blending distance at all.',
          },
          {
            type: 'list',
            id: 'c-l85-l2',
            style: 'bullet',
            items: [
              '**Two stops at one position is a hard stop.** `linear-gradient(to right, #29e2bd 50%, #1f6feb 50%)` paints exactly half teal and half blue with no blend between them. This is the cheapest way to get a two-tone split background without a second element.',
              '**Fade with `transparent`, not with a guessed colour.** Ending at `transparent` lets whatever is behind the gradient show through, so a card can fade into the page instead of fading into a fixed shade that will look wrong on the next background.',
              '**`transparent` is `rgba(0, 0, 0, 0)`.** Fading to `transparent` in Chrome and Firefox fades toward black, which is invisible for dark colours but muddies light ones. If a light gradient must fade to nothing, end at the same colour with zero alpha written out: `rgba(255, 255, 255, 0)`.',
              '**Stops must ascend.** `linear-gradient(to right, red 80%, blue 20%)` is invalid and the whole declaration is dropped, which usually looks like the gradient simply not working.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l85-t1',
            title: 'Set the size on the element, not the gradient',
            body: 'A gradient always paints the whole `background-position` area, so `background-size` and `background-repeat` apply to it. That means `background: linear-gradient(...) no-repeat` paints one gradient at natural size, and a `background-size: 50% 100%` gradient covers only half the element - which is another way to build a hard split if you prefer to size the layer than the stops.',
          },
          {
            type: 'warning',
            id: 'c-l85-w1',
            title: 'A gradient is not a background-color',
            body: 'Because `linear-gradient()` produces an image, it cannot go in `background-color`, it does not respond to `opacity` the way a colour does, and it cannot be read back as a hex value. If you need a plain tinted background, use `background-color`. Also note that the `background` shorthand resets everything it does not mention, so a later `background: #1d2531` will wipe out an earlier gradient.',
          },
          {
            type: 'heading',
            id: 'c-l85-h3',
            level: 3,
            body: 'Repeating gradients',
          },
          {
            type: 'text',
            id: 'c-l85-b6',
            body: '`repeating-linear-gradient()` behaves identically, except that when the last stop is reached it starts again. That gives you stripes, hazard tape, progress bars and hatching out of a single declaration and no extra elements.',
          },
          {
            type: 'code',
            id: 'c-l85-c3',
            language: 'css',
            title: 'Stripes and hatching',
            code: `/* 45deg diagonal stripes, 16px band + 16px gap */
.stripes {
  background-image: repeating-linear-gradient(
    45deg,
    #1d2531 0 16px,
    #2a3441 16px 32px
  );
}

/* a repeating gradient with no explicit stops also works:
   the last stop repeats from where it ended */
.hatch {
  background-image: repeating-linear-gradient(
    to right,
    rgba(41, 226, 189, 0.15) 0 10px,
    transparent 10px 20px
  );
}`,
          },
          {
            type: 'tip',
            id: 'c-l85-t2',
            title: 'Use the two-position syntax for short stops',
            body: '`#1d2531 0 16px` means "from 0 up to 16px", not two separate stops at 0 and 16px with a blend between them. It is shorter and, more importantly, it cannot accidentally produce a fade because the two positions are identical.',
          },
          {
            type: 'example',
            id: 'c-l85-e1',
            title: 'Stripes, a fade and a hard split on one card',
            body: 'A striped header band, a panel whose gradient fades into the card at the bottom edge, and a card split into two hard halves with a single declaration each. All three patterns here come from the same function with different stop positions.',
            html: `<div class="card">
  <div class="head">stripes</div>
  <div class="body fade">Faded at the bottom - the panel runs out into the card behind it.</div>
</div>
<div class="card split">
  <div class="half">50%</div>
  <div class="half">50%</div>
</div>`,
            css: `.card {
  border: 1px solid #2a3441;
  border-radius: 8px;
  overflow: hidden;
  background: #141922;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  color: #e8edf4;
  margin-bottom: 0.9rem;
}
.head {
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 11px;
  color: #9aa5b4;
  background-color: #1d2531;
  background-image: repeating-linear-gradient(
    45deg,
    #242d3b 0 10px,
    #1d2531 10px 20px
  );
}
.body {
  padding: 0.8rem;
  color: #9aa5b4;
}
.fade {
  background-image: linear-gradient(to bottom, #1f6feb 0%, #141922 100%);
}
.split {
  display: flex;
}
.half {
  flex: 1;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #e8edf4;
}
.split {
  background-image: linear-gradient(to right, #29e2bd 50%, #1f6feb 50%);
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l85-x1',
            exercise: {
              id: 'ex-l85',
              instructions:
                'Give the banner below a hard-stop split background: the left half must be `#29e2bd` and the right half `#1f6feb`, with no blend between them. Set the direction to `to right`.',
              languages: ['css'],
              starterCode: {
                html: '<div class="banner">50 / 50 split</div>',
                css: '.banner {\n  height: 90px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 13px;\n  color: #141922;\n  background: #1d2531;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l85-t1',
                  label: 'A linear gradient is painted into the background image',
                  body: 'return getComputedStyle(document.querySelector(".banner")).backgroundImage.includes("linear-gradient")',
                },
                {
                  id: 'ex-l85-t2',
                  label: 'It is a hard stop, not a fade - both colours appear at 50%',
                  body: 'const img = getComputedStyle(document.querySelector(".banner")).backgroundImage; return img.includes("50%") && img.split("50%").length >= 3',
                },
                {
                  id: 'ex-l85-t3',
                  label: 'The gradient runs to the right',
                  body: 'const img = getComputedStyle(document.querySelector(".banner")).backgroundImage; return img.includes("to right")',
                },
                {
                  id: 'ex-l85-t4',
                  label: 'Both colours are the ones asked for',
                  body: 'const img = getComputedStyle(document.querySelector(".banner")).backgroundImage; return img.includes("rgb(41, 226, 189)") && img.includes("rgb(31, 111, 235)")',
                },
              ],
              hints: [
                'A gradient is an image, so it belongs in `background-image`, not `background-color`.',
                'To get no blend at all, give both colour stops the same position - 50% - so they switch on a single line.',
                '`background-image: linear-gradient(to right, #29e2bd 50%, #1f6feb 50%);`',
              ],
              solution: {
                html: '<div class="banner">50 / 50 split</div>',
                css: '.banner {\n  height: 90px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 13px;\n  color: #141922;\n  background-image: linear-gradient(to right, #29e2bd 50%, #1f6feb 50%);\n}\n',
              },
              testNotes:
                'A gradient computes to an image, not to a colour, so the tests read the `background-image` string rather than `background-color`. Hex colours are serialised as `rgb(41, 226, 189)` for `#29e2bd` and `rgb(31, 111, 235)` for `#1f6feb`. The second test counts `50%` occurrences: a hard stop needs the position twice, while a fade mentions it once or not at all.',
            },
          },
        ],
      },
      {
        id: 'css-l86',
        title: 'CSS Radial Gradients',
        description: 'The radial-gradient() function, circle versus ellipse, the size keywords, and where the centre sits.',
        duration: 7,
        xp: 45,
        objectives: [
          'Write a radial-gradient() with a shape, a size and a centre',
          'Explain when to use circle instead of the default ellipse',
          'Control how far the gradient reaches with farthest-corner and closest-side',
          'Move the centre with a background-position value',
          'Combine a radial gradient with a linear one for a highlight over a base colour',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l86-b1',
            body: 'Where a linear gradient walks along a line, a **radial gradient** starts at one point and pushes outwards in every direction. The colour at the centre is the first stop, and the last stop marks the outer edge. Same rules about positions, hard stops and `transparent` - only the geometry changes.',
          },
          {
            type: 'demo',
            id: 'c-l86-d1',
            title: 'Linear against radial, same two colours',
            body: 'The left box uses `linear-gradient(to right, ...)`, so the colour changes across the box in one direction. The right box uses `radial-gradient(circle, ...)`, so it changes in every direction from the centre outwards. Same colours, same two stops - completely different picture.',
            html: `<div class="pair">
  <div class="box linear"><span>linear, to right</span></div>
  <div class="box radial"><span>radial, circle</span></div>
</div>`,
            css: `.pair {
  display: flex;
  gap: 1rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
}
.box {
  flex: 1;
  height: 130px;
  display: flex;
  align-items: flex-end;
  padding: 0.6rem;
  box-sizing: border-box;
  color: #e8edf4;
  border: 1px solid #2a3441;
  border-radius: 8px;
}
.box span {
  font-size: 12px;
  letter-spacing: 0.04em;
}
.linear {
  background-image: linear-gradient(to right, #1f6feb, #29e2bd);
}
.radial {
  background-image: radial-gradient(circle, #29e2bd, #1f6feb);
}`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'c-l86-h1',
            level: 3,
            body: 'Shape and size',
          },
          {
            type: 'text',
            id: 'c-l86-b2',
            body: 'The first argument is the shape. The default is `ellipse`, which is right for a box because an ellipse fills a rectangle without leaving gaps. `circle` forces equal width and height, so on a wide box it stops short of the left and right edges and you get bare background on the sides. After the shape comes the size, which says how far out the last stop sits.',
          },
          {
            type: 'code',
            id: 'c-l86-c1',
            language: 'css',
            title: 'Shape and size keywords',
            code: `/* shape only - the size defaults to farthest-corner */
.a { background-image: radial-gradient(circle, #29e2bd, #1f6feb); }

/* size keywords */
.b { background-image: radial-gradient(circle closest-side, #29e2bd, #1f6feb); }
.c { background-image: radial-gradient(circle farthest-side, #29e2bd, #1f6feb); }
.d { background-image: radial-gradient(ellipse closest-side, #29e2bd, #1f6feb); }

/* explicit radii: one length for a circle, two for an ellipse */
.e { background-image: radial-gradient(60px, #29e2bd, #141922); }
.f { background-image: radial-gradient(80px 40px, #29e2bd, #141922); }

/* explicit size, no shape keyword */
.g { background-image: radial-gradient(120px at 50% 40%, #29e2bd, #141922); }`,
          },
          {
            type: 'list',
            id: 'c-l86-l1',
            style: 'bullet',
            items: [
              '**`closest-side`** - the last stop lands on whichever side or corner of the box is nearest the centre. On a wide box a `closest-side` circle stops at the nearest vertical edge, leaving room on the left and right.',
              '**`farthest-side`** - the last stop lands on the furthest side, so the gradient always spans the box in one axis.',
              '**`farthest-corner` (the default)** - reaches the corner that is furthest away. Use it when you want the gradient to cover the element completely and never repeat.',
              '**`closest-corner`** - reaches the nearest corner, so the gradient stays compact and never touches the far edges.',
              '**Explicit lengths** - `radial-gradient(60px, ...)` draws a circle of 60px radius, `radial-gradient(80px 40px, ...)` an ellipse with 80px horizontal and 40px vertical radii.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l86-h2',
            level: 3,
            body: 'Positioning the centre',
          },
          {
            type: 'text',
            id: 'c-l86-b3',
            body: 'The centre goes after the shape and size but **before** the colour stops, written with the `at` keyword: `radial-gradient(circle at 30% 20%, red, blue)`. The value is exactly the same syntax as `background-position`, so `at top left`, `at center` and `at 20% 80%` all work. This is the whole trick behind a light source in the top-left corner of a card.',
          },
          {
            type: 'code',
            id: 'c-l86-c2',
            language: 'css',
            title: 'Moving the centre, and the one to avoid',
            code: `/* highlight in the top-left, fading out across the card */
.card {
  background-image: radial-gradient(
    circle at 20% 10%,
    rgba(41, 226, 189, 0.28),
    rgba(41, 226, 189, 0) 60%
  );
}

/* a status dot that fades from the middle outwards */
.dot {
  background-image: radial-gradient(circle closest-side, #29e2bd, #1f6feb);
}

/* gone wrong: a circle takes ONE radius, not two */
.bad {
  background-image: radial-gradient(circle 60px 40px, #29e2bd, #141922);
}`,
          },
          {
            type: 'tip',
            id: 'c-l86-t1',
            title: 'Two gradients stack',
            body: 'Because `background-image` takes a comma-separated list, you can paint a radial highlight on top of a linear base: `background-image: radial-gradient(...), linear-gradient(...)`. The first entry in the list paints on top. This is how you get a subtle sheen without a second element.',
          },
          {
            type: 'warning',
            id: 'c-l86-w1',
            title: 'A circle on a wide box does not fill it',
            body: 'This is the mistake almost everyone makes once. `radial-gradient(circle, ...)` on a 400x120 box draws a circle 120px across, centred, leaving plain background on both sides, and it looks broken. Either use `ellipse`, or use `circle farthest-side` so the circle stretches to the wider dimension and reaches the edges.',
          },
          {
            type: 'example',
            id: 'c-l86-e1',
            title: 'A card lit from one corner',
            body: 'Two background layers: a radial highlight positioned near the top-left, and a linear base beneath it. The card is a plain rectangle with no extra elements, and the light source is a single declaration.',
            html: `<div class="panel">
  <h4>Deployment</h4>
  <p>Build 4821 finished in 3m 12s and was promoted to production.</p>
</div>
<div class="panel wide">
  <h4>Nightly job</h4>
  <p>Failed at the archive step. Retried automatically twice.</p>
</div>`,
            css: `.panel {
  border: 1px solid #2a3441;
  border-radius: 10px;
  padding: 0.9rem 1rem;
  margin-bottom: 0.9rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  color: #e8edf4;
  background-color: #141922;
  background-image:
    radial-gradient(circle at 15% 0%, rgba(41, 226, 189, 0.22), rgba(41, 226, 189, 0) 70%),
    linear-gradient(to bottom, #1d2531, #141922);
}
.panel.wide {
  background-image:
    radial-gradient(ellipse 120% 100% at 85% 10%, rgba(31, 111, 235, 0.3), rgba(31, 111, 235, 0) 65%),
    linear-gradient(to bottom, #1d2531, #141922);
}
.panel h4 {
  margin: 0 0 0.3rem;
  font-size: 13px;
  letter-spacing: 0.04em;
}
.panel p {
  margin: 0;
  color: #9aa5b4;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l86-x1',
            exercise: {
              id: 'ex-l86',
              instructions:
                'Give the panel below a radial gradient that fades from `#29e2bd` out to `#141922`. Put the centre horizontally centred and a third of the way down with the `at` keyword, and use an ellipse so it still reaches every edge.',
              languages: ['css'],
              starterCode: {
                html: '<div class="panel">Radial panel</div>',
                css: '.panel {\n  height: 120px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #2a3441;\n  border-radius: 10px;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 13px;\n  color: #e8edf4;\n  background: #141922;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l86-t1',
                  label: 'A radial gradient is painted into the background image',
                  body: 'return getComputedStyle(document.querySelector(".panel")).backgroundImage.includes("radial-gradient")',
                },
                {
                  id: 'ex-l86-t2',
                  label: 'The centre is placed at 50% across and 30% down',
                  body: 'const img = getComputedStyle(document.querySelector(".panel")).backgroundImage; return img.includes("at 50% 30%")',
                },
                {
                  id: 'ex-l86-t3',
                  label: 'Both colours are the ones asked for',
                  body: 'const img = getComputedStyle(document.querySelector(".panel")).backgroundImage; return img.includes("rgb(41, 226, 189)") && img.includes("rgb(20, 25, 34)")',
                },
                {
                  id: 'ex-l86-t4',
                  label: 'It is an ellipse, or sized so it reaches the box edges',
                  body: 'const img = getComputedStyle(document.querySelector(".panel")).backgroundImage; return !img.includes("circle") || img.includes("farthest-side")',
                },
              ],
              hints: [
                'The order inside the function is shape, then `at` plus position, then the colour stops.',
                'The position is written as a horizontal percentage then a vertical one: `at 50% 30%`.',
                '`background-image: radial-gradient(ellipse at 50% 30%, #29e2bd, #141922);`',
              ],
              solution: {
                html: '<div class="panel">Radial panel</div>',
                css: '.panel {\n  height: 120px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid #2a3441;\n  border-radius: 10px;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 13px;\n  color: #e8edf4;\n  background-image: radial-gradient(ellipse at 50% 30%, #29e2bd, #141922);\n}\n',
              },
              testNotes:
                'The tests read the `background-image` string, because a gradient computes to an image rather than a colour. `#141922` serialises as `rgb(20, 25, 34)`. Be aware that the computed value drops any default: `radial-gradient(ellipse at center, ...)` comes back as `radial-gradient(rgb(...), rgb(...))` with no shape or position at all, which is why the exercise asks for a centre that is not the default. The fourth test catches the classic mistake: a bare `circle` on a wide box leaves bare background at the sides, so `circle` is only accepted when paired with `farthest-side` or an explicit length.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s48',
      title: 'CSS Gradients quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s48-q1',
          type: 'multiple-choice',
          prompt:
            'Which value produces a hard edge with no blending at all between two colours?',
          options: [
            '`linear-gradient(to right, #29e2bd, #1f6feb)`',
            '`linear-gradient(to right, #29e2bd 50%, #1f6feb 50%)`',
            '`linear-gradient(to right, #29e2bd 0%, #1f6feb 100%)`',
            '`linear-gradient(to right, transparent, #1f6feb)`',
          ],
          answer: 1,
          explanation:
            'A hard edge comes from giving both stops the same position. With both at 50% the transition has zero width, so the change happens on a single line. Stops at different positions always leave room for the blend between them.',
        },
        {
          id: 'quiz-css-s48-q2',
          type: 'true-false',
          prompt:
            'Setting `background-color: linear-gradient(to right, red, blue);` gives you a working gradient.',
          answer: false,
          explanation:
            'A gradient is an image value, so it belongs in `background-image`. `background-color` only accepts a colour, so that declaration is invalid and is discarded outright.',
        },
        {
          id: 'quiz-css-s48-q3',
          type: 'multiple-choice',
          prompt:
            'A `radial-gradient(circle, ...)` on a wide 400px by 120px box leaves plain background on the left and right edges. What is the fix?',
          options: [
            'Add a second radial gradient covering the sides',
            'Use `ellipse` instead of `circle`, or size the circle with `farthest-side`',
            'Move the gradient centre to the middle with `at 50% 50%` - the centre is already there',
            'Swap the two colour stops',
          ],
          answer: 1,
          explanation:
            'A circle has equal radii on both axes, so on a wide box it stops at the nearest vertical edge. `ellipse` stretches to fill the box, and `circle farthest-side` stretches only along the longer axis. The centre position and the stop order have nothing to do with the leftover edges.',
        },
        {
          id: 'quiz-css-s48-q4',
          type: 'blank',
          prompt:
            'Which keyword places the centre of a radial gradient at a specific point, and what is the full syntax for putting it at the centre of the element?',
          answers: ['at', 'at center', 'radial-gradient(circle at center, red, blue)'],
          explanation:
            'The `at` keyword introduces the position, which is written before the colour stops and after any shape or size. It uses the same syntax as `background-position`: `radial-gradient(circle at 20% 10%, red, blue)` moves the centre a fifth of the way across and a tenth of the way down.',
        },
        {
          id: 'quiz-css-s48-q5',
          type: 'identify-error',
          prompt: 'This gradient renders nothing at all. Why?',
          code: '.card {\n  background-image: linear-gradient(to right, #29e2bd 80%, #1f6feb 20%);\n}',
          options: [
            '`background-image` cannot hold a gradient function',
            'The colour stops are out of order, so the whole declaration is invalid',
            'A gradient needs at least three stops to render',
            'The direction keyword must come last, after the stops',
          ],
          answer: 1,
          explanation:
            'Stops must be written in ascending order. With 80% before 20% the declaration fails to parse and is dropped, which looks exactly like the gradient not working. Always order stops from smallest position to largest.',
        },
      ],
    },
  },
  {
    id: 'css-s49',
    title: 'CSS Shadows',
    description: 'Depth without a single extra element: box-shadow for surfaces, text-shadow for glyphs, and how each one differs from filter: drop-shadow.',
    lessons: [
      {
        id: 'css-l87',
        title: 'CSS Box Shadow',
        description: 'The two-value and four-value forms of box-shadow, x and y offsets, blur, spread, inset, stacking several shadows, and why the shadow follows the border radius.',
        duration: 8,
        xp: 50,
        objectives: [
          'Read box-shadow from left to right as x-offset, y-offset, blur, spread and colour',
          'Explain why the x and y offsets can be negative',
          'Draw a shadow inside the box with inset',
          'Grow or shrink a shadow with the spread value',
          'Stack several comma-separated shadows and say which one paints on top',
          'Predict how a shadow interacts with border-radius and with overflow',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l87-b1',
            body: 'A box shadow is a copy of the element, blurred, offset and drawn behind the element itself. The values are read in a fixed order and any of the lengths may be omitted except the two offsets: **`x-offset  y-offset  blur  spread  colour`**.',
          },
          {
            type: 'demo',
            id: 'c-l87-d1',
            title: 'Four-value, two-value and inset',
            body: 'The first card uses the four-value form: a small offset, a 12px blur, a -4px spread that pulls the shadow in from the edges, and an `rgba` black. The second uses only two values, which gives a hard-edged shadow with no blur at all. The third adds `inset` and paints the shadow inside the box instead of behind it.',
            html: `<div class="row">
  <div class="card four">4 values</div>
  <div class="card two">2 values</div>
  <div class="card inset">inset</div>
</div>`,
            css: `.row {
  display: flex;
  gap: 1rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 12px;
  color: #9aa5b4;
}
.card {
  flex: 1;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 10px;
}
.four {
  box-shadow: 6px 6px 12px -4px rgba(0, 0, 0, 0.55);
}
.two {
  box-shadow: 8px 8px 0 0 #1f6feb;
}
.inset {
  box-shadow: inset 4px 4px 10px -2px rgba(0, 0, 0, 0.7);
}`,
            height: 150,
          },
          {
            type: 'text',
            id: 'c-l87-b2',
            body: 'The middle card is the proof that blur is optional: with no blur value the shadow is a crisp silhouette offset by the two lengths, which is why hard shadows look like flat blocks behind the element rather than like light.',
          },
          {
            type: 'heading',
            id: 'c-l87-h1',
            level: 3,
            body: 'The values, one at a time',
          },
          {
            type: 'code',
            id: 'c-l87-c1',
            language: 'css',
            title: 'The full form, annotated',
            code: `.card {
  box-shadow:
    4px        /* x-offset: positive moves the shadow right */
    6px        /* y-offset: positive moves it down */
    12px       /* blur radius: the soft edge. Larger is softer, 0px is a hard edge */
    -2px       /* spread: positive grows the shadow, negative shrinks it */
    rgba(0, 0, 0, 0.5);  /* colour, alpha included */
}

/* the two-value minimum: offsets plus a colour */
.panel {
  box-shadow: 0 2px 0 #1f6feb;
}

/* drawn inside the box instead of behind it */
.inset {
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6);
}`,
          },
          {
            type: 'list',
            id: 'c-l87-l1',
            style: 'bullet',
            items: [
              '**x and y offset** - how far the shadow is shifted, in any length unit. Negative values are legal and mean left or up. The offsets do not have to match: equal values at 45 degrees look like a light straight down, unequal values angle the shadow.',
              '**Blur radius** - optional. It is a standard CSS blur radius, so bigger is softer and `0` gives you a hard edge. It blurs in both directions, which is why the shadow appears to grow as you increase it.',
              '**Spread** - optional. Positive spread expands the shadow shape outwards before blurring, negative shrinks it. Negative spread is the fast way to make a shadow hug a card tightly instead of glowing around it.',
              '**Colour** - any colour, and `rgba` or `hsla` is usually better than a hex because the shadow needs to be semi-transparent. A fully opaque shadow looks like a second object.',
              '**`inset`** - a keyword, not a length, and it must come before the offsets. It moves the shadow inside the border box, which is what you want for a pressed or recessed look.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l87-t1',
            title: 'Use a dark low-alpha colour, and layer two shadows',
            body: 'A shadow tinted with the surface colour of the page underneath reads as depth; a shadow tinted with the accent colour reads as a glow. For a natural card lift, layer a tight dark shadow under a wide faint one: `box-shadow: 0 1px 2px rgba(0,0,0,.4), 0 8px 24px rgba(0,0,0,.25)`.',
          },
          {
            type: 'warning',
            id: 'c-l87-w1',
            title: 'A shadow can add a scrollbar',
            body: 'The shadow is drawn outside the element box but is not part of layout, so it does not push anything around - it can still overflow a scroll container or sit under a parent with `overflow: hidden`. More importantly, a large blur on a long list of cards is genuinely expensive to paint; keep the blur radius modest and limit how many shadows you stack.',
          },
          {
            type: 'heading',
            id: 'c-l87-h2',
            level: 3,
            body: 'Stacking several shadows',
          },
          {
            type: 'text',
            id: 'c-l87-b3',
            body: '`box-shadow` accepts a comma-separated list, and each shadow is painted independently. **The first shadow in the list paints on top**, which is the opposite of how background layers work. Put your tight shadow first and the wide one after it.',
          },
          {
            type: 'code',
            id: 'c-l87-c2',
            language: 'css',
            title: 'A hover state that reads as a lift',
            code: `/* on hover: the card rises */
.card {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.45);
  transition: box-shadow 160ms ease;
}
.card:hover {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.35),   /* paints on top: the tight contact shadow */
    0 14px 30px rgba(0, 0, 0, 0.45);  /* behind it: the wide soft one */
}`,
          },
          {
            type: 'text',
            id: 'c-l87-b4',
            body: 'One more thing the demo does not show: a shadow is clipped by `overflow: hidden` on an ancestor. If a card inside a rounded panel has a shadow that gets cut off along an edge, look at the parent - the shadow is fine, the clipping box is not.',
          },
          {
            type: 'example',
            id: 'c-l87-e1',
            title: 'Depth on a rounded element, and a pressed button',
            body: 'The rounded card has a three-shadow stack: a contact shadow right under it, a wide ambient shadow, and a faint teal glow. The button uses `inset` to look pressed. The rounded corners prove the point - the shadow is clipped to the same shape as the border box.',
            html: `<div class="card">
  <h4>Invoice INV-1042</h4>
  <p>Northwind Ltd - paid in full</p>
</div>
<button class="btn">Pressed</button>`,
            css: `.card {
  max-width: 340px;
  padding: 0.9rem 1rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  background: #1d2531;
  border: 1px solid #2a3441;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  color: #e8edf4;
  box-shadow:
    0 1px 0 rgba(41, 226, 189, 0.18),
    0 2px 6px rgba(0, 0, 0, 0.45),
    0 18px 40px rgba(0, 0, 0, 0.5);
}
.card h4 {
  margin: 0 0 0.25rem;
  font-size: 13px;
}
.card p {
  margin: 0;
  color: #9aa5b4;
}
.btn {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
  color: #e8edf4;
  background: #1d2531;
  border: 1px solid #2a3441;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: inset 0 3px 8px rgba(0, 0, 0, 0.6);
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l87-x1',
            exercise: {
              id: 'ex-l87',
              instructions:
                'Give the tile below two shadows: an inset shadow pressed into its top edge, plus an outer shadow offset 4px right and 4px down. Both should be visible at once.',
              languages: ['css'],
              starterCode: {
                html: '<div class="tile">Tile</div>',
                css: '.tile {\n  width: 160px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 13px;\n  color: #e8edf4;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l87-t1',
                  label: 'There is an inset shadow',
                  body: 'return getComputedStyle(document.querySelector(".tile")).boxShadow.includes("inset")',
                },
                {
                  id: 'ex-l87-t2',
                  label: 'Two separate shadows are listed',
                  body: 'const s = getComputedStyle(document.querySelector(".tile")).boxShadow.replace(/rgba?\\([^)]*\\)/g, "C").split(","); return s.length >= 2',
                },
                {
                  id: 'ex-l87-t3',
                  label: 'The outer shadow is offset 4px on both axes',
                  body: 'const s = getComputedStyle(document.querySelector(".tile")).boxShadow; return /(^|,|\\s)4px 4px/.test(s)',
                },
                {
                  id: 'ex-l87-t4',
                  label: 'The shadows are semi-transparent rather than solid',
                  body: 'const s = getComputedStyle(document.querySelector(".tile")).boxShadow; return s.includes("rgba")',
                },
              ],
              hints: [
                'One declaration can hold both: separate them with a comma.',
                '`inset` is a keyword and goes before the offsets, not after.',
                '`box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.6), 4px 4px 8px rgba(0, 0, 0, 0.4);`',
              ],
              solution: {
                html: '<div class="tile">Tile</div>',
                css: '.tile {\n  width: 160px;\n  height: 80px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  background: #1d2531;\n  border: 1px solid #2a3441;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 13px;\n  color: #e8edf4;\n  box-shadow:\n    inset 0 2px 6px rgba(0, 0, 0, 0.6),\n    4px 4px 8px rgba(0, 0, 0, 0.4);\n}\n',
              },
              testNotes:
                'A shadow also computes to a string, not to a number, so the tests read `box-shadow` and search it. `inset` appears literally in the computed value, and the outer shadow is serialised as `4px 4px 8px rgba(...)`, so the third test looks for `4px 4px` after a separator. To count the layers the test first replaces each `rgb()`/`rgba()` colour with a placeholder, because a colour contains commas of its own and would otherwise inflate the count.',
            },
          },
        ],
      },
      {
        id: 'css-l88',
        title: 'CSS Text Shadow',
        description: 'Shading the glyphs rather than the box, and where text-shadow stops being the right tool and filter: drop-shadow takes over.',
        duration: 7,
        xp: 45,
        objectives: [
          'Write a text-shadow as x-offset, y-offset, blur and colour',
          'Explain how text-shadow differs from box-shadow on a bordered element',
          'Stack several text-shadows and say which one paints on top',
          'Explain when filter: drop-shadow beats both shadow properties',
        ],
        content: [
          {
            type: 'text',
            id: 'c-l88-b1',
            body: '`text-shadow` takes the same shape as `box-shadow` minus the interesting parts: **`x-offset  y-offset  blur  colour`**. There is no spread, because a glyph has no edge to grow from, and no `inset`, because a shadow inside text makes no sense. It also applies to every line of text in the element, each one offset from its own position.',
          },
          {
            type: 'demo',
            id: 'c-l88-d1',
            title: 'text-shadow on the words, box-shadow on the panel',
            body: 'The two panels hold identical text. The left one has `box-shadow` on the panel and nothing on the text, so the shadow traces the rectangle. The right one has `text-shadow` and no box shadow, so only the letters cast a shadow and the panel stays flat.',
            html: `<div class="row">
  <div class="panel">Gradient</div>
  <div class="panel">Gradient</div>
</div>
<p class="cap">left: box-shadow on the panel &nbsp;|&nbsp; right: text-shadow on the glyphs</p>`,
            css: `.row {
  display: flex;
  gap: 1rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
}
.panel {
  flex: 1;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #1d2531;
  border: 1px solid #2a3441;
  color: #e8edf4;
  font-size: 18px;
  font-weight: 700;
}
.panel:first-child {
  box-shadow: 5px 5px 0 rgba(31, 111, 235, 0.7);
}
.panel:last-child {
  text-shadow: 3px 3px 0 rgba(31, 111, 235, 0.9);
}
.cap {
  margin: 0.7rem 0 0;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 11px;
  color: #9aa5b4;
}`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l88-h1',
            level: 3,
            body: 'The values',
          },
          {
            type: 'code',
            id: 'c-l88-c1',
            language: 'css',
            title: 'text-shadow in all its forms',
            code: `/* hard shadow, the retro look: no blur */
.hard {
  text-shadow: 2px 2px 0 #1f6feb;
}

/* soft shadow: x, y, blur, colour */
.soft {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
}

/* a glow: zero offset with a large blur */
.glow {
  color: #e8edf4;
  text-shadow:
    0 0 4px #29e2bd,
    0 0 12px rgba(41, 226, 189, 0.6);
}

/* a 1px dark rim for text on a busy background */
.rim {
  color: #e8edf4;
  text-shadow:
    -1px -1px 0 #141922,
     1px -1px 0 #141922,
    -1px  1px 0 #141922,
     1px  1px 0 #141922;
}`,
          },
          {
            type: 'list',
            id: 'c-l88-l1',
            style: 'bullet',
            items: [
              '**x and y offset** - the same as `box-shadow`: positive is right and down, negative is left and up. A zero offset with a blur is the classic glow.',
              '**Blur radius** - optional, and it works exactly as it does for a box shadow. Omit it and you get a crisp duplicated glyph, which is how the retro hard-shadow style works.',
              '**Colour** - there is no inset and no spread, so a shadow on white text almost always needs an `rgba` or a dark hex rather than a named colour.',
              '**A comma-separated list paints first-on-top.** The rim example above stacks four shadows, each offset by one pixel, and because the first is on top the result reads as a continuous edge rather than four separate copies.',
              '**It inherits.** `text-shadow` is inherited, so setting it on a container styles every descendant. Set it on the body only if you really want it everywhere.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l88-t1',
            title: 'text-shadow on transparent text is the easiest glow there is',
            body: 'Set the colour of the text to `transparent` and put the whole look into `text-shadow`. You get an outline or a glow that follows the exact shape of the glyphs, with no extra element and no image, and it scales with any font size because it is generated from the text itself.',
          },
          {
            type: 'warning',
            id: 'c-l88-w1',
            title: 'Shadows on small text are unreadable',
            body: 'A blurred shadow behind body copy lowers contrast in exactly the place the eye is trying to read. Keep shadows for headings, buttons and large display type. If you need light text on a busy background, darken or blur the background itself, or use the rim technique above with a small blur.',
          },
          {
            type: 'heading',
            id: 'c-l88-h2',
            level: 3,
            body: 'Where drop-shadow takes over',
          },
          {
            type: 'text',
            id: 'c-l88-b2',
            body: 'Both shadow properties work from the **box**, which is a rectangle. `filter: drop-shadow()` works from the **rendered pixels**, so it follows a rounded corner, a circle, a triangle, a letter, even a transparent PNG. That is the only difference that matters, and it shows up the moment the shape has a transparent corner.',
          },
          {
            type: 'example',
            id: 'c-l88-e1',
            title: 'The same triangle, three ways',
            body: 'The first shape gets `box-shadow` and you can see the shadow is a square, not a triangle. The second gets `drop-shadow` and the shadow is the triangle. The third is the same drop-shadow applied to text inside the shape, which is what you would reach for when the shape is an image or an SVG.',
            html: `<div class="row">
  <div class="shape"></div>
  <div class="shape"></div>
  <div class="shape with-text">drop</div>
</div>
<p class="cap">box-shadow (square) | drop-shadow (triangle) | drop-shadow on text</p>`,
            css: `.row {
  display: flex;
  gap: 1.6rem;
  align-items: flex-start;
  padding: 0.5rem 0 0.3rem;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 13px;
}
.shape {
  width: 76px;
  height: 66px;
  background: #29e2bd;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
}
.shape:first-child {
  box-shadow: 6px 6px 0 rgba(31, 111, 235, 0.75);
}
.shape:nth-child(2) {
  filter: drop-shadow(6px 6px 0 rgba(31, 111, 235, 0.75));
}
.with-text {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 0.2rem;
  background: #1f6feb;
  color: #e8edf4;
  font-size: 12px;
  filter: drop-shadow(4px 4px 0 rgba(41, 226, 189, 0.8));
}
.cap {
  margin: 0.8rem 0 0;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 11px;
  color: #9aa5b4;
}`,
            showPreview: true,
          },
          {
            type: 'list',
            id: 'c-l88-l2',
            style: 'bullet',
            items: [
              '**`box-shadow`** traces the border box. Use it for cards, panels and anything already rectangular.',
              '**`text-shadow`** traces the glyphs, one set per line of text. Use it for headings and logo-type, never for body copy.',
              '**`filter: drop-shadow()`** traces the rendered pixels, so it follows `clip-path`, `border-radius`, an image with transparency or an SVG. Use it when the shape is not a box.',
              '**`drop-shadow` takes no `spread` and no `inset`**, and the offset is a plain length, so `drop-shadow(4px 4px 2px red)` is the whole vocabulary.',
              '**Filters create a containing block and a stacking context.** That is the practical cost of `drop-shadow`: it changes how `position: fixed` descendants and `z-index` behave inside the filtered element.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l88-t2',
            title: 'Reach for drop-shadow on images, never box-shadow',
            body: 'A photo with `box-shadow` gets a rectangular frame, which is only right if the image really is rectangular. A logo, an icon or a screenshot with rounded transparent edges needs `filter: drop-shadow()`, because that is the only one of the three that respects what is actually painted.',
          },
          {
            type: 'exercise',
            id: 'c-l88-x1',
            exercise: {
              id: 'ex-l88',
              instructions:
                'Add a `text-shadow` to the heading below: offset 2px to the right and 2px down, with a blur radius of 4px, in `#141922`. Do not use `box-shadow` or `filter`.',
              languages: ['css'],
              starterCode: {
                html: '<h3 class="title">Available</h3>',
                css: '.title {\n  margin: 0;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 22px;\n  color: #29e2bd;\n  background: #1d2531;\n  padding: 0.7rem 0.9rem;\n  border-radius: 8px;\n  display: inline-block;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l88-t1',
                  label: 'A text-shadow is set on the heading',
                  body: 'return getComputedStyle(document.querySelector(".title")).textShadow !== "none"',
                },
                {
                  id: 'ex-l88-t2',
                  label: 'The offsets are 2px on both axes and the blur is 4px',
                  body: 'const s = getComputedStyle(document.querySelector(".title")).textShadow; return /^rgba?\\(\\d+, \\d+, \\d+(, 1)?\\) 2px 2px 4px/.test(s)',
                },
                {
                  id: 'ex-l88-t3',
                  label: 'The colour is #141922, which computes to rgb(20, 25, 34)',
                  body: 'return getComputedStyle(document.querySelector(".title")).textShadow.includes("rgb(20, 25, 34)")',
                },
                {
                  id: 'ex-l88-t4',
                  label: 'No box-shadow or filter was used instead',
                  body: 'const s = getComputedStyle(document.querySelector(".title")); return s.boxShadow === "none" && s.filter === "none"',
                },
              ],
              hints: [
                'The shadow goes on the element holding the text, and there are four values: two offsets, one blur, one colour.',
                '`text-shadow` has no spread and no inset, so there is nothing to get wrong beyond the order.',
                '`text-shadow: 2px 2px 4px #141922;`',
              ],
              solution: {
                html: '<h3 class="title">Available</h3>',
                css: '.title {\n  margin: 0;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 22px;\n  color: #29e2bd;\n  background: #1d2531;\n  padding: 0.7rem 0.9rem;\n  border-radius: 8px;\n  display: inline-block;\n  text-shadow: 2px 2px 4px #141922;\n}\n',
              },
              testNotes:
                'The computed value is reordered to colour-first, so an opaque `#141922` becomes `rgb(20, 25, 34) 2px 2px 4px` and the second test anchors on that order rather than the order you typed; the regex also accepts `rgba(..., 1)` for engines that keep the alpha channel. `text-shadow` on an element with no shadow computes to the string `none`, which is what the first test checks against.',
            },
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-css-s49',
      title: 'CSS Shadows quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-css-s49-q1',
          type: 'multiple-choice',
          prompt: 'Which shadow declaration produces a hard-edged shadow with no softness at all?',
          options: [
            '`box-shadow: 4px 4px 8px #000`',
            '`box-shadow: 4px 4px #000`',
            '`box-shadow: 4px 4px 0 8px #000`',
            '`box-shadow: inset 4px 4px #000`',
          ],
          answer: 1,
          explanation:
            'The blur radius is optional, so omitting it leaves the shadow as a crisp silhouette offset from the box. Writing `0` for the blur gives the same result. Option one has an 8px blur and is soft; option three puts 8px in the spread slot, so it grows the shadow instead of blurring it.',
        },
        {
          id: 'quiz-css-s49-q2',
          type: 'true-false',
          prompt: 'In a comma-separated list of box-shadows, the last shadow listed paints on top of the earlier ones.',
          answer: false,
          explanation:
            'It is the other way round: the first shadow in the list paints on top. That matches the background layer convention only by accident, so put your tight contact shadow first and the wide ambient shadow after it.',
        },
        {
          id: 'quiz-css-s49-q3',
          type: 'multiple-choice',
          prompt:
            'You need a shadow behind a triangle made with `clip-path`. `box-shadow` draws a square. What should you use instead?',
          options: [
            'A `box-shadow` with a larger blur radius',
            '`filter: drop-shadow(4px 4px 2px #000)`',
            'A second element behind the shape with a background',
            '`text-shadow` on the shape',
          ],
          answer: 1,
          explanation:
            '`box-shadow` is derived from the border box, so it can only ever be rectangular. `filter: drop-shadow()` works from the rendered pixels and therefore follows the clipped triangle exactly. The trade-off is that a filter creates a stacking context and a containing block.',
        },
        {
          id: 'quiz-css-s49-q4',
          type: 'blank',
          prompt:
            'In `box-shadow: 2px 0 8px -4px rgba(0,0,0,.4)`, what is the `-4px` value called?',
          answers: ['spread', 'spread radius', 'spread-radius'],
          explanation:
            'The order is x-offset, y-offset, blur radius, spread radius, then colour. The blur softens the shadow, while the spread grows or shrinks its shape before the blur is applied, and a negative spread pulls it in so it hugs the element.',
        },
        {
          id: 'quiz-css-s49-q5',
          type: 'identify-error',
          prompt: 'This is meant to give the button a shadow pressed into its top edge. What is wrong?',
          code: '.btn {\n  box-shadow: 4px 4px 8px inset #000;\n}',
          options: [
            'The colour must be written before the lengths',
            '`inset` must come before the offsets, not after them',
            'Spread is not allowed on a box shadow',
            'An inset shadow cannot have a blur radius',
          ],
          answer: 1,
          explanation:
            '`inset` is a keyword and belongs at the start of the value, before any lengths. Written after the lengths the whole declaration is invalid, so the button renders with no shadow at all. An inset shadow can absolutely have a blur radius.',
        },
      ],
    },
  },
]