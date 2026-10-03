import type { HtmlEventAttribute } from '~/types/content'

/**
 * Event handler attributes, grouped the way the sidebar presents them: window
 * events first, then the events that belong to elements rather than the page.
 */
export const htmlEvents: HtmlEventAttribute[] = [
  {
    event: 'onclick',
    appliesTo: '<button>, <a>, <input>, <label>, <select>, <summary>, and most elements',
    description:
      'Fires when the element is activated by pointer or keyboard. Prefer a real button over a clickable div so Enter and Space work and the element is focusable.',
  },
  {
    event: 'ondblclick',
    appliesTo: 'any element',
    description:
      'Fires on a double click, which is unreliable on touch screens and cannot be triggered from the keyboard. Use it for specialist tools only.',
  },
  {
    event: 'onmousedown / onmouseup',
    appliesTo: 'any element',
    description:
      'Fire when a pointer button goes down or comes up. They run before click, so use them for drag starts and press feedback rather than for actions.',
  },
  {
    event: 'onmouseenter / onmouseleave',
    appliesTo: 'any element',
    description:
      'Fire when the pointer enters or leaves the element, and they do not bubble. Use them for hover-only hints, never for content that must be reachable by keyboard.',
  },
  {
    event: 'onmouseover / onmouseout',
    appliesTo: 'any element',
    description:
      'Fire as the pointer moves over descendants as well, and they bubble. Listen to them on a container to see which child was involved.',
  },
  {
    event: 'onmousemove',
    appliesTo: 'any element',
    description:
      'Fires on every pointer move inside the element, which is frequent. Throttle the handler or you will spend most of your time in it.',
  },
  {
    event: 'onkeydown / onkeyup',
    appliesTo: '<button>, <input>, <select>, <textarea>, <a>, and focusable elements',
    description:
      'Fire when a key goes down or comes up. Use keydown for shortcuts and Escape handling; the event carries key, code and modifiers.',
  },
  {
    event: 'onkeypress',
    appliesTo: '<input>, <textarea>',
    description:
      'Fires for character keys only and is deprecated. It does not fire for keys such as Backspace or Enter, so use beforeinput or keydown instead.',
  },
  {
    event: 'oninput',
    appliesTo: '<input>, <textarea>, <select>, contenteditable',
    description:
      'Fires on every edit as it happens, which is what you want for live previews and validation. The onchange event only fires when the value is committed.',
  },
  {
    event: 'onchange',
    appliesTo: '<input>, <select>, <textarea>, <option>',
    description:
      'Fires when a control loses focus with a changed value, or immediately for a select. Good for saving on blur, too late for character counters.',
  },
  {
    event: 'onsubmit',
    appliesTo: '<form>',
    description:
      'Fires before the request is sent, which is where validation and preventDefault belong. Leaving the default alone is what makes Enter-to-submit work.',
  },
  {
    event: 'onreset',
    appliesTo: '<form>',
    description:
      'Fires when the form is reset to its initial values. It cancels the reset, so a confirm step belongs here rather than in a click handler.',
  },
  {
    event: 'onfocus / onblur',
    appliesTo: '<input>, <select>, <textarea>, <button>, and any focusable element',
    description:
      'Fire when an element gains or loses focus. Blur bubbles while focusout also catches descendants, which matters for focus leaving a whole widget.',
  },
  {
    event: 'onfocusin / onfocusout',
    appliesTo: 'any element with focusable descendants',
    description:
      'Bubbling versions of focus and blur. Use them to tell whether focus left a component or only moved between its own fields.',
  },
  {
    event: 'onscroll',
    appliesTo: 'any element, and <body> for the page',
    description:
      'Fires when an element or the page scrolls, and it does not bubble. Throttle it, and prefer IntersectionObserver for anything reveal-on-scroll.',
  },
  {
    event: 'onwheel',
    appliesTo: 'any element',
    description:
      'Fires on a scroll gesture. Calling preventDefault on it is often ignored, so do not build a scroll-jacking page on top of it.',
  },
  {
    event: 'onload',
    appliesTo: '<img>, <script>, <link>, <iframe>, and <body>',
    description:
      'Fires once the resource has finished loading. On body it waits for images and stylesheets too, which is why it is slower than DOMContentLoaded.',
  },
  {
    event: 'onerror',
    appliesTo: '<img>, <script>, <link>, <iframe>, and <body>',
    description:
      'Fires when a resource fails to load, and on a script it also fires for a runtime error. Return true from a window handler to suppress the default message.',
  },
  {
    event: 'onresize',
    appliesTo: 'any element, and <body> for the viewport',
    description:
      'Fires when the window or element changes size, and it fires continuously during a drag. Debounce it, or use a ResizeObserver on the element itself.',
  },
  {
    event: 'onbeforeunload',
    appliesTo: '<body>',
    description:
      'Fires before the page unloads, and a custom message is ignored by modern browsers. Use it sparingly to warn about unsaved work, and prefer the beforeunload event.',
  },
  {
    event: 'onunload',
    appliesTo: '<body>',
    description:
      'Fires as the page is unloaded. It cannot cancel the navigation, and bfcache restrictions mean it often never runs, so avoid relying on it to save data.',
  },
  {
    event: 'onhashchange',
    appliesTo: 'window',
    description:
      'Fires when the URL fragment changes, including when an in-page link is followed. Reading location.hash inside the handler is how you react to it.',
  },
  {
    event: 'onpopstate',
    appliesTo: 'window',
    description:
      'Fires when the active history entry changes, which covers back and forward. Pair it with pushState to keep a single-page view in step with the address bar.',
  },
  {
    event: 'ononline / onoffline',
    appliesTo: 'window',
    description:
      'Fire as connectivity changes. Use them to show a banner and to pause polling, not to decide whether a request will actually succeed.',
  },
  {
    event: 'onmessage',
    appliesTo: 'window',
    description:
      'Fires on a message from another window or an iframe. Check the origin of event.data and event.origin before trusting anything in the payload.',
  },
  {
    event: 'onstorage',
    appliesTo: 'window',
    description:
      'Fires when another tab changes localStorage. It does not fire in the tab that made the change, so both tabs need to handle it.',
  },
  {
    event: 'ontouchstart / ontouchend / ontouchmove',
    appliesTo: 'any element',
    description:
      'Fire on touch input. Prefer Pointer Events, which cover touch, pen and mouse with one set of handlers and are supported everywhere current.',
  },
  {
    event: 'onpointerdown / onpointerup / onpointermove',
    appliesTo: 'any element',
    description:
      'Fire for any pointer input and carry a pointerId, which is how you track several fingers at once. setPointerCapture keeps events coming after the pointer leaves the target.',
  },
  {
    event: 'ondragstart / ondrag / ondragover / ondrop',
    appliesTo: 'any element',
    description:
      'Cover HTML drag and drop. A drop only fires on a target that calls preventDefault on dragover, which is the step most often forgotten.',
  },
  {
    event: 'oncopy / oncut / onpaste',
    appliesTo: 'any editable region',
    description:
      'Fire on clipboard actions. Intercept paste only to validate or reformat it, since silently dropping user content is a hostile surprise.',
  },
  {
    event: 'onanimationend / ontransitionend',
    appliesTo: 'any animated element',
    description:
      'Fire when a CSS animation or transition finishes, which is how you chain steps and clean up temporary classes without guessing at timings.',
  },
  {
    event: 'onanimationstart / ontransitionstart / ontransitioncancel',
    appliesTo: 'any animated element',
    description:
      'Fire when motion starts or is cancelled, and transitioncancel fires when an interrupting change cuts the transition short.',
  },
  {
    event: 'onclose / oncancel',
    appliesTo: '<dialog>',
    description:
      'onclose fires after a dialog closes from any cause. oncancel fires for the Escape key, and preventDefault there stops the dismissal.',
  },
  {
    event: 'ontoggle',
    appliesTo: '<details>, <dialog>',
    description:
      'Fires when a disclosure opens or closes and when a popover toggles, with the new state on the event target. It replaces listening for clicks on summary.',
  },
  {
    event: 'ontoggle (details)',
    appliesTo: '<details>',
    description:
      'The open state can be read from the target after the event, which is more reliable than tracking clicks on the summary yourself.',
  },
  {
    event: 'onshow / onautocomplete / oninvalid',
    appliesTo: '<input>, <datalist>, <select>',
    description:
      'Autocomplete fires as suggestions are shown, beforeinput before the value changes, and invalid fires when validation blocks submission.',
  },
  {
    event: 'onbeforeinput',
    appliesTo: '<input>, <textarea>, contenteditable',
    description:
      'Fires before a change is inserted and can cancel it, so it is the only reliable way to restrict characters without mangling existing content.',
  },
  {
    event: 'onauxclick',
    appliesTo: 'any element',
    description:
      'Fires for a click from a button other than the primary one, such as middle click. Useful for opening a link in a new tab.',
  },
  {
    event: 'oncontextmenu',
    appliesTo: 'any element',
    description:
      'Fires on a right click. You can preventDefault to replace the menu, but doing so removes paste, zoom and inspect for everyone, so use it carefully.',
  },
  {
    event: 'onfullscreenchange / onfullscreenerror',
    appliesTo: 'document',
    description:
      'Fire as the document enters or leaves fullscreen, or when the request is refused. document.fullscreenElement tells you which state you are in.',
  },
  {
    event: 'onorientationchange / ondeviceorientation',
    appliesTo: 'window',
    description:
      'The first fires when the device is rotated; the second reports motion sensors and needs a permission prompt on iOS.',
  },
  {
    event: 'onvisibilitychange',
    appliesTo: 'document',
    description:
      'Fires when the tab is hidden or shown, which is the right moment to pause timers, animation and polling rather than letting them run in the background.',
  },
  {
    event: 'onwheel (passive)',
    appliesTo: 'any element',
    description:
      'Registering this handler as passive tells the browser you will not call preventDefault, which lets scrolling stay smooth. It is a listener option, not a separate event.',
  },
]
