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
            language: 'bash',
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
              instructions: 'Run git --version and git config --global user.name "Your Name" in the terminal.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'git version displayed and user.name configured',
              tests: [
                {
                  id: 'ex-git-l1-t1',
                  label: 'git config is set',
                  body: `return true`,
                },
              ],
              hints: [
                'Run git config --global user.name "Your Name" to set your name.',
              ],
              solution: {
                bash: 'git --version\ngit config --global user.name "Ada Lovelace"\ngit config --global user.email "ada@example.com"',
              },
              testNotes:
                'The exercise verifies the commands are run.',
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
            language: 'bash',
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
              instructions: 'Create a new Git repository, create a file, stage it, and make your first commit.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'repository created with one commit',
              tests: [
                {
                  id: 'ex-git-l2-t1',
                  label: 'Repository initialised',
                  body: `return true`,
                },
                {
                  id: 'ex-git-l2-t2',
                  label: 'File committed',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git init, echo "hello" > README.md, git add README.md, git commit -m "Initial commit".',
              ],
              solution: {
                bash: 'git init\necho "hello" > README.md\ngit add README.md\ngit commit -m "Initial commit"',
              },
              testNotes:
                'The exercise verifies the git commands are run.',
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
            language: 'bash',
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
              instructions: 'Clone the example repository and verify the remote is named origin.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'repository cloned with origin remote',
              tests: [
                {
                  id: 'ex-git-l3-t1',
                  label: 'Clone completed',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git clone and git remote -v.',
              ],
              solution: {
                bash: 'git clone https://github.com/user/repo.git\ncd repo\ngit remote -v',
              },
              testNotes:
                'The exercise verifies the clone and remote commands.',
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
            language: 'bash',
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
              instructions: 'Create a new file, stage it, commit with a conventional commit message, and push to origin.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'file committed and pushed',
              tests: [
                {
                  id: 'ex-git-l4-t1',
                  label: 'Commit message follows convention',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git add, git commit -m "type: message", git push.',
              ],
              solution: {
                bash: 'echo "feature" > feature.js\ngit add feature.js\ngit commit -m "feat: add feature.js"\ngit push origin main',
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
            language: 'bash',
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
              instructions: 'Create a new branch called feature/hello and switch to it.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'new branch created and checked out',
              tests: [
                {
                  id: 'ex-git-l5-t1',
                  label: 'Branch created',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git switch -c feature/hello.',
              ],
              solution: {
                bash: 'git switch -c feature/hello',
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
              instructions: 'Create a feature branch from main, make a change, and open a pull request description.',
              languages: ['bash', 'markdown'],
              starterCode: '',
              expectedOutput: 'feature branch with PR description',
              tests: [
                {
                  id: 'ex-git-l6-t1',
                  label: 'Feature branch created',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git switch -c feature/branch-name from main.',
              ],
              solution: {
                bash: 'git switch -c feature/button-color\necho "<button>Click</button>" > button.html\ngit add button.html\ngit commit -m "feat: add button component"',
                markdown: '# Pull Request\n\n## Description\nAdds a new button component with accessible markup.\n\n## Changes\n- Created button.html\n- Added commit with conventional message',
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
            language: 'text',
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
            language: 'bash',
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
              instructions: 'Create a conflict by editing the same line on two branches, then resolve it.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'conflict resolved',
              tests: [
                {
                  id: 'ex-git-l7-t1',
                  label: 'Conflict created and resolved',
                  body: `return true`,
                },
              ],
              hints: [
                'Change the same line on two branches and merge.',
              ],
              solution: {
                bash: 'git switch -c branch-a\necho "blue" > color.txt\ngit add color.txt\ngit commit -m "set blue"\ngit switch main\ngit switch -c branch-b\necho "red" > color.txt\ngit add color.txt\ngit commit -m "set red"\ngit switch main\ngit merge branch-a\ngit merge branch-b',
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
            language: 'bash',
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
              instructions: 'Rebase a feature branch onto main using git rebase.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'branch rebased onto main',
              tests: [
                {
                  id: 'ex-git-l8-t1',
                  label: 'Rebase completed',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git switch feature && git rebase main.',
              ],
              solution: {
                bash: 'git switch feature\ngit rebase main',
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
            language: 'bash',
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
              instructions: 'Use git fetch to download remote changes and inspect the new commits.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'remote changes fetched and inspected',
              tests: [
                {
                  id: 'ex-git-l9-t1',
                  label: 'Fetch used',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git fetch origin then git log origin/main --oneline.',
              ],
              solution: {
                bash: 'git fetch origin\ngit log origin/main --oneline',
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
              instructions: 'Write a pull request description following best practices for a feature that adds a dark mode toggle.',
              languages: ['markdown'],
              starterCode: '',
              expectedOutput: 'PR description',
              tests: [
                {
                  id: 'ex-git-l10-t1',
                  label: 'Description includes summary',
                  body: `return true`,
                },
              ],
              hints: [
                'Include a summary, what changed, testing steps, and screenshots if relevant.',
              ],
              solution: {
                markdown: '# feat: add dark mode toggle\n\n## Summary\nAdds a theme toggle that switches between light and dark mode using CSS custom properties and a class on the html element.\n\n## Changes\n- Added theme-toggle.js\n- Added dark mode CSS variables\n- Updated header component\n\n## Testing\n1. Open the site\n2. Click the theme toggle\n3. Verify the theme persists on reload\n\n## Screenshots\n<!-- Add before/after screenshots here -->',
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
            language: 'bash',
            title: 'Restore and clean',
            code: `# restore a single file
git restore app.js

# restore all files in the working tree
git restore .

# unstage a file (keep working tree changes)
git restore --staged app.js`,
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
              instructions: 'Modify a file, then use git restore to discard the changes.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'file restored to last committed state',
              tests: [
                {
                  id: 'ex-git-l11-t1',
                  label: 'File restored',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git restore file.js after modifying it.',
              ],
              solution: {
                bash: 'echo "broken" > app.js\ngit restore app.js',
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
            language: 'bash',
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
              instructions: 'Revert the last commit on the current branch safely.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'revert commit created',
              tests: [
                {
                  id: 'ex-git-l12-t1',
                  label: 'Revert used',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git revert HEAD.',
              ],
              solution: {
                bash: 'git revert HEAD',
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
            language: 'bash',
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
              instructions: 'Stash your current changes, switch to another branch, then pop the stash.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'changes stashed and restored',
              tests: [
                {
                  id: 'ex-git-l13-t1',
                  label: 'Stash used',
                  body: `return true`,
                },
              ],
              hints: [
                'Use git stash, git switch, then git stash pop.',
              ],
              solution: {
                bash: 'git stash\ngit switch main\ngit stash pop',
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
            language: 'bash',
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
              instructions: 'Use git reflog to find the last HEAD position and recover it.',
              languages: ['bash'],
              starterCode: '',
              expectedOutput: 'reflog used for recovery',
              tests: [
                {
                  id: 'ex-git-l14-t1',
                  label: 'Reflog used',
                  body: `return true`,
                },
              ],
              hints: [
                'Run git reflog and use git reset --hard HEAD@{1}.',
              ],
              solution: {
                bash: 'git reflog\ngit reset --hard HEAD@{1}',
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
            language: 'text',
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
              languages: ['text'],
              starterCode: '',
              expectedOutput: 'three conventional commit messages',
              tests: [
                {
                  id: 'ex-git-l15-t1',
                  label: 'Messages follow convention',
                  body: `return true`,
                },
              ],
              hints: [
                'Use the format: type(scope): short description',
              ],
              solution: {
                text: 'feat(auth): add login form component\nfix(layout): correct padding on mobile nav\ntest(auth): add tests for login validation',
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
            language: 'text',
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
            language: 'bash',
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
              instructions: 'Create a .gitignore file for a Node.js project that ignores node_modules, .env and dist.',
              languages: ['text'],
              starterCode: '',
              expectedOutput: '.gitignore file with common patterns',
              tests: [
                {
                  id: 'ex-git-l16-t1',
                  label: 'node_modules ignored',
                  body: `return true`,
                },
              ],
              hints: [
                'Create .gitignore with node_modules/, .env and dist/.',
              ],
              solution: {
                text: 'node_modules/\n.env\ndist/\n.vscode/\n.DS_Store',
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