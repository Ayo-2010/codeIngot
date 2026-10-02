import type { Project } from '~/types/content'

/**
 * Wrap a project's design reference in a standalone document. The reference is a
 * whole landing page, so it is rendered on its own route inside a full-height
 * iframe rather than squeezed into a 320px slot on the project page.
 *
 * The iframe that hosts it is sandboxed with `allow-scripts` and no
 * `allow-same-origin`, so an embedded map or widget can run while the document
 * stays in an opaque origin. That is safe here because the reference is our own
 * authored markup; the learner's own code is rendered in a fully locked frame by
 * `SandboxPreview` instead.
 */
export function designDocument(project: Pick<Project, 'designPreviewHtml' | 'designPreviewCss' | 'designPreviewJs'>): string {
  return [
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    '<style>',
    '*,*::before,*::after{box-sizing:border-box}',
    'html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}',
    'body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}',
    project.designPreviewCss,
    '</style></head><body>',
    project.designPreviewHtml,
    '<script>',
    REFERENCE_GUARD,
    // Wrapped so a preview script cannot leak names onto window. Without this,
    // `var status = document.querySelector('select')` silently binds the legacy
    // window.status string instead of the element, and the script dies at the
    // first listener with "addEventListener is not a function".
    '(function () {\n',
    project.designPreviewJs || '',
    '\n})();',
    '<' + '/script>',
    '</body></html>',
  ].join('')
}

/**
 * The reference is a picture of a finished page, not a page of its own, so a
 * stray click must never navigate the frame. Without this, `href="#plans"`
 * resolves against the host document and replaces the reference with the
 * project page. Same-document targets are honoured by scrolling instead.
 */
const REFERENCE_GUARD = `
document.addEventListener('click', function (event) {
  var link = event.target.closest && event.target.closest('a[href]');
  if (!link) return;
  var href = link.getAttribute('href') || '';
  event.preventDefault();
  if (href.charAt(0) !== '#' || href.length < 2) return;
  var target = document.getElementById(href.slice(1));
  if (target) target.scrollIntoView({ block: 'start' });
});
`

/** The same reference, clipped to a small thumbnail for cards and previews. */
export function designThumbnailDocument(
  project: Pick<Project, 'designPreviewHtml' | 'designPreviewCss'>,
): string {
  return [
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" />',
    '<style>',
    '*,*::before,*::after{box-sizing:border-box}',
    'body{margin:0;height:100vh;overflow:hidden;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}',
    project.designPreviewCss,
    '</style></head><body>',
    project.designPreviewHtml,
    '</body></html>',
  ].join('')
}
