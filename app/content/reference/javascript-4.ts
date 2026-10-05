import { m, t } from './javascript-builders'

/**
 * The DOM event topics. `DOM Events` is the largest in the index: the first run
 * of entries are event names, the second are the properties and methods that
 * arrive on the event object.
 *
 * Seven labels appear twice in the source, because they mean two different
 * things depending on which object you are looking at — `altKey` is both a
 * modifier property and a value of `KeyboardEvent.key`, for instance. They are
 * disambiguated here rather than silently collapsed, since collapsing them would
 * lose an entry the source intends.
 */
export const javascriptTopics4 = [
  t(
    'dom-events',
    'DOM Events',
    'HTML DOM',
    'Every event name, and everything the event object carries.',
    'Events come in three phases: capture as the event travels down towards the target, target at the element itself, then bubble back up. `addEventListener` picks a phase with its third argument, and leaving it out means bubbling. The names below are what you pass as a string. Two are worth singling out: `submit` fires on the form, and calling `preventDefault` on it is what stops the page navigating; `click` on a checkbox is dispatched after the state has already changed.',
    { language: 'javascript', code: `el.addEventListener('click', (event) => {
  if (!event.target.closest('button')) return   // delegated
  event.preventDefault()
})

// One listener for the whole list, rather than one per row.
list.addEventListener('click', (event) => {
  const row = event.target.closest('li')
  if (row) remove(row.id)
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') close()
})` },
    [
      // Event names.
      m('abort', 'Fires on a media element or fetch when the operation was cancelled.'),
      m('afterprint', 'Fires when printing or the print preview has finished.'),
      m('animationend', 'Fires when a CSS animation reaches the end, once per animation. This is the reliable counterpart to transitionend, which does not fire for keyframe animations.'),
      m('animationiteration', 'Fires each time a CSS animation starts another cycle.'),
      m('animationstart', 'Fires when a CSS animation starts for the first time.'),
      m('beforeprint', 'Fires before printing begins, which is the last chance to change the page.'),
      m('beforeunload', 'Fires when the page is about to close, and is where a confirmation prompt goes. Browsers restrict what it can do and do not show a custom message.'),
      m('blur', 'Fires on an element when it loses focus, or on the window when the whole window loses focus.'),
      m('canplay', 'Fires when there is enough data to start playing without buffering.'),
      m('canplaythrough', 'Fires when the whole media file is buffered and can play to the end.'),
      m('change', 'Fires when the value is committed: on blur for a text field, immediately for a checkbox or select. Compare with input, which fires on every keystroke.'),
      m('click', 'Fires after a full press and release on an element, or when click() is called on it.'),
      m('contextmenu', 'Fires on a right click or the dedicated menu key. Calling preventDefault is how you build your own menu.'),
      m('copy', 'Fires on the copy action, where you can put something else on the clipboard via the clipboardData property.'),
      m('cut', 'Fires on the cut action, where you can handle removing the selection yourself.'),
      m('dblclick', 'Fires after two clicks in quick succession at roughly the same position.'),
      m('drag', 'Fires repeatedly on the element being dragged as the pointer moves.'),
      m('dragend', 'Fires on the source element when the drag finishes or is abandoned.'),
      m('dragenter', 'Fires on an element as a dragged item passes over it, and it bubbles, so it fires for every ancestor too. That is what makes dragleave flicker when you check for relatedTarget.'),
      m('dragleave', 'Fires on an element as a dragged item leaves it. Also bubbles, so the classic highlight flicker comes from here.'),
      m('dragover', 'Fires repeatedly on an element as something is dragged over it. Calling preventDefault is what allows a drop at all.'),
      m('dragstart', 'Fires on the element being picked up, where you set what is being dragged in dataTransfer.'),
      m('drop', 'Fires on an element where the dragged item is released, once dragover has been prevented.'),
      m('durationchange', 'Fires on a media element when its duration becomes known or changes.'),
      m('ended', 'Fires when playback reaches the end of a media file.'),
      m('error', 'Fires on a media element or a resource when loading fails. It does not bubble, so listen on the element rather than a parent.'),
      m('focus', 'Fires on an element when it gains focus. Unlike blur it does not bubble, which is why focusin exists.'),
      m('focusin', 'Fires as focus moves into an element or one of its descendants, and it bubbles.'),
      m('focusout', 'Fires as focus moves out of an element or one of its descendants, and it bubbles.'),
      m('fullscreenchange', 'Fires when the fullscreen element changes.'),
      m('fullscreenerror', 'Fires when a request to go fullscreen fails, usually because it lacked a user gesture.'),
      m('hashchange', 'Fires on the window when the fragment after the # changes.'),
      m('input', 'Fires on every edit to a field, including typing, pasting and autofill. This is the one for reacting as the user types.'),
      m('invalid', 'Fires on a form control when it fails validation, before the submit is blocked. It does not bubble.'),
      m('keydown', 'Fires when a key goes down, repeatedly while held. The one to use for shortcuts and for preventing a character.'),
      m('keypress', 'Fires between keydown and keyup for a character-producing key, and it is deprecated because it has no answer for keys that produce nothing.', 'Deprecated. Use keydown, and read event.key.'),
      m('keyup', 'Fires when a key is released, which is where you check modifier state for shortcuts.'),
      m('load', 'Fires on the window once everything, including images, has finished loading. For turning on the page, domcontentloaded is sooner.'),
      m('loadeddata', 'Fires on a media element when the current frame has loaded and playback can begin.'),
      m('loadedmetadata', 'Fires on a media element when its duration and dimensions are known.'),
      m('loadstart', 'Fires on a media element when the browser starts fetching.'),
      m('message', 'Fires on the window when a message arrives from another window, a worker or an iframe, which is the receiving half of postMessage.'),
      m('mousedown', 'Fires when a mouse button goes down on the element.'),
      m('mouseenter', 'Fires when the pointer moves onto the element or one of its descendants, and it does not bubble.'),
      m('mouseleave', 'Fires when the pointer moves off the element and everything inside it, and it does not bubble.'),
      m('mousemove', 'Fires as the pointer moves over the element. It fires a lot, so keep the handler cheap.'),
      m('mouseover', 'Fires when the pointer moves onto the element or a descendant, and it bubbles. The bubbling counterpart of mouseenter, and the source of most accidental hover flashes.'),
      m('mouseout', 'Fires when the pointer moves off the element or a descendant, and it bubbles.'),
      m('mouseup', 'Fires when a mouse button is released, whether or not it went down on this element.'),
      m('offline', 'Fires on the window when the browser loses its network connection.'),
      m('online', 'Fires on the window when the browser regains a network connection.'),
      m('open', 'Fires on a details element when it is expanded.'),
      m('pagehide', 'Fires on the window as the page is hidden, including when it goes into the back/forward cache. It is the reliable place to save state.'),
      m('pageshow', 'Fires on the window when the page is shown, including when it is restored from the back/forward cache.'),
      m('paste', 'Fires on the editable element when content is pasted.'),
      m('pause', 'Fires on a media element when playback stops, whether from the user or because the buffer ran out.'),
      m('play', 'Fires on a media element when playback starts, including after a pause.'),
      m('playing', 'Fires on a media element when it has started after buffering, which is the point at which it will actually keep playing.'),
      m('progress', 'Fires on a media element as the buffer fills, repeatedly while it is downloading.'),
      m('ratechange', 'Fires on a media element when playbackRate changes.'),
      m('resize', 'Fires on the window when the viewport changes size. It fires often during a drag, so debounce anything expensive.'),
      m('reset', 'Fires on a form when it is reset, before the values go back to their defaults. Calling preventDefault keeps the values.'),
      m('scroll', 'Fires on an element when it is scrolled, or on the document when the page is. It does not bubble from an element, so listen on the element you care about.'),
      m('search', 'Fires on an input of type search when the user commits a search or clears it.'),
      m('seeked', 'Fires on a media element when seeking has finished and playback is ready to continue.'),
      m('seeking', 'Fires on a media element when seeking starts.'),
      m('select', 'Fires on a text field when the user selects some of its text.'),
      m('show', 'Fires on a details element when it is expanded, and on a dialog when it opens.'),
      m('stalled', 'Fires on a media element when the browser has stopped fetching because the connection has stalled.'),
      m('submit', 'Fires on the form when it is submitted. Calling preventDefault on it is what stops the browser navigating, which is what you do when you submit over fetch.'),
      m('suspend', 'Fires on a media element when the browser deliberately stops fetching, usually because it has enough buffered.'),
      m('timeupdate', 'Fires on a media element several times a second as the current time advances.'),
      m('toggle', 'Fires on a popover, a dialog or a details element when it opens or closes, and it bubbles.'),
      m('touchcancel', 'Fires when the browser decides to abandon the gesture, for example because it turned into a scroll.'),
      m('touchend', 'Fires when the last contact point is lifted.'),
      m('touchmove', 'Fires as the contact point moves. It fires often, so coalesce the work.'),
      m('touchstart', 'Fires when the first contact point lands on the element.'),
      m('transitionend', 'Fires when a CSS transition finishes, and once per transitioned property. It does not fire for keyframe animations, which is what animationend is for.'),
      m('unload', 'Fires when the document or a child window is being unloaded. It is unreliable and is blocked in many situations, so do not depend on it.', 'Use pagehide instead.'),
      m('volumechange', 'Fires on a media element when the volume or the muted state changes.'),
      m('waiting', 'Fires on a media element when playback has stopped because the next frame is not buffered.'),
      m('wheel', 'Fires on an element when the user scrolls a wheel or trackpad over it. Call preventDefault on it to stop the page scrolling as well.'),

      // Properties and methods on the event object.
      m('altKey', 'True while the Alt modifier is held.'),
      m('altKey (key value)', 'The "Alt" value of KeyboardEvent.key, so keydown can be matched by value rather than by code.'),
      m('animationName', 'The name of the CSS animation that finished or started.'),
      m('bubbles', 'True when the event travels back up the tree after reaching the target.'),
      m('button', 'Which button was pressed: 0 for the primary, 1 for the middle, 2 for the secondary. On a mouseup this is the released button, not the one pressed.'),
      m('buttons', 'A bitmask of every button currently held, which is how you spot a drag rather than a click.'),
      m('cancelable', 'True when preventDefault can actually do something. Events like blur are not cancelable.'),
      m('charCode', 'A legacy numeric character code.', 'Deprecated and unreliable after keypress. Use key.'),
      m('clientX', 'The pointer position relative to the viewport, not the document. Use pageX for the document.'),
      m('clientY', 'The pointer position relative to the viewport.'),
      m('code', 'The physical key that was pressed, such as "KeyA" or "Digit1", which is layout-dependent. Match on this for WASD-style controls and on key for text.'),
      m('createEvent()', 'Builds an event object to dispatch yourself.', 'Deprecated. Use new Event() or new CustomEvent().'),
      m('ctrlKey', 'True while the Control modifier is held, or Command on macOS.'),
      m('ctrlKey (key value)', 'The "Control" value of KeyboardEvent.key.'),
      m('currentTarget', 'The element whose listener is currently running. Inside a delegated handler this is the element you attached to, not the one that was clicked.'),
      m('data', 'The payload on a custom event or a clipboard event.'),
      m('defaultPrevented', 'True once preventDefault has been called, so later listeners can see that someone handled it.'),
      m('deltaX', 'Horizontal scroll or swipe distance.'),
      m('deltaY', 'Vertical scroll or swipe distance. Its unit varies with the input mode, which is why deltaMode exists.'),
      m('deltaZ', 'Scroll or swipe distance on the z axis, which real mice do not report.'),
      m('deltaMode', 'The unit of the delta values: 0 pixels, 1 lines, 2 pages. Always check this before treating deltaY as pixels.'),
      m('detail', 'How many times the event has fired, so the third click of a triple click. It is also the click count on click events.'),
      m('elapsedTime', 'How long the animation ran, in milliseconds, for AnimationEvent.'),
      m('elapsedTime (TransitionEvent)', 'How long the transition took, in milliseconds, for TransitionEvent.'),
      m('eventPhase', 'Which phase the event is in: capturing, at the target, or bubbling.'),
      m('getModifierState()', 'True when the named modifier is active, which covers keys such as CapsLock and NumLock that the boolean properties do not.'),
      m('inputType', 'What kind of edit caused an input event, such as "insertText" or "deleteContentBackward". This is how you treat a paste differently from typing.'),
      m('isTrusted', 'True when the browser generated the event and false when script dispatched it. It is a good guard against a forged click.'),
      m('key', 'The logical key that was pressed, such as "a", "A", "Enter" or "Escape". Match on this for text entry and shortcuts.'),
      m('keyCode', 'A legacy numeric key code with an inconsistent layout across keyboards.', 'Deprecated. Use key or code.'),
      m('location', 'The URL being loaded, on a load or error event from a resource.'),
      m('metaKey', 'True while the Command key is held on macOS, or the Windows key elsewhere.'),
      m('metaKey (key value)', 'The "Meta" value of KeyboardEvent.key.'),
      m('newURL', 'The destination hash on a hashchange event.'),
      m('oldURL', 'The previous hash on a hashchange event.'),
      m('pageX', 'The pointer position relative to the whole document, including any scroll.'),
      m('pageY', 'The pointer position relative to the whole document.'),
      m('persisted', 'True when the page was restored from the back/forward cache rather than freshly loaded. The event fires either way, and this tells you which.'),
      m('preventDefault()', 'Cancels the browser’s default action, such as following a link or submitting a form. It has no effect when cancelable is false.'),
      m('propertyName', 'The CSS property a transition ran on, which is how you tell several properties apart on one transitionend.'),
      m('relatedTarget', 'The other element involved in a mouse transition, such as the one being left on mouseover.'),
      m('relatedTarget (FocusEvent)', 'The element losing or gaining focus on a focusin or focusout event.'),
      m('screenX', 'The pointer position relative to the physical screen, which is useful for multi-monitor games.'),
      m('screenY', 'The pointer position relative to the physical screen.'),
      m('shiftKey', 'True while the Shift modifier is held.'),
      m('shiftKey (key value)', 'The "Shift" value of KeyboardEvent.key.'),
      m('stopImmediatePropagation()', 'Stops the event entirely, including the remaining listeners on this same element. Rarely what you want in application code.'),
      m('stopPropagation()', 'Stops the event travelling any further, so no ancestor listener fires. It does not stop other listeners on the same element.'),
      m('target', 'The element the event happened on, which in a delegated handler is the innermost element clicked rather than the one you attached to.'),
      m('targetTouches', 'The touches that started on the target element, so you can tell a tap from a touch that began elsewhere.'),
      m('timeStamp', 'When the event was created, in milliseconds. Comparing it with performance.now() tells you how much a frame was delayed.'),
      m('touches', 'Every active touch point on the screen.'),
      m('type', 'The event name as a string, which is how one handler can serve several events.'),
      m('which', 'A legacy button or key code.', 'Deprecated. Use button for the mouse and key for the keyboard.'),
      m('which (key value)', 'The "which" style legacy key value, kept separate from the button number it shares a name with.'),
      m('view', 'The window the event happened in, which is null for synthetic events.'),
    ],
  ),

  t(
    'dom-event-objects',
    'DOM Event Objects',
    'HTML DOM',
    'The event classes every event object descends from.',
    '`Event` is the base, and each class here adds the properties its own family needs. The practical reason to know them is typing: in plain JavaScript you check `event instanceof MouseEvent` before reading `clientX`, and in TypeScript the event parameter on `addEventListener` is typed to match. The inheritance runs Event, then UiEvent with view and detail, then the specific ones.',
    { language: 'javascript', code: `document.addEventListener('click', (event) => {
  if (!(event instanceof MouseEvent)) return
  console.log(event.clientX, event.button)
})

// Custom events carry whatever detail you attach.
const detail = new CustomEvent('saved', { detail: { id: 7 } })
el.dispatchEvent(detail)` },
    [
      m('AnimationEvent', 'Fired for CSS animations. Carries animationName and elapsedTime.'),
      m('ClipboardEvent', 'Fired for copy, cut and paste, and carries the clipboardData payload.'),
      m('DragEvent', 'The base for the whole drag and drop family, carrying the DataTransfer object.'),
      m('Event', 'The base class of every event. Only type, target and the timing and phase properties live here.'),
      m('FocusEvent', 'Fired for focus, blur, focusin and focusout, and carries relatedTarget.'),
      m('HashChangeEvent', 'Fired when the fragment changes, carrying oldURL and newURL.'),
      m('InputEvent', 'Fired when a field is edited, carrying inputType and data.'),
      m('KeyboardEvent', 'Fired for keydown, keyup and keypress, carrying key, code and the modifier state.'),
      m('MouseEvent', 'Fired for the mouse and pointer family, carrying the coordinates and the button state.'),
      m('PageTransitionEvent', 'Fired on window during a page transition in the old Firefox navigation model.', 'Effectively dead. Use pageshow and pagehide.'),
      m('PopStateEvent', 'Fired on window when the history entry changes, carrying the state you pushed.'),
      m('ProgressEvent', 'Carries loaded and total, used for media and for XMLHttpRequest progress.'),
      m('StorageEvent', 'Fired on window when localStorage changes in another tab, which is how you sync state across tabs.'),
      m('TouchEvent', 'Fired for the touch family, carrying the list of active touches.'),
      m('TransitionEvent', 'Fired for CSS transitions, carrying propertyName and elapsedTime.'),
      m('UiEvent', 'The base for input events that come from a user interface, adding view and detail.'),
      m('WheelEvent', 'Fired when a wheel or trackpad scrolls, adding deltaX, deltaY and deltaMode to MouseEvent.'),
    ],
  ),

  t(
    'dom-htmlcollection',
    'DOM HTMLCollection',
    'HTML DOM',
    'The list you get back from the old lookup methods.',
    'An HTMLCollection is what `getElementsByClassName` and friends return. The important difference from the NodeList you get from `querySelectorAll` is that it is live: it re-reads the document every time you touch it, so a loop over it can pick up elements added during the loop, and `for...of` over it can run forever if the loop body keeps adding matches. Convert it with `Array.from` when you want a stable copy.',
    { language: 'javascript', code: `const live = document.getElementsByClassName('row')
const copy = Array.from(live)   // stable, safe to iterate

const byQuery = document.querySelectorAll('.row')  // already static

live.length      // re-read now
copy.length      // fixed at the moment you copied` },
    [
      m('item()', 'The element at a numeric index, or null past the end.'),
      m('length', 'How many elements the collection holds, counted fresh on every access.'),
      m('namedItem()', 'The element whose id or name matches, or null. This is the named access that makes HTMLCollection surprising.'),
    ],
  ),

  t(
    'dom-location',
    'DOM Location',
    'HTML DOM',
    'The current URL, readable in parts and writable as a whole.',
    '`location` is both a getter and a setter. Reading a part gives you the URL already decoded, which is usually what you want for routing. Assigning to any part, or to `href` itself, navigates. `assign` and `replace` differ in history: replace swaps the current entry so the back button skips it, which is the right choice after a redirect.',
    { language: 'javascript', code: `const url = new URL(location.href)
url.pathname                       // '/learn/html-fundamentals/html-l1'
url.searchParams.get('page')       // a decoded query value

location.assign('/next')           // adds a history entry
location.replace('/login')         // does not

location.hash = 'section-3'        // navigates to the fragment` },
    [
      m('hash', 'The fragment after the #, without the # itself. Reading it does not scroll the page.'),
      m('host', 'Host and port together.'),
      m('hostname', 'The host without the port.'),
      m('href', 'The whole URL. Assigning to it navigates.'),
      m('origin', 'The scheme, host and port, which is the part that decides whether two pages are same-origin.'),
      m('pathname', 'The path, always starting with a slash.'),
      m('port', 'The port as a string, or empty when the scheme’s default is in use.'),
      m('protocol', 'The scheme, including the colon, such as "https:".'),
      m('search', 'The query string including the leading ?, for example "?page=2&sort=name".'),
      m('assign()', 'Navigates to a URL and adds a history entry, leaving the old one behind for the back button.'),
      m('reload()', 'Reloads the current page.'),
      m('replace()', 'Navigates without adding a history entry, so the back button skips this page. Use it after a redirect.'),
    ],
  ),

  t(
    'dom-navigator',
    'DOM Navigator',
    'HTML DOM',
    'What the browser says about itself and the reader.',
    'Most of these describe the browser rather than the page, and privacy settings mean several of them lie or report a reduced value. `userAgent` is the classic example: it is no longer a reliable way to detect a browser, and sniffing it is how bugs get shipped. Use feature detection for what you need, and keep the fingerprinting-shaped properties out of your code entirely.',
    { language: 'javascript', code: `navigator.onLine                // false when the browser reports no connection
navigator.language             // 'en-GB'
navigator.hardwareConcurrency  // logical cores, usually

if ('share' in navigator) {
  await navigator.share({ title: 'Look', url })
}

// Feature detection beats sniffing.
if (window.AbortController) { }` },
    [
      m('appCodeName', 'The internal code name of the browser, from the 1990s.', 'Frozen at "Mozilla" by every modern browser.'),
      m('appName', 'The browser’s name.', 'Frozen at "Netscape" by every modern browser.'),
      m('appVersion', 'A version string, but not one that means anything.', 'Unreliable. Detect features instead.'),
      m('cookieEnabled', 'Whether cookies are accepted. It says nothing about third-party cookies being blocked.'),
      m('geolocation', 'The Geolocation API, which needs permission and only works in a secure context.'),
      m('language', 'The reader’s preferred language as a BCP 47 tag. navigator.languages holds the whole preference list.'),
      m('onLine', 'Whether the browser thinks it has a network. It is a hint, not a guarantee, so do not use it to decide whether a fetch will work.'),
      m('platform', 'A coarse platform string such as "Win32". It is deprecated and deliberately low-detail.'),
      m('product', 'The Gecko product string.', 'Always "Gecko" in modern browsers.'),
      m('userAgent', 'A string describing the browser. Fingerprinting-resistant browsers reduce it, so never branch on it.', 'Unreliable. Use feature detection.'),
      m('javaEnabled()', 'Whether Java is available.', 'Removed. Always returns false in current browsers.'),
      m('taintEnabled()', 'An old check that tracked cross-window data.', 'Removed. Always returns false.'),
    ],
  ),

  t(
    'dom-screen',
    'DOM Screen',
    'HTML DOM',
    'The display, not the browser window.',
    '`screen` describes the physical output: the whole display and the part of it available to the window. The width and height are the monitor, so they do not change when you resize the browser. For the space the page actually has, use innerWidth and innerHeight on window. `availWidth` subtracts the taskbar and any reserved desktop area.',
    { language: 'javascript', code: `screen.width          // the whole display
window.innerWidth     // the viewport, which is what layouts care about

screen.availHeight    // display minus the taskbar

if (window.matchMedia('(min-width: 48rem)').matches) { }` },
    [
      m('availHeight', 'The display height minus the taskbar and any other reserved desktop area.'),
      m('availWidth', 'The display width minus any reserved desktop area.'),
      m('colorDepth', 'Bits per pixel for colour, normally 24. It is not a good test for how colourful the display actually is.'),
      m('height', 'The full height of the display in pixels.'),
      m('pixelDepth', 'Bits per pixel, normally 24.'),
      m('width', 'The full width of the display in pixels.'),
    ],
  ),
]
