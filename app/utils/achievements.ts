import type { UserProgress } from '~/utils/progress-storage'

export interface AchievementDefinition {
  id: string
  title: string
  description: string
  icon: string
  xp: number
  /** Progress towards the achievement, 0..1, derived from progress only. */
  progress: (p: UserProgress, ctx: AchievementContext) => number
}

export interface AchievementContext {
  /** Counts derived from the content catalogue rather than stored. */
  courseCompletedIds: string[]
  courseLessonTotals: Record<string, number>
  challengeTotal: number
  quizzesPassed: number
}

export interface AchievementResult extends AchievementDefinition {
  unlocked: boolean
  ratio: number
}

function ratio(value: number, target: number): number {
  if (target <= 0) return 0
  return Math.max(0, Math.min(1, value / target))
}

/**
 * Exercises and challenges share the "pass a test run" loop — the
 * UI calls both of them challenges — so the challenge counts include
 * both rather than only the standalone challenges page.
 */
function completedTaskCount(p: UserProgress): number {
  return p.completedChallenges.length + p.completedExercises.length
}

export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'first-lesson',
    title: 'First Lesson',
    description: 'Complete your first lesson.',
    icon: '◆',
    xp: 25,
    progress: (p) => ratio(p.completedLessons.length, 1),
  },
  {
    id: 'first-challenge',
    title: 'First Challenge',
    description: 'Pass the tests on your first challenge.',
    icon: '◇',
    xp: 25,
    progress: (p) => ratio(completedTaskCount(p), 1),
  },
  {
    id: 'first-project',
    title: 'First Project',
    description: 'Submit your first project.',
    icon: '▲',
    xp: 60,
    progress: (p) => ratio(p.completedProjects.length, 1),
  },
  {
    id: 'first-quiz',
    title: 'Quiz Whiz',
    description: 'Pass a lesson quiz.',
    icon: '★',
    xp: 30,
    progress: (p) => ratio(Object.keys(p.quizScores).length, 1),
  },
  {
    id: 'html-complete',
    title: 'HTML Complete',
    description: 'Finish every lesson in HTML Fundamentals.',
    icon: 'H',
    xp: 150,
    progress: (p, ctx) => ratio(ctx.courseCompletedIds.includes('html-fundamentals') ? 1 : 0, 1),
  },
  {
    id: 'css-complete',
    title: 'CSS Complete',
    description: 'Finish every lesson in CSS Fundamentals.',
    icon: 'C',
    xp: 150,
    progress: (p, ctx) => ratio(ctx.courseCompletedIds.includes('css-fundamentals') ? 1 : 0, 1),
  },
  {
    id: 'javascript-complete',
    title: 'JavaScript Complete',
    description: 'Finish every lesson in JavaScript Fundamentals.',
    icon: 'J',
    xp: 200,
    progress: (p, ctx) => ratio(ctx.courseCompletedIds.includes('javascript-fundamentals') ? 1 : 0, 1),
  },
  {
    id: 'streak-7',
    title: 'Seven Day Streak',
    description: 'Learn something new seven days in a row.',
    icon: '🔥',
    xp: 120,
    progress: (p) => ratio(p.streak.longest, 7),
  },
  {
    id: 'streak-30',
    title: 'Thirty Day Streak',
    description: 'Keep a learning streak alive for a month.',
    icon: '⚡',
    xp: 400,
    progress: (p) => ratio(p.streak.longest, 30),
  },
  {
    id: 'challenges-10',
    title: 'Challenge Solver',
    description: 'Complete ten challenges.',
    icon: '✦',
    xp: 120,
    progress: (p) => ratio(completedTaskCount(p), 10),
  },
  {
    id: 'challenges-50',
    title: 'Fifty Challenges',
    description: 'Complete fifty challenges.',
    icon: '✧',
    xp: 300,
    progress: (p) => ratio(completedTaskCount(p), 50),
  },
  {
    id: 'lessons-25',
    title: 'Twenty-Five Lessons',
    description: 'Complete twenty-five lessons.',
    icon: '▣',
    xp: 150,
    progress: (p) => ratio(p.completedLessons.length, 25),
  },
  {
    id: 'lessons-100',
    title: 'Hundred Lessons',
    description: 'Complete one hundred lessons.',
    icon: '▤',
    xp: 500,
    progress: (p) => ratio(p.completedLessons.length, 100),
  },
  {
    id: 'level-5',
    title: 'Level Five',
    description: 'Reach learner level 5.',
    icon: '⬢',
    xp: 100,
    progress: (p) => ratio(Math.floor(levelFromXp(p.xp)), 5),
  },
]

export const LEVELS = [
  { level: 1, xp: 0, title: 'Curious' },
  { level: 2, xp: 120, title: 'Apprentice' },
  { level: 3, xp: 300, title: 'Builder' },
  { level: 4, xp: 560, title: 'Crafter' },
  { level: 5, xp: 900, title: 'Mover' },
  { level: 6, xp: 1340, title: 'Shipper' },
  { level: 7, xp: 1900, title: 'Craftsperson' },
  { level: 8, xp: 2600, title: 'Engineer' },
  { level: 9, xp: 3500, title: 'Mentor' },
  { level: 10, xp: 4600, title: 'Ingot' },
]

export function levelFromXp(xp: number): number {
  let level = 1
  for (const entry of LEVELS) {
    if (xp >= entry.xp) level = entry.level
  }
  return level
}

export function levelInfo(xp: number): {
  level: number
  title: string
  current: number
  next: number
  progress: number
} {
  const level = levelFromXp(xp)
  const entry = LEVELS.find((item) => item.level === level) ?? LEVELS[0]!
  const next = LEVELS.find((item) => item.level === level + 1)
  const nextXp = next ? next.xp : entry.xp
  const span = Math.max(1, nextXp - entry.xp)
  return {
    level,
    title: entry.title,
    current: xp - entry.xp,
    next: span,
    progress: next ? Math.max(0, Math.min(1, (xp - entry.xp) / span)) : 1,
  }
}

export function resolveAchievements(
  progress: UserProgress,
  ctx: AchievementContext,
): AchievementResult[] {
  return ACHIEVEMENTS.map((definition) => {
    const r = Math.max(0, Math.min(1, definition.progress(progress, ctx)))
    return { ...definition, ratio: r, unlocked: progress.achievements.includes(definition.id) }
  }).sort((a, b) => Number(b.unlocked) - Number(a.unlocked) || b.ratio - a.ratio)
}

export function newAchievementIds(
  progress: UserProgress,
  ctx: AchievementContext,
): string[] {
  return ACHIEVEMENTS.filter(
    (definition) =>
      definition.progress(progress, ctx) >= 1 && !progress.achievements.includes(definition.id),
  ).map((definition) => definition.id)
}

export function achievementById(id: string): AchievementDefinition | undefined {
  return ACHIEVEMENTS.find((item) => item.id === id)
}