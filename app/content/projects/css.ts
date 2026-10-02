import type { Project } from '~/types/content'

/**
 * Three HTML + CSS projects. Each one teaches a layout that stops working
 * unless the real CSS primitives are used, so none of them can be faked.
 */
export const cssProjects: Project[] = [
  {
    id: 'project-pricing-page',
    slug: 'saas-pricing-page',
    title: 'SaaS Pricing Page',
    tagline: 'Three tiers in a grid, one of them deliberately larger, and a whole palette held in four custom properties.',
    summary:
      'Build the pricing section every SaaS product ships with, and get the parts right: the three columns come from grid, the highlight comes from one class, and every colour comes from a custom property. The exercise is learning to make one declaration responsible for the row instead of nudging three cards with margins.',
    difficulty: 'beginner',
    technologies: ['html', 'css'],
    estimatedMinutes: 120,
    xp: 380,
    brief: [
      'Write the three tiers in the HTML first and mark the middle one with a class, because the highlight is a styling decision rather than a content decision.',
      'Put the palette on the root element as custom properties for the surface, the border, the accent and the text, then refer to those names everywhere else.',
      'Lay the row out with grid and three equal columns, and let the gap property handle the space between the cards.',
      'Make the middle card read as the recommended tier with more padding and a larger price, not with a transform, so it cannot overlap its neighbours.',
      'Draw the tick beside each feature with a pseudo element, and remove the default bullet so the two never show at once.',
      'Build the footer band as a flex row with a gap so the links spread out and wrap cleanly instead of relying on non-breaking spaces.',
      'Add one media query below 720px that drops the row to a single column and drops the size bump, so the highlighted card is not stranded off-centre on a phone.',
    ],
    requirements: [
      'Include a header with the product name and one call-to-action button.',
      'Include a main pricing section holding exactly three cards, each with a tier name, a price, a one-line summary and a list of features.',
      'The middle card carries a class or attribute that identifies it as the most popular tier, and the HTML says so in words as well as in style.',
      'Define the colour palette as custom properties on the root element and use those names in the rest of the stylesheet.',
      'Lay the three cards out with CSS grid in one row on wide screens, with a gap between them.',
      'The middle card is visibly larger than its neighbours and carries a stronger shadow than they do.',
      'Every feature item shows a tick drawn in CSS, and the list shows no browser bullet.',
      'Include a footer band with at least three links laid out with flexbox and a gap.',
      'Include a media query that stacks the cards into a single column on a narrow screen.',
      'Every link and button has a visible hover style and a visible focus style.',
    ],
    checklist: [
      {
        id: 'dc-1',
        label: 'The pricing row is described with grid-template-columns',
        verify: { kind: 'css-rule', needle: 'grid-template-columns', label: 'a grid-template-columns rule' },
      },
      {
        id: 'dc-2',
        label: 'Spacing between the cards comes from a gap declaration',
        verify: { kind: 'css-rule', needle: 'gap', label: 'a gap declaration' },
      },
      {
        id: 'dc-3',
        label: 'The cards have rounded corners with border-radius',
        verify: { kind: 'css-rule', needle: 'border-radius', label: 'a border-radius rule' },
      },
      {
        id: 'dc-4',
        label: 'The cards are lifted with box-shadow, and the popular tier uses a stronger one',
        verify: { kind: 'css-rule', needle: 'box-shadow', label: 'a box-shadow rule' },
      },
      {
        id: 'dc-5',
        label: 'The palette is declared as custom properties on the root element',
        verify: { kind: 'css-rule', needle: '--', label: 'custom properties such as --accent' },
      },
      {
        id: 'dc-6',
        label: 'A media query stacks the cards into one column on a narrow screen',
        verify: { kind: 'css-rule', needle: '@media', label: 'an @media query' },
      },
      {
        id: 'dc-7',
        label: 'The buttons and plan links change on :hover',
        verify: { kind: 'css-rule', needle: ':hover', label: 'a :hover rule' },
      },
      {
        id: 'dc-8',
        label: 'The middle card is clearly the largest, the feature ticks align, and nothing overflows at 360px',
        verify: { kind: 'manual', label: 'the middle tier is visibly the largest, every feature has a tick, and nothing scrolls sideways at 360px' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pricing</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <header class="site-header">
      <span class="logo">Cadence</span>
      <nav class="site-nav">
        <a href="#plans">Plans</a>
        <a class="btn" href="#plans">Start free</a>
      </nav>
    </header>

    <main id="plans" class="pricing">
      <p class="eyebrow">Monthly pricing</p>
      <h1>Pick the plan that matches your team.</h1>

      <div class="plans">
        <article class="plan">
          <h2>Tier name</h2>
          <p class="price">0</p>
          <p class="plan-note">One sentence about who this is for.</p>
          <ul class="features">
            <li>Feature one</li>
            <li>Feature two</li>
            <li>Feature three</li>
          </ul>
          <a class="btn btn-quiet" href="#plans">Choose</a>
        </article>
      </div>
    </main>

    <footer class="site-footer">
      <p>Copyright 2026 Cadence</p>
      <nav>
        <a href="#plans">Docs</a>
        <a href="#plans">Support</a>
        <a href="#plans">Terms</a>
      </nav>
    </footer>
  </body>
</html>
`,
      css: `/* Declare the palette on :root first, then the plan row, the cards,
   the feature ticks, the buttons and the footer band. */

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}
`,
    },
    designPreviewHtml: `<header class="site-header">
  <span class="logo">Cadence</span>
  <nav class="site-nav">
    <a href="#plans">Plans</a>
    <a href="#plans">Docs</a>
    <a class="btn" href="#plans">Start free</a>
  </nav>
</header>

<main class="pricing" id="plans">
  <p class="eyebrow">Monthly pricing</p>
  <h1>Pick the plan that matches your team.</h1>

  <div class="plans">
    <article class="plan">
      <h2>Solo</h2>
      <p class="price">9</p>
      <p class="plan-note">One seat, for a single person working on their own projects.</p>
      <ul class="features">
        <li>Unlimited projects</li>
        <li>Two seats included</li>
        <li>Weekly email digest</li>
      </ul>
      <a class="btn btn--ghost" href="#plans">Start free</a>
    </article>

    <article class="plan plan--popular">
      <p class="badge">Most popular</p>
      <h2>Team</h2>
      <p class="price">24</p>
      <p class="plan-note">Shared workspaces, audit history and roles for up to twenty people.</p>
      <ul class="features">
        <li>Everything in Solo</li>
        <li>Unlimited seats</li>
        <li>Role based access</li>
        <li>Audit log for 90 days</li>
        <li>Priority support</li>
      </ul>
      <a class="btn" href="#plans">Choose Team</a>
    </article>

    <article class="plan">
      <h2>Scale</h2>
      <p class="price">68</p>
      <p class="plan-note">Single sign-on and a data region of your choosing.</p>
      <ul class="features">
        <li>Everything in Team</li>
        <li>SAML single sign-on</li>
        <li>Regional data storage</li>
      </ul>
      <a class="btn btn--ghost" href="#plans">Talk to us</a>
    </article>
  </div>
</main>

<footer class="site-footer">
  <p>Copyright 2026 Cadence</p>
  <nav class="footer-nav">
    <a href="#plans">Docs</a>
    <a href="#plans">Support</a>
    <a href="#plans">Privacy</a>
    <a href="#plans">Terms</a>
  </nav>
</footer>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

:root {
  --surface: #ffffff;
  --surface-raised: #f1f3f9;
  --line: #e1e5ee;
  --accent: #4f46e5;
  --text: #16192b;
  --muted: #646a7d;
}

body {
  margin: 0;
  background: #f8f9fc;
  color: #16192b;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.6;
}

.site-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--line);
}

.logo {
  color: #4338ca;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.9rem;
}

.site-nav a:not(.btn) {
  color: #646a7d;
  text-decoration: none;
}

.site-nav a:not(.btn):hover { color: #16192b; }

.pricing {
  max-width: 64rem;
  margin: 0 auto;
  padding: 3rem 1.5rem 3.5rem;
  text-align: center;
}

.eyebrow {
  margin: 0;
  color: #4338ca;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

h1 {
  margin: 0.4rem 0 2.25rem;
  font-size: 2.1rem;
  line-height: 1.2;
}

.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  align-items: start;
  text-align: left;
}

.plan {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(16, 24, 40, 0.10);
}

.plan h2 {
  margin: 0;
  font-size: 1rem;
  color: #646a7d;
  font-weight: 600;
}

.price {
  margin: 0.4rem 0 0.2rem;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 1.1;
}

.price::before {
  content: "$";
  margin-right: 0.15rem;
  font-size: 1rem;
  font-weight: 500;
  color: #646a7d;
  vertical-align: 0.6rem;
}

.plan-note {
  margin: 0 0 1.1rem;
  color: #646a7d;
  font-size: 0.88rem;
}

.features {
  margin: 0 0 1.4rem;
  padding: 0;
  list-style: none;
  font-size: 0.9rem;
}

.features li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.28rem 0;
}

.features li::before {
  content: "";
  flex: none;
  width: 0.95rem;
  height: 0.95rem;
  margin-top: 0.25rem;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: inset 0 0 0 4px var(--surface);
}

.plan .btn { margin-top: auto; text-align: center; }

.btn {
  display: inline-block;
  padding: 0.6rem 1.1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  background: var(--accent);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none;
  transition: transform 120ms ease, border-color 120ms ease;
}

.btn:hover { transform: translateY(-1px); }

.btn--ghost {
  background: transparent;
  border-color: var(--line);
  color: #16192b;
}

.btn--ghost:hover { border-color: var(--accent); }

.plan--popular {
  position: relative;
  padding: 2rem 1.5rem 1.6rem;
  border-color: var(--accent);
  box-shadow: 0 18px 44px rgba(79, 70, 229, 0.16);
}

.badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  background: var(--accent);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  white-space: nowrap;
}

.site-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--line);
  background: var(--surface);
  color: #646a7d;
  font-size: 0.85rem;
}

