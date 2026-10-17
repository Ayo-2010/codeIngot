import { afterEach, describe, expect, it, vi } from 'vitest'
import { findScrollContainer, scrollBlockIntoView } from '~/utils/scroll-to-block'

/**
 * The shell the helpers are built for: a fixed-height page inside a scrolling
 * container. These stubs cover exactly what the helpers touch, so the test
 * asserts the behaviour that matters — the *container* moves and the document
 * is reset — rather than a real browser's scroll animation.
 */
interface FakeElement {
  scrollTop: number
  parentElement: FakeElement | null
  overflowY: string
  scrollTo: ReturnType<typeof vi.fn>
  scrollIntoView: ReturnType<typeof vi.fn>
  getBoundingClientRect: () => DOMRect
}

function fakeElement(overrides: Partial<FakeElement> = {}): FakeElement {
  return {
    scrollTop: 0,
    parentElement: null,
    overflowY: 'visible',
    scrollTo: vi.fn(),
    scrollIntoView: vi.fn(),
    getBoundingClientRect: () => ({ top: 0 }) as DOMRect,
    ...overrides,
  }
}

function stubWindow(matches = false) {
  const scrollTo = vi.fn()
  vi.stubGlobal('window', { matchMedia: () => ({ matches }), scrollTo })
  return scrollTo
}

function stubTarget(element: FakeElement | null) {
  vi.stubGlobal('document', { getElementById: () => element })
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('scrollBlockIntoView', () => {
  it('scrolls the reading container instead of the document', () => {
    const container = fakeElement({
      overflowY: 'auto',
      scrollTop: 120,
      getBoundingClientRect: () => ({ top: 200 }) as DOMRect,
    })
    const target = fakeElement({ getBoundingClientRect: () => ({ top: 620 }) as DOMRect })
    const scrollTo = stubWindow()
    stubTarget(target)

    const found = scrollBlockIntoView('block-1', {
      container: container as unknown as HTMLElement,
    })

    expect(found).toBe(true)
    // 120 + (620 - 200): the target's distance below the container's own top.
    expect(container.scrollTo).toHaveBeenCalledWith({ top: 540, behavior: 'smooth' })
    // The document is reset so a native jump cannot leave the shell off-screen.
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'auto' })
    // The element's own scrollIntoView is what slides the shell; never use it
    // when a container was found.
    expect(target.scrollIntoView).not.toHaveBeenCalled()
  })

  it('does not animate when the reader has asked for reduced motion', () => {
    const container = fakeElement({
      getBoundingClientRect: () => ({ top: 0 }) as DOMRect,
    })
    const target = fakeElement({ getBoundingClientRect: () => ({ top: 400 }) as DOMRect })
    stubWindow(true)
    stubTarget(target)

    scrollBlockIntoView('block-2', { container: container as unknown as HTMLElement })

    expect(container.scrollTo).toHaveBeenCalledWith({ top: 400, behavior: 'auto' })
  })

  it('jumps instantly when asked not to animate, as a deep link does', () => {
    const container = fakeElement()
    const target = fakeElement({ getBoundingClientRect: () => ({ top: 250 }) as DOMRect })
    stubWindow(false)
    stubTarget(target)

    scrollBlockIntoView('block-3', {
      container: container as unknown as HTMLElement,
      smooth: false,
    })

    expect(container.scrollTo).toHaveBeenCalledWith({ top: 250, behavior: 'auto' })
  })

  it('falls back to the element when nothing scrolls around it', () => {
    const target = fakeElement()
    stubWindow()
    stubTarget(target)

    scrollBlockIntoView('block-4', { smooth: false })

    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' })
  })

  it('reports a target that has not rendered yet without touching the document', () => {
    const scrollTo = stubWindow()
    stubTarget(null)

    expect(scrollBlockIntoView('not-yet-loaded')).toBe(false)
    expect(scrollTo).not.toHaveBeenCalled()
  })
})

describe('findScrollContainer', () => {
  it('walks past elements that do not scroll and returns the first that does', () => {
    const scroller = fakeElement({ overflowY: 'auto' })
    const wrapper = fakeElement({ overflowY: 'visible', parentElement: scroller })
    const target = fakeElement({ parentElement: wrapper })

    vi.stubGlobal('getComputedStyle', (element: FakeElement) => ({
      overflowY: element.overflowY,
    }))

    expect(findScrollContainer(target as unknown as Element)).toBe(scroller)
  })

  it('returns null when the document is the only scroller', () => {
    const target = fakeElement({ parentElement: null })

    vi.stubGlobal('getComputedStyle', () => ({ overflowY: 'visible' }))

    expect(findScrollContainer(target as unknown as Element)).toBeNull()
  })
})
