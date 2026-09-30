#codeIngot name of the Application

#Brand Color - #29e2bd

# Build a Full Interactive Coding Education Platform

Build a modern, scalable, interactive coding-learning platform inspired by the product architecture of modern practice-first coding platforms.

The platform should **not** be designed as a traditional educational blog or static documentation website.

It should be a complete **learn-by-doing coding platform** where users:

> Choose a learning path → learn a concept → write code → run it → receive feedback → solve challenges → take quizzes → complete projects → track progress.

The initial focus is **Web Development**, beginning with:

* HTML
* CSS
* JavaScript

The architecture must be designed from day one to support additional technologies and learning paths later.

Potential future technologies:

* TypeScript
* React
* Vue
* Nuxt
* Next.js
* Git
* GitHub
* Node.js
* Python
* SQL
* APIs
* Linux
* Docker
* Data Structures & Algorithms
* UI/UX
* Web Accessibility

Do not redesign the application when these are added. The system should be content-driven and modular.

---

# 1. PRODUCT PHILOSOPHY

The central philosophy is:

> Learn by writing code, not just reading about code.

Every major learning concept should eventually lead to interaction.

Instead of:

```text
Read 20 paragraphs
↓
Next
↓
Read 20 more paragraphs
```

use:

```text
Learn
↓
See
↓
Try
↓
Code
↓
Run
↓
Fix
↓
Understand
↓
Challenge
```

Lessons should be short, focused and progressively harder.

The platform should feel closer to a coding application than an online textbook.

---

# 2. NO LOGIN IN VERSION 1

Version 1 must NOT require:

* Registration
* Login
* Password
* Email
* User account
* Backend authentication

The platform should open immediately and allow the learner to start.

All progress should initially be stored locally.

Use:

```text
localStorage
```

Architecture should nevertheless make it possible to replace the local progress provider with a remote database later.

Create an abstraction such as:

```ts
ProgressStorage
```

with an initial implementation:

```ts
LocalProgressStorage
```

Future implementation:

```ts
CloudProgressStorage
```

This means account synchronization can be introduced later without rewriting the learning system.

---

# 3. TECHNOLOGY STACK

Use:

* Nuxt 4
* Vue 3
* TypeScript
* Tailwind CSS
* Nuxt UI where appropriate

Use:

```vue
<script setup lang="ts">
```

Use composables and reusable components.

Avoid monolithic Vue components.

---

# 4. APPLICATION STRUCTURE

The application should have two major experiences.

## Public Experience

```text
Home
Courses
Learning Paths
About
Reference
```

## Learning Experience

```text
Dashboard
Learning Path
Course
Section
Lesson
Challenge
Quiz
Project
Playground
Progress
Achievements
```

---

# 5. MAIN NAVIGATION

Desktop navigation:

```text
[Logo]

Learn
Paths
Challenges
Projects
Playground
Reference

Search

Progress
```

Do not overcrowd the header.

Mobile navigation should collapse into a clean navigation drawer.

---

# 6. HOMEPAGE

The homepage should immediately communicate:

> Learn to code by actually coding.

Hero:

```text
Learn to Build.
Build to Learn.

Interactive coding lessons designed to take you from beginner to developer.

[Start Learning]
[Explore Paths]
```

Use a visual representation of the interactive coding environment rather than generic stock photography.

Show code being written and executed.

Example:

```js
const future = "developer";

console.log(future);
```

Then show:

```text
✓ Code executed successfully
```

---

# 7. HOMEPAGE SECTIONS

## Hero

Headline.

Description.

Primary CTA.

Secondary CTA.

Interactive code visual.

---

## Choose Your Path

Show learning paths rather than only individual courses.

Initial path:

### Frontend Developer

```text
HTML
↓
CSS
↓
JavaScript
↓
DOM
↓
Responsive Design
↓
Web APIs
↓
Projects
```

Display:

```text
Beginner
X Courses
X Lessons
X Challenges
```

CTA:

```text
Start Path
```

---

# 8. COURSE CATALOG

Create:

```text
/courses
```

The catalog should eventually contain hundreds of courses.

Version 1 can contain only a few.

Categories:

```text
Web Development
Programming
Computer Science
Tools
Projects
```

Filters:

```text
Technology
Difficulty
Topic
Course type
```

Search:

```text
Search courses...
```

---

# 9. COURSE CARD

Every course card should show:

