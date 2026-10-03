import type { CssProperty, CssPropertyCategory } from '~/types/content'

/**
 * Every property and at-rule from the source index, in the order it appears
 * there. The sidebar, the default-values page and the animatable page all read
 * this list, so a property only ever has to be described once.
 */
function p(
  name: string,
  description: string,
  category: CssPropertyCategory,
  initial: string,
  inherits = false,
  deprecated?: string,
): CssProperty {
  return { name, description, category, initial, inherits, deprecated }
}

export const cssProperties: CssProperty[] = [
  p('align-content', 'Distributes flex lines, or grid tracks, along the cross axis of the container.', 'Flexbox and grid', 'normal'),
  p('align-items', 'Sets the default cross-axis alignment for every flex or grid item in the container.', 'Flexbox and grid', 'normal'),
  p('align-self', 'Overrides align-items for a single flex or grid item.', 'Flexbox and grid', 'auto'),
  p('all', 'Resets every property on an element at once, optionally back to the values of a parent or the browser default. It is an escape hatch for a third-party component you cannot restyle any other way, not a reset strategy.', 'Shorthands and resets', 'see note'),

  p('animation', 'Shorthand that starts a keyframe animation and sets its duration, timing, delay, direction, fill and play state together.', 'Transitions and animation', 'none'),
  p('animation-delay', 'Waits this long before the first animation frame starts.', 'Transitions and animation', '0s'),
  p('animation-direction', 'Plays the animation forwards, backwards, or alternating on each repeat.', 'Transitions and animation', 'normal'),
  p('animation-duration', 'How long one cycle of the animation takes.', 'Transitions and animation', '0s'),
  p('animation-fill-mode', 'Applies the first or last keyframe outside the active period of the animation.', 'Transitions and animation', 'none'),
  p('animation-iteration-count', 'How many times the animation repeats; infinite never stops.', 'Transitions and animation', '1'),
  p('animation-name', 'Names the @keyframes rule that describes the frames.', 'Transitions and animation', 'none'),
  p('animation-play-state', 'Pauses or resumes a running animation.', 'Transitions and animation', 'running'),
  p('animation-timing-function', 'The easing curve that shapes progress between one keyframe and the next.', 'Transitions and animation', 'ease'),

  p('backface-visibility', 'Whether the back of an element is visible when it is rotated past 90 degrees.', 'Transforms and filters', 'visible'),
  p('background', 'Shorthand that sets every background layer property in one declaration.', 'Background and borders', 'see note'),
  p('background-attachment', 'Whether the background scrolls with the page or is fixed to the viewport.', 'Background and borders', 'scroll'),
  p('background-blend-mode', 'How a background layer blends with the colour and image layers below it.', 'Background and borders', 'normal'),
  p('background-clip', 'Which box the background is painted inside.', 'Background and borders', 'border-box'),
  p('background-color', 'The background colour of an element.', 'Background and borders', 'transparent'),
  p('background-image', 'One or more background images, each as its own layer.', 'Background and borders', 'none'),
  p('background-origin', 'Which box a background image is positioned from.', 'Background and borders', 'padding-box'),
  p('background-position', 'Where the background image sits inside its positioning area.', 'Background and borders', '0% 0%'),
  p('background-repeat', 'Whether and how the background image tiles.', 'Background and borders', 'repeat'),
  p('background-size', 'The rendered size of the background image.', 'Background and borders', 'auto'),
  p('border', 'Shorthand for the four border sides: width, style and colour.', 'Background and borders', 'medium none currentColor'),
  p('border-bottom', 'Shorthand for the bottom border width, style and colour.', 'Background and borders', 'medium none currentColor'),
  p('border-bottom-color', 'The colour of the bottom border.', 'Background and borders', 'currentColor'),
  p('border-bottom-left-radius', 'Rounds the bottom left corner of the border.', 'Background and borders', '0'),
  p('border-bottom-right-radius', 'Rounds the bottom right corner of the border.', 'Background and borders', '0'),
  p('border-bottom-style', 'The line style of the bottom border, such as solid, dashed or none.', 'Background and borders', 'none'),
  p('border-bottom-width', 'The thickness of the bottom border.', 'Background and borders', 'medium'),
  p('border-collapse', 'Whether table borders are drawn as separate cells or merged into shared lines.', 'Tables and columns', 'separate'),
  p('border-color', 'Shorthand that sets the colour of all four border sides.', 'Background and borders', 'currentColor'),
  p('border-image', 'Uses an image instead of plain lines to draw the border.', 'Background and borders', 'none'),
  p('border-image-outset', 'How far the border image extends beyond the border box.', 'Background and borders', '0'),
  p('border-image-repeat', 'How the border image is tiled or repeated around the edges and corners.', 'Background and borders', 'stretch'),
  p('border-image-slice', 'How far into the source image each edge, corner and middle region is cut.', 'Background and borders', '0%'),
  p('border-image-source', 'The image used for the border.', 'Background and borders', 'none'),
  p('border-image-width', 'How thick each border image region is drawn, relative to the border width.', 'Background and borders', '1'),
  p('border-left', 'Shorthand for the left border width, style and colour.', 'Background and borders', 'medium none currentColor'),
  p('border-left-color', 'The colour of the left border.', 'Background and borders', 'currentColor'),
  p('border-left-style', 'The line style of the left border.', 'Background and borders', 'none'),
  p('border-left-width', 'The thickness of the left border.', 'Background and borders', 'medium'),
  p('border-radius', 'Rounds the four corners of the border box.', 'Background and borders', '0'),
  p('border-right', 'Shorthand for the right border width, style and colour.', 'Background and borders', 'medium none currentColor'),
  p('border-right-color', 'The colour of the right border.', 'Background and borders', 'currentColor'),
  p('border-right-style', 'The line style of the right border.', 'Background and borders', 'none'),
  p('border-right-width', 'The thickness of the right border.', 'Background and borders', 'medium'),
  p('border-spacing', 'The gap between the cells of a table, when border-collapse is separate.', 'Tables and columns', '0', true),
  p('border-style', 'Shorthand that sets the line style of all four border sides.', 'Background and borders', 'none'),
  p('border-top', 'Shorthand for the top border width, style and colour.', 'Background and borders', 'medium none currentColor'),
  p('border-top-color', 'The colour of the top border.', 'Background and borders', 'currentColor'),
  p('border-top-left-radius', 'Rounds the top left corner of the border.', 'Background and borders', '0'),
  p('border-top-right-radius', 'Rounds the top right corner of the border.', 'Background and borders', '0'),
  p('border-top-style', 'The line style of the top border.', 'Background and borders', 'none'),
  p('border-top-width', 'The thickness of the top border.', 'Background and borders', 'medium'),
  p('border-width', 'Shorthand that sets the thickness of all four border sides.', 'Background and borders', 'medium'),
  p('bottom', 'Offsets a positioned element from the bottom edge of its containing block.', 'Positioning', 'auto'),
  p('box-decoration-break', 'Whether a background and border are drawn once for the whole fragmented box or repeated on every line.', 'Background and borders', 'slice'),
  p('box-shadow', 'Draws one or more shadows outside, inside or around an element, without affecting layout.', 'Background and borders', 'none'),
  p('box-sizing', 'Decides whether padding and border are counted inside the declared width and height or added outside it.', 'Box model', 'content-box'),
  p('break-after', 'Controls whether a page or column break is forced after the element.', 'Layout and overflow', 'auto'),
  p('break-before', 'Controls whether a page or column break is forced before the element.', 'Layout and overflow', 'auto'),
  p('break-inside', 'Controls whether the browser may split the element across a page or column break.', 'Layout and overflow', 'auto'),

  p('caption-side', 'Which side of the table the caption element is placed on.', 'Tables and columns', 'bottom', true),
  p('caret-color', 'The colour of the text insertion caret in editable fields.', 'Caret and user interaction', 'auto', true),
  p('@charset', 'Declares the character encoding of an external stylesheet. It has to be the very first rule in the file.', 'At-rules', 'n/a', false, '@charset is only meaningful in an external .css file, and only at the top. Serve the file with a correct Content-Type instead where you can.'),
  p('clear', 'Pushes an element below any floated elements that would otherwise overlap it.', 'Positioning', 'none'),
  p('clip', 'Clips a positioned element to a rectangle. Only ever applied to absolute elements.', 'Positioning', 'auto', false, 'Use clip-path, or overflow with a hidden box, instead.'),
  p('clip-path', 'Clips an element to a shape such as a circle, polygon or inset rectangle.', 'Transforms and filters', 'none'),
  p('color', 'Sets the foreground text colour, and is inherited by descendants unless they override it.', 'Color and effects', 'canvastext', true),
  p('column-count', 'How many columns the text is split into.', 'Tables and columns', 'auto'),
  p('column-fill', 'Whether columns are filled in sequence or balanced to the same height.', 'Tables and columns', 'balance'),
  p('column-gap', 'The space between columns.', 'Tables and columns', 'normal'),
  p('column-rule', 'Shorthand for the vertical line drawn between columns: width, style and colour.', 'Tables and columns', 'medium none currentColor'),
  p('column-rule-color', 'The colour of the line between columns.', 'Tables and columns', 'currentColor'),
  p('column-rule-style', 'The line style between columns.', 'Tables and columns', 'none'),
  p('column-rule-width', 'The thickness of the line between columns.', 'Tables and columns', 'medium'),
  p('column-span', 'Lets a heading break out of the column flow and span every column.', 'Tables and columns', 'none'),
  p('column-width', 'The ideal width of each column, which the browser may adjust.', 'Tables and columns', 'auto'),
  p('columns', 'Shorthand that sets column-count and column-width together.', 'Tables and columns', 'auto'),
  p('content', 'Replaces the content of pseudo-elements such as ::before and ::after.', 'Lists and generated content', 'normal'),
  p('counter-increment', 'Steps a CSS counter up or down by a given amount.', 'Lists and generated content', 'none'),
  p('counter-reset', 'Creates a counter, or resets one back to a starting value.', 'Lists and generated content', 'none'),
  p('cursor', 'The pointer shape shown over the element.', 'Caret and user interaction', 'auto', true),

  p('direction', 'Sets the base text direction, which decides the start and end edges of a line box.', 'Typography', 'ltr', true),
  p('display', 'Decides whether an element is a block, an inline box, a flex or grid container, or not rendered at all.', 'Layout and overflow', 'inline'),
  p('empty-cells', 'Whether the borders of empty table cells are shown.', 'Tables and columns', 'show', true),
  p('filter', 'Applies graphical effects such as blur, brightness, contrast and drop-shadow to an element and its descendants.', 'Transforms and filters', 'none'),
  p('flex', 'Shorthand for flex-grow, flex-shrink and flex-basis.', 'Flexbox and grid', '0 1 auto'),
  p('flex-basis', 'The starting size of a flex item before the free space is distributed.', 'Flexbox and grid', 'auto'),
  p('flex-direction', 'Sets the main axis of a flex container, so children flow in a row or a column.', 'Flexbox and grid', 'row'),
  p('flex-flow', 'Shorthand for flex-direction and flex-wrap.', 'Flexbox and grid', 'row nowrap'),
  p('flex-grow', 'How much of the leftover space a flex item claims.', 'Flexbox and grid', '0'),
  p('flex-shrink', 'How much a flex item gives up when the container is too small.', 'Flexbox and grid', '1'),
  p('flex-wrap', 'Whether flex items stay on one line or wrap onto new lines.', 'Flexbox and grid', 'nowrap'),
  p('float', 'Takes an element out of normal flow and shifts it left or right, with text wrapping around it. It was the only layout tool for years and is now almost always the wrong choice outside of magazine-style text wrap inside an article.', 'Positioning', 'none'),
  p('font', 'Shorthand for the typography properties: style, variant, weight, size, line-height and family.', 'Typography', 'see note'),
  p('@font-face', 'Describes a downloadable font file, including where to fetch it and which weights and styles it covers.', 'At-rules', 'n/a'),
  p('font-family', 'The font stack used for text, falling back left to right when a font is unavailable.', 'Typography', 'see note', true),
  p('font-feature-settings', 'Turns individual OpenType features such as ligatures or oldstyle figures on or off.', 'Typography', 'normal', true),
  p('font-kerning', 'Whether the browser adjusts the spacing between letter pairs.', 'Typography', 'auto', true),
  p('font-size', 'The size of the text, which every rem and em unit is measured against.', 'Typography', 'medium', true),
  p('font-size-adjust', 'Scales a font so that its x-height matches other fonts on the same line.', 'Typography', 'none', true, 'The original font-size-adjust is not implemented in browsers. Use the newer font-size-adjust property shape.'),
  p('font-stretch', 'Selects a narrow, normal or expanded width from a variable or width family.', 'Typography', 'normal', true),
  p('font-style', 'Italic or oblique text.', 'Typography', 'normal', true),
  p('font-variant', 'Shorthand for turning small-caps and other typographic variants on.', 'Typography', 'normal', true),
  p('font-variant-caps', 'Capitalisation variants such as small-caps and all-small-caps.', 'Typography', 'normal', true),
  p('font-weight', 'How heavy the text is drawn, in multiples of 100 in a variable font.', 'Typography', '400', true),

  p('gap', 'The space between grid or flex items, set on the container instead of as margins on the items.', 'Flexbox and grid', 'normal'),
  p('grid', 'Shorthand that sets the row and column track sizes, the gap and named areas in one declaration.', 'Flexbox and grid', 'none'),
  p('grid-area', 'Places an item in a named area, or sets its row and column spans explicitly.', 'Flexbox and grid', 'auto'),
  p('grid-auto-columns', 'The track size used for columns the template did not define.', 'Flexbox and grid', 'auto'),
  p('grid-auto-flow', 'How items with no explicit placement are poured into the grid.', 'Flexbox and grid', 'row'),
  p('grid-auto-rows', 'The track size used for rows the template did not define.', 'Flexbox and grid', 'auto'),
  p('grid-column', 'Places an item across columns, either by number or by named line.', 'Flexbox and grid', 'auto'),
  p('grid-column-end', 'The column line an item ends in.', 'Flexbox and grid', 'auto'),
  p('grid-column-gap', 'The space between grid columns.', 'Flexbox and grid', 'normal'),
  p('grid-column-start', 'The column line an item starts in.', 'Flexbox and grid', 'auto'),
  p('grid-gap', 'Shorthand for grid-row-gap and grid-column-gap.', 'Flexbox and grid', 'normal'),
  p('grid-row', 'Places an item across rows, either by number or by named line.', 'Flexbox and grid', 'auto'),
  p('grid-row-end', 'The row line an item ends in.', 'Flexbox and grid', 'auto'),
  p('grid-row-gap', 'The space between grid rows.', 'Flexbox and grid', 'normal'),
  p('grid-row-start', 'The row line an item starts in.', 'Flexbox and grid', 'auto'),
  p('grid-template', 'Shorthand for the row and column track lists.', 'Flexbox and grid', 'none'),
  p('grid-template-areas', 'Named blocks of cells, so areas can be drawn as a visible diagram.', 'Flexbox and grid', 'none'),
  p('grid-template-columns', 'The column track sizes of the grid.', 'Flexbox and grid', 'none'),
  p('grid-template-rows', 'The row track sizes of the grid.', 'Flexbox and grid', 'none'),

  p('hanging-punctuation', 'Lets punctuation hang outside the content box so quotes do not open a gap.', 'Typography', 'none', true),
  p('height', 'The height of the element content box.', 'Box model', 'auto'),
  p('hyphens', 'Whether the browser may break words with hyphens to avoid a gap at the end of a line.', 'Typography', 'manual', true),
  p('@import', 'Pulls in another stylesheet, or a font, from a URL at the top of a stylesheet.', 'At-rules', 'n/a'),
  p('isolation', 'Creates a stacking context so mix-blend-mode only blends with the group inside it.', 'Color and effects', 'auto'),
  p('justify-content', 'Distributes flex items or grid tracks along the main axis.', 'Flexbox and grid', 'normal'),
  p('@keyframes', 'Defines the keyframe stops that an animation-name plays through.', 'At-rules', 'n/a'),
  p('left', 'Offsets a positioned element from the left edge of its containing block.', 'Positioning', 'auto'),
  p('letter-spacing', 'Adds space between characters, which needs a trailing space to look even at the end of a line.', 'Typography', 'normal', true),

  p('line-height', 'The height of each line box, which sets leading.', 'Typography', 'normal', true),
  p('list-style', 'Shorthand for list-style-type, list-style-position and list-style-image.', 'Lists and generated content', 'none', true),
  p('list-style-image', 'Uses an image as the list marker instead of a bullet or number.', 'Lists and generated content', 'none', true),
  p('list-style-position', 'Whether the marker sits outside the content box or inside it.', 'Lists and generated content', 'outside', true),
  p('list-style-type', 'The shape of the list marker, such as disc, circle, square, decimal or none.', 'Lists and generated content', 'disc', true),

  p('margin', 'Space outside the element border.', 'Box model', '0'),
  p('margin-bottom', 'Space below the element.', 'Box model', '0'),
  p('margin-left', 'Space to the left of the element.', 'Box model', '0'),
  p('margin-right', 'Space to the right of the element.', 'Box model', '0'),
  p('margin-top', 'Space above the element.', 'Box model', '0'),
  p('max-height', 'The largest height the element will be allowed to take.', 'Box model', 'none'),
  p('max-width', 'The largest width the element will be allowed to take.', 'Box model', 'none'),
  p('@media', 'Applies a block of rules only when a media query matches, which is how breakpoints are written.', 'At-rules', 'n/a'),
  p('min-height', 'The smallest height the element will be allowed to take. Its initial value of auto behaves as 0 in a flex or grid container but as the content height in a block, so min-height: 100vh is the usual full-height trick.', 'Box model', 'auto'),
  p('min-width', 'The smallest width the element will be allowed to take. Inside a flex container the initial value of auto stops an item shrinking below its content, so min-width: 0 is what lets a long URL wrap.', 'Box model', 'auto'),
  p('mix-blend-mode', 'Blends an element with the backdrop, so it must sit inside an isolated group to behave.', 'Color and effects', 'normal'),

  p('object-fit', 'How replaced content such as an image is fitted when its aspect ratio differs from its box.', 'Layout and overflow', 'fill'),
  p('object-position', 'Where the replaced content is aligned inside its box.', 'Layout and overflow', '50% 50%'),
  p('opacity', 'How opaque the element is, applied to the whole element and its children as one group. It has no effect on layout, and an element at opacity 0 is still focusable, unlike one at display: none.', 'Color and effects', '1'),
  p('order', 'Changes the visual order of flex and grid items without touching the DOM. It is a last resort: reordering only on screen leaves the reading order and the tab order disagreeing.', 'Flexbox and grid', '0'),
  p('outline', 'Shorthand for the focus ring: width, style and colour.', 'Background and borders', 'medium none currentColor'),
  p('outline-color', 'The colour of the outline.', 'Background and borders', 'currentColor'),
  p('outline-offset', 'The gap between the outline and the element border.', 'Background and borders', '0'),
  p('outline-style', 'The line style of the outline, such as solid, dashed or dotted.', 'Background and borders', 'none'),
  p('outline-width', 'The thickness of the outline.', 'Background and borders', 'medium'),

  p('overflow', 'Shorthand for overflow-x and overflow-y, controlling what happens to content that does not fit.', 'Layout and overflow', 'visible'),
  p('overflow-x', 'What happens to content that overflows the box horizontally.', 'Layout and overflow', 'visible'),
  p('overflow-y', 'What happens to content that overflows the box vertically.', 'Layout and overflow', 'visible'),
  p('padding', 'Space inside the element, between its content and its border.', 'Box model', '0'),
  p('padding-bottom', 'Space below the content, inside the border.', 'Box model', '0'),
  p('padding-left', 'Space to the left of the content, inside the border.', 'Box model', '0'),
  p('padding-right', 'Space to the right of the content, inside the border.', 'Box model', '0'),
  p('padding-top', 'Space above the content, inside the border.', 'Box model', '0'),
  p('page-break-after', 'Forces a page break after the element when printing.', 'Layout and overflow', 'auto', false, 'Use break-after, which also covers columns and flex and grid fragmentation.'),
  p('page-break-before', 'Forces a page break before the element when printing.', 'Layout and overflow', 'auto', false, 'Use break-before, which also covers columns and flex and grid fragmentation.'),
  p('page-break-inside', 'Tries to stop the element being split across a page break.', 'Layout and overflow', 'auto', false, 'Use break-inside, which also covers columns and flex and grid fragmentation.'),
  p('perspective', 'Sets how far the viewer is from the z=0 plane, which is what makes a 3D transform look real.', 'Transforms and filters', 'none'),
  p('perspective-origin', 'The point the perspective is measured from.', 'Transforms and filters', '50% 50%'),
  p('pointer-events', 'Whether the element is a hit target for the mouse, even if it is still visible.', 'Caret and user interaction', 'auto', true),
  p('position', 'Places the element using the normal flow, or offsets it from a reference box.', 'Positioning', 'static'),
  p('quotes', 'The opening and closing quotation marks used by the generated quotes in q and pseudo-elements.', 'Lists and generated content', 'auto', true),

  p('resize', 'Whether a textarea can be dragged to a different size by the user.', 'Caret and user interaction', 'none'),
  p('right', 'Offsets a positioned element from the right edge of its containing block.', 'Positioning', 'auto'),
  p('row-gap', 'The space between flex or grid rows.', 'Flexbox and grid', 'normal'),

  p('scroll-behavior', 'Whether scrolling to an anchor is instant or animated.', 'Caret and user interaction', 'auto'),

  p('tab-size', 'How many character widths a tab advances, for code and preformatted text.', 'Typography', '8', true),
  p('table-layout', 'Whether column widths are decided by the content or by the first row and the declared widths.', 'Tables and columns', 'auto'),
  p('text-align', 'How inline content is aligned on each line within its block.', 'Typography', 'start', true),
  p('text-align-last', 'How the last line of a block is aligned, which matters when text is justified.', 'Typography', 'auto', true),
  p('text-decoration', 'Shorthand for the line, style, colour and thickness of text decoration.', 'Color and effects', 'none'),
  p('text-decoration-color', 'The colour of the text decoration line.', 'Color and effects', 'currentColor'),
  p('text-decoration-line', 'Which decoration lines are drawn, such as underline, line-through or overline.', 'Color and effects', 'none'),
  p('text-decoration-style', 'The shape of the decoration line, such as solid, wavy or double.', 'Color and effects', 'solid'),
  p('text-indent', 'Indents the first line of a block.', 'Typography', '0', true),
  p('text-justify', 'Distributes spaces so text reaches both edges, for scripts with no word spaces.', 'Typography', 'auto', true, 'text-justify is not implemented in any browser. Use text-align: justify instead.'),
  p('text-overflow', 'How a single line of text that does not fit is signalled as truncated. It only does anything when the same element also has overflow: hidden and white-space: nowrap.', 'Layout and overflow', 'clip', true),
  p('text-shadow', 'Draws a shadow behind the text glyphs.', 'Color and effects', 'none', true),
  p('text-transform', 'Changes the case of text for display without changing the underlying value.', 'Typography', 'none', true),
  p('top', 'Offsets a positioned element from the top edge of its containing block.', 'Positioning', 'auto'),

  p('transform', 'Moves, scales, rotates or skews an element, independently of layout. It does not change the space the element occupies, so it can overlap its neighbours.', 'Transforms and filters', 'none'),
  p('transform-origin', 'The point a transform is applied around, which decides the axis of rotation and scale.', 'Transforms and filters', '50% 50%'),
  p('transform-style', 'Whether a transformed element flattens its children into itself or preserves 3D for them.', 'Transforms and filters', 'flat'),
  p('transition', 'Shorthand that animates a property from its old value to its new one.', 'Transitions and animation', 'see note'),
  p('transition-delay', 'Waits this long before the transition starts.', 'Transitions and animation', '0s'),
  p('transition-duration', 'How long the transition takes to run.', 'Transitions and animation', '0s'),
  p('transition-property', 'Which properties the transition applies to.', 'Transitions and animation', 'all'),
  p('transition-timing-function', 'The easing curve that shapes the transition.', 'Transitions and animation', 'ease'),

  p('unicode-bidi', 'Controls the direction of text inside an element, and is only useful alongside direction.', 'Typography', 'normal'),
  p('user-select', 'Whether the user can select the text of the element.', 'Caret and user interaction', 'auto'),

  p('vertical-align', 'Aligns an inline box, table cell or inline-block against its line box.', 'Typography', 'baseline'),
  p('visibility', 'Whether the element is painted, and whether it still takes up space. It is not inherited, but a child of a hidden element is still painted unless it sets visibility itself.', 'Layout and overflow', 'visible'),

  p('white-space', 'How whitespace in the source is collapsed, and whether lines wrap.', 'Typography', 'normal', true),
  p('width', 'The width of the element content box.', 'Box model', 'auto'),
  p('word-break', 'Whether the browser may break inside a word, which is what stops long URLs overflowing.', 'Typography', 'normal', true),
  p('word-spacing', 'Adds extra space between words on top of the normal word space.', 'Typography', 'normal', true),
  p('word-wrap', 'An old name for overflow-wrap, kept so old stylesheets still work.', 'Layout and overflow', 'normal', true, 'word-wrap is an alias for overflow-wrap. Write overflow-wrap in new stylesheets.'),
  p('writing-mode', 'The inline axis of the text, which decides whether the language runs left to right or top to bottom.', 'Typography', 'horizontal-tb', true),

  p('z-index', 'The paint order of positioned elements, flex items and grid items when they overlap.', 'Positioning', 'auto'),
]

