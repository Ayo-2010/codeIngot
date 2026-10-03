import type { CssPropertyPage } from '~/types/content'
import { atRule, family, page } from './css-property-page-builders'

/** Per-page declaration values, declared above the page array that reads them. */
const GRID_VALUES: Record<string, string> = {
  'grid-auto-columns': 'minmax(8rem, 1fr)',
  'grid-auto-flow': 'row dense',
  'grid-auto-rows': 'min-content',
  'grid-column': '2 / -1',
  'grid-column-end': 'span 2',
  'grid-column-gap': '1rem',
  'grid-column-start': '2',
  'grid-gap': '1rem',
  'grid-row': '1 / 3',
  'grid-row-end': '-1',
  'grid-row-gap': '1.5rem',
  'grid-row-start': '1',
  'grid-template': '"a b" 4rem / 1fr 1fr',
  'grid-template-areas': "'header header' 'sidebar main'",
  'grid-template-columns': 'repeat(auto-fit, minmax(16rem, 1fr))',
  'grid-template-rows': 'auto 1fr auto',
}

const LIST_VALUES: Record<string, string> = {
  'list-style': 'none',
  'list-style-image': 'url(/dot.svg)',
  'list-style-position': 'inside',
  'list-style-type': 'square',
}

const MARGIN_VALUES: Record<string, string> = {
  margin: '1.5rem 0',
  'margin-bottom': '2.5rem',
  'margin-left': 'auto',
  'margin-right': 'auto',
  'margin-top': '3rem',
}

const OUTLINE_VALUES: Record<string, string> = {
  outline: '2px solid var(--brand)',
  'outline-color': 'var(--brand)',
  'outline-offset': '2px',
  'outline-style': 'dashed',
  'outline-width': '2px',
}

const OVERFLOW_VALUES: Record<string, string> = {
  overflow: 'auto',
  'overflow-x': 'auto',
  'overflow-y': 'hidden',
}

const PADDING_VALUES: Record<string, string> = {
  padding: '1.25rem 1.5rem',
  'padding-bottom': '1.5rem',
  'padding-left': '1.5rem',
  'padding-right': '1.5rem',
  'padding-top': '1.5rem',
}

const PAGE_BREAK_VALUES: Record<string, string> = {
  'page-break-after': 'always',
  'page-break-before': 'always',
  'page-break-inside': 'avoid',
}

/**
 * Detail pages for properties 110-178 of the source index: gap, the grid
 * longhands, height and hyphens, line-height and list markers, the margin and
 * padding families, object fitting, overflow, outlines, perspective, position
 * and quotes.
 */