```text
[Icon]

HTML Fundamentals

Learn the structure of the web from scratch.

Beginner

24 Lessons
18 Challenges
3 Quizzes

[Progress bar]

Start / Continue
```

Possible badges:

```text
Beginner
Popular
New
Project
Certificate
```

Do not visually overload cards.

---

# 10. LEARNING PATHS

Learning paths are one of the most important features.

Create:

```text
/paths
```

Initial path:

# Frontend Developer

Description:

> Learn the skills needed to build modern websites and web applications.

Path:

```text
01 HTML
    ↓
02 CSS
    ↓
03 JavaScript
    ↓
04 DOM & Browser APIs
    ↓
05 Responsive Web Design
    ↓
06 Git & GitHub
    ↓
07 TypeScript
    ↓
08 React
    ↓
09 Frontend Projects
```

Initially implement only:

```text
HTML
CSS
JavaScript
```

but design the data model to support all future steps.

---

# 11. PATH PROGRESS

Display:

```text
Frontend Developer

3 / 9 courses completed

████████░░░░ 33%

Continue with:

JavaScript Fundamentals
```

Each course should have a status:

```text
Locked
Available
In Progress
Completed
```

However, don't make the platform unnecessarily restrictive.

Users should be able to open courses independently.

---

# 12. COURSE STRUCTURE

Every course contains:

```text
Course
├── Overview
├── Sections
│   ├── Lessons
│   ├── Challenges
│   └── Quiz
├── Projects
└── Completion
```

Example:

```text
HTML Fundamentals

Section 1
HTML Basics

Section 2
Text & Links

Section 3
Images & Media

Section 4
Lists & Tables

Section 5
Forms

Section 6
Semantic HTML

Section 7
Accessibility

Final Project
```

---

# 13. LESSON DESIGN

Lessons should be bite-sized.

Target approximately:

```text
3–10 minutes
```

depending on complexity.

Every lesson should have:

```text
Lesson title
Learning objective
Explanation
Example
Interactive exercise
Challenge
Optional quiz
```

---

# 14. LESSON SCREEN

The lesson screen should feel like a coding application.

Desktop layout:

```text
┌──────────────────────────────────────────────────────────┐
│ Header                                                   │
├───────────────┬───────────────────────────┬──────────────┤
│ Course        │ Lesson                    │ Contents     │
│ Navigation    │                           │              │
│               │ Explanation               │ Introduction │
│ ✓ Lesson 1    │                           │ Example      │
│ ✓ Lesson 2    │ Code Editor               │ Challenge    │
│ ● Lesson 3    │                           │              │
│ ○ Lesson 4    │ Preview                   │              │
│ ○ Lesson 5    │                           │              │
└───────────────┴───────────────────────────┴──────────────┘
```

On mobile, the course navigation becomes a drawer.

---

# 15. INTERACTIVE CODING

This is the heart of the platform.

Do not make the learner simply read code.

Provide a real editor.

For HTML:

```text
HTML
Preview
```

For CSS:

```text
HTML
CSS
Preview
```

For JavaScript:

```text
HTML
CSS
JavaScript
Preview
Console
```

---

# 16. EXERCISE MODEL

Each exercise should define:

```ts
interface CodingExercise {
  id: string
  instructions: string
  language: string
  starterCode: string
  expectedOutput?: string
  tests?: TestCase[]
  hints?: string[]
  solution?: string
}
```

The learner writes code.

They click:

```text
Run
```

Then:

```text
Check
```

The platform evaluates the solution.

---

# 17. TEST CASES

Challenges should preferably use test cases rather than simply comparing text.

Example:

```text
Test 1 ✓
Test 2 ✓
Test 3 ✗
```

Display useful feedback.

Example:

```text
2 of 3 tests passed.

Your function works for positive numbers,
but the negative-number case needs attention.
```

Do not immediately reveal the full solution.

---

# 18. HINT SYSTEM

Every challenge can have progressive hints.

Example:

```text
Need help?

[Hint 1]

[Hint 2]

[Show concept]

[Show solution]
```

Hints should gradually become more explicit.

The goal is to teach rather than simply provide answers.

---

# 19. CODE EDITOR

Build a reusable:

```text
<CodeEditor />
```

Features:

* Syntax highlighting
* Line numbers
* Copy
* Reset
* Run
* Check
* Error display
* Tab support
* Keyboard shortcuts where appropriate
* Responsive behavior

