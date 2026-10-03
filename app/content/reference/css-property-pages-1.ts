import type { CssPropertyPage } from '~/types/content'
import { atRule, family, page } from './css-property-page-builders'

/**
 * Per-page declaration values. These sit above the page array on purpose: the
 * array is built at import time, so a map declared further down the file would
 * still be in the temporal dead zone when the pages read from it.
 */
const ANIMATION_VALUES: Record<string, string> = {
  'animation-delay': '0.4s',
  'animation-direction': 'alternate',
  'animation-duration': '600ms',
  'animation-fill-mode': 'forwards',
  'animation-iteration-count': '3',
  'animation-name': 'slide-in',
  'animation-play-state': 'paused',
  'animation-timing-function': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
}

const BACKGROUND_VALUES: Record<string, string> = {
  'background-attachment': 'fixed',
  'background-blend-mode': 'multiply',
  'background-clip': 'padding-box',
  'background-color': '#12161b',
  'background-image': 'url(/noise.png)',
  'background-origin': 'border-box',
  'background-position': 'center 25%',
  'background-repeat': 'no-repeat',
  'background-size': 'cover',
}

const BORDER_VALUES: Record<string, string> = {
  border: '1px solid #2a323d',
  'border-bottom': '2px solid var(--brand)',
  'border-bottom-color': 'var(--warn)',
  'border-bottom-left-radius': '0.5rem',
  'border-bottom-right-radius': '0 0 0.75rem 0',
  'border-bottom-style': 'dashed',
  'border-bottom-width': '2px',
  'border-left': '3px solid currentColor',
  'border-left-color': 'var(--brand)',
  'border-left-style': 'solid',
  'border-left-width': '3px',
  'border-radius': '0.75rem',
  'border-right': '1px dashed #2a323d',
  'border-right-color': 'var(--warn)',
  'border-right-style': 'dotted',
  'border-right-width': '1px',
  'border-top': '1px solid #2a323d',
  'border-top-color': 'var(--brand)',
  'border-top-left-radius': '0.75rem 0.25rem 0.25rem 0.75rem',
  'border-top-right-radius': '50%',
  'border-top-style': 'solid',
  'border-top-width': '1px',
  'border-style': 'none solid dashed double',
  'border-width': '1px 2px 3px 4px',
}

const BORDER_IMAGE_VALUES: Record<string, string> = {
  'border-image-outset': '2px',
  'border-image-repeat': 'round',
  'border-image-slice': '32 fill',
  'border-image-source': 'url(/frame.png)',
  'border-image-width': '16px',
}

const BREAK_VALUES: Record<string, string> = {
  'break-after': 'page',
  'break-before': 'avoid',
  'break-inside': 'avoid-page',
}

const COLUMN_VALUES: Record<string, string> = {
  'column-count': '3',
  'column-fill': 'balance',
  'column-gap': '2rem',
  'column-rule': '1px solid #2a323d',
  'column-rule-color': '#2a323d',
  'column-rule-style': 'solid',
  'column-rule-width': '1px',
  'column-span': 'all',
  'column-width': '14rem',
  columns: '14rem 3',
}

const COUNTER_VALUES: Record<string, string> = {
  'counter-increment': 'section 1',
  'counter-reset': 'section 0',
}

const FLEX_VALUES: Record<string, string> = {
  flex: '1 1 12rem',
  'flex-basis': '12rem',
  'flex-direction': 'column',
  'flex-flow': 'row wrap',
  'flex-grow': '1',
  'flex-shrink': '0',
  'flex-wrap': 'wrap',
}

const FONT_VALUES: Record<string, string> = {
  'font-feature-settings': '"tnum" 1',
  'font-kerning': 'normal',
  'font-size': '1.125rem',
  'font-size-adjust': '0.512',
  'font-stretch': 'semi-condensed',
  'font-style': 'italic',
  'font-variant': 'small-caps',
  'font-variant-caps': 'all-small-caps',
  'font-weight': '650',
}

/**
 * Detail pages for properties 1-109 of the source index: flexbox alignment and
 * animation, the background and border block, tables, columns and counters,
 * then display, the flex longhands and typography.
 */
