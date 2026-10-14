import { computed, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

/**
 * Auto-completes a lesson once the learner has read to the end of it and spent
 * a minimum amount of time on the page with the tab actually visible.
 *
 * Two independent signals have to agree before a lesson is marked complete:
 *
 *  1. Reading depth — the viewport has covered all but the bottom slice of the
 *     content. This watches the lesson's scroll container rather than the
 *     window, because the learn layout scrolls an inner element instead of
 *     the document, which leaves `window.scrollY` at 0.
 *  2. Engaged time — wall-clock time during which the document was visible. The
 *     Page Visibility API gates the clock so switching tabs or minimising the
 *     window stops it, and leaving a tab open in the background cannot
 *     accumulate credit toward the minimum.
 *
 * Reading alone is only ever enough for a lesson with nothing to do:
 * the page gates `enabled` on every exercise being passed, so a
 * lesson that asks for code cannot be completed by scrolling.
 */

const TICK_MS = 1000

/** A minute of visible time is the default bar for reading a lesson. */
export const DEFAULT_MINIMUM_VISIBLE_MS = 60_000

/** The last slice of the page a learner has to reach, as a fraction. */
export const DEFAULT_BOTTOM_FRACTION = 0.1

export interface LessonAutoCompleteOptions {
  /** Identity of the lesson being tracked. Reset when this changes. */
  lessonId: Ref<string>
  /** The scrolling element. Falls back to the window when absent. */
  container?: Ref<HTMLElement | null>
  /** Called once, when both signals are satisfied. */
  onComplete: () => void
  /** Stop tracking entirely, e.g. once the lesson is already complete. */
  enabled?: Ref<boolean>
  minimumVisibleMs?: number
  bottomFraction?: number
}

/**
 * Fraction of the content the viewport has covered, 0–1.
 *
 * Kept pure so the threshold arithmetic can be reasoned about and tested without
 * a DOM. Content shorter than its viewport is fully visible from the start, so it
 * reads as 1 and a short lesson is never gated on scrolling.
 */
export function coverageFrom(scrollTop: number, clientHeight: number, scrollHeight: number): number {
  if (scrollHeight <= 0) return 1
  if (scrollHeight - clientHeight <= 1) return 1
  return Math.min(Math.max((scrollTop + clientHeight) / scrollHeight, 0), 1)
}

/** Reads live scroll metrics and converts them to coverage. */
function readCoverage(container: HTMLElement | null): number {
  if (!container) {
    return coverageFrom(
      window.scrollY,
      window.innerHeight,
      Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight ?? 0),
    )
  }
  return coverageFrom(container.scrollTop, container.clientHeight, container.scrollHeight)
}

export function useLessonAutoComplete(options: LessonAutoCompleteOptions) {
  const {
    lessonId,
    container,
    onComplete,
    enabled,
    minimumVisibleMs = DEFAULT_MINIMUM_VISIBLE_MS,
    bottomFraction = DEFAULT_BOTTOM_FRACTION,
  } = options

  const requiredCoverage = 1 - bottomFraction

  const coverage = ref(0)
  const visibleMs = ref(0)
  const isPaused = ref(false)
  const hasCompleted = ref(false)

  let interval: ReturnType<typeof setInterval> | null = null
  let resizeObserver: ResizeObserver | null = null
  let lastTickAt = 0
  let trackedId = ''

  const reachedEnd = computed(() => coverage.value >= requiredCoverage)
  const timeMet = computed(() => visibleMs.value >= minimumVisibleMs)
  const remainingMs = computed(() => Math.max(minimumVisibleMs - visibleMs.value, 0))

  /** The combined progress a learner sees, 0–1. */
  const progress = computed(() => {
    const timeShare = minimumVisibleMs > 0 ? visibleMs.value / minimumVisibleMs : 1
    return Math.min(coverage.value / requiredCoverage, 1) * Math.min(timeShare, 1)
  })

  function evaluate() {
    coverage.value = readCoverage(container?.value ?? null)
    if (!enabled || enabled.value) {
      if (reachedEnd.value && timeMet.value && !hasCompleted.value) {
        hasCompleted.value = true
        onComplete()
      }
    }
  }

  function onVisibilityChange() {
    // Always rebase the clock on a visibility flip. Background tabs get their
    // timers throttled hard, so the gap since the previous tick can be minutes
    // long and must never be credited as reading time.
    lastTickAt = Date.now()
    isPaused.value = document.visibilityState !== 'visible'
  }

  function tick() {
    const now = Date.now()
    const elapsed = now - lastTickAt
    lastTickAt = now
    // A single tick covering a long gap means the tab was throttled or the
    // machine slept; credit only one tick's worth so time cannot jump ahead.
    if (document.visibilityState === 'visible' && elapsed > 0 && elapsed < TICK_MS * 4) {
      visibleMs.value += elapsed
    }
    evaluate()
  }

  function start() {
    stop()
    trackedId = lessonId.value
    coverage.value = readCoverage(container?.value ?? null)
    visibleMs.value = 0
    hasCompleted.value = false
    lastTickAt = Date.now()
    isPaused.value = document.visibilityState !== 'visible'

    const target = container?.value
    if (target) {
      target.addEventListener('scroll', evaluate, { passive: true })
      // Demos, images and expanded answers change the content height after load,
      // which moves the bottom of the page. Re-measure when that happens.
      resizeObserver = new ResizeObserver(evaluate)
      resizeObserver.observe(target)
      if (target.firstElementChild) resizeObserver.observe(target.firstElementChild)
    } else {
      window.addEventListener('scroll', evaluate, { passive: true })
      window.addEventListener('resize', evaluate, { passive: true })
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    interval = setInterval(tick, TICK_MS)
    evaluate()
  }

  function stop() {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
    resizeObserver?.disconnect()
    resizeObserver = null
    const target = container?.value
    if (target) target.removeEventListener('scroll', evaluate)
    else {
      window.removeEventListener('scroll', evaluate)
      window.removeEventListener('resize', evaluate)
    }
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }

  function restart() {
    if (import.meta.client) start()
  }

  onMounted(() => {
    if (!import.meta.client) return
    // The container only exists after mount, and its scrollHeight settles as
    // content renders, so defer the first measurement past the initial paint.
    void nextTick().then(restart)
  })

  // Navigating between lessons reuses this component, so every condition has to
  // start over rather than carry over to the next lesson.
  watch(lessonId, (next, previous) => {
    if (!import.meta.client || next === previous) return
    restart()
  })

  watch(
    () => (enabled ? enabled.value : true),
    (active) => {
      if (!import.meta.client) return
      if (!active) stop()
      else if (trackedId === lessonId.value && !hasCompleted.value) restart()
    },
  )

  onBeforeUnmount(stop)

  return { coverage, progress, visibleMs, remainingMs, isPaused, reachedEnd, timeMet, hasCompleted }
}

/** Formats a remaining duration as "45s" or "1m 20s". */
export function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(Math.ceil(ms / 1000), 0)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  if (minutes === 0) return `${seconds}s`
  return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`
}