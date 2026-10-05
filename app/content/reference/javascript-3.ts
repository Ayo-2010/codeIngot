import { m, t } from './javascript-builders'

/**
 * The DOM object topics: attributes, the document, and elements.
 */
export const javascriptTopics3 = [
  t(
    'dom-attributes',
    'DOM Attributes',
    'HTML DOM',
    'Reading one attribute as a node.',
    'Usually you read attributes with `getAttribute` and write them with `setAttribute`, and you never touch this object. It exists for the cases where you need an attribute as a node rather than a string: to inspect which namespace it is in, to see whether the author wrote the value or inherited it, or to work with a `data-*` attribute you are treating as structured data.',
    { language: 'javascript', code: `const attr = el.attributes.getNamedItem('href')

attr.name        // 'href'
attr.value       // the string value
attr.specified   // true when the author wrote it
el.hasAttribute('href')   // usually what you want instead` },
    [
      m('getNamedItem()', 'Looks up a child attribute node by name and returns it, or null.'),
      m('isId', 'True when the attribute is declared to hold an id.'),
      m('item()', 'The attribute node at a numeric index.'),
      m('length', 'How many attributes the element carries.'),
      m('name', 'The attribute name, such as "href".'),
      m('removeNamedItem()', 'Removes an attribute node by name and returns it.'),
      m('setNamedItem()', 'Adds or replaces an attribute node.'),
      m('specified', 'True when the value came from the markup rather than from a default.'),
      m('value', 'The attribute value as a string.'),
    ],
  ),

  t(
    'dom-document',
    'DOM Document',
    'HTML DOM',
    'The page itself, and the factory for everything in it.',
    '`document` is the entry point to the whole page. Most of it is finding elements and creating nodes: `querySelector` is the one to reach for, and `getElementById` is the fast path when you have an id. Creating elements and inserting them is the other half — `createElement` then `appendChild`. A handful of older members on this object are dead weight: `execCommand`, `normalizeDocument`, `open`, `applets` and `renameNode` should not appear in new code.',
    { language: 'javascript', code: `const el = document.querySelector('.card')
const byId = document.getElementById('app')

const node = document.createElement('li')
node.className = 'item'
node.textContent = 'First'

const list = document.querySelector('ul')
list.append(node)          // append is the modern spelling of appendChild

document.title = 'New title'
document.documentElement.dataset.theme = 'dark'` },
    [
      m('activeElement', 'The element that currently has focus, or the body when nothing does.'),
      m('addEventListener()', 'Attaches a listener for an event, such as click or keydown. The options can control capture and whether it fires once.'),
      m('adoptNode()', 'Moves a node from another document into this one, without inserting it.'),
      m('anchors', 'Every <a> with a name, which is a fragment target. Deprecated alongside named access generally.', 'Use querySelectorAll(\'a[name]\').'),
      m('applets', 'Every <applet> element. The tag was removed from browsers long ago.', 'Always empty in a modern browser.'),
      m('baseURI', 'The base URL in effect for the page, which is what relative URLs resolve against.'),
      m('body', 'The <body> element, or null before it is parsed.'),
      m('close()', 'Closes a document opened with document.write().', 'With document.write(), which is itself a trap.'),
      m('cookie', 'Reads or writes the cookies for the current document as one string. Use cookieStore when available instead.'),
      m('charset', 'The document’s character encoding, as set by the meta charset. An older alias for characterSet.', 'Use document.characterSet.'),
      m('characterSet', 'The encoding the document is actually parsed with, whatever the markup claimed.'),
      m('createAttribute()', 'Creates a detached attribute node, ready for setAttributeNode.'),
      m('createComment()', 'Creates a comment node.'),
      m('createDocumentFragment()', 'Creates a fragment you can fill with many nodes and insert in one go, which is the fast way to build a list.'),
      m('createElement()', 'Creates an element with the given tag name, which does not put it in the page yet.'),
      m('createEvent()', 'Builds an event object to dispatch yourself.', 'Deprecated. Use new Event(name) and new CustomEvent(name, options).'),
      m('createTextNode()', 'Creates a text node. Setting textContent is usually simpler.'),
      m('defaultView', 'The window object, or null outside a browser.'),
      m('designMode', 'Turns the page editable, as if a content editor were open.'),
      m('doctype', 'The document type node, which tells you which mode the parser used.'),
      m('documentElement', 'The root <html> element.'),
      m('documentMode', 'An old Internet Explorer compatibility mode number.', 'Removed from every current browser.'),
      m('documentURI', 'The full URL of the document, read-only. location.href is settable, this is not.'),
      m('domain', 'The document’s domain, used to relax the same-origin rule.', 'Deprecated and a security risk. Never set it.'),
      m('embeds', 'Every <embed> element.'),
      m('execCommand()', 'Runs an editing command against the document.', 'Deprecated and unreliable. Use the clipboard API or an editor.'),
      m('forms', 'Every <form> element, as an HTMLFormControlsCollection.'),
      m('fullscreenElement', 'The element currently in fullscreen, or null.'),
      m('fullscreenEnabled()', 'True when this document is allowed to go fullscreen, which usually needs a user gesture.'),
      m('getElementById()', 'Finds one element by id, returning null when there is none. Very fast, but it does not reach into a shadow root.'),
      m('getElementsByClassName()', 'Every element carrying a class, as a live collection.', 'Prefer querySelectorAll for a static list you can iterate safely.'),
      m('getElementsByName()', 'Every element with the given name attribute, as a live collection.'),
      m('getElementsByTagName()', 'Every element of a tag name, as a live collection.', 'Prefer querySelectorAll.'),
      m('hasFocus()', 'True when the document or anything inside it has focus.'),
      m('head', 'The <head> element.'),
      m('images', 'Every <img> element, as an HTMLCollection.'),
      m('implementation', 'An object exposing the DOM feature set, used to test for support before calling something new.'),
      m('importNode()', 'Copies a node from another document into this one, deeply if you ask for the children too.'),
      m('inputEncoding', 'The encoding the browser assumed for the form submission.', 'Superseded by the charset on the form itself.'),
      m('lastModified', 'When the document claims it was last changed, taken from the HTTP header where there is one.'),
      m('links', 'Every <a> and <area> with an href.'),
      m('normalize()', 'Merges adjacent text nodes and drops empty ones, which is tidy-up work after a lot of insertions.'),
      m('normalizeDocument()', 'An older, whole-document version of normalize.', 'Deprecated. Use document.normalize().'),
      m('open()', 'Starts a document.write() session, clearing what is already there.', 'With document.write(), which blocks parsing. Do not use it.'),
      m('querySelector()', 'Finds the first element matching a CSS selector, or null. This is the one to use.'),
      m('querySelectorAll()', 'Every element matching a CSS selector, as a static NodeList you can iterate and pass to for...of.'),
      m('readyState', 'How far parsing has got: "loading", "interactive" then "complete".'),
      m('referrer', 'The URL of the page that linked here, as far as the policy allows it to be read.'),
      m('removeEventListener()', 'Detaches a listener, using the same function reference that was attached.'),
      m('renameNode()', 'Renames a node and its attributes.', 'Deprecated and rarely needed.'),
      m('scripts', 'Every <script> element.'),
      m('strictErrorChecking', 'How loudly the engine reports parser errors.', 'Legacy; a page no longer controls this.'),
      m('title', 'The document title, which is also the browser tab text.'),
      m('URL', 'The document’s URL as a URL object, so its parts can be read individually. Read-only; use location to change it.', 'Use location for anything you intend to navigate.'),
      m('write()', 'Writes text into the page as HTML while it is still parsing.', 'It blocks parsing and can wipe the page. Build nodes instead.'),
      m('writeln()', 'write() with a trailing newline.', 'Same problems as write().'),
    ],
  ),

  t(
    'dom-element',
    'DOM Element',
    'HTML DOM',
    'The workhorse object, and the one to read before touching innerHTML.',
    'Every tag in the page is an Element, and this is its interface. The distinction that matters most is between `innerHTML`, which takes a string and re-parses it, and the node methods, which move existing nodes around without re-parsing. Moving nodes keeps event listeners and identity; re-parsing throws both away, so a list that gets filtered should use `remove()` and `append()` rather than rewriting markup. The `dataset` object is the modern way to reach `data-*` attributes.',
    { language: 'javascript', code: `const item = document.querySelector('.item')

item.textContent = 'New text'        // safe, no parsing
item.classList.add('is-active')
item.dataset.state = 'ready'         // writes data-state

item.setAttribute('aria-expanded', 'true')
item.getAttribute('aria-expanded')

// Move a node rather than rebuilding it, so listeners survive.
const list = document.querySelector('ul')
list.append(item)

// The template route, for anything structured.
const template = document.querySelector('#row-template')
const clone = template.content.cloneNode(true)
clone.querySelector('span').textContent = 'From a template'
list.append(clone)` },
    [
      m('accessKey', 'The shortcut key that focuses this element when the platform’s access-key modifier is held.'),
      m('addEventListener()', 'Attaches a listener for an event on this element.'),
      m('appendChild()', 'Adds a node as the last child and returns it. append() takes several nodes and text in one call.'),
      m('attributes', 'Every attribute on the element, as a live NamedNodeMap.'),
      m('blur()', 'Removes focus from the element.'),
      m('childElementCount', 'How many child elements there are, ignoring text and comments.'),
      m('childNodes', 'Every child node, including text nodes and comments. children is usually what you want.'),
      m('children', 'The child elements only, as an HTMLCollection.'),
      m('classList', 'A live set-like wrapper around the class attribute, with add, remove, toggle, contains and replace.'),
      m('className', 'The class attribute as a string. classList is usually clearer than editing this.'),
      m('click()', 'Dispatches a click, which is what submits a form button or opens a details element programmatically.'),
      m('clientHeight', 'The height of the element’s content plus its padding, excluding border, scrollbar and margin. It is always a whole number.'),
      m('clientLeft', 'The left border edge relative to the viewport, so it excludes the scrollbar but includes the border.'),
      m('clientTop', 'The top border edge relative to the viewport.'),
      m('clientWidth', 'The width of the content box plus padding, excluding border, scrollbar and margin.'),
      m('cloneNode()', 'Copies the element, and its subtree when you pass true. The copy has no listeners and no identity.'),
      m('closest()', 'Walks up from this element, including itself, and returns the first ancestor matching a selector. This is how a delegated click handler finds its row.'),
      m('compareDocumentPosition()', 'Where this element sits relative to another in the document order, as a bitmask.'),
      m('contains()', 'True when this element is the other one or an ancestor of it.'),
      m('contentEditable', 'Whether the element’s text can be edited. Setting it to "plaintext-only" blocks formatting.'),
      m('dir', 'The text direction, either "ltr", "rtl" or "auto".'),
      m('exitFullscreen()', 'Leaves fullscreen. Usually called on document instead, with document.exitFullscreen().'),
      m('firstChild', 'The first child node, which may be a text node. firstElementChild skips those.'),
      m('firstElementChild', 'The first child that is an element.'),
      m('focus()', 'Moves keyboard focus to the element, which is what makes it reachable by Tab.'),
      m('getAttribute()', 'The value of an attribute as a string, or null when it is not set. This is the readable form; the NamedNodeMap form only shows what the markup actually had.'),
      m('getAttributeNode()', 'The attribute as a node, or null. Use getAttribute for the value.'),
      m('getBoundingClientRect()', 'The element’s position and size relative to the viewport, as a DOMRect. This is the measurement you want for positioning and for scroll maths.'),
      m('getElementsByClassName()', 'Descendant elements carrying a class, as a live collection.'),
      m('getElementsByTagName()', 'Descendant elements of a tag name, as a live collection.'),
      m('hasAttribute()', 'True when the attribute is present, whatever its value. An empty value still counts as present.'),
      m('hasAttributes()', 'True when the element carries any attribute at all.'),
      m('hasChildNodes()', 'True when there is any child node, including whitespace text nodes.'),
      m('id', 'The id attribute as a property. The name says getElementById needs a string, so pass el.id.'),
      m('innerHTML', 'Gets or sets the parsed markup inside the element. Setting it re-parses, which destroys listeners on existing children and runs any script in the markup.'),
      m('innerText', 'The rendered text, which respects styling and collapses whitespace. Slower than textContent because it depends on layout, but it matches what the reader sees.'),
      m('insertAdjacentElement()', 'Inserts an element relative to this one, at a position such as "beforeend" or "afterbegin".'),
      m('insertAdjacentHTML()', 'Parses a string of markup and inserts it at a position relative to this element.', 'Still re-parses, so listeners on new content must be attached after insertion.'),
      m('insertAdjacentText()', 'Inserts a plain string at a position relative to this element, without parsing it as markup.'),
      m('insertBefore()', 'Inserts a node before an existing child. append() is usually simpler.'),
      m('isContentEditable', 'True when the element itself is editable, as opposed to inheriting contentEditable from an ancestor.'),
      m('isDefaultNamespace()', 'True when the element is in the default namespace, which is what tells you whether it is HTML or SVG or MathML.'),
      m('isEqualNode()', 'True when the two nodes have identical structure and attributes, whatever their identity.'),
      m('isSameNode()', 'True when it is literally the same node object.'),
      m('isSupported()', 'An old feature test for the DOM, long replaced by checking the property or method directly.', 'Deprecated. Test for the thing you need instead.'),
      m('lang', 'The language of the content, as a BCP 47 tag such as "en-GB".'),
      m('lastChild', 'The last child node, possibly a text node.'),
      m('lastElementChild', 'The last child that is an element.'),
      m('matches()', 'True when this element matches the selector. This is how a delegated handler checks what was clicked.'),
      m('namespaceURI', 'The namespace the element belongs to, which is what identifies an SVG element inside HTML.'),
      m('nextSibling', 'The next sibling node, possibly a text node.'),
      m('nextElementSibling', 'The next sibling that is an element.'),
      m('nodeName', 'The tag name in upper case for HTML, as it appears in the markup.'),
      m('nodeType', 'A number identifying the kind of node: 1 element, 3 text, 8 comment, 9 document. Comparing against Node.ELEMENT_NODE is clearer than the number.'),
      m('nodeValue', 'The text of a text or comment node, and null for an element.'),
      m('normalize()', 'Merges adjacent text nodes inside this element and drops the empty ones.'),
      m('offsetHeight', 'The height including borders and padding, rounded to a whole number. Useful for "is this taller than the viewport" checks.'),
      m('offsetWidth', 'The width including borders and padding, rounded to a whole number.'),
      m('offsetLeft', 'The distance to the offset parent’s left padding edge.'),
      m('offsetParent', 'The nearest positioned ancestor, which is the frame these offsets are measured against.'),
      m('offsetTop', 'The distance to the offset parent’s top padding edge.'),
      m('outerHTML', 'The markup of this element including the tag itself. Assigning to it replaces the element, and with it any listeners on it.'),
      m('outerText', 'The rendered text of the element and its descendants, without the markup.'),
      m('ownerDocument', 'The document this node belongs to, which is how you create a node in the right document inside an iframe.'),
      m('parentNode', 'The parent node, of any type.'),
      m('parentElement', 'The nearest parent that is an element, skipping the document and any shadow root.'),
      m('previousSibling', 'The previous sibling node, possibly a text node.'),
      m('previousElementSibling', 'The previous sibling that is an element.'),
      m('querySelector()', 'The first descendant matching a selector, or null.'),
      m('querySelectorAll()', 'Every descendant matching a selector, as a static NodeList.'),
      m('remove()', 'Takes the element out of the tree. It does not destroy it, so it can be put back, which is what makes filtering a list cheap.'),
      m('removeAttribute()', 'Removes an attribute entirely, rather than setting it to an empty string.'),
      m('removeAttributeNode()', 'Removes an attribute node, as opposed to the string form.'),
      m('removeChild()', 'Removes a child node and returns it. remove() is shorter and does not need the reference.'),
      m('removeEventListener()', 'Detaches a listener, using the same function reference that was attached.'),
      m('replaceChild()', 'Swaps one child node for another, returning the node that was replaced.'),
      m('requestFullscreen()', 'Asks for the element to go fullscreen. It needs a user gesture and can be refused.'),
      m('scrollHeight', 'The full height of the content, including the part hidden below the fold. Comparing it with clientHeight tells you whether the element scrolls.'),
      m('scrollIntoView()', 'Scrolls the page or container so the element is visible. The options control where it lands and whether it moves smoothly.'),
      m('scrollLeft', 'How far the content is scrolled horizontally, in pixels.'),
      m('scrollTop', 'How far the content is scrolled vertically, in pixels. Assigning to it scrolls, and reading it is how you work out whether the reader is at the bottom.'),
      m('scrollWidth', 'The full width of the content, including the part hidden to the right.'),
      m('setAttribute()', 'Sets an attribute, creating it if it was not there.'),
      m('setAttributeNode()', 'Attaches an attribute node.'),
      m('style', 'The inline style declaration, as a live object. Assigning to it overwrites every inline style, while assigning to one property leaves the others alone.'),
      m('tabIndex', 'Where the element sits in the tab order. Zero puts it in the natural order, -1 removes it while leaving it focusable by script.'),
      m('tagName', 'The tag name in upper case for HTML elements.'),
      m('textContent', 'Gets or sets the text, with no parsing and no markup. This is the safe choice for anything that came from a user.'),
      m('title', 'The title attribute, which drives the native tooltip. It is not the same as the alt text on an image.'),
    ],
  ),
]