export const cssPropertyPages1: CssPropertyPage[] = [
  /* ---------------------------- flex alignment ---------------------------- */
  page(
    'align-content',
    'Only does anything when the container has extra cross-axis space left over: multiple flex lines that wrap, or grid tracks that leave a gap. With a single line of flex items, normal behaves like start.',
    `.cards {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  min-height: 20rem;
}`,
    ['align-items', 'align-self', 'justify-content', 'gap', 'flex-wrap'],
    'flexbox',
  ),
  page(
    'align-items',
    'Sets the cross-axis alignment for every child at once, which is the one line most flex layouts need.',
    `.row {
  display: flex;
  align-items: center;
  gap: 1rem;
}`,
    ['align-content', 'align-self', 'justify-content', 'gap'],
    'flexbox',
  ),
  page(
    'align-self',
    'Lets one item break from the container alignment, for a single item that needs to sit differently.',
    `.row {
  display: flex;
  align-items: center;
}

.row__badge {
  align-self: flex-start;
}`,
    ['align-items', 'align-content', 'order'],
    'flexbox',
  ),
  page(
    'all',
    'Resets every property on an element. It is occasionally the right tool on a third-party component you cannot restyle any other way, but it is not a reset strategy: a plain universal reset is easier to reason about.',
    `.embed,
.embed * {
  all: revert;
}

.card {
  all: initial;
  display: grid;
}`,
    ['box-sizing', 'isolation', 'clip-path'],
    'core',
  ),

  /* ------------------------------ animation ------------------------------ */
  page(
    'animation',
    'Starts a keyframe animation and sets its timing in one declaration. The order of the longhands does not matter, but duration and timing-function do need values for the animation to be visible.',
    `.spinner {
  animation: spin 900ms linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`,
    ['animation-name', 'animation-duration', 'animation-timing-function', 'transition'],
    'animation',
  ),
  ...family({
    names: [
      'animation-delay',
      'animation-direction',
      'animation-duration',
      'animation-fill-mode',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
    ],
    lead: '.toast',
    declaration: (name) => `  ${name}: ${ANIMATION_VALUES[name]!};`,
    usage: {
      'animation-delay': 'Holds the animation at its first frame for a moment, which staggers a list of items into a cascade.',
      'animation-direction': 'Plays the frames in reverse, or alternates direction on every repeat, for a boomerang effect.',
      'animation-duration': 'How long one pass through the keyframes takes. At the initial value of 0s the animation finishes instantly, so it looks like nothing happened.',
      'animation-fill-mode': 'Keeps the first or last keyframe applied outside the animation, so a fade-out stays faded instead of snapping back.',
      'animation-iteration-count': 'How many times the animation repeats. A value of 1, the default, runs once and stops.',
      'animation-name': 'Names the @keyframes rule to play. Without a matching name the animation does nothing.',
      'animation-play-state': 'Pauses a running animation without removing it, which is how a hover-out animation can be held mid-way.',
      'animation-timing-function': 'The easing curve between keyframes. linear is right for continuous motion such as a spinner; ease is better for something that starts and stops.',
    },
    related: ['animation', 'transition', '@keyframes'],
    era: 'animation',
  }),

  /* ------------------------ background and borders ----------------------- */
  page(
    'backface-visibility',
    'Hides the back face of a rotated element, so a card that spins in 3D does not show mirrored text at the halfway point.',
    `.card {
  transform: rotateY(180deg);
  backface-visibility: hidden;
}`,
    ['transform', 'transform-style', 'perspective', 'filter'],
    'transform3d',
  ),
  page(
    'background',
    'Shorthand for the background image, position, size, repeat, attachment, origin, clip and colour. Setting an image resets background-color to transparent.',
    `.hero {
  background: #101418 url(/hero.avif) center / cover no-repeat;
}

.card {
  background: linear-gradient(#1b2028, #12161b) padding-box;
}`,
    ['background-image', 'background-position', 'background-size', 'background-repeat', 'background-color'],
    'core',
  ),
  ...family({
    names: [
      'background-attachment',
      'background-blend-mode',
      'background-clip',
      'background-color',
      'background-image',
      'background-origin',
      'background-position',
      'background-repeat',
      'background-size',
    ],
    lead: '.panel',
    declaration: (name) => `  ${name}: ${BACKGROUND_VALUES[name]!};`,
    usage: {
      'background-attachment': 'Pins the background to the viewport so it stays put as the page scrolls. It is expensive to paint, so it is worth avoiding on long pages.',
      'background-blend-mode': 'Blends this background layer with the layers below it, so a gradient can tint a photo without an extra element.',
      'background-clip': 'Restricts the background paint to a box. The common use is border-box with a background-clip: padding-box, or text for gradient text.',
      'background-color': 'The flat colour behind everything else. It is the part of background that does not get reset by setting an image.',
      'background-image': 'One or more images or gradients, each comma separated into its own layer. The first one listed sits on top.',
      'background-origin': 'Decides which box the background image is positioned and sized against, which is what stops a photo escaping a rounded corner.',
      'background-position': 'Where the image sits in its positioning area. Keywords such as center are clearer than a percentage, and always add a second value to keep it vertical too.',
      'background-repeat': 'Tiles the image. repeat-x and repeat-y are common for texture strips, and no-repeat is the usual choice for a hero photo.',
      'background-size': 'The size of the background image. cover fills the box and crops, contain fits the whole image, and auto keeps the intrinsic size.',
    },
    related: ['background', 'background-color', 'background-size', 'border-radius', 'box-decoration-break'],
    era: 'multipleBackgrounds',
  }),
  ...family({
    names: [
      'border',
      'border-bottom',
      'border-bottom-color',
      'border-bottom-left-radius',
      'border-bottom-right-radius',
      'border-bottom-style',
      'border-bottom-width',
      'border-left',
      'border-left-color',
      'border-left-style',
      'border-left-width',
      'border-radius',
      'border-right',
      'border-right-color',
      'border-right-style',
      'border-right-width',
      'border-top',
      'border-top-color',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-top-style',
      'border-top-width',
      'border-style',
      'border-width',
    ],
    lead: '.card',
    declaration: (name) => `  ${name}: ${BORDER_VALUES[name]!};`,
    usage: {
      border: 'Shorthand for all four sides at once: width, style and colour in that order. Omitting a part resets it, so write the longhands when you only want to change one.',
      'border-bottom': 'Shorthand for the bottom edge alone, for a rule under a heading or an underline on a link.',
      'border-bottom-color': 'Recolours the bottom edge on its own, which is how a validation message turns the border red.',
      'border-bottom-left-radius': 'Rounds only the bottom left corner, for a tab shape or a rounded panel that is square at the top.',
      'border-bottom-right-radius': 'Rounds only the bottom right corner, for the curved end of a speech bubble or an input with a squared top.',
      'border-bottom-style': 'The line style of the bottom edge, such as solid, dashed or dotted.',
      'border-bottom-width': 'The thickness of the bottom edge.',
      'border-left': 'Shorthand for the left edge alone, which is the usual way to draw an accent bar next to a quote or a warning.',
      'border-left-color': 'Recolours the left edge without touching the other three.',
      'border-left-style': 'The line style of the left edge.',
      'border-left-width': 'The thickness of the left edge, often used with border-left-style: solid to draw a rule.',
      'border-radius': 'Rounds the corners of the border box. One value rounds all four, two set top and bottom, three set top corners, bottom corners and then top left, and four set each corner clockwise.',
      'border-right': 'Shorthand for the right edge alone.',
      'border-right-color': 'Recolours the right edge without touching the other three.',
      'border-right-style': 'The line style of the right edge.',
      'border-right-width': 'The thickness of the right edge.',
      'border-top': 'Shorthand for the top edge alone, used for the rule under a fixed header.',
      'border-top-color': 'Recolours the top edge without touching the other three.',
      'border-top-left-radius': 'Rounds only the top left corner, so a card can be attached to something above it.',
      'border-top-right-radius': 'Rounds only the top right corner, for the rounded head of a speech bubble.',
      'border-top-style': 'The line style of the top edge.',
      'border-top-width': 'The thickness of the top edge.',
      'border-style': 'The line style of all four edges, in top right bottom left order, so you can set one border-width and vary the styles per side.',
      'border-width': 'The thickness of all four edges, in top right bottom left order. A border with no style is invisible however thick it is.',
    },
    related: ['border-color', 'outline', 'box-shadow', 'box-sizing', 'border-collapse'],
    era: 'core',
  }),
  page(
    'border-color',
    'The colour of all four edges in one declaration, in top right bottom left order.',
    `.card {
  border: 1px solid;
  border-color: #2a323d;
  border-top-color: var(--brand);
}`,
    ['border', 'border-style', 'border-width', 'outline-color'],
    'core',
  ),
  page(
    'border-image',
    'Draws the border from slices of a single image, which is the only way to get a non-rectangular or bevelled frame.',
    `.frame {
  border: 16px solid transparent;
  border-image: url(/frame.png) 32 fill / 16px round;
}`,
    ['border-image-slice', 'border-image-width', 'border-image-repeat', 'border-radius'],
    'borderImage',
  ),
  ...family({
    names: [
      'border-image-outset',
      'border-image-repeat',
      'border-image-slice',
      'border-image-source',
      'border-image-width',
    ],
    lead: '.frame',
    declaration: (name) => `  ${name}: ${BORDER_IMAGE_VALUES[name]!};`,
    usage: {
      'border-image-outset': 'Draws the border image further out than the border box, which is how a frame can cast a small lip over the content.',
      'border-image-repeat': 'How the border image is tiled along each edge. stretch is the default, round and repeat tile evenly instead.',
      'border-image-slice': 'How far into the source image the edges, corners and middle are cut. Unitless numbers are fractions of the image size, so 32 on a 200px image is 16%.',
      'border-image-source': 'The image the border is drawn from.',
      'border-image-width': 'How thick each region is drawn, either as a length or as a multiple of border-width.',
    },
    related: ['border-image', 'border', 'border-radius'],
    era: 'borderImage',
  }),
  page(
    'border-collapse',
    'Decides whether table cell borders are drawn independently or merged into one shared grid of lines. It only has an effect on a table with border-collapse set on the table itself.',
    `.prices {
  border-collapse: collapse;
}

.prices th,
.prices td {
  border: 1px solid #2a323d;
  padding: 0.5rem 0.75rem;
}`,
    ['border-spacing', 'border-radius', 'table-layout', 'caption-side'],
    'tableLayout',
  ),
  page(
    'border-spacing',
    'The gap between table cells, and only works while border-collapse is separate, since collapsed cells share a single line.',
    `.grid-table {
  border-collapse: separate;
  border-spacing: 0.25rem;
}`,
    ['border-collapse', 'table-layout'],
    'tableLayout',
  ),
  page(
    'bottom',
    'Offsets a positioned element from the bottom of its containing block. With position: sticky it is the offset the element sticks at.',
    `.toolbar {
  position: sticky;
  bottom: 0;
}`,
    ['top', 'left', 'right', 'position', 'inset'],
    'core',
  ),
  page(
    'box-decoration-break',
    'Decides whether a background and border are painted once for a box that is split across lines, or repeated on every fragment. Without it a broken inline element gets no padding at the start of the second line.',
    `.quote {
  box-decoration-break: clone;
  padding: 0.1em 0.3em;
  background: #1d242c;
  border-radius: 0.3em;
}`,
    ['background-clip', 'border-radius', 'display'],
    'boxDecorationBreak',
  ),
  page(
    'box-shadow',
    'Draws a shadow without affecting layout, so it never causes a reflow. It accepts a list of shadows, each an inset flag, offsets, a blur radius, a spread radius and a colour.',
    `.card {
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.4), 0 8px 24px rgb(0 0 0 / 0.3);
}

.card--focus {
  box-shadow: inset 0 0 0 2px var(--brand);
}`,
    ['box-sizing', 'border-radius', 'outline', 'filter', 'text-shadow'],
    'boxShadow',
  ),
  page(
    'box-sizing',
    'Decides whether padding and border count inside the declared size. Setting border-box globally makes every width in the stylesheet mean what it looks like it means.',
    `*,
*::before,
*::after {
  box-sizing: border-box;
}

.button {
  width: 12rem;
  padding: 0.6rem 1rem;
  border: 1px solid #2a323d;
}`,
    ['width', 'height', 'min-height', 'max-width', 'all'],
    'core',
  ),
  ...family({
    names: ['break-after', 'break-before', 'break-inside'],
    lead: '.receipt',
    declaration: (name) => `  ${name}: ${BREAK_VALUES[name]!};`,
    usage: {
      'break-after': 'Forces or forbids a break after the element when the content is fragmented across pages or columns.',
      'break-before': 'Forces or forbids a break before the element, which is how a chapter always starts on a new printed page.',
      'break-inside': 'Tries to keep the element whole rather than let the browser split it across a page or column boundary.',
    },
    related: ['page-break-after', 'page-break-before', 'page-break-inside', 'columns', 'orphans'],
    era: 'breakProperties',
  }),

  /* ---------------------- tables, columns, counters ----------------------- */
  page(
    'caption-side',
    'Moves the caption element to the top of the table instead of the default bottom position.',
    `.figures caption {
  caption-side: top;
  text-align: left;
  padding-bottom: 0.5rem;
}`,
    ['border-collapse', 'table-layout', 'empty-cells'],
    'core',
  ),
  page(
    'caret-color',
    'Recolours the blinking insertion caret in editable fields and textareas, which is the one part of the native control you can style.',
    `textarea {
  caret-color: var(--brand);
  color-scheme: dark;
}`,
    ['color', 'user-select', 'resize'],
    'core',
  ),
  atRule(
    '@charset',
    'Declares the character encoding of an external stylesheet. It is only valid in a standalone .css file, and only as the very first thing in it.',
    `@charset "utf-8";

.card {
  content: "cafÃ©";
}`,
    ['@import', '@font-face', '@media'],
    'core',
  ),
  page(
    'clear',
    'Pushes an element below the floats that would otherwise sit beside it. It is the fix for a footer that ends up alongside a floated image.',
    `footer {
  clear: both;
}`,
    ['float', 'overflow', 'display', 'position'],
    'core',
  ),
  page(
    'clip',
    'Clips a positioned element to a rectangle. It only ever applied to absolutely positioned elements, and clip-path or overflow does the same job without the restriction.',
    `.badge {
  position: absolute;
  clip: rect(0, 4rem, 2rem, 0);
}`,
    ['clip-path', 'overflow', 'position', 'object-fit'],
    'core',
  ),
  page(
    'clip-path',
    'Cuts an element down to a shape: a circle, an ellipse, a polygon, or an inset rectangle. It clips without adding a scroll container, and unlike overflow it accepts real geometry.',
    `.avatar {
  clip-path: circle(50% at 50% 50%);
}

.badge {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%);
}`,
    ['clip', 'overflow', 'object-fit', 'mask-image'],
    'clipPath',
  ),
  page(
    'color',
    'The foreground colour of text and of anything that fills with currentColor, such as a border or a caret. It is the most commonly inherited property, so set it once on a high element.',
    `body {
  color: #e7ebf0;
  background: #0b0d10;
}

.badge {
  color: var(--brand);
  border: 1px solid currentColor;
}`,
    ['background-color', 'caret-color', 'fill', 'border-color', 'text-decoration-color'],
    'core',
  ),
  ...family({
    names: [
      'column-count',
      'column-fill',
      'column-gap',
      'column-rule',
      'column-rule-color',
      'column-rule-style',
      'column-rule-width',
      'column-span',
      'column-width',
      'columns',
    ],
    lead: '.article-body',
    declaration: (name) => `  ${name}: ${COLUMN_VALUES[name]!};`,
    usage: {
      'column-count': 'The number of columns the text is split into. Setting it on a wide element is the classic newspaper layout.',
      'column-fill': 'Whether the columns are filled in sequence so the first fills completely, or balanced so they end up the same height. balance is the default and usually what you want.',
      'column-gap': 'The space between the columns, which needs a column-rule to become visible as a line.',
      'column-rule': 'Shorthand for the line drawn between columns: width, style and colour.',
      'column-rule-color': 'Recolours the line between columns without restating its width and style.',
      'column-rule-style': 'The line style between columns.',
      'column-rule-width': 'The thickness of the line between columns. A width with no style still draws nothing.',
      'column-span': 'Lets a heading break out of the column flow and stretch across all of them.',
      'column-width': 'The ideal width of a column. The browser uses it as a hint and may make columns narrower or wider, so pair it with column-count as a cap.',
      columns: 'Shorthand for column-width and column-count together, so both act as a suggestion rather than a hard limit.',
    },
    related: ['column-count', 'column-gap', 'column-rule', 'column-span', 'break-inside'],
    era: 'multiColumn',
  }),
  page(
    'content',
    'Replaces the content of a pseudo-element, or sets an alt text for replaced elements. It is how CSS-only icons and generated labels are made.',
    `.badge::after {
  content: "new";
}

.avatar {
  content: url(/avatar.png) / "Ada Lovelace";
}

.quote::before {
  content: open-quote;
}`,
    ['counter-reset', 'counter-increment', 'quotes', 'list-style-image'],
    'core',
  ),
  ...family({
    names: ['counter-increment', 'counter-reset'],
    lead: '.outline',
    declaration: (name) => `  ${name}: ${COUNTER_VALUES[name]!};`,
    usage: {
      'counter-increment': 'Steps a counter up by an amount at that point in the tree, which is how an automatic step number is attached to each heading.',
      'counter-reset': 'Creates a counter, or resets an existing one back to a starting value. A counter is only visible once something in the same scope has been reset and something later has been incremented.',
    },
    related: ['content', 'list-style-type', 'counter-reset'],
    era: 'core',
  }),
  page(
    'cursor',
    'Changes the pointer shown over the element. It changes the pointer only: the hit target, the tab order and the semantics are all unchanged.',
    `.grab {
  cursor: grab;
}

[disabled] {
  cursor: not-allowed;
}`,
    ['pointer-events', 'user-select', 'caret-color'],
    'core',
  ),

  /* --------------------- display, flex, typography ----------------------- */
  page(
    'direction',
    'Sets the base direction of the text, which decides which side a line starts from and how inline content is aligned. It is inherited, so it is normally set once on html.',
    `html[dir='rtl'] {
  direction: rtl;
}`,
    ['unicode-bidi', 'writing-mode', 'text-align', 'float'],
    'core',
  ),
  page(
    'display',
    'The single most used property in CSS. It decides the box type, and display: flex or grid turns the element into a container for its direct children only.',
    `.card {
  display: grid;
}

.tag {
  display: inline-block;
}

.visually-hidden {
  display: none;
}`,
    ['position', 'flex', 'grid', 'visibility', 'overflow', 'float'],
    'core',
  ),
  page(
    'empty-cells',
    'Whether the borders of table cells with no content are still drawn. It only matters while border-collapse is separate.',
    `.prices {
  border-collapse: separate;
  border-spacing: 0;
  empty-cells: hide;
}`,
    ['border-collapse', 'table-layout', 'caption-side'],
    'tableLayout',
  ),
  page(
    'filter',
    'Applies graphical effects to an element and everything inside it as a single flattened group. The functions are blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, opacity, saturate and sepia.',
    `.hero img {
  filter: saturate(0.4) brightness(1.1);
}

.card:hover img {
  filter: none;
  transition: filter 200ms ease;
}`,
    ['backdrop-filter', 'mix-blend-mode', 'box-shadow', 'transform', 'opacity'],
    'filter',
  ),
  ...family({
    names: ['flex', 'flex-basis', 'flex-direction', 'flex-flow', 'flex-grow', 'flex-shrink', 'flex-wrap'],
    lead: '.row',
    declaration: (name) => `  ${name}: ${FLEX_VALUES[name]!};`,
    usage: {
      flex: 'Shorthand for grow, shrink and basis in one go. flex: 1 means grow and shrink at 1 with a basis of 0, which is the line that makes a layout share space evenly.',
      'flex-basis': 'The size a flex item starts at, before any free space is distributed. It replaces width on a flex item because width would compete with the flex algorithm.',
      'flex-direction': 'The axis the children are laid out along. It is set on the container and decides what main-axis means everywhere else in that flex context.',
      'flex-flow': 'Shorthand for flex-direction and flex-wrap, the two properties that decide the shape of the whole container.',
      'flex-grow': 'How this item shares leftover space, as a proportion of the other growing items. A value of 0, the default, means the item never grows.',
      'flex-shrink': 'How much this item gives up when the container is too small, again as a proportion. flex-shrink: 0 on a fixed sidebar stops it collapsing.',
      'flex-wrap': 'Whether items stay on one line or move onto new ones. nowrap is the default, which is why a long row overflows rather than stacking.',
    },
    related: ['display', 'justify-content', 'align-items', 'gap', 'order', 'flex-basis'],
    era: 'flexbox',
  }),
  page(
    'float',
    'Shifts an element left or right and lets text wrap around it. It was the only layout tool for years and is now almost always the wrong choice outside of magazine-style text wrap inside an article.',
    `.article-body img {
  float: left;
  margin: 0 1rem 0.5rem 0;
}`,
    ['clear', 'shape-outside', 'display', 'position', 'vertical-align'],
    'core',
  ),
  page(
    'font',
    'Shorthand for font-style, font-variant, font-weight, font-size, line-height and font-family. Size and family are required; the rest reset, and the size has to come before the family in the value.',
    `body {
  font: 400 1rem/1.6 system-ui, sans-serif;
}

h1 {
  font: 700 1.5rem/1.25 inherit;
}`,
    ['font-family', 'font-size', 'font-weight', 'font-style', 'line-height'],
    'core',
  ),
  atRule(
    '@font-face',
    'Describes a font file the page is allowed to download, including where to get it and which weights and styles it covers. Each weight needs its own rule, and font-display decides whether text waits for it.',
    `@font-face {
  font-family: 'Inter var';
  src: url(/fonts/inter.woff2) format('woff2');
  font-weight: 100 900;
  font-display: swap;
}`,
    ['font-family', '@import', 'font-size', 'font-weight'],
    'core',
  ),
  page(
    'font-family',
    'The stack of font names to try in order, ending in a generic family so the browser always has something to fall back on. Quotes are needed around a family name containing spaces.',
    `body {
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
}

code {
  font-family: ui-monospace, 'Cascadia Code', monospace;
}`,
    ['font', '@font-face', 'font-size', 'font-weight', 'font-stretch'],
    'core',
  ),
  ...family({
    names: [
      'font-feature-settings',
      'font-kerning',
      'font-size',
      'font-size-adjust',
      'font-stretch',
      'font-style',
      'font-variant',
      'font-variant-caps',
      'font-weight',
    ],
    lead: 'body',
    declaration: (name) => `  ${name}: ${FONT_VALUES[name]!};`,
    usage: {
      'font-feature-settings': 'Turns individual OpenType features on or off by tag, such as "liga" for ligatures or "tnum" for tabular figures in a price column.',
      'font-kerning': 'Whether the browser adjusts the spacing between letter pairs using the font own data. It is on by default for most fonts.',
      'font-size': 'The size text is rendered at. Every rem and em unit in the page is measured against this, which is why a root font-size scales the whole design.',
      'font-size-adjust': 'Scales a font so its x-height matches other fonts on the same line, which stops a fallback font from reflowing the layout.',
      'font-stretch': 'Selects a width from a variable or width family, from ultra-condensed to ultra-expanded.',
      'font-style': 'Italic or oblique. A font with no italic file is usually synthesised by slanting it, which looks worse than leaning slightly.',
      'font-variant': 'Shorthand for turning on small-caps and other typographic variants across a whole family.',
      'font-variant-caps': 'Capitalisation variants such as small-caps, all-small-caps and the petite and unicase alternatives.',
      'font-weight': 'How heavy the text is drawn, in multiples of 100 for a variable font. 400 is normal and 700 is bold, and every value in between is a real weight in most families.',
    },
    related: ['font', 'font-family', 'line-height', 'letter-spacing', 'text-transform'],
    era: 'core',
  }),
]