export const cssPropertyPages2: CssPropertyPage[] = [
  /* -------------------------------- grid --------------------------------- */
  page(
    'gap',
    'The space between flex or grid items, set on the container. It replaced margins on children, which removes margin collapsing from the equation entirely.',
    `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem 1rem;
}`,
    ['row-gap', 'column-gap', 'grid-gap', 'justify-content', 'align-items'],
    'grid',
  ),
  page(
    'grid',
    'Shorthand that sets the row and column track lists, the gap and named areas together. It is the same as writing grid-template and grid-gap in one declaration.',
    `.layout {
  display: grid;
  grid: auto-flow / 1fr 2fr;
  gap: 1rem;
}

.dashboard {
  grid:
    'header header' 4rem
    'sidebar main' 1fr
    / 16rem 1fr;
}`,
    ['grid-template', 'grid-template-columns', 'grid-template-rows', 'grid-area', 'gap', 'display'],
    'grid',
  ),
  page(
    'grid-area',
    'Places an item in a named area from grid-template-areas, or sets its row start, column start, row end and column end when no area name matches.',
    `.dashboard {
  grid-template-areas: 'header header' 'sidebar main';
}

.dashboard__sidebar {
  grid-area: sidebar;
}

/* the same thing without naming areas */
.dashboard__main {
  grid-area: 2 / 2;
}`,
    ['grid-row', 'grid-column', 'grid-template-areas', 'grid-template'],
    'grid',
  ),
  ...family({
    names: [
      'grid-auto-columns',
      'grid-auto-flow',
      'grid-auto-rows',
      'grid-column',
      'grid-column-end',
      'grid-column-gap',
      'grid-column-start',
      'grid-gap',
      'grid-row',
      'grid-row-end',
      'grid-row-gap',
      'grid-row-start',
      'grid-template',
      'grid-template-areas',
      'grid-template-columns',
      'grid-template-rows',
    ],
    lead: '.gallery',
    declaration: (name) => `  ${name}: ${GRID_VALUES[name]!};`,
    usage: {
      'grid-auto-columns': 'The track size for columns the template did not define, so implicitly created columns still have a sensible width.',
      'grid-auto-flow': 'How items with no explicit placement are poured into the grid, and whether dense backfills the holes they leave.',
      'grid-auto-rows': 'The track size for rows the template did not define.',
      'grid-column': 'Places an item across columns using line numbers or names, and is shorthand for grid-column-start and grid-column-end.',
      'grid-column-end': 'The column line an item ends in. The -1 value means the last line, whatever the track count turns out to be.',
      'grid-column-gap': 'The space between grid columns.',
      'grid-column-start': 'The column line an item starts in.',
      'grid-gap': 'Shorthand for grid-row-gap and grid-column-gap. gap does the same job and is preferred, since it also works in flex.',
      'grid-row': 'Places an item across rows using line numbers or names, and is shorthand for grid-row-start and grid-row-end.',
      'grid-row-end': 'The row line an item ends in.',
      'grid-row-gap': 'The space between grid rows.',
      'grid-row-start': 'The row line an item starts in.',
      'grid-template': 'Shorthand for the row and column track lists, plus areas.',
      'grid-template-areas': 'Named blocks of cells, so the layout can be read as a diagram in the stylesheet. Every row in the list has to have the same number of names.',
      'grid-template-columns': 'The column track sizes. repeat(auto-fit, minmax(16rem, 1fr)) builds a responsive grid with no media query at all.',
      'grid-template-rows': 'The row track sizes.',
    },
    related: ['grid', 'grid-area', 'grid-template-columns', 'gap', 'display', 'align-content'],
    era: 'grid',
  }),

  /* ------------------------ sizing, breaks, type ------------------------- */
  page(
    'hanging-punctuation',
    'Lets opening quotes hang outside the content box instead of pushing the line in, which is what makes a typographic pull quote sit flush.',
    `.pull-quote {
  hanging-punctuation: first last;
}`,
    ['letter-spacing', 'text-indent', 'word-spacing', 'quotes'],
    'core',
  ),
  page(
    'height',
    'The height of the content box. A percentage only resolves against a parent with a definite height, and an auto height on a flex or grid item lets the content decide.',
    `.viewport {
  height: 100dvh;
}

.card {
  height: auto;
}`,
    ['min-height', 'max-height', 'width', 'box-sizing', 'line-height'],
    'core',
  ),
  page(
    'hyphens',
    'Tells the browser whether it may insert hyphens to avoid a ragged right edge. auto asks the browser to decide based on the language, which is usually the right answer.',
    `.article-body {
  hyphens: auto;
  lang: en;
}`,
    ['word-break', 'overflow-wrap', 'white-space', 'letter-spacing'],
    'hyphens',
  ),
  atRule(
    '@import',
    'Pulls in another stylesheet, or a font file, from a URL. It has to sit at the top of the file, before any rule other than @charset or @layer, and a plain link element in the HTML is faster because it does not block parsing.',
    `@import url('reset.css');
@import url('https://fonts.example/css2?family=Inter');

/* prefer this in the markup instead */
<link rel="stylesheet" href="/reset.css" />`,
    ['@charset', '@font-face', '@media', '@keyframes'],
    'core',
  ),
  page(
    'isolation',
    'Creates a new stacking context so mix-blend-mode on a child only blends against its siblings instead of the whole page. The pair is how a hover overlay is kept from tinting everything behind it.',
    `.card {
  isolation: isolate;
}

.card__badge {
  mix-blend-mode: difference;
  color: white;
}`,
    ['mix-blend-mode', 'z-index', 'filter', 'opacity'],
    'isolation',
  ),
  page(
    'justify-content',
    'Distributes flex items or grid tracks along the main axis. It needs to know the main axis, so it means the row for flex-direction: row and the column for column.',
    `.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}`,
    ['align-items', 'align-content', 'align-self', 'gap', 'grid-auto-flow'],
    'flexbox',
  ),
  atRule(
    '@keyframes',
    'Defines the keyframe stops an animation-name plays through. Percentages are relative to the animation duration, and from and to are shorthand for 0% and 100%.',
    `@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-1rem);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.toast {
  animation: slide-in 300ms ease both;
}`,
    ['animation', 'animation-name', 'animation-duration', '@media'],
    'animation',
  ),
  page(
    'left',
    'Offsets a positioned element from the left edge of its containing block. For a right-to-left language the inline start edge is on the right, so logical offsets are usually the better choice.',
    `.drawer {
  position: fixed;
  left: 0;
  top: 0;
  height: 100dvh;
}`,
    ['right', 'top', 'bottom', 'position', 'direction'],
    'core',
  ),
  page(
    'letter-spacing',
    'Adds space between characters. It needs a trailing space of the same size, or the last character on a line looks out of line with the ones above it.',
    `.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.tracked {
  letter-spacing: 0.08em;
  margin-right: -0.08em;
}`,
    ['word-spacing', 'font-size', 'text-transform', 'font-kerning'],
    'core',
  ),

  /* ------------------------- line height and lists ----------------------- */
  page(
    'line-height',
    'The height of each line box, so it sets the leading between lines. A unitless number is multiplied by the font size, which keeps the ratio when the reader changes their text size.',
    `body {
  line-height: 1.6;
}

.lead {
  font-size: 1.25rem;
  line-height: 1.5;
}`,
    ['font-size', 'font', 'height', 'vertical-align'],
    'core',
  ),
  ...family({
    names: ['list-style', 'list-style-image', 'list-style-position', 'list-style-type'],
    lead: '.menu',
    declaration: (name) => `  ${name}: ${LIST_VALUES[name]!};`,
    usage: {
      'list-style': 'Shorthand for the type, position and image of the list marker. Setting list-style: none removes the marker without removing the list semantics.',
      'list-style-image': 'Uses an image as the marker instead of a glyph. It is the only way to get a custom bullet, and it is worth remembering that assistive technology may just read it as a bullet.',
      'list-style-position': 'Whether the marker hangs outside the content box, or sits inside it, where a custom marker can overlap the text.',
      'list-style-type': 'The shape of the marker: disc, circle, square, decimal, lower-roman, none, and a long tail of further options.',
    },
    related: ['list-style', 'list-style-type', 'display', 'content', 'counter-reset'],
    era: 'core',
  }),

  /* ------------------------------ margins -------------------------------- */
  ...family({
    names: ['margin', 'margin-bottom', 'margin-left', 'margin-right', 'margin-top'],
    lead: '.page',
    declaration: (name) => `  ${name}: ${MARGIN_VALUES[name]!};`,
    usage: {
      margin: 'Space outside the element border, written in top right bottom left order. margin: 0 auto centres a block that already has a max-width.',
      'margin-bottom': 'Space below the element, often used on a heading to open up the paragraph that follows.',
      'margin-left': 'Space to the left of the element.',
      'margin-right': 'Space to the right of the element.',
      'margin-top': 'Space above the element. In normal block flow this collapses with the previous bottom margin, so only the larger of the two survives.',
    },
    related: ['padding', 'gap', 'margin-top', 'max-width'],
    era: 'core',
  }),
  page(
    'max-height',
    'The largest height the element will be allowed to take. Content past it is clipped or scrolls depending on overflow, so pair the two deliberately.',
    `.panel {
  max-height: 60vh;
  overflow-y: auto;
}`,
    ['max-width', 'min-height', 'height', 'overflow'],
    'core',
  ),
  page(
    'max-width',
    'The largest width the element will be allowed to take. A max-width with margin: 0 auto is the usual way to keep a long line of text readable.',
    `.page {
  max-width: 44rem;
  margin: 0 auto;
  padding: 0 1rem;
}`,
    ['max-height', 'min-width', 'width', 'margin', 'box-sizing'],
    'core',
  ),
  atRule(
    '@media',
    'Applies a block of rules only when a media query matches, which is how breakpoints are written. A width query is best written with a range, so a min-width and max-width never have to be kept in step.',
    `@media (min-width: 48rem) {
  .layout {
    grid-template-columns: 16rem 1fr;
  }
}

@media (400px <= width <= 900px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms;
  }
}`,
    ['break-inside', 'page-break-inside', '@import', '@keyframes', '@font-face', 'display'],
    'core',
  ),
  page(
    'min-height',
    'The smallest height the element will be allowed to take. Its initial value is auto, which behaves as 0 in a flex or grid container but as the content height in a block, so min-height: 100vh is the common full-height trick.',
    `html,
body {
  min-height: 100%;
}

.layout {
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}`,
    ['min-width', 'max-height', 'height', 'gap', 'grid-template-rows'],
    'core',
  ),
  page(
    'min-width',
    'The smallest width the element will be allowed to take. Inside a flex container the initial value of auto stops an item shrinking below its content, so min-width: 0 is needed to let a long URL wrap.',
    `.sidebar {
  flex: 0 0 16rem;
}

.card__body {
  min-width: 0;
}`,
    ['min-height', 'max-width', 'width', 'flex-basis', 'word-break'],
    'core',
  ),
  page(
    'mix-blend-mode',
    'Blends an element with what is behind it. It blends with the whole backdrop unless the element sits inside something with isolation: isolate, so pair the two when the effect must stay local.',
    `.toolbar {
  isolation: isolate;
}

.toolbar__icon:hover {
  mix-blend-mode: difference;
  color: white;
}`,
    ['isolation', 'filter', 'opacity', 'background-blend-mode', 'z-index'],
    'blendMode',
  ),

  /* ------------------- replaced content and overflow ---------------------- */
  page(
    'object-fit',
    'How a replaced element such as an image or video is fitted when its own aspect ratio differs from its box. cover is the usual choice for a thumbnail grid.',
    `.thumb img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.logo {
  object-fit: contain;
}`,
    ['object-position', 'aspect-ratio', 'overflow', 'clip-path', 'background-size'],
    'objectFit',
  ),
  page(
    'object-position',
    'Where the replaced content is aligned inside its box, which matters once object-fit has cropped or letterboxed it.',
    `.thumb img {
  object-fit: cover;
  object-position: center 30%;
}`,
    ['object-fit', 'background-position', 'position', 'text-align'],
    'objectFit',
  ),
  page(
    'opacity',
    'How opaque the element is, applied to the element and its children as a single flattened group. It has no effect on layout, and an element at opacity 0 is still focusable.',
    `.card {
  opacity: 0.6;
  transition: opacity 200ms ease;
}

.card:hover,
.card:focus-within {
  opacity: 1;
}`,
    ['filter', 'visibility', 'display', 'mix-blend-mode', 'color'],
    'core',
  ),
  page(
    'order',
    'Changes the visual order of flex and grid items without touching the DOM. It is a last resort: reordering only on screen leaves the reading order and the tab order disagreeing.',
    `.row {
  display: flex;
  gap: 1rem;
}

.row__label {
  order: -1;
}`,
    ['flex-direction', 'grid-auto-flow', 'flex', 'align-self'],
    'flexbox',
  ),
  ...family({
    names: ['outline', 'outline-color', 'outline-offset', 'outline-style', 'outline-width'],
    lead: '.button',
    declaration: (name) => `  ${name}: ${OUTLINE_VALUES[name]!};`,
    usage: {
      outline: 'Shorthand for the focus ring. It is drawn outside the border box and does not take up layout space, so it never shifts the content when it appears.',
      'outline-color': 'The colour of the focus ring.',
      'outline-offset': 'The gap between the outline and the element, which is what makes a ring visible against a busy background.',
      'outline-style': 'The line style of the focus ring.',
      'outline-width': 'The thickness of the focus ring.',
    },
    related: ['border', 'box-shadow', 'outline-offset', 'button', 'focus-visible'],
    era: 'core',
  }),

  /* ------------------------------ overflow -------------------------------- */
  ...family({
    names: ['overflow', 'overflow-x', 'overflow-y'],
    lead: '.code-block',
    declaration: (name) => `  ${name}: ${OVERFLOW_VALUES[name]!};`,
    usage: {
      overflow: 'Shorthand for both axes. hidden clips the content and creates a scroll container; visible is the default and lets content spill out over its neighbours.',
      'overflow-x': 'What happens to content that overflows horizontally. This is where the accidental horizontal scrollbar on a whole page usually comes from.',
      'overflow-y': 'What happens to content that overflows vertically.',
    },
    related: ['overflow-x', 'overflow-y', 'text-overflow', 'clip-path', 'max-height', 'white-space'],
    era: 'core',
  }),

  /* ------------------------------ padding -------------------------------- */
  ...family({
    names: ['padding', 'padding-bottom', 'padding-left', 'padding-right', 'padding-top'],
    lead: '.card',
    declaration: (name) => `  ${name}: ${PADDING_VALUES[name]!};`,
    usage: {
      padding: 'Space inside the element, written in top right bottom left order. It is painted with the background and included in the element size when box-sizing is border-box.',
      'padding-bottom': 'Space below the content, inside the border.',
      'padding-left': 'Space to the left of the content, inside the border. This is where the text starts, so a card is usually padded on the left and right only.',
      'padding-right': 'Space to the right of the content, inside the border.',
      'padding-top': 'Space above the content, inside the border.',
    },
    related: ['margin', 'box-sizing', 'padding-top', 'gap', 'line-height'],
    era: 'core',
  }),
  ...family({
    names: ['page-break-after', 'page-break-before', 'page-break-inside'],
    lead: '.receipt',
    declaration: (name) => `  ${name}: ${PAGE_BREAK_VALUES[name]!};`,
    usage: {
      'page-break-after': 'Forces a page break after the element when printing. It is a legacy alias of break-after and is ignored when printing is not involved.',
      'page-break-before': 'Forces a page break before the element when printing, a legacy alias of break-before.',
      'page-break-inside': 'Tries to keep the element whole across a page break, a legacy alias of break-inside.',
    },
    related: ['break-after', 'break-before', 'break-inside', '@media'],
    era: 'pageBreak',
  }),
  page(
    'perspective',
    'Sets how far the viewer sits from the z = 0 plane, which is what makes a 3D transform look like an object rather than a flat picture. A small value exaggerates the depth.',
    `.stage {
  perspective: 800px;
}

.card {
  transform: rotateY(35deg);
}`,
    ['perspective-origin', 'transform-style', 'transform', 'backface-visibility'],
    'transform3d',
  ),
  page(
    'perspective-origin',
    'The point the perspective is measured from, so it decides where the vanishing point sits. It moves with the element as it transforms.',
    `.stage {
  perspective: 600px;
  perspective-origin: 50% 0;
}`,
    ['perspective', 'transform-origin', 'transform', 'transform-style'],
    'transform3d',
  ),
  page(
    'pointer-events',
    'Whether the element is a hit target for the mouse. Setting it to none makes clicks pass through to whatever is behind, while leaving the element visible and still selectable by keyboard.',
    `.overlay {
  pointer-events: none;
}

.overlay__close {
  pointer-events: auto;
}`,
    ['cursor', 'user-select', 'visibility', 'opacity', 'z-index'],
    'core',
  ),
  page(
    'position',
    'Places the element. static is the normal flow, relative offsets from where it would have been without removing it, absolute and fixed remove it from the flow, and sticky pins it once its container scrolls past.',
    `.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.badge {
  position: relative;
  top: -1px;
}

.modal {
  position: fixed;
  inset: 0;
}`,
    ['top', 'right', 'bottom', 'left', 'z-index', 'float', 'display', 'transform'],
    'core',
  ),
  page(
    'quotes',
    'The quotation marks the open-quote and close-quote keywords use, which is how a locale can get the right marks without touching markup.',
    `:lang(de) {
  quotes: "\\201C" "\\201D" "\\201E" "\\201C";
}

blockquote::before {
  content: open-quote;
}`,
    ['content', 'counter-reset', 'direction', 'list-style-type'],
    'core',
  ),
]
