import { courseMeta } from '../../app/content/courses/meta'
import { projectSummaries } from '../../app/content/projects/meta'
import { frontendDeveloper } from '../../app/content/paths/frontend-developer'
import { challenges } from '../../app/content/challenges'
import { cssPropertyPages, propertySlug } from '../../app/content/reference/css-property-pages'
import { htmlTagPages, tagSlug } from '../../app/content/reference/html-tag-pages'
import { javascriptTopics } from '../../app/content/reference/javascript'

const staticRoutes = [
  '/',
  '/courses',
  '/paths',
  '/challenges',
  '/projects',
  '/reference',
  '/reference/html',
  '/reference/css',
  '/reference/javascript',
  '/playground',
  '/about',
  '/privacy',
  '/reference/html/alphabet',
  '/reference/html/attributes',
  '/reference/html/audio-video',
  '/reference/html/browser-support',
  '/reference/html/canvas',
  '/reference/html/category',
  '/reference/html/character-sets',
  '/reference/html/colors',
  '/reference/html/country-codes',
  '/reference/html/doctypes',
  '/reference/html/events',
  '/reference/html/global-attributes',
  '/reference/html/http-messages',
  '/reference/html/http-methods',
  '/reference/html/keyboard-shortcuts',
  '/reference/html/language-codes',
  '/reference/html/px-to-em',
  '/reference/html/url-encode',
  '/reference/css/animatable',
  '/reference/css/aural',
  '/reference/css/browser-support',
  '/reference/css/color-values',
  '/reference/css/colors',
  '/reference/css/default-values',
  '/reference/css/entities',
  '/reference/css/font-fallbacks',
  '/reference/css/functions',
  '/reference/css/px-to-em',
  '/reference/css/selectors',
  '/reference/css/units',
  '/reference/css/web-safe-fonts',
  '/reference/javascript/alphabet',
  '/reference/javascript/category',
]

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function urlEntry(siteUrl: string, path: string) {
  return `  <url><loc>${escapeXml(`${siteUrl}${path}`)}</loc></url>`
}

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = String(config.public.siteUrl).replace(/\/+$/, '')
  const paths = new Set(staticRoutes)

  for (const course of courseMeta) {
    paths.add(`/courses/${course.slug}`)
    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        paths.add(`/learn/${course.slug}/${lesson.id}`)
        paths.add(`/learn/${course.slug}/quiz/${lesson.quiz.id}`)
      }
    }
  }

  for (const step of frontendDeveloper.steps) {
    if (step.courseSlug) paths.add(`/courses/${step.courseSlug}`)
  }
  paths.add(`/paths/${frontendDeveloper.slug}`)

  for (const project of projectSummaries) paths.add(`/projects/${project.slug}`)
  for (const challenge of challenges) paths.add(`/challenges/${challenge.slug}`)

  for (const page of cssPropertyPages) {
    paths.add(`/reference/css/property/${propertySlug(page.property)}`)
  }
  for (const page of htmlTagPages) {
    paths.add(`/reference/html/tag/${tagSlug(page.tag)}`)
  }
  for (const topic of javascriptTopics) {
    paths.add(`/reference/javascript/topic/${topic.id}`)
  }

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...paths].sort().map((path) => urlEntry(siteUrl, path)),
    '</urlset>',
    '',
  ].join('\n')
})
