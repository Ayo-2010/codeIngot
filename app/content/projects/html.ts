import type { Project } from '~/types/content'

/**
 * HTML-only projects. Each one ships a single starter document and is graded on
 * structure rather than on appearance, so every check here is a substring that a
 * correct solution must contain and the starter file must not.
 */
export const htmlProjects: Project[] = [
  {
    id: 'project-agenda-page',
    slug: 'conference-agenda-page',
    title: 'Conference Agenda Page',
    tagline: 'A two-day programme written as real schedule data, so every time and every room is unambiguous.',
    summary:
      'Build the static programme page for a two-day conference. The interesting work is in the data: start times that machines can read, breaks that do not pretend to be sessions, and a registration form that a keyboard user can finish without guessing.',
    difficulty: 'beginner',
    technologies: ['html', 'a11y'],
    estimatedMinutes: 75,
    xp: 280,
    brief: [
      'List the sessions in a plain text file first, with a time, a title, a track and a speaker for each one, so the markup becomes transcription rather than invention.',
      'Decide what a table is good for: the schedule grid is a table because it genuinely has row and column headings that mean something.',
      'Write each start time twice, once as text a human reads and once as a machine-readable value, and never leave the human version out.',
      'Separate the two days with their own sections and give each one a heading, so the outline shows the structure before any styling does.',
      'Put venue, ticket and accessibility information in an aside: it is real content, but it is not the main programme.',
      'Group the registration form fields so that related controls sit together and are introduced by a caption rather than a bold paragraph.',
      'Finish by reading the page with the images off and the stylesheet off, and check that nothing depends on position or colour alone.',
    ],
    requirements: [
      'Use header, nav, main, section, aside and footer landmarks, and exactly one h1.',
      'Split the programme into two sections, one per day, each with its own heading.',
      'Present the schedule for each day as a table with a caption and column headers.',
      'Write every session start time as a time element with a datetime attribute holding a full date and time.',
      'Include at least one abbr element with a title attribute to expand an abbreviation used in the programme.',
      'List at least four speakers in an unordered list, each with their talk title.',
      'Put venue, ticket price and accessibility information in an aside element.',
      'Add a registration form with a fieldset and legend for each group of controls, a label for every control, required on the essential ones and autocomplete on the name and email fields.',
    ],
    checklist: [
      {
        id: 'hc-1',
        label: 'Session times are written as time elements with a machine-readable value',
        verify: { kind: 'text', needle: 'datetime=', label: 'a datetime attribute' },
      },
      {
        id: 'hc-2',
        label: 'The schedule is presented as a table with a caption and column headers',
          verify: { kind: 'selector', selector: '<caption', label: 'a table caption' },
      },
      {
        id: 'hc-3',
        label: 'Related registration controls are grouped in a fieldset described by a legend',
          verify: { kind: 'selector', selector: '<legend', label: 'a legend inside a fieldset' },
      },
      {
        id: 'hc-4',
        label: 'An abbreviation in the programme is expanded with abbr and a title',
        verify: { kind: 'selector', selector: 'abbr[title]', label: 'an abbr with a title' },
      },
      {
        id: 'hc-5',
        label: 'Venue and ticket information lives in an aside element',
        verify: { kind: 'selector', selector: 'aside', label: 'an aside' },
      },
      {
        id: 'hc-6',
        label: 'Name and email fields ask the browser to autofill them',
        verify: { kind: 'text', needle: 'autocomplete=', label: 'an autocomplete attribute' },
      },
      {
        id: 'hc-7',
        label: 'Every form control has a matching label',
        verify: { kind: 'selector', selector: 'label[for]', label: 'a label with a for attribute' },
      },
      {
        id: 'hc-8',
        label: 'The essential fields are required and the programme is readable with styling switched off',
        verify: { kind: 'manual', label: 'the required fields are marked required and the programme still makes sense with no CSS' },
      },
    ],
    assets: [
      {
        id: 'hc-venue',
        label: 'Venue photograph',
        url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=640',
      },
      {
        id: 'hc-speaker-one',
        label: 'First speaker portrait',
        url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160',
      },
      {
        id: 'hc-speaker-two',
        label: 'Second speaker portrait',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160',
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Frontier Conf 2026 programme</title>
  </head>
  <body>
    <header>
      <h1>Frontier Conf 2026</h1>
      <!-- A short nav linking to each day and to the form. -->
    </header>

    <main id="main">
      <!-- Day one, day two, the speaker list and the registration form. -->
    </main>

    <footer>
      <p>Replace with the venue address.</p>
    </footer>
  </body>
</html>
`,
    },
    designPreviewHtml: `<header class="conf-head">
  <p class="eyebrow">14 and 15 November 2026</p>
  <h1>Frontier Conf</h1>
  <p class="lede">Two days, three tracks, and a schedule that fits in a pocket.</p>
  <nav class="days" aria-label="Programme days">
    <a class="day is-current" href="#day-one">Day one</a>
    <a class="day" href="#day-two">Day two</a>
    <a class="day" href="#register">Register</a>
  </nav>
</header>

<div class="cols">
  <table class="schedule">
    <caption>Day one, main hall</caption>
    <thead>
      <tr>
        <th scope="col">Time</th>
        <th scope="col">Session</th>
        <th scope="col">Track</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><time datetime="2026-11-14T09:00">09:00</time></td>
        <td>Doors, coffee and badge pickup</td>
        <td>All</td>
      </tr>
      <tr>
        <td><time datetime="2026-11-14T09:30">09:30</time></td>
        <td>Shipping HTML you cannot break</td>
        <td>Craft</td>
      </tr>
      <tr>
        <td><time datetime="2026-11-14T11:00">11:00</time></td>
        <td>Break</td>
        <td>All</td>
      </tr>
      <tr>
        <td><time datetime="2026-11-14T11:20">11:20</time></td>
        <td>Forms that pass an audit</td>
        <td>Access</td>
      </tr>
      <tr>
        <td><time datetime="2026-11-14T13:00">13:00</time></td>
        <td>Lunch</td>
        <td>All</td>
      </tr>
    </tbody>
  </table>

  <aside class="practical">
    <h2>Practical info</h2>
    <img
      class="venue-photo"
      src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=640"
      alt=""
      width="640"
      height="427"
      loading="lazy"
    />
    <dl>
      <dt>Venue</dt>
      <dd>Ferrier Hall, Sheffield</dd>
      <dt>Tickets</dt>
      <dd>Standard 120, student 45</dd>
      <dt>Captioning</dt>
      <dd>Live captions in every room</dd>
    </dl>
  </aside>
</div>

<section class="speakers">
  <h2>Two of the speakers</h2>
  <ul class="speaker-list">
    <li>
      <img
        class="speaker-avatar"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160"
        alt=""
        width="160"
        height="160"
        loading="lazy"
      />
      <p>
        <strong>Priya Raman</strong>
        <span>Accessibility engineer, Ferrier Hall</span>
      </p>
    </li>
    <li>
      <img
        class="speaker-avatar"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160"
        alt=""
        width="160"
        height="160"
        loading="lazy"
      />
      <p>
        <strong>Tom Abasi</strong>
        <span>Maintainer, the Markup Working Group</span>
      </p>
    </li>
  </ul>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #f7f8fa;
  color: #141a24;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.55;
}

.conf-head {
  max-width: 62rem;
  margin: 0 auto;
}

.venue-photo {
  display: block;
  width: 100%;
  height: auto;
  margin: 0.9rem 0 1.1rem;
  border: 1px solid #dfe4ea;
  border-radius: 10px;
}

.speakers {
  max-width: 62rem;
  margin: 2.5rem auto 0;
  padding-top: 1.5rem;
  border-top: 1px solid #dfe4ea;
}

.speakers h2 {
  margin: 0 0 1rem;
  font-size: 1.05rem;
}

.speaker-list {
  display: grid;
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.speaker-list li {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem;
  background: #ffffff;
  border: 1px solid #dfe4ea;
  border-radius: 10px;
}

.speaker-avatar {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 50%;
  object-fit: cover;
}

.speaker-list p {
  display: flex;
  flex-direction: column;
  margin: 0;
  font-size: 0.9rem;
}

.speaker-list span {
  color: #5f6977;
  font-size: 0.82rem;
}

@media (min-width: 560px) {
  .speaker-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

.eyebrow {
  margin: 0;
  color: #1e3a8a;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0.35rem 0 0.4rem;
  font-size: 2.1rem;
  line-height: 1.15;
}

.lede {
  margin: 0;
  max-width: 46ch;
  color: #5f6977;
}

.days {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.25rem;
}

.day {
  padding: 0.35rem 0.85rem;
  border: 1px solid #dfe4ea;
  border-radius: 999px;
  color: #141a24;
  font-size: 0.85rem;
  text-decoration: none;
}

.day.is-current {
  border-color: #1e3a8a;
  background: #1e40af;
  color: #ffffff;
  font-weight: 600;
}

.cols {
  display: grid;
  gap: 1.25rem;
  max-width: 62rem;
  margin: 2rem auto 0;
}

.schedule {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border: 1px solid #dfe4ea;
  border-radius: 10px;
  overflow: hidden;
  font-size: 0.9rem;
}

.schedule caption {
  padding: 0.85rem 1rem;
  color: #1e3a8a;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-align: left;
  text-transform: uppercase;
}

.schedule th,
.schedule td {
  padding: 0.65rem 1rem;
  border-top: 1px solid #dfe4ea;
  text-align: left;
}

.schedule th {
  color: #5f6977;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.schedule td:first-child {
  color: #141a24;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.schedule td:last-child {
  color: #5f6977;
}

.practical {
  padding: 1.15rem;
  background: #eef1f5;
  border: 1px solid #dfe4ea;
  border-left: 3px solid #1e3a8a;
  border-radius: 10px;
  font-size: 0.9rem;
}

.practical h2 {
  margin: 0 0 0.6rem;
  font-size: 0.95rem;
}

.practical dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.35rem 0.9rem;
  margin: 0;
}

.practical dt {
  color: #5f6977;
}

.practical dd {
  margin: 0;
}

@media (min-width: 760px) {
  .cols { grid-template-columns: 2fr 1fr; }
}
`,
    solutionNote:
      'A strong solution writes the schedule data first and transcribes it, so the table rows are uniform and every time carries a full date in its datetime attribute rather than just a clock time. Breaks and lunches stay in the same table but read as rows rather than pretending to be talks, the aside holds the practical detail, and the form uses one fieldset per group with a legend, a label bound by for, required on the essentials and autocomplete on name and email.',
  },
  {
    id: 'project-docs-page',
    slug: 'product-docs-page',
    title: 'Product Documentation Page',
    tagline: 'The documentation page every small tool needs: a contents list, a heading outline, and cross links that actually resolve.',
    summary:
      'Write the documentation page for a small command line tool, from an empty file. The exercise is structural rather than visual: a contents sidebar that stays in sync with the heading outline, sections that can be linked to individually, and the several small elements that make technical writing readable.',
    difficulty: 'beginner',
    technologies: ['html'],
    estimatedMinutes: 90,
    xp: 300,
    brief: [
      'Write the table of contents as a list of section titles before you write the sections, so the contents list is a copy of the outline rather than a guess at it.',
      'Keep the heading levels strictly nested: one h1 for the page, h2 for each section, h3 only for subsections, and never jump a level.',
      'Give every section a short, stable id and link to it from the contents list, then add cross links in the prose so a reader who lands halfway through can still find their way back.',
      'Use the element that matches the meaning rather than the look: a table for requirements, a definition list for shortcuts, a preformatted block for a command the reader will copy.',
      'Quote the maintainers with a blockquote and give it a cite attribute, so the origin of the quote survives a redesign.',
      'Close the page with a helpfulness form, because documentation without a feedback route gets quietly worse for years.',
      'Check the page by tabbing through it: the contents links, every link target and both form controls must be reachable in a sensible order.',
    ],
    requirements: [
      'Start with a doctype, set the document language on the html element and give the page a title in the head.',
      'Use exactly one h1 and a heading outline that runs h1, then h2, then h3, with no skipped levels anywhere.',
      'Place an in-page contents list inside an aside and inside a nav element, and give that nav an aria-label.',
      'Give every section an id and link to it from the contents list, and include at least two cross links between sections in the prose.',
      'Add a requirements table with a caption, at least three body rows and column headers that carry a scope attribute.',
      'Use an inline code element for a flag or a value, and one preformatted block holding a full command the reader can copy.',
      'Present the keyboard shortcuts as a definition list where each term is wrapped in a kbd element.',
      'Quote the maintainers in a blockquote that carries a cite attribute, and add a footer with a version line.',
      'End the page with a helpfulness form containing a radio group inside a fieldset and a submit button.',
    ],
    checklist: [
      {
        id: 'hd-1',
        label: 'A preformatted block holds a command the reader can copy',
        verify: { kind: 'text', needle: 'pre', label: 'a pre element' },
      },
      {
        id: 'hd-2',
        label: 'Flags and values are marked with an inline code element',
        verify: { kind: 'text', needle: 'code', label: 'a code element' },
      },
      {
        id: 'hd-3',
        label: 'The keyboard shortcuts are marked with kbd',
        verify: { kind: 'text', needle: 'kbd', label: 'a kbd element' },
      },
      {
        id: 'hd-4',
        label: 'The requirements table headers declare their scope',
        verify: { kind: 'text', needle: 'scope=', label: 'a scope attribute on a header' },
      },
      {
        id: 'hd-5',
        label: 'The maintainers quote is a blockquote rather than a styled paragraph',
        verify: { kind: 'text', needle: 'blockquote', label: 'a blockquote element' },
      },
      {
        id: 'hd-6',
        label: 'The blockquote points at its source with a cite attribute',
        verify: { kind: 'text', needle: 'cite=', label: 'a cite attribute' },
      },
      {
        id: 'hd-7',
        label: 'The shortcuts are presented as a definition list',
        verify: { kind: 'text', needle: 'dl', label: 'a dl element' },
      },
      {
        id: 'hd-8',
        label: 'Every contents link resolves to a section id and the heading outline skips no level',
        verify: { kind: 'manual', label: 'every contents link lands on its section and the outline runs h1, h2, h3 with no gaps' },
      },
    ],
    assets: [
      {
        id: 'hd-figure',
        label: 'Illustration at the top of the article',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=960',
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Toolkit documentation</title>
  </head>
  <body>
    <header>
      <h1>Toolkit</h1>
      <p>Command line toolkit, version 2.4.0</p>
    </header>

    <div class="layout">
      <!-- The contents sidebar goes here. -->

      <main>
        <!-- Sections: install, first run, commands, configuration, troubleshooting. -->
      </main>
    </div>

    <footer>
      <p>Replace with your copyright line.</p>
    </footer>
  </body>
</html>
`,
    },
    designPreviewHtml: `<div class="docs">
  <aside class="toc">
    <p class="toc-title">On this page</p>
    <ul>
      <li><a href="#install">Installation</a></li>
      <li><a href="#first-run">Your first run</a></li>
      <li><a href="#requirements">Requirements</a></li>
      <li><a href="#shortcuts">Keyboard shortcuts</a></li>
      <li><a href="#feedback">Was this helpful?</a></li>
    </ul>
  </aside>

  <article class="doc">
    <p class="eyebrow">Toolkit 2.4.0</p>
    <h1>Installation</h1>
    <img
      class="doc-figure"
      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=960"
      alt=""
      width="960"
      height="640"
      loading="lazy"
    />
    <p class="lede">One binary, no runtime to install. Copy it onto your path and run <code>toolkit --version</code>.</p>

    <h2>Requirements</h2>
    <table class="reqs">
      <caption>Supported platforms</caption>
      <thead>
        <tr>
          <th scope="col">Platform</th>
          <th scope="col">Minimum</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Linux</td><td>glibc 2.31</td></tr>
        <tr><td>macOS</td><td>13 Ventura</td></tr>
        <tr><td>Windows</td><td>10 build 19041</td></tr>
      </tbody>
    </table>

    <h2>Your first run</h2>
    <pre class="shell">toolkit init --name "my-workspace"
toolkit watch --verbose</pre>

    <blockquote cite="https://example.com/toolkit/changelog">
      <p>The config file is the only thing you should ever need to edit by hand.</p>
    </blockquote>

    <h2>Keyboard shortcuts</h2>
    <dl class="keys">
      <dt><kbd>Ctrl</kbd> + <kbd>K</kbd></dt>
      <dd>Open the command palette</dd>
      <dt><kbd>Ctrl</kbd> + <kbd>.</kbd></dt>
      <dd>Stop the current task</dd>
    </dl>
  </article>
</div>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #ffffff;
  color: #111827;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.docs {
  display: grid;
  gap: 1.75rem;
  max-width: 66rem;
  margin: 0 auto;
}

.toc {
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  align-self: start;
}

.toc-title {
  margin: 0 0 0.5rem;
  color: #6b7280;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.toc ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.9rem;
}

.toc a {
  color: #111827;
  text-decoration: none;
}

.toc a:hover {
  color: #1d4ed8;
}

.eyebrow {
  margin: 0;
  color: #1d4ed8;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.doc h1 {
  margin: 0.3rem 0 0.5rem;
  font-size: 1.9rem;
  line-height: 1.2;
}

.doc h2 {
  margin: 2rem 0 0.6rem;
  font-size: 1.1rem;
}

.doc-figure {
  display: block;
  width: 100%;
  height: auto;
  margin: 1.1rem 0 0.4rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.lede {
  margin: 0;
  max-width: 58ch;
  color: #6b7280;
}

.doc code,
.doc kbd {
  padding: 0.1rem 0.32rem;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  background: #f3f4f6;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85em;
}

.reqs {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.reqs caption {
  padding-bottom: 0.5rem;
  color: #6b7280;
  font-size: 0.8rem;
  text-align: left;
}

.reqs th,
.reqs td {
  padding: 0.5rem 0.7rem;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.reqs th {
  background: #f9fafb;
  color: #6b7280;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.shell {
  margin: 0;
  padding: 0.9rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  color: #1d4ed8;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.85rem;
  overflow-x: auto;
}

blockquote {
  margin: 1.5rem 0;
  padding: 0.3rem 0 0.3rem 1rem;
  border-left: 3px solid #1d4ed8;
}

blockquote p {
  margin: 0;
  color: #6b7280;
  font-style: italic;
}

.keys {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  margin: 0;
  font-size: 0.9rem;
}

.keys dd {
  margin: 0;
  color: #6b7280;
}

@media (min-width: 860px) {
  .docs { grid-template-columns: 15rem 1fr; }
}
`,
    solutionNote:
      'A strong solution treats the contents list as a copy of the heading outline: every h2 has an id, every entry in the aside points at exactly one, and no level is skipped anywhere on the page. Requirements live in a real table with a caption and scoped headers, the command the reader copies sits inside a preformatted block, the shortcuts are a definition list with kbd terms, and the quote keeps its source in a cite attribute rather than in the link text.',
  },
  {
    id: 'project-media-showcase',
    slug: 'media-showcase-page',
    title: 'Media Showcase Page',
    tagline: 'Six photographs, a recording and a map, each one described well enough for someone who will never see or hear it.',
    summary:
      'Build a gallery page for a photography and music archive using only HTML. Nothing here is decorative: every media element has to carry its own description, its own dimensions and its own reason for existing, which is what separates a media page from a pile of tags.',
    difficulty: 'intermediate',
    technologies: ['html', 'a11y'],
    estimatedMinutes: 105,
    xp: 320,
    brief: [
      'Write the six entries as text first, with a title, a date and two sentences about what the photograph actually shows, before you choose any images.',
      'Wrap every image in a figure and put the caption inside it, so the description travels with the image even if the styling changes.',
      'Treat the caption as the description, not as a label: say what is in the frame, not what the file is called.',
      'Give the busiest image a picture element with two sources and a media attribute, so the browser can choose, rather than you guessing.',
      'Set explicit width and height on every image and on the map frame, because a reserved box is what stops the page jumping under the reader.',
      'Give anything below the fold a lazy loading hint, and give the first image an eager fetch priority instead, since it is what the reader came for.',
      'Describe the recording and the film clip in text as well as embedding them, and never let sound start on its own.',
      'Finish by turning the images off in your browser and reading the page: if the captions do not carry it, the page is not finished.',
    ],
    requirements: [
      'Use header, main, section and footer landmarks with exactly one h1.',
      'Present exactly six photographs, each wrapped in a figure with a figcaption naming the work, its date and its location.',
      'Every image has a meaningful alt attribute plus explicit width and height, and every one below the first carries loading="lazy".',
      'One photograph uses a picture element containing two source elements with different media conditions and an img fallback.',
      'The caption text alone describes what is in the frame well enough to replace the photograph entirely.',
      'Embed one film clip in a video element with controls, no autoplay, and a track element providing captions or a description.',
      'Embed one recording in an audio element with controls and a text description of what it sounds like.',
      'Embed the archive map in an iframe that has a title, explicit width and height, and no autoplay-capable content.',
      'No media element starts playing by itself, and the page states plainly that the media has descriptions available.',
    ],
    checklist: [
      {
        id: 'hm-1',
        label: 'Every photograph is wrapped in a figure element',
        verify: { kind: 'text', needle: 'figure', label: 'a figure element' },
      },
      {
        id: 'hm-2',
        label: 'Every figure has a figcaption describing the work',
        verify: { kind: 'text', needle: 'figcaption', label: 'a figcaption element' },
      },
      {
        id: 'hm-3',
        label: 'One photograph uses a picture element with more than one source',
        verify: { kind: 'text', needle: 'picture', label: 'a picture element' },
      },
      {
        id: 'hm-4',
        label: 'The picture sources choose between formats with a media attribute',
        verify: { kind: 'text', needle: 'media=', label: 'a media attribute on a source' },
      },
      {
        id: 'hm-5',
        label: 'The film clip is embedded in a video element',
        verify: { kind: 'text', needle: 'video', label: 'a video element' },
      },
      {
        id: 'hm-6',
        label: 'The video has a track element carrying its captions',
        verify: { kind: 'text', needle: 'track', label: 'a track element' },
      },
      {
        id: 'hm-7',
        label: 'Images below the first carry a lazy loading hint',
        verify: { kind: 'text', needle: 'loading=', label: 'a loading attribute' },
      },
      {
        id: 'hm-8',
        label: 'Nothing autoplays and every media element has a text description',
        verify: { kind: 'manual', label: 'no media autoplays, and the images, clip, recording and map are all described in the surrounding text' },
      },
    ],
    assets: [
      {
        id: 'hc-wing-small',
        label: 'Lead photograph, the narrow-screen source inside the picture element',
        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=480',
        alt: 'An airplane wing above a layer of clouds at sunset',
      },
      {
        id: 'hc-wing-fallback',
        label: 'Lead photograph, the img fallback between the two sources',
        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=960',
        alt: 'An airplane wing above a layer of clouds at sunset',
      },
      {
        id: 'hc-wing-wide',
        label: 'Lead photograph, the wide-screen source inside the picture element',
        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600',
        alt: 'An airplane wing above a layer of clouds at sunset',
      },
      {
        id: 'hc-mountains',
        label: 'Second photograph, loaded lazily because it sits below the fold',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=960',
        alt: 'Fog over a mountain range at sunset',
      },
      {
        id: 'hc-market',
        label: 'Third photograph, loaded lazily because it sits below the fold',
        url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=960',
        alt: 'Assorted fruit laid out at a market',
      },
      {
        id: 'hc-poster',
        label: 'Poster frame shown before the film clip is pressed',
        url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=640',
        alt: 'An airplane wing above a layer of clouds at sunset',
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Northbank Archive</title>
  </head>
  <body>
    <header>
      <h1>Northbank Archive</h1>
      <p>Photography and music from 1974 to 1991.</p>
    </header>

    <main>
      <!-- Gallery items, the recording and the map go here. -->
    </main>

    <footer>
      <p>Replace with your credit line.</p>
    </footer>
  </body>
</html>
`,
    },
    designPreviewHtml: `<header class="masthead">
  <p class="eyebrow">Northbank Archive</p>
  <h1>Photographs, a film clip, a recording and a map</h1>
  <p class="lede">Everything here is described in words as well as shown, so the page still works with the images turned off and the sound muted.</p>
</header>

<section class="gallery">
  <h2>Three photographs from the print archive</h2>

  <div class="grid">
    <figure class="shot shot--wide">
      <picture>
        <source media="(max-width: 640px)" srcset="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=480" />
        <source media="(min-width: 641px)" srcset="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600" />
        <img src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=960" alt="An airplane wing above a layer of clouds at sunset" width="960" height="640" fetchpriority="high" />
      </picture>
      <figcaption><strong>Cruise altitude, 1988.</strong> A passenger shot this from a window seat at dusk: one wing, a flat deck of cloud beneath it, and no ground anywhere in frame.</figcaption>
    </figure>

    <figure class="shot">
      <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=960" alt="Fog over a mountain range at sunset" width="960" height="640" loading="lazy" />
      <figcaption><strong>Ridge line, winter.</strong> The valley filled with fog an hour before sunset, so only the upper slopes stayed clear of it.</figcaption>
    </figure>

    <figure class="shot">
      <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=960" alt="Assorted fruit laid out at a market" width="960" height="640" loading="lazy" />
      <figcaption><strong>Market, Saturday.</strong> Crates of fruit on the cobbles, photographed from above before the stall holders arrived.</figcaption>
    </figure>
  </div>
</section>

<section class="panel">
  <h2>Film clip, 1991</h2>
  <figure class="frame">
    <video controls preload="none" poster="https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=640" width="960" height="540">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
      <track kind="captions" srclang="en" label="English" src="captions.vtt" />
    </video>
    <figcaption>Twenty seconds of the harbour mouth at dusk, with the tide running out. You create captions.vtt yourself and the track element points at it; nothing plays until you press the control.</figcaption>
  </figure>
</section>

<section class="panel">
  <h2>Ferry horns, recorded 1979</h2>
  <p>A ninety second field recording: two horns answering each other across the water, engine noise, and gulls somewhere behind them.</p>
  <figure class="frame">
    <audio controls preload="none">
      <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
    </audio>
    <figcaption>The recording is nine seconds of a horse's hooves on gravel, standing in for the archive master. Press play for the audio alone; the sentence above carries the description.</figcaption>
  </figure>
</section>

<section class="panel">
  <h2>Where the archive sits</h2>
  <p>The map frame below is an OpenStreetMap embed centred on the archive. It carries a title, fixed dimensions and a lazy loading hint, so it reserves its box and never loads before it is needed.</p>
  <figure class="frame">
    <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-0.14%2C51.50%2C-0.10%2C51.52&amp;layer=mapnik&amp;marker=51.5086%2C-0.1256" title="Map of the Northbank archive location" width="960" height="540" loading="lazy"></iframe>
    <figcaption>A street map of the riverside where the collection is held. Anyone who cannot use the map still has the address written in the paragraph above it.</figcaption>
  </figure>
</section>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 2.5rem 1.25rem;
  background: #fdfcfd;
  color: #1c1622;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.masthead {
  max-width: 60rem;
  margin: 0 auto;
}

.eyebrow {
  margin: 0;
  color: #7e22ce;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

h1 {
  margin: 0.35rem 0 0.5rem;
  font-size: 2rem;
  line-height: 1.2;
}

.lede {
  margin: 0;
  max-width: 50ch;
  color: #6b6472;
}

.gallery {
  max-width: 60rem;
  margin: 2rem auto 0;
}

.gallery h2 {
  margin: 0 0 0.9rem;
  color: #7e22ce;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.grid {
  display: grid;
  gap: 1rem;
  max-width: 60rem;
  margin: 2rem auto 0;
}

.shot picture {
  display: block;
  margin: 0;
}

.shot picture img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.shot {
  margin: 0;
  padding: 0.85rem;
  background: #ffffff;
  border: 1px solid #e6e1e9;
  border-radius: 10px;
}

.shot img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 6px;
}

.shot figcaption {
  margin-top: 0.7rem;
  color: #6b6472;
  font-size: 0.86rem;
}

.shot figcaption strong {
  color: #1c1622;
}

.audio-card {
  max-width: 60rem;
  margin: 1rem auto 0;
  padding: 1.15rem;
  background: #f5f2f7;
  border: 1px solid #e6e1e9;
  border-left: 3px solid #7e22ce;
  border-radius: 10px;
}

.audio-card h2 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
}

.audio-card p {
  margin: 0 0 0.8rem;
  color: #6b6472;
  font-size: 0.9rem;
}

audio {
  width: 100%;
}

.panel {
  max-width: 60rem;
  margin: 1rem auto 0;
  padding: 1.15rem;
  background: #f5f2f7;
  border: 1px solid #e6e1e9;
  border-left: 3px solid #7e22ce;
  border-radius: 10px;
}

.panel h2 {
  margin: 0 0 0.4rem;
  font-size: 1rem;
}

.panel p {
  margin: 0 0 0.8rem;
  max-width: 62ch;
  color: #6b6472;
  font-size: 0.9rem;
}

.frame {
  margin: 0;
}

.frame video,
.frame iframe {
  display: block;
  width: 100%;
  max-width: 44rem;
  aspect-ratio: 16 / 9;
  height: auto;
  background: #fdfcfd;
  border: 1px solid #e6e1e9;
  border-radius: 8px;
}

.frame audio {
  display: block;
  width: 100%;
  max-width: 30rem;
}

.frame figcaption {
  margin: 0.7rem 0 0;
  max-width: 68ch;
  color: #6b6472;
  font-size: 0.86rem;
}

.frame figcaption strong {
  color: #1c1622;
}

@media (max-width: 640px) {
  body {
    padding: 1.75rem 1rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .panel,
  .shot {
    padding: 0.85rem;
  }

  .frame video,
  .frame iframe {
    aspect-ratio: 4 / 3;
  }
}

@media (min-width: 720px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
  .shot--wide { grid-column: span 3; }
}
`,
    solutionNote:
      'A strong solution writes each caption so it stands in for the photograph: what is in the frame, roughly when, and why it was taken, rather than the filename. Every image and the iframe reserve their space with explicit width and height, the busiest shot is a picture with two sources chosen by a media condition, the video carries a track for captions and starts only when pressed, and the recording is described in the sentence above the player. Nothing on the page moves the layout after it loads, and nothing plays without being asked for.',
  },
]