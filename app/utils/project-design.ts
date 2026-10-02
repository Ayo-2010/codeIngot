import type { Project } from '~/types/content'

/**
 * Wrap a project's design reference in a standalone document. The reference is a
 * whole landing page, so it is rendered on its own route inside a full-height
 * iframe rather than squeezed into a 320px slot on the project page.
 */
export function designDocument(project: Pick<Project, 'designPreviewHtml' | 'designPreviewCss'>): string {
  return [
    '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1" />',
    '<style>',
    '*,*::before,*::after{box-sizing:border-box}',
    'html{-webkit-text-size-adjust:100%}',
    'body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}',
    project.designPreviewCss,
    '</style></head><body>',
    project.designPreviewHtml,
    '</body></html>',
  ].join('')
}

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
