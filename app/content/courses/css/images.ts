import type { Section } from '~/types/content'

export const cssImageSections: Section[] = [
  {
    id: 'css-s57',
    title: 'CSS Style Images',
    description: 'Shaping and filtering an image without touching the file: rounded corners, the filter functions, and opacity.',
    lessons: [
      {
        id: 'css-l96',
        title: 'CSS Style Images',
        description: 'Rounding corners into a circle or an ellipse, and the filter functions that recolour, blur and dim a picture.',
        duration: 8,
        xp: 50,
        objectives: [
          'Round a box with border-radius, and explain the difference between 50% and 9999px',
          'Apply each filter function and say what it does to the pixels',
          'Separate filter from opacity and say which one you should reach for',
          'Build the grey-until-hover pattern with a transition rather than a jump',
        ],
        quiz: {
          id: 'quiz-css-l96',
          title: 'CSS Style Images quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l96-q1',
              type: 'multiple-choice',
              prompt: 'What is the difference between `border-radius: 50%` and `border-radius: 9999px` on a 200px by 60px box?',
              options: [
                'They are identical, because 9999px is clamped to the box size',
                '`50%` resolves per axis and gives an ellipse on the long axis, while `9999px` is clamped to half the shorter side and gives a pill',
                '`9999px` is invalid and is ignored',
                '`50%` applies only to the corners and `9999px` applies to the whole box',
              ],
              answer: 1,
              explanation: 'A percentage radius resolves against each axis separately, so the corners are elliptical on a non-square box. An absolute length is clamped to half the shorter side, which is what produces the stadium shape people actually mean by "pill".',
            },
            {
              id: 'quiz-css-l96-q2',
              type: 'true-false',
              prompt: '`opacity: 0.5` and `filter: grayscale(0.5)` are two ways of writing the same thing.',
              answer: false,
              explanation: 'Opacity makes the element see-through, blending with whatever is behind it. A grayscale filter only drains colour from the element\'s own pixels and stays fully opaque.',
            },
            {
              id: 'quiz-css-l96-q3',
              type: 'blank',
              prompt: 'Which filter function follows the shape of the content rather than drawing a rectangle, so it works on an icon or a letter?',
              answers: [
                'drop-shadow',
                'dropshadow',
                'drop-shadow()',
              ],
              explanation: '`drop-shadow()` operates on the alpha channel, so the shadow traces the outline of the glyph or icon. `box-shadow` only ever draws a rectangle, which is why icons so often end up with a rectangular smudge behind them.',
            },
            {
              id: 'quiz-css-l96-q4',
              type: 'multiple-choice',
              prompt: 'A tile is grey until hovered, then snaps to full colour. What is missing?',
              options: [
                'A `border-radius` on the tile',
                'A transition on the filter, declared on the base rule',
                'A higher z-index on the hover state',
                '`filter: none` in the base rule instead of `:hover`',
              ],
              answer: 1,
              explanation: 'Without a transition the two states change instantly, which reads as a flicker rather than an effect. Put `transition: filter 0.3s` on the base rule so the change is animated in both directions.',
            },
            {
              id: 'quiz-css-l96-q5',
              type: 'identify-error',
              prompt: 'The pill-shaped button has square corners on its parent background. What is wrong?',
              code: '.pill {\n  border-radius: 9999px;\n}\n\n.card {\n  background: #29e2bd;\n  padding: 0.5rem;\n}',
              options: [
                'The parent needs the same radius, or an `overflow: hidden`, for its background to follow the curve',
                '`border-radius` does not work on background colours',
                'The radius has to be written as a percentage',
                '`padding` prevents the background from rounding',
              ],
              answer: 0,
              explanation: 'A radius only rounds the box it is applied to. The parent paints its own rectangle, so unless it shares the radius or clips its overflow, its background stays square behind the curved child.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l96-b1',
            body: 'The same two properties handle almost every "make this image look nicer" request: `border-radius` changes the shape of the box, and `filter` changes what is painted inside it. Neither touches the file, both are cheap, and both compose with the transition you learned earlier.',
          },
          {
            type: 'demo',
            id: 'c-l96-d1',
            title: 'One tile, six filters',
            body: 'The first tile is untouched. Each one after it applies a single filter, so the effect of that function on its own is easy to read. Notice that filters change the painted pixels, not the box: every tile occupies exactly the same space.',
            html: `<div class="strip">
  <figure><div class="tile"></div><figcaption>none</figcaption></figure>
  <figure><div class="tile f-gray"></div><figcaption>grayscale</figcaption></figure>
  <figure><div class="tile f-sepia"></div><figcaption>sepia</figcaption></figure>
  <figure><div class="tile f-blur"></div><figcaption>blur(2px)</figcaption></figure>
  <figure><div class="tile f-bright"></div><figcaption>brightness</figcaption></figure>
  <figure><div class="tile f-sat"></div><figcaption>saturate</figcaption></figure>
</div>`,
            css: `.strip {
  display: flex;
  gap: 0.9rem;
  padding: 1rem;
  background: #141922;
  font: 10px/1.5 ui-monospace, monospace;
  color: #9aa5b4;
}
figure {
  margin: 0;
  text-align: center;
}
.tile {
  width: 62px;
  height: 62px;
  border-radius: 10px;
  background: linear-gradient(135deg, #29e2bd, #1f6feb 60%, #f0883e);
}
figcaption {
  padding-top: 0.35rem;
}
.f-gray { filter: grayscale(1); }
.f-sepia { filter: sepia(0.85); }
.f-blur { filter: blur(2px); }
.f-bright { filter: brightness(1.35); }
.f-sat { filter: saturate(2); }`,
            height: 170,
          },
          {
            type: 'heading',
            id: 'c-l96-h1',
            level: 3,
            body: 'border-radius: circles, ellipses and pills',
          },
          {
            type: 'code',
            id: 'c-l96-c1',
            language: 'css',
            title: 'The three shapes you actually use',
            code: `border-radius: 8px;      /* a small corner, the everyday default */
border-radius: 50%;       /* a circle if the box is square, an ellipse if it is not */
border-radius: 9999px;    /* clamped to half the shorter side, so a pill at any height */

border-radius: 12px 0 12px 0;   /* corners run clockwise: top-left, top-right, bottom-right, bottom-left */
border-radius: 50% 0 50% 0;    /* two opposing circles, the "leaf" shape */`,
          },
          {
            type: 'list',
            id: 'c-l96-l1',
            style: 'bullet',
            items: [
              '**`50%` is relative, `9999px` is absolute.** On a square box the two look identical. On a 200x60 box, `50%` resolves per axis, giving a 30px radius on the short axis and an ellipse on the long one, while `9999px` is clamped to half the shorter side everywhere and gives a true pill.',
              '**Corner order is clockwise from the top-left:** top-left, top-right, bottom-right, bottom-left. Writing two values sets the first and third corners together, which is why `12px 0 12px 0` is the diagonal shape rather than two rounded corners.',
              '**A large radius needs something to clip.** The image is already clipped to its own box, but any border or background drawn on the parent will not follow the curve unless the parent also has the radius or an `overflow: hidden`.',
            ],
          },
          {
            type: 'heading',
            id: 'c-l96-h2',
            level: 3,
            body: 'The filter functions',
          },
          {
            type: 'text',
            id: 'c-l96-b2',
            body: '`filter` takes a list of functions applied to the rendered result. Each takes an amount, where `0` or `1` is usually "no effect" and higher is stronger. Because it is a filter rather than a paint setting, several can be chained.',
          },
          {
            type: 'code',
            id: 'c-l96-c2',
            language: 'css',
            title: 'Chaining filters',
            code: `filter: grayscale(1) contrast(1.2) brightness(1.05);
filter: blur(0.5px) saturate(1.4);
filter: drop-shadow(0 2px 4px rgb(0 0 0 / 0.5));

/* back to normal, no filter at all */
filter: none;`,
          },
          {
            type: 'list',
            id: 'c-l96-l2',
            style: 'bullet',
            items: [
              '`grayscale(1)` removes all colour. `sepia(1)` gives an antique tint. Pairing them is the usual way to make a photograph look old.',
              '`blur(px)` softens. It is the one filter that visibly bleeds past the element edges, because the filter output is not clipped to the box unless something clips it.',
              '`brightness()`, `contrast()`, `saturate()` and `hue-rotate()` adjust the picture in place. `saturate(0)` is another way to spell `grayscale(1)`.',
              '`drop-shadow()` follows the alpha channel rather than the box, so it traces a letter or an icon instead of drawing a rectangle behind it. It is the filter answer to `text-shadow` and to a naive `box-shadow`.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l96-w1',
            title: 'opacity and filter are not interchangeable',
            body: '`opacity: 0.5` makes the element genuinely see-through: whatever is behind it shows through, and it still occupies its box. `filter: grayscale(0.5)` makes it grey, not transparent. To fade a card in and out, use `opacity`. To drain the colour out of a thumbnail on hover, use `filter`.',
          },
          {
            type: 'tip',
            id: 'c-l96-t1',
            title: 'Drain the colour on hover, then bring it back',
            body: 'The nicest hover effect on a photo or an icon tile is to show it in colour only when the pointer is on it. Put the grey state on the base rule and `filter: none` on `:hover`, and add a transition so it fades rather than snapping. Keep the transition on the base rule, for the reason covered in the transitions lesson.',
          },
          {
            type: 'exercise',
            id: 'c-l96-x1',
            exercise: {
              id: 'ex-l96',
              instructions:
                'Give the tile fully rounded corners so it reads as a circle, drain its colour with a filter, and bring the colour back over 0.3 seconds when it is hovered.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="tile"></div>',
                css: '.tile {\n  width: 80px;\n  height: 80px;\n  background: linear-gradient(135deg, #29e2bd, #1f6feb);\n}\n',
              },
              tests: [
                {
                  id: 'ex-l96-t1',
                  label: 'The tile is a circle',
                  body: 'return getComputedStyle(document.querySelector(".tile")).borderRadius === "50%"',
                },
                {
                  id: 'ex-l96-t2',
                  label: 'The colour is drained by default',
                  body: 'const f = getComputedStyle(document.querySelector(".tile")).filter; return f.includes("grayscale") || f.includes("saturate(0")',
                },
                {
                  id: 'ex-l96-t3',
                  label: 'The change takes 0.3 seconds on the filter',
                  body: 'const s = getComputedStyle(document.querySelector(".tile")); return s.transitionDuration.includes("0.3s") && s.transitionProperty.includes("filter")',
                },
                {
                  id: 'ex-l96-t4',
                  label: 'A hover rule restores the colour',
                  body: 'const rule = Array.from(document.styleSheets).flatMap((sheet) => { try { return Array.from(sheet.cssRules) } catch (e) { return [] } }).find((r) => r.selectorText && r.selectorText.includes(":hover") && r.style && r.style.filter && !r.style.filter.includes("grayscale")); return !!rule',
                },
              ],
              hints: [
                '`border-radius: 50%` on a square box is a circle.',
                'Draining colour is `grayscale(1)` or, equivalently, `saturate(0)`.',
                'Put the transition on the base rule, then set the plain state in `:hover`.',
              ],
              solution: {
                html: '<div class="tile"></div>',
                css: '.tile {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #29e2bd, #1f6feb);\n  filter: grayscale(1);\n  transition: filter 0.3s ease-out;\n}\n\n.tile:hover {\n  filter: none;\n}\n',
              },
              testNotes:
                'A computed `filter` is reported as the function list, so the tests match on the function name rather than on an exact string. The last test reads the `:hover` rule straight from the stylesheet, because the restored state only applies while the pointer is over the tile.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s58',
    title: 'CSS Image Reflection',
    description: 'Mirroring a picture underneath itself with -webkit-box-reflect, fading it out with a mask, and the cross-browser fallback.',
    lessons: [
      {
        id: 'css-l97',
        title: 'CSS Image Reflection',
        description: 'The prefixed -webkit-box-reflect property, the mask gradient that fades the mirror, and what to do when it is unavailable.',
        duration: 7,
        xp: 45,
        objectives: [
          'Apply -webkit-box-reflect below or above an element and read its four values',
          'Fade the reflection with a mask-image gradient rather than leaving a hard edge',
          'Explain the direction and mask-size relationship',
          'Build the fallback with a duplicated element and scaleY(-1)',
        ],
        quiz: {
          id: 'quiz-css-l97',
          title: 'CSS Image Reflection quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l97-q1',
              type: 'multiple-choice',
              prompt: 'A reflection appears but ends on a hard visible edge. What is missing from the declaration?',
              options: [
                'A mask gradient on the reflection',
                'A larger `border-radius`',
                'A `z-index` value',
                '`overflow: hidden` on the parent',
              ],
              answer: 0,
              explanation: 'The mirror is a full duplicate by default, so it stops abruptly where it is clipped. A gradient mask from `transparent` to a partly opaque colour is what makes it read as a reflection rather than as a second copy.',
            },
            {
              id: 'quiz-css-l97-q2',
              type: 'true-false',
              prompt: '`-webkit-box-reflect` is a fully standardised property supported without a prefix in every current browser.',
              answer: false,
              explanation: 'It is not in any specification. Every current engine happens to support it behind the prefix, which makes it usable in practice, but a linter will flag the unknown property and a future engine is under no obligation to keep it.',
            },
            {
              id: 'quiz-css-l97-q3',
              type: 'blank',
              prompt: 'In `-webkit-box-reflect: below 8px ...`, what does the `8px` control?',
              answers: [
                'the gap',
                'gap',
                'the distance between the element and its reflection',
                'the offset',
              ],
              explanation: 'The length is the space between the element and the mirror. It is part of the reflect effect rather than a margin, so it does not shift the element or affect the space it occupies in layout.',
            },
            {
              id: 'quiz-css-l97-q4',
              type: 'multiple-choice',
              prompt: 'You build the fallback with a duplicated element and `transform: scaleY(-1)`. What must you also do?',
              options: [
                'Give the copy `position: fixed`',
                'Hide the duplicate from assistive technology, because it is announced twice',
                'Set `filter: blur(1px)` on the original',
                'Remove the original element from the DOM',
              ],
              answer: 1,
              explanation: 'A decorative mirror carries no information, so it should be `aria-hidden="true"` (and ideally `alt=""` if it is an image). Otherwise a screen reader reads the same content twice.',
            },
            {
              id: 'quiz-css-l97-q5',
              type: 'identify-error',
              prompt: 'This is meant to put the reflection above the logo. What is wrong?',
              code: '.logo {\n  box-reflect: above 6px;\n}',
              options: [
                'The property name is missing its `-webkit-` prefix, so the whole declaration is dropped',
                '`above` is not a valid direction',
                'The gap must be written as a percentage',
                'A reflection needs `position: relative`',
              ],
              answer: 0,
              explanation: 'The property has only ever shipped under the `-webkit-` prefix, so the unprefixed name is an unknown property and is discarded. Write `-webkit-box-reflect: above 6px`.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l97-b1',
            body: 'A reflection mirrors an element underneath itself and fades the copy out. CSS does this with one prefixed property, `-webkit-box-reflect`. It is not in any specification as of now, but every current engine supports it, so in practice it is safe to use once you know the one thing that goes wrong: without a mask, the mirror ends on a hard edge.',
          },
          {
            type: 'demo',
            id: 'c-l97-d1',
            title: 'No mask, gradient mask, and above',
            body: 'The first tile reflects with no mask, so the copy stops abruptly and you can see exactly where it is clipped. The second fades out over its own height, which is what a reflection should look like. The third uses `direction: above`, which flips the whole arrangement so the reflection sits on top.',
            html: `<div class="strip">
  <figure>
    <div class="tile plain"></div>
    <figcaption>no mask</figcaption>
  </figure>
  <figure>
    <div class="tile faded"></div>
    <figcaption>mask fade</figcaption>
  </figure>
  <figure>
    <div class="tile above"></div>
    <figcaption>direction: above</figcaption>
  </figure>
</div>`,
            css: `.strip {
  display: flex;
  gap: 2.5rem;
  padding: 0.6rem 1rem 2.6rem;
  background: #141922;
  font: 10px/1.5 ui-monospace, monospace;
  color: #9aa5b4;
}
figure {
  margin: 0;
  text-align: center;
}
figcaption {
  padding-top: 0.4rem;
}
.tile {
  width: 74px;
  height: 74px;
  border-radius: 10px;
  background: linear-gradient(135deg, #29e2bd, #1f6feb);
}
.plain {
  -webkit-box-reflect: below 6px;
}
.faded {
  -webkit-box-reflect: below 6px linear-gradient(transparent, rgb(0 0 0 / 0.55));
}
.above {
  -webkit-box-reflect: above 6px linear-gradient(transparent, rgb(0 0 0 / 0.55));
}`,
            height: 190,
          },
          {
            type: 'heading',
            id: 'c-l97-h1',
            level: 3,
            body: 'The four values',
          },
          {
            type: 'code',
            id: 'c-l97-c1',
            language: 'css',
            title: 'Reading the shorthand',
            code: `-webkit-box-reflect: below 8px linear-gradient(transparent, rgb(0 0 0 / 0.6));
/*            ^      ^     ^            ^
 *            |      |     |            mask: a gradient painted over the mirror
 *            |      |     mask image, which is what fades it out
 *            |      distance between the element and its reflection
 *            direction: above | below | left | right */

-webkit-box-reflect: below;                        /* mirror directly underneath */
-webkit-box-reflect: above 0 linear-gradient(transparent, black);`,
          },
          {
            type: 'list',
            id: 'c-l97-l1',
            style: 'bullet',
            items: [
              '**The direction is where the reflection lives**, not where the element is. `below` is the mirror image case; `above` flips the arrangement so the reflection sits on top and the gap opens downwards.',
              '**The length is the gap** between the element and its mirror, in any CSS length. This is a separate value rather than a margin, so it does not move the element or affect layout.',
              '**The mask is optional and it is the part that matters.** Without one the mirror is a hard-edged duplicate that looks like a bug; with a gradient from `transparent` to an opaque colour it reads as a reflection.',
              '**The mask gradient runs across the mirror\'s extent.** Use `linear-gradient(transparent, rgb(0 0 0 / 0.6))` for a vertical fade. Because the mask is positioned relative to the reflection, `mask-size` lets you tighten or extend the fade without changing the element.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l97-t1',
            title: 'Reflections read as skeuomorphism, so use them sparingly',
            body: 'The effect was a signature of skeuomorphic design and it has aged noticeably. It works when it is a small, low-contrast detail on a hero image or a logo, and looks cheap when applied to every card. If in doubt, a soft `box-shadow` in the opposite direction reads as depth without committing to a decade-old idiom.',
          },
          {
            type: 'warning',
            id: 'c-l97-w1',
            title: 'The fallback is a duplicated element, not a no-op',
            body: 'If you need this to work without the prefixed property, wrap the element and add a copy with `transform: scaleY(-1)`, then apply the gradient as a `mask-image` on the copy. Remember to hide the copy from assistive technology with `aria-hidden="true"`, because otherwise a screen reader announces the image twice.',
          },
          {
            type: 'exercise',
            id: 'c-l97-x1',
            exercise: {
              id: 'ex-l97',
              instructions:
                'Reflect the logo 6 pixels below itself and fade the mirror out with a linear gradient that starts fully transparent.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="logo">◆</div>',
                css: '.logo {\n  width: 68px;\n  height: 68px;\n  display: grid;\n  place-items: center;\n  font-size: 30px;\n  color: #141922;\n  background: #29e2bd;\n  border-radius: 10px;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l97-t1',
                  label: 'A reflection is applied below the logo',
                  body: 'const s = getComputedStyle(document.querySelector(".logo")); return (s.webkitBoxReflect || s.getPropertyValue("-webkit-box-reflect")) !== ""',
                },
                {
                  id: 'ex-l97-t2',
                  label: 'The direction is below',
                  body: 'const s = getComputedStyle(document.querySelector(".logo")); const r = s.webkitBoxReflect || s.getPropertyValue("-webkit-box-reflect"); return r.includes("below")',
                },
                {
                  id: 'ex-l97-t3',
                  label: 'The gap is 6px',
                  body: 'const s = getComputedStyle(document.querySelector(".logo")); const r = s.webkitBoxReflect || s.getPropertyValue("-webkit-box-reflect"); return r.includes("6px")',
                },
                {
                  id: 'ex-l97-t4',
                  label: 'The mask fades from transparent',
                  body: 'const s = getComputedStyle(document.querySelector(".logo")); const r = s.webkitBoxReflect || s.getPropertyValue("-webkit-box-reflect"); return r.includes("linear-gradient") && r.includes("transparent")',
                },
              ],
              hints: [
                'All four values go in the one declaration: direction, gap, then the gradient.',
                'The property name includes the `-webkit-` prefix, so an unprefixed `box-reflect` is silently dropped.',
                'The gradient must start at `transparent` at the far edge and end at a partly opaque colour near the element.',
              ],
              solution: {
                html: '<div class="logo">◆</div>',
                css: '.logo {\n  width: 68px;\n  height: 68px;\n  display: grid;\n  place-items: center;\n  font-size: 30px;\n  color: #141922;\n  background: #29e2bd;\n  border-radius: 10px;\n  -webkit-box-reflect: below 6px linear-gradient(transparent, rgb(0 0 0 / 0.5));\n}\n',
              },
              testNotes:
                'The reflection is read back off the computed style, and because it is a prefixed property the tests fall back to `getPropertyValue` if the camel-cased accessor is not populated. `getComputedStyle` reflects the applied declaration, so the tests pass without the browser needing to actually paint the mirror.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s59',
    title: 'CSS object-fit',
    description: 'What a replaced element does when its box and its intrinsic size disagree: fill, contain, cover, none and scale-down.',
    lessons: [
      {
        id: 'css-l98',
        title: 'CSS object-fit',
        description: 'How object-fit controls the painting of a replaced element inside a box of a different shape, and when it has any effect at all.',
        duration: 8,
        xp: 50,
        objectives: [
          'Name the replaced elements that object-fit applies to',
          'Choose between fill, contain, cover, none and scale-down for a given situation',
          'Explain why object-fit does nothing until the box size differs from the intrinsic size',
          'Combine object-fit with a fixed-height card and say what scale-down guarantees',
        ],
        quiz: {
          id: 'quiz-css-l98',
          title: 'CSS object-fit quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l98-q1',
              type: 'multiple-choice',
              prompt: 'An `img` has `object-fit: cover` set but the picture is still stretched. What is the most likely reason?',
              options: [
                '`object-fit` only applies to `background-image`',
                'The image has no definite width or height, so it lays out at its intrinsic size and there is no mismatch to resolve',
                'The file has to be a JPEG',
                'The parent needs `position: relative`',
              ],
              answer: 1,
              explanation: 'With no size of its own the image occupies exactly its intrinsic box, so the fit mode has nothing to do. `object-fit` becomes visible the moment you give the element explicit `width` and `height`.',
            },
            {
              id: 'quiz-css-l98-q2',
              type: 'true-false',
              prompt: '`object-fit: contain` guarantees that nothing is cropped, and `object-fit: cover` guarantees that no empty space is left.',
              answer: true,
              explanation: 'That is exactly the tradeoff. `contain` shrinks until the whole image fits, leaving letterbox space. `cover` grows until the box is full, cutting off the overflow.',
            },
            {
              id: 'quiz-css-l98-q3',
              type: 'blank',
              prompt: 'Which value of `object-fit` guarantees the content is never scaled up, only down to fit?',
              answers: [
                'scale-down',
                'scale down',
                'scaledown',
              ],
              explanation: '`scale-down` acts as `none` while the content is smaller than the box and as `contain` once it is larger, so it will never magnify a low-resolution image past its own pixels.',
            },
            {
              id: 'quiz-css-l98-q4',
              type: 'multiple-choice',
              prompt: 'A hero image has been squashed by a grid cell that is shorter than the picture. Which combination fixes it?',
              options: [
                'Set an explicit `height` on the image and add `object-fit: cover`',
                'Add `border-radius` to the image',
                'Set `overflow: visible` on the grid item',
                'Use `object-position: top`',
              ],
              answer: 0,
              explanation: 'The fix is a definite box plus a fit mode. `cover` then fills that box and crops the overflow instead of squashing the whole picture into it.',
            },
            {
              id: 'quiz-css-l98-q5',
              type: 'identify-error',
              prompt: 'The crop is not happening. What is the mistake?',
              code: '.card {\n  height: 180px;\n  overflow: hidden;\n}\n\n.card img {\n  width: 100%;\n  object-fit: cover;\n}',
              options: [
                '`height: auto` is missing from the image',
                'Only `width` is set, so the image still lays out at its intrinsic height and `cover` has no mismatch to resolve',
                '`overflow: hidden` on the parent cancels out `object-fit`',
                '`object-fit` must be set on the parent, not the image',
              ],
              answer: 1,
              explanation: 'The parent being a fixed height is not enough; the replaced element needs its own definite height. Add `height: 100%` or `height: 180px` to the `img` and the crop appears.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l98-b1',
            body: 'A replaced element is one whose content comes from outside the CSS box: `img`, `video`, `canvas`, `svg`, and now `iframe`. By default its content is stretched to fill whatever box you give it, which distorts it. `object-fit` lets you choose how the content sits inside that box instead.',
          },
          {
            type: 'demo',
            id: 'c-l98-d1',
            title: 'One 2:1 image, four boxes, five behaviours',
            body: 'The image is a flat two-to-one rectangle with a green left half and a blue right half, so stretching is obvious. Each cell forces it into a tall, narrow box. `fill` squashes it to fit. `contain` shrinks it until the whole thing is visible, letterboxed with empty space above and below. `cover` grows it until the box is full, cropping the sides. `none` leaves it at its natural size and lets it overflow. `scale-down` picks whichever of `none` and `contain` is smaller.',
            html: `<div class="grid">
  <figure><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Crect width='100' height='100' fill='%2329e2bd'/%3E%3Crect x='100' width='100' height='100' fill='%231f6feb'/%3E%3C/svg%3E" alt=""><figcaption>fill (default)</figcaption></figure>
  <figure><img class="contain" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Crect width='100' height='100' fill='%2329e2bd'/%3E%3Crect x='100' width='100' height='100' fill='%231f6feb'/%3E%3C/svg%3E" alt=""><figcaption>contain</figcaption></figure>
  <figure><img class="cover" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Crect width='100' height='100' fill='%2329e2bd'/%3E%3Crect x='100' width='100' height='100' fill='%231f6feb'/%3E%3C/svg%3E" alt=""><figcaption>cover</figcaption></figure>
  <figure><img class="none" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Crect width='100' height='100' fill='%2329e2bd'/%3E%3Crect x='100' width='100' height='100' fill='%231f6feb'/%3E%3C/svg%3E" alt=""><figcaption>none</figcaption></figure>
  <figure><img class="scale-down" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 100'%3E%3Crect width='100' height='100' fill='%2329e2bd'/%3E%3Crect x='100' width='100' height='100' fill='%231f6feb'/%3E%3C/svg%3E" alt=""><figcaption>scale-down</figcaption></figure>
</div>`,
            css: `.grid {
  display: flex;
  gap: 0.9rem;
  padding: 1rem;
  background: #141922;
  font: 10px/1.5 ui-monospace, monospace;
  color: #9aa5b4;
}
figure {
  margin: 0;
  text-align: center;
}
figcaption {
  padding-top: 0.35rem;
}
img {
  display: block;
  width: 92px;
  height: 104px;
  background: #1d2531;
}
.contain { object-fit: contain; }
.cover { object-fit: cover; }
.none { object-fit: none; }
.scale-down { object-fit: scale-down; }`,
            height: 180,
          },
          {
            type: 'heading',
            id: 'c-l98-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'list',
            id: 'c-l98-l1',
            style: 'bullet',
            items: [
              '**`fill` (the default)** stretches the content to exactly the box, ignoring the intrinsic ratio entirely. This is the distortion you are trying to escape.',
              '**`contain`** shrinks the content until all of it is visible inside the box, then centres it, leaving empty space on the two short axes. Nothing is ever cropped. Use it when the whole picture matters.',
              '**`cover`** grows the content until the box is completely full, then crops the overflow, again centred. Use it when the box shape matters more than the edges, which is the normal choice for a card or a hero image.',
              '**`none`** renders the content at its intrinsic size and clips whatever does not fit. It is how you pin an avatar to a fixed pixel size without scaling it.',
              '**`scale-down`** behaves as `none` when the content is smaller than the box and as `contain` when it is larger. The guarantee is that content is never scaled *up*, which is why it is the safest default for thumbnails that must not be enlarged past their own resolution.',
            ],
          },
          {
            type: 'warning',
            id: 'c-l98-w1',
            title: 'object-fit does nothing until the box size is set',
            body: 'An `img` with no width or height lays out at its intrinsic size, so there is no mismatch for `object-fit` to resolve. If it appears to be ignored, the cause is almost always that the image has not been given a size. Give the element explicit `width` and `height` and the property starts working immediately.',
          },
          {
            type: 'tip',
            id: 'c-l98-t1',
            title: 'Reserve the space to avoid a jump',
            body: 'Setting both `width` and `height` on an image reserves its box before the file arrives, which stops the page reflowing when it loads. Because that ratio is often wrong for real photos, pair it with `aspect-ratio` so the reserved shape is deliberate rather than whatever the current file happens to be, and add `height: auto` if you want the ratio to follow the image instead.',
          },
          {
            type: 'exercise',
            id: 'c-l98-x1',
            exercise: {
              id: 'ex-l98',
              instructions:
                'Fix the thumbnail so it fills its box without distortion, and make it shrink rather than upscale when the box is bigger than the image.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="frame">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%2329e2bd\'/%3E%3Crect x=\'100\' width=\'100\' height=\'100\' fill=\'%231f6feb\'/%3E%3C/svg%3E" alt="">\n</div>',
                css: '.frame {\n  width: 120px;\n  height: 150px;\n  overflow: hidden;\n  border-radius: 8px;\n  background: #1d2531;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l98-t1',
                  label: 'The image fills its box without distortion',
                  body: 'return getComputedStyle(document.querySelector("img")).objectFit === "cover"',
                },
                {
                  id: 'ex-l98-t2',
                  label: 'The image never scales up past its intrinsic size',
                  body: 'const v = getComputedStyle(document.querySelector("img")).objectFit; return v === "scale-down" || v === "none"',
                },
                {
                  id: 'ex-l98-t3',
                  label: 'The image is given a definite box, or object-fit could not take effect',
                  body: 'const s = getComputedStyle(document.querySelector("img")); return s.width !== "auto" && s.height !== "auto"',
                },
                {
                  id: 'ex-l98-t4',
                  label: 'The frame is still clipping',
                  body: 'return getComputedStyle(document.querySelector(".frame")).overflow === "hidden"',
                },
              ],
              hints: [
                'Filling the box completely means `cover`. Never scaling up means `scale-down`.',
                'These two are in tension: `cover` always fills and always scales in at least one axis. Pick the one that matters more for your layout.',
                '`object-fit` only does anything if the image itself has a definite width and height.',
              ],
              solution: {
                html: '<div class="frame">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%2329e2bd\'/%3E%3Crect x=\'100\' width=\'100\' height=\'100\' fill=\'%231f6feb\'/%3E%3C/svg%3E" alt="">\n</div>',
                css: '.frame {\n  width: 120px;\n  height: 150px;\n  overflow: hidden;\n  border-radius: 8px;\n  background: #1d2531;\n}\n\n.frame img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n',
              },
              testNotes:
                'The first two requirements pull against each other: `cover` always fills, which on a small image means upscaling, and `scale-down` never upscales, which means it may leave gaps. The tests accept either resolution so the point being tested is the reasoning, not one rigid answer. The third test is the one people miss, because `object-fit` on an unsized image is silently inert.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'css-s60',
    title: 'CSS object-position',
    description: 'Choosing which part of an image survives the crop: the keywords, the numeric form, and why it pairs with object-fit.',
    lessons: [
      {
        id: 'css-l99',
        title: 'CSS object-position',
        description: 'Anchoring a cropped image to a chosen point, with keywords, percentages and lengths.',
        duration: 7,
        xp: 45,
        objectives: [
          'Control which part of an image stays visible once object-fit has cropped it',
          'Use the four-value or two-value keyword form and the percentage form',
          'Explain why a percentage anchor is the useful one for faces and products',
          'Say how object-position relates to background-position',
        ],
        quiz: {
          id: 'quiz-css-l99',
          title: 'CSS object-position quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-css-l99-q1',
              type: 'multiple-choice',
              prompt: 'Which set of keywords is valid for `object-position`?',
              options: [
                '`top`, `right`, `bottom`, `left`, plus `center`',
                '`start`, `end`, `top`, `bottom`',
                'Any CSS keyword, since it shares the grammar with `background-position`',
                'Only `top-left`, `top-right`, `bottom-left`, `bottom-right`',
              ],
              answer: 0,
              explanation: 'The four edge keywords plus `center` are the whole set. There is no `top-left`: that position is written as two keywords, `top left`, and the order does not matter.',
            },
            {
              id: 'quiz-css-l99-q2',
              type: 'true-false',
              prompt: 'A centred `object-fit: cover` crop is a safe default for portrait photographs, because the subject is usually in the middle.',
              answer: false,
              explanation: 'A centred crop cuts heads off, because the interesting part of a portrait is near the top of the frame rather than in its middle. `object-position: top` survives far more crop ratios.',
            },
            {
              id: 'quiz-css-l99-q3',
              type: 'blank',
              prompt: 'What does `object-position: 50% 50%` mean, and what is it equivalent to?',
              answers: [
                'center',
                'centre',
                'the centre',
                'centered',
              ],
              explanation: 'Fifty percent on both axes is the centred position, and it is the initial value. Note that percentages here resolve against the overflow rather than against the image itself.',
            },
            {
              id: 'quiz-css-l99-q4',
              type: 'multiple-choice',
              prompt: 'Why is a percentage anchor usually better than a fixed pixel offset?',
              options: [
                'Percentages are the only valid syntax for the vertical axis',
                'The anchor stays on the same relative part of the subject at any crop size, so it survives being shown at several different aspect ratios',
                'Pixels do not work on replaced elements',
                'Percentages ignore object-fit',
              ],
              answer: 1,
              explanation: 'A percentage is relative to the overflow, so `20% 20%` tracks the same point of the subject whether the card is 80 or 800 pixels wide. A fixed length drifts as the crop changes and stops lining up.',
            },
            {
              id: 'quiz-css-l99-q5',
              type: 'identify-error',
              prompt: 'The crop position is ignored. What is wrong?',
              code: '.thumb {\n  width: 120px;\n  height: 120px;\n  object-position: 50% 0%;\n}',
              options: [
                'The value is invalid, because percentages cannot be mixed with object-fit',
                'The property is on the wrapper rather than on the `img` itself',
                '`object-position` requires `position: absolute`',
                'The anchor should be a length, not a percentage',
              ],
              answer: 1,
              explanation: '`object-position` applies to the replaced element, so it has to be on the `img` or `video`. Put it on the container and it describes the container\'s own replaced content, of which there is none.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'c-l99-b1',
            body: '`object-fit` decides *how much* of the image you see. `object-position` decides *which part*. Once `cover` has cropped the sides off, this is the property that decides whether the surviving strip is the top of the picture or the middle, and where a face sits inside it.',
          },
          {
            type: 'demo',
            id: 'c-l99-d1',
            title: 'The same crop, four anchors',
            body: 'All four images are in identical tall boxes with `object-fit: cover`, so they show the same amount of the picture and differ only in what is kept. The first is centred, the second keeps the top, the third keeps the bottom, and the fourth uses a numeric anchor that biases the crop towards the left. Only the third one keeps the marker that sits near the bottom of the source image.',
            html: `<div class="grid">
  <figure><img class="c" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 260'%3E%3Crect width='100' height='260' fill='%231d2531'/%3E%3Crect y='196' width='100' height='64' fill='%23f0883e'/%3E%3Ccircle cx='50' cy='52' r='22' fill='%2329e2bd'/%3E%3C/svg%3E" alt=""><figcaption>center</figcaption></figure>
  <figure><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 260'%3E%3Crect width='100' height='260' fill='%231d2531'/%3E%3Crect y='196' width='100' height='64' fill='%23f0883e'/%3E%3Ccircle cx='50' cy='52' r='22' fill='%2329e2bd'/%3E%3C/svg%3E" alt="" style="object-position: top"><figcaption>top</figcaption></figure>
  <figure><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 260'%3E%3Crect width='100' height='260' fill='%231d2531'/%3E%3Crect y='196' width='100' height='64' fill='%23f0883e'/%3E%3Ccircle cx='50' cy='52' r='22' fill='%2329e2bd'/%3E%3C/svg%3E" alt="" style="object-position: bottom"><figcaption>bottom</figcaption></figure>
  <figure><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 260'%3E%3Crect width='100' height='260' fill='%231d2531'/%3E%3Crect y='196' width='100' height='64' fill='%23f0883e'/%3E%3Ccircle cx='50' cy='52' r='22' fill='%2329e2bd'/%3E%3C/svg%3E" alt="" style="object-position: 25% 60%"><figcaption>25% 60%</figcaption></figure>
</div>`,
            css: `.grid {
  display: flex;
  gap: 0.9rem;
  padding: 1rem;
  background: #141922;
  font: 10px/1.5 ui-monospace, monospace;
  color: #9aa5b4;
}
figure {
  margin: 0;
  text-align: center;
}
figcaption {
  padding-top: 0.35rem;
}
img {
  display: block;
  width: 78px;
  height: 96px;
  object-fit: cover;
}`,
            height: 175,
          },
          {
            type: 'heading',
            id: 'c-l99-h1',
            level: 3,
            body: 'How it works',
          },
          {
            type: 'text',
            id: 'c-l99-b2',
            body: 'The property takes the same shape of value as `background-position`, in one, two, three or four parts. It describes where in the box the image is placed when the image does not fill it after fitting.',
          },
          {
            type: 'code',
            id: 'c-l99-c1',
            language: 'css',
            title: 'Every form you need',
            code: `object-position: center;            /* the default: 50% 50% */
object-position: top;               /* 50% 0 */
object-position: right bottom;      /* two keywords, no space for left/top */
object-position: left 12px top 20px;/* edges and lengths, in that order */
object-position: 30% 70%;           /* percentages, which is the useful one */`,
          },
          {
            type: 'list',
            id: 'c-l99-l1',
            style: 'bullet',
            items: [
              '**Four keywords only.** `top`, `bottom`, `left` and `right`. There is no `top-left` in the keyword set; `top left` does it. Giving two keywords sets both axes at once, and the order you write them in does not matter.',
              '**A keyword mixes with lengths**, giving you "top" on one axis and an exact offset on the other. This is the form you want for nudging a crop.',
              '**Percentages resolve against the overflow, not the image**, which is the part people get wrong. `50%` is the centred position. `0%` is flush with the start edge and `100%` flush with the end edge. Because the anchor is proportional, `20% 20%` keeps roughly the same relative point in view at any crop size, which is why it is the right value for a portrait or a product shot.',
              '**An offset is measured from where the image overflows**, so a negative length pulls the image towards the start edge rather than doing anything unexpected.',
            ],
          },
          {
            type: 'tip',
            id: 'c-l99-t1',
            title: 'Anchor faces and logos to the top',
            body: 'A centred crop cuts heads off, because the interesting part of a portrait is not in the middle of the frame. The same applies to logos with text under the mark and to any screenshot with a title bar. `object-position: top` (or a percentage a little above centre) survives a far wider range of crop ratios than `center` does.',
          },
          {
            type: 'example',
            id: 'c-l99-e1',
            title: 'The same pair on a background image',
            body: 'The gradient is a `background-image` rather than an `<img>`, but the anchoring syntax is identical. `background-position` is the equivalent of `object-position`, and it also takes percentages and four-part edge syntax. The only differences are the order of the shorthand parts and the fact that a background does not have an intrinsic size unless you give it one with `background-size`.',
            html: `<div class="hero"></div>`,
            css: `.hero {
  height: 130px;
  border-radius: 8px;
  background-image: linear-gradient(120deg, #29e2bd 0%, #1f6feb 45%, #141922 46%, #141922 100%);
  background-size: 220% 100%;
  background-position: 80% 50%;
  background-repeat: no-repeat;
}`,
            showPreview: true,
          },
          {
            type: 'exercise',
            id: 'c-l99-x1',
            exercise: {
              id: 'ex-l99',
              instructions:
                'The avatar is being cropped by its circular frame. Anchor the crop to the top third so the head is not cut off, using a percentage rather than a keyword.',
              languages: ['html', 'css'],
              starterCode: {
                html: '<div class="avatar">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 260\'%3E%3Crect width=\'100\' height=\'260\' fill=\'%231d2531\'/%3E%3Ccircle cx=\'50\' cy=\'52\' r=\'22\' fill=\'%2329e2bd\'/%3E%3C/svg%3E" alt="">\n</div>',
                css: '.avatar {\n  width: 90px;\n  height: 90px;\n  overflow: hidden;\n  border-radius: 50%;\n  background: #1d2531;\n}\n',
              },
              tests: [
                {
                  id: 'ex-l99-t1',
                  label: 'A crop anchor is set on the image',
                  body: 'return getComputedStyle(document.querySelector("img")).objectPosition !== "50% 50%"',
                },
                {
                  id: 'ex-l99-t2',
                  label: 'The anchor is a percentage, not a keyword',
                  body: 'return getComputedStyle(document.querySelector("img")).objectPosition.includes("%")',
                },
                {
                  id: 'ex-l99-t3',
                  label: 'The vertical anchor is towards the top, at or above a third',
                  body: 'const p = getComputedStyle(document.querySelector("img")).objectPosition.split(/\\s+/); const y = parseFloat(p[1]); return Number.isFinite(y) && y <= 33.34',
                },
                {
                  id: 'ex-l99-t4',
                  label: 'The image is still using object-fit, so there is something to crop',
                  body: 'const v = getComputedStyle(document.querySelector("img")).objectFit; return v !== "fill"',
                },
              ],
              hints: [
                'Two values: horizontal first, then vertical.',
                'The vertical value is a percentage of the crop, where `0%` is flush with the top edge.',
                'If the image is not being cropped at all, `object-fit` still needs to be something other than `fill`.',
              ],
              solution: {
                html: '<div class="avatar">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 260\'%3E%3Crect width=\'100\' height=\'260\' fill=\'%231d2531\'/%3E%3Ccircle cx=\'50\' cy=\'52\' r=\'22\' fill=\'%2329e2bd\'/%3E%3C/svg%3E" alt="">\n</div>',
                css: '.avatar {\n  width: 90px;\n  height: 90px;\n  overflow: hidden;\n  border-radius: 50%;\n  background: #1d2531;\n}\n\n.avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  object-position: 50% 20%;\n}\n',
              },
              testNotes:
                'The computed `object-position` resolves to percentages, so a keyword answer reads back as `50% 0%` rather than `top`. The third test parses the vertical component and requires it at or above a third, which accepts both `20%` and a keyword-equivalent `0%`.',
            },
          },
        ],
      },
    ],
  },
]