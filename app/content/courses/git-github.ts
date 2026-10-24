import type { Section } from '~/types/content'

export const gitGitHubSections: Section[] = [
  {
    id: 'git-s1',
    title: 'Introduction to Version Control',
    description: 'What version control is, why Git dominates the industry, and the distributed model that changed collaboration.',
    lessons: [
      {
        id: 'git-l1',
        title: 'What is version control?',
        description: 'Tracking changes, comparing versions, reverting mistakes, and why no professional project ships without it.',
        duration: 7,
        objectives: [
          'Explain what version control does',
          'Compare local, centralised and distributed models',
          'Describe the problems version control solves',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l1',
          title: 'What is version control? quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l1-q1',
              type: 'multiple-choice',
              prompt: 'What is the main advantage of a distributed version control system?',
              options: [
                'There is only one server',
                'Every clone is a full backup and can work offline',
                'It uses less disk space',
                'It does not need a network',
              ],
              answer: 1,
              explanation: 'In a distributed system, every clone contains the full history and can function independently.',
            },
            {
              id: 'quiz-git-l1-q2',
              type: 'multiple-choice',
              prompt: 'A team keeps its only repository copy on one server, and everyone commits there. What is the main risk of this centralised model?',
              options: [
                'History is duplicated on every laptop',
                'Developers cannot commit while offline, so the model cannot work',
                'The server is a single point of failure: lose it and the whole history is gone',
                'Branching costs a full copy of the project',
              ],
              answer: 2,
              explanation: 'A centralised system keeps the database on one server, so every client depends on it. A distributed system survives the loss of any one machine because each clone is a full backup.',
            },
            {
              id: 'quiz-git-l1-q3',
              type: 'multiple-choice',
              prompt: 'In a purely local version control system such as RCS, what limits the workflow?',
              options: [
                'Only one person can work on the files, and nobody else can pull the history',
                'Every commit requires a network connection',
                'It stores only the latest version of each file',
                'It cannot track text files',
              ],
              answer: 0,
              explanation: 'The database lives on a single machine, so history is private to that machine and there is no way to share or merge work with collaborators.',
            },
            {
              id: 'quiz-git-l1-q4',
              type: 'blank',
              prompt: 'Which command sets the name Git attaches to every commit you make?',
              answers: [
                'git config --global user.name',
              ],
              explanation: 'Commit metadata comes from the configured identity, so setting it once with --global applies to every repository you work in.',
            },
            {
              id: 'quiz-git-l1-q5',
              type: 'true-false',
              prompt: 'In a centralised system each developer holds a complete copy of the project history.',
              answer: false,
              explanation: 'In a centralised model the history lives in one server database, and a working copy depends on that server. Full local copies are the defining feature of the distributed model.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l1-d1',
            title: 'A terminal that only knows Git',
            body: 'This is a simulation, not a real repository. Press a command to see what Git prints back. The two `git config` lines read the identity that every commit will carry.',
            html: `<div class="term">
  <button data-cmd="git --version">git --version</button>
  <button data-cmd="git config --global user.name">git config --global user.name</button>
  <button data-cmd="git config --global user.email">git config --global user.email</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git --version': 'git version 2.45.2',
  'git config --global user.name': 'Ada Lovelace',
  'git config --global user.email': 'ada@example.com',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l1-b1',
            body: 'Version control is a system that records every change to a file or set of files so you can recall specific versions later. Without it, you are left with filenames like final-v2-really-final.docx and email attachments with no clear history. With it, every change has an author, a timestamp, and a message. You can compare any two versions, revert a broken change in seconds, and collaborate with a team without overwriting each other\'s work.',
          },
          {
            type: 'heading',
            id: 'g-l1-h1',
            level: 3,
            body: 'The three models',
          },
          {
            type: 'list',
            id: 'g-l1-l1',
            style: 'bullet',
            items: [
              '**Local** — the database lives on your machine. SVN and RCS are local. Simple but no collaboration.',
              '**Centralised** — one server holds the database. CVS and Subversion are centralised. Everyone commits to the same place. The server is a single point of failure.',
              '**Distributed** — every clone is a full backup. Git is distributed. You can commit offline, branch freely, and merge from any peer.',
            ],
          },
          {
            type: 'code',
            id: 'g-l1-c1',
            language: 'plaintext',
            title: 'Git in the terminal',
            code: `# check git is installed
git --version

# configure your identity
git config --global user.name "Ada Lovelace"
git config --global user.email "ada@example.com"`,
          },
          {
            type: 'tip',
            id: 'g-l1-t1',
            title: 'Set your identity once',
            body: 'Run git config --global once. Every commit you make will include your name and email. Use the same email you use on GitHub so commits link to your profile.',
          },
          {
            type: 'exercise',
            id: 'g-l1-x1',
            exercise: {
              id: 'ex-git-l1',
              instructions: 'Configure your Git identity by writing a JavaScript object with a user name and email.',
              languages: ['javascript'],
              starterCode: { javascript: '// Configure your Git identity\n\nconst gitConfig = {\n  user: {\n    name: "",\n    email: ""\n  }\n};\n' },
              expectedOutput: 'Git identity configured with name and email',
              tests: [
                {
                  id: 'ex-git-l1-t1',
                  label: 'Config has a user.name',
                  body: `return typeof gitConfig === 'object' && gitConfig.user && typeof gitConfig.user.name === 'string' && gitConfig.user.name.length > 0;`,
                },
                {
                  id: 'ex-git-l1-t2',
                  label: 'Config has a user.email with @',
                  body: `return typeof gitConfig === 'object' && gitConfig.user && typeof gitConfig.user.email === 'string' && gitConfig.user.email.includes('@');`,
                },
              ],
              hints: [
                'Create a gitConfig object with a user property containing name and email.',
                'Give name a non-empty string and email a string containing "@".',
              ],
              solution: {
                javascript: '// Configure your Git identity\n\nconst gitConfig = {\n  user: {\n    name: "Ada Lovelace",\n    email: "ada@example.com"\n  }\n};\n',
              },
              testNotes:
                'The exercise verifies the Git identity object has a name and a valid email.',
            },
          },
        ],
      },
      {
        id: 'git-l2',
        title: 'Git fundamentals',
        description: 'Repositories, snapshots, the working tree, staging area, and how Git stores history.',
        duration: 7,
        objectives: [
          'Explain the working tree, staging area and repository',
          'Understand snapshots versus deltas',
          'Use git status and git log to inspect the repository',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l2',
          title: 'Git fundamentals quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l2-q1',
              type: 'true-false',
              prompt: 'A Git commit stores a list of changes (deltas) between versions.',
              answer: false,
              explanation: 'A Git commit is a snapshot of the entire project at a point in time, not a delta.',
            },
            {
              id: 'quiz-git-l2-q2',
              type: 'multiple-choice',
              prompt: 'What is the staging area in Git?',
              options: [
                'A remote server',
                'An index where you prepare changes before committing',
                'The folder where Git stores files',
                'A backup location',
              ],
              answer: 1,
              explanation: 'The staging area (index) is where you prepare changes for the next commit.',
            },
            {
              id: 'quiz-git-l2-q3',
              type: 'blank',
              prompt: 'What command creates a new Git repository?',
              answers: [
                'git init',
              ],
              explanation: 'git init creates a new Git repository in the current directory.',
            },
            {
              id: 'quiz-git-l2-q4',
              type: 'multiple-choice',
              prompt: 'What does git status show?',
              options: [
                'The commit history',
                'The current branch and which files are modified, staged, or untracked',
                'The remote URL',
                'The latest release tag',
              ],
              answer: 1,
              explanation: 'git status shows the state of the working tree: modified, staged, and untracked files.',
            },
            {
              id: 'quiz-git-l2-q5',
              type: 'multiple-choice',
              prompt: 'Which command shows one line per commit, an ASCII graph of the branches, and commits from every branch?',
              options: [
                'git log --oneline --graph --all',
                'git status --short',
                'git log --oneline',
                'git log -n 5',
              ],
              answer: 0,
              explanation: '--oneline shortens each entry, --graph draws the branch structure, and --all includes branches other than the current one. Plain `git log --oneline` shows only the current branch.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l2-d1',
            title: 'From empty folder to first commit',
            body: 'This is a simulation. `git init` creates the repository, `git add` moves a change into the staging area, `git commit` stores the snapshot, and `git log --oneline` reads the history back.',
            html: `<div class="term">
  <button data-cmd="git init">git init</button>
  <button data-cmd="git status">git status</button>
  <button data-cmd="git add README.md">git add README.md</button>
  <button data-cmd="git commit -m 'Initial commit'">git commit</button>
  <button data-cmd="git log --oneline">git log --oneline</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git init': 'Initialized empty Git repository in /home/ada/project/.git/',
  'git status': 'On branch main\\nUntracked files:\\n  README.md\\n\\nnothing added to commit but untracked files present',
  'git add README.md': '(no output - README.md is now in the staging area)',
  "git commit -m 'Initial commit'": '[main a1b2c3d] Initial commit\\n 1 file changed, 1 insertion(+)',
  'git log --oneline': 'a1b2c3d (HEAD -> main) Initial commit',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 210,
          },
          {
            type: 'text',
            id: 'g-l2-b1',
            body: 'A Git repository is a database of snapshots. Each commit is a snapshot of the entire project at a point in time, not a list of changes. The working tree is the files you see in your editor. The staging area (or index) is a place to prepare the next commit. You add changes from the working tree to the staging area, then commit them to the repository. This two-step process lets you craft precise commits.',
          },
          {
            type: 'heading',
            id: 'g-l2-h1',
            level: 3,
            body: 'The three states',
          },
          {
            type: 'list',
            id: 'g-l2-l1',
            style: 'bullet',
            items: [
              '**Modified** — the file has changed but is not staged.',
              '**Staged** — the change is in the index, ready for the next commit.',
              '**Committed** — the snapshot is safely stored in the repository.',
            ],
          },
          {
            type: 'code',
            id: 'g-l2-c1',
            language: 'plaintext',
            title: 'Inspecting the repository',
            code: `git status
git log --oneline
git log --oneline --graph --all`,
          },
          {
            type: 'heading',
            id: 'g-l2-h2',
            level: 3,
            body: 'git log options',
          },
          {
            type: 'list',
            id: 'g-l2-l2',
            style: 'bullet',
            items: [
              '**--oneline** — one line per commit.',
              '**--graph** — ASCII graph of branches.',
              '**--all** — show all branches, not just the current one.',
              '**-n 5** — show the last 5 commits.',
            ],
          },
          {
            type: 'tip',
            id: 'g-l2-t1',
            title: 'Commit often',
            body: 'Small, frequent commits are easier to review, revert, and cherry-pick than one giant commit per week.',
          },
          {
            type: 'exercise',
            id: 'g-l2-x1',
            exercise: {
              id: 'ex-git-l2',
              instructions: 'Write a JavaScript array of commands that creates a repository, adds a file, and makes the first commit.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git init" },\n];\n' },
              expectedOutput: 'Repository created with one commit',
              tests: [
                {
                  id: 'ex-git-l2-t1',
                  label: 'Includes git init',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git init'));`,
                },
                {
                  id: 'ex-git-l2-t2',
                  label: 'Includes git add and git commit',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git add')) && commands.some(c => String(c.cmd || c).includes('git commit'));`,
                },
              ],
              hints: [
                'Create a commands array where each item has a cmd property with a git command.',
                'Include git init, git add, and git commit -m.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git init" },\n  { cmd: "echo \\"hello\\" > README.md" },\n  { cmd: "git add README.md" },\n  { cmd: "git commit -m \\"Initial commit\\"" },\n];\n',
              },
              testNotes:
                'The exercise verifies the command array includes init, add, and commit.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'git-s2',
    title: 'Daily Git Workflow',
    description: 'Clone, add, commit, push, pull: the cycle that keeps local and remote in sync.',
    lessons: [
      {
        id: 'git-l3',
        title: 'Clone and remote',
        description: 'Cloning a repository, understanding origin, and the relationship between local and remote.',
        duration: 7,
        objectives: [
          'Clone a repository from GitHub',
          'Explain what origin means',
          'List and inspect remotes',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l3',
          title: 'Clone and remote quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l3-q1',
              type: 'multiple-choice',
              prompt: 'What does git clone do?',
              options: [
                'Creates a new empty repository',
                'Downloads an existing repository with full history',
                'Pushes local commits to a remote',
                'Creates a branch',
              ],
              answer: 1,
              explanation: 'git clone downloads the entire repository including its full history.',
            },
            {
              id: 'quiz-git-l3-q2',
              type: 'multiple-choice',
              prompt: 'What is `origin` in a cloned repository?',
              options: [
                'The GitHub account that owns the repository',
                'The default name Git gives to the remote it cloned from',
                'The first branch created in the repository',
                'A backup copy of the repository inside the .git folder',
              ],
              answer: 1,
              explanation: 'The name is a convention, not a special server: `origin` is simply the alias Git records for the URL you cloned, and it is what `git push` and `git pull` use by default.',
            },
            {
              id: 'quiz-git-l3-q3',
              type: 'blank',
              prompt: 'Which command lists each remote with its fetch and push URLs?',
              answers: [
                'git remote -v',
              ],
              explanation: 'The -v flag asks for the URLs as well as the names, which is how you confirm that origin points where you expect before pushing.',
            },
            {
              id: 'quiz-git-l3-q4',
              type: 'true-false',
              prompt: 'git clone downloads only the latest commit; older history is fetched later when you need it.',
              answer: false,
              explanation: 'A clone copies the entire repository, so every commit is present locally and you can inspect, branch from, or check out old history without the network.',
            },
            {
              id: 'quiz-git-l3-q5',
              type: 'multiple-choice',
              prompt: 'Why does the lesson recommend an SSH clone URL for repositories you push to often?',
              options: [
                'SSH makes clones download less history',
                'SSH keys avoid typing a password on every push',
                'SSH is required by GitHub before you can open a pull request',
                'SSH encrypts the repository at rest on your disk',
              ],
              answer: 1,
              explanation: 'An SSH key authenticates you to the remote, so repeated pushes do not prompt for credentials. It changes how you authenticate, not how much history is transferred.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l3-d1',
            title: 'Clone and inspect the remote',
            body: 'This is a simulation. Cloning downloads the whole history and records the remote under the name `origin`; `git remote -v` prints exactly where that points.',
            html: `<div class="term">
  <button data-cmd="git clone https://github.com/user/repo.git">git clone</button>
  <button data-cmd="git remote -v">git remote -v</button>
  <button data-cmd="git remote show origin">git remote show origin</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git clone https://github.com/user/repo.git': 'Cloning into repo...\\nremote: Enumerating objects: 42, done.\\nReceiving objects: 100% (42/42), done.',
  'git remote -v': 'origin  https://github.com/user/repo.git (fetch)\\norigin  https://github.com/user/repo.git (push)',
  'git remote show origin': '* remote origin\\n  Fetch URL: https://github.com/user/repo.git\\n  Push  URL: https://github.com/user/repo.git\\n  HEAD branch: main',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 210,
          },
          {
            type: 'text',
            id: 'g-l3-b1',
            body: 'git clone downloads an existing repository to your machine. It copies the entire history, so you have every commit locally. The remote is named origin by convention. You can have multiple remotes, but most projects have one: origin. Use git remote -v to list remotes and git remote show origin to see details.',
          },
          {
            type: 'heading',
            id: 'g-l3-h1',
            level: 3,
            body: 'Clone and remotes',
          },
          {
            type: 'code',
            id: 'g-l3-c1',
            language: 'plaintext',
            title: 'Clone and inspect remotes',
            code: `git clone https://github.com/user/repo.git
cd repo
git remote -v`,
          },
          {
            type: 'list',
            id: 'g-l3-l1',
            style: 'bullet',
            items: [
              '**origin** — the default name for the cloned remote.',
              '**fetch** — download objects and refs from another repository.',
              '**pull** — fetch and merge in one step.',
            ],
          },
          {
            type: 'tip',
            id: 'g-l3-t1',
            title: 'Use SSH for frequent repos',
            body: 'SSH keys avoid typing your password on every push. Set one up on GitHub and use the SSH clone URL.',
          },
          {
            type: 'exercise',
            id: 'g-l3-x1',
            exercise: {
              id: 'ex-git-l3',
              instructions: 'Write a JavaScript array of commands that clones a repository and verifies the remote is named origin.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git clone <url>" },\n];\n' },
              expectedOutput: 'Repository cloned with origin remote',
              tests: [
                {
                  id: 'ex-git-l3-t1',
                  label: 'Includes git clone',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git clone'));`,
                },
                {
                  id: 'ex-git-l3-t2',
                  label: 'Includes git remote -v',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git remote -v'));`,
                },
              ],
              hints: [
                'Include git clone with a repository URL.',
                'Include git remote -v to list remotes and verify origin.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git clone https://github.com/user/repo.git" },\n  { cmd: "cd repo" },\n  { cmd: "git remote -v" },\n];\n',
              },
              testNotes:
                'The exercise verifies the clone and remote inspection commands.',
            },
          },
        ],
      },
      {
        id: 'git-l4',
        title: 'Add, commit and push',
        description: 'The core loop: stage changes, write a good commit message, and push to the remote.',
        duration: 8,
        objectives: [
          'Stage changes with git add',
          'Write conventional commit messages',
          'Push commits to the remote',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-git-l4',
          title: 'Add, commit and push quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l4-q1',
              type: 'true-false',
              prompt: 'The staging area lets you prepare changes before committing.',
              answer: true,
              explanation: 'The staging area (index) lets you select which changes to include in the next commit.',
            },
            {
              id: 'quiz-git-l4-q2',
              type: 'multiple-choice',
              prompt: 'What is the conventional commits type for a bug fix?',
              options: [
                'feat',
                'fix',
                'docs',
                'refactor',
              ],
              answer: 1,
              explanation: 'fix is used for bug fixes in the conventional commits specification.',
            },
            {
              id: 'quiz-git-l4-q3',
              type: 'blank',
              prompt: 'What command pushes local commits to the remote?',
              answers: [
                'git push',
              ],
              explanation: 'git push uploads local commits to the remote repository.',
            },
            {
              id: 'quiz-git-l4-q4',
              type: 'multiple-choice',
              prompt: 'What does git add -p do?',
              options: [
                'Stages all files',
                'Stages changes interactively by hunk',
                'Pushes to the remote',
                'Creates a patch file',
              ],
              answer: 1,
              explanation: 'git add -p stages changes interactively, letting you select hunks.',
            },
            {
              id: 'quiz-git-l4-q5',
              type: 'multiple-choice',
              prompt: 'Which commit message best follows the lesson advice on messages?',
              options: [
                'update',
                'changes to app.js',
                'feat: reject duplicate checkout submissions',
                'Added a check that stops the checkout form being submitted twice',
              ],
              answer: 2,
              explanation: 'The conventional prefix names the kind of change, and the subject says what the change achieves in the imperative. The last option describes the same work but is long, past tense, and not machine-readable.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l4-d1',
            title: 'The daily loop, one command at a time',
            body: 'This is a simulation. `git add` stages a file, `git commit -m` records the snapshot with a conventional message, and `git push origin main` sends it to the remote.',
            html: `<div class="term">
  <button data-cmd="git add app.js">git add app.js</button>
  <button data-cmd="git commit -m 'feat: add user login validation'">git commit</button>
  <button data-cmd="git push origin main">git push origin main</button>
  <button data-cmd="git status">git status</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git add app.js': '(no output - app.js is staged and ready for the next commit)',
  "git commit -m 'feat: add user login validation'": '[main 3f2a1b9] feat: add user login validation\\n 1 file changed, 12 insertions(+)',
  'git push origin main': 'Enumerating objects: 5, done.\\nTo https://github.com/user/repo.git\\n   8c1d2e3..3f2a1b9  main -> main',
  'git status': 'On branch main\\nYour branch is up to date with origin/main.\\n\\nnothing to commit, working tree clean',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 210,
          },
          {
            type: 'text',
            id: 'g-l4-b1',
            body: 'The daily Git loop has four steps: modify files, stage them with git add, commit them with git commit, and push to the remote with git push. The commit message is the most important part. A good message explains what changed and why, not what the code does (the code shows that). The conventional commits format adds a type and optional scope for machine-readable history.',
          },
          {
            type: 'heading',
            id: 'g-l4-h1',
            level: 3,
            body: 'Conventional commits',
          },
          {
            type: 'list',
            id: 'g-l4-l1',
            style: 'bullet',
            items: [
              '**feat** — a new feature.',
              '**fix** — a bug fix.',
              '**docs** — documentation changes.',
              '**refactor** — code change that neither fixes a bug nor adds a feature.',
              '**test** — adding or updating tests.',
              '**chore** — maintenance tasks.',
            ],
          },
          {
            type: 'code',
            id: 'g-l4-c1',
            language: 'plaintext',
            title: 'The core loop',
            code: `# modify files
echo "new feature" > app.js

# stage
git add app.js

# commit with conventional message
git commit -m "feat: add user login validation"

# push to remote
git push origin main`,
          },
          {
            type: 'heading',
            id: 'g-l4-h2',
            level: 3,
            body: 'git add patterns',
          },
          {
            type: 'list',
            id: 'g-l4-l2',
            style: 'bullet',
            items: [
              '**git add file.js** — stage one file.',
              '**git add .** — stage all changes in the current directory.',
              '**git add -A** — stage all changes in the entire repository.',
              '**git add -p** — stage changes interactively, hunk by hunk.',
            ],
          },
          {
            type: 'tip',
            id: 'g-l4-t1',
            title: 'Stage hunks, not everything',
            body: 'git add -p lets you stage only the changes related to the current feature. This keeps commits focused and reviewable.',
          },
          {
            type: 'exercise',
            id: 'g-l4-x1',
            exercise: {
              id: 'ex-git-l4',
              instructions: 'Write a JavaScript array of commands that creates a file, stages it, commits with a conventional message, and pushes to origin.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "echo \\"feature\\" > feature.js" },\n];\n' },
              expectedOutput: 'File committed and pushed',
              tests: [
                {
                  id: 'ex-git-l4-t1',
                  label: 'Uses conventional commit format',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).match(/feat|fix|docs|refactor|test|chore:/)) && commands.some(c => String(c.cmd || c).includes('git push'));`,
                },
              ],
              hints: [
                'Include git add, git commit -m "type: message", and git push origin main.',
                'Use a conventional commit type like feat:, fix:, or docs:.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "echo \\"feature\\" > feature.js" },\n  { cmd: "git add feature.js" },\n  { cmd: "git commit -m \\"feat: add feature.js\\"" },\n  { cmd: "git push origin main" },\n];\n',
              },
              testNotes:
                'The exercise verifies the conventional commit pattern.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'git-s3',
    title: 'Branching',
    description: 'Creating branches, switching context, and why branches are Git\'s killer feature.',
    lessons: [
      {
        id: 'git-l5',
        title: 'Create and switch',
        description: 'git branch, git switch, the branch pointer, and how branching makes parallel work safe.',
        duration: 7,
        objectives: [
          'Create a new branch',
          'Switch between branches',
          'Understand that branches are just pointers',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l5',
          title: 'Create and switch quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l5-q1',
              type: 'multiple-choice',
              prompt: 'What is a Git branch?',
              options: [
                'A copy of all files',
                'A lightweight pointer to a commit',
                'A remote repository',
                'A merge strategy',
              ],
              answer: 1,
              explanation: 'A branch is a lightweight movable pointer to a commit. Creating one is instant.',
            },
            {
              id: 'quiz-git-l5-q2',
              type: 'blank',
              prompt: 'What command creates and switches to a new branch in one step?',
              answers: [
                'git switch -c',
              ],
              explanation: 'git switch -c branch-name creates and switches to the new branch.',
            },
            {
              id: 'quiz-git-l5-q3',
              type: 'multiple-choice',
              prompt: 'When should you delete a merged branch?',
              options: [
                'Immediately after cloning',
                'After the work is merged to main',
                'Never',
                'Before creating a pull request',
              ],
              answer: 1,
              explanation: 'Delete branches after they are merged to keep the branch list clean.',
            },
            {
              id: 'quiz-git-l5-q4',
              type: 'multiple-choice',
              prompt: 'Which branch name follows the naming advice in the lesson?',
              options: [
                'mybranch',
                'Feature_UserAuth',
                'feature/user-auth',
                'fix mobile nav',
              ],
              answer: 2,
              explanation: 'The slash creates a namespace tools can group by, and the name is lowercase and hyphenated. Spaces and mixed case make branch names harder to type and to filter.',
            },
            {
              id: 'quiz-git-l5-q5',
              type: 'multiple-choice',
              prompt: 'What does `git branch feature-login` do on its own?',
              options: [
                'Creates the branch but leaves you on the current branch',
                'Creates the branch and switches to it',
                'Renames the current branch to feature-login',
                'Deletes feature-login and its commits',
              ],
              answer: 0,
              explanation: '`git branch` only creates or lists pointers; it does not move HEAD. Use `git switch -c feature-login` when you want creation and checkout together.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l5-d1',
            title: 'Branches are just pointers',
            body: 'This is a simulation. A branch is a pointer to a commit, so creating one is instant and switching it moves the pointer and updates the working tree.',
            html: `<div class="term">
  <button data-cmd="git branch">git branch</button>
  <button data-cmd="git switch -c feature/login">git switch -c</button>
  <button data-cmd="git switch main">git switch main</button>
  <button data-cmd="git status">git status</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git branch': '* main',
  'git switch -c feature/login': 'Switched to a new branch feature/login',
  'git switch main': 'Switched to branch main',
  'git status': 'On branch feature/login\\nnothing to commit, working tree clean',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l5-b1',
            body: 'A branch in Git is a lightweight movable pointer to a commit. Creating a branch is instant: Git creates a new pointer, it does not copy files. Switching branches updates the working tree to match the commit the branch points to. This is why branching is so cheap in Git compared to other version control systems. You can create a branch for every feature, every bug fix, and every experiment.',
          },
          {
            type: 'heading',
            id: 'g-l5-h1',
            level: 3,
            body: 'Branch commands',
          },
          {
            type: 'code',
            id: 'g-l5-c1',
            language: 'plaintext',
            title: 'Create and switch',
            code: `# create a new branch
git branch feature-login

# switch to it
git switch feature-login

# create and switch in one step
git switch -c feature-login`,
          },
          {
            type: 'list',
            id: 'g-l5-l1',
            style: 'bullet',
            items: [
              '**git branch** — list, create, or delete branches.',
              '**git switch** — switch to an existing branch.',
              '**git switch -c** — create and switch to a new branch.',
              '**git checkout** — older command that also switches branches. switch is clearer.',
            ],
          },
          {
            type: 'heading',
            id: 'g-l5-h2',
            level: 3,
            body: 'Branch naming',
          },
          {
            type: 'text',
            id: 'g-l5-b2',
            body: 'Good branch names describe the work: feature/user-auth, fix/mobile-nav, chore/update-deps. Slashes create pseudo-namespaces that tools like GitHub and GitLab use to group related branches. Keep names lowercase and hyphenated.',
          },
          {
            type: 'tip',
            id: 'g-l5-t1',
            title: 'Delete branches after merging',
            body: 'Merged branches clutter the list. Delete them with git branch -d branch-name once the work is integrated.',
          },
          {
            type: 'exercise',
            id: 'g-l5-x1',
            exercise: {
              id: 'ex-git-l5',
              instructions: 'Write a JavaScript array of commands that creates a new branch called feature/hello and switches to it.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git switch -c feature/hello" },\n];\n' },
              expectedOutput: 'New branch created and checked out',
              tests: [
                {
                  id: 'ex-git-l5-t1',
                  label: 'Creates and switches to feature/hello',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('feature/hello') && String(c.cmd || c).includes('git switch -c'));`,
                },
              ],
              hints: [
                'Use git switch -c feature/hello to create and switch in one step.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git switch -c feature/hello" },\n];\n',
              },
              testNotes:
                'The exercise verifies branch creation and switch.',
            },
          },
        ],
      },
      {
        id: 'git-l6',
        title: 'Branching workflow',
        description: 'Feature branches, trunk-based development, and the Git Flow versus GitHub Flow debate.',
        duration: 7,
        objectives: [
          'Compare Git Flow and GitHub Flow',
          'Choose a branching strategy for a project',
          'Use feature branches for isolated work',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l6',
          title: 'Branching workflow quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l6-q1',
              type: 'true-false',
              prompt: 'Git Flow is simpler than GitHub Flow.',
              answer: false,
              explanation: 'Git Flow has more branches and rules. GitHub Flow is simpler, using only main and feature branches.',
            },
            {
              id: 'quiz-git-l6-q2',
              type: 'multiple-choice',
              prompt: 'What is the default branch name in modern Git?',
              options: [
                'master',
                'main',
                'trunk',
                'develop',
              ],
              answer: 1,
              explanation: 'GitHub and Git now default to main as the primary branch name.',
            },
            {
              id: 'quiz-git-l6-q3',
              type: 'multiple-choice',
              prompt: 'What does `git push -u origin feature/button-colour` set up for you?',
              options: [
                'A protected branch on the remote',
                'A pull request against main',
                'A local tracking branch for master',
                'The upstream branch, so later pushes on this branch can be just `git push`',
              ],
              answer: 3,
              explanation: 'The -u flag links the local branch to its remote counterpart. After that Git knows where to send the branch, so the remote and branch name can be omitted.',
            },
            {
              id: 'quiz-git-l6-q4',
              type: 'multiple-choice',
              prompt: 'In Git Flow, which branch is a production hotfix created from?',
              options: [
                'develop',
                'main',
                'master',
                'release',
              ],
              answer: 2,
              explanation: 'Git Flow branches hotfixes from master, the branch that represents production, and merges them back into master and develop. A develop-based fix is a feature, not a production repair.',
            },
            {
              id: 'quiz-git-l6-q5',
              type: 'true-false',
              prompt: 'GitHub Flow keeps a long-lived develop branch for integrating features.',
              answer: false,
              explanation: 'GitHub Flow uses only main plus short-lived feature branches, and features merge into main through pull requests. The develop branch belongs to the heavier Git Flow model.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l6-d1',
            title: 'One feature branch, start to finish',
            body: 'This is a simulation. The branch is created from an up-to-date `main`, pushed with `-u` so later pushes are just `git push`, and the pull request is the GitHub layer that stands between the branch and `main`.',
            html: `<div class="term">
  <button data-cmd="git switch main">git switch main</button>
  <button data-cmd="git pull">git pull</button>
  <button data-cmd="git switch -c feature/button-colour">git switch -c</button>
  <button data-cmd="git push -u origin feature/button-colour">git push -u</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git switch main': 'Switched to branch main\\nYour branch is up to date with origin/main.',
  'git pull': 'Already up to date.',
  'git switch -c feature/button-colour': 'Switched to a new branch feature/button-colour',
  'git push -u origin feature/button-colour': 'To https://github.com/user/repo.git\\n * [new branch]      feature/button-colour -> feature/button-colour\\nbranch feature/button-colour set up to track origin/feature/button-colour.',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l6-b1',
            body: 'A branching strategy is a set of rules that says which branches exist, what they are for, and how they relate to each other. Git Flow has long-lived develop and master branches plus release and hotfix branches. It is thorough but complex. GitHub Flow has only main and short-lived feature branches. It is simple and works for continuously deployed projects. Most teams today use a lightweight variant of GitHub Flow.',
          },
          {
            type: 'heading',
            id: 'g-l6-h1',
            level: 3,
            body: 'GitHub Flow',
          },
          {
            type: 'list',
            id: 'g-l6-l1',
            style: 'bullet',
            items: [
              '**main** — always deployable.',
              '**feature branches** — created from main, merged back via pull request.',
              '**No develop branch** — features go directly to main.',
              '**Deploy from main** — every merge to main triggers a deploy.',
            ],
          },
          {
            type: 'heading',
            id: 'g-l6-h2',
            level: 3,
            body: 'Git Flow',
          },
          {
            type: 'list',
            id: 'g-l6-l2',
            style: 'bullet',
            items: [
              '**master** — production releases only.',
              '**develop** — integration branch for features.',
              '**feature** — branched from develop, merged back.',
              '**release** — branched from develop, merged to master and develop.',
              '**hotfix** — branched from master for production fixes.',
            ],
          },
          {
            type: 'code',
            id: 'g-l6-c1',
            language: 'plaintext',
            title: 'One feature branch, start to finish',
            code: `# Start from an up-to-date main
git switch main
git pull

# Create the feature branch and work on it
git switch -c feature/button-colour

git add .
git commit -m "Add a colour variable for the button"

# Push the branch and open a pull request
git push -u origin feature/button-colour`,
          },
          {
            type: 'text',
            id: 'g-l6-b2',
            body: 'Three of those commands carry more than they look like. `git switch -c` creates the branch and moves onto it in one step — the older `git checkout -b` does the same and is still common in scripts. `git push -u` sets the upstream, so every later push on that branch is just `git push`. And the pull request is not a Git concept at all: the branch is already on the remote, and the PR is the GitHub layer that runs the checks and collects the approval that stands between the branch and `main`.',
          },
          {
            type: 'tip',
            id: 'g-l6-t1',
            title: 'Start with GitHub Flow',
            body: 'Unless you need scheduled releases, start with main and feature branches. Add complexity only when the team outgrows it.',
          },
          {
            type: 'exercise',
            id: 'g-l6-x1',
            exercise: {
              id: 'ex-git-l6',
              instructions: 'Write JavaScript that creates a feature branch from main and defines a pull request description.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git workflow as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git switch -c feature/button-color" },\n];\n\nconst prDescription = "";\n' },
              expectedOutput: 'Feature branch with PR description',
              tests: [
                {
                  id: 'ex-git-l6-t1',
                  label: 'Creates a feature branch',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git switch -c') && String(c.cmd || c).includes('feature/'));`,
                },
                {
                  id: 'ex-git-l6-t2',
                  label: 'PR description has sections',
                  body: `return typeof prDescription === 'string' && prDescription.includes('## Summary') && prDescription.includes('## Changes');`,
                },
              ],
              hints: [
                'Use git switch -c feature/branch-name from main.',
                'Write a PR description with Summary and Changes sections.',
              ],
              solution: {
                javascript: '// Write your git workflow as JavaScript\n\nconst commands = [\n  { cmd: "git switch main" },\n  { cmd: "git switch -c feature/button-color" },\n  { cmd: "echo \\"<button>Click</button>\\" > button.html" },\n  { cmd: "git add button.html" },\n  { cmd: "git commit -m \\"feat: add button component\\"" },\n];\n\nconst prDescription = "# Pull Request\\n\\n## Summary\\nAdds a new button component with accessible markup.\\n\\n## Changes\\n- Created button.html\\n- Added commit with conventional message";\n',
              },
              testNotes:
                'The exercise verifies the branching workflow.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'git-s4',
    title: 'Merging and Rebasing',
    description: 'Combining branches with merge and rebase, resolving conflicts, and when to choose each strategy.',
    lessons: [
      {
        id: 'git-l7',
        title: 'Merge and conflict resolution',
        description: 'git merge, merge commits, conflict markers, and the steps to resolve a conflict.',
        duration: 8,
        objectives: [
          'Merge a feature branch into main',
          'Understand merge commits',
          'Resolve a merge conflict',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-git-l7',
          title: 'Merge and conflict resolution quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l7-q1',
              type: 'multiple-choice',
              prompt: 'What does git merge create?',
              options: [
                'A linear history',
                'A merge commit with two parents',
                'A new branch',
                'A remote',
              ],
              answer: 1,
              explanation: 'A merge commit has two parents, preserving the history of both branches.',
            },
            {
              id: 'quiz-git-l7-q2',
              type: 'multiple-choice',
              prompt: 'What do conflict markers look like?',
              options: [
                '=== and ===',
                '<<<<<<< and >>>>>>>',
                '/* start */ and /* end */',
                '<!-- conflict -->',
              ],
              answer: 1,
              explanation: 'Git uses <<<<<<< HEAD, =======, and >>>>>>> branch as conflict markers.',
            },
            {
              id: 'quiz-git-l7-q3',
              type: 'multiple-choice',
              prompt: 'After you edit a conflicted file to remove the markers, what completes the merge?',
              options: [
                'git branch --merged',
                'git add the resolved file, then git commit',
                'git restore the file, then git pull',
                'git merge --abort',
              ],
              answer: 1,
              explanation: 'Staging the file tells Git the conflict is resolved, and the commit then records the merge result. Aborting would throw the merge away instead of finishing it.',
            },
            {
              id: 'quiz-git-l7-q4',
              type: 'multiple-choice',
              prompt: 'In a conflict block, which lines show the version from the branch you are merging into (HEAD)?',
              options: [
                'The lines between <<<<<<< HEAD and =======',
                'The lines between ======= and >>>>>>>',
                'The lines after >>>>>>>',
                'All the lines outside the markers',
              ],
              answer: 0,
              explanation: 'HEAD is the branch you are currently on, so its version sits first, above the separator. The incoming branch version appears below the ======= line.',
            },
            {
              id: 'quiz-git-l7-q5',
              type: 'true-false',
              prompt: 'Pulling the latest main before merging a feature branch reduces the chance of conflicts.',
              answer: true,
              explanation: 'A merge compares your branch against current main, so incorporating main early means there is less divergence to reconcile. Waiting until the end concentrates all the drift into one merge.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l7-d1',
            title: 'A merge that hits a conflict',
            body: 'This is a simulation. When the same line changed in both branches Git stops, writes conflict markers into the file, and waits for you to edit, stage and commit.',
            html: `<div class="term">
  <button data-cmd="git merge feature-login">git merge feature-login</button>
  <button data-cmd="git add app.js">git add app.js</button>
  <button data-cmd="git commit -m 'merge: resolve conflict in app.js'">git commit</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git merge feature-login': 'Auto-merging app.js\\nCONFLICT (content): Merge conflict in app.js\\nAutomatic merge failed; fix conflicts and then commit the result.',
  'git add app.js': '(no output - the resolved file is staged and the markers are gone)',
  "git commit -m 'merge: resolve conflict in app.js'": '[main 9e4f1a2] merge: resolve conflict in app.js',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l7-b1',
            body: 'Merging combines two branches. Git creates a merge commit that has two parents, preserving both histories. When the same file is changed in both branches, Git cannot decide which version to keep and marks a conflict. You edit the file to remove the conflict markers, stage the resolved file, and complete the merge with git commit.',
          },
          {
            type: 'heading',
            id: 'g-l7-h1',
            level: 3,
            body: 'Conflict markers',
          },
          {
            type: 'code',
            id: 'g-l7-c1',
            language: 'plaintext',
            title: 'Conflict example',
            code: `<<<<<<< HEAD
const color = "blue";
=======
const color = "red";
>>>>>>> feature/color`,

          },
          {
            type: 'list',
            id: 'g-l7-l1',
            style: 'bullet',
            items: [
              '**<<<<<<< HEAD** — the current branch version.',
              '**=======** — separates the two versions.',
              '**>>>>>>> branch** — the incoming branch version.',
              '**Resolved file** — keep one version, both, or a new version. Remove all markers.',
            ],
          },
          {
            type: 'code',
            id: 'g-l7-c2',
            language: 'plaintext',
            title: 'Merging',
            code: `git switch main
git merge feature-login
# if conflict:
# edit the file, remove markers
git add app.js
git commit -m "merge: resolve conflict in app.js"`,
          },
          {
            type: 'tip',
            id: 'g-l7-t1',
            title: 'Pull before merging',
            body: 'Always pull the latest main before merging a feature branch. This reduces the chance of conflicts.',
          },
          {
            type: 'exercise',
            id: 'g-l7-x1',
            exercise: {
              id: 'ex-git-l7',
              instructions: 'Write a JavaScript array of commands that creates a conflict by editing the same line on two branches, then resolves it.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git switch -c branch-a" },\n];\n' },
              expectedOutput: 'Conflict resolved',
              tests: [
                {
                  id: 'ex-git-l7-t1',
                  label: 'Creates and merges branches with conflict',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git switch -c')) && commands.some(c => String(c.cmd || c).includes('git merge'));`,
                },
              ],
              hints: [
                'Change the same line on two branches and merge.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git switch -c branch-a" },\n  { cmd: "echo \\"blue\\" > color.txt" },\n  { cmd: "git add color.txt" },\n  { cmd: "git commit -m \\"set blue\\"" },\n  { cmd: "git switch main" },\n  { cmd: "git switch -c branch-b" },\n  { cmd: "echo \\"red\\" > color.txt" },\n  { cmd: "git add color.txt" },\n  { cmd: "git commit -m \\"set red\\"" },\n  { cmd: "git switch main" },\n  { cmd: "git merge branch-a" },\n  { cmd: "git merge branch-b" },\n];\n',
              },
              testNotes:
                'The exercise demonstrates creating and resolving a merge conflict.',
            },
          },
        ],
      },
      {
        id: 'git-l8',
        title: 'Rebase',
        description: 'git rebase, rewriting history, interactive rebase, and why rebase produces a linear history.',
        duration: 7,
        objectives: [
          'Explain the difference between merge and rebase',
          'Perform a simple rebase',
          'Use interactive rebase to clean up commits',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l8',
          title: 'Rebase quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l8-q1',
              type: 'true-false',
              prompt: 'You should rebase branches that other people are using.',
              answer: false,
              explanation: 'Rebasing rewrites history and changes commit hashes. Never rebase a shared branch.',
            },
            {
              id: 'quiz-git-l8-q2',
              type: 'blank',
              prompt: 'What Git command replays commits on top of another branch?',
              answers: [
                'git rebase',
              ],
              explanation: 'git rebase replays commits from one branch onto another, producing a linear history.',
            },
            {
              id: 'quiz-git-l8-q3',
              type: 'multiple-choice',
              prompt: 'When is it safe to rebase?',
              options: [
                'On any public branch',
                'Only on private branches before they are shared',
                'After merging to main',
                'Never',
              ],
              answer: 1,
              explanation: 'Rebase only private branches before they are shared. Once shared, treat the history as public.',
            },
            {
              id: 'quiz-git-l8-q4',
              type: 'multiple-choice',
              prompt: 'In interactive rebase, which command combines a commit with the one before it?',
              options: [
                'pick',
                'reword',
                'squash',
                'drop',
              ],
              answer: 2,
              explanation: 'squash folds the commit into its predecessor and lets you merge the messages. reword only edits the message, and drop removes the commit entirely.',
            },
            {
              id: 'quiz-git-l8-q5',
              type: 'true-false',
              prompt: 'A rebase keeps the original commit hashes because it copies the commits unchanged.',
              answer: false,
              explanation: 'Rebase creates new commits with new parents, so each one gets a new hash even when the patch content is identical. That rewriting is exactly why shared branches must not be rebased.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l8-d1',
            title: 'Rebase replays, it does not merge',
            body: 'This is a simulation. Rebasing moves your commits on top of another branch and rewrites their hashes, so it is safe only on a branch nobody else has pulled.',
            html: `<div class="term">
  <button data-cmd="git switch feature-login">git switch feature-login</button>
  <button data-cmd="git rebase main">git rebase main</button>
  <button data-cmd="git rebase -i HEAD~3">git rebase -i HEAD~3</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git switch feature-login': 'Switched to branch feature-login',
  'git rebase main': 'Successfully rebased and updated refs/heads/feature-login.',
  'git rebase -i HEAD~3': 'pick 3f2a1b9 Add colour variable\\npick 7c8d9e0 Wire the toggle\\npick 1a2b3c4 Update the snapshot\\n\\n(opens your editor so you can reorder, squash or drop)',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 210,
          },
          {
            type: 'text',
            id: 'g-l8-b1',
            body: 'Rebase replays commits from one branch on top of another. Instead of creating a merge commit, it moves the branch pointer forward, producing a linear history. This is cleaner to read, but it rewrites commit hashes, so you must never rebase a branch that others are using. Rebase before merging to main, never after.',
          },
          {
            type: 'heading',
            id: 'g-l8-h1',
            level: 3,
            body: 'Merge versus rebase',
          },
          {
            type: 'list',
            id: 'g-l8-l1',
            style: 'bullet',
            items: [
              '**Merge** — preserves exact history, creates a merge commit. Safe for shared branches.',
              '**Rebase** — rewrites history, produces linear commits. Use only on private branches.',
              '**Interactive rebase** — lets you reorder, squash, edit, or drop commits.',
            ],
          },
          {
            type: 'code',
            id: 'g-l8-c1',
            language: 'plaintext',
            title: 'Rebase and interactive rebase',
            code: `# rebase feature onto main
git switch feature-login
git rebase main

# interactive rebase the last 3 commits
git rebase -i HEAD~3`,
          },
          {
            type: 'heading',
            id: 'g-l8-h2',
            level: 3,
            body: 'Interactive rebase commands',
          },
          {
            type: 'list',
            id: 'g-l8-l2',
            style: 'bullet',
            items: [
              '**pick** — use the commit as-is.',
              '**reword** — change the commit message.',
              '**squash** — combine with the previous commit.',
              '**drop** — remove the commit.',
            ],
          },
          {
            type: 'tip',
            id: 'g-l8-t1',
            title: 'Rebase before you push',
            body: 'Rebase feature branches before opening a pull request. Once the branch is shared, treat it as public history and do not rebase.',
          },
          {
            type: 'exercise',
            id: 'g-l8-x1',
            exercise: {
              id: 'ex-git-l8',
              instructions: 'Write a JavaScript array of commands that rebases a feature branch onto main.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git switch feature-login" },\n];\n' },
              expectedOutput: 'Branch rebased onto main',
              tests: [
                {
                  id: 'ex-git-l8-t1',
                  label: 'Rebase completed',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git rebase main'));`,
                },
              ],
              hints: [
                'Use git switch feature && git rebase main.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git switch feature" },\n  { cmd: "git rebase main" },\n];\n',
              },
              testNotes:
                'The exercise verifies the rebase workflow.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'git-s5',
    title: 'Collaborating with Remotes',
    description: 'Pull requests, code review, and the pull and fetch commands that keep teams in sync.',
    lessons: [
      {
        id: 'git-l9',
        title: 'Pull and fetch',
        description: 'git pull versus git fetch, when to use each, and avoiding unexpected merges.',
        duration: 7,
        objectives: [
          'Distinguish between fetch and pull',
          'Use git pull safely',
          'Inspect remote branches',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l9',
          title: 'Pull and fetch quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l9-q1',
              type: 'multiple-choice',
              prompt: 'What does git fetch do?',
              options: [
                'Downloads and merges remote changes',
                'Downloads remote changes without merging',
                'Pushes local changes',
                'Deletes a remote branch',
              ],
              answer: 1,
              explanation: 'git fetch downloads remote changes without modifying your working tree.',
            },
            {
              id: 'quiz-git-l9-q2',
              type: 'blank',
              prompt: 'What command downloads remote changes without merging?',
              answers: [
                'git fetch',
              ],
              explanation: 'git fetch downloads remote changes without touching your working tree.',
            },
            {
              id: 'quiz-git-l9-q3',
              type: 'multiple-choice',
              prompt: '`git pull` is shorthand for which pair of operations?',
              options: [
                'git fetch followed by a merge',
                'git commit followed by git push',
                'git fetch followed by git reset --hard',
                'git clone followed by git merge',
              ],
              answer: 0,
              explanation: 'Pull fetches the remote objects and then merges the upstream branch into your current one. That second step is why a pull can create a merge commit or hit a conflict unexpectedly.',
            },
            {
              id: 'quiz-git-l9-q4',
              type: 'multiple-choice',
              prompt: 'What does `git log main..origin/main` list?',
              options: [
                'Commits on main that are missing from origin/main',
                'Commits on origin/main that are not yet on your local main',
                'Every commit in both branches',
                'Only merge commits between the two branches',
              ],
              answer: 1,
              explanation: 'The two-dot range means "reachable from the right side but not the left", so it previews what a pull would bring in. Swap the sides to see what you would push instead.',
            },
            {
              id: 'quiz-git-l9-q5',
              type: 'blank',
              prompt: 'Which pull option rebases your local commits on top of the fetched branch instead of creating a merge commit?',
              answers: [
                'git pull --rebase',
              ],
              explanation: 'The --rebase flag replaces the merge half of pull with a rebase, keeping the local history linear when your commits are not yet shared.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l9-d1',
            title: 'Fetch first, merge on purpose',
            body: 'This is a simulation. `git fetch` downloads without touching your working tree, so you can inspect `origin/main` and then decide how to bring the changes in.',
            html: `<div class="term">
  <button data-cmd="git fetch origin">git fetch origin</button>
  <button data-cmd="git log origin/main --oneline">git log origin/main</button>
  <button data-cmd="git pull">git pull</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git fetch origin': 'From https://github.com/user/repo\\n   8c1d2e3..3f2a1b9  main       -> origin/main',
  'git log origin/main --oneline': '3f2a1b9 feat: add dark mode toggle\\n8c1d2e3 fix: handle empty state',
  'git pull': 'Updating 8c1d2e3..3f2a1b9\\nFast-forward\\n app.js | 4 ++++\\n 1 file changed, 4 insertions(+)',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l9-b1',
            body: 'git fetch downloads changes from the remote without changing your working tree. git pull downloads and merges in one step. Pull is convenient, but if you have local changes that conflict with the incoming branch, the merge can fail or produce a messy commit. Fetch first, inspect the changes with git log, then merge or rebase deliberately.',
          },
          {
            type: 'heading',
            id: 'g-l9-h1',
            level: 3,
            body: 'Fetch versus pull',
          },
          {
            type: 'code',
            id: 'g-l9-c1',
            language: 'plaintext',
            title: 'Fetch and inspect',
            code: `git fetch origin
git log origin/main --oneline
git log main..origin/main --oneline`,
          },
          {
            type: 'list',
            id: 'g-l9-l1',
            style: 'bullet',
            items: [
              '**git fetch** — downloads remote changes without touching your branches.',
              '**git pull** — fetch + merge.',
              '**git log main..origin/main** — shows commits on origin/main that are not on main.',
              '**git diff main..origin/main** — shows the actual changes.',
            ],
          },
          {
            type: 'tip',
            id: 'g-l9-t1',
            title: 'Pull with rebase',
            body: 'git pull --rebase keeps a linear history by rebasing your local commits on top of the fetched branch.',
          },
          {
            type: 'exercise',
            id: 'g-l9-x1',
            exercise: {
              id: 'ex-git-l9',
              instructions: 'Write a JavaScript array of commands that fetches remote changes and inspects the new commits.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git fetch origin" },\n];\n' },
              expectedOutput: 'Remote changes fetched and inspected',
              tests: [
                {
                  id: 'ex-git-l9-t1',
                  label: 'Fetch used',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git fetch origin')) && commands.some(c => String(c.cmd || c).includes('git log origin/main'));`,
                },
              ],
              hints: [
                'Use git fetch origin then git log origin/main --oneline.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git fetch origin" },\n  { cmd: "git log origin/main --oneline" },\n];\n',
              },
              testNotes:
                'The exercise verifies the fetch and log commands.',
            },
          },
        ],
      },
      {
        id: 'git-l10',
        title: 'Pull requests and review',
        description: 'The GitHub pull request workflow, code review etiquette, and approving changes safely.',
        duration: 8,
        objectives: [
          'Open a pull request on GitHub',
          'Review a pull request with comments',
          'Approve and merge a pull request',
        ],
        xp: 50,
        quiz: {
          id: 'quiz-git-l10',
          title: 'Pull requests and review quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l10-q1',
              type: 'true-false',
              prompt: 'A pull request is a proposal to merge changes.',
              answer: true,
              explanation: 'A pull request proposes merging changes from one branch into another.',
            },
            {
              id: 'quiz-git-l10-q2',
              type: 'multiple-choice',
              prompt: 'What is the benefit of squash and merge?',
              options: [
                'It preserves every commit individually',
                'It produces a clean linear history on main',
                'It is faster than a regular merge',
                'It avoids merge conflicts',
              ],
              answer: 1,
              explanation: 'Squash and merge combines all commits into one, producing a clean history on main.',
            },
            {
              id: 'quiz-git-l10-q3',
              type: 'multiple-choice',
              prompt: 'Why should pull requests be small?',
              options: [
                'To use less disk space',
                'They get reviewed faster and more thoroughly',
                'To avoid merge conflicts',
                'To reduce CI time',
              ],
              answer: 1,
              explanation: 'Small PRs are easier and faster to review, leading to higher quality reviews.',
            },
            {
              id: 'quiz-git-l10-q4',
              type: 'multiple-choice',
              prompt: 'Which GitHub merge strategy replays each commit from the branch onto main individually, keeping every commit message?',
              options: [
                'Create a merge commit',
                'Squash and merge',
                'Fast-forward only',
                'Rebase and merge',
              ],
              answer: 3,
              explanation: 'Rebase and merge puts each commit on main one at a time with its original message, producing a linear but detailed history. Squash and merge instead collapses them into a single commit.',
            },
            {
              id: 'quiz-git-l10-q5',
              type: 'multiple-choice',
              prompt: 'Which review comment follows the lesson advice on code review etiquette?',
              options: [
                'Use a Map here so each lookup is O(1) instead of scanning the array.',
                'This is slow.',
                'I would have written this differently.',
                'Nit: rename this variable to something I prefer.',
              ],
              answer: 0,
              explanation: 'A useful comment is specific and explains the improvement, so the author can act on it. Vague objections and personal style preferences block the review without teaching anything.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l10-d1',
            title: 'Opening and merging a pull request',
            body: 'This is a simulation. The branch is pushed, the pull request is opened against `main`, checks are watched, and the merge strategy collapses the branch into one commit.',
            html: `<div class="term">
  <button data-cmd="git push -u origin feature/dark-mode">git push -u</button>
  <button data-cmd="gh pr create --base main --title 'feat: add a dark mode toggle'">gh pr create</button>
  <button data-cmd="gh pr checks">gh pr checks</button>
  <button data-cmd="gh pr merge --squash">gh pr merge --squash</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git push -u origin feature/dark-mode': 'To https://github.com/user/repo.git\\n * [new branch]      feature/dark-mode -> feature/dark-mode',
  "gh pr create --base main --title 'feat: add a dark mode toggle'": 'https://github.com/user/repo/pull/42',
  'gh pr checks': 'All checks were successful\\n  build  pass  1m20s\\n  test   pass  0m48s',
  'gh pr merge --squash': 'Squashed and merged pull request #42',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 210,
          },
          {
            type: 'text',
            id: 'g-l10-b1',
            body: 'A pull request (PR) is a proposal to merge changes from one branch into another. On GitHub you open a PR from your feature branch into main. The PR shows the diff, the commit history, and any checks that ran. Reviewers leave comments, approve the changes, or request modifications. Once approved and passing checks, the PR can be merged. GitHub offers three merge strategies: merge commit, squash and merge, and rebase and merge.',
          },
          {
            type: 'heading',
            id: 'g-l10-h1',
            level: 3,
            body: 'Merge strategies',
          },
          {
            type: 'list',
            id: 'g-l10-l1',
            style: 'bullet',
            items: [
              '**Create a merge commit** — preserves the full branch history. Produces a merge commit.',
              '**Squash and merge** — combines all commits into one. Produces a clean linear history on main.',
              '**Rebase and merge** — replays each commit onto main individually. Preserves all commit messages.',
            ],
          },
          {
            type: 'heading',
            id: 'g-l10-h2',
            level: 3,
            body: 'Code review etiquette',
          },
          {
            type: 'list',
            id: 'g-l10-l2',
            style: 'bullet',
            items: [
              '**Be specific** — "This loop is O(n^2)" is better than "This is slow."',
              '**Explain why** — "Use a Map here for O(1) lookups" is actionable.',
              '**Distinguish must-fix from nice-to-have** — use labels or separate comments.',
              '**Approve when ready** — do not block on personal style preferences.',
            ],
          },
          {
            type: 'code',
            id: 'g-l10-c1',
            language: 'plaintext',
            title: 'Opening a pull request',
            code: `# The branch is pushed and up to date
git push -u origin feature/dark-mode

# Open the pull request into main, with a title and a body file
gh pr create --base main --title "feat: add a dark mode toggle" --body-file pr.md

# Watch the checks, then merge once approved
gh pr checks
gh pr merge --squash`,
          },
          {
            type: 'text',
            id: 'g-l10-b2',
            body: '`--base main` is the branch the proposal merges into, and `--body-file pr.md` pulls the description from a file — which matters because the description is the part of a pull request a reviewer reads first. It carries the same three headings as the exercise below: what changed and why, what a reader should look at, and how to check it. `gh pr checks` waits on CI, and `gh pr merge --squash` collapses the branch into a single commit, which is the strategy to choose when the branch history is a trail of "fix typo" rather than a story worth keeping.',
          },
          {
            type: 'tip',
            id: 'g-l10-t1',
            title: 'Keep PRs small',
            body: 'A PR under 200 lines gets reviewed faster and more thoroughly than a 1000-line monster. Split large changes into multiple PRs.',
          },
          {
            type: 'exercise',
            id: 'g-l10-x1',
            exercise: {
              id: 'ex-git-l10',
              instructions: 'Write a JavaScript string containing a pull request description for a dark mode toggle feature.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your pull request description as JavaScript\n\nconst prDescription = "";\n' },
              expectedOutput: 'PR description',
              tests: [
                {
                  id: 'ex-git-l10-t1',
                  label: 'Description includes summary',
                  body: `return typeof prDescription === 'string' && prDescription.includes('## Summary') && prDescription.includes('## Changes') && prDescription.includes('## Testing');`,
                },
              ],
              hints: [
                'Include a summary, what changed, testing steps, and screenshots if relevant.',
              ],
              solution: {
                javascript: '// Write your pull request description as JavaScript\n\nconst prDescription = "# feat: add dark mode toggle\\n\\n## Summary\\nAdds a theme toggle that switches between light and dark mode using CSS custom properties and a class on the html element.\\n\\n## Changes\\n- Added theme-toggle.js\\n- Added dark mode CSS variables\\n- Updated header component\\n\\n## Testing\\n1. Open the site\\n2. Click the theme toggle\\n3. Verify the theme persists on reload\\n\\n## Screenshots\\n<!-- Add before/after screenshots here -->";\n',
              },
              testNotes:
                'The exercise verifies PR description structure.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'git-s6',
    title: 'Undoing Changes',
    description: 'git restore, git revert, git reset, and how to recover from mistakes without losing work.',
    lessons: [
      {
        id: 'git-l11',
        title: 'Undo working tree changes',
        description: 'Discarding uncommitted changes, restoring deleted files, and the safety of git restore.',
        duration: 7,
        objectives: [
          'Discard uncommitted changes with git restore',
          'Restore deleted files',
          'Understand the difference between restore and reset',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l11',
          title: 'Undo working tree changes quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l11-q1',
              type: 'multiple-choice',
              prompt: 'What does git restore do?',
              options: [
                'Deletes commits',
                'Resets the working tree to the last commit',
                'Pushes changes to the remote',
                'Creates a new branch',
              ],
              answer: 1,
              explanation: 'git restore resets the working tree to match the last commit without deleting commits.',
            },
            {
              id: 'quiz-git-l11-q2',
              type: 'blank',
              prompt: 'What git reset mode keeps changes staged?',
              answers: [
                '--soft',
              ],
              explanation: 'git reset --soft moves the branch pointer and keeps changes staged.',
            },
            {
              id: 'quiz-git-l11-q3',
              type: 'multiple-choice',
              prompt: 'What does `git restore --staged app.js` leave behind?',
              options: [
                'app.js removed from the index, with the edit still on disk',
                'app.js deleted from disk and from the index',
                'app.js restored to the last commit, with the edit gone',
                'app.js staged and committed in one step',
              ],
              answer: 0,
              explanation: 'The --staged flag only rewinds the index entry, so the file becomes unstaged while the working copy keeps the change. Without the flag, restore would overwrite the file instead.',
            },
            {
              id: 'quiz-git-l11-q4',
              type: 'true-false',
              prompt: 'A change discarded by `git restore` can be recovered from the reflog.',
              answer: false,
              explanation: 'The reflog records commits and HEAD moves, and work that was never committed has no entry there. That is why the lesson suggests stashing or committing on a scratch branch before discarding.',
            },
            {
              id: 'quiz-git-l11-q5',
              type: 'multiple-choice',
              prompt: 'You deleted a tracked file but have not committed the deletion. Which command brings the file back from the last commit?',
              options: [
                'git clean -f app.js',
                'git rm --cached app.js',
                'git stash drop app.js',
                'git restore app.js',
              ],
              answer: 3,
              explanation: 'Restore copies the committed version back over the deleted working-tree path. `git rm --cached` would do the opposite, leaving the file on disk but removing it from tracking.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l11-d1',
            title: 'Restore brings the file back',
            body: 'This is a simulation. `git restore` copies the committed version back over the working copy; `--staged` instead lifts the file out of the index and leaves the change on disk.',
            html: `<div class="term">
  <button data-cmd="git restore app.js">git restore app.js</button>
  <button data-cmd="git restore .">git restore .</button>
  <button data-cmd="git restore --staged app.js">git restore --staged</button>
  <button data-cmd="git status">git status</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git restore app.js': '(no output - app.js is back to the last committed version)',
  'git restore .': '(no output - the whole working tree is back to the last commit)',
  'git restore --staged app.js': '(no output - app.js is unstaged, the change on disk stays)',
  'git status': 'On branch main\\nChanges not staged for commit:\\n  modified:   app.js',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l11-b1',
            body: 'git restore is the safe way to undo uncommitted changes. It resets the working tree to match the last commit. You can restore a single file or the entire working tree. Unlike git reset, it does not touch the staging area unless you pass --staged, and it does not delete commits. It is the right tool for the "oops, I broke something before committing" moment.',
          },
          {
            type: 'heading',
            id: 'g-l11-h1',
            level: 3,
            body: 'git restore',
          },
          {
            type: 'code',
            id: 'g-l11-c1',
            language: 'plaintext',
            title: 'Restore and clean',
            code: `# restore a single file
git restore app.js

# restore all files in the working tree
git restore .

# unstage a file (keep working tree changes)
git restore --staged app.js`,
          },
          {
            type: 'text',
            id: 'g-l11-b2',
            body: 'The three commands do three different jobs. `git restore app.js` copies the committed version of that one file back over the working copy, leaving every other file alone. `git restore .` does it for the whole tree. `git restore --staged app.js` is the odd one out: it takes the file out of the index but leaves the file on disk exactly as it is, so the change survives and simply becomes unstaged again. That last one is the command people reach for as `git reset HEAD app.js`, which does the same thing under an older name.',
          },
          {
            type: 'warning',
            id: 'g-l11-w1',
            title: 'Restore discards, it does not store',
            body: 'There is no reflog entry for work that was never committed. A restored file is overwritten by the committed version and the change is gone — `git restore` is not an undo, it is a discard. If there is any doubt, commit it on a throwaway branch or run `git stash` first; both are reversible, and a restore is not.',
          },
          {
            type: 'tip',
            id: 'g-l11-t1',
            title: 'Stage before you restore',
            body: 'If you have changes you want to keep, stage them first: git add file && git restore --staged file && git restore file.',
          },
          {
            type: 'exercise',
            id: 'g-l11-x1',
            exercise: {
              id: 'ex-git-l11',
              instructions: 'Write a JavaScript array of commands that modifies a file then uses git restore to discard the changes.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git restore app.js" },\n];\n' },
              expectedOutput: 'File restored to last committed state',
              tests: [
                {
                  id: 'ex-git-l11-t1',
                  label: 'Uses git restore',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git restore'));`,
                },
              ],
              hints: [
                'Use git restore file.js after modifying it.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "echo \\"broken\\" > app.js" },\n  { cmd: "git restore app.js" },\n];\n',
              },
              testNotes:
                'The exercise verifies the restore workflow.',
            },
          },
        ],
      },
      {
        id: 'git-l12',
        title: 'Revert and reset',
        description: 'git revert for safe undo, git reset for rewriting history, and when to use each.',
        duration: 7,
        objectives: [
          'Revert a commit safely',
          'Use git reset --soft, --mixed and --hard',
          'Choose between revert and reset',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l12',
          title: 'Revert and reset quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l12-q1',
              type: 'true-false',
              prompt: 'git reset is safe to use on public branches.',
              answer: false,
              explanation: 'git reset rewrites history. Use it only on private branches.',
            },
            {
              id: 'quiz-git-l12-q2',
              type: 'multiple-choice',
              prompt: 'What does git revert do?',
              options: [
                'Deletes the commit from history',
                'Creates a new commit that undoes the specified commit',
                'Resets the branch pointer',
                'Stashes changes',
              ],
              answer: 1,
              explanation: 'git revert creates a new commit that undoes the changes from an earlier commit.',
            },
            {
              id: 'quiz-git-l12-q3',
              type: 'multiple-choice',
              prompt: 'When should you use revert instead of reset?',
              options: [
                'On private branches',
                'On public branches that others have pulled',
                'Never',
                'Only on the first commit',
              ],
              answer: 1,
              explanation: 'Use revert on public branches because it does not rewrite history.',
            },
            {
              id: 'quiz-git-l12-q4',
              type: 'multiple-choice',
              prompt: 'After `git reset HEAD~1` in its default --mixed mode, where does the removed commit content end up?',
              options: [
                'Staged in the index',
                'In the working tree as unstaged changes',
                'Deleted permanently',
                'In a new revert commit',
              ],
              answer: 1,
              explanation: '--mixed moves the branch pointer and clears the index, so the edits survive as unstaged working-tree changes. Use --soft to keep them staged, or --hard to throw them away.',
            },
            {
              id: 'quiz-git-l12-q5',
              type: 'true-false',
              prompt: '`git reset --hard HEAD~1` keeps the discarded changes in your working tree.',
              answer: false,
              explanation: '--hard resets the index and the working tree as well as the branch pointer, so the commit content disappears from the files. The reflog can still find the commit while it remains reachable there.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l12-d1',
            title: 'Revert adds, reset erases',
            body: 'This is a simulation. `git revert` adds a new commit that undoes an earlier one and is safe on shared branches; `git reset` moves the branch pointer and rewrites history.',
            html: `<div class="term">
  <button data-cmd="git revert HEAD">git revert HEAD</button>
  <button data-cmd="git reset --soft HEAD~1">git reset --soft</button>
  <button data-cmd="git reset --hard HEAD~1">git reset --hard</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git revert HEAD': '[main 5b7c8d9] Revert "feat: add login validation"\\n 1 file changed, 12 deletions(-)',
  'git reset --soft HEAD~1': '(no output - the commit is gone and its changes are staged)',
  'git reset --hard HEAD~1': 'HEAD is now at 8c1d2e3 fix: handle empty state',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l12-b1',
            body: 'git revert creates a new commit that undoes an earlier commit. It is safe for public branches because it does not rewrite history. git reset moves the branch pointer backward, effectively removing commits. It is powerful but dangerous on shared branches: anyone who pulled the old commits will have a divergent history. Use reset only on private branches. Use revert on main or any branch others pull from.',
          },
          {
            type: 'heading',
            id: 'g-l12-h1',
            level: 3,
            body: 'Reset modes',
          },
          {
            type: 'list',
            id: 'g-l12-l1',
            style: 'bullet',
            items: [
              '**--soft** — moves HEAD and branch pointer. Changes stay staged.',
              '**--mixed** (default) — moves HEAD and branch pointer. Changes go to working tree.',
              '**--hard** — moves HEAD and branch pointer. Changes are deleted.',
            ],
          },
          {
            type: 'code',
            id: 'g-l12-c1',
            language: 'plaintext',
            title: 'Revert and reset',
            code: `# safe undo: create a new commit
git revert abc123

# private branch: remove last commit, keep changes staged
git reset --soft HEAD~1

# private branch: remove last commit, keep changes in working tree
git reset HEAD~1

# private branch: remove last commit and discard changes
git reset --hard HEAD~1`,
          },
          {
            type: 'tip',
            id: 'g-l12-t1',
            title: 'Never reset a public branch',
            body: 'If someone else has pulled the branch, resetting will force them to re-sync their history. Use revert instead.',
          },
          {
            type: 'exercise',
            id: 'g-l12-x1',
            exercise: {
              id: 'ex-git-l12',
              instructions: 'Write a JavaScript array of commands that reverts the last commit on the current branch safely.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git revert HEAD" },\n];\n' },
              expectedOutput: 'Revert commit created',
              tests: [
                {
                  id: 'ex-git-l12-t1',
                  label: 'Revert used',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git revert HEAD'));`,
                },
              ],
              hints: [
                'Use git revert HEAD.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git revert HEAD" },\n];\n',
              },
              testNotes:
                'The exercise verifies the revert command.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'git-s7',
    title: 'Stashing and Cleanup',
    description: 'git stash, cleaning the working tree, reflog, and recovering from mistakes.',
    lessons: [
      {
        id: 'git-l13',
        title: 'git stash',
        description: 'Temporarily saving changes, applying and dropping stashes, and the stash workflow.',
        duration: 6,
        objectives: [
          'Stash uncommitted changes',
          'Apply and pop stashes',
          'Manage multiple stashes',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-git-l13',
          title: 'git stash quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l13-q1',
              type: 'multiple-choice',
              prompt: 'What does git stash do?',
              options: [
                'Commits all changes',
                'Saves uncommitted changes and reverts the working tree',
                'Deletes untracked files',
                'Creates a new branch',
              ],
              answer: 1,
              explanation: 'git stash saves uncommitted changes and reverts the working tree to a clean state.',
            },
            {
              id: 'quiz-git-l13-q2',
              type: 'multiple-choice',
              prompt: 'What does git reflog record?',
              options: [
                'Remote branches',
                'Every move of HEAD',
                'Stash entries',
                'Tag names',
              ],
              answer: 1,
              explanation: 'git reflog records every move of HEAD, including resets, checkouts and rebases.',
            },
            {
              id: 'quiz-git-l13-q3',
              type: 'blank',
              prompt: 'What command applies and removes the top stash?',
              answers: [
                'git stash pop',
              ],
              explanation: 'git stash pop applies the top stash and removes it from the stash list.',
            },
            {
              id: 'quiz-git-l13-q4',
              type: 'multiple-choice',
              prompt: 'What is the difference between `git stash apply` and `git stash pop`?',
              options: [
                'apply keeps the stash entry; pop applies it and then drops it',
                'apply only handles tracked files; pop includes untracked files',
                'pop applies the oldest stash; apply applies the newest',
                'There is no difference; both drop the entry',
              ],
              answer: 0,
              explanation: 'Pop is apply followed by drop, which is why a failed pop leaves the stash in place. Apply is safer when you may need to reuse the same changes on another branch.',
            },
            {
              id: 'quiz-git-l13-q5',
              type: 'true-false',
              prompt: '`git stash -u` also saves untracked files in the stash.',
              answer: true,
              explanation: 'By default a stash includes tracked changes only, so newly created files would be left behind. The -u flag adds untracked files, which is what you want when the work includes new files.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l13-d1',
            title: 'A stash is a stack',
            body: 'This is a simulation. `git stash` shelves uncommitted changes. `stash@{0}` is always the newest, and `pop` is `apply` followed by `drop`.',
            html: `<div class="term">
  <button data-cmd="git stash">git stash</button>
  <button data-cmd="git stash list">git stash list</button>
  <button data-cmd="git stash pop">git stash pop</button>
  <button data-cmd="git stash apply stash@{1}">git stash apply</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git stash': 'Saved working directory and index state WIP on main: 8c1d2e3 fix: handle empty state',
  'git stash list': 'stash@{0}: WIP on main: 8c1d2e3 fix: handle empty state\\nstash@{1}: WIP on main: 6a0f9b2 feat: add header',
  'git stash pop': 'On branch main\\nChanges not staged for commit:\\n  modified:   app.js\\nDropped refs/stash@{0} (0a1b2c3d)',
  'git stash apply stash@{1}': 'On branch main\\nChanges not staged for commit:\\n  modified:   app.js\\n(the stash is left in the list)',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 210,
          },
          {
            type: 'text',
            id: 'g-l13-b1',
            body: 'git stash saves uncommitted changes and reverts the working tree to a clean state. It is useful when you need to switch branches but are not ready to commit. Stashes are stored in a stack. Use git stash pop to apply and remove the top stash, or git stash apply to apply it without removing. You can have multiple stashes and list them with git stash list.',
          },
          {
            type: 'heading',
            id: 'g-l13-h1',
            level: 3,
            body: 'Stash commands',
          },
          {
            type: 'code',
            id: 'g-l13-c1',
            language: 'plaintext',
            title: 'Stash workflow',
            code: `# save changes
git stash

# list stashes
git stash list

# apply and remove the top stash
git stash pop

# apply without removing
git stash apply stash@{1}

# drop a stash
git stash drop stash@{0}`,
          },
          {
            type: 'text',
            id: 'g-l13-b2',
            body: 'A stash is a stack, and the numbering runs backwards: `stash@{0}` is the most recent entry, and each new stash pushes everything else down. `git stash` is a shortcut for `git stash push`, and the default message is the branch and the commit you were on, which is rarely enough to identify it later. `git stash pop` is exactly `git stash apply` followed by `git stash drop`, which is why a conflict during a pop leaves the stash in place — the apply failed, so the drop never ran.',
          },
          {
            type: 'warning',
            id: 'g-l13-w1',
            title: 'A stash is easy to forget',
            body: 'Stashes live only on your machine. They are not pushed, not shared, and invisible to everyone else working on the branch — so a stash is the wrong place for anything that has to outlive the afternoon. They are also easy to lose: `git stash pop` an old stash and the conflict can be genuinely confusing. For anything longer than a quick branch switch, a WIP commit on a scratch branch is safer.',
          },
          {
            type: 'tip',
            id: 'g-l13-t1',
            title: 'Include untracked files',
            body: 'git stash -u also stashes untracked files. Use it when the stash should include new files.',
          },
          {
            type: 'exercise',
            id: 'g-l13-x1',
            exercise: {
              id: 'ex-git-l13',
              instructions: 'Write a JavaScript array of commands that stashes changes, switches branches, then pops the stash.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git stash" },\n];\n' },
              expectedOutput: 'Changes stashed and restored',
              tests: [
                {
                  id: 'ex-git-l13-t1',
                  label: 'Stash used',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git stash')) && commands.some(c => String(c.cmd || c).includes('git switch')) && commands.some(c => String(c.cmd || c).includes('git stash pop'));`,
                },
              ],
              hints: [
                'Use git stash, git switch, then git stash pop.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git stash" },\n  { cmd: "git switch main" },\n  { cmd: "git stash pop" },\n];\n',
              },
              testNotes:
                'The exercise verifies the stash workflow.',
            },
          },
        ],
      },
      {
        id: 'git-l14',
        title: 'Cleaning up history',
        description: 'git clean, git reflog, recovering lost commits, and keeping the repository tidy.',
        duration: 6,
        objectives: [
          'Use git clean to remove untracked files',
          'Use git reflog to find lost commits',
          'Recover a dropped stash or reset commit',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-git-l14',
          title: 'Cleaning up history quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l14-q1',
              type: 'true-false',
              prompt: 'git clean deletes tracked files.',
              answer: false,
              explanation: 'git clean deletes only untracked files. Tracked files are managed by Git.',
            },
            {
              id: 'quiz-git-l14-q2',
              type: 'multiple-choice',
              prompt: 'When should you use git clean?',
              options: [
                'To remove committed files',
                'To remove untracked files',
                'To clean the stash',
                'To reset the branch',
              ],
              answer: 1,
              explanation: 'git clean removes untracked files from the working tree.',
            },
            {
              id: 'quiz-git-l14-q3',
              type: 'multiple-choice',
              prompt: 'What does `git clean -nd` do?',
              options: [
                'Deletes untracked files without asking for confirmation',
                'Lists what git clean would remove, without deleting anything',
                'Removes tracked files that have changed',
                'Drops the newest stash entry',
              ],
              answer: 1,
              explanation: '-n is the dry-run flag and -d includes directories, so the command previews the cleanup. Removing the -n is what actually deletes the files.',
            },
            {
              id: 'quiz-git-l14-q4',
              type: 'multiple-choice',
              prompt: 'A `git reset --hard` dropped a commit. Which command restores the state recorded two HEAD moves ago in the reflog?',
              options: [
                'git reset --hard HEAD@{2}',
                'git reset --soft HEAD~2',
                'git revert HEAD@{2}',
                'git checkout -- HEAD',
              ],
              answer: 0,
              explanation: 'HEAD@{2} names that earlier reflog position, so a hard reset moves the branch and working tree back to it. A soft reset would move the pointer but leave the current files untouched.',
            },
            {
              id: 'quiz-git-l14-q5',
              type: 'true-false',
              prompt: 'A commit removed by `git reset --hard` is gone for good.',
              answer: false,
              explanation: 'The reflog records the old position of HEAD, so the commit can be found and restored until the entry is pruned. Recovery depends on acting before Git garbage-collects the unreachable object.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l14-d1',
            title: 'The reflog finds what reset lost',
            body: 'This is a simulation. Every move of HEAD is recorded, so a commit removed by reset can be found in `git reflog` and restored with `git reset --hard`.',
            html: `<div class="term">
  <button data-cmd="git reflog">git reflog</button>
  <button data-cmd="git show HEAD@{2}">git show HEAD@{2}</button>
  <button data-cmd="git reset --hard HEAD@{2}">git reset --hard</button>
  <button data-cmd="git clean -nd">git clean -nd</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git reflog': '8c1d2e3 HEAD@{0}: reset: moving to HEAD~1\\n3f2a1b9 HEAD@{1}: commit: feat: add header\\n6a0f9b2 HEAD@{2}: commit: fix: handle empty state',
  'git show HEAD@{2}': 'commit 6a0f9b2a1c\\nAuthor: Ada Lovelace\\nDate: today\\n\\n    fix: handle empty state',
  'git reset --hard HEAD@{2}': 'HEAD is now at 6a0f9b2 fix: handle empty state',
  'git clean -nd': 'Would remove notes.txt\\nWould remove dist/',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 210,
          },
          {
            type: 'text',
            id: 'g-l14-b1',
            body: 'git clean removes untracked files and directories. git reflog records every move of HEAD, including resets, checkouts, and rebases. If you accidentally reset a branch or drop a stash, reflog can find the lost commit and you can restore it with git reset. Nothing is truly gone in Git as long as you have the reflog.',
          },
          {
            type: 'heading',
            id: 'g-l14-h1',
            level: 3,
            body: 'Reflog',
          },
          {
            type: 'code',
            id: 'g-l14-c1',
            language: 'plaintext',
            title: 'Reflog and recovery',
            code: `# see every HEAD move
git reflog

# recover a lost commit
git reset --hard HEAD@{2}

# preview before recovering
git show HEAD@{2}`,
          },
          {
            type: 'list',
            id: 'g-l14-l1',
            style: 'bullet',
            items: [
              '**HEAD@{0}** — the current HEAD.',
              '**HEAD@{1}** — the previous position of HEAD.',
              '**git show HEAD@{n}** — inspect a previous state.',
              '**git reset --hard HEAD@{n}** — restore to a previous state.',
            ],
          },
          {
            type: 'tip',
            id: 'g-l14-t1',
            title: 'Use dry-run before clean',
            body: 'git clean -nd shows what would be deleted without actually deleting. Remove the -n flag when you are sure.',
          },
          {
            type: 'exercise',
            id: 'g-l14-x1',
            exercise: {
              id: 'ex-git-l14',
              instructions: 'Write a JavaScript array of commands that uses git reflog to find the last HEAD position and recover it.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  // e.g. { cmd: "git reflog" },\n];\n' },
              expectedOutput: 'Reflog used for recovery',
              tests: [
                {
                  id: 'ex-git-l14-t1',
                  label: 'Reflog used',
                  body: `return Array.isArray(commands) && commands.some(c => String(c.cmd || c).includes('git reflog')) && commands.some(c => String(c.cmd || c).includes('git reset --hard HEAD@'));`,
                },
              ],
              hints: [
                'Run git reflog and use git reset --hard HEAD@{1}.',
              ],
              solution: {
                javascript: '// Write your git commands as JavaScript\n\nconst commands = [\n  { cmd: "git reflog" },\n  { cmd: "git reset --hard HEAD@{1}" },\n];\n',
              },
              testNotes:
                'The exercise verifies the reflog workflow.',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'git-s8',
    title: 'Git Best Practices',
    description: 'Writing good commits, .gitignore, hooks, and the habits that make Git a force multiplier.',
    lessons: [
      {
        id: 'git-l15',
        title: 'Commit hygiene',
        description: 'Atomic commits, meaningful messages, and why commit quality is a team skill.',
        duration: 7,
        objectives: [
          'Write atomic commits that do one thing',
          'Use conventional commit messages',
          'Split work into logical commits',
        ],
        xp: 45,
        quiz: {
          id: 'quiz-git-l15',
          title: 'Commit hygiene quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l15-q1',
              type: 'multiple-choice',
              prompt: 'What is an atomic commit?',
              options: [
                'A commit that changes every file',
                'A commit that does exactly one thing',
                'A commit with no tests',
                'A commit on the main branch',
              ],
              answer: 1,
              explanation: 'An atomic commit does one thing completely and can be reverted without side effects.',
            },
            {
              id: 'quiz-git-l15-q2',
              type: 'multiple-choice',
              prompt: 'What does a pre-commit hook do?',
              options: [
                'Pushes commits to the remote',
                'Runs before each commit',
                'Creates a new branch',
                'Deletes the repository',
              ],
              answer: 1,
              explanation: 'A pre-commit hook runs before each commit, letting you run checks or tests.',
            },
            {
              id: 'quiz-git-l15-q3',
              type: 'multiple-choice',
              prompt: 'Which subject line follows the lesson rules for a commit message?',
              options: [
                'Added retry logic to the payment webhook',
                'Add retry logic to payment webhook',
                'payment webhook changes',
                'WIP',
              ],
              answer: 1,
              explanation: 'The subject should be short, specific, and in the imperative mood, as if completing "This commit will...". Past tense and vague labels like WIP make history hard to scan.',
            },
            {
              id: 'quiz-git-l15-q4',
              type: 'true-false',
              prompt: '`git commit --amend` is safe to use on a commit you have already pushed.',
              answer: false,
              explanation: 'Amending replaces the commit with a new one that has a different hash, so anyone who pulled the old commit ends up with divergent history. Amend only commits that are still local.',
            },
            {
              id: 'quiz-git-l15-q5',
              type: 'multiple-choice',
              prompt: 'In `feat(auth): add login form`, what does `auth` identify?',
              options: [
                'The author of the commit',
                'The branch the commit belongs to',
                'The area of the codebase the change touches',
                'The issue number the change closes',
              ],
              answer: 2,
              explanation: 'The scope in parentheses narrows the type to the subsystem affected, which makes filtered changelogs possible. Author and issue references belong in the commit metadata or footer.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l15-d1',
            title: 'Messages that read like a changelog',
            body: 'This is a simulation. A conventional subject names the type and scope so history stays machine-readable, and `git commit --amend` rewrites the last commit before it is pushed.',
            html: `<div class="term">
  <button data-cmd="git commit -m 'feat(auth): add login form'">git commit</button>
  <button data-cmd="git commit --amend">git commit --amend</button>
  <button data-cmd="git log --oneline">git log --oneline</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  "git commit -m 'feat(auth): add login form'": '[main 2c4d6e8] feat(auth): add login form\\n 3 files changed, 48 insertions(+)',
  'git commit --amend': '[main 7f8a9b0] feat(auth): add login form with validation',
  'git log --oneline': '7f8a9b0 feat(auth): add login form with validation\\n8c1d2e3 fix(layout): correct padding on mobile nav',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l15-b1',
            body: 'A good commit is atomic: it does one thing and does it completely. It contains all the code, tests, and documentation for that single change. The message explains what and why. Bad commits mix refactoring with features, have messages like "update", or leave the repository in a broken state. Good commits make git bisect useful, code review fast, and reverts safe.',
          },
          {
            type: 'heading',
            id: 'g-l15-h1',
            level: 3,
            body: 'The commit message template',
          },
          {
            type: 'code',
            id: 'g-l15-c1',
            language: 'plaintext',
            title: 'Conventional commit format',
            code: `type(scope): short description

Longer explanation if needed. Explain what changed and why,
not what the code does (the code shows that).

Footer: reference issue number or breaking change.`,
          },
          {
            type: 'list',
            id: 'g-l15-l1',
            style: 'bullet',
            items: [
              '**Subject** — 50 characters or less. Imperative mood: "Add", not "Added".',
              '**Body** — wrap at 72 characters. Explain what and why.',
              '**Footer** — reference issues, breaking changes, or co-authors.',
            ],
          },
          {
            type: 'tip',
            id: 'g-l15-t1',
            title: 'Use git commit --amend carefully',
            body: 'git commit --amend fixes the last commit message or adds forgotten files. Do not amend commits that have already been pushed.',
          },
          {
            type: 'exercise',
            id: 'g-l15-x1',
            exercise: {
              id: 'ex-git-l15',
              instructions: 'Write three conventional commit messages for a feature that adds a login form, fixes a layout bug, and updates tests.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your commit messages as JavaScript\n\nconst messages = [\n  // e.g. "feat(auth): add login form",\n];\n' },
              expectedOutput: 'Three conventional commit messages',
              tests: [
                {
                  id: 'ex-git-l15-t1',
                  label: 'Messages follow convention',
                  body: `return Array.isArray(messages) && messages.length === 3 && messages.every(m => typeof m === 'string' && /^(feat|fix|docs|refactor|test|chore)\\(.+\\): .+/.test(m));`,
                },
              ],
              hints: [
                'Use the format: type(scope): short description',
                'Types include feat, fix, docs, refactor, test, chore.',
              ],
              solution: {
                javascript: '// Write your commit messages as JavaScript\n\nconst messages = [\n  "feat(auth): add login form component",\n  "fix(layout): correct padding on mobile nav",\n  "test(auth): add tests for login validation",\n];\n',
              },
              testNotes:
                'The exercise verifies conventional commit format.',
            },
          },
        ],
      },
      {
        id: 'git-l16',
        title: '.gitignore and hooks',
        description: 'Ignoring files, common patterns, and Git hooks for automation.',
        duration: 6,
        objectives: [
          'Create and maintain a .gitignore file',
          'Use common .gitignore patterns',
          'Set up a pre-commit hook',
        ],
        xp: 40,
        quiz: {
          id: 'quiz-git-l16',
          title: '.gitignore and hooks quiz',
          passingScore: 60,
          questions: [
            {
              id: 'quiz-git-l16-q1',
              type: 'true-false',
              prompt: '.gitignore can untrack files that are already tracked.',
              answer: false,
              explanation: '.gitignore only prevents untracked files from being added. Use git rm --cached to untrack.',
            },
            {
              id: 'quiz-git-l16-q2',
              type: 'blank',
              prompt: 'What file tells Git which files to ignore?',
              answers: [
                '.gitignore',
              ],
              explanation: '.gitignore lists patterns of files that Git should not track.',
            },
            {
              id: 'quiz-git-l16-q3',
              type: 'multiple-choice',
              prompt: 'Why should you commit .gitignore early?',
              options: [
                'It makes commits faster',
                'Tracked files are not affected by later .gitignore rules',
                'It reduces repository size',
                'It enables hooks',
              ],
              answer: 1,
              explanation: 'Once a file is tracked, .gitignore does not affect it. Commit .gitignore first.',
            },
            {
              id: 'quiz-git-l16-q4',
              type: 'multiple-choice',
              prompt: 'A file is already tracked and you want Git to stop tracking it without deleting it from disk. Which command does that?',
              options: [
                'git restore file',
                'git clean -f file',
                'git rm --cached file',
                'git reset --soft file',
              ],
              answer: 2,
              explanation: '--cached removes the file from the index but leaves the working copy alone, which is the only way to untrack something .gitignore cannot affect. `git clean` would delete an untracked file instead.',
            },
            {
              id: 'quiz-git-l16-q5',
              type: 'multiple-choice',
              prompt: 'Where does a plain pre-commit hook script live in a repository?',
              options: [
                '.gitignore',
                '.git/config',
                '.github/workflows/pre-commit.yml',
                '.git/hooks/pre-commit',
              ],
              answer: 3,
              explanation: 'Git runs the executable named after the hook inside .git/hooks before it creates a commit. GitHub Actions workflows live elsewhere and run on the server, not on your machine before a commit.',
            },
          ],
        },
        content: [
          {
            type: 'demo',
            id: 'g-l16-d1',
            title: 'What .gitignore quietly removes',
            body: 'This is a simulation. Patterns in `.gitignore` keep untracked files out of `git status`, and `git check-ignore -v` shows exactly which line matched.',
            html: `<div class="term">
  <button data-cmd="git status">git status</button>
  <button data-cmd="git check-ignore -v node_modules">git check-ignore -v</button>
  <button data-cmd="git commit -m 'chore: add .gitignore'">git commit</button>
</div>
<pre id="out">Press a command to see what Git prints back.</pre>`,
            css: `body { font-family: system-ui, -apple-system, "Segoe UI", sans-serif; font-size: 14px; }
.term { display: flex; gap: 8px; flex-wrap: wrap; }
button { font: inherit; padding: 6px 12px; border: 1px solid #d5dae0; border-radius: 6px; background: #fff; cursor: pointer; }
pre { margin: 12px 0 0; padding: 10px; background: #0b0d10; color: #b9f6ca; border-radius: 6px; font-size: 12.5px; white-space: pre-wrap; }`,
            javascript: `const out = document.querySelector('#out')
const outputs = {
  'git status': 'On branch main\\nUntracked files:\\n  .gitignore\\n\\nnothing added to commit but untracked files present',
  'git check-ignore -v node_modules': '.gitignore:2:node_modules/  node_modules',
  "git commit -m 'chore: add .gitignore'": '[main 4d5e6f7] chore: add .gitignore\\n 1 file changed, 8 insertions(+)',
}
document.querySelectorAll('[data-cmd]').forEach(function (button) {
  button.addEventListener('click', function () {
    out.textContent = button.dataset.cmd + '\\n' + (outputs[button.dataset.cmd] || 'No output.')
  })
})`,
            height: 200,
          },
          {
            type: 'text',
            id: 'g-l16-b1',
            body: 'The .gitignore file tells Git which files to ignore. Common patterns include node_modules, .env files, build outputs, IDE configuration, and OS files like .DS_Store. Git hooks are scripts that run automatically at certain points in the Git workflow. The pre-commit hook runs before each commit and can run linters, formatters, or tests. Husky and lint-staged are popular tools that make hooks easy to manage in JavaScript projects.',
          },
          {
            type: 'heading',
            id: 'g-l16-h1',
            level: 3,
            body: 'Common .gitignore patterns',
          },
          {
            type: 'code',
            id: 'g-l16-c1',
            language: 'plaintext',
            title: '.gitignore',
            code: `# dependencies
node_modules/
vendor/

# environment
.env
.env.local

# build outputs
dist/
build/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db`,
          },
          {
            type: 'heading',
            id: 'g-l16-h2',
            level: 3,
            body: 'Pre-commit hook',
          },
          {
            type: 'code',
            id: 'g-l16-c2',
            language: 'plaintext',
            title: 'Simple pre-commit hook',
            code: `#!/bin/sh
# .git/hooks/pre-commit
npm run lint
npm test`,
          },
          {
            type: 'tip',
            id: 'g-l16-t1',
            title: 'Commit .gitignore early',
            body: 'Add .gitignore to the first commit. Once a file is tracked, .gitignore does not untrack it. Use git rm --cached to untrack.',
          },
          {
            type: 'exercise',
            id: 'g-l16-x1',
            exercise: {
              id: 'ex-git-l16',
              instructions: 'Write a JavaScript string containing a .gitignore file for a Node.js project.',
              languages: ['javascript'],
              starterCode: { javascript: '// Write your .gitignore content as JavaScript\n\nconst gitignoreContent = "";\n' },
              expectedOutput: '.gitignore file with common patterns',
              tests: [
                {
                  id: 'ex-git-l16-t1',
                  label: 'node_modules ignored',
                  body: `return typeof gitignoreContent === 'string' && gitignoreContent.includes('node_modules/') && gitignoreContent.includes('.env') && gitignoreContent.includes('dist/');`,
                },
              ],
              hints: [
                'Create .gitignore with node_modules/, .env and dist/.',
              ],
              solution: {
                javascript: '// Write your .gitignore content as JavaScript\n\nconst gitignoreContent = "node_modules/\\n.env\\ndist/\\n.vscode/\\n.DS_Store";\n',
              },
              testNotes:
                'The exercise verifies .gitignore patterns.',
            },
          },
        ],
      },
    ],
  },
]