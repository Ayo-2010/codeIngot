import type { CssPropertyPage } from '~/types/content'
import { family, page } from './css-property-page-builders'

/** Per-page declaration values, declared above the page array that reads them. */
const TEXT_DECORATION_VALUES: Record<string, string> = {
  'text-decoration': 'underline wavy var(--warn)',
  'text-decoration-color': 'var(--warn)',
  'text-decoration-line': 'underline line-through',
  'text-decoration-style': 'wavy',
}

const TRANSFORM_VALUES: Record<string, string> = {
  transform: 'translateX(0.5rem) rotate(2deg) scale(1.02)',
  'transform-origin': 'bottom left',
  'transform-style': 'preserve-3d',
}

const TRANSITION_VALUES: Record<string, string> = {
  transition: 'transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1)',
  'transition-delay': '80ms',
  'transition-duration': '200ms',
  'transition-property': 'transform, opacity',
  'transition-timing-function': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
}

/**
 * Detail pages for properties 179-215 of the source index: the sizing tail,
 * table and text alignment, text decoration, transforms, transitions and the
 * last handful of typography and stacking properties.
 */
export const cssPropertyPages3: CssPropertyPage[] = [
  page(
    'resize',
    'Whether the user can drag the corner of a textarea to change its size. It only has an effect on elements with overflow other than visible.',
    `textarea {
  resize: vertical;
  min-height: 6rem;
}`,
    ['overflow', 'width', 'height', 'max-width', 'user-select'],
    'core',
  ),
  page(
    'right',
    'Offsets a positioned element from the right edge of its containing block. In a right-to-left language the inline start edge is the right one, so logical offsets read better.',
    `.drawer {
  position: fixed;
  right: 1rem;
  top: 4rem;
}`,
    ['left', 'top', 'bottom', 'position', 'direction'],
    'core',
  ),
  page(
    'row-gap',
    'The space between the rows of a grid, or between wrapped lines in a column flex container.',
    `.grid {
  display: grid;
  row-gap: 2rem;
  column-gap: 1rem;
}`,
    ['gap', 'column-gap', 'grid-row-gap', 'grid-auto-rows'],
    'grid',
  ),

  page(
    'scroll-behavior',
    'Whether jumping to an anchor is instant or animated, and whether a scroll driven by the user or by a script is smooth.',
    `html {
  scroll-behavior: smooth;
  scroll-padding-top: 4rem;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}`,
    ['overflow', 'scroll-margin-top', '@media', 'transition', 'position'],
    'scrollBehavior',
  ),

  /* ------------------------- table and text flow ------------------------- */
  page(
    'tab-size',
    'How many character widths a tab advances. It matters in preformatted and code text, where a default of 8 stops a small tab stop aligning with a 2-space indent.',
    `pre {
  tab-size: 2;
  white-space: pre;
}`,
    ['white-space', 'word-break', 'font-size', 'letter-spacing'],
    'core',
  ),
  page(
    'table-layout',
    'Whether column widths come from the content or from the first row and any declared widths. auto is content-driven and can be slow on a wide table; fixed is predictable and fast.',
    `.report {
  table-layout: fixed;
  width: 100%;
}

.report td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}`,
    ['border-collapse', 'border-spacing', 'empty-cells', 'overflow', 'width'],
    'tableLayout',
  ),
  page(
    'text-align',
    'How inline content is aligned on each line inside its block. start and end follow the writing direction, so they are the safe values to use with RTL text.',
    `.article-body {
  text-align: start;
  text-wrap: pretty;
}

.price {
  text-align: end;
  font-variant-numeric: tabular-nums;
}`,
    ['text-align-last', 'direction', 'vertical-align', 'text-indent', 'white-space'],
    'core',
  ),
  page(
    'text-align-last',
    'How the last line of a block is aligned, which matters once text is justified and the final line would otherwise be left ragged.',
    `.article-body {
  text-align: justify;
  text-align-last: start;
}`,
    ['text-align', 'text-justify', 'text-indent', 'hyphens'],
    'core',
  ),
  ...family({
    names: ['text-decoration', 'text-decoration-color', 'text-decoration-line', 'text-decoration-style'],
    lead: 'a',
    declaration: (name) => `  ${name}: ${TEXT_DECORATION_VALUES[name]!};`,
    usage: {
      'text-decoration': 'Shorthand for the line, style, colour and thickness of a text decoration. It is not inherited, but the line is propagated to descendant boxes so a link inside a heading stays underlined.',
      'text-decoration-color': 'The colour of the decoration line, so a visited link can change colour without a second rule.',
      'text-decoration-line': 'Which lines are drawn: underline, overline, line-through, or a space-separated list of them.',
      'text-decoration-style': 'The shape of the line, such as solid, double, dotted, dashed or wavy.',
    },
    related: ['text-decoration-line', 'text-underline-offset', 'color', 'text-transform', 'text-shadow'],
    era: 'core',
  }),
  page(
    'text-indent',
    'Indents the first line of a block, and it is inherited, so setting it on a list container indents every item. The text-indent: hanging is a normal-indent and negative text-indent pair, which is the cleaner way to hang a bullet.',
    `.lead::first-letter {
  float: left;
  font-size: 3.2em;
  line-height: 0.85;
  padding-right: 0.08em;
}

.ingredients {
  text-indent: 0;
}

.ingredients > li {
  margin-left: 1.25rem;
  text-indent: -1.25rem;
}`,
    ['text-align', 'letter-spacing', 'word-spacing', 'padding-left'],
    'core',
  ),
  page(
    'text-justify',
    'Distributes spaces so text reaches both edges, intended for scripts that do not use word spaces. It is not implemented in any browser; use text-align: justify instead.',
    `.article-body {
  text-justify: inter-word;
  text-align: justify;
}`,
    ['text-align', 'text-align-last', 'hyphens', 'white-space'],
    'core',
  ),
  page(
    'text-overflow',
    'How a single line of text that does not fit is signalled as truncated. It only does anything when the same element also has overflow: hidden and white-space: nowrap.',
    `.label {
  max-width: 12rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}`,
    ['overflow', 'white-space', 'word-break', 'text-wrap', 'min-width'],
    'textOverflow',
  ),
  page(
    'text-shadow',
    'Draws a shadow behind the text glyphs. It is drawn per glyph and ignores the letter shapes of the font, so for a real drop shadow use filter: drop-shadow on a parent instead.',
    `.heading {
  text-shadow: 0 1px 0 #000;
}

.brand {
  text-shadow: 0 0 1rem rgb(41 226 189 / 0.6);
}`,
    ['box-shadow', 'filter', 'color', 'text-transform'],
    'textShadow',
  ),
  page(
    'text-transform',
    'Changes the case of the text for display only: the underlying value stays as typed, which matters for form submissions and for screen readers reading the DOM text.',
    `.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.code {
  text-transform: none;
}`,
    ['font-variant-caps', 'font-size', 'letter-spacing', 'text-decoration'],
    'core',
  ),
  page(
    'top',
    'Offsets a positioned element from the top of its containing block, and is the offset a sticky header sticks at.',
    `.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.tooltip {
  position: absolute;
  top: 100%;
  margin-top: 0.25rem;
}`,
    ['right', 'bottom', 'left', 'position', 'z-index'],
    'core',
  ),

  /* ----------------------------- transforms ------------------------------ */
  ...family({
    names: ['transform', 'transform-origin', 'transform-style'],
    lead: '.card',
    declaration: (name) => `  ${name}: ${TRANSFORM_VALUES[name]!};`,
    usage: {
      transform: 'Moves, scales, rotates or skews the element. It does not change the space the element occupies, so it can overlap its neighbours, and the visual result is not exposed to the accessibility tree.',
      'transform-origin': 'The point a transform is applied around, which decides the axis of rotation and what stays still during a scale. The default is the centre of the border box.',
      'transform-style': 'Whether a transformed element flattens its children into itself or preserves the 3D context for them, which is what a rotateY on a card face needs.',
    },
    related: ['transform', 'transform-origin', 'perspective', 'backface-visibility', 'filter', 'transition'],
    era: 'transform2d',
  }),

  /* ---------------------------- transitions ------------------------------ */
  ...family({
    names: [
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
    ],
    lead: '.button',
    declaration: (name) => `  ${name}: ${TRANSITION_VALUES[name]!};`,
    usage: {
      transition: 'Shorthand for which properties animate, how long, with what curve and after what delay. It only fires on a change of computed value, so a hover that starts and ends at the same value never transitions.',
      'transition-delay': 'Waits this long before the transition starts, which staggers a list of items.',
      'transition-duration': 'How long the transition takes. A value of 0s, the default, means there is nothing to see.',
      'transition-property': 'Which properties the transition applies to. Listing them explicitly is worth doing, since all will also try to animate custom properties and layout-affecting values.',
      'transition-timing-function': 'The easing curve for the transition. Ease is a reasonable default; a longer curve feels more deliberate than the default ease-in-out.',
    },
    related: ['transition', 'animation', 'transform', 'opacity', 'prefers-reduced-motion'],
    era: 'transition',
  }),

  /* --------------------- interaction and final props ---------------------- */
  page(
    'unicode-bidi',
    'Controls the direction of text inside an element and is only useful alongside direction. isolate is the common value, for a snippet of Arabic inside an English sentence.',
    `.quote {
  unicode-bidi: isolate;
}

.mixed {
  direction: ltr;
  unicode-bidi: embed;
}`,
    ['direction', 'writing-mode', 'text-align', 'white-space'],
    'core',
  ),
  page(
    'user-select',
    'Whether the user can select the element text. none is the usual reason copy on a code block or a button is impossible, and it should be used with care since it also blocks legitimate selection.',
    `.code-block {
  user-select: all;
}

.chrome {
  user-select: none;
}

.no-select {
  user-select: none;
}`,
    ['pointer-events', 'cursor', 'caret-color', 'resize'],
    'userSelect',
  ),

  page(
    'vertical-align',
    'Aligns an inline box, inline-block or table cell against its line box, or an inline-block against its parent. It is not a way to position a block element.',
    `.badge {
  vertical-align: middle;
}

sup {
  vertical-align: super;
  font-size: 0.75em;
}

.price-table td {
  vertical-align: top;
}`,
    ['line-height', 'font-size', 'display', 'float', 'text-align'],
    'core',
  ),
  page(
    'visibility',
    'Whether the element is painted and whether it still takes up space. Unlike display: none it keeps the layout box, and unlike opacity: 0 it does remove the element from the accessibility tree.',
    `.tooltip {
  visibility: hidden;
  opacity: 0;
  transition: opacity 150ms ease, visibility 150ms;
}

.tooltip:is(:hover, :focus-within) {
  visibility: visible;
  opacity: 1;
}`,
    ['display', 'opacity', 'pointer-events', 'clip-path', 'content'],
    'core',
  ),

  page(
    'white-space',
    'How whitespace in the source is collapsed and whether lines wrap. The three values worth remembering are normal, pre, and nowrap.',
    `.code-block {
  white-space: pre;
  overflow-x: auto;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.prose {
  white-space: pre-line;
}`,
    ['text-overflow', 'word-break', 'tab-size', 'overflow', 'line-height'],
    'core',
  ),
  page(
    'width',
    'The width of the content box. A percentage resolves against the containing block, and width: auto lets the element fill it. In a flex or grid container, prefer the track and basis properties.',
    `.page {
  width: 100%;
  max-width: 44rem;
  margin: 0 auto;
}

.thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}`,
    ['max-width', 'min-width', 'height', 'box-sizing', 'aspect-ratio', 'flex-basis'],
    'core',
  ),
  page(
    'word-break',
    'Whether the browser may break inside a word. break-all is the escape hatch for a long URL in a narrow column, but overflow-wrap: anywhere gets there with better line breaking.',
    `.url {
  word-break: break-all;
  overflow-wrap: anywhere;
}

.summary {
  overflow-wrap: break-word;
}`,
    ['overflow-wrap', 'hyphens', 'white-space', 'letter-spacing', 'min-width'],
    'core',
  ),
  page(
    'word-spacing',
    'Adds extra space between words on top of the normal word space, which is the way to loosen a block of text without touching line-height.',
    `.intro {
  word-spacing: 0.05em;
}`,
    ['letter-spacing', 'text-align', 'text-indent', 'font-size'],
    'core',
  ),
  page(
    'word-wrap',
    'The old name for overflow-wrap, kept so older stylesheets keep working. Write overflow-wrap in new CSS, since word-wrap is what people reach for by mistake and its name is misleading.',
    `.cell {
  overflow-wrap: anywhere;
}

.card__title {
  word-wrap: break-word;
}`,
    ['overflow-wrap', 'word-break', 'hyphens', 'min-width', 'white-space'],
    'core',
  ),
  page(
    'writing-mode',
    'The inline axis of the text, which is what makes a whole page read top to bottom as well as left to right. It is different from direction, which only mirrors the text.',
    `.vertical-jp {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  block-size: 12rem;
}`,
    ['direction', 'unicode-bidi', 'text-orientation', 'height', 'display'],
    'writingMode',
  ),

  page(
    'z-index',
    'The paint order of overlapping elements. It only applies to positioned elements, flex items and grid items, and it only competes within the same stacking context, so a huge value inside a low-z-index parent does nothing.',
    `.header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.dropdown {
  position: absolute;
  z-index: 20;
}

.modal {
  position: fixed;
  inset: 0;
  z-index: 100;
}`,
    ['position', 'isolation', 'opacity', 'filter', 'transform', 'mix-blend-mode'],
    'core',
  ),
]
