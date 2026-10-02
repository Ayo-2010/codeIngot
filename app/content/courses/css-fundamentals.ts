import type { Course, Section } from '~/types/content'
import { projectsForCourse } from '~/content/projects'
import { cssIntroSections } from './css/01-intro'
import { cssColorsSections } from './css/02-colors'
import { cssBorderMarginSections } from './css/borders-margins'
import { cssBoxSections } from './css/box-model'
import { cssOutlineSections } from './css/04-outline'
import { cssTextSection } from './css/05-text'
import { cssFontSections } from './css/08-fonts'
import { cssListLinkSections } from './css/09-lists-links'
import { cssTableDisplaySections } from './css/06-tables-display'
import { cssDisplayPositionSections } from './css/07-display-position'
import { cssFloatAlignSections } from './css/float-align'
import { cssSelectorStateSections } from './css/selectors-states'
import { cssWidgetSectionsA } from './css/widgets-a'
import { cssWidgetSectionsB } from './css/widgets-b'
import { cssCascadeSections } from './css/cascade'
import { cssAdvancedBoxSections } from './css/advanced-box'
import { cssGradientShadowSections } from './css/gradients-shadows'
import { cssTransformMotionSections } from './css/transforms-motion'
import { cssImageSections } from './css/images'
import { cssUiPartSections } from './css/ui-parts'
import { cssVariableMediaSections } from './css/variables-media'
import { cssFlexboxSections } from './css/flexbox'
import { cssResponsiveSections } from './css/responsive'
import { cssGridSections } from './css/grid'

/** Text is a single authored section rather than a one-element list. */
const textSection: Section = cssTextSection

export const cssFundamentals: Course = {
  id: 'course-css',
  slug: 'css-fundamentals',
  title: 'CSS Fundamentals',
  shortTitle: 'CSS',
  description:
    'Turn structure into design. You start from raw HTML and finish with a responsive layout built from custom properties, flexbox and grid.',
  technology: 'css',
  category: 'web',
  type: 'course',
  difficulty: 'beginner',
  badges: ['beginner'],
  topics: [
    'selectors',
    'colors',
    'typography',
    'box-model',
    'display',
    'position',
    'flexbox',
    'grid',
    'responsive',
    'cascade',
    'animations',
    'variables',
  ],
  icon: '{ }',
  sections: [
    ...cssIntroSections,
    ...cssColorsSections,
    ...cssBorderMarginSections,
    ...cssBoxSections,
    ...cssOutlineSections,
    textSection,
    ...cssFontSections,
    ...cssListLinkSections,
    ...cssTableDisplaySections,
    ...cssDisplayPositionSections,
    ...cssFloatAlignSections,
    ...cssSelectorStateSections,
    ...cssWidgetSectionsA,
    ...cssWidgetSectionsB,
    ...cssCascadeSections,
    ...cssAdvancedBoxSections,
    ...cssGradientShadowSections,
    ...cssTransformMotionSections,
    ...cssImageSections,
    ...cssUiPartSections,
    ...cssVariableMediaSections,
    ...cssFlexboxSections,
    ...cssResponsiveSections,
    ...cssGridSections,
  ],
  projects: projectsForCourse('css-fundamentals'),
}