/**
 * Anchor scrolling inside the pinned app shells.
 *
 * The learn and reference layouts fix their own height and scroll an inner
 * element, leaving the document with nothing of its own to scroll. A native
 * fragment jump — `scrollIntoView`, or the router's own hash handling — scrolls
 * *every* scrollable ancestor, including the document, so the fixed shell slides
 * up and its header leaves the viewport. These helpers scroll the inner
 * container instead, and undo any document scroll a native jump left behind.
 */

/** The nearest vertically scrollable ancestor of `from`, if there is one. */
export function findScrollContainer(from: Element | null | undefined): HTMLElement | null {
  let node = from?.parentElement ?? null
  while (node) {
    if (/(auto|scroll|overlay)/.test(getComputedStyle(node).overflowY)) {
      return node as HTMLElement
    }
    node = node.parentElement
  }
  return null
}

export interface ScrollToBlockOptions {
  /** The element to scroll. Detected from the target when omitted. */
  container?: HTMLElement | null
  /** Animate the scroll. Deep links pass false so a page load does not animate. */
  smooth?: boolean
}

/**
 * Brings the element with this id to the top of the reading container, then
 * resets the document scroll.
 *
 * Returns false when no element carries the id yet, which a deep link has to
 * tolerate: a lesson body is loaded asynchronously, so the target block may
 * arrive after the navigation that asked for it.
 */
export function scrollBlockIntoView(id: string, options: ScrollToBlockOptions = {}): boolean {
  const target = document.getElementById(id)
  if (!target) return false

  const container = options.container ?? findScrollContainer(target)
  const behavior: ScrollBehavior =
    options.smooth === false || prefersReducedMotion() ? 'auto' : 'smooth'

  if (container) {
    // Measured relatively rather than with `offsetTop`, which is only relative
    // to an offset parent and so would be wrong for a nested scroller.
    const offset = target.getBoundingClientRect().top - container.getBoundingClientRect().top
    container.scrollTo({ top: container.scrollTop + offset, behavior })
  } else {
    target.scrollIntoView({ behavior, block: 'start' })
  }

  // `overflow: hidden` stops the reader, not `scrollTo`: a jump that went
  // through the document has to be undone here rather than prevented.
  window.scrollTo({ top: 0, behavior: 'auto' })
  return true
}

/** True when the reader has asked their system to reduce motion. */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
