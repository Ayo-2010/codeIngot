import { m, t } from './javascript-builders'

/**
 * The window object, the browser APIs, and the style declaration.
 */
export const javascriptTopics5 = [
  t(
    'dom-window',
    'DOM Window',
    'HTML DOM',
    'The global object, which is also the tab.',
    '`window` is the global scope, so a bare identifier resolves against it, and it is the tab itself rather than the document inside it. That distinction explains several oddities: `document` and `location` are properties of it, an `iframe` has one, and a tab opened by script has an `opener` pointing back at the page that opened it. The timers at the bottom are the ones worth being careful with — both take a delay and both return a handle you must keep to cancel it.',
    { language: 'javascript', code: `window.innerWidth            // the viewport
window.scrollY               // how far the page is scrolled

const id = setInterval(tick, 1000)
clearInterval(id)

const controller = new AbortController()
fetch('/api/items', { signal: controller.signal })
controller.abort()

window.matchMedia('(prefers-reduced-motion: reduce)').matches` },
    [
      m('closed', 'Whether this window has been closed.'),
      m('console', 'The developer console. Its methods differ by browser, so do not ship code whose output depends on them.'),
      m('defaultStatus', 'The status text shown in the status bar.', 'Ignored by every current browser.'),
      m('document', 'The document inside this window, which is the page itself in the top-level case.'),
      m('frameElement', 'The element that embedded this window, or null for a top-level tab.'),
      m('frames', 'The child frames, as a live collection.', 'Use window.length or the frameElement of each child instead.'),
      m('history', 'The session history, and what you push onto it.'),
      m('innerHeight', 'The height of the viewport including any scrollbar.'),
      m('innerWidth', 'The width of the viewport including any scrollbar. This is the value media queries and breakpoints use.'),
      m('length', 'How many frames are nested in this window. Zero for a normal tab.'),
      m('localStorage', 'Storage that persists across visits and is shared with other tabs on the same origin. It holds strings only, it is synchronous, and it is limited to about 5MB.'),
      m('location', 'The current URL, readable in parts and writable to navigate.'),
      m('name', 'The window’s name, which is also a legacy way of addressing a frame.', 'Avoid naming windows; it interferes with window.open and with form targets.'),
      m('navigator', 'Information about the browser and the reader.'),
      m('opener', 'The window that opened this one. It gives a new page a handle on the old one, which is a security problem.', 'Set noopener when opening a window you do not control.'),
      m('outerHeight', 'The full height of the browser window including its chrome.'),
      m('outerWidth', 'The full width of the browser window including its chrome.'),
      m('pageXOffset', 'How far the page is scrolled horizontally, which is window.scrollX.'),
      m('pageYOffset', 'How far the page is scrolled vertically, which is window.scrollY.'),
      m('parent', 'The window containing this one, which is itself when top-level.'),
      m('screen', 'The display the window is on.'),
      m('screenLeft', 'The left edge of the browser window relative to the left of the display.'),
      m('screenTop', 'The top edge of the browser window relative to the top of the display.'),
      m('screenX', 'How far the left edge of the window is from the left of the display.'),
      m('screenY', 'How far the top of the window is from the top of the display.'),
      m('sessionStorage', 'Like localStorage but scoped to one tab and cleared when it closes.'),
      m('self', 'The window itself. Rarely needed; it only shows up in workers.'),
      m('status', 'The text in the status bar.', 'Ignored by every current browser.'),
      m('top', 'The topmost window in the frame hierarchy, which is itself for a normal tab.'),
      m('alert()', 'Shows a modal alert. It blocks the whole page until dismissed.', 'Blocked in most iframes and during page load. Use a dialog element instead.'),
      m('atob()', 'Decodes a base 64 string into a binary string, which is what a data URL and a legacy image transport use.'),
      m('blur()', 'Removes focus from the window.'),
      m('btoa()', 'Encodes a binary string as base 64. It throws on characters outside Latin-1, so encode to UTF-8 first.'),
      m('clearInterval()', 'Cancels an interval, given the handle setInterval returned.'),
      m('clearTimeout()', 'Cancels a timeout, given the handle setTimeout returned.'),
      m('close()', 'Closes a window that script opened. It has no effect on a tab the reader opened.'),
      m('confirm()', 'Asks a yes or no question in a modal dialog.', 'Blocked in iframes. Prefer a form or a dialog element.'),
      m('focus()', 'Brings the window to the front.'),
      m('getComputedStyle()', 'The values the browser actually computed for an element, after every stylesheet and cascade decision. This is the one to measure with, not the inline style object.'),
      m('matchMedia()', 'Returns a MediaQueryList, whose matches property is live and which fires a change event when the answer flips. This is how you respond to a breakpoint rather than only listening to resize.'),
      m('moveBy()', 'Moves the window by a number of pixels.'),
      m('moveTo()', 'Moves the window to absolute coordinates.'),
      m('open()', 'Opens a new tab or window and returns a handle to it. Pass noopener in the features string so the new page cannot reach back.', 'Also the legacy way to open a popup, which most blockers and readers treat badly.'),
      m('print()', 'Opens the print dialog.'),
      m('prompt()', 'Asks for a line of text in a modal dialog.', 'Blocked in iframes. Prefer a real form field.'),
      m('resizeBy()', 'Resizes the window by a number of pixels.'),
      m('resizeTo()', 'Resizes the window to given dimensions.'),
      m('scrollBy()', 'Scrolls the page by a distance, with options for behaviour.'),
      m('scrollTo()', 'Scrolls the page to a position or an element. The smooth behaviour needs the page to have motion enabled in CSS.'),
      m('setInterval()', 'Runs a function repeatedly on a delay and returns a handle. Remember to clear it, or it keeps running after the page moves on.'),
      m('setTimeout()', 'Runs a function once after a delay and returns a handle. It does not wait for the page to be ready, so it is not a DOM-ready signal.'),
      m('stop()', 'Stops the current page loading.', 'Ignored by modern browsers. Use AbortController on the request instead.'),
    ],
  ),

  t(
    'api-console',
    'API Console',
    'Web APIs',
    'Debugging output, and the grouping that makes it readable.',
    'The console methods all write to the developer tools, and none of them exists in a page the reader ever sees. `log` is the one you reach for; `error` and `warn` keep their level in the tools so you can filter to them. `group` and `groupCollapsed` indent everything until `groupEnd`, which is how you keep a noisy render from becoming a wall. `table` turns a list of objects into something comparable, and `count` and `time` exist for quick instrumentation.',
    { language: 'javascript', code: `console.log('label:', value)
console.error('failed', error)
console.table(items)

console.group('render')
console.debug(el)
console.groupEnd()

console.time('parse')
const data = JSON.parse(text)
console.timeEnd('parse')

console.assert(list.length > 0, 'expected a non-empty list')
console.count('row')` },
    [
      m('assert()', 'Logs a message when the first argument is falsy. A cheap guard that only shows up when it fails.'),
      m('clear()', 'Empties the console, so a loop cannot bury the message you wanted to read.'),
      m('count()', 'Counts how many times it has been called with the same label, which shows hot paths without a debugger.'),
      m('error()', 'Writes at error level, which the tools keep separate and can be filtered on.'),
      m('group()', 'Starts an indented group, so everything until groupEnd is nested under it.'),
      m('groupCollapsed()', 'The same as group, but starts collapsed so a noisy section does not flood the log.'),
      m('groupEnd()', 'Closes the group opened by group or groupCollapsed.'),
      m('info()', 'Writes at info level, which is styled as contextual detail rather than a problem.'),
      m('log()', 'Writes a message. It formats objects, arrays and maps for you, and accepts several arguments at once.'),
      m('table()', 'Renders an array of objects as a comparable table, which is far quicker to scan than an object dump.'),
      m('time()', 'Starts a named timer.'),
      m('timeEnd()', 'Stops a named timer and logs how long it took.'),
      m('trace()', 'Logs a stack trace at log level.'),
      m('warn()', 'Writes at warning level, for something that is not broken yet but will be.'),
    ],
  ),

  t(
    'api-geolocation',
    'API Geolocation',
    'Web APIs',
    'Asking the reader where they are.',
    'Geolocation is permission-gated and only available in a secure context, so it is asynchronous and it can simply never call back: a reader who declines, or a browser with the feature blocked, leaves you waiting. Always provide a fallback, and treat the coordinates as approximate — they are derived from cell towers and Wi-Fi, not a GPS fix. A coarse request is faster and less private than a precise one.',
    { language: 'javascript', code: `if (!navigator.geolocation) {
  return 'not supported'
}

const options = { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }

return new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => resolve({ lat: coords.latitude, lon: coords.longitude }),
    (error) => reject(error),   // the reader said no, or timed out
    options,
  )
})` },
    [
      m('coordinates', 'The position object, holding latitude, longitude and an accuracy in metres. Always read the accuracy before trusting the point.'),
      m('position', 'The same data plus a timestamp, which is what the callback receives.'),
    ],
  ),

  t(
    'api-history',
    'API History',
    'Web APIs',
    'Moving through the session history without reloading.',
    '`history` navigates between entries the reader has already visited, and `pushState` adds an entry without a page load, which is how a single-page app keeps its own routes. The rule that catches people out: after `pushState` the browser will restore the previous state on back, so read `history.state` on load and re-render from it rather than assuming the page starts fresh.',
    { language: 'javascript', code: `history.pushState({ page: 2 }, '', '?page=2')
history.replaceState({ page: 2 }, '', '?page=2')   // no new entry

window.addEventListener('popstate', (event) => {
  render(event.state?.page ?? 1)
})

history.back()
history.forward()
history.go(-2)` },
    [
      m('back()', 'Moves back one entry in the session history, as the back button does.'),
      m('forward()', 'Moves forward one entry in the session history.'),
      m('go()', 'Moves a given number of entries, where a negative number goes back. go(0) reloads the page.'),
      m('length', 'How many entries the session history holds.'),
    ],
  ),

  t(
    'api-storage',
    'API Storage',
    'Web APIs',
    'Key and value storage on the origin.',
    'The Storage interface is behind localStorage and sessionStorage. It holds strings only, so anything else is serialised on the way in and parsed on the way out, and a parse failure means someone else wrote to that key. It is synchronous, so a large value blocks the main thread, and it is capped at about 5MB. For anything bigger, use IndexedDB.',
    { language: 'javascript', code: `localStorage.setItem('theme', JSON.stringify('dark'))
localStorage.setItem('user', JSON.stringify({ id: 7 }))

const raw = localStorage.getItem('user')
const user = raw ? JSON.parse(raw) : null   // always guard the parse

localStorage.key(0)          // the first key
localStorage.length         // how many keys

localStorage.removeItem('theme')
localStorage.clear()        // wipes everything for this origin` },
    [
      m('key()', 'The key at a numeric index, or null past the end. The order is not guaranteed to be insertion order across browsers.'),
      m('length', 'How many keys are stored.'),
      m('getItem()', 'The value for a key as a string, or null when the key is absent. Null and the string "null" are different, so check for null explicitly.'),
      m('setItem()', 'Writes a string value. It throws in private mode on some browsers, so wrap writes when persistence is optional.'),
      m('removeItem()', 'Deletes one key. Removing a key that is not there does nothing.'),
      m('clear()', 'Deletes every key for this origin, which includes anything another script on the page stored.'),
    ],
  ),

  t(
    'cssstyledeclaration',
    'CSSStyleDeclaration',
    'Other References',
    'Reading and writing a block of inline styles.',
    'This is the object behind `element.style` and behind every value inside it, and it is why `el.style` and `el.style.backgroundColor` behave differently: the first is the declaration object, the second is one property on it. The methods here take the kebab-case name you write in a stylesheet, whereas the properties are camelCase. `removeProperty` is the honest way to drop a property, since assigning an empty string leaves it declared.',
    { language: 'javascript', code: `el.style.backgroundColor = 'navy'      // camelCase property
el.style.setProperty('background-color', 'navy', 'important')

el.style.getPropertyValue('background-color')     // 'navy'
el.style.getPropertyPriority('background-color')  // 'important', or ''

el.style.removeProperty('background-color')       // drops the declaration
el.style.cssText                                 // the whole block as text

const computed = getComputedStyle(el)
computed.getPropertyValue('display')` },
    [
      m('cssText', 'The whole declaration block as text, so "color: red; display: block". Assigning to it replaces everything at once.'),
      m('getPropertyPriority()', 'The priority of a property as "important" or an empty string.'),
      m('getPropertyValue()', 'The value of a property, given its kebab-case name.'),
      m('item()', 'The name of the property at a numeric index.'),
      m('length', 'How many properties are declared in this block.'),
      m('parentRule', 'The rule this declaration belongs to inside a stylesheet, or null for inline styles.'),
      m('removeProperty()', 'Removes a property entirely and returns its old value. Prefer this to assigning an empty string, which leaves it declared.'),
      m('setProperty()', 'Sets a property by its kebab-case name, with an optional third argument of "important".'),
    ],
  ),
]