Use a proper editor implementation rather than a plain textarea if practical.

---

# 20. WEB PLAYGROUND

Create:

```text
/playground
```

This should be a free experimentation environment.

Tabs:

```text
HTML
CSS
JavaScript
```

Panels:

```text
Editor
Preview
Console
```

Buttons:

```text
Run
Reset
Clear
```

Later support:

```text
Save Project
Export
Share
```

---

# 21. JAVASCRIPT SANDBOX

Never execute arbitrary learner JavaScript directly inside the main application context.

Use an isolated/sandboxed execution environment where practical.

Capture:

```text
console.log()
console.error()
runtime errors
```

and display them in the learning environment.

---

# 22. QUIZZES

Every section can contain a quiz.

Question types:

* Multiple choice
* True/false
* Fill in the blank
* Code output
* Identify the error

Example:

```text
What does this code output?

const x = 5;
console.log(x + 2);
```

Answer:

```text
7
```

Show an explanation after answering.

---

# 23. CHALLENGES

Create a dedicated:

```text
/challenges
```

page.

Filters:

```text
HTML
CSS
JavaScript
Beginner
Intermediate
Advanced
```

Each challenge card:

```text
Build a Responsive Card

CSS
Beginner

Practice:
Flexbox
Responsive Design

Estimated time:
15 min

[Start Challenge]
```

---

# 24. PROJECTS

Create:

```text
/projects
```

Projects should be larger than individual challenges.

Initial projects:

### Project 1

Personal Profile Page

HTML

---

### Project 2

Responsive Landing Page

HTML + CSS

---

### Project 3

Interactive Calculator

HTML + CSS + JavaScript

---

### Project 4

Todo Application

HTML + CSS + JavaScript + LocalStorage

---

### Project 5

Quiz Application

HTML + CSS + JavaScript

---

# 25. PROJECT EXPERIENCE

Project screen:

```text
Project
Requirements
Design Preview
Starter Files
Editor
Preview
Checklist
Submit
```

Checklist:

```text
✓ Page structure
✓ Responsive layout
○ Interactive button
○ Form validation
○ Final polish
```

---

# 26. GAMIFICATION

Add a lightweight game layer.

Track:

```text
XP
Level
Streak
Lessons completed
Challenges completed
Projects completed
Quiz scores
Achievements
```

Example:

```text
Level 7
1,240 XP

██████████░░ 82%
```

Do not make gamification more prominent than learning.

---

# 27. XP SYSTEM

Award XP for:

```text
Complete lesson
Complete challenge
Pass quiz
Complete project
Maintain learning streak
```

Avoid rewarding meaningless repeated clicking.

---

# 28. DAILY STREAK

Display:

```text
🔥 7 day streak
```

Calendar:

```text
M T W T F S S
✓ ✓ ✓ ✓ ✓ ✓ ○
```

The system should track the user's activity locally.

Do not make losing a streak destructive to learning progress.

---

# 29. ACHIEVEMENTS

Examples:

```text
First Lesson
First Challenge
First Project
HTML Complete
CSS Complete
JavaScript Complete
7 Day Streak
50 Challenges
100 Lessons
```

Achievements should be automatically calculated from progress.

---

# 30. DASHBOARD

Create:

```text
/dashboard
```

The dashboard should answer:

> What should I do next?

Top section:

```text
Welcome back.

Continue learning:

JavaScript
Functions

[Continue]
```

Then:

```text
Your Progress
```

Then:

```text
Current Path
```

Then:

```text
Recent Achievements
```

Then:

```text
Daily Goal
```

---

# 31. LOCAL PROGRESS ENGINE

Create a central progress composable:

```ts
useLearningProgress()
```

Do not scatter localStorage logic across components.

Store:

```ts
interface UserProgress {
  completedLessons: string[]
  completedChallenges: string[]
  completedProjects: string[]
  quizScores: Record<string, number>
  courseProgress: Record<string, CourseProgress>
  pathProgress: Record<string, PathProgress>
  xp: number
  streak: StreakData
  achievements: string[]
  lastVisitedLesson?: string
  lastActiveAt?: string
}
```

Store under:

```text
app-learning-progress
```

---

# 32. PROGRESS MUST BE DERIVED

Do not manually store everything.

For example:

```text
Course progress =
completed lessons / total lessons
```

Path progress should be derived from course completion.

