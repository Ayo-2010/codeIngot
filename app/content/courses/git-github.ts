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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s1',
      title: 'Introduction to Version Control quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s1-q1',
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
          id: 'quiz-git-s1-q2',
          type: 'true-false',
          prompt: 'A Git commit stores a list of changes (deltas) between versions.',
          answer: false,
          explanation: 'A Git commit is a snapshot of the entire project at a point in time, not a delta.',
        },
        {
          id: 'quiz-git-s1-q3',
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
          id: 'quiz-git-s1-q4',
          type: 'blank',
          prompt: 'What command creates a new Git repository?',
          answers: ['git init'],
          explanation: 'git init creates a new Git repository in the current directory.',
        },
        {
          id: 'quiz-git-s1-q5',
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
      ],
    },
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s2',
      title: 'Daily Git Workflow quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s2-q1',
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
          id: 'quiz-git-s2-q2',
          type: 'true-false',
          prompt: 'The staging area lets you prepare changes before committing.',
          answer: true,
          explanation: 'The staging area (index) lets you select which changes to include in the next commit.',
        },
        {
          id: 'quiz-git-s2-q3',
          type: 'multiple-choice',
          prompt: 'What is the conventional commits type for a bug fix?',
          options: ['feat', 'fix', 'docs', 'refactor'],
          answer: 1,
          explanation: 'fix is used for bug fixes in the conventional commits specification.',
        },
        {
          id: 'quiz-git-s2-q4',
          type: 'blank',
          prompt: 'What command pushes local commits to the remote?',
          answers: ['git push'],
          explanation: 'git push uploads local commits to the remote repository.',
        },
        {
          id: 'quiz-git-s2-q5',
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
      ],
    },
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s3',
      title: 'Branching quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s3-q1',
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
          id: 'quiz-git-s3-q2',
          type: 'true-false',
          prompt: 'Git Flow is simpler than GitHub Flow.',
          answer: false,
          explanation: 'Git Flow has more branches and rules. GitHub Flow is simpler, using only main and feature branches.',
        },
        {
          id: 'quiz-git-s3-q3',
          type: 'multiple-choice',
          prompt: 'What is the default branch name in modern Git?',
          options: ['master', 'main', 'trunk', 'develop'],
          answer: 1,
          explanation: 'GitHub and Git now default to main as the primary branch name.',
        },
        {
          id: 'quiz-git-s3-q4',
          type: 'blank',
          prompt: 'What command creates and switches to a new branch in one step?',
          answers: ['git switch -c'],
          explanation: 'git switch -c branch-name creates and switches to the new branch.',
        },
        {
          id: 'quiz-git-s3-q5',
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
      ],
    },
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s4',
      title: 'Merging and Rebasing quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s4-q1',
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
          id: 'quiz-git-s4-q2',
          type: 'true-false',
          prompt: 'You should rebase branches that other people are using.',
          answer: false,
          explanation: 'Rebasing rewrites history and changes commit hashes. Never rebase a shared branch.',
        },
        {
          id: 'quiz-git-s4-q3',
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
          id: 'quiz-git-s4-q4',
          type: 'blank',
          prompt: 'What Git command replays commits on top of another branch?',
          answers: ['git rebase'],
          explanation: 'git rebase replays commits from one branch onto another, producing a linear history.',
        },
        {
          id: 'quiz-git-s4-q5',
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
      ],
    },
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s5',
      title: 'Collaborating with Remotes quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s5-q1',
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
          id: 'quiz-git-s5-q2',
          type: 'true-false',
          prompt: 'A pull request is a proposal to merge changes.',
          answer: true,
          explanation: 'A pull request proposes merging changes from one branch into another.',
        },
        {
          id: 'quiz-git-s5-q3',
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
          id: 'quiz-git-s5-q4',
          type: 'blank',
          prompt: 'What command downloads remote changes without merging?',
          answers: ['git fetch'],
          explanation: 'git fetch downloads remote changes without touching your working tree.',
        },
        {
          id: 'quiz-git-s5-q5',
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
      ],
    },
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s6',
      title: 'Undoing Changes quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s6-q1',
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
          id: 'quiz-git-s6-q2',
          type: 'true-false',
          prompt: 'git reset is safe to use on public branches.',
          answer: false,
          explanation: 'git reset rewrites history. Use it only on private branches.',
        },
        {
          id: 'quiz-git-s6-q3',
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
          id: 'quiz-git-s6-q4',
          type: 'blank',
          prompt: 'What git reset mode keeps changes staged?',
          answers: ['--soft'],
          explanation: 'git reset --soft moves the branch pointer and keeps changes staged.',
        },
        {
          id: 'quiz-git-s6-q5',
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
      ],
    },
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s7',
      title: 'Stashing and Cleanup quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s7-q1',
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
          id: 'quiz-git-s7-q2',
          type: 'true-false',
          prompt: 'git clean deletes tracked files.',
          answer: false,
          explanation: 'git clean deletes only untracked files. Tracked files are managed by Git.',
        },
        {
          id: 'quiz-git-s7-q3',
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
          id: 'quiz-git-s7-q4',
          type: 'blank',
          prompt: 'What command applies and removes the top stash?',
          answers: ['git stash pop'],
          explanation: 'git stash pop applies the top stash and removes it from the stash list.',
        },
        {
          id: 'quiz-git-s7-q5',
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
      ],
    },
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
        content: [
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
        content: [
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
    quiz: {
      id: 'quiz-git-s8',
      title: 'Git Best Practices quiz',
      passingScore: 60,
      questions: [
        {
          id: 'quiz-git-s8-q1',
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
          id: 'quiz-git-s8-q2',
          type: 'true-false',
          prompt: '.gitignore can untrack files that are already tracked.',
          answer: false,
          explanation: '.gitignore only prevents untracked files from being added. Use git rm --cached to untrack.',
        },
        {
          id: 'quiz-git-s8-q3',
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
          id: 'quiz-git-s8-q4',
          type: 'blank',
          prompt: 'What file tells Git which files to ignore?',
          answers: ['.gitignore'],
          explanation: '.gitignore lists patterns of files that Git should not track.',
        },
        {
          id: 'quiz-git-s8-q5',
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
      ],
    },
  },
]