.site-footer p { margin: 0; }

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.footer-nav a {
  color: #646a7d;
  text-decoration: none;
}

.footer-nav a:hover { color: #4338ca; }

@media (max-width: 760px) {
  .plans { grid-template-columns: 1fr; }
  .plan--popular { padding: 1.5rem; }
  .badge { position: static; transform: none; display: inline-block; margin-bottom: 0.5rem; }
}
`,
    solutionNote:
      'A strong solution puts every colour in custom properties on the root element, lets one grid declaration create the row, and marks the recommended tier with a single class rather than by restyling it in place. The middle card is larger because of more padding and a bigger price rather than a transform, so it cannot collide with its neighbours, and the media query returns the row to one column on a narrow screen instead of hiding anything.',
  },
  {
    id: 'project-dashboard-layout',
    slug: 'analytics-dashboard',
    title: 'Analytics Dashboard Layout',
    tagline: 'A dark shell built from named grid areas, where the sidebar stays put and the rest of the page scrolls.',
    summary:
      'Build the frame of an analytics product: a sidebar, a header bar, four stat cards, a chart placeholder and an activity list. The layout is described with named template areas, so once it works you can rearrange the whole shell by editing one block of CSS, and the type is sized with clamp so it holds up at every width.',
    difficulty: 'intermediate',
    technologies: ['html', 'css'],
    estimatedMinutes: 150,
    xp: 440,
    brief: [
      'Name the regions of the shell before styling anything: sidebar, header bar, stat row, chart and activity list, then give each element a class that matches its name.',
      'Describe the whole shell with one grid-template-areas declaration on the parent, so the arrangement can be read off the stylesheet in a single glance.',
      'Size the sidebar column with minmax() and the content column with minmax(0, 1fr), so a long chart cannot force the page to scroll sideways.',
      'Type the page title and the stat values with clamp(), which takes a minimum, a preferred size and a maximum in one declaration.',
      'Make the sidebar sticky with a top offset and a height, and make sure the shell it lives in is tall enough for sticking to be visible.',
      'Add one media query below 820px that moves the sidebar above the content, where it becomes a horizontal strip rather than a column.',
      'Keep the whole dark palette in custom properties on the root element, including both surfaces, the borders and the accent used for the stat values.',
    ],
    requirements: [
      'Include a sidebar with a product mark and at least five navigation links.',
      'Include a header bar with a page title and one account control.',
      'Include exactly four stat cards, each with a label, a value and a short note.',
      'Include a large chart placeholder with a heading and a caption underneath it.',
      'Include a recent activity list with at least five entries, each with a description and a time.',
      'Lay the shell out with grid-template-areas and give every region a name that its element uses as a class.',
      'Size the sidebar column with minmax() and give the sidebar a sticky position with a top offset.',
      'Set at least two font sizes with clamp() so the type scales with the viewport.',
      'Keep every colour in custom properties declared on the root element.',
      'Include a media query that moves the sidebar above the content on a narrow screen.',
    ],
    checklist: [
      {
        id: 'dc-1',
        label: 'The shell is arranged with grid-template-areas and named regions',
        verify: { kind: 'css-rule', needle: 'grid-template-areas', label: 'a grid-template-areas rule' },
      },
      {
        id: 'dc-2',
        label: 'The columns are sized with minmax()',
        verify: { kind: 'css-rule', needle: 'minmax(', label: 'a minmax() value' },
      },
      {
        id: 'dc-3',
        label: 'At least two font sizes use clamp()',
        verify: { kind: 'css-rule', needle: 'clamp(', label: 'a clamp() value' },
      },
      {
        id: 'dc-4',
        label: 'The sidebar uses a sticky position with a top offset',
        verify: { kind: 'css-rule', needle: 'sticky', label: 'a position: sticky rule' },
      },
      {
        id: 'dc-5',
        label: 'The dark palette is declared as custom properties on the root element',
        verify: { kind: 'css-rule', needle: '--', label: 'custom properties such as --surface' },
      },
      {
        id: 'dc-6',
        label: 'A media query moves the sidebar above the content on a narrow screen',
        verify: { kind: 'css-rule', needle: '@media', label: 'an @media query' },
      },
      {
        id: 'dc-7',
        label: 'Spacing between the shell regions comes from a gap declaration',
        verify: { kind: 'css-rule', needle: 'gap', label: 'a gap declaration' },
      },
      {
        id: 'dc-8',
        label: 'The sidebar stays visible while the page scrolls, and nothing is clipped at 700px',
        verify: { kind: 'manual', label: 'the sidebar stays put while the page scrolls, and at 700px it sits above the content with nothing cut off' },
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="dashboard">
      <aside class="sidebar">
        <p class="mark">Product name</p>
        <nav class="side-nav">
          <a href="#dash">Overview</a>
          <a href="#dash">Acquisition</a>
          <a href="#dash">Retention</a>
        </nav>
      </aside>

      <header class="topbar">
        <h1>Overview</h1>
        <span class="account">Account</span>
      </header>

      <section class="stats">
        <article class="stat">
          <p class="stat-label">Metric name</p>
          <p class="stat-value">0</p>
          <p class="stat-note">Comparison note</p>
        </article>
      </section>

      <section class="chart">
        <h2>Chart heading</h2>
        <p class="caption">What this chart shows.</p>
      </section>

      <section class="activity">
        <h2>Recent activity</h2>
        <ul class="activity-list">
          <li>
            <span class="what">Something happened</span>
            <span class="when">Just now</span>
          </li>
        </ul>
      </section>
    </div>
  </body>
</html>
`,
      css: `/* Name the shell regions and place them with a template-areas block, then
   style the sidebar, the header bar, the stat row, the chart and the list. */

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.5;
}
`,
    },
    designPreviewHtml: `<div class="dashboard">
  <aside class="sidebar">
    <p class="mark">Meridian</p>
    <nav class="side-nav">
      <a class="is-current" href="#dash">Overview</a>
      <a href="#dash">Acquisition</a>
      <a href="#dash">Retention</a>
      <a href="#dash">Revenue</a>
      <a href="#dash">Settings</a>
    </nav>
  </aside>

  <header class="topbar">
    <h1>Overview</h1>
    <span class="account">RP</span>
  </header>

  <section class="stats">
    <article class="stat">
      <p class="stat-label">Active users</p>
      <p class="stat-value">18,204</p>
      <p class="stat-note">Up 6.2% on last week</p>
    </article>
    <article class="stat">
      <p class="stat-label">Trial conversion</p>
      <p class="stat-value">12.8%</p>
      <p class="stat-note">Down 0.4 points</p>
    </article>
    <article class="stat">
      <p class="stat-label">Median session</p>
      <p class="stat-value">4m 12s</p>
      <p class="stat-note">Up 18 seconds</p>
    </article>
    <article class="stat">
      <p class="stat-label">Churn</p>
      <p class="stat-value">1.9%</p>
      <p class="stat-note">Steady this month</p>
    </article>
  </section>

  <section class="chart">
    <h2>Weekly signups</h2>
    <div class="bars">
      <span style="height: 34%"></span>
      <span style="height: 46%"></span>
      <span style="height: 38%"></span>
      <span style="height: 61%"></span>
      <span style="height: 55%"></span>
      <span style="height: 72%"></span>
      <span style="height: 49%"></span>
      <span style="height: 83%"></span>
      <span style="height: 68%"></span>
      <span style="height: 91%"></span>
      <span style="height: 76%"></span>
      <span style="height: 100%"></span>
    </div>
    <p class="caption">Signups per week for the last twelve weeks.</p>
  </section>

  <section class="activity">
    <h2>Recent activity</h2>
    <ul class="activity-list">
      <li>
        <span class="what">Checkout started on Scale plan</span>
        <span class="when">2 minutes ago</span>
      </li>
      <li>
        <span class="what">Team invited two new seats</span>
        <span class="when">18 minutes ago</span>
      </li>
      <li>
        <span class="what">Export of April data generated</span>
        <span class="when">1 hour ago</span>
      </li>
      <li>
        <span class="what">Billing address updated</span>
        <span class="when">3 hours ago</span>
      </li>
      <li>
        <span class="what">Single sign-on enabled for the workspace</span>
        <span class="when">Yesterday</span>
      </li>
    </ul>
  </section>
</div>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

:root {
  --page: #f4f6f8;
  --surface: #ffffff;
  --surface-raised: #eef1f4;
  --line: #dde3e8;
  --accent: #0e7490;
  --text: #16202a;
  --muted: #5f6d78;
}

body {
  margin: 0;
  background: var(--page);
  color: #16202a;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  line-height: 1.5;
}

.dashboard {
  display: grid;
  grid-template-areas:
    "sidebar topbar"
    "sidebar stats"
    "sidebar chart"
    "sidebar activity";
  grid-template-columns: minmax(13rem, 15rem) minmax(0, 1fr);
  gap: 1rem;
  max-width: 72rem;
  min-height: 100vh;
  margin: 0 auto;
  padding: 1.25rem;
}

.sidebar {
  grid-area: sidebar;
  position: sticky;
  top: 1.25rem;
  align-self: start;
  max-height: calc(100vh - 2.5rem);
  overflow-y: auto;
  padding: 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.mark {
  margin: 0 0 1rem;
  color: #0c5c73;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.side-nav a {
  padding: 0.45rem 0.6rem;
  border-radius: 6px;
  color: #5f6d78;
  font-size: 0.9rem;
  text-decoration: none;
}

.side-nav a:hover {
  background: var(--surface-raised);
  color: #16202a;
}

.side-nav a.is-current {
  background: var(--surface-raised);
  color: #0c5c73;
}

.topbar {
  grid-area: topbar;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.topbar h1 {
  margin: 0;
  font-size: clamp(1.05rem, 0.9rem + 0.8vw, 1.6rem);
}

.account {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%;
  background: var(--accent);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 700;
}

.stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.stat {
  padding: 0.9rem 1rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.stat-label {
  margin: 0;
  color: #5f6d78;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.stat-value {
  margin: 0.3rem 0 0.15rem;
  color: #0c5c73;
  font-size: clamp(1.2rem, 1rem + 1vw, 1.75rem);
  font-weight: 700;
  line-height: 1.1;
}

.stat-note {
  margin: 0;
  color: #5f6d78;
  font-size: 0.78rem;
}

.chart {
  grid-area: chart;
  padding: 1.1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.chart h2 {
  margin: 0 0 1rem;
  font-size: 0.95rem;
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;
  height: 9rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--line);
}

.bars span {
  flex: 1;
  border-radius: 4px 4px 0 0;
  background: var(--surface-raised);
}

.bars span:last-child {
  background: var(--accent);
}

.caption {
  margin: 0.7rem 0 0;
  color: #5f6d78;
  font-size: 0.8rem;
}

.activity {
  grid-area: activity;
  padding: 1.1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 10px;
}

.activity h2 {
  margin: 0 0 0.6rem;
  font-size: 0.95rem;
}

.activity-list {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.88rem;
}

.activity-list li {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.55rem 0;
  border-top: 1px solid var(--line);
}

.activity-list .when {
  flex: none;
  color: #5f6d78;
  font-size: 0.78rem;
}

@media (max-width: 820px) {
  .dashboard {
    grid-template-areas:
      "sidebar"
      "topbar"
      "stats"
      "chart"
      "activity";
    grid-template-columns: minmax(0, 1fr);
  }

  .sidebar {
    position: static;
    max-height: none;
  }

  .side-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 460px) {
  .stats { grid-template-columns: minmax(0, 1fr); }
}
`,
    solutionNote:
      'A strong solution names every region of the shell and places them with one grid-template-areas block, so the arrangement is readable in a single glance and can be rearranged without touching the HTML. The sidebar sticks with a top offset, the stat values and the page title use clamp so they hold at every width, and the single breakpoint moves the sidebar above the content instead of squashing it or hiding it.',
  },
  {
    id: 'project-editorial-theme',
    slug: 'longform-article-theme',
    title: 'Long-form Article Theme',
    tagline: 'A single essay column where the measure, the type scale and the vertical rhythm do the design work.',
    summary:
      'Build a readable theme for one long essay: a centred measure, a type scale held in custom properties, a drop cap, pull quotes, captioned figures and a table of figures. The reward is that the same stylesheet then produces a dark version and a clean sheet on paper without a second design.',
    difficulty: 'intermediate',
    technologies: ['html', 'css'],
    estimatedMinutes: 135,
    xp: 400,
    brief: [
      'Choose the measure first: a line of running text is comfortable at roughly sixty-five to seventy characters, so set the article width in ch rather than in a guessed pixel value.',
      'Build a type scale on the root element as custom properties at a fixed ratio, then use those names for the title, the standfirst and the body so the rhythm is decided in one place.',
      'Set the body line-height in the root and loosen it for the long paragraphs, rather than tightening every rule at once.',
      'Pull the opening letter with a pseudo element, float it, and give it a line box that lines up with the first three lines of the paragraph.',
      'Set the pull quote as a blockquote, remove the default quote glyph and draw your own with a before pseudo element so it scales with the type scale.',
      'Wrap every image in a figure with a figcaption, and list those figures in a table of figures near the top so a reader can jump.',
      'Set vertical spacing with margin-block so the rhythm survives a change of writing direction, then finish with a colour scheme override and a sheet-friendly block.',
    ],
    requirements: [
      'Include an article header with a kicker, a title, a one-line standfirst and a byline with a date.',
      'Include a table of figures listing at least two of the figures in the article.',
      'Constrain the text to a readable measure with max-width, expressed in ch or in rem.',
      'Declare a type scale as custom properties on the root element and use those names for at least three different text sizes.',
      'Open the article with a drop cap built with ::first-letter on the first paragraph.',
      'Include at least one pull quote set as a blockquote, with a mark drawn by a ::before pseudo element.',
      'Include at least two figures, each with an image and a figcaption.',
      'Set body text with a line-height above 1.5, and add a small amount of letter-spacing to the smaller text.',
      'Include a prefers-color-scheme query that supplies a dark version of the theme.',
      'Include a block for printing that drops the navigation and switches to a light page with dark text.',
    ],
    checklist: [
      {
        id: 'dc-1',
        label: 'The text column is limited by a max-width measure',
        verify: { kind: 'css-rule', needle: 'max-width', label: 'a max-width rule' },
      },
      {
        id: 'dc-2',
        label: 'Running text has an explicit line-height',
        verify: { kind: 'css-rule', needle: 'line-height', label: 'a line-height rule' },
      },
      {
        id: 'dc-3',
        label: 'The smaller text carries deliberate letter-spacing',
        verify: { kind: 'css-rule', needle: 'letter-spacing', label: 'a letter-spacing rule' },
      },
      {
        id: 'dc-4',
        label: 'The opening paragraph has a drop cap built with ::first-letter',
        verify: { kind: 'css-rule', needle: '::first-letter', label: 'a ::first-letter rule' },
      },
      {
        id: 'dc-5',
        label: 'The pull quote mark is drawn with a ::before pseudo element',
        verify: { kind: 'css-rule', needle: '::before', label: 'a ::before rule' },
      },
      {
        id: 'dc-6',
        label: 'A dark version of the theme is supplied through prefers-color-scheme',
        verify: { kind: 'css-rule', needle: 'prefers-color-scheme', label: 'a prefers-color-scheme query' },
      },
      {
        id: 'dc-7',
        label: 'A block for printing adjusts the page',
        verify: { kind: 'css-rule', needle: 'print', label: 'an @media print block' },
      },
      {
        id: 'dc-8',
        label: 'The measure holds at sixty-five to seventy characters and the rhythm is even between blocks',
        verify: { kind: 'manual', label: 'the running text measures about 65 to 70 characters, and the space between every block is consistent' },
      },
    ],
    assets: [
      {
        id: 'dc-figure-photo',
        label: 'Figure 1 photograph, the only linked image in the reference',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200',
        alt: 'A cup of coffee',
      },
    ],
    starterFiles: {
      html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Essay title</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <article class="essay">
      <header class="essay-head">
        <p class="kicker">Section name</p>
        <h1>Essay title</h1>
        <p class="standfirst">One sentence that tells the reader why this is worth their time.</p>
        <p class="byline">By Author Name on 1 January 2026</p>
      </header>

      <nav class="figures-index" aria-label="Table of figures">
        <h2>Figures</h2>
        <ol>
          <li><a href="#fig-1">Figure 1. What the chart shows</a></li>
          <li><a href="#fig-2">Figure 2. The second chart</a></li>
        </ol>
      </nav>

      <div class="prose">
        <p class="opener">The opening paragraph of the essay goes here, and it is the one that carries the drop cap.</p>

        <p>Ordinary body copy goes here. Write two or three real sentences rather than leaving placeholder text in place.</p>

        <figure id="fig-1">
          <!-- Figure 1 goes here: an image with width, height and alt text you actually mean. -->
          <figcaption>Figure 1. A caption that explains what the reader is looking at.</figcaption>
        </figure>

        <blockquote class="pull">
          <p>A sentence from the essay, set apart from the body copy.</p>
          <cite>Author Name</cite>
        </blockquote>

        <figure id="fig-2">
          <!-- Figure 2 goes here. A chart can be inline svg rather than an image file. -->
          <figcaption>Figure 2. A caption for the second chart.</figcaption>
        </figure>

        <h2>A second section</h2>

        <p>The essay continues here.</p>
      </div>
    </article>
  </body>
</html>
`,
      css: `/* Declare the type scale on :root, then the measure, the body rhythm,
   the drop cap, the pull quote, the figures and the scheme overrides. */

body {
  margin: 0;
  font-family: Georgia, "Times New Roman", serif;
}
`,
    },
    designPreviewHtml: `<article class="essay">
  <header class="essay-head">
    <p class="kicker">Field notes</p>
    <h1>The quiet cost of a page that arrives quickly</h1>
    <p class="standfirst">Speed work is mostly invisible work, and the parts nobody measures are the parts users feel.</p>
    <p class="byline">By Rowan Adeyemi on 12 May 2026</p>
  </header>

  <nav class="figures-index" aria-label="Table of figures">
    <h2>Figures</h2>
    <ol>
      <li><a href="#fig-1">Figure 1. The first photograph in the essay</a></li>
      <li><a href="#fig-2">Figure 2. Where the wait actually goes</a></li>
    </ol>
  </nav>

  <div class="prose">
    <p class="opener">There is a number in every performance review that everyone quotes and almost nobody owns, and it is the one that changes the least after a quarter of optimisation work.</p>

    <p>It is easy to make a page feel fast on a laptop connected to a fibre line, and rather hard to make it feel fast on a phone in a lift. The gap between those two experiences is where most of the dissatisfaction with a fast site actually lives.</p>

    <figure id="fig-1">
      <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200" alt="A cup of coffee" width="1200" height="800" />
      <figcaption>Figure 1. A photograph in the flow of the essay, captioned the way any other image would be.</figcaption>
    </figure>

    <blockquote class="pull">
      <p>The number you report is the number you measured, not the number your users experience.</p>
      <cite>Rowan Adeyemi</cite>
    </blockquote>

    <p>A page that scores well and loads slowly has still failed. The two things are related but they are not the same measurement, and a team that only watches one of them will quietly optimise the wrong part of the system.</p>

    <figure id="fig-2">
      <svg class="chart" viewBox="0 0 600 300" width="600" height="300" role="img" aria-label="Bar chart of a single 600 millisecond wait, split into 380 milliseconds of network time, 140 milliseconds of parsing and 80 milliseconds of painting.">
        <title>One 600 millisecond wait, split into network, parse and paint time</title>
        <line class="chart-axis" x1="70" y1="240" x2="570" y2="240" />
        <rect class="chart-bar" x="115" y="41" width="90" height="199" />
        <rect class="chart-bar chart-bar-muted" x="275" y="167" width="90" height="73" />
        <rect class="chart-bar chart-bar-muted" x="435" y="198" width="90" height="42" />
        <text class="chart-value" x="160" y="31" text-anchor="middle">380 ms</text>
        <text class="chart-value" x="320" y="157" text-anchor="middle">140 ms</text>
        <text class="chart-value" x="480" y="188" text-anchor="middle">80 ms</text>
        <text class="chart-label" x="160" y="264" text-anchor="middle">Network</text>
        <text class="chart-label" x="320" y="264" text-anchor="middle">Parse</text>
        <text class="chart-label" x="480" y="264" text-anchor="middle">Paint</text>
      </svg>
      <figcaption>Figure 2. One 600 millisecond wait, drawn as three bars. Network time is most of it.</figcaption>
    </figure>

    <h2>Measure the wait, not the score</h2>

    <p>Start with the moment the user asked for something and end with the moment they could act on it. Everything in between is a cost you can either pay or remove, and writing that down before optimising is the whole trick.</p>

    <p>Once the sequence is written down, the arguments get shorter. The remaining decisions are ordinary engineering ones, made with the trade-offs visible.</p>
  </div>

  <footer class="essay-foot">
    <p>Published in Field notes. Reuse this theme with your own typography.</p>
  </footer>
</article>
`,
    designPreviewCss: `*, *::before, *::after { box-sizing: border-box; }

:root {
  --measure: 68ch;
  --step--1: 0.85rem;
  --step-0: 1.05rem;
  --step-1: 1.3rem;
  --step-2: clamp(1.6rem, 1.2rem + 1.8vw, 2.4rem);
  --step-3: clamp(2rem, 1.5rem + 2.6vw, 3.2rem);
  --space: 1.25rem;
  --page: #fbfaf6;
  --surface: #ffffff;
  --line: #e2ddd1;
  --accent: #9a3412;
  --text: #1f1d1a;
  --muted: #67625a;
  --strong-accent: #7c2d12;
}

body {
  margin: 0;
  background: var(--page);
  color: var(--text);
  font-family: Georgia, "Times New Roman", serif;
  font-size: var(--step-0);
  line-height: 1.65;
}

.essay {
  max-width: var(--measure);
  margin: 0 auto;
  padding: 3.5rem 1.25rem 4rem;
}

.essay-head {
  margin-block-end: 2.5rem;
  padding-block-end: 1.5rem;
  border-block-end: 1px solid var(--line);
}

.kicker {
  margin: 0 0 0.75rem;
  color: var(--strong-accent);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: var(--step--1);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

h1 {
  margin: 0 0 0.75rem;
  font-size: var(--step-3);
  line-height: 1.12;
}

.standfirst {
  margin: 0 0 1rem;
  color: var(--text);
  font-size: var(--step-1);
  line-height: 1.45;
}

.byline {
  margin: 0;
  color: var(--muted);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: var(--step--1);
  letter-spacing: 0.04em;
}

.figures-index {
  margin-block-end: 2.5rem;
  padding: 1rem 1.25rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
}

.figures-index h2 {
  margin: 0 0 0.5rem;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.figures-index ol {
  margin: 0;
  padding-inline-start: 1.25rem;
  font-size: 0.9rem;
}

.figures-index a {
  color: var(--strong-accent);
  text-decoration: none;
}

.figures-index a:hover { text-decoration: underline; }

.prose > * {
  margin-block: 0;
  margin-block-end: var(--space);
}

.prose p { margin-block-end: var(--space); }

.opener::first-letter {
  float: inline-start;
  margin-inline-end: 0.6rem;
  padding-block-start: 0.35rem;
  color: var(--strong-accent);
  font-size: 3.4em;
  line-height: 0.8;
}

h2 {
  margin-block: 2.25rem 0.9rem;
  font-size: var(--step-2);
  line-height: 1.2;
}

figure {
  margin: 2rem 0;
}

figure img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--line);
  border-radius: 8px;
}

figure svg.chart {
  display: block;
  width: 100%;
  height: auto;
  padding: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--accent);
  overflow: visible;
}

.chart-bar { fill: currentColor; }
.chart-bar-muted { fill: var(--muted); }
.chart-axis { stroke: currentColor; stroke-width: 1; stroke-opacity: 0.5; }
.chart-value { fill: currentColor; font-size: 14px; font-weight: 700; }
.chart-label { fill: var(--muted); font-size: 13px; letter-spacing: 0.04em; }

figcaption {
  margin-block-start: 0.6rem;
  color: var(--muted);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: var(--step--1);
  letter-spacing: 0.03em;
}

.pull {
  position: relative;
  margin: 2.25rem 0;
  padding: 1.25rem 1.5rem 1.25rem 2.25rem;
  background: var(--surface);
  border-inline-start: 3px solid var(--accent);
  border-radius: 0 8px 8px 0;
}

.pull::before {
  content: "";
  position: absolute;
  inset-block-start: 1.1rem;
  inset-inline-start: 0.75rem;
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background: var(--accent);
}

.pull p {
  margin: 0 0 0.5rem;
  font-size: var(--step-1);
  font-style: italic;
  line-height: 1.4;
}

.pull cite {
  color: var(--muted);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: var(--step--1);
  font-style: normal;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.essay-foot {
  margin-block-start: 3rem;
  padding-block-start: 1.25rem;
  border-block-start: 1px solid var(--line);
  color: var(--muted);
  font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: var(--step--1);
}

@media (max-width: 640px) {
  .essay { padding: 2.5rem 1rem 3rem; }
}

@media (prefers-color-scheme: dark) {
  /* Every text colour has to move, not just the page, or the hard-won habit of
     setting body colour leaves half the essay dark on dark. */
  :root {
    --page: #17191d;
    --surface: #1f2226;
    --line: #33383f;
    --text: #ecebe7;
    --muted: #a5a29a;
    --accent: #e2703a;
    --strong-accent: #f0915c;
  }
}

@media print {
  :root { --page: #ffffff; --surface: #ffffff; --line: #c9c3b6; --muted: #55504a; --text: #111111; --accent: #9a3412; --strong-accent: #7c2d12; }

  body { background: #ffffff; color: #111111; }

  .figures-index,
  .essay-foot { display: none; }

  .prose > * { margin-block-end: 0.75rem; }

  figure { break-inside: avoid; }

  figure svg.chart { color: #1f1d1a; }
}
`,
    solutionNote:
      'A strong solution sets the measure in ch so the line length stays readable when the reader changes their text size, and holds the whole hierarchy in custom properties defined on the root element. The drop cap is a float with a matching line box, the pull quote is a blockquote with the mark drawn in CSS, and the dark version and the sheet version are both handled by media queries rather than by a second stylesheet.',
  },
]