XP can be stored as an accumulated value.

Achievements should be calculated from events/progress where practical.

---

# 33. COURSE COMPLETION

When the learner completes all required content:

Show:

```text
COURSE COMPLETE

HTML Fundamentals

✓ Lessons
✓ Challenges
✓ Quizzes
✓ Final project

100% Complete

[Continue to CSS]
```

Future-ready:

```text
[View Certificate]
```

Do not require certificates in version 1 unless implemented properly.

---

# 34. REFERENCE

Create:

```text
/reference
```

Searchable technical references.

HTML:

```text
<a>
<button>
<form>
<input>
<img>
<section>
article
header
footer
nav
```

CSS:

```text
display
position
flex
grid
margin
padding
color
font
```

JavaScript:

```text
Array
Object
Map
Function
Promise
fetch
querySelector
addEventListener
```

---

# 35. GLOBAL SEARCH

Implement a command/search interface.

Keyboard shortcut:

```text
Ctrl + K
```

Search:

```text
HTML links
Flexbox
JavaScript functions
DOM
Array methods
```

Results should include:

```text
Lessons
Courses
Challenges
Projects
Reference
```

---

# 36. CONTENT DATA MODEL

Do NOT hardcode lessons into page components.

Use content objects.

Example:

```ts
interface Course {
  id: string
  slug: string
  title: string
  description: string
  technology: Technology
  difficulty: Difficulty
  sections: Section[]
  projects?: Project[]
}
```

```ts
interface Section {
  id: string
  title: string
  description: string
  lessons: Lesson[]
  quiz?: Quiz
}
```

```ts
interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  content: LessonBlock[]
  exercises?: CodingExercise[]
  quiz?: Quiz
}
```

---

# 37. LESSON BLOCK SYSTEM

Instead of hardcoding HTML for every lesson, support blocks such as:

```ts
type LessonBlock =
  | TextBlock
  | HeadingBlock
  | CodeBlock
  | TipBlock
  | WarningBlock
  | ExampleBlock
  | ExerciseBlock
  | QuizBlock
  | ImageBlock
```

This allows the content team to build lessons without changing application components.

---

# 38. INITIAL CONTENT

Start with high-quality content rather than trying to create hundreds of lessons immediately.

Initial courses:

```text
HTML Fundamentals
CSS Fundamentals
JavaScript Fundamentals
```

Then expand into:

```text
Responsive Web Design
DOM Manipulation
JavaScript Projects
Web APIs
Git & GitHub
TypeScript
React
```

---

# 39. FRONTEND ROADMAP

The first major roadmap should eventually look like:

```text
FRONTEND DEVELOPER

01 HTML
    Structure of the web

02 CSS
    Styling and layout

03 JavaScript
    Programming and interaction

04 DOM
    Control the browser

05 Responsive Web Design
    Build for every screen

06 Git & GitHub
    Version control

07 TypeScript
    Safer JavaScript

08 React
    Component-based interfaces

09 Projects
    Build real applications
```

---

# 40. DESIGN LANGUAGE

The platform should feel:

* Modern
* Developer-focused
* Friendly
* Fast
* Interactive
* Slightly gamified
* Professional

Avoid making it look like a school management system.

Avoid:

* Generic stock photography
* Huge text walls
* Excessive gradients
* Excessive glass effects
* Overly complex dashboards
* Unnecessary animations

---

# 41. COLOR SYSTEM

Use a dark-first developer aesthetic.

Example:

```text
Background:
#0B0D10

Surface:
#11151A

Elevated:
#171C22

Border:
#252C35

Text:
#F4F7FA

Muted:
#8B96A5

Primary:
Choose one distinctive brand accent.

Success:
Green

Warning:
Amber

Error:
Red
```

Do not copy Coddy's branding.

Create an original visual identity.

---

# 42. RESPONSIVE LEARNING EXPERIENCE

On desktop:

```text
Sidebar
Lesson
Editor / Preview
```

On tablet:

```text
Course navigation
Lesson
Editor
```

On mobile:

```text
Lesson
↓
Editor
↓
Preview
↓
Challenge
```

The editor must remain usable on small screens.

---

# 43. ACCESSIBILITY

The platform should itself demonstrate good web development practices.

Implement:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Screen-reader-friendly controls
* Correct heading hierarchy
* Accessible forms
* Sufficient color contrast
* Reduced motion support

---

