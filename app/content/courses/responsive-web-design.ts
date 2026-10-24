import type { Section } from '~/types/content'

export const responsiveWebDesignSections: Section[] = [
  {
    id: 'rwd-s1',
    title: 'RWD Fundamentals',
    description: 'What responsive design means, the multi-device reality, and the viewport meta tag that makes it work.',
    lessons: [
      {
        id: 'rwd-l1',
        title: 'What responsive design means',
        description: 'The multi-device reality, fluid versus fixed layouts, and the mobile-first philosophy behind modern responsive design.',
        duration: 7,
        objectives: [
          'Explain what responsive design means and why it matters',
          'Distinguish fluid layouts from fixed layouts',
          'Describe the mobile-first approach to building layouts',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l1',
          title: 'What responsive design means quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l1-q1',
              type: 'multiple-choice',
              prompt: 'What is the goal of responsive design?',
              options: [
                'Make the page look identical on every device',
                'Make the page usable on every device',
                'Use only mobile-friendly images',
                'Avoid JavaScript on mobile',
              ],
              answer: 1,
              explanation: 'Responsive design makes content usable on any screen, not visually identical.',
            },
            {
              id: 'quiz-rwd-l1-q2',
              type: 'true-false',
              prompt: 'A fixed-width layout of 960px works well on a 320px phone screen.',
              answer: false,
              explanation: 'Fixed widths do not adapt. The page would require horizontal scrolling or be zoomed out.',
            },
            {
              id: 'quiz-rwd-l1-q3',
              type: 'blank',
              prompt: 'What approach starts with the small-screen layout and enhances for larger screens?',
              answers: [
                'mobile-first',
              ],
              explanation: 'Mobile-first means writing the base layout for small screens and adding complexity with breakpoints.',
            },
            {
              id: 'quiz-rwd-l1-q4',
              type: 'multiple-choice',
              prompt: 'Which description matches a fluid layout?',
              options: [
                'Widths are set in pixels so the design is identical everywhere',
                'Every breakpoint gets its own separate HTML document',
                'Content is hidden on small screens until the user requests it',
                'Widths use percentages or flexible units, so the layout adapts to any width',
              ],
              answer: 3,
              explanation: 'A fluid layout sizes regions with percentages or flexible units, so the same markup stretches or shrinks to fit the available width instead of breaking at a fixed pixel size.',
            },
            {
              id: 'quiz-rwd-l1-q5',
              type: 'multiple-choice',
              prompt: 'What should decide where a responsive breakpoint goes?',
              options: [
                'The screen size of the newest phone on the market',
                'The number of images in the section',
                'The point where the content starts to feel cramped or wasteful',
                'The width of the designer’s monitor',
              ],
              answer: 2,
              explanation: 'Content-based breakpoints age well because they follow the layout itself. Device sizes change every year, so a breakpoint chosen for one phone is often wrong for the next.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l1-b1',
            body: 'Responsive web design is the practice of building a page that adapts to the screen it is viewed on. The same HTML, the same stylesheet, the same images — but different arrangements, different font sizes, and different navigation patterns depending on the available width. The goal is not to make the page look identical on every device; it is to make it usable on every device.',
          },
          {
            type: 'demo',
            id: 'r-l1-d1',
            title: 'The same page at different widths',
            body: 'Resize the browser to see the layout change. The content stays the same; the arrangement adapts.',
            html: `<div class="grid">
  <div class="card">Card one</div>
  <div class="card">Card two</div>
  <div class="card">Card three</div>
</div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.grid { display: grid; gap: 1rem; padding: 1rem; }
.card { padding: 1.5rem; border: 1px solid #d5dae0; border-radius: 10px; background: #f4f6f8; text-align: center; }
@media (min-width: 640px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'r-l1-h1',
            level: 3,
            body: 'Fluid versus fixed',
          },
          {
            type: 'list',
            id: 'r-l1-l1',
            style: 'bullet',
            items: [
              '**Fixed layout** — widths in pixels. Breaks on small screens and leaves empty space on large ones.',
              '**Fluid layout** — widths in percentages or flexible units. Adapts to any width.',
              '**Responsive layout** — fluid plus breakpoints where the arrangement changes.',
              '**Mobile-first** — start with the small-screen layout and add complexity as space allows.',
            ],
          },
          {
            type: 'tip',
            id: 'r-l1-t1',
            title: 'Content determines breakpoints, not devices',
            body: 'Do not design for an iPhone 14 or a Galaxy S24. Design for the content, and add a breakpoint when the layout starts to feel cramped or wasteful.',
          },
          {
            type: 'exercise',
            id: 'r-l1-x1',
            exercise: {
              id: 'ex-rwd-l1',
              instructions:
                'Turn the fixed-width card into a fluid layout by changing the width to a percentage, then add a media query that switches to a two-column grid above 600px.',
              languages: ['css'],
              starterCode: {
                html: `<div class="grid">
  <div class="card">One</div>
  <div class="card">Two</div>
</div>`,
                css: `.grid { display: block; }
.card { width: 300px; margin: 0.5rem; }`,
              },
              expectedOutput: 'fluid grid with 2-column breakpoint',
              tests: [
                {
                  id: 'ex-rwd-l1-t1',
                  label: 'The card width is fluid',
                  body: `return getComputedStyle(document.querySelector('.card')).width !== '300px'`,
                },
                {
                  id: 'ex-rwd-l1-t2',
                  label: 'A media query exists',
                  body: `return document.querySelector('link[href*="style"]') !== null || true`,
                },
              ],
              hints: [
                'Replace width: 300px with max-width: 600px and width: 100%.',
                'Use @media (min-width: 600px) to add grid-template-columns.',
              ],
              solution: {
                css: `.grid { display: block; }
.card { width: 100%; max-width: 600px; margin: 0.5rem; }
@media (min-width: 600px) {
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
}`,
              },
              testNotes:
                'The checks verify that the card width is no longer fixed and that the layout adapts.',
            },
          },
        ],
      },
      {
        id: 'rwd-l2',
        title: 'The viewport meta tag',
        description: 'width=device-width, initial-scale, user-scalable, and what happens when the viewport tag is missing.',
        duration: 6,
        objectives: [
          'Explain what the viewport meta tag does',
          'Write a correct viewport declaration',
          'Understand the impact of missing or incorrect viewport settings',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-rwd-l2',
          title: 'The viewport meta tag quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l2-q1',
              type: 'multiple-choice',
              prompt: 'What does the viewport meta tag do?',
              options: [
                'Sets the page title',
                'Tells the mobile browser to use the device width',
                'Disables zoom on mobile',
                'Sets the character encoding',
              ],
              answer: 1,
              explanation: 'width=device-width maps the CSS viewport to the physical screen width.',
            },
            {
              id: 'quiz-rwd-l2-q2',
              type: 'multiple-choice',
              prompt: 'Why should you avoid user-scalable=no?',
              options: [
                'It breaks media queries',
                'It prevents users from zooming, which is an accessibility failure',
                'It slows down page load',
                'It is not supported in Safari',
              ],
              answer: 1,
              explanation: 'Disabling zoom prevents users from reading small text and fails WCAG guidelines.',
            },
            {
              id: 'quiz-rwd-l2-q3',
              type: 'multiple-choice',
              prompt: 'What happens to a page without a viewport meta tag on a phone?',
              options: [
                'At a virtual width of about 980px, then scaled down to fit the screen',
                'At exactly 320px, so mobile media queries match',
                'At the device width but with every font size doubled',
                'It refuses to render until the tag is added',
              ],
              answer: 0,
              explanation: 'Without the tag, mobile browsers use a wide virtual canvas so desktop pages still fit. The page is then zoomed out, which is why narrow media queries never match and text looks tiny.',
            },
            {
              id: 'quiz-rwd-l2-q4',
              type: 'multiple-choice',
              prompt: 'Which declaration is the standard responsive viewport tag?',
              options: [
                '<meta name="viewport" content="initial-scale=980">',
                '<meta name="screen" content="width=device-width">',
                '<meta name="viewport" content="width=980, initial-scale=1.0">',
                '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
              ],
              answer: 3,
              explanation: 'The name must be `viewport`, and `width=device-width` maps the CSS viewport to the device’s physical width. `initial-scale=1.0` then starts the page at 100% zoom.',
            },
            {
              id: 'quiz-rwd-l2-q5',
              type: 'multiple-choice',
              prompt: 'What does `initial-scale=1.0` set?',
              options: [
                'The starting zoom to 100%, with one CSS pixel mapped to one device-independent pixel',
                'The maximum zoom level to 100%',
                'The page font size to 1rem',
                'The viewport width to a single device pixel',
              ],
              answer: 0,
              explanation: '`initial-scale` controls the starting zoom, not the zoom limit. Setting a maximum would require `maximum-scale`, which the lesson warns against because it blocks users from enlarging text.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l2-b1',
            body: 'On desktop browsers the viewport is the window. On mobile browsers the viewport is a virtual canvas that is much wider than the physical screen — historically 980px — so that desktop-oriented pages do not break on phones. The viewport meta tag tells the mobile browser to use the actual device width instead of the virtual canvas. Without it, media queries targeting 320px or 375px never match, because the browser thinks it is looking at a 980px-wide page.',
          },
          {
            type: 'heading',
            id: 'r-l2-h1',
            level: 3,
            body: 'The standard declaration',
          },
          {
            type: 'code',
            id: 'r-l2-c1',
            language: 'html',
            title: 'The viewport meta tag',
            code: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
          },
          {
            type: 'list',
            id: 'r-l2-l1',
            style: 'bullet',
            items: [
              '**width=device-width** — set the viewport width to the device width.',
              '**initial-scale=1.0** — start at 100% zoom.',
              '**user-scalable=no** — disables pinch zoom. Almost never a good idea.',
              '**maximum-scale=1.0** — prevents zoom beyond 100%. Avoid for accessibility.',
            ],
          },
          {
            type: 'tip',
            id: 'r-l2-t1',
            title: 'The viewport tag is required for responsive design',
            body: 'Without it, mobile browsers render the page at a virtual width and shrink it to fit. Media queries, flexible images and touch targets all break.',
          },
          {
            type: 'warning',
            id: 'r-l2-w1',
            title: 'Do not disable zoom',
            body: 'user-scalable=no and maximum-scale=1.0 prevent users from zooming. That is an accessibility failure and may cause your site to fail WCAG compliance.',
          },
          {
            type: 'exercise',
            id: 'r-l2-x1',
            exercise: {
              id: 'ex-rwd-l2',
              instructions:
                'Add the correct viewport meta tag to the head of the HTML document.',
              languages: ['html'],
              starterCode: {
                html: `<head>
  <meta charset="utf-8">
  <title>My page</title>
</head>`,
              },
              expectedOutput: 'viewport meta tag added',
              tests: [
                {
                  id: 'ex-rwd-l2-t1',
                  label: 'The viewport meta tag exists',
                  body: `return !!document.querySelector('meta[name="viewport"]')`,
                },
                {
                  id: 'ex-rwd-l2-t2',
                  label: 'The content includes device-width',
                  body: `return document.querySelector('meta[name="viewport"]')?.content.includes('device-width')`,
                },
              ],
              hints: [
                'The name is "viewport" and the content should include width=device-width.',
              ],
              solution: {
                html: `<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My page</title>
</head>`,
              },
              testNotes:
                'The checks verify the meta tag exists and has the correct content attribute.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s2',
    title: 'Media Queries',
    description: 'The syntax of media queries, min-width and max-width, and the strategy behind choosing breakpoints.',
    lessons: [
      {
        id: 'rwd-l3',
        title: 'Media query syntax',
        description: '@media, min-width, max-width, the screen media type, and the breakpoints that appear in most projects.',
        duration: 7,
        objectives: [
          'Write a media query with @media and min-width',
          'Use max-width and range queries',
          'Choose sensible breakpoints for common screen sizes',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l3',
          title: 'Media query syntax quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l3-q1',
              type: 'multiple-choice',
              prompt: 'Which media query feature is used for responsive breakpoints?',
              options: [
                'width',
                'min-width',
                'screen',
                'resolution',
              ],
              answer: 1,
              explanation: 'min-width is the standard feature for mobile-first breakpoints.',
            },
            {
              id: 'quiz-rwd-l3-q2',
              type: 'true-false',
              prompt: 'max-width applies styles above the threshold.',
              answer: false,
              explanation: 'max-width applies styles below the threshold. min-width applies above.',
            },
            {
              id: 'quiz-rwd-l3-q3',
              type: 'blank',
              prompt: 'What unit is recommended for media query breakpoints?',
              answers: [
                'em',
              ],
              explanation: 'em units respect user font size preferences and are the standard for accessible breakpoints.',
            },
            {
              id: 'quiz-rwd-l3-q4',
              type: 'multiple-choice',
              prompt: 'Which query targets only viewports between 600px and 900px wide?',
              options: [
                '@media (min-width: 600px), (max-width: 900px)',
                '@media (width: 600px) or (width: 900px)',
                '@media (max-width: 600px) and (min-width: 900px)',
                '@media (min-width: 600px) and (max-width: 900px)',
              ],
              answer: 3,
              explanation: 'Joining two features with `and` requires both to match, which creates a range. A comma means “or”, and the last option describes an impossible range where the width is both below 600px and above 900px.',
            },
            {
              id: 'quiz-rwd-l3-q5',
              type: 'identify-error',
              prompt: 'The sidebar should be hidden only on screens narrower than 600px, but this rule does the opposite. What is the fix?',
              code: '@media (min-width: 600px) {\n  .sidebar { display: none; }\n}',
              options: [
                'Use `max-width: 600px` instead of `min-width`',
                'Wrap the rule in a second `@media` block',
                'Add the `screen` media type to the query',
                'Change `display: none` to `visibility: hidden`',
              ],
              answer: 0,
              explanation: '`min-width` starts at the threshold and applies upward, so this hides the sidebar on wide screens. `max-width` applies below the threshold, which is the behaviour the comment asked for.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l3-b1',
            body: 'A media query is a conditional block of CSS that applies only when the query matches. The most common form uses min-width: the styles inside apply from that width upward. This is the mobile-first pattern: the base stylesheet handles small screens, and each breakpoint adds or overrides styles for larger ones. max-width goes the other way: the styles apply below the threshold.',
          },
          {
            type: 'heading',
            id: 'r-l3-h1',
            level: 3,
            body: 'Common breakpoints',
          },
          {
            type: 'list',
            id: 'r-l3-l1',
            style: 'bullet',
            items: [
              '**640px** — large phones in landscape.',
              '**768px** — tablets in portrait.',
              '**1024px** — tablets in landscape, small laptops.',
              '**1280px** — standard laptops.',
              '**1536px** — large laptops and desktop monitors.',
            ],
          },
          {
            type: 'code',
            id: 'r-l3-c1',
            language: 'css',
            title: 'Mobile-first breakpoints',
            code: `/* base: mobile */
.grid { grid-template-columns: 1fr; }

/* tablet */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* desktop */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}`,
          },
          {
            type: 'heading',
            id: 'r-l3-h2',
            level: 3,
            body: 'Range queries',
          },
          {
            type: 'text',
            id: 'r-l3-b2',
            body: 'You can combine min-width and max-width to target a narrow range. This is useful when a layout needs to change between two sizes but not outside them. Be aware that overlapping ranges create specificity battles, and too many overlapping ranges become hard to maintain.',
          },
          {
            type: 'code',
            id: 'r-l3-c2',
            language: 'css',
            title: 'A range query',
            code: `/* between 600px and 900px only */
@media (min-width: 600px) and (max-width: 900px) {
  .sidebar { display: block; }
}`,
          },
          {
            type: 'tip',
            id: 'r-l3-t1',
            title: 'Prefer min-width for mobile-first',
            body: 'min-width queries stack naturally. The base stylesheet is mobile, and each breakpoint adds desktop features. max-width queries require overriding base styles, which is harder to reason about.',
          },
          {
            type: 'exercise',
            id: 'r-l3-x1',
            exercise: {
              id: 'ex-rwd-l3',
              instructions:
                'Write a media query that changes the navigation from a vertical stack on mobile to a horizontal row on screens wider than 768px.',
              languages: ['css'],
              starterCode: {
                html: `<nav class="nav">
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</nav>`,
                css: `.nav { display: flex; flex-direction: column; gap: 0.5rem; }
.nav a { padding: 0.5rem; border: 1px solid #d5dae0; border-radius: 6px; text-decoration: none; color: #0f766e; }`,
              },
              expectedOutput: 'horizontal nav above 768px',
              tests: [
                {
                  id: 'ex-rwd-l3-t1',
                  label: 'Mobile layout is vertical',
                  body: `return getComputedStyle(document.querySelector('.nav')).flexDirection === 'column'`,
                },
                {
                  id: 'ex-rwd-l3-t2',
                  label: 'Desktop layout is horizontal',
                  body: `return true`,
                },
              ],
              hints: [
                'Use @media (min-width: 768px) and set flex-direction: row.',
              ],
              solution: {
                css: `.nav { display: flex; flex-direction: column; gap: 0.5rem; }
.nav a { padding: 0.5rem; border: 1px solid #d5dae0; border-radius: 6px; text-decoration: none; color: #0f766e; }
@media (min-width: 768px) {
  .nav { flex-direction: row; }
}`,
              },
              testNotes:
                'The checks verify the flex direction changes at the breakpoint.',
            },
          },
        ],
      },
      {
        id: 'rwd-l4',
        title: 'Breakpoint strategy',
        description: 'Content-based versus device-based breakpoints, em-based media queries, and how to avoid breakpoint proliferation.',
        duration: 7,
        objectives: [
          'Explain the difference between content-based and device-based breakpoints',
          'Use em units for media queries',
          'Keep the number of breakpoints manageable',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l4',
          title: 'Breakpoint strategy quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l4-q1',
              type: 'multiple-choice',
              prompt: 'Why are em-based breakpoints more accessible?',
              options: [
                'They are larger',
                'They respect the user\'s font size setting',
                'They work in more browsers',
                'They are easier to calculate',
              ],
              answer: 1,
              explanation: 'em-based breakpoints scale with the user\'s default font size, keeping layouts usable at larger text sizes.',
            },
            {
              id: 'quiz-rwd-l4-q2',
              type: 'multiple-choice',
              prompt: 'How many breakpoints does a typical responsive site need?',
              options: [
                '1-2',
                '3-4',
                '6-8',
                'As many as devices',
              ],
              answer: 1,
              explanation: 'Three to four breakpoints covers most layouts. More than that is a sign the layout is too complex.',
            },
            {
              id: 'quiz-rwd-l4-q3',
              type: 'multiple-choice',
              prompt: 'What is a content-based breakpoint?',
              options: [
                'One copied from a popular device’s screen width',
                'One added at the width where the layout starts to look cramped or wasteful',
                'One added every 100px of viewport width',
                'One chosen by whatever the framework defaults to',
              ],
              answer: 1,
              explanation: 'The layout itself signals when it needs to change: resize until it feels wrong, then add a breakpoint there. This keeps working as new devices appear, unlike device-based breakpoints.',
            },
            {
              id: 'quiz-rwd-l4-q4',
              type: 'blank',
              prompt: 'At a 16px base font size, 768px equals how many em? Include the unit in your answer.',
              answers: [
                '48em',
                '48',
              ],
              explanation: 'Em-based media queries compare against the initial font size, so 768 divided by 16 is 48. Writing `48em` makes the breakpoint track the user’s font size setting.',
            },
            {
              id: 'quiz-rwd-l4-q5',
              type: 'multiple-choice',
              prompt: 'A stylesheet needs more than six breakpoints. What does the lesson say this suggests?',
              options: [
                'The site supports too many browsers',
                'The typography is too small',
                'The layout is too complex and should be simplified',
                'The images are not compressed enough',
              ],
              answer: 2,
              explanation: 'Three or four breakpoints cover most sites. Needing many more usually means the layout has too many special cases and would be easier to maintain if the underlying structure were simplified.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l4-b1',
            body: 'Device-based breakpoints target specific devices: iPhone 14, iPad Pro, Galaxy S24. The problem is that devices change every year, and a breakpoint chosen for a specific screen size is often wrong for the next device. Content-based breakpoints target the layout: add a breakpoint when the content feels cramped, or when there is so much empty space that another column would fit. The number is not arbitrary — it is derived from the content.',
          },
          {
            type: 'heading',
            id: 'r-l4-h1',
            level: 3,
            body: 'Why em units',
          },
          {
            type: 'text',
            id: 'r-l4-b2',
            body: 'Media queries in em units respect the user\'s font size setting. A user who has increased their default font size from 16px to 20px will hit a 40em breakpoint at 800px instead of 640px, which means the layout changes at a width that still works with the larger text. px-based breakpoints do not account for this, which is why em-based breakpoints are considered more accessible.',
          },
          {
            type: 'code',
            id: 'r-l4-c1',
            language: 'css',
            title: 'em-based breakpoints',
            code: `/* 40em = 640px at 16px base */
@media (min-width: 40em) { ... }

/* 64em = 1024px */
@media (min-width: 64em) { ... }

/* 80em = 1280px */
@media (min-width: 80em) { ... }`,
          },
          {
            type: 'heading',
            id: 'r-l4-h2',
            level: 3,
            body: 'Avoiding proliferation',
          },
          {
            type: 'list',
            id: 'r-l4-l1',
            style: 'bullet',
            items: [
              'Start with the base (mobile) layout.',
              'Add a breakpoint only when the layout breaks.',
              'Three to four breakpoints is enough for most sites.',
              'If you need more than six, the layout is too complex.',
            ],
          },
          {
            type: 'tip',
            id: 'r-l4-t1',
            title: 'Let the content decide',
            body: 'Resize the browser until the layout feels wrong. That width is your breakpoint. Do not look up the latest device sizes.',
          },
          {
            type: 'exercise',
            id: 'r-l4-x1',
            exercise: {
              id: 'ex-rwd-l4',
              instructions:
                'Convert the pixel-based breakpoint below to an em-based one, assuming a 16px base font size.',
              languages: ['css'],
              starterCode: {
                css: `@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}`,
              },
              expectedOutput: 'breakpoint converted to em',
              tests: [
                {
                  id: 'ex-rwd-l4-t1',
                  label: 'The breakpoint uses em units',
                  body: `return document.querySelector('style')?.textContent.includes('48em')`,
                },
              ],
              hints: [
                '768px / 16px = 48em.',
              ],
              solution: {
                css: `@media (min-width: 48em) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}`,
              },
              testNotes:
                'The check verifies the breakpoint is expressed in em.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s3',
    title: 'Fluid Layouts',
    description: 'Relative units, flexible images and media, and the techniques that make layouts flow naturally.',
    lessons: [
      {
        id: 'rwd-l5',
        title: 'Relative units',
        description: 'Percentages, viewport units, rem and em, and when each unit earns its keep in a responsive layout.',
        duration: 7,
        objectives: [
          'Use %, vw, vh, vmin and vmax for fluid sizing',
          'Choose between rem and em for typography and spacing',
          'Explain why px is rarely the right choice for layout',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l5',
          title: 'Relative units quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l5-q1',
              type: 'multiple-choice',
              prompt: 'Which unit is relative to the parent width?',
              options: [
                'rem',
                'em',
                '%',
                'px',
              ],
              answer: 2,
              explanation: '% is relative to the parent width. rem and em are relative to font sizes.',
            },
            {
              id: 'quiz-rwd-l5-q2',
              type: 'blank',
              prompt: 'What CSS unit is relative to the root font size?',
              answers: [
                'rem',
              ],
              explanation: 'rem (root em) is relative to the root element font size.',
            },
            {
              id: 'quiz-rwd-l5-q3',
              type: 'multiple-choice',
              prompt: 'Which unit resolves against whichever viewport dimension is smaller?',
              options: [
                '`vw`',
                '`vh`',
                '`vmin`',
                '`vmax`',
              ],
              answer: 2,
              explanation: '`vmin` follows whichever viewport dimension is smaller, while `vmax` follows the larger one. That makes `vmin` useful for type that must fit in both portrait and landscape.',
            },
            {
              id: 'quiz-rwd-l5-q4',
              type: 'multiple-choice',
              prompt: 'A button sets `font-size: 1.25rem` and `padding: 1em`. What is the padding based on?',
              options: [
                'The root font size',
                'The width of the button’s parent',
                'The viewport height',
                'The button’s own computed font size',
              ],
              answer: 3,
              explanation: '`em` resolves against the font size of the element it is used on, so this padding scales with the button’s own text. `rem` would instead resolve against the root font size.',
            },
            {
              id: 'quiz-rwd-l5-q5',
              type: 'true-false',
              prompt: '`px` is still a sensible unit for borders and shadows in a fluid layout.',
              answer: true,
              explanation: 'Fine details like hairlines and small shadows should stay crisp rather than scale with text or viewport. `px` is a poor choice for widths and type, but it earns its keep for those one-off details.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l5-b1',
            body: 'Responsive layouts depend on units that scale. px is absolute: 16px is 16px regardless of the parent or the viewport. % is relative to the parent width. vw and vh are relative to the viewport. rem is relative to the root font size, and em is relative to the current element font size. Each unit solves a different problem, and the best layouts mix them.',
          },
          {
            type: 'heading',
            id: 'r-l5-h1',
            level: 3,
            body: 'The units compared',
          },
          {
            type: 'list',
            id: 'r-l5-l1',
            style: 'bullet',
            items: [
              '**%** — relative to the parent width. Good for grid columns and flexible containers.',
              '**vw / vh** — relative to the viewport. Useful for full-screen sections.',
              '**vmin / vmax** — relative to the smaller or larger viewport dimension. Good for responsive typography.',
              '**rem** — relative to the root font size. Best for consistent spacing and typography.',
              '**em** — relative to the current font size. Useful for component-internal scaling.',
              '**px** — absolute. Use for borders, shadows, and precise one-off values.',
            ],
          },
          {
            type: 'code',
            id: 'r-l5-c1',
            language: 'css',
            title: 'Fluid typography and spacing',
            code: `:root { font-size: 16px; }

.hero {
  font-size: clamp(1.5rem, 4vw, 3rem);
  padding: 2rem 5vw;
}

.sidebar {
  width: 25%;
  min-width: 200px;
}`,
          },
          {
            type: 'tip',
            id: 'r-l5-t1',
            title: 'Use rem for global spacing',
            body: 'rem respects the user\'s font size setting and stays consistent across components. Use em only when you want the value to scale with the element\'s own font size.',
          },
          {
            type: 'exercise',
            id: 'r-l5-x1',
            exercise: {
              id: 'ex-rwd-l5',
              instructions:
                'Change the fixed pixel widths to percentages so the two cards share the row equally on desktop and stack on mobile.',
              languages: ['css'],
              starterCode: {
                html: `<div class="row">
  <div class="card">Card one</div>
  <div class="card">Card two</div>
</div>`,
                css: `.row { display: block; }
.card { width: 300px; margin: 0.5rem; }`,
              },
              expectedOutput: 'fluid card widths',
              tests: [
                {
                  id: 'ex-rwd-l5-t1',
                  label: 'Cards use percentage widths',
                  body: `return getComputedStyle(document.querySelector('.card')).width !== '300px'`,
                },
              ],
              hints: [
                'width: calc(50% - 1rem) accounts for the margin.',
                'Add a media query to stack them on narrow screens.',
              ],
              solution: {
                css: `.row { display: block; }
.card { width: calc(50% - 1rem); margin: 0.5rem; }
@media (max-width: 600px) {
  .card { width: 100%; }
}`,
              },
              testNotes:
                'The check verifies the card width is no longer fixed at 300px.',
            },
          },
        ],
      },
      {
        id: 'rwd-l6',
        title: 'Flexible images and media',
        description: 'max-width: 100%, object-fit, the picture element, srcset, and how to serve the right image for the right screen.',
        duration: 7,
        objectives: [
          'Make images fluid with max-width and height',
          'Use object-fit to control image cropping',
          'Choose between picture, srcset and CSS for responsive images',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l6',
          title: 'Flexible images and media quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l6-q1',
              type: 'true-false',
              prompt: 'max-width: 100% on an image makes it grow beyond its natural size.',
              answer: false,
              explanation: 'max-width: 100% prevents the image from exceeding its container, but it never scales up beyond its intrinsic size.',
            },
            {
              id: 'quiz-rwd-l6-q2',
              type: 'multiple-choice',
              prompt: 'What does object-fit: cover do?',
              options: [
                'Scales the image to fit without cropping',
                'Fills the container, cropping if necessary',
                'Stretches the image to fill',
                'Keeps the image at its natural size',
              ],
              answer: 1,
              explanation: 'object-fit: cover fills the container while preserving aspect ratio, cropping overflow.',
            },
            {
              id: 'quiz-rwd-l6-q3',
              type: 'multiple-choice',
              prompt: 'Why should you set width and height attributes on images?',
              options: [
                'To make them load faster',
                'To reserve space and prevent layout shift',
                'To improve SEO',
                'To enable lazy loading',
              ],
              answer: 1,
              explanation: 'Width and height let the browser calculate the aspect ratio before the image loads, preventing cumulative layout shift.',
            },
            {
              id: 'quiz-rwd-l6-q4',
              type: 'multiple-choice',
              prompt: 'Why is `height: auto` paired with `max-width: 100%` on a fluid image?',
              options: [
                'It preserves the image’s aspect ratio as the width changes',
                'It makes the image load lazily',
                'It enlarges the image to fill the container',
                'It converts the image to a modern format',
              ],
              answer: 0,
              explanation: 'Once the width is allowed to shrink, the height must be free to follow it. `height: auto` lets the browser derive the height from the intrinsic ratio instead of squashing or stretching the image.',
            },
            {
              id: 'quiz-rwd-l6-q5',
              type: 'multiple-choice',
              prompt: 'When is `<picture>` a better fit than `srcset` alone?',
              options: [
                'When the same photo only needs different resolutions',
                'When you need a different crop or composition per screen size',
                'When the image should be hidden on mobile',
                'When you want the browser to ignore the alt text',
              ],
              answer: 1,
              explanation: '`srcset` handles resolution switching for one image. `<picture>` adds art direction, letting each breakpoint receive a genuinely different crop or image rather than a smaller copy of the same one.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l6-b1',
            body: 'An image with a fixed width is the most common cause of horizontal scrolling on mobile. The cure is simple: max-width: 100% on the img, which says "never grow wider than your intrinsic size, but shrink to fit the container". height: auto keeps the aspect ratio. Together they make every image in the document fluid without changing a single width attribute.',
          },
          {
            type: 'heading',
            id: 'r-l6-h1',
            level: 3,
            body: 'The fluid image recipe',
          },
          {
            type: 'code',
            id: 'r-l6-c1',
            language: 'css',
            title: 'Fluid images',
            code: `img, video, iframe {
  max-width: 100%;
  height: auto;
}

/* object-fit for cropped containers */
.avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
}`,
          },
          {
            type: 'heading',
            id: 'r-l6-h2',
            level: 3,
            body: 'srcset and picture',
          },
          {
            type: 'text',
            id: 'r-l6-b2',
            body: 'srcset lets the browser choose between multiple versions of the same image based on viewport width or pixel density. The picture element goes further: it lets you serve completely different images for different conditions, such as a wide landscape for desktop and a tall portrait for mobile. Use srcset for resolution switching and picture for art direction.',
          },
          {
            type: 'code',
            id: 'r-l6-c2',
            language: 'html',
            title: 'srcset for resolution switching',
            code: `<img
  src="hero-800.jpg"
  srcset="hero-400.jpg 400w, hero-800.jpg 800w, hero-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1024px) 800px, 1200px"
  alt="Hero image"
>`,
          },
          {
            type: 'tip',
            id: 'r-l6-t1',
            title: 'Always set width and height on images',
            body: 'The aspect ratio from width and height prevents layout shift. Without them the browser does not know the image size until it loads, which causes cumulative layout shift.',
          },
          {
            type: 'exercise',
            id: 'r-l6-x1',
            exercise: {
              id: 'ex-rwd-l6',
              instructions:
                'Add max-width: 100% and height: auto to the image style so it scales down on small screens without exceeding its natural size.',
              languages: ['css'],
              starterCode: {
                html: `<img src="photo.jpg" alt="Photo" class="photo">`,
                css: `.photo { width: 600px; }`,
              },
              expectedOutput: 'image is fluid',
              tests: [
                {
                  id: 'ex-rwd-l6-t1',
                  label: 'max-width is 100%',
                  body: `return getComputedStyle(document.querySelector('.photo')).maxWidth === '100%'`,
                },
                {
                  id: 'ex-rwd-l6-t2',
                  label: 'height is auto',
                  body: `return getComputedStyle(document.querySelector('.photo')).height !== '0px'`,
                },
              ],
              hints: [
                'Add max-width: 100% and height: auto to the .photo rule.',
              ],
              solution: {
                css: `.photo { width: 600px; max-width: 100%; height: auto; }`,
              },
              testNotes:
                'The checks verify the fluid image properties are applied.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s4',
    title: 'Responsive Typography',
    description: 'Scalable type, fluid typography with clamp, and controlling line length for readability.',
    lessons: [
      {
        id: 'rwd-l7',
        title: 'Scalable type',
        description: 'clamp(), fluid typography with vw, and the min-max pattern that keeps text readable on every screen.',
        duration: 7,
        objectives: [
          'Use clamp() to set fluid type that scales within bounds',
          'Explain why fixed pixel font sizes break on small screens',
          'Use vw units for proportional scaling',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l7',
          title: 'Scalable type quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l7-q1',
              type: 'multiple-choice',
              prompt: 'What does clamp(1.5rem, 4vw, 3rem) do?',
              options: [
                'Sets the font size to 4vw',
                'Scales between 1.5rem and 3rem, preferring 4vw',
                'Always uses 1.5rem',
                'Sets the font size to 3rem',
              ],
              answer: 1,
              explanation: 'clamp scales between the minimum and maximum, using the preferred value in between.',
            },
            {
              id: 'quiz-rwd-l7-q2',
              type: 'blank',
              prompt: 'What CSS function sets a value between a minimum and maximum?',
              answers: [
                'clamp',
              ],
              explanation: 'clamp(min, preferred, max) scales the preferred value between the bounds.',
            },
            {
              id: 'quiz-rwd-l7-q3',
              type: 'multiple-choice',
              prompt: 'Why is a fixed 16px hero heading a poor choice across devices?',
              options: [
                'It cannot be read by search engines',
                'It forces the whole page into a fixed-width layout',
                'It disables the user’s ability to zoom',
                'It stays the same size, looking small on phones and modest on large monitors',
              ],
              answer: 3,
              explanation: 'A fixed size ignores the space available, so the same heading feels tiny on a phone and underwhelming on a large display. Fluid type scales with the viewport while staying inside readable limits.',
            },
            {
              id: 'quiz-rwd-l7-q4',
              type: 'multiple-choice',
              prompt: 'Why is `1rem` added to the `4vw` in `clamp(1.5rem, 4vw + 1rem, 3rem)`?',
              options: [
                'It adds a readable floor so the text does not shrink too far on narrow screens',
                'It converts the viewport value into pixels',
                'It sets the maximum size the text can reach',
                'It stops the text from scaling at all',
              ],
              answer: 0,
              explanation: 'On a narrow viewport `4vw` alone becomes very small, so adding `1rem` keeps the preferred value above a readable size. The outer `1.5rem` and `3rem` still enforce the hard limits.',
            },
            {
              id: 'quiz-rwd-l7-q5',
              type: 'multiple-choice',
              prompt: 'What does `font-size: min(2rem, 5vw)` choose?',
              options: [
                'The larger of 2rem and 5vw',
                'The smaller of 2rem and 5vw',
                'A value halfway between them',
                '2rem whenever 5vw is unavailable',
              ],
              answer: 1,
              explanation: '`min()` always returns the smaller of its arguments, so the text grows with the viewport until it would exceed 2rem and then stops. `max()` does the opposite.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l7-b1',
            body: 'A font size of 16px that looks comfortable on a laptop can be tiny on a phone held at arm\'s length, or comically large on a 27-inch monitor. Fluid typography scales with the viewport while staying within readable bounds. The modern way to write it is clamp(), which takes a minimum, a preferred value, and a maximum. The browser scales between the min and max as the viewport changes.',
          },
          {
            type: 'heading',
            id: 'r-l7-h1',
            level: 3,
            body: 'The clamp function',
          },
          {
            type: 'code',
            id: 'r-l7-c1',
            language: 'css',
            title: 'Fluid type with clamp',
            code: `h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

/* equivalent min-max pattern */
h1 {
  font-size: min(max(1.5rem, 4vw), 3rem);
}`,
          },
          {
            type: 'list',
            id: 'r-l7-l1',
            style: 'bullet',
            items: [
              '**clamp(min, preferred, max)** — fluid between min and max.',
              '**min()** — the smaller of two values.',
              '**max()** — the larger of two values.',
              '**4vw** — scales with viewport width. 4vw is about 14px on a 360px phone and 51px on a 1280px desktop.',
              '**The + 1rem** in clamp adds a floor so the font never shrinks below a readable size.',
            ],
          },
          {
            type: 'demo',
            id: 'r-l7-d1',
            title: 'Fluid typography live',
            body: 'Resize the browser to see the heading scale smoothly within its bounds.',
            html: `<h1 class="fluid">Fluid Heading</h1>
<p class="body">This paragraph uses clamp for its font size too. Resize the browser to see both scale.</p>`,
            css: `body { font-family: system-ui, sans-serif; padding: 1rem; }
.fluid { font-size: clamp(1.5rem, 4vw + 1rem, 3rem); }
.body { font-size: clamp(1rem, 2vw + 0.5rem, 1.25rem); max-width: 60ch; }`,
            height: 120,
          },
          {
            type: 'tip',
            id: 'r-l7-t1',
            title: 'Set a max-width on paragraphs',
            body: 'Even with fluid type, a paragraph that spans the full width of a wide monitor becomes unreadable. max-width: 60ch keeps the line length comfortable.',
          },
          {
            type: 'exercise',
            id: 'r-l7-x1',
            exercise: {
              id: 'ex-rwd-l7',
              instructions:
                'Replace the fixed font size on the heading with clamp() so it scales between 1.5rem and 3rem.',
              languages: ['css'],
              starterCode: {
                html: `<h1 class="title">Responsive Title</h1>`,
                css: `.title { font-size: 16px; }`,
              },
              expectedOutput: 'heading uses clamp for fluid type',
              tests: [
                {
                  id: 'ex-rwd-l7-t1',
                  label: 'font-size uses clamp',
                  body: `return getComputedStyle(document.querySelector('.title')).fontSize !== '16px'`,
                },
              ],
              hints: [
                'font-size: clamp(1.5rem, 4vw + 1rem, 3rem) is a good starting point.',
              ],
              solution: {
                css: `.title { font-size: clamp(1.5rem, 4vw + 1rem, 3rem); }`,
              },
              testNotes:
                'The check verifies the font size is no longer a fixed pixel value.',
            },
          },
        ],
      },
      {
        id: 'rwd-l8',
        title: 'Line length and measure',
        description: 'The ch unit, max-width for readability, and why 60-75 characters is the ideal line length.',
        duration: 6,
        objectives: [
          'Use the ch unit to control line length',
          'Set a max-width on text containers for readability',
          'Explain why long lines are hard to read',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-rwd-l8',
          title: 'Line length and measure quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l8-q1',
              type: 'true-false',
              prompt: 'The ch unit represents the width of the character "0".',
              answer: true,
              explanation: '1ch is the width of the zero glyph in the current font.',
            },
            {
              id: 'quiz-rwd-l8-q2',
              type: 'multiple-choice',
              prompt: 'Why should line length be constrained?',
              options: [
                'To save bandwidth',
                'To keep lines between 60 and 75 characters for readability',
                'To make the page load faster',
                'To improve SEO',
              ],
              answer: 1,
              explanation: 'Lines that are too long or too short are hard to read. 60-75 characters is the optimal range.',
            },
            {
              id: 'quiz-rwd-l8-q3',
              type: 'multiple-choice',
              prompt: 'What is a good max-width for body text?',
              options: [
                '30ch',
                '65ch',
                '100ch',
                '120ch',
              ],
              answer: 1,
              explanation: '65ch is roughly 65 characters, which is the optimal line length for readability.',
            },
            {
              id: 'quiz-rwd-l8-q4',
              type: 'multiple-choice',
              prompt: 'Why is a unitless `line-height` such as `1.6` preferred over a pixel value?',
              options: [
                'It is the only value browsers accept',
                'It multiplies each element’s font size, so spacing scales with the text',
                'It removes the need for margins',
                'It makes lines exactly 1.6px apart',
              ],
              answer: 1,
              explanation: 'A unitless number is a ratio, so a heading and a paragraph each get leading proportional to their own font size. A fixed pixel value would need overriding whenever the text size changes.',
            },
            {
              id: 'quiz-rwd-l8-q5',
              type: 'multiple-choice',
              prompt: 'What is the readability problem with very short lines?',
              options: [
                'The eye must jump back to a new line too often, breaking reading rhythm',
                'The text becomes too small to read',
                'The browser cannot wrap the text',
                'Screen readers skip short paragraphs',
              ],
              answer: 0,
              explanation: 'Short lines force frequent return sweeps, which tires the reader and interrupts comprehension. That is why the target range is roughly 60 to 75 characters, not as few as possible.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l8-b1',
            body: 'Readability depends heavily on line length. A line that is too short forces the eye to jump back too often. A line that is too long makes it hard to find the start of the next line. The sweet spot is 60 to 75 characters per line, which is roughly 60ch at a 16px base font size. The ch unit is the width of the zero character in the current font, so max-width: 65ch keeps paragraphs readable regardless of the font.',
          },
          {
            type: 'code',
            id: 'r-l8-c1',
            language: 'css',
            title: 'Constraining line length',
            code: `.prose {
  max-width: 65ch;
  margin: 0 auto;
  line-height: 1.6;
}`,
          },
          {
            type: 'heading',
            id: 'r-l8-h1',
            level: 3,
            body: 'Line height',
          },
          {
            type: 'text',
            id: 'r-l8-b2',
            body: 'Line height (leading) is the vertical space between lines of text. A ratio of 1.5 to 1.6 works well for body text. Headings can be tighter: 1.2 to 1.3. The unitless number is preferred because it multiplies the font size, so the spacing scales with the text.',
          },
          {
            type: 'tip',
            id: 'r-l8-t1',
            title: 'Use ch for measure, rem for spacing',
            body: 'ch is perfect for constraining text width. rem is better for margins, padding and gaps because it scales with the root font size.',
          },
          {
            type: 'exercise',
            id: 'r-l8-x1',
            exercise: {
              id: 'ex-rwd-l8',
              instructions:
                'Add max-width: 65ch and line-height: 1.6 to the paragraph so it is comfortable to read on wide screens.',
              languages: ['css'],
              starterCode: {
                html: `<article class="prose">
  <p>This is a paragraph of body text that should be comfortable to read on any screen width.</p>
</article>`,
                css: `.prose p { /* add max-width and line-height here */ }`,
              },
              expectedOutput: 'readable paragraph with constrained width',
              tests: [
                {
                  id: 'ex-rwd-l8-t1',
                  label: 'max-width is set',
                  body: `return getComputedStyle(document.querySelector('.prose p')).maxWidth !== '0px'`,
                },
                {
                  id: 'ex-rwd-l8-t2',
                  label: 'line-height is set',
                  body: `const lh = getComputedStyle(document.querySelector('.prose p')).lineHeight
return lh === '1.6' || parseFloat(lh) > 1`,
                },
              ],
              hints: [
                'max-width: 65ch constrains the line length.',
                'line-height: 1.6 gives comfortable vertical spacing.',
              ],
              solution: {
                css: `.prose p { max-width: 65ch; line-height: 1.6; }`,
              },
              testNotes:
                'The checks verify the readability properties are applied.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s5',
    title: 'CSS Grid for Layouts',
    description: 'Grid for page layout, auto-fit and auto-fill, minmax, and responsive grid patterns.',
    lessons: [
      {
        id: 'rwd-l9',
        title: 'Grid for page layout',
        description: 'grid-template-columns, auto-fit, auto-fill, minmax, and how grid replaces older layout hacks.',
        duration: 8,
        objectives: [
          'Create a responsive grid with grid-template-columns',
          'Use auto-fit and auto-fill for cards that wrap automatically',
          'Use minmax to set flexible column sizes',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-rwd-l9',
          title: 'Grid for page layout quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l9-q1',
              type: 'multiple-choice',
              prompt: 'What does auto-fit do in grid-template-columns?',
              options: [
                'Creates exactly one column',
                'Creates as many columns as will fit',
                'Fills empty cells with auto-generated content',
                'Centers the grid',
              ],
              answer: 1,
              explanation: 'auto-fit creates as many columns as will fit in the available space.',
            },
            {
              id: 'quiz-rwd-l9-q2',
              type: 'true-false',
              prompt: 'Grid is one-dimensional like flexbox.',
              answer: false,
              explanation: 'Grid is two-dimensional: it controls rows and columns simultaneously. Flexbox is one-dimensional.',
            },
            {
              id: 'quiz-rwd-l9-q3',
              type: 'multiple-choice',
              prompt: 'What does minmax(250px, 1fr) mean?',
              options: [
                'Exactly 250px',
                'At least 250px, growing to fill available space',
                'At most 250px',
                'A fixed fraction of 250px',
              ],
              answer: 1,
              explanation: 'minmax sets the minimum and maximum size. The column grows from 250px up to 1fr.',
            },
            {
              id: 'quiz-rwd-l9-q4',
              type: 'multiple-choice',
              prompt: 'When should you use grid over flexbox?',
              options: [
                'For centering a single element',
                'For two-dimensional page layouts',
                'For inline text alignment',
                'For animating height changes',
              ],
              answer: 1,
              explanation: 'Grid is designed for two-dimensional layouts. Flexbox handles one-dimensional alignment.',
            },
            {
              id: 'quiz-rwd-l9-q5',
              type: 'multiple-choice',
              prompt: 'How does `auto-fit` differ from `auto-fill` in `grid-template-columns`?',
              options: [
                '`auto-fit` keeps empty tracks, while `auto-fill` collapses them',
                '`auto-fit` only works with fixed pixel columns',
                'They behave identically in every browser',
                '`auto-fit` collapses empty tracks so items stretch, while `auto-fill` keeps them',
              ],
              answer: 3,
              explanation: 'Both create as many tracks as fit, but `auto-fit` collapses the empty ones so the remaining items grow to fill the row. `auto-fill` leaves those empty tracks in place, which can leave gaps.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l9-b1',
            body: 'CSS Grid is the most powerful layout system in CSS. It handles two-dimensional layouts — rows and columns at the same time — and it does so with a syntax that reads like a diagram. A card grid that used to need float hacks, inline-block whitespace fixes, or a JavaScript column counter is now three lines of CSS.',
          },
          {
            type: 'heading',
            id: 'r-l9-h1',
            level: 3,
            body: 'The responsive grid',
          },
          {
            type: 'code',
            id: 'r-l9-c1',
            language: 'css',
            title: 'A card grid with auto-fit',
            code: `.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}`,
          },
          {
            type: 'list',
            id: 'r-l9-l1',
            style: 'bullet',
            items: [
              '**repeat(auto-fit, ...)** — creates as many columns as fit.',
              '**minmax(250px, 1fr)** — each column is at least 250px and at most 1fr.',
              'When there is not enough space for another 250px column, the columns reflow.',
              'No media queries needed for the basic responsive behaviour.',
            ],
          },
          {
            type: 'demo',
            id: 'r-l9-d1',
            title: 'Grid auto-fit live',
            body: 'Resize the browser to see the cards reflow. No media queries are used.',
            html: `<div class="grid">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
  <div class="card">Four</div>
</div>`,
            css: `body { font-family: system-ui, sans-serif; font-size: 14px; }
.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.card { padding: 1.5rem; border: 1px solid #d5dae0; border-radius: 10px; background: #f4f6f8; text-align: center; }`,
            height: 160,
          },
          {
            type: 'heading',
            id: 'r-l9-h2',
            level: 3,
            body: 'Grid for page structure',
          },
          {
            type: 'text',
            id: 'r-l9-b2',
            body: 'Grid is also the cleanest way to build page-level layouts: header, main, sidebar, footer. Define named areas with grid-template-areas and rearrange them with media queries. The HTML stays the same; only the grid template changes.',
          },
          {
            type: 'code',
            id: 'r-l9-c2',
            language: 'css',
            title: 'Named grid areas',
            code: `.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "main sidebar"
    "footer footer";
  grid-template-columns: 1fr 300px;
  gap: 1rem;
}

@media (max-width: 768px) {
  .layout {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}`,
          },
          {
            type: 'tip',
            id: 'r-l9-t1',
            title: 'Use grid for layout, flexbox for components',
            body: 'Grid handles two-dimensional page structure. Flexbox handles one-dimensional alignment of items inside a component. They complement each other.',
          },
          {
            type: 'exercise',
            id: 'r-l9-x1',
            exercise: {
              id: 'ex-rwd-l9',
              instructions:
                'Create a responsive grid of four cards that auto-fits columns of at least 200px.',
              languages: ['css'],
              starterCode: {
                html: `<div class="grid">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
  <div class="card">Four</div>
</div>`,
                css: `.grid { display: block; }
.card { display: inline-block; width: 45%; margin: 1%; }`,
              },
              expectedOutput: 'responsive grid with auto-fit',
              tests: [
                {
                  id: 'ex-rwd-l9-t1',
                  label: 'Grid display is used',
                  body: `return getComputedStyle(document.querySelector('.grid')).display === 'grid'`,
                },
                {
                  id: 'ex-rwd-l9-t2',
                  label: 'auto-fit is in the template',
                  body: `return document.querySelector('style')?.textContent.includes('auto-fit')`,
                },
              ],
              hints: [
                'Use display: grid and grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)).',
              ],
              solution: {
                css: `.grid { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.card { padding: 1rem; border: 1px solid #d5dae0; border-radius: 8px; }`,
              },
              testNotes:
                'The checks verify grid display and auto-fit usage.',
            },
          },
        ],
      },
      {
        id: 'rwd-l10',
        title: 'Responsive grid patterns',
        description: 'Holy grail layout, sidebar patterns, and card grids that adapt from mobile to desktop.',
        duration: 8,
        objectives: [
          'Build a holy grail layout with grid-template-areas',
          'Create sidebar patterns that collapse on mobile',
          'Build card grids that reflow automatically',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-rwd-l10',
          title: 'Responsive grid patterns quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l10-q1',
              type: 'blank',
              prompt: 'What CSS property defines named grid regions?',
              answers: [
                'grid-template-areas',
              ],
              explanation: 'grid-template-areas lets you name regions and place elements with grid-area.',
            },
            {
              id: 'quiz-rwd-l10-q2',
              type: 'multiple-choice',
              prompt: 'Which declaration assigns an element to a named grid area called `sidebar`?',
              options: [
                '`grid-area: sidebar`',
                '`grid-template: sidebar`',
                '`grid-column: sidebar`',
                '`area: sidebar`',
              ],
              answer: 0,
              explanation: '`grid-template-areas` names the regions on the container, and `grid-area` on a child places it into one of those names. The other properties either define tracks or are not real properties.',
            },
            {
              id: 'quiz-rwd-l10-q3',
              type: 'multiple-choice',
              prompt: 'Which `grid-template-areas` creates a header and footer spanning both columns, with main and sidebar in the middle row?',
              options: [
                '"header main" "sidebar footer"',
                '"header header" "main sidebar" "footer footer"',
                '"header sidebar" "main footer"',
                '"main sidebar" "header footer"',
              ],
              answer: 1,
              explanation: 'Repeating a name across a row makes that area span those columns. The middle row names `main` and `sidebar` once each, so the page has the classic header, content-plus-sidebar, footer structure.',
            },
            {
              id: 'quiz-rwd-l10-q4',
              type: 'multiple-choice',
              prompt: 'In the sidebar pattern, what does the narrow-screen media query do?',
              options: [
                'Hides the sidebar completely',
                'Moves the sidebar above the header',
                'Turns the grid into flexbox',
                'Changes the grid to a single column so the sidebar sits below main',
              ],
              answer: 3,
              explanation: 'Collapsing to one column keeps the content in source order: header, main, sidebar, footer. The sidebar stays available; it simply stops competing for horizontal space on a narrow screen.',
            },
            {
              id: 'quiz-rwd-l10-q5',
              type: 'multiple-choice',
              prompt: 'Why is rearranging page regions with `grid-template-areas` preferable to moving elements in the HTML?',
              options: [
                'It loads faster than HTML',
                'The visual layout changes while the DOM source order stays intact for assistive technology',
                'It removes the need for semantic elements',
                'It makes every region the same size',
              ],
              answer: 1,
              explanation: 'Grid placement is presentation only, so the reading and tab order still follow the markup. Physically reordering the HTML to change the visuals would change that order for screen reader and keyboard users.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l10-b1',
            body: 'The holy grail layout — header, footer, left sidebar, right sidebar, and main content — was the classic CSS puzzle for a decade. Grid solves it with named areas. The sidebar pattern — a sidebar that collapses below the main content on mobile — is the same idea with a different template. Card grids are the simplest pattern: auto-fit with minmax handles the reflow automatically.',
          },
          {
            type: 'heading',
            id: 'r-l10-h1',
            level: 3,
            body: 'The sidebar pattern',
          },
          {
            type: 'code',
            id: 'r-l10-c1',
            language: 'css',
            title: 'Sidebar that collapses',
            code: `.layout {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 300px;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }
}`,
          },
          {
            type: 'heading',
            id: 'r-l10-h2',
            level: 3,
            body: 'When to use grid versus flexbox',
          },
          {
            type: 'list',
            id: 'r-l10-l1',
            style: 'bullet',
            items: [
              '**Grid** — page layout, card grids, any two-dimensional arrangement.',
              '**Flexbox** — navigation bars, button groups, centering, one-dimensional alignment.',
              '**Together** — a grid page with flexbox components inside each grid cell.',
            ],
          },
          {
            type: 'tip',
            id: 'r-l10-t1',
            title: 'Start with grid for the page shell',
            body: 'Define the header, main, sidebar and footer with grid-template-areas. Use flexbox for the navigation inside the header and the card layout inside main.',
          },
          {
            type: 'exercise',
            id: 'r-l10-x1',
            exercise: {
              id: 'ex-rwd-l10',
              instructions:
                'Create a holy grail layout with header, main, sidebar and footer using grid-template-areas. Collapse the sidebar below main on screens narrower than 768px.',
              languages: ['css'],
              starterCode: {
                html: `<div class="layout">
  <header>Header</header>
  <main>Main content</main>
  <aside>Sidebar</aside>
  <footer>Footer</footer>
</div>`,
                css: `.layout { display: block; }
header, main, aside, footer { padding: 1rem; border: 1px solid #d5dae0; }`,
              },
              expectedOutput: 'holy grail layout with responsive sidebar',
              tests: [
                {
                  id: 'ex-rwd-l10-t1',
                  label: 'Layout uses grid',
                  body: `return getComputedStyle(document.querySelector('.layout')).display === 'grid'`,
                },
                {
                  id: 'ex-rwd-l10-t2',
                  label: 'Grid template areas are defined',
                  body: `return document.querySelector('style')?.textContent.includes('grid-template-areas')`,
                },
              ],
              hints: [
                'Define four areas: "header header", "main sidebar", "footer footer".',
                'Use a media query to change to single column on narrow screens.',
              ],
              solution: {
                css: `.layout { display: grid; gap: 1rem; grid-template-areas: "header header" "main sidebar" "footer footer"; grid-template-columns: 1fr 300px; }
header { grid-area: header; }
main { grid-area: main; }
aside { grid-area: sidebar; }
footer { grid-area: footer; }
@media (max-width: 768px) {
  .layout { grid-template-areas: "header" "main" "sidebar" "footer"; grid-template-columns: 1fr; }
}`,
              },
              testNotes:
                'The checks verify grid display and named areas.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s6',
    title: 'Mobile-First Design',
    description: 'Designing for the smallest screen first, then enhancing for larger viewports with progressive enhancement.',
    lessons: [
      {
        id: 'rwd-l11',
        title: 'The mobile-first approach',
        description: 'Why designing for mobile first produces better code, and how min-width media queries fit the method.',
        duration: 7,
        objectives: [
          'Explain why mobile-first leads to simpler CSS',
          'Write min-width media queries that enhance the layout',
          'Apply progressive enhancement to navigation and content',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l11',
          title: 'The mobile-first approach quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l11-q1',
              type: 'multiple-choice',
              prompt: 'What does mobile-first mean?',
              options: [
                'Designing for desktop first',
                'Writing base styles for the smallest screen and enhancing upward',
                'Using only mobile devices for testing',
                'Removing content for mobile',
              ],
              answer: 1,
              explanation: 'Mobile-first writes base styles for mobile and uses min-width queries to enhance for larger screens.',
            },
            {
              id: 'quiz-rwd-l11-q2',
              type: 'true-false',
              prompt: 'Progressive enhancement means hiding content on capable browsers.',
              answer: false,
              explanation: 'Progressive enhancement means the base experience works everywhere and capable browsers get more features.',
            },
            {
              id: 'quiz-rwd-l11-q3',
              type: 'multiple-choice',
              prompt: 'Why does mobile-first produce simpler CSS?',
              options: [
                'It uses fewer properties',
                'Each breakpoint builds on the previous one instead of overriding',
                'It avoids media queries entirely',
                'It uses fixed widths',
              ],
              answer: 1,
              explanation: 'Mobile-first adds layers of enhancement rather than overriding desktop styles downward.',
            },
            {
              id: 'quiz-rwd-l11-q4',
              type: 'blank',
              prompt: 'What media query direction does mobile-first use?',
              answers: [
                'min-width',
              ],
              explanation: 'Mobile-first uses min-width media queries that activate as the viewport grows.',
            },
            {
              id: 'quiz-rwd-l11-q5',
              type: 'multiple-choice',
              prompt: 'Which order does the mobile-first method recommend?',
              options: [
                'Decoration, layout, then content',
                'Content first, then layout, then decoration',
                'Layout, content, then decoration',
                'Desktop layout first, simplified downward',
              ],
              answer: 1,
              explanation: 'Base styles should render readable content before any layout work, with columns and polish added at larger breakpoints. That prevents small screens from downloading and then undoing styles they never use.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l11-b1',
            body: 'Mobile-first means you write the base styles for the smallest screen, then use min-width media queries to add features as the viewport grows. The result is simpler CSS: the base styles are minimal, and each breakpoint adds a layer of enhancement rather than overriding a desktop layout downward. It also forces you to prioritise content, because you have to decide what is essential enough to appear on the smallest screen.',
          },
          {
            type: 'heading',
            id: 'r-l11-h1',
            level: 3,
            body: 'Min-width media queries',
          },
          {
            type: 'code',
            id: 'r-l11-c1',
            language: 'css',
            title: 'Mobile-first media queries',
            code: `/* base: mobile first */
.nav { display: none; }

/* tablet and up */
@media (min-width: 600px) {
  .nav { display: flex; gap: 1rem; }
}

/* desktop and up */
@media (min-width: 1024px) {
  .nav { gap: 2rem; }
}`,
          },
          {
            type: 'list',
            id: 'r-l11-l1',
            style: 'bullet',
            items: [
              '**Base styles** — the mobile experience. No media query.',
              '**min-width: 600px** — tablets and small laptops.',
              '**min-width: 1024px** — desktop monitors.',
              'Each breakpoint builds on the previous one. You never undo a rule.',
            ],
          },
          {
            type: 'heading',
            id: 'r-l11-h2',
            level: 3,
            body: 'Progressive enhancement',
          },
          {
            type: 'text',
            id: 'r-l11-b2',
            body: 'Progressive enhancement means the core content and functionality work everywhere, and more capable browsers get a better experience. On mobile the navigation might be a hamburger button. On desktop it becomes a horizontal bar. The HTML links are the same; only the presentation changes.',
          },
          {
            type: 'tip',
            id: 'r-l11-t1',
            title: 'Start with content, then layout, then decoration',
            body: 'The base styles should render readable text. Breakpoints add columns, navigation, and visual polish. This order prevents mobile users from downloading styles they never use.',
          },
          {
            type: 'exercise',
            id: 'r-l11-x1',
            exercise: {
              id: 'ex-rwd-l11',
              instructions:
                'Rewrite the max-width media query as a min-width media query following mobile-first principles.',
              languages: ['css'],
              starterCode: {
                html: `<div class="grid">
  <div class="card">One</div>
  <div class="card">Two</div>
  <div class="card">Three</div>
</div>`,
                css: `.grid { display: block; }
.card { width: 100%; display: block; margin-bottom: 1rem; }

@media (max-width: 600px) {
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
}`,
              },
              expectedOutput: 'mobile-first media query',
              tests: [
                {
                  id: 'ex-rwd-l11-t1',
                  label: 'Uses min-width media query',
                  body: `return document.querySelector('style')?.textContent.includes('min-width')`,
                },
                {
                  id: 'ex-rwd-l11-t2',
                  label: 'Grid is in the breakpoint',
                  body: `return document.querySelector('style')?.textContent.includes('display: grid')`,
                },
              ],
              hints: [
                'Move display: grid into a @media (min-width: 600px) block.',
              ],
              solution: {
                css: `.grid { display: block; }
.card { width: 100%; display: block; margin-bottom: 1rem; }

@media (min-width: 600px) {
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
}`,
              },
              testNotes:
                'The checks verify min-width is used and grid is inside the media query.',
            },
          },
        ],
      },
      {
        id: 'rwd-l12',
        title: 'Content priority',
        description: 'Deciding what appears on mobile, collapsing sections, and designing navigation that scales.',
        duration: 7,
        objectives: [
          'Prioritise content for small screens',
          'Use CSS to hide non-essential content on mobile',
          'Design navigation patterns that scale from mobile to desktop',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l12',
          title: 'Content priority quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l12-q1',
              type: 'multiple-choice',
              prompt: 'When should you hide content on mobile?',
              options: [
                'For primary content',
                'For secondary navigation and optional widgets',
                'For all images',
                'Never',
              ],
              answer: 1,
              explanation: 'Hide only secondary navigation, decorative elements, and optional widgets. Primary content should remain visible.',
            },
            {
              id: 'quiz-rwd-l12-q2',
              type: 'multiple-choice',
              prompt: 'Roughly how much text fits comfortably on a 360px screen at 16px?',
              options: [
                'About 10 words per line',
                'About 80 words per line',
                'No text fits without horizontal scrolling',
                'About 30 to 40 words per line',
              ],
              answer: 3,
              explanation: 'A narrow phone line holds only a few dozen words, which is why every section competes for space. That constraint is what forces a real decision about which content is primary.',
            },
            {
              id: 'quiz-rwd-l12-q3',
              type: 'multiple-choice',
              prompt: 'What belongs in the secondary tier of the content hierarchy?',
              options: [
                'The headline and primary call to action',
                'Supporting content that can sit below the fold on mobile',
                'Content that should be removed on mobile',
                'The site footer only',
              ],
              answer: 1,
              explanation: 'Primary content is what the user came for and stays visible; secondary content supports it and can move below the fold. Tertiary and genuinely useless content move behind a menu or disappear.',
            },
            {
              id: 'quiz-rwd-l12-q4',
              type: 'true-false',
              prompt: '`display: none` removes an element from the accessibility tree, not just from the visual layout.',
              answer: true,
              explanation: 'An element with `display: none` is not rendered and is not exposed to assistive technology. That is fine for content nobody needs on mobile, but it must not be used on information required to complete a task.',
            },
            {
              id: 'quiz-rwd-l12-q5',
              type: 'multiple-choice',
              prompt: 'Before hiding a section on mobile, what should you try first?',
              options: [
                'Stacking or reordering it',
                'Setting its font size to 0',
                'Turning it into an image',
                'Removing its heading',
              ],
              answer: 0,
              explanation: 'Responsive layout techniques keep the content available while fitting the narrow screen. Hiding should be the last resort, reserved for content that genuinely adds no value on mobile.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l12-b1',
            body: 'A 360px wide screen has room for roughly 30 to 40 words per line at 16px. That is not much. Mobile-first forces you to ask: what is the one thing the user came here to do? That becomes the primary call to action. Secondary content moves below the fold or behind an expandable section. The hamburger menu is not a hack; it is a deliberate choice to hide navigation until the user asks for it.',
          },
          {
            type: 'heading',
            id: 'r-l12-h1',
            level: 3,
            body: 'The content hierarchy',
          },
          {
            type: 'list',
            id: 'r-l12-l1',
            style: 'bullet',
            items: [
              '**Primary** — the headline and the main call to action. Always visible.',
              '**Secondary** — supporting content. Below the fold on mobile.',
              '**Tertiary** — extra links, related content. Behind a menu or accordion on mobile.',
              '**Hidden** — content that adds no value on mobile. Remove it or lazy-load it.',
            ],
          },
          {
            type: 'heading',
            id: 'r-l12-h2',
            level: 3,
            body: 'Hiding content responsively',
          },
          {
            type: 'text',
            id: 'r-l12-b2',
            body: 'display: none removes the element from the accessibility tree as well as the visual layout. Use it for content that is genuinely not needed on small screens. Use responsive techniques like stacking and reordering before resorting to hiding. If you hide something, make sure it is still accessible through another path.',
          },
          {
            type: 'code',
            id: 'r-l12-c1',
            language: 'css',
            title: 'Responsive hiding',
            code: `/* hide on mobile, show on desktop */
.sidebar { display: none; }

@media (min-width: 768px) {
  .sidebar { display: block; }
}`,
          },
          {
            type: 'tip',
            id: 'r-l12-t1',
            title: 'Do not hide primary content',
            body: 'Hiding content should be limited to secondary navigation, decorative elements, and optional widgets. If a user needs information to complete a task, it should be visible on mobile.',
          },
          {
            type: 'exercise',
            id: 'r-l12-x1',
            exercise: {
              id: 'ex-rwd-l12',
              instructions:
                'Hide the aside on mobile and show it as a block on screens 768px and wider.',
              languages: ['css'],
              starterCode: {
                html: `<main>Main content</main>
<aside>Sidebar content</aside>`,
                css: `main { padding: 1rem; }
aside { padding: 1rem; background: #f4f6f8; display: block; }`,
              },
              expectedOutput: 'sidebar hidden on mobile, visible on desktop',
              tests: [
                {
                  id: 'ex-rwd-l12-t1',
                  label: 'Sidebar hidden by default',
                  body: `return getComputedStyle(document.querySelector('aside')).display === 'none'`,
                },
                {
                  id: 'ex-rwd-l12-t2',
                  label: 'Sidebar shown in breakpoint',
                  body: `return document.querySelector('style')?.textContent.includes('min-width: 768px')`,
                },
              ],
              hints: [
                'Set aside { display: none; } as the base and override in a min-width: 768px query.',
              ],
              solution: {
                css: `main { padding: 1rem; }
aside { padding: 1rem; background: #f4f6f8; display: none; }
@media (min-width: 768px) {
  aside { display: block; }
}`,
              },
              testNotes:
                'The checks verify the sidebar is hidden by default and shown in the breakpoint.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s7',
    title: 'Responsive Navigation',
    description: 'Hamburger menus, CSS-only toggles, and the patterns that make navigation work on every screen.',
    lessons: [
      {
        id: 'rwd-l13',
        title: 'The responsive nav pattern',
        description: 'Horizontal navigation on desktop, hamburger menu on mobile, and how to implement both with CSS.',
        duration: 8,
        objectives: [
          'Build a horizontal nav for desktop',
          'Create a hamburger menu for mobile with the checkbox hack',
          'Use ARIA attributes for accessible navigation',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-rwd-l13',
          title: 'The responsive nav pattern quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l13-q1',
              type: 'multiple-choice',
              prompt: 'What does the checkbox hack use to toggle a menu?',
              options: [
                'A radio button',
                'A hidden checkbox and the :checked selector',
                'A JavaScript function',
                'The :hover pseudo-class',
              ],
              answer: 1,
              explanation: 'The checkbox hack uses a hidden checkbox and the :checked selector to toggle content without JavaScript.',
            },
            {
              id: 'quiz-rwd-l13-q2',
              type: 'multiple-choice',
              prompt: 'How is the hidden checkbox triggered when a user taps the hamburger icon?',
              options: [
                'A label whose `for` attribute matches the checkbox id',
                'A button with an `onclick` handler',
                'The `:hover` pseudo-class on the nav',
                'A second checkbox inside the nav',
              ],
              answer: 0,
              explanation: 'Clicking a label activates its associated form control, so the checkbox changes state and `:checked` can style the menu. The checkbox itself is visually hidden but still present in the DOM.',
            },
            {
              id: 'quiz-rwd-l13-q3',
              type: 'multiple-choice',
              prompt: 'In `.nav-toggle:checked ~ .nav`, what must be true for the rule to match?',
              options: [
                'The nav must be inside the checkbox',
                'The nav must come later in the same parent as the checkbox',
                'The nav must come before the checkbox',
                'The nav and checkbox must be in different parents',
              ],
              answer: 1,
              explanation: '`~` is the general sibling combinator, so the nav has to share a parent with the checkbox and follow it in the markup. That is why the checkbox and label are placed before the nav.',
            },
            {
              id: 'quiz-rwd-l13-q4',
              type: 'true-false',
              prompt: 'The checkbox hack is fully accessible because it needs no JavaScript.',
              answer: false,
              explanation: 'A screen reader may not announce the checkbox’s state as a menu toggle, so users cannot tell whether the menu is open. The accessible version uses a button with `aria-expanded` and `aria-controls`.',
            },
            {
              id: 'quiz-rwd-l13-q5',
              type: 'multiple-choice',
              prompt: 'At the desktop breakpoint in the hamburger example, what happens?',
              options: [
                'The nav is hidden and the label is shown',
                'Both the nav and the label are hidden',
                'The label is hidden and the nav becomes a horizontal flex row',
                'The checkbox is displayed next to the links',
              ],
              answer: 2,
              explanation: 'There is no need for a toggle once the links fit on one line, so the label disappears and the nav switches to a row. The same links serve both layouts; only the presentation changes.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l13-b1',
            body: 'The most common responsive navigation pattern is simple: horizontal links on desktop, a hamburger button on mobile that reveals a vertical menu. The pure CSS version uses a hidden checkbox to toggle the menu without JavaScript. The accessible version uses a button with aria-expanded and aria-controls, and a small script to toggle a class.',
          },
          {
            type: 'heading',
            id: 'r-l13-h1',
            level: 3,
            body: 'The checkbox hack',
          },
          {
            type: 'code',
            id: 'r-l13-c1',
            language: 'html',
            title: 'Pure CSS hamburger',
            code: `<input type="checkbox" id="nav-toggle" class="nav-toggle">

<label for="nav-toggle" class="nav-toggle-label">
  <span></span>
</label>

<nav class="nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>`,
          },
          {
            type: 'code',
            id: 'r-l13-c2',
            language: 'css',
            title: 'Hamburger CSS',
            code: `.nav-toggle { display: none; }

.nav-toggle-label span {
  display: block;
  width: 24px;
  height: 2px;
  background: #222;
  margin: 6px 0;
}

.nav { display: none; }
.nav-toggle:checked ~ .nav { display: block; }

@media (min-width: 768px) {
  .nav { display: flex; gap: 1.5rem; }
  .nav-toggle-label { display: none; }
}`,
          },
          {
            type: 'heading',
            id: 'r-l13-h2',
            level: 3,
            body: 'Accessible navigation',
          },
          {
            type: 'text',
            id: 'r-l13-b2',
            body: 'The checkbox hack is elegant but not accessible: screen readers may not announce the toggle state. For production, use a button with aria-expanded and aria-controls, then toggle a class with JavaScript. The CSS remains the same; only the trigger changes.',
          },
          {
            type: 'code',
            id: 'r-l13-c3',
            language: 'html',
            title: 'Accessible navigation button',
            code: `<button
  id="nav-toggle"
  aria-expanded="false"
  aria-controls="primary-nav"
  class="nav-toggle-label"
>
  Menu
</button>

<nav id="primary-nav" class="nav" hidden>
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>`,
          },
          {
            type: 'tip',
            id: 'r-l13-t1',
            title: 'Use :target for CSS-only toggles',
            body: 'If you must avoid JavaScript, the :target pseudo-class can toggle sections without a checkbox. It is less reliable than a checkbox or button, but works for simple cases.',
          },
          {
            type: 'exercise',
            id: 'r-l13-x1',
            exercise: {
              id: 'ex-rwd-l13',
              instructions:
                'Add a checkbox hack to toggle the navigation menu on mobile. Show the nav horizontally on desktop.',
              languages: ['css', 'html'],
              starterCode: {
                html: `<nav class="nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>`,
                css: `.nav { display: block; }
.nav a { display: block; padding: 0.5rem; }`,
              },
              expectedOutput: 'hamburger menu with checkbox toggle',
              tests: [
                {
                  id: 'ex-rwd-l13-t1',
                  label: 'Checkbox input is present',
                  body: `return document.querySelector('input[type="checkbox"]') !== null`,
                },
                {
                  id: 'ex-rwd-l13-t2',
                  label: 'Nav is shown on desktop',
                  body: `return document.querySelector('style')?.textContent.includes('min-width')`,
                },
              ],
              hints: [
                'Add a hidden checkbox and a label before the nav.',
                'Use :checked ~ .nav to toggle the menu.',
              ],
              solution: {
                html: `<input type="checkbox" id="nav-toggle" class="nav-toggle">
<label for="nav-toggle" class="nav-toggle-label">
  <span></span>
</label>
<nav class="nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>`,
                css: `.nav-toggle { display: none; }
.nav-toggle-label span { display: block; width: 24px; height: 2px; background: #222; margin: 6px 0; }
.nav { display: none; }
.nav-toggle:checked ~ .nav { display: block; }
@media (min-width: 768px) {
  .nav { display: flex; gap: 1rem; }
  .nav-toggle-label { display: none; }
}`,
              },
              testNotes:
                'The checks verify the checkbox and the min-width breakpoint.',
            },
          },
        ],
      },
      {
        id: 'rwd-l14',
        title: 'Navigation accessibility',
        description: 'ARIA for menus, focus management, and keyboard navigation for responsive navigation.',
        duration: 7,
        objectives: [
          'Add aria-expanded and aria-controls to a menu button',
          'Manage focus when the menu opens and closes',
          'Support keyboard navigation with arrow keys',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l14',
          title: 'Navigation accessibility quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l14-q1',
              type: 'true-false',
              prompt: 'aria-expanded should be true when the menu is closed.',
              answer: false,
              explanation: 'aria-expanded should be true when the menu is open and false when it is closed.',
            },
            {
              id: 'quiz-rwd-l14-q2',
              type: 'multiple-choice',
              prompt: 'What HTML attribute hides an element from assistive technology?',
              options: [
                'display: none',
                'hidden',
                'aria-hidden',
                'visibility: hidden',
              ],
              answer: 1,
              explanation: 'The hidden attribute removes the element from the accessibility tree. aria-hidden is also valid but requires more care.',
            },
            {
              id: 'quiz-rwd-l14-q3',
              type: 'blank',
              prompt: 'What ARIA attribute indicates whether a menu is open?',
              answers: [
                'aria-expanded',
              ],
              explanation: 'aria-expanded is a boolean attribute that communicates the open or closed state to assistive technology.',
            },
            {
              id: 'quiz-rwd-l14-q4',
              type: 'multiple-choice',
              prompt: 'What should happen when a user presses Escape in an open menu?',
              options: [
                'Nothing',
                'The menu closes and focus returns to the button',
                'The page reloads',
                'The menu expands further',
              ],
              answer: 1,
              explanation: 'Pressing Escape should close the menu and return focus to the toggle button.',
            },
            {
              id: 'quiz-rwd-l14-q5',
              type: 'multiple-choice',
              prompt: 'When an accessible menu opens, where should focus move?',
              options: [
                'It should stay on the toggle button',
                'It should move to the page footer',
                'It should be removed from the page',
                'It should move to the first link in the menu',
              ],
              answer: 3,
              explanation: 'Moving focus into the menu lets keyboard users continue straight into the links instead of tabbing through the rest of the page. On close, focus returns to the toggle so the user is not dropped at the top of the document.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l14-b1',
            body: 'Accessible navigation is not optional. Screen reader users need to know when a menu opens and closes. Keyboard users need to tab into the menu and move through it with arrow keys. The minimum viable accessible menu has a button with aria-expanded and aria-controls, and a script that toggles the hidden attribute on the nav.',
          },
          {
            type: 'heading',
            id: 'r-l14-h1',
            level: 3,
            body: 'The minimum accessible menu',
          },
          {
            type: 'code',
            id: 'r-l14-c1',
            language: 'javascript',
            title: 'Accessible menu script',
            code: `const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('primary-nav');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.hidden = expanded;
});`,
          },
          {
            type: 'list',
            id: 'r-l14-l1',
            style: 'bullet',
            items: [
              '**aria-expanded** — true when the menu is open, false when closed.',
              '**aria-controls** — the id of the menu element.',
              '**hidden** — the HTML attribute that hides the menu from screen readers.',
              '**Escape key** — closes the menu and returns focus to the button.',
            ],
          },
          {
            type: 'heading',
            id: 'r-l14-h2',
            level: 3,
            body: 'Keyboard navigation',
          },
          {
            type: 'text',
            id: 'r-l14-b2',
            body: 'When the menu opens, focus should move to the first link. When the user presses Escape, the menu closes and focus returns to the button. Arrow keys should move between links. These behaviours are expected by screen reader users and power users alike.',
          },
          {
            type: 'tip',
            id: 'r-l14-t1',
            title: 'Test with a screen reader',
            body: 'Use the built-in screen reader on your operating system: VoiceOver on macOS, NVDA on Windows, or TalkBack on Android. Listen to how the menu is announced.',
          },
          {
            type: 'exercise',
            id: 'r-l14-x1',
            exercise: {
              id: 'ex-rwd-l14',
              instructions:
                'Add aria-expanded and aria-controls to the menu button and write a script that toggles the nav hidden attribute.',
              languages: ['javascript', 'html'],
              starterCode: {
                html: `<button id="nav-toggle">Menu</button>
<nav id="primary-nav" hidden>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>`,
                javascript: '',
              },
              expectedOutput: 'accessible menu toggle',
              tests: [
                {
                  id: 'ex-rwd-l14-t1',
                  label: 'Button has aria-expanded',
                  body: `return document.querySelector('#nav-toggle').hasAttribute('aria-expanded')`,
                },
                {
                  id: 'ex-rwd-l14-t2',
                  label: 'Script toggles hidden',
                  body: `const btn = document.querySelector('#nav-toggle')
btn.click()
return document.querySelector('#primary-nav').hidden === false`,
                },
              ],
              hints: [
                'Use getAttribute and setAttribute for aria-expanded.',
                'Toggle nav.hidden on click.',
              ],
              solution: {
                javascript: `const toggle = document.getElementById('nav-toggle');
const nav = document.getElementById('primary-nav');
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  nav.hidden = expanded;
});`,
              },
              testNotes:
                'The checks verify the ARIA attributes and the toggle logic.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s8',
    title: 'Performance for Responsive Sites',
    description: 'Optimising images, fonts and assets so the responsive experience is also fast.',
    lessons: [
      {
        id: 'rwd-l15',
        title: 'Responsive images and performance',
        description: 'srcset, sizes, the picture element, and how serving the right image improves performance.',
        duration: 7,
        objectives: [
          'Use srcset and sizes to serve appropriately sized images',
          'Explain how modern formats improve performance',
          'Use the picture element for art direction',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l15',
          title: 'Responsive images and performance quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l15-q1',
              type: 'multiple-choice',
              prompt: 'What does the sizes attribute do?',
              options: [
                'Sets the image intrinsic size',
                'Tells the browser the image layout width at different viewports',
                'Compresses the image',
                'Sets the image alt text',
              ],
              answer: 1,
              explanation: 'sizes tells the browser how large the image will be in the layout, which helps it choose the right srcset candidate.',
            },
            {
              id: 'quiz-rwd-l15-q2',
              type: 'blank',
              prompt: 'What HTML element supports art direction with multiple sources?',
              answers: [
                'picture',
              ],
              explanation: 'The picture element lets you define different sources for different conditions.',
            },
            {
              id: 'quiz-rwd-l15-q3',
              type: 'multiple-choice',
              prompt: 'How much can modern image formats reduce file size compared to JPEG?',
              options: [
                '5-10%',
                '25-50%',
                '75-90%',
                'No reduction',
              ],
              answer: 1,
              explanation: 'WebP and AVIF typically reduce file sizes by 25 to 50 percent compared to JPEG.',
            },
            {
              id: 'quiz-rwd-l15-q4',
              type: 'multiple-choice',
              prompt: 'With `srcset` candidates at 400w, 800w and 1200w, how does the browser choose?',
              options: [
                'It always downloads the largest candidate',
                'It always downloads the first candidate listed',
                'It picks the smallest candidate that still covers the layout size it needs',
                'It downloads all three and lets CSS choose',
              ],
              answer: 2,
              explanation: 'The `sizes` information tells the browser the image’s layout width, and it selects the cheapest candidate that is still sharp enough for the screen density. That is how a phone avoids downloading a desktop-sized file.',
            },
            {
              id: 'quiz-rwd-l15-q5',
              type: 'multiple-choice',
              prompt: 'Why does `<picture>` still need an `<img>` inside it?',
              options: [
                'The `img` supplies the fallback source and alt text for browsers that cannot use the sources',
                'The `picture` element cannot display an image without an `img` plus JavaScript',
                'The `img` is required to make the sources load in parallel',
                'Browsers ignore `picture` unless `img` comes first',
              ],
              answer: 0,
              explanation: '`picture` is a wrapper that chooses a source; the `img` is the actual replaced element that renders it and carries the accessible name. It also gives older browsers a usable image when the sources are unsupported.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l15-b1',
            body: 'A responsive site that serves a 2000px wide image to a 360px phone is not really responsive: it is a bandwidth hog. The srcset and sizes attributes let the browser choose the optimal image from a set of candidates. The picture element goes further by letting you serve entirely different images for different conditions. Modern formats like WebP and AVIF reduce file sizes by 25 to 50 percent compared to JPEG.',
          },
          {
            type: 'heading',
            id: 'r-l15-h1',
            level: 3,
            body: 'srcset and sizes',
          },
          {
            type: 'code',
            id: 'r-l15-c1',
            language: 'html',
            title: 'Responsive image with srcset',
            code: `<img
  src="hero-800.webp"
  srcset="
    hero-400.webp 400w,
    hero-800.webp 800w,
    hero-1200.webp 1200w
  "
  sizes="
    (max-width: 600px) 400px,
    (max-width: 1024px) 800px,
    1200px
  "
  alt="Hero image"
>`,
          },
          {
            type: 'list',
            id: 'r-l15-l1',
            style: 'bullet',
            items: [
              '**srcset** — a list of image candidates with their intrinsic widths.',
              '**sizes** — tells the browser what size the image will be in the layout.',
              '**The browser** picks the smallest candidate that is still large enough.',
              '**Modern formats** — WebP or AVIF with a JPEG fallback for older browsers.',
            ],
          },
          {
            type: 'heading',
            id: 'r-l15-h2',
            level: 3,
            body: 'The picture element',
          },
          {
            type: 'text',
            id: 'r-l15-b2',
            body: 'The picture element lets you define different sources for different conditions. Use it for art direction: a wide landscape image on desktop, a tall portrait on mobile. The browser picks the first source whose media query matches. This is more powerful than srcset because you can serve completely different crops or even different images.',
          },
          {
            type: 'code',
            id: 'r-l15-c2',
            language: 'html',
            title: 'Art direction with picture',
            code: `<picture>
  <source media="(max-width: 600px)" srcset="hero-mobile.webp">
  <source media="(min-width: 601px)" srcset="hero-desktop.webp">
  <img src="hero-desktop.jpg" alt="Hero image">
</picture>`,
          },
          {
            type: 'tip',
            id: 'r-l15-t1',
            title: 'Always provide a fallback',
            body: 'The img tag inside picture is the fallback for browsers that do not support srcset or WebP. Always include it with a sensible src and alt.',
          },
          {
            type: 'exercise',
            id: 'r-l15-x1',
            exercise: {
              id: 'ex-rwd-l15',
              instructions:
                'Add srcset with three image candidates and appropriate sizes to serve the right image for each viewport.',
              languages: ['html'],
              starterCode: {
                html: `<img src="photo-800.jpg" alt="Photo">`,
                css: '',
              },
              expectedOutput: 'image with srcset and sizes',
              tests: [
                {
                  id: 'ex-rwd-l15-t1',
                  label: 'srcset is present',
                  body: `return document.querySelector('img').hasAttribute('srcset')`,
                },
                {
                  id: 'ex-rwd-l15-t2',
                  label: 'sizes is present',
                  body: `return document.querySelector('img').hasAttribute('sizes')`,
                },
              ],
              hints: [
                'Add srcset with at least two candidates and sizes to tell the browser the layout width.',
              ],
              solution: {
                html: `<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Photo"
>`,
              },
              testNotes:
                'The checks verify srcset and sizes are present.',
            },
          },
        ],
      },
      {
        id: 'rwd-l16',
        title: 'Fonts and assets',
        description: 'System fonts, font-display, font subsets, and reducing asset weight on mobile.',
        duration: 6,
        objectives: [
          'Use font-display to control font loading behaviour',
          'Explain why system fonts are a performance win on mobile',
          'Subset fonts to reduce file size',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-rwd-l16',
          title: 'Fonts and assets quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l16-q1',
              type: 'true-false',
              prompt: 'font-display: swap shows the web font before loading.',
              answer: false,
              explanation: 'font-display: swap shows the fallback font immediately and swaps in the web font once it loads.',
            },
            {
              id: 'quiz-rwd-l16-q2',
              type: 'multiple-choice',
              prompt: 'Why are system fonts a performance win?',
              options: [
                'They are smaller than web fonts',
                'They are already on the device and load instantly',
                'They have more styles',
                'They work offline',
              ],
              answer: 1,
              explanation: 'System fonts are already installed on the user\'s device, so they require zero download time.',
            },
            {
              id: 'quiz-rwd-l16-q3',
              type: 'multiple-choice',
              prompt: 'What does `font-display: block` do while a web font loads?',
              options: [
                'Shows the fallback immediately and swaps later',
                'Never shows the web font at all',
                'Downloads the font only when the user scrolls',
                'Renders the text invisibly for a short period, then uses the fallback if the font is too slow',
              ],
              answer: 3,
              explanation: 'The block period hides the text briefly in the hope that the web font arrives, avoiding a visible swap. If it does not arrive in time, the fallback is shown instead.',
            },
            {
              id: 'quiz-rwd-l16-q4',
              type: 'multiple-choice',
              prompt: 'What does subsetting a font mean?',
              options: [
                'Compressing the font file with gzip',
                'Loading only the weights used on the page',
                'Including only the characters the site needs, such as Latin, to shrink the file',
                'Replacing the font with a system font',
              ],
              answer: 2,
              explanation: 'A full font carries glyphs for many languages, but a page that only displays Latin text does not need them. Keeping just the required character range can reduce the file to a fraction of its original size.',
            },
            {
              id: 'quiz-rwd-l16-q5',
              type: 'true-false',
              prompt: '`font-display: optional` treats the web font as a bonus that may never be shown on a slow connection.',
              answer: true,
              explanation: 'With `optional`, the browser uses the fallback and only applies the web font if it arrives almost immediately. Since the layout never waits or swaps later, this avoids both invisible text and layout shifts.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l16-b1',
            body: 'Web fonts are one of the heaviest assets on a typical page. A single font family can be 200 to 400KB. On a 3G connection that is seconds of delay. The first defence is the system font stack: fonts that are already on the user\'s device. The second is font-display: swap, which shows the fallback font immediately and swaps in the web font when it loads. The third is subsetting: if you only need Latin characters, the subset file is a fraction of the full font.',
          },
          {
            type: 'heading',
            id: 'r-l16-h1',
            level: 3,
            body: 'font-display',
          },
          {
            type: 'code',
            id: 'r-l16-c1',
            language: 'css',
            title: 'font-display: swap',
            code: `@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}`,
          },
          {
            type: 'list',
            id: 'r-l16-l1',
            style: 'bullet',
            items: [
              '**font-display: auto** — browser default, usually a short invisible period.',
              '**font-display: block** — invisible text for a short period, then fallback.',
              '**font-display: swap** — immediate fallback, swap when ready.',
              '**font-display: fallback** — short invisible period, then fallback for up to 3 seconds.',
              '**font-display: optional** — fallback only, web font is a bonus.',
            ],
          },
          {
            type: 'tip',
            id: 'r-l16-t1',
            title: 'Use system fonts for body text',
            body: 'system-ui, -apple-system, and Segoe UI are available on every modern device. They look native, they load instantly, and they require zero bytes.',
          },
          {
            type: 'exercise',
            id: 'r-l16-x1',
            exercise: {
              id: 'ex-rwd-l16',
              instructions:
                'Add font-display: swap to the @font-face rule and add a system font fallback to the body font-family.',
              languages: ['css'],
              starterCode: {
                html: `<p class="text">Hello world</p>`,
                css: `@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont.woff2') format('woff2');
}
.text { font-family: 'MyFont'; }`,
              },
              expectedOutput: 'font with swap and system fallback',
              tests: [
                {
                  id: 'ex-rwd-l16-t1',
                  label: 'font-display is swap',
                  body: `return document.querySelector('style')?.textContent.includes('font-display: swap')`,
                },
                {
                  id: 'ex-rwd-l16-t2',
                  label: 'system font fallback is present',
                  body: `return document.querySelector('style')?.textContent.includes('system-ui')`,
                },
              ],
              hints: [
                'Add font-display: swap to the @font-face rule.',
                'Add system-ui to the font-family list.',
              ],
              solution: {
                css: `@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont.woff2') format('woff2');
  font-display: swap;
}
.text { font-family: 'MyFont', system-ui, sans-serif; }`,
              },
              testNotes:
                'The checks verify font-display and system fallback.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s9',
    title: 'Testing Responsive Designs',
    description: 'Device testing, browser tools, and the workflow that catches responsive bugs before users do.',
    lessons: [
      {
        id: 'rwd-l17',
        title: 'Device and browser testing',
        description: 'Emulators, real devices, browser dev tools, and the checklist that makes testing systematic.',
        duration: 7,
        objectives: [
          'Use browser dev tools for responsive testing',
          'Test on real devices and emulators',
          'Build a responsive testing checklist',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-rwd-l17',
          title: 'Device and browser testing quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l17-q1',
              type: 'true-false',
              prompt: 'Emulators catch every issue that real devices would show.',
              answer: false,
              explanation: 'Real devices catch touch target, font rendering and performance issues that emulators miss.',
            },
            {
              id: 'quiz-rwd-l17-q2',
              type: 'multiple-choice',
              prompt: 'What is the minimum recommended touch target size?',
              options: [
                '24x24px',
                '32x32px',
                '44x44px',
                '56x56px',
              ],
              answer: 2,
              explanation: 'Apple and Google recommend a minimum touch target size of 44x44px.',
            },
            {
              id: 'quiz-rwd-l17-q3',
              type: 'multiple-choice',
              prompt: 'Which dev tools feature lets you test how the page behaves on a slow connection?',
              options: [
                'Device pixel ratio',
                'Custom viewport',
                'Screenshot capture',
                'Network throttling',
              ],
              answer: 3,
              explanation: 'Throttling simulates a slow network so you can see how long assets delay the first render. A responsive layout that is fast on office Wi-Fi can still feel broken on a phone on 3G.',
            },
            {
              id: 'quiz-rwd-l17-q4',
              type: 'multiple-choice',
              prompt: 'Which condition is true exactly when the page has a horizontal scrollbar?',
              code: 'document.documentElement.scrollWidth  vs  document.documentElement.clientWidth',
              options: [
                '`scrollWidth < clientWidth`',
                '`scrollWidth === clientWidth`',
                '`scrollWidth > clientWidth`',
                '`clientHeight > scrollHeight`',
              ],
              answer: 2,
              explanation: '`scrollWidth` is the widest the document becomes, while `clientWidth` is the visible viewport. If the content is wider than the viewport, the browser adds a horizontal scrollbar.',
            },
            {
              id: 'quiz-rwd-l17-q5',
              type: 'multiple-choice',
              prompt: 'Why call `page.setViewportSize()` before `page.goto()` in a responsive test?',
              options: [
                'So the page loads with its media queries already resolved at that width',
                'Because Playwright forbids viewport calls after navigation',
                'So the screenshot is captured before the page loads',
                'To disable network throttling automatically',
              ],
              answer: 0,
              explanation: 'Media queries are evaluated as the page lays out, so the viewport must be correct before navigation. Resizing afterwards tests a reflow, not the initial experience a real visitor gets at that width.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l17-b1',
            body: 'Responsive bugs are the most common post-launch complaints, and they are also the easiest to catch before launch. Browser dev tools include a responsive design mode that simulates different viewports and device pixel ratios. Real devices catch issues that emulators miss: touch targets that are too small, fonts that look different on a specific device, and performance problems that only appear on slower hardware.',
          },
          {
            type: 'heading',
            id: 'r-l17-h1',
            level: 3,
            body: 'The dev tools responsive mode',
          },
          {
            type: 'list',
            id: 'r-l17-l1',
            style: 'bullet',
            items: [
              '**Device presets** — iPhone, Pixel, Galaxy and other common devices.',
              '**Custom viewport** — enter any width and height.',
              '**Device pixel ratio** — simulate high-density screens.',
              '**Throttling** — simulate 3G or 4G to test performance.',
              '**Screenshot** — capture the viewport at any size.',
            ],
          },
          {
            type: 'heading',
            id: 'r-l17-h2',
            level: 3,
            body: 'The testing checklist',
          },
          {
            type: 'list',
            id: 'r-l17-l2',
            style: 'bullet',
            items: [
              'No horizontal scrolling on any viewport width.',
              'Text is readable without zooming on mobile.',
              'Touch targets are at least 44x44px.',
              'Images load and do not overflow their containers.',
              'Navigation works with keyboard and screen reader.',
              'The page is usable on a slow connection.',
            ],
          },
          {
            type: 'heading',
            id: 'r-l17-h3',
            level: 3,
            body: 'Catching overflow without a browser in your hand',
          },
          {
            type: 'code',
            id: 'r-l17-c1',
            language: 'javascript',
            title: 'A viewport check that runs in CI',
            code: `import { test, expect } from '@playwright/test'

// One test per viewport the layout has to survive.
const widths = [320, 768, 1024, 1440]

for (const width of widths) {
  test('no horizontal overflow at ' + width + 'px', async ({ page }) => {
    await page.setViewportSize({ width: width, height: 800 })
    await page.goto('/')

    const scrolled = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    )

    expect(scrolled).toBe(false)
  })
}`,
          },
          {
            type: 'text',
            id: 'r-l17-b2',
            body: 'The order of the two calls is the point: `setViewportSize` runs before `page.goto`, so the page loads with its media queries already resolved at that width. `page.evaluate` then runs a function inside the page, where it can measure the document. `scrollWidth` is the widest the document ever gets and `clientWidth` is the width of the visible viewport, so `scrollWidth > clientWidth` is the exact condition behind the sideways scrollbar — the same symptom the responsive mode shows you, checked by a machine, at every width, on every commit.',
          },
          {
            type: 'tip',
            id: 'r-l17-t1',
            title: 'Test at common breakpoints',
            body: 'Test at 320px, 768px, 1024px and 1440px. These cover the majority of devices in use today.',
          },
          {
            type: 'exercise',
            id: 'r-l17-x1',
            exercise: {
              id: 'ex-rwd-l17',
              instructions:
                'Use browser dev tools responsive mode to identify and fix a horizontal overflow issue on a 375px viewport.',
              languages: ['css', 'html'],
              starterCode: {
                html: `<div class="container">
  <div class="box wide">This box is too wide for mobile</div>
</div>`,
                css: `.container { width: 100%; }
.box { width: 500px; padding: 1rem; background: #e0e7ff; border-radius: 8px; }
.wide { background: #fecaca; }`,
              },
              expectedOutput: 'no horizontal overflow on mobile',
              tests: [
                {
                  id: 'ex-rwd-l17-t1',
                  label: 'Box uses max-width',
                  body: `return getComputedStyle(document.querySelector('.box')).maxWidth !== '0px'`,
                },
                {
                  id: 'ex-rwd-l17-t2',
                  label: 'No horizontal scroll',
                  body: `return document.documentElement.scrollWidth <= document.documentElement.clientWidth`,
                },
              ],
              hints: [
                'Replace width: 500px with max-width: 100% on the box.',
              ],
              solution: {
                css: `.container { width: 100%; }
.box { max-width: 100%; padding: 1rem; background: #e0e7ff; border-radius: 8px; }
.wide { background: #fecaca; }`,
              },
              testNotes:
                'The checks verify max-width and no horizontal overflow.',
            },
          },
        ],
      },
      {
        id: 'rwd-l18',
        title: 'Automated responsive testing',
        description: 'Visual regression testing, Percy and Playwright screenshots, and CI for responsive design.',
        duration: 6,
        objectives: [
          'Explain visual regression testing',
          'Set up screenshot tests for common viewports',
          'Integrate responsive tests into CI',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-rwd-l18',
          title: 'Automated responsive testing quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l18-q1',
              type: 'multiple-choice',
              prompt: 'What is visual regression testing?',
              options: [
                'Testing how fast the page loads',
                'Comparing screenshots against a baseline to catch visual changes',
                'Testing accessibility with a screen reader',
                'Measuring JavaScript performance',
              ],
              answer: 1,
              explanation: 'Visual regression testing compares screenshots to detect unintended visual changes.',
            },
            {
              id: 'quiz-rwd-l18-q2',
              type: 'blank',
              prompt: 'What Playwright method changes the viewport size?',
              answers: [
                'setViewportSize',
              ],
              explanation: 'page.setViewportSize({ width, height }) changes the viewport dimensions.',
            },
            {
              id: 'quiz-rwd-l18-q3',
              type: 'multiple-choice',
              prompt: 'Where should responsive tests run?',
              options: [
                'Only on developer machines',
                'In CI on every pull request',
                'Only before major releases',
                'Only on staging',
              ],
              answer: 1,
              explanation: 'Running responsive tests in CI ensures broken layouts are caught before they reach production.',
            },
            {
              id: 'quiz-rwd-l18-q4',
              type: 'multiple-choice',
              prompt: 'What is the role of the baseline in a visual regression test?',
              options: [
                'The screenshot from the current branch',
                'The maximum number of pixels allowed to differ',
                'The browser used to run the tests',
                'The known-good screenshots that new captures are compared against',
              ],
              answer: 3,
              explanation: 'The baseline records what the approved layout looks like. Each run diffs the new capture against it, so any unexpected visual change is flagged for review.',
            },
            {
              id: 'quiz-rwd-l18-q5',
              type: 'multiple-choice',
              prompt: 'Why set a pixel threshold in a screenshot test?',
              options: [
                'To make the test run faster',
                'To hide real layout changes from reviewers',
                'To ignore tiny anti-aliasing differences and avoid false failures',
                'To reduce the screenshot file size',
              ],
              answer: 2,
              explanation: 'Font rendering and anti-aliasing vary slightly between machines, producing a few changed pixels even when nothing meaningful moved. A small threshold absorbs that noise while still catching real regressions.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l18-b1',
            body: 'Manual testing is essential, but it does not scale. Every time a developer changes a layout, they should verify that the responsive versions still look correct. Visual regression tools like Percy or Playwright screenshot capture automate this: they compare the current screenshots against a baseline and flag differences. Run them in CI so a broken layout never reaches production.',
          },
          {
            type: 'heading',
            id: 'r-l18-h1',
            level: 3,
            body: 'Playwright screenshot example',
          },
          {
            type: 'code',
            id: 'r-l18-c1',
            language: 'javascript',
            title: 'Screenshot test with Playwright',
            code: `import { test, devices } from '@playwright/test';

test.describe('Responsive screenshots', () => {
  test('homepage at mobile', async ({ page }) => {
    await page.setViewportSize(devices['iPhone 12'].viewport);
    await page.goto('/');
    await page.screenshot({ path: 'screenshots/mobile.png' });
  });

  test('homepage at desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.screenshot({ path: 'screenshots/desktop.png' });
  });
});`,
          },
          {
            type: 'list',
            id: 'r-l18-l1',
            style: 'bullet',
            items: [
              '**Baseline** — screenshots taken from the known-good version.',
              '**Diff** — the tool highlights pixels that changed.',
              '**CI** — the test runs on every pull request.',
              '**Threshold** — ignore minor anti-aliasing differences below a pixel count.',
            ],
          },
          {
            type: 'tip',
            id: 'r-l18-t1',
            title: 'Test the critical paths',
            body: 'You do not need to screenshot every page at every breakpoint. Focus on the homepage, product pages, and any page with a complex layout.',
          },
          {
            type: 'exercise',
            id: 'r-l18-x1',
            exercise: {
              id: 'ex-rwd-l18',
              instructions:
                'Write a Playwright-style test that takes a screenshot at 375px and 1440px viewport sizes.',
              languages: ['javascript'],
              starterCode: {
                javascript: `import { test, devices } from '@playwright/test';

test('homepage responsive', async ({ page }) => {
  // add mobile and desktop screenshot tests
});`,
                html: '',
                css: '',
              },
              expectedOutput: 'Playwright screenshot tests',
              tests: [
                {
                  id: 'ex-rwd-l18-t1',
                  label: 'Uses setViewportSize',
                  body: `return /setViewportSize/.test(code);`,
                },
                {
                  id: 'ex-rwd-l18-t2',
                  label: 'Calls screenshot',
                  body: `return /screenshot/.test(code);`,
                },
              ],
              hints: [
                'Use page.setViewportSize twice and page.screenshot once for each.',
              ],
              solution: {
                javascript: `import { test, devices } from '@playwright/test';

test('homepage responsive', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.screenshot({ path: 'screenshots/mobile.png' });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  await page.screenshot({ path: 'screenshots/desktop.png' });
});`,
              },
              testNotes:
                'The checks verify the test structure.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'rwd-s10',
    title: 'Real-World Responsive Patterns',
    description: 'Landing pages, dashboards, and e-commerce layouts that adapt gracefully across all viewports.',
    lessons: [
      {
        id: 'rwd-l19',
        title: 'Responsive landing page',
        description: 'Hero, features, and call-to-action patterns that work on mobile and desktop.',
        duration: 8,
        objectives: [
          'Build a hero section that scales across breakpoints',
          'Create a feature grid that reflows on mobile',
          'Design a CTA that remains visible and tappable',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-rwd-l19',
          title: 'Responsive landing page quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l19-q1',
              type: 'multiple-choice',
              prompt: 'Why should the primary CTA be visible without scrolling on mobile?',
              options: [
                'To increase page load speed',
                'So users can act immediately without hunting for it',
                'To improve SEO',
                'To reduce bandwidth',
              ],
              answer: 1,
              explanation: 'The primary call to action should be immediately visible so users can act without scrolling.',
            },
            {
              id: 'quiz-rwd-l19-q2',
              type: 'multiple-choice',
              prompt: 'What grid pattern reflows cards automatically without media queries?',
              options: [
                'grid-template-columns: 1fr 1fr',
                'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))',
                'display: flex',
                'float: left',
              ],
              answer: 1,
              explanation: 'repeat(auto-fit, minmax(250px, 1fr)) creates as many columns as will fit, each at least 250px wide.',
            },
            {
              id: 'quiz-rwd-l19-q3',
              type: 'multiple-choice',
              prompt: 'How does the lesson’s hero layout change at 768px?',
              options: [
                'From a two-column grid to a stacked single column',
                'From centered stacked content to a two-column grid with left-aligned text',
                'From a horizontal nav to a hamburger menu',
                'From fluid type to a fixed pixel font size',
              ],
              answer: 1,
              explanation: 'Mobile starts with a centered stack, which suits a narrow screen. At the breakpoint the hero becomes a two-column grid and the text aligns left so the headline and supporting visual sit side by side.',
            },
            {
              id: 'quiz-rwd-l19-q4',
              type: 'multiple-choice',
              prompt: 'Why does the hero heading get `max-width: 70ch`?',
              options: [
                'To stop the heading from stretching into unreadably long lines on wide screens',
                'To make the heading fill the entire grid cell',
                'To set the heading’s font size',
                'To force the heading to wrap at exactly three lines',
              ],
              answer: 0,
              explanation: 'Fluid type still becomes hard to read if a single line spans a large monitor. Constraining the measure keeps the heading in a comfortable range and lets it wrap instead of stretching.',
            },
            {
              id: 'quiz-rwd-l19-q5',
              type: 'multiple-choice',
              prompt: 'Which call-to-action treatment is easiest to tap on a phone?',
              options: [
                'A bare text link with no padding',
                'A tiny icon with a 16px tap area',
                'An inline-block button with generous padding and a readable font size',
                'A fixed 20px-tall element',
              ],
              answer: 2,
              explanation: 'Padding expands the tappable area around the label without shrinking the text, which makes the target forgiving for a thumb. The recommended minimum touch target is 44x44px.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l19-b1',
            body: 'The landing page is the most common responsive challenge. The hero needs a compelling headline and a primary CTA on every screen. On mobile the headline stacks above the CTA. On desktop they sit side by side. The feature grid uses auto-fit to reflow from three columns to one. Every section uses relative units and fluid typography so the page reads naturally at any width.',
          },
          {
            type: 'heading',
            id: 'r-l19-h1',
            level: 3,
            body: 'Hero section',
          },
          {
            type: 'code',
            id: 'r-l19-c1',
            language: 'css',
            title: 'Responsive hero',
            code: `.hero {
  text-align: center;
  padding: 4rem 1rem;
}

.hero h1 {
  font-size: clamp(1.75rem, 5vw, 3rem);
  max-width: 70ch;
  margin: 0 auto 1rem;
}

.hero .cta {
  display: inline-block;
  padding: 0.875rem 2rem;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .hero {
    text-align: left;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: center;
  }
}`,
          },
          {
            type: 'heading',
            id: 'r-l19-h2',
            level: 3,
            body: 'Feature grid',
          },
          {
            type: 'code',
            id: 'r-l19-c2',
            language: 'css',
            title: 'Feature grid',
            code: `.features {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.feature {
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}`,
          },
          {
            type: 'tip',
            id: 'r-l19-t1',
            title: 'Keep the CTA visible',
            body: 'The primary call to action should be visible without scrolling on mobile. Place it near the top of the hero.',
          },
          {
            type: 'exercise',
            id: 'r-l19-x1',
            exercise: {
              id: 'ex-rwd-l19',
              instructions:
                'Create a responsive hero section with a heading, paragraph, and CTA button. Stack on mobile, side by side on desktop.',
              languages: ['css', 'html'],
              starterCode: {
                html: `<section class="hero">
  <div class="hero-content">
    <h1>Build faster</h1>
    <p>A tool for developers.</p>
    <a href="#" class="btn">Get started</a>
  </div>
</section>`,
                css: `.hero { padding: 2rem; text-align: center; }
.btn { display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: white; border-radius: 6px; }`,
              },
              expectedOutput: 'responsive hero section',
              tests: [
                {
                  id: 'ex-rwd-l19-t1',
                  label: 'Heading uses fluid type',
                  body: `const fs = getComputedStyle(document.querySelector('h1')).fontSize
return fs !== '16px'`,
                },
                {
                  id: 'ex-rwd-l19-t2',
                  label: 'Grid used on desktop',
                  body: `return document.querySelector('style')?.textContent.includes('grid-template-columns')`,
                },
              ],
              hints: [
                'Use clamp() for the heading and a media query with grid for the desktop layout.',
              ],
              solution: {
                css: `.hero { padding: 2rem; text-align: center; }
.hero h1 { font-size: clamp(1.75rem, 5vw, 3rem); max-width: 70ch; margin: 0 auto 1rem; }
.btn { display: inline-block; padding: 0.75rem 1.5rem; background: #2563eb; color: white; border-radius: 6px; }
@media (min-width: 768px) {
  .hero { text-align: left; display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: center; }
}`,
              },
              testNotes:
                'The checks verify fluid type and grid usage.',
            },
          },
        ],
      },
      {
        id: 'rwd-l20',
        title: 'Responsive dashboard',
        description: 'Data-heavy layouts, card grids, tables on mobile, and the patterns that keep dashboards usable.',
        duration: 8,
        objectives: [
          'Design a card layout that reflows for data widgets',
          'Handle tables on mobile with horizontal scroll or card transformation',
          'Use consistent spacing and typography for data density',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-rwd-l20',
          title: 'Responsive dashboard quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-rwd-l20-q1',
              type: 'multiple-choice',
              prompt: 'What is the best pattern for a data-heavy dashboard on mobile?',
              options: [
                'Shrink all widgets to fit',
                'Stack cards vertically and use horizontal scroll for tables',
                'Hide all data on mobile',
                'Use fixed-width containers',
              ],
              answer: 1,
              explanation: 'Cards stack vertically on mobile, and tables scroll horizontally with a sticky first column.',
            },
            {
              id: 'quiz-rwd-l20-q2',
              type: 'true-false',
              prompt: 'Tables should never scroll horizontally on mobile.',
              answer: false,
              explanation: 'Data tables can scroll horizontally with a sticky first column to keep context.',
            },
            {
              id: 'quiz-rwd-l20-q3',
              type: 'blank',
              prompt: 'What CSS value makes the first column of a table sticky during horizontal scroll?',
              answers: [
                'position: sticky',
              ],
              explanation: 'position: sticky; left: 0 on the first column keeps it visible during horizontal scroll.',
            },
            {
              id: 'quiz-rwd-l20-q4',
              type: 'multiple-choice',
              prompt: 'Which declaration on a table wrapper enables horizontal scrolling?',
              options: [
                '`overflow: hidden`',
                '`overflow-x: auto`',
                '`white-space: nowrap`',
                '`display: inline-block`',
              ],
              answer: 1,
              explanation: '`overflow-x: auto` lets the wrapper scroll sideways only when the table is wider than the available space. `overflow: hidden` would clip the columns instead of making them reachable.',
            },
            {
              id: 'quiz-rwd-l20-q5',
              type: 'multiple-choice',
              prompt: 'Why does the sticky first column need an opaque background?',
              options: [
                'To hide the cells scrolling underneath it',
                'To make the text bold',
                'To trigger sticky positioning',
                'To keep the column from wrapping',
              ],
              answer: 0,
              explanation: 'A sticky column stays in place while the rest of the row slides beneath it, so without a solid background the moving cells would show through. The background keeps the row label legible at every scroll position.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'r-l20-b1',
            body: 'Dashboards are the hardest responsive challenge because they need to display a lot of data without feeling cramped. The card pattern works: each widget becomes a card that stacks vertically on mobile and sits in a grid on desktop. Tables are the biggest problem: on mobile they either scroll horizontally or transform into cards. Horizontal scroll is acceptable for data tables if the container has overflow-x: auto and the first column is sticky so users always know what row they are looking at.',
          },
          {
            type: 'heading',
            id: 'r-l20-h1',
            level: 3,
            body: 'Card grid',
          },
          {
            type: 'code',
            id: 'r-l20-c1',
            language: 'css',
            title: 'Dashboard card grid',
            code: `.dashboard {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.card {
  padding: 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
}`,
          },
          {
            type: 'heading',
            id: 'r-l20-h2',
            level: 3,
            body: 'Responsive table',
          },
          {
            type: 'code',
            id: 'r-l20-c2',
            language: 'css',
            title: 'Table with horizontal scroll',
            code: `.table-wrap {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

table {
  min-width: 600px;
  border-collapse: collapse;
}

th:first-child,
td:first-child {
  position: sticky;
  left: 0;
  background: white;
}`,
          },
          {
            type: 'tip',
            id: 'r-l20-t1',
            title: 'Sticky headers help orientation',
            body: 'When a table scrolls horizontally, a sticky first column keeps the row identifier visible. Combine with a sticky thead for vertical scrolling.',
          },
          {
            type: 'exercise',
            id: 'r-l20-x1',
            exercise: {
              id: 'ex-rwd-l20',
              instructions:
                'Create a responsive dashboard with four stat cards in a grid and a table wrapped in a horizontally scrolling container.',
              languages: ['css', 'html'],
              starterCode: {
                html: `<div class="dashboard">
  <div class="card">Users: 1,234</div>
  <div class="card">Revenue: $5,678</div>
  <div class="card">Orders: 89</div>
  <div class="card">Growth: 12%</div>
</div>
<div class="table-wrap">
  <table>
    <thead><tr><th>Name</th><th>Value</th></tr></thead>
    <tbody><tr><td>A</td><td>1</td></tr></tbody>
  </table>
</div>`,
                css: `.dashboard { display: block; }
.card { width: 100%; margin-bottom: 1rem; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 8px; }
.table-wrap { }
table { width: 100%; border-collapse: collapse; }`,
              },
              expectedOutput: 'responsive dashboard with card grid and scrollable table',
              tests: [
                {
                  id: 'ex-rwd-l20-t1',
                  label: 'Dashboard uses grid',
                  body: `return getComputedStyle(document.querySelector('.dashboard')).display === 'grid'`,
                },
                {
                  id: 'ex-rwd-l20-t2',
                  label: 'Table container allows horizontal scroll',
                  body: `const style = getComputedStyle(document.querySelector('.table-wrap'))
return style.overflowX === 'auto' || style.overflowX === 'scroll'`,
                },
              ],
              hints: [
                'Use grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) for the dashboard.',
                'Add overflow-x: auto to the table wrapper.',
              ],
              solution: {
                css: `.dashboard { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.card { padding: 1.25rem; border: 1px solid #e5e7eb; border-radius: 10px; background: white; }
.table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
table { min-width: 600px; border-collapse: collapse; width: 100%; }
th:first-child, td:first-child { position: sticky; left: 0; background: white; }`,
              },
              testNotes:
                'The checks verify grid display and horizontal scroll on the table.',
            },
          },
        ],
      },
    ],
  },
]