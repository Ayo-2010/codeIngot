import type { Section } from '~/types/content'

export const frontendProjectsProfileSections: Section[] = [
  {
    id: 'fp-s4',
    title: 'Capstone: Personal Profile Page',
    description:
      'A structure-first build: landmarks, a heading outline, a portrait and a contact form, all complete before the first stylesheet.',
    lessons: [
      {
        id: 'fp-l7',
        title: 'Plan the profile page',
        description: 'Reading the brief, inventorying the page, and writing the heading outline before any markup.',
        duration: 6,
        objectives: [
          'Turn a project brief into a list of sections and components',
          'Write a heading outline with one h1 and no skipped levels',
          'Choose the landmark elements the page needs before styling it',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-fp-l7',
          title: 'Plan the profile page quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l7-q1',
              type: 'multiple-choice',
              prompt: 'Which element should contain the page\'s unique primary content?',
              options: [
                '<section>',
                '<main>',
                '<article>',
                '<div>',
              ],
              answer: 1,
              explanation: 'main is the landmark for the primary content of the page. A page has one main region, and it is the fastest way for assistive technology to skip the repeated header and navigation.',
            },
            {
              id: 'quiz-fp-l7-q2',
              type: 'blank',
              prompt: 'The HTML element used for the page\'s primary content is ___.',
              answers: [
                'main',
                '<main>',
              ],
              explanation: 'main is the landmark that holds the content unique to this page.',
            },
            {
              id: 'quiz-fp-l7-q3',
              type: 'identify-error',
              prompt: 'What is wrong with this heading outline?',
              code: '<h1>Alex Rivera</h1>\n<h3>About</h3>\n<h3>Skills</h3>\n<h3>Contact</h3>',
              options: [
                'There is more than one heading',
                'The section headings skip h2',
                'Headings must be inside a div',
                'h1 should come last',
              ],
              answer: 1,
              explanation: 'The outline jumps from h1 to h3. The three peer sections should use h2, so the document has no missing level.',
            },
            {
              id: 'quiz-fp-l7-q4',
              type: 'multiple-choice',
              prompt: 'How should the Skills content be marked up on the profile page?',
              options: [
                'A paragraph listing technologies separated by commas',
                'A table with one column',
                'A run of h3 headings, one per skill',
                'An unordered list of the technologies the person actually uses',
              ],
              answer: 3,
              explanation: 'A list is what assistive technology announces as a set of related items, so the skills read as a group. Headings would put them in the page outline as if each were its own section.',
            },
            {
              id: 'quiz-fp-l7-q5',
              type: 'multiple-choice',
              prompt: 'Which landmark should hold the in-page links to About, Skills and Contact?',
              options: [
                'main',
                'footer',
                'nav',
                'article',
              ],
              answer: 2,
              explanation: 'nav marks a collection of navigation links, and here it sits inside the header. That lets a screen reader user jump straight to the links without reading the page from the top.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l7-intro',
            body: '**The profile page is the capstone you can finish without JavaScript.** That is the point of it. A portrait, a short introduction, three content sections and a contact form are enough to practise the decision that is hardest to change later: what each part of the page *is*.',
          },
          {
            type: 'text',
            id: 'fp-l7-b2',
            body: 'The workspace gives you a brief, a design reference, a starter file and eight checks. Before you open the starter, turn the brief into an inventory. The inventory is the plan you will follow for the rest of the build, and it is much cheaper to change than the markup.',
          },
          {
            type: 'heading',
            id: 'fp-l7-h1',
            level: 3,
            body: 'The inventory',
          },
          {
            type: 'list',
            id: 'fp-l7-list1',
            style: 'bullet',
            items: [
              '**Header** — the person\'s name as a wordmark, plus in-page links to About, Skills and Contact.',
              '**Profile block** — a portrait, the name as the page heading, a role line and one short introduction.',
              '**About** — three real sentences about the person, not placeholder text.',
              '**Skills** — an unordered list of technologies, each one a real thing the person uses.',
              '**Contact** — a short invitation and a form with a name field, an email field and a submit button.',
              '**Footer** — a copyright line and one external link.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l7-h2',
            level: 3,
            body: 'The non-negotiables',
          },
          {
            type: 'text',
            id: 'fp-l7-b3',
            body: 'The checklist is not a suggestion; it is the definition of done. Six of its eight items are structure, which is why this lesson spends its time there. The last two are a manual review of image dimensions and the quality of the About text.',
          },
          {
            type: 'list',
            id: 'fp-l7-list2',
            style: 'ordered',
            items: [
              'Exactly one `main`, with the id `main`.',
              'A `header`, a `nav`, a `footer`, an `article` and at least three `section` elements.',
              'Sections for About, Skills and Contact, each with its own heading.',
              'A profile image with descriptive alt text and explicit `width` and `height`.',
              'A `<ul>` of skills and at least one external link.',
              'A contact form with at least two labelled controls and a submit button.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l7-h3',
            level: 3,
            body: 'The outline before the boxes',
          },
          {
            type: 'text',
            id: 'fp-l7-b4',
            body: 'Write the headings first, in order. This is the part a screen reader user hears when they ask the page for its outline, and it is also the fastest way to notice that a section is really two sections or that a heading is missing.',
          },
          {
            type: 'code',
            id: 'fp-l7-code1',
            language: 'html',
            title: 'The heading outline, before any markup',
            code: `h1  Alex Rivera
  h2  About
  h2  Skills
  h2  Contact`,
          },
          {
            type: 'text',
            id: 'fp-l7-b5',
            body: 'The name is the one `h1`: it is the subject of the page. About, Skills and Contact are peer sections, so they are all `h2`. Nothing is skipped, and no section is introduced by a styled paragraph pretending to be a heading.',
          },
          {
            type: 'code',
            id: 'fp-l7-code2',
            language: 'html',
            title: 'The landmarks that carry the outline',
            code: `<body>
  <header>
    <p class="brand">Alex Rivera</p>
    <nav aria-label="Main">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main id="main">
    <article>
      <!-- portrait, h1 and introduction -->
    </article>

    <section id="about">
      <h2>About</h2>
    </section>

    <section id="skills">
      <h2>Skills</h2>
    </section>

    <section id="contact">
      <h2>Contact</h2>
    </section>
  </main>

  <footer>
    <p>Copyright 2026 Alex Rivera</p>
  </footer>
</body>`,
          },
          {
            type: 'warning',
            id: 'fp-l7-warn',
            title: 'One h1, one main, no skipped levels',
            body: 'The page has one subject, so it gets one `h1`. There is one primary content region, so it gets one `main`. A heading that jumps from `h1` to `h3` reads like a missing section to assistive technology, even when the smaller text looks right on screen. If the outline is wrong, fix the outline rather than the font size.',
          },
          {
            type: 'tip',
            id: 'fp-l7-tip',
            title: 'Plan in the order you will build',
            body: 'Do not try to write the whole page at once. Build the landmarks, then the profile block, then the three sections, then the form. Each step is small enough to check against the brief before the next one makes it harder to see what changed.',
          },
          {
            type: 'heading',
            id: 'fp-l7-h4',
            level: 3,
            body: 'Your checkpoint',
          },
          {
            type: 'text',
            id: 'fp-l7-b6',
            body: 'Open the workspace, read the eight checks, and write the landmarks and the heading outline into the starter. Do not add a stylesheet yet. The next lesson takes the same page from a correct outline to a submitted build.',
          },
          {
            type: 'project',
            id: 'fp-l7-project',
            projectSlug: 'personal-profile-page',
            title: 'Start the profile page',
            body: 'The workspace has the brief, the design reference, the starter file and the checklist. Build the skeleton first; the automated checks will tell you what is still missing.',
          },
        ],
      },
      {
        id: 'fp-l8',
        title: 'Build and submit the profile page',
        description: 'Filling the outline with real content, checking the images and form, and running the project checklist.',
        duration: 8,
        objectives: [
          'Write the document skeleton and the profile block from the outline',
          'Label every form control and give every image useful alt text',
          'Run the automated checks and the manual review before submitting',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-fp-l8',
          title: 'Build and submit the profile page quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-fp-l8-q1',
              type: 'true-false',
              prompt: 'Every image must have a non-empty alt attribute.',
              answer: false,
              explanation: 'A decorative image should use alt="" so it is skipped. A meaningful image needs descriptive alt text; omitting the attribute entirely is the mistake.',
            },
            {
              id: 'quiz-fp-l8-q2',
              type: 'multiple-choice',
              prompt: 'Why give a profile image explicit width and height attributes?',
              options: [
                'To make the file smaller',
                'To reserve space and avoid layout shift while it loads',
                'To improve the colour accuracy',
                'To add a border automatically',
              ],
              answer: 1,
              explanation: 'The browser can reserve the correct box before the image arrives, so the text does not jump when it loads.',
            },
            {
              id: 'quiz-fp-l8-q3',
              type: 'multiple-choice',
              prompt: 'Which document title best follows the advice in the lesson?',
              options: [
                'My Website',
                'Portfolio',
                'Alex Rivera — front-end developer',
                'Home',
              ],
              answer: 2,
              explanation: 'A title should say who the page is about before it is opened, which matters in search results and browser tabs. Generic words such as "Portfolio" describe a category rather than this person.',
            },
            {
              id: 'quiz-fp-l8-q4',
              type: 'multiple-choice',
              prompt: 'In the contact form, what makes `<label for="email">` name the email input?',
              options: [
                'The label sits above the input in the markup',
                'The input has id="email", matching the for value',
                'The input has type="email"',
                'The form uses method="post"',
              ],
              answer: 1,
              explanation: 'A for attribute names the control whose id matches it, so the text and the field are linked programmatically. Proximity on screen means nothing to a screen reader.',
            },
            {
              id: 'quiz-fp-l8-q5',
              type: 'multiple-choice',
              prompt: 'Why read the page with the stylesheet disabled during the outline audit?',
              options: [
                'To measure how quickly the page loads',
                'To test the print layout',
                'To check whether the web fonts arrived',
                'To confirm the structure and content still make sense without the visual design',
              ],
              answer: 3,
              explanation: 'With no CSS, only the markup remains, so a missing heading or a div pretending to be content is obvious. A page that reads correctly unstyled will also read correctly to assistive technology.',
            },
          ],
        },
        content: [
          {
            type: 'text',
            id: 'fp-l8-intro',
            body: '**A correct page still reads correctly with the stylesheet switched off.** That is the test this build is designed around. The visual design is allowed to be plain; the structure has to survive without it.',
          },
          {
            type: 'heading',
            id: 'fp-l8-h1',
            level: 3,
            body: 'Milestone 1: the document skeleton',
          },
          {
            type: 'text',
            id: 'fp-l8-b2',
            body: 'Start with the doctype, the language on the `html` element, the character set, the viewport and a title that describes the person. A title like "My Website" tells a search result nothing; "Alex Rivera — front-end developer" tells it who the page is about before it is opened.',
          },
          {
            type: 'code',
            id: 'fp-l8-code1',
            language: 'html',
            title: 'The first ten lines',
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alex Rivera — front-end developer</title>
  </head>
  <body>
    <!-- landmarks and content go here -->
  </body>
</html>`,
          },
          {
            type: 'heading',
            id: 'fp-l8-h2',
            level: 3,
            body: 'Milestone 2: the profile block',
          },
          {
            type: 'text',
            id: 'fp-l8-b3',
            body: 'The portrait and the introduction belong together, so they go inside one `article`. The article gets the `figure`, the name as `h1`, the role and a link. Explicit `width` and `height` are not decoration: they reserve the right amount of space before the image loads, so the text does not jump underneath it.',
          },
          {
            type: 'code',
            id: 'fp-l8-code2',
            language: 'html',
            title: 'A profile block that carries its own meaning',
            code: `<article class="profile">
  <img
    src="img/portrait.jpg"
    alt="Alex Rivera smiling in a garden"
    width="160"
    height="160"
  />
  <h1>Alex Rivera</h1>
  <p class="role">Front-end developer</p>
  <p>
    I build interfaces for people who use the web every day, and I care about
    the parts nobody notices until they break.
  </p>
</article>`,
          },
          {
            type: 'list',
            id: 'fp-l8-list1',
            style: 'bullet',
            items: [
              'The alt text describes what the image shows, not the filename or the word "portrait".',
              'The `h1` is the person\'s name, not the word "Profile".',
              'The introduction is real prose: three sentences a stranger could read.',
              'The image has `width` and `height`; a below-the-fold image also gets `loading="lazy"`.',
            ],
          },
          {
            type: 'heading',
            id: 'fp-l8-h3',
            level: 3,
            body: 'Milestone 3: About, Skills and Contact',
          },
          {
            type: 'text',
            id: 'fp-l8-b4',
            body: 'Each section starts with its heading, then the content that belongs to it. About is a paragraph. Skills is a real list, because a list is what a screen reader announces as a set of related items. Contact is a form, and a form is only as good as its labels.',
          },
          {
            type: 'code',
            id: 'fp-l8-code3',
            language: 'html',
            title: 'A contact form with names for every control',
            code: `<section id="contact">
  <h2>Contact</h2>
  <p>Open to contract work and interesting problems.</p>

  <form action="/contact" method="post">
    <label for="name">Your name</label>
    <input id="name" name="name" type="text" autocomplete="name" />

    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email" />

    <button type="submit">Send message</button>
  </form>
</section>`,
          },
          {
            type: 'text',
            id: 'fp-l8-b5',
            body: 'The `for` on each label matches the `id` on its input. The `name` is what the server receives, and `autocomplete` lets the browser fill the fields correctly. A placeholder can still describe the expected format, but it cannot replace the label: it disappears as soon as typing starts.',
          },
          {
            type: 'heading',
            id: 'fp-l8-h4',
            level: 3,
            body: 'Milestone 4: the outline audit',
          },
          {
            type: 'list',
            id: 'fp-l8-list2',
            style: 'ordered',
            items: [
              'Read the page from top to bottom with the stylesheet disabled.',
              'Check there is one `h1`, one `main` and no heading level skipped.',
              'Tab through the page: every link, field and button has a visible focus ring.',
              'Check every image has alt text and dimensions; decorative images use `alt=""`.',
              'Run the automated checklist, then read the manual items honestly.',
            ],
          },
          {
            type: 'warning',
            id: 'fp-l8-warn',
            title: 'An empty alt is not a missing alt',
            body: '`alt=""` tells a screen reader to skip an image that adds no information. Omitting the attribute makes the screen reader announce the filename instead. A decorative flourish gets `alt=""`; a portrait that shows the person gets a description. The two are not interchangeable.',
          },
          {
            type: 'tip',
            id: 'fp-l8-tip',
            title: 'Submit only after the manual review',
            body: 'The automated checks can see that a label exists, not that it says something useful. Read the About section out loud and look at the page at 360px before you press submit. The project is finished when the checklist and your own review both pass.',
          },
          {
            type: 'heading',
            id: 'fp-l8-h5',
            level: 3,
            body: 'Ship this build',
          },
          {
            type: 'text',
            id: 'fp-l8-b6',
            body: 'Open the workspace, finish the four milestones, and run every check. The next capstone adds a stylesheet and a breakpoint — but it assumes the structure habits from this one are already automatic.',
          },
          {
            type: 'project',
            id: 'fp-l8-project',
            projectSlug: 'personal-profile-page',
            title: 'Submit the profile page',
            body: 'Run the automated checks, then review the two manual items. Once both pass, submit the project and keep the files: the next build reuses the same structure-first process.',
          },
        ],
      },
    ],
  },
]