/**
 * Properties a transition or an animation can interpolate between two values.
 * Everything else is discrete: the browser switches at the halfway point
 * instead, so a transition on it still runs but it looks like a jump.
 */
const ANIMATABLE = new Set([
  'align-content', 'align-items', 'align-self', 'backface-visibility',
  'background-color', 'background-position', 'background-size', 'border-color',
  'border-radius', 'border-spacing', 'border-width', 'box-shadow', 'caret-color',
  'clip-path', 'color', 'column-gap', 'column-rule-color', 'column-rule-width',
  'column-width', 'flex', 'flex-basis', 'flex-grow', 'flex-shrink', 'filter',
  'gap', 'grid-column-gap', 'grid-row-gap', 'height', 'hyphens', 'letter-spacing',
  'line-height', 'margin', 'margin-bottom', 'margin-left', 'margin-right',
  'margin-top', 'max-height', 'max-width', 'min-height', 'min-width', 'opacity',
  'order', 'outline-color', 'outline-offset', 'outline-width', 'padding',
  'padding-bottom', 'padding-left', 'padding-right', 'padding-top', 'perspective',
  'perspective-origin', 'row-gap', 'tab-size', 'text-decoration-color',
  'text-indent', 'text-shadow', 'transform', 'transform-origin', 'transition',
  'vertical-align', 'visibility', 'width', 'word-spacing', 'z-index',
])

export function cssAnimatableProperties() {
  return cssProperties.filter((property) => ANIMATABLE.has(property.name))
}

export function cssNonAnimatableProperties() {
  return cssProperties.filter((property) => !ANIMATABLE.has(property.name) && !property.name.startsWith('@'))
}

export function cssInheritedProperties() {
  return cssProperties.filter((property) => property.inherits)
}

export function isAtRule(property: CssProperty) {
  return property.name.startsWith('@')
}

export function cssProperty(name: string) {
  return cssProperties.find((property) => property.name === name)
}

/** The order the source index groups the properties into, used as section headings. */
export const cssPropertyCategories: CssPropertyCategory[] = [
  'Box model',
  'Background and borders',
  'Typography',
  'Layout and overflow',
  'Positioning',
  'Flexbox and grid',
  'Tables and columns',
  'Lists and generated content',
  'Color and effects',
  'Transforms and filters',
  'Transitions and animation',
  'Caret and user interaction',
  'Shorthands and resets',
  'At-rules',
]