# 44. PERFORMANCE

The learning interface should feel extremely fast.

Optimize:

* Course data loading
* Editor initialization
* Lesson rendering
* Search
* Progress calculations
* localStorage reads/writes

Avoid unnecessary global state.

Lazy-load heavy editor functionality when appropriate.

---

# 45. OFFLINE-FIRST DIRECTION

Version 1 should work without a backend for learning content and progress.

Future architecture should support:

```text
Browser
   ↓
Local content
   ↓
Local progress
```

Later:

```text
Browser
   ↓
API
   ↓
Account
   ↓
Cloud database
```

Do not build the architecture around the assumption that a backend will never exist.

---

# 46. FUTURE ACCOUNT SYSTEM

Do not implement now.

But leave a clean abstraction for:

```text
Anonymous learner
        ↓
Optional account
        ↓
Cloud synchronization
```

A future user could log in and synchronize:

* Progress
* XP
* Streak
* Achievements
* Projects
* Certificates

without changing the core learning UI.

---

# 47. FUTURE AI TUTOR

Do not require AI for version 1.

But design challenges so they can eventually expose context to an AI tutor:

```text
Current lesson
Current exercise
Learner code
Test results
Error message
Hints already viewed
```

Future feature:

```text
Ask for a hint
```

The AI should explain concepts and errors rather than immediately dumping the answer.

---

# 48. FUTURE CERTIFICATES

Design course completion events so certificates can eventually be generated.

Example:

```text
Certificate ID
Course
Learner
Completion date
Skills
Verification URL
```

Do not implement fake certificates or unverifiable credentials.

---

# 49. FUTURE SOCIAL FEATURES

Keep the architecture open for:

```text
Leaderboards
Friends
Public projects
Project sharing
Community challenges
Comments
Achievements
```

Do not implement these in version 1.

---

# 50. VERSION 1 PRIORITIES

The first release should prioritize quality over feature count.

Build these exceptionally well:

### Priority 1

Landing page

### Priority 2

Course catalog

### Priority 3

Learning paths

### Priority 4

Course structure

### Priority 5

Interactive lessons

### Priority 6

HTML/CSS/JavaScript editor

### Priority 7

Challenges

### Priority 8

Quizzes

### Priority 9

Local progress

### Priority 10

Dashboard

### Priority 11

Projects

### Priority 12

Playground

---

# 51. DO NOT BUILD YET

Do not initially build:

* Authentication
* Payments
* Subscriptions
* Social network
* Chat
* Complex backend
* Global leaderboard
* AI tutor
* Cloud synchronization
* Mobile application
* Certificate verification infrastructure

Architect for them, but don't let them slow down the core learning experience.

---

# 52. THE MOST IMPORTANT USER FLOW

The application should make this flow incredibly smooth:

```text
Open website
     ↓
Choose Frontend Developer
     ↓
Start HTML
     ↓
Lesson 1
     ↓
Read a short explanation
     ↓
Write code
     ↓
Run
     ↓
Get result
     ↓
Solve challenge
     ↓
Pass
     ↓
Earn XP
     ↓
Lesson completed
     ↓
Next lesson
     ↓
Repeat
```

The learner should never feel like they are simply reading documentation.

---

# 53. PRODUCT PRINCIPLE

Every feature should answer one question:

> Does this help the learner become better at coding?

If yes, implement it.

If it is merely decorative, reconsider it.

---

# 54. FINAL PRODUCT VISION

This should eventually become a complete developer-learning ecosystem.

The long-term structure:

```text
                         PLATFORM
                            │
          ┌─────────────────┼──────────────────┐
          │                 │                  │
        COURSES           PATHS             PRACTICE
          │                 │                  │
       HTML/CSS/JS     Frontend Dev       Challenges
       Python          Full Stack         Projects
       SQL             Backend            Playground
       Java            Data               Quizzes
       C++             DevOps
          │
          └─────────────────┬──────────────────┘
                            │
                       LEARNER
                            │
                 ┌──────────┼──────────┐
                 │          │          │
                XP       Progress    Skills
                 │          │          │
              Streaks   Achievements Projects
```

The initial product is:

> **An interactive HTML/CSS/JavaScript learning platform.**

The eventual product is:

> **A complete learn-by-doing environment for becoming a developer.**

Build version 1 with that larger architecture in mind, but keep the first release focused, fast, and exceptionally polished.
