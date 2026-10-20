import type { Section } from '~/types/content'

export const frontendProjectsShipSections: Section[] = [
  {
    id: 'fp-s9',
    title: 'Ship and present',
    description:
      'Put a static build on a real URL, write the README that explains it, and present the work without overclaiming.',
    lessons: [
      {
        id: 'fp-l17',
        title: 'Deploy a static build',
        description: 'Preparing a project folder, fixing paths and secrets, and checking the deployed URL like a visitor.',
        duration: 8,
        objectives: [
          'Prepare a static project folder for hosting',
          'Use relative asset paths that survive a subpath',
          'Verify the deployed site in a private window and on a phone',
        ],
        xp: 50,
        content: [
          {
            type: 'text',
            id: 'fp-l17-intro',
            body: '**A project is not shipped until someone else can open it.** For the capstones, shipping is simpler than it sounds: the output is a folder of static files. There is no database and no server code, so any static host can serve it.',
          },
          {
            type: 'heading',
            id: 'fp-l17-h1',
            level: 3,
            body: 'The folder is the deployment',
          },
          {
            type: 'code',
            id: 'fp-l17-code1',
            language: 'plaintext',
            title: 'What goes on the host',
            code: `project/
  index.html
  style.css
  script.js
  img/
    portrait.jpg
    hero.jpg`,
          },
          {
            type: 'text',
            id: 'fp-l17-b2',
            body: 'Everything the page needs is committed and inside the folder. That includes images, fonts and any JSON the page fetches. A file that only exists on your machine is not part of the build, even if the page works locally.',
          },
          {
            type: 'heading',
            id: 'fp-l17-h2',
            level: 3,
            body: 'Three ways to get a URL',
          },
          {
            type: 'list',
            id: 'fp-l17-list1',
            style: 'bullet',
            items: [
              '**GitHub Pages** — push the repository, open Settings → Pages, choose the branch and folder, then wait for the published URL.',
              '**Netlify Drop** — drag the project folder onto the drop page and get a URL in a few seconds. Good for a one-off review.',
              '**Vercel or a similar static host** — import the repository or run the CLI in the project folder.',
            ],
          },
          {
            type: 'text',
            id: 'fp-l17-b3',
            body: 'The platform matters less than the checks below. Any of the three serves the same folder; the differences are the URL, the build step and how updates are published. Pick one, learn its deploy path, and move on.',
          },
          {
            type: 'heading',
            id: 'fp-l17-h3',
            level: 3,
            body: 'Relative paths, or the page half-loads',
          },
          {
            type: 'code',
            id: 'fp-l17-code2',
            language: 'html',
            title: 'The same page at two hosting paths',
            code: `<!-- Relative: works at / and at /my-project/ -->
<link rel="stylesheet" href="style.css" />
<script src="script.js" defer></script>
<img src="img/portrait.jpg" alt="Alex Rivera smiling" />

<!-- Absolute: works at /, breaks at /my-project/ -->
<link rel="stylesheet" href="/style.css" />
<script src="/script.js" defer></script>`,
          },
          {
            type: 'text',
            id: 'fp-l17-b4',
            body: 'A leading slash means "from the root of the domain". GitHub Pages often serves a project from `/repository-name/`, so `/style.css` asks for a file that does not exist there. Relative paths keep the same folder working locally and on the host.',
          },
          {
            type: 'heading',
            id: 'fp-l17-h4',
            level: 3,
            body: 'Before you publish',
          },
          {
            type: 'list',
            id: 'fp-l17-list2',
            style: 'ordered',
            items: [
              'Serve the folder over HTTP locally and check every link, image and script.',
              'Search the source for `localhost` URLs, `file://` paths and API keys.',
              'Check the console and network panel for 404s and errors.',
              'Set a real page title and a meta description.',
              'Deploy, then open the URL in a private window and on a phone.',
              'Tab through the deployed page and submit the contact form (or confirm it is a demo).',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l17-warn',
            title: 'Front-end files are public',
            body: 'An API key in `script.js` is not hidden by the browser; it is downloaded by every visitor. Static hosting has no server-side secret store. If a project needs a private key, it needs a small backend or serverless function — or it should use a public, read-only API instead.',
          },
          {
            type: 'tip',
            id: 'fp-l17-tip',
            title: 'Test the URL, not the folder',
            body: 'The local page can work while the deployed page is broken by a path, a case difference or a file that was never committed. Open the deployed URL in a private window, with no cache and no local session, and click through it as a visitor would.',
          },
          {
            type: 'heading',
            id: 'fp-l17-h5',
            level: 3,
            body: 'Your checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l17-b5',
            body: 'Pick one capstone, download its files, and deploy the folder. The landing page is the simplest test: it is static, it has images and it already has a narrow layout to check on a phone.',
          },
          {
            type: 'project',
            id: 'fp-l17-project',
            projectSlug: 'responsive-landing-page',
            title: 'Deploy the landing page',
            body: 'Open the workspace, download the files you wrote, fix any absolute paths, and put the folder on a static host. Then open the URL somewhere that is not your development browser.',
          },
        ],
      },
      {
        id: 'fp-l18',
        title: 'Write the README and present the work',
        description: 'A README that explains how to run the project, and a two-minute story about the decisions behind it.',
        duration: 6,
        objectives: [
          'Write a README with a live link, a screenshot and run instructions',
          'Turn a build into a portfolio entry about decisions, not features',
          'Present a project in two minutes without overclaiming',
        ],
        xp: 40,
        content: [
          {
            type: 'text',
            id: 'fp-l18-intro',
            body: '**The work is not finished when the page loads.** A stranger needs to know what it is, how to run it, and why it was built that way. That is the README, the portfolio entry and the two-minute walkthrough — three versions of the same explanation for three different readers.',
          },
          {
            type: 'heading',
            id: 'fp-l18-h1',
            level: 3,
            body: 'The README',
          },
          {
            type: 'code',
            id: 'fp-l18-code1',
            language: 'plaintext',
            title: 'A README that answers the first questions',
            code: `# Ledger landing page

A responsive product page for a one-person bookkeeping tool.

[Live site](https://example.com) · [Source](https://github.com/you/ledger)

![Screenshot of the landing page at desktop width](docs/screenshot.png)

## What it does

One page with a hero, three features, two prices and a closing call to action.
The navigation links to each section.

## Built with

HTML, CSS and no JavaScript. Grid for the feature and pricing areas, one
720px breakpoint, and a reduced-motion guard.

## Run locally

\`\`\`bash
npx serve .
\`\`\`

Open the URL it prints.

## Decisions

The narrow layout is the base; the breakpoint only changes the grid columns.
The hero image uses explicit dimensions so the text does not shift while it
loads.

## Next

Add a real form endpoint and test the page with a screen reader.`,
          },
          {
            type: 'list',
            id: 'fp-l18-list1',
            style: 'bullet',
            items: [
              'The first line says what the project is, not "My Project".',
              'The live link and the source are both one click away.',
              'The screenshot shows the page at a width a visitor will recognise.',
              'Run instructions work from a clean checkout.',
              'The decisions section names a tradeoff, not a list of technologies.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l18-h2',
            level: 3,
            body: 'The portfolio entry',
          },
          {
            type: 'text',
            id: 'fp-l18-b2',
            body: 'A portfolio entry is not a feature list. It is a short story with four beats: the problem, one real constraint, the decision you made, and the result. "Built a todo app with localStorage" is a feature list. "The list had to survive a reload without a backend, so every mutation writes one JSON array and the screen is always rendered from it" is a decision.',
          },
          {
            type: 'list',
            id: 'fp-l18-list2',
            style: 'ordered',
            items: [
              '**Problem** — who is this for, and what were they trying to do?',
              '**Constraint** — time, technology, accessibility, or a requirement you could not change.',
              '**Decision** — the one choice that shaped the build, and what you gave up for it.',
              '**Result** — the live link, one screenshot, and what you would change next.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l18-h3',
            level: 3,
            body: 'The two-minute walkthrough',
          },
          {
            type: 'text',
            id: 'fp-l18-b3',
            body: 'Start with the brief in one sentence. Show the live page at a narrow width, then a wide one. Point at one decision and explain why. Finish with the thing you would do next. Do not narrate every file; the README already does that. The walkthrough is for the part a repository cannot show: your judgement.',
          },
          {
            type: 'warning',
            id: 'fp-l18-warn',
            title: 'Do not claim what you did not build',
            body: 'A README that promises authentication, a database or a working contact form has to deliver them. A contact form with `action="/contact"` on a static host does not send anything. Either connect it to a real endpoint or label it as a demo. Overclaiming is the fastest way to lose trust in an interview.',
          },
          {
            type: 'tip',
            id: 'fp-l18-tip',
            title: 'Record the walkthrough once',
            body: 'A 60-second screen recording is easier to review than a live demo and forces you to find the one decision worth explaining. Record it, watch it without sound, and check that the page you are describing is the page on screen.',
          },
          {
            type: 'heading',
            id: 'fp-l18-h4',
            level: 3,
            body: 'Finish the path',
          },
          {
            type: 'text',
            id: 'fp-l18-b4',
            body: 'You have five capstones, at least one deployed URL and a README that explains the decisions. That is a portfolio. The next project does not need to be bigger; it needs to start from a brief you have not solved before, and go through the same loop: plan, build, verify, ship, explain.',
          },
        ],
      },
    ],
    quiz: {
      id: 'quiz-fp-s9',
      title: 'Ship and present check',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-fp-s9-q1',
          type: 'multiple-choice',
          prompt: 'A project is hosted at /my-project/. Which stylesheet link works there?',
          options: [
            '<link rel="stylesheet" href="/style.css">',
            '<link rel="stylesheet" href="style.css">',
            '<link rel="stylesheet" href="file:///style.css">',
            '<link rel="stylesheet" href="localhost/style.css">',
          ],
          answer: 1,
          explanation:
            'A relative path resolves from the page\'s own folder, so it works at the root and under a subpath. A leading slash resolves from the domain root.',
        },
        {
          id: 'quiz-fp-s9-q2',
          type: 'true-false',
          prompt: 'An API key placed in a front-end JavaScript file is hidden from visitors.',
          answer: false,
          explanation:
            'Every file the browser runs is public. A private key needs a backend or serverless function; a static host cannot keep it secret.',
        },
        {
          id: 'quiz-fp-s9-q3',
          type: 'multiple-choice',
          prompt: 'What should a project README include first?',
          options: [
            'A list of every CSS property used',
            'What the project is, a live link and how to run it',
            'The entire source code',
            'A promise of features that are not built',
          ],
          answer: 1,
          explanation:
            'The README answers the first questions a visitor has: what is this, where can I see it, and how do I run it.',
        },
        {
          id: 'quiz-fp-s9-q4',
          type: 'multiple-choice',
          prompt: 'Which portfolio entry is strongest?',
          options: [
            'Built a todo app with HTML, CSS and JavaScript.',
            'Used localStorage and CSS grid.',
            'The list had to survive a reload without a backend, so every change writes one JSON array and renders from it.',
            'A beautiful modern responsive website.',
          ],
          answer: 2,
          explanation:
            'It names the constraint, the decision and the tradeoff. That is the part an interviewer cannot infer from the source alone.',
        },
        {
          id: 'quiz-fp-s9-q5',
          type: 'identify-error',
          prompt: 'What is wrong with committing this file?',
          code: '// config.js\nconst API_KEY = "sk-live-123456789";\nexport { API_KEY };',
          options: [
            'The variable name is too short',
            'The secret is public in the deployed JavaScript and must be removed and rotated',
            'It should use var instead of const',
            'It needs a semicolon',
          ],
          answer: 1,
          explanation:
            'Static files are downloaded by every visitor. Remove the key from the repository, rotate it, and call the API through a server or serverless function that can keep a secret.',
        },
      ],
    },
  },
]
