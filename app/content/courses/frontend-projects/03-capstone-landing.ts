import type { Section } from '~/types/content'

export const frontendProjectsLandingSections: Section[] = [
  {
    id: 'fp-s5',
    title: 'Capstone: Responsive Landing Page',
    description:
      'A product page that starts narrow, adds a grid and exactly one breakpoint, and keeps its focus states and motion in check.',
    lessons: [
      {
        id: 'fp-l9',
        title: 'Plan the landing page',
        description: 'Turning a product brief into sections, a mobile-first rule, and one breakpoint that earns its place.',
        duration: 6,
        objectives: [
          'Break a landing page into sections and reusable components',
          'Write the single-column layout before any media query',
          'Decide what the 720px breakpoint actually changes',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-fp-l9',
          title: 'Plan the landing page quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l9-q1',
              type: 'blank',
              prompt: 'The CSS at-rule used to apply styles at a viewport width is ___.',
              answers: [
                '@media',
                'media',
              ],
              explanation: '@media wraps rules that only apply when the condition, such as min-width, matches.',
            },
            {
              id: 'quiz-fp-l9-q2',
              type: 'multiple-choice',
              prompt: 'Why should the navigation link to `#features`, `#pricing` and `#start` instead of `href="#"`?',
              options: [
                'Hash links make the page load faster',
                '`href="#"` is invalid HTML',
                'It stops the CSS grid from collapsing',
                'Real section ids make the navigation usable before any JavaScript exists',
              ],
              answer: 3,
              explanation: 'Linking to ids that exist turns the navigation into working in-page anchors with no script. `href="#"` scrolls to nowhere and gives no destination to anyone using a keyboard or a screen reader.',
            },
            {
              id: 'quiz-fp-l9-q3',
              type: 'multiple-choice',
              prompt: 'What should the base stylesheet describe before any media query is written?',
              options: [
                'The single-column narrow layout',
                'The desktop three-column layout',
                'A layout chosen by JavaScript after load',
                'The print layout only',
              ],
              answer: 0,
              explanation: 'The unqualified rules are what a phone receives, so they must be the complete narrow design. The media query then adds columns and spacing for wider screens instead of undoing a desktop layout.',
            },
            {
              id: 'quiz-fp-l9-q4',
              type: 'multiple-choice',
              prompt: 'At the 720px breakpoint, what does the landing page lesson change?',
              options: [
                'The colours and fonts',
                'Every rule, rewritten for desktop',
                'The HTML structure',
                'Only the grid column counts for features and pricing',
              ],
              answer: 3,
              explanation: 'Keeping the breakpoint to column changes makes the wide layout easy to reason about, because everything else already works. A breakpoint that rewrites unrelated rules is a sign the base layout was wrong.',
            },
            {
              id: 'quiz-fp-l9-q5',
              type: 'multiple-choice',
              prompt: 'At the default root font size, 45rem equals which width?',
              options: [
                '450px',
                '720px',
                '4500px',
                '768px',
              ],
              answer: 1,
              explanation: 'One rem is the root font size, normally 16px, so 45 × 16 = 720px. Using rem means the breakpoint follows the reader who has enlarged their default text size.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l9-intro',
            body: '**Responsive design is not "make it fit".** A page can shrink to a phone and still be a bad phone page: tiny tap targets, a hero that eats the whole screen, text that runs edge to edge. The capstone is a chance to decide what changes at each width before you write the CSS that changes it.',
          },
          {
            type: 'text',
            id: 'fp-l9-b2',
            body: 'The brief is a product page with a hero, three features, two prices and a closing call to action. The design reference shows how it should feel at desktop width. Your job is to make the narrow version the starting point, not an afterthought squeezed out of the wide one.',
          },
          {
            type: 'heading',
            id: 'fp-l9-h1',
            level: 3,
            body: 'The inventory',
          },
          {
            type: 'list',
            id: 'fp-l9-list1',
            style: 'bullet',
            items: [
              '**Header** — a logo link and an in-page navigation list.',
              '**Hero** — an eyebrow, one heading, one supporting sentence and a primary button.',
              '**Features** — at least three cards, each with a heading and a short explanation.',
              '**Pricing** — at least two plans, each with a name, price and a short list of what is included.',
              '**Closing call to action** — one more invitation to start.',
              '**Footer** — a copyright line and the same navigation links.',
            ],
          },
          {
            type: 'text',
            id: 'fp-l9-b3',
            body: 'Give the sections ids as you plan them: `#features`, `#pricing` and `#start`. The navigation can then link to real places instead of using `href="#"`, and the page becomes usable before any JavaScript exists — which is the only script this page needs.',
          },
          {
            type: 'heading',
            id: 'fp-l9-h2',
            level: 3,
            body: 'What the checklist will ask for',
          },
          {
            type: 'list',
            id: 'fp-l9-list2',
            style: 'ordered',
            items: [
              'A header, navigation, main, at least three sections and a footer.',
              'Feature cards and pricing plans laid out with CSS grid.',
              'At least one media query that changes the layout at 720px.',
              'A `max-width` container so the text does not run edge to edge on a wide screen.',
              'A visible `:focus-visible` style for links and buttons.',
              'No horizontal scrolling at 360px or 1440px.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l9-h3',
            level: 3,
            body: 'Mobile first, then one breakpoint',
          },
          {
            type: 'text',
            id: 'fp-l9-b4',
            body: 'Write the single-column layout with no media query at all. Stack the hero, the features and the plans. Let the content determine the height. Then add one `@media (min-width: 45rem)` block — 45rem is 720px at the default root size — and change only what the wider screen needs: columns, alignment and spacing.',
          },
          {
            type: 'code',
            id: 'fp-l9-code1',
            language: 'css',
            title: 'The shape of a mobile-first stylesheet',
            code: `/* Base: the narrow layout, no query needed. */
.features {
  display: grid;
  gap: 1rem;
}

/* The one breakpoint the design needs. */
@media (min-width: 45rem) {
  .features {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
          },
          {
            type: 'text',
            id: 'fp-l9-b5',
            body: 'Do not write a desktop layout and then undo it in `max-width` queries. That approach makes every later change start from the most crowded version. Starting narrow means the base styles are the ones most people will actually see on a phone, and the breakpoint is a small, readable addition.',
          },
          {
            type: 'warning',
            id: 'fp-l9-warn',
            title: 'A breakpoint is not a device',
            body: 'There is no list of widths you must hit. The 720px breakpoint exists because that is where three feature cards stop being readable side by side. Pick the width where the content breaks, not the width of a particular phone, and write down what changes there.',
          },
          {
            type: 'tip',
            id: 'fp-l9-tip',
            title: 'Plan the narrow page in words',
            body: 'Before CSS, describe the phone layout in one sentence per section: "the hero is one column, the image sits below the text, the three features stack, the two prices stack." If you cannot describe it, you are not ready to style it.',
          },
          {
            type: 'heading',
            id: 'fp-l9-h4',
            level: 3,
            body: 'Your checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l9-b6',
            body: 'Open the workspace and read the eight checks before writing the page. Plan the section ids and the single-column order first, then build the content. The next lesson adds the grid, the breakpoint and the focus states.',
          },
          {
            type: 'project',
            id: 'fp-l9-project',
            projectSlug: 'responsive-landing-page',
            title: 'Start the landing page',
            body: 'The workspace includes the brief, a design reference and a starter with the header and footer already in place. Fill the main region before you add a single media query.',
          },
        ],
      },
      {
        id: 'fp-l10',
        title: 'Build and submit the landing page',
        description: 'Writing the narrow layout, adding the grid and breakpoint, and proving nothing overflows.',
        duration: 8,
        objectives: [
          'Build a single-column layout that needs no media query',
          'Add a grid and one 720px breakpoint without breaking the narrow view',
          'Check overflow, focus states and reduced motion before submitting',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-fp-l10',
          title: 'Build and submit the landing page quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l10-q1',
              type: 'multiple-choice',
              prompt: 'What does mobile-first mean in practice?',
              options: [
                'The base styles describe the narrow layout, and wider layouts are added with min-width queries',
                'The page is designed at 1440px and then shrunk with max-width queries',
                'The page hides content on phones',
                'JavaScript chooses the layout after the page loads',
              ],
              answer: 0,
              explanation: 'The unqualified rules are the narrow layout. Add a min-width breakpoint only when the content needs more room.',
            },
            {
              id: 'quiz-fp-l10-q2',
              type: 'true-false',
              prompt: 'A responsive page needs a breakpoint for every popular phone size.',
              answer: false,
              explanation: 'Breakpoints belong where the content breaks, not where a particular device happens to sit. One well-chosen breakpoint is often enough.',
            },
            {
              id: 'quiz-fp-l10-q3',
              type: 'multiple-choice',
              prompt: 'Why wrap the content in a max-width container?',
              options: [
                'To stop images from loading',
                'To keep line length readable on very wide screens',
                'To replace CSS grid',
                'To make the page scroll horizontally',
              ],
              answer: 1,
              explanation: 'A maximum width keeps text lines from becoming too long to read comfortably while still allowing the layout to shrink on small screens.',
            },
            {
              id: 'quiz-fp-l10-q4',
              type: 'identify-error',
              prompt: 'Why does this hero overflow on a phone?',
              code: '.hero {\n  height: 600px;\n  padding: 4rem 2rem;\n}\n.hero img {\n  width: 1200px;\n}',
              options: [
                'Grid is missing',
                'The fixed height and 1200px image cannot shrink to the viewport',
                'The padding uses rem instead of px',
                'The hero needs a media query inside the image',
              ],
              answer: 1,
              explanation: 'A fixed image width wider than the viewport causes horizontal overflow, and a fixed height cannot accommodate wrapped content. Use max-width: 100% and let the height follow the content.',
            },
            {
              id: 'quiz-fp-l10-q5',
              type: 'multiple-choice',
              prompt: 'What does `width: min(100% - 2.5rem, 72rem)` do for the container?',
              options: [
                'Always uses 72rem, even on a phone',
                'Uses the larger of the two values',
                'Switches to 100% only below 720px',
                'Uses the smaller of the available width minus margins and 72rem',
              ],
              answer: 3,
              explanation: 'min() picks the tighter value, so the container shrinks on a narrow screen and stops growing at 72rem. One declaration handles both cases without a media query.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l10-intro',
            body: '**Build the page at 360px first.** If it works there, every wider screen is an enhancement. If you build it at 1440px first, the narrow version becomes a sequence of patches, and patches are where horizontal scrolling and tiny tap targets come from.',
          },
          {
            type: 'heading',
            id: 'fp-l10-h1',
            level: 3,
            body: 'Milestone 1: a container that behaves',
          },
          {
            type: 'text',
            id: 'fp-l10-b2',
            body: 'One container rule keeps the content away from the edges on a phone and stops lines from becoming unreadably long on a desktop. `min()` chooses the smaller of the available width and the maximum, so it works at every viewport without a media query.',
          },
          {
            type: 'code',
            id: 'fp-l10-code1',
            language: 'css',
            title: 'A container for every width',
            code: `.container {
  width: min(100% - 2.5rem, 72rem);
  margin-inline: auto;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}`,
          },
          {
            type: 'text',
            id: 'fp-l10-b3',
            body: '`max-width: 100%` on images is the single most useful responsive rule. An image with a larger intrinsic width than its column will overflow without it. The `height: auto` keeps the aspect ratio while the width changes.',
          },
          {
            type: 'heading',
            id: 'fp-l10-h2',
            level: 3,
            body: 'Milestone 2: the grid and the one breakpoint',
          },
          {
            type: 'text',
            id: 'fp-l10-b4',
            body: 'The narrow layout is a single column. At 720px, the feature cards become three columns and the pricing plans become two. Both are grid containers; the breakpoint only changes `grid-template-columns`. Everything else stays put, which is what makes the change easy to reason about.',
          },
          {
            type: 'code',
            id: 'fp-l10-code2',
            language: 'css',
            title: 'Grid first, columns at the breakpoint',
            code: `.features,
.pricing {
  display: grid;
  gap: 1rem;
}

@media (min-width: 45rem) {
  .features {
    grid-template-columns: repeat(3, 1fr);
  }

  .pricing {
    grid-template-columns: repeat(2, 1fr);
  }
}`,
          },
          {
            type: 'list',
            id: 'fp-l10-list1',
            style: 'ordered',
            items: [
              'Write the header, hero, features, pricing and closing section as content.',
              'Add the container, the type scale and the vertical spacing at narrow width.',
              'Add `display: grid` to the features and pricing areas.',
              'Add the 720px media query and only the column changes.',
              'Add focus styles for links and buttons, and a reduced-motion guard if you animate.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l10-h3',
            level: 3,
            body: 'Milestone 3: focus and motion',
          },
          {
            type: 'code',
            id: 'fp-l10-code3',
            language: 'css',
            title: 'Visible focus, optional motion',
            code: `a:focus-visible,
button:focus-visible {
  outline: 3px solid #0f766e;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
          },
          {
            type: 'text',
            id: 'fp-l10-b5',
            body: 'The focus ring is not optional. Removing it because it looks untidy makes every link and button unusable for someone who tabs. The reduced-motion block is a guard for the transitions you add, not an excuse to add more of them.',
          },
          {
            type: 'warning',
            id: 'fp-l10-warn',
            title: 'Fixed heights are where responsive pages break',
            body: 'A hero with `height: 600px` is a promise the content cannot keep when the heading wraps to five lines on a phone. Use `min-height` if a section needs a floor, and let the content decide the rest. The same applies to cards: a fixed height clips long text at narrow widths.',
          },
          {
            type: 'tip',
            id: 'fp-l10-tip',
            title: 'Measure the overflow instead of guessing',
            body: 'In the browser console, `document.documentElement.scrollWidth <= window.innerWidth` is a quick overflow check. Resize to 360px and 1440px and run it at both. If it is false, something is wider than the viewport — usually an image, a long word or a fixed width.',
          },
          {
            type: 'heading',
            id: 'fp-l10-h4',
            level: 3,
            body: 'Submit this build',
          },
          {
            type: 'text',
            id: 'fp-l10-b6',
            body: 'Open the workspace and work through the five milestones. The automated checks look for the grid, the media query, the focus rule and the maximum width; the manual check is the one that matters most: no horizontal scrolling at 360px or 1440px.',
          },
          {
            type: 'project',
            id: 'fp-l10-project',
            projectSlug: 'responsive-landing-page',
            title: 'Submit the landing page',
            body: 'Resize the preview to 360px, 720px and 1440px. Run the checklist, then submit only when nothing overflows and every link and button shows a focus ring.',
          },
        ],
      },
    ],
  },
]
